#AWS App Runner Deployment Script
#Deploys backend to AWS App Runner
#run cmd: powershell -ExecutionPolicy Bypass -File .\deploy-backend.ps1
#for docker image build: docker build --no-cache -t iris-chatbot-backend .

$AWS_REGION = "ap-south-1"
$ECR_REPOSITORY = "iris-chatbot-backend"
$SERVICE_NAME = "iris-chatbot-service"
$ErrorActionPreference = "Stop"

function Write-Section {
    param([string]$Message)
    Write-Host "`n==================================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "==================================================`n" -ForegroundColor Cyan
}

function Cleanup-TemporaryFiles {
    $tempFiles = @("./source-config-*.json", "./instance-config-*.json")
    foreach ($file in $tempFiles) {
        if (Test-Path $file) { 
            Remove-Item $file -Force -ErrorAction SilentlyContinue 
        }
    }
}

function Wait-ForServiceReady {
    param ([string]$ServiceArn, [int]$MaxRetries = 30)
    
    $retryCount = 0
    while ($retryCount -lt $MaxRetries) {
        try {
            $service = aws apprunner describe-service --service-arn $ServiceArn --region $AWS_REGION | ConvertFrom-Json
            $status = $service.Service.Status
            
            if ($status -eq "RUNNING") {
                return @{ Status = $status; Url = $service.Service.ServiceUrl }
            }
            
            Write-Host "Service status: $status (Attempt $($retryCount + 1)/$MaxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 10
            $retryCount++
        } catch {
            Write-Host "Error checking service status: $_" -ForegroundColor Red
            Start-Sleep -Seconds 5
            $retryCount++
        }
    }
    return @{ Status = $status; Url = $null }
}

try {
    # Step 1: Build Docker image
    Write-Section "Step 1: Building Docker image"
    docker build -t $ECR_REPOSITORY .
    if ($LASTEXITCODE -ne 0) { throw "Docker build failed" }
    
    # Step 2: Get AWS account ID and create ECR repository
    Write-Section "Step 2: Setting up Amazon ECR"
    $awsAccountId = aws sts get-caller-identity --query 'Account' --output text
    if ($LASTEXITCODE -ne 0) { throw "Failed to get AWS account ID" }
    
    # Create ECR repository if it doesn't exist
    Write-Host "Creating ECR repository if it doesn't exist..."
    aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Repository doesn't exist, creating it..."
        aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION
        if ($LASTEXITCODE -ne 0) { throw "Failed to create ECR repository" }
        Write-Host "ECR repository created successfully!" -ForegroundColor Green
    } else {
        Write-Host "ECR repository already exists!" -ForegroundColor Green
    }
    
    # Step 3: Login to ECR
    Write-Host "Logging in to ECR..."
    $ecrLoginToken = aws ecr get-login-password --region $AWS_REGION
    if ($LASTEXITCODE -ne 0) { throw "Failed to get ECR login token" }
    
    $ecrLoginToken | docker login --username AWS --password-stdin "${awsAccountId}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    if ($LASTEXITCODE -ne 0) { throw "ECR login failed" }
    
    # Step 4: Tag and push image
    Write-Section "Step 4: Tagging and pushing image to ECR"
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $ecrImageUri = "${awsAccountId}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${timestamp}"
    
    docker tag ${ECR_REPOSITORY}:latest $ecrImageUri
    if ($LASTEXITCODE -ne 0) { throw "Failed to tag Docker image" }
    
    docker push $ecrImageUri
    if ($LASTEXITCODE -ne 0) { throw "Failed to push image to ECR" }
    
    Write-Host "Successfully pushed image: $ecrImageUri" -ForegroundColor Green
    
    # Step 5: Deploy to App Runner
    Write-Section "Step 5: Deploying to AWS App Runner"
    
    # Read environment variables
    $envVars = @{}
    if (Test-Path .env.production) {
        Get-Content .env.production | ForEach-Object {
            if ($_ -match '^([^=]+)=(.*)$') {
                $name = $matches[1].Trim()
                $value = $matches[2].Trim() -replace '^[\"\'']+|[\"\'']+$', ''
                $envVars[$name] = $value
            }
        }
    }
    
    # Create source config
    $sourceConfigFile = "./source-config-$(Get-Date -Format 'yyyyMMddHHmmss').json"
    $accessRoleArn = "arn:aws:iam::075960861240:role/AppRunnerServiceRole"  # <-- Use your actual role ARN

    $serviceConfig = @{
        ImageRepository = @{
            ImageIdentifier = $ecrImageUri
            ImageRepositoryType = "ECR"
            ImageConfiguration = @{
                Port = "5800"
                RuntimeEnvironmentVariables = $envVars
            }
        }
        AuthenticationConfiguration = @{
            AccessRoleArn = $accessRoleArn
        }
    }
    $serviceConfig | ConvertTo-Json -Depth 10 | Out-File -FilePath $sourceConfigFile -Encoding ascii
    
    # Check if service exists
    $service = aws apprunner list-services --region $AWS_REGION | ConvertFrom-Json
    if ($service.ServiceSummaryList) {
        $service = $service.ServiceSummaryList | Where-Object { $_.ServiceName -eq $SERVICE_NAME }
    } elseif ($service.ServiceSummary) {
        $service = $service.ServiceSummary | Where-Object { $_.ServiceName -eq $SERVICE_NAME }
    } else {
        $service = $null
    }
    
    if ($service) {
        # Update existing service
        Write-Host "Updating existing service: $($service.ServiceArn)" -ForegroundColor Cyan
        $result = aws apprunner update-service --service-arn $($service.ServiceArn) --source-configuration file://$sourceConfigFile --region $AWS_REGION | ConvertFrom-Json
        $SERVICE_ARN = $result.Service.ServiceArn
        Write-Host "Update initiated. Operation ID: $($result.OperationId)" -ForegroundColor Green
    } else {
        # Create new service
        Write-Host "Creating new service: $SERVICE_NAME" -ForegroundColor Cyan
        $instanceConfigFile = "./instance-config-$(Get-Date -Format 'yyyyMMddHHmmss').json"
        @{ Cpu = "1 vCPU"; Memory = "2 GB" } | ConvertTo-Json -Compress | Out-File -FilePath $instanceConfigFile -Encoding ascii
        $result = aws apprunner create-service --service-name $SERVICE_NAME --source-configuration file://$sourceConfigFile --instance-configuration file://$instanceConfigFile --region $AWS_REGION | ConvertFrom-Json
        $SERVICE_ARN = $result.Service.ServiceArn
        Write-Host "Service created successfully!" -ForegroundColor Green
    }
    
    # Step 6: Wait for service to be ready
    Write-Section "Step 6: Waiting for service to be ready"
    $serviceInfo = Wait-ForServiceReady -ServiceArn $SERVICE_ARN
    
    if ($serviceInfo.Status -ne "RUNNING") {
        throw "Service did not reach RUNNING state. Current status: $($serviceInfo.Status)"
    }
    
    $serviceUrl = $serviceInfo.Url
    
    # Update .env.local
    $envFile = ".env.local"
    if (Test-Path $envFile) {
        $content = Get-Content $envFile -Raw
        $updatedContent = $content -replace 'NEXT_PUBLIC_API_URL=.*', "NEXT_PUBLIC_API_URL=$serviceUrl"
        Set-Content -Path $envFile -Value $updatedContent -NoNewline
        Write-Host "Updated $envFile with new backend URL: $serviceUrl" -ForegroundColor Green
    } else {
        Write-Host "WARNING: $envFile not found. Please update it manually with:" -ForegroundColor Yellow
        Write-Host "NEXT_PUBLIC_API_URL=$serviceUrl" -ForegroundColor Cyan
    }
    
    Write-Host "`nDeployment completed successfully!" -ForegroundColor Green
    Write-Host "App Runner Service URL: $serviceUrl" -ForegroundColor Cyan
}
catch {
    Write-Host "`nERROR: $_" -ForegroundColor Red
    exit 1
}
finally {
    Cleanup-TemporaryFiles
} 