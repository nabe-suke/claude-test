# トップスライドの変更方法

トップのスライドショーの枚数を変更する場合は、**index.html**の以下の2箇所を修正してください。

## 1. スライド本体（.slideshow-container内）

```html
<div class="slideshow-container">
    <!-- スライド1 -->
    <div class="slide active" style="background-image: url('assets/images/slide/slide01.jpg');">
        <div class="slide-content">
            <h1>タイトル</h1>
            <p>説明文</p>
        </div>
    </div>
    
    <!-- スライド2 -->
    <div class="slide" style="background-image: url('assets/images/slide/slide02.jpg');">
        ...
    </div>
    
    <!-- 必要な数だけ追加 -->
</div>
```

**注意点：**
- 最初のスライドのみ `class="slide active"` とする
- 2枚目以降は `class="slide"` のみ
- 画像パスを適切に設定

## 2. インジケーター（.slide-indicators内）

```html
<div class="slide-indicators">
    <span class="indicator active" data-slide="0"></span>
    <span class="indicator" data-slide="1"></span>
    <span class="indicator" data-slide="2"></span>
    <!-- スライド数に合わせて追加 -->
</div>
```

**注意点：**
- 最初のインジケーターのみ `class="indicator active"` とする
- 2つ目以降は `class="indicator"` のみ
- `data-slide` の値は0から順番に設定（0, 1, 2, 3...）
- スライド数とインジケーター数を必ず一致させる

## JavaScriptの修正は不要

スライドショー機能は自動的にスライド数を検出するため、**main.jsの修正は不要**です。

## 例：5枚のスライドにする場合

1. `.slideshow-container`内に5つの`.slide`を配置
2. `.slide-indicators`内に5つの`.indicator`を配置（data-slide="0"〜"4"）

これだけで完了です！
