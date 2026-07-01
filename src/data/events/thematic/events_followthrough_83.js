// events_followthrough_83.js — Netherlands depth arc follow-throughs

export const FOLLOWTHROUGH_83_EVENTS = [

  // ── nl_jodendeportatie_witness ─────────────────────────────────────────────

  {
    id: 'ft83_dodenherdenking',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_jodendeportatie_witness') &&
      G.currentYear >= 1965 && G.currentYear <= 2000 &&
      G.age >= 30 &&
      !G.mem?.ft83Dodenherdenking,
    text: 'May 4. The National Remembrance Day. Two minutes of silence at 8pm — the whole country stops, the trams stop, the radio stops. You have done this every year since you can remember. As a child it was the silence of adults that impressed itself on you; now you are the adult in the silence and the names you are thinking of are specific. The gap in the street. The daughter who played on the steps. You never knew her name. The silence is partly for that.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.karma += 3
      p.setMem('ft83Dodenherdenking', true)
    },
  },

  {
    id: 'ft83_jodendeportatie_restitution',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('nl_jodendeportatie_witness') &&
      G.currentYear >= 1995 &&
      G.age >= 50 &&
      !G.mem?.ft83JodenRestitution,
    text: 'The Dutch restitution committees work through the 1990s and 2000s: looted Jewish property, the art that went to Germany, the bank accounts seized and never returned. The process takes decades and is never complete. What the families who survived receive is not what was taken. What it represents is that someone counted. The counting is not nothing. It is also not what happened to the people.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 3
      p.setMem('ft83JodenRestitution', true)
    },
  },

  // ── nl_same_sex_pioneer_2001 ───────────────────────────────────────────────

  {
    id: 'ft83_same_sex_world_follows',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_same_sex_pioneer_2001') &&
      G.currentYear >= 2003 && G.currentYear <= 2016 &&
      G.age >= 25 &&
      !G.mem?.ft83SameSexWorldFollows,
    text: 'Belgium in 2003. Spain in 2005. Canada in 2005. South Africa in 2006. Norway, Sweden, Portugal, Iceland, Argentina, Denmark, France, New Zealand, England, Luxembourg, Ireland, the United States. The countries follow. Not all of them. Not easily. The Netherlands was first and is now one among several. The word "first" no longer applies in the same way. Being first was temporary. The marriages were permanent.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft83SameSexWorldFollows', true)
    },
  },

  // ── nl_toeslagen_family ────────────────────────────────────────────────────

  {
    id: 'ft83_toeslagen_compensation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_toeslagen_family') &&
      G.currentYear >= 2021 &&
      G.age >= 30 &&
      !G.mem?.ft83ToeslagenCompensation,
    text: 'The Hersteloperatie — the restoration operation. You receive a letter saying you are entitled to 30,000 euros as an initial payment for unlawful harm caused by the childcare benefit fraud investigation. The process for determining the full amount is ongoing. There are 26,000 families in this process. The processing takes years beyond the cabinet resignation. The money begins to arrive. The decade that went missing before it does not arrive with it.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 5
      p.mo += 30000
      p.setMem('ft83ToeslagenCompensation', true)
    },
  },

  // ── nl_groningen_earthquake_affected ──────────────────────────────────────

  {
    id: 'ft83_groningen_gas_stop',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_groningen_earthquake_affected') &&
      G.currentYear >= 2023 &&
      G.age >= 45 &&
      !G.mem?.ft83GroningenStop,
    text: 'The Dutch government announces that gas extraction from the Groningen field will end. The field that made the Netherlands wealthy in the 1960s and funded the welfare state is being shut down. The earthquakes have cracked enough houses and the political will has finally exceeded the gas price. For those who live above the field: the cracks remain. The compensation process continues. The gas is no longer being taken. The houses are not fixed.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.m += 2
      p.setMem('ft83GroningenStop', true)
    },
  },

  // ── nl_bersiap_family_memory ───────────────────────────────────────────────

  {
    id: 'ft83_bersiap_2022_report',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_bersiap_family_memory') &&
      G.currentYear >= 2022 &&
      G.age >= 55 &&
      !G.mem?.ft83BersiapReport,
    text: '2022. The Dutch government publishes a report on the colonial war in the Dutch East Indies after 1945. The words in the report are "systematic and extreme violence." The Prime Minister apologizes in Jakarta and The Hague simultaneously. Your grandfather has been dead for years. The apology is directed at people who were harmed, not at the grandchildren of those who caused the harm. But the report exists. The words in the report are the government\'s words about what your grandfather did. This is the first time that sentence has been officially true.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.karma += 5
      p.setMem('ft83BersiapReport', true)
    },
  },

]
