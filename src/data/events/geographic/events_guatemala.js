// events_guatemala.js — Guatemala arc (8 events)
// Covers: Maya highland childhood, 1954 CIA coup, scorched earth genocide 1981–83
// (Maya and Ladino perspectives), model village relocation, Rigoberta Menchú 1992,
// 1996 Peace Accords, Ríos Montt genocide trial 2013, late reckoning
// Complements the 14 events in events_central_america.js

const IS_GUATEMALAN = (G) => G.character.country?.name === 'Guatemala'
const IS_MAYA = (G) =>
  ['maya_kiche', 'maya_mam', 'maya_kaqchikel', 'maya_qeqchi', 'other_maya', 'xinca'].includes(G.character.ethnicity?.id)

export const GUATEMALA_EVENTS = [

  // ─── MAYA HIGHLAND CHILDHOOD ─────────────────────────────────────────────────

  {
    id: 'gua_highland_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      IS_MAYA(G) &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.guaHighland,
    text: 'The milpa: corn and beans and squash planted together because they grow better that way. The weaving: your mother\'s loom in the corridor, the specific colour combinations that say what village you are from so precisely that you can tell at a market in Chichicastenango. The marimba at the fiesta. The alguacil who summons people to the cofradía meeting in the Mayan calendar\'s own time. These are not picturesque details. They are the structure of the days. You grow up inside this structure and later you will understand that the state does not know it exists, and that this not-knowing is itself a position.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.karma += 3; p.addFlag('gua_highland_maya'); p.setMem('guaHighland', true) },
  },

  // ─── 1954 CIA COUP ────────────────────────────────────────────────────────────

  {
    id: 'gua_1954_coup',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.currentYear >= 1954 && G.currentYear <= 1956 &&
      G.age >= 18 &&
      !G.mem?.gua1954Coup,
    text: (G) => {
      const isMaya = IS_MAYA(G)
      return isMaya
        ? 'The Árbenz government was distributing unused United Fruit Company land to landless families under the 1952 Agrarian Reform. Your family received a plot. In June 1954, the CIA-backed Colonel Castillo Armas crossed the border with a force of soldiers and radio transmitters. The United States called Árbenz a communist. The land is being returned to the company. You understand, at an age when understanding is still sharp rather than familiar, that this is what the world actually runs on.'
        : 'Colonel Jacobo Árbenz Guzmán is gone. The United Fruit Company and the US State Department did not like what he was doing with fallow land — redistribution to the landless, which is another way of saying redistribution from the company. The CIA calls it Operation Success. The agrarian reform is reversed. The lists of people who were involved with the Árbenz government are being used. Guatemala has been redirected.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.e += 3; p.addFlag('gua_1954_coup_generation'); p.setMem('gua1954Coup', true) },
  },

  // ─── SCORCHED EARTH 1981–1983 ─────────────────────────────────────────────────

  {
    id: 'gua_scorched_earth',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.currentYear >= 1981 && G.currentYear <= 1984 &&
      G.age >= 15 && G.age <= 45 &&
      !G.mem?.guaScorchedEarth,
    text: (G) => {
      const isMaya = IS_MAYA(G)
      return isMaya
        ? 'The soldiers come in the early morning, before the dogs bark. The village of Río Negro was 440 people. What the soldiers and the PAC — the civil patrols made up of other indigenous men — did there took three hours. You know this because the person who told you survived by hiding under bodies. The Ixil region. San Marcos. Ixcán. The army calls this Plan Sofía. What it is is soldiers burning villages, killing the animals, salting the wells. Your people are the enemy in a war they did not start and cannot end.'
        : 'The army is fighting the guerrillas in the highlands. The strategy is simple: remove the water from the fish. The Maya communities in the western highlands are the water. The villages are being burned. The civil patrols — indigenous men conscripted to fight their own neighbours — are the instrument. You live in the capital and you know this is happening the way you know things that are happening elsewhere: through the people who arrive, through the things that are not said on the radio, through the specific silences.'
    },
    choices: null,
    effect: (p) => {
      const isMaya = IS_MAYA(p)
      p.m -= 16
      p.r += 10
      p.h -= 4
      p.addFlag('gua_scorched_earth_generation')
      p.setMem('guaScorchedEarth', true)
    },
  },

  // ─── MODEL VILLAGES ───────────────────────────────────────────────────────────

  {
    id: 'gua_modelo_village',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      IS_MAYA(G) &&
      G.currentYear >= 1983 && G.currentYear <= 1990 &&
      G.age >= 20 &&
      !G.mem?.guaModelo,
    text: 'The army calls them "model villages" — polos de desarrollo. You are relocated to one. The houses are in rows. There is a military post at the entrance. The milpa fields are elsewhere and you need permission to go to them. The model village is designed to make you visible, to make visibility the price of survival. Everyone who lives here is a suspect who has been allowed to remain alive pending continued good behaviour. You learn to perform the good behaviour. You learn which of the other people in the rows are also performing it and which have been genuinely broken.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.e += 3; p.addFlag('gua_modelo_village_generation'); p.setMem('guaModelo', true) },
  },

  // ─── RIGOBERTA MENCHÚ 1992 ────────────────────────────────────────────────────

  {
    id: 'gua_menchu_prize',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1993 &&
      G.age >= 25 &&
      !G.mem?.guaMenchu,
    text: (G) => {
      const isMaya = IS_MAYA(G)
      return isMaya
        ? 'Rigoberta Menchú Tum receives the Nobel Peace Prize in Oslo in October 1992. She is K\'iche\', from Chimel in Quiché, the daughter of a catechist who was burned alive in the Spanish embassy in 1980 by government forces. She is the first indigenous person to receive the prize. You watch the ceremony on a television in a market. The woman who won a prize in a country most people in Norway could not find on a map is from a place like where you are from.'
        : 'The Nobel committee gives the prize to a K\'iche\' Maya woman from Quiché. In Guatemala the reaction splits along familiar lines: the right says she is a communist; the left says she is the only moral Guatemalan; the Maya communities say she is their daughter. Menchú has spent years in exile in Mexico documenting what happened in the villages. The government that was doing what she documented is still the government. The prize does not change that. It changes what the world thinks was happening.'
    },
    choices: null,
    effect: (p) => { p.m += 6; p.e += 3; p.karma += 3; p.setMem('guaMenchu', true) },
  },

  // ─── 1996 PEACE ACCORDS ───────────────────────────────────────────────────────

  {
    id: 'gua_peace_accords_1996',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.currentYear >= 1996 && G.currentYear <= 1997 &&
      G.age >= 25 &&
      !G.mem?.guaPeace96,
    text: 'December 29, 1996. The Guatemalan government and the URNG guerrilla movement sign the peace accords in the National Palace. The civil war is officially over after thirty-six years. 200,000 dead. 45,000 disappeared. 1 million displaced. The accord includes indigenous rights provisions, agrarian reform provisions, commitments to demilitarisation. The fireworks happen in the Zócalo. The generals who gave the orders during the scorched earth campaign are not in prison. They are, most of them, in the crowd watching the fireworks.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 5; p.addFlag('gua_1996_peace_generation'); p.setMem('guaPeace96', true) },
  },

  // ─── RÍOS MONTT GENOCIDE TRIAL 2013 ─────────────────────────────────────────

  {
    id: 'gua_rios_montt_trial',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.currentYear >= 2013 &&
      G.age >= 45 &&
      !G.mem?.guaRiosTrial,
    text: 'Efraín Ríos Montt stands trial for genocide in 2013. He is eighty-five years old. The prosecutor presents the testimony of survivors — Maya men and women who describe what the soldiers did, who gives the orders, what the orders were. On May 10, 2013, the court finds him guilty of genocide and crimes against humanity. He is sentenced to eighty years. Ten days later, the Constitutional Court annuls the verdict on a procedural technicality. Ríos Montt dies in 2018 without serving a day of the sentence. The testimonies are in the court record. The survivors are still alive. The verdict was real for ten days.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 3; p.e += 3; p.addFlag('gua_rios_montt_witness'); p.setMem('guaRiosTrial', true) },
  },

  // ─── LATE RECKONING ───────────────────────────────────────────────────────────

  {
    id: 'gua_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_GUATEMALAN(G) &&
      G.age >= 58 &&
      !G.mem?.guaLateReckoning,
    text: 'Guatemala is a country where the civil war happened and nothing conclusive followed. The CEH truth commission found in 1999 that the state had committed genocide against the Maya people and that the United States had provided material support for the operations. This finding is in the official record. The people who gave the orders mostly died in their beds. The land question that Árbenz tried to resolve in 1952 is unresolved. The highland villages rebuilt themselves. You are old enough to have watched the whole arc — the coup, the terror, the peace, the trial that was and then wasn\'t — and you know it not as history but as the sequence of events that the country you live in actually is.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.karma += 3; p.e += 2; p.setMem('guaLateReckoning', true) },
  },

]
