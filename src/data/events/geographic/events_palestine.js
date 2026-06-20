// events_palestine.js
// Palestine-specific character events: Nakba displacement (family memory),
// checkpoint as daily fixture, house demolition, permit system, Oslo brief hope,
// intifadas, post-2006 Gaza/West Bank divergence.

const isPalestinian = (G) =>
  G.character?.country?.name === 'Palestine' ||
  G.character?.ethnicity === 'palestinian_arab' ||
  G.character?.ethnicity === 'bedouin_palestinian' ||
  (G.character?.country?.name === 'Lebanon' && G.character?.ethnicity === 'palestinian_lebanese')

export const PALESTINE_EVENTS = [

  // ── NAKBA FAMILY MEMORY ───────────────────────────────────────────────────────

  {
    id: 'pal_nakba_memory',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      isPalestinian(G) &&
      G.age >= 6 && G.age <= 14 &&
      (G.currentYear ?? 0) >= 1950 &&
      !G.mem?.palNakbaDone,
    text: (G) => {
      const yr = G.currentYear ?? 1965
      const isRefugee = G.character?.country?.name === 'Lebanon' || G.flags.has('in_refugee_camp')
      if (isRefugee) {
        return 'Your grandmother keeps a key on a hook by the door. The key is iron and larger than you expected a house key to be. She tells you it is to a house in Haifa that her mother was born in. You ask if you will go there. She says yes, you will go back. Later you understand that she says this not because she believes it but because the alternative is unbearable to say to a child.'
      }
      if (yr >= 1967 && yr <= 1990) {
        return 'The adults talk about 1948 as if it is present tense. Your grandfather describes the village — the stone houses, the olive trees, the specific smell of the bread his mother baked — in enough detail that you can see it. The village is gone; Israeli development built over it decades ago. The description keeps it alive in a way that has its own weight.'
      }
      return 'Your family carries 1948 as a living date. Not a historical one — a present condition. The proof of ownership for a house that no longer legally exists. The village name on a map that names it differently now. You grow up understanding that your family is from somewhere else, even though you have never been there.'
    },
    effect: (p) => { p.r += 8; p.addFlag('nakba_family_memory'); p.setMem('palNakbaDone', true) },
    choices: null,
  },

  // ── THE CHECKPOINT ─────────────────────────────────────────────────────────────

  {
    id: 'pal_checkpoint',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 16 && G.age <= 40 &&
      (G.currentYear ?? 0) >= 1967 &&
      !G.mem?.palCheckpointDone,
    text: (G) => {
      const yr = G.currentYear ?? 1985
      if (yr >= 2002) {
        return 'The checkpoint is on the route between your home and the next town. The queue can be twenty minutes or four hours — there is no way to know in advance. You are asked for your identity card. Your car is searched, or not, depending on the soldier\'s mood or instructions or rotation. You are late. You have learned to leave two hours before anything matters. You have also learned that the checkpoint is not a problem that will be solved. It is the arrangement.'
      }
      return 'The occupation has specific textures. The curfew that arrives without announcement. The soldier who is eighteen and frightened and armed and in your city. The permit you need to travel to a town twenty kilometres away. The permit request that disappears into an administrative system with no right of appeal you can access. You navigate this as you navigate other things: carefully, with low expectations of consistency.'
    },
    choices: [
      {
        text: 'Document it — the record matters even when nothing changes',
        tag: null,
        outcome: 'You begin keeping a record. This is a form of refusal that costs you nothing visible and changes nothing visible. It matters anyway.',
        effect: (p) => { p.e += 5; p.m -= 4; p.addFlag('documents_occupation'); p.setMem('palCheckpointDone', true) },
      },
      {
        text: 'Navigate around it — use every route and connection available',
        tag: null,
        outcome: 'You become expert in the alternative routes, the relatives who have permits, the ways through. This knowledge is shared freely. It is one of the inheritances.',
        effect: (p) => { p.s += 5; p.addFlag('occupation_navigator'); p.setMem('palCheckpointDone', true) },
      },
    ],
    effect: null,
  },

  // ── OSLO BRIEF HOPE ───────────────────────────────────────────────────────────

  {
    id: 'pal_oslo_hope',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isPalestinian(G) &&
      G.age >= 15 && G.age <= 40 &&
      (G.currentYear ?? 0) >= 1993 && (G.currentYear ?? 0) <= 1997 &&
      !G.mem?.palOsloDone,
    text: 'The Oslo handshake is on every television screen. Yasser Arafat and Yitzhak Rabin on the White House lawn. The adults you know are divided: some are cautiously hopeful, some say Arafat has given everything for nothing, some say any document that ends the occupation is worth signing. An older man at the coffee house says *inshallah* — God willing — the way people say it when they have learned not to attach too much certainty to anything they want. You do not know yet which of them is right. Neither do they.',
    choices: [
      {
        text: 'Let yourself hope — the framework is something',
        tag: null,
        outcome: 'You let the hope in. The hope has a date and the hope will have a cost. You do not know this yet.',
        effect: (p) => { p.m += 10; p.addFlag('oslo_hope'); p.setMem('palOsloDone', true) },
      },
      {
        text: 'Scepticism is the longer view here',
        tag: null,
        outcome: 'The sceptics will be proved right in specific ways. The hope was not wrong either. The logic of both positions depends on what you were hoping for.',
        effect: (p) => { p.m += 3; p.e += 5; p.setMem('palOsloDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pal_oslo_collapse',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isPalestinian(G) &&
      G.flags.has('oslo_hope') &&
      (G.currentYear ?? 0) >= 2000 && (G.currentYear ?? 0) <= 2005 &&
      !G.mem?.palOsloCollapseDone,
    text: 'The Camp David talks ended and then the Second Intifada began. The hope you held for seven years is identifiable as a specific object now — you know when it started and you can place when it ended. The settlements continued through the Oslo years. The checkpoints continued. The withdrawal that was promised did not happen on the timeline promised. This is the specific content of the betrayal, and you have memorised it.',
    effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('second_intifada_lived'); p.setMem('palOsloCollapseDone', true) },
    choices: null,
  },

  // ── FIRST INTIFADA ─────────────────────────────────────────────────────────────

  {
    id: 'pal_first_intifada',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 14 && G.age <= 30 &&
      (G.currentYear ?? 0) >= 1987 && (G.currentYear ?? 0) <= 1993 &&
      !G.mem?.palFirstIntifadaDone,
    text: 'The uprising began in December 1987. The economics of it are specific: you throw what you have, which is stones, at an army that has automatic weapons. The mathematics of the exchange are not equal. The stone has a different logic — it is a refusal that is also visible, that cannot be disappeared or filed away. The curfews that follow are collective. The schools that close are collective. You understand now what collective punishment is from the inside.',
    choices: [
      {
        text: 'Participate in the civil disobedience — the strikes, the commerce boycotts',
        tag: null,
        outcome: 'You do what can be done without a weapon. The record of what was done is long.',
        effect: (p) => { p.m += 5; p.karma += 8; p.addFlag('first_intifada_participant'); p.setMem('palFirstIntifadaDone', true) },
      },
      {
        text: 'Protect the family — visibility is dangerous',
        tag: null,
        outcome: 'The protection is real. The cost is the knowledge of what was not done while the protection was happening.',
        effect: (p) => { p.m -= 5; p.r += 6; p.setMem('palFirstIntifadaDone', true) },
      },
    ],
    effect: null,
  },

  // ── HOUSE DEMOLITION ──────────────────────────────────────────────────────────

  {
    id: 'pal_house_demolition',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 25 && G.age <= 55 &&
      (G.currentYear ?? 0) >= 1967 &&
      !G.mem?.palHouseDemolitionDone,
    text: (G) => {
      const yr = G.currentYear ?? 1995
      const isFamily = Math.random() < 0.5
      if (isFamily) {
        return 'The notice came three days before. The house your father built in 1971 was demolished for lack of a permit — a permit that cannot legally be obtained in this zone. The furniture was removed in time. The walls came down in an hour. The foundation is rubble. Your father sat in the rubble for a long time and did not say anything. There is no compensation and no appeal process with a realistic outcome.'
      }
      return 'A house two streets from yours was demolished last week. The owner\'s son was charged with an attack; the demolition is collective punishment, legal under military orders. The logic of it — punishing the family — produces a specific knowledge in your neighbourhood about what proximity to resistance costs. You understand both the resistance and the cost from where you are standing.'
    },
    effect: (p) => { p.m -= 18; p.r += 10; p.h -= 5; p.addFlag('witnessed_demolition'); p.setMem('palHouseDemolitionDone', true) },
    choices: null,
  },

  // ── GAZA / WEST BANK DIVERGENCE ───────────────────────────────────────────────

  {
    id: 'pal_gaza_siege',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 18 && G.age <= 55 &&
      (G.currentYear ?? 0) >= 2007 &&
      !G.mem?.palGazaSiegeDone,
    text: (G) => {
      const yr = G.currentYear ?? 2010
      return `Since 2007, Gaza has been under blockade. The movement of goods, people, and materials is controlled by a system that distinguishes between civilian and military goods in ways that are contested at every checkpoint. You know people in Gaza you cannot visit. They know the specific constraints of the blockade in the way people who live inside a closed system always know it: not as statistics but as the list of things that are not available, the medicines that take months to arrive, the ceiling that defines the possible.`
    },
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('knows_gaza_siege'); p.setMem('palGazaSiegeDone', true) },
    choices: null,
  },

  // ── EDUCATION AS RESISTANCE ───────────────────────────────────────────────────

  {
    id: 'pal_education_resistance',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isPalestinian(G) &&
      G.age >= 18 && G.age <= 30 &&
      G.stats.smarts >= 55 &&
      !G.mem?.palEducationDone,
    text: 'Palestine has among the highest literacy and university enrollment rates in the Arab world — this is partly UNRWA schools in the camps, partly a specific cultural investment in education as the thing the occupation cannot confiscate. You are the person your family sacrificed for. The degree may or may not produce employment in a territory where the economy is constrained by the occupation\'s terms. The education is not conditional on the employment.',
    choices: [
      {
        text: 'Study and stay — this is your place and you will build in it',
        tag: null,
        outcome: 'The staying is not passive. The building is real, if constrained. You are part of the civic infrastructure that persists.',
        effect: (p) => { p.e += 10; p.m += 5; p.karma += 5; p.addFlag('educated_stayed'); p.setMem('palEducationDone', true) },
      },
      {
        text: 'Study and leave — the diaspora is also Palestine',
        tag: null,
        outcome: 'You leave. The community abroad is large and connected. The question of return is always there.',
        effect: (p) => { p.e += 10; p.m += 3; p.r += 8; p.addFlag('emigrated'); p.addFlag('palestinian_diaspora'); p.setMem('palEducationDone', true) },
      },
    ],
    effect: null,
  },

  // ── REFUGEE CAMP AS HOME ──────────────────────────────────────────────────

  {
    id: 'pal_refugee_camp_generations',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isPalestinian(G) &&
      (G.flags.has('in_refugee_camp') || G.character?.country?.name === 'Lebanon' || G.character?.country?.name === 'Jordan') &&
      G.age >= 6 && G.age <= 20 &&
      (G.currentYear ?? 0) >= 1950 &&
      !G.mem?.palCampGenFired,
    text: 'The camp was established in 1948 as temporary shelter. Three generations later it has streets with names, schools, a bakery, a mosque, a place where the old men sit and argue about what was lost — in a village that none of the current population has ever seen. You are the second or third generation born here. The country your identity is named for is a bus ride away if the bus were permitted to cross. You have never been. The key on the hook by the door is for a lock that no longer exists.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 10; p.addFlag('camp_is_home'); p.setMem('palCampGenFired', true) },
  },

  // ── OLIVE HARVEST ─────────────────────────────────────────────────────────

  {
    id: 'pal_olive_harvest',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 16 && G.age <= 60 &&
      (G.currentYear ?? 0) >= 1980 &&
      !G.mem?.palOliveHarvestFired,
    text: 'The olive harvest is in October. The trees your grandfather planted take forty years to mature. This year the harvest requires coordination with the army for access to fields adjacent to a settlement. The settlers sometimes arrive during the harvest. Last year a neighbouring family\'s trees were uprooted by settlers the week before harvest — sixty trees, some of them fifty years old. The army did not arrive for two hours. You harvest what you can, faster than usual, before anything else can happen.',
    choices: [
      {
        text: 'Document what is happening — the record matters',
        tag: null,
        outcome: 'You photograph, note names and times. The record goes to the human rights organisation. Nothing changes immediately. The record exists.',
        effect: (p) => { p.e += 3; p.addFlag('olive_trees_burned'); p.setMem('palOliveHarvestFired', true) },
      },
      {
        text: 'Harvest fast and get out — safety over record',
        tag: null,
        outcome: 'You get what you came for and leave before anything escalates. The olive oil this year will taste like what it cost to make it.',
        effect: (p) => { p.m -= 6; p.addFlag('olive_trees_burned'); p.setMem('palOliveHarvestFired', true) },
      },
    ],
    effect: null,
  },

  // ── ADMINISTRATIVE DETENTION ──────────────────────────────────────────────

  {
    id: 'pal_administrative_detention',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 18 && G.age <= 60 &&
      (G.currentYear ?? 0) >= 1967 &&
      !G.mem?.palDetentionFired,
    text: 'Your brother was taken at 3 AM. The detention order is "administrative" — six months, renewable, without charges, without trial, without a specific accusation that can be challenged in court. The military courts have a conviction rate above 99 percent for cases that do reach trial; administrative detention requires no trial at all. You have hired a lawyer. The lawyer explains that there is very little a lawyer can do here. You continue paying the lawyer.',
    choices: [
      {
        text: 'Fight through every legal channel available',
        tag: null,
        outcome: 'The legal channels are narrow and slow. You use them all. Your brother is eventually released. The order is renewed once before it ends.',
        effect: (p) => { p.m -= 12; p.mo -= 1500; p.addFlag('family_detained_israel'); p.setMem('palDetentionFired', true) },
      },
      {
        text: 'Wait — the system operates on its own calendar',
        tag: null,
        outcome: 'You wait. The administrative order expires. Your brother comes home thinner and quieter. The order is not renewed this time.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('family_detained_israel'); p.setMem('palDetentionFired', true) },
      },
    ],
    effect: null,
  },

  // ── DIFFERENTIAL WATER ACCESS ─────────────────────────────────────────────

  {
    id: 'pal_water_access',
    phase: 'childhood',
    weight: 6,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 8 && G.age <= 25 &&
      (G.currentYear ?? 0) >= 1967 &&
      !G.mem?.palWaterFired,
    text: 'The settlement above the valley has a swimming pool. You can see it from the road. Your family gets water three days a week when supply holds. This is not coincidence — the agreements that divided water access allocate Palestinian communities a fixed amount that has not kept pace with population growth. The settler families use four times more water per person from the same aquifer. You do not need to read a report to know this ratio. You live the ratio.',
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('water_ration_life'); p.setMem('palWaterFired', true) },
  },

  // ── INSIDE A MILITARY OPERATION ───────────────────────────────────────────

  {
    id: 'pal_gaza_bombardment',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.character?.country?.name === 'Palestine' &&
      G.age >= 16 && G.age <= 65 &&
      (G.currentYear ?? 0) >= 2008 &&
      !G.mem?.palGazaBombFired,
    text: (G) => {
      const yr = G.currentYear ?? 2014
      const operation = yr <= 2009 ? 'Operation Cast Lead' : yr <= 2013 ? 'Operation Pillar of Defense' : yr <= 2015 ? 'Operation Protective Edge' : 'the most recent Israeli military operation'
      return `The F-16s begin at night. The targets are announced after the fact. You are in your apartment with your children when the nearest strike hits a building two streets away. The building was residential. Your children do not stop hearing the sound for several days after the sound stops. You have memorised the location of the basement. You do not know if a basement is useful against a 2,000-pound bomb. ${operation} will leave the neighbourhood you are in changed in ways that take months to understand.`
    },
    choices: [
      {
        text: 'Stay in the apartment — moving draws attention and the shelters are full',
        tag: null,
        outcome: 'You stay. The operation ends. The building two streets away is not rebuilt for two years. You pass the rubble every day.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('inside_gaza_bombardment'); p.setMem('palGazaBombFired', true) },
      },
      {
        text: 'Move to a relative\'s house — anywhere but here',
        tag: null,
        outcome: 'You move. The relative\'s house is also in Gaza. There is no truly safe place here, only less exposed ones.',
        effect: (p) => { p.m -= 15; p.addFlag('inside_gaza_bombardment'); p.setMem('palGazaBombFired', true) },
      },
    ],
    effect: null,
  },

  // ── THE QUESTION OF RETURN ────────────────────────────────────────────────

  {
    id: 'pal_late_return_question',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      isPalestinian(G) &&
      G.flags.has('nakba_family_memory') &&
      G.age >= 55 &&
      !G.mem?.palLateReturnFired,
    text: 'You are the generation that will not return. You have understood this for years — not as acceptance, not as abandonment, but as arithmetic. The village your grandparents described is a suburb now. The house was demolished in 1950. The land is registered under a different name under a different state. The key on the hook is for a lock that was replaced before your parents were born. You give it to your grandchild anyway. The act of giving it says what the words cannot.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 5; p.addFlag('nakba_day_keeper'); p.setMem('palLateReturnFired', true) },
  },

]
