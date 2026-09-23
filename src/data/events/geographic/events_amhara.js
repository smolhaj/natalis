// events_amhara.js — the people the state spoke like, and what happened when it
// stopped.
//
// The roster draws 27% of Ethiopians as Amhara and no guard in the corpus had
// ever named them. The existing Ethiopian modules cover the Red Terror, the
// famine, the Derg's fall, the Oromo protests — which is to say the country's
// history, told mostly from the capital or from Oromia. What was missing is the
// position of the group the empire and then the Derg governed in the language
// of: whose tongue was the one every other child in the country was made to
// learn, and who after 1991 found themselves reclassified from "Ethiopian" into
// one nationality among eighty, with a region, a line on the ID card, and a
// history that other people had every reason to remember differently.
//
// That second half is the difficulty of the module and the reason it is worth
// writing. The Amhara were not a ruling class — nine in ten of the characters
// the engine draws here are illiterate farmers in the northern highlands, and
// the rist farmer of Gojjam was as far from the palace as anyone in the empire.
// It is also true that the conquest of the south in the 1880s and 90s settled
// northern soldiers on southern land, that the word for them — neftegna, the
// riflemen — is still used, and that "Amharic" is what the teacher who beat an
// Oromo child for speaking Oromo in the yard was speaking. Both go in. Nothing
// here argues for Wolkait belonging to anyone, or for Fano or against it; the
// events say what happened to the person, and the context notes say what the
// record says, including the parts that are not flattering.
//
// Written for who the engine produces. Births 1930-2005, 92% rural, 88%
// Orthodox and 10% Muslim, 85% illiterate. Before this module every rural
// Amhara was born in "Rural Oromia", which was Ethiopia's only rural place;
// `places.js` now has a village in Gojjam and one in Wollo, split evenly,
// because they are two different histories. Gojjam is the rist country, the
// 1968 tax revolt and the Fano heartland. Wollo is the famine province, a third
// Muslim, the place the resettlement trucks left from in 1985, and the place
// the Tigray war came south into in 2021.
//
// Dates used, all checked. The Gojjam revolt against the agricultural income
// tax is 1968. The Wollo famine is 1972-74; Dimbleby's film is broadcast in
// Addis on 11 September 1974 and the emperor is deposed the next morning. Rural
// land is nationalised on 4 March 1975. The Zemecha runs 1975-76. The
// resettlement moves some 600,000 people from the north in 1984-86. Asmara
// falls on 24 May 1991 and Addis on 28 May. The constitution is 1994, in force
// 1995. The election is 15 May 2005; an inquiry counted 193 civilians killed in
// June and November. In 2015 the ruling front and its allies win every seat.
// Gondar is July 2016 and Bahir Dar 7 August; the state of emergency is 9
// October. The Tigray war begins 4 November 2020; Tigrayan forces are in
// Lalibela in August 2021 and Dessie in late October; Pretoria is 2 November
// 2022. The order dissolving the regional special forces is April 2023 and the
// Amhara state of emergency is August 2023. Saudi Arabia's amnesty for
// irregular workers ends in November 2013.

const ET = 'Ethiopia'
const IS_ET = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === ET
const AMH = (G) => G.character?.ethnicity === 'amhara'
const HOME = (G) => IS_ET(G) && AMH(G)
const GOJJAM = (G) => G.place?.id === 'et_gojjam'
const WOLLO = (G) => G.place?.id === 'et_wollo'
const NORTH = (G) => GOJJAM(G) || WOLLO(G)
const RURAL = (G) => G.ruralUrban === 'rural'
const ORTHODOX = (G) => G.religion === 'christian_orthodox'
const MALE = (G) => G.character?.gender === 'male'
const once = (G, key) => !G.mem?.[key]

export const AMHARA_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'amh_ft_church_school',
    phase: null,
    weight: 250,
    when: (G) => AMH(G) && G.flags.includes('amh_church_school') && G.age >= 45 && once(G, 'amh_ft_psalms'),
    text: 'At the funeral the priests chant the Psalms of David in Ge\'ez, and you find your mouth moving with them, half a beat ahead. You learned the whole of it under a tree at seven, by ear, without knowing what one word in ten meant, and the meaning came afterwards, in pieces, over forty years. There are fewer boys at the church school now. The ones there are learning it the same way, from the same book, to the same rhythm.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_psalms', true); p.m += 3; p.e += 1 },
  },

  {
    id: 'amh_ft_zemecha',
    phase: null,
    weight: 300,
    when: (G) => AMH(G) && G.flags.includes('amh_zemecha_student') && G.currentYear >= 1995 && G.age >= 36 && once(G, 'amh_ft_zemecha'),
    text: 'In 1975 you were sent south as a student in a khaki shirt with a stack of primers, to teach farmers to read and explain the revolution to them. You taught in Amharic, because that was what there was. It has taken you most of your life to hear how that sounded in a village where the children\'s own language was Sidaamu Afoo, and where the last people from the north to arrive with papers and instructions had come to take the land.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_zemecha', true); p.e += 3; p.r += 3 },
  },

  {
    id: 'amh_ft_walked_home',
    phase: null,
    weight: 999,
    when: (G) => AMH(G) && G.flags.includes('amh_derg_soldier') && G.currentYear === 1991 && once(G, 'amh_walk'),
    text: 'In May the army you are in stops being an army. Asmara falls, then Addis, and the soldiers of the Derg take off their uniforms and start walking south through Tigray, through the country of the men they were fighting last week, who mostly let them pass and sometimes feed them. You walk for thirty-one days. When you reach the village your mother does not know you, and then she does, and then she will not let go of your wrist.',
    context: 'When the Derg collapsed in May 1991, hundreds of thousands of its conscripts were stranded in Eritrea and the north. Many were disarmed and released by the EPLF and TPLF and walked home; they returned to no pension, no recognition, and the suspicion attached to the losing side.',
    choices: null,
    effect: (p) => { p.setMem('amh_walk', true); p.h -= 6; p.m += 4; p.addFlag('amh_walked_home') },
  },

  {
    id: 'amh_ft_veteran',
    phase: null,
    weight: 250,
    when: (G) => AMH(G) && G.flags.includes('amh_walked_home') && G.age >= 45 && G.currentYear >= 2000 && once(G, 'amh_ft_vet'),
    text: 'There is no pension for a soldier of an army that lost, and no day in the year when anyone says your war\'s name aloud. The men you served with are in the district still, farming, and you know each other at the market by a particular way of standing in a queue. Once a year one of you dies and the others go to the funeral, and nobody at the funeral asks why these particular men came.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_vet', true); p.r += 4; p.m -= 2 },
  },

  {
    id: 'amh_ft_mete',
    phase: null,
    weight: 300,
    when: (G) => AMH(G) && IS_ET(G) && G.flags.includes('amh_resettled') && G.currentYear >= 1995 && G.currentYear <= 2017 && G.age >= 18 && once(G, 'amh_ft_mete'),
    text: 'The children of the resettlement villages were born in Wollega and speak Oromiffa at the market better than their parents ever will. The land you farm was given to your family by the Derg in 1985 out of a forest. Under the new constitution the region belongs to the people whose name it carries, and at the kebele office you are mete — one who came. Nobody has been unkind about it yet.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_mete', true); p.m -= 2; p.e += 2 },
  },

  {
    id: 'amh_ft_leave_wollega',
    phase: null,
    weight: 900,
    when: (G) => AMH(G) && IS_ET(G) && G.flags.includes('amh_resettled') && G.place?.id === 'et_rural' &&
      G.currentYear >= 2020 && G.currentYear <= 2024 && G.age >= 16 && once(G, 'amh_ft_leave'),
    text: 'Word comes along the road in the night from the next kebele, and by morning the Amhara families of the old resettlement villages are loading what they can onto whatever moves. There have been killings in the villages around Gimbi, and the armed men in the forest and the militias out of the hills each have their account, and people on every side have buried people. Your family came here from Wollo in 1985 because the Derg put you on a truck. You could go back the same way, with less.',
    context: 'Amhara communities in western Oromia, many descended from people resettled there by the Derg in the 1980s, suffered repeated mass killings from 2020, including at Tole in Gimbi district in June 2022; the government blamed the Oromo Liberation Army, which denied it. Oromo civilians were also killed by Amhara militias in the same years. Tens of thousands fled to camps in the Amhara region.',
    choices: [
      {
        text: 'Go back to Wollo',
        tag: 'yielding',
        outcome: 'Your mother\'s brother\'s village takes you in. It has no land for you and says so, kindly, every day.',
        effect: (p) => { p.setMem('amh_ft_leave', true); p.relocate('et_wollo'); p.wipeMoney(0.6); p.m -= 8 },
      },
      {
        text: 'Stay on the land',
        tag: 'defiant',
        outcome: 'You stay. The house is still yours and the fields are still yours, and the nights are very long.',
        effect: (p) => { p.setMem('amh_ft_leave', true); p.m -= 6; p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_ft_reclassified',
    phase: null,
    weight: 250,
    when: (G) => HOME(G) && G.flags.includes('amh_1991_reclassified') && G.age >= 45 && G.currentYear >= 2008 && once(G, 'amh_ft_id'),
    text: 'There is a line on your kebele card for nationality. Before 1991 you would not have known what to write on it; you were Ethiopian, Orthodox, from Gojjam or Wollo, in that order or another. Now you are Amhara before you are anything else — to the government, to the boy at the checkpoint, and more and more to your own children, who say it the way you used to say Ethiopian.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_id', true); p.e += 2; p.r += 2 },
  },

  {
    id: 'amh_ft_2015',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && G.flags.includes('amh_2005_voter') && G.currentYear === 2015 && once(G, 'amh_ft_2015'),
    text: 'In May the results come in, and the ruling front and its allies have won every seat in parliament. Every one. In 2005 the queues went round the block and the opposition took the capital, and by November of that year you had seen what the vote cost. This time you vote because not voting is also written down.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_2015', true); p.m -= 3; p.e += 1 },
  },

  {
    id: 'amh_ft_2018',
    phase: null,
    weight: 500,
    when: (G) => HOME(G) && G.flags.includes('amh_2016_protest') && G.currentYear === 2018 && once(G, 'amh_ft_2018'),
    text: 'In January the government begins letting political prisoners out, and in April a new prime minister stands up in parliament and apologises for the people the state has killed. The boy from your street who was taken in 2016 comes home thinner and will not say where he was held. For a few months everybody talks at once.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_2018', true); p.m += 5 },
  },

  {
    id: 'amh_ft_after_pretoria',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && G.flags.includes('amh_war_2021') && G.currentYear >= 2023 && G.currentYear <= 2026 && G.age >= 14 && once(G, 'amh_fano'),
    text: 'The war that ended at Pretoria ended without you; the agreement was between the federal government and the Tigrayans, and the men from your district who fought beside the army heard about it on the radio like everybody else. In the spring the government orders the regional forces disbanded, and by the summer the same young men are in the hills with the same rifles, fighting the army they fought beside. The road to town is closed more days than it is open. The school has not reopened.',
    context: 'The Pretoria agreement of November 2022 between the federal government and the TPLF did not include Amhara forces. The federal order of April 2023 to integrate regional special forces into the army set off an insurgency by Fano militias; a state of emergency was declared in the Amhara region in August 2023, with drone strikes, internet shutdowns and millions of children out of school.',
    choices: null,
    effect: (p) => { p.setMem('amh_fano', true); p.m -= 8; p.r += 3 },
  },

  {
    id: 'amh_ft_gulf_contract',
    phase: null,
    weight: 400,
    when: (G) => AMH(G) && G.flags.includes('amh_gulf_worker') && G.currentCountry?.name === 'Saudi Arabia' &&
      G.residencyStatus === 'work_visa' && (G.yearsAbroad ?? 0) >= 2 && once(G, 'amh_ft_contract'),
    text: 'The two years are over. The woman of the house gives you back your passport at the airport, the way she took it, and an envelope that is exactly what the contract said and not a riyal more. You have not been outside the house alone since you arrived, except to the rubbish bins and twice to a clinic. There is an agency that will sign you for two more.',
    choices: [
      {
        text: 'Go home with what you have saved',
        tag: null,
        outcome: 'At Bole the family has hired a minibus, and your little brother does not recognise you for the whole of the drive.',
        effect: (p) => { p.setMem('amh_ft_contract', true); p.relocate('et_wollo', null, { residency: 'citizen' }); p.mo += 1500; p.m += 6; p.setMem('amhGulfHome', true) },
      },
      {
        text: 'Sign for two more years',
        tag: null,
        outcome: 'You sign. The house at home will have a second room, and you will not see it built.',
        effect: (p) => { p.setMem('amh_ft_contract', true); p.mo += 900; p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_ft_gulf_deported',
    phase: null,
    weight: 600,
    when: (G) => AMH(G) && G.flags.includes('amh_gulf_worker') && G.currentCountry?.name === 'Saudi Arabia' &&
      G.residencyStatus === 'undocumented' && G.currentYear >= 2013 && once(G, 'amh_ft_deported'),
    text: (G) => (G.currentYear <= 2014
      ? 'In November the amnesty ends, and the police come through Manfouha at night, where the Ethiopians live. '
      : 'The sweeps come to Manfouha again, where the Ethiopians live, and this time your street is on the list. ') +
      'There are days in a holding centre with a thousand people and one tap, and then a plane. You land at Bole with a plastic bag and the clothes you have on, and a government official hands you a bottle of water and a leaflet about starting a small business.',
    context: 'When Saudi Arabia\'s amnesty for irregular workers ended in November 2013, clashes in Riyadh\'s Manfouha district were followed by the deportation of more than 160,000 Ethiopians in a few months. Campaigns against undocumented workers have recurred since.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_deported', true); p.relocate('et_wollo', null, { residency: 'citizen' }); p.wipeMoney(0.8); p.m -= 8; p.setMem('amhGulfHome', true) },
  },

  {
    id: 'amh_ft_gulf_house',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('amh_gulf_worker') && G.mem?.amhGulfHome && G.age >= 23 && once(G, 'amh_ft_house'),
    text: 'The money from the kitchen in Riyadh became a house in Kombolcha with a gate and a corrugated roof, and a shop on the street side that your brother runs. You do not talk about the kitchen. Girls from the village come to ask you how to go, and you tell them the name of the agency, and the other things too, which they do not believe.',
    choices: null,
    effect: (p) => { p.setMem('amh_ft_house', true); p.m += 3; p.karma += 2 },
  },

  // ── CHILDHOOD ──────────────────────────────────────────────────────────────

  {
    id: 'amh_church_school',
    phase: null,
    weight: 80,
    when: (G) => HOME(G) && RURAL(G) && ORTHODOX(G) && MALE(G) && G.age >= 6 && G.age <= 10 && once(G, 'amh_fidel'),
    text: 'The priest teaches the fidel under the wanza tree beside the church: the letters, then each letter in its seven forms, sung, and then the Psalms of David in Ge\'ez, a language nobody in the village speaks. You learn by chanting with the others until the rhythm carries the words. When you drop a line he taps the back of your hand with a thin stick, not hard. By the rainy season you can sing a whole psalm and read none of it.',
    choices: null,
    effect: (p) => { p.setMem('amh_fidel', true); p.e += 3; p.addFlag('amh_church_school') },
  },

  {
    id: 'amh_church_wall',
    phase: null,
    weight: 60,
    when: (G) => HOME(G) && RURAL(G) && ORTHODOX(G) && !MALE(G) && G.age >= 6 && G.age <= 11 && once(G, 'amh_fidel'),
    text: 'Your brother goes to the priest\'s school under the tree by the church and comes home chanting the letters in their seven orders. You are fetching water and minding the calf, and the school is not for you, and nobody has needed to say so. You learn the chant anyway, from the other side of the wall while the calf grazes. The shapes of the letters you never learn, because nobody draws them for you in the dust.',
    choices: null,
    effect: (p) => { p.setMem('amh_fidel', true); p.e += 1; p.r += 2 },
  },

  {
    id: 'amh_rist',
    phase: null,
    weight: 60,
    when: (G) => HOME(G) && GOJJAM(G) && G.age >= 25 && G.currentYear >= 1935 && G.currentYear <= 1974 && once(G, 'amh_rist'),
    text: 'Your case over the rist land has been before the courts for eleven years. On the day it is heard you stand in front of the judge and recite your ancestors back to the man who first held the land, twelve names, and your cousin recites his, and the two lines of names meet somewhere around the seventh. Everyone in Gojjam has a case like this. A good memory for the dead is worth more than a mule.',
    choices: [
      {
        text: 'Press the case to the end',
        tag: null,
        outcome: 'In the twelfth year you win a strip the width of two oxen, and your cousin stops greeting you on the road.',
        effect: (p) => { p.setMem('amh_rist', true); p.mo += 150; p.karma -= 2 },
      },
      {
        text: 'Settle with your cousin',
        tag: null,
        outcome: 'You split it. Both of you tell it afterwards as a victory, which is what a settlement is for.',
        effect: (p) => { p.setMem('amh_rist', true); p.karma += 3; p.m += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_school_yard',
    phase: null,
    weight: 120,
    when: (G) => HOME(G) && G.literate && G.age >= 12 && G.age <= 18 && G.currentYear >= 1955 && G.currentYear <= 1990 && once(G, 'amh_yard'),
    text: 'At the secondary school in town there are boys from the south who speak Amharic the way you chant the Ge\'ez of the psalms, correctly and from outside. They are punished for speaking their own languages in the yard. You have never once been punished for speaking yours, and it has not occurred to you that this was a thing that could happen to a person until you watch it happen to one.',
    context: 'Under Haile Selassie and the Derg, Amharic was the sole language of government and, from the mid-1950s, of primary education nationwide. Children whose first language was Oromo, Tigrinya, Sidama, Somali or any of Ethiopia\'s eighty others were taught in it, and often punished for speaking their own at school.',
    choices: null,
    effect: (p) => { p.setMem('amh_yard', true); p.e += 3 },
  },

  // ── THE EMPEROR AND THE DERG ───────────────────────────────────────────────

  {
    id: 'amh_gojjam_1968',
    phase: null,
    weight: 600,
    when: (G) => HOME(G) && GOJJAM(G) && G.currentYear >= 1968 && G.currentYear <= 1969 && G.age >= 12 && once(G, 'amh_1968'),
    text: 'The emperor\'s government has sent men to measure the land for a new tax on what it grows, and in Gojjam, where land is held by descent and not by the emperor\'s grant, nobody intends to be measured. The men of the district take their rifles up into the hills. The officials go back to Addis. By the next year the tax has quietly been dropped, and the old men say that is what Gojjam is for.',
    context: 'Peasants in Gojjam rose in 1968 against the agricultural income tax of 1967 and the land measurement it required. After months of resistance the imperial government suspended the assessment in the province and removed the governor.',
    choices: null,
    effect: (p) => { p.setMem('amh_1968', true); p.m += 3; p.e += 1 },
  },

  {
    id: 'amh_wollo_1973',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && WOLLO(G) && G.currentYear === 1973 && G.age >= 4 && once(G, 'amh_1973'),
    text: 'The rains fail two years running, and people walk out of the villages on the escarpment toward the main road and Dessie, where there might be something. In Addis nobody official says the word famine. Your family eats the seed grain in March. The next year the soldiers show a British film of the camps on television, cut together with the emperor feeding meat to his dogs, and in the morning the emperor is gone.',
    context: 'The Wollo famine of 1972-74 killed an estimated 40,000 to 80,000 people, and the imperial government\'s concealment of it helped bring the monarchy down. On 11 September 1974 state television broadcast Jonathan Dimbleby\'s film "The Unknown Famine" intercut with scenes of palace life; Haile Selassie was deposed the next morning.',
    choices: null,
    effect: (p) => { p.setMem('amh_1973', true); p.h -= 6; p.m -= 6; p.addFlag('famine_memory') },
  },

  {
    id: 'amh_land_1975',
    phase: null,
    weight: 500,
    when: (G) => HOME(G) && RURAL(G) && G.currentYear >= 1975 && G.currentYear <= 1976 && G.age >= 16 && once(G, 'amh_land'),
    text: 'In March the radio says that all rural land now belongs to the people, and nobody may hold more than ten hectares or hire anyone to work it. In the south, where tenants have been handing half their harvest to landlords whose grandfathers came from the north, people dance. Here, where most families already held land by descent, the news is received as one more thing to wait out. The peasant association meets in the churchyard, and the man elected chairman is the one with the most oxen.',
    choices: null,
    effect: (p) => { p.setMem('amh_land', true); p.e += 2 },
  },

  {
    id: 'amh_zemecha',
    phase: null,
    weight: 800,
    when: (G) => HOME(G) && G.literate && G.age >= 16 && G.age <= 24 && G.currentYear >= 1975 && G.currentYear <= 1976 && once(G, 'amh_zemecha'),
    text: 'The university and the upper schools are closed and their students sent out to the countryside for the Zemecha — Development through Cooperation — some fifty thousand of them in khaki with primers and pamphlets. You are posted to a village in Sidamo where nobody speaks Amharic except the district official. You teach the alphabet in the mornings and the land proclamation in the afternoons. The farmers listen to you with a patience you will only understand much later.',
    choices: null,
    effect: (p) => { p.setMem('amh_zemecha', true); p.e += 3; p.h -= 2; p.addFlag('amh_zemecha_student') },
  },

  {
    id: 'amh_derg_conscript',
    phase: null,
    weight: 500,
    when: (G) => HOME(G) && MALE(G) && G.age >= 18 && G.age <= 30 && G.currentYear >= 1983 && G.currentYear <= 1989 && once(G, 'amh_afesa'),
    text: 'The recruiters come on market day with a lorry, because the district\'s quota for national service is short. At the sound of the engine men scatter into the teff, and the slow ones are lifted into the back. Your name is on the peasant association\'s list in any case.',
    choices: [
      {
        text: 'Go when they call you',
        tag: 'yielding',
        outcome: 'Three months of training and then Eritrea, a place whose name you knew only from songs about it being ours.',
        effect: (p) => { p.setMem('amh_afesa', true); p.h -= 4; p.m -= 6; p.addFlag('amh_derg_soldier') },
      },
      {
        text: 'Hide in the grain store until the lorry has gone',
        tag: 'defiant',
        outcome: 'For two years you spend market days in the dark. The lorry takes the man next door instead.',
        effect: (p) => { p.setMem('amh_afesa', true); p.r += 5; p.m -= 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_resettlement',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && WOLLO(G) && G.currentYear >= 1984 && G.currentYear <= 1986 && G.age >= 6 && once(G, 'amh_resettle'),
    text: 'The famine is in its second year when the government trucks come to the feeding centre and the cadres begin reading out names. The resettlement will take you west to Wollega, where there is rain and land, and there is no line on the form for whether you want to go. Some families are split between trucks and do not find each other for years. You arrive in a cleared forest with a plot number and a hoe.',
    context: 'In 1984-86 the Derg moved some 600,000 people from the famine-struck north, mostly Wollo and Tigray, to the south-west. Many went under compulsion, families were separated, and tens of thousands died in transit or in the first years. The communities that remained became the Amhara minorities of western Oromia and Benishangul.',
    choices: null,
    effect: (p) => { p.setMem('amh_resettle', true); p.relocate('et_rural'); p.h -= 6; p.m -= 8; p.addFlag('amh_resettled'); p.addFlag('famine_memory') },
  },

  // ── 1991 AND AFTER ─────────────────────────────────────────────────────────

  {
    id: 'amh_1991',
    phase: null,
    weight: 600,
    when: (G) => HOME(G) && G.currentYear >= 1991 && G.currentYear <= 1995 && G.age >= 12 && once(G, 'amh_1991'),
    text: 'The fighters who come into Addis in May are mostly Tigrayan, and the new government speaks in a vocabulary of nations and nationalities nobody in your village has used before. By 1995 the country has been redrawn along the lines of its languages, and there is a region with your name on it, and the official at the woreda asks what you are before he asks what you want. In other regions there are people who hear Amhara and think of the emperor\'s soldiers, the landlords, the teacher with the stick. You think of your grandmother, who never went further than the market.',
    context: 'The 1994 constitution reorganised Ethiopia into ethnically defined regional states, and ethnic identity was recorded on ID cards. In the south the Amhara were widely identified with the imperial conquest of the 1880s-90s and with the northern settlers, the neftegna, who were given land there — a history the new order foregrounded.',
    choices: null,
    effect: (p) => { p.setMem('amh_1991', true); p.e += 2; p.addFlag('amh_1991_reclassified') },
  },

  {
    id: 'amh_2005',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && G.currentYear === 2005 && G.age >= 18 && once(G, 'amh_2005'),
    text: (G) => (RURAL(G)
      ? 'In May the queue at the school goes out past the church, and people wait all day in the sun with their cards. '
      : 'In May the queues at the polling stations start before dawn and go round the block, and people wait all day under umbrellas. ') +
      'The opposition takes every seat in Addis Ababa. In June, and again in November, the police fire into crowds protesting the count, and nearly two hundred people are killed, and the opposition\'s leaders are put on trial for treason. The ink on your finger lasts a week.',
    context: 'In the May 2005 election the Coalition for Unity and Democracy won every Addis Ababa seat. An official inquiry later counted 193 civilians killed in the June and November protests over the results; tens of thousands were detained and the coalition\'s leadership was tried for treason and later pardoned.',
    choices: null,
    effect: (p) => { p.setMem('amh_2005', true); p.m -= 4; p.addFlag('amh_2005_voter') },
  },

  {
    id: 'amh_2016',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && (NORTH(G) || G.ruralUrban !== 'rural') && G.currentYear === 2016 && G.age >= 14 && once(G, 'amh_2016'),
    text: 'In July soldiers try to arrest a colonel in Gondar who sits on the committee for Wolkait, the district your parents\' generation says is Amhara land and the maps of 1991 gave to Tigray. The town fights back. By August there are protests in Bahir Dar, and the region\'s shops are shut for a stay-at-home strike, and the internet is off. In October a state of emergency is declared across the whole country.',
    context: 'In July 2016 an attempt to arrest Colonel Demeke Zewdu of the Wolkait Amhara Identity Committee led to a gunfight in Gondar and protests across the Amhara region; dozens were killed in Bahir Dar on 7 August. With the Oromo protests of the same year, they led to a national state of emergency in October 2016.',
    choices: [
      {
        text: 'Stay home with everyone else',
        tag: 'defiant',
        outcome: 'The street is silent for days. Silence, it turns out, is also something a person can be arrested for organising.',
        effect: (p) => { p.setMem('amh_2016', true); p.karma += 3; p.mo -= 100; p.addFlag('amh_2016_protest') },
      },
      {
        text: 'Carry on as usual',
        tag: 'yielding',
        outcome: 'You go out in the morning and there is nobody to sell to and nobody to buy from, and you come home by noon.',
        effect: (p) => { p.setMem('amh_2016', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_war_wollo',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && WOLLO(G) && G.currentYear === 2021 && G.age >= 10 && once(G, 'amh_war'),
    text: 'In July the war that began in Tigray last November comes south into Wollo. Tigrayan forces are in Woldia, then Lalibela, then Dessie; there are killings in Chenna and Kobo, and houses emptied of everything that can be carried, down to the beds in the hospital. Your village is on the road. You bury things in the field, the way your grandparents did when the Italians came.',
    context: 'Tigrayan forces advanced into the Amhara region from July 2021, reaching Dessie and Kombolcha in late October before federal forces pushed them back in December. Human Rights Watch and Amnesty International documented summary killings of Amhara civilians in Chenna and Kobo and widespread looting; abuses by federal and Amhara forces in Tigray were documented by the same organisations.',
    choices: [
      {
        text: 'Stay with the house',
        tag: 'defiant',
        outcome: 'The fighters come through twice and take the grain and the radio. They do not take you, which you will spend some time thinking about.',
        effect: (p) => { p.setMem('amh_war', true); p.m -= 10; p.wipeMoney(0.4); p.addFlag('amh_war_2021') },
      },
      {
        text: 'Take the family up the mountain',
        tag: 'yielding',
        outcome: 'For six weeks you live in a church compound on the ridge with four hundred other people and one well.',
        effect: (p) => { p.setMem('amh_war', true); p.h -= 5; p.m -= 8; p.addFlag('amh_war_2021') },
      },
    ],
    effect: null,
  },

  {
    id: 'amh_war_gojjam',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && !WOLLO(G) && G.currentYear >= 2020 && G.currentYear <= 2022 && G.age >= 14 && once(G, 'amh_war'),
    text: 'In November the war begins in Tigray, and the regional forces and the militia and young men calling themselves Fano go north with the army. They take Humera and Wolkait and say they have taken back what was taken in 1991. Months later the foreign reports say the Tigrayans who lived there were driven out in their tens of thousands, and at the market nobody wants to talk about that part. Your nephew comes home in the spring with a Kalashnikov and a new way of standing.',
    context: 'Amhara regional forces and militias fought alongside the federal army in western Tigray from November 2020 and took control of the Wolkait area, which Amhara activists had long claimed. Human Rights Watch and Amnesty International concluded in 2022 that Tigrayan civilians there had been subjected to a campaign of ethnic cleansing. The Mai Kadra massacre of November 2020, in which several hundred mostly Amhara labourers were killed, was followed by reprisals against Tigrayans.',
    choices: null,
    effect: (p) => { p.setMem('amh_war', true); p.m -= 5; p.addFlag('amh_war_2021') },
  },

  {
    id: 'amh_fano_years',
    phase: null,
    weight: 600,
    when: (G) => HOME(G) && (NORTH(G) || RURAL(G)) && !G.flags.includes('amh_war_2021') && G.currentYear >= 2023 && G.currentYear <= 2026 && G.age >= 12 && once(G, 'amh_fano'),
    text: 'In April the government orders the regional special forces disbanded, and by August the young men of the district are in the hills and the army is in the towns. The road is closed more days than it is open; the internet has been off since the summer; the school did not open this year. At night there is the sound of a drone, which nobody here had a word for two years ago.',
    choices: null,
    effect: (p) => { p.setMem('amh_fano', true); p.m -= 7; p.e -= 1 },
  },

  // ── LEAVING ────────────────────────────────────────────────────────────────

  {
    id: 'amh_gulf',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && !MALE(G) && G.age >= 17 && G.age <= 28 && G.currentYear >= 2002 && G.currentYear <= 2020 && (NORTH(G) || RURAL(G)) && once(G, 'amh_gulf'),
    text: 'Half the girls you were at school with are in Saudi Arabia, or Dubai, or Beirut, and the ones who come back build houses with gates. There is an agency in Dessie with a two-year contract and a medical, and there is the other road, through Djibouti and across the water to Yemen, which costs less and needs no papers. Your mother says nothing either way, which is how you know she has already decided.',
    choices: [
      {
        text: 'Go through the agency',
        tag: null,
        outcome: 'At the airport in Riyadh the woman whose kitchen you will spend the next two years in takes your passport and puts it in her handbag.',
        effect: (p) => { p.setMem('amh_gulf', true); p.emigrateTo('Saudi Arabia', { residency: 'work_visa' }); p.addFlag('amh_gulf_worker'); p.m -= 4 },
      },
      {
        text: 'Take the sea road',
        tag: 'defiant',
        outcome: 'Eleven days to the coast, a night on a boat with a hundred others, and then the long walk north through Yemen with men you do not trust.',
        effect: (p) => { p.setMem('amh_gulf', true); p.emigrateTo('Saudi Arabia', { residency: 'undocumented' }); p.addFlag('amh_gulf_worker'); p.h -= 8; p.m -= 8 },
      },
      {
        text: 'Stay',
        tag: 'yielding',
        outcome: 'You stay. The girls who went send photographs of themselves in shopping centres, standing very straight.',
        effect: (p) => { p.setMem('amh_gulf', true); p.r += 4 },
      },
    ],
    effect: null,
  },
]
