// World event response choices — character events that fire in the year of (or shortly after)
// a major world event, giving the player one meaningful response choice. Each event gates
// on the world event flag already being set (world events fire before character events in
// advanceYear), so the flag is present in G when getNextEvent() runs.
//
// phase: null so these fire regardless of the character's current life phase.

export const WORLD_RESPONSE_EVENTS = [

  // ── Berlin Wall fall ─────────────────────────────────────────────────────────
  {
    id: 'wr_berlin_wall_night',
    phase: null,
    weight: 9,
    when: (G) =>
      G.flags.has('wall_generation') &&
      !G.mem?.wrBerlinAck &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.age >= 8,
    text: 'Someone in the crowd passes you a piece of the wall — concrete, the size of your fist, grey, with a fleck of dark paint on one side. People around you are crying and laughing. You cannot tell which is which. The piece of the wall is heavier than it looks.',
    choices: [
      {
        text: 'Keep it',
        tag: 'wall_souvenir',
        outcome: 'You carry it home in your coat pocket. It sits on a shelf for the rest of your life, next to things you chose to keep.',
        effect: (p) => { p.m += 12; p.addFlag('wall_souvenir'); p.setMem('wrBerlinAck', true) },
      },
      {
        text: 'Pass it back — you have what you need',
        tag: 'wall_given_away',
        outcome: 'The person behind you holds it with both hands. They don\'t speak. You both understand.',
        effect: (p) => { p.m += 10; p.karma += 8; p.setMem('wrBerlinAck', true) },
      },
    ],
    effect: null,
  },

  // ── Tiananmen aftermath ───────────────────────────────────────────────────────
  {
    id: 'wr_tiananmen_silence',
    phase: null,
    weight: 9,
    when: (G) =>
      G.flags.has('revolution_generation') &&
      !G.mem?.wrTiananmenAck &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.character.country.name === 'China' &&
      G.age >= 16,
    text: 'It is three days after. No one in the office says anything. A colleague who was vocal last week has not come in since Monday. You do not know if they were detained or if they are staying home. You have thought about going to their apartment to ask. You have thought about it every hour since Tuesday.',
    choices: [
      {
        text: 'Go. Ask.',
        tag: 'broke_silence',
        outcome: 'They are home. They are fine — or something close to fine. The look on their face when they open the door will stay with you a long time.',
        effect: (p) => {
          p.m -= 4
          p.karma += 12
          p.addFlag('broke_silence')
          p.setMem('wrTiananmenAck', true)
        },
      },
      {
        text: 'You do not go. You have people depending on you.',
        tag: 'kept_silence',
        outcome: 'They return to work the following Monday. Neither of you mentions it. You never mention it again. You become someone who does not mention it.',
        effect: (p) => {
          p.r += 10
          p.m -= 8
          p.setMem('wrTiananmenAck', true)
        },
      },
    ],
    effect: null,
  },

  // ── September 11 — a moment at work ──────────────────────────────────────────
  {
    id: 'wr_nine_eleven_moment',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('post_9_11_world') &&
      !G.mem?.wr911Ack &&
      G.currentYear >= 2001 && G.currentYear <= 2002 &&
      G.age >= 12 &&
      ['wealthy_west', 'wealthy_east'].includes(G.currentCountry?.archetype ?? G.character.country.archetype) &&
      !['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.religion),
    text: 'In the weeks after the attacks, someone says something — at work, at a dinner table, in a queue at the shop. It is general and confident and aimed at a whole category of people. Three others laugh. A fourth looks at the floor. You know what the right thing is. You also know what it would cost to say it here, in this room, with these people.',
    choices: [
      {
        text: 'Say something',
        tag: 'spoke_up',
        outcome: 'The laughter stops. The mood changes. You have made enemies of people you will see every day. You find you can live with that.',
        effect: (p) => {
          p.karma += 12
          p.s -= 4
          p.m -= 2
          p.addFlag('spoke_up_when_it_mattered')
          p.setMem('wr911Ack', true)
        },
      },
      {
        text: 'You say nothing. The moment passes.',
        tag: 'stayed_silent_911',
        outcome: 'The conversation moves on. You think about it for longer than the conversation lasted. The fourth person never looks up.',
        effect: (p) => {
          p.r += 8
          p.m -= 5
          p.setMem('wr911Ack', true)
        },
      },
    ],
    effect: null,
  },

  // ── Soviet savings decision ───────────────────────────────────────────────────
  {
    id: 'wr_soviet_savings',
    phase: null,
    weight: 9,
    when: (G) =>
      G.flags.has('survived_soviet_collapse') &&
      !G.mem?.wrSovietSavingsAck &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      G.age >= 18 &&
      G.money > 100,
    text: 'Prices are doubling every few weeks. The rubles in the state bank — a decade of saving — are worth less each day you leave them there. There is a man on the street converting to dollars at a rate that is technically illegal and completely real. You have one hour before he moves on.',
    choices: [
      {
        text: 'Convert everything you can to dollars',
        tag: 'converted_savings',
        outcome: 'You lose forty percent to the rate and the commission. What remains is worth something. That is the calculation you made.',
        effect: (p) => {
          p.wipeMoney(0.4)
          p.addFlag('survived_hyperinflation')
          p.setMem('wrSovietSavingsAck', true)
        },
      },
      {
        text: 'Wait. The government will stabilise this.',
        tag: 'waited_for_government',
        outcome: 'The government announces emergency measures. The measures do not stabilise it. You lose most of what you had.',
        effect: (p) => {
          p.wipeMoney(0.72)
          p.m -= 12
          p.r += 8
          p.addFlag('savings_wiped')
          p.setMem('wrSovietSavingsAck', true)
        },
      },
    ],
    effect: null,
  },

  // ── Post-apartheid: what you do with the day ──────────────────────────────────
  {
    id: 'wr_post_apartheid_day',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('post_apartheid_generation') &&
      !G.mem?.wrApartheidDayAck &&
      G.currentYear >= 1994 && G.currentYear <= 1996 &&
      G.character.country.name === 'South Africa' &&
      G.age >= 15,
    text: (G) => {
      const voted = G.flags.has('voted_end_apartheid')
      if (voted) {
        return 'On the drive home from the polling station you pass a queue that is still moving at six in the evening, two kilometres long. People have brought food and folding chairs. Children are asleep on blankets on the ground. They were here before you woke up. They are still waiting to do what took you four minutes.'
      }
      return 'The results come through on the radio. Mandela. Sixty-two percent. The streets outside are loud in a way you have never heard streets be loud. You are standing at the window. You do not know what to do with your hands.'
    },
    choices: [
      {
        text: 'Go out. Be part of it.',
        tag: 'freedom_day_present',
        outcome: 'You stand with strangers for an hour. Nobody asks who you voted for. Someone gives you something to drink. You accept it.',
        effect: (p) => {
          p.karma += 10
          p.m += 10
          p.s += 3
          p.addFlag('freedom_day_witness')
          p.setMem('wrApartheidDayAck', true)
        },
      },
      {
        text: 'Stay where you are. You are not sure this is your moment.',
        tag: 'freedom_day_aside',
        outcome: 'You watch from the window until it is late. Something is happening in the country that you will spend years understanding.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.e += 3
          p.setMem('wrApartheidDayAck', true)
        },
      },
    ],
    effect: null,
  },

]
