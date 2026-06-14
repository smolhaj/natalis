// Follow-through events — Georgia arc
// Late-life callbacks for April 9, 2008 war, Abkhazia displacement.

export const FOLLOWTHROUGH_21_EVENTS = [

  {
    id: 'ft21_april9_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('april_9_generation') &&
      G.age >= 55 &&
      !G.mem?.ft21April9Late,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2024) {
        return 'The April 9 Memorial has been on Rustaveli Avenue since the 1990s. The 2024 protesters returning to Rustaveli night after night carrying EU flags passed it. You have been coming back to this avenue since 1989. The avenue has now accumulated several different kinds of history that all belong to the same pavement. You know what each one looked like from inside it.'
      }
      return 'The April 9 Memorial. The names. The Soviet force that ended with independence and the independence that ended with a different kind of difficulty. What the massacre established — that Georgia was not simply a Soviet republic, that Georgians would not accept that framing — was not negotiable. What came after was negotiable. You have been in the negotiations for your entire adult life.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 4; p.m -= 2; p.setMem('ft21April9Late', true); },
  },

  {
    id: 'ft21_war_2008_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('georgian_war_2008') &&
      G.age >= 55 &&
      !G.mem?.ft21War2008Late,
    text: 'The Tagliavini Report — the EU fact-finding mission — concluded that Georgia started the military confrontation and that Russia\'s response was disproportionate and illegal under international law. Both sentences are in the same report and refer to the same five days. What five days in August 2008 produced is the status quo: South Ossetia and Abkhazia outside Georgian control, the Russian military presence, and the Georgian insistence that this is temporary, which is an insistence that has now run for fifteen years.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft21War2008Late', true); },
  },

  {
    id: 'ft21_abkhazia_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('abkhazia_displaced_connection') &&
      G.age >= 55 &&
      !G.mem?.ft21AbkLate,
    text: 'The IDP families from Abkhazia: thirty years in some cases without return. The hotels that became permanent residences. The children who grew up displaced and the grandchildren who know Abkhazia only from stories. Georgia maintains that return will happen when Abkhazia returns to Georgian sovereignty. Abkhazia, with Russian support, maintains it will not. The specific apartment in Sukhumi — the specific eucalyptus trees in the yard — still exist. They are not yours to return to. They may not be yours to return to within your lifetime.',
    choices: [
      {
        text: 'You have made peace with the probability that the return will not happen in your life.',
        tag: null,
        outcome: 'The making of peace is not the same as the peace. But you have made what can be made.',
        effect: (p) => { p.r += 4; p.m += 3; p.setMem('ft21AbkLate', true); },
      },
      {
        text: 'You cannot make peace with it. The insistence on return is the thing you still have.',
        tag: null,
        outcome: 'The insistence is legitimate. The legitimacy does not change the geography. You hold both.',
        effect: (p) => { p.r += 7; p.m -= 3; p.setMem('ft21AbkLate', true); },
      },
    ],
    effect: null,
  },

]
