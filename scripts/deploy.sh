#!/bin/bash
# Deploy Script for Linux/macOS
# Installs dependencies, builds frontend, sets up backend venv, and runs services

set -e

echo "------ SHARE MOTION DEPLOYMENT ------"

# 1. Frontend Setup
echo "1. Setting up Frontend..."
cd ../frontend

echo "Installing npm packages..."
npm install
npm install framer-motion lucide-react recharts clsx tailwind-merge

echo "Building Next.js application..."
npm run build

cd ../scripts

# 2. Backend Setup
echo "2. Setting up Backend..."
cd ../backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating venv and installing requirements..."
source venv/bin/activate
pip install -r requirements.txt

# 3. Start Services
echo "3. Starting Services..."

# Start Frontend in background
echo "Starting Next.js frontend (http://localhost:3000)..."
cd ../frontend
npm run start &

# Start Backend in foreground
echo "Starting FastAPI backend (http://localhost:8000)..."
cd ../backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
