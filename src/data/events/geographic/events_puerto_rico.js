export const PUERTO_RICO_EVENTS = [
  {
    id: 'pr_maria_2017',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.character.country?.name === 'Puerto Rico' && G.currentYear === 2017 && !G.mem.prMaria,
    text: 'Category 5, and the whole island loses power, all of it. The federal response arrives on a timetable built for a state, not a territory, and the president tweets about the island\'s debt and throws paper towels into a crowd. You are an American citizen and you cannot vote for president. The government says sixty-four people died. A study a year later says nearly three thousand. The gap between those numbers is a policy.',
    context: 'Hurricane María struck Puerto Rico on 20 September 2017. The official toll of 64 was revised to 2,975 in August 2018 after a George Washington University study.',
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
