/* 長文読解（書き下ろし）
   lv: B = 英検2級〜準1級 / A = 英検1級
   ev: [段落番号, 根拠となる本文中の文字列（完全一致）] */
window.EIGO = window.EIGO || {};
EIGO.PASSAGES = [
{
  id: "p01", lv: "B", tp: "stocks",
  title: "Why Index Funds Took Over",
  jt: "インデックスファンドが主役になった理由",
  body: [
    "For most of the twentieth century, investing in the stock market meant picking individual companies or paying a professional to pick them for you. Fund managers promised to beat the market, and investors paid substantial fees in return. Yet study after study found that the majority of actively managed funds failed to outperform a simple market index over long periods, especially once their fees were taken into account.",
    "An index fund takes a different approach. Instead of trying to identify winners, it simply buys every stock in an index, such as the S&P 500, in proportion to its size. Because no expensive research team is required, the costs are remarkably low. Over decades, a difference of even one percentage point in annual fees can add up to a significant share of an investor's final savings, thanks to the power of compounding.",
    "Critics argue that the popularity of passive investing has its own risks. If most money flows into indexes automatically, fewer investors are examining whether individual companies are actually worth their price. Some also worry that a handful of giant fund providers now hold large stakes in almost every major company, which could concentrate voting power in unprecedented ways.",
    "Even so, for ordinary savers the lesson is fairly clear. Rather than chasing last year's best performers, many experts recommend a diversified, low-cost portfolio held patiently over time. It may sound boring, but in investing, boring is often exactly what works."
  ],
  ja: [
    "20世紀の大半を通じて、株式投資といえば個別の企業を選ぶか、専門家にお金を払って選んでもらうことを意味していた。ファンドマネジャーは市場平均に勝つと約束し、投資家はその見返りに多額の手数料を払った。しかし数々の研究によって、アクティブ運用のファンドの大多数は、長期で見ると単純な市場指数を上回れていないことが明らかになった。手数料を差し引けば、なおさらである。",
    "インデックスファンドは別の方法をとる。勝ち組を見つけようとするのではなく、S&P500などの指数に含まれる全銘柄を、その規模に応じた比率で買うだけだ。高価な調査チームが要らないため、コストは際立って低い。数十年単位で見ると、年間の手数料がわずか1パーセントポイント違うだけで、複利の力によって最終的な資産のかなりの部分に相当する差になりうる。",
    "批判する人々は、パッシブ投資の人気そのものにリスクがあると主張する。大半の資金が自動的に指数へ流れ込めば、個々の企業が本当にその株価に見合う価値があるかを吟味する投資家が減ってしまう。また、ひと握りの巨大な運用会社がほぼすべての主要企業の株式を大量に保有するようになり、議決権がかつてない形で集中しかねないと懸念する声もある。",
    "それでも、一般の個人投資家にとっての教訓はかなりはっきりしている。前年に成績のよかったファンドを追いかけるより、分散された低コストのポートフォリオを長期にわたって辛抱強く持ち続けることを、多くの専門家が勧めている。退屈に聞こえるかもしれないが、投資では退屈なやり方こそがうまくいくことが多いのだ。"
  ],
  qs: [
    { q: "According to the passage, why did many investors move away from actively managed funds?", qj: "本文によると、多くの投資家がアクティブ運用のファンドから離れたのはなぜか。",
      o: ["Active funds were banned from buying large companies.", "Most active funds did not beat the market after fees over long periods.", "Index funds guaranteed higher returns every year.", "Professional managers stopped publishing their results."], a: 1,
      ex: "第1段落の最終文「アクティブ運用の大多数は長期で市場指数を上回れなかった（手数料を考慮すればなおさら）」を言い換えた2が正解。3の guaranteed（保証した）は本文にない言い過ぎ。内容一致問題では、本文より強い断定をしている選択肢をまず疑うのが鉄則です。", ev: [0, "the majority of actively managed funds failed to outperform a simple market index over long periods"] },
    { q: "What point does the author make about fees?", qj: "手数料について、筆者はどのような点を指摘しているか。",
      o: ["Small differences in fees can have a large effect over many years.", "Fees matter only for investors with large savings.", "Index funds charge higher fees because they own more stocks.", "Compounding reduces the impact of fees over time."], a: 0,
      ex: "「1ポイントの差でも、複利の力で最終資産のかなりの部分になる」とあるので1が正解。4は逆で、複利は手数料の影響を「大きく」する方向に働きます。", ev: [1, "a difference of even one percentage point in annual fees can add up to a significant share of an investor's final savings"] },
    { q: "Which concern about passive investing is mentioned?", qj: "パッシブ投資についてどのような懸念が述べられているか。",
      o: ["Index funds are too difficult for ordinary savers to understand.", "Voting power could become concentrated among a few large fund providers.", "Passive investors trade too frequently.", "Indexes include only small companies."], a: 1,
      ex: "第3段落の「ひと握りの巨大運用会社が大量の株を持ち、議決権が集中しかねない」が根拠。a handful of（ひと握りの）→ a few、concentrate（集中させる）がそのまま使われています。", ev: [2, "which could concentrate voting power in unprecedented ways"] }
  ]
},
{
  id: "p07", lv: "B", tp: "ai",
  title: "Why Chatbots Make Things Up",
  jt: "チャットボットはなぜ作り話をするのか",
  body: [
    "Large language models, the technology behind today's AI chatbots, can write essays, summarize reports, and answer questions in fluent, confident prose. Yet they sometimes produce statements that are simply false: invented statistics, nonexistent court cases, or quotations that no one ever said. Researchers call these errors hallucinations.",
    "The problem stems from how the models are built. A language model is trained to predict which words are likely to come next, based on patterns in vast amounts of text. It does not look facts up in a database the way a search engine does. When the patterns point toward a plausible-sounding answer, the model may generate it even if it is untrue.",
    "Developers are attacking the problem from several directions. One approach, known as retrieval-augmented generation, allows the model to consult trusted documents before it answers and to cite its sources. Others train models to express uncertainty or to decline to answer when they do not know, rather than guess.",
    "Such techniques have reduced hallucinations considerably, but they have not eliminated them. For now, experts advise users to treat AI output as a helpful first draft rather than a final authority, and to verify any important claim, especially in fields like law, medicine, and finance, where a confident mistake can be costly."
  ],
  ja: [
    "今日のAIチャットボットを支える技術である大規模言語モデルは、流暢で自信に満ちた文章で、小論文を書き、報告書を要約し、質問に答えることができる。しかし、ときにまったくの誤りを口にする。でっち上げの統計、存在しない裁判例、誰も言ったことのない引用などだ。研究者はこうした誤りを「幻覚（ハルシネーション）」と呼ぶ。",
    "この問題は、モデルの作られ方に起因する。言語モデルは、膨大なテキストのパターンをもとに、次に来そうな語を予測するよう訓練されている。検索エンジンのようにデータベースで事実を調べるわけではない。パターンがもっともらしく聞こえる答えを指し示すと、それが事実でなくても、モデルはその答えを生成してしまうことがある。",
    "開発者はこの問題に複数の方向から取り組んでいる。検索拡張生成と呼ばれる手法では、モデルが回答する前に信頼できる文書を参照し、出典を示せるようにする。ほかにも、わからないときは推測する代わりに、不確かさを表明したり回答を控えたりするようモデルを訓練する方法がある。",
    "こうした技術によって幻覚はかなり減ったが、なくなったわけではない。今のところ専門家は、AIの出力を最終的な権威ではなく役に立つ下書きとして扱い、重要な主張は必ず確認するよう利用者に助言している。自信たっぷりの誤りが大きな損失につながりうる法律・医療・金融のような分野では、とりわけそうだ。"
  ],
  qs: [
    { q: "What is a 'hallucination' in the context of AI?", qj: "AIの文脈における「幻覚」とは何か。",
      o: ["A picture that an AI draws by mistake.", "A false statement that a model presents as if it were true.", "A question that a model refuses to answer.", "A delay that occurs when a model is overloaded."], a: 1,
      ex: "第1段落「まったくの誤りを、流暢で自信に満ちた文章で述べる」ことを指すので2。3の「回答を拒否する」は第3段落の対策側の話で、幻覚とは反対の振る舞いです。", ev: [0, "they sometimes produce statements that are simply false"] },
    { q: "Why do hallucinations occur, according to the passage?", qj: "本文によると、幻覚はなぜ起こるのか。",
      o: ["Models are trained on too little text.", "Models copy answers from search engines.", "Models generate likely-sounding text rather than checking facts.", "Users ask questions in the wrong language."], a: 2,
      ex: "「次に来そうな語を予測する」「データベースで事実を調べない」が根拠。plausible-sounding（もっともらしく聞こえる）が選択肢では likely-sounding に言い換えられています。1は vast amounts of text（膨大な量）と矛盾。", ev: [1, "It does not look facts up in a database the way a search engine does"] },
    { q: "What does the author recommend?", qj: "筆者は何を勧めているか。",
      o: ["Avoiding AI tools in all professional work.", "Trusting AI output in law and medicine.", "Checking important information produced by AI.", "Using AI only for writing essays."], a: 2,
      ex: "最終段落 verify any important claim（重要な主張は確認する）の言い換えが3。1の「一切使わない」は言い過ぎで、本文は「下書きとして使う」ことを勧めています。", ev: [3, "verify any important claim"] }
  ]
},
{
  id: "p05", lv: "B", tp: "rates",
  title: "Japan's Exit from Negative Rates",
  jt: "日本のマイナス金利からの出口",
  body: [
    "For years, Japan was the world's most famous laboratory for unconventional monetary policy. In an effort to escape a long period of weak growth and falling prices, the Bank of Japan pushed its short-term interest rate below zero in 2016, effectively charging banks for parking some of their excess funds at the central bank.",
    "The idea was to encourage banks to lend more and to push down borrowing costs throughout the economy. The policy did keep rates extremely low, but it also squeezed the profits of banks and made it harder for savers and pension funds to earn a decent return. Critics argued that its benefits were diminishing while its side effects accumulated.",
    "In March 2024, as wages and prices finally began rising at a more sustained pace, the Bank of Japan ended negative rates, raising interest rates for the first time in seventeen years. It was the last major central bank to abandon the policy. The move was widely expected, and the bank signaled that it would proceed cautiously, so financial markets reacted calmly.",
    "For households, the shift has mixed consequences. Depositors can expect slightly better interest on their savings, but people with variable-rate mortgages, which are extremely common in Japan, may see their monthly payments rise. How far and how fast rates climb will depend on whether inflation settles near the bank's target of two percent."
  ],
  ja: [
    "日本は長年、非伝統的な金融政策の世界で最も有名な実験場だった。成長の弱さと物価下落が長く続く状況から抜け出そうと、日本銀行は2016年に短期金利をゼロ未満に引き下げた。実質的には、銀行が余った資金の一部を中央銀行に預けておくことに対して料金を課したのである。",
    "狙いは、銀行に貸し出しを増やさせ、経済全体の借入コストを押し下げることだった。この政策は実際に金利を極めて低く保ったが、銀行の収益を圧迫し、預金者や年金基金がまともな利回りを得ることも難しくした。批判的な人々は、効果が薄れる一方で副作用が積み重なっていると主張した。",
    "2024年3月、賃金と物価がようやく持続的なペースで上がり始めたことを受けて、日本銀行はマイナス金利を解除し、17年ぶりに利上げを行った。主要な中央銀行としてはこの政策をやめた最後の例だった。この動きは広く予想されており、日銀も慎重に進める姿勢を示したため、金融市場は落ち着いて反応した。",
    "家計にとって、この転換がもたらす影響は一様ではない。預金者は預金金利がわずかに良くなることを期待できるが、日本で非常に一般的な変動金利型の住宅ローンを組んでいる人は、毎月の返済額が上がるかもしれない。金利がどこまで、どれほどの速さで上がるかは、インフレ率が日銀の目標である2%近辺に落ち着くかどうかにかかっている。"
  ],
  qs: [
    { q: "Why did the Bank of Japan introduce negative interest rates?", qj: "日本銀行がマイナス金利を導入したのはなぜか。",
      o: ["To reduce the value of Japanese savings abroad.", "To escape a period of weak growth and falling prices.", "To increase the profits of commercial banks.", "To slow down rapidly rising wages."], a: 1,
      ex: "第1段落 In an effort to escape a long period of weak growth and falling prices が目的を表します。3は第2段落の内容（銀行収益を圧迫した）と正反対です。", ev: [0, "to escape a long period of weak growth and falling prices"] },
    { q: "Which side effect of negative rates is mentioned?", qj: "マイナス金利のどの副作用が述べられているか。",
      o: ["Banks earned less profit and savers found it hard to earn returns.", "House prices fell sharply across Japan.", "The yen became too strong for exporters.", "Pension funds were forced to close."], a: 0,
      ex: "squeezed the profits of banks（銀行の収益を圧迫した）と made it harder for savers ... to earn a decent return の2点を1つにまとめた1が正解。4の「閉鎖に追い込まれた」は本文にありません。", ev: [1, "it also squeezed the profits of banks"] },
    { q: "Who may be negatively affected by rising rates?", qj: "金利上昇で不利益を受けるかもしれないのは誰か。",
      o: ["People who keep money in bank deposits.", "Homeowners whose mortgage rates can change.", "Companies that have no debt.", "Foreign tourists visiting Japan."], a: 1,
      ex: "variable-rate mortgages（変動金利型住宅ローン）の借り手は返済額が上がりうる、とあります。1の預金者はむしろ恩恵を受ける側なので逆です。", ev: [3, "people with variable-rate mortgages"] }
  ]
},
{
  id: "p03", lv: "B", tp: "crypto",
  title: "What Keeps a Stablecoin Stable?",
  jt: "ステーブルコインはなぜ安定しているのか",
  body: [
    "Most cryptocurrencies are famous for their wild price swings. Stablecoins are designed to be the opposite: digital tokens whose value is pegged to a traditional currency, usually the US dollar. In theory, one stablecoin can always be exchanged for one dollar, which makes them useful for trading, for sending money across borders, and for storing value on a blockchain without exposure to volatility.",
    "The most common way to maintain the peg is to hold reserves. For every token issued, the company behind it keeps a dollar, or an equally safe asset such as a short-term government bond, in a bank or custody account. The credibility of such a stablecoin therefore depends on whether those reserves really exist and whether they can be sold quickly when many users want their money back at once.",
    "Other designs have tried to do without full reserves, relying instead on algorithms that adjust supply automatically. The risks of this approach became clear in 2022, when a prominent algorithmic stablecoin lost its peg and collapsed within days, wiping out tens of billions of dollars in value and shaking confidence across the entire crypto market.",
    "Regulators have since moved to impose clearer rules, including requirements for high-quality reserves, regular audits, and the right of holders to redeem their tokens. Supporters say such oversight will allow stablecoins to become a mainstream payment tool, while skeptics warn that a large stablecoin could one day pose the same kind of risk as a bank run."
  ],
  ja: [
    "暗号資産の多くは、価格の激しい変動で知られている。ステーブルコインはその反対になるよう設計されている。つまり、価値が従来の通貨、たいていは米ドルに連動（ペッグ）しているデジタルトークンだ。理論上は1コインを常に1ドルと交換できるため、取引や国境を越えた送金、そして価格変動にさらされずにブロックチェーン上で価値を保管する用途に便利である。",
    "ペッグを維持する最も一般的な方法は、準備資産を持つことだ。トークンを1枚発行するごとに、発行会社は1ドル、あるいは短期国債のように同じくらい安全な資産を、銀行や保管口座に置いておく。したがって、こうしたステーブルコインの信用は、その準備資産が本当に存在するか、そして多くの利用者が一斉に払い戻しを求めたときにすばやく売却できるかどうかにかかっている。",
    "ほかに、準備資産を十分に持たず、代わりに供給量を自動調整するアルゴリズムに頼る設計も試みられてきた。この方式の危うさが明らかになったのは2022年のことだ。著名なアルゴリズム型ステーブルコインがペッグを失って数日のうちに崩壊し、数百億ドルの価値が消え、暗号資産市場全体の信頼が揺らいだ。",
    "その後、規制当局はより明確なルールを課す動きを進めている。質の高い準備資産、定期的な監査、そして保有者がトークンを払い戻す権利などを求めるものだ。支持する人々は、こうした監督によってステーブルコインが主流の決済手段になれると言う。一方で懐疑的な人々は、巨大なステーブルコインがいつか銀行の取り付け騒ぎと同じ種類のリスクをもたらしかねないと警告している。"
  ],
  qs: [
    { q: "What is the main purpose of a stablecoin?", qj: "ステーブルコインの主な目的は何か。",
      o: ["To offer higher returns than other cryptocurrencies.", "To keep a steady value linked to a traditional currency.", "To replace central banks entirely.", "To make blockchain transactions anonymous."], a: 1,
      ex: "whose value is pegged to a traditional currency（価値が従来の通貨に連動している）が定義。peg は「（価格を）固定する・連動させる」。", ev: [0, "whose value is pegged to a traditional currency"] },
    { q: "According to the passage, what determines whether a reserve-backed stablecoin can be trusted?", qj: "本文によると、準備資産型ステーブルコインが信頼できるかどうかを決めるのは何か。",
      o: ["The number of people who use it every day.", "Whether its reserves actually exist and can be quickly turned into cash.", "Whether its price rises over time.", "The speed of the blockchain it runs on."], a: 1,
      ex: "credibility（信用）… depends on whether those reserves really exist and whether they can be sold quickly が根拠。sold quickly → quickly turned into cash の言い換えです。", ev: [1, "whether those reserves really exist and whether they can be sold quickly"] },
    { q: "What happened in 2022?", qj: "2022年に何が起きたか。",
      o: ["Regulators banned all stablecoins.", "A stablecoin that relied on algorithms failed and caused major losses.", "The US dollar lost its peg to gold.", "Stablecoins became a mainstream payment tool."], a: 1,
      ex: "第3段落の内容そのもの。algorithmic（アルゴリズム型）、collapsed（崩壊した）、wiping out tens of billions of dollars（数百億ドルが消えた）。tens of billions は「数百億」で、「数十億」ではない点に注意。", ev: [2, "a prominent algorithmic stablecoin lost its peg and collapsed within days"] }
  ]
},
{
  id: "p13", lv: "B", tp: "film",
  title: "Why Hollywood Loves Sequels",
  jt: "ハリウッドが続編を好む理由",
  body: [
    "Look at the list of the highest-grossing films of any recent year and a pattern quickly emerges: sequels, remakes, and entries in long-running franchises dominate. Original stories still get made, but they increasingly struggle to secure big budgets and wide releases.",
    "From a studio's point of view, the logic is financial. A major film can cost well over one hundred million dollars to produce, and nearly as much again to market. A familiar title reduces the risk because audiences already know the characters and are more likely to buy tickets. Franchises also generate revenue beyond the box office, from toys, games, streaming rights, and theme park attractions.",
    "Yet the strategy has limits. When too many similar films are released, audiences can experience what critics call franchise fatigue, and several expensive sequels have disappointed in recent years. Meanwhile, some of the most talked-about hits have been original films made on modest budgets, proving that fresh ideas can still find a large audience.",
    "For filmmakers, the challenge is to balance the security of the familiar with the excitement of the new. The most successful franchises, many observers note, are the ones that take creative risks within a well-known world."
  ],
  ja: [
    "近年のどの年でも興行収入上位の映画を見れば、ある傾向がすぐに浮かび上がる。続編、リメイク、そして長く続くシリーズの作品が大半を占めているのだ。オリジナル作品も作られてはいるが、大きな予算と大規模な公開を確保するのはますます難しくなっている。",
    "スタジオの視点に立てば、その理屈は金銭的なものだ。大作映画は製作に1億ドルを優に超える費用がかかり、宣伝にもほぼ同額がかかることがある。おなじみのタイトルなら、観客がすでに登場人物を知っていてチケットを買ってくれる可能性が高いので、リスクが減る。さらにシリーズものは、おもちゃ、ゲーム、配信権、テーマパークのアトラクションなど、興行収入以外の収益も生む。",
    "しかし、この戦略には限界もある。似たような映画が多く公開されすぎると、観客は批評家の言う「シリーズ疲れ」を起こしうるし、近年はいくつもの高額な続編が期待外れに終わっている。その一方で、最も話題になったヒット作の中には、控えめな予算で作られたオリジナル作品もあり、新しいアイデアが今でも多くの観客を得られることを証明している。",
    "映画製作者にとっての課題は、なじみのあるものの安心感と、新しいものの興奮とのバランスをとることだ。多くの識者が指摘するように、最も成功しているシリーズとは、よく知られた世界の中で創造的な冒険をするシリーズである。"
  ],
  qs: [
    { q: "Why do studios prefer familiar titles?", qj: "スタジオがおなじみのタイトルを好むのはなぜか。",
      o: ["They are cheaper to produce than original films.", "They lower financial risk because audiences already know them.", "Critics always review them favorably.", "They are required by streaming services."], a: 1,
      ex: "A familiar title reduces the risk because audiences already know the characters が根拠。1の「製作費が安い」とは書かれておらず、むしろ大作は1億ドル超とあります。", ev: [1, "A familiar title reduces the risk"] },
    { q: "What is 'franchise fatigue'?", qj: "「シリーズ疲れ」とは何か。",
      o: ["Actors becoming tired of playing the same role.", "Audiences losing interest after too many similar films.", "Studios running out of money for sequels.", "Theaters refusing to show long films."], a: 1,
      ex: "When too many similar films are released, audiences can experience ... franchise fatigue とあり、観客側の現象です。1の俳優側の疲れではありません。", ev: [2, "When too many similar films are released"] },
    { q: "What does the passage say about original films?", qj: "オリジナル映画について本文は何と言っているか。",
      o: ["They are no longer produced by major studios.", "They always earn more than sequels.", "Some low-budget originals have become major successes.", "They are mostly released on streaming platforms."], a: 2,
      ex: "original films made on modest budgets（控えめな予算のオリジナル作品）が話題のヒットになった、とあるので3。2の always は言い過ぎです。", ev: [2, "original films made on modest budgets"] }
  ]
},
{
  id: "p02", lv: "B", tp: "stocks",
  title: "Keeping Your Head in a Market Sell-Off",
  jt: "相場急落のときこそ冷静に",
  body: [
    "When stock prices plunge, the headlines can be alarming. Television screens turn red, commentators speak of panic, and investors who check their accounts may feel an urgent need to do something. Psychologists call this tendency loss aversion: the pain of losing money is often estimated to feel about twice as strong as the pleasure of gaining the same amount.",
    "Unfortunately, acting on that feeling is often costly. Investors who sell after a steep decline lock in their losses and then face a difficult question: when should they buy back in? Historically, some of the market's best days have come shortly after its worst ones, so those who wait on the sidelines for things to feel safe frequently miss the rebound.",
    "This does not mean that every downturn is a buying opportunity or that prices always recover quickly. Some companies never regain their former value, and entire markets can take decades to return to earlier peaks. Japan's Nikkei average, for example, did not surpass its 1989 peak until 2024. What history does suggest is that decisions should be based on a plan made in calmer times, not on the emotions of the moment.",
    "Practical safeguards include holding enough cash for emergencies, so that you are never forced to sell at a bad time, and rebalancing regularly back to a target mix of assets. Paradoxically, the investors who do best in volatile markets are often the ones who look at their accounts the least."
  ],
  ja: [
    "株価が急落すると、ニュースの見出しは不安をあおるものになりがちだ。テレビ画面は赤く染まり、解説者はパニックを口にし、口座を確認した投資家は何かしなければという切迫感に駆られるかもしれない。心理学者はこの傾向を「損失回避」と呼ぶ。お金を失う苦痛は、同じ額を得る喜びのおよそ2倍強く感じられると推定されることが多い。",
    "残念ながら、その感情に従って行動すると高くつくことが多い。急落のあとに売った投資家は損失を確定させ、そのうえで「いつ買い戻すべきか」という難しい問いに直面する。歴史的に見て、市場で最も値上がりした日のいくつかは、最も値下がりした日の直後に訪れている。そのため、安心できるまで様子見を決め込む人は、反発を逃してしまうことが多いのだ。",
    "だからといって、あらゆる下落が買いの好機だとか、株価は必ずすぐ回復するということではない。以前の価値を二度と取り戻せない企業もあるし、市場全体が以前の高値に戻るまで何十年もかかることもある。たとえば日経平均株価が1989年の最高値を上回ったのは、2024年になってからだった。歴史が示しているのは、判断はその瞬間の感情ではなく、落ち着いているときに立てた計画に基づくべきだということだ。",
    "実践的な備えとしては、悪いタイミングで売らざるを得なくならないよう、緊急時のための現金を十分に持っておくこと、そして定期的にリバランス（目標とする資産配分に戻すこと）を行うことが挙げられる。逆説的だが、値動きの激しい市場で最も成果を上げる投資家は、口座を見る回数が最も少ない人であることが多い。"
  ],
  qs: [
    { q: "What is 'loss aversion' as described in the passage?", qj: "本文で説明されている「損失回避」とは何か。",
      o: ["The habit of avoiding the stock market entirely.", "The tendency to feel losses more strongly than equivalent gains.", "A strategy for reducing investment losses.", "A rule that prevents panic selling."], a: 1,
      ex: "「損失の苦痛は同じ額の利益の喜びの約2倍強く感じられる」という説明を一般化した2が正解。3のように「戦略」ではなく、心理的な「傾向（tendency）」です。", ev: [0, "the pain of losing money is often estimated to feel about twice as strong as the pleasure of gaining the same amount"] },
    { q: "Why can selling after a sharp decline be costly?", qj: "急落のあとに売ることが高くつきうるのはなぜか。",
      o: ["Brokers charge higher fees during a crisis.", "Investors may miss the recovery that sometimes follows soon after.", "Taxes on losses are very high.", "Prices never fall twice in a row."], a: 1,
      ex: "those who wait on the sidelines ... frequently miss the rebound が根拠。on the sidelines は「傍観して・様子見で」という熟語です。", ev: [1, "those who wait on the sidelines for things to feel safe frequently miss the rebound"] },
    { q: "Why does the author mention the Nikkei average?", qj: "筆者が日経平均に触れているのはなぜか。",
      o: ["To show that Japanese stocks are a good investment.", "To show that recovery from a crash can take a very long time.", "To criticize Japanese investors for panic selling.", "To explain how the Nikkei is calculated."], a: 1,
      ex: "直前の「市場全体が以前の高値に戻るまで何十年もかかることがある」の具体例（for example）として挙げられています。例示の目的を問う問題は、例の直前の一般論を見るのが近道です。", ev: [2, "did not surpass its 1989 peak until 2024"] }
  ]
},
{
  id: "p08", lv: "B", tp: "ai",
  title: "From Chatbots to Agents",
  jt: "チャットボットからエージェントへ",
  body: [
    "The first wave of generative AI tools worked like very capable conversation partners: you asked a question, and they replied. A newer generation, often called AI agents, goes a step further. Given a goal, an agent can break it into smaller tasks, use software tools, browse the web, write and run code, and check its own progress, all with limited human supervision.",
    "Businesses see enormous potential. An agent might handle routine customer requests from start to finish, reconcile invoices, or draft and test a new feature for an app. Proponents argue that this could free employees from repetitive work and let them concentrate on judgment, creativity, and relationships.",
    "However, giving software the power to act, not just to talk, raises new concerns. An agent that misunderstands its instructions could delete important files, send emails to the wrong people, or make unauthorized purchases. Security researchers have also shown that malicious text hidden in a web page can sometimes trick an agent into following instructions from an attacker, a technique called prompt injection.",
    "For these reasons, many organizations are adopting a cautious approach: granting agents only the permissions they truly need, keeping logs of every action, and requiring human approval before anything irreversible is carried out. The technology is advancing quickly, but trust, as always, must be earned step by step."
  ],
  ja: [
    "生成AIツールの第一波は、非常に有能な会話の相手のように機能した。質問をすれば、答えが返ってくる。AIエージェントと呼ばれることの多い新しい世代は、さらに一歩進んでいる。目標を与えられると、エージェントはそれを小さな作業に分解し、ソフトウェアツールを使い、ウェブを閲覧し、コードを書いて実行し、自分の進み具合を確認することができる。しかも、人間による監督は限られたままでだ。",
    "企業はそこに大きな可能性を見ている。エージェントは、定型的な顧客からの依頼を最初から最後まで処理したり、請求書の照合をしたり、アプリの新機能の下書きとテストをしたりするかもしれない。推進する人々は、これによって従業員が反復的な作業から解放され、判断や創造性、人間関係に集中できるようになると主張する。",
    "しかし、ソフトウェアに話すだけでなく行動する力を与えることは、新たな懸念を生む。指示を誤解したエージェントは、重要なファイルを削除したり、間違った相手にメールを送ったり、許可のない購入をしたりしかねない。また、セキュリティ研究者は、ウェブページに隠された悪意ある文章が、ときにエージェントをだまして攻撃者の指示に従わせうることを示している。これはプロンプトインジェクションと呼ばれる手口だ。",
    "こうした理由から、多くの組織は慎重な方針をとっている。エージェントには本当に必要な権限だけを与え、すべての操作の記録を残し、取り返しのつかないことを実行する前には人間の承認を求める、というものだ。技術は急速に進歩しているが、信頼というものは、いつの時代も一歩ずつ築いていくしかない。"
  ],
  qs: [
    { q: "How do AI agents differ from earlier chatbots?", qj: "AIエージェントは以前のチャットボットとどう違うか。",
      o: ["They can only answer simple questions.", "They can plan and carry out multi-step tasks using tools.", "They require constant human supervision.", "They cannot access the internet."], a: 1,
      ex: "break it into smaller tasks, use software tools, browse the web ... が根拠。3は with limited human supervision（限られた監督で）と逆です。", ev: [0, "an agent can break it into smaller tasks, use software tools"] },
    { q: "What is 'prompt injection'?", qj: "「プロンプトインジェクション」とは何か。",
      o: ["A way of making agents work faster.", "A method of tricking an agent with hidden instructions in content it reads.", "A tool that checks an agent's progress.", "A system for approving purchases."], a: 1,
      ex: "malicious text hidden in a web page can ... trick an agent into following instructions from an attacker が定義。trick A into doing は「Aをだまして～させる」。", ev: [2, "malicious text hidden in a web page can sometimes trick an agent"] },
    { q: "Which safeguard is mentioned in the passage?", qj: "本文で挙げられている安全策はどれか。",
      o: ["Giving agents access to all company systems.", "Deleting logs to protect privacy.", "Requiring a person to approve actions that cannot be undone.", "Using agents only on weekends."], a: 2,
      ex: "requiring human approval before anything irreversible is carried out。irreversible（元に戻せない）→ cannot be undone の言い換え。1は only the permissions they truly need と逆です。", ev: [3, "requiring human approval before anything irreversible is carried out"] }
  ]
},
{
  id: "p11", lv: "B", tp: "art",
  title: "Art as an Investment",
  jt: "投資対象としてのアート",
  body: [
    "Fine art has long been a playground for the very rich. A single painting by a famous artist can sell at auction for tens of millions of dollars, and wealthy collectors have often treated their collections as a store of value, alongside real estate and gold.",
    "In recent years, new platforms have tried to open this market to ordinary investors through fractional ownership. A company buys a well-known work, divides ownership into thousands of shares, and sells them online, sometimes for as little as a few hundred dollars each. When the artwork is eventually sold, shareholders receive a portion of any profit.",
    "The idea is appealing, but art has unusual characteristics as an asset. It pays no dividends or interest, so returns depend entirely on the price rising. Buying and selling involves high costs, including auction fees, insurance, and storage. Above all, the art market is illiquid: a painting may take months or years to sell, and its value is ultimately determined by the tastes of a small group of buyers.",
    "Financial advisers therefore suggest that art should, at most, make up a small part of a diversified portfolio. The best reason to buy art, many collectors say, is still the simplest one: because you love looking at it."
  ],
  ja: [
    "美術品は長いあいだ、ごく一部の富裕層の遊び場だった。有名な画家の絵1枚がオークションで数千万ドルで売れることもあり、裕福な収集家はしばしば自分のコレクションを、不動産や金と並ぶ価値の保存手段として扱ってきた。",
    "近年、新しいプラットフォームが、共同所有（小口化）という仕組みでこの市場を一般の投資家に開こうとしている。企業が有名な作品を購入し、所有権を何千もの口に分け、それをオンラインで販売する。1口わずか数百ドルのこともある。最終的にその作品が売却されると、口数の保有者は利益の一部を受け取る。",
    "魅力的な考えだが、アートは資産として変わった特徴を持つ。配当も利息も生まないため、収益は価格の上昇だけに頼ることになる。売買にはオークション手数料や保険、保管料といった高いコストがかかる。そして何より、アート市場は流動性が低い。絵画は売れるまでに何か月も何年もかかることがあり、その価値は結局のところ、少数の買い手の好みによって決まるのだ。",
    "そのため、ファイナンシャルアドバイザーは、アートは分散されたポートフォリオのごく一部にとどめるべきだと助言する。多くの収集家に言わせれば、アートを買う最良の理由は、今も最も単純なものだ。それを眺めるのが大好きだから、である。"
  ],
  qs: [
    { q: "What is fractional ownership of art?", qj: "アートの共同所有（小口化）とは何か。",
      o: ["Renting paintings to museums for a fee.", "Dividing ownership of a single artwork into many shares that investors can buy.", "Buying cheap works by unknown artists.", "Borrowing money to purchase expensive paintings."], a: 1,
      ex: "divides ownership into thousands of shares, and sells them online が仕組みの説明です。fraction は「一部分・分数」。", ev: [1, "divides ownership into thousands of shares"] },
    { q: "Which is NOT mentioned as a disadvantage of art as an investment?", qj: "アート投資の欠点として述べられていないものはどれか。",
      o: ["It pays no regular income.", "It is costly to buy and sell.", "It can be hard to sell quickly.", "It is taxed more heavily than stocks."], a: 3,
      ex: "NOT問題。1は pays no dividends or interest、2は high costs、3は illiquid（流動性が低い）に対応。税金には触れていないので4が正解です。本文にない情報を選ぶ問題では、各選択肢の根拠を1つずつ消していきましょう。", ev: [2, "the art market is illiquid"] },
    { q: "What does the final paragraph suggest?", qj: "最終段落は何を示唆しているか。",
      o: ["Art should make up most of an investment portfolio.", "Personal enjoyment remains a good reason to buy art.", "Collectors should sell their art immediately.", "Art prices will rise faster than stock prices."], a: 1,
      ex: "because you love looking at it（眺めるのが大好きだから）を「個人的な楽しみ」と言い換えた2。1は at most, ... a small part と逆です。", ev: [3, "because you love looking at it"] }
  ]
},
{
  id: "p04", lv: "B", tp: "crypto",
  title: "The Bitcoin Halving, Explained",
  jt: "ビットコインの半減期をわかりやすく",
  body: [
    "Unlike the yen or the dollar, Bitcoin has no central bank that can decide to print more of it. Instead, its rules fix the total supply at 21 million coins. New bitcoins enter circulation as a reward to 'miners,' who use powerful computers to verify transactions and add them to the blockchain.",
    "Roughly every four years, or after every 210,000 blocks, that reward is cut in half. This event, known as the halving, was built into the system by its anonymous creator to make new coins steadily scarcer. When Bitcoin launched in 2009, miners received 50 coins per block; after the halving in April 2024, the reward fell to 3.125.",
    "Because the halving reduces the flow of new supply, some investors believe it pushes prices upward, and past halvings were indeed followed by strong rallies. However, the timing of each halving is known years in advance, so economists point out that it should, in theory, already be reflected in the price. Many other factors, such as interest rates and regulation, also influence demand.",
    "The halving also squeezes miners. With their revenue suddenly cut, those with high electricity costs or older equipment may no longer be profitable and are forced to shut down. Over the long term, as block rewards shrink toward zero, the network will have to rely more heavily on transaction fees to pay for its security."
  ],
  ja: [
    "円やドルと違って、ビットコインには発行量を増やすと決められる中央銀行が存在しない。その代わり、ルールによって総供給量が2,100万枚に固定されている。新しいビットコインは「マイナー（採掘者）」への報酬として流通に加わる。マイナーは強力なコンピューターを使って取引を検証し、ブロックチェーンに追加している。",
    "およそ4年ごと、つまり21万ブロックごとに、その報酬は半分に減らされる。半減期と呼ばれるこの仕組みは、新しいコインを着実に希少にするため、匿名の開発者によってシステムに組み込まれた。2009年にビットコインが始まったとき、マイナーは1ブロックあたり50枚を受け取っていたが、2024年4月の半減期のあと、報酬は3.125枚に下がった。",
    "半減期は新規供給の流れを減らすため、価格を押し上げると考える投資家もいる。実際、過去の半減期のあとには力強い上昇相場が続いた。しかし、半減期の時期は何年も前からわかっているので、理論上はすでに価格に織り込まれているはずだと経済学者は指摘する。金利や規制など、ほかの多くの要因も需要に影響を与える。",
    "半減期はマイナーも圧迫する。収入が突然減るため、電気代が高かったり古い設備を使っていたりするマイナーは採算が取れなくなり、撤退を余儀なくされることがある。長期的には、ブロック報酬がゼロに近づくにつれ、ネットワークの安全を支える費用は取引手数料にいっそう頼らざるを得なくなる。"
  ],
  qs: [
    { q: "How are new bitcoins created?", qj: "新しいビットコインはどのように生まれるか。",
      o: ["A central bank prints them when demand rises.", "They are given to miners as a reward for verifying transactions.", "Users buy them directly from the anonymous creator.", "They are created whenever the price falls."], a: 1,
      ex: "New bitcoins enter circulation as a reward to 'miners' が根拠。1は第1文の has no central bank と矛盾します。", ev: [0, "who use powerful computers to verify transactions"] },
    { q: "Why are some economists skeptical that halvings cause price rises?", qj: "一部の経済学者が「半減期が値上がりを招く」ことに懐疑的なのはなぜか。",
      o: ["Because halvings have never been followed by rallies.", "Because the date of each halving is known in advance and should already be priced in.", "Because miners sell all their coins after each halving.", "Because the total supply keeps increasing."], a: 1,
      ex: "known years in advance ... should ... already be reflected in the price が根拠。be priced in（価格に織り込まれる）は金融英語の頻出表現です。1は were indeed followed by strong rallies と矛盾。", ev: [2, "so economists point out that it should, in theory, already be reflected in the price"] },
    { q: "What long-term challenge does the passage mention?", qj: "本文が挙げている長期的な課題は何か。",
      o: ["The network will depend more on transaction fees to fund its security.", "Electricity will become free for miners.", "The supply of bitcoin will exceed 21 million.", "Central banks will take control of the network."], a: 0,
      ex: "rely more heavily on transaction fees to pay for its security が根拠。3は総量が2,100万枚に固定されているという第1段落と矛盾します。", ev: [3, "the network will have to rely more heavily on transaction fees to pay for its security"] }
  ]
},
{
  id: "p19", lv: "A", tp: "ai",
  title: "When the Measure Becomes the Target",
  jt: "測る物差しが目標になるとき",
  body: [
    "Progress in artificial intelligence is conventionally charted through benchmarks: standardized collections of test questions on which competing systems are scored and ranked. Such yardsticks have undeniably galvanized the field, furnishing researchers with common goals and an unambiguous means of adjudicating rival claims. Yet their very success has exposed an insidious vulnerability.",
    "The economist Charles Goodhart famously observed that a statistical regularity tends to collapse once pressure is placed upon it for purposes of control; the principle is now commonly paraphrased as 'when a measure becomes a target, it ceases to be a good measure.' In AI, the phenomenon manifests in several guises. Test questions may inadvertently leak into the enormous datasets on which models are trained, so that a high score reflects memorization rather than reasoning. Developers may also, consciously or not, tailor their systems to the idiosyncrasies of a particular benchmark.",
    "The consequence is that benchmarks saturate with dispiriting rapidity. Tests designed to challenge systems for years are sometimes mastered within months, prompting a perpetual scramble to devise harder ones. More troubling still, impressive scores can engender complacency, lulling users into overestimating a system's competence in settings that bear little resemblance to the test.",
    "Remedies are emerging. Some evaluators keep their questions private, rotate them frequently, or assess models on tasks drawn from real-world use rather than curated exams. None of these measures is a panacea, but together they reflect a salutary shift in emphasis: from asking how well a system performs on a test to asking how reliably it behaves when the stakes are genuine."
  ],
  ja: [
    "人工知能の進歩は、慣例としてベンチマークによって記録されてきた。ベンチマークとは、競い合うシステムを採点し順位づけるための、標準化された試験問題の集まりである。こうした物差しが分野に活気を与えてきたことは否定できない。研究者に共通の目標を与え、対立する主張に決着をつける明確な手段を提供してきたからだ。しかし、その成功そのものが、目に見えにくい弱点を露呈させた。",
    "経済学者チャールズ・グッドハートは、統計的な規則性は、それを管理の目的で用いようと圧力をかけた途端に崩れがちだと指摘したことで知られる。この原理は今では「ある指標が目標になると、それはよい指標ではなくなる」と言い換えられることが多い。AIでは、この現象はいくつかの形で現れる。試験問題が、モデルの訓練に使われる巨大なデータセットに意図せず紛れ込み、高得点が推論ではなく暗記を反映しているにすぎない、ということがありうる。また開発者が、意識的にせよ無意識にせよ、特定のベンチマークの癖に合わせてシステムを調整してしまうこともある。",
    "その結果、ベンチマークは気が滅入るほどの速さで飽和する。何年もシステムを悩ませるよう設計された試験が、数か月で攻略されてしまうこともあり、より難しい試験を考案しようとする終わりのない争奪戦を招いている。さらに厄介なことに、見事な得点は慢心を生み、試験とはほとんど似ていない状況でのシステムの能力を利用者に過大評価させてしまう。",
    "対策も生まれつつある。問題を非公開にしたり、頻繁に入れ替えたり、厳選された試験ではなく実際の利用から集めた課題でモデルを評価したりする評価者もいる。どの対策も万能薬ではないが、全体として、重点の置き方が健全な方向へ移りつつあることを示している。つまり「試験でどれだけよい成績を出すか」を問うことから、「本当に重大な場面でどれだけ確実に振る舞うか」を問うことへの転換である。"
  ],
  qs: [
    { q: "What does the author suggest about benchmarks in the first paragraph?", qj: "第1段落で、筆者はベンチマークについて何を示唆しているか。",
      o: ["They have been largely irrelevant to progress in AI.", "They have driven progress but also have a hidden weakness.", "They are too difficult for most AI systems.", "They were designed mainly to rank universities."], a: 1,
      ex: "galvanized the field（分野を活気づけた）で功績を認めたうえで、Yet their very success has exposed an insidious vulnerability（その成功自体が目立たない弱点を露呈させた）と転じています。insidious は「知らぬ間に進行する・潜行性の」。", ev: [0, "Yet their very success has exposed an insidious vulnerability"] },
    { q: "How might a model achieve a high score without genuine reasoning?", qj: "モデルが本当の推論なしに高得点をとるのはどのような場合か。",
      o: ["By refusing to answer difficult questions.", "Test questions may have been included in its training data.", "By using a smaller dataset than its rivals.", "Evaluators may have made the test easier on purpose."], a: 1,
      ex: "Test questions may inadvertently leak into the enormous datasets ... so that a high score reflects memorization rather than reasoning。inadvertently（うっかり・意図せず）は1級頻出。4の on purpose（わざと）は inadvertently と真逆です。", ev: [1, "Test questions may inadvertently leak into the enormous datasets"] },
    { q: "What danger of high benchmark scores is mentioned?", qj: "ベンチマークの高得点について、どのような危険が述べられているか。",
      o: ["Users may overestimate how capable a system is in real situations.", "Developers may lose interest in building new systems.", "High scores make systems more expensive to use.", "Benchmarks become impossible to update."], a: 0,
      ex: "engender complacency（慢心を生む）、lulling users into overestimating a system's competence が根拠。lull A into doing は「Aを安心させて～させる」。", ev: [2, "lulling users into overestimating a system's competence"] },
    { q: "What does the author mean by a 'salutary shift in emphasis'?", qj: "筆者の言う「重点の健全な転換」とは何か。",
      o: ["A move toward publishing all test questions openly.", "A beneficial move toward evaluating dependable behavior in real use.", "A decision to stop measuring AI performance altogether.", "A change from private companies to public universities."], a: 1,
      ex: "salutary は「有益な・健全な」。how reliably it behaves when the stakes are genuine（本当に重大な場面でどれだけ確実に振る舞うか）への転換です。1は keep their questions private と逆。", ev: [3, "how reliably it behaves when the stakes are genuine"] },
  ]
},
{
  id: "p06", lv: "B", tp: "rates",
  title: "Why Bond Prices Fall When Rates Rise",
  jt: "金利が上がると債券価格が下がる理由",
  body: [
    "One of the first puzzles new investors encounter is the seesaw relationship between interest rates and bond prices. When rates go up, the prices of existing bonds go down, and vice versa. At first glance this seems strange, since a bond promises to pay a fixed amount no matter what happens.",
    "The key is that a bond's fixed payments become more or less attractive compared with what is newly available. Imagine you own a bond paying 1% a year, and then the market rate rises to 3%. No buyer will pay full price for your 1% bond when a new one pays three times as much. To sell it, you must accept a lower price, enough to give the buyer a return comparable to the new rate.",
    "The longer a bond's maturity, the larger this effect. A bond that matures next year will soon repay its face value, so a rate change matters little. A thirty-year bond, by contrast, locks in its payments for decades, and its price can swing dramatically. Investors measure this sensitivity with a figure called duration.",
    "This is why rapid rate increases can cause trouble even for supposedly safe institutions. In 2023, Silicon Valley Bank in the United States collapsed partly because it held large amounts of long-term bonds that had lost value as rates climbed, just as depositors rushed to withdraw their money."
  ],
  ja: [
    "投資を始めたばかりの人が最初に出会う謎の1つが、金利と債券価格のシーソーのような関係だ。金利が上がると既存の債券の価格は下がり、その逆もまた然りである。一見これは奇妙に思える。債券は何が起きても決まった額を支払うと約束しているからだ。",
    "鍵は、債券の固定された支払いが、新たに手に入るものと比べて魅力が増したり減ったりする点にある。年1%を支払う債券を持っていて、その後、市場金利が3%に上がったとしよう。新しい債券が3倍の利息を払うのに、あなたの1%の債券に額面どおりの価格を払う買い手はいない。売るためには、買い手が新しい金利に見合う利回りを得られる程度まで、低い価格を受け入れなければならない。",
    "満期が長い債券ほど、この影響は大きくなる。来年満期を迎える債券はまもなく額面が償還されるので、金利が変わってもあまり関係がない。これに対して30年債は、何十年にもわたって支払いが固定されるため、価格が大きく振れることがある。投資家はこの感応度を、デュレーションと呼ばれる数値で測る。",
    "急速な利上げが、安全だと思われている金融機関にさえ問題を引き起こしうるのはこのためだ。2023年、米国のシリコンバレー銀行が破綻したのは、金利上昇で価値の下がった長期債を大量に保有していたところへ、預金者が一斉に預金を引き出そうとしたことが一因だった。"
  ],
  qs: [
    { q: "What does the example of the 1% bond illustrate?", qj: "1%の債券の例は何を説明しているか。",
      o: ["Bonds always pay less than stocks.", "An older bond must be sold at a discount when new bonds pay more.", "Market rates rarely change.", "Buyers prefer bonds with lower interest."], a: 1,
      ex: "To sell it, you must accept a lower price が結論。at a discount は「割り引いて・額面を下回る価格で」。", ev: [1, "you must accept a lower price"] },
    { q: "According to the passage, which bond would be most affected by a rise in rates?", qj: "本文によると、金利上昇の影響を最も受けるのはどの債券か。",
      o: ["A bond that matures next month.", "A bond that matures next year.", "A bond that matures in thirty years.", "All bonds are affected equally."], a: 2,
      ex: "The longer a bond's maturity, the larger this effect（満期が長いほど影響が大きい）。the 比較級, the 比較級 の構文を正確に読み取れるかがポイントです。", ev: [2, "its price can swing dramatically"] },
    { q: "What contributed to the failure of Silicon Valley Bank?", qj: "シリコンバレー銀行の破綻の一因は何か。",
      o: ["It refused to buy any government bonds.", "Losses on long-term bonds combined with rapid withdrawals by depositors.", "It lent too much money to foreign governments.", "Interest rates fell suddenly to zero."], a: 1,
      ex: "long-term bonds that had lost value as rates climbed と depositors rushed to withdraw の2要素をまとめた2。partly because（一因として）なので、唯一の原因と断定していない点にも注意。", ev: [3, "it held large amounts of long-term bonds that had lost value as rates climbed"] }
  ]
},
{
  id: "p14", lv: "B", tp: "film",
  title: "Subtitles, Dubbing, and Global Streaming",
  jt: "字幕・吹き替えと世界的な動画配信",
  body: [
    "Not long ago, a television drama in Korean or Spanish had little chance of becoming a worldwide hit. Today, streaming platforms release shows in dozens of languages at once, and series from South Korea, Spain, and Japan regularly appear near the top of global viewing charts.",
    "Translation is central to this success. Streaming services invest heavily in both subtitles and dubbing, and in many countries a large share of viewers now choose dubbed versions, which allow them to follow the story while looking at their phones or doing other things. Subtitling, meanwhile, remains popular among viewers who want to hear the actors' original voices.",
    "Neither method is simple. A good subtitle must be short enough to read in a few seconds, so translators often condense dialogue and must find equivalents for jokes and cultural references. Dubbing requires matching the translated lines to the actors' lip movements, a painstaking task that also depends on the skill of voice actors.",
    "AI is beginning to change the process. New tools can generate draft translations and even recreate an actor's voice in another language. This could make content available in more languages at a lower cost, but voice actors and translators worry about their jobs and about the loss of human nuance."
  ],
  ja: [
    "少し前まで、韓国語やスペイン語のテレビドラマが世界的なヒットになる見込みはほとんどなかった。今では動画配信サービスが作品を何十もの言語で同時に配信し、韓国やスペイン、日本のシリーズが世界の視聴ランキング上位にたびたび登場している。",
    "この成功の中心にあるのが翻訳だ。配信サービスは字幕と吹き替えの両方に多額の投資をしており、多くの国では今や視聴者の大きな割合が吹き替え版を選んでいる。吹き替えなら、スマートフォンを見たり別のことをしたりしながらでも話を追えるからだ。一方で字幕は、俳優の元の声を聞きたい視聴者のあいだで根強い人気がある。",
    "どちらの方法も簡単ではない。よい字幕は数秒で読める短さでなければならないため、翻訳者はしばしばせりふを凝縮し、冗談や文化的な言及に相当する表現を見つけなければならない。吹き替えは訳したせりふを俳優の口の動きに合わせる必要があり、骨の折れる作業であるうえ、声優の技量にも左右される。",
    "AIがこの工程を変え始めている。新しいツールは翻訳の下書きを生成し、さらには俳優の声を別の言語で再現することもできる。これによって、より多くの言語でより安く作品を届けられるようになるかもしれないが、声優や翻訳者は自分たちの仕事と、人間ならではの細やかなニュアンスが失われることを心配している。"
  ],
  qs: [
    { q: "Why do some viewers prefer dubbed versions?", qj: "吹き替え版を好む視聴者がいるのはなぜか。",
      o: ["Dubbed versions are released earlier.", "They can follow the story without watching the screen constantly.", "Dubbed versions are cheaper to watch.", "They dislike the actors' original voices."], a: 1,
      ex: "while looking at their phones or doing other things（スマホを見たり別のことをしながら）を「画面を見続けなくても」と言い換えた2。", ev: [1, "while looking at their phones or doing other things"] },
    { q: "What makes subtitling difficult?", qj: "字幕づくりを難しくしているのは何か。",
      o: ["Subtitles must match the actors' lip movements.", "Dialogue must be shortened and cultural references adapted.", "Viewers cannot read subtitles on phones.", "Subtitles are available in only one language."], a: 1,
      ex: "condense dialogue（せりふを凝縮する）と find equivalents for jokes and cultural references が根拠。1の「口の動きに合わせる」は吹き替えの難しさなので、取り違えを狙ったひっかけです。", ev: [2, "translators often condense dialogue"] },
    { q: "What concern is raised about AI in translation?", qj: "翻訳へのAI活用についてどのような懸念が示されているか。",
      o: ["It makes content more expensive.", "It may threaten jobs and reduce subtle human expression.", "It can only translate into English.", "It slows down the release of new shows."], a: 1,
      ex: "worry about their jobs and about the loss of human nuance が根拠。1は at a lower cost と逆です。", ev: [3, "voice actors and translators worry about their jobs"] }
  ]
},
{
  id: "p09", lv: "B", tp: "ai",
  title: "AI's Growing Appetite for Electricity",
  jt: "膨らみ続けるAIの電力需要",
  body: [
    "Training and running advanced AI models requires enormous computing power, and computing power requires electricity. Data centers packed with specialized chips consume vast amounts of energy, both to perform calculations and to keep the equipment cool. As demand for AI services has surged, technology companies have been racing to build new facilities around the world.",
    "This expansion is putting pressure on power grids. In some regions, utilities have warned that they cannot connect new data centers as quickly as developers would like, and forecasts of electricity demand have been revised sharply upward after years of little growth. The International Energy Agency has projected that electricity use by data centers could more than double by 2030.",
    "Tech firms say they are committed to clean energy, and several have signed long-term contracts for solar, wind, and even nuclear power. Engineers are also designing more efficient chips and cooling systems. Still, critics note that efficiency gains can be offset by rising usage, a pattern economists call the rebound effect: when something becomes cheaper to use, people tend to use more of it.",
    "The debate matters for investors as well. Utilities, grid equipment makers, and energy producers have attracted new attention as indirect beneficiaries of the AI boom, while questions about power supply may determine where, and how fast, the industry can grow."
  ],
  ja: [
    "高度なAIモデルの訓練と運用には膨大な計算能力が必要であり、計算能力には電力が必要だ。専用チップを詰め込んだデータセンターは、計算を行うためと機器を冷却するための両方で、莫大なエネルギーを消費する。AIサービスの需要が急増するにつれ、テクノロジー企業は世界中で新しい施設の建設を競い合っている。",
    "この拡大は電力網に負担をかけている。一部の地域では、電力会社が開発者の望む速さでは新しいデータセンターを接続できないと警告しており、何年もほとんど伸びていなかった電力需要の予測は大幅に上方修正された。国際エネルギー機関（IEA）は、データセンターの電力使用量が2030年までに2倍以上になる可能性があると予測している。",
    "テック企業はクリーンエネルギーに力を入れていると言い、いくつかの企業は太陽光や風力、さらには原子力による電力の長期契約を結んでいる。技術者たちは、より効率的なチップや冷却システムの設計にも取り組んでいる。それでも批判的な人々は、効率の向上が利用の増加で相殺されうると指摘する。経済学者がリバウンド効果と呼ぶ現象で、何かが安く使えるようになると、人はそれをもっと使うようになりがちなのだ。",
    "この議論は投資家にとっても重要だ。電力会社、送電設備メーカー、エネルギー生産者は、AIブームの間接的な受益者として新たな注目を集めている。一方で、電力供給をめぐる問題が、この産業がどこで、どれほどの速さで成長できるかを左右するかもしれない。"
  ],
  qs: [
    { q: "Why do data centers use so much energy?", qj: "データセンターが大量のエネルギーを使うのはなぜか。",
      o: ["They are usually located in very cold regions.", "They need power both for computation and for cooling.", "They store electricity for nearby cities.", "They use old and inefficient chips."], a: 1,
      ex: "both to perform calculations and to keep the equipment cool が根拠。both A and B の2点をそろえた選択肢を選びます。", ev: [0, "both to perform calculations and to keep the equipment cool"] },
    { q: "What is the 'rebound effect'?", qj: "「リバウンド効果」とは何か。",
      o: ["A sudden fall in electricity prices.", "Increased use that cancels out savings from greater efficiency.", "The return of companies to fossil fuels.", "A recovery in the stock prices of tech firms."], a: 1,
      ex: "efficiency gains can be offset by rising usage（効率向上が利用増で相殺される）。offset は「相殺する」、選択肢の cancel out と同義です。", ev: [2, "efficiency gains can be offset by rising usage"] },
    { q: "Why might investors pay attention to utilities?", qj: "投資家が電力会社に注目するかもしれないのはなぜか。",
      o: ["They may benefit indirectly from the growth of AI.", "They are developing their own AI chatbots.", "They are required to buy AI companies.", "Their profits are guaranteed by the government."], a: 0,
      ex: "indirect beneficiaries of the AI boom（AIブームの間接的な受益者）の言い換え。beneficiary は benefit の派生語で「受益者」。", ev: [3, "indirect beneficiaries of the AI boom"] }
  ]
},
{
  id: "p12", lv: "B", tp: "art",
  title: "The Boom in Immersive Exhibitions",
  jt: "没入型展示のブーム",
  body: [
    "Walk into an immersive art exhibition and the paintings are no longer small objects hanging on a wall. Instead, famous images are projected onto every surface of a huge room, floor included, and they move, swirl, and change to the sound of music. Shows built around artists such as Van Gogh and Monet have attracted millions of visitors around the world.",
    "Supporters say these experiences make art accessible to people who might never visit a traditional museum. The atmosphere is relaxed, photography is encouraged, and visitors do not need any background knowledge to enjoy themselves. For many young people, a shareable photo inside a glowing sunflower field is their first encounter with a great painter.",
    "Some critics, however, are unimpressed. They argue that enlarging and animating a painting distorts the artist's intentions, turning a carefully composed work into mere decoration. Seeing a real canvas, they point out, allows you to notice the texture of the brushstrokes and the subtle colors that no projection can reproduce.",
    "Many museums have responded not by rejecting the trend but by learning from it. They are experimenting with digital displays that complement, rather than replace, the original works, hoping that visitors who come for the spectacle will stay for the art itself."
  ],
  ja: [
    "没入型のアート展に足を踏み入れると、絵画はもはや壁に掛かった小さな物ではない。有名な作品の画像が、床も含めた巨大な部屋のあらゆる面に投影され、音楽に合わせて動き、渦を巻き、変化していく。ゴッホやモネといった画家を中心にした展示は、世界中で何百万人もの来場者を集めてきた。",
    "支持する人々は、こうした体験によって、従来の美術館を訪れることがなかったかもしれない人々にもアートが身近になると言う。雰囲気は気楽で、写真撮影は歓迎され、来場者は予備知識がなくても楽しめる。多くの若者にとって、光り輝くひまわり畑の中で撮った共有したくなる1枚が、偉大な画家との最初の出会いになっている。",
    "しかし、感心しない批評家もいる。彼らは、絵画を拡大して動かすことは画家の意図をゆがめ、入念に構成された作品を単なる装飾に変えてしまうと主張する。本物のキャンバスを見れば、どんな投影でも再現できない筆づかいの質感や微妙な色合いに気づくことができる、と彼らは指摘する。",
    "多くの美術館は、この流行を拒むのではなく、そこから学ぶことで応えてきた。オリジナル作品に取って代わるのではなく、それを補うデジタル展示を試みているのだ。華やかな見せ物を目当てに来た人が、作品そのもののために足を止めてくれることを期待して。"
  ],
  qs: [
    { q: "What do supporters value about immersive exhibitions?", qj: "支持する人々は没入型展示の何を評価しているか。",
      o: ["They are cheaper than traditional museums.", "They welcome people who may not visit ordinary museums.", "They display original paintings in better condition.", "They teach detailed art history."], a: 1,
      ex: "make art accessible to people who might never visit a traditional museum が根拠。4は do not need any background knowledge と方向が逆です。", ev: [1, "make art accessible to people who might never visit a traditional museum"] },
    { q: "What is a criticism of immersive exhibitions?", qj: "没入型展示への批判はどれか。",
      o: ["They are too quiet and serious.", "They may misrepresent what the original artist intended.", "They do not allow photography.", "They show too few famous artists."], a: 1,
      ex: "distorts the artist's intentions（画家の意図をゆがめる）→ misrepresent what the original artist intended。distort と misrepresent の対応を押さえましょう。", ev: [2, "distorts the artist's intentions"] },
    { q: "How have many museums responded?", qj: "多くの美術館はどう対応してきたか。",
      o: ["By banning digital technology.", "By replacing their paintings with projections.", "By using digital displays to support the original works.", "By closing their doors to young visitors."], a: 2,
      ex: "complement, rather than replace（取って代わるのではなく補う）が決め手。2は replace で、まさに否定されている内容です。complement（補う）と compliment（ほめる）は紛らわしい語ドリルにも収録しています。", ev: [3, "digital displays that complement, rather than replace, the original works"] }
  ]
},
{
  id: "p16", lv: "B", tp: "stocks",
  title: "Share Buybacks: Reward or Red Flag?",
  jt: "自社株買いは株主還元か、危険信号か",
  body: [
    "When a company earns more cash than it needs, it has several choices. It can invest in new projects, pay down debt, distribute dividends, or buy back its own shares. In recent years, buybacks have become one of the most popular ways for large companies to return money to shareholders.",
    "A buyback reduces the number of shares in circulation, so each remaining share represents a slightly larger slice of the company's profits. This tends to raise earnings per share and can support the stock price. Buybacks are also flexible: unlike dividends, which investors expect to continue, a company can scale them back in difficult years without alarming the market.",
    "Critics, however, see a darker side. Executives whose pay is linked to the share price may favor buybacks over long-term investment in research, equipment, or workers. Some companies have even borrowed money to fund buybacks, leaving them more vulnerable when the economy slows.",
    "In Japan, buybacks have surged as the Tokyo Stock Exchange has pressed listed companies to use their capital more efficiently. For investors, the key question is not whether a company buys back shares, but whether it does so at sensible prices after funding the investments it needs to grow."
  ],
  ja: [
    "企業が必要以上の現金を稼いだとき、選択肢はいくつかある。新しい事業に投資する、借金を返す、配当を支払う、あるいは自社の株式を買い戻すことだ。近年、自社株買いは大企業が株主にお金を還元する最も一般的な方法の1つになっている。",
    "自社株買いは流通している株式の数を減らすので、残った1株ごとに会社の利益のわずかに大きな取り分が割り当てられることになる。そのため1株あたり利益が上がりやすく、株価の下支えにもなりうる。自社株買いには柔軟性もある。投資家が継続を期待する配当と違って、業績の苦しい年には市場を驚かせることなく規模を縮小できるのだ。",
    "しかし、批判する人々は暗い側面も見ている。報酬が株価に連動している経営陣は、研究や設備、従業員への長期的な投資よりも自社株買いを優先するかもしれない。自社株買いの資金を借金でまかなう企業さえあり、景気が減速したときに、より打撃を受けやすくなっている。",
    "日本では、東京証券取引所が上場企業に資本をより効率的に使うよう強く求めたことを受けて、自社株買いが急増している。投資家にとって肝心なのは、企業が自社株を買うかどうかではなく、成長に必要な投資に資金を回したうえで、妥当な価格で買っているかどうかである。"
  ],
  qs: [
    { q: "How does a buyback affect earnings per share?", qj: "自社株買いは1株あたり利益にどう影響するか。",
      o: ["It tends to lower them because the company spends cash.", "It tends to raise them because there are fewer shares.", "It has no effect on them.", "It makes them impossible to calculate."], a: 1,
      ex: "株数が減る → 1株あたりの取り分が増える → This tends to raise earnings per share。因果関係を正しく追えているかが問われています。", ev: [1, "This tends to raise earnings per share"] },
    { q: "What advantage do buybacks have over dividends?", qj: "配当と比べた自社株買いの利点は何か。",
      o: ["They are always cheaper for the company.", "They can be reduced without upsetting investors as much.", "They are paid every month.", "They are not affected by the stock price."], a: 1,
      ex: "scale them back ... without alarming the market が根拠。scale back は「（規模を）縮小する」、alarm は「不安にさせる」で、選択肢の upset と対応します。", ev: [1, "a company can scale them back in difficult years without alarming the market"] },
    { q: "What concern do critics raise?", qj: "批判する人々はどんな懸念を示しているか。",
      o: ["Managers might neglect long-term investment to boost the share price.", "Buybacks are illegal in many countries.", "Dividends will disappear completely.", "Workers will be forced to buy shares."], a: 0,
      ex: "favor buybacks over long-term investment（長期投資より自社株買いを優先する）を neglect（おろそかにする）で言い換えた1が正解。favor A over B は「BよりAを好む」。", ev: [2, "may favor buybacks over long-term investment"] }
  ]
},
{
  id: "p18", lv: "A", tp: "rates",
  title: "The Perils of Forward Guidance",
  jt: "フォワードガイダンスの危うさ",
  body: [
    "Central bankers once prized opacity. For much of the twentieth century, the prevailing wisdom held that a degree of mystique enhanced a central bank's leverage over markets, and officials cultivated a deliberately oracular style of speech. That orthodoxy has since been inverted. Today, monetary authorities routinely publish projections of their own future policy, a practice known as forward guidance, on the premise that transparency amplifies the potency of their decisions.",
    "The rationale is compelling. Long-term borrowing costs, which matter most for mortgages and corporate investment, depend less on today's policy rate than on expectations about its future path. By credibly committing to keep rates low for an extended period, a central bank can depress long-term yields even when its short-term rate is already near zero. In the aftermath of the 2008 financial crisis, such commitments became an indispensable instrument.",
    "Yet forward guidance carries a subtle hazard. Once markets come to treat a central bank's projections as quasi-promises, officials may feel constrained from reversing course lest they forfeit credibility. Some economists contend that this dynamic contributed to the sluggish response of several central banks when inflation surged in 2021, as policymakers were reluctant to abandon guidance that had signaled prolonged accommodation.",
    "The dilemma is therefore not whether to communicate, but how. Guidance that is explicitly conditional on economic data preserves flexibility, yet it is inherently less forceful than an unconditional pledge. Striking the right balance between commitment and discretion has become one of the defining challenges of modern central banking, and it is a balance that must be recalibrated whenever the economic landscape shifts."
  ],
  ja: [
    "かつて中央銀行家は不透明さを重んじていた。20世紀の大半を通じて、ある程度の神秘性が市場に対する中央銀行の影響力を高めるというのが支配的な通念であり、当局者はあえて神託のような（謎めいた）話し方を身につけていた。その正統的な考え方は、その後ひっくり返された。今日の金融当局は、透明性こそ政策決定の効力を増幅させるという前提のもと、自らの将来の政策についての見通しを日常的に公表している。これはフォワードガイダンスとして知られる慣行である。",
    "その論拠には説得力がある。住宅ローンや企業の投資にとって最も重要な長期の借入コストは、今日の政策金利よりも、その先行きの経路に関する予想に左右される。金利を長期間低く保つと信頼に足る形で約束すれば、中央銀行は短期金利がすでにゼロ近くにあっても長期金利を押し下げることができる。2008年の金融危機の余波の中で、こうした約束は欠かせない手段となった。",
    "しかしフォワードガイダンスには、見えにくい危険が伴う。市場が中央銀行の見通しを準約束のように扱い始めると、当局者は信認を失うことを恐れて、政策の方向転換をためらうようになりかねない。一部の経済学者は、この力学が2021年にインフレが急伸した際のいくつかの中央銀行の鈍い対応の一因になったと主張する。政策担当者が、長期の緩和を示唆していたガイダンスを放棄することに消極的だったからだ。",
    "したがって、ジレンマは伝えるべきかどうかではなく、どう伝えるかにある。経済指標次第であることを明示したガイダンスは柔軟性を保つが、本質的に無条件の誓約ほどの力はない。約束と裁量のあいだで適切な均衡をとることは、現代の中央銀行業務を特徴づける課題の1つとなっており、その均衡は経済の状況が変わるたびに調整し直されなければならない。"
  ],
  qs: [
    { q: "What was the traditional view of central bank communication?", qj: "中央銀行のコミュニケーションについての従来の見方はどのようなものだったか。",
      o: ["Full transparency was essential for stable markets.", "Some secrecy was thought to strengthen a central bank's influence.", "Central banks should publish forecasts every week.", "Markets should decide interest rates without guidance."], a: 1,
      ex: "a degree of mystique enhanced a central bank's leverage over markets。mystique（神秘性）→ secrecy、leverage（影響力）→ influence の言い換え。opacity（不透明さ）と oracular（神託のような）も1級レベルの語です。", ev: [0, "a degree of mystique enhanced a central bank's leverage over markets"] },
    { q: "Why can forward guidance lower long-term borrowing costs?", qj: "フォワードガイダンスが長期の借入コストを下げられるのはなぜか。",
      o: ["Long-term rates depend heavily on expectations about future policy.", "It forces banks to lend at a fixed rate.", "It raises the short-term policy rate.", "It prevents the government from issuing bonds."], a: 0,
      ex: "depend less on today's policy rate than on expectations about its future path（今日の政策金利より、将来の経路に関する予想に左右される）。less A than B は「AよりむしろB」で、比較の向きを取り違えないことが肝心です。", ev: [1, "depend less on today's policy rate than on expectations about its future path"] },
    { q: "According to some economists, what was a drawback of forward guidance in 2021?", qj: "一部の経済学者によれば、2021年のフォワードガイダンスの欠点は何だったか。",
      o: ["It caused interest rates to rise too quickly.", "It may have made central banks slow to react to rising inflation.", "It led to a sudden collapse in housing prices.", "It encouraged governments to reduce spending."], a: 1,
      ex: "contributed to the sluggish response（鈍い対応の一因となった）が根拠。sluggish は「のろい・不活発な」。lest they forfeit credibility は「信認を失わないように（失うことを恐れて）」という1級頻出の構文です。", ev: [2, "contributed to the sluggish response of several central banks"] },
    { q: "What trade-off does the author describe in the final paragraph?", qj: "筆者は最終段落でどのようなトレードオフを述べているか。",
      o: ["Conditional guidance offers flexibility but has less impact.", "Unconditional pledges are flexible but confusing.", "Communication is cheap but ineffective.", "Data-dependent policy is powerful but slow."], a: 0,
      ex: "preserves flexibility, yet it is inherently less forceful（柔軟性を保つが、本質的に力が弱い）。2は「無条件の誓約は柔軟」としており、本文と逆の組み合わせです。", ev: [3, "yet it is inherently less forceful than an unconditional pledge"] }
  ]
},
{
  id: "p10", lv: "B", tp: "art",
  title: "Who Owns an AI-Generated Image?",
  jt: "AIが生成した画像は誰のものか",
  body: [
    "With a few words of instruction, image-generating AI can now produce pictures in the style of a watercolor, an oil painting, or a movie poster in seconds. The results can be striking, and they have sparked a heated debate about creativity, ownership, and fairness in the art world.",
    "One question is whether such images can be protected by copyright at all. In the United States, the Copyright Office has taken the position that copyright requires human authorship. A work created entirely by a machine is therefore not eligible, although a person who selects, arranges, or significantly modifies AI output may be able to claim protection for their own contribution.",
    "A second question concerns the data used to train these systems. Many models learned from millions of images collected from the internet, including works by living artists who were never asked for permission and received no payment. Several artists and media companies have filed lawsuits, arguing that this amounts to large-scale copying. AI developers counter that learning from publicly available images is similar to how human artists study the works of others.",
    "Courts in different countries may reach different conclusions, and new laws are being discussed. Meanwhile, some platforms have introduced tools that let creators opt out of training datasets, and others label AI-generated content so that viewers know what they are looking at."
  ],
  ja: [
    "わずかな言葉で指示するだけで、画像生成AIは今や水彩画や油絵、映画のポスター風の絵を数秒で作り出せる。その出来栄えは目を見張るほどのこともあり、アートの世界で創造性・所有権・公平性をめぐる激しい議論を巻き起こしている。",
    "1つの問題は、そもそもそうした画像が著作権で保護されうるのかどうかだ。米国では、著作権局が「著作権には人間による創作が必要だ」という立場をとっている。したがって、完全に機械が作った作品は保護の対象にならない。ただし、AIの出力を選択したり、配置したり、大幅に手を加えたりした人は、自分が寄与した部分について保護を主張できる可能性がある。",
    "2つ目の問題は、こうしたシステムの訓練に使われたデータに関するものだ。多くのモデルはインターネットから集めた何百万枚もの画像から学習しており、その中には、許可を求められることも対価を受け取ることもなかった存命の画家の作品も含まれる。何人かの画家やメディア企業は、これは大規模な複製に等しいとして訴訟を起こしている。AIの開発者は、公開されている画像から学ぶことは、人間の画家が他人の作品を研究するのと同じようなものだと反論している。",
    "国によって裁判所が異なる結論を出す可能性もあり、新しい法律も議論されている。その一方で、創作者が訓練用データから自分の作品を除外できるツールを導入したプラットフォームもあれば、見ている人が何を見ているのかわかるよう、AI生成のコンテンツにラベルを付けるところもある。"
  ],
  qs: [
    { q: "According to the US Copyright Office, what is required for copyright protection?", qj: "米国著作権局によれば、著作権保護には何が必要か。",
      o: ["A human author.", "A registered trademark.", "Payment to the AI developer.", "Approval from a museum."], a: 0,
      ex: "copyright requires human authorship が根拠。authorship は「著作者であること・原作者」。", ev: [1, "copyright requires human authorship"] },
    { q: "Why have some artists filed lawsuits?", qj: "一部の画家が訴訟を起こしたのはなぜか。",
      o: ["AI images were sold at higher prices than theirs.", "Their works were used to train AI models without permission or payment.", "They were banned from using AI tools.", "Museums refused to display their paintings."], a: 1,
      ex: "who were never asked for permission and received no payment が根拠。file a lawsuit は「訴訟を起こす」。", ev: [2, "who were never asked for permission and received no payment"] },
    { q: "How do AI developers defend their practices?", qj: "AI開発者は自分たちのやり方をどう擁護しているか。",
      o: ["They say the images were paid for in advance.", "They compare AI training to the way human artists learn from others.", "They claim that AI does not use any images.", "They argue that copyright laws do not exist in their country."], a: 1,
      ex: "counter that ... is similar to how human artists study the works of others。counter は動詞で「反論する」。", ev: [2, "similar to how human artists study the works of others"] }
  ]
},
{
  id: "p17", lv: "B", tp: "crypto",
  title: "Tokenizing the Real World",
  jt: "現実の資産をトークンにする",
  body: [
    "Blockchains were first associated with cryptocurrencies, but many financial institutions are now interested in a different use: tokenization. The idea is to represent ownership of a real-world asset, such as a government bond, a building, or a share in a fund, as a digital token that can be recorded and transferred on a blockchain.",
    "Advocates argue that this could make markets faster and cheaper. Today, settling a securities trade can take a day or more and involves several intermediaries. With tokens, ownership could change hands almost instantly, around the clock, and assets could be divided into small units, allowing more people to invest.",
    "Several large asset managers have already launched tokenized funds that invest in short-term government debt, and some banks are testing tokenized deposits for payments between companies. Still, most activity remains at an experimental stage.",
    "Major obstacles remain. Legal systems must recognize a token as proof of ownership, and different blockchains need to work together smoothly. Moreover, speed can cut both ways: the same technology that allows instant settlement could also allow panic to spread more quickly during a crisis."
  ],
  ja: [
    "ブロックチェーンは当初、暗号資産と結びつけて考えられていたが、今では多くの金融機関が別の用途に関心を寄せている。トークン化だ。これは、国債や建物、ファンドの持ち分といった現実の資産の所有権を、ブロックチェーン上で記録・移転できるデジタルトークンとして表すという考え方である。",
    "推進する人々は、これによって市場がより速く、より安くなりうると主張する。現在、証券取引の決済には1日以上かかることがあり、複数の仲介業者が関わる。トークンなら、所有権はほぼ瞬時に、しかも24時間いつでも移転でき、資産を小さな単位に分けて、より多くの人が投資できるようになる。",
    "すでに複数の大手資産運用会社が短期国債に投資するトークン化ファンドを立ち上げており、企業間の支払いにトークン化預金を試している銀行もある。それでも、大半の取り組みはまだ実験段階にとどまっている。",
    "大きな障害も残っている。法制度がトークンを所有権の証明として認める必要があり、異なるブロックチェーン同士が円滑に連携する必要もある。さらに、速さはもろ刃の剣になりうる。即時決済を可能にするのと同じ技術が、危機の際にはパニックをより速く広げてしまうかもしれないのだ。"
  ],
  qs: [
    { q: "What is tokenization?", qj: "トークン化とは何か。",
      o: ["Creating new cryptocurrencies to replace the dollar.", "Recording ownership of real assets as digital tokens on a blockchain.", "Selling government bonds only to banks.", "Printing paper certificates for digital assets."], a: 1,
      ex: "represent ownership of a real-world asset ... as a digital token が定義です。", ev: [0, "represent ownership of a real-world asset"] },
    { q: "Which benefit do advocates claim?", qj: "推進する人々はどのような利点を主張しているか。",
      o: ["Trades could be settled almost immediately at any time.", "Intermediaries would earn higher fees.", "Assets could no longer be divided.", "Prices would never fall."], a: 0,
      ex: "almost instantly, around the clock（ほぼ瞬時に、24時間いつでも）→ almost immediately at any time。around the clock は「24時間ぶっ通しで」という熟語です。", ev: [1, "ownership could change hands almost instantly, around the clock"] },
    { q: "What does 'speed can cut both ways' mean here?", qj: "ここでの「速さはもろ刃の剣になりうる」とはどういう意味か。",
      o: ["Fast settlement has benefits but could also accelerate a crisis.", "Blockchains are sometimes fast and sometimes slow.", "Tokens can be sent in two directions at once.", "Speed is important only for large banks."], a: 0,
      ex: "cut both ways は「良い面と悪い面の両方がある」。直後のコロン以下「即時決済を可能にする技術が、危機時にはパニックを速く広げうる」がその説明です。", ev: [3, "could also allow panic to spread more quickly during a crisis"] }
  ]
},
{
  id: "p15", lv: "B", tp: "society",
  title: "The Four-Day Workweek Experiment",
  jt: "週休3日制という実験",
  body: [
    "The idea of working four days a week for the same pay once sounded like a fantasy. In the past few years, however, a growing number of companies in countries including the United Kingdom, Iceland, and Japan have experimented with it, and the results have attracted considerable attention.",
    "In many trials, productivity held steady or even improved, while employees reported less stress and burnout. Companies found that when time was limited, staff cut unnecessary meetings and focused on essential tasks. Several also said the policy helped them attract and retain talented workers in a competitive labor market.",
    "Skeptics caution that the model does not suit every industry. Hospitals, factories, and shops that must be staffed every day cannot simply close for an extra day, and compressing the same workload into fewer days can increase fatigue rather than reduce it. Participants in trials were also volunteers, which may have made the results look better than they would be across the economy.",
    "Rather than a single universal solution, the four-day week may be best seen as one option among many flexible arrangements. Its broader lesson may be that the number of hours worked is not always the best measure of how much gets done."
  ],
  ja: [
    "同じ給料で週4日働くという考えは、かつては夢物語のように聞こえた。しかしこの数年、英国、アイスランド、日本などの国々で、それを試す企業が増えており、その結果はかなりの注目を集めている。",
    "多くの試行で、生産性は維持されるか、むしろ向上し、従業員はストレスや燃え尽きが減ったと報告した。企業は、時間が限られると従業員が不要な会議を減らし、本質的な業務に集中することに気づいた。人材獲得競争の激しい労働市場で、この制度が優秀な人材を引きつけ、引き留めるのに役立ったと述べる企業もいくつかあった。",
    "懐疑的な人々は、このモデルがすべての業界に合うわけではないと注意を促す。毎日人員を配置しなければならない病院や工場、店舗は、単純にもう1日休むわけにはいかないし、同じ仕事量をより少ない日数に詰め込めば、疲労が減るどころか増えることもある。また、試行の参加者は自ら手を挙げた企業だったため、経済全体で実施した場合よりも結果がよく見えた可能性がある。",
    "週休3日制は、万人向けの唯一の解決策というより、数ある柔軟な働き方の選択肢の1つと見るのがよいのかもしれない。そこから得られるより広い教訓は、働いた時間数が、どれだけの仕事が成し遂げられたかを測る最良の物差しとは限らない、ということなのかもしれない。"
  ],
  qs: [
    { q: "According to the trials, how did companies maintain productivity?", qj: "試行によると、企業はどのように生産性を維持したか。",
      o: ["By hiring more part-time workers.", "Staff eliminated unnecessary meetings.", "By reducing employees' pay.", "By extending working hours on other days."], a: 1,
      ex: "staff cut unnecessary meetings and focused on essential tasks が根拠。3は for the same pay（同じ給料で）と矛盾します。", ev: [1, "staff cut unnecessary meetings"] },
    { q: "Why might the trial results be overly positive?", qj: "試行の結果が実際よりよく見えている可能性があるのはなぜか。",
      o: ["The companies that took part chose to do so voluntarily.", "The trials lasted for only one day.", "Employees were paid extra to report good results.", "Only hospitals took part in the trials."], a: 0,
      ex: "Participants in trials were also volunteers。自ら参加した企業は制度に向いている可能性が高い、という「選択バイアス」の指摘です。統計的な読み方が問われる良問パターン。", ev: [2, "Participants in trials were also volunteers"] },
    { q: "What is the author's overall view?", qj: "筆者の全体的な見解はどれか。",
      o: ["Every company should adopt a four-day week immediately.", "The four-day week has completely failed.", "It is one useful option, not a solution for everyone.", "Working hours are the best measure of productivity."], a: 2,
      ex: "Rather than a single universal solution ... one option among many flexible arrangements が結論。4は最終文の内容と正反対です。", ev: [3, "one option among many flexible arrangements"] }
  ]
},
{
  id: "p20", lv: "A", tp: "film",
  title: "The Auteur and the Algorithm",
  jt: "作家主義とアルゴリズム",
  body: [
    "The notion of the auteur, the director as the singular creative intelligence behind a film, was championed by French critics in the 1950s as a riposte to the view that Hollywood movies were merely industrial products. Directors such as Alfred Hitchcock, previously dismissed as skilled entertainers, were recast as artists whose idiosyncratic preoccupations could be traced across an entire body of work.",
    "Streaming platforms have complicated this legacy in paradoxical ways. On the one hand, their voracious appetite for content, coupled with a willingness to finance projects that traditional studios deemed commercially unviable, has enabled a number of distinctive filmmakers to realize ambitious visions. On the other hand, the same platforms amass granular data on viewing behavior, recording the precise moment at which audiences pause, rewind, or abandon a title altogether.",
    "Critics fear that such data may exert a homogenizing pressure. If executives discover that viewers disproportionately abandon films with slow openings, the temptation to mandate arresting first minutes, or to excise ambiguity that might bewilder a distracted audience, becomes difficult to resist. The resulting works risk being optimized for retention rather than for resonance.",
    "Defenders of the platforms counter that commercial considerations have always shaped cinema, and that data merely renders explicit what studio executives once inferred from instinct and test screenings. The more pertinent question, perhaps, is whether the new gatekeepers will continue to grant filmmakers latitude once the novelty of prestige projects has worn off and the imperative to justify every expenditure intensifies."
  ],
  ja: [
    "オーテュール（作家）という概念、すなわち監督こそが映画の背後にある唯一の創造的知性だとする考え方は、1950年代にフランスの批評家たちによって、ハリウッド映画は単なる工業製品にすぎないという見方への反論として擁護された。それまで腕のいい娯楽の作り手として片づけられていたアルフレッド・ヒッチコックのような監督は、独特のこだわりが全作品を通じてたどれる芸術家として捉え直された。",
    "動画配信プラットフォームは、この遺産を逆説的な形で複雑にしてきた。一方では、コンテンツへの飽くなき欲求と、従来のスタジオが商業的に成り立たないと見なした企画にも出資する姿勢とが相まって、多くの個性的な映画作家が野心的な構想を実現できるようになった。他方で、同じプラットフォームは視聴行動についての細かなデータを蓄積し、観客が一時停止し、巻き戻し、あるいは作品を完全に見るのをやめる、その正確な瞬間を記録している。",
    "批評家たちは、そうしたデータが画一化の圧力を及ぼすのではないかと恐れている。視聴者が出だしのゆっくりした映画を不釣り合いなほど多く途中でやめると経営陣が知れば、冒頭数分を人目を引くものにするよう命じたり、注意散漫な観客を当惑させかねない曖昧さを削ったりしたいという誘惑にあらがうのは難しくなる。その結果生まれる作品は、心に響くことよりも視聴を続けさせることに最適化される恐れがある。",
    "プラットフォームを擁護する人々は、商業的な配慮は常に映画を形づくってきたのであり、データは、かつてスタジオの幹部が勘や試写から推し量っていたことを明示的にしているにすぎないと反論する。おそらく、より的を射た問いは、話題作の目新しさが薄れ、あらゆる支出を正当化する必要性が強まったとき、新たな門番たちが映画作家に裁量を与え続けるかどうかだろう。"
  ],
  qs: [
    { q: "Why did French critics promote the idea of the auteur?", qj: "フランスの批評家たちがオーテュールの概念を推し進めたのはなぜか。",
      o: ["To argue that some commercial films were the work of genuine artists.", "To encourage Hollywood to produce more films.", "To criticize Alfred Hitchcock's films.", "To show that film is an industrial product."], a: 0,
      ex: "a riposte to the view that Hollywood movies were merely industrial products（ハリウッド映画は工業製品にすぎないという見方への反論）が目的。riposte は「当意即妙の反論」。4は反論された側の見方です。", ev: [0, "as a riposte to the view that Hollywood movies were merely industrial products"] },
    { q: "In what way have streaming platforms benefited filmmakers?", qj: "動画配信プラットフォームはどのような点で映画作家に恩恵をもたらしたか。",
      o: ["They have made films shorter and cheaper.", "They have funded projects that traditional studios considered too risky.", "They have stopped collecting data on viewers.", "They have returned control of films to French critics."], a: 1,
      ex: "finance projects that traditional studios deemed commercially unviable（従来のスタジオが商業的に成り立たないと見なした企画に出資する）。deem は「～と見なす」、unviable は「成り立たない」。", ev: [1, "a willingness to finance projects that traditional studios deemed commercially unviable"] },
    { q: "What do critics fear viewing data might lead to?", qj: "批評家たちは、視聴データが何をもたらすと恐れているか。",
      o: ["Films that are longer and more ambiguous.", "Films designed to keep viewers watching rather than to move them deeply.", "The end of streaming platforms.", "A return to black-and-white cinema."], a: 1,
      ex: "optimized for retention rather than for resonance（心に響くことより視聴継続に最適化される）。retention（保持）と resonance（共鳴）の対比を読み取る問題です。1は excise ambiguity（曖昧さを削る）と逆。", ev: [2, "optimized for retention rather than for resonance"] },
    { q: "What is the 'more pertinent question' according to the final paragraph?", qj: "最終段落によれば「より的を射た問い」とは何か。",
      o: ["Whether data is more accurate than instinct.", "Whether audiences prefer old films to new ones.", "Whether platforms will keep giving directors freedom when cost pressures grow.", "Whether test screenings should be banned."], a: 2,
      ex: "whether the new gatekeepers will continue to grant filmmakers latitude（新たな門番が映画作家に裁量を与え続けるか）。latitude は「緯度」のほかに「（行動の）自由・裁量」の意味があり、1級では後者が狙われます。", ev: [3, "whether the new gatekeepers will continue to grant filmmakers latitude"] }
  ]
}
];
