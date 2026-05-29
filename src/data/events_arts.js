// events_arts.js
// Arts under pressure: samizdat (USSR), jazz/Harlem (Black American), Nollywood (Nigeria),
// and the cross-cultural choice: encode the work or leave.
// All events are era-gated, country/archetype-gated, and career-adjacent.

export const ARTS_EVENTS = [

  // ── SAMIZDAT: RECEIVING ───────────────────────────────────────────────────────

  {
    id: 'arts_samizdat_found',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.artsSamizdatFound &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1956 && G.currentYear <= 1988 &&
      G.age >= 18,
    text: 'A friend passes you something without a title page. Carbon paper, the type faint, some pages uneven where the keys stuck. You hold it by the window because the light is better there. It is a novel, or an essay, or poems — the kind of thing that goes hand to hand because it cannot go any other way. You have until tomorrow evening to finish it and return it.',
    choices: [
      {
        text: 'Read it through tonight',
        tag: null,
        outcome: 'The text does something to you that is hard to name — the specific effect of reading something that someone risked to write, and that risked being passed to you.',
        effect: (p) => { p.e += 6; p.m += 5; p.addFlag('dissident_reader'); p.setMem('artsSamizdatFound', true); },
      },
      {
        text: 'Return it unread — the risk is not yours to carry',
        tag: null,
        outcome: 'You hand it back in the morning. For years you will be unsure what you chose.',
        effect: (p) => { p.r += 4; p.setMem('artsSamizdatFound', true); },
      },
    ],
    effect: null,
  },

  // ── SAMIZDAT: WRITING ─────────────────────────────────────────────────────────

  {
    id: 'arts_samizdat_write',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.artsSamizdatWrite &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1956 && G.currentYear <= 1988 &&
      G.age >= 20 &&
      (G.career?.id === 'journalist' || G.career?.id === 'novelist' || G.career?.id === 'artist' || G.stats.smarts >= 65),
    text: 'The manuscript has been finished for months. It cannot go to any publisher that exists. You have two options: a drawer, and whatever that means, or carbon paper, and whatever that means. Brodsky had poems and a labour assignment shovelling manure in Arkhangelsk. Solzhenitsyn had a novel and eleven years in a camp. They also had readers.',
    choices: [
      {
        text: 'Carbon copies — the work deserves readers',
        tag: null,
        outcome: 'Six copies leave your hands over two months. You do not know where they end up. Someone reads it. Someone reads something.',
        effect: (p) => { p.m += 10; p.karma += 8; p.addFlag('dissident_writer'); p.addFlag('dissident_reader'); p.setMem('artsSamizdatWrite', true); },
      },
      {
        text: 'The drawer — it can wait',
        tag: null,
        outcome: 'The drawer, unlike the outside, has no consequences. The manuscript waits.',
        effect: (p) => { p.r += 6; p.addFlag('art_in_drawer'); p.setMem('artsSamizdatWrite', true); },
      },
    ],
    effect: null,
  },

  // ── JAZZ: BEBOP AS REFUSAL ────────────────────────────────────────────────────

  {
    id: 'arts_jazz_bebop',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.artsJazzBebop &&
      G.character.country.name === 'USA' &&
      (G.flags.has('black_american') || (G.ethnicity && G.ethnicity.toLowerCase().includes('black'))) &&
      G.currentYear >= 1943 && G.currentYear <= 1965 &&
      G.career?.id === 'musician' &&
      G.age >= 18,
    text: 'The new music is deliberately difficult. The tempos are faster than dancing allows. The harmonies go somewhere that stops being ornamental. Parker and Dizzy built it that way on purpose — music that demands to be listened to on its own terms, that refuses to be entertainment for rooms where you cannot sit down. You play a set at a club in Harlem and something happens to the time that cannot be explained except from inside it.',
    choices: [
      {
        text: 'Push it further — this is the music',
        tag: null,
        outcome: 'It costs you commercially. You do not regret it.',
        effect: (p) => { p.m += 12; p.karma += 6; p.addFlag('artistic_integrity'); p.addFlag('resistance_through_art'); p.setMem('artsJazzBebop', true); },
      },
      {
        text: 'Play what the room will pay for',
        tag: null,
        outcome: 'You play well. The room is satisfied. The music you made at 2am rehearsal stays there.',
        effect: (p) => { p.w += 6; p.r += 5; p.setMem('artsJazzBebop', true); },
      },
    ],
    effect: null,
  },

  // ── JAZZ: TOURING JIM CROW ────────────────────────────────────────────────────

  {
    id: 'arts_jazz_jim_crow',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.artsJazzJimCrow &&
      G.character.country.name === 'USA' &&
      (G.flags.has('black_american') || (G.ethnicity && G.ethnicity.toLowerCase().includes('black'))) &&
      G.currentYear >= 1930 && G.currentYear <= 1965 &&
      G.career?.id === 'musician' &&
      G.age >= 18,
    text: 'The tour takes you south. The Green Book lists which hotels will have you. The venues are divided: white audiences who will not share a table with you, then Black audiences at smaller rooms who pay less but listen differently. In one city the promoter tells you to use the service entrance. You have played to packed houses in New York. You use the service entrance.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('experienced_racism'); p.addFlag('civil_rights_generation'); p.setMem('artsJazzJimCrow', true); },
  },

  // ── NOLLYWOOD: ENTRY ─────────────────────────────────────────────────────────

  {
    id: 'arts_nollywood_entry',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.artsNollywoodEntry &&
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1992 && G.currentYear <= 2005 &&
      (G.career?.id === 'actor' || G.career?.id === 'artist' || G.career?.id === 'musician') &&
      G.age >= 18,
    text: 'They are filming in a car park in Surulere. The director has a borrowed camera, a generator rented by the hour, and a script that will be shot in six days because there is no money for a seventh. The first Nigerian video film — *Living in Bondage* — sold 750,000 VHS copies in 1992 from a trunk. The industry has no union, no residuals, no studio system. It has 150 million people who want to see themselves on screen.',
    choices: [
      {
        text: 'Take the role — this is what exists',
        tag: null,
        outcome: 'You are paid in cash. You are not sure what you signed. The film sells well in Lagos and Onitsha and Accra and in a market stall in south London you will never see.',
        effect: (p) => { p.m += 10; p.w += 5; p.addFlag('nollywood_generation'); p.setMem('artsNollywoodEntry', true); },
      },
      {
        text: 'Wait for something more formal',
        tag: null,
        outcome: 'Formal takes another decade to arrive.',
        effect: (p) => { p.r += 4; p.setMem('artsNollywoodEntry', true); },
      },
    ],
    effect: null,
  },

  // ── NOLLYWOOD: A DECADE IN ────────────────────────────────────────────────────

  {
    id: 'arts_nollywood_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('nollywood_generation') &&
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 2006 &&
      !G.mem?.artsNollywoodDecade,
    text: 'The industry has become the third-largest film industry in the world. The VHS copies in the market stall became DVDs, which became streaming platforms. There are studios now, producers with offices, actors with agents. You were there when it was a car park in Surulere. That is not nothing.',
    choices: null,
    effect: (p) => { p.m += 6; p.w += 4; p.setMem('artsNollywoodDecade', true); },
  },

  // ── THE CENSORED ARTIST'S CHOICE ─────────────────────────────────────────────

  {
    id: 'arts_censored_stay_or_leave',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.artsCensoredChoice &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime) &&
      (G.career?.id === 'artist' || G.career?.id === 'musician' || G.career?.id === 'journalist' || G.career?.id === 'novelist' || G.flags.has('dissident_writer')) &&
      G.age >= 30,
    text: (G) => {
      if (G.character.country.archetype === 'post_soviet') {
        return 'Shostakovich stayed. He put the Party\'s demands into the Fifth Symphony and called it a composer\'s creative reply — the critics read it as submission; the audience heard something else. Brodsky did not stay. He was sentenced for social parasitism and eventually expelled. The two careers describe the full range of what is available to you. There is no correct choice. There is only the choice you can live with and the consequences that attach to it.'
      }
      if (G.character.country.name === 'Cuba') {
        return 'After the Padilla affair, the government issued a letter that writers and artists were asked to sign — a denunciation, a declaration of loyalty. Some signed it. Some did not. Those who did not are in a different relationship with the country now. The country is also in a different relationship with itself.'
      }
      return 'The work you are making cannot be shown here. This is a fact about the place, not the work. You can revise it to fit the place, put it in a drawer until the place changes, or leave. The drawer option has a long tradition. So does the other one. So does compliance.'
    },
    choices: [
      {
        text: 'Stay — encode the work, find the form the censor cannot quite read',
        tag: null,
        outcome: 'You find the form that allows the content. The work becomes more compressed, more precise. Whether the censorship warps the art or improves it is a question you do not resolve.',
        effect: (p) => { p.m += 6; p.e += 5; p.addFlag('resistance_through_art'); p.addFlag('artistic_integrity'); p.setMem('artsCensoredChoice', true); },
      },
      {
        text: 'Leave — the work requires air',
        tag: null,
        outcome: 'Exile gives the work space and takes the audience. You are known abroad in a way that matters, and irrelevant at home in a way that matters more.',
        effect: (p) => { p.m -= 5; p.r += 6; p.karma += 8; p.addFlag('artistic_integrity'); p.addFlag('emigrated'); p.setMem('artsCensoredChoice', true); },
      },
      {
        text: 'Comply — revise it, show it, survive',
        tag: null,
        outcome: 'The approved version is shown. It is not the work you made. People see it anyway. You have complicated feelings about this for the rest of your career.',
        effect: (p) => { p.m -= 8; p.r += 10; p.addFlag('censored_work'); p.addFlag('compromised'); p.setMem('artsCensoredChoice', true); },
      },
    ],
    effect: null,
  },

  // ── THE WORK IN THE DRAWER ────────────────────────────────────────────────────

  {
    id: 'arts_unshown_work',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.artsUnshownWork &&
      (G.flags.has('art_in_drawer') || G.flags.has('censored_work')) &&
      G.age >= 35,
    text: 'The version you were not allowed to make is still in your possession. Some version of it — a draft, a score, a negative, a manuscript. You have not looked at it in years. It is still the truest thing you have made. You do not know what to do with that knowledge.',
    choices: [
      {
        text: 'Retrieve it — let someone finally see it',
        tag: null,
        outcome: 'You bring it out. The world has changed enough, or not enough. Either way, it exists now in a way it didn\'t.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('art_shown_late'); p.setMem('artsUnshownWork', true); },
      },
      {
        text: 'Leave it where it is — it belongs to that time',
        tag: null,
        outcome: 'Some things are complete without an audience. Or you tell yourself this.',
        effect: (p) => { p.r += 5; p.setMem('artsUnshownWork', true); },
      },
    ],
    effect: null,
  },

  // ── ARTISTIC INTEGRITY: LATE ECHO ────────────────────────────────────────────

  {
    id: 'arts_integrity_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('artistic_integrity') &&
      G.age >= 60 &&
      !G.mem?.artsIntegrityEcho,
    text: 'A younger person asks what the work was like, back then — what it cost. You try to explain the arithmetic: the money not made, the audience not reached, the version not shown. What you cannot explain is who you would have become if you had made different choices. You know only the version you are.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.setMem('artsIntegrityEcho', true); },
  },

]
