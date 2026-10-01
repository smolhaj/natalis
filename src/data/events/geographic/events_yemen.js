// Yemen character events
// Historical arcs: North/South Yemen cold war proxies, reunification 1990,
// 1994 civil war (south crushed), Ali Abdullah Saleh's long rule and tribal balancing,
// Arab Spring 2011 and Saleh's exit, Houthi takeover 2014, Saudi-led coalition war 2015+,
// one of the world's worst humanitarian crises — cholera, famine, siege of Hodeidah.

export const YEMEN_EVENTS = [

  {
    id: 'yem_saleh_era_childhood',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear >= 1980 && G.currentYear <= 2008 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem.yemSaleh,
    text: 'Ali Abdullah Saleh has governed North Yemen since 1978 and unified Yemen since 1990. He describes his method as "dancing on the heads of snakes" — the tribes, the military factions, the Islamists, the southern grievances, the Houthi rebellion in the north. The governance is not a state in the European sense: it is a balancing act between competing power centres, with oil money as the grease. What you grow up with is specific: the mosque that is the real civic institution, the qat session in the afternoon that is where the politics happens, the tribal affiliation that precedes every negotiation.',
    choices: null,
    effect: (p) => { p.e += 1; p.m += 2; p.r += 2; p.addFlag('yemeni_saleh_generation'); p.setMem('yemSaleh', true) },
  },

  {
    id: 'yem_unification_1990',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 1990 &&
      G.age >= 16 &&
      !G.mem.yemUnification,
    text: 'May 22, 1990, and North and South Yemen become one country after twenty-five years apart: the north tribal and leaning toward America, the south Marxist and Soviet, more urban, with women in professions. They were one country on the old maps and had become two different societies. The south gets seats; Saleh keeps the army. Over the next four years it becomes clear what those two facts mean.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.addFlag('yemeni_unification_generation'); p.setMem('yemUnification', true) },
  },

  {
    id: 'yem_1994_civil_war',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 1994 &&
      G.age >= 18 &&
      !G.mem.yem1994,
    text: 'May 1994, and the south declares independence, and it lasts seventy days. Saleh\'s army, with the northern tribes and the fighters back from Afghanistan, takes Aden. Southern officers are purged and southern land handed to northern sheikhs. The south voted to unite and lost the war to leave. The southerners remember exactly what was taken, and by whom, and that it has never been settled.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('yemeni_1994_generation'); p.setMem('yem1994', true) },
  },

  {
    id: 'yem_arab_spring_2011',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 2011 &&
      G.age >= 18 &&
      !G.mem.yemSpring,
    text: 'January 2011, and Change Square in Sana\'a fills with tents, students and tribesmen and southerners together for the first time. In June Saleh is wounded in an attack on his mosque and flown to Saudi Arabia, and in November he signs the Gulf agreement and hands power to his deputy, in exchange for immunity. A thirty-three-year president has been removed without a military coup. What follows the immunity will be remarkable in another direction.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 5; p.addFlag('yemeni_revolution_generation'); p.setMem('yemSpring', true) },
  },

  {
    id: 'yem_houthi_war_2015',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem.yemWar,
    text: 'March 2015. The Houthis — the Zaidi Shia movement from the north that has been fighting the state for a decade — take Sana\'a and advance on Aden. The Saudi-led coalition begins airstrikes. Saleh, under house arrest and confined to Sana\'a, aligns with the Houthis against Hadi. He is killed by the Houthis in December 2017 when he tries to switch sides again. The war is the most complex proxy conflict on earth: Saudi Arabia and the UAE on one side, Iran and Hezbollah on the other, the Houthis, the Hadi government, the Southern Transitional Council, Al-Qaeda in the Arabian Peninsula, ISIS — all operating in a country of twenty-five million people that was already the poorest in the Arab world.',
    choices: [
      {
        text: 'You are in the north — in Sana\'a or Houthi-controlled territory.',
        tag: null,
        outcome: 'The airstrikes come from the sky without warning. The Houthi checkpoints are on every road. The economy has collapsed. The currency has fractured into two. You are surviving in a city that is both occupied and bombed.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.r += 14; p.addFlag('yemeni_war_generation'); p.addFlag('yemeni_war_north'); p.setMem('yemWar', true) },
      },
      {
        text: 'You are in the south — in Aden or territory controlled by the government or the STC.',
        tag: null,
        outcome: 'The city changed hands multiple times. The Southern Transitional Council eventually controls most of Aden — but the STC has different ambitions from the Hadi government it was meant to support. You are in a country that has at least three governments depending on which road you are on.',
        effect: (p) => { p.m -= 16; p.h -= 4; p.r += 11; p.addFlag('yemeni_war_generation'); p.addFlag('yemeni_war_south'); p.setMem('yemWar', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'yem_humanitarian_collapse',
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Yemen' &&
      G.currentYear >= 2016 &&
      G.age >= 16 &&
      !G.mem.yemCrisis,
    text: 'The blockade closes the port at Hodeidah, and the water pipes are bombed or broken, and the cholera comes. In the hospitals still open the doctors have not been paid in months. Children are dying of things nobody dies of anywhere else. You are alive in this, and that is the year\'s primary fact.',
    context: 'Yemen\'s war produced the world\'s largest humanitarian crisis by UN measure, with over four million displaced and the largest cholera outbreak in recorded history (2016-2018). Hodeidah handled about 80 percent of food imports.',
    choices: null,
    effect: (p) => { p.m -= 16; p.h -= 4; p.r += 12; p.addFlag('yemeni_crisis_generation'); p.setMem('yemCrisis', true) },
  },

]
