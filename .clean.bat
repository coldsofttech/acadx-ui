@echo off
setlocal

REM Define the files to be deleted
set "BUILD=build"
set "NODE_MODULES=node_modules"
set "PACKAGE_LOCK=package-lock.json"

REM Define the files and directories to be checked
echo Verifying if all mandatory files exist...
set "CHECK_FILES_DIRS=.github\workflows\pipeline.yml public src package.json .gitignore CHANGELOG.md LICENSE README.md"

REM Check for the existence of each required file or directory
for %%f in (%CHECK_FILES_DIRS%) do (
    if not exist "%%f" (
        echo Error: Required file or directory %%f is missing.
        exit /b 1
    )
)

REM Delete build folder
if exist "%BUILD%" (
    echo Deleting folder %BUILD% and its contents...
    rd /s /q "%BUILD%"
)

REM Delete node_modules folder
if exist "%NODE_MODULES%" (
    echo Deleting folder %NODE_MODULES% and its contents...
    rd /s /q "%NODE_MODULES%"
)

REM Delete package-lock file
if exist "%PACKAGE_LOCK%" (
    echo Deleting %PACKAGE_LOCK%...
    del "%PACKAGE_LOCK%"
)

endlocal