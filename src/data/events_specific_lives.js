// events_specific_lives.js
// Extreme specificity: events that could only fire for one precise combination
// of person, place, and time. Each one is a life no generic event can reach.
//
// Sections:
//   A. Inherited social position (caste, class, ethnicity as structure)
//   B. Women's lives with precision (specific country + era + legal context)
//   C. Labour at the granular level (specific work, specific body, specific wage)
//   D. Minority within majority (the other in the country you call home)
//   E. Religion at street level (the faith that organises the day, not the doctrine)
//   F. Pre-1940 texture (colonial, pre-electricity, the first industrials)
//   G. 2000s–2020s specific losses (the world after the promise)

export const SPECIFIC_LIFE_EVENTS = [

  // ══════════════════════════════════════════════════════════════════════════
  // A. INHERITED SOCIAL POSITION
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_dalit_water',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.casteSystem &&
      G.ethnicity === 'dalit' &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.sl_dalit_water,
    text: 'The handpump at the edge of the school compound is not for you. You have known this since before anyone said it aloud. There is another place — further away, near the back wall — and you go there. A teacher tells you this is temporary, that things are changing. You do not argue. You go to the back wall.',
    choices: null,
    effect: (p) => { p.setMem('sl_dalit_water', true); p.e += 1 },
  },

  {
    id: 'sl_dalit_temple',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.casteSystem &&
      G.ethnicity === 'dalit' &&
      G.age >= 12 && G.age <= 18 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_dalit_temple,
    text: 'The temple at the centre of the village has a step you are not supposed to cross. This is not written anywhere you have been shown. The priest does not look at you when you approach. The step is where you stop. The god inside is the same god everyone prays to. This has been explained to you and you have not found the explanation satisfying.',
    choices: null,
    effect: (p) => { p.setMem('sl_dalit_temple', true); p.m -= 3; p.addFlag('experienced_discrimination') },
  },

  {
    id: 'sl_dalit_forms',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.casteSystem &&
      G.ethnicity === 'dalit' &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.sl_dalit_forms,
    text: 'The government form has a box for caste. You write it. In this box you have been both the reason you were helped and the reason you were not helped, depending on the year and the person reading it. The box is neutral. What happens to the box is not neutral.',
    choices: null,
    effect: (p) => { p.setMem('sl_dalit_forms', true); p.e += 2 },
  },

  {
    id: 'sl_upper_caste_first_critique',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.casteSystem &&
      ['brahmin', 'kshatriya'].includes(G.ethnicity) &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.sl_ucc,
    text: 'Someone at college — a friend, a professor, a pamphlet left on the table — says the thing about caste that you have never had to think about because you were on the comfortable side of it. The argument is correct. You do not find this comfortable. The discomfort is useful if you let it be.',
    choices: null,
    effect: (p) => { p.setMem('sl_ucc', true); p.e += 2; p.karma += 1 },
  },

  {
    id: 'sl_colombia_strat',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sl_colstrat,
    text: 'Your stratificación number is on the utility bill. It is on the tax form. It determines what you pay for gas, for water, for electricity. The number is one, two, or three if you are poor. Four, five, six if you are not. The number is your address. The address is your number. The system was designed to protect the poor and it has also frozen them in place.',
    choices: null,
    effect: (p) => { p.setMem('sl_colstrat', true); p.e += 2 },
  },

  {
    id: 'sl_nepal_caste_untouchable',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.casteSystem &&
      G.ethnicity === 'dalit' &&
      G.age >= 7 && G.age <= 14 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_nepal_uc,
    text: 'You are a Dalit child in a village where this has meant the same things for four hundred years. You cannot enter certain houses. You cannot share food from the same vessel. The village festival happens around you rather than with you. You understand this is old and you understand it is supposed to be changing and you understand that the understanding does not change what happens on Tuesday.',
    choices: null,
    effect: (p) => { p.setMem('sl_nepal_uc', true); p.m -= 3; p.addFlag('experienced_discrimination') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // B. WOMEN'S LIVES WITH PRECISION
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_widow_india_rules',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.character.gender === 'female' &&
      G.flags.includes('widowed') &&
      G.age >= 22 && G.age <= 58 &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.sl_widow_india,
    text: 'After the cremation the bangles are removed. Someone else removes them. The sindoor is wiped from your parting. The white sari is waiting. You are not yet forty. The festivals you attended you will now attend from the edge. The colours that were yours are no longer yours. None of this was written down anywhere you were shown. It doesn\'t need to be written down.',
    choices: null,
    effect: (p) => { p.setMem('sl_widow_india', true); p.m -= 5; p.s -= 3 },
  },

  {
    id: 'sl_iran_hijab_colleague',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.character.gender === 'female' &&
      G.career?.id &&
      G.age >= 22 && G.age <= 45 &&
      G.currentYear >= 1981 && G.currentYear <= 2022 &&
      !G.mem?.sl_iran_hijab,
    text: 'The Gasht-e Ershad moves through the building on a Tuesday afternoon. Your colleague has a strand of hair visible beneath her hijab — the kind of thing that happens in an ordinary morning without meaning to. The inspector is moving toward her. You have one second.',
    choices: [
      {
        text: 'Reach over and adjust her scarf, as if helping',
        tag: 'protect',
        outcome: 'She looks at you for a moment without speaking. You both understand what just happened. Nothing is said about it, ever.',
        effect: (p) => { p.karma += 3; p.s += 2; p.setMem('sl_iran_hijab', true) },
      },
      {
        text: 'Look at your desk. Say nothing.',
        tag: 'self_preserve',
        outcome: 'The interview takes forty minutes. She returns to her desk pale. You do not look at each other the same way afterward.',
        effect: (p) => { p.karma -= 3; p.m -= 3; p.setMem('sl_iran_hijab', true) },
      },
    ],
  },

  {
    id: 'sl_afghan_girl_school_ban',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.character.gender === 'female' &&
      G.age >= 10 && G.age <= 16 &&
      (G.currentYear >= 1996 && G.currentYear <= 2001) &&
      !G.mem?.sl_afghan_school,
    text: 'The Taliban have closed the girls\' schools. Your textbooks are under the floorboards — your mother put them there without asking you. She says it will not last. You have been hearing this for a year. In the house of your neighbour, three doors down, the older girls have started gathering in the afternoons.',
    choices: [
      {
        text: 'Join the secret lessons — whatever knowledge you can hold, you hold',
        tag: 'defiant_learning',
        outcome: 'You learn in a circle on a floor, speaking in low voices, your books under a cloth if a knock comes. The knowledge accumulates in you. It has nowhere to go yet.',
        effect: (p) => { p.e += 4; p.m += 1; p.addFlag('afghan_girl_studied_secret'); p.setMem('sl_afghan_school', true) },
      },
      {
        text: 'Stay home. The risk is too high, the future too uncertain.',
        tag: 'survival',
        outcome: 'You learn to wait. The waiting is its own education — in patience, in the management of invisible hopes.',
        effect: (p) => { p.e -= 3; p.m -= 2; p.addFlag('afghan_girl_stopped_studying'); p.setMem('sl_afghan_school', true) },
      },
    ],
  },

  {
    id: 'sl_afghan_girl_echo',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('afghan_girl_studied_secret') &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.sl_afghan_echo,
    text: 'You use what you learned on the floor of your neighbour\'s house. The education that was forbidden is the education you have. It is not complete — it has gaps where the years went — but it is yours in a way that the official curriculum, when it came back, is not.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('sl_afghan_echo', true) },
  },

  {
    id: 'sl_romanian_decree_woman',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.character.gender === 'female' &&
      G.age >= 18 && G.age <= 45 &&
      G.currentYear >= 1967 && G.currentYear <= 1989 &&
      !G.mem?.sl_rom_decree,
    text: 'Decree 770 has been law for years. Abortion is illegal. Contraception is unavailable. Every workplace has mandatory gynaecological examinations for women under forty-five. The state has a theory about what your body is for. You live inside the theory, in the gap between what it says and what the days actually require.',
    choices: null,
    effect: (p) => { p.setMem('sl_rom_decree', true); p.m -= 3; p.h -= 2 },
  },

  {
    id: 'sl_saudi_guardian_permission',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.character.gender === 'female' &&
      G.age >= 18 && G.age <= 45 &&
      G.currentYear < 2019 &&
      !G.mem?.sl_saudi_grd,
    text: 'You need your father\'s signature. Or your brother\'s, or your husband\'s. To travel. To open the bank account. To check out of the hospital. Your male guardian is twenty-two and does not understand the form but he has to sign it before you can proceed. You wait. You have become very good at waiting.',
    choices: null,
    effect: (p) => { p.setMem('sl_saudi_grd', true); p.m -= 4; p.s -= 2 },
  },

  {
    id: 'sl_japan_ol_track',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.character.gender === 'female' &&
      G.age >= 20 && G.age <= 28 &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      !G.mem?.sl_jp_ol,
    text: 'The personnel manager explains, with all kindness, that there are two tracks for new employees. The career track is for the men. The general track — the OL track, office lady — is for the women. Tea service. Filing. Support. Your qualifications are identical to the man hired last week who is now on the career track. The manager does not see a contradiction.',
    choices: [
      {
        text: 'Accept the role. Fight from inside, over years.',
        tag: 'patience',
        outcome: 'You learn the company from the inside. Some things become possible. Some things do not become possible. You build what you can from where you are placed.',
        effect: (p) => { p.addFlag('japan_ol_track_accepted'); p.m -= 3; p.s += 2; p.setMem('sl_jp_ol', true) },
      },
      {
        text: 'Push back. Name what you are seeing.',
        tag: 'direct',
        outcome: 'The manager\'s expression does not change. You are hired anyway. You are watched differently than the others. Some colleagues respect this. Others don\'t.',
        effect: (p) => { p.addFlag('japan_career_fought'); p.m += 2; p.s -= 2; p.karma += 2; p.setMem('sl_jp_ol', true) },
      },
    ],
  },

  {
    id: 'sl_china_daughter_one_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.character.gender === 'female' &&
      G.age >= 8 && G.age <= 16 &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1980 && G.currentYear <= 2000 &&
      !G.mem?.sl_cn_daughter,
    text: 'You are the daughter in a family that was supposed to have a son. This is not said aloud. It doesn\'t need to be said aloud. You can read it in certain moments — when the village cadre asks about future plans, when your grandmother goes quiet at particular meals, when your father works the field with the posture of a man carrying an argument with himself. You are loved. The love exists alongside the arithmetic.',
    choices: null,
    effect: (p) => { p.setMem('sl_cn_daughter', true); p.m -= 2; p.e += 2 },
  },

  {
    id: 'sl_maquila_body',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.character.gender === 'female' &&
      G.age >= 16 && G.age <= 35 &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.sl_maquila,
    text: 'The maquiladora is a nine-hour shift at a station that does the same motion nine hundred times. Your hands know the motion before your mind does. At the end of the shift your wrists ache in a way that is becoming less temporary. The bus home takes forty minutes. You eat and sleep and come back. The wage is enough for the rent and almost enough for the rest.',
    choices: null,
    effect: (p) => { p.setMem('sl_maquila', true); p.mo += 200; p.h -= 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // C. LABOUR AT THE GRANULAR LEVEL
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_dhaka_garment_floor',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.character.gender === 'female' &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.sl_dhaka_gar,
    text: 'The factory floor is loud in a way that stops being loud after a week and becomes the texture of the day. Your station produces 1,200 button-holes in a ten-hour shift. The target is posted on the wall. The supervisor does not walk past your station when you are behind. He walks past when you are on pace. You send money home on the fifteenth. It arrives before the twentieth. This is the transaction the family is built around.',
    choices: null,
    effect: (p) => { p.setMem('sl_dhaka_gar', true); p.mo += 150; p.h -= 2; p.addFlag('dhaka_garment_worked') },
  },

  {
    id: 'sl_rana_plaza_aftermath',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('dhaka_garment_worked') &&
      G.currentYear >= 2013 && G.currentYear <= 2017 &&
      !G.mem?.sl_rana,
    text: 'After Rana Plaza — 1,134 dead, the building that should not have had a factory in it — the buyers send auditors. The auditors check the exits. The exits are now marked. Your wage is still the same. The label on the shirt still does not carry your name.',
    choices: null,
    effect: (p) => { p.setMem('sl_rana', true); p.m -= 3; p.e += 2; p.karma += 1 },
  },

  {
    id: 'sl_copperbelt_miner',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.character.gender === 'male' &&
      G.age >= 20 && G.age <= 50 &&
      !G.mem?.sl_copper,
    text: 'You go down before it is light and come up after it is dark again. Underground has its own climate — warmer the deeper you go, a particular smell of blasted rock and diesel and your own sweat that your wife says she can smell before you walk through the door. The copper you mine ends up in electronics you will never own. The wage is better than farming. The body has opinions about the trade.',
    choices: null,
    effect: (p) => { p.setMem('sl_copper', true); p.mo += 400; p.h -= 3 },
  },

  {
    id: 'sl_uae_construction_heat',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.character.country.archetype === 'wealthy_gulf' ||
       ['UAE', 'Saudi Arabia', 'Qatar'].includes(G.character.country.name)) &&
      G.residencyStatus === 'work_visa' &&
      G.age >= 20 && G.age <= 45 &&
      G.currentYear >= 1985 &&
      !G.mem?.sl_uae_con,
    text: 'The scaffolding at fifty metres in July. The heat index is 52 degrees. Work is suspended between noon and three by regulation; by four it resumes. You are building something — a tower, a hotel, a mall — that you will never enter as a guest. Your passport is with the agency. You will get it back when the contract ends. You send most of what you earn home. The rest covers the dormitory bed and the canteen meals.',
    choices: null,
    effect: (p) => { p.setMem('sl_uae_con', true); p.mo += 600; p.h -= 4; p.m -= 3 },
  },

  {
    id: 'sl_domestic_gulf_worker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('ofw_gulf') &&
      G.character.gender === 'female' &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.sl_gulf_dom,
    text: 'One day off a week, if the family allows it. Your employer is your sponsor and your visa is through them and your movements require their permission. You clean what cannot be left dirty and cook what must be cooked and care for children who call you by your first name while their parents call you the maid. You video-call your own children on Sundays. You are doing this for your children. You do not tell your children what it costs.',
    choices: null,
    effect: (p) => { p.setMem('sl_gulf_dom', true); p.mo += 350; p.m -= 5 },
  },

  {
    id: 'sl_sugarcane_brazil',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.age >= 18 && G.age <= 45 &&
      G.stats.wealth < 30 &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      !G.mem?.sl_cana,
    text: 'The harvest season is six months. The machete cut: twenty-five thousand cuts a day for a cutter at target rate. The sugar goes to the ethanol plant, some to the refinery. Your back knows the geometry of the stalk cut at the angle that wastes nothing. The afternoon is the hardest. By September you have made enough to carry the rest of the year. By March you are counting.',
    choices: null,
    effect: (p) => { p.setMem('sl_cana', true); p.mo += 800; p.h -= 4 },
  },

  {
    id: 'sl_china_996_worker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.career?.field === 'technology' &&
      G.age >= 22 && G.age <= 35 &&
      G.currentYear >= 2012 && G.currentYear <= 2023 &&
      !G.mem?.sl_996,
    text: '9am to 9pm, six days a week: the unofficial contract of the tech sector that was never written in any document you signed. The ping messages come after midnight. The project reviews are on Saturday. The salary is high enough that the arithmetic looks good until you price in the hours. Your colleagues are also doing this. The chat groups call it involution — competition that costs everyone and produces nothing except the continuation of the competition.',
    choices: [
      {
        text: 'Do what it takes. The opportunity is real and will not last.',
        tag: 'push_through',
        outcome: 'You deliver. The promotion comes. The hours do not decrease after the promotion.',
        effect: (p) => { p.mo += 2000; p.h -= 5; p.m -= 3; p.w += 5; p.setMem('sl_996', true) },
      },
      {
        text: '"Tang ping." Lie flat. Do the minimum. Protect the rest of the life.',
        tag: 'resist',
        outcome: 'The manager notices. Some colleagues say nothing to your face and something different in the group chat. The hours you kept have other uses. You find them.',
        effect: (p) => { p.m += 4; p.h += 3; p.w -= 3; p.karma += 2; p.setMem('sl_996', true) },
      },
    ],
  },

  {
    id: 'sl_gig_nairobi',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['Kenya', 'Nigeria'].includes(G.character.country.name) &&
      G.age >= 18 && G.age <= 32 &&
      G.currentYear >= 2016 &&
      !G.mem?.sl_gig_nai,
    text: 'The app assigns the next delivery. The rating system means the customer is always right even when the customer is incorrect about the address and gives you a three-star rating for a street that doesn\'t exist on any map you have. You own the bike. You own the fuel. The platform takes twenty percent. The platform calls you a partner. In partnerships, both parties have somewhere to sit at the table. You have not found the seat.',
    choices: null,
    effect: (p) => { p.setMem('sl_gig_nai', true); p.mo += 200; p.e += 2 },
  },

  {
    id: 'sl_uk_foodbank',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.money < 500 &&
      G.age >= 20 && G.age <= 60 &&
      G.currentYear >= 2010 &&
      !G.mem?.sl_uk_food,
    text: 'The foodbank is in the back of a church hall on Tuesdays and Thursdays, eleven to one. You bring the referral slip from the GP. The volunteers are kind in the particular way that people are kind when they understand that the dignity question is real and they are trying not to add to it. You take what is in the bag. You do not look at what is in the bag until you get home. At home you find tinned tomatoes, pasta, a small jar of coffee, a chocolate biscuit. The chocolate biscuit is an extravagance from someone\'s calculation.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_food', true); p.mo += 60; p.m -= 4; p.karma += 1 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // D. MINORITY WITHIN MAJORITY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_coptic_church_permit',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.ethnicity === 'coptic_egyptian' &&
      G.age >= 30 && G.age <= 65 &&
      G.currentYear >= 1950 && G.currentYear <= 2016 &&
      !G.mem?.sl_coptic,
    text: 'The church roof needs repair. To repair it requires a permit. The permit requires presidential approval — not just a local official, presidential approval — because the law that governs church construction and repair was written in the nineteenth century and has not been revisited in the ways that matter. The application has been in for sixteen months.',
    choices: [
      {
        text: 'Keep pushing. Work every connection in the community to move it forward.',
        tag: 'persist',
        outcome: 'After three years, the permit arrives. The roof is repaired. The process has cost more than the repair.',
        effect: (p) => { p.setMem('sl_coptic', true); p.m += 2; p.s += 2; p.addFlag('coptic_fought_permit') },
      },
      {
        text: 'Repair what you can without the permit and accept the risk.',
        tag: 'pragmatic',
        outcome: 'The roof holds. Nothing happens this time. The risk is always there.',
        effect: (p) => { p.setMem('sl_coptic', true); p.karma += 1; p.m += 1 },
      },
    ],
  },

  {
    id: 'sl_hazara_checkpoint',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.ethnicity === 'hazara' &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem?.sl_haz_check,
    text: 'The checkpoint is manned by people who are not Hazara. Your face tells them before you speak. You have Mongoloid features — the specific physical inheritance of a Central Asian ancestry that has made you identifiable for centuries, and in certain political moments has made you a target for that identification. You answer the questions. You do not look at your feet. Looking at your feet is the wrong thing to do. You have learned what the right thing to do is.',
    choices: null,
    effect: (p) => { p.setMem('sl_haz_check', true); p.m -= 4; p.e += 2 },
  },

  {
    id: 'sl_karen_displacement',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.ethnicity === 'karen' &&
      G.age >= 8 && G.age <= 18 &&
      G.currentYear >= 1975 && G.currentYear <= 2021 &&
      !G.mem?.sl_karen_disp,
    text: 'The Tatmadaw has been burning villages in Karen State since before you were born. The cycle you have known is: some months of ordinary life, then a sweep, then movement into the forest or the river camps or across the border into Thailand. Your family knows which route. The knowledge of the route is a form of inheritance.',
    choices: [
      {
        text: 'Your family decides to cross into Thailand. The camp at Mae La is safer.',
        tag: 'flee',
        outcome: 'The camp is safer in the narrow definition of the word. It is also a camp. You will spend years inside the distinction.',
        effect: (p) => { p.addFlag('karen_displaced'); p.setMem('sl_karen_disp', true); p.m -= 3; p.setResidency('refugee_status') },
      },
      {
        text: 'Your family stays. The forest, the familiar hills, the knowledge of the land.',
        tag: 'stay',
        outcome: 'Some families stay and some do not. The ones who went are in a camp and the ones who stayed are in the forest. Neither choice was safe. Both were chosen.',
        effect: (p) => { p.setMem('sl_karen_disp', true); p.m -= 2; p.h -= 2 },
      },
    ],
  },

  {
    id: 'sl_karen_camp_years',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.flags.includes('karen_displaced') &&
      G.age >= 12 && G.age <= 22 &&
      !G.mem?.sl_karen_camp,
    text: 'Mae La camp has been here since 1984. You were born in it or you arrived in it and either way it is what you know. The schools are the churches and the NGO buildings. The teachers are refugees who became teachers because someone had to. The future is a complicated question when the address on the question is a camp.',
    choices: null,
    effect: (p) => { p.setMem('sl_karen_camp', true); p.e += 2; p.m -= 3 },
  },

  {
    id: 'sl_soviet_jew_emigration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.religion === 'jewish' &&
      G.age >= 20 && G.age <= 45 &&
      G.currentYear >= 1970 && G.currentYear <= 1991 &&
      !G.mem?.sl_sov_jew,
    text: 'The OVIR office on Ulitsa Chernyakhova processes the applications for exit visas. You have been told the process takes six months. It takes eighteen. During the eighteen months you are a refusenik — applied and not yet permitted — which means your clearance is gone and certain jobs are unavailable and certain people stop returning calls. The question being tested is whether you will withdraw the application.',
    choices: [
      {
        text: 'Hold the application. Outlast the pressure.',
        tag: 'persist',
        outcome: 'The visa comes. The preparation for leaving takes four more months. The leaving is real and permanent.',
        effect: (p) => { p.addFlag('refusenik_applied'); p.addFlag('emigrated'); p.m -= 2; p.setMem('sl_sov_jew', true); p.setResidency('work_visa') },
      },
      {
        text: 'Withdraw the application. Reconstruct what the process cost.',
        tag: 'stay',
        outcome: 'The clearance returns slowly. Some things are never quite the same. You are still here, which has costs and which also has a life inside it.',
        effect: (p) => { p.addFlag('refusenik_stayed'); p.m -= 4; p.setMem('sl_sov_jew', true) },
      },
    ],
  },

  {
    id: 'sl_igbo_after_66',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.ethnicity === 'igbo' &&
      G.age >= 15 && G.age <= 40 &&
      G.currentYear >= 1966 && G.currentYear <= 1972 &&
      !G.mem?.sl_igbo_66,
    text: 'After the September massacres in the north — thirty thousand dead, the estimate that is probably low — the Igbo community in Kano, in Kaduna, in Zaria is not the same community. The people who survived came south. Some of them were your people. The question that follows you for the rest of this decade is whether you trust the Nigerian project in any of its forms.',
    choices: [
      {
        text: 'Go south. The north is no longer safe and you know it.',
        tag: 'leave',
        outcome: 'You rebuild in the east. The Biafra that follows is its own catastrophe. You were already moving before the war named itself.',
        effect: (p) => { p.addFlag('igbo_fled_north'); p.m -= 4; p.setMem('sl_igbo_66', true) },
      },
      {
        text: 'Stay. Retreat to the Igbo enclave in the city. Wait to see what the country decides to be.',
        tag: 'stay',
        outcome: 'Some stay and some do not. You are in the ones who stayed. The country\'s decision, when it comes, arrives as a war.',
        effect: (p) => { p.addFlag('igbo_stayed_north'); p.m -= 3; p.h -= 2; p.setMem('sl_igbo_66', true) },
      },
    ],
  },

  {
    id: 'sl_christian_pakistan_blasphemy',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      ['christian_protestant', 'christian_catholic'].includes(G.religion) &&
      G.age >= 20 && G.age <= 60 &&
      G.currentYear >= 1986 &&
      !G.mem?.sl_pak_chr,
    text: 'The blasphemy law has been used against a Christian in your district this year. This is not unusual. What is unusual is the neighbour who tells you about it in the tone of someone delivering a warning. You have lived here for thirty years. Your father built this house. The law itself is not the whole of the danger; the danger is also what the law permits others to do with an accusation.',
    choices: null,
    effect: (p) => { p.setMem('sl_pak_chr', true); p.m -= 4; p.s -= 2 },
  },

  {
    id: 'sl_shia_sunni_context',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.religion === 'muslim_shia' &&
      ['Pakistan', 'Saudi Arabia', 'Bahrain', 'Iraq'].includes(G.character.country.name) &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sl_shia,
    text: 'The Ashura procession in this city has been attacked before. Not this year, but before — and the before is recent enough that the before is part of the preparations. The flagellants, the women in black, the speakers with the amplifiers: everything is done in awareness of who is watching and what the watching has meant in recent memory. You are praying in a way that people outside the faith do not understand and that people inside a different sect of the faith regard as a provocation. You are praying.',
    choices: null,
    effect: (p) => { p.setMem('sl_shia', true); p.m += 2; p.e += 1 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // E. RELIGION AT STREET LEVEL
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_ramadan_poor_cairo',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      ['muslim', 'muslim_sunni'].includes(G.religion) &&
      G.money < 800 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.sl_ramadan_cai,
    text: 'Ramadan in a poor household in Cairo. The smell of the street at iftar time — everyone cooking the same things at the same moment — is specific to this city and this month. Your mother has spent the budget for the week on the iftar meal for tonight. The logic is sound: the day\'s hunger is broken together and that is the real meal. The food is not surplus. The sharing is the point.',
    choices: null,
    effect: (p) => { p.setMem('sl_ramadan_cai', true); p.m += 4; p.karma += 2 },
  },

  {
    id: 'sl_orthodox_christmas_secret',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.religion === 'orthodox_christian' &&
      G.currentYear >= 1945 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.sl_orth_xmas,
    text: 'Christmas is not Christmas. It is January 7th, the Orthodox calendar, and it is celebrated at home in a register below official notice. Your grandmother puts the icon back on the wall for this week only. The Kolyadky songs happen in the kitchen with the door closed. The state has decided religion is backward and the family has decided the state is not invited to this particular evening.',
    choices: null,
    effect: (p) => { p.setMem('sl_orth_xmas', true); p.m += 3; p.karma += 1 },
  },

  {
    id: 'sl_buddhist_merit_daily',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['Cambodia', 'Thailand', 'Myanmar', 'Laos'].includes(G.character.country.name) &&
      G.religion === 'buddhist' &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.sl_bud_merit,
    text: 'Every morning before school you go with your mother to the wat. The monks pass in single file, eyes down, bowls extended, feet bare on the path. Your mother places rice in the bowl. This is not a special occasion. This is Tuesday. This is the merit that accumulates and the debt that is repaid and the continuity that makes the day a day and the week a week. You carry the extra rice container without being asked.',
    choices: null,
    effect: (p) => { p.setMem('sl_bud_merit', true); p.m += 2; p.karma += 2 },
  },

  {
    id: 'sl_evangelical_tithe_brazil',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      ['christian_pentecostal', 'christian_evangelical'].includes(G.religion) &&
      G.age >= 20 && G.age <= 45 &&
      !G.mem?.sl_evang,
    text: 'The Universal Church has twenty-five thousand seats and fills them on Sunday. The sermon ends with the offering, which is not small — ten percent of what you make, and the pastor explains again why the ten percent now produces abundance later. You tithe because the church is where the community is and the credit network and the mutual aid and the Saturday night that is safer than the street. The theology and the sociology are the same thing here.',
    choices: null,
    effect: (p) => { p.setMem('sl_evang', true); p.mo -= 100; p.m += 3; p.s += 2 },
  },

  {
    id: 'sl_yoruba_dual_faith',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.ethnicity === 'yoruba' &&
      ['christian_protestant', 'christian_evangelical', 'christian_pentecostal'].includes(G.religion) &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.sl_yoruba_dual,
    text: 'You are a Christian in the Baptist tradition and you are also a Yoruba person in the tradition of Yoruba religion and these are not, in the actual practice of your life, contradictions. The agbo — the herbal medicine your grandmother makes for the children — is Yoruba medicine. The church on Sunday morning is the church. The orisa have not been addressed directly in your household for two generations. But the Yoruba understanding of what the world is and how forces move within it is not absent from how you think about things. This is not hypocrisy. This is a person.',
    choices: null,
    effect: (p) => { p.setMem('sl_yoruba_dual', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'sl_india_village_festival',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.religion === 'hindu' &&
      G.ruralUrban === 'rural' &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.sl_india_fest,
    text: 'The festivals are the structure of the year. Not the calendar year — the ritual year, which begins differently and has its own logic. Holi means the cold is ending. Diwali means the rabi crop is in and the accounts are being settled. The fair that comes after the harvest has a particular smell — jalebi and diesel and the powder from the sahara rides — that you will recognise for the rest of your life in any city on any continent.',
    choices: null,
    effect: (p) => { p.setMem('sl_india_fest', true); p.m += 3 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // F. PRE-1940 TEXTURE
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_colonial_hut_tax',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'subsaharan' &&
      G.age >= 18 && G.age <= 45 &&
      G.currentYear >= 1900 && G.currentYear <= 1960 &&
      !G.mem?.sl_hut_tax,
    text: 'The hut tax requires cash. Cash requires wage labour. Wage labour requires leaving the village and working for a European employer for part of the year. The logic of this is complete: the tax produces the labour that the mine or the farm or the railway requires. You understand this logic as clearly as anyone. You pay the tax. You go to the mine. You come back.',
    choices: null,
    effect: (p) => { p.setMem('sl_hut_tax', true); p.m -= 3; p.e += 2 },
  },

  {
    id: 'sl_partition_village_split',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      ['India', 'Pakistan'].includes(G.character.country.name) &&
      G.age >= 10 && G.age <= 55 &&
      G.currentYear >= 1947 && G.currentYear <= 1952 &&
      !G.mem?.sl_part_vil,
    text: 'Your village is on the right side of the line they drew. Your neighbour\'s village — four kilometres away, where you bought grain at their market and your cousin\'s wife is from — is now in the other country. The line passes through a field that has been farmed continuously for three hundred years. You and the farmer who works it will not see each other again, which is not a fact that the men who drew the line considered worth noting.',
    choices: null,
    effect: (p) => { p.setMem('sl_part_vil', true); p.m -= 5; p.e += 2; p.addFlag('partition_generation') },
  },

  {
    id: 'sl_dust_bowl_farm',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1930 && G.currentYear <= 1940 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.sl_dust_bowl,
    text: 'The soil is moving. This is the correct description of what is happening — the soil is lifting into the air and moving east in walls sixty metres high that turn the afternoon into night at two in the afternoon. You wet the rags and put them in the door frames. The cattle turned south three days ago. The neighbours\' place is empty. The question is whether the farm can hold past the summer, and the summer is not giving any indication that it intends to cooperate.',
    choices: null,
    effect: (p) => { p.setMem('sl_dust_bowl', true); p.m -= 4; p.h -= 2; p.mo -= 200 },
  },

  {
    id: 'sl_jewish_shtetl',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['Poland', 'Ukraine', 'Belarus', 'Romania', 'Hungary'].includes(G.character.country.name) &&
      G.religion === 'jewish' &&
      G.currentYear >= 1900 && G.currentYear <= 1938 &&
      G.age >= 7 && G.age <= 15 &&
      !G.mem?.sl_shtetl,
    text: 'The shtetl is the whole world, and the world is mostly the shtetl. The Yiddish news comes by horse-cart. The rabbi\'s ruling on Thursday is still being discussed on Sunday. Your grandfather makes boots for the goyim who do not speak to him on the street and pay him on Friday because Saturday is the Sabbath. There is news from the cities — some of it exciting, some of it frightening — about Jews who have stopped being like you and have become something else entirely. You are still deciding what you think about this.',
    choices: null,
    effect: (p) => { p.setMem('sl_shtetl', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'sl_china_footbinding',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.character.gender === 'female' &&
      (G.currentYear - G.age) < 1920 &&
      G.age >= 50 &&
      !G.mem?.sl_footbinding,
    text: 'Your feet were bound at five. The binding was removed — eventually, when the practice was prohibited — but the bones had already done what bones do to accommodate a constraint applied during growth. You walk with the gait you have. You did not choose it. It was chosen for the person you were going to become, for reasons that were about marriageability in a world that has since reorganised itself. The world reorganised. Your feet did not.',
    choices: null,
    effect: (p) => { p.setMem('sl_footbinding', true); p.h -= 3; p.m -= 2; p.e += 3 },
  },

  {
    id: 'sl_early_industrial_body',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1870 && G.currentYear <= 1930 &&
      G.age >= 14 && G.age <= 40 &&
      G.stats.wealth < 35 &&
      !G.mem?.sl_early_ind,
    text: 'The factory is twelve hours. The factory before labour law was thirteen or fourteen. The noise is permanent — you have adjusted to it the way you adjust to bad weather — but the cotton dust or the coal dust or the metal shavings are something the lungs do not adjust to, they accumulate. Your father had the cough at forty-two. His father had it at thirty-eight. The progression has a direction.',
    choices: null,
    effect: (p) => { p.setMem('sl_early_ind', true); p.h -= 3; p.mo += 100 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // G. 2000s–2020s SPECIFIC LOSSES
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_venezuela_professional_collapse',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.career?.id &&
      G.age >= 25 && G.age <= 55 &&
      G.currentYear >= 2014 && G.currentYear <= 2022 &&
      !G.mem?.sl_vzla_prof,
    text: 'Your salary is twelve dollars a month. This is the official salary for a hospital physician in Venezuela in this year. The black market exchange gives you more if you have dollars from outside. You do not have dollars from outside. The pharmacy you send your patients to has three of the twelve medications they require. Two of your colleagues left last year for Colombia; one for Spain; one for Miami. Each time, they explained and you understood. Each time, you stayed. The staying requires an explanation too, which you are still working on.',
    choices: [
      {
        text: 'Arrange the exit. The patients you cannot treat need you nowhere. The ones somewhere else need someone.',
        tag: 'emigrate',
        outcome: 'The process takes eight months. The country you arrive in is a different country. The salary is twenty times. You think about what the twenty times means every day for a year.',
        effect: (p) => { p.addFlag('emigrated'); p.mo += 3000; p.m -= 4; p.setMem('sl_vzla_prof', true) },
      },
      {
        text: 'Stay. Someone has to be here. The patients who cannot emigrate need a doctor who also cannot leave.',
        tag: 'stay',
        outcome: 'You stay. The conditions do not improve. Your patients know you stayed. That is something that has no economic value and considerable moral weight.',
        effect: (p) => { p.addFlag('venezuela_stayed_professional'); p.karma += 5; p.m += 2; p.h -= 3; p.setMem('sl_vzla_prof', true) },
      },
    ],
  },

  {
    id: 'sl_philippines_typhoon_after',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 18 && G.age <= 60 &&
      G.currentYear >= 2014 && G.currentYear <= 2019 &&
      G.flags.includes('typhoon_bad_year') &&
      !G.mem?.sl_haiyan_after,
    text: 'The international aid came for six months and then found the next disaster. The USAID tents are still up in some places, faded from blue to grey. Your house was not rebuilt by the government programme — you were on the wrong list, or the list was wrong, or the programme ended. You rebuilt most of it yourself with money borrowed from a cousin in Riyadh. The roof is corrugated iron, same as before. Different sheets. The typhoon season begins in June.',
    choices: null,
    effect: (p) => { p.setMem('sl_haiyan_after', true); p.m -= 3; p.e += 2 },
  },

  {
    id: 'sl_us_opioid_town',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ruralUrban !== 'urban' &&
      G.age >= 25 && G.age <= 55 &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      !G.mem?.sl_opioid,
    text: 'The pharmacy on Main Street fills more oxycodone prescriptions than any pharmacy in the county, which is a county with a population of eleven thousand people. You know two people who are dead. You know four people who are not dead but are somewhere inside the between. The Suboxone clinic opened last year in the old RadioShack. The waiting list is six weeks. The funerals are not six weeks apart.',
    choices: null,
    effect: (p) => { p.setMem('sl_opioid', true); p.m -= 5; p.e += 2 },
  },

  {
    id: 'sl_zimbabwe_second_collapse',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.age >= 18 && G.age <= 40 &&
      G.currentYear >= 2019 && G.currentYear <= 2023 &&
      !G.mem?.sl_zim2,
    text: 'The RTGS dollar is worth what the government says it is worth and also worth what the market says it is worth and these two numbers are not the same number. Your parents went through this in 2008 and described it in the past tense as a horror. You are now living the horror in what appears to be a different format with the same essential logic. Your salary was enough in January. It is not enough in July. This is not because the prices changed. It is because the money changed.',
    choices: null,
    effect: (p) => { p.setMem('sl_zim2', true); p.m -= 4; p.e += 2 },
  },

  {
    id: 'sl_sa_loadshedding',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.age >= 20 && G.age <= 65 &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      !G.mem?.sl_loadshed,
    text: 'Stage 6 means twelve hours without power a day. The schedule is on the app. You plan the cooking and the phone charging around the schedule. The small businesses in your neighbourhood close the hours they cannot operate; some close permanently. Eskom has been failing since the 1990s in a slow motion that has now arrived at velocity. The inverter cost R18,000 and is now the most important object in the house.',
    choices: null,
    effect: (p) => { p.setMem('sl_loadshed', true); p.m -= 3; p.mo -= 500; p.e += 1 },
  },

  {
    id: 'sl_china_zero_covid',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.age >= 18 && G.age <= 60 &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      !G.mem?.sl_zero_covid,
    text: 'The lockdown in Shanghai is not the two weeks the notice said. It is seventy-five days. Your compound is sealed. The food deliveries are managed by the neighbourhood committee. Your neighbour in 12B has a cat; pets were removed in April and he did not allow the removal. You can hear the cat. The compound chat group has 847 messages today, mostly about the food delivery and partly about a man three buildings over whose medication ran out on the seventeenth. The medication is insulin.',
    choices: [
      {
        text: 'Organise the group to get the insulin through. Someone will know someone.',
        tag: 'community',
        outcome: 'It takes eleven messages and two hours and a contact outside the compound with a delivery pass. The insulin arrives. The neighbourhood committee is not officially aware this happened.',
        effect: (p) => { p.setMem('sl_zero_covid', true); p.karma += 4; p.m += 2; p.s += 2 },
      },
      {
        text: 'Report the situation to the committee and let the official system handle it.',
        tag: 'official',
        outcome: 'The committee acknowledges the situation. The insulin takes three more days. The man is fine but the three days were uncertain.',
        effect: (p) => { p.setMem('sl_zero_covid', true); p.m -= 2 },
      },
    ],
  },

  {
    id: 'sl_uk_austerity_library',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.age >= 25 && G.age <= 65 &&
      G.currentYear >= 2011 && G.currentYear <= 2020 &&
      !G.mem?.sl_uk_lib,
    text: 'The council has voted to close the library. The petition had four hundred signatures. The councillor who represents this ward explained that the decision was difficult and that difficult decisions were sometimes necessary. The library was built in 1908 with Carnegie money. It has never not been open. The building will become, the plan says, affordable housing — the phrase that appears in plans and in completions in different proportions.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_lib', true); p.m -= 3; p.e += 1; p.karma += 1 },
  },

  {
    id: 'sl_syria_returned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Syria' &&
      G.flags.includes('emigrated') &&
      G.age >= 25 && G.age <= 60 &&
      G.currentYear >= 2018 &&
      !G.mem?.sl_syr_return,
    text: 'You came back to see the house. The house is not the house. The wall you are looking at is your wall and also not your wall — the geometry is right, the door is in the same place, but someone else lived here during the years and what they left behind is a different ruin from the ruin the bombing made. You stand in the kitchen. The kitchen is the room that is most wrong. Everything in it is from a life you don\'t know.',
    choices: null,
    effect: (p) => { p.setMem('sl_syr_return', true); p.m -= 6; p.e += 2 },
  },
]
