// Netherlands arc events
//
// The Dutch story has specific textures rarely understood from outside:
//  — Verzuiling (pillarization): every Dutch person born 1920–1970 belonged to a
//    'pillar' — Catholic, Protestant, Socialist, Liberal — that determined their school,
//    hospital, trade union, newspaper, sports club, broadcaster. Not a metaphor: a real
//    institutional segregation that organized daily life and collapsed within a generation.
//  — The Hunger Winter 1944–45: 22,000 Dutch civilians died. Children ate tulip bulbs.
//    This is family memory for anyone born 1945–1970.
//  — Surinamese independence 1975: ~150,000 Surinamese moved to the Netherlands in
//    months (nearly half of Suriname's population), reshaping Dutch cities.
//  — Srebrenica 1995: Dutch UN peacekeepers (Dutchbat) stood by while Bosnian Serb
//    forces took 8,000 Muslim men and boys. A specific national wound.
//  — Pim Fortuyn 2002: The first major post-9/11 anti-immigration political movement
//    in Western Europe was led by an openly gay sociology professor. He was shot in
//    a radio station car park by an animal rights activist. The country had no frame
//    for this and still doesn't.

export const NETHERLANDS_EVENTS = [

  // ── HUNGER WINTER FAMILY MEMORY ──────────────────────────────────────────────

  {
    id: 'nl_hunger_winter_memory',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.nl_hunger_winter,
    text: 'Your parents do not waste food. It is not a philosophy: it is the Hunger Winter, when the Germans cut off the west of the country and people ate tulip bulbs. Your parents were children then. Your mother finishes everything on her plate and does not explain why. You understand it the way children understand things nobody explains, by watching what adults do with their hands around certain subjects.',
    context: 'About 20,000 people died in the Dutch famine of 1944-45.',
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('nl_hunger_winter_generation'); p.setMem('nl_hunger_winter', true); },
  },

  // ── VERZUILING (PILLARIZATION) ───────────────────────────────────────────────

  {
    id: 'nl_verzuiling',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.nl_verzuiling,
    text: (G) => {
      const rel = G.religion
      const pillar = rel === 'christian_catholic' ? 'Catholic'
        : rel === 'christian_protestant' ? 'Protestant'
        : rel === 'secular' || rel === 'atheist' ? 'Socialist'
        : 'Liberal'
      return `The system is called verzuiling — pillarization. You go to the ${pillar} school, your family reads the ${pillar} newspaper, your father belongs to the ${pillar} trade union, you play sport in the ${pillar} club. The other pillars are not enemies — they are simply other worlds that you walk past but do not enter. The Dutch consensus behind this arrangement is called pacification: everyone gets their own world and nobody has to deal with the others. It is efficient and deeply strange.`
    },
    choices: null,
    effect: (p) => { p.addFlag('nl_pillarization_generation'); p.setMem('nl_verzuiling', true); },
  },

  // ── PROVO / AMSTERDAM YOUTH REVOLT ───────────────────────────────────────────

  {
    id: 'nl_provo_youth',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1965 && G.currentYear <= 1980 &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.nl_provo,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1967
        ? 'The Provos are a Dutch phenomenon — happenings, white bicycles, smoke bombs at the royal wedding. Rob Stolk and Roel van Duijn. The authorities respond with batons. The television shows both and the country has to look at both. It is funny and political and specifically Dutch in its refusal to be entirely serious about anything, including the police.'
        : yr <= 1972
        ? 'The kraakbeweging — the squatters movement — has a different texture from the Provo happenings: more serious, more permanent. Amsterdam has thousands of empty buildings while people have nowhere to live. The math is visible and someone has decided to make it physical.'
        : 'The squatters are still there. In the 1980s the movement peaks at Vondelstraat and Wijers, the police and army clearing buildings with tanks. A tank, in Amsterdam, in peacetime. That image stays with you.'
    },
    choices: [
      {
        text: 'You are part of it, or on its edges',
        tag: null,
        outcome: 'Amsterdam in the late 1960s and 1970s is doing something that Amsterdam keeps doing — producing a politics of creative disruption that is hard to replicate elsewhere because it requires a Dutch tolerance for its own contradiction.',
        effect: (p) => { p.m += 4; p.addFlag('nl_provo_generation'); p.setPolitical('left'); p.setMem('nl_provo', true); },
      },
      {
        text: 'You watch from a distance — the disruption seems more gesture than substance',
        tag: null,
        outcome: 'The gestures produce the white bicycle program, which fails. They also produce a housing movement that reshapes Dutch cities. The substance was in the gesture.',
        effect: (p) => { p.r += 3; p.setMem('nl_provo', true); },
      },
    ],
    effect: null,
  },

  // ── SURINAMESE INDEPENDENCE AND ARRIVAL ──────────────────────────────────────

  {
    id: 'nl_surinamese_wave',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.age >= 18 &&
      !G.mem?.nl_surinamese,
    text: 'Suriname becomes independent on November 25, 1975. In the months before and after, approximately 150,000 Surinamese — nearly half of Suriname\'s population — move to the Netherlands, exercising their right to Dutch citizenship before it expires. Amsterdam, Rotterdam, The Hague. The cities change fast. Your neighbourhood changes fast or someone else\'s neighbourhood changes fast and that is what the newspapers are reporting. The Dutch word for what this produces is not agreed on.',
    choices: [
      {
        text: 'The city becoming more itself — more varied, more interesting',
        tag: null,
        outcome: 'This is one Dutch response: the pragmatic welcome, the tolerance that is not always warm but is usually functional. The new Dutch are becoming Dutch in the Dutch way: by themselves.',
        effect: (p) => { p.m += 3; p.addFlag('nl_multicultural_generation'); p.setMem('nl_surinamese', true); },
      },
      {
        text: 'The pace of change is too fast for the institutions that are supposed to manage it',
        tag: null,
        outcome: 'The Dutch state was not designed for this scale of immigration this fast. The housing shortage. The school places. The honest assessment is that nobody planned for 150,000 people arriving because the planning preceded the decision.',
        effect: (p) => { p.r += 4; p.addFlag('nl_multicultural_generation'); p.setMem('nl_surinamese', true); },
      },
    ],
    effect: null,
  },

  // ── SREBRENICA AND DUTCH GUILT ────────────────────────────────────────────────

  {
    id: 'nl_srebrenica_1995',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1995 && G.currentYear <= 1997 &&
      G.age >= 20 &&
      !G.mem?.nl_srebrenica,
    text: 'July 1995. The Dutch battalion is in Srebrenica, a UN safe area, when Mladić\'s forces arrive, and the Dutch soldiers hand over the men and boys. Over the next days the men and boys are shot. The Dutch were outnumbered, had been told not to use force, and some of them drank with Mladić. The Netherlands spends the next thirty years disagreeing about what happened. The word it uses is trauma; the courts in The Hague use other words.',
    context: 'About 8,000 Bosniak men and boys were murdered after the fall of Srebrenica on 11 July 1995.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.karma += 4; p.addFlag('nl_srebrenica_generation'); p.setMem('nl_srebrenica', true); },
  },

  // ── PRIM FORTUYN 2002 ─────────────────────────────────────────────────────────

  {
    id: 'nl_fortuyn_2002',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2002 && G.currentYear <= 2003 &&
      G.age >= 20 &&
      !G.mem?.nl_fortuyn,
    text: 'May 6, 2002. Pim Fortuyn is shot in the car park of a radio station in Hilversum, nine days before an election he might have won. He was a sociology professor in silk scarves, openly gay, who said Islam was a threat to Dutch freedoms and wanted the borders closed, and nobody here has a frame for him. The man who shot him was an animal rights activist. The country holds all of it at once.',
    choices: [
      {
        text: 'He was saying things that needed to be said, however he said them',
        tag: null,
        outcome: 'The party he founded wins 26 seats nine days after his death. Then implodes in 87 days in government. The things he said remain in the Dutch political conversation, differently now that he cannot be asked to clarify them.',
        effect: (p) => { p.addFlag('nl_fortuyn_witness'); p.setMem('nl_fortuyn', true); },
      },
      {
        text: 'What he was doing was dangerous, and the outcome was one of its dangers',
        tag: null,
        outcome: 'Political violence in the Netherlands, 2002. The country had not had this before and the absence was part of the Dutch self-understanding. The absence is now over.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('nl_fortuyn_witness'); p.setMem('nl_fortuyn', true); },
      },
    ],
    effect: null,
  },

  // ── DUTCH COLONIAL RECKONING ──────────────────────────────────────────────────

  {
    id: 'nl_colonial_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2011 &&
      G.age >= 25 &&
      !G.mem?.nl_colonial_reckoning,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 2015
        ? 'The Dutch East Indies — Indonesia. The VOC: the first multinational corporation and one of history\'s great engines of extraction. The Bersiap period after WWII: Dutch soldiers conducting what official Dutch history has called "police actions" and what Indonesian historians call a colonial war of reconquest. Three hundred and fifty years of colonial rule ending in negotiation rather than acknowledgment. The Netherlands is still working out what acknowledgment looks like.'
        : yr <= 2021
        ? 'The Dutch king apologizes for the colonial past at a ceremony in Jakarta. The word "slavery" is in the speech. This is a first. The descendants of enslaved people in Suriname and the Caribbean note that this is also the extent of it so far — acknowledgment without reparation. The process is at this stage.'
        : 'December 19, 2022. The Dutch Prime Minister formally apologizes for the Netherlands\' role in slavery — the Atlantic slave trade, the plantations in Suriname, the 600,000 enslaved people. The apology comes 150 years after abolition. Surinamese and Antillean community organizations had been asking for it for two decades. The question of reparations is in the statement without being answered.'
    },
    choices: null,
    effect: (p) => { p.addFlag('nl_colonial_reckoning_generation'); p.setMem('nl_colonial_reckoning', true); },
  },

  // ── THE DUTCH AND WATER ───────────────────────────────────────────────────────

  {
    id: 'nl_water_country',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.age >= 8 && G.age <= 15 &&
      !G.mem?.nl_water,
    text: 'A quarter of the Netherlands is below sea level. Another quarter is at sea level. The polders — reclaimed land held back by dykes and windmills and pump stations — are not just landscape: they are the permanent collective project of a country that exists by agreement with the North Sea. In school you learn about the 1953 North Sea flood that killed 1,836 people and prompted the Delta Works — one of the largest hydraulic engineering projects in human history. You learn this partly as a disaster and partly as a triumph and partly as a warning about the deal.',
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('nl_water_generation'); p.setMem('nl_water', true); },
  },

]

export default NETHERLANDS_EVENTS
