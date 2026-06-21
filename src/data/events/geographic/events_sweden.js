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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1995 &&
      G.age >= 35 &&
      !G.mem?.sweWWIIReckoning,
    text: 'The post-war decades are spent settling the account. Sweden was not occupied; Sweden was neutral; Sweden also transited German troops through Swedish railways and sold Swedish iron to German industry for most of the war. The Danish and Norwegian neighbours had collaborators and resistance fighters and occupation. Sweden had the absence of all of that — which is a different kind of question, asked over different decades. The historians argue about whether neutrality was a moral achievement or a moral evasion. The Swedes argue about this too, mostly in books and television programmes, never in the way that countries argue about things they feel guilty about. There is something in the not-quite-guilt that characterises the conversation.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.addFlag('swe_wwii_neutral_generation'); p.setMem('sweWWIIReckoning', true) },
  },

  // ─── OLOF PALME ASSASSINATION 1986 ───────────────────────────────────────────

  {
    id: 'swe_palme_assassination',
    phase: 'midlife',
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
        : 'Palme was shot on Sveavägen at 23:21 on February 28, 1986. A Swedish prime minister. On a public street. After an ordinary cinema evening. The gun was never recovered. The man who did it was never convicted — not then, not in the decades of investigation that followed. Sweden spent thirty-four years in the specific condition of a country that had been wounded and could not find out how. You know exactly where you were when you heard. Most Swedes do.'
    },
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.e += 3; p.addFlag('swe_palme_generation'); p.setMem('swePalme', true) },
  },

  // ─── 1992 BLACK WEDNESDAY ────────────────────────────────────────────────────

  {
    id: 'swe_1992_crisis',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 25 &&
      !G.mem?.sweCrisis92,
    text: 'The fixed currency peg breaks. The Riksbank raises interest rates to 500 percent in an attempt to defend the krona. It fails. Sweden floats. Unemployment goes from 2 percent to 10 percent in three years. The government cuts the welfare state in ways it has never cut before — sick pay reduced, unemployment insurance capped, housing allowances renegotiated. The debate that follows is about what the *folkhem* was: whether the postwar settlement was a specific economic moment that has now passed, or an aspiration that must be defended. You have a position in this debate. The position has something to do with which side of the cuts you are on.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.addFlag('swe_welfare_retrenchment_generation'); p.setMem('sweCrisis92', true) },
  },

  // ─── IMMIGRATION AND SWEDISH IDENTITY ────────────────────────────────────────

  {
    id: 'swe_immigration_question',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SWEDISH(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2018 &&
      G.age >= 30 &&
      !G.mem?.sweImmigration,
    text: (G) => {
      const isImmigrant = G.flags.has('emigrated') || G.flags.has('refugee')
      return isImmigrant
        ? 'Sweden received you, which is a fact. The reception was not seamless — the housing queue, the Swedish that needed to be learned, the credential recognition that took years, the specific Swedish distance that is not unfriendliness but requires a different code. You have learned the code to varying degrees. Sweden is a country where what you feel and what you say are often different, which takes getting used to when you come from places where they are the same.'
        : 'The country has changed in a specific and visible way over the decades: the schools, the neighbourhoods, the restaurants, the public conversations. Sweden took in more refugees per capita than any comparable country during multiple crises — Bosnians, Iraqis, Somalis, Syrians. The national self-image as a humanitarian country collided with the practical limits of integration capacity. You have watched the collision from inside a country that argued about it more openly and more anxiously than most, and you have formed opinions that you sometimes say out loud and sometimes do not.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('swe_immigration_era_generation'); p.setMem('sweImmigration', true) },
  },

  // ─── SWEDEN DEMOCRATS: THE FAR RIGHT GOES MAINSTREAM ─────────────────────────

  {
    id: 'swe_democrats_rise',
    phase: 'midlife',
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
    text: 'In June 2020, the chief prosecutor closes the case. The prime suspect is Stig Engström — "Skandia man" — an advertising executive who was at the scene and whose story has been examined and re-examined. He died in 2000. The case is closed because the prime suspect is dead and cannot be prosecuted. This means: no trial. No conviction. No confession. The case that defined the Swedish national psyche for thirty-four years ends not with an answer but with an administrative decision. The prosecutor says she is reasonably certain. Reasonable certainty, after thirty-four years, is the closure the country gets. You have spent much of your life with this open. Now it is closed in a way that does not feel finished.',
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
    text: 'The *folkhem* was real. The comprehensive provision, the trust in the state, the expectation that public institutions would be competent and honest — these were real and are partially still real. The Palme years were real and ended on a street at 23:21 in February. The 1992 crisis and the welfare retrenchment were real. The immigration debate and the Sweden Democrats at 20 percent are real. The COVID pandemic, during which Sweden chose a path no other country chose — no lockdown, relying on individual responsibility, with a higher death toll than its neighbours in the first wave — is real. You have lived the whole shape of the Swedish century and you know that the model is neither the ideal its admirers described nor the failure its critics declared, but something more complicated that requires you to hold all of it at once.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.karma += 3; p.setMem('sweLateReckoning', true) },
  },

]
