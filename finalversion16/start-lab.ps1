$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
Set-Location -LiteralPath $ProjectRoot

Write-Host "`n=== DS LAB setup ===" -ForegroundColor Cyan

# Python 3.15 may not have compatible wheels for every scientific package yet.
# Prefer Python 3.13, then 3.12, and recreate a mismatched project venv safely.
$PythonVersion = $null
foreach ($candidate in @("3.13", "3.12")) {
    try {
        & py "-$candidate" -c "import sys; print(sys.version)" 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) { $PythonVersion = $candidate; break }
    } catch { }
}
if (-not $PythonVersion) {
    Write-Host "Python 3.13 or 3.12 was not found." -ForegroundColor Red
    Write-Host "Install Python 3.13 (64-bit) and enable the Python Launcher, then run this script again." -ForegroundColor Yellow
    exit 1
}

$VenvPath = Join-Path $ProjectRoot ".venv"
$VenvPython = Join-Path $VenvPath "Scripts\python.exe"
$RebuildVenv = $false
if (Test-Path $VenvPython) {
    try {
        & $VenvPython -c "import sys; raise SystemExit(0 if sys.version.startswith('$PythonVersion.') else 1)"
        if ($LASTEXITCODE -ne 0) { $RebuildVenv = $true }
    } catch { $RebuildVenv = $true }
} else { $RebuildVenv = $true }
if ($RebuildVenv) {
    if (Test-Path $VenvPath) {
        Write-Host "Rebuilding incompatible .venv with Python $PythonVersion..." -ForegroundColor Yellow
        Remove-Item -LiteralPath $VenvPath -Recurse -Force
    }
    & py "-$PythonVersion" -m venv $VenvPath
    if ($LASTEXITCODE -ne 0) { throw "Could not create Python virtual environment." }
}

Write-Host "Installing Python dependencies (first run may take a few minutes)..." -ForegroundColor Cyan
& $VenvPython -m pip install --disable-pip-version-check --upgrade pip
if ($LASTEXITCODE -ne 0) { throw "pip upgrade failed." }
& $VenvPython -m pip install --disable-pip-version-check -r (Join-Path $ProjectRoot "server\requirements.txt")
if ($LASTEXITCODE -ne 0) { throw "Python dependency installation failed. See the terminal error above." }

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
& npm.cmd install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

# Avoid launching a duplicate backend if it is already responding.
$BackendOnline = $false
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5050/api/health" -TimeoutSec 2
    if ($health.status -eq "online") { $BackendOnline = $true }
} catch { }
if (-not $BackendOnline) {
    $pythonCommand = "Set-Location -LiteralPath '$ProjectRoot'; & '$VenvPython' '$ProjectRoot\server\server.py'"
    Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $pythonCommand)
    Start-Sleep -Seconds 2
}

Write-Host "`nStarting Vite. Keep this terminal open." -ForegroundColor Green
Write-Host "Backend: http://localhost:5050/api/health" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173/`n" -ForegroundColor Green
& npm.cmd run dev
