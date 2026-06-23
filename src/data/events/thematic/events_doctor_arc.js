// events_doctor_arc.js — Deep doctor career arc
//
// The doctor already exists in careers.js with one event.
// These events add the texture the career system cannot:
// the first death you carry out differently from the rest,
// the resource gap in low-income settings, the slow arithmetic
// of what the years cost, the face of the one patient you
// can still see clearly.

const isDoctor = (G) => G.career?.id === 'doctor' || G.flags.has('doctor_career')

export const DOCTOR_ARC_EVENTS = [

  {
    id: 'doc_first_death',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isDoctor(G) &&
      !G.mem?.docFirstDeathFired,
    text: `The patient is sixty-three. You have been their doctor for eleven weeks, which is long enough to know their husband's name and the name of the condition and the trajectory of it, which was always going to end here. The end arrives overnight. When the attending comes to find you in the morning it is to tell you what you already know from the chart, and you stand in the corridor and the attending asks if you're all right and you say yes because you are — you are functioning — and you understand that being all right and functioning are different things and that this is the first of many times you will understand that.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.addFlag('doc_first_death')
      p.setMem('docFirstDeathFired', true)
    },
  },

  {
    id: 'doc_resource_scarcity',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isDoctor(G) &&
      ['very_low', 'low', 'low_medium'].includes(G.currentCountry?.gdp) &&
      !G.mem?.docResourceFired,
    text: `The medication that this patient needs is not in the hospital. It is not unavailable — it exists somewhere, in a warehouse in the capital or a truck somewhere on a road — but it is not here. You find the workaround, which is what you were not taught and which is the primary skill required to practise medicine in this place. The workaround is less effective. You document it in the notes. The notes go into a system no one has time to read. You do this again in three months and again in six.`,
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.h -= 3
      p.addFlag('doc_resource_shortage')
      p.setMem('docResourceFired', true)
    },
  },

  {
    id: 'doc_the_question',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isDoctor(G) &&
      G.flags.has('doc_first_death') &&
      !G.mem?.docTheQuestionFired,
    text: `The patient asks you directly: am I going to die from this? You know the answer. You have known it for three weeks. The question is whether to tell them the whole answer or a version of it that serves a different purpose — hope, time, the family's ability to prepare, the patient's ability to prepare. You tell them as much of the truth as you can find words for, which is not the same as all of it but is more than you gave the last person who asked. You are learning the specific vocabulary required for this. There is no course.`,
    choices: [
      {
        text: 'Tell them the truth as fully as you can',
        tag: null,
        outcome: `The conversation takes forty minutes. The patient cries. Then they ask about the grandchild's name. You sit with them for another twenty minutes. You are late for the next appointment.`,
        effect: (p) => {
          p.m -= 5
          p.karma += 8
          p.addFlag('doc_tells_truth')
          p.setMem('docTheQuestionFired', true)
        },
      },
      {
        text: 'Give them the prognosis softened — they need hope',
        tag: null,
        outcome: `You soften it. They leave with something to hold onto. You will have to revise it next month, or the month after.`,
        effect: (p) => {
          p.m -= 8
          p.r += 5
          p.setMem('docTheQuestionFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'doc_the_case',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isDoctor(G) &&
      G.age >= 32 &&
      !G.mem?.docTheCaseFired,
    text: `There is a case — there is always one case — that you carry differently from the others. You have treated several hundred patients this year. You remember their faces in the aggregate, a general sense of the work, the patterns and outliers and the satisfactions and losses that constitute a clinical year. But this one patient — their face, the specific result of the test, the moment you understood what it meant — you will be able to retrieve all of this without effort twenty years from now. There is no explanation for why this particular case lodged where it did. There does not need to be.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 3
      p.addFlag('doc_the_case')
      p.setMem('docTheCaseFired', true)
    },
  },

  {
    id: 'doc_colleague_loss',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isDoctor(G) &&
      G.age >= 35 &&
      !G.mem?.docColleagueFired,
    text: `A colleague — someone you trained with, someone who understood what the work was without explanation — dies. The manner of it is not surprising to anyone who works in medicine, which is its own kind of information. At the funeral, a specific kind of silence: the people who knew exactly what the years cost and cannot say it in this room. You drive home after and sit in the car for a while before going inside.`,
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.h -= 4
      p.addFlag('doc_colleague_lost')
      p.setMem('docColleagueFired', true)
    },
  },

  {
    id: 'doc_burnout',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isDoctor(G) &&
      G.age >= 38 &&
      !G.mem?.docBurnoutFired,
    text: `You are sitting with a patient and you notice that you are listening to what they are saying without hearing it in the way that you used to hear it. You hear the diagnostic information and the contextual information and the emotional register of what is being communicated and you respond appropriately. But the thing that used to happen — the sense that this specific person mattered specifically, that their situation was one of the things that made the work worth doing — you notice that it is happening less often and that you have been noticing this for some time without acknowledging it.`,
    choices: [
      {
        text: 'Take leave and address it properly',
        tag: null,
        outcome: `You take six weeks. Some of what returns is the thing you lost. Some of it does not return in the original form.`,
        effect: (p) => {
          p.m += 8
          p.h += 5
          p.w -= 6
          p.addFlag('doc_burnout_addressed')
          p.setMem('docBurnoutFired', true)
        },
      },
      {
        text: 'Keep going — the patients need you and you are still functional',
        tag: null,
        outcome: `You keep going. The distance grows at the rate it was growing. It becomes the background condition of your work.`,
        effect: (p) => {
          p.m -= 10
          p.h -= 5
          p.addFlag('doc_burnout')
          p.setMem('docBurnoutFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'doc_rural_posting',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isDoctor(G) &&
      (G.ruralUrban === 'rural' || ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country?.archetype)) &&
      !G.mem?.docRuralFired,
    text: `The posting covers six hundred square kilometres and a population that has not seen a resident doctor in four years. You are it. The generator fails once a week; you learn to schedule procedures around the fuel truck. The patients who come in are the ones who can afford to come in, which is not all the patients who need to. The ones who cannot come in you see when you go out — and you go out, because the truck is yours and there is nothing else. It is not what you trained for. It is what the training is now for.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.h -= 5
      p.karma += 12
      p.addFlag('doc_rural_posting')
      p.setMem('docRuralFired', true)
    },
  },

  {
    id: 'doc_burnout_long_term',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('doc_burnout') &&
      G.age >= 55 &&
      !G.mem?.docBurnoutEchoFired,
    text: `The clinical distance has been the background condition of your work for twenty years. It is not something you arrived at suddenly; it arrived incrementally, and by the time you noticed it fully it had been there long enough to be structural. You have continued to practise well — the diagnostic quality has not suffered, the care quality has not suffered in the ways that are measured. What has suffered is harder to describe: the sense, present at the beginning, that each patient was a specific person whose situation specifically mattered. This is not the same as indifference. It is the professional adaptation to a level of loss that the species is not built to process repeatedly. You understand this. You wish it were less true.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.e += 3
      p.setMem('docBurnoutEchoFired', true)
    },
  },

  {
    id: 'doc_colleague_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('doc_colleague_lost') &&
      G.age >= 55 &&
      !G.mem?.docColleagueEchoFired,
    text: `You think about them sometimes. Not in a sustained way — the grief was processed, or was processed enough to continue — but in specific moments that the profession shares: a particular kind of silence after a difficult case, the end of a long shift, the conference dinner where people who have known each other for thirty years sit down and do not say the specific things they know about the work. They would have been here. You know what they would have said. Some years their absence is louder than others.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 3
      p.setMem('docColleagueEchoFired', true)
    },
  },

  {
    id: 'doc_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isDoctor(G) &&
      G.age >= 60 &&
      !G.mem?.docLateFired,
    text: `The accounting of a medical life is not done in the number of patients or the diagnoses or the papers or the salary, though all of those were real. It is done in something harder to quantify: the face of the patient who asked you the direct question and got as close to a truthful answer as you could give. The patient whose case you still carry. The colleague you drove home after the funeral. The year in the rural clinic. These are the things. They are not on the CV. They are what you will take with you out of the career when the career ends.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 5
      p.karma += 8
      p.addFlag('doc_late_reckoning')
      p.setMem('docLateFired', true)
      p.legacy += 10
    },
  },

]
