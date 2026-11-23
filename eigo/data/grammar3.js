/* 文法解説（難関大・東大レベル：前半）
   書式は grammar1.js と同じ。lv: ADV=難関大・東大 / exam: 入試での出方 / base: 先に確認したい基礎単元
   qs の型：q に ___ があれば穴埋め。___ がなく fix があれば「誤りを含む箇所を選ぶ」問題（o は q の中の下線部、fix は正しい文）。
   どちらもなければ「英文の意味として最も適切なものを選ぶ」問題（o は和訳）。 */
window.EIGO = window.EIGO || {};
EIGO.GRAMMAR = EIGO.GRAMMAR || [];
EIGO.GRAMMAR.push(
{
  id: "g33", cat: "難関大・東大：構文を読む", lv: "ADV", title: "構文把握①：長い主語と文の骨格", base: ["g01", "g28"],
  lead: "難関大の英文は、主語が長く、挿入や修飾で動詞が遠く離れます。「どこまでが主語か」「述語動詞はどれか」を先に決めれば、長い文も正確に読めます。",
  sec: [
    { h: "述語動詞を先に探す",
      t: "英文の骨格は **S＋V** です。長い文では、まず**時制を持つ動詞（述語動詞）**を探します。\n・**to＋原形／～ing／過去分詞**は、それだけでは述語動詞になれません。\n・接続詞や関係詞が導く節の動詞は、その節の中の動詞です。\n・述語動詞の数は、原則として「接続詞・関係詞の数＋1」個です。",
      ex: [
        ["The idea that people learn best when they are relaxed has been widely accepted.", "人はリラックスしているときに最もよく学ぶという考えは、広く受け入れられてきた。", "S＝The idea … relaxed、V＝has been accepted"],
        ["What surprised the researchers most was how quickly the children adapted.", "研究者たちを最も驚かせたのは、子どもたちがいかに速く適応したかということだった。", "What 節が主語、was が述語動詞"],
        ["Those who fail to learn from history are likely to repeat its mistakes.", "歴史から学ばない人々は、その過ちを繰り返しがちだ。", "S＝Those who … history、V＝are"]
      ] },
    { h: "主語と動詞の間に入るもの",
      t: "主語と動詞の間には、**関係詞節・分詞句・前置詞句・同格・挿入**が入ります。カンマで挟まれた部分を（ ）でくくると骨格が見えます。\n主語の**中心となる名詞（主語の核）**を見失わないことが、主語と動詞の一致を見抜くことにも直結します。",
      ex: [
        ["The number of students who choose to study abroad, according to a recent survey, has fallen.", "最近の調査によれば、留学を選ぶ学生の数は減っている。", "主語の核は number（単数）→ has"],
        ["A theory, however elegant it may be, must be tested against evidence.", "理論は、どれほど美しくても、証拠に照らして検証されなければならない。", "挿入：however elegant it may be"],
        ["Many of the problems facing developing countries today stem from their history.", "今日の発展途上国が直面している問題の多くは、その国の歴史に根ざしている。", "facing … today は problems を修飾する分詞句"]
      ] },
    { h: "形式主語・形式目的語と、強調構文",
      t: "長い主語は文末に回され、元の位置に **it** が置かれます（形式主語）。**SVOC の O が長い**ときも it を仮に置きます（形式目的語）。\n**It is ～ that …** は強調構文のこともあります。**It is と that を取り除いて、残りが（語順を整えれば）完全な文になる**なら強調構文です。",
      ex: [
        ["It is often assumed that technology makes life easier.", "テクノロジーは生活を楽にすると思われがちだ。", "形式主語 it＝that 節"],
        ["The Internet has made it possible for anyone to publish their ideas.", "インターネットのおかげで、だれでも自分の考えを発表できるようになった。", "形式目的語 it＝to publish …"],
        ["It was not until the 19th century that the theory was widely accepted.", "その理論が広く受け入れられたのは、19世紀になってからのことだった。", "強調構文：not until ～ を強調"]
      ] }
  ],
  trap: ["長い主語の最後の名詞に動詞を一致させない（The cost of the repairs **was** high. ○ / were ×）。", "～ing で始まる文は、動名詞の主語（Reading books is …）か分詞構文（Reading books, I …）かを、カンマと述語動詞の数で見分ける。", "名詞＋名詞＋動詞 の並びは、関係代名詞の省略を疑う（The book I bought yesterday was …）。"],
  exam: "難関大の下線部和訳では、主語が長い文や挿入を含む文がよく選ばれます。東大の二次試験でも近年、英文の下線部を和訳する問題や、誤りを含む箇所を選ぶ問題が出題されており、骨格（S と V）を正しくつかむ力が土台になります。誤り指摘では、主語の核と動詞の一致が頻出の着眼点です。※出題形式は年度により変わることがあります。",
  qs: [
    { q: "One of the reasons why many young people in big cities choose not to own a car ___ the high cost of parking.", o: ["is", "are", "being", "to be"], a: 0, ja: "大都市の多くの若者が車を持たないことを選ぶ理由の一つは、駐車場代の高さだ。", ex: "主語の核は One（単数）。of the reasons … a car は修飾部分なので、述語動詞は is。" },
    { q: "___ surprised me most about the city was how friendly the people were.", o: ["What", "That", "Which", "It"], a: 0, ja: "その街について私が最も驚いたのは、人々がいかに親切かということだった。", ex: "空所から city までが主語で、述語動詞は was。surprised の主語になり、全体で名詞節を作れるのは what（～すること・もの）。That は「～ということ」の意味で、後ろに完全な文が必要。" },
    { q: "Many experts consider ___ essential that children learn to swim at an early age.", o: ["it", "that", "this", "what"], a: 0, ja: "多くの専門家は、子どもが幼いうちに泳ぎを覚えることが不可欠だと考えている。", ex: "consider O C の O が that 節で長いので、形式目的語 it を置き、that 節を後ろに回す。" },
    { q: "It was not until she moved to London ___ she realized how little she knew about British culture.", o: ["that", "when", "before", "then"], a: 0, ja: "ロンドンに引っ越して初めて、彼女はイギリスの文化についていかに知らないかに気づいた。", ex: "It was not until ～ that …（～して初めて…した）は、not until ～ を強調した強調構文。when や before にすると強調構文の形が崩れる。" },
    { q: "What matters is not how many books you read but how carefully you read them.", o: ["大切なのは、何冊の本を読むかではなく、どれだけ注意深く読むかだ。", "何冊の本を読むかは、どれだけ注意深く読むかと同じくらい大切だ。", "注意深く本を読む人ほど、多くの本を読むことになる。", "本を多く読むよりも、注意深く読むことのほうが難しい。"], a: 0, ja: "大切なのは、何冊の本を読むかではなく、どれだけ注意深く読むかだ。", ex: "What matters（大切なこと）が主語、is が述語動詞。補語は not A but B（AではなくB）で、A・B はともに how で始まる名詞節。" },
    { q: "The rapid growth of cities in Asia, which many economists predicted decades ago, have created serious housing shortages.", o: ["The rapid growth", "which many economists", "predicted decades ago", "have created"], a: 3, fix: "The rapid growth of cities in Asia, which many economists predicted decades ago, has created serious housing shortages.", ja: "アジアの都市の急速な成長は、多くの経済学者が数十年前に予測していたことだが、深刻な住宅不足を生んでいる。", ex: "主語の核は growth（単数）。of cities in Asia と、カンマで挟まれた関係詞節は修飾部分なので、動詞は has created が正しい。" }
  ]
},
{
  id: "g34", cat: "難関大・東大：構文を読む", lv: "ADV", title: "構文把握②：並列と共通関係", base: ["g13", "g28"],
  lead: "and・or・but は「文法上同じ形のもの」を結びます。何と何が並んでいるかを見抜けるかどうかで、長文読解と和訳の精度が決まります。",
  sec: [
    { h: "並列は「同じ形」を探す",
      t: "等位接続詞（and / but / or / nor）は、**名詞と名詞、動詞と動詞、to 不定詞と to 不定詞、節と節**のように、同じ文法上の形を結びます。\n**and の直後の形**（～ing か、原形か、to＋原形か、前置詞句か）を確かめ、前にある同じ形を探します。並ぶものどうしが離れていることもあります。",
      ex: [
        ["The new policy aims to reduce costs and to improve the quality of public services.", "新しい政策は、費用を削減し、公共サービスの質を高めることを目指している。", "to reduce と to improve が並列"],
        ["She spent the summer reading novels, visiting museums, and learning to cook.", "彼女は小説を読んだり、美術館を訪れたり、料理を習ったりして夏を過ごした。", "spend 時間 ～ing の ～ing が3つ並列"],
        ["Scientists who study the brain and doctors who treat patients often see the problem differently.", "脳を研究する科学者と、患者を治療する医師とでは、その問題の見え方が違うことが多い。", "関係詞節つきの名詞どうしが並列し、全体が主語"]
      ] },
    { h: "共通関係：1つの語を2つが共有する",
      t: "**A and B ＋ 共通の語**（または **共通の語 ＋ A and B**）の形で、1つの目的語や修飾語を2つの語が共有することがあります。\n**the causes and effects of climate change**：of climate change は causes と effects の両方にかかる。\n前置詞が2つ続いて名詞が1つ、という形（**depend on, and benefit from, the sea**）も共通関係です。カンマで挟まれた部分を飛ばして読むと、つながりが見えます。",
      ex: [
        ["Many coastal towns depend on, and benefit from, the sea.", "多くの沿岸の町は、海に頼り、海から恩恵を受けている。", "on と from が the sea を共有"],
        ["We need to understand the causes and consequences of poverty.", "私たちは貧困の原因と結果を理解する必要がある。", "of poverty が causes と consequences の両方にかかる"],
        ["Children learn languages not by memorizing rules but by using them.", "子どもは規則を暗記することによってではなく、使うことによって言語を学ぶ。", "not A but B：by ～ing どうしが並列"]
      ] },
    { h: "相関接続詞では形をそろえる",
      t: "**both A and B / either A or B / neither A nor B / not only A but (also) B / not A but B / A as well as B** では、**A と B を同じ形**にそろえます（英作文で減点されやすい点）。\n主語になるときの動詞の一致：**either A or B / neither A nor B / not only A but also B** は **B に一致**、**A as well as B** は **A に一致**が原則です。",
      ex: [
        ["The plan is not only expensive but also difficult to carry out.", "その計画は費用がかかるだけでなく、実行するのも難しい。", "形容詞どうしをそろえる"],
        ["Neither the students nor the teacher was aware of the change.", "生徒たちも先生も、その変更に気づいていなかった。", "動詞は近いほう（the teacher）に一致"],
        ["The teacher, as well as the students, was surprised by the result.", "生徒たちだけでなく先生も、その結果に驚いた。", "A as well as B は A に一致"]
      ] }
  ],
  trap: ["and の後ろが ～ing なら、前にある ～ing を探す。直前の名詞と並べて読まない。", "not only A but also B の A と B は同じ形にそろえる（× not only to study but also working）。", "neither A nor B が主語のとき、動詞は B に一致させる（話し言葉では複数扱いも見られるが、試験では B に一致が無難）。"],
  exam: "東大を含む難関大の和訳問題では、何と何が並列されているかの把握が採点のポイントになりやすい部分です。誤り指摘問題では、並列された語句の形のずれ（to do と doing の混在など）がよく狙われます。英作文でも、並列の形をそろえるだけで文の質が上がります。",
  qs: [
    { q: "The program helps students develop critical thinking, express their ideas clearly, and ___ with people from different backgrounds.", o: ["work", "working", "to working", "worked"], a: 0, ja: "そのプログラムは、学生が批判的思考を身につけ、考えを明確に表現し、さまざまな背景を持つ人々と協力するのを助ける。", ex: "help O＋原形 の原形（develop, express）が3つ並列しているので、3つ目も原形の work。" },
    { q: "Good teachers know not only what to teach but also ___.", o: ["how to teach it", "teaching it how", "how they teaching", "to teach it how"], a: 0, ja: "よい教師は、何を教えるかだけでなく、それをどう教えるかも知っている。", ex: "not only A but also B の A が what to teach（疑問詞＋to 不定詞）なので、B も how to teach it とそろえる。" },
    { q: "Neither the manager nor the employees ___ informed about the decision.", o: ["were", "was", "has been", "being"], a: 0, ja: "部長も従業員たちも、その決定について知らされていなかった。", ex: "neither A nor B が主語のとき、動詞は B（the employees＝複数）に一致させる。" },
    { q: "Many people in the region depend ___, and are threatened by, the river.", o: ["on", "in", "to", "at"], a: 0, ja: "その地域の多くの人々は、川に頼っていると同時に、川に脅かされてもいる。", ex: "depend on と are threatened by が the river を共有する共通関係。カンマで挟まれた部分を飛ばすと depend on the river となる。" },
    { q: "Much of what we know about early human history comes not from written records but from the study of objects left behind.", o: ["初期の人類史について私たちが知っていることの多くは、書かれた記録からではなく、残された物の研究から得られている。", "初期の人類史についての書かれた記録は少なく、残された物もほとんど研究されていない。", "私たちは初期の人類史について、書かれた記録と残された物の研究の両方から多くを知っている。", "残された物を研究しなければ、書かれた記録から初期の人類史を知ることはできない。"], a: 0, ja: "初期の人類史について私たちが知っていることの多くは、書かれた記録からではなく、残された物の研究から得られている。", ex: "主語は Much of what we know about early human history、述語動詞は comes。not from A but from B（AからではなくBから）で、from 句どうしが並列。left behind は objects を後ろから修飾する過去分詞。" },
    { q: "The aim of the course is to help students read critically, writing clearly, and think independently.", o: ["The aim of the course", "to help students", "writing clearly", "think independently"], a: 2, fix: "The aim of the course is to help students read critically, write clearly, and think independently.", ja: "その講座の目的は、学生が批判的に読み、明快に書き、自分の頭で考えられるようにすることだ。", ex: "help students の後に原形 read / write / think が並列する。writing だけ形がずれているので write に直す。" }
  ]
},
{
  id: "g35", cat: "難関大・東大：構文を読む", lv: "ADV", title: "関係詞の発展（前置詞＋関係詞・what・as）", base: ["g11", "g12"],
  lead: "難関大の英文では、前置詞＋関係代名詞、関係詞節の中にさらに節が入る形、what を使った慣用表現が頻出です。関係詞節が「どの名詞を、どこまで修飾しているか」を見抜く練習をします。",
  sec: [
    { h: "前置詞＋関係代名詞と、数量表現＋of which / whom",
      t: "関係詞節の中で前置詞の目的語になる関係代名詞は、前置詞ごと前に出せます（**the house in which he lived**）。この形では **that は使えません**。\n**数量・部分＋of which / of whom**：some of which（そのうちのいくつか）、most of whom（そのうちの大部分）、the price of which（その値段）などは、非制限用法でよく使われます。",
      ex: [
        ["The ease with which children learn languages has long fascinated linguists.", "子どもが言語を学ぶ容易さは、長いあいだ言語学者を魅了してきた。", "children learn languages with ease"],
        ["The company hired fifty new employees, most of whom had no previous experience.", "その会社は新入社員を50人雇ったが、その大部分は未経験者だった。", "most of whom＝most of the employees"],
        ["This is the principle on which the whole system is based.", "これがシステム全体の基礎となっている原理だ。", "the system is based on the principle"]
      ] },
    { h: "関係詞節の中に「S think」などが入る形",
      t: "**the man who I thought was honest**（正直だと私が思った男）のように、関係代名詞の直後に **I think / I believe / they say** などが入ることがあります。この I thought を（ ）でくくると、who was honest という形が見えます。\nこのとき関係代名詞は節の中で**主語**なので、**whom ではなく who** を使います。",
      ex: [
        ["He hired a man who he believed was the best engineer in the country.", "彼は、国内で最高の技術者だと信じた男性を雇った。", "who (he believed) was …"],
        ["Do what you think is right, regardless of what others say.", "他人が何と言おうと、自分が正しいと思うことをしなさい。", "what (you think) is right"]
      ] },
    { h: "what の慣用表現と、関係代名詞のように働く as・than",
      t: "**what S is（今のS）／what S was・used to be（昔のS）**、**what is more（さらに）**、**what is called / what we call（いわゆる）**、**A is to B what C is to D（AとBの関係はCとDの関係と同じ）**。\n**as**：such / the same / as ～ と組む（**such books as** you can understand）。また、文全体を受ける（**As is often the case**, he was late.）。\n**than**：比較級と組んで関係代名詞のように働く（More food **than** was needed was prepared.）。",
      ex: [
        ["Water is to fish what air is to human beings.", "魚にとっての水は、人間にとっての空気と同じだ。", "A is to B what C is to D"],
        ["She is not what she was ten years ago.", "彼女は10年前の彼女ではない。", "what she was＝昔の彼女"],
        ["As is often the case with new technologies, the first models were expensive.", "新しい技術にはよくあることだが、最初の機種は高価だった。", "as は主節の内容を受ける"]
      ] }
  ],
  trap: ["前置詞の直後に関係代名詞 that は置けない（× the house in that he lived）。", "who I thought was … の who を whom にしない（節の中で was の主語）。", "what は先行詞を含むので、先行詞の名詞と一緒に使わない（× the thing what）。"],
  exam: "東大を含む難関大の和訳問題では、前置詞＋関係代名詞（the ease with which …）や、関係詞節の中に節が入る形が下線部によく含まれます。語句の並べかえ問題でも、what や前置詞＋which を正しい位置に置けるかが問われます。",
  qs: [
    { q: "The speed ___ the virus spread surprised even the experts.", o: ["at which", "in which", "which", "by that"], a: 0, ja: "ウイルスが広がった速さは、専門家さえも驚かせた。", ex: "the virus spread at a speed（～の速さで広がる）の at が which の前に出た形。前置詞＋that は使えない。" },
    { q: "The museum has over 2,000 paintings, many of ___ were donated by local collectors.", o: ["which", "them", "that", "whom"], a: 0, ja: "その美術館には2,000点を超える絵画があり、その多くは地元の収集家から寄贈されたものだ。", ex: "カンマ＋many of which（そのうちの多く）。them にすると2つの節をつなぐ接続詞がなくなる。物なので whom ではなく which。" },
    { q: "She married a man ___ she thought would make her happy.", o: ["who", "whom", "which", "what"], a: 0, ja: "彼女は、自分を幸せにしてくれると思った男性と結婚した。", ex: "she thought を（ ）でくくると who would make her happy。関係代名詞は would make の主語なので who。" },
    { q: "Reading is to the mind ___ exercise is to the body.", o: ["what", "which", "that", "as"], a: 0, ja: "読書と精神の関係は、運動と身体の関係と同じだ。", ex: "A is to B what C is to D（AとBの関係はCとDの関係に等しい）。" },
    { q: "He is no longer the man he used to be, nor is his country what it was twenty years ago.", o: ["彼はもはや以前の彼ではなく、彼の国も20年前の国ではない。", "彼は昔の自分に戻りたいと思っているが、彼の国は20年前とは違う。", "彼は20年前から同じ人物であり、彼の国も変わっていない。", "彼が昔のような人でなくなったのは、20年前に国が変わったからだ。"], a: 0, ja: "彼はもはや以前の彼ではなく、彼の国も20年前の国ではない。", ex: "the man he used to be（以前の彼）と what it was（以前のその国）は同じ発想の表現。nor is his country … は否定の nor の後の倒置で、「…もまた～ない」。" },
    { q: "The house in that the writer spent his childhood has been turned into a museum.", o: ["in that", "spent his childhood", "has been turned", "into a museum"], a: 0, fix: "The house in which the writer spent his childhood has been turned into a museum.", ja: "その作家が子ども時代を過ごした家は、博物館に改装された。", ex: "前置詞の直後に関係代名詞 that は置けない。in which（または where）にする。" }
  ]
},
{
  id: "g36", cat: "難関大・東大：構文を読む", lv: "ADV", title: "that と as の識別", base: ["g11", "g13"],
  lead: "that と as は、1語で何役もこなす語です。読解でも和訳でも、まず「この that / as は何か」を決めることが正確な理解の出発点になります。",
  sec: [
    { h: "that の5つの働き",
      t: "**① 関係代名詞**：後ろが不完全な文（主語か目的語が欠けている）。the book **that** I read\n**② 名詞節を作る接続詞**：後ろが完全な文。「～ということ」。I know **that** he is right.\n**③ 同格の that**：the fact / idea / news / possibility / belief ＋ that ＋完全な文。「～という…」\n**④ 強調構文**：It is ～ **that** …\n**⑤ 副詞節の一部**：so ～ that / such ～ that（とても～なので）、so that（～するために）、now that（今や～なので）、in that（～という点で）",
      ex: [
        ["The fact that he had no experience did not stop him.", "経験がないという事実も、彼を止めなかった。", "同格の that：後ろは完全な文"],
        ["The fact that he mentioned in his speech surprised everyone.", "彼が演説で触れたその事実は、皆を驚かせた。", "関係代名詞：mentioned の目的語が欠けている"],
        ["Humans differ from other animals in that they use complex language.", "人間は、複雑な言語を使うという点でほかの動物と異なる。", "in that ～：～という点で"]
      ] },
    { h: "as の主な働き",
      t: "**接続詞**：時（～するとき・～しながら）、理由（～なので）、様態（～のように）、比例（～するにつれて）、譲歩（形容詞＋as S V：～だけれども）。\n**前置詞**：～として（as a teacher）。\n**関係代名詞のような働き**：such ～ as、the same ～ as、文全体を受ける as。\n見分け方：**後ろが名詞だけなら前置詞**、**S＋V があれば接続詞**。接続詞の場合は、主節との関係から意味を決めます。",
      ex: [
        ["As we get older, we tend to become more cautious.", "年をとるにつれて、私たちは慎重になりがちだ。", "比例：get older と become more cautious が連動"],
        ["Young as he was, he was given a position of great responsibility.", "若かったけれども、彼は大きな責任のある地位を与えられた。", "譲歩：形容詞＋as S V"],
        ["Leave things as they are until the police arrive.", "警察が来るまで、物はそのままにしておきなさい。", "様態：そのままの状態で"]
      ] },
    { h: "so that と、so ～ that・such ～ that",
      t: "**so that S can / will ～**：～するために（目的）。**, so that ～**（カンマあり）：その結果～。\n**so＋形容詞・副詞＋that**／**such (a)＋形容詞＋名詞＋that**：とても～なので…。\n**so＋形容詞＋a＋名詞**の語順（so difficult a problem）にも注意します。",
      ex: [
        ["She spoke slowly so that everyone could follow her.", "全員がついてこられるように、彼女はゆっくり話した。", "目的"],
        ["It was such a difficult problem that no one could solve it.", "それはとても難しい問題だったので、だれも解けなかった。", "such a＋形容詞＋名詞＋that"]
      ] }
  ],
  trap: ["同格の that と関係代名詞の that は、後ろが完全な文かどうかで見分ける。", "形容詞＋as S V（Young as he was）は「理由」ではなく「譲歩」で訳すのが基本（文脈によっては理由の意味になることもある）。", "so that は目的、such ～ that は結果・程度。訳し分けを混同しない。"],
  exam: "難関大の和訳問題では、同格の that や in that、譲歩の as などの識別が採点のポイントになります。誤り指摘問題では、関係代名詞と接続詞の取り違え（後ろが完全な文かどうか）がよく狙われます。",
  qs: [
    { q: "There is growing evidence ___ regular exercise improves memory.", o: ["that", "which", "what", "as"], a: 0, ja: "定期的な運動が記憶力を高めるという証拠が増えている。", ex: "後ろが完全な文なので同格の that（evidence の内容を説明する）。which / what の後ろは不完全な文になる。" },
    { q: "Tired ___ she was, she kept working until midnight.", o: ["as", "so", "since", "because"], a: 0, ja: "疲れていたけれども、彼女は真夜中まで働き続けた。", ex: "形容詞＋as S V で「～だけれども」（譲歩）。" },
    { q: "Language is unique ___ it allows us to talk about things that do not exist.", o: ["in that", "so that", "now that", "such that"], a: 0, ja: "言語は、存在しないものについて語ることを可能にするという点で独特だ。", ex: "in that ～（～という点で）。so that は目的・結果、now that は「今や～なので」。" },
    { q: "It was ___ that we decided to have lunch in the park.", o: ["such a beautiful day", "so beautiful day", "such beautiful a day", "so a beautiful day"], a: 0, ja: "とても天気のよい日だったので、私たちは公園で昼食をとることにした。", ex: "such a＋形容詞＋名詞＋that。so を使うなら so beautiful a day の語順になる。" },
    { q: "As the population ages, the demand for medical care will continue to rise.", o: ["人口が高齢化するにつれて、医療の需要は増え続けるだろう。", "人口が高齢化しているので、医療の需要はもう増えないだろう。", "人口が高齢化しても、医療の需要は増え続けるとは限らない。", "人口の高齢化と同じように、医療の需要も増え続けてきた。"], a: 0, ja: "人口が高齢化するにつれて、医療の需要は増え続けるだろう。", ex: "As S V は、変化を表す動詞（age・grow・increase など）と組むと「～するにつれて」（比例）の意味になりやすい。主節の continue to rise と連動している点に注目。" },
    { q: "The idea which everyone should learn a foreign language has become widely accepted in recent years.", o: ["The idea which", "should learn", "has become", "in recent years"], a: 0, fix: "The idea that everyone should learn a foreign language has become widely accepted in recent years.", ja: "だれもが外国語を学ぶべきだという考えは、近年広く受け入れられるようになった。", ex: "which の後ろが完全な文（everyone should learn a foreign language）なので、関係代名詞ではなく同格の that が必要。" }
  ]
},
{
  id: "g37", cat: "難関大・東大：構文を読む", lv: "ADV", title: "分詞構文の発展（独立分詞構文・with＋O＋分詞）", base: ["g09", "g10"],
  lead: "難関大では、主語が異なる分詞構文（独立分詞構文）、with＋O＋分詞、being の省略など、形の見えにくい分詞構文が出ます。意味上の主語と時の関係を確かめながら読む練習をします。",
  sec: [
    { h: "独立分詞構文と慣用表現",
      t: "分詞の意味上の主語が主節の主語と**違う**ときは、分詞の前に主語を置きます（独立分詞構文）。\n**The work done**, we went home.（仕事が終わったので、私たちは帰宅した）\n主語を示さない慣用表現：**generally speaking**（一般的に言えば）、**judging from**（～から判断すると）、**considering**（～を考えると）、**given**（～を考えると）、**provided / providing (that)**（～という条件で）、**weather permitting**（天気がよければ）。",
      ex: [
        ["There being no bus service, we had to walk to the station.", "バスの便がなかったので、私たちは駅まで歩かなければならなかった。", "There is 構文の分詞構文"],
        ["Given the current situation, the plan seems unrealistic.", "現状を考えると、その計画は非現実的に思える。", "given＝～を考慮すると"],
        ["All things considered, the conference was a success.", "すべてを考慮すると、その会議は成功だった。", "All things が considered の意味上の主語"]
      ] },
    { h: "with＋O＋分詞（付帯状況）",
      t: "**with＋O＋現在分詞**：O が～している状態で。**with＋O＋過去分詞**：O が～された状態で。\nO と分詞の関係が**能動なら～ing、受動なら過去分詞**です（with his eyes **closed**：目は「閉じられた」状態）。形容詞・副詞・前置詞句も置けます（with your mouth **full**）。\n理由の意味（～なので）で使われることも多くあります。",
      ex: [
        ["He listened to the music with his eyes closed.", "彼は目を閉じて音楽を聴いた。", "eyes are closed（受動）→ closed"],
        ["With prices rising, many families are cutting back on spending.", "物価が上がっているので、多くの家庭が支出を減らしている。", "prices are rising（能動）→ rising"]
      ] },
    { h: "完了形・受動の分詞構文と、being の省略",
      t: "主節より前のことは **having＋過去分詞**（Having finished the report, she …）。\n受動の分詞構文は **(being) 過去分詞** で、being はふつう省略されます（**Written** in plain English, the book is easy to read.）。\n否定は分詞の**直前**に not / never を置きます（**Not knowing** what to say, …）。",
      ex: [
        ["Written in simple English, the book is popular among beginners.", "やさしい英語で書かれているので、その本は初心者に人気がある。", "Being written の being を省略"],
        ["Never having lived abroad, she found it hard to adjust to the new culture.", "外国に住んだことがなかったので、彼女は新しい文化に慣れるのに苦労した。", "否定語は分詞の前"],
        ["Having lost his job, he decided to start his own business.", "職を失ったので、彼は自分で事業を始めることにした。", "主節より前の出来事"]
      ] }
  ],
  trap: ["分詞の意味上の主語が主節の主語と違うのに主語を書かない形（懸垂分詞）は誤り（× Walking along the street, a car hit him.）。", "with＋O＋分詞 は、O と分詞の関係（する／される）で ～ing と過去分詞を選ぶ。", "分詞構文の意味（時・理由・条件・譲歩・付帯状況）は文脈で決める。和訳では「～して」で済ませず、つながりを明確にする。"],
  exam: "誤り指摘問題では、意味上の主語のずれた分詞構文や with＋O＋分詞の形がよく狙われます。和訳問題では、分詞構文を「理由」「条件」などに訳し分けられるかが問われます。",
  qs: [
    { q: "___ no objection, the chairperson closed the meeting.", o: ["There being", "There was", "Being", "It being"], a: 0, ja: "異議がなかったので、議長は会議を終えた。", ex: "There is no objection を分詞構文にすると There being no objection。主節の主語（the chairperson）と意味上の主語が違うので、there を残す。" },
    { q: "She sat on the bench with her legs ___.", o: ["crossed", "crossing", "to cross", "cross"], a: 0, ja: "彼女は脚を組んでベンチに座っていた。", ex: "with＋O＋分詞：脚は「組まれた」状態なので過去分詞 crossed。" },
    { q: "___ from a distance, the rock looks like a human face.", o: ["Seen", "Seeing", "Having seen", "To see"], a: 0, ja: "遠くから見ると、その岩は人の顔のように見える。", ex: "主語 the rock は「見られる」側なので、受動の分詞構文 (Being) seen。" },
    { q: "___ what to do, he asked his teacher for advice.", o: ["Not knowing", "Knowing not", "Not known", "Having not known"], a: 0, ja: "どうしたらよいかわからなかったので、彼は先生に助言を求めた。", ex: "分詞構文の否定は not を分詞の直前に置く。Having not known は語順が誤り（Not having known なら可）。" },
    { q: "Other things being equal, people tend to prefer what is familiar to what is new.", o: ["ほかの条件が同じなら、人は新しいものより慣れ親しんだものを好む傾向がある。", "ほかの人と同じように、人は新しいものと慣れ親しんだものを同じくらい好む。", "ほかのものと等しくなるように、人は慣れたものを新しいものに変えようとする。", "ほかの人々が平等である限り、人は新しいものを好むようになる。"], a: 0, ja: "ほかの条件が同じなら、人は新しいものより慣れ親しんだものを好む傾向がある。", ex: "Other things being equal（ほかの条件が同じなら）は独立分詞構文の慣用表現。prefer A to B（BよりAを好む）の A・B に what 節が入っている。" },
    { q: "He sat quietly on the sofa with his arms folding, listening to the radio.", o: ["sat quietly", "with his arms", "folding", "listening to the radio"], a: 2, fix: "He sat quietly on the sofa with his arms folded, listening to the radio.", ja: "彼は腕を組んで、ラジオを聞きながら静かにソファに座っていた。", ex: "with＋O＋分詞：腕は「組まれた」状態なので過去分詞 folded。listening to the radio は主語の he が「聞いている」ので現在分詞で正しい。" }
  ]
},
{
  id: "g38", cat: "難関大・東大：構文を読む", lv: "ADV", title: "倒置・強調・省略の発展（読解で見抜く）", base: ["g25", "g24"],
  lead: "難関大の英文では、語順が SVO の基本どおりに並ばない文が多く出ます。倒置・前置・後置・省略が起きている文を見抜き、元の語順に戻して理解する練習をします。",
  sec: [
    { h: "否定語・only が文頭に出る倒置",
      t: "**否定の副詞（Never, Rarely, Seldom, Little, Hardly, No sooner, Not until, Under no circumstances など）**や **Only＋副詞（句・節）**が文頭に出ると、後ろは**疑問文と同じ語順**になります。\n**Little did I dream that …**（…とは夢にも思わなかった）、**Only then did I realize …**（そのとき初めて…に気づいた）。\n**So＋形容詞＋be＋S＋that …**、**Such is S that …** も同じ仲間です。",
      ex: [
        ["Only after the accident did the company review its safety rules.", "その事故が起きて初めて、会社は安全規則を見直した。", "Only after ～ ＋ did S V"],
        ["Little did she know that her life was about to change.", "自分の人生が大きく変わろうとしていることを、彼女は知る由もなかった。", "Little＋疑問文の語順"],
        ["So complex is the problem that no single solution will work.", "その問題はあまりに複雑なので、単一の解決策ではうまくいかないだろう。", "So＋形容詞＋be＋S＋that"]
      ] },
    { h: "補語・場所の語句が前に出る倒置と、目的語の前置",
      t: "**補語（形容詞・分詞）**や**場所・方向の副詞句**が文頭に出ると、**V＋S** の語順になることがあります（主語が長いときや、新しい情報のとき）。\n**Among the guests was a famous actor.**（客の中に有名な俳優がいた：主語は a famous actor）\n目的語が前に出るときは **O＋S＋V**（倒置なし）です。文頭の名詞のあとに S＋V が続き、動詞の後ろに目的語がないときは、目的語の前置を疑います。",
      ex: [
        ["Among the most serious problems is the lack of clean water.", "最も深刻な問題の一つが、きれいな水の不足だ。", "主語は the lack of clean water"],
        ["Gone are the days when people wrote letters by hand.", "人々が手紙を手書きしていた時代は過ぎ去った。", "補語 Gone が文頭：The days … are gone"],
        ["What he said I could not understand at all.", "彼の言ったことが、私にはまったく理解できなかった。", "目的語 What he said が前置"]
      ] },
    { h: "後置と省略",
      t: "**長い目的語は後ろへ回る**：make clear **that …**、bring to light **the fact that …**。\n**省略**：① 時・条件・譲歩の接続詞の後の **S＋be**（When **(you are)** in doubt, ask.）② 比較の than / as の後 ③ 繰り返しの回避（代不定詞 to：I didn't want to go, but I had **to**.）。\n省略を補うときは、**直前にある同じ形**から補うのが原則です。",
      ex: [
        ["The study made clear the risks involved in the new treatment.", "その研究によって、新しい治療に伴うリスクが明らかになった。", "make O clear の O が長いので後置"],
        ["If necessary, we will extend the deadline.", "必要なら、締め切りを延長します。", "If (it is) necessary"],
        ["Some people prefer to work alone; others, in teams.", "一人で働くのを好む人もいれば、チームで働くのを好む人もいる。", "others (prefer to work) in teams"]
      ] }
  ],
  trap: ["Not until ～ / Only ～ が文頭のとき、主節は疑問文の語順にする（× Only then I realized）。", "V＋S の倒置では、動詞は後ろの主語に一致させる（Among the problems **is** the lack …）。", "目的語が前置された文に、もう一度 it などの目的語を入れない（× What he said I could not understand it.）。"],
  exam: "難関大の和訳問題では、倒置や省略を元の語順に戻して正しく訳せるかがよく問われます。語句の並べかえ問題では、否定語の倒置（Little did I …、Not until … did …）の語順が定番です。",
  qs: [
    { q: "Not until the 1990s ___ widely used by the general public.", o: ["was the Internet", "the Internet was", "did the Internet", "the Internet has been"], a: 0, ja: "1990年代になって初めて、インターネットは一般の人々に広く使われるようになった。", ex: "Not until ～ が文頭に出ると、主節は疑問文の語順になる。be 動詞の文なので was the Internet。" },
    { q: "Rarely ___ such a beautiful sunset.", o: ["have I seen", "I have seen", "I saw", "seen I have"], a: 0, ja: "あれほど美しい夕日はめったに見たことがない。", ex: "否定の副詞 Rarely が文頭なので、have I seen の倒置。" },
    { q: "Among the speakers at the conference ___ two Nobel Prize winners.", o: ["were", "was", "being", "has been"], a: 0, ja: "その会議の講演者の中には、2人のノーベル賞受賞者がいた。", ex: "範囲を表す Among ～ が文頭に出た倒置。主語は two Nobel Prize winners（複数）なので were。" },
    { q: "Such ___ of the explosion that windows were broken two blocks away.", o: ["was the force", "the force was", "did the force", "was force"], a: 0, ja: "爆発の威力はすさまじく、2ブロック離れた場所の窓まで割れた。", ex: "The force of the explosion was such that …（爆発の威力は非常に大きかったので…）の such が文頭に出て、was the force と倒置した形。" },
    { q: "Gone are the days when a single income could support a whole family.", o: ["1人の収入で家族全員を養えた時代は過ぎ去った。", "1人の収入で家族全員を養える日がやがて来るだろう。", "家族全員が働いても、1人分の収入にしかならない日々が続いた。", "1人の収入で家族全員を養うのは、昔から難しいことだった。"], a: 0, ja: "1人の収入で家族全員を養えた時代は過ぎ去った。", ex: "補語 Gone が文頭に出て、are the days … と V＋S の語順になった倒置。元の語順は The days when … are gone。" },
    { q: "Only by working together we can solve the problems that face our society.", o: ["by working together", "we can solve", "the problems", "that face"], a: 1, fix: "Only by working together can we solve the problems that face our society.", ja: "協力することによってのみ、私たちは社会が直面する問題を解決できる。", ex: "Only＋副詞句が文頭に出ると、主節は疑問文の語順（can we solve）になる。" }
  ]
},
{
  id: "g39", cat: "難関大・東大：重要文法の発展", lv: "ADV", title: "仮定法の発展（if のない仮定法・倒置）", base: ["g22", "g23"],
  lead: "難関大の英文では、if が出てこない仮定法がよく使われます。助動詞の過去形（would / could / might）に気づき、「どこに仮定が隠れているか」を見抜く練習をします。",
  sec: [
    { h: "if を使わない仮定法",
      t: "仮定の意味は、if 節以外にも隠れています。\n**主語**：A wise person would not say such a thing.（賢い人なら…）\n**副詞句**：**with / without / but for**（～があれば・なければ）、in your position（あなたの立場なら）など\n**otherwise**（さもなければ）、**to 不定詞**（To hear him speak, you would …：彼が話すのを聞いたら）\n**would / could / might** が出てきたら、「仮定はどこにあるか」を探します。",
      ex: [
        ["Without your help, I could not have finished the project on time.", "あなたの助けがなければ、私はその計画を期限内に終えられなかっただろう。", "Without ～＝If it had not been for ～"],
        ["I was very busy; otherwise, I would have joined you.", "とても忙しかった。そうでなければ、ご一緒していたのですが。", "otherwise＝if I had not been busy"],
        ["A true friend would have told you the truth.", "本当の友人なら、あなたに真実を伝えていただろう。", "主語に仮定が含まれる"]
      ] },
    { h: "if の省略による倒置と、仮定法未来",
      t: "if を省略すると、**Were S / Had S / Should S** が文頭に出ます（書き言葉で頻出）。\n**Had I known** the truth, I would have acted differently.（＝If I had known）\n**Were it not for** ～（～がなければ）、**Had it not been for** ～（～がなかったら）\n**Should S ～**（万一～なら）：主節は命令文や will も可。**If S were to ～**：仮に～するとしたら。",
      ex: [
        ["Had it not been for the Internet, the movement would not have spread so quickly.", "インターネットがなかったら、その運動はあれほど速く広がらなかっただろう。", "If it had not been for の倒置"],
        ["Should you have any questions, please contact us.", "万一ご質問がありましたら、ご連絡ください。", "If you should have の倒置"],
        ["If the sun were to disappear, life on Earth would end.", "仮に太陽が消えたとしたら、地球の生命は終わるだろう。", "were to：仮の想定"]
      ] },
    { h: "仮定法を使った重要表現",
      t: "**It is (high / about) time S＋過去形**：もう～してもよいころだ。\n**I would rather S＋過去形**：S に～してほしい（のだが）。\n**as if / as though**：まるで～のように（主節と同時なら過去形、それより前なら過去完了）。\n**if only**：～でさえあれば（強い願望）。\n**要求・提案の that 節**：suggest / insist / demand / recommend / It is essential that S **(should)＋原形**（仮定法現在）。",
      ex: [
        ["It is high time we took action on climate change.", "そろそろ気候変動に対して行動を起こすべき時だ。", "It is time＋過去形"],
        ["The committee recommended that the plan be postponed.", "委員会は、その計画を延期するよう勧告した。", "be は仮定法現在（should be も可）"],
        ["If only I had listened to my parents.", "両親の言うことを聞いてさえいればよかったのに。", "過去の事実に反する願望"]
      ] }
  ],
  trap: ["混合仮定法：if 節が過去完了でも、主節が現在のことなら would＋原形（If I had studied harder, I would be a doctor now.）。", "仮定法現在の that 節では、三人称単数でも動詞は原形（× recommended that the plan is postponed）。", "倒置の Had I known を疑問文と読み違えない（文末が疑問符でないことを確認する）。"],
  exam: "難関大の和訳問題では、if のない仮定法（without・otherwise・主語に含まれる仮定）を「～なら」「～がなければ」と訳出できるかが問われます。英作文でも、仮定法を正しく使えると表現の幅が広がります。",
  qs: [
    { q: "___ the support of their families, many of the athletes would have given up.", o: ["Without", "Unless", "Except", "Despite"], a: 0, ja: "家族の支えがなかったら、選手たちの多くはあきらめていただろう。", ex: "主節の would have given up から仮定法過去完了とわかる。名詞句を続けて「～がなければ」を表すのは Without（＝If it had not been for）。Unless は接続詞なので後ろに S V が必要。" },
    { q: "___ I known about the traffic jam, I would have taken the train.", o: ["Had", "If", "Have", "Did"], a: 0, ja: "交通渋滞のことを知っていたら、電車に乗っていたのに。", ex: "If I had known の if を省略した倒置 Had I known。If を使うなら If I had known の形が必要。" },
    { q: "It is about time the government ___ the problem seriously.", o: ["took", "takes", "will take", "has taken"], a: 0, ja: "そろそろ政府がその問題に真剣に取り組んでもよいころだ。", ex: "It is (about / high) time S＋過去形（もう～してもよいころだ）。" },
    { q: "The doctor insisted that he ___ smoking immediately.", o: ["stop", "stops", "stopped", "would stop"], a: 0, ja: "医師は、彼がすぐにたばこをやめるよう強く求めた。", ex: "insist が「強く要求する」の意味のとき、that 節は (should)＋原形。主語が三人称単数でも stop のまま。" },
    { q: "If she had taken the job in Tokyo, she ___ a very different life now.", o: ["would be living", "would have lived", "will live", "had lived"], a: 0, ja: "もし東京でその仕事に就いていたら、彼女は今ごろまったく違う生活を送っているだろう。", ex: "if 節は過去の事実に反する仮定（過去完了）、主節は now があるので現在の事実に反する仮定（would＋原形）。混合仮定法。" },
    { q: "A little more care would have prevented the accident.", o: ["もう少し注意していれば、その事故は防げただろう。", "もう少し注意しても、その事故は防げなかっただろう。", "その事故のあと、人々はもう少し注意するようになった。", "その事故を防ぐには、さらに多くの注意が必要になるだろう。"], a: 0, ja: "もう少し注意していれば、その事故は防げただろう。", ex: "主語 A little more care に「もう少し注意していれば」という仮定が含まれている。would have prevented は仮定法過去完了で、実際には事故は起きた。" }
  ]
},
{
  id: "g40", cat: "難関大・東大：重要文法の発展", lv: "ADV", title: "比較の発展（no more than・比較対象）", base: ["g20", "g21"],
  lead: "比較の重要構文は、意味を丸暗記するより「何と何を、どの方向で比べているか」を考えると正確に訳せます。英作文で減点されやすい「比較対象のずれ」も扱います。",
  sec: [
    { h: "no / not を含む比較表現",
      t: "**no more than**＝only（～しか）、**no less than**＝as many / much as（～も）。\n**not more than**＝at most（多くても）、**not less than**＝at least（少なくとも）。\n**A is no more B than C is (B)**：AがBでないのは、CがBでないのと同じ（両方を否定）。\n**A is no less B than C is**：AはCと同様にBだ（両方を肯定）。\n**no＋比較級**は「差がゼロ」と考えると理解しやすくなります。",
      ex: [
        ["He paid no more than ten dollars for the book.", "彼はその本にたった10ドルしか払わなかった。", "no more than＝only（少ないという気持ち）"],
        ["A whale is no more a fish than a horse is.", "鯨が魚でないのは、馬が魚でないのと同じだ。", "両方を否定"],
        ["She is no less talented than her famous sister.", "彼女は有名な姉に劣らず才能がある。", "両方を肯定"]
      ] },
    { h: "比較対象をそろえる（英作文の頻出ミス）",
      t: "比べるものは、**同じ種類のもの**にそろえます。\n× The population of Tokyo is larger than **Osaka**.（人口と都市を比べている）\n○ The population of Tokyo is larger than **that of Osaka**.\n複数名詞なら **those of** を使います。\n**倍数表現**：X times as ～ as / X times the＋名詞＋of（three times the size of …）。",
      ex: [
        ["The climate of Japan is milder than that of Canada.", "日本の気候はカナダの気候より穏やかだ。", "that＝the climate"],
        ["The new airport is three times the size of the old one.", "新しい空港は、古い空港の3倍の大きさだ。", "X times the 名詞 of"]
      ] },
    { h: "the＋比較級と、比較級・最上級の強調",
      t: "**The＋比較級 S V, the＋比較級 S V**：～すればするほど…。前半が条件、後半が結果。\n**all the＋比較級＋for / because ～**：～なのでそれだけいっそう。\n**none the＋比較級＋for ～**：～だからといって少しも…ない。\n比較級の強調は **much / far / even / still / a lot**、最上級の強調は **by far / much / the very**。very は比較級を強調できません。",
      ex: [
        ["The more you practice, the more confident you will become.", "練習すればするほど、自信がつくだろう。", "the＋比較級, the＋比較級"],
        ["I like him all the better for his honesty.", "彼は正直なので、私はいっそう彼が好きだ。", "all the＋比較級＋for"],
        ["He is none the wiser for all his reading.", "あれほど本を読んでも、彼は少しも賢くなっていない。", "none the＋比較級"]
      ] }
  ],
  trap: ["比較対象のずれ（the population of A と B を比べる）は that of / those of で直す。", "no more than（～しか）と not more than（多くても）を混同しない。", "the＋比較級 の構文で、形容詞・副詞を比較級と離さない（× The more you become confident → ○ The more confident you become）。"],
  exam: "難関大の英作文では、比較対象のずれ（that of の脱落）が減点されやすいポイントです。誤り指摘問題でも、比較対象の不一致や比較級の強調語（very は不可）が狙われます。和訳では、no more … than や no less … than を正しく訳せるかが問われます。",
  qs: [
    { q: "The average income in the city is higher than ___ in rural areas.", o: ["that", "those", "it", "one"], a: 0, ja: "その都市の平均収入は、農村部の平均収入より高い。", ex: "比べるのは「都市の平均収入」と「農村部の平均収入」。単数の the average income を受けるのは that。" },
    { q: "The more you learn about the world, ___ you realize how little you know.", o: ["the more", "more", "the most", "much more"], a: 0, ja: "世界について学べば学ぶほど、自分がいかに知らないかに気づく。", ex: "The＋比較級 S V, the＋比較級 S V（～すればするほど…）。" },
    { q: "I have ___ than three hours to finish this report, so I need to hurry.", o: ["no more", "no less", "not less", "any more"], a: 0, ja: "この報告書を仕上げるのに3時間しかないので、急がなければならない。", ex: "so I need to hurry から「少ない」という気持ちが読み取れるので no more than（＝only）。no less than は「～も（多い）」。" },
    { q: "This year's sales were ___ better than last year's.", o: ["much", "very", "more", "so"], a: 0, ja: "今年の売上は昨年よりずっとよかった。", ex: "比較級の強調は much / far / even など。very は比較級を強調できない。" },
    { q: "Learning a language without speaking it is no more effective than learning to swim without entering the water.", o: ["話さずに言語を学んでも効果がないのは、水に入らずに泳ぎを学んでも効果がないのと同じだ。", "言語を話して学ぶことは、水に入って泳ぎを学ぶことよりも効果的だ。", "水に入らずに泳ぎを学ぶほうが、話さずに言語を学ぶよりはまだ効果がある。", "言語を学ぶことも泳ぎを学ぶことも、どちらも同じくらい効果的だ。"], a: 0, ja: "話さずに言語を学んでも効果がないのは、水に入らずに泳ぎを学んでも効果がないのと同じだ。", ex: "A is no more B than C is (B)：AがBでないのはCがBでないのと同じ（両方を否定）。no more を「より～でない」と訳さない。" },
    { q: "The price of vegetables at the new supermarket is much lower than the old one.", o: ["The price of vegetables", "at the new supermarket", "much lower", "than the old one"], a: 3, fix: "The price of vegetables at the new supermarket is much lower than that at the old one.", ja: "新しいスーパーの野菜の値段は、古いスーパーの値段よりずっと安い。", ex: "比べるのは「新しいスーパーの野菜の値段」と「古いスーパーの野菜の値段」。than the old one では値段と店を比べることになるので、that at the old one とする。" }
  ]
}
);
