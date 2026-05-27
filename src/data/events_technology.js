// events_technology.js
// Era-defining technology moments that mark when you lived.
// A character born in 1955 experiences these differently than one born in 1985.
// All gate on G.currentYear and G.character.country.gdp / archetype.

const wealthy = (G) => ['very_high','high','medium_high'].includes(G.character.country.gdp)
const developing = (G) => ['low_medium','medium'].includes(G.character.country.gdp)
const poor = (G) => ['very_low','low'].includes(G.character.country.gdp)

export const TECHNOLOGY_EVENTS = [

  // ── RADIO ────────────────────────────────────────────────────────────────────
  {
    id: 'tech_first_radio',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1930 && G.currentYear <= 1958 && G.age >= 5 && G.age <= 12,
    text: 'Your family gets a radio. A brown wooden box that hisses and crackles and then speaks. You cluster around it after dinner. For the first time, voices from the capital, from other countries, from the world outside your street enter your living room.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 8; p.addFlag('radio_childhood') },
  },
  {
    id: 'tech_radio_war_news',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1939 && G.currentYear <= 1946 && G.age >= 5,
    text: 'The radio is on all the time now. The adults gather around it in a way that has a different quality from before. You cannot follow all the words but you understand from their faces that something serious is happening somewhere larger than here.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('war_radio_childhood') },
  },

  // ── TELEVISION ───────────────────────────────────────────────────────────────
  {
    id: 'tech_first_tv_wealthy',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1951 && G.currentYear <= 1968 && wealthy(G) && G.age >= 5 && G.age <= 13,
    text: 'The television arrives. It takes two men to carry it in. Your father positions it like a piece of furniture and your mother puts a doily on top. The screen is small. The picture is black and white. The whole family sits in front of it in the evenings and watches the test pattern come on at 11 PM.',
    choices: null,
    effect: (p) => { p.m += 10; p.e += 4; p.addFlag('tv_generation') },
  },
  {
    id: 'tech_first_tv_developing',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1968 && G.currentYear <= 1985 && (developing(G) || poor(G)) && G.age >= 5 && G.age <= 13,
    text: 'The television arrives in your neighborhood. Not in your house — in the neighbor\'s house, or the community center. People gather in the evening to watch. It is not entirely comfortable and it is completely extraordinary. The world is bigger than anyone realized.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('tv_generation') },
  },
  {
    id: 'tech_moon_landing',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear === 1969 && G.age >= 5,
    text: 'Your family gathers around the television. There is a grainy grey image and an American voice. A man is walking on the moon. Your father says something you will remember for the rest of your life. You are not sure yet what it means to be alive in a world where this is possible.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 8; p.addFlag('moon_landing_generation') },
  },
  {
    id: 'tech_color_tv',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1966 && G.currentYear <= 1978 && wealthy(G) && G.age >= 5 && G.age <= 14,
    text: 'The new television is in color. You watch a nature documentary and the green of the forest is shocking — you did not know that was the actual color. You think about all the things you saw in black and white that were really something else.',
    choices: null,
    effect: (p) => { p.m += 6; p.e += 3 },
  },

  // ── HOME COMPUTER ────────────────────────────────────────────────────────────
  {
    id: 'tech_first_computer_home',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1982 && G.currentYear <= 1994 && wealthy(G) && G.age >= 7 && G.age <= 14,
    text: 'A computer arrives at home. It takes twenty minutes to load a program from a cassette tape that makes a sound like a dial-up fax. You learn to type commands in all capitals. The screen glows green. You will look back on this as the beginning of something enormous.',
    choices: [
      { text: 'Spend hours learning to program it', tag: null, outcome: 'You stay up late writing code. Most of it doesn\'t work. You don\'t care.', effect: (p) => { p.e += 10; p.addFlag('early_computer_user'); p.addFlag('coding_interest') } },
      { text: 'Mostly play the games', tag: null, outcome: 'The games are blocky and slow and completely absorbing.', effect: (p) => { p.m += 6; p.e += 4; p.addFlag('early_computer_user') } },
    ],
    effect: null,
  },
  {
    id: 'tech_computer_at_school',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1984 && G.currentYear <= 1996 && wealthy(G) && G.age >= 8 && G.age <= 14,
    text: 'The school gets a computer room. You go in pairs, once a week. There are rules about touching the screen. The teacher does not entirely know what she is doing and neither do you and this makes it strangely exciting.',
    choices: null,
    effect: (p) => { p.e += 5; p.addFlag('school_computer_era') },
  },
  {
    id: 'tech_first_computer_developing',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.currentYear >= 1990 && G.currentYear <= 2003 && developing(G) && G.age >= 12 && G.age <= 18,
    text: 'There is a computer at the library or at a family friend\'s business. You learn to use it. Time on the machine is rationed and precious. You type faster than anyone expects because you have practiced every hour you could.',
    choices: null,
    effect: (p) => { p.e += 7; p.addFlag('early_computer_user') },
  },

  // ── INTERNET ─────────────────────────────────────────────────────────────────
  {
    id: 'tech_first_internet_dialup',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.currentYear >= 1994 && G.currentYear <= 2002 && wealthy(G) && G.age >= 12,
    text: 'The internet arrives via a phone line and a modem that makes a sound you will remember forever: the shrill handshake screech, the hiss, the connection. You have to wait for a page to load for 40 seconds and then it is there — information about anything, from anywhere, right now. Nothing is the same.',
    choices: null,
    effect: (p) => { p.e += 10; p.m += 8; p.addFlag('internet_generation') },
  },
  {
    id: 'tech_first_internet_developing',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 1998 && G.currentYear <= 2010 && developing(G) && G.age >= 16,
    text: 'There is an internet café in town. It costs money per hour. You budget carefully. You can email someone in another country and the reply arrives the same day. You can find information that your school library doesn\'t have. You understand that a wall has developed a door.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 6; p.addFlag('internet_generation') },
  },

  // ── MOBILE PHONES ────────────────────────────────────────────────────────────
  {
    id: 'tech_first_mobile',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 1999 && G.currentYear <= 2007 && wealthy(G) && G.age >= 16 && !G.flags.includes('has_mobile'),
    text: 'You get your first mobile phone. It is heavy and the battery lasts three days and you can call and text and nothing else. You give your number to everyone you know. You fall asleep with it next to your pillow and this will not change for the rest of your life.',
    choices: null,
    effect: (p) => { p.s += 5; p.m += 8; p.addFlag('has_mobile') },
  },
  {
    id: 'tech_mobile_africa',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 2003 && G.currentYear <= 2012 && (G.character.country.archetype === 'subsaharan') && G.age >= 16,
    text: 'The mobile phone network reaches your area. Your family gets a phone that is shared between everyone. It skips the landline era entirely — going straight from nothing to mobile. Within a year, your mother is using mobile money to send payments to relatives without going to a bank. The phone does more here than it does in rich countries.',
    choices: null,
    effect: (p) => { p.e += 6; p.m += 8; p.addFlag('has_mobile'); p.addFlag('mobile_money') },
  },

  // ── SMARTPHONES ──────────────────────────────────────────────────────────────
  {
    id: 'tech_first_smartphone',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 2009 && G.currentYear <= 2015 && G.age >= 16 && !G.flags.includes('has_smartphone'),
    text: 'The smartphone. You hold the internet in your hand and take a photo and know exactly where you are in the world. The old phone seems, within weeks, like a relic. You wonder what you did before and cannot quite remember.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 6; p.addFlag('has_smartphone') },
  },
  {
    id: 'tech_smartphone_first_in_family',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 2011 && G.currentYear <= 2018 && (developing(G) || poor(G)) && G.age >= 16 && G.character.wealthTier <= 2,
    text: 'You are the first in your family to have a smartphone. Your mother asks you to show her how to video call your brother who is working abroad. You do. She sees his face on a screen for the first time in three years and covers her mouth. The phone has a specific weight after that.',
    choices: null,
    effect: (p) => { p.m += 15; p.e += 5; p.addFlag('has_smartphone') },
  },

  // ── SOCIAL MEDIA ─────────────────────────────────────────────────────────────
  {
    id: 'tech_social_media_arrives',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.currentYear >= 2008 && G.currentYear <= 2013 && G.age >= 13 && G.age <= 22,
    text: 'A social network is where everyone is now. You make a profile. You add people. You learn that public life and private life are the same place now if you\'re not careful. You spend more time on it than you intend to. So does everyone.',
    choices: [
      { text: 'Embrace it — it\'s how the world works now', tag: null, outcome: 'You curate a version of yourself online. It is partly true and partly aspirational and you lose track of the difference.', effect: (p) => { p.s += 5; p.m -= 3; p.addFlag('social_media_user') } },
      { text: 'Use it selectively, keep most of your life offline', tag: null, outcome: 'You stay on the margins of it. People sometimes can\'t find you. You decide this is fine.', effect: (p) => { p.m += 4; p.addFlag('selective_social_media') } },
    ],
    effect: null,
  },
  {
    id: 'tech_social_media_political',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 2016 && G.age >= 18 && G.flags.includes('social_media_user'),
    text: 'Social media has become the place where politics happens. You see things that make you angry. You share them. The algorithm learns what makes you engage and shows you more of it. You are aware of this and it works on you anyway.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 4 },
  },

  // ── COVID / REMOTE WORK ──────────────────────────────────────────────────────
  {
    id: 'tech_covid_zoom',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 2020 && G.currentYear <= 2022 && G.age >= 18,
    text: 'Everything moves to a screen. Meetings, school, doctor appointments, funerals. You learn that you could always have worked from home, or your children could have had school at home, and nobody thought to try until there was no other option. The commute disappears. The boundary between work and home disappears with it.',
    choices: [
      { text: 'Adapt and find the new rhythms', tag: null, outcome: 'You rebuild habits. The isolation is real. So is the saved commute time. It\'s not the same and also not without advantages.', effect: (p) => { p.e += 5; p.m -= 5; p.addFlag('remote_work_generation') } },
      { text: 'Struggle — you need other people and this is not working', tag: null, outcome: 'The loneliness compounds. The flat screen stands in for things it can\'t replace.', effect: (p) => { p.m -= 12; p.h -= 5; p.r += 5 } },
    ],
    effect: null,
  },

  // ── ERA-SPECIFIC: NO TECHNOLOGY ──────────────────────────────────────────────
  {
    id: 'tech_no_phone_era',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1960 && G.currentYear <= 1985 && G.age >= 18 && G.age <= 28,
    text: 'You are in a new city for the first time. There is no way to reach your family except by letter, which takes a week, or a long-distance call from a phone box with coins. You write a letter. You are genuinely on your own in a way that people born later will find difficult to imagine.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 5; p.addFlag('pre_mobile_independence') },
  },
  {
    id: 'tech_pre_internet_research',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.currentYear >= 1970 && G.currentYear <= 1993 && G.age >= 12 && G.age <= 18,
    text: 'You need information for a school project. You go to the library. You look in the card catalogue. You find three books and read through all of them to find the two paragraphs you need. The information is imprecise and hard-won. You are more careful with it than you would be if it were easy to find.',
    choices: null,
    effect: (p) => { p.e += 6; p.m -= 2 },
  },

  // ── MOBILE MONEY (SUB-SAHARAN AFRICA) ────────────────────────────────────────

  {
    id: 'tech_mobile_money_mpesa',
    phase: 'young_adult',
    weight: 4,
    when: (G) => ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia', 'Mozambique'].includes(G.character.country.name) &&
      G.currentYear >= 2007 && G.currentYear <= 2014 &&
      G.age >= 16 && !G.flags.includes('mobile_money_user'),
    text: 'The phone network has launched a money transfer service. You send money to your mother in the village with a text message. She collects it from the shop in town on the same day. There was no bank account involved, no branch, no form. You do this again the following month and the month after that. The way money moves has changed, for you, quietly and completely.',
    choices: null,
    effect: (p) => { p.e += 6; p.m += 8; p.addFlag('mobile_money_user'); p.addFlag('skipped_banking_era') },
  },

  {
    id: 'tech_mobile_money_nigeria',
    phase: 'young_adult',
    weight: 3,
    when: (G) => ['Nigeria', 'Ghana', 'Senegal', 'DR Congo', 'Namibia'].includes(G.character.country.name) &&
      G.currentYear >= 2012 && G.currentYear <= 2018 &&
      G.age >= 16 && !G.flags.includes('mobile_money_user'),
    text: 'Mobile money has reached here later than Kenya but it has arrived. Small traders use it at market. Your mother settles a debt with three button presses. You pay for goods without handling cash. The bank in the next town exists but is no longer the point.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 6; p.addFlag('mobile_money_user'); p.addFlag('skipped_banking_era') },
  },

  {
    id: 'tech_mobile_money_business',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('mobile_money_user') && G.career?.id === 'entrepreneur' &&
      G.currentYear >= 2010 && G.age >= 20,
    text: 'Your business takes payments on a mobile number. You have customers in three towns. None of them have been to your premises. The infrastructure of trade that took wealthy countries a century to build — payment networks, credit, invoicing — exists here in something small enough to fit in a pocket.',
    choices: null,
    effect: (p) => { p.mo += 1500; p.e += 5; p.w += 4; p.addFlag('mobile_business') },
  },

]
