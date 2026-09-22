// Austria arc events
//
// 9 events: Heldenplatz 1938 as a child in the crowd, the bombing of Vienna,
// the four-power occupation, the 1955 treaty, Kreisky's Austria, the Waldheim
// affair 1986 (the year the country's account of itself stopped holding), the
// Gemeindebau flat, Vranitzky's coalition, the late reckoning.
//
// Per the design principle, the follow-throughs come first: every flag set here
// is consumed by `AUSTRIA_FOLLOWTHROUGH` below or by a buildYearTexture path.
// The arc this module is built around is the one Austrians spent forty years
// not having — victim or perpetrator, Opfer or Täter — which is not a question
// a character answers once.

const IS_AUSTRIA = (G) => G.currentCountry?.name === 'Austria' || G.character.country?.name === 'Austria'

export const AUSTRIA_EVENTS = [

  {
    id: 'aut_heldenplatz_1938',
    phase: 'childhood',
    weight: 9,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1938 && G.currentYear <= 1939 &&
      G.age >= 7 && G.age <= 15 &&
      !G.mem?.autHeldenplatz,
    text: 'March. Your father takes you into the city because everyone is going. The Heldenplatz is filled in a way you have never seen a place filled — not a crowd, a surface. The man speaks from the balcony of the Hofburg and the sound that comes back from the square is one sound. Your father is not cheering. He is holding your shoulder very tightly and looking straight ahead, and you understand from the hand and not from anything said that you are to keep still. Afterwards, on the tram, nobody in your family says anything about the afternoon. For the next fifty years the country will describe this day as something that was done to it.',
    choices: [
      { text: 'Ask your father, later, what it was', tag: 'defiant', outcome: 'He says: remember that you were there. Then he says nothing else, ever, about it.', effect: (p) => { p.e += 6; p.m -= 4; p.addFlag('aut_heldenplatz_witness'); p.addFlag('aut_family_uneasy') } },
      { text: 'Learn not to ask', tag: 'yielding', outcome: 'The silence becomes a household rule nobody wrote down. You are fluent in it by the time you are twelve.', effect: (p) => { p.m -= 3; p.s -= 3; p.addFlag('aut_heldenplatz_witness'); p.addFlag('aut_taught_silence') } },
    ],
    effect: null,
  },

  {
    id: 'aut_vienna_bombed',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1944 && G.currentYear <= 1945 &&
      G.age >= 5 && G.age <= 45 &&
      !G.mem?.autBombed,
    text: 'The cellar of the building has been the cellar of the building your whole life — the coal, the preserves, the smell of the wall. Now it is where fifty people sit in the dark listening to the ceiling. The Opera burns in March. The cathedral loses its roof. When you come up the light is wrong because there is more of it: buildings that made the street a street are absent, and the sky comes down to the pavement in places it never did. Someone is already sweeping. That is the part you remember — that within an hour of it stopping, someone was sweeping.',
    choices: null,
    effect: (p) => {
      p.m -= 12; p.h -= 6; p.e += 4
      p.addFlag('aut_bombing_survivor')
      p.addFlag('war_childhood')
      p.setMem('autBombed', true)
    },
  },

  {
    id: 'aut_four_powers',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1955 &&
      G.age >= 10 &&
      !G.mem?.autFourPowers,
    text: 'The city is cut into four and the middle is administered by all of them in rotation, one month each, so the identity of the soldier checking your papers in the Innere Stadt depends on the month. The Russians are in the district where your aunt lives and people there talk about the requisitions and then stop talking. You learn the four uniforms the way children elsewhere learn birds. There is a word for the whole arrangement and the word is temporary, and it lasts ten years, which is long enough to be a childhood.',
    choices: null,
    effect: (p) => {
      p.e += 6; p.s += 3; p.m -= 3
      p.addFlag('aut_occupation_childhood')
      p.setMem('autFourPowers', true)
    },
  },

  {
    id: 'aut_staatsvertrag_1955',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1956 &&
      G.age >= 8 &&
      !G.mem?.autTreaty,
    text: 'May, at the Belvedere. The foreign ministers come out onto the balcony and hold up the signed treaty and Figl says the sentence everyone will repeat — Österreich ist frei. The last occupying soldier leaves in October. What the country agreed to in exchange is permanent neutrality, written into the constitution: no alliance, no foreign bases, and a particular kind of usefulness to everyone. Your parents cry at the radio. For the rest of your life, neutrality will be described to you as a principle rather than a price, and it was both.',
    choices: null,
    effect: (p) => {
      p.m += 14; p.karma += 4
      p.addFlag('aut_treaty_generation')
      p.setMem('autTreaty', true)
    },
  },

  {
    id: 'aut_gemeindebau',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1950 && G.currentYear <= 2025 &&
      G.age >= 20 && G.age <= 55 &&
      !G.flags.has('owns_property') &&
      !G.mem?.autGemeindebau,
    text: 'The flat is municipal. It was built in the 1920s by a city government that wanted workers to have a courtyard, a laundry, a window that opened onto something, and it has all three. The rent is a number that would be a rounding error in Munich. The tenancy can pass to your children. Nobody here expects to own anything and nobody here expects to leave, and those two facts together produce a particular kind of neighbour: someone who has an opinion about the courtyard, because the courtyard will outlast both of you.',
    choices: [
      { text: 'Settle in. This is the life.', tag: 'yielding', outcome: 'You are on the tenants\' committee within three years. You know which window belongs to whom.', effect: (p) => { p.m += 8; p.s += 5; p.addFlag('aut_gemeindebau_life'); p.addFlag('rooted_community') } },
      { text: 'Treat it as a stage on the way somewhere', tag: 'defiant', outcome: 'You stay eleven years. Every one of them is described, by you, as temporary.', effect: (p) => { p.m += 2; p.w += 3; p.addFlag('aut_gemeindebau_life'); p.addFlag('restless_renter') } },
    ],
    effect: null,
  },

  {
    id: 'aut_waldheim_1986',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1986 && G.currentYear <= 1988 &&
      G.age >= 18 &&
      !G.mem?.autWaldheim,
    text: 'The presidential candidate was Secretary-General of the United Nations, and the documents say he was a lieutenant in a unit in the Balkans that did things he has spent forty years not mentioning. He does not deny the service. He says he only did his duty, like hundreds of thousands of other Austrians — which is the most damaging sentence available, because it is true and it is an admission of what the country has been claiming. The argument is in every kitchen. He wins the election. The phrase people start using, in public, for the first time, is that Austria was not the first victim of the Nazis but the first accomplice.',
    choices: [
      { text: 'Say so out loud, at work, at the table', tag: 'defiant', outcome: 'You lose an uncle over it. You gain an argument you will be having for thirty years.', effect: (p) => { p.e += 8; p.karma += 8; p.s -= 5; p.addFlag('aut_waldheim_reckoning'); p.addFlag('politically_awakened') } },
      { text: 'Defend him. He did what everyone did.', tag: 'yielding', outcome: 'The sentence comes out of your mouth and you hear it land, and some part of you files the sound of it away.', effect: (p) => { p.m -= 4; p.karma -= 6; p.r += 6; p.addFlag('aut_waldheim_defended') } },
      { text: 'Keep out of it. It is 1986 and this is forty years old.', tag: null, outcome: 'You get through the year without an opinion. It costs less than the alternatives and you notice that it cost something.', effect: (p) => { p.m -= 2; p.r += 3; p.addFlag('aut_waldheim_abstained') } },
    ],
    effect: null,
  },

  {
    id: 'aut_gastarbeiter_reception',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 1968 && G.currentYear <= 1995 &&
      G.age >= 18 &&
      !['turkish_austrian', 'yugoslav_austrian'].includes(G.ethnicity) &&
      !G.mem?.autGastarbeiter,
    text: 'The recruitment agreements bring men from Anatolia and from Yugoslavia to the building sites and the factory floors, and the arrangement is explicitly temporary — a rotation, workers who will go home. They do not go home; people rarely do. By the time this is obvious, there are children in the school who were born here and are not, administratively, from here. The word in the newspapers is Gastarbeiter. You notice that the guest half of it stopped being accurate a long time ago and that nobody has proposed a new word.',
    choices: [
      { text: 'Learn your neighbours\' names and use them', tag: 'defiant', outcome: 'It is the smallest possible act and it makes a difference to exactly the number of people you would expect.', effect: (p) => { p.karma += 7; p.s += 4; p.addFlag('aut_immigration_open') } },
      { text: 'Keep a polite distance', tag: 'yielding', outcome: 'You are never unkind. You are also never asked to be anything else.', effect: (p) => { p.m += 1; p.karma -= 2; p.addFlag('aut_immigration_distant') } },
    ],
    effect: null,
  },

  {
    id: 'aut_far_right_government',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2019 &&
      G.age >= 20 &&
      !G.mem?.autFarRight,
    text: 'The freedom party enters government and fourteen other European states downgrade relations with Vienna, which is the first time anyone can remember the country being treated as a problem rather than a venue. There are demonstrations on the Ring every Thursday. There are also a great many people who find the international reaction more offensive than the coalition, and some of them are related to you. The sanctions are lifted within the year. The party is in government again within two decades, and by then it is a fact about Austria rather than a crisis in it.',
    choices: [
      { text: 'Walk on the Ring every Thursday', tag: 'defiant', outcome: 'You walk through a winter of them. Attendance falls off in February; you keep going.', effect: (p) => { p.karma += 8; p.m += 4; p.addFlag('aut_thursday_demos'); p.addFlag('politically_awakened') } },
      { text: 'Find the outside criticism harder to take than the coalition', tag: 'yielding', outcome: 'It is a defensible position and you are aware, while holding it, of what it is standing in front of.', effect: (p) => { p.karma -= 5; p.r += 4; p.addFlag('aut_sovereignty_defensive') } },
    ],
    effect: null,
  },

  {
    id: 'aut_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      IS_AUSTRIA(G) &&
      G.age >= 60 &&
      (G.flags.has('aut_heldenplatz_witness') || G.flags.has('aut_taught_silence') || G.flags.has('aut_waldheim_reckoning') || G.flags.has('aut_waldheim_defended')) &&
      !G.mem?.autLate,
    text: 'A grandchild has been given the subject at school, properly, with the dates and the numbers and the transport lists, and comes to you because you were alive. What you have is not the dates. What you have is a hand on a shoulder in a full square, and a family that did not discuss an afternoon, and a sentence you either said or did not say in 1986. The curriculum is better than the silence was. It also cannot hold the thing you actually know, which is how ordinary the silence felt from the inside.',
    choices: [
      { text: 'Tell them the small true thing', tag: 'defiant', outcome: 'You describe the hand on your shoulder. They write none of it down and forget none of it.', effect: (p) => { p.m += 10; p.karma += 8; p.addFlag('aut_transmitted_memory'); p.addFlag('memory_keeper') } },
      { text: 'Give them the dates. The dates are safer.', tag: 'yielding', outcome: 'You are accurate for forty minutes. Afterwards you sit in the kitchen for a while.', effect: (p) => { p.m -= 3; p.r += 7; p.addFlag('aut_withheld_memory') } },
    ],
    effect: null,
  },
]

// ─── Follow-through ──────────────────────────────────────────────────────────
// Written before the events above, per the design principle. Every flag set by
// this module either lands here or has a buildYearTexture path.

export const AUSTRIA_FOLLOWTHROUGH = [

  {
    id: 'aut_ft_silence_inherited',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('aut_taught_silence') &&
      G.age >= 30 &&
      G.children?.length > 0 &&
      !G.mem?.autFtSilence,
    text: 'Your child asks a direct question at the table about what your family did, and you discover that the household rule transferred. The pause before you answer is the same length as your father\'s pause. You are on the other side of it now and it is not more comfortable here.',
    choices: [
      { text: 'Break it. Answer the question badly and completely.', tag: 'defiant', outcome: 'You get it out in the wrong order with too much detail. The rule is broken, which was the point.', effect: (p) => { p.m += 6; p.karma += 6; p.addFlag('aut_silence_broken') } },
      { text: 'Change the subject the way it was changed for you', tag: 'yielding', outcome: 'It works. You watch your child learn the rule in real time.', effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('aut_silence_transmitted') } },
    ],
    effect: null,
  },

  {
    id: 'aut_ft_neutrality_question',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('aut_treaty_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 40 &&
      !G.mem?.autFtNeutral,
    text: 'The country joins the European Union and the word neutrality starts appearing in quotation marks. You were at the radio in 1955 when it was the price of the last soldier leaving. Now it is a clause people argue about on television, and the arguing is a kind of luxury — the luxury of a country that has not had a foreign garrison in forty years and has forgotten what the clause bought.',
    choices: null,
    effect: (p) => {
      p.e += 5; p.m -= 2
      p.addFlag('aut_neutrality_defended')
      p.setMem('autFtNeutral', true)
    },
  },

  {
    id: 'aut_ft_gemeindebau_late',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('aut_gemeindebau_life') &&
      G.age >= 62 &&
      !G.mem?.autFtGemeinde,
    text: 'You have been in the courtyard longer than anyone. The families have turned over twice; the laundry room has been renovated twice; the tree that was planted when you arrived is now the thing people mean when they say the tree. Nobody in the building owns their flat and the building is in better repair than the private block across the street. You are aware this is an argument, and that you are living inside it rather than making it.',
    choices: null,
    effect: (p) => {
      p.m += 9; p.s += 3
      p.addFlag('aut_courtyard_elder')
      p.setMem('autFtGemeinde', true)
    },
  },

  {
    id: 'aut_ft_thursday_years_later',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('aut_thursday_demos') &&
      G.currentYear >= 2017 &&
      G.age >= 40 &&
      !G.mem?.autFtThursday,
    text: 'They are in government again and there is no Thursday demonstration, because the thing you were demonstrating against became the weather. You could start it up again. You know roughly who would come and how many that is. The arithmetic of it is the part that is hard to sit with — not that you were wrong, but that being right did not turn out to be the relevant variable.',
    choices: null,
    effect: (p) => {
      p.m -= 7; p.r += 5; p.e += 4
      p.addFlag('aut_protest_exhausted')
      p.setMem('autFtThursday', true)
    },
  },
]
