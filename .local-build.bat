@echo off
setlocal

echo Executing clean batch script...
call .clean.bat

echo Executing install batch script...
call .install.bat

echo Executing lint batch script...
call .lint.bat

echo Executing build batch script...
call .build.bat

endlocal