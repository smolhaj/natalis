// events_brazil_depth.js
// Brazil depth arc — texture not in events_brazil.js.
// events_brazil.js covers: favela childhood, AI-5 dictatorship, amnesty 1979,
// Diretas Já 1984, bala perdida, racial democracy myth, Chico Mendes/Amazon,
// Copa protests 2013, Carandiru 1992, Bolsonaro/COVID 700k, hyperinflation/
// Plano Real, nordestino migration, Lula 2002.
// This file: Candomblé/syncretic faith, carnival in the morro, MST landless
// workers, baile funk, Operation Lava Jato, the Amazon city of Belém,
// quilombola communities, the soy frontier.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const BRAZIL_DEPTH_EVENTS = [

  // ── CANDOMBLÉ AND SYNCRETIC FAITH ────────────────────────────────────────

  {
    id: 'bra_dep_candomble',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.age >= 6 && G.age <= 22 &&
      !G.mem?.braDepCandomble,
    text: pick([
      'The terreiro is in the building behind your aunt\'s house, or three blocks from your school, or deep in the bairro where the floor is always swept. Candomblé came from Yoruba and Fon and Bantu traditions, brought by enslaved people who hid the orixás behind Catholic saints. Oxum is Our Lady of Conception. Xangô is Saint Jerome. The double identity is not hypocrisy — it is strategy that became theology. The celebration of the orixás is not separate from the rest of Brazilian religious life. It is inside it.',
      'The Catholic saint on the altar and the orixá in the same devotion: this is not a contradiction in the Brazil you grew up in. It is the syncresis that four hundred years of Catholic pressure and African resistance produced. Your grandmother keeps both. She explains neither. The coexistence is the explanation.',
    ]),
    choices: null,
    effect: (p) => {
      p.m += 4
      p.s += 2
      p.addFlag('bra_candomble_generation')
      p.setMem('braDepCandomble', true)
    },
  },

  // ── CARNAVAL IN THE MORRO ─────────────────────────────────────────────────

  {
    id: 'bra_dep_carnaval',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.age >= 12 && G.age <= 35 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.braDepCarnaval,
    text: pick([
      'Carnaval is not the same thing from inside the morro and from outside it. The Sambódromo is the television version. The morro has its own escolas de samba, its own enredos, the specific months of ensaio in the quadra. The bateria starts in October. By February the whole hill knows the samba-enredo by heart. You have known by heart the story of the slave rebellion or the quilombo or the orixá or the Amazon that the escola chose this year. When the escola enters the Sambódromo you know that the people who made it will not appear in the television coverage of the people who made it.',
      'The blocos de rua are the carnaval before the television carnaval: the band in the street, the truck of instruments, the crowd that expands to fill whatever street it finds itself in. In Salvador the trio elétrico carries the music on a truck and the crowd follows. In Recife the frevo is specific to the streets of Olinda in a way that cannot be exported. The carnaval that is sold to tourists is made from the carnaval that belongs to someone, which is still there behind the tourist version.',
    ]),
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 4
      p.addFlag('bra_carnaval_generation')
      p.setMem('braDepCarnaval', true)
    },
  },

  // ── MST LANDLESS WORKERS ──────────────────────────────────────────────────

  {
    id: 'bra_dep_mst',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1985 &&
      G.age >= 16 &&
      G.ruralUrban === 'rural' &&
      G.stats.wealth < 45 &&
      !G.mem?.braDepMST,
    text: 'The MST — Movimento dos Trabalhadores Rurais Sem Terra — organizes occupations of unproductive land under the constitutional provision that land must fulfill its social function. The encampment is a specific structure: the plastic tarp city that appears overnight on land that belongs, in paper and in practice, to someone who uses it for cattle or leaves it fallow for tax purposes. The encampment has a school, a health post, a system of governance. The police come at some point or they don\'t. If you are still on the land after the legal challenge concludes, there is a chance the federal government will give you a title.',
    choices: [
      {
        text: 'You join the occupation. The land is unused and you need it.',
        tag: null,
        outcome: 'The plastic tarp goes up at night. You have built the school. The legal process takes three years. At the end of three years you have a title or you have moved to another occupation. The movement continues regardless.',
        effect: (p) => {
          p.m -= 5
          p.karma += 8
          p.addFlag('bra_mst_generation')
          p.addFlag('activist')
          p.setMem('braDepMST', true)
        },
      },
      {
        text: 'The occupation is risky — the fazendeiros have gunmen and the police are unreliable.',
        tag: null,
        outcome: 'The risk is real. The MST has buried hundreds of members in thirty years. You work the land you have and watch the occupations from a distance. The distance is also a position.',
        effect: (p) => {
          p.r += 4
          p.addFlag('bra_mst_generation')
          p.setMem('braDepMST', true)
        },
      },
    ],
    effect: null,
  },

  // ── BAILE FUNK ────────────────────────────────────────────────────────────

  {
    id: 'bra_dep_baile_funk',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1990 &&
      G.age >= 12 && G.age <= 25 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.braDepFunk,
    text: 'The baile funk in the community on Saturday night. Miami bass arrived in Rio in the 1980s on pirate cassettes from DJs who found it in the imports at the port. By the 1990s it had become something entirely its own: the MC, the proibidão that names the faction, the berimbau sample, the dance that the middle-class media covered as a crime. The baile is not in the newspaper crime section because it is violent. It is in the crime section because of where it is and whose music it is. The music crossed out of the morro in the 2000s into the mainstream and the mainstream discovered it had been there the whole time.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 3
      p.addFlag('bra_funk_generation')
      p.setMem('braDepFunk', true)
    },
  },

  // ── OPERATION LAVA JATO ───────────────────────────────────────────────────

  {
    id: 'bra_dep_lava_jato',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2014 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.braDepLavaJato,
    text: 'Operation Lava Jato — Car Wash — begins as a money-laundering investigation in Curitiba and expands into the largest corruption prosecution in Brazilian history: Petrobras, the construction companies, the politicians across every party. Lula is arrested and imprisoned and later has his convictions annulled because the judge, Sérgio Moro, was communicating with prosecutors and then joined Bolsonaro\'s cabinet. The corruption was real. The process was partial. The left says Lava Jato was a coup; the right says the left is protecting criminals. The evidence for both positions is in the same public record.',
    choices: [
      {
        text: 'The corruption is the point — the system had to be investigated regardless of who runs it',
        tag: null,
        outcome: 'The corruption is in the public record. The irregularities in the prosecution are also in the public record. Holding both positions does not protect either the corrupt or the prosecutors.',
        effect: (p) => {
          p.r += 4
          p.e += 3
          p.addFlag('bra_lava_jato_generation')
          p.setMem('braDepLavaJato', true)
        },
      },
      {
        text: 'Lava Jato was weaponized against the left specifically — the judge became a minister',
        tag: null,
        outcome: 'Moro\'s communication with prosecutors, revealed in 2019, showed coordination rather than independence. The Supreme Court annulled Lula\'s convictions. The corruption cases against other politicians continued. The selective application is part of the evidence.',
        effect: (p) => {
          p.r += 4
          p.e += 3
          p.addFlag('bra_lava_jato_generation')
          p.setPolitical('left')
          p.setMem('braDepLavaJato', true)
        },
      },
    ],
    effect: null,
  },

  // ── BELÉM AND THE AMAZON CITY ─────────────────────────────────────────────

  {
    id: 'bra_dep_belem',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1960 &&
      G.age >= 14 &&
      !G.mem?.braDepBelem,
    text: 'Belém: the city at the mouth of the Amazon. The Ver-o-Peso market on the waterfront — the scale, the fish that came from rivers eight hundred kilometres away, the cupuaçu and açaí and bacaba from the forest. The afternoon rain that comes at 2pm every day and lasts an hour and then stops. The heat that is not dry heat — it is heat with water in it. The Amazon is the world\'s largest river system and Belém is the city that was built at the point where it becomes the sea. The specific texture of the city is the texture of the forest economy: rubber, Brazil nuts, fish, the cassava that is the food of the region. The forest is the fact around which everything else arranges.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 2
      p.addFlag('bra_amazon_city_generation')
      p.setMem('braDepBelem', true)
    },
  },

  // ── QUILOMBOLA COMMUNITIES ────────────────────────────────────────────────

  {
    id: 'bra_dep_quilombo',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1988 &&
      G.age >= 6 && G.age <= 25 &&
      !G.mem?.braDepQuilombo,
    text: 'The quilombo was the community the enslaved built when they escaped the senzala. Palmares, the largest: 30,000 people, forty years of resistance, destroyed in 1694. The 1988 Constitution recognizes quilombola communities as having collective land rights over the territory they have historically occupied. Titling is slow and contested: the rural landowners\' lobby blocks the process in Congress; FUNAI and INCRA are underfunded. Thousands of quilombola communities exist; fewer than three hundred have full title. You are from one of these communities. The title is under review. The land has been yours for three hundred years.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 5
      p.addFlag('bra_quilombola_generation')
      p.setMem('braDepQuilombo', true)
    },
  },

  // ── SOY FRONTIER ─────────────────────────────────────────────────────────

  {
    id: 'bra_dep_soy',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1990 &&
      G.age >= 20 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.braDepSoy,
    text: pick([
      'The cerrado is being converted to soy at a rate that satellite photos make visible from space. The soy goes to China: Brazilian soy feeds Chinese pigs. The fazendeiro who plants soy in what was cerrado three years ago employs fewer workers per hectare than any other crop and more machinery per hectare than almost any other. You are on the agricultural frontier — Mato Grosso, Pará, the transitional zone — where the forest is the thing that is converted into money before it disappears.',
      'The logging road comes first. Then the cattle, clearing the brush. Then the soy, planted in what the cattle cleared. This is the sequence of deforestation: each step makes the next step easier and more profitable. The forest does not come back in the same generation. The carbon it was holding is in the atmosphere. The global temperature is the ledger that records it.',
    ]),
    choices: [
      {
        text: 'The frontier economy is real employment — your family works the agronegócio',
        tag: null,
        outcome: 'The employment is real. The frontier moves. When the frontier moves past your area, the employment structure changes. The land that was forest is now soy and will be soy until the soil degrades.',
        effect: (p) => {
          p.w += 3
          p.addFlag('bra_soy_generation')
          p.setMem('braDepSoy', true)
        },
      },
      {
        text: 'The cerrado was the water that fed the rivers that fed the cities downstream',
        tag: null,
        outcome: 'The cerrado stores more water in its deep root systems than any other ecosystem. The cities that depend on rivers that originate in the cerrado are beginning to experience the consequences. The science is clear and the political economy of soy is also clear and the two operate in different timescales.',
        effect: (p) => {
          p.e += 3
          p.r += 3
          p.addFlag('bra_soy_generation')
          p.setMem('braDepSoy', true)
        },
      },
    ],
    effect: null,
  },

]
