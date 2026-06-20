// BUILD 55 — Uyghur arc (BUILD 7: stateless peoples)
// Xinjiang: surveillance state post-2015, re-education camps 2017+, 1M+ detained.
// Pre-2015: language policy, Ramadan restrictions, passport confiscations.
// Diaspora: watching from abroad, impossibility of contact with family inside.

const IS_UYGHUR = (G) => G.character.ethnicity === 'uyghur'

export const UYGHUR_EVENTS = [
  {
    id: 'uyg_ramadan_restricted',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_UYGHUR(G) && G.currentYear >= 2000 && G.currentYear <= 2016 && G.age >= 16 && !G.mem.uygRamadan,
    text: 'Government employees and students are prohibited from fasting during Ramadan. The announcement arrives via work unit memo. You fast at home, carefully. The colleague who doesn\'t know you well enough asks if you want lunch. You say yes.',
    effect: (p) => { p.m -= 10; p.addFlag('learned_silence'); p.addFlag('uyghur_suppressed'); p.setMem('uygRamadan', true) },
  },
  {
    id: 'uyg_camp_era',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_UYGHUR(G) && G.currentYear >= 2017 && G.currentYear <= 2022 && !G.mem.uygCamp,
    text: 'The invitation for "vocational training" arrives for a relative. Or a neighbour. Or you. The camps are called Vocational Education and Training Centers in official language. The international press calls them something else. You stop calling your family in Kashgar because the calls are monitored and the monitoring is the message.',
    choices: [
      {
        text: 'Go quietly. Resistance makes it worse.',
        tag: 'complied',
        outcome: 'You return after months. You do not describe what happened. You have been trained not to describe it.',
        effect: (p) => { p.m -= 25; p.h -= 8; p.addFlag('uyghur_detained'); p.setMem('uygCamp', true) },
      },
      {
        text: 'Leave before the invitation becomes a summons.',
        tag: 'fled',
        outcome: 'Kazakhstan. Turkey. A third country if you can reach it. You leave with your phone number changed and tell no one who might be asked.',
        effect: (p) => { p.m -= 18; p.addFlag('uyghur_diaspora'); p.addFlag('emigrated'); p.setResidency('refugee_status'); p.setMem('uygCamp', true) },
      },
    ],
  },
  {
    id: 'uyg_diaspora_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('uyghur_diaspora') && G.age >= 30 && !G.mem.uygDiaSilence,
    text: 'Your mother\'s phone is disconnected. The last message from your brother was eleven months ago and was three sentences about the weather. You understand what three sentences about the weather means. The human rights organisation asks you to testify. Your name would be public. Your family is still inside.',
    choices: [
      {
        text: 'Testify. The silence protects no one.',
        tag: 'testified',
        outcome: 'Your name is in a report read by diplomats who do not act on it. Your family does not contact you again. You do not know if this is the cause.',
        effect: (p) => { p.m -= 15; p.karma += 10; p.addFlag('political_active'); p.setMem('uygDiaSilence', true) },
      },
      {
        text: 'Stay silent. Your family comes first.',
        tag: 'silent',
        outcome: 'You carry what you know without being able to say it. The specific weight of witnessed truth with no safe place to put it.',
        effect: (p) => { p.m -= 12; p.setMem('uygDiaSilence', true) },
      },
    ],
  },
]
