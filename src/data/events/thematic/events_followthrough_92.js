// Follow-through events for Ivory Coast depth arc
// Covers: ci_dozo_witness, ci_cocoa_child_labor, ci_ouattara_era_witness, ci_licorne_era

const IS_IVORIAN = (G) => G.character.country?.name === 'Ivory Coast'

export const FOLLOWTHROUGH_92_EVENTS = [

  {
    id: 'ft92_dozo_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.flags.has('ci_dozo_witness') &&
      G.age >= 55 &&
      !G.mem?.ft92Dozo,
    text: 'The Dozos have receded from what they were during the war years. The talisman tunics are more ceremony now than checkpoint. What they were during the crisis years — the authority they exercised in the vacuum between the state\'s collapse and its reassembly — is not in the official history of the war. The official history names the combatants with guns. The Dozos were in a different category. The category does not have a clear name in the reconciliation commission\'s report. You know what they were. The report knows what the report says.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft92Dozo', true) },
  },

  {
    id: 'ft92_cocoa_child_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.flags.has('ci_cocoa_child_labor') &&
      G.age >= 55 &&
      !G.mem?.ft92CocoaChild,
    text: 'The international reports on child labour in Ivorian cocoa have been coming for thirty years. The major chocolate companies sign protocols and commitments that expire and are renewed. The number of children working in cocoa farms in Ivory Coast increased between 2000 and 2020, despite the protocols. You know what the work was like because you did the work. The reports describe it from the outside of it. The thing the reports miss is not the condition but the normalcy — the way that July was simply July, the machete heavy and the pods present and the question of whether you should be doing this never part of the day\'s language.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft92CocoaChild', true) },
  },

  {
    id: 'ft92_ouattara_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.flags.has('ci_ouattara_era_witness') &&
      G.age >= 60 &&
      !G.mem?.ft92Ouattara,
    text: 'Ouattara served two terms under a constitution that allowed two terms and then ran for a third under a new constitution that reset the count. He won. His supporters called it legal. His opponents called it what it was. The GDP growth continued and the justice for 2010 did not arrive for the people on his side who committed crimes, and you have spent your late life in a country that grew and did not fully reckon, which is a condition Ivory Coast shares with most countries but which is yours to live in specifically.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft92Ouattara', true) },
  },

  {
    id: 'ft92_licorne_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.flags.has('ci_licorne_era') &&
      G.age >= 55 &&
      !G.mem?.ft92Licorne,
    text: 'France withdrew Operation Licorne in 2015. Thirteen years of French troops in Ivory Coast. The French did not prevent the civil war. The French did not prevent the 2010 election crisis. The French did intervene in 2011 and the intervention ended with Ouattara in power, who is more aligned with French interests than Gbagbo was. The sequencing of these facts is not proof of anything. The sequencing is the sequencing. You have thought about it for years and you have arrived at a position that is not comfortable and is also not false.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft92Licorne', true) },
  },

]
