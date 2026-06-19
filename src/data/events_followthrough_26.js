// events_followthrough_26.js — MODE C follow-throughs for unregistered early-life and
// cross-cutting flags: adult heartbreak, money zero, black tax, arranged marriage,
// partition generation, foster care, depression era childhood, nkrumah era

export const FOLLOWTHROUGH_26_EVENTS = [

  // ── ADULT HEARTBREAK ────────────────────────────────────────────────────────

  {
    id: 'ftw26_adult_heartbreak_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('adult_heartbreak') && G.age >= 30 && G.age <= 45 && !G.mem?.ftw26HeartbreakEcho,
    text: G => G.flags.has('stayed_too_long')
      ? 'You stayed three months longer than you should have. You told yourself you were being careful. You were being afraid. The relationship you\'re in now — or the one you had to build yourself toward — carries the watermark of what you learned: that staying past the moment of knowing is its own form of dishonesty. You have not always succeeded. You have tried.'
      : 'The relationship ended when it needed to. You were twenty-something and you thought you understood love as a thing that, once found, continued. It does not always continue. The version of you that learned this is still present in everything that came after — the way you ask questions earlier, the way you leave more space.',
    effect: (p) => { p.e += 2; p.setMem('ftw26HeartbreakEcho', true); },
  },

  {
    id: 'ftw26_stayed_too_long_pattern',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('stayed_too_long') && G.age >= 35 && !G.mem?.ftw26StayedPattern,
    text: 'You have noticed the pattern. It is not only about relationships. You stay in situations past the point when you know — jobs, conversations, versions of yourself. You call it loyalty. Sometimes it is. Sometimes it is fear of the void that follows. You are learning to tell the difference, which is harder than it sounds when you are inside the situation you are considering leaving.',
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('ftw26StayedPattern', true); },
  },

  // ── MONEY ZERO ──────────────────────────────────────────────────────────────

  {
    id: 'ftw26_money_zero_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('money_zero_survived') && G.age >= 32 && !G.mem?.ftw26MoneyZeroMidlife,
    text: 'You check the account balance more than you need to. You know the exact number before you look. When the number is above a certain threshold you are fine; below it, something tightens. The threshold is irrational — you are not twenty-three and broke anymore — but the body doesn\'t read bank statements, it reads memory. You were genuinely, counting-days broke once. That calibration has not updated.',
    effect: (p) => { p.e += 2; p.setMem('ftw26MoneyZeroMidlife', true); },
  },

  {
    id: 'ftw26_money_zero_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('money_zero_survived') && G.age >= 55 && !G.mem?.ftw26MoneyZeroLate,
    text: 'People your age who never went broke have a different relationship with money. You can identify them: they spend without checking; they don\'t know, at any given moment, how much is in the account. You know. You have always known. The people who survived being genuinely broke young are either very careful or very reckless with money afterward — both are attempts to never feel that way again. You know which one you became.',
    effect: (p) => { p.e += 2; p.setMem('ftw26MoneyZeroLate', true); },
  },

  // ── BLACK TAX ───────────────────────────────────────────────────────────────

  {
    id: 'ftw26_black_tax_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.has('black_tax_contributor') && G.age >= 38 && G.age <= 55 && !G.mem?.ftw26BlackTaxMidlife,
    text: 'The arithmetic of what you have sent home over fifteen years — school fees, hospital bills, the roof that needed replacing, the cousin who needed a deposit for a job in the city, the mother\'s medicine. You have never written it down. If you wrote it down you would see a figure that explains exactly why your savings look the way they do. You have not written it down because the family did not ask you to choose. They asked you to help. You helped. The arithmetic is not a complaint. It is just a fact you carry.',
    choices: [
      {
        text: 'It has cost you, but you would not have done it differently.',
        tag: 'No regret',
        outcome: 'The calculation does not close neatly. You do not need it to.',
        effect: (p) => { p.karma += 4; p.m += 3; p.setMem('ftw26BlackTaxMidlife', true); },
      },
      {
        text: 'You wish someone had told you what it would cost.',
        tag: 'Honest cost',
        outcome: 'The wish is legitimate. The obligation was also real. Both are true.',
        effect: (p) => { p.r += 4; p.m -= 3; p.setMem('ftw26BlackTaxMidlife', true); },
      },
    ],
  },

  {
    id: 'ftw26_black_tax_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('black_tax_contributor') && G.age >= 58 && !G.mem?.ftw26BlackTaxLate,
    text: 'Your niece graduated last year. Your younger brother runs his own business. The roof got replaced properly in 2011 and has not leaked since. The accounting, if you did it, would show that the money you sent back built things that lasted — an education here, a foundation there, a generation that did not start as far back as you did. This is not the story of sacrifice. It is the story of how wealth is actually built in communities that cannot rely on inheritance: one person at a time, in the middle of their working life, sending money home.',
    effect: (p) => { p.m += 6; p.karma += 3; p.setMem('ftw26BlackTaxLate', true); },
  },

  // ── ARRANGED MARRIAGE ───────────────────────────────────────────────────────

  {
    id: 'ftw26_arranged_marriage_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arranged_marriage') && G.partner && G.age >= 35 && !G.mem?.ftw26ArrangedMidlife,
    text: 'You did not choose this person the way you would have chosen from a field of options. The families chose. You agreed — or you were in no position to disagree, which is a different thing. And then time passed. The person who was a stranger at the beginning is now the person whose breathing you know, whose habits you have memorized without trying. The question of whether this is love is almost beside the point now.',
    choices: [
      {
        text: 'It became something you would call love.',
        tag: 'Grown into it',
        outcome: 'Not the love of a film. A different kind: chosen by repetition, confirmed by years.',
        effect: (p) => { p.m += 7; p.addFlag('arranged_marriage_settled'); p.setMem('ftw26ArrangedMidlife', true); },
      },
      {
        text: 'It became a life, which is not the same thing.',
        tag: 'Honest distance',
        outcome: 'A functional life is also real. You have not pretended it was something it wasn\'t.',
        effect: (p) => { p.r += 4; p.setMem('ftw26ArrangedMidlife', true); },
      },
    ],
  },

  // ── PARTITION GENERATION ────────────────────────────────────────────────────

  {
    id: 'ftw26_partition_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('partition_generation') && G.age >= 60 && !G.mem?.ftw26PartitionLate,
    text: 'The country that was taken apart and the country that was made: you have lived on one side of the line long enough that your children do not feel it as a wound. For them it is history. For you it is the specific street in the specific city where your grandparents\' house was, on the other side, and the way your mother said the name of that city in a different register than she used for anything else.',
    effect: (p) => { p.r += 5; p.m -= 4; p.e += 2; p.setMem('ftw26PartitionLate', true); },
  },

  // ── FOSTER CARE ─────────────────────────────────────────────────────────────

  {
    id: 'ftw26_foster_care_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('foster_care') && G.age >= 22 && G.age <= 34 && !G.mem?.ftw26FosterIdentity,
    text: 'The question of where you are from is not a simple one. The place where you grew up is real. The people who raised you are real. The gap between those facts and the word "family" is also real, and it sits differently on different days. Sometimes you are entirely fine. Sometimes you are at a table where everyone is related in a way that is not your way, and you feel it as a specific variety of alone that is hard to explain to someone who has not felt it.',
    choices: [
      {
        text: 'You have built your own version of family by now.',
        tag: 'Built it',
        outcome: 'Chosen family is real family. You know this from having had to choose it.',
        effect: (p) => { p.m += 5; p.s += 3; p.addFlag('chose_family'); p.setMem('ftw26FosterIdentity', true); },
      },
      {
        text: 'The gap is still there, and you carry it.',
        tag: 'Carry it',
        outcome: 'Carrying it is not the same as being stopped by it.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ftw26FosterIdentity', true); },
      },
    ],
  },

  // ── DEPRESSION ERA CHILDHOOD ─────────────────────────────────────────────────

  {
    id: 'ftw26_depression_era_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('depression_era_childhood') && G.age >= 65 && !G.mem?.ftw26DepressionLate,
    text: 'You grew up in a household that remembered the Depression as a recent fact, not a historical one. The cupboard kept full of tins. The shoes mended instead of replaced. The specific saying about money and what you should not count on. You carried these habits into a world of abundance that arrived after the war and never quite made sense to you — abundance always felt provisional, like something that could withdraw.',
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('ftw26DepressionLate', true); },
  },

  // ── NKRUMAH ERA ─────────────────────────────────────────────────────────────

  {
    id: 'ftw26_nkrumah_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('nkrumah_era') && G.currentYear >= 1990 && !G.mem?.ftw26NkrumahLate,
    text: 'You were there when it felt possible. Kwame Nkrumah believed that Africa could take its place — not the Africa of the maps drawn in Europe, but the real thing. The coup came in 1966, while he was on a plane to Hanoi. You learned, over the years after, what happens to the countries that produce men like that: they get the coup, and then the structural adjustment, and then the brain drain, and then the elections that are real but bounded. Ghana has been relatively fine. The project was larger than Ghana.',
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ftw26NkrumahLate', true); },
  },

];
