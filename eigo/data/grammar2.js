/* 文法解説（後半）　書式は grammar1.js と同じ */
window.EIGO = window.EIGO || {};
EIGO.GRAMMAR = EIGO.GRAMMAR || [];
EIGO.GRAMMAR.push(
{
  id: "g17", cat: "名詞まわり", lv: "HS", title: "代名詞と it の用法",
  lead: "it は「それ」だけではありません。形式主語・形式目的語・強調構文を見抜けると、長い英文が一気に読みやすくなります。",
  sec: [
    { h: "形式主語・形式目的語の it",
      t: "長い主語（to 不定詞・that 節）を後ろに回し、代わりに it を置きます：It is clear that ～。\n**SVOC の O が長いとき**も it を仮に置きます：make **it** possible to do（～することを可能にする）、find **it** difficult to do、consider **it** necessary that ～。",
      ex: [
        ["It is clear that the plan needs more funding.", "その計画にもっと資金が必要なのは明らかだ。", "形式主語"],
        ["The new software makes it possible to work remotely.", "新しいソフトのおかげで遠隔で働けるようになる。", "形式目的語"],
        ["I found it difficult to concentrate.", "集中するのが難しいと感じた。", ""]
      ] },
    { h: "強調構文 It is ～ that …",
      t: "強調したい語句を It is と that の間に挟みます。It is と that を取り除いても文が成り立てば強調構文、成り立たなければ形式主語の文です。\nIt was **not until** ～ that …（～して初めて…した）も強調構文です。",
      ex: [
        ["It was the CEO that made the final decision.", "最終決定を下したのはCEOだった。", "強調構文"],
        ["It was not until 2024 that the index regained its peak.", "その指数が最高値を取り戻したのは2024年になってからだった。", ""]
      ] },
    { h: "one / that / another / other",
      t: "**one**：同じ種類の別の1つ（a＋名詞の代わり）。**that / those**：前に出た名詞そのもの（the＋名詞の代わり）。比較で頻出：The population of Tokyo is larger than **that** of Osaka.\n**another**：もう1つ（不特定）。**the other**：（2つのうち）残りの1つ。**others**：ほかのもの（不特定の複数）。**the others**：残り全部。\n**those who ～**：～する人々。",
      ex: [
        ["The price of this model is higher than that of the old one.", "このモデルの価格は旧モデルの価格より高い。", "that＝the price"],
        ["I have two sisters. One lives in Osaka, and the other lives in Tokyo.", "姉妹が2人いる。1人は大阪、もう1人は東京に住んでいる。", ""],
        ["Those who registered early received a discount.", "早く登録した人は割引を受けた。", ""]
      ] },
    { h: "再帰代名詞・所有代名詞",
      t: "by oneself（1人で）、for oneself（独力で・自分のために）、help oneself to（自由に取って食べる）、enjoy oneself。\n**a friend of mine**（私の友人の1人）：a / this / that と所有格は並べられないので、of＋所有代名詞 を使います（× a my friend）。",
      ex: [
        ["She finished the project by herself.", "彼女は1人でその計画を終えた。", ""],
        ["He is a colleague of mine.", "彼は私の同僚の1人だ。", ""]
      ] }
  ],
  trap: ["比較の相手をそろえる：than that of ～（× than Osaka）。", "2つのうち残りは the other、3つ以上で「もう1つ」は another。", "make it possible to do の it を落とさない（× make possible to do）。"],
  toeic: "「those who」「than that of / those of」「themselves / their own」など、代名詞の格と数の一致を問う問題がよく出ます。",
  qs: [
    { q: "The new system makes ___ easier to track orders.", o: ["it", "this", "that", "them"], a: 0, ja: "新しいシステムで注文の追跡がしやすくなる。", ex: "形式目的語 it。make it＋形容詞＋to do。" },
    { q: "The sales of this year are higher than ___ of last year.", o: ["those", "that", "it", "them"], a: 0, ja: "今年の売上は昨年の売上より多い。", ex: "sales（複数）の繰り返しを避けるので those。単数なら that。" },
    { q: "___ who wish to attend should register by Friday.", o: ["Those", "They", "These", "Them"], a: 0, ja: "出席を希望する方は金曜日までに登録してください。", ex: "those who ～（～する人々）。" },
    { q: "It was in 2019 ___ the company first entered the Asian market.", o: ["that", "which", "when", "what"], a: 0, ja: "その会社が初めてアジア市場に進出したのは2019年だった。", ex: "強調構文 It was ～ that …。It was と that を外しても文が成立します。" },
    { q: "One of the two printers works, but ___ does not.", o: ["the other", "another", "other", "others"], a: 0, ja: "2台のプリンターのうち1台は動くが、もう1台は動かない。", ex: "2つのうちの残り1つは the other。" }
  ]
},
{
  id: "g18", cat: "名詞まわり", lv: "HS", title: "形容詞と副詞",
  lead: "形容詞は名詞を、副詞は動詞・形容詞・副詞・文全体を修飾します。形が似ていて意味が違うペアに注意しましょう。",
  sec: [
    { h: "限定用法だけ・叙述用法だけの形容詞",
      t: "**名詞の前にしか置けない**：main, elder, only, total, mere, former, live（生の）。\n**補語にしかならない**（a- で始まる語が多い）：alive, asleep, awake, afraid, alone, aware, ashamed。「生きている魚」は a live fish / a living fish（× an alive fish）。",
      ex: [
        ["The main reason is cost.", "主な理由は費用だ。", ""],
        ["The patient is still alive.", "その患者はまだ生きている。", "叙述用法"]
      ] },
    { h: "形が似ていて意味が違う副詞",
      t: "**hard**（懸命に）／**hardly**（ほとんど～ない）、**late**（遅く）／**lately**（最近）、**near**（近くに）／**nearly**（ほぼ）、**high**（高く）／**highly**（非常に）、**most**（最も）／**mostly**（主に）／**almost**（ほとんど）、**short**（急に）／**shortly**（まもなく）。",
      ex: [
        ["He works hard every day.", "彼は毎日懸命に働く。", ""],
        ["He hardly works these days.", "彼は最近ほとんど働いていない。", "否定の意味"],
        ["The film was highly praised.", "その映画は非常に高く評価された。", "× high praised"],
        ["The results will be announced shortly.", "結果はまもなく発表される。", ""]
      ] },
    { h: "語順と -ly 形容詞",
      t: "**-thing を修飾する形容詞は後ろ**：something new, nothing special。\n**enough は形容詞・副詞の後ろ**（big enough）、名詞の前（enough time）。\n**-ly でも形容詞**の語：friendly, costly, timely, lively, likely, orderly。副詞として使うときは in a friendly way などとします。\n**almost＋名詞** は不可：× almost people → ○ almost all people / most people。",
      ex: [
        ["Is there anything new in the report?", "報告書に何か新しいことはありますか。", ""],
        ["The staff were very friendly.", "スタッフはとても親切だった。", "friendly は形容詞"],
        ["Most people prefer remote work.", "たいていの人はリモートワークを好む。", "× Almost people"]
      ] }
  ],
  trap: ["hardly / scarcely は「ほとんど～ない」で否定語。not を重ねない。", "almost は副詞なので名詞を直接修飾しない。", "highly は「非常に」、high は「高く」。"],
  toeic: "「動詞を修飾するのは副詞」「be＋副詞＋過去分詞」の品詞問題に加え、shortly / nearly / highly / mostly など意味の紛らわしい副詞が問われます。",
  qs: [
    { q: "The new product was ___ recommended by experts.", o: ["highly", "high", "height", "higher"], a: 0, ja: "その新製品は専門家に強く推薦された。", ex: "過去分詞 recommended を修飾する副詞。highly＝非常に。" },
    { q: "The manager will be with you ___.", o: ["shortly", "short", "shortage", "shorten"], a: 0, ja: "部長はまもなく参ります。", ex: "shortly＝まもなく。" },
    { q: "___ all the participants agreed with the proposal.", o: ["Almost", "Most", "Mostly", "Nearby"], a: 0, ja: "ほとんどすべての参加者がその提案に賛成した。", ex: "all を修飾する副詞 almost（almost all＝ほとんどすべて）。Most all とは言いません。" },
    { q: "There is ___ time left to change the plan.", o: ["hardly any", "hard", "hardly no", "any hardly"], a: 0, ja: "計画を変える時間はほとんど残っていない。", ex: "hardly any＝ほとんど～ない。hardly は否定語なので no と重ねません。" },
    { q: "Is there anything ___ in today's newspaper?", o: ["interesting", "interestingly", "interest", "interested"], a: 0, ja: "今日の新聞に何かおもしろい記事はありますか。", ex: "-thing を修飾する形容詞は後ろに置きます（anything interesting）。記事が人の興味を引く側なので interesting。" }
  ]
},
{
  id: "g19", cat: "品詞と語形", lv: "UNI", title: "品詞の見分け方（TOEIC Part 5 の中心）",
  lead: "TOEIC Part 5 の約3割は「同じ語の品詞違い」を選ぶ問題です。意味を考える前に、空所の位置で品詞を決めるのがコツです。",
  sec: [
    { h: "空所の位置で決まる品詞",
      t: "**冠詞／所有格＋□＋名詞** → 形容詞（a successful launch）\n**冠詞／所有格＋(形容詞)＋□** → 名詞（the success, their decision）\n**be動詞＋□＋過去分詞／～ing** → 副詞（is carefully reviewed）\n**主語＋□＋動詞** → 副詞（She recently joined）\n**他動詞＋□** → 名詞（目的語）\n**be動詞＋□（文末）** → 形容詞（補語）\n**前置詞＋□** → 名詞・動名詞",
      ex: [
        ["The company made a significant investment in AI.", "その会社はAIに多額の投資をした。", "a＋形容詞＋名詞"],
        ["The proposal was carefully reviewed.", "その提案は慎重に検討された。", "be＋副詞＋過去分詞"],
        ["She recently joined the marketing team.", "彼女は最近マーケティングチームに加わった。", "主語＋副詞＋動詞"]
      ] },
    { h: "語尾で見分ける品詞",
      t: "**名詞**：-tion, -sion, -ment, -ness, -ity, -ance, -ence, -er / -or（人）, -ist, -ship, -al（approval, arrival）\n**形容詞**：-ive, -able, -ible, -ous, -ful, -less, -al, -ic, -ent, -ant, -ary\n**副詞**：形容詞＋-ly\n**動詞**：-ize, -ify, -en, -ate",
      ex: [
        ["We appreciate your cooperation.", "ご協力に感謝いたします。", "所有格＋名詞"],
        ["The results were impressive.", "結果は見事だった。", "be＋形容詞"]
      ] },
    { h: "人か物か・可算か不可算か",
      t: "名詞が2つ候補にあるときは、**人**（applicant, employee, supervisor）と**事・物**（application, employment, supervision）を区別し、冠詞の有無で**可算・不可算**を判断します。\n例：a ___ for the position → applicant（人・可算）、___ for the position must be submitted → applications（物・複数）。",
      ex: [
        ["Every applicant must submit a résumé.", "すべての応募者は履歴書を出さなければならない。", "人"],
        ["Applications will be accepted until May 1.", "応募書類は5月1日まで受け付ける。", "物"]
      ] }
  ],
  trap: ["副詞は名詞を修飾しない（× a carefully plan）。", "-ly で終わっても形容詞の語がある（costly, timely, friendly）。", "-al は名詞の場合（approval, proposal, arrival, renewal）と形容詞の場合（national）がある。"],
  toeic: "品詞問題は1問10〜20秒で解けるので、確実な得点源になります。本文を全部読まず、空所の前後2〜3語だけで判断する練習をしましょう。",
  qs: [
    { q: "The new manager made a ___ change to the schedule.", o: ["significant", "significantly", "significance", "signify"], a: 0, ja: "新しい部長は予定に大きな変更を加えた。", ex: "a＋□＋名詞（change）なので形容詞。" },
    { q: "All documents must be ___ checked before submission.", o: ["carefully", "careful", "care", "carefulness"], a: 0, ja: "すべての書類は提出前に注意深く確認されなければならない。", ex: "be＋□＋過去分詞 なので副詞。" },
    { q: "We are pleased to announce the ___ of our new branch.", o: ["opening", "open", "opens", "opened"], a: 0, ja: "新支店の開設をお知らせいたします。", ex: "the＋□＋of の位置は名詞。opening（開設）。" },
    { q: "Ms. Kim's ___ to the project was highly valued.", o: ["contribution", "contribute", "contributed", "contributory"], a: 0, ja: "キムさんのその計画への貢献は高く評価された。", ex: "所有格＋□ は名詞。contribution to ～（～への貢献）。" },
    { q: "Each ___ will receive an email confirming the interview date.", o: ["applicant", "application", "apply", "applicable"], a: 0, ja: "各応募者には面接日を確認するメールが届く。", ex: "Each＋単数の可算名詞。メールを受け取るのは人なので applicant。" }
  ]
},
{
  id: "g20", cat: "比較", lv: "HS", title: "比較①（原級・比較級・最上級）",
  lead: "比較は「何と何を比べているか」をそろえるのが最大のポイントです。",
  sec: [
    { h: "原級・倍数表現",
      t: "**as ～ as**：同じくらい～。否定 not as (so) ～ as：…ほど～ではない。\n**倍数**：twice as ～ as（2倍～）、three times as ～ as、half as ～ as。名詞を使って three times **the size of** ～ とも言えます。\n**as ～ as possible / as ～ as S can**：できるだけ～。",
      ex: [
        ["This model is twice as fast as the old one.", "このモデルは旧型の2倍速い。", "倍数"],
        ["Please reply as soon as possible.", "できるだけ早くご返信ください。", ""]
      ] },
    { h: "比較級の強調と the＋比較級",
      t: "比較級の強調は **much, far, even, still, a lot**（very は不可）。\n2つのうちで「より～なほう」には the がつきます：the **taller** of the two。\n**ラテン語系の比較**は than ではなく to：superior to, inferior to, senior to, junior to, prior to, prefer A to B。",
      ex: [
        ["The new system is much faster than the old one.", "新しいシステムは古いものよりずっと速い。", "× very faster"],
        ["This product is superior to its rivals.", "この製品は競合品より優れている。", "× superior than"]
      ] },
    { h: "最上級",
      t: "the＋最上級＋in＋場所・集団（in the world, in the company）／of＋複数（of all, of the three）。\n**one of the＋最上級＋複数名詞**（最も～なものの1つ）。\n最上級の強調は **by far / much** the best、the very best。",
      ex: [
        ["It is one of the largest companies in Asia.", "それはアジアで最大級の企業の1つだ。", "複数名詞"],
        ["This is by far the best result we have ever had.", "これはこれまでで断然最高の結果だ。", ""]
      ] },
    { h: "比べる対象をそろえる",
      t: "The climate of Japan is milder than **that of** Canada.（日本の気候とカナダの気候）。× than Canada（気候と国を比べてしまう）。",
      ex: [
        ["The price of gold is higher than that of silver.", "金の価格は銀の価格より高い。", ""]
      ] }
  ],
  trap: ["比較級を very で強めない（much / far / even）。", "superior / inferior / prefer は to。", "one of the＋最上級＋複数名詞。"],
  toeic: "「比較級を強める語（much / far / even）」「than があれば比較級」「of the two なら the＋比較級」が出題されます。",
  qs: [
    { q: "This year's profits were ___ higher than expected.", o: ["much", "very", "more", "most"], a: 0, ja: "今年の利益は予想よりずっと多かった。", ex: "比較級 higher を強めるのは much。very は比較級を修飾できません。" },
    { q: "The new model is ___ to the previous one in every way.", o: ["superior", "better", "more superior", "superiorly"], a: 0, ja: "新モデルはあらゆる点で前のモデルより優れている。", ex: "to があるので superior to（～より優れている）。better なら than。" },
    { q: "It is one of the most popular ___ in the city.", o: ["restaurants", "restaurant", "restaurant's", "restaurants'"], a: 0, ja: "そこは市内で最も人気のあるレストランの1つだ。", ex: "one of the＋最上級＋複数名詞。" },
    { q: "Of the two candidates, Mr. Park is the ___ experienced.", o: ["more", "most", "much", "many"], a: 0, ja: "2人の候補者のうち、パク氏のほうが経験豊富だ。", ex: "2つのうちの一方なので the＋比較級。" },
    { q: "The population of Tokyo is larger than ___ of any other city in Japan.", o: ["that", "those", "it", "one"], a: 0, ja: "東京の人口は日本のほかのどの都市の人口よりも多い。", ex: "比べる対象をそろえるため、the population を that で受けます。" }
  ]
},
{
  id: "g21", cat: "比較", lv: "HS", title: "比較②（重要構文）",
  lead: "英検準1級・1級の長文で意味を取り違えやすい比較の構文をまとめます。",
  sec: [
    { h: "the＋比較級, the＋比較級",
      t: "「～すればするほど…」。The **more** you practice, the **better** you become.\n形容詞・副詞は the の直後に移動する点に注意（× The more you become good）。",
      ex: [
        ["The earlier you start, the more you will save.", "早く始めるほど、多く貯められる。", ""],
        ["The longer the maturity, the larger the price change.", "満期が長いほど、価格変動は大きい。", "be動詞の省略"]
      ] },
    { h: "no more than / no less than など",
      t: "**no more than**＝only（～しか）、**no less than**＝as much / many as（～も）。\n**not more than**＝at most（せいぜい）、**not less than**＝at least（少なくとも）。\n**A is no more B than C is D**：AがBでないのはCがDでないのと同じ（クジラの公式）。\n**no longer**：もはや～ない。",
      ex: [
        ["He paid no more than ten dollars.", "彼はたった10ドルしか払わなかった。", "少ないと感じている"],
        ["No less than 500 people attended.", "500人もの人が出席した。", "多いと感じている"],
        ["The service is no longer available.", "そのサービスはもう利用できない。", ""]
      ] },
    { h: "原級・比較級で最上級を表す",
      t: "No other ＋単数名詞 is as ～ as A／No other ＋単数名詞 is ～er than A／A is ～er than any other＋単数名詞。すべて「Aが最も～」の意味です。\n**比較級 and 比較級**：ますます～（more and more, better and better）。\n**know better than to do**：～するほど愚かではない。",
      ex: [
        ["No other company in the industry is as profitable as this one.", "業界でこれほどもうかっている会社はほかにない。", ""],
        ["AI tools are becoming more and more common.", "AIツールはますます一般的になっている。", ""],
        ["He knows better than to trust such offers.", "彼はそんな話を信じるほど愚かではない。", ""]
      ] }
  ],
  trap: ["any other の後は単数名詞（any other city）。", "no more than（～しか）と not more than（せいぜい）を混同しない。", "the＋比較級 の構文では形容詞を the の直後へ。"],
  toeic: "Part 7 で no longer / no later than（遅くとも～までに）など、比較の形をした定型表現の意味が問われます。no later than は締め切りで超頻出です。",
  qs: [
    { q: "The ___ you prepare, the more confident you will feel.", o: ["more", "much", "most", "many"], a: 0, ja: "準備すればするほど、自信が持てるようになる。", ex: "the＋比較級, the＋比較級。" },
    { q: "Please submit the form no ___ than June 30.", o: ["later", "late", "latest", "lately"], a: 0, ja: "遅くとも6月30日までに書類を提出してください。", ex: "no later than ～（遅くとも～までに）は締め切りの定型表現。" },
    { q: "The old model is no ___ available in stores.", o: ["longer", "long", "more long", "length"], a: 0, ja: "旧モデルはもう店頭では手に入らない。", ex: "no longer（もはや～ない）。" },
    { q: "Mount Fuji is higher than any other ___ in Japan.", o: ["mountain", "mountains", "the mountain", "of mountains"], a: 0, ja: "富士山は日本のほかのどの山よりも高い。", ex: "any other＋単数名詞。" },
    { q: "A bat is no more a bird than a whale is a fish.", o: ["コウモリが鳥でないのは、クジラが魚でないのと同じだ", "コウモリはクジラより鳥に近い", "コウモリもクジラも鳥である", "コウモリはせいぜい鳥程度だ"], a: 0, ja: "（意味を選ぶ問題）", ex: "A is no more B than C is D（AがBでないのはCがDでないのと同じ）。「クジラの公式」と呼ばれる構文です。", lv: "A" }
  ]
},
{
  id: "g22", cat: "仮定法", lv: "HS", title: "仮定法①（過去・過去完了・混合）",
  lead: "仮定法は「事実とは違う」ことを、時制を1つ過去にずらして表します。この「ずらし」が現実との距離を表します。",
  sec: [
    { h: "仮定法過去：今の事実と反対",
      t: "If S＋**過去形**, S＋**would / could / might＋原形**。be動詞は主語にかかわらず **were** が正式（口語では was も）。",
      ex: [
        ["If I had more time, I would learn Spanish.", "もっと時間があれば、スペイン語を学ぶのに。", "実際は時間がない"],
        ["If I were you, I would accept the offer.", "私があなたなら、その申し出を受けるだろう。", ""]
      ] },
    { h: "仮定法過去完了：過去の事実と反対",
      t: "If S＋**had＋過去分詞**, S＋**would / could / might＋have＋過去分詞**。",
      ex: [
        ["If we had invested earlier, we would have made a profit.", "もっと早く投資していれば、利益が出ていただろう。", "実際は投資しなかった"],
        ["If the bank had held fewer long-term bonds, it might have survived.", "長期債の保有が少なければ、その銀行は生き残れたかもしれない。", ""]
      ] },
    { h: "混合仮定法と未来の仮定",
      t: "**混合**：過去の条件が今に影響する。If S＋had p.p., S＋would＋原形（now）。\n**If S should＋原形**：万一～なら（主節は命令文や will も可）。\n**If S were to＋原形**：仮に～すれば（実現性に関係なく仮定）。",
      ex: [
        ["If I had taken the job, I would be living in London now.", "あの仕事を受けていたら、今ごろロンドンに住んでいるだろう。", "混合"],
        ["If you should have any questions, please contact us.", "万一ご質問があれば、ご連絡ください。", ""],
        ["If prices were to double, many families would struggle.", "仮に物価が倍になれば、多くの家庭が苦しむだろう。", ""]
      ] }
  ],
  trap: ["If 節に would を入れない（× If I would have time）。", "過去の仮定の主節は would have p.p.（× would ＋過去形）。", "混合仮定法：if 節は過去完了、主節は would＋原形（now などが手がかり）。"],
  toeic: "Part 5 で「If S had p.p. → would have p.p.」の対応、Part 6 / 7 で If you should ～ / Should you ～ の丁寧な表現が出ます。",
  qs: [
    { q: "If the weather ___ better, we would hold the party outside.", o: ["were", "is", "will be", "has been"], a: 0, ja: "天気がもっとよければ、パーティーを屋外で開くのに。", ex: "主節が would＋原形 なので仮定法過去。be動詞は were。" },
    { q: "If we had known about the delay, we ___ another flight.", o: ["would have booked", "would book", "will book", "had booked"], a: 0, ja: "遅れを知っていたら、別の便を予約していただろう。", ex: "if 節が had known（仮定法過去完了）なので、主節は would have p.p.。" },
    { q: "If she had accepted the offer, she ___ in New York now.", o: ["would be working", "would have worked", "will work", "had worked"], a: 0, ja: "あの申し出を受けていたら、彼女は今ごろニューヨークで働いているだろう。", ex: "now があるので混合仮定法。過去の仮定→今の結果で would＋原形（進行形）。", lv: "A" },
    { q: "If you ___ need further assistance, please call our help desk.", o: ["should", "would", "shall", "must"], a: 0, ja: "万一さらにお手伝いが必要でしたら、ヘルプデスクにお電話ください。", ex: "If S should＋原形（万一～なら）。主節は命令文でも構いません。" },
    { q: "If the company ___ more carefully, it would not have lost so much money.", o: ["had planned", "planned", "has planned", "would plan"], a: 0, ja: "その会社がもっと慎重に計画していれば、あれほどの損失は出さなかっただろう。", ex: "主節が would not have lost（過去の事実と反対）なので、if 節は過去完了。" }
  ]
},
{
  id: "g23", cat: "仮定法", lv: "HS", title: "仮定法②（wish・as if・倒置・仮定法現在）",
  lead: "if を使わない仮定法と、TOEICで最頻出の「仮定法現在（that 節の原形）」です。",
  sec: [
    { h: "I wish / If only / as if / It is time",
      t: "**I wish＋過去形**（今～ならいいのに）、**I wish＋過去完了**（あのとき～だったらよかったのに）。If only ～ はより強い願望。\n**as if / as though＋過去形**：まるで～であるかのように（同時）／＋過去完了（それ以前）。\n**It is (high) time＋過去形**：もう～してもいい頃だ。",
      ex: [
        ["I wish I spoke Chinese.", "中国語が話せたらいいのに。", ""],
        ["He talks as if he knew everything.", "彼は何でも知っているかのように話す。", ""],
        ["It is time we changed our strategy.", "もう戦略を変えてもいい頃だ。", ""]
      ] },
    { h: "without / but for / if it were not for",
      t: "「～がなければ」：**If it were not for ～**（今）＝**Were it not for ～**＝**Without / But for ～**。\n「～がなかったら」：**If it had not been for ～**（過去）＝**Had it not been for ～**＝**Without ～**。\n**otherwise**：そうでなければ（前の文を条件にする）。",
      ex: [
        ["Without your help, we could not have finished on time.", "あなたの助けがなかったら、時間どおりに終えられなかっただろう。", ""],
        ["Had it not been for the loan, the company would have closed.", "その融資がなかったら、会社は閉鎖していただろう。", "倒置"],
        ["Leave now; otherwise you will miss the train.", "今出なさい。そうしないと電車に乗り遅れる。", ""]
      ] },
    { h: "if の省略による倒置",
      t: "If を省略すると、were / had / should が文頭に出ます。\nIf I were → **Were I**、If we had known → **Had we known**、If you should have → **Should you have**。\nビジネスメールの **Should you have any questions, please ～** は超頻出です。",
      ex: [
        ["Should you have any questions, please do not hesitate to contact us.", "ご質問がございましたら、お気軽にお問い合わせください。", ""],
        ["Had I known the truth, I would have acted differently.", "真実を知っていたら、違う行動をとっていただろう。", ""]
      ] },
    { h: "仮定法現在（提案・要求・必要の that 節）",
      t: "**suggest, recommend, propose, request, require, demand, insist, ask, urge** の that 節、**It is essential / necessary / important / vital / imperative that** の that 節では、動詞は**原形**（主語が he / she でも -s をつけない、過去の文でも原形）。イギリス英語では should＋原形 も使います。",
      ex: [
        ["The doctor recommended that he get more rest.", "医師は彼にもっと休むよう勧めた。", "× gets / got"],
        ["It is essential that every employee be trained.", "すべての従業員が研修を受けることが不可欠だ。", "be＋過去分詞"]
      ] }
  ],
  trap: ["recommend / suggest / require that の後は原形（× that he goes）。", "Should you have ～ は疑問文ではなく「もし～なら」。", "Were it not for / Had it not been for の時制の違い。"],
  toeic: "「suggest / request / require that S＋原形」は Part 5 の最頻出ポイントの1つ。「Should you ～」は Part 6 / 7 のメール文でほぼ毎回登場します。",
  qs: [
    { q: "The committee requested that the report ___ by Monday.", o: ["be submitted", "is submitted", "was submitted", "submits"], a: 0, ja: "委員会は報告書を月曜日までに提出するよう求めた。", ex: "request that S＋原形（仮定法現在）。報告書は提出される側なので be submitted。" },
    { q: "___ you have any questions, please contact our customer service team.", o: ["Should", "If", "Would", "Unless"], a: 0, ja: "ご質問がございましたら、カスタマーサービスまでご連絡ください。", ex: "If you should have → Should you have（倒置）。If なら If you have。" },
    { q: "It is essential that each participant ___ the safety rules.", o: ["follow", "follows", "followed", "will follow"], a: 0, ja: "各参加者が安全規則に従うことが不可欠だ。", ex: "It is essential that S＋原形。三単現の -s はつけません。" },
    { q: "___ it not been for her advice, I would have made a serious mistake.", o: ["Had", "Were", "If", "Should"], a: 0, ja: "彼女の助言がなかったら、私は重大な間違いを犯していただろう。", ex: "If it had not been for → Had it not been for（過去の仮定の倒置）。", lv: "A" },
    { q: "It is about time we ___ a decision.", o: ["made", "make", "will make", "have made"], a: 0, ja: "そろそろ決断してもいい頃だ。", ex: "It is (about / high) time S＋過去形。" }
  ]
},
{
  id: "g24", cat: "特殊構文", lv: "HS", title: "否定の表現",
  lead: "英語の否定は not だけではありません。部分否定と「否定語を使わない否定」は長文の内容一致で必ず狙われます。",
  sec: [
    { h: "部分否定と全体否定",
      t: "**部分否定**（全部が～というわけではない）：not all, not every, not always, not necessarily, not completely, not both。\n**全体否定**（どれも～ない）：none, no, never, neither, not any。",
      ex: [
        ["Not all investors agree with the policy.", "すべての投資家がその政策に賛成しているわけではない。", "部分否定"],
        ["None of the investors agreed with the policy.", "その政策に賛成した投資家は1人もいなかった。", "全体否定"],
        ["Expensive products are not always better.", "高価な製品が常によいとは限らない。", ""]
      ] },
    { h: "準否定語",
      t: "hardly / scarcely（ほとんど～ない：程度）、seldom / rarely（めったに～ない：頻度）、few / little（ほとんどない：数・量）。これらは否定語なので not と重ねません。",
      ex: [
        ["She rarely takes a day off.", "彼女はめったに休みを取らない。", ""],
        ["Few people noticed the error.", "その誤りに気づいた人はほとんどいなかった。", ""]
      ] },
    { h: "否定語を使わない否定・二重否定",
      t: "far from ～（決して～ではない）、anything but ～（決して～ではない）、the last person to do（最も～しそうにない人）、fail to do（～しない）、remain to be done（まだ～されていない）、free from ～（～がない）、beyond ～（～できない：beyond description）。\n**二重否定**：never ～ without ～ing（～すれば必ず…する）、not without ～（～がないわけではない）。",
      ex: [
        ["The results are far from satisfactory.", "結果は満足できるものには程遠い。", ""],
        ["He is the last person to tell a lie.", "彼は決してうそをつくような人ではない。", ""],
        ["The cause of the problem remains to be seen.", "問題の原因はまだわかっていない。", ""],
        ["I never see this photo without thinking of my hometown.", "この写真を見ると必ず故郷を思い出す。", "二重否定"]
      ] }
  ],
  trap: ["not always / not necessarily は「いつも～とは限らない」（部分否定）。", "hardly / seldom / few / little に not を重ねない。", "anything but は「決して～ではない」、nothing but は「～にすぎない・～だけ」。"],
  toeic: "Part 7 の NOT 問題や内容一致で、部分否定・準否定の読み違いがそのまま失点になります。",
  qs: [
    { q: "The new rules are ___ from perfect, but they are an improvement.", o: ["far", "free", "away", "apart"], a: 0, ja: "新しい規則は完璧からは程遠いが、改善ではある。", ex: "far from ～（決して～ではない・～には程遠い）。" },
    { q: "Not ___ customer is satisfied with the new design.", o: ["every", "any", "no", "none"], a: 0, ja: "すべての顧客が新しいデザインに満足しているわけではない。", ex: "Not every（部分否定）。customer が単数なので every。" },
    { q: "There is ___ any milk left in the fridge.", o: ["hardly", "hard", "not", "no"], a: 0, ja: "冷蔵庫に牛乳はほとんど残っていない。", ex: "hardly any＝ほとんど～ない。not any なら「まったくない」ですが、ここでは There is not any milk の語順が必要です。" },
    { q: "The details of the merger ___ to be announced.", o: ["remain", "keep", "stay", "fail"], a: 0, ja: "合併の詳細はまだ発表されていない。", ex: "remain to be done（まだ～されていない）。" },
    { q: "The CEO is the ___ person to give up easily.", o: ["last", "least", "latest", "later"], a: 0, ja: "そのCEOは決して簡単にあきらめるような人ではない。", ex: "the last person to do（最も～しそうにない人）。" }
  ]
},
{
  id: "g25", cat: "特殊構文", lv: "UNI", title: "倒置・強調・省略・挿入・同格",
  lead: "英検1級やTOEIC 900点レベルの長文では、語順の変化を見抜けるかが読解速度を左右します。",
  sec: [
    { h: "否定語句が文頭に出ると倒置",
      t: "Never / Rarely / Seldom / Hardly / Little / Not until ～ / Only＋副詞句 / Under no circumstances / Not only が文頭に来ると、**疑問文と同じ語順**（助動詞＋S＋V）になります。",
      ex: [
        ["Never have I seen such a beautiful painting.", "これほど美しい絵を見たことがない。", ""],
        ["Only after the meeting did I realize the mistake.", "会議が終わってから初めて誤りに気づいた。", ""],
        ["Under no circumstances should you share your password.", "どんな場合でもパスワードを共有してはいけない。", ""],
        ["Little did he know that the company would soon collapse.", "その会社がまもなく破綻するとは彼は夢にも思わなかった。", ""]
      ] },
    { h: "So / Neither と、補語・場所句の倒置",
      t: "**So＋V＋S**（Sもそうだ）、**Neither / Nor＋V＋S**（Sもそうではない）。\n補語や場所の句が文頭に来ると S と V が入れ替わることがあります：**Enclosed is** a copy of the invoice.（請求書の写しを同封します）／On the hill **stands** an old castle.",
      ex: [
        ["She likes jazz, and so do I.", "彼女はジャズが好きで、私もそうだ。", ""],
        ["Attached is the revised schedule.", "修正した予定表を添付します。", "補語の倒置"]
      ] },
    { h: "強調・省略・同格",
      t: "**強調**：do / does / did＋原形（本当に～する）、the very＋名詞（まさにその）、ever / on earth / in the world（疑問詞の強調）。\n**省略**：副詞節で主語と be動詞を省く（while (I was) in Tokyo, if (it is) necessary, when (it is) completed）、if any / if ever（たとえあるとしても）。\n**同格**：名詞＋, 名詞（説明を並べる）、名詞＋that 節（the fact that ～）。",
      ex: [
        ["I did send the email yesterday.", "昨日、確かにメールを送りました。", "強調の did"],
        ["If necessary, we will extend the deadline.", "必要なら締め切りを延ばします。", "省略"],
        ["There are few, if any, mistakes in the report.", "その報告書には誤りはほとんどない（あるとしてもごくわずか）。", ""],
        ["Mr. Tanaka, the new director, will speak first.", "新任の部長である田中氏が最初に話す。", "同格"]
      ] }
  ],
  trap: ["否定語句が文頭なら助動詞を主語の前に（× Never I have seen）。", "Only＋副詞句が文頭でも倒置（Only then did I ～）。", "Enclosed / Attached is ～ は S と V の一致に注意（Attached are the files）。"],
  toeic: "Part 5 で「Rarely / Seldom / Only when で始まる倒置」「Attached / Enclosed is / are」、Part 7 で強調や挿入の読み取りが出ます。",
  qs: [
    { q: "Rarely ___ such strong demand for a new product.", o: ["have we seen", "we have seen", "we saw", "saw we"], a: 0, ja: "新製品にこれほど強い需要があるのはめったに見たことがない。", ex: "否定語 Rarely が文頭なので倒置（助動詞 have＋主語 we＋seen）。" },
    { q: "Enclosed ___ a copy of the signed contract.", o: ["is", "are", "be", "being"], a: 0, ja: "署名済みの契約書の写しを同封いたします。", ex: "補語 Enclosed が文頭に出た倒置。主語は a copy（単数）なので is。" },
    { q: "Not until the data was reviewed ___ the error.", o: ["did we notice", "we noticed", "we did notice", "noticed we"], a: 0, ja: "データを見直して初めて、私たちは誤りに気づいた。", ex: "Not until ～ が文頭なので主節が倒置（did＋S＋原形）。", lv: "A" },
    { q: "The manager didn't approve the plan, and ___ did the director.", o: ["neither", "so", "either", "nor either"], a: 0, ja: "部長はその計画を承認せず、取締役もしなかった。", ex: "否定文を受けて「～もそうではない」は neither＋V＋S。" },
    { q: "Please contact the IT department ___ necessary.", o: ["if", "unless", "whether", "despite"], a: 0, ja: "必要であればIT部門に連絡してください。", ex: "if (it is) necessary の省略形。" }
  ]
},
{
  id: "g26", cat: "特殊構文", lv: "HS", title: "話法と時制の一致",
  lead: "人の発言を伝えるとき、時制や代名詞、時・場所の表現が「伝える側」の視点に切り替わります。",
  sec: [
    { h: "時制の一致",
      t: "主節が過去なら、that 節の動詞も過去側にずれます：現在→過去、過去・現在完了→過去完了、will→would。\n**例外**：不変の真理・今も続く習慣・歴史上の事実・仮定法は、ずらさなくてよい（歴史的事実は過去形のまま）。",
      ex: [
        ["She said that she was busy.", "彼女は忙しいと言った。", "is → was"],
        ["He said that he would call me later.", "あとで電話すると彼は言った。", "will → would"],
        ["Our teacher told us that water boils at 100 degrees.", "先生は水は100度で沸騰すると教えてくれた。", "不変の真理"]
      ] },
    { h: "直接話法から間接話法へ",
      t: "say to 人 → tell 人。疑問文は ask (人) if / whether ～、または ask＋疑問詞＋S＋V（平叙文の語順）。命令文は tell / ask 人 to do。\n時・場所の語も変わります：now → then、today → that day、yesterday → the day before / the previous day、tomorrow → the next day / the following day、here → there、this → that、ago → before。",
      ex: [
        ["He asked me if I had finished the report.", "彼は私に報告書を書き終えたかどうか尋ねた。", "疑問文"],
        ["She asked me where I lived.", "彼女は私にどこに住んでいるのか尋ねた。", "× where did I live"],
        ["The manager told us to arrive early.", "部長は私たちに早く来るよう言った。", "命令文"]
      ] }
  ],
  trap: ["間接疑問は平叙文の語順（× asked where did I live）。", "say to 人 の代わりに tell 人（× said me）。", "歴史的事実は過去完了にしない。"],
  toeic: "間接疑問の語順（I wonder if you could ～ / Could you tell me where the station is?）が頻出です。",
  qs: [
    { q: "Could you tell me where the conference room ___?", o: ["is", "is it", "does it", "it is being"], a: 0, ja: "会議室がどこにあるか教えていただけますか。", ex: "間接疑問は平叙文の語順（where＋S＋V）。" },
    { q: "She said that she ___ the job the following week.", o: ["would start", "will start", "starts", "has started"], a: 0, ja: "彼女は翌週から仕事を始めると言った。", ex: "主節が過去なので will → would（時制の一致）。" },
    { q: "The manager ___ us to finish the task by noon.", o: ["told", "said", "spoke", "talked"], a: 0, ja: "部長は私たちに正午までにその仕事を終えるよう言った。", ex: "tell 人 to do。say は人を直接目的語にとりません。" },
    { q: "He asked me ___ I could attend the meeting.", o: ["whether", "that", "what", "which"], a: 0, ja: "彼は私に会議に出席できるかどうか尋ねた。", ex: "Yes / No で答える疑問文を伝えるときは if / whether。" },
    { q: "Our history teacher told us that World War II ___ in 1945.", o: ["ended", "had ended", "has ended", "ends"], a: 0, ja: "歴史の先生は第二次世界大戦が1945年に終わったと教えてくれた。", ex: "歴史上の事実は時制の一致の例外で、過去形のままでよい。" }
  ]
},
{
  id: "g27", cat: "動詞の語法", lv: "HS", title: "使役・知覚動詞と「O に～させる」動詞",
  lead: "「人に～させる」を表す動詞は、後ろの形（原形・to 不定詞・過去分詞）が動詞ごとに決まっています。",
  sec: [
    { h: "使役動詞：make / let / have / get",
      t: "**make O 原形**：（強制的に）～させる。**let O 原形**：（許可して）～させる。**have O 原形**：（頼んで・仕事として）～してもらう。**get O to do**：（説得して）～してもらう。\n**have / get O 過去分詞**：O を～してもらう・～される。**help O (to) 原形**：O が～するのを手伝う（to は省略可）。",
      ex: [
        ["The manager made us rewrite the report.", "部長は私たちに報告書を書き直させた。", "make O 原形"],
        ["Let me know if you need anything.", "何か必要なら知らせてください。", "let O 原形"],
        ["I had the technician fix my computer.", "技術者にパソコンを直してもらった。", "have O 原形"],
        ["I got my colleague to check the data.", "同僚にデータを確認してもらった。", "get O to do"],
        ["I had my hair cut yesterday.", "昨日髪を切ってもらった。", "have O 過去分詞"]
      ] },
    { h: "O to do をとる動詞",
      t: "allow, permit, enable, encourage, require, ask, tell, advise, force, cause, persuade, expect, invite, remind, urge は **O to do** の形です。\n受動態では be allowed / required / encouraged / expected to do。",
      ex: [
        ["The new app enables users to pay by phone.", "新しいアプリで利用者は電話で支払えるようになる。", ""],
        ["Employees are encouraged to take their vacations.", "従業員は休暇を取るよう奨励されている。", "受動態"],
        ["The rain caused the event to be postponed.", "雨のため、行事は延期された。", ""]
      ] },
    { h: "知覚動詞",
      t: "see, watch, hear, feel, notice ＋O＋**原形**（～するのを最初から最後まで）／**～ing**（～しているところを）／**過去分詞**（～されるのを）。受動態では原形が to 不定詞になります：He was seen to enter the building.",
      ex: [
        ["I saw him leave the office.", "彼が事務所を出るのを見た。", ""],
        ["I heard my name called.", "自分の名前が呼ばれるのが聞こえた。", "名前は呼ばれる"]
      ] }
  ],
  trap: ["make / let / have の後に to をつけない（× made us to rewrite）。", "get は O to do（× got him check）。", "allow / enable / require は O to do（× allow users paying）。"],
  toeic: "「enable / allow / require O to do」「be required / encouraged to do」「have O done」が頻出です。",
  qs: [
    { q: "The new software allows users ___ files easily.", o: ["to share", "share", "sharing", "shared"], a: 0, ja: "新しいソフトで利用者は簡単にファイルを共有できる。", ex: "allow O to do。" },
    { q: "The manager had his assistant ___ the meeting room.", o: ["book", "to book", "booked", "booking"], a: 0, ja: "部長はアシスタントに会議室を予約してもらった。", ex: "have O 原形（Oに～してもらう）。assistant が予約する側。" },
    { q: "Please let us ___ if you have any questions.", o: ["know", "to know", "knowing", "known"], a: 0, ja: "ご質問があればお知らせください。", ex: "let O 原形。Let us know は定型表現。" },
    { q: "I need to get my passport ___ before the trip.", o: ["renewed", "renew", "to renew", "renewing"], a: 0, ja: "旅行の前にパスポートを更新してもらう必要がある。", ex: "パスポートは「更新される」側なので get O 過去分詞。" },
    { q: "All staff are required ___ the training by the end of the month.", o: ["to complete", "completing", "complete", "completed"], a: 0, ja: "全職員は月末までに研修を修了することが求められている。", ex: "be required to do。" }
  ]
},
{
  id: "g28", cat: "動詞の語法", lv: "HS", title: "主語と動詞の一致",
  lead: "主語が長いときや接続詞で結ばれているとき、動詞の単数・複数を取り違えやすくなります。",
  sec: [
    { h: "修飾語句を外して主語を見つける",
      t: "The **results** of the survey **show** ～（results が主語）。The **list** of items **is** ～（list が主語）。\n前置詞句・関係詞節・分詞句を外すと、本当の主語が見えます。",
      ex: [
        ["The quality of the products has improved.", "製品の品質は向上した。", "主語は quality"],
        ["The people who live next door are very kind.", "隣に住んでいる人たちはとても親切だ。", "主語は people"]
      ] },
    { h: "接続詞で結ばれた主語",
      t: "**A and B**：複数。**either A or B / neither A nor B / not only A but also B / not A but B**：**B**に一致。**A as well as B / A along with B / A together with B**：**A**に一致。",
      ex: [
        ["Neither the manager nor the employees were informed.", "部長も従業員も知らされていなかった。", "B＝employees"],
        ["The CEO, as well as the directors, is attending.", "取締役だけでなくCEOも出席する。", "A＝CEO"]
      ] },
    { h: "単数扱い・複数扱いの注意",
      t: "**each / every / either / neither（単独）**：単数。**one of the＋複数名詞**：単数（One of the files is missing）。**動名詞・to 不定詞・名詞節の主語**：単数。**分数・percent・most・some・half of＋名詞**：of の後の名詞に一致（Half of the money is / Half of the students are）。**there is / are**：後ろの名詞に一致。**時間・金額・距離のまとまり**：単数（Ten years is a long time）。",
      ex: [
        ["One of the printers is out of order.", "プリンターの1台が故障している。", ""],
        ["Thirty percent of the budget is spent on marketing.", "予算の30%は宣伝に使われる。", "budget は単数"],
        ["Thirty percent of the employees work remotely.", "従業員の30%はリモートで働いている。", "employees は複数"],
        ["Investing in stocks involves risk.", "株式投資にはリスクが伴う。", "動名詞主語は単数"]
      ] }
  ],
  trap: ["as well as の後ろの語に動詞を合わせない。", "one of the＋複数名詞 の動詞は単数。", "percent / half of の後の名詞で単複が決まる。"],
  toeic: "Part 5 で主語と動詞の間に長い修飾語を挟み、動詞の単複を問う問題が頻出です。",
  qs: [
    { q: "The results of the customer survey ___ that most users are satisfied.", o: ["show", "shows", "showing", "has shown"], a: 0, ja: "顧客調査の結果は、大半の利用者が満足していることを示している。", ex: "主語は results（複数）。of the customer survey は修飾語。" },
    { q: "Either the manager or her assistants ___ the visitors.", o: ["meet", "meets", "is meeting", "has met"], a: 0, ja: "部長か、その助手たちのどちらかが来客を出迎える。", ex: "either A or B は B（assistants：複数）に一致。" },
    { q: "One of the new employees ___ from Canada.", o: ["is", "are", "be", "were"], a: 0, ja: "新入社員の1人はカナダ出身だ。", ex: "one of the＋複数名詞 の主語は one なので単数。" },
    { q: "The president, along with several board members, ___ expected to attend.", o: ["is", "are", "were", "have been"], a: 0, ja: "社長が、数名の取締役とともに出席する見込みだ。", ex: "A along with B は A（president：単数）に一致。" },
    { q: "Half of the information in the report ___ outdated.", o: ["is", "are", "were", "have been"], a: 0, ja: "報告書の情報の半分は古くなっている。", ex: "half of の後が不可算名詞 information なので単数。" }
  ]
},
{
  id: "g29", cat: "大学・TOEIC上級", lv: "UNI", title: "無生物主語と名詞構文",
  lead: "英語は「物・事」を主語にして、人に何かをさせる言い方を好みます。日本語らしく訳し直せると、長文の理解が速くなります。",
  sec: [
    { h: "無生物主語",
      t: "S＋enable / allow / cause / prevent / force / lead / take / bring など。**S のおかげで・S のせいで・S によって**と訳すと自然になります。\nprevent / keep / stop / discourage＋O＋from ～ing：S のせいで O は～できない。",
      ex: [
        ["Heavy snow prevented the plane from taking off.", "大雪のため、飛行機は離陸できなかった。", ""],
        ["This bus will take you to the museum.", "このバスに乗れば美術館に行けます。", ""],
        ["What made you choose this company?", "なぜこの会社を選んだのですか。", "What made you ～ = Why did you ～"]
      ] },
    { h: "名詞構文",
      t: "動詞・形容詞を名詞にした表現は、文に戻して訳すと理解しやすくなります。\nhis **arrival** in Tokyo ＝ he arrived in Tokyo\nthe **rapid growth** of AI ＝ AI grew rapidly\nher **ability** to lead ＝ she can lead\na **careful reading** of the contract ＝ read the contract carefully",
      ex: [
        ["The rapid growth of AI has raised concerns about jobs.", "AIが急速に成長したことで、雇用への懸念が高まっている。", ""],
        ["A careful reading of the contract revealed a problem.", "契約書を注意深く読むと、問題が見つかった。", ""]
      ] }
  ],
  trap: ["無生物主語の文を直訳しない。「～のおかげで・～のせいで」に言い換える。", "prevent / keep O from ～ing の from を落とさない。"],
  toeic: "Part 7 の正解選択肢は、本文の名詞構文を動詞中心の文に言い換えたものが非常に多いです（例：the company's expansion → The company will expand.）。",
  qs: [
    { q: "The strike prevented the factory ___ its orders on time.", o: ["from delivering", "to deliver", "delivering", "from deliver"], a: 0, ja: "ストライキのせいで、工場は注文品を期日どおりに納められなかった。", ex: "prevent O from ～ing。" },
    { q: "The new policy will ___ small businesses to hire more staff.", o: ["enable", "make", "let", "help with"], a: 0, ja: "新しい政策によって、中小企業はより多くの人を雇えるようになる。", ex: "空所の後が O to do なので enable。make / let は O＋原形。" },
    { q: "Due to the ___ of the new manager, the team's performance improved.", o: ["arrival", "arrive", "arrived", "arriving at"], a: 0, ja: "新しい部長が来たことで、チームの成績は向上した。", ex: "the＋□＋of は名詞。arrival（到着）。" },
    { q: "A quick look at the data ___ that sales are falling.", o: ["shows", "show", "showing", "are showing"], a: 0, ja: "データをざっと見れば、売上が落ちていることがわかる。", ex: "主語は A quick look（単数）の名詞構文。" },
    { q: "What ___ you to apply for this position?", o: ["led", "made", "let", "had"], a: 0, ja: "なぜこの職に応募しようと思ったのですか。", ex: "lead O to do（Oを～する気にさせる）。made / let / had は O＋原形 なので to と合いません。" }
  ]
},
{
  id: "g30", cat: "大学・TOEIC上級", lv: "UNI", title: "動詞の語法（TOEIC頻出の型）",
  lead: "意味を知っていても「どの前置詞・どの形と結びつくか」を知らないと解けない問題があります。頻出の型をまとめます。",
  sec: [
    { h: "that 節・動名詞をとる動詞",
      t: "**suggest / recommend / propose**：that S＋原形、または ～ing（× suggest 人 to do）。\n**explain (to 人) that ～**（× explain 人 that）。**inform 人 of 事／that ～**、**remind 人 of 事／to do／that ～**、**notify 人 of 事**、**assure 人 that ～**。",
      ex: [
        ["He explained to us that the system was down.", "彼はシステムが止まっていると私たちに説明した。", "× explained us"],
        ["Please inform us of any changes.", "変更があればお知らせください。", ""],
        ["This song reminds me of my school days.", "この歌を聞くと学生時代を思い出す。", ""]
      ] },
    { h: "前置詞とセットの動詞",
      t: "**provide A with B / provide B for (to) A**、**supply A with B**、**replace A with B**、**prevent A from B**、**comply with**、**respond to**、**consist of**、**depend on / rely on**、**result in**（～という結果になる）／**result from**（～から生じる）、**specialize in**、**account for**（説明する・占める）、**attribute A to B**、**apply for**（職などに応募する）／**apply to**（適用される）。",
      ex: [
        ["The hotel provides guests with free breakfast.", "そのホテルは宿泊客に無料の朝食を提供している。", ""],
        ["The delay resulted from a technical problem.", "遅れは技術的な問題から生じた。", "原因 from"],
        ["The mistake resulted in a large loss.", "その誤りは大きな損失につながった。", "結果 in"]
      ] },
    { h: "自動詞と他動詞で形が変わる動詞",
      t: "**access**（他動詞：access the data）、**attend**（出席する：他動詞）／**attend to**（対処する）、**reach**（他動詞）、**approach**（他動詞）、**address**（問題に取り組む：他動詞）、**object to ～ing**、**respond to**、**deal with**。",
      ex: [
        ["Employees can access the system from home.", "従業員は自宅からシステムにアクセスできる。", "× access to the system"],
        ["We need to address this issue quickly.", "この問題にすばやく取り組む必要がある。", ""]
      ] }
  ],
  trap: ["suggest 人 to do は誤り（suggest that 人＋原形）。", "result in（結果）と result from（原因）の向きを逆にしない。", "apply for（職に応募）と apply to（～に当てはまる・～に申し込む先）。"],
  toeic: "Part 5 の「前置詞選択」と「動詞の形」の問題の多くは、ここにある型の知識だけで解けます。",
  qs: [
    { q: "The company provides all employees ___ a laptop.", o: ["with", "for", "to", "of"], a: 0, ja: "その会社は全従業員にノートパソコンを支給している。", ex: "provide A with B（AにBを提供する）。" },
    { q: "The manager suggested that the team ___ the deadline.", o: ["extend", "extends", "to extend", "extending"], a: 0, ja: "部長はチームが締め切りを延ばすことを提案した。", ex: "suggest that S＋原形（仮定法現在）。" },
    { q: "The power outage ___ in a two-hour delay.", o: ["resulted", "caused", "led", "brought"], a: 0, ja: "停電の結果、2時間の遅れが生じた。", ex: "result in ～（～という結果になる）。led なら led to。" },
    { q: "Please ___ us of any changes to your contact information.", o: ["notify", "tell to", "explain", "say"], a: 0, ja: "連絡先に変更があればお知らせください。", ex: "notify 人 of 事。explain は explain 事 to 人 の形。" },
    { q: "Ms. Ito plans to apply ___ the position of marketing director.", o: ["for", "to", "with", "at"], a: 0, ja: "伊藤さんはマーケティング部長の職に応募するつもりだ。", ex: "apply for＋職・奨学金など（～に応募する）。" }
  ]
},
{
  id: "g31", cat: "大学・TOEIC上級", lv: "UNI", title: "ビジネス文書の定型表現",
  lead: "TOEIC Part 6・7 と実務メールで繰り返し出る型です。文法の知識が「決まり文句」として使われています。",
  sec: [
    { h: "依頼・お願い",
      t: "**I would appreciate it if you could ～**（～していただけるとありがたいです：it を落とさない）。**Would you mind ～ing?**（～していただけますか）。**Could you please ～?** **We would be grateful if ～**。**at your earliest convenience**（ご都合がつき次第早めに）。",
      ex: [
        ["I would appreciate it if you could send the file by Friday.", "金曜日までにファイルを送っていただけるとありがたいです。", ""],
        ["Please reply at your earliest convenience.", "ご都合がつき次第、ご返信ください。", ""]
      ] },
    { h: "お知らせ・お詫び",
      t: "**Please be advised that ～**（～をお知らせします）。**We regret to inform you that ～**（残念ながら～をお知らせします）。**We apologize for any inconvenience (this may cause).**（ご不便をおかけしますことをお詫びします）。**As of April 1, ～**（4月1日付で）。**Effective immediately, ～**（ただちに有効）。",
      ex: [
        ["Please be advised that the office will be closed on Friday.", "金曜日は事務所が休業となりますのでご承知おきください。", ""],
        ["We apologize for any inconvenience this may cause.", "ご不便をおかけしますことをお詫び申し上げます。", ""],
        ["As of next month, the price will increase by 5%.", "来月から、価格は5%上がります。", ""]
      ] },
    { h: "添付・結び",
      t: "**Attached is / Please find attached ～**（～を添付します）。**Enclosed please find ～**（同封いたします）。**Should you have any questions, ～**（仮定法の倒置）。**We look forward to hearing from you.** **Thank you for your prompt reply.** **as requested**（ご依頼どおり）、**as discussed**（お話ししたとおり）。",
      ex: [
        ["Please find attached the updated price list.", "最新の価格表を添付いたします。", ""],
        ["As requested, I have sent you the invoice.", "ご依頼どおり、請求書をお送りしました。", ""]
      ] }
  ],
  trap: ["I would appreciate it if の it を落とさない。", "Would you mind の後は動名詞。", "Please find attached の後に目的語（the file）が来る語順。"],
  toeic: "Part 6 の文挿入問題や Part 7 のメール文で、これらの定型を知っていると読む速さが大きく変わります。",
  qs: [
    { q: "I would appreciate ___ if you could confirm the order by tomorrow.", o: ["it", "that", "this", "you"], a: 0, ja: "明日までに注文をご確認いただけるとありがたいです。", ex: "appreciate it if ～ の定型。it は if 以下を指す形式目的語です。" },
    { q: "Would you mind ___ the meeting to Thursday?", o: ["moving", "to move", "move", "moved"], a: 0, ja: "会議を木曜日に移していただけますか。", ex: "mind は動名詞を目的語にとります。" },
    { q: "Please be ___ that the parking lot will be closed for repairs.", o: ["advised", "advising", "advise", "advice"], a: 0, ja: "駐車場は修理のため閉鎖されますので、ご承知おきください。", ex: "Please be advised that ～（～をお知らせします）。" },
    { q: "We apologize for any ___ this delay may cause.", o: ["inconvenience", "inconvenient", "inconveniently", "convenience"], a: 0, ja: "この遅れによりご不便をおかけしますことをお詫びします。", ex: "any＋名詞。inconvenience（不便）。" },
    { q: "___ of July 1, all employees must wear ID badges.", o: ["As", "Since", "From", "By"], a: 0, ja: "7月1日付で、全従業員はIDバッジを着用しなければならない。", ex: "As of＋日付（～付で・～以降）。" }
  ]
},
{
  id: "g32", cat: "大学・TOEIC上級", lv: "UNI", title: "準動詞の総まとめ（完了形・受動形・意味上の主語）",
  lead: "不定詞・動名詞・分詞の「時のずれ」と「する／される」を1つの表で整理します。英検1級レベルの長文で頻出です。",
  sec: [
    { h: "形の一覧",
      t: "**不定詞**：to do／to be done（受動）／to have done（完了）／to have been done（完了受動）／to be doing（進行）\n**動名詞**：doing／being done／having done／having been done\n**分詞構文**：doing／done（= being done）／having done／having been done\n**完了形**は「主節より前」、**受動形**は「主語が～される」を表します。",
      ex: [
        ["He is said to have been a talented painter.", "彼は才能ある画家だったと言われている。", "完了不定詞"],
        ["She is proud of having won the award.", "彼女はその賞を取ったことを誇りに思っている。", "完了動名詞"],
        ["I don't like being told what to do.", "何をすべきか指図されるのは好きではない。", "受動の動名詞"],
        ["Having been warned about the risks, investors acted carefully.", "リスクについて警告を受けていたので、投資家は慎重に行動した。", "完了受動の分詞構文"]
      ] },
    { h: "意味上の主語",
      t: "不定詞：for / of＋人。動名詞：所有格または目的格（his / him doing）。分詞構文：主節と違えば分詞の前に置く（独立分詞構文）。\nThere being no objections, the plan was approved.（反対がなかったので、計画は承認された）",
      ex: [
        ["I can't imagine him working in a bank.", "彼が銀行で働いているところは想像できない。", "動名詞の意味上の主語"],
        ["There being no objections, the proposal was approved.", "反対がなかったので、提案は承認された。", "独立分詞構文"]
      ] },
    { h: "need ～ing と be worth ～ing",
      t: "**need ～ing** は受動の意味（～される必要がある）＝need to be done。**be worth ～ing** も「～される価値がある」の意味ですが、形は能動の ～ing です。",
      ex: [
        ["The printer needs repairing.", "プリンターは修理が必要だ。", "= needs to be repaired"],
        ["The museum is worth visiting.", "その美術館は訪れる価値がある。", ""]
      ] }
  ],
  trap: ["is said to have p.p.（～だったと言われている）と is said to do（～だと言われている）を区別。", "need ～ing は受動の意味。", "独立分詞構文の there being ～ を読み落とさない。"],
  toeic: "Part 5 の上級問題で「having p.p. / being p.p.」の選択、Part 7 で is said to have / is believed to have の読み取りが出ます。",
  qs: [
    { q: "The castle is believed ___ in the 12th century.", o: ["to have been built", "to build", "to be building", "having built"], a: 0, ja: "その城は12世紀に建てられたと考えられている。", ex: "「建てられた」のは信じられている今より前、しかも城は建てられる側なので完了受動 to have been built。", lv: "A" },
    { q: "She denied ___ the confidential files.", o: ["having leaked", "to have leaked", "to leak", "leak"], a: 0, ja: "彼女は機密ファイルを漏らしたことを否定した。", ex: "deny は動名詞をとります。否定したときより前の行為なので完了動名詞も自然です（leaking も可）。" },
    { q: "The old roof needs ___.", o: ["replacing", "to replace", "replaced", "replace"], a: 0, ja: "古い屋根は交換が必要だ。", ex: "need ～ing（～される必要がある）。to be replaced でも同じ意味です。" },
    { q: "___ no questions, the chairperson closed the meeting.", o: ["There being", "There was", "Being", "It being"], a: 0, ja: "質問がなかったので、議長は会議を閉じた。", ex: "独立分詞構文 There being ～（～があるので／ないので）。There was だと接続詞なしで文が2つ並んでしまいます。", lv: "A" },
    { q: "Nobody likes ___ in front of colleagues.", o: ["being criticized", "criticizing", "to criticize", "criticized"], a: 0, ja: "同僚の前で批判されるのが好きな人はいない。", ex: "自分が「批判される」ので受動の動名詞 being criticized。" }
  ]
}
);
