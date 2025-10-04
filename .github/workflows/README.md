# GitHub Actions FTP Deploy 設定方法

このワークフローは、masterブランチへのマージ時に自動的にFTPサーバーへデプロイします。

## 必要なシークレット設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

1. **FTP_SERVER**: FTPサーバーのホスト名（例: ftp.example.com）
2. **FTP_USERNAME**: FTPユーザー名
3. **FTP_PASSWORD**: FTPパスワード
4. **FTP_SERVER_DIR**: サーバー上のデプロイ先ディレクトリ（例: /public_html/ または /）

## 使い方

1. 上記のシークレットを設定
2. masterブランチにマージまたはプッシュ
3. 自動的にFTPデプロイが実行されます

## 注意事項

- 初回デプロイ時は全ファイルがアップロードされます
- 2回目以降は変更されたファイルのみがアップロードされます
