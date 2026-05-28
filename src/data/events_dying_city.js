// The dying mid-city arc. Two parallel sequences with choice arcs:
//   Rust Belt (Detroit + Youngstown): deindustrialization 1977–2005
//   Post-Soviet urban decline: factory economy collapse 1991–2005
//
// Each arc sequences via G.mem keys. The leave/stay choice gates later events.
// "Leave" sets 'left_dying_city' flag but does not force-relocate — player uses Move.

// ── RUST BELT (Detroit + Youngstown) ─────────────────────────────────────────────

const RUST_BELT_PLACES = new Set(['us_detroit', 'us_small_town'])

// ── POST-SOVIET URBAN DECLINE ─────────────────────────────────────────────────────

// Fires in any post_soviet urban place except major capitals
// (characters in Moscow get the kiosk-economy events in events_cities.js instead)
const POST_SOVIET_MAJOR_CAPITALS = new Set(['ru_moscow', 'ru_spb', 'ua_kyiv', 'pl_warsaw'])

export const DYING_CITY_EVENTS = [

  // ── RUST BELT ARC ─────────────────────────────────────────────────────────────

  {
    id: 'rustbelt_closure_announcement',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      RUST_BELT_PLACES.has(G.place?.id) &&
      G.currentYear >= 1977 && G.currentYear <= 2005 &&
      G.age >= 22 &&
      !G.mem?.rustbeltAnnouncedYear,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      if (G.place?.id === 'us_small_town') return `The Youngstown Sheet & Tube mill is closing. The notice went up on Tuesday — not posted, stapled to the bulletin board in the break room. Five thousand jobs. The plant has been here since 1900. There is a meeting at the union hall on Thursday that everyone agrees to attend, and which will not change anything.`
      return `The Fisher Body plant is closing. Ford's laying off eight thousand at the River Rouge complex. The paper says it is temporary, which is what they say. The city has heard this before, in smaller doses. This is not a smaller dose.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.setMem('rustbeltAnnouncedYear', true) },
  },

  {
    id: 'rustbelt_neighborhood_decay',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      RUST_BELT_PLACES.has(G.place?.id) &&
      G.mem?.rustbeltAnnouncedYear &&
      !G.mem?.rustbeltDecaySeen,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `The house next to yours has been empty for eight months. The windows are boards now — whoever owned it left in a hurry, or slowly, or in the way that people leave when they have stopped believing the place will recover. A second house on the block went last spring. The city is talking about demolition, which is what they do with houses that no longer have people in them. The city has a lot of demolition to discuss.`
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 1; p.setMem('rustbeltDecaySeen', true) },
  },

  {
    id: 'rustbelt_friend_gone',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      RUST_BELT_PLACES.has(G.place?.id) &&
      G.mem?.rustbeltDecaySeen &&
      !G.mem?.rustbeltFriendGone,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `Your friend Mike called from Columbus — or Pittsburgh, or wherever it was. He found something in manufacturing there, or near there. The pay is comparable, he says, and the drive to work is twelve minutes. He says you should look. He says it like you have not been thinking about it.`
    },
    choices: [
      {
        text: 'Tell him you are glad he found something. Keep in touch.',
        tag: null,
        outcome: 'The calls come once a month, then once a season. He has a different life now. You are still here.',
        effect: (p) => { p.m -= 3; p.setMem('rustbeltFriendGone', true) },
      },
      {
        text: 'Ask him to send you the job listings.',
        tag: 'exploring_leaving',
        outcome: 'He sends three listings. You look at them. You do not apply immediately. The listings stay in your inbox.',
        effect: (p) => { p.m += 2; p.addFlag('exploring_leaving'); p.setMem('rustbeltFriendGone', true) },
      },
    ],
  },

  {
    id: 'rustbelt_community_meeting',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      RUST_BELT_PLACES.has(G.place?.id) &&
      G.mem?.rustbeltFriendGone &&
      !G.mem?.rustbeltMeetingDone,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `There is a meeting at the community center — the city council, some local business owners, a representative from the regional development authority. The plan is urban gardens and a new arts district. Someone in the back row says that arts districts are for people who already have money, and several people clap. Someone else says the alternative is nothing. The applause for the alternative is quieter.`
    },
    choices: [
      {
        text: 'Get involved. This city is worth fighting for.',
        tag: 'rust_belt_stayer',
        outcome: 'You join the planning committee. The work is slow and the results are not guaranteed and you are not sorry you stayed.',
        effect: (p) => { p.m += 4; p.s += 3; p.karma += 5; p.addFlag('rust_belt_stayer'); p.setMem('rustbeltMeetingDone', true) },
      },
      {
        text: 'Watch, and then go home. The meeting changes nothing.',
        tag: null,
        outcome: 'You watch. You go home. The city continues to change without you, which is different from not changing.',
        effect: (p) => { p.m -= 3; p.setMem('rustbeltMeetingDone', true) },
      },
    ],
  },

  {
    id: 'rustbelt_the_decision',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      RUST_BELT_PLACES.has(G.place?.id) &&
      G.mem?.rustbeltMeetingDone &&
      !G.mem?.rustbeltDecided,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `There is a job offer in a city that is not ${city}. The pay is real. The commute is nothing. You have been thinking about it for two weeks, which is longer than you usually think about anything. Everyone you know who is still here has thought about this. Half of them are gone. The half that stayed, you have asked what kept them. The answers were not always clear even to them.`
    },
    choices: [
      {
        text: 'Take the job. Go.',
        tag: 'left_dying_city',
        outcome: `You leave. The house sells for less than you paid. The city does not hold it against you — it has been releasing people for twenty years and has stopped expecting them to stay. You do not look back from the highway, and then you do.`,
        effect: (p) => { p.m += 5; p.mo += 3000; p.addFlag('left_dying_city'); p.setMem('rustbeltDecided', true) },
      },
      {
        text: 'Stay. This is your place.',
        tag: 'rust_belt_stayer',
        outcome: "You turn the offer down. People ask why, and you give different answers at different times. The real answer is that some places are not just addresses. You are still working on whether that is wisdom or stubbornness.",
        effect: (p) => { p.m += 6; p.karma += 4; p.addFlag('rust_belt_stayer'); p.setMem('rustbeltDecided', true) },
      },
    ],
  },

  {
    id: 'rustbelt_return_visit',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('left_dying_city') &&
      G.currentCountry?.name === 'United States' &&
      !G.mem?.rustbeltReturnVisit,
    text: () =>
      `You drive back through the city you left. The neighborhood you grew up in has two occupied houses on the block. The third is being turned into a community garden by people who were not born yet when you left. The school you attended is boarded. The diner where you ate after games is a vacant lot. A young woman is photographing the murals on the remaining buildings. She says the city is "emerging." You do not know what to say. You drive home.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 4; p.setMem('rustbeltReturnVisit', true) },
  },

  // ── POST-SOVIET URBAN DECLINE ARC ─────────────────────────────────────────────

  {
    id: 'postsoviet_factory_silent',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.archetype === 'post_soviet' &&
      G.place?.type === 'urban' &&
      !POST_SOVIET_MAJOR_CAPITALS.has(G.place?.id) &&
      G.currentYear >= 1991 && G.currentYear <= 1998 &&
      !G.mem?.postsovietFactoryGone,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      const cn = G.currentCountry?.name
      if (cn === 'Russia') return `The textile mill that has been operating since 1929 has stopped taking orders. The machines are still there — you can see them through the fence. The workers were told to wait at home and continue to receive partial wages, which stopped in March. Three hundred families. The regional administrator has not returned calls since January.`
      if (cn === 'Ukraine' || cn === 'Romania' || cn === 'Bulgaria') return `The factory did not announce it was closing. It simply slowed — orders fell, then stopped, then the manager stopped coming in. The last shift worked on a Tuesday. On Wednesday no one came and no one told them not to. The building still has the banner from the 1989 plan-completion celebration. No one has taken it down.`
      return `The largest employer in ${city} — the factory that organized the schools, the housing blocks, the social clubs — has received no orders this quarter, and none are expected. The word "privatization" appears in the newspaper. No one knows what it will mean in practice. The practical meaning is becoming clearer.`
    },
    choices: null,
    effect: (p) => { p.m -= 7; p.mo -= 500; p.setMem('postsovietFactoryGone', true) },
  },

  {
    id: 'postsoviet_brain_drain',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.archetype === 'post_soviet' &&
      G.place?.type === 'urban' &&
      !POST_SOVIET_MAJOR_CAPITALS.has(G.place?.id) &&
      G.mem?.postsovietFactoryGone &&
      !G.mem?.postsovietBrainDrainSeen,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `At the train station on a Friday evening, you count four families you recognize. The Petrovs with the two boys, Sergei from the institute, Natasha who taught mathematics at School Number Four. They are going to Moscow, or Kyiv, or Berlin, or anywhere that is not here. The platform has a specific feeling — too many suitcases, children who are not old enough to know what leaving means yet. The train fills. The platform empties. The platform is always emptying now.`
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('postsovietBrainDrainSeen', true) },
  },

  {
    id: 'postsoviet_vodka_institution',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.archetype === 'post_soviet' &&
      G.place?.type === 'urban' &&
      !POST_SOVIET_MAJOR_CAPITALS.has(G.place?.id) &&
      G.mem?.postsovietBrainDrainSeen &&
      !G.mem?.postsovietVodkaMoment,
    text: () =>
      `The men who used to work the shift together still meet — not at the factory but at Volodya's kitchen, or the bench near the park. They started meeting once a week, then every evening, because there is nowhere else to be. The vodka is the cheapest brand now. Nobody talks about the factory directly. They talk about football, about what the radio says, about Volodya's son who is in Moscow now, about how winter is coming early. The vodka is not the problem, someone says. The vodka is just there.`,
    choices: [
      {
        text: 'Sit with them. You understand what the evenings are for.',
        tag: null,
        outcome: 'You become a regular. The evenings are warm in a way that the days are not. It is not a sustainable warmth.',
        effect: (p) => { p.m += 3; p.h -= 4; p.setMem('postsovietVodkaMoment', true) },
      },
      {
        text: 'Stay away. You know where that path goes.',
        tag: null,
        outcome: 'You find other ways to fill the evenings — the library still operates, you have a project, you start something. It is harder than it sounds and you manage.',
        effect: (p) => { p.m -= 2; p.h += 3; p.e += 2; p.setMem('postsovietVodkaMoment', true) },
      },
    ],
  },

  {
    id: 'postsoviet_stay_or_go',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.archetype === 'post_soviet' &&
      G.place?.type === 'urban' &&
      !POST_SOVIET_MAJOR_CAPITALS.has(G.place?.id) &&
      G.mem?.postsovietVodkaMoment &&
      !G.mem?.postsovietDecided,
    text: (G) => {
      const city = G.place?.name ?? 'here'
      const cn = G.currentCountry?.name
      const dest = (cn === 'Russia') ? 'Moscow' : (cn === 'Ukraine') ? 'Kyiv' : (cn === 'Poland' || cn === 'Romania' || cn === 'Bulgaria') ? 'the West' : 'the capital'
      return `The city has shed a third of its population in four years. The schools are merging, the clinic is down to two doctors, the bus to the station runs twice a day instead of six. There is work in ${dest} — not guaranteed, not what you trained for, but work. Your parents are here. Your parents will not be here forever. You are thirty-seven years old and the question is now.`
    },
    choices: [
      {
        text: 'Go. The city cannot offer what you need anymore.',
        tag: 'left_dying_city',
        outcome: `You take the train. The apartment you leave is rented to a couple from the next town who have even fewer options. In the capital you sleep on a cousin's couch for three months. It is not easy and it is not home and it is forward.`,
        effect: (p) => { p.m += 4; p.addFlag('left_dying_city'); p.addFlag('post_soviet_migrant'); p.setMem('postsovietDecided', true) },
      },
      {
        text: 'Stay. Someone has to.',
        tag: 'postsoviet_stayer',
        outcome: "The city that emerges will not be the city that was. You accept this. There are still people here — fewer, different, but here. You become one of the people that the place is built around, and this turns out to be something.",
        effect: (p) => { p.m += 5; p.karma += 6; p.addFlag('postsoviet_stayer'); p.setMem('postsovietDecided', true) },
      },
    ],
  },

  {
    id: 'postsoviet_late_reflection',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.currentCountry?.archetype === 'post_soviet' &&
      G.mem?.postsovietDecided &&
      !G.mem?.postsovietLateReflection,
    text: (G) => {
      const stayed = G.flags.has('postsoviet_stayer')
      const left = G.flags.has('left_dying_city') || G.flags.has('post_soviet_migrant')
      if (stayed) return `The city has stabilized — not recovered, stabilized. There is a new supermarket where the mill was. The school that was going to close is still open, smaller. Young people from the capital come for weekends because the rent is low. You know this city the way you know your own hands. It is not what it was. Nothing is what it was. You are still here.`
      return `You come back once a year, around the holidays. The city you left and the city you return to are not the same city. The city you carry in memory is a third city that exists nowhere. Your parents' house still stands. You sit in it for a few days and then you go back to where you live now, which is also home, in the way that a second home is a different word for the same feeling.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('postsovietLateReflection', true) },
  },
]
