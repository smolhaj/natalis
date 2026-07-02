// Cameroon depth arc events
// Covers: oil economy without transformation, Boko Haram far north raids,
// Yaoundé political capital texture, Lions Indomptables 1990 World Cup,
// Kondengui arbitrary detention, Ahidjo era and UPC suppression,
// Anglophone ghost town Mondays, Cameroonian bushfaller diaspora

const IS_CAMEROONIAN = (G) => G.character.country?.name === 'Cameroon'
const IS_ANGLOPHONE = (G) =>
  G.ethnicity === 'anglophone_northwest' || G.ethnicity === 'anglophone_southwest'

export const CAMEROON_DEPTH_EVENTS = [

  {
    id: 'cmr_dep_oil',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1978 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.has('cmr_oil_generation'),
    text: (G) => {
      const yr = G.currentYear
      const context = yr <= 1990
        ? 'Offshore oil was found in 1977. The SNH — the national oil company — is pumping. The revenues are entering the state.'
        : 'The oil revenues that came in the 1980s funded some things and disappeared into other things. The price fell in 1985. Cameroon went into structural adjustment in 1988. The oil was real. The transformation was not.'
      return `${context} The economics of an oil state follow a pattern: the resource comes before the institutions that would manage it well, and the institutions that exist reshape themselves around the resource rather than around the population. You learn this not as an economic theory but as the specific fact of which departments get new buildings and which hospitals still use 1960s equipment. Cameroon did not become Nigeria. Cameroon did not become Gabon. Cameroon became itself, with oil added.`
    },
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.addFlag('cmr_oil_generation') },
  },

  {
    id: 'cmr_dep_boko_north',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 2014 &&
      (G.religion === 'muslim_sunni' || G.religion === 'muslim_other') &&
      G.age >= 20 &&
      !G.flags.has('cmr_boko_north_witness'),
    text: 'Boko Haram crossed from Nigeria in 2014. The far north of Cameroon — Maroua, the Lake Chad basin, the Mandara mountains — received what the northeastern Nigerian border had been sending. The raids come at night. They take young men and sometimes young women. They destroy what they cannot use. The Cameroonian army is present and understaffed. The multinational joint task force coordinates across the borders in theory. In practice, you know which villages have been hit and which ones have not yet been hit, and the logic of the sequence is not legible from the outside.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('cmr_boko_north_witness') },
  },

  {
    id: 'cmr_dep_yaounde',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.has('cmr_yaounde_generation'),
    text: 'Yaoundé is not the economic city — that is Douala, four hours west. Yaoundé is the political city: the presidency on the hill, the ministries radiating from the centre, the roads that are better near the presidency and worse toward the periphery. The Beti have governed since 1982 and the city has their texture in its senior civil servants and its social calendar. The University of Yaoundé produces graduates who wait for government jobs that do not appear fast enough. The city is clean where the cameras are and other things where they are not. You learn early that the hill and the foot of the hill are separated by a distance shorter than it looks on the map.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.addFlag('cmr_yaounde_generation') },
  },

  {
    id: 'cmr_dep_lions',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1990 &&
      G.age >= 7 && G.age <= 16 &&
      !G.flags.has('cmr_lions_generation'),
    text: (G) => {
      const yr = G.currentYear
      const reference = yr <= 1994
        ? '1990: the Lions Indomptables beat Argentina in the opening game of the World Cup. Roger Milla was thirty-eight years old and came off the bench to score and dance at the corner flag. Cameroon reached the quarter-finals. For a week the country was unified by a thing that had no connection to the president or the constitution or the language divide. You were watching. The corner flag dance went into your body before you were old enough to analyze it.'
        : 'Roger Milla\'s corner flag dance in 1990 is something you know as history by now, but it is also something that older people in your life lived as live television, and the way they describe it — the quality of their attention — is itself a kind of inheritance. The Lions did something in Italy in 1990 that made a country feel like a single thing.'
      return reference
    },
    choices: null,
    effect: (p) => { p.m += 6; p.s += 2; p.addFlag('cmr_lions_generation') },
  },

  {
    id: 'cmr_dep_kondengui',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1985 &&
      G.age >= 25 &&
      !G.flags.has('cmr_kondengui_witness'),
    text: 'Kondengui Central Prison in Yaoundé was built for 1,500 prisoners and holds six to ten thousand, depending on the year. People arrive at Kondengui without charge, without trial date, without lawyer. The provisional detention stretches. It stretches into years. You know someone who went in for a matter that should have been resolved in six months and did not come out for four years, having been tried, eventually, and acquitted. Acquitted. The acquittal came four years later. In Cameroon this is described as the justice system working. It is, in a sense, the justice system working.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('cmr_kondengui_witness') },
  },

  {
    id: 'cmr_dep_ahidjo',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1982 &&
      G.age >= 8 &&
      !G.flags.has('cmr_ahidjo_era'),
    text: (G) => {
      const yr = G.currentYear
      const context = yr <= 1970
        ? 'Ahmadou Ahidjo became Cameroon\'s first president at independence in 1960. He is from the Fulani Muslim north. The French supported him because he was manageable and because the alternatives — especially the UPC, the leftist independence movement — were not. The UPC was declared illegal in 1955, five years before independence. Its leaders were hunted. Felix Moumié was poisoned in Geneva in 1960.'
        : 'Ahidjo has been president since independence. The single-party state runs on the networks he built from the north and the institutions he kept from the French. The photograph in the school is his photograph. The form requires the party name. The party has one name.'
      return context
    },
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.addFlag('cmr_ahidjo_era') },
  },

  {
    id: 'cmr_dep_ghost_town',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      IS_ANGLOPHONE(G) &&
      G.currentYear >= 2018 &&
      G.age >= 20 &&
      !G.flags.has('cmr_ghost_town_generation'),
    text: 'Every Monday is a ghost town. This is what the Amba Boys declared in 2017 and it has continued since: on Mondays no business opens, no school operates, no market functions in the Anglophone regions. Compliance is enforced by the armed groups; the compliance is also partly genuine; separating the coercion from the solidarity is something you do carefully and do not always resolve clearly. The government says people are being terrorized. Some people are being terrorized. Some people close their shops on Monday because the Monday closing is the only form of protest available to them that does not require a weapon. Monday is the answer to the question: what can you do?',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('cmr_ghost_town_generation') },
  },

  {
    id: 'cmr_dep_bushfaller',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1990 &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.has('cmr_bushfaller_generation'),
    text: 'The word is "bushfaller" — to fall in the bush, which means to go abroad, which means to go to France or Germany or the United States and send money home and return with a different posture. The bushfaller is both a success story and an evidence of what stays unavailable at home. Your cousin is a bushfaller. Your neighbor\'s son is a bushfaller. The family WhatsApp group has a different section of contacts for the ones in the diaspora. They know what things cost here in a way that reveals they no longer know what things cost here. They send money. The money is the relationship and also the complication.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 2; p.addFlag('cmr_bushfaller_generation') },
  },

]
