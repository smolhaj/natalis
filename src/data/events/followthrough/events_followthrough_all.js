// Consolidated follow-through events — all 29 original files merged.
// Design rule: every event here REQUIRES a specific prior flag as its gate.
// The event exists because the flag represents something that shaped the character
// and should surface again, changed by time.

export const FOLLOWTHROUGH_ALL_EVENTS = [

// ============================================================
// events_followthrough.js
// ============================================================

// ── RACISM / DISCRIMINATION ──────────────────────────────────────────────────

  {
    id: 'ft_racism_career_ceiling',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('experienced_racism') && G.career && G.age >= 32,
    text: 'A promotion is announced. The name is not yours. You know how to read the room by now — who gets considered without asking, who has to make the case. You have been making the case for years.',
    choices: [
      {
        text: 'Raise it formally.',
        tag: 'challenged_workplace_discrimination',
        outcome: 'You raise it. The conversation is uncomfortable and probably necessary. Nothing changes immediately.',
        effect: (p) => { p.karma += 6; p.m -= 8; p.e += 3 },
      },
      {
        text: 'Absorb it.',
        tag: 'absorbed_workplace_discrimination',
        outcome: 'You absorb it. You have absorbed things before. You are very good at it.',
        effect: (p) => { p.r += 5; p.m -= 6 },
      },
      {
        text: 'Start looking elsewhere.',
        tag: 'left_due_to_discrimination',
        outcome: 'You update your CV that night. The decision feels like reclaiming something.',
        effect: (p) => { p.karma += 4; p.m += 2 },
      },
    ],
  },

  {
    id: 'ft_double_consciousness_daily',
    phase: null,
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('double_consciousness') && G.age >= 26 && G.career,
    text: 'You have two versions of yourself — the one that works in the room you\'re in, and the one that goes home. You have made this work for years. Some days it costs something that doesn\'t have a name.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  // ── LGBTQ FOLLOW-THROUGH ─────────────────────────────────────────────────────

  {
    id: 'ft_lgbtq_family_rejection_letter',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('lgbtq_family_rejection') && G.age >= 32 && !G.mem?.lgbtqFamilyLetterAck,
    text: 'A letter arrives from your family. You don\'t open it for two days. When you do, you sit with what it says for a long time.',
    choices: [
      {
        text: 'Reply.',
        tag: 'lgbtq_family_reconciliation_attempt',
        outcome: 'You write back. Whether it leads anywhere is not yet clear. The attempt is the thing.',
        effect: (p) => { p.karma += 5; p.m += 2; p.setMem('lgbtqFamilyLetterAck', true) },
      },
      {
        text: 'File it.',
        tag: 'lgbtq_family_letter_filed',
        outcome: 'Some offers of reconnection come too late to be exactly what they claim to be. You have built a life without them.',
        effect: (p) => { p.m -= 4; p.r += 3; p.setMem('lgbtqFamilyLetterAck', true) },
      },
    ],
  },

  {
    id: 'ft_lgbtq_out_years_later',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('lgbtq_out_family') && G.age >= 30 && !G.mem?.lgbtqOutYearsAck,
    text: 'It has been years since you came out. Some of the fear has simply gone. The rest became background noise — present, but no longer the loudest thing.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('lgbtqOutYearsAck', true) },
  },

  // ── POST-TRAUMA / ABUSE ──────────────────────────────────────────────────────

  {
    id: 'ft_abusive_rel_new_partnership',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('abusive_relationship') && G.partner && !G.flags.has('abusive_rel_new_partner_ack'),
    text: (G) => { const pn = G.partner.name ?? 'your partner'; return `Something ${pn} says — a tone, not even a word — and you are somewhere else for a second. You come back. ${pn} doesn't know where you went.` },
    choices: null,
    effect: (p) => { p.m -= 4; p.addFlag('abusive_rel_new_partner_ack') },
  },

  {
    id: 'ft_abusive_rel_therapy',
    phase: 'young_adult',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('abusive_relationship') && !G.flags.has('went_to_therapy') && G.age >= 24 && !G.mem?.abusiveRelTherapyAck,
    text: 'A friend mentions therapy in passing. Not at you — just mentions it. You think about what happened. You have thought about it before but not like this.',
    choices: [
      {
        text: 'Make an appointment.',
        tag: 'went_to_therapy',
        outcome: 'The first session is the hardest. You go back.',
        effect: (p) => { p.m += 6; p.h += 3; p.setMentalHealth({ therapy: true }); p.setMem('abusiveRelTherapyAck', true) },
      },
      {
        text: 'Not yet.',
        outcome: 'Not yet. You know what not yet means.',
        effect: (p) => { p.r += 3; p.setMem('abusiveRelTherapyAck', true) },
      },
    ],
  },

  // ── CHILD MARRIAGE / FLED ────────────────────────────────────────────────────

  {
    id: 'ft_fled_child_marriage_identity',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('fled_child_marriage') && G.age >= 20 && G.age <= 32 && !G.mem?.fledChildMarriageIdAck,
    text: 'You are building the life that didn\'t happen to you. You are good at this. You are also still carrying the version that almost was — not as regret, exactly, but as something that takes up space.',
    choices: null,
    effect: (p) => { p.e += 3; p.karma += 4; p.setMem('fledChildMarriageIdAck', true) },
  },

  // ── COMMUNIST / AUTHORITARIAN CHILDHOOD ──────────────────────────────────────

  {
    id: 'ft_communist_childhood_after',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('communist_childhood') && G.age >= 35 && G.currentYear >= 1993,
    text: 'You remember when things were certain. The certainty was false — you understand that now. But the feeling of it. The feeling that there was a plan, that someone had a plan, that you were part of it.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  {
    id: 'ft_authoritarian_childhood_authority',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('authoritarian_childhood') && G.career && G.age >= 24,
    text: 'Your manager wants to speak with you. The old reflex activates before you can stop it — the specific bracing of someone who grew up knowing that authority means news you weren\'t expecting.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 2 },
  },

  // ── HEALTH FOLLOW-THROUGH ────────────────────────────────────────────────────

  {
    id: 'ft_cancer_survivor_scan',
    phase: null,
    weight: 3,
    cooldown: 3,
    when: (G) => G.flags.has('cancer_survivor') && G.age >= 35,
    text: 'Your annual scan. The results come back clear. You stand outside the clinic for a while before you can make yourself move. Each year this gets a little easier and also never gets easier.',
    choices: null,
    effect: (p) => { p.m += 5; p.h += 2 },
  },

  {
    id: 'ft_food_insecurity_pantry',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('food_insecurity') && G.money > 5000 && !G.mem?.foodInsecurityPantryAck,
    text: 'The pantry is full. You still check it every morning — the old habit. You are not sure when it became compulsive and when it became something you\'ve made a kind of peace with.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('foodInsecurityPantryAck', true) },
  },

  // ── EDUCATION / CLASS FOLLOW-THROUGH ────────────────────────────────────────

  {
    id: 'ft_first_gen_child_applies',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('first_gen_university') && (G.children ?? []).some(c => c.age >= 17) && !G.mem?.firstGenChildApplyAck,
    text: 'Your child is filling out university applications. You sit with the forms. The forms are different now but the feeling is the same — the first person in a family doing something for the first time, and the weight of that.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 5; p.setMem('firstGenChildApplyAck', true) },
  },

  {
    id: 'ft_education_denied_returns',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('education_denied_gender') && G.age >= 35 && !G.mem?.educationDeniedReturnAck,
    text: 'An adult literacy programme. Your daughter is younger than your teacher. You sit in the chair and pick up the pencil. You are late and also exactly on time.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 6; p.karma += 5; p.setMem('educationDeniedReturnAck', true) },
  },

  // ── EMIGRATION FOLLOW-THROUGH ────────────────────────────────────────────────

  {
    id: 'ft_emigrant_decade',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('emigrated') && (G.yearsAbroad ?? 0) >= 10 && !G.mem?.emigrantDecadeAck,
    text: (G) => `Ten years since you arrived. The country is in your muscle memory now — you don\'t have to think about which side of the pavement to walk on. The other country is in your dreams.`,
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('emigrantDecadeAck', true) },
  },

  {
    id: 'ft_emigrant_home_visit',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('emigrated') && (G.yearsAbroad ?? 0) >= 4 && !G.mem?.emigrantHomeVisitAck,
    text: 'You go back to visit. Everything is the same and nothing is the same. You understand within an hour that you are the thing that changed.',
    choices: [
      {
        text: 'Stay longer than planned.',
        tag: 'extended_home_visit',
        outcome: 'Another week. It doesn\'t resolve anything but it gives you more to hold.',
        effect: (p) => { p.m += 4; p.setMem('emigrantHomeVisitAck', true) },
      },
      {
        text: 'Keep to the plan.',
        outcome: 'The flight home feels different from the flight here. Both feel like going home, which is its own kind of problem.',
        effect: (p) => { p.r += 3; p.setMem('emigrantHomeVisitAck', true) },
      },
    ],
  },

  // ── CAREER FOLLOW-THROUGH ────────────────────────────────────────────────────

  {
    id: 'ft_career_defining_work_echo',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('career_defining_work') && G.age >= 55 && !G.mem?.careerDefiningEchoAck,
    text: 'A younger colleague mentions your work unprompted — uses it as a reference, as a standard. You didn\'t know it had traveled that far.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 5; p.setMem('careerDefiningEchoAck', true) },
  },

  // ── CASTE FOLLOW-THROUGH ────────────────────────────────────────────────────

  {
    id: 'ft_defied_caste_social_cost',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('defied_caste') && G.casteSystem && G.age >= 28,
    text: 'You have not been invited to certain things. You have not been told why. The cost of what you chose has been specific and ongoing. You have decided it was worth it — you make this decision again each year.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 6 },
  },

  // ── STATE SURVEILLANCE FOLLOW-THROUGH ────────────────────────────────────────

  {
    id: 'ft_interrogated_hypervigilance',
    phase: null,
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('interrogated_by_state') && G.age >= 26,
    text: 'You catch yourself doing it again — reading a room before you enter it, noting exits, listening to nearby conversations. The interrogation ended years ago. The habits it built have not.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3 },
  },

  {
    id: 'ft_learned_silence_meeting',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('learned_silence') && G.career,
    text: 'There was a meeting where you knew something. You didn\'t say it. Afterward you sat with the old familiar feeling — having chosen correctly and still losing something.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2 },
  },

  // ── LOSS FOLLOW-THROUGH ───────────────────────────────────────────────────────

  {
    id: 'ft_lost_friend_photo',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('lost_friend') && G.age >= 40 && !G.mem?.lostFriendPhotoAck,
    text: 'You find an old photo. Your friend is in it. You both look young. You sit with this for a while — not grief exactly, not anymore, but something that lives in the same neighbourhood.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.setMem('lostFriendPhotoAck', true) },
  },

  {
    id: 'ft_boarding_school_memory',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('boarding_school') && G.age >= 32 && !G.mem?.boardingSchoolMemoryAck,
    text: 'You pass a building that looks like it. The smell reaches you before the sight does — a specific clean institutional smell — and you are seven years old for a moment. Then you are not.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('boardingSchoolMemoryAck', true) },
  },

  {
    id: 'ft_rural_to_urban_return',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('rural_to_urban') && G.age >= 40 && !G.mem?.ruralUrbanReturnAck,
    text: 'You go back to the village. The people who stayed have aged the same amount you have, which shouldn\'t be surprising. You have nothing to complain about. You also have nothing here anymore.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('ruralUrbanReturnAck', true) },
  },

  {
    id: 'ft_criminal_record_form',
    phase: null,
    weight: 3,
    cooldown: 4,
    when: (G) => (G.criminalRecord ?? []).length > 0 && G.career && G.age >= 22 && G.age <= 50,
    text: 'A form. The form always asks. You have learned to pause here, to have your explanation ready, to read the person across the desk before you decide how much to offer.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 2 },
  },

// ============================================================
// events_followthrough_2.js
// ============================================================

// ── LGBTQ RELATIONSHIP ECHO ──────────────────────────────────────────────────
  // The first relationship you had that was actually you.

  {
    id: 'ft2_lgbtq_relationship_echo',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('lgbtq_had_relationship') && G.age >= 22 && !G.mem?.lgbtqRelEchoAck,
    text: 'The relationship is years behind you now. What you carry from it isn\'t what you expected. Not the loss — the recognition. Someone saw you specifically, not the version of yourself you were performing for everyone else. That doesn\'t stop mattering.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('lgbtqRelEchoAck', true) },
  },

  // ── ABORTION ECHO ────────────────────────────────────────────────────────────
  // A date that comes around.

  {
    id: 'ft2_abortion_echo',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_abortion') && G.age >= 28 && !G.mem?.abortionEchoAck,
    text: 'A date passes each year that you notice but don\'t name. You didn\'t decide to notice it. You just do.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('abortionEchoAck', true) },
  },

  {
    id: 'ft2_abortion_next_pregnancy',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_abortion') && G.flags.has('pregnant') &&
      !G.mem?.abortionNextPregnancyAck,
    text: 'This pregnancy is different from the last one, in the most relevant sense. You hold both at once. You are allowed to hold both at once.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('abortionNextPregnancyAck', true) },
  },

  // ── WAR CHILDHOOD REFLEX ─────────────────────────────────────────────────────
  // What the body learned doesn't unlearn easily.

  {
    id: 'ft2_war_childhood_reflex',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('war_childhood') && G.age >= 19,
    text: 'A door slams somewhere in the building. You are flat against the wall before you know you moved. Then you are standing in a hallway in a city where there is no war. Which is the whole point.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  {
    id: 'ft2_war_childhood_news',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('war_childhood') && G.age >= 30,
    text: 'News footage of another country\'s conflict. You watch it differently from people who didn\'t grow up near one — not with distance, but with specific recognition. The noise a city makes when it stops being ordinary. You know that sound.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  // ── BETRAYAL TRUST PATTERNS ──────────────────────────────────────────────────
  // What you learned about people at fifteen.

  {
    id: 'ft2_betrayal_trust_pattern',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('betrayal_adolescence') && G.age >= 22,
    text: 'A friendship is going well. Exactly when it reaches a certain depth, something in you slows down. You have done this before — reached a point and then started waiting for the thing that happens at this point.',
    choices: [
      {
        text: 'Notice it. Keep going anyway.',
        tag: null,
        outcome: 'You push past the reflex. It costs something. This is probably the right cost.',
        effect: (p) => { p.m += 4; p.s += 3; p.karma += 3 },
      },
      {
        text: 'Step back before it can happen again.',
        tag: null,
        outcome: 'The friendship doesn\'t end. It levels off. This is a kind of safety.',
        effect: (p) => { p.r += 4; p.m -= 2 },
      },
    ],
  },

  // ── HARVEST FAILURE / FOOD INSECURITY ECHO ───────────────────────────────────
  // The arithmetic of dry ground doesn't leave you.

  {
    id: 'ft2_harvest_failure_weather',
    phase: 'midlife',
    weight: 2,
    cooldown: 6,
    when: (G) => G.flags.has('harvest_failure') && G.age >= 28,
    text: 'A dry summer. The forecast says rain next week. Something in you reads it differently than a forecast — you have felt this before. The arithmetic of dry ground and time. The specific patience of waiting for rain that might not come.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2 },
  },

  // ── CIVIL WAR LIVED ──────────────────────────────────────────────────────────
  // Carrying a country that burned.

  {
    id: 'ft2_civil_war_midlife',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('civil_war_lived') && G.age >= 30,
    text: 'Someone asks where you\'re from. You say the name of the country. You do not say: the version of the country that existed when I was a child. You do not say: the version that doesn\'t exist anymore. You just say the name.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  {
    id: 'ft2_civil_war_young_adult',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('civil_war_lived') && G.age >= 20 && G.age <= 30 && !G.mem?.civilWarYAack,
    text: 'You are building a life in a country that was at war when you were small. The country and you both carry the same years differently. You are not sure which of you has healed more.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('civilWarYAack', true) },
  },

  // ── ETHNIC MINORITY CONFLICT ─────────────────────────────────────────────────
  // The country that happened to you.

  {
    id: 'ft2_ethnic_minority_daily',
    phase: null,
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('ethnic_minority_conflict') && G.age >= 22,
    text: 'Someone asks where you\'re really from. You have several answers ready — the quick one, the longer one, the accurate one that takes a sentence to explain — and you have learned to read the room before choosing.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2 },
  },

  {
    id: 'ft2_ethnic_minority_career',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('ethnic_minority_conflict') && G.career && G.age >= 30,
    text: 'A room. The configuration of who is in it. You read this kind of room quickly, automatically, in a way that people who haven\'t needed to don\'t. You are never quite only a professional in rooms like this.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2 },
  },

  // ── REFUGEE ANNIVERSARY ──────────────────────────────────────────────────────
  // The date on the documents.

  {
    id: 'ft2_refugee_anniversary',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => (G.flags.has('refugee') || G.residencyStatus === 'refugee_status') &&
      G.age >= 18 && !G.mem?.refugeeAnniversaryAck,
    text: 'The date on the documents is the date you crossed. You didn\'t choose this date. It chose you. You have had birthdays since then. This other date also comes around every year.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('refugeeAnniversaryAck', true) },
  },

  {
    id: 'ft2_refugee_residency_milestone',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('refugee') && G.flags.has('resettlement_established') &&
      G.age >= 25 && !G.mem?.refugeeMilestoneAck,
    text: 'You have been here longer than you were there. The arithmetic of this takes a moment to process when you first do it. You do it again to check. You are from two places now, in different proportions.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.setMem('refugeeMilestoneAck', true) },
  },

  // ── DISSIDENT READER ─────────────────────────────────────────────────────────
  // The books you read when they were dangerous.

  {
    id: 'ft2_dissident_books_hiding',
    phase: null,
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('dissident_reader') && G.age >= 22,
    text: (G) => {
      const isAuth = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)
      if (isAuth) {
        return 'The books are still in the house. You don\'t display them. The habit of how they are placed — spine inward, cover facing down — is so automatic you only notice it when someone else does.'
      }
      return 'The books from that period are on the shelf now, visible. You live somewhere where this is not a risk. You are aware that this fact requires no commentary and you still find yourself thinking about it.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2 },
  },

  {
    id: 'ft2_dissident_reader_career',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('dissident_reader') && G.career && G.age >= 22 && !G.mem?.dissidentCareerAck,
    text: (G) => {
      const isAuth = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)
      if (isAuth) {
        return 'A colleague mentions a name — an author, an idea — in a way that is a test. You know how to fail this test safely. You are very good at it by now.'
      }
      return 'A colleague has not read the things you read in the years when reading them meant something. You explain. You notice that without the risk, the books mean something slightly different. This is not a complaint.'
    },
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('dissidentCareerAck', true) },
  },

  // ── EXPLICIT CHOICE CALLBACKS ────────────────────────────────────────────────
  // Events that name a prior decision and its weight in the present tense.

  {
    id: 'ft2_turned_down_opportunity',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('turned_down_opportunity') && G.age >= 35 && !G.mem?.turnedDownCallbackAck,
    text: 'You think sometimes about the thing you didn\'t take. Not with regret exactly — more like curiosity. A parallel version of you made a different choice in that room. You have no way of knowing if that version is better. You have built what you have.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('turnedDownCallbackAck', true) },
  },

  {
    id: 'ft2_chose_loyalty_over_truth',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('chose_loyalty') && G.age >= 34 && !G.mem?.loyaltyCallbackAck,
    text: 'The thing you didn\'t say in that room is still with you. You chose the person over the principle. You are not sure yet whether that was wisdom or cowardice and you may never be. The person you protected doesn\'t know what you did.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('loyaltyCallbackAck', true) },
  },

  {
    id: 'ft2_person_you_reported',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('reported_someone') && G.age >= 30 && !G.mem?.reportedCallbackAck,
    text: 'You made a report once. You don\'t know what happened to the person after. You have told yourself several things about this over the years, depending on the year.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('reportedCallbackAck', true) },
  },

// ============================================================
// events_followthrough_3.js
// ============================================================

// ── OUT (LGBTQ openly living) ─────────────────────────────────────────────
  {
    id: 'ft3_out_ordinary_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.flags.has('out') || G.flags.has('lgbtq_outed_at_work') || G.flags.has('lgbtq_out_to_friend')) &&
      G.age >= 25 && G.age <= 38 &&
      !G.mem?.ft3_out_ordinary,
    text: 'Years after you came out, you notice that the word is gone from most conversations — not forgotten, just ordinary. You are simply yourself in most rooms now. The weight of it still surfaces occasionally: a comment, a form that has two options, a new colleague asking about your spouse with the wrong pronoun. But the vigilance has become background noise rather than the foreground. You have arrived somewhere you once could not see.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.setMem('ft3_out_ordinary', true); },
  },

  // ── IN_RECOVERY milestone ─────────────────────────────────────────────────
  {
    id: 'ft3_recovery_one_year',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('in_recovery') &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.ft3_recovery_yr1,
    text: 'One year. The number is arbitrary and isn\'t. The meetings keep calling it a milestone. You are not sure what you have built is permanent — you are not sure that\'s the right question. What you know is that a year ago you would not have been able to sit in a room with the thing you want and not take it. You can now. The person who comes in on day three and the person who holds a chip after a year are related but not identical.',
    choices: [
      {
        text: 'Mark it — the year matters',
        tag: null,
        outcome: 'You let yourself have it. Just once, you let the milestone be real.',
        effect: (p) => { p.m += 8; p.h += 3; p.karma += 5; p.setMem('ft3_recovery_yr1', true); },
        inject: null,
      },
      {
        text: 'Keep your head down — don\'t tempt the count',
        tag: null,
        outcome: 'Superstition or discipline — you\'re not sure which. You keep moving.',
        effect: (p) => { p.m += 4; p.h += 2; p.setMem('ft3_recovery_yr1', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FAITH_CRISIS / QUESTIONED_FAITH resolution ───────────────────────────
  {
    id: 'ft3_faith_settled',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('faith_crisis') || G.flags.has('questioned_faith')) &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft3_faith_settled,
    text: 'The crisis has been open for years now. You notice it has quietly resolved without closing — you have stopped asking the question that used to keep you awake, not because you found the answer but because you found a way to live around it. Whether that is maturity or surrender or something in between is not clear. What is clear: you are not the same person who walked out of the service, the yeshiva, the mosque, the skeptic\'s meeting room. You are whoever came after.',
    choices: [
      {
        text: 'You found your way back to something like faith',
        tag: null,
        outcome: 'Not the faith you had. A rebuilt one. More careful. Still yours.',
        effect: (p) => { p.m += 6; p.r -= 4; p.addFlag('faith_rebuilt'); p.setMem('ft3_faith_settled', true); },
        inject: null,
      },
      {
        text: 'You found your way out entirely',
        tag: null,
        outcome: 'The absence is not a wound anymore. It is a room you have furnished differently.',
        effect: (p) => { p.m += 4; p.e += 3; p.addFlag('secular_settled'); p.setMem('ft3_faith_settled', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── BEREAVED — first major holiday after loss ─────────────────────────────
  {
    id: 'ft3_bereaved_holiday',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bereaved') &&
      G.age >= 30 &&
      !G.mem?.ft3_bereaved_holiday,
    text: 'The first major holiday without them. Everyone agrees to keep it normal. The table is set the same way; the same dishes are made. In some families, the chair is left out. In others, it is quietly removed and the gap is treated as though it has always been the right number. Someone does the impression they used to do. Someone cries during it. Grief has a very specific shape during a meal with people who loved the same person you did.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.karma += 3; p.setMem('ft3_bereaved_holiday', true); },
  },

  // ── CHILD_CAME_OUT — parent 3+ years later ───────────────────────────────
  {
    id: 'ft3_child_out_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('child_came_out') &&
      G.age >= 45 &&
      !G.mem?.ft3_child_out_years,
    text: (G) => {
      const recent = G.flags.has('lgbtq_parent_rejection') || (G.children ?? []).some(c => (c.relationshipQuality ?? 50) < 35)
      if (recent) return 'Years have passed since your child came out to you. The distance between you has not closed the way you told yourself it would. The conversation you owe them has been postponed so many times it has become its own kind of statement.'
      return 'Years have passed since your child came out to you. What you thought would be a crisis became instead a chapter — one of many. Their life has not collapsed. If anything, the version of them you know now is more fully who they were always becoming. You think about the year you were afraid of this, and you find it harder to understand that person.'
    },
    choices: [
      {
        text: 'Tell them what it took you too long to say',
        tag: null,
        outcome: 'Something shifts. Not all the way back to before — forward, instead.',
        effect: (p) => { p.m += 10; p.karma += 8; p.updateChildRel(0, 12); p.setMem('ft3_child_out_years', true); },
        inject: null,
      },
      {
        text: 'Let it stay as it is',
        tag: null,
        outcome: 'The silence has a shape now. You have both learned to move around it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('ft3_child_out_years', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── INTEGRITY / PRINCIPLED — midlife career test ──────────────────────────
  {
    id: 'ft3_integrity_tested',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('integrity') || G.flags.has('principled')) &&
      G.career &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft3_integrity_tested,
    text: 'You are asked — politely, indirectly, in a way that could be misunderstood — to sign off on something that is not quite right. Not illegal. Not the kind of thing anyone will lose sleep over. It is the second time this year. The person asking is someone you work well with. The company needs the quarter to close a particular way. You have principles. You also have a mortgage.',
    choices: [
      {
        text: 'Decline — the same answer as always',
        tag: 'integrity',
        outcome: 'The colleague is gracious. The next quarter, they ask someone else. Your career does not collapse. It proceeds.',
        effect: (p) => { p.m -= 3; p.karma += 8; p.r -= 4; p.addFlag('integrity'); p.setMem('ft3_integrity_tested', true); },
        inject: null,
      },
      {
        text: 'This time, sign it — just this once',
        tag: null,
        outcome: 'You do. It closes. No one mentions it again. You mention it to yourself occasionally, at 3am, for the next three years.',
        effect: (p) => { p.m -= 6; p.r += 8; p.w += 4; p.setMem('ft3_integrity_tested', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FOUND_MEANING — late-life echo ────────────────────────────────────────
  {
    id: 'ft3_meaning_tested',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('found_meaning') &&
      G.age >= 68 &&
      !G.mem?.ft3_meaning_tested,
    text: 'The meaning you found — whenever it was, however it arrived — is now being tested by a body that is slower, by a world that has changed around you, by the specific diminishment that late life carries. You have a framework. The question is whether the framework holds when the circumstances that produced it are gone.',
    choices: [
      {
        text: 'It holds',
        tag: null,
        outcome: 'The meaning was never the circumstances. You understood that before. You understand it again now.',
        effect: (p) => { p.m += 8; p.r -= 6; p.setMem('ft3_meaning_tested', true); },
        inject: null,
      },
      {
        text: 'It needs rebuilding',
        tag: null,
        outcome: 'The rebuilding at seventy is slower than it was at forty. Not impossible. Slower.',
        effect: (p) => { p.m -= 3; p.e += 4; p.r += 3; p.setMem('ft3_meaning_tested', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── HAS_CLOSE_FRIEND — decade of friendship ───────────────────────────────
  {
    id: 'ft3_close_friend_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('has_close_friend') &&
      G.friends && G.friends.length > 0 &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.ft3_friend_decade,
    text: 'You have had this friendship for more than a decade now. The thing you notice is that you have stopped performing for them. You say the half-formed thought out loud, the embarrassing opinion, the fear that does not yet have a name. They do the same. It is not dramatic — most of what the friendship consists of is ordinary coordination: scheduling, logistics, checking in. But underneath that is the specific rarity of a person who has known you for long enough to have watched you change and still turns up.',
    choices: null,
    effect: (p) => { p.m += 8; p.updateFriendRel(0, 8); p.setMem('ft3_friend_decade', true); },
  },

// ============================================================
// events_followthrough_4.js
// ============================================================

// ── CASTE DISCRIMINATION ──────────────────────────────────────────────────────

  {
    id: 'ft4_caste_career_ceiling',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('caste_discrimination') &&
      G.career &&
      G.age >= 22,
    text: 'You put your name on the application. The shortlist comes back without it. A colleague — from the right family — is on it. This is not the first time. You have learned to read the result before it arrives. The question you have not answered is what to do with what you know.',
    choices: [
      {
        text: 'Name it — challenge the shortlist formally',
        tag: null,
        outcome: 'The challenge goes nowhere official. It changes the temperature in the room permanently.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.e += 3; },
      },
      {
        text: 'Build around it — find another route',
        tag: null,
        outcome: 'You find a path that doesn\'t require those doors. It takes longer. You take it.',
        effect: (p) => { p.m -= 3; p.e += 4; p.w += 3; },
      },
    ],
    effect: null,
  },

  // ── CORPORATE SCANDAL COVERED ─────────────────────────────────────────────────

  {
    id: 'ft4_corporate_scandal_resurfaces',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('corporate_scandal_covered') &&
      G.career &&
      G.age >= 45 &&
      !G.mem?.ft4CorporateScandalLate,
    text: 'A journalist has found something from fifteen years ago. Not everything — not the internal memo you still have in a personal folder — but enough to raise a question. You are asked by the communications team to prepare a statement. The statement they have drafted is not false. It is not the whole truth.',
    choices: [
      {
        text: 'Sign the statement as drafted',
        tag: null,
        outcome: 'The story runs, your statement runs. It passes. You are now further in than you were.',
        effect: (p) => { p.r += 10; p.m -= 8; p.setMem('ft4CorporateScandalLate', true); },
      },
      {
        text: 'Add what the statement is missing',
        tag: null,
        outcome: 'The full story creates a larger situation. So does telling the truth fifteen years late. You manage both.',
        effect: (p) => { p.m -= 5; p.karma += 12; p.w -= 8; p.setMem('ft4CorporateScandalLate', true); },
      },
    ],
    effect: null,
  },

  // ── BETRAYAL ADOLESCENCE ──────────────────────────────────────────────────────

  {
    id: 'ft4_betrayal_adult_trust',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('betrayal_adolescence') &&
      G.age >= 22,
    text: 'Someone new. Someone who seems safe. You find yourself listening to them describe something that requires trust, and you become aware of the gap between what you say and what you give access to. You do not close the door. You do not open it all the way.',
    choices: null,
    effect: (p) => { p.r += 3; p.s -= 2; },
  },

  // ── HARVEST FAILURE ───────────────────────────────────────────────────────────

  {
    id: 'ft4_harvest_failure_pantry',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('harvest_failure') &&
      G.money > 3000 &&
      G.age >= 30 &&
      !G.mem?.ft4HarvestPantry,
    text: 'You have money now — enough that the question of eating is not the question anymore. The year the rains didn\'t come is not something you explain to people who weren\'t there. What you have instead is a pantry stocked further than the week requires, and a specific unease around waste that your children find eccentric.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('ft4HarvestPantry', true); },
  },

  // ── CIVIL WAR LIVED ───────────────────────────────────────────────────────────

  {
    id: 'ft4_civil_war_news_echo',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) =>
      G.flags.has('civil_war_lived') &&
      G.age >= 30,
    text: 'The news covers a conflict somewhere. You watch the correspondent standing in front of a building you recognise from some internal archive — not the building specifically but the specific quality of the rubble, the specific posture of the children at the edge of the frame. You know what the correspondent does not say. You know what comes after the frame.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; },
  },

  // ── ETHNIC MINORITY CONFLICT ─────────────────────────────────────────────────

  {
    id: 'ft4_ethnic_minority_where_from',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) =>
      G.flags.has('ethnic_minority_conflict') &&
      G.career &&
      G.age >= 28,
    text: 'The question of where you are really from is a different question in your mouth than in the mouth of someone asking it. You have learned to answer the surface version — the city, the country — without engaging the deeper one, which is about belonging and has no short answer. Some days this is exhausting. Some days it is simply a thing you do.',
    choices: null,
    effect: (p) => { p.r += 3; p.s += 2; },
  },

  // ── DISSIDENT READER ─────────────────────────────────────────────────────────

  {
    id: 'ft4_dissident_reader_cost',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('dissident_reader') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian'].includes(G.regime) &&
      G.age >= 20,
    text: 'A colleague you thought you trusted asks what you have been reading lately. The question is casual. The question is never casual here. You name something safe. The specific cost of this is not large. The accumulated cost of all the times you name something safe is something you do not add up.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.e += 2; },
  },

  // ── REFUGEE: FIVE-YEAR ANNIVERSARY ───────────────────────────────────────────

  {
    id: 'ft4_refugee_five_years',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) =>
      (G.flags.has('refugee_arrived') || G.residencyStatus === 'refugee_status' || G.residencyStatus === 'permanent_resident') &&
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 5 &&
      G.age >= 20 &&
      !G.mem?.ft4RefugeeAnniversary,
    text: 'Five years since you arrived. You know the date the way you know a scar — not consciously, but there when you press it. The country is legible now: which bus goes where, what to say at the post office, the specific joke that means you belong to a group you did not choose. The other country has become the country of a version of yourself you can no longer exactly reach.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 5; p.setMem('ft4RefugeeAnniversary', true); },
  },

  // ── POLITICAL ACTIVE: REGIME COST ────────────────────────────────────────────

  {
    id: 'ft4_political_active_cost',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) =>
      G.flags.has('political_active') &&
      G.career &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime) &&
      G.age >= 30,
    text: 'Someone at work knows you were at the demonstration. This is not mentioned directly — that is not how it works. It surfaces as a reassignment, a meeting you were not included in, a small professional thing that is harder to name as cause and effect. The regime does not need to be explicit to be effective.',
    choices: null,
    effect: (p) => { p.m -= 6; p.w -= 3; p.karma += 5; },
  },

  // ── DISSIDENT WRITER: ARRESTED ────────────────────────────────────────────────

  {
    id: 'ft4_dissident_writer_risk',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('dissident_writer') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian'].includes(G.regime) &&
      G.age >= 22 &&
      !G.mem?.ft4DissidentWriterRisk,
    text: 'Someone passed one of your copies to someone who was not safe to pass it to. You find out through a third person, then through silence — the kind that means people are recalibrating. For three weeks you expect the knock. It does not come. You do not know if this means you are not worth arresting or not yet found. Either is temporary.',
    choices: [
      {
        text: 'Stop — burn whatever drafts remain',
        tag: null,
        outcome: 'The silence becomes permanent. You are safe. The work is gone.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('ft4DissidentWriterRisk', true); },
      },
      {
        text: 'Continue — carefully, more carefully',
        tag: null,
        outcome: 'You continue. Carefully. The fear becomes something you carry rather than something that stops you.',
        effect: (p) => { p.m -= 4; p.karma += 6; p.addFlag('artistic_integrity'); p.setMem('ft4DissidentWriterRisk', true); },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_5.js
// ============================================================

// ── CIVIL RIGHTS GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft5_civil_rights_legacy',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('civil_rights_generation') &&
      G.age >= 35 &&
      !G.mem?.ft5CivilRightsLegacy,
    text: 'The movement that shaped your political formation is being taught in schools now. That is not nothing, and it is also not what anyone marched for. The textbook version is careful and resolved. The version you carry is not resolved — it is ongoing, specific, and occasionally furious in ways the textbook does not have room for.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 3; p.setMem('ft5CivilRightsLegacy', true); },
  },

  // ── RESISTANCE THROUGH ART ───────────────────────────────────────────────────

  {
    id: 'ft5_resistance_art_recognized',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('resistance_through_art') &&
      G.age >= 60 &&
      !G.mem?.ft5ResistanceArtRecog,
    text: 'A younger person asks what it cost to make work that could not be made openly. You try to describe the arithmetic — the specific omissions, the double meanings the censor read as submission and the audience read as something else. What you cannot explain is why the constraint produced something that the freedom of later years did not. You are not sure you understand it yourself.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft5ResistanceArtRecog', true); },
  },

  // ── ART SHOWN LATE ───────────────────────────────────────────────────────────

  {
    id: 'ft5_art_shown_late_exists',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('art_shown_late') &&
      G.age >= 40 &&
      !G.mem?.ft5ArtShownLate,
    text: 'The work you retrieved from the drawer is in the world now. Someone has read it, heard it, seen it. It exists outside your possession for the first time. The feeling is not what you expected — not vindication exactly, more like watching something that was only yours become partly someone else\'s. You are not sure if that is loss or completion.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft5ArtShownLate', true); },
  },

  // ── COMPROMISED ──────────────────────────────────────────────────────────────

  {
    id: 'ft5_compromised_ledger',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('compromised') &&
      G.age >= 55 &&
      !G.mem?.ft5CompromisedLedger,
    text: 'You are old enough now to see the accumulation. Each individual decision made sense at the time — this was not the hill, the cost was too high, someone else would have done it anyway. The accumulation is something that individual decisions do not prepare you for. It is not a single thing you did. It is a person you became one small step at a time.',
    choices: [
      {
        text: 'Name it to yourself — this is what happened',
        tag: null,
        outcome: 'Naming it does not undo it. It does make it more difficult to continue pretending it was something else.',
        effect: (p) => { p.r -= 4; p.karma += 8; p.setMem('ft5CompromisedLedger', true); },
      },
      {
        text: 'Each decision was the right one at the time',
        tag: null,
        outcome: 'You have spent a long time getting good at this particular argument.',
        effect: (p) => { p.r += 6; p.setMem('ft5CompromisedLedger', true); },
      },
    ],
    effect: null,
  },

  // ── CENSORED JOURNALIST ──────────────────────────────────────────────────────

  {
    id: 'ft5_censored_journalist_story',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('censored_journalist') &&
      G.age >= 40 &&
      !G.mem?.ft5CensoredJournalist,
    text: 'The story you did not run is still a story. Someone ran a version of it eventually — less complete, less sourced, years later when the cost was lower. Reading it you see all the gaps where your version would have been better. You are not sure whether feeling this is vanity or principle or both.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft5CensoredJournalist', true); },
  },

  // ── INTIMIDATED INTO SILENCE ─────────────────────────────────────────────────

  {
    id: 'ft5_intimidated_body_reflex',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('intimidated_into_silence') &&
      G.age >= 35 &&
      !G.mem?.ft5IntimidatedBody,
    text: 'Years later you are in a meeting and someone in authority asks a question and you feel the old reflex before you can name it — the specific pause, the recalibration of what is safe to say. The car that followed you is not there anymore. The regime that required it may not even exist. The body keeps its own record independently of events.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft5IntimidatedBody', true); },
  },

  // ── INDEPENDENCE GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft5_independence_generation_reckoning',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('independence_generation_self') &&
      G.age >= 55 &&
      !G.mem?.ft5IndependenceReckoning,
    text: 'You were there when the flag was raised and the crowd was so loud you could not hear the music. The country has been independent for most of your life now. The accounting is not simple. The things that were promised and arrived. The things that were promised and did not. The specific thing that was not the colonial power and also was not the dream. You hold this without resolving it because that is the only honest way to hold it.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 5; p.r += 4; p.setMem('ft5IndependenceReckoning', true); },
  },

  // ── FIRST COUP WITNESS ───────────────────────────────────────────────────────

  {
    id: 'ft5_first_coup_not_last',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('first_coup_witness') &&
      G.age >= 40 &&
      !G.mem?.ft5FirstCoupPattern,
    text: 'It was not the last coup. That is the thing no one told you about the first one — that it initiates you into a recurring experience. The announcement on the radio, the specific voice that says the government has been dissolved, the specific days of not knowing. By the third or fourth time you have a body of knowledge about what follows: who goes to ground, which institutions survive, which promises will be made and unmade. The knowledge is not reassuring. It is just accurate.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 5; p.setMem('ft5FirstCoupPattern', true); },
  },

  // ── BUILD 49 — FAMINE ARC ──────────────────────────────────────────────────
  // Attaches to famine_survivor flag set by world events (Holodomor, Great Leap,
  // Ethiopian famine, North Korea famine, Biafra blockade).
  // Sequential arc chains via G.mem keys across 3 years + a late-life echo.

  {
    id: 'fam_arc_price',
    phase: 'childhood',
    weight: 6,
    cooldown: 0,
    when: (G) =>
      G.flags.has('famine_survivor') &&
      !G.mem?.famArcPrice &&
      G.age >= 4,
    text: (G) => {
      const isChild = G.age < 12
      if (isChild) return 'The adults stop finishing their sentences when you come into the room. The market is louder than usual — voices raised over prices. Your mother comes back with less than she went with. You are old enough to notice. You are not old enough to know what to call it.'
      return 'The first sign is never hunger — it is the market. The price of millet has doubled since last week. The merchant shrugs and says it will be worse next week. Around him people are buying quickly, before next week comes. The word for what is coming does not exist yet. Everyone uses other words.'
    },
    choices: [
      {
        text: 'Buy what you can now, before prices climb further',
        tag: null,
        outcome: 'The money goes fast. What you have lasts two weeks longer than it would have.',
        effect: (p) => {
          p.setMem('famArcPrice', true)
          p.setMem('famineAge', p._age)
          p.mo -= Math.round((p._state.money ?? 0) * 0.3)
          p.m -= 5
        },
      },
      {
        text: 'Wait — surely prices will correct',
        tag: null,
        outcome: 'They do not correct. You have the same money and less time to use it.',
        effect: (p) => {
          p.setMem('famArcPrice', true)
          p.setMem('famineAge', p._age)
          p.m -= 8
        },
      },
    ],
    effect: null,
  },

  {
    id: 'fam_arc_body',
    phase: 'childhood',
    weight: 5,
    cooldown: 0,
    when: (G) =>
      G.mem?.famArcPrice && !G.mem?.famArcBody,
    text: (G) => {
      const isChild = G.age < 12
      if (isChild) return 'You are hungry in a way that is different from the hunger before a meal. That hunger is impatient. This hunger is quiet. It stops asking and starts being there all the time, like weather. The children are the first to show it. Your mother watches you the way people watch something they cannot fix.'
      return 'The hunger stops being urgent after the second week. It becomes background — present the way cold is present in winter, a fact the body adjusts around. You eat when something is available. Between times, your body learns to do less: slow thoughts, slow movement, sleep that is not restful.'
    },
    choices: null,
    effect: (p) => { p.setMem('famArcBody', true); p.h -= 10; p.m -= 10 },
  },

  {
    id: 'fam_arc_selling',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.mem?.famArcBody && !G.mem?.famArcSelling,
    text: (G) => {
      const hasAnimals = G.flags.has('rural_upbringing') || G.ruralUrban === 'rural'
      if (hasAnimals) return 'The goat goes first — the one your father named. The buyer pays less than it is worth because everyone knows what everyone\'s situation is. The money feeds the household for three weeks. The goat is gone. You understand, at whatever age you are, that this is irreversible in a way that money cannot undo.'
      return 'The object your mother brought from her home village. The sewing machine that was a wedding gift. Each thing has a price and a story and the price is always less than the story. You watch the inventory of the household diminish and understand something about how wealth works that you will not be able to unlearn.'
    },
    choices: [
      {
        text: 'Sell whatever is necessary',
        tag: null,
        outcome: 'It keeps you alive through the worst months. The household never recovers everything that was lost.',
        effect: (p) => {
          p.setMem('famArcSelling', true)
          p.mo += 600; p.m -= 15; p.w -= 8
          p.addFlag('famine_asset_loss')
        },
      },
      {
        text: 'Keep the most essential things — find another way',
        tag: null,
        outcome: 'Another way is harder to find. You manage, barely, by borrowing from people who also have little.',
        effect: (p) => {
          p.setMem('famArcSelling', true)
          p.addDebt(400); p.m -= 18; p.h -= 5
        },
      },
    ],
    effect: null,
  },

  {
    id: 'fam_arc_after',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.flags.has('famine_survivor') &&
      G.mem?.famArcSelling &&
      G.age > (G.mem?.famineAge ?? G.age) + 8 &&
      G.age >= 25 &&
      !G.mem?.famArcAfter,
    text: (G) => {
      const years = G.age - (G.mem?.famineAge ?? G.age)
      return `${years} years. Your pantry is overstocked in a way your partner finds puzzling. You cannot explain it rationally — there is no shortage, there has not been a shortage in years. But the reflex to store, to keep an extra month's worth of everything, arrived in the famine and has not left. The body learned something the mind keeps failing to override.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('famArcAfter', true)
      p.m -= 3; p.r += 5
      p.addFlag('famine_memory')
    },
  },

// ============================================================
// events_followthrough_6.js
// ============================================================

// ── BUILD 45: INTIMACY FOLLOW-THROUGHS ───────────────────────────────────────

  {
    id: 'ft6_first_love_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('first_love_over') &&
      G.age >= 35 &&
      !G.mem?.ft6FirstLoveMidlife,
    text: 'You think of them occasionally — not with longing exactly but with the specific curiosity reserved for the person who taught you what an ending actually costs. Before them you had understood love as something that, once found, continued. They were the one who made the correction. You carry a different kind of knowledge because of how that finished.',
    choices: null,
    effect: (p) => {
      p.karma += 3
      p.setMem('ft6FirstLoveMidlife', true)
    },
  },

  {
    id: 'ft6_liberation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('liberation_generation_reckoning') &&
      G.age >= 65 &&
      !G.mem?.ft6LiberationLate,
    text: 'From here the distance is visible. The generation changed specific things — law, language, the surface of what could be said aloud — and did not change other things that were harder to reach. You are not disappointed exactly. You are accounting. What a generation can move in one lifetime is not nothing. It is also not everything that needed to move.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 4
      p.setMem('ft6LiberationLate', true)
    },
  },

  {
    id: 'ft6_long_marriage_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('long_marriage_intimacy') &&
      G.partner &&
      G.age >= 65 &&
      !G.mem?.ft6LongMarriageLate,
    text: (G) =>
      `What it became in the end is not what it was at the beginning and is not a lesser version of it. The body is different; what happens between you and ${G.partner?.name ?? 'your partner'} is different. There is a specific knowledge of another person that can only be accumulated over time and cannot be transferred. You have that. You are aware it is not held by everyone.`,
    choices: null,
    effect: (p) => {
      p.m += 9
      p.partnerRel(5)
      p.setMem('ft6LongMarriageLate', true)
    },
  },

  {
    id: 'ft6_cultural_intimacy_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('cultural_intimacy_silence') &&
      G.age >= 58 &&
      !G.mem?.ft6CulturalIntimacyEcho,
    text: 'You hear younger people speak of these things with a directness that was not available in the language you grew up with. You do not feel deprived of what they have. The things that were carried in silence were still carried — held in gesture, in proximity, in the specific texture of lives lived alongside each other. A different way of holding it. Not absent.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('ft6CulturalIntimacyEcho', true)
    },
  },

  {
    id: 'ft6_intimacy_partner_decline',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('intimacy_late_life') &&
      G.partner &&
      G.age >= 72 &&
      !G.mem?.ft6IntimacyPartnerDecline,
    text: (G) =>
      `The body changes again. What passes between you and ${G.partner?.name ?? 'your partner'} is quieter now — less motion, more presence. A hand held for a long time. The specific warmth of another person who has known you for decades and is still here, in the same room, in the same life. You understand this as a form of intimacy that the younger version of you could not have understood.`,
    choices: null,
    effect: (p) => {
      p.m += 7
      p.partnerRel(4)
      p.setMem('ft6IntimacyPartnerDecline', true)
    },
  },

  // ── BUILD 46: SCHOOL FOLLOW-THROUGHS ─────────────────────────────────────────

  {
    id: 'ft6_scholarship_declined_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('scholarship_declined') &&
      G.age >= 38 &&
      !G.mem?.ft6ScholarshipDeclinedEcho,
    text: 'You didn\'t take the door. The person you might have become — in that school, in those rooms, with those people — is not a ghost exactly but a figure you imagine occasionally. The life you have built from the choice you made is real and yours. You do not spend much time wondering. Sometimes, though, you wonder.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.setMem('ft6ScholarshipDeclinedEcho', true)
    },
  },

  {
    id: 'ft6_class_gap_career',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('class_gap_known') &&
      G.career !== null &&
      G.age >= 26 &&
      !G.mem?.ft6ClassGapCareer,
    text: 'You are in a room with people who grew up different from you. The specific knowledge you carry — of what everything costs, of what it took to get here, of what was not assumed — is not visible to them. It is not a wound. It is an orientation. You notice things they don\'t notice. You understand things they have to be told.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.karma += 3
      p.setMem('ft6ClassGapCareer', true)
    },
  },

  {
    id: 'ft6_war_school_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('war_school_attended') &&
      G.age >= 35 &&
      !G.mem?.ft6WarSchoolMidlife,
    text: 'A news story about children being denied access to school — a decision, a decree, a front line that moved. You carry specific knowledge: what the routine holds together when everything around it is not routine. The teacher there every morning at seven-thirty. The fractions lesson in a city under siege. You have thought about that teacher more than once since.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.setMem('ft6WarSchoolMidlife', true)
    },
  },


  // ── BUILD 38: CHILDREN LEFT BEHIND FOLLOW-THROUGHS ───────────────────────────

  {
    id: 'ft6_raised_extended_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('raised_by_extended_family') &&
      G.age >= 38 &&
      !G.mem?.ft6RaisedExtendedMidlife,
    text: 'The person who raised you when your parent wasn\'t there — the grandmother, the aunt, the household that reorganised around the gap — you think of them with a specific kind of loyalty that does not diminish. They taught you things by accident: how to read weather, how to be quiet when required, how to be enough when you are not what was planned for. You carry her with you without naming it.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft6RaisedExtendedMidlife', true)
    },
  },

  {
    id: 'ft6_understood_cost_no_emigration',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('understood_the_cost') &&
      !G.flags.includes('emigrated') &&
      !G.flags.includes('the_cycle_repeated') &&
      G.age >= 35 &&
      !G.mem?.ft6UnderstoodCostNoEmig,
    text: 'You did not leave. You built the life you built from here, which is not what your parent built from abroad. The accounting still sits with you — the material gain, the specific cost, both columns true. You chose not to repeat it. Whether this is wisdom or its own form of cost, you cannot entirely say.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft6UnderstoodCostNoEmig', true)
    },
  },

  // ── BUILD 23: STAYED BEHIND FOLLOW-THROUGHS ──────────────────────────────────

  {
    id: 'ft6_witness_exodus_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('witness_to_exodus') &&
      G.age >= 65 &&
      !G.mem?.ft6WitnessExodusLate,
    text: 'You watched the country change as people left and did not come back, or came back different. You were the continuity — the one who knew what the street looked like before, who remembered the names of the families who used to live in those houses. This is its own kind of knowledge. Not everyone wanted to hold it, and you did.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft6WitnessExodusLate', true)
    },
  },

// ============================================================
// events_followthrough_7.js
// ============================================================

// ── BUILD 39: SPORT FOLLOW-THROUGHS ──────────────────────────────────────

  {
    id: 'ft7_sport_path_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('sport_path_closed') &&
      G.age >= 35 &&
      !G.mem?.ft7SportPathMidlife,
    text: 'You watch a match and one of the players is your age when you stopped — which means they have eight years left, or four, depending on how their body holds. You were never going to be them. You knew this by twenty-three. What you still carry is not the disappointment, which has mostly gone, but the specific knowledge of what the game actually requires: the hours, the discipline, the indifference to weather and inconvenience. That knowledge did not disappear when the path did.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft7SportPathMidlife', true)
    },
  },

  {
    id: 'ft7_stopped_playing_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('stopped_playing') &&
      G.age >= 60 &&
      !G.mem?.ft7StoppedPlayingEcho,
    text: 'A grandchild, or a neighbour\'s child, or someone on television plays the game. You watch them with the particular attention of a person who knows from inside what the movement costs and what it requires. What you remember is not the score of any match but the specific feel of a clean contact — the moment when the body does exactly what you asked it to do. You carried that longer than you expected.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('ft7StoppedPlayingEcho', true)
    },
  },

  {
    id: 'ft7_world_cup_teaching',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('world_cup_generation') &&
      G.children?.length > 0 &&
      G.age >= 35 &&
      !G.mem?.ft7WorldCupTeaching,
    text: (G) => {
      const child = G.children?.[0]
      return `A World Cup year. You explain to ${child?.name ?? 'your child'} why this particular tournament, this particular team, means more than a game means. You are not sure you can explain it adequately — the thing you are trying to give them access to is an experience from your own childhood that exists only inside you. You try anyway. Some of it lands. Some of it doesn't, which is how all transmissions of this kind go.`
    },
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 3
      p.setMem('ft7WorldCupTeaching', true)
    },
  },

  {
    id: 'ft7_passed_football_on_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('passed_football_on') &&
      G.age >= 58 &&
      !G.mem?.ft7PassedFootballOnLate,
    text: (G) => {
      const child = G.children?.[0]
      return `${child?.name ?? 'Your child'} watches a match the way you taught them to watch — knowing what they're looking for, having opinions, caring about the result in a way that is slightly absurd and also completely genuine. You recognise this in them. You did not know whether this particular thing would transfer when you tried to give it. It transferred.`
    },
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.setMem('ft7PassedFootballOnLate', true)
    },
  },

  // ── BUILD 53: DISASTER FOLLOW-THROUGHS ───────────────────────────────────

  {
    id: 'ft7_flood_crisis_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('flood_crisis_witnessed') &&
      G.age >= 35 &&
      !G.mem?.ft7FloodCrisisMidlife,
    text: 'A news story about flooding somewhere. The images are familiar in structure — submerged roads, furniture on rooftops, people wading — but the specific geography is somewhere else. The number of dead is in the lower third. You watch it with the specific attention of someone who knows what comes after the cameras leave: the mould in the walls, the seed stock that didn\'t survive, the school that reopens late because the building needs work and the money hasn\'t come.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.setMem('ft7FloodCrisisMidlife', true)
    },
  },

  {
    id: 'ft7_earthquake_survived_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('earthquake_survived') &&
      G.age >= 60 &&
      !G.mem?.ft7EarthquakeSurvivedLate,
    text: 'You hear about another earthquake somewhere. You know the sequence before the news tells it: the initial magnitude, then the revised toll, then the search for survivors in the rubble, then the argument about building codes, then the argument fades. You have done the work of having been through one. The knowledge sits in you differently from knowledge you acquired from reading.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft7EarthquakeSurvivedLate', true)
    },
  },

  {
    id: 'ft7_survived_major_storm_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('survived_major_storm') &&
      G.age >= 55 &&
      !G.mem?.ft7SurvivedMajorStormLate,
    text: 'Another typhoon season. The younger people in the family have not been through the worst of it; you have. You prepare without drama and check that others are prepared. The knowledge is not impressive — it is practical. You are the person who knows which house is too close to the water and which radio frequency the coast guard uses. This is what surviving something and staying gives you: the specific competence of having done it before.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 5
      p.setMem('ft7SurvivedMajorStormLate', true)
    },
  },

  // ── WORLD EVENT FOLLOW-THROUGHS ───────────────────────────────────────────

  {
    id: 'ft7_bhola_survivor_liberation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('bhola_survivor') &&
      G.flags.includes('liberation_war_witnessed') &&
      G.age >= 20 &&
      !G.mem?.ft7BholaSurvivorLiberation,
    text: 'The cyclone and the war arrive in the same two-year span of your life. The government that did not send the relief ships is the same government that sent the soldiers. This connection is not made by the international community but it is made by everyone here. The specific inadequacy of the response to the cyclone in November 1970 is part of the accounting of what happened in 1971. You know this without having been told it explicitly.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 5
      p.r += 4
      p.setMem('ft7BholaSurvivorLiberation', true)
    },
  },

  {
    id: 'ft7_tangshan_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('tangshan_witness') &&
      G.age >= 40 &&
      !G.mem?.ft7TangshanMidlife,
    text: 'A news story about an earthquake somewhere — Turkey, or Japan, or the Philippines — and the conversation in the room stops for a moment. You were there when the ground moved, when the city that was there the night before was not there in the morning. You do not tell the story in those terms. You watch the number revise upward over the following days and you understand something about what the number contains that people who weren\'t there cannot understand from the number alone.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.r += 3
      p.setMem('ft7TangshanMidlife', true)
    },
  },

  {
    id: 'ft7_cricket_generation_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('cricket_generation') &&
      G.age >= 60 &&
      !G.mem?.ft7CricketGenerationEcho,
    text: 'You have watched the game change more than it changed in any previous generation. The money came from somewhere other than where it used to come from. The best players are from countries that weren\'t competitive within living memory. The tournaments are in new places. The game that was supposed to belong to the people who invented it belongs, now, to the people who were supposed to learn it from them. You find this satisfying in a way you wouldn\'t have predicted when you were young.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft7CricketGenerationEcho', true)
    },
  },

// ============================================================
// events_followthrough_8.js
// ============================================================

// ── NAMED CALLBACKS: PAST CHOICES SURFACED ───────────────────────────────

  {
    id: 'ft8_crossed_line_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lab_crossed_line') &&
      G.age >= 35 &&
      !G.mem?.ft8CrossedLineMidlife,
    text: 'You see something in the news about a strike — different industry, different city. It brings back the morning you crossed the line. Not as a memory you have to retrieve but as something that surfaces on its own. The silence from the people standing in the cold as you walked past them. You told yourself at the time that you couldn\'t afford it. This was true. You are not certain it was the whole reason.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.karma += 2
      p.setMem('ft8CrossedLineMidlife', true)
    },
  },

  {
    id: 'ft8_solidarity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('solidarity_proven') &&
      G.age >= 60 &&
      !G.mem?.ft8SolidarityLate,
    text: 'You mention to someone younger that you were on strike once — eleven weeks, as it turned out. They look at you the way people look at old photographs. You try to explain what the morning felt like, standing in the cold while the building went on without you. What you were defending, which was not just the wage. They nod. You don\'t push harder than that.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 3
      p.setMem('ft8SolidarityLate', true)
    },
  },

  {
    id: 'ft8_knows_failure_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('knows_failure') &&
      G.age >= 35 &&
      !G.mem?.ft8KnowsFailureEcho,
    text: 'You think about the first real failure — the one that was your fault and mattered. Not because you are dwelling on it but because something in the present rhymes with something from that time. You learned things from it that you couldn\'t have learned any other way. You are not grateful for it, exactly. But you understand it differently from this distance.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 3
      p.r -= 2
      p.setMem('ft8KnowsFailureEcho', true)
    },
  },

  {
    id: 'ft8_childhood_object_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('childhood_object') &&
      G.age >= 40 &&
      !G.mem?.ft8ChildhoodObjectMidlife,
    text: 'You find the thing — or something like it. The object from when you were small that was yours in the particular way early possessions are yours before you understand ownership. You are not sure why you still have it. You are not sure why you are standing here holding it.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.setMem('ft8ChildhoodObjectMidlife', true)
    },
  },

  {
    id: 'ft8_compromised_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('compromised') &&
      G.age >= 60 &&
      !G.mem?.ft8CompromisedLate,
    text: 'You did the thing. At the time it seemed like the only available move — the choices were uneven, the circumstances were real, and you made the calculation most people in that position would have made. You have repeated this accounting to yourself enough times to know all the parts of it. The part that stays is not the accounting. It is the moment before the calculation, when you knew what the right thing was.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 4
      p.karma -= 2
      p.setMem('ft8CompromisedLate', true)
    },
  },

  {
    id: 'ft8_art_drawer_choice',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('art_in_drawer') &&
      G.age >= 40 && G.age <= 58 &&
      !G.mem?.ft8ArtDrawerChoice,
    text: 'The work exists. It always existed. You have kept it in the drawer, the folder, the box at the back of the wardrobe. It is finished — has been finished for years. You are holding it now, deciding again.',
    choices: [
      {
        text: 'Show it to someone',
        tag: 'art_shown_late',
        outcome: 'You show it. The response is not what you imagined — it is more specific than that, and smaller, and yours.',
        effect: (p) => { p.m += 10; p.karma += 5; p.r -= 5; p.setMem('ft8ArtDrawerChoice', true) },
      },
      {
        text: 'Put it back',
        tag: null,
        outcome: 'You put it back. It will still be there. That is both the comfort and the problem.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('ft8ArtDrawerChoice', true) },
      },
    ],
    effect: null,
  },

  // ── DESIRE / GROWTH TENSION EVENTS ───────────────────────────────────────
  // Each event places the character's wound in a specific situation
  // and offers a fork: act from the wound, or act against it.

  {
    id: 'ft8_desire_prove_worth',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.age >= 34 && G.age <= 52 &&
      !G.mem?.ft8DesireProveWorth,
    text: 'A junior colleague is struggling with a presentation — work you both contributed to, though most of the ideas were yours. They ask if they can present it. If they do, your name is not on the success. If you say no, they\'ll understand what that means.',
    choices: [
      {
        text: 'Let them present it',
        tag: 'generosity_practised',
        outcome: 'They present it well. The room applauds. You clap. Nobody names what this cost you, because nobody knows.',
        effect: (p) => { p.m -= 2; p.karma += 6; p.r -= 2; p.setMem('ft8DesireProveWorth', true) },
      },
      {
        text: 'You should be the one presenting it',
        tag: null,
        outcome: 'You present it. The work lands well. The approval is exactly what you expected and lasts about as long.',
        effect: (p) => { p.m += 5; p.r += 4; p.setMem('ft8DesireProveWorth', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_be_seen',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 35 && G.age <= 52 &&
      !G.mem?.ft8DesireBeSeen,
    text: 'Someone else receives recognition for something you were part of. Not maliciously — it went that way. You could correct the record. You could also do the next thing.',
    choices: [
      {
        text: 'Make sure your contribution is on the record',
        tag: null,
        outcome: 'You say something. The record is corrected. You feel slightly better and slightly worse simultaneously.',
        effect: (p) => { p.m += 3; p.r += 3; p.setMem('ft8DesireBeSeen', true) },
      },
      {
        text: 'Let it go and do the next thing',
        tag: 'recognition_waived',
        outcome: 'You move on. The work continues. There is something clean about this that you did not expect.',
        effect: (p) => { p.m += 2; p.karma += 5; p.r -= 2; p.setMem('ft8DesireBeSeen', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_belong',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 30 && G.age <= 48 &&
      !G.mem?.ft8DesireBelong,
    text: 'The group you are part of — work, neighbourhood, community — has a clear consensus about something. You think they are wrong. The moment passes when you could say so without cost. Then it passes again.',
    choices: [
      {
        text: 'Say what you actually think',
        tag: 'spoke_against',
        outcome: 'You say it. The room adjusts. You are not excluded, but you feel the edge of the thing you risked.',
        effect: (p) => { p.m -= 3; p.karma += 5; p.e += 3; p.setMem('ft8DesireBelong', true) },
      },
      {
        text: 'Let it go — it\'s not worth the cost',
        tag: null,
        outcome: 'You don\'t say it. The consensus holds. You are still in the room. Something small is lost.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('ft8DesireBelong', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_connection',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.ft8DesireConnection,
    text: 'Someone close to you tries to go deeper — to say something true, to ask something real. You feel the familiar pull to redirect, to keep things where they are safe. You have kept things where they are safe for a long time.',
    choices: [
      {
        text: 'Let them in this time',
        tag: 'vulnerability_tried',
        outcome: 'It goes better than you expected. Not perfect. But better. You remember why you wanted this.',
        effect: (p) => { p.m += 8; p.karma += 4; p.r -= 4; p.setMem('ft8DesireConnection', true) },
      },
      {
        text: 'Change the subject',
        tag: null,
        outcome: 'The moment passes. The conversation becomes safe again. You can feel the distance from inside it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('ft8DesireConnection', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_safety',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 22 && G.age <= 32 &&
      !G.mem?.ft8DesireSafety,
    text: 'There is an opportunity — a move, a beginning, a risk worth taking — that is better than what you have and carries real uncertainty. The case for staying where you are is not exciting, but it is solid. You are good at building the argument for staying.',
    choices: [
      {
        text: 'Take the opportunity',
        tag: 'safety_risked',
        outcome: 'You go. The uncertainty is real, as promised. So is what you find inside it.',
        effect: (p) => { p.m += 8; p.e += 5; p.r -= 3; p.setMem('ft8DesireSafety', true) },
      },
      {
        text: 'Stay where you are',
        tag: null,
        outcome: 'You stay. The stability is real. The question of what the other path held stays with you quietly.',
        effect: (p) => { p.m += 3; p.r += 5; p.setMem('ft8DesireSafety', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_freedom',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'freedom' &&
      G.partner &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.ft8DesireFreedom,
    text: (G) => {
      const pn = G.partner?.name ?? 'Your partner'
      return `${pn} wants to make a decision together — where to live, how to spend the next few years, what to build. There is a version that requires you to commit to something that limits your options. You are aware you have been here before and found a way not to decide.`
    },
    choices: [
      {
        text: 'Commit to the shared path',
        tag: 'committed_to_shared',
        outcome: 'You say yes. The options narrow, as promised. Something else opens that you didn\'t expect.',
        effect: (p) => { p.m += 6; p.karma += 3; p.r -= 3; p.updatePartnerRel(8); p.setMem('ft8DesireFreedom', true) },
      },
      {
        text: 'Keep the door open — not yet',
        tag: null,
        outcome: 'You hedge. You are good at hedging. Your partner hears what you didn\'t say.',
        effect: (p) => { p.m -= 3; p.r += 5; p.updatePartnerRel(-6); p.setMem('ft8DesireFreedom', true) },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_9.js
// ============================================================

// ── TORTURE SURVIVED (political prisoner in authoritarian regime) ─────────────

  {
    id: 'ft9_political_detention_torture',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('political_prisoner') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime) &&
      G.inPrison &&
      !G.mem?.ft9TortureSurvived,
    text: 'They take you into a room with no windows and ask questions they already know the answers to. The point is not the information — the point is that you understand they can do this. That is the whole point. You do not break in the way they want. You break in ways they don\'t count.',
    choices: null,
    effect: (p) => {
      p.m -= 20
      p.h -= 12
      p.r += 10
      p.karma += 8
      p.addFlag('torture_survived')
      p.setMem('ft9TortureSurvived', true)
    },
  },

  {
    id: 'ft9_torture_midlife_body',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('torture_survived') &&
      G.age >= 35 &&
      !G.mem?.ft9TortureMidlife,
    text: 'The body keeps the record. There are things that trigger it — a particular quality of silence, the sound of a door locking, the way someone stands in a doorway. You know the difference between the past and the present. The nervous system does not always agree. You have learned to work around this. It costs something every time.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.h -= 3
      p.r += 5
      p.setMem('ft9TortureMidlife', true)
    },
  },

  {
    id: 'ft9_torture_late_testimony',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('torture_survived') &&
      G.age >= 60 &&
      !G.mem?.ft9TortureLate,
    text: 'There is a word for what was done to you in that room. For most of your life you did not use it — you called it "the questioning" or "what happened" or nothing at all. You use the word now. Not often. But you use it. That matters in ways you cannot fully explain.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 6
      p.setMem('ft9TortureLate', true)
    },
  },

  // ── TRAUMATIZED BY VIOLENCE ───────────────────────────────────────────────────

  {
    id: 'ft9_violence_trauma_body',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('traumatized_by_violence') &&
      G.age >= 20 &&
      !G.mem?.ft9ViolenceTraumaBody,
    text: 'You know this about yourself: there are things that happen in the body before the mind catches up. A loud sound, a certain kind of movement in the periphery, the particular posture of a person moving toward you too quickly. The reaction is faster than thought. You have learned to manage it. Management is not the same as it not being there.',
    choices: [
      {
        text: 'Talk to someone — you cannot manage this alone indefinitely',
        tag: 'trauma_addressed',
        outcome: 'You find someone who understands what this is. It takes time and is not a cure. But the load shifts.',
        effect: (p) => { p.m += 8; p.h += 4; p.addFlag('trauma_addressed'); p.setMem('ft9ViolenceTraumaBody', true) },
      },
      {
        text: 'Keep managing — you know the triggers, you can work around them',
        tag: null,
        outcome: 'You continue as you have. The management is not nothing. You have built a life inside its limits.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft9ViolenceTraumaBody', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_violence_trauma_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('traumatized_by_violence') &&
      !G.flags.has('trauma_addressed') &&
      G.age >= 40 &&
      !G.mem?.ft9ViolenceTraumaMidlife,
    text: 'You have carried it for twenty years or more. The carrying has become so familiar you forget it is carrying. Then something small — not anything like what happened — brings it close again. Not as a memory exactly. More as a weather that passes through.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.setMem('ft9ViolenceTraumaMidlife', true)
    },
  },

  // ── GENOCIDE SURVIVOR ────────────────────────────────────────────────────────

  {
    id: 'ft9_genocide_testimony',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('genocide_survivor') &&
      G.age >= 35 &&
      !G.mem?.ft9GenocideTestimony,
    text: 'Someone asks if you would speak — at a commemoration, a school, a documentation project. They are careful about how they ask. They say it is up to you. You have told versions of this before, privately, to people who needed to understand. Speaking formally is different. The words are the same; the architecture is not.',
    choices: [
      {
        text: 'Agree to speak — the record should exist',
        tag: 'genocide_witness_spoken',
        outcome: 'You speak. It costs what it always costs. The room is very quiet. Someone you don\'t know thanks you afterward and cannot finish the sentence.',
        effect: (p) => { p.karma += 10; p.m -= 5; p.r += 5; p.addFlag('genocide_witness_spoken'); p.setMem('ft9GenocideTestimony', true) },
      },
      {
        text: 'Tell it to one person you trust — not publicly',
        tag: null,
        outcome: 'You tell the one person. They hold it carefully. That is enough.',
        effect: (p) => { p.m += 3; p.karma += 4; p.setMem('ft9GenocideTestimony', true) },
      },
      {
        text: 'Not yet — you don\'t know when, but not yet',
        tag: null,
        outcome: 'You say not yet. This is not the same as never. You are not sure it is different.',
        effect: (p) => { p.r += 4; p.setMem('ft9GenocideTestimony', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_genocide_thinning_generation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('genocide_survivor') &&
      G.age >= 65 &&
      !G.mem?.ft9GenThinning,
    text: 'The ones who were there are dying of ordinary things now — age, illness, the accumulated weight of years. You read the name and you know which memory attaches to it. Each one that goes takes with them a specific version of what happened. You are still here. You are not sure if that is luck or something else.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.karma += 5
      p.setMem('ft9GenThinning', true)
    },
  },

  {
    id: 'ft9_genocide_witness_spoken_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('genocide_witness_spoken') &&
      G.age >= 70 &&
      !G.mem?.ft9WitnessSpokenLate,
    text: 'Someone you never met writes to say that your testimony changed the way they understood what happened — not as history but as something a person lived through. You read it twice. You do not know what to do with gratitude for a thing that cost what it cost. You write back. You are brief.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.setMem('ft9WitnessSpokenLate', true)
    },
  },

  // ── MISCARRIAGE ──────────────────────────────────────────────────────────────

  {
    id: 'ft9_miscarriage_arithmetic',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('experienced_miscarriage') || G.flags.has('multiple_miscarriage')) &&
      G.age >= 38 &&
      !G.mem?.ft9MiscarriageArithmetic,
    text: () => {
      return 'A child passes you on the street — five or six years old, running ahead of their parent. You do the arithmetic before you mean to. That is the age. Not every time, and not in a way that disrupts the day. The year that loss happened has a particular quality to it. This is just what the mind does with dates.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.setMem('ft9MiscarriageArithmetic', true)
    },
  },

  {
    id: 'ft9_multiple_miscarriage_partner',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('multiple_miscarriage') &&
      G.partner !== null &&
      G.age >= 40 &&
      !G.mem?.ft9MultipleMiscarriagePartner,
    text: 'You and your partner have stopped talking about it directly. What it meant. What it cost. The grief was shared but it was not the same grief, and neither of you had the right words for the difference. You are still here together. That is not a small thing. There are couples who didn\'t survive that particular weight.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.updatePartnerRel(5)
      p.setMem('ft9MultipleMiscarriagePartner', true)
    },
  },

  {
    id: 'ft9_miscarriage_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (G.flags.has('experienced_miscarriage') || G.flags.has('multiple_miscarriage')) &&
      G.age >= 62 &&
      !G.mem?.ft9MiscarriageLate,
    text: 'The grief has changed shape over the years. It is not the same grief it was at the time — it was acute then, and what it is now is something quieter and more settled. You do not talk about it much. It lives in you as a kind of knowledge about what lives can hold.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r -= 2
      p.setMem('ft9MiscarriageLate', true)
    },
  },

  // ── SIBLING ESTRANGEMENT ─────────────────────────────────────────────────────

  {
    id: 'ft9_sibling_estranged_news',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sibling_estranged') &&
      G.age >= 38 &&
      !G.mem?.ft9SibEstrangedNews,
    text: 'You hear something about your sibling through someone else — a common contact, a mutual relative. They are well enough. Or they are not. Either way, you received the information secondhand, and there is something specific about learning this way: the gap between you is now visible to a third party.',
    choices: [
      {
        text: 'Let it stay as it is',
        tag: null,
        outcome: 'You do not respond to what you\'ve heard. The situation does not change. You are not sure if that is peace or avoidance.',
        effect: (p) => { p.r += 3; p.setMem('ft9SibEstrangedNews', true) },
      },
      {
        text: 'Send a brief message — just to say you heard',
        tag: 'sibling_estranged_reached_out',
        outcome: 'You send something short. They reply briefly. Nothing resolves. But something in the silence has been named.',
        effect: (p) => { p.m += 4; p.karma += 3; p.addFlag('sibling_estranged_reached_out'); p.setMem('ft9SibEstrangedNews', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_sibling_estranged_same_room',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sibling_estranged') &&
      !G.flags.has('lost_sibling') &&
      G.age >= 60 &&
      !G.mem?.ft9SibSameRoom,
    text: 'Something brings you to the same place — a death in the family, a significant occasion, the kind of event that does not allow absence. You are in the same room. You have not been in the same room for years. The estrangement has had time to become a fact of life. Being in the same room makes it newly strange.',
    choices: [
      {
        text: 'Speak to them — whatever comes',
        tag: 'sibling_estrangement_broke',
        outcome: 'You speak. It is awkward. There is no resolution in a single conversation. But something has shifted. You are not sure toward what.',
        effect: (p) => { p.m += 6; p.r += 3; p.karma += 4; p.addFlag('sibling_estrangement_broke'); p.setMem('ft9SibSameRoom', true) },
      },
      {
        text: 'Acknowledge them with a nod and nothing more',
        tag: null,
        outcome: 'You make contact with your eyes. You do not make contact with words. They do not push for more. The room goes on around you.',
        effect: (p) => { p.r += 4; p.setMem('ft9SibSameRoom', true) },
      },
      {
        text: 'Do not acknowledge them — the wound is still too deep',
        tag: null,
        outcome: 'You are careful about where you stand. The event ends. You leave. Your sibling\'s absence from your life reasserts itself by morning.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft9SibSameRoom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_sibling_estrangement_broke_later',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sibling_estrangement_broke') &&
      G.age >= 68 &&
      !G.mem?.ft9SibEstrangementBrokeLater,
    text: 'You have been in contact more since that day. Not frequently. Not as if the years between hadn\'t happened. But the silence has cracked enough to let something through. You do not talk about what caused it. You have, without agreement, decided to let the past be where it is.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 3
      p.setMem('ft9SibEstrangementBrokeLater', true)
    },
  },

  // ── LOST SIBLING ─────────────────────────────────────────────────────────────

  {
    id: 'ft9_lost_sibling_objects',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.age >= 35 &&
      !G.mem?.ft9LostSibObjects,
    text: 'At some point someone has to deal with their things. If not you, then someone else — but the responsibility finds you. The objects carry the particular quality of belonging to someone who no longer exists. Some of it you can give away. Some of it you cannot explain keeping. You keep it anyway.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.setMem('ft9LostSibObjects', true)
    },
  },

  {
    id: 'ft9_lost_sibling_habit_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.age >= 58 &&
      !G.mem?.ft9LostSibHabit,
    text: 'You catch yourself doing something they used to do — a gesture, a turn of phrase, the way you hold a cup. You have been carrying them without knowing it. The recognition is brief and specific. You do not do anything with it. You let it pass through you.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.m += 6
      p.setMem('ft9LostSibHabit', true)
    },
  },

  {
    id: 'ft9_lost_sibling_last_one',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.siblings.length === 0 &&
      G.age >= 65 &&
      !G.mem?.ft9LostSibLastOne,
    text: 'You are the last one. All the siblings gone now. There is no one left who shared the early years with you from the inside — who was in the house, at the table, in the back of the car. The things you remember together no longer have another witness. You are the only version of the story that remains.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.setMem('ft9LostSibLastOne', true)
    },
  },

// ============================================================
// events_followthrough_10.js
// ============================================================

// ── OFW GULF: texture during stay ──────────────────────────────────────────
  {
    id: 'ft10_ofw_gulf_passport',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_gulf') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10GulfPassport &&
      G.age >= 22 && G.age <= 50,
    text: 'Your employer keeps your passport in a drawer in the main house. You have been told this is normal — for safekeeping, they said, smiling. You believe it is normal because everyone you know here says the same thing. What you notice is that you feel the difference between your passport being in your bag and your passport being in someone else\'s drawer. The feeling has no name. You learn not to mention it in the Sunday calls home.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.addFlag('kafala_documented')
      p.setMem('ft10GulfPassport', true)
    },
  },

  {
    id: 'ft10_ofw_gulf_rest_day',
    phase: null,
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.flags.has('ofw_gulf') &&
      !G.flags.has('ofw_returned') &&
      G.age >= 22 && G.age <= 50,
    text: 'Your contract says one rest day a week. In practice the house needs you, and the family does not observe Sundays. On the days you do get out you walk to the compound where the others gather — women from home, from Sri Lanka, from Ethiopia, from Indonesia, all wearing the same careful posture of people who are being watched even when they are not. Someone has brought a box of leche flan wrapped in plastic. Someone else has a phone with bad signal and you take turns trying to get through. The afternoon goes like this, and it is enough. It is not enough.',
    choices: null,
    effect: (p) => {
      p.s += 4
      p.m -= 3
    },
  },

  // ── OFW HONGKONG: Sunday texture ───────────────────────────────────────────
  {
    id: 'ft10_ofw_hongkong_victoria',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_hongkong') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10HKVictoria &&
      G.age >= 22 && G.age <= 50,
    text: 'Sunday is yours, legally — Hong Kong mandates it and the employer knows. You go to Victoria Park with everyone else. The cardboard on the ground, the food in Tupperware passed around, the Tagalog that expands without the employer\'s hearing. Someone has a copy of a newspaper from home that is two weeks old. Someone else has brought a portable speaker. By early afternoon the park is so loud with a hundred small gatherings that you feel, briefly, like you are somewhere else entirely — not the park but the country the park has become for a few hours every Sunday.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.s += 3
      p.setMem('ft10HKVictoria', true)
    },
  },

  {
    id: 'ft10_ofw_hongkong_rights',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_hongkong') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10HKRights &&
      G.currentYear >= 2019 &&
      G.age >= 22 && G.age <= 55,
    text: 'The protests fill the streets on your one day off. You watch from the edge — you have papers here, a contract, and you cannot afford to be swept up in something. But you watch. The young people with umbrellas and hard hats, the specific courage of people who are being photographed by the state and know it. You are not a citizen of this place. The things they are trying to hold onto are things that also protect you, in ways the protest organizers are probably not thinking about. You go back to the flat before dark.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.karma += 6
      p.setMem('ft10HKRights', true)
    },
  },

  // ── OFW ITALY: care work texture ───────────────────────────────────────────
  {
    id: 'ft10_ofw_italy_badante',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_italy') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10ItalyBadante &&
      G.age >= 22 && G.age <= 55,
    text: 'You are called a *badante* here — a carer. The old woman you look after is ninety-one and has been a widow for twenty years and does not always know where she is, but she knows you. She calls you by a name that is not yours, which was the name of someone who worked here before. You have stopped correcting her. Her daughter visits on Saturdays and looks at you with a complicated expression that you have learned to read as gratitude and guilt in equal measure, which is also what you feel about being here at all. You write home about the apartment, the food, the good coffee. You do not write about the name she calls you.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.s += 3
      p.e += 4
      p.addFlag('care_work_done')
      p.setMem('ft10ItalyBadante', true)
    },
  },

  {
    id: 'ft10_ofw_italy_community',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_italy') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10ItalyCommunity &&
      G.age >= 22 && G.age <= 55,
    text: 'The church in the next town holds a Filipino mass on the second Sunday of each month. You go when you can. The singing is in a language you dream in, and the priest is from Cebu, and someone always brings pansit in a pot that gets passed around afterward in the car park. You have found the person who handles the remittance service and the person who knows which agency to avoid and the person who was here fifteen years ago and will tell you, quietly, what happens to people who do not keep their papers in order. The community has its own knowledge economy. You learn it fast.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 4
      p.setMem('ft10ItalyCommunity', true)
    },
  },

  // ── OFW RUNAWAY: aftermath of fleeing employer ──────────────────────────────
  {
    id: 'ft10_ofw_runaway_shelter',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('ofw_runaway') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10RunawayShelter,
    text: 'The shelter is run by a Filipino organization that has seen this before. They have a protocol: document everything, change your SIM card, do not go back to the old neighbourhood. A woman behind a desk takes down your employer\'s name without looking surprised, which is either reassuring or not. You are not undocumented — technically — but your contract was with an employer who no longer has you, which puts you in a category that the embassy describes as \'complex\'. You wait. You fill out forms. You call home and say things are fine because they are fine, in the sense that you are safe, which is not the same as fine.',
    choices: [
      {
        text: 'Focus on finding a new legitimate placement',
        tag: null,
        outcome: 'The agency takes six weeks and a fee you can barely cover. The new employer is in a different neighbourhood. You start again.',
        effect: (p) => { p.m -= 5; p.addFlag('ofw_new_placement'); p.setMem('ft10RunawayShelter', true) },
      },
      {
        text: 'Work informally while sorting out your status',
        tag: null,
        outcome: 'You clean houses for cash. It pays more per hour and carries different risks. You keep moving.',
        effect: (p) => { p.mo += 400; p.addFlag('informal_abroad'); p.setMem('ft10RunawayShelter', true) },
      },
    ],
  },

  {
    id: 'ft10_ofw_runaway_long',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_runaway') &&
      !G.mem?.ft10RunawayLong &&
      G.age >= 30,
    text: 'Years later, the month you ran is still the month you are clearest about. Everything else — contracts, employers, cities — has blurred a little. That month is specific. The number of nights in the shelter, the name of the woman who did the intake paperwork, the pattern on the ceiling. Memory is strange: it keeps what it needs and not what you would choose.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.karma += 5
      p.setMem('ft10RunawayLong', true)
    },
  },

  // ── OFW BROKER DEBT: paying down the structural trap ───────────────────────
  {
    id: 'ft10_ofw_broker_debt_monthly',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_broker_debt') &&
      !G.flags.has('ofw_broker_paid') &&
      !G.mem?.ft10BrokerDebtMonthly &&
      G.age >= 22 && G.age <= 45,
    text: 'Before you send money home you send money to the loan. The arrangement was explained to you as temporary — a few months of remittances and the fee is settled. What the broker did not explain was the interest, which recalculates in ways that are legal but not easy to follow. You have started keeping a notebook. Each month you write the amount still owed. The number goes down. It goes down very slowly. You learn, in this way, what thirty percent per annum means from the inside.',
    choices: null,
    effect: (p) => {
      p.mo -= 600
      p.e += 3
      p.setMem('ft10BrokerDebtMonthly', true)
    },
  },

  {
    id: 'ft10_ofw_broker_paid_off',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('ofw_broker_debt') &&
      !G.flags.has('ofw_broker_paid') &&
      !G.mem?.ft10BrokerPaidOff &&
      G.age >= 24,
    text: 'The notebook shows zero. You have paid back the agency fee, the interest on the agency fee, and what the lender called \'administrative costs\' which you now understand is a word for a number they add when they want to. You close the notebook. You do not celebrate because the money that went to the loan was money that could have gone home, and you think about this in a way that isn\'t productive. But zero is zero. You send an extra two thousand pesos home this month and don\'t explain why.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 8
      p.addFlag('ofw_broker_paid')
      p.setMem('ft10BrokerPaidOff', true)
    },
  },

  // ── INTELLECTUAL_TARGET: Algeria — living after being named ────────────────
  {
    id: 'ft10_intellectual_target_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('intellectual_target') &&
      !G.mem?.ft10IntellectualTargetMidlife &&
      G.age >= 35,
    text: (G) => {
      const inExile = G.flags.has('algeria_exile') || G.flags.has('emigrated')
      if (inExile) {
        return 'You read about the men who drew up the lists. Some have had their sentences reduced under the amnesty provisions. One has become a local official in a town east of Oran. You find this out through someone who still knows someone. You sit with the information for several days. There is nothing to do with it. That is the specific nature of impunity — it gives you something to know and nowhere to put it.'
      }
      return 'The years of it are over. The people who came for journalists and teachers and novelists are mostly out of the hills or dead or in government — that last one still surprises you, though it shouldn\'t. You have been asked, more than once, to write about that period. You have started and stopped four times. The problem is not the words. The problem is the question of who the words are for.'
    },
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 5
      p.karma += 6
      p.addFlag('intellectual_target_reckoned')
      p.setMem('ft10IntellectualTargetMidlife', true)
    },
  },

  {
    id: 'ft10_intellectual_target_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('intellectual_target') &&
      G.flags.has('intellectual_target_reckoned') &&
      !G.mem?.ft10IntellectualTargetLate &&
      G.age >= 60,
    text: 'A student finds you. They are writing a thesis on the cultural production of the 1990s — the work that survived the decade, the writers who didn\'t. They ask careful questions. You are surprised by how much you remember and how specifically you remember it. Not the fear, exactly, which has faded to something you can look at. The specific objects: which window you worked beside, the generator noise, the hours you kept. You talk for two hours. The student types everything. You feel, afterward, something you don\'t have a word for — not healing, not resolution, something more like being a record that has been read.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 10
      p.setMem('ft10IntellectualTargetLate', true)
    },
  },

  // ── DECENNIE_NOIRE_MEMORY: echo in daily life ──────────────────────────────
  {
    id: 'ft10_decennie_noire_echo',
    phase: null,
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('decennie_noire_memory') &&
      G.age >= 45,
    text: (G) => {
      const inExile = G.flags.has('algeria_exile') || G.flags.has('emigrated')
      if (inExile) {
        return 'Something in the news — a checkpoint, a disappearance, a government that says it is restoring order — and the decade comes back in a particular way. Not as memory exactly. As a reflex. Your body remembers before your mind does: the small adjustment, the checking of exits, the calculation of who is in the room and what they know. You have been here thirty years. The reflex is still from there.'
      }
      return 'The decade is not discussed in the way you might expect. People who lived through it know which conversations to have and which to let settle. The younger ones sometimes ask. You answer partially, which is the only way to answer. Fully would take more than they are ready to hold, and you have learned to be careful with the weight of it.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
    },
  },

// ============================================================
// events_followthrough_11.js
// ============================================================

// ── INSTITUTIONAL COMPLICITY ─────────────────────────────────────────────────

  {
    id: 'ft11_institutional_reckoning_news',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_complicity') &&
      G.age >= 45 &&
      !G.flags.has('institutional_reckoning'),
    text: 'A survivor is named in the news. Then another. The commission\'s findings run to four hundred pages and you do not need to read them to know what they contain. The silence you kept was practical — you told yourself it was pastoral — and now it has a public name. You sit with the newspaper until the light changes.',
    choices: null,
    effect: (p) => { p.m -= 12; p.karma -= 10; p.addFlag('institutional_reckoning') },
  },

  // ── DEBT BANKRUPTCY: CREDIT RECORD ──────────────────────────────────────────

  {
    id: 'ft11_debt_credit_record',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('debt_bankrupt') &&
      G.mem?.debt_bankruptYear &&
      (G.currentYear - G.mem.debt_bankruptYear >= 3) &&
      !G.flags.has('debt_rebuilt_credit') &&
      G.age >= 22,
    text: 'The bankruptcy is behind you now — three years, five, depending on when you count from. The credit record still reads it clearly. You have been turned down for a lease twice. The secured card you carry has a two-hundred-dollar limit and an annual fee that arrives like an insult. People talk about fresh starts. You are learning what the fine print of a fresh start actually looks like.',
    choices: [
      {
        text: 'Keep renting, keep waiting for the seven years to clear.',
        tag: 'debt_patience',
        outcome: 'You wait. The record is old enough now to be fading at the edges. Another year.',
        effect: (p) => { p.addFlag('debt_patience'); p.m -= 4 },
      },
      {
        text: 'Take the predatory credit card offer. Start rebuilding.',
        tag: 'debt_rebuilt_credit',
        outcome: 'The interest rate is twenty-nine percent. You pay the full balance every month, which is the only way this works. After eighteen months, a second card arrives unsolicited. The score has moved.',
        effect: (p) => { p.mo -= 300; p.addFlag('debt_rebuilt_credit'); p.m -= 2; p.w += 2 },
      },
    ],
    effect: null,
  },

  // ── EARTHQUAKE FAMILY LOSS: ANNIVERSARY ─────────────────────────────────────

  {
    id: 'ft11_earthquake_anniversary',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('earthquake_family_loss') &&
      G.age >= 20 &&
      !G.flags.has('earthquake_grief_resolved'),
    text: 'The anniversary of the earthquake comes back every January. You know it by the light, the specific flat grey of the twelfth, before you have checked the date. You still have the rosary your aunt pressed into your hand the last time you visited — a small plastic thing, blue beads, worth nothing except that she touched it. You take it from the drawer in the morning and put it back before work.',
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('earthquake_grief_resolved') },
  },

  // ── KURD MILITANT ADJACENT: STATE PRESSURE ──────────────────────────────────

  {
    id: 'ft11_kurd_state_pressure',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('kurd_militant_adjacent') &&
      G.currentCountry?.name === 'Turkey' &&
      G.age >= 20 &&
      !G.flags.has('kurd_state_pressure'),
    text: 'A man comes to the neighbourhood asking questions — to your neighbour first, then to a cousin. A name close to yours came up somewhere. Your neighbour was held for two days and came back quieter. You know the distinction the state makes between being asked about and being named does not always mean what you think it means.',
    choices: [
      {
        text: 'Deny everything. Cooperate with the inquiry.',
        tag: 'kurd_surveillance_subject',
        outcome: 'You answer the questions carefully. You are released the same afternoon. You do not know what they wrote down.',
        effect: (p) => { p.m -= 10; p.addFlag('kurd_state_pressure'); p.addFlag('kurd_surveillance_subject') },
      },
      {
        text: 'Leave Turkey before they come to you directly.',
        tag: 'kurd_fled_state_pressure',
        outcome: 'You leave quickly, without a story prepared. The word asylum sits in the processing office like a stone. You have never used it about yourself before.',
        effect: (p) => { p.addFlag('kurd_state_pressure'); p.addFlag('emigrated'); p.setResidency('asylum_seeker'); p.m -= 8 },
      },
    ],
    effect: null,
  },

  // ── ID98 WITNESS BYSTANDER: LATE RECKONING ──────────────────────────────────

  {
    id: 'ft11_id98_late_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('id98_witness_bystander') &&
      G.age >= 40 &&
      !G.flags.has('id98_late_reckoning'),
    text: 'It has been years. The trials that were promised did not come. The men who organised what happened in May 1998 went into politics, gave speeches, had buildings named after them. You saw what you saw from your window — the smoke, the direction people were running, the specific moment you decided to step back from the glass. The account you could have given is still inside you, uncollected.',
    choices: null,
    effect: (p) => { p.m -= 8; p.karma -= 5; p.addFlag('id98_late_reckoning') },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PART 2 — ALL 29 ORPHANED FLAGS FROM FLAG AUDIT
  // ═══════════════════════════════════════════════════════════════════════════════

  // ── FIRST_PASSPORT_RECEIVED [major/displacement] ──────────────────────────────

  {
    id: 'ft11_first_passport',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('first_passport_received') && G.age >= 58 && !G.mem?.ft11FirstPassport,
    text: 'The passport is still somewhere in the house. You know which drawer. When you open it — not often — you look at the photograph, the person in it younger than anyone you know now, and at the country\'s name printed across the cover. A country saying: this person is ours. You sat with it the day you received it for longer than the object probably merited. You are glad you did.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11FirstPassport', true) },
  },

  // ── UYGHUR_SUPPRESSED [major/persecution] ─────────────────────────────────────

  {
    id: 'ft11_uyghur_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('uyghur_suppressed') &&
      G.age >= 35 &&
      !G.flags.has('uyghur_detained') &&
      !G.mem?.ft11UyghurSilence,
    text: 'You are aware, now, that the yes comes before you have heard the question. It is not fear exactly — or it is fear that has been so thoroughly rehearsed that the performance and the reflex have become the same thing. Someone asks what you are thinking and you tell them something true and small. You are still learning to notice when you do this.',
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('ft11UyghurSilence', true) },
  },

  // ── INTERRUPTED_CAREER [moderate/career] ──────────────────────────────────────

  {
    id: 'ft11_interrupted_career',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('interrupted_career') &&
      G.age >= 35 && G.age <= 54 &&
      G.career !== null &&
      !G.mem?.ft11InterruptedCareer,
    text: 'A colleague from the year you started — before the service years — has been promoted past you. They are competent; that is not the point. The point is the arithmetic: those years belong to the country, not to you, and the career ladder does not factor them in. You have made this calculation many times. It comes out the same.',
    choices: [
      {
        text: 'Request formal recognition of the service years',
        tag: 'service_years_contested',
        outcome: 'HR notes it. Nothing changes. The record now shows that you raised the question.',
        effect: (p) => { p.karma += 3; p.m -= 3; p.setMem('ft11InterruptedCareer', true) },
      },
      {
        text: 'Accept the gap and work from where you are',
        tag: null,
        outcome: 'You close the file and return to the work. The gap is still there. So are you.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('ft11InterruptedCareer', true) },
      },
    ],
    effect: null,
  },

  // ── VETERAN_SOLIDARITY [moderate/community] ───────────────────────────────────

  {
    id: 'ft11_veteran_solidarity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('veteran_solidarity') && G.age >= 55 && !G.mem?.ft11VetSolidarityLate,
    text: 'You mention to someone younger that you were in — just in passing, the way you do now, without preamble. They look at you with the slightly accelerated attention people give to old photographs. Later in the same conversation you find out they served too. The subject of the next two hours is ordinary things. The conversation is different in kind from the ones you have with people who didn\'t.',
    choices: null,
    effect: (p) => { p.m += 7; p.setMem('ft11VetSolidarityLate', true) },
  },

  // ── DEBT_RESTRUCTURED [moderate/economic] ─────────────────────────────────────

  {
    id: 'ft11_debt_restructured_discipline',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('debt_restructured') && G.age >= 40 && !G.mem?.ft11DebtRestructured,
    text: 'You make the payment on the first of the month. You have not been late once since the restructuring. The bank calls this discipline. You understand it differently: when you have lived inside a situation with no margin, the habits you build to protect the one small choice that remains are the most persistent habits of your life.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('ft11DebtRestructured', true) },
  },

  // ── MEDICAL_DEBT [moderate/economic] ──────────────────────────────────────────

  {
    id: 'ft11_medical_debt_years',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('medical_debt') && G.age >= 35 && !G.mem?.ft11MedicalDebt,
    text: 'The bill arrived weeks after you had stopped thinking about the hospital. The number was not possible and then it was possible because there it was. You spent years on minimum payments that did not touch the principal for the first eighteen months. You know exactly what the treatment cost. You know what it would have cost not to have it. You hold both numbers without being able to say which one was the real price.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 3; p.setMem('ft11MedicalDebt', true) },
  },

  // ── SWAHILI_EDUCATED [moderate/education] ─────────────────────────────────────

  {
    id: 'ft11_swahili_educated_ceiling',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('swahili_educated') &&
      G.age >= 30 && G.age <= 52 &&
      !G.mem?.ft11SwahiliCeiling,
    text: 'The international role requires a particular English — not the English you learned alongside Swahili, but the English of reports, negotiations, and the precision that comes from having spent your entire education in it. You are qualified for everything except the language of the room. The language of the room is not in the job description.',
    choices: [
      {
        text: 'Apply in the English you have',
        tag: 'applied_anyway',
        outcome: 'You apply. The interview goes better than you expected. The accent is yours and it stays yours.',
        effect: (p) => { p.m += 5; p.karma += 3; p.e += 4; p.setMem('ft11SwahiliCeiling', true) },
      },
      {
        text: 'Find a path that doesn\'t require their room',
        tag: null,
        outcome: 'You find something else. It is good work. The other question remains, unanswered.',
        effect: (p) => { p.m += 2; p.r += 3; p.setMem('ft11SwahiliCeiling', true) },
      },
    ],
    effect: null,
  },

  // ── FRANCOPHONE_EDUCATED [moderate/education] ─────────────────────────────────

  {
    id: 'ft11_francophone_educated_ambivalence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('francophone_educated') && G.age >= 32 && !G.mem?.ft11FrancophoneAmbivalence,
    text: 'The degree is recognised in Paris and Dakar and Geneva. You have walked through the rooms it opens and know what they contain. The question you return to is not whether the education was good — it was — but who it was made for and what it was built to produce. You were supposed to emerge from it as something recognisable to the people who designed the system. You did. You have been sitting with that since.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 4; p.setMem('ft11FrancophoneAmbivalence', true) },
  },

  // ── EBOLA_SURVIVOR [moderate/health] ──────────────────────────────────────────

  {
    id: 'ft11_ebola_survivor_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ebola_survivor') &&
      G.age >= 28 &&
      G.currentYear >= 2016 &&
      !G.mem?.ft11EbolaSurvivor,
    text: 'Someone coughs across the room and for a moment you are in 2014. Not a flashback — nothing as dramatic as that. Just the body running its old protocols before the reasoning catches up. The fear that came with the epidemic did not entirely leave with it. You have learned to recognise this as information rather than threat. You know what a quarantine line looks like from the inside. Most people don\'t.',
    choices: null,
    effect: (p) => { p.m -= 4; p.h -= 1; p.setMem('ft11EbolaSurvivor', true) },
  },

  // ── KURD_LANGUAGE_MOMENT [moderate/identity] ──────────────────────────────────

  {
    id: 'ft11_kurd_language_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('kurd_language_moment') && G.age >= 55 && !G.mem?.ft11KurdLanguageLate,
    text: 'You think sometimes about the day you pulled over — the radio broadcast, the first time in your adult life you heard the language in public as if it were an ordinary thing. You stayed in the car for twenty minutes. You were late to wherever you were going. The person you described it to later understood the moment but not the weight of it. Some things require the full context to land, and the full context is the life.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft11KurdLanguageLate', true) },
  },

  // ── SEEN_THE_GAP [moderate/identity] ─────────────────────────────────────────

  {
    id: 'ft11_seen_the_gap_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('seen_the_gap') && G.age >= 48 && !G.mem?.ft11SeenTheGap,
    text: 'You have translated many things. Sentences, documents, the weight of testimony that was supposed to go on the record accurately. You have put words on the record that were not quite the words said — not because you were careless, but because there was no equivalent, and you had to choose which meaning to sacrifice. You know which choices you made. Some of them are still with you.',
    choices: null,
    effect: (p) => { p.m -= 3; p.karma += 5; p.e += 3; p.setMem('ft11SeenTheGap', true) },
  },

  // ── ORIGIN_COUNTRY_VISITED [moderate/identity] ────────────────────────────────

  {
    id: 'ft11_origin_country_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('origin_country_visited') && G.age >= 48 && !G.mem?.ft11OriginCountryLate,
    text: 'The trip gave you some things and withheld others. The landscape matched something you could not have remembered. The faces had a logic you recognised without having learned it. What you hoped the trip would resolve was the question of where you are from. It did not resolve that. You understand now that it couldn\'t. You are less disappointed about this than you expected.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('ft11OriginCountryLate', true) },
  },

  // ── KAFALA_DOCUMENTED [moderate/labor] ────────────────────────────────────────

  {
    id: 'ft11_kafala_passport_back',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('kafala_documented') && G.age >= 22 && !G.mem?.ft11KafalaPassportBack,
    text: 'The contract ends. The employer hands you the passport across the desk. You take it without a word — the correct response, the safe response. On the street you open it to the photograph page and hold it for a while. You have held your own document before, in your own country. It did not feel like this. You understand something now about what it costs to need someone else\'s permission to be yourself.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('ft11KafalaPassportBack', true) },
  },

  // ── FORCED_HARVEST [moderate/labor] ───────────────────────────────────────────

  {
    id: 'ft11_forced_harvest_september',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('forced_harvest') && G.age >= 48 && !G.mem?.ft11ForcedHarvest,
    text: 'September still has a particular weight. You are aware of it every year — the moment when school should be starting, which is also the moment the quota had to be met, which is also the moment your hands were doing something that had nothing to do with what you were supposed to be learning. The school seasons are behind you now. September still knows.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('ft11ForcedHarvest', true) },
  },

  // ── KURD_CITIZENSHIP_RESTORED [moderate/legal] ────────────────────────────────

  {
    id: 'ft11_kurd_citizenship_restored_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('kurd_citizenship_restored') &&
      G.age >= 50 &&
      !G.mem?.ft11KurdCitizenshipLate,
    text: 'They gave you a citizenship in April 2011. Forty-nine years after they had taken it, the decree restored it — you understood the political calculation, that the uprising had just started and the concession was part of the management. You took the document anyway. Three months later the war began. The citizenship was real and it was insufficient and you have been holding both of those things since, because both are true.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 4; p.setMem('ft11KurdCitizenshipLate', true) },
  },

  // ── KURD_RETURNED_HOME [moderate/migration] ───────────────────────────────────

  {
    id: 'ft11_kurd_returned_dissonance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kurd_returned_home') &&
      G.age >= 35 &&
      !G.mem?.ft11KurdReturnedDissonance,
    text: 'You came back expecting to recognise it, and not expecting it to recognise you. The second part was accurate. The first part was also accurate — you knew the streets, the direction of the wind, the sound the market made on Fridays — but recognition is not the same as belonging. The years abroad made you something without a clean name in either language. The return did not change that. It clarified it.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 5; p.setMem('ft11KurdReturnedDissonance', true) },
  },

  // ── INSTITUTIONAL_DOUBT [moderate/moral] ──────────────────────────────────────

  {
    id: 'ft11_institutional_doubt_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_doubt') &&
      G.age >= 60 &&
      !G.mem?.ft11InstitutionalDoubt,
    text: 'You noticed things and did not speak them fully — or spoke them to the wrong people, or in a frame that allowed the institution to process your concern without changing anything. That is what institutions do. You are old enough now to have watched several institutions do the same thing, which does not redeem what you did but places it in its proper category: ordinary, structural, and repeated across every institution you have seen.',
    choices: null,
    effect: (p) => { p.r += 4; p.karma -= 2; p.setMem('ft11InstitutionalDoubt', true) },
  },

  // ── INSTITUTIONAL_DISSENT [moderate/moral] ────────────────────────────────────

  {
    id: 'ft11_institutional_dissent_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_dissent') &&
      G.age >= 58 &&
      !G.mem?.ft11InstitutionalDissent,
    text: 'You wrote the letter. The response was measured and considered and ultimately structured to foreclose further dialogue while appearing to engage with it. You are still in the institution. That is the accurate summary of what happened. What you did cost something and changed something, and you are still not certain those two things are the same something.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 6; p.setMem('ft11InstitutionalDissent', true) },
  },

  // ── HAI_TRANSITION_GENERATION [moderate/political] ────────────────────────────

  {
    id: 'ft11_haiti_transition_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hai_transition_generation') &&
      G.age >= 48 &&
      !G.mem?.ft11HaitiTransition,
    text: 'Baby Doc left on February 7, 1986. You were in the city — the specific noise of relief that fills a place when a long thing ends. You believed, in that morning, that the ending was also a beginning. You have revised this belief several times since, in both directions, without arriving at a final position. What you know now is that the morning was real. What it was the morning of is a more complicated question.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 4; p.setMem('ft11HaitiTransition', true) },
  },

  // ── COLONIAL_SUBJECT [moderate/political] ─────────────────────────────────────

  {
    id: 'ft11_colonial_subject_election',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('colonial_subject') &&
      G.age >= 25 &&
      !G.mem?.ft11ColonialElection,
    text: 'The results come in from the mainland. You are an American citizen and you will live under the outcome — the policy, the court appointments, the conditions of the next four years. You had no vote. That is the specific constitutional arrangement of your citizenship: American citizen, no vote for president, represented in Congress by a delegate who cannot vote on the floor. The other word for this arrangement is not used in the official documents.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.setMem('ft11ColonialElection', true) },
  },

  // ── EARTHQUAKE_CAMP_SURVIVOR [moderate/trauma] ────────────────────────────────

  {
    id: 'ft11_earthquake_camp_survivor_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('earthquake_camp_survivor') &&
      G.age >= 40 &&
      !G.mem?.ft11EarthquakeCamp,
    text: 'The news is about Haiti again. Something new — it is always something new. You watch the footage with the attention of someone who recognises what the blue tarpaulins mean in practice, what twice-weekly water trucks mean as a schedule, what the UN emblem on the vehicle says about what will and won\'t be done. You know what happens after the cameras move to the next thing. The cameras are moving to the next thing.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 4; p.setMem('ft11EarthquakeCamp', true) },
  },

  // ── AMAZIGH_RECOGNITION_ERA [minor/identity] ──────────────────────────────────

  {
    id: 'ft11_amazigh_recognition_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('amazigh_recognition_era') &&
      G.age >= 48 &&
      !G.mem?.ft11AmazighLate,
    text: 'The constitution recognised Tamazight in 2011. The government sign went up — your grandmother\'s letters on official signage, in the language she taught you behind a closed door. You stood in front of that sign for a long time. The recognition was real. The resources did not follow at the same pace. You have learned to hold both of those things without requiring them to resolve into a single feeling.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11AmazighLate', true) },
  },

  // ── OFW_NEW_PLACEMENT [minor/labor] ───────────────────────────────────────────

  {
    id: 'ft11_ofw_new_placement_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('ofw_new_placement') && G.age >= 22 && !G.mem?.ft11OfwNewPlacement,
    text: 'The new contract is better. The employer is not unkind. You have calibrated your expectations accordingly, which is itself information about what your expectations used to be. The work is the same work. The money goes home at the same rate. The difference between this situation and the last one is not visible to anyone who hasn\'t lived inside both.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11OfwNewPlacement', true) },
  },

  // ── INFORMAL_ABROAD [minor/labor] ─────────────────────────────────────────────

  {
    id: 'ft11_informal_abroad_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('informal_abroad') && G.age >= 20 && !G.mem?.ft11InformalAbroad,
    text: 'You are working without papers, in a country that is not yours, in an arrangement that depends on no one official noticing. You have learned which streets, which hours, which conversations are navigable. The specific knowledge of a person operating just below the threshold of official attention accumulates into competence. You do not celebrate this. It is what the situation requires.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.setMem('ft11InformalAbroad', true) },
  },

  // ── CARE_WORK_DONE [minor/labor] ──────────────────────────────────────────────

  {
    id: 'ft11_care_work_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('care_work_done') && G.age >= 45 && !G.mem?.ft11CareWorkLate,
    text: 'You cared for someone until there was nothing more to care for. The specific weight of it — the things you learned to do, the hours, what you witnessed — is not the kind of thing that translates into a summary. You were present for something that most people arrange not to see up close. You are still carrying what that cost, and what it gave. They are the same thing from different angles.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 6; p.setMem('ft11CareWorkLate', true) },
  },

  // ── OFW_CYCLE_WITNESS [minor/migration] ───────────────────────────────────────

  {
    id: 'ft11_ofw_cycle_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_cycle_witness') &&
      G.age >= 48 &&
      !G.mem?.ft11OfwCycleWitness,
    text: 'Your child is now the age you were when you left. They are talking about going. You hear yourself in the reasons they give and in the things they don\'t say. You have the specific receipts — what the contract costs, what the absence costs, what the money makes possible and what it doesn\'t. You are not certain that knowing would have changed what you decided. You are less certain it would change what they decide.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 4; p.setMem('ft11OfwCycleWitness', true) },
  },

  // ── MULTIPARTY_GENERATION [minor/political] ───────────────────────────────────

  {
    id: 'ft11_multiparty_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('multiparty_generation') &&
      G.age >= 52 &&
      !G.mem?.ft11MultipartyLate,
    text: 'You remember the first ballot with an opposition name on it — the polling booth, the paper, the feeling of marking a line no one had told you to make. What democracy delivered since has been complicated and insufficient and real. You don\'t simplify it in either direction. Neither the people who say it changed nothing nor the ones who say it changed everything are describing what you have watched happen.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.setMem('ft11MultipartyLate', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // DESIRE TENSION EVENTS — leave_mark and redemption
  // These two desires were missing from events_followthrough_8.js.
  // Pattern: places the character's wound in a specific present-day situation
  // with a fork between acting from the wound or against it.
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ft11_desire_leave_mark',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 36 && G.age <= 54 &&
      !G.mem?.ft11DesireLeaveMark,
    text: 'Something you built — a project, a programme, a body of work — is at risk of being dismantled. It would survive with your involvement; without it, probably not. Going back in costs things you have spent years building elsewhere. The work would outlive this year with your name eventually removed from the story of how it survived. You would know. No one else would know you were the reason.',
    choices: [
      {
        text: 'Go back in. The work matters more than the credit.',
        tag: 'leave_mark_acted',
        outcome: 'You go back. The work survives. The cost is real. You find you can live with it more easily than you expected.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.r -= 4; p.setMem('ft11DesireLeaveMark', true) },
      },
      {
        text: 'Let it go. What you built was real while it lasted.',
        tag: null,
        outcome: 'You walk away. The work does not survive the year. Something in you keeps the accounting.',
        effect: (p) => { p.m -= 5; p.r += 6; p.setMem('ft11DesireLeaveMark', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft11_desire_redemption',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 34 && G.age <= 54 &&
      !G.mem?.ft11DesireRedemption,
    text: 'The person you wronged is somewhere you could reach. Not catastrophically — no great crime — but you turned away at the moment someone needed, or told a version of events that served you, or let them carry something you should have shared. They don\'t know you carry it. Reaching out would be for you as much as for them. You are honest enough to know this. You\'re also not sure it means the reaching shouldn\'t happen.',
    choices: [
      {
        text: 'Reach out. Expect nothing in return.',
        tag: 'attempted_repair',
        outcome: 'You reach out. The response is uncertain and partial and real. Something loosens that you have been holding for years.',
        effect: (p) => { p.m += 5; p.karma += 10; p.r -= 6; p.setMem('ft11DesireRedemption', true) },
      },
      {
        text: 'Leave it in the past. Some repair is not yours to make.',
        tag: null,
        outcome: 'You leave it. The logic holds. The thing you\'re carrying doesn\'t entirely agree with the logic.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft11DesireRedemption', true) },
      },
    ],
    effect: null,
  },


  // ═══════════════════════════════════════════════════════════════════════════════
  // PART 3 — IDENTITY FLAG FOLLOW-THROUGHS (Mode B: never-checked identity flags)
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ft11_military_reunion',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('military_service') &&
      G.age >= 40 && G.age <= 60 &&
      !G.mem?.ft11MilReunion,
    text: 'Someone from your service years gets back in touch — a reunion, or a message, or a name in someone else\'s news. You had forgotten how well you knew those people, or at least how much you knew about them in a specific context. The context was extreme enough that what you knew felt like more than it was. The person in the message is the same person. They are also someone who has had twenty years of life you weren\'t part of.',
    choices: [
      {
        text: 'Respond. Go, if there\'s a gathering.',
        tag: null,
        outcome: 'The conversation has the strangeness of all reunions — the version of you they remember and the version you are now both present at once. It is stranger with people who knew you under pressure.',
        effect: (p) => { p.m += 6; p.s += 3; p.setMem('ft11MilReunion', true) },
      },
      {
        text: 'Leave it. That chapter is closed.',
        tag: null,
        outcome: 'You don\'t respond. You think about them occasionally for the next few weeks. Then you don\'t.',
        effect: (p) => { p.r += 3; p.setMem('ft11MilReunion', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft11_compliance_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('pragmatic_compliance') &&
      G.age >= 55 &&
      !G.mem?.ft11ComplianceReckoning,
    text: 'The system you accommodated has changed — ended, or softened, or renamed itself, or simply become something people speak of in the past tense. Someone asks you what it was like. A younger person who knows the history but not the texture. You are trying to find the accurate thing to say: not self-exonerating, not self-flagellating. The accurate thing is somewhere in between and hard to put into words that the person asking will understand without having been there.',
    choices: [
      {
        text: 'Tell them the fuller version. Including the parts you\'re not proud of.',
        tag: null,
        outcome: 'The telling is harder than you expected. They listen seriously. You are not sure if they understand, but the attempt matters.',
        effect: (p) => { p.m -= 4; p.karma += 8; p.r += 5; p.setMem('ft11ComplianceReckoning', true) },
      },
      {
        text: 'Give them the version that preserves your dignity. It isn\'t a lie.',
        tag: null,
        outcome: 'They seem satisfied. You are less satisfied. That gap is now a permanent fixture.',
        effect: (p) => { p.r += 8; p.setMem('ft11ComplianceReckoning', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft11_lost_home_return',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_home') &&
      G.age >= 35 && G.age <= 65 &&
      !G.mem?.ft11LostHomeReturn,
    text: 'You pass through the neighbourhood, or the street, or you hear specific news of the place and find yourself looking it up. The building is still there or it isn\'t. If it\'s still there, it looks different in the way that things look different when they no longer have anything to do with you. If it isn\'t, there is something else there now, which is its own specific thing to feel.',
    choices: [
      {
        text: 'Go closer. Walk through it.',
        tag: null,
        outcome: 'The sensory memory is more complete than the visual one. A smell, a particular quality of light, something about the acoustics of that street. You stay longer than you intended.',
        effect: (p) => { p.m -= 6; p.r += 6; p.karma += 3; p.setMem('ft11LostHomeReturn', true) },
      },
      {
        text: 'Look from a distance. That\'s enough.',
        tag: null,
        outcome: 'You look for long enough to know you\'ve seen it and then you leave. That feels like the right amount.',
        effect: (p) => { p.m -= 3; p.r += 3; p.setMem('ft11LostHomeReturn', true) },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_12.js
// ============================================================

{
    id: 'ft12_prove_worth_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.age >= 62 &&
      !G.flags.has('desire_prove_worth_fulfilled') &&
      !G.mem.ft12ProveWorth,
    text: 'You are old enough now to see the shape of your life from the outside. The thing you wanted to prove — that you were enough, that the early verdict was wrong — you worked toward it through a version of urgency that people around you sometimes called ambition and sometimes called anxiety. Whether it was satisfied is a different question from whether you stopped trying. You are not sure you stopped trying. You are not sure you started knowing what proof would look like.',
    choices: [
      {
        text: 'You made your peace with the question.',
        tag: null,
        outcome: 'The question changes shape but doesn\'t leave. You have learned to carry it differently.',
        effect: (p) => { p.m += 4; p.karma += 4; p.setMem('ft12ProveWorth', true) },
      },
      {
        text: 'The work still isn\'t done.',
        tag: null,
        outcome: 'There is still something to prove. You are aware this is both true and possibly not the most useful frame for the years you have left. You carry both.',
        effect: (p) => { p.r += 5; p.setMem('ft12ProveWorth', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_belong_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 62 &&
      !G.flags.has('desire_belong_fulfilled') &&
      !G.mem.ft12Belong,
    text: 'The groups you joined, the communities you found yourself in and then outside of again. The belonging that arrived and then didn\'t hold, or held for a while and then changed around you while you stayed the same. You are old enough now to see that belonging was never quite the stable thing the word implied. It required maintenance, and the maintenance required you to become slightly different versions of yourself in succession, and at some point you stopped.',
    choices: [
      {
        text: 'You found a version of it that was enough.',
        tag: null,
        outcome: 'Small but durable. One person, or a few. A place. Enough.',
        effect: (p) => { p.m += 5; p.s += 2; p.setMem('ft12Belong', true) },
      },
      {
        text: 'You made your peace with being somewhat outside.',
        tag: null,
        outcome: 'The outside has its own texture. You have furnished it over time.',
        effect: (p) => { p.m += 2; p.karma += 5; p.setMem('ft12Belong', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_be_seen_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 62 &&
      !G.flags.has('desire_be_seen_fulfilled') &&
      !G.mem.ft12BeSeen,
    text: 'What you wanted was to be recognized: not famous, necessarily, but seen — the specific you, not the category you occupied. It happened sometimes. A teacher once. A colleague for a period. A partner who saw you clearly for a year before seeing something else. The recognition was real when it arrived. What surprised you was how briefly it satisfied the thing it was supposed to satisfy. You would be seen and then still feel the same need. You are still not sure what the need is, exactly. Closer than a need for approval, more precise than a need for love.',
    choices: [
      {
        text: 'You have been seen. The moments were enough.',
        tag: null,
        outcome: 'Small clearings in a longer story. You hold them.',
        effect: (p) => { p.m += 5; p.setMem('ft12BeSeen', true) },
      },
      {
        text: 'It wasn\'t quite what you needed, even when it arrived.',
        tag: null,
        outcome: 'The gap between being recognized and feeling recognized: you know it intimately. This is also a kind of knowledge.',
        effect: (p) => { p.r += 4; p.karma += 3; p.setMem('ft12BeSeen', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_safety_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 62 &&
      !G.flags.has('desire_safety_fulfilled') &&
      !G.mem.ft12Safety,
    text: 'You spent a significant portion of your life managing the possibility of things going wrong. The contingencies: what happens if the money runs out, what happens if the relationship fails, what happens if the health turns. Some of this management was functional. Some of it was the early experience of instability translated into an adult practice of preparing for catastrophe that then did not arrive. You are old enough now to see the cost of the management alongside its benefits.',
    choices: [
      {
        text: 'The preparation kept you safe. You don\'t regret it.',
        tag: null,
        outcome: 'Safety is not nothing. The foundations held. The cost was worth the structure.',
        effect: (p) => { p.m += 4; p.h += 2; p.setMem('ft12Safety', true) },
      },
      {
        text: 'Some of the preparation kept you from other things.',
        tag: null,
        outcome: 'The unlived risks. You name a few. You are not sure whether you would have taken them if the early experience had been different.',
        effect: (p) => { p.r += 6; p.karma += 2; p.setMem('ft12Safety', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_connection_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 62 &&
      !G.flags.has('desire_connection_fulfilled') &&
      !G.flags.has('partner') &&
      !G.mem.ft12Connection,
    text: 'What you wanted was close proximity to another person — not the abstraction of love but the specific daily practice of a life alongside someone who knew what you were actually like and remained. You had pieces of it. A relationship that lasted a decade. A friendship of the kind that doesn\'t require explanation. A child who calls on a regular basis. These were real. What you also had was the specific loneliness of people who know what they want and have only had partial versions of it.',
    choices: [
      {
        text: 'The partial versions were enough.',
        tag: null,
        outcome: 'Not everything you want arrives complete. What arrived was real.',
        effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft12Connection', true) },
      },
      {
        text: 'You still feel the want.',
        tag: null,
        outcome: 'In the evenings, mostly. You have learned to sit with it. That is not the same as not feeling it.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft12Connection', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_leave_mark_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 62 &&
      !G.flags.has('desire_leave_mark_fulfilled') &&
      !G.flags.has('famous') &&
      !G.mem.ft12LeaveMark,
    text: 'What you wanted was to make something that would outlast you. A work, a child, a thing in the world that would exist after you stopped existing. You made things. Some of them persist. Whether they will persist past the point where anyone who knew you is also gone — this is the question the desire was always really asking, and it is a question that cannot be answered in your lifetime by design.',
    choices: [
      {
        text: 'What you made is enough.',
        tag: null,
        outcome: 'The mark is in the record. What happens to the record is not yours to determine.',
        effect: (p) => { p.m += 4; p.karma += 5; p.setMem('ft12LeaveMark', true) },
      },
      {
        text: 'You wanted more than what you made.',
        tag: null,
        outcome: 'The wanting is also a piece of evidence about what you valued. That is not a small thing to know about yourself.',
        effect: (p) => { p.r += 5; p.m += 2; p.setMem('ft12LeaveMark', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_freedom_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'freedom' &&
      G.age >= 62 &&
      !G.flags.has('desire_freedom_fulfilled') &&
      !G.mem.ft12Freedom,
    text: 'The freedom you wanted was not just absence of constraint — it was the specific feeling of moving through the world without owing anyone an explanation. You had moments of it. Some years were freer than others. What you also had was the discovery that freedom without attachment has its own costs, and that the constraints you accumulated over time — children, debts, a place you had put down roots — were also the things that made the freedom worth having when it arrived.',
    choices: [
      {
        text: 'You found enough of it.',
        tag: null,
        outcome: 'The specific years that were free. The choices that were yours. You count them and they are enough.',
        effect: (p) => { p.m += 6; p.setMem('ft12Freedom', true) },
      },
      {
        text: 'More of your life was obligated than you planned.',
        tag: null,
        outcome: 'The obligations were real and some of them were worth it. That is not quite the same as having chosen them freely. You know the difference.',
        effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft12Freedom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_redemption_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 62 &&
      !G.flags.has('desire_redemption_fulfilled') &&
      !G.mem.ft12Redemption,
    text: 'The thing you did, or the thing that was done to you, that required making right — you spent a portion of your life in its vicinity. Making amends, or preparing to. Carrying the weight of it in a way that expressed itself as effort in other domains. Whether the redemption actually happened is a different question from whether you moved toward it. You moved toward it. The arrival is harder to confirm.',
    choices: [
      {
        text: 'You did what you could. It is enough.',
        tag: null,
        outcome: 'The account is not settled but the effort was real. You put it down.',
        effect: (p) => { p.m += 5; p.karma += 8; p.r -= 4; p.setMem('ft12Redemption', true) },
      },
      {
        text: 'The weight is still there.',
        tag: null,
        outcome: 'It has changed shape over time. It is lighter than it was. It is not gone.',
        effect: (p) => { p.r += 4; p.karma += 4; p.setMem('ft12Redemption', true) },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_13.js
// ============================================================

// ─── INSTITUTIONAL POWER ─────────────────────────────────────────────────────

  {
    id: 'inst_power_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('institutional_power') && G.age >= 58 && !G.flags.includes('inst_power_accounted'),
    text: 'You have held the position for two decades. A younger priest — or imam, or minister — comes to you privately with a question about a decision the institution made in the past that the institution would prefer not to revisit. He has found something in the archive. He wants to know what you know.',
    choices: [
      {
        text: 'Tell him what you know.',
        tag: 'honest',
        outcome: 'You tell him the full account. The institution\'s version and what actually happened and the distance between them. He listens without interrupting. You have not said this out loud before.',
        effect: (p) => { p.addFlag('inst_power_accounted'); p.addFlag('spoke_institutional_truth'); p.m += 5; p.karma += 4; },
      },
      {
        text: 'Give him the official account.',
        tag: 'protect',
        outcome: 'You give him the version the institution has agreed on. He thanks you. He is not entirely convinced. You know this because you were not entirely convinced at his age either.',
        effect: (p) => { p.addFlag('inst_power_accounted'); p.r += 3; },
      },
    ],
  },

  // ─── CLERGY ADAPTED ──────────────────────────────────────────────────────────

  {
    id: 'clergy_adapted_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('clergy_adapted') && G.age >= 65 && !G.flags.includes('clergy_adapted_reckoned'),
    text: 'You are old enough to see the full shape of what the adaptation cost. The sermons that said what the state needed to hear in words that sounded like faith. The silence about the things you should not have been silent about. The theology of the possible that kept you alive and kept the congregation intact and also kept certain crimes uncontested. God and the state. The account has been running a long time.',
    choices: [
      {
        text: 'Speak to the young clergy about it.',
        tag: 'witness',
        outcome: 'You tell them what you did and why and what it cost. The telling is the most honest thing you have done in this role. They listen with a quality of attention you have not received in years.',
        effect: (p) => { p.addFlag('clergy_adapted_reckoned'); p.addFlag('spoke_institutional_truth'); p.m += 6; p.karma += 5; },
      },
      {
        text: 'Keep the silence you have always kept.',
        tag: 'silence',
        outcome: 'Some accounts are settled privately. You have made your accounting with God, or the version of God that survived the adaptation. The young clergy will learn what they learn. You have carried this far enough.',
        effect: (p) => { p.addFlag('clergy_adapted_reckoned'); p.r += 4; },
      },
    ],
  },

  // ─── YESHIVA TRAINED ─────────────────────────────────────────────────────────

  {
    id: 'yeshiva_secular_translation',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('yeshiva_trained') && G.age >= 24 && G.age <= 40 && !G.flags.includes('yeshiva_secular_bridge'),
    text: 'A colleague asks where your way of arguing comes from — the habit of holding a problem from multiple angles at once, looking for the question underneath the question, refusing to let a contradiction go unexamined. You say: where I was trained. They ask: where was that? You say it. They are surprised, or they are not surprised, depending on who they are.',
    choices: null,
    effect: (p) => {
      p.addFlag('yeshiva_secular_bridge')
      p.e += 3
      p.s += 2
    },
  },

  // ─── AMAZIGH IDENTITY ────────────────────────────────────────────────────────

  {
    id: 'amazigh_official_recognition',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('amazigh_identity') && G.age >= 40 && G.currentYear >= 2011 && !G.flags.includes('amazigh_recognized_late'),
    text: 'Tamazight is in the constitution now. The Tifinagh script appears on official signs. After years in which the language and name were not officially acknowledged, they are acknowledged. You stand in front of one of the new signs for longer than is strictly necessary.',
    choices: null,
    effect: (p) => {
      p.addFlag('amazigh_recognized_late')
      p.m += 5
      p.e += 2
    },
  },

  // ─── MULTILINGUAL IDENTITY ───────────────────────────────────────────────────

  {
    id: 'multilingual_inheritance',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('multilingual_identity') && (G.children ?? []).length > 0 && G.age >= 32 && !G.flags.includes('multilingual_inheritance_passed'),
    text: 'Your child mixes languages in a single sentence in a way that is grammatically impossible in either language and perfectly clear in both simultaneously. You understand every word and the logic of the construction. The construction would be opaque to someone with only one of the languages. You are laughing before they finish.',
    choices: null,
    effect: (p) => {
      p.addFlag('multilingual_inheritance_passed')
      p.m += 6
    },
  },

  // ─── MINORITY LANGUAGE SPEAKER ───────────────────────────────────────────────

  {
    id: 'minority_language_grandchild',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('minority_language_speaker') && (G.children ?? []).length > 0 && G.age >= 55 && !G.flags.includes('language_spoken_to_grandchild'),
    text: 'You are speaking to your grandchild in the language your grandparents spoke to you. The child is learning it — slowly, incompletely, with an accent you do not have. The linguists would call this a reclamation. You call it a Tuesday afternoon with someone you love.',
    choices: null,
    effect: (p) => {
      p.addFlag('language_spoken_to_grandchild')
      p.m += 6
      p.karma += 3
    },
  },

  // ─── KURD EUROPE DIASPORA ────────────────────────────────────────────────────

  {
    id: 'kurd_europe_return_question',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('kurd_europe_diaspora') && G.age >= 35 && G.age <= 58 && !G.flags.includes('kurd_europe_question_faced'),
    text: 'The question comes up at the community association. Some people have gone back — the village is there or rebuilt or something is there. The political conditions have changed or appear to have changed. Someone has returned and written about it. Someone else tried and came back. You have the question now and it will not stop being the question.',
    choices: [
      {
        text: 'Begin making plans to return.',
        tag: 'return',
        outcome: 'The process is long and the outcome is uncertain and you are doing it anyway. Whatever the village is now, you need to see it.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); p.addFlag('kurd_return_planning'); p.m += 3; },
      },
      {
        text: 'Stay with the life built here.',
        tag: 'stay',
        outcome: 'The life you have built in this country is real. Your children do not speak Kurmanji at home. The decision makes sense and it is still a loss of a particular kind.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); p.r += 2; },
      },
      {
        text: 'Keep the question open.',
        tag: 'open',
        outcome: 'The question belongs to you. You do not have to answer it on anyone else\'s timeline.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); },
      },
    ],
  },

  // ─── MOROCCAN DIASPORA ───────────────────────────────────────────────────────

  {
    id: 'moroccan_diaspora_counting',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('moroccan_diaspora') && G.age >= 60 && !G.flags.includes('moroccan_diaspora_looking_back'),
    text: 'You have been here longer than you were there. The arithmetic crossed some years ago and you missed the exact moment. The house in Casablanca or Fès or Nador is your niece\'s now, or rented, or different in ways that would not be recognisable. The crossing of the Strait was a one-way crossing that did not know itself as one-way at the time.',
    choices: null,
    effect: (p) => {
      p.addFlag('moroccan_diaspora_looking_back')
      p.r += 3
      p.m += 2
    },
  },

  // ─── MOURIDE MEMBER ──────────────────────────────────────────────────────────

  {
    id: 'mouride_diaspora_dahira',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('mouride_member') && G.currentCountry !== G.character?.country?.name && G.age >= 28 && !G.flags.includes('mouride_diaspora_dahira'),
    text: 'The dahira meets in someone\'s apartment. Eight people. A recording of the khassaïds from the phone. The smell of rice and fish from the kitchen. You are in a country that does not know what you are doing here on a Saturday evening. You know. The eight people know. The brotherhood crossed the ocean with you.',
    choices: null,
    effect: (p) => {
      p.addFlag('mouride_diaspora_dahira')
      p.m += 6
      p.karma += 3
    },
  },

  // ─── DEBT RECOVERED ──────────────────────────────────────────────────────────

  {
    id: 'debt_zero_moment',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('debt_recovered') && !G.flags.includes('debt_free_milestone'),
    text: 'You paid the last of it. The number is zero. You have checked it three times because the zero has not been there before. The years of payments. The specific arithmetic of every month, the interest that ate the first years of repayments, the slow turn of the principal. All of it: gone.',
    choices: null,
    effect: (p) => {
      p.addFlag('debt_free_milestone')
      p.m += 7
      p.w += 2
      p.mo += 500
    },
  },

  // ─── INDIA DEPTH FOLLOW-THROUGHS ─────────────────────────────────────────────

  {
    id: 'ind_considered_emigration_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('considered_emigration') &&
      G.character.country.name === 'India' &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.indEmigrationEcho,
    text: 'The tab is still in your browser history. You have not looked at it in three years. Someone you were at school with has sent a WhatsApp from a city you researched once — their salary, in passing, their school, the one their daughter gets into. You do the arithmetic again, the same arithmetic as before, and it produces the same result as before, and you close the tab again.',
    choices: [
      {
        text: 'The arithmetic tips the other way this time.',
        tag: null,
        outcome: 'You open a new tab. You send an email. The next step is not commitment — it is information-gathering. You tell yourself this.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('emigration_reconsidered'); p.setMem('indEmigrationEcho', true); },
      },
      {
        text: 'You close the tab. You are building here.',
        tag: null,
        outcome: 'The decision costs something and gives something back. You make it again, which means it was a decision. Every few years, the test returns. So far, this is the answer.',
        effect: (p) => { p.karma += 3; p.m += 4; p.addFlag('chose_to_stay'); p.setMem('indEmigrationEcho', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_first_gen_defied_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('first_gen_defied') &&
      G.character.country.name === 'India' &&
      G.age >= 35 && G.age <= 52 &&
      !G.mem?.indFirstGenEcho,
    text: 'Your father is getting older. The three weeks of silence had a shape and you still remember the shape of it. You are doing the thing you said you wanted to do, or a version of it — perhaps an approximated version, the one that was achievable rather than the one that was dreamed. You do not know if he is proud. He has not used that word. He has watched, and come to events, and not used the word.',
    choices: [
      {
        text: 'You have this conversation directly.',
        tag: null,
        outcome: 'He does not quite say it, but the conversation is different from the silences that followed the original one. Something is released.',
        effect: (p) => { p.m += 8; p.r -= 5; p.karma += 4; p.addFlag('first_gen_reconciled'); p.setMem('indFirstGenEcho', true); },
      },
      {
        text: 'You leave the conversation unfinished, as it has always been.',
        tag: null,
        outcome: 'The silence continues at a different pitch than the original — not cold, just careful. You have learned to read what he means through what he does not say.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('first_gen_distance_kept'); p.setMem('indFirstGenEcho', true); },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_14.js
// ============================================================

// ── USA FOLLOW-THROUGHS ─────────────────────────────────────────────────────

  {
    id: 'ft14_jim_crow_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('jim_crow_childhood') &&
      G.age >= 60 &&
      !G.mem?.ft14JimCrowLate,
    text: 'Sixty years since the water fountain. The signs are gone. What remains is harder to photograph: the reflex of the second calculation, the scan of a room, the reading of who else is there. The civil rights laws passed. The enforcement of the laws was the next struggle. The struggle after that was the enforcement of the enforcement. You have been alive for several rounds of it. The country progresses and regresses and progresses again and the speed of the progression is always slower than the urgency requires.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.karma += 4
      p.setMem('ft14JimCrowLate', true)
    },
  },

  {
    id: 'ft14_civil_rights_legacy',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('civil_rights_movement_participant') &&
      G.age >= 65 &&
      !G.mem?.ft14CivilRightsLegacy,
    text: 'Someone asks you about it — a grandchild, a student, a journalist. You tell the part that is tellable. There is another part. The part about what it cost the people around you, the specific faces of the specific people who paid things you did not pay. The movement became history and you became a person who was in the history. Being a person who was in the history is different from being in the history. The history is cleaner than the thing itself.',
    choices: [
      {
        text: 'You tell it as fully as you can. What happened is worth being told.',
        tag: null,
        outcome: 'The telling is imperfect and necessary. The person listening carries some of it forward. You cannot know which part.',
        effect: (p) => { p.m += 4; p.karma += 5; p.r += 3; p.setMem('ft14CivilRightsLegacy', true); },
      },
      {
        text: 'You tell the version that is tellable. Some of it stays with you.',
        tag: null,
        outcome: 'The part that stays with you is real. It does not need to be told to be real.',
        effect: (p) => { p.r += 5; p.setMem('ft14CivilRightsLegacy', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft14_vietnam_vet_wall',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('vietnam_veteran') &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1982 &&
      G.age >= 40 &&
      !G.mem?.ft14VietnamWall,
    text: 'The Vietnam Veterans Memorial, Washington DC. Black granite. Fifty-eight thousand, two hundred and eighty names. You find the ones you are looking for. You can see your reflection in the granite as you touch the letters. The wall does not ask you to be fine. It does not ask you about your feelings about the war. It does not ask you about the withdrawal agreement or the domino theory or the credibility of American commitments in Southeast Asia. It asks you to find the name.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.m += 8
      p.r += 5
      p.karma += 4
      p.setMem('ft14VietnamWall', true)
    },
  },

  {
    id: 'ft14_vietnam_refused_pardon',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('vietnam_refused') &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1977 &&
      G.age >= 25 &&
      !G.mem?.ft14VietnamPardon,
    text: (G) => {
      const year = G.currentYear
      if (year <= 1980) {
        return 'January 21, 1977. Carter\'s first day in office. Pardon for all who evaded the draft. The pardon is administrative: it restores civil rights and cancels prosecution. It is not an apology. The country did not apologize for asking. You did not ask for an apology. You made a decision that cost you certain things. The pardon addresses the legal consequences. The weight of the decision is not a legal consequence.'
      }
      return 'The Vietnam era. You refused. The pardon came in 1977 and was administrative — civil rights restored, prosecution cancelled. The country has moved on from the debate about whether you were right. The debate, which once defined you in certain rooms, is now historical. History is lighter than the original thing.'
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 4
      p.karma += 3
      p.setMem('ft14VietnamPardon', true)
    },
  },

  {
    id: 'ft14_rustbelt_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('rustbelt_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14RustbeltLate,
    text: 'They are talking about the Rust Belt again. Every four years, the candidates come to the towns where the plant closed and say they understand. Some of them grew up in towns like this. Some of them have not. What they say is similar regardless. You know what the town looked like in 1972 and you know what it looks like now and the distance between those two pictures is the political fact that is being discussed, though not always by someone who has stood in the distance.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft14RustbeltLate', true)
    },
  },

  // ── AUSTRALIA FOLLOW-THROUGHS ───────────────────────────────────────────────

  {
    id: 'ft14_dismissal_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('dismissal_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14DismissalLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2027) {
        return 'Kerr\'s papers are released in 2027. You read the coverage. You were alive when it happened. You have been reading coverage of it for fifty years. The papers confirm some things and do not resolve others. The argument about what happened on November 11, 1975 is structurally similar to what it was in 1975. New information has arrived. The argument has incorporated the new information and continues.'
      }
      return 'Kerr died in 1991. Whitlam died in 2014. The papers are sealed until 2027. The people who were in the room are gone or old. The constitutional argument continues between people who were not in the room. You were in the country when it happened. That is a different knowledge from the argument.'
    },
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft14DismissalLate', true)
    },
  },

  {
    id: 'ft14_aus_vietnam_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('aus_vietnam_vet') &&
      G.age >= 55 &&
      !G.mem?.ft14AusVietnamLate,
    text: 'The Welcome Home Parade, 1987. Fourteen years after the last troops came home. Sydney. Eighteen thousand veterans march. Some of them are still angry about the fourteen years. Some of them are grateful. Some of them are both. The speeches are careful. The crowd is large. What the parade cannot give back is the fourteen years in which the country did not ask how you were, in which the war did not officially have a welcome home, in which you arranged your own relationship with what you carried.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 5
      p.setMem('ft14AusVietnamLate', true)
    },
  },

  // ── CANADA FOLLOW-THROUGHS ──────────────────────────────────────────────────

  {
    id: 'ft14_solidarity_generation_after',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('solidarity_generation') &&
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft14SolidarityAfter,
    text: 'Solidarity became a party. The party split and split again. Wałęsa ran for president, won, and later received very low poll numbers. The trade union is still a trade union, smaller than it was. What you participated in — the meeting in the church, the shipyard gates, the extraordinary air of August 1980 — is now history. The history is accurate and is also the skeleton of the experience. The flesh of it: the feeling of the meeting, what was said, the specific faces, the exact quality of the hope. That is not in the history books and it is yours.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.karma += 3
      p.setMem('ft14SolidarityAfter', true)
    },
  },

  {
    id: 'ft14_underground_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('underground_poland') &&
      G.age >= 55 &&
      !G.mem?.ft14UndergroundEcho,
    text: 'The bibuła, the samizdat, the printshop in the church basement. They are in the museum now. The copies you made are in the museum or they are not — many were burned when the risk was too high, and the burning was also the right decision. What you know is that the chain of distribution held, that the information moved, that the people who read it knew they were not alone. The maintenance of that knowledge — that they were not alone — is what the underground was for, and it worked.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 6
      p.r += 4
      p.setMem('ft14UndergroundEcho', true)
    },
  },

  // ── ITALY FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft14_anni_di_piombo_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anni_di_piombo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14AnniDiPiomboLate,
    text: 'The files are still classified. The trials reached verdicts that were appealed and overturned and revised. The people responsible died in prison or were released early or were never definitively identified or are still alive in ordinary apartments. Italy does not have a Day of Memory for the Years of Lead the way Germany has for the war. The dead are in the record. The record is in archives that require specific authorization to read. You were there. You do not need authorization.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft14AnniDiPiomboLate', true)
    },
  },

  {
    id: 'ft14_mani_pulite_after',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('mani_pulite_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 30 &&
      !G.mem?.ft14ManiPuliteAfter,
    text: 'The Clean Hands investigation destroyed the First Republic and produced Berlusconi. The magistrates who conducted it became famous and then some of them were investigated. The tangenti system — the systematic corruption — was dismantled at the level of the parties that organized it. The corruption reorganized at a different level. The Italy that emerged from Mani Pulite is not the Italy that went in, and whether the change was improvement is the argument that is still running.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft14ManiPuliteAfter', true)
    },
  },

  {
    id: 'ft14_precariato_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('precariato_generation') &&
      G.age >= 55 &&
      !G.mem?.ft14PrecariatoLate,
    text: 'The pension calculation arrives. The contributivo system — contributions to a fund that is calculated at retirement age based on what you actually contributed. Your contributions were interrupted by the Partita IVA years, the contract gaps, the periods between projects. The number is smaller than you planned for. It was always going to be smaller than you planned for. You planned for something and the plan met the system and the system was not designed for the plan.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 6
      p.w -= 4
      p.setMem('ft14PrecariatoLate', true)
    },
  },

  {
    id: 'ft14_shock_therapy_vindication',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('shock_therapy_generation') &&
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft14ShockTherapyVindication,
    text: 'Poland did not enter recession in 2009. The only major European economy that didn\'t. The motorways are built. Warsaw looks like a Western European city. The GDP per capita has grown faster than any EU country for twenty years. The price was paid in the early nineties. You were there when the price was paid. The people in the new Warsaw coffee shops were not there. They live in the country that the price bought, and they do not know the price, which is neither their fault nor yours. The price was real. The country is also real.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 4
      p.karma += 3
      p.setMem('ft14ShockTherapyVindication', true)
    },
  },

// ============================================================
// events_followthrough_15.js
// ============================================================

// ── JAPAN FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft15_salaryman_retirement',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('salaryman_life') &&
      G.age >= 60 &&
      !G.mem?.ft15SalarymanRetirement,
    text: 'The retirement ceremony is held in a conference room. Your direct reports have prepared remarks. Someone has bought a clock. The clock has your name engraved on it. You receive it with both hands and bow. The managing director says you have given everything. What you gave was the commute, the late train, the evenings that became the company\'s evenings, the decades of being a man whose address changed when the company needed it to change. The clock is accurate. It will continue to be accurate when you are not in the office.',
    choices: [
      {
        text: 'The company was your life. That is a true statement and you do not know how to feel about it.',
        tag: null,
        outcome: 'You carry the clock home on the train. The train is the same train. You are not going to the same place.',
        effect: (p) => { p.r += 5; p.m += 3; p.setMem('ft15SalarymanRetirement', true); },
      },
      {
        text: 'You always knew it was a bargain. You gave the company the years. The company gave you the decades of certainty.',
        tag: null,
        outcome: 'The bargain was real. The certainty was real. The regret is real and does not contradict the other things.',
        effect: (p) => { p.r += 3; p.m += 5; p.e += 2; p.setMem('ft15SalarymanRetirement', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft15_karoshi_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('karoshi_adjacent') &&
      G.age >= 55 &&
      !G.mem?.ft15KaroshiLate,
    text: 'His name was Nakamura. He died at his desk in November. The official cause was cardiac arrest. The real cause was the 3,000 hours of overtime he had logged that year, which came out in the labor inspection, which found the company in violation, which resulted in a fine that was smaller than his annual salary had been. His wife received a karoshi certification from the Labor Standards Inspection Office. The certification acknowledges what the employer denied for eighteen months. You worked the same hours. You are here. He is not. The difference between the two of you is not virtue.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.karma += 3
      p.setMem('ft15KaroshiLate', true)
    },
  },

  {
    id: 'ft15_lost_decade_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_decade_generation') &&
      G.age >= 60 &&
      !G.mem?.ft15LostDecadeLate,
    text: 'The Nikkei closed above 40,000 this year for the first time since 1989. The financial newspapers are using the word "recovery." You watched the index fall from 38,915 in December 1989 to 8,000 in 2003. You watched the real estate that was valued at four times the entire United States in 1989 become something else. The word "recovery" is accurate for the index. The decade in which you were supposed to be building something — career, savings, security — that decade did not recover. The index is not you.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft15LostDecadeLate', true)
    },
  },

  {
    id: 'ft15_lost_generation_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('lost_generation_japan') &&
      G.age >= 55 &&
      !G.mem?.ft15LostGenerationLate,
    text: (G) => {
      const age = G.age
      if (age >= 65) {
        return 'The ushinawareta sedai — the lost generation. The ones who graduated between 1993 and 2005. Your cohort. The pension calculation is based on contributions. Your contributions were interrupted: the dispatch work, the contract gaps, the years before the labor reforms. The government has been studying the problem of the lost generation\'s retirement since 2010. The studies have continued. You are now the age the studies were written about.'
      }
      return 'The economist calls your cohort the "employment ice age generation." He is twenty years younger than you and has a permanent position. He says the policy failures that produced your situation were correctable. You understand what he means. You also understand that the correction, if it comes, will not come for the people who already spent their forties in dispatch work on one-year contracts.'
    },
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.w -= 3
      p.setMem('ft15LostGenerationLate', true)
    },
  },

  {
    id: 'ft15_tohoku_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('tohoku_survivor') &&
      G.age >= 55 &&
      !G.mem?.ft15TohokuLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2021) {
        return 'The seawall is fifteen meters high. It runs along the coast for 400 kilometers. The government built it to protect the towns from the next wave. The towns the wave took are behind the seawall, rebuilt or not rebuilt or half-rebuilt, depending on the town. From inside the town you cannot see the ocean. The ocean has been put out of sight. This is the protection. You lived here before the seawall. The ocean was part of what it meant to live here. The seawall is also part of what it means to live here now.'
      }
      return 'March 11, each year. The siren test. The four-minute warning that did not reach everyone in time. The evacuation routes that were marked and the people who turned back to get something from the house. You know which turning took you up the hill. You know which part of that knowledge is luck and which part is the drill you had done every year since school.'
    },
    choices: [
      {
        text: 'You go back to the coast once a year, on March 11. It asks something of you each time.',
        tag: null,
        outcome: 'The asking is different every year. Some years it asks about the people. Some years it asks about the water. Some years it just asks you to stand there.',
        effect: (p) => { p.r += 4; p.m -= 3; p.m += 5; p.karma += 4; p.setMem('ft15TohokuLate', true); },
      },
      {
        text: 'You do not go back to the coast. The distance is its own kind of keeping.',
        tag: null,
        outcome: 'What you are keeping is yours. The date still comes each year regardless.',
        effect: (p) => { p.r += 6; p.m += 2; p.setMem('ft15TohokuLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft15_hibakusha_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hibakusha_stigma_lived') &&
      G.age >= 60 &&
      !G.mem?.ft15HibakushaLate,
    text: 'Sunao Tsuboi, who was one of the last known hibakusha, died in 2021. He was ninety-six. He had been giving testimony since 1945 and had not stopped. What he was giving testimony to: the fireball, the temperature, the distance from the hypocenter, the color of the smoke, the specific quality of the silence that followed. The Nihon Hidankyo — the hibakusha organization — was awarded the Nobel Peace Prize in 2024. The award recognises that the testimony existed and was given and is now in the historical record. The generation that experienced the thing is almost entirely gone. What remains is the testimony.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 5
      p.r += 4
      p.setMem('ft15HibakushaLate', true)
    },
  },

  {
    id: 'ft15_minamata_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('minamata_disease') &&
      G.age >= 60 &&
      !G.mem?.ft15MinamataLate,
    text: 'The cats that ran into the sea in the 1950s were the first sign, before the symptoms appeared in the people of Minamata. Chisso factory. Methylmercury. The company denied it for twelve years. The disease was named after the bay in 1956 and the company continued to discharge mercury until 1968. The courts found in favor of the plaintiffs in 1973. Chisso continued to operate. The third-generation effects are being documented now — children of children of people who ate the fish. The mercury entered the food chain and stayed. The third generation did not eat the fish. They carry what the fish carried into the people who were their grandparents.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.h -= 3
      p.setMem('ft15MinamataLate', true)
    },
  },

  {
    id: 'ft15_anpo_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anpo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft15AnpoLate,
    text: 'Kishi Nobusuke resigned after the Security Treaty was ratified in 1960. You were in the crowds outside the Diet building the night it passed. The protest had not stopped the ratification. Kishi resigned anyway — the scale of opposition made his position untenable even after he won. The Security Treaty has been renewed automatically every year since. It is now so ordinary that students who were not born yet do not know there was a protest. The protest is in the history books. What the protest felt like — the specific noise of that night, the sense that something was being decided that you had a right to contest — is not in the history books. It is in you, and you are sixty.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.karma += 3
      p.setMem('ft15AnpoLate', true)
    },
  },

  // ── LATIN AMERICA FOLLOW-THROUGHS ───────────────────────────────────────────

  {
    id: 'ft15_corralito_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('corralito_survivor') &&
      G.age >= 55 &&
      !G.mem?.ft15CorralitoLate,
    text: 'You learned something in December 2001 about where not to keep money. The lesson was expensive. The banks froze in December and by January the peso had been devalued to a third of its dollar value and the dollar deposits had been converted to pesos at the old rate and then revalued at the new rate. You understood, at the end of that arithmetic, that the savings you had built over a decade were worth a third of what they had been on December 1. You have kept money differently since then. The people who were too young to have savings in 2001 do not keep money the same way you do. This is not irrational on either side. The experience was the teacher.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft15CorralitoLate', true)
    },
  },

  {
    id: 'ft15_cacerolazos_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('arg_cacerolazos_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15CacerolazoLate,
    text: 'December 19-20, 2001. The helicopters over the Casa Rosada. De la Rúa leaving by helicopter while the square below was still full. Five presidents in twelve days. What came after was Kirchner and the recovery and the argument about what the recovery cost and whether the method was sustainable. The cacerolazos were not the end of the crisis — they were the moment the crisis became visible in a form the television could show. The crisis had been building for years. You were in the square. You were not the cause of the crisis and you were not the solution. You were the square.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.karma += 3
      p.setMem('ft15CacerolazoLate', true)
    },
  },

  {
    id: 'ft15_plano_real_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('plano_real_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15PlanoRealLate,
    text: 'The first week of stable prices. July 1994. The padeiro stopped changing the bread price between morning and afternoon. The supermarket price tag stayed the same on Tuesday as it had been on Monday. You had been shopping with mental calculations for so long — by how much will this be more expensive at the register than on the shelf — that the first week without that calculation felt wrong. Like waiting for a sound that doesn\'t come. Brazil\'s inflation rate was 2,477% in 1993. It was 22% in 1995 and continued to fall. The decade of hyperinflation taught a set of habits that outlasted the inflation. Some of those habits you still have.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.r += 2
      p.setMem('ft15PlanoRealLate', true)
    },
  },

  {
    id: 'ft15_arg_savings_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('arg_savings_destroyed') &&
      G.age >= 55 &&
      !G.mem?.ft15ArgSavingsLate,
    text: 'You rebuilt. Not to the same amount, not in the same way. The dollar account was a lesson that became a different lesson when the lesson cost everything you had. The generation that grew up after 2001 was told not to save in pesos. You were told the same thing by the generation that lived through the 1989 hyperinflation. Each generation in Argentina learns this from the previous generation\'s loss. The learning transfers. The loss also transfers — to the question of what to build, what to trust, what baseline of institutional reliability is reasonable to expect. The answer your generation arrived at is low.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 4
      p.w -= 2
      p.setMem('ft15ArgSavingsLate', true)
    },
  },

  {
    id: 'ft15_kirchner_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('kirchner_recovery_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15KirchnerLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2019) {
        return 'The Kirchner decade: 2003–2015. 8% annual growth for seven years. Poverty fell from 54% to 27%. The CONADEP trials resumed. Human rights as state policy. The flip side: the INDEC statistics falsification, the inflation that was real but not officially counted, the energy subsidies that became unsustainable, the institutional damage. Argentina defaulted again in 2014 and again in 2020. The recovery was real. The recovery did not solve the structural problem. Nothing in Argentina has yet solved the structural problem.'
      }
      return 'Néstor Kirchner died in 2010. He was sixty years old. The recovery he led — GDP doubled in eight years, poverty cut in half — is the economic fact. The method — the confrontation with the IMF, the debt restructuring, the export taxes — is the argument. You lived through both the economic fact and the argument. The argument is still running.'
    },
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 4
      p.m += 3
      p.setMem('ft15KirchnerLate', true)
    },
  },

  {
    id: 'ft15_brazil_lula_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lava_jato_era') &&
      G.currentYear >= 2023 &&
      G.age >= 50 &&
      !G.mem?.ft15BrazilLulaLate,
    text: 'Operation Car Wash began in 2014. The drains of corruption it opened ran through every major party and most of the major construction companies. Dilma was impeached in 2016. Lula was imprisoned in 2018 and released in 2019 on a Supreme Court ruling and then elected president again in 2022. The corruption that Lava Jato found was real. The procedural problems in the prosecution were also real. Judge Moro, who convicted Lula, became Bolsonaro\'s justice minister. This sequence of events has not resolved into a clean lesson about what Brazilian institutions are and what they can do. The lesson is that the question is still open.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft15BrazilLulaLate', true)
    },
  },

// ============================================================
// events_followthrough_16.js
// ============================================================

{
    id: 'ft16_soviet_afghan_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('soviet_afghan_veteran') &&
      G.age >= 55 &&
      !G.mem?.ft16AfghanLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2021) {
        return 'August 2021. The last American soldier leaves Afghanistan. The Taliban returns to Kabul in three days. You served in the same country forty years ago, when the state that sent you in was also certain of its mission, also expected the year to be short, also found that the mountain did not care about the briefing. The afgantsy — the Soviet veterans\' association — does not issue a public statement. You do not know what you would have said in it.'
      }
      return 'The Memorial Foundation has compiled the names of Soviet soldiers killed in Afghanistan. 15,000 killed. 35,000 wounded. The figures are exact now in a way they were not when the bodies were coming back in sealed coffins. The memorial in Moscow acknowledges what the state did not acknowledge when you were coming home from it. The acknowledgment comes thirty years after the silence. You are in your sixties. The acknowledgment is for the record.'
    },
    choices: [
      {
        text: 'You attend the afgantsy gatherings. These are the people who understand without explanation.',
        tag: null,
        outcome: 'The understanding without explanation is what the association is for. You have been coming for thirty years. The people who are gone from the list now are gaps in a specific kind of conversation.',
        effect: (p) => { p.m += 5; p.r += 4; p.karma += 4; p.setMem('ft16AfghanLate', true); },
      },
      {
        text: 'You do not speak about it. The silence has served.',
        tag: null,
        outcome: 'What you do not speak about is still there. The silence does not change what is there.',
        effect: (p) => { p.r += 6; p.m += 2; p.setMem('ft16AfghanLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_chechnya_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('chechnya_generation') &&
      G.age >= 55 &&
      !G.mem?.ft16ChechnyaLate,
    text: 'Grozny has been rebuilt. The towers are glass and lit at night. Ramzan Kadyrov\'s photograph is in every shop window. Chechnya is officially pacified — it has been officially pacified since 2009. You remember the buildings in 1995: the apartment blocks shelled until they looked like the photographs from Stalingrad. The reporters who photographed them were later shot or poisoned or died of other causes. The war that was not called a war is now a stability that is not called an occupation. You understand the relationship between these two things because you were in the country for the transition between them.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft16ChechnyaLate', true)
    },
  },

  {
    id: 'ft16_ukraine_exile_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('russia_ukraine_exile') &&
      G.age >= 45 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft16UkraineExileLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'the country you are in'
      return `You are in ${country}. You have been here since 2022. The question of when you will go back assumes there is something to go back to that resembles what you left, which is a question with no current answer. You follow Russian news in the way that people follow the news of a place they both are and are not from. Your documents say one thing. Your accent says another. The people around you who know you call you Russian and you do not correct them and you are not sure that they are wrong.`
    },
    choices: [
      {
        text: 'You are building a life here. The country you are from is the country you are from.',
        tag: null,
        outcome: 'The building is real. The country you are from does not stop being what it is because you have left it.',
        effect: (p) => { p.m += 4; p.r += 3; p.setMem('ft16UkraineExileLate', true); },
      },
      {
        text: 'You are waiting. For what, exactly, is something you are still working out.',
        tag: null,
        outcome: 'The waiting is its own country. You live in it between the country you came from and the country you are in.',
        effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft16UkraineExileLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_ukraine_veteran_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('russia_ukraine_veteran') &&
      G.age >= 35 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft16UkraineVetLate,
    text: 'The briefing described a three-day operation. The operation is in its second year. The casualties are not published. The men from your unit who are gone are described in official communications as having died in the performance of their duty defending the motherland, which is true and is also the entire official account. What was found in Ukraine — the specific things, the towns, the people — is not in the official account. You are home now. Home has the same streets. You have a different relationship with the streets because you have come back from something the streets do not know about.',
    choices: [
      {
        text: 'You find a way to speak about it. The speaking matters, even imperfectly.',
        tag: null,
        outcome: 'What is spoken imperfectly is better than what is not spoken. This is not always true. In this case you believe it is.',
        effect: (p) => { p.r += 4; p.m += 3; p.karma += 4; p.setMem('ft16UkraineVetLate', true); },
      },
      {
        text: 'What is inside stays inside. The streets are the streets.',
        tag: null,
        outcome: 'The streets are the streets. What is inside does not resolve because it stays there.',
        effect: (p) => { p.r += 6; p.m -= 3; p.h -= 2; p.setMem('ft16UkraineVetLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_bolotnaya_navalny',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('bolotnaya_generation') &&
      G.currentYear >= 2024 &&
      G.age >= 40 &&
      !G.mem?.ft16BolotnaLate,
    text: 'You were in the square in 2011 or you watched from nearby. The white ribbons. The hundred thousand people who discovered that there were a hundred thousand people like them in the same city. The Bolotnaya prisoners were tried and served their sentences. The foreign agent law passed and the anti-extremism laws expanded and the space for what could be said publicly narrowed through the 2010s until what remained was a specific kind of silence that resembles the silence before. In February 2024, Alexei Navalny died in IK-6 Polar Wolf. He was forty-seven. The calculation he made in 2021 — to return, knowing the cost — was a political act, which is different from a practical one.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 4
      p.karma += 5
      p.e += 3
      p.setMem('ft16BolotnaLate', true)
    },
  },

// ============================================================
// events_followthrough_17.js
// ============================================================

{
    id: 'ft17_soweto_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('soweto_generation') &&
      G.age >= 55 &&
      !G.mem?.ft17SowetoLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2016) {
        return 'June 16 is Youth Day. There is a ceremony and a speech and the schoolchildren who attend do not know anyone who was in the march. The photograph of Hector Pieterson is in the history textbooks. The children who learn from the textbooks are your grandchildren\'s age. The distance between you and the textbook is the distance between being in the thing and inheriting the image of the thing. Both exist. They are not the same.'
      }
      return 'The students who marched on June 16, 1976 are in their fifties and sixties now. You are one of them, or you watched from near enough to be one of them. The demand was specific: no Afrikaans-medium instruction. The demand was met, eventually, after six hundred deaths, in the quiet way that demands are met when a government decides not to make an announcement about meeting them. The world the marchers made possible does not know it owes them anything specifically. That is how inheritance works.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.m += 3
      p.setMem('ft17SowetoLate', true)
    },
  },

  {
    id: 'ft17_euromaidan_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('euromaidan_generation') &&
      G.age >= 40 &&
      G.currentYear >= 2022 &&
      !G.mem?.ft17EuromaidanLate,
    text: 'The Heavenly Hundred Memorial is on Instytutska Street where some of them died. The names are on it. You were in the Maidan in those weeks in 2013 and 2014 when the things that led to everything that came after were being decided in the cold and the smoke. What came after: Crimea in March 2014. Donbas in April. Eight years of a frozen conflict. February 24, 2022. The memorial was shelled in March 2022 and repaired. The chain that began in the tent city on Maidan is still the chain. You are still in it.',
    choices: [
      {
        text: 'What we did on Maidan was necessary. What came after was the price of necessary things.',
        tag: null,
        outcome: 'The price was enormous and you knew something like it was possible. The knowledge does not make the payment smaller.',
        effect: (p) => { p.karma += 5; p.r += 4; p.m += 3; p.setMem('ft17EuromaidanLate', true); },
      },
      {
        text: 'The chain from Maidan to 2022 is not a chain you would have chosen if you could have seen it.',
        tag: null,
        outcome: 'You could not have seen it. The choice you made on Maidan was made with the information of 2013. The information of 2022 was not available.',
        effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft17EuromaidanLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft17_ukraine_refugee_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ukraine_refugee_2022') &&
      G.age >= 30 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft17UkrRefugeeLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'the country you are in'
      return `You have been in ${country} since 2022. The ceasefire, if it comes, will come in conditions you cannot yet see. The reconstruction, if it comes, will take decades. The country you left is still fighting. The question of returning is not abstract: it is the specific address, the specific apartment, the specific city, and what the city looks like now versus what it looked like on February 23, 2022. You follow the news every morning. This is not a temporary arrangement anymore. This is your life.`
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.karma += 4
      p.setMem('ft17UkrRefugeeLate', true)
    },
  },

// ============================================================
// events_followthrough_18.js
// ============================================================

// ── ROMANIA FOLLOW-THROUGHS ──────────────────────────────────────────────────

  {
    id: 'ft18_securitate_files',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('securitate_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 40 &&
      !G.mem?.ft18SecuritateFiles,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2012) {
        return 'The CNSAS — the National Council for the Study of the Securitate Archives — has been operating since 1999. You can request your file. People have requested their files and found the names of people they knew. The neighbour who was an informer. The colleague. Sometimes: the spouse. The files contain reports that are accurate and reports that the informer invented to meet a quota. The distinction is hard to make from the inside of the report. You can request your file. Some people do not request their file.'
      }
      return 'The Securitate files are being opened. The CNSAS exists and is cataloguing them. The people whose names appear as informers are sometimes people you know. Sometimes they were informers under coercion and sometimes they were informers for other reasons. The distinction is relevant and is also difficult to establish from documents. You grew up in the system the documents describe. You know the system in a way the documents do not contain.'
    },
    choices: [
      {
        text: 'You request your file. You need to know what is in it.',
        tag: null,
        outcome: 'You receive the file. What is in it is accurate in some places and inaccurate in others and you cannot always tell which is which. The name of one person you did not expect is in it.',
        effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft18SecuritateFiles', true); },
      },
      {
        text: 'You do not request your file. Some of what is in it you already know.',
        tag: null,
        outcome: 'What you already know is enough. The document would add precision to what you know and precision is not always what you are after.',
        effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft18SecuritateFiles', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft18_decree_779_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('decree_779_generation') &&
      G.age >= 55 &&
      !G.mem?.ft18Decree779Late,
    text: 'Decree 779 ran for twenty-three years — from 1966 to December 1989. Twelve thousand women died from illegal procedures in those twenty-three years. The number is the one that was officially researched; the actual number may be higher. The children born under the decree — the decreţei, as they are called — are now in their forties and fifties. Some of them were placed in the orphanages. Some of them grew up with mothers who had not planned for them. You were one of the women counting weeks. You made the decisions the decree forced you to make. The decree is gone. The decisions are in you.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.karma += 5
      p.m += 3
      p.setMem('ft18Decree779Late', true)
    },
  },

  {
    id: 'ft18_1989_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('romania_1989_generation') &&
      G.age >= 50 &&
      !G.mem?.ft18Rev1989Late,
    text: 'Thirty years later, the question of who the "terrorists" were in December 1989 has not been definitively answered. The court cases are ongoing and have been ongoing for three decades. Iliescu was charged with crimes against humanity in 2015. The trial is still open. The revolution that felt complete on Christmas Day 1989 — when the body was shown on television and the thing that defined your entire life ended in ninety minutes — was followed by a transition that raised the question of how complete the revolution actually was. You were in it. You have been watching the accounting ever since.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft18Rev1989Late', true)
    },
  },

  {
    id: 'ft18_eu_emigrant_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('eu_emigrant_romania') &&
      G.age >= 45 &&
      G.currentYear >= 2015 &&
      !G.mem?.ft18EUEmigLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'Western Europe'
      return `You have been in ${country} since the accession years. Romania is in the news periodically — the anti-corruption protests, the government instability, the Colectiv nightclub fire, the pandemic. You follow it in the way that people follow the news of a country that is still theirs from a distance. The village you came from has fewer people each year. The school may already be closed. You send money. The money changes things at the house but not at the school. You know the calculation you made when you left was the right calculation for you. You also know what the right calculation cost the place you made it from.`
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 2
      p.karma += 4
      p.setMem('ft18EUEmigLate', true)
    },
  },

  // ── VIETNAM FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft18_doi_moi_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('doi_moi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft18DoiMoiLate,
    text: 'The Đổi Mới reforms — 1986, renovation. The moment Vietnam shifted from central planning toward a market economy while the Communist Party stayed in power. GDP growth averaging 7 percent for twenty years after. Poverty falling from 60 percent to 10 percent by 2010. The Ho Chi Minh City skyline, the motorbikes, the foreign investment, the coffee chains. You were in the country for the transition — old enough to remember the ration coupon and young enough to have a bank account after. Vietnam\'s economic miracle is not in the newspapers the way China\'s is. It happened anyway.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.r += 2
      p.setMem('ft18DoiMoiLate', true)
    },
  },

  {
    id: 'ft18_viet_kieu_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('viet_kieu_investor') &&
      G.age >= 50 &&
      !G.mem?.ft18VietKieuLate,
    text: 'Việt Kiều — overseas Vietnamese. You came back to invest, or to visit, or to figure out what coming back meant. The country you came back to has a market economy and a party that does not permit political opposition and a class of young people who were born after the war and have no memory of the south. You are from the south. The café on the corner used to be something else. The people who remember what it was are old. You are becoming one of the people who remember.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m += 3
      p.e += 2
      p.setMem('ft18VietKieuLate', true)
    },
  },

  // ── KOREA FOLLOW-THROUGHS ─────────────────────────────────────────────────────

  {
    id: 'ft18_gwangju_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('gwangju_witness') &&
      G.age >= 55 &&
      !G.mem?.ft18GwangjuLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2017) {
        return 'Chun Doo-hwan, who ordered the paratroopers into Gwangju in May 1980, died in 2021 at eighty-nine years old without having completed his apology. He was sentenced to death in 1996 for the coup and the Gwangju massacre, pardoned in 1997. In his final years, his lawyers challenged the characterisation of the events in Gwangju. The characterisation is "massacre." He disputed this. The 606 confirmed dead — the bodies that were found, the number that was eventually acknowledged — do not dispute it.'
      }
      return 'The May 18th Democratic Uprising Memorial in Gwangju holds the bodies and the names and the testimonies. The paratroopers who were in the city in May 1980 were following orders whose origin is now documented. The documentation has been available since the trials. Chun Doo-hwan was convicted. He was pardoned. You were in Gwangju. You have been watching the accounting.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.setMem('ft18GwangjuLate', true)
    },
  },

  {
    id: 'ft18_chaebol_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('chaebol_worker') &&
      G.age >= 55 &&
      !G.mem?.ft18ChaeholLate,
    text: 'The chaebol company. Samsung, Hyundai, LG, Lotte. You gave it decades. The performance review, the evening dinners that were not optional, the specific culture of a large Korean corporation where the hierarchy is visible in every room. In exchange: the salary, the healthcare, the pension, the prestige of the employer on your resume. Park Geun-hye was impeached in 2017 and the Samsung heir went to prison for bribing her administration. The corruption that ran the miracle is not separate from the miracle. You built something inside that structure. The structure and what you built inside it are both real.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.m += 2
      p.setMem('ft18ChaeholLate', true)
    },
  },

// ============================================================
// events_followthrough_19.js
// ============================================================

{
    id: 'ft19_hungarian_1956_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hungarian_1956_generation') &&
      G.age >= 55 &&
      !G.mem?.ft191956Late,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2006) {
        return 'October 23, 2006: the fiftieth anniversary. Riots in Budapest — the first serious street violence since 1989 — between supporters and opponents of the socialist government that just admitted to lying about the economy for years. The anniversary of the uprising becomes the occasion for something different and uglier than commemoration. You watch this and you think about what the uprising was, and what is being done with its anniversary, and whether these two things share anything more than a name.'
      }
      return 'The uprising is a living memory for you and a historical event for people born after 1960. The difference between those two relationships to the same sequence of days is one of the distances of your life. What you remember is not quite what they learn in school, though the school version is not exactly wrong. The wrong is one of texture. The texture is yours and cannot be transferred.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft191956Late', true); },
  },

  {
    id: 'ft19_kadar_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('kadar_compromise_generation') &&
      G.age >= 55 &&
      !G.mem?.ft19KadarLate,
    text: 'The question the Kádár years raised and did not answer: what did the compromise cost? Not in political terms — the cost there is documented. In another register. The specific kind of person produced by a society that says: do not aspire beyond what the deal allows, do not ask about the tanks, do not organize. The person who is competent and careful and does not talk about certain things. You are looking at that person in the mirror, and it is the first time you are looking with something like clarity.',
    choices: [
      {
        text: 'The deal was what was available. You took what was available. That is the accurate accounting.',
        tag: null,
        outcome: 'Accurate. And also not all of what the accounting contains.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('ft19KadarLate', true); },
      },
      {
        text: 'You made the compromise and you knew you were making it. The knowing is the part you keep.',
        tag: null,
        outcome: 'The knowing did not change what you did. But it is a different thing than not knowing.',
        effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft19KadarLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft19_hungarian_diaspora_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hungarian_diaspora_1956') &&
      G.age >= 55 &&
      !G.mem?.ft19HunDiaspora,
    text: 'After 1989, the border is open and you can go back. Going back is a different thing than it once was. The Hungary that exists now is not the Hungary you left. The people you knew have aged along a different timeline. What you remember as familiar is either gone or changed in ways that feel like a critique of your memory. The diaspora community in your adopted country is still the community of 1956 — most of you are old enough now that the community is shrinking.',
    choices: [
      {
        text: 'You go back. You want to see what the place became.',
        tag: null,
        outcome: 'You see it. The seeing confirms something and contradicts something else. Both are worth having.',
        effect: (p) => { p.m += 5; p.r += 5; p.setMem('ft19HunDiaspora', true); },
      },
      {
        text: 'You do not go back. What you remember is what you want to keep.',
        tag: null,
        outcome: 'What you remember does not change against a comparison you did not make. That is a choice with a cost and a benefit.',
        effect: (p) => { p.r += 6; p.m -= 3; p.setMem('ft19HunDiaspora', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft19_normalization_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('normalization_generation') &&
      G.age >= 55 &&
      !G.mem?.ft19NormLate,
    text: 'After 1989, the question of who did what during normalization took years to settle and never settled completely. The lustration process named names. Some people disputed what was said about them. Some disputes were well-founded. The specific texture of normalization was that coercion existed on a spectrum, and the documents do not always show the spectrum. What you know about what you did — or what people you knew did — lives in a different register than what the files contain.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft19NormLate', true); },
  },

  {
    id: 'ft19_charter_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('charter_77_generation') &&
      G.flags.includes('political_dissident') &&
      G.age >= 55 &&
      !G.mem?.ft19CharterLate,
    text: 'After 1989, the Charter 77 signatories who survived were recognized — invited to serve, written about, offered positions in the new state. Havel himself was one of them. But the recognition was not uniform and was not always what had been imagined. The moral prestige of resistance did not automatically translate into political effectiveness, and Czech politics after 1989 did not always move in the direction the resistance had implied it would. What you paid for a thing and what the thing turned out to be are two different sums.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 4; p.karma += 4; p.setMem('ft19CharterLate', true); },
  },

  {
    id: 'ft19_velvet_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('velvet_revolution_generation') &&
      G.age >= 50 &&
      !G.mem?.ft19VelvetLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2019) {
        return 'Thirty years after November 1989, Czech politics has produced Andrej Babiš — a billionaire prime minister who is also an accused secret-police collaborator, charged with EU subsidy fraud, who controls several major newspapers. Havel died in 2011. The specific mood of the Havel years — the philosopher at the castle, the playwright as president — lasted for a particular window. What came after is what came after. You watched all of it.'
      }
      return 'The Velvet Revolution was supposed to install something. What it installed, in the first decade: rapid privatization, the oligarchisation of the privatized assets, restitution claims. And also: the opening, the EU, genuine prosperity. The question is what the revolution was for exactly, and whether it delivered that. The answer is not simple — which is itself a kind of answer.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 2; p.e += 3; p.setMem('ft19VelvetLate', true); },
  },

// ============================================================
// events_followthrough_20.js
// ============================================================

{
    id: 'ft20_deportation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('deportation_family_memory') &&
      G.age >= 55 &&
      !G.mem?.ft20DeportLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2004) {
        return 'Since independence, the deportations have been officially memorialized. June 14 is Mourning and Hope Day in Latvia and Lithuania; June 14 is the Day of Mourning in Estonia. The memorials list names. Some of the names in the list are names from your family. The listing of the name is official acknowledgment. Official acknowledgment does not restore the person. It is still something — the naming is still something — and you feel both what it is and what it is not.'
      }
      return 'The family members who were deported in 1941 or 1949 — the ones who came back changed and the ones who did not come back — have been with you your whole life as an absence with a known shape. You are old enough now to understand the historical dimension: the Soviet system that produced the deportations, the policy decisions behind them, the numbers. The numbers and the specific names in your family are two different kinds of knowledge that you carry together.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.karma += 3; p.setMem('ft20DeportLate', true); },
  },

  {
    id: 'ft20_january_1991_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('baltic_january_1991') &&
      G.age >= 50 &&
      !G.mem?.ft20Jan1991Late,
    text: (G) => {
      const year = G.currentYear
      const country = G.character?.country?.name || ''
      if (year >= 2021 && country === 'Lithuania') {
        return 'Thirty years since January 13, 1991. The cases against Soviet commanders for war crimes and crimes against humanity proceeded through the Lithuanian courts for decades. Russia did not extradite anyone. The convictions stand in Lithuanian law; their enforcement is another matter. The thirteen killed at the TV Tower are named in the memorial. You were there, or near enough that the distance does not matter anymore. The specific night — the cold, the noise, the crowds — is the founding memory of everything that came after.'
      }
      return 'Independence has been real for most of your adult life now. The country is in the EU and NATO, which are the structures that would have seemed unimaginable in January 1991. The January events — when it was unclear whether the independence declarations would survive — belong to the founding story. You were part of the founding story. The founding story is now taught to people who weren\'t born yet.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.karma += 4; p.setMem('ft20Jan1991Late', true); },
  },

  {
    id: 'ft20_russian_minority_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('russian_minority_baltic') &&
      G.age >= 55 &&
      !G.mem?.ft20RusMinLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2022) {
        return 'February 2022: Russia invades Ukraine. In the Baltic states, the Russian-speaking community is asked, implicitly and sometimes explicitly, to declare a position. The position of the Estonian and Latvian governments is that Russian speakers who are citizens or permanent residents are welcome but that the Russian state is not. The position is not the same as the community receiving it. You have been living this division — between your language community and your residential community — your entire adult life. 2022 sharpened it into something that required a daily answer.'
      }
      return 'The citizenship question resolved itself, for you, decades ago. What did not resolve is the specific position of Russian speakers in countries where the history of the Russian presence is inseparable from the history of Soviet occupation. You have lived your adult life in the gap between those two histories. The gap has been narrowing or widening depending on the decade. You have watched both movements.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft20RusMinLate', true); },
  },

  {
    id: 'ft20_eu_emigrant_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('eu_emigrant_baltic') &&
      G.age >= 50 &&
      !G.mem?.ft20EUBaltLate,
    text: (G) => {
      const country = G.character?.country?.name || 'your country'
      return `${country} is a different place from the country you left. The salaries have risen; the gap between Western Europe and home is narrower than it was in 2004. Some people are coming back. The question of whether you are a person who is coming back is one you are now actually asking, instead of holding in reserve as something you would decide later. The village you are from has fewer people than it had when you left. That is also part of the calculation.`
    },
    choices: [
      {
        text: 'You go back. The country is different enough to try again.',
        tag: null,
        outcome: 'The return is real. The country is different. You are also different. The combination produces something neither of you planned for.',
        effect: (p) => { p.m += 6; p.r += 4; p.setMem('ft20EUBaltLate', true); },
      },
      {
        text: 'You stay where you are. The roots took hold while you were not paying attention.',
        tag: null,
        outcome: 'The life here is the life. The country you came from is something you carry inside the life here. Both are real.',
        effect: (p) => { p.m += 4; p.r += 5; p.setMem('ft20EUBaltLate', true); },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_21.js
// ============================================================

{
    id: 'ft21_april9_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('april_9_generation') &&
      G.age >= 55 &&
      !G.mem?.ft21April9Late,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2024) {
        return 'The April 9 Memorial has been on Rustaveli Avenue since the 1990s. The 2024 protesters returning to Rustaveli night after night carrying EU flags passed it. You have been coming back to this avenue since 1989. The avenue has now accumulated several different kinds of history that all belong to the same pavement. You know what each one looked like from inside it.'
      }
      return 'The April 9 Memorial. The names. The Soviet force that ended with independence and the independence that ended with a different kind of difficulty. What the massacre established — that Georgia was not simply a Soviet republic, that Georgians would not accept that framing — was not negotiable. What came after was negotiable. You have been in the negotiations for your entire adult life.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 4; p.m -= 2; p.setMem('ft21April9Late', true); },
  },

  {
    id: 'ft21_war_2008_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('georgian_war_2008') &&
      G.age >= 55 &&
      !G.mem?.ft21War2008Late,
    text: 'The Tagliavini Report — the EU fact-finding mission — concluded that Georgia started the military confrontation and that Russia\'s response was disproportionate and illegal under international law. Both sentences are in the same report and refer to the same five days. What five days in August 2008 produced is the status quo: South Ossetia and Abkhazia outside Georgian control, the Russian military presence, and the Georgian insistence that this is temporary, which is an insistence that has now run for fifteen years.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft21War2008Late', true); },
  },

  {
    id: 'ft21_abkhazia_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('abkhazia_displaced_connection') &&
      G.age >= 55 &&
      !G.mem?.ft21AbkLate,
    text: 'The IDP families from Abkhazia: thirty years in some cases without return. The hotels that became permanent residences. The children who grew up displaced and the grandchildren who know Abkhazia only from stories. Georgia maintains that return will happen when Abkhazia returns to Georgian sovereignty. Abkhazia, with Russian support, maintains it will not. The specific apartment in Sukhumi — the specific eucalyptus trees in the yard — still exist. They are not yours to return to. They may not be yours to return to within your lifetime.',
    choices: [
      {
        text: 'You have made peace with the probability that the return will not happen in your life.',
        tag: null,
        outcome: 'The making of peace is not the same as the peace. But you have made what can be made.',
        effect: (p) => { p.r += 4; p.m += 3; p.setMem('ft21AbkLate', true); },
      },
      {
        text: 'You cannot make peace with it. The insistence on return is the thing you still have.',
        tag: null,
        outcome: 'The insistence is legitimate. The legitimacy does not change the geography. You hold both.',
        effect: (p) => { p.r += 7; p.m -= 3; p.setMem('ft21AbkLate', true); },
      },
    ],
    effect: null,
  },

// ============================================================
// events_followthrough_22.js
// ============================================================

{
    id: 'ft22_arm_karabakh_veteran_late',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arm_karabakh_veteran_1') && G.flags.has('arm_war_2020_loss') && G.age >= 45 && !G.mem.ft22_vet_late_done,
    text: 'You fought in those mountains in 1991. You know the road to Shushi. You know the village names. In November 2020 you watch the map on a phone screen and see them all go back, one name at a time, until the ceasefire map looks like 1988 again. A veteran from your unit calls and says nothing for a long time. Then: did we do it wrong, or did it not matter what we did. You do not answer because you do not know.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setMem('ft22_vet_late_done', true); },
  },

  {
    id: 'ft22_arm_dark_winter_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('arm_dark_winter_survivor') && G.age >= 55 && !G.mem.ft22_dark_echo_done,
    text: (G) => {
      const yr = G.currentYear
      return `The power cuts for ${yr >= 2025 ? 'three hours' : 'a day'} — a grid fault, nothing serious. Something happens in your chest that has no name. You find yourself filling every container with water. You find yourself checking the candles. Your partner asks what you are doing. You do not know how to explain the 1990s to someone who was not here for them.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 4; p.setMem('ft22_dark_echo_done', true); },
  },

  {
    id: 'ft22_arm_velvet_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arm_velvet_revolution') && G.flags.has('arm_war_2020_loss') && G.age >= 35 && !G.mem.ft22_velvet_reck_done,
    text: 'In 2018 you believed something was changing. You believed a man who walked from Gyumri to Yerevan could change the direction of the country. In November 2020 Pashinyan signed the ceasefire at 3am and you heard it on your phone at 7am and you sat in the kitchen and did not move for a long time. You are not certain what you feel about hope now. You are not certain what use it is.',
    choices: [
      {
        text: 'You hold onto the belief that the revolution still meant something.',
        tag: 'held',
        outcome: 'The war happened because of thirty years of corruption and mismanagement before 2018, not because of 2018. You believe that. Mostly.',
        effect: (p) => { p.m -= 5; p.karma += 3; p.setMem('ft22_velvet_reck_done', true); },
      },
      {
        text: 'You do not know what to believe anymore.',
        tag: 'uncertain',
        outcome: 'You stopped watching the political programs. You are not apathetic — you are something that doesn\'t have a name in Armenian yet.',
        effect: (p) => { p.m -= 10; p.r += 5; p.setMem('ft22_velvet_reck_done', true); },
      },
    ],
  },

  {
    id: 'ft22_azr_idp_return',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('azr_karabakh_idp') && G.flags.has('azr_karabakh_return_2023') && G.age >= 50 && !G.mem.ft22_idp_return_done,
    text: 'You went back. The mulberry tree was there. The house was not what you remembered — the walls had been repainted, then abandoned, then used as something else, then abandoned again. Your children came with you the second time. Your son stood in the yard and said: so this is it. You did not know how to explain thirty years of holding a deed, a photograph, a map in your head. You said: yes. This is it. You planted something in the yard, though you are not sure yet if you will stay.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 6; p.setMem('ft22_idp_return_done', true); },
  },

  {
    id: 'ft22_azr_baku_pogrom_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('azr_baku_pogrom_witness') && G.age >= 55 && !G.mem.ft22_pogrom_late_done,
    text: 'The door on the fourth floor. You walked past it for months before a new family moved in. You never told your children what happened there in January 1990. Not what the neighbors did. Not what you did — which was nothing, which was looking at the floor when they listed the names in the stairwell. You have carried this particular weight long enough that you have stopped noticing it. But it is there.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 7; p.karma -= 3; p.setMem('ft22_pogrom_late_done', true); },
  },

  {
    id: 'ft22_arm_genocide_bearer_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('arm_genocide_memory_bearer') && G.age >= 60 && !G.mem.ft22_genocide_late_done,
    text: 'Your grandmother is gone. Your mother is gone. The family chain by which you knew what happened in 1915 has broken at you. You are now the one who remembers it from the one who survived it. April 24 comes every year. You go to the memorial. The young people there have never met anyone who was alive in 1915. Neither have you, but you met someone who did. You try to explain the difference. You are not sure they can feel it yet.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.e += 2; p.setMem('ft22_genocide_late_done', true); },
  },

// ============================================================
// events_followthrough_23.js
// ============================================================

// ── AUTHORITARIAN VETERAN ─────────────────────────────────────────────────────
  // Carried habits from service under a regime.

  {
    id: 'ft23_authoritarian_veteran_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('authoritarian_veteran') &&
      !G.mem?.ft23AuthVetMidlife,
    text: 'You catch yourself in the old posture — the deference to the person at the front of the room, the automatic calibration for who has authority and what they want to hear. It was useful when it kept you safe. You are not in that context anymore. The habit did not get the memo.',
    choices: [
      {
        text: 'You have been working on it — the habit is loosening',
        tag: null,
        outcome: 'Not gone. Less automatic. That is progress.',
        effect: (p) => { p.m += 5; p.e += 3; p.setMem('ft23AuthVetMidlife', true) },
      },
      {
        text: 'Some habits become character — you are not sure you want to change it',
        tag: null,
        outcome: 'It served you. It costs something in this different life. You have not decided what to do about that.',
        effect: (p) => { p.r += 3; p.m -= 2; p.setMem('ft23AuthVetMidlife', true) },
      },
    ],
  },

  {
    id: 'ft23_authoritarian_veteran_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('authoritarian_veteran') &&
      G.age >= 62 &&
      !G.mem?.ft23AuthVetLate,
    text: 'When you think about the years under that system, you count the things you did not say and the things you did. You chose compliance more than once. You chose it for reasons that still seem like reasons. The world you live in now does not require those choices. You are still sorting out which habits were responses to that world and which became you.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 4; p.setMem('ft23AuthVetLate', true) },
  },

  // ── PAID BRIBE ───────────────────────────────────────────────────────────────
  // The first bribe, and what it became.

  {
    id: 'ft23_paid_bribe_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('paid_bribe') &&
      !G.mem?.ft23BribeEcho,
    text: 'The first time you paid it was a specific amount to a specific person in a specific situation. Since then the transactions have not been dramatic — a small amount at a checkpoint, an expedited document, a look that everyone in the room understands. You have become fluent in a system you did not build and cannot avoid. You think about the people who built it sometimes.',
    choices: [
      {
        text: 'You have made a point of refusing since — you are not going to be that person',
        tag: null,
        outcome: 'Some things move slower. The refusal has cost you time and occasionally more than time. You have decided this is the correct cost.',
        effect: (p) => { p.karma += 8; p.m -= 3; p.setMem('ft23BribeEcho', true) },
      },
      {
        text: 'The system works this way — you work within it',
        tag: null,
        outcome: 'Not proud of it. Not exactly ashamed. Fluent.',
        effect: (p) => { p.r += 5; p.karma -= 3; p.setMem('ft23BribeEcho', true) },
      },
    ],
  },

  // ── DEMOCRACY MOVEMENT ───────────────────────────────────────────────────────
  // What happened to the people who joined the movement.

  {
    id: 'ft23_democracy_movement_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('democracy_movement') &&
      !G.mem?.ft23DemocDecade,
    text: 'A decade on from the movement, you look at what it produced. Some things changed. Some things that were supposed to change did not. People who were in the streets with you have taken different paths: a few became politicians, a few became cynics, a few kept going in the same direction. The cause is still there. What you believe about its chances has adjusted.',
    choices: [
      {
        text: 'Still committed — the change is slow, not absent',
        tag: null,
        outcome: 'You are still in it. The energy is different — more patient, more strategic. Less like a wave and more like a long push.',
        effect: (p) => { p.m += 6; p.karma += 5; p.setMem('ft23DemocDecade', true) },
      },
      {
        text: 'You have stepped back — the personal cost became too high',
        tag: null,
        outcome: 'You have not abandoned the beliefs. You have abandoned the exposure. You are not sure those are different things.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft23DemocDecade', true) },
      },
    ],
  },

  {
    id: 'ft23_democracy_movement_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('democracy_movement') &&
      G.age >= 60 &&
      !G.mem?.ft23DemocLate,
    text: 'There are younger people asking you what it was like. You are now one of the people who were there when it mattered. The account you give is honest but selected — you leave out the fear, partly because it is hard to describe, and partly because you do not want to discourage them. The younger people are more optimistic than you were at their age. You are not sure if that is naivety or if something has genuinely changed.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 4; p.e += 3; p.legacy += 5; p.setMem('ft23DemocLate', true) },
  },

  // ── CONSIDERING EMIGRATION ───────────────────────────────────────────────────
  // The consideration that didn't resolve into a decision.

  {
    id: 'ft23_considering_emigration_returns',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('considering_emigration') &&
      !G.flags.has('expat') &&
      !G.mem?.ft23ConsidEmig,
    text: 'You thought about leaving. You had reasons. The reasons are still there, more or less. The life has continued here, which means the decision — to go or stay — became a kind of default rather than a choice. You are still not sure that is the same as having decided.',
    choices: [
      {
        text: 'You have made peace with staying — this is your life',
        tag: null,
        outcome: 'You stopped looking at that particular horizon. The life here is real and yours.',
        effect: (p) => { p.m += 6; p.r -= 3; p.setMem('ft23ConsidEmig', true) },
      },
      {
        text: 'You still think about it — the possibility is not closed',
        tag: null,
        outcome: 'You carry it as a live question. This is tiring. It also keeps something open.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('ft23ConsidEmig', true) },
      },
    ],
  },

  // ── RADIO CHILDHOOD ──────────────────────────────────────────────────────────
  // The specific nostalgia of a pre-television information world.

  {
    id: 'ft23_radio_childhood_memory',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('radio_childhood') &&
      G.age >= 55 &&
      !G.mem?.ft23RadioMemory,
    text: 'You learned to read the world through a speaker — the specific sound of a particular broadcaster\'s voice, the way the whole family oriented toward the set at the same hour. The news arrived as sound, which meant it arrived as presence. You could not watch it happen. You could only hear it described, which gave it a particular quality — closer to story, further from spectacle. You are not sure that was worse.',
    choices: null,
    effect: (p) => { p.m += 7; p.e += 3; p.setMem('ft23RadioMemory', true) },
  },

  // ── SIBLING RECONCILED ───────────────────────────────────────────────────────
  // Years after the reconciliation — what it became.

  {
    id: 'ft23_sibling_reconciled_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sibling_reconciled') &&
      !G.mem?.ft23SibReconciled,
    text: 'The reconciliation happened. You said what needed to be said, or most of it. The relationship since has been careful at the edges but present. You see them at the right occasions. There are things you don\'t discuss, which is different from not being able to discuss them — more like choosing the same conversation you always have, which is a kind of love.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft23SibReconciled', true) },
  },

  // ── EARTHQUAKE SURVIVOR ──────────────────────────────────────────────────────
  // Years after — the body memory, the rebuilding.

  {
    id: 'ft23_earthquake_survivor_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('earthquake_survivor') &&
      !G.mem?.ft23EarthquakeEcho,
    text: 'The ground moved once when you did not expect it to. Years later, certain sounds — a truck on a rough road, something heavy dropped in another room — produce a response in your body before your mind catches up. You are not frightened. Your nervous system has its own record of events, and it is not finished with the accounting.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('ft23EarthquakeEcho', true) },
  },

  {
    id: 'ft23_earthquake_survivor_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('earthquake_survivor') &&
      G.age >= 58 &&
      !G.mem?.ft23EarthquakeLate,
    text: 'You think sometimes about what was standing before and what is standing now. Some of it was rebuilt. Some of it was replaced with something different. Some of it is still rubble or the space where rubble was cleared. A city after an earthquake has two layers — the one that exists and the one it replaced — and you can read both of them at once, which people who arrived after cannot do.',
    choices: null,
    effect: (p) => { p.m += 6; p.e += 4; p.setMem('ft23EarthquakeLate', true) },
  },

// ============================================================
// events_followthrough_24.js
// ============================================================

// ── ATHLETE BECAME COACH ──────────────────────────────────────────────────────
  // The identity shift from performing to teaching.

  {
    id: 'ft24_athlete_coach_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('athlete_became_coach') &&
      !G.mem?.ft24AthCoach,
    text: 'You have been on this side of it long enough now to know that coaching is a different thing entirely. Not a lesser version of competing — a different occupation. What you are transmitting is not the same as what you performed. The transmission requires you to find language for things you always did without language, and to watch someone else\'s body learn what your body already knows.',
    choices: [
      {
        text: 'You have found it — this is the right work for this stage',
        tag: null,
        outcome: 'The career has a second shape. You are surprised to find it is as absorbing as the first.',
        effect: (p) => { p.m += 8; p.karma += 5; p.legacy += 4; p.setMem('ft24AthCoach', true) },
      },
      {
        text: 'You miss competing — the coaching is real but the loss is also real',
        tag: null,
        outcome: 'Both things are true. The grief for the performance career is its own kind of grief — specific and not always socially legible.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('ft24AthCoach', true) },
      },
    ],
  },

  // ── FAILURE INTEGRATED ───────────────────────────────────────────────────────
  // The specific consciousness of someone who has actually processed a major failure.

  {
    id: 'ft24_failure_integrated_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('failure_integrated') &&
      !G.mem?.ft24FailureInt,
    text: 'The failure is something you can think about now without the particular nausea. Not because it became less of a failure — it did not — but because you have done what it turns out you needed to do with it. You have looked at it straight. You know what the failure cost and what it meant and roughly what you should have done differently. That is not nothing. Most people do not actually do this.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.karma += 3; p.setMem('ft24FailureInt', true) },
  },

  // ── MANAGES CHRONIC CONDITION ─────────────────────────────────────────────────
  // The daily rhythms of a managed condition.

  {
    id: 'ft24_manages_chronic_texture',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('manages_chronic_condition') &&
      !G.mem?.ft24ManagesChronic,
    text: 'The condition is managed, which means it is present in a particular way — not as crisis, but as infrastructure. The medication taken at the same time every day. The things avoided. The check-ups that are now permanent items on the calendar. You have negotiated a version of your life that accommodates this, and the negotiation has become routine, which is a different thing from the condition being gone.',
    choices: [
      {
        text: 'You have made a reasonable peace with the management',
        tag: null,
        outcome: 'The condition is part of the life. Not all of it. The management is a habit, like any other.',
        effect: (p) => { p.m += 6; p.e += 3; p.setMem('ft24ManagesChronic', true) },
      },
      {
        text: 'Some days the management is tiring in a way that is hard to explain',
        tag: null,
        outcome: 'Not in crisis — that is important. But the ongoing cost is real, and invisible to most people.',
        effect: (p) => { p.m += 2; p.h -= 2; p.setMem('ft24ManagesChronic', true) },
      },
    ],
  },

  // ── PARTY MEMBER ─────────────────────────────────────────────────────────────
  // The late reckoning of pragmatic party membership.

  {
    id: 'ft24_party_member_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('party_member') &&
      G.age >= 55 &&
      !G.mem?.ft24PartyReckoning,
    text: 'You joined for practical reasons. That is the honest account. The ideology was a performance you delivered well enough to be unremarkable. The advancement was real. What you performed to get it, you tell yourself, was not the same as what you believed — but the distinction requires more maintenance than it used to.',
    choices: [
      {
        text: 'Pragmatism was the right call — you used the system rather than being used by it',
        tag: null,
        outcome: 'The career was built. The family was provided for. You do not fully believe your own argument, but you believe enough of it.',
        effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft24PartyReckoning', true) },
      },
      {
        text: 'The performance cost more than you realised at the time',
        tag: null,
        outcome: 'You know now what you were part of. The knowledge is uncomfortable and accurate.',
        effect: (p) => { p.r += 7; p.karma -= 3; p.m -= 4; p.setMem('ft24PartyReckoning', true) },
      },
    ],
  },

  // ── FOUND COMMUNITY ──────────────────────────────────────────────────────────
  // What the community became over time.

  {
    id: 'ft24_found_community_deepens',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('found_community') &&
      !G.mem?.ft24FoundComm,
    text: 'The community that found you — or that you found — has been part of the life for years now. The people in it have watched you change and you have watched them. There are funerals now, which was not the case when you first arrived. The community holds things about you that other people in your life do not know, and you hold the same for them. That is a specific kind of trust.',
    choices: null,
    effect: (p) => { p.m += 9; p.s += 3; p.karma += 4; p.setMem('ft24FoundComm', true) },
  },

  // ── DUAL IDENTITY ────────────────────────────────────────────────────────────
  // The specific midlife accounting of holding two cultures.

  {
    id: 'ft24_dual_identity_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('dual_identity') &&
      !G.mem?.ft24DualIdent,
    text: 'You have been doing the translation for years — not of language, exactly, though that too, but of context. The version of you that exists in one world is not the same version that exists in the other. The translation between them has cost things: the exhaustion of code-switching, the things that cannot travel between cultures, the private knowledge that some people who know you well know you partially. It has also given things that people with only one world do not have.',
    choices: [
      {
        text: 'The dual positioning is genuinely an advantage now — you can see from two places',
        tag: null,
        outcome: 'It is not a simple gift. It came with costs. You have decided the costs were worth the perspective.',
        effect: (p) => { p.m += 8; p.e += 5; p.setMem('ft24DualIdent', true) },
      },
      {
        text: 'The translation is tiring — you belong completely to neither',
        tag: null,
        outcome: 'You are never fully at home anywhere. This is a real thing that some people understand and many do not.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('ft24DualIdent', true) },
      },
    ],
  },

  // ── CLASS AWARENESS ──────────────────────────────────────────────────────────
  // The experience of understanding how class works from the inside.

  {
    id: 'ft24_class_awareness_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('class_awareness') &&
      !G.mem?.ft24ClassAware,
    text: 'There was a moment — a room you were in, a conversation you heard, something about the ease of someone who grew up without the particular constraints — when the mechanism became visible. Since then you have been able to read the room in a way that is not always comfortable. You understand how the advantage distributes. The people inside the advantage often cannot see it. You have been on both sides of that perception.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 2; p.r += 3; p.setMem('ft24ClassAware', true) },
  },

  // ── VISION IMPAIRED ──────────────────────────────────────────────────────────
  // Late life — adapting to vision loss.

  {
    id: 'ft24_vision_impaired_adapts',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vision_impaired') &&
      G.age >= 65 &&
      !G.mem?.ft24VisionAdapt,
    text: 'The world is still readable, but the reading requires more. Larger print. Better light. The phone held closer. You have adapted in ways you could not have predicted before the adaptation was necessary — the other senses compensate in small ways, and some things you relied on vision for you now do by memory and touch. You are not blind. You are living in a smaller perceptual radius, which is a different experience.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 3; p.h -= 2; p.setMem('ft24VisionAdapt', true) },
  },

// ============================================================
// events_followthrough_25.js
// ============================================================

// ── GAMBLER ──────────────────────────────────────────────────────────────────
  // The midlife accounting of gambling as a habit.

  {
    id: 'ft25_gambler_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('gambler') &&
      !G.mem?.ft25GamblerMid,
    text: 'The gambling started as something occasional and became a habit, or it was always a habit and you are only now honest about that. You know the specific pull of it: the moment before the outcome, which is the only moment in the day when the result is still open. Your regular life has plenty of uncertainty but no single moment where everything resolves cleanly in under two minutes. The table offers that. The cost is the arithmetic of what it has taken from you — money, mostly, but also the hours and occasionally the trust of someone who knew about the hours.',
    choices: [
      {
        text: 'You have stopped — the accounting was finally clear enough.',
        tag: null,
        outcome: 'The stopping was not easy. It is not the same as the pull going away. You still know where the tables are.',
        effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft25GamblerMid', true) },
      },
      {
        text: 'You still gamble — you have it under a kind of control.',
        tag: null,
        outcome: 'The control is real until it is not. You have had both versions.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('ft25GamblerMid', true) },
      },
    ],
  },

  // ── EXPERIENCED DISPLACEMENT ─────────────────────────────────────────────────
  // The specific knowledge of someone who was made to leave.

  {
    id: 'ft25_displacement_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('experienced_displacement') &&
      !G.mem?.ft25DispMid,
    text: 'You have been a person who was made to leave. Not emigration — that word does not fit. Removal. The country or city that was yours ceased to be yours by someone\'s decision. You carry the inventory of that: the weight of objects packed under pressure, the things you could not take, the texture of the last morning before you left. People who have never been removed from a place understand home as a given. You know it as something that was given and then taken, which means you understand something about belonging that they do not.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft25DispMid', true) },
  },

  {
    id: 'ft25_displacement_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('experienced_displacement') &&
      G.age >= 55 &&
      !G.mem?.ft25DispLate,
    text: 'In late life, the displacement is the thing you return to when you think about what shaped the rest. Not in grief — or not only grief — but as the point from which the subsequent chapters have to be measured. The life after the removal is also a full life; you have made it so. You are still the person who was made to leave. You are also the person who arrived somewhere and built the rest of it anyway.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.karma += 3; p.setMem('ft25DispLate', true) },
  },

  // ── RELUCTANT PARENT ─────────────────────────────────────────────────────────
  // The reckoning with having been uncertain about parenthood.

  {
    id: 'ft25_reluctant_parent_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('reluctant_parent') &&
      !G.mem?.ft25ReluctantParent,
    text: 'The child you were uncertain about is older now — past the years when the reluctance was the whole story. You have discovered, in practice, that you became someone you were not fully sure you would become. The parent you are is not the parent you feared you would be. Whether this is growth or simply the fact that children require it from you regardless of your reservations is a question you have thought about and not entirely resolved. The child probably does not know you were uncertain. You have not decided whether to tell them.',
    choices: [
      {
        text: 'You are glad you became the parent. The reluctance was real but so is this.',
        tag: null,
        outcome: 'Both things were real. The one that lasted is the relationship.',
        effect: (p) => { p.m += 9; p.karma += 4; p.setMem('ft25ReluctantParent', true) },
      },
      {
        text: 'The reluctance was a signal you should have listened to. It has cost both of you.',
        tag: null,
        outcome: 'The accounting is honest. It does not mean the relationship is over.',
        effect: (p) => { p.r += 8; p.m -= 3; p.setMem('ft25ReluctantParent', true) },
      },
    ],
  },

  // ── SUDAN 2023 CIVIL WAR ECHO ────────────────────────────────────────────────
  // Follow-through for people who survived the Khartoum fighting.

  {
    id: 'ft25_khartoum_war_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sdn_khartoum_war_generation') &&
      G.age >= 50 &&
      !G.mem?.ft25KhartoumEcho,
    text: 'Khartoum is a different city now. The fighting lasted longer than anyone expected and did not end cleanly — it shifted, paused, resumed elsewhere in the country. The neighbourhood you lived in has been rebuilt, or abandoned, or is still carrying the damage in its walls and streets. You read the new skyline differently from the people who were not there. You know which routes were safe in which months, which buildings were occupied. That specific knowledge fades but does not disappear. It becomes part of how you navigate a city even years after it has changed.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft25KhartoumEcho', true) },
  },

  {
    id: 'ft25_khartoum_displaced_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sdn_khartoum_displaced') &&
      !G.mem?.ft25KhartoumDisp,
    text: 'You left Khartoum with what you could carry. Since then you have been in Egypt, or Saudi Arabia, or another Sudanese city, or somewhere further — the geography of the Sudanese diaspora in 2023 and after stretches across the continent and beyond. The city you left exists in the version you last saw it. Photographs and calls from people who went back give you updates, but the city in your memory and the city that exists are no longer the same city. They share a name. You are not sure when you will go back, or what going back would mean.',
    choices: [
      {
        text: 'You intend to return. Sudan is where you belong.',
        tag: null,
        outcome: 'The intention is real. The return is contingent on things that are not yet resolved.',
        effect: (p) => { p.r += 7; p.m += 3; p.setMem('ft25KhartoumDisp', true) },
      },
      {
        text: 'You have begun to build a life here. Return is no longer certain.',
        tag: null,
        outcome: 'The building is real. The guilt of building is also real.',
        effect: (p) => { p.m += 5; p.r += 5; p.setMem('ft25KhartoumDisp', true) },
      },
    ],
  },

  // ── ZAN, ZENDEGI, AZADI — LATE RECKONING ────────────────────────────────────
  // 5+ years on from the 2022 Iran uprising.

  {
    id: 'ft25_zan_zendegi_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('zan_zendegi_azadi') &&
      G.currentYear >= 2027 &&
      G.age >= 50 &&
      !G.mem?.ft25ZanLate,
    text: 'Five years on, or more, from September 2022 and the streets and the slogan. The Islamic Republic is still there. Mahsa Amini is still dead. The people who were killed in the crackdown are still dead. The generation that stood in the streets is older — some in prison, some in exile, some still in Iran doing the smaller daily acts of refusal that do not make headlines but accumulate. What the uprising meant, whether it was a beginning or a pivot point whose meaning is still unresolved, is a question that the years have not yet answered. You know what it felt like to be in it. That knowledge is separate from the outcome.',
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 5; p.setMem('ft25ZanLate', true) },
  },

  // ── SUDAN REVOLUTION GENERATION — AFTER THE 2023 WAR ────────────────────────
  // For the people who were at the 2019 sit-in: looking back after 2023.

  {
    id: 'ft25_sdn_revolution_after_war',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sudan_revolution_generation') &&
      G.currentYear >= 2024 &&
      G.age >= 45 &&
      !G.mem?.ft25SdnRevWar,
    text: 'You were at the sit-in when Bashir fell. You know what the singing sounded like. You know who was next to you in the crowd and where they are now — some still in Khartoum, some in Egypt, some in the country\'s interior, one or two in the ground. The 2023 war was fought between the same factions that spent the transition pretending to share it. What you stood for in 2019 was not what they were fighting over. That distinction matters to you. You are not sure it matters to history.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 4; p.karma += 4; p.setMem('ft25SdnRevWar', true) },
  },

// ============================================================
// events_followthrough_26.js
// ============================================================

// ── ADULT HEARTBREAK ────────────────────────────────────────────────────────

  {
    id: 'ftw26_adult_heartbreak_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('adult_heartbreak') && G.age >= 30 && G.age <= 45 && !G.mem?.ftw26HeartbreakEcho,
    text: G => G.flags.has('stayed_too_long')
      ? 'You stayed three months longer than you should have. You told yourself you were being careful. You were being afraid. The relationship you\'re in now — or the one you had to build yourself toward — carries the watermark of what you learned: that staying past the moment of knowing is its own form of dishonesty. You have not always succeeded. You have tried.'
      : 'The relationship ended when it needed to. You were twenty-something and you thought you understood love as a thing that, once found, continued. It does not always continue. The version of you that learned this is still present in everything that came after — the way you ask questions earlier, the way you leave more space.',
    effect: (p) => { p.e += 2; p.setMem('ftw26HeartbreakEcho', true); },
  },

  {
    id: 'ftw26_stayed_too_long_pattern',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('stayed_too_long') && G.age >= 35 && !G.mem?.ftw26StayedPattern,
    text: 'You have noticed the pattern. It is not only about relationships. You stay in situations past the point when you know — jobs, conversations, versions of yourself. You call it loyalty. Sometimes it is. Sometimes it is fear of the void that follows. You are learning to tell the difference, which is harder than it sounds when you are inside the situation you are considering leaving.',
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('ftw26StayedPattern', true); },
  },

  // ── MONEY ZERO ──────────────────────────────────────────────────────────────

  {
    id: 'ftw26_money_zero_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('money_zero_survived') && G.age >= 32 && !G.mem?.ftw26MoneyZeroMidlife,
    text: 'You check the account balance more than you need to. You know the exact number before you look. When the number is above a certain threshold you are fine; below it, something tightens. The threshold is irrational — you are not twenty-three and broke anymore — but the body doesn\'t read bank statements, it reads memory. You were genuinely, counting-days broke once. That calibration has not updated.',
    effect: (p) => { p.e += 2; p.setMem('ftw26MoneyZeroMidlife', true); },
  },

  {
    id: 'ftw26_money_zero_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('money_zero_survived') && G.age >= 55 && !G.mem?.ftw26MoneyZeroLate,
    text: 'People your age who never went broke have a different relationship with money. You can identify them: they spend without checking; they don\'t know, at any given moment, how much is in the account. You know. You have always known. The people who survived being genuinely broke young are either very careful or very reckless with money afterward — both are attempts to never feel that way again. You know which one you became.',
    effect: (p) => { p.e += 2; p.setMem('ftw26MoneyZeroLate', true); },
  },

  // ── BLACK TAX ───────────────────────────────────────────────────────────────

  {
    id: 'ftw26_black_tax_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.has('black_tax_contributor') && G.age >= 38 && G.age <= 55 && !G.mem?.ftw26BlackTaxMidlife,
    text: 'The arithmetic of what you have sent home over fifteen years — school fees, hospital bills, the roof that needed replacing, the cousin who needed a deposit for a job in the city, the mother\'s medicine. You have never written it down. If you wrote it down you would see a figure that explains exactly why your savings look the way they do. You have not written it down because the family did not ask you to choose. They asked you to help. You helped. The arithmetic is not a complaint. It is just a fact you carry.',
    choices: [
      {
        text: 'It has cost you, but you would not have done it differently.',
        tag: 'No regret',
        outcome: 'The calculation does not close neatly. You do not need it to.',
        effect: (p) => { p.karma += 4; p.m += 3; p.setMem('ftw26BlackTaxMidlife', true); },
      },
      {
        text: 'You wish someone had told you what it would cost.',
        tag: 'Honest cost',
        outcome: 'The wish is legitimate. The obligation was also real. Both are true.',
        effect: (p) => { p.r += 4; p.m -= 3; p.setMem('ftw26BlackTaxMidlife', true); },
      },
    ],
  },

  {
    id: 'ftw26_black_tax_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('black_tax_contributor') && G.age >= 58 && !G.mem?.ftw26BlackTaxLate,
    text: 'Your niece graduated last year. Your younger brother runs his own business. The roof got replaced properly in 2011 and has not leaked since. The accounting, if you did it, would show that the money you sent back built things that lasted — an education here, a foundation there, a generation that did not start as far back as you did. This is not the story of sacrifice. It is the story of how wealth is actually built in communities that cannot rely on inheritance: one person at a time, in the middle of their working life, sending money home.',
    effect: (p) => { p.m += 6; p.karma += 3; p.setMem('ftw26BlackTaxLate', true); },
  },

  // ── ARRANGED MARRIAGE ───────────────────────────────────────────────────────

  {
    id: 'ftw26_arranged_marriage_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arranged_marriage') && G.partner && G.age >= 35 && !G.mem?.ftw26ArrangedMidlife,
    text: 'You did not choose this person the way you would have chosen from a field of options. The families chose. You agreed — or you were in no position to disagree, which is a different thing. And then time passed. The person who was a stranger at the beginning is now the person whose breathing you know, whose habits you have memorized without trying. The question of whether this is love is almost beside the point now.',
    choices: [
      {
        text: 'It became something you would call love.',
        tag: 'Grown into it',
        outcome: 'Not the love of a film. A different kind: chosen by repetition, confirmed by years.',
        effect: (p) => { p.m += 7; p.addFlag('arranged_marriage_settled'); p.setMem('ftw26ArrangedMidlife', true); },
      },
      {
        text: 'It became a life, which is not the same thing.',
        tag: 'Honest distance',
        outcome: 'A functional life is also real. You have not pretended it was something it wasn\'t.',
        effect: (p) => { p.r += 4; p.setMem('ftw26ArrangedMidlife', true); },
      },
    ],
  },

  // ── PARTITION GENERATION ────────────────────────────────────────────────────

  {
    id: 'ftw26_partition_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('partition_generation') && G.age >= 60 && !G.mem?.ftw26PartitionLate,
    text: 'The country that was taken apart and the country that was made: you have lived on one side of the line long enough that your children do not feel it as a wound. For them it is history. For you it is the specific street in the specific city where your grandparents\' house was, on the other side, and the way your mother said the name of that city in a different register than she used for anything else.',
    effect: (p) => { p.r += 5; p.m -= 4; p.e += 2; p.setMem('ftw26PartitionLate', true); },
  },

  // ── FOSTER CARE ─────────────────────────────────────────────────────────────

  {
    id: 'ftw26_foster_care_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('foster_care') && G.age >= 22 && G.age <= 34 && !G.mem?.ftw26FosterIdentity,
    text: 'The question of where you are from is not a simple one. The place where you grew up is real. The people who raised you are real. The gap between those facts and the word "family" is also real, and it sits differently on different days. Sometimes you are entirely fine. Sometimes you are at a table where everyone is related in a way that is not your way, and you feel it as a specific variety of alone that is hard to explain to someone who has not felt it.',
    choices: [
      {
        text: 'You have built your own version of family by now.',
        tag: 'Built it',
        outcome: 'Chosen family is real family. You know this from having had to choose it.',
        effect: (p) => { p.m += 5; p.s += 3; p.addFlag('chose_family'); p.setMem('ftw26FosterIdentity', true); },
      },
      {
        text: 'The gap is still there, and you carry it.',
        tag: 'Carry it',
        outcome: 'Carrying it is not the same as being stopped by it.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ftw26FosterIdentity', true); },
      },
    ],
  },

  // ── DEPRESSION ERA CHILDHOOD ─────────────────────────────────────────────────

  {
    id: 'ftw26_depression_era_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('depression_era_childhood') && G.age >= 65 && !G.mem?.ftw26DepressionLate,
    text: 'You grew up in a household that remembered the Depression as a recent fact, not a historical one. The cupboard kept full of tins. The shoes mended instead of replaced. The specific saying about money and what you should not count on. You carried these habits into a world of abundance that arrived after the war and never quite made sense to you — abundance always felt provisional, like something that could withdraw.',
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('ftw26DepressionLate', true); },
  },

  // ── NKRUMAH ERA ─────────────────────────────────────────────────────────────

  {
    id: 'ftw26_nkrumah_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('nkrumah_era') && G.currentYear >= 1990 && !G.mem?.ftw26NkrumahLate,
    text: 'You were there when it felt possible. Kwame Nkrumah believed that Africa could take its place — not the Africa of the maps drawn in Europe, but the real thing. The coup came in 1966, while he was on a plane to Hanoi. You learned, over the years after, what happens to the countries that produce men like that: they get the coup, and then the structural adjustment, and then the brain drain, and then the elections that are real but bounded. Ghana has been relatively fine. The project was larger than Ghana.',
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ftw26NkrumahLate', true); },
  },

// ============================================================
// events_followthrough_27.js
// ============================================================

// ── WHITE ZIMBABWEAN: EXILE ───────────────────────────────────────────────────
  // Left after the farm seizures. Built a life somewhere else.
  // The question of what Zimbabwe still is to you.

  {
    id: 'ft27_white_zim_exile_settle',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('white_zimbabwean_exile') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.ft27ZimExileSettle,
    text: 'You are settled now — South Africa, or Australia, or the United Kingdom, depending on where the passport or the connection took you. The farm is other people\'s now. The seizure was legal under the law that was passed to make it legal. You know what the farm smelled like in the rains. You know the names of the workers who stayed and what happened to them is something you try not to think about on the same day you think about the farm. The country is there. You are here. There is a distance between those two facts that is not only geographical.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft27ZimExileSettle', true) },
  },

  {
    id: 'ft27_white_zim_exile_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('white_zimbabwean_exile') &&
      G.age >= 60 &&
      !G.mem?.ft27ZimExileLate,
    text: 'There are years when you do not think about Zimbabwe for weeks at a time. Then there are the rains here, which are not the same as the rains there, and the smell of a certain red earth in a garden centre, and the whole thing is present again. You left because there was no other option. You have built a life. Both are true. The living-with is not resolution — it is a particular kind of continuous management that after forty years you have become expert at without ever becoming easy with.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 2; p.setMem('ft27ZimExileLate', true) },
  },

  // ── WHITE ZIMBABWEAN: STAYED ──────────────────────────────────────────────────
  // Chose to remain. Navigating the new country.

  {
    id: 'ft27_white_zim_stayed_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('white_zimbabwean_stayed') &&
      G.age >= 35 && G.age <= 65 &&
      !G.mem?.ft27ZimStayedMid,
    text: 'You stayed. The farm is gone — sold or seized, depending on the year and the offer — but you are here. The country you are living in is different from the country you grew up in in ways that are structural and ongoing. Your children\'s futures look different from what you imagined when they were born. Some of the people you knew left. Some stayed and then left. You are one of the ones who stayed and stayed. You have reasons for this that you have explained to various people and that are true and that are also not the whole truth.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft27ZimStayedMid', true) },
  },

  // ── SOUTH AFRICA: FREEDOM DAY LATE WITNESS ───────────────────────────────────
  // The long arc of what April 27, 1994 meant.
  // The gap between what it promised and what arrived.

  {
    id: 'ft27_freedom_day_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('freedom_day_witness') &&
      G.currentYear >= 2004 &&
      G.age >= 35 &&
      !G.mem?.ft27FreedomDayDecade,
    text: 'Ten years. Or twenty. The freedom is real — you can go where you could not go before, vote where you could not vote before, live where you could not live before. The inequality is also real, more concentrated than the numbers suggested it would be by this point. You are holding both of these things simultaneously, which is what being South African in this decade means: knowing the distance between what April 1994 was and what 2004 is, and choosing what to do with that distance every day.',
    choices: null,
    effect: (p) => { p.e += 5; p.r += 4; p.m -= 2; p.setMem('ft27FreedomDayDecade', true) },
  },

  {
    id: 'ft27_freedom_day_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('freedom_day_witness') &&
      G.age >= 60 &&
      !G.mem?.ft27FreedomDayLate,
    text: 'You were there. You remember the queue, or the radio in the kitchen, or the streets that night. The country has done things since then that were not in the story you told yourself about what 1994 meant. Some of them were predictable and you did not predict them, or predicted them and hoped you were wrong. You are still here. The being-still-here is not a conclusion — it is a continuing position that you revise every few years as the evidence changes.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 3; p.setMem('ft27FreedomDayLate', true) },
  },

  // ── DOWRY PAID: THE ONGOING WEIGHT ───────────────────────────────────────────
  // The dowry was paid in a moment of family negotiation.
  // What it means as the marriage goes on.

  {
    id: 'ft27_dowry_paid_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('dowry_paid') &&
      G.partner &&
      G.age >= 32 &&
      !G.mem?.ft27DowryEcho,
    text: 'The dowry was paid the year you married. The number — the gold, or the cash, or the combination — is part of the family memory, recalled at certain moments: a financial difficulty that could have been lessened if the reserves had not been paid out, or a moment of family pride when the payment is remembered as evidence of what your family was worth. The transaction that preceded the marriage sits underneath it, not visibly, but there.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft27DowryEcho', true) },
  },

  // ── LOBOLA PAID: THE ONGOING FAMILY RELATIONSHIP ─────────────────────────────
  // Lobola creates an ongoing relationship between families, not just individuals.
  // The cattle (or cash equivalent) are remembered.

  {
    id: 'ft27_lobola_paid_family',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lobola_paid') &&
      G.partner &&
      G.age >= 30 &&
      !G.mem?.ft27LobolaFamily,
    text: 'The lobola negotiations created a relationship between families that is still active. Your wife\'s family — the relationship to them is not only the normal in-law relationship but a specific economic and social relationship that the lobola payment formalised. You know what you paid. They know what they received. The number is not public but it is known. What it means is renegotiated silently at every interaction between the families.',
    choices: null,
    effect: (p) => { p.r += 4; p.s += 2; p.e += 2; p.setMem('ft27LobolaFamily', true) },
  },

  // ── MAHR PAID: LATE RECKONING ────────────────────────────────────────────────
  // The mahr is the woman's right — due at marriage or deferred.
  // Its meaning changes across a marriage.

  {
    id: 'ft27_mahr_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('mahr_paid') &&
      G.age >= 55 &&
      !G.mem?.ft27MahrLate,
    text: 'The mahr was paid at the wedding, or deferred and honoured, or deferred and never quite addressed in the way it should have been. Over the years of the marriage, its meaning shifted — from a financial guarantee of security to a memory of what the contract was about, to something carried by the family as evidence of the respect the arrangement carried. What it meant and what it means are not quite the same thing.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('ft27MahrLate', true) },
  },

  // ── MONEYLENDER DEBT: THE ONGOING ARITHMETIC ─────────────────────────────────
  // The moneylender debt from a farming crisis.
  // The interest that restructures every subsequent decision.

  {
    id: 'ft27_moneylender_ongoing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('moneylender_debt') &&
      G.age >= 22 && G.age <= 50 &&
      !G.mem?.ft27MoneylenderOngoing,
    text: 'The debt to the moneylender from that season — the interest compounds. You know this now in a way you did not know it when you borrowed, which is how the interest is designed to work. Every harvest is first the moneylender\'s. What remains is yours. The what-remains is the margin you are farming on. You have developed a relationship with the arithmetic of it: not acceptance, exactly, but a working knowledge of what is possible within the structure.',
    choices: [
      {
        text: 'You find a way to pay it down — slowly, with everything you can spare.',
        tag: 'pay_down',
        outcome: 'It takes years. The years are years of reduced margin. You pay it off. The season after the final payment, you notice something in how you plan — more freely than before.',
        effect: (p) => { p.mo -= 600; p.m += 6; p.r += 5; p.addFlag('moneylender_debt_cleared'); p.setMem('ft27MoneylenderOngoing', true) },
      },
      {
        text: 'You manage the payments and the debt continues. There is no way to clear it quickly.',
        tag: 'ongoing',
        outcome: 'The debt becomes part of the structure of your life. You farm around it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.e += 3; p.setMem('ft27MoneylenderOngoing', true) },
      },
    ],
    effect: null,
  },

  // ── GOLD INHERITED: THE EMERGENCY RESERVE ────────────────────────────────────
  // The inherited gold is not savings — it is emergency and memory.
  // The decision of when to use it.

  {
    id: 'ft27_gold_inherited_crisis',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('gold_inherited') &&
      !G.flags.has('sold_gold_emergency') &&
      G.age >= 30 && G.age <= 60 &&
      !G.mem?.ft27GoldCrisis,
    text: 'The gold your grandmother left — bangles, or a chain, or a set of earrings that were hers from her wedding — has been in a box since the inheritance. You know what it is worth: you have checked, once or twice, when things were tight. You know the jeweller on the corner who buys gold by weight. The gold represents everything she accumulated and wanted you to have. The question of when a crisis is serious enough to be the crisis the gold is for is a question you revisit when the money gets difficult.',
    choices: [
      {
        text: 'Sell some of it. The crisis is the crisis the gold is for.',
        tag: 'sell',
        outcome: 'The jeweller pays fairly, which is to say below market but above desperation. The box is lighter. The crisis resolves.',
        effect: (p) => { p.mo += 800; p.m -= 6; p.r += 4; p.addFlag('sold_gold_emergency'); p.setMem('ft27GoldCrisis', true) },
      },
      {
        text: 'Not yet. This is not yet that crisis.',
        tag: 'hold',
        outcome: 'You find another way. The gold stays in the box. You check the box more often now, which is either reassurance or something else.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('ft27GoldCrisis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft27_gold_inherited_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gold_inherited') &&
      G.age >= 60 &&
      !G.mem?.ft27GoldLate,
    text: G => G.flags.has('sold_gold_emergency')
      ? 'The gold your grandmother left is gone. You sold it in a crisis year — the right decision, given the crisis. What you have is the knowledge of what it was for: not savings, but a weight of metal that said someone before you had accumulated something and wanted you to have it. That intention survived the sale. The gold didn\'t, but the intention did.'
      : 'The gold your grandmother left is still here. You open the box periodically. The bangles, or the chain, or the earrings — still there, still hers, still not yet the crisis they were kept for. You have decided they will go to your daughter, which is how these things travel: slowly, through the hands of people who almost sold them.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 4; p.e += 2; p.setMem('ft27GoldLate', true) },
  },

// ============================================================
// events_followthrough_28.js
// ============================================================

// ── ADDICTION FAMILY: CARRIED ─────────────────────────────────────────────────
  // You said something to the person who was where you used to be.
  // Years later: what happened, what it costs either way.

  {
    id: 'ft28_addiction_carried_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_carried') &&
      G.age >= 55 &&
      !G.mem?.ft28AddCarriedLate,
    text: (G) => {
      const sobriety = G.flags.has('sobriety')
      if (sobriety) {
        return 'You know what it looked like from the inside. When you said something to the person who was in it, you were saying it from that knowledge — not from disapproval but from specific recognition. Whether it helped depends on factors outside your control. What you know is that you said the thing that was true when you could have stayed quiet. The outcome is its own business.'
      }
      return 'You said something to the person who was in the using — family, or close enough to be family. The conversation was the hardest kind: honest, risky, uncontrollable. Whether it helped is something you measure differently at different distances. The saying was the thing you could do. The rest was theirs.'
    },
    choices: null,
    effect: (p) => { p.karma += 4; p.r += 4; p.m += 3; p.setMem('ft28AddCarriedLate', true) },
  },

  // ── ADDICTION FAMILY: BOUNDARY ────────────────────────────────────────────────
  // You did not carry someone else's recovery. The cost of that choice.

  {
    id: 'ft28_addiction_boundary_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_boundary') &&
      G.age >= 55 &&
      !G.mem?.ft28AddBoundLate,
    text: 'You held the boundary. You knew you could not carry someone else\'s recovery — the specific knowledge of that is one of the things you have learned that cannot be transferred. The boundary was the right call. It was also a cost in the relationship that did not fully resolve in all cases. At this distance you hold both: the correctness of the position and the thing it cost.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m += 2; p.setMem('ft28AddBoundLate', true) },
  },

  // ── ADDICTION FAMILY: SUPPORTED ───────────────────────────────────────────────
  // The Al-Anon reframe distributed into the rest of your life.

  {
    id: 'ft28_addiction_supported_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_supported') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.ft28AddSuppEcho,
    text: 'The support group was not about fixing the person you loved — it was about managing the life that surrounds the not-being-fixed. That reframe did not stay inside the original context. You find it distributing into the rest of your life: the things you can and cannot control, the people you can and cannot manage, the specific quality of attention you now bring to situations where the outcome is not yours to determine.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 5; p.s += 2; p.setMem('ft28AddSuppEcho', true) },
  },

  // ── ADDICTION FAMILY: ISOLATED ────────────────────────────────────────────────
  // Held on alone. The accumulated cost.

  {
    id: 'ft28_addiction_isolated_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_isolated') &&
      G.age >= 55 &&
      !G.mem?.ft28AddIsoLate,
    text: 'You held on alone — not ready to involve strangers in what felt like a private catastrophe. The holding had a cost that accumulated over years in ways you only fully see now. The specific exhaustion of being the only person who knows. The ways it contracted what you could bring to other relationships. There are resources that exist for this situation that you did not use. This is not self-blame. It is accurate accounting.',
    choices: [
      {
        text: 'It was the only way you knew how.',
        tag: 'accept',
        outcome: 'You did what you knew how to do. The cost was what it was.',
        effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.setMem('ft28AddIsoLate', true) },
      },
      {
        text: 'You wish someone had told you that asking for help was possible.',
        tag: 'grieve',
        outcome: 'The younger version of yourself deserved better options. You cannot give them retroactively. You can give them to someone else.',
        effect: (p) => { p.karma += 6; p.r += 5; p.m -= 2; p.setMem('ft28AddIsoLate', true) },
      },
    ],
    effect: null,
  },

  // ── RESISTED ADDICTION ────────────────────────────────────────────────────────
  // You watched someone spiral and chose the other path.
  // The late-life accounting of a road not taken.

  {
    id: 'ft28_resisted_addiction_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('resisted_addiction') &&
      G.age >= 55 &&
      !G.mem?.ft28ResistAddLate,
    text: 'You know what you chose against. The person who took the other path is still a reference point, dimming over decades but not gone — the specific trajectory you watched and declined. The declining was not virtue exactly; it was a particular combination of temperament, timing, and luck that you have never been able to fully separate into its components. At this distance you count it.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.karma += 3; p.setMem('ft28ResistAddLate', true) },
  },

  // ── CYCLE BROKEN ─────────────────────────────────────────────────────────────
  // General flag: stopped a destructive pattern before it passed on.
  // Could be violence, addiction, abandonment, financial recklessness.

  {
    id: 'ft28_cycle_broken_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cycle_broken') &&
      G.age >= 58 &&
      !G.mem?.ft28CycleBrokenLate,
    text: 'What was done to you or around you — you did not pass it on. The choice was not always visible as a choice at the time; it was often a reflex trained by knowing what the alternative looked like. But you know now what stopped here. Your children, or the people after you, are carrying something different from what you were carrying at their age. This is not a small thing.',
    choices: null,
    effect: (p) => { p.karma += 10; p.m += 6; p.r += 3; p.setMem('ft28CycleBrokenLate', true) },
  },

// ============================================================
// events_followthrough_29.js
// ============================================================

// ── CI ELECTION CRISIS: GBAGBO ICC ACQUITTAL ──────────────────────────────────

  {
    id: 'ci_gbagbo_acquittal_2019',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('ci_election_crisis_witness') &&
      G.currentYear >= 2019 &&
      !G.mem?.ciGbagboAcquitted,
    text: 'January 15, 2019. The International Criminal Court acquits Laurent Gbagbo. The charges — crimes against humanity for the 3,000 people killed in 2010 and 2011 — are dismissed for insufficient evidence. He walks out of the courtroom in The Hague a free man. In 2021 he returns to Abidjan in a Boeing chartered by the Ivorian government, to crowds. Alassane Ouattara — the man whose election result Gbagbo refused to accept — has been president for ten years by then. The crisis that cost 3,000 lives has produced an ICC acquittal and two presidents who have met and shaken hands. You do not quite know what to do with this.',
    choices: [
      {
        text: 'The acquittal is what it is. The ICC\'s standard of proof is what it is.',
        tag: 'Legal',
        outcome: 'The court required a standard of evidence it couldn\'t meet. The 3,000 deaths are not in question. What can be proven in The Hague and what happened in Abidjan are different sets.',
        effect: (p) => { p.r += 5; p.e += 2; p.addFlag('ci_gbagbo_reckoning'); p.setMem('ciGbagboAcquitted', true); },
      },
      {
        text: 'Something did not work here. The accounting is incomplete.',
        tag: 'Reckoning',
        outcome: 'You cannot say exactly what should have happened instead. You know what happened and you know what was decided and those two things don\'t resolve into each other.',
        effect: (p) => { p.r += 8; p.m -= 4; p.addFlag('ci_gbagbo_reckoning'); p.setMem('ciGbagboAcquitted', true); },
      },
    ],
  },

  // ── CI LONG WITNESS: THE SECOND MIRACLE ───────────────────────────────────────

  {
    id: 'ci_second_miracle_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ci_long_witness') &&
      G.currentYear >= 2015 &&
      !G.mem?.ciSecondMiracle,
    text: 'The economy has grown at 7 or 8 percent per year since 2012. People are calling it the Ivorian Miracle again. Cocoa production at record levels. The Plateau building again. The new bridge across the lagoon. This is the second time in your life you have heard the country described with these words. Between the first time and the second time: the ivoirité politics, the first civil war, two coups, the election crisis, 3,000 deaths, the ICC, the acquittal, and the handshake. The phrase has survived all of it. You have too.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 3; p.addFlag('ci_full_arc_witness'); p.setMem('ciSecondMiracle', true); },
  },

  // ── IVORIAN MIRACLE GENERATION: LATE RECKONING ───────────────────────────────

  {
    id: 'ci_miracle_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ivorian_miracle_generation') &&
      !G.flags.includes('ci_long_witness') &&
      G.currentYear >= 2010 &&
      !G.mem?.ciMiracleLate,
    text: 'You grew up in the years when Ivory Coast was called the Ivorian Miracle. You are old enough now to see what the miracle required and what it left out. The cocoa economy that produced 7 percent growth for fifteen years required four million migrants who had fewer rights than you did. The stability that made investors comfortable was one man\'s stability — thirty-three years, one photograph in every classroom. The miracle was real. The things it was built on were also real. They were not in the same sentence.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.addFlag('ci_miracle_reckoned'); p.setMem('ciMiracleLate', true); },
  },

  // ── COCOA FARMER LATE ARC ────────────────────────────────────────────────────

  {
    id: 'ci_cocoa_late_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ci_cocoa_farmer') &&
      G.currentYear >= 2010 &&
      !G.mem?.ciCocoaLate,
    text: 'You have been growing cocoa for thirty or forty years. Ivory Coast produces a third of the world\'s chocolate. A bar of chocolate in a European supermarket costs two euros. The cocoa in it was worth seven cents when it left your farm. The price was set in London. The research from the European universities says child labour is endemic in the cocoa supply chain. You know which children work in the cocoa. You know what the alternative was. The accounting that appears in the European newspapers and the accounting you do in your own head use the same numbers to reach different conclusions.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 2; p.addFlag('ci_cocoa_accounting'); p.setMem('ciCocoaLate', true); },
  },

  // ── SAHEL REGIONAL CROSS-ARC ─────────────────────────────────────────────────

  {
    id: 'sahel_regional_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2022 &&
      (G.flags.includes('mali_long_witness') ||
       G.flags.includes('burkina_coup_2022') ||
       G.flags.includes('ci_election_crisis_witness')) &&
      !G.mem?.sahelRegionalLate,
    text: 'The Sahel crisis has moved through the region like a season that doesn\'t end. Mali, then Burkina Faso, then the edges of Ivory Coast. The jihadist groups that took Timbuktu in 2012 are in villages in central Burkina now. Coups in Mali (twice), Burkina (twice), Guinea, Sudan. The French expelled from Mali and Burkina. Wagner Group in their place. The UN missions reduced or withdrawn. You have watched the map change and the names change and the logic stay the same: armed groups, failing states, civilian populations in the middle. The region you grew up in and the region you are old in are not the same region.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.m -= 5; p.addFlag('sahel_long_arc_witness'); p.setMem('sahelRegionalLate', true); },
  },

  // ── TUAREG SETTLED: LATE IDENTITY RETURN ─────────────────────────────────────

  {
    id: 'tuareg_settled_late_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('tuareg_settled') &&
      G.currentYear >= 2010 &&
      !G.mem?.tuaregSettledLate,
    text: 'You settled in the city. You became urban, credentialled, documented. The seasonal routes your grandparents knew — north for dry season, south for rains — are routes you know as geography but not as movement. The 2012 uprising in the north, the MNLA declaring Azawad, the subsequent collapse: you watched it from Bamako or Gao or Kidal. The city was safer and more distant and you were part of neither the nomadic life that the rebellion claimed to defend nor the state that tried to suppress it. You held a position between two things that were at war with each other.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.addFlag('tuareg_settled_reckoned'); p.setMem('tuaregSettledLate', true); },
  },


  // ── CAMEROON: ANGLOPHONE LONG ARC ────────────────────────────────────────────

  {
    id: 'cmr_anglophone_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('anglophone_cameroonian') &&
      G.currentYear >= 2020 &&
      !G.mem?.cmrAngloLate,
    text: 'The Anglophone regions\' grievances were, in 2016, about judges and teachers. The government\'s response made them about much more. You have now watched this for years. The schools that have been closed — some continuously since 2016 — have produced a generation of children in the northwest and southwest who are functionally illiterate. The armed groups that were meant to be a pressure tactic are now a set of factions fighting each other as much as the government. Biya has not visited the regions. No peace framework has been proposed that both sides accepted. The arithmetic of the cabinet ministers has not changed.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.addFlag('anglophone_long_witness'); p.setMem('cmrAngloLate', true); },
  },

  {
    id: 'cmr_crisis_echo_francophone',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anglophone_crisis_witness') &&
      !G.flags.includes('anglophone_crisis_inside') &&
      G.currentYear >= 2022 &&
      !G.mem?.cmrCrisisEcho,
    text: 'You watched the Anglophone crisis from the Francophone south. From Yaoundé or Douala or Bafoussam the northwest and southwest were a separate country, almost — accessible by road but operating by different rules. You heard the reports: villages burned, children kept out of school, the internet shut down, humanitarian organisations blocked. You continued. The specific moral position of continuing while something like this happens in the same country is not a position that gets named in the news or discussed in the government briefings. You named it yourself, in private, a few times.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.addFlag('cmr_crisis_witness_reckoned'); p.setMem('cmrCrisisEcho', true); },
  },

  {
    id: 'cmr_inside_long_memory',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('anglophone_crisis_inside') &&
      G.currentYear >= 2023 &&
      !G.mem?.cmrInsideLate,
    text: 'It has been years now. The specific dates: the lawyers\' strike, October 2016. The internet shutdown, January 2017. The first village burnings, 2018. The name "Ambazonia" declared by the separatist leadership. The split between the armed factions. The children who have not been to school since the boycott began. You were inside this and you are still inside it. The phrase that keeps occurring to you is not "When will it end?" — that question has no available answer. The phrase is "What will be left?"',
    choices: null,
    effect: (p) => { p.r += 10; p.m -= 6; p.e += 3; p.addFlag('anglophone_inside_reckoned'); p.setMem('cmrInsideLate', true); },
  }
]
