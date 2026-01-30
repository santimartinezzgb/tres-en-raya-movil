@echo off
REM Script para iniciar la API y el emulador de Android simultáneamente en Windows

REM Comprobar si el puerto 8081 está en uso y cerrarlo
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do (
    taskkill /PID %%a /F >nul 2>&1
)

REM Iniciar API y Aplicación Android
ECHO 🚀 Iniciando API y Aplicación Android...
npm run full-dev
