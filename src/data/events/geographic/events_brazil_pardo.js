// events_brazil_pardo.js — the forty-three per cent.
//
// `npm run check-events` put Brazil:pardo_brazilian at the top of the
// unwritten-group queue: 43% of every Brazilian the engine draws, and not one
// guard or line in the corpus named them. The Brazil content that touched
// colour at all (`bra_racial_democracy`, `la_bra_cor_identity`) was written
// for the question as an American would pose it — which box, Black or white —
// and the pardo experience is precisely that the question has no two sides.
// It is a continuum with a word at every point on it, and the word moves
// depending on who is saying it, in which room, in which city, in which year.
//
// Who the engine actually draws (20,000 births): birth years flat 1930-2005,
// half and half by sex, every wealth tier (the engine does not correlate tier
// with colour, so a pardo in Jardins exists here and has to be written for),
// and — the part that decides everything — 48% rural, all of it in the sertão
// of Bahia, with the rest split across São Paulo, Rio, Fortaleza and now
// Salvador. So half of these lives begin as caboclos in a dry interior where
// the word pardo is only ever on a form, and a good share of those end in São
// Paulo, where they are baianos whatever state they came from.
//
// The arc the module is built on is the declaration. The colour word said at
// the family table; the one a clerk writes without asking; the one the census
// enumerator writes when your mother answers for the household; the one you
// give yourself when it is your turn; the one a university form asks for once
// the quotas exist; and the one three strangers behind a table decide for you
// at a heteroidentification panel. Then December 2023, when the census says
// the country is, for the first time since 1991, more pardo than anything else.
//
// Dates used, all checked. Modesto Brocos paints A Redenção de Cam in 1895.
// João Batista de Lacerda tells the Universal Races Congress in London in 1911
// that Brazil will be white within a century. The Carteira Profissional of
// 1932 carries the bearer's physical description, colour included, until the
// 1969 CTPS. The Afonso Arinos law makes racial discrimination a misdemeanour
// in 1951; the 1970 census drops the colour question; the 1976 PNAD asks it
// open and records 136 distinct answers; the 1991 census carries the black
// movement's campaign "Não deixe sua cor passar em branco". The 1988
// constitution makes racism a crime without bail or limitation and the Lei Caó
// (7.716) follows in January 1989. Ilê Aiyê comes down from Curuzu for the
// first time at Carnival 1975 and A Tarde calls it "bloco racista, nota
// destoante". The Tietê bus terminal opens in 1982. São Paulo's municipal law
// 11.995 of January 1996 puts the anti-discrimination sign in every lift.
// UNEB and UERJ run the first racial quotas in 2003, UnB in 2004 with a
// commission that judges photographs; the Teixeira da Cunha twins are split by
// it in 2007. The STF upholds quotas unanimously in April 2012 and Lei 12.711
// follows in August. The domestic workers' amendment (EC 72) is promulgated in
// April 2013. Lei 12.990 reserves 20% of federal posts in 2014 and the
// heteroidentification panels are standardised in 2016. The 2022 census colour
// results are published in December 2023: pardo 45.3%, branco 43.5%, preto
// 10.2%. The first Marcha do Orgulho Crespo is São Paulo, July 2015.

const IS_BR = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Brazil'
const PARDO = (G) => G.character?.ethnicity === 'pardo_brazilian'
const BR = (G) => IS_BR(G) && PARDO(G)

const CITIES = ['br_sao_paulo', 'br_rio', 'br_northeast', 'br_salvador']
const SERTAO = (G) => G.place?.id === 'br_rural'
const IN_CITY = (G) => CITIES.includes(G.place?.id)
const SP = (G) => G.place?.id === 'br_sao_paulo'
const SALVADOR = (G) => G.place?.id === 'br_salvador'

const FEMALE = (G) => G.character?.gender === 'female'
const MALE = (G) => G.character?.gender === 'male'
// Where the character stands NOW, not the tier they were born into: a pardo
// girl from the sertão who became a recording artist is not the one carrying
// a parcel to the ninth floor at fifty-three.
const TIER = (G) => G.wealthTier ?? G.character?.wealthTier ?? 2
// Work where a person ends up reading other people's applications.
const OFFICE_FIELDS = ['finance', 'government', 'law', 'healthcare', 'education', 'engineering', 'technology',
  'real_estate', 'media', 'social_services', 'academia', 'hospitality', 'manufacturing', 'pharmacy', 'science',
  'architecture', 'politics', 'transport', 'aviation']
const HIRES = (G) => OFFICE_FIELDS.includes(G.career?.field) && (G.career?.level ?? 1) >= 2

const kids = (G) => (G.children ?? []).filter(c => c.alive !== false).map(c => ({ ...c, age: G.age - (c.ageAtBirth ?? G.age) }))
const hasInfant = (G) => kids(G).some(c => c.age >= 0 && c.age <= 1)
const hasChildAged = (G, lo, hi, gender = null) => kids(G).some(c => c.age >= lo && c.age <= hi && (!gender || c.gender === gender))

const once = (G, key) => !G.mem?.[key]
// A follow-through told in the present tense has to happen when it is still
// the present: `key` is a mem year the trigger stored.
const within = (G, key, lo, hi) => {
  const y = G.mem?.[key]
  return typeof y === 'number' && G.currentYear - y >= lo && G.currentYear - y <= hi
}

const CENSUS_YEARS = [1950, 1960, 1980, 1991, 2000, 2010]

const DOMESTICA_CONTEXT = 'Domestic service was the largest single occupation for Black and pardo Brazilian women for most of the twentieth century. The "dependência de empregada" — a maid\'s room of a few square metres beside the service area — was standard in apartment plans; domestic workers had no statutory working hours, overtime or FGTS until the constitutional amendment of 2013.'

// The word for a police stop is a regional fact, and saying the wrong one is
// how a paulista gives himself away in Salvador.
const stopWord = (G) =>
  G.place?.id === 'br_rio' ? 'dura' : SP(G) ? 'enquadro' : 'baculejo'

export const BRAZIL_PARDO_EVENTS = [

  // ── THE WORDS AT THE TABLE ─────────────────────────────────────────────────

  {
    id: 'br_pd_colour_words',
    phase: null,
    weight: 60,
    when: (G) => BR(G) && G.age >= 6 && G.age <= 11 && once(G, 'br_pd_words'),
    text: (G) => SERTAO(G)
      ? 'In the sertão everybody at your grandmother\'s table has a colour and no two are the same. Your brother is galego because the sun turns his hair the colour of dry grass, your uncle is caboclo like the old man in the photograph who was half from the people who were here first, your mother is morena, and you are cor de canela to your aunt and queimadinho to the boy at the well. Nobody says pardo. Pardo is a word on a form, and nobody here has seen a form.'
      : 'At your grandmother\'s table everybody has a colour and no two are the same. Your brother is sarará for the copper in his hair, your cousin is moreninha, your father is moreno when your mother is pleased with him and something else when she is not, and you are cor de canela to your aunt and café com leite to the boy downstairs. The hair is discussed separately, as bom or ruim, as if it had a character. Nobody says pardo. Pardo is a word on a form.',
    choices: null,
    // The table's words are the first answer; the census is where the
    // character will one day have to give their own. The echo waits in the
    // queue until a census year finds them grown.
    effect: (p) => { p.setMem('br_pd_words', true); p.e += 1; p.addFlag('pardo_colour_words'); p.scheduleEcho('br_pd_census_adult', 8) },
  },

  {
    id: 'br_pd_redencao_de_cam',
    phase: null,
    weight: 22,
    when: (G) => BR(G) && G.currentYear >= 1948 && G.age >= 12 && G.age <= 16 && !G.flags.has('never_schooled') && once(G, 'br_pd_redencao'),
    text: 'The history book has a painting from 1895 in it, printed small and grey. A barefoot Black grandmother stands with her hands raised to the sky; the mother beside her is lighter and holds a baby on her lap; the father is a white man in the doorway; the baby is white. The caption says A Redenção de Cam, and underneath, in smaller type, something about the formation of the Brazilian people. The teacher turns the page. You go back to it at home and look for a long time at the grandmother\'s hands.',
    context: 'Modesto Brocos\'s "A Redenção de Cam" (1895) depicts three generations whitening toward a white child, and was read at the time as an illustration of "embranquecimento" — the policy and ideology that Brazil\'s population would whiten through European immigration and mixture. At the 1911 Universal Races Congress in London, João Batista de Lacerda predicted Brazil would be white within a century.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_redencao', true); p.e += 2; p.addFlag('saw_redencao_de_cam') },
  },

  // ── THE WORD SOMEONE ELSE WRITES ───────────────────────────────────────────

  {
    id: 'br_pd_carteira_profissional',
    phase: null,
    weight: 24,
    when: (G) => BR(G) && G.currentYear <= 1968 && G.age >= 14 && G.age <= 19 && once(G, 'br_pd_carteira'),
    text: 'The clerk at the Ministry of Labour post fills in your Carteira Profissional with a fountain pen. Height. Eyes. Hair. Colour. He does not ask the colour; he looks at you for as long as it takes to write it, and blots it, and turns the booklet round for you to sign. You read it on the bus. It is not the word your mother uses and not the word the boys at the corner use, and it is the one that will be in your pocket for the rest of your working life.',
    context: 'The Carteira Profissional instituted in 1932 recorded the bearer\'s physical description, including colour, alongside a photograph and fingerprint. It was replaced by the Carteira de Trabalho e Previdência Social in 1969.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_carteira', true); p.addFlag('carteira_colour_written') },
  },

  {
    id: 'br_pd_census_child',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && CENSUS_YEARS.includes(G.currentYear) && G.age >= 5 && G.age <= 15 && once(G, 'br_pd_census_child'),
    text: 'The recenseador sits at the kitchen table with the questionnaire on his knee and a pencil he licks. Your mother answers for everybody, because that is how it is done: your father, herself, then the children in order of age. For herself she says parda, and for your brother parda, and then she comes to you, the lightest of the children, and says branco. The man writes it down without looking up. Nobody at the table mentions it afterwards, because there is nothing, apparently, to mention.',
    context: 'In the Brazilian census one household member answers for everyone. Demographers have documented for decades that parents tend to classify children lighter than they classify themselves — "whitening" happening on the form, one household at a time.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_census_child', true); p.addFlag('census_recorded_white'); p.scheduleEcho('br_pd_census_adult', 10) },
  },

  {
    id: 'br_pd_census_1970',
    phase: null,
    weight: 120,
    when: (G) => BR(G) && G.currentYear === 1970 && G.age >= 10 && once(G, 'br_pd_census70'),
    text: 'The census man asks how many rooms, whether the water comes from a pipe or a well, whether anyone in the house can read, what everyone does for a living. He closes the folder. Your father, who has been waiting for it, asks whether he is not going to ask the colour. The man says it is not on the form this time, and puts his pen away, and your father looks at the door for a while after he has gone.',
    context: 'The 1970 census, taken under the military government, omitted the colour question entirely — the only Brazilian census since 1940 to do so. With no numbers, there was nothing to contradict the official account of a racial democracy.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_census70', true); p.e += 1 },
  },

  {
    id: 'br_pd_pnad_1976',
    phase: null,
    weight: 150,
    when: (G) => BR(G) && G.currentYear === 1976 && G.age >= 15 && once(G, 'br_pd_word'),
    text: 'A woman from the IBGE comes with a clipboard for the household survey. This year, she explains, the colour question is open: she will write down whatever you say. Your aunt says morena for herself. Your uncle says moreno-escuro and laughs. Then she turns to you, pencil up, and waits, and the waiting is longer than you expected a pencil to wait.',
    context: 'The 1976 PNAD asked colour as an open question. Respondents gave 136 distinct answers, among them "burro-quando-foge", "queimada-de-praia", "puxa-para-branco", "morena-bem-chegada", "cor-firma", "paraíba" and "azul-marinho". The list is still cited as the best single document of how Brazilians describe themselves when nobody gives them boxes.',
    choices: [
      {
        // The answers are feminine whatever the speaker's sex: they agree
        // with "a cor", the colour, which is what the question asks for.
        text: 'Morena. It is what everyone calls you.',
        tag: 'yielding',
        outcome: 'She writes it. When the survey is tabulated there are 136 answers in the country, from puxa-para-branco to burro-quando-foge, and morena is the second most common after branca.',
        effect: (p) => { p.setMem('br_pd_word', 'moreno'); p.m += 1 },
      },
      {
        text: 'Parda. It is the word on the documents.',
        tag: null,
        outcome: 'She writes it without comment. Your aunt looks at you as if you had given the family\'s address to a stranger, which in a way you have.',
        effect: (p) => { p.setMem('br_pd_word', 'pardo'); p.e += 1 },
      },
      {
        text: 'Negra. You have been reading.',
        tag: 'defiant',
        outcome: 'The pencil pauses for half a second and then writes. Your uncle does not laugh this time.',
        effect: (p) => { p.setMem('br_pd_word', 'negro'); p.karma += 2; p.addFlag('declared_negro') },
      },
    ],
  },

  {
    id: 'br_pd_census_adult',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && [1980, 1991, 2000, 2010].includes(G.currentYear) && G.age >= 20 && once(G, 'br_pd_declared'),
    text: (G) => {
      const lead = G.currentYear === 1991
        ? 'The posters have been up at the bus stops for weeks: Não deixe sua cor passar em branco — don\'t let your colour pass as white. When the recenseador comes, '
        : G.currentYear === 2010
          ? 'The recenseadora has a small grey handheld computer instead of a clipboard, and '
          : 'The recenseador sits at your kitchen table, and '
      const before = G.flags.has('census_recorded_white')
        ? ' You remember your mother saying branco for you at a table like this one.'
        : G.flags.has('carteira_colour_written')
          ? ' Your carteira, in a drawer, already has an answer written in it by somebody else.'
          : ''
      return `${lead}you are the one who answers for the household now. The card has the words on it: ${G.currentYear >= 1991 ? 'branca, preta, amarela, parda, indígena' : 'branca, preta, amarela, parda'}.${before} The pen waits for yours.`
    },
    choices: [
      {
        text: 'Parda. It is what you are, whatever it means.',
        tag: null,
        outcome: 'He enters it and moves on to the bathroom count. It takes two seconds and you think about it for the rest of the day.',
        effect: (p) => { p.setMem('br_pd_declared', 'pardo'); p.addFlag('declared_pardo') },
      },
      {
        text: 'Branca. Nobody who has met you would argue.',
        tag: 'yielding',
        outcome: 'Nobody does. It is the easiest thing you say all week, and later you are not sure whether it was true or only uncontested.',
        effect: (p) => { p.setMem('br_pd_declared', 'branco'); p.addFlag('declared_white') },
      },
      {
        text: 'Preta. Your grandmother was, and you have decided.',
        tag: 'defiant',
        outcome: 'He enters it without looking up. The form does not know what it cost your family to get lighter, or what it costs you to say it back.',
        effect: (p) => { p.setMem('br_pd_declared', 'preto'); p.karma += 2; p.addFlag('declared_negro') },
      },
    ],
  },

  // ── THE CITY ───────────────────────────────────────────────────────────────

  {
    id: 'br_pd_boa_aparencia',
    phase: null,
    weight: 28,
    when: (G) => BR(G) && IN_CITY(G) && G.currentYear >= 1955 && G.currentYear <= 1996 && G.age >= 17 && G.age <= 30 && once(G, 'br_pd_boa'),
    text: (G) => {
      const job = FEMALE(G) ? 'Recepcionista' : 'Balconista'
      return `The classifieds in the Sunday paper: ${job}, comércio, centro. Exige-se boa aparência. You iron the shirt twice and take two buses and arrive twenty minutes early. The woman at the desk looks up, looks for a second longer, and says the vacancy was filled this morning. The girl behind you in the queue, who is fair, is told to take a seat.`
    },
    context: 'Job advertisements requiring "boa aparência" (good appearance) were standard in Brazilian classifieds for decades and were widely understood as a request for white applicants. Racial discrimination had been a misdemeanour since the Afonso Arinos law of 1951; the 1988 constitution and the Lei Caó of 1989 made it a crime.',
    choices: [
      {
        text: 'Ask to leave your name in case the new one does not work out.',
        tag: 'yielding',
        outcome: 'She writes your name on the back of an envelope. You watch her put the envelope in the bin before the door has finished closing.',
        effect: (p) => { p.setMem('br_pd_boa', true); p.m -= 4; p.addFlag('boa_aparencia') },
      },
      {
        text: 'Ask her, in a level voice, what boa aparência means.',
        tag: 'defiant',
        outcome: 'She says it means presentable. Both of you know what you asked and what she answered, and the girl in the chair looks at the floor.',
        effect: (p) => { p.setMem('br_pd_boa', true); p.m -= 2; p.karma += 3; p.addFlag('boa_aparencia') },
      },
    ],
  },

  {
    id: 'br_pd_elevador',
    phase: null,
    weight: 20,
    when: (G) => BR(G) && IN_CITY(G) && G.currentYear >= 1965 && G.currentYear <= 2015 && G.age >= 15 && G.age <= 60 && once(G, 'br_pd_elevador'),
    // Poor now AND poor at birth: a young adult from a comfortable family reads
    // as tier 1 on net worth alone, and is not the one carrying the parcel.
    text: (G) => Math.max(TIER(G), G.character?.wealthTier ?? 2) <= 2
      ? 'You have a delivery for the ninth floor. The porteiro reads the name on the parcel through the glass and, without getting up, points with his chin to the door at the side marked Serviço, next to the bins. The social lift, with its mirror and brass rail, stands open in the lobby. Nobody is in it.'
      : 'You are going up to a colleague\'s birthday on the ninth floor, with a bottle in a paper bag. The porteiro does not ask who you are visiting. He points you to the door at the side, marked Serviço, next to the bins, and holds the social lift, with its mirror and brass rail, for the woman who came in behind you.',
    choices: [
      {
        text: 'Take the service lift. It goes to the same floor.',
        tag: 'yielding',
        outcome: 'It smells of rubbish and floor polish and it opens into the kitchen. You go through the kitchen with your parcel, past a woman at the sink who looks at you the way you look at her.',
        effect: (p) => { p.setMem('br_pd_elevador', true); p.m -= 3; p.addFlag('elevador_servico') },
      },
      {
        text: 'Walk past him to the social lift and press nine.',
        tag: 'defiant',
        outcome: 'He says something to your back and does not get up. In the mirror you are exactly the person you were in the lobby.',
        effect: (p) => { p.setMem('br_pd_elevador', true); p.karma += 3; p.m += 1; p.addFlag('elevador_social') },
      },
    ],
  },

  {
    id: 'br_pd_domestica',
    phase: null,
    weight: 45,
    when: (G) => BR(G) && FEMALE(G) && TIER(G) <= 2 && IN_CITY(G) && G.currentYear >= 1945 && G.currentYear <= 2010 && G.age >= 14 && G.age <= 22 &&
      !G.flags.has('domestic_worker') && once(G, 'br_pd_domestica'),
    text: 'The job is in an apartment in a better part of the city, sleeping in. The room is behind the laundry: a bed, a hook, a window onto the air shaft, just longer than you are. The senhora says you are almost one of the family. You eat after the family, in the kitchen, from the same pots, and on Sundays you take half your wages home to your mother\'s.',
    context: DOMESTICA_CONTEXT,
    choices: null,
    effect: (p) => {
      p.setMem('br_pd_domestica', true); p.m -= 6; p.h -= 2; p.mo += 900
      p.addFlag('domestica_quarto'); p.addFlag('domestic_worker')
    },
  },

  // The same life from the interior, which is where half of these girls were
  // born. The narration puts her on a bus, so the effect has to as well.
  {
    id: 'br_pd_domestica_sertao',
    phase: null,
    weight: 45,
    when: (G) => BR(G) && FEMALE(G) && TIER(G) <= 2 && SERTAO(G) && G.currentYear >= 1945 && G.currentYear <= 2010 && G.age >= 13 && G.age <= 20 &&
      !G.flags.has('domestic_worker') && once(G, 'br_pd_domestica'),
    text: 'Your mother\'s comadre knows a family in Salvador who need a girl, and in a week you are on the bus with a cardboard suitcase and the address written on the back of a saint\'s card. The room is behind the laundry: a bed, a hook, a window onto the air shaft, a bolt on the outside. The senhora says you are almost one of the family. You eat after the family, in the kitchen, from the same pots.',
    context: DOMESTICA_CONTEXT,
    choices: null,
    effect: (p) => {
      p.setMem('br_pd_domestica', true); p.m -= 8; p.h -= 2; p.mo += 700
      p.addFlag('domestica_quarto'); p.addFlag('domestic_worker'); p.addFlag('rural_to_urban')
      p.relocate('br_salvador', 'working_class')
    },
  },

  {
    id: 'br_pd_cabelo',
    phase: null,
    weight: 26,
    when: (G) => BR(G) && FEMALE(G) && G.currentYear >= 1945 && G.age >= 12 && G.age <= 17 && once(G, 'br_pd_cabelo'),
    text: (G) => {
      const y = G.currentYear
      if (y < 1985) return 'On Saturdays your aunt heats the iron comb on the gas ring until it hisses when she touches it with a wet finger, and runs it through your hair section by section while you hold your ear down with one hand. There is a smell of burnt Henê that stays in the kitchen until Monday. Your cousin at school, whose hair is what the grown-ups call bom, has never once had to sit on this stool.'
      if (y < 2003) return 'Your mother buys the relaxer at the pharmacy in a tub with a smiling woman on the lid, and puts it on in the bathroom with a timer, and you are not to scratch your head for two days beforehand or it will burn where the skin is broken. It burns anyway. You sit on the edge of the bath with your eyes watering and count to four hundred. Afterwards your hair lies down like a wet cat and your grandmother touches it and says, now yes.'
      if (y < 2012) return 'The salon on the corner does escova progressiva, and the smell of it gets into your eyes from the doorway. Three hours in the chair, the flat iron over each strand, a burning at the back of the neck they tell you is normal. At the end it falls past your shoulders and moves when you turn your head, and your grandmother, who straightened hers with a hot comb on a gas ring, touches it and says, now yes.'
      return 'Half the girls at school are in transição — growing out the straightened ends, two textures on one head — and there are videos of how to do it. Your mother still has hers relaxed every six weeks and pays for it before she pays for anything else. She says the salon has a price for your hair too, if you want it. The appointment card is on the fridge under a magnet.'
    },
    choices: [
      {
        text: 'Straighten it. You want to walk into a room without it arriving first.',
        tag: 'yielding',
        outcome: 'It is easier, for years, in ways that are hard to separate from the hours in the chair and the money. The scalp remembers every one.',
        effect: (p) => { p.setMem('br_pd_cabelo', true); p.lo += 3; p.m -= 1; p.addFlag('cabelo_alisado') },
      },
      {
        text: 'Leave it as it grows.',
        tag: 'defiant',
        outcome: 'Some people say things and some of them are people you love. By the end of the year you have stopped hearing most of it, which is not the same as it having stopped.',
        effect: (p) => { p.setMem('br_pd_cabelo', true); p.m += 2; p.karma += 2; p.addFlag('cabelo_natural') },
      },
    ],
  },

  {
    id: 'br_pd_enquadro',
    phase: null,
    weight: 28,
    when: (G) => BR(G) && MALE(G) && IN_CITY(G) && G.currentYear >= 1965 && G.age >= 15 && G.age <= 30 && once(G, 'br_pd_enquadro'),
    text: (G) => {
      const word = stopWord(G)
      const papers = G.currentYear < 1990
        ? 'You carry your carteira de trabalho everywhere, like every man you know, because a man without a signed carteira can be taken in for vadiagem, and the carteira is how you prove you are a worker and not a vagabundo.'
        : 'You carry your RG in your front pocket and nothing in your hands, like every boy you know, because the older ones taught you.'
      return `The ${word} comes at the bus stop on the way home: the car pulls in sideways, and it is hands on the wall and legs apart before anyone has said good evening. On the radio in the car a voice says something about a suspect, cor padrão. ${papers} The one with the torch goes through your wallet one card at a time.`
    },
    context: '"Cor padrão" — standard colour — is Brazilian police slang for a suspect description that does not need to be spoken. Vagrancy ("vadiagem") was an offence under the 1941 Lei de Contravenções Penais, and a signed carteira de trabalho was, in practice, the document that proved a poor man was not a vagrant.',
    choices: [
      {
        text: 'Say nothing. Keep your palms flat on the wall.',
        tag: 'yielding',
        outcome: 'They let you go when the radio calls them somewhere else. The bus you were waiting for has gone past and you walk the rest of the way with your hands out of your pockets.',
        effect: (p) => { p.setMem('br_pd_enquadro', true); p.m -= 4; p.addFlag('enquadro') },
      },
      {
        text: 'Say you are a worker, on your way home, and ask what you are suspected of.',
        tag: 'defiant',
        outcome: 'The answer is an open hand across the back of the head, not hard, which is the point of it. You are home two hours late and your mother does not ask why.',
        effect: (p) => { p.setMem('br_pd_enquadro', true); p.m -= 5; p.h -= 2; p.karma += 2; p.addFlag('enquadro') },
      },
    ],
  },

  {
    id: 'br_pd_novela',
    phase: null,
    weight: 14,
    when: (G) => BR(G) && IN_CITY(G) && G.currentYear >= 1972 && G.currentYear <= 2005 && G.age >= 9 && once(G, 'br_pd_novela'),
    text: 'The novela das oito is on in every flat on the landing at once, so the dialogue arrives through the walls a half-second out of step with your own set. You notice, the way you notice that a tooth has gone loose, that every maid in it is played by someone who looks like your aunt, and every doctor, every heiress, every man with a problem worth an episode, by someone who does not. Your aunt watches it too. She knows the maids\' lines before they say them.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_novela', true); p.e += 1 },
  },

  // ── THE SERTÃO AND THE ROAD SOUTH ──────────────────────────────────────────

  {
    id: 'br_pd_frente_de_emergencia',
    phase: null,
    weight: 40,
    when: (G) => BR(G) && SERTAO(G) && ((G.currentYear >= 1979 && G.currentYear <= 1983) || G.currentYear === 1958 || G.currentYear === 1970) && G.age >= 15 && G.age <= 60 && once(G, 'br_pd_frente'),
    text: 'The rain does not come for the third year and the government opens a frente de emergência: men from the whole municipality breaking stones for a road that goes to a reservoir that has no water in it, for a wage that is paid late and in part. The foreman writes names in a book. He writes yours under the heading for your colour without asking, the way he writes the weight of a sack. At midday the men sit in the thin shade of the one umbuzeiro, and nobody there is white, and nobody says so.',
    context: 'In the great Northeastern droughts — 1958, 1970 and above all 1979-83 — the federal government enrolled hundreds of thousands of rural workers in "frentes de emergência", public-works gangs paid a fraction of the minimum wage to build roads and reservoirs. For many families it was the only cash in the house.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_frente', true); p.h -= 3; p.mo += 150; p.m -= 3; p.addFlag('frente_de_emergencia') },
  },

  {
    id: 'br_pd_sertao_to_sao_paulo',
    phase: null,
    weight: 28,
    when: (G) => BR(G) && SERTAO(G) && G.currentYear >= 1950 && G.currentYear <= 1998 && G.age >= 16 && G.age <= 28 &&
      !G.flags.has('bra_nordestino_migrant') && !G.flags.has('bra_nordestino_stayed') && !G.flags.has('domestica_quarto') && once(G, 'br_pd_sul'),
    text: (G) => {
      const work = MALE(G) ? 'a foreman on a building site who wants men' : 'a sewing workshop in Brás that wants girls who can use a machine'
      return G.currentYear < 1975
        ? `The pau-de-arara leaves from the square on a Tuesday: a truck with planks across the bed and a pole to hold, eleven days to São Paulo if the axle holds. In the sertão people have always called you galego for your fairness, the light one of the family. Your cousin who went two years ago writes that down there nobody will call you anything but baiano. He has a room for you in the Zona Leste and ${work}.`
        : `The bus from Feira de Santana to São Paulo takes two days and a night, and comes into the Tietê terminal in the dark. In the sertão people have always called you galego for your fairness, the light one of the family. Your cousin who went ahead writes that down there nobody will call you anything but baiano. He has a mattress for you in the Zona Leste and ${work}.`
    },
    choices: [
      {
        text: 'Go. Take the address and the saint\'s card and go.',
        tag: null,
        outcome: 'By the first payday you have learned three things: the bus routes, the price of a room, and that in São Paulo you are not galego. On the factory form you are pardo. At the bar you are baiano, whether you are from Bahia or not.',
        effect: (p) => {
          p.setMem('br_pd_sul', true); p.m -= 4; p.mo += 600; p.r += 2
          p.addFlag('nordestino_sp'); p.addFlag('rural_to_urban'); p.relocate('br_sao_paulo', 'working_class')
          p.setMem('br_pd_sul_year', p._state?.currentYear ?? null); p.scheduleEcho('br_pd_ft_baiano', 2)
        },
      },
      {
        text: 'Stay. Someone has to keep the goats and your mother.',
        tag: null,
        outcome: 'Your cousin stops writing after a year. Each December the ones who went come back for a week with a radio or a watch and a new way of saying a few words.',
        effect: (p) => { p.setMem('br_pd_sul', true); p.m -= 2; p.r += 4 },
      },
    ],
  },

  // ── SALVADOR ───────────────────────────────────────────────────────────────

  {
    id: 'br_pd_ile_aiye',
    phase: null,
    weight: 50,
    when: (G) => BR(G) && SALVADOR(G) && G.currentYear >= 1975 && G.currentYear <= 1990 && G.age >= 13 && G.age <= 32 && once(G, 'br_pd_ile'),
    text: (G) => {
      const lead = G.currentYear === 1975
        ? 'On the Saturday of Carnival a bloco comes down from Curuzu that has never come down before: a hundred people in yellow and red and white, drums, and a song asking what bloco is this, that I want to know. On Monday A Tarde calls it a racist bloco, a discordant note. '
        : 'On the Saturday of Carnival Ilê Aiyê comes down from Curuzu at night, drums first, in yellow and red and white, and the song asks what bloco is this, that I want to know. It is a bloco for the black people of Liberdade, and it says so. '
      return `${lead}You are on the pavement with your mother, who has always called herself morena. The drums are going in your chest. Somebody in the rope line holds out a hand.`
    },
    context: 'Ilê Aiyê, founded in November 1974 in Curuzu, Liberdade, was the first bloco afro. It paraded for the first time at the 1975 Carnival with membership open to black people only, and the Salvador daily A Tarde denounced it as a "bloco racista, nota destoante".',
    choices: [
      {
        text: 'Take the hand and go into the rope.',
        tag: 'defiant',
        outcome: 'Your mother does not stop you. At the end of the night your feet are bleeding at the heel and a word you have always been called by other people is a word you have said about yourself.',
        effect: (p) => { p.setMem('br_pd_ile', true); p.m += 6; p.s += 2; p.addFlag('ile_aiye') },
      },
      {
        text: 'Stay on the pavement with your mother.',
        tag: 'yielding',
        outcome: 'You watch it go all the way down to the square. The drums are still in your chest at home, with the windows shut.',
        effect: (p) => { p.setMem('br_pd_ile', true); p.r += 3 },
      },
    ],
  },

  // ── THE PARTNER'S FAMILY ───────────────────────────────────────────────────

  {
    id: 'br_pd_melhorar_a_raca',
    phase: null,
    weight: 20,
    when: (G) => BR(G) && G.partner && G.age >= 18 && G.age <= 34 && once(G, 'br_pd_raca'),
    text: 'Sunday lunch at your partner\'s mother\'s: feijoada, a crowded table, a television nobody is watching. An aunt looks from you to your partner and back and says, pleasantly, to the table, that the children will be lovely, that they will improve the race — vai melhorar a raça. Everybody laughs the laugh that means the sentence was a compliment. Your partner\'s hand finds your knee under the table and stays there.',
    choices: [
      {
        text: 'Laugh with the table and pass the farofa.',
        tag: 'yielding',
        outcome: 'The lunch goes on. On the bus home neither of you mentions it, which is how you both know it was said.',
        effect: (p) => { p.setMem('br_pd_raca', true); p.m -= 2; p.addFlag('melhorar_a_raca') },
      },
      {
        text: 'Ask the aunt, smiling, improve it from what.',
        tag: 'defiant',
        outcome: 'The table goes quiet for the length of a breath and then somebody asks for the rice. Your partner\'s mother is warmer to you afterwards, for reasons she never explains.',
        effect: (p) => { p.setMem('br_pd_raca', true); p.karma += 3; p.addFlag('melhorar_a_raca') },
      },
    ],
  },

  // ── THE QUOTAS ─────────────────────────────────────────────────────────────

  {
    id: 'br_pd_cotas_vestibular',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && G.age >= 17 && G.age <= 22 &&
      (G.currentYear >= 2013 || (G.currentYear >= 2003 && (G.place?.id === 'br_rio' || SALVADOR(G)))) &&
      (G.education?.level === 'secondary' || G.flags.has('graduated_hs')) &&
      !G.flags.has('university_graduate') && once(G, 'br_pd_cota'),
    text: (G) => {
      const where = G.currentYear < 2013
        ? (G.place?.id === 'br_rio' ? 'The state university in Rio now reserves places' : 'The state university of Bahia now reserves places')
        : 'Since the law of 2012 the federal universities reserve places for students from public schools, half of all places by 2016, and inside that share, places'
      return `${where} for pretos, pardos and indígenas. The registration form has a box for the autodeclaração: you tick your colour and sign underneath that it is true. At the public school your class argues about it for a week. The boy who sits by the window, who is lighter than you, says he will tick it, and the girl who is darker says she will not, on principle, and nobody can explain to anybody else why.`
    },
    context: 'UNEB (Bahia) and UERJ (Rio) ran Brazil\'s first racial quotas in 2003. The Supreme Court upheld quotas unanimously in April 2012, and Lei 12.711 of August 2012 reserved half of federal university places for public-school students, with a share for pretos, pardos and indígenas proportional to each state\'s population.',
    choices: [
      {
        text: 'Tick parda and sign it.',
        tag: null,
        outcome: 'Your name is on the list in February, in the column for cotistas. Your mother reads it off the screen three times and then reads the whole list to see who else from the street is on it.',
        effect: (p) => { p.setMem('br_pd_cota', true); p.m += 6; p.addFlag('cotista'); p.setMem('br_pd_cota_year', p._state?.currentYear ?? null); p.scheduleEcho('br_pd_ft_formatura', 5) },
      },
      {
        text: 'Leave the box empty and apply in the ampla concorrência.',
        tag: null,
        outcome: 'You do not get in that year, or you do and never know if you would have. Either way nobody at university will ever say the word cotista about you.',
        effect: (p) => { p.setMem('br_pd_cota', true); p.r += 3 },
      },
    ],
  },

  {
    id: 'br_pd_gemeos_2007',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && G.currentYear === 2007 && G.age >= 14 && once(G, 'br_pd_gemeos'),
    text: 'It is on the evening news: identical twins from Brasília, Alan and Alex, applied to the university in the quota for black students. The commission looked at their photographs and accepted one and turned down the other. They stand side by side for the camera, the same face twice. Your uncle says that is what happens when you let a committee decide what people are, and your cousin says that is what happens when a whole country pretends it cannot tell, and they are both looking at you when they say it.',
    context: 'The University of Brasília introduced racial quotas in 2004 with a commission that assessed applicants from photographs. In 2007 it accepted Alex Teixeira da Cunha and rejected his identical twin, Alan; the decision on Alan was later reversed on appeal. The case became the national shorthand for the question of who decides colour.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_gemeos', true); p.e += 1 },
  },

  {
    id: 'br_pd_concurso_cota',
    phase: null,
    weight: 30,
    when: (G) => BR(G) && G.currentYear >= 2015 && G.age >= 21 && G.age <= 45 &&
      ['secondary', 'university', 'graduate'].includes(G.education?.level) && once(G, 'br_pd_concurso'),
    text: 'The notice for the federal concurso runs to forty pages. On page six, under the law of 2014, twenty per cent of the posts are reserved for candidates who declare themselves pretos or pardos, subject to verification by a commission. You have been studying at night for a year from photocopied handbooks. The declaration is a checkbox on the application.',
    context: 'Lei 12.990 of 2014 reserved 20% of federal civil-service posts for black candidates (pretos and pardos). From 2016 the self-declaration was verified by "heteroidentification" panels that assess phenotype in person — not ancestry, not documents.',
    choices: [
      {
        text: 'Tick the box.',
        tag: null,
        outcome: 'You pass the written exam in the reserved list. A letter summons you to the verification panel for a date in March, with a list of what not to wear.',
        effect: (p) => { p.setMem('br_pd_concurso', true); p.addFlag('concurso_cota'); p.setMem('br_pd_concurso_year', p._state?.currentYear ?? null) },
      },
      {
        text: 'Leave it. Compete in the open list.',
        tag: null,
        outcome: 'Your score is eleven places short of the cut. In the reserved list it would have been enough, and you do the arithmetic more than once.',
        effect: (p) => { p.setMem('br_pd_concurso', true); p.r += 4; p.m -= 2 },
      },
    ],
  },

  // ── DECEMBER 2023 ──────────────────────────────────────────────────────────

  {
    id: 'br_pd_censo_2022',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && (G.currentYear === 2023 || G.currentYear === 2024) && G.age >= 15 && once(G, 'br_pd_censo22'),
    text: (G) => {
      const mine = G.flags.has('declared_white')
        ? 'You told the census in your time that you were branca. You do not know which column you are in now.'
        : G.flags.has('declared_negro')
          ? 'You told the census in your time that you were preta, and you are not in this column, and you were never entirely out of it either.'
          : G.flags.has('declared_pardo')
            ? 'You told the census, when it was your turn, that you were parda. You are in this number.'
            : 'You have never once been asked. Somebody at a kitchen table answered for you.'
      return `The IBGE publishes the colour results of the 2022 census just before Christmas: pardo 45.3%, branco 43.5%, preto 10.2%. For the first time since 1991 the largest group in Brazil is the one that used to be called by a hundred and thirty-six other names. ${mine}`
    },
    context: 'The 2022 census colour results, released in December 2023, recorded pardos as 45.3% of the population — the largest group for the first time since 1991, ahead of brancos at 43.5%.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_censo22', true); p.e += 1; p.m += 1 },
  },
]

// ── FOLLOW-THROUGH ──────────────────────────────────────────────────────────
// Written before the triggers above. Each one reads a flag the triggers set.

export const BRAZIL_PARDO_FOLLOWTHROUGH = [

  {
    id: 'br_pd_ft_the_ears',
    phase: null,
    weight: 40,
    when: (G) => BR(G) && hasInfant(G) && G.age >= 17 && G.age <= 46 &&
      (G.flags.has('melhorar_a_raca') || G.flags.has('saw_redencao_de_cam') || G.flags.has('pardo_colour_words')) && once(G, 'br_pd_ft_ears'),
    text: (G) => {
      const painting = G.flags.has('saw_redencao_de_cam')
        ? ' You think, without wanting to, of a grandmother in a painting with her hands in the air.'
        : ''
      return `The women of the family come to see the baby. One of the grandmothers takes the top of one tiny ear between two fingers and folds it back and looks, because the old women say the colour a child will be is already written at the rim of the ear and in the beds of the nails. She says nothing. Saying nothing is a report.${painting}`
    },
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_ears', true); p.m -= 1; p.r += 1 },
  },

  {
    id: 'br_pd_ft_curriculo',
    phase: null,
    weight: 32,
    when: (G) => BR(G) && G.flags.has('boa_aparencia') && G.age >= 38 && G.currentYear >= 1990 &&
      (HIRES(G) || hasChildAged(G, 17, 30)) && once(G, 'br_pd_ft_cv'),
    text: (G) => HIRES(G)
      ?'Your section is hiring and a pile of currículos comes to your desk, each with a small photograph stapled to the top right corner, because that is how currículos are done. You catch yourself turning the pile face down before you read the first one. It takes longer this way. You are not sure it makes any difference, and you do it anyway, all the way to the bottom.'
      : 'Your child is looking for a first job, and the agency tells them to attach a photograph to the currículo, a nice one, smiling. You go together to the studio by the bus station. You stand behind the photographer while he adjusts the light and you do not say what you are thinking, which is the second look a woman at a desk once gave you, the one that lasted exactly as long as it took to decide.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_cv', true); p.karma += 2; p.r -= 1 },
  },

  {
    id: 'br_pd_ft_placa_elevador',
    phase: null,
    weight: 36,
    when: (G) => BR(G) && SP(G) && G.currentYear >= 1996 && (G.flags.has('elevador_servico') || G.flags.has('elevador_social')) && once(G, 'br_pd_ft_placa'),
    text: (G) => {
      const plate = G.currentYear <= 1999
        ? 'A metal plate has been screwed into the wall of every lift in the city, beside the buttons'
        : 'The metal plate beside the buttons has been in every lift in the city since 1996, and nobody reads it any more'
      const rest = G.flags.has('elevador_social')
        ? 'You read it all the way through, going up, and think of the porteiro who said something to your back.'
        : 'The service door is still next to the bins. You still find yourself turning toward it before you have decided anything.'
      return `${plate}: it is forbidden to discriminate on grounds of race, sex, colour, origin or social condition in the use of this lift. A municipal law. ${rest}`
    },
    context: 'São Paulo municipal law 11.995 of January 1996 required a sign in every lift in the city prohibiting discrimination in its use.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_placa', true); p.m += 1 },
  },

  {
    id: 'br_pd_ft_pec_domesticas',
    phase: null,
    weight: 100,
    when: (G) => BR(G) && G.flags.has('domestica_quarto') && G.currentYear >= 2013 && G.currentYear <= 2016 && once(G, 'br_pd_ft_pec'),
    text: (G) => G.age <= 55
      ? 'In April the Congress promulgates the amendment: domestic workers get a forty-four-hour week, overtime, the FGTS, the same as everybody. On the news a woman in an apron is crying on the steps of the building. Your patroa says, at breakfast, that it will be the end of the profession. You clear the plates. It is the first time in your working life that the hours you work have a number on them.'
      : 'In April the Congress promulgates the amendment: domestic workers get a forty-four-hour week, overtime, the FGTS, the same as everybody. You are past the age where it changes anything for you. You add up, on the back of an envelope, the years you slept in a room behind somebody\'s laundry, and then you stop adding.',
    context: 'Constitutional Amendment 72, promulgated in April 2013 and regulated in 2015, extended to domestic workers the labour rights other workers had held since the 1940s.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_pec', true); p.m += 3; p.r += 2 },
  },

  {
    id: 'br_pd_ft_quartinho',
    phase: null,
    weight: 30,
    when: (G) => BR(G) && G.flags.has('domestica_quarto') && G.age >= 52 && once(G, 'br_pd_ft_quartinho'),
    text: 'Your niece shows you the plans of the flat she is buying off the drawings. Three bedrooms, two bathrooms, and behind the laundry a room of two metres by two, marked dependência de empregada. She says she will use it for storage. You put your finger on it and it covers the whole room, and you remember the exact sound the air shaft made at night.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_quartinho', true); p.m -= 1; p.r += 1 },
  },

  {
    id: 'br_pd_ft_cabelo_filha',
    phase: null,
    weight: 34,
    when: (G) => BR(G) && FEMALE(G) && (G.flags.has('cabelo_alisado') || G.flags.has('cabelo_natural')) &&
      hasChildAged(G, 9, 16, 'female') && G.currentYear >= 1975 && once(G, 'br_pd_ft_cabelo'),
    text: (G) => {
      if (G.flags.has('cabelo_natural')) return 'Your daughter comes home and asks if she can have her hair straightened like the girls in her class. You sit her down on the kitchen stool and do not heat anything or open any tub, and comb it through slowly while you talk. You do not tell her no. You tell her what it cost, in hours, in money, in the smell, and let her decide at eleven what you decided at fourteen.'
      if (G.currentYear >= 2012) return 'Your daughter comes home and says she is not going to straighten it, ever, and shows you a video of a march in São Paulo of women with their hair up and out like crowns. You have had yours relaxed every six weeks since you were fifteen. That night you look for a long time in the bathroom mirror at the line where the new growth meets the old.'
      return 'Your daughter sits on the stool in the kitchen on a Saturday, holding her ear down with one hand, and you are the one with the comb. You hear yourself say the things your aunt said. You make it quicker than your aunt did, and gentler, and it is still the same kitchen.'
    },
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_cabelo', true); p.m += 1; p.r += 1 },
  },

  {
    id: 'br_pd_ft_filho_documento',
    phase: null,
    weight: 36,
    when: (G) => BR(G) && G.flags.has('enquadro') && hasChildAged(G, 12, 17, 'male') && once(G, 'br_pd_ft_filho'),
    text: (G) => {
      const phone = G.currentYear >= 2008 ? ' Keep the receipt for the phone in your wallet, so they can see it is yours.' : ''
      return `Your son is old enough to go into town on his own and before he goes you sit him down. Carry your document. Do not run, even for the bus. Do not put your hands in your pockets when they stop, and they will stop. Do not wear the hood up.${phone} He rolls his eyes, and then he sees your face, and stops rolling them.`
    },
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_filho', true); p.m -= 3; p.r += 2 },
  },

  {
    id: 'br_pd_ft_cisterna',
    phase: null,
    weight: 34,
    when: (G) => BR(G) && SERTAO(G) && G.flags.has('frente_de_emergencia') && G.currentYear >= 2004 && G.currentYear <= 2020 && once(G, 'br_pd_ft_cisterna'),
    text: 'Men from the association come with moulds and sacks of cement and build a cistern beside the house out of curved plates, round as a bread oven, sixteen thousand litres, fed by a gutter from your own roof. The first rains fill it a hand\'s depth. You stand on the lid with the bucket and the rope and think about the stones you broke for a reservoir that never held anything. This one holds.',
    context: 'From 2003 the Articulação Semiárido Brasileiro\'s One Million Cisterns programme built plate cisterns of about 16,000 litres beside rural houses across the semi-arid Northeast, collecting roof rainwater — the first drought policy aimed at the household rather than at a public work.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_cisterna', true); p.h += 3; p.m += 4 },
  },

  {
    id: 'br_pd_ft_baiano',
    phase: null,
    weight: 40,
    when: (G) => BR(G) && SP(G) && G.flags.has('nordestino_sp') && within(G, 'br_pd_sul_year', 1, 8) && once(G, 'br_pd_ft_baiano'),
    text: 'The foreman calls everybody from above Minas Gerais baiano, the men from Piauí and Pernambuco and Ceará included, and the men from Piauí and Pernambuco and Ceará have stopped correcting him. On Saturdays you go to the forró in Brás where the whole sertão seems to be on one dance floor. In the sertão you were galego. In São Paulo the word is nordestino, and it is said about you the way the word pardo is said, as if it described a colour.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_baiano', true); p.s += 2; p.m -= 1 },
  },

  {
    id: 'br_pd_ft_volta',
    phase: null,
    weight: 32,
    when: (G) => BR(G) && SP(G) && G.flags.has('nordestino_sp') && G.age >= 50 && once(G, 'br_pd_ft_volta'),
    text: 'You go back to the sertão for the feast of the padroeiro in June, on a bus that now takes a day and a half. The road is paved to the gate. Your nephews call you o paulista and laugh at the way your r has flattened, and at the well the boy who used to call you queimadinho, who is an old man now, looks at you for a moment before he knows you. There is a house here with your name on it, in a manner of speaking.',
    choices: [
      {
        text: 'Stay. Put a roof on the house and live out your years here.',
        tag: null,
        outcome: 'The first dry season you had forgotten is the hardest thing you have done since you were young. By the second you are galego again, which nobody has called you in thirty years.',
        effect: (p) => { p.setMem('br_pd_ft_volta', true); p.m += 5; p.h -= 2; p.relocate('br_rural', 'working_class') },
      },
      {
        text: 'Go back to São Paulo on the Sunday bus.',
        tag: null,
        outcome: 'Your grandchildren are paulistas and do not know what a pau-de-arara is. You tell them once, at dinner, and they listen politely.',
        effect: (p) => { p.setMem('br_pd_ft_volta', true); p.r += 3 },
      },
    ],
  },

  {
    id: 'br_pd_ft_ile_old',
    phase: null,
    weight: 32,
    when: (G) => BR(G) && G.flags.has('ile_aiye') && G.age >= 40 && once(G, 'br_pd_ft_ile'),
    text: 'You are too old for the rope now and your knees say so. You stand on the pavement at the bottom of the Curuzu hill on the Saturday night, where your mother once stood, and watch the doves released and the drums start, and your sister\'s grandson go past in yellow and red and white. The newspaper that called it a racist bloco sends a photographer up the hill every year now. Nobody at the paper remembers the first headline, and everybody on the hill does.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_ile', true); p.m += 4 },
  },

  {
    id: 'br_pd_ft_formatura',
    phase: null,
    weight: 40,
    when: (G) => BR(G) && G.flags.has('cotista') && within(G, 'br_pd_cota_year', 4, 9) && !G.flags.has('university_graduate') && once(G, 'br_pd_ft_formatura'),
    text: 'The graduation is in a rented hall with a sound system that squeals. When they call your name your family, in the third row, stand up and make more noise than any family has made all evening, and a man two rows in front turns round to look at them. Your grandmother did not finish primary school. At the reception a classmate\'s father asks what your course was, and then, lightly, whether you came in through the cotas, and you say yes, and hold his eye until he has to be the one who looks away.',
    choices: null,
    effect: (p) => {
      p.setMem('br_pd_ft_formatura', true); p.m += 8; p.e += 3
      p.addFlag('university_graduate'); p.addFlag('first_gen_university')
    },
  },

  {
    id: 'br_pd_ft_banca_deferido',
    phase: null,
    weight: 30,
    when: (G) => BR(G) && G.flags.has('concurso_cota') && G.currentYear >= 2016 && within(G, 'br_pd_concurso_year', 1, 2) && once(G, 'br_pd_ft_banca'),
    text: 'Three people behind a folding table and a camera on a tripod. The letter said no hat and no dark glasses. They are not allowed to consider your mother, your documents, or the photograph of your grandmother in your bag; only what they call the phenotype, taken as a whole. They look at you for perhaps a minute. The result is posted by candidate number a week later: deferido.',
    choices: null,
    effect: (p) => { p.setMem('br_pd_ft_banca', 'deferido'); p.m += 5; p.mo += 1500; p.addFlag('banca_deferido') },
  },

  {
    id: 'br_pd_ft_banca_indeferido',
    phase: null,
    weight: 20,
    when: (G) => BR(G) && G.flags.has('concurso_cota') && !G.flags.has('declared_negro') && G.currentYear >= 2016 && within(G, 'br_pd_concurso_year', 1, 2) && once(G, 'br_pd_ft_banca'),
    text: 'Three people behind a folding table and a camera on a tripod. They are not allowed to consider your mother, your documents, or the photograph of your grandmother in your bag; only the phenotype, taken as a whole. They look at you for perhaps a minute. The result is posted by candidate number a week later: indeferido. The notice explains the appeal procedure in a paragraph that also contains the word fraude, and is not about you, and is.',
    choices: [
      {
        text: 'Appeal. Go before a second panel.',
        tag: 'defiant',
        outcome: 'The second panel is five people and takes longer to look. It upholds the first. You are, officially, the colour the state has decided you are for the purpose of this post, which is not the colour it wrote on you anywhere else.',
        effect: (p) => { p.setMem('br_pd_ft_banca', 'indeferido'); p.m -= 6; p.r += 3; p.addFlag('banca_indeferido') },
      },
      {
        text: 'Let it go. Sit the next concurso in the open list.',
        tag: 'yielding',
        outcome: 'You do not tick the box again. At family lunches, when someone says pardo, you notice you have started to hear it as a question.',
        effect: (p) => { p.setMem('br_pd_ft_banca', 'indeferido'); p.m -= 4; p.r += 4; p.addFlag('banca_indeferido') },
      },
    ],
  },
]
