# Simple HTTP Server for Portfolio
$port = 8080
$url = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "========================================" -ForegroundColor Green
Write-Host "Portfolio Server Running!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Server URL: $url" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

function Get-ContentType {
    param($filePath)
    $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
    switch ($extension) {
        '.html' { return 'text/html; charset=utf-8' }
        '.css' { return 'text/css' }
        '.js' { return 'application/javascript' }
        '.png' { return 'image/png' }
        '.jpg' { return 'image/jpeg' }
        '.jpeg' { return 'image/jpeg' }
        '.svg' { return 'image/svg+xml' }
        '.webp' { return 'image/webp' }
        '.avif' { return 'image/avif' }
        '.pdf' { return 'application/pdf' }
        '.ico' { return 'image/x-icon' }
        '.json' { return 'application/json' }
        default { return 'application/octet-stream' }
    }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq '/') {
            $localPath = '/index.html'
        }
        
        $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            try {
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = Get-ContentType $filePath
                $response.ContentLength64 = $content.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($content, 0, $content.Length)
                Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 200 - $localPath" -ForegroundColor Green
            } catch {
                $response.StatusCode = 500
                Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 500 - $localPath - Error: $_" -ForegroundColor Red
            }
        } else {
            $response.StatusCode = 404
            Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 404 - $localPath" -ForegroundColor Yellow
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}


















