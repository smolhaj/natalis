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
    text: 'You become aware, not from anything direct, that you have been noted. Not arrested. Not visited. But someone at the office said something that could only have been passed along. A question came at a meeting that implied a reading of your file. The shape of it: nothing you can point to, nothing you can deny, and nothing that stops. You recalibrate what you say, where you say it, and to whom. You become fluent in a second language that consists entirely of things you do not say.',
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
    text: 'A friend who works in a ministry tells you over coffee, carefully, that there is a file on you and has been for years: some letters, a transcript of something you said at a gathering, a list of who came to your house one evening. Your friend describes its shape and not its contents. You are named in a document you have not read and cannot contest. Knowing is not better than not knowing. It is only different.',
    choices: null,
    effect: (p) => {
      p.m -= 15; p.e += 6; p.r += 8;
      p.addFlag('dissident_file_known');
      p.setMem('polDisFileMemo', true);
    },
  },

  {
    id: 'pol_left_1980s_rightward_shift',
    phase: null,
    weight: 5,
    when: (G) =>
      G.political_leaning === 'left' &&
      G.character.country?.archetype === 'wealthy_west' &&
      G.currentYear >= 1979 && G.currentYear <= 1998 &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.polLeft80s,
    text: 'The world moves and you stay. A colleague who argued for nationalisation with you three years ago now reads Hayek, and your father, who voted the same way his whole life, voted differently this time and calls it common sense. The word "market" has a new authority. You find yourself explaining things you never used to need to explain. The left has not got smaller. It has got quieter.',
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
    text: 'The flag has existed for fewer years than you have. The anthem was composed when you were a child. Nationalism in an old country is a conversation with a long history; nationalism here is something you are building while living inside it. There is a quality to loving a country that is still deciding what it is — the pride has no settled object yet, the vision of what the country should become is still being argued in every newspaper, every cabinet meeting, every conversation between people who agree about independence and disagree about everything else. You are a nationalist who does not yet know the full shape of what you are nationalist about. This will matter later.',
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
    text: 'You have always stayed out of it, and that used to be a neutral position. Now "what do you think about what\'s happening?" sorts people, and not answering sorts you too. At a gathering someone asks where you stand, and you say you try not to have opinions about things you cannot change, and they look at you, and you know what the look means. Refusing politics in a political moment is a politics. You have been put on a side without your consent.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.political_leaning === 'centre' &&
      G.currentYear >= 2008 &&
      G.age >= 30 && G.age <= 60 &&
      !G.mem?.polCentreNoPlace,
    text: 'You remember when compromise was not an insult. Now a colleague on the left says you benefit from a system you will not challenge, and a cousin on the right says you are naive about people. Everyone with a firmer position calls the middle a kind of weakness. You are not sure they are wrong. You stay there anyway, because their alternatives look worse to you than you look to them.',
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
    text: 'The regime fell, not the way you imagined it but by draining away: an announcement on a Tuesday, a general resigning, a new name over the door. Your file is in an archive now and you could ask for it. People you know who asked read transcripts of their own conversations from 1983 and say it was like reading about a stranger. You defined yourself against something for a long time. It is gone, and you stand in the space where it was.',
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
    text: 'In the workers\' committee the hand goes up and you raise yours with it. The correct position on the correct question, your hand one of forty hands, all in unison. You are not afraid exactly. You are precise. You have learned to hold your actual views the way you hold your breath in certain rooms — long enough, without strain visible on your face, until you are outside again. The discipline of this: what you say at the meeting, what you say to your spouse, what you say to yourself in the exact interval between one person leaving and another arriving. You are fluent in two political languages and speak only one of them aloud.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.e += 6; p.s -= 3;
      p.addFlag('pol_right_in_communist_state');
      p.setMem('polRightCommunist', true);
    },
  },

  {
    id: 'pol_nationalist_abroad',
    phase: null,
    weight: 5,
    when: (G) =>
      G.political_leaning === 'nationalist' &&
      G.flags.has('emigrated') &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.polNatAbroad,
    text: 'At home, you were a nationalist among other nationalists — the position had a context, a history, other people who shared it. Here, you are the country. Every question about where you are from, every news story about what is happening there, lands on you as if you are its official spokesperson. You explain things you did not choose to explain. You defend positions you did not choose to defend. The paradox: the further you are from the country you love, the more completely you become it in other people\'s eyes. Your nationalism abroad is lonelier than it was at home, and louder, because it is the only thing here that knows your language.',
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
