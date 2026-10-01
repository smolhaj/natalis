// events_followthrough_86.js — Canada depth arc follow-throughs

export const FOLLOWTHROUGH_86_EVENTS = [

  // ── can_residential_school_survivor ──────────────────────────────────────

  {
    id: 'ft86_residential_school_family_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('can_residential_school_survivor') &&
      G.currentYear >= 1970 &&
      G.age >= 30 &&
      !G.mem?.ft86ResSchoolSilence,
    text: 'What you did not tell your children: what the school was. Not because you wanted to protect them — though you did — but because the language for it does not come easily, and because what you carry from those years is not a story you can tell in the form of a story. It is a weight distributed across behaviour, across what you could and could not offer, across the ways your children grew up knowing something had happened without knowing what. The silence passed to them is its own inheritance.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft86ResSchoolSilence', true)
    },
  },

  {
    id: 'ft86_residential_school_trc_moment',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('can_residential_school_survivor') &&
      G.currentYear >= 2015 &&
      G.age >= 55 &&
      !G.mem?.ft86ResSchoolTRC,
    text: 'The commission publishes its final report in 2015: ninety-four calls to action, and in the summary the word genocide. You spoke to it, or you did not, but the testimony exists. Murray Sinclair says that education is what got us into this mess and education will get us out. You know what he meant by education, from both sides of it.',
    context: 'Over six years the Truth and Reconciliation Commission heard from more than 6,000 witnesses, most of them residential school survivors.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 5
      p.setMem('ft86ResSchoolTRC', true)
    },
  },

  // ── can_japanese_internment_generation ───────────────────────────────────

  {
    id: 'ft86_japanese_internment_redress_1988',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('can_japanese_internment_generation') &&
      G.currentYear >= 1988 &&
      G.age >= 50 &&
      !G.mem?.ft86JapRedress,
    text: 'September 22, 1988, and the prime minister reads the apology in the House of Commons, with twenty-one thousand dollars for each survivor of the internment, after years of organising. You are in the gallery, or watching on television, or told about it afterwards. The money is not the house, not the fishing boat, not the years. It is what the government agreed to call acknowledgement.',
    choices: null,
    effect: (p) => {
      p.mo += 21000
      p.m += 5
      p.r += 4
      p.setMem('ft86JapRedress', true)
    },
  },

  // ── can_quiet_revolution_generation ──────────────────────────────────────

  {
    id: 'ft86_quiet_revolution_sovereignty_referenda',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('can_quiet_revolution_generation') &&
      G.currentYear >= 1980 && G.currentYear <= 2000 &&
      G.age >= 35 &&
      !G.mem?.ft86QuietRevRef,
    text: '1980, and 1995. In 1995 it comes down to fewer than fifty thousand votes, and Parizeau blames money and the ethnic vote. The Quebec your generation built in the Quiet Revolution is both what the province is and the question of what it will become. The question is not resolved. It is managed, which is a Canadian kind of answer.',
    context: 'The 1995 Quebec referendum on sovereignty failed by 50.6 per cent to 49.4 per cent.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft86QuietRevRef', true)
    },
  },

  // ── can_bathhouse_raids_generation ───────────────────────────────────────

  {
    id: 'ft86_bathhouse_aids_years',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('can_bathhouse_raids_generation') &&
      G.currentYear >= 1984 && G.currentYear <= 1996 &&
      G.age >= 25 &&
      !G.mem?.ft86BathhouseAids,
    text: 'The community that organized after the 1981 raids is the community that faces AIDS four years later. The timing is not coincidence in the sense that the organizing capacity built in the winter of 1981 is the same capacity that builds the community health organizations, the buddy systems, the harm reduction programs, the ACT UP chapters. The crisis produces its own community. The community had been producing itself since February 5, 1981. You know both dates.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.karma += 4
      p.setMem('ft86BathhouseAids', true)
    },
  },

  // ── can_oil_sands_worker ──────────────────────────────────────────────────

  {
    id: 'ft86_oil_sands_bust',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('can_oil_sands_worker') &&
      G.currentYear >= 2015 &&
      G.age >= 35 &&
      !G.mem?.ft86OilSandsBust,
    text: 'In late 2014 the oil price falls below what it costs to get it out of the sands, and by 2015 the camp is emptying. You have seen smaller versions of this, the job board full and then empty within a month. This time it is bigger and faster. The province runs a deficit and the anger turns toward Ottawa. You watch it from wherever the camp put you down when it closed.',
    choices: null,
    effect: (p) => {
      p.mo -= 15000
      p.m -= 5
      p.r += 5
      p.setMem('ft86OilSandsBust', true)
    },
  },

]
