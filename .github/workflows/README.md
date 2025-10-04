# GitHub Actions SFTP Deploy 設定方法

このワークフローは、master/mainブランチへのマージ時に自動的にSFTPサーバーへデプロイします。

## 必要なシークレット設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

1. **FTP_SERVER**: SFTPサーバーのホスト名（例: example.com）
2. **FTP_USERNAME**: SFTPユーザー名
3. **FTP_PASSWORD**: SFTPパスワード
4. **FTP_SERVER_DIR**: サーバー上のデプロイ先ディレクトリ（例: /public_html/ または /home/user/public_html）

## 使い方

1. 上記のシークレットを設定
2. master/mainブランチにマージまたはプッシュ
3. 自動的にSFTPデプロイが実行されます

## 注意事項

- SFTP接続を使用します（FTP/FTPSではありません）
- デプロイ時に全ファイルがアップロードされます
