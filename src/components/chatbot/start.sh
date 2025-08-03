#!/bin/bash

echo "🚀 Starting chatbot backend deployment..."

# Set environment variables for memory optimization
export PYTHONUNBUFFERED=1
export RENDER=true
export PYTHONHASHSEED=0
export PYTHONDONTWRITEBYTECODE=1

# Set memory limits for Python
export PYTHONMALLOC=malloc
export PYTHONDEVMODE=0

# Check if required files exist
echo "📁 Checking required files..."
if [ ! -f "embeddings.pkl" ]; then
    echo "❌ Error: embeddings.pkl not found"
    exit 1
fi

if [ ! -f "faiss.index" ]; then
    echo "❌ Error: faiss.index not found"
    exit 1
fi

echo "✅ All required files found"

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Start the application with memory-optimized gunicorn settings
echo "🌐 Starting gunicorn server with memory optimization..."
exec gunicorn chatbot:app \
    --bind 0.0.0.0:$PORT \
    --timeout 120 \
    --workers 1 \
    --max-requests 50 \
    --max-requests-jitter 10 \
    --preload \
    --log-level info \
    --access-logfile - \
    --error-logfile - \
    --worker-class sync \
    --worker-connections 1000 