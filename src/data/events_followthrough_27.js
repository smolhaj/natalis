// events_followthrough_27.js — Wealth system + Zimbabwe + South Africa follow-throughs
// Follow-through events for flags set but never checked:
//   white_zimbabwean_exile / white_zimbabwean_stayed: land seizure aftermath
//   freedom_day_witness: South Africa 1994, the long meaning of that day
//   dowry_paid / lobola_paid / mahr_paid: marriage payment as life memory
//   moneylender_debt: the ongoing debt and what it does to a farming life
//   gold_inherited: the gold as family memory and emergency reserve

export const FOLLOWTHROUGH_27_EVENTS = [

  // ── WHITE ZIMBABWEAN: EXILE ───────────────────────────────────────────────────
  // Left after the farm seizures. Built a life somewhere else.
  // The question of what Zimbabwe still is to you.

  {
    id: 'ft27_white_zim_exile_settle',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('white_zimbabwean_exile') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.ft27ZimExileSettle,
    text: 'You are settled now — South Africa, or Australia, or the United Kingdom, depending on where the passport or the connection took you. The farm is other people\'s now. The seizure was legal under the law that was passed to make it legal. You know what the farm smelled like in the rains. You know the names of the workers who stayed and what happened to them is something you try not to think about on the same day you think about the farm. The country is there. You are here. There is a distance between those two facts that is not only geographical.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft27ZimExileSettle', true) },
  },

  {
    id: 'ft27_white_zim_exile_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('white_zimbabwean_exile') &&
      G.age >= 60 &&
      !G.mem?.ft27ZimExileLate,
    text: 'There are years when you do not think about Zimbabwe for weeks at a time. Then there are the rains here, which are not the same as the rains there, and the smell of a certain red earth in a garden centre, and the whole thing is present again. You left because there was no other option. You have built a life. Both are true. The living-with is not resolution — it is a particular kind of continuous management that after forty years you have become expert at without ever becoming easy with.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 2; p.setMem('ft27ZimExileLate', true) },
  },

  // ── WHITE ZIMBABWEAN: STAYED ──────────────────────────────────────────────────
  // Chose to remain. Navigating the new country.

  {
    id: 'ft27_white_zim_stayed_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('white_zimbabwean_stayed') &&
      G.age >= 35 && G.age <= 65 &&
      !G.mem?.ft27ZimStayedMid,
    text: 'You stayed. The farm is gone — sold or seized, depending on the year and the offer — but you are here. The country you are living in is different from the country you grew up in in ways that are structural and ongoing. Your children\'s futures look different from what you imagined when they were born. Some of the people you knew left. Some stayed and then left. You are one of the ones who stayed and stayed. You have reasons for this that you have explained to various people and that are true and that are also not the whole truth.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft27ZimStayedMid', true) },
  },

  // ── SOUTH AFRICA: FREEDOM DAY LATE WITNESS ───────────────────────────────────
  // The long arc of what April 27, 1994 meant.
  // The gap between what it promised and what arrived.

  {
    id: 'ft27_freedom_day_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('freedom_day_witness') &&
      G.currentYear >= 2004 &&
      G.age >= 35 &&
      !G.mem?.ft27FreedomDayDecade,
    text: 'Ten years. Or twenty. The freedom is real — you can go where you could not go before, vote where you could not vote before, live where you could not live before. The inequality is also real, more concentrated than the numbers suggested it would be by this point. You are holding both of these things simultaneously, which is what being South African in this decade means: knowing the distance between what April 1994 was and what 2004 is, and choosing what to do with that distance every day.',
    choices: null,
    effect: (p) => { p.e += 5; p.r += 4; p.m -= 2; p.setMem('ft27FreedomDayDecade', true) },
  },

  {
    id: 'ft27_freedom_day_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('freedom_day_witness') &&
      G.age >= 60 &&
      !G.mem?.ft27FreedomDayLate,
    text: 'You were there. You remember the queue, or the radio in the kitchen, or the streets that night. The country has done things since then that were not in the story you told yourself about what 1994 meant. Some of them were predictable and you did not predict them, or predicted them and hoped you were wrong. You are still here. The being-still-here is not a conclusion — it is a continuing position that you revise every few years as the evidence changes.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 3; p.setMem('ft27FreedomDayLate', true) },
  },

  // ── DOWRY PAID: THE ONGOING WEIGHT ───────────────────────────────────────────
  // The dowry was paid in a moment of family negotiation.
  // What it means as the marriage goes on.

  {
    id: 'ft27_dowry_paid_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('dowry_paid') &&
      G.partner &&
      G.age >= 32 &&
      !G.mem?.ft27DowryEcho,
    text: 'The dowry was paid the year you married. The number — the gold, or the cash, or the combination — is part of the family memory, recalled at certain moments: a financial difficulty that could have been lessened if the reserves had not been paid out, or a moment of family pride when the payment is remembered as evidence of what your family was worth. The transaction that preceded the marriage sits underneath it, not visibly, but there.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft27DowryEcho', true) },
  },

  // ── LOBOLA PAID: THE ONGOING FAMILY RELATIONSHIP ─────────────────────────────
  // Lobola creates an ongoing relationship between families, not just individuals.
  // The cattle (or cash equivalent) are remembered.

  {
    id: 'ft27_lobola_paid_family',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lobola_paid') &&
      G.partner &&
      G.age >= 30 &&
      !G.mem?.ft27LobolaFamily,
    text: 'The lobola negotiations created a relationship between families that is still active. Your wife\'s family — the relationship to them is not only the normal in-law relationship but a specific economic and social relationship that the lobola payment formalised. You know what you paid. They know what they received. The number is not public but it is known. What it means is renegotiated silently at every interaction between the families.',
    choices: null,
    effect: (p) => { p.r += 4; p.s += 2; p.e += 2; p.setMem('ft27LobolaFamily', true) },
  },

  // ── MAHR PAID: LATE RECKONING ────────────────────────────────────────────────
  // The mahr is the woman's right — due at marriage or deferred.
  // Its meaning changes across a marriage.

  {
    id: 'ft27_mahr_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('mahr_paid') &&
      G.age >= 55 &&
      !G.mem?.ft27MahrLate,
    text: 'The mahr was paid at the wedding, or deferred and honoured, or deferred and never quite addressed in the way it should have been. Over the years of the marriage, its meaning shifted — from a financial guarantee of security to a memory of what the contract was about, to something carried by the family as evidence of the respect the arrangement carried. What it meant and what it means are not quite the same thing.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('ft27MahrLate', true) },
  },

  // ── MONEYLENDER DEBT: THE ONGOING ARITHMETIC ─────────────────────────────────
  // The moneylender debt from a farming crisis.
  // The interest that restructures every subsequent decision.

  {
    id: 'ft27_moneylender_ongoing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('moneylender_debt') &&
      G.age >= 22 && G.age <= 50 &&
      !G.mem?.ft27MoneylenderOngoing,
    text: 'The debt to the moneylender from that season — the interest compounds. You know this now in a way you did not know it when you borrowed, which is how the interest is designed to work. Every harvest is first the moneylender\'s. What remains is yours. The what-remains is the margin you are farming on. You have developed a relationship with the arithmetic of it: not acceptance, exactly, but a working knowledge of what is possible within the structure.',
    choices: [
      {
        text: 'You find a way to pay it down — slowly, with everything you can spare.',
        tag: 'pay_down',
        outcome: 'It takes years. The years are years of reduced margin. You pay it off. The season after the final payment, you notice something in how you plan — more freely than before.',
        effect: (p) => { p.mo -= 600; p.m += 6; p.r += 5; p.addFlag('moneylender_debt_cleared'); p.setMem('ft27MoneylenderOngoing', true) },
      },
      {
        text: 'You manage the payments and the debt continues. There is no way to clear it quickly.',
        tag: 'ongoing',
        outcome: 'The debt becomes part of the structure of your life. You farm around it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.e += 3; p.setMem('ft27MoneylenderOngoing', true) },
      },
    ],
    effect: null,
  },

  // ── GOLD INHERITED: THE EMERGENCY RESERVE ────────────────────────────────────
  // The inherited gold is not savings — it is emergency and memory.
  // The decision of when to use it.

  {
    id: 'ft27_gold_inherited_crisis',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('gold_inherited') &&
      !G.flags.has('sold_gold_emergency') &&
      G.age >= 30 && G.age <= 60 &&
      !G.mem?.ft27GoldCrisis,
    text: 'The gold your grandmother left — bangles, or a chain, or a set of earrings that were hers from her wedding — has been in a box since the inheritance. You know what it is worth: you have checked, once or twice, when things were tight. You know the jeweller on the corner who buys gold by weight. The gold represents everything she accumulated and wanted you to have. The question of when a crisis is serious enough to be the crisis the gold is for is a question you revisit when the money gets difficult.',
    choices: [
      {
        text: 'Sell some of it. The crisis is the crisis the gold is for.',
        tag: 'sell',
        outcome: 'The jeweller pays fairly, which is to say below market but above desperation. The box is lighter. The crisis resolves.',
        effect: (p) => { p.mo += 800; p.m -= 6; p.r += 4; p.addFlag('sold_gold_emergency'); p.setMem('ft27GoldCrisis', true) },
      },
      {
        text: 'Not yet. This is not yet that crisis.',
        tag: 'hold',
        outcome: 'You find another way. The gold stays in the box. You check the box more often now, which is either reassurance or something else.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('ft27GoldCrisis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft27_gold_inherited_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gold_inherited') &&
      G.age >= 60 &&
      !G.mem?.ft27GoldLate,
    text: G => G.flags.has('sold_gold_emergency')
      ? 'The gold your grandmother left is gone. You sold it in a crisis year — the right decision, given the crisis. What you have is the knowledge of what it was for: not savings, but a weight of metal that said someone before you had accumulated something and wanted you to have it. That intention survived the sale. The gold didn\'t, but the intention did.'
      : 'The gold your grandmother left is still here. You open the box periodically. The bangles, or the chain, or the earrings — still there, still hers, still not yet the crisis they were kept for. You have decided they will go to your daughter, which is how these things travel: slowly, through the hands of people who almost sold them.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 4; p.e += 2; p.setMem('ft27GoldLate', true) },
  },

]
