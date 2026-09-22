// Croatia and Slovenia arc events
//
// Two countries that declared independence on the same day — 25 June 1991,
// within hours of each other — and had completely different 1990s, which is the
// whole point of writing them together. Slovenia's war was ten days. Croatia's
// was four years and included the shelling of a world heritage site and the
// departure of most of its Serb population.
//
// 15 events. Follow-throughs at the bottom; every flag set here lands there or
// in a buildYearTexture path.

const IS_HR = (G) => G.currentCountry?.name === 'Croatia' || G.character.country?.name === 'Croatia'
const IS_SI = (G) => G.currentCountry?.name === 'Slovenia' || G.character.country?.name === 'Slovenia'
const IS_YU = (G) => IS_HR(G) || IS_SI(G)

export const ADRIATIC_EVENTS = [

  // ── Titoist Yugoslavia: the part that was genuinely better ──

  {
    id: 'adr_gastarbeiter_father',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      IS_YU(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 15 &&
      !G.mem?.adrGastFather,
    text: 'Your father works in Germany. He comes back twice a year in a car that is better than any car on the street, and for two weeks the house has coffee that smells different and a radio that gets more stations. Then he goes. Your mother runs the household and the field and the school reports for ten months of the year and the arrangement is so common in the village that nobody comments on it. You are being raised by remittance. The word for the money is a normal word in your family, which it is not in families where the father is at home.',
    choices: null,
    effect: (p) => {
      p.mo += 400; p.m -= 4; p.e += 4
      p.addFlag('adr_gastarbeiter_family')
      p.addFlag('father_absent_working')
      p.setMem('adrGastFather', true)
    },
  },

  {
    id: 'adr_red_passport',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_YU(G) &&
      G.currentYear >= 1967 && G.currentYear <= 1990 &&
      G.age >= 16 &&
      !G.mem?.adrPassport,
    text: 'The passport works in both directions, which is the thing that makes Yugoslavia unlike the rest of the bloc, and everyone here knows it. You can go to Trieste for coffee and jeans and come back the same day. You can work in Munich. Cousins in Prague and Bucharest cannot do any of this and the difference is understood, on both sides, as a fact about how good you have it. Later, when the country is gone and the new passport is worse, this is the specific loss people will describe first — not the ideology, the document.',
    choices: null,
    effect: (p) => {
      p.m += 8; p.e += 4
      p.addFlag('adr_red_passport')
      p.setMem('adrPassport', true)
    },
  },

  {
    id: 'adr_tito_dies',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_YU(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1981 &&
      G.age >= 8 &&
      !G.mem?.adrTito,
    text: 'May. The announcement comes and the football match stops and the crowd in the stadium sings, thirty thousand people, and the recording of it will be played for the rest of your life. The relay of youth will go on without him for another seven years, which nobody in this room would predict. Your school has a moment of silence that goes on much longer than a moment. What nobody says, because nobody yet has the sentence for it, is that the federation was held together by a person and the person is in a coffin in Ljubljana. You are eight or you are forty and either way you have never lived in a country without him.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.e += 5
      p.addFlag('adr_tito_generation')
      p.setMem('adrTito', true)
    },
  },

  // ── Slovenia: the ten-day war and the fastest convergence in the region ──

  {
    id: 'adr_si_ten_day_war',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_SI(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 10 &&
      !G.mem?.adrSiWar,
    text: 'June. The declaration, and then the federal army moves, and then — because Slovenia has almost no Serb population and no strategic reason for anyone to insist — it is over in ten days. Sixty-odd dead. The barricades come down. Within a year you have a currency with a Slovene word on it and within thirteen you are in NATO and the European Union. You watch what happens next to Croatia and then to Bosnia on the television, in the same language, and the ten days becomes the most important accident of your life.',
    choices: [
      { text: 'Understand it as luck and say so', tag: 'defiant', outcome: 'It makes you unpopular at certain tables. It is also the accurate description.', effect: (p) => { p.e += 8; p.karma += 6; p.addFlag('adr_si_independence'); p.addFlag('adr_si_luck_acknowledged') } },
      { text: 'Understand it as something Slovenia earned', tag: 'yielding', outcome: 'It is a better story and you tell it well. It is not entirely a story.', effect: (p) => { p.m += 8; p.s += 4; p.addFlag('adr_si_independence'); p.addFlag('adr_si_national_pride') } },
    ],
    effect: null,
  },

  {
    id: 'adr_si_izbrisani',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_SI(G) &&
      G.currentYear >= 1992 && G.currentYear <= 2012 &&
      G.age >= 18 &&
      !G.mem?.adrSiErased,
    // The referendum is 4 April 2004, so the text branches on whether the
    // character is living before the country was asked or after it answered.
    // A flat retelling made it sound like an obscurity nobody had heard of;
    // it was put to a national vote and lost by ninety-six per cent.
    text: (G) => G.currentYear < 2004
      ? 'There is an administrative category that appears after independence: people who were citizens of Yugoslavia and residents of Slovenia and who did not complete a form inside a six-month window. Twenty-five thousand of them are removed from the register. They lose work, pensions, the right to be here, in some cases their documents on the spot. They are called the erased, and the word is accurate — a bureaucratic deletion, no violence at all. Nobody you know can tell you how a person is supposed to appeal a clerical fact.'
      : 'Twenty-five thousand people were taken off the register after independence — citizens of Yugoslavia, residents of Slovenia, who did not complete a form inside a six-month window. They lost work, pensions, the right to be here, in some cases their documents on the spot. They are called the erased. The Constitutional Court has now said twice that this was unlawful, and in April the question of putting them back goes to a referendum and loses: ninety-six per cent against, on a turnout of a third. It takes the European Court of Human Rights to move it after that.',
    choices: [
      { text: 'Find out about it properly', tag: 'defiant', outcome: 'You read the judgment. It is the least dramatic injustice you have ever been furious about.', effect: (p) => { p.e += 7; p.karma += 7; p.addFlag('adr_si_erased_aware') } },
      { text: 'It is a paperwork problem. There are bigger things.', tag: 'yielding', outcome: 'You are right about the paperwork and wrong about the size.', effect: (p) => { p.karma -= 4; p.addFlag('adr_si_erased_unaware') } },
    ],
    effect: null,
  },

  {
    id: 'adr_si_2013_crisis',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_SI(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2015 &&
      G.age >= 22 &&
      !G.mem?.adrSiCrisis,
    text: 'The banks that financed the construction boom are state-owned and the loans were to people who knew people, and when it unwinds the hole is a fifth of national output. The country comes within a fortnight of asking for a bailout and does not, which becomes a point of pride slightly larger than the facts support. There are protests in Maribor that start over speed cameras and end with the mayor resigning. The phrase everyone learns is bad bank.',
    choices: null,
    effect: (p) => {
      p.mo -= 1200; p.m -= 6; p.e += 4
      p.addFlag('adr_si_crisis_generation')
      p.setMem('adrSiCrisis', true)
    },
  },

  {
    id: 'adr_si_cottage',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_SI(G) &&
      G.age >= 28 && G.age <= 70 &&
      G.currentYear >= 1970 &&
      !G.mem?.adrSiCottage,
    text: 'There is a place in the family — a hayrack, a vineyard cottage, a house in a valley somebody\'s grandmother came from — and you go there most weekends of your adult life. The work there is real work: the wood, the vines, the roof. It is also the opposite of the job. Not many families own one outright — fewer here than almost anywhere in the region — but everybody has access to somebody\'s, which is why the country empties toward the hills on a Friday afternoon and why nobody here thinks of the countryside as somewhere else.',
    choices: null,
    effect: (p) => {
      p.m += 9; p.h += 4
      p.addFlag('adr_si_weekend_cottage')
      p.setMem('adrSiCottage', true)
    },
  },

  // ── Croatia: the long war and what it left ──

  {
    id: 'adr_hr_vukovar',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_HR(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 10 &&
      !G.mem?.adrHrVukovar,
    text: 'Eighty-seven days. The town on the Danube is shelled until there is no building in it with a roof, and the column that comes out at the end is filmed, and the men taken from the hospital are found later in a field at Ovčara. Dubrovnik is shelled the same autumn — the old town, from the mountain, which is the detail that makes the international news care. You are in a cellar or you are watching it from a safer part of the country, and either way this is the year the word neighbour changes meaning in a way that will not change back in your lifetime.',
    choices: [
      { text: 'Volunteer', tag: 'defiant', outcome: 'You are given a rifle that is older than you are and a position on a line. You are there for two years.', effect: (p) => { p.h -= 14; p.m -= 12; p.karma += 4; p.addFlag('adr_hr_veteran'); p.addFlag('combat_veteran'); p.addFlag('adr_hr_war_generation') } },
      { text: 'Get your family somewhere else', tag: null, outcome: 'You reach a relative on the coast. You spend the war being safe and hearing about it, which has its own weight.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('adr_hr_displaced'); p.addFlag('displaced'); p.addFlag('adr_hr_war_generation') } },
      { text: 'Stay where you are and keep something open — a shop, a school, a clinic', tag: null, outcome: 'You keep it open for four years. It is the least heroic and most useful thing available.', effect: (p) => { p.m -= 6; p.karma += 8; p.s += 5; p.addFlag('adr_hr_kept_open'); p.addFlag('adr_hr_war_generation') } },
    ],
    effect: null,
  },

  {
    id: 'adr_hr_oluja_1995',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_HR(G) &&
      G.currentYear >= 1995 && G.currentYear <= 1996 &&
      G.age >= 12 &&
      !G.mem?.adrHrOluja,
    text: 'August, four days, and the self-declared Serb republic in the interior collapses. The war is effectively over and the country is whole, and there is a column of tractors on the road north that is thirty kilometres long and is not coming back. Depending on where you are standing this is liberation or it is the end of four hundred years of your family living in Knin. Both of those sentences are being said in Croatian, on the same week, about the same four days.',
    choices: [
      { text: 'Celebrate. It is the end of the war.', tag: null, outcome: 'You are in the square with everyone. It is the largest relief of your life and it is not complicated at the time.', effect: (p) => { p.m += 14; p.addFlag('adr_hr_oluja_celebrated') } },
      { text: 'Notice the road', tag: 'defiant', outcome: 'Nobody thanks you for noticing. You notice anyway, and you will be able to describe the tractors in thirty years.', effect: (p) => { p.m += 2; p.karma += 8; p.e += 5; p.addFlag('adr_hr_oluja_complicated') } },
    ],
    effect: null,
  },

  {
    id: 'adr_hr_serb_family',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_HR(G) &&
      G.ethnicity === 'serb_croatia' &&
      G.currentYear >= 1991 && G.currentYear <= 1998 &&
      G.age >= 8 &&
      !G.mem?.adrHrSerb,
    text: 'The surname is the problem. It was not a problem in 1989 and it is the first thing about you in 1991 — on a form, at a checkpoint, in the mouth of a man at the bus station who has decided to ask. Your family has been in this village since the Habsburgs put them on the military frontier. There is a decision to be made about whether that history is a defence or an accusation, and you are not the one making it.',
    choices: [
      { text: 'Leave', tag: null, outcome: 'You take what fits and you go north. The house is occupied within a month by people who also had to leave somewhere.', effect: (p) => { p.m -= 16; p.mo -= 2000; p.addFlag('adr_hr_serb_departed'); p.addFlag('displaced'); p.addFlag('lost_home') } },
      { text: 'Stay and keep your head down', tag: 'yielding', outcome: 'Nothing happens to you, which is not the same as being safe, and you know the difference every day for seven years.', effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('adr_hr_serb_stayed'); p.addFlag('minority_under_pressure') } },
    ],
    effect: null,
  },

  {
    id: 'adr_hr_eu_2013',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_HR(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2016 &&
      G.age >= 16 &&
      !G.mem?.adrHrEu,
    text: 'July, and the accession takes effect, and the immediate consequence is not prosperity but departure: the labour market opens and the young go — Ireland, Germany, Sweden. Villages in Slavonia now have more houses than households. The remittances come back and the people do not. The country spent the 1990s fighting to exist and spent the 2010s discovering that existing and being lived in are different achievements.',
    choices: [
      { text: 'Go', tag: 'defiant', outcome: 'Dublin, then Munich. You send money home and visit at Christmas and the visits get harder, not easier.', effect: (p) => { p.mo += 3000; p.m -= 5; p.addFlag('adr_hr_emigrated'); p.addFlag('emigrated') } },
      { text: 'Stay', tag: 'yielding', outcome: 'You stay. Half your school year does not. The street is quieter every September.', effect: (p) => { p.m -= 6; p.karma += 4; p.addFlag('adr_hr_stayed_behind'); p.addFlag('stayed_behind') } },
    ],
    effect: null,
  },

  {
    id: 'adr_hr_coast_season',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_HR(G) &&
      G.currentYear >= 1965 &&
      G.age >= 16 && G.age <= 65 &&
      !G.mem?.adrHrSeason,
    text: 'The year has two halves and the money is made in one of them. From June the town is four times its population and you are renting rooms, or serving, or driving, or all three, and by mid-September it is a place with one bakery open and a great deal of light. Everyone here lives on a summer. The winters are for repairs and arguments and the specific quiet of a resort out of season, which is a quiet with an echo in it.',
    choices: null,
    effect: (p) => {
      p.mo += 1400; p.h -= 4; p.s += 4
      p.addFlag('adr_hr_season_economy')
      p.setMem('adrHrSeason', true)
    },
  },
]

// ─── Follow-through ──────────────────────────────────────────────────────────

export const ADRIATIC_FOLLOWTHROUGH = [

  {
    id: 'adr_ft_passport_downgrade',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('adr_red_passport') &&
      G.currentYear >= 1992 && G.currentYear <= 2005 &&
      G.age >= 25 &&
      !G.mem?.adrFtPassport,
    text: 'You apply for the new passport and it is thinner, and it needs a visa for places the old one did not, and the queue at the consulate contains people who used to drive to Trieste for the afternoon. Somebody in the queue says out loud that under Tito this was not necessary, and four people look at the floor, because it is true and because of everything else that is also true.',
    choices: null,
    effect: (p) => {
      p.m -= 7; p.e += 3
      p.addFlag('adr_passport_nostalgia')
      p.setMem('adrFtPassport', true)
    },
  },

  {
    id: 'adr_ft_veteran_pension',
    phase: null,
    weight: 6,
    when: (G) =>
      G.flags.has('adr_hr_veteran') &&
      G.currentYear >= 2000 &&
      G.age >= 35 &&
      !G.mem?.adrFtVeteran,
    text: 'The veterans\' benefit is real money and it is politically untouchable, and the number of registered veterans has somehow grown since the war ended. You have the papers and the actual two years and a knee that tells you the weather. In the queue you can tell, roughly, who was there. Nobody says anything. The category has become a thing you are rather than a thing you did, and you are not sure when that happened.',
    choices: [
      { text: 'Take it. You earned it.', tag: null, outcome: 'You take it. It is not complicated in law and it is slightly complicated at the kitchen table.', effect: (p) => { p.mo += 2400; p.m += 3; p.addFlag('adr_veteran_pension') } },
      { text: 'Stop claiming it', tag: 'defiant', outcome: 'It costs you real money and buys you something you cannot name and would not trade.', effect: (p) => { p.mo -= 600; p.karma += 8; p.m += 5; p.addFlag('adr_veteran_refused_pension') } },
    ],
    effect: null,
  },

  {
    id: 'adr_ft_return_visit',
    phase: null,
    weight: 6,
    when: (G) =>
      (G.flags.has('adr_hr_serb_departed') || G.flags.has('adr_hr_displaced')) &&
      G.currentYear >= 2002 &&
      G.age >= 35 &&
      !G.mem?.adrFtReturn,
    text: 'You go back to look at the house. Somebody lives in it and has for years, and has planted things, and the roof has been redone in a material you would not have chosen. You stand at the end of the lane for a while. Nobody comes out. The restitution process exists on paper and the paper is twelve years of it, and what you came for was not the house.',
    choices: [
      { text: 'Knock', tag: 'defiant', outcome: 'A woman your age answers. You talk for twenty minutes about the roof. Neither of you mentions the war.', effect: (p) => { p.m += 8; p.karma += 8; p.addFlag('adr_return_knocked') } },
      { text: 'Look, and drive away', tag: 'yielding', outcome: 'You are back on the main road inside ten minutes. You do not go again.', effect: (p) => { p.m -= 5; p.r += 7; p.addFlag('adr_return_withheld') } },
    ],
    effect: null,
  },

  {
    id: 'adr_ft_emptied_village',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('adr_hr_stayed_behind') &&
      G.age >= 58 &&
      !G.mem?.adrFtEmpty,
    text: 'The school closed the year before last — nine children was not enough — and they go by bus to the next town now. The bakery holds on because of the bus. You could name every house on this road and who is in it and how many of them are over seventy, and the answer to the last one is most. You fought for this to be a country, or your brother did. Nobody fought about whether anyone would be here.',
    choices: null,
    effect: (p) => {
      p.m -= 9; p.r += 5; p.e += 3
      p.addFlag('adr_village_emptied')
      p.setMem('adrFtEmpty', true)
    },
  },

  {
    id: 'adr_ft_si_erased_late',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('adr_si_erased_aware') &&
      G.currentYear >= 2012 &&
      G.age >= 35 &&
      !G.mem?.adrFtErased,
    text: 'Strasbourg rules against Slovenia and there is compensation, twenty years on, for people some of whom are dead. The amounts are small. The finding is not. You notice that the country that managed the cleanest exit in the region also managed the quietest injustice in it, and that the two facts are related: nothing here was loud enough to be looked at.',
    choices: null,
    effect: (p) => {
      p.e += 6; p.karma += 4
      p.addFlag('adr_si_erased_resolved')
      p.setMem('adrFtErased', true)
    },
  },
]
