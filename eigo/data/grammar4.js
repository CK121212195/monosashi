/* 文法解説（難関大・東大レベル：後半）　書式は grammar3.js と同じ */
window.EIGO = window.EIGO || {};
EIGO.GRAMMAR = EIGO.GRAMMAR || [];
EIGO.GRAMMAR.push(
{
  id: "g41", cat: "難関大・東大：重要文法の発展", lv: "ADV", title: "否定の発展（部分否定・否定語のない否定）", base: ["g24"],
  lead: "否定の範囲を取り違えると、文の意味が正反対になります。部分否定、二重否定、否定語を使わない否定表現は、和訳問題の定番です。",
  sec: [
    { h: "部分否定と全体否定",
      t: "**not＋all / every / always / both / necessarily / completely** は部分否定（すべてが～というわけではない）。\n**no / none / never / neither / not＋any** は全体否定（どれも～ない）。\n**not … because ～** は「～だから…ない」と「～だから…というわけではない」の2通りに読めることがあります。文脈で判断し、英作文ではあいまいにならない書き方をします。",
      ex: [
        ["Not all students enjoy studying in groups.", "すべての学生がグループで勉強するのを好むわけではない。", "部分否定"],
        ["Expensive products are not necessarily better.", "高価な製品が必ずしもよりよいとは限らない。", "not necessarily：必ずしも～ない"],
        ["None of the proposals was accepted.", "提案はどれも受け入れられなかった。", "全体否定"]
      ] },
    { h: "否定語を使わない否定表現",
      t: "**far from**（決して～ない）、**anything but**（決して～ない）、**the last＋名詞＋to do / 関係詞節**（最も～しそうにない）、**fail to do**（～しない・できない）、**remain to be done**（まだ～されていない）、**free from**（～がない）、**beyond＋名詞**（～できない：beyond description）、**have yet to do**（まだ～していない）、**above＋～ing**（～するような人ではない）。",
      ex: [
        ["The results were far from satisfactory.", "結果は決して満足のいくものではなかった。", "far from＝決して～ない"],
        ["He is the last person to tell a lie.", "彼は決してうそをつくような人ではない。", "the last＋名詞＋to do"],
        ["Many questions about the universe remain to be answered.", "宇宙については、まだ答えの出ていない問いが多く残っている。", "remain to be done"],
        ["Scientists have yet to find a cure for the disease.", "科学者たちはまだその病気の治療法を見つけていない。", "have yet to do"]
      ] },
    { h: "準否定と二重否定",
      t: "**hardly / scarcely**（ほとんど～ない：程度）、**rarely / seldom**（めったに～ない：頻度）、**few / little**（ほとんど～ない：数・量）。a few / a little（少しはある）との違いに注意します。\n**二重否定**は強い肯定になります：**never A without B**（AすればかならずBする）、**not un-**（～でなくはない＝控えめな肯定）。",
      ex: [
        ["I never see this photo without remembering my grandmother.", "この写真を見るたびに、私は必ず祖母を思い出す。", "never A without B"],
        ["Few people realized how serious the situation was.", "事態の深刻さに気づいた人はほとんどいなかった。", "Few＝ほとんどいない"],
        ["It is not unusual for students to change their major.", "学生が専攻を変えるのは珍しいことではない。", "not un-：控えめな肯定"]
      ] }
  ],
  trap: ["Not all ～ を「すべての～が…ない」と全体否定で訳さない。", "anything but（決して～ない）と nothing but（～だけ）を混同しない。", "hardly は「一生懸命に」ではない（hard＝一生懸命に）。He hardly worked.（ほとんど働かなかった）"],
  exam: "難関大の和訳問題では、部分否定や far from / the last などの否定表現を正しく訳出できるかがよく問われます。内容一致問題でも、否定の範囲を取り違えると逆の選択肢を選んでしまいます。",
  qs: [
    { q: "Although he is rich, he is ___ happy; in fact, he often feels lonely.", o: ["far from", "free from", "apart from", "aside from"], a: 0, ja: "彼は金持ちだが、決して幸せではない。実際、よく孤独を感じている。", ex: "far from＋形容詞で「決して～ない」。in fact, he often feels lonely と内容が合う。" },
    { q: "The cause of the disease has ___ to be identified.", o: ["yet", "still", "already", "ever"], a: 0, ja: "その病気の原因はまだ特定されていない。", ex: "have yet to do（まだ～していない）。否定語を使わずに否定の意味を表す。" },
    { q: "___ of the two candidates was qualified for the position, so the company reopened the search.", o: ["Neither", "Either", "Both", "None"], a: 0, ja: "2人の候補者のどちらもその職にふさわしくなかったので、会社は人選をやり直した。", ex: "2人について「どちらも～ない」は Neither。so 以下の内容から否定が必要。None は3人（3つ）以上に使うのが原則。" },
    { q: "She is the last person ___ such a mistake.", o: ["to make", "making", "made", "who makes it"], a: 0, ja: "彼女は決してそんな間違いをするような人ではない。", ex: "the last＋名詞＋to do（最も～しそうにない＝決して～しない）。" },
    { q: "Not every problem can be solved by money alone.", o: ["お金だけですべての問題が解決できるわけではない。", "お金だけでは、どの問題も解決できない。", "お金がなければ、問題は一つも解決できない。", "すべての問題は、お金だけで解決するべきではない。"], a: 0, ja: "お金だけですべての問題が解決できるわけではない。", ex: "Not every ～ は部分否定（すべての～が…というわけではない）。「どの問題も解決できない」は全体否定で誤り。" },
    { q: "When I saw the results, I could not hardly believe my eyes.", o: ["When I saw", "the results", "could not hardly", "my eyes"], a: 2, fix: "When I saw the results, I could hardly believe my eyes.", ja: "結果を見たとき、私は自分の目がほとんど信じられなかった。", ex: "hardly はそれ自体が否定の意味（ほとんど～ない）を持つので、not と重ねない。could hardly believe とする。" }
  ]
},
{
  id: "g42", cat: "難関大・東大：重要文法の発展", lv: "ADV", title: "時制と相の発展（完了・進行・時制の一致の例外）", base: ["g02", "g03", "g26"],
  lead: "誤り指摘や英作文では、時制の選び方が頻繁に問われます。「いつの話か」だけでなく、話し手がその出来事をどう捉えているか（完了・継続・一時的）まで考えます。",
  sec: [
    { h: "現在完了と過去形の使い分け",
      t: "**過去形**：過去の一時点の出来事（今とは切り離されている）。yesterday, last year, ～ ago, in 2010, When ～? など、過去を明示する語とともに使います。\n**現在完了**：過去の出来事が**今とつながっている**（結果・経験・継続）。過去を明示する語とは**一緒に使えません**。\n**since**＋過去の時点、**for**＋期間。「～して何年になる」は **It has been X years since S＋過去形**。",
      ex: [
        ["The company has grown rapidly since it was founded in 2015.", "その会社は2015年に設立されて以来、急速に成長してきた。", "since 節は過去形、主節は現在完了"],
        ["When did you start learning English?", "いつ英語を習い始めましたか。", "When と現在完了は一緒に使えない"],
        ["It has been ten years since we last met.", "最後に会ってから10年になる。", "It has been＋期間＋since"]
      ] },
    { h: "進行形が表す「一時性」と、進行形にしない動詞",
      t: "進行形は**一時的な状態・途中の動作**を表します。He **is being** rude.（今は失礼な態度をとっている）、I **am living** with my aunt.（一時的に住んでいる）。\n**状態動詞**（know, believe, belong, contain, resemble, own など）はふつう進行形にしません。ただし、意味が動作になると進行形も可能です（She **is having** lunch. / I **am thinking** about it.）。\n**always＋進行形**は、話し手のいらだちや驚きを表すことがあります。",
      ex: [
        ["He is always complaining about his job.", "彼はいつも仕事の文句ばかり言っている。", "いらだち"],
        ["This box contains old letters.", "この箱には古い手紙が入っている。", "contain は状態動詞"]
      ] },
    { h: "時・条件の副詞節と、時制の一致の例外",
      t: "**時・条件の副詞節**（when, if, before, after, until, as soon as, by the time など）では、未来のことも**現在形・現在完了**で表します。ただし、**名詞節**（～かどうか、いつ～か）では will を使います。\n**時制の一致の例外**：不変の真理や、現在も続く事実・習慣は、主節が過去でも現在形のままにできます（He said that the earth **goes** around the sun.）。歴史上の事実は過去形のままです。",
      ex: [
        ["Please wait here until I come back.", "私が戻るまでここで待っていてください。", "until 節：未来でも現在形"],
        ["I don't know when he will come back.", "彼がいつ戻ってくるのかわからない。", "名詞節なので will"],
        ["Our teacher told us that water boils at 100 degrees Celsius.", "先生は、水はセ氏100度で沸騰すると教えてくれた。", "不変の真理は現在形のまま"]
      ] }
  ],
  trap: ["過去を明示する語（ago, last ～, in 2010, When ～?）と現在完了を一緒に使わない。", "時・条件の副詞節の中で will を使わない（× when he will arrive → ○ when he arrives）。名詞節の when / if との区別に注意。", "by the time ～ の文では、主節が未来完了（will have done）や過去完了になることが多い。"],
  exam: "誤り指摘問題では、現在完了と過去を明示する語の組み合わせ、時・条件の副詞節の will が定番の出題ポイントです。英作文でも時制の誤りは目立つので、書いた後に必ず見直しましょう。",
  qs: [
    { q: "Since the new manager arrived last year, the team's performance ___ steadily.", o: ["has improved", "improved", "improves", "had improved"], a: 0, ja: "昨年新しい部長が来て以来、チームの成績は着実に向上している。", ex: "since＋過去の時点 は、主節を現在完了にして「それ以来ずっと」を表す。" },
    { q: "I will call you as soon as I ___ at the airport.", o: ["arrive", "will arrive", "arrived", "would arrive"], a: 0, ja: "空港に着いたらすぐに電話します。", ex: "as soon as が導く時の副詞節では、未来のことも現在形で表す。" },
    { q: "By the time you read this letter, I ___ for Canada.", o: ["will have left", "have left", "leave", "had left"], a: 0, ja: "あなたがこの手紙を読むころには、私はカナダへ出発してしまっているでしょう。", ex: "by the time＋現在形（未来のある時点）までに完了していることは、未来完了 will have left で表す。" },
    { q: "He ___ in this town for twenty years when the factory closed.", o: ["had lived", "has lived", "lives", "is living"], a: 0, ja: "工場が閉鎖されたとき、彼はこの町に20年住んでいた。", ex: "過去のある時点（the factory closed）までの継続は過去完了 had lived。" },
    { q: "She is being very polite today; she must want something.", o: ["彼女は今日はやけに礼儀正しくしている。何か欲しいものがあるに違いない。", "彼女はいつも礼儀正しい人なので、今日も何かをくれるに違いない。", "彼女は今日は礼儀正しくするべきだ。何かを欲しがっているのだから。", "彼女は今日、礼儀正しくされたので、何かを欲しがっているはずだ。"], a: 0, ja: "彼女は今日はやけに礼儀正しくしている。何か欲しいものがあるに違いない。", ex: "be being＋形容詞は「（ふだんとは違って）一時的に～の態度をとっている」。must は「～に違いない」という推量。" },
    { q: "The researchers have published their findings in a leading journal two years ago.", o: ["The researchers", "have published", "their findings", "in a leading journal"], a: 1, fix: "The researchers published their findings in a leading journal two years ago.", ja: "研究者たちは2年前、一流の学術誌に研究結果を発表した。", ex: "two years ago は過去を明示する語なので、現在完了とは一緒に使えない。過去形 published にする。" }
  ]
},
{
  id: "g43", cat: "難関大・東大：重要文法の発展", lv: "ADV", title: "冠詞と名詞の数（英作文で減点されない）", base: ["g15", "g16"],
  lead: "自由英作文や和文英訳で特に多い誤りが、冠詞と名詞の数です。「数えられるか」「特定されているか」を毎回判断する手順を身につけます。",
  sec: [
    { h: "冠詞を決める3つの質問",
      t: "名詞を書くたびに、次の順で確認します。\n**① 数えられるか**：可算なら単数か複数かを決める。**可算名詞の単数形を、冠詞なしでそのまま使うことはできません**（× I have question.）。\n**② 特定されているか**：読み手にも「どれのことか」がわかるなら **the**。初めて話題にする・どれでもよい1つなら **a / an**。\n**③ 一般論か**：「～というもの」全般は、**複数形・無冠詞**（Dogs are loyal.）が最も無難です。不可算名詞は無冠詞（Water is essential.）。",
      ex: [
        ["Smartphones have changed the way people communicate.", "スマートフォンは人々の意思疎通のしかたを変えた。", "一般論は複数形・無冠詞"],
        ["I read an interesting article about education. The article argued that homework should be abolished.", "教育についての興味深い記事を読んだ。その記事は、宿題を廃止すべきだと主張していた。", "初出 an → 2回目 the"],
        ["Information is more easily available than ever before.", "情報はかつてないほど手に入りやすくなっている。", "information は不可算"]
      ] },
    { h: "間違えやすい不可算名詞と、意味で変わる名詞",
      t: "**不可算名詞**：information, advice, knowledge, evidence, equipment, furniture, homework, progress, research, damage, luggage, news, traffic, weather, scenery など。数えるときは **a piece of** などを使います。\n**意味によって可算・不可算が変わる名詞**：experience（経験全般は不可算／個々の体験は可算）、paper（紙／新聞・論文）、room（余地／部屋）、time（時間／回数）、work（仕事／作品）。",
      ex: [
        ["She gave me a useful piece of advice.", "彼女は私に役立つ助言をひとつくれた。", "× an advice / advices"],
        ["Studying abroad was a valuable experience for me.", "留学は私にとって貴重な体験だった。", "個々の体験は可算"],
        ["There is still room for improvement.", "まだ改善の余地がある。", "room＝余地（不可算）"]
      ] },
    { h: "総称の the と、the の要否が決まっている表現",
      t: "**the＋単数名詞**は、種類全体を代表させる書き言葉的な言い方です（**The computer** has changed our lives.）。\n**the が必要**：**the＋形容詞**（the rich＝金持ちの人々、the elderly）、**the＋最上級・序数・only・same**。\n**無冠詞**：by bus / by train、go to school / go to bed（本来の目的）、**society・nature**（一般的な意味）、**食事名**（have lunch）。",
      ex: [
        ["The rich should pay more taxes than the poor.", "富裕層は貧困層より多く税金を払うべきだ。", "the＋形容詞＝人々"],
        ["Human beings cannot live in isolation from society.", "人間は社会から孤立して生きることはできない。", "society は無冠詞"]
      ] }
  ],
  trap: ["可算名詞の単数形を冠詞なしで書かない（× Smartphone is useful. → ○ Smartphones are useful.）。", "information, advice, evidence, research, homework に -s や a をつけない。", "one of the＋複数名詞（× one of the problem）。"],
  exam: "自由英作文や和文英訳では、冠詞と名詞の数の誤りは見落としやすく、積み重なると答案全体の印象を下げます。誤り指摘問題でも、不可算名詞の複数形や、可算名詞の無冠詞単数がよく狙われます。書いた英文の名詞すべてについて、冠詞と数を確認する習慣をつけましょう。",
  qs: [
    { q: "The teacher gave us ___ on how to prepare for the exam.", o: ["some useful advice", "a useful advice", "some useful advices", "useful advices"], a: 0, ja: "先生は試験の準備のしかたについて役立つ助言をくれた。", ex: "advice は不可算名詞なので a をつけず、複数形にもしない。" },
    { q: "___ are becoming more and more important in modern society.", o: ["Computers", "Computer", "A computers", "The computer's"], a: 0, ja: "コンピューターは現代社会でますます重要になっている。", ex: "「～というもの」全般を表すには複数形・無冠詞が最も自然。可算名詞の単数形を冠詞なしで使うことはできない。" },
    { q: "We need more ___ before we can draw any conclusions.", o: ["evidence", "evidences", "an evidence", "the evidences"], a: 0, ja: "結論を出すには、もっと証拠が必要だ。", ex: "evidence は不可算名詞。more evidence の形で量を表す。" },
    { q: "The government should do more to help ___.", o: ["the poor", "poor", "the poors", "a poor"], a: 0, ja: "政府は貧しい人々を助けるために、もっと手を尽くすべきだ。", ex: "the＋形容詞で「～な人々」（複数扱い）。poor に -s はつかない。" },
    { q: "Japan is one of ___ in the world.", o: ["the most earthquake-prone countries", "the most earthquake-prone country", "most earthquake-prone countries", "a most earthquake-prone country"], a: 0, ja: "日本は世界で最も地震の多い国の一つだ。", ex: "one of the＋最上級＋複数名詞。country を複数形にする。" },
    { q: "Many students do not have enough knowledges about the history of their own country.", o: ["Many students", "do not have", "enough knowledges", "their own country"], a: 2, fix: "Many students do not have enough knowledge about the history of their own country.", ja: "多くの学生は、自国の歴史について十分な知識を持っていない。", ex: "knowledge は不可算名詞なので複数形にしない。enough knowledge とする。" }
  ]
},
{
  id: "g44", cat: "難関大・東大：和訳・英作文・誤文訂正", lv: "ADV", title: "和訳の技術①：名詞構文・無生物主語", base: ["g29"],
  lead: "英語は「名詞中心」、日本語は「動詞中心」で表現しやすい言語です。名詞を動詞に、形容詞を副詞に戻して訳すと、直訳調を脱した自然な和訳になります。",
  sec: [
    { h: "名詞構文をほどく：of の前後の関係を見る",
      t: "動詞・形容詞から派生した名詞は、**文に戻して**訳します。\n**主格の of**：the arrival **of** the train ＝ the train arrives（列車が到着すること）\n**目的格の of**：the discovery **of** penicillin ＝ (someone) discovered penicillin（ペニシリンを発見したこと）\n**所有格**：his refusal to help ＝ he refused to help（彼が手伝うのを拒んだこと）\nどちらか迷ったら、元の動詞が**自動詞か他動詞か**を考えると決まります。",
      ex: [
        ["The sudden rise in prices took everyone by surprise.", "物価が急に上がったので、だれもが驚いた。", "prices rose suddenly"],
        ["The protection of endangered species requires international cooperation.", "絶滅の危機にある種を保護するには、国際的な協力が必要だ。", "目的格の of：protect endangered species"],
        ["Her failure to respond to the email worried her colleagues.", "彼女がメールに返事をしなかったので、同僚たちは心配した。", "she failed to respond"]
      ] },
    { h: "無生物主語は「理由・条件・手段」に読みかえる",
      t: "**S＋cause / lead to / allow / enable / prevent / force / make / remind / show / suggest** の文は、S を「～によって・～のおかげで・～のせいで・～を見ると」と副詞的に訳し、目的語を主語のように訳します。\n**This photo reminds me of my childhood.** → この写真を見ると、子どものころを思い出す。\n**The data suggest that …** → データから、…ということがうかがえる。",
      ex: [
        ["A short walk will bring you to the station.", "少し歩けば駅に着きます。", "S を条件に"],
        ["The new law forced many small shops to close.", "新しい法律のせいで、多くの小さな店が閉店に追い込まれた。", "force O to do"],
        ["Recent studies show that sleep plays a key role in memory.", "最近の研究で、睡眠が記憶に重要な役割を果たしていることがわかっている。", "show：～がわかる"]
      ] },
    { h: "形容詞を副詞に、受動態を能動態に",
      t: "**形容詞＋名詞**は、**副詞＋動詞**に戻すと自然になります。a **careful** reading of the text → テキストを**注意深く**読むこと。\n英語の**受動態**は、日本語では「～される」以外の言い方のほうが自然なことが多いです。It **is said** that … → …と言われている／…そうだ。He **was injured** in the accident. → 彼はその事故でけがをした。\n訳した後に、日本語として自然かを必ず読み直します。",
      ex: [
        ["A close examination of the data revealed several errors.", "データを詳しく調べると、いくつかの誤りが見つかった。", "close examination＝examine closely"],
        ["Thousands of people were killed in the earthquake.", "その地震で何千人もの人が亡くなった。", "受動態を能動的に訳す"]
      ] }
  ],
  trap: ["「～の～の～」と of を「の」で連ねる直訳は避け、動詞を使って書き直す。", "無生物主語の文を「Sが…させた」と直訳しない（意味は通じても、日本語として不自然になりやすい）。", "直訳を避けるあまり、原文にない内容を足さない（意訳しすぎにも注意）。"],
  exam: "東大の二次試験では近年、英文の下線部を和訳する問題が出題されています。名詞構文や無生物主語を自然な日本語にしつつ、原文の構造と意味を正確に反映させることが求められます（出題形式は年度により変わることがあります）。",
  qs: [
    { q: "The rapid spread of smartphones has changed the way young people read.", o: ["スマートフォンが急速に普及したことで、若者の読書のしかたが変わった。", "スマートフォンの急速な広がりの方法が、若者の読み方を変えた。", "若者が本を読む方法は、スマートフォンを急速に広めるために変わった。", "スマートフォンは急速に広がったが、若者の読書のしかたは変わらなかった。"], a: 0, ja: "スマートフォンが急速に普及したことで、若者の読書のしかたが変わった。", ex: "The rapid spread of smartphones は smartphones spread rapidly（主格の of）を名詞にした形。「～したことで」と原因として訳すと自然。the way young people read は「若者の読み方」。" },
    { q: "A glance at the map will show you where the station is.", o: ["地図をちょっと見れば、駅がどこにあるかわかるだろう。", "地図を一目見ると、駅があなたを案内してくれるだろう。", "駅の場所を知るには、地図を長い時間見なければならない。", "地図を見せれば、駅員が場所を教えてくれるだろう。"], a: 0, ja: "地図をちょっと見れば、駅がどこにあるかわかるだろう。", ex: "無生物主語 A glance at the map を条件（ちょっと見れば）に読みかえ、you を主語のようにして訳す。" },
    { q: "His ___ to admit his mistake made the situation worse.", o: ["refusal", "refuse", "refused", "refusing"], a: 0, ja: "彼が自分の誤りを認めようとしなかったので、事態はさらに悪化した。", ex: "His＋□＋to do は名詞構文。refuse to do（～するのを拒む）の名詞形 refusal。訳すときは「彼が～しなかったので」と文に戻す。" },
    { q: "Lack of sleep can impair our ability to concentrate.", o: ["睡眠が不足すると、集中する力が損なわれることがある。", "睡眠の不足は、集中する能力を必要とすることがある。", "集中する能力が欠けると、眠れなくなることがある。", "睡眠を減らせば、集中力を高めることができる。"], a: 0, ja: "睡眠が不足すると、集中する力が損なわれることがある。", ex: "Lack of sleep を「睡眠が不足すると」と条件に読みかえる。impair は「損なう」。our ability to concentrate は「私たちが集中する力」。" },
    { q: "It has been suggested that the ancient city was abandoned because of a long drought.", o: ["その古代都市は、長い干ばつのために見捨てられたのではないかと言われている。", "長い干ばつのせいで、その古代都市を見捨てるよう提案された。", "その古代都市は、長い干ばつを防ぐために放棄されることになった。", "長い干ばつの後、その古代都市には再び人が住むようになったとされる。"], a: 0, ja: "その古代都市は、長い干ばつのために見捨てられたのではないかと言われている。", ex: "It has been suggested that ～ は「～ということが示唆されている」→「～ではないかと言われている」。ここでの suggest は「提案する」ではなく「示唆する」。was abandoned は「見捨てられた・放棄された」。" },
    { q: "Her success owed much to the support of her family.", o: ["彼女が成功したのは、家族の支えによるところが大きかった。", "彼女の成功のために、家族は多くの借金をした。", "彼女は成功して、家族の生活を大いに支えた。", "家族が彼女を支えたのは、彼女が成功したからだ。"], a: 0, ja: "彼女が成功したのは、家族の支えによるところが大きかった。", ex: "owe A to B（AはBのおかげである）。owe much to ～ で「～によるところが大きい」。Her success は she succeeded を名詞にした形。" }
  ]
},
{
  id: "g45", cat: "難関大・東大：和訳・英作文・誤文訂正", lv: "ADV", title: "和訳の技術②：訳し下し・指示語・多義語", base: ["g11", "g17"],
  lead: "和訳の答案は、英文の構造を正しくつかんでいることを「訳文で示す」ものです。長い修飾語を前から訳し下す、指示語の中身を明らかにする、多義語の訳を文脈で選ぶ、といった技術を身につけます。",
  sec: [
    { h: "長い修飾語は「前から訳し下す」",
      t: "関係詞節や分詞句が長いとき、日本語でぜんぶ名詞の前に置くと読みにくくなります。**非制限用法（カンマ＋which / who）**は、前から訳し下して「～で、それは…」「～だが、その…」とするのが基本です。\n制限用法でも、修飾部分が長いときは2文に分けると自然になることがあります。ただし、**何が何を修飾しているかという関係を変えてはいけません**。",
      ex: [
        ["The professor, who had spent years studying the region, warned that the plan would fail.", "その教授は、その地域を何年も研究してきた人物で、計画は失敗するだろうと警告した。", "非制限用法は訳し下す"],
        ["He made a proposal that most of the members found difficult to accept.", "彼は提案をしたが、メンバーの大半はそれを受け入れがたいと感じた。", "長い修飾は2文に分けてもよい"]
      ] },
    { h: "指示語・代名詞の中身を明らかにする",
      t: "下線部に **it / this / that / they / such / so / do so** などがあるとき、答案ではその**中身を具体的に訳出**するよう求められることがあります。指示語は原則として**直前の内容**を指します。\n**do so**＝直前の動詞句、**such＋名詞**＝前に述べたような～、**the former / the latter**＝前者／後者。\n**it** は、それ（指示）・形式主語・天候や状況の it など、働きによって訳し方が変わります。",
      ex: [
        ["Some people argue that schools should teach financial skills. Doing so, they say, would help young people avoid debt.", "学校はお金の扱い方を教えるべきだと主張する人もいる。彼らによれば、そうすることで若者は借金を避けやすくなるという。", "Doing so＝学校がお金の扱い方を教えること"],
        ["Tea and coffee are both popular drinks, but the latter usually contains more caffeine.", "紅茶とコーヒーはどちらも人気のある飲み物だが、後者（コーヒー）のほうがふつうはカフェインを多く含む。", "the latter＝coffee"]
      ] },
    { h: "多義語・抽象語は文脈で訳を選ぶ",
      t: "辞書の最初の訳語を当てはめると、意味の通らない和訳になりがちです。**主語・目的語との組み合わせ**から訳語を選びます。\n**address**：（問題に）取り組む／（人に）話しかける。**observe**：観察する／（規則を）守る／述べる。**account for**：説明する／（割合を）占める。**issue**：問題／（雑誌の）号／発行する。\n抽象名詞は、「～すること」「～という点」などを補って具体化すると自然になります。",
      ex: [
        ["The government must address the issue of child poverty.", "政府は子どもの貧困という問題に取り組まなければならない。", "address＝取り組む"],
        ["Young people account for about a third of the city's population.", "若者がその市の人口の約3分の1を占めている。", "account for＝占める"]
      ] }
  ],
  trap: ["非制限用法の which が、前の名詞ではなく前の文全体を指していないか確認する。", "指示語は「それ」と訳して終わりにせず、指す内容を明らかにするよう求められていないか設問文を確認する。", "多義語に、文脈に合わない訳語を当てはめない（observe the rules を「規則を観察する」としない）。"],
  exam: "東大などの和訳問題では、下線部の構造を正しくとらえることに加え、指示語の内容を明らかにする、文脈に合う訳語を選ぶ、といった点まで求められることがあります。設問の指示（「it の内容を明らかにして」など）を必ず確認しましょう。",
  qs: [
    { q: "The museum, which was built in the 1920s, attracts more than a million visitors a year.", o: ["その博物館は1920年代に建てられたもので、年間100万人を超える人々が訪れる。", "1920年代に建てられた博物館だけが、年間100万人を超える人々を集めている。", "その博物館には、1920年代に年間100万人を超える人々が訪れていた。", "年間100万人を超える人々が、1920年代に建てられた博物館を見学しに来た。"], a: 0, ja: "その博物館は1920年代に建てられたもので、年間100万人を超える人々が訪れる。", ex: "カンマ＋which の非制限用法は、前から訳し下すと自然。「1920年代に建てられた博物館だけが」は制限用法の読み方で、意味が変わってしまう。attracts は現在形なので、現在の毎年の状況を表す。" },
    { q: "Many experts doubt that the plan will work, and with good reason.", o: ["多くの専門家はその計画がうまくいくかを疑っているが、それにはもっともな理由がある。", "多くの専門家はその計画がうまくいくと確信しており、その理由も十分にある。", "その計画がうまくいくには、多くの専門家と十分な理由が必要だ。", "多くの専門家が疑ったため、その計画にはもっともな理由が必要になった。"], a: 0, ja: "多くの専門家はその計画がうまくいくかを疑っているが、それにはもっともな理由がある。", ex: "doubt that ～ は「～ではないと思う・～を疑う」。and with good reason は「それももっともだ・それには十分な理由がある」という決まった言い方。" },
    { q: "Some people prefer to live in the city, while others prefer the countryside; the ___ enjoy convenience, and the latter enjoy nature.", o: ["former", "formal", "first", "fore"], a: 0, ja: "都会に住むのを好む人もいれば、田舎を好む人もいる。前者は便利さを、後者は自然を楽しんでいる。", ex: "the former（前者）と the latter（後者）。ここでは前者＝都会を好む人々。" },
    { q: "The company has failed to address the concerns raised by its customers.", o: ["その会社は、顧客から寄せられた懸念に対処できていない。", "その会社は、顧客が懸念している住所を見つけられなかった。", "その会社は、顧客の懸念を高めることに失敗した。", "顧客は、その会社が懸念を示したことに対応しなかった。"], a: 0, ja: "その会社は、顧客から寄せられた懸念に対処できていない。", ex: "address は「（問題に）取り組む・対処する」。fail to do は「～しない・できない」。raised by its customers は concerns を後ろから修飾する過去分詞（顧客によって提起された）。" },
    { q: "Some students want to study abroad but cannot afford to ___.", o: ["do so", "do it so", "so do", "doing so"], a: 0, ja: "留学したいと思っていても、その費用を出せない学生もいる。", ex: "do so は直前の動詞句（study abroad）の言いかえ。afford to do so＝留学する余裕がある。" },
    { q: "What the author is trying to say is that we should observe nature more closely.", o: ["筆者が言おうとしているのは、私たちは自然をもっと注意深く観察すべきだということだ。", "筆者が言おうとしているのは、私たちは自然の規則をもっと厳しく守るべきだということだ。", "筆者は、自然を観察することを、私たちにもっと近くで言おうとしている。", "筆者が何を言おうとしても、私たちは自然をもっと近くで見るべきだ。"], a: 0, ja: "筆者が言おうとしているのは、私たちは自然をもっと注意深く観察すべきだということだ。", ex: "What the author is trying to say が主語、is が述語動詞、that 節が補語。observe nature は「自然を観察する」（observe the rules なら「規則を守る」）。closely は「注意深く・綿密に」。" }
  ]
},
{
  id: "g46", cat: "難関大・東大：和訳・英作文・誤文訂正", lv: "ADV", title: "英作文で間違えやすい語法", base: ["g27", "g30", "g13"],
  lead: "和文英訳や自由英作文では、日本語につられた語法の誤りが目立ちます。動詞の型・前置詞・接続詞など、減点されやすい点を確認します。",
  sec: [
    { h: "日本語につられる動詞の型",
      t: "**「人に～を説明する」**：explain **to 人** ～ / explain 事 **to 人**（× explain 人 事）\n**「～するよう提案する・勧める」**：suggest / recommend **that S (should)＋原形**、suggest **～ing**（× suggest 人 to do）\n**「人が～するのを可能にする」**：enable / allow 人 **to do**、make it possible for 人 to do（× make 人 possible to do）\n**「～に慣れる」**：get used to **～ing**（to は前置詞）\n**「～するのを楽しみにする」**：look forward to **～ing**",
      ex: [
        ["Could you explain to me how this machine works?", "この機械がどう動くのか、私に説明してもらえますか。", "× explain me"],
        ["My teacher suggested that I read more English books.", "先生は私に、もっと英語の本を読むよう勧めた。", "× suggested me to read"],
        ["Technology has made it possible for people to work from home.", "技術のおかげで、人々は在宅で働けるようになった。", "make it possible for 人 to do"]
      ] },
    { h: "「都合がよい」「人口が多い」「～が増えている」の英訳",
      t: "**convenient** は人を主語にしません（× I am convenient. → ○ It is convenient for me.）。\n**「人口が多い・少ない」**は large / small population（× many population）。「交通量が多い」は heavy traffic。\n**「～が増えている」**は、The number of ～ is increasing. のように **the number of** を主語にするのが確実です（単数扱い）。",
      ex: [
        ["Would it be convenient for you to meet on Friday?", "金曜日にお会いするのはご都合よろしいでしょうか。", "convenient は人を主語にしない"],
        ["Tokyo has a larger population than any other city in Japan.", "東京は日本のほかのどの都市よりも人口が多い。", "population は large / small"],
        ["The number of foreign tourists has increased sharply.", "外国人観光客の数が急増している。", "the number of ～ が主語"]
      ] },
    { h: "前置詞と、つなぎの語の誤り",
      t: "**「～について議論する」**discuss ～（× discuss about）、**「～に到着する」**reach ～ / arrive at・in ～、**「～と結婚する」**marry ～（× marry with）。\n**接続詞と前置詞の区別**：because＋S V／because of＋名詞、although＋S V／despite＋名詞、while＋S V／during＋名詞。\n**however は副詞**なので、2つの文を直接つなげません（× It was cold, however we went out. → ○ It was cold; however, we went out.）。",
      ex: [
        ["Despite the heavy rain, the game was not canceled.", "大雨にもかかわらず、試合は中止されなかった。", "despite＋名詞"],
        ["It was raining; however, we decided to go hiking.", "雨が降っていたが、私たちはハイキングに行くことにした。", "however は副詞"]
      ] }
  ],
  trap: ["suggest / recommend / explain を「人＋to do」「人＋事」の形で使わない。", "「～が増えている」は The number of ～ is increasing。数そのものが主語（単数扱い）。", "自由英作文では、確実に使える表現で書く。自信のない語法を使うより、正確で単純な文のほうが誤りを防げる。"],
  exam: "東大などの和文英訳・自由英作文では、日本語につられた語法の誤りが目立ちやすくなります。書いた英文を見直すときは、①動詞の型 ②名詞の数と冠詞 ③時制 ④前置詞 の順に確認すると効率的です。",
  qs: [
    { q: "The teacher explained ___ why the answer was wrong.", o: ["to us", "us", "for us", "us to"], a: 0, ja: "先生は私たちに、その答えがなぜ間違いなのかを説明した。", ex: "explain は「人に」を直接の目的語にとれない。explain to 人＋事柄 の形にする。" },
    { q: "My doctor recommended that I ___ more exercise.", o: ["get", "got", "to get", "getting"], a: 0, ja: "医師は私に、もっと運動するよう勧めた。", ex: "recommend that S (should)＋原形。主節が過去でも原形 get を使う。" },
    { q: "Please let me know when it is ___ to talk.", o: ["convenient for you", "you convenient", "convenient to you that", "you are convenient"], a: 0, ja: "話すのに都合のよいときを教えてください。", ex: "convenient は人を主語にしない。it is convenient for 人 (to do) の形にする。" },
    { q: "___ the bad weather, the event attracted a large crowd.", o: ["Despite", "Although", "However", "Even though"], a: 0, ja: "悪天候にもかかわらず、そのイベントには大勢の人が集まった。", ex: "後ろが名詞（the bad weather）なので前置詞 Despite。Although / Even though は接続詞なので S V が必要。However は副詞。" },
    { q: "The country has a ___ population, but its economy is growing slowly.", o: ["large", "many", "much", "lots of"], a: 0, ja: "その国は人口が多いが、経済の成長は遅い。", ex: "population の多い・少ないは large / small で表す。" },
    { q: "We discussed about the problem for hours, but we could not reach a conclusion.", o: ["discussed about", "for hours", "could not reach", "a conclusion"], a: 0, fix: "We discussed the problem for hours, but we could not reach a conclusion.", ja: "私たちは何時間もその問題について話し合ったが、結論には至らなかった。", ex: "discuss は他動詞なので about は不要。discussed the problem とする。" }
  ]
},
{
  id: "g47", cat: "難関大・東大：和訳・英作文・誤文訂正", lv: "ADV", title: "誤文訂正の着眼点", base: ["g28", "g19"],
  lead: "誤りを含む箇所を選ぶ問題では、意味から考えるより「文法の約束」を順番に点検するほうが確実です。よく狙われるチェックポイントを、実際の問題形式で練習します。",
  sec: [
    { h: "点検の順番",
      t: "**① 主語と動詞の一致**：主語の核はどれか（修飾部分を除く）。\n**② 動詞の形**：時制・態（する／される）・自動詞か他動詞か。\n**③ 準動詞**：to do / ～ing / 過去分詞のどれをとる語か。\n**④ 品詞**：形容詞と副詞、名詞と動詞の取り違え。\n**⑤ 名詞と代名詞**：可算・不可算、単数・複数、代名詞が指すものとの一致。\n**⑥ 前置詞・接続詞**：前置詞＋名詞、接続詞＋S V。\n**⑦ 並列・比較**：並ぶものの形、比べるものがそろっているか。",
      ex: [
        ["Each of the participants was given a different task.", "参加者はそれぞれ異なる課題を与えられた。", "① each は単数扱い"],
        ["The problem has not been solved yet.", "その問題はまだ解決されていない。", "② 問題は「解決される」側（受動）"],
        ["She avoided answering the question directly.", "彼女はその質問に直接答えるのを避けた。", "③ avoid は ～ing をとる"]
      ] },
    { h: "「正しく見える誤り」の典型",
      t: "**意味は通るのに文法が誤り**、という箇所が狙われます。\n・**代名詞の一致**：物や組織を表す単数名詞は、it / its で受けるのが原則（The company changed **its** name.）。\n・**数量表現**：a number of＋複数名詞（多くの：複数扱い）／the number of（～の数：単数扱い）、much / many、little / few。\n・**比較**：比較対象の不一致（than that of）、比較級を very で強調する誤り。\n・**関係詞**：前置詞＋that、what と that / which の取り違え。",
      ex: [
        ["The company announced that its profits had doubled.", "その会社は、利益が倍増したと発表した。", "company は it で受ける"],
        ["A number of students were absent from class today.", "今日は多くの学生が授業を欠席した。", "a number of＋複数名詞＝複数扱い"]
      ] },
    { h: "実戦のコツ",
      t: "**下線部の周辺だけでなく、文全体の構造**を確認します（主語が遠く離れていることがある）。\n誤りの候補を見つけたら、**正しい形に直せるか**を考えます。直し方を説明できない箇所は、正しい可能性が高いです。\n迷ったら、**①〜⑦の点検で根拠を言える箇所**を選びます。「なんとなく不自然」で選ばないことが大切です。",
      ex: [
        ["The results of the survey, which was conducted last year, were surprising.", "昨年行われたその調査の結果は、驚くべきものだった。", "were の主語は results（複数）、was の主語は survey"]
      ] }
  ],
  trap: ["主語と動詞の間が離れている文では、主語の核を必ず確認する。", "「訳して不自然」ではなく「文法の約束に反している」箇所を選ぶ。", "1つの選択肢に誤りがありそうでも、ほかの選択肢が正しいことを確かめてから決める。"],
  exam: "東大の二次試験では近年、英文の中の下線部から誤りを含むものを選ぶ問題が出題されています。主語と動詞の一致、準動詞、関係詞、比較、語法などの基本事項が、長い文の中に埋め込まれて問われるのが特徴です（出題形式は年度により変わることがあります）。",
  qs: [
    { q: "The list of items that need to be checked before the flight are posted on the wall.", o: ["that need", "to be checked", "before the flight", "are posted"], a: 3, fix: "The list of items that need to be checked before the flight is posted on the wall.", ja: "飛行前に点検すべき項目のリストは、壁に貼られている。", ex: "主語の核は The list（単数）。of items … flight は修飾部分なので、動詞は is posted。that need の need は items に一致しているので正しい。" },
    { q: "Although the experiment was carefully planned, the results were quite differently from what the researchers had expected.", o: ["was carefully planned", "were quite differently", "from what", "had expected"], a: 1, fix: "Although the experiment was carefully planned, the results were quite different from what the researchers had expected.", ja: "その実験は注意深く計画されたが、結果は研究者たちが予想していたものとはかなり異なっていた。", ex: "were の補語になるのは形容詞なので different。be different from ～（～と異なる）。" },
    { q: "Many young people would rather spend money on experiences than spending it on things.", o: ["would rather", "spend money", "on experiences", "than spending it"], a: 3, fix: "Many young people would rather spend money on experiences than spend it on things.", ja: "多くの若者は、物にお金を使うより、経験にお金を使いたいと考えている。", ex: "would rather A than B では、A と B の両方を動詞の原形にそろえる（spend … than spend …）。" },
    { q: "The new law, which was passed last month, require all companies to report their carbon emissions.", o: ["which was passed", "last month", "require all companies", "to report"], a: 2, fix: "The new law, which was passed last month, requires all companies to report their carbon emissions.", ja: "先月成立したその新しい法律は、すべての企業に二酸化炭素の排出量を報告するよう求めている。", ex: "主語は The new law（単数）。カンマで挟まれた関係詞節を飛ばすと The new law require となり、三単現の s が必要。" },
    { q: "Each of the students were given five minutes to explain the results of the experiment.", o: ["of the students", "were given", "five minutes", "to explain"], a: 1, fix: "Each of the students was given five minutes to explain the results of the experiment.", ja: "学生はそれぞれ、実験の結果を説明するために5分間を与えられた。", ex: "Each of the＋複数名詞 は、each が主語の中心なので単数扱い。was given とする。" },
    { q: "The museum attracts thousands of visitors every year, most of them come from overseas.", o: ["attracts", "thousands of visitors", "every year", "most of them"], a: 3, fix: "The museum attracts thousands of visitors every year, most of whom come from overseas.", ja: "その博物館には毎年何千人もの来館者があり、その大部分は海外から来ている。", ex: "カンマの後に接続詞がないまま2つ目の文（most of them come …）を続けることはできない。関係代名詞を使って most of whom とする。" }
  ]
},
{
  id: "g48", cat: "難関大・東大：和訳・英作文・誤文訂正", lv: "ADV", title: "論理展開と談話標識（要約・文挿入）", base: ["g13"],
  lead: "要約・段落の並べかえ・文の挿入では、文と文の「つながり方」が手がかりになります。however や in fact などの談話標識と、指示語・言いかえを手がかりに、筆者の主張と論理の流れを追う練習をします。",
  sec: [
    { h: "談話標識のグループ",
      t: "**逆接・対比**：however, but, yet, nevertheless, on the other hand, in contrast, whereas, while\n**追加・具体化**：moreover, furthermore, in addition, for example, for instance, in particular, in fact（実際・それどころか）\n**原因・結果**：therefore, thus, as a result, consequently, hence\n**言いかえ・まとめ**：in other words, that is (to say), in short, to sum up\n**譲歩→主張**：Admittedly / It is true that / Of course ～, but …（確かに～だが…）。but の後に筆者の主張が来ます。",
      ex: [
        ["It is true that technology saves time. However, it also creates new kinds of stress.", "確かに技術は時間を節約してくれる。しかし、新しい種類のストレスも生み出している。", "譲歩→主張"],
        ["The plan was expensive; moreover, it was unlikely to succeed.", "その計画は費用がかかった。そのうえ、成功する見込みも低かった。", "追加"],
        ["Many species are disappearing. In other words, the planet is losing its biodiversity.", "多くの種が消えつつある。言いかえれば、地球は生物の多様性を失いつつある。", "言いかえ"]
      ] },
    { h: "主張の見つけ方（要約のために）",
      t: "筆者の主張は、**逆接の後**、**譲歩の後**、**言いかえ・まとめの後**、**段落の最初か最後**に置かれやすい傾向があります。\n**一般論（Many people believe …）→ 反論（However, … / In reality, …）** の流れでは、後半が筆者の主張です。\n要約では、**具体例（for example 以下）や細かい数字は省き**、主張と根拠の骨組みだけを残します。",
      ex: [
        ["Many people believe that talent is something we are born with. In reality, most skills are developed through years of practice.", "多くの人は、才能は生まれつきのものだと考えている。実際には、ほとんどの技能は何年もの練習を通じて身につくものだ。", "一般論→筆者の主張"],
        ["Not only does reading improve vocabulary, but it also helps us understand other people's feelings.", "読書は語彙を増やすだけでなく、他人の気持ちを理解する助けにもなる。", "not only A but also B：B に重点"]
      ] },
    { h: "段落整序・文挿入の手がかり",
      t: "**① 指示語・冠詞**：this / these / such / the＋名詞は、前に指すものが必要。the problem が出てきたら、前の文でその problem が話題に出ているはず。\n**② 談話標識**：However の前には対立する内容、For example の前には一般的な主張、Therefore の前には理由がある。\n**③ 言いかえ**：前の文の語句を、後の文が別の語（同義語・上位語）で受けることがある（cars → these vehicles）。\n**④ 時の流れ・話題の流れ**：first, then, finally、一般→具体。",
      ex: [
        ["Some cities have banned cars from their centers. These measures have reduced air pollution significantly.", "中心部への車の乗り入れを禁止した都市がある。こうした対策によって、大気汚染は大きく減った。", "These measures が前の文の内容を受ける"]
      ] }
  ],
  trap: ["however を機械的に「しかし」と訳すだけでなく、何と何が対立しているかを確認する。in fact は「しかし」の意味ではない点にも注意。", "要約に具体例や数字を入れて字数を使い切らない。", "this / these を含む文を、指す内容がまだ出ていない位置に挿入しない。"],
  exam: "東大の二次試験では近年、英文の内容を日本語で要約する問題や、文章中の空所に適切な文を選んで入れる問題が出題されています。どちらも、談話標識と指示語を手がかりに論理の流れを追う力が問われます（出題形式は年度により変わることがあります）。",
  qs: [
    { q: "Electric cars produce no exhaust fumes. ___, the electricity they use is often generated by burning fossil fuels.", o: ["However", "Therefore", "For example", "In other words"], a: 0, ja: "電気自動車は排気ガスを出さない。しかし、電気自動車が使う電気は、化石燃料を燃やしてつくられることが多い。", ex: "前の文（排気ガスを出さない＝利点）と後の文（電気は化石燃料からつくられる＝問題点）が対立しているので However。" },
    { q: "The town has lost half its population in the last thirty years. ___, many of its schools have closed.", o: ["As a result", "On the other hand", "For instance", "Nevertheless"], a: 0, ja: "その町はこの30年で人口が半分になった。その結果、学校の多くが閉校した。", ex: "人口の減少（原因）→学校の閉校（結果）の関係なので As a result。" },
    { q: "Some people think that learning history is useless. ___, history teaches us how to avoid repeating past mistakes.", o: ["In fact", "As a result", "Similarly", "For example"], a: 0, ja: "歴史を学ぶのは無駄だと考える人もいる。実際には、歴史は過去の過ちを繰り返さない方法を教えてくれる。", ex: "前の文の考え（無駄だ）を打ち消して事実を示す In fact（実際には）。前の内容を否定・修正する働きがある。" },
    { q: "Plants need sunlight, water, and nutrients to grow. ___, they cannot survive for long in a dark room.", o: ["Therefore", "However", "In contrast", "Meanwhile"], a: 0, ja: "植物が育つには日光・水・養分が必要だ。したがって、暗い部屋では長く生きられない。", ex: "前の文（日光が必要）が理由、後の文（暗い部屋では生きられない）が結論なので Therefore。" },
    { q: "Admittedly, online classes are convenient. Yet they can never fully replace the experience of learning together in the same room.", o: ["オンライン授業は便利だが、同じ教室で一緒に学ぶ体験に完全に取って代わることはできない。", "オンライン授業は不便なので、同じ教室で学ぶほうがよい。", "オンライン授業は便利なので、教室での授業はもう必要ない。", "オンライン授業と教室での授業は、どちらも同じ体験を与えてくれる。"], a: 0, ja: "確かにオンライン授業は便利だ。しかし、同じ部屋で一緒に学ぶ体験に完全に取って代わることは決してできない。", ex: "Admittedly（確かに）～. Yet …（しかし…）は譲歩→主張の流れ。筆者の主張は Yet の後にある。" },
    { q: "Many animals use tools. Chimpanzees, ___, use sticks to catch insects.", o: ["for example", "however", "therefore", "in short"], a: 0, ja: "道具を使う動物は多い。たとえばチンパンジーは、棒を使って昆虫を捕まえる。", ex: "前の文の一般的な内容（道具を使う動物は多い）の具体例なので for example。文の途中にカンマで挟んで置くこともできる。" }
  ]
}
);
