// events_afghan_tajik.js — Dari, the Panjshir, the Shomali, Herat.
//
// The roster draws 27% of Afghans as Tajik and no guard in the corpus had ever
// named them. The Afghan modules are written from Kabul and about the regimes —
// Saur, the Soviets, the Taliban twice — which Tajiks lived through like
// everyone else. What was missing is the particular position: speakers of the
// language of the court, the ministries and the city in a state whose rulers
// were Pashtun and which declared Pashto the national language in 1936; the
// people of the valleys the Soviet army could not hold and the plain the
// Taliban burned; and a side in the civil war that shelled Kabul too.
//
// That last is the thing a Tajik module could get wrong in the flattering
// direction. Massoud is a national hero to most of the people these events are
// written for, and his portrait was on every windscreen in Kabul for twenty
// years; he is also the commander whose forces, with Sayyaf's, carried out the
// Afshar operation against Hazara west Kabul in February 1993. Both go in.
//
// Written for who the engine produces. Births 1930-2005, 86% rural, 97% Sunni,
// 87% illiterate, and a median death age in the low twenties, because the
// under-five mortality is real — so the childhood events matter more here than
// anywhere. Before this module every rural Tajik was born in "Rural Helmand",
// which is the Pashtun south. `places.js` now has the Panjshir, the Shomali
// plain and Herat, and `homeOf` puts rural Tajiks in the first two (the
// Shomali weighted double: it is a plain of villages, the Panjshir one valley)
// and urban ones three to one between Kabul and Herat. The Hazarajat was
// added alongside so that rural Hazaras were not moved from Helmand into the
// Panjshir.
//
// Dates used, all checked. Pashto is declared the national language in 1936;
// the 1964 constitution names Pashto and Dari official. The Herat uprising is
// March 1979; a mass grave from the reprisals is found in 1992. The Soviet
// offensives into the Panjshir run 1980-85, the largest in May 1982. The
// mujahideen enter Kabul in April 1992; the Afshar operation is 10-11 February
// 1993. Herat falls to the Taliban in September 1995 and Kabul on 27 September
// 1996. The Shomali is burned in summer 1999 and its displaced housed in the old
// Soviet embassy compound in Kabul. Massoud is killed at Khwaja Bahauddin on 9
// September 2001 and buried at Saricha. The amnesty law passes parliament in
// 2007. The DDR programme runs 2003-2006. The 2014 run-off is June and the unity
// government September. The Taliban take Bazarak on 6 September 2021.

const AF = 'Afghanistan'
const IS_AF = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === AF
const TAJ = (G) => G.character?.ethnicity === 'tajik_afghan'
const HOME = (G) => IS_AF(G) && TAJ(G)
const PANJSHIR = (G) => G.place?.id === 'af_panjshir'
const SHOMALI = (G) => G.place?.id === 'af_shomali'
const HERAT = (G) => G.place?.id === 'af_herat'
const KABUL = (G) => G.place?.id === 'af_kabul'
const MALE = (G) => G.character?.gender === 'male'
const once = (G, key) => !G.mem?.[key]

export const AFGHAN_TAJIK_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'taj_ft_tanks',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('taj_panjshir_1982') && G.currentYear >= 2003 && G.age >= 24 && once(G, 'taj_ft_tanks'),
    text: 'The Soviet tanks are still in the valley. They lie where they were hit, turret down in the river or nose into the rock beside the road, and children climb on them, and the metal has gone the colour of the stones. A foreign photographer stops his car to take a picture of one. You were on the slope above when that one burned, and you have walked past it every week since, and you have never once looked at it the way he is looking.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_tanks', true); p.r += 3; p.e += 1 },
  },

  {
    id: 'taj_ft_disarm',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && G.flags.includes('taj_jamiat_fighter') && G.currentYear >= 2003 && G.currentYear <= 2006 && once(G, 'taj_ft_disarm'),
    text: 'Under the new programme the militias are to hand in their weapons, and a man from the United Nations sits at a trestle table in Charikar and writes serial numbers on a clipboard. Some commanders hand in their oldest rifles and keep the rest. You hand in the one you carried for years, and get a certificate and the offer of a course in tailoring or driving.',
    choices: [
      {
        text: 'Take the driving course',
        tag: null,
        outcome: 'You drive a minibus between Kabul and Charikar for the next ten years, past every place you ever fought over.',
        effect: (p) => { p.setMem('taj_ft_disarm', true); p.mo += 300; p.m += 3 },
      },
      {
        text: 'Join the new army instead',
        tag: null,
        outcome: 'The uniform is American, the sergeant is from Kandahar, and the rifle is almost the same.',
        effect: (p) => { p.setMem('taj_ft_disarm', true); p.mo += 500; p.h -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_ft_amnesty',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('taj_kabul_1992') && G.currentYear >= 2007 && G.age >= 20 && once(G, 'taj_ft_amnesty'),
    text: 'In 2007 parliament passes a law granting amnesty to everyone who fought in the wars, and several of the men who voted for it had rocket batteries on the hills above the city in 1993. You walk down Jada-e Maiwand, rebuilt with money from somewhere, and try to remember what stood where. The commanders are ministers now, and governors, and one of them owns a wedding hall. The city has agreed to talk about the Soviets and about the Taliban and to leave the four years in between without a name.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_amnesty', true); p.r += 4; p.e += 2 },
  },

  {
    id: 'taj_ft_replant',
    phase: null,
    weight: 800,
    when: (G) => HOME(G) && G.flags.includes('taj_shomali_burned') && !SHOMALI(G) && G.currentYear >= 2002 && G.currentYear <= 2008 && G.age >= 10 && once(G, 'taj_ft_replant'),
    text: 'You go back to the Shomali in the spring after the Taliban have gone. The vines are black stumps, the walls of the raisin rooms are pulled down, the karez is full of rubble, and there are mines in the orchard that you learn about from the man who learns first. A vine takes three years to give fruit. You plant them anyway, because that is what there is to do with the land.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_replant', true); p.relocate('af_shomali'); p.m += 2; p.h -= 2 },
  },

  {
    id: 'taj_ft_needle',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && G.flags.includes('taj_golden_needle') && G.currentYear >= 2002 && G.currentYear <= 2012 && once(G, 'taj_ft_needle'),
    text: (G) => 'The sewing circle becomes a literature class again, in daylight, with the door open. The women who came three afternoons a week with fabric in their bags publish poems in the Herat papers, and the youngest of them, the best, has a first book that sells out. ' +
      (G.currentYear >= 2006
        ? 'In 2005 she was killed at home, and nothing much happened to anybody about it. The circle met the week after, because it has always met.'
        : 'You read it on the bus and miss your stop.'),
    choices: null,
    effect: (p) => { p.setMem('taj_ft_needle', true); p.m += 2; p.e += 2 },
  },

  {
    id: 'taj_ft_massoud_week',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('taj_massoud_2001') && KABUL(G) && G.age >= 14 && G.currentYear >= 2003 && G.currentYear <= 2020 && once(G, 'taj_ft_week'),
    text: 'In the second week of September Kabul is his face: on the rear windows of taxis, on the walls of the ministries, forty feet high near the airport. Young men ride through the city on motorbikes with his flag and fire into the air. The baker from Kandahar at the end of your street keeps his shutter half down that week, and you have never asked him why, and he has never asked you anything either.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_week', true); p.e += 2 },
  },

  {
    id: 'taj_ft_deported',
    phase: null,
    weight: 500,
    when: (G) => TAJ(G) && G.flags.includes('taj_iran_worker') && G.currentCountry?.name === 'Iran' && (G.yearsAbroad ?? 0) >= 3 && once(G, 'taj_ft_deported'),
    text: 'After years on building sites in Tehran and Isfahan you are stopped at a checkpoint without the right paper and driven to the border at Islam Qala with forty others. You walk into Herat in the clothes you are wearing, with a telephone full of the numbers of men you worked beside. Half of them will be back in Iran within the year.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_deported', true); p.relocate('af_herat', null, { residency: 'citizen' }); p.wipeMoney(0.5); p.m -= 5 },
  },

  {
    id: 'taj_ft_valley_after',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && G.flags.includes('taj_panjshir_2021') && G.currentYear >= 2022 && once(G, 'taj_ft_valley'),
    text: 'The portrait of Massoud that hung in the bazaar for twenty years is gone, and so are some of the young men, taken to be questioned; most of them come back. At the checkpoint you speak Dari and the boy with the rifle answers in Pashto, and the two of you understand each other perfectly well. The river is as loud as it ever was.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_valley', true); p.m -= 5; p.r += 3 },
  },

  {
    id: 'taj_ft_herat_grave',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && G.flags.includes('taj_herat_1979') && G.currentYear >= 1992 && G.currentYear <= 1995 && once(G, 'taj_ft_grave'),
    text: 'Men digging foundations at the edge of the city find a pit, and then another, and what is in them has been there since March 1979. Women come from all over Herat with photographs of sons and husbands taken that spring. The new government in Kabul says it will investigate. Your father stands at the edge of the digging for an afternoon and does not say who he is looking for.',
    choices: null,
    effect: (p) => { p.setMem('taj_ft_grave', true); p.m -= 6; p.r += 3 },
  },

  // ── CHILDHOOD ──────────────────────────────────────────────────────────────

  {
    id: 'taj_dari_school',
    phase: null,
    weight: 120,
    when: (G) => HOME(G) && (G.literate || G.ruralUrban !== 'rural') && G.age >= 7 && G.age <= 11 && G.currentYear >= 1936 && G.currentYear <= 1978 && once(G, 'taj_dari'),
    text: 'The lessons are in Dari, which is what everybody in your street speaks, what the ministries in Kabul write their letters in, and what Hafez wrote in. There is also a Pashto lesson, because the government has declared Pashto the national language, and the Pashto teacher is a man from Paktia who is patient with you in a way the Dari teacher is not. By the end of the year you can read a Pashto sentence aloud without understanding it, which he says is how he learned Dari.',
    choices: null,
    effect: (p) => { p.setMem('taj_dari', true); p.e += 3 },
  },

  {
    id: 'taj_mulberries',
    phase: null,
    weight: 50,
    when: (G) => HOME(G) && PANJSHIR(G) && G.age >= 5 && G.age <= 14 && once(G, 'taj_tut'),
    text: 'In summer the mulberries go up onto the flat roofs to dry, white and black on cloths, and the whole valley smells of them. In winter they are pounded with walnuts into talkhan and eaten by the handful, and talkhan is what a Panjshiri carries on a journey. Below the houses the river is loud all year, green and fast and too cold to stand in for long.',
    choices: null,
    effect: (p) => { p.setMem('taj_tut', true); p.m += 3 },
  },

  {
    id: 'taj_raisin_rooms',
    phase: null,
    weight: 30,
    when: (G) => HOME(G) && SHOMALI(G) && G.age >= 5 && G.age <= 14 && (G.currentYear < 1999 || G.currentYear > 2006) && once(G, 'taj_kishmish'),
    text: 'In August the grapes go into the kishmish-khana, tall mud rooms with holes all over their walls, where the hot wind comes through and dries them in the dark so they stay green. Your job is to turn the bunches. Your grandfather says that Babur, who went on to conquer India, wrote that there was no place in the world like Istalif, and the way he says it you can tell he has said it to every child in the family.',
    choices: null,
    effect: (p) => { p.setMem('taj_kishmish', true); p.m += 3 },
  },

  {
    id: 'taj_herat_tiles',
    phase: null,
    weight: 50,
    when: (G) => HOME(G) && HERAT(G) && G.age >= 7 && G.age <= 16 && once(G, 'taj_tiles'),
    text: 'In the workshop behind the Friday Mosque, men who have done nothing else all their lives are making the tiles to replace the broken ones, one at a time, and if you are quiet they let you watch. The minarets of the Musalla lean over the road to the north. Your grandmother\'s Persian has words in it that the Kabul radio does not use, older ones; she says they are Herati words, and that Kabul took the rest.',
    choices: null,
    effect: (p) => { p.setMem('taj_tiles', true); p.m += 2; p.e += 1 },
  },

  // ── THE SOVIET WAR ─────────────────────────────────────────────────────────

  {
    id: 'taj_herat_1979',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && HERAT(G) && G.currentYear === 1979 && G.age >= 5 && once(G, 'taj_1979'),
    text: 'In March the city rises against the new government in Kabul, its decrees and its literacy classes, and for a few days Herat belongs to itself. Soldiers of the garrison go over to the crowds. Then the aircraft come, and the tanks, and when it is finished there are thousands dead that nobody will count properly for thirteen years. Your father goes out on the second day and comes home on the fifth.',
    context: 'The Herat uprising of March 1979, against the communist government\'s reforms, was the first major revolt against it; part of the local garrison, including a captain named Ismail Khan, mutinied. It was crushed with air power and armour. Estimates of the dead run from 3,000 to 25,000.',
    choices: null,
    effect: (p) => { p.setMem('taj_1979', true); p.m -= 10; p.addFlag('taj_herat_1979') },
  },

  {
    id: 'taj_panjshir_offensive',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && PANJSHIR(G) && G.currentYear >= 1980 && G.currentYear <= 1985 && G.age >= 3 && once(G, 'taj_panj'),
    text: 'In May the helicopters come over the ridge before the tanks come up the road, and the village goes up into the side valleys the way it has practised. From the rocks above you watch the houses burn one row at a time. Massoud\'s men have gone higher still; they will come down again when the columns leave, because the columns always leave. By autumn your family has lived in a cave, a shepherd\'s hut and a cousin\'s stable.',
    context: 'Between 1980 and 1985 the Soviet army mounted nine major offensives into the Panjshir valley against Ahmad Shah Massoud\'s forces. The largest, in May 1982, involved some 12,000 Soviet and Afghan troops with heavy air support. The valley\'s villages were bombed repeatedly and much of its population fled.',
    choices: null,
    effect: (p) => { p.setMem('taj_panj', true); p.h -= 5; p.m -= 8; p.addFlag('taj_panjshir_1982') },
  },

  {
    id: 'taj_mujahid',
    phase: null,
    weight: 500,
    when: (G) => HOME(G) && MALE(G) && (PANJSHIR(G) || SHOMALI(G)) && G.age >= 15 && G.age <= 30 && G.currentYear >= 1980 && G.currentYear <= 1989 && once(G, 'taj_mujahid'),
    text: 'The men who come down from the ridge at night are from your valley, and one of them is your cousin, and they are with Massoud. They need boys who can carry and who know the paths. Your father has said nothing, which means he has thought about it.',
    choices: [
      {
        text: 'Go with them',
        tag: 'defiant',
        outcome: 'You carry mortar rounds up paths you have known since you could walk, and within a year you are carrying a rifle.',
        effect: (p) => { p.setMem('taj_mujahid', true); p.h -= 6; p.karma += 2; p.addFlag('taj_jamiat_fighter') },
      },
      {
        text: 'Take your mother and sisters to Pakistan',
        tag: null,
        outcome: 'After a camp near the border you end up in Karachi, at Sohrab Goth, where everyone is from somewhere in Afghanistan and nobody is from here.',
        effect: (p) => { p.setMem('taj_mujahid', true); p.emigrateTo('Pakistan', { residency: 'refugee_status' }); p.addFlag('afghan_refugee'); p.m -= 6 },
      },
      {
        text: 'Stay and farm',
        tag: 'yielding',
        outcome: 'You plough the fields that are left. At night you leave bread on the wall, and in the morning it is gone.',
        effect: (p) => { p.setMem('taj_mujahid', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  // ── THE CIVIL WAR AND THE TALIBAN ──────────────────────────────────────────

  {
    id: 'taj_kabul_1992',
    phase: null,
    weight: 900,
    when: (G) => HOME(G) && KABUL(G) && G.currentYear >= 1992 && G.currentYear <= 1995 && G.age >= 5 && once(G, 'taj_kabul'),
    text: 'The mujahideen come into Kabul in April and within months they are fighting each other for it: Massoud\'s men in the centre, Hekmatyar\'s rockets falling from the hills at Charasiab, the Hazara parties in the west, Dostum\'s militia changing sides in between. In February 1993 there is a night in Afshar that the Hazara families on your street will not talk about, and the men who did it were from the side you were told was yours. You learn the difference between the sound of a rocket that has passed and one that has not.',
    context: 'Between 1992 and 1996 the mujahideen factions fought over Kabul, killing tens of thousands of civilians and destroying much of the city. On 10-11 February 1993 forces of Massoud\'s Jamiat-e Islami and Sayyaf\'s Ittihad attacked the Hazara district of Afshar; Human Rights Watch documented killings, rapes and disappearances there.',
    choices: [
      {
        text: 'Wait it out in the basement',
        tag: 'defiant',
        outcome: 'You spend the winter underground with the neighbours and one lamp. In March the house above you loses its upper floor.',
        effect: (p) => { p.setMem('taj_kabul', true); p.h -= 5; p.m -= 8; p.addFlag('taj_kabul_1992') },
      },
      {
        text: 'Leave the city for Pakistan',
        tag: 'yielding',
        outcome: 'You join the half of Kabul walking east on the Jalalabad road, and end up in Karachi with a cousin who has been there since the Soviets.',
        effect: (p) => { p.setMem('taj_kabul', true); p.emigrateTo('Pakistan', { residency: 'refugee_status' }); p.addFlag('taj_kabul_1992'); p.addFlag('afghan_refugee'); p.m -= 8 },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_shomali_1999',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && SHOMALI(G) && G.currentYear >= 1999 && G.currentYear <= 2000 && G.age >= 3 && once(G, 'taj_shomali'),
    text: 'In the summer the Taliban push north across the plain, and this time they do not only take it. They cut the vines at the root, pull down the walls of the raisin rooms, blow in the karez and burn the houses of anyone who is Tajik, which is everyone. A road north to the Panjshir is open for a few days, and a road south to Kabul is open for a few days, and a person has to choose.',
    context: 'In the summer of 1999 the Taliban cleared the Shomali plain north of Kabul, burning villages, destroying vineyards and irrigation and displacing well over 100,000 people, most of them Tajik. Tens of thousands fled into the Panjshir; others were moved to Kabul, where many were housed in the abandoned Soviet embassy compound.',
    choices: [
      {
        text: 'Walk north to the Panjshir',
        tag: 'defiant',
        outcome: 'Three days in a line of families that runs out of sight in both directions. The Panjshir takes you in the way it does, with no room.',
        effect: (p) => { p.setMem('taj_shomali', true); p.relocate('af_panjshir'); p.wipeMoney(0.5); p.m -= 10; p.addFlag('taj_shomali_burned') },
      },
      {
        text: 'Go south to Kabul',
        tag: 'yielding',
        outcome: 'In Kabul the displaced are put in the empty Soviet embassy, three families to a room, under a white flag with writing on it.',
        effect: (p) => { p.setMem('taj_shomali', true); p.relocate('af_kabul'); p.wipeMoney(0.5); p.m -= 10; p.addFlag('taj_shomali_burned') },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_golden_needle',
    phase: null,
    weight: 900,
    when: (G) => HOME(G) && HERAT(G) && !MALE(G) && G.literate && G.age >= 14 && G.age <= 40 && G.currentYear >= 1996 && G.currentYear <= 2001 && once(G, 'taj_needle'),
    text: 'Three afternoons a week you walk to a house near the university with fabric and scissors in your bag, because women may still gather to sew. Inside, nobody sews. A professor from the literature faculty reads Hafez and Tolstoy aloud and the women argue about them, and a girl keeps watch at the door, and if a patrol comes down the street everyone bends over the cloth. You write your first poem in that house, about a window.',
    context: 'Under Taliban rule, when women were barred from education, the Golden Needle Sewing Circle in Herat met as a sewing class and was in fact a literature seminar, run by professors of Herat University. Discovery would have meant prison or worse for everyone in the room.',
    choices: [
      {
        text: 'Keep going',
        tag: 'defiant',
        outcome: 'You go for five years. You never once hear the patrol stop outside, and you never once stop listening for it.',
        effect: (p) => { p.setMem('taj_needle', true); p.e += 4; p.m += 3; p.addFlag('taj_golden_needle') },
      },
      {
        text: 'Stop, for your family\'s sake',
        tag: 'yielding',
        outcome: 'You stop going. The poem stays folded in the lining of a coat for five years.',
        effect: (p) => { p.setMem('taj_needle', true); p.r += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_massoud',
    phase: null,
    weight: 999,
    when: (G) => TAJ(G) && G.currentYear === 2001 && G.age >= 8 && once(G, 'taj_2001'),
    text: 'On the ninth of September two Arab men who say they are journalists set off a bomb hidden in their camera while interviewing Massoud at Khwaja Bahauddin. For days his people say he is only wounded, and everyone who listens to the Persian service of the BBC knows what that means. Two days after the bomb, in America, the towers come down, and the world turns to look at your country for reasons that have everything to do with the men who killed him. He is buried on a hill above the Panjshir river.',
    context: 'Ahmad Shah Massoud, commander of the United Front against the Taliban, was assassinated on 9 September 2001 by two al-Qaeda operatives posing as journalists. His death was not confirmed for several days. He was buried at Saricha in the Panjshir.',
    choices: null,
    effect: (p) => { p.setMem('taj_2001', true); p.m -= 8; p.addFlag('taj_massoud_2001') },
  },

  // ── THE REPUBLIC ───────────────────────────────────────────────────────────

  {
    id: 'taj_language_line',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && (KABUL(G) || HERAT(G)) && G.literate && G.age >= 16 && G.age <= 40 && G.currentYear >= 2006 && G.currentYear <= 2020 && once(G, 'taj_pohantun'),
    text: 'The sign over the university gate says pohantun, the Pashto word, and the students who speak Dari call it daneshgah, which is what the word is in Persian and in Iran. The argument about which word belongs on the signs and in the documents goes all the way up to parliament. In this country a single noun can be a position on whom the country belongs to.',
    choices: [
      {
        text: 'Say pohantun in class, as the rule wants',
        tag: 'yielding',
        outcome: 'Nobody notices, which was the idea.',
        effect: (p) => { p.setMem('taj_pohantun', true); p.e += 1 },
      },
      {
        text: 'Say daneshgah, as you always have',
        tag: 'defiant',
        outcome: 'The boy from Khost beside you says pohantun back at you, not unkindly, and it becomes a joke the two of you share for the rest of the year.',
        effect: (p) => { p.setMem('taj_pohantun', true); p.s += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_iran_work',
    phase: null,
    weight: 250,
    when: (G) => HOME(G) && MALE(G) && G.age >= 17 && G.age <= 30 && G.currentYear >= 1985 && G.currentYear <= 2020 && (HERAT(G) || G.ruralUrban === 'rural') && once(G, 'taj_iran'),
    text: 'Every young man in the district has been to Iran or has a brother there. A smuggler takes you across near Islam Qala at night and on through the desert in the back of a pickup, and in Tehran there is a building site and a room of Afghans sleeping on the concrete of the fourth floor. The Iranians call all of you Afghani, which is the name of your money.',
    choices: [
      {
        text: 'Go',
        tag: null,
        outcome: 'You carry cement eleven hours a day and send almost all of it home through a man in the bazaar who never writes anything down.',
        effect: (p) => { p.setMem('taj_iran', true); p.emigrateTo('Iran', { residency: 'undocumented' }); p.addFlag('taj_iran_worker'); p.h -= 3 },
      },
      {
        text: 'Stay',
        tag: null,
        outcome: 'You stay, and you are one of a handful of young men at the Friday prayers.',
        effect: (p) => { p.setMem('taj_iran', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'taj_2014',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && G.currentYear === 2014 && G.age >= 18 && once(G, 'taj_2014'),
    text: 'The election goes to a run-off between Abdullah, whose father was a Pashtun from Kandahar and whose mother was from the Panjshir and whom everybody treats as the Tajik candidate, and Ghani, the Pashtun one. After the run-off both men say they have won. For three months the country waits while an American secretary of state flies in and out, and then they agree to share it, and a title is invented for the loser that appears nowhere in the constitution.',
    choices: null,
    effect: (p) => { p.setMem('taj_2014', true); p.e += 2; p.m -= 2 },
  },

  {
    id: 'taj_panjshir_2021',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && PANJSHIR(G) && G.currentYear === 2021 && G.age >= 8 && once(G, 'taj_2021'),
    text: 'Kabul falls in August without a fight, and for three weeks the Panjshir is the only place that has not. Massoud\'s son is in the valley, and the old men who fought the Soviets, and boys who have only seen the war in photographs. On the sixth of September the Taliban flag goes up over the governor\'s compound in Bazarak. In forty years it had never happened.',
    choices: null,
    effect: (p) => { p.setMem('taj_2021', true); p.m -= 10; p.addFlag('taj_panjshir_2021') },
  },
]
