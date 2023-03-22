# Focus Timer webapp made with GPT-4

GPT-4 と対話しながら作成した Focus Timer アプリです。

```prompt.md
以下の要件に従い、Web サイト上で動く JavaScript 製 Focus Timer アプリを開発してください。

## 要件

- アプリは index.html, index.js, style.css のみからなるシンプルな構成である。
- tailwind.css をスタイリングに用いる。

### 初期画面

- 初期画面は Focus, Rest の時間指定用 input form および start ボタンからなる
- Focus, Rest の2種類の時間を指定できる
  - 時間指定の形式は mm:ss である
  - 初期値は Focus=25:00, Rest=05:00 である

### countDown 処理画面

- start ボタンを押すと countDown 処理画面になり、 countDown 処理が始まる
- countDown 処理は Focus, Rest が繰り返される
  - 状態が切り替わるタイミングで音がなり、背景色が変わる
- countDown 処理画面は現在の状態（Focus or Rest）および残り時間と、next, stop, pause ボタンからなる（これらは display: none; となっていたものが表示され、代わりに初期画面の要素が display: none; となる）
  - next ボタンを押すと次の状態がスタートする
  - stop ボタンを押すと初期画面に戻る
  - pause ボタンを押すともう一度 pause を押すまでカウントが一時停止する
- countDown 処理中、残り時間がページの title として表示される
```

commit - draft

> この概要を元に、詳細なコードを実装し、要件に従ったFocus Timerアプリを完成させてください。また、タイマーの動作やイベントリスナーなどの具体的な実装は、要件と独自の設計に応じて調整してください。

```prompt.md
素晴らしいです。はじめに伝えた要件を満たす各ファイルの完全な状態を出力してください。
```

commit - v1

```prompt.md
ありがとうございます。本当に素晴らしいです。
以下にいくつか修正して欲しい点を追加するので、こちらを反映した修正版のコードを出力してください。

・Stop 処理をしたら背景色をリセットして欲しい
・背景色は、Focusでは青、Restでは緑にしてみるのはいかがでしょう。全体的に統一感のある配色にしてください。
・favicon も isFocus によって変えたい。その時の背景色と同じ色の favicon にしましょう。
・各ボタンをアイコンに変えてください。
・要素はもう少し大きくてもいいです。画面の中央に来るようにしてください。
・ビープ音ではなく、もう少し分かる音がいいです。Focus→Restではリラックスできるような、Rest→Focusでは切り替えて集中できるような音がいいです。
```

commit - v2

```prompt.md
ありがとうございます。
・faviconは svg で構わないので、 svg ファイルのコードとともに修正箇所を出力してください。
・各ボタンに hover 時の挙動を追加してください。
・mm:ss の input 箇所に 2 などの不適な値をいれると NaN:NaN となってしまいます。これを修正するため、 : 箇所の前後で input を2つに分けましょう。また、それぞれの input 箇所にもスタイルを追加してください。
・focus-sound.mp3 と rest-sound.mp3 はどこで入手すればよいでしょうか。
```

focus-sound.mp3 と rest-sound.mp3 は https://soundeffect-lab.info/ から入手した。

commit - v3
