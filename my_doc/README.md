# D's tech ホームページ

茨城県阿見町でホームページ作成・ウェブデザインを低価格で提供するD's techの公式サイト

## サイト情報

- **URL**: https://ds-tech.sakura.ne.jp/
- **サービス**: ホームページ作成・ウェブデザイン
- **料金**: 月額10,000円（税込）/ 更新なし月は8,000円
- **対応地域**: 全国（茨城県阿見町拠点）

## ディレクトリ構成

```
claude-test/
├── index.html              # トップページ
├── favicon.ico             # ファビコン
├── .htaccess              # 404エラーページ設定
├── pages/                 # サブページ
│   ├── faq.html          # よくある質問
│   ├── profile.html      # プロフィール
│   ├── sitemap.html      # サイトマップ
│   └── 404.html          # 404エラーページ
├── assets/               # 静的リソース
│   ├── css/
│   │   └── style.css    # メインスタイルシート
│   ├── js/
│   │   └── main.js      # メインJavaScript
│   └── images/          # 画像ファイル
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions自動デプロイ設定
└── my_doc/              # ドキュメント
    └── README.md        # このファイル
```

## 主な機能

### トップページ (index.html)
- スライドショー形式のヒーローセクション
- サービス概要・特徴
- デザイン例ギャラリー（横スクロール）
- 料金プラン・費用例
- サービス開始までの流れ
- お問い合わせフォーム（Formspree連携）
- Google Map表示

### サブページ
- **FAQ**: よくある質問（アコーディオン形式）
- **プロフィール**: 代表者プロフィール・技術スキル
- **サイトマップ**: サイト全体のページリンク
- **404**: カスタム404エラーページ

## 技術スタック

- **HTML5**: セマンティックHTML、構造化データ（JSON-LD）
- **CSS3**: レスポンシブデザイン、Flexbox、Grid
- **JavaScript**: バニラJS（フレームワーク不使用）
- **フォント**: Zen Maru Gothic（Google Fonts）
- **フォーム**: Formspree（https://formspree.io/）
- **地図**: Google Maps Embed API
- **デプロイ**: GitHub Actions + FTP

## SEO対策

- メタタグ最適化（description, keywords, OGP, Twitter Card）
- 構造化データ（LocalBusiness, Person, FAQPage）
- カノニカルURL設定
- レスポンシブ対応
- 画像最適化（WebP形式）
- サイトマップページ

## デプロイ

### 自動デプロイ（GitHub Actions）
mainブランチへのプッシュで自動的にさくらインターネットへFTPデプロイされます。

詳細は `.github/workflows/README.md` を参照してください。

### デプロイ対象ファイル（ホワイトリスト）
- index.html
- favicon.ico
- .htaccess
- pages/
- assets/

## 開発環境

- **エディタ**: VS Code推奨
- **ブラウザ**: Chrome, Firefox, Safari, Edge対応
- **レスポンシブ**: モバイル、タブレット、デスクトップ対応

## お問い合わせフォーム設定

Formspreeを使用しています。
- エンドポイント: `https://formspree.io/f/xpwyrooj`
- 送信時にボタンを非活性化して多重送信を防止
- 成功・失敗メッセージを表示

## カスタマイズ方法

### 色の変更
`assets/css/style.css` の `:root` セクションでカラー変数を変更できます。

```css
:root {
    --primary-blue: #60a5fa;
    --secondary-blue: #3b82f6;
    --light-blue: #93c5fd;
    --dark-blue: #3b82f6;
    --accent-blue: #7dd3fc;
}
```

### デザイン例の追加
`assets/images/template_party/` に画像を追加し、`index.html` のギャラリーセクションに追加してください。

### ページの追加
1. `pages/` ディレクトリに新しいHTMLファイルを作成
2. `pages/sitemap.html` にリンクを追加
3. 各ページのナビゲーションメニューに追加

## ライセンス

© 2025 D's tech. All rights reserved.

## 連絡先

- **メール**: info@ds-tech.sakura.ne.jp
- **所在地**: 茨城県稲敷郡阿見町若栗1371-24
- **Instagram**: https://instagram.com
