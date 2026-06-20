// events_water_infra.js — Water, infrastructure, and the body in rural space (BUILD 42)
// Complements events_infrastructure.js (urban: power cuts, water shortages) and
// events_rural_texture.js (which covers the water walk and borehole arrival).
// This file adds: pump committee politics, the adult water walk echo,
// dry-season scarcity, village electrification (missing from rural_texture),
// and the Cochabamba water privatization 2000.

const RURAL_LOW_GDP = (G) =>
  ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.currentCountry?.archetype) &&
  (G.ruralUrban === 'rural' || G.ruralUrban === 'small_town') &&
  ['very_low', 'low', 'low_medium'].includes(G.currentCountry?.gdp)

const FEMALE = (G) => G.character.gender === 'female'

export const WATER_INFRA_EVENTS = [

  // ── THE DRY SEASON ────────────────────────────────────────────────────────────
  // Annual, brutal, and entirely predictable. The specific knowledge of thirst.

  {
    id: 'wi_dry_season',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      RURAL_LOW_GDP(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 6 && G.age <= 16 &&
      !G.flags.has('village_electrified') &&
      !G.mem?.wiDrySeason,
    text: 'In the dry season the river is a wide pale scar and the water in it is slow, warm, and not safe to drink without boiling. You have known this since before you could name it. You know the specific hierarchy of thirst: the animals first because without them the farm fails, the children second, the adults last. You know how to go to sleep when you are still thirsty without lying awake thinking about it, which is a thing you learned by doing it enough times.',
    choices: null,
    effect: (p) => { p.h -= 3; p.e += 4; p.r += 3; p.addFlag('drought_childhood'); p.setMem('wiDrySeason', true) },
  },

  // ── ELECTRICITY ARRIVES ───────────────────────────────────────────────────────
  // One of the largest single quality-of-life changes in a person's life.
  // Not urban power cuts — the village that had no power at all.

  {
    id: 'wi_electrification',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      RURAL_LOW_GDP(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2005 &&
      G.age >= 5 && G.age <= 16 &&
      !G.flags.has('village_electrified') &&
      !G.mem?.wiElectrification,
    text: 'The government line reached the village in the dry season, which is when the work is easiest. The men who strung the cables worked for a week and then a sub-contractor came and connected the meters. There were three bulbs per household in the initial connection — one per room if your house was the usual size. The first evening with electric light is something you do not know how to describe afterwards: not because it is too emotional but because what changes is too large and too ordinary simultaneously. You can see in the evenings now. The kerosene lamp stays in the cupboard for emergencies.',
    choices: null,
    effect: (p) => { p.m += 8; p.h += 3; p.e += 5; p.addFlag('village_electrified'); p.setMem('wiElectrification', true) },
  },

  // ── PUMP COMMITTEE ────────────────────────────────────────────────────────────
  // The new social politics around the borehole. WHO CONTROLS ACCESS is
  // the question that infrastructure raises without answering.

  {
    id: 'wi_pump_committee',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      RURAL_LOW_GDP(G) &&
      G.flags.has('water_walk_childhood') &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.wiPumpCommittee,
    text: 'The pump committee was formed the year the NGO left. Twelve people, one from each compound, to manage maintenance and resolve disputes. You are now old enough to be on it, or to have a family member on it, which is almost the same thing in terms of the decisions you are involved in. The main dispute is the same as always: how much the families who live closest to the pump can use before leaving water for those who walk further. The NGO\'s manual does not address this. The committee has developed its own rules, which are not written down, which means they can be argued.',
    choices: [
      {
        text: 'You join the committee. The decisions need to be made by someone.',
        tag: 'join',
        outcome: 'The meetings happen on Thursday evenings. You learn what it costs to be the person who decides.',
        effect: (p) => { p.s += 4; p.e += 3; p.addFlag('community_organiser'); p.setMem('wiPumpCommittee', true) },
      },
      {
        text: 'You stay out of committee politics. You use the pump and stay clear of the disputes.',
        tag: 'stay_out',
        outcome: 'Others make the decisions. Sometimes you benefit; sometimes you do not.',
        effect: (p) => { p.r += 3; p.setMem('wiPumpCommittee', true) },
      },
    ],
    effect: null,
  },

  // ── THE WATER WALK AS A YOUNG ADULT ──────────────────────────────────────────
  // For young adult women in areas without improved water — the walk continues.

  {
    id: 'wi_water_walk_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      RURAL_LOW_GDP(G) &&
      FEMALE(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.has('water_walk_childhood') &&
      !G.mem?.wiWaterWalkAdult,
    text: 'You are twenty-three, or twenty-eight, or thirty-two, and you still make the morning walk for water. You made it as a child with your mother; you make it now with your daughter. The distance is the same. The weight is the same. The time it takes — an hour and a half, or two hours, or a little more in the dry season — is the same. This is not a complaint, exactly. It is an account.',
    choices: null,
    effect: (p) => { p.h -= 2; p.r += 6; p.e += 2; p.setMem('wiWaterWalkAdult', true) },
  },

  // ── WATER PRIVATIZATION: COCHABAMBA 2000 ─────────────────────────────────────
  // Bolivia's Cochabamba: the city's water supply privatized, prices triple,
  // even rainwater collection becomes technically illegal. The uprising reverses it.

  {
    id: 'wi_cochabamba_water_war',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'Bolivia' &&
      G.currentYear >= 2000 && G.currentYear <= 2001 &&
      G.age >= 15 && G.age <= 60 &&
      !G.mem?.wiCochabamba,
    text: 'The government has signed the water supply of Cochabamba to a private consortium. The price of water has tripled overnight. There is a clause in the contract — the lawyers from the company explained it to a journalist who published it — that makes collecting rainwater in a barrel on your own roof technically illegal, because the water in the barrel is now the consortium\'s water. The people of Cochabamba, who have spent April in the streets blocking roads and closing the city down, do not find this clause theoretical. The government has declared martial law. You have heard shots in the night.',
    choices: [
      {
        text: 'You join the blockades. Water is not a product.',
        tag: 'protest',
        outcome: 'The government eventually backs down. The contract is cancelled. The consortium leaves. The water price returns to what it was. You carry this as evidence that the outcome was not fixed in advance.',
        effect: (p) => { p.m += 5; p.r += 5; p.karma += 8; p.addFlag('water_war_generation'); p.addFlag('committed_activist'); p.setMem('wiCochabamba', true) },
      },
      {
        text: 'You stay off the streets. The situation is too dangerous.',
        tag: 'stay_home',
        outcome: 'Others carry the risk. The contract is cancelled regardless. You pay the tripled rates for four months and then the price falls again.',
        effect: (p) => { p.m -= 5; p.mo -= 200; p.r += 4; p.setMem('wiCochabamba', true) },
      },
    ],
    effect: null,
  },

  // ── LATE-LIFE RECKONING: THE WALK ────────────────────────────────────────────
  // The woman who made the walk for decades and now has a tap. What the tap means.

  {
    id: 'wi_water_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('water_walk_childhood') &&
      G.age >= 58 &&
      !G.mem?.wiWaterReckoning,
    text: 'There is a tap now, or a borehole, or a pipe from the municipal system — however the water arrived. You turn it on in the morning and you remember, briefly, the walk. You remember the particular weight of the full jerry can when you tried to shift it from one arm to the other at the midpoint. You remember the paths, the trees, the women who were always there before you and always left before you. The tap is ordinary now, which means the walk has become a different kind of memory — not of hardship exactly, but of a particular kind of time, and of what your body knew how to carry.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 4; p.r += 3; p.setMem('wiWaterReckoning', true) },
  },

]
