// events_vietnam_depth.js
// Vietnam depth texture beyond the post-war arc:
// Doi Moi economic liberalization, Amerasian children (con lai),
// re-education camp aftermath, cafe culture, the North/South divide,
// Viet Kieu returns, youth under the party, UXO legacy.

const isVietnam = (G) => G.character.country?.name === 'Vietnam'

export const VIETNAM_DEPTH_EVENTS = [

  // ── RE-EDUCATION CAMP AFTERMATH ───────────────────────────────────────────────

  {
    id: 'vn_dep_reeducation_aftermath',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1979 && G.currentYear <= 1995 &&
      G.age >= 30 && G.age <= 55 &&
      G.character.gender === 'male' &&
      !G.mem?.vnReedAft,
    text: `You came out of the re-education camp — a year, three years, ten years, depending on what you had been and how they calculated it. The camp was for ideological correction. The correction involved hard labour and political study sessions and the daily documentation of your history of service to the wrong side. You are out now and the country is reforming, cautiously, and you are a person with a history that the new economy does not fully know what to do with. Your children know the history. They navigate the workplaces where it must not come up.`,
    choices: [
      {
        text: 'You rebuilt. The camp is the before; you are the after.',
        tag: null,
        outcome: 'The rebuilding required a kind of silence and a kind of energy. Both were available to you, in alternation, across many years.',
        effect: (p) => { p.r += 7; p.m -= 6; p.h -= 5; p.addFlag('vn_dep_reeducation_survivor'); p.setMem('vnReedAft', true) },
      },
      {
        text: 'You left when the paperwork allowed. The country released you and you did not stay.',
        tag: null,
        outcome: 'The camp was the last argument the country needed to make. You had the chance to go and you took it. The gone is permanent.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('vn_dep_reeducation_survivor'); p.setResidency('refugee_status'); p.setMem('vnReedAft', true) },
      },
    ],
    effect: null,
  },

  // ── CON LAI — AMERASIAN CHILDREN ──────────────────────────────────────────────

  {
    id: 'vn_dep_con_lai',
    // "Your father was American" is a claim about a parent, and the guard read
    // only country, year and age — so it told a Kinh Catholic boy whose named
    // Vietnamese father was at the table that his father had left on the
    // helicopters. The state can say this much: a father absent from birth
    // (`alive: false` with no occupation, which is how deriveInitialParents
    // writes an absent father), in the years American soldiers fathered
    // children in the South. That is the only population it is true of.
    phase: null,
    weight: 20,
    when: (G) =>
      isVietnam(G) &&
      G.character.birthYear >= 1962 && G.character.birthYear <= 1975 &&
      G.parents?.father?.alive === false && !G.parents.father.occupation &&
      G.parents?.mother && G.parents.mother.alive !== false &&
      G.currentYear >= 1975 && G.currentYear <= 1987 &&
      G.age >= 5 && G.age <= 16 &&
      !G.mem?.vnConLai,
    text: `Con lai, the other children say, and it means mixed. Your father was American, and left with the troops or the helicopters, and your mother stayed because there was no seat for her. The other children see your face and do the calculation, and so do the cadres at the ward office. You learn to keep your hair short and your head down.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('vn_dep_con_lai'); p.setMem('vnConLai', true) },
  },

  {
    id: 'vn_dep_con_lai_homecoming',
    // The Amerasian Homecoming Act passed in December 1987; the flights ran
    // from 1988 and took some 23,000 Amerasians and their families.
    phase: null,
    weight: 40,
    when: (G) =>
      isVietnam(G) && G.flags.has('vn_dep_con_lai') &&
      G.currentYear >= 1988 && G.currentYear <= 1994 &&
      !G.mem?.vnConLaiHome,
    text: `The Americans have passed a law with your kind of child in its name. There are queues at the office in Saigon, and people who have never spoken to your mother are suddenly offering to be your family, for the seats.`,
    choices: [
      {
        text: 'Stay. This is your mother\'s country, and yours.',
        tag: null,
        outcome: 'You stay. The face is noticed and not everything, and the holding your mother\'s street gives you is warm and conditional, and you take it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('vnConLaiHome', true) },
      },
      {
        text: 'Take the flight, with your mother.',
        tag: null,
        outcome: 'America, the country of the father you do not know, which does not know you either and treats you as Vietnamese. The homecoming is to a home that was never yours.',
        effect: (p) => { p.m -= 8; p.r += 7; p.setMem('vnConLaiHome', true); p.emigrateTo('United States', { residency: 'refugee_status' }) },
      },
    ],
    effect: null,
  },

  // ── DOI MOI GENERATION ────────────────────────────────────────────────────────

  {
    id: 'vn_dep_doi_moi',
    phase: null,
    weight: 4,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1988 && G.currentYear <= 2005 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.vnDoiMoi,
    text: `Doi Moi — renovation — the party announced in 1986 and the effects arrived in your life by the late 1980s: small private businesses allowed, price controls relaxed, foreign investment beginning to arrive. The cafe on the corner your uncle opened. The Honda motorbike your cousin saved for. The state still controls what the state controls and the party still leads the party, but between those structures there is new space, and the new space has a texture — not freedom exactly, but a kind of room to move that was not there before. You are learning its dimensions.`,
    choices: [
      {
        text: 'You start something. A small business, a venture, a plan.',
        tag: null,
        outcome: 'The market economy the party is building is not the same as capitalism but it is adjacent, and in the adjacency your plan has somewhere to grow. You learn the new rules as you go.',
        effect: (p) => { p.mo += 5000; p.e += 4; p.m += 4; p.addFlag('vn_dep_doi_moi_generation'); p.setMem('vnDoiMoi', true) },
      },
      {
        text: 'You take the state path — party membership, government position, steady progression.',
        tag: null,
        outcome: 'The party offers a different kind of advancement, with different requirements. You learn which opinions to hold in which rooms. The advancement is real and the requirements are specific.',
        effect: (p) => { p.mo += 3000; p.e += 3; p.addFlag('vn_dep_doi_moi_generation'); p.setMem('vnDoiMoi', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'vn_dep_cafe_culture',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.vnCafe,
    text: `The Vietnamese cafe is an institution. The plastic stool at twenty centimetres off the ground. The iced coffee — ca phe sua da — the condensed milk settling at the bottom before you stir it. The street: motorbikes, vendors, the sound of a city doing what it does before the heat arrives. You have spent hours in these chairs, working, not working, talking, looking at the street. The cafe is a room that belongs to everyone and costs thirty cents and is available at five in the morning and eleven at night.`,
    choices: null,
    effect: (p) => { p.m += 5; p.r += 2; p.setMem('vnCafe', true) },
  },

  // ── NORTH/SOUTH DIVIDE ────────────────────────────────────────────────────────

  {
    id: 'vn_dep_north_south',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.vnNorthSouth,
    text: `The North and South reunified in 1976 but did not reunify completely. The accents are different and the food is different and the relationship to the war is different — in the North it was a war of liberation; in the South it was a war with two sides, one of which lost. The economic zones put Northerners in Southern positions and the resentment in both directions is specific and quiet. Ho Chi Minh City is still called Saigon by people who lived there before 1975 and by their children. The name is a small politics.`,
    choices: [
      {
        text: 'You are from the North. The reunification is uncomplicated in principle.',
        tag: null,
        outcome: 'You encounter the South\'s version of the story over years and it does not fit the version you were given. You hold both, with varying degrees of effort depending on the day.',
        effect: (p) => { p.e += 3; p.r += 3; p.setMem('vnNorthSouth', true) },
      },
      {
        text: 'You are from the South. You call the city Saigon.',
        tag: null,
        outcome: 'The word Saigon is accuracy about a place that still exists, renamed. The renaming is a political act and calling it by its name is also a political act. You have made your peace with being political.',
        effect: (p) => { p.r += 5; p.e += 3; p.setMem('vnNorthSouth', true) },
      },
    ],
    effect: null,
  },

  // ── UXO LEGACY ────────────────────────────────────────────────────────────────

  {
    id: 'vn_dep_uxo',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.vnUxo,
    text: `The American military dropped more bombs on Vietnam than were dropped in all of World War Two. The unexploded ordnance — the cluster bombs, the artillery rounds, the B-52 payloads that did not detonate — are still in the ground. Three million pieces, estimated. You grow up in a province where the adults know which fields are okay. The knowledge is specific: this area has been cleared, this one has not, this road, not that one. Children find things and the finding sometimes ends badly. You know someone to whom it ended badly.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 2; p.setMem('vnUxo', true) },
  },

  // ── VIET KIEU RETURN ──────────────────────────────────────────────────────────

  {
    id: 'vn_dep_viet_kieu_return',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.vnVkReturn,
    text: `The Viet Kieu are coming back — the overseas Vietnamese, who left on the boats or the planes or the evacuation flights, or whose parents did. They are coming back as tourists, as investors, as people who are from here and not from here. The ones who left are older now. Their children have American accents or French accents or Australian accents. They are looking at the country their parents described and finding it resembles the description and does not. The country is also looking at them: their clothes, their confidence, the way they use money, the way they talk about Vietnam as a place rather than a home.`,
    choices: [
      {
        text: 'You stayed. You watch the returnees with an attention.',
        tag: null,
        outcome: 'The returning diaspora brings money and distance. The distance sometimes registers as condescension and sometimes as longing. You read it case by case.',
        effect: (p) => { p.r += 4; p.e += 2; p.setMem('vnVkReturn', true) },
      },
      {
        text: 'You are the one returning.',
        tag: null,
        outcome: 'The country you described to your children is here and is not here. The house your parents left — if it still exists — belongs to someone else. The language you speak marks you as from the diaspora, the grammar slightly off in ways that are obvious to everyone you meet.',
        effect: (p) => { p.m -= 4; p.r += 6; p.e += 3; p.setMem('vnVkReturn', true) },
      },
    ],
    effect: null,
  },

  // ── YOUTH UNDER THE PARTY ─────────────────────────────────────────────────────

  {
    id: 'vn_dep_youth_league',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2010 &&
      G.age >= 14 && G.age <= 22 &&
      !G.mem?.vnYouthLeague,
    text: `The Ho Chi Minh Communist Youth League is the organisation for young people who want to be seen as committed. Membership is not required but its absence is noted, especially if you want a university place at a competitive school or a position in a state enterprise. The meetings have a structure: the song, the statement of purpose, the minutes, the resolution. The ideology is the stated reason. The actual reason is the relationship network you are building — the people who will be in positions in ten years, meeting you now. This is how most things work here, inside or outside the party.`,
    choices: [
      {
        text: 'You join. The network and the ideology, in that order.',
        tag: null,
        outcome: 'You have a network. The ideology is available on demand and sits lightly on most days. You know which days to bring it forward.',
        effect: (p) => { p.s += 4; p.e += 2; p.mo += 1000; p.setMem('vnYouthLeague', true) },
      },
      {
        text: 'You do not join. Your interests are elsewhere.',
        tag: null,
        outcome: 'The absence is noted in specific places and ignored in others. You build your network through other means. The means are available. They take longer.',
        effect: (p) => { p.e += 4; p.r += 3; p.setMem('vnYouthLeague', true) },
      },
    ],
    effect: null,
  },

  // ── AGENT ORANGE GENERATION ───────────────────────────────────────────────────

  {
    id: 'vn_dep_agent_orange',
    phase: null,
    weight: 3,
    when: (G) =>
      isVietnam(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.vnAgentOrange,
    text: `For nine years the Americans sprayed herbicide over the country, and Agent Orange carried dioxin, which does not leave the food chain. The children and grandchildren of the people who were exposed carry it: limbs that formed differently, nervous systems, cancers with no family history. You know someone, a cousin, a neighbour, someone in the village, for whom the war's chemistry arrived as a body that works differently. The war ended before you were born. It has not ended the same way for everyone.`,
    context: 'About 77 million litres of herbicides were sprayed between 1962 and 1971; millions of Vietnamese were exposed to dioxin.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 2; p.setMem('vnAgentOrange', true) },
  },

  // ── DOI MOI LATE-LIFE RECKONING ────────────────────────────────────────────────

  {
    id: 'vn_dep_doi_moi_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      isVietnam(G) &&
      G.flags.has('vn_dep_doi_moi_generation') &&
      G.age >= 55 &&
      !G.mem?.vnDoiMoiLate,
    text: `You lived through Đổi Mới and the country that came out is unrecognisable from the one that went in. The motorbike streets became car streets; the stalls became restaurants; the foreign chains came, and some of them were replaced by Vietnamese chains doing the same thing. You saw all of it. The Party still leads. The country it leads has changed so much that the ideology has to be continually updated about what it is the ideology of.`,
    context: 'Vietnam\'s income per head rose from about $230 in 1986 to over $4,000 by the 2020s.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('vnDoiMoiLate', true) },
  },

]
