// Rural and suburban texture events.
// Gated on G.place?.type === 'rural' (or specific rural place IDs) + archetype/country/era.
// Covers: water walk, market day, village radio, mobile phones arriving, harvest/drought,
//   electrification, brain drain, kolkhoz dissolution, panchayat, ejido, hukou,
//   Midwest church, Irish emigration shadow, post-Soviet village, suburban wealthy-west.
// Follow-through events precede their triggering events within each thematic block.

// ── SETS ────────────────────────────────────────────────────────────────────────

const WATER_WALK_COUNTRIES = new Set([
  'Nigeria', 'Kenya', 'Tanzania', 'Uganda', 'Ethiopia', 'Ghana',
  'Cameroon', 'Zambia', 'Mozambique', 'Malawi', 'Rwanda', 'Guinea',
  'Burkina Faso', 'Mali', 'Niger', 'Senegal', 'Bangladesh', 'Nepal',
  'Cambodia', 'Myanmar', 'Sudan', 'South Sudan', 'DRC',
])

const VILLAGE_RADIO_COUNTRIES = new Set([
  'Nigeria', 'Kenya', 'Ghana', 'Tanzania', 'Uganda', 'Ethiopia',
  'Senegal', 'Cameroon', 'Bangladesh', 'India', 'Indonesia', 'Vietnam',
  'Cambodia', 'Nepal', 'Bolivia', 'Peru', 'Ecuador',
  'Russia', 'Ukraine', 'Kazakhstan', 'Romania', 'Bulgaria',
])

const HARVEST_COUNTRIES = new Set([
  'Nigeria', 'Kenya', 'Tanzania', 'Ghana', 'Ethiopia', 'Senegal',
  'Bangladesh', 'India', 'Vietnam', 'Cambodia', 'Indonesia', 'Philippines',
  'Bolivia', 'Peru', 'Ecuador', 'Colombia', 'Mexico',
  'Russia', 'Ukraine', 'Kazakhstan', 'Romania',
])

const POST_SOVIET_RURAL = new Set([
  'Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Moldova',
  'Armenia', 'Georgia', 'Azerbaijan', 'Kyrgyzstan', 'Tajikistan',
  'Romania', 'Bulgaria',
])

export const RURAL_TEXTURE_EVENTS = [

  // ── WATER WALK (childhood, female, low GDP, pre-2010) ──────────────────────

  // Follow-through: borehole arrives in the village
  {
    id: 'rural_borehole_arrives',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      WATER_WALK_COUNTRIES.has(G.currentCountry?.name) &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.flags.has('water_walk_childhood') &&
      !G.mem?.boreholeArrived,
    text: (G) => {
      const cn = G.currentCountry?.name
      const village = G.place?.name ?? 'the village'
      return `An NGO drills a borehole at the edge of ${village}. The whole community comes to watch the first water come up — clean water, from a standpipe, twenty minutes from the house instead of three hours. The morning schedule changes overnight. Your mother stands at the new standpipe with an expression you have not seen before.`
    },
    choices: null,
    effect: (p) => { p.m += 10; p.h += 5; p.setMem('boreholeArrived', true) },
  },

  {
    id: 'rural_water_walk',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      WATER_WALK_COUNTRIES.has(G.currentCountry?.name) &&
      G.character?.gender === 'female' &&
      G.currentYear <= 2010 &&
      !G.mem?.waterWalkEstablished,
    text: (G) => {
      const cn = G.currentCountry?.name
      const dist = cn === 'Bangladesh' ? 'the river' : 'the stream below the hill'
      return `Before school you carry water. The jerry can is five kilograms empty and twenty-five full and the walk takes an hour each way. You know the route in your feet — the path through the cassava, the shallow ford, the place where the big tree fell. This is not the whole of your life, but it structures it: before water, nothing else is possible.`
    },
    choices: null,
    effect: (p) => { p.h -= 2; p.e += 1; p.addFlag('water_walk_childhood'); p.setMem('waterWalkEstablished', true) },
  },

  // ── VILLAGE MARKET DAY ──────────────────────────────────────────────────────

  {
    id: 'rural_market_day',
    phase: 'childhood',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.archetype === 'subsaharan' ||
       G.currentCountry?.archetype === 'developing_urban' ||
       G.currentCountry?.archetype === 'developing_unstable') &&
      G.currentYear >= 1950 && G.currentYear <= 2000,
    text: (G) => {
      const cn = G.currentCountry?.name
      const village = G.place?.name ?? 'the village'
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Senegal') {
        return `Market day comes every four days — not a weekend, which is a European thing, but a cycle older than the week. The road fills: women with baskets, men with goats, traders from three villages over with cloth and kerosene and things that had to travel far to get here. The whole economy of the village moves through this one morning. You know which stall has the good oranges and which trader's scale is accurate.`
      }
      if (cn === 'Bangladesh' || cn === 'India') {
        return `The haat comes on Thursdays. By seven in the morning the road from the river is already crowded — fish sellers, vegetable hawkers, the cloth merchant who comes from town. Your grandmother knows every price by memory and never pays the first one asked. The market is also news: what's happening in the next district, who married, which crop failed.`
      }
      return `Market day is the week's fulcrum. Everything leads toward it or away from it — the produce set aside, the debts to settle, the cloth to examine, the information that only moves face to face. Without it the village would be only itself. With it, it is connected to every other village that sends someone.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.s += 1; },
  },

  // ── VILLAGE RADIO (1960–1990, rural, developing world) ──────────────────────

  // Follow-through: what the radio told them first
  {
    id: 'rural_radio_moment',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      VILLAGE_RADIO_COUNTRIES.has(G.currentCountry?.name) &&
      G.currentYear >= 1965 && G.currentYear <= 1990 &&
      G.flags.has('village_radio') &&
      !G.mem?.radioMoment,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Kenya') {
        return `The radio announced independence before most people in the village had seen a newspaper. Your father says he heard it from outside — a man's voice saying the name of the country that had just begun. He came inside and told your mother and she made food, because that is how you mark something.`
      }
      if (cn === 'Russia' || cn === 'Ukraine' || cn === 'Romania') {
        return `The village heard the news from Moscow through the radio — Stalin's death, then Khrushchev's speech, then the names of things that were no longer true. The radio told you what to think and also, sometimes, what was actually happening. The skill was knowing which was which.`
      }
      return `The radio came before the road. It told the village about things that were happening elsewhere before they arrived here — coups, famines, peace agreements, prices. The relationship between what the radio said and what was true was something you learned to calibrate.`
    },
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('radioMoment', true) },
  },

  {
    id: 'rural_village_radio',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      VILLAGE_RADIO_COUNTRIES.has(G.currentCountry?.name) &&
      G.currentYear >= 1960 && G.currentYear <= 1990 &&
      !G.mem?.villageRadioEstablished,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Senegal') {
        return `There is one radio in the village — at the chief's compound, or the shop, or wherever the battery can be charged. In the evenings, people come to sit near it. The news is in English first, then translated by whoever can. The music programs are the same everywhere, which is how you know the songs before you know the language.`
      }
      if (cn === 'Bangladesh' || cn === 'India' || cn === 'Nepal') {
        return `The transistor radio sits on the shelf in the shop. Cricket commentary, film songs, All India Radio reading the weather in a voice that sounds like it comes from very far away. It does. The shop is open in the evenings so people can listen. The battery is expensive; the radio is only on when there is something worth the cost.`
      }
      return `The radio connects the village to a world that otherwise does not know the village exists. The news comes in twice a day. Sometimes it is about places you have heard of. Sometimes it is about things you will not understand until they arrive.`
    },
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('village_radio'); p.setMem('villageRadioEstablished', true) },
  },

  // ── MOBILE PHONE ARRIVES IN VILLAGE (2000–2015, rural, developing world) ──────

  {
    id: 'rural_mobile_arrives',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.archetype === 'subsaharan' ||
       G.currentCountry?.archetype === 'developing_urban') &&
      G.currentYear >= 2000 && G.currentYear <= 2015 &&
      !G.mem?.mobileArrived,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Kenya' || cn === 'Tanzania') {
        return `The first mobile phones in the village belong to traders, then everyone. The tower went up two years ago and now the signal reaches as far as the second hill. The phone lets you call your brother in Lagos or Nairobi or London and find out he is alive without waiting three months for a letter. The village skipped the landline entirely. It went from the letter to this.`
      }
      if (cn === 'Bangladesh' || cn === 'India') {
        return `Mobile phones arrive via the young men who go to the city for work and bring one back. The village has no landlines — it went directly from the post office to this. The phone is shared within the family. It is recharged at the shop. It changes the time horizon of information: you know something the same day it happens.`
      }
      return `The mobile phone skips the infrastructure the village never had. No landline, no internet cafe — just the tower, then the handset, then the world in a pocket. The adjustment is not technical. The adjustment is to the speed of everything that now arrives without warning.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.s += 2; p.setMem('mobileArrived', true) },
  },

  // ── HARVEST AND DROUGHT ──────────────────────────────────────────────────────

  // Follow-through: memory of the bad year
  {
    id: 'rural_drought_memory',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.flags.has('drought_survived') &&
      !G.mem?.droughtMemoryFired,
    text: () =>
      `A dry season comes that is not as bad as the bad year, and you are more afraid than the situation warrants. You check the stores more than you need to. You know this about yourself. The bad year is not behind you in the way that years usually go behind you.`,
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 3; p.setMem('droughtMemoryFired', true) },
  },

  {
    id: 'rural_good_harvest',
    phase: 'midlife',
    weight: 3,
    cooldown: 6,
    when: (G) =>
      G.place?.type === 'rural' &&
      HARVEST_COUNTRIES.has(G.currentCountry?.name),
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Kenya') {
        return `The harvest is good this year — better than expected, better than last year. The yams are large and the rain came when it should. There is surplus to sell. The feeling of surplus after sufficiency is its own specific thing: not wealth exactly, but its possibility.`
      }
      if (cn === 'India' || cn === 'Bangladesh') {
        return `The paddy crop came in full this year. The threshing takes three days; the whole family works, and the neighbors, and you work for them when their turn comes. At the end there is more rice than the family needs for the year. This is the year you do not worry about the rice.`
      }
      return `A good harvest year. The work was the same; the weather cooperated. There is surplus and the surplus means options: repair the roof, pay down the debt, send the eldest to school for another year. The year the rain was right.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.mo += 300; },
  },

  {
    id: 'rural_failed_harvest',
    phase: 'midlife',
    weight: 3,
    cooldown: 6,
    when: (G) =>
      G.place?.type === 'rural' &&
      HARVEST_COUNTRIES.has(G.currentCountry?.name) &&
      !G.mem?.droughtSurvived,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Ethiopia' || cn === 'Sudan' || cn === 'Niger' || cn === 'Mali') {
        return `The rains did not come when they should have. The sorghum is half-height. The family calculates what can be stretched, what must be sold, which child will eat less to balance it. The word the government uses is "drought." The word the family uses is not said aloud.`
      }
      if (cn === 'Bangladesh' || cn === 'India') {
        return `The monsoon failed this year — came late, left early. The rice yield is a third of what the season needed. The moneylender will lend but at terms that make next year harder than this one. Your father sits outside in the evening looking at the sky, which is what people do when there is nothing else to do.`
      }
      return `The harvest failed. Not completely — there are things that survived — but not enough to cover the year. The choices narrow. The family makes them quietly because there is no value in saying them aloud.`
    },
    choices: [
      {
        text: 'Borrow from the moneylender. The family needs to eat.',
        tag: null,
        outcome: 'The loan comes with terms that make next season a creditor\'s year before it is yours.',
        effect: (p) => { p.mo -= 500; p.m -= 5; p.addFlag('drought_survived') },
      },
      {
        text: 'Sell an asset — livestock, tools, something.',
        tag: null,
        outcome: 'Something that was a buffer is now gone. You eat; the buffer does not come back easily.',
        effect: (p) => { p.mo -= 200; p.m -= 3; p.addFlag('drought_survived') },
      },
      {
        text: 'Reduce and wait. The family will manage on less.',
        tag: null,
        outcome: 'You manage. The children are thinner at the end of the season. You do not talk about this.',
        effect: (p) => { p.h -= 4; p.m -= 6; p.addFlag('drought_survived') },
      },
    ],
  },

  // ── VILLAGE ELECTRIFICATION ──────────────────────────────────────────────────

  {
    id: 'rural_electrification',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.archetype === 'subsaharan' ||
       G.currentCountry?.archetype === 'developing_urban') &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      !G.mem?.villageElectrified,
    text: (G) => {
      const cn = G.currentCountry?.name
      const village = G.place?.name ?? 'the village'
      return `The poles went up in March. The wire came in June. On the night in August when the switch was thrown for the first time, the whole village was outside watching. One bulb, over the community well. It is forty watts and it changes nothing structural and it changes everything: the evening is longer now. The world outside this village has been lit for decades. ${village} joins it tonight.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.addFlag('village_electrified'); p.setMem('villageElectrified', true) },
  },

  // ── BRAIN DRAIN: TEACHER/NURSE LEAVES ────────────────────────────────────────

  {
    id: 'rural_teacher_leaves',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.archetype === 'subsaharan' ||
       G.currentCountry?.archetype === 'developing_urban' ||
       G.currentCountry?.archetype === 'post_soviet') &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      !G.mem?.teacherLeft,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (G.currentCountry?.archetype === 'post_soviet') {
        return `The school principal is leaving — not for the city but for Germany, which is what educated people say now. She has been here for fourteen years. The replacement has not been found. The school will operate on a reduced schedule until it is. It has been operating on a reduced schedule for most of the things it was supposed to provide.`
      }
      if (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Kenya') {
        return `Mr. Adeyemi is leaving the school. He is going to Lagos — or Nairobi, or London, or wherever the next person with his qualifications goes when they calculate what the government salary will not cover. He has been here for six years. The village will not replace him easily, which is not a statement about the village but about what the village can offer.`
      }
      return `The most educated person in the village is leaving. This has been true before and will be true again — a pattern is not broken by the individual instance but this instance has a name and a face and the children he taught will remember it differently from the pattern.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.e -= 2; p.setMem('teacherLeft', true) },
  },

  // ── POST-SOVIET VILLAGE: KOLKHOZ DISSOLVED ───────────────────────────────────

  {
    id: 'rural_postsoviet_aftermath',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      POST_SOVIET_RURAL.has(G.currentCountry?.name) &&
      G.currentYear >= 1995 && G.currentYear <= 2010 &&
      G.flags.has('kolkhoz_dissolved') &&
      !G.mem?.postsovietRuralAftermath,
    text: () =>
      `The collective was an institution — it paid wages, ran the clinic, maintained the school bus. The clinic is now a room with outdated supplies and a nurse who comes twice a week. The school bus is not running. The road to the district centre has not been repaired since 1991. The village has freedom that it did not ask for and services that it no longer has.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.h -= 2; p.setMem('postsovietRuralAftermath', true) },
  },

  {
    id: 'rural_kolkhoz_dissolved',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      POST_SOVIET_RURAL.has(G.currentCountry?.name) &&
      G.currentYear >= 1991 && G.currentYear <= 1997 &&
      !G.mem?.kolkhozDissolved,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Russia' || cn === 'Ukraine') {
        return `The collective farm is dissolving. Each family receives a land certificate — theoretically. In practice, the machinery was shared and the machinery belongs to whoever moved fastest, and the market for what the land can produce does not yet exist in the form that would make independent farming viable. You have a piece of paper that says you own land. What you own is complicated.`
      }
      if (cn === 'Romania' || cn === 'Bulgaria') {
        return `The CAP is being liquidated. The land returns to private ownership after forty-five years of collective farming — theoretically to the families who were dispossessed in the 1940s, though those families have died or scattered. The paperwork is complicated and the lawyers are expensive. Someone will have this land. Whether it is you depends on whether you can navigate the next six months.`
      }
      return `The collective that organized agricultural life in this region since the 1950s has formally dissolved. The employees are now smallholders or nothing. The transition plan does not account for the fact that small farms operating independently cannot achieve what the collective achieved in terms of mechanization and market access. This is the theory of markets meeting the specific road to the grain elevator.`
    },
    choices: [
      {
        text: 'Claim the land certificate and try to farm independently.',
        tag: null,
        outcome: 'You have the paper. The tractor hire is expensive. The first season is hard. The second is worse. The third you begin to understand the new arithmetic.',
        effect: (p) => { p.m -= 5; p.mo -= 400; p.addFlag('kolkhoz_dissolved'); p.setMem('kolkhozDissolved', true) },
      },
      {
        text: 'Sell or lease the certificate. Find other work.',
        tag: null,
        outcome: 'The cash is real even if the price is unfair. You enter the new economy without land but with a start.',
        effect: (p) => { p.mo += 800; p.addFlag('kolkhoz_dissolved'); p.setMem('kolkhozDissolved', true) },
      },
    ],
  },

  // ── RURAL INDIA: PANCHAYAT ───────────────────────────────────────────────────

  {
    id: 'rural_india_panchayat',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'India' &&
      G.currentYear >= 1960,
    text: () =>
      `The panchayat meets under the banyan tree, as it always has. The sarpanch hears the dispute — the water channel that crosses Mohan's land, the fence that moved two feet, the wedding whose music went past ten o'clock. The official legal system exists in the district town, two hours away. This is the system that is actually there. Some things it handles better; some things it handles in ways that depend entirely on who the sarpanch is this cycle.`,
    choices: null,
    effect: (p) => { p.s += 1; p.e += 1; },
  },

  // ── RURAL MEXICO: EJIDO LAND ─────────────────────────────────────────────────

  {
    id: 'rural_mexico_ejido',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'Mexico' &&
      G.currentYear >= 1960 && G.currentYear <= 1994 &&
      !G.mem?.ejidoExperienced,
    text: () =>
      `The ejido land cannot be sold. This was the revolution's promise: no landlord could take it back. The ejidatarios farm it communally and the yield is divided by the assembly. The system has become both a protection and a constraint — no one can mortgage it, no bank will lend against it, and the young men who could farm it are going north because the ejido supports a family but not the ambitions the family has for its children.`,
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('ejidoExperienced', true) },
  },

  {
    id: 'rural_mexico_ejido_reform',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'Mexico' &&
      G.currentYear >= 1994 && G.currentYear <= 2010 &&
      !G.mem?.ejidoReform,
    text: () =>
      `Since the 1992 reform, ejido land can be certified and eventually sold. NAFTA arrives and the corn from Iowa is cheaper than what you can grow. The ejido math no longer adds up the way it did. Some families sell; some hold. The village is becoming a different kind of place — not yet what it will be, not anymore what it was.`,
    choices: [
      {
        text: 'Certify the land. Keep farming.',
        tag: null,
        outcome: 'You have a title now. The corn price does not improve. You are farming into a headwind with a clearer picture of what you own.',
        effect: (p) => { p.m -= 3; p.setMem('ejidoReform', true) },
      },
      {
        text: 'Sell and move to the city or north.',
        tag: 'rural_to_urban',
        outcome: 'The sale gives you enough to try something else. The village watches you go the way it watches everyone go.',
        effect: (p) => { p.mo += 5000; p.addFlag('rural_to_urban'); p.setMem('ejidoReform', true) },
      },
    ],
  },

  // ── RURAL CHINA: HUKOU SYSTEM ─────────────────────────────────────────────────

  {
    id: 'rural_china_hukou',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'China' &&
      G.currentYear >= 1978 && G.currentYear <= 2010 &&
      !G.mem?.hukouFelt,
    text: () =>
      `Your hukou — the household registration — is rural. It means you can work in Shenzhen or Guangzhou but not receive the city's schools, hospitals, or social services. The factories want your labor; the city does not want your children. Millions of people are making this calculation. The dormitory costs less than a room; you eat in the canteen; you send what is left home. You are here and not here simultaneously.`,
    choices: [
      {
        text: 'Go to the city. Work the factories. Send money home.',
        tag: 'rural_to_urban',
        outcome: 'You join the largest migration in human history. The money is real. The absence from the village is also real. Both things compound over years.',
        effect: (p) => { p.mo += 2000; p.m -= 4; p.addFlag('rural_to_urban'); p.setMem('hukouFelt', true) },
      },
      {
        text: 'Stay. Work the land. Keep the family together.',
        tag: null,
        outcome: 'The village has fewer young people each year. The ones who stayed are older and the ones who left send money but the village changes differently from the inside than from the outside.',
        effect: (p) => { p.m += 3; p.s += 2; p.setMem('hukouFelt', true) },
      },
    ],
  },

  // ── RURAL US MIDWEST: CHURCH ──────────────────────────────────────────────────

  {
    id: 'rural_midwest_church',
    phase: 'childhood',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'United States' &&
      G.currentYear >= 1950 && G.currentYear <= 2000,
    text: () =>
      `Sunday is the church, which is also the social infrastructure. The service runs an hour; the coffee hour runs longer. Everyone knows when the Hendersons' barn burned and when the Miller boy came back from Vietnam and when the school budget is going to be cut. The pastor is the third-most-important person in town after the doctor and the principal, and the church is where decisions are made that technically happen somewhere else. You know this without being able to say it.`,
    choices: null,
    effect: (p) => { p.s += 2; p.m += 2; },
  },

  {
    id: 'rural_midwest_decline',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'United States' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      !G.mem?.midwestDecline,
    text: () =>
      `The main street has six empty storefronts now where there were two in 1985. The hardware store closed when the big box opened twenty-two miles out. The young people go to college and do not come back, which is the plan — the plan worked — and the plan is also the town slowly reducing itself. The high school graduating class was sixty-three in 1970; it is nineteen now. You are not going anywhere. This is where you are from.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 2; p.setMem('midwestDecline', true) },
  },

  // ── RURAL IRELAND: EMIGRATION SHADOW ─────────────────────────────────────────

  {
    id: 'rural_ireland_emigration',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'Ireland' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      !G.mem?.irelandEmigration,
    text: () =>
      `In every house there is at least one person in England. Sometimes two. The letter with the English postmark arrives and is read aloud at the kitchen table. The remittance is not large but it covers what it covers. The feeling in the village is not one of absence exactly — absence becomes normal until the normal thing is the absent ones, and the present ones are what remains after the sieving.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('irelandEmigration', true) },
  },

  {
    id: 'rural_ireland_leaving',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      G.currentCountry?.name === 'Ireland' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      !G.mem?.irelandLeaving,
    text: () =>
      `The question is not whether to go — the question is when. Everyone you know who went is in London or Boston or New York, working in construction or nursing or the civil service, sending money back for their mother's care. The farm cannot support more than one of you. Your older brother is already here. The parish knows the list of who has gone and who is still there and the list is getting shorter.`,
    choices: [
      {
        text: 'Go. Join the people who left before you.',
        tag: 'emigrated',
        outcome: 'The boat or the plane, and then the city that will not care that you are here. You build a life. You send money back. You come home at Christmas and leave again.',
        effect: (p) => { p.mo += 1500; p.m -= 3; p.addFlag('emigrated'); p.addFlag('irish_emigrant'); p.setMem('irelandLeaving', true) },
      },
      {
        text: 'Stay. Someone has to look after the farm.',
        tag: null,
        outcome: 'You stay. The farm is yours, which is also a weight. The village shrinks around you. You are one of the ones who stayed, which is its own specific distinction.',
        effect: (p) => { p.m += 2; p.karma += 4; p.setMem('irelandLeaving', true) },
      },
    ],
  },

  // ── RURAL SE ASIA: TEMPLE AND CEREMONY ───────────────────────────────────────

  {
    id: 'rural_seasia_temple',
    phase: 'childhood',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.name === 'Thailand' || G.currentCountry?.name === 'Cambodia' ||
       G.currentCountry?.name === 'Laos' || G.currentCountry?.name === 'Myanmar' ||
       G.currentCountry?.name === 'Sri Lanka') &&
      G.currentYear >= 1950,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Thailand' || cn === 'Laos' || cn === 'Cambodia') {
        return `The temple is the centre the village organizes around — not metaphorically but literally. The monks come to the houses in the morning with their alms bowls; the merit-making feeds both the monastery and the households' sense of correct relation. The festivals come with the Buddhist calendar and the planting cycle, which are not separate things. Your grandmother knows which ceremony aligns with which wind.`
      }
      if (cn === 'Myanmar') {
        return `The pagoda festival draws people from four villages. For three days the usual separations disappear — the wealthy households and the poor ones eat near each other, the children run between them, the old men argue about the monks in a way that is also affectionate. The monastery is the library, the medical consultation, and the community meeting. When it floods, everyone who can goes to repair it.`
      }
      return `The temple marks the rhythms that the government calendar does not. Poya Day, the harvest ceremony, the blessing of the boats before the fishing season. These are not separate from daily life but woven into it at a frequency that the secular calendar cannot perceive.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; },
  },

  // ── RURAL WEST AFRICA: CEREMONY AND COMMUNITY ────────────────────────────────

  {
    id: 'rural_westafrica_ceremony',
    phase: 'childhood',
    weight: 3,
    cooldown: 7,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.name === 'Nigeria' || G.currentCountry?.name === 'Ghana' ||
       G.currentCountry?.name === 'Senegal' || G.currentCountry?.name === 'Mali' ||
       G.currentCountry?.name === 'Burkina Faso' || G.currentCountry?.name === 'Guinea' ||
       G.currentCountry?.name === 'Sierra Leone' || G.currentCountry?.name === 'Liberia'),
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria') {
        return `The naming ceremony takes eight days after the birth. The family comes from the next three villages; food is cooked for two days before. The elders pour libations and speak the names of those who came before. The child will carry one name that is public and one that is private, known only to the mother and the compound head. The drum rhythm that announces the child is specific to this family and no other.`
      }
      if (cn === 'Senegal' || cn === 'Mali' || cn === 'Guinea') {
        return `The griot's family has kept the village's history for four generations. At the ceremony, he recites the lineage — names going back further than the village can verify but no further than it needs to. The community knows what it knows through the griot. When he dies, his son will know what he knows, and the chain will continue. The chain is also the community.`
      }
      return `The ceremony requires the whole village, which is the point. You cannot perform it alone or with only family. The community's presence is the thing that makes it real. What is witnessed is not the individual but the relation between the individual and everyone who comes.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.karma += 2; },
  },

  // ── SUBURBAN WEALTHY-WEST TEXTURE ─────────────────────────────────────────────

  {
    id: 'suburban_commute',
    phase: 'midlife',
    weight: 3,
    cooldown: 7,
    when: (G) =>
      G.place?.type === 'suburban' &&
      G.currentCountry?.archetype === 'wealthy_west' &&
      G.currentYear >= 1970,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'United States') {
        return `The commute is forty minutes in light traffic and seventy-five in the traffic that actually occurs. You have learned to calculate backwards from when you need to arrive at the office. The car is necessary; the necessity is not questioned. The suburb was designed around it and cannot be redesigned. You spend twelve hours a week in the car and have opinions about the fastest routes that you share with people who also have opinions about the fastest routes.`
      }
      if (cn === 'United Kingdom' || cn === 'France' || cn === 'Germany') {
        return `The train from the suburb to the city takes thirty-seven minutes on the fast service. You know which carriage lines up with the exit at the far end. The platform has a community — not friends, but familiar faces whose habits you know without knowing their names. The man who reads physical newspapers. The woman who is always on a call. This train is the seam between the life that is home and the life that is work.`
      }
      return `The suburb exists between the city and the country without being either. The commute structures the day; the house and garden structure the evenings. The neighbours wave. It is a life organized around the car, the school catchment, and the understanding that the city is somewhere you go to work and the suburb is where you actually live.`
    },
    choices: null,
    effect: (p) => { p.m -= 2; },
  },

  {
    id: 'suburban_school_run',
    phase: 'midlife',
    weight: 2,
    cooldown: 6,
    when: (G) =>
      G.place?.type === 'suburban' &&
      G.currentCountry?.archetype === 'wealthy_west' &&
      G.currentYear >= 1980 &&
      G.children?.length > 0,
    text: () =>
      `The school run is not a trip but a logistics system. Two children, two different start times, one at a school that is three stops and walk, one at a school that requires the car. You have mastered it. The mastery is invisible to everyone who is not doing it. The car park outside the school at eight-fifteen is its own social world — you know the parents whose children have been in the same class for four years, in the way you know people you see at the same time every day without choosing to.`,
    choices: null,
    effect: (p) => { p.m += 2; p.s += 1; },
  },

  {
    id: 'suburban_renovation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'suburban' &&
      G.currentCountry?.archetype === 'wealthy_west' &&
      G.currentYear >= 1990 &&
      G.money > 15000 &&
      !G.mem?.suburbRenovation,
    text: () =>
      `The kitchen is being renovated. This has taken seven months to decide, four months to arrange, and will take six weeks to complete. During those six weeks the family eats out more than is financially reasonable and the household acquires a temporary quality that is somehow bonding — the shared inconvenience, the meals on paper plates, the children finding the disruption exciting in a way that only children find disruption exciting. The kitchen that emerges is the kitchen that was always going to be the kitchen. It is exactly right.`,
    choices: null,
    effect: (p) => { p.mo -= 12000; p.m += 6; p.setMem('suburbRenovation', true) },
  },

  // ── RURAL LATIN AMERICA: GENERAL ──────────────────────────────────────────────

  {
    id: 'rural_latam_land',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.name === 'Brazil' || G.currentCountry?.name === 'Colombia' ||
       G.currentCountry?.name === 'Peru' || G.currentCountry?.name === 'Bolivia' ||
       G.currentCountry?.name === 'Ecuador' || G.currentCountry?.name === 'Paraguay') &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      !G.mem?.latamLand,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Brazil') {
        return `The large landholding next to the family's plot has been expanding for years — absorbing smaller plots when owners sell under pressure or simply leave. The MST is organising further south; their meetings are held quietly because the landowner's foreman also attends, and the price of certain kinds of visibility is known. Your family's land is small but it is yours. Whether it remains so depends on a set of forces you cannot fully control.`
      }
      if (cn === 'Colombia' || cn === 'Peru') {
        return `Land in this region changes hands in ways that the registry does not reflect. The paramilitary group controls access to the road; the coca buyers come once a month and pay in cash. Growing food is legal; the price the food brings is worse than the price of the alternative. Some families have made the calculation. Your family has not yet made it.`
      }
      return `The question of who owns the land and who works it is never fully settled here. The title may be yours but the water rights belong to someone else; the road crosses a plot that belongs to the municipal government; the harvest must be moved through a crossing that can be closed. Property in the countryside is a set of negotiations, not a document.`
    },
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 3; p.setMem('latamLand', true) },
  },

  // ── RURAL SOUTH ASIA: MONSOON LIFE ────────────────────────────────────────────

  {
    id: 'rural_monsoon_life',
    phase: 'childhood',
    weight: 3,
    cooldown: 6,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.name === 'Bangladesh' || G.currentCountry?.name === 'India' ||
       G.currentCountry?.name === 'Nepal' || G.currentCountry?.name === 'Sri Lanka') &&
      G.currentYear >= 1950,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Bangladesh') {
        return `The monsoon arrives in June and the village changes. The roads become rivers; the rivers become lakes. Travel by boat, which is how the village has always known it could be. The paddy needs the water; the family needs the paddy; the water will flood the lower third of the compound if it comes in as hard as last year. June to September is the season that determines whether the rest of the year has food.`
      }
      if (cn === 'India') {
        return `The first rains come after weeks of building heat that everyone can feel. The smell of the first rain on dry earth — petrichor, the English call it, but the word your grandmother uses is older. The farmers go out into the rain when it starts and stand there, which is not superstition but a kind of gratitude. The rain is the answer to the question the land has been asking for four months.`
      }
      return `The monsoon calendar organises everything. The planting, the school year, the festival cycle, the migration decisions, the repair schedule. It is the background rhythm that everything else sets itself against. A bad monsoon is not just a weather event.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.e += 1; },
  },

  // ── RURAL EAST AFRICA: CATTLE AND DROUGHT ─────────────────────────────────────

  {
    id: 'rural_eastafrica_cattle',
    phase: 'childhood',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.type === 'rural' &&
      (G.currentCountry?.name === 'Kenya' || G.currentCountry?.name === 'Tanzania' ||
       G.currentCountry?.name === 'Uganda' || G.currentCountry?.name === 'Ethiopia' ||
       G.currentCountry?.name === 'Sudan' || G.currentCountry?.name === 'South Sudan') &&
      G.currentYear >= 1950 && G.currentYear <= 2000,
    text: (G) => {
      const cn = G.currentCountry?.name
      if (cn === 'Kenya' || cn === 'Tanzania' || cn === 'Uganda') {
        return `The cattle are the wealth that can be counted and walked. A man's holdings are known to the village the way a bank account would be known in another world — not displayed but not hidden, a matter of communal awareness. The herding begins at first light. You have been going since you were old enough to manage a stick. The cattle know you as well as your family does.`
      }
      if (cn === 'Ethiopia') {
        return `The highland smallholding has cattle, oxen for the plowing, and the teff crop. The oxen are not wealth but tools; the cattle are both. When the drought comes the cattle go first, then the oxen, then the teff, then the question of what comes after. This is the order the elders know without discussion.`
      }
      return `The livestock are the savings account and the insurance policy and the wedding gift and the school fees and the hospital payment. They are liquid in the way that land is not. You know their value the way a city person knows a number in a column.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; },
  },
]
