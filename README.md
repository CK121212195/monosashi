# monosashi

「数字のものさし」（https://kazumono.com）のソースです。

## 構成

| パス | 内容 |
|---|---|
| `/` | トップページ |
| `/kabuka/` | 非上場株式 株価算定シミュレーター |
| `/shaho/` | 社会保険料・税金最適化シミュレーター |
| `/rented_house/` | 賃貸 vs 持ち家 生涯コスト比較 |
| `/STATLAB/` | STATLAB 統計分析ダッシュボード |
| `/credit/` | 与信スコア 簡易判定 |
| `/lease/` | リース料 簡易計算 |
| `/lease-fo/` | リース FO判定 簡易版 |
| `/about/` `/privacy/` `/contact/` | 固定ページ |

## まだ入っていないもの

`shaho` / `rent-vs-buy` / `statlab` は既存リポジトリから中身をコピーして配置してください。

## AdSense

承認後、`ads.txt` の `pub-XXXXXXXXXXXXXXXX` を実際のIDに置き換え、
各HTMLの `<!-- AdSense サイト全体タグ -->` コメント位置にタグを貼ります。
