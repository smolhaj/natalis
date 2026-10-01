// events_iran_civilian.js — Iran from the kitchen, the alley and the roof.
//
// A content review followed a woman born in Tehran in 1965 for sixty-nine
// years and found one Iranian event in the whole life. What the corpus had
// was written about the state: the revolution week, the purge, the soldier,
// the executions, the hijab as policy. The civilian side — the coupon book,
// the radio saying red alert, the son's face on the wall at the end of the
// street, the video man with the bag, the satellite dish under the washing —
// was the part almost every Iranian actually lived, and it was unwritten.
//
// The roster draws Iranians in two places: Tehran and rural Isfahan. Guards
// read the LIVE country and the place id, so an emigrant in Los Angeles does
// not get the red alert; ethnicity is read only where the prose names a
// people (Azeri, Kurdish). Baluch, Arab and Baha'i lives need places and a
// religion id the roster does not yet have, and are not attempted here.
//
// Dates used, all checked:
//   19 Aug 1953 (28 Mordad 1332)  coup against Mosaddegh; crowds from south
//                Tehran, Shaban Jafari among them; Mosaddegh's house on Kakh
//                Street shelled by tanks. He dies under house arrest at
//                Ahmadabad on 5 March 1967 and is buried in his own house.
//   5 Jun 1963 (15 Khordad)  riots in Tehran and Qom after Khomeini's arrest.
//   1963-79      Sepah-e Danesh, the Literacy Corps: conscripts with a diploma
//                serve as village teachers.
//   1967-2005    the Paykan, built at Iran Khodro.
//   8 Sep 1978 (17 Shahrivar)  Black Friday, Jaleh Square, under martial law.
//                Autumn 1978: strikes, evening power cuts, Allahu Akbar from the
//                rooftops at night.
//   4 Nov 1979 - 20 Jan 1981  the US embassy held, 444 days.
//   1979         August: Khomeini orders the army into Kurdistan; Sanandaj,
//                Paveh, Mahabad.
//   22 Sep 1980 - 20 Aug 1988  the war with Iraq. Coupons (kopon) for
//                staples from 1980. The war of the cities: 1984-85, 1987,
//                and 29 Feb - 20 Apr 1988, Iraqi missiles on Tehran; a large
//                part of the city leaves for the north. The radio warning is
//                "vaz'iyat-e qermez", the red situation.
//   3-6 Jun 1989 Khomeini dies; the funeral crowd tears the shroud.
//   21 Jun 1990  Manjil-Rudbar earthquake after midnight, during the World
//                Cup, about 35,000-40,000 dead.
//   Feb 1995     the Majlis bans satellite dishes.
//   29 Nov 1997  2-2 in Melbourne, qualification; women into Azadi in December.
//                21 Jun 1998, Iran 2 United States 1, in Lyon.
//   9 Jul 1999 (18 Tir)  the dormitory at Kuy-e Daneshgah attacked.
//   Dec 2010     subsidy reform; cash handout (yaraneh) of 45,500 tomans a
//                head a month.
//   Jul-Oct 2012 the chicken price; the police chief asks television not to
//                show people eating chicken; early October the rial loses about
//                a third in days and the bazaar shuts.
//   15 Nov 2019 (Aban 1398)  petrol prices raised overnight; protests; a
//                near-total internet shutdown for about a week; hundreds dead.
//   16 Sep 2022  Mahsa (Jina) Amini, a Kurd from Saqqez, dies in custody;
//                "Jin, jiyan, azadi" is a Kurdish slogan. Chants from the
//                rooftops at night, as in 1978 and 2009.
//   13-24 Jun 2025  Israeli strikes on Tehran; roads north jammed.
//   Zayandeh Rud dry through Isfahan for most of most years from the late
//   2000s.

const once = (G, key) => !G.mem?.[key]
const IN_IR = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Iran'
const PLACE = (G) => G.place?.id ?? null
const TEHRAN = (G) => IN_IR(G) && PLACE(G) === 'ir_tehran'
const VILLAGE = (G) => IN_IR(G) && PLACE(G) === 'ir_rural'
const AZERI = (G) => IN_IR(G) && G.character?.ethnicity === 'azerbaijani_iranian'
const KURD = (G) => IN_IR(G) && G.character?.ethnicity === 'kurd_iranian'
const WAR_BROTHER = (G) => (G.siblings ?? []).some(s => s && s.alive !== false && s.gender === 'male' && G.age + (s.ageDiff ?? 0) >= 16 && G.age + (s.ageDiff ?? 0) <= 30)
const STUDENT = (G) => G.education?.enrolled?.type === 'university' || G.flags.has('university_student') || G.flags.has('university_graduate') || !!G.mem?.uniField
const childAged = (G, lo, hi) => (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? -1) >= lo && (c.age ?? -1) <= hi)
const MOTHER = (G) => !!G.parents?.mother && G.parents.mother.alive !== false
const FATHER = (G) => !!G.parents?.father && G.parents.father.alive !== false
const newborn = (G) => (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? 99) <= 1)

export const IRAN_CIVILIAN_EVENTS = [

  // ── CHILDHOOD ──────────────────────────────────────────────────────────────

  {
    id: 'irc_kuche',
    phase: null,
    weight: 40,
    when: (G) => TEHRAN(G) && G.age >= 5 && G.age <= 10 && G.currentYear >= 1935 && once(G, 'irc_kuche'),
    text: (G) => G.currentYear < 1975
      ? 'The house turns its back on the street. Inside the wall there is a courtyard, a small pool with goldfish your father buys at Nowruz, a pomegranate tree, and the rooms around it. Outside is the kuche, the alley, with water running in the joub under the plane trees, and that is where the children of six houses spend the afternoon until somebody\'s mother calls a name from a doorway and all of you go quiet to hear whose.'
      : 'The flats in your building face the kuche, and the kuche is where everything happens: a ball against the garage door, a bicycle with one brake, the joub running along the edge under the plane trees with a sandal in it that nobody will go in after. At sunset somebody\'s mother calls a name from a balcony and all of you go quiet to hear whose.',
    choices: null,
    effect: (p) => { p.setMem('irc_kuche', true); p.m += 2 },
  },

  {
    id: 'irc_hammam',
    phase: null,
    weight: 40,
    when: (G) => IN_IR(G) && MOTHER(G) && G.age >= 4 && G.age <= (G.character?.gender === 'male' ? 6 : 9) && G.currentYear >= 1935 && G.currentYear <= 1975 && once(G, 'irc_hammam'),
    text: 'On Thursday you go to the hammam with your mother and your aunts and a bundle of clean clothes. The steam room has a dome with glass set into it like coins, and light comes down through the steam in rods. A woman with a rough mitt scrubs you until grey rolls of skin come off your arms and you are sure there will be nothing left of you. Afterwards, wrapped and red, you are given a glass of sherbet and you have never been so clean or so tired.',
    choices: null,
    effect: (p) => { p.setMem('irc_hammam', true); p.m += 2 },
  },

  {
    id: 'irc_chaharshanbe_suri',
    phase: null,
    weight: 30,
    when: (G) => IN_IR(G) && G.age >= 5 && G.age <= 12 && G.currentYear >= 1935 && once(G, 'irc_suri'),
    text: 'On the last Tuesday night of the year the alley has fires in it, little ones of brushwood in a row, and everyone jumps them: grandmothers with their skirts held, fathers, you. You say what everyone says as you go over — my yellowness to you, your redness to me — giving the fire your pale winter and taking its colour. Later you go door to door with a spoon and a bowl, banging, and somebody puts sweets in it without opening the door all the way.',
    choices: null,
    effect: (p) => { p.setMem('irc_suri', true); p.m += 3 },
  },

  {
    id: 'irc_qanat_turn',
    phase: null,
    weight: 50,
    when: (G) => VILLAGE(G) && FATHER(G) && G.age >= 8 && G.age <= 16 && G.currentYear >= 1935 && G.currentYear <= 1995 && once(G, 'irc_qanat'),
    text: 'The water comes from the qanat, a tunnel under the desert that somebody dug before anybody can remember, and it is shared by time. Your family\'s turn this week is at two in the morning. Your father wakes you and you go out with a lamp to the channel, and the mirab sets a copper bowl with a hole in it floating in a basin, and when the bowl sinks your turn is over. You open the little earth gate to your field and listen to the water going in. You will never again hear water without counting.',
    context: 'Qanats are gently sloping underground channels that carry groundwater from an aquifer to the surface, some of them thousands of years old. Water rights were measured in time, and the mirab, the village water master, divided the flow; in parts of central Iran a floating bowl with a hole, the fenjan, was the clock.',
    choices: null,
    effect: (p) => { p.setMem('irc_qanat', true); p.e += 1; p.addFlag('irc_qanat_turn') },
  },

  {
    id: 'irc_sepah_danesh',
    phase: null,
    weight: 120,
    when: (G) => VILLAGE(G) && G.age >= 6 && G.age <= 12 && G.currentYear >= 1964 && G.currentYear <= 1978 && once(G, 'irc_sepah'),
    text: 'A young man in an army uniform arrives on the bus from Isfahan with a suitcase and a box of chalk. He is from Tehran, he is nineteen, and he is the teacher now. He holds school in a rented room by the mosque with a blackboard on a nail, and the boys sit on one side and the girls on the other, and some fathers keep their girls home. He teaches you the first letters, the shape of alef standing up like a man, and you write your own name in the dust on the way home.',
    context: 'The Literacy Corps (Sepah-e Danesh) was part of the Shah\'s White Revolution of 1963. Young men with secondary diplomas did their military service as teachers in villages; by the late 1970s some 200,000 had served. For many villages it was the first school.',
    choices: null,
    effect: (p) => { p.setMem('irc_sepah', true); p.e += 4; p.addFlag('irc_literacy_corps') },
  },

  {
    id: 'irc_azeri_school',
    phase: null,
    weight: 120,
    when: (G) => AZERI(G) && G.age >= 6 && G.age <= 9 && G.currentYear >= 1935 && once(G, 'irc_az_school'),
    text: 'At home everybody speaks Turkish. Your grandmother sings you to sleep in it, your father bargains in it, your mother scolds in it. At school the first thing you learn is that it stays at home. The books are Persian and the teacher is Persian and when a word of Turkish comes out of you by mistake the class laughs before you even know what you have said. You learn fast. By the end of the year you dream in both, and answer in the one you are asked in.',
    choices: null,
    effect: (p) => { p.setMem('irc_az_school', true); p.e += 2; p.m -= 2; p.addFlag('irc_azeri_tongue') },
  },

  // ── THE SHAH'S IRAN ────────────────────────────────────────────────────────

  {
    id: 'irc_mordad_1953',
    phase: null,
    weight: 400,
    when: (G) => TEHRAN(G) && G.currentYear === 1953 && G.age >= 7 && once(G, 'irc_mordad'),
    text: (G) => `In August the crowds come up from the south of the city with clubs and pictures of the Shah, men nobody in your street has seen before, and some of them are paid and everybody knows who paid them though nobody says. There is shooting near Mosaddegh's house, and then tanks. ${G.age < 16 ? (FATHER(G) ? 'Your father' : 'Your mother') + ' turns the radio off and tells you not to repeat anything you heard at the table.' : 'You stay inside. In the evening the radio is a different radio.'} The old man in pyjamas who said the oil was Iran's is in custody by the next evening, and by the end of the week the shopkeepers have his picture down and the other one up.`,
    context: 'On 19 August 1953 (28 Mordad) a coup organised by the CIA and British intelligence, with royalist officers and paid crowds from south Tehran, overthrew Prime Minister Mohammad Mosaddegh, who had nationalised the Anglo-Iranian Oil Company. The United States formally acknowledged its role in documents released in 2013.',
    choices: null,
    effect: (p) => { p.setMem('irc_mordad', true); p.m -= 3; p.addFlag('irc_mordad_28') },
  },

  {
    id: 'irc_khordad_1963',
    phase: null,
    weight: 200,
    when: (G) => TEHRAN(G) && G.currentYear === 1963 && G.age >= 12 && once(G, 'irc_khordad'),
    text: 'In June the bazaar shuts its shutters in the middle of the morning, which it does not do, and men run past the end of your street toward the south. A cleric in Qom has been arrested in the night, a man called Khomeini whom you have heard named once, at a funeral, by your uncle. There is shooting by evening. Within a week the shops are open and the radio says nothing happened. Your uncle says his name again, more carefully.',
    choices: null,
    effect: (p) => { p.setMem('irc_khordad', true); p.m -= 2 },
  },

  {
    id: 'irc_paykan',
    phase: null,
    weight: 40,
    when: (G) => IN_IR(G) && G.age >= 25 && G.age <= 60 && G.currentYear >= 1968 && G.currentYear <= 2004 && G.money > 3000 && once(G, 'irc_paykan'),
    text: 'The car is a Paykan, cream, built in Tehran, and it is the first thing your family has ever owned that has a key. That summer you drive north over the mountains on the Chalus road with the whole family and a watermelon on the floor of the back seat, and the air turns wet and green on the other side, and the youngest in the car sees the Caspian and will not believe it is not the sea.',
    choices: null,
    effect: (p) => { p.setMem('irc_paykan', true); p.m += 4; p.mo -= 1500; p.addFlag('irc_paykan') },
  },

  // ── 1978-1981 ──────────────────────────────────────────────────────────────

  {
    id: 'irc_rooftops_1978',
    phase: null,
    weight: 450,
    when: (G) => TEHRAN(G) && G.currentYear === 1978 && G.age >= 8 && once(G, 'irc_roof78'),
    text: 'In September the soldiers fire into the crowd at Jaleh Square on a Friday morning, and after that everything is different and nothing in the house is said aloud. By November the electricity goes off every evening at eight because the workers are on strike, and in the dark, from the roofs, it starts: one voice, then the next roof, then the whole district, Allahu Akbar, over and over, men and women, until the dark is made of it.',
    context: 'On 8 September 1978, "Black Friday", troops fired on demonstrators in Jaleh Square in Tehran on the first day of martial law. Strikes in the oil fields and the power stations followed through the autumn. Shouting "Allahu Akbar" from the rooftops at night became one of the revolution\'s signatures; it returned in 2009 and in 2022.',
    choices: [
      {
        text: 'Go up to the roof with the others.',
        outcome: 'Your neighbour from across the alley is on her roof in her chador, and she sees you, and neither of you stops.',
        effect: (p) => { p.setMem('irc_roof78', true); p.m += 4; p.s += 2; p.addFlag('irc_rooftop_1978') },
      },
      {
        text: 'Stay downstairs by the candle and listen.',
        outcome: 'You can tell the voices apart after a week. You could name every house.',
        effect: (p) => { p.setMem('irc_roof78', true); p.addFlag('irc_rooftop_1978') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_embassy_tv',
    phase: null,
    weight: 200,
    when: (G) => TEHRAN(G) && G.currentYear >= 1979 && G.currentYear <= 1980 && G.age >= 9 && once(G, 'irc_embassy'),
    text: (G) => G.currentYear === 1979
      ? 'In November students climb the wall of the American embassy and do not come down. Every evening the television shows the gate on Taleghani Avenue, the blindfolded men, the crowd outside selling hot beetroot and boiled broad beans to the people who come to shout. Your father goes once, to see it, the way people go to see a flood. He comes back saying it was like a fair.'
      : 'The Americans are still in the embassy. It has been a year. Somebody has painted "den of spies" on the wall in English and Persian, and the beetroot sellers are still outside the gate, and now there is a war as well, and the embassy has become a thing you pass on the bus and forget to look at.',
    context: 'On 4 November 1979 students occupied the US embassy in Tehran and held fifty-two Americans for 444 days, until 20 January 1981. The embassy was called "the den of spies". The crisis consolidated the clerical faction and ended the provisional government.',
    choices: null,
    effect: (p) => { p.setMem('irc_embassy', true) },
  },

  {
    id: 'irc_kurdistan_1979',
    phase: null,
    weight: 300,
    when: (G) => KURD(G) && MOTHER(G) && G.currentYear >= 1979 && G.currentYear <= 1980 && G.age >= 10 && G.age <= 35 && once(G, 'irc_kurd79'),
    text: 'In the spring everybody\'s cousin in Sanandaj said the revolution would give Kurdistan its own say. By August the radio says the army is going in, and Paveh is a name, and then Sanandaj is, and then Mahabad. Your mother calls her brother from the post office and the line rings and rings. When he comes to Tehran in the winter he sleeps on your floor for a month and does not say what happened, only that the mountains are full of young men now.',
    context: 'In August 1979 Khomeini ordered the army and the Revolutionary Guards into Kurdistan after fighting at Paveh. Sanandaj and Mahabad were retaken over the following year; thousands were killed and dozens executed after summary trials. Kurdish parties went into armed opposition for most of the next decade.',
    choices: null,
    effect: (p) => { p.setMem('irc_kurd79', true); p.m -= 6; p.addFlag('irc_kurdistan_1979') },
  },

  // ── THE WAR, AS CIVILIANS HAD IT ──────────────────────────────────────────

  {
    id: 'irc_coupons',
    phase: null,
    weight: 150,
    when: (G) => IN_IR(G) && G.currentYear >= 1981 && G.currentYear <= 1987 && G.age >= 8 && once(G, 'irc_coupons'),
    text: (G) => G.age < 18 && MOTHER(G)
      ? 'Your mother keeps the coupon book in the drawer with the birth certificates. Each page is numbered and the television says which number is for what this week: cooking oil, sugar, rice, soap, kerosene for the heater. You are the one sent to the queue, because a child can stand all morning and an adult has work. You learn which shop gets the delivery on which day, and which shopkeeper puts his thumb on the scale, and how to hold your place without looking as though you are holding it.'
      : 'The coupon book lives in the drawer with the birth certificates. The television reads out which numbered coupon is good for what this week: oil, sugar, rice, soap, kerosene. You queue before work, and again after, and you learn to do the household\'s arithmetic in coupons rather than in money, because the money will buy anything at the free price and the coupon buys what you can actually afford.',
    context: 'From the first year of the war with Iraq, staples in Iran were rationed through coupons (kopon) issued to each household, redeemable at a subsidised price. A free market ran alongside at several times the price.',
    choices: null,
    effect: (p) => { p.setMem('irc_coupons', true); p.m -= 2; p.addFlag('irc_coupon_years') },
  },

  {
    id: 'irc_brother_front',
    phase: null,
    weight: 200,
    when: (G) => IN_IR(G) && WAR_BROTHER(G) && MOTHER(G) && G.currentYear >= 1981 && G.currentYear <= 1988 && G.age >= 8 && G.age <= 35 && once(G, 'irc_brother'),
    text: 'Your brother goes to the front. There is a photograph of him taken in a studio before he leaves, in a khaki shirt too big at the collar, and your mother puts it on the shelf where the Qur\'an is and turns it to face the door. Letters come, short, in pencil, that say he is well and eating and ask about everybody by name. Your mother cooks a pot of food every Thursday and gives it away at the door to whoever passes, and does not say why, and does not need to.',
    choices: null,
    effect: (p) => { p.setMem('irc_brother', true); p.m -= 5; p.addFlag('irc_brother_front') },
  },

  {
    id: 'irc_martyr_street',
    phase: null,
    weight: 100,
    when: (G) => TEHRAN(G) && G.currentYear >= 1983 && G.currentYear <= 1995 && G.age >= 8 && once(G, 'irc_mural'),
    text: 'The boy from the house at the end of the alley, who used to fix bicycles in the street and whistled at the girls, is on the wall now. His face is painted three metres high on the side of the bakery with red tulips coming up from under his chin, and the alley has a new sign with his name on it and the word shahid before it. His mother still buys bread there every morning. She stands under him in the queue.',
    choices: null,
    effect: (p) => { p.setMem('irc_mural', true); p.m -= 3; p.addFlag('irc_martyr_street') },
  },

  {
    id: 'irc_red_alert_1988',
    phase: null,
    weight: 500,
    when: (G) => TEHRAN(G) && G.currentYear === 1988 && G.age >= 4 && once(G, 'irc_red_alert'),
    text: 'The radio stops whatever it is playing and a man says: attention, attention, the situation is red. Then the siren. You learn to tell the missiles apart from the planes; the missiles give no warning worth having, only a thump you feel through the floor and then, afterwards, the windows. Half the street has packed the car and gone north to relatives by the Caspian. The streets of Tehran in March are empty enough to hear the pigeons.',
    context: 'Between 29 February and 20 April 1988 Iraq fired some two hundred modified Scud missiles at Iranian cities, most of them at Tehran, in the last and worst phase of the "war of the cities". A large part of the capital\'s population left for the provinces. The war ended with a ceasefire that August.',
    choices: [
      {
        text: 'Pack the car and go north with the others.',
        outcome: 'Twelve of you sleep in one room in your aunt\'s house in Rasht for seven weeks, and the rain does not stop once.',
        effect: (p) => { p.setMem('irc_red_alert', true); p.m -= 4; p.mo -= 300; p.addFlag('irc_war_of_cities') },
      },
      {
        text: 'Stay in the city. Tape the windows.',
        outcome: 'You sleep in the stairwell, which somebody says is the safest place, though nobody can say why.',
        effect: (p) => { p.setMem('irc_red_alert', true); p.m -= 7; p.h -= 2; p.addFlag('irc_war_of_cities') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_khomeini_funeral',
    phase: null,
    weight: 250,
    when: (G) => TEHRAN(G) && G.currentYear === 1989 && G.age >= 8 && once(G, 'irc_funeral89'),
    text: 'In June the old man dies and the city goes into the streets in black. It is very hot. Fire engines spray water over the crowd at Behesht-e Zahra to stop people fainting, and people faint anyway. When the body is carried out the crowd surges and the shroud is torn and for a moment there is a white leg showing, and then the helicopter. Whatever you thought of him, you will remember the leg.',
    choices: null,
    effect: (p) => { p.setMem('irc_funeral89', true) },
  },

  // ── THE LONG AFTERWARD ────────────────────────────────────────────────────

  {
    id: 'irc_video_man',
    phase: null,
    weight: 50,
    when: (G) => TEHRAN(G) && G.currentYear >= 1984 && G.currentYear <= 1994 && G.age >= 10 && G.age <= 45 && once(G, 'irc_video'),
    text: 'The video man comes on Wednesdays with a sports bag. He sits on your carpet and drinks tea and takes out tapes without labels: an American film, a Turkish one, a concert of Googoosh from before, recorded off a recording off a recording until her face is mostly snow. You pay him and he takes last week\'s back. Everybody on the street has a video man. Nobody says the word video on the telephone.',
    context: 'Videocassette recorders and tapes were banned in Iran for most of the 1980s. A large informal trade of travelling "video men" supplied Western, Indian and pre-revolutionary Iranian films door to door until video clubs were licensed in the mid-1990s.',
    choices: null,
    effect: (p) => { p.setMem('irc_video', true); p.m += 3; p.mo -= 30 },
  },

  {
    id: 'irc_komiteh_party',
    phase: null,
    weight: 60,
    when: (G) => TEHRAN(G) && G.currentYear >= 1982 && G.currentYear <= 1997 && G.age >= 17 && G.age <= 28 && once(G, 'irc_komiteh'),
    text: 'A birthday at a friend\'s flat, the curtains drawn, a cassette of Los Angeles pop turned down low, girls with their scarves off and boys in shirts, somebody\'s father\'s bottle of arak from a man in Shemiran. At midnight the doorbell. Somebody says komiteh in a whisper and the whole room changes shape in a second: scarves on, tape out of the machine and into the toilet cistern, two boys already over the back wall onto the next roof.',
    choices: [
      {
        text: 'Go over the wall with the boys.',
        tag: 'defiant',
        outcome: 'You come down in a stranger\'s courtyard with a torn sleeve and walk home along the joub at two in the morning, laughing and then not.',
        effect: (p) => { p.setMem('irc_komiteh', true); p.m += 2; p.h -= 1; p.addFlag('irc_komiteh_night') },
      },
      {
        text: 'Sit still and let them come in.',
        tag: 'yielding',
        outcome: 'You spend the night in a room at the komiteh office with the others. Your father comes in the morning with a guarantee and money, and does not speak to you in the car.',
        effect: (p) => { p.setMem('irc_komiteh', true); p.m -= 6; p.mo -= 400; p.addFlag('irc_komiteh_night') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_satellite_dish',
    phase: null,
    weight: 40,
    when: (G) => TEHRAN(G) && G.currentYear >= 1995 && G.currentYear <= 2020 && G.age >= 14 && once(G, 'irc_dish'),
    text: 'The dish is on the roof under a sheet, behind the water tank, where everybody else\'s is. It is illegal, and the whole skyline is grey with them. In the evening the channels from Los Angeles come in: singers your parents danced to before you were born, a man in a suit telling Iran what to do, adverts for carpet shops in Glendale. Twice a year the police come along the roofs and take a few. The next week a man on a motorbike brings new ones.',
    choices: null,
    effect: (p) => { p.setMem('irc_dish', true); p.m += 2 },
  },

  {
    id: 'irc_konkur',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.age >= 17 && G.age <= 18 && G.currentYear >= 1985 && G.literate && once(G, 'irc_konkur'),
    text: 'The konkur is one morning in a sports hall with a thousand other people and a pencil, and it is the whole of the year before it: the classes after school, the test books stacked in your room, your mother bringing tea and not speaking. In the summer the results are printed in the newspaper by number, and your father buys three copies and reads down the columns with his finger. What you will study, and where, and so who you will be, is decided by a rank.',
    choices: [
      {
        text: 'Find your number high on the list.',
        outcome: 'Your mother rings everyone she has ever met. It is a good rank, and for a week the house is a wedding.',
        effect: (p) => { p.setMem('irc_konkur', true); p.e += 3; p.m += 5; p.addFlag('irc_konkur_rank') },
      },
      {
        text: 'Find it low, and a year of trying again ahead.',
        outcome: 'You put the test books back on the desk where they were. There is no other way through.',
        effect: (p) => { p.setMem('irc_konkur', true); p.m -= 5; p.addFlag('irc_konkur_rank') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_tork_joke',
    phase: null,
    weight: 50,
    when: (G) => AZERI(G) && G.place?.id === 'ir_tehran' && G.age >= 14 && G.age <= 45 && G.currentYear >= 1950 && once(G, 'irc_tork'),
    text: 'In Tehran everybody has a Turk joke, and they tell them in front of you as if you were not one, or because you are. The Turk is slow, the Turk is stubborn, the Turk says the wrong word. Half the bazaar is Azeri and so is the man who owns the building the joke-teller rents. You smile. You have learned to tell one back about the Rashtis, and you hate that you have learned it.',
    choices: null,
    effect: (p) => { p.setMem('irc_tork', true); p.m -= 2; p.s += 1 },
  },

  {
    id: 'irc_kurd_name',
    phase: null,
    weight: 120,
    when: (G) => KURD(G) && newborn(G) && G.currentYear >= 1985 && G.currentYear <= 2020 && once(G, 'irc_kname'),
    text: 'You go to the registry office to get the birth certificate with the name already decided, a Kurdish name, your grandmother\'s, Jina or Rojin or Zhilwan. The clerk looks it up in a book and says it is not on the list. There is a list. He offers you some that are. You stand at the counter long enough for the people behind you to sigh.',
    choices: [
      {
        text: 'Write one from the list on the form, and call the child the other at home.',
        outcome: 'The child grows up with two names, one for the school register and one for the kitchen.',
        effect: (p) => { p.setMem('irc_kname', true); p.m -= 3; p.addFlag('irc_kurd_name') },
      },
      {
        text: 'Come back the next week, and the next, until somebody signs it.',
        tag: 'defiant',
        outcome: 'It takes four months and a cousin who knows a man. The certificate has the name on it.',
        effect: (p) => { p.setMem('irc_kname', true); p.m += 2; p.mo -= 150; p.addFlag('irc_kurd_name') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_rudbar_1990',
    phase: null,
    weight: 250,
    when: (G) => IN_IR(G) && G.currentYear === 1990 && G.age >= 10 && once(G, 'irc_rudbar'),
    text: 'It is after midnight in June and half the country is up watching the World Cup from Italy when the earthquake hits Gilan and Zanjan. In the morning the names on the radio are towns you went through on the way to the sea: Rudbar, Manjil. Whole villages have slid down the hills. The mosque near you has a table in the courtyard by noon, blankets and tins and money, and the pile grows all day.',
    choices: null,
    effect: (p) => { p.setMem('irc_rudbar', true); p.m -= 3; p.mo -= 40; p.karma += 2 },
  },

  {
    id: 'irc_football_1997',
    phase: null,
    weight: 250,
    when: (G) => IN_IR(G) && G.currentYear >= 1997 && G.currentYear <= 1998 && G.age >= 10 && once(G, 'irc_ball97'),
    text: (G) => G.currentYear === 1997
      ? 'A Saturday morning in late November, a game in Melbourne, two goals down, and then two goals back, and Iran is going to the World Cup. Within an hour the streets are full of cars with their horns down and girls dancing in the road with their scarves slipping, and the police stand on the corners and do not know what to do and some of them are dancing too. You will think about that night for a long time, about what the whole city looked like with the lid off.'
      : 'June, Lyon, Iran against the United States, and the players walk out carrying white roses for the other side. When the second goal goes in, the street goes out of its mind: car horns, pots banged on balconies, strangers kissing strangers. For one night everybody agrees on something.',
    choices: null,
    effect: (p) => { p.setMem('irc_ball97', true); p.m += 6 },
  },

  {
    id: 'irc_kuy_1999',
    phase: null,
    weight: 350,
    when: (G) => TEHRAN(G) && G.currentYear === 1999 && G.age >= 18 && G.age <= 27 && once(G, 'irc_kuy'),
    text: (G) => `${STUDENT(G) ? '' : 'Your cousin is at the university, and it is his building. '}In July the plainclothes men come into the dormitory at night, over the wall, with clubs and chains, and throw students off balconies and set rooms on fire. In the morning the campus is all broken glass and the next five days are marches, the biggest since the revolution, students holding up a bloodied shirt. Then the counter-march, and the arrests, and the president you voted for says nothing you can use.`,
    context: 'On the night of 8-9 July 1999 (18 Tir) police and Ansar-e Hezbollah vigilantes raided Tehran University\'s dormitory after a protest over the closure of the reformist newspaper Salam. Six days of protests followed, the largest since 1979, and were ended by mass arrests.',
    choices: [
      {
        text: 'March.',
        tag: 'defiant',
        outcome: 'Your face is in a crowd photograph in a foreign newspaper. Your mother cuts it out and hides it.',
        effect: (p) => { p.setMem('irc_kuy', true); p.m -= 3; p.s += 2; p.addFlag('irc_tir_1999') },
      },
      {
        text: 'Go home to your parents until it is over.',
        tag: 'yielding',
        outcome: 'Two boys from the dormitory do not come back in September, and nobody says where they are.',
        effect: (p) => { p.setMem('irc_kuy', true); p.m -= 6; p.addFlag('irc_tir_1999') },
      },
    ],
    effect: null,
  },

  {
    id: 'irc_smog_days',
    phase: null,
    weight: 30,
    when: (G) => TEHRAN(G) && G.currentYear >= 2005 && G.currentYear <= 2022 && G.age >= 8 && once(G, 'irc_smog'),
    text: 'In December the inversion settles over the city and the Alborz, which is right there at the top of every street, disappears for a week. The radio announces the schools are closed for pollution, which the children call snow days with no snow. The air tastes of coins. You count how many days a year you can see the mountains and it is fewer than when you were small.',
    choices: null,
    effect: (p) => { p.setMem('irc_smog', true); p.h -= 1 },
  },

  {
    id: 'irc_chicken_2012',
    phase: null,
    weight: 220,
    when: (G) => IN_IR(G) && G.currentYear === 2012 && G.age >= 18 && once(G, 'irc_chicken'),
    text: 'Chicken triples in a summer, and the chief of police goes on television and asks the channels to stop showing people eating it, in case it gives the poor ideas. In October the rial loses a third of itself in a week. The money-changers on Ferdowsi Street hold up their fingers to say the rate and it is a different number by noon. The bazaar pulls its shutters down, and you go home and look at the price of things you already own.',
    choices: null,
    effect: (p) => { p.setMem('irc_chicken', true); p.m -= 4; p.wipeMoney(0.15) },
  },

  {
    id: 'irc_aban_1398',
    phase: null,
    weight: 400,
    when: (G) => IN_IR(G) && G.currentYear === 2019 && G.age >= 14 && once(G, 'irc_aban'),
    text: 'You wake on a Friday in November and petrol has gone up overnight by half, and more than that above the ration. By the afternoon people have left their cars across the highways. By the evening the internet is gone, the whole country, not slow but gone, and for a week you live in the Iran of your parents, with the radio and rumours and a neighbour who heard from a cousin. When it comes back on, the numbers come with it, and they are worse than the rumours.',
    context: 'Petrol prices were raised by 50 to 200 percent without warning on 15 November 2019. Protests spread to more than a hundred cities. The government shut down nearly all internet access for about a week. Amnesty International documented over 300 deaths; other estimates are far higher.',
    choices: null,
    effect: (p) => { p.setMem('irc_aban', true); p.m -= 8; p.addFlag('irc_aban_98') },
  },

  {
    id: 'irc_tehran_2025',
    phase: null,
    weight: 400,
    when: (G) => TEHRAN(G) && G.currentYear === 2025 && G.age >= 8 && once(G, 'irc_2025'),
    text: (G) => G.flags.has('irc_war_of_cities')
      ? 'In June the explosions are in Tehran again, and your body knows before you do: up and to the stairwell in your nightclothes, as in 1988. The roads north are solid with cars by the next afternoon. Your children ask whether to go and you hear yourself say what your mother said in 1988, the same words, as if she were saying them.'
      : 'In June the explosions are in Tehran, at night, a sound you have heard described and never heard. By the next afternoon the roads north to the Caspian are solid with cars, families with mattresses tied to the roof. The older people in the building are calm in a way that frightens you more than anything. They have done this before.',
    choices: null,
    effect: (p) => { p.setMem('irc_2025', true); p.m -= 6 },
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'irc_ft_mordad_1967',
    phase: null,
    weight: 300,
    when: (G) => IN_IR(G) && G.flags.has('irc_mordad_28') && G.currentYear === 1967 && once(G, 'irc_ft_mordad'),
    text: 'In March there are three lines in the newspaper: the former prime minister Mohammad Mosaddegh has died at Ahmadabad. No funeral is allowed. They say he is buried under the floor of his own dining room, in the village where they kept him for fourteen years. You were a child in the street in 1953. You find you remember the tanks better than you remember most of the years since.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_mordad', true); p.m -= 2 },
  },

  {
    id: 'irc_ft_qanat',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_qanat_turn') && G.age >= 45 && G.currentYear >= 2005 && once(G, 'irc_ft_qanat'),
    text: 'The qanat you sat beside at two in the morning is dry. The deep wells the agricultural company drilled took the water from under it, and the Zayandeh Rud through Isfahan is a bed of sand with the old bridges standing over nothing. Young men take selfies on the riverbed under the arches. You tell the young ones about the copper bowl, and they ask what the hole was for.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_qanat', true); p.m -= 3 },
  },

  {
    id: 'irc_ft_letters',
    phase: null,
    weight: 60,
    when: (G) => VILLAGE(G) && G.flags.has('irc_literacy_corps') && G.age >= 18 && G.age <= 60 && G.currentYear >= 1980 && G.currentYear <= 2000 && once(G, 'irc_ft_letters'),
    text: 'Women from the lanes bring you their letters to read, because you can, because a soldier in a uniform taught you the letters in a room by the mosque. Letters from sons at the front, from sons in Tehran, from a daughter married in Shiraz. You read them out slowly in the courtyard and the women watch your mouth. Some of them want you to read the same letter twice.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_letters', true); p.s += 2; p.karma += 2 },
  },

  {
    id: 'irc_ft_azeri',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_azeri_tongue') && G.hasGrandchildren && G.age >= 50 && once(G, 'irc_ft_az'),
    text: 'You sing your grandchild to sleep with the laylay your grandmother sang to you, in Turkish, and the child looks up at you puzzled and asks in Persian what the words mean. Persian is the language of their house; it has been since your child married. You translate the song. It does not rhyme any more, and it still works.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_az', true); p.m -= 1 },
  },

  {
    id: 'irc_ft_paykan',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_paykan') && G.currentYear >= 2005 && G.currentYear <= 2015 && once(G, 'irc_ft_paykan'),
    text: 'The last Paykan comes off the line at Iran Khodro and it is on the news, a whole generation of the country\'s family photographs parked in front of it. There are still thousands of them working as taxis, held together with wire. You get into one in the city and the door handle is the same, the smell of the seat is the same, and for a moment you are on the Chalus road with a watermelon at your feet.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_paykan', true); p.m += 2 },
  },

  {
    id: 'irc_ft_yaraneh',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_coupon_years') && G.currentYear >= 2011 && G.currentYear <= 2016 && once(G, 'irc_ft_yaraneh'),
    text: 'The government stops subsidising bread and petrol and pays every citizen instead, forty-five thousand five hundred tomans a head, into an account, on the same day each month. On that day the queues at the cash machines go round the block. You stand in one and think of the coupon book in the drawer with the birth certificates, and how you knew which number was for sugar.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_yaraneh', true); p.mo += 200 },
  },

  {
    id: 'irc_ft_brother_back',
    phase: null,
    weight: 80,
    when: (G) => IN_IR(G) && G.flags.has('irc_brother_front') && G.currentYear >= 1989 && G.currentYear <= 2005 && (G.siblings ?? []).some(s => s && s.alive !== false && s.gender === 'male') && once(G, 'irc_ft_brother'),
    text: 'Your brother came back. He works in a tyre shop now, and is married, and is kind to his children. When the television plays the war serials in the week of Sacred Defence he gets up and goes out onto the balcony and smokes until it is over. Once, at a wedding, you see him put his hands over his ears at the fireworks and then take them away quickly, before anybody sees.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_brother', true); p.m -= 2 },
  },

  {
    id: 'irc_ft_murals',
    phase: null,
    weight: 60,
    when: (G) => TEHRAN(G) && G.flags.has('irc_martyr_street') && G.currentYear >= 2008 && once(G, 'irc_ft_mural'),
    text: 'The boy on the bakery wall has faded to the colour of tea, the tulips gone pink. One spring a crew comes with a crane and paints over half the wall with an advertisement for a phone. The other half they leave. The street still has his name. Young people who live there now give it as their address without ever wondering who he was.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_mural', true); p.m -= 2 },
  },

  {
    id: 'irc_ft_red_alert',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_war_of_cities') && G.currentYear >= 1995 && G.currentYear <= 2024 && G.age >= 18 && once(G, 'irc_ft_red'),
    text: (G) => `On the last Tuesday of the year the boys in the street let off firecrackers, and you are at the stairwell door before you know you have moved. Your heart is going like a bird\'s. It is ${G.currentYear - 1988} years since the radio said the situation was red. Your body has kept the whole thing perfectly, and there is no way to tell it that it can stop.`,
    choices: null,
    effect: (p) => { p.setMem('irc_ft_red', true); p.m -= 2 },
  },

  {
    id: 'irc_ft_komiteh',
    phase: null,
    weight: 70,
    when: (G) => IN_IR(G) && G.flags.has('irc_komiteh_night') && childAged(G, 16, 24) && G.currentYear >= 2000 && once(G, 'irc_ft_komiteh'),
    text: (G) => `${(G.children ?? []).find(c => c && c.alive !== false && c.age >= 16 && c.age <= 24)?.gender === 'female' ? 'Your daughter goes' : 'Your son goes'} to a party on a Thursday night and promises to be back by one. At one you are sitting in the dark in the front room with the phone in your lap, and you know exactly what the room at the party looks like, the curtains and the music turned low and somebody watching the door. At twenty past, a key in the lock. You go to bed before anyone can see you were up.`,
    choices: null,
    effect: (p) => { p.setMem('irc_ft_komiteh', true); p.m += 1 },
  },

  {
    id: 'irc_ft_konkur',
    phase: null,
    weight: 60,
    when: (G) => IN_IR(G) && G.flags.has('irc_konkur_rank') && childAged(G, 17, 18) && once(G, 'irc_ft_konkur'),
    text: 'Now it is your child at the desk with the test books, and you are the one bringing tea and not speaking. The results come on a website rather than in the newspaper, and there is nothing to run your finger down. You still remember your own number. You have never told your child what it was.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_konkur', true); p.m -= 1 },
  },

  {
    id: 'irc_ft_tir_2009',
    phase: null,
    weight: 300,
    when: (G) => IN_IR(G) && G.flags.has('irc_tir_1999') && G.currentYear === 2009 && once(G, 'irc_ft_tir'),
    text: 'Ten years after the dormitory, the young are in the streets again with green ribbons, asking where their vote went, and at night from the roofs the old cry. You are ten years older and a little heavier. You go to the first march. You know what the plainclothes men look like before they move, and you find yourself telling a nineteen-year-old to stay away from the bridge.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_tir', true); p.m -= 3; p.s += 1 },
  },

  {
    id: 'irc_ft_jina_2022',
    phase: null,
    weight: 400,
    when: (G) => KURD(G) && (G.flags.has('irc_kurdistan_1979') || G.flags.has('irc_kurd_name')) && G.currentYear >= 2022 && G.currentYear <= 2023 && once(G, 'irc_ft_jina'),
    text: 'The girl who died in the morality police van was from Saqqez. Her name on her identity card was Mahsa; at home it was Jina. At her funeral the women of Saqqez took off their scarves and shouted jin, jiyan, azadî, woman, life, freedom, in Kurdish, and within a week Tehran was shouting it in Persian. You hear your language from a crowd on the television in the capital and you have to sit down.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_jina', true); p.m -= 4; p.s += 2 },
  },

  {
    id: 'irc_ft_rooftops_2022',
    phase: null,
    weight: 400,
    when: (G) => TEHRAN(G) && (G.flags.has('irc_rooftop_1978') || G.flags.has('irc_aban_98') || G.flags.has('irc_tir_1999')) && G.currentYear >= 2022 && G.currentYear <= 2023 && once(G, 'irc_ft_roof22'),
    text: (G) => G.flags.has('irc_rooftop_1978')
      ? 'At ten at night, from the dark roofs, the shouting starts, one building then the next, the way it did in 1978 when the power went off at eight. Different words now; the same roofs. You go up. You are the oldest person on yours. A girl from the fourth floor, who was not born when the century turned, holds your arm on the stairs.'
      : 'At ten at night, from the dark roofs, the shouting starts, building after building, women\'s voices high above the men\'s. The last time the city did this you were indoors with no internet, counting rumours. You go up. On the roof opposite someone is filming, the screen lighting a face, and then sensibly turns it off.',
    choices: null,
    effect: (p) => { p.setMem('irc_ft_roof22', true); p.m -= 2; p.s += 2 },
  },
]
