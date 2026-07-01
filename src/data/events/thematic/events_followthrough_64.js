// events_followthrough_64.js
// Follow-through events for:
//   - Japan depth (events_japan_depth.js): okinawa_battle_generation,
//     jpn_confronted_history, jpn_women_career, jpn_fukushima_evacuee
//   - Oral tradition (events_oral_tradition.js): oral_displacement_considered,
//     oral_soldiers_passed

export const FOLLOWTHROUGH_64_EVENTS = [

  // ── OKINAWA BATTLE GENERATION ────────────────────────────────────────────

  {
    id: 'ft64_okinawa_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('okinawa_battle_generation') &&
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1960 && G.currentYear <= 1975 &&
      G.age >= 35 &&
      !G.mem?.ft64OkinawaMidlife,
    text: 'Your children are studying the war in school. You sit at the table while they do their homework. The textbook has a chapter called "The Pacific War." You turn to the section on Okinawa and read it. It says: heavy fighting, civilians killed, 1945. It does not say about the grenades. It does not say about the orders. You close the textbook and your child asks you something. You answer a different question than the one they asked.',
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 4
      p.setMem('ft64OkinawaMidlife', true)
    },
  },

  {
    id: 'ft64_okinawa_textbook',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('okinawa_battle_generation') &&
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2000 &&
      G.age >= 65 &&
      !G.mem?.ft64OkinawaTextbook,
    text: 'There is a national controversy about what the Okinawa textbooks say. In 2007 the Ministry of Education instructs publishers to revise the chapter — removing the sentence that the Japanese military ordered civilians to commit suicide. Okinawa prefectural assembly protests. 110,000 people gather at Ginowan Park in September 2007, the largest rally in the prefecture since the reversion. You are old. The sentence that was removed is the sentence that describes something you know was true.',
    choices: [
      {
        text: 'Sign the petition. Give testimony to whoever will record it.',
        tag: null,
        outcome: 'The sentence is partially restored in the revised guidelines. Partially. The argument about what "partially" means continues.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.r += 5; p.setMem('ft64OkinawaTextbook', true); },
      },
      {
        text: 'You are too old for this. Let the young ones fight the sentence.',
        tag: null,
        outcome: 'The young ones fight. The sentence is partially restored. You hear about it from your grandchild, who says: did you know this happened? You say: yes.',
        effect: (p) => { p.r += 8; p.setMem('ft64OkinawaTextbook', true); },
      },
    ],
    effect: null,
  },

  // ── JPN CONFRONTED HISTORY ───────────────────────────────────────────────

  {
    id: 'ft64_confronted_history_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('jpn_confronted_history') &&
      G.character.country.name === 'Japan' &&
      G.age >= 40 &&
      !G.mem?.ft64ConfrontedHistoryLate,
    text: 'You travel to South Korea, or you meet a Korean colleague at work, and the subject comes up — the period, the comfort women, the textbook. The Korean version of the history and the Japanese version you found by seeking it out are closer than the official curricula of either country. You sit with a Korean person and understand that you are both holding something the governments have been managing for seventy years. The management has not worked. The holding is different from the management.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.r += 5
      p.karma += 5
      p.setMem('ft64ConfrontedHistoryLate', true)
    },
  },

  // ── JPN WOMEN CAREER ─────────────────────────────────────────────────────

  {
    id: 'ft64_women_career_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('jpn_women_career') &&
      G.character.gender === 'female' &&
      G.character.country.name === 'Japan' &&
      G.age >= 55 &&
      !G.mem?.ft64WomenCareerLate,
    text: 'You retire. The retirement party is the kind that has a banner and a departmental gift and a speech where people say things about what you contributed to the organisation. You listen to the speech and calculate: you were one of three women who made it into middle management in the first twenty years of your career. Now, at retirement, there are eleven. The number is not the goal — you don\'t know what the goal would be — but eleven is more than three. Someone who is thirty-four years old is now sitting in a position you fought fifteen years for. She has meetings to go to. She goes to them without thinking particularly hard about whether she is allowed to.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r += 4
      p.setMem('ft64WomenCareerLate', true)
    },
  },

  // ── JPN FUKUSHIMA EVACUEE ────────────────────────────────────────────────

  {
    id: 'ft64_fukushima_evacuee_late',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('jpn_fukushima_evacuee') &&
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2016 &&
      G.age >= 35 &&
      !G.mem?.ft64FukushimaEvacLate,
    text: (G) => {
      if (G.currentYear >= 2017) {
        return 'Parts of the exclusion zone are declassified. The government says: it is safe to return. They give you a map. There are zones where it is safe, zones where it is safe-in-principle, zones where it is not safe and will not be for decades. Your house is in one of the three. You go to look at it. The house is standing. The calendar in the kitchen is from March 2011. The cat bowl is still on the floor. There is nothing in the cat bowl.'
      }
      return 'Five years after the evacuation. The zone is still the zone. The house is still there — the satellite images show it standing — but you are not allowed to live in it. The compensation payments continue. The compensation is for a house you cannot live in and a life that is elsewhere. You are building the elsewhere-life. The house-life is on hold. You do not know if the hold ever ends.'
    },
    choices: [
      {
        text: 'Return, rebuild, refuse to be a statistic for the zone.',
        tag: null,
        outcome: 'You return. The rebuilding is slow and the neighbours are gone and the school has no children yet. The zone changes you in ways the evacuation also changed you, which is a sentence that continues.',
        effect: (p) => { p.m -= 3; p.r += 6; p.karma += 5; p.setMem('ft64FukushimaEvacLate', true); },
      },
      {
        text: 'You have built a life elsewhere. The house is the past now.',
        tag: null,
        outcome: 'You accept the buyout. The house is demolished under the renewal plan. You do not go back to watch. Someone sends you a photograph. You do not open it for a month.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('ft64FukushimaEvacLate', true); },
      },
    ],
    effect: null,
  },

  // ── ORAL: DISPLACEMENT CONSIDERED ────────────────────────────────────────

  {
    id: 'ft64_displacement_considered_late',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('oral_displacement_considered') &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ft64DisplacementLate,
    text: 'The conversation your family had — whether to leave — comes to a conclusion. Not because anyone calls a meeting and decides, but because the situation changes or doesn\'t change, and the decision gets made by what you do or don\'t do. Some families in the village have gone. Their compounds are quiet. When you pass them you understand something about what the family meeting was deciding: not just whether to leave but what version of the place this is.',
    choices: [
      {
        text: 'Your family leaves. You carry the village in you the way you carry the language.',
        tag: null,
        outcome: 'The language and the village come with you, minus the specific sounds — the well, the argument at the market, the particular bird at dawn. You meet these sounds again in other places in versions that are not quite right.',
        effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('rural_to_city'); p.setMem('ft64DisplacementLate', true); },
      },
      {
        text: 'Your family stays. You watch the people who left from here.',
        tag: null,
        outcome: 'The people who left send money sometimes, and messages, and return for funerals. The village reshapes around the ones who stayed. You are one of the ones who stayed. This is a choice and also not a choice.',
        effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft64DisplacementLate', true); },
      },
    ],
    effect: null,
  },

  // ── ORAL: SOLDIERS PASSED ────────────────────────────────────────────────

  {
    id: 'ft64_soldiers_passed_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('oral_soldiers_passed') &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.ft64SoldiersPassedLate,
    text: 'You are old enough now to see the pattern of the years when soldiers passed through. There were three times when they came. The first time you were too young to hold the full weight of it. The second time you understood. The third time — if there is a third time — you already know the grammar of it, the way the adults go quiet, the sequence of what happens. What you learned was not a fact but a grammar: the grammar of what it means to live somewhere soldiers pass through. This grammar is not in any book and could not be. It lives in the body.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft64SoldiersPassedLate', true)
    },
  },

]
