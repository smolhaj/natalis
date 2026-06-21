// Caribbean depth arc events
// Jamaica (7): garrison childhood, Rastafari worldview, 1980 election violence,
// Windrush-era emigration decision, area don moral economy, reggae generation,
// late reckoning.
// Trinidad and Tobago (5): Carnival as total institution, oil boom texture,
// ethnic politics, 1990 Muslimeen coup, steelband solidarity.

const IS_JAMAICA = (G) => G.character.country?.name === 'Jamaica'
const IS_TRINIDAD = (G) => G.character.country?.name === 'Trinidad and Tobago'

export const CARIBBEAN_EVENTS = [

  // ── JAMAICA ──────────────────────────────────────────────────────────────────

  {
    id: 'jam_garrison_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.ruralUrban !== 'rural' &&
      G.currentYear >= 1960 && G.currentYear <= 1995 &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.jam_garrison_childhood,
    text: 'The neighborhood has colors. Not paint — everyone knows which streets belong to which party, JLP orange or PNP orange-and-green, and you learn the map before you learn to read properly. The don on your block is not the police. He settles debts, lends money before Christmas, shows up when someone\'s house floods. He also knows which doors to knock on when the party needs a number, and which boys are old enough to carry something for him. You grow up understanding that the road you take to school is the road you take, not the other road, and this is not explained to you because it doesn\'t need to be.',
    choices: null,
    effect: (p) => {
      p.m -= 4;
      p.e += 3;
      p.addFlag('jamaican_garrison_community');
      p.setMem('jam_garrison_childhood', true);
    },
  },

  {
    id: 'jam_rasta_as_form',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.ethnicity === 'afro_jamaican' &&
      G.currentYear >= 1965 && G.currentYear <= 1990 &&
      G.age >= 13 && G.age <= 17 &&
      !G.mem?.jam_rasta_encounter,
    text: 'An older man in the yard has locks down to the middle of his back and he is not performing anything. He talks about Babylon — not as metaphor but as a description of how the banking system, the police, the colonial inheritance all fit together — and the argument is not mystical, it is structural, and it makes sense in a way that the civics lessons at school do not. He talks about Ethiopia and Marcus Garvey and the specific history of how Africans were brought to this island, and the reasoning is careful and documented. You have seen the posters and the T-shirts but this is not that. This is a theology that grew out of poverty and refusal, on this island, in your parents\' lifetime.',
    choices: null,
    effect: (p) => {
      p.e += 4;
      p.s += 2;
      p.addFlag('rasta_encounter');
      p.setMem('jam_rasta_encounter', true);
    },
  },

  {
    id: 'jam_1980_election_violence',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.currentYear >= 1979 && G.currentYear <= 1982 &&
      G.age >= 16 &&
      !G.mem?.jam_1980_election,
    text: (G) => {
      const yr = G.currentYear
      if (yr === 1980 || yr === 1981) {
        return 'Eight hundred people are dead by the time the October 30 election is over. The guns came in through the garrisons, distributed by party networks, and the neighborhoods that were already divided became frontlines. You knew someone. Not a gunman — a person who walked the wrong route on the wrong day. The morning after the result, the winning side fires shots in the air and the losing side goes quiet in a specific way, calculating what the new political weather means for who controls the resources, the contracts, the police favors, the don\'s protection in your area.'
      }
      return 'The election year is months away and already the garrison is tensing. Guns that were not there before are somewhere in the neighborhood. The JLP and PNP have always been rivals but this year the word being used is war.'
    },
    choices: [
      {
        text: 'Your side won.',
        tag: 'winning_side',
        outcome: 'The relief and the awareness arrive together — you have won, and eight hundred people are dead, and those two facts do not cancel each other. The celebrations are genuine. Something underneath them is not.',
        effect: (p) => {
          p.m += 2;
          p.r += 6;
          p.addFlag('jamaica_1980_election_witness');
          p.setMem('jam_1980_election', true);
        },
      },
      {
        text: 'Your side lost.',
        tag: 'losing_side',
        outcome: 'The don on your block goes quiet for a week. Then he starts making calls, figuring out which arrangements from the other side can be continued and which ones are finished. You watch him calculate and you understand that politics here is always this — who controls what, and who you have to talk to now.',
        effect: (p) => {
          p.m -= 8;
          p.r += 5;
          p.addFlag('jamaica_1980_election_witness');
          p.setMem('jam_1980_election', true);
        },
      },
    ],
  },

  {
    id: 'jam_emigration_decision',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.currentYear >= 1948 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.jam_emigration_decision,
    text: (G) => {
      const dest = G.currentYear <= 1962 ? 'London' : (G.currentYear <= 1968 ? 'London or New York' : 'New York or Toronto')
      return `The conversation has been happening in your family for months. Someone who went already has sent word back. The work is real — factory work, or nursing, or building sites — and the money is real, more than what you can make here. What you imagine when you think of ${dest} is specific: the BBC voice on the radio, the names of streets from the newsreels, the idea that there is a place where your papers mean something. What you do not imagine, because you cannot yet, is the cold in a way that is not just temperature, and the landladies with the signs in the window, and the specific texture of being a person from somewhere else in a place that is not sure it wanted you.`
    },
    choices: [
      {
        text: 'You leave.',
        tag: 'emigrated',
        outcome: 'The airport in Kingston, or the docks if it is early enough. You bring the food you will not be able to get there and the address of someone who will let you sleep on their floor for three weeks. You do not know yet that three weeks will become a question you will ask yourself for the rest of your life.',
        effect: (p) => {
          p.m -= 3;
          p.e += 3;
          p.addFlag('jamaica_emigrated');
          p.addFlag('emigrated');
          p.setResidency('work_visa');
          p.setMem('jam_emigration_decision', true);
        },
      },
      {
        text: 'You stay. The calculation comes out that way.',
        tag: 'stayed',
        outcome: 'The reasons feel solid: a mother who cannot be left, a business that could still work, a feeling that leaving is a kind of failure even if no one says so. The people who left send letters. The letters are not everything they were supposed to be.',
        effect: (p) => {
          p.m += 3;
          p.r += 4;
          p.addFlag('jamaica_stayed');
          p.setMem('jam_emigration_decision', true);
        },
      },
    ],
  },

  {
    id: 'jam_area_don',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.flags.has('jamaican_garrison_community') &&
      G.currentYear >= 1980 && G.currentYear <= 2005 &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.jam_area_don,
    text: 'The don is not a mystery. He is a man you have known since you were small, and he has buried people and provided for people, and the two things are not separate. He settles disputes that the police would mishandle or ignore. He lends school fees without paperwork. He ensures that garbage gets collected on your street when the municipality has forgotten you exist. In exchange, you vote correctly without being told, you do not speak to the police about anything you saw or heard, and you do not ask where his money comes from. This is a system, and it functions, and you have lived inside it your whole life.',
    choices: [
      {
        text: 'You accept the arrangement. It works — for now, for your street.',
        tag: 'accepted',
        outcome: 'You take the loan when your daughter\'s school fees come due. You vote correctly. You keep your mouth shut about the car you saw, the night, the direction it drove. You do not feel you had a real choice, and this feeling is accurate.',
        effect: (p) => {
          p.m -= 2;
          p.r += 4;
          p.mo += 500;
          p.addFlag('garrison_patron_dependent');
          p.setMem('jam_area_don', true);
        },
      },
      {
        text: 'You try to navigate outside it — find other ways, keep a certain distance.',
        tag: 'refused',
        outcome: 'It costs you: the loan you cannot get, the favor that goes to someone else, the mild surveillance of being the person who keeps their distance. You are not punished. You are simply not included, which in a garrison is its own kind of sentence.',
        effect: (p) => {
          p.m -= 5;
          p.e += 3;
          p.addFlag('garrison_patron_refused');
          p.setMem('jam_area_don', true);
        },
      },
    ],
  },

  {
    id: 'jam_reggae_generation',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.currentYear >= 1968 && G.currentYear <= 1988 &&
      G.age >= 12 && G.age <= 17 &&
      !G.mem?.jam_reggae_generation,
    text: 'The sound system is in someone\'s yard and it is not background music. The bass is physical — you feel it in your sternum before you identify it as sound. Ska gave way to rocksteady gave way to reggae, and what emerged is something that carries a specific political argument in the bass line and the lyric both. Bob Marley is not yet a poster on a wall in Amsterdam; he is a person from Trench Town who is making specific claims about specific conditions, and the people in this yard know which conditions he means. The music is also dancing and also joy, and those things are not in contradiction with the argument.',
    choices: [
      {
        text: 'You are fully inside it — the sound system, the music, the consciousness it carries.',
        tag: 'inside',
        outcome: 'You learn to identify a record from the first four bars. You know the difference between sound systems by their speaker stacks and their selectors\' judgment. This is a form of literacy you will carry for the rest of your life.',
        effect: (p) => {
          p.m += 8;
          p.s += 3;
          p.addFlag('reggae_generation');
          p.setMem('jam_reggae_generation', true);
        },
      },
      {
        text: 'You hear it and feel the pull, but you choose another path.',
        tag: 'outside',
        outcome: 'You can still identify a Studio One record from the first bar. What you chose instead — church, or study, or a different sound — does not erase the feeling. You remember the yard and what was playing the first time you understood what the bass was doing.',
        effect: (p) => {
          p.m += 3;
          p.e += 2;
          p.addFlag('reggae_generation');
          p.setMem('jam_reggae_generation', true);
        },
      },
    ],
  },

  {
    id: 'jam_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_JAMAICA(G) &&
      G.age >= 55 &&
      (G.flags.has('jamaican_garrison_community') || G.flags.has('jamaica_emigrated')) &&
      !G.mem?.jam_late_reckoning,
    text: (G) => {
      if (G.flags.has('jamaica_emigrated')) {
        return 'You have been here longer than you were ever there. Your children were born here and they have never seen a breadfruit tree in fruit. When you go back, the airport is different, the roads are different, and the people who stayed have a texture in their faces that you recognize but cannot name. You made the right decision, probably. The question is not about the decision. The question is about the thing that the decision, once made, could not keep for you.'
      }
      return 'The garrison is still the garrison, though the names change. The don your generation knew is dead or in prison or has a politician son in a suit. The young men on the corner are nineteen and twenty and they will live the same decade you watched other nineteen-year-olds live, and the system that produced the garrison is intact. You do not know what you could have done differently. You know that you understood the system perfectly and that understanding it was not the same as being free of it.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5;
      p.r += 5;
      p.e += 2;
      p.addFlag('jam_late_reckoned');
      p.setMem('jam_late_reckoning', true);
    },
  },

  // ── TRINIDAD AND TOBAGO ───────────────────────────────────────────────────────

  {
    id: 'tri_carnival_season',
    phase: 'childhood',
    weight: 6,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.age >= 8 && G.age <= 18 &&
      G.currentYear >= 1955 &&
      !G.mem?.tri_carnival_season,
    text: 'Carnival does not begin on the Monday before Ash Wednesday. Carnival begins in August, when the mas camp opens and the designer starts building the costume frame, the wire bending, the silk and feathers ordered from the supplier in the city. By January the whole neighborhood knows what band is playing on what road. The steel band from Laventille rehearses in the yard and the sound carries two streets over — pans tuned out of oil drums, the technology invented by people who were banned from African drums by the colonial government and who made a new instrument from the residue of the oil industry. The calypso that plays at the fete is funny and also political, commenting on the minister by name in a way that would be dangerous in prose. On the Monday of Carnival you are in the street at four in the morning for Jouvay, covered in mud, and the heat and the music are both physical things.',
    choices: null,
    effect: (p) => {
      p.m += 10;
      p.s += 4;
      p.addFlag('carnival_generation');
      p.setMem('tri_carnival_season', true);
    },
  },

  {
    id: 'tri_oil_boom_texture',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.currentYear >= 1973 && G.currentYear <= 1986 &&
      !G.mem?.tri_oil_boom,
    text: 'The Mighty Sparrow sings that we have money to burn, and it is not entirely satire. The oil price quadrupled in 1973 and T&T is one of the largest producers in the hemisphere, and the government is spending: highways, a national airline, an iron and steel company, a new hospital. Your Caribbean neighbors come here looking for work. The stores in Port of Spain have imported goods that were not available last year. But the pipes in your street still burst and wait three weeks to be fixed, and the contractor who got the highway tender is someone\'s cousin, and when the oil price drops in 1981 the money that should have built a diversified economy has been mostly spent. You are in the specific middle of the boom, when it still feels like it will last.',
    choices: null,
    effect: (p) => {
      p.m += 6;
      p.w += 5;
      p.addFlag('trinidad_oil_boom_generation');
      p.setMem('tri_oil_boom', true);
    },
  },

  {
    id: 'tri_ethnic_politics_indo',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.ethnicity === 'indo_trinidadian' &&
      G.currentYear >= 1962 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.tri_ethnic_politics,
    text: 'Before you say a word about politics, people know how you vote. Your grandparents came as indentured laborers from Bihar and Uttar Pradesh after emancipation, when the plantations needed workers, and the community that formed in the sugarcane belt has its own mandirs and its own cricket clubs and its own political party. The PNM has run the country since independence behind Eric Williams, and it is understood to be an Afro-Trinidadian party. The DLP, now the UNC, is yours. The accommodation is real — the two communities share a country and have built genuine things together — but it requires keeping certain conversations from happening.',
    choices: [
      {
        text: 'You accept the ethnic politics. This is the water you swim in.',
        tag: 'accepted',
        outcome: 'You vote the way your community votes. There is comfort in this — the solidarity is real, even if it is also a cage. You do not blame anyone for the arrangement. It was built before you were born.',
        effect: (p) => {
          p.s += 2;
          p.addFlag('indotrinidadian_ethnic_tension');
          p.setMem('tri_ethnic_politics', true);
        },
      },
      {
        text: 'You vote across the line. It has social costs.',
        tag: 'crossed_line',
        outcome: 'At the rum shop someone asks who you voted for, the way people do when they already know, and you tell them. The conversation that follows is brief. Your loyalty to the community is now a question mark that will follow you into certain rooms.',
        effect: (p) => {
          p.m -= 4;
          p.e += 4;
          p.r += 2;
          p.addFlag('indotrinidadian_ethnic_tension');
          p.setMem('tri_ethnic_politics', true);
        },
      },
    ],
  },

  {
    id: 'tri_ethnic_politics_afro',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.ethnicity !== 'indo_trinidadian' &&
      G.currentYear >= 1962 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.tri_ethnic_politics,
    text: 'In school you had Indian friends and you still do, and the friendship is genuine, and it coexists with a political division that both of you understand without discussing. The PNM has run the country behind Eric Williams since independence because the Afro-Trinidadian population is the plurality, and this fact shapes every election in ways that your friendship does not undo. The accommodation is not dishonest — the cricket ground and the Carnival road are genuinely shared — but the ballot box is something you and your Indian friend do separately, and both of you know it.',
    choices: [
      {
        text: 'You accept the ethnic politics. This is the water you swim in.',
        tag: 'accepted',
        outcome: 'You vote the way your community votes. The solidarity is real, even when it is also automatic. You do not examine it closely because examining it does not change it.',
        effect: (p) => {
          p.s += 2;
          p.addFlag('afrotrinidadian_politics_generation');
          p.setMem('tri_ethnic_politics', true);
        },
      },
      {
        text: 'You vote across the line. It has social costs.',
        tag: 'crossed_line',
        outcome: 'At the rum shop someone asks who you voted for, the way people do when they already know, and you tell them. The conversation that follows is brief. Your loyalty to the community is now a question mark that will follow you into certain rooms.',
        effect: (p) => {
          p.m -= 4;
          p.e += 4;
          p.r += 2;
          p.addFlag('afrotrinidadian_politics_generation');
          p.setMem('tri_ethnic_politics', true);
        },
      },
    ],
  },

  {
    id: 'tri_1990_coup',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 20 && G.age <= 45 &&
      !G.mem?.tri_1990_coup,
    text: 'July 27, 1990, a Friday afternoon. Abu Bakr and the Jamaat al Muslimeen — a hundred and fourteen men — storm the Red House parliament building and the TTT television station simultaneously. The Prime Minister is held at gunpoint on air. The announcer you recognize from the evening news is not reading news. For six days the government of Trinidad and Tobago does not function. There is looting in Port of Spain, a city that has never seen this before. You watch from wherever you are — home, the street, a shop with a television in the window — and you understand that the country you thought you knew had a different layer underneath it all along. On the sixth day Abu Bakr surrenders. The television comes back on. The amnesty deal he negotiates is later declared unconstitutional. He serves no prison time.',
    choices: null,
    effect: (p) => {
      p.m -= 8;
      p.r += 3;
      p.addFlag('trinidad_1990_coup_witness');
      p.setMem('tri_1990_coup', true);
    },
  },

  {
    id: 'tri_steelband_solidarity',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_TRINIDAD(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.tri_steelband,
    text: 'The yard where the band rehearses is on a Tuesday night and you are allowed to sit on the wall and watch. The pans were oil drums — the fifty-five gallon drums from the petroleum industry, hammered into bowls, the surface tempered and tuned by hand into notes. The colonial government banned African drums in 1883 because they believed drumming carried messages of resistance, and so the people who came after found the next available surface and made music from it. An Indo-Trinidadian man near you knows this section\'s part by heart. The pan does not resolve the ethnic politics — nothing does — but inside the band the question of who plays the melody and who plays the bass and who has the best ear is answered by music, not by ancestry.',
    choices: null,
    effect: (p) => {
      p.m += 7;
      p.s += 2;
      p.e += 2;
      p.addFlag('steelband_generation');
      p.setMem('tri_steelband', true);
    },
  },

  // ── FOLLOW-THROUGHS ───────────────────────────────────────────────────────────

  {
    id: 'jam_1980_election_midlife_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('jamaica_1980_election_witness') &&
      G.age >= 38 &&
      !G.mem?.jam_1980_midlife_echo,
    text: 'A politician on television is talking about garrison communities and the interviewer nods at the word "violence" as though it is a climate condition — something that simply happens there, like rain. You know who distributed the guns and you know which party\'s garrison you grew up in and you know that the eight hundred people who died in 1980 were not accidental. The analysis on television is about crime. You know that is not what it was.',
    choices: null,
    effect: (p) => {
      p.m -= 4;
      p.e += 2;
      p.setMem('jam_1980_midlife_echo', true);
    },
  },

  {
    id: 'tri_1990_coup_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('trinidad_1990_coup_witness') &&
      G.age >= 35 &&
      !G.mem?.tri_coup_echo,
    text: 'The amnesty was ruled unconstitutional but Abu Bakr served no time. He gave interviews for years afterward. The government that was held hostage at gunpoint for six days eventually fell for other reasons — corruption, economics — and the men who stormed parliament became one more unresolved piece of national history. You remember exactly where you were when the television cut to the Red House. You remember the prime minister\'s face. The country moved on in the specific way that small countries move on from things too large to hold: by continuing.',
    choices: null,
    effect: (p) => {
      p.m -= 3;
      p.r += 3;
      p.setMem('tri_coup_echo', true);
    },
  },

]
