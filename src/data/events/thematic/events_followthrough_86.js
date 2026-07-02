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
    text: 'The Truth and Reconciliation Commission releases its final report in 2015. Ninety-four calls to action. The word "genocide" used in the executive summary. You give testimony, or you do not give testimony, but the testimony exists — six thousand survivors spoke to the Commission over six years. Justice Murray Sinclair says: "Education is what got us into this mess — and education will get us out." You heard him say this. You know what he meant by education, on both sides of it.',
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
    text: 'September 22, 1988. Mulroney reads the apology in the House of Commons. Twenty-one thousand dollars to each survivor of the internment. The Japanese Canadian Redress Agreement — the result of years of organizing by the National Association of Japanese Canadians. You are in the House gallery or you are watching on television or you are told about it. The word "apology" in Parliament, for what P.C. 1486 did. The twenty-one thousand dollars is not the property, is not the fishing boat, is not the years. It is what the government agreed to call the acknowledgement.',
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
    text: 'The referendums: 1980 and 1995. You voted in both or one or neither, depending on where you were and which side of the question you were on. The 1995 result: 49.4% Yes, 50.6% No. Forty-nine thousand votes. Parizeau says it was "money and the ethnic vote." The province you built through the Quiet Revolution is both what Quebec is now and the question of what Quebec will become. The question is not resolved. It is managed, which is a Canadian answer to a question that other countries would answer differently.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
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
    text: 'The price of oil drops below the cost of extraction from the oil sands in late 2014. The camp begins to empty in 2015. You have seen this before in smaller versions — the price cycles, the layoffs, the job board that goes from full to empty in a month. What is different this time is the scale and the speed. Fort McMurray in the bust is the portrait of what a resource economy looks like when the resource price moves. The province runs a deficit. The rage turns toward Ottawa. You watch it from whatever place the camp deposited you when it emptied.',
    choices: null,
    effect: (p) => {
      p.mo -= 15000
      p.m -= 5
      p.r += 5
      p.setMem('ft86OilSandsBust', true)
    },
  },

]
