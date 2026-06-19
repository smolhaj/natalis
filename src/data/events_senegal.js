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

  // ── MOROCCO TRANSIT ROUTE ────────────────────────────────────────────────

  {
    id: 'sen_morocco_route',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_SENEGAL(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 32 &&
      !G.mem.senBarca &&
      !G.mem.senMoroccoRoute,
    text: 'The land route: overland to Mali, then north through Algeria to the Moroccan border at Oujda. The journey takes two to four months — the money for buses and trucks and the men who move you across checkpoints in the dark. The bus is full of people from Senegal, Guinea, Mali, Niger, making the same calculation. The route is not safe. It is also documented, negotiable, survivable, which the Atlantic at night sometimes is not.',
    choices: [
      {
        text: 'Take the overland route north.',
        tag: null,
        outcome: 'You reach Morocco. The Moroccan police at Oujda find you on a road at dawn and put you on a bus back to the Algerian border. You cross back. You try again two weeks later. The third time you make it to Nador.',
        effect: (p) => { p.m -= 14; p.h -= 6; p.mo -= 800; p.addFlag('sen_morocco_transit'); p.setMem('senMoroccoRoute', true); },
      },
      {
        text: 'The Canary Islands route is faster. You know someone with a boat.',
        tag: null,
        outcome: 'You take the Atlantic instead. The boat is a pirogue, not built for nine hundred kilometres. Seven days on the water with thirty-eight people.',
        effect: (p) => { p.m -= 20; p.h -= 12; p.addFlag('emigrated'); p.setResidency('undocumented'); p.setMem('senMoroccoRoute', true); p.setMem('senBarca', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sen_nador_forest',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('sen_morocco_transit') &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      !G.mem.senNadorForest,
    text: 'The camp is in the forest above Nador, two kilometres from the fence at Melilla. A hundred people, sometimes three hundred, from Senegal, Guinea, Cameroon, Niger — sleeping under plastic sheeting and cooking on fires. Moroccan police come periodically; the camp is dismantled and rebuilt. Some people have been here eight months. A man from Conakry has been here fourteen months. The fence is visible from the high ground: six metres of steel mesh, razor wire on top, a second fence inside. Spanish police on the other side, Moroccan police on yours. You wait for a night when enough people are ready to go at once.',
    choices: [
      {
        text: 'Wait. The mass attempt requires enough people.',
        tag: null,
        outcome: 'You wait three more months. The attempt is set for a night in November when two hundred people run the fence together. The logic: too many bodies for the guards to stop all of them.',
        effect: (p) => { p.m -= 16; p.h -= 8; p.addFlag('sen_melilla_attempt'); p.setMem('senNadorForest', true); },
      },
      {
        text: 'Go back. You have been here long enough.',
        tag: null,
        outcome: 'You turn south. The journey home costs what the journey here cost. Arriving back is not the same as not having left.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.r += 6; p.setMem('senNadorForest', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sen_melilla_fence',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('sen_melilla_attempt') &&
      !G.mem.senMelillaFence,
    text: 'Two hundred people run out of the forest at three in the morning. The sound is not silence and not chaos — it is the sound of people who have agreed to do something that may not work. You get to the outer fence and start climbing. The razor wire opens your hands and your legs. Above you, people are going over. Below, people are falling. The Spanish civil guard is on the other side with rubber bullets. The Moroccan auxiliaries are behind you with batons. You are at the top of the fence.',
    choices: [
      {
        text: 'Go over.',
        tag: null,
        outcome: 'You reach Spanish territory. You are bleeding from both hands and your left leg. Spain is legally required to process you. You know this because someone in the forest camp told you. You hold this information like a key.',
        effect: (p) => { p.m -= 15; p.h -= 10; p.addFlag('emigrated'); p.addFlag('sen_made_europe'); p.setResidency('asylum_seeker'); p.setMem('senMelillaFence', true); },
      },
      {
        text: 'You are knocked down before you reach the top.',
        tag: null,
        outcome: 'A baton catches you at the waist and you fall. You are loaded onto a bus and taken back to Oujda. Six weeks later, you try again.',
        effect: (p) => { p.m -= 18; p.h -= 12; p.addFlag('sen_fence_pushback'); p.setMem('senMelillaFence', true); },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGHS ──────────────────────────────────────────────────────

  {
    id: 'sen_fence_pushback_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sen_fence_pushback') &&
      G.age >= 30 &&
      !G.mem.senFencePushbackEcho,
    text: 'The European Court of Human Rights rules in 2020 that Spain\'s policy of "immediate return" at Melilla and Ceuta violates the prohibition on collective expulsion. The ruling comes years after the night you fell from the fence. What happened to you had a name, a legal category, a judgment. The judges in Strasbourg decided it was wrong. You are not sure what to do with that.',
    choices: null,
    effect: (p) => { p.r += 4; p.karma += 3; p.setMem('senFencePushbackEcho', true); },
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
