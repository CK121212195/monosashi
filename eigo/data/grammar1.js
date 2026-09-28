/* 文法解説（前半）
   cat: 分類 / lv: HS=高校, UNI=大学・TOEIC上級
   sec: 解説の節 {h:見出し, t:本文（**太字**、改行可）, ex:[[英文, 和訳, 補足]]}
   trap: 日本人が間違えやすい点 / toeic: TOEICでの出方
   qs: 演習 {q:問題文（___が空所）, o:選択肢, a:正解, ja:和訳, ex:解説, lv:"A"なら英検1級・TOEIC900レベル} */
window.EIGO = window.EIGO || {};
EIGO.GRAMMAR = EIGO.GRAMMAR || [];
EIGO.GRAMMAR.push(
{
  id: "g01", cat: "文の骨組み", lv: "HS", title: "5文型と動詞の型",
  lead: "英文の意味は「動詞がどの形をとるか」でほぼ決まります。5文型は、動詞のあとに何が続くかの設計図です。",
  sec: [
    { h: "5つの型",
      t: "**第1文型 SV**：主語＋動詞だけで完結（副詞句は飾り）。\n**第2文型 SVC**：S＝C の関係。be, become, seem, remain, stay, look, sound など。\n**第3文型 SVO**：動詞が目的語をとる。\n**第4文型 SVOO**：「人に物を」与える。give, send, offer, show, lend など。\n**第5文型 SVOC**：O＝C の関係。make, keep, find, leave, consider, call など。",
      ex: [
        ["Prices rose sharply last year.", "昨年、価格は急上昇した。", "SV：rose は自動詞"],
        ["The market remained calm.", "市場は落ち着いたままだった。", "SVC：market＝calm"],
        ["The company launched a new app.", "その会社は新しいアプリを公開した。", "SVO"],
        ["The bank offered the startup a loan.", "銀行はそのスタートアップに融資を申し出た。", "SVOO：人＋物"],
        ["The news made investors nervous.", "そのニュースは投資家を不安にさせた。", "SVOC：investors＝nervous"]
      ] },
    { h: "自動詞と他動詞を取り違えない",
      t: "日本語につられて前置詞をつけたくなる**他動詞**は要注意です。discuss（～について話し合う）、mention（～に言及する）、approach（～に近づく）、enter（～に入る）、marry（～と結婚する）、attend（～に出席する）、reach（～に着く）は、すぐ後ろに目的語を置きます。\n逆に、前置詞が必要な**自動詞**もあります。apologize to 人 for 事、complain about、reply to、graduate from、wait for など。",
      ex: [
        ["We discussed the plan in detail.", "私たちはその計画について詳しく話し合った。", "× discussed about"],
        ["The CEO did not mention the merger.", "CEOは合併に言及しなかった。", "× mention about"],
        ["She replied to the email immediately.", "彼女はすぐにそのメールに返信した。", "reply は to が必要"]
      ] },
    { h: "紛らわしい自動詞・他動詞の組",
      t: "**rise（上がる）／raise（～を上げる）**、**lie（横たわる・ある）／lay（～を置く）**、**sit／seat**、**fall／fell（木を切り倒す）**。目的語があれば他動詞です。",
      ex: [
        ["The central bank raised interest rates.", "中央銀行は金利を引き上げた。", "raise＋目的語"],
        ["The problem lies in the design.", "問題は設計にある。", "lie in ～：～にある"]
      ] }
  ],
  trap: ["discuss / mention / enter / reach / attend に about や to をつけない。", "SVOC の C に副詞は置けない（× keep the room cleanly → ○ keep the room clean）。", "look / sound / seem のあとは形容詞（× She looks happily）。"],
  toeic: "Part 5 で「自動詞か他動詞か」「補語に形容詞か副詞か」を問う問題として出ます。空所のあとに目的語があるかを最初に確認しましょう。",
  qs: [
    { q: "The board will ___ the proposal at next week's meeting.", o: ["discuss", "discuss about", "talk", "speak"], a: 0, ja: "取締役会は来週の会議でその提案を話し合う。", ex: "discuss は他動詞なので about は不要。talk / speak は自動詞で、目的語を直接とるには about が必要です。" },
    { q: "The new policy made the process much more ___.", o: ["efficient", "efficiently", "efficiency", "efficiencies"], a: 0, ja: "新しい方針で、手続きがずっと効率的になった。", ex: "make O C（OをCにする）の C は形容詞。O＝C（process＝efficient）の関係になります。副詞は補語になれません。" },
    { q: "Profits have ___ steadily for three consecutive quarters.", o: ["risen", "raised", "arisen", "aroused"], a: 0, ja: "利益は3四半期連続で着実に増えている。", ex: "後ろに目的語がないので自動詞 rise の過去分詞 risen。raise は他動詞（～を上げる）。" },
    { q: "Please ___ the documents on the table before you leave.", o: ["lay", "lie", "lain", "lying"], a: 0, ja: "帰る前に書類をテーブルの上に置いてください。", ex: "目的語 the documents があるので他動詞 lay（置く）。lie は「横たわる」で目的語をとりません。" },
    { q: "Customers found the new interface ___ to use.", o: ["easy", "easily", "ease", "easiness"], a: 0, ja: "顧客は新しい操作画面が使いやすいと感じた。", ex: "find O C（OがCだとわかる）。interface＝easy の関係なので形容詞。" }
  ]
},
{
  id: "g02", cat: "時制", lv: "HS", title: "現在・過去・未来と進行形",
  lead: "英語の時制は「いつの話か」だけでなく「どう捉えているか」を表します。",
  sec: [
    { h: "現在形は「いつもそう」",
      t: "現在形は、習慣・事実・不変の真理を表します。また、時刻表や公式の予定のように**確定した未来**にも使います。",
      ex: [
        ["The market opens at nine.", "市場は9時に開く。", "習慣・予定"],
        ["The train leaves at 7:15 tomorrow.", "電車は明日7時15分に出る。", "確定した予定"]
      ] },
    { h: "時・条件を表す副詞節では、未来でも現在形",
      t: "when, before, after, until, as soon as, once, if, unless などが作る**副詞節**では、未来のことでも現在形（または現在完了）を使います。TOEIC の最頻出ポイントの1つです。\nただし、「いつ～か」「～かどうか」を表す**名詞節**（know の目的語など）では will を使います。",
      ex: [
        ["We will start the meeting when the manager arrives.", "部長が着いたら会議を始めます。", "× when the manager will arrive"],
        ["If it rains tomorrow, the event will be held indoors.", "明日雨なら、行事は屋内で行われる。", "条件節は現在形"],
        ["I don't know when he will arrive.", "彼がいつ着くのかわからない。", "名詞節なので will"]
      ] },
    { h: "進行形と状態動詞",
      t: "進行形は「一時的に進行中・途中」を表します。**状態動詞**（know, believe, belong, own, contain, consist, resemble, need, prefer など）は原則として進行形にしません。\n未来の進行形 will be ～ing は「（自然な流れで）～していることになる」という予定を表します。",
      ex: [
        ["The company is developing a new chip.", "その会社は新しいチップを開発中だ。", "進行中"],
        ["This box contains fragile items.", "この箱には壊れやすい品物が入っている。", "× is containing"],
        ["We will be launching the product next month.", "来月その製品を発売する予定です。", "未来進行形"]
      ] }
  ],
  trap: ["when / if / until / as soon as の副詞節に will を入れない。", "know, own, belong, contain を進行形にしない。", "「～に属している」は belong to（× am belonging）。"],
  toeic: "Part 5 で「by the time / as soon as / once の後の時制」「文末の時の表現（next month, last year, since 2020）」から時制を決める問題が毎回のように出ます。",
  qs: [
    { q: "Please call me as soon as the shipment ___.", o: ["arrives", "will arrive", "arrived", "would arrive"], a: 0, ja: "荷物が届いたらすぐに電話してください。", ex: "as soon as は時の副詞節。未来のことでも現在形 arrives を使います。" },
    { q: "The seminar ___ at 10 a.m. every Monday.", o: ["begins", "is beginning", "has begun", "began"], a: 0, ja: "そのセミナーは毎週月曜の午前10時に始まる。", ex: "every Monday（毎週月曜）は習慣なので現在形。" },
    { q: "Nobody knows when the new store ___.", o: ["will open", "opens", "opened", "has opened"], a: 0, ja: "新しい店がいつ開店するのか誰も知らない。", ex: "when 以下は knows の目的語になる名詞節なので、未来は will で表します。副詞節と区別できるかがポイント。" },
    { q: "This package ___ several fragile items.", o: ["contains", "is containing", "contain", "are containing"], a: 0, ja: "この荷物には壊れやすい品物がいくつか入っている。", ex: "contain は状態動詞なので進行形にしません。主語は単数なので contains。" },
    { q: "Unless sales ___ next quarter, the project will be canceled.", o: ["improve", "will improve", "improved", "improving"], a: 0, ja: "来四半期に売上が改善しなければ、その計画は中止される。", ex: "unless（～しない限り）は条件の副詞節。未来でも現在形 improve。" }
  ]
},
{
  id: "g03", cat: "時制", lv: "HS", title: "完了形（現在・過去・未来完了）",
  lead: "完了形は「ある時点までのつながり」を表します。日本語にない発想なので、時間の線で考えるのがコツです。",
  sec: [
    { h: "現在完了：過去から今へのつながり",
      t: "have＋過去分詞。**完了・結果**（もう～した）、**経験**（～したことがある）、**継続**（ずっと～している）の3用法。\n**明確な過去を表す語**（yesterday, last year, ago, when ～?, in 2020）とは一緒に使えません。これらは過去形で表します。",
      ex: [
        ["The company has already released its results.", "その会社はすでに決算を発表した。", "完了"],
        ["I have visited that museum twice.", "その美術館には2回行ったことがある。", "経験"],
        ["Prices have risen since January.", "1月から価格は上がり続けている。", "継続：since"],
        ["The company released its results yesterday.", "その会社は昨日決算を発表した。", "× has released yesterday"]
      ] },
    { h: "現在完了進行形",
      t: "have been ～ing は、動作が今まで続いていて、これからも続きそうなことを強調します。for / since と一緒によく使います。",
      ex: [
        ["We have been waiting for the results for two hours.", "私たちは2時間ずっと結果を待っている。", ""]
      ] },
    { h: "過去完了と未来完了",
      t: "**過去完了**（had＋過去分詞）は「過去のある時点までに」。過去の2つの出来事のうち、より前のものを表すこともあります（大過去）。\n**未来完了**（will have＋過去分詞）は「未来のある時点までに～しているだろう」。by the time ＋現在形 とセットで頻出です。",
      ex: [
        ["When I arrived, the meeting had already started.", "私が着いたとき、会議はすでに始まっていた。", "過去完了"],
        ["By the time you read this, I will have left.", "あなたがこれを読む頃には、私は出発しているだろう。", "未来完了"],
        ["By next year, the firm will have opened ten stores.", "来年までに、その会社は10店舗を開いているだろう。", ""]
      ] }
  ],
  trap: ["yesterday / ago / last ～ / in 2020 と現在完了を一緒に使わない。", "「～して3年になる」は It has been three years since ～ / It is three years since ～。", "by the time の節の中は現在形、主節は未来完了。"],
  toeic: "「since＋過去の時点」「for the past ～ years」「over the last decade」があれば現在完了、「by the end of next month」なら未来完了、というシグナル問題が定番です。",
  qs: [
    { q: "Sales ___ steadily since the new manager joined the team.", o: ["have increased", "increased", "are increasing", "will increase"], a: 0, ja: "新しい部長がチームに加わってから、売上は着実に伸びている。", ex: "since＋過去の時点 は現在完了のシグナル。" },
    { q: "By the end of this year, the company ___ more than 500 employees.", o: ["will have hired", "has hired", "hired", "had hired"], a: 0, ja: "今年の終わりまでに、その会社は500人以上を採用しているだろう。", ex: "By the end of this year（未来の時点まで）なので未来完了。" },
    { q: "The report ___ two days ago.", o: ["was published", "has been published", "has published", "had been publishing"], a: 0, ja: "その報告書は2日前に公表された。", ex: "ago は明確な過去を表すので現在完了と一緒に使えません。報告書は「公表される」側なので受動態の過去形。" },
    { q: "When the police arrived, the thief ___ already escaped.", o: ["had", "has", "have", "was"], a: 0, ja: "警察が到着したとき、泥棒はすでに逃げていた。", ex: "過去の時点（警察が着いた）より前に完了していたので過去完了 had escaped。" },
    { q: "It ___ five years since the firm moved its headquarters to Osaka.", o: ["has been", "was", "is being", "had"], a: 0, ja: "その会社が本社を大阪に移してから5年になる。", ex: "It has been＋期間＋since ～（～してから…になる）。It is five years since ～ も可能ですが、選択肢にはありません。" }
  ]
},
{
  id: "g04", cat: "助動詞", lv: "HS", title: "助動詞と「助動詞＋have＋過去分詞」",
  lead: "助動詞は話し手の判断（確信の度合い・義務・許可）を動詞に上乗せします。",
  sec: [
    { h: "意味の整理",
      t: "**must**：～しなければならない／～に違いない。**must not**：～してはいけない（禁止）。**don't have to / need not**：～する必要はない（不要）。\n**should / ought to**：～すべきだ／～のはずだ。**had better**：～したほうがいい（しないと困ったことになる、という強い忠告）。\n**may / might**：～かもしれない／～してよい。**can't**：～のはずがない。",
      ex: [
        ["You must not share your password.", "パスワードを共有してはいけない。", "禁止"],
        ["You don't have to finish it today.", "今日中に終える必要はない。", "不要"],
        ["You had better back up your data.", "データをバックアップしておいたほうがいい。", "had better＋原形"]
      ] },
    { h: "助動詞＋have＋過去分詞（過去への推量・後悔）",
      t: "**must have p.p.**：～したに違いない。**can't have p.p.**：～したはずがない。**may / might have p.p.**：～したかもしれない。**should have p.p.**：～すべきだったのに（しなかった）。**need not have p.p.**：～する必要はなかったのに（してしまった）。",
      ex: [
        ["He must have forgotten the meeting.", "彼は会議を忘れていたに違いない。", ""],
        ["We should have invested earlier.", "もっと早く投資しておくべきだった。", "後悔"],
        ["She can't have made such a mistake.", "彼女がそんな間違いをしたはずがない。", ""]
      ] },
    { h: "紛らわしい表現",
      t: "**used to do**：以前は～したものだ（今は違う）。**be used to ～ing**：～に慣れている（to は前置詞）。**would rather A than B**：BよりむしろAしたい。**may well**：たぶん～だろう／～するのももっともだ。**may as well**：～したほうがましだ・～してもいい（ほかに良い手がないので）。",
      ex: [
        ["I used to work in Tokyo.", "以前は東京で働いていた。", ""],
        ["I am used to working late.", "遅くまで働くのには慣れている。", "to＋動名詞"],
        ["I would rather walk than take a taxi.", "タクシーに乗るより歩きたい。", ""]
      ] }
  ],
  trap: ["must not（禁止）と don't have to（不要）は意味がまったく違う。", "be used to の to は前置詞なので ～ing（× be used to work）。", "had better の否定は had better not do（× had not better）。"],
  toeic: "助動詞のあとは原形、という形の問題（× must to go、× should reviewed）が出ます。Part 7 では may / might / could を使った「可能性」の言い換えに注意。",
  qs: [
    { q: "All visitors ___ wear an ID badge inside the building.", o: ["must", "must to", "have", "should to"], a: 0, ja: "来訪者は全員、建物内でIDバッジを着用しなければならない。", ex: "助動詞のあとは動詞の原形。must to や should to という形はありません。have なら have to が必要。" },
    { q: "The lights are off. They ___ have gone home already.", o: ["must", "should", "need", "ought"], a: 0, ja: "明かりが消えている。彼らはもう帰ったに違いない。", ex: "must have p.p.（～したに違いない）。明かりが消えているという根拠からの確信的な推量です。" },
    { q: "Employees ___ to submit expense reports by Friday.", o: ["are required", "must", "should", "have to be"], a: 0, ja: "従業員は金曜日までに経費報告書を提出することが求められている。", ex: "空所の後が to submit なので、be required to do（～するよう求められている）。must / should の後に to は来ません。" },
    { q: "Many of our staff are used to ___ with overseas clients.", o: ["working", "work", "worked", "be working"], a: 0, ja: "当社のスタッフの多くは海外の顧客と仕事をするのに慣れている。", ex: "be used to の to は前置詞なので、後ろは動名詞 working。" },
    { q: "You ___ have booked a taxi; the hotel offers a free shuttle.", o: ["need not", "must not", "cannot", "should"], a: 0, ja: "タクシーを予約する必要はなかったのに。ホテルには無料送迎がある。", ex: "need not have p.p.（～する必要はなかったのに、実際はした）。", lv: "A" }
  ]
},
{
  id: "g05", cat: "態", lv: "HS", title: "受動態",
  lead: "「誰がしたか」より「何がされたか」に焦点を当てたいときに受動態を使います。ビジネス文書に非常に多い形です。",
  sec: [
    { h: "形と時制",
      t: "be＋過去分詞。時制は be の部分で表します。\n進行形：is being done／完了形：has been done／助動詞：will be done, must be done。",
      ex: [
        ["The report was written by the finance team.", "その報告書は財務チームによって書かれた。", ""],
        ["The system is being updated now.", "システムは現在更新中だ。", "進行形の受動態"],
        ["The contract has been signed.", "契約は締結された。", "完了形の受動態"],
        ["The results will be announced next week.", "結果は来週発表される。", ""]
      ] },
    { h: "by 以外の前置詞をとる受動態",
      t: "be interested in／be satisfied with／be covered with／be known to（～に知られている）・for（～で有名）・as（～として知られる）／be made of（材料）・from（原料）／be involved in／be located in／be based on／be committed to ～ing。",
      ex: [
        ["The artist is known for her bold colors.", "その画家は大胆な色使いで知られている。", ""],
        ["Our office is located in central Tokyo.", "当社の事務所は東京の中心部にある。", ""]
      ] },
    { h: "第4・第5文型と群動詞の受動態",
      t: "SVOO は「人」も「物」も主語にできます。SVOC は O を主語にして C をそのまま残します。群動詞（look after, laugh at など）は**ひとまとまり**のまま受動態にします。\n使役・知覚動詞の原形不定詞は、受動態では **to 不定詞**になります（be made to do, be seen to do）。",
      ex: [
        ["She was given a bonus.", "彼女はボーナスをもらった。", "SVOO の受動態"],
        ["The room was kept clean.", "部屋は清潔に保たれていた。", "SVOC の受動態"],
        ["The children were looked after by volunteers.", "子どもたちはボランティアに世話をされた。", "群動詞"],
        ["The workers were made to work overtime.", "労働者たちは残業させられた。", "make O do → be made to do"]
      ] }
  ],
  trap: ["「～に位置する」は be located（× locates）。", "be made to do の to を落とさない。", "自動詞（happen, occur, arise, rise, appear）は受動態にできない（× was happened）。"],
  toeic: "Part 5 最頻出の1つ。空所の後に目的語がない、または by ～ があれば受動態を疑います。「主語がその動作をする側か、される側か」で判断しましょう。",
  qs: [
    { q: "The annual report ___ to all shareholders next week.", o: ["will be sent", "will send", "sends", "has sent"], a: 0, ja: "年次報告書は来週、全株主に送付される。", ex: "報告書は「送られる」側。目的語もないので受動態 will be sent。" },
    { q: "The new factory ___ near the port.", o: ["is located", "locates", "is locating", "has located"], a: 0, ja: "新しい工場は港の近くにある。", ex: "be located（位置している）の形で使います。" },
    { q: "The accident ___ because of a technical error.", o: ["happened", "was happened", "was happening by", "has been happened"], a: 0, ja: "その事故は技術的なミスが原因で起きた。", ex: "happen は自動詞なので受動態にできません。" },
    { q: "All the rooms are currently ___ renovated.", o: ["being", "been", "be", "to be"], a: 0, ja: "すべての部屋は現在改装中だ。", ex: "進行形の受動態 is / are being＋過去分詞。currently がシグナル。" },
    { q: "The staff were made ___ the manual before starting work.", o: ["to read", "read", "reading", "to reading"], a: 0, ja: "スタッフは仕事を始める前にマニュアルを読まされた。", ex: "make O do（原形）は、受動態では be made to do になります。", lv: "A" }
  ]
},
{
  id: "g06", cat: "準動詞", lv: "HS", title: "不定詞①（3用法と形式主語）",
  lead: "to＋動詞の原形は、文の中で名詞・形容詞・副詞の働きをします。",
  sec: [
    { h: "名詞的用法「～すること」",
      t: "主語・目的語・補語になります。主語が長いときは**形式主語 it** を置き、to 不定詞を後ろに回すのが普通です。\nwant, hope, decide, plan, expect, agree, refuse, afford, manage, fail, promise などは to 不定詞を目的語にとります。\n**疑問詞＋to 不定詞**：how to do（～の仕方）、what to do、when to start など。",
      ex: [
        ["It is important to diversify your investments.", "投資を分散することは重要だ。", "形式主語 it"],
        ["The company decided to expand overseas.", "その会社は海外に進出することを決めた。", ""],
        ["Nobody knew what to do next.", "次に何をすべきか誰もわからなかった。", "疑問詞＋to"]
      ] },
    { h: "形容詞的用法「～するための・～すべき」",
      t: "直前の名詞を修飾します。a chance to win（勝つ機会）、something to drink（飲み物）。\nability, attempt, decision, effort, plan, right, tendency, way など、動詞・形容詞から来た名詞は to 不定詞と結びつきます。",
      ex: [
        ["We need someone to lead the project.", "その計画を率いる人が必要だ。", ""],
        ["The decision to cut jobs surprised everyone.", "人員を削減するという決定は皆を驚かせた。", "decision to do"]
      ] },
    { h: "副詞的用法「～するために」など",
      t: "目的（～するために）、感情の原因（～して）、判断の根拠（～するとは）、結果（～してその結果…）を表します。目的をはっきりさせるには **in order to / so as to**、否定は **in order not to / so as not to**。",
      ex: [
        ["She studied hard to pass the exam.", "彼女は試験に合格するために懸命に勉強した。", "目的"],
        ["I was glad to hear the news.", "その知らせを聞いてうれしかった。", "感情の原因"],
        ["He left early so as not to miss the train.", "電車に乗り遅れないよう、彼は早く出た。", "否定の目的"],
        ["He woke up only to find the flight canceled.", "目を覚ますと、フライトが欠航になっていた。", "結果（only to）"]
      ] }
  ],
  trap: ["「～しないように」は not to do（× to not do は口語では見るが試験では避ける）。", "want / decide / plan は to 不定詞、enjoy / finish / avoid は動名詞。", "It is ～ for 人 to do（人が～するのは）の for を落とさない。"],
  toeic: "「in order to＋原形」「be able to / be likely to / be eager to＋原形」の形、そして「動詞が to 不定詞をとるか動名詞をとるか」が繰り返し出題されます。",
  qs: [
    { q: "The company plans ___ a new branch in Singapore.", o: ["to open", "opening", "open", "opened"], a: 0, ja: "その会社はシンガポールに新しい支店を開く計画だ。", ex: "plan は to 不定詞を目的語にとります。" },
    { q: "In order ___ costs, the firm moved to a smaller office.", o: ["to reduce", "reducing", "reduce", "reduced"], a: 0, ja: "コストを減らすため、その会社は小さい事務所に移った。", ex: "in order to＋原形（～するために）。" },
    { q: "It is difficult ___ new employees to learn all the rules at once.", o: ["for", "of", "to", "with"], a: 0, ja: "新入社員がすべての規則を一度に覚えるのは難しい。", ex: "It is ＋形容詞＋for 人＋to do。difficult のように事柄の性質を表す形容詞では for を使います。" },
    { q: "Please tell me ___ to contact if the system fails.", o: ["whom", "what", "how", "where"], a: 0, ja: "システムが故障したら誰に連絡すればいいか教えてください。", ex: "contact の目的語になる「誰に」が必要なので whom to contact。how to contact だと目的語が欠けたままになります。" },
    { q: "She arrived at the station, only ___ that the last train had left.", o: ["to find", "finding", "found", "to be found"], a: 0, ja: "彼女は駅に着いたが、最終電車はもう出てしまっていた。", ex: "only to do は「結果」を表す不定詞（～したが、結局…だった）。" }
  ]
},
{
  id: "g07", cat: "準動詞", lv: "HS", title: "不定詞②（意味上の主語・完了形・重要構文）",
  lead: "不定詞の「誰が」「いつ」を表す形と、試験に出る決まった構文をまとめます。",
  sec: [
    { h: "意味上の主語：for と of",
      t: "不定詞の動作をする人は **for 人** で表します。ただし、kind, nice, careless, clever, foolish, rude など**人の性質を評価する形容詞**では **of 人** を使います。",
      ex: [
        ["It is necessary for us to act quickly.", "私たちがすばやく行動する必要がある。", "for"],
        ["It was kind of you to help me.", "手伝ってくれてありがとう（ご親切に）。", "of：人の性質"]
      ] },
    { h: "完了不定詞・受動不定詞",
      t: "to have＋過去分詞 は、主節の時点より**前**のことを表します。seem to have done（～したようだ）。受動は to be done、完了受動は to have been done。",
      ex: [
        ["He seems to have lost his keys.", "彼は鍵をなくしたようだ。", "= It seems that he lost / has lost"],
        ["The data needs to be checked again.", "データはもう一度確認される必要がある。", "受動不定詞"]
      ] },
    { h: "重要構文",
      t: "**too ～ to do**：～すぎて…できない。**～ enough to do**：…するほど～（enough は形容詞・副詞の後ろ）。**be to do**：予定・義務・可能・運命・意図（if 節で）。**独立不定詞**：to be honest（正直に言うと）、to make matters worse（さらに悪いことに）、needless to say（言うまでもなく）。\n**原形不定詞**：使役動詞（make, let, have）や知覚動詞（see, hear, feel）の後では to をつけません。",
      ex: [
        ["The box is too heavy to lift.", "その箱は重すぎて持ち上げられない。", "× too heavy to lift it"],
        ["She is old enough to vote.", "彼女は投票できる年齢だ。", "enough の位置"],
        ["The president is to visit Japan next month.", "大統領は来月日本を訪問する予定だ。", "be to：予定"],
        ["To be honest, I don't like the design.", "正直に言うと、そのデザインは好きではない。", "独立不定詞"],
        ["I heard someone call my name.", "誰かが私の名前を呼ぶのが聞こえた。", "知覚動詞＋原形"]
      ] }
  ],
  trap: ["too ～ to do の後に、主語と同じものを指す目的語を重ねない（× too heavy to lift it）。", "enough は形容詞の後ろ（× enough old）。名詞には前から（enough money）。", "It is kind of you ～ の of を for にしない。"],
  toeic: "「enough の位置」「seem to have p.p.」「be likely to / be expected to」など、不定詞を含む定型の形がそのまま問われます。",
  qs: [
    { q: "It was careless ___ him to leave the door unlocked.", o: ["of", "for", "to", "with"], a: 0, ja: "ドアに鍵をかけずに出るとは、彼は不注意だった。", ex: "careless は人の性質を評価する形容詞なので of 人。" },
    { q: "The budget is not large ___ to cover all the costs.", o: ["enough", "too", "so", "very"], a: 0, ja: "予算はすべての費用をまかなえるほど大きくない。", ex: "形容詞＋enough to do（…するほど～）。" },
    { q: "The CEO seems ___ the decision before the meeting.", o: ["to have made", "to make", "making", "having made"], a: 0, ja: "CEOは会議の前に決断していたようだ。", ex: "「会議の前に」決めていた＝seems より前の時点なので完了不定詞 to have made。" },
    { q: "The instructions were too complicated for most users ___.", o: ["to follow", "to follow them", "following", "follow"], a: 0, ja: "その説明はほとんどの利用者にとって複雑すぎて従えなかった。", ex: "too ～ to do の文では、主語（instructions）を指す目的語を繰り返しません。" },
    { q: "If we are ___ meet the deadline, we need more staff.", o: ["to", "for", "going", "about"], a: 0, ja: "締め切りに間に合わせるつもりなら、もっと人手が必要だ。", ex: "if 節の be to do は「意図（～するつもりなら）」。going なら going to meet と to が必要です。", lv: "A" }
  ]
},
{
  id: "g08", cat: "準動詞", lv: "HS", title: "動名詞と、不定詞との使い分け",
  lead: "「～すること」を表す点は不定詞と同じですが、動名詞は「すでに／実際に行うこと」、不定詞は「これから行うこと」に向きやすい、という傾向があります。",
  sec: [
    { h: "動名詞だけを目的語にとる動詞",
      t: "mind, enjoy, give up, avoid, finish, escape, put off, postpone, stop, consider, suggest, recommend, deny, admit, practice, miss, risk, keep, delay。頭文字で覚える「メガフェップス（MEGAFEPS）」系の語呂も有名です。",
      ex: [
        ["Would you mind closing the window?", "窓を閉めていただけますか。", ""],
        ["We are considering opening a new office.", "新しい事務所の開設を検討している。", "× consider to open"],
        ["He suggested postponing the meeting.", "彼は会議の延期を提案した。", "× suggested to postpone"]
      ] },
    { h: "両方とるが意味が変わる動詞",
      t: "**remember / forget ～ing**：（過去に）～したことを覚えている／忘れる。**remember / forget to do**：（これから）～するのを覚えておく／忘れる。\n**regret ～ing**：～したことを後悔する。**regret to do**：残念ながら～する（regret to inform）。\n**try ～ing**：試しに～してみる。**try to do**：～しようと努力する。\n**stop ～ing**：～するのをやめる。**stop to do**：～するために立ち止まる（to は副詞的用法）。",
      ex: [
        ["Please remember to lock the door.", "忘れずにドアに鍵をかけてください。", "これから"],
        ["I remember meeting her in Paris.", "パリで彼女に会ったのを覚えている。", "過去"],
        ["We regret to inform you that the event has been canceled.", "残念ながら、行事は中止になったことをお知らせします。", "ビジネス定型"]
      ] },
    { h: "前置詞の to＋動名詞",
      t: "to が前置詞なので、後ろは動名詞になる表現です。**look forward to ～ing**、**be committed / dedicated to ～ing**、**object to ～ing**、**be used / accustomed to ～ing**、**when it comes to ～ing**、**with a view to ～ing**、**contribute to ～ing**。\nほかの慣用表現：It is no use ～ing（～してもむだ）、cannot help ～ing（～せずにいられない）、feel like ～ing（～したい気がする）、be worth ～ing（～する価値がある）、on ～ing（～するとすぐに）、There is no ～ing（～できない）。",
      ex: [
        ["We look forward to hearing from you.", "ご連絡をお待ちしております。", "× look forward to hear"],
        ["The firm is committed to reducing waste.", "その会社はごみの削減に力を入れている。", ""],
        ["This book is worth reading.", "この本は読む価値がある。", ""]
      ] },
    { h: "動名詞の意味上の主語",
      t: "所有格または目的格で表します。Do you mind **my / me** opening the window?（私が窓を開けてもいいですか）。",
      ex: [
        ["Do you mind my sitting here?", "ここに座ってもいいですか。", ""]
      ] }
  ],
  trap: ["look forward to ＋原形 は誤り。to は前置詞。", "suggest / recommend / consider に to 不定詞を続けない。", "stop to do は「やめる」ではなく「～するために立ち止まる」。"],
  toeic: "「look forward to ～ing」「be committed to ～ing」「consider / suggest ～ing」はほぼ毎回のように形を変えて出題されます。",
  qs: [
    { q: "We look forward to ___ with you again.", o: ["working", "work", "worked", "be working"], a: 0, ja: "またご一緒に仕事ができるのを楽しみにしております。", ex: "look forward to の to は前置詞なので動名詞。" },
    { q: "The manager suggested ___ the launch until spring.", o: ["postponing", "to postpone", "postpone", "postponed"], a: 0, ja: "部長は発売を春まで延期することを提案した。", ex: "suggest は動名詞を目的語にとります（suggest that S＋原形 も可）。" },
    { q: "Don't forget ___ the lights when you leave.", o: ["to turn off", "turning off", "turn off", "turned off"], a: 0, ja: "出るときに明かりを消すのを忘れないで。", ex: "これからすることを忘れない＝forget to do。" },
    { q: "The company is dedicated to ___ high-quality service.", o: ["providing", "provide", "provided", "be provided"], a: 0, ja: "その会社は質の高いサービスの提供に力を注いでいる。", ex: "be dedicated to の to は前置詞。" },
    { q: "It is no use ___ about the past.", o: ["worrying", "to worry", "worry", "worried"], a: 0, ja: "過去のことを心配してもむだだ。", ex: "It is no use ～ing（～してもむだだ）は動名詞の慣用表現。" }
  ]
},
{
  id: "g09", cat: "準動詞", lv: "HS", title: "分詞（現在分詞と過去分詞）",
  lead: "分詞は動詞を形容詞のように使う形です。「する側」なら現在分詞、「される側」なら過去分詞。",
  sec: [
    { h: "名詞を修飾する",
      t: "1語なら名詞の**前**、語句を伴えば名詞の**後ろ**に置きます。\na **rising** price（上がっている価格）、the price **raised** by the company（会社によって引き上げられた価格）。",
      ex: [
        ["The rising cost of energy worries households.", "上昇するエネルギー費用が家計を悩ませている。", "現在分詞：自ら上がる"],
        ["The products made in this factory are exported.", "この工場で作られた製品は輸出される。", "過去分詞＋語句 は後ろから"],
        ["People living in cities pay higher rents.", "都市に住む人々は高い家賃を払う。", ""]
      ] },
    { h: "感情を表す分詞：exciting と excited",
      t: "surprise, interest, excite, disappoint, satisfy, bore, confuse, tire などは「～させる」という意味の他動詞です。\n**物事が人を～させる**→ 現在分詞（an exciting game, disappointing results）。\n**人が～させられる＝～する気持ちになる**→ 過去分詞（excited fans, disappointed investors）。",
      ex: [
        ["The results were disappointing.", "結果は期待外れだった。", "結果が人をがっかりさせる"],
        ["Investors were disappointed with the results.", "投資家はその結果にがっかりした。", "人ががっかりさせられた"]
      ] },
    { h: "補語になる分詞",
      t: "SVC：keep ～ing（～し続ける）、remain seated（座ったままでいる）。\nSVOC：keep O waiting（Oを待たせる）、have O done（Oを～してもらう・される）、leave O unlocked、find O broken。O と分詞の関係が「する」なら現在分詞、「される」なら過去分詞です。",
      ex: [
        ["Sorry to keep you waiting.", "お待たせしてすみません。", "you が待っている"],
        ["I had my car repaired yesterday.", "昨日、車を修理してもらった。", "car が修理される"],
        ["Please remain seated until the plane stops.", "飛行機が止まるまでお座りのままでお待ちください。", ""]
      ] }
  ],
  trap: ["「私は興奮した」は I was excited（× I was exciting）。", "have O done の O と done は「される」関係。", "名詞＋分詞の判断は、名詞が「する側」か「される側」か。"],
  toeic: "「interested / interesting」「attached / attaching（the attached file＝添付ファイル）」「experienced（経験豊富な）」「qualified（資格のある）」など、分詞形容詞の選択が頻出です。",
  qs: [
    { q: "Please review the ___ document before the meeting.", o: ["attached", "attaching", "attach", "attachment"], a: 0, ja: "会議の前に添付の文書をご確認ください。", ex: "文書は「添付される」側なので過去分詞 attached。the attached file / document はビジネスメールの定型。" },
    { q: "The sales figures for June were ___.", o: ["disappointing", "disappointed", "disappoint", "disappointment"], a: 0, ja: "6月の売上高は期待外れだった。", ex: "数字が人をがっかりさせる側なので現在分詞。" },
    { q: "Applicants ___ in the position should send a résumé.", o: ["interested", "interesting", "interest", "to interest"], a: 0, ja: "その職に関心のある応募者は履歴書を送ってください。", ex: "応募者が「関心を持たされている」＝interested。" },
    { q: "We are looking for an ___ engineer to lead the team.", o: ["experienced", "experiencing", "experience", "experiences"], a: 0, ja: "チームを率いる経験豊富な技術者を探している。", ex: "experienced は「経験を積んだ」という形容詞として定着した過去分詞です。" },
    { q: "I had my passport ___ at the airport.", o: ["stolen", "steal", "stealing", "to steal"], a: 0, ja: "空港でパスポートを盗まれた。", ex: "have O done（Oを～される）。パスポートは「盗まれる」側。" }
  ]
},
{
  id: "g10", cat: "準動詞", lv: "HS", title: "分詞構文",
  lead: "接続詞と主語を省き、分詞で文をつなぐ書き言葉の形です。英検の長文やTOEIC Part 7に多く出ます。",
  sec: [
    { h: "作り方と意味",
      t: "① 接続詞を消す ② 主節と主語が同じなら主語も消す ③ 動詞を ～ing にする。\n意味は文脈で「時（～するとき）」「理由（～なので）」「条件（～すれば）」「譲歩（～だけれども）」「付帯状況（～しながら）」「連続（そして～）」と読み分けます。",
      ex: [
        ["Seeing the police, the thief ran away.", "警察を見て、泥棒は逃げた。", "時"],
        ["Having no money, he could not buy the ticket.", "お金がなかったので、彼はチケットを買えなかった。", "理由"],
        ["Turning left, you will find the museum.", "左に曲がれば、美術館が見えます。", "条件"],
        ["She sat on the bench, reading a novel.", "彼女は小説を読みながらベンチに座っていた。", "付帯状況"]
      ] },
    { h: "否定・完了・受動",
      t: "**否定**は分詞の直前に not / never：Not knowing what to say, ...。\n**時がずれる**（主節より前）なら完了形：Having finished the report, ...。\n**受動**は (Being) ＋過去分詞。Being は省略されることが多いです：(Being) Written in simple English, the book is easy to read.",
      ex: [
        ["Not knowing what to do, I asked my manager.", "どうしたらいいかわからず、上司に尋ねた。", "否定"],
        ["Having finished the report, she went home.", "報告書を書き終えて、彼女は帰宅した。", "完了"],
        ["Written in plain English, the manual is easy to follow.", "平易な英語で書かれているので、その手引きはわかりやすい。", "受動"]
      ] },
    { h: "独立分詞構文と慣用表現",
      t: "主語が主節と**違う**ときは、分詞の前に主語を残します（独立分詞構文）：Weather permitting, ...（天気がよければ）。\n慣用表現：generally speaking（一般的に言えば）、frankly speaking、judging from ～（～から判断すると）、considering ～（～を考慮すると）、given ～（～を考えると）、provided that ～（～という条件で）。\n**with＋O＋分詞**（付帯状況）：with his arms folded（腕を組んで）、with the engine running（エンジンをかけたまま）。",
      ex: [
        ["Weather permitting, the event will be held outdoors.", "天気がよければ、行事は屋外で行われる。", "独立分詞構文"],
        ["Judging from his accent, he is from Australia.", "なまりから判断すると、彼はオーストラリア出身だ。", ""],
        ["He listened to the speech with his eyes closed.", "彼は目を閉じて演説を聞いた。", "with＋O＋過去分詞"]
      ] }
  ],
  trap: ["分詞の意味上の主語は主節の主語と一致させる（× Walking in the park, a dog bit me.＝犬が歩いていたことになる）。", "with＋O＋分詞 は、O が「する」なら ～ing、「される」なら過去分詞。", "完了の分詞構文は Having＋過去分詞。"],
  toeic: "Part 5 で「分詞構文の ～ing か過去分詞か」、Part 7 で文頭の分詞構文の意味の読み取りが出ます。主節の主語が「する側」か「される側」かで判断します。",
  qs: [
    { q: "___ in 1920, the hotel is one of the oldest in the city.", o: ["Built", "Building", "To build", "Having built"], a: 0, ja: "1920年に建てられたそのホテルは、市内で最も古いものの1つだ。", ex: "ホテルは「建てられた」側なので受動の分詞構文 (Being) Built。" },
    { q: "___ the report, the manager approved the budget.", o: ["Having reviewed", "Reviewed", "Being reviewed", "To have reviewed"], a: 0, ja: "報告書に目を通したあと、部長は予算を承認した。", ex: "部長が報告書を「見直した」（する側）、しかも承認より前なので Having＋過去分詞。" },
    { q: "___ what to say, he remained silent.", o: ["Not knowing", "Knowing not", "Not known", "Having not known"], a: 0, ja: "何と言えばいいかわからず、彼は黙っていた。", ex: "否定の分詞構文は Not を分詞の前に置きます。" },
    { q: "She was talking on the phone with the TV ___.", o: ["on", "turning", "turned", "turn"], a: 0, ja: "彼女はテレビをつけたまま電話で話していた。", ex: "with＋O＋副詞も付帯状況になります（with the TV on）。turned だけでは意味が決まりません（turned on なら可）。", lv: "A" },
    { q: "___ from the latest data, the economy is slowing down.", o: ["Judging", "Judged", "To judge", "Judge"], a: 0, ja: "最新のデータから判断すると、経済は減速している。", ex: "Judging from ～（～から判断すると）は慣用的な分詞構文です。" }
  ]
},
{
  id: "g11", cat: "関係詞", lv: "HS", title: "関係代名詞",
  lead: "関係代名詞は、名詞に「説明の文」を後ろからつなぐ接着剤です。長文読解の鍵になります。",
  sec: [
    { h: "格による使い分け",
      t: "**主格**：who（人）／which（物）／that（両方）＋動詞。\n**所有格**：whose＋名詞（人にも物にも）。\n**目的格**：whom / who（人）／which（物）／that＋主語＋動詞。目的格は**省略できます**。",
      ex: [
        ["The analyst who wrote the report is from London.", "その報告書を書いたアナリストはロンドン出身だ。", "主格"],
        ["The company whose shares fell sharply issued a statement.", "株価が急落した会社が声明を出した。", "所有格"],
        ["The book (that) I bought yesterday is very useful.", "昨日買った本はとても役に立つ。", "目的格は省略可"]
      ] },
    { h: "前置詞＋関係代名詞",
      t: "関係詞節の中の前置詞は、関係代名詞の前に出すことができます。そのときは **whom / which** を使い、that や who は使えません。\nthe house in which he lives ＝ the house which he lives in ＝ the house where he lives。",
      ex: [
        ["This is the office in which I work.", "ここが私の働いている事務所だ。", "× in that"],
        ["The person to whom I spoke was very helpful.", "私が話した人はとても親切だった。", ""]
      ] },
    { h: "非制限用法と what",
      t: "**カンマ＋who / which**は補足説明（非制限用法）。that は使えません。**, which** は前の文全体を指すこともあります。\n**what** は先行詞を含み「～すること・もの」（＝the thing(s) which）。前に名詞を置きません。\n**that が好まれる場合**：先行詞に all, every, the only, the same, 最上級, 序数 がつくとき。",
      ex: [
        ["He passed the exam, which surprised everyone.", "彼は試験に合格し、そのことは皆を驚かせた。", "前文全体"],
        ["What matters most is the result.", "最も大切なのは結果だ。", "what＝～すること"],
        ["This is the best film that I have ever seen.", "これは今まで見た中で最高の映画だ。", "最上級＋that"]
      ] },
    { h: "連鎖関係詞節",
      t: "関係詞のすぐ後に I think / we believe などが挟まる形。挟まった部分を外すと構造が見えます。the person **who** (I think) **is** best for the job。",
      ex: [
        ["She is the candidate who I believe is most qualified.", "彼女が最も適任だと私が思う候補者だ。", "who is の間に I believe"]
      ] }
  ],
  trap: ["カンマの後に that は使えない。", "前置詞の直後に that / who は使えない（in which, to whom）。", "what の前に先行詞を置かない（× the thing what）。"],
  toeic: "Part 5 の定番。空所の後が「動詞」なら主格、「名詞＋動詞」の前に所有の意味なら whose、「主語＋動詞で目的語が欠けている」なら目的格、先行詞がなければ what、と構造で判断します。",
  qs: [
    { q: "The employee ___ proposal was selected will receive a bonus.", o: ["whose", "who", "which", "whom"], a: 0, ja: "提案が選ばれた社員はボーナスを受け取る。", ex: "空所の直後が名詞 proposal で「その社員の提案」なので whose。" },
    { q: "___ the customers want is faster delivery.", o: ["What", "That", "Which", "It"], a: 0, ja: "顧客が求めているのは、より早い配送だ。", ex: "先行詞がなく「～するもの」を表すので what。What the customers want が主語になります。" },
    { q: "This is the city in ___ the company was founded.", o: ["which", "that", "where", "whom"], a: 0, ja: "ここがその会社が設立された都市だ。", ex: "前置詞 in の直後なので which。where は関係副詞なので in の後には置けません。" },
    { q: "The new model, ___ was released last month, has sold well.", o: ["which", "that", "what", "whose"], a: 0, ja: "先月発売された新モデルはよく売れている。", ex: "カンマの後（非制限用法）なので that は使えず which。" },
    { q: "Ms. Lee is the person ___ I think will be the next director.", o: ["who", "whom", "whose", "which"], a: 0, ja: "リーさんが次の部長になると私が思う人だ。", ex: "I think を外すと the person ___ will be ～。will be の主語が必要なので主格 who。whom にしてしまうのが典型的な誤り。", lv: "A" }
  ]
},
{
  id: "g12", cat: "関係詞", lv: "HS", title: "関係副詞と複合関係詞",
  lead: "場所・時・理由・方法を説明する関係副詞と、「～なら何でも」「たとえ～でも」を表す複合関係詞です。",
  sec: [
    { h: "関係副詞 where / when / why / how",
      t: "関係副詞のあとには**要素がそろった完全な文**が続きます（関係代名詞のあとは要素が欠けた文）。\nwhere（場所）、when（時）、why（理由：the reason why）、how（方法）。**the way how とは言いません**。the way か how のどちらか一方だけを使います。",
      ex: [
        ["This is the museum where the painting is displayed.", "ここがその絵が展示されている美術館だ。", "完全な文"],
        ["I remember the day when we first met.", "初めて会った日を覚えている。", ""],
        ["That is the reason why he quit.", "それが彼が辞めた理由だ。", ""],
        ["This is how the system works.", "これがそのシステムの仕組みだ。", "× the way how"]
      ] },
    { h: "関係副詞か関係代名詞か",
      t: "先行詞が場所でも、後ろの文に**目的語が欠けていれば関係代名詞 which**です。\nThis is the museum which I visited last year.（visited の目的語が欠けている）\nThis is the museum where I saw the painting.（完全な文）",
      ex: [
        ["This is the town which I visited last year.", "ここは私が昨年訪れた町だ。", "visited の目的語が欠けている"],
        ["This is the town where I grew up.", "ここは私が育った町だ。", "完全な文"]
      ] },
    { h: "複合関係詞",
      t: "**whoever**：～する人は誰でも／誰が～しても。**whatever**：～するものは何でも／何が～しても。**whichever**：どちらでも。\n**however＋形容詞・副詞＋S＋V**：どんなに～しても。**whenever**：～するときはいつでも。**wherever**：どこへ～しても。\n譲歩の意味では no matter who / what / how に言い換えられます。",
      ex: [
        ["Whoever wins the award will receive a prize.", "その賞を取った人は誰でも賞金を受け取る。", ""],
        ["However hard he tried, he could not solve the problem.", "どんなに頑張っても、彼はその問題を解けなかった。", "however＋副詞＋S＋V"],
        ["You can choose whatever you like.", "好きなものを何でも選んでよい。", ""]
      ] }
  ],
  trap: ["the way how は誤り。", "however の直後に形容詞・副詞を置く（× However he tried hard）。", "先行詞が場所でも、目的語が欠けていれば which。"],
  toeic: "「where か which か」「whoever か whomever か（節の中での役割で決まる）」「however＋形容詞」が出題されます。",
  qs: [
    { q: "This is the restaurant ___ we held our first meeting.", o: ["where", "which", "what", "whose"], a: 0, ja: "ここは私たちが最初の会議を開いたレストランだ。", ex: "we held our first meeting は完全な文なので関係副詞 where。" },
    { q: "This is the town ___ I visited during my business trip.", o: ["which", "where", "when", "whose"], a: 0, ja: "ここは私が出張中に訪れた町だ。", ex: "visited の目的語が欠けているので関係代名詞 which。先行詞が場所でも where にはなりません。" },
    { q: "___ difficult the task may be, we must finish it by Friday.", o: ["However", "Whatever", "Whenever", "Although"], a: 0, ja: "その仕事がどんなに難しくても、金曜日までに終えなければならない。", ex: "However＋形容詞＋S＋V（どんなに～でも）。Although の後に形容詞を直接置く語順はありません。" },
    { q: "The prize will be given to ___ submits the best design.", o: ["whoever", "whomever", "whatever", "who"], a: 0, ja: "賞は最も優れたデザインを出した人に贈られる。", ex: "前置詞 to の後でも、節の中で submits の主語になるので主格の whoever。", lv: "A" },
    { q: "Nobody knows the reason ___ the project was canceled.", o: ["why", "which", "what", "how"], a: 0, ja: "その計画が中止された理由は誰も知らない。", ex: "the reason why＋完全な文。" }
  ]
},
{
  id: "g13", cat: "文のつながり", lv: "HS", title: "接続詞（と前置詞との区別）",
  lead: "接続詞は文と文を、前置詞は名詞を結びます。TOEIC の「前置詞か接続詞か」はここで一気に解けるようになります。",
  sec: [
    { h: "相関接続詞",
      t: "both A and B（AもBも）、either A or B（AかBか）、neither A nor B（AもBも～ない）、not only A but (also) B（AだけでなくBも）、not A but B（AではなくB）、whether A or B（AであろうとBであろうと）。\nA と B は同じ品詞・形にそろえます（並列）。",
      ex: [
        ["The course is both practical and affordable.", "その講座は実践的で、しかも手ごろだ。", ""],
        ["You can pay either by card or in cash.", "カードか現金のどちらかで払えます。", ""],
        ["Not only did sales rise, but profits also improved.", "売上が伸びただけでなく、利益も改善した。", "Not only が文頭なら倒置"]
      ] },
    { h: "意味で覚える従属接続詞",
      t: "because / since / as（理由）、although / though / even though（譲歩）、while（～する間／～の一方で）、whereas（～であるのに対して）、unless（～しない限り）、as long as（～する限り）、in case（～するといけないので）、once（いったん～すると）、now that（今や～なので）、so that S can（Sが～できるように）、so ～ that（とても～なので）、such (a) 形容詞＋名詞 that。",
      ex: [
        ["Take an umbrella in case it rains.", "雨が降るといけないので傘を持っていきなさい。", ""],
        ["Once you sign the contract, you cannot cancel it.", "いったん契約に署名すると、取り消せない。", ""],
        ["Now that the project is finished, we can relax.", "計画が終わったので、ようやくくつろげる。", ""],
        ["She spoke slowly so that everyone could understand.", "皆が理解できるよう、彼女はゆっくり話した。", "目的"]
      ] },
    { h: "前置詞と接続詞の区別",
      t: "後ろが**名詞（句）**なら前置詞、**S＋V**なら接続詞です。\ndespite / in spite of（前）⇔ although（接）\nbecause of / due to / owing to（前）⇔ because（接）\nduring（前）⇔ while（接）\nwithout（前）⇔ unless（接）",
      ex: [
        ["Despite the rain, the event was a success.", "雨にもかかわらず、行事は成功した。", "前置詞＋名詞"],
        ["Although it rained, the event was a success.", "雨が降ったけれども、行事は成功した。", "接続詞＋S＋V"],
        ["The flight was delayed due to heavy snow.", "大雪のため便が遅れた。", ""]
      ] },
    { h: "名詞節の that / whether / if と同格の that",
      t: "that 節は「～ということ」。whether / if は「～かどうか」（主語の位置や前置詞の後では whether のみ）。\n**同格の that**：the fact that ～（～という事実）、the news that、the idea that、the possibility that。",
      ex: [
        ["Whether the plan will succeed is still unclear.", "計画が成功するかどうかはまだ不明だ。", "主語は whether"],
        ["The fact that prices rose surprised no one.", "価格が上がったという事実は誰も驚かせなかった。", "同格"]
      ] }
  ],
  trap: ["despite の後に S＋V を置かない（× despite it rained）。", "during の後に S＋V を置かない（× during we were ～）。", "主語になる「～かどうか」は whether（× If he will come is unclear）。"],
  toeic: "Part 5 で最も得点差がつく分野の1つです。空所の後ろが名詞だけか、主語と動詞がそろった文かを最初に見るだけで、選択肢が2つに絞れます。",
  qs: [
    { q: "___ the heavy traffic, the delivery arrived on time.", o: ["Despite", "Although", "Because", "While"], a: 0, ja: "ひどい渋滞にもかかわらず、配達は時間どおりに届いた。", ex: "後ろが名詞句（the heavy traffic）なので前置詞 Despite。" },
    { q: "Please do not use your phone ___ the presentation.", o: ["during", "while", "when", "as"], a: 0, ja: "発表の間は電話を使わないでください。", ex: "後ろが名詞（the presentation）なので前置詞 during。while は接続詞。" },
    { q: "The shop will stay open ___ there are customers inside.", o: ["as long as", "in spite of", "because of", "due to"], a: 0, ja: "店内に客がいる限り、店は開いている。", ex: "後ろに S＋V（there are customers）があるので接続詞。意味から as long as（～する限り）。" },
    { q: "The manager asked ___ the report had been sent.", o: ["whether", "that", "what", "which"], a: 0, ja: "部長は報告書が送られたかどうか尋ねた。", ex: "ask の目的語になる「～かどうか」は whether（if でも可）。" },
    { q: "___ you have finished the training, you can start working independently.", o: ["Now that", "In case", "Unless", "Despite"], a: 0, ja: "研修を終えたのだから、もう1人で仕事を始められる。", ex: "now that（今や～なので）。意味と、後ろが S＋V であることから判断します。" }
  ]
},
{
  id: "g14", cat: "文のつながり", lv: "HS", title: "前置詞と群前置詞",
  lead: "前置詞は「イメージ」で覚えると応用が効きます。TOEICでは時間・期限・群前置詞が特に頻出です。",
  sec: [
    { h: "時の前置詞",
      t: "at＋時刻・一点（at 9 a.m., at noon）、on＋日付・曜日（on Monday, on May 1）、in＋月・年・季節・期間（in May, in 2026）。\n**by**：～までに（期限）⇔ **until / till**：～までずっと（継続）。\n**for**：期間の長さ（for three years）⇔ **during**：特定の期間の間に（during the meeting）。**since**：～以来。**within**：～以内に。**in**：（今から）～後に（in two weeks）。",
      ex: [
        ["Please submit the report by Friday.", "金曜日までに報告書を出してください。", "期限"],
        ["The store is open until 9 p.m.", "店は午後9時まで開いている。", "継続"],
        ["The results will be announced within a week.", "結果は1週間以内に発表される。", ""]
      ] },
    { h: "場所・手段などの前置詞",
      t: "at（地点）、in（空間の中）、on（接触）。by＋手段（by train, by email）、by＋差（by 10%）、with＋道具（with a pen）。\n**by** は「差」を表す点が金融・ビジネスで頻出：Sales increased by 15%.（15%増えた）／increased to 15%（15%になった）。",
      ex: [
        ["Profits rose by 8% last year.", "昨年、利益は8%増えた。", "by＝差"],
        ["The rate was raised to 0.5%.", "金利は0.5%に引き上げられた。", "to＝到達点"]
      ] },
    { h: "群前置詞（TOEIC頻出）",
      t: "according to（～によると）、due to / owing to / because of（～のために）、in spite of（～にもかかわらず）、in addition to（～に加えて）、instead of（～の代わりに）、on behalf of（～を代表して）、in terms of（～の点で）、prior to（～より前に）、regardless of（～にかかわらず）、with regard to / regarding（～に関して）、in charge of（～を担当して）、in accordance with（～に従って）、as of（～現在・～付で）。",
      ex: [
        ["Prior to the meeting, please read the agenda.", "会議の前に議題に目を通してください。", ""],
        ["I am writing on behalf of the committee.", "委員会を代表してご連絡しています。", ""],
        ["Regardless of age, anyone can apply.", "年齢にかかわらず、誰でも応募できる。", ""]
      ] }
  ],
  trap: ["「金曜日までに（期限）」は by Friday、「金曜日までずっと」は until Friday。", "「3年間」は for three years（× during three years）。", "増減の「差」は by、「到達点」は to。"],
  toeic: "Part 5 で毎回のように出ます。by / until、for / during、prior to、in accordance with、on behalf of は特に要注意です。",
  qs: [
    { q: "All applications must be received ___ March 31.", o: ["by", "until", "since", "during"], a: 0, ja: "すべての申込書は3月31日までに届かなければならない。", ex: "締め切り（期限）なので by。until は「～までずっと」で継続を表します。" },
    { q: "The office will be closed ___ the holiday period.", o: ["during", "while", "for", "since"], a: 0, ja: "休暇期間中、事務所は閉まる。", ex: "the holiday period という特定の期間の間なので during。" },
    { q: "The company's revenue increased ___ 12% compared with last year.", o: ["by", "for", "at", "with"], a: 0, ja: "その会社の売上は前年比で12%増えた。", ex: "増減の差を表す by。" },
    { q: "___ to the conference, all speakers will meet for a briefing.", o: ["Prior", "Before", "Ahead", "Previous"], a: 0, ja: "会議の前に、講演者全員が説明会に集まる。", ex: "prior to ～（～より前に）。Before なら to は不要、Ahead なら ahead of。" },
    { q: "The rules were changed in ___ with the new law.", o: ["accordance", "according", "accord", "accordingly"], a: 0, ja: "規則は新しい法律に従って変更された。", ex: "in accordance with ～（～に従って）という群前置詞。according to との混同に注意。" }
  ]
},
{
  id: "g15", cat: "名詞まわり", lv: "HS", title: "冠詞（a / an / the / 無冠詞）",
  lead: "冠詞は「聞き手がどれか特定できるか」で決まります。日本語にない仕組みなので、判断の手順を決めておくのが近道です。",
  sec: [
    { h: "a / an：どれか1つ",
      t: "数えられる名詞の単数で、聞き手がまだ特定できないもの。**a / an は綴りではなく発音で決まります**：an hour（h を読まない）、an MBA（エム）、a university（ユー）、a European（ユー）、an honest person。",
      ex: [
        ["She has an MBA from a university in Boston.", "彼女はボストンの大学のMBAを持っている。", "発音で選ぶ"],
        ["The meeting lasted an hour.", "会議は1時間続いた。", ""]
      ] },
    { h: "the：どれか特定できる",
      t: "前に出たもの、状況から1つに決まるもの（the sun, the government）、最上級・序数（the best, the first）、only / same / next（文脈で決まる場合）、**the＋形容詞＝～な人々**（the rich, the elderly）、楽器（play the piano）、川・海・山脈・複数形の国名（the Pacific, the Alps, the United States, the Netherlands）。",
      ex: [
        ["This is the first time I have visited Japan.", "日本を訪れるのはこれが初めてだ。", "序数"],
        ["The government plans to support the elderly.", "政府は高齢者を支援する計画だ。", "the＋形容詞＝人々"]
      ] },
    { h: "無冠詞",
      t: "不可算名詞・複数形で「一般論」を言うとき（Water is essential. / Investors dislike uncertainty.）。\n手段 by＋乗り物（by train, by email）、食事（have lunch）、本来の目的の場所（go to school, go to bed, be in hospital（英））、スポーツ・学科名、固有名詞の多く（Mt. Fuji, Tokyo Station, Lake Biwa）。",
      ex: [
        ["Investors dislike uncertainty.", "投資家は不確実さを嫌う。", "一般論：複数形・不可算"],
        ["We will send the details by email.", "詳細はメールでお送りします。", "by＋手段は無冠詞"]
      ] },
    { h: "総称の3つの言い方",
      t: "「犬というものは」＝ **Dogs** are loyal.（最も普通）／ **A dog** is loyal.（どの1匹をとっても）／ **The dog** is loyal.（種全体・やや硬い）。",
      ex: [
        ["Smartphones have changed the way we live.", "スマートフォンは私たちの生活を変えた。", "複数形で総称"]
      ] }
  ],
  trap: ["an hour / an honest / a university / a European：綴りではなく最初の音。", "by bus / by email に冠詞をつけない（ただし in a taxi, on the train）。", "information / advice / equipment に a をつけない（不可算）。"],
  toeic: "直接の出題は多くありませんが、Part 5 の品詞問題で「空所の前に a があるので単数の可算名詞」「冠詞がないので不可算名詞か複数形」と判断の手がかりになります。",
  qs: [
    { q: "The CEO gave ___ honest answer to the question.", o: ["an", "a", "the", "（冠詞なし）"], a: 0, ja: "CEOはその質問に正直に答えた。", ex: "honest は h を読まず母音で始まるので an。" },
    { q: "She was accepted to ___ university in Canada.", o: ["a", "an", "the", "（冠詞なし）"], a: 0, ja: "彼女はカナダの大学に合格した。", ex: "university は /juː/（子音）で始まるので a。" },
    { q: "The government is introducing new measures to help ___ unemployed.", o: ["the", "a", "an", "（冠詞なし）"], a: 0, ja: "政府は失業者を支援する新しい対策を導入している。", ex: "the＋形容詞で「～な人々」。" },
    { q: "Please send the signed contract by ___ email.", o: ["（冠詞なし）", "an", "the", "a"], a: 0, ja: "署名した契約書はメールでお送りください。", ex: "by＋通信・交通手段は無冠詞。" },
    { q: "We need more ___ before we make a decision.", o: ["information", "an information", "informations", "a information"], a: 0, ja: "決定する前に、もっと情報が必要だ。", ex: "information は不可算名詞なので a も複数形の -s もつきません。" }
  ]
},
{
  id: "g16", cat: "名詞まわり", lv: "HS", title: "名詞と数量表現（可算・不可算）",
  lead: "「数えられるかどうか」で、使える冠詞・数量詞・動詞の形が決まります。",
  sec: [
    { h: "不可算名詞の代表",
      t: "information, advice, equipment, furniture, baggage / luggage, news, evidence, feedback, research, machinery, merchandise, traffic, homework, knowledge, progress, access など。\n数えるときは a piece of advice, two pieces of equipment のように表します。",
      ex: [
        ["He gave me some useful advice.", "彼は役立つ助言をくれた。", "× an advice / advices"],
        ["All the equipment has been checked.", "すべての機器が点検済みだ。", "単数扱い"]
      ] },
    { h: "数量詞の使い分け",
      t: "**可算**：many, few（ほとんどない）, a few（少しある）, a number of（多くの）。\n**不可算**：much, little（ほとんどない）, a little（少しある）, an amount of。\n**両方**：a lot of, some, any, plenty of, most。\n**a number of＋複数名詞＋複数動詞**（多くの～）／**the number of＋複数名詞＋単数動詞**（～の数）。",
      ex: [
        ["A number of employees have applied.", "多くの従業員が応募した。", "複数扱い"],
        ["The number of visitors has increased.", "来場者の数が増えた。", "単数扱い"],
        ["There is little time left.", "残り時間はほとんどない。", "不可算＋little"]
      ] },
    { h: "each / every / 集合名詞 / 数詞の形容詞化",
      t: "each / every＋**単数名詞＋単数動詞**。each of the＋複数名詞 も単数扱い。\npeople, police, cattle は常に複数扱い。staff, team, family は「まとまり」なら単数、「メンバー」なら複数扱い（米では単数が多い）。\n**数詞＋名詞で形容詞**にするときは単数形：a five-year plan（× five-years）、a ten-minute break。",
      ex: [
        ["Each employee has a locker.", "各従業員にロッカーがある。", ""],
        ["The police are investigating the case.", "警察がその事件を捜査している。", "複数扱い"],
        ["We took a ten-minute break.", "10分間の休憩をとった。", "× ten-minutes"]
      ] }
  ],
  trap: ["information / advice / equipment / furniture / news に -s をつけない。", "a number of（多くの）と the number of（～の数）で動詞の形が違う。", "a five-year plan の year は単数。"],
  toeic: "「a number of と the number of」「each＋単数名詞」「不可算名詞に an / many をつけない」は Part 5 の頻出ポイントです。",
  qs: [
    { q: "The number of online orders ___ risen sharply this year.", o: ["has", "have", "are", "were"], a: 0, ja: "今年、オンライン注文の数が急増した。", ex: "the number of（～の数）は単数扱いなので has。" },
    { q: "A number of customers ___ complained about the delay.", o: ["have", "has", "is", "was"], a: 0, ja: "多くの顧客が遅れについて苦情を言った。", ex: "a number of（多くの）＋複数名詞 は複数扱い。" },
    { q: "The technician checked ___ piece of equipment carefully.", o: ["each", "all", "many", "both"], a: 0, ja: "技術者はそれぞれの機器を注意深く点検した。", ex: "piece は単数なので each。all / many / both の後は複数形（または不可算名詞）が来ます。" },
    { q: "We received very ___ feedback on the first draft.", o: ["little", "few", "many", "a few"], a: 0, ja: "最初の原稿にはほとんど意見が来なかった。", ex: "feedback は不可算名詞なので little（ほとんどない）。few / many / a few は可算名詞用。" },
    { q: "The company announced a ___ plan to cut emissions.", o: ["five-year", "five-years", "five years", "five year's"], a: 0, ja: "その会社は排出削減の5か年計画を発表した。", ex: "数詞＋名詞をハイフンでつないで形容詞にするときは単数形。" }
  ]
}
);
