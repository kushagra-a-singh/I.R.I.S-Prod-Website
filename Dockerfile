# Backend Dockerfile for AWS App Runner
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY src/components/chatbot ./src/components/chatbot

# Copy environment file if it exists (for backend configuration)
COPY .env.production .env

# Expose the port the app runs on
EXPOSE 5800

# Command to run the application
CMD ["python", "src/components/chatbot/chatbot.py"]
