// events_grief.js
// The full arc of grief — parents, partner, children, siblings, friends, prolonged.
// These are the highest-emotional-weight events in the game.
// Gate on G.parents, G.partner, G.children, G.flags, G.age, G.mem.

export const GRIEF_EVENTS = [

  // ── PARENT DEATH ARC ─────────────────────────────────────────────────────────

  {
    id: 'grief_parent_call',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.flags.includes('orphan') &&
      !G.mem.griefParentCall &&
      G.age >= 35 &&
      G.age <= 60 &&
      G.parents &&
      (G.parents.father?.alive || G.parents.mother?.alive) &&
      Math.random() < 0.08,
    text: (G) => {
      const which = G.parents.father?.alive && G.parents.mother?.alive
        ? (Math.random() < 0.5 ? 'father' : 'mother')
        : (G.parents.father?.alive ? 'father' : 'mother')
      return which === 'father'
        ? 'The call comes from your mother. She says your father collapsed this morning. He is gone before you can get there. You are driving when you hear and you pull over onto the shoulder and sit there for a long time.'
        : 'Your brother calls. Your mother is gone. She was fine two weeks ago. He does not have many details yet. You find yourself standing in your kitchen not understanding what you are supposed to do with your hands.'
    },
    choices: [
      {
        text: 'Get in the car and go',
        tag: null,
        outcome: 'The drive is long. You arrive to a house that already feels different — the same objects, the wrong order.',
        effect: (p) => { p.m -= 20; p.r += 8; p.addFlag('lost_parent'); p.setMem('griefParentCall', true) },
      },
      {
        text: 'Sit with it first. You will be no use to anyone like this.',
        tag: null,
        outcome: 'You give yourself an hour. Then you pack a bag and go.',
        effect: (p) => { p.m -= 18; p.r += 6; p.addFlag('lost_parent'); p.setMem('griefParentCall', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_parent_admin',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_parent') &&
      !G.mem.griefParentAdmin &&
      G.age >= 35,
    text: 'The death certificate. The bank notification. The pension office. The solicitor\'s number your parent had written in a folder you find on the third day. The bureaucracy arrives before you have processed anything at all, and in some ways this is useful — there are tasks, and tasks can be done, and doing them is a way of not sitting still with the fact of it.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 2; p.setMem('griefParentAdmin', true) },
  },

  {
    id: 'grief_parent_funeral',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_parent') &&
      G.mem.griefParentAdmin &&
      !G.mem.griefParentFuneral,
    text: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'subsaharan') {
        return 'The funeral is three days. There is food and music and a crowd of people from your parent\'s whole life. Women from the church sing in rotation. Children run between the adults. The grief is communal in a way that exhausts and holds you simultaneously.'
      } else if (G.character.country.name === 'Japan') {
        return 'The ceremony is precise and unhurried. Incense. White. The attendants in black moving with a kind of choreographed quiet. You are not encouraged to weep openly. You carry the grief with the same posture as everyone else: straight-backed, present, inside.'
      } else if (G.religion === 'muslim') {
        return 'The burial happens within twenty-four hours, as it must. There is no time to prepare — only to do. You wash, you wrap, you say the prayers. The speed of it is both correct and brutal. By evening your parent is in the ground and you are sitting in a room full of people reciting Quran.'
      } else {
        return 'The service is in the church where your parent was married. People you have not seen in years come out of an old geography of your parent\'s life. At the reception, someone says they look just like you. You stand with a plate of food and do not eat it.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.setMem('griefParentFuneral', true) },
  },

  {
    id: 'grief_parent_month_after',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.griefParentFuneral &&
      !G.mem.griefParentMonthAfter &&
      G.age >= 35,
    text: 'A month later the world is going on at normal speed. Your colleagues ask how you are and mean are you functioning again, and you say fine. On the subway you suddenly cannot breathe. You are not fine. The grief is not less — it has gone from acute to structural, the way a fracture becomes part of the architecture of a bone.',
    choices: [
      {
        text: 'Let yourself feel it — it is earned',
        tag: null,
        outcome: 'You take an afternoon. You look at photographs. You do not try to make it mean anything yet.',
        effect: (p) => { p.m -= 6; p.r -= 3; p.setMem('griefParentMonthAfter', true) },
      },
      {
        text: 'Keep moving — it is the only way you know',
        tag: null,
        outcome: 'The grief waits. It is patient.',
        effect: (p) => { p.m -= 10; p.r += 8; p.setMem('griefParentMonthAfter', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_parent_belongings',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.griefParentMonthAfter &&
      !G.mem.griefParentBelongings,
    text: 'You go through their things. Most of it is practical — what to keep, what to give away, what the charity shop can take. Then you find something: a box of letters, or a photograph of them at your current age, or an object you have not thought about in thirty years. It opens something that the funeral and the forms and the month of functioning did not.',
    choices: [
      {
        text: 'Take your time with it',
        tag: null,
        outcome: 'You sit on the floor of their bedroom for a long time. You keep the letters. The grief moves through you differently after.',
        effect: (p) => { p.m -= 8; p.r -= 5; p.setMem('griefParentBelongings', true) },
      },
      {
        text: 'Set it aside for later',
        tag: null,
        outcome: 'The box comes home with you. You open it six months later, on a Sunday, when you\'re finally ready.',
        effect: (p) => { p.m -= 5; p.r += 3; p.setMem('griefParentBelongings', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_parent_anniversary',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mem.griefParentBelongings &&
      !G.mem.griefParentAnniversary,
    text: 'Their birthday arrives — the first one. You wake up already knowing what day it is. You think about calling, and the thought ends before it begins. In the evening your sibling sends a message with no words, just the date. You send one back. It is enough.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 5; p.setMem('griefParentAnniversary', true) },
  },

  {
    id: 'grief_parent_years_later',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.mem.griefParentFuneral &&
      !G.mem.griefParentYearsLater &&
      G.age >= 55,
    text: 'Years. A smell — the specific soap, or the particular food, or the quality of light on a late afternoon in autumn — and they are completely present for a moment, with all their specificity, and then not. You have learned to let this arrive without managing it. The loss is old now. It has a different weight.',
    choices: null,
    effect: (p) => { p.m += 3; p.r -= 5; p.setMem('griefParentYearsLater', true) },
  },

  // ── PARTNER DEATH ARC ────────────────────────────────────────────────────────

  {
    id: 'grief_partner_death',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.partner &&
      G.partner.alive === false &&
      !G.mem.griefPartnerFirst &&
      G.age >= 35,
    text: 'They are gone. You are in the hospital, or you are at home, or you are in the car in the hospital car park. The specific arrangement of the world without them is something you cannot yet picture. You understood, abstractly, that this day existed in the future. The abstract is now the present tense.',
    choices: [
      {
        text: 'Call someone — you should not be alone right now',
        tag: null,
        outcome: 'They come. The night is long and the company is real. You are grateful for it even as you don\'t fully register it.',
        effect: (p) => { p.m -= 22; p.r += 10; p.addFlag('partner_died'); p.setMem('griefPartnerFirst', true) },
      },
      {
        text: 'Go home alone',
        tag: null,
        outcome: 'The house is quiet in a way that is new. Every room is full of them. You do not sleep.',
        effect: (p) => { p.m -= 28; p.h -= 5; p.r += 12; p.addFlag('partner_died'); p.setMem('griefPartnerFirst', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_partner_first_night',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.griefPartnerFirst &&
      !G.mem.griefPartnerNight &&
      G.age >= 35,
    text: 'The first night. The bed is the same size. You are aware of the whole of it in a way you weren\'t when there were two of you. You wake at 3 AM and there is a second in which you have not remembered yet, and then you remember.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.r += 8; p.setMem('griefPartnerNight', true) },
  },

  {
    id: 'grief_partner_wrong_words',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.griefPartnerFirst &&
      !G.mem.griefPartnerWrongWords &&
      G.age >= 35,
    text: 'People say: at least they didn\'t suffer long. Or: they wouldn\'t want you to be sad. Or: time heals. Or: everything happens for a reason. You understand that these people love you and have nothing adequate to say and so they say what is available. You respond warmly. Afterward you sit somewhere quiet and feel the distance between what was said and what you needed.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.setMem('griefPartnerWrongWords', true) },
  },

  {
    id: 'grief_partner_in_laws',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mem.griefPartnerFirst &&
      !G.mem.griefPartnerInLaws &&
      G.age >= 35,
    text: 'Their family grieves differently from how you grieve. Some of them fold you in; some of them pull away — you are the reminder. The shared grief does not automatically make you close. You navigate the new arrangement with care: what holidays belong to which family now, what is kept, what is allowed to change.',
    choices: [
      {
        text: 'Stay connected — they are part of what remains',
        tag: null,
        outcome: 'The relationship shifts but continues. It is complicated and real.',
        effect: (p) => { p.m += 5; p.s += 3; p.setMem('griefPartnerInLaws', true) },
      },
      {
        text: 'Create some distance — you need to find your own way through',
        tag: null,
        outcome: 'The gap widens. You revisit this later, when you have more to give.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('griefPartnerInLaws', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_partner_dating_again',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.mem.griefPartnerFirst &&
      !G.partner &&
      !G.mem.griefPartnerDating &&
      G.age >= 50,
    text: 'Someone suggests — gently, carefully — that you might consider meeting people. They are not wrong that you are lonely. The question you cannot resolve is whether going on a date is a betrayal, and the answer you arrive at eventually is: they would not have wanted this for you, this specific kind of alone. You make the profile. You feel guilty. You go on the date.',
    choices: [
      {
        text: 'Give it a real chance',
        tag: null,
        outcome: 'The person is kind. Not a replacement — nothing like that is possible. A different kind of company.',
        effect: (p) => { p.m += 8; p.r += 5; p.setMem('griefPartnerDating', true) },
      },
      {
        text: 'Not yet. Maybe next year.',
        tag: null,
        outcome: 'You delete the profile. The decision doesn\'t feel like defeat. It feels like accuracy.',
        effect: (p) => { p.m -= 3; p.r += 3; p.setMem('griefPartnerDating', true) },
      },
    ],
    effect: null,
  },

  // ── CHILD DEATH ARC ──────────────────────────────────────────────────────────

  {
    id: 'grief_miscarriage_loss',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.partner &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem.griefMiscarriage &&
      !G.mem.miscarriageEvent,
    text: 'The pregnancy ends at eleven weeks. The medical process is straightforward in the way that medicine can be. The grief is not. It fits none of the standard categories — no name, no memorial, no established protocol. People do not know what to say because the loss has no social script. You and your partner sit with something that is entirely yours.',
    choices: [
      {
        text: 'Talk about it together — don\'t let the silence grow',
        tag: null,
        outcome: 'You grieve together, imperfectly. The shared language you build around it becomes something.',
        effect: (p) => { p.m -= 12; p.r += 5; p.addFlag('experienced_loss'); p.setMem('griefMiscarriage', true) },
      },
      {
        text: 'Each of you grieves in your own way',
        tag: null,
        outcome: 'The silence is not unkind. It becomes a small unexplained distance. It resolves, or it doesn\'t.',
        effect: (p) => { p.m -= 16; p.r += 8; p.addFlag('experienced_loss'); p.setMem('griefMiscarriage', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_child_young_death',
    phase: 'midlife',
    weight: 1,
    when: (G) =>
      G.children && G.children.length > 0 &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem.griefChildDeath &&
      Math.random() < 0.03,
    text: (G) => {
      const child = G.children[0]
      return `${child?.name ?? 'Your child'} dies. There is no way to write this. No parent expects to outlive their child. The grief is not an arc with a resolution — it is a reorganization. Everything after has a different shape.`
    },
    choices: null,
    effect: (p) => { p.m -= 35; p.h -= 10; p.r += 25; p.addFlag('lost_child'); p.addFlag('bereaved'); p.setMem('griefChildDeath', true) },
  },

  {
    id: 'grief_child_loss_marriage',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.partner &&
      !G.mem.griefChildMarriage,
    text: 'You and your partner are in the same grief but it moves differently through each of you. One of you needs to talk; the other goes silent. One of you wants to remember; the other needs to look away. There is no wrong way to grieve and yet you keep finding each other doing it wrong.',
    choices: [
      {
        text: 'Find a therapist who works with bereaved parents',
        tag: null,
        outcome: 'The sessions are difficult and necessary. The relationship does not break. This is not guaranteed and you know it.',
        effect: (p) => { p.m -= 5; p.r -= 5; p.setMentalHealth({ therapy: true }); p.setMem('griefChildMarriage', true) },
      },
      {
        text: 'Keep going — you don\'t have room for more right now',
        tag: null,
        outcome: 'The distance becomes habitual. Some of it resolves on its own. Some of it doesn\'t.',
        effect: (p) => { p.m -= 12; p.r += 10; p.setMem('griefChildMarriage', true) },
      },
    ],
    effect: null,
  },

  // ── SIBLING DEATH ────────────────────────────────────────────────────────────

  {
    id: 'grief_sibling_call',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      !G.flags.includes('lost_sibling') &&
      !G.mem.griefSiblingCall &&
      G.age >= 30 &&
      Math.random() < 0.04,
    text: (G) => {
      const sib = G.siblings[0]
      return `${sib?.name ?? 'Your sibling'} dies suddenly. An accident, or a diagnosis that moved faster than expected. They are the same age as you — or younger — and that is the specific thing you cannot stop returning to.`
    },
    choices: null,
    effect: (p) => { p.m -= 22; p.r += 12; p.addFlag('lost_sibling'); p.setMem('griefSiblingCall', true) },
  },

  {
    id: 'grief_sibling_family_dynamic',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_sibling') &&
      !G.mem.griefSiblingDynamic,
    text: 'Without your sibling, you are the oldest, or you are alone, or there is one fewer person who shared the original version of your family. The surviving configuration is different. You find yourself playing roles that were theirs — or assuming relationships with your parents that used to be mediated through them.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.setMem('griefSiblingDynamic', true) },
  },

  {
    id: 'grief_sibling_inheritance',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_sibling') &&
      !G.mem.griefSiblingInherit,
    text: 'Their possessions need to go somewhere. Their family\'s needs intersect with your family\'s needs and with your parents\'s grief. An argument about who takes what becomes something more than an argument about objects. The objects are not the point and everyone knows it.',
    choices: [
      {
        text: 'Take what\'s meaningful. Let the rest go.',
        tag: null,
        outcome: 'The object you keep is small. You keep it somewhere visible.',
        effect: (p) => { p.m -= 5; p.r -= 3; p.setMem('griefSiblingInherit', true) },
      },
      {
        text: 'Let others take what they need first',
        tag: null,
        outcome: 'There is something of theirs left you want and didn\'t ask for. You tell yourself it doesn\'t matter.',
        effect: (p) => { p.m -= 8; p.r += 5; p.karma += 5; p.setMem('griefSiblingInherit', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND DEATH ─────────────────────────────────────────────────────────────

  {
    id: 'grief_friend_too_young',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.friends && G.friends.length > 0 &&
      !G.flags.includes('lost_friend') &&
      !G.mem.griefFriendYoung &&
      G.age >= 35 &&
      G.age <= 50 &&
      Math.random() < 0.06,
    text: (G) => {
      const friend = G.friends[0]
      return `${friend?.name ?? 'A close friend'} dies. They are the same age as you, within a year or two. The specific wrongness of this — the too-soon quality — is something that does not process the way older deaths do. You keep expecting to see them somewhere.`
    },
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('lost_friend'); p.setMem('griefFriendYoung', true) },
  },

  {
    id: 'grief_friend_suicide',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      G.friends && G.friends.length > 0 &&
      !G.mem.griefFriendSuicide &&
      G.age >= 20 && G.age <= 45 &&
      Math.random() < 0.03,
    text: (G) => {
      const friend = G.friends[0]
      return `${friend?.name ?? 'Your friend'} dies by suicide. The grief has a specific texture — the looking back, the reconstructing, the question of what you missed and whether it was missable. People say you could not have known. You spend years understanding what that means and does not mean.`
    },
    choices: [
      {
        text: 'Reach out to others in your shared circle — you are all carrying this',
        tag: null,
        outcome: 'The group holds together. The shared grief is also shared memory. They are not gone from the conversation.',
        effect: (p) => { p.m -= 18; p.r += 12; p.addFlag('lost_friend'); p.addFlag('bereaved'); p.setMem('griefFriendSuicide', true) },
      },
      {
        text: 'Grieve privately — you need to find your own way through this',
        tag: null,
        outcome: 'The grief sits in you without anyone to compare it to. It takes longer than it might have. It is yours.',
        effect: (p) => { p.m -= 22; p.h -= 5; p.r += 15; p.addFlag('lost_friend'); p.addFlag('bereaved'); p.setMem('griefFriendSuicide', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_friend_group_reorganizes',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_friend') &&
      G.friends && G.friends.length > 0 &&
      !G.mem.griefFriendGroup,
    text: 'Your friend group, without them, is different. Not broken — different. The dynamics shift. Someone takes on a role that was theirs. Some gatherings stop. New ones begin with a slightly different shape. The group mourns together and then, slowly, continues.',
    choices: null,
    effect: (p) => { p.m -= 6; p.s += 2; p.setMem('griefFriendGroup', true) },
  },

  // ── PROLONGED GRIEF ──────────────────────────────────────────────────────────

  {
    id: 'grief_prolonged',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('bereaved') &&
      !G.mem.griefProlonged &&
      G.age >= 40 &&
      G.stats.happiness < 40,
    text: 'Three years. The grief is as raw as the first year. This is not, it turns out, a universally normal trajectory. Most people\'s acute grief restructures itself over time. Yours has not. You are not failing at grief. But you are not moving through it either. Someone uses the term prolonged grief disorder. There is a treatment for it.',
    choices: [
      {
        text: 'Seek specialized grief therapy',
        tag: null,
        outcome: 'The work is different from ordinary therapy — targeted, focused, uncomfortable. It opens things up that three years of not-touching had sealed.',
        effect: (p) => { p.m += 10; p.r -= 8; p.h += 4; p.setMentalHealth({ therapy: true }); p.addFlag('processed_grief'); p.setMem('griefProlonged', true) },
      },
      {
        text: 'Try to find your own way through',
        tag: null,
        outcome: 'It takes longer. You find a way, eventually, of carrying it differently.',
        effect: (p) => { p.m -= 5; p.r += 5; p.setMem('griefProlonged', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_drinking',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('bereaved') &&
      !G.mem.griefDrinking &&
      G.age >= 30,
    text: 'The drinking started as a practical matter — a way to get through the evenings. The evenings are the hardest part: the hours when there used to be someone else in the house. Now you notice you are buying more, and calculating when is too early to open it, and having the second glass before the first one is finished. This is not a path you chose. You are on it.',
    choices: [
      {
        text: 'Recognize it and pull back',
        tag: null,
        outcome: 'You tell one person. You find other ways to fill the evenings. The urge doesn\'t disappear but the habit loosens.',
        effect: (p) => { p.m -= 5; p.h += 4; p.karma += 3; p.addFlag('grief_drinking'); p.setMem('griefDrinking', true) },
      },
      {
        text: 'It is how you\'re getting through it',
        tag: null,
        outcome: 'The evenings pass. The cost accumulates in the body and the morning clarity.',
        effect: (p) => { p.m -= 3; p.h -= 8; p.addFlag('grief_drinking'); p.addFlag('drinks_heavily'); p.setMem('griefDrinking', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_therapist_specialist',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('bereaved') &&
      !G.mentalHealth.therapy &&
      !G.mem.griefTherapy &&
      G.age >= 35,
    text: 'A grief counsellor is different from a general therapist. She does not try to reframe the loss or find the lesson. She asks what you miss specifically. The first question is: what did they smell like. You answer it. The answer opens something. You sit there for the full hour with it open.',
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 8; p.setMentalHealth({ therapy: true }); p.setMem('griefTherapy', true) },
  },

  {
    id: 'grief_shifts',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.includes('bereaved') &&
      !G.mem.griefShifts &&
      G.age >= 55,
    text: 'The grief has not ended. You understand now that it won\'t end — that expecting it to end was the wrong frame. What happened is that it changed shape. It is still heavy, but the carrying has become familiar. You have built the muscles for it. You do not carry it the way you did at the beginning. You carry it the way you carry everything that is yours: continuously, without thinking about it, the way you breathe.',
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 8; p.addFlag('acceptance'); p.setMem('griefShifts', true) },
  },

  // ── PARENT DEATH FOLLOW-UP ───────────────────────────────────────────────────

  {
    id: 'grief_parent_house',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_parent') &&
      !G.mem.griefParentHouse &&
      G.age >= 35,
    text: 'You are the one who volunteered to clear the house. Or you were assigned it, which amounts to the same thing. The practical inventory of a life: the drawer with the rubber bands and the dead batteries and the envelope of photos from the seventies. The coat still hanging by the door. The specific smell of the room that you now understand is temporary — in six months the new people will repaint and the smell will be gone and that will be that.',
    choices: [
      {
        text: 'Take your time — this is the last time the house is theirs',
        tag: null,
        outcome: 'You take three days. You find things you did not know existed. You keep some of them and it is the right decision.',
        effect: (p) => { p.m -= 12; p.r += 5; p.addFlag('cleared_parent_home'); p.setMem('griefParentHouse', true) },
      },
      {
        text: 'Clear it efficiently — the drawn-out version is not kinder',
        tag: null,
        outcome: 'You do it in a weekend. The efficiency is real but the things you did not slow down for stay with you.',
        effect: (p) => { p.m -= 16; p.r += 10; p.addFlag('cleared_parent_home'); p.setMem('griefParentHouse', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'grief_parent_first_holiday',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_parent') &&
      !G.mem.griefParentHoliday &&
      G.age >= 35,
    text: 'The first holiday without them. You do not fully account for it in advance. Then the day arrives and the phone number you have had for thirty years would just ring. The space where the call used to go is real. You sit through it. The family gathers and doesn\'t quite know what to do with the absence either, and you collectively construct something that is not quite the old version but is not nothing.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.setMem('griefParentHoliday', true) },
  },

  {
    id: 'grief_parent_inheritance',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_parent') &&
      !G.mem.griefParentInheritance &&
      G.siblings && G.siblings.filter(s => s.alive).length > 0 &&
      G.age >= 35,
    text: 'The solicitor reads the will. The amounts are smaller than you expected or larger than you expected, but the thing that lands is the item your parent specified by name: the piano, the watch, the ring from their own mother. Your sibling expected it. You can see it in their face. The grief goes somewhere complicated and you do not speak about the will at the reception.',
    choices: [
      {
        text: 'Let it go — it isn\'t worth the relationship',
        tag: null,
        outcome: 'You say nothing at the time. Two weeks later you write your sibling a short note. They call. The call is brief and real.',
        effect: (p) => { p.m -= 5; p.karma += 10; p.r += 4; p.setMem('griefParentInheritance', true) },
      },
      {
        text: 'Raise it directly — this is something that needs to be said',
        tag: null,
        outcome: 'The conversation is harder than expected and more honest than you expected. It resolves something that would otherwise have sat for years.',
        effect: (p) => { p.m -= 8; p.s += 5; p.r -= 4; p.setMem('griefParentInheritance', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND DEATH FOLLOW-UP ───────────────────────────────────────────────────

  {
    id: 'grief_friend_death_followup',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('friend_died') &&
      !G.mem.griefFriendFollowup &&
      G.age >= 35,
    text: 'The group chat goes quiet for a week. Then someone posts an ordinary thing — something they would have laughed at — and the act of sending it is grief in a language you didn\'t know the group used. You screenshot it. You don\'t know why. The person who isn\'t in the chat anymore would have had the best reply.',
    choices: [
      {
        text: 'Keep the group alive — it\'s what they would have wanted',
        tag: null,
        outcome: 'You suggest a gathering. People come. The seat that\'s empty is present in the room. You eat and drink and talk about them for two hours and the weight is less afterward.',
        effect: (p) => { p.m += 6; p.s += 5; p.karma += 5; p.setMem('griefFriendFollowup', true) },
      },
      {
        text: 'Step back — you need time to process alone',
        tag: null,
        outcome: 'The distance is protective for a while. When you rejoin, something has shifted in the group that you may have contributed to.',
        effect: (p) => { p.m -= 5; p.r += 6; p.setMem('griefFriendFollowup', true) },
      },
    ],
    effect: null,
  },

  // ── SIBLING DEATH FOLLOW-UP ──────────────────────────────────────────────────

  {
    id: 'grief_sibling_death_followup',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('lost_sibling') &&
      !G.mem.griefSiblingFollowup &&
      G.age >= 35,
    text: 'You are now the sibling who is left. The word "brother" or "sister" in a sentence now refers to someone who is gone, and you are still learning how to use the word in the past tense when the present tense was the only tense it had for forty years. Your parents, if they are still alive, are doing something more specific — outliving a child — and the grief in the house is layered in a way you cannot fully map.',
    choices: [
      {
        text: 'Be present for your parents\' grief as well as your own',
        tag: null,
        outcome: 'The grief passes between you and them like something shared rather than doubled. Neither of you is less sad. Both of you are less alone.',
        effect: (p) => { p.m -= 10; p.karma += 10; p.s += 4; p.addFlag('sibling_death_witness'); p.setMem('griefSiblingFollowup', true) },
      },
      {
        text: 'Find your own way to grieve it',
        tag: null,
        outcome: 'The grief goes internal. You process it in ways that are private and genuine and leave a mark.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('sibling_death_witness'); p.setMem('griefSiblingFollowup', true) },
      },
    ],
    effect: null,
  },

]
