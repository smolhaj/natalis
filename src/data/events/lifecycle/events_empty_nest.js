// events_empty_nest.js — The arc after children leave home
//
// The triggering event (child_leaves_home, sets empty_nest flag) is in
// events_children_arc.js. What fires next: the house finding a new shape,
// the partnership reconfigured, the late-life return of what the house means.

export const EMPTY_NEST_EVENTS = [

  // ── FIRST YEAR ─────────────────────────────────────────────────────────────

  {
    id: 'en_first_year',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('empty_nest') &&
      G.age >= 44 && G.age <= 58 &&
      !G.mem?.enFirstYear,
    text: `The house has found a different shape. You are eating dinner at a time that suits you. The bathroom schedule is no longer coordinated. You sleep through the night or you do not, but the reason is yours. The things you did automatically for years — the packed lunch, the ride to the practice, the question about homework — have simply stopped, and the space where they were is not empty exactly but different, a space that now has the texture of ordinary evening. You are not sure yet whether to call it loss or return.`,
    choices: [
      {
        text: 'It is, among other things, a relief. You did not expect to say that.',
        tag: null,
        outcome: 'The relief does not cancel the other feelings. You hold both without needing to rank them.',
        effect: (p) => {
          p.m += 5
          p.e += 2
          p.setMem('enFirstYear', true)
        },
      },
      {
        text: 'The house is too quiet. The quiet is not comfortable yet.',
        tag: null,
        outcome: 'It becomes more comfortable, gradually. Not because you stop missing it but because you learn the new shape.',
        effect: (p) => {
          p.m -= 5
          p.r += 5
          p.setMem('enFirstYear', true)
        },
      },
    ],
    effect: null,
  },

  // ── PARTNERED: REDISCOVERY OR DISTANCE ────────────────────────────────────

  {
    id: 'en_partner_rediscovery',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('empty_nest') &&
      G.partner?.alive &&
      G.age >= 46 && G.age <= 60 &&
      !G.mem?.enPartnerRediscovery,
    text: (G) => {
      const name = (G.partner?.name ?? 'your partner').split(' ')[0]
      const q = G.partner?.relationshipQuality ?? 60
      if (q >= 70) {
        return `It is just you and ${name} now, for the first time in decades. You discover that you still have things to say to each other that are not about the children, the schedule, the logistics of a family. There is a meal that is just yours. A weekend where nobody needs to be anywhere. The marriage that ran underneath the parenthood for twenty years is still there.`
      } else if (q >= 40) {
        return `It is just you and ${name} now. The children were the shared project. With the project concluded, the distance between you is more legible than it was when the children were filling the space. This is not a new distance. It is the original distance, finally visible.`
      }
      return `It is just you and ${name} now. The distance was always there. The children were, among other things, a way of not having to look at it directly. Now there is nothing between you and the thing.`
    },
    choices: null,
    effect: (p) => {
      const q = p.partner?.relationshipQuality ?? 60
      if (q >= 70) {
        p.m += 8
        p.updatePartnerRel(5)
      } else if (q >= 40) {
        p.m -= 4
        p.r += 6
      } else {
        p.m -= 8
        p.r += 8
      }
      p.setMem('enPartnerRediscovery', true)
    },
  },

  // ── SOLO: THE HOUSE ALONE ─────────────────────────────────────────────────

  {
    id: 'en_solo_house',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('empty_nest') &&
      !G.partner &&
      G.age >= 46 && G.age <= 60 &&
      !G.mem?.enSoloHouse,
    text: `You raised a family in this house without a partner, or the partnership ended somewhere in the middle, and now you are alone in the space that used to hold the whole apparatus of a family. The quiet is different from the quiet of childlessness — it has a texture, the texture of something that was here and isn't now. You learn it the way you learn a new room: which corners are cold, which sounds are the house settling, which silences are just silence.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.e += 3
      p.setMem('enSoloHouse', true)
    },
  },

  // ── THE ROOM ───────────────────────────────────────────────────────────────

  {
    id: 'en_the_room',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('empty_nest') &&
      G.age >= 48 && G.age <= 62 &&
      !G.mem?.enTheRoom,
    text: `The room that was theirs has become something else, or it has not become something else, which is a decision in itself. A spare room. A study. The same furniture in the same places, which feels like preservation and also like a failure to move on, except that you are not sure you want to move on from this particular thing. You stand in the doorway sometimes. Not with grief exactly. More with the specific awareness of what a room holds after the person who gave it its character has gone somewhere else.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 4
      p.e += 2
      p.setMem('enTheRoom', true)
    },
  },

  // ── GRANDCHILDREN ARRIVE: THE HOUSE FILLS AGAIN ───────────────────────────

  {
    id: 'en_grandchildren_fill_house',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('empty_nest') &&
      G.flags.has('became_grandparent') &&
      G.age >= 58 &&
      !G.mem?.enGrandchildrenFill,
    text: `The house is noisy again on certain weekends. The noise is the same kind of noise — running, a door slammed without malice, something knocked off a counter — but it does not come every day, and when it stops the quiet has a different quality than before. You are the house now. You are the place they come back to. This is a different job from the last job and you are, to your own surprise, not bad at it.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r += 3
      p.setMem('enGrandchildrenFill', true)
    },
  },

  // ── LATE RECKONING ─────────────────────────────────────────────────────────

  {
    id: 'en_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('empty_nest') &&
      G.age >= 68 &&
      !G.mem?.enLateReckoning,
    text: `The years in the house with children — the specific noise, the food volumes, the car keys always in the wrong place, the homework you helped with and the homework you couldn't help with and the conversations that happened at dinner and the ones that happened at midnight and the ones that never happened — have the quality now of a specific light. Not idealised. Just specific. You know you were tired at the time. You know the good parts and the bad parts both. What remains is not the good parts only. It is the wholeness of the time, the weight of it, how much was in it.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m += 5
      p.e += 3
      p.karma += 3
      p.setMem('enLateReckoning', true)
    },
  },

]
