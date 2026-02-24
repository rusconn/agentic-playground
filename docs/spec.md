# アプリケーション仕様

## 概要

固定スキーマに従ってJSONのバリデーションをするCLI。

## コマンド

```sh
validate <json_path>
```

## 実行例

```sh
node src/main.ts validate user.json
```

## バリデーション仕様

### JSONの固定スキーマ

```ts
type User = {
  id: number
  name: string
  email: string
  age?: number
}
```

- 追加プロパティは許容しない

#### id

- 1以上の整数
- 上限値は考慮しなくてよい

#### name

- trim後の文字数が1~20文字
- 文字数は`[...s].length`の数値とする

#### email

- "@"を1つだけ含む
- 先頭と末尾は"@"ではない

#### age

- 0以上の整数
- 省略可能
- null不可能

### 出力

#### 成功時

```sh
Valid
```

- 終了コード0

#### バリデーション失敗時

```sh
Invalid:
- id must be >= 1
- name must be 1-20 characters
- email must contain '@'
```

- バリデーションエラーを全て列挙する
- エラーは id, name, email, age の順に出力する
- 終了コード1

### その他の仕様

- JSON.parseに失敗した場合はInvalidとして扱う
- エラーメッセージは "Invalid JSON"
