// events_followthrough_69.js
// Follow-through events for Bangladesh depth flags.

export const FOLLOWTHROUGH_69_EVENTS = [

  // ── EKUSHEY GENERATION ────────────────────────────────────────────────────

  {
    id: 'ft69_ekushey_international',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_ekushey_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 30 &&
      !G.mem?.ft69EkusheyIntl,
    text: 'UNESCO declared February 21 as International Mother Language Day in 1999. The day that was only Bangladesh\'s grief — the students shot at Dhaka University in 1952 for the right to speak their own language — is now a global observance. You learn this and you feel something complicated: the loss is universal now, which is a form of recognition, and the recognition makes the specific grief simultaneously larger and smaller.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 3
      p.setMem('ft69EkusheyIntl', true)
    },
  },

  {
    id: 'ft69_ekushey_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('bng_ekushey_generation') &&
      G.age >= 55 &&
      !G.mem?.ft69EkusheyLate,
    text: 'February 21. The Shaheed Minar is covered in flowers before dawn. People come barefoot in the morning cold. You know the names: Rafiquddin, Barkat, Jabbar, Salauddin. The names are the foundation of the country. The country built on those names has done what it has done — both the Liberation War and the coup and the garments and the floods and the recovery — and is still built on those names. The names hold.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.setMem('ft69EkusheyLate', true)
    },
  },

  // ── 1988 FLOOD GENERATION ─────────────────────────────────────────────────

  {
    id: 'ft69_floods_climate_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_1988_flood_generation') &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      !G.mem?.ft69FloodClimate,
    text: 'The floods were bad in 1988 and 1998 and 2004 and 2007 and they are getting worse. The Bay of Bengal is warmer. The sea level is rising. The salinity is advancing into the river delta. The climate scientists say what is coming in the decades ahead and you do not need the scientists to tell you: you watched the 1988 water and you know what water does to a country that is mostly delta. The question is not whether it happens. The question is whether the country is still there for it to happen to.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft69FloodClimate', true)
    },
  },

  // ── CHT GENERATION ────────────────────────────────────────────────────────

  {
    id: 'ft69_cht_accord_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_cht_generation') &&
      G.currentYear >= 1998 &&
      G.age >= 30 &&
      !G.mem?.ft69CHTAccord,
    text: 'The CHT Peace Accord was signed in December 1997. The Regional Council was established. The Bengali settlers were supposed to be relocated. The relocation did not happen. The army remained. The Jumma peoples are still a minority in land that was theirs. The accord gave a name to the region\'s autonomy without giving the substance of it. You have had twenty-five years to watch what a partial accord produces. What it produces is a situation that is better than the armed conflict and worse than what the Jumma peoples were promised.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft69CHTAccord', true)
    },
  },

  // ── ROHINGYA HOST GENERATION ──────────────────────────────────────────────

  {
    id: 'ft69_rohingya_years',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_rohingya_host_generation') &&
      G.currentYear >= 2022 &&
      G.age >= 40 &&
      !G.mem?.ft69RohingyaYears,
    text: 'The Rohingya have been in the camps for five years, then seven. The repatriation negotiations with Myanmar have produced nothing. The conditions in the camp are what long-term camp conditions become: the children who have grown up knowing nothing but the camp, the education system built inside it, the economies that develop when a temporary situation becomes permanent. Bangladesh is hosting a million people without a solution. The world\'s attention moved on. The million people did not.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft69RohingyaYears', true)
    },
  },

  // ── RANA PLAZA WITNESS ────────────────────────────────────────────────────

  {
    id: 'ft69_rana_compensation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_rana_plaza_witness') &&
      G.currentYear >= 2016 &&
      G.age >= 25 &&
      !G.mem?.ft69RanaComp,
    text: 'The Rana Plaza Arrangement — the compensation fund for survivors and victims\' families — closed in 2015. It paid out $30 million. The Primark and H&M and Walmart that sourced from the building contributed to the fund. The contributions were voluntary; some brands contributed, some did not, some contributed less than they could have. The building that killed 1,134 people produced a compensation framework. The framework was real. It was not proportionate to what happened. Both things are true.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft69RanaComp', true)
    },
  },

  // ── BKASH GENERATION ─────────────────────────────────────────────────────

  {
    id: 'ft69_bkash_remittance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_bkash_generation') &&
      G.flags.has('bng_remittance_generation') &&
      G.age >= 35 &&
      !G.mem?.ft69BkashRemit,
    text: 'The remittance from Malaysia that used to take three days through the hawala network now arrives in the bKash account in forty-five minutes. The fee is lower. The exchange rate is better. The person who receives it in the village does not need to go to a bank branch that may not exist within five kilometres. The infrastructure of moving money home — the physical infrastructure of the hawala agent, the commission, the wait — collapsed into a phone and an app. This is one of the genuine revolutions.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.w += 2
      p.setMem('ft69BkashRemit', true)
    },
  },

]
