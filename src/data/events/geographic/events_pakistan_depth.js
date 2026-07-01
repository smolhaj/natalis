// events_pakistan_depth.js
// Pakistan depth arc — texture not covered in events_pakistan.js.
// events_pakistan.js covers: Muhajir identity, Partition memory, 1971 war,
// Zia Islamization, Karachi ethnic violence, nuclear tests, Afghan frontier,
// madrassah choice, Benazir assassination 2007, APS Peshawar 2014, blasphemy law.
// This file: cricket as religion, Basant kite festival, 2010 floods, Hazara
// persecution in Quetta, Balochistan disappeared, Faiz poetry as inheritance,
// Pashtunwali code, servant class in middle-class homes, rishta marriage market,
// overseas diaspora pull.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const PAKISTAN_DEPTH_EVENTS = [

  // ── CRICKET ───────────────────────────────────────────────────────────────

  {
    id: 'pak_dep_cricket',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1975 &&
      G.age >= 7 && G.age <= 18 &&
      G.character?.gender !== 'female' &&
      !G.mem?.pakDepCricket,
    text: 'Cricket is not a sport here in the way that sports are sports elsewhere. The match against India is not a game. The gali cricket in the lane between houses — stumps chalked on the wall, a rubber ball, three fielders and an argument — is the real game, and the television version is what happens when you imagine the gali cricket scaling up to a nation. In 1992 Pakistan won the World Cup under Imran Khan and something moved in the street. People you didn\'t know embraced you. The fireworks were left over from something else and it didn\'t matter.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 3
      p.addFlag('pak_cricket_generation')
      p.setMem('pakDepCricket', true)
    },
  },

  // ── BASANT ────────────────────────────────────────────────────────────────

  {
    id: 'pak_dep_basant',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1970 && G.currentYear <= 2005 &&
      G.age >= 6 && G.age <= 22 &&
      !G.mem?.pakDepBasant,
    text: 'Basant in Lahore. The kite festival in February, when the mustard fields are yellow and the rooftops of the old city fill with people and the sky fills with kites. You are on the roof with the spool of string and the technique you learned over years: the angle of the pull, the moment to cut another kite\'s string. The city is briefly and completely itself — the noise of ten thousand conversations, the smell of food from below, the peculiar freedom of a rooftop in the cold evening with a string going up into the sky. The government banned it in 2007 after deaths from the sharp manja string. The rooftops are quieter now.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 2
      p.addFlag('pak_basant_generation')
      p.setMem('pakDepBasant', true)
    },
  },

  // ── 2010 FLOODS ───────────────────────────────────────────────────────────

  {
    id: 'pak_dep_floods_2010',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 2010 &&
      G.age >= 10 &&
      !G.mem?.pakDepFloods,
    text: pick([
      'The monsoon of 2010 is not the monsoon. By August, a fifth of Pakistan is underwater. Twenty million people are displaced — more than the 2004 Indian Ocean tsunami, more than the 2005 Kashmir earthquake, more than Haiti 2010. The Indus river swells to forty times its normal width in places. The flood moves south through the country over weeks, so that when Khyber Pakhtunkhwa is already in recovery, Sindh is just being hit. You watch the satellite maps on television and the maps look like the country is dissolving.',
      'The flood takes the crop. It takes the stored grain. It takes the tools. It takes the livestock and the documents and in some places the houses. What it leaves is wet land that will need months to drain and a debt to the chandler that will take years to pay. The government response comes with delays and the international aid comes with cameras. The cameras leave before the debt is settled.',
    ]),
    choices: [
      {
        text: 'Your area floods. You lose what you had.',
        tag: 'pak_dep_flood_survivor',
        outcome: 'The inventory of loss is specific: the charpai, the sewing machine, the papers in the tin box. You reconstruct over years. The reconstruction is incomplete.',
        effect: (p) => {
          p.m -= 15
          p.h -= 5
          p.w -= 5
          p.mo -= 2000
          p.addFlag('pak_2010_flood_generation')
          p.setMem('pakDepFloods', true)
        },
      },
      {
        text: 'Your area is spared. You watch the news and try to help.',
        tag: null,
        outcome: 'The distance between the news and the event is not moral distance. You send what you can through whatever channel is available. The event is still happening when the news moves on.',
        effect: (p) => {
          p.m -= 8
          p.karma += 5
          p.addFlag('pak_2010_flood_generation')
          p.setMem('pakDepFloods', true)
        },
      },
    ],
    effect: null,
  },

  // ── HAZARA PERSECUTION IN QUETTA ──────────────────────────────────────────

  {
    id: 'pak_dep_hazara',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 2000 &&
      G.age >= 15 &&
      (G.ethnicity === 'hazara' || G.character?.ethnicity === 'hazara') &&
      !G.mem?.pakDepHazara,
    text: 'The Hazara of Quetta are Shia in a city where Lashkar-e-Jhangvi and other sectarian groups operate. The killings are targeted: a Hazara on a motorbike, a Hazara at the market, the bodies identifiable by the distinctive features that the gunmen use as criteria. Between 2008 and 2018, over two thousand Hazara are killed in Quetta. The community has contracted its geography: specific neighbourhoods, specific routes, the specific calculation of whether any given trip is necessary. Your family discusses the question of leaving — to Afghanistan, which the Hazara left to come here; to Australia, where the diaspora is building; to anywhere else.',
    choices: [
      {
        text: 'Stay. This is your city. Your family\'s graves are here.',
        tag: null,
        outcome: 'You stay. The calculation is made daily and the answer is stay, and the staying requires not thinking too carefully about the calculation.',
        effect: (p) => {
          p.r += 7
          p.m -= 10
          p.h -= 4
          p.addFlag('pak_hazara_generation')
          p.setMem('pakDepHazara', true)
        },
      },
      {
        text: 'Leave. The destination is secondary. The leaving is the point.',
        tag: null,
        outcome: 'The asylum process is long. The waiting is its own country: the document, the hearing, the next document. At the end of the process is a place where no one knows what your face means and no one is pointing a weapon at it.',
        effect: (p) => {
          p.r += 8
          p.m -= 5
          p.addFlag('pak_hazara_generation')
          p.addFlag('emigrated')
          p.setResidency('asylum_seeker')
          p.setMem('pakDepHazara', true)
        },
      },
    ],
    effect: null,
  },

  // ── BALOCHISTAN DISAPPEARED ────────────────────────────────────────────────

  {
    id: 'pak_dep_baloch_missing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 2000 &&
      G.age >= 16 &&
      (G.ethnicity === 'baloch' || G.character?.ethnicity === 'baloch') &&
      !G.mem?.pakDepBaloch,
    text: 'Someone you know has been picked up. Not arrested — picked up: no warrant, no charge, no confirmation of where they are. The Human Rights Commission of Pakistan has been documenting enforced disappearances in Balochistan since the 1990s; the numbers run to thousands. The families wait at courthouses with photographs. The Voice for Baloch Missing Persons organization holds camps outside Quetta and has marched to Islamabad. Your family is one of the families with a photograph. The photograph becomes the face you show the courts and the press and the camera crews who come occasionally and leave.',
    choices: null,
    effect: (p) => {
      p.m -= 15
      p.r += 10
      p.addFlag('pak_baloch_missing_person_family')
      p.setMem('pakDepBaloch', true)
    },
  },

  // ── FAIZ AHMED FAIZ ───────────────────────────────────────────────────────

  {
    id: 'pak_dep_faiz',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1960 &&
      G.age >= 16 &&
      !G.mem?.pakDepFaiz,
    text: 'Faiz Ahmed Faiz: the poet who was imprisoned by the government he had supported, who wrote his best poems in Lahore\'s Montgomery Jail, who received the Lenin Peace Prize, who died in 1984 still beloved by people who disagreed on everything except Faiz. The verse is part of the air: Hum dekhenge — we shall witness — which became a protest song under Zia and was sung at Aurat March in 2020 and was deemed anti-Islamic by a university committee in Lahore in 2020 and was then defended by people who would also agree on nothing else. The poem is the common ground.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.m += 3
      p.addFlag('pak_faiz_generation')
      p.setMem('pakDepFaiz', true)
    },
  },

  // ── PASHTUNWALI ───────────────────────────────────────────────────────────

  {
    id: 'pak_dep_pashtunwali',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.age >= 8 && G.age <= 20 &&
      (G.ethnicity === 'pashtun' || G.character?.ethnicity === 'pashtun') &&
      !G.mem?.pakDepPashtunwali,
    text: 'Pashtunwali is the code that governs what you owe and what you are owed. Melmastia: hospitality, the obligation to feed a guest. Nanawatai: sanctuary, the obligation to shelter even an enemy who asks. Badal: exchange — not revenge exactly but the restoration of balance. These are not commandments from a text. They are the structure of what it means to be Pashtun, which is to say the structure of your obligations to the people around you and their obligations to you. The code has been here longer than the states that drew lines across it.',
    choices: null,
    effect: (p) => {
      p.s += 3
      p.m += 3
      p.r += 2
      p.addFlag('pak_pashtunwali_generation')
      p.setMem('pakDepPashtunwali', true)
    },
  },

  // ── SERVANT CLASS ─────────────────────────────────────────────────────────

  {
    id: 'pak_dep_servant',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1960 &&
      G.age >= 6 && G.age <= 18 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.pakDepServant,
    text: pick([
      'The mali comes on Tuesdays and the darzi comes when called and the cook has been in the kitchen since before you were born. This is the domestic economy of the middle-class Pakistani household: the outsourcing of physical work to people who come from outside the city and send the money home. You know the cook\'s village but you have never been to it. The cook knows your name and your habits and your preferences. The asymmetry of this knowledge is the texture of the relationship.',
      'You grow up in a house with servants. This is ordinary at your income level and you do not question it until later, when you are living somewhere else and the things that were done for you become visible by requiring you to do them yourself. The floor. The food. The pressing of the clothes. The things the cook knew to do without being asked. The cook knew your house better than you did. The cook was not part of the family, which is something you understood and did not articulate until you were asked.',
    ]),
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.addFlag('pak_domestic_economy_generation')
      p.setMem('pakDepServant', true)
    },
  },

  // ── RISHTA MARRIAGE MARKET ────────────────────────────────────────────────

  {
    id: 'pak_dep_rishta',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1960 &&
      G.age >= 20 && G.age <= 32 &&
      !G.partner &&
      !G.mem?.pakDepRishta,
    text: 'The rishta system: the proposal that arrives through the mother\'s network, the visit of the aunties who assess the candidate, the exchange of photographs, the meeting with the families in the living room where tea is served and conversation is managed. You are being evaluated and evaluating simultaneously. The criteria are spoken and unspoken: the family name, the education, the skin tone, the earning capacity, the particular measure of compatibility that different families mean different things by. This is how most people you know will get married. The system is efficient and sometimes kind and sometimes brutal and has a very long institutional memory for what families were when.',
    choices: [
      {
        text: 'You go through the rishta process. A match is made.',
        tag: null,
        outcome: 'The match is made. Whether it is a good match is a question that takes years to answer. The families have done what they were supposed to do.',
        effect: (p) => {
          p.s += 2
          p.r += 3
          p.addFlag('pak_rishta_married')
          p.setMem('pakDepRishta', true)
        },
      },
      {
        text: 'You resist. The negotiation with the family about this is its own long event.',
        tag: null,
        outcome: 'The resistance is heard and argued with and partially respected and partially not. The position you end up in is a negotiated one, which is not the same as your chosen one.',
        effect: (p) => {
          p.m -= 5
          p.r += 4
          p.e += 3
          p.addFlag('pak_rishta_resisted')
          p.setMem('pakDepRishta', true)
        },
      },
    ],
    effect: null,
  },

  // ── OVERSEAS PULL ─────────────────────────────────────────────────────────

  {
    id: 'pak_dep_overseas_pull',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1980 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.pakDepOverseas,
    text: 'Someone from your lane has gone to the Gulf. Someone else has a cousin in the UK who works at Heathrow. The uncle in Toronto sends a remittance that pays the school fees and sometimes sends running shoes. The overseas Pakistani is a specific figure in the domestic imagination: the one who made it out, the one who sends money back, the one whose name is used as a benchmark. The question of whether to go is not abstract. It is arithmetic: the exchange rate, the visa category, the particular skill that the labour market in Saudi or in Britain or in Canada will pay for. The arithmetic changes the conversation at every family dinner.',
    choices: [
      {
        text: 'You start applying. The arithmetic comes out in favour of leaving.',
        tag: null,
        outcome: 'The application takes a year. The visa category defines what you will do and where you can live and whether your family can come. You go. The lane does not forget you.',
        effect: (p) => {
          p.r += 5
          p.m -= 5
          p.w += 4
          p.mo += 5000
          p.addFlag('pak_overseas_departed')
          p.addFlag('emigrated')
          p.setResidency('work_visa')
          p.setMem('pakDepOverseas', true)
        },
      },
      {
        text: 'You stay. The arithmetic is not the only thing.',
        tag: null,
        outcome: 'You stay and your reasons are yours. The lane fills with other people\'s remittances, other people\'s running shoes. You live in the country that the ones who left cannot.',
        effect: (p) => {
          p.r += 4
          p.karma += 3
          p.addFlag('pak_overseas_stayed')
          p.setMem('pakDepOverseas', true)
        },
      },
    ],
    effect: null,
  },

]
