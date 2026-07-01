// events_followthrough_75.js
// Follow-through events for Cuba depth (events_cuba_depth.js):
// cub_missile_crisis_generation, cub_nueva_trova_generation, cub_doctor_export,
// cub_dual_currency_era, cub_exit_visa_era, cub_education_generation,
// cub_elian_generation, cub_lgbtq_suppression, cub_cultural_conformity,
// cub_rural_tobacco
// Also: Nigeria depth follow-throughs for nga_dep_japa_generation,
// nga_dep_endsars_generation, nga_dep_nollywood_generation

export const FOLLOWTHROUGH_75_EVENTS = [

  // ── CUBA: MISSILE CRISIS GENERATION ──────────────────────────────────────

  {
    id: 'ft66_missile_crisis_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cub_missile_crisis_generation') &&
      G.age >= 50 &&
      !G.mem?.ft66MissileLateCuba,
    text: 'You were on the island during the thirteen days. The Americans and Soviets negotiated over your island — which is to say they negotiated about it as though the million and a half Cubans on it were part of the strategic calculation rather than the people the calculation was about. Kennedy\'s speech, the photographs of the installations, the Soviet ships turning back. What you remember is the anti-aircraft battery at the edge of the town and the specific sound of Castro\'s broadcast voice in the evenings. The historians have written extensively about October 1962. They write about it from capitals. Your version is from inside the thing they are describing.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft66MissileLateCuba', true)
    },
  },

  // ── CUBA: NUEVA TROVA GENERATION ──────────────────────────────────────────

  {
    id: 'ft66_nueva_trova_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cub_nueva_trova_generation') &&
      G.age >= 35 &&
      !G.mem?.ft66NuevaTrovaMid,
    text: 'The songs hold up. This is what you notice when you hear them again — in a different decade, in circumstances Silvio or Pablo could not have anticipated when they wrote them. The ambivalence in the music was genuine ambivalence and the Revolution\'s changes have made some of it more legible and some of it less. The songs that seemed political in 1972 seem personal now and the songs that seemed personal then seem political now. They were always both. The clarity is only available in retrospect.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 2
      p.setMem('ft66NuevaTrovaMid', true)
    },
  },

  // ── CUBA: DOCTOR EXPORT ────────────────────────────────────────────────────

  {
    id: 'ft66_doctor_mission_return',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('cub_doctor_export') &&
      G.age >= 35 &&
      !G.mem?.ft66DoctorReturn,
    text: 'Back from the mission. The country you were sent to is somewhere in the file. The country you returned to is the same country with three years removed from your domestic life: your children are taller, your parents older, your neighbourhood changed in the small ways that accumulate to something significant when you see them all at once. Your patients here are different from your patients there. Both are real patients. The medicine is the same medicine. The politics attached to where you were and what you were doing there is something you have mostly stopped explaining, because the explanation requires more context than most conversations have room for.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.e += 3
      p.setMem('ft66DoctorReturn', true)
    },
  },

  // ── CUBA: DUAL CURRENCY RECKONING ─────────────────────────────────────────

  {
    id: 'ft66_dual_currency_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cub_dual_currency_era') &&
      G.character?.country?.name === 'Cuba' &&
      G.currentYear >= 2022 &&
      G.age >= 35 &&
      !G.mem?.ft66DualCurrencyLate,
    text: 'The unification of the currencies in January 2021 was supposed to simplify the arithmetic. What it produced instead was a devaluation of state-sector salaries by the factor that had previously been the gap. The gap is still there, now visible in inflation instead of exchange rates. The informal dollar economy is still there, operating in USD and occasionally USDT. The two Cubas are still there. The accounting has new columns but the same totals.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.w -= 4
      p.setMem('ft66DualCurrencyLate', true)
    },
  },

  // ── CUBA: EXIT VISA RECKONING ─────────────────────────────────────────────

  {
    id: 'ft66_exit_visa_2013',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cub_exit_visa_era') &&
      G.character?.country?.name === 'Cuba' &&
      G.currentYear >= 2013 &&
      G.age >= 30 &&
      !G.mem?.ft66ExitVisa2013,
    text: 'January 14, 2013. The tarjeta blanca is abolished. For the first time since the early 1960s, Cubans can apply for a passport and leave without the state\'s prior permission. The reform comes from Raúl, not as an admission of what the system was, but as an administrative modernization. What happens on January 14: nothing visible. What has changed: the relationship between you and the exit door. The door is still expensive and still complicated. It is no longer locked by the state from the outside. The distinction is political and also specific and real.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.setMem('ft66ExitVisa2013', true)
    },
  },

  // ── NIGERIA: ENDSARS GENERATION LATE ──────────────────────────────────────

  {
    id: 'ft66_endsars_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('nga_dep_endsars_generation') || G.flags.has('endsars_generation')) &&
      G.currentYear >= 2023 &&
      G.age >= 28 &&
      !G.mem?.ft66EndSarsMid,
    text: 'The SARS unit was officially dissolved five times between 2017 and 2020. Each dissolution was followed by reconstitution under a different name. After Lekki, SARS became SWAT. SWAT has been accused of the same practices. The specific lesson October 20, 2020 taught your generation — that the state would fire on unarmed protesters — has not been superseded by a different lesson. It sits in the record. You are now old enough to watch the next generation arrive at the same lesson by the same means, and you carry the specific fatigue of someone who has already paid this tuition.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft66EndSarsMid', true)
    },
  },

  // ── NIGERIA: JAPA GENERATION LATE ─────────────────────────────────────────

  {
    id: 'ft66_japa_abroad_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_japa_generation') &&
      G.currentYear >= 2025 &&
      G.age >= 30 &&
      !G.mem?.ft66JapaLate,
    text: (G) => {
      if (G.flags.has('nga_diaspora') || G.flags.has('emigrated')) {
        return 'The country you left is being run by people who were not your generation\'s choice. The group chat is still going. Someone in Lagos sends the current exchange rate as though it is news, which it is. You have been abroad long enough that the exchange rate is now income rather than loss — the naira weakening is the dollar strengthening, and the dollar is what your salary is in. The moral arithmetic of this you have thought about and will continue to think about. The practical arithmetic is what it is.'
      }
      return 'Your generation is the statistical record of the japa wave. The OECD has data on Nigerian emigration by year and skill level. You are in the data as either a departure or a stay. The stayed are now doing the work the departed would have done, stretched across the gap the departures left. The departed are doing the work their adopted countries need, in cities that received them with varying degrees of welcome. The country that produced both of you is running on remittances and whatever was left after the count.'
    },
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 2
      p.setMem('ft66JapaLate', true)
    },
  },

  // ── NIGERIA: NOLLYWOOD GENERATION LATE ────────────────────────────────────

  {
    id: 'ft66_nollywood_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_nollywood_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 30 &&
      !G.mem?.ft66NollywoodMid,
    text: 'Nollywood is now on Netflix. The films that were bought from roadside VCD sellers are on a streaming platform with 200 million subscribers. Genevieve Nnaji\'s "Lionheart" was the first. The production values have changed. The budgets have changed. What has not changed: the industry is still Nigerian in the specific way it has always been Nigerian, about the things Nigerian life is about, told from the inside. The audience is now global. The inside is still the inside. You watch the new ones with the same attention you gave the old ones and sometimes the films are the same film told with better lighting.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 2
      p.setMem('ft66NollywoodMid', true)
    },
  },

  // ── CUBA: EDUCATION GENERATION LATE ───────────────────────────────────────

  {
    id: 'ft66_cuba_education_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cub_education_generation') &&
      G.age >= 50 &&
      !G.mem?.ft66CubaEducLate,
    text: 'The education the Revolution gave you is real. The doctor, the engineer, the teacher, the biologist — the credentials are from a system that produced them at a rate the country\'s economy could not absorb, which is why the doctors went to Angola and Venezuela and Haiti, why the engineers went to wherever they were sent, why the teachers taught in provinces they had not heard of at eighteen. The education and the limitation are from the same source. You are educated beyond what your country can pay you for. This is the specific paradox of the Cuban professional class: made by the Revolution, underutilised by the Revolution, valued by the world outside the Revolution.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft66CubaEducLate', true)
    },
  },

]
