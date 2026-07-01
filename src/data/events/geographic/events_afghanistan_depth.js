// events_afghanistan_depth.js
// Afghanistan depth arc: Taliban 1996 takeover, women's education revoked,
// 2001 US invasion and hope period, reconstruction corruption, interpreter arc,
// 2021 Taliban return, diaspora watching.
// Complements events_afghanistan.js.

export const AFGHANISTAN_DEPTH_EVENTS = [

  {
    id: 'afg_taliban_kabul_1996',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1996 && G.currentYear <= 1997 &&
      G.age >= 12 &&
      !G.mem?.afgTaliban96,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      if (isFemale) {
        return 'September 27, 1996. The Taliban enter Kabul. The radio station plays Quranic recitation where the music was. The edicts come quickly: women may not leave the house without a male relative. Women may not work. Girls may not attend school. Burqas are required in public. A week ago you were going to school, or to work, or to the market alone. The space between last week and this week is a week, and it is also everything. The school does not say it is closing. It simply does not open on Sunday morning. You wait for a note. No note comes.'
      }
      return 'September 27, 1996. The Taliban enter Kabul. Mohammed Najibullah, who had been living under UN protection in the city, is dragged from the compound and killed. His body is hung from a traffic control post in Aryana Square. The radio station plays Quranic recitation. Edicts follow in rapid succession: no music, no television, no photographs, women confined to their homes without male escort, men required to grow beards of a required length. Kabul had been the most secular city in Afghanistan. The Kabul that existed on September 26 is no longer the city you are living in.'
    },
    choices: [
      {
        text: 'You adapt. The alternative to adapting is worse.',
        tag: 'afg_taliban_96_generation',
        outcome: 'Adapting is a practice. You learn which version of yourself to show on the street. The inner version stays somewhere and you visit it quietly.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('afg_taliban_96_generation'); p.addFlag('learned_silence'); p.setMem('afgTaliban96', true); },
      },
      {
        text: 'Your family leaves Kabul. There are still places the Taliban do not yet reach.',
        tag: 'afg_taliban_96_generation',
        outcome: 'The places the Taliban do not yet reach shrink. By 1998 they control ninety percent of the country.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('afg_taliban_96_generation'); p.setMem('afgTaliban96', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_education_revoked',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1996 && G.currentYear <= 2001 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.afgEducRevoked,
    text: 'Your teacher was a woman named Afsana. She had taught here for nine years. On the morning after the Taliban\'s decree she does not come to school. The girls who arrive at the gate are turned away by a man you have not seen before. There is no announcement. No letter. You wait two weeks before accepting that the school is not going to reopen for you. The boys\' school on the next street opens again after two weeks. Afsana, you hear later, has started a secret school in her home — seven girls crammed into a back room, textbooks hidden under cloth. If the Taliban discover it the punishment is severe. You know where she lives.',
    choices: [
      {
        text: 'You go to Afsana\'s house. You will learn in secret.',
        tag: 'afg_secret_schooling',
        outcome: 'Seven girls. A back room. The textbooks hidden when there is a sound at the door. You learn to read faster when you are afraid of being caught.',
        effect: (p) => { p.e += 8; p.karma += 8; p.m -= 5; p.addFlag('afg_secret_schooling'); p.addFlag('afg_education_revoked'); p.setMem('afgEducRevoked', true); },
      },
      {
        text: 'Your family says no. The risk is too high.',
        tag: 'afg_education_revoked',
        outcome: 'You stay home. You watch your brothers go to school. You count the years.',
        effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('afg_education_revoked'); p.setMem('afgEducRevoked', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_2001_fall_of_kabul',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2001 && G.currentYear <= 2002 &&
      G.age >= 12 &&
      !G.mem?.afg2001Fall,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      if (isFemale) {
        return 'November 13, 2001. The Taliban abandon Kabul overnight. By morning the music is on. Men are shaving their beards in the street, which is also a protest and also a celebration. Women are removing their burqas — some of them, some of them not yet, some of them never. You remove yours. The air on your face is not different from the air through the mesh was different. But the act is different. You have been waiting five years to take it off and the moment is not what you expected a moment that large to be. It is just taking something off. Then you walk outside alone for the first time in five years.'
      }
      return 'November 13, 2001. The Taliban abandon Kabul overnight, retreating south. US air power and Northern Alliance forces on the ground have moved faster than anyone expected. By morning the music is on in the shops. A barber on Chicken Street is shaving men for free. The American and other foreign forces arrive and the world presses begin sending journalists and photographers and the images go out: women with uncovered faces, girls going to school, boys flying kites. The country has a future tense again.'
    },
    choices: null,
    effect: (p) => {
      p.m += 12
      p.h += 3
      p.addFlag('afg_2001_liberation_hope')
      p.setMem('afg2001Fall', true)
    },
  },

  {
    id: 'afg_reconstruction_years',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      G.age >= 18 &&
      G.flags.has('afg_2001_liberation_hope') &&
      !G.mem?.afgReconstruct,
    text: 'The reconstruction economy. Billions of dollars flowing in from USAID, the World Bank, the European Union, bilateral donors — and flowing out again through contracts to foreign companies, through corruption at every level of the Karzai government, through the same warlords who had been fighting each other in 1992 and who now wear Western suits and run ministries. The poppy economy: opium production under the Taliban had been nearly eliminated, now it is at record highs. The private security companies that employ former mujahideen. The interpreters who earn more in a month than most Afghans earn in a year. The girls\' schools that are being built in provinces where the Taliban will return in three years.',
    choices: [
      {
        text: 'You work in the aid economy — NGO, UN, government ministry.',
        tag: 'afg_aid_economy_worker',
        outcome: 'The salaries paid by foreign organisations are transformative. The disconnect between what the money is supposed to do and what it does is something you manage as a professional manages it — by working in your lane.',
        effect: (p) => { p.mo += 15000; p.e += 5; p.m -= 3; p.r += 4; p.addFlag('afg_aid_economy_worker'); p.setMem('afgReconstruct', true); },
      },
      {
        text: 'You watch the money flow and return to your old work. You have seen reconstruction promises before.',
        tag: null,
        outcome: 'You have a scepticism that is earned and that makes you difficult to impress. The reconstruction is real in some places. In other places it is a press release.',
        effect: (p) => { p.r += 4; p.e += 2; p.setMem('afgReconstruct', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_interpreter_nato',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2003 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      G.flags.has('afg_2001_liberation_hope') &&
      (G.stats.smarts >= 50) &&
      !G.mem?.afgInterpreter,
    text: 'The American base or the British base or the German base. The recruiter for interpreters is Afghan, which matters. The pay is fifteen hundred dollars a month — more than any Afghan government salary. The work: go with the soldiers, translate what they say and what is said to them. Not just words: context, register, what a refusal means and how a refusal sounds different from a yes that means no. You know the language of the villages in a way the foreign soldiers never will. You are also, to the Taliban, working for the occupation. Your family knows what you are doing. Your cousins in the village know.',
    choices: [
      {
        text: 'You take the work. The money is real and you believe in the mission.',
        tag: 'afg_interpreter_served',
        outcome: 'Three years. Then five. You know soldiers who are rotated out after seven months and you are still here. The promised visa application is being processed.',
        effect: (p) => { p.mo += 30000; p.e += 8; p.s += 3; p.m -= 5; p.r += 6; p.addFlag('afg_interpreter_served'); p.setMem('afgInterpreter', true); },
      },
      {
        text: 'You refuse. The targeted risk is too high and the visa is a rumour.',
        tag: null,
        outcome: 'The visa turns out to not be a rumour. Some interpreters get to America. Some don\'t. You will not know which kind you would have been.',
        effect: (p) => { p.r += 5; p.setMem('afgInterpreter', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_women_career_2013',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 2010 && G.currentYear <= 2020 &&
      G.age >= 22 &&
      G.flags.has('afg_2001_liberation_hope') &&
      !G.mem?.afgWomenCareer,
    text: 'You have a degree. Maybe two. You have worked in the Ministry of Women\'s Affairs or in an NGO or as a teacher or as a doctor or as a journalist. The women in your profession have built something over twenty years that did not exist before — a visible professional women\'s class in Kabul, and to a lesser degree in Herat and Mazar-i-Sharif. The foreign forces are withdrawing, and everyone is watching the Taliban positions to the south, but no one in 2013 or 2015 or 2017 seriously believes that Kabul is going to fall. The city has a future tense. You are that future tense.',
    choices: null,
    effect: (p) => {
      p.e += 5
      p.m += 5
      p.mo += 8000
      p.addFlag('afg_women_career_built')
      p.setMem('afgWomenCareer', true)
    },
  },

  {
    id: 'afg_2021_collapse',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2021 && G.currentYear <= 2022 &&
      G.age >= 12 &&
      !G.mem?.afg2021,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      const hasCareer = G.flags.has('afg_women_career_built')
      if (isFemale && hasCareer) {
        return 'August 15, 2021. You go to work in the morning. By afternoon you are watching colleagues pack their desks. By evening the president has left the country. The Taliban are in the Presidential Palace. You have a career, a degree, two decades of the country\'s imperfect opening. The airport will be overwhelmed within hours. You know the gate number of the evacuation flights and you know you may not reach them. You think about what to pack. You think about what would be abandoned. There is a box in your apartment that you bought two years ago for a different life — a life of staying — and now it is the problem that it is too heavy.'
      }
      if (isFemale) {
        return 'August 15, 2021. The Taliban enter Kabul. You know what they did the last time — you were here or your mother was here. The girls\' school that opened in 2002 is on the corner. You wonder if it will close again. It closes again. The edict about women leaving the house without male escort comes first. Then the secondary school ban. Then the university ban. The velocity of the restoration is faster than anyone expected.'
      }
      return 'August 15, 2021. Kabul. The government dissolved faster than the foreign intelligence assessments predicted — eleven days from the Doha withdrawal to the airport. President Ghani fled. The foreign embassies evacuated their personnel. At Hamid Karzai International Airport, the crowds on the runway were enormous. People tried to hold onto the landing gear of departing military aircraft. Some fell. The images circulated. The Taliban spokesman gave a press conference. He seemed surprised the cameras were there.'
    },
    choices: [
      {
        text: 'You get to the airport. The crush, the panic, the question of whether you make the flight.',
        tag: 'afg_2021_escaped',
        outcome: 'You make it. Doha first, then a transit country, then a third country. You arrive somewhere with what you could carry. The visa problem will take another two years.',
        effect: (p) => { p.m -= 20; p.r += 12; p.karma += 5; p.addFlag('afg_2021_escaped'); p.addFlag('emigrated'); p.setMem('afg2021', true); },
      },
      {
        text: 'You cannot reach the airport, or you will not leave your family.',
        tag: 'afg_2021_stayed',
        outcome: 'You stay. The new government\'s first weeks are cautious — they want international recognition. Then the restrictions begin arriving, one decree at a time.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('afg_2021_stayed'); p.setMem('afg2021', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_2021_diaspora_watch',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2021 && G.currentYear <= 2024 &&
      G.age >= 18 &&
      !G.flags.has('afg_2021_escaped') &&
      !G.mem?.afgDiasporaWatch,
    text: 'You left before. Years before — for university, for work, for the war, for a marriage to someone abroad. You have been watching Afghanistan from outside. When the Taliban take Kabul in August 2021 you are watching on a phone or a television in a country that is not Afghanistan. Your family is still there. The contact goes in and out — they are afraid of what a call from an international number means on their phone records. The group chat for your extended family goes quiet for three days, then begins again, carefully. The messages are not about politics.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.addFlag('afg_diaspora_watches')
      p.setMem('afgDiasporaWatch', true)
    },
  },

  {
    id: 'afg_living_under_new_taliban',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.flags.has('afg_2021_stayed') &&
      G.currentYear >= 2022 && G.currentYear <= 2030 &&
      G.age >= 20 &&
      !G.mem?.afgNewTaliban,
    text: 'The specific texture of life under the Taliban now. The ministry checkpoints. The changes in dress code, enforced by the Ministry for the Promotion of Virtue and Prevention of Vice — the same name as before, but the personnel have changed, the methods are similar. What is different from 1996: the phones, the internet that reaches through the restrictions, the awareness that the world is watching even when the world is not doing anything. What is the same: the fear when you pass a checkpoint, the calculation about what you say and to whom, the management of your daily life in the gap between what you are allowed and what you need.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.h -= 5
      p.addFlag('afg_post_2021_life')
      p.setMem('afgNewTaliban', true)
    },
  },

  {
    id: 'afg_interpreter_2021_threat',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.flags.has('afg_interpreter_served') &&
      G.currentYear >= 2021 && G.currentYear <= 2024 &&
      !G.mem?.afgInterpreterThreat,
    text: 'You worked for the Americans for years. You have their photographs in a phone you have destroyed. You have a reference letter from a captain who is now in Colorado, and the letter is the only thing that might save you, and it is a paper document in a country where the wrong document is worse than no document. The visa application that was "in process" when the embassy evacuated is in a server somewhere that you cannot access. The Taliban have your name from files that were not destroyed in the drawdown. You know two other interpreters who have already been found. The question is who will find you first: the evacuation flight or the people looking for you.',
    choices: [
      {
        text: 'You make it to the airport. A Special Immigrant Visa processes eventually.',
        tag: 'afg_interpreter_evacuated',
        outcome: 'Fort Lee, Virginia. A processing center. Then a apartment somewhere in suburban America near a mosque. You have survived what the visa was for.',
        effect: (p) => { p.m -= 5; p.h += 5; p.karma += 5; p.r += 8; p.addFlag('afg_interpreter_evacuated'); p.addFlag('emigrated'); p.setMem('afgInterpreterThreat', true); },
      },
      {
        text: 'You cannot get out. You hide. The visa process continues by email from inside.',
        tag: null,
        outcome: 'The process takes three more years. Every day is a calculation. The email inbox becomes the only external world.',
        effect: (p) => { p.m -= 20; p.h -= 10; p.r += 10; p.setMem('afgInterpreterThreat', true); },
      },
    ],
    effect: null,
  },

]
