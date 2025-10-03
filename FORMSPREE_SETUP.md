# Formspree設定ガイド

問い合わせフォームを有効にするには、以下の手順でFormspreeを設定してください。

## 手順1: Formspreeアカウント作成

1. https://formspree.io/ にアクセス
2. 「Get Started」をクリック
3. メールアドレスとパスワードでアカウント作成（無料）

## 手順2: フォームを作成

1. ダッシュボードで「+ New Form」をクリック
2. フォーム名を入力（例：「D's tech お問い合わせ」）
3. 通知を受け取るメールアドレスを設定
4. フォームIDをコピー（例：`xyzabc123`）

## 手順3: index.htmlを更新

index.htmlの以下の部分を修正してください：

```html
<!-- 修正前 -->
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">

<!-- 修正後（YOUR_FORM_IDを実際のIDに置き換え） -->
<form id="contact-form" action="https://formspree.io/f/xyzabc123" method="POST" class="contact-form">
```

## 手順4: テスト送信

1. ブラウザでindex.htmlを開く
2. 問い合わせフォームに入力して送信
3. Formspreeの確認ページが表示される
4. メールで確認リンクが届くのでクリック
5. 以降、フォーム送信時に指定したメールアドレスに通知が届く

## 無料プランの制限

- 月50件まで送信可能
- Formspreeのロゴが表示される
- 基本的なスパム対策機能

## 有料プランにアップグレードすると

- 送信数無制限
- カスタムサンクスページ
- 高度なスパム対策
- Formspreeロゴ非表示

## トラブルシューティング

### フォームが送信できない
- FormspreeのフォームIDが正しいか確認
- インターネット接続を確認

### メールが届かない
- 迷惑メールフォルダを確認
- Formspreeダッシュボードで送信履歴を確認

## サポート

Formspreeの詳細は公式ドキュメントを参照：
https://help.formspree.io/
