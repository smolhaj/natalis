// Follow-through events for flags that were previously set and never re-checked.
// Design rule: every event here REQUIRES a specific prior flag as its gate.
// The event exists because the flag represents something that shaped the character
// and should surface again, changed by time.

export const FOLLOWTHROUGH_EVENTS = [

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
    text: (G) => `Something ${G.partner.name} says — a tone, not even a word — and you are somewhere else for a second. You come back. ${G.partner.name} doesn't know where you went.`,
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

]
