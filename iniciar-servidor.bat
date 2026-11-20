@echo off
REM Inicia un servidor local para F1 Legends y abre el navegador.
REM Necesario para que YouTube permita reproducir los videos insertados.
cd /d "%~dp0"
set PORT=8080
echo.
echo  F1 LEGENDS - servidor local en http://localhost:%PORT%
echo  (cierra esta ventana para detenerlo)
echo.
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:%PORT%/paginas/inicio/inicio.html
  python -m http.server %PORT%
  goto :eof
)
where npx >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:%PORT%/paginas/inicio/inicio.html
  npx --yes http-server -p %PORT% -c-1
  goto :eof
)
echo No se encontro Python ni Node.js. Instala uno de los dos o abre index.html directamente.
pause
