// Political leaning consequence arc
// 10 events: making political_leaning produce real stakes.
// Left under authoritarian regimes, dissident file, 1980s rightward shift,
// nationalist in new nation, apolitical under pressure, centre under polarisation,
// dissident outlasting the regime, right under communism,
// nationalist in diaspora, political conviction at midlife.

const AUTHORITARIAN_REGIMES = ['single_party_communist', 'single_party_authoritarian', 'military_dictatorship', 'theocracy']
const DEMOCRATIC_REGIMES = ['democracy', 'federal_republic', 'parliamentary_republic', 'constitutional_monarchy']

export const POLITICAL_ARC_EVENTS = [

  {
    id: 'pol_left_authoritarian_noted',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      (G.political_leaning === 'left' || G.political_leaning === 'dissident') &&
      AUTHORITARIAN_REGIMES.includes(G.regime) &&
      G.age >= 28 && G.age <= 50 &&
      !G.mem?.polLeftNoted,
    text: 'You become aware, not from anything direct, that you have been noted. Not arrested. Not visited. But someone at the office said something that could only have been passed along. A question came at a meeting that implied a reading of your file. The specific shape of it: nothing you can point to, nothing you can deny, and nothing that stops. You recalibrate what you say, where you say it, and to whom. You become fluent in a second language that consists entirely of things you do not say.',
    choices: null,
    effect: (p) => {
      p.m -= 12; p.e += 5; p.s -= 4;
      p.addFlag('pol_left_noted');
      p.setMem('polLeftNoted', true);
    },
  },

  {
    id: 'pol_dissident_file_known',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.political_leaning === 'dissident' &&
      AUTHORITARIAN_REGIMES.includes(G.regime) &&
      G.age >= 30 &&
      !G.mem?.polDisFileMemo,
    text: 'A friend who works in a ministry tells you over coffee, carefully, that there is a file. There has been a file for some years. The file contains: certain letters, a transcript of something said at a gathering, an account of who attended your house on a particular evening. Your friend does not tell you the file\'s contents directly — they describe its shape instead. The file is a fact now. You are named in a document you have not read and cannot contest. You try to decide whether knowing is better than not knowing. It is not better. It is just different.',
    choices: null,
    effect: (p) => {
      p.m -= 15; p.e += 6; p.r += 8;
      p.addFlag('dissident_file_known');
      p.setMem('polDisFileMemo', true);
    },
  },

  {
    id: 'pol_left_1980s_rightward_shift',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.political_leaning === 'left' &&
      G.character.country?.archetype === 'wealthy_west' &&
      G.currentYear >= 1979 && G.currentYear <= 1998 &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.polLeft80s,
    text: 'The world moves. You stay. A colleague who argued for nationalisation with you three years ago now reads Hayek. Your father, who voted the same ticket his whole life, voted differently this time and calls it common sense. The newspapers have changed — not their mastheads, but their register. The word "market" has a new authority in it. Your position has not changed. The context around your position has changed entirely. You find yourself explaining things you used to not need to explain, defending assumptions that used to not need defence. The left has not gotten smaller. It has gotten quieter.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.e += 4; p.r += 6;
      p.addFlag('pol_reagan_era_left');
      p.setMem('polLeft80s', true);
    },
  },

  {
    id: 'pol_nationalist_new_flag',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.political_leaning === 'nationalist' &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1950 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 32 &&
      !G.mem?.polNatNewFlag,
    text: 'The flag has existed for fewer years than you have. The anthem was composed when you were a child. Nationalism in an old country is a conversation with a long history; nationalism here is something you are building while living inside it. There is a specific quality to loving a country that is still deciding what it is — the pride has no settled object yet, the vision of what the country should become is still being argued in every newspaper, every cabinet meeting, every conversation between people who agree about independence and disagree about everything else. You are a nationalist who does not yet know the full shape of what you are nationalist about. This will matter later.',
    choices: null,
    effect: (p) => {
      p.m += 8; p.s += 4; p.karma += 3;
      p.addFlag('pol_nationalist_new_country');
      p.setMem('polNatNewFlag', true);
    },
  },

  {
    id: 'pol_apolitical_questioned',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.political_leaning === 'apolitical' &&
      G.age >= 30 && G.age <= 55 &&
      (AUTHORITARIAN_REGIMES.includes(G.regime) || G.currentYear >= 2015) &&
      !G.mem?.polApoliticalQuestioned,
    text: 'You have always stayed out of it. This used to be a neutral position. It is not a neutral position now. The question "what do you think about what\'s happening?" has become a sorting question — the answer locates you, or your refusal to answer locates you differently. Someone at a gathering asks where you stand. You say you try not to have opinions about things you can\'t change. They look at you in a way that is specific. Later you understand: refusing politics in a political moment is itself a politics. The apolitical position has been assigned to a side without your consent.',
    choices: [
      {
        text: 'You say: I am not political, I never have been.',
        tag: 'stays_apolitical',
        outcome: 'The person nods. You both know that answer was not an answer. This is what neutrality costs now.',
        effect: (p) => { p.m -= 6; p.r += 4; p.setMem('polApoliticalQuestioned', true); },
      },
      {
        text: 'You say something that sounds like a position.',
        tag: 'moves_off_apolitical',
        outcome: 'It surprises you. You did not know you had an opinion until you heard yourself say it. You are less certain now than you were before you spoke.',
        effect: (p) => { p.m -= 3; p.e += 4; p.addFlag('pol_apolitical_pressured'); p.setMem('polApoliticalQuestioned', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_centre_no_place',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.political_leaning === 'centre' &&
      G.currentYear >= 2008 &&
      G.age >= 30 && G.age <= 60 &&
      !G.mem?.polCentreNoPlace,
    text: 'The political centre used to be where decisions were made. You remember when compromise was not a term of abuse. Now: a colleague on the left says you benefit from a system you refuse to challenge. A relative on the right says you are naive about human nature. Both assessments contain something. The space you occupy has been declared a form of weakness by everyone with a more defined position. The centrist is accused of splitting the left, enabling the right, refusing to see clearly. You are not sure whether they are wrong. You are not sure what your alternative would be. You hold the centre anyway, because the alternatives look worse to you than you look to them.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.e += 5; p.r += 4;
      p.addFlag('pol_centre_accused');
      p.setMem('polCentreNoPlace', true);
    },
  },

  {
    id: 'pol_dissident_outlasts_regime',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.political_leaning === 'dissident' &&
      DEMOCRATIC_REGIMES.includes(G.regime) &&
      G.flags.has('dissident_file_known') &&
      G.age >= 50 &&
      !G.mem?.polDissOutlast,
    text: 'The regime fell. Not the way you imagined — no single dramatic moment, more of a slow draining out, an announcement on a Tuesday, a general who resigned, a new name on the building. The file they kept on you exists somewhere in an archive now. You could request it. You have thought about requesting it. You know people who requested theirs and read transcripts of their own conversations; they say it is strange, like reading about yourself from outside, to see what you said in 1983 translated into a secret document. You have defined yourself in opposition to something for a long time. The something is gone. You stand in the space where it was.',
    choices: [
      {
        text: 'You request access to your file.',
        tag: 'reads_file',
        outcome: 'The document arrives months later. The transcripts are accurate. There are people named in it who you trusted. You read the whole thing in one sitting and do not sleep that night.',
        effect: (p) => { p.m -= 8; p.e += 8; p.r += 10; p.addFlag('pol_dissident_outlasted_regime'); p.setMem('polDissOutlast', true); },
      },
      {
        text: 'You leave the file in the archive.',
        tag: 'leaves_it',
        outcome: 'The information exists. You have decided it is not yours to read. You are not sure this is peace, but it is a position you can maintain.',
        effect: (p) => { p.m -= 3; p.karma += 6; p.addFlag('pol_dissident_outlasted_regime'); p.setMem('polDissOutlast', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_right_under_communism',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.political_leaning === 'right' &&
      G.regime === 'single_party_communist' &&
      G.currentYear >= 1950 && G.currentYear <= 1991 &&
      G.age >= 28 &&
      !G.mem?.polRightCommunist,
    text: 'In the workers\' committee the hand goes up and you raise yours with it. The correct position on the correct question, your hand one of forty hands, all in unison. You are not afraid exactly. You are precise. You have learned to hold your actual views the way you hold your breath in certain rooms — long enough, without strain visible on your face, until you are outside again. The specific discipline of this: what you say at the meeting, what you say to your spouse, what you say to yourself in the exact interval between one person leaving and another arriving. You are fluent in two political languages and speak only one of them aloud.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.e += 6; p.s -= 3;
      p.addFlag('pol_right_in_communist_state');
      p.setMem('polRightCommunist', true);
    },
  },

  {
    id: 'pol_nationalist_abroad',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.political_leaning === 'nationalist' &&
      G.flags.has('emigrated') &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.polNatAbroad,
    text: 'At home, you were a nationalist among other nationalists — the position had a context, a history, other people who shared it. Here, you are the country. Every question about where you are from, every news story about what is happening there, lands on you as if you are its official spokesperson. You explain things you did not choose to explain. You defend positions you did not choose to defend. The specific paradox: the further you are from the country you love, the more completely you become it in other people\'s eyes. Your nationalism abroad is lonelier than it was at home, and louder, because it is the only thing here that knows your language.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.s += 4; p.r += 5;
      p.addFlag('pol_nationalist_abroad');
      p.setMem('polNatAbroad', true);
    },
  },

  {
    id: 'pol_conviction_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.political_leaning !== null &&
      G.political_leaning !== 'apolitical' &&
      G.age >= 42 && G.age <= 50 &&
      !G.mem?.polConvictionMidlife,
    text: 'Political conviction at twenty-three was a position you wore without feeling its weight. You were right about things, or you were wrong about things, but either way you were certain. At forty-five you hold the same positions — or positions that would be recognisable to your twenty-three-year-old self — but you hold them differently. You know more about what the positions cost. You know more about what the alternatives cost. You know people who held your position and became something else, people who held the opposite and arrived where you are. The certainty has not disappeared. It has been replaced by something more deliberate, more earned, and harder to explain to someone who is still wearing their politics without feeling the weight.',
    choices: null,
    effect: (p) => {
      p.e += 5; p.r += 4; p.karma += 3;
      p.setMem('polConvictionMidlife', true);
    },
  },

]
