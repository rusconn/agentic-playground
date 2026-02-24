# コーディングエージェントへの指示

## まずはじめに下記資料を参照すること

- docs/**/*.md

## ルール

- 日本語でコミュニケーションすること
- 不明点がある場合は実装せず質問すること
- 仕様を変更しないこと
- YAGNI原則に従うこと
- 現在のタスクに無関係な箇所は編集しないこと
- 既存の実装と歩調を合わせること

## ワークフロー

1. 作業を実施する
1. `node --run stylecheck -- --write`を実行する
   1. コマンドが失敗した場合はエラーメッセージを読み取り、最小限の修正を行う
1. 以下のコマンドが全て通ることを確認する
   1. `node --run typecheck`
   1. `node --run stylecheck`
   1. `node --run test`

## コマンド

- 型チェック: `node --run typecheck`
- スタイルチェック: `node --run stylecheck`
- スタイル修正: `node --run stylecheck -- --write`
- テスト実行: `node --run test`
