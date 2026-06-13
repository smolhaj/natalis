// Romania-specific arc events
// Ceaușescu's communist Romania: Securitate, Decree 779, systematization.
// December 1989 revolution. EU accession and emigration wave 2007+.

export const ROMANIA_EVENTS = [

  {
    id: 'rom_securitate_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1960 && G.currentYear <= 1989 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.romSecuritate,
    text: 'You learn to speak in two registers before you can name the difference. At school: the correct version. At home, with the door closed and the television turned up: the other version. Your father stops mid-sentence when there is a knock at the door. An uncle stops visiting. No one explains why. The word Securitate is not used in front of children but the shape of it is everywhere — in the pause before answering a question, in the specific selection of what to tell a teacher, in the way your parents look at each other across a room when something happens.',
    choices: [
      {
        text: 'You absorb the double register. It becomes the way you move through the world.',
        tag: null,
        outcome: 'The gap between what is said officially and what is true becomes a skill you apply automatically. The skill will outlast the state that required it.',
        effect: (p) => { p.m -= 4; p.e += 5; p.addFlag('securitate_generation'); p.addFlag('learned_silence'); p.setMem('romSecuritate', true); },
      },
      {
        text: 'You believe some of what the school teaches. The gap is not yet visible to you.',
        tag: null,
        outcome: 'The gap becomes visible later, in a specific moment that you will remember for the rest of your life.',
        effect: (p) => { p.m -= 2; p.addFlag('securitate_generation'); p.setMem('romSecuritate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'rom_decree_779',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1967 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem?.romDecree779,
    text: 'Decree 779, 1966: abortion is banned. Contraception is unavailable. The official rationale is demographic: Romania needs workers for the communist project. The doctor who comes to the factory every few months is not there for your health — the gynecological examination is to confirm that workers are pregnant when they should be pregnant. The women in the corridor know this. The conversation in the corridor is not the conversation that is supposed to happen there. Women count the weeks. Women know the names of women who know what to do when counting the weeks becomes urgent. Twelve thousand women die from illegal procedures in the twenty-three years of the decree.',
    choices: [
      {
        text: 'You navigate the system — the careful counting, the careful friendships.',
        tag: null,
        outcome: 'You navigate it. The navigation costs you things you do not fully account for until later. The decree ends in December 1989 when Ceaușescu\'s government ends.',
        effect: (p) => { p.m -= 8; p.h -= 3; p.r += 5; p.addFlag('decree_779_generation'); p.setMem('romDecree779', true); },
      },
      {
        text: 'You comply. You have children you had not planned for.',
        tag: null,
        outcome: 'The children are yours. The plan was the state\'s. You hold both of these things.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('decree_779_generation'); p.setMem('romDecree779', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'rom_revolution_1989',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1989 && G.currentYear <= 1990 &&
      G.age >= 10 &&
      !G.mem?.romRevolution,
    text: (G) => {
      const age = G.age
      if (age <= 20) {
        return 'December 16, 1989. The protests begin in Timișoara around a pastor named Tőkés László. By December 21, Ceaușescu addresses a crowd in Bucharest that boos him. This has never happened before. The confusion on his face is broadcast live. The helicopter lifts off from the Central Committee roof on December 22. On Christmas Day, Nicolae and Elena Ceaușescu are executed after a summary trial that lasts ninety minutes. The television shows the body. You are watching the television.'
      }
      return 'December 1989. The only violent revolution in Eastern Europe\'s 1989 wave. The army changing sides on December 22. The television occupied by people who are not the television people from before. A hundred and four hours of shooting in the streets of Bucharest — the "terrorists" whose identity was never definitively established. On Christmas Day: the ninety-minute trial, the body shown on television, the specific quality of a Monday afternoon when something that defined your entire life ends in ninety minutes on a television screen.'
    },
    choices: [
      {
        text: 'You are in the street, in the crowd, in the history.',
        tag: null,
        outcome: 'You are in it. Afterwards, when people ask, you were there. The being there is the thing you have.',
        effect: (p) => { p.m += 10; p.m -= 6; p.karma += 8; p.r += 5; p.addFlag('romania_1989_generation'); p.addFlag('political_active'); p.setMem('romRevolution', true); },
      },
      {
        text: 'You watch from the window or from the television in another city.',
        tag: null,
        outcome: 'You watch. The watching is also a way of being present for a historical event. What happens does not require your presence to happen.',
        effect: (p) => { p.m += 6; p.r += 4; p.addFlag('romania_1989_generation'); p.setMem('romRevolution', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'rom_transition_1990s',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1990 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.romTransition,
    text: 'The transition. The FSN — the National Salvation Front — which is formed of former communist officials. Iliescu, who was in the party. The Mineriads: in June 1990, miners come to Bucharest on trains and beat protesters in University Square with clubs while the police watches. The state that replaced the communist state has the shape of the communist state in certain lights. The economy: hyperinflation, then reform, then hyperinflation again, then IMF conditions. The queue at the currency exchange. The dollar that holds value when the leu does not.',
    choices: [
      {
        text: 'Adapt. Build what you can with the materials available.',
        tag: null,
        outcome: 'The materials are what they are. You build with them. Some of what you build holds.',
        effect: (p) => { p.e += 4; p.r += 3; p.addFlag('stayed_when_others_left'); p.setMem('romTransition', true); },
      },
      {
        text: 'Leave. This is not the revolution you were waiting for.',
        tag: null,
        outcome: 'You leave. You carry Romania with you in the way that people carry the country they left before it was finished.',
        effect: (p) => { p.m -= 5; p.r += 5; p.setMem('romTransition', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'rom_eu_emigration',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 2007 && G.currentYear <= 2018 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.romEUEmig,
    text: 'January 1, 2007: EU accession. The borders to Western Europe open. Three million Romanians leave in the following decade — one of the largest emigrations in European history. Spain first, then Italy, then England. The remittances arrive. The villages empty: the school closes when there are not enough children, the old women wait for calls from Madrid or Milan, the houses get satellite dishes paid for from abroad before they get running water. You make the calculation: what stays here and what the other calculation is.',
    choices: [
      {
        text: 'You leave. The opportunity is real and you take it.',
        tag: null,
        outcome: 'You arrive in a country where your labour is worth more than it is at home. The worth is a fact. The distance is also a fact.',
        effect: (p) => { p.w += 6; p.mo += 2000; p.m -= 4; p.addFlag('eu_emigrant_romania'); p.addFlag('sends_remittances'); p.setMem('romEUEmig', true); },
      },
      {
        text: 'You stay. The people who leave are not wrong but you are not leaving.',
        tag: null,
        outcome: 'You watch the village empty around you. The people who stayed have a different relationship to the place than the people who left. Both have a relationship to it.',
        effect: (p) => { p.r += 4; p.m -= 2; p.addFlag('stayed_when_others_left'); p.setMem('romEUEmig', true); },
      },
    ],
    effect: null,
  },

]
