$src = "c:\Users\bapat\Downloads\finalversion14"
$dest = "c:\Users\bapat\Downloads\finalversion15_fresh"
$zip = "c:\Users\bapat\Downloads\finalversion15.zip"

if (Test-Path $dest) {
    Remove-Item -Recurse -Force $dest
}
New-Item -ItemType Directory -Path $dest -Force | Out-Null

robocopy $src $dest /E /XD node_modules .git __pycache__ dist .tmp scratch

if (Test-Path $zip) {
    Remove-Item -Force $zip
}

Compress-Archive -Path "$dest\*" -DestinationPath $zip -Force

Write-Host "Zipping completed successfully:"
Get-Item $zip | Select-Object Name, Length, LastWriteTime
