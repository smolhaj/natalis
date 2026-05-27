import { GENDER_EVENTS } from './events_gender.js'
import { RELIGION_EVENTS } from './events_religion.js'
import { HISTORICAL_EVENTS } from './events_historical.js'
import { CULTURE_EVENTS } from './events_culture.js'
import { TECHNOLOGY_EVENTS } from './events_technology.js'
import { IMMIGRATION_EVENTS } from './events_immigration.js'
import { CAREER_REGIME_EVENTS } from './events_career_regime.js'
import { CONFLICT_CHILDHOOD_EVENTS } from './events_conflict_childhood.js'
import { LGBTQ_EVENTS } from './events_lgbtq.js'
import { MENTAL_HEALTH_EVENTS } from './events_mental_health.js'
import { GRIEF_EVENTS } from './events_grief.js'
import { GRIEF_MENTAL_EVENTS } from './events_grief_mental.js'
import { RELIGION_ARC_EVENTS } from './events_religion_arc.js'
import { LATE_LIFE_EVENTS } from './events_late_life.js'
import { CHILDREN_ARC_EVENTS } from './events_children_arc.js'
import { FAME_KARMA_EVENTS } from './events_fame_karma.js'
import { TEXTURE_EVENTS } from './events_texture.js'
import { SOCIETY_EVENTS } from './events_society.js'
import { CONSEQUENCE_EVENTS } from './events_consequence.js'
import { ROMANCE_ARC_EVENTS } from './events_romance_arc.js'
import { ACTIVITY_PAYOFF_EVENTS } from './events_activity_payoffs.js'
import { FRIEND_EVENTS } from './events_friends.js'
import { BUSINESS_EVENTS } from './events_business.js'
import { SIBLING_EVENTS } from './events_siblings.js'
import { EDUCATION_ARC_EVENTS } from './events_education_arc.js'

const BASE_EVENTS = [
  // ── EARLY CHILDHOOD ─────────────────────────────────────────────────────────
  {
    id: 'ec_warmth',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.character.familyStability === 'stable' || G.character.familyStability === 'secure',
    text: 'Your early years are warm. There is food, laughter, and a sense that the world is safe.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 6; p.h += 3; p.addFlag('secure_childhood'); },
  },
  {
    id: 'ec_parent_loss',
    phase: 'early_childhood',
    weight: 1,
    when: (G) => G.character.familyStability === 'unstable',
    text: 'One of your parents is gone before you can form a clear memory of them. The absence shapes everything quietly.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('lost_parent_young'); p.killParent('father'); },
  },
  {
    id: 'ec_conflict_zone_birth',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'conflict_zone',
    text: 'The sounds of conflict are your first memories. You learn early that the world outside can be dangerous.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 4; p.addFlag('war_childhood'); },
  },
  {
    id: 'ec_displacement',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.country.conflictRisk > 0.2,
    text: 'Your family flees. You are too young to understand what is being left behind, but old enough to feel the fear.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('displaced'); p.addFlag('refugee'); },
  },
  {
    id: 'ec_sibling_bond',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.familySize >= 3,
    text: 'You grow up surrounded by siblings. There is always someone to fight with and someone to protect you.',
    context: null,
    choices: null,
    effect: (p) => { p.s += 5; p.addFlag('close_siblings'); },
  },
  {
    id: 'ec_illness',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.country.healthcare === 'poor' || G.character.country.healthcare === 'very_poor',
    text: 'A childhood illness passes through your area. You survive, but it leaves its mark.',
    context: null,
    choices: null,
    effect: (p) => { p.h -= 12; },
  },
  {
    id: 'ec_poverty',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.wealthTier <= 1,
    text: 'Hunger is a recurring companion. You understand scarcity before you understand much else.',
    context: null,
    choices: null,
    effect: (p) => { p.h -= 5; p.m -= 4; p.w -= 3; p.addFlag('poverty_childhood'); },
  },

  // ── CHILDHOOD ───────────────────────────────────────────────────────────────
  {
    id: 'ch_teacher_notice',
    phase: 'childhood',
    weight: 3,
    when: () => true,
    text: 'A teacher notices your effort and stays after class to help you.',
    context: null,
    choices: [
      {
        text: 'Stay and learn',
        tag: 'determined_student',
        outcome: 'You absorb more than the lesson.',
        effect: (p) => { p.e += 5; p.m += 3; },
        inject: null,
      },
      {
        text: 'Leave — you have chores at home',
        tag: 'family_first',
        outcome: 'The opportunity passes quietly.',
        effect: (p) => { p.s += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_bully',
    phase: 'childhood',
    weight: 3,
    when: () => true,
    text: 'An older child at school has made you their target. It happens daily now.',
    context: null,
    choices: [
      {
        text: 'Fight back',
        tag: 'fighter',
        outcome: 'You win enough respect to be left alone. Your knuckles ache.',
        effect: (p) => { p.m += 3; p.h -= 2; p.s -= 2; },
        inject: null,
      },
      {
        text: 'Tell a teacher',
        tag: 'rules_follower',
        outcome: 'Things improve for a while, then quietly get worse again.',
        effect: (p) => { p.m -= 3; },
        inject: null,
      },
      {
        text: 'Endure it',
        tag: 'resilient',
        outcome: 'You become very good at making yourself small.',
        effect: (p) => { p.m -= 5; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_books',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.stats.smarts >= 50,
    text: 'You discover the school library. The librarian lets you take out more books than the limit.',
    context: null,
    choices: null,
    effect: (p) => { p.e += 6; p.m += 4; p.addFlag('early_reader'); },
  },
  {
    id: 'ch_work',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character.wealthTier <= 1 || G.character.familyStability === 'unstable',
    text: 'Your parents need you to work. School becomes a place you go when you can.',
    context: null,
    choices: [
      {
        text: 'Work without complaint — the family needs it',
        tag: 'family_sacrifice',
        outcome: 'You grow up fast. Education suffers.',
        effect: (p) => { p.w += 3; p.e -= 5; p.s += 2; },
        inject: null,
      },
      {
        text: 'Try to do both',
        tag: 'determined',
        outcome: 'You exhaust yourself and barely manage both.',
        effect: (p) => { p.h -= 4; p.m -= 3; p.e += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_sport',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.stats.health >= 50,
    text: 'You discover a natural talent for sport. A coach takes notice.',
    context: null,
    choices: [
      {
        text: 'Train seriously',
        tag: 'athlete',
        outcome: 'Sport becomes your identity.',
        effect: (p) => { p.h += 7; p.s += 4; p.addFlag('athlete'); },
        inject: {
          id: 'ch_sport_scout',
          phase: 'adolescence',
          weight: 5,
          text: 'A regional scout watches your performance. You could be selected for a youth program.',
          choices: [
            {
              text: 'Go for it — train full time',
              tag: 'competitive',
              outcome: 'The selection changes what you think is possible.',
              effect: (p) => { p.h += 5; p.s += 6; p.m += 4; },
              inject: null,
            },
            {
              text: 'Decline — the commitment is too much',
              tag: 'realistic',
              outcome: 'The door closes quietly.',
              effect: (p) => { p.m -= 3; },
              inject: null,
            },
          ],
          effect: null,
          when: (G) => G.flags.includes('athlete'),
        },
      },
      {
        text: 'Play casually',
        tag: null,
        outcome: 'Sport stays a hobby.',
        effect: (p) => { p.h += 3; p.s += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_religion',
    phase: 'childhood',
    weight: 2,
    when: () => true,
    text: 'Faith is a major presence in your home. You are expected to participate.',
    context: null,
    choices: [
      {
        text: 'Embrace it',
        tag: 'devout',
        outcome: 'Faith gives your life a shape you find comforting.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('devout'); },
        inject: null,
      },
      {
        text: 'Go through the motions',
        tag: null,
        outcome: 'You participate without believing.',
        effect: (p) => { p.m -= 1; p.s += 1; },
        inject: null,
      },
      {
        text: 'Question it openly',
        tag: 'skeptic',
        outcome: 'Your family is not pleased. You find the clarity worth the friction.',
        effect: (p) => { p.m += 2; p.s -= 3; p.e += 3; p.addFlag('skeptic'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_parent_alcoholism',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character.familyStability === 'unstable',
    text: 'A parent drinks. The house changes depending on the hour.',
    context: null,
    choices: [
      {
        text: 'Try to hold the family together',
        tag: 'caretaker',
        outcome: 'You take on a weight far too heavy for your age.',
        effect: (p) => { p.m -= 8; p.s += 3; p.r += 5; p.addFlag('parentified_child'); },
        inject: null,
      },
      {
        text: 'Withdraw into yourself',
        tag: null,
        outcome: 'Isolation becomes a skill.',
        effect: (p) => { p.m -= 5; p.s -= 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_subsaharan_village',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'subsaharan',
    text: 'Community labor, communal meals, the rhythm of a village life that is ancient and still functioning.',
    context: null,
    choices: null,
    effect: (p) => { p.s += 5; p.m += 2; p.addFlag('communal_values'); },
  },
  {
    id: 'ch_soviet_school',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'post_soviet',
    text: 'School is strict. Memorization, discipline, collective identity. Individuality is not rewarded.',
    context: null,
    choices: [
      {
        text: 'Excel within the system',
        tag: 'system_player',
        outcome: 'You learn to perform. It serves you for a long time.',
        effect: (p) => { p.e += 6; p.s -= 2; },
        inject: null,
      },
      {
        text: 'Resist quietly',
        tag: 'independent_thinker',
        outcome: 'You develop an inner life the school cannot reach.',
        effect: (p) => { p.e += 3; p.m += 4; p.addFlag('independent_thinker'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_developing_street',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'developing_urban',
    text: 'The streets around your home are your real classroom. You learn things no school teaches.',
    context: null,
    choices: null,
    effect: (p) => { p.s += 6; p.w += 2; p.addFlag('street_smart'); },
  },
  {
    id: 'ch_gifted_program',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.stats.smarts >= 70 && G.character.country.archetype !== 'conflict_zone',
    text: 'Your school recommends you for a gifted program. Your parents must agree to extra hours.',
    context: null,
    choices: [
      {
        text: 'Enroll — push yourself',
        tag: 'gifted',
        outcome: 'The advanced work reshapes how you see problems.',
        effect: (p) => { p.e += 8; p.m -= 2; p.addFlag('gifted'); },
        inject: null,
      },
      {
        text: 'Decline — you want a normal childhood',
        tag: null,
        outcome: 'You keep your afternoons free.',
        effect: (p) => { p.s += 4; p.m += 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ch_school_bully',
    phase: 'childhood',
    weight: 3,
    when: () => true,
    text: 'A classmate has been bullying you. They take your lunch and call you names.',
    context: null,
    choices: [
      {
        text: 'Stand up to them',
        tag: 'stood_up_to_bully',
        outcome: 'You confront the bully. After a tense standoff, they back down.',
        effect: (p) => { p.m += 6; p.s += 3; p.karma += 2; },
        inject: null,
      },
      {
        text: 'Tell a teacher',
        tag: null,
        outcome: 'A teacher intervenes. The bullying stops, but you feel embarrassed.',
        effect: (p) => { p.m += 2; p.r += 2; },
        inject: null,
      },
      {
        text: 'Ignore them',
        tag: null,
        outcome: 'You try to ignore it, but the bullying continues.',
        effect: (p) => { p.m -= 5; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_first_best_friend',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.stats.charisma > 30 && (G.friends ?? []).length === 0,
    text: 'You and a classmate become inseparable. You spend every recess together and they invite you to their birthday party.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.addFlag('has_close_friend'); p.makeFriend(75); },
  },
  {
    id: 'ch_school_talent_show',
    phase: 'childhood',
    weight: 2,
    when: () => true,
    text: 'Your school is holding a talent show. Your classmates are already signing up.',
    context: null,
    choices: [
      {
        text: 'Perform in the show',
        tag: null,
        outcome: 'You perform in front of the whole school. Terrifying but thrilling.',
        effect: (p) => { p.m += 5; p.s += 5; },
        inject: null,
      },
      {
        text: 'Help backstage',
        tag: null,
        outcome: 'You help behind the scenes. Less glory, but you make good friends.',
        effect: (p) => { p.m += 3; p.s += 2; },
        inject: null,
      },
      {
        text: 'Skip it entirely',
        tag: null,
        outcome: 'You avoid the whole affair. Quiet and unbothered.',
        effect: (p) => { p.m -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ch_library_discovery',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.stats.smarts > 40,
    text: 'You discover the school library and spend your lunch breaks devouring books.',
    context: null,
    choices: null,
    effect: (p) => { p.e += 5; p.m += 3; p.addFlag('bookworm'); },
  },

  // ── ADOLESCENCE ─────────────────────────────────────────────────────────────
  {
    id: 'adol_first_love',
    phase: 'adolescence',
    weight: 4,
    when: () => true,
    text: 'You fall for someone at school. It is consuming and slightly embarrassing.',
    context: null,
    choices: [
      {
        text: 'Pursue them',
        tag: 'romantic',
        outcome: 'They say yes. It lasts a summer, but the feeling stays with you.',
        effect: (p) => { p.m += 6; p.s += 4; p.addFlag('had_first_love'); },
        inject: null,
      },
      {
        text: 'Say nothing',
        tag: 'introverted',
        outcome: 'The feeling calcifies into something private.',
        effect: (p) => { p.m -= 3; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_university_exam',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.stats.smarts >= 30,
    text: 'The university entrance exam is approaching. Everything seems to depend on it.',
    context: null,
    choices: [
      {
        text: 'Study relentlessly',
        tag: 'academic',
        outcome: 'The score opens doors you did not know existed.',
        effect: (p) => { p.e += 10; p.m -= 4; p.h -= 3; },
        inject: null,
      },
      {
        text: 'Study moderately and live your life',
        tag: 'balanced',
        outcome: 'A decent score. Decent options.',
        effect: (p) => { p.e += 5; p.m += 2; },
        inject: null,
      },
      {
        text: 'Give up on university entirely',
        tag: 'non_academic',
        outcome: 'You close that door and start looking for others.',
        effect: (p) => { p.e -= 3; p.w += 2; p.m -= 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_drugs_peer',
    phase: 'adolescence',
    weight: 3,
    when: () => true,
    text: 'A group at a party offers you something. Everyone is watching to see what you do.',
    context: null,
    choices: [
      {
        text: 'Try it',
        tag: 'risk_taker',
        outcome: 'The night goes somewhere unexpected.',
        effect: (p) => { p.h -= 3; p.m += 2; p.s += 3; },
        inject: null,
      },
      {
        text: 'Decline',
        tag: 'disciplined',
        outcome: 'You watch from the edge. The story is less interesting.',
        effect: (p) => { p.m += 2; p.s -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_mentor',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.stats.smarts >= 60 || G.stats.charisma >= 60,
    text: 'An adult in your community takes a genuine interest in your future.',
    context: null,
    choices: [
      {
        text: 'Invest in the relationship',
        tag: 'mentored',
        outcome: 'The connection reshapes your understanding of what is possible.',
        effect: (p) => { p.e += 7; p.s += 5; p.m += 4; p.addFlag('mentored'); },
        inject: null,
      },
      {
        text: 'Keep your distance',
        tag: null,
        outcome: 'You stay on your own trajectory.',
        effect: (p) => { p.m += 1; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_conflict_recruitment',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.character.country.conflictRisk > 0.2,
    text: 'Men with weapons come to your town. They are recruiting — or not quite recruiting.',
    context: null,
    choices: [
      {
        text: 'Flee — leave everything',
        tag: 'refugee',
        outcome: 'You get out. Others do not.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.addFlag('refugee'); p.addFlag('displaced'); },
        inject: null,
      },
      {
        text: 'Join — there is no good alternative',
        tag: 'child_soldier',
        outcome: 'You do things you will spend the rest of your life carrying.',
        effect: (p) => { p.m -= 15; p.h -= 8; p.addFlag('child_soldier'); },
        inject: null,
      },
      {
        text: 'Hide and wait them out',
        tag: 'survivor',
        outcome: 'They take others. You endure.',
        effect: (p) => { p.m -= 10; p.h -= 3; p.addFlag('war_childhood'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_scholarship',
    phase: 'adolescence',
    weight: 2,
    when: (G) => (G.stats.smarts >= 60 || G.flags.includes('early_reader')) && G.character.wealthTier <= 2,
    text: 'A scholarship application lands in front of you. It would pay for university.',
    context: null,
    choices: [
      {
        text: 'Apply honestly',
        tag: 'first_gen_aspirant',
        outcome: 'You get it. The letter arrives on a Tuesday.',
        effect: (p) => { p.e += 8; p.m += 7; p.addFlag('scholarship_recipient'); },
        inject: null,
      },
      {
        text: "Don't apply — you don't think you'll get it",
        tag: null,
        outcome: 'Self-doubt costs something here.',
        effect: (p) => { p.r += 5; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_art',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.stats.charisma >= 60,
    text: 'You discover a creative outlet — music, painting, writing. Something that is entirely yours.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('creative'); },
  },
  {
    id: 'adol_corruption_witness',
    phase: 'adolescence',
    weight: 2,
    when: (G) => ['post_soviet', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype),
    text: 'You see clearly how things work here: who pays whom, who gets what, why the rules apply differently.',
    context: null,
    choices: [
      {
        text: 'Accept it — useful information',
        tag: 'pragmatist',
        outcome: 'You file it away.',
        effect: (p) => { p.m -= 2; p.w += 2; p.addFlag('pragmatist'); },
        inject: null,
      },
      {
        text: 'Reject it — you want no part of it',
        tag: 'principled',
        outcome: 'You will pay for this position later, but you can live with yourself.',
        effect: (p) => { p.m += 4; p.addFlag('principled'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_family_migration',
    phase: 'adolescence',
    weight: 2,
    when: (G) => ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype),
    text: 'Your family is considering emigrating. An uncle abroad says there is opportunity.',
    context: null,
    choices: [
      {
        text: 'Push to go',
        tag: 'ambitious',
        outcome: 'The family takes the step. A new world, cold and unfamiliar.',
        effect: (p) => { p.m -= 5; p.s -= 5; p.e += 5; p.addFlag('emigrated'); p.setResidency('work_visa'); },
        inject: null,
      },
      {
        text: 'Stay — this is your home',
        tag: 'rooted',
        outcome: 'You remain. The uncle sends money occasionally.',
        effect: (p) => { p.s += 3; p.m += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_driving_licence',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 16 && !G.flags.includes('has_licence'),
    text: 'You are old enough to learn to drive. The independence it offers is real.',
    context: null,
    choices: [
      {
        text: 'Take lessons and pass the test',
        tag: 'has_licence',
        outcome: 'The licence opens up the world in practical ways.',
        effect: (p) => { p.m += 6; p.mo -= 800; p.addFlag('has_licence'); },
        inject: null,
      },
      {
        text: 'Not interested right now',
        tag: null,
        outcome: 'There will be other chances.',
        effect: (p) => {},
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'adol_identity',
    phase: 'adolescence',
    weight: 3,
    when: () => true,
    text: 'The question of who you are becomes urgent. The answers available to you are mostly other people\'s.',
    context: null,
    choices: [
      {
        text: 'Conform to expectations',
        tag: 'conformist',
        outcome: 'The friction disappears. Something quieter replaces it.',
        effect: (p) => { p.s += 4; p.m -= 3; p.r += 3; },
        inject: null,
      },
      {
        text: 'Carve your own path',
        tag: 'independent',
        outcome: 'It is harder than it sounds, and worth it.',
        effect: (p) => { p.m += 5; p.s -= 2; p.addFlag('independent_thinker'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ad_peer_pressure_drugs',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14,
    text: 'At a house party, someone offers you drugs. "Everyone\'s doing it," they say.',
    context: null,
    choices: [
      {
        text: 'Try it',
        tag: 'tried_drugs',
        outcome: 'You try it. The experience is disorienting. You hope it was a one-time thing.',
        effect: (p) => { p.m += 4; p.h -= 4; p.karma -= 3; p.addFlag('risky_behavior'); },
        inject: null,
      },
      {
        text: 'Politely decline',
        tag: null,
        outcome: 'You decline. Some people laugh, but you don\'t care.',
        effect: (p) => { p.karma += 3; },
        inject: null,
      },
      {
        text: 'Leave the party',
        tag: null,
        outcome: 'You leave early. Probably the right call.',
        effect: (p) => { p.m -= 2; p.karma += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ad_first_kiss',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 13 && G.stats.looks > 35,
    text: 'A classmate you\'ve had your eye on leans in close. The moment is electric.',
    context: null,
    choices: [
      {
        text: 'Go for it',
        tag: 'first_kiss',
        outcome: 'Your first kiss. Clumsy and perfect.',
        effect: (p) => { p.m += 10; p.s += 3; },
        inject: null,
      },
      {
        text: 'Pull back',
        tag: null,
        outcome: 'You hesitate. The moment passes. You\'ll wonder about it later.',
        effect: (p) => { p.m -= 3; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ad_school_sports_tryout',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 12 && G.age <= 16,
    text: 'Tryouts for the school sports team are being held. The coach tells you that you have potential.',
    context: null,
    choices: [
      {
        text: 'Try out',
        tag: 'school_athlete',
        outcome: 'You make the team. The early mornings are brutal but you love it.',
        effect: (p) => { p.h += 6; p.m += 5; p.s += 3; p.addFlag('school_athlete'); },
        inject: null,
      },
      {
        text: 'Skip it',
        tag: null,
        outcome: 'You pass on the tryouts. Other things take priority.',
        effect: (p) => { p.r += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ad_school_dance',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 18,
    text: 'The school is holding a formal dance. Someone has left a note in your locker asking you to go with them.',
    context: null,
    choices: [
      {
        text: 'Go with them',
        tag: null,
        outcome: 'A night you won\'t forget. Awkward and wonderful in equal measure.',
        effect: (p) => { p.m += 8; p.s += 4; },
        inject: null,
      },
      {
        text: 'Go alone',
        tag: null,
        outcome: 'You go solo. More fun than expected.',
        effect: (p) => { p.m += 4; p.s += 2; },
        inject: null,
      },
      {
        text: 'Stay home',
        tag: null,
        outcome: 'You give it a miss. FOMO sets in later when everyone talks about it.',
        effect: (p) => { p.r += 3; p.m -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ad_part_time_job',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && !G.career,
    text: 'A local shop is offering after-school shifts. The pay isn\'t much but it\'s something.',
    context: null,
    choices: [
      {
        text: 'Take the job',
        tag: 'first_job',
        outcome: 'You juggle school and work. Tiring, but the independence feels good.',
        effect: (p) => { p.mo += 1200; p.e -= 1; p.m += 3; p.s += 2; },
        inject: null,
      },
      {
        text: 'Focus on school',
        tag: null,
        outcome: 'You keep your schedule clear for studying.',
        effect: (p) => { p.e += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ad_social_media_drama',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13,
    text: 'Someone posts something unflattering about you online. It\'s spreading fast.',
    context: null,
    choices: [
      {
        text: 'Confront them publicly',
        tag: null,
        outcome: 'The drama escalates briefly, then dies down. People have short memories.',
        effect: (p) => { p.m -= 4; p.s += 2; p.karma -= 2; },
        inject: null,
      },
      {
        text: 'Ignore it',
        tag: null,
        outcome: 'You rise above it. The post fades into irrelevance.',
        effect: (p) => { p.m -= 3; p.karma += 3; },
        inject: null,
      },
      {
        text: 'Report it',
        tag: null,
        outcome: 'You report the post. It gets removed. Resolved quietly.',
        effect: (p) => { p.m += 1; p.karma += 1; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── YOUNG ADULT ─────────────────────────────────────────────────────────────
  {
    id: 'ya_university_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education.level === 'university' || G.flags.includes('scholarship_recipient') || G.flags.includes('determined_student'),
    text: 'University is disorienting and exhilarating. You meet people from everywhere and find your ideas challenged.',
    context: null,
    choices: [
      {
        text: 'Throw yourself into it — academically and socially',
        tag: 'university_thriving',
        outcome: 'You graduate changed, and with people who matter.',
        effect: (p) => { p.e += 10; p.s += 8; p.m += 5; p.addFlag('university_graduate'); p.makeFriend(70); p.makeFriend(65); },
        inject: null,
      },
      {
        text: 'Focus purely on grades',
        tag: 'academic',
        outcome: 'First class honors. A quieter social life.',
        effect: (p) => { p.e += 14; p.m -= 3; p.addFlag('university_graduate'); p.makeFriend(55); },
        inject: null,
      },
      {
        text: 'Struggle through and barely graduate',
        tag: null,
        outcome: 'The degree is real even if the experience was mostly survival.',
        effect: (p) => { p.e += 7; p.m -= 5; p.addFlag('university_graduate'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_work_friendship',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career && (G.friends ?? []).filter(f => f.alive).length < 3,
    text: 'A colleague at work has become more than just a coworker. You grab lunch together and talk about everything except work.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.makeFriend(68); },
  },
  {
    id: 'ya_first_job',
    phase: 'young_adult',
    weight: 4,
    when: (G) => !G.career,
    text: 'You need income. The options in front of you are not glamorous.',
    context: null,
    choices: [
      {
        text: 'Take any job — start earning',
        tag: 'practical',
        outcome: 'The work is humbling. The paycheck is real.',
        effect: (p) => { p.w += 6; p.m -= 2; },
        inject: null,
      },
      {
        text: 'Hold out for something in your field',
        tag: 'patient',
        outcome: 'The wait is longer than expected.',
        effect: (p) => { p.w -= 3; p.e += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_serious_relationship',
    phase: 'young_adult',
    weight: 4,
    when: (G) => !G.partner,
    text: 'You meet someone. This feels different from before — more serious, more frightening.',
    context: null,
    choices: [
      {
        text: 'Commit fully',
        tag: 'devoted',
        outcome: 'A real relationship begins.',
        effect: (p) => { p.m += 7; p.s += 5; p.addFlag('in_relationship'); p.makePartner(); },
        inject: {
          id: 'ya_relationship_test',
          phase: 'midlife',
          weight: 4,
          text: 'The relationship has been tested. There have been years of closeness and years of friction.',
          choices: [
            {
              text: 'Work through it together',
              tag: 'strong_marriage',
              outcome: 'You come out closer for having survived it.',
              effect: (p) => { p.m += 6; p.s += 4; p.addFlag('strong_marriage'); },
              inject: null,
            },
            {
              text: 'Let it end',
              tag: 'divorced',
              outcome: 'The end is quiet and painful in equal measure.',
              effect: (p) => { p.m -= 8; p.r += 6; p.clearPartner(); p.addFlag('divorced'); },
              inject: null,
            },
          ],
          effect: null,
          when: (G) => G.flags.includes('in_relationship'),
        },
      },
      {
        text: 'Keep it casual',
        tag: null,
        outcome: 'The connection fades. You move on.',
        effect: (p) => { p.m += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_political_awakening',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.stats.smarts >= 50,
    text: 'Something is happening politically in your country. You feel the pull to act.',
    context: null,
    choices: [
      {
        text: 'Join the movement',
        tag: 'activist',
        outcome: 'You stand for something. The cost is uncertain.',
        effect: (p) => { p.m += 5; p.s += 4; p.addFlag('activist'); },
        inject: {
          id: 'ya_activism_consequence',
          phase: 'midlife',
          weight: 3,
          text: 'Your activism years ago is now part of your record. Someone important has seen it.',
          choices: [
            {
              text: 'Stand by what you did',
              tag: 'committed_activist',
              outcome: "You don't apologize for it.",
              effect: (p) => { p.m += 5; p.s += 2; p.addFlag('committed_activist'); },
              inject: null,
            },
            {
              text: 'Distance yourself from it',
              tag: 'compromised',
              outcome: 'You reframe your past for an audience.',
              effect: (p) => { p.w += 4; p.m -= 5; p.r += 5; p.addFlag('compromised'); },
              inject: null,
            },
          ],
          effect: null,
          when: (G) => G.flags.includes('activist'),
        },
      },
      {
        text: 'Observe from a distance',
        tag: null,
        outcome: 'You watch history happening to other people.',
        effect: (p) => { p.m -= 2; p.r += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_first_child',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.partner !== null,
    text: 'A child arrives. Nothing about the world is the same after.',
    context: null,
    choices: [
      {
        text: 'Embrace parenthood fully',
        tag: 'devoted_parent',
        outcome: 'Your priorities rearrange permanently.',
        effect: (p) => { p.m += 4; p.s += 5; p.w -= 5; p.addFlag('parent'); },
        inject: null,
      },
      {
        text: 'Struggle to adapt',
        tag: 'reluctant_parent',
        outcome: 'The love is real, but the fit is difficult.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('parent'); p.addFlag('reluctant_parent'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_entrepreneurship',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.stats.charisma >= 60 && G.stats.wealth > 30,
    text: 'You have an idea. It might be a business. It might be a mistake.',
    context: null,
    choices: [
      {
        text: 'Go all in',
        tag: 'entrepreneur',
        outcome: 'The first year nearly breaks you.',
        effect: (p) => {
          const roll = Math.random()
          if (roll < 0.4) { p.w += 12; p.m += 5; p.addFlag('entrepreneur'); }
          else if (roll < 0.7) { p.w -= 8; p.m -= 6; p.addFlag('entrepreneur'); }
          else { p.w -= 15; p.m -= 10; p.r += 8; }
        },
        inject: null,
      },
      {
        text: 'Keep it as a side project',
        tag: null,
        outcome: 'It never quite gets off the ground.',
        effect: (p) => { p.m -= 2; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_emigration',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.flags.includes('emigrated') && ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype),
    text: 'A visa comes through. A country far from here will take you.',
    context: null,
    choices: [
      {
        text: 'Go',
        tag: 'emigrant',
        outcome: 'You board the plane. Everything familiar shrinks below you.',
        effect: (p) => { p.e += 6; p.m -= 8; p.s -= 6; p.w += 5; p.addFlag('emigrated'); p.setResidency('work_visa'); },
        inject: null,
      },
      {
        text: 'Stay — your family is here',
        tag: 'rooted',
        outcome: 'The visa expires unused.',
        effect: (p) => { p.s += 5; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_mental_health_crisis',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.stats.happiness < 45,
    text: "Something caves in. You recognize something is wrong but don't have a name for it.",
    context: null,
    choices: [
      {
        text: 'Seek professional help',
        tag: 'self_aware',
        outcome: 'The work is slow. Something begins to lift.',
        effect: (p) => { p.m += 10; p.w -= 3; p.addFlag('therapy_veteran'); },
        inject: null,
      },
      {
        text: 'Push through alone',
        tag: null,
        outcome: 'You manage. The underlying issue does not resolve.',
        effect: (p) => { p.m -= 5; p.h -= 3; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_graduate_study',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('university_graduate') && G.stats.smarts >= 60,
    text: 'A graduate program accepts you. Another two years. Another debt.',
    context: null,
    choices: [
      {
        text: 'Accept',
        tag: 'scholar',
        outcome: 'The specialization changes what you can do.',
        effect: (p) => { p.e += 10; p.w -= 5; p.setEducation('graduate', null); },
        inject: null,
      },
      {
        text: 'Decline — start earning',
        tag: 'practical',
        outcome: 'A different kind of education begins.',
        effect: (p) => { p.w += 4; p.m += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_post_soviet_corruption',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.country.archetype === 'post_soviet',
    text: 'Someone wants a favor. They have money and connections. In return, they just need you to sign something.',
    context: null,
    choices: [
      {
        text: 'Sign it',
        tag: 'compromised',
        outcome: "Easy money. A door you can't unopen.",
        effect: (p) => { p.w += 8; p.m -= 5; p.addFlag('compromised'); },
        inject: null,
      },
      {
        text: 'Refuse',
        tag: 'integrity',
        outcome: 'They give you a look that you remember for years.',
        effect: (p) => { p.m += 5; p.w -= 3; p.addFlag('integrity'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_wealthy_inheritance',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.wealthTier >= 4,
    text: 'A relative dies and leaves you something substantial. The family disagrees about what to do with it.',
    context: null,
    choices: [
      {
        text: 'Invest it prudently',
        tag: 'responsible',
        outcome: 'The money grows.',
        effect: (p) => { p.w += 15; p.mo += 80000; },
        inject: null,
      },
      {
        text: 'Spend it on what you actually want',
        tag: 'hedonist',
        outcome: 'You live well for a year.',
        effect: (p) => { p.m += 6; p.s += 5; p.mo += 30000; p.w -= 5; },
        inject: null,
      },
      {
        text: 'Give most of it away',
        tag: 'generous',
        outcome: 'The act defines something in you.',
        effect: (p) => { p.m += 8; p.s += 7; p.mo += 10000; p.karma += 8; p.addFlag('generous'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_first_gen_graduate',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('university_graduate') && G.character.wealthTier <= 2,
    text: 'You are the first in your family to finish a university degree. The graduation ceremony is strange — joy and strangeness mixed.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 8; p.s += 5; p.addFlag('first_gen_graduate'); },
  },
  {
    id: 'ya_military_service',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.stats.health >= 50 && !G.flags.includes('refugee'),
    text: 'Military service — required or voluntary — is in front of you.',
    context: null,
    choices: [
      {
        text: 'Serve willingly',
        tag: 'soldier',
        outcome: 'The discipline shapes you in ways you did not expect.',
        effect: (p) => { p.h += 6; p.m -= 3; p.s += 4; p.setCareer('soldier'); },
        inject: null,
      },
      {
        text: 'Find a way out of it',
        tag: null,
        outcome: 'You navigate around it. Others go in your place.',
        effect: (p) => { p.m -= 4; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_conflict_zone_work',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.country.archetype === 'conflict_zone',
    text: 'Work in a conflict zone means operating around checkpoints, bribes, and disappearances. Every day is a calculation.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 4; p.w += 5; p.addFlag('conflict_zone_survivor'); },
  },

  {
    id: 'ya_student_debt',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('university_graduate') && G.character.wealthTier <= 3,
    text: 'The student loan statement arrives. The number is larger than you expected it to be.',
    context: null,
    choices: [
      {
        text: 'Begin repaying aggressively',
        tag: 'financially_responsible',
        outcome: 'The debt shrinks. So does your spending money.',
        effect: (p) => { p.mo -= 8000; p.m -= 3; p.w += 3; },
        inject: null,
      },
      {
        text: 'Make minimum payments for now',
        tag: null,
        outcome: 'The debt persists. The interest compounds quietly.',
        effect: (p) => { p.mo -= 1200; p.m += 1; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_sibling_in_trouble',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0,
    text: 'A sibling reaches out. They are in financial trouble and need your help.',
    context: null,
    choices: [
      {
        text: 'Help them — family comes first',
        tag: 'generous',
        outcome: 'They are grateful. Whether they repay you is another matter.',
        effect: (p) => { p.mo -= 3000; p.m += 5; p.s += 3; p.addFlag('generous'); },
        inject: null,
      },
      {
        text: 'Offer emotional support but not money',
        tag: null,
        outcome: 'You give what you can. It helps less than either of you hoped.',
        effect: (p) => { p.m += 2; p.s += 1; },
        inject: null,
      },
      {
        text: 'You can\'t help right now',
        tag: null,
        outcome: 'They understand, or say they do.',
        effect: (p) => { p.m -= 4; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ya_pet_adoption',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.pets || G.pets.length === 0,
    text: 'A friend has a litter of puppies they need to rehome. One of them looks at you with completely unreasonable expectation.',
    context: null,
    choices: [
      {
        text: 'Take the puppy home',
        tag: 'pet_owner',
        outcome: 'Your life immediately acquires a new center of gravity.',
        effect: (p) => { p.m += 8; p.h += 2; p.mo -= 500; p.addFlag('pet_owner'); },
        inject: null,
      },
      {
        text: 'Not the right time',
        tag: null,
        outcome: 'Someone else gives it a good home.',
        effect: (p) => { p.m -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── MIDLIFE ─────────────────────────────────────────────────────────────────
  {
    id: 'mid_career_peak',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career !== null && G.career.level >= 2,
    text: 'You are at the height of what you have built professionally. The title is real. So is the pressure.',
    context: null,
    choices: [
      {
        text: 'Push further',
        tag: 'ambitious',
        outcome: 'The achievement comes at personal cost.',
        effect: (p) => { p.w += 10; p.h -= 5; p.m -= 6; },
        inject: null,
      },
      {
        text: 'Protect what you have',
        tag: 'content',
        outcome: 'You stop running. It feels like relief and defeat in equal parts.',
        effect: (p) => { p.m += 4; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_parent_death',
    phase: 'midlife',
    weight: 4,
    when: (G) => (G.parents?.father?.alive || G.parents?.mother?.alive) && !G.mem?.mid_parent_died,
    text: 'A parent dies. The grief comes in waves and is never quite finished.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('bereaved'); p.killParent(Math.random() < 0.5 ? 'father' : 'mother'); p.setMem('mid_parent_died', true); },
  },
  {
    id: 'mid_health_scare',
    phase: 'midlife',
    weight: 3,
    when: () => true,
    text: 'A test comes back with something that needs attention. The doctor speaks carefully.',
    context: null,
    choices: [
      {
        text: 'Take it seriously — change your life',
        tag: 'health_conscious',
        outcome: 'The habits you build in the next year become permanent.',
        effect: (p) => { p.h += 8; p.m -= 4; p.addFlag('health_conscious'); },
        inject: null,
      },
      {
        text: 'Deal with it and move on',
        tag: null,
        outcome: 'Managed, but not resolved.',
        effect: (p) => { p.h += 3; p.m -= 3; },
        inject: null,
      },
      {
        text: "Ignore it — you don't have time for this",
        tag: 'denial',
        outcome: 'The problem grows at its own pace.',
        effect: (p) => { p.h -= 10; p.r += 5; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_midlife_crisis',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.regret > 30,
    text: 'At forty-something, you look at the life you have built and feel a strange distance from it.',
    context: null,
    choices: [
      {
        text: 'Make drastic changes',
        tag: 'restless',
        outcome: 'Some of the changes work. Some don\'t.',
        effect: (p) => {
          const roll = Math.random()
          if (roll < 0.5) { p.m += 8; p.r -= 5; }
          else { p.m -= 5; p.r += 3; p.w -= 5; }
        },
        inject: null,
      },
      {
        text: 'Accept and reframe',
        tag: 'acceptance',
        outcome: 'The acceptance is genuine, not resigned.',
        effect: (p) => { p.m += 10; p.r -= 8; p.addFlag('acceptance'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_children_leave',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.children.length > 0,
    text: 'Your children leave home. The house rearranges itself around their absence.',
    context: null,
    choices: [
      {
        text: 'Find new purpose',
        tag: 'adaptive',
        outcome: 'You discover something about yourself you had forgotten.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('found_meaning'); },
        inject: null,
      },
      {
        text: 'Struggle with the emptiness',
        tag: null,
        outcome: 'The quiet takes some getting used to.',
        effect: (p) => { p.m -= 5; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_redundancy',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career !== null,
    text: 'The company restructures. Your role is eliminated. The language used is careful and inhuman.',
    context: null,
    choices: [
      {
        text: 'Treat it as an opportunity to change direction',
        tag: 'resilient',
        outcome: 'The change takes time to stop feeling like failure.',
        effect: (p) => { p.w -= 8; p.m -= 4; p.mo -= 5000; p.clearCareer(); p.addFlag('laid_off'); p.addFlag('career_change'); },
        inject: null,
      },
      {
        text: 'Fight it legally',
        tag: 'fighter',
        outcome: 'The settlement is modest. The principle was the point.',
        effect: (p) => { p.w -= 4; p.m -= 5; p.mo -= 8000; p.s += 2; p.clearCareer(); p.addFlag('laid_off'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_affair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner !== null,
    text: "Something starts that shouldn't. You know it while it's happening.",
    context: null,
    choices: [
      {
        text: 'End it before it goes further',
        tag: 'principled',
        outcome: 'The guilt stays but the damage is contained.',
        effect: (p) => { p.m -= 4; p.r += 4; },
        inject: null,
      },
      {
        text: 'Continue',
        tag: 'unfaithful',
        outcome: 'The relationship becomes a second life, fragile and exhausting.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('unfaithful'); },
        inject: {
          id: 'mid_affair_discovery',
          phase: 'midlife',
          weight: 4,
          text: 'Your partner finds out.',
          choices: [
            {
              text: 'Fight to save the relationship',
              tag: 'repentant',
              outcome: 'The repair is slow, incomplete, and genuine.',
              effect: (p) => { p.m -= 6; p.s -= 4; p.r += 5; },
              inject: null,
            },
            {
              text: 'Let the marriage end',
              tag: 'divorced',
              outcome: 'The silence after is enormous.',
              effect: (p) => { p.m -= 10; p.r += 8; p.clearPartner(); p.addFlag('divorced'); },
              inject: null,
            },
          ],
          effect: null,
          when: (G) => G.flags.includes('unfaithful'),
        },
      },
    ],
    effect: null,
  },
  {
    id: 'mid_community_leader',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.stats.charisma > 50,
    text: 'People in your community start looking to you for leadership. It was not something you sought.',
    context: null,
    choices: [
      {
        text: 'Accept the responsibility',
        tag: 'community_leader',
        outcome: 'Your world expands. So does your sense of obligation.',
        effect: (p) => { p.s += 8; p.m += 4; p.addFlag('community_leader'); },
        inject: null,
      },
      {
        text: 'Decline',
        tag: null,
        outcome: 'You protect your privacy.',
        effect: (p) => { p.m += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_caring_for_parent',
    phase: 'midlife',
    weight: 3,
    when: () => true,
    text: 'Your surviving parent can no longer care for themselves. The responsibility falls on you.',
    context: null,
    choices: [
      {
        text: 'Care for them yourself',
        tag: 'caretaker',
        outcome: 'Years of your life reshape around their needs.',
        effect: (p) => { p.m -= 5; p.s += 5; p.w -= 4; p.r += 4; p.addFlag('caretaker'); },
        inject: null,
      },
      {
        text: 'Arrange professional care',
        tag: null,
        outcome: 'The guilt visits you at night.',
        effect: (p) => { p.w -= 8; p.m -= 3; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_corruption_opportunity',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career !== null && G.career.level >= 2 && ['post_soviet', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype),
    text: 'A figure from the government approaches you. What they are offering is real. What they want in return is also real.',
    context: null,
    choices: [
      {
        text: 'Take the deal',
        tag: 'corruption_exposed',
        outcome: 'The money is real. So is what you become.',
        effect: (p) => { p.w += 15; p.m -= 10; p.addFlag('corruption_exposed'); p.addFlag('compromised'); },
        inject: null,
      },
      {
        text: 'Refuse — publicly',
        tag: 'whistleblower',
        outcome: 'The retaliation is swift and you expected it.',
        effect: (p) => { p.m += 5; p.w -= 10; p.s += 5; p.addFlag('whistleblower'); },
        inject: null,
      },
      {
        text: 'Refuse — quietly',
        tag: 'integrity',
        outcome: 'You stay clean. They move on to someone else.',
        effect: (p) => { p.m += 4; p.addFlag('integrity'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_grief_friendship',
    phase: 'midlife',
    weight: 2,
    when: () => true,
    text: 'A close friend dies unexpectedly. The grief is different from losing a parent — more disorienting, somehow.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 9; p.r += 5; p.addFlag('bereaved'); },
  },

  {
    id: 'mid_sibling_milestone',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0,
    text: 'Your sibling calls with big news — a marriage, a child, a move abroad. The years between you have made you strangers in some ways.',
    context: null,
    choices: [
      {
        text: 'Celebrate and stay connected',
        tag: null,
        outcome: 'The bond holds across the distance.',
        effect: (p) => { p.m += 5; p.s += 3; },
        inject: null,
      },
      {
        text: 'Respond briefly — you\'ve grown apart',
        tag: null,
        outcome: 'The conversation is short and polite.',
        effect: (p) => { p.m -= 2; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_sibling_feud',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.regret > 15,
    text: 'A long-running disagreement with a sibling has come to a head. Years of small resentments have built into something larger.',
    context: null,
    choices: [
      {
        text: 'Try to resolve it',
        tag: null,
        outcome: 'Some things clear. Others remain.',
        effect: (p) => { p.m += 4; p.r -= 5; p.s += 2; },
        inject: null,
      },
      {
        text: 'Cut contact for now',
        tag: null,
        outcome: 'The silence is a relief and a loss in equal measure.',
        effect: (p) => { p.m -= 4; p.r += 5; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'mid_first_property',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.money > 30000 && (!G.assets || G.assets.properties.length === 0),
    text: 'You have enough saved for a deposit. The property market is what it always is — absurd and unavoidable.',
    context: null,
    choices: [
      {
        text: 'Buy — get on the ladder',
        tag: 'homeowner',
        outcome: 'Yours, mostly. The bank has opinions about the rest.',
        effect: (p) => { p.mo -= 25000; p.m += 8; p.w += 5; p.addFlag('homeowner'); },
        inject: null,
      },
      {
        text: 'Keep renting for now',
        tag: null,
        outcome: 'Flexibility at a cost.',
        effect: (p) => { p.m += 1; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── LATE LIFE ───────────────────────────────────────────────────────────────
  {
    id: 'late_retirement',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.career !== null,
    text: 'The working life ends. The last day comes and goes with less ceremony than expected.',
    context: null,
    choices: [
      {
        text: 'Embrace retirement',
        tag: 'retired',
        outcome: 'Time opens up in ways you had forgotten were possible.',
        effect: (p) => { p.m += 7; p.h += 3; p.clearCareer(); p.addFlag('retired'); },
        inject: null,
      },
      {
        text: "Keep working — you're not ready to stop",
        tag: null,
        outcome: 'The purpose that work provides is real.',
        effect: (p) => { p.m += 4; p.w += 4; p.h -= 3; p.addFlag('working_past_retirement'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_grandchildren',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.children.length > 0,
    text: 'Grandchildren arrive. They fill spaces in you that you did not know were empty.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 10; p.s += 7; p.addFlag('grandparent'); },
  },
  {
    id: 'late_reconciliation',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.regret > 25 && G.children.length > 0,
    text: 'A child you lost contact with reaches out. There is distance between you that time made larger.',
    context: null,
    choices: [
      {
        text: 'Reach back — try to repair it',
        tag: 'reconciled_with_child',
        outcome: 'The reunion is awkward and essential.',
        effect: (p) => { p.m += 10; p.r -= 8; p.addFlag('reconciled_with_child'); },
        inject: null,
      },
      {
        text: "Leave it — some things can't be fixed",
        tag: null,
        outcome: 'The regret calcifies.',
        effect: (p) => { p.r += 8; p.m -= 5; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_legacy',
    phase: 'late_life',
    weight: 2,
    when: () => true,
    text: 'You think about what you leave behind. The question has an answer, though you are not sure you like all of it.',
    context: null,
    choices: [
      {
        text: 'Write something down — a letter, a memoir',
        tag: 'reflective',
        outcome: 'The act of writing clarifies what mattered.',
        effect: (p) => { p.m += 5; p.r -= 5; p.addFlag('found_meaning'); },
        inject: null,
      },
      {
        text: 'Let the life speak for itself',
        tag: 'quiet',
        outcome: 'You are at peace with what was done and not done.',
        effect: (p) => { p.m += 4; p.addFlag('acceptance'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_wisdom',
    phase: 'late_life',
    weight: 3,
    when: () => true,
    text: 'People come to you for advice. You have become, without noticing it, an elder.',
    context: null,
    choices: null,
    effect: (p) => { p.s += 5; p.m += 6; p.addFlag('trusted_person'); },
  },
  {
    id: 'late_religion_comfort',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('devout') || G.flags.includes('bereaved'),
    text: 'Faith has become something different — less about rules and more about comfort in the face of time.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 7; p.r -= 4; p.addFlag('found_meaning'); },
  },
  {
    id: 'late_migration_return',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.includes('emigrated'),
    text: 'You think about going back. The country you left is different now. So are you.',
    context: null,
    choices: [
      {
        text: 'Return home',
        tag: 'returned_home',
        outcome: 'It is not what you remembered, but some things are exactly right.',
        effect: (p) => { p.m += 5; p.s += 5; p.r -= 4; },
        inject: null,
      },
      {
        text: 'Stay where you built your life',
        tag: null,
        outcome: 'Home became here, somewhere along the way.',
        effect: (p) => { p.m += 3; p.r += 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_subsaharan_family_support',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.stats.wealth > 50,
    text: 'Extended family members come seeking support. You have more than most and they know it.',
    context: null,
    choices: [
      {
        text: "Give generously — it's what you do here",
        tag: 'generous',
        outcome: 'Your generosity is real and burdensome and right.',
        effect: (p) => { p.w -= 8; p.s += 8; p.addFlag('generous'); },
        inject: null,
      },
      {
        text: 'Set limits',
        tag: null,
        outcome: 'Some are understanding. Others are not.',
        effect: (p) => { p.w -= 3; p.s -= 4; p.m -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_war_veteran_recognition',
    phase: 'late_life',
    weight: 1,
    when: (G) => G.flags.includes('child_soldier') || G.career?.field === 'military',
    text: 'A ceremony is held. A government representative shakes your hand and says the right words.',
    context: null,
    choices: [
      {
        text: 'Accept the recognition',
        tag: 'recognized',
        outcome: 'The acknowledgment is something.',
        effect: (p) => { p.m += 5; p.s += 3; },
        inject: null,
      },
      {
        text: "Decline — the ceremony means nothing to you",
        tag: null,
        outcome: "You don't need the state to tell you what you did.",
        effect: (p) => { p.m += 3; p.addFlag('principled'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_regret_confronted',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.regret > 50,
    text: 'Late at night, the things left undone visit you with unusual clarity.',
    context: null,
    choices: [
      {
        text: 'Confront them honestly',
        tag: 'reflective',
        outcome: 'Understanding is not absolution, but it is something.',
        effect: (p) => { p.m += 5; p.r -= 10; p.addFlag('acceptance'); },
        inject: null,
      },
      {
        text: 'Push them away',
        tag: null,
        outcome: 'The nights remain restless.',
        effect: (p) => { p.m -= 4; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_estate_planning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && G.money > 10000,
    text: 'The lawyer asks: who gets what? The answer is harder than you expected.',
    context: null,
    choices: [
      {
        text: 'Leave everything to your children',
        tag: 'will_written',
        outcome: 'The paperwork is done. It is a kind of love letter.',
        effect: (p) => { p.m += 5; p.r -= 4; p.addFlag('will_written'); },
        inject: null,
      },
      {
        text: 'Split it between family and charity',
        tag: 'generous',
        outcome: 'Some will understand. Others won\'t.',
        effect: (p) => { p.m += 7; p.addFlag('will_written'); p.addFlag('generous'); },
        inject: null,
      },
      {
        text: 'Leave it for now — too morbid',
        tag: null,
        outcome: 'The decision waits for a better time that does not come.',
        effect: (p) => { p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'late_pet_death',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.pets && G.pets.some(p => p.alive),
    text: 'Your pet, a companion for many years, is visibly failing. The vet speaks gently about options.',
    context: null,
    choices: [
      {
        text: 'Make them comfortable at home',
        tag: null,
        outcome: 'They go quietly. The house is different without them.',
        effect: (p) => { p.m -= 10; p.r += 3; },
        inject: null,
      },
      {
        text: 'Choose euthanasia — end their suffering',
        tag: null,
        outcome: 'The kindness of it doesn\'t make it easier.',
        effect: (p) => { p.m -= 8; p.r += 2; p.mo -= 300; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── ADOLESCENCE (age 12-17) ──────────────────────────────────────────────────
  {
    id: 'ad_scholarship_chance',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 16 && (G.gpa ?? 0) >= 3.5 && G.stats.smarts >= 65,
    text: 'A letter arrives — a university scholarship programme has noticed your academic record.',
    choices: [
      { text: 'Apply for the scholarship', tag: 'scholarship_applied', outcome: 'You put together the application.', effect: (p) => { p.e += 3; p.m += 5; p.addFlag('scholarship_applied') }, inject: null },
      { text: "Ignore it — school isn't your priority", tag: null, outcome: 'The letter goes in the bin.', effect: (p) => { p.r += 4 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ad_first_job_teen',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.career,
    text: 'A neighbour offers you a part-time job helping at their business. The money is small but so is the expectation.',
    choices: [
      { text: 'Take the job', tag: 'first_job_teen', outcome: 'You learn the basics of earning.', effect: (p) => { p.mo += 800; p.s += 3; p.addFlag('first_job_teen'); p.setMem('hadTeenJob', true) }, inject: null },
      { text: 'Focus on school instead', tag: null, outcome: 'Your grades stay strong.', effect: (p) => { p.e += 4 }, inject: null },
    ],
    effect: null,
  },

  // ── YOUNG ADULT (age 18-29): events that reference past ─────────────────────
  {
    id: 'ya_uni_social_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education?.enrolled?.type === 'university' && (G.education.enrolled.year ?? 0) >= 1,
    text: 'University life offers a choice: the library or the party. Both are calling.',
    choices: [
      { text: 'Hit the books — the grades matter', tag: 'dedicated_student', outcome: 'GPA inches upward. Social life suffers a little.', effect: (p) => { p.e += 3; p.m -= 2; p.setMem('uniSocial', 'studious') }, inject: null },
      { text: 'Go to the party — this is also education', tag: null, outcome: 'You make connections. Your GPA takes a hit.', effect: (p) => { p.s += 5; p.m += 8; p.makeFriend(70); p.setMem('uniSocial', 'social') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_uni_exam_crisis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education?.enrolled?.type === 'university',
    text: 'Final exams arrive. You are underprepared. You have one night to close the gap.',
    choices: [
      { text: 'Pull an all-nighter', tag: null, outcome: 'You pass. Barely. The stress was real.', effect: (p) => { p.h -= 4; p.e += 4; p.m -= 3 }, inject: null },
      { text: 'Sleep and accept the result', tag: null, outcome: 'A mediocre grade. At least you are rested.', effect: (p) => { p.h += 2; p.m -= 5 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_uni_professor_mentor',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.education?.enrolled?.type === 'university' && G.stats.smarts >= 60,
    text: 'A professor takes notice of your work and offers to mentor you for a thesis project.',
    choices: [
      { text: 'Accept — the extra work is worth it', tag: null, outcome: 'You grow academically. The relationship opens doors.', effect: (p) => { p.e += 6; p.m += 3; p.addFlag('mentored') }, inject: null },
      { text: 'Decline — you need the time', tag: null, outcome: 'A missed opportunity, but you protect your bandwidth.', effect: (p) => { p.m += 2 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_trade_skills_challenge',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education?.enrolled?.type === 'vocational',
    text: 'A practical assessment at trade school reveals you have a real aptitude for this work.',
    choices: null,
    effect: (p) => { p.h += 3; p.m += 6; p.e += 4; p.addFlag('trade_aptitude') },
  },
  {
    id: 'ya_workforce_early_grind',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('workforce_direct') && G.age <= 22,
    text: "You are earning while your old classmates are still studying. The money is real. So is the gap you're starting to feel.",
    choices: [
      { text: 'Stay the course — experience beats theory', tag: 'self_made_mindset', outcome: 'You double down. The experience compounds.', effect: (p) => { p.mo += 1500; p.s += 3; p.addFlag('self_made_mindset') }, inject: null },
      { text: 'Enrol in evening classes', tag: null, outcome: 'You start adult education. Slow progress, real progress.', effect: (p) => { p.e += 4; p.m -= 2; p.addFlag('adult_learner') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_war_childhood_echo',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('war_childhood') || G.flags.includes('refugee'),
    text: "A news report brings it all back — the sounds, the faces, the feeling of the ground beneath your feet. You are safe now. The body doesn't always agree.",
    choices: [
      { text: 'Seek therapy', tag: null, outcome: 'You begin to put words to it.', effect: (p) => { p.m += 8; p.h += 3; p.r -= 5; p.mo -= 800 }, inject: null },
      { text: 'Push through it', tag: null, outcome: "You bury it. Not gone, just quieter.", effect: (p) => { p.r += 5; p.m -= 4 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_determined_student_pays_off',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('determined_student') && G.flags.includes('university_graduate'),
    text: 'A recruiter contacts you specifically — your academic record has made you visible in ways you didn\'t expect.',
    choices: null,
    effect: (p) => { p.m += 6; p.w += 4; p.mo += 3000 },
  },
  {
    id: 'ya_childhood_poverty_drive',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('poverty_childhood') && G.age >= 22,
    text: 'When you think about where you came from, it doesn\'t feel distant. It feels like fuel.',
    choices: [
      { text: 'Channel it into ambition', tag: 'driven', outcome: 'You work harder than anyone expects you to.', effect: (p) => { p.w += 5; p.addFlag('driven'); p.setMem('povertyFuel', true) }, inject: null },
      { text: 'Let it make you cautious', tag: null, outcome: 'Security matters more than ambition to you.', effect: (p) => { p.m += 3; p.r += 2 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_secure_childhood_pays_forward',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('secure_childhood') || G.flags.includes('secure_base'),
    text: 'You realise, in a quiet moment, that you started life with something many people never had: the feeling that things could be OK.',
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('emotionally_grounded') },
  },

  // ── MIDLIFE: references to past choices ──────────────────────────────────────
  {
    id: 'mid_class_reunion',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('graduated_hs') && G.age >= 35 && G.age <= 42,
    text: 'Word gets around about a high school reunion. Old faces, old measurements of worth.',
    choices: [
      { text: 'Go — embrace it', tag: null, outcome: 'Some people became who you expected. Others surprised you.', effect: (p) => { p.m += (p.w > 50 ? 6 : -3); p.s += 4; p.makeFriend(55) }, inject: null },
      { text: "Skip it — you've moved on", tag: null, outcome: "You don't go. A small relief and a small loss.", effect: (p) => { p.r += 3 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_education_regret',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('workforce_direct') && !G.flags.includes('adult_learner') && G.stats.happiness < 55 && G.age >= 35,
    text: 'A colleague gets promoted — their university degree was the deciding factor. The feeling is familiar. Unwelcome.',
    choices: [
      { text: 'Enrol in part-time adult education', tag: 'adult_learner', outcome: 'You start evening classes. It will take years but it matters.', effect: (p) => { p.m += 5; p.e += 4; p.mo -= 3000; p.addFlag('adult_learner') }, inject: null },
      { text: 'Accept it — your path is different', tag: null, outcome: 'You make peace with the route you took.', effect: (p) => { p.r += 5; p.m -= 3 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_childhood_trauma_resurface',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.flags.includes('war_childhood') || G.flags.includes('refugee') || G.flags.includes('anxious_child')) && G.age >= 38,
    text: "Something small — a smell, a sound, a fragment of news — pulls you back somewhere you thought you'd left behind.",
    choices: [
      { text: 'Talk to someone about it', tag: null, outcome: 'Therapy helps. Slowly.', effect: (p) => { p.m += 7; p.r -= 8; p.mo -= 1200 }, inject: null },
      { text: 'Sit with it', tag: null, outcome: 'You let it pass. The silt settles.', effect: (p) => { p.r += 3 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_first_gen_pride',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('first_gen_graduate') && G.children?.length > 0,
    text: 'Your child asks about university. You think about what it meant for you to be the first.',
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 5; p.addFlag('cared_for_parents') },
  },
  {
    id: 'mid_university_debt',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('university_graduate') && !G.flags.includes('scholarship_won') && G.age >= 30 && G.money < 15000,
    text: 'The student debt still follows you. A decade out and it still shapes decisions.',
    choices: [
      { text: 'Make a lump-sum payment', tag: null, outcome: 'You wipe a significant chunk. It stings but it\'s done.', effect: (p) => { p.mo -= 5000; p.m += 5 }, inject: null },
      { text: 'Keep paying minimum amounts', tag: null, outcome: 'The interest drags on.', effect: (p) => { p.r += 3 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_vocational_pride',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('vocational_trained') && G.age >= 35,
    text: 'A young person asks how you ended up in your trade. You think about the choice you made at 18.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 2; p.addFlag('mentor') },
  },

  // ── DARK EARLY CHILDHOOD ─────────────────────────────────────────────────────
  {
    id: 'ec_domestic_violence_witness',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.familyStability === 'unstable',
    text: 'The shouting wakes you up at night. You learn to make yourself small. The sound of things breaking becomes ordinary.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 4; p.r += 8; p.addFlag('witnessed_dv'); p.addFlag('anxious_child'); },
  },
  {
    id: 'ec_parental_abuse',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.familyStability === 'unstable' && G.character.wealthTier <= 1,
    text: 'Your parent hits you. Not once — it becomes the texture of your early years. You learn to read the room before anyone speaks.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 6; p.r += 10; p.addFlag('abused_child'); p.addFlag('guarded_heart'); },
  },
  {
    id: 'ec_alcoholic_parent',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling',
    text: 'One of your parents drinks. You understand what drunk looks like before you understand much else. The smell is particular. The unpredictability is worse.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('alcoholic_parent'); p.addFlag('anxious_child'); },
  },
  {
    id: 'ec_parental_abandonment',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.familyStability === 'unstable',
    text: 'One morning a parent is simply gone. No explanation reaches you. The absence leaves a shape in your life that nothing quite fills.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 12; p.addFlag('abandoned_by_parent'); p.addFlag('guarded_heart'); },
  },
  {
    id: 'ec_neglect',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.familyStability === 'unstable' && G.character.wealthTier <= 2,
    text: 'Some days there is no adult home. Some days there is no food. You learn to manage, long before you should have to.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 8; p.r += 7; p.addFlag('neglected_child'); },
  },
  {
    id: 'ec_drug_addicted_parent',
    phase: 'early_childhood',
    weight: 2,
    when: (G) => G.character.familyStability === 'unstable',
    text: 'Your parent disappears into something chemical. The person who returns from it is not quite the same person who left.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 8; p.addFlag('neglected_child'); p.addFlag('anxious_child'); },
  },

  // ── DARK CHILDHOOD ───────────────────────────────────────────────────────────
  {
    id: 'ch_abuse_continues',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.flags.includes('abused_child'),
    text: 'It continues. You develop strategies — silence, invisibility, reading moods. You become very good at not being noticed.',
    choices: [
      { text: 'Tell a teacher', tag: null, outcome: 'A teacher reports it. The system moves slowly. It gets worse before it gets better.', effect: (p) => { p.m -= 5; p.r += 3; p.addFlag('told_an_adult') }, inject: null },
      { text: 'Say nothing — it would only make things worse', tag: null, outcome: 'You keep it inside. The weight is real.', effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('learned_silence') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ch_carer_role',
    phase: 'childhood',
    weight: 3,
    when: (G) => (G.flags.includes('alcoholic_parent') || G.flags.includes('neglected_child')) && G.character.familySize >= 2,
    text: 'You become the adult in the house. Making sure younger siblings eat. Making sure the bills get noticed. You grow up fast.',
    choices: null,
    effect: (p) => { p.m -= 6; p.s += 4; p.r += 5; p.addFlag('parentified_child'); },
  },
  {
    id: 'ch_foster_care',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.flags.includes('abused_child') || G.flags.includes('abandoned_by_parent'),
    text: 'Child protective services intervenes. You are placed with a foster family. The house is safe. It does not feel like home.',
    choices: [
      { text: 'Try to settle in', tag: null, outcome: 'A tentative stability. Not family, but not nothing.', effect: (p) => { p.m += 4; p.addFlag('foster_care') }, inject: null },
      { text: 'Run away', tag: null, outcome: 'The streets offer a different kind of danger.', effect: (p) => { p.m -= 8; p.h -= 5; p.addFlag('runaway'); p.addFlag('left_school_early') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ch_substance_exposure',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 10 && (G.flags.includes('neglected_child') || G.flags.includes('gang_past') || G.character.wealthTier <= 1),
    text: 'Older kids in the neighbourhood offer you something. You are ten, maybe eleven. You are curious and you want to belong.',
    choices: [
      { text: 'Try it', tag: null, outcome: 'A small crossing of a line. Not the last.', effect: (p) => { p.m += 3; p.h -= 3; p.addFlag('early_substance_exposure') }, inject: null },
      { text: 'Walk away', tag: null, outcome: 'You say no. It costs you something socially.', effect: (p) => { p.s -= 2; p.addFlag('resisted_peer_pressure') }, inject: null },
    ],
    effect: null,
  },

  // ── DARK ADOLESCENCE ─────────────────────────────────────────────────────────
  {
    id: 'ad_substance_spiral',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 14 && (G.flags.includes('early_substance_exposure') || G.flags.includes('abused_child') || G.flags.includes('neglected_child')),
    text: 'The substance becomes a regular thing. It smooths out the rough edges. You like who you are when you use it.',
    choices: [
      { text: 'Keep using — it helps', tag: 'drug_user', outcome: 'The relief is real. So is the cost.', effect: (p) => { p.m += 5; p.h -= 6; p.addFlag('drug_user'); p.addFlag('substance_abuser') }, inject: null },
      { text: 'Stop now, before it gets worse', tag: null, outcome: 'You pull back. It takes willpower you didn\'t know you had.', effect: (p) => { p.m -= 3; p.addFlag('resisted_addiction') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ad_running_away',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && (G.flags.includes('abused_child') || G.flags.includes('witnessed_dv')),
    text: 'You cannot take it anymore. You pack a bag in the middle of the night.',
    choices: [
      { text: 'Run — anywhere is better than here', tag: 'runaway', outcome: 'The street is dangerous but it is yours.', effect: (p) => { p.m -= 4; p.h -= 8; p.addFlag('runaway'); p.addFlag('left_school_early') }, inject: null },
      { text: 'Stay — you have siblings who need you', tag: null, outcome: 'You stay. The weight is immense.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('parentified_child') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ad_first_drink',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.flags.includes('heavy_drinker'),
    text: 'Someone brings alcohol to the gathering. The social pressure is gentle. The relief, you discover, is immediate.',
    choices: [
      { text: 'Drink with everyone', tag: null, outcome: 'You fit in. The anxiety quiets, briefly.', effect: (p) => { p.m += 5; p.s += 3; p.h -= 3; p.addFlag('early_drinker') }, inject: null },
      { text: 'Skip it', tag: null, outcome: 'You are present without the crutch.', effect: (p) => { p.s -= 1 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ad_alcoholic_parent_escalation',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.flags.includes('alcoholic_parent') && G.age >= 13,
    text: 'Your parent\'s drinking gets worse. You find yourself covering for them. Making excuses. Pouring things down the drain.',
    choices: [
      { text: 'Confront them', tag: null, outcome: 'The conversation goes badly. Then, unexpectedly, something shifts.', effect: (p) => { p.m -= 6; p.r += 3; p.karma += 5 }, inject: null },
      { text: 'Manage around it — it\'s what you\'ve always done', tag: null, outcome: 'You become expert at a skill you never wanted.', effect: (p) => { p.m -= 8; p.r += 5; p.s += 2 }, inject: null },
    ],
    effect: null,
  },

  // ── DARK YOUNG ADULT ─────────────────────────────────────────────────────────
  {
    id: 'ya_overdose_scare',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('drug_addiction') || G.flags.includes('substance_abuser'),
    text: 'You take too much. Someone finds you. You wake up in a hospital bed with a nurse watching you carefully.',
    choices: [
      { text: 'Get help — this is a turning point', tag: null, outcome: 'You enter treatment. It is the hardest thing you have done.', effect: (p) => { p.m += 8; p.h -= 10; p.addFlag('in_recovery'); p.mo -= 5000 }, inject: null },
      { text: 'Discharge yourself — you\'re fine', tag: null, outcome: 'You sign the forms and walk out. The problem follows you.', effect: (p) => { p.h -= 15; p.r += 10 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_dui_event',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('heavy_drinker') || G.flags.includes('early_drinker')) && G.flags.includes('has_licence') && G.age >= 18,
    text: 'You drive home from a party. The lights in the mirror are the blue-and-red kind.',
    choices: [
      { text: 'Pull over and cooperate', tag: null, outcome: 'Arrested. Fine, possible suspension. A wake-up call.', effect: (p) => { p.m -= 10; p.mo -= 3000; p.addFlag('reckless'); p.addFlag('criminal_record') }, inject: null },
      { text: 'Try to evade', tag: null, outcome: 'The chase ends badly.', effect: (p) => { p.m -= 18; p.h -= 10; p.mo -= 8000; p.addFlag('reckless'); p.addFlag('criminal_record') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_abuser_cycle',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('abused_child') && G.partner && G.age >= 20,
    text: 'You hear yourself saying something you recognize. The tone, the escalation. You are becoming something you swore you would not.',
    choices: [
      { text: 'Stop. Get help. Break the cycle.', tag: null, outcome: 'You enter counselling. The work is uncomfortable and necessary.', effect: (p) => { p.m += 5; p.r -= 8; p.mo -= 1500; p.addFlag('cycle_broken') }, inject: null },
      { text: 'It\'s not that bad. You\'re stressed.', tag: 'abuser', outcome: 'The pattern deepens.', effect: (p) => { p.r += 12; p.m -= 6; p.addFlag('abuser') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_alcohol_dependency',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('early_drinker') && G.age >= 20 && !G.flags.includes('alcohol_addiction'),
    text: 'You notice that a day without drinking feels wrong. Not just habit — something physical. Something that speaks louder than choice.',
    choices: [
      { text: 'Seek help before it gets worse', tag: null, outcome: 'A doctor. A plan. It is not too late.', effect: (p) => { p.m += 3; p.h += 4; p.mo -= 800 }, inject: null },
      { text: 'Manage it yourself — it\'s under control', tag: 'alcohol_addiction', outcome: 'It is not under control.', effect: (p) => { p.h -= 8; p.addFlag('alcohol_addiction'); p.addFlag('heavy_drinker') }, inject: null },
    ],
    effect: null,
  },

  // ── MIDLIFE DARK ─────────────────────────────────────────────────────────────
  {
    id: 'mid_addiction_job_loss',
    phase: 'midlife',
    weight: 3,
    when: (G) => (G.flags.includes('alcohol_addiction') || G.flags.includes('drug_addiction')) && G.career,
    text: 'Your employer calls you in. The performance issues. The absences. The smell. You know where this is going.',
    choices: [
      { text: 'Come clean and ask for support', tag: null, outcome: 'Some employers help. Yours is one of them, barely.', effect: (p) => { p.m -= 8; p.addFlag('in_recovery') }, inject: null },
      { text: 'Deny everything', tag: null, outcome: 'You are let go anyway.', effect: (p) => { p.m -= 15; p.r += 8 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_abuser_consequence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('abuser') && G.partner,
    text: 'Your partner calls the police. You did not think they would.',
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 15; p.s -= 15; p.addFlag('abusive_relationship'); p.clearPartner(); },
  },
  {
    id: 'mid_recovery_story',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('in_recovery') && G.age >= 35,
    text: 'Someone asks how you got sober. You think about the hospital bed, the faces of people who did not give up on you.',
    choices: [
      { text: 'Share the story honestly', tag: null, outcome: 'It costs you vulnerability. It gives someone else hope.', effect: (p) => { p.m += 8; p.s += 4; p.karma += 5; p.addFlag('emotionally_honest') }, inject: null },
      { text: 'Keep it private', tag: null, outcome: 'Some things stay yours.', effect: (p) => { p.m += 3 }, inject: null },
    ],
    effect: null,
  },

  // ── GRIEF ARC ─────────────────────────────────────────────────────────────
  {
    id: 'parent_death_young',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.flags.includes('orphan') && Math.random() < 0.08,
    text: 'Your parent dies. The circumstances vary — illness, accident, violence — but the fact is the same. The person who was supposed to be there is not.',
    choices: null,
    effect: (p) => { p.m -= 20; p.h -= 8; p.r += 10; p.addFlag('orphan'); p.addFlag('early_grief'); p.setMem('parentDied', true) },
  },
  {
    id: 'parent_death_adult',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.age >= 22 && G.age <= 35 && !G.flags.includes('orphan') && !G.mem.parentDied && Math.random() < 0.07,
    text: 'You get the call. Your parent is gone. You knew it would happen someday. It still feels like the floor has dropped away.',
    choices: [
      { text: 'Take time to grieve properly', tag: null, outcome: 'You take leave. You allow yourself to feel it.', effect: (p) => { p.m -= 15; p.r += 6; p.addFlag('processed_grief') }, inject: null },
      { text: 'Keep working, keep moving', tag: null, outcome: 'Grief waits. It finds you later, in stranger moments.', effect: (p) => { p.m -= 8; p.r += 12; p.h -= 4 }, inject: null },
    ],
    effect: (p) => { p.setMem('parentDied', true) },
  },
  {
    id: 'grief_anniversary',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.mem.parentDied && G.age >= 30 && !G.flags.includes('found_meaning'),
    text: 'The anniversary of their death arrives quietly. You find yourself doing something they used to do — a gesture, a recipe, a phrase — and for a moment they are not gone.',
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('found_meaning') },
  },
  {
    id: 'spouse_death',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.partner && G.age >= 58 && Math.random() < 0.12,
    text: 'Your partner of many years dies. The house is very quiet. Everything reminds you of them.',
    choices: [
      { text: 'Lean on family and friends', tag: null, outcome: 'You are not alone. That is not nothing.', effect: (p) => { p.m -= 20; p.r += 8; p.clearPartner() }, inject: null },
      { text: 'Grieve in solitude', tag: null, outcome: 'The grief is entirely yours. It does not share itself.', effect: (p) => { p.m -= 28; p.h -= 6; p.r += 15; p.clearPartner() }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'child_predeceases',
    phase: 'late_life',
    weight: 1,
    when: (G) => G.children.length > 0 && G.age >= 55 && Math.random() < 0.04,
    text: 'No parent expects to outlive their child. The grief is a different category. It does not follow normal rules.',
    choices: null,
    effect: (p) => { p.m -= 30; p.h -= 10; p.r += 20; p.addFlag('child_loss') },
  },

  // ── THERAPY SYSTEM ────────────────────────────────────────────────────────
  {
    id: 'ya_therapy_start',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.stats.happiness < 45 && G.money >= 500 && !G.flags.includes('in_therapy') && G.age >= 20,
    text: 'A friend suggests therapy. You\'ve been deflecting the idea for a long time. Something about this moment makes you finally consider it.',
    choices: [
      { text: 'Make an appointment', tag: null, outcome: 'The first session is awkward. The second is less so.', effect: (p) => { p.addFlag('in_therapy'); p.mo -= 600; p.m += 4 }, inject: null },
      { text: 'You don\'t need it — you\'re fine', tag: null, outcome: 'You are not fine. But the appointment waits.', effect: (p) => { p.m -= 2 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_therapy_progress',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('in_therapy') && G.age >= 22,
    text: 'The therapist asks about your childhood. You give a version of the answer. Then she asks you to say what actually happened.',
    choices: [
      { text: 'Tell the truth — all of it', tag: null, outcome: 'Something releases. It does not disappear, but it loosens.', effect: (p) => { p.r -= 10; p.m += 8; p.addFlag('emotionally_honest'); p.mo -= 800 }, inject: null },
      { text: 'Keep the edited version', tag: null, outcome: 'The sessions continue. The real work is postponed.', effect: (p) => { p.m += 2; p.mo -= 800 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_therapy_breakthrough',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('in_therapy') && (G.flags.includes('abused_child') || G.flags.includes('early_grief')) && G.age >= 32,
    text: 'Your therapist says something that reframes the last thirty years. You sit with it for a long time after the session ends.',
    choices: null,
    effect: (p) => { p.r -= 15; p.m += 12; p.addFlag('processed_grief'); p.addFlag('acceptance') },
  },
  {
    id: 'mid_therapy_long_term',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('in_therapy') && G.age >= 40 && G.regret > 20,
    text: 'Years of therapy. You are not fixed — that was never the point. But you are less afraid of yourself than you used to be.',
    choices: [
      { text: 'Continue — it\'s still working', tag: null, outcome: 'The work is long. You keep doing it.', effect: (p) => { p.r -= 8; p.m += 5; p.mo -= 1200 }, inject: null },
      { text: 'Take a break — you feel stable', tag: null, outcome: 'You know how to return if you need to.', effect: (p) => { p.r -= 4; p.m += 3 }, inject: null },
    ],
    effect: null,
  },

  // ── CHRONIC ILLNESS ───────────────────────────────────────────────────────
  {
    id: 'ya_chronic_illness_diagnosis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 20 && G.stats.health < 60 && !G.flags.includes('chronic_illness') && Math.random() < 0.06,
    text: 'The doctor gives your symptoms a name. A chronic condition — manageable, but lifelong. You leave the clinic holding a leaflet that rewrites your future.',
    choices: [
      { text: 'Accept it and adapt', tag: null, outcome: 'You restructure your life around the new reality.', effect: (p) => { p.h -= 8; p.addFlag('chronic_illness'); p.addFlag('health_conscious') }, inject: null },
      { text: 'Ignore it — you\'ll manage somehow', tag: null, outcome: 'The condition doesn\'t care whether you\'re ready.', effect: (p) => { p.h -= 15; p.addFlag('chronic_illness') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_chronic_illness_flare',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('chronic_illness') && G.age >= 30,
    text: 'A flare-up. The condition that usually stays in the background pushes itself forward. You cancel everything for a week.',
    choices: [
      { text: 'Rest fully and recover properly', tag: null, outcome: 'It passes. You lose time, but you recover.', effect: (p) => { p.h -= 5; p.m -= 6; p.mo -= 400 }, inject: null },
      { text: 'Push through — you can\'t afford to stop', tag: null, outcome: 'The flare worsens. The recovery takes three weeks.', effect: (p) => { p.h -= 12; p.m -= 10; p.mo -= 200 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_chronic_illness_management',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('chronic_illness') && G.age >= 55,
    text: 'After decades with the condition, you have learned more about your body than most people ever know about their own. It has cost you. It has also taught you.',
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('health_conscious'); p.addFlag('acceptance') },
  },

  // ── ESTRANGEMENT ──────────────────────────────────────────────────────────
  {
    id: 'ya_family_estrangement',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('abused_child') || G.flags.includes('domestic_violence_home')) && G.age >= 19 && !G.flags.includes('estranged_family'),
    text: 'You realize you don\'t have to see them. This is a thought you have never fully allowed yourself before. They are family. They are also the source of harm.',
    choices: [
      { text: 'Cut contact — protect yourself', tag: null, outcome: 'The silence is strange, then peaceful, then grief-like — for the family you did not have.', effect: (p) => { p.m += 10; p.r += 8; p.addFlag('estranged_family') }, inject: null },
      { text: 'Maintain contact but set limits', tag: null, outcome: 'The limits are tested constantly. Some hold.', effect: (p) => { p.m -= 5; p.addFlag('guarded_heart') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_estrangement_decision',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('estranged_family') && G.age >= 35 && !G.flags.includes('reconciled_family'),
    text: 'A sibling reaches out. There is talk of reconciliation. The old person is apparently changed. You don\'t know if you believe it.',
    choices: [
      { text: 'Attempt cautious reconnection', tag: null, outcome: 'Some things are repaired. Others are not. The attempt matters.', effect: (p) => { p.m += 5; p.r -= 5; p.addFlag('reconciled_family') }, inject: null },
      { text: 'Maintain the distance you earned', tag: null, outcome: 'You protect what you built. There is no obligation to forgive what was not asked for.', effect: (p) => { p.m += 4 }, inject: null },
    ],
    effect: null,
  },

  // ── LEGACY / CHILDREN IN OLD AGE ─────────────────────────────────────────
  {
    id: 'late_children_support',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.children.length > 0 && G.age >= 65 && G.flags.includes('cared_for_children') && !G.flags.includes('legacy_support'),
    text: 'Your children are adults with children of their own now. They call to check in. Sometimes they visit. The relationship you built shows up in ways you didn\'t expect.',
    choices: null,
    effect: (p) => { p.m += 15; p.r -= 8; p.addFlag('legacy_support'); p.addFlag('grandparent') },
  },
  {
    id: 'late_children_absent',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.children.length > 0 && G.age >= 65 && !G.flags.includes('cared_for_children') && !G.flags.includes('legacy_support'),
    text: 'Your children are busy. The calls are infrequent. You understand — you were the same at their age. Still, the evenings are long.',
    choices: [
      { text: 'Reach out to rebuild connection', tag: null, outcome: 'It is not too late. It just takes longer now.', effect: (p) => { p.m += 6; p.r -= 4; p.addFlag('legacy_support') }, inject: null },
      { text: 'Accept the distance as the consequence', tag: null, outcome: 'Some debts compound quietly.', effect: (p) => { p.m -= 8; p.r += 10 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_deadbeat_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('deadbeat_parent') && G.age >= 60,
    text: 'Your child — now an adult — finds you. They do not come to reconnect. They come with questions that do not have good answers.',
    choices: [
      { text: 'Face them honestly — all of it', tag: null, outcome: 'They may not forgive you. You give them the truth instead.', effect: (p) => { p.r -= 10; p.m -= 10; p.addFlag('emotionally_honest') }, inject: null },
      { text: 'Deflect, minimize, disappear again', tag: null, outcome: 'They stop looking. The regret compounds.', effect: (p) => { p.r += 20; p.m -= 15 }, inject: null },
    ],
    effect: null,
  },

  // ── FOOD INSECURITY ───────────────────────────────────────────────────────
  {
    id: 'ch_food_insecurity',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.stats.wealth < 25 && G.character.country.archetype === 'subsaharan' && G.age >= 6 && !G.flags.includes('hunger_childhood'),
    text: 'There is not always enough food. You learn to eat quickly when there is food, and to say nothing when there is not. Hunger becomes familiar.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 6; p.addFlag('hunger_childhood') },
  },
  {
    id: 'ya_food_insecurity_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.money < 200 && G.stats.wealth < 20 && G.age >= 18 && (G.character.country.archetype === 'developing_unstable' || G.character.country.archetype === 'subsaharan'),
    text: 'At the end of the month, there is nothing left for food. You eat what you can. You pretend to others that you are fine.',
    choices: [
      { text: 'Seek food assistance', tag: null, outcome: 'The humiliation is real. So is the food.', effect: (p) => { p.h += 3; p.m -= 5 }, inject: null },
      { text: 'Manage alone — pride first', tag: null, outcome: 'You are thinner than you should be. Your thinking slows.', effect: (p) => { p.h -= 6; p.e -= 3; p.m -= 6 }, inject: null },
    ],
    effect: null,
  },

  // ── LGBTQ+ UNDER CRIMINALIZATION ─────────────────────────────────────────
  {
    id: 'ad_lgbtq_criminalized',
    phase: 'adolescence',
    weight: 2,
    when: (G) => false, // replaced by cult_lgbtq_criminal_realization in events_culture.js
    text: 'You understand something about yourself that this place has no room for. The law makes it a crime. The culture makes it a death. You keep this entirely to yourself.',
    choices: [
      { text: 'Suppress it completely to survive', tag: null, outcome: 'You become skilled at performing a version of yourself that is safe.', effect: (p) => { p.m -= 15; p.addFlag('learned_silence'); p.addFlag('guarded_heart') }, inject: null },
      { text: 'Confide in one trusted person', tag: null, outcome: 'The risk is enormous. For now, you are not entirely alone.', effect: (p) => { p.m -= 5; p.addFlag('has_close_friend') }, inject: null },
    ],
    effect: null,
  },

  // ── TIME-PERIOD FLAVOR ────────────────────────────────────────────────────
  {
    id: 'ch_polio_era',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1950 && G.currentYear <= 1963 && G.age >= 4 && G.age <= 12 && ['wealthy_west'].includes(G.character.country.archetype),
    text: 'Summer means polio warnings. Parents keep children from public pools. A neighborhood child gets it. Everyone holds their breath.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 5; p.addFlag('polio_era') },
  },
  {
    id: 'ch_cold_war_drills',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1952 && G.currentYear <= 1985 && G.age >= 6 && G.age <= 14 && ['wealthy_west', 'post_soviet'].includes(G.character.country.archetype),
    text: 'The teacher tells you to get under your desk and cover your head. You know — everyone knows — this would not actually help. You do it anyway.',
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('cold_war_generation') },
  },
  {
    id: 'ya_no_internet_era',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1975 && G.currentYear <= 1993 && G.age >= 18 && G.age <= 28,
    text: 'Everything moves slowly. Letters take days. Research means a library. Job listings are in the newspaper. The world is smaller and more local because of it.',
    choices: [
      { text: 'Use the library — become well-read', tag: null, outcome: 'Without distraction, you read everything you can get your hands on.', effect: (p) => { p.e += 5; p.addFlag('bookworm') }, inject: null },
      { text: 'Make do with what\'s available', tag: null, outcome: 'Information is scarce. You rely on people more than data.', effect: (p) => { p.e += 2 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_mobile_phone_arrives',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1996 && G.currentYear <= 2001 && G.age >= 16 && G.age <= 30 && ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype),
    text: 'You get your first mobile phone. A brick-like thing. You can call people from anywhere. This feels like science fiction made ordinary.',
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('internet_generation') },
  },
  {
    id: 'ch_green_revolution',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1965 && G.currentYear <= 1975 && G.age >= 6 && G.age <= 14 && ['India', 'Pakistan', 'Bangladesh', 'Vietnam', 'Philippines', 'Indonesia'].includes(G.character.country.name),
    text: 'New seed varieties and irrigation transform farming in the region. Food becomes more available than it was for your parents. The difference is visible in the faces of children.',
    choices: null,
    effect: (p) => { p.h += 5; p.w += 4 },
  },
  {
    id: 'ad_aids_awareness_1980s',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.currentYear >= 1985 && G.currentYear <= 1995 && G.age >= 14 && G.age <= 17 && ['wealthy_west'].includes(G.character.country.archetype),
    text: 'A disease called AIDS is in the news, then everywhere. Sex education changes overnight. Some people you know start dying, or know people who are.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('aids_generation') },
  },
  {
    id: 'ya_internet_dot_com',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.currentYear >= 1998 && G.currentYear <= 2002 && G.age >= 18 && G.age <= 32 && ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype),
    text: 'Everyone is starting a dotcom. Money is flowing. Your friends are getting rich or pretending to. The bubble feels permanent.',
    choices: [
      { text: 'Invest — get in while it\'s rising', tag: null, outcome: 'You make money, then lose most of it when it crashes.', effect: (p) => { p.w += 5; p.mo += 3000 }, inject: null },
      { text: 'Stay cautious — something feels wrong', tag: null, outcome: 'The bubble bursts. You watch others scramble while you stay stable.', effect: (p) => { p.m += 3; p.e += 2 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_9_11_aftermath',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 2001 && G.currentYear <= 2004 && G.age >= 25 && ['wealthy_west'].includes(G.character.country.archetype),
    text: 'Everything at airports is different now. Security theater becomes a permanent feature of travel. The country you live in is afraid, and that fear has decided things.',
    choices: null,
    effect: (p) => { p.m -= 5 },
  },

  // ── ARRANGED MARRIAGE ─────────────────────────────────────────────────────
  {
    id: 'ya_arranged_marriage',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 18 && G.age <= 24 && !G.partner && ['India','Pakistan','Bangladesh','Afghanistan','Saudi Arabia','UAE'].includes(G.character.country.name) && G.character.familyStability !== 'unstable',
    text: 'Your family has found someone. They are from a good family. You have met once, briefly. The arrangements are nearly complete.',
    choices: [
      { text: 'Accept the match', tag: null, outcome: 'You enter the marriage. Whether it becomes something good depends on what you both make of it.', effect: (p) => { p.addFlag('early_marriage'); p.m -= 3 }, inject: null },
      { text: 'Refuse — choose your own path', tag: null, outcome: 'The family conflict is significant. You bear the consequences.', effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('estranged_family') }, inject: null },
    ],
    effect: null,
  },

  // ── LATE LIFE EXPANSION ───────────────────────────────────────────────────
  {
    id: 'late_retirement_decision',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.age >= 60 && G.age <= 65 && G.career && !G.flags.includes('retired'),
    text: (G) => {
      if (['wealthy_west','wealthy_east'].includes(G.character.country.archetype)) return 'The pension papers arrive. You\'ve been paying in for decades. The math works — you can leave.'
      if (G.character.country.archetype === 'post_soviet') return 'The state pension is barely enough. But your body is done with the work.'
      return 'There is no pension. You stop working when you cannot work anymore.'
    },
    choices: [
      { text: 'Retire — you\'ve earned it', tag: null, outcome: 'The first week feels strange. By the third, you begin to understand rest.', effect: (p) => { p.m += 10; p.addFlag('retired') }, inject: null },
      { text: 'Keep working — idleness frightens you', tag: null, outcome: 'You stay on. The body has opinions about this decision.', effect: (p) => { p.m += 3; p.h -= 4 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_pension_reality',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 62 && G.flags.includes('retired') && !G.flags.includes('pension_settled'),
    text: (G) => {
      if (['wealthy_west','wealthy_east'].includes(G.character.country.archetype)) return 'The pension is smaller than you imagined. Everything is more expensive than it used to be.'
      if (G.character.country.archetype === 'subsaharan' || G.character.country.archetype === 'conflict_zone') return 'There is no formal pension. Your children are your retirement plan. Whether that works depends on them.'
      return 'The government pension arrives monthly. It covers rent, barely. Extras are a memory.'
    },
    choices: [
      { text: 'Downsize and adapt', tag: null, outcome: 'A smaller life. Also a simpler one.', effect: (p) => { p.m += 5; p.w -= 5; p.addFlag('pension_settled') }, inject: null },
      { text: 'Keep the lifestyle — drain savings', tag: null, outcome: 'The math will catch up eventually.', effect: (p) => { p.m += 2; p.mo -= 5000; p.addFlag('pension_settled') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_grandchild_born',
    phase: 'late_life',
    weight: 6,
    when: (G) => G.children.length > 0 && G.age >= 52 && !G.flags.includes('grandparent') && G.flags.includes('cared_for_children'),
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_east') return 'Your child calls. The baby has arrived. In this culture, your role is expected to be central — caregiver, daily presence, family anchor.'
      if (['subsaharan','developing_unstable'].includes(G.character.country.archetype)) return 'The grandchild arrives. In this family, this means you: childcare while the parents work, school pickups, stories at night.'
      return 'You are a grandparent. The weight of the word settles on you slowly, then all at once.'
    },
    choices: [
      { text: 'Be fully present — the involved grandparent', tag: null, outcome: 'The child knows your face and your stories. You know theirs.', effect: (p) => { p.m += 18; p.addFlag('grandparent'); p.addFlag('found_meaning') }, inject: null },
      { text: 'Maintain some distance — let them parent', tag: null, outcome: 'You are there when needed. Less, when not.', effect: (p) => { p.m += 8; p.addFlag('grandparent') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_grandchild_relationship',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.flags.includes('grandparent') && G.age >= 60,
    text: 'Your grandchild asks you what it was like when you were young. You realize you are now the keeper of a world that no longer exists.',
    choices: [
      { text: 'Tell them everything — the real version', tag: null, outcome: 'They listen with a seriousness that surprises you. Something transfers.', effect: (p) => { p.m += 12; p.r -= 6; p.addFlag('bridge_builder') }, inject: null },
      { text: 'Give them the edited version', tag: null, outcome: 'They sense the gaps. They will fill them in their own time.', effect: (p) => { p.m += 6 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_cognitive_early',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 68 && G.stats.health < 50 && !G.flags.includes('cognitive_decline') && Math.random() < 0.12,
    text: (G) => {
      if (['wealthy_west','wealthy_east'].includes(G.character.country.archetype)) return 'You forget the word for something ordinary. Then a name. The doctor orders tests and returns with a careful face.'
      if (G.character.country.archetype === 'post_soviet') return 'You forget things more often. The family says it\'s age. You suspect it\'s something else, but diagnosis costs money.'
      return 'The forgetting comes gradually. In this place, there is no clinic for it, no name given. The family manages as best they can.'
    },
    choices: [
      { text: 'Pursue diagnosis and treatment', tag: null, outcome: (G) => ['wealthy_west','wealthy_east'].includes(G.character.country.archetype) ? 'Early intervention slows the progression.' : 'The medication is expensive and hard to source.', effect: (p) => { p.h -= 5; p.m -= 10; p.mo -= 3000; p.addFlag('cognitive_decline') }, inject: null },
      { text: 'Accept it quietly and adapt', tag: null, outcome: 'You restructure your life around what you still have.', effect: (p) => { p.h -= 8; p.m -= 8; p.addFlag('cognitive_decline') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_cognitive_progression',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.flags.includes('cognitive_decline') && G.age >= 72,
    text: 'The gaps in memory are larger now. Sometimes the date slips away. Sometimes a face. The people around you rearrange their lives.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 12; p.e -= 6; p.r += 8 },
  },
  {
    id: 'late_health_scare_heart',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 58 && !G.flags.includes('heart_event') && (G.flags.includes('smoker') || G.stats.health < 45) && Math.random() < 0.15,
    text: (G) => {
      const base = 'A pain in the chest, then in the arm. The hospital. Tests. The doctor says you are lucky it was a warning.'
      if (G.character.country.archetype === 'wealthy_west') return base + ' The cardiac team is excellent.'
      if (['subsaharan','conflict_zone'].includes(G.character.country.archetype)) return 'A pain in the chest. The nearest clinic is hours away. By the time you arrive, the moment has passed.'
      return base
    },
    choices: [
      { text: 'Change everything — diet, exercise, stress', tag: null, outcome: 'You become something you were not. It is not too late.', effect: (p) => { p.h += 5; p.m -= 5; p.addFlag('health_conscious'); p.addFlag('heart_event') }, inject: null },
      { text: 'Take the medication, change little else', tag: null, outcome: 'The pills help. The habits stay the same.', effect: (p) => { p.h -= 3; p.mo -= 1500; p.addFlag('heart_event') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_health_cancer',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.flags.includes('cancer_survivor') && Math.random() < 0.08,
    text: (G) => {
      if (['wealthy_west','wealthy_east'].includes(G.character.country.archetype)) return 'The scan shows something that wasn\'t there before. The oncologist speaks in percentages and treatment windows.'
      if (['subsaharan','conflict_zone','developing_unstable'].includes(G.character.country.archetype)) return 'The diagnosis comes late — there was no screening, no early detection. The treatment options are few and expensive.'
      return 'Cancer. The word lands differently than you expected.'
    },
    choices: [
      { text: 'Pursue full treatment — fight it', tag: null, outcome: 'Chemotherapy. Hair loss. Exhaustion. And, eventually, a clean scan.', effect: (p) => { p.h -= 15; p.m -= 10; p.mo -= 25000; p.addFlag('cancer_survivor') }, inject: null },
      { text: 'Pursue palliative care — quality over quantity', tag: null, outcome: 'You choose how to spend the remaining good time.', effect: (p) => { p.h -= 20; p.m += 5; p.r -= 5; p.addFlag('acceptance') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_nursing_home',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 76 && G.stats.health < 35 && !G.flags.includes('nursing_home'),
    text: (G) => {
      if (['wealthy_west'].includes(G.character.country.archetype)) return 'Your children gently raise the subject of assisted living. The facility is clean and well-staffed. It also feels like a waiting room.'
      if (['wealthy_east','developing_urban'].includes(G.character.country.archetype)) return 'In this culture, placing a parent in a facility carries deep shame. Your child proposes moving you into their home instead.'
      return 'Your family takes you in. There is no other option, and also no question about it.'
    },
    choices: [
      { text: 'Accept the move gracefully', tag: null, outcome: 'You adapt. Some of the staff become something like friends.', effect: (p) => { p.m -= 8; p.addFlag('nursing_home') }, inject: null },
      { text: 'Insist on staying at home as long as possible', tag: null, outcome: 'With help, you manage. Independence costs effort.', effect: (p) => { p.m += 5; p.h -= 5 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_life_review',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.age >= 70 && !G.flags.includes('life_reviewed'),
    text: 'At some point in the long evenings, you begin reviewing your life with an honesty you couldn\'t have managed earlier. You see the forks you took and the ones you didn\'t.',
    choices: [
      { text: 'Accept it — all of it', tag: null, outcome: 'The regret doesn\'t vanish, but it stops ambushing you.', effect: (p) => { p.r -= 15; p.m += 10; p.addFlag('acceptance'); p.addFlag('life_reviewed') }, inject: null },
      { text: 'Focus on what you\'re proud of', tag: null, outcome: 'There is enough. There was always enough to be proud of.', effect: (p) => { p.r -= 8; p.m += 8; p.addFlag('life_reviewed') }, inject: null },
      { text: 'Dwell on what went wrong', tag: null, outcome: 'The audit never quite finishes. It follows you to bed.', effect: (p) => { p.r += 10; p.m -= 8; p.addFlag('life_reviewed') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_old_friend_death',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 65,
    text: 'The call comes. A friend from another chapter of your life is gone. You find yourself at a funeral thinking about all the ones still ahead.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5 },
  },
  {
    id: 'late_will_and_testament',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 62 && !G.flags.includes('will_written') && (G.money > 5000 || G.children.length > 0),
    text: (G) => {
      if (['wealthy_west','wealthy_east'].includes(G.character.country.archetype)) return 'The solicitor suggests it is time to formalize your wishes. A will. The word has a finality that is uncomfortable and necessary.'
      return 'Your children ask what you want done with what you leave behind. You realize you have never said.'
    },
    choices: [
      { text: 'Write the will — clear and fair', tag: null, outcome: 'One less thing for them to fight about.', effect: (p) => { p.m += 5; p.r -= 6; p.mo -= 800; p.addFlag('will_written') }, inject: null },
      { text: 'Leave it to them to sort out', tag: null, outcome: 'This decision will cost your children something.', effect: (p) => { p.r += 8; p.addFlag('will_written') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_volunteering',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('retired') && G.age >= 62 && G.stats.health > 40 && !G.flags.includes('committed_activist'),
    text: (G) => {
      if (['subsaharan','developing_unstable'].includes(G.character.country.archetype)) return 'There is always work that needs doing in your community. No one is paid for it. No one expects to be.'
      return 'With the work gone, you find something is missing. A community organization asks if you have time.'
    },
    choices: [
      { text: 'Volunteer — give your time and knowledge', tag: null, outcome: 'The structure returns. So does the sense of being useful.', effect: (p) => { p.m += 12; p.addFlag('committed_activist'); p.addFlag('community_leader') }, inject: null },
      { text: 'Enjoy the freedom — you\'ve given enough', tag: null, outcome: 'The leisure is real. It is also sometimes hollow.', effect: (p) => { p.m += 3 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_downsizing',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 64 && G.flags.includes('retired') && G.money > 0 && !G.flags.includes('downsized'),
    text: (G) => {
      if (['wealthy_west'].includes(G.character.country.archetype)) return 'The house is too large now. The children left years ago. You walk through rooms you never use.'
      return 'The home you built your life in starts to feel like a burden. Maintenance, costs, stairs.'
    },
    choices: [
      { text: 'Sell and move somewhere smaller', tag: null, outcome: 'You pocket the difference. The new place fits.', effect: (p) => { p.m += 6; p.mo += 30000; p.addFlag('downsized') }, inject: null },
      { text: 'Stay — the memories live here too', tag: null, outcome: 'You maintain it as long as you can.', effect: (p) => { p.m += 4; p.mo -= 3000; p.addFlag('downsized') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_late_romance',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.partner && G.age >= 62 && G.age <= 75 && G.stats.happiness < 55,
    text: (G) => {
      if (G.currentYear >= 2010 && ['wealthy_west','wealthy_east','developing_urban'].includes(G.character.country.archetype)) return 'A friend shows you a dating app for people your age. You dismiss it, then don\'t.'
      return 'At a community event, someone sits next to you and asks about your life. You notice you are telling the truth.'
    },
    choices: [
      { text: 'Open yourself to it', tag: null, outcome: 'Something unexpected grows in the late afternoon of your life.', effect: (p) => { p.m += 15; p.addFlag('strong_marriage') }, inject: null },
      { text: 'You are done with all that', tag: null, outcome: 'You are at peace with solitude. That is not nothing.', effect: (p) => { p.m += 4; p.addFlag('acceptance') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_political_reflection',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && (G.flags.includes('cold_war_generation') || G.flags.includes('apartheid_generation') || G.flags.includes('revolution_generation')),
    text: 'You have lived through things that history books now describe in two paragraphs. Someone younger asks what it was really like. You realize the gap between what happened and what they imagine is vast.',
    choices: [
      { text: 'Speak — bear witness', tag: null, outcome: 'You tell them what the books leave out. They are quiet for a long time.', effect: (p) => { p.m += 10; p.r -= 8; p.addFlag('bridge_builder') }, inject: null },
      { text: 'Some things don\'t translate', tag: null, outcome: 'You give them the outline. The texture stays yours.', effect: (p) => { p.m += 4 }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_spiritual_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 70 && !G.flags.includes('spiritual_settled'),
    text: (G) => {
      if (G.flags.includes('devout')) return 'Your faith has accompanied you this whole way. At this stage, it feels less like belief and more like an old friend.'
      if (G.flags.includes('skeptic')) return 'You have been skeptical all your life. Now, in the quiet hours, you find you are not as certain of your certainty as you used to be.'
      return 'The question of what comes after presents itself differently at seventy than it did at thirty.'
    },
    choices: [
      { text: 'Find peace in faith or philosophy', tag: null, outcome: 'A framework for what\'s coming. That\'s enough.', effect: (p) => { p.m += 10; p.r -= 5; p.addFlag('spiritual_settled'); p.addFlag('found_meaning') }, inject: null },
      { text: 'Sit with the uncertainty', tag: null, outcome: 'You do not need an answer. The question itself is the companion.', effect: (p) => { p.m += 6; p.addFlag('spiritual_settled') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_grandchild_milestone',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('grandparent') && G.age >= 68,
    text: 'Your grandchild graduates, or gets married, or has a child of their own. Four generations, briefly in the same room. You understand something about time that you couldn\'t have explained before.',
    choices: null,
    effect: (p) => { p.m += 14; p.r -= 8; p.addFlag('found_meaning') },
  },
  {
    id: 'late_memoir_writing',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.stats.smarts > 45 && !G.flags.includes('memoir_written'),
    text: 'You start writing down what happened. Not for publication — for yourself, maybe for the grandchildren. Getting it down feels urgent in a way you can\'t fully explain.',
    choices: [
      { text: 'Write it all — the honest version', tag: null, outcome: 'You surprise yourself with what you remember. And what you feel about it.', effect: (p) => { p.r -= 12; p.m += 8; p.e += 3; p.addFlag('memoir_written'); p.addFlag('emotionally_honest') }, inject: null },
      { text: 'Write the version you can live with', tag: null, outcome: 'It is still yours. Just curated.', effect: (p) => { p.r -= 5; p.m += 5; p.addFlag('memoir_written') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_inheritance_leaving',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 72 && G.children.length > 0 && G.money > 10000 && !G.flags.includes('inheritance_planned'),
    text: (G) => {
      if (G.children.length > 1) return 'How you divide what you have will say something. The children may not agree with what it says.'
      return 'Everything will go to your child. You have mixed feelings about handing so much weight to one person.'
    },
    choices: [
      { text: 'Divide equally, whatever the relationships', tag: null, outcome: 'Fair on paper. In practice, contested.', effect: (p) => { p.r -= 4; p.addFlag('inheritance_planned') }, inject: null },
      { text: 'Reward the child who showed up', tag: null, outcome: 'The others find out eventually. Relationships shift.', effect: (p) => { p.r -= 6; p.m += 4; p.addFlag('inheritance_planned') }, inject: null },
      { text: 'Give it away — charities, causes', tag: null, outcome: 'Your children are surprised. Some are hurt. You are at peace.', effect: (p) => { p.karma += 15; p.r -= 10; p.m += 8; p.addFlag('inheritance_planned') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_physical_limits',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 72 && G.stats.health < 50 && !G.flags.includes('physical_limits_accepted'),
    text: 'The body\'s negotiations with you have changed. Stairs are a decision. Distances are considered. You are not who you were at forty, and the body keeps reminding you.',
    choices: [
      { text: 'Adapt without complaint', tag: null, outcome: 'You do what you can with what remains. That has always been the deal.', effect: (p) => { p.m += 5; p.addFlag('acceptance'); p.addFlag('physical_limits_accepted') }, inject: null },
      { text: 'Rage against it — refuse the limits', tag: null, outcome: 'Some of the spirit transfers into stubbornness. The body is not persuaded.', effect: (p) => { p.m -= 4; p.h -= 4; p.addFlag('physical_limits_accepted') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_friend_network_thin',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 72 && (!G.friends || G.friends.length < 2) && !G.flags.includes('late_loneliness'),
    text: (G) => {
      if (['wealthy_east','subsaharan'].includes(G.character.country.archetype)) return 'In this culture, old age without family nearby is almost unthinkable. But family has scattered. The loneliness is real, but unnamed.'
      return 'Your peers have died or moved. The social world shrinks. You notice that days can pass without meaningful conversation.'
    },
    choices: [
      { text: 'Join a community group — find new connection', tag: null, outcome: 'The new friendships are smaller but warm.', effect: (p) => { p.m += 8; p.addFlag('has_close_friend') }, inject: null },
      { text: 'Accept the solitude', tag: null, outcome: 'You learn what you need and what you can live without.', effect: (p) => { p.m -= 5; p.addFlag('late_loneliness'); p.addFlag('acceptance') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_reconcile_past',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.regret > 30 && G.age >= 68 && !G.flags.includes('reconciled_past'),
    text: 'There are people you wronged and never addressed. Some are still alive. You find yourself drafting a letter in your head that you haven\'t yet sent.',
    choices: [
      { text: 'Reach out — it\'s not too late', tag: null, outcome: 'Some receive it well. One doesn\'t respond. You did what you could.', effect: (p) => { p.r -= 12; p.m += 6; p.addFlag('reconciled_past'); p.addFlag('emotionally_honest') }, inject: null },
      { text: 'Let it stay in the past', tag: null, outcome: 'You carry it a little longer.', effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('reconciled_past') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_end_of_life_peace',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 78 && G.stats.health < 30,
    text: 'You know what this is. You have known for a while. The question now is what to do with the time that remains.',
    choices: [
      { text: 'Call the people who matter and say what needs saying', tag: null, outcome: 'Some conversations you\'ve been postponing for decades happen in the space of a week. It is enough.', effect: (p) => { p.r -= 15; p.m += 12; p.addFlag('found_meaning') }, inject: null },
      { text: 'Keep your private counsel — die as you lived', tag: null, outcome: 'You have always been this way. There is dignity in consistency.', effect: (p) => { p.r -= 5; p.addFlag('acceptance') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_community_elder',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && (G.flags.includes('community_leader') || G.flags.includes('mentor')) && G.stats.happiness > 50,
    text: (G) => {
      if (['subsaharan','developing_urban'].includes(G.character.country.archetype)) return 'In your neighborhood, you are consulted on disputes. Your age is capital here — experience has currency.'
      return 'Younger people come to you. Not for advice, exactly, but for the witness of someone who has seen more.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 5; p.addFlag('found_meaning') },
  },
  {
    id: 'late_sibling_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 65 && !G.flags.includes('sibling_reckoned'),
    text: 'One of your siblings is ill. You see them in a way you haven\'t in years — not as the person from childhood, but as someone also running out of time.',
    choices: [
      { text: 'Close whatever distance remains', tag: null, outcome: 'You talk properly for the first time since you were young. Something repairs.', effect: (p) => { p.m += 10; p.r -= 8; p.addFlag('sibling_reckoned') }, inject: null },
      { text: 'Keep the comfortable distance', tag: null, outcome: 'Some relationships are maintained rather than healed. That is still something.', effect: (p) => { p.m += 2; p.addFlag('sibling_reckoned') }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_poverty_old_age',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.money < 1000 && G.stats.wealth < 20 && G.age >= 62 && ['subsaharan','developing_unstable','conflict_zone'].includes(G.character.country.archetype),
    text: 'Old age without savings in a country without a safety net. You work as long as the body allows. After that, you depend entirely on family. Whether they can carry this weight is not in your hands.',
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 10; p.r += 8 },
  },
  {
    id: 'late_tech_bewilderment',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 70 && G.currentYear >= 2010 && !G.flags.includes('tech_adapted'),
    text: 'The world runs on phones now. Your grandchildren communicate in ways you can\'t quite follow. Some of it you learn. Some of it stays foreign.',
    choices: [
      { text: 'Try to learn it — video calls, apps, the lot', tag: null, outcome: 'You manage more than expected. The connection is worth the effort.', effect: (p) => { p.e += 3; p.m += 6; p.addFlag('tech_adapted') }, inject: null },
      { text: 'Let them come to you in the old ways', tag: null, outcome: 'Some do. Some don\'t. You learn which is which.', effect: (p) => { p.m -= 2; p.addFlag('tech_adapted') }, inject: null },
    ],
    effect: null,
  },

  // ── PRISON DEPTH EVENTS ──────────────────────────────────────────────────
  // These events only fire when inPrison === true (via G.inPrison check in engine)

  {
    id: 'prison_first_week',
    phase: 'young_adult',
    weight: 8,
    when: (G) => G.inPrison && !G.flags.includes('prison_oriented'),
    text: (G) => {
      if (['conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype))
        return 'The prison is overcrowded. Three people share a cell designed for one. Violence is a daily reality. You must decide quickly who to trust — and who to avoid entirely.'
      return 'The first week inside is disorienting. The hierarchy is invisible but rigid. Older inmates test you early on.'
    },
    choices: [
      { text: 'Keep your head down and observe', tag: null, outcome: 'You learn the landscape without making enemies. A quiet dignity develops.', effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('prison_oriented'); }, inject: null },
      { text: 'Assert yourself early', tag: null, outcome: 'A confrontation establishes a rough respect. You also earn a grudge.', effect: (p) => { p.h -= 8; p.m -= 5; p.addFlag('prison_oriented'); }, inject: null },
      { text: 'Find a patron — someone established', tag: null, outcome: 'The protection comes with obligations. Nothing inside is free.', effect: (p) => { p.m -= 3; p.karma -= 5; p.addFlag('prison_oriented'); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_cellmate',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.inPrison,
    text: (G) => {
      const archetype = G.character.country.archetype
      if (['conflict_zone', 'developing_unstable'].includes(archetype))
        return 'Your cellmate is a political prisoner — a journalist arrested for covering the regime. His knowledge of the outside world is remarkable.'
      return 'Your cellmate has been inside for twelve years. He is either the wisest or most broken person you have ever met — possibly both.'
    },
    choices: [
      { text: 'Talk to him. Listen to his story.', tag: null, outcome: 'The conversations reshape how you see your own crime and your own life.', effect: (p) => { p.e += 6; p.m += 3; }, inject: null },
      { text: 'Stay silent. Do not form attachments.', tag: null, outcome: 'The years inside get quieter. And lonelier.', effect: (p) => { p.m -= 6; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_job',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.inPrison && !G.flags.includes('prison_worker'),
    text: (G) => {
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'The prison offers a work assignment. Library assistant, kitchen, or workshop — they all pay almost nothing, but they fill the hours.'
      return 'Work assignments in the prison are scarce and fought over. A spot opens up in the kitchen.'
    },
    choices: [
      { text: 'Take the library job', tag: null, outcome: 'You read more in a year than in your entire life before. Something shifts.', effect: (p) => { p.e += 8; p.m += 4; p.addFlag('prison_worker'); p.addFlag('bookworm'); }, inject: null },
      { text: 'Take the kitchen job', tag: null, outcome: 'The work is physical and hot. You eat better than most. You learn to cook.', effect: (p) => { p.h += 4; p.m += 3; p.addFlag('prison_worker'); }, inject: null },
      { text: 'Take the workshop job', tag: null, outcome: 'You learn a trade. The skill follows you out.', effect: (p) => { p.e += 5; p.m += 4; p.addFlag('prison_worker'); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_education',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.inPrison && !G.flags.includes('prison_education') && ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype),
    text: 'The prison runs an education programme — basic literacy up to secondary equivalency. A quiet teacher comes twice a week. Some inmates mock it. Others fill every session.',
    choices: [
      { text: 'Enrol and attend every class', tag: 'adult_learner', outcome: 'You earn a qualification behind bars. The irony is not lost on you.', effect: (p) => { p.e += 10; p.m += 6; p.addFlag('adult_learner'); p.addFlag('prison_education'); }, inject: null },
      { text: 'Attend occasionally', tag: null, outcome: 'You pick up more than you expected to.', effect: (p) => { p.e += 4; p.addFlag('prison_education'); }, inject: null },
      { text: 'Skip it — not for you', tag: null, outcome: 'The hours go differently.', effect: (p) => { p.m -= 2; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_gang_pressure',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.inPrison && !G.flags.includes('gang_member'),
    text: (G) => {
      if (['conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype))
        return 'The prison is run by gangs aligned with different factions outside. Staying unaffiliated is dangerous. They want your answer now.'
      return 'A prison gang offers you protection — and a cut of their smuggling operation. Refusing has costs. Joining has costs too.'
    },
    choices: [
      { text: 'Join — survival comes first', tag: null, outcome: 'The protection is real. The debt that comes with it is realer.', effect: (p) => { p.h += 5; p.m -= 8; p.karma -= 10; p.addFlag('gang_member'); }, inject: null },
      { text: 'Refuse and find another way', tag: null, outcome: 'It is harder alone. You manage. The refusal costs you some health but keeps you intact.', effect: (p) => { p.h -= 5; p.m -= 5; p.karma += 5; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_incident',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.inPrison,
    text: (G) => {
      const archetype = G.character.country.archetype
      if (['conflict_zone', 'developing_unstable', 'subsaharan'].includes(archetype))
        return 'A riot breaks out over food rations. Guards fire into the crowd. You must get somewhere safe immediately.'
      return 'A fight erupts in the yard. You are near the edge of it when it starts.'
    },
    choices: [
      { text: 'Get to the wall and stay low', tag: null, outcome: 'You avoid the worst of it. You are shaken but unharmed.', effect: (p) => { p.m -= 8; }, inject: null },
      { text: 'Pull someone out of the fight', tag: 'compassionate', outcome: 'You take a blow meant for someone else. They remember.', effect: (p) => { p.h -= 10; p.m += 5; p.karma += 8; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_letter',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.inPrison && (G.partner || (G.children && G.children.length > 0)),
    text: (G) => G.partner
      ? 'A letter arrives from your partner. The handwriting is careful. The words are not.'
      : 'A letter arrives from your child. The handwriting is their school handwriting — still forming.',
    choices: [
      { text: 'Write back — tell the truth', tag: null, outcome: 'It is the hardest letter you have ever written. It may be the most important.', effect: (p) => { p.m += 6; p.r -= 3; }, inject: null },
      { text: 'Write back — keep it light', tag: null, outcome: 'You protect them from the reality. For now.', effect: (p) => { p.m += 2; p.r += 4; }, inject: null },
      { text: 'Do not respond', tag: null, outcome: 'The silence says what you could not.', effect: (p) => { p.m -= 10; p.r += 8; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_rehabilitation',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.inPrison && ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) && (G.mem?.originalSentence ?? 0) >= 3,
    text: 'The prison offers a rehabilitation programme — cognitive behavioural therapy, anger management, restorative justice. Participation is voluntary but noted by the parole board.',
    choices: [
      { text: 'Engage fully and honestly', tag: 'in_recovery', outcome: 'It is confronting work. Something in you loosens.', effect: (p) => { p.m += 10; p.e += 5; p.addFlag('in_recovery'); p.karma += 8; }, inject: null },
      { text: 'Attend but keep the walls up', tag: null, outcome: 'The parole board sees attendance. You leave with less than you could have.', effect: (p) => { p.m += 3; }, inject: null },
      { text: 'Skip it — it is not sincere', tag: null, outcome: 'The parole board notices the absence. The release date moves.', effect: (p) => { p.m -= 5; p.r += 5; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_parole_hearing',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.inPrison && G.prisonSentence >= 2 && (G.mem?.originalSentence ?? 0) >= 4,
    text: 'A parole hearing is scheduled. Three board members sit behind a table. The question is simple: are you a different person now?',
    choices: [
      { text: 'Make your case — genuine change, concrete plans', tag: null, outcome: 'They grant parole. The conditions are strict. The freedom is real.', effect: (p) => { p.releaseFromPrison(); p.m += 15; p.addFlag('in_recovery'); }, inject: null },
      { text: 'Give them what they want to hear', tag: null, outcome: 'Parole denied — the board can read a rehearsed answer. Your sentence continues.', effect: (p) => { p.m -= 10; p.r += 5; }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'prison_visitor',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.inPrison,
    text: (G) => {
      if (G.partner) return 'Your partner visits. An hour across a table. The glass between you says everything that words cannot.'
      if (G.parents) return 'One of your parents visits. The shame in their eyes is worse than the sentence itself.'
      return 'An old friend — the only one who comes — sits across from you. They look tired.'
    },
    choices: [
      { text: 'Make the most of the hour', tag: null, outcome: 'The connection, however strained, holds. They leave saying they will come again.', effect: (p) => { p.m += 8; }, inject: null },
      { text: 'Tell them not to come back — for their sake', tag: null, outcome: 'They argue. Eventually, they stop visiting. You told yourself it was a kindness.', effect: (p) => { p.m -= 10; p.r += 6; }, inject: null },
    ],
    effect: null,
  },

  // ── PREGNANCY & FERTILITY EVENTS ─────────────────────────────────────────

  {
    id: 'ya_unplanned_pregnancy',
    phase: 'young_adult',
    weight: 3,
    when: (G) => !G.birthControl && G.partner && G.age >= 16 && G.age <= 24 && G.children.length === 0 && !G.mem.hadPregnancyEvent,
    text: (G) => {
      const country = G.character.country.archetype
      if (['developing_unstable', 'subsaharan', 'conflict_zone'].includes(country))
        return `You are pregnant. There is no test kit — you simply know. In ${G.character.country.name}, this will change everything. There is no safety net for young mothers.`
      if (G.character.country.name === 'United States')
        return 'The test is positive. You are not ready. Healthcare costs, insurance, the conversation you need to have — it all arrives at once.'
      return 'The test is positive. You are not ready. Whatever comes next, the decision belongs to you.'
    },
    choices: [
      {
        text: 'Continue the pregnancy',
        tag: null,
        outcome: (G) => ['developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype)
          ? 'The birth is hard and attended by family. The child arrives into a life already full of difficulty and love in equal measure.'
          : 'The pregnancy is difficult but you manage. A child arrives before you felt prepared. Prepared doesn\'t wait.',
        effect: (p) => {
          p.m += 5; p.h -= 10; p.w -= 10; p.setMem('hadPregnancyEvent', true);
          p.addFlag('parent');
          p.addChild({ gender: Math.random() < 0.5 ? 'male' : 'female', ageAtBirth: 0, relationshipQuality: 75 });
        },
        inject: null,
      },
      {
        text: 'Terminate the pregnancy',
        tag: null,
        outcome: (G) => ['conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) && G.currentYear < 2000
          ? 'Safe options are nearly inaccessible here. The procedure happens anyway, at significant risk.'
          : 'The procedure is straightforward medically. The emotional weight takes longer to process.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.r += 5; p.setMem('hadPregnancyEvent', true); },
        inject: null,
      },
      {
        text: 'Consider adoption',
        tag: null,
        outcome: 'The pregnancy continues. At birth, you place the child with adoptive parents. The grief and peace are not opposites.',
        effect: (p) => { p.m -= 12; p.r += 8; p.karma += 5; p.setMem('hadPregnancyEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_fertility_struggle',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.partner && G.children.length === 0 && G.age >= 30 && G.age <= 40 && !G.mem.fertilityEvent,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return `You and your partner have been trying for two years. In ${G.character.country.name}, a childless marriage carries social weight that is hard to describe to outsiders.`
      return 'Two years of trying. Two years of tests, timing, and hope deferred. The doctors call it unexplained infertility.'
    },
    choices: [
      {
        text: 'Pursue IVF',
        tag: null,
        outcome: (G) => ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(G.character.country.archetype) && G.currentYear >= 1985
          ? 'Three rounds. The second one works. The cost is significant. The exhaustion is total. A child is born.'
          : 'IVF is not accessible here. The option exists in another country but the cost and travel are prohibitive.',
        effect: (p) => {
          if (['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(p._state?.character?.country?.archetype)) {
            p.m += 15; p.h -= 8; p.mo -= 25000; p.addFlag('parent');
            p.addChild({ gender: Math.random() < 0.5 ? 'male' : 'female', ageAtBirth: 0, relationshipQuality: 80 });
          } else {
            p.m -= 10; p.r += 8;
          }
          p.setMem('fertilityEvent', true);
        },
        inject: null,
      },
      {
        text: 'Adopt a child',
        tag: null,
        outcome: (G) => `The process in ${G.character.country.name} takes ${['wealthy_west'].includes(G.character.country.archetype) ? 'eighteen months of paperwork and home studies' : 'years of bureaucracy and uncertainty'}. A child eventually joins your family.`,
        effect: (p) => { p.m += 10; p.mo -= 8000; p.addFlag('parent'); p.addChild({ gender: Math.random() < 0.5 ? 'male' : 'female', ageAtBirth: 0, relationshipQuality: 70 }); p.setMem('fertilityEvent', true); },
        inject: null,
      },
      {
        text: 'Accept a life without children',
        tag: null,
        outcome: 'The grief is real. So is the space that opens up. You find other ways to shape the next generation.',
        effect: (p) => { p.m -= 5; p.r += 5; p.setMem('fertilityEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ya_miscarriage',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.partner && G.age >= 22 && G.age <= 38 && G.children.length === 0 && !G.mem.miscarriageEvent,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'The pregnancy ends at twelve weeks. There is no hospital nearby. Your family gathers. The grief is silent and communal.'
      return 'You miscarry at ten weeks. The medical care is good and swift. The emotional aftermath is not in any brochure.'
    },
    choices: [
      {
        text: 'Grieve together with your partner',
        tag: null,
        outcome: 'The loss brings you closer. The grief takes its time.',
        effect: (p) => { p.m -= 15; p.h -= 5; p.r += 5; p.setMem('miscarriageEvent', true); },
        inject: null,
      },
      {
        text: 'Try to move forward quickly',
        tag: null,
        outcome: 'The effort to appear okay delays the grief, not resolves it. It surfaces later.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('miscarriageEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ya_postpartum_depression',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.children.length > 0 && !G.mem.postpartumEvent && G.age <= 35 && G.children.some(c => c.ageAtBirth >= G.age - 2),
    text: (G) => {
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'The baby is here and safe, but something in you went dark after the birth. No one has a name for what this is. You feel ashamed of feeling this way.'
      return 'The baby is healthy. You know you should feel joy. Instead you feel a hollowness you cannot explain to anyone who hasn\'t felt it. Postpartum depression is what the doctor calls it.'
    },
    choices: [
      {
        text: 'Seek help — therapy and/or medication',
        tag: null,
        outcome: (G) => ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype)
          ? 'Treatment helps. The fog lifts over months. You find the joy you feared was gone.'
          : 'Support is limited but your partner and family help carry you through.',
        effect: (p) => { p.m += 10; p.h += 5; p.mo -= 2000; p.setMem('postpartumEvent', true); },
        inject: null,
      },
      {
        text: 'Tell no one and push through',
        tag: null,
        outcome: 'You manage, barely. The first year is the hardest year of your life.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.r += 5; p.setMem('postpartumEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_pregnancy_late',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner && G.age >= 38 && G.age <= 44 && G.children.length === 0 && !G.mem.latePregnancyEvent,
    text: (G) => {
      if (['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(G.character.country.archetype) && G.currentYear >= 1990)
        return 'Against the odds and your doctor\'s caution, you are pregnant at 40. The monitoring is intensive. The statistics are discussed at every appointment.'
      return 'A late surprise. You had accepted you would not become a parent. Now everything changes.'
    },
    choices: [
      {
        text: 'Embrace the pregnancy fully',
        tag: null,
        outcome: 'The birth is managed carefully. A child arrives, changing everything you thought your future looked like.',
        effect: (p) => { p.m += 12; p.h -= 12; p.addFlag('parent'); p.addChild({ gender: Math.random() < 0.5 ? 'male' : 'female', ageAtBirth: 0, relationshipQuality: 80 }); p.setMem('latePregnancyEvent', true); },
        inject: null,
      },
      {
        text: 'The risks are too high — end the pregnancy',
        tag: null,
        outcome: 'The decision weighs on you. The grief is mixed with relief, and vice versa.',
        effect: (p) => { p.m -= 10; p.r += 10; p.setMem('latePregnancyEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── INHERITANCE & WILLS ──────────────────────────────────────────────────

  {
    id: 'mid_will_writing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.money > 5000 && !G.mem.willWritten,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'There is no solicitor to see — you gather the family and make your intentions clear in the presence of elders and witnesses. What you have, and who gets it.'
      return 'A solicitor lays documents on the desk. A will is a strange thing to write — arranging the world for a day you won\'t see.'
    },
    choices: [
      {
        text: 'Leave everything to your children equally',
        tag: null,
        outcome: 'Simple. Equitable. Still contested by someone at the reading.',
        effect: (p) => { p.m += 5; p.setMem('willWritten', true); p.setMem('willType', 'equal_children'); },
        inject: null,
      },
      {
        text: 'Leave a portion to charity',
        tag: 'legacy_support',
        outcome: 'You designate a cause that outlives you. Your estate becomes part of something larger.',
        effect: (p) => { p.m += 8; p.karma += 10; p.addFlag('legacy_support'); p.setMem('willWritten', true); p.setMem('willType', 'charity'); },
        inject: null,
      },
      {
        text: 'Leave it to your partner and let them decide',
        tag: null,
        outcome: 'The simplest trust. It assumes the relationship will survive you.',
        effect: (p) => { p.m += 4; p.setMem('willWritten', true); p.setMem('willType', 'partner'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_contested_inheritance',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.parents === null && G.money > 10000 && !G.mem.inheritanceContested,
    text: (G) => {
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Your parent has died. The land they farmed is now the subject of a family dispute. Relatives you barely know are laying claim to it.'
      if (['post_soviet'].includes(G.character.country.archetype))
        return 'The estate left by your parent is modest — a flat and some savings. A sibling contests the split.'
      return 'The will is read. A sibling disputes their share, claiming undue influence. The lawyers circle.'
    },
    choices: [
      {
        text: 'Fight it — the will is clear',
        tag: null,
        outcome: 'The legal battle takes two years and a third of the estate in fees. You prevail.',
        effect: (p) => { p.m -= 10; p.mo += 15000; p.setMem('inheritanceContested', true); },
        inject: null,
      },
      {
        text: 'Settle — give them a larger share to end it',
        tag: null,
        outcome: 'Peace costs money. The relationship survives, barely.',
        effect: (p) => { p.m -= 5; p.mo += 5000; p.setMem('inheritanceContested', true); },
        inject: null,
      },
      {
        text: 'Let them have it — the money is not worth the fight',
        tag: null,
        outcome: 'The magnanimity is genuine. The sting fades. The relationship improves marginally.',
        effect: (p) => { p.karma += 8; p.m -= 3; p.setMem('inheritanceContested', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'late_inheritance_received',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.parents === null && !G.mem.inheritanceReceived && G.money > 0,
    text: (G) => {
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'The estate is settled. After debts and taxes, an inheritance arrives — enough to reshape your final years.'
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'Your parent\'s plot of land passes to you. In cash terms it is very little. In meaning, it is everything.'
      return 'The family home and what remained in the bank. An inheritance, modest but real.'
    },
    choices: [
      {
        text: 'Invest it for the family\'s future',
        tag: null,
        outcome: 'Careful stewardship. The wealth compounds slowly.',
        effect: (p) => { p.mo += 30000; p.m += 5; p.setMem('inheritanceReceived', true); },
        inject: null,
      },
      {
        text: 'Pay off debts and live more freely',
        tag: null,
        outcome: 'The weight of the debt lifts. The late years feel lighter.',
        effect: (p) => { p.mo += 15000; p.m += 10; p.w += 8; p.setMem('inheritanceReceived', true); },
        inject: null,
      },
      {
        text: 'Pass it on to your own children now',
        tag: 'legacy_support',
        outcome: 'You watch them use it while you are still here to see it. That turns out to matter.',
        effect: (p) => { p.m += 12; p.karma += 8; p.addFlag('legacy_support'); p.setMem('inheritanceReceived', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── CIVIL LAW & LITIGATION EVENTS ────────────────────────────────────────

  {
    id: 'mid_sued',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.money > 20000 && !G.mem.civilSuit && G.age >= 30,
    text: (G) => {
      const archetype = G.character.country.archetype
      if (['wealthy_west'].includes(archetype) && G.character.country.name === 'United States')
        return 'A letter arrives from a law firm. You are being sued — a neighbour claims your renovation damaged their property. The claim is $85,000.'
      if (['post_soviet', 'developing_urban'].includes(archetype))
        return 'A former business partner is taking you to court over a disputed deal from years ago. The claim is vague but the legal costs are real.'
      return 'A civil claim lands on your doorstep. A former contractor says you did not pay the agreed amount. Your records say otherwise.'
    },
    choices: [
      {
        text: 'Fight it in court',
        tag: null,
        outcome: 'The case drags on. Legal fees mount. You win but at a cost.',
        effect: (p) => { p.mo -= 20000; p.m -= 10; p.setMem('civilSuit', true); },
        inject: null,
      },
      {
        text: 'Settle out of court',
        tag: null,
        outcome: 'The settlement costs less than the fight. The resentment costs more than either.',
        effect: (p) => { p.mo -= 10000; p.m -= 5; p.setMem('civilSuit', true); },
        inject: null,
      },
      {
        text: 'Counter-sue for harassment',
        tag: null,
        outcome: 'The counter-claim is risky. It unsettles the claimant. Both parties eventually agree to drop it.',
        effect: (p) => { p.mo -= 8000; p.m -= 8; p.setMem('civilSuit', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_sue_someone',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem.hasFiledSuit && G.money > 5000 && G.age >= 28,
    text: (G) => {
      const archetype = G.character.country.archetype
      if (archetype === 'wealthy_west' && G.character.country.name === 'United States')
        return 'Your employer has illegally withheld wages for two years. The Employment Rights Center says you have a clear case.'
      if (['conflict_zone', 'developing_unstable', 'subsaharan'].includes(archetype))
        return 'A local official seized your property without compensation. The court system is unreliable, but an NGO offers legal support.'
      return 'A contractor did substandard work that cost you significantly. Your solicitor says the case is strong.'
    },
    choices: [
      {
        text: 'File the suit',
        tag: null,
        outcome: (G) => ['conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype)
          ? 'The case stalls in a corrupt system. After two years and significant cost, you reach a partial settlement.'
          : 'The case takes eighteen months. You receive a settlement that partially covers your losses.',
        effect: (p) => { p.mo += 8000; p.m -= 5; p.setMem('hasFiledSuit', true); },
        inject: null,
      },
      {
        text: 'Negotiate directly first',
        tag: null,
        outcome: 'The other party agrees to a modest payment to avoid litigation. Faster and cheaper for everyone.',
        effect: (p) => { p.mo += 4000; p.m += 3; p.setMem('hasFiledSuit', true); },
        inject: null,
      },
      {
        text: 'Let it go — litigation is not worth it',
        tag: null,
        outcome: 'The decision saves time. The loss still stings.',
        effect: (p) => { p.r += 5; p.setMem('hasFiledSuit', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_divorce_settlement',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('divorced') && !G.mem.divorceSettled && G.money > 5000,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'The separation is mediated by community elders. Division of the household is decided collectively — and not always in your favour.'
      if (['post_soviet', 'developing_urban'].includes(G.character.country.archetype))
        return 'The divorce proceeds through court. Assets accumulated during marriage are to be split. The flat, the car, the savings account.'
      return 'The divorce settlement involves lawyers for both sides. Property, pension, custody — everything on the table.'
    },
    choices: [
      {
        text: 'Negotiate fairly and equitably',
        tag: null,
        outcome: 'The settlement is balanced. The relationship with your ex settles into something manageable.',
        effect: (p) => { p.mo -= 12000; p.m += 5; p.karma += 5; p.setMem('divorceSettled', true); },
        inject: null,
      },
      {
        text: 'Fight for the maximum',
        tag: null,
        outcome: 'The legal battle costs more than any gain. The animosity becomes permanent.',
        effect: (p) => { p.mo -= 20000; p.m -= 8; p.karma -= 5; p.setMem('divorceSettled', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── MENTAL HEALTH SYSTEM ─────────────────────────────────────────────────

  {
    id: 'ya_anxiety_diagnosis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.stats.happiness < 45 && !G.mentalHealth.condition && !G.mem.mhEvent1,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'The feeling has been there for years — a constant low hum of dread. No one in your community names it. But it is taking a toll on your body.'
      return 'The panic attacks started six months ago. A GP refers you to a mental health assessment. The diagnosis: generalised anxiety disorder.'
    },
    choices: [
      {
        text: 'Start therapy',
        tag: null,
        outcome: (G) => ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype)
          ? 'CBT helps. The progress is slow and measurable. You begin to understand the pattern.'
          : 'A community health worker offers limited support. It helps more than nothing.',
        effect: (p) => { p.m += 8; p.setMentalHealth({ condition: 'anxiety', therapy: true }); p.setMem('mhEvent1', true); },
        inject: null,
      },
      {
        text: 'Start medication',
        tag: null,
        outcome: 'The SSRI takes six weeks to work. When it does, the edge comes off.',
        effect: (p) => { p.m += 6; p.h -= 2; p.setMentalHealth({ condition: 'anxiety', medicating: true }); p.setMem('mhEvent1', true); },
        inject: null,
      },
      {
        text: 'Manage it without help',
        tag: null,
        outcome: 'Some days are manageable. Others are not. The condition shapes your choices without being named.',
        effect: (p) => { p.m -= 5; p.setMentalHealth({ condition: 'anxiety' }); p.setMem('mhEvent1', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ya_depression_episode',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.stats.happiness < 35 && !G.mentalHealth.condition && !G.mem.mhEvent1,
    text: (G) => {
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'You have not gotten out of bed properly in weeks. In your community, this is called laziness, or possession, or weakness. None of those names fit what it feels like.'
      return 'The depression arrives without warning and stays. Nothing gives pleasure. Everything takes effort. You call in sick more than you can afford to.'
    },
    choices: [
      {
        text: 'Seek professional help',
        tag: null,
        outcome: (G) => ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)
          ? 'A combination of therapy and medication slowly rebuilds function. It takes nearly a year.'
          : 'Access is limited. A traditional healer and family support carry most of the weight.',
        effect: (p) => { p.m += 12; p.mo -= 2000; p.setMentalHealth({ condition: 'depression', therapy: true }); p.setMem('mhEvent1', true); },
        inject: null,
      },
      {
        text: 'Tell a trusted person',
        tag: null,
        outcome: 'Speaking it aloud makes it real in a different way. Their response is imperfect. It helps anyway.',
        effect: (p) => { p.m += 5; p.setMentalHealth({ condition: 'depression' }); p.setMem('mhEvent1', true); },
        inject: null,
      },
      {
        text: 'Say nothing and push through',
        tag: null,
        outcome: 'Function returns, partially. The episode leaves its residue.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.setMentalHealth({ condition: 'depression' }); p.setMem('mhEvent1', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_mental_health_relapse',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.mentalHealth.condition && !G.mem.mhRelapse,
    text: (G) => `Your ${G.mentalHealth.condition === 'anxiety' ? 'anxiety' : 'depression'} has returned after years of stability. A combination of work pressure and a difficult year has triggered it.`,
    choices: [
      {
        text: 'Return to treatment immediately',
        tag: null,
        outcome: 'Catching it early makes the difference. Recovery is faster than before.',
        effect: (p) => { p.m += 10; p.mo -= 2000; p.setMem('mhRelapse', true); },
        inject: null,
      },
      {
        text: 'Try to manage it yourself this time',
        tag: null,
        outcome: 'Harder than you remembered. The episode deepens before it lifts.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.setMem('mhRelapse', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_mental_health_stability',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.mentalHealth.condition && (G.mentalHealth.therapy || G.mentalHealth.medicating) && !G.mem.mhStability,
    text: 'You have maintained your mental health actively for several years. The tools are familiar now. The language to describe what you experience has become part of you.',
    choices: [
      {
        text: 'Consider reducing medication with your doctor',
        tag: null,
        outcome: 'The taper is slow and supervised. You maintain stability. The credit is shared.',
        effect: (p) => { p.m += 8; p.setMentalHealth({ medicating: false }); p.setMem('mhStability', true); },
        inject: null,
      },
      {
        text: 'Maintain the current treatment — it works',
        tag: null,
        outcome: 'Stability is not nothing. You know what it cost to get here.',
        effect: (p) => { p.m += 5; p.setMem('mhStability', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── HOBBY SKILL PROGRESSION ──────────────────────────────────────────────

  {
    id: 'ch_hobby_discovery',
    phase: 'childhood',
    weight: 4,
    when: (G) => Object.keys(G.hobbies).length === 0,
    text: 'A hobby catches you. Something you pick up almost by accident becomes something you look forward to.',
    choices: [
      { text: 'Music — learn an instrument', tag: null, outcome: 'You begin on a second-hand guitar. The calluses form slowly.', effect: (p) => { p.practiceHobby('music', 10); p.setMem('primaryHobby', 'music'); p.m += 5; }, inject: null },
      { text: 'Drawing and painting', tag: null, outcome: 'You fill notebooks with drawings. A teacher notices.', effect: (p) => { p.practiceHobby('art', 10); p.setMem('primaryHobby', 'art'); p.m += 5; p.e += 3; }, inject: null },
      { text: 'Sport — choose your game', tag: null, outcome: 'The physical discipline shapes your body and your character.', effect: (p) => { p.practiceHobby('sport', 10); p.setMem('primaryHobby', 'sport'); p.h += 5; p.m += 3; }, inject: null },
      { text: 'Reading and writing', tag: null, outcome: 'Libraries become your favourite places. Words are where you live.', effect: (p) => { p.practiceHobby('writing', 10); p.setMem('primaryHobby', 'writing'); p.e += 5; p.m += 3; p.addFlag('bookworm'); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ya_hobby_deepening',
    phase: 'young_adult',
    weight: 3,
    when: (G) => Object.values(G.hobbies).some(v => v >= 10) && Object.values(G.hobbies).every(v => v < 40),
    text: (G) => {
      const hobby = G.mem.primaryHobby ?? Object.entries(G.hobbies).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'your craft'
      const hobbyName = { music: 'music', art: 'painting', sport: 'sport', writing: 'writing', cooking: 'cooking', coding: 'programming' }[hobby] ?? hobby
      return `You have stuck with ${hobbyName} long enough to get past beginner frustration. The improvement is visible — to you and others.`
    },
    choices: [
      {
        text: 'Commit — practice daily',
        tag: null,
        outcome: 'The hours accumulate. The skill compounds.',
        effect: (p) => {
          const hobby = p.mem.primaryHobby ?? 'general'
          p.practiceHobby(hobby, 20); p.m += 6; p.e += 3;
        },
        inject: null,
      },
      {
        text: 'Keep it casual — enjoy it without pressure',
        tag: null,
        outcome: 'Progress slows, but you love it more for having no stakes.',
        effect: (p) => {
          const hobby = p.mem.primaryHobby ?? 'general'
          p.practiceHobby(hobby, 8); p.m += 8;
        },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ya_hobby_music_performance',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.hobbies.music ?? 0) >= 30 && !G.mem.musicPerformed,
    text: (G) => {
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'You are asked to play at a community event — a wedding, a local ceremony. Your music is known in the neighbourhood.'
      return 'An open mic night. Your name is on the list. You have been building to this for years.'
    },
    choices: [
      { text: 'Play — face the fear', tag: null, outcome: 'The performance is imperfect and real. The applause is small and enormous.', effect: (p) => { p.m += 12; p.s += 3; p.practiceHobby('music', 10); p.setMem('musicPerformed', true); }, inject: null },
      { text: 'Pull out at the last minute', tag: null, outcome: 'The regret is immediate. You reschedule in your head a dozen times.', effect: (p) => { p.m -= 5; p.r += 6; p.setMem('musicPerformed', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'mid_hobby_mastery',
    phase: 'midlife',
    weight: 2,
    when: (G) => Object.values(G.hobbies).some(v => v >= 60) && !G.mem.hobbyMaster,
    text: (G) => {
      const hobby = G.mem.primaryHobby ?? Object.entries(G.hobbies).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'your craft'
      const hobbyName = { music: 'music', art: 'visual art', sport: 'your sport', writing: 'writing', cooking: 'cooking', coding: 'programming' }[hobby] ?? hobby
      return `Decades of practice have made you genuinely accomplished at ${hobbyName}. People who know their craft recognise yours.`
    },
    choices: [
      { text: 'Teach it — pass it on', tag: 'mentor', outcome: 'Students come. Some surpass you. That turns out to be the best part.', effect: (p) => { p.m += 12; p.karma += 10; p.addFlag('mentor'); p.setMem('hobbyMaster', true); }, inject: null },
      { text: 'Keep it for yourself — some things should stay private', tag: null, outcome: 'The solitude of the practice remains its own reward.', effect: (p) => { p.m += 8; p.setMem('hobbyMaster', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ya_coding_hobby',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1995 && !G.hobbies.coding && G.stats.smarts >= 55,
    text: (G) => G.currentYear >= 2010
      ? 'A free coding bootcamp opens nearby. You attend out of curiosity.'
      : `You start teaching yourself to program from library books${G.currentYear >= 2000 ? ' and online forums' : ''}.`,
    choices: [
      { text: 'Invest serious time in it', tag: null, outcome: 'The logic clicks. You build small things that actually work. The satisfaction is unlike anything else.', effect: (p) => { p.practiceHobby('coding', 20); p.e += 8; p.m += 5; }, inject: null },
      { text: 'Try it and move on', tag: null, outcome: 'Not for you — at least not right now.', effect: (p) => { p.practiceHobby('coding', 5); p.e += 2; }, inject: null },
    ],
    effect: null,
  },

  // ── CHILDHOOD DEPTH ──────────────────────────────────────────────────────

  {
    id: 'ch_first_best_friend_deep',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 7 && G.age <= 10 && !G.mem.firstFriend && G.stats.charisma <= 30,
    text: (G) => {
      if (['subsaharan', 'conflict_zone'].includes(G.character.country.archetype))
        return 'A child in your neighbourhood becomes your constant companion. You spend every daylight hour together.'
      return 'You meet someone at school who gets you immediately. You spend every weekend together. A genuine friendship begins.'
    },
    choices: [
      { text: 'Become inseparable', tag: 'has_close_friend', outcome: 'The friendship shapes who you become. Some friendships are formative.', effect: (p) => { p.m += 10; p.addFlag('has_close_friend'); p.makeFriend(70); p.setMem('firstFriend', true); }, inject: null },
      { text: 'Keep it casual — you have many friends', tag: null, outcome: 'A broad social circle forms. Roots are shallower.', effect: (p) => { p.m += 5; p.setMem('firstFriend', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ch_bullied_at_school',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem.bullyingEvent,
    text: (G) => {
      if (['conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'An older child in school has decided you are a target. Your possessions are taken. You dread the walk home.'
      return 'A group at school has made you their target. Every day is an exercise in dread management.'
    },
    choices: [
      { text: 'Tell a trusted adult', tag: null, outcome: 'The intervention is imperfect. It helps. The bullying slows.', effect: (p) => { p.m -= 5; p.setMem('bullyingEvent', true); }, inject: null },
      { text: 'Stand up to them directly', tag: null, outcome: 'The confrontation goes both ways. Eventually they find a different target.', effect: (p) => { p.h -= 5; p.m += 4; p.setMem('bullyingEvent', true); }, inject: null },
      { text: 'Endure it alone', tag: null, outcome: 'You develop a quiet toughness. The social wound takes years to close.', effect: (p) => { p.m -= 10; p.e += 3; p.setMem('bullyingEvent', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ch_sibling_rivalry',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 8 && !G.mem.siblingRivalryEvent,
    text: (G) => {
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Resources are scarce. The sibling closest to you in age gets the school shoes. You get them next year. The dynamic settles early.'
      return 'Your sibling consistently outperforms you at school. Your parents\' praise for them lands differently each time.'
    },
    choices: [
      { text: 'Work harder to compete', tag: null, outcome: 'The competition drives you. The relationship is complicated but alive.', effect: (p) => { p.e += 5; p.m -= 3; p.setMem('siblingRivalryEvent', true); }, inject: null },
      { text: 'Find your own thing', tag: null, outcome: 'You stop competing on their terms. Your own identity emerges.', effect: (p) => { p.m += 5; p.setMem('siblingRivalryEvent', true); }, inject: null },
      { text: 'Grow resentful', tag: null, outcome: 'The resentment becomes part of the family furniture. It outlives the original cause.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('siblingRivalryEvent', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ch_pocket_money_lesson',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 9 && G.age <= 12 && !G.mem.moneyLesson,
    text: (G) => {
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'You earn a small sum helping at the market or running errands. It is the first money you have ever held that was yours.'
      return 'You get pocket money for the first time. The question is immediate: spend it now, or save it for something bigger?'
    },
    choices: [
      { text: 'Save it for something you really want', tag: null, outcome: 'The discipline of waiting teaches something permanent.', effect: (p) => { p.w += 3; p.e += 2; p.setMem('moneyLesson', true); }, inject: null },
      { text: 'Spend it immediately — joy now', tag: null, outcome: 'The pleasure is real and brief. You learn what immediate gratification feels like.', effect: (p) => { p.m += 5; p.setMem('moneyLesson', true); }, inject: null },
      { text: 'Share it with a friend or sibling', tag: null, outcome: 'Generosity, at its most instinctive.', effect: (p) => { p.karma += 5; p.m += 3; p.setMem('moneyLesson', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ch_conflict_zone_displacement',
    phase: 'childhood',
    weight: 5,
    when: (G) => ['conflict_zone'].includes(G.character.country.archetype) && G.age >= 6 && G.age <= 12 && !G.mem.displaced,
    text: (G) => `Fighting reaches ${G.character.country.name}. Your family packs what they can carry and moves. You leave school, your neighbourhood, the grave of your grandparent.`,
    choices: [
      {
        text: 'Accept the disruption with resilience',
        tag: null,
        outcome: 'You adapt faster than the adults. That adaptation costs something invisible.',
        effect: (p) => { p.m -= 10; p.e += 3; p.addFlag('refugee'); p.setMem('displaced', true); },
        inject: null,
      },
      {
        text: 'Grieve what was lost',
        tag: null,
        outcome: 'The grief is real and processed, slowly. You carry the memory of the old life intact.',
        effect: (p) => { p.m -= 15; p.r += 5; p.addFlag('refugee'); p.setMem('displaced', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── ADOLESCENCE DEPTH ────────────────────────────────────────────────────

  {
    id: 'ad_first_relationship',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem.firstRelationship,
    text: (G) => {
      if (['wealthy_gulf', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'You develop feelings for someone. The social and family rules around relationships at your age are strict — this stays entirely private.'
      return 'Your first real relationship. Everything feels enormous.'
    },
    choices: [
      {
        text: 'Pursue it — tell them how you feel',
        tag: null,
        outcome: (G) => ['wealthy_gulf', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype)
          ? 'The relationship is conducted in secret. The concealment adds its own weight.'
          : 'They feel the same way. The first relationship is sweet and brief and educational.',
        effect: (p) => { p.m += 8; p.s += 3; p.setMem('firstRelationship', true); },
        inject: null,
      },
      {
        text: 'Say nothing — the timing is wrong',
        tag: null,
        outcome: 'The moment passes. You wonder sometimes what might have been.',
        effect: (p) => { p.r += 5; p.m -= 2; p.setMem('firstRelationship', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ad_academic_pressure',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem.academicPressureEvent,
    text: (G) => {
      if (['wealthy_east'].includes(G.character.country.archetype))
        return `In ${G.character.country.name}, the exam season is existential. Your family's expectations and the national exam system converge on this single period.`
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'You are the first in your family to reach secondary school. Failing these exams would mean not just your failure but a kind of communal disappointment.'
      return 'Final exams are approaching. The stakes feel absolute, though they are not quite.'
    },
    choices: [
      { text: 'Study intensively — sacrifice everything else', tag: null, outcome: 'The grades are good. The burnout is real. You cross the line.', effect: (p) => { p.e += 8; p.h -= 5; p.m -= 5; p.setMem('academicPressureEvent', true); }, inject: null },
      { text: 'Study hard but keep balance', tag: null, outcome: 'Decent results. A healthier crossing of the finish line.', effect: (p) => { p.e += 5; p.m += 3; p.setMem('academicPressureEvent', true); }, inject: null },
      { text: 'Struggle — the pressure is too much', tag: null, outcome: 'The grades are below what was expected. The fallout varies by household.', effect: (p) => { p.e -= 3; p.m -= 10; p.setMem('academicPressureEvent', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ad_first_job',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem.firstJob,
    text: (G) => {
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'School ends at three. The rest of the day you work — a market stall, carrying goods, domestic work. The money goes to the household.'
      return 'Your first part-time job. The pay is negligible. The independence is not.'
    },
    choices: [
      { text: 'Work hard and save', tag: null, outcome: 'The discipline forms early. The money is real.', effect: (p) => { p.mo += 500; p.w += 3; p.m += 5; p.setMem('firstJob', true); }, inject: null },
      { text: 'Work the minimum and spend freely', tag: null, outcome: 'The experience is more social than financial. Still worth it.', effect: (p) => { p.m += 7; p.setMem('firstJob', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ad_identity_question',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 18 && !G.mem.identityEvent,
    text: (G) => {
      if (['conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Amid the instability, the question of who you are feels both trivial and urgent. Your identity is partly defined by what you have survived. What else does it contain?'
      return 'Adolescence requires you to decide who you are — or at least to perform that decision. The pressure to fit a category is real.'
    },
    choices: [
      { text: 'Conform to what is expected — it is easier', tag: null, outcome: 'The path is smooth. Something stays undiscovered for now.', effect: (p) => { p.m -= 3; p.setMem('identityEvent', true); }, inject: null },
      { text: 'Explore — question everything', tag: null, outcome: 'The self that emerges is more genuinely yours. The path is rockier.', effect: (p) => { p.e += 5; p.m -= 3; p.setMem('identityEvent', true); }, inject: null },
      { text: 'Keep a private self and a public one', tag: null, outcome: 'The split becomes a skill. Not always a healthy one.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('identityEvent', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ad_substance_first',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 18 && !G.mem.substanceFirstEvent,
    text: (G) => {
      if (['conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'In a place where adults drink to forget, alcohol or khat reaches you young. There is little protective infrastructure around it.'
      return 'At a party, substances are present. The social pressure is subtle and constant.'
    },
    choices: [
      {
        text: 'Try it — everyone is',
        tag: null,
        outcome: (G) => G.currentYear >= 2000 ? 'The experience is mild. You add it to your reference points.' : 'The experience is more disorienting than expected. You learn something about your body.',
        effect: (p) => { p.m += 3; p.h -= 3; p.setMem('substanceFirstEvent', true); },
        inject: null,
      },
      {
        text: 'Decline — not for you',
        tag: null,
        outcome: 'The social cost is minor. The self-knowledge is worth it.',
        effect: (p) => { p.m += 2; p.karma += 3; p.setMem('substanceFirstEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── RELATIONSHIP DEPTH ───────────────────────────────────────────────────

  {
    id: 'ya_relationship_long_distance',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.partner && !G.partner.married && G.age >= 22 && G.age <= 32 && !G.mem.ldRelationship,
    text: 'Work or study separates you and your partner for an extended period. Long distance. Two lives that are not quite aligned.',
    choices: [
      { text: 'Make it work — regular calls, planned visits', tag: null, outcome: 'The relationship survives the distance. The test was real.', effect: (p) => { p.m += 5; p.setMem('ldRelationship', true); }, inject: null },
      { text: 'Let it drift — the distance reveals the limits', tag: null, outcome: 'The relationship fades without a clean ending. That turns out to be its own kind of ending.', effect: (p) => { p.m -= 8; p.clearPartner(); p.setMem('ldRelationship', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'mid_marriage_milestone',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner?.married && G.age >= 40 && !G.mem.marriageMilestone,
    text: (G) => {
      const years = G.age - (G.partner.metAt ?? G.age - 10)
      if (['wealthy_east', 'wealthy_gulf', 'developing_unstable'].includes(G.character.country.archetype))
        return `You mark ${years} years of marriage. The family gathers. The years are counted as an achievement and an obligation both.`
      return `${years} years together. A milestone, or just another Tuesday. You find yourselves asking what comes next.`
    },
    choices: [
      { text: 'Renew your commitment — deliberately', tag: 'strong_marriage', outcome: 'The gesture is small. Its meaning is not.', effect: (p) => { p.m += 10; p.addFlag('strong_marriage'); p.setMem('marriageMilestone', true); }, inject: null },
      { text: 'Keep going as you are — stability is enough', tag: null, outcome: 'Comfortable and real. Not all marriages need a ceremony to survive.', effect: (p) => { p.m += 5; p.setMem('marriageMilestone', true); }, inject: null },
      { text: 'Acknowledge the drift and address it', tag: null, outcome: 'The conversation is overdue. It helps.', effect: (p) => { p.m += 7; p.setMem('marriageMilestone', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'mid_infidelity_discovered',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner?.married && !G.mem.infidelityEvent && G.age >= 35,
    text: (G) => {
      if (['wealthy_gulf', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype))
        return 'You discover your spouse has been unfaithful. In your community, the shame attached to this — and the options available to you — are shaped by forces larger than the two of you.'
      return 'You find out your partner has been unfaithful. The information arrives without warning and rearranges everything.'
    },
    choices: [
      {
        text: 'Confront them and try to repair it',
        tag: null,
        outcome: 'The repair is possible but long. Trust is rebuilt brick by brick.',
        effect: (p) => { p.m -= 12; p.r += 5; p.setMem('infidelityEvent', true); },
        inject: null,
      },
      {
        text: 'End the marriage',
        tag: null,
        outcome: 'The decision is clear, if not easy. The aftermath is complex.',
        effect: (p) => { p.m -= 15; p.clearPartner(); p.addFlag('divorced'); p.setMem('infidelityEvent', true); },
        inject: null,
      },
      {
        text: 'Say nothing — preserve the household',
        tag: null,
        outcome: (G) => ['wealthy_gulf', 'developing_unstable'].includes(G.character.country.archetype)
          ? 'The choice is shaped by pragmatism. The silence becomes the new normal.'
          : 'You absorb it. The relationship continues. The knowledge changes you.',
        effect: (p) => { p.m -= 15; p.r += 12; p.setMem('infidelityEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_empty_nest',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children.length > 0 && G.age >= 48 && !G.mem.emptyNest && G.children.every(c => (G.age - c.ageAtBirth) >= 18),
    text: (G) => {
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Your children have gone to seek work in the city. The house is quieter than it has ever been. You built a life around them.'
      return 'The last child leaves for university. The house is suddenly, absolutely quiet.'
    },
    choices: [
      { text: 'Rediscover who you are outside of parenthood', tag: null, outcome: 'The transition is strange and then liberating.', effect: (p) => { p.m += 5; p.e += 3; p.setMem('emptyNest', true); }, inject: null },
      { text: 'Fill the space with work or purpose', tag: null, outcome: 'The activity manages the transition.', effect: (p) => { p.m += 3; p.setMem('emptyNest', true); }, inject: null },
      { text: 'Grieve the loss of that phase', tag: null, outcome: 'The grief is real and legitimate. It passes.', effect: (p) => { p.m -= 5; p.r += 3; p.setMem('emptyNest', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'mid_career_plateau',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career && G.age >= 42 && !G.mem.careerPlateau,
    text: (G) => {
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return `After years in your role, opportunities for advancement in ${G.character.country.name} are limited by who you know as much as what you do. The ceiling is structural.`
      return 'You have been at the same level for five years. The promotions that seemed inevitable have not arrived. The question is whether to push harder or reassess.'
    },
    choices: [
      { text: 'Look for opportunities elsewhere', tag: null, outcome: 'The move costs relationships. It gains you momentum.', effect: (p) => { p.mo += 8000; p.m += 5; p.setMem('careerPlateau', true); }, inject: null },
      { text: 'Invest in new skills — refresh your value', tag: null, outcome: 'The upskilling takes time. It pays off in two years.', effect: (p) => { p.e += 8; p.m += 3; p.setMem('careerPlateau', true); }, inject: null },
      { text: 'Accept it — stability over advancement', tag: null, outcome: 'The ambition quiets. The life outside work expands.', effect: (p) => { p.m += 5; p.r += 3; p.setMem('careerPlateau', true); }, inject: null },
    ],
    effect: null,
  },

  {
    id: 'ya_cooking_hobby',
    phase: 'young_adult',
    weight: 3,
    when: (G) => !G.hobbies.cooking && !G.flags.includes('career_chef'),
    text: (G) => {
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype))
        return 'You grew up watching your grandmother cook. Now you have your own kitchen — however small — and you begin recreating her recipes from memory.'
      return 'A cooking class, a gifted cookbook, or simply the need to feed yourself better. You start cooking seriously.'
    },
    choices: [
      {
        text: 'Follow traditional recipes from your culture',
        tag: null,
        outcome: 'The flavours are memory itself. Others gather around your table.',
        effect: (p) => { p.practiceHobby('cooking', 15); p.m += 8; p.h += 3; },
        inject: null,
      },
      {
        text: 'Experiment and try new techniques',
        tag: null,
        outcome: 'Some disasters. Some revelations. Your palate develops.',
        effect: (p) => { p.practiceHobby('cooking', 12); p.m += 6; p.e += 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  // DEBT SYSTEM EVENTS
  {
    id: 'ya_personal_loan',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.money < 2000 && !G.debt && G.age >= 18 && !G.mem.hadLoan,
    text: (G) => {
      if (['developing_unstable','conflict_zone','subsaharan'].includes(G.character.country.archetype))
        return 'A money lender in the neighbourhood offers cash — no bank, no paperwork, high interest. You need it.'
      return 'The bank approves a personal loan. The interest rate is 18%. The need is real.'
    },
    choices: [
      { text: 'Take the loan', tag: null, outcome: 'Cash in hand. The repayments begin immediately.', effect: (p) => { p.mo += 5000; p.setMem('hadLoan', true); p.setMem('debtType', 'personal'); }, inject: null },
      { text: 'Decline — manage without it', tag: null, outcome: 'Tight but yours.', effect: (p) => { p.setMem('hadLoan', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_debt_spiral',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.debt > 15000 && !G.mem.debtSpiral,
    text: (G) => {
      if (['developing_unstable','subsaharan','conflict_zone'].includes(G.character.country.archetype))
        return 'The informal lender sends collectors. The debt has grown with interest you did not fully understand when you signed.'
      return 'Credit card debt, a personal loan, and an overdue car payment are converging. The minimum payments are not touching the principal.'
    },
    choices: [
      { text: 'Seek debt counselling', tag: null, outcome: 'A payment plan is negotiated. It takes five years. You finish it.', effect: (p) => { p.mo -= 2000; p.m += 5; p.setMem('debtSpiral', true); }, inject: null },
      { text: 'Ignore it and keep spending', tag: null, outcome: 'The interest compounds. The calls increase.', effect: (p) => { p.m -= 8; p.setMem('debtSpiral', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_bankruptcy',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.debt > 30000 && G.money < 0 && !G.flags.includes('bankrupt'),
    text: (G) => {
      if (['wealthy_west'].includes(G.character.country.archetype))
        return 'A bankruptcy attorney explains Chapter 7. The debt is dischargeable. The credit record is not.'
      return 'The court declares you insolvent. Assets are liquidated. Debts are restructured. You start again from near zero.'
    },
    choices: [
      { text: 'File for bankruptcy', tag: 'bankrupt', outcome: 'The relief is immediate. The stigma is long.', effect: (p) => { p.addFlag('bankrupt'); p.mo += 5000; p.setMem('debtType', null); }, inject: null },
      { text: 'Try to negotiate with creditors', tag: null, outcome: 'Some agree. Some don\'t. The hole is smaller.', effect: (p) => { p.mo += 2000; p.m -= 10; }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_loan_shark',
    phase: 'young_adult',
    weight: 2,
    when: (G) => ['developing_unstable','conflict_zone','subsaharan'].includes(G.character.country.archetype) && G.money < 500 && !G.mem.loanShark,
    text: 'A loan shark offers fast money at terms that sound manageable. They are not.',
    choices: [
      { text: 'Take it — you have no choice', tag: null, outcome: 'The money solves the immediate crisis. The collector arrives six weeks later.', effect: (p) => { p.mo += 2000; p.m -= 5; p.setMem('loanShark', true); p.setMem('debtType', 'personal'); }, inject: null },
      { text: 'Refuse', tag: null, outcome: 'You find another way. Barely.', effect: (p) => { p.m -= 5; p.setMem('loanShark', true); }, inject: null },
    ],
    effect: null,
  },

  // FRIEND SYSTEM EVENTS
  {
    id: 'ya_friend_crisis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && !G.mem.friendCrisis,
    text: (G) => `${G.friends[0]?.name ?? 'A close friend'} calls at midnight. Something has gone badly wrong — a relationship collapse, a mental health crisis, an arrest.`,
    choices: [
      { text: 'Drop everything and go to them', tag: 'compassionate', outcome: 'You are there. It is enough. The friendship deepens permanently.', effect: (p) => { p.m -= 3; p.karma += 10; p.addFlag('has_close_friend'); p.setMem('friendCrisis', true); }, inject: null },
      { text: 'Offer support by phone', tag: null, outcome: 'You do what you can. The distance registers.', effect: (p) => { p.m -= 2; p.setMem('friendCrisis', true); }, inject: null },
      { text: 'You cannot deal with it right now', tag: null, outcome: 'The missed call becomes a missed moment. The friendship cools.', effect: (p) => { p.r += 8; p.setMem('friendCrisis', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_friend_betrayal',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && !G.mem.friendBetrayal,
    text: (G) => `${G.friends[0]?.name ?? 'A longtime friend'} has spoken behind your back to your employer — details you shared in confidence. You hear it secondhand.`,
    choices: [
      { text: 'Confront them directly', tag: null, outcome: 'The conversation is brutal. The friendship ends or transforms.', effect: (p) => { p.m -= 10; p.setMem('friendBetrayal', true); }, inject: null },
      { text: 'Say nothing and create distance', tag: null, outcome: 'The friendship fades quietly. You never say why.', effect: (p) => { p.m -= 6; p.r += 5; p.setMem('friendBetrayal', true); }, inject: null },
      { text: 'Forgive them — people are complicated', tag: null, outcome: 'The forgiveness is real. The trust adjusts accordingly.', effect: (p) => { p.karma += 8; p.m -= 3; p.setMem('friendBetrayal', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_friend_wedding',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && !G.mem.friendWedding && G.age >= 24,
    text: (G) => {
      const name = G.friends[0]?.name ?? 'Your best friend'
      if (['subsaharan','developing_unstable'].includes(G.character.country.archetype))
        return `${name} is getting married. The celebration will last three days. You are asked to play a central role.`
      return `${name} is getting married and asks you to be their best person. The speech. The stag/hen. All of it.`
    },
    choices: [
      { text: 'Embrace it fully', tag: null, outcome: 'The wedding is chaotic and wonderful. The friendship enters its next chapter.', effect: (p) => { p.m += 10; p.setMem('friendWedding', true); }, inject: null },
      { text: 'Attend but stay at the edges', tag: null, outcome: 'You are there. The friendship is maintained if not deepened.', effect: (p) => { p.m += 4; p.setMem('friendWedding', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_friend_death',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 45 && !G.mem.friendDied,
    text: (G) => `${G.friends[0]?.name ?? 'A close friend'} has died — unexpectedly, suddenly. The call comes on an ordinary Tuesday.`,
    choices: [
      { text: 'Attend the funeral and be present for the family', tag: null, outcome: 'The grief is real. The presence matters. Something in your own sense of time shifts.', effect: (p) => { p.m -= 15; p.r += 5; p.setMem('friendDied', true); }, inject: null },
      { text: 'Grieve privately', tag: null, outcome: 'You mourn alone. The loss sits with you for months.', effect: (p) => { p.m -= 10; p.setMem('friendDied', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_old_friend_reconnect',
    phase: 'midlife',
    weight: 3,
    when: (G) => !G.mem.friendReconnect && G.age >= 35,
    text: 'A message arrives from someone you knew decades ago — a childhood friend, a college roommate, someone who disappeared from your life. They found you online.',
    choices: [
      { text: 'Respond and meet up', tag: null, outcome: 'The catch-up is strange and warm. You remember a version of yourself through them.', effect: (p) => { p.m += 8; p.makeFriend(60); p.setMem('friendReconnect', true); }, inject: null },
      { text: 'Reply warmly but keep it to messages', tag: null, outcome: 'The connection is real, if contained.', effect: (p) => { p.m += 4; p.setMem('friendReconnect', true); }, inject: null },
      { text: 'Leave the message unread', tag: null, outcome: 'Some doors stay closed for a reason.', effect: (p) => { p.setMem('friendReconnect', true); }, inject: null },
    ],
    effect: null,
  },

  // FITNESS EVENTS
  {
    id: 'mid_fitness_wake_up',
    phase: 'midlife',
    weight: 3,
    when: (G) => (G.fitness ?? 50) < 35 && G.age >= 38 && !G.mem.fitnessWakeUp,
    text: (G) => {
      if (['subsaharan','developing_unstable','conflict_zone'].includes(G.character.country.archetype))
        return 'Climbing the stairs leaves you breathless at 40. Your body is telling you something you have been ignoring.'
      return 'A routine health check returns numbers your doctor calls "concerning". Blood pressure, resting heart rate, weight — all trending wrong.'
    },
    choices: [
      { text: 'Make real changes — diet and exercise', tag: 'health_conscious', outcome: 'The changes are slow and permanent. Your body responds over two years.', effect: (p) => { p.h += 8; p.setMem('fitnessWakeUp', true); p.addFlag('health_conscious'); }, inject: null },
      { text: 'Make temporary changes', tag: null, outcome: 'The gym membership lasts six weeks.', effect: (p) => { p.h += 2; p.setMem('fitnessWakeUp', true); }, inject: null },
      { text: 'Ignore it', tag: null, outcome: 'The body continues its trend.', effect: (p) => { p.h -= 5; p.setMem('fitnessWakeUp', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'ya_fitness_peak',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.fitness ?? 50) >= 75 && G.age >= 22 && G.age <= 30 && !G.mem.fitnessPeak,
    text: 'You are in the best shape of your life. The discipline has become identity.',
    choices: [
      { text: 'Enter a competition or challenge', tag: null, outcome: 'You place. The result matters less than the attempt.', effect: (p) => { p.m += 10; p.s += 4; p.setMem('fitnessPeak', true); }, inject: null },
      { text: 'Keep it personal — this is for you', tag: null, outcome: 'The practice remains yours. The health dividend is real.', effect: (p) => { p.m += 6; p.h += 5; p.setMem('fitnessPeak', true); }, inject: null },
    ],
    effect: null,
  },

  // FAME EVENTS
  {
    id: 'ya_tabloid_scandal',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.fame ?? 0) >= 40 && !G.mem.tabloidEvent,
    text: (G) => {
      if (['wealthy_east'].includes(G.character.country.archetype))
        return 'A gossip magazine publishes fabricated stories about your private life. In this industry, image is revenue.'
      return 'A tabloid has published a story about you — half true, half fabrication, entirely damaging.'
    },
    choices: [
      { text: 'Ignore it — engagement only amplifies it', tag: null, outcome: 'It dies in a week. The internet moves on.', effect: (p) => { p.m -= 5; p.setMem('tabloidEvent', true); }, inject: null },
      { text: 'Sue for defamation', tag: null, outcome: 'The legal threat produces a retraction. The legal costs are real.', effect: (p) => { p.mo -= 15000; p.m += 5; p.setMem('tabloidEvent', true); }, inject: null },
      { text: 'Use it — any publicity is publicity', tag: null, outcome: 'The notoriety converts to followers. Something in you shifts.', effect: (p) => { p.m -= 5; p.setMem('tabloidEvent', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_fan_encounter',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.fame ?? 0) >= 50 && !G.mem.fanEncounter,
    text: (G) => {
      if (['wealthy_east'].includes(G.character.country.archetype))
        return 'A fan outside the venue has been waiting for hours. Their dedication is unnerving and moving at once.'
      return 'A fan approaches you in a coffee shop. They are shaking. You are the reason they got through a difficult year.'
    },
    choices: [
      { text: 'Give them a full ten minutes', tag: 'compassionate', outcome: 'The moment costs you nothing significant. It means everything to them.', effect: (p) => { p.m += 8; p.karma += 10; p.setMem('fanEncounter', true); }, inject: null },
      { text: 'A brief, warm acknowledgement and move on', tag: null, outcome: 'The interaction is complete and kind.', effect: (p) => { p.m += 3; p.setMem('fanEncounter', true); }, inject: null },
      { text: 'Security removes them', tag: null, outcome: 'You see their face. It is not something you forget.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('fanEncounter', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_sponsorship_deal',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.fame ?? 0) >= 60 && G.career?.field === 'sports' || (G.fame ?? 0) >= 65,
    text: 'A major brand approaches your management with a sponsorship offer. The money is significant. The brand is… complicated.',
    choices: [
      { text: 'Accept — the money enables the work', tag: null, outcome: 'The deal pays for the next chapter of your career. The association lingers.', effect: (p) => { p.mo += 60000; p.m -= 3; p.setMem('sponsorship', true); }, inject: null },
      { text: 'Negotiate for a better brand fit', tag: null, outcome: 'A smaller deal, better aligned. You sleep better.', effect: (p) => { p.mo += 25000; p.m += 5; p.setMem('sponsorship', true); }, inject: null },
      { text: 'Decline — your image is not for sale', tag: 'integrity', outcome: 'The integrity dividend is real. So is the financial gap.', effect: (p) => { p.karma += 10; p.setMem('sponsorship', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_paparazzi',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.fame ?? 0) >= 55 && !G.mem.paparazziEvent,
    text: 'Photographers follow you from the venue to your car to your child\'s school. The intrusion is total.',
    choices: [
      { text: 'Establish firm boundaries — involve legal if needed', tag: null, outcome: 'The legal letters slow the intrusion. The fame remains.', effect: (p) => { p.mo -= 8000; p.m += 5; p.setMem('paparazziEvent', true); }, inject: null },
      { text: 'Engage — control the narrative yourself', tag: null, outcome: 'You manage your own image. The candid shots stop mattering.', effect: (p) => { p.m += 3; p.setMem('paparazziEvent', true); }, inject: null },
    ],
    effect: null,
  },

  // DIVORCE REALISM
  {
    id: 'mid_custody_battle',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('divorced') && G.children.length > 0 && !G.mem.custodyResolved,
    text: (G) => {
      if (['wealthy_gulf','developing_unstable'].includes(G.character.country.archetype))
        return 'The family court system is not neutral. Custody of the children will be shaped by custom and power as much as the law.'
      return 'The divorce settlement has come to a custody dispute. Both sides are dug in. The children are watching.'
    },
    choices: [
      { text: 'Mediation — put the children first', tag: null, outcome: 'The process is painful and productive. Shared custody is workable.', effect: (p) => { p.mo -= 5000; p.m -= 5; p.karma += 10; p.setMem('custodyResolved', true); }, inject: null },
      { text: 'Fight for full custody', tag: null, outcome: (G) => G.flags.includes('integrity') ? 'The court awards primary custody. The fight was worth it.' : 'The case drags on. The children endure the most.', effect: (p) => { p.mo -= 20000; p.m -= 12; p.setMem('custodyResolved', true); }, inject: null },
      { text: 'Cede custody — it is better for them', tag: null, outcome: 'The decision is selfless and corrosive at once. You see them on weekends.', effect: (p) => { p.m -= 15; p.r += 8; p.karma += 5; p.setMem('custodyResolved', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mid_child_support',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('divorced') && G.children.length > 0 && !G.mem.childSupportEvent && G.money < 5000,
    text: 'The child support payments are falling behind. The court will notice.',
    choices: [
      { text: 'Pay it — prioritise the children over everything', tag: null, outcome: 'The sacrifice is real. The relationship with your children is worth it.', effect: (p) => { p.mo -= 3000; p.m -= 5; p.karma += 8; p.setMem('childSupportEvent', true); }, inject: null },
      { text: 'Apply for a reduction based on changed circumstances', tag: null, outcome: 'The court adjusts the amount. The process takes months.', effect: (p) => { p.mo -= 1000; p.m -= 3; p.setMem('childSupportEvent', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'late_child_forgives_divorce',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.includes('divorced') && G.children.length > 0 && !G.mem.childForgivenDivorce,
    text: 'An adult child sits with you and says they understand now — the divorce, why it happened, what it cost everyone. They have carried it long enough.',
    choices: [
      { text: 'Receive it with full honesty', tag: null, outcome: 'The conversation takes three hours. Something long held loosens.', effect: (p) => { p.m += 15; p.r -= 10; p.setMem('childForgivenDivorce', true); }, inject: null },
      { text: 'Deflect — some things are better unexamined', tag: null, outcome: 'The moment passes. The weight remains distributed as before.', effect: (p) => { p.m += 4; p.setMem('childForgivenDivorce', true); }, inject: null },
    ],
    effect: null,
  },

  // ── MINIGAME-TRIGGERED EVENTS ─────────────────────────────────────────────

  {
    id: 'prison_escape_opportunity',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.inPrison && G.prisonSentence >= 3 && !G.mem.escapeAttempted,
    text: (G) => {
      if (['conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype))
        return 'A gap appears — a guard falls asleep, a door is left unlatched. The fence is twenty metres. You could run.'
      return 'During an outdoor work session, you spot it: a loose section of perimeter fencing and a blind spot in the camera coverage. A narrow window.'
    },
    choices: [
      {
        text: 'Attempt the escape',
        tag: null,
        outcome: 'You make your move.',
        minigame: { type: 'maze', difficulty: 'hard', title: 'Prison Break', description: 'Navigate to the perimeter before the guard returns.', successOutcome: 'You clear the fence and disappear into the night. Free, for now — though hunted.', failOutcome: 'You are caught in the yard. A year added to your sentence. The story spreads.', karmaHit: 0 },
        effect: (p) => { p.setMem('escapeAttempted', true); },
        inject: null,
      },
      {
        text: 'Stay — the risk is too great',
        tag: null,
        outcome: 'Wisdom or fear — you cannot be certain which. You serve your time.',
        effect: (p) => { p.m -= 5; p.setMem('escapeAttempted', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ya_bar_fight',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 18 && !G.mem.barFight,
    text: 'A confrontation at a bar escalates faster than expected. Someone throws a punch. You have half a second.',
    choices: [
      {
        text: 'Fight back',
        tag: null,
        outcome: 'You swing.',
        minigame: { type: 'fight', difficulty: 'normal', title: 'Bar Fight', description: 'Block, dodge, or punch. Read their move first.', enemyLabel: 'the aggressor', successOutcome: 'You give better than you get. They back off.', failOutcome: 'Bruised ribs, split lip. An expensive lesson.', karmaHit: -5 },
        effect: (p) => { p.setMem('barFight', true); },
        inject: null,
      },
      {
        text: 'De-escalate — hands up, step back',
        tag: null,
        outcome: 'You defuse it. Most of the room respects the move.',
        effect: (p) => { p.m += 3; p.karma += 5; p.setMem('barFight', true); },
        inject: null,
      },
      {
        text: 'Walk away',
        tag: null,
        outcome: 'Not your night. You leave before it becomes yours.',
        effect: (p) => { p.m += 2; p.setMem('barFight', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mid_corporate_hack_opportunity',
    phase: 'midlife',
    weight: 1,
    when: (G) => G.stats.smarts >= 65 && G.currentYear >= 2005 && !G.mem.corpHack && !G.inPrison,
    text: 'A former colleague sends an encrypted message. They have found a vulnerability in a corporate payroll system — clean, untraceable, and very profitable. They need your skills.',
    choices: [
      {
        text: 'Go in',
        tag: null,
        outcome: 'You boot up.',
        minigame: { type: 'hack', difficulty: 'hard', title: 'Corporate Breach', description: 'Six-layer sequence. One mistake and the trace begins.', successOutcome: '$200,000 moves across three anonymous accounts. Clean exit.', failOutcome: 'The system flags you at layer four. You close the terminal. The logs exist.', karmaHit: -15 },
        effect: (p) => { p.setMem('corpHack', true); p.karma -= 15; },
        inject: null,
      },
      {
        text: 'Delete the message',
        tag: 'integrity',
        outcome: 'Some opportunities you choose not to take. That choice is also a statement.',
        effect: (p) => { p.karma += 8; p.setMem('corpHack', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ch_lockpick_challenge',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 13 && !G.mem.lockpickEvent,
    text: 'You find a padlocked box that everyone says is empty. Curiosity turns into a challenge. Can you pick it open?',
    choices: [
      {
        text: 'Try to pick the lock',
        tag: null,
        outcome: 'You reach for a hairpin.',
        minigame: { type: 'lockpick', difficulty: 'easy', title: 'The Locked Box', description: 'Set each pin. Take your time.', successOutcome: 'The lid opens. Inside: old photographs, a letter, a key to something you haven\'t found yet.', failOutcome: 'The lock holds. The mystery remains.', karmaHit: 0 },
        effect: (p) => { p.e += 3; p.setMem('lockpickEvent', true); },
        inject: null,
      },
      {
        text: 'Leave it alone',
        tag: null,
        outcome: 'Some things are meant to stay closed.',
        effect: (p) => { p.setMem('lockpickEvent', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── ADDICTION ESCALATION — DRINKING ─────────────────────────────────────────
  {
    id: 'drinking_escalates',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('light_drinker') && !G.flags.includes('heavy_drinker') && !G.mem.drinking_escalate_shown && G.age >= 22,
    text: G => {
      const arch = G.character.country.archetype;
      if (arch === 'post_soviet') return 'Vodka has become a daily ritual. The bottle waits for you every evening after work, a reliable companion in a city where reliable companions are rare.';
      if (arch === 'conflict_zone') return 'Alcohol numbs the horrors you\'ve witnessed. Each drink pushes the memories a little further back — though they always return by dawn.';
      return 'You\'ve been leaning on wine more than usual after work. The glass at dinner became two, then the whole bottle, then reaching for a second before the week is out.';
    },
    isKey: true,
    choices: [
      {
        text: 'Cut back',
        tag: null,
        outcome: 'You pour the open bottle down the sink. It\'s harder than you expected.',
        effect: (p) => { p.h += 5; p.m += 5; p.setMem('drinking_escalate_shown', true); },
        inject: null,
      },
      {
        text: 'It\'s fine, everyone drinks',
        tag: null,
        outcome: 'You pour another glass and tell yourself it\'s social. The definition of social keeps expanding.',
        effect: (p) => { p.addFlag('heavy_drinker'); p.m -= 10; p.setMem('drinking_escalate_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'heavy_drinking_consequences',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('heavy_drinker') && !G.flags.includes('addiction') && G.age >= 25 && !G.mem.heavy_drinking_shown,
    text: 'The consequences are stacking up. Missed mornings. A warning at work. A friend who stopped calling. Your body is sending signals you\'ve been ignoring.',
    isKey: true,
    choices: [
      {
        text: 'Get help now',
        tag: null,
        outcome: 'You make the call you\'ve been putting off. The counsellor\'s voice is calm and unhurried.',
        effect: (p) => { p.h += 10; p.addFlag('seeking_help'); p.setMem('heavy_drinking_shown', true); },
        inject: null,
      },
      {
        text: 'I can handle it',
        tag: null,
        outcome: 'You tell yourself you\'ve handled worse. You haven\'t.',
        effect: (p) => { p.addFlag('addiction'); p.m -= 20; p.h -= 15; p.setMem('heavy_drinking_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'hitting_rock_bottom',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('addiction') && !G.mem.rock_bottom_shown && G.age >= 21,
    text: G => {
      const arch = G.character.country.archetype;
      if (['developing_urban', 'subsaharan', 'developing_unstable'].includes(arch)) return 'You spent your rent money on another binge. The landlord\'s notice is on the door. Your phone shows unanswered calls from family you\'ve been avoiding for months.';
      return 'You wake up in a stranger\'s apartment having missed an important presentation. Your phone has seventeen missed calls. The ceiling is unfamiliar. You don\'t know what day it is.';
    },
    isKey: true,
    choices: [
      {
        text: 'Check into rehab',
        tag: null,
        outcome: 'It costs money and dignity. It costs less than continuing.',
        effect: (p) => { p.mo -= 10000; p.h -= 5; p.setMem('rock_bottom_shown', true); p.addFlag('in_recovery'); },
        inject: null,
      },
      {
        text: 'This is as low as I go. I\'ll quit myself',
        tag: null,
        outcome: 'White-knuckling it. Every hour is a small war.',
        effect: (p) => { p.mo -= 0; p.m -= 15; p.h -= 10; p.setMem('rock_bottom_shown', true); },
        inject: null,
      },
      {
        text: 'Order another drink',
        tag: null,
        outcome: 'The bottom, it turns out, has a basement.',
        effect: (p) => { p.m -= 25; p.h -= 25; p.karma -= 5; p.setMem('rock_bottom_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'recovery_anniversary',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('in_recovery') && !G.mem.recovery_anniversary_shown && G.age >= 22,
    text: 'One year sober. Your sponsor hands you a chip the size of a coin. You turn it over in your fingers and think about the year it represents.',
    isKey: true,
    choices: [
      {
        text: 'Celebrate with your sponsor',
        tag: null,
        outcome: 'Coffee and cheap cake at the community hall. The most meaningful party you\'ve ever attended.',
        effect: (p) => { p.h += 20; p.karma += 10; p.setMem('recovery_anniversary_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'aa_meeting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('heavy_drinker') && !G.flags.includes('in_recovery') && !G.mem.aa_invited,
    text: 'Someone who\'s seen you at your worst pulls you aside. They hand you a folded piece of paper with an address and a time. "Just come once," they say. "You don\'t have to say anything."',
    choices: [
      {
        text: 'Go to the meeting',
        tag: null,
        outcome: 'You sit in the back. You listen. You hear yourself in other people\'s words.',
        effect: (p) => { p.h += 8; p.m += 5; p.setMem('aa_invited', true); p.addFlag('seeking_help'); },
        inject: null,
      },
      {
        text: 'Decline',
        tag: null,
        outcome: 'You pocket the paper and never take it out again.',
        effect: (p) => { p.h -= 3; p.setMem('aa_invited', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── GAMBLING ADDICTION ───────────────────────────────────────────────────────
  {
    id: 'gambling_addiction_spiral',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('addicted_gambling') || G.flags.includes('gambling_addiction')) && !G.mem.gambling_spiral_shown && G.age >= 18,
    text: G => {
      const arch = G.character.country.archetype;
      if (['wealthy_west', 'wealthy_gulf'].includes(arch)) return 'The casino knows your name now. The carpet, the lights, the sound of chips — they\'ve replaced everything else. You\'ve been calling in sick to bet on sports from your couch.';
      return 'The back-room betting shop is a second home. Illegal, yes, but always open, always welcoming when you have money. The debt has a face now — a man who knows where you live.';
    },
    isKey: true,
    choices: [
      {
        text: 'Seek help for gambling addiction',
        tag: null,
        outcome: 'The first step is admitting the cards are rigged. Always were.',
        effect: (p) => { p.h += 5; p.addFlag('gambling_recovery'); p.setMem('gambling_spiral_shown', true); },
        inject: null,
      },
      {
        text: 'One big win will fix everything',
        tag: null,
        outcome: 'There is no big win. There is only the next bet.',
        effect: (p) => { p.mo -= 2000; p.m -= 10; p.h -= 20; p.setMem('gambling_spiral_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'gambling_big_loss',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('addicted_gambling') || G.flags.includes('gambling_addiction')) && G.money > 500 && !G.mem.gambling_big_loss,
    text: 'You bet everything on a sure thing. The horse stumbles. The card is wrong. The wheel lands one slot over. In minutes, a significant portion of your savings is gone.',
    isKey: true,
    choices: [
      {
        text: 'Walk away',
        tag: null,
        outcome: 'You leave the floor. You don\'t look back. The loss is real — so is the decision.',
        effect: (p) => { p.mo -= 3000; p.h -= 25; p.setMem('gambling_big_loss', true); },
        inject: null,
      },
      {
        text: 'Double down to recover',
        tag: null,
        outcome: 'Chasing losses is a mathematical trap. You step into it fully.',
        effect: (p) => { p.mo -= 7000; p.m -= 15; p.h -= 30; p.setMem('gambling_big_loss', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── EARLY CHILDHOOD EVENTS ───────────────────────────────────────────────────
  {
    id: 'first_steps',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.age <= 2 && !G.mem.first_steps,
    text: 'You take your first wobbly steps across the living room floor. Your parents beam with pride.',
    isKey: true,
    choices: [
      {
        text: 'Toddle forward',
        tag: null,
        outcome: 'You make it three steps before sitting down hard. Everyone cheers.',
        effect: (p) => { p.h += 5; p.setMem('first_steps', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'first_word',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age <= 2 && !G.mem.first_word && G.mem.first_steps,
    text: 'You open your mouth and say your first real word. It comes out a little garbled, but everyone in the room understands. "Mama." "Dada." The sound changes everything.',
    isKey: true,
    choices: [
      {
        text: 'Say it again',
        tag: null,
        outcome: 'They photograph you. They call relatives. You don\'t know why everyone is so excited, but their joy becomes yours.',
        effect: (p) => { p.e += 2; p.h += 5; p.setMem('first_word', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'imaginary_friend',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 3 && G.age <= 6 && !G.mem.imaginary_friend,
    text: 'Someone appears in your room who nobody else can see. They have a name, preferences, opinions on things. They are very real to you.',
    choices: [
      {
        text: 'Name your imaginary friend',
        tag: null,
        outcome: 'You set a plate for them at dinner. Your parents smile and say nothing.',
        effect: (p) => { p.h += 10; p.e += 3; p.setMem('imaginary_friend', true); },
        inject: null,
      },
      {
        text: 'Ignore it',
        tag: null,
        outcome: 'The figure fades after a few weeks, unacknowledged.',
        effect: (p) => { p.h += 2; p.setMem('imaginary_friend', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'childhood_nightmare',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 3 && G.age <= 8 && !G.mem.nightmare,
    text: 'The same dream keeps coming back. Something is in the dark at the end of the hallway. You wake up in a cold sweat with a pounding heart.',
    choices: [
      {
        text: 'Tell your parents',
        tag: null,
        outcome: 'They sit with you until the room feels safe again. It helps more than you can articulate.',
        effect: (p) => { p.h += 8; p.m += 3; p.setMem('nightmare', true); },
        inject: null,
      },
      {
        text: 'Face the dark alone',
        tag: null,
        outcome: 'You stare at the ceiling until morning. The fear doesn\'t go, but something else grows in its place.',
        effect: (p) => { p.h -= 3; p.e += 3; p.setMem('nightmare', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'school_first_day',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => {
      if (G.age < 5 || G.age > 7 || G.mem.school_first_day) return false
      // Gate on literacy: if the country's gender-appropriate literacy is very low, school may not exist
      const litRate = G.character.gender === 'female' ? (G.character.country.literacyFemale ?? 1) : (G.character.country.literacyMale ?? 1)
      if (litRate < 0.25) return false  // extremely low literacy countries in early eras: school likely absent
      return true
    },
    text: G => {
      const arch = G.character.country.archetype;
      if (['conflict_zone', 'developing_unstable'].includes(arch)) return 'The makeshift classroom smells of chalk and old wood. You sit on a bench with six other children and wait for a teacher who arrives forty minutes late.';
      if (['subsaharan'].includes(arch)) return 'The schoolyard is dusty and loud. Children shout in a mix of languages. Your new uniform — pressed the night before — is already too hot in the morning sun.';
      if (['developing_urban', 'post_soviet'].includes(arch)) return 'The school is a concrete building with no shade. The playground is compacted earth. Inside it is orderly and serious. Your teacher does not smile, but she is thorough.';
      if (['wealthy_east'].includes(arch)) return 'The classroom is quiet before the teacher arrives. The children sit in rows with their school bags on hooks behind them. Everything is in the right place. You understand that this is what school is.';
      return 'The school bus pulls up. Thirty children in backpacks climb aboard. You are one of them now.';
    },
    isKey: true,
    choices: [
      {
        text: 'Make a friend',
        tag: null,
        outcome: 'You sit next to someone with bright eyes and introduce yourself. By lunch you have an ally.',
        effect: (p) => { p.h += 12; p.e += 3; p.setMem('school_first_day', true); p.addFlag('first_school_friend'); },
        inject: null,
      },
      {
        text: 'Cry and hide',
        tag: null,
        outcome: 'The teacher finds you behind the coats. She sits with you until the panic passes.',
        effect: (p) => { p.h -= 5; p.e += 2; p.setMem('school_first_day', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'childhood_pet_wish',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 5 && G.age <= 10 && G.pets.length === 0 && !G.mem.pet_wish,
    text: 'You want a pet more than you\'ve wanted anything in your short life. You dream about it. You draw pictures of it. You have already named it.',
    choices: [
      {
        text: 'Beg relentlessly',
        tag: null,
        outcome: 'Your parents say no firmly and repeatedly until you drop it.',
        effect: (p) => { p.h -= 3; p.setMem('pet_wish', true); },
        inject: null,
      },
      {
        text: 'Ask politely once',
        tag: null,
        outcome: '"Maybe," your parent says. You take that and treasure it.',
        effect: (p) => { p.h += 5; p.setMem('pet_wish', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'playground_bully',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 6 && G.age <= 12 && !G.mem.bullied,
    text: 'There\'s a kid at school who has decided you are a target. Every recess. Every lunch. You can\'t avoid them and ignoring them isn\'t working.',
    isKey: true,
    choices: [
      {
        text: 'Stand up to the bully',
        tag: null,
        outcome: 'Your voice shakes but you hold your ground. They back off. Some of the other kids start talking to you after that.',
        effect: (p) => { p.h += 10; p.karma += 5; p.e += 2; p.setMem('bullied', true); },
        inject: null,
      },
      {
        text: 'Tell a teacher',
        tag: null,
        outcome: 'There is a meeting. The bully is warned. Things are quieter for a while.',
        effect: (p) => { p.h += 5; p.m += 3; p.setMem('bullied', true); },
        inject: null,
      },
      {
        text: 'Avoid them',
        tag: null,
        outcome: 'You rearrange your whole day around someone else\'s cruelty.',
        effect: (p) => { p.h -= 5; p.setMem('bullied', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'childhood_sport_tryout',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 7 && G.age <= 14 && !G.mem.sport_tryout,
    text: 'The coach puts you through the drills. Other kids line up beside you. The tryout is your chance to make the team.',
    choices: [
      {
        text: 'Give it your all',
        tag: null,
        outcome: 'You make the team. Your name goes on the list. You read it three times.',
        effect: (p) => { p.h += 8; p.setMem('sport_tryout', true); },
        inject: null,
      },
      {
        text: 'Don\'t bother trying out',
        tag: null,
        outcome: 'You watch from the sideline as the team forms without you.',
        effect: (p) => { p.h -= 2; p.setMem('sport_tryout', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'childhood_reading',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 6 && G.age <= 10 && !G.mem.childhood_reading,
    text: 'You find a book that grabs you and doesn\'t let go. You read it under the covers with a torch. You finish it and immediately turn back to page one.',
    choices: [
      {
        text: 'Devour every book you can find',
        tag: null,
        outcome: 'The library becomes your territory. You run out of books to borrow and start over.',
        effect: (p) => { p.e += 8; p.h += 5; p.setMem('childhood_reading', true); },
        inject: null,
      },
      {
        text: 'Prefer cartoons instead',
        tag: null,
        outcome: 'The book sits on the shelf. The TV is more immediate.',
        effect: (p) => { p.h += 5; p.setMem('childhood_reading', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'daycare_drama',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => {
      if (G.age < 2 || G.age > 5 || G.mem.daycare_drama) return false
      // Daycare is a modern, urban, higher-income institution
      const wealthOk = ['upper','upper_middle','middle'].includes(G.character.wealthTier)
      const archOk = ['wealthy_west','wealthy_east','wealthy_gulf'].includes(G.character.country.archetype)
      const urbanOk = (G.ruralUrban === 'urban') && (G.character.country.urbanRate ?? 0) > 0.5
      const yearOk = G.currentYear >= 1960
      return yearOk && (archOk || (urbanOk && wealthOk))
    },
    text: 'Another child at daycare has taken your favourite toy and refuses to give it back. The injustice is enormous. This is the worst thing that has ever happened.',
    choices: [
      {
        text: 'Share your toys',
        tag: null,
        outcome: 'You offer your other toy. Grudgingly. The teacher gives you a sticker.',
        effect: (p) => { p.h += 5; p.karma += 5; p.setMem('daycare_drama', true); },
        inject: null,
      },
      {
        text: 'Refuse to share',
        tag: null,
        outcome: 'You take your toy back. The other child cries. You feel briefly victorious, then vaguely bad.',
        effect: (p) => { p.h += 3; p.karma -= 3; p.setMem('daycare_drama', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'childhood_talent_show',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 8 && G.age <= 14 && !G.mem.talent_show &&
      !['conflict_zone', 'subsaharan'].includes(G.character.country.archetype) &&
      G.currentYear >= 1955,
    text: 'The school is holding a talent show. Your name is on the list whether you signed up or not — a friend volunteered you. The auditorium will be full.',
    choices: [
      {
        text: 'Perform confidently',
        tag: null,
        outcome: 'The nerves become something else under the lights. You finish. People clap. Someone in the second row stands up.',
        effect: (p) => { p.h += 15; p.s += 2; p.setMem('talent_show', true); },
        inject: null,
      },
      {
        text: 'Freeze on stage',
        tag: null,
        outcome: 'You stand at the microphone for a very long eight seconds. Then you walk off. In retrospect, you learn something.',
        effect: (p) => { p.h -= 5; p.e += 2; p.setMem('talent_show', true); },
        inject: null,
      },
      {
        text: 'Refuse to participate',
        tag: null,
        outcome: 'You sit in the audience and watch. Part of you wonders.',
        effect: (p) => { p.h -= 2; p.setMem('talent_show', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── PROPERTY EVENTS ───────────────────────────────────────────────────────────
  {
    id: 'neighbor_dispute',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.assets?.properties?.length > 0 && !G.mem.neighbor_dispute && G.age >= 22,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_west')
        return 'Your HOA has forwarded a noise complaint from next door — apparently your weekend habits are "inconsistent with community standards". The letter is very long.'
      if (G.character.country.archetype === 'post_soviet')
        return 'Your upstairs neighbour in the Soviet-era apartment block has been hammering at all hours. The building management committee is useless. The feud is escalating.'
      if (['developing_urban', 'developing_unstable'].includes(G.character.country.archetype))
        return 'A developer has begun encroaching on the boundary between their site and your property. A wall has appeared overnight. It is not on your land — not quite.'
      return 'A dispute with your neighbour has been building for weeks. Today it came to a head over the fence line and neither of you is backing down.'
    },
    choices: [
      { text: 'Talk it out calmly', tag: null, outcome: 'The conversation is uncomfortable but honest. A compromise is reached. The tension thaws.', effect: (p) => { p.m += 5; p.karma += 5; p.setMem('neighbor_dispute', true); }, inject: null },
      { text: 'Lawyer up', tag: null, outcome: "The solicitor's letter lands and the neighbour backs down — grudgingly. The legal bill lands too.", effect: (p) => { p.mo -= 500; p.m -= 5; p.setMem('neighbor_dispute', true); }, inject: null },
      { text: 'Ignore it', tag: null, outcome: 'The dispute festers. You spend the next month dreading your own front door.', effect: (p) => { p.m -= 8; p.setMem('neighbor_dispute', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'home_renovation',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.assets?.properties?.length > 0 && G.money >= 2000 && !G.mem.home_reno && G.age >= 25,
    text: 'Your home is showing its age. The kitchen is original from when the previous owner bought it, the bathroom tiles have seen better decades, and the roof has started making sounds. Something has to give.',
    choices: [
      { text: 'Full renovation ($5,000)', tag: null, outcome: 'Six weeks of dust, builders, and chaos — then it is transformed. The property value climbs. You feel different walking through the door.', effect: (p) => { p.mo -= 5000; p.m += 20; p.w += 8; p.setMem('home_reno', true); }, inject: null },
      { text: 'Basic repairs ($1,500)', tag: null, outcome: 'The essentials are fixed. Not glamorous, but solid.', effect: (p) => { p.mo -= 1500; p.m += 8; p.setMem('home_reno', true); }, inject: null },
      { text: 'DIY it', tag: null, outcome: 'It took every weekend for three months and several trips to A&E with minor injuries, but you got there. The tiles are slightly crooked. You love them.', effect: (p) => { p.mo -= 300; p.m += 12; p.h -= 5; p.setMem('home_reno', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'flood_damage',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.assets?.properties?.length > 0 && !G.mem.flood_damage && G.age >= 22,
    text: (G) => {
      if (['developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype))
        return 'The monsoon season has been brutal this year. Water has entered the ground floor of your property. The damage is extensive and insurance is a distant concept here.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'An unexpected flash flood — the drainage system overwhelmed in minutes. Your ground floor is under thirty centimetres of filthy water. The insurance company has already put you on hold.'
      return 'Heavy rains have overwhelmed the local drainage and your property has flooded. The damage will take months to address.'
    },
    choices: [
      { text: 'File an insurance claim', tag: null, outcome: 'The assessor takes three weeks. The payout covers most of it, after the excess. The process is exhausting.', effect: (p) => { p.mo -= 1000; p.m -= 10; p.setMem('flood_damage', true); }, inject: null },
      { text: 'Repair it yourself', tag: null, outcome: 'You rip out the damaged flooring and rebuild it by hand. Your back pays the price. The house recovers; you take longer.', effect: (p) => { p.mo -= 3000; p.m -= 15; p.h -= 5; p.setMem('flood_damage', true); }, inject: null },
      { text: 'Sell the damaged property fast', tag: null, outcome: 'You take a heavy loss to offload the problem. The relief is immediate. The regret sets in later.', effect: (p) => { p.mo -= 8000; p.m -= 20; p.setMem('flood_damage', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'rental_income_opportunity',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.assets?.properties?.length > 0 && !G.mem.rented_room && G.age >= 25,
    text: 'You have a spare room sitting empty. A colleague mentions they know someone looking for a place. The extra income would be useful — but so would your privacy.',
    choices: [
      { text: 'Rent it out', tag: null, outcome: 'The money arrives each month. So does tenant drama: the shared fridge, the late nights, the passive-aggressive notes. Worth it, mostly.', effect: (p) => { p.mo += 800; p.m -= 5; p.setMem('rented_room', true); }, inject: null },
      { text: 'Keep your privacy', tag: null, outcome: 'Your home remains your own. The quiet is worth more than the rent.', effect: (p) => { p.m += 5; p.setMem('rented_room', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'property_price_boom',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.assets?.properties?.length > 0 && G.currentYear >= 2000 && !G.mem.prop_boom,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 2020)
        return 'The post-pandemic housing market has gone into overdrive. Your property has appreciated by more in the last eighteen months than in the previous decade. Estate agents are sending unsolicited letters.'
      if (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 2000)
        return 'The property market is booming and your home has surged in value. Everyone seems to be either buying or selling.'
      if (G.character.country.archetype === 'wealthy_east')
        return 'The Asian property surge has lifted values across the region. Your property is suddenly worth considerably more than you paid for it.'
      if (['developing_urban', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Gentrification is reshaping the neighbourhood. The cafe that replaced the hardware shop charges five times as much. Your property value has followed the coffee prices upward.'
      return 'Local property values have surged unexpectedly. Your asset is worth significantly more than you paid for it.'
    },
    choices: [
      { text: 'Sell now at peak', tag: null, outcome: 'You time the market perfectly. The windfall is significant. Finding somewhere new to live is a problem for tomorrow.', effect: (p) => { p.mo += 15000; p.m += 20; p.setMem('prop_boom', true); }, inject: null },
      { text: 'Hold for the long term', tag: null, outcome: 'You resist the temptation. The asset sits there, appreciating. Patience has always been part of the plan.', effect: (p) => { p.m += 10; p.w += 5; p.setMem('prop_boom', true); }, inject: null },
    ],
    effect: null,
  },

  // ── CAREER DEPTH EVENTS ───────────────────────────────────────────────────────
  {
    id: 'workplace_romance',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career !== null && G.partner === null && G.age >= 22 && !G.mem.workplace_romance,
    text: 'A colleague has been finding increasingly transparent reasons to stop by your desk. The coffee invitations are becoming something else. The feeling appears to be mutual.',
    choices: [
      { text: 'Pursue the connection', tag: null, outcome: 'The first date is a work drinks that neither of you wants to end. Risky, exhilarating, and possibly worth every complication.', effect: (p) => { p.m += 15; p.setMem('workplace_romance', true); }, inject: null },
      { text: 'Keep it professional', tag: null, outcome: 'You redirect the energy back into the work. The right call, probably. The occasional glance across the office costs nothing.', effect: (p) => { p.m += 3; p.karma += 5; p.setMem('workplace_romance', true); }, inject: null },
      { text: 'Report to HR', tag: null, outcome: 'The process is uncomfortable and thorough. By the book and slightly joyless — but the right protocol.', effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('workplace_romance', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'demotion',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career !== null && G.career.level > 1 && !G.mem.demoted && G.age >= 25,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_west')
        return 'A company restructuring has been announced. When the dust settles, your title has quietly changed. The salary review that comes with it goes the wrong direction.'
      if (G.character.country.archetype === 'post_soviet')
        return "The manager's nephew has been brought in above you. The demotion arrives in a terse memo. Political connections matter here more than performance."
      if (['developing_urban', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Favouritism in the office has reached its conclusion. Someone with the right connections has your position now. The HR department shows no interest in your complaint.'
      return 'Your performance has been flagged by management. A demotion is presented as a development opportunity. The framing fools no one.'
    },
    choices: [
      { text: 'Accept and work harder', tag: null, outcome: 'You swallow it. The humiliation sits heavy but the resolve is real. You begin rebuilding from the new floor.', effect: (p) => { p.m -= 20; p.w -= 10; p.setMem('demoted', true); }, inject: null },
      { text: 'Quit in protest', tag: null, outcome: 'You walk out with your head up. The job market awaits. The career gap will need explaining later.', effect: (p) => { p.m -= 10; p.setMem('demoted', true); }, inject: null },
      { text: 'Contest the decision formally', tag: null, outcome: 'You file the appeal. Legal fees and six weeks of limbo. The outcome could go either way.', effect: (p) => { p.mo -= 1000; p.m -= 15; p.setMem('demoted', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'company_bankruptcy',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career !== null && !G.mem.company_bankrupt && G.age >= 22,
    text: 'The email arrives at 7am on a Monday. The company is entering administration. HR will be in touch. The office plants are still alive. The coffee machine is still on. Everything else is over.',
    choices: [
      { text: 'Start job searching immediately', tag: null, outcome: 'You update the CV that night. The search is brutal but you stay ahead of the market. Something comes through eventually.', effect: (p) => { p.m -= 15; p.setMem('company_bankrupt', true); }, inject: null },
      { text: 'File for unemployment benefits', tag: null, outcome: 'The paperwork takes three weeks. The payments arrive. They are not enough but they are something.', effect: (p) => { p.mo += 500; p.m -= 20; p.setMem('company_bankrupt', true); }, inject: null },
      { text: 'Take legal action against the company', tag: null, outcome: 'The employment tribunal drags on for months. You receive a fraction of what you were owed. The solicitor receives the rest.', effect: (p) => { p.mo -= 800; p.m -= 10; p.setMem('company_bankrupt', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'industry_layoffs',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career !== null && !G.mem.industry_layoffs && G.currentYear >= 1980 && G.age >= 25,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 2008 && G.currentYear <= 2012)
        return 'The financial crisis has reached your industry. Whole departments are being eliminated. The redundancy notices are going out in batches and your name is on the next one.'
      if (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 2000 && G.currentYear <= 2002)
        return 'The dot-com bubble has burst spectacularly. Your sector — so recently untouchable — is haemorrhaging jobs. The whole floor has been called to a "brief update" meeting.'
      if (G.character.country.archetype === 'post_soviet' && G.currentYear >= 1991 && G.currentYear <= 1999)
        return 'The post-Soviet economic collapse is hitting your sector hard. State enterprises are dissolving. Entire industries have evaporated in a year. Payroll has not arrived in three months.'
      return 'A sector-wide downturn has triggered a wave of layoffs. The industry press is calling it a correction. Your mortgage does not care what the press calls it.'
    },
    choices: [
      { text: 'Volunteer for the redundancy package', tag: null, outcome: 'The payout is reasonable. You take it and use the space to think. The uncertainty is the price.', effect: (p) => { p.mo += 2000; p.m -= 10; p.setMem('industry_layoffs', true); }, inject: null },
      { text: 'Fight to keep your job', tag: null, outcome: 'You make yourself indispensable through sheer output. It costs you sleep and several months of anxiety. You survive the cut.', effect: (p) => { p.m -= 20; p.setMem('industry_layoffs', true); }, inject: null },
      { text: 'Start your own business', tag: null, outcome: 'The layoffs become the catalyst. You spend the redundancy on the first invoice. The entrepreneurial leap is terrifying and clarifying.', effect: (p) => { p.mo -= 3000; p.m -= 5; p.setMem('industry_layoffs', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'mentor_at_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career !== null && G.career.level <= 3 && !G.mem.has_mentor && G.age >= 21,
    text: 'A senior colleague has taken an interest in your development. They have begun inviting you to meetings above your grade, making introductions, and sharing things the official training programme never would.',
    choices: [
      { text: 'Welcome the mentorship fully', tag: null, outcome: 'Over the next two years they open doors you did not know existed. The relationship shifts your trajectory measurably.', effect: (p) => { p.e += 8; p.m += 10; p.w += 5; p.setMem('has_mentor', true); }, inject: null },
      { text: 'Prefer to figure it out alone', tag: null, outcome: 'You decline politely. The independence matters to you. The road is longer for it, but it is yours.', effect: (p) => { p.m += 3; p.setMem('has_mentor', true); }, inject: null },
    ],
    effect: null,
  },

  // ── EDUCATION MID-PROGRAM EVENTS ──────────────────────────────────────────────
  {
    id: 'failed_exam',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.education?.enrolled !== null && !G.mem.failed_exam && G.age >= 16,
    text: 'The exam results arrive and yours is not what you needed. The grade sits on the page like a verdict. The path forward suddenly requires more from you than you expected.',
    choices: [
      { text: 'Study hard and retake it', tag: null, outcome: 'Three weeks of intensive revision. The retake is harder than the original. You pass. The resilience stays with you.', effect: (p) => { p.e += 5; p.m -= 10; p.setMem('failed_exam', true); }, inject: null },
      { text: 'Accept the grade and move on', tag: null, outcome: 'You absorb the result and keep walking. The disappointment travels with you for a while.', effect: (p) => { p.m -= 15; p.setMem('failed_exam', true); }, inject: null },
      { text: 'Drop the subject entirely', tag: null, outcome: 'The course load lightens. So does your confidence in the area. You redirect elsewhere.', effect: (p) => { p.m -= 5; p.e -= 3; p.setMem('failed_exam', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'summer_job',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.education?.enrolled !== null && G.age >= 16 && G.age <= 25 && !G.mem.summer_job,
    text: 'The summer break stretches ahead. A friend mentions there are positions at a local business — not glamorous, but the pay is real and the experience would look good on paper.',
    choices: [
      { text: 'Take the job', tag: null, outcome: 'Six weeks of early starts and tired evenings. The money is real and so is the understanding that work is work. Study time takes the hit.', effect: (p) => { p.mo += 1500; p.w += 3; p.m -= 5; p.setMem('summer_job', true); }, inject: null },
      { text: 'Focus on studying instead', tag: null, outcome: 'You spend the summer ahead of the syllabus. The next term feels different when you have already covered the material.', effect: (p) => { p.e += 5; p.m += 5; p.setMem('summer_job', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'thesis_defense',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.education?.level === 'graduate' && !G.mem.thesis_defended && G.age >= 22,
    text: 'The day has arrived. Four years of research condensed into sixty minutes in a room with three academics who have read every word more carefully than you wrote them. The committee is assembled. Your notes are as ready as they will ever be.',
    choices: [
      { text: 'Crush it — you know this material cold', tag: null, outcome: 'The defence runs long because the questions are genuinely engaging. The committee recommends no corrections. You walk out a different person.', effect: (p) => { p.e += 10; p.m += 20; p.setMem('thesis_defended', true); }, inject: null },
      { text: 'Scrape through on adrenaline', tag: null, outcome: 'You fumble two questions and recover. The pass is real if not elegant. You will take it.', effect: (p) => { p.m -= 5; p.e += 5; p.setMem('thesis_defended', true); }, inject: null },
      { text: 'Revisions required', tag: null, outcome: 'Three chapters need substantial work. The disappointment is sharp. The six weeks of corrections are clarifying. The second submission is stronger.', effect: (p) => { p.m -= 15; p.e += 3; p.setMem('thesis_defended', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'study_abroad_opportunity',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.education?.enrolled !== null && !G.mem.studied_abroad && G.age >= 18 && G.age <= 28 && G.money >= 2000,
    text: 'Your institution has announced an exchange programme. A semester abroad — a different city, a different language, a different way of approaching the same material. The application window is open for two weeks.',
    choices: [
      { text: 'Go abroad', tag: null, outcome: 'The semester abroad is disorienting and transformative in equal measure. A new language, new friends, a new understanding of where you come from. You return changed.', effect: (p) => { p.mo -= 3000; p.e += 10; p.m += 15; p.s += 5; p.setMem('studied_abroad', true); }, inject: null },
      { text: 'Stay home', tag: null, outcome: 'The decision feels sensible at the time. Your studies continue without interruption. The programme runs without you.', effect: (p) => { p.m += 3; p.setMem('studied_abroad', true); }, inject: null },
    ],
    effect: null,
  },
  {
    id: 'professor_conflict',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.education?.enrolled !== null && !G.mem.professor_conflict && G.age >= 17,
    text: 'A professor has taken against you — or at least that is how it feels. Your work is held to a different standard. The feedback is harsh in ways that do not feel purely academic. The other students have noticed.',
    choices: [
      { text: 'Fight your corner academically', tag: null, outcome: 'You produce work so rigorous it cannot be dismissed. The professor does not warm to you. Your grades do.', effect: (p) => { p.e += 5; p.m -= 5; p.setMem('professor_conflict', true); }, inject: null },
      { text: 'Bite your tongue and outlast it', tag: null, outcome: "The semester ends. The professor's opinion of you was never going to matter beyond these walls. The degree remains on track.", effect: (p) => { p.m -= 8; p.setMem('professor_conflict', true); }, inject: null },
      { text: 'File a formal complaint', tag: null, outcome: 'The department reviews the marking. An acknowledgement is made — nothing dramatic, nothing fast. The process restores something.', effect: (p) => { p.karma += 3; p.m -= 10; p.setMem('professor_conflict', true); }, inject: null },
    ],
    effect: null,
  },

  // ── PET EVENTS ───────────────────────────────────────────────────────────────

  {
    id: 'pet_illness',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.pets && G.pets.length > 0 && G.age >= 10,
    text: (G) => {
      if (G.character.country.archetype === 'conflict_zone')
        return 'Your pet is sick — lethargic, refusing food. In a place like this, finding a vet means scrounging for supplies and favours. The cost is not just money.'
      if (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east')
        return 'Your pet stops eating and the vet clinic — gleaming, expensive, thorough — gives you the diagnosis and the bill in the same breath.'
      if (G.character.country.archetype === 'subsaharan')
        return 'Your pet is unwell. The nearest animal doctor is far and the journey alone is a commitment most cannot afford.'
      return 'Your pet is sick. The vet visit is unavoidable. The bill, when it comes, stings.'
    },
    choices: [
      {
        text: 'Pay for treatment',
        tag: null,
        outcome: 'The treatment works. Your pet recovers slowly, and you feel the relief in your chest more than you expected.',
        effect: (p) => { p.mo -= 300; p.m += 5; },
        inject: null,
      },
      {
        text: 'Surrender the pet — you cannot afford this',
        tag: null,
        outcome: 'You hand them over. They look back at you from the carrier. The guilt settles in and does not leave quickly.',
        effect: (p) => { p.m -= 20; p.addFlag('surrendered_pet'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'pet_runs_away',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.pets && G.pets.length > 0 && G.age >= 10 && !G.flags.includes('pet_lost'),
    text: (G) => {
      if (G.character.country.archetype === 'conflict_zone')
        return 'In the chaos of another difficult week, the gate is left unlatched. Your pet is gone. In a neighbourhood like this, the odds of finding them are not good.'
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Your pet slips out through a gap in the fence and disappears into the neighbourhood. You call their name until dark.'
      return 'You come home and the front door has been left ajar. Your pet is nowhere to be found.'
    },
    choices: [
      {
        text: 'Search the neighbourhood — post flyers, ask everyone',
        tag: null,
        outcome: (G) => {
          if (Math.random() < 0.6) return 'Two days later, a neighbour calls. Your pet is found — thin, a little spooked, but home.'
          return 'You search for days. The flyers fade in the rain. They do not come back.'
        },
        effect: (p) => {
          if (Math.random() < 0.6) { p.m += 10; }
          else { p.m -= 15; p.addFlag('pet_lost'); }
        },
        inject: null,
      },
      {
        text: 'Accept that they are gone',
        tag: null,
        outcome: 'You take the bowl inside. Some losses you carry quietly.',
        effect: (p) => { p.m -= 15; p.addFlag('pet_lost'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'pet_death',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.pets && G.pets.length > 0 && G.age >= 18,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east')
        return 'The vet said it would be a matter of weeks. They were right. Your pet — companion, routine, small daily anchor — dies at home, quietly, on their favourite blanket.'
      if (G.character.country.archetype === 'conflict_zone')
        return 'Your pet has been with you through things most people cannot imagine. Old age catches up with them now. In a life with few certainties, they were one. That is gone now.'
      return 'Your pet dies of old age. Fourteen years of mornings together, and now the house is very quiet.'
    },
    choices: [
      {
        text: 'Grieve properly — let yourself feel it',
        tag: null,
        outcome: 'The loss is real. Grief for an animal is its own kind, and you do not apologise for it.',
        effect: (p) => { p.m -= 20; p.h -= 5; },
        inject: null,
      },
      {
        text: 'Celebrate the life they had',
        tag: null,
        outcome: 'You look at old photos. It was a good life for them. That is enough.',
        effect: (p) => { p.m -= 8; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'pet_learns_trick',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.pets && G.pets.length > 0 && G.age >= 8,
    text: (G) => {
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'After weeks of patient repetition — treats, hand signals, the same word until it lost meaning — your pet finally gets it. The trick clicks. They look at you with what you are almost certain is pride.'
      if (G.character.country.archetype === 'subsaharan')
        return 'The neighbourhood kids gather to watch. Your pet performs the trick perfectly. The laughter is real and warm.'
      return 'You have been working on this for weeks. Today, finally, something clicks. Your pet nails the trick and the two of you share a moment of uncomplicated joy.'
    },
    choices: [
      {
        text: 'Spend the afternoon training together',
        tag: null,
        outcome: 'Some hours are just good. This is one of them.',
        effect: (p) => { p.m += 12; p.karma += 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'stray_dog_adopts_you',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (!G.pets || G.pets.length === 0) && G.age >= 12,
    text: (G) => {
      if (G.character.country.archetype === 'conflict_zone')
        return 'Strays are everywhere here. Most people look through them. But this one has been following you for three days now — waiting outside, patient, not begging. Just present.'
      if (['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype))
        return 'A scraggly dog has decided you are its person. It shows up each morning and waits. The neighbourhood has started calling it by a name you did not choose.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'A stray follows you home from the park. No collar, well-behaved, eyes that seem to already know the layout of your flat. The shelter is full. You have a decision to make.'
      return 'A stray dog has adopted you. It appeared three days ago and it has not left. It sits outside your door like a question you have not answered yet.'
    },
    choices: [
      {
        text: 'Keep it — buy food, get them checked out',
        tag: null,
        outcome: 'That first night they sleep at the foot of your bed. The routine you build around them feels, strangely, like something you needed.',
        effect: (p) => { p.m += 15; p.mo -= 50; },
        inject: null,
      },
      {
        text: 'Leave food out but do not let them in',
        tag: null,
        outcome: 'You tell yourself you are not attached. They disappear after a few days. You notice the absence more than you expected.',
        effect: (p) => { p.m -= 5; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── AFFAIR SYSTEM ─────────────────────────────────────────────────────────────

  {
    id: 'affair_opportunity',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner !== null && G.partner.married && G.age >= 25 && !G.flags.includes('having_affair'),
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_gulf')
        return 'A colleague — charming, careful, aware of the stakes — makes their interest clear. In this society, what you are contemplating carries consequences that extend far beyond the two of you.'
      if (G.character.country.archetype === 'post_soviet')
        return 'A neighbour who has always been a little too attentive makes a move. Life here is complicated enough. This would complicate it further.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'An attractive colleague lingers after everyone else has left. The conversation shifts. You know exactly what is being offered.'
      return 'Someone new has appeared in your life — a colleague, a neighbour — and recently the attention has become unmistakably something more. You are not imagining it.'
    },
    choices: [
      {
        text: 'Resist — walk away',
        tag: 'principled',
        outcome: 'You let the moment pass. The right call is not always the easy one.',
        effect: (p) => { p.karma += 5; p.m += 2; },
        inject: null,
      },
      {
        text: 'Begin a secret affair',
        tag: 'unfaithful',
        outcome: 'The excitement and the guilt arrive at almost exactly the same time.',
        effect: (p) => { p.addFlag('having_affair'); p.setMem('affair_start', p._age ?? 0); p.m += 15; p.karma -= 15; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'affair_discovered',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('having_affair') && G.partner !== null && G.age > (G.mem.affair_start ?? 0) + 1,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_gulf')
        return 'Your spouse has found out. In this community, discovery is not a private matter — families, reputations, and livelihoods are now in play. The confrontation is cold and formal and devastating.'
      if (G.character.country.archetype === 'conflict_zone')
        return 'Your partner finds out. Trust was already thin here; life is already hard. This breaks something that may not be fixable.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'Your partner found the messages. They are waiting for you when you get home. The look on their face is one you will not forget.'
      return 'Your spouse discovers the affair. They have known for longer than you realised. The confrontation you have been dreading is here.'
    },
    choices: [
      {
        text: 'Come clean — beg for forgiveness',
        tag: 'repentant',
        outcome: (G) => {
          if (Math.random() < 0.5) return 'They listen. The pain is real, the repair uncertain — but they do not leave. Not today.'
          return 'The honesty is not enough. They leave. The silence in the house is enormous.'
        },
        effect: (p) => { p.m -= 25; p.r += 30; p.karma += 5; },
        inject: null,
      },
      {
        text: 'Deny everything',
        tag: null,
        outcome: 'The denial makes it worse. They know. You know they know. The lie sits between you now.',
        effect: (p) => { p.m -= 15; p.r += 20; p.karma -= 10; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'end_affair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('having_affair') && G.age > (G.mem.affair_start ?? 0) + 1,
    text: (G) => {
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'The affair has been running long enough that the weight of it has become constant. The excitement faded; what remains is deception. You know what you need to do.'
      return 'You have been carrying two lives for a while now. It is exhausting, and somewhere in the exhaustion, clarity has arrived.'
    },
    choices: [
      {
        text: 'End it — cleanly, finally',
        tag: null,
        outcome: 'The ending is harder than you expected. The relief that follows is harder still to admit.',
        effect: (p) => { p.m -= 5; p.karma += 10; p.addFlag('affair_ended'); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── RELATIONSHIP COUNSELLING ──────────────────────────────────────────────────

  {
    id: 'relationship_troubles',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.partner !== null && G.age >= 20 && !G.mem.relationshipTroubles,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_gulf')
        return 'The strain between you and your spouse has become harder to ignore. In a culture where appearances matter, what happens inside the home stays inside — but something needs to change.'
      if (G.character.country.archetype === 'post_soviet')
        return 'You and your partner have been circling the same arguments for months. The silences are longer now and not the comfortable kind.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'The relationship has been strained for a while. The small arguments have a familiar pattern now. Something underneath needs to be addressed.'
      return 'Things between you and your partner have been tense for months. The goodwill is still there but it is being tested.'
    },
    choices: [
      {
        text: 'Suggest couples counselling',
        tag: null,
        outcome: 'The first session is awkward and necessary. Something starts to shift.',
        effect: (p) => { p.r += 15; p.mo -= 200; p.m += 8; p.setMem('relationshipTroubles', true); },
        inject: null,
      },
      {
        text: 'Give it time — things will settle',
        tag: null,
        outcome: 'Some things do settle. Others do not get better without attention.',
        effect: (p) => { p.r += 5; p.setMem('relationshipTroubles', true); },
        inject: null,
      },
      {
        text: 'Have an honest conversation about what is wrong',
        tag: null,
        outcome: 'It is uncomfortable. It is also overdue. The air is a little clearer after.',
        effect: (p) => { p.r += 10; p.m += 5; p.setMem('relationshipTroubles', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'partner_wants_children',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.partner !== null && G.age >= 22 && G.age <= 40 && G.children.length === 0 && !G.mem.discussed_kids,
    text: (G) => {
      if (G.character.country.archetype === 'wealthy_gulf')
        return "Your spouse raises the subject with weight and formality: when will you start a family? The expectation is not just theirs — it is the community's."
      if (['subsaharan', 'developing_unstable'].includes(G.character.country.archetype))
        return 'Your partner brings it up one evening. Children are expected here, and sooner rather than later. The conversation has been coming for a while.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'Your partner brings it up over dinner, carefully but directly. They want to know where you stand on having children. The question has been in the air for months.'
      return 'Your partner raises the question of children. They are ready to start a family, and they want to know how you feel.'
    },
    choices: [
      {
        text: 'I want that too',
        tag: null,
        outcome: 'The conversation turns warm. You are building something together.',
        effect: (p) => { p.setMem('discussed_kids', true); p.r -= 15; p.m += 10; },
        inject: null,
      },
      {
        text: 'Not ready yet',
        tag: null,
        outcome: 'They understand, but you can see the patience in their face. This is not over.',
        effect: (p) => { p.setMem('discussed_kids', true); p.r += 5; p.m += 3; },
        inject: null,
      },
      {
        text: 'I do not want children',
        tag: null,
        outcome: 'The honesty is right, but the impact is real. This changes things between you.',
        effect: (p) => { p.setMem('discussed_kids', true); p.r += 20; p.m -= 5; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── AGE MILESTONE REGRET ──────────────────────────────────────────────────────

  {
    id: 'midlife_reflection',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.age >= 40 && G.age <= 42 && !G.mem.midlife_reflected,
    text: (G) => {
      if (G.character.country.archetype === 'post_soviet')
        return 'Forty. In another era your parents had already built their whole lives by now — apartment, career, children, all arranged by the state. You have had to arrange your own. It is a strange thing to take stock of.'
      if (G.character.country.archetype === 'conflict_zone')
        return 'Forty feels different when you did not always expect to get here. You stop one afternoon and take stock of the life you have managed to build.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'Forty. You read about midlife crises the way you read about weather. Now you are in one — or near one — and it is quieter and stranger than you expected. Just a long, sober look at the scoreboard.'
      return 'You are forty. The number sits differently than others. You find yourself taking stock without quite deciding to.'
    },
    choices: [
      {
        text: 'I have lived well',
        tag: null,
        outcome: 'The accounting is honest and it comes out positive. That is not nothing.',
        effect: (p) => { p.m += 10; p.setMem('midlife_reflected', true); },
        inject: null,
      },
      {
        text: 'I wish I had done things differently',
        tag: null,
        outcome: 'The regret is real. So is the self-awareness it comes with. That counts for something.',
        effect: (p) => { p.m -= 10; p.karma += 5; p.setMem('midlife_reflected', true); },
        inject: null,
      },
      {
        text: 'Time to make changes',
        tag: null,
        outcome: 'The second half starts differently. That is your intention, at least.',
        effect: (p) => { p.m += 5; p.setMem('midlife_reflected', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'sixtieth_birthday',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 60 && G.age <= 62 && !G.mem.sixty_reflected,
    text: (G) => {
      if (G.character.country.archetype === 'subsaharan')
        return 'Sixty. Your community marks the age with ceremony — an elder now, with everything that entails. The weight of it is real, and so is the respect that comes with it.'
      if (G.character.country.archetype === 'wealthy_gulf')
        return 'Sixty. The family gathers. There are speeches. A life in full view of everyone — measured by family, by standing, by the names of your grandchildren.'
      if (G.character.country.archetype === 'post_soviet')
        return 'Sixty. You remember your own parents at this age — they seemed ancient. Looking in the mirror, you do not feel ancient. You feel like yourself, but louder somehow.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype))
        return 'Sixty. Someone books a restaurant. There is a cake. People say you do not look it. You think about the years — what they contained, what you did with them.'
      return 'Your sixtieth birthday arrives. People gather. There are stories and toasts and the particular warmth of a milestone publicly marked.'
    },
    choices: [
      {
        text: 'Grateful for a full life',
        tag: null,
        outcome: 'The gratitude is honest. There is still time left, and you intend to use it.',
        effect: (p) => { p.m += 15; p.setMem('sixty_reflected', true); },
        inject: null,
      },
      {
        text: 'The best is behind me',
        tag: null,
        outcome: 'The feeling is familiar to many who reach sixty. It is not wrong, exactly. But it is not the whole truth either.',
        effect: (p) => { p.m -= 15; p.setMem('sixty_reflected', true); },
        inject: null,
      },
      {
        text: 'Still plenty left to do',
        tag: null,
        outcome: 'The chapter has not closed. You pick up where you left off, and you mean it.',
        effect: (p) => { p.m += 8; p.setMem('sixty_reflected', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── POST-SOVIET LIFECYCLE EVENTS ─────────────────────────────────────────────

  // EARLY CHILDHOOD
  {
    id: 'ps_birth_context',
    phase: 'early_childhood',
    weight: 5,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age <= 1 && !G.mem.ps_birth,
    text: (G) => {
      if (G.currentYear < 1992) return 'Born in a Soviet maternity ward, where your mother was given no pain relief and told not to make noise. Your father waited outside for three days. You were wrapped in hospital standard-issue cloth and handed over at the gate.';
      if (G.currentYear <= 2000) return 'The maternity ward smells of disinfectant and old ambition. The Soviet Union is gone and so is the budget. Your mother had to bring her own towels, sheets, and food. Your father bribed a nurse to get a proper room.';
      return 'The clinic is modern — polished floors, foreign equipment — if your parents could afford the private wing. The public ward was adequate but crowded.';
    },
    choices: null,
    effect: (p) => { p.h += 3; p.setMem('ps_birth', true); },
  },

  {
    id: 'ps_kommunalka',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 2 && G.age <= 5 && G.currentYear >= 1975 && G.currentYear <= 2005 && !G.mem.ps_kommunalka,
    text: 'Your family shares a kitchen and bathroom with two other families. The schedule for the stove is taped to the wall. Neighbours argue. Adults whisper about things in the hallway. You know every smell, sound, and conflict in this building.',
    choices: null,
    effect: (p) => { p.h -= 3; p.e += 4; p.setMem('ps_kommunalka', true); p.addFlag('communal_childhood'); },
  },

  {
    id: 'ps_dacha_childhood',
    phase: 'early_childhood',
    weight: 5,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 3 && G.age <= 8 && !G.mem.ps_dacha,
    text: 'Every summer your family loads into a train and goes to the dacha — a small plot two hours outside the city. You eat tomatoes straight from the vine, help carry water from the well, and fall asleep under a sky thick with stars. Your grandparents live here half the year.',
    choices: [
      {
        text: 'Help in the vegetable garden',
        tag: 'dacha_child',
        outcome: 'You learn the names of every plant, carry the watering can with both hands, and feel useful in a way school never quite manages.',
        effect: (p) => { p.h += 10; p.karma += 3; p.setMem('ps_dacha', true); p.addFlag('dacha_child'); },
        inject: null,
      },
      {
        text: 'Wander the forests alone',
        tag: null,
        outcome: 'You build a mental map of every path, every clearing. The forest becomes yours.',
        effect: (p) => { p.h += 8; p.e += 3; p.setMem('ps_dacha', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // CHILDHOOD
  {
    id: 'ps_soviet_school_uniform',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 6 && G.age <= 8 && !G.mem.ps_school_start,
    text: (G) => {
      if (G.currentYear <= 1991) return 'Your school uniform is brown and your bow is white. Every September first there is a ceremony. You carry carnations. The teacher reads aloud from the school charter. Everything feels very serious and exactly the right size.';
      return 'The old Soviet uniform is gone but the September ritual remains. You carry flowers for your teacher on the first day. The school still smells of chalk and floor wax. The portraits on the wall have changed.';
    },
    choices: [
      {
        text: 'Stand perfectly straight during assembly',
        tag: null,
        outcome: 'The teacher notices. You feel the weight of being noticed.',
        effect: (p) => { p.m += 3; p.e += 3; p.setMem('ps_school_start', true); },
        inject: null,
      },
      {
        text: 'Whisper jokes to the kid next to you',
        tag: null,
        outcome: 'You make a friend for life before the first lesson begins.',
        effect: (p) => { p.h += 8; p.setMem('ps_school_start', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_wild_nineties_childhood',
    phase: 'childhood',
    weight: 5,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 7 && G.age <= 14 && G.currentYear >= 1991 && G.currentYear <= 2001 && !G.mem.ps_nineties,
    text: 'The Nineties arrive and your parents\' certainties evaporate. Your father\'s factory closes. A man in a leather jacket starts driving the neighbours\' old Volga. Your mother queues for bread at five in the morning. At the market, people sell their Soviet medals, china, and winter coats. Kiosks sell everything and nothing at the same time.',
    choices: [
      {
        text: 'You feel the fear at home but don\'t understand it yet',
        tag: 'wild_nineties_childhood',
        outcome: 'The anxiety settles into your body before your mind has the language for it.',
        effect: (p) => { p.m -= 5; p.e += 5; p.setMem('ps_nineties', true); p.addFlag('wild_nineties_childhood'); },
        inject: null,
      },
      {
        text: 'You find ways to help — selling newspapers, carrying groceries',
        tag: 'wild_nineties_childhood',
        outcome: 'You learn early that money is not abstract. It is bread. It is heating.',
        effect: (p) => { p.h += 3; p.w += 5; p.setMem('ps_nineties', true); p.addFlag('wild_nineties_childhood'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_grandparent_war_stories',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 8 && G.age <= 14 && !G.mem.ps_war_stories,
    text: 'Your grandparents sit in the kitchen and talk. The Great Patriotic War. The Siege. The evacuation. The years after when everything had to be rebuilt by hand. You are the generation these stories were saved for.',
    choices: [
      {
        text: 'Listen carefully to every detail',
        tag: 'historically_aware',
        outcome: 'You carry the stories like inheritance. Some of them are heavy.',
        effect: (p) => { p.e += 5; p.h += 5; p.karma += 3; p.setMem('ps_war_stories', true); p.addFlag('historically_aware'); },
        inject: null,
      },
      {
        text: 'Nod politely and return to your friends',
        tag: null,
        outcome: 'The stories wait. They will find you again later.',
        effect: (p) => { p.h += 2; p.setMem('ps_war_stories', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ADOLESCENCE
  {
    id: 'ps_conscription_dread',
    phase: 'adolescence',
    weight: 5,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 15 && G.age <= 18 && G.character.gender === 'male' && !G.mem.ps_conscription_dread && ['Russia', 'Ukraine', 'Kazakhstan', 'Georgia', 'Belarus'].includes(G.character.country.name),
    text: 'Military service hangs over every conversation. Your older cousin came back quieter. There are ways to avoid it — a medical certificate, a university deferral, money in the right hand — but they all have costs.',
    choices: [
      {
        text: 'Study hard to qualify for university deferral',
        tag: null,
        outcome: 'You buy yourself years. Whether they are the right years remains to be seen.',
        effect: (p) => { p.e += 10; p.m -= 5; p.setMem('ps_conscription_dread', true); },
        inject: null,
      },
      {
        text: 'Accept it — everyone goes eventually',
        tag: 'accepts_duty',
        outcome: 'You stop fighting the current. There is a rough dignity in that.',
        effect: (p) => { p.m -= 3; p.addFlag('accepts_duty'); p.setMem('ps_conscription_dread', true); },
        inject: null,
      },
      {
        text: 'Your family pays for a medical exemption certificate',
        tag: null,
        outcome: 'The certificate is obtained. Nobody asks too many questions. The guilt is your own business.',
        effect: (p) => { p.mo -= 1500; p.karma -= 5; p.h += 5; p.setMem('ps_conscription_dread', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_brain_drain_peer',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 16 && G.age <= 22 && G.currentYear >= 1995 && !G.mem.ps_brain_drain,
    text: 'Your smartest friend has a visa. Germany. Canada. America. They have been preparing for two years without telling most people. At the farewell party there are jokes and then not jokes. You wonder if you are the one making the wrong choice.',
    choices: [
      {
        text: 'Consider leaving yourself',
        tag: 'considers_emigration',
        outcome: 'The thought takes root. You begin researching quietly.',
        effect: (p) => { p.e += 3; p.r += 5; p.setMem('ps_brain_drain', true); p.addFlag('considers_emigration'); },
        inject: null,
      },
      {
        text: 'You belong here. Let them go.',
        tag: null,
        outcome: 'You feel the decision settle in your chest like a stone — not regret exactly, but weight.',
        effect: (p) => { p.karma += 5; p.h -= 5; p.setMem('ps_brain_drain', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_nationalism_school',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 13 && G.age <= 17 && G.currentYear >= 2000 && !G.mem.ps_nationalism,
    text: 'History class has changed. The textbooks are new. The lesson is that your nation has always been great, beset by enemies, and is now reclaiming its rightful place. The teacher speaks with conviction. Some students stand and nod. Others look at the desk.',
    choices: [
      {
        text: 'Absorb the lesson — it feels true',
        tag: 'nationalist',
        outcome: 'The narrative gives you a shape for things you already felt.',
        effect: (p) => { p.setMem('ps_nationalism', true); p.addFlag('nationalist'); },
        inject: null,
      },
      {
        text: 'Something feels wrong about this version of history',
        tag: 'politically_aware',
        outcome: 'You start looking for the other version in old books, in your grandparents\' silences.',
        effect: (p) => { p.e += 5; p.r += 3; p.setMem('ps_nationalism', true); p.addFlag('politically_aware'); },
        inject: null,
      },
    ],
    effect: null,
  },

  // YOUNG ADULT
  {
    id: 'ps_oligarch_economy',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 20 && G.age <= 30 && !G.mem.ps_oligarch && G.currentYear >= 1995,
    text: 'The economy runs on connections. The apartment you want, the promotion you deserve, the contract your small business needs — they all pass through someone who knows someone. You begin to understand why some of your classmates went into the siloviki. Or why others left.',
    choices: [
      {
        text: 'Work the system — build connections strategically',
        tag: null,
        outcome: 'You learn the language of favours. It opens doors and closes others.',
        effect: (p) => { p.w += 5; p.karma -= 5; p.setMem('ps_oligarch', true); },
        inject: null,
      },
      {
        text: 'Build something legitimate, however slowly',
        tag: null,
        outcome: 'Progress is slow and often humiliating. But it is yours.',
        effect: (p) => { p.e += 3; p.karma += 8; p.r += 3; p.setMem('ps_oligarch', true); },
        inject: null,
      },
      {
        text: 'Get out — apply for positions abroad',
        tag: 'considers_emigration',
        outcome: 'The applications go out. The waiting begins.',
        effect: (p) => { p.setMem('ps_oligarch', true); p.addFlag('considers_emigration'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_factory_collapse',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 18 && G.age <= 35 && G.currentYear >= 1991 && G.currentYear <= 2010 && !G.mem.ps_factory && !G.career,
    text: 'The factory your father worked at for thirty years is being stripped. The machines are sold for scrap. The workers — most over fifty — have nowhere to go. Your city\'s economy was built around this building. It is being peeled away brick by brick.',
    choices: [
      {
        text: 'Try to find work in the new service economy',
        tag: null,
        outcome: 'The work is different and often demeaning, but there is work.',
        effect: (p) => { p.m -= 8; p.e += 3; p.setMem('ps_factory', true); },
        inject: null,
      },
      {
        text: 'Join a retraining programme',
        tag: null,
        outcome: 'You learn things that belong to a different century. Some of them are useful.',
        effect: (p) => { p.e += 8; p.m -= 5; p.setMem('ps_factory', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_drinking_culture',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 18 && G.age <= 35 && !G.mem.ps_drinking,
    text: 'At every celebration — wedding, promotion, wake, Tuesday — the vodka comes out. You don\'t drink at the first toast, you lose face. You don\'t drink at the third, something is wrong with you. The bottle is both hospitality and test.',
    choices: [
      {
        text: 'Drink and belong',
        tag: 'light_drinker',
        outcome: 'You belong, and the belonging is warm, and the mornings are not always easy.',
        effect: (p) => { p.h += 5; p.addFlag('light_drinker'); p.setMem('ps_drinking', true); },
        inject: null,
      },
      {
        text: 'Drink selectively, hold your ground',
        tag: null,
        outcome: 'You learn which toasts require the full glass and which allow a sip. It is a skill.',
        effect: (p) => { p.h += 2; p.karma += 3; p.setMem('ps_drinking', true); },
        inject: null,
      },
      {
        text: 'Refuse entirely — face the social cost',
        tag: null,
        outcome: 'You are the strange one. It costs something. It is also, quietly, something to respect about yourself.',
        effect: (p) => { p.h -= 5; p.karma += 8; p.m += 3; p.setMem('ps_drinking', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_protest_moment',
    phase: 'young_adult',
    weight: 3,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 18 && G.age <= 40 && G.currentYear >= 2000 && !G.mem.ps_protest,
    text: (G) => {
      if (G.character.country.name === 'Russia' || G.character.country.name === 'Belarus') return 'People are gathering in the square. Not many at first, then thousands. You watch from an office window, from across the street, from behind a phone camera. The OMON arrive in black uniforms. By evening the square is empty.';
      if (G.character.country.name === 'Ukraine') return 'Independence Square is full. Your neighbour has been sleeping there for three nights. The weather is bitter. History is being made on live television, either way it goes.';
      return 'A protest in the city centre draws people you know. Some of your friends are there. The police presence is heavy. The outcome uncertain.';
    },
    choices: [
      {
        text: 'Join the protest',
        tag: 'political_participant',
        outcome: 'You are there when it happens. Whatever happens next, you were there.',
        effect: (p) => { p.h += 15; p.karma += 10; p.r += 5; p.setMem('ps_protest', true); p.addFlag('political_participant'); },
        inject: null,
      },
      {
        text: 'Watch from a distance, afraid',
        tag: null,
        outcome: 'The fear is real. The regret may be too.',
        effect: (p) => { p.r += 8; p.setMem('ps_protest', true); },
        inject: null,
      },
      {
        text: 'Stay home — you have too much to lose',
        tag: null,
        outcome: 'You keep what you have. The cost is invisible until later.',
        effect: (p) => { p.r += 10; p.karma -= 5; p.setMem('ps_protest', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // MIDLIFE
  {
    id: 'ps_dacha_inheritance',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 35 && G.age <= 50 && G.parents && !G.mem.ps_dacha_inherit,
    text: 'Your parents are passing the dacha to you. The deed is a single typed page from 1967. The roof needs work. The well pump is twenty years old. But in summer it smells exactly as it always has — old wood, hot grass, your grandmother\'s jam.',
    choices: [
      {
        text: 'Keep it and maintain it',
        tag: 'dacha_owner',
        outcome: 'You spend three weekends replacing the roof felt. It becomes yours the way things become yours — through work.',
        effect: (p) => { p.h += 15; p.mo -= 2000; p.karma += 5; p.setMem('ps_dacha_inherit', true); p.addFlag('dacha_owner'); },
        inject: null,
      },
      {
        text: 'Sell it — the maintenance is too much',
        tag: null,
        outcome: 'The money is real. The loss is also real, and arrives later than expected.',
        effect: (p) => { p.mo += 8000; p.r += 10; p.setMem('ps_dacha_inherit', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_soviet_nostalgia',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 30 && !G.mem.ps_nostalgia,
    text: 'Your father says things were better before. The jobs were stable. The streets were safe. People looked after each other. He watches Soviet-era films and talks about Brezhnev as if he were discussing a golden age. You can see both what he means and everything he is forgetting.',
    choices: [
      {
        text: 'Argue — the past was not as clean as he remembers',
        tag: null,
        outcome: 'He goes quiet. You are both right about different things.',
        effect: (p) => { p.e += 5; p.h -= 5; p.setMem('ps_nostalgia', true); },
        inject: null,
      },
      {
        text: 'Listen and find what is true in it',
        tag: null,
        outcome: 'You find the real thing inside the myth: he misses the certainty, not the system.',
        effect: (p) => { p.h += 5; p.karma += 5; p.setMem('ps_nostalgia', true); },
        inject: null,
      },
      {
        text: 'Change the subject — some conversations go nowhere',
        tag: null,
        outcome: 'You let it pass. Not every hill is worth it.',
        effect: (p) => { p.setMem('ps_nostalgia', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_health_system',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 30 && !G.mem.ps_health && G.stats.health < 70,
    text: 'The clinic has Soviet-era equipment, underpaid doctors, and a supply of envelopes for unofficial payments. The doctor is competent — trained under a system that valued medical education — but overwhelmed. You pay for private care if you can. If you can\'t, you wait.',
    choices: [
      {
        text: 'Pay for private care',
        tag: null,
        outcome: 'Fast, efficient, expensive. The result is good.',
        effect: (p) => { p.m += 12; p.mo -= 800; p.setMem('ps_health', true); },
        inject: null,
      },
      {
        text: 'Navigate the public system',
        tag: null,
        outcome: 'Three appointments over six weeks. The diagnosis is the same. The experience is not.',
        effect: (p) => { p.m += 5; p.r += 5; p.setMem('ps_health', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // LATE LIFE
  {
    id: 'ps_pension_collapse',
    phase: 'late_life',
    weight: 4,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 55 && G.retired && !G.mem.ps_pension,
    text: 'The pension calculation was based on wages from thirty years ago, before the hyperinflation ate the denomination. What arrives monthly covers utilities and bread. Your garden and the dacha carry the rest of the weight.',
    choices: [
      {
        text: 'Grow your own food, cut every corner',
        tag: null,
        outcome: 'You eat well and live carefully. The resourcefulness is its own kind of pride.',
        effect: (p) => { p.m += 5; p.h -= 10; p.setMem('ps_pension', true); },
        inject: null,
      },
      {
        text: 'Ask children for financial help',
        tag: null,
        outcome: 'They help without complaint. The asking is the hardest part.',
        effect: (p) => { p.r += 8; p.h -= 5; p.setMem('ps_pension', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_regime_retrospective',
    phase: 'late_life',
    weight: 4,
    isKey: true,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 60 && !G.mem.ps_retrospective,
    text: 'You have lived under the Soviet Union, the chaos of transition, and whatever this is now. Three different passports and three different answers to the question of who you are. The young people have only known one of these worlds.',
    choices: [
      {
        text: 'The old system had dignity in it, whatever its faults',
        tag: null,
        outcome: 'You hold both truths: that it was real, and that the reckoning was also real.',
        effect: (p) => { p.h += 5; p.setMem('ps_retrospective', true); },
        inject: null,
      },
      {
        text: 'Freedom — however messy — is worth all of it',
        tag: null,
        outcome: 'The conclusion is hard-won and genuinely yours.',
        effect: (p) => { p.h += 8; p.karma += 5; p.setMem('ps_retrospective', true); },
        inject: null,
      },
      {
        text: 'There is no clean answer, and that is the honest conclusion',
        tag: null,
        outcome: 'You sit with the complexity. Few people reach this without having lived through it.',
        effect: (p) => { p.e += 5; p.h += 3; p.setMem('ps_retrospective', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_late_emigration_choice',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 40 && G.age <= 65 && G.currentYear >= 2010 && !G.mem.ps_late_emigration && G.children.length > 0,
    text: 'Your children are talking about leaving. They have skills. They have options. The question they do not ask directly is whether you are coming with them. The other question is whether leaving means abandoning everything you stayed for.',
    choices: [
      {
        text: 'Encourage them to go — build a life somewhere better',
        tag: null,
        outcome: 'They go. The apartment is very quiet. The video calls are something.',
        effect: (p) => { p.h -= 10; p.karma += 10; p.r += 5; p.setMem('ps_late_emigration', true); },
        inject: null,
      },
      {
        text: 'Ask them to stay — this is your home, make it work here',
        tag: null,
        outcome: 'Some stay. Some go anyway. You cannot hold what wants to move.',
        effect: (p) => { p.h += 5; p.r += 8; p.setMem('ps_late_emigration', true); },
        inject: null,
      },
      {
        text: 'Go with them — start again',
        tag: null,
        outcome: 'You leave with two suitcases and a sense of vertigo that takes years to pass.',
        effect: (p) => { p.h += 8; p.r += 10; p.setMem('ps_late_emigration', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ps_victory_day',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 8 && !G.mem.ps_victory_day,
    text: 'May 9th. Your city fills with people carrying portraits of the war dead — grandparents, great-grandparents, strangers from the regiment records. The Immortal Regiment march passes your window. Some people weep. Some wear medals they didn\'t earn. The day carries more weight than a single meaning.',
    choices: [
      {
        text: 'Carry your great-grandfather\'s portrait',
        tag: null,
        outcome: 'You feel the name on the frame like something physical. The grief is old and still sharp.',
        effect: (p) => { p.h += 8; p.karma += 5; p.setMem('ps_victory_day', true); },
        inject: null,
      },
      {
        text: 'Watch from the sidelines, uncertain how to feel',
        tag: null,
        outcome: 'You are not alone in the uncertainty. You just don\'t know that yet.',
        effect: (p) => { p.e += 3; p.setMem('ps_victory_day', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── SUB-SAHARAN HEALTH & SOCIETY EVENTS ────────────────────────────────────
  {
    id: 'ss_malaria_childhood',
    phase: 'childhood',
    weight: 3,
    isKey: true,
    when: (G) => ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 2 && G.age <= 12 && !G.mem.ss_malaria,
    text: 'The fever comes in the night. Your body shakes even under blankets in the heat. Your mother puts wet cloth on your forehead and sits with you through the dark hours. At the clinic, they tell her what she already knows — malaria again. The yellow pills. Three days of bed. You recover. Not everyone in your neighbourhood does.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.setMem('ss_malaria', true); p.addFlag('survived_malaria'); },
  },
  {
    id: 'ss_hiv_family',
    phase: 'childhood',
    weight: 2,
    isKey: true,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.currentYear >= 1990 && G.currentYear <= 2015 && G.age >= 8 && G.age <= 25 && !G.mem.ss_hiv,
    text: 'Someone in your family is sick. The word is not spoken directly at first. Then it is, in stages. AIDS. The stigma is thick as the silence at the dinner table. At school, you hear things about people whose families have this sickness. Your understanding of the disease is incomplete. Your experience of it is very concrete.',
    context: null,
    choices: [
      {
        text: 'You help care for them — fetch medicine, sit with them',
        tag: null,
        outcome: 'The work is heavy. The closeness matters.',
        effect: (p) => { p.m -= 5; p.h -= 8; p.karma += 10; p.setMem('ss_hiv', true); p.addFlag('caregiver_early'); },
        inject: null,
      },
      {
        text: 'You keep your distance — the stigma is crushing',
        tag: null,
        outcome: 'The guilt stays with you long after.',
        effect: (p) => { p.r += 10; p.karma -= 8; p.setMem('ss_hiv', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_water_collection',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 7 && G.age <= 16 && !G.mem.ss_water,
    text: 'Before school — before anything — there is the water. The borehole is forty minutes away on foot. The jerrycan holds twenty litres. It weighs twenty kilograms full. Your arms have grown strong in ways your classmates\' haven\'t. Some mornings there is a queue.',
    context: null,
    choices: [
      {
        text: 'Carry the full load without complaint',
        tag: null,
        outcome: null,
        effect: (p) => { p.m += 3; p.h -= 3; p.karma += 5; p.setMem('ss_water', true); },
        inject: null,
      },
      {
        text: 'Arrive at school late because of the queue',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 3; p.e -= 2; p.setMem('ss_water', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_school_fees_crisis',
    phase: 'childhood',
    weight: 3,
    isKey: true,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 10 && G.age <= 18 && !G.mem.ss_fees && G.money < 500,
    text: 'The head teacher sends you home. The fees for the term haven\'t been paid. You sit in the yard for three days while your mother goes to relatives, to neighbours, to the savings group at the church. The humiliation is specific: the other students watch you leave.',
    context: null,
    choices: [
      {
        text: 'Find part-time work to help cover fees',
        tag: null,
        outcome: null,
        effect: (p) => { p.e -= 5; p.w += 5; p.h -= 8; p.setMem('ss_fees', true); p.addFlag('child_worker'); },
        inject: null,
      },
      {
        text: 'Your family scrapes it together',
        tag: null,
        outcome: null,
        effect: (p) => { p.h -= 5; p.m -= 3; p.setMem('ss_fees', true); },
        inject: null,
      },
      {
        text: 'You drop out this term',
        tag: null,
        outcome: null,
        effect: (p) => { p.e -= 10; p.h -= 15; p.setMem('ss_fees', true); p.addFlag('education_interrupted'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_maternal_health',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 10 && G.age <= 20 && !G.mem.ss_maternal,
    text: 'A woman in your neighbourhood dies in childbirth. The nearest hospital is four hours away and the ambulance did not come. The baby survives. Your own mother delivered you at home with a traditional birth attendant. The gap between this world and what you see on the television has a name now.',
    context: null,
    choices: null,
    effect: (p) => { p.e += 5; p.h -= 8; p.karma += 3; p.setMem('ss_maternal', true); p.addFlag('health_aware'); },
  },
  {
    id: 'ss_mobile_money',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.currentYear >= 2008 && G.age >= 16 && !G.mem.ss_mobile_money,
    text: 'Your older sister sets up a mobile money account on her Nokia. She can send money to your mother in the village without a bus journey. The money gets there in seconds. Your uncle who drives a boda boda starts taking M-Pesa. The phone became the bank before the bank arrived.',
    context: null,
    choices: [
      {
        text: 'Set up your own account and start building savings',
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 5; p.e += 5; p.setMem('ss_mobile_money', true); },
        inject: null,
      },
      {
        text: 'Help your parents set up accounts',
        tag: null,
        outcome: null,
        effect: (p) => { p.karma += 8; p.h += 5; p.setMem('ss_mobile_money', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_church_community',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 8 && !G.mem.ss_church,
    text: 'Sunday is for church. Not just the service — the after-service, the choir practice, the women\'s fellowship, the youth group, the burial society, the informal lending circle. The church is the neighbourhood\'s skeleton. Your family\'s social life is almost entirely inside its radius.',
    context: null,
    choices: [
      {
        text: 'Throw yourself into the community',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 10; p.karma += 8; p.setMem('ss_church', true); },
        inject: null,
      },
      {
        text: 'Participate but keep your own counsel',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 3; p.setMem('ss_church', true); },
        inject: null,
      },
      {
        text: 'As you get older, question the faith',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 5; p.h -= 5; p.r += 3; p.setMem('ss_church', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_extended_family_obligation',
    phase: 'young_adult',
    weight: 3,
    isKey: true,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 22 && G.career && !G.mem.ss_family_obligation,
    text: 'You got the job. Now the requests begin. Your cousin needs school fees. Your uncle\'s shop needs capital. A relative from the village needs bus fare to the city. It is not a scam — these are real people with real needs and you are now the one with a salary. The expectation is structural, not exceptional.',
    context: null,
    choices: [
      {
        text: 'Help generously — this is what it means to succeed here',
        tag: null,
        outcome: null,
        effect: (p) => { p.mo -= 2000; p.h += 5; p.karma += 10; p.setMem('ss_family_obligation', true); },
        inject: null,
      },
      {
        text: 'Help selectively, set limits',
        tag: null,
        outcome: null,
        effect: (p) => { p.mo -= 800; p.karma += 5; p.setMem('ss_family_obligation', true); },
        inject: null,
      },
      {
        text: 'Protect your savings — explain your limits',
        tag: null,
        outcome: null,
        effect: (p) => { p.r += 8; p.karma -= 5; p.setMem('ss_family_obligation', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── CONFLICT ZONE SPECIFIC EVENTS ───────────────────────────────────────────
  {
    id: 'cz_checkpoint',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.archetype === 'conflict_zone' && G.age >= 10 && !G.mem.cz_checkpoint,
    text: 'There are men with guns at the intersection. They have been there so long you no longer think about them consciously — you route around them, you look at the ground when you pass, you learn which ones take bribes and which ones take other things. Your body knows the protocol before your mind does.',
    context: null,
    choices: [
      {
        text: 'Cross quickly, keep eyes down',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 5; p.setMem('cz_checkpoint', true); },
        inject: null,
      },
      {
        text: "Know someone's name — navigate the relationship",
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 3; p.karma -= 3; p.setMem('cz_checkpoint', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'cz_school_bombing',
    phase: 'childhood',
    weight: 2,
    isKey: true,
    when: (G) => G.character.country.archetype === 'conflict_zone' && G.age >= 6 && G.age <= 18 && !G.mem.cz_school_attack,
    text: 'The sound is ahead of the understanding. Glass. Then dust. Then the alarm you have practised but never heard for real. The school building two streets away has taken a hit. Nobody from your class is hurt. The chemistry teacher\'s car is a frame. School is cancelled for two weeks and then held in the mosque basement.',
    context: null,
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 15; p.addFlag('conflict_survivor'); p.setMem('cz_school_attack', true); },
  },
  {
    id: 'cz_aid_dependency',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character.country.archetype === 'conflict_zone' && G.age >= 12 && !G.mem.cz_aid,
    text: 'The white trucks come on Tuesdays. WFP, UNHCR, MSF — you know the logos before you know what the letters mean. The queue is orderly because everyone understands the cost of disrupting it. You have grown up knowing what a ration card looks like.',
    context: null,
    choices: [
      {
        text: 'Accept what comes — there is dignity in surviving',
        tag: null,
        outcome: null,
        effect: (p) => { p.setMem('cz_aid', true); },
        inject: null,
      },
      {
        text: "Find ways to contribute to the community's self-sufficiency",
        tag: null,
        outcome: null,
        effect: (p) => { p.karma += 8; p.e += 3; p.setMem('cz_aid', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'cz_family_separation',
    phase: 'childhood',
    weight: 2,
    isKey: true,
    when: (G) => G.character.country.archetype === 'conflict_zone' && G.age >= 5 && G.age <= 20 && !G.mem.cz_separation && G.parents,
    text: 'Your father is on the other side of a line that did not exist six months ago. You speak on the phone when the network is working. The calls are short and careful. You understand that he is protecting you from information but you also hear it in his voice.',
    context: null,
    choices: [
      {
        text: 'Hold the family together — take on more responsibility',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 5; p.h += 3; p.karma += 8; p.setMem('cz_separation', true); },
        inject: null,
      },
      {
        text: 'Carry the absence as anger',
        tag: null,
        outcome: null,
        effect: (p) => { p.h -= 10; p.r += 5; p.setMem('cz_separation', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── GENDER-SPECIFIC EVENTS (developing world focus) ─────────────────────────
  {
    id: 'gender_education_pressure',
    phase: 'adolescence',
    weight: 3,
    isKey: true,
    when: (G) => G.character.gender === 'female' && ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 12 && G.age <= 16 && !G.mem.gender_school_pressure,
    text: 'Your eldest brother says your bride price will be better if you are home learning to cook. The neighbour married her daughter at fourteen. Your mother says nothing when your uncle says girls\' education is a waste. Your teacher — the one who stays after class — says something different.',
    context: null,
    choices: [
      {
        text: 'Stay in school — your teacher helps you navigate the pressure',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 8; p.h -= 5; p.karma += 5; p.setMem('gender_school_pressure', true); p.addFlag('educated_against_odds'); },
        inject: null,
      },
      {
        text: 'Leave school — the family pressure is too great',
        tag: null,
        outcome: null,
        effect: (p) => { p.e -= 10; p.h -= 10; p.setMem('gender_school_pressure', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'gender_safety_walk',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.character.gender === 'female' && ['subsaharan', 'developing_urban', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 13 && G.age <= 30 && !G.mem.gender_safety,
    text: 'Walking home. The calculations you run every time: which street, which time, how to dress, who to walk with. It is not paranoia — it is the accumulated knowledge of what happens when these calculations go wrong. Your mother taught you, her mother taught her. You know which shortcuts to avoid.',
    context: null,
    choices: [
      {
        text: 'Build the knowledge — learn to navigate',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 3; p.karma += 3; p.setMem('gender_safety', true); },
        inject: null,
      },
      {
        text: 'The constant calculation exhausts and angers you',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 5; p.h -= 5; p.r += 5; p.setMem('gender_safety', true); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'gender_early_marriage_pressure',
    phase: 'adolescence',
    weight: 3,
    isKey: true,
    when: (G) => G.character.gender === 'female' && ['subsaharan', 'developing_unstable', 'wealthy_gulf', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 16 && G.age <= 22 && !G.mem.marriage_pressure && !G.partner,
    text: 'A proposal has been made to your father. The man is older — this is considered good. The bride price discussed is significant — this too is considered good. Your opinion is solicited and considered, but it is not the determining factor. Your mother was married at eighteen. Her mother at fifteen.',
    context: null,
    choices: [
      {
        text: 'Accept — the match is reasonable, the family needs this',
        tag: null,
        outcome: 'The wedding is set.',
        effect: (p) => { p.h -= 10; p.karma += 3; p.r += 8; p.setMem('marriage_pressure', true); },
        inject: null,
      },
      {
        text: 'Ask for time to finish your education first',
        tag: null,
        outcome: 'Your father agrees to wait one year. One year.',
        effect: (p) => { p.e += 5; p.h -= 5; p.r += 5; p.setMem('marriage_pressure', true); },
        inject: null,
      },
      {
        text: 'Refuse — and take the consequence',
        tag: null,
        outcome: 'The atmosphere in the house changes. Your value, as it is understood here, drops.',
        effect: (p) => { p.h -= 15; p.r += 10; p.karma += 8; p.setMem('marriage_pressure', true); p.addFlag('refused_arranged_marriage'); },
        inject: null,
      },
    ],
    effect: null,
  },
  {
    id: 'ss_remittance_dependency',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.character.country.archetype === 'subsaharan' && G.age >= 14 && G.age <= 30 && !G.mem.ss_remittance,
    text: 'The money arrives from abroad — from London, from Doha, from Minneapolis — in irregular pulses. An uncle who emigrated ten years ago sends what he can. When it arrives, school fees are paid, the roof gets fixed. When it doesn\'t, everyone goes quiet. The family\'s survival runs on this wire.',
    context: null,
    choices: [
      {
        text: 'Plan to emigrate yourself and send money back',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 5; p.setMem('ss_remittance', true); p.addFlag('considers_emigration'); },
        inject: null,
      },
      {
        text: 'Build something here instead of leaving',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 5; p.karma += 5; p.setMem('ss_remittance', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── DEVELOPING URBAN EVENTS ──────────────────────────────────────────────────

  {
    id: 'du_shantytown_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.age >= 5 && G.age <= 12 && !G.mem.du_shantytown,
    text: (G) => {
      const name = G.character.country.name;
      if (['Brazil', 'Colombia', 'Peru'].includes(name)) return 'The favela has its own geography. The alleys so narrow two people can\'t pass. Electricity tapped from the main line overhead. The view from the hilltop over the city below is genuinely beautiful and you know it even then.';
      if (['Egypt', 'Morocco', 'Jordan'].includes(name)) return 'The city grew faster than the pipes. Your neighbourhood has electricity but shared water. The building was put up quickly by a relative thirty years ago and has been expanded room by room ever since.';
      if (['Philippines', 'Indonesia', 'Vietnam'].includes(name)) return 'Your barangay floods every monsoon season. Everything important is stored high — documents in plastic, shoes on the shelf, the television on a table. Your family has lived in this house for twenty years, which makes you established.';
      return 'The city has a formal face and an informal one. You grew up in the informal one — improvised, resourceful, dense with life and noise and the specific intimacy of people living closely.';
    },
    choices: [
      {
        text: 'You know every shortcut, every face — this place is home',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 10; p.e += 3; p.setMem('du_shantytown', true); p.addFlag('urban_survivor'); },
        inject: null,
      },
      {
        text: 'You want out. You study harder than anyone.',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 8; p.h -= 3; p.setMem('du_shantytown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_informal_market',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.age >= 7 && G.age <= 15 && !G.mem.du_market,
    text: 'Your mother sells from a stall. Your father drives a motorbike taxi. The income is daily and inconsistent — good week, bad week, festival week, strike week. You help on weekends and understand before the age of ten that there is no sick leave, no holiday, no margin.',
    choices: [
      {
        text: 'Help at the stall — learn the rhythms of trade',
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 5; p.e += 3; p.h += 3; p.setMem('du_market', true); },
        inject: null,
      },
      {
        text: 'Study on your own while they work',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 8; p.setMem('du_market', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_urban_violence',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.age >= 10 && G.age <= 20 && !G.mem.du_violence && ['Brazil', 'Colombia', 'South Africa', 'Mexico'].includes(G.character.country.name),
    isKey: true,
    text: (G) => {
      const name = G.character.country.name;
      if (name === 'Brazil') return 'A drug faction controls the end of your road. The rules are unwritten and clearly communicated: the bakery is open, the phone repair shop is neutral ground, Thursdays before midnight are generally fine. You grow up knowing the map.';
      if (name === 'Colombia') return 'Your city was beautiful before the paramilitaries divided it. Now certain buses go certain ways. You know which murals mark which territory.';
      if (name === 'South Africa') return 'The township has been this way for a long time. What outsiders call disorder has its own logic — the committee, the elders, the hierarchy of grievances. Violence happens at the edges, usually at night.';
      if (name === 'Mexico') return 'The plaza belongs to the cartel by evening. The police agree. The shops close early on certain days for reasons everyone understands and nobody states.';
      return 'Urban violence is part of the landscape — not constant, but structurally present. You navigate it.';
    },
    choices: [
      {
        text: 'Navigate carefully — know the rules and survive',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 5; p.e += 5; p.setMem('du_violence', true); p.addFlag('street_smart'); },
        inject: null,
      },
      {
        text: 'Lose a friend to it',
        tag: null,
        outcome: 'One night a friend doesn\'t come home. The grief is real. The anger has nowhere to go.',
        effect: (p) => { p.h -= 15; p.m -= 8; p.r += 8; p.setMem('du_violence', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_china_gaokao',
    phase: 'adolescence',
    weight: 5,
    when: (G) => G.character.country.name === 'China' && G.age >= 16 && G.age <= 19 && !G.mem.du_gaokao,
    isKey: true,
    text: 'The gaokao is in three days. You have been preparing for three years in earnest, twelve years in total. The exam will determine your university. Your university will determine your career. Your career will determine your marriage prospects. The three days feel like three years compressed into a single point.',
    choices: [
      {
        text: 'You\'re as ready as you\'ll ever be — trust the preparation',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 12; p.h -= 5; p.setMem('du_gaokao', true); p.addFlag('gaokao_survivor'); },
        inject: null,
      },
      {
        text: 'The pressure breaks you — you perform below your ability',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 3; p.h -= 15; p.m -= 8; p.setMem('du_gaokao', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_remittance_sender',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.age >= 20 && G.age <= 40 && G.career && !G.mem.du_remittance && G.money > 200,
    text: 'The first paycheque is split before it arrives. A portion goes home to the village by bus or transfer. Your parents helped pay your school fees. Your younger siblings need uniforms. The expectation is not a burden, exactly — it is the structure of things. But it does affect the apartment you can afford.',
    choices: [
      {
        text: 'Send reliably — it\'s the right thing to do',
        tag: null,
        outcome: null,
        effect: (p) => { p.mo -= 1500; p.karma += 10; p.h += 5; p.setMem('du_remittance', true); },
        inject: null,
      },
      {
        text: 'Send less than expected — you need to build something here',
        tag: null,
        outcome: null,
        effect: (p) => { p.mo -= 500; p.r += 8; p.setMem('du_remittance', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_megacity_commute',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.career && G.age >= 22 && G.age <= 55 && !G.mem.du_commute,
    text: (G) => {
      const name = G.character.country.name;
      if (name === 'China') return 'Three hours a day on the metro. Standing in the crush. The packed carriages at 8am are a full body of people pressing in the same direction. You read, you sleep standing, you arrive at work already used up.';
      if (name === 'India') return 'The local train at rush hour is a different experience from a train. You do not take a train to work — you navigate a river of people that happens to be on rails. In twenty years, your shoulder muscles will remember this.';
      if (['Mexico', 'Brazil', 'Indonesia', 'Philippines'].includes(name)) return 'The traffic in this city was not designed. It grew. What should be forty minutes is two hours some mornings. You become expert at the radio, at podcasts, at the particular patience that comes from having no other option.';
      return 'The commute in this city is its own life — two, three hours daily in buses, trains, on foot. You become fluent in surviving it.';
    },
    choices: [
      {
        text: 'Find ways to use the time — read, learn, think',
        tag: null,
        outcome: null,
        effect: (p) => { p.e += 5; p.setMem('du_commute', true); },
        inject: null,
      },
      {
        text: 'The commute grinds you down over years',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 8; p.h -= 5; p.r += 3; p.setMem('du_commute', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_middle_class_aspiration',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.archetype === 'developing_urban' && G.age >= 28 && G.age <= 45 && G.career && G.money > 5000 && !G.mem.du_middle_class,
    isKey: true,
    text: 'Your parents had nothing. You have a salary, an apartment, a motorbike that is actually yours. The refrigerator works. The children will go to private school. You are the first person in your family to own property. The generation above you has no vocabulary for what you have done — it didn\'t exist as a category.',
    choices: [
      {
        text: 'Celebrate quietly — this is significant',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 15; p.karma += 5; p.setMem('du_middle_class', true); p.addFlag('first_gen_middle_class'); },
        inject: null,
      },
      {
        text: 'The ladder goes further — you want more',
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 5; p.setMem('du_middle_class', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── CROSS-ARCHETYPE TRAUMA / PTSD EVENTS ─────────────────────────────────────

  {
    id: 'trauma_flashback',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('conflict_survivor') && G.age >= 18 && !G.mem.trauma_shown && !G.mentalHealth?.condition,
    isKey: true,
    text: 'It comes back at odd moments. A car backfiring. The particular angle of afternoon light. A smell in the market. Your body responds before your mind catches up — heart hammering, vision narrowing, somewhere else entirely for a few seconds. People around you see nothing unusual. You have learnt to wait it out without moving.',
    choices: [
      {
        text: 'Seek professional help — this is a real injury',
        tag: null,
        outcome: null,
        effect: (p) => { p.m += 8; p.h -= 5; p.setMentalHealth({ condition: 'ptsd', therapy: true }); p.setMem('trauma_shown', true); },
        inject: null,
      },
      {
        text: 'Manage alone — you always have',
        tag: null,
        outcome: null,
        effect: (p) => { p.m -= 8; p.h -= 10; p.setMentalHealth({ condition: 'ptsd' }); p.setMem('trauma_shown', true); },
        inject: null,
      },
      {
        text: 'Talk to someone who went through the same thing',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 5; p.m += 3; p.setMentalHealth({ condition: 'ptsd', therapy: true }); p.setMem('trauma_shown', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'trauma_anniversary',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.mentalHealth?.condition === 'ptsd' && G.age >= 20 && !G.mem.trauma_anniversary,
    text: 'The anniversary is harder than the other days. Not the worst day — somehow the anticipation of it is worse than the day itself, most years. You have learnt to recognise the approach: the shortening of sleep, the irritability, the way certain songs are suddenly unlistenable.',
    choices: [
      {
        text: 'Mark the day consciously — acknowledge it',
        tag: null,
        outcome: null,
        effect: (p) => { p.m += 5; p.h -= 5; p.karma += 5; p.setMem('trauma_anniversary', true); },
        inject: null,
      },
      {
        text: 'Work through it — keep moving',
        tag: null,
        outcome: null,
        effect: (p) => { p.h -= 8; p.setMem('trauma_anniversary', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cz_late_life_exile',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.character.country.archetype === 'conflict_zone' && G.age >= 55 && G.flags.includes('refugee') && !G.mem.cz_exile_old,
    isKey: true,
    text: 'You have been away for longer than you were home. The country you left exists now as photographs, phone calls, and the specific way you cook certain things. Your children were born here, in this country that took you in. They speak the new language without an accent. The old place lives in you alone.',
    choices: [
      {
        text: 'The exile is permanent — make peace with it',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 5; p.r += 8; p.karma += 8; p.setMem('cz_exile_old', true); },
        inject: null,
      },
      {
        text: 'Return — whatever state it is in now',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 15; p.r -= 5; p.setMem('cz_exile_old', true); },
        inject: null,
      },
      {
        text: 'Teach the children the old language before it is gone',
        tag: null,
        outcome: null,
        effect: (p) => { p.h += 8; p.karma += 10; p.setMem('cz_exile_old', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_pollution_health',
    phase: 'childhood',
    weight: 4,
    when: (G) => ['developing_urban', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 10 && !G.mem.du_pollution,
    text: 'The air in this city has a particular quality on still days — yellow-grey, heavy, scratching the back of the throat. Your schoolmates have chronic coughs that are treated as ordinary. The river your parents swam in is not swimmable. The fish are gone from that stretch.',
    choices: null,
    effect: (p) => { p.m -= 8; p.setMem('du_pollution', true); p.addFlag('pollution_exposure'); },
  },

  {
    id: 'du_india_caste_encounter',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.name === 'India' && G.age >= 10 && !G.mem.india_caste,
    isKey: true,
    text: 'Caste is in the air before you have a word for it. The seating at school has a pattern you don\'t fully understand. Your mother is careful about which water is offered at whose house. A friend\'s family does not eat with yours. Later, you find the official vocabulary. The experience had a name all along.',
    choices: [
      {
        text: 'The system angers you — you push back where you can',
        tag: null,
        outcome: null,
        effect: (p) => { p.karma += 8; p.h -= 5; p.e += 3; p.setMem('india_caste', true); p.addFlag('politically_aware'); },
        inject: null,
      },
      {
        text: 'Navigate it — the cost of confrontation is too high',
        tag: null,
        outcome: null,
        effect: (p) => { p.r += 8; p.h -= 8; p.setMem('india_caste', true); },
        inject: null,
      },
      {
        text: 'Your family is from a higher caste — you benefit from it',
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 3; p.karma -= 5; p.setMem('india_caste', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'du_unstable_currency',
    phase: 'adolescence',
    weight: 3,
    when: (G) => ['developing_unstable', 'developing_urban'].includes(G.character.country.archetype) && G.age >= 16 && !G.mem.du_currency && G.currentYear >= 1990,
    text: (G) => {
      const name = G.character.country.name;
      if (name === 'Venezuela') return 'The bolivar lost half its value in a single week. Your savings are in a currency that is evaporating. The supermarket shelves are empty on the protein aisle and people are lining up for flour.';
      if (name === 'Zimbabwe') return 'The zeros multiplied. The trillion-dollar note. The thing that was not supposed to be possible.';
      return 'The exchange rate crisis arrives without announcement. Your salary buys less each month. People are converting to dollars wherever possible. The formal economy and the parallel economy are barely speaking to each other.';
    },
    choices: [
      {
        text: 'Convert savings to hard currency immediately',
        tag: null,
        outcome: null,
        effect: (p) => { p.w += 8; p.e += 3; p.setMem('du_currency', true); },
        inject: null,
      },
      {
        text: 'You wait too long — the savings are gone',
        tag: null,
        outcome: null,
        effect: (p) => { p.mo -= 3000; p.h -= 10; p.setMem('du_currency', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FUGITIVE / WANTED SYSTEM EVENTS ─────────────────────────────────────────

  {
    id: 'detective_visits',
    phase: null,
    weight: 5,
    when: (G) => G.flags.includes('killer') && !G.flags.includes('murder_charge') && !G.mem?.murder_pending_detection && G.age > 16,
    text: 'A plain-clothes detective knocks on your door. They have questions about the death of someone you knew.',
    choices: [
      { text: 'Cooperate fully', tag: null, outcome: 'You answer calmly. They seem to believe you — for now.', effect: (p) => { p.m -= 8; p.s += 2 } },
      { text: 'Lawyer up immediately', tag: null, outcome: 'You say nothing without a lawyer present. They leave, but you know they\'ll be back.', effect: (p) => { p.mo -= 3000; p.m -= 5 } },
      { text: 'Flee before they can question you', tag: null, outcome: 'You bolt. Now you\'re officially a suspect.', effect: (p) => { p.m -= 15; p.addFlag('suspected_murderer') } },
    ],
  },

  {
    id: 'witness_comes_forward',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('suspected_murderer') && G.age > 16,
    text: 'A witness who saw something contacts the police. Investigators now have a credible lead pointing to you.',
    isKey: true,
    choices: [
      { text: 'Pay the witness to recant ($15,000)', tag: null, outcome: 'They take the money and change their story. The case weakens — but you\'ve created another loose end.', effect: (p) => { p.mo -= 15000; p.karma -= 10; p.m -= 10 } },
      { text: 'Disappear before the arrest warrant arrives', tag: null, outcome: 'You go underground. You are now a wanted fugitive.', effect: (p) => { p.addFlag('escaped_prisoner'); p.m -= 20 } },
      { text: 'Face the music', tag: null, outcome: 'You turn yourself in. A lawyer negotiates. The evidence is circumstantial.', effect: (p) => { p.m -= 15; p.karma += 5; p.s += 3 } },
    ],
  },

  {
    id: 'police_closing_in',
    phase: null,
    weight: 5,
    when: (G) => G.flags.includes('escaped_prisoner') && !G.flags.includes('assumed_identity') && G.age > 16,
    text: 'You spot a police cruiser parked outside your building. Your face has been circulated in the media.',
    choices: [
      { text: 'Slip out the back immediately', tag: null, outcome: 'You disappear into the crowds. You stay one step ahead — for now.', effect: (p) => { p.m -= 12; p.h -= 5 } },
      { text: 'Change your appearance urgently', tag: null, outcome: 'You cut your hair, change your clothes. It buys you time.', effect: (p) => { p.m -= 8; p.addFlag('appearance_changed') } },
      { text: 'Surrender', tag: null, outcome: 'You walk out with your hands up. The weight lifts, even as the cuffs click.', effect: (p) => { p.m -= 5; p.r += 10; p.karma += 8 } },
    ],
  },

  {
    id: 'old_friend_recognises_you',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('escaped_prisoner') && G.age > 18,
    text: G => `An old acquaintance spots you at a market. They look surprised — your face was on the news. They haven't reached for their phone yet.`,
    choices: [
      { text: 'Beg them not to turn you in', tag: null, outcome: 'They hesitate, then nod. You owe them one — and they know it.', effect: (p) => { p.m -= 5; p.karma -= 3 } },
      { text: 'Threaten them into silence', tag: null, outcome: 'They back off, terrified. But now there\'s another person with a reason to hate you.', effect: (p) => { p.karma -= 15; p.m -= 8; p.addFlag('violent') } },
      { text: 'Disappear before they can act', tag: null, outcome: 'You blend into the crowd and vanish. Another close call.', effect: (p) => { p.m -= 10; p.h -= 3 } },
    ],
  },

  {
    id: 'identity_blown',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('assumed_identity') && G.age > 18,
    text: 'Someone who knew you before spots through your new identity. They call you by your real name in a crowded place.',
    isKey: true,
    choices: [
      { text: 'Deny everything and walk away calmly', tag: null, outcome: 'You brazen it out. They look confused. You move cities the next week.', effect: (p) => { p.m -= 12; p.s -= 3 } },
      { text: 'Confide in them and ask for help', tag: null, outcome: 'It\'s a gamble. They cover for you — this time.', effect: (p) => { p.m -= 8; p.karma += 3 } },
      { text: 'Abandon the identity and start again', tag: null, outcome: 'Another $8,000. Another name. Another life.', effect: (p) => { p.mo -= 8000; p.m -= 20 } },
    ],
  },

  {
    id: 'crime_pays_off',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('escaped_prisoner') && G.flags.includes('assumed_identity') && G.mem?.years_underground >= 5,
    text: 'Five years underground. No visits from police, no near-misses. Perhaps you have truly become someone else.',
    choices: [
      { text: 'Accept your new life fully', tag: null, outcome: 'You let the old self go. The ghosts grow quieter.', effect: (p) => { p.m += 15; p.r -= 10; p.addFlag('new_life') } },
      { text: 'Try to reconnect with old family', tag: null, outcome: 'You reach out carefully. It is equal parts comfort and risk.', effect: (p) => { p.m += 8; p.karma += 5; p.r -= 5 } },
    ],
  },

  {
    id: 'fugitive_stress',
    phase: null,
    weight: 7,
    when: (G) => G.flags.includes('escaped_prisoner') && G.age > 16,
    text: 'Living in the shadows takes a relentless toll. You sleep lightly, jump at footsteps, trust no one completely.',
    choices: [
      { text: 'Push through — freedom is worth it', tag: null, outcome: 'You endure. The paranoia becomes background noise.', effect: (p) => { p.m -= 10; p.h -= 3; p.e += 2 } },
      { text: 'Self-medicate to cope', tag: null, outcome: 'It dulls the edge — at a price.', effect: (p) => { p.m -= 3; p.h -= 8; p.addFlag('alcohol_habit') } },
    ],
  },

  {
    id: 'border_informant',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('illegal_immigrant') && G.flags.includes('escaped_prisoner'),
    text: 'A local finds out you crossed the border illegally. They hint they could report you to immigration authorities — or forget they ever saw you.',
    choices: [
      { text: 'Pay them to stay quiet ($3,000)', tag: null, outcome: 'Money changes hands. They disappear. For now.', effect: (p) => { p.mo -= 3000; p.m -= 5 } },
      { text: 'Refuse and call their bluff', tag: null, outcome: 'Either they were bluffing, or they weren\'t. You wait with your bags packed.', effect: (p) => { p.m -= 12 } },
      { text: 'Move on to another city in this country', tag: null, outcome: 'You cut ties and relocate within the country. The threat recedes.', effect: (p) => { p.m -= 8; p.h -= 3 } },
    ],
  },

  // ── RELATIONSHIP ANNIVERSARIES ───────────────────────────────────────────────

  {
    id: 'relationship_1yr',
    phase: null,
    weight: 5,
    when: (G) => G.partner && G.partner.years === 1 && !G.mem.anniv_1yr,
    text: G => `One year with ${G.partner?.name}. You think about everything that's happened and where you'd both be without that first meeting.`,
    choices: [
      { text: 'Celebrate properly — dinner, gifts, the works', tag: null, outcome: 'A night to remember. You feel closer than ever.', effect: (p) => { p.mo -= 200; p.m += 10; p.partnerRel(8); p.setMem('anniv_1yr', true) } },
      { text: 'Mark the day quietly together', tag: null, outcome: 'Simple and genuine. They appreciate the thought.', effect: (p) => { p.m += 6; p.partnerRel(5); p.setMem('anniv_1yr', true) } },
      { text: 'Let it pass without mention', tag: null, outcome: 'They notice. It leaves a small, cold absence.', effect: (p) => { p.partnerRel(-6); p.setMem('anniv_1yr', true) } },
    ],
  },

  {
    id: 'relationship_5yr',
    phase: null,
    weight: 4,
    isKey: true,
    when: (G) => G.partner && G.partner.years === 5 && !G.mem.anniv_5yr,
    text: G => `Five years with ${G.partner?.name}. The electricity of newness has given way to something steadier — a presence that has become architecture.`,
    choices: [
      { text: 'Reflect on how far you\'ve come together', tag: null, outcome: 'Gratitude, quietly held. It strengthens something.', effect: (p) => { p.m += 8; p.partnerRel(10); p.r -= 3; p.setMem('anniv_5yr', true) } },
      { text: 'Worry that you\'ve grown too comfortable', tag: null, outcome: 'The doubt flickers, then fades. Comfort isn\'t complacency.', effect: (p) => { p.m -= 4; p.r += 3; p.setMem('anniv_5yr', true) } },
    ],
  },

  {
    id: 'relationship_10yr',
    phase: null,
    weight: 3,
    isKey: true,
    when: (G) => G.partner && G.partner.years === 10 && !G.mem.anniv_10yr,
    text: G => `A decade with ${G.partner?.name}. Ten years of choosing each other. Not every day has been easy. But the choosing kept happening.`,
    choices: [
      { text: 'Renew your vows or make a new promise', tag: null, outcome: 'A public recommitment. The room is smaller than the first ceremony, but the feeling is larger.', effect: (p) => { p.m += 15; p.partnerRel(15); p.setMem('anniv_10yr', true) } },
      { text: 'Mark it simply — just the two of you', tag: null, outcome: 'What you have is private. It doesn\'t need an audience.', effect: (p) => { p.m += 10; p.partnerRel(10); p.setMem('anniv_10yr', true) } },
    ],
  },

  // ── MENOPAUSE ────────────────────────────────────────────────────────────────

  {
    id: 'menopause_onset',
    phase: null,
    weight: 3,
    isKey: true,
    when: (G) => G.character.gender === 'female' && G.age >= 48 && G.age <= 55 && !G.flags.includes('menopause') && !G.mem.menopause_check,
    text: 'Your period becomes irregular and then, gradually, absent. Perimenopause. The body making a slow announcement. Heat flushes, disrupted sleep, a fogginess you\'ve named but not yet made peace with.',
    choices: [
      { text: 'See a doctor about HRT', tag: null, outcome: 'Hormone replacement therapy evens the transition considerably. The fog lifts.', effect: (p) => { p.mo -= 800; p.h += 8; p.m += 5; p.addFlag('menopause'); p.setMem('menopause_check', true) } },
      { text: 'Manage it naturally', tag: null, outcome: 'Diet, exercise, and patience. Not easy, but navigable.', effect: (p) => { p.h -= 5; p.m -= 4; p.addFlag('menopause'); p.setMem('menopause_check', true) } },
      { text: 'Push through — it will pass', tag: null, outcome: 'It does pass, eventually. The years between are harder than they needed to be.', effect: (p) => { p.h -= 10; p.m -= 8; p.addFlag('menopause'); p.setMem('menopause_check', true) } },
    ],
  },

  {
    id: 'menopause_mood',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('menopause') && G.age <= 60 && !G.mem.menopause_mood,
    text: 'The hormonal shift brings unexpected emotional terrain. Some days you feel inexplicably tearful; others, a clarity and steadiness you haven\'t felt in years.',
    choices: [
      { text: 'Talk to someone — therapist, friend, partner', tag: null, outcome: 'Naming it reduces its power, if only slightly.', effect: (p) => { p.m += 8; p.h += 3; p.setMem('menopause_mood', true) } },
      { text: 'Work through it alone', tag: null, outcome: 'You always have. The same strategy, longer runway.', effect: (p) => { p.m -= 5; p.setMem('menopause_mood', true) } },
    ],
  },

  // ── DEMENTIA / COGNITIVE DECLINE ─────────────────────────────────────────────

  {
    id: 'cognitive_decline_early',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 72 && G.age <= 80 && !G.mem.dementia_onset && Math.random() < 0.3,
    text: 'You misplace your keys three times in a week. You lose a word mid-sentence — not just momentarily, but really lose it. Your doctor calls it "mild cognitive impairment" and asks you to come back in six months.',
    isKey: true,
    choices: [
      { text: 'Start cognitive exercises and lifestyle changes', tag: null, outcome: 'Brain training, social engagement, physical activity. You hold the line for longer.', effect: (p) => { p.e += 3; p.h += 3; p.m -= 5; p.addFlag('mild_cognitive_impairment'); p.setMem('dementia_onset', true) } },
      { text: 'Get a second opinion', tag: null, outcome: 'The second doctor agrees. Different words, same landscape.', effect: (p) => { p.m -= 8; p.addFlag('mild_cognitive_impairment'); p.setMem('dementia_onset', true) } },
      { text: 'Dismiss it — everyone forgets things', tag: null, outcome: 'Some dismissals are self-protection. This one costs time.', effect: (p) => { p.m -= 3; p.h -= 3; p.addFlag('mild_cognitive_impairment'); p.setMem('dementia_onset', true) } },
    ],
  },

  {
    id: 'dementia_progressed',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('mild_cognitive_impairment') && G.age >= 78 && !G.mem.dementia_progressed,
    text: 'The diagnosis is now Alzheimer\'s. Not a surprise, exactly — but hearing the name changes something. You think about what you want to do while you can still plan it.',
    isKey: true,
    choices: [
      { text: 'Write letters to the people who matter most', tag: null, outcome: 'Hours at the desk, finding the words. The most important thing you\'ve done in years.', effect: (p) => { p.m += 10; p.r -= 15; p.karma += 10; p.addFlag('dementia'); p.setMem('dementia_progressed', true) } },
      { text: 'Spend every remaining clear day with family', tag: null, outcome: 'The clarity comes in waves. You use each one.', effect: (p) => { p.m += 8; p.r -= 10; p.addFlag('dementia'); p.setMem('dementia_progressed', true) } },
      { text: 'Plan a bucket list trip', tag: null, outcome: 'You go. The place is everything and the memory of it will outlast you in others.', effect: (p) => { p.m += 15; p.mo -= 5000; p.addFlag('dementia'); p.setMem('dementia_progressed', true) } },
    ],
  },

  // ── STI EVENTS ───────────────────────────────────────────────────────────────

  {
    id: 'sti_discovered',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('has_std') && !G.mem.sti_told && G.age >= 16,
    text: 'A routine check-up, or maybe symptoms you\'d been quietly ignoring. The test comes back positive. Your doctor runs through options — treatment, notification of partners, follow-up.',
    isKey: true,
    choices: [
      { text: 'Start treatment immediately', tag: null, outcome: 'You begin the course. It\'s manageable. You make the calls you need to make.', effect: (p) => { p.mo -= 300; p.h += 5; p.m -= 5; p.setMem('sti_told', true) } },
      { text: 'Treat it quietly and tell no one', tag: null, outcome: 'The treatment works. The silence stays. A weight you chose.', effect: (p) => { p.mo -= 300; p.h += 3; p.karma -= 10; p.setMem('sti_told', true) } },
      { text: 'Delay — you\'ll deal with it later', tag: null, outcome: 'Later costs more — in health, in damage, in the relationship you haven\'t yet told.', effect: (p) => { p.h -= 8; p.m -= 5; p.setMem('sti_told', true) } },
    ],
  },

  // ── PAPARAZZI / FAME PRESSURE ────────────────────────────────────────────────

  {
    id: 'stalker_fan',
    phase: null,
    weight: 3,
    when: (G) => (G.fame ?? 0) >= 50 && !G.mem.stalkerEvent,
    text: 'Someone has been outside your home three days running. The messages escalate from admiration to obsession. Your team is aware, but you are the one who has to live inside this.',
    isKey: true,
    choices: [
      { text: 'Get a restraining order', tag: null, outcome: 'It\'s effective, mostly. You feel safer. Fame costs differently than you expected.', effect: (p) => { p.mo -= 2000; p.m += 5; p.setMem('stalkerEvent', true) } },
      { text: 'Hire additional security', tag: null, outcome: 'The privacy shrinks as the protection grows. A transaction you didn\'t choose to make.', effect: (p) => { p.mo -= 5000; p.m -= 3; p.h += 3; p.setMem('stalkerEvent', true) } },
      { text: 'Ignore it and hope it passes', tag: null, outcome: 'Mostly it does. The not-knowing is its own kind of cost.', effect: (p) => { p.m -= 10; p.h -= 5; p.setMem('stalkerEvent', true) } },
    ],
  },

  {
    id: 'endorsement_deal',
    phase: null,
    weight: 4,
    when: (G) => (G.fame ?? 0) >= 55 && !G.mem.endorsementDeal,
    text: 'A brand reaches out through your agent. The numbers are real. So are the strings — they want six posts over three months, a specific tone, photos that feel organic but aren\'t.',
    choices: [
      { text: 'Take it — the money is significant', tag: null, outcome: 'You sign. The posts go up. Your audience notices, mostly without comment.', effect: (p) => { p.mo += 15000; p.m -= 3; p.setMem('endorsementDeal', true) } },
      { text: 'Only if you actually like the product', tag: null, outcome: 'It\'s one you\'d buy anyway. That makes the posts easier. The money helps.', effect: (p) => { p.mo += 8000; p.m += 3; p.karma += 3; p.setMem('endorsementDeal', true) } },
      { text: 'Decline — your credibility matters more', tag: null, outcome: 'The agent is frustrated. You feel fine about the decision.', effect: (p) => { p.m += 5; p.karma += 5; p.setMem('endorsementDeal', true) } },
    ],
  },

  // ── VEHICLE EVENTS ───────────────────────────────────────────────────────────

  {
    id: 'speeding_ticket',
    phase: null,
    weight: 6,
    when: (G) => (G.flags.includes('has_vehicle') || (G.assets?.vehicles ?? []).some(v => v.tier !== 'bicycle')) && G.age >= 17 && !G.mem.speeding_2yr && Math.random() < 0.25,
    text: 'Blue lights in the rear-view mirror. You were doing 52 in a 40. The officer is polite and professional about it, which somehow makes it worse.',
    choices: [
      { text: 'Pay the fine and take the points', tag: null, outcome: 'Seventy dollars and three points. Your insurance company will have thoughts.', effect: (p) => { p.mo -= 200; p.m -= 3; p.setMem('speeding_2yr', true) } },
      { text: 'Contest it in traffic court', tag: null, outcome: 'You show up in a collared shirt. The judge reduces the fine but not the points.', effect: (p) => { p.mo -= 100; p.m -= 2; p.setMem('speeding_2yr', true) } },
    ],
  },

  {
    id: 'car_breakdown',
    phase: null,
    weight: 5,
    when: (G) => (G.flags.includes('has_vehicle') || (G.assets?.vehicles ?? []).some(v => v.tier !== 'bicycle')) && G.age >= 17 && !G.mem.breakdown_yr,
    text: 'The check engine light has been on for two weeks. Today it answered its own question. You\'re on the hard shoulder, hazards blinking, waiting for a tow.',
    choices: [
      { text: 'Get it towed to a garage — fix it properly', tag: null, outcome: 'The mechanic\'s diagnosis comes with a number that takes a day to emotionally accept.', effect: (p) => { p.mo -= 1800; p.m -= 5; p.setMem('breakdown_yr', true) } },
      { text: 'Find the cheapest fix available', tag: null, outcome: 'It\'s running again. For now. You can hear something new every time you brake.', effect: (p) => { p.mo -= 600; p.m -= 4; p.setMem('breakdown_yr', true) } },
      { text: 'Sell it and buy something newer', tag: null, outcome: 'You sell it as-is for less than it\'s worth. The relief is worth the loss.', effect: (p) => { p.mo -= 3000; p.m += 2; p.setMem('breakdown_yr', true) } },
    ],
  },

  {
    id: 'fender_bender',
    phase: null,
    weight: 5,
    when: (G) => (G.flags.includes('has_vehicle') || (G.assets?.vehicles ?? []).some(v => v.tier !== 'bicycle')) && G.age >= 17 && !G.mem.fender_bender_yr,
    text: 'A slow-speed collision in a car park. Yours or theirs — the damage is minor but the exchange of insurance details is not.',
    choices: [
      { text: 'Go through insurance', tag: null, outcome: 'The claim is straightforward. Your premium goes up the following year anyway.', effect: (p) => { p.mo -= 500; p.m -= 4; p.setMem('fender_bender_yr', true) } },
      { text: 'Settle privately — pay them cash', tag: null, outcome: 'You trade numbers, exchange money, and try not to think about what might still show up.', effect: (p) => { p.mo -= 900; p.m -= 3; p.setMem('fender_bender_yr', true) } },
    ],
  },

  {
    id: 'road_rage_incident',
    phase: null,
    weight: 4,
    when: (G) => (G.flags.includes('has_vehicle') || (G.assets?.vehicles ?? []).some(v => v.tier !== 'bicycle')) && G.age >= 18 && !G.mem.road_rage_yr,
    text: 'You were cut off at the roundabout. What follows is a ten-minute escalation that you can see is going nowhere and participate in anyway.',
    choices: [
      { text: 'Let it go — it\'s not worth it', tag: null, outcome: 'You breathe out. They take the next exit. You\'re still a little angry but fine.', effect: (p) => { p.m -= 2; p.setMem('road_rage_yr', true) } },
      { text: 'Honk, follow, confront at the lights', tag: null, outcome: 'The confrontation is brief and unsatisfying. Nothing was resolved. Your hands shook.', effect: (p) => { p.m -= 5; p.h -= 2; p.setMem('road_rage_yr', true) } },
      { text: 'Call it in — record the plate', tag: null, outcome: 'The police non-emergency line takes a report. Nothing will happen but you feel marginally better.', effect: (p) => { p.m -= 1; p.setMem('road_rage_yr', true) } },
    ],
  },

  {
    id: 'car_stolen',
    phase: null,
    weight: 2,
    isKey: true,
    when: (G) => (G.flags.includes('has_vehicle') || (G.assets?.vehicles ?? []).some(v => v.tier !== 'bicycle')) && G.age >= 17 && !G.mem.car_stolen,
    text: 'You walk to where you parked the car. The space is empty. You stand there for a moment making sure you are thinking about the right street.',
    choices: [
      { text: 'Report it immediately', tag: null, outcome: 'The police take a report. The car is found three days later, stripped, in an industrial estate.', effect: (p) => { p.m -= 10; p.mo -= 2000; p.setMem('car_stolen', true) } },
      { text: 'Check with insurance first', tag: null, outcome: 'Insurance pays out minus the excess. The bureaucracy takes six weeks and is its own kind of ordeal.', effect: (p) => { p.m -= 12; p.mo -= 1500; p.setMem('car_stolen', true) } },
    ],
  },

  {
    id: 'supercar_attention',
    phase: null,
    weight: 4,
    when: (G) => (G.assets?.vehicles ?? []).some(v => v.tier === 'supercar') && !G.mem.supercar_attention,
    text: 'You drove it somewhere ordinary — a supermarket, a petrol station. Three people photographed it. Two knocked on your window at lights to ask what it is.',
    choices: [
      { text: 'Enjoy it — this is why you bought it', tag: null, outcome: 'The attention is part of the car. You lean into it.', effect: (p) => { p.m += 8; p.s += 3; p.setMem('supercar_attention', true) } },
      { text: 'Find it exhausting', tag: null, outcome: 'You miss driving anonymously. The car stays in the garage on weekdays now.', effect: (p) => { p.m -= 3; p.setMem('supercar_attention', true) } },
    ],
  },

  // ── CHILDHOOD EVENTS ─────────────────────────────────────────────────────────

  {
    id: 'childhood_bully',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem.bully_event,
    text: 'There\'s a kid at school who has decided you\'re the problem. It starts with words, then lunch stolen, then the group that laughs when you walk past.',
    choices: [
      { text: 'Tell a teacher', tag: null, outcome: 'The teacher speaks to them. It gets worse for two weeks, then quietly stops.', effect: (p) => { p.m -= 3; p.e += 2; p.setMem('bully_event', true) } },
      { text: 'Stand your ground', tag: null, outcome: 'You say something back. It doesn\'t land perfectly but it lands. A small pivot.', effect: (p) => { p.s += 3; p.m += 2; p.setMem('bully_event', true) } },
      { text: 'Avoid them and wait it out', tag: null, outcome: 'You become very good at reading a room, knowing where not to stand.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('bully_event', true) } },
      { text: 'Tell your parents', tag: null, outcome: 'They call the school. There is a meeting. Nothing resolves cleanly but the pressure eases.', effect: (p) => { p.m += 3; p.setMem('bully_event', true) } },
    ],
  },

  {
    id: 'childhood_first_best_friend',
    phase: 'childhood',
    weight: 8,
    when: (G) => G.age >= 6 && G.age <= 10 && !G.mem.first_best_friend,
    text: 'You spend every recess with the same person. You have a shared language now — references no one else gets, a particular laugh, a way of being that feels like a second self.',
    choices: [
      { text: 'Invite them over after school', tag: null, outcome: 'They come. Your bedroom becomes a world you\'ve built together.', effect: (p) => { p.m += 8; p.s += 4; p.setMem('first_best_friend', true) } },
      { text: 'Keep it to school only', tag: null, outcome: 'There\'s a boundary, and it holds. It\'s still good, just contained.', effect: (p) => { p.m += 4; p.setMem('first_best_friend', true) } },
    ],
  },

  {
    id: 'childhood_parents_fight',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.age >= 6 && G.age <= 13 && G.parents && G.parents.length >= 2 && !G.mem.parents_fight,
    text: 'You wake up to voices from downstairs — not angry-loud, but a kind of controlled intensity that is worse. You lie still and listen without meaning to.',
    choices: [
      { text: 'Go downstairs and ask if everything is okay', tag: null, outcome: 'They stop. Your mother says "everything\'s fine." You know it isn\'t but the night gets quieter.', effect: (p) => { p.m -= 5; p.s += 2; p.e += 2; p.setMem('parents_fight', true) } },
      { text: 'Put headphones on and pretend to sleep', tag: null, outcome: 'The music fills the space where the silence should be. It works enough.', effect: (p) => { p.m -= 6; p.setMem('parents_fight', true) } },
      { text: 'Confide in a friend at school next day', tag: null, outcome: 'Saying it out loud helps more than you expected. Someone else has heard those sounds too.', effect: (p) => { p.m += 3; p.s += 2; p.setMem('parents_fight', true) } },
    ],
  },

  {
    id: 'childhood_school_play',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem.school_play,
    text: 'Auditions for the school play. The drama teacher hands out sheets. You didn\'t know you wanted a part until you saw the list.',
    choices: [
      { text: 'Try out for the lead', tag: null, outcome: 'You don\'t get it, but you get something — a small part, stage fright, and a curtain call.', effect: (p) => { p.s += 4; p.m += 5; p.setMem('school_play', true) } },
      { text: 'Go for a background role', tag: null, outcome: 'Backstage suits you, it turns out. You\'re the one who always knows what comes next.', effect: (p) => { p.e += 2; p.m += 3; p.setMem('school_play', true) } },
      { text: 'Skip the audition', tag: null, outcome: 'You watch from the audience. It\'s fine. But there\'s a small "what if" that doesn\'t quite leave.', effect: (p) => { p.m -= 2; p.r += 3; p.setMem('school_play', true) } },
    ],
  },

  {
    id: 'childhood_pet_dies',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 7 && G.age <= 14 && G.flags.includes('has_pet') && !G.mem.pet_died,
    isKey: true,
    text: 'You find your pet still in the morning. The stillness is different from sleeping. You already know before your parents do.',
    choices: [
      { text: 'Cry and let yourself grieve', tag: null, outcome: 'It takes a few weeks. You learn something about the weight of absence.', effect: (p) => { p.m -= 10; p.e += 3; p.setMem('pet_died', true) } },
      { text: 'Hold it together — it\'s just an animal', tag: null, outcome: 'You\'re fine, you tell everyone. The dream you have about them three nights later tells a different story.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('pet_died', true) } },
      { text: 'Ask for a new pet to fill the gap', tag: null, outcome: 'Your parents get you one. It helps and it doesn\'t.', effect: (p) => { p.m -= 3; p.setMem('pet_died', true) } },
    ],
  },

  {
    id: 'childhood_move_schools',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 7 && G.age <= 13 && !G.mem.moved_schools,
    text: 'Your family is moving. New house, new neighborhood, new school in September. You look at the map and try to calculate the distance from everyone you know.',
    choices: [
      { text: 'Promise to stay in touch with old friends', tag: null, outcome: 'For a while, you do. Then the calls get shorter. Then they stop. Then one resurfaces on social media fifteen years later.', effect: (p) => { p.m -= 5; p.s += 2; p.setMem('moved_schools', true) } },
      { text: 'Focus on making it work at the new place', tag: null, outcome: 'You arrive with open hands. The first week is hard. The second is easier.', effect: (p) => { p.s += 5; p.m += 2; p.setMem('moved_schools', true) } },
      { text: 'Resist it — ask to stay with a friend', tag: null, outcome: 'Your parents say no. The anger is real but brief; the adaptation happens anyway.', effect: (p) => { p.m -= 7; p.setMem('moved_schools', true) } },
    ],
  },

  {
    id: 'childhood_hobby_discovered',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem.hobby_found,
    text: 'One afternoon changes shape. A borrowed instrument, a library book, a cousin\'s sketchbook — and something in you that didn\'t have a name finds one.',
    choices: [
      { text: 'Ask to take lessons', tag: null, outcome: 'Your parents find the money somehow. The teacher is brusque but good. You improve.', effect: (p) => { p.e += 5; p.m += 6; p.mo -= 1200; p.setMem('hobby_found', true) } },
      { text: 'Teach yourself', tag: null, outcome: 'You accumulate hours without anyone watching. That suits you, it turns out.', effect: (p) => { p.e += 6; p.m += 4; p.setMem('hobby_found', true) } },
      { text: 'Try it briefly, then move on', tag: null, outcome: 'Not everything sticks. But it pointed somewhere.', effect: (p) => { p.m += 2; p.setMem('hobby_found', true) } },
    ],
  },

  // ── LATE LIFE EVENTS ──────────────────────────────────────────────────────────

  {
    id: 'late_life_retirement_adjustment',
    phase: 'late_life',
    weight: 6,
    when: (G) => G.age >= 65 && G.age <= 70 && G.flags.includes('retired') && !G.mem.retirement_adj,
    text: 'Three months into retirement and the calendar is a strange blank. You\'ve spent forty years being needed at specific times. This open water requires different swimming.',
    isKey: true,
    choices: [
      { text: 'Fill it with purpose — volunteer or consult', tag: null, outcome: 'Structure re-enters on your terms. The work is smaller and more deliberate.', effect: (p) => { p.m += 8; p.s += 3; p.karma += 5; p.setMem('retirement_adj', true) } },
      { text: 'Embrace the unscheduled life', tag: null, outcome: 'Morning coffee without a clock. You adjust in about six months.', effect: (p) => { p.m += 5; p.h += 3; p.setMem('retirement_adj', true) } },
      { text: 'Struggle with the loss of routine', tag: null, outcome: 'The restlessness becomes its own kind of work. You find your way out eventually.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('retirement_adj', true) } },
    ],
  },

  {
    id: 'late_life_old_friend_contact',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.age >= 65 && !G.mem.old_friend_contact,
    text: 'A name you haven\'t spoken in twenty years sends a message. They found you through a mutual contact. The last time you saw them was before two marriages and three careers.',
    choices: [
      { text: 'Reconnect fully — meet for lunch', tag: null, outcome: 'The gap closes faster than you expected. Some friendships are dormant, not dead.', effect: (p) => { p.m += 10; p.s += 3; p.setMem('old_friend_contact', true) } },
      { text: 'Reply warmly but keep it brief', tag: null, outcome: 'A pleasant exchange. You don\'t push further, and neither do they.', effect: (p) => { p.m += 4; p.setMem('old_friend_contact', true) } },
      { text: 'Leave the message on read', tag: null, outcome: 'You\'re not sure why. Some chapters are closed for reasons you can\'t fully name.', effect: (p) => { p.r += 5; p.setMem('old_friend_contact', true) } },
    ],
  },

  {
    id: 'late_life_driving_concern',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.age >= 78 && !G.mem.driving_concern,
    text: 'Your children have been having a conversation without you, you suspect. Small incidents — a dent on the bumper you don\'t remember, a near-miss on the highway. They want to talk about the driving.',
    isKey: true,
    choices: [
      { text: 'Agree to a formal assessment', tag: null, outcome: 'You pass, barely. The restrictions feel fair, mostly.', effect: (p) => { p.m -= 5; p.h += 2; p.setMem('driving_concern', true) } },
      { text: 'Voluntarily stop driving', tag: null, outcome: 'Before anyone asks you to. It costs independence but gains dignity.', effect: (p) => { p.m -= 8; p.karma += 5; p.setMem('driving_concern', true) } },
      { text: 'Push back — you\'re fine', tag: null, outcome: 'The argument is circular. They back down. You notice yourself checking twice now, at every turn.', effect: (p) => { p.m -= 3; p.h -= 2; p.setMem('driving_concern', true) } },
    ],
  },

  {
    id: 'late_life_legacy_question',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 70 && !G.mem.legacy_question,
    text: 'Someone asks you, at a dinner, what you want to be remembered for. The question catches you off guard. You\'ve been so busy being alive you haven\'t finished deciding.',
    choices: [
      { text: 'The relationships — the people you stayed with', tag: null, outcome: 'You say it out loud and find you mean it completely.', effect: (p) => { p.m += 8; p.karma += 5; p.r -= 8; p.setMem('legacy_question', true) } },
      { text: 'The work — what you built or made', tag: null, outcome: 'Your answer is clean. Whether it\'s the whole truth takes longer to resolve.', effect: (p) => { p.m += 5; p.e += 3; p.setMem('legacy_question', true) } },
      { text: 'You don\'t know yet', tag: null, outcome: 'The table laughs warmly. It\'s the most honest answer at the table.', effect: (p) => { p.m += 6; p.r -= 3; p.karma += 3; p.setMem('legacy_question', true) } },
    ],
  },

  {
    id: 'late_life_grandchildren_time',
    phase: 'late_life',
    weight: 7,
    when: (G) => G.age >= 62 && G.children && G.children.length > 0 && !G.mem.grandkids_time,
    text: 'Your grandchildren are at the age where you are still interesting to them. They want to know about before — before they existed, before their parents were adults, before everything was already decided.',
    choices: [
      { text: 'Tell them everything — the whole uncurated story', tag: null, outcome: 'Some of it surprises them. You see yourself reflected in their reaction. It\'s not entirely comfortable. It\'s good.', effect: (p) => { p.m += 10; p.r -= 10; p.karma += 5; p.setMem('grandkids_time', true) } },
      { text: 'Tell them the cleaned-up version', tag: null, outcome: 'They get a story. Not the full one. Perhaps that\'s right.', effect: (p) => { p.m += 6; p.setMem('grandkids_time', true) } },
      { text: 'Ask them about themselves instead', tag: null, outcome: 'They talk for an hour. You realize you know them less well than you thought.', effect: (p) => { p.m += 8; p.s += 2; p.karma += 3; p.setMem('grandkids_time', true) } },
    ],
  },

  // ── LATE LIFE: CONTEXTUAL EXPANSION ──────────────────────────────────────────

  {
    id: 'late_pension_collapse_postsoviet',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.age >= 60 && !G.flags.includes('pension_collapse_experienced'),
    text: 'The retirement fund was held by a state institution that no longer exists in the form it did. The currency was redenominated. The conversion rates applied to your savings were not the ones you were promised. You do the arithmetic on a piece of paper and then do it again, and the number is the same. Twenty-two years of contributions. The number is essentially nothing.',
    choices: [
      { text: 'Find part-time work to cover the gap', tag: null, outcome: 'The body is willing, barely. You work into your seventies. It is not the retirement you imagined.', effect: (p) => { p.m -= 10; p.w += 5; p.r += 8; p.addFlag('pension_collapse_experienced') } },
      { text: 'Move in with family — there is no other option', tag: null, outcome: 'Your children take you in without complaint. The obligation is mutual and understood. You contribute in other ways.', effect: (p) => { p.m -= 5; p.r += 6; p.karma += 3; p.addFlag('pension_collapse_experienced') } },
    ],
    effect: null,
  },

  {
    id: 'late_healthcare_rationing',
    phase: 'late_life',
    weight: 3,
    when: (G) => ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 62 && !G.flags.includes('healthcare_rationing_experienced'),
    text: 'The medication the doctor prescribed is not available at the clinic. It has not been available for four months. It can be purchased privately, at a price that would consume most of what you have. Your daughter researches alternatives. There are no clean alternatives. You make a decision that is not really a decision but a set of constraints.',
    choices: [
      { text: 'Purchase the medication privately — drain savings if needed', tag: null, outcome: 'The money goes. The body continues. You do not regret it.', effect: (p) => { p.h += 5; p.mo -= 2500; p.addFlag('healthcare_rationing_experienced') } },
      { text: 'Manage without it — adjust, reduce, find workarounds', tag: null, outcome: 'The condition is controlled imperfectly. You learn to read your own body like a text that requires careful interpretation.', effect: (p) => { p.h -= 8; p.m -= 8; p.addFlag('healthcare_rationing_experienced') } },
    ],
    effect: null,
  },

  {
    id: 'late_multigenerational_household',
    phase: 'late_life',
    weight: 3,
    when: (G) => ['subsaharan', 'developing_urban', 'developing_unstable', 'wealthy_east'].includes(G.character.country.archetype) && G.age >= 65 && G.children && G.children.length > 0 && !G.flags.includes('multigenerational_household'),
    text: 'You move in with your adult child and their family. Three generations under one roof. There are frictions that are small and constant — schedules, noise, the children\'s habits, the television — and a warmth underneath them that is not available any other way. You are needed. At this age, that is not a small thing.',
    choices: null,
    effect: (p) => { p.m += 10; p.s += 5; p.r -= 5; p.addFlag('multigenerational_household') },
  },

  {
    id: 'late_grandchild_hard_question',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('grandparent') && G.age >= 68 && !G.mem.grandchild_hard_question,
    text: 'Your grandchild asks you something you have not been asked before, or not in this form: what is the worst thing you ever did. Not the worst thing that happened to you. The worst thing you did. They are twelve years old and completely serious. You sit with the question for longer than you expected.',
    choices: [
      { text: 'Tell them the truth — they\'re old enough', tag: null, outcome: 'You watch them absorb it. They do not love you less. You did not expect this to matter so much.', effect: (p) => { p.m += 8; p.r -= 12; p.karma += 5; p.setMem('grandchild_hard_question', true) } },
      { text: 'Give them something true but not the full answer', tag: null, outcome: 'You answer honestly about something smaller. The real answer stays yours. Maybe that\'s right.', effect: (p) => { p.m += 4; p.r -= 5; p.setMem('grandchild_hard_question', true) } },
      { text: 'Tell them you can\'t answer that yet', tag: null, outcome: 'They accept it. They will ask again someday. You know this.', effect: (p) => { p.m -= 3; p.r += 5; p.setMem('grandchild_hard_question', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_first_peer_death',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 62 && G.age <= 70 && G.friends && G.friends.length > 0 && !G.mem.first_peer_death,
    text: 'Your friend — not your oldest friend, but close, someone from this chapter of your life — dies. Not from illness discovered and fought, but quickly: a stroke on a Wednesday. You spoke to him on the Sunday. At the funeral you stand next to his wife and understand, for the first time in your body rather than just your mind, that this is what the years ahead will contain.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.e += 5; p.setMem('first_peer_death', true) },
  },

  {
    id: 'late_body_decline_specific',
    phase: 'late_life',
    weight: 4,
    when: (G) => G.age >= 68 && !G.mem.body_decline_specific,
    text: 'The knee that started last winter is still there. The stiffness in the morning now takes twenty minutes to walk off instead of five. You cannot read small print without the glasses you have started keeping on your face full-time. The jar lid requires a second person. These are not events — they have no clear beginning. They are simply the new terms of your physical existence, arrived without announcement.',
    choices: [
      { text: 'Accept the body\'s renegotiation — adapt without resentment', tag: null, outcome: 'You stop measuring yourself against what you used to be able to do. It takes genuine effort and it helps.', effect: (p) => { p.m += 5; p.addFlag('acceptance'); p.setMem('body_decline_specific', true) } },
      { text: 'Fight it — physio, exercise, stubbornness', tag: null, outcome: 'Some of it can be pushed back. Not all. You are slower to accept this than you\'d like.', effect: (p) => { p.h += 3; p.m -= 3; p.setMem('body_decline_specific', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_cognitive_early_fear',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 70 && G.age <= 78 && !G.flags.includes('cognitive_decline') && !G.mem.cog_early_fear,
    text: 'You are looking for your keys and find them in the freezer. You are mid-sentence and the word you need — a common word, a word you have used ten thousand times — simply isn\'t there. You stand in the gap where it should be, waiting. The word returns thirty seconds later. You do not tell anyone. You do not write it down. You stand in the bathroom that night and look at yourself for a while.',
    choices: [
      { text: 'See your doctor — face it directly', tag: null, outcome: 'The tests are reassuring, mostly. Normal aging, they say. You believe them and also do not entirely believe them.', effect: (p) => { p.m -= 8; p.h += 2; p.setMem('cog_early_fear', true) } },
      { text: 'Say nothing — monitor it yourself', tag: null, outcome: 'You become a careful observer of your own mind. The scrutiny is its own kind of exhaustion.', effect: (p) => { p.m -= 12; p.r += 8; p.setMem('cog_early_fear', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_digital_exclusion',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 72 && G.currentYear >= 2015 && !G.flags.includes('tech_adapted') && !G.mem.digital_exclusion,
    text: 'The bank has closed the branch. The appointment system is an app. The government benefit form is online only. The bus times are not printed at the stop anymore — there is a QR code. You stand at the stop in the cold trying to understand the QR code while younger people walk past you with their phones already open. It is not that you are stupid. It is that the world redesigned itself for a different set of hands.',
    choices: [
      { text: 'Ask for help — from family, from the library, from whoever will show you', tag: null, outcome: 'You learn enough to manage. The learning takes real effort and costs something in dignity every time you have to ask.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('digital_exclusion', true) } },
      { text: 'Push back — demand alternatives exist', tag: null, outcome: 'You write a letter to the bank. To the council. The letter is good. Some things change, slowly, for people like you.', effect: (p) => { p.m -= 3; p.karma += 5; p.s += 2; p.setMem('digital_exclusion', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_sibling_estrangement_repair',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 65 && (G.flags.includes('estranged_family') || G.regret > 20) && !G.flags.includes('sibling_reckoned') && !G.mem.sibling_repair,
    text: 'Your sibling — the one you stopped speaking to properly after that thing, which was partly your fault and partly theirs and partly just the accumulated weight of being siblings — sends a message. Not an apology, not quite. An opening. It arrives on a Tuesday and you read it four times.',
    choices: [
      { text: 'Respond — meet if possible, call if not', tag: null, outcome: 'The conversation does not resolve everything. It does not need to. Something between you breathes again.', effect: (p) => { p.m += 12; p.r -= 10; p.addFlag('sibling_reckoned'); p.setMem('sibling_repair', true) } },
      { text: 'Not yet — you still need more time', tag: null, outcome: 'You draft a response you don\'t send. The opening may still be there later. You are not sure.', effect: (p) => { p.m -= 5; p.r += 8; p.setMem('sibling_repair', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_last_photograph',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem.last_photo_moment,
    text: 'Your grandchild takes a photograph of you at a family gathering. Later someone shows it to you on a phone. You look at it for a moment. The person in the photograph is old — genuinely, recognizably old — and it is you. You have known this intellectually. The photograph makes it concrete in a way the mirror never quite has.',
    choices: [
      { text: 'Accept it — this is what seventy looks like', tag: null, outcome: 'You ask them to send you the photo. You keep it. This is who you are now and you are here.', effect: (p) => { p.m += 5; p.r -= 5; p.addFlag('acceptance'); p.setMem('last_photo_moment', true) } },
      { text: 'Ask them not to share it', tag: null, outcome: 'They don\'t share it. The image stays in your head anyway.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('last_photo_moment', true) } },
    ],
    effect: null,
  },

  {
    id: 'late_stroke_survival',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.stats.health < 50 && !G.flags.includes('stroke_survivor') && Math.random() < 0.10,
    text: (G) => {
      const base = 'The stroke happens on a Saturday morning. You know what it is when it starts — the lopsided face in the bathroom mirror, the arm that won\'t lift, the words that come out wrong. Someone calls the ambulance. You survive.'
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)) return base + ' The rehabilitation team is thorough and the progress is slow and real.'
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype)) return 'You collapse at home. By the time you reach the hospital, the window for intervention has passed. You survive, but not intact.'
      return base
    },
    choices: [
      { text: 'Commit to rehabilitation — reclaim what you can', tag: null, outcome: 'The speech therapist, the physio, the exercises you do alone at 6 AM. You recover sixty percent of what you lost. This is considered very good.', effect: (p) => { p.h -= 10; p.m -= 8; p.e += 5; p.addFlag('stroke_survivor') } },
      { text: 'Accept the changed life — adapt to the new limits', tag: null, outcome: 'The left hand does not work the way it did. You learn which things still work and build from there.', effect: (p) => { p.h -= 15; p.m -= 5; p.addFlag('stroke_survivor'); p.addFlag('acceptance') } },
    ],
    effect: null,
  },

  // ── RELATIONSHIP DEPTH EVENTS ─────────────────────────────────────────────────

  {
    id: 'rel_friendship_ended_badly',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 28 && !G.mem.friendship_ended_badly,
    text: 'A friendship ends. Not in a confrontation — there was no clean break, no single event you can point to. You said something, or didn\'t say something, or you were going through a period and they needed more than you gave. The details are unclear in the way that makes them impossible to fully resolve. They stop returning calls. You stop making them.',
    choices: [
      { text: 'Reach out — ask directly what happened', tag: null, outcome: 'The conversation is uncomfortable and clarifying. Some of what you did makes more sense in retrospect. You do not become close again but the ending has a shape now.', effect: (p) => { p.m -= 5; p.r -= 8; p.s += 3; p.setMem('friendship_ended_badly', true) } },
      { text: 'Let it remain unresolved — some things don\'t need a postmortem', tag: null, outcome: 'You carry the vagueness. Occasionally, at odd moments, it surfaces.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('friendship_ended_badly', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_toxic_friend_clarity',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem.toxic_friend_clarity,
    text: 'Six months after the friendship ended, you start to see it clearly. The small put-downs that you explained away at the time. The way every conversation circled back to them. The competitiveness that ran underneath everything. Distance is doing what closeness couldn\'t — it is giving you an honest view. You feel relief and then feel guilty about the relief.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.r -= 5; p.setMem('toxic_friend_clarity', true) },
  },

  {
    id: 'rel_friend_success_envy_deep',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 25 && !G.mem.friend_success_envy,
    text: 'Your friend\'s book is published. Or they close the funding round. Or their face is in a magazine. You send the congratulations message immediately because you mean it, and also because you want to mean it without complication, and the complication is there anyway. It sits next to the genuine pride. You are not sure which one is louder.',
    choices: [
      { text: 'Examine the envy honestly — it tells you something about what you want', tag: null, outcome: 'You understand yourself a little better. The friendship survives being looked at honestly.', effect: (p) => { p.m -= 5; p.e += 5; p.r -= 3; p.setMem('friend_success_envy', true) } },
      { text: 'Celebrate them wholeheartedly and set aside the rest', tag: null, outcome: 'The choice to be generous is a real choice and it costs something real. The friendship is better for it.', effect: (p) => { p.m += 5; p.karma += 5; p.setMem('friend_success_envy', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_childhood_friend_rekindled_deep',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 50 && !G.mem.childhood_friend_rekindled,
    text: 'Someone finds you — a childhood friend, from before everything, from the years when you were both unformed. The meeting is strange in a specific way: they know the person you were before you knew who you were going to be. There are gaps of twenty years. There is also, somehow, an immediacy that skips the usual distance.',
    choices: [
      { text: 'Invest in it — rebuild the friendship on adult terms', tag: null, outcome: 'It is a different friendship than the one you had. It is also something that could not be built any other way.', effect: (p) => { p.m += 12; p.s += 3; p.setMem('childhood_friend_rekindled', true) } },
      { text: 'Keep it warm but light — the past is the past', tag: null, outcome: 'You stay in occasional contact. The warmth is real. The distance is chosen.', effect: (p) => { p.m += 5; p.setMem('childhood_friend_rekindled', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_children_disagreement_partner',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.partner !== null && G.age >= 26 && G.age <= 38 && !G.mem.children_disagreement,
    text: 'One of you wants children. The other is not sure, or is sure in a different direction. This has come up before and been deferred. It is no longer deferrable. The conversation that happens is the longest and most honest one you have had in years. It does not resolve cleanly.',
    choices: [
      { text: 'Commit to having children — you both deserve certainty', tag: null, outcome: 'The decision is made together, imperfectly. It is a real decision and not everyone gets to make it clearly.', effect: (p) => { p.m += 5; p.r += 8; p.addFlag('family_planned'); p.setMem('children_disagreement', true) } },
      { text: 'Agree not to — and live with what that means for you both', tag: null, outcome: 'One of you is relieved. The other carries a small grief that will surface periodically and then recede.', effect: (p) => { p.m -= 5; p.r += 10; p.setMem('children_disagreement', true) } },
      { text: 'The disagreement is fundamental — the relationship may not survive it', tag: null, outcome: 'It doesn\'t. Not because either of you failed, but because the difference was real.', effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('relationship_ended'); p.setMem('children_disagreement', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_marriage_small_resentments',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.partner !== null && G.partner.married && G.age >= 38 && !G.mem.marriage_resentments,
    text: 'The resentments are not dramatic. They are: the way he dismisses your suggestions in public and then adopts them a week later. The way she has not once in nine years asked about your work in a way that expects a real answer. The division of household tasks that was never discussed and is never equitable. None of this is cause for anything. All of it is real. The distance between you is made of exactly this kind of thing.',
    choices: [
      { text: 'Name it — finally have the uncomfortable conversation', tag: null, outcome: 'The first conversation is difficult. The second is easier. The relief is real and so is the work that follows.', effect: (p) => { p.m += 8; p.r -= 8; p.s += 3; p.setMem('marriage_resentments', true) } },
      { text: 'Manage it privately — most marriages have this', tag: null, outcome: 'You absorb it and compensate and the dynamic stays the same.', effect: (p) => { p.m -= 5; p.r += 10; p.setMem('marriage_resentments', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_affair_confessor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('affair_ended') && G.partner !== null && !G.mem.affair_confession,
    text: 'The affair is over and your partner doesn\'t know. You have been living with this for months. You have had good weeks where you were certain the right thing was to say nothing. You have had bad weeks where the silence feels like a second deception, larger than the first. You have not resolved which instinct is right.',
    choices: [
      { text: 'Confess — you can\'t carry it and be present at the same time', tag: null, outcome: 'The conversation takes three hours. Your partner leaves for two weeks. They come back. The damage is real and the work ahead is real and it is the honest path.', effect: (p) => { p.m -= 20; p.r += 5; p.karma += 10; p.setMem('affair_confession', true) } },
      { text: 'Stay silent — protect what you\'ve repaired by staying', tag: null, outcome: 'You choose your partner by choosing not to hurt them with this. The weight is yours alone. You decide you can carry it.', effect: (p) => { p.m -= 8; p.r += 12; p.karma -= 5; p.setMem('affair_confession', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_partner_mental_illness_deep',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner !== null && G.age >= 28 && !G.mem.partner_mental_illness,
    text: 'Your partner is diagnosed with something — depression that doesn\'t lift, anxiety that has become structural, something with a longer name. The person you are with is still here and is also not entirely here. You read things. You adjust things. You learn which days require what. The love is not in question. What is in question is your own sustainability, and this is not a question you are allowed to ask loudly.',
    choices: [
      { text: 'Be the steady one — they need that from you right now', tag: null, outcome: 'You are steady. For a long time you are steady. There are periods when it costs you more than you show.', effect: (p) => { p.m -= 10; p.h -= 5; p.karma += 8; p.setMem('partner_mental_illness', true) } },
      { text: 'Find support for yourself too — you can\'t pour from empty', tag: null, outcome: 'You see someone. It helps. The ability to name what you are carrying makes it more manageable.', effect: (p) => { p.m -= 5; p.h += 3; p.mo -= 600; p.setMem('partner_mental_illness', true) } },
    ],
    effect: null,
  },

  // ── LAWSUIT EVENTS ────────────────────────────────────────────────────────────

  {
    id: 'lawsuit_slip_fall',
    phase: null,
    weight: 3,
    when: (G) => G.age >= 25 && !G.mem.lawsuit_slip && (G.career || G.flags.includes('business_owner')),
    text: 'A letter arrives from a law firm. Someone fell on premises you\'re responsible for — a sidewalk, a staircase, a wet floor. They are seeking damages of significant size.',
    isKey: true,
    choices: [
      { text: 'Settle out of court', tag: null, outcome: 'Your lawyer recommends it. You pay, sign, and don\'t discuss it. It\'s over in six weeks.', effect: (p) => { p.mo -= 12000; p.m -= 5; p.setMem('lawsuit_slip', true) } },
      { text: 'Fight it in court', tag: null, outcome: 'The process takes fourteen months. You win, narrowly, but the legal fees approach the settlement amount anyway.', effect: (p) => { p.mo -= 18000; p.m -= 10; p.karma += 3; p.setMem('lawsuit_slip', true) } },
      { text: 'Let insurance handle it', tag: null, outcome: 'Your premium doubles the following year. Your hands stay clean of the details.', effect: (p) => { p.mo -= 2000; p.m -= 3; p.setMem('lawsuit_slip', true) } },
    ],
  },

  {
    id: 'lawsuit_wrongful_termination',
    phase: null,
    weight: 3,
    when: (G) => G.age >= 30 && G.career && !G.mem.lawsuit_wrongful_term && G.flags.includes('manager'),
    text: 'A former employee has filed a wrongful termination suit. The claims are partially accurate and partially not. HR is involved. You hire a lawyer on a Wednesday afternoon.',
    isKey: true,
    choices: [
      { text: 'Cooperate fully with HR and legal', tag: null, outcome: 'You\'re cleared of personal liability. The company settles. The documentation you kept saves you.', effect: (p) => { p.m -= 8; p.e += 3; p.setMem('lawsuit_wrongful_term', true) } },
      { text: 'Settle quickly and quietly', tag: null, outcome: 'The story doesn\'t spread. The number is uncomfortable but manageable.', effect: (p) => { p.mo -= 25000; p.m -= 10; p.setMem('lawsuit_wrongful_term', true) } },
      { text: 'Contest it vigorously', tag: null, outcome: 'The case drags. The plaintiff\'s lawyer is better than yours. You settle anyway, eighteen months later, for more.', effect: (p) => { p.mo -= 40000; p.m -= 15; p.setMem('lawsuit_wrongful_term', true) } },
    ],
  },

  {
    id: 'lawsuit_neighbor_dispute',
    phase: null,
    weight: 4,
    when: (G) => G.age >= 28 && G.flags.includes('homeowner') && !G.mem.lawsuit_neighbor,
    text: 'The fence dispute with next door has escalated beyond neighborly conversation. They\'ve filed a civil suit over a boundary line. The surveyor\'s report is contradictory.',
    choices: [
      { text: 'Mediate — you don\'t want to be at war with your neighbor', tag: null, outcome: 'Three sessions. An agreement. It costs both of you less and you can still wave across the fence.', effect: (p) => { p.mo -= 2000; p.m += 3; p.karma += 3; p.setMem('lawsuit_neighbor', true) } },
      { text: 'Go to small claims court', tag: null, outcome: 'You win on the survey evidence. They don\'t speak to you after. Neither do you to them.', effect: (p) => { p.mo -= 800; p.m -= 5; p.setMem('lawsuit_neighbor', true) } },
      { text: 'Cave — it\'s not worth it', tag: null, outcome: 'You sign over the disputed strip. Two feet of lawn is not worth a decade of tension.', effect: (p) => { p.m -= 3; p.r += 3; p.setMem('lawsuit_neighbor', true) } },
    ],
  },

  {
    id: 'lawsuit_sued_by_business_partner',
    phase: null,
    weight: 3,
    when: (G) => G.age >= 30 && G.flags.includes('business_owner') && !G.mem.partner_lawsuit,
    text: 'Your business partner is suing you. The partnership is dissolving in the most expensive way possible. The operating agreement you both signed has seven pages of ambiguity.',
    isKey: true,
    choices: [
      { text: 'Negotiate a buyout', tag: null, outcome: 'You pay above market value for the peace. The business survives. The friendship doesn\'t.', effect: (p) => { p.mo -= 50000; p.m -= 10; p.setMem('partner_lawsuit', true) } },
      { text: 'Counter-sue and fight for your stake', tag: null, outcome: 'It costs two years and eighty thousand dollars each. You get what you wanted. You\'re not sure it was worth it.', effect: (p) => { p.mo -= 80000; p.m -= 20; p.setMem('partner_lawsuit', true) } },
      { text: 'Find a mediator and split the business', tag: null, outcome: 'Cleanly, awkwardly, expensively. But cleanly.', effect: (p) => { p.mo -= 15000; p.m -= 8; p.setMem('partner_lawsuit', true) } },
    ],
  },

  // ── STEP-CHILDREN EVENTS ──────────────────────────────────────────────────────

  {
    id: 'stepchild_meets_you',
    phase: null,
    weight: 6,
    when: (G) => G.partner && G.flags.includes('partner_has_kids') && !G.flags.includes('met_stepkids') && G.age >= 25,
    isKey: true,
    text: 'Your partner\'s children are coming for the weekend. The oldest is nine. You\'ve cleaned the house twice and rehearsed small talk you know sounds nothing like you.',
    choices: [
      { text: 'Be yourself — warm but not trying too hard', tag: null, outcome: 'The nine-year-old ignores you most of the day, then asks if you want to play a game. You say yes.', effect: (p) => { p.m += 8; p.s += 3; p.addFlag('met_stepkids'); p.partnerRel(5) } },
      { text: 'Go all out — plan activities and snacks', tag: null, outcome: 'The youngest has fun. The oldest is suspicious of the effort. These things take time.', effect: (p) => { p.m += 4; p.mo -= 80; p.addFlag('met_stepkids') } },
      { text: 'Stay in the background and let your partner lead', tag: null, outcome: 'Your partner appreciates it. The kids barely register you. That\'s fine for now.', effect: (p) => { p.m += 3; p.partnerRel(3); p.addFlag('met_stepkids') } },
    ],
  },

  {
    id: 'stepchild_resistance',
    phase: null,
    weight: 5,
    when: (G) => G.flags.includes('met_stepkids') && !G.mem.stepchild_resist && G.age >= 26,
    text: 'The older one has decided you\'re the reason things are the way they are. They don\'t say it but they don\'t have to. Every exchange is a small deliberate friction.',
    choices: [
      { text: 'Give them time and keep showing up', tag: null, outcome: 'It takes a year. One afternoon something shifts and the friction is quieter.', effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('stepchild_resist', true) } },
      { text: 'Talk to them directly — clear the air', tag: null, outcome: 'They don\'t want to talk. But something about being asked directly changes the temperature slightly.', effect: (p) => { p.m -= 3; p.s += 3; p.setMem('stepchild_resist', true) } },
      { text: 'Ask your partner to mediate', tag: null, outcome: 'Your partner tries. It helps and complicates simultaneously.', effect: (p) => { p.m -= 5; p.partnerRel(-3); p.setMem('stepchild_resist', true) } },
    ],
  },

  {
    id: 'stepchild_calls_you_parent',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('met_stepkids') && G.mem.stepchild_resist && !G.mem.stepchild_bonded,
    isKey: true,
    text: 'It happens by accident. They call you Dad, or Mom — whatever you are — without thinking about it, and then go quiet. Neither of you says anything.',
    choices: [
      { text: 'Let it pass without comment', tag: null, outcome: 'It becomes a thing that happened between you. No announcement necessary.', effect: (p) => { p.m += 15; p.karma += 5; p.r -= 10; p.setMem('stepchild_bonded', true) } },
      { text: 'Smile and say you don\'t mind', tag: null, outcome: 'They nod. The next time they do it, it\'s deliberate.', effect: (p) => { p.m += 12; p.s += 3; p.setMem('stepchild_bonded', true) } },
    ],
  },

  {
    id: 'stepchild_bio_parent_conflict',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('met_stepkids') && !G.mem.bio_parent_conflict,
    text: 'The children\'s other parent is making things difficult. They say things to the kids about you that the kids then repeat. Your partner is caught in the middle of something old and ongoing.',
    choices: [
      { text: 'Stay out of it — it\'s not your conflict', tag: null, outcome: 'You hold the line. It\'s hard. The kids respect it eventually, even if they don\'t say so.', effect: (p) => { p.m -= 5; p.karma += 5; p.partnerRel(3); p.setMem('bio_parent_conflict', true) } },
      { text: 'Talk to your partner about setting boundaries', tag: null, outcome: 'Your partner agrees but finds it difficult to enforce. Progress is slow.', effect: (p) => { p.m -= 3; p.partnerRel(-2); p.setMem('bio_parent_conflict', true) } },
      { text: 'Respond in kind — correct the record', tag: null, outcome: 'The children hear both versions. This helps no one, least of all them.', effect: (p) => { p.m -= 10; p.karma -= 8; p.setMem('bio_parent_conflict', true) } },
    ],
  },

  // ── IN-LAW EVENTS ─────────────────────────────────────────────────────────────

  {
    id: 'inlaw_first_meeting',
    phase: null,
    weight: 7,
    when: (G) => G.partner && !G.mem.inlaw_met && G.age >= 20,
    isKey: true,
    text: 'Dinner at your partner\'s parents\' house. You\'ve prepared. You know their professions, their politics (roughly), their dog\'s name. You bring wine and hope it\'s the right kind.',
    choices: [
      { text: 'Be charming and attentive', tag: null, outcome: 'They like you, cautiously. The father makes a joke you don\'t fully understand and you laugh anyway. Acceptable.', effect: (p) => { p.s += 3; p.m += 5; p.partnerRel(4); p.setMem('inlaw_met', true) } },
      { text: 'Be quiet and let your partner lead', tag: null, outcome: 'You say the right things when you say them. The mother calls you "well-mannered." It\'s a start.', effect: (p) => { p.m += 3; p.partnerRel(2); p.setMem('inlaw_met', true) } },
      { text: 'Be yourself — no performance', tag: null, outcome: 'You say something slightly too honest at dinner and your partner tenses. Later they say they loved it.', effect: (p) => { p.m += 4; p.s += 2; p.partnerRel(3); p.setMem('inlaw_met', true) } },
    ],
  },

  {
    id: 'inlaw_overbearing',
    phase: null,
    weight: 5,
    when: (G) => G.partner && G.mem.inlaw_met && !G.mem.inlaw_overbearing,
    text: 'Your partner\'s mother calls three times a week. She has opinions about your apartment, your career choices, your plan (or lack of one) for children. She means well. That doesn\'t make it easier.',
    choices: [
      { text: 'Talk to your partner about setting limits', tag: null, outcome: 'Your partner defends their mother first, then reluctantly agrees. The calls reduce to once a week.', effect: (p) => { p.m += 3; p.partnerRel(-3); p.setMem('inlaw_overbearing', true) } },
      { text: 'Build your own relationship with her — engage directly', tag: null, outcome: 'You call her first once a month. She\'s pleased. Somehow this reduces the pressure.', effect: (p) => { p.s += 3; p.m += 4; p.partnerRel(3); p.setMem('inlaw_overbearing', true) } },
      { text: 'Absorb it — it\'s not worth the conflict', tag: null, outcome: 'The quiet resentment calcifies slowly. You don\'t notice until you do.', effect: (p) => { p.m -= 6; p.r += 4; p.setMem('inlaw_overbearing', true) } },
    ],
  },

  {
    id: 'inlaw_financial_ask',
    phase: null,
    weight: 3,
    when: (G) => G.partner && G.mem.inlaw_met && G.money >= 30000 && !G.mem.inlaw_money,
    text: 'Your in-laws are in a difficult position. The request comes through your partner: a loan — sizeable, indefinite return timeline, family, so how could you. You have the money.',
    choices: [
      { text: 'Lend it — they\'re family now', tag: null, outcome: 'The money leaves. The timeline extends. You don\'t press for it back. Neither does your partner.', effect: (p) => { p.mo -= 15000; p.partnerRel(5); p.karma += 3; p.setMem('inlaw_money', true) } },
      { text: 'Give it as a gift, no strings', tag: null, outcome: 'You reframe it to yourself. No debt means no awkward holiday dinners.', effect: (p) => { p.mo -= 15000; p.m += 5; p.karma += 8; p.partnerRel(5); p.setMem('inlaw_money', true) } },
      { text: 'Decline, with reasons', tag: null, outcome: 'Your partner is disappointed. The in-laws never quite forgive. It\'s a reasonable position with lasting costs.', effect: (p) => { p.m -= 8; p.partnerRel(-8); p.setMem('inlaw_money', true) } },
    ],
  },

  {
    id: 'inlaw_death',
    phase: null,
    weight: 4,
    when: (G) => G.partner && G.mem.inlaw_met && G.age >= 45 && !G.mem.inlaw_death,
    isKey: true,
    text: 'Your partner\'s father has died. The funeral is held in the town where they grew up. You\'ve been there once. You stand slightly back during the burial and understand you are witnessing something closed and old.',
    choices: [
      { text: 'Be fully present — stay close to your partner', tag: null, outcome: 'You don\'t say the wrong thing because you barely speak. You hold their hand through the whole service.', effect: (p) => { p.m -= 5; p.partnerRel(8); p.karma += 5; p.setMem('inlaw_death', true) } },
      { text: 'Handle the logistics — food, calls, arrangements', tag: null, outcome: 'You become quietly useful. Your partner notices later, weeks later, and thanks you for it.', effect: (p) => { p.m -= 3; p.partnerRel(6); p.karma += 4; p.setMem('inlaw_death', true) } },
      { text: 'Give your partner space to grieve with family', tag: null, outcome: 'You stay in the background. It\'s the right call. They come back to you in pieces over the following months.', effect: (p) => { p.m -= 4; p.partnerRel(4); p.setMem('inlaw_death', true) } },
    ],
  },

  {
    id: 'inlaw_conflict_partner',
    phase: null,
    weight: 4,
    when: (G) => G.partner && G.mem.inlaw_met && !G.mem.inlaw_conflict,
    text: 'Your in-laws disapprove of a decision you and your partner made together — a move, a career change, something about the children. They make their position clear at a family gathering, in front of others.',
    choices: [
      { text: 'Present a united front with your partner', tag: null, outcome: 'You and your partner respond as one. The in-laws back down. Your relationship is stronger for it.', effect: (p) => { p.m += 5; p.partnerRel(8); p.setMem('inlaw_conflict', true) } },
      { text: 'Stay silent and let your partner handle it', tag: null, outcome: 'Your partner handles it alone. They wish you\'d said something. The conversation on the drive home is difficult.', effect: (p) => { p.m -= 5; p.partnerRel(-5); p.setMem('inlaw_conflict', true) } },
      { text: 'Defend yourself directly', tag: null, outcome: 'The in-laws are offended. Your partner is grateful and also slightly horrified. Mixed results.', effect: (p) => { p.m += 2; p.s += 2; p.partnerRel(-2); p.setMem('inlaw_conflict', true) } },
    ],
  },

  // ── RELATIONSHIP DEPTH ───────────────────────────────────────────────────────
  {
    id: 'rel_friendship_ended',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.friends ?? []).length > 0 && !G.flags.includes('lost_friend'),
    text: 'A friendship ends. Not with an argument — with a slow cooling, an unreturned message, the gradual understanding that you have both moved on. You are not sure what you did, if anything.',
    choices: [
      { text: 'Try to reach out — save the friendship', tag: null, outcome: 'They respond warmly but distantly. You agree to stay in touch. You probably won\'t.', effect: (p) => { p.m -= 4; p.addFlag('lost_friend') } },
      { text: 'Let it go — not everything is worth saving', tag: null, outcome: 'You feel the absence for a few weeks. Then it fills with other things.', effect: (p) => { p.m -= 3; p.r += 3; p.addFlag('lost_friend') } },
    ],
    effect: null,
  },
  {
    id: 'rel_toxic_clarity',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.friends ?? []).length > 0 && !G.flags.includes('toxic_friend_recognized'),
    text: 'With some distance, you see it clearly: a friend has been draining you for years. You feel better after every period apart. Worse after every reunion. You have been mistaking longevity for value.',
    choices: [
      { text: 'End the friendship deliberately', tag: null, outcome: 'The guilt is real. So is the relief.', effect: (p) => { p.m += 8; p.r += 3; p.addFlag('toxic_friend_recognized') } },
      { text: 'Reduce contact quietly', tag: null, outcome: 'You become unavailable, then less available, then gone. They don\'t ask why.', effect: (p) => { p.m += 5; p.addFlag('toxic_friend_recognized') } },
    ],
    effect: null,
  },
  {
    id: 'rel_friend_success_envy',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.friends ?? []).length > 0 && G.stats.wealth < 55,
    text: 'A friend announces something large — a promotion, a house, a baby, a book deal. The congratulations you offer are genuine and also cost you something. You sit with that for a while.',
    choices: [
      { text: 'Be genuinely happy for them', tag: null, outcome: 'The envy fades. The friendship deepens. You are proud of yourself.', effect: (p) => { p.m += 5; p.karma += 5 } },
      { text: 'Smile, then go home and feel the envy fully', tag: null, outcome: 'Honesty with yourself about this turns out to be useful.', effect: (p) => { p.m -= 4; p.r += 3; p.e += 3 } },
    ],
    effect: null,
  },
  {
    id: 'rel_childhood_friend_rekindled',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.flags.includes('rekindled_old_friendship'),
    text: 'A message arrives from someone you knew before you became whoever you are now. The name produces a flood of specific, almost physical memories. You meet for coffee. The strangeness of their face being older is also the strangeness of yours.',
    choices: [
      { text: 'Invest in rebuilding this', tag: null, outcome: 'Something returns that you hadn\'t known was lost.', effect: (p) => { p.m += 10; p.s += 3; p.addFlag('rekindled_old_friendship') } },
      { text: 'Enjoy the coffee, leave it at that', tag: null, outcome: 'Some things belong to the version of you they remember. That\'s okay.', effect: (p) => { p.m += 5; p.addFlag('rekindled_old_friendship') } },
    ],
    effect: null,
  },
  {
    id: 'rel_children_disagreement',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.partner !== null && !G.flags.includes('children_disagreement_resolved'),
    text: 'You and your partner do not agree about children. One wants them. The other is not sure, or wants fewer, or wants to wait in a way that feels permanent. The conversation keeps arriving.',
    choices: [
      { text: 'Have the honest conversation — all of it', tag: null, outcome: 'You reach something that works, or you discover it doesn\'t. Either way, you know.', effect: (p) => { p.m -= 5; p.partnerRel(+8); p.addFlag('children_disagreement_resolved') } },
      { text: 'Defer it — hope alignment comes with time', tag: null, outcome: 'Time does not produce alignment. It produces pressure.', effect: (p) => { p.r += 6; p.partnerRel(-5); p.addFlag('children_disagreement_resolved') } },
    ],
    effect: null,
  },
  {
    id: 'rel_marriage_resentments',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.partner !== null && G.partner.married && G.age >= 35 && !G.flags.includes('marriage_examined'),
    text: 'The marriage is not bad. It is also not what either of you said it would be. Small resentments have settled into the furniture of the relationship. Neither of you mentions them. Both of you know.',
    choices: [
      { text: 'Name it — try couples therapy', tag: null, outcome: 'Therapy is uncomfortable and useful. Naming things is half the work.', effect: (p) => { p.m -= 3; p.partnerRel(+12); p.mo -= 2000; p.addFlag('marriage_examined') } },
      { text: 'Continue — this is what long marriages feel like', tag: null, outcome: 'The resentments stay. So does the history. So does the love.', effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('marriage_examined') } },
      { text: 'Begin quietly planning an exit', tag: null, outcome: 'The decision takes a year to finish making.', effect: (p) => { p.r += 8; p.addFlag('marriage_examined'); p.addFlag('considering_divorce') } },
    ],
    effect: null,
  },
  {
    id: 'rel_partner_mental_illness',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner !== null && !G.flags.includes('partner_mental_health_event'),
    text: 'Your partner\'s depression or anxiety — which has always been there, in the background — becomes something you can no longer work around. They are not okay. The question of what you do with this is also the question of who you are.',
    choices: [
      { text: 'Stay and work through it with them', tag: null, outcome: 'Some years are very hard. The partnership deepens in a way that only that kind of difficulty produces.', effect: (p) => { p.m -= 8; p.h -= 4; p.partnerRel(+15); p.karma += 8; p.addFlag('partner_mental_health_event') } },
      { text: 'Encourage treatment, but keep some distance for yourself', tag: null, outcome: 'You learn the difference between support and self-erasure.', effect: (p) => { p.m -= 4; p.partnerRel(+5); p.addFlag('partner_mental_health_event') } },
      { text: 'Leave — you cannot be their carer and their partner', tag: null, outcome: 'The decision haunts you in different ways at different times.', effect: (p) => { p.r += 12; p.m -= 10; p.partnerRel(-20); p.addFlag('partner_mental_health_event') } },
    ],
    effect: null,
  },
  {
    id: 'rel_parent_relationship_repair',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.parents && !G.flags.includes('parent_relationship_examined') && !G.flags.includes('lost_parent_young'),
    text: 'You are old enough now to see your parents as people who failed where they could have done better — and also did better than anyone gave them credit for. The recalibration is quiet and significant.',
    choices: [
      { text: 'Call and say some of what you\'ve been carrying', tag: null, outcome: 'You say less than you planned. They hear more than you expected.', effect: (p) => { p.m += 8; p.r -= 8; p.addFlag('parent_relationship_examined') } },
      { text: 'Let the understanding change how you treat them', tag: null, outcome: 'The relationship shifts without the conversation. You are both more patient.', effect: (p) => { p.m += 6; p.addFlag('parent_relationship_examined') } },
    ],
    effect: null,
  },

  {
    id: 'had_first_love_reunion',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('had_first_love') && G.age >= 30 && G.age <= 50 && !G.mem?.first_love_reunion,
    text: 'You see them across a room at a wedding. Your first love. They look the same and entirely different. You were seventeen. You calculate the years. The number is larger than it should be.',
    choices: [
      { text: 'Go over and say hello', tag: null, outcome: 'The conversation is short and warm and slightly disorienting. You leave it where it is. That version of you was a different person. This one is better.', effect: (p) => { p.m += 5; p.r += 4; p.setMem('first_love_reunion', true) } },
      { text: 'Leave it alone — some things are better as they were', tag: null, outcome: 'You catch their eye once. You both look away. You carry a small, clean grief home.', effect: (p) => { p.m -= 3; p.r += 8; p.setMem('first_love_reunion', true) } },
    ],
    effect: null,
  },

  {
    id: 'school_athlete_injury',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('school_athlete') && G.age >= 18 && G.age <= 28 && !G.mem?.athlete_injury,
    text: 'An injury during training — a knee, a tendon, the kind the doctor calls chronic — ends the competitive chapter. You sit in the car outside the clinic and understand that what defined most of your adolescence is over.',
    choices: [
      { text: 'Adapt — coaching, sports management, staying inside the world you know', tag: null, outcome: 'The identity shifts rather than disappears. You stay in it differently.', effect: (p) => { p.m -= 5; p.h -= 8; p.r += 5; p.addFlag('sports_identity_retained'); p.setMem('athlete_injury', true) } },
      { text: 'Let it go — build the next version of yourself', tag: null, outcome: 'The gap fills slowly with other things. Some of them are good.', effect: (p) => { p.m -= 12; p.h -= 8; p.r += 8; p.setMem('athlete_injury', true) } },
    ],
    effect: null,
  },

  {
    id: 'first_job_teen_advantage',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('first_job_teen') && G.career && G.age >= 19 && G.age <= 25 && !G.mem?.teen_job_payoff,
    text: 'The reference from your old part-time employer — the neighbour, the small business — turns out to matter. A hiring manager mentions it specifically. The year spent doing unglamorous tasks taught you things that people who went straight from school have to learn the hard way.',
    choices: null,
    effect: (p) => { p.s += 5; p.w += 4; p.addFlag('early_work_advantage'); p.setMem('teen_job_payoff', true) },
  },

  {
    id: 'early_reader_local_award',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.flags.includes('early_reader') && G.age >= 14 && G.age <= 17 && !G.mem?.reader_award,
    text: 'The teacher asks the class to recommend a book they found meaningful. You have a list. You have always had a list. What comes out of that conversation is a small bursary from a local foundation that funds exactly the kind of student you are.',
    choices: null,
    effect: (p) => { p.mo += 1200; p.e += 4; p.m += 6; p.addFlag('scholarship_recipient'); p.setMem('reader_award', true) },
  },
]

export const EVENTS = [...BASE_EVENTS, ...GENDER_EVENTS, ...RELIGION_EVENTS, ...HISTORICAL_EVENTS, ...CULTURE_EVENTS, ...TECHNOLOGY_EVENTS, ...IMMIGRATION_EVENTS, ...CAREER_REGIME_EVENTS, ...CONFLICT_CHILDHOOD_EVENTS, ...LGBTQ_EVENTS, ...MENTAL_HEALTH_EVENTS, ...GRIEF_EVENTS, ...GRIEF_MENTAL_EVENTS, ...RELIGION_ARC_EVENTS, ...LATE_LIFE_EVENTS, ...CHILDREN_ARC_EVENTS, ...FAME_KARMA_EVENTS, ...TEXTURE_EVENTS, ...SOCIETY_EVENTS, ...CONSEQUENCE_EVENTS, ...ROMANCE_ARC_EVENTS, ...ACTIVITY_PAYOFF_EVENTS, ...FRIEND_EVENTS, ...BUSINESS_EVENTS, ...SIBLING_EVENTS, ...EDUCATION_ARC_EVENTS]