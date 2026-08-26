/**
 * events_political_prison.js — the arrest that is not for a crime.
 *
 * Prison could only ever be entered through attemptCrime: a player action
 * behind the crime panel, which passive mode does not show at all. So in a game
 * carrying the Stasi files, SAVAK, Camp Boiro, the ghost houses of Khartoum,
 * the gulag and the Southern Cone, nobody could ever be arrested for what they
 * said, and the 32 authored prison and post-release events were unreachable.
 *
 * These are the doors into that arc. Each one is gated on the regime the
 * character is actually living under in that year — getCountryRegime applies
 * the dated transitions, so Iran before 1979 is not Iran after it — and most
 * are gated further on something the character has already done, so the arrest
 * lands as a consequence rather than a dice roll.
 *
 * The sentence is what the arrest is worth, not what the writing wants: two
 * years for a signature on a petition, fifteen for organising.
 */

const REPRESSIVE = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy', 'absolute_monarchy']
const isRepressive = (G) => REPRESSIVE.includes(G.regime)

export const POLITICAL_PRISON_EVENTS = [

  // ── The word you said ───────────────────────────────────────────────────────

  {
    id: 'pol_arrest_the_remark',
    phase: null,
    weight: 1,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 18 && G.age <= 65 &&
      !G.mem?.polArrestRemark,
    text: 'You said it in a room with six people in it. You have gone over the six of them many times since, and you have never settled on which one, which is its own kind of punishment. They come at the hour they come at, which everyone knows about and nobody says. The charge is read to you in a language so formal it takes a moment to understand that it is about you.',
    choices: [
      {
        text: 'Say nothing at all.',
        tag: 'defiant',
        outcome: 'It costs you a longer sentence and it buys you the only thing left to own, which is that they got nothing from you that they did not already have.',
        effect: (p) => {
          p.setMem('polArrestRemark', true)
          p.m -= 14; p.r += 6
          p.addFlag('refused_to_name'); p.addFlag('political_prisoner')
          p.imprison(4, { political: true, charge: 'Anti-state agitation' })
        },
      },
      {
        text: 'Give them a name they already have.',
        tag: 'yielding',
        outcome: 'You choose the one you are sure is already on the list. You are almost sure. It shortens the sentence, and you will spend a long time arithmetic-ing whether that was a trade or a betrayal.',
        effect: (p) => {
          p.setMem('polArrestRemark', true)
          p.m -= 10; p.r += 14; p.karma -= 8
          p.addFlag('named_someone'); p.addFlag('political_prisoner')
          p.imprison(2, { political: true, charge: 'Anti-state agitation' })
        },
      },
      {
        text: 'Sign whatever is in front of you.',
        tag: 'yielding',
        outcome: 'You do not read it. Reading it would mean deciding about it, and you have already decided.',
        effect: (p) => {
          p.setMem('polArrestRemark', true)
          p.m -= 12; p.r += 9
          p.addFlag('signed_the_confession'); p.addFlag('political_prisoner')
          p.imprison(3, { political: true, charge: 'Anti-state agitation' })
        },
      },
    ],
    effect: null,
  },

  // ── What was in the flat ────────────────────────────────────────────────────

  {
    id: 'pol_arrest_the_pages',
    phase: null,
    weight: 6,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 17 &&
      (G.flags.has('dissident_reader') || G.flags.has('dissident_writer') ||
       G.flags.has('samizdat_reader') || G.flags.has('censored_work')) &&
      !G.mem?.polArrestPages,
    text: 'They do not search the flat so much as inventory it. A man you have never seen writes down the titles in a notebook, and his handwriting is careful, and he asks you how to spell one of the authors. The pages were in the place everyone puts them, which you knew, and used anyway, because there is nowhere else and because you had begun to believe nothing would happen.',
    choices: [
      {
        text: 'They are mine. Nobody else touched them.',
        tag: 'defiant',
        outcome: 'Whether it protects anyone you will never establish. It is the sentence you had prepared, and you get to say it, and that turns out to matter more than you expected.',
        effect: (p) => {
          p.setMem('polArrestPages', true)
          p.m -= 10; p.e += 4
          p.addFlag('took_it_alone'); p.addFlag('political_prisoner')
          p.imprison(5, { political: true, charge: 'Possession of prohibited literature' })
        },
      },
      {
        text: 'Say they were left here. You do not know by whom.',
        tag: 'yielding',
        outcome: 'The man with the notebook writes that down too, in the same careful hand, and does not look up. They know. The sentence is shorter anyway; the arithmetic of these things is not about belief.',
        effect: (p) => {
          p.setMem('polArrestPages', true)
          p.m -= 8; p.r += 7
          p.addFlag('political_prisoner')
          p.imprison(3, { political: true, charge: 'Possession of prohibited literature' })
        },
      },
    ],
    effect: null,
  },

  // ── The square ──────────────────────────────────────────────────────────────

  {
    id: 'pol_arrest_the_square',
    phase: null,
    weight: 6,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 16 && G.age <= 45 &&
      (G.flags.has('activist') || G.flags.has('protest_attended') || G.flags.has('dissident_sympathies')) &&
      !G.mem?.polArrestSquare,
    text: 'The lorries are at the far end before the crowd understands that they are the reason the street was allowed to fill. You are not at the front. It makes no difference; they work inward from the edges. In the van there is a boy of about seventeen who keeps apologising to everyone, and an older woman who tells him, quite kindly, to stop.',
    choices: [
      {
        text: 'Give the name and address on your papers.',
        tag: 'yielding',
        outcome: 'Cooperative, brief, and enough. The sentence is the standard one for that year, which everyone in the van will receive within a month of each other.',
        effect: (p) => {
          p.setMem('polArrestSquare', true)
          p.m -= 9
          p.addFlag('political_prisoner'); p.addFlag('detained_at_protest')
          p.imprison(2, { political: true, charge: 'Unlawful assembly' })
        },
      },
      {
        text: 'Ask, out loud, what the charge is.',
        tag: 'defiant',
        outcome: 'The question is answered eventually and at length, in a room, and by then it is a different question. The older woman was right about the apologising and would have been right about this.',
        effect: (p) => {
          p.setMem('polArrestSquare', true)
          p.m -= 13; p.h -= 6; p.e += 3
          p.addFlag('political_prisoner'); p.addFlag('detained_at_protest'); p.addFlag('beaten_in_custody')
          p.imprison(4, { political: true, charge: 'Unlawful assembly and resisting' })
        },
      },
    ],
    effect: null,
  },

  // ── Organising ──────────────────────────────────────────────────────────────

  {
    id: 'pol_arrest_the_organiser',
    phase: null,
    weight: 5,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 22 && G.age <= 60 &&
      (G.flags.has('union_member') || G.flags.has('union_solidarity') ||
       G.flags.has('strike_victory') || G.flags.has('strike_defeat')) &&
      !G.mem?.polArrestOrganiser,
    text: 'They take the committee in one night, which tells you the list was accurate and that it came from inside. The charge is economic sabotage, and it carries what economic sabotage carries. At the hearing the prosecutor reads out the number of production-hours lost as though reading the number of dead.',
    choices: null,
    effect: (p) => {
      p.setMem('polArrestOrganiser', true)
      p.m -= 15; p.r += 8
      p.addFlag('political_prisoner'); p.addFlag('jailed_for_organising')
      p.imprison(7, { political: true, charge: 'Economic sabotage' })
    },
  },

  // ── The story that ran ──────────────────────────────────────────────────────

  {
    id: 'pol_arrest_the_journalist',
    phase: null,
    weight: 6,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 22 &&
      (G.career?.field === 'media' || G.flags.has('censored_journalist') || G.flags.has('dissident_writer')) &&
      !G.mem?.polArrestJournalist,
    text: 'The piece ran on a Thursday. On Friday the editor is not in the building and nobody will say where he is, and by Monday the masthead has been reset without either of your names on it. What they want from you, across four days of questions, is not a retraction. It is the two people who spoke to you, and you find that you already knew you were not going to give them, which is a relief and also the end of a number of things.',
    choices: [
      {
        text: 'Protect the sources.',
        tag: 'defiant',
        outcome: 'Both of them stay out of it. One of them will find you, years later, and say nothing about it at all, which is how you will know that they knew.',
        effect: (p) => {
          p.setMem('polArrestJournalist', true)
          p.m -= 12; p.karma += 12; p.e += 4
          p.addFlag('political_prisoner'); p.addFlag('protected_source_at_cost')
          p.imprison(6, { political: true, charge: 'Publishing false information' })
        },
      },
      {
        text: 'Give them one.',
        tag: 'yielding',
        outcome: 'You pick the one you tell yourself is safest. You are wrong about that, and you learn how wrong about eleven months later, from a guard who mentions it in passing because it is not, to him, news.',
        effect: (p) => {
          p.setMem('polArrestJournalist', true)
          p.m -= 16; p.r += 18; p.karma -= 12
          p.addFlag('political_prisoner'); p.addFlag('gave_up_source')
          p.imprison(2, { political: true, charge: 'Publishing false information' })
        },
      },
    ],
    effect: null,
  },

  // ── Wrong observance ────────────────────────────────────────────────────────

  {
    id: 'pol_arrest_theocratic_morality',
    phase: null,
    weight: 2,
    when: (G) =>
      G.regime === 'theocracy' && !G.inPrison && G.age >= 15 && G.age <= 55 &&
      !G.mem?.polArrestMorality,
    text: 'It is not a court in any sense you would have used the word before. The complaint is about conduct, and the conduct is described back to you in a vocabulary that makes the ordinary evening it actually was sound like something else entirely. Your family is in the corridor. You can hear which one of them is talking.',
    choices: [
      {
        text: 'Accept the account and apologise for it.',
        tag: 'yielding',
        outcome: 'The apology is accepted and recorded and it does not shorten anything by as much as you were told it would.',
        effect: (p) => {
          p.setMem('polArrestMorality', true)
          p.m -= 12; p.r += 8
          p.addFlag('political_prisoner'); p.addFlag('morality_conviction')
          p.imprison(2, { political: true, charge: 'Public morality offence' })
        },
      },
      {
        text: 'Correct the account, in detail, on the record.',
        tag: 'defiant',
        outcome: 'You are allowed to finish. Being allowed to finish is not the same as being heard, and the difference is three additional years.',
        effect: (p) => {
          p.setMem('polArrestMorality', true)
          p.m -= 9; p.e += 5; p.karma += 5
          p.addFlag('political_prisoner'); p.addFlag('morality_conviction'); p.addFlag('would_not_recant')
          p.imprison(5, { political: true, charge: 'Public morality offence and contempt' })
        },
      },
    ],
    effect: null,
  },

  // ── The sweep that is not about you ─────────────────────────────────────────

  {
    id: 'pol_arrest_the_category',
    phase: null,
    weight: 1,
    when: (G) =>
      isRepressive(G) && !G.inPrison && G.age >= 16 && G.age <= 70 &&
      (G.ethnicity && G.character?.country?.ethnicGroups?.some(g => g.id === G.ethnicity && g.disadvantaged)) &&
      !G.mem?.polArrestCategory,
    text: 'Nobody asks you anything. That is the part that stays with you: there is no interrogation, because there is no question — the category was decided somewhere else and you are simply an instance of it. The man processing the paperwork is bored, and being bored by it is worse than being cruel about it would have been.',
    choices: null,
    effect: (p) => {
      p.setMem('polArrestCategory', true)
      p.m -= 16; p.h -= 5; p.r += 10
      p.addFlag('political_prisoner'); p.addFlag('detained_for_who_you_are')
      p.imprison(3, { political: true, charge: 'Administrative detention' })
    },
  },

  // ── Refusing the uniform ────────────────────────────────────────────────────

  {
    id: 'pol_arrest_refused_service',
    phase: null,
    weight: 5,
    when: (G) =>
      isRepressive(G) && !G.inPrison &&
      G.character?.gender === 'male' && G.age >= 18 && G.age <= 26 &&
      !G.flags.has('served_military') && !G.mem?.polArrestRefusedService,
    text: 'The letter comes the way everyone\'s letter comes. You do not report on the date, and for eleven days nothing happens, which is long enough to begin constructing a life in which nothing happens. On the twelfth day two men who are not military police, and who are polite, explain the article of the code you are now inside.',
    choices: [
      {
        text: 'Report late and serve.',
        tag: 'yielding',
        outcome: 'The lateness is entered in a file that will follow you into every posting. You serve the term and something like six additional months that nobody ever explains.',
        effect: (p) => {
          p.setMem('polArrestRefusedService', true)
          p.m -= 8
          p.addFlag('served_military'); p.addFlag('reported_late')
          p.imprison(1, { political: true, charge: 'Failure to report' })
        },
      },
      {
        text: 'Refuse it outright, and say why.',
        tag: 'defiant',
        outcome: 'Saying why is the part that adds the years. You would not have been able to leave it out.',
        effect: (p) => {
          p.setMem('polArrestRefusedService', true)
          p.m -= 11; p.karma += 10; p.e += 3
          p.addFlag('political_prisoner'); p.addFlag('refused_to_serve')
          p.imprison(4, { political: true, charge: 'Refusal of military service' })
        },
      },
    ],
    effect: null,
  },
]

export default POLITICAL_PRISON_EVENTS
