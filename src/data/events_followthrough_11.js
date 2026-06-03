// events_followthrough_11.js
// Follow-through events for 5 orphaned major flags:
//   institutional_complicity — Catholic priest who knew and stayed silent
//   debt_bankrupt            — bankruptcy record, credit rebuild years after
//   earthquake_family_loss   — Haiti earthquake anniversary grief
//   kurd_militant_adjacent   — Kurdish character under Turkish state pressure
//   id98_witness_bystander   — bystander to 1998 Indonesia anti-Chinese riots

export const FOLLOWTHROUGH_11_EVENTS = [

  // ── INSTITUTIONAL COMPLICITY ─────────────────────────────────────────────

  {
    id: 'ft11_institutional_reckoning_news',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_complicity') &&
      G.age >= 45 &&
      !G.flags.has('institutional_reckoning'),
    text: 'A survivor is named in the news. Then another. The commission\'s findings run to four hundred pages and you do not need to read them to know what they contain. The silence you kept was practical — you told yourself it was pastoral — and now it has a public name. You sit with the newspaper until the light changes.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.karma -= 10
      p.addFlag('institutional_reckoning')
    },
  },

  // ── DEBT BANKRUPTCY: CREDIT RECORD ───────────────────────────────────────

  {
    id: 'ft11_debt_credit_record',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('debt_bankrupt') &&
      G.mem?.debt_bankruptYear &&
      (G.currentYear - G.mem.debt_bankruptYear >= 3) &&
      !G.flags.has('debt_rebuilt_credit') &&
      G.age >= 22,
    text: 'The bankruptcy is behind you now — three years, five, depending on when you count from. The credit record still reads it clearly. You have been turned down for a lease twice. The secured card you carry has a two-hundred-dollar limit and an annual fee that arrives like an insult. People talk about fresh starts. You are learning what the fine print of a fresh start actually looks like.',
    choices: [
      {
        text: 'Keep renting, keep waiting for the seven years to clear.',
        tag: 'debt_patience',
        outcome: 'You wait. The record is old enough now to be fading at the edges. Another year.',
        effect: (p) => {
          p.addFlag('debt_patience')
          p.m -= 4
        },
      },
      {
        text: 'Take the predatory credit card offer. Start rebuilding.',
        tag: 'debt_rebuilt_credit',
        outcome: 'The interest rate is twenty-nine percent. You pay the full balance every month, which is the only way this works. After eighteen months, a second card arrives unsolicited. The score has moved.',
        effect: (p) => {
          p.mo -= 300
          p.addFlag('debt_rebuilt_credit')
          p.m -= 2
          p.w += 2
        },
      },
    ],
  },

  // ── EARTHQUAKE FAMILY LOSS: ANNIVERSARY ──────────────────────────────────

  {
    id: 'ft11_earthquake_anniversary',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('earthquake_family_loss') &&
      G.age >= 20 &&
      !G.flags.has('earthquake_grief_resolved'),
    text: 'The anniversary of the earthquake comes back every January. You know it by the light, the specific flat grey of the twelfth, before you have checked the date. You still have the rosary your aunt pressed into your hand the last time you visited — a small plastic thing, blue beads, worth nothing except that she touched it. You take it from the drawer in the morning and put it back before work.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.addFlag('earthquake_grief_resolved')
    },
  },

  // ── KURD MILITANT ADJACENT: STATE PRESSURE ───────────────────────────────

  {
    id: 'ft11_kurd_state_pressure',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('kurd_militant_adjacent') &&
      G.currentCountry?.name === 'Turkey' &&
      G.age >= 20 &&
      !G.flags.has('kurd_state_pressure'),
    text: 'A man comes to the neighborhood asking questions — to your neighbor first, then to a cousin. A name that is close to yours came up somewhere. Your neighbor was held for two days and came back quieter. You know the distinction the state makes between being asked about and being named does not always mean what you think it means.',
    choices: [
      {
        text: 'Deny everything. Cooperate with the inquiry.',
        tag: 'kurd_surveillance_subject',
        outcome: 'You answer the questions carefully. You are released the same afternoon. You do not know what they wrote down.',
        effect: (p) => {
          p.m -= 10
          p.addFlag('kurd_state_pressure')
          p.addFlag('kurd_surveillance_subject')
        },
      },
      {
        text: 'Leave Turkey before they come to you directly.',
        tag: 'kurd_fled_state_pressure',
        outcome: 'You leave quickly, without a story prepared. The word asylum sits in the processing office like a stone. You have never used it about yourself before.',
        effect: (p) => {
          p.addFlag('kurd_state_pressure')
          p.addFlag('emigrated')
          p.setResidency('asylum_seeker')
          p.m -= 8
        },
      },
    ],
  },

  // ── ID98 WITNESS BYSTANDER: LATE RECKONING ───────────────────────────────

  {
    id: 'ft11_id98_late_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('id98_witness_bystander') &&
      G.age >= 40 &&
      !G.flags.has('id98_late_reckoning'),
    text: 'It has been years. The trials that were promised did not come. The men who organized what happened in May 1998 went into politics, gave speeches, had buildings named after them. You saw what you saw from your window — the smoke, the direction people were running, the specific moment you decided to step back from the glass. The account you could have given is still inside you, uncollected.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.karma -= 5
      p.addFlag('id98_late_reckoning')
    },
  },

]
