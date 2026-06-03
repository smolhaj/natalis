// BUILD 55 — Indonesia 1998: ethnic Chinese riots + Reformasi arc
// Chinese Indonesians: ~3% of population, ~70% of private sector wealth by 1998.
// May 13–15 1998: Jakarta, Solo, Medan. ~1,000 dead. Suharto resigns May 21.
// Chinese cultural expression banned since 1965 — 35 years of enforced invisibility.

const IS_CHINESE_INDONESIAN = (G) => G.character.ethnicity === 'chinese_indonesian'
const IS_INDONESIA = (G) => G.character.country?.name === 'Indonesia'

export const INDONESIA_EVENTS = [

  // ── FOLLOW-THROUGHS (written first per design rule) ──────────────────────

  {
    id: 'id98_decade_identity',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('jakarta_98_survived') && G.age >= 35 && !G.mem.id98IdentityDone,
    text: 'Wahid lifted the ban on Chinese cultural expression in 2000. That was years ago now. Your children want to take Mandarin classes at the community centre — the language you were raised to keep private, the one your parents half-forgot because there was no use for it in public. The *barongsai* dancers performed at the last Lunar New Year. You stood at the back of the crowd.',
    choices: [
      {
        text: 'Encourage them. That world should be theirs.',
        tag: 'encouraged',
        outcome: 'You drive them every Saturday. Something your parents never had is being rebuilt, one lesson at a time.',
        effect: (p) => { p.m += 8; p.addFlag('chinese_culture_returned'); p.setMem('id98IdentityDone', true) },
      },
      {
        text: 'Stay quiet about it. They can choose for themselves.',
        tag: 'quiet',
        outcome: 'You neither encourage nor discourage. The choice is theirs. You watch to see what they do.',
        effect: (p) => { p.setMem('id98IdentityDone', true) },
      },
      {
        text: 'You find yourself studying alongside them.',
        tag: 'study_too',
        outcome: 'The teacher is twenty-three years old and patient. You are forty-something and slower than your children at this. You go anyway.',
        effect: (p) => { p.m += 12; p.e += 3; p.addFlag('chinese_culture_returned'); p.setMem('id98IdentityDone', true) },
      },
    ],
  },

  {
    id: 'id98_telling_children',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('jakarta_98_survived') && G.children.length > 0 && G.age >= 42 && !G.mem.id98ToldChildren,
    text: 'Your child has a school project on Indonesian history in 1998. They ask you about it at dinner. They have already read something online. They want to know what you saw.',
    choices: [
      {
        text: 'Tell them everything.',
        tag: 'told_all',
        outcome: 'You talk for two hours. They listen. They ask questions you don\'t know how to answer. You tell them that too.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('id98ToldChildren', true) },
      },
      {
        text: 'Tell them the shape of it without the details.',
        tag: 'told_shape',
        outcome: 'You tell them it was frightening, that people were hurt, that things changed afterward. They seem to understand something was left out.',
        effect: (p) => { p.setMem('id98ToldChildren', true) },
      },
      {
        text: 'Say it was a long time ago.',
        tag: 'deflected',
        outcome: 'They look at you for a moment, then write something else down. You don\'t sleep well that night.',
        effect: (p) => { p.m -= 8; p.setMem('id98ToldChildren', true) },
      },
    ],
  },

  {
    id: 'id98_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('jakarta_98_survived') && G.age >= 60 && !G.mem.id98LateReckoning,
    text: 'Indonesia is a democracy now. It has been for twenty-five years. No one has been tried for what happened in May 1998. The official investigations concluded without convictions. You have lived in this country your whole life. Your children were born here.',
    effect: (p) => { p.m -= 4; p.addFlag('id98_reckoned'); p.setMem('id98LateReckoning', true) },
  },

  // ── ECONOMIC LEAD-UP ─────────────────────────────────────────────────────

  {
    id: 'id98_crisis_texture',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_INDONESIA(G) && G.currentYear >= 1997 && G.currentYear <= 1998 && !G.flags.has('jakarta_98_survived') && !G.flags.has('asian_crisis_generation'),
    text: 'The *rupiah* was 2,400 to the dollar in July. It is 17,000 now. The shelves at the shop your uncle runs are thinning. He cannot price in *rupiah* anymore — his suppliers want dollars, and dollars cost seven times what they did eight months ago. On the radio, the government is still talking about fundamentals.',
    effect: (p) => { p.m -= 8; p.w -= 5; p.addFlag('asian_crisis_personal') },
  },

  {
    id: 'id98_graffiti',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_CHINESE_INDONESIAN(G) && IS_INDONESIA(G) && G.currentYear === 1998 && G.flags.has('asian_crisis_personal') && !G.flags.has('id98_targeted_by_name'),
    text: 'Someone has written on the wall outside the shop. *Cina pulang* — Chinese go home. Your family has been in this city for three generations. You were born in this neighbourhood. You paint over it the same evening, before your mother sees.',
    effect: (p) => { p.m -= 12; p.addFlag('id98_targeted_by_name') },
  },

  // ── THE RIOTS ─────────────────────────────────────────────────────────────

  {
    id: 'id98_riot_night',
    phase: 'young_adult',
    weight: 5,
    when: (G) => IS_CHINESE_INDONESIAN(G) && IS_INDONESIA(G) && G.currentYear === 1998 && G.flags.has('id98_targeted_by_name') && !G.flags.has('jakarta_98_survived'),
    text: 'The smoke is visible from three streets away. You know which shops are burning — you can tell by the direction. The phone lines are jammed. You don\'t know where your cousin is. The street outside your building is quiet, then briefly not, then quiet again.',
    choices: [
      {
        text: 'Lock the doors and wait.',
        tag: 'stayed',
        outcome: 'The building holds. By morning the street is ash and broken glass and then, strangely, ordinary again. You count people you can\'t reach.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('jakarta_98_survived') },
      },
      {
        text: 'Go to a neighbour\'s — they offered.',
        tag: 'sheltered',
        outcome: 'A Javanese family three doors down takes you in. You sleep on their floor. You have known them for years and this is the first time you have eaten together.',
        effect: (p) => { p.m -= 10; p.karma += 6; p.addFlag('jakarta_98_survived') },
      },
      {
        text: 'Try to reach family across the city.',
        tag: 'moved',
        outcome: 'You see things on the way that you do not describe afterward. You find your family. You all stay together for a week.',
        effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('jakarta_98_survived') },
      },
    ],
  },

  // ── SUHARTO AND REFORMASI ─────────────────────────────────────────────────

  {
    id: 'id98_suharto_falls',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_INDONESIA(G) && G.currentYear === 1998 && G.flags.has('asian_crisis_personal') && !G.flags.has('reformasi_generation'),
    text: 'May 21. Suharto reads a statement on television. After thirty-two years, he is resigning. Students are on the roof of parliament. The word that is already on everyone\'s lips is *reformasi* — reform. You don\'t know yet what it will mean.',
    effect: (p) => { p.m += 10; p.addFlag('reformasi_generation') },
  },

  {
    id: 'id98_aftermath_rebuild',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_CHINESE_INDONESIAN(G) && IS_INDONESIA(G) && G.flags.has('jakarta_98_survived') && G.currentYear >= 1998 && G.currentYear <= 2001 && !G.flags.has('id98_rebuilt') && !G.flags.has('id98_emigrated'),
    text: 'The shop is damaged, or gone, or untouched by luck of geography. The insurance company is slow. A government commission has been established to investigate. The first decision is whether to rebuild.',
    choices: [
      {
        text: 'Rebuild. This is your city.',
        tag: 'rebuilt',
        outcome: 'It takes two years and most of what you had saved. You reopen. You do not put the family name on the sign this time.',
        effect: (p) => { p.mo -= 8000; p.m += 5; p.addFlag('id98_rebuilt') },
      },
      {
        text: 'Sell what remains and go.',
        tag: 'emigrated',
        outcome: 'Singapore, Australia, the United States — the community has spread across every city with a university and an airport. You join them.',
        effect: (p) => { p.addFlag('id98_emigrated'); p.addFlag('emigrated'); p.setResidency('work_visa') },
      },
      {
        text: 'Stay but do not rebuild. Work for someone else.',
        tag: 'stayed_changed',
        outcome: 'The decision not to rebuild is its own kind of grief. You stay. The neighbourhood changes around you over the years.',
        effect: (p) => { p.m -= 8; p.addFlag('id98_rebuilt') },
      },
    ],
  },

  // ── CULTURAL BAN LIFTED ───────────────────────────────────────────────────

  {
    id: 'id98_ban_lifted',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_CHINESE_INDONESIAN(G) && IS_INDONESIA(G) && G.flags.has('jakarta_98_survived') && G.currentYear >= 2000 && G.currentYear <= 2004 && !G.mem.id98BanLifted,
    text: 'The ban on Chinese cultural expression — in place since 1965, thirty-five years — has been lifted. A *barongsai* lion dance performs in the street at Lunar New Year. The last time this happened in public, your parents were young. You watch people film it on their phones.',
    effect: (p) => { p.m += 15; p.addFlag('chinese_culture_returned'); p.setMem('id98BanLifted', true) },
  },

  // ── BYSTANDER EVENT (for non-Chinese Indonesians) ─────────────────────────

  {
    id: 'id98_bystander',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_INDONESIA(G) && !IS_CHINESE_INDONESIAN(G) && G.currentYear === 1998 && G.flags.has('asian_crisis_personal') && !G.mem.id98BystStander,
    text: 'On Jalan Gajah Mada, a shop is on fire. A group of young men is moving from building to building. A family is standing in a doorway watching. You know who is being targeted and who is not. You have never thought about that distinction before — it has never been the organising fact of a Tuesday afternoon.',
    choices: [
      {
        text: 'Help the family get to safety.',
        tag: 'helped',
        outcome: 'You lead them through the back of the market. They do not speak much. You don\'t either. You don\'t see them again.',
        effect: (p) => { p.karma += 15; p.m -= 5; p.addFlag('id98_witness_bystander'); p.setMem('id98BystStander', true) },
      },
      {
        text: 'Watch. There is nothing you can do.',
        tag: 'watched',
        outcome: 'You stand at the edge of what is happening and do not enter it. This is what most people do. You think about it for a long time afterward.',
        effect: (p) => { p.m -= 10; p.setMem('id98BystStander', true) },
      },
    ],
  },
]
