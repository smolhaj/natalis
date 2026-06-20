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

  // ══════════════════════════════════════════════════════════════════════════
  // H. LGBTQ LIVES AT SPECIFIC LEGAL MOMENTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_uk_section28',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1988 && G.currentYear <= 2003 &&
      G.age >= 13 && G.age <= 18 &&
      G.flags.includes('questioning_sexuality') &&
      !G.mem?.sl_s28,
    text: 'Section 28 says the local authority shall not intentionally promote homosexuality or publish material with the intention of promoting homosexuality as a pretended family relationship. You found this in the library. The librarian is a woman you have always liked. She saw you reading it and said nothing and put another book on the shelf beside you. You read the first paragraph of that one too.',
    choices: null,
    effect: (p) => { p.setMem('sl_s28', true); p.m -= 4; p.e += 2 },
  },

  {
    id: 'sl_russia_gay_propaganda',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2013 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('questioning_sexuality') &&
      !G.mem?.sl_ru_prop,
    text: 'The law against gay propaganda to minors passed in June. You are not a minor. The law does not apply to you technically. The effect of the law is not technical. Your friends from the club have stopped posting. One has left for Amsterdam. You delete the photos from your phone not because you are afraid of the specific law but because the specific law clarifies what was already true: you are in a country that has decided.',
    choices: [
      {
        text: 'Stay, and find the people who stayed',
        tag: 'stay',
        outcome: 'The community goes underground in a different way — not hiding exactly, but knowing who to trust and calibrating for it. You stay inside the calibration.',
        effect: (p) => { p.s += 2; p.m -= 3; p.addFlag('lgbtq_lived_underground'); p.setMem('sl_ru_prop', true) },
      },
      {
        text: 'Begin making the calculations for leaving',
        tag: 'leave',
        outcome: 'The visa, the city, the job offer that is also an exit. It takes two years. The country you land in does not have a law about this. You spend a month not believing it.',
        effect: (p) => { p.m += 3; p.e += 2; p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('sl_ru_prop', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_egypt_lgbtq_crackdown',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 2001 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('questioning_sexuality') &&
      !G.mem?.sl_eg_lgbtq,
    text: 'The Queen Boat raid — fifty-two men arrested on a Nile cruise ship — happened before you were old enough to go to such places, but the name of the boat has circulated in the city\'s private knowledge ever since. There is no law against what you are. There is a debauchery law, which has the same effect with different paperwork. You know three people who know this from experience.',
    choices: null,
    effect: (p) => { p.setMem('sl_eg_lgbtq', true); p.m -= 5; p.e += 1; p.addFlag('lgbtq_lived_underground') },
  },

  {
    id: 'sl_india_377_repeal',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 2018 &&
      G.age >= 18 && G.age <= 40 &&
      G.flags.includes('questioning_sexuality') &&
      !G.mem?.sl_in_377,
    text: 'Section 377 has been struck down by the Supreme Court. You heard about it on your phone in the middle of a workday. You did not cry at your desk but it was close. The law had been there your entire conscious life — a thing that named you criminal without needing to arrest you. And now it is struck down. The country has said, officially, that you exist. That sentence is smaller than it sounds and larger than anything.',
    choices: null,
    effect: (p) => { p.setMem('sl_in_377', true); p.m += 10; p.e += 2; p.addFlag('witnessed_rights_expansion') },
  },

  {
    id: 'sl_us_aids_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1983 && G.currentYear <= 1996 &&
      G.age >= 20 && G.age <= 35 &&
      G.flags.includes('questioning_sexuality') &&
      !G.mem?.sl_us_aids_gen,
    text: 'The ones you know who have died. You count them sometimes and stop counting. The number is not a number a generation should know. The disease arrived with a specific moral freight attached to it — the administration would not say the word for years — and you watched the community build the infrastructure of care that the government did not. The buddy system. The phone trees. The hospice that was an apartment. The funerals that happened too often for February.',
    choices: null,
    effect: (p) => { p.setMem('sl_us_aids_gen', true); p.m -= 8; p.h -= 3; p.e += 3; p.addFlag('aids_generation_witness') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // I. OCCUPATIONAL SPECIFICITY AT HISTORICAL MOMENTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_print_worker_1980s',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      ['United Kingdom', 'United States', 'Australia'].includes(G.character.country.name) &&
      G.currentYear >= 1982 && G.currentYear <= 1992 &&
      G.career?.field === 'media' &&
      G.age >= 28 && G.age <= 50 &&
      !G.mem?.sl_print_comp,
    text: 'The compositors have been clearing their cases for a century. You learned the trade from a man who learned it from a man who set type by hand. Now the new machines do in a minute what took a skilled man an afternoon. The owners call it modernisation. The union calls it something else. You are caught between what you are good at and what the industry has decided it needs.',
    choices: [
      {
        text: 'Fight it — the skills are real, the craft is real, the union will hold',
        tag: 'fight',
        outcome: 'The strike is long and the outcome is not the one you fought for. The skills are real. The industry moved anyway.',
        effect: (p) => { p.m -= 6; p.s += 3; p.karma += 3; p.addFlag('union_solidarity'); p.setMem('sl_print_comp', true) },
      },
      {
        text: 'Retrain — the work is changing and the pension is not worth the fight',
        tag: 'adapt',
        outcome: 'You learn the new systems. The craft you carried is not transferable. The income is stable. Those are different things.',
        effect: (p) => { p.m -= 3; p.e += 2; p.w += 2; p.setMem('sl_print_comp', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_coal_miner_pit_closure',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      ['United Kingdom', 'Poland', 'Germany', 'Ukraine'].includes(G.character.country.name) &&
      G.currentYear >= 1985 && G.currentYear <= 2000 &&
      G.career?.field === 'labour' &&
      G.age >= 30 && G.age <= 52 &&
      !G.mem?.sl_pit_close,
    text: 'The letter came on a Tuesday. The pit is closing. NCB are the three letters you have built your life around — the shift rota, the lamp check, the cage dropping, the seam. Twenty-three years. The village grew around the pit. The social club, the school fundraiser, the football team. The letter uses the word restructuring. You read it three times and then put it in the kitchen drawer because there is nowhere else to put it.',
    choices: null,
    effect: (p) => { p.setMem('sl_pit_close', true); p.m -= 8; p.w -= 5; p.mo -= 2000; p.addFlag('industry_lost') },
  },

  {
    id: 'sl_smallholder_green_revolution',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      ['India', 'Mexico', 'Philippines', 'Indonesia', 'Pakistan'].includes(G.character.country.name) &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.ruralUrban === 'rural' &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.sl_grn_rev,
    text: 'The new seeds need more water and more fertiliser than you have ever bought, but the yield is double. The agricultural officer from the district has been through the village twice this season. The bigger farmers have already switched. You have watched one poor season make a rich farmer and three good seasons leave a small farmer where he started. The question is whether to take the loan for the inputs. The loan is from the cooperative, which is run by the man whose land is four times yours.',
    choices: [
      {
        text: 'Take the loan and plant the new variety — the yield numbers are real',
        tag: 'modernise',
        outcome: 'Two good seasons. The loan is repaid. The third season the rains fail and the chemical inputs cannot compensate for absent water. The debt is different from the first debt.',
        effect: (p) => { p.mo += 800; p.w += 1; p.addFlag('indebted'); p.setMem('sl_grn_rev', true) },
      },
      {
        text: 'Stay with the older variety — one bad yield with the new seed and the family eats nothing',
        tag: 'traditional',
        outcome: 'The older seeds produce what they have always produced. The gap between your output and your neighbour\'s widens. The stability is real. So is what it costs.',
        effect: (p) => { p.m -= 2; p.karma += 2; p.setMem('sl_grn_rev', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_hairdresser_township',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.age >= 18 && G.age <= 32 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_hair_twnshp,
    text: 'The salon is four chairs in the front room of your aunt\'s house in Soweto. The women come on Saturdays. The conversation is the business as much as the hair — who has a pass, who has been stopped at the checkpoint, whose son is in detention, which corner shop has been petrol-bombed, the cost of the bus. The hair takes two hours and costs two rand and the conversation continues after the client leaves because someone else is already sitting down.',
    choices: null,
    effect: (p) => { p.setMem('sl_hair_twnshp', true); p.s += 3; p.m += 3; p.mo += 400; p.addFlag('informal_economy') },
  },

  {
    id: 'sl_chinese_factory_migrant',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 17 && G.age <= 28 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_cn_fac_mig,
    text: 'The factory is in Guangdong and your village is in Sichuan and the distance between them is a thirty-hour train ride on a hard seat you booked six weeks in advance. The dormitory is eight to a room. The line produces one part of a phone assembly. You move the same piece twelve hundred times in an eight-hour shift. The money is more than anything you could earn at home. The money is also twelve hundred times.',
    choices: null,
    effect: (p) => { p.setMem('sl_cn_fac_mig', true); p.mo += 2400; p.h -= 3; p.m -= 3; p.addFlag('rural_urban_migrant') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // J. CHILDREN OF HISTORY — the generation born into the aftermath
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_second_gen_holocaust',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['Germany', 'Poland', 'Hungary', 'Romania', 'France', 'Netherlands', 'Israel'].includes(G.character.country.name) &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 16 &&
      G.religion === 'jewish' &&
      !G.mem?.sl_2gen_shoa,
    text: 'Your parents do not talk about it and that is the loudest thing in the house. You have learned the shape of the silence — what questions make the room go still, which photographs are not in the album, why your mother\'s hands do something specific when certain dates come around. The silence is the inheritance. You understand this before you can name it.',
    choices: null,
    effect: (p) => { p.setMem('sl_2gen_shoa', true); p.m -= 4; p.e += 2; p.addFlag('intergenerational_trauma') },
  },

  {
    id: 'sl_hiroshima_second_gen',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 16 &&
      G.flags.includes('hibakusha_survivor') &&
      !G.mem?.sl_2gen_hiro,
    text: 'Your parent is a hibakusha — survivor of the bomb. The word exists in Japanese because there was enough of something to need a word. The stigma attached to it — the marriage refusals, the employers who will not hire — you absorb before you understand what caused it. The body carries what it carries. What descends to you is harder to name than radiation.',
    choices: null,
    effect: (p) => { p.setMem('sl_2gen_hiro', true); p.m -= 5; p.e += 2; p.addFlag('intergenerational_trauma') },
  },

  {
    id: 'sl_armenian_diaspora_grandchild',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      ['France', 'United States', 'Lebanon', 'Syria', 'Argentina'].includes(G.character.country.name) &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 13 && G.age <= 20 &&
      G.flags.includes('arm_genocide_memory_bearer') &&
      !G.mem?.sl_arm_disp_gc,
    text: 'Your grandparents survived something that the country that did it still does not call by its name. You have grown up with this gap between the word your family uses and the word the Turkish government uses. The gap is not abstract. It is the reason your grandparents\' village is a Turkish village now, the reason you grew up here instead of there. The denial is the second thing they took.',
    choices: null,
    effect: (p) => { p.setMem('sl_arm_disp_gc', true); p.m -= 3; p.e += 3; p.karma += 2 },
  },

  {
    id: 'sl_apartheid_coloured_id',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 14 &&
      G.ethnicity === 'coloured_south_african' &&
      !G.mem?.sl_apar_col_id,
    text: 'The Population Registration Act says you are Coloured. This is a legal category that did not exist before 1950. It was invented to place you between White and Black on a hierarchy that needs you in between to maintain itself. The school you attend, the bus you take, the beach you are permitted on — all of these are determined by this word that the government invented thirteen years before you were born.',
    choices: null,
    effect: (p) => { p.setMem('sl_apar_col_id', true); p.m -= 5; p.e += 2; p.addFlag('experienced_discrimination') },
  },

  {
    id: 'sl_famine_child_ethiopia',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ethiopia' &&
      G.currentYear >= 1983 && G.currentYear <= 1987 &&
      G.age >= 4 && G.age <= 10 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_eth_famine_child,
    text: 'The food came from trucks with markings you did not understand. The men who drove the trucks had cameras. You remember the cameras more than the food — the way the men pointed them at the children in the line. You were one of the children in the line. You learned later that the photographs were broadcast on television in countries you had not known existed. You were evidence of something to people who were watching you eat.',
    choices: null,
    effect: (p) => { p.setMem('sl_eth_famine_child', true); p.h -= 6; p.m -= 4; p.e += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // K. BODY AND DISABILITY IN SPECIFIC ERAS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_polio_survivor_1950s',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1945 && G.currentYear <= 1960 &&
      G.age >= 4 && G.age <= 12 &&
      !G.mem?.sl_polio_surv &&
      Math.random() < 0.08,
    text: 'The summer the polio came through the town, your mother would not let you swim in the public pool. You got it anyway — the fever first, then the weakness in the left leg, then the weeks in the iron lung ward where the machines breathed and the children did not go home at the same rate they arrived. You came home. The leg does not work the same. You are one of the lucky ones, which is a thing people will tell you for the rest of your life.',
    choices: null,
    effect: (p) => { p.setMem('sl_polio_surv', true); p.h -= 15; p.m -= 5; p.addFlag('childhood_disability'); p.addCondition('mobility_impairment', 'moderate') },
  },

  {
    id: 'sl_blind_braille_access',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 12 && G.age <= 18 &&
      G.flags.includes('childhood_disability') &&
      G.stats.smarts >= 55 &&
      !G.mem?.sl_blind_braille,
    text: 'The school for the blind is three hours from your family by bus. The school there has a library with Braille books — forty-seven of them, which is more than you have ever had access to at once. The teacher of mathematics writes equations in raised dots on wax paper and hands them to you personally. You understand, in this school, that the architecture of your education has been determined by what the regular schools decided you could not do. The architecture here assumes you can do the things.',
    choices: null,
    effect: (p) => { p.setMem('sl_blind_braille', true); p.e += 5; p.m += 4 },
  },

  {
    id: 'sl_deaf_hearing_world_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 30 &&
      (G.flags.includes('born_deaf') || G.flags.includes('deaf_community_found')) &&
      !G.mem?.sl_deaf_work,
    text: 'The interview is your third this month. You have practised the lip-reading for the specific vocabulary of this industry. The interviewer speaks to the wall behind you for three of the fifteen minutes. You correct him twice, gently, and he is embarrassed and this changes the remainder of the interview in ways that are not in your favour. The job goes to someone else. You have no way of proving the connection and do not try.',
    choices: [
      {
        text: 'Continue applying — the right employer exists',
        tag: 'persist',
        outcome: 'The fourth interview is different. The employer has a policy. The policy is not charity — they have found that Deaf workers have a specific kind of concentration that the work rewards. You are hired.',
        effect: (p) => { p.m += 2; p.w += 3; p.karma += 2; p.setMem('sl_deaf_work', true) },
      },
      {
        text: 'Move toward the Deaf community economy — the parallel world that does not need the hearing world to function',
        tag: 'community',
        outcome: 'The Deaf club, the Deaf-run business, the network that has always existed alongside. You build inside it and the building is real.',
        effect: (p) => { p.s += 4; p.m += 5; p.addFlag('community_anchor'); p.setMem('sl_deaf_work', true) },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // L. SPECIFIC HISTORICAL WEATHER — the ordinary life inside the event
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_berlin_wall_day',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear === 1989 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sl_wall_fall,
    text: 'The news came on the television and then came again on the radio and then you went outside because staying inside seemed wrong. People were at Bornholmer Strasse, at Checkpoint Charlie, at the Brandenburg Gate. People had hammers. The Wall had been there your entire life — a fact of the city you had stopped seeing the way you stopped seeing the furniture. And now it was coming down. The friends who came across in the following days had a different quality of attention: they looked at things the way people look at things they have been told about but not been permitted to see.',
    choices: null,
    effect: (p) => { p.setMem('sl_wall_fall', true); p.m += 8; p.e += 2 },
  },

  {
    id: 'sl_india_partition_train',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['India', 'Pakistan'].includes(G.character.country.name) &&
      G.currentYear >= 1947 && G.currentYear <= 1948 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.sl_partition_train,
    text: 'The train moved both ways across the new border and some trains arrived and some trains did not. You were on one that arrived. The carriage you came in held people who had been neighbours with people they would never see again and also people they had watched die. The word refugee did not feel like the right word for what you were because you had not chosen anything and the word implies a direction you chose. You arrived. You were what had arrived.',
    choices: null,
    effect: (p) => { p.setMem('sl_partition_train', true); p.m -= 8; p.e += 2; p.addFlag('partition_generation'); p.addFlag('displaced') },
  },

  {
    id: 'sl_chile_1973_morning',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear === 1973 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sl_chile_73,
    text: 'The radio played military music in the morning and you understood what that meant because other countries had already taught you what military music in the morning meant. The palace was burning on the television. Your neighbour, who had a Allende poster in her window until yesterday, had taken it down and you had not seen her do it. You had a list in your head of names — who knew where you stood, who might name you. You began moving through the day as if you were not making calculations.',
    choices: [
      {
        text: 'Go to the address you were given for emergencies. People need to know you are safe.',
        tag: 'network',
        outcome: 'The house is already full. The network is still working. The risk of being seen arriving is part of the calculation you are making. Everyone is making it.',
        effect: (p) => { p.s += 3; p.karma += 4; p.addFlag('political_prisoner_risk'); p.setMem('sl_chile_73', true) },
      },
      {
        text: 'Stay home. Draw no attention. Survive the first week.',
        tag: 'survive',
        outcome: 'You survive the first week. The curfew. The neighbours\' cars in the night. The specific silence that a city makes when it is afraid.',
        effect: (p) => { p.m -= 4; p.h -= 2; p.setMem('sl_chile_73', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_chernobyl_liquidator',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Ukraine', 'Russia', 'Belarus'].includes(G.character.country.name) &&
      G.currentYear >= 1986 && G.currentYear <= 1988 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('military_service') &&
      !G.mem?.sl_cherno_liq,
    text: 'They called you a liquidator. The task was to remove the contaminated material from the reactor roof. Each man could stay on the roof for ninety seconds. You went up four times. The dosimeter they gave you measured to a limit that the actual dose exceeded, so the dosimeter read the limit and stopped, which was a number that permitted you to continue working. You received a medal and a certificate and a diagnosis that came eight years later.',
    choices: null,
    effect: (p) => { p.setMem('sl_cherno_liq', true); p.h -= 18; p.karma += 8; p.addCondition('radiation_exposure', 'severe'); p.addFlag('chernobyl_liquidator') },
  },

  {
    id: 'sl_iran_1979_revolution_educated',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1979 && G.currentYear <= 1982 &&
      G.age >= 18 && G.age <= 40 &&
      G.stats.smarts >= 60 &&
      !G.mem?.sl_iran_79_ed,
    text: 'The revolution you supported is eating the revolution. The parties you organised in the Marxist student group, the manifesto you distributed, the night you spent chanting in Azadi Square — these are now evidence. The Islamic Republic has a word for people like you: monafeqin. The word has consequences. Two of the people from your study group are already gone. You do not know where gone means.',
    choices: [
      {
        text: 'Get out. The exit window is still open.',
        tag: 'leave',
        outcome: 'You leave through the mountains or the airport or both. The exit costs what it costs. The country you arrive in does not have a word for what you were.',
        effect: (p) => { p.addFlag('emigrated'); p.m -= 5; p.setResidency('asylum_seeker'); p.karma += 3; p.setMem('sl_iran_79_ed', true) },
      },
      {
        text: 'Go underground. The revolution can still be corrected from inside.',
        tag: 'underground',
        outcome: 'The underground is smaller than it was. The corrections do not come. The survival does, year by year, in a country that is now something different from what you helped create.',
        effect: (p) => { p.m -= 7; p.h -= 3; p.e += 2; p.addFlag('dissident'); p.setMem('sl_iran_79_ed', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_apartheid_pass_book',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1952 && G.currentYear <= 1990 &&
      G.age >= 18 && G.age <= 40 &&
      !['white_south_african'].includes(G.ethnicity) &&
      !G.mem?.sl_pass_book,
    text: 'The pass book is the size of a passport and must be carried at all times and must be signed by your employer and must authorise your presence in this area on this day. Without the correct endorsement in the correct block you can be arrested for being where you are. You have been arrested once for a missing endorsement. The magistrate fined you and endorsed the pass and released you and the process took three days during which your children did not have their mother.',
    choices: null,
    effect: (p) => { p.setMem('sl_pass_book', true); p.m -= 7; p.e += 2; p.addFlag('experienced_discrimination') },
  },

  {
    id: 'sl_soweto_student_1976',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1976 && G.currentYear <= 1978 &&
      G.age >= 13 && G.age <= 20 &&
      !['white_south_african'].includes(G.ethnicity) &&
      !G.mem?.sl_soweto_76,
    text: 'The march started over Afrikaans. The government decided your science class would be taught in Afrikaans, a language you did not learn to think in. You had enough language to understand the decision: it was not about the language. The police were at the school by midday. Hector Pieterson was thirteen, the same as you. The photograph of him was already in the world before you got home. You understood something that day that you have spent the rest of your life holding.',
    choices: null,
    effect: (p) => { p.setMem('sl_soweto_76', true); p.m -= 6; p.e += 3; p.karma += 4; p.addFlag('political_awakening') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // M. CROSSING CLASS — the specific friction of mobility
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_first_gen_university_uk',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 22 &&
      G.flags.includes('first_gen_graduate') &&
      !G.mem?.sl_fgu_uk,
    text: 'The university is a place built for someone with different vowels. You hear your own accent in tutorials and understand that it is being heard differently. The boys from the public schools have a particular ease — in the bar, in the seminar, with the professors — that is not intelligence but something closer to the assumption of welcome. You are intelligent. The ease is not the same thing.',
    choices: [
      {
        text: 'Learn to perform the ease. It is a skill like any other.',
        tag: 'code_switch',
        outcome: 'The performance is good enough. What it costs is subtle and cumulative and takes years to name.',
        effect: (p) => { p.s += 4; p.m -= 3; p.addFlag('code_switched'); p.setMem('sl_fgu_uk', true) },
      },
      {
        text: 'Stay with what you are. The qualification matters; the accent is yours.',
        tag: 'stay_self',
        outcome: 'Some doors are harder. The doors that open open to someone who is actually you, which turns out to be worth something.',
        effect: (p) => { p.m += 4; p.karma += 3; p.e += 2; p.setMem('sl_fgu_uk', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_class_betrayal',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('first_gen_graduate') &&
      G.stats.wealth >= 60 &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.sl_class_betray,
    text: 'Your mother cannot come to the dinner party because she would not know which fork. This is not what you say. What you say is that she is not well, which is also true. The awareness of what you have just done sits with you for the rest of the evening. You think about the specific calculus — the social cost to you of bringing her against the cost to her of being left out — and understand that you chose yourself. The education that allowed you to be at this table also taught you the priorities of the people at this table.',
    choices: null,
    effect: (p) => { p.setMem('sl_class_betray', true); p.r += 10; p.m -= 4; p.addFlag('class_guilt') },
  },

  {
    id: 'sl_working_class_inheritance',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('first_gen_graduate') &&
      G.age >= 55 &&
      !G.mem?.sl_wc_inh,
    text: 'What your parents gave you was not money. The inventory: a particular capacity for discomfort that does not stop them. A relation to work that does not require the work to mean anything beyond it being done well. A precise knowledge of how much things cost. A suspicion of people who have never had to think about this. These are inheritances. They operated differently from the ones your colleagues received. You are still working out whether the word better applies.',
    choices: null,
    effect: (p) => { p.setMem('sl_wc_inh', true); p.m += 4; p.e += 2; p.karma += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // N. DOMESTIC LIFE WITH HISTORICAL PRECISION
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_japan_housewife_1970s',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 28 && G.age <= 50 &&
      G.partner !== null &&
      !G.career?.id &&
      !G.mem?.sl_jp_shufu,
    text: 'The word shufu — housewife — is the category the census puts you in. The category does not describe the administrative management of a household of five, the PTA chairmanship, the care of the in-laws, the accounting that keeps the family budget, the after-school schedule, the preservation of the social network that your husband\'s career depends on. You are in charge of all of these. The category does not describe them. The category describes the official absence of a salary.',
    choices: null,
    effect: (p) => { p.setMem('sl_jp_shufu', true); p.s += 2; p.e += 2; p.m -= 2 },
  },

  {
    id: 'sl_soviet_domestic_queue',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1960 && G.currentYear <= 1989 &&
      G.character.gender === 'female' &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.sl_sov_queue,
    text: 'The queue for meat started at five-thirty in the morning. If you arrived at six there was nothing left. Your shift began at eight. You stood in the meat queue and then the bread queue and then walked to work having not been home since the night before, and this was a normal Tuesday. The official discourse called it full employment and gender equality. The unofficial truth was that the full employment was at the factory and the gender equality was in addition to the queue.',
    choices: null,
    effect: (p) => { p.setMem('sl_sov_queue', true); p.m -= 3; p.e += 2 },
  },

  {
    id: 'sl_india_joint_family_daughter_in_law',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 32 &&
      G.partner !== null &&
      !G.mem?.sl_in_dil,
    text: 'The joint family house belongs to your husband\'s family. Your position in it was established before you arrived and is enforced by a thousand small daily practices: who wakes first, who serves the food, who does not eat until the men and the elders have eaten, what you are expected to feel about this arrangement and whether expressing what you actually feel is advisable. Your mother-in-law is not cruel. The structure does not require cruelty to operate.',
    choices: [
      {
        text: 'Work within the structure. The position has its own power over time.',
        tag: 'within',
        outcome: 'The seniority accretes. In fifteen years you are the mother-in-law. The structure is unchanged. You are on the other side of it.',
        effect: (p) => { p.s += 3; p.m -= 3; p.setMem('sl_in_dil', true) },
      },
      {
        text: 'Negotiate quietly with your husband for your own household.',
        tag: 'negotiate',
        outcome: 'The negotiation takes two years and damages several relationships. The household you eventually have is yours. The damage is also yours.',
        effect: (p) => { p.m += 4; p.s -= 2; p.setMem('sl_in_dil', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_nigeria_market_woman',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.character.gender === 'female' &&
      G.ruralUrban === 'urban' &&
      G.age >= 28 && G.age <= 55 &&
      !G.career?.id &&
      !G.mem?.sl_ng_mkt_w,
    text: 'The stall is open by six and closed after dark and the difference between those times is every transaction, every negotiation, every customer who wants credit extended and every supplier who wants earlier payment, every toll from the market association, every calculation about what to reorder and at what price. You run the stall and you run the household and you pay school fees for four children. The government statistics category for what you do is "informal sector." The informal sector is what keeps the city fed.',
    choices: null,
    effect: (p) => { p.setMem('sl_ng_mkt_w', true); p.s += 3; p.m += 2; p.mo += 600; p.addFlag('market_woman') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // O. SPECIFIC EARLY CHILDHOODS — age 0–5 with texture
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_wartime_london_child',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 3 && G.age <= 6 &&
      !G.mem?.sl_blitz_child,
    text: 'The shelter at the bottom of the garden was concrete and smelled of earth. You knew the sound of the all-clear and the sound of the warning and the difference was the sound of which direction to run. Your mother had a routine for the sirens the way she had a routine for bedtime. This is your earliest memory: the shelter, the smell, the routine, and the sense that the adults in your life had decided that routine was the same as safety.',
    choices: null,
    effect: (p) => { p.setMem('sl_blitz_child', true); p.m -= 3; p.h -= 2; p.addFlag('war_childhood') },
  },

  {
    id: 'sl_leningrad_siege_child',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1941 && G.currentYear <= 1944 &&
      G.age >= 2 && G.age <= 6 &&
      !G.mem?.sl_lgrad_child,
    text: 'The bread was 125 grams a day during the worst months. You were too young to understand grams. You understood hunger, which is more fundamental than units of measurement. The adults did not cry in front of you, which was a form of care. Later you understood what the adults were not eating so that you could eat what you ate.',
    choices: null,
    effect: (p) => { p.setMem('sl_lgrad_child', true); p.h -= 8; p.m -= 5; p.addFlag('war_childhood') },
  },

  {
    id: 'sl_postwar_japan_child',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1945 && G.currentYear <= 1952 &&
      G.age >= 3 && G.age <= 7 &&
      !G.mem?.sl_pw_jp_child,
    text: 'The American soldiers handed out chocolate in the street. You had not understood before that moment that a country could be occupied by the army of another country and that children could eat chocolate given by the soldiers of the occupying army. The chocolate was real. Everything else about the situation you spent the rest of your childhood slowly understanding.',
    choices: null,
    effect: (p) => { p.setMem('sl_pw_jp_child', true); p.m -= 2; p.e += 2 },
  },

  {
    id: 'sl_nigeria_oil_boom_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1973 && G.currentYear <= 1982 &&
      G.age >= 6 && G.age <= 12 &&
      G.stats.wealth >= 40 &&
      !G.mem?.sl_ng_oil_child,
    text: 'The oil money was visible in specific ways: the new buildings in Lagos with glass facades, the imported cars, the school with generators that ran through the power cuts. Your father had a title and a government contract and a car with a driver. The money was also visible in specific problems: the queue for the one thing that worked, the officials whose signature was the product they sold. You understood, at eight, that Nigeria was rich and that the richness was complicated in ways you did not yet have words for.',
    choices: null,
    effect: (p) => { p.setMem('sl_ng_oil_child', true); p.e += 2; p.m += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // P. LANGUAGE AS SURVIVAL — the specific politics of what you speak
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_welsh_language_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1960 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 12 &&
      G.flags.includes('minority_language_speaker') &&
      !G.mem?.sl_welsh_sch,
    text: 'The teacher said not to speak Welsh in the classroom. This was not a prohibition against Welsh in general — outside was fine. Inside, English. You understood that the inside/outside distinction was not about practicality. You understood it was about which language the school had decided was the real one. You and your friends continued in Welsh at the back of the classroom in voices calibrated to be inaudible.',
    choices: null,
    effect: (p) => { p.setMem('sl_welsh_sch', true); p.m -= 2; p.e += 2; p.s += 2 },
  },

  {
    id: 'sl_catalan_franco_language',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1940 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 14 &&
      G.flags.includes('minority_language_speaker') &&
      !G.mem?.sl_cat_lang,
    text: 'The law says Spanish only — Habla la lengua del Imperio. In school: Spanish. In official settings: Spanish. At home, behind the closed door: Catalan, which your grandparents speak and your parents speak and you are learning to speak in the specific register of a language kept alive inside closed doors. You are seven years old and already aware of the architecture of when to speak which language, which is an unusual competence to develop at seven.',
    choices: null,
    effect: (p) => { p.setMem('sl_cat_lang', true); p.m -= 2; p.e += 3; p.addFlag('language_suppression_lived') },
  },

  {
    id: 'sl_kazakh_russified_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1970 && G.currentYear <= 1991 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_kaz_russ,
    text: 'Your mother speaks Kazakh. You answer in Russian. This happened gradually enough that it is now simply how you are. The Russian was the language of advancement, of the city, of the scientific education. The Kazakh was for your grandmother\'s kitchen and the songs at Nauryz. You live between these two registers and have never been asked to choose between them, which is a form of choosing without choosing.',
    choices: null,
    effect: (p) => { p.setMem('sl_kaz_russ', true); p.e += 2; p.m -= 2; p.addFlag('minority_language_gap') },
  },

  {
    id: 'sl_arabic_dialect_social',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Egypt', 'Morocco', 'Algeria', 'Tunisia', 'Lebanon', 'Syria', 'Jordan', 'Iraq'].includes(G.character.country.name) &&
      G.currentYear >= 1980 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_ar_dialect,
    text: 'The written Arabic you use in formal documents is not the spoken Arabic you use with your mother. This is not translation exactly — it is two registers of the same inheritance. The television presenters speak a middle dialect that no one actually uses at home. The university professor writes in Fusha and speaks in Egyptian or Moroccan or Levantine. You navigate between the registers constantly, which is an act of intelligence so daily it has become invisible.',
    choices: null,
    effect: (p) => { p.setMem('sl_ar_dialect', true); p.e += 2; p.s += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // Q. AGING IN SPECIFIC ERAS — late life with historical texture
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_elderly_internet_arrival',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1998 && G.currentYear <= 2008 &&
      G.age >= 65 && G.age <= 80 &&
      !G.mem?.sl_old_inet,
    text: 'The grandchildren showed you how to use the email. The process of learning was more interesting than they expected and more frustrating than you let them see. What you understood immediately was that the letters your grandchildren wrote to you by email were shorter than the letters they would have written on paper — as if the medium had a maximum length it was comfortable with. You have adapted to the medium. You write short emails. You remember writing long letters.',
    choices: null,
    effect: (p) => { p.setMem('sl_old_inet', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'sl_elderly_soviet_collapse',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1991 && G.currentYear <= 1998 &&
      G.age >= 65 &&
      !G.mem?.sl_old_sov_coll,
    text: 'You built your life inside the Soviet system. Your career, your pension, your apartment, your sense of what the future would contain — all of these were built inside the assumption that the system would persist. The system is gone. The pension is worth what it was worth in roubles when roubles bought what they bought. Your apartment is yours now in a legal sense that the Soviet system would not have recognised. The country you are in is not the country you learned to navigate.',
    choices: null,
    effect: (p) => { p.setMem('sl_old_sov_coll', true); p.m -= 6; p.w -= 5; p.mo -= 3000 },
  },

  {
    id: 'sl_elderly_pandemic_isolation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 70 &&
      !G.mem?.sl_old_pandemic,
    text: 'The lockdown was the right decision. You understood this and agreed with it and were glad of it. You were also, by the third month, inside something that looked very much like the life you had been warned was coming — the attrition of days that were the same, the conversations by telephone that were not the same as conversations, the window as the primary interface with the world outside your walls. You had been told this would come, eventually, with age. You had not expected it to arrive at once and with a reason that was not age.',
    choices: null,
    effect: (p) => { p.setMem('sl_old_pandemic', true); p.m -= 6; p.h -= 3; p.e += 1 },
  },

  {
    id: 'sl_widow_farming_community',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('widowed') &&
      G.ruralUrban === 'rural' &&
      G.age >= 60 &&
      !G.mem?.sl_wid_farm,
    text: 'The farm was your husband\'s name in the official records and now that he is gone the question is what it is. Your son is in the city. The land is here. You know the land in ways your son does not — which fields hold water in wet years, which drainage ditch needs clearing in autumn, which neighbour will help with the harvest if you help with theirs. The knowledge is not on paper anywhere. It is in thirty years of doing it.',
    choices: [
      {
        text: 'Stay and manage it yourself. The knowledge is yours even if the title was his.',
        tag: 'stay',
        outcome: 'The seasons continue. The management is harder alone. The knowledge is sufficient and the land is yours in all the ways that matter.',
        effect: (p) => { p.m += 3; p.karma += 3; p.setMem('sl_wid_farm', true) },
      },
      {
        text: 'Move to the city, near your son. The farm can be rented.',
        tag: 'move',
        outcome: 'The city is your son\'s world, not yours. The rent from the farm is something. The loss of the particular knowledge of that land is also something, without a word for it.',
        effect: (p) => { p.m -= 4; p.mo += 2400; p.r += 5; p.setMem('sl_wid_farm', true) },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // R. MICRO-HISTORIES — moments so specific they could not have been designed
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_rohingya_nameless',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.ethnicity === 'rohingya' &&
      G.currentYear >= 1982 && G.currentYear <= 2017 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_roh_nameless,
    text: 'The 1982 Citizenship Law removed the word Rohingya from the list of recognized national races. The law does not say you do not exist. It says you are a Bengali, which means you are from somewhere else, which means the country you were born in is not yours by law. You have the papers the law says you cannot have and the identity the law says is not real and you live in the country where this is the official position.',
    choices: null,
    effect: (p) => { p.setMem('sl_roh_nameless', true); p.m -= 6; p.e += 2; p.addFlag('stateless') },
  },

  {
    id: 'sl_philippines_remittance_mother',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.character.gender === 'female' &&
      G.flags.includes('ofw_gulf') &&
      G.age >= 30 && G.age <= 50 &&
      G.children?.length > 0 &&
      !G.mem?.sl_ph_rem_mother,
    text: 'The money arrives on the fifteenth. You wire it from the money exchange beside the post office and it lands in your sister\'s account in Manila and she uses it to pay the school fees and the grocery bill and saves the remainder for the rent. The children on the phone sound different from how you remember them — older in their voices, with references to people and places you have not met or seen. You are their mother in the money and in the calls and in the decision to be here instead of there so that they can be in school instead of not.',
    choices: null,
    effect: (p) => { p.setMem('sl_ph_rem_mother', true); p.m -= 4; p.karma += 5; p.mo += 1200 },
  },

  {
    id: 'sl_hong_kong_handover',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1996 && G.currentYear <= 1999 &&
      G.age >= 18 && G.age <= 40 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_hk_handover,
    text: 'The handover was a ceremony watched by most of the city and by a large part of the world. You watched it in a flat in Wan Chai with eleven other people and a television that was too small. The British flag came down at midnight and there was a complicated feeling in the room that was not quite grief and not quite celebration and not quite fear — something that combined elements of all three in proportions nobody in the room could quite specify. One person opened a beer. The rest continued watching.',
    choices: null,
    effect: (p) => { p.setMem('sl_hk_handover', true); p.m += 2; p.e += 2 },
  },

  {
    id: 'sl_rwanda_gacaca_witness',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 2001 && G.currentYear <= 2012 &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.sl_rwa_gacaca,
    text: 'The gacaca court meets under a tree. The man who is testifying about what happened to your neighbour in 1994 is sitting twenty metres from the man he is testifying about. The man he is testifying about is required to be here. Rwanda has decided that justice in this case means community courts, truth-telling, reduced sentences in exchange for confession. You are required to be here too, as a witness. What you witnessed in 1994 is not the same as what is happening under the tree. You are learning what justice means when it is designed for a situation where everyone is already present.',
    choices: null,
    effect: (p) => { p.setMem('sl_rwa_gacaca', true); p.m -= 4; p.e += 3; p.karma += 3 },
  },

  {
    id: 'sl_brazil_favela_pacification',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2008 && G.currentYear <= 2016 &&
      G.age >= 18 && G.age <= 35 &&
      G.ruralUrban === 'urban' &&
      G.stats.wealth <= 35 &&
      !G.mem?.sl_br_upp,
    text: 'The UPP police came in 2010. Before the UPP: the traffic, the toque de recolher, the permission structure of the hill that everyone navigated and few acknowledged. After the UPP: police checkpoints, which you navigate differently. The violence is lower in certain categories and unchanged in others. The people of the favela debate what the pacification is for, which is a question about who the pacification serves, which is a question the UPP itself does not raise.',
    choices: null,
    effect: (p) => { p.setMem('sl_br_upp', true); p.m += 2; p.e += 2; p.s += 1 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // S. SPECIFIC RURAL LIVES — the texture of smallness and land
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_mali_cotton_body',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mali' &&
      G.ruralUrban === 'rural' &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.sl_mali_cot_body,
    text: 'The cotton season begins in October and the body keeps the account. By November the fingers are cracked at the joints from the burs. By December the back has logged the hours. The CMDT price is fixed before the season and does not change regardless of what the world price does. You have been doing this calculation for twelve years: the price the company fixes, the price the world charges for the fertiliser, the gap between them that is the shape of your year.',
    choices: null,
    effect: (p) => { p.setMem('sl_mali_cot_body', true); p.h -= 4; p.m -= 2; p.e += 2 },
  },

  {
    id: 'sl_vietnam_rice_paddy',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Vietnam' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1976 && G.currentYear <= 2000 &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.sl_vn_paddy,
    text: 'The cooperative quota is thirty percent of the harvest. Above the quota the family keeps what it grows. The mathematics of the quota means the mathematics of everything else — what the children eat, whether there is cooking oil, the calculation that happens every harvest between what the state takes and what remains. Doi Moi changed the mathematics. What did not change: the water level in the paddies at four in the morning, the specific ache of transplanting by hand, the number of days between planting and harvest that a body memorises without being asked.',
    choices: null,
    effect: (p) => { p.setMem('sl_vn_paddy', true); p.h -= 3; p.m += 2; p.e += 2 },
  },

  {
    id: 'sl_peru_potato_altitude',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.sl_pe_potato,
    text: 'At 3,800 metres the potato is the thing the altitude permits. Your family grows twelve varieties — the names of them in Quechua are specific: the one that survives frost, the one that goes bitter if you boil it wrong, the one that is only for the highest field. The agricultural officer from the ministry visited once and noted that the family was using traditional varieties and suggested modern ones. Your grandmother explained the twelve names and the officer wrote something down and left. The twelve varieties are still there.',
    choices: null,
    effect: (p) => { p.setMem('sl_pe_potato', true); p.e += 3; p.m += 2; p.addFlag('indigenous_knowledge') },
  },

  {
    id: 'sl_kenya_tea_picker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kenya' &&
      G.ruralUrban === 'rural' &&
      G.age >= 18 && G.age <= 35 &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      !G.mem?.sl_ke_tea,
    text: 'The target is twenty-two kilos of tea leaf per day. Below target, the supervisor notes it. At target, the wage is the wage. Above target, a bonus that is smaller than the calculation suggests it should be. You pick with both hands into the basket on your back. The posture the picking requires has a specific effect on the lower spine that you will carry for the rest of your life. The tea goes to Mombasa, then to the London auction, then to a supermarket shelf with a price that is not connected to the twenty-two kilos.',
    choices: null,
    effect: (p) => { p.setMem('sl_ke_tea', true); p.h -= 4; p.mo += 800; p.e += 1 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // T. FAITH IN ITS BODY — not doctrine but practice
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_amish_rumspringa',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.religion === 'christian_protestant' &&
      G.ruralUrban === 'rural' &&
      G.stats.smarts >= 30 && G.stats.smarts <= 60 &&
      G.age >= 16 && G.age <= 20 &&
      !G.mem?.sl_amish_rum,
    text: 'Rumspringa means running around. The community allows you to go and see the world during this period before you are baptised, because the church holds that you should choose it knowing what you are choosing against. You have gone and seen: the electricity, the cars, the phones, the music that comes through headphones. You are now required to decide. The decision is not between the world and the community — it is between being known in one place, completely, and being unknown in a larger one.',
    choices: [
      {
        text: 'Return and be baptised. The community is what you choose.',
        tag: 'return',
        outcome: 'The bishop performs the baptism. The church sings. You are in the community that knew you before you were old enough to choose it, and you have now chosen it. The weight of that choice is different from obligation.',
        effect: (p) => { p.m += 8; p.s += 3; p.addFlag('faith_chosen'); p.setMem('sl_amish_rum', true) },
      },
      {
        text: 'Stay out. The world is enormous and you want to be in it.',
        tag: 'leave',
        outcome: 'You are shunned in the specific way the Ordnung prescribes — not violently, but completely. Your family eats with you separately. The loss is total and chosen. The world is as large as you thought.',
        effect: (p) => { p.m -= 8; p.e += 4; p.addFlag('left_faith_community'); p.setMem('sl_amish_rum', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_iran_prayer_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1980 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.sl_ir_pray_sch,
    text: 'The school day begins with prayer. The prayer is required. The teacher walks the rows checking that the lips are moving. Your lips move. Whether anything behind them is moving is your private business. You have understood, at ten, that there are two registers of religious practice: the one that is public and required and the one that is private and optional. This is not cynicism. It is a sophisticated understanding of a political regime that you developed before you had words for politics or regimes.',
    choices: null,
    effect: (p) => { p.setMem('sl_ir_pray_sch', true); p.e += 3; p.m -= 2 },
  },

  {
    id: 'sl_hasidic_education',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['Israel', 'United States', 'Belgium', 'United Kingdom'].includes(G.character.country.name) &&
      G.religion === 'jewish' &&
      G.currentYear >= 1950 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_hasid_ed,
    text: 'The yeshiva teaches Talmud from six in the morning. The secular subjects — the ones the government requires — occupy two hours in the afternoon and are taught with a quality of attention that makes clear they are not the point. You are eight and you are learning to argue with Rashi\'s commentary on a passage that was old when Rashi wrote about it. The argumentation is rigorous and ancient and in a language that is not spoken on any street in the city outside these walls.',
    choices: null,
    effect: (p) => { p.setMem('sl_hasid_ed', true); p.e += 3; p.s += 2 },
  },

  {
    id: 'sl_thai_monk_ordination',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.character.gender === 'male' &&
      G.religion === 'buddhist' &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.sl_thai_ord,
    text: 'The ordination is temporary — a month, perhaps three. This is the custom: most Thai men ordain once, briefly, before marriage or a major life change. Your head is shaved by a barber who has done this many times. The saffron robe is yours for the duration. In the morning you walk with the alms bowl and the city feeds you. In the evenings you study suttas with a monk who is sixty and whose life has been entirely this. The temporary nature of your commitment does not diminish the practice. He does not make you feel it should.',
    choices: null,
    effect: (p) => { p.setMem('sl_thai_ord', true); p.m += 6; p.e += 3; p.karma += 5; p.addFlag('ordained_temporary') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // U. HEALTH SYSTEMS — the body encountering the state's capacity
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_uk_nhs_birth',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1948 && G.currentYear <= 1990 &&
      G.children?.length === 0 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_uk_nhs_b,
    text: 'The National Health Service was five years old when you were born and the maternity ward was the first time the state had paid for something your mother previously could not have afforded. The midwife\'s care, the hospital bed, the follow-up visit — none of it required money at the point of need. Your mother described the ward later. She said the women there were from every street in the borough and all of them were in the same beds with the same midwives. She found this remarkable. She did not know it was remarkable until she compared it to what came before.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_nhs_b', true); p.h += 3; p.m += 3; p.addFlag('welfare_state_beneficiary') },
  },

  {
    id: 'sl_nigeria_hospital_cost',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.stats.wealth <= 40 &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.sl_ng_hosp_cost,
    text: 'The doctor says the test is necessary and the test is two thousand naira and two thousand naira is not money you have in the pocket of the clothing you are wearing in this clinic. The doctor does not say what to do about this. He writes it down. You leave the clinic with the piece of paper and the information and the problem of how to turn the information on the piece of paper into the two thousand naira into the test. The health system is not the barrier. The fee is the barrier. The distinction is technical.',
    choices: [
      {
        text: 'Borrow from the family. The test cannot wait.',
        tag: 'borrow',
        outcome: 'The family produces the money in a day. The test confirms what the doctor suspected. The treatment costs more. The family produces more.',
        effect: (p) => { p.h -= 3; p.mo -= 2000; p.karma += 3; p.setMem('sl_ng_hosp_cost', true) },
      },
      {
        text: 'Wait and see if it resolves. The test might not change anything.',
        tag: 'wait',
        outcome: 'It resolves, this time. The not-knowing that preceded the resolution had its own cost, which does not appear on any bill.',
        effect: (p) => { p.h -= 6; p.m -= 4; p.setMem('sl_ng_hosp_cost', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_cuba_double_standard_health',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1995 &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.sl_cu_health,
    text: 'The health system is free. The aspirin is not available in the system. The aspirin is available at the dollar store, which requires dollars, which requires a relative in Miami or a tourist to tip. The Cuban health system has trained more doctors per capita than almost any country in the world and cannot reliably stock aspirin. You have been navigating this gap your entire adult life — the care that is excellent and free and the materials that are neither.',
    choices: null,
    effect: (p) => { p.setMem('sl_cu_health', true); p.h -= 3; p.e += 2; p.m -= 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // V. MIGRATION'S SPECIFIC TEXTURE — not the crossing but the after
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_windrush_arrival',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1948 && G.currentYear <= 1965 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('emigrated') &&
      !G.mem?.sl_windrush_arr,
    text: 'The Empire Windrush docked at Tilbury in 1948. Subsequent ships continued the passage. You arrived by whatever vessel the year permitted and what you found was a country that had invited you — British subject, right of abode — and was not prepared for you. The landlady\'s sign: No Irish, No Coloureds, No Dogs. The buses that stopped. The pubs that went quiet. The country was larger and colder and less welcoming than the mother country it had represented itself as in the colonial classroom.',
    choices: null,
    effect: (p) => { p.setMem('sl_windrush_arr', true); p.m -= 5; p.e += 2; p.addFlag('windrush_generation') },
  },

  {
    id: 'sl_vietnamese_boat_arrival',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Vietnam' &&
      G.flags.includes('emigrated') &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.sl_vn_boat_arr,
    text: 'The camp in Hong Kong was temporary in the way that temporary becomes permanent when the determination process takes three years. The Cantonese called you Vietnamese boat people, which was accurate but not complete. You had been a teacher, a civil servant, a mother with specific children. The camp category was boat person. Inside the category: your entire life, which the category could not contain and which you maintained by telling it, to the children and to anyone who would listen, so that it did not disappear inside the category.',
    choices: null,
    effect: (p) => { p.setMem('sl_vn_boat_arr', true); p.m -= 6; p.e += 3; p.addFlag('refugee_camp_years') },
  },

  {
    id: 'sl_mexican_bracero',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1942 && G.currentYear <= 1964 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_mex_bracero,
    text: 'The Bracero Program gives you a contract and a work permit and a bed in a barrack in California and wages that are three times what you could earn at home. The contract runs for six weeks. At the end of six weeks you go back. The arrangement assumes you will go back. The arrangement is correct — most do. The money you send home is visible in the village: the tin roof, the school fees, the remittance economy that the village runs on. The visible thing does not include the barrack, the contractor\'s accounting, the way the wage is deducted for the bus to the field.',
    choices: null,
    effect: (p) => { p.setMem('sl_mex_bracero', true); p.mo += 3000; p.h -= 3; p.addFlag('bracero_generation') },
  },

  {
    id: 'sl_german_gastarbeiter_stayed',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.flags.includes('emigrated') &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.sl_gast_stayed,
    text: 'The Gastarbeiter contract said temporary. The word was in the name: guest. Guests do not stay. But the factory needed you the following year and the year after and the children were in school and the country they came from was not the same country it had been when you left, and the years passed in the way that years pass when you are busy with the work and the children and not attending to the accumulation. You have been here twenty years. The word temporary is no longer the right word. There is no better word in official use.',
    choices: null,
    effect: (p) => { p.setMem('sl_gast_stayed', true); p.m -= 3; p.e += 2; p.addFlag('second_country_rooted') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // W. EDUCATION AS POWER — specific moments when knowledge is weaponised
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_missionary_school_africa',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['Nigeria', 'Kenya', 'Ghana', 'Uganda', 'Tanzania', 'Zambia', 'Zimbabwe', 'Mozambique', 'Rwanda', 'Ethiopia'].includes(G.character.country.name) &&
      G.currentYear >= 1930 && G.currentYear <= 1970 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.sl_miss_sch,
    text: 'The missionary school teaches reading and arithmetic and Scripture and the Empire\'s version of history, which is a version in which you appear briefly as the people the missionaries came to assist. The reading and arithmetic are real skills. The history is the one you are learning to read against. Your teacher, a man from England who cannot pronounce your name, does not know he is teaching you both things simultaneously.',
    choices: null,
    effect: (p) => { p.setMem('sl_miss_sch', true); p.e += 4; p.m -= 2; p.addFlag('colonial_education') },
  },

  {
    id: 'sl_india_iit_pressure',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1970 &&
      G.age >= 14 && G.age <= 18 &&
      G.stats.smarts >= 70 &&
      !G.mem?.sl_in_iit_pr,
    text: 'The IIT-JEE coaching begins in class nine. The coaching is eight hours on Saturdays and four hours on three evenings and the mock tests are timed and the ranking is posted and the ranking has consequences in ways that are both explicit and ambient. Your rank this month is 847 in the state. The conversation in your household is about what 847 means. The conversation does not include what you think about for the four hours on Tuesday evening when you are supposed to be doing the practice problems but are instead doing something else that is not the IIT-JEE.',
    choices: [
      {
        text: 'Commit to it. The IIT is the door and you are capable of opening it.',
        tag: 'commit',
        outcome: 'You get in. The institution is genuinely excellent. The cost of the years of preparation is something you assess only much later, when you understand what the years were also for.',
        effect: (p) => { p.e += 6; p.m -= 5; p.addFlag('iit_graduate'); p.setMem('sl_in_iit_pr', true) },
      },
      {
        text: 'Find a different path. The IIT is not the only door.',
        tag: 'redirect',
        outcome: 'The alternative is less prestigious and also sufficient. The sufficiency takes longer to understand than the prestige would have.',
        effect: (p) => { p.m += 4; p.e += 2; p.setMem('sl_in_iit_pr', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_singapore_streaming',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1980 && G.currentYear <= 2020 &&
      G.age >= 10 && G.age <= 12 &&
      !G.mem?.sl_sg_stream,
    text: 'At twelve, the PSLE score determines your secondary school stream: Express, Normal Academic, or Normal Technical. The score is public in the way that matters — your parents know, the neighbours know, the relatives know. You have spent three years preparing for one examination. The stream you are placed in determines the examination you can sit at sixteen which determines the university entry you can attempt. The meritocracy is real and the meritocracy begins at twelve, which is a thing the meritocracy does not emphasise.',
    choices: null,
    effect: (p) => { p.setMem('sl_sg_stream', true); p.e += 2; p.m -= 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // X. THE BODY UNDER SPECIFIC POLITICAL SYSTEMS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_east_germany_stasi_informer',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1970 && G.currentYear <= 1989 &&
      G.age >= 25 && G.age <= 55 &&
      G.regime === 'single_party_communist' &&
      !G.mem?.sl_ddr_stasi,
    text: 'The Stasi officer came to your workplace and said that you had been identified as a reliable comrade and that you could serve the Republic in a way that did not require changing anything about your daily life. You were required only to report, occasionally, on certain colleagues. You said yes. The reporting was infrequent and the information seemed routine and the promotion that followed was coincidental. You maintained this description of events for years. After 1989, the files were opened. Your file exists. You are in it as both subject and source.',
    choices: null,
    effect: (p) => { p.setMem('sl_ddr_stasi', true); p.m -= 8; p.r += 12; p.karma -= 10; p.addFlag('informer_stasi') },
  },

  {
    id: 'sl_north_korea_songbun',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'North Korea' &&
      G.currentYear >= 1960 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_nk_songbun,
    text: 'Your songbun is inherited from your grandfather\'s classification in 1946. Your grandfather was a landlord before the land reform. The classification is hostile. The classification determines where you can live, what schools you can attend, what jobs you can be considered for, whether you can join the Party. Your grandfather died before you were born. His classification is with you the way DNA is with you — not chosen, not visible to you, but structuring everything.',
    choices: null,
    effect: (p) => { p.setMem('sl_nk_songbun', true); p.m -= 6; p.e += 2; p.w -= 5 },
  },

  {
    id: 'sl_china_hukou_city',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1985 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.sl_cn_hukou,
    text: 'Your hukou says you are from Anhui. You live in Shanghai. These two facts exist simultaneously in a legal condition that the city has a name for: floating population. You work in the factory, pay into the housing fund, use the roads, breathe the air, send your child to a school that the hukou says your child does not belong in. The city needs your labour. The city does not guarantee your child\'s education. The distinction between these two statements is the whole shape of the hukou system.',
    choices: null,
    effect: (p) => { p.setMem('sl_cn_hukou', true); p.m -= 4; p.e += 2; p.addFlag('hukou_urban_migrant') },
  },

  {
    id: 'sl_apartheid_homeland',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1960 && G.currentYear <= 1990 &&
      G.age >= 18 && G.age <= 35 &&
      !['white_south_african'].includes(G.ethnicity) &&
      !G.mem?.sl_homeland,
    text: 'The government has declared that you are a citizen of Bophuthatswana. Bophuthatswana does not appear on the map of countries the United Nations recognises. It is a portion of the former South Africa that the apartheid government has designated as the homeland for people classified as Tswana. You have never lived in Bophuthatswana. Your parents have never lived in Bophuthatswana. The government has solved the political problem of Black South Africans by reclassifying them as citizens of countries that exist only on maps that the government drew.',
    choices: null,
    effect: (p) => { p.setMem('sl_homeland', true); p.m -= 6; p.e += 2; p.addFlag('experienced_discrimination') },
  },

  // ── FOLLOW-THROUGHS FOR BATCH 4 ──────────────────────────────────────────

  {
    id: 'sl_stasi_file_opened',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.flags.includes('informer_stasi') &&
      G.currentYear >= 1992 &&
      G.age >= 40 &&
      !G.mem?.sl_stasi_opened,
    text: 'The Gauck Authority is opening the files. Anyone can request their own file. Some of the people you worked with have requested theirs and your name appears in it. You know this because one of them told you, quietly, in a car park in the middle of the afternoon. You have not requested your own file. The file exists regardless of whether you read it. Your name is in it as a source. The person you reported on spent eight months in a Stasi detention facility. You knew, when you reported, that reporting had consequences. You chose not to know what the consequences were.',
    choices: [
      {
        text: 'Request your own file. See the full record.',
        tag: 'read',
        outcome: 'The file is sixty pages. Your own handwritten reports are in it. Reading your own handwriting describing your colleagues is a specific experience that you do not have language for and do not seek language for.',
        effect: (p) => { p.setMem('sl_stasi_opened', true); p.m -= 10; p.r += 15; p.karma -= 5; p.e += 2 },
      },
      {
        text: 'Do not request the file. You know what is in it.',
        tag: 'avoid',
        outcome: 'You do not read the file. The file persists. The people whose files you are in have read what you wrote. The not-reading changes nothing about that.',
        effect: (p) => { p.setMem('sl_stasi_opened', true); p.m -= 7; p.r += 18 },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // Y. ADOLESCENCE WITHOUT TRANSLATION — teen years across specific worlds
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_iran_cassette_tape',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1980 && G.currentYear <= 1999 &&
      G.age >= 13 && G.age <= 19 &&
      !G.mem?.sl_ir_cass,
    text: 'The cassette tapes came via cousins in Germany or through the bazaar in ways that did not require asking questions. Michael Jackson, Madonna, Metallica — contraband not because of the content specifically but because of the form, the western-ness of it. You had a Walkman and listened with one earbud and kept the other ear on the door. The arrangement between the private life and the public regime had this specific shape: you could have almost anything inside a room, provided the room was genuinely inside.',
    choices: null,
    effect: (p) => { p.setMem('sl_ir_cass', true); p.m += 4; p.s += 2; p.addFlag('private_public_split') },
  },

  {
    id: 'sl_nigeria_secondary_boarding',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 12 && G.age <= 17 &&
      G.stats.smarts >= 55 &&
      !G.mem?.sl_ng_board,
    text: 'The government secondary school is eight hours away by bus and you live there during term. The dormitory is forty boys and the prefect system means that power in the dormitory operates according to rules that the school handbook does not contain. You learn something about institutions in this dormitory that no classroom teaches: how authority distributes itself among people who have not been formally assigned it, and what the people at the bottom of that distribution experience. The education is happening in both rooms simultaneously.',
    choices: null,
    effect: (p) => { p.setMem('sl_ng_board', true); p.s += 4; p.e += 2; p.m += 2 },
  },

  {
    id: 'sl_brazil_baile_funk',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.ruralUrban === 'urban' &&
      G.stats.wealth <= 40 &&
      G.currentYear >= 1990 &&
      G.age >= 14 && G.age <= 20 &&
      !G.mem?.sl_br_funk,
    text: 'The baile funk starts at midnight and goes until dawn. The sound system is borrowed from the association and the lights are string lights and the street is blocked with bodies. The music is from the favela and about the favela and for the people of the favela and the Brazilian media describes it as dangerous. The dangerous thing, from where you are dancing, is the police checkpoint on the way home at five in the morning. The music is not dangerous. The music is the one place in the week where nothing is asking anything of you except to be there.',
    choices: null,
    effect: (p) => { p.setMem('sl_br_funk', true); p.m += 6; p.s += 3 },
  },

  {
    id: 'sl_china_gaokao_village',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1980 &&
      G.age >= 16 && G.age <= 19 &&
      !G.mem?.sl_cn_gaokao,
    text: 'The gaokao is the examination that determines the university and therefore the city and therefore the life you are able to have. Your county school has one teacher for three subjects and textbooks from five years ago. The students from the city schools have cram schools and tutors and full libraries. The examination is the same for everyone. The preparation is not the same for everyone. You sit the examination. You understand exactly what you are competing against. The understanding does not help you on the paper but it changes how you understand what the paper is.',
    choices: [
      {
        text: 'Take what the score gives you. Get to any city.',
        tag: 'accept',
        outcome: 'The score is enough for a third-tier city university. The third-tier city is still a city. You have crossed the line that your parents did not cross.',
        effect: (p) => { p.e += 3; p.m += 2; p.addFlag('first_gen_graduate'); p.addFlag('rural_urban_migrant'); p.setMem('sl_cn_gaokao', true) },
      },
      {
        text: 'Retake it next year. Study the entire year for one shot.',
        tag: 'retake',
        outcome: 'The year of studying is the most singular year of your life. The score improves. The university is better. The year cost something that the score does not record.',
        effect: (p) => { p.e += 5; p.m -= 3; p.addFlag('first_gen_graduate'); p.setMem('sl_cn_gaokao', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_egypt_mahraganat',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 2007 &&
      G.age >= 14 && G.age <= 21 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_eg_mahragan,
    text: 'The mahraganat music comes from the microphones of the wedding tents and the rooftop parties and the cheap phone speakers in the minibus. It is not approved of. The state radio does not play it. The cultural establishment considers it a problem. The problem plays on every phone in the informal neighborhoods at every hour. You know every word of songs that no official channel has ever broadcast. This is the first thing in your life that belongs entirely to people your age and your neighbourhood and no institution.',
    choices: null,
    effect: (p) => { p.setMem('sl_eg_mahragan', true); p.m += 5; p.s += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // Z. LATE-LIFE RECKONING — naming specific things at the end
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_late_life_country_question',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('emigrated') &&
      G.age >= 65 &&
      !G.mem?.sl_ll_country_q,
    text: 'The question of where you want to be buried comes up, not dramatically, but in a conversation about practicalities. You realise you have been living in this country for forty years and have not decided. The country you came from is a different country now — the government changed, the language changed slightly, the neighbourhood you were from has been rebuilt. The country you are in is where your children are. Both of these facts are simultaneously true and do not resolve into an answer.',
    choices: [
      {
        text: 'Here. The life was here. The end should be here.',
        tag: 'here',
        outcome: 'The decision, once made, is quieter than you expected. The children are relieved. The question does not come up again.',
        effect: (p) => { p.setMem('sl_ll_country_q', true); p.m += 4; p.addFlag('second_country_rooted') },
      },
      {
        text: 'There. Something should go back.',
        tag: 'there',
        outcome: 'The arrangement is made. The children don\'t fully understand. You don\'t fully explain it. The country you came from has been waiting in a specific way that you are only now admitting.',
        effect: (p) => { p.setMem('sl_ll_country_q', true); p.m += 2; p.r += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_late_regime_survived',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 65 &&
      G.flags.includes('dissident') &&
      !G.mem?.sl_ll_regime_surv,
    text: 'The regime is gone and you are still here. This was not the order you expected the events to come in. The people who were certain the regime would outlast them — who built their lives inside the assumption of its permanence — had to revise that assumption faster than it seemed possible to revise it. You are revised too, but differently. You spent years assuming you would not outlast it. You did. The surprise of that contains a kind of grief you have no good word for.',
    choices: null,
    effect: (p) => { p.setMem('sl_ll_regime_surv', true); p.m += 4; p.r += 5; p.e += 2; p.addFlag('outlasted_regime') },
  },

  {
    id: 'sl_late_language_last_speaker',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.includes('minority_language_speaker') &&
      G.age >= 70 &&
      !G.mem?.sl_ll_lang_last,
    text: 'Your grandchildren understand some words. They do not speak it. The language will continue in recordings and in academic papers and in the work of linguists who came to document it, which is a form of persistence that is different from the form you grew up in. You are not the last speaker — there are others your age — but you are aware that the number is specific and declining and that you know it in ways the recordings will not capture: the exact inflection for a certain kind of irony, the phrase for the particular feeling of returning to a place after a long absence and finding it changed.',
    choices: null,
    effect: (p) => { p.setMem('sl_ll_lang_last', true); p.m -= 3; p.e += 2; p.r += 6; p.addFlag('language_legacy_bearer') },
  },

  {
    id: 'sl_late_farm_handed_on',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.ruralUrban === 'rural' &&
      G.age >= 65 &&
      G.children?.length > 0 &&
      !G.mem?.sl_ll_farm_hand,
    text: 'The land transfer is a legal process that takes eight months and costs money you did not expect to spend and involves a surveyor who cannot find the boundary stones your grandfather put in, which are precisely where your grandfather said they would be. The document at the end says what has been true for forty years: this land is yours and now it is theirs. Your son does not plan to farm it. He plans to rent it. You understand the economics of his decision. You hold the document and think about the economics of your grandfather\'s decision and your father\'s decision and yours. The decisions accumulated into this moment, which is also an ending.',
    choices: null,
    effect: (p) => { p.setMem('sl_ll_farm_hand', true); p.m += 2; p.r += 8; p.addFlag('land_transferred') },
  },

  {
    id: 'sl_late_political_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 65 &&
      G.political_leaning !== null &&
      G.flags.includes('election_felt') &&
      !G.mem?.sl_ll_pol_reck,
    text: 'The politics you held in your thirties and the politics you hold now are not the same politics and you have not always been honest with yourself about why they changed. Some of the change is wisdom — the accumulation of evidence has updated the position. Some of the change is comfort — the positions that threatened what you had accumulated have become less appealing as what you have accumulated has grown. Distinguishing between the two kinds of change is the work. Most people do not do the work. You are attempting the work, which is better than most.',
    choices: null,
    effect: (p) => { p.setMem('sl_ll_pol_reck', true); p.m += 3; p.e += 3; p.r += 4; p.addFlag('examined_politics') },
  },

  {
    id: 'sl_late_grandchild_different_world',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 65 &&
      G.children?.length > 0 &&
      !G.mem?.sl_ll_gc_world,
    text: 'The grandchild asks what it was like before the internet and you understand, from the question, that what is being asked is what the world was like before something the child cannot imagine not existing. You describe it and the description sounds like deprivation: no instant access, no search, no way to find out immediately. What you cannot describe is what it felt like from inside — the specific texture of not-knowing that was ordinary rather than a failure of the system. The grandchild listens. The grandchild cannot imagine it. You realise you can no longer imagine it either.',
    choices: null,
    effect: (p) => { p.setMem('sl_ll_gc_world', true); p.m += 4; p.e += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AA. SPECIFIC INTERSECTIONS — combinations too precise for any other module
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_black_uk_professional',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1980 && G.currentYear <= 2010 &&
      G.age >= 22 && G.age <= 38 &&
      G.stats.smarts >= 65 &&
      G.career?.field &&
      G.flags.includes('experienced_discrimination') &&
      !G.mem?.sl_uk_bl_prof,
    text: 'The office has twelve people and you are the only Black person in it. You have been the only Black person in three consecutive jobs and you have learned what this means in practice: the specific exhaustion of being the one who gets asked to speak for a demographic, the meetings where you are not assumed to be the most senior person in the room until you speak, the calculation about whether to name what is happening or to let it pass, and the cost of both choices. Your CV is excellent. The excellence is not the whole story.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_bl_prof', true); p.m -= 4; p.e += 2; p.s += 2; p.addFlag('racial_tax_paid') },
  },

  {
    id: 'sl_india_disabled_family_shame',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 14 &&
      G.flags.includes('born_with_disability') &&
      !G.mem?.sl_in_dis_shame,
    text: 'The disability is not something the family discusses outside the house. The official position is that nothing is wrong, which means that nothing can be accommodated, which means that the accommodation happens privately and the private accommodation is not called accommodation. Your mother has organised the house around what you need and does not call it that. The neighbours do not know. Not knowing is the arrangement. The arrangement takes considerable energy to maintain and the energy comes entirely from your mother.',
    choices: null,
    effect: (p) => { p.setMem('sl_in_dis_shame', true); p.m -= 5; p.e += 2; p.addFlag('disability_hidden') },
  },

  {
    id: 'sl_hiv_africa_treatment',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      ['South Africa', 'Zimbabwe', 'Zambia', 'Uganda', 'Kenya', 'Tanzania', 'Nigeria', 'Ethiopia'].includes(G.character.country.name) &&
      G.currentYear >= 1995 && G.currentYear <= 2010 &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.sl_hiv_treat &&
      Math.random() < 0.12,
    text: 'The test came back positive and the treatment was not available yet in this country — the antiretrovirals were available in Europe and the United States at a price that was eight times the annual income of most people in this country, and the pharmaceutical companies were still negotiating whether a different price applied here. The government was also still negotiating its official position on the connection between HIV and AIDS. You were not part of the negotiation. You were the thing the negotiation was about.',
    choices: [
      {
        text: 'Get into a trial programme or NGO treatment scheme.',
        tag: 'treatment',
        outcome: 'The treatment works. The virus is suppressed. The work of staying in the programme is significant and ongoing and the management of it is now a permanent part of your life.',
        effect: (p) => { p.setMem('sl_hiv_treat', true); p.h -= 5; p.addCondition('hiv_managed', 'mild'); p.addFlag('hiv_positive_managed') },
      },
      {
        text: 'Wait and navigate the official system as it develops.',
        tag: 'wait',
        outcome: 'The treatment arrives in the public system two years later. Two years is a long time to wait in a body with untreated HIV in 2001. The treatment works when it arrives.',
        effect: (p) => { p.setMem('sl_hiv_treat', true); p.h -= 12; p.addCondition('hiv_managed', 'moderate'); p.addFlag('hiv_positive_managed') },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_philippines_beauty_pageant',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.character.gender === 'female' &&
      G.age >= 14 && G.age <= 20 &&
      G.stats.looks >= 65 &&
      !G.mem?.sl_ph_pageant,
    text: 'The barangay fiesta has a queen contest and the barangay captain has nominated you and your mother has said yes before asking you. The preparation involves a sponsor, who is the daughter of the captain, and a costume, and learning to walk in a way you do not normally walk, and a response to the question "What does beauty mean to you?" which you are required to give in a particular format. You win. The winning is good for your mother. You understand that you have been useful to people around you in a way that you will spend the next several years working out your feelings about.',
    choices: null,
    effect: (p) => { p.setMem('sl_ph_pageant', true); p.lo += 3; p.s += 3; p.m -= 2; p.addFlag('beauty_capital_used') },
  },

  {
    id: 'sl_latin_america_maid',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Colombia', 'Peru', 'Brazil', 'Mexico', 'Bolivia', 'Ecuador', 'Paraguay'].includes(G.character.country.name) &&
      G.character.gender === 'female' &&
      G.ruralUrban === 'urban' &&
      G.stats.wealth <= 30 &&
      G.age >= 16 && G.age <= 30 &&
      !G.career?.id &&
      !G.mem?.sl_la_maid,
    text: 'The employer is a family in the nice part of the city. You live in the house, in the maid\'s room off the kitchen. The maid\'s room is small and has a different bathroom from the rest of the house and your day off is Sunday from noon, which is the arrangement and you understood the arrangement when you took the position. The children of the family know your name. The adults of the family sometimes do not use it. The legal protections for domestic workers in this country are on paper in ways that do not yet reliably reach the kitchen.',
    choices: null,
    effect: (p) => { p.setMem('sl_la_maid', true); p.mo += 1800; p.m -= 4; p.addFlag('domestic_worker') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BB. INDIGENOUS EDUCATION — assimilation machinery at work on specific bodies
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_native_boarding_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity?.includes('indigenous') &&
      G.currentYear >= 1930 && G.currentYear <= 1978 &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.sl_native_board,
    text: 'The school is a federal Indian boarding school five hundred miles from the reservation and you were taken there by the agency on a bus that stopped at six other reservations before yours. The rules: no Indian language, no Indian clothes, no Indian names. Your name is now Robert. The school has a marching band and a football team and a curriculum designed to prepare you for assimilation into a labour market that will not fully accept you regardless. You learn to read. You learn to be Robert. The cost of the reading and the cost of being Robert arrive at different speeds.',
    choices: null,
    effect: (p) => { p.setMem('sl_native_board', true); p.e += 5; p.m -= 10; p.s -= 3; p.addFlag('boarding_school_indigenous') },
  },

  {
    id: 'sl_native_boarding_school_followthrough',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('boarding_school_indigenous') &&
      G.age >= 20 && G.age <= 30 &&
      !G.mem?.sl_native_board_ft,
    text: 'You know the language of the country. You know how the paperwork works and what the forms are asking. You know what the men at the agency expect you to say and how to say it. What you do not know — what was not taught — is the language your grandparents spoke to each other, the ceremonies that correspond to the months, the specific knowledge of how the land you come from names itself. The boarding school did its job. The job was not yours.',
    choices: null,
    effect: (p) => { p.setMem('sl_native_board_ft', true); p.m -= 5; p.e += 2; p.r += 8; p.addFlag('cultural_erasure_lived') },
  },

  {
    id: 'sl_aboriginal_mission',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.ethnicity?.includes('indigenous') &&
      G.currentYear >= 1920 && G.currentYear <= 1970 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.sl_ab_mission,
    text: 'The mission station is where the government determined you should live. The rations come on Thursdays. There is a church and a school and a dormitory for children whose parents are classified as Aboriginal, which includes you. The manager of the mission has authority over where you go, who you marry, and whether your wages reach you or are held in a trust account that you will spend decades trying to reclaim. The word for what this is will not be officially used until 2008, when the Prime Minister says sorry in Parliament and you are sixty years old.',
    choices: null,
    effect: (p) => { p.setMem('sl_ab_mission', true); p.m -= 8; p.h -= 3; p.e += 2; p.addFlag('mission_station_raised') },
  },

  {
    id: 'sl_maori_language_nest',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'New Zealand' &&
      G.ethnicity?.includes('indigenous') &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 4 && G.age <= 10 &&
      !G.mem?.sl_maori_kohanga,
    text: 'Te kōhanga reo is where you learn te reo Māori in the years before school. Your parents speak it only partly — their parents\' generation was told not to, and the instruction was followed. You are the reversal: the generation that will know the language that the generation before almost lost. There are not enough fluent speakers to staff all the kōhanga that want to open. Your teacher is an elder. The elder is seventy-four. The urgency of the transfer is not explained to you because you are four years old, but the elder knows exactly how urgent it is.',
    choices: null,
    effect: (p) => { p.setMem('sl_maori_kohanga', true); p.e += 5; p.s += 3; p.m += 4; p.addFlag('indigenous_language_reclaimed') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CC. SOVIET REPRESSION VARIANTS — the machinery of the state against the mind
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_soviet_punitive_psychiatry',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1960 && G.currentYear <= 1986 &&
      G.age >= 20 && G.age <= 40 &&
      (G.political_leaning === 'dissident' || G.flags.includes('dissident')) &&
      !G.mem?.sl_sov_psych,
    text: 'The diagnosis is "sluggish schizophrenia," a category that exists in Soviet psychiatry and nowhere else in the world, because the symptoms of sluggish schizophrenia include believing that the Soviet system is unjust. You are committed to the Serbsky Centre for commitment processing. The doctors are doctors and the hospital is a hospital and the treatments are medical treatments. None of them are metaphors. You are released after fourteen months. The release condition is that you stop talking about what happened here, which is also not a metaphor.',
    choices: null,
    effect: (p) => { p.setMem('sl_sov_psych', true); p.m -= 15; p.h -= 8; p.e += 3; p.addFlag('punitive_psychiatry_survived') },
  },

  {
    id: 'sl_gulag_camp_born',
    phase: 'early_childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1930 && G.currentYear <= 1955 &&
      G.age <= 5 &&
      G.flags.includes('orphan') &&
      !G.mem?.sl_gulag_child,
    text: 'Your mother was a prisoner in the camp when you were born. The camp had a nursery for the children of prisoners, which is a sentence that requires reading twice. She was released when you were two. She found you three years later in the state orphanage where the children of female prisoners were taken. You do not remember her absence. She remembers it exactly.',
    choices: null,
    effect: (p) => { p.setMem('sl_gulag_child', true); p.m -= 6; p.h -= 3; p.addFlag('gulag_birth_generation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DD. TIBETAN EXILE — the generation born outside the country
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_tibetan_dharamsala_childhood',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.ethnicity === 'tibetan' &&
      G.currentYear >= 1965 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_tib_dharam,
    text: 'Dharamsala is where Tibetans in exile go, and you were born here, which means you are a Tibetan who has never been to Tibet. The school teaches Tibetan history and Tibetan language and Tibetan geography, because the Tibetan government-in-exile has decided the children must know a country they have not seen. You know the names of the cities. You have never been to them. The adults around you are oriented toward a return that has not happened in forty years and may not happen in your lifetime. You love the mountains you grew up in. They are not, technically, your mountains.',
    choices: null,
    effect: (p) => { p.setMem('sl_tib_dharam', true); p.e += 4; p.m += 2; p.r += 4; p.addFlag('exile_generation_tibetan') },
  },

  {
    id: 'sl_tibetan_self_immolation_witness',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.character.country.name === 'India' || G.character.country.name === 'China') &&
      G.ethnicity === 'tibetan' &&
      G.currentYear >= 2008 && G.currentYear <= 2022 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_tib_immolation,
    text: 'The news comes from someone who saw it. A monk, or a nun, or a young person — there have been more than a hundred and fifty. They burned themselves in the streets of Tibetan towns as a political act, which the Chinese government calls terrorism and the exile community calls witness. You hear about it through the phone, through the diaspora network, through the community in Dharamsala passing the information along. The information arrives with grief and arrives with the weight of something you are not sure how to carry.',
    choices: null,
    effect: (p) => { p.setMem('sl_tib_immolation', true); p.m -= 8; p.r += 6; p.addFlag('witnessed_extreme_witness') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EE. BENGAL PARTITION 1947 — the other partition nobody made films about
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_bengal_partition_hindu',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1947 && G.currentYear <= 1955 &&
      G.age >= 4 && G.age <= 12 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_bengal_part_h,
    text: 'The village is in East Bengal, which is now East Pakistan, which means it is no longer a place where your family can remain. The people who made the line through Bengal made it in London, on a map, in six weeks. The line went through rivers and rice fields and the middle of market towns and your village is now on the wrong side of it. The move to West Bengal takes three months and the house you move into is not your house and the district is not your district and the language is Bengali everywhere, which should help but does not, because what you miss is the specific geography of the place the line went through.',
    choices: null,
    effect: (p) => { p.setMem('sl_bengal_part_h', true); p.m -= 8; p.r += 6; p.addFlag('bengal_partition_displaced') },
  },

  {
    id: 'sl_sindhi_hindu_refugee',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1947 && G.currentYear <= 1960 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('bengal_partition_displaced') &&
      !G.mem?.sl_sindhi_bombay,
    text: 'In Bombay the Sindhi Hindu refugees are called refugees even though Bombay is technically their country now. The camp in Ulhasnagar was built for them. Your family builds something there that is not quite a business and not quite a community organisation but is the thing that keeps the community from disintegrating, which is what displaced communities mostly need: someone willing to hold the structure before the structure becomes formal. The Sindhi trader network is older than Pakistan. You are rebuilding it here.',
    choices: null,
    effect: (p) => { p.setMem('sl_sindhi_bombay', true); p.s += 4; p.m += 2; p.mo += 2000; p.addFlag('refugee_rebuilt_network') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FF. PACIFIC IDENTITIES — the worlds the ocean separates and connects
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_png_first_contact_generation',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Papua New Guinea' &&
      G.currentYear >= 1940 && G.currentYear <= 1970 &&
      G.ruralUrban === 'rural' &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_png_first,
    text: 'The first Australians your village saw came up from the coast in 1948 carrying medicine and a flagpole. Your father had already seen them — he had walked down to the patrol post once, out of curiosity, and come back with a piece of cloth and no particular judgment. What the patrol post represents — an administration, a territory, an eventual independence — is not yet something your village has a word for. What it represents in your grandfather\'s memory is something older and more complicated. The mission school comes in 1952. You are one of the first children to go.',
    choices: null,
    effect: (p) => { p.setMem('sl_png_first', true); p.e += 4; p.m += 2; p.addFlag('colonial_contact_generation') },
  },

  {
    id: 'sl_samoan_fa_afafine',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      ['Samoa', 'American Samoa', 'New Zealand', 'Australia'].includes(G.character.country.name) &&
      G.character.gender === 'male' &&
      G.age >= 13 && G.age <= 18 &&
      !G.mem?.sl_samoa_faf,
    text: 'Fa\'afafine is the third gender category that has existed in Samoan culture for longer than the modern words for what it is. It is not a translation of anything from outside — it is Samoan, with its own obligations and its own social role, which includes care of the extended family and certain ceremonial functions. You have known what you are since before you had the word for it. The word was there when you reached it. In the diaspora, in Auckland or Sydney, what you are requires translation. In Samoa, it does not.',
    choices: null,
    effect: (p) => { p.setMem('sl_samoa_faf', true); p.s += 5; p.m += 3; p.addFlag('third_gender_traditional') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GG. EXTRACTION ECONOMIES — what the ground costs the body
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_drc_cobalt_miner',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Democratic Republic of Congo' &&
      G.currentYear >= 2000 && G.currentYear <= 2025 &&
      G.age >= 16 && G.age <= 35 &&
      G.stats.wealth <= 25 &&
      !G.mem?.sl_drc_cobalt,
    text: 'The cobalt mine in the Katanga is called artisanal, which means you dig it by hand with a pick and a sack and no machinery and no protective equipment and no employment contract. The company that sells the cobalt is not called artisanal. The battery in the phone of the person who bought the battery that contains this cobalt is not called artisanal either. You earn between one and three dollars a day depending on what you find. The mine is not safe. Everyone in the mine knows the mine is not safe. The alternative to the mine, in this town, in this year, is worse than the mine.',
    choices: null,
    effect: (p) => { p.setMem('sl_drc_cobalt', true); p.h -= 6; p.mo += 600; p.addFlag('artisanal_miner') },
  },

  {
    id: 'sl_bolivian_tin_miner_lung',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bolivia' &&
      G.ruralUrban !== 'urban' &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.sl_bol_lung,
    text: 'The diagnosis is silicosis and the doctor says it in a tone that is not hopeful, which tells you everything the word itself doesn\'t. Silicosis is what happens when you breathe rock dust for twenty years in a Potosí tin mine. The Potosí tin mines have been producing silicosis since before the word silicosis existed — the Spanish colonial records called it "the miner\'s disease" and the miner\'s disease was also what killed your father. You are forty-one. The doctor says to stop working in the mine. What the doctor does not say is how a man in Potosí stops working in the mine.',
    choices: null,
    effect: (p) => { p.setMem('sl_bol_lung', true); p.h -= 15; p.m -= 6; p.addCondition('silicosis', 'moderate') },
  },

  {
    id: 'sl_niger_delta_oil_community',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1980 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_niger_delta,
    text: 'The creek behind the village has oil in it. It has had oil in it since the spill in 1983, which was not cleaned up because the cleanup that was done was the official cleanup that documented the cleanup rather than the cleanup that removed the oil. The fishing is reduced. The soil is reduced. The company that spilled the oil has a community development fund that built a school with a roof that leaks and then built a health clinic with no doctor and then built a road that ends before the market. You are the generation that has grown up beside an oil industry that extracts from the land you live on and deposits the money somewhere you are not.',
    choices: null,
    effect: (p) => { p.setMem('sl_niger_delta', true); p.m -= 5; p.h -= 3; p.e += 3; p.addFlag('extraction_community') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HH. WOMEN IN PROFESSIONS — the specific physics of being first
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_soviet_woman_scientist',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1955 && G.currentYear <= 1985 &&
      G.age >= 22 && G.age <= 35 &&
      G.stats.smarts >= 70 &&
      G.career?.field === 'science' &&
      !G.mem?.sl_sov_woman_sci,
    text: 'The Soviet Union trained women as engineers and scientists and doctors at rates that Western countries would not match for decades, which is something you did not know until you read it, because from inside it looked like a laboratory where the women were expected to be excellent at physics and also to do all the domestic labour and also not to have careers that outpaced their husbands\' careers. The state policy was equality. The state policy was not the house. The house was not the policy. You are excellent at physics. The rest is navigation.',
    choices: null,
    effect: (p) => { p.setMem('sl_sov_woman_sci', true); p.e += 4; p.m -= 3; p.s += 2; p.addFlag('professional_woman_trailblazer') },
  },

  {
    id: 'sl_wartime_factory_woman_uk',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1940 && G.currentYear <= 1946 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_uk_factory_w,
    text: 'The factory makes Spitfire parts and the shift is ten hours and you are good at it. You are better at it than the man who had this job before the war, which is not something anyone says officially. The wage is less than the man\'s wage by three shillings, which you know because Mary in assembly told you. The foreman says you\'re a natural. The men coming back from the fronts in 1945 are given their jobs back, which is the law, and you go back to the house, which is not the law but is what happens. You are a natural. You were not kept.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_factory_w', true); p.e += 3; p.m -= 4; p.r += 6; p.addFlag('wartime_labour_displaced') },
  },

  {
    id: 'sl_first_female_doctor_iran',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1970 && G.currentYear <= 1985 &&
      G.age >= 22 && G.age <= 32 &&
      G.stats.smarts >= 75 &&
      G.career?.field === 'healthcare' &&
      !G.mem?.sl_ir_woman_doc,
    text: 'You graduated from medical school in 1977 and the revolution came in 1979 and the question of whether women doctors could practice was contested and then settled and then unsettled again over three years. You practiced during the settling. You practiced during the unsettling. You kept your head covering and your credentials and your consulting room and the patients, who are mostly women and who need you, came and kept coming. The history of women in medicine in the Islamic Republic is not the history they write. It is this: a great deal of practice, continued under conditions that required continuous negotiation.',
    choices: null,
    effect: (p) => { p.setMem('sl_ir_woman_doc', true); p.e += 3; p.s += 3; p.m += 2; p.addFlag('professional_woman_islamic_republic') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // II. COMMUNE AND COLLECTIVE — the utopia tried and found complicated
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_kibbutz_second_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Israel' &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 30 &&
      G.religion === 'jewish' &&
      !G.mem?.sl_kibbutz_2gen,
    text: 'Your parents founded the kibbutz — or rather, your parents\' generation founded it, when founding kibbutzim was what you did if you were a young Zionist in 1948 and you believed in collective ownership and socialist labour and children raised in communal children\'s houses. You were raised in the communal children\'s house. The communal children\'s house is now being disbanded because it turned out that many of the people who chose collective ownership wanted their children to sleep in the same house as them, which is not a small thing to discover about yourself forty years into an experiment. The kibbutz is privatising. Your parents are disappointed. You are, carefully, relieved.',
    choices: null,
    effect: (p) => { p.setMem('sl_kibbutz_2gen', true); p.m += 3; p.e += 3; p.r += 4; p.addFlag('kibbutz_privatisation_generation') },
  },

  {
    id: 'sl_us_commune_child',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1967 && G.currentYear <= 1980 &&
      G.age >= 6 && G.age <= 14 &&
      G.stats.wealth >= 30 && G.stats.wealth <= 60 &&
      !G.mem?.sl_us_commune,
    text: 'The commune is twelve adults and their children on forty acres in Vermont. There are goats. There is a garden that produces insufficient vegetables and a philosophy that produces considerable discussion. The adults take turns cooking and rotating chores and having disagreements about the chores and the cooking and what the commune is for. You grow up with six other children who are not your siblings but are something closer than friends. This will be the social arrangement you spend the rest of your life comparing other social arrangements to, not always favourably, not always unfavourably.',
    choices: null,
    effect: (p) => { p.setMem('sl_us_commune', true); p.s += 4; p.m += 2; p.e += 2; p.addFlag('commune_childhood') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JJ. CHILDREN OF WAR — what the violence looks like from four feet high
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_lebanon_war_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Lebanon' &&
      G.currentYear >= 1976 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 14 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_leb_war_child,
    text: 'You know which sounds to sleep through and which sounds require moving to the corridor, which is the interior wall and therefore the safest place in the apartment. You know this the way you know how to read — not through being taught but through repetition until it becomes automatic. The school opens when the shelling is in the south. It closes when the militias move into the neighbourhood. Your childhood has the shape of a civil war: not one violent event but the ordinary texture of violence spread across ten years of growing up, such that the violence is not the exception but the weather.',
    choices: null,
    effect: (p) => { p.setMem('sl_leb_war_child', true); p.m -= 8; p.h -= 3; p.e += 3; p.addFlag('civil_war_childhood') },
  },

  {
    id: 'sl_guatemala_maya_massacre',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Guatemala' &&
      G.ethnicity?.includes('indigenous') &&
      G.currentYear >= 1978 && G.currentYear <= 1984 &&
      G.age >= 6 && G.age <= 14 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_guat_maya,
    text: 'The soldiers came to the village in the scorched earth campaign of 1981. The army called it a counterinsurgency operation. The truth commission called it genocide. You were eight years old and you hid in the corn with your cousin. They burned the houses. Forty-three villages in this region were destroyed that year and the official position was that the army was fighting Marxist guerrillas and the Marxist guerrillas were the Ixil Maya people, which is what the scorched earth policy believed. The corn was high. Your cousin put her hand over your mouth.',
    choices: null,
    effect: (p) => { p.setMem('sl_guat_maya', true); p.m -= 15; p.h -= 5; p.r += 8; p.addFlag('genocide_survivor') },
  },

  {
    id: 'sl_sarajevo_siege_teenager',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bosnia and Herzegovina' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 13 && G.age <= 18 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_sarajevo_siege,
    text: 'The siege of Sarajevo lasts 1,425 days. You are thirteen when it begins and sixteen when it ends, which means your adolescence is inside the siege. You go to school in the basement of the school building because the classrooms have windows and the windows are sniper angles. You do homework by candlelight because the power is off. The teachers come even when it is dangerous to come, which is most days. There is a girl you like. There is music you listen to on a battery radio. There are things that are normal inside the siege that will be strange to explain to anyone who was not here. You will spend the rest of your life having to explain.',
    choices: null,
    effect: (p) => { p.setMem('sl_sarajevo_siege', true); p.m -= 10; p.e += 4; p.r += 6; p.addFlag('siege_adolescence') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // KK. GENERATIONAL ECONOMIC FORECLOSURE — the door that was open and shut
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_japan_herbivore_men',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.character.gender === 'male' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.sl_jp_herbivore,
    text: 'The word the media uses for men like you is sōshoku-kei, herbivore men — men who are not aggressive about career, not aggressive about dating, not interested in the lifetime employment and the company loyalty and the two hours of mandatory drinking with superiors that your father\'s generation understood as masculinity. The word is used by commentators as a diagnosis. You use it as a description of a rational response to an economy that will not give you what it gave your father regardless of how aggressive you are. The lifetime employment tracks are closed. The housing is unaffordable. The herbivore is not a failure of ambition. It is a response to a specific set of available options.',
    choices: null,
    effect: (p) => { p.setMem('sl_jp_herbivore', true); p.m += 2; p.e += 3; p.addFlag('precariat_generation') },
  },

  {
    id: 'sl_south_korea_sampo_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear >= 2010 && G.currentYear <= 2025 &&
      G.age >= 22 && G.age <= 35 &&
      G.stats.smarts >= 60 &&
      !G.mem?.sl_kr_sampo,
    text: 'Sampo means giving up. The sampo generation is the generation that has given up three things: dating, marriage, and children. The next generation gave up two more: home ownership and employment with benefits. The five-renunciation generation. The education system said: study. The economy said: the jobs you studied for are not available. The housing market said: the city you studied in is not affordable. The marriage market said: marriage requires income and housing and stability. The combination is not a personal failure of ambition. It is a closing of doors that the previous generation walked through when the doors were open. You are the person who arrived when they closed.',
    choices: null,
    effect: (p) => { p.setMem('sl_kr_sampo', true); p.m -= 4; p.e += 3; p.r += 5; p.addFlag('sampo_generation') },
  },

  {
    id: 'sl_greek_crisis_doctor_leaves',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 2010 && G.currentYear <= 2018 &&
      G.age >= 25 && G.age <= 38 &&
      G.stats.smarts >= 65 &&
      (G.career?.field === 'healthcare' || G.career?.field === 'science') &&
      !G.mem?.sl_gr_doctor,
    text: 'The austerity has cut hospital wages by forty percent and cut hospital supplies by a percentage you do not measure in numbers but in the specific absence of things you need to do the job: anaesthesia in sufficient supply, bandages in sufficient supply, a functioning MRI that is not waiting for a part that cannot be ordered because the budget for ordering parts has been cut. You are a doctor who trained for seven years in this country and you are now considering Germany, where they are advertising for Greek doctors in Greek, which tells you something about how clearly they have read the situation. You love this country. That is the part that makes it complicated.',
    choices: [
      {
        text: 'Go to Germany. The practice will be better. The life will be elsewhere.',
        tag: 'leave',
        outcome: 'Munich is efficient and the hospital is well-supplied and the pay is four times what you were making in Athens. You send money home. You become the brain drain statistic that the commentators write about. You do good work.',
        effect: (p) => { p.setMem('sl_gr_doctor', true); p.mo += 15000; p.m -= 4; p.addFlag('emigrated'); p.addFlag('brain_drain_participant') },
      },
      {
        text: 'Stay. The patients here need you.',
        tag: 'stay',
        outcome: 'The conditions do not improve for three years. You find workarounds and manage deficits and do the work with what is available. The patients are grateful. The system is still broken. Both things are true.',
        effect: (p) => { p.setMem('sl_gr_doctor', true); p.h -= 5; p.m -= 3; p.karma += 5; p.addFlag('stayed_through_crisis') },
      },
    ],
    effect: null,
  },

  {
    id: 'sl_uk_generation_rent',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2008 && G.currentYear <= 2025 &&
      G.age >= 25 && G.age <= 40 &&
      G.stats.wealth <= 45 &&
      G.career?.field !== 'finance' &&
      !G.mem?.sl_uk_gen_rent,
    text: 'The house your parents bought in 1987 for fifty thousand pounds is now worth six hundred and fifty thousand pounds, which is the result of a policy environment that treated housing as an asset class rather than a place to live. You earn adequately. You cannot buy. The deposit required is the amount your parents paid for the house. You rent. Your rent is higher than a mortgage payment would be for the same property. The people who own the property you rent bought it with a mortgage. The mortgage is now paid by you. This is not a mystery. This is arithmetic. You are doing the arithmetic in your thirties and finding it both clarifying and enraging.',
    choices: null,
    effect: (p) => { p.setMem('sl_uk_gen_rent', true); p.m -= 4; p.e += 3; p.r += 4; p.addFlag('generation_rent') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LL. COLD WAR SPECIFIC LIVES — the specific family shapes the conflict made
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_us_nuclear_family_1950s',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1950 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 14 &&
      G.ruralUrban !== 'rural' &&
      !G.mem?.sl_us_duck_cover,
    text: 'In school they teach duck-and-cover, which is the instruction to get under your desk and put your arms over your head in the event of a nuclear attack. Your teacher shows the film where the turtle hides in his shell. You and your classmates practise. The desk is made of wood. You are nine years old and you understand, from the gap between the danger described and the protection offered, that the adults are frightened but cannot say so. Duck-and-cover is what you do when there is nothing you can do and you need something to tell the children.',
    choices: null,
    effect: (p) => { p.setMem('sl_us_duck_cover', true); p.m -= 3; p.e += 3; p.addFlag('cold_war_childhood') },
  },

  {
    id: 'sl_us_cold_war_nuclear_family',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 22 && G.age <= 35 &&
      G.flags.includes('cold_war_childhood') &&
      !G.mem?.sl_us_bomb_shelter,
    text: 'Your father built a fallout shelter in the backyard in 1961, the year of Berlin. He stocked it with canned goods and water and a transistor radio and the family has never discussed it directly. The shelter exists. The canned goods exist. The radio exists. The conversation about what the shelter means — the specific calculations your father made about survival and about what would be worth surviving into — has not happened and will not happen. The shelter is the conversation your family is not having. You mow around it on Saturdays.',
    choices: null,
    effect: (p) => { p.setMem('sl_us_bomb_shelter', true); p.e += 3; p.r += 4; p.m += 1 },
  },

  {
    id: 'sl_chile_exile_europe',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Germany', 'Sweden', 'France', 'Netherlands', 'United Kingdom'].includes(G.character.country.name) &&
      G.currentYear >= 1974 && G.currentYear <= 1990 &&
      G.age >= 22 && G.age <= 40 &&
      G.flags.includes('emigrated') &&
      G.flags.includes('dissident') &&
      !G.mem?.sl_chile_exile,
    text: 'The Swedish solidarity network found you at the airport in 1974 and the people in the committee spoke Spanish with a German or a Swedish accent and they were very kind and they helped with everything they could help with and there were things they could not help with, which are the things inside. You are welcome here. The welcome is real. There are other Chileans in this city — there are Chilean exile communities in every European city — and you find them and the finding is not quite reunion because you were not in the same places in Chile but you have the same shape of absence.',
    choices: null,
    effect: (p) => { p.setMem('sl_chile_exile', true); p.m -= 3; p.s += 3; p.addFlag('exile_community_network') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MM. VIETNAM RE-EDUCATION — the family split by which side they were on
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_vietnam_reeducation_family',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1976 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 14 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_viet_reedu,
    text: 'Your father went to the re-education camp in 1975. The camp is called a re-education camp, which is the official name for the detention of South Vietnamese military officers and government employees and civil servants and anyone else the new government determined required political re-education. He has been there for three years. You write him letters that take two months to arrive. He writes back in careful language that you understand is the language of someone being monitored. The letters are not the letters he would write if no one were reading them. You know this. He knows you know this. The letters continue.',
    choices: null,
    effect: (p) => { p.setMem('sl_viet_reedu', true); p.m -= 8; p.e += 3; p.r += 5; p.addFlag('reeducation_camp_family') },
  },

  {
    id: 'sl_vietnam_reeducation_return',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.flags.includes('reeducation_camp_family') &&
      G.character.country.name === 'Vietnam' &&
      G.age >= 14 && G.age <= 20 &&
      !G.mem?.sl_viet_reedu_return,
    text: 'Your father came home from the re-education camp when you were fourteen. He was there for seven years. The person who came home is your father but the seven years are inside him in a way that he does not describe and that you can see without him describing. He is thin in a particular way. He speaks carefully in a way that does not stop when the officials are not present. The careful speaking has become permanent. You sit across from him at the dinner table and try to find the father who wrote the monitored letters in the person who is now here, who is careful, who is thin, who is home.',
    choices: null,
    effect: (p) => { p.setMem('sl_viet_reedu_return', true); p.m -= 4; p.e += 3; p.r += 6 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NN. SOUTH ASIAN HIJRA — the initiation and the life it opens and closes
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_hijra_initiation',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      ['India', 'Pakistan', 'Bangladesh'].includes(G.character.country.name) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 14 && G.age <= 22 &&
      !G.mem?.sl_hijra_init,
    text: 'The hijra community found you, or you found them, or both — the finding is mutual when the person who is found has been visible in ways they did not intend. The guru is a woman of perhaps fifty and she knows what you are before you have said it and she says it in the language that is used inside the community, which is not Hindi or Urdu or Bengali but the argot that hijras use among themselves, which has been passed down inside the community for as long as there has been a community, which is a very long time. The initiation is a ceremony and a commitment. What it opens: belonging. What it closes: most employment in the formal economy, most family acceptance, most futures the society considers normal. Both things are real.',
    choices: null,
    effect: (p) => { p.setMem('sl_hijra_init', true); p.s += 5; p.m += 3; p.mo -= 500; p.addFlag('hijra_community') },
  },

  {
    id: 'sl_hijra_blessing_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('hijra_community') &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.sl_hijra_work,
    text: 'The work is blessings at weddings and births — the clapping that enters the house before you do, the specific blessing that comes from a hijra at a birth, which the family will pay for because the blessing is auspicious and the refusing of the blessing is also considered to have consequences. The theology of this is not simple. You are sacred in one context and humiliated in another and the transition between the two contexts can happen within the same afternoon in the same neighbourhood. The income is real. The dignity in it is real. The other thing is also real.',
    choices: null,
    effect: (p) => { p.setMem('sl_hijra_work', true); p.mo += 2500; p.m += 2; p.s += 2 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OO. BANGLADESHI CYCLONE — what the body learns from water
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_bangladesh_bhola_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1970 && G.currentYear <= 1972 &&
      G.ruralUrban === 'rural' &&
      G.age >= 4 && G.age <= 12 &&
      !G.mem?.sl_bng_bhola,
    text: 'The Bhola cyclone of November 1970 kills between three hundred thousand and five hundred thousand people. The number is imprecise because the counting in the delta is imprecise and because the government in West Pakistan was slow to respond and the slowness of the response became one of the facts that led to the independence of Bangladesh the following year. You are in the delta when the cyclone comes. The water comes from the sea through the mangroves and through the streets at a speed and a depth that is not water the way you know water — it is the sea, which is a different thing. You survive. The number of people you know who do not survive is a number you carry.',
    choices: null,
    effect: (p) => { p.setMem('sl_bng_bhola', true); p.m -= 12; p.h -= 4; p.r += 8; p.addFlag('cyclone_survivor') },
  },

  {
    id: 'sl_bangladesh_cyclone_annual',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.flags.includes('cyclone_survivor') &&
      G.ruralUrban === 'rural' &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sl_bng_cy_annual,
    text: 'The cyclone season runs from May to November and every year the radio says watch the coast and every year you do. The preparation is: know which relatives live on higher ground, know where the boat is, know which things can be carried and which cannot. The things that cannot be carried are most things. You have learned to not build too much attachment into the things that cannot be carried. The attachment goes into the people, which is where you can carry it.',
    choices: null,
    effect: (p) => { p.setMem('sl_bng_cy_annual', true); p.e += 2; p.s += 2; p.r += 3 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PP. MEIJI-ERA JAPANESE DIASPORA — the families that went to Hawaii
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_japanese_hawaii_issei',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'japanese' &&
      G.currentYear >= 1900 && G.currentYear <= 1924 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_jp_hawaii,
    text: 'The labor contract brought you to the sugarcane fields of Maui from Hiroshima prefecture in 1910, which was two years before the Meiji Emperor died and the country you came from became a different country. The plantation has barracks organised by ethnic origin — Filipino barracks, Puerto Rican barracks, Japanese barracks — and the pay is different by ethnic origin too, which is a system that the plantation operators consider rational and the workers consider something else. The Japanese workers have a word: issei, first generation. You are issei. Your children, if you have them here, will be nisei. The generations are already named. The country is already organising you into a category.',
    choices: null,
    effect: (p) => { p.setMem('sl_jp_hawaii', true); p.h -= 3; p.mo += 1500; p.addFlag('issei_generation') },
  },

  {
    id: 'sl_japanese_american_internment',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'japanese' &&
      G.currentYear >= 1942 && G.currentYear <= 1945 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.sl_ja_intern,
    text: 'Executive Order 9066 requires you to report to the assembly centre. You are American. You were born in California. You speak English without an accent. None of these things affect the application of the order. The assembly centre is at the fairgrounds and then the internment camp is in the desert — one of ten camps for a hundred and twenty thousand Japanese Americans, two-thirds of whom are citizens. You sell the truck for what you can get in three days, which is less than it is worth. The camp has a tar-paper barrack and a mess hall and a school. You get out in 1945 and find someone else is in the house.',
    choices: null,
    effect: (p) => { p.setMem('sl_ja_intern', true); p.m -= 12; p.mo -= 3000; p.h -= 4; p.addFlag('japanese_american_internment') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QQ. NIGERIAN PENTECOSTALISM — prosperity gospel at the family dinner table
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_nigeria_pentecostal_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.religion === 'christian_pentecostal' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_ng_pent_child,
    text: 'Sunday is eight hours: morning service, children\'s church, afternoon service, evening prayer. The church is a warehouse that has been made into something more than a warehouse by the congregation\'s attention — the painted walls, the sound system, the ushers in their white gloves who know your family\'s tithe level and who seat you accordingly. You grow up knowing that breakthrough is coming and that faith is the mechanism and that the breakthrough of your family is tied to the breakthrough of the pastor\'s vision, which is tied to the building fund. The building fund is mentioned every Sunday. The building has been under construction for twelve years. The faith is genuine. Both things are true.',
    choices: null,
    effect: (p) => { p.setMem('sl_ng_pent_child', true); p.s += 3; p.m += 2; p.e += 2; p.addFlag('pentecostal_childhood') },
  },

  {
    id: 'sl_nigeria_pentecostal_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.flags.includes('pentecostal_childhood') &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem?.sl_ng_pent_adult,
    text: 'The prosperity gospel says that faith produces material blessing and that the evidence of faith is material blessing and that the absence of material blessing indicates insufficient faith. You have been thinking about the structure of this argument for some years now. The pastor\'s private jet is one of the data points you are thinking about. The congregation members who pray faithfully and remain poor are another. Your uncle who never goes to church and runs a successful business is a third. The faith is still real. The argument needs work.',
    choices: [
      {
        text: 'Keep the faith, let the theology sort itself out.',
        tag: 'faith',
        outcome: 'The church community is real. The support network is real. The theology can be complicated without the community being less real. You stay.',
        effect: (p) => { p.setMem('sl_ng_pent_adult', true); p.s += 2; p.m += 3; p.karma += 3 },
      },
      {
        text: 'Step back. The argument has become too visible to ignore.',
        tag: 'question',
        outcome: 'You don\'t leave faith — you leave the specific church. The transition is uncomfortable and your mother asks about it at every family dinner for two years. Eventually it becomes background noise.',
        effect: (p) => { p.setMem('sl_ng_pent_adult', true); p.e += 3; p.m += 2; p.r += 3; p.addFlag('left_faith_community') },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RR. UYGHUR SPECIFIC — the surveillance that came to the family table
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_uyghur_school_surveillance',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ethnicity === 'uyghur' &&
      G.currentYear >= 2015 && G.currentYear <= 2025 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_uyg_school,
    text: 'The school teaches Mandarin. The school has a flag ceremony every Monday morning and the oath to the party and the study of Xi Jinping Thought. Your parents speak Uyghur at home but have stopped speaking it in the street and in the market and on the phone. You are learning that language has geography — where it is safe and where it is not — and you are learning this at the age of nine, which is the age when other children learn multiplication tables, which you are also learning, in Mandarin, which is the only language the school recognises.',
    choices: null,
    effect: (p) => { p.setMem('sl_uyg_school', true); p.m -= 6; p.e += 3; p.addFlag('minority_language_gap') },
  },

  {
    id: 'sl_uyghur_disappeared_family',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ethnicity === 'uyghur' &&
      G.currentYear >= 2017 && G.currentYear <= 2025 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_uyg_family,
    text: 'Your uncle stopped answering his phone in August 2017. Your aunt\'s messages stopped in September. The official description for where they likely are is "vocational training centre." You do not attempt to find out officially because the people who have attempted to find out officially have sometimes also stopped answering their phones. You are in Ürümqi. You have a job. You go to work. You go home. You have learned not to keep the Quran where it can be seen, not to keep a prayer mat where it can be seen, not to use certain apps, not to call certain numbers. The learning took several months. The practice is now automatic.',
    choices: null,
    effect: (p) => { p.setMem('sl_uyg_family', true); p.m -= 15; p.h -= 4; p.addFlag('uyghur_suppression_lived') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SS. SMALL ISLAND INDEPENDENCE — the moment the flag changed
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_barbados_independence_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Barbados' &&
      G.currentYear >= 1966 && G.currentYear <= 1968 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_bds_indep,
    text: 'The independence came on November 30, 1966, which was a Tuesday, and the school gave you the day off. The flag went up — a trident on gold and ultramarine, which the national competition chose over fifty other designs — and the Governor-General took the oath and the Union Jack came down and there was a military band and fireworks at Kensington Oval and you watched from the hill above the oval with your cousins. The country is three weeks old. You are in it. The thing that the country means — the specific thing, the daily thing, the difference between a colony and a country — will take years to find the words for, and the words will keep changing.',
    choices: null,
    effect: (p) => { p.setMem('sl_bds_indep', true); p.m += 6; p.e += 2; p.addFlag('independence_generation_carib') },
  },

  {
    id: 'sl_small_island_brain_drain',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Barbados', 'Trinidad and Tobago', 'Jamaica', 'Guyana', 'Belize'].includes(G.character.country.name) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 20 && G.age <= 35 &&
      G.stats.smarts >= 60 &&
      !G.mem?.sl_carib_leave,
    text: 'The scholarship that takes you to the university in England or Canada is an achievement and a departure and both of these things are understood clearly by everyone who sees you off at the airport. The departure is the shape that achievement takes in a small island. The people who do not leave — who build things here, who run the clinics and the schools and the civil service — are also achieving, but the achievement that is most legible to the outside world is the departure. You are leaving. The people staying are your cousins. You will send remittances. They will vote in the elections that determine the future of the country you left. Both of you are contributing to the same small place in different ways that are not symmetrical.',
    choices: [
      {
        text: 'Go. The island cannot contain what you want to build.',
        tag: 'leave',
        outcome: 'The university is excellent. The winter is extraordinary. You send money home and go back for carnival every few years. The island is where you come from. The city is where you live.',
        effect: (p) => { p.setMem('sl_carib_leave', true); p.e += 4; p.mo += 5000; p.addFlag('emigrated'); p.addFlag('caribbean_diaspora') },
      },
      {
        text: 'Stay. Someone has to build the place.',
        tag: 'stay',
        outcome: 'The civil service needs you. The school needs you. The island needs people who came back when most did not. The staying is its own achievement. It is not always legible as achievement to the people who left.',
        effect: (p) => { p.setMem('sl_carib_leave', true); p.m += 4; p.karma += 5; p.addFlag('stayed_to_build') },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TT. APARTHEID RACIAL CLASSIFICATION — the pencil test and what it decided
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_apartheid_pencil_test',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 14 &&
      G.flags.includes('experienced_discrimination') &&
      !G.mem?.sl_sa_pencil,
    text: 'The Population Registration Act classifies everyone into White, Coloured, Indian, or Native. The Classification Board, when cases are disputed, uses the pencil test: a pencil is put in the hair. If the hair holds the pencil, the person is classified Coloured or Native. If the pencil falls out, the person may be classified White. Your family\'s classification has been disputed. Your grandmother went to one side of this test. Your grandfather went to the other. The classification determines which school you attend, which bus you take, which hospital you go to, whether the person you love can marry you. A pencil in hair decides this. The decision is the law.',
    choices: null,
    effect: (p) => { p.setMem('sl_sa_pencil', true); p.m -= 8; p.e += 3; p.addFlag('coloured_classification') },
  },

  {
    id: 'sl_apartheid_coloured_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.flags.includes('coloured_classification') &&
      G.currentYear >= 1990 && G.currentYear <= 2005 &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.sl_sa_col_mid,
    text: 'The new South Africa is non-racial in its constitution. The constitution does not undo the classification in the bodies of the people who were classified. You spent your childhood on the Coloured side of lines — Coloured schools, Coloured hospitals, Coloured bus seats — and now the lines are gone officially and the geography of the city still remembers them in which neighbourhoods were built where and who was allowed to own what and where the wealth is. You are in your forties. You are not sure what the new category is, or whether you want one. The pencil test is not the law anymore. You still remember which way your grandmother\'s pencil fell.',
    choices: null,
    effect: (p) => { p.setMem('sl_sa_col_mid', true); p.e += 3; p.m += 2; p.r += 5 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // UU. ETHIOPIAN FASTING — the year measured in the Orthodox calendar
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_ethiopia_fasting_year',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ethiopia' &&
      G.religion === 'christian_orthodox' &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_eth_fasting,
    text: 'The Ethiopian Orthodox fasting calendar has over 250 fasting days a year. Your family observes the major fasts: Tsom, Filseta, the pre-Easter fast that lasts fifty-five days. During the fasts you eat only after three in the afternoon and eat no animal products and your mother rises before the sun to cook the injera and the lentils and the shiro before the day begins in earnest. This is not deprivation. This is the year. The year is structured by the fasts the way other years are structured by the seasons. The structure is old and specific and your body knows it.',
    choices: null,
    effect: (p) => { p.setMem('sl_eth_fasting', true); p.m += 4; p.s += 2; p.addFlag('orthodox_fasting_formation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VV. RWANDAN GACACA — the perpetrator and the survivor in the same row
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_rwanda_gacaca_witness',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 2002 && G.currentYear <= 2012 &&
      G.age >= 25 && G.age <= 55 &&
      G.flags.includes('genocide_survivor') &&
      !G.mem?.sl_rw_gacaca,
    text: 'The gacaca court meets in the open air, which is traditional for Rwandan justice. The man who killed your uncle is in the row across from you. He stood up and said what he did, which is what the gacaca system requires — confession, detail, truth — in exchange for reduced sentence. You are required to listen. The state has decided this is justice. You are sitting in the open air listening to the detail of what happened to your uncle from the mouth of the man who did it, and you do not know yet whether this is better or worse than not knowing the detail. It is different from not knowing the detail. You can say that much.',
    choices: null,
    effect: (p) => { p.setMem('sl_rw_gacaca', true); p.m -= 6; p.e += 3; p.r += 8; p.addFlag('gacaca_witness') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WW. PACIFIC CLIMATE DISPLACEMENT — the island going under
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_pacific_climate_rising_sea',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Kiribati', 'Tuvalu', 'Marshall Islands', 'Maldives', 'Fiji'].includes(G.character.country.name) &&
      G.currentYear >= 2000 && G.currentYear <= 2030 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sl_pac_climate,
    text: 'The king tides flood the village now in ways they did not when your parents were children. The seawater is in the taro gardens. The cemetery is flooding. The government has been negotiating with New Zealand and Australia about migration arrangements because the island will not be habitable within the lifetimes of children born here now. At climate conferences, your country\'s delegation speaks and the countries that emit most of the carbon listen politely and make non-binding commitments. You have watched several rounds of this. The taro gardens continue to flood.',
    choices: [
      {
        text: 'Apply for the Pacific access migrant visa to New Zealand.',
        tag: 'leave',
        outcome: 'Auckland is green and large and cold in winter and you have family there from the first wave of migration in the 1990s. The island is still the island. You send money back. You cannot send the island back to where it was.',
        effect: (p) => { p.setMem('sl_pac_climate', true); p.m -= 5; p.mo += 3000; p.addFlag('climate_refugee'); p.addFlag('emigrated') },
      },
      {
        text: 'Stay. This is not abstract. This is home.',
        tag: 'stay',
        outcome: 'You stay. The tides keep coming. The staying is an act of witness and also a kind of grief. You will make this decision again, probably, in five years.',
        effect: (p) => { p.setMem('sl_pac_climate', true); p.m -= 4; p.r += 6; p.addFlag('climate_displaced_stayed') },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // XX. ROMA FAMILY — the eviction cycle in European cities
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_roma_eviction_cycle',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['Romania', 'Bulgaria', 'Hungary', 'Czech Republic', 'Slovakia', 'Serbia', 'France', 'Italy'].includes(G.character.country.name) &&
      G.ethnicity === 'roma' &&
      G.currentYear >= 1950 && G.currentYear <= 2020 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_roma_evict,
    text: 'The settlement has been here for eleven years. The municipal order to vacate gives you thirty days. The community has had thirty days six times in eleven years and has moved the settlement and rebuilt it each time. The settlement is a collection of what can be moved: the caravans, the timber structures that can be disassembled, the cooking equipment, the tools, the music. The school across town accepts the children theoretically. In practice, the children who have moved seven times in eleven years have a particular relationship with the word theoretically. You have transferred schools four times. You are twelve.',
    choices: null,
    effect: (p) => { p.setMem('sl_roma_evict', true); p.m -= 8; p.h -= 2; p.e -= 3; p.addFlag('eviction_cycle_childhood') },
  },

  {
    id: 'sl_roma_adult_europe',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('eviction_cycle_childhood') &&
      G.ethnicity === 'roma' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_roma_adult,
    text: 'The EU free movement directive says you can live and work anywhere in the European Union. The practice of this right in this city is that you can be evicted from the settlement the municipality tolerates but wishes it did not have to tolerate, and you can be stopped by police more frequently than the statistical average, and you can find that the word Roma in an application has a measurable effect on outcomes in a system that claims to be non-discriminatory. The right exists. The practice modifies the right. You have learned to navigate the gap between the right and the practice.',
    choices: null,
    effect: (p) => { p.setMem('sl_roma_adult', true); p.e += 3; p.s += 2; p.m -= 3; p.addFlag('stateless_adjacent') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // YY. KOREAN TRANSRACIAL ADOPTEE — the country you came from at 4 months
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_korean_adoptee_child',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['United States', 'Sweden', 'Netherlands', 'France', 'Australia'].includes(G.character.country.name) &&
      G.currentYear >= 1975 && G.currentYear <= 2005 &&
      G.age >= 6 && G.age <= 14 &&
      G.flags.includes('adopted') &&
      !G.mem?.sl_kor_adopt_child,
    text: 'You came from Korea at four months and have no memory of it. What you have is a folder with the adoption agency paperwork, a photograph of a woman the agency says is your birth mother, and a name that was your name for four months and then became your middle name, which no one uses. You are the only Korean person in your school. You are also not Korean in any way you can access — you do not speak the language, you do not know the food except from the restaurant your parents take you to twice a year as a form of cultural connection that you are not sure is working. You are from here. The question of what else you are is one you are beginning to sit with.',
    choices: null,
    effect: (p) => { p.setMem('sl_kor_adopt_child', true); p.e += 2; p.m -= 2; p.addFlag('transracial_adoptee') },
  },

  {
    id: 'sl_korean_adoptee_return',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('transracial_adoptee') &&
      G.age >= 22 && G.age <= 40 &&
      G.currentYear >= 1995 &&
      !G.mem?.sl_kor_adopt_return,
    text: 'Seoul is the country you came from and do not come from. You have looked up the flight prices many times. You have found online communities of Korean adoptees who went back — some found their birth families, some found records, some found a country that also did not know what to do with them because Korea does not have a clear category for Korean people who speak no Korean and were raised by white parents in Minnesota. The word for this, in Korean, is the word for overseas Korean, which is the word for every Korean who lives outside Korea, which was not made for exactly this situation. You have booked the flight.',
    choices: [
      {
        text: 'Try to find your birth mother.',
        tag: 'search',
        outcome: 'The agency has a file. The file has a name. The name leads to a woman who is in her fifties and who, when the intermediary contacts her, does not respond. You wait. The not-responding is its own information.',
        effect: (p) => { p.setMem('sl_kor_adopt_return', true); p.m -= 4; p.e += 3; p.r += 6; p.addFlag('adoptee_searched') },
      },
      {
        text: 'Go to know the country, not to find her.',
        tag: 'explore',
        outcome: 'Seoul is enormous and fast and indifferent to your specific quest in a way that is both a relief and a disappointment. The kimchi tastes like something your body recognises before your mind does. You stay three weeks. You come back changed in a way you cannot yet describe.',
        effect: (p) => { p.setMem('sl_kor_adopt_return', true); p.m += 3; p.e += 3; p.s += 2 },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ZZ. SOVIET SPACE RACE — the child of the cosmonaut's city
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_soviet_space_race_child',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1957 && G.currentYear <= 1972 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_sov_space,
    text: 'Gagarin\'s face is on the poster in your classroom in the same way that Lenin\'s face is on the poster — both are national achievements, both are looking at the future with appropriate confidence. The difference is that Gagarin actually went to space, which no American had done yet in 1961, which is a fact you know with a specific satisfaction. The Soviet Union will be the first country in space: this is what it felt like from inside, at ten, before the other things you later learned to feel about the Soviet Union were available to you. The first thing was the achievement. The first thing was real.',
    choices: null,
    effect: (p) => { p.setMem('sl_sov_space', true); p.e += 3; p.m += 4; p.addFlag('space_race_generation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AAA. IRISH TRAVELLER — the barrel-top wagon and what the road takes
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_irish_traveller_child',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.ethnicity === 'traveller' &&
      G.currentYear >= 1940 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.sl_ire_traveller,
    text: 'The family moves with the season and the work — the harvests in Wexford, the fairs in Ballinasloe, the roads between. The wagon is a barrel-top and the children sleep at the back and the horse is the economics of the family in the same way the car is the economics of the settled family, which means when the horse is sick everything is sick. The settled people call you tinkers and the settled people call you knackers and the settled people sometimes move you on from the side of the road before the week is out. Ireland has no official recognition of Travellers as an ethnic group until 2017. You are a child and do not know the word ethnic group, but you know the road.',
    choices: null,
    effect: (p) => { p.setMem('sl_ire_traveller', true); p.s += 4; p.m += 2; p.e -= 2; p.addFlag('traveller_childhood') },
  },

  {
    id: 'sl_irish_traveller_sedentarisation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.flags.includes('traveller_childhood') &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_ire_trav_settle,
    text: 'The council house is a two-bedroom in Ballyfermot and the council has decided that the settled house is better for you than the road, which the council decided based on what is better for the settled community rather than what is better for you. The house is warm and has a kitchen and has a door that locks. Your mother finds the locked door unfamiliar and keeps opening it to see outside. Your father parks the trailer in the garden because the garden is the outside part. The neighbours on both sides have called the council about the trailer. You are in a house that is a solution to a problem you were not asked to define.',
    choices: null,
    effect: (p) => { p.setMem('sl_ire_trav_settle', true); p.m -= 4; p.h += 2; p.r += 5; p.addFlag('forced_sedentarisation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BBB. ACEH TSUNAMI — the wave and the decade that followed
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_aceh_tsunami_2004',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 2004 && G.currentYear <= 2006 &&
      G.age >= 18 && G.age <= 50 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.sl_aceh_tsunami,
    text: 'The wave comes from the sea on December 26, 2004, at seven fifty-eight in the morning, which is the information that arrived as you would have been making breakfast or walking to the market. The 2004 Indian Ocean tsunami kills two hundred and twenty-seven thousand people in fourteen countries. In Banda Aceh alone the number is sixty-one thousand. The number is so large it becomes a number and stops being people before you have finished counting. What the number does not contain is the specific morning, the specific house, the specific absence of the specific people who were in it. What you lost is specific. The number is not.',
    choices: null,
    effect: (p) => { p.setMem('sl_aceh_tsunami', true); p.m -= 14; p.h -= 5; p.r += 8; p.addFlag('tsunami_survivor') },
  },

  {
    id: 'sl_aceh_tsunami_reconstruction',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('tsunami_survivor') &&
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 2006 && G.currentYear <= 2015 &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.sl_aceh_reconstruct,
    text: 'The reconstruction came quickly because the world was watching — the NGOs, the foreign governments, the cameras, the money that flowed in the two years after. The town that was rebuilt is not the town that was. The houses are on different footprints. The streets are in different places. The mosque was rebuilt exactly as it was, which is one decision that the community made about what stays. In ten years you have rebuilt more or less everything that can be rebuilt. What cannot be rebuilt is not a building. You have rebuilt the buildings and held the other thing in a place that is not quite grief anymore and not quite over.',
    choices: null,
    effect: (p) => { p.setMem('sl_aceh_reconstruct', true); p.m += 3; p.e += 2; p.r += 5 },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CCC. HMONG RESETTLEMENT — the refugee camp, then Minnesota
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_hmong_refugee_minnesota',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'hmong' &&
      G.currentYear >= 1978 && G.currentYear <= 2000 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.sl_hmong_minn,
    text: 'The camp in Thailand was Ban Vinai and before that was Laos and before that was the Secret War in which the CIA recruited the Hmong to fight on the American side against the Pathet Lao, a fact that was secret for many years and has since become less secret but did not change the outcome for the people in the camp. The camp had a hundred and forty thousand people when you were four. Minnesota has the largest Hmong population outside Southeast Asia because the Lutheran social services organisations in Minnesota agreed to sponsor the resettlement. You arrive in Minneapolis in January. It is fifteen below zero. The snow is nothing like anything in Laos.',
    choices: null,
    effect: (p) => { p.setMem('sl_hmong_minn', true); p.m -= 4; p.e += 3; p.h -= 2; p.addFlag('hmong_resettlement') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DDD. KENYAN MATATU — the middle class forming inside the minibus
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_kenya_matatu_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kenya' &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sl_ke_matatu,
    text: 'The matatu is a shared minibus that runs the Nairobi routes and the matatu has a tout and the tout hangs from the door shouting the destination and the matatu has a sound system that is louder than physics strictly requires and the sound system plays what the driver has decided the passengers need to hear, which today is gospel and on Friday night will be genge. You take the matatu to work every day. The matatu is the infrastructure of the Nairobi working and lower-middle class, which is the class that is forming at a speed the city\'s actual infrastructure has not kept up with. The road from Eastlands to town takes forty minutes in the matatu and an hour and forty on a bad day and the bad day is most days.',
    choices: null,
    effect: (p) => { p.setMem('sl_ke_matatu', true); p.s += 3; p.m += 2; p.addFlag('matatu_generation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EEE. CHECHEN DEPORTATION — the generation born in Kazakhstan
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_chechen_deportation_memory',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.ethnicity === 'chechen' &&
      G.currentYear >= 1957 && G.currentYear <= 1980 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_chech_deport,
    text: 'Your grandparents were deported from Chechnya to Kazakhstan in 1944. February 23, which was the Day of the Soviet Army, was the day Stalin ordered the deportation of the entire Chechen and Ingush population — four hundred and ninety thousand people — for alleged collaboration with the Germans. The deportation was carried out in three days. Your grandparents lost three children to the winter in the cattle cars and the first Kazakh winter. They returned to Chechnya in 1957 after Khrushchev\'s amnesty. They do not speak about the cattle cars except in oblique references that you have learned to read. The oblique references are your inheritance.',
    choices: null,
    effect: (p) => { p.setMem('sl_chech_deport', true); p.e += 3; p.r += 6; p.m -= 3; p.addFlag('chechen_deportation_memory') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FFF. FIRST INTIFADA CHILD — growing up at the checkpoint
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_first_intifada_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Palestine' &&
      G.currentYear >= 1987 && G.currentYear <= 1993 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sl_pal_intifada1,
    text: 'The First Intifada begins in 1987 in Jabaliya refugee camp with a traffic accident and spreads from the camp to the streets of Gaza and the West Bank in six days. You are eight. What the Intifada looks like from eight is: the school is closed, then open, then closed by military order. The stones on the road after the night. The men in your family speaking in the kitchen after the women and children are supposed to be asleep. The flag that someone put on the roof of the school and that was taken down and put back up. The flag is illegal. The putting-it-back is an act that requires a decision you observe people making.',
    choices: null,
    effect: (p) => { p.setMem('sl_pal_intifada1', true); p.m -= 5; p.e += 4; p.addFlag('intifada_generation') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GGG. SAUDI WOMAN DRIVING BAN — the logistics of a prohibition
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_saudi_driving_ban',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1990 && G.currentYear <= 2018 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sl_sa_driving,
    text: 'The driving ban for women means that to go anywhere you need a mahram — a male guardian who accompanies you or a driver who is hired to take you. The driver is an expense. The mahram is a family arrangement. You have a job at a hospital and the job is forty minutes from your house and the drive to the job costs a quarter of your salary and the driver has to be scheduled in advance and when the driver cancels you call in late to a job where you are needed. You are a medical professional. The country needs medical professionals. The country also needs you to not drive. The two things are both official policies of the same country simultaneously.',
    choices: null,
    effect: (p) => { p.setMem('sl_sa_driving', true); p.m -= 4; p.e += 3; p.mo -= 1500; p.addFlag('driving_ban_lived') },
  },

  {
    id: 'sl_saudi_driving_ban_lifted',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('driving_ban_lived') &&
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2018 && G.currentYear <= 2025 &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.sl_sa_driving_lift,
    text: 'The ban was lifted in June 2018. You drove yourself to work for the first time when you were forty-one. The first time felt significant and ordinary simultaneously — the car, the road, the familiar route you had taken for twenty years in other people\'s cars, now in your own hands. You called your mother from the car, which you technically should not do while driving, to tell her. She cried. You understood the crying without being able to explain to anyone outside it exactly what was being cried about, because what was being cried about was not only the driving.',
    choices: null,
    effect: (p) => { p.setMem('sl_sa_driving_lift', true); p.m += 8; p.addFlag('witnessed_rights_expansion') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HHH. VENEZUELAN DOCTOR EXODUS — the hospital with no supplies
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_venezuela_doctor_leaves',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.career?.field === 'healthcare' &&
      G.currentYear >= 2014 && G.currentYear <= 2022 &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.sl_ve_doc,
    text: 'The hospital has no gloves. The IV bags run out on Tuesdays and the next delivery is not until Thursday and what happens between Tuesday and Thursday is that you improvise and the patients who can be improvised around survive and the ones who cannot survive differently. You trained for seven years and did your residency in a hospital that had supplies in 2005 and the hospital in 2018 is a different building in a different country with the same address. Four of your colleagues have left for Colombia or Chile or Spain. They send messages from hospitals with supplies. You have not left yet.',
    choices: [
      {
        text: 'Leave for Colombia. The patients you can save are there.',
        tag: 'leave',
        outcome: 'Bogotá has a hospital that functions. The salary is adequate. You are practising medicine instead of managing the absence of medicine. You send money to family. You do not know if this was the right decision. You know it was a decision.',
        effect: (p) => { p.setMem('sl_ve_doc', true); p.mo += 12000; p.m -= 3; p.addFlag('emigrated'); p.addFlag('brain_drain_participant') },
      },
      {
        text: 'Stay. These patients have no one else.',
        tag: 'stay',
        outcome: 'You stay through 2019 and 2020 and the patients you can improvise around survive and the ones who cannot survive differently. You are still here. You are not sure if this is courage or inability to leave or both.',
        effect: (p) => { p.setMem('sl_ve_doc', true); p.h -= 6; p.karma += 6; p.addFlag('stayed_through_crisis') },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // III. ALBANIAN BLOOD FEUD — the kanun and the house you cannot leave
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_albanian_blood_feud',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Albania' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 6 && G.age <= 16 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_alb_feud,
    text: 'The Kanun of Lekë Dukagjini is the set of customary laws that govern blood feuds in northern Albania, which were suppressed under communism and which returned after 1991 when the state collapsed and the communities needed some system. The blood feud involves your family because of something that happened between your grandfather and a man in the neighbouring village in 1992. What it means practically is that your father cannot leave the house, because the Kanun requires the other family to kill a man from your family and your father is a man from your family. He has been inside the house for six years. You bring him his meals. The men from the reconciliation organisations have visited twice. The other family has not agreed to gjakmarrja forgiveness.',
    choices: null,
    effect: (p) => { p.setMem('sl_alb_feud', true); p.m -= 10; p.e += 3; p.addFlag('blood_feud_family') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JJJ. INDONESIAN JAVANESE TRANSMIGRATION — the policy that moved people
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_indonesia_transmigrant',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 35 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.sl_indo_transm,
    text: 'The transmigration programme moves Javanese families to the outer islands — Kalimantan, Sulawesi, West Papua — to relieve population pressure on Java and to develop the outer islands. The development includes you. You were given two hectares of land and a wooden house and three months of government rations and then left to farm a soil that is different from Javanese soil in ways that the programme did not adequately prepare you for. The indigenous community in this part of Kalimantan has been here for several thousand years and did not agree to the programme that gave you their land, a fact that the programme also did not adequately account for.',
    choices: null,
    effect: (p) => { p.setMem('sl_indo_transm', true); p.m -= 4; p.h -= 2; p.e += 2; p.addFlag('transmigrant_family') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // KKK. AIDS STIGMA — the partner you could not grieve publicly
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_aids_grief_partner',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1984 && G.currentYear <= 1996 &&
      G.age >= 22 && G.age <= 40 &&
      G.flags.includes('lgbtq') &&
      !G.mem?.sl_aids_grief,
    text: 'Michael died in October 1989. The hospital allowed you in because you said you were his cousin, which was a lie that the nurses accepted with a specific quality of deliberate not-asking, which was a small mercy inside a system that in some hospitals did not allow this lie to be accepted. The obituary in the suburban newspaper said he died after a long illness and listed the family members he was survived by and did not list you, which is the agreement his family required and which you made because the alternative was to be removed from the room in his final days. You made the agreement. You were in the room. The room and the obituary are both real.',
    choices: null,
    effect: (p) => { p.setMem('sl_aids_grief', true); p.m -= 15; p.r += 8; p.addFlag('aids_generation_witness') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LLL. MONGOLIAN DZUD — the winter that kills the herd
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sl_mongolia_dzud_winter',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mongolia' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1999 && G.currentYear <= 2012 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sl_mong_dzud,
    text: 'The dzud is the combination of summer drought and winter extreme cold that kills the livestock. The dzud of 2010 kills eight point five million animals — a quarter of the national herd. Your family loses sixty percent of the sheep and forty percent of the horses in February. What this means economically is that the nomadic herd that was the family wealth for three generations is reduced to an insufficient number in one season. The government provides some emergency fodder. The emergency fodder arrives in March. The animals that survive to March are the ones that survive. The count after the thaw is a different number than the count before the dzud began.',
    choices: null,
    effect: (p) => { p.setMem('sl_mong_dzud', true); p.m -= 10; p.mo -= 5000; p.h -= 3; p.addFlag('dzud_survivor') },
  },
]
