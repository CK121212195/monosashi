/* 辞書 第3弾（単語一覧の拡充：英検2級・共通テストレベル〜英検1級レベル、熟語・句動詞）
   書式は dict-vocab.js と同じ： 見出し語|品詞|意味|発音記号（任意）|レベル（任意：C=2級, B=準1級, A=1級） */
window.EIGO = window.EIGO || {};
EIGO.DICT_PARTS = EIGO.DICT_PARTS || [];
// 不規則な活用形（例文で使う語）
Object.assign(EIGO.IRREG, {
  misled: "mislead", criteria: "criterion", phenomena: "phenomenon"
});
EIGO.DICT_PARTS.push(`
abate|v|（勢い・痛みが）和らぐ・弱まる|əˈbeɪt|A
aberration|n|逸脱・異常|ˌæbəˈreɪʃən|A
abhor|v|ひどく嫌う|əbˈhɔːr|A
abide by|phr|（規則・決定などに）従う
absence|n|不在・欠席・欠如|ˈæbsəns|C
absent|adj|（from ～を）欠席して・不在の|ˈæbsənt
absolute|adj|絶対的な・完全な|ˈæbsəluːt|C
abstract|adj|抽象的な|ˈæbstrækt|C
absurd|adj|ばかげた・不合理な|əbˈsɝːd|B
abuse|n|乱用・虐待；（動詞 /əˈbjuːz/）乱用する・虐待する|əˈbjuːs|B
academic|adj|学問の・学業の|ˌækəˈdemɪk|C
accountable|adj|（for ～の）説明責任がある|əˈkaʊntəbl|B
acknowledge|v|認める・（受け取ったことを）知らせる|əkˈnɑːlɪdʒ|C
acquaint|v|（A with B で）AにBを知らせる（be acquainted with で ～をよく知っている）|əˈkweɪnt|B
acquiesce|v|（in ～に）黙って従う|ˌækwiˈes|A
acquisition|n|習得・取得・買収|ˌækwɪˈzɪʃən|B
actual|adj|実際の|ˈæktʃuəl|C
acumen|n|鋭い判断力|əˈkjuːmən|A
adhere|v|（to ～に）固執する・従う・くっつく|ədˈhɪr|B
administer|v|管理する・（薬を）投与する・（試験を）実施する|ədˈmɪnɪstɚ|B
administration|n|管理・行政・政権|ədˌmɪnɪˈstreɪʃən|C
admire|v|感心する・称賛する|ədˈmaɪɚ|C
admit|v|認める・入ることを許す|ədˈmɪt|C
admittedly|adv|確かに・明らかに|ədˈmɪtɪdli
adolescence|n|思春期|ˌædəˈlesns|B
adolescent|n|青年・思春期の若者|ˌædəˈlesnt|C
advent|n|（重要なものの）出現・到来|ˈædvent|B
adversity|n|逆境|ədˈvɝːsəti|B
advertise|v|広告する・宣伝する|ˈædvɚtaɪz|C
aesthetic|adj|美の・美的な；（名詞）美意識|esˈθetɪk|B
aggressive|adj|攻撃的な・積極的な|əˈɡresɪv|C
akin|adj|（to ～に）類似した|əˈkɪn|B
alien|adj|異質な・外国の|ˈeɪliən|C
alliance|n|同盟・提携|əˈlaɪəns|B
allow for|phr|～を考慮に入れる・見込んでおく
altruism|n|利他主義|ˈæltruɪzəm|B
amalgamate|v|合併する・融合させる|əˈmælɡəmeɪt|A
ambition|n|野心・大望|æmˈbɪʃən|C
ambivalent|adj|相反する感情を持つ・どっちつかずの|æmˈbɪvələnt|B
ameliorate|v|改善する|əˈmiːliəreɪt|A
amenable|adj|（to ～に）従順な・応じる|əˈmiːnəbl|A
amend|v|（法律・文書を）修正する・改正する|əˈmend|B
amenity|n|（amenities で）快適な設備・生活の便宜|əˈmenəti|B
amount to|phr|合計～になる・（結局）～に等しい
analogy|n|類推・類似（点）|əˈnælədʒi|B
analysis|n|分析|əˈnæləsɪs|C
ancestor|n|祖先|ˈænsestɚ|C
ancestry|n|家系・祖先|ˈænsestri|B
anomaly|n|異例・変則・異常|əˈnɑːməli|B
antibiotic|n|抗生物質|ˌæntibaɪˈɑːtɪk|B
anticipation|n|予想・期待|ænˌtɪsɪˈpeɪʃən|C
apathy|n|無関心・無気力|ˈæpəθi|A
apparent|adj|明らかな・見かけの|əˈpærənt|C
apparently|adv|どうやら～らしい|əˈpærəntli|C
appeal|v|訴える・魅力がある；（名詞）訴え・魅力|əˈpiːl|C
appease|v|なだめる・（要求に）譲歩する|əˈpiːz|A
applause|n|拍手・称賛|əˈplɔːz|C
appoint|v|任命する・（日時を）指定する|əˈpɔɪnt|C
apprehend|v|逮捕する・理解する|ˌæprɪˈhend|B
apprehensive|adj|（about ～を）気づかって・不安な|ˌæprɪˈhensɪv|B
appropriate|adj|適切な|əˈproʊpriət|C
approve of|phr|～に賛成する・～をよいと認める
approximately|adv|およそ|əˈprɑːksɪmətli|C
apt|adj|（to do）～しがちな・適切な|æpt|B
aptitude|n|適性・素質|ˈæptɪtuːd|B
arbitrary|adj|恣意的な・独断的な|ˈɑːrbətreri|B
archaeology|n|考古学|ˌɑːrkiˈɑːlədʒi|B
architecture|n|建築（様式）|ˈɑːrkɪtektʃɚ|C
arduous|adj|骨の折れる|ˈɑːrdʒuəs|A
articulate|v|はっきり述べる；（形容詞 /ɑːrˈtɪkjələt/）明瞭な|ɑːrˈtɪkjəleɪt|B
artifact|n|人工物・工芸品|ˈɑːrtɪfækt|B
as a matter of fact|phr|実のところ・実際は
as a rule|phr|概して・一般に
as a whole|phr|全体として
as far as|phr|～する限り（範囲・程度）・～まで
as is often the case with|phr|～にはよくあることだが
as it were|phr|いわば
as opposed to|phr|～とは対照的に・～ではなく
as to|phr|～に関して
ascend|v|登る・上昇する|əˈsend|B
ascertain|v|確かめる・突き止める|ˌæsɚˈteɪn|B
ashamed|adj|恥じて|əˈʃeɪmd|C
aspect|n|側面・観点|ˈæspekt|C
aspiration|n|熱望・抱負|ˌæspəˈreɪʃən|B
aspire|v|（to ～を）熱望する・志す|əˈspaɪɚ|B
assault|n|襲撃・暴行；（動詞）襲撃する|əˈsɔːlt|B
assemble|v|集める・組み立てる|əˈsembl|B
assimilate|v|同化する・吸収する|əˈsɪməleɪt|B
association|n|協会・連想・つながり|əˌsoʊsiˈeɪʃən|C
astonish|v|ひどく驚かせる|əˈstɑːnɪʃ|C
astute|adj|抜け目のない・明敏な|əˈstuːt|A
at all costs|phr|どんな犠牲を払っても・何としても
at hand|phr|手元に・間近に
at large|phr|全体としての・（犯人が）逃走中で
at random|phr|無作為に・手当たり次第に
at stake|phr|危機に瀕して・（成否が）懸かって
at the expense of|phr|～を犠牲にして・～の費用で
at the mercy of|phr|～のなすがままに
attempt|n|試み；（動詞）試みる|əˈtempt|C
authentic|adj|本物の・信頼できる|ɔːˈθentɪk|B
autonomous|adj|自律的な・自治の|ɔːˈtɑːnəməs|B
autonomy|n|自律・自治|ɔːˈtɑːnəmi|B
avert|v|（危険などを）避ける・（目を）そらす|əˈvɝːt|B
awe|n|畏敬・畏怖|ɔː|B
awkward|adj|ぎこちない・気まずい|ˈɔːkwɚd|C
back up|phr|支援する・（主張を）裏付ける・（データを）予備保存する
backlash|n|（社会的な）反発|ˈbæklæʃ|B
bankrupt|adj|破産した|ˈbæŋkrʌpt|B
barrier|n|障壁・障害|ˈbæriɚ|C
basis|n|基礎・根拠（on a daily basis で 毎日）|ˈbeɪsɪs|C
be accustomed to|phr|～に慣れている（to の後は名詞・動名詞）
be entitled to|phr|～の権利［資格］がある
be subject to|phr|～を受けやすい・～に従わなければならない
be supposed to|phr|～することになっている・～するはずだ
bear in mind|phr|心に留めておく
biodiversity|n|生物多様性|ˌbaɪoʊdaɪˈvɝːsəti
biology|n|生物学|baɪˈɑːlədʒi|C
bizarre|adj|奇妙な・異様な|bɪˈzɑːr|B
blank|adj|空白の・何も書いていない|blæŋk|C
blatant|adj|露骨な・見え透いた|ˈbleɪtnt|A
blunt|adj|ぶっきらぼうな・（刃が）鈍い|blʌnt|B
boast|v|自慢する・（すぐれた物を）誇る|boʊst|C
bother|v|悩ませる・面倒をかける|ˈbɑːðɚ|C
breakthrough|n|（科学などの）飛躍的進歩・突破口|ˈbreɪkθruː|B
brief|adj|短い・簡潔な|briːf|C
brilliant|adj|すばらしい・才能のある・まばゆい|ˈbrɪljənt|C
bring about|phr|引き起こす・もたらす
bring out|phr|引き出す・（製品を）発売する
british|adj|イギリスの|ˈbrɪtɪʃ
broadcast|v|放送する；（名詞）放送|ˈbrɔːdkæst|C
brutal|adj|残忍な・厳しい|ˈbruːtl|B
burden|n|重荷・負担|ˈbɝːdn|C
bureaucracy|n|官僚制・お役所仕事|bjʊˈrɑːkrəsi|B
burst|v|破裂する・（into ～を）急に始める|bɝːst|C
by and large|phr|概して・全般的に
by means of|phr|～によって・～を用いて
by no means|phr|決して～ない
caffeine|n|カフェイン|kæˈfiːn
call for|phr|～を要求する・必要とする
cannot help|phr|（doing）～せずにはいられない
capacity|n|収容力・能力・容量|kəˈpæsəti|C
capitalism|n|資本主義|ˈkæpɪtəlɪzəm|B
career|n|職業・経歴|kəˈrɪr|C
cast|v|投げる・（役を）割り当てる；（名詞）出演者|kæst|C
catastrophe|n|大惨事・破局|kəˈtæstrəfi|B
cater|v|（to ～の）要求に応える・（料理を）仕出しする|ˈkeɪtɚ|B
celebrity|n|有名人|səˈlebrəti|C
cell|n|細胞・独房・（携帯の）電話|sel|C
celsius|adj|セ氏の（温度）|ˈselsiəs
certainly|adv|確かに・（返事で）もちろん|ˈsɝːtnli|C
channel|n|経路・（テレビの）チャンネル・海峡|ˈtʃænl|C
chemical|adj|化学の；（名詞）化学物質|ˈkemɪkl|C
cherish|v|大切にする・心に抱く|ˈtʃerɪʃ|B
chimpanzee|n|チンパンジー|ˌtʃɪmpænˈziː
chronic|adj|慢性の・長期にわたる|ˈkrɑːnɪk|B
circulate|v|循環する・（うわさなどが）広まる|ˈsɝːkjəleɪt|B
circumvent|v|（規則などを）回避する・すり抜ける|ˌsɝːkəmˈvent|A
citizen|n|市民・国民|ˈsɪtɪzn|C
civil|adj|市民の・民間の・礼儀正しい|ˈsɪvl|C
civilization|n|文明|ˌsɪvələˈzeɪʃən|C
clash|n|衝突・対立；（動詞）衝突する|klæʃ|B
classify|v|分類する|ˈklæsɪfaɪ|C
clue|n|手がかり|kluː|C
coerce|v|（into ～するよう）強要する|koʊˈɝːs|B
coffee|n|コーヒー|ˈkɔːfi
cognitive|adj|認知の|ˈkɑːɡnətɪv|B
coherent|adj|首尾一貫した・筋の通った|koʊˈhɪrənt|B
cohesion|n|結束・まとまり|koʊˈhiːʒən|B
coincide|v|（with ～と）同時に起こる・一致する|ˌkoʊɪnˈsaɪd|B
coincidence|n|偶然の一致|koʊˈɪnsɪdəns|B
combat|n|戦闘；（動詞 /kəmˈbæt/）（問題と）闘う|ˈkɑːmbæt|B
combination|n|組み合わせ|ˌkɑːmbɪˈneɪʃən|C
come into being|phr|生まれる・出現する
come to terms with|phr|（受け入れがたいことを）受け入れる・折り合いをつける
comfort|n|快適さ・慰め；（動詞）慰める|ˈkʌmfɚt|C
command|n|命令・（言語などの）運用力|kəˈmænd|C
commodity|n|商品・日用品・（取引される）産物|kəˈmɑːdəti|B
companion|n|仲間・連れ|kəmˈpænjən|C
comparison|n|比較|kəmˈpærɪsn|C
compatible|adj|（with ～と）両立できる・互換性のある|kəmˈpætəbl|B
compel|v|（O to do で）無理に～させる|kəmˈpel|B
complication|n|面倒な問題・合併症|ˌkɑːmplɪˈkeɪʃən|B
component|n|構成要素・部品|kəmˈpoʊnənt|C
compound|n|化合物・合成物；（動詞 /kəmˈpaʊnd/）悪化させる|ˈkɑːmpaʊnd|B
comprehend|v|理解する|ˌkɑːmprɪˈhend|B
concede|v|（しぶしぶ）認める・譲る|kənˈsiːd|B
conceive|v|（of ～を）思いつく・想像する・妊娠する|kənˈsiːv|B
concept|n|概念|ˈkɑːnsept|C
concur|v|（with ～と）同意する・同時に起こる|kənˈkɝː|A
condemn|v|（強く）非難する・（to ～の）刑を宣告する|kənˈdem|B
conducive|adj|（to ～に）役立つ・ためになる|kənˈduːsɪv|A
confer|v|（with ～と）協議する・（on ～に）授与する|kənˈfɝː|B
confess|v|白状する・告白する|kənˈfes|C
conflict|n|対立・紛争|ˈkɑːnflɪkt|C
confront|v|立ち向かう・（be confronted with で）～に直面する|kənˈfrʌnt|B
confrontation|n|対決・対立|ˌkɑːnfrʌnˈteɪʃən|B
confuse|v|混乱させる・（A with B で）AとBを混同する|kənˈfjuːz|C
confusion|n|混乱|kənˈfjuːʒən|C
consensus|n|（意見の）一致・合意|kənˈsensəs|B
conservative|adj|保守的な・控えめな|kənˈsɝːvətɪv|C
conserve|v|保護する・節約する|kənˈsɝːv|B
consist|v|（of ～から）成る・（in ～に）ある|kənˈsɪst|C
constitute|v|構成する・～とみなされる|ˈkɑːnstɪtuːt|B
constitution|n|憲法・構成・体質|ˌkɑːnstɪˈtuːʃən|B
construct|v|建設する・組み立てる|kənˈstrʌkt|C
contaminate|v|汚染する|kənˈtæmɪneɪt|B
contemplate|v|熟考する・（doing ～しようと）考える|ˈkɑːntəmpleɪt|B
contemporary|adj|現代の・同時代の|kənˈtempəreri|C
continent|n|大陸|ˈkɑːntɪnənt|C
contradict|v|矛盾する・反論する|ˌkɑːntrəˈdɪkt|B
contradiction|n|矛盾・反論|ˌkɑːntrəˈdɪkʃən|B
contrary|adj|反対の（on the contrary で それどころか）|ˈkɑːntreri|C
contrary to|phr|～に反して
controversial|adj|議論を呼ぶ|ˌkɑːntrəˈvɝːʃl|C
controversy|n|論争|ˈkɑːntrəvɝːsi|B
conundrum|n|難問|kəˈnʌndrəm|A
convention|n|慣習・大会・協定|kənˈvenʃən|C
conversely|adv|逆に・反対に|kənˈvɝːsli|B
conviction|n|確信・有罪判決|kənˈvɪkʃən|B
cope|v|（with ～に）うまく対処する|koʊp|C
cope with|phr|～にうまく対処する
correlate|v|（with ～と）相関する|ˈkɔːrəleɪt|B
correlation|n|相関（関係）|ˌkɔːrəˈleɪʃən|B
corrupt|adj|腐敗した・堕落した|kəˈrʌpt|B
corruption|n|汚職・腐敗|kəˈrʌpʃən|B
count on|phr|～を頼りにする・当てにする
counterpart|n|（対応する）相手・同等の人［物］|ˈkaʊntɚpɑːrt|B
courage|n|勇気|ˈkɝːɪdʒ|C
creature|n|生き物|ˈkriːtʃɚ|C
crew|n|乗組員・（作業の）一団|kruː|C
crime|n|犯罪|kraɪm|C
criterion|n|（判断の）基準（複数形 criteria）|kraɪˈtɪriən|B
cross|v|横切る・交差させる（cross one's legs で 脚を組む）|krɔːs
crucial|adj|きわめて重要な|ˈkruːʃl|C
crude|adj|粗雑な・未加工の（crude oil で 原油）|kruːd|B
culpable|adj|責められるべき・有罪の|ˈkʌlpəbl|A
custom|n|慣習・（customs で）税関|ˈkʌstəm|C
cut down on|phr|（量を）減らす・控える
decay|v|腐敗する・衰える；（名詞）腐敗・衰退|dɪˈkeɪ|B
decisive|adj|決定的な・決断力のある|dɪˈsaɪsɪv|B
declaration|n|宣言・申告|ˌdekləˈreɪʃən|B
dedicate|v|（to ～に）捧げる・専念させる|ˈdedɪkeɪt|C
defeat|v|打ち負かす；（名詞）敗北|dɪˈfiːt|C
defense|n|防御・弁護|dɪˈfens|C
deficiency|n|欠乏・欠陥|dɪˈfɪʃənsi|B
definite|adj|明確な・確かな|ˈdefənət|C
definition|n|定義|ˌdefəˈnɪʃən|C
degrade|v|劣化させる・品位を下げる|dɪˈɡreɪd|B
deliberate|adj|意図的な・慎重な；（動詞 /dɪˈlɪbəreɪt/）熟考する|dɪˈlɪbərət|B
demise|n|消滅・崩壊・死去|dɪˈmaɪz|A
democracy|n|民主主義・民主国家|dɪˈmɑːkrəsi|C
democratic|adj|民主的な|ˌdeməˈkrætɪk|C
demographic|adj|人口統計の；（名詞）（特定の）購買層|ˌdeməˈɡræfɪk|B
demonstrate|v|実証する・実演する・デモをする|ˈdemənstreɪt|C
denounce|v|（公然と）非難する|dɪˈnaʊns|B
density|n|密度|ˈdensəti|B
depart|v|出発する|dɪˈpɑːrt|C
departure|n|出発|dɪˈpɑːrtʃɚ|C
depict|v|描く・描写する|dɪˈpɪkt|B
deploy|v|配備する・（資源を）活用する|dɪˈplɔɪ|B
depressed|adj|落ち込んだ・不景気の|dɪˈprest|C
deprive|v|（A of B で）AからBを奪う|dɪˈpraɪv|C
derive|v|（from ～に）由来する・～を引き出す|dɪˈraɪv|C
derogatory|adj|軽蔑的な|dɪˈrɑːɡətɔːri|A
descend|v|下る・（be descended from で）～の子孫である|dɪˈsend|B
descendant|n|子孫|dɪˈsendənt|B
description|n|描写・説明|dɪˈskrɪpʃən|C
designate|v|指定する・任命する|ˈdezɪɡneɪt|B
desire|n|欲望・願望；（動詞）強く望む|dɪˈzaɪɚ|C
despair|n|絶望；（動詞）絶望する|dɪˈsper|C
desperate|adj|必死の・絶望的な|ˈdespərət|C
destination|n|目的地・行き先|ˌdestɪˈneɪʃən|C
destruction|n|破壊|dɪˈstrʌkʃən|C
detrimental|adj|（to ～に）有害な|ˌdetrɪˈmentl|A
deviate|v|（from ～から）それる・逸脱する|ˈdiːvieɪt|B
devote|v|（A to B で）AをBに捧げる|dɪˈvoʊt|C
dictate|v|口述する・命令する・決定づける|ˈdɪkteɪt|B
differentiate|v|区別する・差別化する|ˌdɪfəˈrenʃieɪt|B
digest|v|消化する・理解する|daɪˈdʒest|C
dignity|n|威厳・尊厳|ˈdɪɡnəti|C
diligent|adj|勤勉な|ˈdɪlɪdʒənt|A
dilute|v|薄める・弱める|daɪˈluːt|B
dimension|n|次元・寸法・側面|dɪˈmenʃən|C
diplomacy|n|外交（手腕）|dɪˈploʊməsi|B
diplomat|n|外交官|ˈdɪpləmæt|C
direct|adj|直接の；（動詞）向ける・指揮する|dəˈrekt|C
disabled|adj|障害のある|dɪsˈeɪbld|C
disaster|n|災害・大失敗|dɪˈzæstɚ|C
discern|v|見分ける・識別する|dɪˈsɝːn|B
discipline|n|規律・しつけ・学問分野|ˈdɪsəplɪn|C
discourage|v|（from ～するのを）思いとどまらせる・落胆させる|dɪˈskɝːɪdʒ|C
discourse|n|談話・論説・言説|ˈdɪskɔːrs|B
discrepancy|n|食い違い・不一致|dɪˈskrepənsi|B
disdain|n|軽蔑；（動詞）軽蔑する|dɪsˈdeɪn|A
disguise|v|変装させる・偽る；（名詞）変装|dɪsˈɡaɪz|C
disparage|v|けなす・見くびる|dɪˈspærɪdʒ|A
disparity|n|（不当な）格差・相違|dɪˈspærəti|B
dispatch|v|派遣する・発送する|dɪˈspætʃ|B
disposal|n|処分（at one's disposal で 自由に使える）|dɪˈspoʊzl|B
dispose of|phr|～を処分する
disrupt|v|混乱させる・中断させる|dɪsˈrʌpt|B
dissolve|v|溶かす・解散する・解消する|dɪˈzɑːlv|B
dissuade|v|（from ～を）思いとどまらせる|dɪˈsweɪd|A
distance|n|距離（from a distance で 遠くから）|ˈdɪstəns
distant|adj|遠い|ˈdɪstənt|C
distinct|adj|はっきりした・（from ～と）別の|dɪˈstɪŋkt|C
distress|n|苦悩・困窮；（動詞）苦しめる|dɪˈstres|B
distribution|n|分配・分布|ˌdɪstrɪˈbjuːʃən|C
district|n|地区・地域|ˈdɪstrɪkt|C
disturb|v|邪魔をする・乱す|dɪˈstɝːb|C
diverge|v|分岐する・（意見が）異なる|daɪˈvɝːdʒ|B
diversity|n|多様性|daɪˈvɝːsəti|C
divert|v|（方向・注意を）そらす・転用する|daɪˈvɝːt|B
doctrine|n|教義・主義|ˈdɑːktrɪn|B
domain|n|領域・分野・（ネットの）ドメイン|doʊˈmeɪn|B
domestic|adj|国内の・家庭の|dəˈmestɪk|C
dominant|adj|支配的な・優勢な|ˈdɑːmɪnənt|C
donor|n|寄贈者・（臓器などの）提供者|ˈdoʊnɚ|B
doubt|n|疑い；（動詞）（～ではないと）疑う|daʊt|C
drastic|adj|思い切った・抜本的な|ˈdræstɪk|B
dubious|adj|疑わしい・半信半疑の|ˈduːbiəs|B
durable|adj|耐久性のある・永続的な|ˈdʊrəbl|B
duty|n|義務・職務・関税|ˈduːti|C
dwell|v|（on ～を）くよくよ考える・住む|dwel|B
eager|adj|（to do）しきりに～したがって・熱心な|ˈiːɡɚ|C
earthquake|n|地震|ˈɝːθkweɪk
ecosystem|n|生態系|ˈiːkoʊsɪstəm|B
edge|n|端・縁・優位|edʒ|C
edition|n|（本などの）版|ɪˈdɪʃən|C
educate|v|教育する|ˈedʒukeɪt|C
efficacy|n|効き目・有効性|ˈefɪkəsi|A
elect|v|（選挙で）選ぶ|ɪˈlekt|C
electronic|adj|電子の|ɪˌlekˈtrɑːnɪk|C
elegant|adj|優雅な・（理論などが）簡潔で美しい|ˈelɪɡənt
element|n|要素・元素|ˈelɪmənt|C
elevate|v|持ち上げる・高める|ˈelɪveɪt|B
eloquent|adj|雄弁な・表情豊かな|ˈeləkwənt|A
elusive|adj|捉えどころのない・達成しにくい|iˈluːsɪv|A
embarrass|v|恥ずかしい思いをさせる・当惑させる|ɪmˈbærəs|C
embrace|v|受け入れる・抱きしめる|ɪmˈbreɪs|B
empathy|n|共感・感情移入|ˈempəθi|B
emphasize|v|強調する|ˈemfəsaɪz|C
empire|n|帝国|ˈempaɪɚ|C
empirical|adj|経験的な・実証的な|ɪmˈpɪrɪkl|B
employment|n|雇用・職|ɪmˈplɔɪmənt|C
enact|v|（法律を）制定する・演じる|ɪˈnækt|B
encompass|v|包含する・取り囲む|ɪnˈkʌmpəs|B
endangered|adj|絶滅の危機にある|ɪnˈdeɪndʒɚd|C
endeavor|n|努力・試み；（動詞）（to do）努力する|ɪnˈdevɚ|B
endorse|v|支持する・推薦する・裏書きする|ɪnˈdɔːrs|B
enforce|v|（法律を）施行する・強制する|ɪnˈfɔːrs|B
engage|v|（in ～に）従事する・引きつける|ɪnˈɡeɪdʒ|C
enigma|n|謎・不可解なもの|ɪˈnɪɡmə|A
enlighten|v|啓発する・教える|ɪnˈlaɪtn|B
enrich|v|豊かにする|ɪnˈrɪtʃ|B
entail|v|伴う・必要とする|ɪnˈteɪl|B
entertain|v|楽しませる・もてなす|ˌentɚˈteɪn|C
enthusiasm|n|熱意|ɪnˈθuːziæzəm|C
entity|n|実体・存在・組織体|ˈentəti|B
entrepreneur|n|起業家|ˌɑːntrəprəˈnɝː|B
envision|v|（将来のことを）思い描く|ɪnˈvɪʒən|B
epidemic|n|（病気の）流行・蔓延|ˌepɪˈdemɪk|B
epitome|n|典型・縮図|ɪˈpɪtəmi|A
equal|adj|等しい・平等な|ˈiːkwəl|C
equality|n|平等|ɪˈkwɑːləti|C
equate|v|（A with B で）AをBと同一視する|ɪˈkweɪt|B
equip|v|（with ～を）備えつける|ɪˈkwɪp|C
era|n|時代|ˈɪrə|C
essence|n|本質・エキス|ˈesns|B
establish|v|設立する・確立する|ɪˈstæblɪʃ|C
esteem|n|尊敬・評価（self-esteem で 自尊心）|ɪˈstiːm|B
eternal|adj|永遠の|ɪˈtɝːnl|B
ethical|adj|倫理的な|ˈeθɪkl|B
ethics|n|倫理（学）|ˈeθɪks|B
ethnic|adj|民族の|ˈeθnɪk|C
euphemism|n|婉曲表現|ˈjuːfəmɪzəm|A
evident|adj|明らかな|ˈevɪdənt|C
evil|adj|邪悪な；（名詞）悪|ˈiːvl|C
evolution|n|進化・発展|ˌevəˈluːʃən|C
evolve|v|進化する・発展する|ɪˈvɑːlv|C
exact|adj|正確な|ɪɡˈzækt|C
exaggerate|v|誇張する|ɪɡˈzædʒəreɪt|C
examination|n|試験・検査・調査|ɪɡˌzæmɪˈneɪʃən
exception|n|例外|ɪkˈsepʃən|C
exemplify|v|例示する・典型となる|ɪɡˈzemplɪfaɪ|B
exempt|adj|（from ～を）免除された|ɪɡˈzempt|B
existence|n|存在|ɪɡˈzɪstəns|C
exorbitant|adj|法外な|ɪɡˈzɔːrbɪtənt|A
expedition|n|遠征・探検（隊）|ˌekspəˈdɪʃən|B
expertise|n|専門知識・技能|ˌekspɝːˈtiːz|B
exploit|v|（不当に）利用する・開発する|ɪkˈsplɔɪt|B
explosion|n|爆発・急増|ɪkˈsploʊʒən|C
extensive|adj|広範囲にわたる|ɪkˈstensɪv|C
external|adj|外部の|ɪkˈstɝːnl|C
extinct|adj|絶滅した|ɪkˈstɪŋkt|C
extinction|n|絶滅|ɪkˈstɪŋkʃən|C
extract|v|抜き取る・抽出する；（名詞 /ˈekstrækt/）抜粋|ɪkˈstrækt|B
extravagant|adj|浪費的な・法外な|ɪkˈstrævəɡənt|B
facilitate|v|促進する・容易にする|fəˈsɪlɪteɪt|B
faculty|n|能力・学部・教授陣|ˈfækəlti|C
fade|v|（色・音が）薄れる・衰える|feɪd|C
faith|n|信頼・信仰|feɪθ|C
fall apart|phr|ばらばらになる・崩壊する
fallacy|n|誤った考え・誤謬|ˈfæləsi|B
famine|n|飢饉|ˈfæmɪn|B
fancy|adj|しゃれた・高級な；（動詞）想像する・好む|ˈfænsi|C
fare|n|（乗り物の）運賃|fer|C
fascinate|v|魅了する|ˈfæsɪneɪt|C
fate|n|運命|feɪt|C
favorable|adj|好意的な・有利な|ˈfeɪvərəbl|C
federal|adj|連邦の|ˈfedərəl|C
fertile|adj|肥えた・繁殖力のある|ˈfɝːtl|C
fertility|n|肥沃・繁殖力・出生率|fɚˈtɪləti|B
fierce|adj|激しい・どう猛な|fɪrs|B
finite|adj|有限の|ˈfaɪnaɪt|B
flaw|n|欠陥・欠点|flɔː|B
flawed|adj|欠陥のある|flɔːd|B
fluctuate|v|変動する|ˈflʌktʃueɪt|B
fold|v|折りたたむ・（腕を）組む|foʊld
for fear of|phr|～を恐れて・～しないように
for lack of|phr|～がないために
for the most part|phr|大部分は・たいてい
for the sake of|phr|～のために
for the time being|phr|当分の間
fore|n|前面（to the fore で 表立って）|fɔːr
forge|v|（関係などを）築く・偽造する|fɔːrdʒ|B
formal|adj|正式な・形式ばった|ˈfɔːrml|C
formidable|adj|手ごわい・恐るべき|ˈfɔːrmɪdəbl|B
formulate|v|（理論・計画を）まとめ上げる・策定する|ˈfɔːrmjəleɪt|B
fortunate|adj|幸運な|ˈfɔːrtʃənət|C
fortune|n|財産・運|ˈfɔːrtʃən|C
foundation|n|基礎・設立・財団|faʊnˈdeɪʃən|C
fraction|n|わずか・一部・分数|ˈfrækʃən|B
frequency|n|頻度・周波数|ˈfriːkwənsi|C
frequent|adj|頻繁な|ˈfriːkwənt|C
frivolous|adj|軽薄な・くだらない|ˈfrɪvələs|A
frontier|n|国境・（知識などの）最先端|frʌnˈtɪr|B
frustrate|v|いらいらさせる・挫折させる|ˈfrʌstreɪt|C
fulfill|v|（約束・義務を）果たす・満たす|fʊlˈfɪl|C
fume|n|（fumes で）排気ガス・有毒な煙|fjuːm
function|n|機能・関数；（動詞）機能する|ˈfʌŋkʃən|C
fundamental|adj|基本的な・根本的な|ˌfʌndəˈmentl|C
futile|adj|無駄な・無益な|ˈfjuːtl|B
gather|v|集める・集まる|ˈɡæðɚ|C
gender|n|（社会的な）性・性別|ˈdʒendɚ|C
gene|n|遺伝子|dʒiːn|C
generalize|v|一般化する|ˈdʒenərəlaɪz|B
genetic|adj|遺伝（子）の|dʒəˈnetɪk|C
gesture|n|身ぶり・意思表示|ˈdʒestʃɚ|C
get across|phr|（考えを）わからせる・伝える
give birth to|phr|～を産む・～を生み出す
give way to|phr|～に取って代わられる・～に屈する
glimpse|n|ちらっと見ること・垣間見ること|ɡlɪmps|B
gloomy|adj|陰気な・悲観的な|ˈɡluːmi|B
govern|v|統治する・支配する|ˈɡʌvɚn|C
gradual|adj|徐々の|ˈɡrædʒuəl|C
grasp|v|つかむ・理解する；（名詞）理解|ɡræsp|B
grateful|adj|感謝している|ˈɡreɪtfl|C
gratitude|n|感謝の気持ち|ˈɡrætɪtuːd|C
grave|n|墓；（形容詞）重大な|ɡreɪv|C
gravity|n|重力・重大さ|ˈɡrævəti|C
greed|n|強欲|ɡriːd|C
grief|n|深い悲しみ|ɡriːf|C
grim|adj|厳しい・険しい・気味の悪い|ɡrɪm|B
gross|adj|総計の・ひどい（gross domestic product で 国内総生産）|ɡroʊs|B
guilt|n|罪悪感・有罪|ɡɪlt|B
habitat|n|生息地|ˈhæbɪtæt|C
halt|v|止める・止まる；（名詞）停止|hɔːlt|B
hamper|v|妨げる|ˈhæmpɚ|B
harass|v|嫌がらせをする|həˈræs|B
harassment|n|嫌がらせ・ハラスメント|həˈræsmənt|B
harness|v|（力・資源を）利用する|ˈhɑːrnɪs|B
harsh|adj|厳しい・過酷な|hɑːrʃ|C
haunt|v|（考えなどが）つきまとう・（幽霊が）出る|hɔːnt|B
have nothing to do with|phr|～とは何の関係もない
heal|v|治す・癒やす|hiːl|C
heed|v|（忠告に）注意を払う；（名詞）注意|hiːd|B
hereditary|adj|遺伝的な・世襲の|həˈredɪteri|B
hinder|v|妨げる|ˈhɪndɚ|B
hindrance|n|妨げ・障害|ˈhɪndrəns|B
hold back|phr|（感情などを）抑える・ためらう
homogeneous|adj|同質の・均質の|ˌhoʊməˈdʒiːniəs|B
honor|n|名誉・光栄；（動詞）称える|ˈɑːnɚ|C
horizon|n|地平線・水平線・（horizons で）視野|həˈraɪzn|C
horse|n|馬|hɔːrs
hostile|adj|敵意のある|ˈhɑːstl|C
humanity|n|人類・人間性|hjuːˈmænəti|C
humble|adj|謙虚な・質素な|ˈhʌmbl|C
humid|adj|湿気の多い|ˈhjuːmɪd|C
humiliate|v|恥をかかせる|hjuːˈmɪlieɪt|B
hurry|v|急ぐ；（名詞）急ぎ|ˈhɝːi
hypocrisy|n|偽善|hɪˈpɑːkrəsi|B
hypothesis|n|仮説|haɪˈpɑːθəsɪs|C
ideology|n|イデオロギー・観念形態|ˌaɪdiˈɑːlədʒi|B
ignorance|n|無知|ˈɪɡnərəns|B
illuminate|v|照らす・解明する|ɪˈluːmɪneɪt|B
imaginary|adj|想像上の|ɪˈmædʒəneri|C
imaginative|adj|想像力豊かな|ɪˈmædʒənətɪv|C
immense|adj|莫大な・巨大な|ɪˈmens|B
immerse|v|浸す・（oneself in で）～に没頭する|ɪˈmɝːs|B
immigrant|n|（外国からの）移民|ˈɪmɪɡrənt|C
immigration|n|（外国からの）移住・入国管理|ˌɪmɪˈɡreɪʃən|C
immune|adj|（to ～に）免疫のある・影響されない|ɪˈmjuːn|B
immunity|n|免疫・免除|ɪˈmjuːnəti|B
impede|v|妨げる|ɪmˈpiːd|B
impetus|n|勢い・推進力・刺激|ˈɪmpɪtəs|A
implement|v|実行する・実施する；（名詞 /ˈɪmplɪmənt/）道具|ˈɪmplɪment|B
implication|n|（予想される）影響・含意|ˌɪmplɪˈkeɪʃən|B
implicit|adj|暗黙の・言外の|ɪmˈplɪsɪt|B
impoverished|adj|貧困に陥った|ɪmˈpɑːvərɪʃt|B
impress|v|感銘を与える|ɪmˈpres|C
impression|n|印象|ɪmˈpreʃən|C
impulse|n|衝動|ˈɪmpʌls|B
impunity|n|処罰を免れること（with impunity で 罰を受けずに）|ɪmˈpjuːnəti|A
in a sense|phr|ある意味で
in accordance with|phr|～に従って
in contrast to|phr|～と対照的に
in favor of|phr|～に賛成して・～を選んで
in light of|phr|～を考慮して・～に照らして
in line with|phr|～と一致して・～に沿って
in place of|phr|～の代わりに
in practice|phr|実際には
in principle|phr|原則として・理論上は
in pursuit of|phr|～を求めて・追求して
in question|phr|問題の・当該の
in response to|phr|～に応じて・～に応えて
in the absence of|phr|～がないときに・～がいないときに
in the course of|phr|～の間に・～の過程で
in the face of|phr|～に直面して・～にもかかわらず
in the first place|phr|そもそも・まず第一に
in the long run|phr|長い目で見れば・結局は
in the meantime|phr|その間に・それまでは
in the presence of|phr|～のいる前で・～の存在下で
in the wake of|phr|～の後に・～の結果として
in turn|phr|順番に・今度は（逆に）・その結果
incentive|n|動機づけ・奨励金|ɪnˈsentɪv|B
incessant|adj|絶え間ない|ɪnˈsesnt|A
inclination|n|傾向・意向|ˌɪnklɪˈneɪʃən|B
incorporate|v|組み入れる・法人化する|ɪnˈkɔːrpəreɪt|B
incur|v|（損失・怒りなどを）招く・負う|ɪnˈkɝː|B
indelible|adj|消えない・忘れられない|ɪnˈdeləbl|A
indicate|v|示す・指し示す|ˈɪndɪkeɪt|C
indigenous|adj|（to ～に）固有の・先住の|ɪnˈdɪdʒənəs|B
induce|v|（O to do で）～する気にさせる・引き起こす|ɪnˈduːs|B
indulge|v|（in ～に）ふける・甘やかす|ɪnˈdʌldʒ|B
inept|adj|不器用な・無能な|ɪˈnept|A
inertia|n|惰性・慣性|ɪˈnɝːʃə|B
inexorable|adj|止めようのない・容赦ない|ɪnˈeksərəbl|A
infant|n|乳児|ˈɪnfənt|C
inferior|adj|（to ～より）劣った|ɪnˈfɪriɚ|B
infinite|adj|無限の|ˈɪnfɪnət|B
infrastructure|n|社会基盤・インフラ|ˈɪnfrəstrʌktʃɚ|B
infringe|v|（権利などを）侵害する|ɪnˈfrɪndʒ|B
ingenuity|n|創意工夫の才|ˌɪndʒəˈnuːəti|B
inhabit|v|（場所に）住む・生息する|ɪnˈhæbɪt|B
inhabitant|n|住民|ɪnˈhæbɪtənt|C
inherent|adj|（in ～に）本来備わっている|ɪnˈhɪrənt|B
inherit|v|相続する・受け継ぐ|ɪnˈherɪt|C
initial|adj|最初の；（名詞）頭文字|ɪˈnɪʃl|C
initiate|v|始める・着手する|ɪˈnɪʃieɪt|B
initiative|n|主導権・自発性・（新たな）取り組み|ɪˈnɪʃətɪv|B
injure|v|けがをさせる・傷つける|ˈɪndʒɚ|C
injury|n|けが・損害|ˈɪndʒəri|C
innate|adj|生まれつきの|ɪˈneɪt|B
innocent|adj|無罪の・無邪気な|ˈɪnəsnt|C
innocuous|adj|無害な・当たり障りのない|ɪˈnɑːkjuəs|A
innovation|n|革新・新機軸|ˌɪnəˈveɪʃən|C
innovative|adj|革新的な|ˈɪnəveɪtɪv|B
insatiable|adj|飽くことを知らない|ɪnˈseɪʃəbl|A
insect|n|昆虫|ˈɪnsekt
inspection|n|検査・視察|ɪnˈspekʃən|B
inspire|v|（O to do で）奮い立たせる・ひらめきを与える|ɪnˈspaɪɚ|C
instance|n|例（for instance で たとえば）|ˈɪnstəns|C
instinctive|adj|本能的な|ɪnˈstɪŋktɪv|B
institute|n|研究所・協会；（動詞）制定する|ˈɪnstɪtuːt|C
insurmountable|adj|克服できない|ˌɪnsɚˈmaʊntəbl|A
integral|adj|不可欠な|ˈɪntɪɡrəl|B
integrate|v|統合する・溶け込ませる|ˈɪntɪɡreɪt|B
integrity|n|誠実さ・高潔さ・完全な状態|ɪnˈteɡrəti|B
intellectual|adj|知的な；（名詞）知識人|ˌɪntəˈlektʃuəl|C
intense|adj|激しい・強烈な|ɪnˈtens|C
interact|v|（with ～と）交流する・相互に作用する|ˌɪntɚˈækt|C
interaction|n|交流・相互作用|ˌɪntɚˈækʃən|C
internal|adj|内部の・国内の|ɪnˈtɝːnl|C
interpret|v|解釈する・通訳する|ɪnˈtɝːprɪt|C
intervene|v|介入する・仲裁する|ˌɪntɚˈviːn|B
intricate|adj|入り組んだ・複雑な|ˈɪntrɪkət|B
intrinsic|adj|本質的な・固有の|ɪnˈtrɪnzɪk|B
intuition|n|直観（力）|ˌɪntuˈɪʃən|B
inundate|v|殺到する・水浸しにする|ˈɪnʌndeɪt|A
invade|v|侵略する・侵害する|ɪnˈveɪd|C
irony|n|皮肉|ˈaɪrəni|B
irrational|adj|不合理な・理性を欠いた|ɪˈræʃənl|B
irrevocable|adj|取り消せない|ɪˈrevəkəbl|A
isolate|v|孤立させる・隔離する|ˈaɪsəleɪt|C
isolation|n|孤立・隔離|ˌaɪsəˈleɪʃən|B
it goes without saying|phr|（that ～）言うまでもない
jam|n|渋滞（traffic jam）・ジャム|dʒæm
jeopardize|v|危うくする|ˈdʒepɚdaɪz|B
journal|n|専門誌・日誌|ˈdʒɝːnl|C
judicious|adj|思慮分別のある|dʒuˈdɪʃəs|A
justice|n|正義・公正|ˈdʒʌstɪs|C
juxtapose|v|並べて置く・並置する|ˈdʒʌkstəpoʊz|A
keen|adj|鋭い・熱心な（be keen to do）|kiːn|C
kill|v|殺す（be killed で（事故・災害で）亡くなる）|kɪl
landmark|n|目印・画期的な出来事|ˈlændmɑːrk|B
lay out|phr|並べる・設計する・（考えを）説明する
lead to|phr|～につながる・～を引き起こす
lean|v|もたれる・傾く；（形容詞）やせた|liːn|C
leap|v|跳ぶ；（名詞）跳躍・飛躍|liːp|C
leave out|phr|省く・除外する
leg|n|脚|leɡ
legislation|n|法律・立法|ˌledʒɪsˈleɪʃən|B
legitimate|adj|正当な・合法的な|lɪˈdʒɪtəmət|B
let alone|phr|（否定文の後で）まして～ない
liable|adj|（to do）～しがちな・（for ～に）法的責任がある|ˈlaɪəbl|B
liberal|adj|自由主義の・寛大な|ˈlɪbərəl|C
liberate|v|解放する|ˈlɪbəreɪt|B
liberty|n|自由|ˈlɪbɚti|C
likewise|adv|同様に|ˈlaɪkwaɪz|B
linguist|n|言語学者|ˈlɪŋɡwɪst
linguistic|adj|言語の・言語学の|lɪŋˈɡwɪstɪk|B
literacy|n|読み書きの能力・（ある分野の）知識|ˈlɪtərəsi|B
literally|adv|文字どおり|ˈlɪtərəli|C
literature|n|文学・文献|ˈlɪtərətʃɚ|C
litigation|n|訴訟|ˌlɪtɪˈɡeɪʃən|A
load|n|荷物・負担；（動詞）積む|loʊd|C
logical|adj|論理的な|ˈlɑːdʒɪkl|C
longevity|n|長寿・寿命|lɑːnˈdʒevəti|B
look into|phr|～を調査する
lose sight of|phr|～を見失う
loyal|adj|忠実な|ˈlɔɪəl|C
lure|v|誘い込む；（名詞）魅力・誘惑|lʊr|B
magnify|v|拡大する・誇張する|ˈmæɡnɪfaɪ|B
magnitude|n|大きさ・重大さ・（地震の）規模|ˈmæɡnɪtuːd|B
make a difference|phr|違いを生む・重要である
make do with|phr|～で間に合わせる
make the most of|phr|～を最大限に活用する
make use of|phr|～を利用する
mandatory|adj|義務的な・強制の|ˈmændətɔːri|B
manner|n|方法・態度・（manners で）作法|ˈmænɚ|C
margin|n|余白・差・利ざや|ˈmɑːrdʒɪn|C
marginal|adj|わずかな・周辺的な|ˈmɑːrdʒɪnl|B
marine|adj|海の|məˈriːn|C
marry|v|結婚する|ˈmæri
massive|adj|巨大な・大量の|ˈmæsɪv|C
maximum|n|最大限；（形容詞）最大の|ˈmæksɪməm|C
may as well|phr|～したほうがよい・～するのも同じことだ
meager|adj|乏しい・わずかな|ˈmiːɡɚ|A
mechanism|n|仕組み・機構|ˈmekənɪzəm|C
medieval|adj|中世の|ˌmediˈiːvl|B
meditation|n|瞑想・熟考|ˌmedɪˈteɪʃən|B
medium|n|媒体・手段（複数形 media）；（形容詞）中くらいの|ˈmiːdiəm|C
merchant|n|商人|ˈmɝːtʃənt|C
mercy|n|慈悲・情け|ˈmɝːsi|C
merge|v|合併する・融合する|mɝːdʒ|B
merit|n|長所・価値|ˈmerɪt|C
metaphor|n|隠喩・比喩|ˈmetəfɔːr|B
midnight|n|真夜中・午前0時|ˈmɪdnaɪt
migrate|v|移住する・（鳥などが）渡る|ˈmaɪɡreɪt|C
migration|n|移住・（鳥などの）渡り|maɪˈɡreɪʃən|B
milestone|n|画期的な出来事・節目|ˈmaɪlstoʊn|B
military|adj|軍の；（名詞）軍隊|ˈmɪlɪteri|C
minority|n|少数（派）|maɪˈnɔːrəti|C
misconception|n|誤解・思い違い|ˌmɪskənˈsepʃən|B
mislead|v|誤解させる・欺く|ˌmɪsˈliːd|C
mobilize|v|動員する・結集する|ˈmoʊbəlaɪz|B
moisture|n|湿気・水分|ˈmɔɪstʃɚ|C
momentum|n|勢い・はずみ|moʊˈmentəm|B
monitor|v|監視する・観察する；（名詞）画面・監視装置|ˈmɑːnɪtɚ|C
monopoly|n|独占（権）|məˈnɑːpəli|B
monument|n|記念碑・遺跡|ˈmɑːnjəmənt|C
more or less|phr|多かれ少なかれ・だいたい
mortal|adj|死ぬ運命の・致命的な|ˈmɔːrtl|B
mortality|n|死亡率・死ぬ運命|mɔːrˈtæləti|B
motive|n|動機|ˈmoʊtɪv|C
mundane|adj|平凡な・ありふれた|mʌnˈdeɪn|B
mutual|adj|相互の・共通の|ˈmjuːtʃuəl|C
naked|adj|裸の・むき出しの（the naked eye で 肉眼）|ˈneɪkɪd|C
narrative|n|物語・語り；（形容詞）物語の|ˈnærətɪv|B
narrow|adj|狭い・かろうじての|ˈnæroʊ|C
nation|n|国家・国民|ˈneɪʃən|C
nature|n|自然・性質|ˈneɪtʃɚ
nebulous|adj|漠然とした|ˈnebjələs|A
neutral|adj|中立の|ˈnuːtrəl|C
nevertheless|adv|それにもかかわらず|ˌnevɚðəˈles|C
noble|adj|高貴な・気高い|ˈnoʊbl|C
nominate|v|指名する・推薦する|ˈnɑːmɪneɪt|B
norm|n|規範・標準|nɔːrm|B
normal|adj|普通の・標準の|ˈnɔːrml|C
not necessarily|phr|必ずしも～ない（部分否定）
not to mention|phr|～は言うまでもなく
notable|adj|注目に値する・著名な|ˈnoʊtəbl|B
notorious|adj|（悪いことで）有名な|noʊˈtɔːriəs|B
nourish|v|栄養を与える・育む|ˈnɝːɪʃ|B
noxious|adj|有毒な・有害な|ˈnɑːkʃəs|A
numerous|adj|多数の|ˈnuːmərəs|C
nurture|v|育てる・育む；（名詞）養育・環境|ˈnɝːtʃɚ|B
nutrition|n|栄養（摂取）|nuˈtrɪʃən|C
obesity|n|肥満|oʊˈbiːsəti|B
object to|phr|～に反対する（to の後は名詞・動名詞）
objective|n|目標；（形容詞）客観的な|əbˈdʒektɪv|C
obligation|n|義務|ˌɑːblɪˈɡeɪʃən|C
oblige|v|（be obliged to do で）～せざるを得ない|əˈblaɪdʒ|C
obsess|v|（be obsessed with で）～に取りつかれている|əbˈses|B
obsession|n|強迫観念・執着|əbˈseʃən|B
obvious|adj|明らかな|ˈɑːbviəs|C
occasion|n|場合・機会・行事|əˈkeɪʒən|C
occasionally|adv|時折|əˈkeɪʒənəli|C
occupation|n|職業・占領|ˌɑːkjəˈpeɪʃən|C
occupy|v|占める・占領する|ˈɑːkjəpaɪ|C
odd|adj|奇妙な・奇数の|ɑːd|C
offend|v|気分を害する・罪を犯す|əˈfend|C
offense|n|違反・罪・攻撃|əˈfens|C
offspring|n|子・子孫（単複同形）|ˈɔːfsprɪŋ|B
on account of|phr|～のために（理由）
on the basis of|phr|～に基づいて
on the contrary|phr|それどころか・それとは反対に
on the grounds that|phr|～という理由で
on the spot|phr|即座に・その場で
on the whole|phr|概して・全体として見ると
onerous|adj|煩わしい・重荷となる|ˈɑːnərəs|A
onset|n|（よくないことの）始まり・発症|ˈɑːnset|B
oppose|v|反対する（be opposed to で ～に反対である）|əˈpoʊz|C
optimal|adj|最適の|ˈɑːptɪməl|B
organ|n|臓器・器官・オルガン|ˈɔːrɡən|C
orient|v|（to ～に）向ける・適応させる|ˈɔːrient|B
orientation|n|方向づけ・（新人向けの）説明会・志向|ˌɔːriənˈteɪʃən|B
ostensible|adj|表向きの|ɑːˈstensəbl|A
ostracize|v|（仲間から）締め出す|ˈɑːstrəsaɪz|A
out of the question|phr|論外で・不可能な
outbreak|n|（戦争・病気の）発生・勃発|ˈaʊtbreɪk|B
outlet|n|はけ口・販売店・コンセント|ˈaʊtlet|B
outline|n|概要・輪郭|ˈaʊtlaɪn|C
outlook|n|見通し・見解|ˈaʊtlʊk|B
outrage|n|激しい怒り・暴挙；（動詞）激怒させる|ˈaʊtreɪdʒ|B
overcome|v|克服する|ˌoʊvɚˈkʌm|C
overwhelm|v|圧倒する|ˌoʊvɚˈwelm|B
overwhelming|adj|圧倒的な|ˌoʊvɚˈwelmɪŋ|B
paltry|adj|わずかな・取るに足らない|ˈpɔːltri|A
paradigm|n|（ものの見方の）枠組み・典型|ˈpærədaɪm|B
paradox|n|逆説・矛盾|ˈpærədɑːks|B
parallel|adj|平行の・類似した；（名詞）類似点|ˈpærəlel|C
parliament|n|議会・国会|ˈpɑːrləmənt|B
partial|adj|部分的な・不公平な・（to ～が）大好きな|ˈpɑːrʃl|B
passion|n|情熱|ˈpæʃən|C
pay off|phr|（借金を）完済する・（努力が）報われる
peculiar|adj|奇妙な・（to ～に）特有の|pɪˈkjuːliɚ|C
pedestrian|n|歩行者|pəˈdestriən|B
pejorative|adj|軽蔑的な|pɪˈdʒɔːrətɪv|A
penalty|n|罰・罰金|ˈpenəlti|C
penchant|n|（for ～への）好み・傾向|ˈpentʃənt|A
perceive|v|知覚する・（as ～と）理解する|pɚˈsiːv|C
perception|n|知覚・認識|pɚˈsepʃən|C
permanent|adj|永続的な・常設の|ˈpɝːmənənt|C
pernicious|adj|有害な・致命的な|pɚˈnɪʃəs|A
persuade|v|説得する・（O to do で）説得して～させる|pɚˈsweɪd|C
pervade|v|～に広がる・浸透する|pɚˈveɪd|A
pervasive|adj|広く行き渡った|pɚˈveɪsɪv|B
pharmaceutical|adj|製薬の・薬学の|ˌfɑːrməˈsuːtɪkl|B
philanthropy|n|慈善（活動）|fɪˈlænθrəpi|A
physician|n|内科医・医師|fɪˈzɪʃən|C
pile|n|積み重ね・（a pile of で）たくさんの|paɪl|C
pinpoint|v|正確に指摘する・特定する|ˈpɪnpɔɪnt|B
pioneer|n|先駆者|ˌpaɪəˈnɪr|C
plague|n|疫病・災難；（動詞）悩ます|pleɪɡ|B
play a part in|phr|～で役割を果たす
plead|v|嘆願する・（罪状を）申し立てる|pliːd|B
plethora|n|過多・大量（a plethora of で 大量の）|ˈpleθərə|A
poignant|adj|痛切な・心を打つ|ˈpɔɪnjənt|A
polarize|v|二極化させる・分裂させる|ˈpoʊləraɪz|B
polite|adj|礼儀正しい|pəˈlaɪt
ponder|v|熟考する|ˈpɑːndɚ|B
possession|n|所有・（possessions で）所有物|pəˈzeʃən|C
poverty|n|貧困|ˈpɑːvɚti|C
practitioner|n|開業医・（専門職の）実践者|prækˈtɪʃənɚ|B
pragmatic|adj|実用的な・実際的な|præɡˈmætɪk|B
precarious|adj|不安定な・危険な|prɪˈkeriəs|A
precious|adj|貴重な・高価な|ˈpreʃəs|C
predator|n|捕食動物・略奪者|ˈpredətɚ|B
predominant|adj|優勢な・主な|prɪˈdɑːmɪnənt|B
pregnant|adj|妊娠している|ˈpreɡnənt|C
prejudice|n|偏見|ˈpredʒədɪs|C
preliminary|adj|予備の・準備の|prɪˈlɪmɪneri|B
premature|adj|早すぎる・時期尚早の|ˌpriːməˈtʃʊr|B
prerequisite|n|前提条件|priˈrekwəzɪt|B
prescription|n|処方（箋）|prɪˈskrɪpʃən|C
presence|n|存在・出席|ˈprezns|C
presumably|adv|おそらく|prɪˈzuːməbli|B
primary|adj|主要な・最初の・初等の|ˈpraɪmeri|C
prime|adj|主要な・最良の（prime minister で 首相）|praɪm|C
primitive|adj|原始的な|ˈprɪmətɪv|C
priority|n|優先（事項）|praɪˈɔːrəti|C
privilege|n|特権・名誉|ˈprɪvəlɪdʒ|C
procedure|n|手順・手続き|prəˈsiːdʒɚ|C
productive|adj|生産的な|prəˈdʌktɪv|C
profession|n|（専門的な）職業|prəˈfeʃən|C
proficiency|n|熟達・技能|prəˈfɪʃənsi|B
proficient|adj|（in ～に）熟達した|prəˈfɪʃənt|B
profound|adj|深い・重大な|prəˈfaʊnd|B
prolific|adj|多作の・多産の|prəˈlɪfɪk|B
promotion|n|昇進・販売促進|prəˈmoʊʃən|C
prone|adj|（to ～の）傾向がある・～しがちな|proʊn|B
propensity|n|（to do）傾向・性癖|prəˈpensəti|A
proper|adj|適切な・正式な|ˈprɑːpɚ|C
property|n|財産・所有物・不動産・特性|ˈprɑːpɚti|C
proposition|n|提案・命題|ˌprɑːpəˈzɪʃən|B
prospect|n|見込み・展望|ˈprɑːspekt|C
prosperity|n|繁栄|prɑːˈsperəti|B
protagonist|n|主人公・主導者|proʊˈtæɡənɪst|B
protracted|adj|長引いた|proʊˈtræktɪd|A
provisional|adj|仮の・暫定的な|prəˈvɪʒənl|B
prowess|n|優れた腕前|ˈpraʊəs|A
proximity|n|近いこと・近接|prɑːkˈsɪməti|B
publication|n|出版（物）・発表|ˌpʌblɪˈkeɪʃən|C
publicity|n|評判・宣伝|pʌbˈlɪsəti|B
pure|adj|純粋な・まったくの|pjʊr|C
pursue|v|追求する・追跡する|pɚˈsuː|C
pursuit|n|追求・追跡|pɚˈsuːt|C
put forward|phr|（案を）提出する・提案する
quandary|n|困惑・板ばさみ|ˈkwɑːndəri|A
quantity|n|量|ˈkwɑːntəti|C
quell|v|鎮める・抑える|kwel|A
quest|n|探求・追求|kwest|B
quintessential|adj|典型的な・真髄の|ˌkwɪntɪˈsenʃl|A
quote|v|引用する・見積もる；（名詞）引用・見積もり|kwoʊt|C
racial|adj|人種の|ˈreɪʃl|C
radical|adj|根本的な・急進的な|ˈrædɪkl|B
random|adj|無作為の・でたらめな|ˈrændəm|B
rapport|n|（相互の）信頼関係|ræˈpɔːr|A
ratio|n|比率|ˈreɪʃioʊ|C
raw|adj|生の・未加工の|rɔː|C
readily|adv|快く・容易に|ˈredɪli|B
realistic|adj|現実的な|ˌriːəˈlɪstɪk|C
realm|n|領域・王国|relm|B
reasonable|adj|妥当な・（値段が）手ごろな|ˈriːznəbl|C
rebel|n|反逆者；（動詞 /rɪˈbel/）反抗する|ˈrebl|B
rebellion|n|反乱・反抗|rɪˈbeljən|B
rebuke|v|叱責する；（名詞）叱責|rɪˈbjuːk|A
recently|adv|最近|ˈriːsntli|C
reciprocal|adj|相互の・互恵的な|rɪˈsɪprəkl|B
reckless|adj|無謀な・向こう見ずな|ˈrekləs|B
recommendation|n|推薦・勧告|ˌrekəmenˈdeɪʃən|C
reconstruct|v|再建する・再現する|ˌriːkənˈstrʌkt|B
rectify|v|是正する・修正する|ˈrektɪfaɪ|B
reduction|n|削減・縮小|rɪˈdʌkʃən|C
refer to|phr|～に言及する・～を参照する・（A as B で）AをBと呼ぶ
refine|v|洗練する・精製する|rɪˈfaɪn|B
reflection|n|反射・反映・熟考|rɪˈflekʃən|C
refugee|n|難民|ˌrefjuˈdʒiː|C
refute|v|論駁する・反証する|rɪˈfjuːt|A
regime|n|政権・体制|reɪˈʒiːm|B
regulate|v|規制する・調整する|ˈreɡjəleɪt|C
rehabilitation|n|リハビリ・社会復帰・復興|ˌriːəˌbɪlɪˈteɪʃən|B
relate|v|関係づける・（be related to で）～と関係がある|rɪˈleɪt|C
relation|n|関係・親戚|rɪˈleɪʃən|C
relatively|adv|比較的|ˈrelətɪvli|C
relegate|v|格下げする・追いやる|ˈrelɪɡeɪt|A
relentless|adj|容赦ない・絶え間ない|rɪˈlentləs|B
reliance|n|（on ～への）依存・信頼|rɪˈlaɪəns|B
relieve|v|和らげる・安心させる|rɪˈliːv|C
religion|n|宗教|rɪˈlɪdʒən|C
relinquish|v|（権利などを）放棄する|rɪˈlɪŋkwɪʃ|A
remarkable|adj|注目すべき・著しい|rɪˈmɑːrkəbl|C
reminiscent|adj|（of ～を）思い出させる|ˌremɪˈnɪsnt|B
remorse|n|深い後悔・自責の念|rɪˈmɔːrs|A
renounce|v|（権利などを）放棄する・断念する|rɪˈnaʊns|A
renowned|adj|（for ～で）有名な|rɪˈnaʊnd|B
reopen|v|再開する・再び開ける|riˈoʊpən
repeat|v|繰り返す|rɪˈpiːt
repel|v|追い払う・はじく|rɪˈpel|B
replicate|v|複製する・（実験を）再現する|ˈreplɪkeɪt|B
repress|v|抑圧する・（感情を）抑える|rɪˈpres|B
reprimand|v|叱責する；（名詞）懲戒|ˈreprɪmænd|A
repudiate|v|拒絶する・否認する|rɪˈpjuːdieɪt|A
rescind|v|（法律・契約を）無効にする|rɪˈsɪnd|A
rescue|v|救助する；（名詞）救助|ˈreskjuː|C
reside|v|住む・（in ～に）ある|rɪˈzaɪd|B
resilience|n|回復力・しなやかさ|rɪˈzɪliəns|B
resilient|adj|回復力のある・立ち直りの早い|rɪˈzɪliənt|B
resistance|n|抵抗（力）|rɪˈzɪstəns|C
resolute|adj|断固とした|ˈrezəluːt|B
respect|n|尊敬・（in this respect で）点；（動詞）尊敬する|rɪˈspekt|C
restriction|n|制限|rɪˈstrɪkʃən|C
result from|phr|～から生じる（原因が後ろ）
result in|phr|～という結果になる（結果が後ろ）
resurgence|n|復活・再燃|rɪˈsɝːdʒəns|A
retract|v|撤回する・引っ込める|rɪˈtrækt|A
retrieve|v|取り戻す・（情報を）検索する|rɪˈtriːv|B
revere|v|崇敬する|rɪˈvɪr|A
rhetoric|n|修辞（法）・美辞麗句|ˈretərɪk|A
ridiculous|adj|ばかげた|rɪˈdɪkjələs|C
rigorous|adj|厳密な・厳しい|ˈrɪɡərəs|B
ritual|n|儀式・習慣的行為|ˈrɪtʃuəl|B
rough|adj|粗い・おおよその・乱暴な|rʌf|C
route|n|道筋・経路|ruːt|C
run into|phr|～に偶然出会う・（問題に）ぶつかる
run the risk of|phr|～の危険を冒す
sanction|n|制裁・認可；（動詞）認可する|ˈsæŋkʃən|B
sanitation|n|公衆衛生・下水設備|ˌsænɪˈteɪʃən|B
scenery|n|（ある地域全体の）景色（不可算）|ˈsiːnəri|C
scholar|n|学者|ˈskɑːlɚ|C
scientific|adj|科学の・科学的な|ˌsaɪənˈtɪfɪk|C
scope|n|範囲・余地|skoʊp|C
scratch|v|ひっかく；（from scratch で）ゼロから|skrætʃ|C
scrupulous|adj|綿密な・良心的な|ˈskruːpjələs|A
see to it that|phr|～するように取り計らう
segment|n|区分・部分|ˈseɡmənt|B
seldom|adv|めったに～ない|ˈseldəm|C
senior|adj|年上の・上級の；（名詞）高齢者・上級生|ˈsiːnjɚ|C
sensation|n|感覚・大評判|senˈseɪʃən|C
sentiment|n|感情・心情・意見|ˈsentɪmənt|B
sequence|n|連続・順序|ˈsiːkwəns|C
serve as|phr|～として役立つ・～を務める
setback|n|つまずき・後退|ˈsetbæk|B
severe|adj|厳しい・深刻な|sɪˈvɪr|C
shallow|adj|浅い・浅はかな|ˈʃæloʊ|C
shame|n|恥・残念なこと（It's a shame that ～）|ʃeɪm|C
shed light on|phr|～を解明する・～に光を当てる
shelter|n|避難所・住まい|ˈʃeltɚ|C
shrewd|adj|抜け目のない・鋭い|ʃruːd|B
similarity|n|類似（点）|ˌsɪməˈlærəti|C
simultaneous|adj|同時の|ˌsaɪmlˈteɪniəs|B
sincere|adj|誠実な・心からの|sɪnˈsɪr|C
slight|adj|わずかな|slaɪt|C
smoke|v|たばこを吸う；（名詞）煙|smoʊk
smooth|adj|なめらかな・順調な|smuːð|C
so to speak|phr|いわば
sofa|n|ソファー|ˈsoʊfə
solace|n|慰め|ˈsɑːləs|A
sole|adj|唯一の|soʊl|C
solicit|v|（援助・意見などを）求める|səˈlɪsɪt|A
solid|adj|固体の・しっかりした；（名詞）固体|ˈsɑːlɪd|C
sophisticated|adj|洗練された・高度な|səˈfɪstɪkeɪtɪd|C
soul|n|魂・精神|soʊl|C
sovereignty|n|主権・統治権|ˈsɑːvrənti|B
span|n|期間・範囲（attention span で 集中力の持続時間）|spæn|B
spare|v|（時間などを）割く・（手間などを）省かせる；（形容詞）予備の|sper|C
spectator|n|観客|ˈspekteɪtɚ|C
spiritual|adj|精神的な・宗教的な|ˈspɪrɪtʃuəl|C
spoil|v|台無しにする・甘やかす|spɔɪl|C
sponsor|n|後援者・スポンサー；（動詞）後援する|ˈspɑːnsɚ|C
spontaneous|adj|自発的な・自然に起こる|spɑːnˈteɪniəs|B
sporadic|adj|散発的な|spəˈrædɪk|B
spurious|adj|偽の・もっともらしい|ˈspjʊriəs|A
squander|v|浪費する|ˈskwɑːndɚ|A
stagnation|n|停滞・不景気|stæɡˈneɪʃən|B
stance|n|立場・態度|stæns|B
startle|v|びっくりさせる|ˈstɑːrtl|B
starve|v|飢える・飢え死にする|stɑːrv|C
static|adj|静的な・動きのない|ˈstætɪk|B
staunch|adj|忠実な・断固とした|stɔːntʃ|A
steadfast|adj|揺るぎない・不動の|ˈstedfæst|A
stigma|n|汚名・不名誉|ˈstɪɡmə|B
stimulus|n|刺激（複数形 stimuli）|ˈstɪmjələs|C
stretch|v|伸ばす・広がる|stretʃ|C
stringent|adj|厳しい・厳格な|ˈstrɪndʒənt|A
strive|v|（to do / for ～）努力する・励む|straɪv|B
subordinate|adj|下位の・従属的な；（名詞）部下|səˈbɔːrdənət|B
subsequent|adj|その後の・（to ～に）続いて起こる|ˈsʌbsɪkwənt|B
subsidy|n|補助金|ˈsʌbsədi|B
substance|n|物質・実質|ˈsʌbstəns|C
substantiate|v|実証する|səbˈstænʃieɪt|A
suburb|n|郊外|ˈsʌbɝːb|C
succinct|adj|簡潔な|səkˈsɪŋkt|A
succumb|v|（to ～に）屈する・負ける|səˈkʌm|B
sufficient|adj|十分な|səˈfɪʃənt|C
suggestion|n|提案・示唆|səɡˈdʒestʃən|C
summon|v|呼び出す・（勇気を）奮い起こす|ˈsʌmən|B
sun|n|太陽|sʌn
suppose|v|思う・仮定する（be supposed to do で ～することになっている）|səˈpoʊz|C
suppress|v|抑圧する・（感情を）抑える|səˈpres|B
supreme|adj|最高の|suːˈpriːm|B
surplus|n|余剰・黒字|ˈsɝːplʌs|B
surround|v|囲む|səˈraʊnd|C
surroundings|n|環境・周囲|səˈraʊndɪŋz|C
surveillance|n|監視|sɚˈveɪləns|B
survival|n|生き残ること・生存|sɚˈvaɪvl|C
suspend|v|一時停止する・つるす|səˈspend|C
swim|v|泳ぐ|swɪm
symbol|n|象徴・記号|ˈsɪmbl|C
sympathy|n|同情・共感|ˈsɪmpəθi|C
synthesize|v|合成する・総合する|ˈsɪnθəsaɪz|B
taboo|n|禁忌・タブー|təˈbuː|B
tacit|adj|暗黙の|ˈtæsɪt|A
tactic|n|戦術・作戦|ˈtæktɪk|B
take advantage of|phr|～を利用する・～につけこむ
take for granted|phr|当然のことと思う（take it for granted that ～）
take in|phr|取り入れる・理解する・だます
take into account|phr|～を考慮に入れる
take up|phr|（時間・場所を）とる・（趣味などを）始める
tangible|adj|具体的な・有形の|ˈtændʒəbl|B
tea|n|茶・紅茶|tiː
tear|v|引き裂く（tear-tore-torn）；（名詞 /tɪr/）涙|ter|C
tedious|adj|退屈な・うんざりする|ˈtiːdiəs|B
tell from|phr|（tell A from B で）AとBを区別する
temperament|n|気質|ˈtemprəmənt|B
tempt|v|誘惑する・（be tempted to do で）～したくなる|tempt|C
tenacious|adj|粘り強い|təˈneɪʃəs|A
tenuous|adj|希薄な・根拠の弱い|ˈtenjuəs|A
terrain|n|地形・地域|təˈreɪn|B
territory|n|領土・縄張り・領域|ˈterətɔːri|C
terror|n|恐怖・テロ|ˈterɚ|C
testify|v|証言する・（to ～を）証明する|ˈtestɪfaɪ|B
testimony|n|証言・証拠|ˈtestɪmoʊni|B
therapy|n|療法・治療|ˈθerəpi|C
thereby|adv|それによって|ˌðerˈbaɪ|B
third|adj|3番目の；（名詞）3分の1（a third）|θɝːd
thoughtful|adj|思いやりのある・考え込んだ|ˈθɔːtfl|C
threat|n|脅威・脅し|θret|C
thrill|n|ぞくぞくする感じ；（動詞）わくわくさせる|θrɪl|C
thus|adv|したがって・このように|ðʌs|C
tide|n|潮・潮流|taɪd|C
tight|adj|きつい・厳しい・（予定が）詰まった|taɪt|C
tissue|n|（生物の）組織・ティッシュペーパー|ˈtɪʃuː|C
tolerate|v|我慢する・大目に見る|ˈtɑːləreɪt|C
tone|n|口調・音色|toʊn|C
tough|adj|困難な・たくましい・硬い|tʌf|C
tourism|n|観光業|ˈtʊrɪzəm|C
trait|n|特性・特徴|treɪt|C
transcend|v|超越する|trænˈsend|B
transition|n|移行・変遷|trænˈzɪʃən|B
trauma|n|心的外傷・トラウマ|ˈtraʊmə|B
treaty|n|条約|ˈtriːti|C
tremendous|adj|ものすごい・莫大な|trəˈmendəs|C
tribe|n|部族|traɪb|C
trigger|v|引き起こす・きっかけとなる；（名詞）引き金|ˈtrɪɡɚ|B
triumph|n|大勝利・大成功|ˈtraɪʌmf|C
trivial|adj|ささいな・取るに足らない|ˈtrɪviəl|B
turmoil|n|混乱・騒動|ˈtɝːmɔɪl|B
turn out|phr|（to be ～だと）わかる・（結果的に）～になる
ultimate|adj|究極の・最終的な|ˈʌltɪmət|C
underlie|v|～の根底にある|ˌʌndɚˈlaɪ|B
unemployment|n|失業|ˌʌnɪmˈplɔɪmənt|C
unequivocal|adj|明白な・あいまいさのない|ˌʌnɪˈkwɪvəkl|A
unify|v|統一する|ˈjuːnɪfaɪ|B
unique|adj|唯一の・独特の|juˈniːk|C
unite|v|結合する・団結する|juˈnaɪt|C
universe|n|宇宙|ˈjuːnɪvɝːs
unrealistic|adj|非現実的な|ˌʌnriːəˈlɪstɪk
uphold|v|支持する・（判決を）維持する|ʌpˈhoʊld|B
urge|v|（O to do で）強く促す；（名詞）衝動|ɝːdʒ|C
usurp|v|（権力などを）奪う|juːˈzɝːp|A
utilize|v|利用する・活用する|ˈjuːtəlaɪz|B
utmost|adj|最大限の（do one's utmost で 全力を尽くす）|ˈʌtmoʊst|B
utter|v|（声・言葉を）発する；（形容詞）まったくの|ˈʌtɚ|B
vacuum|n|真空・空白|ˈvækjuːm|C
validate|v|有効にする・正当性を立証する|ˈvælɪdeɪt|B
vanish|v|消える|ˈvænɪʃ|B
variety|n|多様性・（a variety of で）さまざまな|vəˈraɪəti|C
various|adj|さまざまな|ˈveriəs|C
vehement|adj|激しい・猛烈な|ˈviːəmənt|A
venture|n|冒険的事業；（動詞）思い切って～する|ˈventʃɚ|C
venue|n|開催地・会場|ˈvenjuː|B
verdict|n|評決・判断|ˈvɝːdɪkt|B
versatile|adj|多才な・用途の広い|ˈvɝːsətl|B
vessel|n|船・容器・血管|ˈvesl|C
veteran|n|ベテラン・退役軍人|ˈvetərən|B
vicious|adj|悪意のある・凶暴な（vicious circle で 悪循環）|ˈvɪʃəs|B
victim|n|犠牲者・被害者|ˈvɪktɪm|C
vigorous|adj|精力的な・活発な|ˈvɪɡərəs|B
vindictive|adj|執念深い・報復的な|vɪnˈdɪktɪv|A
violate|v|違反する・侵害する|ˈvaɪəleɪt|C
violence|n|暴力|ˈvaɪələns|C
violent|adj|暴力的な・激しい|ˈvaɪələnt|C
virtually|adv|事実上・ほとんど|ˈvɝːtʃuəli|C
virtue|n|美徳・長所（by virtue of で ～のおかげで）|ˈvɝːtʃuː|C
visual|adj|視覚の|ˈvɪʒuəl|C
volume|n|量・音量・（本の）巻|ˈvɑːljuːm|C
voluntary|adj|自発的な・ボランティアの|ˈvɑːlənteri|C
wane|v|衰える・弱まる|weɪn|B
warrant|v|正当化する・保証する；（名詞）令状|ˈwɔːrənt|B
wary|adj|（of ～に）用心深い|ˈweri|B
wealth|n|富・豊富|welθ|C
welfare|n|福祉・幸福|ˈwelfer|C
what is called|phr|いわゆる
whereby|adv|（それによって）～する|werˈbaɪ|B
wildlife|n|野生生物|ˈwaɪldlaɪf|C
willing|adj|（to do）～するのをいとわない|ˈwɪlɪŋ|C
wise|adj|賢い（none the wiser で 少しも賢くなっていない・わからないまま）|waɪz
with respect to|phr|～に関して
withstand|v|耐える・持ちこたえる|wɪðˈstænd|B
work out|phr|解決する・（計画を）練る・うまくいく・運動する
worship|n|崇拝・礼拝|ˈwɝːʃɪp|C
worthy|adj|（of ～に）値する|ˈwɝːði|C
wound|n|傷；（動詞）傷つける|wuːnd|C
`);
