// events_followthrough_31.js — MODE B follow-throughs for Central Asia arcs
// 12 events providing downstream consequences for flags set in:
//   events_kyrgyzstan.js, events_tajikistan.js, events_uzbekistan.js,
//   events_kazakhstan.js — plus 4 unregistered-flag follow-throughs
//   for cross-cutting arcs that need echo events.

export const FOLLOWTHROUGH_31_EVENTS = [

  // ─── KYRGYZSTAN ──────────────────────────────────────────────────────────────

  {
    id: 'ft31_osh_uzbek_decade_on',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('kyr_osh_uzbek_witness') &&
      G.age >= 50 &&
      !G.mem?.ft31OshUzbek,
    text: 'It has been more than a decade since June 2010. The men who organised it have not been prosecuted. The Kyrgyz neighbours you had before it — some you still see. Some moved away. The ones you still see: you have a relationship with them that exists around a shared silence. You both know what the silence contains. Some days it sits lightly. Some days it is the whole room. Your children who were born after it know the story from you. Their relationship to this country is not yours — they have not decided yet what it is. You watch them deciding.',
    choices: [
      {
        text: 'You have chosen to stay and regard this as your country, damaged as it is.',
        tag: 'kyr_osh_uzbek_stayed_rooted',
        outcome: 'The decision was made slowly, over years, by staying each year when leaving was still possible. That is also a decision.',
        effect: (p) => { p.addFlag('kyr_osh_uzbek_stayed_rooted'); p.m += 5; p.karma += 5; p.r += 4; p.setMem('ft31OshUzbek', true) },
      },
      {
        text: 'You have decided, or the decision has decided itself, to eventually leave.',
        tag: 'kyr_osh_uzbek_departing',
        outcome: 'The question of when is still open. The question of whether has been answered.',
        effect: (p) => { p.addFlag('kyr_osh_uzbek_departing'); p.r += 8; p.m -= 4; p.setMem('ft31OshUzbek', true) },
      },
    ],
  },

  {
    id: 'ft31_tulip_revolution_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('kyr_tulip_participant') &&
      G.age >= 55 &&
      !G.mem?.ft31TulipReckoning,
    text: 'The Tulip Revolution was twenty years ago. Akayev fled; Bakiyev came; Bakiyev was overthrown in turn; Jeenbekov came; Jeenbekov resigned; Japarov, who was in prison for hostage-taking, became president. The pattern has been consistent. You were in the streets in 2005, which was something. What you were contributing to is not what you thought you were contributing to, or it is, depending on how you read the pattern. The democracy is there, in the sense that the mechanism for removing presidents works. What the mechanism produces is what you are living in.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 2; p.setMem('ft31TulipReckoning', true) },
  },

  {
    id: 'ft31_manas_transmit',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kyr_manas_generation') &&
      G.children?.length > 0 &&
      G.age >= 35 &&
      !G.mem?.ft31Manas,
    text: 'You have tried to give your children the Manas the way it was given to you — the outline, the key episodes, the sense of what it carries. They receive it the way each generation receives what the previous one hands forward: partially, selectively, in the version that survives the transmission. A few lines have gone in. You know which ones. You hope they stay.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 4; p.r += 3; p.setMem('ft31Manas', true) },
  },

  // ─── TAJIKISTAN ──────────────────────────────────────────────────────────────

  {
    id: 'ft31_pamiri_gbao_echo',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('taj_pamiri_identity') &&
      G.flags.has('taj_gbao_witness') &&
      G.age >= 50 &&
      !G.mem?.ft31PamiriGbao,
    text: 'The May 2022 operation in GBAO is in the body in the way that remembered violence is — not as a sequence of events but as a set of associations: the sound of a particular vehicle, the timing of something, the specific quality of a silence that means something specific. The Pamiri community continues. The continuity is its own form of statement. You are part of the continuity, which means the statement includes you.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 4; p.karma += 5; p.e += 3; p.setMem('ft31PamiriGbao', true) },
  },

  {
    id: 'ft31_civil_war_son',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('taj_civil_war_witness') &&
      G.children?.length > 0 &&
      G.age >= 40 &&
      !G.mem?.ft31CivilWarSon,
    text: 'Your child asks about the war. You have been answering this question differently at different ages of theirs — more when they were thirteen and curious, less when they were seventeen and the question became political, more now that they are adult enough to hold what you say with some care. What you say is a version. Not false, but partial. The parts you leave out are the parts that are still doing something in you that you have not finished with.',
    choices: [
      {
        text: 'You tell them more than you have before.',
        tag: 'taj_war_narrated',
        outcome: 'Some of it lands. Some of it will be understood differently when they are older. That is the nature of telling it.',
        effect: (p) => { p.addFlag('taj_war_narrated'); p.m += 6; p.karma += 5; p.r -= 3; p.setMem('ft31CivilWarSon', true) },
      },
      {
        text: 'You tell them the outline. The rest stays with you.',
        tag: 'taj_war_partial_telling',
        outcome: 'The outline is honest. The rest: you are still deciding whether the telling would be for you or for them.',
        effect: (p) => { p.addFlag('taj_war_partial_telling'); p.r += 5; p.m += 3; p.setMem('ft31CivilWarSon', true) },
      },
    ],
  },

  {
    id: 'ft31_russia_return',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('taj_russia_migrant') &&
      G.age >= 40 &&
      !G.mem?.ft31RussiaReturn,
    text: 'You have done the calculation more than once: years in Russia, money sent, cost to health and presence, what it has bought. The concrete floor added to the house. The school fees for three years. The daughter\'s wedding partly funded. The calculation comes out differently depending on what you count. If you count what you were absent for — the first steps, the harvest, the years — it comes out one way. If you count the concrete and the fees it comes out another. You have been doing both calculations simultaneously for years.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 3; p.e += 4; p.setMem('ft31RussiaReturn', true) },
  },

  // ─── UZBEKISTAN ──────────────────────────────────────────────────────────────

  {
    id: 'ft31_uzbek_thaw_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('uzb_thaw_generation') &&
      G.age >= 60 &&
      !G.mem?.ft31UzbThaw,
    text: 'Mirziyoyev has been in power since 2016. He released political prisoners and opened the economy and restored relations with Uzbekistan\'s neighbours, which Karimov had damaged systematically for decades. You have watched the opening with the specific wariness of someone who watched the closing. The mahalla committees are still there. The security services are still there. The fundamental architecture of the state has not changed. The air is different. Both things are true.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 3; p.setMem('ft31UzbThaw', true) },
  },

  {
    id: 'ft31_silk_road_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('uzb_silk_road_identity') &&
      G.age >= 60 &&
      !G.mem?.ft31SilkRoad,
    text: 'The Registan is a UNESCO World Heritage Site and gets several hundred thousand tourists per year now. People come from Germany, from Japan, from South Korea to photograph the tiles and the arches. You have watched your city become a destination — have watched the thing you grew up beside become something people cross the world to see. There is a specific kind of pride in this and a specific kind of dislocation. The tiles are the same tiles.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 4; p.karma += 3; p.setMem('ft31SilkRoad', true) },
  },

  // ─── KAZAKHSTAN ──────────────────────────────────────────────────────────────

  {
    id: 'ft31_qantar_decade_on',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('kaz_qantar_protester') || G.flags.has('kaz_qantar_witness')) &&
      G.age >= 55 &&
      !G.mem?.ft31Qantar,
    text: 'The word Qantar is still in the language, carried by the people who use it differently from the official use. The official use is "restored order." Your use is something else. The 238 dead have been counted and have not been accounted for. The 10,000 arrested have had their various outcomes. Some are free. Some are still in. The CSTO troops left. The country continues under Tokayev, who used the crisis to consolidate power in a way that Nazarbayev had not yet managed. You hold what you hold. The country continues.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 2; p.setMem('ft31Qantar', true) },
  },

  {
    id: 'ft31_steppe_language_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('kaz_steppe_identity') &&
      G.flags.has('kazakh_speaker') &&
      G.age >= 60 &&
      !G.mem?.ft31SteppeLang,
    text: 'The language that was almost gone is official now and mandatory now and the grandchildren speak it better than you spoke it at their age. The recovery is real and incomplete and continuing. You learned Kazakh from people who were also learning it, which means you carry a version of it that is itself a historical artifact — the Kazakh of the recovery years, not the Kazakh of before. Enough has been recovered to call it a language and a living one. You know what was not recovered. Both are true.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 5; p.r += 4; p.e += 3; p.setMem('ft31SteppeLang', true) },
  },

  // ─── CROSS-CUTTING ───────────────────────────────────────────────────────────

  {
    id: 'ft31_postwar_country_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('taj_postwar_generation') ||
       G.flags.has('kyr_independence_generation') ||
       G.flags.has('uzb_karimov_era')) &&
      G.age >= 65 &&
      !G.mem?.ft31PostwarLate,
    text: 'You have outlived the period that shaped you. The Cold War ended. The Soviet Union ended. The particular form of the world you were born into has been replaced by something different, which is also imperfect and which is also changing. You have watched more transitions than the previous generation and fewer than the next will watch. That seems like the accurate accounting of what it was to be your age in your century.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 5; p.karma += 4; p.e += 3; p.setMem('ft31PostwarLate', true) },
  },

  {
    id: 'ft31_remittance_final',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('taj_remittance_household') ||
       G.flags.has('uzb_russia_migrant') ||
       G.flags.has('taj_russia_migrant')) &&
      G.age >= 65 &&
      !G.mem?.ft31RemittFinal,
    text: 'The years of the remittance are done now or nearly done. What was built from them is concrete: the room added to the house, the education funded, the wedding held, the surgery that was possible. These things exist. The time that was traded for them also existed, differently. You are in the position of having to account for both at once, which is what late life asks — not whether the decision was right but what the decision was actually made of.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 5; p.karma += 5; p.e += 4; p.setMem('ft31RemittFinal', true) },
  },

]
