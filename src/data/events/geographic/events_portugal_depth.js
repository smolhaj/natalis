// events_portugal_depth.js — Portugal depth arc

export const PORTUGAL_DEPTH_EVENTS = [

  // ── PIDE INTERROGATION ────────────────────────────────────────────────────

  {
    id: 'pt_dep_pide_interrogation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1945 && G.currentYear <= 1974 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.ptPide,
    text: 'The PIDE summons arrives. Not an arrest — a "request for clarification" about your associations, about the meeting at your friend\'s house, about the pamphlet someone said you distributed. The PIDE office: the bureaucratic courtesy of a state that has not admitted it is a police state. You are asked questions whose correct answers you already know. The wrong answer is the true one. You give the correct answer and live with what that means. Your friend, who gave a different answer, does not come home.',
    choices: [
      {
        text: 'You give the correct answers — the ones that protect you',
        tag: null,
        outcome: 'The PIDE officer writes something down. You are released. Your friend is not. The distinction between the answer that saved you and the answer that would have been honest is the distinction you will spend the next decade of your life with.',
        effect: (p) => { p.r += 9; p.m -= 5; p.addFlag('pt_pide_generation'); p.setMem('ptPide', true) },
      },
      {
        text: 'You refuse to inform — they keep you for three days',
        tag: null,
        outcome: 'Three days in Caxias. The specific architecture of the Estado Novo\'s patience: they do not need to break you today. They have forty-eight years and the architecture is designed for that duration.',
        effect: (p) => { p.r += 6; p.m -= 8; p.h -= 5; p.karma += 6; p.addFlag('pt_pide_generation'); p.setMem('ptPide', true) },
      },
    ],
    effect: null,
  },

  // ── A SALTO — CLANDESTINE EMIGRATION ─────────────────────────────────────

  {
    id: 'pt_dep_a_salto',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1960 && G.currentYear <= 1974 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.ptASalto,
    text: 'A salto: the jump. The clandestine border crossing to Spain and then France, by night, on foot across the mountains near Melgaço or Vila Verde, guided by someone who has done this before. The choice is between this and the military call-up for Angola or Guinea-Bissau — three to four years of colonial war the rest of the world has already condemned. Hundreds of thousands of men make this crossing. The Estado Novo says this is desertion. The men who make it say it is arithmetic: the factory in Paris pays more in a month than the farm in Trás-os-Montes pays in a year.',
    choices: [
      {
        text: 'You cross — Paris, the Renault factory, the bidonville at Champigny',
        tag: null,
        outcome: 'The bidonville at Champigny-sur-Marne: thousands of Portuguese in corrugated-iron shacks on the outskirts of Paris. You send money home. You do not speak French for the first two years. France is the Atlantic crossing your grandparents never made.',
        effect: (p) => { p.w += 6; p.m -= 4; p.addFlag('pt_clandestine_emigrant_france'); p.setMem('ptASalto', true) },
      },
      {
        text: 'You stay — you do not trust the mountains at night',
        tag: null,
        outcome: 'Your draft notice arrives three months later. The crossing you did not make is the road you did not take, and you will think about it on specific evenings in Angola.',
        effect: (p) => { p.r += 5; p.setMem('ptASalto', true) },
      },
    ],
    effect: null,
  },

  // ── PREC / ALENTEJO LAND REFORM 1975 ────────────────────────────────────

  {
    id: 'pt_dep_prec_alentejo',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1975 && G.currentYear <= 1977 &&
      G.age >= 18 &&
      !G.mem?.ptPrecAlentejo,
    text: 'The PREC — Processo Revolucionário Em Curso. The hot summer of 1975. After April 25, the Communist Party and the MFA left push further: in the Alentejo, the agricultural workers who had labored on the latifundias for generations occupy them. The wheat fields, the olive groves, the vast properties of the large landowners who under Salazar had everything and paid almost nothing. The occupation is illegal. The occupation is also the Alentejo restructuring itself through its workers\' hands for the first time in five centuries.',
    choices: [
      {
        text: 'You are part of the occupation — the land has been taken back',
        tag: null,
        outcome: 'The cooperatives. The meetings. The enormous difficulty of running collectively what had always been run by one family. The land reform works in some cooperatives and fails in others and is partially reversed after 1976. The attempt was real.',
        effect: (p) => { p.m += 6; p.karma += 5; p.addFlag('pt_prec_alentejo_land'); p.setPolitical('left'); p.setMem('ptPrecAlentejo', true) },
      },
      {
        text: 'You are the landowner\'s family — you watch the seizure from the road',
        tag: null,
        outcome: 'The Sixth Government under Pinheiro de Azevedo and then the first constitutional government after 1976 return some but not all of the land. Some it is too late to return — the trees have been cut, the equipment sold. The reversal is partial. The loss is specific.',
        effect: (p) => { p.r += 8; p.m -= 6; p.w -= 5; p.addFlag('pt_prec_alentejo_land'); p.setMem('ptPrecAlentejo', true) },
      },
    ],
    effect: null,
  },

  // ── RETORNADO CHILD — ARRIVING FROM THE COLONIES ─────────────────────────

  {
    id: 'pt_dep_retornado_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1975 && G.currentYear <= 1978 &&
      G.age >= 5 && G.age <= 16 &&
      !G.mem?.ptRetornadoChild,
    text: 'You were born in Luanda or Lourenço Marques. You have never been to Portugal — Portugal is where your grandparents go in the summer, it is letters, it is a concept. In 1975 the concept becomes where you live. The apartment in Almada or Setúbal, temporary, then permanent. The other children ask where you are from. The answer is complicated. You are Portuguese — you have always been Portuguese — but you are from a place that is no longer Portuguese and that you will spend the rest of your life explaining to people who were never there.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('pt_retornado_child'); p.setMem('ptRetornadoChild', true) },
  },

  // ── LUSO-FRANÇAIS — GROWING UP PORTUGUESE IN FRANCE ─────────────────────

  {
    id: 'pt_dep_luso_frances',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1965 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 16 &&
      !G.mem?.ptLusoFrances,
    text: 'Your parents went to France before you were born — a salto or a legal departure after April 25. You are Portuguese and French simultaneously in a way that neither the Portuguese nor the French have a comfortable category for. In Portugal during the summer holidays: your cousins say you speak Portuguese like you have something in your mouth. In France at school: the Portuguese kid. You will spend your whole life translating — not language, but who you are — between two countries neither of which is entirely yours.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.addFlag('pt_luso_descendant_france'); p.setMem('ptLusoFrances', true) },
  },

  // ── FADO AND THE ESTADO NOVO ─────────────────────────────────────────────

  {
    id: 'pt_dep_fado_political',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1950 && G.currentYear <= 1985 &&
      G.age >= 12 && G.age <= 22 &&
      !G.mem?.ptFado,
    text: 'The three F\'s of the Estado Novo: Fado, Football, Fátima. Salazar understood that fado — the music of saudade, of fate, of a beauty that is always also loss — could be the sound of a people accepting things as they are. After April 25, many Portuguese rejected fado for this reason: it was the soundtrack of submission. But fado is also Amália and the specific truth of something that exists before politics and will outlast politics, and the argument about whether it was instrument or art or both is the argument Portugal has been having ever since.',
    choices: [
      {
        text: 'You love fado and have made peace with its history',
        tag: null,
        outcome: 'Amália Rodrigues\' voice does something no argument can do. The music existed before Salazar and existed after. What it was used for and what it is are different questions.',
        effect: (p) => { p.m += 4; p.addFlag('pt_fado_political_memory'); p.setMem('ptFado', true) },
      },
      {
        text: 'You cannot hear fado without hearing what it was used for',
        tag: null,
        outcome: 'The art that was the sound of accommodation is still the art. You cannot separate them, which means you carry the history every time you hear it, which is frequently, in a country where it is everywhere.',
        effect: (p) => { p.r += 4; p.addFlag('pt_fado_political_memory'); p.setMem('ptFado', true) },
      },
    ],
    effect: null,
  },

  // ── SALAZAR REVISIONISM ───────────────────────────────────────────────────

  {
    id: 'pt_dep_salazar_revisionism',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 2000 &&
      G.age >= 35 &&
      !G.mem?.ptSalazarRevisionism,
    text: 'The television programme: "Os Grandes Portugueses." In 2007, in a public vote, Salazar finishes first. The country that overthrew Salazar has voted the dictator the greatest Portuguese of all time, ahead of Camões and Vasco da Gama. The television does not know what to do with this. The explanation offered: people voted for the order, the roads, the lack of corruption they remember. What they do not mention: the PIDE, the colonial wars, the forty-eight years. The things you remember depend entirely on who you were during the forty-eight years.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('pt_salazar_revisionist_debate'); p.setMem('ptSalazarRevisionism', true) },
  },

  // ── 50TH ANNIVERSARY OF APRIL 25 ─────────────────────────────────────────

  {
    id: 'pt_dep_25_abril_2024',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 2024 && G.currentYear <= 2025 &&
      G.age >= 55 &&
      !G.mem?.ptAbril2024,
    text: 'The 50th anniversary of April 25, 2024. The Assembleia da República. Chega — the far-right party that won 18 percent in March 2024 — walks out of the ceremony. Their leader says April 25 has been "stolen" by the left. You were alive for April 25. The flowers in the rifle barrels, the carnations. The Chega deputies walking out is the first time in fifty years that a Portuguese party has refused to celebrate April 25. The argument about whether the revolution was good is now the argument about whether the day itself belongs to everyone.',
    choices: [
      {
        text: 'The carnations were real — the memory cannot be retaken',
        tag: null,
        outcome: 'The people who were there: still alive, some of them. The captains of April. The carnations on the rifles. Whatever Chega says about April 25 is said fifty years after the thing happened, to people who were there.',
        effect: (p) => { p.m += 3; p.karma += 4; p.addFlag('pt_25_abril_2024_witness'); p.setMem('ptAbril2024', true) },
      },
      {
        text: 'The revolution opened debates that fifty years have not resolved',
        tag: null,
        outcome: 'The PREC. The nationalizations. What was settled in 1976 was not entirely settled. What Chega is doing is not new — it is the argument that was postponed, returning fifty years later with a new name.',
        effect: (p) => { p.r += 5; p.e += 3; p.addFlag('pt_25_abril_2024_witness'); p.setMem('ptAbril2024', true) },
      },
    ],
    effect: null,
  },

]
