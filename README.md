# 顧客受付システム

## システム概要

顧客の予約人数の登録、来場者の人数管理とタクシーの受付を行うシステムです。

### 機能一覧

- ホーム画面

  - 個室の利用状況を確認
  - ステータスによって色が変わる
    - 水色背景　 → 来場中
    - 青背景 + 白文字　 → 全員到着
    - 灰色背景　 → 　全員退室 or 予約なし
    - 赤背景 → 登録エラー
  - 業務終了ボタン（データの初期化）
    - 実装中

- Reception 画面

  - 予約情報の登録
  - （担当者欄実装中）

- Desk 画面

  - 来場者の情報の追加
  - 予約人数の変更

- 個室担当画面

  - 個室の来場状況を数値で確認
  - 到着情報、退室情報の登録
  - 予約人数の変更
  - タクシーの予約

- タクシー受付画面
  - 一般タクシーの予約状況の確認
  - 一般タクシーの新規予約登録、変更、削除
  - VIP タクシーの予約状況の確認
  - VIP タクシーの予約内容変更、削除
- サイドバー機能

  - 各ページへのリンク機能

- タクシー案内画面
  - 実装中

## 特徴

**機能の網羅性**: 現在の業務で必要な機能がオールインワンとなっています。  
**コンポーネント化**: 変更、修正もすぐに行えます。  
**簡単操作**:　入力はほぼ不要で、マウス操作（iPad ならタップ操作）だけで操作可能です。

## 追加予定

- レスポンシブ対応
- notion との API 連携
- 業務開始/終了ボタン
- タクシー案内画面実装

## 技術スタック

| 項目           | 利用言語･フレームワーク      |
| -------------- | ---------------------------- |
| 利用言語       | TypeScript                   |
| フレームワーク | React, Next.js               |
| CSS            | tailwindCSS                  |
| データベース   | postgreSQL, supabase, prisma |
| 実行環境       | Vercel                       |

## デモ

[こちら](https://reception-system.vercel.app/)からデモサイトにアクセスできます。
