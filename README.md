# AWS App Runner Deployment Guide for IRIS Chatbot Backend

This comprehensive guide explains how to deploy the IRIS Chatbot backend to AWS App Runner. This implementation was created for testing and learning AWS services while maintaining the live backend on Render.

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Deployment Script](#deployment-script)
- [CLI Commands Reference](#cli-commands-reference)
- [Monitoring and Logs](#monitoring-and-logs)
- [Cost Estimation](#cost-estimation)
- [Troubleshooting](#troubleshooting)
- [Cleanup](#cleanup)

## 🏗️ Architecture Overview

- **Frontend**: Next.js hosted on Vercel
- **Backend**: Python/Flask with LangChain and Groq API, deployed to AWS App Runner
- **Container Registry**: Amazon ECR (Elastic Container Registry)
- **Database**: Supabase (already configured)
- **IAM Roles**: AppRunnerServiceRole and AppRunnerInstanceProfile

### Why AWS App Runner?
- **Serverless**: No server management required
- **Auto-scaling**: Automatically scales based on traffic
- **Cost-effective**: Pay only for what you use
- **Fast deployment**: Container-based deployment
- **Built-in monitoring**: Integrated logging and metrics

## ✅ Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Docker** installed locally
4. **Node.js and npm** installed (for frontend)
5. **Python 3.9+** installed
6. **PowerShell** (for Windows deployment script)

## 🚀 Setup Instructions

### Step 1: Configure AWS CLI

If you haven't already, configure the AWS CLI with your credentials:

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `ap-south-1`)
- Default output format (`json`)

### Step 2: Create Required IAM Roles

Before deploying, you need to create these IAM roles in the AWS Console:

#### 2.1 AppRunnerServiceRole
1. Go to AWS IAM Console
2. Create a new role with trusted entity: `apprunner.amazonaws.com`
3. Attach the policy: `AWSAppRunnerServicePolicyForECRAccess`
4. Note the role ARN (you'll need it for the deployment script)

#### 2.2 AppRunnerInstanceProfile
1. Create another role with trusted entity: `tasks.apprunner.amazonaws.com`
2. Attach the policy: `AmazonEC2ContainerRegistryReadOnly`
3. This allows App Runner to pull images from ECR

### Step 3: Prepare Your Environment

1. **Clone the repository and checkout the AWS branch:**
   ```bash
   git clone https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website.git
   cd I.R.I.S-Prod-Website
   git checkout aws-deployment
   ```

2. **Create environment file:**
   Create `.env.production` with your backend environment variables:
   ```env
   GROQ_API_KEY=your-groq-api-key
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-service-role-key
   HF_API_URL=https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2
   HF_API_TOKEN=your-huggingface-token
   ```

3. **Update the deployment script:**
   Edit `deploy-backend.ps1` and update the `$accessRoleArn` variable with your actual role ARN:
   ```powershell
   $accessRoleArn = "arn:aws:iam::YOUR_ACCOUNT_ID:role/AppRunnerServiceRole"
   ```

### Step 4: Build and Deploy

1. **Run the deployment script:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\deploy-backend.ps1
   ```

2. **What the script does:**
   - Builds Docker image locally
   - Creates ECR repository (if it doesn't exist)
   - Logs in to ECR
   - Tags and pushes the image to ECR
   - Creates/updates App Runner service
   - Waits for service to be ready
   - Updates your `.env.local` with the new backend URL

3. **Update Frontend:**
   After deployment, your `.env.local` will be automatically updated with:
   ```
   NEXT_PUBLIC_API_URL=https://your-app-runner-url.awsapprunner.com
   ```

4. **Deploy Frontend to Vercel:**
   Push your changes to your Git repository connected to Vercel.

## 🔧 Deployment Script Details

The `deploy-backend.ps1` script performs the following steps:

### Step 1: Docker Build
```powershell
docker build -t iris-chatbot-backend .
```
- Builds the Docker image using the Dockerfile
- Installs Python dependencies from requirements.txt
- Copies the backend code and environment files

### Step 2: ECR Setup
```powershell
aws ecr create-repository --repository-name iris-chatbot-backend --region ap-south-1
```
- Creates ECR repository if it doesn't exist
- Logs in to ECR using AWS credentials

### Step 3: Image Push
```powershell
docker tag iris-chatbot-backend:latest $ecrImageUri
docker push $ecrImageUri
```
- Tags the image with timestamp
- Pushes to ECR with unique tag

### Step 4: App Runner Deployment
- Creates JSON configuration files for App Runner
- Creates or updates the App Runner service
- Configures environment variables and port mapping
- Sets up authentication for ECR access

### Step 5: Service Monitoring
- Waits for service to reach RUNNING state
- Updates frontend configuration with new URL

## 💻 CLI Commands Reference

### AWS CLI Commands

#### Account and Identity
```bash
# Get your AWS account ID
aws sts get-caller-identity --query 'Account' --output text

# Get your AWS user/role information
aws sts get-caller-identity
```

#### ECR (Elastic Container Registry) Commands
```bash
# List all ECR repositories
aws ecr describe-repositories --region ap-south-1

# Check if specific repository exists
aws ecr describe-repositories --repository-names iris-chatbot-backend --region ap-south-1

# Create ECR repository
aws ecr create-repository --repository-name iris-chatbot-backend --region ap-south-1

# Get ECR login token
aws ecr get-login-password --region ap-south-1

# List images in repository
aws ecr list-images --repository-name iris-chatbot-backend --region ap-south-1

# Get details of images
aws ecr describe-images --repository-name iris-chatbot-backend --region ap-south-1

# Delete images
aws ecr batch-delete-image --repository-name iris-chatbot-backend --image-ids imageTag=latest

# Delete repository
aws ecr delete-repository --repository-name iris-chatbot-backend --force
```

#### App Runner Commands
```bash
# List all App Runner services
aws apprunner list-services --region ap-south-1

# Get service details
aws apprunner describe-service --service-arn YOUR_SERVICE_ARN --region ap-south-1

# Create service (using config files)
aws apprunner create-service --service-name iris-chatbot-service --source-configuration file://source-config.json --instance-configuration file://instance-config.json --region ap-south-1

# Update service
aws apprunner update-service --service-arn YOUR_SERVICE_ARN --source-configuration file://source-config.json --region ap-south-1

# Delete service
aws apprunner delete-service --service-arn YOUR_SERVICE_ARN
```
![image](https://github.com/user-attachments/assets/e999d09f-41f5-46d3-87d6-4203a2eb7367)

### Docker Commands

#### Build and Image Management
```bash
# Build Docker image
docker build -t iris-chatbot-backend .

# Build without cache (force rebuild)
docker build --no-cache -t iris-chatbot-backend .

# List Docker images
docker images

# Remove Docker image
docker rmi iris-chatbot-backend

# Tag image for ECR
docker tag iris-chatbot-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/iris-chatbot-backend:latest
```
![image](https://github.com/user-attachments/assets/54523879-cba4-4ce0-8759-fdfdb9c3d43f)

#### ECR Login and Push
```bash
# Login to ECR (using AWS CLI)
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com

# Push image to ECR
docker push YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/iris-chatbot-backend:latest

# Pull image from ECR
docker pull YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/iris-chatbot-backend:latest
```

#### Container Management
```bash
# Run container locally for testing
docker run -p 5800:5800 --env-file .env.production iris-chatbot-backend

# Run container in background
docker run -d -p 5800:5800 --env-file .env.production iris-chatbot-backend

# List running containers
docker ps

# Stop container
docker stop CONTAINER_ID

# View container logs
docker logs CONTAINER_ID

# Execute commands in running container
docker exec -it CONTAINER_ID /bin/bash
```

### PowerShell Commands

#### Execution Policy
```powershell
# Check execution policy
Get-ExecutionPolicy

# Set execution policy for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run script with bypass
powershell -ExecutionPolicy Bypass -File .\deploy-backend.ps1
```

#### File Operations
```powershell
# Check if file exists
Test-Path .env.production

# Read file content
Get-Content .env.production

# Write content to file
Set-Content -Path "file.txt" -Value "content" -Encoding UTF8

# Remove file
Remove-Item file.txt -Force

# Clean up temporary files
Get-ChildItem -Path "./source-config-*.json" | Remove-Item -Force
```

#### Environment Variables
```powershell
# Get environment variable
$env:VARIABLE_NAME

# Set environment variable
$env:VARIABLE_NAME = "value"

# Check if environment variable exists
if (Test-Path "env:VARIABLE_NAME") { ... }
```

### Manual Deployment Commands

If you prefer to deploy manually instead of using the script:

```bash
# 1. Build Docker image
docker build --no-cache -t iris-chatbot-backend .

# 2. Get AWS account ID
aws sts get-caller-identity --query 'Account' --output text

# 3. Create ECR repository (if needed)
aws ecr create-repository --repository-name iris-chatbot-backend --region ap-south-1

# 4. Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com

# 5. Tag and push image
docker tag iris-chatbot-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/iris-chatbot-backend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/iris-chatbot-backend:latest

# 6. Create App Runner service (using AWS Console or CLI with config files)
```

## 📊 Environment Variables

Make sure these environment variables are set in your `.env.production`:

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for LLM | Yes |
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_KEY` | Your Supabase service role key | Yes |
| `HF_API_URL` | HuggingFace API endpoint | Yes |
| `HF_API_TOKEN` | Your HuggingFace API token | Yes |

## 📈 Monitoring and Logs

### Access App Runner Logs
1. Go to [AWS App Runner Console](https://console.aws.amazon.com/apprunner/home)
2. Select your service (`iris-chatbot-service`)
3. Navigate to the "Logs" tab
4. View real-time logs and error messages

### Health Check Endpoint
Your backend exposes a health check endpoint:
```
GET https://your-app-runner-url.awsapprunner.com/health
```

### Common Log Messages
- `✅ Health check successful` - Service is running normally
- `HF API status: 200` - HuggingFace API is responding
- `Service status: RUNNING` - App Runner service is ready

## 💰 Cost Estimation

### Monthly Costs (approximate)
- **AWS App Runner**: $10-20/month for basic usage
- **ECR Storage**: $0.10 per GB per month
- **ECR Data Transfer**: $0.09 per GB (outbound)
- **Total**: ~$15-25/month for typical usage

### Cost Optimization Tips
- Use smaller instance sizes for development
- Clean up old ECR images regularly
- Monitor usage in AWS Cost Explorer
- Consider reserved instances for production

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Permission Denied Errors
**Error**: `AccessDenied` or `UnauthorizedOperation`
**Solution**:
- Ensure IAM roles have correct permissions
- Check that ECR repository policy allows App Runner access
- Verify AWS CLI credentials are configured correctly

#### 2. Container Fails to Start
**Error**: `CREATE_FAILED` in App Runner
**Solution**:
- Check container logs in App Runner console
- Verify all environment variables are set
- Ensure the container exposes port 5800
- Check Dockerfile syntax and dependencies

#### 3. High Latency
**Issue**: Slow response times
**Solution**:
- Check the region matches your users' location
- Consider enabling VPC connectivity
- Monitor App Runner metrics for bottlenecks

#### 4. Supabase RLS Policy Errors
**Error**: `new row violates row-level security policy`
**Solution**:
- Update Supabase RLS policies to allow inserts
- Use service role key instead of anon key
- Add appropriate policies for your use case

#### 5. HuggingFace API Errors
**Error**: `HF API error: 401` or `HF API error: 500`
**Solution**:
- Verify HF_API_URL and HF_API_TOKEN are correct
- Check HuggingFace API status
- Ensure your account has sufficient API credits

### Debugging Steps

1. **Check App Runner Logs**
   - Look for Python tracebacks
   - Check for missing environment variables
   - Verify API calls are successful

2. **Test Locally**
   ```bash
   docker build -t iris-chatbot-backend .
   docker run -p 5800:5800 --env-file .env.production iris-chatbot-backend
   ```

3. **Verify Environment Variables**
   ```bash
   aws apprunner describe-service --service-arn YOUR_SERVICE_ARN
   ```

4. **Check ECR Repository**
   ```bash
   aws ecr describe-repositories --repository-names iris-chatbot-backend
   ```

## 🧹 Cleanup

To avoid unnecessary charges:

### 1. Delete App Runner Service
```bash
aws apprunner delete-service --service-arn YOUR_SERVICE_ARN
```

### 2. Clean Up ECR Images
```bash
aws ecr batch-delete-image --repository-name iris-chatbot-backend --image-ids imageTag=latest
```

### 3. Delete ECR Repository
```bash
aws ecr delete-repository --repository-name iris-chatbot-backend --force
```

### 4. Remove IAM Roles
- Delete AppRunnerServiceRole
- Delete AppRunnerInstanceProfile

## 📚 Additional Resources

- [AWS App Runner Documentation](https://docs.aws.amazon.com/apprunner/)
- [Amazon ECR Documentation](https://docs.aws.amazon.com/ecr/)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review App Runner logs for specific error messages
3. Open an issue in the GitHub repository
4. Consult AWS documentation and support

---

**Note**: This AWS deployment is for testing and learning purposes. The live production backend remains on Render for stability and cost-effectiveness.
