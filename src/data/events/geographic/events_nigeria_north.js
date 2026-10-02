// events_nigeria_north.js — the north and the Middle Belt, as lived there.
//
// Three reviewers read eighteen lives of the touchstone character — Nigeria,
// 1962 — across six communities. The Hausa-Fulani, Kanuri and Middle Belt
// lives were the thinnest, and for a specific reason: nearly everything the
// corpus says about Nigeria between 1966 and 2020 is said from the south, or
// from Lagos, or about the north rather than inside it. The one event about
// the north in 1966 is the September killings, which is the north as seen by
// the people who fled it. A Kano child of four heard about the Sardauna first.
// A Borno child who never went to a government school went to a Qur'anic one,
// with a wooden slate and a malam, and "the other children go and you do not"
// is not a true sentence about that childhood.
//
// Middle Belt characters (`other_nigerian` in Benue) fared worst: outside the
// three-nations frame the rest of the corpus is written in, and inside a
// history — the Tiv riots, the Tiv infantry of the civil war, Zaki Biam,
// Agatu, the 2018 burials in Makurdi — that no guard had ever named.
//
// Guards read where the character LIVES (G.place.region / G.place.id), then
// faith and age. Ethnicity is used only where the prose names a people.
//
// Dates used, all checked:
//   15 Jan 1966  coup; Ahmadu Bello, the Sardauna of Sokoto and Premier of the
//                North, killed at his house in Kaduna; Prime Minister Tafawa
//                Balewa abducted in Lagos, his body found about 21-22 January.
//   29 Jul 1966  northern officers' counter-coup ("araba", secession, is the
//                cry in the barracks); Ironsi killed at Ibadan; Yakubu Gowon, a
//                Ngas Christian from the Plateau, becomes head of state 1 Aug.
//   1967-70      civil war; Tiv soldiers widely described as the backbone of
//                the federal infantry.
//   1960, 1964   Tiv riots against NPC rule and its native authority; Joseph
//                Tarka and the UMBC; the army sent into Tivland in 1964.
//   Sep 1976     Universal Primary Education launched nationally.
//   18-29 Dec 1980  Maitatsine rising in Kano, ~4,177 dead officially;
//                Muhammadu Marwa killed.
//   Oct 1982     Bulumkutu, Maiduguri (and Kaduna); Feb-Mar 1984 Yola (Jimeta);
//                Apr 1985 Gombe.
//   Feb, May 1992  Zango Kataf, southern Kaduna.
//   1990-92, 2001  Tiv-Jukun clashes, Wukari and the Benue-Taraba border.
//   Oct 1999 / 27 Jan 2000  Zamfara announces, then implements, Sharia penal
//                law; Kano follows in 2000; Borno in 2000-01. Kano Hisbah Board
//                formalised 2003.
//   Sep 2001     Jos riots. 22-24 Oct 2001: soldiers kill well over a hundred
//                civilians at Zaki Biam and neighbouring towns after nineteen
//                soldiers were killed.
//   Oct 2003 - Jul 2004  Kano suspends polio vaccination; resumes July 2004.
//                Last wild polio case in Nigeria 2016; Africa certified wild
//                polio-free 25 August 2020.
//   Nov 2008, Jan and 7 Mar 2010  Jos and Dogo Nahawa.
//   26-30 Jul 2009  Maiduguri; Mohammed Yusuf killed in police custody.
//   20 Jan 2012  coordinated bombings in Kano, ~185 dead.
//   Jun 2013     the Civilian JTF forms in Maiduguri.
//   14-15 Apr 2014  276 schoolgirls taken from Chibok. Bama and Gwoza fall
//                Aug-Sep 2014; Baga Jan 2015. 21 released Oct 2016, 82 May 2017.
//   28 Nov 2014  Kano Central Mosque bombed at Friday prayers, 100+ dead.
//   late Feb 2016  Agatu, Benue.
//   Nov 2017     Benue's Open Grazing Prohibition law in force. 1 Jan 2018
//                killings in Guma and Logo; 73 buried together in Makurdi on
//                11 January.
//   Apr-May 2020  northern governors send almajiri boys back to their home
//                states under Covid.
//   24 Sep 2015  Mina crush at the Hajj; Nigerians among the dead.
//   Lake Chad    ~25,000 km² in 1963 to under 2,500 km² by the late 1980s.

const once = (G, key) => !G.mem?.[key]
const IN_NG = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Nigeria'
const REGION = (G) => G.place?.region ?? null
const PLACE = (G) => G.place?.id ?? null
const MUSLIM = (G) => (G.religion ?? '').startsWith('muslim')
const MALE = (G) => G.character?.gender === 'male'
const FEMALE = (G) => G.character?.gender === 'female'

const LIVES_NORTH = (G) => IN_NG(G) && (REGION(G) === 'North Nigeria' || REGION(G) === 'Northeast Nigeria')
const KANO = (G) => IN_NG(G) && (PLACE(G) === 'ng_kano' || PLACE(G) === 'ng_rural_north')
const KANO_CITY = (G) => IN_NG(G) && PLACE(G) === 'ng_kano'
const BORNO = (G) => IN_NG(G) && (PLACE(G) === 'ng_maiduguri' || PLACE(G) === 'ng_rural_borno')
const BORNO_VILLAGE = (G) => IN_NG(G) && PLACE(G) === 'ng_rural_borno'
const NORTH_MUSLIM = (G) => LIVES_NORTH(G) && MUSLIM(G)
const KANURI = (G) => G.character?.ethnicity === 'kanuri'
const HAUSA = (G) => G.character?.ethnicity === 'hausa_fulani'

// Benue: Tiv and Idoma country. `other_nigerian` is drawn there by homeOf.
const BENUE = (G) => IN_NG(G) && REGION(G) === 'Middle Belt Nigeria'
const BENUE_XN = (G) => BENUE(G) && !MUSLIM(G)
const TIV = (G) => BENUE_XN(G) && G.character?.ethnicity === 'other_nigerian'
const NORTH_OR_BELT = (G) => LIVES_NORTH(G) || BENUE(G)

const hasYoungChild = (G) => (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? 99) <= 5)
const hasDaughter = (G) => (G.children ?? []).some(c => c && c.alive !== false && c.gender === 'female')
const neverSchooled = (G) => G.mem?.attendedSchool === false
const polioParent = (G) => G.flags.includes('nn_polio_refused') || G.flags.includes('nn_polio_accepted')

export const NIGERIA_NORTH_EVENTS = [

  // ── CHILDHOOD ──────────────────────────────────────────────────────────────

  {
    id: 'nn_allo_slate',
    phase: null,
    weight: 60,
    specificity: 3,
    when: (G) => NORTH_MUSLIM(G) && G.age >= 5 && G.age <= 8 && G.currentYear >= 1935 && once(G, 'nn_allo'),
    text: (G) => `Before the sun is properly up you are sitting on a mat in the malam's entrance hall with the other children, holding a wooden board, the allo, with a verse written on it in ink made from soot and gum. You say it aloud with everyone else, over and over, until the sound of it is in your mouth before you understand one word. When you have it, you wash the board and the ink runs off into a bowl, and ${KANURI(G) ? 'your grandmother' : 'your mother'} says the water is not to be poured anywhere a foot will step.`,
    context: 'The makarantar allo, or tsangaya, is the Qur\'anic school of northern Nigeria and the Lake Chad basin. Children learn Arabic script and recitation from a malam on wooden slates. For most of the twentieth century it was the only schooling most northern Muslim children had, and it was near universal.',
    choices: null,
    effect: (p) => { p.setMem('nn_allo', true); p.e += 2; p.addFlag('nn_allo_school') },
  },

  // The child who does not go to the government school very often did go
  // somewhere: given to a malam in the city, away from home, for years. The
  // boy is living in the city now, so the event moves him there.
  ...[['ng_rural_north', 'ng_kano', 'Kano'], ['ng_rural_borno', 'ng_maiduguri', 'Maiduguri']].map(([from, to, city]) => ({
    id: `nn_almajiri_${from === 'ng_rural_north' ? 'kano' : 'borno'}`,
    phase: null,
    weight: 120,
    specificity: 4,
    when: (G) => IN_NG(G) && PLACE(G) === from && MUSLIM(G) && MALE(G) && neverSchooled(G) && G.age >= 7 && G.age <= 11 && G.currentYear >= 1935 && once(G, 'nn_almaj'),
    text: `Your father walks you to ${city} with a mat, a bowl and a second shirt, and gives you to a malam he knew as a boy. There are thirty of you in the malam's house. In the mornings you recite; at midday you go out with the bowl and stand at gates saying the same few words, and some gates give rice and some give nothing and one gives a whole fried fish, and you learn which is which. The other boys call you almajiri. So does everyone. It is what you are now.`,
    context: 'The almajiri system sends boys, often from the age of six or seven, to live with a Qur\'anic teacher, frequently far from home, supporting themselves by begging for food. Estimates in the 2010s put their number between two and ten million. The word comes from the Arabic al-muhajir, one who migrates for learning.',
    choices: null,
    effect: (p) => {
      p.setMem('nn_almaj', true); p.m -= 5; p.h -= 2; p.e += 2; p.addFlag('nn_almajiri')
      p.relocate(to, 'informal')
    },
  })),

  {
    id: 'nn_almajiri_city',
    phase: null,
    weight: 120,
    specificity: 4,
    when: (G) => NORTH_MUSLIM(G) && (PLACE(G) === 'ng_kano' || PLACE(G) === 'ng_maiduguri') && MALE(G) && neverSchooled(G) && G.age >= 7 && G.age <= 11 && G.currentYear >= 1935 && once(G, 'nn_almaj'),
    text: 'Your father gives you to the malam at the end of the ward, and you sleep at his house now with the boys from the villages. In the mornings you recite; at midday you go out with a bowl and stand at gates, including the gates of people who know your mother. You learn not to look at them. The other boys call you almajiri. So does everyone. It is what you are now.',
    choices: null,
    effect: (p) => { p.setMem('nn_almaj', true); p.m -= 4; p.h -= 1; p.e += 2; p.addFlag('nn_almajiri') },
  },

  {
    id: 'nn_sallah_durbar',
    phase: null,
    weight: 22,
    specificity: 3,
    when: (G) => KANO(G) && MUSLIM(G) && G.age >= 6 && G.age <= 13 && G.currentYear >= 1945 && once(G, 'nn_durbar'),
    text: 'On the day after Sallah the whole city comes to the square in front of the Emir\'s palace, and you are carried the last part of the way on your uncle\'s shoulders. The horsemen come through the gate in quilted armour and mirrors and the horses have red and green on their heads, and when a troop charges at the Emir and pulls up at the last stride, everybody shouts and you shout too. The dust goes into your teeth. On the way home your new clothes are no longer new clothes.',
    context: 'The Hawan Sallah durbars at the end of Ramadan and at Eid al-Adha are processions of the Emir\'s cavalry and the district heads in Kano, Katsina, Zaria and Bida, descended from the military reviews of the Hausa emirates.',
    choices: null,
    effect: (p) => { p.setMem('nn_durbar', true); p.m += 5 },
  },

  {
    id: 'nn_tray_child',
    phase: null,
    weight: 30,
    specificity: 4,
    when: (G) => KANO(G) && HAUSA(G) && MUSLIM(G) && G.age >= 6 && G.age <= 12 && G.parents?.mother?.alive !== false && G.currentYear >= 1950 && once(G, 'nn_tray'),
    text: 'Your mother does not go out; she has not since she married. The business goes out on your head. In the afternoons you carry a tray of kosai and groundnut cakes through the lanes, calling, and bring back the coins knotted in a cloth, and she counts them without looking up from the next batch. She knows to the last coin what each street buys. She has never seen most of those streets.',
    choices: null,
    effect: (p) => { p.setMem('nn_tray', true); p.w += 1; p.s += 1; p.addFlag('nn_tray_child') },
  },

  // ── 1966 ───────────────────────────────────────────────────────────────────

  {
    id: 'nn_1966_coups',
    phase: null,
    weight: 400,
    // Two years wide, because the September killings (ngm_1966_north) own 1966
    // for many of the same characters. In 1967 it is told as last year.
    when: (G) => NORTH_OR_BELT(G) && G.currentYear >= 1966 && G.currentYear <= 1967 && G.age >= 5 && once(G, 'nn_66'),
    text: (G) => {
      if (BENUE(G)) return G.currentYear === 1966
        ? 'In January the soldiers kill the Sardauna and the Prime Minister and people in your village say it is a southern thing, a thing among the big men. In July the northern soldiers take it back, and the man they put at the top is Gowon, a Christian from the Plateau, a Middle Belt man, and your father says his name twice at the table as if trying it for size. Half the soldiers who did it are Tiv. Nobody in Lagos says that part.'
        : 'Gowon has been head of state for a year now, a Christian from the Plateau, a Middle Belt man, and your father still says his name as if trying it for size. It was the northern soldiers who put him there last July, after the January soldiers killed the Sardauna, and half of those northern soldiers were Tiv. Nobody in Lagos says that part.'
      return G.currentYear === 1966
        ? 'In January a man comes running through the ward before the dawn prayer, and by midmorning the women are wailing on the other side of the wall. The Sardauna is dead, shot in his house in Kaduna, and the Prime Minister is missing and then found. Your father sits by the radio for three days and says nothing you can understand. In July the soldiers from the north do it back, and the word in the barracks is araba, which means to separate, and for a while it is not clear which country you will wake up in.'
        : 'It is a year since the morning a man came running through the ward before the dawn prayer and the women began wailing on the other side of the wall: the Sardauna shot in his house in Kaduna, the Prime Minister taken and found. In July the northern soldiers did it back, and the word in the barracks was araba, to separate. The Sardauna\'s picture is still up in the shops. Nobody has taken it down and nobody will.'
    },
    context: 'The coup of 15 January 1966, led mostly by Igbo majors, killed the Northern Premier Ahmadu Bello and the Prime Minister Abubakar Tafawa Balewa, among others. It was read in the north as an ethnic attack. The counter-coup of 29 July killed the head of state Aguiyi-Ironsi and brought Lt-Col Yakubu Gowon, a Christian from the Plateau, to power.',
    choices: null,
    effect: (p) => { p.setMem('nn_66', true); p.m -= 6; p.addFlag('nn_sardauna_1966') },
  },

  // ── 1970s-80s ──────────────────────────────────────────────────────────────

  {
    id: 'nn_upe_1976',
    phase: null,
    weight: 350,
    when: (G) => NORTH_OR_BELT(G) && G.currentYear >= 1976 && G.currentYear <= 1977 && G.age >= 5 && G.age <= 18 && once(G, 'nn_upe'),
    text: (G) => G.age <= 8
      ? 'A school is built at the edge of town out of blocks nobody had seen made, with a zinc roof that shouts in the rain, and in September a man with a list goes from house to house writing children\'s names. Yours is on it. There are sixty in your class and one teacher who is eighteen and was trained in a summer. Some fathers in the ward keep their daughters back. Some keep their sons back too, and send them to the malam instead.'
      : 'They build a school at the edge of town, blocks and a zinc roof, and a man with a list goes from house to house writing down the names of every child of six. You are too old for it by eight years. You watch your younger brother go in on the first morning in a shirt that is too big for him, and you go on to the market as you do every morning, and you find you are thinking about it all day.',
    context: 'Universal Primary Education was launched across Nigeria in September 1976, paid for by the oil boom. In the north, where primary enrolment had been a fraction of the south\'s, enrolment roughly tripled in three years. Teachers were trained in crash programmes and classrooms often held sixty or more.',
    choices: null,
    effect: (p) => { p.setMem('nn_upe', true); p.addFlag('nn_upe_1976') },
  },

  {
    id: 'nn_kulle',
    phase: null,
    weight: 150,
    specificity: 4,
    when: (G) => KANO(G) && HAUSA(G) && MUSLIM(G) && FEMALE(G) && !!G.partner && G.age >= 15 && G.age <= 40 && G.currentYear >= 1950 && once(G, 'nn_kulle'),
    text: 'After the wedding you do not go out. That is what kulle is, and it is what your mother had and her mother, and the neighbours would talk about a house where it was otherwise. The world is the compound: the rooms, the courtyard, the pot on the fire, the other wife when there is one, the children coming and going through the door you do not use. The door is not locked. Nobody from outside understands that.',
    context: 'Kulle, the seclusion of married women, was widely practised in Kano and other Hausa cities. Secluded women ran substantial trades from inside the compound — cooked food, cloth, caps, groundnut oil — through children who sold for them in the street.',
    choices: [
      {
        text: 'Start a trade from inside. Cook, and send it out with the children.',
        outcome: 'By the second year you know which lanes buy what, which houses owe, which child can be trusted with change. The money is yours; your husband does not ask about it and you do not tell him.',
        effect: (p) => { p.setMem('nn_kulle', true); p.mo += 400; p.s += 2; p.addFlag('nn_kulle'); p.addFlag('nn_kulle_trade') },
      },
      {
        text: 'Keep the house. The world outside can come to the door.',
        outcome: 'Women come to the door with news. You hear most things a day late and some things a day early.',
        effect: (p) => { p.setMem('nn_kulle', true); p.m -= 2; p.addFlag('nn_kulle') },
      },
    ],
    effect: null,
  },

  {
    id: 'nn_maitatsine_kano',
    phase: null,
    weight: 600,
    when: (G) => KANO(G) && G.currentYear === 1980 && G.age >= 5 && once(G, 'nn_mts'),
    text: (G) => `In the week before Christmas a preacher's followers hold the ward around Yan Awaki, and then more than the ward. They say the radio and the bicycle and the wristwatch are forbidden, and they kill people for owning them. ${KANO_CITY(G) ? 'For eleven days you do not go past the end of your street. You hear it at night.' : 'From the village you see the smoke over the city on the second day.'} When the army comes in, it uses rockets, and afterwards there are bodies in the drains that nobody claims. The man was called Marwa. People call him Maitatsine, the one who curses, and they say it quietly, as if he might hear.`,
    context: 'The Maitatsine rising in Kano, 18-29 December 1980, was led by the Cameroonian-born preacher Muhammadu Marwa, who condemned Western goods as un-Islamic. The official death toll was 4,177; Marwa was killed. His followers rose again in Maiduguri in 1982, Yola in 1984 and Gombe in 1985.',
    choices: null,
    effect: (p) => { p.setMem('nn_mts', true); p.m -= 8; p.h -= 1; p.addFlag('nn_maitatsine') },
  },

  {
    id: 'nn_maitatsine_bulumkutu',
    phase: null,
    weight: 600,
    when: (G) => BORNO(G) && G.currentYear === 1982 && G.age >= 5 && once(G, 'nn_mts'),
    text: 'In October it comes to Bulumkutu, on the edge of Maiduguri: the same preaching that burned Kano two years ago, the same men with their heads shaved and their charms, the same word for radios. The police go in and do not come out. Then the soldiers go in. For days afterwards men in the market speak about the boys who joined, whose boys they were, which village, and stop when someone they do not know comes near.',
    context: 'Maitatsine followers who had dispersed after Kano in 1980 rose at Bulumkutu near Maiduguri in October 1982. Estimates of the dead run into the thousands. The movement drew heavily on almajiri and young rural migrants.',
    choices: null,
    effect: (p) => { p.setMem('nn_mts', true); p.m -= 7; p.addFlag('nn_maitatsine') },
  },

  {
    id: 'nn_maitatsine_yola',
    phase: null,
    weight: 700,
    when: (G) => BORNO(G) && G.currentYear >= 1984 && G.currentYear <= 1985 && G.age >= 8 && once(G, 'nn_mts_y'),
    text: (G) => G.currentYear === 1984
      ? 'Now it is Yola, in Jimeta, in the dry season: the same name on everyone\'s lips, the same army, the same number that nobody believes. A lorry driver who comes through from Gongola says the market there was burning for a week. Your uncle says it is finished. It was finished in Kano too.'
      : 'Now it is Gombe. The name comes up the road with the traders. It is the fourth time, and the men who discuss it at the mosque after isha no longer sound surprised, only tired, and one of them says what everyone thinks, which is that it will stop when there are no more boys with nothing to do, and nobody answers him.',
    choices: null,
    effect: (p) => { p.setMem('nn_mts_y', true); p.m -= 3; p.addFlag('nn_maitatsine') },
  },

  {
    id: 'nn_lake_chad',
    phase: null,
    weight: 150,
    specificity: 3,
    when: (G) => BORNO_VILLAGE(G) && KANURI(G) && G.age >= 14 && G.age <= 60 && G.currentYear >= 1974 && G.currentYear <= 2008 && once(G, 'nn_lake'),
    text: 'Your grandfather fished from Baga with the water at the edge of the town. Your father fished from a camp half a day out. Now the fishing camps go further every dry season, following the water, and what the lake leaves behind is black and good and people plant it — beans, maize, peppers — on ground their grandfathers put nets into. You measure the lake by what grows where it was.',
    context: 'Lake Chad shrank from about 25,000 square kilometres in the early 1960s to under 2,500 by the late 1980s, after the Sahel droughts of 1973 and 1984 and upstream irrigation. On the Nigerian side the open water largely disappeared; fishing communities followed it and farmed the exposed lakebed.',
    choices: [
      {
        text: 'Go out with the fishing camps for the season.',
        outcome: 'You smoke the catch on racks at the camp and bring it back in baskets. The camp is further out again next year.',
        effect: (p) => { p.setMem('nn_lake', true); p.mo += 250; p.h -= 1; p.addFlag('nn_lake_chad') },
      },
      {
        text: 'Plant the lakebed.',
        outcome: 'The soil is so rich the first year it frightens you. The second year there is a quarrel over whose it is.',
        effect: (p) => { p.setMem('nn_lake', true); p.mo += 200; p.addFlag('nn_lake_chad') },
      },
    ],
    effect: null,
  },

  // ── 2000s ──────────────────────────────────────────────────────────────────

  {
    id: 'nn_sharia_2000',
    phase: null,
    weight: 400,
    when: (G) => LIVES_NORTH(G) && G.currentYear >= 2000 && G.currentYear <= 2001 && G.age >= 14 && once(G, 'nn_sharia'),
    text: (G) => {
      if (!MUSLIM(G)) return 'The state adopts Sharia and the governor says it applies to Muslims only. The beer parlour near your church closes in a week anyway. Your pastor preaches a careful sermon about living peaceably, and afterwards in the car park the men talk about their brothers in the south in a way they have not before.'
      if (BORNO(G)) return 'Borno follows Zamfara and Kano: the Sharia penal code, the courts, the governor on the radio. In the mosque the old men say it is what was here before the British and has only come home. The younger men are harder to read. A trader you buy from, a Kanuri like you, says it will make the big men honest, and then laughs.'
      return 'Zamfara goes first, then Kano. There are crowds in the streets in white, and the governor says the word Sharia to a noise you feel in your chest. For many in the ward it is the first time democracy has given them something they asked for by name. The first amputation in Zamfara is a cattle thief. You find you want to say two different things about it and can only say one.'
    },
    context: 'Zamfara State announced Sharia criminal law in October 1999 and implemented it on 27 January 2000; eleven more northern states followed by 2002, including Kano (2000) and Borno (2000-01). The first amputation under the new codes, of Buba Bello Jangebe in Zamfara, was carried out in March 2000.',
    choices: null,
    effect: (p) => { p.setMem('nn_sharia', true); p.addFlag('nn_sharia_2000') },
  },

  {
    id: 'nn_polio_boycott',
    phase: null,
    weight: 400,
    when: (G) => KANO(G) && MUSLIM(G) && hasYoungChild(G) && G.currentYear >= 2003 && G.currentYear <= 2004 && once(G, 'nn_polio'),
    text: 'The vaccinators come in pairs with a cool box and a marker for the children\'s fingers, and the state has told them to stop. The imams say the drops were tested and found to make girls barren, that it is a plan to make fewer Muslims, and the governor has said it too. Two of the women in your compound have already hidden their children in the back room. The vaccinator at your gate is a Hausa woman from the next ward. She does not argue. She waits.',
    context: 'In October 2003 Kano, Zamfara and Kaduna suspended polio vaccination after clerics and politicians claimed the oral vaccine was contaminated with anti-fertility agents. Kano resumed in July 2004 after vaccine sourced from Indonesia was tested. The boycott re-seeded polio across more than a dozen countries.',
    choices: [
      {
        text: 'Open the gate. Let her give the drops.',
        tag: 'defiant',
        outcome: 'She paints your child\'s little finger with the marker. Your co-wife does not speak to you for a week.',
        effect: (p) => { p.setMem('nn_polio', true); p.m -= 2; p.karma += 3; p.addFlag('nn_polio_accepted') },
      },
      {
        text: 'Keep the child inside.',
        tag: 'yielding',
        outcome: 'She marks the wall of the house instead of a finger, and goes on to the next gate.',
        effect: (p) => { p.setMem('nn_polio', true); p.addFlag('nn_polio_refused') },
      },
    ],
    effect: null,
  },

  {
    id: 'nn_boko_2009',
    phase: null,
    weight: 700,
    when: (G) => BORNO(G) && G.currentYear === 2009 && G.age >= 6 && once(G, 'nn_2009'),
    text: 'At the end of July the preacher\'s people fight the police across Maiduguri for four days, and then the army comes into the city. You know the name of the preacher, Yusuf; everyone does, and some of the boys on your street went to hear him for the free meals. On the fifth day he is dead in police custody and the police say he was shot escaping. The mosque by the railway where he preached is rubble by the weekend. People in the market say it is over. Your father says only that it has not started.',
    context: 'Fighting between the Jama\'atu Ahlis Sunna lidda\'awati wal-Jihad — Boko Haram — and security forces in Maiduguri and other northern cities on 26-30 July 2009 killed some 800 people. Its founder Mohammed Yusuf was killed in police custody on 30 July. The group re-emerged under Abubakar Shekau in 2010.',
    choices: null,
    effect: (p) => { p.setMem('nn_2009', true); p.m -= 8; p.addFlag('nn_yusuf_2009') },
  },

  {
    id: 'nn_kano_2012',
    phase: null,
    weight: 700,
    when: (G) => KANO(G) && G.currentYear === 2012 && G.age >= 6 && once(G, 'nn_kano12'),
    text: 'On a Friday evening in January the explosions start around the police headquarters and go on across the city for hours, one after another, so that between them you are waiting for the next. By morning the streets are empty in a way you have never seen Kano empty. There is a curfew. The number goes up every day for a week and settles at a figure the government gives and nobody repeats. Kano was the place the trouble in the northeast happened a long way from.',
    context: 'On 20 January 2012 coordinated bombings and gun attacks on police stations and government offices in Kano killed about 185 people. Boko Haram claimed responsibility.',
    choices: null,
    effect: (p) => { p.setMem('nn_kano12', true); p.m -= 8; p.addFlag('nn_kano_2012') },
  },

  {
    id: 'nn_civilian_jtf',
    phase: null,
    weight: 500,
    when: (G) => IN_NG(G) && PLACE(G) === 'ng_maiduguri' && MALE(G) && G.age >= 16 && G.age <= 40 && G.currentYear >= 2013 && G.currentYear <= 2014 && once(G, 'nn_cjtf'),
    text: 'The young men of the ward start standing at the corners with sticks and cutlasses, and then with lists. They know who is who, which the soldiers never did; they know whose son went to the preacher and whose brother came back from the bush. The soldiers call them the Civilian JTF and give them vests. Your neighbour\'s son is one of them now and nods to you in a new way.',
    context: 'The Civilian Joint Task Force emerged in Maiduguri in June 2013, when young residents began identifying and handing suspected insurgents to the military. It became a large vigilante force, credited with pushing Boko Haram out of the city and accused of its own abuses.',
    choices: [
      {
        text: 'Take a stick and stand with them.',
        tag: 'defiant',
        outcome: 'You learn the ward by night, every gate and every face. You also learn what the soldiers do with the names you give them.',
        effect: (p) => { p.setMem('nn_cjtf', true); p.h -= 3; p.r += 4; p.s += 2; p.addFlag('nn_civilian_jtf') },
      },
      {
        text: 'Keep your head down and your gate shut.',
        tag: 'yielding',
        outcome: 'They know your name anyway. Everyone\'s name is known now.',
        effect: (p) => { p.setMem('nn_cjtf', true); p.m -= 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'nn_chibok_2014',
    phase: null,
    weight: 600,
    when: (G) => BORNO(G) && G.currentYear === 2014 && G.age >= 10 && once(G, 'nn_chibok'),
    text: (G) => `In April the men come to the girls' secondary school in Chibok at night in trucks, dressed as soldiers, and take the girls who had come back to sit their exams. Two hundred and seventy-six. Chibok is a day's drive from ${PLACE(G) === 'ng_maiduguri' ? 'Maiduguri' : 'your village'}. For two weeks the government says it is not sure it happened. Then the whole world says the name of the town, and it is strange to hear a place you know said in so many accents.${hasDaughter(G) ? ' You do not let your daughter out of the compound for a month, and then you do, because what else.' : ''}`,
    context: 'On the night of 14-15 April 2014 Boko Haram fighters abducted 276 schoolgirls from the Government Girls Secondary School in Chibok, Borno State. Fifty-seven escaped almost immediately. Twenty-one were released in October 2016 and eighty-two in May 2017; around a hundred were still missing a decade later.',
    choices: null,
    effect: (p) => { p.setMem('nn_chibok', true); p.m -= 8; p.addFlag('nn_chibok_2014') },
  },

  {
    id: 'nn_kano_mosque_2014',
    phase: null,
    weight: 600,
    when: (G) => KANO(G) && MUSLIM(G) && G.currentYear === 2014 && G.age >= 10 && once(G, 'nn_kmosque'),
    text: 'At the end of November, at the Friday prayer at the Central Mosque beside the Emir\'s palace, two bombs and then the gunmen. The new Emir had asked the people to defend themselves a week before. You were at the small mosque near home that Friday, for no reason you can name, and for the rest of your life you keep looking for the reason.',
    context: 'On 28 November 2014 suicide bombers and gunmen attacked Friday prayers at the Kano Central Mosque, killing more than 100 people. The newly installed Emir, Muhammadu Sanusi II, had called on Nigerians to take up arms in self-defence.',
    choices: null,
    effect: (p) => { p.setMem('nn_kmosque', true); p.m -= 9; p.addFlag('nn_kano_mosque_2014') },
  },

  {
    id: 'nn_boko_displaced',
    phase: null,
    weight: 400,
    when: (G) => BORNO_VILLAGE(G) && G.currentYear >= 2014 && G.currentYear <= 2015 && G.age >= 4 && once(G, 'nn_idp'),
    text: 'The men come on motorbikes in the afternoon, and by evening your village is a place you are walking away from. You walk for three days toward Maiduguri with what you could carry and the people you could find, and some of the people you walked with are not there on the third day. The camp is a school on the edge of the city, with families in the classrooms and more under tarpaulin in the yard. A woman with a clipboard asks your name, your village, how many. The word she writes for you is IDP.',
    context: 'By 2015 more than two million people had been displaced in northeast Nigeria. Bama and Gwoza fell in August and September 2014 and Baga in January 2015. Maiduguri\'s population roughly doubled as camps filled schools, government buildings and open ground.',
    choices: null,
    effect: (p) => {
      p.setMem('nn_idp', true); p.m -= 14; p.h -= 5; p.r += 6
      p.wipeMoney(0.7)
      p.addFlag('nn_idp_camp'); p.addFlag('internally_displaced')
      p.relocate('ng_maiduguri', 'informal')
    },
  },

  // ── ADULT LIFE ─────────────────────────────────────────────────────────────

  {
    id: 'nn_hajj',
    phase: null,
    weight: 120,
    specificity: 3,
    when: (G) => NORTH_MUSLIM(G) && G.age >= 38 && G.currentYear >= 1960 && G.currentYear <= 2026 && G.money > 1500 &&
      !G.flags.includes('completed_hajj') && !G.flags.includes('hajj_complete') && once(G, 'nn_hajj'),
    text: (G) => {
      const title = FEMALE(G) ? 'Hajiya' : 'Alhaji'
      const mina = G.currentYear === 2015 ? ' At Mina the crowd folds in on itself on the way to the pillars, and later you learn how many of the dead were from Kano and Borno and you know three of the names.' : ''
      return `The pilgrims' camp by the airport is full of people from every local government in the state, in white, sleeping on mats, and your whole family comes to see you off as if you were going to war. The plane is the first you have been on. In Mecca you are one of a million, and it is the least alone you have ever felt.${mina} When you come back they call you ${title} at the gate before you have put down your bag.`
    },
    choices: null,
    effect: (p) => { p.setMem('nn_hajj', true); p.m += 10; p.karma += 6; p.wipeMoney(0.3); p.addFlag('completed_hajj'); p.addFlag('nn_alhaji') },
  },

  // ── THE MIDDLE BELT ────────────────────────────────────────────────────────

  {
    id: 'nn_tiv_1964',
    phase: null,
    weight: 500,
    when: (G) => TIV(G) && G.currentYear === 1964 && G.age >= 5 && once(G, 'nn_tiv64'),
    text: 'The houses that burn this year belong to the men who work for the native authority, the tax men and the party men of the North, and the men who burn them are your cousins. Everyone in the compound is for Tarka and the United Middle Belt Congress, and nobody says so above a whisper when the police lorry comes through. Then the army comes and stays. Your father says the Tiv are not Hausa and never were, and that the government in Kaduna has forgotten it. He says it the same way every time, as if it were a proverb.',
    context: 'Tiv resistance to the Northern People\'s Congress and its native authorities broke out in riots in 1960 and again, much more seriously, in 1964, when the army was deployed in Tivland. The Tiv largely supported Joseph Tarka\'s United Middle Belt Congress, which demanded a separate Middle Belt region.',
    choices: null,
    effect: (p) => { p.setMem('nn_tiv64', true); p.m -= 5; p.addFlag('nn_tiv_riots') },
  },

  {
    id: 'nn_tiv_soldier',
    phase: null,
    weight: 250,
    specificity: 4,
    claimsYears: { from: 1968, to: 1969 },
    when: (G) => TIV(G) && MALE(G) && G.age >= 17 && G.age <= 28 && G.currentYear >= 1967 && G.currentYear <= 1969 && !G.inPrison && once(G, 'nn_tivsol'),
    text: 'The recruiting lorry comes to the market at Gboko and half the young men you grew up with climb onto it. The army is Tiv at the bottom and always has been; the officers are northerners and southerners who went to school, and the men who carry the rifles are from here. They are going east, to a war about whether the Igbo can leave.',
    context: 'Tiv men were recruited into the Nigerian Army in large numbers from the colonial period onwards, and during the civil war of 1967-70 they were widely described as the backbone of the federal infantry.',
    choices: [
      {
        text: 'Climb onto the lorry.',
        outcome: 'You learn to march in three weeks and to sleep in a trench in one night. When it ends you come back with a limp and a way of sitting with your back to the wall.',
        effect: (p) => { p.setMem('nn_tivsol', true); p.h -= 6; p.r += 5; p.mo += 300; p.addFlag('nn_federal_soldier'); p.addFlag('military_service') },
      },
      {
        text: 'Stay on the farm.',
        outcome: 'Of the boys who went from your village, you know which ones came back. So does everyone. You do not talk about the others.',
        effect: (p) => { p.setMem('nn_tivsol', true); p.m -= 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'nn_three_nations',
    phase: null,
    weight: 22,
    specificity: 3,
    when: (G) => BENUE(G) && G.character?.ethnicity === 'other_nigerian' && G.age >= 16 && G.age <= 45 && G.currentYear >= 1970 && G.currentYear <= 2020 && once(G, 'nn_3n'),
    text: 'Somebody from Lagos asks you what you are, Hausa, Yoruba or Igbo, as if that were the whole list. You say Tiv and they look at you as if you had made a mistake on a form. In the north you are a southerner and in the south you are a northerner and in the capital nobody has heard of you until they need soldiers or yams. You have started saying Middle Belt, which is not a people, only a place that is between.',
    choices: null,
    effect: (p) => { p.setMem('nn_3n', true); p.m -= 2; p.e += 2; p.addFlag('nn_middle_belt_minority') },
  },

  {
    id: 'nn_tiv_jukun',
    phase: null,
    weight: 350,
    when: (G) => BENUE_XN(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 8 && once(G, 'nn_tj'),
    text: 'The fighting is at Wukari, over the border in Taraba, between the Tiv farmers and the Jukun whose land the Jukun say it is. It comes back up the road with the people running from it, who sleep in your church for a month. Men you know go south with cutlasses and come back not saying where they have been. From southern Kaduna the news is the same shape, a market at Zango Kataf, a name of a people, a number.',
    context: 'Tiv-Jukun violence around Wukari and the Benue-Taraba border began in 1990 and was heavy in 1991-92, flaring again in 2001. In February and May 1992 clashes between the Atyap and Hausa at Zango Kataf in southern Kaduna killed hundreds.',
    choices: null,
    effect: (p) => { p.setMem('nn_tj', true); p.m -= 6; p.addFlag('nn_tiv_jukun') },
  },

  {
    id: 'nn_zaki_biam',
    phase: null,
    weight: 700,
    when: (G) => BENUE_XN(G) && G.currentYear === 2001 && G.age >= 6 && once(G, 'nn_zb'),
    text: 'Nineteen soldiers are killed near the Taraba border, and a week later the army arrives at Zaki Biam and the towns around it on market day. They gather the men in the square. They burn the yam market, the biggest in the country, and the houses behind it, and then the next town, and the next. Afterwards the President says in Abuja that he does not apologise. You know a family from Zaki Biam. You go to their compound in November and there is nothing to knock on.',
    context: 'On 22-24 October 2001, after nineteen soldiers were killed in the Tiv-Jukun conflict, Nigerian Army units killed well over a hundred civilians and razed Zaki Biam and several other Tiv towns in Benue. President Obasanjo defended the operation.',
    choices: null,
    effect: (p) => { p.setMem('nn_zb', true); p.m -= 10; p.r += 3; p.addFlag('nn_zaki_biam') },
  },

  {
    id: 'nn_jos',
    phase: null,
    weight: 80,
    specificity: 3,
    when: (G) => BENUE_XN(G) && G.currentYear >= 2008 && G.currentYear <= 2010 && G.age >= 14 && once(G, 'nn_jos'),
    text: 'Your cousin in Jos sends word that he is all right, and that is how you learn it has started again. It started in 2001 over a political appointment and it has been starting since then over everything: a local election, a mosque, a church, a cow. In March it is Dogo Nahawa, a village outside the city, at night, with machetes, and the photographs of the women laid out on the ground come down to Benue in the newspaper. Your cousin has moved his family into a street where everyone goes to his church. Jos has become that kind of city.',
    context: 'Jos, capital of Plateau State, saw large-scale violence between mainly Christian indigenes and mainly Muslim Hausa-Fulani settlers in September 2001 (about 1,000 dead), November 2008, and January and March 2010, including the massacre at Dogo Nahawa on 7 March 2010.',
    choices: null,
    effect: (p) => { p.setMem('nn_jos', true); p.m -= 5 },
  },

  {
    id: 'nn_agatu_2016',
    phase: null,
    weight: 600,
    when: (G) => BENUE_XN(G) && G.currentYear === 2016 && G.age >= 10 && once(G, 'nn_agatu'),
    text: 'In Agatu, in the Idoma country to the south-west, armed herders come into the villages at the end of February and stay for days. When the police finally arrive there is not much left for them to protect. The dead are counted in the hundreds and the number is argued about in Abuja while the burials are already done. Your market buys yams from Agatu. This season it does not.',
    context: 'In late February 2016 attacks attributed to armed Fulani herders on villages in Agatu local government area, Benue State, killed several hundred people and displaced thousands.',
    choices: null,
    effect: (p) => { p.setMem('nn_agatu', true); p.m -= 6; p.addFlag('nn_agatu_2016') },
  },

  {
    id: 'nn_benue_2018',
    phase: null,
    weight: 700,
    when: (G) => BENUE_XN(G) && G.currentYear === 2018 && G.age >= 10 && once(G, 'nn_b18'),
    text: 'On New Year\'s Day they come into Guma and Logo, because the grazing law came into force in November and the cattle are no longer allowed to walk where they have always walked. On the eleventh of January there is a burial in Makurdi, seventy-three coffins in rows on the ground, and the whole state stands and watches, and the governor weeps and makes a speech. You do not remember the speech. You remember the length of the rows.',
    context: 'Benue State\'s Open Grazing Prohibition and Ranches Establishment Law came into force in November 2017. On 1 January 2018 attacks on villages in Guma and Logo LGAs killed at least 73 people, who were given a mass burial in Makurdi on 11 January.',
    choices: null,
    effect: (p) => { p.setMem('nn_b18', true); p.m -= 9; p.addFlag('nn_benue_2018') },
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'nn_ft_allo',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('nn_allo_school') && MUSLIM(G) && G.age >= 30 && G.currentYear <= 2026 && (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? 0) >= 5 && (c.age ?? 0) <= 9) && once(G, 'nn_ft_allo'),
    text: 'Your child comes home from the malam with a board and a verse on it, and says it at you in the courtyard in the same sing-song you said it in, with the same mistake in the same place. You correct it the way the malam corrected you, without thinking, and your hand goes to the board to wash it, and you stop, and let the child do it.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_allo', true); p.m += 5 },
  },

  {
    id: 'nn_ft_almajiri_2020',
    phase: null,
    weight: 350,
    when: (G) => G.flags.includes('nn_almajiri') && LIVES_NORTH(G) && G.currentYear === 2020 && once(G, 'nn_ft_alm20'),
    text: 'Under the sickness the governors decide the almajiri boys are to go home, each to his own state, and lorries go north and east with boys packed in the back, some of whom do not know which village home is. You watch one pass on the road with a boy standing at the tailgate holding a plastic bowl. You had that bowl. You had that exact bowl, the colour and the crack, and you stand at the roadside until the lorry has gone.',
    context: 'In April and May 2020, citing Covid-19, northern state governors transferred tens of thousands of almajiri children back to their states of origin, often in crowded lorries; many tested positive on arrival.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_alm20', true); p.m -= 4; p.r += 2 },
  },

  {
    id: 'nn_ft_almajiri_gate',
    phase: null,
    weight: 80,
    when: (G) => G.flags.includes('nn_almajiri') && G.age >= 28 && LIVES_NORTH(G) && once(G, 'nn_ft_almg'),
    text: 'Boys come to your gate at midday with bowls and say the words, and you know the words. What is left in the pot goes to them. Sometimes you give them more than what is left, and the house looks at you, and you do not explain, because it would take the whole afternoon and you would not be able to say the part that matters.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_almg', true); p.karma += 3; p.m += 1 },
  },

  {
    id: 'nn_ft_sardauna',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('nn_sardauna_1966') && LIVES_NORTH(G) && G.age >= 30 && G.currentYear >= 1980 && G.currentYear <= 2026 && once(G, 'nn_ft_sard'),
    text: (G) => `In the tailor's shop there is still a picture of the Sardauna in his turban, faded almost to white, over the machine. Young men who were born long after him use his name to mean a time when the north had a leader and knew it. ${G.age - (G.currentYear - 1966) <= 14 ? 'You were a child and you remember mostly the wailing through the wall.' : 'You were grown, and you remember that he was a man, and that people argued about him while he lived.'} You do not correct them. It is not a thing that can be corrected.`,
    choices: null,
    effect: (p) => { p.setMem('nn_ft_sard', true); p.m -= 1; p.e += 1 },
  },

  {
    id: 'nn_ft_upe',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('nn_upe_1976') && NORTH_OR_BELT(G) && G.age >= 30 && G.currentYear >= 1990 && G.currentYear <= 2026 && once(G, 'nn_ft_upe'),
    text: 'The UPE school at the edge of town is still there. The zinc has rusted through in two places and there are no desks now, the children sit on the floor, and the teacher is paid when the state remembers. It was new once. You remember the smell of the fresh blocks and the man with the list. Everything the country builds, it builds all at once and then leaves out in the rain.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_upe', true); p.m -= 2 },
  },

  {
    id: 'nn_ft_kulle',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('nn_kulle') && G.age >= 48 && once(G, 'nn_ft_kulle'),
    text: (G) => G.flags.includes('nn_kulle_trade')
      ? 'Your son\'s wife cooks the same kosai from the same room, and sends it out with your grandchildren on their heads. She asked you for the recipe and you gave it to her, and then, a week later, the other thing, which is the list of which houses pay and which do not. That took thirty years to write and she did not ask for it.'
      : 'You have lived most of your life inside one wall and you know every sound the street makes on the other side of it. The girls in your son\'s generation go out to the university, to the market, to work, and come back and tell you, and you tell them which of the things they saw were already true when you were young.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_kulle', true); p.m += 3 },
  },

  {
    id: 'nn_ft_tray',
    phase: null,
    weight: 25,
    when: (G) => G.flags.includes('nn_tray_child') && G.age >= 30 && once(G, 'nn_ft_tray'),
    text: 'You pass a girl with a tray on her head calling the same call you called, and your mouth moves with it. You still know which streets buy. The streets have changed their names since, and some of them are not there, and you still know.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_tray', true); p.m += 1 },
  },

  {
    id: 'nn_ft_maitatsine',
    phase: null,
    weight: 300,
    when: (G) => G.flags.includes('nn_maitatsine') && LIVES_NORTH(G) && G.currentYear >= 2009 && G.currentYear <= 2010 && once(G, 'nn_ft_mts'),
    text: 'Men at the mosque say this new sect is Maitatsine again, and the young men look blank, because it was before they were born. You remember the smoke. You remember that everyone said then that it was finished, and that the boys who followed him had nothing, and that nothing was done about the boys. There are more of them now.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_mts', true); p.r += 3; p.m -= 3 },
  },

  {
    id: 'nn_ft_hisbah',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('nn_sharia_2000') && KANO_CITY(G) && G.currentYear >= 2004 && G.currentYear <= 2020 && once(G, 'nn_ft_hisbah'),
    text: 'The hisbah men in their green pull a keke over at the roundabout because a woman is sitting in the back beside a man who is not her husband, and they make her get out and wait for another. Some weeks they pour beer into the gutter in front of a crowd. The Sharia everyone marched for turns out to be mostly this: young men in uniforms deciding things about women on tricycles, and the governor as rich as he was before.',
    context: 'Kano\'s Hisbah Board, formally established in 2003, enforces Sharia-derived public morality rules: segregating passengers on commercial tricycles, seizing and destroying alcohol, policing dress.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_hisbah', true); p.m -= 1 },
  },

  {
    id: 'nn_ft_polio',
    phase: null,
    weight: 350,
    when: (G) => polioParent(G) && G.currentYear === 2020 && once(G, 'nn_ft_polio'),
    text: (G) => G.flags.includes('nn_polio_refused')
      ? 'The radio says Africa is free of wild polio, and that the last case in Nigeria was four years ago in Borno. Your child grew up walking. You think of the back room with the children kept quiet in it and the woman waiting at the gate, and whether she remembers your gate among all the others, and you hope she does not.'
      : 'The radio says Africa is free of wild polio. You think of the vaccinator at your gate with the marker, waiting, and of the finger your child held up to show everyone that week as if it were an injury. There is a boy in the next ward, your child\'s age, who walks with a stick. Nobody has ever said aloud whose gate stayed shut.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_polio', true); p.r += 1 },
  },

  {
    id: 'nn_ft_cjtf',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('nn_civilian_jtf') && G.currentYear >= 2017 && G.currentYear <= 2026 && once(G, 'nn_ft_cjtf'),
    text: 'Some of the boys you stood with have been taken into the army and some into the state vigilante service, with a salary, and some into nothing. You still have the vest. Sometimes a woman in the market looks at you for too long and you know you gave a name once that belonged to her house. She has not forgotten. You have not either, and neither of you says anything, and you buy the onions.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_cjtf', true); p.r += 4; p.m -= 3 },
  },

  {
    id: 'nn_ft_yusuf',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('nn_yusuf_2009') && BORNO(G) && G.currentYear >= 2012 && G.currentYear <= 2026 && once(G, 'nn_ft_yusuf'),
    text: 'Of the boys on your street who went to hear the preacher for the free meals, two are dead, one is in the bush and nobody says his name, and one sells phone credit at the roundabout and talks about football. You buy from him. Neither of you mentions the year he was fifteen.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_yusuf', true); p.m -= 3; p.r += 2 },
  },

  {
    id: 'nn_ft_chibok',
    phase: null,
    weight: 300,
    when: (G) => G.flags.includes('nn_chibok_2014') && G.currentYear >= 2016 && G.currentYear <= 2017 && once(G, 'nn_ft_chibok'),
    text: (G) => G.currentYear === 2016
      ? 'In October twenty-one of the Chibok girls are brought back. The photographs show young women holding babies. They are handed to the government before their parents, and a minister speaks for a long time. More than two years. You work out how old they are now and then you stop working things out.'
      : 'In May eighty-two more are released, in exchange for men nobody names. Their parents wait in a hall in Abuja for a list. Some names are on it. The parents whose names are not on the list go home on the same bus.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_chibok', true); p.m -= 2 },
  },

  {
    id: 'nn_ft_idp',
    phase: null,
    weight: 80,
    when: (G) => G.flags.includes('nn_idp_camp') && G.currentYear >= 2017 && G.age >= 8 && G.currentYear <= 2026 && once(G, 'nn_ft_idp'),
    text: 'The government says your local government is liberated and people can go back. Some families from the camp go, in a convoy with soldiers, and some of them come back to the camp in a month. The farms are too far from the garrison town to reach safely, and a farm you cannot reach is not a farm. You have learned the camp: which queue, which day, whose cousin gives out the rice. The children born in the camp speak with a Maiduguri accent.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_idp', true); p.r += 4; p.m -= 3 },
  },

  {
    id: 'nn_ft_kano_bombs',
    phase: null,
    weight: 30,
    when: (G) => (G.flags.includes('nn_kano_2012') || G.flags.includes('nn_kano_mosque_2014')) && KANO(G) && G.currentYear >= 2016 && G.currentYear <= 2026 && once(G, 'nn_ft_kbomb'),
    text: 'At the gate of the mosque on Fridays a young man pats you down with his eyes lowered, apologising with his hands. It has been done every Friday for years. The market has come back and the traffic has come back, and when a tyre bursts on the road, the whole street still stops for one second and then goes on as if it had not.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_kbomb', true); p.m -= 2 },
  },

  {
    id: 'nn_ft_lake',
    phase: null,
    weight: 80,
    when: (G) => G.flags.includes('nn_lake_chad') && G.age >= 50 && BORNO(G) && once(G, 'nn_ft_lake'),
    text: 'You take a child of the house out past the last fields and show them where the water was when you were young. There is nothing to see: bushes, a track, a man with goats. The child looks where you are pointing and politely sees nothing. You describe the fish, the size of them, and the child nods the way children nod at the old, and you understand that a lake can become a story in one lifetime.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_lake', true); p.m -= 2; p.e += 1 },
  },

  {
    id: 'nn_ft_tiv_soldier',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('nn_federal_soldier') && G.age >= 45 && once(G, 'nn_ft_tivsol'),
    text: 'You go to Makurdi about the pension again, with the same papers in the same envelope, and wait on the same bench with the same men, fewer each year. At the next desk an Igbo man about your age is waiting for something of his own. You were at Onitsha, and so, it turns out, was he, on the other side of the river. You talk for an hour. It is the best hour of the day and you do not tell anyone at home about it.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_tivsol', true); p.m += 2; p.r += 2 },
  },

  {
    id: 'nn_ft_benue_farm',
    phase: null,
    weight: 40,
    when: (G) => (G.flags.includes('nn_benue_2018') || G.flags.includes('nn_agatu_2016') || G.flags.includes('nn_zaki_biam') || G.flags.includes('nn_tiv_jukun') || G.flags.includes('nn_tiv_riots')) &&
      BENUE_XN(G) && G.currentYear >= 2019 && G.currentYear <= 2026 && G.age >= 25 && once(G, 'nn_ft_bfarm'),
    text: (G) => {
      const past = G.flags.includes('nn_zaki_biam') ? ' You have seen soldiers burn a market and herders burn a village and you no longer rank them.' : G.flags.includes('nn_tiv_riots') ? (G.parents?.father?.alive === false ? ' Your father fought the North with a cutlass in 1964 and died thinking it was finished.' : ' Your father fought the North with a cutlass in 1964 and still thinks it was finished.') : ''
      return `There is a farm of yours past the stream you do not go to any more, not since the burials. You tell people it is the distance. The yams on it are still yours in the sense that nobody else has planted there, and each season you plant closer to the house.${past}`
    },
    choices: null,
    effect: (p) => { p.setMem('nn_ft_bfarm', true); p.mo -= 150; p.m -= 3 },
  },

  {
    id: 'nn_ft_alhaji',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('nn_alhaji') && G.age >= 45 && G.mem?.nn_hajj && once(G, 'nn_ft_alhaji'),
    text: (G) => `Nobody has called you by your own name since you came back from Mecca. ${FEMALE(G) ? 'Hajiya' : 'Alhaji'}, at the market, at the mosque, on the envelopes. A child in the compound thought it was your name and you let her. The white cap from the pilgrimage is kept in a plastic bag in the box with your papers, and you take it out at Sallah and put it back afterwards.`,
    choices: null,
    effect: (p) => { p.setMem('nn_ft_alhaji', true); p.m += 3; p.s += 1 },
  },

  {
    id: 'nn_ft_three_nations',
    phase: null,
    weight: 25,
    when: (G) => G.flags.includes('nn_middle_belt_minority') && G.age >= 45 && G.currentYear >= 1992 && once(G, 'nn_ft_3n'),
    text: 'Your child fills in a form for a federal job and there is a box for state of origin and the box decides things. Benue. The clerk in Abuja says "Tiv" as if it were a kind of yam. Your child comes home and says it to you as a joke and you laugh, and after the house is asleep you sit for a while with the lamp off.',
    choices: null,
    effect: (p) => { p.setMem('nn_ft_3n', true); p.m -= 1 },
  },
]
