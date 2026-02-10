# Deploy Script for Windows PowerShell
# Installs dependencies, builds frontend, sets up backend venv, and runs services

$ErrorActionPreference = "Stop"

Write-Host "------ SHARE MOTION DEPLOYMENT ------"

# 1. Frontend Setup
Write-Host "1. Setting up Frontend..."
Push-Location -Path "..\frontend"
try {
    Write-Host "Installing npm packages..."
    npm install
    # Ensure critical UI libraries are installed
    npm install framer-motion lucide-react recharts clsx tailwind-merge
    
    Write-Host "Building Next.js application..."
    npm run build
}
catch {
    Write-Error "Frontend setup failed: $_"
    Pop-Location
    exit 1
}
Pop-Location

# 2. Backend Setup
Write-Host "2. Setting up Backend..."
Push-Location -Path "..\backend"
try {
    if (!(Test-Path -Path "venv")) {
        Write-Host "Creating Python virtual environment..."
        python -m venv venv
    }
    
    Write-Host "Activating venv and installing requirements..."
    .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
}
catch {
    Write-Error "Backend setup failed: $_"
    Pop-Location
    exit 1
}

# 3. Start Services
Write-Host "3. Starting Services..."

# Start Frontend in background
Write-Host "Starting Next.js frontend (http://localhost:3000)..."
Start-Process -NoNewWindow npm -ArgumentList "run","start" -WorkingDirectory "..\frontend"

# Start Backend in foreground
Write-Host "Starting FastAPI backend (http://localhost:8000)..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

Pop-Location
