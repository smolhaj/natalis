// Yemen character events
// Historical arcs: North/South Yemen cold war proxies, reunification 1990,
// 1994 civil war (south crushed), Ali Abdullah Saleh's long rule and tribal balancing,
// Arab Spring 2011 and Saleh's exit, Houthi takeover 2014, Saudi-led coalition war 2015+,
// one of the world's worst humanitarian crises — cholera, famine, siege of Hodeidah.

export const YEMEN_EVENTS = [

  {
    id: 'yem_saleh_era_childhood',
    phase: 'childhood',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 1990 &&
      G.age >= 16 &&
      !G.mem.yemUnification,
    text: 'May 22, 1990. North Yemen and South Yemen unite after twenty-five years of separation. The north was capitalist, American-adjacent, tribal. The south was Marxist, Soviet-backed, more urbanised, with educated women in professional roles and a different relationship to Islam. The merger is between two states that were always one country in the old maps but had become genuinely different societies. The south gets formal representation. Saleh controls the army. What those two facts mean becomes clearer over the next four years.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.addFlag('yemeni_unification_generation'); p.setMem('yemUnification', true) },
  },

  {
    id: 'yem_1994_civil_war',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 1994 &&
      G.age >= 18 &&
      !G.mem.yem1994,
    text: 'May 1994. The south declares independence. The People\'s Democratic Republic of Yemen lasts seventy days. Saleh\'s forces, with northern tribal militias and jihadists who had returned from Afghanistan, crush the secession. Aden is taken. Southern officers are purged from the military. Southern land is redistributed to northern tribal leaders. The south had won the vote to unite; it lost the war to separate. The southerners remember exactly which assets were taken, by whom, and that the accounting has never been settled.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('yemeni_1994_generation'); p.setMem('yem1994', true) },
  },

  {
    id: 'yem_arab_spring_2011',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear === 2011 &&
      G.age >= 18 &&
      !G.mem.yemSpring,
    text: 'January 2011. The protests start in Sana\'a — Change Square, the tent city, the students and the tribesmen and the southern movement all in the same space for the first time. Saleh is shot in an assassination attempt in June. He leaves for medical treatment in Saudi Arabia. He eventually signs the Gulf Cooperation Council agreement in November and transfers power to his vice president Hadi. He is given immunity. You are in a country that has just removed a thirty-three-year president without a military coup, which is remarkable. What comes after immunity will also be remarkable, in a different direction.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 5; p.addFlag('yemeni_revolution_generation'); p.setMem('yemSpring', true) },
  },

  {
    id: 'yem_houthi_war_2015',
    phase: 'midlife',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Yemen' &&
      G.currentYear >= 2016 &&
      G.age >= 16 &&
      !G.mem.yemCrisis,
    text: 'The worst cholera outbreak in recorded history. The largest humanitarian crisis in the world. Four million displaced. Millions on the edge of famine. The Saudi coalition blockades the port of Hodeidah — through which eighty percent of Yemen\'s food imports flow. The water infrastructure is bombed or broken. In the hospitals that are still functioning, the doctors have not been paid in months, because the state cannot pay salaries. Children are dying of preventable diseases. The number of dead from violence and disease is in the hundreds of thousands. You are alive in this. That is the year\'s primary fact.',
    choices: null,
    effect: (p) => { p.m -= 16; p.h -= 4; p.r += 12; p.addFlag('yemeni_crisis_generation'); p.setMem('yemCrisis', true) },
  },

]
