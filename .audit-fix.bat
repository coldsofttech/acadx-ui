@echo off
setlocal

REM Run audit with force fixes
echo Running audit with force fixes...
npm audit fix --force

endlocal