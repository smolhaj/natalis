// What a year of an activity says once its own line has already been said.
//
// An activity chosen every year printed the same sentence every year: one
// American life read "Security accumulates. It is unglamorous and works."
// thirty-three times, and "You go three times a week" twenty-six, because the
// activity layer was the one prose surface outside prose.js. A thing done for
// the twentieth year is not the same thing as the first year, and these are
// written for the twentieth: the habit, not the decision.
//
// Keyed by activity id, then by category as a fallback. Each entry takes G so a
// line can know how long the habit has run (G.mem[`act_count_${id}`]).

const n = (G, id) => G.mem?.[`act_count_${id}`] ?? 0

export const HABIT_PROSE = {
  save: (G) => [
    'You put a little aside again. You no longer notice the not-spending, which is how you know it has become a habit.',
    'The balance is a number you check less often than you used to. It goes one way, slowly.',
    'Somebody asks what you are saving for. You give an answer. It is not the whole answer.',
    'You buy the cheaper one again, and it is fine again.',
    n(G, 'save') >= 10 ? 'Ten years or more of the smaller choice. There is a sum now that would have seemed impossible to you once.' : 'The saving has a rhythm. The rhythm is most of it.',
    G.age > 55 ? 'You save out of habit now more than purpose. The purpose is mostly other people.' : 'You think about the years when there was nothing in reserve, and put a little more aside.',
  ],
  gym: (G) => [
    'The same bench, the same hour. Somebody new is using your machine and you wait.',
    'You know the other regulars by their routines rather than their names.',
    'Some weeks you go because you want to and some because you said you would. Both count.',
    G.age > 50 ? 'The recovery takes two days now instead of one. You adjust the week around it.' : 'You are stronger than you were. It happened too slowly to notice until you notice.',
    'You miss a week, then go back, and the body forgives you faster than you expected.',
  ],
  walk: (G) => [
    'The same route. The dog two gates down knows you now and does not bother to bark.',
    'You walk in weather you would once have stayed in for.',
    'A tree on the route comes down in a storm and for a month the walk is wrong.',
    'You think better walking. You have stopped pretending you do not.',
  ],
  read: (G) => [
    'The pile of books by the bed is not getting shorter. That is not the point of it.',
    'You reread something from years ago and it is a different book, because you are a different reader.',
    'A sentence stays with you for a week. You could not say what the book was about.',
    'You lend a book and do not get it back, and find you do not mind.',
    G.age > 60 ? 'The print is small. You hold it further away and keep going.' : 'You read on the way to things and in the waiting at the things.',
  ],
  drink: (G) => [
    'The first one is the only one you taste.',
    'You know which evenings will go on too long before they start. You go anyway.',
    'Somebody makes a joke about it and you laugh, a beat late.',
    'The mornings are the price. You pay it more often than you used to.',
    n(G, 'drink') >= 8 ? 'It has been years now. It is a part of the week that the week is arranged around.' : 'You tell yourself it is a way to end the day. Some days it is.',
  ],
  volunteer: (G) => [
    'The same hall, the same folding tables. The faces change and the need does not.',
    'Somebody you helped years ago comes back to help. Neither of you mentions it.',
    'Some weeks it is the best thing you do. Some weeks it is only a shift.',
    'You are the one who knows where things are kept now.',
  ],
  family_time: (G) => G.age < 18 ? [
    'You are underfoot, and nobody sends you away.',
    'You help with the thing the adults are doing, badly, and are allowed to.',
    'You sit with the grown-ups longer than you need to, listening.',
  ] : [
    'The same table, the same arguments, the same person who leaves early.',
    'You stay later than you planned. Nobody says anything, which is how you know it was noticed.',
    'The family has its own calendar and you are on it.',
    'You carry a story home from the table that you will tell for years.',
  ],
  study: (G) => [
    'The same desk, later at night than last year.',
    'You understand something now that you only memorised before.',
    'The notes fill another notebook.',
  ],
  attend_religious_service: (G) => [
    'The same seat, more or less. The words arrive before you reach for them.',
    'Somebody is missing from their usual place and you notice before the service starts.',
    'You have heard this reading so many times that you hear it differently now.',
  ],
  meditate: (G) => [
    'The mind wanders. You bring it back. This is the whole of it, and it is not easy.',
    'Some mornings it is twenty minutes of nothing. You sit anyway.',
  ],
}

export const CATEGORY_HABIT_PROSE = {
  body: [
    'You keep at it. The body keeps the account more honestly than you do.',
    'It is a habit now, which is what you wanted and not quite what you expected.',
  ],
  mind: [
    'You keep at it. The year has a shape because of it.',
    'It is less an effort now than a place you go.',
  ],
  social: [
    'You show up again. Showing up turns out to be most of it.',
    'The people are the same and a little different. So are you.',
  ],
  money: [
    'The same decision, made again. It is easier the second time and less interesting.',
    'You do the sum again. It comes out about the same.',
  ],
}

/** Candidate lines for a repeated activity, or null if nothing is authored. */
export function habitLines(activityId, category, G) {
  const own = HABIT_PROSE[activityId]
  if (own) return own(G)
  return CATEGORY_HABIT_PROSE[category] ?? null
}
