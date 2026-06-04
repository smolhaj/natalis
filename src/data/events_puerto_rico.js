export const PUERTO_RICO_EVENTS = [
  {
    id: 'pr_maria_2017',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.character.country?.name === 'Puerto Rico' && G.currentYear === 2017 && !G.mem.prMaria,
    text: 'Category 5. The island loses power — not most of it, all of it. The grid is gone. FEMA\'s response arrives on a timeline designed for a state, not a territory. The president tweets about Puerto Rico\'s debt. You are an American citizen. You cannot vote for president. The death toll the government reports is 64. The study published a year later says 2,975. The gap between those numbers is a policy.',
    effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('maria_survivor'); p.setMem('prMaria', true) },
  },
  {
    id: 'pr_colonial_status',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country?.name === 'Puerto Rico' && G.age >= 18 && G.age <= 28 && !G.mem.prColonial,
    text: 'You are a US citizen by birth. You pay federal taxes. You cannot vote in a presidential election while living on the island. Congress can override your legislature. The word for this arrangement is "territory." The other word is not used in official documents.',
    effect: (p) => { p.m -= 6; p.e += 3; p.addFlag('colonial_subject'); p.setMem('prColonial', true) },
  },
]
