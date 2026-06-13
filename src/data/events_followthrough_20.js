// Follow-through events — Baltic states arc
// Late-life callbacks for deportation memory, song resistance, January 1991,
// Russian minority, EU emigration wave.

export const FOLLOWTHROUGH_20_EVENTS = [

  {
    id: 'ft20_deportation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('deportation_family_memory') &&
      G.age >= 55 &&
      !G.mem?.ft20DeportLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2004) {
        return 'Since independence, the deportations have been officially memorialized. June 14 is Mourning and Hope Day in Latvia and Lithuania; June 14 is the Day of Mourning in Estonia. The memorials list names. Some of the names in the list are names from your family. The listing of the name is official acknowledgment. Official acknowledgment does not restore the person. It is still something — the naming is still something — and you feel both what it is and what it is not.'
      }
      return 'The family members who were deported in 1941 or 1949 — the ones who came back changed and the ones who did not come back — have been with you your whole life as an absence with a known shape. You are old enough now to understand the historical dimension: the Soviet system that produced the deportations, the policy decisions behind them, the numbers. The numbers and the specific names in your family are two different kinds of knowledge that you carry together.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.karma += 3; p.setMem('ft20DeportLate', true); },
  },

  {
    id: 'ft20_january_1991_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('baltic_january_1991') &&
      G.age >= 50 &&
      !G.mem?.ft20Jan1991Late,
    text: (G) => {
      const year = G.currentYear
      const country = G.character?.country?.name || ''
      if (year >= 2021 && country === 'Lithuania') {
        return 'Thirty years since January 13, 1991. The cases against Soviet commanders for war crimes and crimes against humanity proceeded through the Lithuanian courts for decades. Russia did not extradite anyone. The convictions stand in Lithuanian law; their enforcement is another matter. The thirteen killed at the TV Tower are named in the memorial. You were there, or near enough that the distance does not matter anymore. The specific night — the cold, the noise, the crowds — is the founding memory of everything that came after.'
      }
      return 'Independence has been real for most of your adult life now. The country is in the EU and NATO, which are the structures that would have seemed unimaginable in January 1991. The January events — when it was unclear whether the independence declarations would survive — belong to the founding story. You were part of the founding story. The founding story is now taught to people who weren\'t born yet.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.karma += 4; p.setMem('ft20Jan1991Late', true); },
  },

  {
    id: 'ft20_russian_minority_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('russian_minority_baltic') &&
      G.age >= 55 &&
      !G.mem?.ft20RusMinLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2022) {
        return 'February 2022: Russia invades Ukraine. In the Baltic states, the Russian-speaking community is asked, implicitly and sometimes explicitly, to declare a position. The position of the Estonian and Latvian governments is that Russian speakers who are citizens or permanent residents are welcome but that the Russian state is not. The position is not the same as the community receiving it. You have been living this division — between your language community and your residential community — your entire adult life. 2022 sharpened it into something that required a daily answer.'
      }
      return 'The citizenship question resolved itself, for you, decades ago. What did not resolve is the specific position of Russian speakers in countries where the history of the Russian presence is inseparable from the history of Soviet occupation. You have lived your adult life in the gap between those two histories. The gap has been narrowing or widening depending on the decade. You have watched both movements.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft20RusMinLate', true); },
  },

  {
    id: 'ft20_eu_emigrant_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('eu_emigrant_baltic') &&
      G.age >= 50 &&
      !G.mem?.ft20EUBaltLate,
    text: (G) => {
      const country = G.character?.country?.name || 'your country'
      return `${country} is a different place from the country you left. The salaries have risen; the gap between Western Europe and home is narrower than it was in 2004. Some people are coming back. The question of whether you are a person who is coming back is one you are now actually asking, instead of holding in reserve as something you would decide later. The village you are from has fewer people than it had when you left. That is also part of the calculation.`
    },
    choices: [
      {
        text: 'You go back. The country is different enough to try again.',
        tag: null,
        outcome: 'The return is real. The country is different. You are also different. The combination produces something neither of you planned for.',
        effect: (p) => { p.m += 6; p.r += 4; p.setMem('ft20EUBaltLate', true); },
      },
      {
        text: 'You stay where you are. The roots took hold while you were not paying attention.',
        tag: null,
        outcome: 'The life here is the life. The country you came from is something you carry inside the life here. Both are real.',
        effect: (p) => { p.m += 4; p.r += 5; p.setMem('ft20EUBaltLate', true); },
      },
    ],
    effect: null,
  },

]
