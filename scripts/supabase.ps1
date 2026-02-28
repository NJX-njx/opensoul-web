# 项目内 supabase 快捷脚本 - 当 PATH 中找不到 supabase 时使用
# 用法: .\scripts\supabase.ps1 login
#       .\scripts\supabase.ps1 link --project-ref xxx
#       .\scripts\supabase.ps1 db push

$supabaseExe = "$env:USERPROFILE\scoop\shims\supabase.exe"
if (-not (Test-Path $supabaseExe)) {
  Write-Error "Supabase CLI 未找到。请先运行: scoop install supabase"
  exit 1
}
& $supabaseExe @args
