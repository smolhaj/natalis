// events_sweden.js — Sweden depth arc (7 events)
// Complements events_scandinavia.js (folkhem childhood, WWII neutrality, Janteloven).
// Covers: WWII moral debt aftermath, Palme assassination 1986, the 1992 banking
// crisis, Swedish immigration transformation, Sweden Democrats rise,
// welfare state late reckoning.

const IS_SWEDISH = (G) => G.character.country?.name === 'Sweden'

export const SWEDEN_EVENTS = [

  // ─── THE WWII MORAL ACCOUNT ───────────────────────────────────────────────────

  {
    id: 'swe_wwii_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1995 &&
      G.age >= 35 &&
      !G.mem?.sweWWIIReckoning,
    text: 'There is a programme on the television about the iron ore and the transit trains and your father turns it off before the end, which he does not do with other programmes. The Norwegians up the road had an occupation and a resistance and people who were shot. Sweden had trains that ran on time through a country that was not at war. In this house the word is neutrality and the tone in which it is said is not quite the tone of a word you are proud of.',
    context: 'Sweden remained formally neutral through the Second World War while supplying Germany with roughly a third of its iron ore and permitting the transit of German troops and materiel across Swedish railways to occupied Norway, including the Engelbrecht Division in 1941. Sweden also took in Danish Jews in 1943 and Norwegian and Baltic refugees. Public debate over whether neutrality was moral achievement or evasion has recurred since the 1960s.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.addFlag('swe_wwii_neutral_generation'); p.setMem('sweWWIIReckoning', true) },
  },

  // ─── OLOF PALME ASSASSINATION 1986 ───────────────────────────────────────────

  {
    id: 'swe_palme_assassination',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear === 1986 &&
      G.age >= 16 &&
      !G.mem?.swePalme,
    text: (G) => {
      const young = G.age <= 22
      return young
        ? 'The Prime Minister was shot on a street in Stockholm on a Friday night — February 28, 1986 — walking home from a cinema with his wife on Sveavägen. No bodyguard. The gun was never found. The investigation ran for thirty-four years without a conviction. You have grown up with this open wound in the national life, this thing that happened in the country that was supposed to be safe, where prime ministers walked to the cinema without protection because the country was orderly and decent. The shooting restructured what orderly and decent could mean.'
        : 'Palme was shot on Sveavägen at 23:21 on February 28, 1986, walking home from the cinema with his wife. A Swedish prime minister, on a public street. The gun was never found, and nobody was ever convicted. For thirty-four years Sweden was a country wounded and unable to find out how. You know exactly where you were when you heard. Most Swedes do.'
    },
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.e += 3; p.addFlag('swe_palme_generation'); p.setMem('swePalme', true) },
  },

  // ─── 1992 BLACK WEDNESDAY ────────────────────────────────────────────────────

  {
    id: 'swe_1992_crisis',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 25 &&
      !G.mem?.sweCrisis92,
    text: 'The krona\'s peg breaks, after the Riksbank has raised its overnight rate to five hundred percent to defend it, and Sweden floats. In three years unemployment goes from two percent to ten, and the government cuts the welfare state as it has never been cut: sick pay, unemployment insurance, housing allowance. The argument afterwards is about what the folkhem was, a moment that has passed or a promise to keep. Your side in that argument has something to do with which side of the cuts you were on.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.addFlag('swe_welfare_retrenchment_generation'); p.setMem('sweCrisis92', true) },
  },

  // ─── IMMIGRATION AND SWEDISH IDENTITY ────────────────────────────────────────

  {
    id: 'swe_immigration_question',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2018 &&
      G.age >= 30 &&
      !G.mem?.sweImmigration,
    text: (G) => {
      const isImmigrant = G.flags.has('emigrated') || G.flags.has('refugee')
      return isImmigrant
        ? 'Sweden received you. The reception was not seamless — the housing queue, the Swedish that needed to be learned, the credential recognition that took years, the specific Swedish distance that is not unfriendliness but requires a different code. You have learned the code to varying degrees. Sweden is a country where what you feel and what you say are often different, which takes getting used to when you come from places where they are the same.'
        : 'The country has changed in an and visible way over the decades: the schools, the neighbourhoods, the restaurants, the public conversations. Sweden took in more refugees per capita than any comparable country during multiple crises — Bosnians, Iraqis, Somalis, Syrians. The national self-image as a humanitarian country collided with the practical limits of integration capacity. You have watched the collision from inside a country that argued about it more openly and more anxiously than most, and you have formed opinions that you sometimes say out loud and sometimes do not.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('swe_immigration_era_generation'); p.setMem('sweImmigration', true) },
  },

  // ─── SWEDEN DEMOCRATS: THE FAR RIGHT GOES MAINSTREAM ─────────────────────────

  {
    id: 'swe_democrats_rise',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      !G.mem?.sweDemocratsRise,
    text: 'The Sweden Democrats enter the Riksdag in 2010 with 5.7 percent. By 2022 they are at 20 percent, the second-largest party, holding influence over a centre-right government. The party was founded by people with explicit neo-Nazi connections in 1988. In 2010 its leader had in his past a period in youth organisations that were explicit about their ideology. The party has distanced itself from that past and its voters are not mostly people who identify with neo-Nazism. You have thought about what this trajectory means — about what people vote for, about what the distance from founding ideology does and doesn\'t resolve, about what 20 percent represents in a country that was proud of its consensus.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 5; p.addFlag('swe_democrats_era'); p.setMem('sweDemocratsRise', true) },
  },

  // ─── PALME CASE CLOSED: 2020 ─────────────────────────────────────────────────

  {
    id: 'swe_palme_resolved',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      G.flags.has('swe_palme_generation') &&
      !G.mem?.swePalmeResolved,
    text: 'The prosecutor gives a press conference in June and names a man who died twenty years ago. He was an advertising executive who was on the street that night and told the police a version of it that never quite sat. There is no trial and no confession and the phrase the prosecutor uses is reasonably certain. You have had this open since you were young enough to have been standing in the snow outside the cinema yourself, and it has now been closed by an administrative decision.',
    context: 'Olof Palme, Sweden\'s prime minister, was shot on Sveavagen in Stockholm on 28 February 1986 after leaving a cinema with his wife. In June 2020 chief prosecutor Krister Petersson closed the investigation, naming Stig Engstrom, the so-called Skandia man, as the principal suspect. Engstrom died in 2000, so no prosecution was possible.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 5; p.e += 2; p.setMem('swePalmeResolved', true) },
  },

  // ─── LATE RECKONING: THE SWEDISH MODEL ───────────────────────────────────────

  {
    id: 'swe_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.age >= 60 &&
      !G.mem?.sweLateReckoning,
    text: 'The *folkhem* was built. The comprehensive provision, the trust in the state, the expectation that public institutions would be competent and honest — these were real and are partially still real. The Palme years were real and ended on a street at 23:21 in February. Then came the 1992 crisis and the welfare retrenchment. Then the immigration debate, and the Sweden Democrats at 20 percent. Then the pandemic, when Sweden chose a path no other country chose — no lockdown, individual responsibility, and more dead than its neighbours in the first wave. You have lived the whole shape of the Swedish century and you know that the model is neither the ideal its admirers described nor the failure its critics declared, but something more complicated that requires you to hold all of it at once.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.karma += 3; p.setMem('sweLateReckoning', true) },
  },

]
