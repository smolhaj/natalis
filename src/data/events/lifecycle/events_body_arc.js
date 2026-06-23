// events_body_arc.js — The body across time
//
// Not illness (events_illness.js), not dying (events_dying_arc.js).
// The ordinary physical passage of time: the back at 38, the glasses at 42,
// the 3am wake at 46, the joints at 52, the stairs at 70.
// Auto-resolve, no choices. Just the body, just time.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const BODY_ARC_EVENTS = [

  // ── THE BACK ──────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_back',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 34 && G.age <= 44 &&
      !G.mem?.bodyArcBack,
    text: pick([
      `Your back goes. Not dramatically — no disc, no surgery, just a particular movement on a Tuesday morning that produces a consequence that lasts four days. You treat it with the assumption that it will resolve, because it always has. It does resolve. But it takes longer than it used to. You file this away.`,
      `Something in the lower back. A familiar position — reaching for something, getting out of the car — that has been neutral your whole life and is now, apparently, not neutral. You treat it with rest and with the specific competence of someone who has managed their body until now and expects to continue doing so. Largely this is correct.`,
      `The back. You have heard people talk about their backs for years. You understand now that they were not complaining — they were describing a categorical change in the relationship between themselves and the physical world.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('bodyArcBack', true) },
  },

  // ── METABOLISM ────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_metabolism',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 37 && G.age <= 47 &&
      !G.mem?.bodyArcMetabolism,
    text: pick([
      `You eat the same things you have always eaten. Something about the results has changed. Not dramatically — the change is slow enough to be deniable for a long time. But you have been doing the arithmetic and the arithmetic has changed.`,
      `The body's economy has shifted. The same inputs are producing different outputs. You adjust. Not dramatically — small recalibrations in what you eat and when, the kind of negotiation that is too minor to mention but that occupies a portion of your attention it didn't before.`,
      `You are not heavy. You are heavier than you were. The difference is not the weight — the difference is that you used to not think about it, and now you do, which is its own kind of change.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 1; p.setMem('bodyArcMetabolism', true) },
  },

  // ── READING GLASSES ───────────────────────────────────────────────────────────

  {
    id: 'body_arc_glasses',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 40 && G.age <= 50 &&
      !G.mem?.bodyArcGlasses,
    text: pick([
      `You hold the thing further away and then slightly further and then you are at the end of your arm. An optician tells you this is entirely normal. The word *normal* does not help with the sensation of something having changed.`,
      `The reading glasses sit on the nightstand. You did not anticipate how much of your identity was attached to not needing them. The attachment is minor and slightly ridiculous. You notice it anyway.`,
      `The text that used to be text is now something you need to account for. A new piece of equipment. You leave them in the wrong room regularly for the first year and then muscle memory takes over and they become simply a thing you carry.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('bodyArcGlasses', true) },
  },

  // ── THE 3AM WAKE ──────────────────────────────────────────────────────────────

  {
    id: 'body_arc_3am',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 43 && G.age <= 54 &&
      !G.mem?.bodyArc3am,
    text: pick([
      `You wake at 3am and do not go back to sleep for two hours. This happens once and then again and then you realize it is a pattern now, a consistent feature of the night rather than an anomaly in it. The 3am hour has a particular quality — the thoughts that arrive in it are not necessarily worse than daytime thoughts, but they have no competition.`,
      `The problem is not falling asleep. The problem is the waking at a specific hour in the middle of the night with a clarity that feels wrong for the time, and the subsequent difficulty returning to the state you were just in. The body's sleep architecture has apparently revised itself without consulting you.`,
      `You lie awake at 3am doing nothing in particular. The mind finds things to do in the absence of guidance. Most of them are not useful. You have learned not to check your phone because the light makes it worse. You lie there instead, in the dark, in the particular company of 3am, which is a company everyone will eventually know.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('bodyArc3am', true) },
  },

  // ── A DIFFERENT TIREDNESS ─────────────────────────────────────────────────────

  {
    id: 'body_arc_tired',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 46 && G.age <= 56 &&
      !G.mem?.bodyArcTired,
    text: pick([
      `It is not fatigue in the way fatigue used to work — not the tiredness of exertion that sleep resolves. It is something more ambient, a tiredness that is present in the background of ordinary days without a clear cause and without a clear solution. You are not sick. This is just the body at this age.`,
      `The energy question has changed. There is less of it by default and the recovery after spending it is slower. This is a fact about the world now, the way rain is a fact about the world — manageable, requiring adjustment, not going anywhere.`,
      `You used to be able to push through. The pushing through still works but the cost is different — it takes two days to recover what used to cost one evening. You recalibrate. What you are willing to spend energy on changes. This is not loss exactly. It is more like editing.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('bodyArcTired', true) },
  },

  // ── JOINTS ────────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_joints',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 50 && G.age <= 60 &&
      !G.mem?.bodyArcJoints,
    text: pick([
      `The body makes sounds now that it did not used to make. Getting up from the floor. Turning quickly. The sounds are not painful — they are just sounds, the new ambient audio of movement. You are made of something that has been used for fifty years and this is apparently what that sounds like.`,
      `The knees. Not an injury, not a diagnosis — just a general reluctance at certain angles, a preference for stairs over deep squats, a negotiation with the terrain that was not previously necessary. You make the adjustments. They are small. They accumulate.`,
      `Something has happened to the relationship between you and the ground. Standing from seated requires a beat now. The hip, the knee, the lower back — all fine, technically, just less frictionless than they were. You pace yourself differently on hills. Nobody who knows you would notice.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('bodyArcJoints', true) },
  },

  // ── RECOVERY TIME ─────────────────────────────────────────────────────────────

  {
    id: 'body_arc_recovery',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 54 && G.age <= 64 &&
      !G.mem?.bodyArcRecovery,
    text: pick([
      `You overdo it on a Saturday — physical work, a long walk, too many hours of something — and the Sunday is different than Saturday-recovery used to be. The math has changed. You are more careful now about what you spend and when, not from weakness but from accounting.`,
      `You get a cold and it lasts ten days. You remember when a cold lasted three. The immune system is still doing its job — it just does it at a different pace than it used to, and the body accepts the disruption less gracefully than it did at thirty.`,
      `A minor thing — a sprain, a pulled muscle, a two-day illness — takes longer to resolve than it should by your previous experience. You are revising the expected timelines. The revision is accurate. The body has simply shifted its idea of what counts as fast.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('bodyArcRecovery', true) },
  },

  // ── THE HANDS ─────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_hands',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 58 && G.age <= 70 &&
      !G.mem?.bodyArcHands,
    text: pick([
      `You look at your hands and see your mother's hands, or your father's hands — the specific topography of aged skin, the prominence of vein and tendon that was invisible at thirty. The hands are the most honest part of the body. They show everything.`,
      `The hands have changed texture. Not damaged — this is not injury. Just the slow renegotiation of the skin's relationship with the architecture underneath. You notice it when you write, when you hold something small. These are the hands that will do the rest of the work.`,
      `Small jars are occasionally a problem. The grip is still there. The strength is still there. Something in the fine control is different — a small margin of imprecision where there used to be none. You adapt. You open the jar differently, or you ask someone. These are minor logistical adjustments with no existential content.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 1; p.r += 2; p.setMem('bodyArcHands', true) },
  },

  // ── COLD DIFFERENTLY ──────────────────────────────────────────────────────────

  {
    id: 'body_arc_cold',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 60 && G.age <= 72 &&
      !G.mem?.bodyArcCold,
    text: pick([
      `You are cold in rooms that were not cold before. The thermostat has not changed. The building has not changed. The body has revised its baseline and the rooms are now noticeably cooler than they were. You add layers. You put the jumper on earlier in the year. These are not complaints — just facts of the physical world.`,
      `The cold gets in differently now. Not unbearably — nothing dramatic — but the bones seem to register it directly in a way that younger skin did not. You sit closer to the heat. You understand now why the old people in your memory always did the same.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 1; p.setMem('bodyArcCold', true) },
  },

  // ── THE PACE ──────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_pace',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 63 && G.age <= 75 &&
      !G.mem?.bodyArcPace,
    text: pick([
      `Your natural pace has settled into something slower than it was. Not a limp, not a disability — just a different default speed. People on pavements are faster now. You let them pass. You do not mind. The hurry that used to be your basic mode of moving through space has become optional in a way it never was before.`,
      `You move through the world at a pace that has nothing to apologise for and is nonetheless slower than it was. The stairs take a beat. The walk from the car takes a beat. Nothing is urgent enough to override the body's preferred tempo. This, you suspect, is information.`,
      `You are not slow. You are not the person who blocks the pavement. You are simply different from the person who used to run for trains without thinking. The running for trains was not a choice — it was just the body's automatic response. The pause before the stairs is also not a choice. It is the same kind of automatic.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 1; p.r += 2; p.setMem('bodyArcPace', true) },
  },

  // ── STAIRS ────────────────────────────────────────────────────────────────────

  {
    id: 'body_arc_stairs',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 68 && G.age <= 78 &&
      !G.mem?.bodyArcStairs,
    text: pick([
      `Stairs have become a thing you plan for. Not a problem — just a factor. You take the lift when it is available. You take the stairs when it is not, but you take them at a pace that is honest about what stairs cost you now. The honesty is not defeat. It is just accuracy.`,
      `The body has developed opinions about terrain that it did not used to have. Cobblestones. Uneven ground. The specific micro-adjustments of an uncertain surface. None of this is beyond you. All of it is on your radar in a way that it was not at fifty.`,
      `You look at a flight of stairs and you see a flight of stairs and also you see the way the handrail is positioned, whether there is a rest point halfway, what kind of floor is at the bottom. This is not anxiety. It is the practical intelligence of a person who has learned to read terrain.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 2; p.r += 2; p.setMem('bodyArcStairs', true) },
  },

  // ── THE BODY AS RECORD ────────────────────────────────────────────────────────

  {
    id: 'body_arc_inventory',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 72 &&
      !G.mem?.bodyArcInventory,
    text: pick([
      `The body is a record. Not a complaint — a record. The knee that was strained at thirty, the back surgery if there was one, the shoulder that never fully returned from whatever happened to it in your fifties. The scars you can see and the ones that resolved invisibly. The body holds the history of having lived in it. You are reading the archive.`,
      `At some point the body stops being transparent — the vehicle that carries you through the day without requiring attention — and becomes present, a fact to be accounted for in the planning of things. You have made your peace with this. The body is still doing everything it needs to do. It just does it as the thing it is, rather than the thing you used not to notice.`,
      `You take stock. The knees. The back. The vision. The hearing, if it is going. The heart, which the doctor is satisfied with. The sum of what is working and what has shifted and what has simply changed register. You are operational. You are not what you were. Both of these are true and neither cancels the other.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('bodyArcInventory', true) },
  },

]
