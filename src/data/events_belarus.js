// Belarus arc events
// Covers: WWII partisan republic memory, Chernobyl 1986, independence 1991,
// Lukashenko 1994, 2020 election fraud protests, crackdown, exile and staying

const BELARUS_EVENTS = [

  {
    id: 'bel_partisan_memory',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear >= 1950 && G.currentYear <= 1985 && G.age >= 6 && G.age <= 14 && !G.flags.has('bel_partisan_memory'),
    text: (G) => {
      const yr = G.currentYear
      return `Every May 9. The grandfather who does not walk straight comes to the school and stands in front of the class with his medals. He shows you the photographs — the forest, the men in the photographs younger than your father is now. Belarus lost a third of its population. The village on the monument list near yours has ${yr <= 1965 ? 'forty-three' : 'sixty-one'} names. You learn the names before you learn what the war was about. Every family in Belarus has a grave. Every family knows where the grave is.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.addFlag('bel_partisan_memory'); },
  },

  {
    id: 'bel_chernobyl',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear === 1986 && !G.flags.has('bel_chernobyl_generation'),
    text: 'April 26, 1986. You hear something about an accident at a Ukrainian nuclear plant, but the official radio says it is under control. The cloud moves north. Seventy percent of the fallout from Chernobyl lands in Belarus. In the Gomel region, people are told nothing for two days. The May Day parade in Minsk goes ahead on schedule, four days after the explosion — children marching in the contaminated air, the officials watching from the tribune. You learn this later. When you learn it, you think about the parade.',
    choices: [
      {
        text: 'You were in the affected Gomel or Mogilev region.',
        tag: 'affected_zone',
        outcome: 'You were told to stay indoors. Then you were told it was safe. Then, years later, you understood that both statements could not both be true.',
        effect: (p) => { p.h -= 10; p.m -= 12; p.r += 6; p.addFlag('bel_chernobyl_generation'); p.addFlag('bel_chernobyl_zone'); },
      },
      {
        text: 'You were in Minsk.',
        tag: 'minsk',
        outcome: 'The May Day parade. The children marching. The officials watching. You were in the crowd. You did not know about the cloud.',
        effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('bel_chernobyl_generation'); },
      },
    ],
  },

  {
    id: 'bel_independence_1991',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear === 1991 && !G.flags.has('bel_independence_1991'),
    text: 'In March 1991, Belarus voted 83% to stay in the Soviet Union. In August 1991 the coup in Moscow collapsed. In December 1991, Shushkevich signed the Belavezha Accords in a hunting lodge in the Białowieża Forest and the Soviet Union was over. Independence had not been the plan. The country was not emotionally prepared for it. The factories still ran on Soviet supply chains. The ruble was still Soviet. The question of what Belarus was, without the Soviet Union, was not something anyone had thought to answer.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.e += 2; p.addFlag('bel_independence_1991'); },
  },

  {
    id: 'bel_lukashenko_1994',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear === 1994 && !G.flags.has('bel_lukashenko_era'),
    text: (G) => {
      const young = G.age <= 28
      return `Aliaksandr Lukashenko wins the 1994 election: a collective farm director, unknown outside the anti-corruption committee, the only man who voted against the Belavezha Accords. He got 80% of the vote against the incumbent prime minister. ${young ? 'You voted for him. Most people your age voted for him.' : 'You voted for him, or you knew people who did.'} He was the only candidate who spoke Belarusian in the debate. He promised to fight corruption. He promised to keep the factories running. He was telling the truth about the corruption, everyone could see that. What came after the election took longer to understand.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.addFlag('bel_lukashenko_era'); },
  },

  {
    id: 'bel_state_discipline',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear >= 2000 && G.currentYear <= 2019 && !G.flags.has('bel_state_discipline') && !G.mem.bel_disc_checked,
    text: (G) => {
      const yr = G.currentYear
      return `The opposition newspaper that printed the wrong thing. The radio station that had its licence revoked. The university professor who said something at a lecture and was no longer at the university the following semester. You work at a state enterprise — most people work at state enterprises — and there are things you do not say at work, not because someone told you not to say them, but because ${yr <= 2010 ? 'someone was let go three years ago for saying something similar' : 'you have watched long enough to understand what the consequences look like'}. This is not fear. It is information.`
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('bel_state_discipline'); p.setMem('bel_disc_checked', true); },
  },

  {
    id: 'bel_2020_protests',
    phase: 'midlife',
    weight: 6,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear === 2020 && G.age >= 18 && !G.flags.has('bel_2020_generation'),
    text: 'August 9, 2020. The election results come in showing Lukashenko with 80%. Tsikhanouskaya\'s parallel count showed she had won. The ballot boxes — people who sat as observers photographed the real counts. A housewife and a teacher and a blogger\'s wife became the opposition because their husbands were in prison. The first days: people arrested, detained in the Okrestina detention centre, accounts of what happened inside. Then Sunday after Sunday: 200,000 people in the streets of Minsk. Workers at the state tractor factory striking. Women forming human chains. The country discovering, over several weeks, how many people it contains.',
    choices: [
      {
        text: 'You marched every Sunday.',
        tag: 'marched',
        outcome: 'You were in the crowd. The crowd was enormous. The specific feeling of standing in it — that many people, that silent, then that loud.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('bel_2020_generation'); p.addFlag('bel_2020_marcher'); },
      },
      {
        text: 'You supported from the edges — food, logistics, money.',
        tag: 'supported',
        outcome: 'You did not march but you made things possible for people who did. This was its own kind of choice.',
        effect: (p) => { p.m += 4; p.karma += 4; p.addFlag('bel_2020_generation'); },
      },
      {
        text: 'You watched and waited.',
        tag: 'waited',
        outcome: 'You had reasons. A job that would be lost. Children. A calculation that the crackdown would come. It came.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('bel_2020_generation'); },
      },
    ],
  },

  {
    id: 'bel_crackdown',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.character.country.name === 'Belarus' && G.currentYear >= 2020 && G.currentYear <= 2022 && G.flags.has('bel_2020_generation') && !G.flags.has('bel_crackdown_survived'),
    text: (G) => {
      const isMarcher = G.flags.has('bel_2020_marcher')
      return `The crackdown. Raman Bandarenka: beaten to death in a Minsk courtyard in November 2020 after objecting to the removal of protest ribbons from a lamppost. A journalist taken off a commercial flight over Minsk and arrested on the ground. Thirty-five thousand people detained. ${isMarcher ? 'You know at least three people who were in the Okrestina detention centre. You know what they described when they came out.' : 'The journalists who documented what happened in the detention centres are in exile or in prison.'} The country empties: to Warsaw, to Vilnius, to Kyiv. The ones who stay learn a new set of calculations.`
    },
    choices: [
      {
        text: 'You decided to leave.',
        tag: 'left',
        outcome: 'Warsaw, or Vilnius, or somewhere. You packed what you could explain to a customs officer. You knew people there already.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('bel_crackdown_survived'); p.addFlag('bel_exile'); },
      },
      {
        text: 'You stayed.',
        tag: 'stayed',
        outcome: 'You stayed and learned what staying required. The language changed. The calculations changed. You learned the new version.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('bel_crackdown_survived'); p.addFlag('bel_stayed_2020'); },
      },
    ],
  },

  {
    id: 'bel_exile_life',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('bel_exile') && G.currentYear >= 2021 && G.currentYear <= 2026 && !G.mem.bel_exile_checked,
    text: (G) => {
      const yr = G.currentYear
      return `${yr <= 2022 ? 'Warsaw' : 'Vilnius or Warsaw'}: the Belarusian expat community is large enough now to have its own cafes, its own newspapers, its own funerals. You meet people who left in 2020, and people who left when Belarus let the Russian troops use its territory for the February 2022 invasion. The conversation at every gathering eventually reaches the same point: when can we go back. Nobody knows the answer. Nobody says never, because saying never is its own kind of betrayal. You renew your registration and your work permit and wait.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 2; p.setMem('bel_exile_checked', true); },
  },

]

export default BELARUS_EVENTS
