// events_followthrough_52.js
// Midlife and late-life reckoning events for world-event flags that lack
// downstream prose: war_childhood, genocide_survivor, survived_soviet_collapse,
// hyperinflation_survivor, aids_generation, apartheid_generation,
// learned_silence, cold_war_generation, refugee (established).
// These flags don't carry timestamps so guards use age + mem.

export const FOLLOWTHROUGH_52_EVENTS = [

  // ── WAR CHILDHOOD: MIDLIFE RECKONING ──────────────────────────────────────

  {
    id: 'ft52_war_childhood_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('war_childhood') &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.ft52WarChildhoodMidlife,
    text: `The war was part of your childhood the way weather is part of childhood — something that formed your baseline without asking permission. In midlife you can see the formation more clearly. The specific calibrations you make in rooms with strangers. The reading of exits. The evaluation of who is in charge and what they want. These are skills. They were acquired at a cost you couldn't refuse at the time.`,
    choices: [
      {
        text: 'You have mostly made it past. The calibrations run in the background but don\'t lead the life.',
        tag: null,
        outcome: 'The background processes are efficient and quiet. The life they protect is the one you built after.',
        effect: (p) => {
          p.m += 3
          p.r += 3
          p.setMem('ft52WarChildhoodMidlife', true)
        },
      },
      {
        text: 'You have not entirely made it past. The past is an accurate description of the present.',
        tag: null,
        outcome: 'The recognition is itself a form of honesty. Something that has been running unexamined becomes, for a moment, visible.',
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.e += 2
          p.setMem('ft52WarChildhoodMidlife', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft52_war_childhood_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('war_childhood') &&
      G.age >= 60 &&
      !G.mem?.ft52WarChildhoodLate,
    text: `You are old enough now to be the person other people ask about it — grandchildren, journalists, researchers who study what happened. The asking requires you to hold two things at once: what it was and what you have become since. The gap between them is the life. You did not predict you would be the one telling it. You were the child. Now you are the record.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.karma += 3
      p.setMem('ft52WarChildhoodLate', true)
    },
  },

  // ── GENOCIDE SURVIVOR: LATE RECKONING ─────────────────────────────────────

  {
    id: 'ft52_genocide_survivor_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('genocide_survivor') &&
      G.age >= 55 &&
      !G.mem?.ft52GenocieLate,
    text: `The generation that survived is aging now. There are fewer of them than there would have been. Entire family lines stopped in a season or a year. What is left is the configuration of people who had a different quality of luck, or a different position, or made a choice at the right moment. You carry the weight of the number — not as guilt exactly, but as the specific gravity of having been one of the ones who continued.`,
    choices: [
      {
        text: 'You have spoken about it. The speaking was also a form of keeping alive what would otherwise have no witness.',
        tag: null,
        outcome: 'The testimony is documented somewhere — an organization, a family gathering, a school. The record is imperfect and real.',
        effect: (p) => {
          p.karma += 5
          p.r += 3
          p.setMem('ft52GenocieLate', true)
        },
      },
      {
        text: 'You have not spoken about it. The not-speaking was its own form of protection, for you and for the people around you.',
        tag: null,
        outcome: 'The silence carried what the speaking would have required others to receive. That was also a choice about what you owed to whom.',
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.setMem('ft52GenocieLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── SURVIVED SOVIET COLLAPSE: 20-YEAR RECKONING ───────────────────────────

  {
    id: 'ft52_soviet_collapse_20yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('survived_soviet_collapse') &&
      G.currentYear >= 2010 &&
      G.age >= 40 &&
      !G.mem?.ft52SovietCollapse20,
    text: `Twenty years after 1991 and the question of what the collapse meant has sorted itself into several different answers depending on who is asking. The people who got the factories and the mineral licenses say it was liberation. The people who lost their savings and their state sector jobs and their sense of what the future looked like say something else. You are in one of these positions or somewhere between them. The answer is not neutral. It never was.`,
    choices: [
      {
        text: 'You managed. The nineties were brutal and the managing was real.',
        tag: null,
        outcome: 'The managing required compromises you don\'t always discuss. What you built on the other side of the decade is yours.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.setMem('ft52SovietCollapse20', true)
        },
      },
      {
        text: 'You did not get what the collapse was supposed to offer. The promise and the delivery were very different.',
        tag: null,
        outcome: 'This is a common experience in post-Soviet space. The acknowledgment of it doesn\'t repair it. It locates it accurately.',
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.setMem('ft52SovietCollapse20', true)
        },
      },
    ],
    effect: null,
  },

  // ── HYPERINFLATION SURVIVOR: MONEY AND TRUST ──────────────────────────────

  {
    id: 'ft52_hyperinflation_15yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('hyperinflation_survivor') &&
      G.age >= 40 &&
      !G.mem?.ft52Hyperinflation15,
    text: `The hyperinflation era is over and you have rebuilt something. The rebuilding happened and the thing that was rebuilt works differently than what existed before. You do not trust the currency the way people who didn't live through that period trust currency. The distrust is not irrational — it is the correct response to what actually happened. It is also a permanent adjustment to how you move through an economy that others navigate with assumptions you lost the use of.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.setMem('ft52Hyperinflation15', true)
    },
  },

  // ── AIDS GENERATION: SURVIVING WHEN OTHERS DIDN'T ─────────────────────────

  {
    id: 'ft52_aids_generation_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('aids_generation') &&
      G.age >= 45 &&
      !G.mem?.ft52AidsLate,
    text: `The people you knew in the worst years who are not here now. The number is not a figure you calculate — it is a list, a set of faces, a specific quality of absence at particular kinds of gatherings where the people who would have been there are not there. The AIDS epidemic killed people your age in quantities that altered the demographic shape of a generation. You are one of the ones who came through it. That fact sits alongside grief and gratitude in a proportion that doesn't resolve.`,
    choices: [
      {
        text: 'You have done something with the fact of surviving — advocacy, care, naming the names.',
        tag: null,
        outcome: 'The work doesn\'t recover what was lost. It means the losses have a record that didn\'t exist by accident.',
        effect: (p) => {
          p.karma += 5
          p.r += 3
          p.setMem('ft52AidsLate', true)
        },
      },
      {
        text: 'You have lived your life. The living was what there was to do.',
        tag: null,
        outcome: 'The grief is in the living rather than separate from it. You carry the names in the ordinary way — in the spaces that would have been different if they\'d stayed.',
        effect: (p) => {
          p.r += 5
          p.m -= 3
          p.setMem('ft52AidsLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── APARTHEID GENERATION: POST-1994 RECKONING ─────────────────────────────

  {
    id: 'ft52_apartheid_post94',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('apartheid_generation') &&
      G.currentYear >= 2005 &&
      G.age >= 35 &&
      !G.mem?.ft52ApartheidPost94,
    text: `The transformation was real and was also not complete. The legal structure changed. The economic structure changed less. The neighbourhood you grew up in has different demographics now, or not, depending on the neighbourhood. The TRC was a real institution with a real mandate. What it could and couldn't repair is something the country is still sorting out. You are part of a generation that was defined by the thing that ended and has had to find its terms with what came after.`,
    choices: [
      {
        text: 'You have found your position in the new order. It is imperfect and it is yours.',
        tag: null,
        outcome: 'The imperfection is the real thing. The position was not given; it was assembled out of what was possible.',
        effect: (p) => {
          p.m += 3
          p.r += 3
          p.setMem('ft52ApartheidPost94', true)
        },
      },
      {
        text: 'The new order has not fulfilled what it promised. The gap is specific and measurable.',
        tag: null,
        outcome: 'The measurement is correct. The gap between promise and delivery in post-apartheid South Africa has been documented by many people and felt by more. You are in that count.',
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.setMem('ft52ApartheidPost94', true)
        },
      },
    ],
    effect: null,
  },

  // ── LEARNED SILENCE: AFTER THE REGIME ─────────────────────────────────────

  {
    id: 'ft52_learned_silence_free',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('learned_silence') &&
      G.age >= 40 &&
      !G.flags.has('lived_through_authoritarian') &&
      !G.mem?.ft52LearnedSilenceFree,
    text: `The silence you learned under the old regime runs inside you still, in a freer country or a freer era. It is not as simple as deciding to speak — the silence was installed before you could evaluate it, and now it runs as a kind of default, a calculation that happens before the sentence begins. You are in a place where the calculation is no longer necessary. The body has not fully received this information.`,
    choices: [
      {
        text: 'You are learning to undo it. Slowly. In specific rooms where the calculation fires and you let the sentence go anyway.',
        tag: null,
        outcome: 'The undoing is slow and unannounced. No one knows it is happening except you. The sentence that went is the evidence.',
        effect: (p) => {
          p.m += 4
          p.r += 2
          p.setMem('ft52LearnedSilenceFree', true)
        },
      },
      {
        text: 'You are not sure it can be undone. The early installation runs deep.',
        tag: null,
        outcome: 'Perhaps it reshapes rather than undoes. The silence becomes something else: caution, precision, the knowledge that words have weight. That can be a kind of authority.',
        effect: (p) => {
          p.r += 4
          p.e += 2
          p.setMem('ft52LearnedSilenceFree', true)
        },
      },
    ],
    effect: null,
  },

  // ── COLD WAR GENERATION: LATE WITNESS ─────────────────────────────────────

  {
    id: 'ft52_cold_war_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('cold_war_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 65 &&
      !G.mem?.ft52ColdWarLate,
    text: `The world the Cold War organized — the two blocs, the nuclear standoff, the specific quality of living inside the possibility of total annihilation — has been replaced by something else. The replacement is not clearly better. You are old enough to have lived in both structures. The young people around you know the Cold War as history. You know it as the texture of several decades. The two knowledges are not the same knowledge.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft52ColdWarLate', true)
    },
  },

  // ── REFUGEE: ESTABLISHED LIFE RECKONING ───────────────────────────────────

  {
    id: 'ft52_refugee_established',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('refugee') &&
      G.flags.has('resettlement_established') &&
      G.age >= 38 &&
      !G.mem?.ft52RefugeeEstablished,
    text: `You have been established here for long enough that the word refugee is historical rather than current. The legal status may have changed. The children may not know the word. You work and pay rent and have opinions about local politics and in many rooms you are simply a person who lives here. The flight is not a secret but it is also not the first thing said. The specific quality of having built a life on top of that departure is something that lives in the building more than in the story of what came before.`,
    choices: [
      {
        text: 'The building is the better story. You live in it.',
        tag: null,
        outcome: 'The building is real. It sits above everything that made it possible, without requiring everything that made it possible to be told.',
        effect: (p) => {
          p.m += 5
          p.r += 2
          p.setMem('ft52RefugeeEstablished', true)
        },
      },
      {
        text: 'The building sits on top of everything that happened and you feel both at once.',
        tag: null,
        outcome: 'Both things are true and the doubleness is not resolved. The life is yours. The before is also yours. You contain them both.',
        effect: (p) => {
          p.m += 2
          p.r += 4
          p.setMem('ft52RefugeeEstablished', true)
        },
      },
    ],
    effect: null,
  },

  // ── REVOLUTION GENERATION: LATE LIFE ──────────────────────────────────────

  {
    id: 'ft52_revolution_generation_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('revolution_generation') &&
      G.age >= 60 &&
      !G.mem?.ft52RevolutionLate,
    text: `You were part of the revolution, or near it, or formed by it. From this distance you can see the shape of what was possible and what was not — the things the revolution could do and the things it couldn't, or didn't, or chose not to. The people who died for it would not have predicted what it became in several decades. You are one of the people who can report on the prediction and the outcome simultaneously, which is a position that requires honesty about what was gained and what wasn't.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.karma += 2
      p.setMem('ft52RevolutionLate', true)
    },
  },

]
