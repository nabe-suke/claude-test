# GitHub Actions FTP Deploy 設定方法

このワークフローは、mainブランチへのプッシュ時に自動的にFTPサーバーへデプロイします。

## 必要なシークレット設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

1. **FTP_SERVER**: FTPサーバーのホスト名（例: ds-tech.sakura.ne.jp）
2. **FTP_USERNAME**: FTPユーザー名
3. **FTP_PASSWORD**: FTPパスワード
4. **FTP_SERVER_DIR**: サーバー上のデプロイ先ディレクトリ（例: /home/ds-tech/www/ または /）

## デプロイされるファイル（ホワイトリスト方式）

以下のファイル・フォルダのみがデプロイされます：

- index.html
- favicon.ico
- .htaccess
- pages/
- assets/

## 使い方

1. 上記のシークレットを設定
2. mainブランチにプッシュ
3. 自動的にFTPデプロイが実行されます

## 注意事項

- FTP接続を使用します（さくらインターネット対応）
- ホワイトリスト方式で必要なファイルのみデプロイされます
- デプロイ対象を追加する場合は `.github/workflows/deploy.yml` の `Prepare deploy files` ステップを編集してください
