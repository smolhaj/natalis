// events_oral_tradition.js
// The "oral report" register: events framed as received speech rather than
// witnessed experience. "Your uncle came back from the market and said..."
// Applies to rural and pre-literate contexts: subsaharan, developing_unstable,
// conflict_zone archetypes; rural characters; pre-1980 periods.
// Design principle: "Your grandmother tells you about the year the rains didn't
// come." Not "you read about it" but a distinct prose register of told knowledge.

import { colonialSchoolLanguage } from '../../history.js'
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
    text: (G) => `Your grandmother tells you about the year the rains didn't come. She tells it the same way each time, which means it is one of the true stories — the true stories get told the same way because something in the telling has fixed. The ${stapleOf(G)} that came up and then stopped. The second planting that also stopped. The animals before the people. Your grandfather walking two days to the next village to find a man who had grain. What the man asked for the grain. Whether your grandfather paid it. Your grandmother pauses the same way each time she reaches this part.`,
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
    text: (G) => `Your father or uncle comes back from the market in the nearest town. The market is where news arrives — carried by the truck drivers, by the traders, by the people who have been somewhere you haven't been. This week the price of ${stapleOf(G)} is up. There was a meeting in the district capital about the new road. Someone says the government is changing, which could mean many things. You know how to read the adult faces when the market news is bad: the specific stillness, the way the conversation stops and starts in a different direction. You cannot always hear the market news. You always learn the face that reads it.`,
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
      G.currentYear >= 1955 && G.currentYear <= 1985 &&
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
        return `There is one radio in the village. It belongs to the man who was a soldier and came back with money and a radio. He keeps it at his house but brings it out for important events — football matches, political speeches, announcements. People crowd around it. The radio speaks ${lang}, which some people understand well and others understand partially and some don't understand at all. The man with the radio translates the important parts. Or he doesn't translate and someone else does. Or the translation is a summary that is not quite what the radio said, adjusted for what the translator thinks people should know.`
      }
      return `There is one radio in the village. It belongs to the man who was a soldier and came back with money and a radio. He keeps it at his house but brings it out for important events — football matches, political speeches, announcements. People crowd around it. The radio speaks the language properly, in the way of the capital and the newsreader, and everyone can follow the words. What has to be translated is the other thing: what the announcement means, who it is aimed at, what will follow from it. The man with the radio does that part, and people take his version home with them. Sometimes his version is not what the radio said at all.`
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
    text: `A stranger arrives. This is an event. In a village of people who know each other, a stranger is information — where they come from, why they came, what they carry, what they say. Adults go to speak with the stranger. Children are sent inside but listen from inside. The stranger stayed one night or three nights or a week. What the stranger said is told at secondhand: your mother tells your father, your father tells someone else, the version reaches you through three or four tellings. What the stranger actually said and what you received are probably not identical. You understand this. The received version is still news.`,
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
    text: `A death in the village spreads the same way. You hear it first as a sound at night — a particular cry that starts from one direction and spreads. You have learned what this cry is for. By morning everyone knows. The information about how and when fills in over the following days through conversation — who saw the person last, who the person spoke to, what the person said. The story of the death becomes the village story of the death, which is not the same thing as what happened but is all that survives. You are learning that events become stories, and that the stories are how events live.`,
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
      isOralContext(G) &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.oralCousinCity,
    text: `Your cousin who went to the city comes back at harvest time. Everyone wants to speak with them. The city they describe: bigger than you can quite imagine, the prices are higher, the streets are not what you expected, there is a job and also a danger. Your cousin brings things back — a cloth, a medicine, a small device — and these objects are as much information as the words. You examine the objects later when the conversation has moved on. The cousin's version of the city and the city itself are not identical. You know this. You will find out how much they differ when and if you go.`,
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
      G.archetype === 'conflict_zone' &&
      G.age >= 13 && G.age <= 21 &&
      !G.mem?.oralViolenceNearby,
    text: `You hear about violence in the next district from the man who walked all night from there. He arrived at dawn and sat down in the compound without taking off his shoes. The adults went to him. Children were told to go inside again. What he said came to you through three people over three days: there were soldiers, or armed men who were not soldiers, or both. There was burning. The count of dead is uncertain because people who count them are also afraid of being counted. You understand that the uncertainty is not ignorance — it is what the event looks like from inside it.`,
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
      G.currentYear >= 1956 && G.currentYear <= 1975 &&
      G.age >= 5 && G.age <= 16 &&
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
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.oralHarvestFail,
    text: `This year's harvest. Your father and the other men stand in the field in the late afternoon and look at what came up. They do not say much. The assessment is made by the length of the silence. Your mother hears the silence when your father comes inside and begins a different kind of calculation — what is in the sacks, what can be sold, which debts are most pressing, whether your uncle in the city can be asked for help and what the asking will cost in the relationship. You are old enough to understand the calculation is happening. You are not yet included in it. You watch your mother's face as she does the arithmetic that is not arithmetic.`,
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
    text: `The elder in your family or village who carries the history that is not in any book. Who married who in what year. The name of the ancestor who came from elsewhere and why they came. Which families share blood that makes certain marriages forbidden. Where the boundaries of the land run and how the boundaries were agreed. You are at the age when you are beginning to receive some of this, in pieces, when the elder judges you ready for a piece. The knowledge is not all given at once. It is given on a schedule the elder controls, which is how the elder controls something.`,
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
    text: `The teacher is the person in the village who knows things from outside. Not just the subjects — the capital city, the news, the way things are done elsewhere. You tell your parents what the teacher said, and sometimes your parents believe it and sometimes they don't, and the calibration between teacher-knowledge and parent-knowledge is something you are working out. The teacher said the government is building a dam upriver. Your father says the government has been saying this for fifteen years. The teacher said it is going to happen now. Your father says: wait and see. You have learned that "wait and see" is one answer to information you cannot verify.`,
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
      (G.archetype === 'conflict_zone' || G.archetype === 'developing_unstable') &&
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
    text: `A preacher or imam or healer came to the village and stayed for three days. You were not allowed to all the meetings — some were for adults. What you heard from the adults after: they said he had power. The evidence of the power was discussed in specific cases: the woman with the swollen leg, the man who could not sleep, the child with the fever. Your parents' response to the preacher is the register that matters: whether they accepted what he said, whether they doubted it privately, whether they gave money. The preacher left and the conversations about him continued for a month. Whether what he said was real is not something you can settle at this age.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('oralProphet', true)
    },
  },

]
