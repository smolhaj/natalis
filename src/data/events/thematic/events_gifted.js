// events_gifted.js — Gifted child arc
//
// Birth identification of exceptional innate talent through late-life reckoning.
// Anchored on the USA 1955 Black child but generalises globally — all gift types,
// all countries, all eras. The hostile/favorable fork reflects real structural access,
// not moral judgement: the gift is the same; what the world does with it is not.
//
// Structure:
//   ACT 1  early_childhood — first manifestation (5 events, one per type)
//   ACT 2  childhood       — teacher recognition + first ceiling
//   ACT 3  adolescence     — the fork (door opens / door closes / underground)
//   ACT 4  young_adult     — USA integration pioneer, HBCU graduation, civil
//                            rights channel, community mentor, global first moment
//   ACT 5  young_adult +   — extraordinary talent peaks (5 types × 3 events)
//          midlife
//   ACT 6  midlife         — reckoning (favorable / hostile) + teaching impulse
//   ACT 7  late_life       — final accounting + gift passed on echo

// ─── Local helpers ────────────────────────────────────────────────────────────

const isGifted = (G) =>
  G.flags.has('born_gifted_intellectual') ||
  G.flags.has('born_gifted_musical') ||
  G.flags.has('born_gifted_athletic') ||
  G.flags.has('born_gifted_artistic') ||
  G.flags.has('born_gifted_linguistic')

const giftType = (G) => {
  if (G.flags.has('born_gifted_intellectual')) return 'intellectual'
  if (G.flags.has('born_gifted_musical')) return 'musical'
  if (G.flags.has('born_gifted_athletic')) return 'athletic'
  if (G.flags.has('born_gifted_artistic')) return 'artistic'
  if (G.flags.has('born_gifted_linguistic')) return 'linguistic'
  return null
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 1 — FIRST MANIFESTATION (early_childhood)
// One event per gift type. Auto-resolve. The character notices something about
// themselves — not as ability but as difference.
// ═══════════════════════════════════════════════════════════════════════════════

const ACT1_EVENTS = [

  {
    id: 'gift_manifest_intellectual',
    phase: 'early_childhood',
    weight: 999,
    when: (G) => G.flags.has('born_gifted_intellectual') && !G.mem?.giftManifested,
    text: 'The numbers on the milk crates outside the grocery have always made sense to you in a way you can\'t explain — not what they mean, but the patterns underneath them. You told your mother once. She went quiet in a way that meant something.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('giftManifested', true) },
  },

  {
    id: 'gift_manifest_musical',
    phase: 'early_childhood',
    weight: 999,
    when: (G) => G.flags.has('born_gifted_musical') && !G.mem?.giftManifested,
    text: 'In church you heard the hymn for the second time and you already knew what note was coming next. Not guessed — knew. You hummed the part the organ missed. Your grandmother put her hand on your knee and did not move it for the rest of the service.',
    choices: null,
    effect: (p) => { p.s += 2; p.m += 2; p.setMem('giftManifested', true) },
  },

  {
    id: 'gift_manifest_athletic',
    phase: 'early_childhood',
    weight: 999,
    when: (G) => G.flags.has('born_gifted_athletic') && !G.mem?.giftManifested,
    text: 'Running feels different for you than it seems to for other children — not tiring, not effortful, something the body wants rather than endures. At five you raced three older boys and beat them. They said you cheated. You didn\'t know what to say.',
    choices: null,
    effect: (p) => { p.h += 4; p.setMem('giftManifested', true) },
  },

  {
    id: 'gift_manifest_artistic',
    phase: 'early_childhood',
    weight: 999,
    when: (G) => G.flags.has('born_gifted_artistic') && !G.mem?.giftManifested,
    text: 'You drew your father\'s hands from memory — not hands in general, his specific hands, the knuckle that stays swollen, the way the left thumb curves. Your mother kept the drawing. You didn\'t understand why she looked at it the way she did.',
    choices: null,
    effect: (p) => { p.lo += 2; p.setMem('giftManifested', true) },
  },

  {
    id: 'gift_manifest_linguistic',
    phase: 'early_childhood',
    weight: 999,
    when: (G) => G.flags.has('born_gifted_linguistic') && !G.mem?.giftManifested,
    text: 'Words come to you like they\'re returning, not arriving. You read the cereal box before anyone taught you to. Your father read it aloud to test you, then stopped. He didn\'t say anything for two days, and then one evening told your mother, quietly, in the kitchen.',
    choices: null,
    effect: (p) => { p.e += 2; p.s += 1; p.setMem('giftManifested', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 2 — RECOGNITION + FIRST CEILING (childhood)
// ═══════════════════════════════════════════════════════════════════════════════

const ACT2_EVENTS = [

  {
    id: 'gift_teacher_recognition',
    phase: 'childhood',
    weight: 12,
    when: (G) =>
      isGifted(G) &&
      G.mem?.giftManifested &&
      !G.mem?.giftRecognized,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'Your teacher asks you to stay behind after arithmetic. She puts a problem on the board that she says is for older students. You solve it before she finishes writing it. She stands with her back to you for a moment.'
      if (type === 'musical') return 'After choir your teacher asks everyone else to leave. She plays a chord on the piano and asks what you hear. You name every note. She plays another. You name those too. She writes something down without speaking.'
      if (type === 'athletic') return 'Your gym teacher clocks your sprint time, writes it down, looks at it, then writes it again like he doesn\'t believe the first number. He says nothing directly. He times you again.'
      if (type === 'artistic') return 'Your teacher pins your drawing to the board without your name and asks the class who made it. Nobody guesses you. She tells them afterward. The room is different then.'
      return 'Your teacher gives you another student\'s essay to mark as a test. You find three errors and explain why in the margins. She reads your notes twice. She asks: "Did you write these yourself?"'
    },
    choices: [
      {
        text: 'Stay after class',
        tag: null,
        outcome: 'She gives you something to work through that isn\'t on any curriculum. You finish it before the next week.',
        effect: (p) => { p.e += 5; p.addFlag('gift_recognized'); p.setMem('giftRecognized', true) },
      },
      {
        text: 'Leave with the others',
        tag: null,
        outcome: 'The moment passes. She watches you from then on.',
        effect: (p) => { p.e += 2; p.addFlag('gift_recognized'); p.setMem('giftRecognized', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_first_ceiling',
    phase: 'childhood',
    weight: 10,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_recognized') &&
      !G.mem?.giftCeilingFired,
    text: (G) => {
      const type = giftType(G)
      const isUSA = G.currentCountry?.name === 'United States'
      const hasRacism = G.flags.has('experienced_racism') || G.flags.has('double_consciousness')
      const archetype = G.currentCountry?.archetype ?? ''
      const isDeveloping = ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(archetype)
      const isSoviet = archetype === 'post_soviet' || G.regime === 'single_party_communist'
      const isFemale = G.character?.gender === 'female'

      if (type === 'intellectual') {
        if (isUSA && hasRacism) return 'There is a mathematics competition in the county. The flyer comes home with a white boy from the next street. You ask your teacher. She folds it once, twice, and puts it in her desk drawer without looking up. "That one\'s not for us," she says. She does not say it cruelly.'
        if (isSoviet) return 'There is a school olympiad for mathematics. Your teacher nominates you, then un-nominates you without explanation. You find out later that the teacher on the committee is from a different faction. The gift is not the point. The point is always something else.'
        if (isDeveloping) return 'The county scholarship competition has an entry fee that is small and impossible. Your father looks at the number for a long time. He puts the paper down without saying anything. This is how you learn what small-and-impossible means.'
        if (isFemale) return 'You are accepted into the gifted programme at the better school across town. Then the letter comes asking about uniforms and the transport allowance and the parental meetings in the afternoons. Your mother works afternoons. The programme is not built for you, though it is technically open to you.'
        return 'There is an advanced programme at the school across town. You could test in. The conversation in your family stops at the cost of the bus.'
      }
      if (type === 'musical') {
        if (isUSA && hasRacism) return 'A boy from your church gets a scholarship to a conservatory across town. You watch him leave. Later you hear the conservatory doesn\'t take colored students. You had not thought to ask.'
        if (isDeveloping) return 'There is a music school in the city. The teacher who told your parents about it meant well. The fees are three months\' wages. Your mother thanks him and does not mention it again.'
        if (isFemale) return 'The school music director tells your parents you have unusual ability. He suggests private lessons. He gives them the name of a teacher. The teacher only takes male students. He does not explain why. There is no why required.'
        return 'The music programme at the better school has an audition. You pass the audition. The lesson costs arrive afterward, detailed in a letter. Nobody in your family had read the fine print.'
      }
      if (type === 'athletic') {
        if (isUSA && hasRacism) return 'You ran against white boys at the church fair and won and nobody mentioned it afterward. The trophy went to the white boy who placed second. Your father tells you on the way home: "You already knew how this worked."'
        if (isFemale) return 'The school has a boys\' team. You are faster than every boy on it. This goes nowhere. The girls\' team has no budget and no coach and is treated as a technicality.'
        if (isDeveloping) return 'The regional team has tryouts. You make the cut, easily. The kit costs money. The travel costs more. You show up to one practice in borrowed shoes and do not go back.'
        return 'The athletics programme at the better school requires a registration fee and medical sign-off and proof of address. You can meet two of those three requirements.'
      }
      if (type === 'artistic') {
        if (isUSA && hasRacism) return 'The school board selects work for the district exhibition. Your teacher submits yours. It is not selected. She doesn\'t explain and you don\'t ask. She leaves the district that spring.'
        if (isDeveloping) return 'A teacher submits your drawings to a regional competition. They are returned with a form letter. The entry arrived after the deadline because of the postal service. Your teacher keeps the work. You never see it again.'
        if (isSoviet) return 'The art teacher nominates your work for the city youth exhibition. The committee sends back a note: the subject matter is not appropriate for youth art. The subject was a portrait of your grandmother.'
        return 'The art class uses materials the school cannot afford for every student. There is a list. You are not on it this term.'
      }
      // linguistic
      if (isUSA && hasRacism) return 'A girl from your class gets into a special reading programme at the white school. Her scores were lower than yours. Your mother finds out and sits with it for a long time without speaking.'
      if (isDeveloping) return 'You write an essay your teacher sends to a regional journal for students. It is returned with a form letter. The journal only publishes work from the capital schools. Your teacher keeps the essay. You never see it again.'
      if (isFemale && (archetype === 'developing_unstable' || isDeveloping)) return 'The writing prize goes to a boy. Your essay was longer and better and everyone in the class knew this. The teacher doesn\'t defend it. She knows what the prize is for.'
      return 'The writing prize goes to a boy whose father is on the school board. You knew this would happen. Knowing did not help.'
    },
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 4; p.addFlag('systemic_ceiling'); p.setMem('giftCeilingFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 3 — THE FORK (adolescence)
// Two competing events. The favorable path fires when structural access exists
// (wealth >= 40, or year >= 1965, or less restricted archetype). The hostile path
// fires when all three conditions stack against the character.
// ═══════════════════════════════════════════════════════════════════════════════

const ACT3_EVENTS = [

  {
    id: 'gift_door_opens',
    phase: 'adolescence',
    weight: 14,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_recognized') &&
      !G.mem?.giftForkFired &&
      (G.stats.wealth >= 40 || G.currentYear >= 1965 || !G.flags.has('experienced_racism') || G.character?.country?.archetype === 'wealthy_west' || G.character?.country?.archetype === 'wealthy_east'),
    text: (G) => {
      const type = giftType(G)
      const isUSA = G.currentCountry?.name === 'United States'
      const isDeveloping = ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.currentCountry?.archetype ?? '')
      const hasRacism = G.flags.has('experienced_racism')

      if (type === 'intellectual') {
        if (isUSA && hasRacism) return 'A letter comes addressed to your parents. A historically Black college has a summer mathematics programme. Your teacher wrote to them months ago without telling you. The scholarship covers everything. Your father reads it at the table twice without speaking.'
        if (isDeveloping) return 'A letter arrives from the national scholarship board. Your teacher submitted your scores without asking. The scholarship covers tuition at the university in the city. Your family reads it together twice, in silence, before anyone speaks.'
        return 'A letter from a university programme arrives. Your teacher wrote to them. You did not know. The scholarship is full. The place is yours if you want it. You read the letter three times to make sure it says what it says.'
      }
      if (type === 'musical') {
        if (isUSA && hasRacism) return 'A woman from your church knows someone at a music school for colored students upstate. She arranged an audition without asking you. You went because your mother made you. They offered you a place.'
        if (isDeveloping) return 'A music teacher at a school in the city has heard about you through the church network. He invites you to audition. Your mother borrows the bus fare. You audition. He calls your house three days later.'
        return 'A conservatory programme has a scholarship for students with exceptional ear. Your teacher submitted an application. The audition is in the city. You go. They call you back.'
      }
      if (type === 'athletic') {
        if (isUSA && hasRacism) return 'A scout from a Black college watches you at the district meet and introduces himself to your father. He uses the word scholarship before he says anything else.'
        if (isDeveloping) return 'A football academy runs a regional trial. Your coach has been writing to them for two years. This year they come to your city. You trial. You are selected.'
        return 'A regional sports academy sends a scout to your school meet. After, he speaks to your parents for twenty minutes. The word scholarship appears early in the conversation.'
      }
      if (type === 'artistic') {
        if (isUSA && hasRacism) return 'An arts organisation in the city runs a competition for colored students. Your teacher submitted your work last year without telling you. You placed second. This year she submits again. You win.'
        if (isDeveloping) return 'A teacher from the city sees your work at the district exhibition and asks your parents if you have applied to the arts secondary school. Nobody knew the arts secondary school existed. She gives them the form.'
        return 'A regional arts programme has a scholarship for exceptional students. Your teacher submits your portfolio. The jury asks to meet you. You go. The meeting lasts forty minutes and they offer you a place that afternoon.'
      }
      // linguistic
      if (isUSA && hasRacism) return 'Your teacher sends an essay you wrote to a programme at Howard University. They write back directly to you, not your parents. They want to know if you\'re interested in their summer institute. The letter says: your teacher believes you have a rare kind of mind.'
      if (isDeveloping) return 'A journalism school in the capital takes two students from your province each year on scholarship. Your teacher entered your essay without asking. You received a letter. The letter is in your parents\' hands.'
      return 'A writing programme at the university has a scholarship for secondary students. Your teacher submits your work. They respond within a week. This has apparently never happened before.'
    },
    choices: [
      {
        text: 'Accept the place',
        tag: null,
        outcome: 'You are going. Whatever this costs — time, distance, the strangeness of being singled out — you are going.',
        effect: (p) => { p.e += 8; p.addFlag('gift_cultivated'); p.setMem('giftForkFired', true) },
      },
      {
        text: 'Decline — you can\'t leave your family right now',
        tag: null,
        outcome: 'The place is declined. The gift is still there. The path just runs differently now.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('gift_deferred'); p.setMem('giftForkFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_door_closes',
    phase: 'adolescence',
    weight: 12,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_recognized') &&
      !G.mem?.giftForkFired &&
      G.stats.wealth < 40 &&
      G.currentYear < 1965,
    text: (G) => {
      const type = giftType(G)
      const isUSA = G.currentCountry?.name === 'United States'

      if (type === 'intellectual') {
        if (isUSA) return 'The summer programme costs more than the letter said. Your father works it out at the kitchen table the same way he works out everything, and puts the paper down. He doesn\'t apologise. There is nothing to apologise for. You get a job at the print shop.'
        return 'The scholarship does not arrive. The programme fills before the application is processed. The letter is a form letter. You read it twice. Then you find a job.'
      }
      if (type === 'musical') {
        if (isUSA) return 'The music school upstate wrote back to say their programme is full for the foreseeable future. You teach yourself from library books. The library closes the nearest branch without announcement. You keep the books you already have.'
        return 'The music programme\'s scholarship covers tuition but not the residence or the instrument rental. The instrument rental alone is two months\' household income. The letter goes unanswered.'
      }
      if (type === 'athletic') {
        if (isUSA) return 'The white school accepts your trial times and then sends a letter about an error. Your coach drives there and parks outside for forty minutes and then drives home. He doesn\'t tell you what happened. He doesn\'t coach the next season.'
        return 'The academy selects you. Then the follow-up letter comes: the acceptance is conditional on a physical examination fee and registration costs. The costs arrive in a single paragraph, without apology. No one has that money.'
      }
      if (type === 'artistic') {
        if (isUSA) return 'The district arts programme\'s integration falls apart over the summer. Three white families withdraw their children, then seven, then the principal closes the programme rather than integrate it. Your teacher gives you her own brushes before she leaves.'
        return 'The arts school accepts you. The scholarship covers half the costs. The other half is in a letter that sits on the kitchen table for two weeks. At the end of two weeks you bring it to the school and explain. They are sorry. They cannot help further.'
      }
      // linguistic
      if (isUSA) return 'The Howard programme doesn\'t have funding this year. Or next. The essay sits in a drawer. Your mother kept it. You get a job at the dry cleaners. You read on your lunch break.'
      return 'The writing programme responds late. The place has been given to someone else. Your teacher says next year. Next year the same thing happens. You stop sending.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('gift_suppressed'); p.setMem('giftForkFired', true) },
  },

  {
    id: 'gift_underground',
    phase: 'adolescence',
    weight: 10,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      !G.mem?.giftUndergroundFired,
    text: 'The gift does not leave. You have not decided what to do with that.',
    choices: [
      {
        text: 'Keep working at it, privately',
        tag: null,
        outcome: 'Nobody knows what you\'re building. That becomes almost the point.',
        effect: (p) => { p.e += 4; p.addFlag('gift_underground'); p.setMem('giftUndergroundFired', true) },
      },
      {
        text: 'Let it go — build a different life',
        tag: null,
        outcome: 'You are good at other things. The absence settles into something you stop noticing most days.',
        effect: (p) => { p.s += 3; p.r += 5; p.addFlag('gift_set_aside'); p.setMem('giftUndergroundFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 4 — YOUNG ADULT DIVERGENCE
// ═══════════════════════════════════════════════════════════════════════════════

const ACT4_EVENTS = [

  // USA integration pioneer — fires for characters who cultivated their gift
  // at white institutions post-1963.
  {
    id: 'gift_integration_pioneer',
    phase: 'young_adult',
    weight: 10,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_cultivated') &&
      G.flags.has('experienced_racism') &&
      G.currentCountry?.name === 'United States' &&
      G.currentYear >= 1963 && G.currentYear <= 1978 &&
      !G.mem?.giftIntegrationFired,
    text: 'You are among the first Black students in the programme. The hallways have a particular quality of silence when you walk through them. You are being watched not to be caught doing something wrong but to see if you will confirm or deny the thing they already believe. You have learned to never let them see you struggle.',
    choices: [
      {
        text: 'Carry it — be twice as good, always',
        tag: null,
        outcome: 'The performance becomes second nature. Something underneath it wears down slowly, the way a good tool wears.',
        effect: (p) => { p.e += 6; p.m -= 8; p.addFlag('double_consciousness'); p.addFlag('perfectionism_burden'); p.setMem('giftIntegrationFired', true) },
      },
      {
        text: 'Find the other Black students in the building',
        tag: null,
        outcome: 'There are three of you. You learn to read each other\'s expressions across rooms. That is worth more than you expected.',
        effect: (p) => { p.e += 3; p.m -= 3; p.s += 4; p.addFlag('double_consciousness'); p.setMem('giftIntegrationFired', true) },
      },
    ],
    effect: null,
  },

  // HBCU graduation — favorable path, Black characters, USA
  {
    id: 'gift_hbcu_graduation',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_cultivated') &&
      G.flags.has('experienced_racism') &&
      G.currentCountry?.name === 'United States' &&
      G.education?.level === 'university' &&
      !G.mem?.giftHbcuGradFired,
    text: 'You are the first in your family to graduate from college. Your mother ironed your gown last night. There is a photograph, and from your father\'s face — not pride exactly, something quieter than pride, something that has been waiting longer.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('hbcu_graduate'); p.addFlag('first_gen_university'); p.addFlag('gift_milestone_1'); p.setMem('giftHbcuGradFired', true) },
  },

  // Civil rights as channel for the suppressed gift — USA, 1955–1968
  {
    id: 'gift_civil_rights_channel',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_suppressed') || G.flags.has('gift_underground')) &&
      G.currentCountry?.name === 'United States' &&
      G.currentYear >= 1955 && G.currentYear <= 1968 &&
      !G.mem?.giftCivilRightsFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'You are writing position papers and legal briefs for the NAACP — working with lawyers you are smarter than. Nobody asks your age. You write eight drafts of a brief one night and the lawyer submits the third one without telling you. You find out it was read in court.'
      if (type === 'musical') return 'The Freedom Songs require someone who can hear what\'s missing in a room and fill it. That turns out to be you. In the church basements and the mass meetings you are teaching hundreds of people to sing in four-part harmony. The music is the organising. You understand this now.'
      if (type === 'athletic') return 'You run training sessions for the young men who are going to do the sit-ins. The training isn\'t about sitting — it\'s about taking the blows and not moving. You teach people how their bodies work under fear. It turns out you know exactly this.'
      if (type === 'artistic') return 'The movement needs posters and newspapers and the visual language that makes people recognise themselves in a cause. You make those things. They appear on telephone poles and church bulletin boards across three states and you made them in a room with one light bulb.'
      return 'You transcribe testimonies. You write letters to the editor that get published. You write speeches for people who cannot write them for themselves. The words go out under other names and you understand why and you do not mind. The words are the thing.'
    },
    choices: [
      {
        text: 'The movement is the work now',
        tag: null,
        outcome: 'The gift has found a channel. It is not the channel you imagined. It is the channel available.',
        effect: (p) => { p.addFlag('gift_rekindled'); p.m += 6; p.s += 4; p.karma += 8; p.addFlag('civil_rights_participant'); p.setMem('giftCivilRightsFired', true) },
      },
      {
        text: 'You help for a season, then step back',
        tag: null,
        outcome: 'You are not built for the long organisation. But you were there when it mattered.',
        effect: (p) => { p.m += 3; p.karma += 4; p.setMem('giftCivilRightsFired', true) },
      },
    ],
    effect: null,
  },

  // Community mentor — hostile path, globally
  {
    id: 'gift_community_mentor',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_suppressed') || G.flags.has('gift_underground')) &&
      !G.mem?.giftMentorFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'An older man — a retired schoolteacher, you find out later — notices the way you read. He has a room full of books and nothing to do with them. He invites you over without making it about pity.'
      if (type === 'musical') return 'An old musician who plays on weekends at the church social sees you listening. He asks if you want to learn properly. He doesn\'t use the word properly, but you understand what he means. He has been waiting for someone to ask.'
      if (type === 'athletic') return 'A former athlete runs informal training sessions at the community ground on mornings. He has no certification and no funding and forty years of knowledge. He sees you once. He doesn\'t say anything. The next morning he\'s there early and has a plan.'
      if (type === 'artistic') return 'A sign painter who has been doing it for forty years works out of a garage near your block. He sees your work by accident — a drawing you left somewhere you forgot. He puts a note under your door asking if you want to learn something real.'
      return 'A retired librarian who runs reading groups notices the way you argue with texts rather than absorbing them. She starts holding a separate conversation just with you. She doesn\'t call it mentorship. She just has another book ready every week.'
    },
    choices: [
      {
        text: 'Say yes',
        tag: null,
        outcome: 'You spend years working through everything they have. They call it keeping you occupied. You know what it actually is.',
        effect: (p) => { p.e += 7; p.m += 5; p.addFlag('mentor_found'); p.addFlag('gift_rekindled'); p.setMem('giftMentorFired', true) },
      },
      {
        text: 'Decline — it feels too much like charity',
        tag: null,
        outcome: 'You find other ways. They take longer.',
        effect: (p) => { p.m -= 2; p.setMem('giftMentorFired', true) },
      },
    ],
    effect: null,
  },

  // Global first public moment — favorable path
  {
    id: 'gift_first_public_moment',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      !G.mem?.giftFirstPublicFired,
    text: (G) => {
      const type = giftType(G)
      const yr = G.currentYear ?? 1970
      if (type === 'intellectual') return 'A paper you wrote is accepted. It is your first. The journal is a good one. You read the acceptance three times before you tell anyone. When you tell your teacher she says she\'s been waiting for this since you were twelve.'
      if (type === 'musical') return `You perform for the first time to a real audience — not the family, not the community hall. An actual audience who did not come specifically to support you. The silence after is different from any silence you\'ve heard.`
      if (type === 'athletic') return `You compete at the regional level and win. The gap between first and second place is almost embarrassing. Your coach watches you cross the line and says nothing. He shakes your hand like you are already someone else.`
      if (type === 'artistic') return 'Your work is shown in a group exhibition — nothing curated, a shared wall in a community space. Someone stops in front of your piece for four minutes without moving. You time it. You have never timed anything before.'
      return `Your piece is published — a newspaper, a journal, a competition result. The first time you see your name in print above words you wrote you have to put the page down. You pick it back up.`
    },
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('gift_milestone_1'); p.setMem('giftFirstPublicFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 5 — EXTRAORDINARY TALENT PEAKS
// These events fire only for gifted characters who cultivated their gift AND
// reached the peak of the relevant career. They represent what most people
// never get to: the extraordinary ceiling.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Athletic peaks ─────────────────────────────────────────────────────────

const EXTRAORDINARY_ATHLETIC_EVENTS = [

  {
    id: 'gift_athletic_world_stage',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('born_gifted_athletic') &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      G.career?.id === 'athlete' &&
      G.career?.level >= 2 &&
      G.age >= 20 && G.age <= 30 &&
      !G.mem?.giftAthWorldStageFired,
    text: (G) => {
      const yr = G.currentYear ?? 1975
      const archetype = G.currentCountry?.archetype ?? ''
      if (archetype === 'subsaharan' || archetype === 'developing_urban') return 'You are performing at a level the country hasn\'t seen from someone your age. The federation has your name. There is talk of a national selection. The talk has been going on for eighteen months. You train while the talk continues.'
      if (yr >= 1964 && yr <= 2024) return 'You qualify for the championship at a level where the other competitors have been doing this longer than you have been alive. The night before you don\'t sleep well. On the day you perform better than you ever have. The result is not close. The commentator struggles to find the right word for the margin.'
      return 'Word has reached people who don\'t usually pay attention to this. A national federation official is in the stands. Your coach tells you afterward that there is a conversation to have. The conversation is about the next level.'
    },
    choices: [
      {
        text: 'This is what you\'ve been building toward',
        tag: null,
        outcome: 'The door is fully open. Walking through it will cost everything for a while. You already knew that.',
        effect: (p) => { p.m += 12; p.fame += 15; p.h += 5; p.addFlag('gift_fulfilled'); p.addFlag('pro_athlete'); p.setMem('giftAthWorldStageFired', true) },
      },
      {
        text: 'The performance is enough — you don\'t need the next level',
        tag: null,
        outcome: 'You have done the extraordinary thing. Whether to turn it into a career is a different decision.',
        effect: (p) => { p.m += 8; p.fame += 6; p.addFlag('gift_partial'); p.setMem('giftAthWorldStageFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_athletic_legendary',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.flags.has('born_gifted_athletic') &&
      G.flags.has('pro_athlete') &&
      G.career?.id === 'athlete' &&
      G.career?.level >= 3 &&
      G.age >= 23 && G.age <= 32 &&
      !G.mem?.giftAthLegendaryFired,
    text: (G) => {
      const yr = G.currentYear ?? 1980
      if (yr < 1970) return 'The record is yours. The newspapers have written the sentence twice: once in the morning edition, once corrected in the evening edition when they realised how much margin there was. Your coach says he has been waiting forty years to see this. He means it.'
      if (yr < 2000) return 'The number on the scoreboard is the kind of number that gets on a wall somewhere. Not metaphorically — in this sport they put the number on a wall. You stand under it while the photograph is taken. You are twenty-seven years old. The number will be there when you are gone.'
      return 'The clip is everywhere within hours. The analysis arrives the next morning from eight different countries. Someone has already traced your technique back to the coach you had at fourteen. The lineage is clear. The gift is clear. What is also clear is that this is not repeatable every day. Today was the day it happened.'
    },
    choices: null,
    effect: (p) => { p.m += 15; p.fame += 20; p.addFlag('gift_extraordinary'); p.setMem('giftAthLegendaryFired', true) },
  },

  {
    id: 'gift_athletic_after',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_athletic') &&
      (G.flags.has('pro_athlete') || G.flags.has('gift_fulfilled')) &&
      G.career?.id !== 'athlete' &&
      G.age >= 32 && G.age <= 45 &&
      !G.mem?.giftAthAfterFired,
    text: 'The body you had at twenty-six doesn\'t exist anymore. This is not a complaint — you knew the shape of it. What you didn\'t know was what you\'d miss most. Not the winning. The mornings. The training schedule as a frame for the day. The specific state of the body at peak condition that you worked twenty years to reach and held for seven.',
    choices: [
      {
        text: 'Coach — pass the knowledge to someone who has what you had',
        tag: null,
        outcome: 'You find a kid. They\'re sixteen and arrogant and slower than you were at their age and they don\'t know it yet. This is the beginning of the most satisfying decade of your life.',
        effect: (p) => { p.m += 10; p.karma += 8; p.addFlag('gift_passed_on'); p.addFlag('athlete_became_coach'); p.setMem('giftAthAfterFired', true) },
      },
      {
        text: 'Build a life outside sport entirely',
        tag: null,
        outcome: 'The reconstruction takes longer than you expected. You find anchors. The sport remains in you as a foundation rather than an identity.',
        effect: (p) => { p.m += 4; p.e += 5; p.setMem('giftAthAfterFired', true) },
      },
    ],
    effect: null,
  },

]

// ─── Intellectual peaks ──────────────────────────────────────────────────────

const EXTRAORDINARY_INTELLECTUAL_EVENTS = [

  {
    id: 'gift_intellectual_breakthrough',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_intellectual') &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      (G.career?.id === 'academic' || G.career?.id === 'engineer' || G.career?.id === 'doctor') &&
      G.age >= 24 && G.age <= 40 &&
      !G.mem?.giftIntellBreakthroughFired,
    text: (G) => {
      const field = G.career?.id ?? 'academic'
      const yr = G.currentYear ?? 1975
      if (field === 'doctor') return 'The clinical pattern that everyone dismissed as noise you noticed six months ago and wrote up quietly and sent to a journal. The journal responds with a request for expansion. Three months later you receive a letter from a researcher at another institution who says she has been looking for exactly this for four years.'
      if (field === 'engineer') return 'The solution you found for the loading problem is more elegant than the established approach. You know it is. You submit the revised design to the senior engineer expecting revisions. He reads it once, then again, and calls the project lead in from the other office.'
      if (yr >= 1957 && yr <= 1975 && G.currentCountry?.name === 'United States') return 'The calculation is yours. In the room of mathematicians at the programme you are the only one who caught the error in the inherited model. The programme director looks at your correction for a long time before he says anything. What he says is: this changes the approach on the next mission.'
      return 'The paper you have been working on for two years is finally complete. When it goes out for review you get back responses that are unusual — not "minor revisions" or "major revisions" but long letters from the reviewers explaining what they think you\'ve done. One of them is a person whose textbook you read at fourteen.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.e += 8; p.fame += 8; p.addFlag('gift_fulfilled'); p.addFlag('intellectual_breakthrough'); p.setMem('giftIntellBreakthroughFired', true) },
  },

  {
    id: 'gift_tenured_professor',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('born_gifted_intellectual') &&
      G.flags.has('gift_cultivated') &&
      G.career?.id === 'academic' &&
      G.career?.level >= 3 &&
      G.age >= 32 && G.age <= 48 &&
      !G.mem?.giftTenureFired,
    text: 'Tenure. The word is smaller than the thing it means. What it means is: you cannot now be removed for inconvenient work. The freedom is theoretical until you test it. You have already decided what you will test it on.',
    choices: [
      {
        text: 'Use the security to pursue the work that couldn\'t be done before',
        tag: null,
        outcome: 'The paper you could not publish before tenure is your best work. It receives the response you expected from people you expected it from, and a different response from people you didn\'t.',
        effect: (p) => { p.m += 10; p.e += 8; p.karma += 5; p.addFlag('tenured_professor'); p.addFlag('gift_extraordinary'); p.setMem('giftTenureFired', true) },
      },
      {
        text: 'The security matters — use it carefully',
        tag: null,
        outcome: 'The work continues at its own pace. You are not going to waste the security, but you are not going to burn it either.',
        effect: (p) => { p.m += 8; p.e += 5; p.addFlag('tenured_professor'); p.setMem('giftTenureFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_intellectual_legacy',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('born_gifted_intellectual') &&
      (G.flags.has('intellectual_breakthrough') || G.flags.has('tenured_professor')) &&
      G.age >= 58 &&
      !G.mem?.giftIntellLegacyFired,
    text: 'A student of a student asks to interview you. They want to trace the lineage of an idea. You trace it back — back through your own work, back to the people who taught you, back to the paper that changed everything for you when you were twenty-two. The line is longer than you expected. You are part of it.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 8; p.addFlag('gift_passed_on'); p.setMem('giftIntellLegacyFired', true) },
  },

]

// ─── Musical peaks ──────────────────────────────────────────────────────────

const EXTRAORDINARY_MUSICAL_EVENTS = [

  {
    id: 'gift_music_landmark',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_musical') &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      (G.career?.id === 'musician' || G.career?.id === 'actor') &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.giftMusicLandmarkFired,
    text: (G) => {
      const yr = G.currentYear ?? 1970
      const archetype = G.currentCountry?.archetype ?? ''
      if (yr < 1965) return 'The recording session runs until four in the morning. When you play it back the next day something is different about it — not better than your previous work in the way that better usually means, but different in kind. You know what it is. You don\'t say it out loud.'
      if (archetype === 'subsaharan' || archetype === 'developing_urban') return 'The recording moves through the city before the distribution system catches up to it. People have it before it is officially released. The radio plays it twice and gets calls for hours. You are twenty-four years old and you have made the thing you were born to make.'
      return 'The album arrives. The first week is quiet. Then the review runs, and the second week is not quiet. By the third week you understand something has shifted — not in your life yet, but in the way the work is being heard. Someone has described your music in the right sentence and others have recognised it and the recognition is spreading.'
    },
    choices: null,
    effect: (p) => { p.m += 14; p.fame += 18; p.addFlag('gift_fulfilled'); p.addFlag('acclaimed_musician'); p.setMem('giftMusicLandmarkFired', true) },
  },

  {
    id: 'gift_music_canonical',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('born_gifted_musical') &&
      G.flags.has('acclaimed_musician') &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.giftMusicCanonFired,
    text: 'A younger musician credits you publicly — not as an influence but as the reason. The phrase is "I wouldn\'t be making music if I hadn\'t heard this." You read it and then put the phone down and sit with it. The word canonical is being used in descriptions of your work. You didn\'t know you were making something canonical. You were making the next thing.',
    choices: null,
    effect: (p) => { p.m += 10; p.fame += 12; p.addFlag('gift_extraordinary'); p.setMem('giftMusicCanonFired', true) },
  },

  {
    id: 'gift_music_late_recognition',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('born_gifted_musical') &&
      (G.flags.has('acclaimed_musician') || G.flags.has('gift_rekindled')) &&
      G.age >= 55 &&
      !G.mem?.giftMusicLateFired,
    text: (G) => {
      if (G.flags.has('gift_rekindled') && !G.flags.has('acclaimed_musician')) return 'A documentary maker finds recordings from thirty years ago — the recordings you made when you had no label, when the recording was done on a borrowed machine in someone\'s living room. They put them on a streaming platform with a short essay about what they represent. The response is not large but it is from exactly the right people.'
      return 'Late recognition has its own texture. The prize arrives when the work it honours is twenty years in the past. You accept it with genuine warmth and the specific feeling of receiving something in the wrong decade.'
    },
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('gift_passed_on'); p.setMem('giftMusicLateFired', true) },
  },

]

// ─── Artistic peaks ─────────────────────────────────────────────────────────

const EXTRAORDINARY_ARTISTIC_EVENTS = [

  {
    id: 'gift_art_critical_moment',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_artistic') &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      (G.career?.id === 'artist' || G.career?.id === 'architect') &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem?.giftArtCriticalFired,
    text: (G) => {
      const yr = G.currentYear ?? 1975
      const archetype = G.currentCountry?.archetype ?? ''
      if (archetype === 'single_party_communist' || G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian') return 'The gallery in the city accepts your work. Then the work is removed from the exhibition without explanation. Then a different gallery — a private one run by someone who knows what she\'s doing — contacts you. The work goes up there instead. The people who come to see it are not the usual gallery visitors. They are quiet in front of the pieces. That is the thing that matters.'
      if (yr >= 1950 && yr <= 1980 && G.currentCountry?.name === 'United States') return 'The show is reviewed in the paper. The review is long and takes the work seriously. The reviewer uses the phrase "irreducibly specific." You have to read the sentence three times. You agree with it. You didn\'t know you were making something that could be described that way.'
      return 'The work is up. The opening is attended by people you recognise from the field. One of them — an artist whose work you have admired for years — stands in front of your largest piece for a long time. He comes to find you afterward. He doesn\'t give you a compliment. He asks you a question about the work. The question is the compliment.'
    },
    choices: null,
    effect: (p) => { p.m += 13; p.fame += 14; p.addFlag('gift_fulfilled'); p.addFlag('acclaimed_artist'); p.setMem('giftArtCriticalFired', true) },
  },

  {
    id: 'gift_art_major_prize',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('born_gifted_artistic') &&
      G.flags.has('acclaimed_artist') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.giftArtPrizeFired,
    text: 'The prize is not what you made the work for. You say this at the ceremony and you mean it. What you don\'t say, because there is no place in a ceremony speech to say it, is that the thing you made the work for was the specific sensation of a work resolving — the moment when the piece becomes itself. That has happened eight times clearly in your life. The prize is recognising the residue of those moments.',
    choices: null,
    effect: (p) => { p.m += 12; p.fame += 15; p.addFlag('gift_extraordinary'); p.setMem('giftArtPrizeFired', true) },
  },

  {
    id: 'gift_art_retrospective',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('born_gifted_artistic') &&
      (G.flags.has('acclaimed_artist') || G.flags.has('gift_rekindled')) &&
      G.age >= 58 &&
      !G.mem?.giftArtRetroFired,
    text: (G) => {
      if (G.flags.has('gift_rekindled') && !G.flags.has('acclaimed_artist')) return 'A gallery is showing work by self-taught artists from your region. They contacted you after finding work you made decades ago in a community space collection. The work was documented. You didn\'t know. You go to see it hung in a proper gallery. The feeling is specific: your work is being seen properly, forty years late. You look at it for a long time.'
      return 'The retrospective covers forty years. Walking through it you see a person you don\'t fully recognise — not because the work is unfamiliar, but because the person who made it was always moving forward and never stood still long enough to see what they were building. You stand still now. This is the first time you have seen all of it at once.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('gift_passed_on'); p.setMem('giftArtRetroFired', true) },
  },

]

// ─── Linguistic peaks ────────────────────────────────────────────────────────

const EXTRAORDINARY_LINGUISTIC_EVENTS = [

  {
    id: 'gift_writing_published',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_linguistic') &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      (G.career?.id === 'novelist' || G.career?.id === 'journalist' || G.career?.id === 'academic') &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.giftWritingPublishedFired,
    text: (G) => {
      const field = G.career?.id ?? 'novelist'
      const yr = G.currentYear ?? 1970
      const archetype = G.currentCountry?.archetype ?? ''
      if (field === 'journalist') return 'The piece runs on the front page. You\'ve had bylines before but this one is different — the response is different, the calls from the editor are different, the letters that arrive are different. Someone in the letters column says your writing changed their mind. Not your argument. Your writing.'
      if (archetype === 'single_party_communist' || G.regime === 'single_party_authoritarian') return 'The manuscript circulates in samizdat. You didn\'t send it out — someone who read it did. Now it is moving through the city in carbon copies and you are aware that each copy is a small risk carried by a person you don\'t know. You think about this when you sleep.'
      if (G.currentCountry?.name === 'United States' && G.flags.has('experienced_racism') && yr < 1980) return 'The book is published by a small press. The review in the major paper arrives six weeks later. The reviewer says: here is a voice that has been forming for years and has arrived complete. What you do not say to anyone is that you wrote the first draft in a dry-cleaning shop on your lunch breaks.'
      return 'The book is published. The first weeks are quiet. Then it is reviewed in a journal that matters, and the review is long and treats the work as seriously as you always believed it deserved. You read the review twice and then call your mother.'
    },
    choices: null,
    effect: (p) => { p.m += 14; p.fame += 16; p.addFlag('gift_fulfilled'); p.addFlag('acclaimed_writer'); p.setMem('giftWritingPublishedFired', true) },
  },

  {
    id: 'gift_literary_prize',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('born_gifted_linguistic') &&
      G.flags.has('acclaimed_writer') &&
      G.age >= 35 && G.age <= 58 &&
      !G.mem?.giftLiteraryPrizeFired,
    text: (G) => {
      const archetype = G.currentCountry?.archetype ?? ''
      if (G.flags.has('experienced_racism') && G.currentCountry?.name === 'United States') return 'The prize is the kind that gets announced in a press release. You find out from your editor, who calls before the release goes out. You sit with it for a while before you tell anyone. The thing you keep returning to is not the prize but what your father would have said. He died before the first book.'
      if (archetype === 'subsaharan' || archetype === 'developing_urban') return 'The prize is international. The announcement names your country. In your country the announcement is news in a way it would not be elsewhere — not because of you specifically, though that too, but because the naming of a place in an international sentence of recognition still carries weight that it will take another generation to shed.'
      return 'The award citation quotes from the book you wrote twelve years ago and the book you wrote last year. Reading the citation you see something you didn\'t see while writing — a line of argument running through all of it. The work was more coherent than you knew while you were inside it.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.fame += 18; p.addFlag('gift_extraordinary'); p.setMem('giftLiteraryPrizeFired', true) },
  },

  {
    id: 'gift_voice_of_generation',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('born_gifted_linguistic') &&
      G.flags.has('acclaimed_writer') &&
      G.fame >= 50 &&
      G.age >= 42 &&
      !G.mem?.giftVoiceFired,
    text: 'The phrase that people use is: "the voice of a generation." You have heard it applied to others and found it inexact. Now it is being applied to you and you still find it inexact — you speak for yourself and from yourself and apparently that has made you legible to others who feel similarly, which is its own kind of gift, different from the one you were born with.',
    choices: null,
    effect: (p) => { p.m += 8; p.fame += 10; p.karma += 6; p.setMem('giftVoiceFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 6 — MIDLIFE RECKONING
// ═══════════════════════════════════════════════════════════════════════════════

const ACT6_EVENTS = [

  {
    id: 'gift_midlife_reckoning_favorable',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_fulfilled') || G.flags.has('gift_extraordinary')) &&
      G.age >= 38 && G.age <= 52 &&
      !G.mem?.giftMidlifeReckFired,
    text: 'You have done the thing. The credential, the position, the decades of work. And now the question is what it cost — not whether it was worth it, but what it required of you to get here. You can name the younger version of yourself who could not have imagined this. You can\'t always recognise them.',
    choices: [
      {
        text: 'It was worth it',
        tag: null,
        outcome: 'You believe this. Most days you believe it completely.',
        effect: (p) => { p.m += 5; p.addFlag('gift_midlife_peace'); p.setMem('giftMidlifeReckFired', true) },
      },
      {
        text: 'You\'re not sure anymore',
        tag: null,
        outcome: 'Not regret exactly. Something more specific than regret — an inventory, running, of what was spent.',
        effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('gift_midlife_doubt'); p.setMem('giftMidlifeReckFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_midlife_reckoning_hostile',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_suppressed') || G.flags.has('gift_set_aside') || G.flags.has('gift_wasted')) &&
      G.age >= 38 && G.age <= 52 &&
      !G.mem?.giftMidlifeReckFired,
    text: 'You watch a younger person doing what you could have done. She is twenty-four. She is good — but not as good as you were at twenty-four, and you know this the way you know the weight of a tool. Not abstractly. The thought passes. You let it pass. You have practice at this.',
    choices: null,
    effect: (p) => { p.addFlag('gift_wasted'); p.r += 10; p.m -= 5; p.setMem('giftMidlifeReckFired', true) },
  },

  {
    id: 'gift_teaching_impulse',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.age >= 37 &&
      !G.mem?.giftTeachingImpulseFired,
    text: (G) => {
      const type = giftType(G)
      const child = (G.children ?? []).find(c => c.age >= 8 && c.age <= 16)
      const target = child ? `your ${child.name.split(' ')[0]}` : 'a child in the neighbourhood'
      if (type === 'intellectual') return `You notice the way ${target} does arithmetic. Not the answers — the way they move through the problem. You recognise it the way you recognise yourself in an old photograph.`
      if (type === 'musical') return `${target.charAt(0).toUpperCase() + target.slice(1)} hums a melody without thinking and it is more complex than it should be for someone their age. You hear it. You are the only person in the room who hears what it is.`
      if (type === 'athletic') return `You watch ${target} run — not in a race, just across a yard — and the mechanics are exactly what you spent ten years trying to learn. The body already knows it.`
      if (type === 'artistic') return `You find a drawing ${target} made and left somewhere. It is not childlike in the way that most children\'s drawings are childlike. There is something in the composition that shouldn\'t be there yet.`
      return `${target.charAt(0).toUpperCase() + target.slice(1)} writes something — a story, an essay, a message — and the phrasing is unusual in a way that makes you put it down and pick it back up. You recognise the specific quality. You know what it means.`
    },
    choices: [
      {
        text: 'Step in — give them what you didn\'t have',
        tag: null,
        outcome: 'You become the teacher you needed, or the supplement to the one they have. The gift takes a different shape in them. That is how it should work.',
        effect: (p) => { p.m += 6; p.karma += 7; p.addFlag('gift_passed_on'); p.setMem('giftTeachingImpulseFired', true) },
      },
      {
        text: 'Watch — it\'s not your place',
        tag: null,
        outcome: 'You hope someone else sees it. You watch to see if someone does.',
        effect: (p) => { p.r += 5; p.setMem('giftTeachingImpulseFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACT 7 — LATE LIFE ACCOUNTING
// ═══════════════════════════════════════════════════════════════════════════════

const ACT7_EVENTS = [

  {
    id: 'gift_late_accounting',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.age >= 65 &&
      !G.mem?.giftLateFired,
    text: (G) => {
      const hasFulfilled = G.flags.has('gift_fulfilled') || G.flags.has('gift_extraordinary')
      const hasRekindled = G.flags.has('gift_rekindled')
      const hasSuppressed = G.flags.has('gift_suppressed') && !hasRekindled
      const isUSA = G.currentCountry?.name === 'United States'
      const hasRacism = G.flags.has('experienced_racism')

      if (hasFulfilled && isUSA && hasRacism) return 'You have lived to see things you didn\'t think you would live to see. The work exists somewhere — in a file, in a programme, in a person who learned it from you. The country didn\'t give you what it owed you. You did the work anyway. You are still deciding how you feel about that.'
      if (hasFulfilled) return 'Late in life you are able to trace the full arc of it: the early recognition, the cultivation, the peak years, and now this — a kind of clarity about what the gift was for and what it cost. The accounting is not simple. The gift is not something that makes life easier. It makes certain things possible that would not otherwise be possible. That is not the same thing.'
      if (hasSuppressed && isUSA && hasRacism) return 'You are old enough that the anger has settled into something more like clarity. You know exactly what you were and what you were not permitted to be. These are separate things. They have not stopped being separate.'
      if (hasSuppressed) return 'The inventory is specific: the gift was real, the path was blocked, the alternative life you built is also real. These coexist. You have mostly made peace with the coexistence. Mostly.'
      if (hasRekindled) return 'Late in life you did the thing you were made for — not in the way you would have if the path had been clear, but in the way available to someone who came to it late and sideways. It turns out that is also a kind of path. You would not have chosen it. But it was yours.'
      return 'The gift shaped the life whether or not it was ever fully used. You can see this now. The specific way you move through a problem, the things you notice, the moments when you are most alive — all of it traces back. The gift was always the gift. What the world made of it was a different question.'
    },
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('gift_late_accounting'); p.setMem('giftLateFired', true) },
  },

  {
    id: 'gift_passed_on_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_passed_on') &&
      G.age >= 68 &&
      !G.mem?.giftPassedOnEchoFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'A former student emails to say they got the position. They credit you — not in the thank-you-for-everything way, but specifically, in terms of what they learned in a particular conversation years ago. You remember the conversation. You didn\'t know they were taking notes.'
      if (type === 'musical') return 'You hear something on the radio and it takes you four bars to realise it\'s the technique you spent a year teaching. The voice is not yours — it\'s theirs, completely theirs. But the specific thing you showed them is in there, grown into something you couldn\'t have predicted.'
      if (type === 'athletic') return 'One of the kids you trained is competing at a level you barely reached. You watch the footage and recognise the correction you gave in the first month — a small thing, a weight distribution, something that looked trivial. It is in their body now. It will be in their body for the rest of their life.'
      if (type === 'artistic') return 'You are shown a piece of work by someone who doesn\'t know you — a student, a young artist, someone who found something you made years ago. The influence is clear. Not imitation — the thing that influence actually is when it works, which is using what you\'ve learned to make something the teacher couldn\'t have made.'
      return 'A book is dedicated to you. The dedication is spare — just your name, and the year you first gave them a red pen. The book is better than anything you\'ve written. This is the right order of things.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 6; p.setMem('giftPassedOnEchoFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const GIFTED_EVENTS = [
  ...ACT1_EVENTS,
  ...ACT2_EVENTS,
  ...ACT3_EVENTS,
  ...ACT4_EVENTS,
  ...EXTRAORDINARY_ATHLETIC_EVENTS,
  ...EXTRAORDINARY_INTELLECTUAL_EVENTS,
  ...EXTRAORDINARY_MUSICAL_EVENTS,
  ...EXTRAORDINARY_ARTISTIC_EVENTS,
  ...EXTRAORDINARY_LINGUISTIC_EVENTS,
  ...ACT6_EVENTS,
  ...ACT7_EVENTS,
]
