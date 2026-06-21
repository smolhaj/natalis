// events_crosscutting.js
// 22 cross-cutting experience arc events across archetypes and eras.
// Arc 1: Domestic Worker (7 events) — cc_domestic_*
// Arc 2: City Under Bombardment (8 events) — cc_bombardment_*
// Arc 3: Refugee Camp as Childhood (7 events) — cc_camp_*

export const CROSSCUTTING_EVENTS = [

  // ── ARC 1: DOMESTIC WORKER ───────────────────────────────────────────────────

  {
    id: 'cc_domestic_worker_uniform',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ccDomesticUniform &&
      (G.flags.includes('domestic_worker') ||
        (G.career && G.career.field === 'domestic')) &&
      G.age >= 18 && G.age <= 35,
    text: 'The uniform is a pale blue cotton dress that belongs to them, not to you. You fold it when the day is over and leave it on the hook inside the service door. There is a bedroom you may use during certain hours — between two and three in the afternoon, while they are out. You are learning the geography of this house from the inside: which drawer sticks, which child wakes early, which cupboard is never opened. The family\'s private life becomes, over weeks, simply the place where you work.',
    choices: [
      {
        text: 'Find your footing in the routine of it',
        tag: null,
        outcome: 'You learn the shape of the household and fit yourself inside it. This is a skill, and you are good at it.',
        effect: (p) => { p.m += 3; p.s += 4; p.addFlag('domestic_worker'); p.setMem('ccDomesticUniform', true) },
      },
      {
        text: 'Feel the particular strangeness of it — the visibility and the invisibility at once',
        tag: null,
        outcome: 'You are present at everything and absent from everything. This takes some adjusting to.',
        effect: (p) => { p.m -= 4; p.e += 5; p.addFlag('domestic_worker'); p.setMem('ccDomesticUniform', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_domestic_employer_kind',
    phase: 'young_adult',
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.flags.includes('domestic_worker') &&
      G.age >= 20 &&
      !G.flags.includes('domestic_mistreated'),
    text: 'The employer asks, at the end of a long Tuesday, whether you are all right. It is a genuine question — not the rhetorical kind, not the kind that expects a particular answer. You answer honestly, which surprises you. She listens. This relationship is not friendship. You both know that. But it has become something that resembles kindness, and kindness has its own complications: it makes it harder to ask for what you need, and harder still to leave.',
    choices: null,
    effect: (p) => { p.m += 6; p.s += 3; p.addFlag('domestic_employer_kind') },
  },

  {
    id: 'cc_domestic_employer_unkind',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ccDomesticUnkind &&
      G.flags.includes('domestic_worker') &&
      G.age >= 18,
    text: 'The way she says your name when something is not done to her standard is a specific sound. Not shouted — smaller than that. The tone that means you have failed a test whose rules she has not disclosed. You have no contract to point to and no one to complain to who would see it her way. The house is hers. You are in it.',
    choices: [
      {
        text: 'Endure it — the work is the work, and you need the position',
        tag: null,
        outcome: 'You become very good at absorbing the tone without letting it reach you. It costs something to do this every day.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('domestic_mistreated'); p.setMem('ccDomesticUnkind', true) },
      },
      {
        text: 'Leave — no wage is worth this particular erosion',
        tag: null,
        outcome: 'You give a week\'s notice and do not explain yourself. Finding another position takes time. The time is its own price.',
        effect: (p) => { p.m += 4; p.s += 5; p.mo -= 300; p.addFlag('domestic_mistreated'); p.setMem('ccDomesticUnkind', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_domestic_children_grow',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      !G.mem?.ccDomesticChildrenGrow &&
      G.flags.includes('domestic_worker') &&
      G.age >= 40,
    text: 'The older child has been accepted to university. The mother tells you over coffee — your coffee, made in the kitchen you have cleaned for nine years. You watched this child learn to walk. You have picked up every object they have ever dropped. You say congratulations and mean it, which is the strangest part. The achievement is theirs. The years inside it were also partly yours, and that accounting has no category.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 6; p.e += 4 },
  },

  {
    id: 'cc_domestic_wage_negotiation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ccDomesticWage &&
      G.flags.includes('domestic_worker') &&
      G.age >= 22,
    text: 'You have been here two years. You know what the work involves now — more than you knew when the wage was agreed. You know also that asking will change something in the air between you, and that the relationship you depend on is precisely what makes this difficult. You have been underpaid for two years, and you know it, and so does she.',
    choices: [
      {
        text: 'Ask for a raise — you have earned the ground to stand on',
        tag: null,
        outcome: 'There is a pause, and then she agrees to something less than you asked for and more than you had. The air changes, but it does not break.',
        effect: (p) => { p.mo += 150; p.s += 5; p.m += 4; p.setMem('ccDomesticWage', true) },
      },
      {
        text: 'Don\'t ask — the position is stable and the risk is real',
        tag: null,
        outcome: 'The number stays the same. You learn to spend less. You do not entirely forgive yourself for the silence.',
        effect: (p) => { p.m -= 6; p.r += 5; p.setMem('ccDomesticWage', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_domestic_ofw_gulf',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ccDomesticOfw &&
      G.character.gender === 'female' &&
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1990 &&
      (G.flags.includes('domestic_worker') || G.flags.includes('emigrated')),
    text: 'The contract said eight hours and Sundays off. Here the Sundays are not off and the hours are what the family requires. Your passport is in a drawer in the employer\'s bedroom. He said it was for safekeeping. You did not argue because the agency told you this is how it is done here, and the agency was not wrong, exactly — this is how it is done. You send money home every month through a remittance office two bus stops away. The money arrives. You do not ask too carefully what it costs you to send it.',
    choices: null,
    effect: (p) => { p.m -= 14; p.h -= 5; p.karma += 8; p.addFlag('gulf_domestic_worker'); p.addFlag('domestic_worker'); p.setMem('ccDomesticOfw', true) },
  },

  {
    id: 'cc_domestic_south_africa',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ccDomesticSA &&
      G.character.country.name === 'South Africa' &&
      G.flags.includes('domestic_worker') &&
      G.currentYear >= 1960 && G.currentYear <= 1994 &&
      (G.ethnicity === 'black' || G.ethnicity === 'coloured' ||
        (G.character.country.ethnicGroups &&
          G.flags.includes('black_south_african'))),
    text: 'You take the seven o\'clock bus from the township to the suburb and arrive before the family is awake. You know where the spare key is, which child has bad dreams, how the husband takes his coffee. You know their news before they tell each other. On the television in the evenings you watch what is said about the country and you know it is not the same country you travel home to on the seven o\'clock bus. You change out of the uniform at the gate. You cross the street. The street is the same street with different people on it.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.e += 6; p.addFlag('apartheid_era_domestic'); p.setMem('ccDomesticSA', true) },
  },

  // ── ARC 2: CITY UNDER BOMBARDMENT ───────────────────────────────────────────

  {
    id: 'cc_bombardment_first_night',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.ccBombardmentStart &&
      !G.flags.includes('city_under_bombardment') &&
      (G.archetype === 'conflict_zone' ||
        ['Lebanon', 'Syria', 'Iraq', 'Bosnia', 'Palestine'].includes(G.character.country.name) ||
        G.flags.includes('war_zone_civilian')) &&
      G.age >= 5,
    text: 'The first night it starts in earnest, the sound is instructive. Close means a particular compression in the chest — not just heard but felt. The sound that missed you has a different quality, a lateral passage. Silence after a sound is not the absence of sound: it is the two seconds in which you calculate. By morning you understand a vocabulary you did not have yesterday. You do not know yet that you will carry it for the rest of your life.',
    choices: null,
    effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('city_under_bombardment'); p.addFlag('traumatized_by_violence'); p.setMem('ccBombardmentStart', true) },
  },

  {
    id: 'cc_bombardment_safe_route',
    phase: null,
    weight: 4,
    cooldown: 2,
    when: (G) =>
      G.flags.includes('city_under_bombardment') &&
      G.age >= 5,
    text: 'You take the long way around the intersection near the post office. You have not taken the direct route in six weeks. The knowledge is in your body now — you check without thinking, the way you checked the stove before any of this. Other people in the neighbourhood have made the same calculation. You can tell by how they walk past that corner. Nobody says it. You all know.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 3 },
  },

  {
    id: 'cc_bombardment_market_wednesday',
    phase: null,
    weight: 3,
    cooldown: 3,
    when: (G) =>
      G.flags.includes('city_under_bombardment') &&
      G.age >= 10,
    text: 'The market near the old bus terminal is open on Wednesday mornings. The vegetable sellers are there; one of the coffee stalls is back. People buy things and discuss prices and complain about the quality of the tomatoes. A kilometre away, something is on fire. You buy what you need and carry it home in the usual bag. The surrealism is total, and nobody mentions it, because mentioning it would make the market disappear.',
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('bombardment_ordinary_life') },
  },

  {
    id: 'cc_bombardment_run_bag',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.ccBombardmentBag &&
      G.flags.includes('city_under_bombardment') &&
      G.age >= 12,
    text: 'You pack a bag and keep it by the door. This is a practical decision, not a hopeful one. You have thought about what goes in it: the document, the photographs, the small amount of money. The bag is ready. Having it there changes nothing about the shelling. It changes something about how you sleep.',
    choices: [
      {
        text: 'Pack the documents and money — the practical things',
        tag: null,
        outcome: 'The bag is efficient and honest. You are preparing for survival, not memory.',
        effect: (p) => { p.m -= 6; p.e += 4; p.setMem('ccBombardmentBag', 'documents'); p.addFlag('bombardment_bag_packed') },
      },
      {
        text: 'Pack the photographs — the things that cannot be replaced',
        tag: null,
        outcome: 'The documents can be reissued eventually. The photograph of your mother at twenty cannot. You know what this choice means about what you think you are preparing for.',
        effect: (p) => { p.m -= 10; p.r += 5; p.setMem('ccBombardmentBag', 'photographs'); p.addFlag('bombardment_bag_packed') },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_bombardment_neighbour_gone',
    phase: null,
    weight: 3,
    cooldown: 3,
    when: (G) =>
      G.flags.includes('city_under_bombardment') &&
      G.age >= 12,
    text: 'The apartment across the landing has been empty for eleven days. The last time you saw them was on a Tuesday. You do not know if they left before something happened or if they left because something happened or what the difference is now. You do not knock. You have decided, without deciding, not to know. You pass the door each morning. You do not look at it directly.',
    choices: null,
    effect: (p) => { p.m -= 16; p.r += 8 },
  },

  {
    id: 'cc_bombardment_child_explanation',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      !G.mem?.ccBombardmentChildExplain &&
      G.flags.includes('city_under_bombardment') &&
      G.children && G.children.length > 0 &&
      G.age >= 28,
    text: 'Your child asks what the sound was. They are calm when they ask — children learn to be calm about the things that are constant — but they are asking. You have a second to decide what this answer is. The truth in terms they can hold is not the same as the truth.',
    choices: [
      {
        text: 'Tell them the truth plainly — they already know something is happening',
        tag: null,
        outcome: 'They nod with the seriousness of a child who has been trusted with the actual situation. That night they sleep, and you lie awake.',
        effect: (p) => { p.m -= 10; p.karma += 6; p.setMem('ccBombardmentChildExplain', true) },
      },
      {
        text: 'Give them a version that keeps them calm — you can carry this for them a while longer',
        tag: null,
        outcome: 'They accept it because they love you and because children accept what they are given by the people they depend on. This will not last forever.',
        effect: (p) => { p.m -= 6; p.r += 8; p.setMem('ccBombardmentChildExplain', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_bombardment_ceasefire',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.ccBombardmentCeasefire &&
      G.flags.includes('city_under_bombardment') &&
      G.age >= 5,
    text: 'The ceasefire is announced on the radio in the early afternoon. For the first hour after the announcement there is silence where there had been shelling, and the silence is not peaceful — it is the sound of a condition you do not yet trust. You wait. People open windows and look out at the street. No one goes down immediately. The second hour passes. The silence holds. A child somewhere nearby begins to cry, which is the first ordinary sound in a long time.',
    choices: null,
    effect: (p) => { p.m += 10; p.h += 4; p.setMem('ccBombardmentCeasefire', true) },
  },

  {
    id: 'cc_bombardment_end',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.ccBombardmentEnd &&
      G.flags.includes('city_under_bombardment') &&
      G.mem?.ccBombardmentCeasefire &&
      G.age >= 5,
    text: 'The war in your city has ended. You are not sure, at first, how you know this versus the previous ceasefires — something in the quality of the silence, the movement on the streets, the absence of the particular tension that preceded each resumption. The first week without the sound is its own kind of strange. You keep waking before dawn to listen. The buildings that are not there will not be rebuilt quickly. The people who are not here did not come back. You did.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.h += 5
      p.addFlag('survived_bombardment')
      p.addFlag('city_under_bombardment_ended')
      p.setMem('ccBombardmentEnd', true)
    },
  },

  // ── ARC 3: REFUGEE CAMP AS CHILDHOOD ────────────────────────────────────────

  {
    id: 'cc_camp_arrival_child',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem?.ccCampArrival &&
      !G.flags.includes('grew_up_in_camp') &&
      !G.flags.includes('camp_born') &&
      (G.archetype === 'conflict_zone' || G.residencyStatus === 'refugee_status' || G.residencyStatus === 'asylum_seeker') &&
      G.age >= 3 && G.age <= 12,
    text: 'You are registered at a table outside a tent. The man behind the table asks questions your parents answer. He writes something on a card and hands it to your father. This card is now, in this place, your document of existence — it says who you are and how many of you there are and what you are allowed to receive. You are given a tent number. The tent has a number but not a name. You will live here for longer than anyone at the table is currently imagining.',
    choices: null,
    effect: (p) => {
      p.m -= 18
      p.h -= 6
      p.addFlag('grew_up_in_camp')
      p.setMem('ccCampArrival', true)
    },
  },

  {
    id: 'cc_camp_unrwa_school',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem?.ccCampSchool &&
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      G.age >= 6 && G.age <= 14,
    text: 'The school inside the camp has forty children in one classroom and a teacher who has been here longer than you have. The textbooks describe a geography — a village, a market, a river — that you have never seen. The curriculum was written for children who would return to a place. The teacher knows this and teaches it anyway, because the curriculum is also a memory, and memories are kept even when the place is gone. You learn the spelling of a street that no longer exists in the form it had when the spelling was made.',
    choices: null,
    effect: (p) => { p.e += 6; p.m -= 5; p.setMem('ccCampSchool', true) },
  },

  {
    id: 'cc_camp_ration_day',
    phase: 'childhood',
    weight: 3,
    cooldown: 3,
    when: (G) =>
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      G.age >= 5 && G.age <= 16,
    text: 'Ration distribution is on Thursday. Your mother knows what time the queue will be shortest. You know which items will run out before the back of the queue. The card is presented, the amount is recorded, the bags are heavy on the way back. The day is organized around this. The week is organized around this day.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h += 2 },
  },

  {
    id: 'cc_camp_informal_economy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ccCampEconomy &&
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      G.age >= 18 && G.age <= 35,
    text: 'Formal employment in the camp is not permitted. The camp has an economy anyway — repair stalls, phone-charging stations, small cooking enterprises, someone who brings fabric from outside and someone else who sews it. The money that moves between people here moves outside the categories that any government recognizes. You have a skill the camp needs.',
    choices: [
      {
        text: 'Build something within the constraints — the camp is where you live',
        tag: null,
        outcome: 'The enterprise is small and real and yours. It does not solve the situation. It makes the situation livable.',
        effect: (p) => { p.m += 8; p.w += 3; p.mo += 200; p.s += 4; p.addFlag('camp_entrepreneur'); p.setMem('ccCampEconomy', true) },
      },
      {
        text: 'Wait for the resettlement — building here feels like accepting permanence',
        tag: null,
        outcome: 'You wait. The waiting is its own full-time condition. The resettlement interview has not been scheduled.',
        effect: (p) => { p.m -= 8; p.r += 6; p.setMem('ccCampEconomy', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_camp_resettlement_interview',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ccCampInterview &&
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      G.age >= 18 && G.age <= 35,
    text: 'The UNHCR officer comes to the camp once a year. You have been on the list for the interview. The room is a repurposed supply container with a table and two chairs. You are asked about the circumstances of your displacement, your family structure, your health, your skills. The officer types without looking at you. At the end they say your case will be reviewed. They say this to everyone. You cannot tell, from the interview, whether your case is one that will be reviewed or one that will be filed.',
    choices: [
      {
        text: 'The interview goes clearly — you answered every question',
        tag: null,
        outcome: 'You walk out into the camp light not knowing anything more than you knew before, but you answered truthfully and completely. That is what you could control.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('resettlement_interview_done'); p.setMem('ccCampInterview', true) },
      },
      {
        text: 'The interview is inconclusive — you could not explain the things that don\'t translate',
        tag: null,
        outcome: 'There were questions you answered correctly and questions whose answers depend on a context the form has no field for. You do not know what was recorded.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('resettlement_interview_done'); p.setMem('ccCampInterview', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cc_camp_resettlement_arrival',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ccCampResettlement &&
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      G.flags.includes('resettlement_granted') &&
      G.age >= 18 && G.age <= 40,
    text: 'The airport is fluorescent and enormous. The trolleys have wheels that move in multiple directions. In the supermarket they take you to on the second day, every shelf has thirty varieties of the same product. The traffic lights make a sound for the blind. Nobody is looking at you, which is its own specific strangeness after years in a place where your face was known by a thousand people and your tent number was your address. You have been preparing for this moment for years and it turns out preparation does not tell you how a supermarket feels when you have never been in one before.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.h += 8
      p.e += 5
      p.addFlag('resettlement_established')
      p.setMem('ccCampResettlement', true)
    },
  },

  {
    id: 'cc_camp_multigenerational',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem?.ccCampMidlife &&
      (G.flags.includes('grew_up_in_camp') || G.flags.includes('camp_born')) &&
      !G.flags.includes('resettlement_granted') &&
      !G.flags.includes('resettlement_established') &&
      G.age >= 40,
    text: 'Your child is nine. Nine was how old you were when you arrived. The tent your family lives in is not the original tent — tents are replaced when they fail — but it stands on the same ground and faces the same direction as the first one. The word temporary was used at the beginning. No one uses it now. There is a family two rows over whose grandmother arrived in the first year, whose son was born here, whose grandchildren were born here. You understand something about permanence that people outside this place have difficulty imagining.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 12; p.e += 5; p.setMem('ccCampMidlife', true) },
  },

]
