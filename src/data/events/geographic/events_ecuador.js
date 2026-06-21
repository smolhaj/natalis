// events_ecuador.js — Ecuador arc (8 events)
// Covers: Andean minga, Quechua school identity, military dictatorship 1963–79,
// flower export economy, Spain emigration wave 2001–08, Correa "Citizen Revolution",
// 2024 gang crisis, late reckoning
// Complements the 4 existing events in events_uy_py_ec.js

const IS_ECUADORIAN = (G) => G.character.country?.name === 'Ecuador'

export const ECUADOR_EVENTS = [

  // ─── ANDEAN HIGHLAND CHILDHOOD ────────────────────────────────────────────────

  {
    id: 'ecu_minga',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.ruralUrban !== 'urban' &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.ecuMinga,
    text: 'There is a word for it: minga. When the road washes out, or the roof needs replacing, or a neighbour is building, everyone comes without being asked. You carry stones and pour chicha and someone plays music and your hands are raw by afternoon. The village feeds everyone who works. Nothing is owed afterward. Nothing needs to be owed. The Andes have operated on this principle for centuries and it has nothing to do with money and everything to do with the fact that you cannot survive here alone.',
    choices: null,
    effect: (p) => { p.s += 4; p.karma += 3; p.m += 3; p.addFlag('ecu_andean_highland'); p.setMem('ecuMinga', true) },
  },

  {
    id: 'ecu_school_quechua',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.character.ethnicity?.id === 'indigenous_ecuadorian' &&
      G.age >= 7 && G.age <= 13 &&
      !G.mem?.ecuSchoolQuechua,
    text: 'At home the language is Quechua. At school it is Spanish or nothing — the teacher says Quechua is for the market, for grandmothers, for people who want to stay poor. You are learning two things simultaneously: Spanish for the school, and the understanding that your home language is considered lesser. You become careful about which words you use in which rooms. This is not a choice. This is an adaptation that happens to children before they are old enough to name what is being taken.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 4; p.addFlag('ecu_quechua_home'); p.setMem('ecuSchoolQuechua', true) },
  },

  // ─── MILITARY DICTATORSHIP 1963–1979 ──────────────────────────────────────────

  {
    id: 'ecu_military_dictatorship',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.currentYear >= 1963 && G.currentYear <= 1979 &&
      G.age >= 18 && G.age <= 38 &&
      !G.mem?.ecuMilitary,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1966
        ? 'The military removed Arosemena last year and closed the parties. The streets feel different at night than they do during the day. The official position is that this is temporary — an intervention to restore order before returning power to civilian hands. The curfew is not temporary. The newspapers print what they are permitted to print. You navigate this as people navigate things that have been decided without them: carefully, and with constant attention to the door.'
        : 'Rodríguez Lara calls his government a nationalist revolution. He uses the oil revenues for roads, clinics, schools. He is a reformer who did not ask for permission. The left is suppressed. The press is managed. The question of who decides is not a question anyone asks aloud. You live in a country where that question has been taken off the table, and you adjust, as people do, to institutions that were not designed to require your consent.'
    },
    choices: [
      {
        text: 'Keep your head down. Navigate what is.',
        tag: 'adapt',
        outcome: 'You learn to read the room. What is permitted shifts without announcement. You shift with it. There is a competence in this — knowing exactly how much room you have.',
        effect: (p) => { p.m -= 5; p.e += 2; p.addFlag('ecu_military_generation') },
      },
      {
        text: 'Stay connected to the networks of dissent that exist.',
        tag: 'resist',
        outcome: 'There are others — not many, and careful. You find them through books and through certain parties and through the precise use of words that mean more than they say. You carry the knowledge of who else knows.',
        effect: (p) => { p.m -= 4; p.r += 3; p.karma += 4; p.addFlag('ecu_military_generation') },
      },
    ],
    effect: null,
  },

  // ─── FLOWER EXPORT ECONOMY ────────────────────────────────────────────────────

  {
    id: 'ecu_flower_hacienda',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.currentYear >= 1985 &&
      G.stats.wealth <= 45 &&
      !G.career?.id &&
      !G.mem?.ecuFlower,
    text: 'Ecuador exports more roses than almost anywhere. The greenhouses are in the highlands outside Quito — the altitude and the equatorial light produce stems longer than anywhere else in the world. The work starts before light, six days a week. The fumigation mist settles on everything including your lungs. The roses are cut for Valentine\'s Day in countries you have never been to. You develop, without choosing to, a botanical expertise: the exact moment a stem is ready, the particular weight of a head that will make it through shipping, the colour that buyers in Amsterdam will accept. This knowledge earns you almost nothing. The knowledge is yours.',
    choices: null,
    effect: (p) => { p.h -= 4; p.w -= 3; p.e += 3; p.r += 4; p.addFlag('ecu_flower_worker'); p.setMem('ecuFlower', true) },
  },

  // ─── SPAIN EMIGRATION WAVE 2001–2008 ──────────────────────────────────────────

  {
    id: 'ecu_spain_wave',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.currentYear >= 2001 && G.currentYear <= 2008 &&
      G.age >= 19 && G.age <= 40 &&
      !G.mem?.ecuSpain,
    text: (G) => {
      const yr = G.currentYear
      return `Spain does not require visas from Ecuadorians until 2003. Before that, eight hundred thousand people leave. After that, more find ways. The sucre collapsed ${yr <= 2002 ? 'two years ago' : 'a few years back'} and the conversion left savings worth less than the paper they were recorded on. Madrid is where half your neighbourhood has gone. The money they send back is visible: the houses under construction with dollar remittances, the school fees paid, the mothers living alone in houses that are nicer than they were before their children left them.`
    },
    choices: [
      {
        text: 'Go to Spain.',
        tag: 'emigrate',
        outcome: 'The flight to Madrid. The uncle\'s cousin who finds you a room. The construction site or the restaurant kitchen or the cleaning agency. You send money home every month.',
        effect: (p) => { p.mo += 3000; p.r += 5; p.addFlag('ecu_spain_emigrant'); p.setResidency('work_visa') },
      },
      {
        text: 'Stay.',
        tag: 'stay',
        outcome: 'You stay and watch the neighbourhood empty. The ones who leave call. The ones who stay learn to live in a country that is exporting its people as its primary product.',
        effect: (p) => { p.m -= 5; p.r += 4; p.karma += 3; p.addFlag('ecu_stayed_home_crisis') },
      },
    ],
    effect: null,
  },

  // ─── CORREA "CITIZEN REVOLUTION" 2007–2017 ───────────────────────────────────

  {
    id: 'ecu_correa_revolution',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.currentYear >= 2007 && G.currentYear <= 2017 &&
      G.age >= 28 &&
      !G.mem?.ecuCorrea,
    text: 'Rafael Correa wins in 2006. The oil revenues fund hospitals, roads, schools — infrastructure of a country that had been giving that money to creditors for decades. He closes the US air base at Manta. He restructures the foreign debt and wins the argument. He is brilliant and combative and authoritarian by degrees: the press law, the lawsuits against journalists, opponents jailed on sedition charges, the constitution used as an instrument of personal extension. The question of whether you support him is also a question about what you are prepared to overlook.',
    choices: [
      {
        text: 'Support the revolution. The gains are real.',
        tag: 'supporter',
        outcome: 'The hospitals are real. The roads are real. The poverty numbers are real. You hold the gains and set aside what they cost.',
        effect: (p) => { p.m += 5; p.e += 2; p.addFlag('ecu_correa_supporter') },
      },
      {
        text: 'Keep your distance. Power that accumulates does not stop accumulating.',
        tag: 'skeptic',
        outcome: 'You watch the press restrictions tighten, the opposition narrowed, the referendum used to extend what a constitution should limit. The gains are real. So is what they are built on.',
        effect: (p) => { p.e += 4; p.r += 3; p.m -= 3; p.addFlag('ecu_correa_skeptic') },
      },
    ],
    effect: null,
  },

  // ─── 2023–2024 GANG CRISIS ────────────────────────────────────────────────────

  {
    id: 'ecu_gang_crisis_2024',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.currentYear >= 2023 &&
      G.age >= 25 &&
      !G.mem?.ecuGangCrisis,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 2023
        ? 'Fernando Villavicencio — investigative journalist, presidential candidate — is shot outside a debate in Quito. You watch it happen on your phone, the blurred video, the confirmation, the official statements that follow. Ecuador has been getting more violent for years: the Sinaloa Cartel and Los Choneros fighting through Esmeraldas and Guayaquil. But shooting a man running for president, at a campaign event, in daylight: this is something else. The country is being asked a question about itself that it does not know how to answer.'
        : 'Armed men take a television studio live on air in January. The prison riots where gang leaders were held turn out to be places the gangs now run. Daniel Noboa declares war. The military deploys in the streets. You are watching Ecuador discover what it is when the state loses the monopoly on violence, and you are watching this happen in a country you have known all your life.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.h -= 2; p.addFlag('ecu_gang_generation'); p.setMem('ecuGangCrisis', true) },
  },

  // ─── LATE RECKONING ───────────────────────────────────────────────────────────

  {
    id: 'ecu_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_ECUADORIAN(G) &&
      G.age >= 58 &&
      !G.mem?.ecuLateReckoning,
    text: 'Ecuador is a country that has been plural from the beginning — coast and sierra and Oriente, Spanish and Quechua and Shuar, Black and indigenous and mestizo and white — and has never resolved what it means for all of these to be true at once. The governments have come and gone: military, civilian, left-populist, right-technocrat. The oil has been extracted. The roses have been cut. The people who left for Spain and Italy built lives there and here simultaneously. You have lived inside this complexity your whole life, long enough to know it not as a problem to be solved but as the actual texture of the place you are from.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 5; p.e += 3; p.karma += 3; p.setMem('ecuLateReckoning', true) },
  },

]
