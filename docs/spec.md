# アプリケーション仕様

## 概要

Node.js標準のHTTPサーバー機能によるWeb APIサーバー

## 基本仕様

- JSON API
- レスポンスのコンテンツタイプは"application/json"
- 成功時のステータスコードは200
- 入力が仕様を満たさない場合は400
  - 必須パラメーターが存在しない
  - 必須パラメーターの形式が仕様を満たさない

## 起動コマンド

```sh
node src/main.ts
```

## サポートするパス

### `/hello`

- "hello"という固定文字列をレスポンスボディで返す

### `/echo?word=${word}`

- wordという名前のクエリ文字列をレスポンスボディで返す

### `/numeronym?word=${word}`

- wordという名前のクエリ文字列を入力とする
- クエリ文字列をnumeronymに変換してレスポンスボディで返す
- numeronymがわからなければ調査せよ

#### 例

```sh
curl 'http://localhost/numeronym?word=kubernetes'
k8s
```

## 設計方針

- `src/main.ts`内でWebサーバーインスタンスを作成し、起動する
- 各パスの実装はそれぞれ別のファイルに書く

## 実装方針

- `/numeronym`のみテストを実装する
- テスト対象は`numeronym`関数とする
- `numeronym`関数は文字列を入力するとnumeronym文字列を出力する
