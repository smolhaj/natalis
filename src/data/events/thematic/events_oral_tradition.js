// events_oral_tradition.js
// The "oral report" register: events framed as received speech rather than
// witnessed experience. "Your uncle came back from the market and said..."
// Applies to rural and pre-literate contexts: subsaharan, developing_unstable,
// conflict_zone archetypes; rural characters; pre-1980 periods.
// Design principle: "Your grandmother tells you about the year the rains didn't
// come." Not "you read about it" but a distinct prose register of told knowledge.

import { choleraEndemic } from '../../history.js'
import { colonialSchoolLanguage, INDEPENDENCE_YEAR } from '../../history.js'
import { hasTech } from '../../technology.js'
import { STAPLE } from './events_climate.js'

// `rural && smarts < 70` alone handed the whole register — the told story, the
// market news carried by truck drivers, the one radio in the village — to every
// rural character in every country, including rural Sweden and rural Japan.
const RICH_ARCHETYPES = ['wealthy_west', 'wealthy_east', 'wealthy_gulf']

const isOralContext = (G) => {
  const arch = G.archetype
  const poorArch = arch === 'subsaharan' || arch === 'developing_unstable' || arch === 'conflict_zone'
  if (RICH_ARCHETYPES.includes(arch)) return false
  return (poorArch || G.ruralUrban === 'rural') && G.stats.smarts < 70
}

// The grain whose failure is the one the story is about.
const stapleOf = (G) => STAPLE[G.character?.country?.name] ?? 'the grain'

export const ORAL_TRADITION_EVENTS = [

  // ── CHILDHOOD ORAL LAYER ─────────────────────────────────────────────────────

  {
    id: 'oral_grandmother_famine',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 6 && G.age <= 13 &&
      G.parents?.mother &&
      !G.mem?.oralGrandFamine,
    text: (G) => `Your grandmother tells you about the year the rains didn't come, the same way every time, which is how you know it is one of the true stories. The ${stapleOf(G)} that came up and then stopped. The second planting that stopped too. The animals before the people. Your grandfather walking two days to find a man with grain, and what the man asked for it. Your grandmother pauses in the same place every time.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.addFlag('oral_famine_memory')
      p.setMem('oralGrandFamine', true)
    },
  },

  {
    id: 'oral_market_news',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.oralMarketNews,
    text: (G) => `Your father comes back from the market in town, where the news arrives with the lorry drivers and the traders. This week ${stapleOf(G)} costs more. There was a meeting in the district capital about the road. Someone says the government is changing, which could mean anything. You cannot always hear the market news, but you have learned to read it in the adults' faces: the stillness, the conversation turning another way.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.addFlag('oral_market_listening')
      p.setMem('oralMarketNews', true)
    },
  },

  {
    id: 'oral_radio_man',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      // The village's one set is a question about the country, not about the
      // household — but the country still has to have radio in it, and a flat
      // 1955 put this set in a Bhutanese village sixteen years early.
      hasTech(G.currentCountry ?? G.character.country, 'radio', G.currentYear) &&
      G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 15 &&
      !G.mem?.oralRadioMan,
    // The colonial-radio premise — a broadcast in a language half the village
    // cannot follow — is true where school was taught in the coloniser's
    // language and false where it was not. In Egypt the radio spoke Arabic, and
    // the man beside it was translating something else: the announcement into
    // what the announcement meant.
    text: (G) => {
      const lang = colonialSchoolLanguage(G.character.country.name, G.currentYear)
      if (lang) {
        return `There is one radio in the village, belonging to the man who came back from the army with money and a radio. He brings it out for football matches and speeches, and people crowd round. It speaks ${lang}, which some follow well, some partly, some not at all. Somebody translates the important parts, and the version people take home is what the translator thinks they should know.`
      }
      return `There is one radio in the village, belonging to the man who came back from the army with money and a radio. He brings it out for football matches and speeches, and people crowd round. Everyone can follow the newsreader's words. What needs translating is what they mean: who it is aimed at and what will follow. The man with the radio does that part, and people take his version home, and sometimes it is not what the radio said at all.`
    },
    choices: null,
    effect: (p) => {
      p.e += 3
      p.addFlag('oral_radio_generation')
      p.setMem('oralRadioMan', true)
    },
  },

  {
    id: 'oral_stranger_arriving',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 8 && G.age <= 15 &&
      !G.mem?.oralStranger,
    text: `A stranger arrives, and in a village where everyone knows everyone, a stranger is news. The adults go to talk to him and the children are sent inside to listen through the wall. He stays one night or three or a week. What he said reaches you through three or four tellings, your mother to your father to a neighbour, and is probably not what he said. It is still news.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.s += 2
      p.setMem('oralStranger', true)
    },
  },

  {
    id: 'oral_death_spreads',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.oralDeathSpreads,
    text: `A death in the village arrives as a sound at night, a cry that starts in one direction and spreads, and you know what it means. By morning everyone knows. Over the next days the rest fills in: who saw them last, what they said. The village's story of the death is not exactly what happened, but it is what will survive.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('oralDeathSpreads', true)
    },
  },

  // ── ADOLESCENT ORAL LAYER ─────────────────────────────────────────────────────

  {
    id: 'oral_political_news',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 13 && G.age <= 19 &&
      !G.mem?.oralPoliticalNews,
    text: `The truck driver who comes through every two weeks brings newspapers from the city that are already three days old. The teacher reads them and summarises for people who ask. The political news arrives in translation: from newspaper to teacher, from teacher to parent, from parent to you. By the time you hear it, the political situation has been filtered through three different understandings of what matters and what is safe to say. The capital is far. What happens in the capital reaches here as an echo, and the echo is adjusted in transit.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.addFlag('oral_political_awareness')
      p.setMem('oralPoliticalNews', true)
    },
  },

  {
    id: 'oral_cousin_city',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isOralContext(G) && G.ruralUrban === 'rural' &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.oralCousinCity,
    text: `Your cousin who went to the city comes back for the harvest and everyone wants a turn with them. The city they describe is bigger than you can picture, dearer, a job and also a danger. They bring a length of cloth, a medicine, a small machine, and later, when the talk has moved on, you study the objects as closely as you listened. The cousin's city and the city are not the same. You will find out how different if you go.`,
    choices: null,
    effect: (p) => {
      p.e += 4
      p.r += 4
      p.addFlag('oral_city_curiosity')
      p.setMem('oralCousinCity', true)
    },
  },

  {
    id: 'oral_violence_nearby',
    phase: null,
    weight: 3,
    when: (G) =>
      G.conflictRisk >= 0.1 &&
      G.age >= 13 && G.age <= 21 &&
      !G.mem?.oralViolenceNearby,
    text: `A man walks all night from the next district and sits down in the compound at dawn without taking off his shoes. The children are sent inside. What he said reaches you through three people over three days: soldiers, or armed men who were not soldiers, and burning. Nobody knows how many are dead, because the people who would count them are afraid of being counted. That uncertainty is not ignorance. It is what the thing looks like from inside.`,
    choices: [
      {
        text: 'Your family begins to discuss whether to leave.',
        tag: 'oral_displacement_considered',
        outcome: 'The discussion of leaving is itself a kind of departure — a point after which you are not fully in the place in the way you were before.',
        effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('oral_displacement_considered'); p.setMem('oralViolenceNearby', true); },
      },
      {
        text: 'Your family stays. The violence is in the next district and may stay there.',
        tag: null,
        outcome: 'The violence does not always spread. Sometimes it stays in the next district. Sometimes it doesn\'t.',
        effect: (p) => { p.m -= 6; p.r += 4; p.setMem('oralViolenceNearby', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'oral_independence_announced',
    phase: null,
    weight: 3,
    when: (G) =>
      G.archetype === 'subsaharan' &&
      // The teacher runs in on THE morning, not any morning of the era: a
      // 1962 Nigerian was told at five, in 1967, that independence had just
      // been announced. The live country's own date, that year or the next.
      (() => {
        const iy = INDEPENDENCE_YEAR[G.currentCountry?.name ?? G.character?.country?.name]
        return iy != null && G.currentYear >= iy && G.currentYear <= iy + 1
      })() &&
      G.age >= 6 && G.age <= 16 &&
      // A schoolroom: only for a child who is in one.
      G.mem?.attendedSchool !== false && !G.flags.includes('never_schooled') &&
      !G.mem?.oralIndependence,
    text: `The teacher comes running into the schoolroom in the middle of the morning. You have never seen a teacher run. Something has happened in the capital and the radio said it: the country has the same name now without the other name attached in front. Outside, the adults are gathering and some of them are making the sound you have only heard at weddings. The word will arrive properly over the next ten years, in stages — the flag, the money, the officials who speak your grandmother's language.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.addFlag('oral_independence_generation')
      p.setMem('oralIndependence', true)
    },
  },

  {
    id: 'oral_harvest_failed',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 13 && G.age <= 20 && G.parents?.father?.alive &&
      !G.mem?.oralHarvestFail,
    text: `The men stand in the field in the late afternoon and look at what came up, and say almost nothing. The length of the silence is the verdict. Your mother hears it when your father comes in and starts her own reckoning: what is in the sacks, what can be sold, which debt is most pressing, what it would cost to ask the uncle in the city. You are old enough to know it is happening and not old enough to be included.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.e += 4
      p.addFlag('oral_harvest_failed')
      p.setMem('oralHarvestFail', true)
    },
  },

  {
    id: 'oral_letter_from_city',
    phase: null,
    weight: 2,
    when: (G) =>
      isOralContext(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      G.age >= 7 && G.age <= 16 &&
      G.parents?.father &&
      !G.mem?.oralLetterCity,
    text: `A letter comes from your father in the city, carried up on a Tuesday by the man who also does the post office run. Your mother holds it all afternoon and then walks it to the teacher, because the teacher reads. The reading happens in the open, aloud, and four people who are not family hear it: the job is steady, the money is coming, the city is not what he was told. He does not say when he is coming back. That part is heard by everyone too.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('oralLetterCity', true)
    },
  },

  {
    id: 'oral_elder_knowledge',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 8 && G.age <= 15 &&
      !G.mem?.oralElderKnowledge,
    text: `The old woman who carries the history that is in no book: who married whom, which ancestor came from elsewhere and why, which families share blood and cannot marry, where the boundary stones are and how they were agreed. You are old enough now to be given some of it, a piece at a time, when she judges you ready. She decides the schedule. That is one of the things she controls.`,
    choices: null,
    effect: (p) => {
      p.e += 4
      p.s += 2
      p.r += 3
      p.addFlag('oral_elder_taught')
      p.setMem('oralElderKnowledge', true)
    },
  },

  {
    id: 'oral_disease_rumour',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isOralContext(G) &&
      G.age >= 18 && G.age <= 30 &&
      choleraEndemic(G.currentCountry ?? G.character?.country, G.currentYear) &&
      !G.mem?.oralDiseaseRumour,
    text: `Something is killing people in the district to the north. The men at the market say it is a spirit. The health worker who comes once a month says cholera, and says the water and the hands. The woman who had it and recovered says it begins as a feeling in the stomach and then the water leaves the body faster than you can put it back. You give her version the most weight, because she is the only one who was in the room.`,
    choices: null,
    effect: (p) => {
      p.h -= 3
      p.e += 3
      p.addFlag('oral_disease_era')
      p.setMem('oralDiseaseRumour', true)
    },
  },

  {
    id: 'oral_school_teacher_said',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      isOralContext(G) &&
      G.education &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.oralTeacherSaid,
    text: `The teacher knows things from outside: the capital, the news, how things are done elsewhere. The teacher says the government is building a dam upriver. Your father says the government has been saying so for fifteen years. The teacher says this time it will happen. Your father says: wait and see.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 3
      p.setMem('oralTeacherSaid', true)
    },
  },

  {
    id: 'oral_soldiers_passed',
    phase: null,
    weight: 3,
    when: (G) =>
      // Soldiers passing through is a war, or a coup's aftermath, in the
      // year it happens: Kabul in 1976 was two years from either.
      (G.conflictRisk > 0.08 || (G.archetype === 'developing_unstable' && G.flags.includes('lived_through_coup'))) &&
      G.age >= 14 && G.age <= 25 &&
      !G.mem?.oralSoldiersPassed,
    text: `Soldiers passed through. It is a sentence that can mean six things and you read which one from the adults' faces before anyone speaks. This time they asked for food, took more than they asked for, and moved on. "No one was hurt," your uncle says, and says nothing after it, and means it as good news. You are old enough now to hear the words *this time* in a sentence that does not contain them.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.addFlag('oral_soldiers_passed')
      p.setMem('oralSoldiersPassed', true)
    },
  },

  {
    id: 'oral_prophet_came',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      isOralContext(G) &&
      (G.character.religion?.startsWith('christian') ||
       G.character.religion?.startsWith('muslim') ||
       G.character.religion === 'animist') &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.oralProphet,
    text: `A preacher came and stayed three days, and some of the meetings were for adults only. Afterwards they talked of his power, case by case: the woman's swollen leg, the man who could not sleep, the child's fever. What you watched was your parents: whether they believed him, whether they doubted him privately, whether they gave money. The talk went on for a month after he left.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('oralProphet', true)
    },
  },

]
