/* 長文読解 第2弾（書き下ろし） p21〜p25
   ev: [段落番号, 根拠となる本文中の文字列（完全一致）] */
window.EIGO = window.EIGO || {};
EIGO.PASSAGES.push(
{
  id: "p21", lv: "B", tp: "science",
  title: "Why Cities Are Getting Hotter",
  jt: "都市はなぜ暑くなっているのか",
  body: [
    "On a summer afternoon, the center of a large city can be several degrees hotter than the countryside just outside it. Scientists call this the urban heat island effect. It is not caused mainly by global warming, although the two problems make each other worse. Instead, it is a result of how cities are built.",
    "Concrete, asphalt, and dark rooftops absorb sunlight during the day and slowly release the heat at night. Tall buildings trap warm air and block the wind. Air conditioners, cars, and factories add even more heat. Meanwhile, there are fewer trees and fields, which would normally cool the air by releasing water vapor.",
    "The consequences are serious. Heat waves are more dangerous in cities, especially for older people and those who cannot afford air conditioning. Higher temperatures also increase electricity demand, which can strain power grids and raise emissions if the electricity comes from fossil fuels.",
    "Fortunately, cities can fight back. Planting trees along streets, creating parks, and painting roofs white or light gray can lower surface temperatures significantly. Some cities now require green roofs on new buildings. These measures are not expensive compared with the health and energy costs of doing nothing, and they make cities more pleasant places to live."
  ],
  ja: [
    "夏の午後、大都市の中心部は、すぐ外の郊外より数度高くなることがある。科学者はこれをヒートアイランド現象と呼ぶ。主な原因は地球温暖化ではないが、2つの問題は互いを悪化させる。むしろ、都市のつくられ方の結果なのだ。",
    "コンクリートやアスファルト、黒っぽい屋根は、昼間に日光を吸収し、夜にゆっくり熱を放出する。高いビルは暖かい空気を閉じ込め、風をさえぎる。エアコンや車、工場はさらに熱を加える。一方で、本来なら水蒸気を放出して空気を冷やす木々や野原は少ない。",
    "影響は深刻だ。熱波は都市でより危険になり、特に高齢者やエアコンを買う余裕のない人々にとってそうだ。気温の上昇は電力需要も増やし、送電網に負担をかけたり、電力が化石燃料由来であれば排出量を増やしたりしかねない。",
    "幸い、都市は反撃できる。通りに木を植え、公園をつくり、屋根を白や明るい灰色に塗れば、地表の温度を大きく下げられる。新しい建物に屋上緑化を義務づける都市も出てきた。こうした対策は、何もしない場合の健康面・エネルギー面のコストに比べれば高くなく、都市をより快適な住まいにしてくれる。"
  ],
  qs: [
    { q: "According to the passage, what is the main cause of the urban heat island effect?", qj: "本文によると、ヒートアイランド現象の主な原因は何か。",
      o: ["Global warming alone", "The way cities are designed and built", "Heavy rain in summer", "The number of people living in the countryside"], a: 1,
      ex: "第1段落に「主な原因は地球温暖化ではない…都市のつくられ方の結果だ」とあるので2。1の Global warming alone は本文と逆です。", ev: [0, "it is a result of how cities are built"] },
    { q: "Why do trees and fields help keep the air cooler?", qj: "木々や野原が空気を涼しく保つのに役立つのはなぜか。",
      o: ["They release water vapor.", "They reflect the wind.", "They absorb heat and release it at night.", "They reduce the number of cars."], a: 0,
      ex: "第2段落の最終文「水蒸気を放出して空気を冷やす」が根拠で1。3の「熱を吸収して夜に放出する」はコンクリートなどの説明です。", ev: [1, "which would normally cool the air by releasing water vapor"] },
    { q: "What does the author suggest about measures such as planting trees and painting roofs?", qj: "木を植える・屋根を塗るといった対策について、筆者は何を示唆しているか。",
      o: ["They are too expensive for most cities.", "They only work in small towns.", "They cost relatively little compared with doing nothing.", "They increase electricity demand."], a: 2,
      ex: "最終段落「何もしない場合のコストに比べれば高くない」とあるので3。1は本文と逆です。", ev: [3, "These measures are not expensive compared with the health and energy costs of doing nothing"] }
  ]
},
{
  id: "p22", lv: "B", tp: "health",
  title: "Sleep: The Brain's Night Shift",
  jt: "睡眠――脳の夜勤",
  body: [
    "Many students stay up late before an exam, believing that every extra hour of study will help. Research suggests the opposite may be true. Sleep is not simply a time when the brain switches off; it is when the brain does some of its most important work.",
    "During the day, new information is stored only temporarily. While we sleep, the brain replays and strengthens these fresh memories, moving them into more stable, long-term storage. In experiments, people who slept after learning a list of words remembered more of them the next day than people who stayed awake for the same length of time.",
    "Sleep also affects our ability to learn in the first place. After a night without enough rest, attention drops, and the brain has more difficulty taking in new information. Mood suffers too, which can make studying feel harder than it really is.",
    "The practical lesson is simple. Instead of sacrificing sleep, learners should spread their study over several days and protect a regular bedtime. Reviewing material shortly before sleeping may be especially effective. In other words, a good night's rest is not a break from learning; it is part of it."
  ],
  ja: [
    "多くの学生は試験前に夜更かしし、勉強時間が1時間増えるごとに役立つと信じている。研究によれば、実際はその逆かもしれない。睡眠は単に脳のスイッチが切れる時間ではなく、脳が最も重要な仕事の一部を行う時間なのだ。",
    "日中、新しい情報は一時的にしか蓄えられない。眠っている間に、脳はこうした新しい記憶を再生して強化し、より安定した長期的な保存場所へ移す。実験では、単語リストを覚えたあとに眠った人は、同じ時間起きていた人より翌日多くの単語を覚えていた。",
    "睡眠はそもそも学ぶ力にも影響する。十分に休めなかった翌日は注意力が落ち、脳は新しい情報を取り込みにくくなる。気分も落ち込み、勉強が実際以上につらく感じられることがある。",
    "実践的な教訓は単純だ。睡眠を削るのではなく、学習を数日に分散させ、決まった就寝時刻を守るべきだ。寝る少し前に復習するのは特に効果的かもしれない。つまり、ぐっすり眠ることは学習の中断ではなく、学習の一部なのだ。"
  ],
  qs: [
    { q: "What happens to new memories while we sleep, according to the passage?", qj: "本文によると、眠っている間に新しい記憶はどうなるか。",
      o: ["They are deleted to make room for new ones.", "They stay in temporary storage.", "They are replayed and strengthened.", "They become less accurate."], a: 2,
      ex: "第2段落「脳はこうした新しい記憶を再生して強化する」が根拠で3。", ev: [1, "the brain replays and strengthens these fresh memories"] },
    { q: "What did the experiment described in the passage show?", qj: "本文で紹介された実験は何を示したか。",
      o: ["People who slept after learning remembered more words.", "People who stayed awake learned faster.", "Sleep had no effect on memory.", "People remembered more if they studied at night."], a: 0,
      ex: "第2段落「覚えたあと眠った人は、起きていた人より翌日多くの単語を覚えていた」ので1。", ev: [1, "remembered more of them the next day than people who stayed awake"] },
    { q: "Which advice does the author give to learners?", qj: "筆者は学習者にどんな助言をしているか。",
      o: ["Study all night before an exam.", "Avoid reviewing material before bed.", "Take long naps during the day instead of sleeping at night.", "Spread study over several days and keep a regular bedtime."], a: 3,
      ex: "最終段落「学習を数日に分散させ、決まった就寝時刻を守るべきだ」が根拠で4。2は「寝る前の復習は特に効果的かもしれない」と逆です。", ev: [3, "spread their study over several days and protect a regular bedtime"] }
  ]
},
{
  id: "p23", lv: "B", tp: "edu",
  title: "Is It Too Late to Learn a Language?",
  jt: "語学を始めるのに遅すぎることはあるのか",
  body: [
    "It is often said that children learn languages effortlessly while adults struggle. There is some truth in this. People who start learning a language in early childhood are more likely to develop a native-like accent, and they pick up grammar through exposure rather than study.",
    "However, the idea that adults cannot succeed is a myth. In fact, adults often learn faster in the early stages. They can use their knowledge of their first language, understand grammar explanations, and apply effective study strategies. What adults usually lack is not ability but time and consistent exposure.",
    "Motivation also plays a large role. A teenager forced to study for a test may forget most of what they learned once the exam is over. An adult who needs a language for work or wants to connect with people from another culture often keeps going for years.",
    "For adult learners, the best approach is to combine study with real use. Reading articles on topics you enjoy, listening to podcasts, and speaking with others, even imperfectly, help turn knowledge into skill. A perfect accent may be difficult, but clear communication is well within reach at any age."
  ],
  ja: [
    "子どもは苦労せずに言語を覚えるが、大人は苦労するとよく言われる。これには一理ある。幼いころに言語を学び始めた人は、母語話者のような発音を身につけやすく、文法を勉強ではなく触れることで身につける。",
    "しかし、大人は成功できないという考えは誤りだ。実際、学習の初期段階では大人のほうが速く学ぶことが多い。大人は母語の知識を生かし、文法の説明を理解し、効果的な学習法を用いることができる。大人に欠けているのはたいてい能力ではなく、時間と継続的に言語に触れる機会だ。",
    "動機も大きな役割を果たす。試験のために勉強させられている10代の若者は、試験が終われば学んだことの大半を忘れてしまうかもしれない。仕事で言語が必要な大人や、別の文化の人々とつながりたい大人は、何年も続けることが多い。",
    "大人の学習者にとって最善の方法は、勉強と実際の使用を組み合わせることだ。好きな話題の記事を読み、ポッドキャストを聞き、不完全でも人と話すことが、知識を技能に変える助けになる。完璧な発音は難しいかもしれないが、はっきりと意思を伝えることは、何歳でも十分に手の届くところにある。"
  ],
  qs: [
    { q: "What advantage do people who start learning a language in early childhood have?", qj: "幼いころに言語を学び始めた人にはどんな利点があるか。",
      o: ["They never need to study grammar rules.", "They are more likely to develop a native-like accent.", "They always learn faster than adults.", "They are more motivated than adults."], a: 1,
      ex: "第1段落「母語話者のような発音を身につけやすい」ので2。3の always（常に）は第2段落「初期段階では大人のほうが速いことが多い」と矛盾します。", ev: [0, "more likely to develop a native-like accent"] },
    { q: "According to the passage, what do adult learners usually lack?", qj: "本文によると、大人の学習者にたいてい欠けているものは何か。",
      o: ["Intelligence", "Knowledge of grammar", "Study strategies", "Time and regular exposure to the language"], a: 3,
      ex: "第2段落最終文「欠けているのは能力ではなく、時間と継続的に触れる機会」なので4。", ev: [1, "What adults usually lack is not ability but time and consistent exposure"] },
    { q: "What is the author's main message?", qj: "筆者の主張の中心は何か。",
      o: ["Adults can communicate clearly in a new language if they combine study with real use.", "Only children can learn a second language well.", "Accent is the most important part of learning a language.", "Adults should focus only on grammar."], a: 0,
      ex: "最終段落で「勉強と実際の使用を組み合わせる」「はっきり伝えることは何歳でも手の届くところにある」と述べているので1。", ev: [3, "clear communication is well within reach at any age"] }
  ]
},
{
  id: "p24", lv: "B", tp: "society",
  title: "Remote Work: Freedom and Its Costs",
  jt: "リモートワーク――自由とその代償",
  body: [
    "When offices closed during the pandemic, millions of employees discovered that they could do their jobs from home. Years later, many companies still allow remote or hybrid work, in which employees split their time between home and the office.",
    "For workers, the benefits are clear. Without a daily commute, they save time and money, and many say they can concentrate better at home. Parents find it easier to balance work and family responsibilities. Companies, meanwhile, can hire talented people who live far from their offices and may reduce spending on office space.",
    "Yet remote work also has costs. Some managers worry that it weakens team spirit and makes it harder for new employees to learn by watching experienced colleagues. Informal conversations in hallways, which sometimes lead to new ideas, happen less often online. Some workers also report feeling lonely or finding it difficult to separate work from private life.",
    "As a result, many organizations are experimenting with different arrangements. Some ask employees to come in on specific days so that teams can meet in person. Others focus on measuring results rather than hours spent at a desk. The future of work is unlikely to be fully remote or fully office-based, but somewhere in between."
  ],
  ja: [
    "パンデミックの間にオフィスが閉鎖されると、何百万人もの従業員が自宅でも仕事ができることに気づいた。何年もたった今も、多くの企業がリモートワークや、自宅とオフィスで時間を分けるハイブリッド勤務を認めている。",
    "働き手にとって利点は明らかだ。毎日の通勤がないので時間とお金が節約でき、自宅のほうが集中できると言う人も多い。親は仕事と家庭の責任を両立しやすくなる。一方、企業はオフィスから遠くに住む有能な人材を雇え、オフィススペースへの支出を減らせる可能性がある。",
    "しかし、リモートワークにも代償がある。チームの一体感を弱め、新入社員が経験豊富な同僚を見て学ぶのを難しくすると心配する管理職もいる。廊下での雑談は時に新しいアイデアを生むが、オンラインではあまり起こらない。孤独を感じたり、仕事と私生活を切り分けにくかったりすると訴える働き手もいる。",
    "その結果、多くの組織がさまざまな働き方を試している。チームが直接会えるよう、特定の曜日に出社を求める会社もある。机に向かっている時間ではなく成果を測ることに重点を置く会社もある。働き方の未来は、完全なリモートでも完全な出社でもなく、その中間になりそうだ。"
  ],
  qs: [
    { q: "Which is mentioned as a benefit of remote work for companies?", qj: "企業にとってのリモートワークの利点として挙げられているのはどれか。",
      o: ["They can stop paying salaries.", "They can hire people who live far away.", "They no longer need managers.", "Employees work longer hours."], a: 1,
      ex: "第2段落「オフィスから遠くに住む有能な人材を雇える」ので2。", ev: [1, "hire talented people who live far from their offices"] },
    { q: "Why are some managers concerned about remote work?", qj: "リモートワークについて心配している管理職がいるのはなぜか。",
      o: ["It makes it harder for new employees to learn from experienced colleagues.", "It increases the cost of office space.", "It forces parents to work longer.", "It makes commuting more expensive."], a: 0,
      ex: "第3段落「新入社員が経験豊富な同僚を見て学ぶのを難しくする」が根拠で1。", ev: [2, "makes it harder for new employees to learn by watching experienced colleagues"] },
    { q: "What does the author predict about the future of work?", qj: "筆者は働き方の未来についてどう予測しているか。",
      o: ["All work will be done remotely.", "Offices will return to how they were before the pandemic.", "It will probably be a mix of remote and office work.", "Companies will stop measuring results."], a: 2,
      ex: "最終文「完全なリモートでも完全な出社でもなく、その中間」なので3。", ev: [3, "unlikely to be fully remote or fully office-based, but somewhere in between"] }
  ]
},
{
  id: "p25", lv: "B", tp: "stocks",
  title: "Dividends or Growth?",
  jt: "配当か、成長か",
  body: [
    "When a company makes a profit, it faces a basic choice. It can pay part of the money to shareholders as dividends, or it can reinvest the money in the business to grow faster. Investors often prefer one type of company over the other, depending on their goals.",
    "Dividend-paying companies tend to be mature businesses with steady profits, such as utilities or large consumer brands. Their shares may not rise dramatically, but they provide a regular income. Many retirees like them for this reason, because the payments can help cover living expenses.",
    "Growth companies, on the other hand, usually pay little or no dividend. They use their profits to develop new products, enter new markets, or buy other firms. If the strategy succeeds, the share price can rise quickly. If it fails, investors may receive nothing, and the share price can fall sharply.",
    "Neither approach is always better. A young investor saving for decades may accept more risk in exchange for the chance of higher growth, while someone close to retirement may value stability. Many advisers suggest holding a mix of both, so that a portfolio can benefit from growth without depending on it entirely."
  ],
  ja: [
    "会社が利益を上げると、基本的な選択に直面する。お金の一部を配当として株主に払うか、事業に再投資してより速く成長するかだ。投資家は目的に応じて、どちらかのタイプの会社を好むことが多い。",
    "配当を払う会社は、電力会社や大手消費財ブランドのように、利益の安定した成熟企業であることが多い。株価が劇的に上がることはないかもしれないが、定期的な収入をもたらす。多くの退職者がこの理由で好むのは、配当が生活費の足しになるからだ。",
    "一方、成長企業はふつう配当をほとんど、あるいはまったく払わない。利益を新製品の開発や新市場への進出、他社の買収に使う。戦略が成功すれば株価は急上昇しうる。失敗すれば投資家は何も受け取れず、株価が急落することもある。",
    "どちらの方法も常に優れているわけではない。何十年も貯蓄する若い投資家は、高い成長の可能性と引き換えにより多くのリスクを受け入れるかもしれないが、退職間近の人は安定を重視するかもしれない。多くのアドバイザーは両方を組み合わせて持つことを勧める。そうすれば、ポートフォリオは成長の恩恵を受けつつ、成長だけに頼らずに済む。"
  ],
  qs: [
    { q: "Why do many retirees like dividend-paying companies?", qj: "多くの退職者が配当を払う会社を好むのはなぜか。",
      o: ["Their share prices always rise quickly.", "They never lose value.", "They reinvest all their profits.", "The regular payments can help pay for living costs."], a: 3,
      ex: "第2段落「配当が生活費の足しになる」ので4。1・2の always / never は本文にない言い過ぎです。", ev: [1, "the payments can help cover living expenses"] },
    { q: "What happens if a growth company's strategy fails?", qj: "成長企業の戦略が失敗するとどうなるか。",
      o: ["The share price can fall sharply.", "The company must start paying dividends.", "Investors receive a guaranteed income.", "The company becomes a utility."], a: 0,
      ex: "第3段落最終文「失敗すれば…株価が急落することもある」ので1。", ev: [2, "the share price can fall sharply"] },
    { q: "What do many advisers recommend?", qj: "多くのアドバイザーは何を勧めているか。",
      o: ["Buying only growth companies", "Buying only dividend-paying companies", "Holding a mix of both types", "Avoiding the stock market entirely"], a: 2,
      ex: "最終段落「両方を組み合わせて持つことを勧める」ので3。", ev: [3, "holding a mix of both"] }
  ]
}
);
