/* 統計の英単語（/eigo/tango/toukei/ の一覧ページ用。アプリ本体では読み込まない）
   w: 見出し  ipa: 発音記号（米）  ja: 訳語  m: ひとことメモ
   ph: 音声合成で読み違えるものだけ、読み方を発音記号で指定 */
window.EIGO = window.EIGO || {};
EIGO.TOUKEI = [
  { h: 'データを要約する', k: '1変数・2変数のデータ', words: [
    { w: 'statistics', ipa: 'stəˈtɪstɪks', ja: '統計学・統計', m: '語源はドイツ語の Statistik（国家に関する学問）。国の人口や財政を数える学問から始まりました。' },
    { w: 'statistic', ipa: 'stəˈtɪstɪk', ja: '統計量', m: '単数形は「データから計算した1つの値」。平均も分散も statistic です。' },
    { w: 'mean', ipa: 'miːn', ja: '平均（算術平均）', m: '「意味する」の mean とは別の語で、「真ん中の」という古いフランス語から来ています。' },
    { w: 'median', ipa: 'ˈmiːdiən', ja: '中央値', m: 'medium（中くらい）と同じ語源。並べたときに真ん中にくる値です。' },
    { w: 'mode', ipa: 'moʊd', ja: '最頻値', m: 'もっとも多く現れる値。「流行（モード）」と同じ語です。' },
    { w: 'variance', ipa: 'ˈveriəns', ja: '分散', m: 'vary（変わる・ばらつく）の名詞。ばらつきの大きさを、平均からの差の2乗で測ります。' },
    { w: 'standard deviation', ipa: 'ˈstændərd ˌdiːviˈeɪʃən', ja: '標準偏差', m: 'deviate は「道（via）から外れる」。平均という道から、各データがどれだけ外れているかの目安です。' },
    { w: 'range', ipa: 'reɪndʒ', ja: '範囲（最大値−最小値）', m: '外れ値1つで大きく変わる、いちばん素朴なばらつきの指標です。' },
    { w: 'quartile', ipa: 'ˈkwɔːrtaɪl', ja: '四分位数', m: 'quart は「4分の1」。データを4等分する3つの値です。' },
    { w: 'percentile', ipa: 'pərˈsentaɪl', ja: 'パーセンタイル', m: '下から何％の位置にあるかを表す値。中央値は50パーセンタイルです。' },
    { w: 'outlier', ipa: 'ˈaʊtlaɪər', ja: '外れ値', m: 'out（外に）＋ lie（ある）。ほかから離れたところにある値です。' },
    { w: 'skewed', ipa: 'skjuːd', ja: '（分布が）歪んだ', m: '右に長く裾を引く分布は right-skewed。所得や売上の分布によく見られます。' },
    { w: 'frequency', ipa: 'ˈfriːkwənsi', ja: '度数・頻度', m: 'relative frequency は相対度数、cumulative frequency は累積度数です。' },
    { w: 'histogram', ipa: 'ˈhɪstəɡræm', ja: 'ヒストグラム', m: '度数を柱の面積で表す図。棒グラフ（bar chart）とは別物として区別されます。' },
    { w: 'scatter plot', ipa: 'ˈskætər plɑːt', ja: '散布図', m: 'scatter は「まき散らす」。2つの変数の組を点としてまいた図です。' },
    { w: 'covariance', ipa: 'koʊˈveriəns', ja: '共分散', m: 'co（ともに）＋ variance。2つの変数が一緒に動く程度を表します。', ph: 'kˌoʊvˈɛɹiəns' },
    { w: 'correlation coefficient', ipa: 'ˌkɔːrəˈleɪʃən ˌkoʊɪˈfɪʃənt', ja: '相関係数', m: 'co（ともに）＋ relation。−1から1の値をとり、直線的な関係の強さを表します。' },
    { w: 'causation', ipa: 'kɔːˈzeɪʃən', ja: '因果関係', m: 'Correlation does not imply causation.（相関は因果を意味しない）は、統計の授業で必ず出てくる一文です。' }
  ] },
  { h: 'データを集める', k: '推測のためのデータ収集法', words: [
    { w: 'population', ipa: 'ˌpɑːpjəˈleɪʃən', ja: '母集団', m: '日常語では「人口」。統計では、知りたい対象の全体を指します。人とは限りません。' },
    { w: 'sample', ipa: 'ˈsæmpəl', ja: '標本', m: '母集団から取り出した一部。sample size は標本の大きさ（n）です。' },
    { w: 'random sampling', ipa: 'ˈrændəm ˈsæmplɪŋ', ja: '無作為抽出', m: 'どの個体も同じ確率で選ばれるように取り出すこと。推測の前提になります。' },
    { w: 'bias', ipa: 'ˈbaɪəs', ja: '偏り・バイアス', m: '取り方や測り方のせいで、結果が一方向にずれること。偶然のばらつきとは区別します。' },
    { w: 'control group', ipa: 'kənˈtroʊl ɡruːp', ja: '対照群', m: '処置をしない比較用のグループ。処置をするほうは treatment group（処置群）です。' },
    { w: 'observational study', ipa: 'ˌɑːbzərˈveɪʃənəl ˈstʌdi', ja: '観察研究', m: '研究者が処置を割り当てず、起きたことを観察する研究。実験（experiment）と対になります。' },
    { w: 'confounding variable', ipa: 'kənˈfaʊndɪŋ ˈveriəbəl', ja: '交絡変数', m: 'confound は「混同させる」。原因と結果の両方に関わり、見かけの関係をつくる変数です。' }
  ] },
  { h: '確率と確率分布', k: '確率・確率分布', words: [
    { w: 'probability', ipa: 'ˌprɑːbəˈbɪləti', ja: '確率', m: 'probable（ありそうな）の名詞。起こりやすさを0から1の数で表します。' },
    { w: 'conditional probability', ipa: 'kənˈdɪʃənəl ˌprɑːbəˈbɪləti', ja: '条件付き確率', m: 'P(A | B) は「B が起きたという条件のもとで A が起きる確率」と読みます。' },
    { w: 'independent', ipa: 'ˌɪndɪˈpendənt', ja: '独立な', m: '一方が起きても、もう一方の確率が変わらないこと。日常語の「自立した」と同じ語です。' },
    { w: 'random variable', ipa: 'ˈrændəm ˈveriəbəl', ja: '確率変数', m: 'とる値が確率で決まる変数。大文字の X で書くのが慣例です。' },
    { w: 'expected value', ipa: 'ɪkˈspektɪd ˈvæljuː', ja: '期待値', m: '確率で重みをつけた平均。E(X) の E は expected の頭文字です。' },
    { w: 'normal distribution', ipa: 'ˈnɔːrməl ˌdɪstrɪˈbjuːʃən', ja: '正規分布', m: 'ガウス分布（Gaussian distribution）とも。左右対称の釣り鐘形です。' },
    { w: 'binomial distribution', ipa: 'baɪˈnoʊmiəl ˌdɪstrɪˈbjuːʃən', ja: '二項分布', m: 'bi（2つ）＋ nomial（項）。成功か失敗かの2通りの試行を繰り返したときの成功回数の分布です。' }
  ] },
  { h: '標本分布と推定', k: '標本分布・推定', words: [
    { w: 'sampling distribution', ipa: 'ˈsæmplɪŋ ˌdɪstrɪˈbjuːʃən', ja: '標本分布', m: '標本を取り直すたびに変わる統計量（標本平均など）の分布です。' },
    { w: 'standard error', ipa: 'ˈstændərd ˈerər', ja: '標準誤差', m: '統計量（標本平均など）の標準偏差。データのばらつきである standard deviation と混同しやすい語です。' },
    { w: 'central limit theorem', ipa: 'ˈsentrəl ˈlɪmɪt ˈθiːərəm', ja: '中心極限定理', m: 'theorem は「定理」。n が大きいと、標本平均の分布が正規分布に近づくという定理です。' },
    { w: 'law of large numbers', ipa: 'lɔː əv lɑːrdʒ ˈnʌmbərz', ja: '大数の法則', m: 'n を大きくすると、標本平均が母平均に近づいていくという法則です。' },
    { w: 'estimate', ipa: 'ˈestɪmət', ja: '（名詞）推定値', m: '名詞は語末が「メット」、動詞（推定する）は「メイト」と読みます。統計ソフトの出力の Estimate 列は名詞です。' },
    { w: 'estimator', ipa: 'ˈestɪmeɪtər', ja: '推定量', m: '推定に使う計算の決まり（式）のこと。そこにデータを入れて出た数が estimate です。' },
    { w: 'unbiased', ipa: 'ʌnˈbaɪəst', ja: '不偏の', m: 'un（ない）＋ biased（偏った）。期待値が推定したい値と一致する性質です。' },
    { w: 'confidence interval', ipa: 'ˈkɑːnfɪdəns ˈɪntərvəl', ja: '信頼区間', m: 'interval は「間隔・区間」。95% confidence interval は「95%信頼区間」です。' },
    { w: 'degrees of freedom', ipa: 'dɪˈɡriːz əv ˈfriːdəm', ja: '自由度', m: '自由に動ける値の個数。統計ソフトの出力では Df や df と略されます。' }
  ] },
  { h: '仮説検定', k: '仮説検定・カイ二乗検定', words: [
    { w: 'hypothesis', ipa: 'haɪˈpɑːθəsɪs', ja: '仮説', m: 'hypo（下に）＋ thesis（置くもの）。議論の下に置く前提です。複数形は hypotheses（…シーズ）。' },
    { w: 'null hypothesis', ipa: 'nʌl haɪˈpɑːθəsɪs', ja: '帰無仮説', m: 'null は「ゼロ・何もない」。差も効果も「ない」とする仮説で、H₀（エイチ・ノート／エイチ・ゼロ）と書きます。' },
    { w: 'alternative hypothesis', ipa: 'ɔːlˈtɜːrnətɪv haɪˈpɑːθəsɪs', ja: '対立仮説', m: 'alternative は「代わりの」。帰無仮説を捨てたときに採る仮説で、H₁ と書きます。' },
    { w: 'test statistic', ipa: 'test stəˈtɪstɪk', ja: '検定統計量', m: 't 値や F 値、カイ二乗値など、検定の判断に使う値です。' },
    { w: 'p-value', ipa: 'ˈpiː ˌvæljuː', ja: 'p値', m: 'p は probability の p。帰無仮説が正しいとしたとき、観測値以上に極端な結果が出る確率です。' },
    { w: 'significance level', ipa: 'sɪɡˈnɪfɪkəns ˈlevəl', ja: '有意水準', m: 'α（アルファ）で表し、5% や 1% がよく使われます。' },
    { w: 'statistically significant', ipa: 'stəˈtɪstɪkli sɪɡˈnɪfɪkənt', ja: '統計的に有意な', m: 'signify は「示す」。偶然とは考えにくい差が「示された」という意味で、「重要な」とは限りません。' },
    { w: 'reject', ipa: 'rɪˈdʒekt', ja: '棄却する', m: 'reject the null hypothesis（帰無仮説を棄却する）。棄却できないときは fail to reject と言い、「採択する」とは言い切りません。' },
    { w: 'Type I error', ipa: 'taɪp wʌn ˈerər', ja: '第1種の過誤', m: 'I はローマ数字の1で「タイプ・ワン」と読みます。正しい帰無仮説を棄却してしまう誤りです。', ph: 'tˈaɪp wˈʌn ˈɛɹɚ' },
    { w: 'Type II error', ipa: 'taɪp tuː ˈerər', ja: '第2種の過誤', m: '「タイプ・ツー」。誤った帰無仮説を棄却できない誤りです。', ph: 'tˈaɪp tˈuː ˈɛɹɚ' },
    { w: 'power', ipa: 'ˈpaʊər', ja: '検出力', m: '差が本当にあるときに、それを検出できる確率。1から第2種の過誤の確率を引いた値です。' },
    { w: 'two-tailed test', ipa: 'ˌtuː ˈteɪld test', ja: '両側検定', m: 'tail は分布の「裾」。両方の裾を棄却域にする検定です。片側検定は one-tailed test。' },
    { w: 't-test', ipa: 'ˈtiː test', ja: 't検定', m: 't 分布は、ビール会社ギネスの技術者ゴセットが Student という筆名で発表したため、Student\'s t とも呼ばれます。' },
    { w: 'chi-square test', ipa: 'ˈkaɪ skwer test', ja: 'カイ二乗検定', m: 'chi（χ）は英語で「カイ」と読みます。chi-squared test とも書きます。' },
    { w: 'contingency table', ipa: 'kənˈtɪndʒənsi ˈteɪbəl', ja: '分割表', m: 'cross tabulation（クロス集計表）とも。2つのカテゴリーの組み合わせごとの度数の表です。' },
    { w: 'analysis of variance', ipa: 'əˈnæləsɪs əv ˈveriəns', ja: '分散分析', m: '頭文字をとって ANOVA（アノーヴァ）。3つ以上の群の平均の差を調べます。' }
  ] },
  { h: '回帰分析', k: '線形モデル', words: [
    { w: 'regression', ipa: 'rɪˈɡreʃən', ja: '回帰', m: 'regress は「後戻りする」。親子の身長で見つかった「平均への回帰」が名前の由来です。' },
    { w: 'explanatory variable', ipa: 'ɪkˈsplænətɔːri ˈveriəbəl', ja: '説明変数', m: 'explain（説明する）の形容詞。independent variable（独立変数）とも呼ばれます。' },
    { w: 'response variable', ipa: 'rɪˈspɑːns ˈveriəbəl', ja: '目的変数・応答変数', m: '説明される側の変数。dependent variable（従属変数）とも呼ばれます。' },
    { w: 'intercept', ipa: 'ˈɪntərsept', ja: '切片', m: '名詞は前を強く読みます（イ́ンターセプト）。統計ソフトの出力では (Intercept) と表示されます。', ph: 'ˈɪntɚsˌɛpt' },
    { w: 'slope', ipa: 'sloʊp', ja: '傾き', m: '日常語では「坂」。説明変数が1増えたときの目的変数の変化量です。' },
    { w: 'coefficient', ipa: 'ˌkoʊɪˈfɪʃənt', ja: '係数', m: '回帰式で変数にかかる数。出力の Coefficients 表に並びます。' },
    { w: 'residual', ipa: 'rɪˈzɪdʒuəl', ja: '残差', m: '「残りもの」という意味。実際の値から、回帰式で当てはめた値を引いた残りです。' },
    { w: 'fitted value', ipa: 'ˈfɪtɪd ˈvæljuː', ja: '当てはめ値', m: 'fit は「合わせる」。回帰式に説明変数を入れて出した値です。' },
    { w: 'least squares', ipa: 'liːst skwerz', ja: '最小二乗法', m: 'least（最も小さい）＋ squares（2乗）。残差の2乗の合計を最小にする方法です。' },
    { w: 'coefficient of determination', ipa: 'ˌkoʊɪˈfɪʃənt əv dɪˌtɜːrmɪˈneɪʃən', ja: '決定係数', m: '出力では R-squared と表示されます。目的変数のばらつきのうち、回帰式で説明できる割合です。' }
  ] }
];
/* 統計ソフト（R）の回帰分析の出力に出る英語 */
EIGO.TOUKEI_OUT = [
  ['Coefficients', '係数の表'],
  ['Estimate', '推定値（切片や傾きの値）'],
  ['Std. Error', '標準誤差（Standard Error の略）'],
  ['t value', 't 値（推定値 ÷ 標準誤差）'],
  ['Pr(>|t|)', 'p 値（帰無仮説のもとで、t の絶対値が観測値以上になる確率）'],
  ['(Intercept)', '切片'],
  ['Residuals', '残差'],
  ['Residual standard error', '残差の標準誤差'],
  ['on 18 degrees of freedom', '自由度18で（単回帰なら n−2）'],
  ['Multiple R-squared', '決定係数'],
  ['Adjusted R-squared', '自由度調整済み決定係数'],
  ['F-statistic', 'F 統計量'],
  ['Signif. codes', '有意性の記号（*** や * の意味）']
];
