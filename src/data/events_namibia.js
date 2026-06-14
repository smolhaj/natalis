// Namibia depth arc events
// Covers: Herero/Nama genocide oral history, communal vs. commercial land divide,
// SWANLA contract labor legacy, AIDS epidemic 1995-2010, SWAPO liberation to patronage,
// the German "acknowledgment" 2021, diamond wealth contradiction, San displacement.

const NAMIBIA_EVENTS = [

  {
    id: 'nam_herero_oral_history',
    phase: 'childhood',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      (G.ethnicity === 'herero' || G.ethnicity === 'nama') &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.nam_herero_oral,
    text: (G) => {
      const eth = G.ethnicity === 'herero' ? 'Herero' : 'Nama'
      return `Your grandmother knows the story in the way she knows her hands — without having to look. The General — von Trotha — issued the Vernichtungsbefehl, the Extermination Order, in 1904. The ${eth} who did not die in the desert or the concentration camps had their land taken, their cattle taken, their name in the colonial register. The bones of your people were sent to German universities to prove theories that no one talks about now except as proof of what theories can make people do. Your grandmother is not old enough to have been there. But her grandmother was. The bone of it passes through the telling.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('nam_herero_memory_bearer'); p.setMem('nam_herero_oral', true); },
  },

  {
    id: 'nam_communal_land_divide',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.age >= 16 && G.age <= 30 &&
      G.ethnicity !== 'white_namibian' &&
      !G.mem?.nam_communal_land,
    text: 'The commercial farms begin at a fence. On one side: the communal area where you grew up, the land your family has used without title for generations, the grazing land that is too dry and too divided to sustain what it needs to sustain. On the other side: the white-owned commercial farms, fenced, producing for export, worked by the same families whose labor built them under a different administration. Independence came in 1990. The land did not change hands in the way independence usually changes things. The fence is still there. You have never been on the other side of it.',
    choices: [
      {
        text: 'You moved to Windhoek to find work.',
        tag: 'urban',
        outcome: 'The city is small enough to feel possible. The jobs are scarce enough to teach you quickly what possible means in practice.',
        effect: (p) => { p.e += 2; p.addFlag('nam_communal_land_lived'); p.addFlag('rural_to_urban'); p.setMem('nam_communal_land', true); },
      },
      {
        text: 'You stayed on the communal land.',
        tag: 'stayed',
        outcome: 'The land is yours in the way it has always been yours — in use, in knowledge, in relationship. The title deed is not yours. Whether those are the same thing is the question of your generation.',
        effect: (p) => { p.r += 4; p.addFlag('nam_communal_land_lived'); p.addFlag('stayed_in_village'); p.setMem('nam_communal_land', true); },
      },
    ],
  },

  {
    id: 'nam_aids_generation',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.currentYear >= 1995 && G.currentYear <= 2012 &&
      G.age >= 12 && G.age <= 22 &&
      !G.mem?.nam_aids,
    text: (G) => {
      const yr = G.currentYear
      return `In the late 1990s Namibia had one of the highest HIV rates in the world — one in five adults. By ${yr} the funerals have become a rhythm in the year. The school your teacher went to last month; the cousin who is sick in a particular way that everyone understands without the word being said; the condom distribution program at the clinic that arrives the same year the church says not to use them. You are the generation that grew up with this knowledge — that a specific kind of decision, at a specific moment, can determine what the rest of your life looks like. The knowledge is heavy and it is also clarifying.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 3; p.h -= 4; p.addFlag('nam_aids_generation_nam'); p.setMem('nam_aids', true); },
  },

  {
    id: 'nam_swapo_ruling_party',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.currentYear >= 2000 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.nam_swapo,
    text: 'SWAPO fought for independence and won. The liberation movement is now the ruling party and has been since 1990. In the communal areas, the SWAPO membership card is not only political allegiance — it is social infrastructure. The local SWAPO councillor is who you see about the water pump and the school roof and the employment recommendation. The party that freed the country also captured it. You understand the difference and cannot always afford to say it.',
    choices: [
      {
        text: 'You take the card. The practical calculation.',
        tag: 'member',
        outcome: 'The membership card does what it does. You keep separate your loyalty to the idea and your use of the structure.',
        effect: (p) => { p.m -= 3; p.w += 3; p.addFlag('nam_swapo_generation'); p.addFlag('regime_self_censorship'); p.setMem('nam_swapo', true); },
      },
      {
        text: 'You keep your distance from the party.',
        tag: 'outside',
        outcome: 'The distance costs some things and keeps some things. What you keep is harder to name than what you lost.',
        effect: (p) => { p.m -= 4; p.r += 4; p.karma += 3; p.addFlag('nam_swapo_generation'); p.setMem('nam_swapo', true); },
      },
    ],
  },

  {
    id: 'nam_german_apology_2021',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      G.ethnicity !== 'herero' && G.ethnicity !== 'nama' &&
      !G.mem?.nam_german_apology,
    text: 'May 2021. Germany formally acknowledges the Herero and Nama genocide of 1904–1908 — the first use of that word by the German government. The offer: 1.1 billion euros over thirty years for "acknowledgment and reconciliation." Not reparations — the German government is specific about the word. The Herero and Nama negotiating committees rejected the agreement; they were not consulted. The Namibian government accepted it. The word genocide is in the statement. Whether that is enough, or too little, or the wrong question — this depends on who you ask and which loss you are accounting for.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.addFlag('nam_german_apology_generation'); p.setMem('nam_german_apology', true); },
  },

  {
    id: 'nam_german_apology_herero_nama',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      (G.ethnicity === 'herero' || G.ethnicity === 'nama') &&
      !G.mem?.nam_german_apology,
    text: (G) => {
      const eth = G.ethnicity === 'herero' ? 'Herero' : 'Nama'
      return `May 2021. Germany acknowledges the genocide of the ${eth} and Nama peoples of 1904–1908. The formal word: genocide. The offer: 1.1 billion euros over thirty years, called "acknowledgment and reconciliation funds." Not reparations. The ${eth} Council of Chiefs rejected the agreement — their negotiating committee was not consulted. The Namibian government — which has more Ovambo members than Herero or Nama — accepted it. Your grandmother carries this in her body. The bones of her grandmother's generation were sent to German universities for skull measurements. Some have come back. Not all of them. The question of whether 1.1 billion euros is the right number for what was done to your people has no right answer. That it finally has a number is something. What it is worth is not agreed.`
    },
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 3; p.addFlag('nam_german_apology_generation'); p.addFlag('nam_herero_memory_bearer'); p.setMem('nam_german_apology', true); },
  },

  {
    id: 'nam_diamond_wealth',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.age >= 16 && G.age <= 32 &&
      !G.mem?.nam_diamond,
    text: 'The Sperrgebiet — the Forbidden Zone — runs two hundred kilometers along the southern coast. You cannot enter it without a permit. The diamonds are below the sand, in the ocean floor off the coast, in terraces where the Orange River meets the Atlantic. De Beers and the Namibian state share the proceeds through Namdeb. The country is one of the world\'s top diamond producers by value. The hospitals in your district are understaffed. These two facts are in the same country, which is something the economy textbooks call a resource curse and something the people who live in it call their life.',
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('nam_diamond_country'); p.setMem('nam_diamond', true); },
  },

  {
    id: 'nam_san_ancestral_land',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Namibia' &&
      G.ethnicity === 'san' &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.nam_san,
    text: 'The San have lived in this land since before any of the words that now apply to it — before Namibia, before South West Africa, before German South West Africa. The resettlement area you live in now came with boreholes and a school and a government ration. What it did not come with: the veldkos roots your grandmother knows by sight, the waterholes that are three days\' walk in a direction that is now fenced commercial farmland, the knowledge system that requires the land to be land and not a resettlement plot. You are learning English in school. Your grandmother\'s language has thirty-two speakers your age.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.addFlag('nam_san_displaced'); p.setMem('nam_san', true); },
  },

]

export default NAMIBIA_EVENTS
