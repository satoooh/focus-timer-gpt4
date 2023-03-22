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

