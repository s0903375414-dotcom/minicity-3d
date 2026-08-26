@echo off
title MiniCity 3D Deploy
cd /d "%~dp0"
echo.
echo   ==============================
echo     MiniCity 3D 部署到 GitHub
echo   ==============================
echo.
git add -A
git status --short
set /p MSG=輸入這次更新說明（直接 Enter = 更新遊戲）: 
if "%MSG%"=="" set MSG=更新遊戲
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo   沒有新的變更需要部署。
  pause
  exit /b
)
git push
if errorlevel 1 (
  echo.
  echo   推送失敗！可能是 Token 過期，請更新遠端憑證：
  echo   git remote set-url origin https://帳號:新Token@github.com/s0903375414-dotcom/minicity-3d.git
  pause
  exit /b
)
echo.
echo   ✅ 已推送！GitHub Pages 會在約 1 分鐘後自動更新：
echo   https://s0903375414-dotcom.github.io/minicity-3d/
echo.
start "" "https://s0903375414-dotcom.github.io/minicity-3d/"
pause
