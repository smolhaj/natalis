// Central American arc — El Salvador, Guatemala, Honduras, Nicaragua
// Civil wars 1975-1996, Maya genocide, Contra war, liberation theology,
// gang emergence, northern migration. ~14 events.

const isNorthernTriangle = (G) =>
  ['El Salvador', 'Guatemala', 'Honduras'].includes(G.character.country.name)

const isCentralAmerica = (G) =>
  ['El Salvador', 'Guatemala', 'Honduras', 'Nicaragua'].includes(G.character.country.name)

const civilWarYears = (G) =>
  (G.character.country.name === 'El Salvador' && G.currentYear >= 1979 && G.currentYear <= 1992) ||
  (G.character.country.name === 'Guatemala'  && G.currentYear >= 1966 && G.currentYear <= 1996) ||
  (G.character.country.name === 'Honduras'   && G.currentYear >= 1980 && G.currentYear <= 1990)

export const CENTRAL_AMERICA_EVENTS = [

  // ── Growing up with the war as background noise ───────────────────────────
  {
    id: 'ca_civil_war_rumble',
    phase: 'childhood',
    weight: 4,
    when: (G) => isCentralAmerica(G) && civilWarYears(G) && !G.flags.includes('war_childhood'),
    text: 'The fighting is far enough away that you do not see it, but close enough that you know it is there. Adults speak in a particular way when they are not telling you something. The soldiers at the checkpoint wave the truck through or they do not. You have learned the difference in their posture between both.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 3; p.addFlag('war_childhood'); p.r += 3 },
  },

  // ── Romero's voice on the radio — El Salvador ─────────────────────────────
  {
    id: 'ca_archbishop_radio',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'El Salvador' &&
      G.currentYear >= 1977 && G.currentYear <= 1980 &&
      !G.mem?.archbishopRadioMemo,
    text: 'Every Sunday the church has a radio and you hear the archbishop\'s voice — slow, deliberate, a voice that does not seem afraid of anything it is saying. He names the colonels. He names the haciendas. He names the dead by name. No one in your town can quite believe someone is saying these things on the radio. Your parents look at each other during the homily.',
    choices: null,
    effect: (p) => {
      p.m += 4; p.e += 4; p.addFlag('liberation_theology_influenced')
      p.setMem('archbishopRadioMemo', true)
    },
  },

  // ── Finca childhood — coffee and sugar plantation labor ───────────────────
  {
    id: 'ca_finca_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      isCentralAmerica(G) &&
      G.ruralUrban === 'rural' &&
      (G.stats.wealth < 35 || G.character.wealthTier <= 2) &&
      !G.mem?.fincaChildhoodMemo,
    text: 'During the harvest you work alongside your parents. You are old enough to carry the basket. The coffee berries leave red stains under your fingernails by the end of the day. The foreman walks the rows and counts the weight. Your father does not look up when the foreman passes.',
    choices: null,
    effect: (p) => {
      p.m -= 6; p.h -= 3; p.e -= 2; p.setMem('fincaChildhoodMemo', true)
    },
  },

  // ── Maya language banned at school — Guatemala ────────────────────────────
  {
    id: 'ca_maya_school',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Guatemala' &&
      G.currentYear >= 1960 && G.currentYear <= 1994 &&
      (G.ethnicity?.startsWith('maya') || ['maya_kiche', 'maya_mam', 'maya_kaqchikel', 'maya_qeqchi', 'other_maya'].includes(G.ethnicity)) &&
      !G.mem?.mayaSchoolMemo,
    text: 'The teacher writes on the board in Spanish. The children who speak K\'iche\' at home have to translate everything twice in their heads before they can answer. When you speak your own language in the schoolyard the teacher raps her ruler on the desk. She does not explain why. You understand why without being told.',
    choices: [
      {
        text: 'Refuse to stop speaking it — quietly, to the other children',
        tag: 'Keep the language',
        outcome: 'The teacher sends you to the director\'s office. You do not stop.',
        effect: (p) => { p.e += 3; p.s += 2; p.r += 3; p.addFlag('maya_language_suppressed'); p.setMem('mayaSchoolMemo', true) },
      },
      {
        text: 'Switch to Spanish — it is the only language that has any use here',
        tag: 'Adapt',
        outcome: 'You begin to dream in Spanish. The other language recedes, like something left in the rain.',
        effect: (p) => { p.e += 4; p.m -= 5; p.r += 5; p.addFlag('maya_language_suppressed'); p.setMem('mayaSchoolMemo', true) },
      },
    ],
    effect: null,
  },

  // ── Liberation theology priest ────────────────────────────────────────────
  {
    id: 'ca_liberation_theology',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isCentralAmerica(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1988 &&
      (G.religion === 'christian_catholic' || !G.religion) &&
      !G.flags.includes('liberation_theology_influenced') &&
      !G.mem?.liberationTheologyMemo,
    text: 'Padre Ernesto is not like the other priests. He quotes scripture and then explains what the verse means for the people in the fields, the families whose sons have been taken. He reads the names of the dead during Mass. Some of the older families in town have stopped attending. The families from the highlands have started.',
    choices: null,
    effect: (p) => {
      p.m += 5; p.karma += 6; p.addFlag('liberation_theology_influenced')
      p.setMem('liberationTheologyMemo', true)
    },
  },

  // ── A neighbor disappears ─────────────────────────────────────────────────
  {
    id: 'ca_the_disappeared',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      isNorthernTriangle(G) && civilWarYears(G) &&
      !G.flags.includes('disappeared_family_memory') &&
      !G.mem?.disappearedMemo,
    text: 'The man three houses down left for work one morning and did not come back. No body, no explanation from anyone who will speak. His wife walks past the checkpoint every morning with the same expression — eyes forward, pace unchanged, the practiced calm of someone who knows who is watching. You have learned not to ask. Everyone has learned not to ask.',
    choices: null,
    effect: (p) => {
      p.m -= 12; p.r += 8; p.addFlag('disappeared_family_memory')
      p.setMem('disappearedMemo', true)
    },
  },

  // ── The death squad list — being warned your name is on it ────────────────
  {
    id: 'ca_death_squad_list',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isNorthernTriangle(G) && civilWarYears(G) &&
      (G.flags.includes('liberation_theology_influenced') ||
       G.flags.includes('civil_union_organizer') ||
       G.stats.karma > 65) &&
      !G.mem?.deathSquadListMemo,
    text: 'A man you vaguely know stops you in the market and tells you your name is on a list. He says it quietly, the way people say things they want no one else to hear. You do not ask which list. You understand what kind of list there is only one of. He walks away without looking back.',
    choices: [
      {
        text: 'Leave immediately — go to the capital, or across the border',
        tag: 'Flee',
        outcome: 'You take what you can carry. You are on the bus before morning.',
        effect: (p) => {
          p.m -= 15; p.h -= 5; p.r += 10; p.addFlag('civil_war_lived')
          p.addFlag('refugee'); p.setResidency('refugee_status')
          p.setMem('deathSquadListMemo', true)
        },
      },
      {
        text: 'Stay quiet and low — disappear into routine',
        tag: 'Go underground',
        outcome: 'You change your route. You stop attending certain meetings. You become ordinary in every visible way.',
        effect: (p) => {
          p.m -= 18; p.h -= 8; p.r += 12; p.addFlag('civil_war_lived')
          p.setMem('deathSquadListMemo', true)
        },
      },
    ],
    effect: null,
  },

  // ── Nicaragua: Contra war texture ─────────────────────────────────────────
  {
    id: 'ca_contra_witness',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nicaragua' &&
      G.currentYear >= 1981 && G.currentYear <= 1990 &&
      !G.mem?.contraWitnessMemo,
    text: 'The war does not announce itself cleanly. Young men from the village are in the army or they are in the mountains with the Contra. Sometimes the same family has one in each. The Americans who pass through on the road smile and call it freedom. The people in the village call it by names that depend on which side their sons are on.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 6; p.addFlag('contra_war_survivor')
      p.setMem('contraWitnessMemo', true)
    },
  },

  // ── The day the war officially ended ─────────────────────────────────────
  {
    id: 'ca_peace_accords_day',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      ((G.character.country.name === 'El Salvador' && G.currentYear >= 1992 && G.currentYear <= 1993) ||
       (G.character.country.name === 'Guatemala'   && G.currentYear >= 1996 && G.currentYear <= 1997)) &&
      G.flags.includes('war_childhood') || G.flags.includes('civil_war_lived') &&
      !G.mem?.peaceAccordsMemo,
    text: 'The date has been announced for weeks. When it arrives it is quieter than you expected. The fireworks happen in the capital. Here, the church bells ring. You sit with people you have known for years and no one says what everyone is thinking, which is: twelve years. Seventy-five thousand people. Now what.',
    choices: null,
    effect: (p) => {
      p.m += 12; p.r -= 5; p.addFlag('peace_accords_generation')
      p.setMem('peaceAccordsMemo', true)
    },
  },

  // ── Truth commission testimony ─────────────────────────────────────────────
  {
    id: 'ca_truth_commission',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.character.country.name === 'El Salvador' || G.character.country.name === 'Guatemala') &&
      G.currentYear >= 1992 && G.currentYear <= 2002 &&
      (G.flags.includes('disappeared_family_memory') || G.flags.includes('civil_war_lived') || G.flags.includes('war_childhood')) &&
      !G.mem?.truthCommissionMemo,
    text: 'The commissioners have been traveling the country listening. You are in the school gymnasium with perhaps forty others. When your turn comes you say what happened. You have said it before, to yourself and to no one. Saying it here, into a tape recorder, to a person writing notes, is different. You are not sure yet if different means better.',
    choices: [
      {
        text: 'Say everything — names, dates, what you saw',
        tag: 'Full testimony',
        outcome: 'It takes an hour. You walk out into the afternoon light feeling lighter and more tired than you expected.',
        effect: (p) => { p.m += 8; p.r -= 8; p.addFlag('ca_truth_told'); p.setMem('truthCommissionMemo', true) },
      },
      {
        text: 'Give only what cannot be used against anyone still living',
        tag: 'Partial account',
        outcome: 'You leave out the names. Some things are still too dangerous to say aloud.',
        effect: (p) => { p.m += 3; p.r += 5; p.setMem('truthCommissionMemo', true) },
      },
    ],
    effect: null,
  },

  // ── Gang corner — MS-13 or Barrio 18 recruitment pressure ────────────────
  {
    id: 'ca_gang_corner',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      isNorthernTriangle(G) &&
      G.currentYear >= 1995 &&
      G.character.gender === 'male' &&
      G.stats.wealth < 45 &&
      !G.mem?.gangCornerMemo,
    text: 'The corner is theirs. You know this. The boys who work it are from your school — or were, before they stopped going. One of them is someone you used to play football with in the street. He has a look now that he didn\'t have before. He stops you and asks where you are going. The question is not really a question.',
    choices: [
      {
        text: 'Find a way through — stay at school, take the long route',
        tag: 'Stay clear',
        outcome: 'It costs you something to not be seen on that corner. It costs you less than the alternative.',
        effect: (p) => { p.e += 3; p.m -= 5; p.setMem('gangCornerMemo', true) },
      },
      {
        text: 'Do the errand they\'re asking — just this once',
        tag: 'One errand',
        outcome: 'They pay you. The errand becomes a second errand. The second errand makes the first one make sense. This is how it works.',
        effect: (p) => { p.mo += 200; p.m -= 8; p.h -= 5; p.addFlag('gang_territory_lived'); p.addFlag('criminal_life'); p.setMem('gangCornerMemo', true) },
      },
    ],
    effect: null,
  },

  // ── The decision to go north ──────────────────────────────────────────────
  {
    id: 'ca_north_or_stay',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isCentralAmerica(G) &&
      G.currentYear >= 1990 &&
      G.stats.wealth < 45 &&
      G.residencyStatus === 'citizen' &&
      !G.mem?.northOrStayMemo,
    text: 'The bus north leaves from the plaza every week. You know three people who have taken it. One sends money back. One you have not heard from. One was deported and is back at the same job as before. The calculus involves your family, the money, the danger of going, and the danger of staying.',
    choices: [
      {
        text: 'Go — the risk north is better than the risk here',
        tag: 'Take the bus',
        outcome: 'You carry almost nothing. The bus reaches the border by morning.',
        effect: (p) => {
          p.m -= 10; p.r += 5; p.addFlag('northern_journey_taken')
          p.setResidency('undocumented'); p.setMem('northOrStayMemo', true)
        },
      },
      {
        text: 'Stay — this is your country, your family is here',
        tag: 'Stay',
        outcome: 'You watch the bus leave. This is a decision you will revisit for years.',
        effect: (p) => { p.r += 8; p.m += 3; p.addFlag('stayed_behind'); p.setMem('northOrStayMemo', true) },
      },
    ],
    effect: null,
  },

  // ── Hurricane Mitch 1998 — Honduras and Nicaragua ─────────────────────────
  {
    id: 'ca_hurricane_mitch',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.character.country.name === 'Honduras' || G.character.country.name === 'Nicaragua') &&
      G.currentYear === 1998 &&
      !G.mem?.hurricaneMitchMemo,
    text: 'The hurricane takes three days to pass. When it does, the road to the nearest town is gone. The bridge is gone. Eleven thousand people will eventually be counted dead; the real number is larger. The family on the hill you could see from your house is not there anymore. The relief workers arrive in the second week.',
    choices: null,
    effect: (p) => {
      p.h -= 10; p.m -= 15; p.mo = Math.max(0, (p.mo ?? 0) - 800)
      p.addFlag('disaster_survivor'); p.r += 5; p.setMem('hurricaneMitchMemo', true)
    },
  },

  // ── Remittance childhood — parent away in the US ──────────────────────────
  {
    id: 'ca_remittance_childhood',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isCentralAmerica(G) &&
      G.currentYear >= 1990 &&
      G.stats.wealth < 50 &&
      !G.mem?.remittanceChildhoodMemo,
    text: 'Your parent is in the United States. You know this the way you know where the sun rises — as a fact that organizes everything else. The money arrives on the first of the month. There is a photograph of a city that is bright and enormous. You carry the photograph for a year before it falls apart at the folds.',
    choices: null,
    effect: (p) => {
      p.m -= 6; p.e += 3; p.r += 4; p.mo += 600
      p.setMem('remittanceChildhoodMemo', true)
    },
  },

]
