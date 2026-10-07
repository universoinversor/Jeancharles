@echo off
REM Doble clic (Windows) para ver la pagina en tu computadora.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Falta Node.js. Instala la version LTS desde https://nodejs.org y vuelve a abrir este archivo.
  start https://nodejs.org
  pause
  exit /b 1
)
node scripts\ver-local.mjs
echo.
pause
