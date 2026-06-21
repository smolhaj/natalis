// Life Skeleton events — 4 guaranteed beats that give every life a narrative arc.
// These are NOT in the random EVENTS pool. They are injected into the queue by tick()
// in gameEngine.js at specific age thresholds (15, 30, 40, 55).
// They require G.desire to fire — if desire was never set, they do not fire.
// They are aware of wound coping (mem.woundCoping) and earlier fork choices.

export const LIFE_SKELETON_EVENTS = [

  // ── FIRST TEST (age 15) ───────────────────────────────────────────────────────
  // The first moment the wound is tested in the world — not yet fully conscious of it.
  // Fires in adolescence when desire is set.
  {
    id: 'ls_first_test',
    phase: 'adolescence',
    weight: 5,
    when: (G) => G.age >= 15 && G.desire && !G.mem?.firstTestDone,
    text: (G) => {
      const d = G.desire
      const texts = {
        prove_worth: `Something happens — a test result, a comparison, a public moment — that makes the old question louder: whether you are enough. You have always had the question. This is the first time the world seems to be asking it back.`,
        belong: `You are in a group of people you want to be part of, and you can feel yourself calculating — what to say, how to stand, whether you belong here or are simply present. The feeling is older than this moment.`,
        be_seen: `Someone is noticed for something you did, or did equally well, or could do better. The injustice of it is minor in the scheme of things. It does not feel minor.`,
        safety: `Something disrupts the order you have been maintaining. The plan fails. The old fear moves through you. You are better at pretending it is not there than you are at it not being there.`,
        connection: `You reach toward someone — in friendship, in confidence, in need — and the reaching goes wrong. The distance that opens is familiar. This is not the first time.`,
        leave_mark: `You make something — a piece of work, an effort, a thing that mattered to you — and nobody notices. The invisibility of it sits on you in a way that feels both disproportionate and exact.`,
        freedom: `A limit arrives — from family, school, circumstance — and the familiar tightening happens. Not frustration only. Something older. The feeling of a cage you did not choose.`,
        redemption: `You fail someone, or witness a failure, or are complicit in one. The weight of it is specific. You will carry it longer than the situation deserves.`,
      }
      return texts[d] ?? `Something in adolescence asks the question your childhood was already asking, only louder.`
    },
    choices: [
      {
        text: 'Push through. Keep going.',
        tag: 'first_test_pushed_through',
        outcome: 'You do not stop. The wound is there but you will not let it stop you. This becomes a pattern.',
        effect: (p) => { p.m -= 4; p.e += 3; p.setMem('firstTestDone', true) },
      },
      {
        text: 'Pull back. Protect yourself.',
        tag: 'first_test_pulled_back',
        outcome: 'You protect yourself. The cost is something you will not count until later.',
        effect: (p) => { p.r += 4; p.setMem('firstTestDone', true) },
      },
      {
        text: 'Find someone to tell.',
        tag: 'first_test_confided',
        outcome: 'You find the words for it. The wound named is slightly less sharp.',
        effect: (p) => { p.m += 3; p.s += 3; p.setMem('firstTestDone', true) },
      },
    ],
    effect: null,
  },

  // ── THE FORK (age 30–34) ──────────────────────────────────────────────────────
  // A genuine crossroads — two real paths, both requiring something.
  {
    id: 'ls_the_fork',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.age >= 30 && G.age <= 34 && G.desire && !G.mem?.theForkDone,
    text: (G) => {
      const d = G.desire
      const coping = G.mem?.woundCoping
      const texts = {
        prove_worth: `You have built something demonstrable by now — a career, a record, a reputation in some small arena. A moment presents itself where you can see two paths: the one that keeps building the proof, and the one that starts asking what the proof is for.`,
        belong: `You have people around you — ${coping === 'collect' ? 'carefully gathered' : 'carefully fitted into'}. A moment presents itself: the path that deepens into these people and this life, and the path that asks whether you have actually been seen in it.`,
        be_seen: `You have made yourself visible in some arena by now. Two paths clarify: the one that goes further in that direction, and the one that trades visibility for something less public and more real.`,
        safety: `The structures you have built are holding. Two paths present themselves: the one that reinforces the safety further, and the one that risks something — deliberately, carefully — while you still have time.`,
        connection: `You have people who are yours. Two paths clarify: the one that goes deeper into these specific ties, and the one that asks what you have left undone in yourself.`,
        leave_mark: `What you have been building is taking shape. Two paths present themselves: the one that completes it, and the one that asks whether it is the right thing to be completing.`,
        freedom: `You are further from the original cage than you have ever been. Two paths clarify: the one that keeps moving, and the one that asks what you would build if you were willing to stay somewhere long enough.`,
        redemption: `The work of repair and atonement has been ongoing. Two paths: the one that continues, and the one that asks when it is enough to have tried.`,
      }
      return texts[d] ?? `You are thirty, and the fork in the path is visible. Both directions are real.`
    },
    choices: [
      {
        text: 'Stay the course. Commit to what you have been building.',
        tag: 'fork_stayed_course',
        outcome: 'You commit. The other path closes, as paths do when you stop looking at them.',
        effect: (p) => { p.m += 3; p.setMem('theForkDone', true) },
      },
      {
        text: 'Change something. The other path is the right one.',
        tag: 'fork_changed_direction',
        outcome: 'You alter the course. Something is lost. Something that could not have been found the other way opens.',
        effect: (p) => { p.r += 5; p.m += 2; p.setMem('theForkDone', true) },
      },
    ],
    effect: null,
  },

  // ── THE COST (age 40–46) ───────────────────────────────────────────────────────
  // The price paid for the path chosen at the fork — or for not choosing.
  {
    id: 'ls_the_cost',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.age >= 40 && G.age <= 46 && G.desire && !G.mem?.theCostDone,
    text: (G) => {
      const d = G.desire
      const forkChoice = G.flags.has('fork_changed_direction') ? 'changed' : 'stayed'
      const texts = {
        prove_worth: forkChoice === 'stayed'
          ? `The proof has accumulated. You have what you worked for. The question that surfaces at forty, quietly, is whether the accumulation has addressed the original doubt. You have a feeling you already know the answer.`
          : `You changed the course. The old ambitions are further away. At forty, you can see what was traded, and what was gained, and you are still working out whether the exchange was fair.`,
        belong: forkChoice === 'stayed'
          ? `You are embedded in people and place. You are known here. At forty, you notice the shape of what the belonging costs — the parts of yourself that got quietly set aside to make the fit work.`
          : `You renegotiated the belonging at some point — chose different rooms, different versions of yourself. The cost at forty is a loneliness specific to someone who chose their isolation.`,
        be_seen: forkChoice === 'stayed'
          ? `You are visible. People know your name in the relevant arenas. At forty you find yourself wondering what the visibility is hiding, and whether you built it partly for that purpose.`
          : `You stepped back from the visibility. At forty, the cost arrives: occasional doubt about whether you gave up too soon, or gave up the wrong thing.`,
        safety: forkChoice === 'stayed'
          ? `The structures held. You are safe, by most definitions. At forty the cost presents itself: the things you did not do because they felt risky, the life slightly smaller than it might have been.`
          : `You took the risk. At forty, you can see the full accounting — what it cost, what it opened, whether it was worth it. The answer changes depending on the day.`,
        connection: forkChoice === 'stayed'
          ? `The people in your life are real. The ties are deep. At forty, the cost is visible: what you deprioritized when you prioritized this.`
          : `You chose yourself at some point, or chose differently. The cost at forty is visible: the connections that did not survive the choice.`,
        leave_mark: forkChoice === 'stayed'
          ? `The thing is taking shape. At forty, the cost of it is visible — the time it took, the other things displaced, the question of whether it is actually good or just done.`
          : `You changed what you were building. At forty, you can see what the change cost: the abandoned project, the years that went into something you did not finish.`,
        freedom: forkChoice === 'stayed'
          ? `You kept moving. The freedom is real. At forty, the cost is visible: the roots not put down, the people left when you left, the thing you might have made if you had stayed somewhere.`
          : `You stayed somewhere, tried to build something. At forty, the cost of the staying is visible — the constraint of it, the way freedom narrows when you are responsible for something.`,
        redemption: forkChoice === 'stayed'
          ? `You have been working at it for years. At forty, you have to look honestly at the ledger: what has been repaired, what has not, whether the debt is actually finite.`
          : `You decided to stop, or to atone differently. At forty the question resurfaces: whether you stopped too soon, or too late, or just right.`,
      }
      return texts[d] ?? `You are forty and the cost of the choices made in your thirties is visible in full.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('theCostDone', true) },
  },

  // ── THE RECKONING (age 55–62) ─────────────────────────────────────────────────
  // Desire vs. life actually lived. The central confrontation.
  {
    id: 'ls_the_reckoning',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.age >= 55 && G.age <= 62 && G.desire && !G.mem?.theReckoningDone,
    text: (G) => {
      const d = G.desire
      const texts = {
        prove_worth: `You have spent a life demonstrating something. At fifty-five, the question arrives with some finality: to whom? The person you were demonstrating to has been gone for years — if they existed at all. The doubt outlasted the demonstration.`,
        belong: `You have been in rooms your whole life, making yourself fit. At fifty-five, the question: did you ever actually belong anywhere, or did you get very good at the performance of it? The honest answer may surprise you.`,
        be_seen: `You have been visible and invisible in the ways available to you. At fifty-five, the question is clearer: what did you want to be seen as, and was any of the seeing ever for that thing?`,
        safety: `The structures held, or they did not. At fifty-five, the accounting: was the safety worth the cost of building it? The threat that drove you — was it as large as it felt?`,
        connection: `At fifty-five, you can look at the connections of a lifetime. Which ones were real. Which ones you built from your own need. What the difference between those two things has meant.`,
        leave_mark: `The mark question resolves itself, at fifty-five, into something smaller and more honest: not what you built for history, but what survives you in the people who knew you. That is the only mark that is actually yours.`,
        freedom: `At fifty-five, you can see the shape of the freedom you built — what it cost, what it enabled, what it closed off. Whether the life that resulted was freer than the one you fled. This is not obvious.`,
        redemption: `The debt question — whatever debt you named it — is at fifty-five either settled or clearly unsettleable. You have made enough, or the making-enough was never the mechanism that was going to work.`,
      }
      return texts[d] ?? `At fifty-five, the life is visible as a whole. Not yet over. Already recognizable.`
    },
    choices: [
      {
        text: 'Make peace with what it was.',
        tag: 'reckoning_peace',
        outcome: 'Not every question gets an answer. The life was the life. You can stop arguing with it.',
        effect: (p) => { p.m += 8; p.karma += 4; p.setMem('theReckoningDone', true) },
      },
      {
        text: 'There is still time to change things.',
        tag: 'reckoning_still_time',
        outcome: 'The account is not closed yet. There are still things that could be different.',
        effect: (p) => { p.r += 4; p.e += 3; p.setMem('theReckoningDone', true) },
      },
    ],
    effect: null,
  },

]
