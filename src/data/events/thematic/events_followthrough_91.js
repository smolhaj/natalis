// Follow-through events for North Korea depth arc
// Covers: dprk_kwanliso_witness, dprk_tumen_phone, dprk_party_member,
// dprk_south_korea_adjustment

const IS_DPRK = (G) => G.character.country?.name === 'North Korea'

export const FOLLOWTHROUGH_91_EVENTS = [

  {
    id: 'ft91_kwanliso_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('dprk_kwanliso_witness') &&
      G.age >= 55 &&
      !G.mem?.ft91Kwanliso,
    text: 'You have learned, since, that the place they were sent has a name — a name that appears in international reports, in the accounts of people who survived it and were able to speak later about what surviving it meant. The name was known internationally for many years before you knew it domestically. You did not know the name of the place while you were not saying the name of the person. The reports describe conditions. The conditions are described with precision. You do not read past a certain point in the reports. You know enough.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft91Kwanliso', true) },
  },

  {
    id: 'ft91_tumen_phone_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('dprk_tumen_phone') &&
      G.age >= 55 &&
      !G.mem?.ft91Tumen,
    text: 'The call on the hill near the river was the first time in your life that the outside world arrived as a voice rather than as a concept. The voice was someone you knew. The voice was also someone who had been somewhere else long enough to sound partly like somewhere else. The call lasted three minutes. You have thought about it for many years since. Not constantly — but at intervals, when something reminds you of the hill, the dawn, the antenna pointing at the Chinese tower. The three minutes contained more information than the number of minutes suggests.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('ft91Tumen', true) },
  },

  {
    id: 'ft91_party_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('dprk_party_member') &&
      G.age >= 60 &&
      !G.mem?.ft91Party,
    text: 'The card is still in the drawer. You have carried it through the years in which it determined what was possible — the assignments, the travel permissions, the apartment allocation, the school placement for your children. The state that issued it is still there, which is not something that can be said about every state that has issued cards like this one. You do not know what the card will mean if the state changes. You have thought about this when the news from outside arrives through the channels that now bring it. The card is a card. It is also a record of the years you lived inside the structure the card named.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft91Party', true) },
  },

  {
    id: 'ft91_south_korea_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('dprk_south_korea_adjustment') &&
      G.age >= 60 &&
      !G.mem?.ft91SKorea,
    text: 'Your children do not have the accent. They grew up inside this country and their Korean is the Korean of here — with the English words folded into it, and the pronunciation of the younger generation. They do not know the words you know from before. The knowledge of what food scarcity actually is — not as a concept but as the body\'s learning, the learning that changes how you stand in a grocery store — is not something you could transfer to them. You are not sure you wanted to transfer it. The thing that you know in your body that they will never know in their bodies is also the thing that you would not give them if you could.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 4; p.setMem('ft91SKorea', true) },
  },

]
