# Share Motion - Social Media Automation Platform

"Algorithmic Luxury" meets powerful automation. Share Motion is a next-generation social media management tool designed for creators and brands who demand both aesthetics and performance.

## 🚀 Getting Started

This repository contains a monorepo structure with a **Next.js frontend** and a **FastAPI backend**.

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL (optional for initial mock mode)

### Quick Start (Development)

**1. Install & Run Frontend:**
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

**2. Install & Run Backend:**
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
# API runs at http://localhost:8000
```

### Deployment

Scripts are provided in the `scripts/` directory for easier deployment:

- **Windows**: `.\scripts\deploy.ps1`
- **Linux/Mac**: `./scripts/deploy.sh`

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + Custom "Midnight Opulence" Theme
- **Animations**: Framer Motion (v12)
- **Icons**: Lucide React
- **Charts**: Recharts (v3)
- **State Management**: React Hooks + Mock Services (Phase 1)

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (via SQLAlchemy + asyncpg)
- **Tasks**: Celery + Redis (configured)

## 📂 Project Structure

```
/
├── frontend/             # Next.js Application
│   ├── src/app/          # App Router Pages & Layouts
│   ├── src/components/   # Reusable UI Components
│   ├── src/services/     # API & Mock Data Services
│   └── src/hooks/        # Custom React Hooks
│
├── backend/              # FastAPI Application
│   ├── app/              # Main Application Code
│   │   ├── api/          # API Routes 
│   │   ├── core/         # Config & Security
│   │   └── db/           # Database Models
│
└── scripts/              # Deployment & Utility Scripts
```

## 🎨 Design System

The application follows the **"Algorithmic Luxury"** design philosophy:
- **Primary Colors**: Midnight Blue (`#0f172a`), Gold (`#efc07b`)
- **Accents**: Neon Rose (`#f43f5e`), Electric Teal (`#2dd4bf`)
- **Typography**: Space Grotesk (Display), Inter (Body), JetBrains Mono (Code/Data)
- **Effects**: Glassmorphism, blurred backdrops, subtle gradients

## 🚧 Status

**Current Phase: Scaffolded & Mocked**
All core UI pages (Dashboard, Content, Calendar, Media, Influencers, Chat) are implemented with high-fidelity mock data. The backend is scaffolded but not yet actively connected to the frontend components.
