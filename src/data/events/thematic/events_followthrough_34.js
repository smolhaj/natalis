// events_followthrough_34.js — MODE B follow-throughs
// 7 events: Ecuador arc echoes (7)

export const FOLLOWTHROUGH_34_EVENTS = [

  // ─── ECUADOR ──────────────────────────────────────────────────────────────────

  {
    id: 'ft34_quechua_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_quechua_home') &&
      G.age >= 55 &&
      !G.mem?.ft34QuechuaLate,
    text: 'Ecuador officially recognised Quechua in 1998. There are intercultural bilingual schools now — the thing the teacher told you was for grandmothers has become a subject of serious academic study, a language being documented before it thins further. The revitalization is real and insufficient at the same time: real because some children are learning it, insufficient because the children learning it are learning it in classrooms rather than in the homes where it used to be the only language anyone needed. You have been watching this for sixty years. The watching has its own texture.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.e += 3; p.setMem('ft34QuechuaLate', true) },
  },

  {
    id: 'ft34_military_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_military_generation') &&
      G.age >= 55 &&
      !G.mem?.ft34MilitaryLate,
    text: 'The transition to democracy happened in 1979. Jaime Roldós Aguilera won the election — thirty-eight years old, a constitutionalist. He died in a plane crash in 1981 under circumstances that have never been fully explained. The military stood down and did not seize power again. Ecuador has had a democracy for four decades with many governments, many crises, and the military in the barracks. This is not nothing. You have lived through the alternative.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.karma += 3; p.setMem('ft34MilitaryLate', true) },
  },

  {
    id: 'ft34_flower_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_flower_worker') &&
      G.age >= 42 &&
      !G.mem?.ft34FlowerLate,
    text: 'The studies came out years later: flower workers in the Cayambe region with elevated pesticide exposure. Respiratory effects. Neurological effects in some workers. The farms brought in certification programs in the 2000s — fair trade labels, worker protections, European market requirements. The protections are real. The exposure from the years before the protections is also real and it is now in your body. The roses you cut are in living rooms in Europe and the United States. The people who bought them do not know this story. You do not expect them to.',
    choices: null,
    effect: (p) => { p.h -= 5; p.r += 6; p.m += 3; p.setMem('ft34FlowerLate', true) },
  },

  {
    id: 'ft34_spain_echo',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('ecu_spain_emigrant') &&
      G.age >= 50 &&
      !G.mem?.ft34SpainEcho,
    text: 'Spain\'s own crisis came in 2008. Construction stopped. The restaurants closed. The cleaning agencies contracted. Ecuador\'s remittances dropped. Some people came back — the ones who could, the ones who had not yet built a life that was more Spain than Ecuador. Others stayed through the crisis in Spain the way their parents had stayed through crises in Ecuador, which is to say by reducing and enduring. You built a life in one country and maintained a version of yourself in another. The arithmetic of this — what you sent, what you missed, who you became — is not finished.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 3; p.e += 2; p.setMem('ft34SpainEcho', true) },
  },

  {
    id: 'ft34_correa_supporter_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_correa_supporter') &&
      G.age >= 50 &&
      !G.mem?.ft34CorreaSupporterLate,
    text: 'Lenín Moreno, whom Correa backed for the 2017 election, turned. The IMF deal. The fuel subsidy cuts. The prosecution of Correa on corruption charges while Correa was in self-imposed exile in Belgium. The hospitals are still there. The roads are still there. The poverty reduction is still there. Correa himself is in Liège, convicted in absentia, running for the Ecuadorian presidency from Europe in what the constitution does not clearly permit or prohibit. You hold the gains. You are still thinking about the rest.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 2; p.e += 4; p.setMem('ft34CorreaSupporterLate', true) },
  },

  {
    id: 'ft34_correa_skeptic_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_correa_skeptic') &&
      G.age >= 50 &&
      !G.mem?.ft34CorreaSkepticLate,
    text: 'Correa left office in 2017 and went to Belgium. The courts convicted him in absentia for bribery. His successor dismantled the citizen revolution program by program, cut the fuel subsidies, signed the IMF deal. The streets that Correa built are still there. The hospitals he funded are still there. The press he sued is also still there, damaged but functioning. You were right about the concentration of power. The gains you said were real were also real. Both things were true at the same time, and you knew that. The difficulty was always in knowing what to do with both things at once.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.e += 3; p.setMem('ft34CorreaSkepticLate', true) },
  },

  {
    id: 'ft34_gang_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ecu_gang_generation') &&
      G.age >= 45 &&
      !G.mem?.ft34GangLate,
    text: 'Ecuador normalised something in the years after 2023. Not accepting it — adjusting to it. You know which neighbourhoods, which hours, which routes. The state\'s response has oscillated between military deployment and negotiation and military deployment again. The Villavicencio assassination is commemorated each year on August 9. The television studio where armed men appeared on live television has broadcast every day since. Life continues in ways that would have been unimaginable a decade ago, and you continue in it, carrying knowledge about your own country that no one wanted to have.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 3; p.h -= 2; p.setMem('ft34GangLate', true) },
  },

]
