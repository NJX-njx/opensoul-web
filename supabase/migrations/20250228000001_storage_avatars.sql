-- avatars 存储桶由 config.toml 或 Dashboard 创建
-- 此处仅添加 RLS 策略

-- 用户只能上传/更新/删除自己的头像（路径格式: user_id/filename）
create policy "Users can upload own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- 公开读取
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');
