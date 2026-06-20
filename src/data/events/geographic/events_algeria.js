// events_algeria.js
// The Algerian Décennie Noire (Black Decade) — civil war 1991–2002
// BUILD 43 expansion: Algeria character events
//
// The historical ambiguity is the texture: the GIA and DRS (military intelligence)
// both carried out killings; some massacres were never formally attributed.
// The prose does not resolve what history did not resolve.

export const ALGERIA_EVENTS = [

  // ── FOLLOW-THROUGH EVENTS FIRST ─────────────────────────────────────────────
  // Written before the triggering events per design principle.

  {
    id: 'alg_decade_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.age >= 38 &&
      G.currentYear >= 2005 && G.currentYear <= 2018 &&
      !G.mem?.algDecadeSilence,
    text: 'A journalist arrives from France to write about the Black Decade. She says she wants to understand what it was like from inside. She has a recorder and a notebook and the confident curiosity of someone who was not here. The decade does not have an official name in Algeria. There was no truth commission. The families of the disappeared are still waiting for paperwork. She asks you what the nineties were like.',
    choices: [
      {
        text: 'Speak — it should be on record somewhere',
        tag: null,
        outcome: 'You speak for two hours. The article, when it appears, contains two sentences from you, correctly quoted.',
        effect: (p) => { p.karma += 5; p.m -= 3; p.addFlag('decade_witness'); p.setMem('algDecadeSilence', true); },
      },
      {
        text: 'Decline — there is nothing you can say that will be understood',
        tag: null,
        outcome: 'She finds someone else. You read the article. The someone else also could not say it.',
        effect: (p) => { p.r += 5; p.setMem('algDecadeSilence', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_exile_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('algeria_exile') &&
      G.age >= 45 &&
      G.currentYear >= 2003 &&
      !G.mem?.algExileReturn,
    text: 'You have been in France for ten years. The violence in Algeria has stopped — officially. The country you left is not the country in the news now. You have a life here. You also have a life that you left, which is not the same as no longer having it. Your mother is old. The apartment in Algiers is still there. Your French colleagues ask where you are from and you say Algeria and they say oh, and you wait for the next question, which is always the same question.',
    choices: [
      {
        text: 'Go back — see what is there',
        tag: null,
        outcome: 'The city is different and the same. The specific way you no longer fit it is also different from what you expected.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('algeria_returned'); p.setMem('algExileReturn', true); },
      },
      {
        text: 'Stay — France is where your life is now',
        tag: null,
        outcome: 'You stay. Algeria remains the place you grew up, which is not the same as home.',
        effect: (p) => { p.r += 8; p.addFlag('algeria_exile_permanent'); p.setMem('algExileReturn', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_telling_children',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.children?.length > 0 &&
      G.age >= 45 &&
      G.currentYear >= 2005 &&
      !G.mem?.algToldChildren,
    text: 'Your child asks what the nineties were like in Algeria. They have heard it mentioned — from you, from relatives, on television — but only in the way people mention weather: something that happened and then stopped. You were twenty-five years old when it started. You remember the specific sound of a year when you did not walk past a certain wall after dark.',
    choices: [
      {
        text: 'Tell them honestly — they should know what this country went through',
        tag: null,
        outcome: 'You tell them. Some of it. What you can find words for. They listen in a way that makes you aware of the distance.',
        effect: (p) => { p.m -= 4; p.karma += 5; p.addFlag('oral_historian'); p.setMem('algToldChildren', true); },
      },
      {
        text: 'Say it was difficult — leave the specifics',
        tag: null,
        outcome: 'You say it was a hard time. They nod. The conversation moves on. You find the newspaper clipping later and put it back.',
        effect: (p) => { p.r += 4; p.setMem('algToldChildren', true); },
      },
      {
        text: 'Show them the newspaper clipping you kept',
        tag: null,
        outcome: 'You find it — the date, the headline, the photograph you have looked at and not looked at for twenty years. They hold it carefully.',
        effect: (p) => { p.m -= 6; p.karma += 6; p.addFlag('decade_witness'); p.setMem('algToldChildren', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.age >= 60 &&
      !G.mem?.algLateReckoning,
    text: 'The official figure is 200,000 dead. Some researchers say more. No one has been prosecuted for the massacres. Several men who were senior in the DRS in the 1990s are now senior in the government. This is not a secret. The Civil Concord and subsequent legislation granted amnesty to combatants who surrendered. What it could not grant was an accounting. The perpetrators and the victims live in the same country. They are sometimes in the same village.',
    choices: null,
    effect: (p) => { p.r += 10; p.m -= 5; p.addFlag('decennie_noire_memory'); p.setMem('algLateReckoning', true); },
  },

  // ── TRIGGERING EVENTS ────────────────────────────────────────────────────────

  {
    id: 'alg_election_night_1991',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.algElectionNight91,
    text: 'The results from the December 26 elections come through in stages. The Front Islamique du Salut has won 188 seats in the first round. They are on course for a two-thirds majority. In the cafés people are saying things they have not said before, some with satisfaction and some with fear, and some with the specific quiet of a person calculating what this means for them specifically.',
    choices: [
      {
        text: 'The vote is the vote — this is what democracy looks like',
        tag: null,
        outcome: 'You believe in the process. What happens next will test that belief precisely.',
        effect: (p) => { p.karma += 5; p.addFlag('secular_algerian'); p.setPolitical('left'); p.setMem('algElectionNight91', true); },
      },
      {
        text: 'Say nothing — the situation is too uncertain to commit',
        tag: null,
        outcome: 'You say nothing. The uncertain situation resolves itself in ways that do not require your commitment.',
        effect: (p) => { p.addFlag('learned_silence'); p.setMem('algElectionNight91', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_coup_morning',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear === 1992 &&
      !G.mem?.algCoupMorning,
    text: 'The radio announces that the second round of elections, scheduled for 16 January, is cancelled. President Chadli Bendjedid has resigned. A High State Committee has been formed. The bus still runs. The school is open. The bread seller on the corner is there. Everything is open and the most significant political event in the country\'s independent history has just occurred and the bus is running.',
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('coup_witnessed'); p.setMem('algCoupMorning', true); },
  },

  {
    id: 'alg_first_roadblock',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      !G.mem?.algFirstRoadblock,
    text: 'There are headlights across the road. Figures standing in the beam. In the *décennie noire*, this moment — headlights across a road at night — will become a category of its own in Algerian memory. The question is who they are. The answer is that the question has no reliable answer. Both the gendarmerie and the armed groups use roadblocks. The way you are expected to behave at each is different. You cannot always tell which this is before you stop.',
    choices: [
      {
        text: 'Slow down and stop — whatever this is, stopping is safer than not',
        tag: null,
        outcome: 'You stop. They are gendarmes. They let you through after checking your papers. The shaking comes later.',
        effect: (p) => { p.m -= 8; p.h -= 3; p.addFlag('passed_checkpoint'); p.setMem('algFirstRoadblock', true); },
      },
      {
        text: 'Take another route — you know the back roads',
        tag: null,
        outcome: 'You turn around. It adds an hour. You arrive. You do not know what was at the roadblock.',
        effect: (p) => { p.m -= 5; p.addFlag('learned_silence'); p.setMem('algFirstRoadblock', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_journalist_target',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1993 && G.currentYear <= 1997 &&
      G.career && ['journalist', 'writer', 'novelist', 'academic'].includes(G.career?.id) &&
      !G.mem?.algJournalistTarget,
    text: 'The envelope is under the door when you wake up. The letter inside says you are an apostate and a servant of the *taghout* — the false authority. Or it says you are a servant of the forces of repression and foreign interests. Both letters exist; both are delivered to people like you. The GIA has been killing journalists, writers, and secular intellectuals. Sixty-eight journalists will die in Algeria in this decade. The letter does not say which organization wrote it.',
    choices: [
      {
        text: 'Publish under a pseudonym — continue working without your name',
        tag: null,
        outcome: 'The work continues. Your name is not on it. You cannot decide if this is cowardice or survival, which turns out to be the same question.',
        effect: (p) => { p.m -= 10; p.e += 3; p.addFlag('intellectual_target'); p.addFlag('censored_work'); p.setMem('algJournalistTarget', true); },
      },
      {
        text: 'Leave for France — the French consulate has been processing applications like yours',
        tag: null,
        outcome: 'You leave. You carry the work with you. France is cold and does not know your name.',
        effect: (p) => { p.m -= 15; p.addFlag('algeria_exile'); p.addFlag('intellectual_target'); p.setResidency('asylum_seeker'); p.setMem('algJournalistTarget', true); },
      },
      {
        text: 'Keep working under your own name — the work has to mean something',
        tag: null,
        outcome: 'You keep working. The calculation is ongoing. Some colleagues will not make the same choice and will survive. Some will and will not.',
        effect: (p) => { p.m -= 12; p.karma += 8; p.addFlag('intellectual_target'); p.addFlag('resistance_through_art'); p.setMem('algJournalistTarget', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_teacher_triangle',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1993 && G.currentYear <= 1998 &&
      G.career && ['teacher', 'educator', 'professor'].includes(G.career?.id) &&
      !G.mem?.algTeacherTriangle,
    text: 'Three colleagues from the region around Blida — the triangle between Algiers, Blida, and Médéa — have been killed in the past year. Teaching is not a neutral act. The GIA has declared that secular state schools are apostasy and teachers who continue are legitimate targets. The school is open. Your students are there. The bus still runs to the district.',
    choices: [
      {
        text: 'Keep teaching — the school closes if you stop',
        tag: null,
        outcome: 'You keep going. The school stays open. The fear becomes a condition, not an event.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.h -= 5; p.addFlag('civil_war_lived'); p.setMem('algTeacherTriangle', true); },
      },
      {
        text: 'Apply for a transfer to Algiers — the risk in the triangle is too high',
        tag: null,
        outcome: 'The transfer takes four months. In those four months you keep going. The transfer does not make you safe, only differently at risk.',
        effect: (p) => { p.m -= 8; p.addFlag('civil_war_lived'); p.setMem('algTeacherTriangle', true); },
      },
      {
        text: 'Resign — no salary is worth this',
        tag: null,
        outcome: 'You resign. Other teachers continue. You spend two years finding other work.',
        effect: (p) => { p.m -= 12; p.r += 6; p.setMem('algTeacherTriangle', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_neighbour_gone',
    phase: 'midlife',
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1994 && G.currentYear <= 1999 &&
      !G.mem?.algNeighbourGone,
    text: 'The family on the third floor. Or the man who ran the hardware shop two streets over who always had the right bolt. Not a name from the news — someone whose face you knew. They are gone. The specific mechanics vary: some families left for Algiers or France without saying; some disappeared and then appeared in a statistic; some the neighbours do not speak about because speaking is its own risk. The absence is the fact. The cause is a blank you learn to leave blank.',
    choices: null,
    effect: (p) => { p.m -= 10; p.addFlag('experienced_loss'); p.setMem('algNeighbourGone', true); },
  },

  {
    id: 'alg_the_list',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1995 && G.currentYear <= 1998 &&
      G.stats.smarts >= 55 &&
      !G.mem?.algTheList,
    text: 'Someone tells you your name is on a list. The lists existed — typed or handwritten, circulated between armed cells, naming people who had been identified as targets. You do not know if this is true. You know that not knowing is not a safe position. The people who were told their name was on a list and did nothing — some of them are fine. Some are not. The information cannot be verified and the risk cannot be assessed and you have to make a decision anyway.',
    choices: [
      {
        text: 'Leave Algeria — now, while there is still a way to leave',
        tag: null,
        outcome: 'You go. The paperwork goes with you. Whether your name was ever on a list, you will never know.',
        effect: (p) => { p.m -= 15; p.addFlag('algeria_exile'); p.addFlag('decennie_noire_fled'); p.setResidency('asylum_seeker'); p.setMem('algTheList', true); },
      },
      {
        text: 'Move to a relative\'s in another city — enough distance, same country',
        tag: null,
        outcome: 'You move to Constantine, to Oran. The city is different. The decade follows the news, not the geography.',
        effect: (p) => { p.m -= 10; p.addFlag('survived_on_list'); p.setMem('algTheList', true); },
      },
      {
        text: 'Stay — you will not be driven out of your own life',
        tag: null,
        outcome: 'You stay. The year passes. No one comes. You do not know what to do with that.',
        effect: (p) => { p.m -= 8; p.karma += 3; p.addFlag('survived_on_list'); p.setMem('algTheList', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_massacre_news',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1997 && G.currentYear <= 1998 &&
      !G.mem?.algMassacreNews,
    text: 'The news from Rais, from Bentalha. Four hundred people over four hours. Families in the buildings, the sounds, the morning after. The army barracks were 1.5 kilometres from Bentalha. Nobody came for four hours. Survivors said the killers wore army boots. Foreign journalists who investigated were expelled. This is reported and then not reported and then mentioned alongside other facts in a way that makes it not mean what it means. You know someone who was there. You sit with what you know.',
    choices: [
      {
        text: 'Say what you think happened — to whoever will listen',
        tag: null,
        outcome: 'You say it. The saying costs something. What it achieves is unclear.',
        effect: (p) => { p.karma += 8; p.m -= 8; p.addFlag('knew_the_truth'); p.setPolitical('dissident'); p.setMem('algMassacreNews', true); },
      },
      {
        text: 'Say nothing — the country has decided not to know',
        tag: null,
        outcome: 'You say nothing. The country continues. The nothing stays with you.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('learned_silence'); p.setMem('algMassacreNews', true); },
      },
      {
        text: 'Leave the room when it comes up',
        tag: null,
        outcome: 'You leave the room each time. The room becomes a category.',
        effect: (p) => { p.m -= 12; p.r += 10; p.setMem('algMassacreNews', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'alg_concord_vote',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Algeria' &&
      G.flags.includes('decennie_noire_generation') &&
      G.currentYear >= 1999 && G.currentYear <= 2000 &&
      !G.mem?.algConcordVote,
    text: 'Bouteflika\'s *concorde civile* — the Civil Concord. A referendum on amnesty for fighters who lay down arms. The official result is 98.6% in favour. The question on the ballot is whether you want peace. There is only one correct answer to this question in a country that has buried 200,000 people. The conditions of the amnesty are not on the ballot. What the fighters did is not on the ballot.',
    choices: [
      {
        text: 'Vote yes — whatever this is, it has to end',
        tag: null,
        outcome: 'You vote yes. The concord passes. The violence does end, slowly. The accounting does not begin.',
        effect: (p) => { p.m += 5; p.addFlag('algeria_concord'); p.setMem('algConcordVote', true); },
      },
      {
        text: 'Spoil the ballot — peace cannot be built on this',
        tag: null,
        outcome: 'Your ballot joins 0.6% of the count. The concord passes. You have no way of knowing if others made the same mark.',
        effect: (p) => { p.karma += 5; p.m -= 3; p.addFlag('knew_the_truth'); p.setMem('algConcordVote', true); },
      },
      {
        text: 'Do not go — this referendum is not asking the right question',
        tag: null,
        outcome: 'You do not go. The question it was not asking remains unanswered.',
        effect: (p) => { p.r += 5; p.setMem('algConcordVote', true); },
      },
    ],
    effect: null,
  },

]
