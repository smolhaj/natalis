// events_nurse_arc.js — Deep nurse career arc
//
// The nurse exists in careers.js with two events (patient death, pandemic shift).
// These events add the texture those can't: being the person in the room
// when the doctor isn't, learning clinical distance and knowing when you
// learned it, the family at the bedside, the specific weight of accumulated
// years of loss.

const isNurse = (G) => G.career?.id === 'nurse' || G.flags.has('nurse_career')

export const NURSE_ARC_EVENTS = [

  {
    id: 'nur_first_death',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isNurse(G) &&
      !G.mem?.nurFirstDeathFired,
    text: `You are there when it happens. The doctor has been called and has not yet arrived; you are the person in the room. You have been trained for this and the training is accurate — you know what to do and you do it. But knowing what to do and the experience of doing it are not the same thing. Afterwards, in the hallway, you write the time in the notes. A colleague asks how you are. You say fine. You are fine. You understand that fine and the experience you just had can be simultaneously true, and that this simultaneous truth is what the job requires.`,
    choices: null,
    effect: (p) => {
      p.m -= 9
      p.addFlag('nurse_first_death')
      p.setMem('nurFirstDeathFired', true)
    },
  },

  {
    id: 'nur_family_mediation',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isNurse(G) &&
      G.flags.has('nurse_first_death') &&
      !G.mem?.nurFamilyFired,
    text: `The family wants everything done. This is understandable and you understand it. Everything, in this case, means procedures that will extend the physiological processes without the possibility of the outcome the family is hoping for, and this is information that has been communicated to them by the attending and by you and which is real. You become the translator — not of language but of the gap between what medicine can offer and what people need medicine to promise. This is not in the job description. It is most of the job.`,
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.s += 4
      p.addFlag('nurse_family_mediation')
      p.setMem('nurFamilyFired', true)
    },
  },

  {
    id: 'nur_advocate',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isNurse(G) &&
      G.age >= 30 &&
      !G.mem?.nurAdvocateFired,
    text: `You disagree with a treatment decision. You have the clinical knowledge and the observation hours — you know this patient in a way the ward round does not, because you are here for twelve hours and the ward round is here for four minutes. You find the channel: not confrontation, but documentation, escalation through the right route, the specific words that cannot be dismissed without consequence. The decision is revised. You do not receive a formal acknowledgement. You did not expect one.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 8
      p.addFlag('nurse_advocated')
      p.setMem('nurAdvocateFired', true)
    },
  },

  {
    id: 'nur_accumulated_grief',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isNurse(G) &&
      G.age >= 36 &&
      !G.mem?.nurGriefFired,
    text: `The grief is not a single thing. It is accumulated — a weight of individual losses that you processed and filed and moved past and that are nevertheless still there, filed. You know when you developed the clinical distance because you can remember the first time you noticed yourself using it, in the corridor after a death, noting your own efficiency of emotion. The distance is a professional tool and also something that cost you something to build. Both of these are true. You stopped being surprised that both of these are true some years ago.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.h -= 3
      p.r += 6
      p.addFlag('nurse_accumulated_grief')
      p.setMem('nurGriefFired', true)
    },
  },

  {
    id: 'nur_short_staffed',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isNurse(G) &&
      G.age >= 32 &&
      !G.mem?.nurStaffFired,
    text: `The ward is short-staffed. This is not a crisis — it has been the baseline condition for three years. You cover the gap. The gap is your body, your hours, your attention distributed across more patients than the ratio was designed for. You are aware of the risk this creates. You document it. The documentation goes into a system that produces reports that go to committees that produce recommendations that produce no change in the staffing ratio. You continue to cover the gap because the alternative is that no one covers it.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.h -= 6
      p.addFlag('nurse_short_staffed')
      p.setMem('nurStaffFired', true)
    },
  },

  {
    id: 'nur_recognition',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isNurse(G) &&
      G.age >= 35 &&
      !G.mem?.nurRecogFired,
    text: `A family writes. Or comes in. Or tracks you down through the administrative routes and leaves a message with the ward. They have found you specifically — your name, the shift, the date — to say what it meant. Not the treatment. Not the outcome, which was what it was. They mean the specific thing you did in the room at the specific hour, which you may or may not clearly remember. You write back. You say what there is to say. The correspondence is brief. It sits with you for a long time.`,
    choices: null,
    effect: (p) => {
      p.m += 14
      p.karma += 8
      p.addFlag('nurse_recognition_received')
      p.setMem('nurRecogFired', true)
    },
  },

  {
    id: 'nur_grief_late',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('nurse_accumulated_grief') &&
      G.age >= 55 &&
      !G.mem?.nurGriefLateFired,
    text: `Someone asks you, at an event, how you managed it — all those years of loss. They are not in healthcare. They mean the question generously. You give the standard answer, which is true: the clinical distance, the professional tools, the colleagues who understood without needing to be told. What you do not say is that the distance was built at a cost, and the cost is present in a specific kind of tiredness that has nothing to do with physical tiredness, and that some of the faces you thought you had filed are still accessible without effort, and that you stopped being surprised by this some years ago. You say: you find a way. They nod. This is also true.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.e += 3
      p.setMem('nurGriefLateFired', true)
    },
  },

  {
    id: 'nur_retirement',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isNurse(G) &&
      G.age >= 60 &&
      !G.mem?.nurRetirementFired,
    text: `The last shift. You hand over to the night nurse as you have handed over every shift for thirty-one years — the chart, the status of each patient, the note about the family in room four, the things that do not fit the chart but need to be carried forward by a person. You leave the keys. You walk out of the ward and down the corridor and out of the building. The building is the same as always. You are not the same as the person who first walked into it, and you are carrying something out of it that has no weight but is not nothing.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r += 4
      p.addFlag('nurse_retired')
      p.setMem('nurRetirementFired', true)
    },
  },

  {
    id: 'nur_life_accounting',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('nurse_retired') &&
      !G.mem?.nurLifeAccountFired,
    text: `The accounting of a nursing life is done in the hands, which know things the notes don't. It is done in the moment when you disagreed with the treatment decision and found the channel and were right. In the letter from the family. In the face of the patient who died on your first night shift, the time in the notes you wrote in your own handwriting. In the weight of the accumulated years of loss that you processed and filed and still carry. You carried all of this with something that is not strength exactly but is closer to strength than anything else has a word for.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.r -= 6
      p.karma += 10
      p.addFlag('nurse_life_accounted')
      p.setMem('nurLifeAccountFired', true)
      p.legacy += 12
    },
  },

]
