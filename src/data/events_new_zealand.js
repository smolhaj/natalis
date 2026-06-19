// New Zealand arc events
// A settler society at the edge of the world: rugby as national religion,
// the 1981 Springbok Tour that divided families, the Rainbow Warrior bombing
// in Auckland harbour, Rogernomics as radical free-market experiment,
// the nuclear-free declaration, Christchurch earthquake 2011,
// the mosque attack 2019. A country that believes in its own exceptionalism
// and tests that belief every generation.

const IS_NZ = (G) => G.character.country?.name === 'New Zealand'

export const NEW_ZEALAND_EVENTS = [

  {
    id: 'nz_rugby_childhood',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_NZ(G) &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.nzRugby,
    text: 'Saturday mornings in New Zealand have a shape: the smell of liniment, boots on concrete, the sound of a whistle. Rugby is not exactly a sport here — it is closer to a civic religion, the All Blacks its priesthood. At school, the All Blacks\' record is taught with the same authority as geography. A New Zealand child learns the haka before they learn French.',
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; p.addFlag('nz_rugby_generation'); p.setMem('nzRugby', true) },
  },

  {
    id: 'nz_springbok_tour_1981',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 1981 && G.currentYear <= 1982 &&
      G.age >= 16 &&
      !G.mem?.nzSpringbok,
    text: 'The South African Springboks arrive in New Zealand to play rugby in the middle of apartheid. The tour should have been cancelled — half the country says it should have been cancelled — but it wasn\'t. The matches are played inside police cordons. Protestors and counter-protestors face each other in the streets. Friends stop talking. Families argue across tables. In Hamilton, protestors invade the pitch. In Auckland, a flour bomb plane circles the stadium. The country has not been this divided in living memory over anything.',
    choices: [
      {
        text: 'You protest — the tour is a endorsement of apartheid',
        tag: 'protested',
        outcome: 'You are on the street, in the cold, in the cordon. The police are between you and the ground. Someone you know is on the other side of the line.',
        effect: (p) => { p.m -= 3; p.karma += 8; p.addFlag('nz_springbok_generation'); p.addFlag('political_active'); p.setMem('nzSpringbok', true) },
      },
      {
        text: 'You watch the rugby — the tour is about sport, not politics',
        tag: 'watched',
        outcome: 'The argument will not end. The people who say sport and politics are separate are not believed by people who know what apartheid is.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('nz_springbok_generation'); p.setMem('nzSpringbok', true) },
      },
    ],
  },

  {
    id: 'nz_rainbow_warrior_1985',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 1985 && G.currentYear <= 1986 &&
      G.age >= 16 &&
      !G.mem?.nzRainbow,
    text: 'French intelligence agents bomb the Greenpeace ship Rainbow Warrior in Auckland harbour in the middle of the night. The ship was about to sail to Mururoa Atoll to protest French nuclear testing in the Pacific. A photographer dies below decks. France denies it, then admits it. Two agents are convicted, serve brief sentences on a Pacific island, and are repatriated to France as heroes. This is what it looks like when a foreign state conducts a terrorist operation in your country and the world shrugs.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 3; p.karma += 3; p.addFlag('nz_rainbow_warrior_generation'); p.setMem('nzRainbow', true) },
  },

  {
    id: 'nz_rogernomics',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 1984 && G.currentYear <= 1990 &&
      G.age >= 18 &&
      !G.mem?.nzRoger,
    text: 'Finance Minister Roger Douglas implements the most radical free-market restructuring of any democracy in the postwar period. State assets are sold. Trade barriers gone. Subsidies to farmers cut overnight. The welfare state is rebuilt around market principles. Economists from overseas come to study New Zealand as a laboratory. For the people inside the laboratory, it is less interesting: the unemployment rate doubles, the gap between rich and poor widens, and some of the things that were assumed to be permanent about New Zealand — the egalitarianism, the sense of being looked after — turn out to have been policy rather than character.',
    choices: [
      {
        text: 'Your work or industry was hit — the reforms cost you directly',
        tag: 'hurt',
        outcome: 'The job was in an industry the government decided the market should sort. The market sorted it. You were part of the sorting.',
        effect: (p) => { p.m -= 10; p.w -= 5; p.mo -= 800; p.addFlag('nz_rogernomics_generation'); p.setMem('nzRoger', true) },
      },
      {
        text: 'You were positioned to benefit — the new economy had a place for you',
        tag: 'benefited',
        outcome: 'The liberalisation opened things. You were in the right place. You know that is not the whole story of what happened in the 1980s in New Zealand, but it is your story.',
        effect: (p) => { p.m += 5; p.w += 4; p.mo += 1200; p.addFlag('nz_rogernomics_generation'); p.setMem('nzRoger', true) },
      },
    ],
  },

  {
    id: 'nz_nuclear_free_declaration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 1987 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem?.nzNuclear,
    text: 'New Zealand passes the Nuclear Free Zone legislation. American warships can no longer dock at New Zealand ports unless they certify they carry no nuclear weapons. The Americans refuse to certify, which everyone understands to mean they do. The ANZUS security treaty effectively ends. New Zealand has chosen its principles over its alliance — or chosen one alliance over another, depending on how you read it. The decision is popular in ways that make the government surprised at how popular it is.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('nz_nuclear_free_generation'); p.setMem('nzNuclear', true) },
  },

  {
    id: 'nz_brain_drain',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 1988 && G.currentYear <= 2010 &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.nzBrainDrain,
    text: 'Australia is four hours away and pays more for the same work. The flight is a logic problem: same language, easier visa, higher wages, bigger city. A quarter of all New Zealanders live in Australia at any given time. The question is not exotic — not whether to emigrate to London or New York, but whether to cross the Tasman to a country that is familiar enough that it doesn\'t really feel like leaving. Your friends are asking the question. Some have already answered it.',
    choices: [
      {
        text: 'You go — Australia is the rational choice for your particular situation',
        tag: 'left',
        outcome: 'You go. You come back for Christmas. The coming back for Christmas becomes the way you maintain the connection to the place you left.',
        effect: (p) => { p.w += 5; p.mo += 1500; p.m -= 5; p.addFlag('nz_left_for_australia'); p.addFlag('expat'); p.setMem('nzBrainDrain', true) },
      },
      {
        text: 'You stay — New Zealand is where you understand yourself',
        tag: 'stayed',
        outcome: 'You watch people leave. You are still here. The people who left call New Zealand Paradise when they come back to visit, which is not the same as living in it.',
        effect: (p) => { p.m += 4; p.r += 2; p.addFlag('nz_stayer'); p.setMem('nzBrainDrain', true) },
      },
    ],
  },

  {
    id: 'nz_christchurch_earthquake_2011',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem?.nzEarthquake,
    text: 'The earthquake hits Christchurch at 12:51pm on a Tuesday in February 2011, when the streets and cafés are full. A hundred and eighty-five people die. The city\'s cathedral collapses. The central business district is closed for years. Buildings that looked solid are rubble inside half a minute. New Zealand experiences natural disasters — the geography guarantees it — but this one, at lunchtime, in the second city, is particular. The rebuild argument that follows takes a decade and is not finished.',
    choices: null,
    effect: (p) => { p.h -= 3; p.m -= 8; p.e += 3; p.addFlag('nz_christchurch_earthquake'); p.setMem('nzEarthquake', true) },
  },

  {
    id: 'nz_christchurch_attack_2019',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_NZ(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      !G.mem?.nzAttack,
    text: 'A white supremacist attacks two mosques in Christchurch during Friday prayers. Fifty-one people die. The killer livestreams it. The prime minister appears in front of the cameras within hours in a black hijab and says "They are us." The gun buyback legislation is passed in twenty-six days. New Zealand has been proud of its sense of safety — the distance from the world\'s violence, the doors left unlocked — and that pride now has a specific wound in it.',
    choices: [
      {
        text: 'You are in Christchurch — this is not an abstraction',
        tag: 'christchurch',
        outcome: 'The mosque is three streets from somewhere you know. The city absorbs another rupture. There is a vigil. There are many vigils.',
        effect: (p) => { p.m -= 15; p.karma += 6; p.addFlag('nz_christchurch_attack_generation'); p.addFlag('experienced_loss'); p.setMem('nzAttack', true) },
      },
      {
        text: 'You watch from elsewhere in New Zealand — present but at a remove',
        tag: 'watching',
        outcome: 'The prime minister\'s face is what you remember: the specific look of someone who understands what has just happened and is deciding, in real time, what to do about it.',
        effect: (p) => { p.m -= 9; p.karma += 4; p.addFlag('nz_christchurch_attack_generation'); p.setMem('nzAttack', true) },
      },
    ],
  },

  {
    id: 'nz_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_NZ(G) &&
      G.age >= 65 &&
      !G.mem?.nzLate,
    text: 'You have lived in one of the most geographically remote countries on earth. This shapes things in ways that are hard to name until you are old enough to see the shape. The distance kept certain things out and kept certain things in. The landscape — the mountains, the coast, the light — is not neutral. You carry it the way people carry the place they are from, which is completely and without meaning to.',
    choices: null,
    effect: (p) => { p.m += 7; p.r -= 4; p.karma += 3; p.setMem('nzLate', true) },
  },

]
