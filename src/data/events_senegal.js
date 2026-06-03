// BUILD 55 — Senegal arc (BUILD 14: West Africa depth)
// Mouride brotherhood: largest Sufi order in West Africa, own city (Touba), own economy.
// Marabout-talibé relationship: spiritual authority that exceeds state authority daily.
// Teranga: hospitality as lived obligation, not performance.
// Young men on wooden boats to the Canary Islands — the Barca Walla Barsakh route.
// Dakar as West African intellectual hub: FESPACO, Gorée, Leopold Sédar Senghor.

const IS_SENEGAL = (G) => G.character.country?.name === 'Senegal'

export const SENEGAL_EVENTS = [

  {
    id: 'sen_magal_touba',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_SENEGAL(G) && G.religion === 'muslim_sufi' && G.age >= 16 && !G.mem.senMagal,
    text: 'The Grand Magal: three million people converging on Touba in two days. You travel with your uncle\'s family on a sept-place that should hold seven and holds eleven. The city has no police — the brotherhood manages its own order. The tomb of Cheikh Amadou Bamba is inside the Great Mosque. The specific feeling of arriving at a place where the authority structure of the Senegalese state simply does not apply.',
    effect: (p) => { p.m += 12; p.addFlag('mouride_member'); p.setMem('senMagal', true) },
  },

  {
    id: 'sen_marabout_authority',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_SENEGAL(G) && G.flags.has('mouride_member') && G.age >= 30 && !G.mem.senMarabout,
    text: 'Your marabout has advised against the business partnership. He has not explained why. You have known him since childhood; his father knew your father. The partnership would double your income in two years, on conservative numbers. You sit with the advice and the numbers for a week. In the end you do not take the partnership. Six months later your would-be partner is in a dispute with the tax authority that would have consumed you both.',
    choices: [
      {
        text: 'Your faith in him is confirmed.',
        tag: 'confirmed',
        outcome: 'The specific relief of having trusted something that cannot be explained. You do not try to explain it to your secular friends in Dakar.',
        effect: (p) => { p.m += 8; p.karma += 5; p.setMem('senMarabout', true) },
      },
      {
        text: 'The outcome was luck, not guidance.',
        tag: 'sceptical',
        outcome: 'You are grateful and unconvinced simultaneously. The system works — statistically, or through community intelligence the marabout accumulates — even if the mechanism is not what it claims to be.',
        effect: (p) => { p.m += 4; p.setMem('senMarabout', true) },
      },
    ],
  },

  {
    id: 'sen_diaspora_dahira',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('mouride_member') && G.flags.has('emigrated') && G.age >= 22 && G.age <= 40 && !G.mem.senDiaspora,
    text: 'The dahira meets every two weeks in an apartment in the Bronx, or Marseille, or Milan. It is a savings circle and a prayer group and a mutual aid network and a connection to Touba that does not require being in Touba. You contribute a fixed amount each meeting. The community pools it and sends a portion to the brotherhood, and keeps a portion for members in difficulty. The state doesn\'t know it exists. It doesn\'t need to.',
    effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('diaspora_community_built'); p.setMem('senDiaspora', true) },
  },

  {
    id: 'sen_barca_walla',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_SENEGAL(G) && G.age >= 18 && G.age <= 30 && G.stats.wealth <= 3 && !G.mem.senBarca,
    text: 'Barca Walla Barsakh — Barcelona or the Afterlife. The boats leave from Saint-Louis or Ziguinchor at night for the Canary Islands, nine hundred kilometres on the open Atlantic in a pirogue. The crossing takes five to eight days if the sea permits. Two thousand kilometres of documented deaths since 2005; the actual number is higher. A cousin left in March. You heard from him in September. Not everyone\'s cousin arrives.',
    choices: [
      {
        text: 'Attempt the crossing.',
        tag: 'crossed',
        outcome: 'Seven days. You arrive in Tenerife. The Spanish Red Cross gives you a foil blanket. You give them a false name because you heard it goes better that way.',
        effect: (p) => { p.m -= 18; p.h -= 10; p.addFlag('emigrated'); p.setResidency('undocumented'); p.setMem('senBarca', true) },
      },
      {
        text: 'Stay. Build something here.',
        tag: 'stayed',
        outcome: 'You watch more of your generation leave each year. The city empties in a direction it does not refill. You build on what remains.',
        effect: (p) => { p.m -= 6; p.addFlag('stayed_behind'); p.setMem('senBarca', true) },
      },
    ],
  },

  {
    id: 'sen_gorée_school',
    phase: 'childhood',
    weight: 3,
    when: (G) => IS_SENEGAL(G) && G.currentYear >= 1950 && G.currentYear <= 1980 && G.stats.smarts >= 55 && G.age >= 10 && !G.mem.senGoree,
    text: 'The William Ponty school, or its successor, or the system it became: the best-educated generation in West Africa, trained in French, shaped by Senghor\'s Négritude. You read French poetry and write essays on African philosophy in a language that is not African. The contradiction is the education. You graduate with tools that open doors in Paris and in Dakar, and a specific ambivalence about who those tools were made for.',
    effect: (p) => { p.m += 5; p.e += 4; p.addFlag('francophone_educated'); p.setMem('senGoree', true) },
  },
]
