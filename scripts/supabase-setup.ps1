# Supabase 云端项目连接与迁移脚本
#
# 使用前准备:
#   1. 执行 supabase login (会打开浏览器完成登录)
#   2. 获取 project-ref: Dashboard -> 项目 -> Settings -> General -> Reference ID
#      或从 URL: https://supabase.com/dashboard/project/<project-ref>
#
# 用法: .\scripts\supabase-setup.ps1 -ProjectRef <你的project-ref>

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectRef
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "1. 连接项目 (project-ref: $ProjectRef)..." -ForegroundColor Cyan
supabase link --project-ref $ProjectRef

Write-Host "`n2. 推送数据库迁移..." -ForegroundColor Cyan
supabase db push

Write-Host "`n3. 获取 API 配置..." -ForegroundColor Cyan
$keysOutput = supabase projects api-keys --project-ref $ProjectRef --output json 2>$null
if ($keysOutput) {
    $keys = $keysOutput | ConvertFrom-Json
    $anonKey = ($keys.api_keys | Where-Object { $_.name -eq "anon" -or $_.name -eq "anon key" }).key
    if (-not $anonKey) { $anonKey = $keys.api_keys[0].key }
}
$apiUrl = "https://$ProjectRef.supabase.co"
if ($anonKey) {
    $envContent = @"
# Supabase 配置 (由 supabase-setup.ps1 生成)
NEXT_PUBLIC_SUPABASE_URL=$apiUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey
"@
    $envContent | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "已写入 .env.local" -ForegroundColor Green
} else {
    Write-Host "请从 Dashboard -> Project Settings -> API 复制 URL 和 anon key 到 .env.local" -ForegroundColor Yellow
}

Write-Host "`n完成! 运行 pnpm run dev 启动项目" -ForegroundColor Green
