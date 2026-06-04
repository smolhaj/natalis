// BUILD 55 — Sri Lanka arc
// 26-year civil war between Sinhalese-dominated government and Tamil Tigers (LTTE), 1983–2009.
// Black July 1983: anti-Tamil pogrom, 2,000–3,000 dead, 100,000 displaced.
// 2009 Mullaittivu: war ended in a coastal strip massacre, tens of thousands of civilian dead.
// Tamil diaspora: Toronto, London, Melbourne — 800,000+ abroad.
// 2022 economic collapse: fuel queues, 12-hour power cuts, president fled by speedboat.

const IS_SRI_LANKA = (G) => G.character.country?.name === 'Sri Lanka'
const IS_TAMIL = (G) => G.character.ethnicity === 'sri_lankan_tamil'
const IS_SINHALESE = (G) => G.character.ethnicity === 'sinhalese'

export const SRI_LANKA_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'slk_diaspora_war_end',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('tamil_diaspora') && G.currentYear >= 2009 && G.currentYear <= 2011 && !G.mem.slkDiasWarEnd,
    text: 'May 2009. The news comes in fragments from unreliable sources. The LTTE is defeated. The last strip of territory at Mullaittivu — the civilians who were inside it. The Sri Lankan army has won. The international community calls it the end of the civil war. Tamil diaspora communities call the end something else. The number of civilian dead is disputed: 40,000, 70,000, more. Nobody is held accountable. You watch this from Toronto.',
    choices: [
      {
        text: 'Organise with the diaspora community.',
        tag: 'organised',
        outcome: 'You attend vigils. You sign petitions for an international accountability process that is never established. You carry this in the specific way of someone who watched from a safe distance.',
        effect: (p) => { p.m -= 12; p.karma += 6; p.addFlag('political_active'); p.setMem('slkDiasWarEnd', true) },
      },
      {
        text: 'Sit with it alone.',
        tag: 'alone',
        outcome: 'There is no tribunal to believe in. There is only the number, which remains disputed, and the absence of the people who were inside it.',
        effect: (p) => { p.m -= 15; p.setMem('slkDiasWarEnd', true) },
      },
    ],
  },

  {
    id: 'slk_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => IS_SRI_LANKA(G) && G.age >= 60 && (G.flags.has('black_july_survived') || G.flags.has('war_childhood')) && !G.mem.slkLateReckoning,
    text: 'They renamed the roads. Not all of them — some of the old names are still on the signposts in faded paint. The war is twenty years over. Your children and their children have grown up in a country that does not discuss what the war ended with. There is a memorial at Mullivaikkal that is built and then torn down and then rebuilt. The official story and the story you carry are not the same story.',
    effect: (p) => { p.m -= 6; p.setMem('slkLateReckoning', true) },
  },

  // ── BLACK JULY 1983 ───────────────────────────────────────────────────────

  {
    id: 'slk_black_july',
    phase: 'young_adult',
    weight: 5,
    when: (G) => IS_TAMIL(G) && IS_SRI_LANKA(G) && G.currentYear === 1983 && !G.mem.slkBlackJuly,
    text: 'July 23. An LTTE ambush killed 13 soldiers. By July 25 the mobs are in the Tamil neighbourhoods of Colombo with electoral registers — someone printed lists of which houses are Tamil. The police are present in the specific way of people who have been told to be present without acting. The fire is visible from three streets. The city you have lived in your whole life is reorganising itself around a line you did not know was there.',
    choices: [
      {
        text: 'Hide with Sinhalese friends or colleagues.',
        tag: 'hidden',
        outcome: 'A colleague hides your family for four days. You have known them for six years. You did not know, until now, what that friendship was capable of. You will not forget either thing.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.karma += 5; p.addFlag('black_july_survived'); p.setMem('slkBlackJuly', true) },
      },
      {
        text: 'Try to reach the north.',
        tag: 'fled_north',
        outcome: 'You reach Jaffna. The journey takes four days. What you saw on the road becomes something you do not describe afterward.',
        effect: (p) => { p.m -= 22; p.h -= 8; p.addFlag('black_july_survived'); p.addFlag('internally_displaced'); p.setMem('slkBlackJuly', true) },
      },
    ],
  },

  {
    id: 'slk_black_july_sinhalese',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_SINHALESE(G) && IS_SRI_LANKA(G) && G.currentYear === 1983 && !G.mem.slkBlackJulySin,
    text: 'The mob passes your street and continues. You know the reason your house was passed: you are Sinhalese, and your house is visibly Sinhalese. You also know your Tamil colleague lives four streets away. You do not go to check. For many years you tell yourself you could not have changed the outcome. This is probably true. It is also not the full truth.',
    choices: [
      {
        text: 'Go and check on them.',
        tag: 'went_to_check',
        outcome: 'Their house is burned. They are not there. You find out, eventually, that they made it north. You carry both things: that you went, and that you were too late.',
        effect: (p) => { p.m -= 15; p.karma += 10; p.setMem('slkBlackJulySin', true) },
      },
      {
        text: 'Stay inside. You have a family to protect.',
        tag: 'stayed_inside',
        outcome: 'Your family is safe. You hear about the street four blocks away from someone else, later. You do not discuss what you did or did not do.',
        effect: (p) => { p.m -= 10; p.karma -= 5; p.setMem('slkBlackJulySin', true) },
      },
    ],
  },

  // ── JAFFNA UNDER CONFLICT ─────────────────────────────────────────────────

  {
    id: 'slk_jaffna_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_TAMIL(G) && IS_SRI_LANKA(G) && G.currentYear >= 1985 && G.currentYear <= 2000 && G.age >= 6 && G.age <= 16 && !G.mem.slkJaffnaChild,
    text: 'The school has a schedule now that accounts for shelling. Classes stop when the sound is certain; resume when it\'s uncertain. You learn which sound means how far. You learn this the way children learn anything — by repetition, by watching adults, by the specific calibration of their stillness. In Jaffna in the nineties, the electricity comes at intervals and the library has books that stop at 1982 and you study by kerosene because the exam still happens.',
    effect: (p) => { p.m -= 10; p.h -= 3; p.addFlag('war_childhood'); p.setMem('slkJaffnaChild', true) },
  },

  // ── DIASPORA DECISION ─────────────────────────────────────────────────────

  {
    id: 'slk_diaspora_decision',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_TAMIL(G) && IS_SRI_LANKA(G) && G.age >= 18 && G.age <= 32 && !G.mem.slkDiasDecision,
    text: 'Canada processes Tamil refugee claims. Britain, Australia, Germany. The Tamil diaspora is already large enough to have a phone tree — someone you know knows someone. The LTTE taxes the diaspora, which you will be asked to contribute to whether you want to or not. The alternative is staying in a country that burned your neighbourhood in 1983 and whose army controls the checkpoints in your city.',
    choices: [
      {
        text: 'Go. The war has no exit here.',
        tag: 'left',
        outcome: 'Toronto or London or Melbourne. You carry the photo that fits in your pocket. You become the person the diaspora calls when a new arrival needs help.',
        effect: (p) => { p.addFlag('tamil_diaspora'); p.addFlag('emigrated'); p.setResidency('refugee_status'); p.setMem('slkDiasDecision', true) },
      },
      {
        text: 'Stay. Your family is here.',
        tag: 'stayed',
        outcome: 'Most of the people you grew up with leave over the next decade. You become the one who answers their questions about how it is now.',
        effect: (p) => { p.m -= 8; p.addFlag('stayed_behind'); p.setMem('slkDiasDecision', true) },
      },
    ],
  },

  // ── WAR END 2009 ──────────────────────────────────────────────────────────

  {
    id: 'slk_war_ends_sinhalese',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_SINHALESE(G) && IS_SRI_LANKA(G) && G.currentYear === 2009 && !G.mem.slkWarEndSin,
    text: 'May 2009. The government declares the war is over. President Rajapaksa\'s face is everywhere. There are fireworks in Colombo. The army has won. The question of how many civilians died in the final offensive — the UN says 40,000, others say more — is not the question being asked on the television. The question being asked is: after twenty-six years, what do you do with a country at peace.',
    choices: [
      {
        text: 'Feel relief. The war is over.',
        tag: 'relieved',
        outcome: 'The relief is real. The question of the final offensive is a question for later, which becomes a question never asked by anyone with power to ask it.',
        effect: (p) => { p.m += 8; p.setMem('slkWarEndSin', true) },
      },
      {
        text: 'The cost of the ending troubles you.',
        tag: 'troubled',
        outcome: 'The specific word "victory" and what it required troubles you. You are in a minority of your community in this. You do not say it at the dinner table.',
        effect: (p) => { p.m += 3; p.karma += 6; p.setMem('slkWarEndSin', true) },
      },
    ],
  },

  // ── 2022 ECONOMIC COLLAPSE ────────────────────────────────────────────────

  {
    id: 'slk_2022_collapse',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_SRI_LANKA(G) && G.currentYear >= 2022 && G.currentYear <= 2023 && !G.mem.slk2022,
    text: 'The petrol queue has been there since Tuesday. The queue is longer than you have ever seen a queue. The rupee has lost half its value against the dollar since January. The power cuts run twelve hours now. Last week a man died in the petrol queue of heat exhaustion. The president is somewhere in the Maldives, having left by speedboat from the naval base. The crowds are inside the presidential residence photographing themselves in the president\'s swimming pool.',
    choices: [
      {
        text: 'Join the protest at Galle Face Green.',
        tag: 'protested',
        outcome: 'The movement is called *Aragalaya* — the struggle. It is peaceful and furious and multiethnic in a way that surprises everyone, including itself.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('political_active'); p.addFlag('aragalaya_generation'); p.setMem('slk2022', true) },
      },
      {
        text: 'Manage the daily reality. Keep the family fed.',
        tag: 'managed',
        outcome: 'The petrol, the generator, the cooking gas. Every day is a logistics problem. You solve it. The politics will sort itself eventually or it won\'t.',
        effect: (p) => { p.m -= 10; p.mo -= 1500; p.setMem('slk2022', true) },
      },
    ],
  },
]
