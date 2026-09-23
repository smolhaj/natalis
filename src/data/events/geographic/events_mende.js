// events_mende.js — the south and east of Sierra Leone, where the war began.
//
// The roster draws 31% of Sierra Leoneans as Mende and no guard in the corpus
// had ever named them. The country's content that existed was the RUF war
// told generally, and the Bondo/Sande initiation told as a Temne or national
// matter. What was missing is the particular country the Mende live in — the
// upland rice farm and the inland swamp, the Poro and Sande bush, the diamond
// fields at Tongo and the diggers who went to Kono — and the particular shape
// the war had there: it came over the Liberian border into Kailahun and
// Pujehun in 1991, it sat in Kailahun for ten years, and in the south the
// defence against it was built out of the Mende hunters' society, the
// Kamajors, whose leader the peace then put on trial.
//
// Both halves of that go in. The Kamajors defended villages the army had
// abandoned or was looting, and the Civil Defence Forces also killed
// prisoners and people accused of collaborating; the Special Court convicted
// two of their leaders for it. The events say what happened to the person;
// the context notes say what the record says.
//
// Written for who the engine produces. Births run 1921 to 2023, three in four
// rural, fewer than one in five literate, median death in the late thirties.
// Before this module every rural Mende was born in Kono, which was Sierra
// Leone's only rural place; `places.js` now has a village in Kailahun and one
// in Pujehun, plus Bo and Kenema, keyed with `homeOf`. So most of these events
// are farm, bush and village, and the war is written from the path and the
// swamp, not from Freetown.
//
// Dates used, all checked. Independence is 27 April 1961 under Sir Milton
// Margai. The March 1967 election, Brigadier Lansana's intervention and the
// counter-coup are 21-23 March 1967; Stevens returns in April 1968. The one-
// party constitution is 1978. The Ndogboyosoi troubles in Pujehun follow the
// 1982 election. The RUF crosses at Bomaru, Kailahun District, on 23 March
// 1991, and opens a southern front in Pujehun in April. The NPRC coup is 29
// April 1992. The AFRC coup is 25 May 1997; ECOMOG retakes Freetown in
// February 1998; the RUF enters Freetown on 6 January 1999. The war is
// declared over on 18 January 2002. Hinga Norman is arrested on 10 March 2003
// and dies in Dakar on 22 February 2007; Fofana and Kondewa are convicted in
// August 2007. Ebola is confirmed in Kailahun in May 2014; Dr Sheik Umar Khan
// dies on 29 July; the three-day lockdown is 19-21 September; the outbreak is
// declared over on 7 November 2015. Julius Maada Bio is elected in April 2018.

// Country, ethnicity, gender and rural/urban are written out inside each
// guard rather than behind a helper. The register and specificity classifier
// in events.js reads the `when` source text and cannot see through a helper's
// name to what it tests, so a guard reading HOME(G) was filed as `universal`
// and competed for the 5% of years that register gets.
const SL = 'Sierra Leone'
const KAILAHUN = (G) => G.place?.id === 'sl_kailahun'
const PUJEHUN = (G) => G.place?.id === 'sl_pujehun'
const once = (G, key) => !G.mem?.[key]

export const MENDE_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'mende_ft_poro',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_poro') && G.age >= 45 && once(G, 'mende_ft_poro'),
    text: 'When the boys come out of the Poro bush this year you sit with the elders to receive them. They were inside for weeks, not the whole of a dry season as you were, and the marks on their backs are fresh and raised where yours have gone pale and flat. You know now which of the things said to them in there are true and which are only what is said. You find that you mind the difference less than you expected to.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_poro', true); p.e += 2; p.s += 2 },
  },

  {
    id: 'mende_ft_sande_daughter',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_sande') && G.age >= 30 && G.age <= 60 &&
      (G.children?.length ?? 0) > 0 && G.currentYear >= 1960 && once(G, 'mende_ft_sande'),
    text: 'After the harvest the sowei comes to the house and asks, the way she once asked your mother, when your daughter will go into the bush. The Sande taught you the songs you still sing when you work and how to keep your face still in front of a man who is wrong. It also did the other thing, which nobody explains to a girl before she goes in. Your daughter is in the yard pounding rice, and she is the age you were.',
    context: 'Sande is the women\'s society of the Mende and their neighbours, and initiation into it has long marked a girl\'s passage into womanhood. It has also, historically, included genital cutting: nearly nine in ten Sierra Leonean women reported it in the 2013 national survey. There is no law against it, and a growing number of families keep the society and refuse the cutting, or refuse both.',
    choices: [
      {
        text: 'Tell her after the next harvest',
        tag: null,
        outcome: 'Your daughter goes in the following dry season and comes out oiled and singing. You hold her longer than she wants to be held.',
        effect: (p) => { p.setMem('mende_ft_sande', true); p.r += 3; p.s += 1 },
      },
      {
        text: 'Tell her your daughter will not be cut',
        tag: 'defiant',
        outcome: 'The sowei says nothing and leaves. For a year the women at the stream speak to you a little less.',
        effect: (p) => { p.setMem('mende_ft_sande', true); p.karma += 3; p.s -= 2; p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ft_digger',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'mende' && G.flags.includes('mende_digger') && G.age >= 40 && once(G, 'mende_ft_digger'),
    text: 'You still look at gravel. On a road, in a riverbank, in the sand a child has heaped up by the door, your eye goes to it the way it did for three seasons at the pits, looking for the one piece that is not glass. In all that time you found two stones worth anything. The supporter took the first against the rice he had fed you, and the second paid for a zinc roof that has since rusted through.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_digger', true); p.r += 2; p.e += 1 },
  },

  {
    id: 'mende_ft_1982',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_1982') && G.currentYear >= 1991 && G.currentYear <= 1994 && G.age >= 16 && once(G, 'mende_ft_1982'),
    text: 'The rebels who come into the south in 1991 have men among them who speak your dialect, and one of them you know by his father\'s name. He crossed into Liberia in 1982, when the party\'s youths burned the villages after the election, and he has been over there ever since. He says they have come back to finish what the Ndogboyosoi started. The old women say he has come back to settle what was done to his family, which is not the same thing.',
    context: 'After the 1982 one-party election, violence between supporters of rival APC candidates in Pujehun District — the Ndogboyosoi, named for a bush spirit — was put down by the army and party militias, and villages were burned. Some of those who fled to Liberia returned with the RUF when it opened its southern front through Pujehun in April 1991.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_1982', true); p.r += 3; p.m -= 3 },
  },

  {
    id: 'mende_ft_trc',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_under_ruf') && G.currentYear >= 2003 && G.age >= 16 && once(G, 'mende_ft_trc'),
    text: 'The Truth and Reconciliation Commission sits for a week in the district town, at a table with microphones under a banner. A woman from your village tells it, in Mende, what was done in the dry season of 1991, and the room listens to the interpreter get a word of it slightly wrong. The boy the rebels took from the village came back in 2002 with another name. He farms the plot beside yours now, and on the path you both say good morning.',
    context: 'The commission held public hearings in every district in 2003. Its report found the RUF responsible for the majority of violations in the war, and named the army, the AFRC and the Civil Defence Forces as responsible for many of the rest.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_trc', true); p.r += 3; p.karma += 2 },
  },

  {
    id: 'mende_ft_return_kailahun',
    phase: null,
    weight: 400,
    when: (G) => G.ethnicity === 'mende' && (G.flags.includes('mende_fled_kailahun') || G.flags.includes('mende_refugee_guinea')) &&
      G.currentYear >= 2002 && G.age >= 14 && G.place?.id !== 'sl_kailahun' && once(G, 'mende_ft_return'),
    text: (G) => (G.flags.includes('mende_refugee_guinea') && ((G.currentCountry ?? G.character?.country)?.name === SL) === false
      ? 'The lorries that take people home from the camp at Guéckédou leave on a Tuesday, with a list, and your family\'s name is on it. '
      : 'The road to Kailahun is open, and the lorries on it are full of people going back. ') +
      'Somebody who went ahead sends word: the mosque is standing, the school has no roof, and the farm has gone back to bush. The land is still yours. Nobody knows yet what that is worth.',
    choices: [
      {
        text: 'Go back and brush the farm',
        tag: null,
        outcome: 'The first year you eat what the swamp gives and sleep in a house with a tarpaulin for a roof. The second year there is rice.',
        effect: (p) => { p.setMem('mende_ft_return', true); p.relocate('sl_kailahun', 'informal', { residency: 'citizen' }); p.m += 3; p.h -= 2 },
      },
      {
        text: 'Stay where the life is now',
        tag: null,
        outcome: 'You send money back for the roof and do not go yourself. Your children say Kailahun the way you say the old days.',
        effect: (p) => { p.setMem('mende_ft_return', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ft_return_pujehun',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_fled_pujehun') && G.currentYear >= 2002 && G.age >= 14 &&
      G.place?.id !== 'sl_pujehun' && once(G, 'mende_ft_return'),
    text: 'The camp at Gondama empties a lorry at a time, and at last it is your family\'s turn. Word comes from Pujehun that the swamp is still there and the upland has gone back to bush, and that some of the houses are standing and some are only their floors. The paramount chief has come back and is holding court under the cotton tree. You have been in Bo long enough that your youngest does not remember the village at all.',
    choices: [
      {
        text: 'Go back to the village',
        tag: null,
        outcome: 'You sleep the first month in the one room that has a roof, with two other families. By the rains the swamp is planted.',
        effect: (p) => { p.setMem('mende_ft_return', true); p.relocate('sl_pujehun', 'informal', { residency: 'citizen' }); p.m += 3; p.h -= 2 },
      },
      {
        text: 'Stay in Bo',
        tag: null,
        outcome: 'You stay. At harvest a cousin sends a bag of the new rice, and it tastes of the swamp you grew up beside.',
        effect: (p) => { p.setMem('mende_ft_return', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ft_displaced',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_displaced') && G.currentYear >= 2003 && G.age >= 16 && once(G, 'mende_ft_displaced'),
    text: 'The camp at Gondama is gone, and where it stood there are houses of mud block that the people who never went home built one course at a time. You are one of them. The village you walked out of in the night is a name you give when somebody asks where you are from, and you give it without thinking. Your children, asked the same thing, say Bo.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_displaced', true); p.r += 3; p.m -= 1 },
  },

  {
    id: 'mende_ft_kamajor',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_kamajor') && G.currentYear >= 2002 && G.age >= 22 && once(G, 'mende_ft_kamajor'),
    text: 'At the disarmament camp you hand in the gun, have your name written in a book and your photograph taken, and are given a card and the first part of an allowance. Nobody asks for the charms, because the charms were never the government\'s. You still have the gown with the mirrors and the little horns sewn into it, folded in a bag under the bed. Some of what you did at the checkpoint on the Bo road you have never said aloud, and nobody has asked.',
    context: 'The Kamajors were initiated hunters of the Mende country who became the core of the Civil Defence Forces. They defended villages the army could not or would not, and they also killed captured fighters and civilians accused of collaboration. Some 72,000 combatants of all sides were disarmed by early 2002.',
    choices: [
      {
        text: 'Keep the gown',
        tag: null,
        outcome: 'It stays under the bed. Once a year you take it out and put it back again.',
        effect: (p) => { p.setMem('mende_ft_kamajor', true); p.r += 3; p.m -= 1 },
      },
      {
        text: 'Take it back to the initiator',
        tag: null,
        outcome: 'He takes it without a word and gives you a kola nut. The walk home is shorter than you expected.',
        effect: (p) => { p.setMem('mende_ft_kamajor', true); p.m += 2; p.karma += 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ft_norman',
    phase: null,
    weight: 400,
    when: (G) => G.ethnicity === 'mende' && G.flags.includes('mende_norman') && G.currentYear >= 2007 && once(G, 'mende_ft_norman'),
    text: (G) => 'In February the news comes that Hinga Norman has died in Dakar, after an operation on his hip, with no verdict ever read. ' +
      (G.flags.includes('mende_kamajor')
        ? 'You had waited four years to hear a court say whether the war you fought was a crime. Now it will only ever be what people say it was.'
        : 'In August the court convicts the two men tried beside him. In the barbershop in town his photograph stays on the wall, and nobody takes it down.'),
    context: 'The Special Court for Sierra Leone indicted Samuel Hinga Norman, national coordinator of the Civil Defence Forces and a serving minister, in March 2003. Many in the south saw the trial of the man who had organised the defence against the RUF as a betrayal. He died on 22 February 2007, before judgment; Moinina Fofana and Allieu Kondewa were convicted in August 2007.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_norman', true); p.r += 3; p.m -= 3 },
  },

  {
    id: 'mende_ft_ebola',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_ebola') && G.currentYear >= 2016 && once(G, 'mende_ft_ebola'),
    text: 'In the burial ground outside town the Ebola graves are in rows, and each one had a number on a stick. Some of the numbers have been painted over with names by families who came back to look, and some are still only numbers. You go to one of them in the dry season and clear the grass from it with your hands. It is a year before you notice you have stopped shaking hands with people.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_ebola', true); p.r += 3; p.m -= 2 },
  },

  {
    id: 'mende_ft_america',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'mende' && G.flags.includes('mende_dv') && ((G.currentCountry ?? G.character?.country)?.name === SL) === false && G.yearsAbroad >= 4 && once(G, 'mende_ft_america'),
    text: 'Every month the money goes home through a man in a shop who knows the family, and every month someone at home needs more of it than was sent: a school fee, a roof, a funeral. You work nights on a ward, lifting people who do not know your name. On the phone your mother asks when you are coming, and you say next year, and both of you know the word for that.',
    choices: null,
    effect: (p) => { p.setMem('mende_ft_america', true); p.r += 3; p.mo -= 300; p.karma += 2 },
  },

  // ── THE FARM AND THE BUSH ──────────────────────────────────────────────────

  {
    id: 'mende_bird_scaring',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.ruralUrban === 'rural' && G.age >= 6 && G.age <= 12 && once(G, 'mende_birds'),
    text: 'When the upland rice begins to head, you are sent to the platform in the middle of the farm before light with a sling and a tin with stones in it. The weaver birds come in clouds, and you shout and rattle the tin and sling mud at them until your voice is gone. Your mother brings cassava at noon. In the evening the whole farm sounds like children shouting at birds from one end of the valley to the other.',
    choices: null,
    effect: (p) => { p.setMem('mende_birds', true); p.h += 1; p.m += 2 },
  },

  {
    id: 'mende_hungry_season',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.ruralUrban === 'rural' && G.age >= 8 && G.age <= 60 && once(G, 'mende_hungry'),
    text: 'By July the rice store is swept to the floor, and the new rice is still green on the upland. Everybody calls these the hungry months as if it were a season like the rains, which it is. You eat cassava leaf with more leaf than anything else, and the children are sent to eat at whichever aunt still has a pot on. When the first new rice is cut, early and on purpose, the whole village smells of it.',
    choices: null,
    effect: (p) => { p.setMem('mende_hungry', true); p.h -= 2; p.r += 1 },
  },

  {
    id: 'mende_swamp',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.ruralUrban === 'rural' && G.age >= 16 && G.age <= 55 && once(G, 'mende_swamp'),
    text: (G) => G.character?.gender === 'male'
      ? 'You and the men of the kuu, the work group, brush the upland farm in the dry season and burn it in March, and the smoke stands over the valley for a week. The labour moves from farm to farm and the owner of each one feeds everybody. When it is your farm\'s turn your wife has cooked since dawn. The drum goes with you to the field, because work goes faster to a drum.'
      : 'In the inland swamp the water is to your shins and the leeches find you by the second hour. You and the other women transplant the rice seedlings in lines, singing so the lines keep straight, and your back is a single ache by noon. The swamp gives rice when the upland fails. That is why the women go into it.',
    choices: null,
    effect: (p) => { p.setMem('mende_swamp', true); p.h -= 1; p.s += 1 },
  },

  {
    id: 'mende_poro',
    phase: null,
    weight: 120,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.character?.gender === 'male' && G.age >= 10 && G.age <= 16 && once(G, 'mende_society'),
    text: 'One night in the dry season the Poro spirit comes into the village, and the women and uninitiated children are shut indoors while it passes. In the morning you are among the boys taken into the bush. What happens there is not told, except that the marks it leaves on your back are what the Poro spirit\'s teeth are said to leave when it swallows a boy, and that you come out a man. You come out weeks later, oiled and with a new name for use inside the society.',
    context: 'The Poro is the men\'s society of the Mende and many of their neighbours. Membership is near universal among Mende men in the countryside, and the society has historically regulated farming, trade and war and advised chiefs.',
    choices: null,
    effect: (p) => { p.setMem('mende_society', true); p.s += 3; p.h -= 2; p.addFlag('mende_poro') },
  },

  {
    id: 'mende_sande',
    phase: null,
    weight: 120,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.character?.gender !== 'male' && G.age >= 10 && G.age <= 16 && once(G, 'mende_society'),
    text: 'You go into the Sande bush with the other girls your age, and for weeks the village only hears your singing from beyond the trees. Inside, the older women teach you songs, dances, medicines, and how a wife speaks and does not speak. You come out covered in white clay, and the sowei in her black helmet mask dances in front of you through the village. What was done to you on the first days in there you do not speak about, because nobody does.',
    context: 'The sowei mask, a black wooden helmet carved with rings at the neck, is one of the very few masks in Africa danced by women.',
    choices: null,
    effect: (p) => { p.setMem('mende_society', true); p.s += 3; p.h -= 3; p.addFlag('mende_sande') },
  },

  {
    id: 'mende_school',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.literate && G.age >= 7 && G.age <= 13 && once(G, 'mende_school'),
    text: 'At school the teacher speaks English, which is the language on the blackboard and the language you are caned in. In the yard everyone speaks Krio, because the Temne boy and the Kono girl have to speak something to each other. At home it is Mende, and your grandmother, when you bring your exercise book to show her, turns it the right way up for you and hands it back.',
    choices: null,
    effect: (p) => { p.setMem('mende_school', true); p.e += 3 },
  },

  {
    id: 'mende_diamonds',
    phase: null,
    weight: 70,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.character?.gender === 'male' && G.age >= 16 && G.age <= 32 && G.currentYear >= 1952 && G.currentYear <= 2010 &&
      !(G.currentYear >= 1991 && G.currentYear <= 2001) && once(G, 'mende_diamonds'),
    text: 'Men from your village go to the diamond fields at Tongo and further to Kono, and come back in the rains with watches or with nothing. The work is shovelling gravel out of a pit all day and washing it in a sieve in the river, and a supporter, a dealer in town, feeds you rice in exchange for first sight of anything you find. A cousin says there is a place in his gang.',
    context: 'Alluvial diamonds were found in Kono in 1930. From the 1950s tens of thousands of young men from across the country dug illicitly and under licence in Kono and in the Tongo fields of Kenema District, most of them working for dealers on a share.',
    choices: [
      {
        text: 'Go with him',
        tag: null,
        outcome: 'Three seasons standing in brown water. Your hands learn the weight of a stone before your eyes do.',
        effect: (p) => { p.setMem('mende_diamonds', true); p.h -= 3; p.mo += 150; p.addFlag('mende_digger') },
      },
      {
        text: 'Stay on the farm',
        tag: null,
        outcome: 'You stay. Every rainy season the ones who went come back, and you count what they have.',
        effect: (p) => { p.setMem('mende_diamonds', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── THE PALM AND THE SUN ───────────────────────────────────────────────────

  {
    id: 'mende_1961',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear === 1961 && G.age >= 7 && once(G, 'mende_1961'),
    text: 'On the twenty-seventh of April the flag comes down at the district office and the new one goes up, green, white and blue. The prime minister is Sir Milton Margai, a doctor from Moyamba, and a Mende, and the old men say this as though it settled something. There is a dance that goes on all night, and a paramount chief gives a cow. You do not know yet what a country is, but you know that this one is partly yours.',
    choices: null,
    effect: (p) => { p.setMem('mende_1961', true); p.m += 4 },
  },

  {
    id: 'mende_1967',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear === 1967 && G.age >= 16 && once(G, 'mende_1967'),
    text: 'The SLPP\'s symbol is the palm tree and the APC\'s is the rising sun, and in March the sun wins more seats than anyone in the south believed possible. Within hours of Siaka Stevens being sworn in, the army commander has him arrested, and two days later other officers arrest the army commander. For a year there are soldiers in charge who promise to hand back to whoever won. When they finally do, the next April, it is to Stevens, and the south understands that it is in opposition now.',
    choices: null,
    effect: (p) => { p.setMem('mende_1967', true); p.e += 2; p.m -= 2 },
  },

  {
    id: 'mende_one_party',
    phase: null,
    weight: 200,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear >= 1978 && G.currentYear <= 1986 && G.age >= 18 && once(G, 'mende_one_party'),
    text: 'In 1978 the constitution makes the APC the only party, and the palm tree comes down from the walls in the south. The road to Kailahun has not been graded in years, the teachers in the district school go unpaid for months, and everybody knows it is because of how the district voted. The paramount chiefs who want anything learn to wear red. Your uncle, who carried the SLPP flag in 1967, keeps it folded in a box and does not take it out.',
    choices: null,
    effect: (p) => { p.setMem('mende_one_party', true); p.m -= 2; p.r += 1 },
  },

  {
    id: 'mende_ndogboyosoi',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && PUJEHUN(G) && G.currentYear >= 1982 && G.currentYear <= 1983 && G.age >= 8 && once(G, 'mende_1982'),
    text: 'After the election the losing candidate\'s people and the party\'s people fight, and the fight is given the name of the Ndogboyosoi, the bush spirit who leads travellers astray. Then trucks of the party\'s youths come with the police behind them, and houses burn in the villages that voted the wrong way. Families go over the Mano River into Liberia with what they can carry. Some of them do not come back for nine years.',
    choices: null,
    effect: (p) => { p.setMem('mende_1982', true); p.m -= 6; p.h -= 2; p.addFlag('mende_1982') },
  },

  // ── THE WAR ────────────────────────────────────────────────────────────────

  {
    id: 'mende_ruf_kailahun',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && KAILAHUN(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 6 && once(G, 'mende_ruf_came'),
    text: 'The armed men who came over the Liberian border at Bomaru in March are in your village now. Some of them are Liberians and some are Sierra Leonean boys, and they say they have come to free you from the APC. They gather everyone in the court barri, shoot a man they call a collaborator, and take the older boys away with them. The next night people start going into the bush.',
    context: 'The Revolutionary United Front, led by Foday Sankoh and backed by Charles Taylor\'s NPFL, invaded from Liberia on 23 March 1991 at Bomaru in Kailahun District. Kailahun remained the RUF\'s heartland for most of the war.',
    choices: [
      {
        text: 'Go through the bush to the Guinea border',
        tag: null,
        outcome: 'Four days on forest paths, and then a river and a camp outside Guéckédou with plastic sheeting and a queue for rice.',
        effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 8; p.h -= 3; p.relocate('gn_forest', 'informal', { residency: 'refugee_status' }); p.addFlag('mende_refugee_guinea') },
      },
      {
        text: 'Walk to Kenema',
        tag: null,
        outcome: 'Kenema is full of people from the east sleeping in schoolrooms. You find an aunt and a corner of her floor.',
        effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 6; p.h -= 2; p.relocate('sl_kenema', 'informal'); p.addFlag('mende_fled_kailahun') },
      },
      {
        text: 'Stay, because the farm is here',
        tag: null,
        outcome: 'You stay. The rebels have a list of what each household owes them, and you are on it.',
        effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 8; p.r += 3; p.addFlag('mende_under_ruf') },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ruf_pujehun',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && PUJEHUN(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 6 && once(G, 'mende_ruf_came'),
    text: 'The rebels have come into Pujehun from the Liberian side, and the soldiers at the junction left before they arrived. They hold a meeting in the court barri, and one of them makes a speech about the APC and the diamonds and the roads that were never built, and much of what he says is true. Then they take the rice store. By the end of the week half the village is walking north on the Bo road.',
    choices: [
      {
        text: 'Walk to Bo',
        tag: null,
        outcome: 'At Gondama outside Bo there is a camp of thatch and plastic, and a number that is now your name for the purpose of rice.',
        effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 6; p.h -= 2; p.relocate('sl_bo', 'informal'); p.addFlag('mende_fled_pujehun') },
      },
      {
        text: 'Stay with the farm',
        tag: null,
        outcome: 'You stay, and learn which of them to be quiet in front of.',
        effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 8; p.r += 3; p.addFlag('mende_under_ruf') },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_ruf_farm',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.flags.includes('mende_under_ruf') && G.currentYear >= 1992 && G.currentYear <= 2001 && G.age >= 10 && once(G, 'mende_ruf_farm'),
    text: 'The rebels have an office for civilians, which they call the G5, and it comes to the village with a list. Every household works two days a week on the movement\'s farm, and the rice from it goes to the fighters first. The young men are taken for the mining at Tongo and do not always come back. You learn to hold your face the way you learned it in the society bush, and it is the most useful thing the bush ever taught you.',
    choices: null,
    effect: (p) => { p.setMem('mende_ruf_farm', true); p.h -= 3; p.m -= 4 },
  },

  {
    id: 'mende_flight_south',
    phase: null,
    weight: 600,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.ruralUrban === 'rural' && !KAILAHUN(G) && !PUJEHUN(G) && G.currentYear >= 1994 && G.currentYear <= 1996 &&
      G.age >= 6 && once(G, 'mende_ruf_came'),
    text: 'By 1994 the war that was in the east is everywhere, and nobody can tell you which of the armed men on the road are rebels and which are soldiers. People have a word for the ones who are both: sobels. Your village is attacked in the night and burned by morning, and nobody afterwards can say for certain whose uniforms they were. You walk to Bo with a bundle and a child who is not yours.',
    choices: null,
    effect: (p) => { p.setMem('mende_ruf_came', true); p.m -= 8; p.h -= 3; p.relocate('sl_bo', 'informal'); p.addFlag('mende_displaced') },
  },

  {
    id: 'mende_kamajor',
    phase: null,
    weight: 600,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.character?.gender === 'male' && G.age >= 15 && G.age <= 40 && G.currentYear >= 1994 && G.currentYear <= 1999 && once(G, 'mende_kamajor'),
    text: 'The hunters\' society, which used to take only a few men who knew the forest, is initiating whole villages of young men now. The initiators wash you in medicine and tell you that if you keep the laws — no sex before battle, no looting, no stolen food — the bullets will turn to water on your skin. Everyone knows a Kamajor who was shot, and everyone has an explanation for it. The army has left, and somebody has to watch the road.',
    context: 'Kamajoisia, the Mende hunters\' society, was expanded into a mass militia from 1993-94 with the backing of chiefs and later of the Kabbah government, under Deputy Defence Minister Hinga Norman.',
    choices: [
      {
        text: 'Be initiated',
        tag: null,
        outcome: 'You come out of the bush with a single-barrel gun and a gown sewn with mirrors, and a checkpoint on the Bo road that is yours at night.',
        effect: (p) => { p.setMem('mende_kamajor', true); p.h -= 2; p.karma += 1; p.addFlag('mende_kamajor') },
      },
      {
        text: 'Refuse, and carry water for them instead',
        tag: null,
        outcome: 'Your cousin is initiated in your place. He tells you the bullets did go round him, twice.',
        effect: (p) => { p.setMem('mende_kamajor', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_1997',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear === 1997 && G.age >= 10 && once(G, 'mende_1997'),
    text: 'In May soldiers overthrow the government, the president flies to Conakry, and the soldiers invite the RUF into the capital to share it with them. In the south the Kamajors fight the junta, and the junta\'s men burn villages they say are feeding the Kamajors. There is no school this year and no market worth the name. The soldiers at the junction take what they want from every lorry and call it paying themselves, because the junta has not paid them either.',
    choices: null,
    effect: (p) => { p.setMem('mende_1997', true); p.m -= 6; p.h -= 2 },
  },

  {
    id: 'mende_peace',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear === 2002 && G.age >= 6 && once(G, 'mende_peace'),
    text: 'In January the president declares the war over, at a ceremony where a pile of guns is set on fire. On the radio the Krio phrase is "di war don don", the war is done, and people say it to each other in the market in the tone of a question. You have not spent a night without listening for engines in ten years. The first night you sleep through, you wake up afraid of the quiet.',
    choices: null,
    effect: (p) => { p.setMem('mende_peace', true); p.m += 6 },
  },

  {
    id: 'mende_norman',
    phase: null,
    weight: 500,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear >= 2003 && G.currentYear <= 2005 && G.age >= 14 && once(G, 'mende_norman_arrest'),
    text: (G) => 'The Special Court has arrested Hinga Norman in his office at the ministry and charged him with war crimes, in the same building as the RUF\'s leaders. ' +
      (G.flags.includes('mende_kamajor')
        ? 'He was the man who told you the country needed you. Now a court with foreign judges says the country has questions for him, and some of the questions are about your road.'
        : 'In the south people say he is on trial for defending them. In the north, and in some villages in the south too, people remember the checkpoints differently.'),
    choices: null,
    effect: (p) => { p.setMem('mende_norman_arrest', true); p.r += 2; p.m -= 2; p.addFlag('mende_norman') },
  },

  // ── AFTER ──────────────────────────────────────────────────────────────────

  {
    id: 'mende_ebola',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear >= 2014 && G.currentYear <= 2015 && G.age >= 8 && once(G, 'mende_ebola'),
    text: (G) => `The sickness came over the border into ${KAILAHUN(G) ? 'your district' : 'Kailahun'} from Guinea, and the doctor who ran the fever ward at Kenema is dead of it. Your aunt dies in the house, and a team in white suits comes to take her body in a bag and bury her themselves. Among the Mende the women wash the dead, and the washing is how you say goodbye. The team leader says that the washing is how it spreads.`,
    context: 'Ebola reached Sierra Leone in Kailahun District in May 2014, and Kenema and Kailahun were placed under quarantine that August. Dr Sheik Umar Khan, who led the Lassa fever ward at Kenema Government Hospital, died on 29 July 2014. Unsafe burials were among the main routes of transmission; nearly 4,000 Sierra Leoneans died before the outbreak was declared over in November 2015.',
    choices: [
      {
        text: 'Let the team take her',
        tag: 'yielding',
        outcome: 'She goes in the bag without being washed. You stand at the edge of the burial ground behind a rope.',
        effect: (p) => { p.setMem('mende_ebola', true); p.m -= 8; p.r += 4; p.addFlag('mende_ebola') },
      },
      {
        text: 'Wash her in the night before they come',
        tag: 'defiant',
        outcome: 'You wash her, and for twenty-one days you count every headache. None of you falls sick, which is luck and nothing else.',
        effect: (p) => { p.setMem('mende_ebola', true); p.m -= 6; p.h -= 3; p.karma += 1; p.addFlag('mende_ebola') },
      },
    ],
    effect: null,
  },

  {
    id: 'mende_bio_2018',
    phase: null,
    weight: 500,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.currentYear === 2018 && G.age >= 18 && once(G, 'mende_2018'),
    text: 'In April the SLPP wins, and the palm tree is on every wall in the south again. The new president is Julius Maada Bio, a Mende from Tihun, who in 1996 was the young brigadier who handed the country back to civilians after his own coup. There is dancing in the road until morning, and somebody drives round the town with the horn held down until the battery gives out. Your uncle takes the old flag out of its box.',
    choices: null,
    effect: (p) => { p.setMem('mende_2018', true); p.m += 5 },
  },

  {
    id: 'mende_dv_lottery',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SL && G.ethnicity === 'mende' && G.literate && G.age >= 20 && G.age <= 34 &&
      G.currentYear >= 1996 && G.currentYear <= 2019 && once(G, 'mende_dv'),
    text: 'Every autumn a man in the market fills in the American lottery form for anyone who pays him, with a photograph taken against a white sheet. You have entered four times. This year the letter comes, and it says your number has been drawn and you may apply, if you can find the fees for the medical, the police certificate and the ticket. Your family begins to sell things.',
    choices: [
      {
        text: 'Go',
        tag: null,
        outcome: 'Your whole compound comes to the airport ferry. At the airport in New York you queue behind a man from Kenema you went to school with.',
        effect: (p) => { p.setMem('mende_dv', true); p.emigrateTo('United States', { residency: 'permanent_resident' }); p.addFlag('mende_dv'); p.mo -= 400 },
      },
      {
        text: 'Let the chance pass',
        tag: null,
        outcome: 'You keep the letter. It is in the tin with your certificates, which is where the family keeps the things it might need.',
        effect: (p) => { p.setMem('mende_dv', true); p.r += 4 },
      },
    ],
    effect: null,
  },
]
