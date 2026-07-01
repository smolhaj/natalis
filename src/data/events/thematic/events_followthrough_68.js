// events_followthrough_68.js
// Follow-through events for Pakistan depth flags.

export const FOLLOWTHROUGH_68_EVENTS = [

  // ── CRICKET GENERATION ────────────────────────────────────────────────────

  {
    id: 'ft68_cricket_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_cricket_generation') &&
      G.age >= 35 &&
      !G.mem?.ft68CricketMidlife,
    text: 'Pakistan cricket is a specific kind of drama. The team loses matches it should win and wins matches it should lose and the explanation is always that Pakistan cricket is unpredictable, which is not an explanation, it is a description. You have followed this team for thirty years. You have stopped expecting anything. You still watch. The watching is not rational. You do it anyway.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.s += 2
      p.setMem('ft68CricketMidlife', true)
    },
  },

  // ── BASANT GENERATION ─────────────────────────────────────────────────────

  {
    id: 'ft68_basant_ban',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_basant_generation') &&
      G.currentYear >= 2007 &&
      G.age >= 25 &&
      !G.mem?.ft68BasantBan,
    text: 'They banned Basant in 2007. The manja string had been killing people — the metallic or chemical-coated lines used to cut other kites cutting necks instead, motorcyclists on bridges, children on rooftops. The ban was correct and was also the end of something. The Lahore you remember includes the February rooftops and the kites. The Lahore your children will remember does not.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.setMem('ft68BasantBan', true)
    },
  },

  // ── 2010 FLOODS GENERATION ────────────────────────────────────────────────

  {
    id: 'ft68_floods_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_2010_flood_generation') &&
      G.age >= 50 &&
      !G.mem?.ft68FloodsLate,
    text: 'The floods of 2010 established something: that a fifth of Pakistan could go underwater and the international coverage would still be less than a similar disaster elsewhere. You have thought about why that is, in the years since. The answer has something to do with attention and something to do with who the victims are and something to do with where Pakistan sits in the global imagination. The understanding doesn\'t make the event smaller. It makes the context larger.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft68FloodsLate', true)
    },
  },

  // ── HAZARA GENERATION ─────────────────────────────────────────────────────

  {
    id: 'ft68_hazara_sit_in',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_hazara_generation') &&
      G.currentYear >= 2013 &&
      G.age >= 25 &&
      !G.mem?.ft68HazaraSitIn,
    text: 'The Hazara sit-in of 2013: after a bombing in Quetta killed ninety-two Hazara, the community refused to bury their dead until the army was deployed to protect them. The coffins were in the street for three days. The prime minister flew in. The sit-in worked in the narrow sense: the deployment happened, the dead were buried. The protection was partial and temporary. The killings continued.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.e += 3
      p.setMem('ft68HazaraSitIn', true)
    },
  },

  // ── BALOCH MISSING PERSONS ────────────────────────────────────────────────

  {
    id: 'ft68_baloch_return_or_not',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('pak_baloch_missing_person_family') &&
      G.age >= 45 &&
      !G.mem?.ft68BalochReturn,
    text: 'Some of the disappeared come back. Some come back in a condition that the word "return" doesn\'t accurately describe. Some do not come back. You know families in each category. The category your family falls into is the one you carry in your body. The photograph has been in the photograph album long enough that the paper has yellowed slightly at the edges. The person in the photograph did not age.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.setMem('ft68BalochReturn', true)
    },
  },

  // ── FAIZ GENERATION ───────────────────────────────────────────────────────

  {
    id: 'ft68_faiz_hum_dekhenge',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_faiz_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft68FaizSong,
    text: 'Hum dekhenge. We shall witness. Faiz wrote it for Zia\'s Pakistan and it was sung at every protest after that: in Iran after the revolution, in India during the 2020 protests, flagged as anti-Islamic by a Lahore university committee that year and then defended by everyone, across every political line, who understood what it was. The poem that belongs to everyone and therefore cannot be taken from anyone. You know it by heart and you know what it means to know it by heart.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m += 4
      p.setMem('ft68FaizSong', true)
    },
  },

  // ── RISHTA ────────────────────────────────────────────────────────────────

  {
    id: 'ft68_rishta_years_later',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_rishta_married') &&
      G.partner &&
      G.age >= 38 &&
      !G.mem?.ft68RishtaLater,
    text: 'The rishta marriage has lasted fifteen years. You know couples who married differently — for love, against family advice, across class lines — and their marriages have the same distribution of outcomes as yours: some lasted, some didn\'t. The method of finding a partner turns out to be less predictive of the quality of the partnership than the people involved. This is not obvious from inside the rishta system but it is what the evidence shows.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 2
      p.setMem('ft68RishtaLater', true)
    },
  },

  // ── OVERSEAS DEPARTED ─────────────────────────────────────────────────────

  {
    id: 'ft68_overseas_returned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pak_overseas_departed') &&
      G.age >= 40 &&
      !G.mem?.ft68OverseasReturn,
    text: 'The ones who left Pakistan and came back did not come back to the Pakistan they left. The country had changed in the years of absence, and they had changed in the years of absence, and the question of belonging had become more complicated rather than less. The ones who stayed had built a life that assumed a presence the returning person no longer had. Belonging turned out to be something that requires maintenance, and maintenance requires being there.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.setMem('ft68OverseasReturn', true)
    },
  },

]
