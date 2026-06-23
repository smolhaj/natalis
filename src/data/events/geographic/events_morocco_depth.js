// events_morocco_depth.js
// Morocco depth: 1971 Skhirat coup attempt, Western Sahara and Sahrawi identity,
// Casablanca bombings 2003, Moudawwana reform 2004 (women's code), the Rif movement
// 2016–17, and the specific texture of a country that lives in four linguistic registers.
//
// Companion to events_morocco.js (which covers: Years of Lead, Amazigh identity,
// Strait crossing, language gradient, diaspora, Amazigh recognition 2011).

const IS_MOROCCO = (G) => G.character.country?.name === 'Morocco'
const IS_SAHRAWI = (G) =>
  G.character.country?.name === 'Morocco' &&
  (G.character.ethnicity === 'sahrawi' || G.character.ethnicity === 'hassani')

export const MOROCCO_DEPTH_EVENTS = [

  // ── 1971 SKHIRAT COUP ATTEMPT ─────────────────────────────────────────────

  {
    id: 'mor_skhirat_coup',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 1971 && G.currentYear <= 1974 &&
      G.age >= 16 &&
      !G.mem?.morSkhiratCoup,
    text: `July 10, 1971. The army invites itself to the king's birthday party at the Skhirat palace. Military cadets from Ahermoumou — 1,400 of them — arrive with weapons. They shoot the guests. 100 people are killed, another 200 wounded, among them diplomats and ministers and members of the Moroccan elite invited to celebrate Hassan II's forty-second birthday. The king survives by hiding in a bathroom. A year later, in August 1972, two F-5 jets attack his plane over the Strait. He survives again, speaking into the plane's radio as if he were the pilot, telling the attackers the king is dead. The message your country received from these years: the king cannot be killed. The message you received as someone who was alive during them: the king is surrounded by people willing to try.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.addFlag('mor_1971_coup_generation')
      p.setMem('morSkhiratCoup', true)
    },
  },

  // ── WESTERN SAHARA / SAHRAWI ──────────────────────────────────────────────

  {
    id: 'mor_green_march_1975',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1980 &&
      G.age >= 6 &&
      !G.mem?.morGreenMarch,
    text: `November 6, 1975. Hassan II calls for 350,000 volunteers to march peacefully into the Spanish Sahara. They march. Spain, in the last weeks of the Franco regime and unable to withstand the pressure, signs the Madrid Accords and withdraws, dividing the territory between Morocco and Mauritania. The Polisario Front — the Sahrawi independence movement — retreats to Tindouf in Algeria. The refugees in Tindouf have been there ever since. Whether the territory is Morocco's Southern Provinces or Western Sahara is a question that has not been resolved and that the United Nations has been managing for fifty years.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.addFlag('mor_1971_coup_generation')
      p.setMem('morGreenMarch', true)
    },
  },

  {
    id: 'mor_sahrawi_tindouf',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_SAHRAWI(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1995 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.morSahrawiTindouf,
    text: `You are Sahrawi. Your family is in the camps at Tindouf, in the Algerian desert, in the part of the world that is nothing but flat sand and sky and heat. The camps have names: Smara, Laayoune, Dakhla — the names of the cities that were once yours and are now somewhere else. Your parents describe a coast, a fishing culture, a landscape of camels and dunes. You have grown up in a tent in Algeria. You were born in a camp. Your generation is the one that has never been to the place whose return is the purpose of the camp's existence. The UN referendum has been promised since 1991. It has not yet happened.`,
    choices: [
      {
        text: 'The camp is all you know. The homeland is a story your parents tell.',
        tag: null,
        outcome: 'The story is precise and consistent. Your parents have kept the map of the homeland sharp because keeping it sharp is what you do in a camp. The homeland is real to you in the way that things you have been taught to love are real — which is a particular kind of real.',
        effect: (p) => {
          p.r += 6
          p.addFlag('sahrawi_identity')
          p.addFlag('refugee_status_generation')
          p.setMem('morSahrawiTindouf', true)
        },
      },
      {
        text: 'You dream of going back even to a place you have never been.',
        tag: null,
        outcome: 'This is what displacement transmits across generations: not the memory of the place, but the longing for it. Your parents\' longing has become yours. The referendum will not come before you are old.',
        effect: (p) => {
          p.m -= 5
          p.r += 8
          p.addFlag('sahrawi_identity')
          p.addFlag('refugee_status_generation')
          p.setMem('morSahrawiTindouf', true)
        },
      },
    ],
    effect: null,
  },

  // ── CASABLANCA BOMBINGS 2003 ──────────────────────────────────────────────

  {
    id: 'mor_casa_bombings_2003',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2006 &&
      G.age >= 18 &&
      !G.mem?.morCasaBombs,
    text: `May 16, 2003. Five simultaneous bombings in Casablanca. Forty-five dead — 33 of them Moroccan. The targets are not tourists: a Jewish community centre, a Spanish restaurant, a hotel, a Belgian consulate, a Jewish cemetery. The attackers are young men from Sidi Moumen, a quartier pauvre on the edge of Casablanca — not foreign fighters, not ideological veterans, but from the same underclass that has always been on the margins of the city's prosperity. The attacks change how Morocco talks about Islam, about its youth, about the relationship between a country's economic geography and its political extremism. The crackdown that follows is not surgical.`,
    choices: [
      {
        text: 'The attacks produced a Morocco that started watching itself.',
        tag: null,
        outcome: 'The security services expand. The laws expand. The monitoring expands. The conversation about what Sidi Moumen was and why it produced this — what it means that the country made that neighbourhood — is shorter than the conversation about security.',
        effect: (p) => {
          p.m -= 6
          p.addFlag('mor_casablanca_2003_generation')
          p.setMem('morCasaBombs', true)
        },
      },
      {
        text: 'You grew up near Sidi Moumen. This is also your context.',
        tag: null,
        outcome: 'The neighbourhood becomes, for a few years, a name that others say with a particular meaning. You live in it. The meaning is not what you know the place to be.',
        effect: (p) => {
          p.m -= 10
          p.r += 5
          p.addFlag('mor_casablanca_2003_generation')
          p.setMem('morCasaBombs', true)
        },
      },
    ],
    effect: null,
  },

  // ── MOUDAWWANA REFORM 2004 ────────────────────────────────────────────────

  {
    id: 'mor_moudawwana_2004',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 2004 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.morMoudawwana,
    text: `February 2004. Mohammed VI signs the reformed Moudawwana — the family code. The minimum marriage age for women rises from fifteen to eighteen. Divorce by repudiation, which a man could pronounce three times without a court, now requires judicial approval. Polygamy requires the first wife's consent and a court's judgment. The reforms are the most significant change to Moroccan family law since independence. They were opposed by Islamist movements, reluctantly accepted by the religious establishment, and pushed through by the king in a moment when the Arab Spring had not yet arrived and the political window was open. Women's rights organisations that have been working for twenty years say: this is real. This is not all of it.`,
    choices: [
      {
        text: 'The law has changed. Your life has changed with it.',
        tag: null,
        outcome: 'A legal right is not the same as a social right. The court is in the capital. The qadi may or may not apply the reformed code with consistency. The law is the floor, not the ceiling.',
        effect: (p) => {
          p.m += 6
          p.addFlag('mor_moudawwana_generation')
          p.setMem('morMoudawwana', true)
        },
      },
      {
        text: 'The reform came from the top. What the street believes has not changed at the same speed.',
        tag: null,
        outcome: 'Your mother knew her rights under the old code, which were few. You know your rights under the new code, which are more. The space between the law and its practice is where you still live.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.addFlag('mor_moudawwana_generation')
          p.setMem('morMoudawwana', true)
        },
      },
    ],
    effect: null,
  },

  // ── RIF MOVEMENT 2016–17 ──────────────────────────────────────────────────

  {
    id: 'mor_hirak_rif',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2019 &&
      G.age >= 18 &&
      !G.mem?.morHirakRif,
    text: `October 28, 2016. Mouhcine Fikri, a fish vendor in Al Hoceima, refuses to let the police confiscate his swordfish — the fish was illegal to sell at this season, which the vendors dispute — and is crushed in the garbage truck that takes it. The footage circulates. The movement that starts is called Hirak Rif, or sometimes simply Al-Hirak: the movement. For months, the Rif protests — the region has always been in tension with the Makhzen since Abd el-Krim's republic in the 1920s — march on specific demands: a hospital, a university, an end to the milit arisation of the region. Nasser Zefzafi, the movement's main leader, is arrested. Sentences of up to twenty years for leaders who were not accused of violence. The machine of the state responds to a fish vendor and a movement with efficiency.`,
    choices: [
      {
        text: 'You follow the movement and feel what it means when demands this specific are met with twenty-year sentences.',
        tag: null,
        outcome: 'The demands were not abstract: a cancer hospital, a university, economic development in a region that felt left behind. The sentences are for what, exactly? For asking.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.addFlag('mor_rif_movement_generation')
          p.setMem('morHirakRif', true)
        },
      },
      {
        text: 'You are from the Rif. Your father\'s generation remembers what happened to Rif resistance before.',
        tag: null,
        outcome: 'The Rif and the Makhzen have a long history. Abd el-Krim. The independence-era marginalisation. The specific disproportion of the state\'s response is something your family has a model for.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.addFlag('mor_rif_movement_generation')
          p.addFlag('amazigh_identity')
          p.setMem('morHirakRif', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE FOUR REGISTERS ────────────────────────────────────────────────────

  {
    id: 'mor_four_registers',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.morFourRegisters,
    text: `Your country runs on four languages and you have all four. At home: Darija, the Moroccan Arabic that is not what they teach in the Gulf and that Gulf Arabs sometimes pretend they cannot understand. At the mosque and in official ceremony: Fus-ha, Modern Standard Arabic, which nobody speaks as a mother tongue but which everyone who passed through school can use. At the office and in the courts and in the hospitals: French, still, fifty years after independence, still the language of the professional class. And in the mountains and the medinas: Tamazight in its variants — Tachelhit, Tarifit, Tamazight of the Middle Atlas — which the state has only recently admitted is a language at all. To get the job, you need French. To get the respect, you need Fus-ha. To get home, you need Darija. To get your grandmother, you need the language the state spent sixty years pretending wasn't there.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.setMem('morFourRegisters', true)
    },
  },

  // ── FOLLOW-THROUGH: COUP GENERATION ──────────────────────────────────────

  {
    id: 'mor_coup_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.flags.has('mor_1971_coup_generation') &&
      G.age >= 55 &&
      !G.mem?.morCoupEcho,
    text: `Hassan II died in July 1999 and was buried before the week was out. His son Mohammed VI was twenty-five. You remember the coup attempts of the 1970s — the birthday party massacre at Skhirat, the jets over the Strait — and you think about the specific kind of monarchical authority it takes to survive two attempts on your life and remain on the throne for thirty-eight years. The authority was also the torture chambers, the disappearances, the prisoners at Derb Moulay Cherif, the years called lead. The two things were the same system. You have lived inside it your whole life.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('morCoupEcho', true)
    },
  },

  // ── FOLLOW-THROUGH: RIF MOVEMENT ─────────────────────────────────────────

  {
    id: 'mor_rif_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.flags.has('mor_rif_movement_generation') &&
      G.age >= 45 &&
      !G.mem?.morRifEcho,
    text: `Nasser Zefzafi received twenty years. Several other Hirak leaders received fifteen. Some were released early under royal pardon. The hospital in Al Hoceima was built. The university expansion was partially funded. The Rif did not receive everything it asked for and received more than it had before the movement. This is the accounting of movements that are too specific to be absorbed by a political party and too local to become a national revolution: partial, partial, partial.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.setMem('morRifEcho', true)
    },
  },

]
