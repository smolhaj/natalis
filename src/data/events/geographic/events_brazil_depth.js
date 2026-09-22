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

// `ruralUrban === 'rural'` was the whole of the geography in bra_dep_soy, and the
// only rural place Brazil has is br_rural — Rural Bahia (sertão), in the
// Northeast. So the one audience the event could ever reach was being told it
// lived in Mato Grosso. The sertão is caatinga, not the frontier; the frontier
// reaches it as an absence, in the people who leave for it.
import { hasTech } from '../../technology.js'

const ON_SOY_FRONTIER = (G) => {
  const r = G.place?.country === 'Brazil' ? (G.place?.region ?? '') : ''
  return /Centre-West|Central-West|North Brazil|Amazon|Mato Grosso|Pará|Tocantins/i.test(r)
}
const IN_SERTAO = (G) =>
  G.place?.country === 'Brazil' && (G.place?.region ?? '').includes('Northeast')

export const BRAZIL_DEPTH_EVENTS = [

  // ── CANDOMBLÉ AND SYNCRETIC FAITH ────────────────────────────────────────

  {
    id: 'bra_dep_candomble',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.age >= 6 && G.age <= 22 &&
      !G.mem?.braDepCandomble,
    text: () => pick([
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      // The trio elétrico is a 1950 invention and the Sambódromo opened in
      // March 1984; unguarded, this was parading down both in 1948.
      G.currentYear >= 1950 &&
      G.age >= 12 && G.age <= 35 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.braDepCarnaval,
    text: (G) => {
      const sambodromo = G.currentYear >= 1984
      const televised = hasTech(G.currentCountry ?? G.character.country, 'television', G.currentYear)
      return pick([
        sambodromo
          ? 'Carnaval is not the same thing from inside the morro and from outside it. The Sambódromo is the television version. The morro has its own escolas de samba, its own enredos, the specific months of ensaio in the quadra. The bateria starts in October. By February the whole hill knows the samba-enredo by heart. You have known by heart the story of the slave rebellion or the quilombo or the orixá or the Amazon that the escola chose this year. When the escola enters the Sambódromo you know that the people who made it will not appear in the television coverage of the people who made it.'
          : 'Carnaval is not the same thing from inside the morro and from outside it. The parade on the avenue is the version that gets photographed. The morro has its own escolas de samba, its own enredos, the specific months of ensaio in the quadra. The bateria starts in October. By February the whole hill knows the samba-enredo by heart. You have known by heart the story of the slave rebellion or the quilombo or the orixá or the Amazon that the escola chose this year. When the escola comes down off the hill you know that the people who made it will not be named in anybody\'s account of it.',
        televised
          ? 'The blocos de rua are the carnaval before the television carnaval: the band in the street, the truck of instruments, the crowd that expands to fill whatever street it finds itself in. In Salvador the trio elétrico carries the music on a truck and the crowd follows. In Recife the frevo is specific to the streets of Olinda in a way that cannot be exported. The carnaval that is sold to tourists is made from the carnaval that belongs to someone, which is still there behind the tourist version.'
          : 'The blocos de rua are the carnaval nobody writes about: the band in the street, the truck of instruments, the crowd that expands to fill whatever street it finds itself in. In Salvador the trio elétrico carries the music on a truck and the crowd follows. In Recife the frevo is specific to the streets of Olinda in a way that cannot be exported. The carnaval that is sold to visitors is made from the carnaval that belongs to someone, which is still there behind the version for sale.',
      ])
    },
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
    phase: null,
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
    phase: null,
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
    phase: null,
    weight: 3,
    // "You are from one of these communities" is the event, not a detail in it,
    // and with no ethnicity in the guard it was being said to white paulistanos.
    // Brazil's roster has no quilombola id; Afro-Brazilian and rural is the
    // closest honest read, and it is where the communities and the titling are.
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      (G.currentCountry?.name ?? 'Brazil') === 'Brazil' &&
      G.ethnicity === 'black_brazilian' &&
      G.ruralUrban === 'rural' &&
      // The 1988 article existed from 1988; the first title was issued in 1995,
      // which is when "the title is under review" starts being a true sentence.
      G.currentYear >= 1995 &&
      G.age >= 6 && G.age <= 25 &&
      !G.mem?.braDepQuilombo,
    text: 'The quilombo was what the enslaved built when they got out of the senzala, and your community is one, and has been for three hundred years. Palmares was the largest: thirty thousand people, forty years of it, finished in 1694. Since 1988 the constitution says the land of a quilombo belongs collectively to the people who have always been on it. The title is under review, and under review is a condition rather than a stage: INCRA has no money for the surveys, the Palmares foundation has no money for the certificates, and the bancada ruralista in Brasília has no reason to hurry. Thousands of communities; fewer than three hundred with the paper in hand.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1990 &&
      G.age >= 20 &&
      G.ruralUrban === 'rural' &&
      G.place?.type === 'rural' &&
      (ON_SOY_FRONTIER(G) || IN_SERTAO(G)) &&
      !G.mem?.braDepSoy,
    text: (G) => ON_SOY_FRONTIER(G)
      ? pick([
        'The cerrado is being converted to soy at a rate that satellite photos make visible from space. The soy goes to China: Brazilian soy feeds Chinese pigs. The fazendeiro who plants soy in what was cerrado three years ago employs fewer workers per hectare than any other crop and more machinery per hectare than almost any other. You are on the agricultural frontier, where the forest is the thing that is converted into money before it disappears.',
        'The logging road comes first. Then the cattle, clearing the brush. Then the soy, planted in what the cattle cleared. This is the sequence: each step makes the next step easier and more profitable. The forest does not come back in the same generation. The carbon it was holding is in the air over the road.',
      ])
      : pick([
        'The soy is not here. Here is caatinga, the roçado, the goats, and whatever the rain decides in January. The soy is in the far west of the state, where the land is flat and the gaúchos came down from the south and bought it in blocks of a thousand hectares, and it is in Mato Grosso, where your cousin went. The men leave after a harvest that failed and come back in December with money, a telephone, and a way of saying the word hectare. The bus goes when it is full.',
        'A man from Salvador has been asking in the cartório about the fundo de pasto — the grazing everyone has always used because everyone has always used it, which turns out not to be the same as a registered title. Nobody here signed anything. Out west they are putting in the pivots that turn all night, and the price of land has walked east along the road towards you, and this is what it looks like when it arrives: a man with a folder, asking polite questions in the town hall.',
      ]),
    choices: [
      {
        text: (G) => ON_SOY_FRONTIER(G)
          ? 'The frontier economy is real employment. Your family works the agronegócio.'
          : 'You go west for the season, with the others.',
        tag: null,
        outcome: (G) => ON_SOY_FRONTIER(G)
          ? 'The employment is real. The frontier moves. When it moves past your area the employment structure changes, and the land that was forest is soy until the soil is finished.'
          : 'The farm is the size of your municipality and you never meet the man who owns it. You come back in December with money that lasts until the rain does not come, and then you go again. Your mother counts the year by who is in the house at Christmas.',
        effect: (p) => {
          p.w += 3
          p.addFlag('bra_soy_generation')
          p.setMem('braDepSoy', true)
        },
      },
      {
        text: (G) => ON_SOY_FRONTIER(G)
          ? 'The cerrado was the water that fed the rivers that fed the cities downstream.'
          : 'You stay, and you watch the road.',
        tag: null,
        outcome: (G) => ON_SOY_FRONTIER(G)
          ? 'The cerrado holds water in root systems that go down further than the trees go up. The cities on the rivers that start in it are beginning to find this out. The science and the price of soy operate on different timescales.'
          : 'The ones who go come back with more than they left with and less patience for the place. The ones who stay get older alongside the village. Neither of these is a decision anybody announces.',
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
