# 問い合わせフォームの実装方法

静的HTMLサイトでメール送信を実装する方法は主に3つあります。

## 方法1: FormspreeやFormsubmitなどの外部サービス（推奨）

### メリット
- サーバーサイドのコード不要
- 無料プランあり
- スパム対策機能付き
- 簡単に実装可能

### 実装例（Formspree使用）

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="name" placeholder="お名前" required>
    <input type="email" name="email" placeholder="メールアドレス" required>
    <textarea name="message" placeholder="お問い合わせ内容" required></textarea>
    <button type="submit">送信</button>
</form>
```

### 設定手順
1. https://formspree.io/ でアカウント作成
2. フォームを作成してIDを取得
3. HTMLのactionにIDを設定

## 方法2: Google Forms埋め込み

### メリット
- 完全無料
- Googleスプレッドシートで管理
- スパム対策不要

### 実装方法
1. Google Formsでフォーム作成
2. 「送信」→「埋め込みコード」を取得
3. HTMLに貼り付け

## 方法3: PHPでメール送信（サーバー必要）

### メリット
- 完全にカスタマイズ可能
- 外部サービス不要

### デメリット
- PHPが動作するサーバーが必要
- スパム対策を自分で実装

### 実装例

**contact.php**
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "info@your-domain.com";
    $subject = "お問い合わせ: " . $name;
    $body = "名前: $name\nメール: $email\n\n内容:\n$message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "送信完了";
    } else {
        echo "送信失敗";
    }
}
?>
```

## 推奨：Formspreeを使った実装

最も簡単で確実な方法です。次のステップで実装できます：

1. Formspreeアカウント作成（無料）
2. フォームID取得
3. index.htmlの問い合わせセクションを更新

実装コードは別途提供します。
