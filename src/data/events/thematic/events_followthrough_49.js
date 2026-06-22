// events_followthrough_49.js — BUILD 49 remaining: aid convoy event
// Gates on famine_survivor flag. The specific texture of receiving international
// aid: the queue, the categories, the forms, the indignity that coexists with
// survival.

export const FOLLOWTHROUGH_49_EVENTS = [

  // ── AID CONVOY ───────────────────────────────────────────────────────────────

  {
    id: 'fam_aid_convoy',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('famine_survivor') &&
      ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country?.archetype) &&
      !G.mem?.famAidConvoy,
    text: (G) => {
      const isChild = G.age < 14
      if (isChild) {
        return 'The trucks arrive from somewhere that has food. There is a queue. You learn, in the queue, that not everyone gets the same thing — that there are categories, and which category you are placed in depends on your weight, your age, the number of people in your household, a form that someone has to fill in. The man filling the form cannot pronounce your name. He writes something close. You get what you are classified for. You eat it. It is not what you would have chosen if you were choosing.'
      }
      return 'The aid convoy arrives from an organisation with a name in English. There is a queue that begins forming at 4 AM. The distribution has categories — acute malnutrition, moderate, general ration — and a specific protocol for who gets what. A foreign worker with a clipboard asks questions through an interpreter. You answer them. The interpreter uses a different word for what you said. The foreign worker writes what the interpreter said. What gets written is approximately what you described. You receive what you are classified for. The system is, by the evidence in front of you, keeping people alive. This and the other thing are both true at once.'
    },
    choices: null,
    effect: (p) => { p.h += 8; p.m -= 10; p.r += 8; p.addFlag('received_international_aid'); p.setMem('famAidConvoy', true) },
  },

  // ── RECEIVED AID ECHO ──────────────────────────────────────────────────────

  {
    id: 'fam_aid_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('received_international_aid') &&
      G.age >= 30 &&
      !G.mem?.famAidEcho,
    text: 'You see the aid organisation\'s logo on a news report — the same logo that was on the trucks. The news is about the organisation\'s work in a different country now, a different famine. The person being interviewed is an international staff member explaining the situation. The queue you stood in was not a story; you were inside it. The story is always told from outside it. You understand this now in a way you didn\'t then, which is not the same as being reconciled to it.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 5; p.setMem('famAidEcho', true) },
  },

]
