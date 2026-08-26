@echo off
title MiniCity 3D Server
cd /d "%~dp0"
echo.
echo   ====================================
echo     MiniCity 3D 正在啟動...
echo     瀏覽器會自動打開遊戲
echo     （關閉此視窗 = 停止伺服器）
echo   ====================================
echo.
start "" "http://localhost:8477"
node server.js
pause
