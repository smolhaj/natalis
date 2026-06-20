// events_asia_arcs.js
// Deep historical arcs for Cambodia, Bangladesh, and Pakistan.
// Cambodia: Khmer Rouge era, liberation, UNTAC, survivor silence.
// Bangladesh: Liberation War, annual floods, garment industry, Rana Plaza.
// Pakistan: Muhajir arrival, 1971 East Wing, Zia Islamisation, blasphemy laws, nuclear tests.

export const ASIA_ARC_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // CAMBODIA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ca_khmer_rouge_city_evacuation',
    phase: null,
    weight: 5,
    when: (G) =>
      !G.mem?.caEvacuation &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1975 && G.currentYear <= 1976 &&
      G.age >= 4,
    text: 'Soldiers move through the streets with megaphones. The city is being evacuated, they say. Three days. You will come back when the Americans stop bombing. You take what you can carry in a bag — a change of clothes, a photograph, a pot. The road out of Phnom Penh is a column of people with no end visible in either direction. Wheelchairs, hospital gurneys, men still in surgical bandages. The soldiers say it will be short.',
    choices: [
      {
        text: 'Pack only what fits in one bag',
        tag: null,
        outcome: 'You leave with almost nothing. The city empties behind you and does not fill again for four years.',
        effect: (p) => { p.m -= 14; p.h -= 6; p.w -= 15; p.addFlag('khmer_rouge_displaced'); p.setMem('caEvacuation', true); },
      },
      {
        text: 'Leave with the clothes you are wearing',
        tag: null,
        outcome: 'There is no time. The column moves and you move with it. What you left behind is gone the same day.',
        effect: (p) => { p.m -= 16; p.h -= 8; p.w -= 18; p.addFlag('khmer_rouge_displaced'); p.setMem('caEvacuation', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_khmer_rouge_year_zero',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem?.caYearZero &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1975 && G.currentYear <= 1979 &&
      G.age >= 5 && G.age <= 14,
    text: 'In the village they have assigned you to, the cadres ask questions at the evening meeting. What did your father do before liberation? Where did you go to school? Do you speak any foreign languages? The right answer to each question is the peasant answer: nothing, nowhere, no. Glasses mark you as educated. Soft hands mark you as someone who did not farm. You learn to hold your hands differently. You learn to answer before you think.',
    choices: null,
    effect: (p) => {
      p.m -= 18;
      p.h -= 10;
      p.r += 10;
      p.e -= 4;
      p.addFlag('khmer_rouge_survivor');
      p.addFlag('learned_silence');
      p.setMem('caYearZero', true);
    },
  },

  {
    id: 'ca_khmer_rouge_denunciation',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.caDenunciation &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1975 && G.currentYear <= 1979 &&
      G.age >= 8,
    text: 'The village cadre calls you forward. He says that an enemy of the revolution has been identified in the village. He names the man — your neighbour, the one whose daughter used to play with you. He asks if you have seen this man behave in ways inconsistent with the revolution. Everyone is watching. The cadre is watching you specifically.',
    choices: [
      {
        text: 'Say yes — give them something plausible',
        tag: null,
        outcome: 'The neighbour is taken that evening. You do not see him again. The guilt is specific and has no resolution.',
        effect: (p) => { p.m -= 20; p.r += 18; p.karma -= 15; p.addFlag('denunciation_made'); p.setMem('caDenunciation', true); },
      },
      {
        text: 'Say you have seen nothing',
        tag: 'principled',
        outcome: 'The cadre watches you for a long time. The neighbour is taken anyway, a week later. Your refusal costs you something that takes months to see the shape of.',
        effect: (p) => { p.m -= 14; p.h -= 6; p.r += 8; p.karma += 8; p.addFlag('refused_denunciation'); p.setMem('caDenunciation', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_vietnamese_liberation',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.caVietnameseLiberation &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1979 && G.currentYear <= 1980 &&
      G.age >= 4,
    text: 'The Vietnamese soldiers arrive on the road before dawn. They are not the Khmer Rouge. That is the first thing you understand — they are different soldiers, and the Khmer Rouge cadres have fled in the night. The second thing you understand is that these soldiers are also foreign, and that they are staying. The war is over. A different army is here now. You eat the rice they hand out from the back of a truck and try to remember what it tasted like before.',
    choices: null,
    effect: (p) => {
      p.m += 8;
      p.h += 6;
      p.addFlag('liberation_generation');
      p.setMem('caVietnameseLiberation', true);
    },
  },

  {
    id: 'ca_khmer_rouge_survivor_silence',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.caSurvivorSilence &&
      G.character.country.name === 'Cambodia' &&
      G.flags.includes('khmer_rouge_survivor') &&
      G.currentYear >= 1985 &&
      G.age >= 20,
    text: 'Someone asks about the 1970s. A younger colleague, a foreigner, a journalist writing something. They want to know what it was like. You have a practised answer — short, factual, the version that does not require the other person to hold anything they are not prepared to hold. You give that answer. On the way home you think about what the full answer would have taken, and how long it would have gone on.',
    choices: [
      {
        text: 'Keep giving the short answer',
        tag: null,
        outcome: 'The silence protects both of you. It also costs something each time.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('survivor_silence'); p.setMem('caSurvivorSilence', true); },
      },
      {
        text: 'Tell someone the full account, once',
        tag: null,
        outcome: 'You talk for two hours. Afterward the room feels different. The person listening does not know what to say, and that is the correct response.',
        effect: (p) => { p.m += 4; p.r -= 4; p.karma += 5; p.addFlag('testimony_given'); p.setMem('caSurvivorSilence', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_untac_election',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.caUntacElection &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1993 && G.currentYear <= 1994 &&
      G.age >= 18,
    text: 'The United Nations has organized elections. They call it a free and fair election and the international observers agree. The lines at the polling station stretch past the temple and down the road. You wait for three hours. The ballot has photographs of the candidates because many people cannot read. You mark your choice with a pencil. The mark is the first one you have ever made in a government document that was your own decision.',
    choices: null,
    effect: (p) => {
      p.m += 10;
      p.e += 3;
      p.addFlag('cambodia_voted_1993');
      p.setPolitical('centre');
      p.setMem('caUntacElection', true);
    },
  },

  {
    id: 'ca_eccc_trial',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.caEcccTrial &&
      G.character.country.name === 'Cambodia' &&
      G.flags.includes('khmer_rouge_survivor') &&
      G.currentYear >= 2006 &&
      G.age >= 40,
    text: 'The Extraordinary Chambers have begun proceedings against the surviving Khmer Rouge leadership. The court is in Phnom Penh. A legal team contacts you — they are gathering testimony from survivors. You would be one of many. The process is slow, your testimony would be one document among thousands, and the defendants are old men who may die before any verdict. Still, you are being asked.',
    choices: [
      {
        text: 'Testify',
        tag: 'principled',
        outcome: 'The deposition takes two days. You speak in Khmer and a translator renders it into English and French. You are thanked formally. The trial continues for years after you leave the building.',
        effect: (p) => { p.m -= 8; p.r -= 6; p.karma += 12; p.e += 4; p.addFlag('eccc_testimony'); p.setMem('caEcccTrial', true); },
      },
      {
        text: 'Decline — the process will not give you what you need',
        tag: null,
        outcome: 'You write to thank them and say no. What you need from the 1970s is not something a court can provide.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('caEcccTrial', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_cambodia_missing_generation',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.caMissingGeneration &&
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1982 && G.currentYear <= 2000 &&
      G.age >= 15,
    text: 'You notice it without being told. The teachers at the school are very young. The doctors at the hospital are very young. The engineers, the lawyers, the civil servants — an entire cohort in their forties and fifties is missing from every institution you walk into. The Khmer Rouge targeted the educated first. The country has been running on whoever was young enough to survive, ever since.',
    choices: null,
    effect: (p) => {
      p.e += 5;
      p.r += 6;
      p.addFlag('witnessed_missing_generation');
      p.setMem('caMissingGeneration', true);
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BANGLADESH
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ca_bangladesh_liberation_war',
    phase: null,
    weight: 5,
    when: (G) =>
      !G.mem?.bdLiberationWar &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear === 1971 &&
      G.age >= 4,
    text: 'On the 25th of March the army moves through Dhaka in the night. By morning you can hear what is happening at the university, at the Hindu neighbourhoods, at the police barracks. The Pakistani army calls it Operation Searchlight. The radio announces that order has been restored. The smoke over the old city contradicts the radio.',
    choices: [
      {
        text: 'Flee east toward the Indian border',
        tag: null,
        outcome: 'The road to India is thirty kilometres and takes four days. The camp on the other side has ten thousand people in it already. The war continues for nine months outside.',
        effect: (p) => { p.h -= 10; p.m -= 14; p.w -= 8; p.addFlag('liberation_war_refugee'); p.addFlag('liberation_war_generation'); p.setMem('bdLiberationWar', true); },
      },
      {
        text: 'Hide — stay in the city and wait',
        tag: null,
        outcome: 'You move between relatives\' houses. Some streets are safe on some days. The nine months are the longest of your life.',
        effect: (p) => { p.h -= 8; p.m -= 16; p.r += 8; p.addFlag('liberation_war_generation'); p.setMem('bdLiberationWar', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_bangladesh_liberation_victory',
    phase: null,
    weight: 5,
    when: (G) =>
      !G.mem?.bdLiberationVictory &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear === 1971 &&
      G.age >= 4 &&
      G.mem?.bdLiberationWar,
    text: 'On the 16th of December the Pakistani army surrenders to the Indian forces in Dhaka. Ninety-three thousand soldiers lay down their weapons. Bangladesh exists now. People come out of the houses and the camps and the hiding places and walk into the street. There is a sound the crowd makes that you have not heard before. A country is being born while you are standing in it.',
    choices: null,
    effect: (p) => {
      p.m += 16;
      p.addFlag('independence_generation_bd');
      p.setPolitical('left');
      p.setMem('bdLiberationVictory', true);
    },
  },

  {
    id: 'ca_bangladesh_flood_annual',
    phase: 'childhood',
    weight: 4,
    cooldown: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.ruralUrban === 'rural' &&
      G.currentYear <= 2050 &&
      G.age >= 5 && G.age <= 16,
    text: 'The river comes over the embankment in the third week of July. This is not a surprise — the rice stored on the raised shelf, the boat kept tied to the post by the house, the floor built two feet above the ground. What is stored high stays dry. What is stored low is gone. The water is in the house for nine days. You sleep on the shelf. The water recedes and leaves a layer of silt that is, your father says, what makes this land worth living on.',
    choices: null,
    effect: (p) => {
      p.h -= 4;
      p.m -= 5;
      p.addFlag('flood_generation');
    },
  },

  {
    id: 'ca_bangladesh_garment_worker',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.bdGarmentWorker &&
      G.character.country.name === 'Bangladesh' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1990 &&
      G.age >= 17 && G.age <= 30 &&
      !G.career,
    text: 'The factory is in Ashulia, forty minutes from the city on the bus you share with forty other women. The shift is twelve hours. You sew the same seam eight hundred times a day — a motion your hands learn without your mind. The wage is enough for your room, your meals, and a small amount to send home each month. You live with six other women from your district. For the first time in your life, no one is telling you when to sleep.',
    choices: [
      {
        text: 'Work the overtime — save faster',
        tag: null,
        outcome: 'The extra hours accumulate into savings. The cost is in your hands, which hurt by evening, and in the things you do not do because you are too tired.',
        effect: (p) => { p.mo += 800; p.h -= 5; p.m -= 4; p.addFlag('garment_worker'); p.setMem('bdGarmentWorker', true); },
      },
      {
        text: 'Work the standard shift — protect your health',
        tag: null,
        outcome: 'The savings come slower. The evenings are yours.',
        effect: (p) => { p.mo += 300; p.m += 3; p.addFlag('garment_worker'); p.setMem('bdGarmentWorker', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_bangladesh_rana_plaza',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.bdRanaPlaza &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.flags.includes('garment_worker') &&
      G.age >= 17,
    text: 'The Rana Plaza building in Savar has cracks in the walls. Workers reported it the day before. The managers say the building is fine and the shift must proceed. On the 24th of April the building falls. It takes seventeen seconds. 1,134 people die in the collapse. You know some of them — the woman who worked the line beside you, the one who always had biscuits in her bag. The floor supervisor who told everyone it was safe.',
    choices: [
      {
        text: 'You were inside when it collapsed',
        tag: null,
        outcome: 'You are pulled from the rubble after four hours. The recovery is physical and takes months. The other kind of recovery is ongoing.',
        effect: (p) => { p.h -= 22; p.m -= 20; p.r += 15; p.addFlag('rana_plaza_survivor'); p.setMem('bdRanaPlaza', true); },
      },
      {
        text: 'You saw the cracks the day before and did not go in',
        tag: null,
        outcome: 'You stayed home and watched it on television. You have thought about the people who went in every day since.',
        effect: (p) => { p.m -= 14; p.r += 12; p.karma += 6; p.addFlag('rana_plaza_witness'); p.setMem('bdRanaPlaza', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_bangladesh_cyclone',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.bdCyclone &&
      G.character.country.name === 'Bangladesh' &&
      G.age >= 6,
    text: (G) => {
      if (G.currentYear <= 1990) {
        return 'The cyclone makes landfall at night. The warning came six hours ago — not enough for everyone to reach a shelter, not enough for the boats to get to safety. The storm surge takes the coastal villages first. In the morning the radio lists the dead in the hundreds and then the thousands. The government response arrives two weeks later. The international response arrives when the photographers do.'
      }
      return 'The early warning system gives four days notice. The shelters along the coast fill in an orderly way. The cyclone strikes on a Tuesday morning and leaves by Thursday. The destruction is significant. The death toll is in the dozens, not the thousands. You grew up hearing about 1970, when 500,000 people died. This is not that.'
    },
    choices: null,
    effect: (p) => {
      p.h -= 8;
      p.m -= 10;
      p.addFlag('cyclone_survived');
      p.setMem('bdCyclone', true);
    },
  },

  {
    id: 'ca_bangladesh_microfinance',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.bdMicrofinance &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1990 &&
      G.age >= 20 && G.age <= 50 &&
      G.money < 2000,
    text: 'The loan officer from the Grameen group explains the terms: a small loan, repaid in weekly instalments at the group meeting. The group guarantees each other. If one member defaults, all members are responsible. The meeting is on Tuesdays. Your neighbours will know your repayment record. The loan is enough to buy a sewing machine, or a small stock of goods, or materials for the work you want to start.',
    choices: [
      {
        text: 'Take the loan',
        tag: null,
        outcome: 'The machine arrives. The repayment meetings begin. Tuesday mornings carry a specific weight for the next two years.',
        effect: (p) => { p.mo += 500; p.addFlag('microfinance_borrower'); p.setMem('bdMicrofinance', true); },
      },
      {
        text: 'Decline — the social pressure is not worth it',
        tag: null,
        outcome: 'You find another way forward, slower. The choice was the right one for you.',
        effect: (p) => { p.m += 3; p.setMem('bdMicrofinance', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_bangladesh_remittance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem?.bdRemittance &&
      G.character.country.name === 'Bangladesh' &&
      G.age >= 30 && G.age <= 60,
    text: 'Your brother has been in Riyadh for three years. The money he sends home arrives through the mobile banking service once a month — more reliable than the post, faster than a bank transfer. The amount is enough to build the extra room on the house, to pay the school fees for his daughter, to make some things possible that were not possible before. The phone calls are every two weeks. On the call he asks about people and places as if they are still exactly as he left them. He needs them to be.',
    choices: null,
    effect: (p) => {
      p.mo += 1200;
      p.m -= 4;
      p.r += 5;
      p.addFlag('remittance_family');
      p.setMem('bdRemittance', true);
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PAKISTAN
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ca_pakistan_muhajir_arrival',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem?.pkMuhajirArrival &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1947 && G.currentYear <= 1955 &&
      G.age >= 4,
    text: 'Your family came from Lucknow, or Agra, or Delhi. They arrived in Karachi in 1947 or 1948 with whatever they could carry across the border in a train that was not guaranteed to arrive. They gave up houses, businesses, graves. They were told Pakistan was for them — a homeland for Muslims. Karachi received them and then made clear that being Muslim was the smallest thing they had in common with the people already there. They are called *Muhajirs* — migrants — as if they had a choice.',
    choices: null,
    effect: (p) => {
      p.m -= 10;
      p.r += 8;
      p.e += 4;
      p.addFlag('muhajir_generation');
      p.setMem('pkMuhajirArrival', true);
    },
  },

  {
    id: 'ca_pakistan_east_wing_war',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.pkEastWingWar &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 1971 &&
      G.age >= 8,
    text: 'The radio says East Pakistan has been brought under control. The Awami League had won the election but the government in Islamabad refused to hand over power. Now there is an army operation. The radio calls it a restoration of order. Letters from relatives in Dhaka stopped arriving in April. Journalists are not being allowed in. What you hear in the radio and what you hear from people who have cousins there are two completely different accounts of what is happening.',
    choices: [
      {
        text: 'Believe the government account',
        tag: null,
        outcome: 'In December the army surrenders. Bangladesh is a country. The gap between what you were told and what happened stays with you.',
        effect: (p) => { p.m -= 8; p.r += 10; p.addFlag('partition_1971'); p.setMem('pkEastWingWar', true); },
      },
      {
        text: 'Trust what the letters and relatives suggest instead',
        tag: 'principled',
        outcome: 'You understand what is happening before the surrender confirms it. It is not a comfort to have been right.',
        effect: (p) => { p.m -= 10; p.r += 6; p.e += 4; p.addFlag('partition_1971'); p.setPolitical('dissident'); p.setMem('pkEastWingWar', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_zia_islamisation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.pkZiaIslamisation &&
      G.character.country.name === 'Pakistan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1978 && G.currentYear <= 1988 &&
      G.age >= 16,
    text: 'The Hudood ordinances came into effect in 1979. If you are raped, the legal burden to prove rape requires four Muslim male witnesses to the act. Without them, the report you file can be converted into an admission of unlawful sex. The law is in force now. You calibrate your movements accordingly — which streets, which times, which situations. The calibration is not paranoia. It is legal literacy.',
    choices: [
      {
        text: 'Adapt and continue',
        tag: null,
        outcome: 'The adaptation is exhausting in a way that has no single event attached to it. It is the accumulation of a thousand small adjustments.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('zia_generation'); p.addFlag('navigated_gender_law'); p.setMem('pkZiaIslamisation', true); },
      },
      {
        text: 'Join the Women\'s Action Forum to resist the ordinances',
        tag: 'principled',
        outcome: 'The WAF marches are broken up by police. The ordinances remain. You remain too — angrier, more precise about what you want changed.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 10; p.addFlag('zia_generation'); p.addFlag('political_aware'); p.setPolitical('left'); p.setMem('pkZiaIslamisation', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_blasphemy_law',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.pkBlasphemyLaw &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1990 &&
      G.age >= 20,
    text: 'A colleague at work has been accused of blasphemy. You do not know the details of the accusation — only that it was made by another colleague, and that since the accusation, the police have been involved and a crowd gathered outside the building on Tuesday. Courts in Pakistan have acquitted defendants on blasphemy charges before. Some of those judges have been killed afterward. The accused colleague has been in custody for eleven days.',
    choices: [
      {
        text: 'Say publicly that the accusation seems unjust',
        tag: 'principled',
        outcome: 'Your statement is noted. What follows is not direct consequence but a general cooling in how certain colleagues look at you.',
        effect: (p) => { p.m -= 8; p.karma += 10; p.s -= 5; p.addFlag('spoke_against_blasphemy'); p.setMem('pkBlasphemyLaw', true); },
      },
      {
        text: 'Say nothing — the situation is too dangerous',
        tag: null,
        outcome: 'Your silence is not agreement. But it is indistinguishable from agreement from the outside.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('learned_silence'); p.setMem('pkBlasphemyLaw', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_nuclear_test',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.pkNuclearTest &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 1998 &&
      G.age >= 10,
    text: 'On the 28th of May Pakistan detonates five nuclear devices under the Chagai Hills in Balochistan. The tests are a response to India\'s tests two weeks earlier. In Islamabad and Lahore people come into the streets. Sweets are distributed. The news anchors are crying. The United States imposes sanctions within two days — travel restrictions, export controls, loan suspensions. The celebrations and the sanctions arrive in the same week.',
    choices: [
      {
        text: 'Feel the national pride in the streets',
        tag: null,
        outcome: 'The pride is real and specific. What the bomb costs — the sanctions, the debt, the programmes that lose funding — arrives more slowly.',
        effect: (p) => { p.m += 8; p.addFlag('nuclear_pakistan_generation'); p.setMem('pkNuclearTest', true); },
      },
      {
        text: 'Stay home — the celebration feels wrong',
        tag: null,
        outcome: 'You watch it on television. The gap between what you feel and what the street feels is one you keep to yourself.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setPolitical('dissident'); p.setMem('pkNuclearTest', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_isi_shadow',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.pkIsiShadow &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1980 &&
      G.age >= 22 &&
      G.career &&
      (G.career.field === 'arts' || G.career.field === 'law' || G.career.field === 'education' || G.career.field === 'media' || G.career.field === 'social'),
    text: 'It is not dramatic. A colleague mentions, over tea, that someone came to ask about you — what you have been working on, who you meet with, what your opinions are on certain topics. No name given, government affiliation implied. Nothing illegal has been said. Nothing has been threatened. This is precisely the point: the conversation that never happened is the most effective kind.',
    choices: [
      {
        text: 'Continue your work without adjusting',
        tag: 'principled',
        outcome: 'The pressure is not removed by ignoring it. It becomes part of the air. You work in it as in any other condition.',
        effect: (p) => { p.m -= 6; p.karma += 6; p.addFlag('isi_monitored'); p.addFlag('authoritarian_childhood'); p.setMem('pkIsiShadow', true); },
      },
      {
        text: 'Edit what you produce — make it safer',
        tag: null,
        outcome: 'The work continues. It is not exactly the work you would have made. You tell yourself the difference is small.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('regime_self_censorship'); p.setMem('pkIsiShadow', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_karachi_violence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.pkKarachiViolence &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1985 && G.currentYear <= 1995 &&
      G.age >= 16 && G.age <= 40,
    text: 'Karachi is divided by neighbourhood in a way that is never written down. The MQM controls Liaquatabad and Orangi. The ANP areas are different. There are streets you take and streets you do not take, depending on the day and who has done what to whom. The shooting is not constant — that would be easier to understand. It is intermittent, which means every ordinary morning has a small calculation attached to it.',
    choices: [
      {
        text: 'Learn the geography and navigate carefully',
        tag: null,
        outcome: 'You know which bus routes changed this week and which areas to avoid after dark. The knowledge is exhausting to maintain.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.e += 3; p.addFlag('karachi_violence_generation'); p.setMem('pkKarachiViolence', true); },
      },
      {
        text: 'Stay inside as much as possible',
        tag: null,
        outcome: 'The apartment is safe. The years inside it are also small.',
        effect: (p) => { p.m -= 10; p.s -= 4; p.addFlag('karachi_violence_generation'); p.setMem('pkKarachiViolence', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_pakistan_flood_2010',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.pkFlood2010 &&
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 2010 && G.currentYear <= 2011 &&
      G.age >= 6,
    text: 'One-fifth of Pakistan is underwater. The Indus has overflowed its banks from Khyber Pakhtunkhwa down through Sindh. Twenty million people are displaced. The number is too large to hold. What you can hold is the specific: the road to your uncle\'s village is gone, not flooded but gone, washed out to a depth of two metres. The satellite phone contact from that district stops for eleven days.',
    choices: null,
    effect: (p) => {
      p.h -= 8;
      p.m -= 12;
      p.w -= 6;
      p.addFlag('flood_2010_generation');
      p.setMem('pkFlood2010', true);
    },
  },

  {
    id: 'ca_pakistan_arranged_meeting',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.pkArrangedMeeting &&
      G.character.country.name === 'Pakistan' &&
      !G.partner &&
      G.age >= 20 && G.age <= 35,
    text: 'Your parents have arranged for you to meet someone. The meeting takes place in your parents\' sitting room, with tea and a plate of biscuits that no one touches. The other person\'s family occupies one side of the room. Your family occupies the other. You and the other person sit near each other and are expected to find something to say. You have twenty minutes, approximately, before one family or the other will ask how everyone feels about proceedings.',
    choices: [
      {
        text: 'Engage genuinely — see what is there',
        tag: null,
        outcome: 'The conversation is awkward and then briefly real. Whether it becomes anything depends on what both families decide afterward, which is not entirely in your hands.',
        effect: (p) => { p.m += 5; p.s += 4; p.addFlag('attended_arranged_meeting'); p.setMem('pkArrangedMeeting', true); },
      },
      {
        text: 'Be polite but clear you are not interested',
        tag: null,
        outcome: 'The message is communicated through the careful language families use for these things. Your parents are not pleased. The matter is, for now, resolved.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('declined_arranged_match'); p.setMem('pkArrangedMeeting', true); },
      },
      {
        text: 'Go through the motions and defer the decision',
        tag: null,
        outcome: 'The meeting ends without a conclusion. Another meeting is proposed. The deferral has its own cost.',
        effect: (p) => { p.m -= 2; p.addFlag('attended_arranged_meeting'); p.setMem('pkArrangedMeeting', true); },
      },
    ],
    effect: null,
  },

]
