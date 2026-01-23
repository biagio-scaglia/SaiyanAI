@echo off
echo ==========================================
echo       SaiyanAI 🐉 - Startup Script
echo ==========================================

echo.
echo [1/2] Starting Backend (FastAPI)...
start "SaiyanAI Backend" cmd /k "python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo [2/2] Starting Frontend (Next.js)...
cd frontend
start "SaiyanAI Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo 🚀 Systems Launching...
echo ------------------------------------------
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ==========================================
echo.
pause
