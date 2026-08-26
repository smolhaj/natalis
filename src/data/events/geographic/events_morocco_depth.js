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
  G.character.ethnicity === 'sahrawi'

export const MOROCCO_DEPTH_EVENTS = [

  // ── 1971 SKHIRAT COUP ATTEMPT ─────────────────────────────────────────────

  {
    id: 'mor_skhirat_coup',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 1971 && G.currentYear <= 1974 &&
      G.age >= 16 &&
      !G.mem?.morSkhiratCoup,
    text: 'They come to the palace at Skhirat in the middle of the birthday party, fourteen hundred cadets with rifles, and they shoot the guests on the lawn. A hundred people die, among them ministers and ambassadors and the sort of men your father names when he wants to explain how the country works. The king is found alive in a bathroom. The following August two jets attack his aircraft over the Strait and he takes the radio himself and tells the pilots that the king is already dead, and they believe him.',
    context: 'On 10 July 1971 cadets from the Ahermoumou military academy attacked Hassan II\'s forty-second birthday reception at the Skhirat palace, killing about 100 guests and wounding 200. A second attempt followed in August 1972, when F-5 jets fired on the king\'s Boeing over the Strait of Gibraltar. Both failed, and the purges that followed opened the Years of Lead.',
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
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2019 &&
      G.age >= 18 &&
      !G.mem?.morHirakRif,
    text: 'The police take the swordfish off the man at Al Hoceima and throw it into the compactor, and he climbs in after it and the mechanism starts. The phone footage is everywhere by the evening. For eight months the Rif is in the street asking for a hospital, a university, and the soldiers out, which is a list any government could have granted. Instead they take Zefzafi out of a mosque and give him twenty years, and nobody in the sentencing had accused him of touching anyone.',
    context: 'Mouhcine Fikri, a fish seller in Al Hoceima, was crushed in a refuse compactor on 28 October 2016 while attempting to retrieve swordfish confiscated by authorities. The Hirak Rif protest movement that followed demanded a hospital, a university and demilitarisation of the region, which has been in tension with the central Makhzen since Abd el-Krim\'s Rif Republic of the 1920s. Leader Nasser Zefzafi was arrested in May 2017 and sentenced to twenty years, upheld on appeal.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      IS_MOROCCO(G) &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.morFourRegisters,
    text: 'At home it is Darija and your grandmother will not accept anything else. At the counter in the ministry the clerk waits until you switch to French and then he becomes helpful. In the mosque it is Fus-ha, which is nobody\'s mother\'s language. You watch yourself change register four times before lunch, and you notice which one makes people sit up, and it is not the one your grandmother taught you.',
    context: 'Morocco runs on four registers: Darija at home, Modern Standard Arabic in religion and official ceremony, French in the professions, courts and higher education, and Tamazight in its Tachelhit, Tarifit and Middle Atlas variants. Roughly a third of Moroccans are Amazigh. Tamazight was suppressed for decades and became an official language of the state only under the 2011 constitution.',
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
