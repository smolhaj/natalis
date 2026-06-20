// events_cults.js — High-control religion and cult arc (BUILD 24)
// The religion arcs cover faith and doubt. This covers a different experience:
// a high-control religious environment where leaving costs you everything.
//
// Two entry tracks:
//   Born in: childhood inside a congregation where the social world and the doctrinal
//     world are identical. The restrictions are not experienced as restrictions because
//     you have not known anything else.
//   Convert: recruited as an adult during a moment of need or searching. The specific
//     sequence — the warmth, the community, the gradual escalation of demands.
//
// The shunning mechanic: when you leave, you lose every friend and often your family.
// Not metaphorically. Literally: they stop answering the phone.
//
// The re-entry problem: the ordinary social skills of secular life — how to make friends
// without a congregational framework, how to date, how to navigate disagreement — were
// never taught. You are starting from scratch at thirty-five.
//
// Events are written without naming specific organizations. Readers inside the experience
// will recognize the specifics. Readers outside do not need a label.

const HCR_COUNTRIES = (G) =>
  ['United States', 'Brazil', 'Nigeria', 'Mexico', 'Philippines',
   'Zambia', 'United Kingdom', 'Italy', 'Germany', 'South Korea'].includes(
    G.currentCountry?.name || G.character.country?.name
  )

const HCR_CHRISTIAN = (G) =>
  ['christian_protestant', 'christian_evangelical', 'christian_catholic'].includes(G.religion)

const FEMALE = (G) => G.character.gender === 'female'

export const CULT_EVENTS = [

  // ── BORN IN: THE CONGREGATION CHILDHOOD ──────────────────────────────────────
  // Two meetings per week. No birthday parties. No blood transfusions.
  // The card in your wallet since you were old enough to sign it.
  // The restrictions are not restrictions when you have not known anything else.

  {
    id: 'hcr_childhood_congregation',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      HCR_CHRISTIAN(G) &&
      HCR_COUNTRIES(G) &&
      G.age >= 9 && G.age <= 15 &&
      !G.flags.has('hcr_born_in') &&
      !G.mem?.hcrChild,
    text: 'Two meetings per week — one in the middle of the week, one on Sunday. You know the songs and the responses and which section of the handbook applies to which situation. You know that blood is sacred and not to be taken into the body and that a card expressing this is in your wallet now that you are old enough to sign one. You have never had a birthday party. You have not thought about this as something you lack because absence is only absence when you know what is missing. The people in the congregation are your people. You have known them your whole life.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.addFlag('hcr_born_in'); p.addFlag('hcr_member'); p.setMem('hcrChild', true) },
  },

  // ── ADULT CONVERT: THE WARM ROOM ──────────────────────────────────────────────
  // The first contact. Not as a recruiting target — as a person.
  // They remembered your name the second time. The food was good.
  // The answers were very clear.

  {
    id: 'hcr_adult_convert',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      !G.flags.has('hcr_member') &&
      !G.flags.has('devout') &&
      G.age >= 18 && G.age <= 35 &&
      (G.flags.has('faith_crisis') || G.flags.has('lost_faith') || !G.partner || G.flags.has('lost_parent_young')) &&
      !G.mem?.hcrConvert,
    text: 'The door knocked at a moment when you were available to it — between things, or freshly arrived somewhere, or recently without the relationships that used to organise your time. They were welcoming in a specific way: not generic, but detailed. They remembered things you said. There was food. They had answers to questions you had been carrying. The answers were very clear, which was the thing you did not know you were looking for. You went back.',
    choices: [
      {
        text: 'You keep going. The community is real. The clarity is real.',
        tag: 'join',
        outcome: 'The study deepens. The community deepens with it. Your social world is beginning to reorganise around this.',
        effect: (p) => { p.m += 10; p.s += 3; p.addFlag('hcr_member'); p.addFlag('hcr_convert'); p.setMem('hcrConvert', true) },
      },
      {
        text: 'You step back. Something about the answers is too clear.',
        tag: 'decline',
        outcome: 'You remember the warmth for a while. The questions find other containers eventually.',
        effect: (p) => { p.m += 2; p.setMem('hcrConvert', true) },
      },
    ],
    effect: null,
  },

  // ── THE COMMUNITY BECOMES THE WORLD ──────────────────────────────────────────
  // The gradual replacement of outside relationships with inside ones.
  // This is presented as a blessing; it is also a structure.

  {
    id: 'hcr_community_deepens',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('hcr_member') &&
      G.age >= 14 && G.age <= 35 &&
      !G.mem?.hcrDeepens,
    text: 'Your social world has reorganised. The people you spend time with are, almost entirely, members of the congregation. The doctrine explains this as natural — you are spending time with people who share your values, which is what everyone does — and you have noticed that the explanation arrives before the noticing, which means you do not quite form the thought. Outside relationships have become complicated in a way that inside ones are not. Outside friendships require explanations, hedges, silences about what you believe. Inside ones do not.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.addFlag('hcr_social_reorganised'); p.setMem('hcrDeepens', true) },
  },

  // ── ESCALATING DEMANDS ───────────────────────────────────────────────────────
  // Field service hours. Financial contributions. The request to step back from
  // a career or education that conflicts with the end-times expectation.

  {
    id: 'hcr_demands_escalate',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('hcr_social_reorganised') &&
      G.age >= 17 && G.age <= 40 &&
      !G.mem?.hcrDemands,
    text: 'The elder suggests, gently, that university might not be the best use of the time before the end comes. Or that the job you are considering will make it harder to prioritise the congregation\'s needs. Or that your financial contribution, while appreciated, could be larger given what you earn. Each request arrives framed as care, as concern for your spiritual health. You have developed a way of receiving requests like this that does not require naming them as what they are.',
    choices: [
      {
        text: 'You comply. The congregation knows what is right better than you do right now.',
        tag: 'comply',
        outcome: 'The compliance costs something concrete — the degree, the job, the money. The spiritual clarity it is supposed to produce arrives partially.',
        effect: (p) => { p.m -= 4; p.e -= 5; p.r += 5; p.mo -= 500; p.addFlag('hcr_demands_met'); p.setMem('hcrDemands', true) },
      },
      {
        text: 'You push back quietly. There must be a way to do both.',
        tag: 'resist',
        outcome: 'The pushback is noted. You are spoken to with extra attention, which is not entirely comfortable.',
        effect: (p) => { p.r += 6; p.addFlag('hcr_first_doubt_internal'); p.setMem('hcrDemands', true) },
      },
    ],
    effect: null,
  },

  // ── THE MEDICAL CRISIS ────────────────────────────────────────────────────────
  // The doctrine on blood is specific and documented. In a medical emergency,
  // the card in your wallet becomes operative. Courts sometimes intervene.
  // This event fires differently depending on whether it's you or your child.

  {
    id: 'hcr_blood_crisis',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('hcr_member') &&
      G.age >= 16 && G.age <= 50 &&
      G.currentYear >= 1960 &&
      !G.mem?.hcrBlood,
    text: (G) => G.children && G.children.length > 0
      ? 'Your child needs surgery. The surgeon says that without blood products the risk is significantly higher. You have the card. The congregation elder is at the hospital within the hour to support you in upholding it. The hospital has applied to the court for an override, which is standard procedure when the patient is a minor. You are being asked to wait outside while they decide.'
      : 'You are losing blood. The surgeon explains what is needed. You show the card. The card is laminated and signed and says, in clear language, that you refuse blood products under any circumstances. The surgeon explains that this could mean your death. You understand this. The card was signed with full understanding.',
    choices: [
      {
        text: 'Uphold the refusal. This is what you believe, what you signed.',
        tag: 'uphold',
        outcome: 'The crisis resolves — through alternative treatments, or with worse medical outcomes than the transfusion would have produced. You have upheld your belief. The cost of upholding it is now concrete.',
        effect: (p) => { p.h -= 8; p.m -= 5; p.r += 8; p.addFlag('hcr_blood_refused'); p.setMem('hcrBlood', true) },
      },
      {
        text: 'Accept the treatment. The doctrine is one thing; this is real.',
        tag: 'accept',
        outcome: 'The blood is administered. Medically, it was the right decision. The congregation will hear about this. The hearing will determine consequences.',
        effect: (p) => { p.h += 5; p.m -= 8; p.r += 6; p.addFlag('hcr_doctrine_broken'); p.setMem('hcrBlood', true) },
      },
    ],
    effect: null,
  },

  // ── THE JUDICIAL COMMITTEE ───────────────────────────────────────────────────
  // Three elders. A back room in the Kingdom Hall.
  // A question about doctrine, or conduct, or association with someone disfellowshipped.
  // The announcement the next Sunday.

  {
    id: 'hcr_committee',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('hcr_member') &&
      (G.flags.has('hcr_first_doubt_internal') || G.flags.has('hcr_doctrine_broken')) &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.hcrCommittee,
    text: 'Three elders in a back room. The chairs are arranged so that they are across a table from you. The questions are about your recent conduct, or your associations, or something you were observed saying. The manner is not unkind. The process has been done this way since before any of them were elders. You are asked whether you are repentant. The question requires an answer they can relay to the congregation.',
    choices: [
      {
        text: 'Express repentance. Whatever it costs, you are not ready to lose this community.',
        tag: 'repent',
        outcome: 'They announce a period of restriction. Your privileges in the congregation are curtailed. The community watches you. The watching is for your benefit.',
        effect: (p) => { p.m -= 8; p.r += 7; p.addFlag('hcr_restricted'); p.setMem('hcrCommittee', true) },
      },
      {
        text: 'Tell them what you actually think. You are done performing repentance for things you do not consider wrong.',
        tag: 'honest',
        outcome: 'The committee votes that evening. The announcement is read from the platform on Sunday. Members are to avoid contact with you.',
        effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('hcr_disfellowshipped'); p.setMem('hcrCommittee', true) },
      },
    ],
    effect: null,
  },

  // ── DISFELLOWSHIPPING / FORMAL EXIT ──────────────────────────────────────────
  // For those who were not already disfellowshipped: the formal decision to leave.
  // For those who were disfellowshipped: the morning after the announcement.

  {
    id: 'hcr_exit',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('hcr_member') &&
      !G.flags.has('hcr_exited') &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.hcrExit,
    text: (G) => G.flags.has('hcr_disfellowshipped')
      ? 'The announcement was made from the platform on Sunday — your name, and the words "no longer one of Jehovah\'s Witnesses" or their equivalent. After the meeting, people you have known for twenty years walked past you without making eye contact. Not rudely. That is the important part: they did it with quiet intention, because this is what the instruction requires, and they are following the instruction for your benefit, so that you will understand what you have lost and return. Your mother did not answer the phone this week.'
      : 'You write a letter — or you stop attending, or you tell an elder directly — and the consequence is the announcement, which comes the following Sunday. The social mathematics of what follows is very clear. Every relationship you have inside the congregation is now conditional on your return. Your family members who are members will be instructed to limit contact. The community that was your entire world closed in a single weekend.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('hcr_exited'); p.addFlag('hcr_shunned'); p.setMem('hcrExit', true) },
  },

  // ── THE SHUNNING YEARS ────────────────────────────────────────────────────────
  // The years after leaving. The supermarket where old friends look through you.
  // The parents who will not come to your wedding.

  {
    id: 'hcr_shunning_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('hcr_shunned') &&
      G.age >= 22 && G.age <= 60 &&
      !G.mem?.hcrShunning,
    text: 'You see someone you have known since childhood in the supermarket. She sees you. She turns to look at the shelf. It is not cruelty — you understand this because you know the mechanism, you followed the same instruction yourself when others left before you. She is cutting off contact so that you will understand the cost and return. You are the reason she is looking at the shelf. The understanding of why she is doing it does not make the looking at the shelf easier to watch.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.e += 4; p.setMem('hcrShunning', true) },
  },

  // ── REBUILDING THE SECULAR LIFE ───────────────────────────────────────────────
  // The specific skills of ordinary social life that were never taught.
  // How to make friends without a congregational structure.
  // How to have a conversation that doesn't have a doctrinal framework underneath it.

  {
    id: 'hcr_secular_reentry',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('hcr_exited') &&
      G.age >= 24 && G.age <= 60 &&
      !G.mem?.hcrReentry,
    text: 'You are learning, at thirty-two, or thirty-eight, or forty-five, the specific skills that secular social life runs on and that you were never taught: how to make a friend outside a shared framework, how to date without knowing whether the person also believes the end is coming, how to celebrate birthdays without the complicated childhood freight that comes with the first ones. The learning is possible. The age at which you are doing it is something you try not to dwell on.',
    choices: null,
    effect: (p) => { p.m += 6; p.e += 5; p.r += 4; p.addFlag('hcr_rebuilding'); p.setMem('hcrReentry', true) },
  },

  // ── LATE-LIFE RECKONING ───────────────────────────────────────────────────────
  // What the years inside meant. What they gave. What leaving cost.
  // The specific position of a person who was formed by a world that no longer considers them.

  {
    id: 'hcr_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('hcr_born_in') || G.flags.has('hcr_member')) &&
      G.age >= 55 &&
      !G.mem?.hcrLate,
    text: (G) => G.flags.has('hcr_exited')
      ? 'You left. What you lost was the world as you understood it — the social world, the doctrinal world, the explanatory framework that had an answer for everything. What you gained was a life that was actually yours to construct. Both of those things are true and both take the whole of your life to understand. The people you grew up with, if they are still inside, consider you to be spiritually dead. You have had decades to think about what it means to be considered dead by the people who knew you before you knew yourself.'
      : 'You stayed. The questions that arose at various points were managed, absorbed, set aside. The community is still yours — the social world, the people who have known you across all the decades. Whether the doctrine is true is a question you have made your peace with holding differently at sixty-five than you held it at twenty. What you know is that the leaving would have cost you everything, and you chose not to pay that price, and that is also a choice a person makes.',
    choices: null,
    effect: (p) => { p.e += 5; p.r += 6; p.m += 3; p.setMem('hcrLate', true) },
  },

]
