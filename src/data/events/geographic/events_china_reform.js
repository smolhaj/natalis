// events_china_reform.js — China after 1980, as it reached a household.
//
// A content review found a Chinese life lived mostly after 1980 meeting four
// Chinese events in it. The corpus is deep on 1949-76 (land reform, the Great
// Leap, the Cultural Revolution, the sent-down youth) and thin on the forty
// years that most living Chinese people actually remember, where what exists
// is written as types: the migrant, the only child, the 996 worker. Missing
// were the dated things everybody shares — the land divided by drawing lots,
// the first Spring Festival Gala, the sterilisation teams of 1983, a
// colleague jumping into the sea in 1992, buying your own flat from the work
// unit, the 175-metre line painted on a house, SARS and the boiled vinegar,
// 2:28 in the afternoon on 12 May 2008 — and the quiet ones: the agricultural
// tax abolished, the cooperative medical card, fifty-five yuan of pension, a
// QR code on a sweet-potato barrow.
//
// The roster draws most Chinese characters in Beijing, Shanghai, Chongqing,
// Wuhan and rural Sichuan, which is apt: Sichuan was the first province to
// take the commune sign down, the largest sender of migrant workers, and the
// epicentre in 2008; Chongqing holds most of the Three Gorges reservoir.
// Guards read the LIVE country and place. Tibetan content is written for the
// Tibetan counties of western Sichuan (Ngaba, Kardze), and rural Sichuan is
// the Tibetans' `homeOf`. The Zhuang are born in Guangxi (Nanning and the
// karst villages), the Hui in Ningxia (Yinchuan and the Xihaigu hills), the
// Uyghurs in Kashgar. Shenzhen is nobody's birthplace (weight 0): it is where
// the migrant goes. Until it existed the migrant went to Shanghai, which in
// the 1990s was the smaller of the two roads out of Sichuan and the only one
// out of Guangxi nobody took.
//
// Dates used, all checked:
//   1978-83      decollectivisation; Guanghan county, Sichuan, takes down its
//                commune sign in 1980; by end-1983 nearly all production teams
//                have contracted land to households.
//   1983         first CCTV Spring Festival Gala. The campaign against
//                spiritual pollution, autumn 1983; Teresa Teng ("by day old
//                Deng, by night little Deng").
//   1983         mass sterilisation campaign, over 20 million tubal ligations
//                and vasectomies that year; IUD after a first child,
//                sterilisation after a second.
//   Apr-Jun 1989 protests in many cities; in Chengdu, rioting 4-6 June; in
//                Shanghai, the train at Guangxin Road on 6 June.
//   Jan-Feb 1992 Deng's southern tour; "xiahai", going down into the sea.
//   1994-98      sale of work-unit flats to sitting tenants; State Council
//                Document 23 (1998) ends welfare housing allocation.
//   1994-2006    Three Gorges dam; impoundment to 135m June 2003, 156m 2006,
//                175m 2010; about 1.3 million people relocated; Fengjie old
//                town demolished.
//   2001 on      rural school consolidation; village schools closed.
//   Spring 2003  SARS: Beijing's mayor and health minister removed 20 April;
//                Xiaotangshan hospital built in about a week.
//   2003 on      New Cooperative Medical Scheme, about 10 yuan a person a year.
//   1 Jan 2006   agricultural tax abolished.
//   10 Mar 2008  protests in Lhasa; 16 Mar shootings at Ngaba after protests
//                led by Kirti monks; "patriotic education" in monasteries.
//   12 May 2008  Wenchuan earthquake, 14:28, about 69,000 dead; schools
//                collapsed; 19 May three minutes' silence at 14:28.
//   8 Aug 2008   Olympic opening ceremony, Beijing; odd-even driving.
//   2009         new rural pension scheme, basic 55 yuan a month.
//   Jan 2011     Beijing licence-plate lottery.
//   Jan 2014     WeChat red packets at Spring Festival.
//   1 Jan 2016   universal two-child policy.
//   Jan 2020     Wuhan locked down 23 January, two days before Spring
//                Festival; Li Wenliang dies 7 February.
//
// The new places:
//   15 Oct 1957  the Wuhan Yangtze River Bridge opens, the first across the
//                river: railway below, road above.
//   Jun 1989     in Wuhan, students sit on the Yangtze bridge and stop the
//                trains.
//   Jul-Aug 1998 the Yangtze flood; the water at Hankou above 29 metres;
//                soldiers on the dikes.
//   17 Feb 1979  the war with Vietnam, launched from Guangxi and Yunnan.
//   1983 on      the "diaozhuang" resettlement out of Xihaigu, the dry hills
//                of southern Ningxia, to the irrigated Yellow River plain.
//   1980s on     Guangxi's song fairs on the third of the third month,
//                revived after the Cultural Revolution.
//   10 Aug 1992  Shenzhen: a million people queue for share-subscription
//                forms; riot when they run out.
//   1980-2010    the "second line": a border permit to enter the Shenzhen
//                zone from the rest of China.
//   2010         fourteen suicides at Foxconn's Longhua plant; nets on the
//                dormitories.
//   2018-2020    mosque domes and Arabic signs removed in Ningxia; the
//                Weizhou mosque standoff, August 2018.

const once = (G, key) => !G.mem?.[key]
const IN_CN = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'China'
const PLACE = (G) => G.place?.id ?? null
const RURAL = (G) => IN_CN(G) && PLACE(G) === 'cn_rural'
const BEIJING = (G) => IN_CN(G) && PLACE(G) === 'cn_beijing'
const SHANGHAI = (G) => IN_CN(G) && PLACE(G) === 'cn_shanghai'
const CHONGQING = (G) => IN_CN(G) && PLACE(G) === 'cn_chongqing'
const WUHAN = (G) => IN_CN(G) && PLACE(G) === 'cn_wuhan'
const SHENZHEN = (G) => IN_CN(G) && PLACE(G) === 'cn_shenzhen'
const GUANGXI = (G) => IN_CN(G) && ['cn_nanning', 'cn_rural_guangxi'].includes(PLACE(G))
const NINGXIA = (G) => IN_CN(G) && ['cn_yinchuan', 'cn_rural_ningxia'].includes(PLACE(G))
const XIHAIGU = (G) => IN_CN(G) && PLACE(G) === 'cn_rural_ningxia'
// The Han and Hui provincial cities. Kashgar is left out: its reform era is
// the Uyghur module's, not the work unit's.
const CITY = (G) => IN_CN(G) && ['cn_beijing', 'cn_shanghai', 'cn_chongqing', 'cn_wuhan', 'cn_shenzhen', 'cn_nanning', 'cn_yinchuan'].includes(PLACE(G))
// Any countryside the national rural programmes reached on the same terms.
const ANY_RURAL = (G) => IN_CN(G) && ['cn_rural', 'cn_rural_guangxi', 'cn_rural_ningxia'].includes(PLACE(G))
// Where the cousin's factory is. Guangxi's road out goes to Guangdong; most of
// Sichuan's did too in the 1990s, and the rest went to the Yangtze delta.
// Read from the birth year so the text and the move agree.
const DAGONG_DEST = (birthYear, placeId) =>
  placeId === 'cn_rural_guangxi' || (birthYear ?? 0) % 3 !== 0 ? 'cn_shenzhen' : 'cn_shanghai'
const SICHUAN_SIDE = (G) => IN_CN(G) && ['cn_rural', 'cn_chongqing'].includes(PLACE(G))
const FEMALE = (G) => G.character?.gender === 'female'
const TIBETAN = (G) => G.character?.ethnicity === 'tibetan'
const livingKids = (G) => (G.children ?? []).filter(c => c && c.alive !== false)
const childAged = (G, lo, hi) => livingKids(G).some(c => (c.age ?? -1) >= lo && (c.age ?? -1) <= hi)
const sonAged = (G, lo, hi) => livingKids(G).some(c => c.gender === 'male' && (c.age ?? -1) >= lo && (c.age ?? -1) <= hi)

export const CHINA_REFORM_EVENTS = [

  // ── THE EIGHTIES ───────────────────────────────────────────────────────────

  {
    id: 'cnr_baochan',
    phase: null,
    weight: 220,
    claimsYears: { from: 1980, to: 1982 },
    when: (G) => RURAL(G) && G.currentYear >= 1980 && G.currentYear <= 1982 && G.age >= 8 && once(G, 'cnr_baochan'),
    text: 'The production team meets in the threshing yard and the team leader writes the fields on scraps of paper and puts them in a hat. Each household draws. Your family gets the strip by the irrigation ditch and a piece of the slope behind the temple, and from now on what grows on them, after the quota, is yours. That first harvest somebody from your family sleeps out in the field every night to guard it. In the spring the commune sign comes down off the gate, and nobody says anything about it at all.',
    context: 'The household responsibility system contracted collective land to individual families, who delivered a quota to the state and kept or sold the surplus. Begun illicitly in 1978, it spread through Sichuan and Anhui first and covered nearly all of rural China by 1983. Grain output rose by a third in six years.',
    choices: null,
    effect: (p) => { p.setMem('cnr_baochan', true); p.m += 5; p.mo += 150; p.addFlag('cnr_household_plot') },
  },

  {
    id: 'cnr_teresa_teng',
    phase: null,
    weight: 60,
    when: (G) => IN_CN(G) && G.age >= 14 && G.age <= 30 && G.currentYear >= 1980 && G.currentYear <= 1986 && once(G, 'cnr_teng'),
    text: 'Somebody has a cassette of Teresa Teng from Taiwan, copied from a copy, and you listen to it on a borrowed recorder with the volume down: a woman singing about the moon as if she were telling you a secret, in a voice that nobody on the radio has ever used. The old men call it decadent. People say, by day old Deng runs the country, by night little Deng does. In the autumn there is a campaign against spiritual pollution and the cassette goes under the mattress for a while.',
    choices: null,
    effect: (p) => { p.setMem('cnr_teng', true); p.m += 3 },
  },

  {
    id: 'cnr_chunwan',
    phase: null,
    weight: 40,
    when: (G) => IN_CN(G) && G.age >= 5 && G.currentYear >= 1983 && G.currentYear <= 1998 && once(G, 'cnr_chunwan'),
    text: 'On New Year\'s Eve the whole family sits in front of the television for the Gala: the crosstalk comedians, the singers in sequins, the skit about the country cousin coming to the city that everybody will quote all year. The dumplings are made on the table during the songs, everybody\'s hands floured. One has a coin in it. At midnight everything outside goes off like a war, and the neighbour\'s dog howls until morning.',
    choices: null,
    effect: (p) => { p.setMem('cnr_chunwan', true); p.m += 3 },
  },

  {
    id: 'cnr_sterilisation_1983',
    phase: null,
    weight: 350,
    when: (G) => RURAL(G) && FEMALE(G) && livingKids(G).length >= 2 && G.currentYear === 1983 && G.age <= 40 && once(G, 'cnr_tied'),
    text: 'The family planning team comes to the village in the winter with a loudspeaker on a tractor and a list. Every woman with two children is to go to the township clinic. They paint slogans on the walls of the houses where you can read them from the road. A woman two houses down has run to her mother\'s village with her belly showing, and the team takes her husband\'s pig. You go on a Tuesday with three other women from your lane, on the back of a trailer, and come back that evening in the same trailer, lying down.',
    context: 'In 1983 China carried out more than twenty million sterilisations, most of them on rural women with two or more children, in a campaign to enforce the one-child policy. Families who resisted were fined, had livestock or property seized, or had their houses damaged.',
    choices: null,
    effect: (p) => { p.setMem('cnr_tied', true); p.h -= 4; p.m -= 8; p.addFlag('cnr_tied_1983') },
  },

  {
    id: 'cnr_spring_1989',
    phase: null,
    weight: 300,
    when: (G) => IN_CN(G) && !BEIJING(G) && G.currentYear === 1989 && G.age >= 14 && once(G, 'cnr_1989'),
    text: (G) => {
      if (SHANGHAI(G)) return 'All May the students march down Nanjing Road with banners and the workers watch from the pavement and some of them join. After the news from Beijing on the fourth there are barricades of buses at the crossroads, and on the sixth a train runs into the people sitting on the tracks at Guangxin Road and they set it on fire. The mayor is on television asking everyone to go to work. By the end of the week, everyone goes to work.'
      if (CHONGQING(G)) return 'In May there are students in front of the Liberation Monument with banners, and your colleagues go at lunch to look. Then the fourth of June, and in Chengdu, along the river, they say the police station burned and the hotel, and people were shot on Renmin Road. You hear it on the bus, from a man whose cousin was there. On television there is only a soldier being given a watermelon by a grateful old woman.'
      if (WUHAN(G)) return 'In May the students march from Luojia Hill across the city with banners, and people on the pavements hand them water. After the fourth of June they go out onto the Yangtze bridge and sit down on the rails, and the trains from Beijing to Guangzhou stop on either bank. For two days nothing crosses. Then the bridge is cleared, and at work nobody says what they did that week, and nobody asks.'
      if (RURAL(G)) return 'In May the radio talks about students in Beijing and the teacher says nothing about it, which is how you know it is important. In June a man back from Chengdu says the city burned for three nights and soldiers were on Renmin Road. An old man tells him to keep his voice down, here, in the village, where nobody could possibly be listening.'
      return 'In May the radio talks about students in Beijing and nobody at work says anything about it, which is how you know it is important. After the fourth of June the television shows soldiers being thanked by old women, and a man back from the provincial capital says there were students in the square there too. Somebody tells him to keep his voice down, and he does, and so does everyone, for thirty years.'
    },
    choices: null,
    effect: (p) => { p.setMem('cnr_1989', true); p.m -= 4; p.addFlag('cnr_spring_1989') },
  },

  // ── THE NINETIES ───────────────────────────────────────────────────────────

  {
    id: 'cnr_southern_tour',
    phase: null,
    weight: 250,
    when: (G) => CITY(G) && !SHENZHEN(G) && G.currentYear >= 1992 && G.currentYear <= 1993 && G.age >= 22 && G.age <= 45 && once(G, 'cnr_xiahai'),
    text: 'The old man has been to Shenzhen and said that it does not matter whether a cat is black or white, and now everyone in your work unit is talking about going down into the sea. A man from the next office hands in his notice, unthinkable last year, and goes south to sell telephones. An older colleague says the iron rice bowl is iron for a reason. Your friend says it has rusted through and nobody has noticed.',
    choices: [
      {
        text: 'Jump into the sea. Leave the unit.',
        tag: 'defiant',
        outcome: 'You rent a counter in a market and sell pagers. Your mother tells the neighbours you are on secondment.',
        effect: (p) => { p.setMem('cnr_xiahai', true); p.m += 2; p.mo -= 500; p.addFlag('cnr_xiahai') },
      },
      {
        text: 'Stay. Somebody has to.',
        tag: 'yielding',
        outcome: 'You keep your desk, your housing allocation and your place in the canteen queue.',
        effect: (p) => { p.setMem('cnr_xiahai', true); p.addFlag('cnr_stayed_unit') },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_danwei_flat',
    phase: null,
    weight: 120,
    when: (G) => CITY(G) && G.age >= 28 && G.age <= 62 && G.currentYear >= 1994 && G.currentYear <= 2000 && once(G, 'cnr_flat'),
    text: 'The work unit is selling the flats to the people who live in them. Yours is two rooms on the fourth floor of a grey block with a shared kitchen on the landing, and you have lived in it eleven years, and for a price that is a few years of wages, discounted for your years of service, it will be yours. It has never occurred to you that a flat is a thing that belongs to someone.',
    choices: [
      {
        text: 'Buy it. Borrow from everyone.',
        outcome: 'The deed is a red booklet. You keep it in a biscuit tin with the household register.',
        effect: (p) => { p.setMem('cnr_flat', true); p.mo -= 3000; p.m += 3; p.addFlag('cnr_bought_danwei_flat'); p.grantHome('studio_flat', 0.8) },
      },
      {
        text: 'Wait. It is the unit\'s flat; it always has been.',
        outcome: 'The next year the rent goes up. The year after, the price does.',
        effect: (p) => { p.setMem('cnr_flat', true); p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_dagong',
    phase: null,
    weight: 80,
    when: (G) => (RURAL(G) || PLACE(G) === 'cn_rural_guangxi') && G.age >= 17 && G.age <= 28 && G.currentYear >= 1990 && G.currentYear <= 2012 && once(G, 'cnr_dagong'),
    text: (G) => DAGONG_DEST(G.character?.birthYear, PLACE(G)) === 'cn_shenzhen'
      ? 'Half the young people in the village are already gone. They come back at New Year in new jeans with mobile phones and go again after the fifteenth. A cousin can get you on at a factory in Shenzhen putting together telephones, dormitory included, eight to a room. The fields can be done by whoever stays.'
      : 'Half the young people in the village are already gone. They come back at New Year in new jeans with mobile phones and go again after the fifteenth. A cousin can get you on at a factory in Shanghai making electric fans, dormitory included, eight to a room. The fields can be done by whoever stays.',
    choices: [
      {
        text: 'Go out to work.',
        outcome: (G) => SHENZHEN(G)
          ? (G.currentYear <= 2009
            ? 'At the checkpoint at the edge of the zone a guard looks at the border permit the factory arranged and waves the bus through. The dormitory has a bunk with your name taped on it, and a girl from Hunan in the bunk above who cries for a week and then does not.'
            : 'The bus takes a day and a night. The dormitory has a bunk with your name taped on it, and a girl from Hunan in the bunk above who cries for a week and then does not.')
          : 'The bus takes a day and a night. The dormitory has a bunk with your name taped on it, and a girl from Hunan in the bunk above who cries for a week and then does not.',
        effect: (p) => {
          p.setMem('cnr_dagong', true); p.m -= 3; p.mo += 1200; p.addFlag('cnr_dagong')
          const st = p._state
          const here = st?.currentPlace?.id ?? st?.currentPlace
          p.relocate(DAGONG_DEST(st?.character?.birthYear, here), 'informal')
        },
      },
      {
        text: 'Stay with the land.',
        outcome: 'The village is quiet, and old, and in the evening you are the youngest person at the card table.',
        effect: (p) => { p.setMem('cnr_dagong', true); p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_three_gorges',
    phase: null,
    weight: 120,
    when: (G) => CHONGQING(G) && G.age >= 10 && G.currentYear >= 1997 && G.currentYear <= 2008 && once(G, 'cnr_gorges'),
    text: 'Your aunt\'s family down the river in Fengjie have a red line painted on the side of their house with 175 written beside it, which is where the water will come to. The whole old town is below the line. Men are taking it apart brick by brick to sell the bricks. They are being moved up the hill to a new town of white tiles, and your aunt comes to stay with you for a month while it is built, and sits by your window in the evenings looking at the river.',
    context: 'The Three Gorges Dam raised the Yangtze to 175 metres above sea level behind it in stages from 2003 to 2010. About 1.3 million people were relocated, most of them in Chongqing municipality; old county towns including Fengjie, Wushan and Fuling were demolished and rebuilt higher up.',
    choices: null,
    effect: (p) => { p.setMem('cnr_gorges', true); p.m -= 3; p.addFlag('cnr_three_gorges') },
  },

  // ── THE TWO THOUSANDS ─────────────────────────────────────────────────────

  {
    id: 'cnr_sars_2003',
    phase: null,
    weight: 300,
    when: (G) => (BEIJING(G) || SHANGHAI(G)) && G.currentYear === 2003 && G.age >= 8 && once(G, 'cnr_sars'),
    text: (G) => BEIJING(G)
      ? 'For weeks the television says there are a few cases, and then in April the mayor and the minister are gone in one day and the number is in the hundreds. The city empties. The schools close; the universities lock their gates; a hospital is built at Xiaotangshan in a week. Everybody has a thermometer gun pointed at their forehead going into any building. The woman next door boils vinegar on her stove until the whole landing smells like a pickle jar, because someone said.'
      : 'Beijing is closed in on itself with the sickness and Shanghai is holding its breath. At the station and the office and the entrance to the housing compound a woman in a mask points a thermometer at your forehead. The woman next door boils vinegar on her stove until the whole landing smells like a pickle jar, because someone said, and hangs a bag of something from the Chinese pharmacy over the door.',
    choices: null,
    effect: (p) => { p.setMem('cnr_sars', true); p.m -= 3; p.addFlag('cnr_sars') },
  },

  {
    id: 'cnr_school_merger',
    phase: null,
    weight: 80,
    when: (G) => ANY_RURAL(G) && G.age >= 7 && G.age <= 10 && G.currentYear >= 2001 && G.currentYear <= 2014 && once(G, 'cnr_merge'),
    text: 'The village school closes; there are too few children left to fill it. Now you board at the township school, an hour and a half by road, from Sunday night to Friday afternoon, twelve to a room, with a jar of pickled vegetables from your grandmother to eat with the canteen rice. The little ones cry on Sunday nights. By the second term you only cry on the bus.',
    choices: null,
    effect: (p) => { p.setMem('cnr_merge', true); p.m -= 3; p.e += 1 },
  },

  {
    id: 'cnr_ncms',
    phase: null,
    weight: 50,
    when: (G) => ANY_RURAL(G) && G.age >= 30 && G.currentYear >= 2004 && G.currentYear <= 2015 && once(G, 'cnr_ncms'),
    text: 'A man from the township comes round collecting ten yuan a head for the new cooperative medical scheme and gives each household a little green book. Nobody believes in it. Then your neighbour\'s father has his gallbladder out in the county hospital and the scheme pays back nearly half, and the next year everybody pays the ten yuan before the man has finished knocking.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ncms', true); p.h += 1; p.mo -= 5 },
  },

  {
    id: 'cnr_tibet_2008',
    phase: null,
    weight: 350,
    when: (G) => TIBETAN(G) && RURAL(G) && G.currentYear === 2008 && G.age >= 12 && once(G, 'cnr_tibet'),
    text: 'In March the news from Lhasa comes on phones, and then it is here: the monks from the monastery walk down into the town with a banner, and on the Sunday there is shooting near the market, and afterwards bodies that the families bring to the monastery so that someone will photograph them. Then the soldiers. The roads are closed. Work teams come to the monastery to teach the monks to love the country, and to make them denounce the photograph of the old man in red robes that is in every house, including yours.',
    context: 'Protests that began in Lhasa on 10 March 2008 spread across the Tibetan areas of Sichuan, Qinghai and Gansu. At Ngaba (Aba) on 16 March security forces fired on protesters led by monks of Kirti monastery. Patriotic education campaigns in monasteries followed; from 2009 Ngaba was the centre of a wave of self-immolations.',
    choices: [
      {
        text: 'Take the photograph down, and keep it in the cupboard.',
        tag: 'yielding',
        outcome: 'You take it out at night. Your grandmother puts butter lamps in front of the cupboard door.',
        effect: (p) => { p.setMem('cnr_tibet', true); p.m -= 6; p.addFlag('cnr_tibet_2008') },
      },
      {
        text: 'Leave it on the wall.',
        tag: 'defiant',
        outcome: 'The work team writes your household down. Nothing happens, for now, which is a kind of thing happening.',
        effect: (p) => { p.setMem('cnr_tibet', true); p.m -= 4; p.s += 2; p.addFlag('cnr_tibet_2008') },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_wenchuan',
    phase: null,
    weight: 500,
    when: (G) => IN_CN(G) && G.currentYear === 2008 && G.age >= 6 && once(G, 'cnr_wenchuan'),
    text: (G) => {
      if (RURAL(G)) return 'At 2:28 on a Monday afternoon the ground does not shake so much as heave, as if something underneath has turned over in its sleep, and the house cracks across the middle and the hill opposite comes down into the valley in one piece. In the township the school has fallen in on the afternoon classes. The office building next to it is standing. For three days parents dig with their hands and the soldiers walk in over the mountain because the roads are gone.'
      if (CHONGQING(G)) return 'At 2:28 in the afternoon the tower you are in sways and the water in the cooler slops over, and everyone goes down twenty flights of stairs and stands in the road looking up. It is not here; it is in Sichuan, in Wenchuan, Beichuan. By evening the television shows a school in Dujiangyan that has fallen in on its children while the building next to it stands. You give blood. The queue at the blood station is a kilometre long.'
      return 'At 2:28 on the nineteenth of May everything stops: buses stop in the road and sound their horns, the trains, the cranes, the people on the pavement stand with their heads down for three minutes for the dead of Sichuan, seventy thousand of them. A week ago you had never heard of Wenchuan. The television has shown nothing else since: a school that fell on its children, the office building next to it standing.'
    },
    context: 'The Wenchuan earthquake of 12 May 2008, magnitude 7.9, killed about 69,000 people in Sichuan. Thousands of children died in collapsed schools, which parents blamed on corrupt "tofu-dreg" construction; several who campaigned about it were detained. A national three-minute silence was held at 14:28 on 19 May.',
    choices: null,
    effect: (p) => { p.setMem('cnr_wenchuan', true); p.m -= 6; p.addFlag('cnr_wenchuan') },
  },

  {
    id: 'cnr_olympics',
    phase: null,
    weight: 250,
    when: (G) => BEIJING(G) && G.currentYear === 2008 && G.age >= 6 && once(G, 'cnr_oly'),
    text: 'For a year the city has been scrubbed: cars driven on odd and even days, factories shut, the old men told not to wear vests in the street, the hutong walls painted grey. On the eighth of the eighth at eight in the evening you watch the opening on the television with the window open, so that you can hear the fireworks go off outside a fraction before you see them on the screen. A footprint of fire walks across the city to the stadium.',
    choices: null,
    effect: (p) => { p.setMem('cnr_oly', true); p.m += 5 },
  },

  {
    id: 'cnr_bride_flat',
    phase: null,
    weight: 80,
    when: (G) => CITY(G) && sonAged(G, 24, 32) && G.currentYear >= 2005 && G.currentYear <= 2022 && once(G, 'cnr_bride_flat'),
    text: 'Your son has a girlfriend and her mother has said, kindly but quite clearly, that there is no wedding without a flat. Everybody knows this. The flat costs twenty years of your salary, and the down payment comes out of six wallets, as everybody says — two parents and four grandparents, or whoever is left of them. You go with him to the sales office, where a girl in a red suit shows you a model of a tower that does not exist yet, in a district that was fields when you were his age.',
    choices: null,
    effect: (p) => { p.setMem('cnr_bride_flat', true); p.mo -= 8000; p.m -= 2 },
  },

  {
    id: 'cnr_rural_pension',
    phase: null,
    weight: 60,
    when: (G) => ANY_RURAL(G) && G.age >= 60 && G.currentYear >= 2010 && G.currentYear <= 2022 && once(G, 'cnr_pension'),
    text: 'Fifty-five yuan a month comes into your bank card from the government, for being old. Nobody in your family has ever been paid for being anything. It does not buy much — oil, salt, a little meat on the first of the month — but you go to the township to look at the balance on the machine, and you tell the other old people at the card table how much yours is, though it is the same as theirs.',
    choices: null,
    effect: (p) => { p.setMem('cnr_pension', true); p.m += 3; p.mo += 100 },
  },

  {
    id: 'cnr_plate_lottery',
    phase: null,
    weight: 40,
    when: (G) => BEIJING(G) && G.age >= 25 && G.age <= 55 && G.currentYear >= 2011 && G.currentYear <= 2022 && once(G, 'cnr_plate'),
    text: 'You can afford a car now; that is not the problem. To drive one in Beijing you need a licence plate, and the plates are given by lottery, every two months, and the odds are worse than a hundred to one and get worse every year. You enter. You do not win. You enter. A colleague has been entering for six years and talks about it the way people talk about the weather, without hope and without anger.',
    choices: null,
    effect: (p) => { p.setMem('cnr_plate', true); p.m -= 1 },
  },

  {
    id: 'cnr_square_dance',
    phase: null,
    weight: 40,
    when: (G) => CITY(G) && FEMALE(G) && G.age >= 48 && G.age <= 75 && G.currentYear >= 2005 && once(G, 'cnr_dance'),
    text: 'At seven every evening, in the square by the supermarket, forty women of your age line up in rows behind a speaker on a trolley and dance: a pop song, a revolutionary song, a song from a film, the same steps for each. The young people in the flats complain about the noise. You did not dance when you were young, there was no time and no music. You have the best fan routine in the row, and a rival.',
    choices: null,
    effect: (p) => { p.setMem('cnr_dance', true); p.m += 4; p.h += 1 },
  },

  {
    id: 'cnr_hongbao',
    phase: null,
    weight: 40,
    when: (G) => IN_CN(G) && G.age >= 40 && G.currentYear >= 2014 && once(G, 'cnr_hongbao'),
    text: 'At New Year the family group on WeChat is all red envelopes: somebody\'s son puts in two hundred yuan split into twenty random packets and everybody grabs at once, and a cousin gets 0.03 and complains for an hour. Your mother has learned to send one. She does it with one finger, slowly, with her reading glasses on, and sends eight yuan eighty-eight for luck, and the whole group fills with thumbs.',
    choices: null,
    effect: (p) => { p.setMem('cnr_hongbao', true); p.m += 2 },
  },

  {
    id: 'cnr_qr_barrow',
    phase: null,
    weight: 30,
    when: (G) => IN_CN(G) && G.age >= 30 && G.currentYear >= 2016 && once(G, 'cnr_qr'),
    text: 'The old man who sells roast sweet potatoes from an oil drum on a tricycle outside the metro has a laminated QR code tied to the handlebars with a shoelace. You scan it and the phone chimes and he does not look up. You realise you have not had a coin in your pocket for a year. Old women still keep cash in a handkerchief, and the shops have started to look at them as if they were foreign.',
    choices: null,
    effect: (p) => { p.setMem('cnr_qr', true) },
  },

  {
    id: 'cnr_spring_2020',
    phase: null,
    weight: 400,
    when: (G) => IN_CN(G) && G.currentYear === 2020 && G.age >= 8 && !G.flags.has('cnr_sars') && once(G, 'cnr_2020'),
    text: (G) => WUHAN(G)
      ? 'At ten in the morning on the twenty-third of January, two days before Spring Festival, they close the city: the trains, the airport, the bridges, the expressways. Then the housing compounds. A volunteer leaves vegetables at the gate and you go down for them in a mask, one person a household. At night people open their windows and shout to each other across the dark, Wuhan, jiayou. In February the young doctor from the Central Hospital, who was made to sign a confession for warning his colleagues, dies of it in his own hospital.'
      : 'Two days before Spring Festival they close Wuhan. Nobody visits anyone. The New Year dinner is the people already under your roof, and the Gala plays to a family that keeps checking its phones. In February a young doctor who had been made to sign a confession for warning his colleagues dies of it, and for one night the whole of WeChat is a wall of candles and his words, before it is deleted.',
    choices: null,
    effect: (p) => { p.setMem('cnr_2020', true); p.m -= 5 },
  },

  // ── THE OTHER CHINAS: WUHAN, SHENZHEN, GUANGXI, NINGXIA ───────────────────

  {
    id: 'cnr_wuhan_bridge_1957',
    phase: null,
    weight: 250,
    when: (G) => WUHAN(G) && G.currentYear === 1957 && G.age >= 5 && once(G, 'cnr_bridge57'),
    text: 'All your life the river has been a ferry: the queue on the steps at Hankou, the boat swinging out into brown water a kilometre wide, Wuchang coming slowly up on the other side. In October the bridge opens. Trains underneath, buses and bicycles and people on top. Your father walks you across it on the first Sunday with half the city, and halfway over he stops and looks down at the water as if it owes him something.',
    context: 'The Wuhan Yangtze River Bridge, built with Soviet engineering help and opened on 15 October 1957, was the first bridge across the Yangtze. Its double deck carried the Beijing-Guangzhou railway below and a road above, joining Hankou and Hanyang to Wuchang.',
    choices: null,
    effect: (p) => { p.setMem('cnr_bridge57', true); p.m += 3 },
  },

  {
    id: 'cnr_wuhan_flood_1998',
    phase: null,
    weight: 250,
    when: (G) => WUHAN(G) && G.currentYear === 1998 && G.age >= 8 && once(G, 'cnr_flood98'),
    text: 'All summer the river rises, and the gauge at Hankou is read out on the radio every evening like a temperature. In August it is higher than the streets behind the embankment. Soldiers sleep on the dike in their uniforms between shifts of sandbags, and the neighbourhood committee sends everyone who can lift a bag. You stand on the floodwall at Longwangmiao at night and the water is right there, at your feet, wide and quiet, higher than the roofs behind you.',
    context: 'The Yangtze flood of 1998 killed more than 3,000 people across China. At Hankou the river peaked at over 29 metres in August, above most of the city behind its embankments; hundreds of thousands of soldiers and civilians held the dikes, and Wuhan itself did not flood.',
    choices: null,
    effect: (p) => { p.setMem('cnr_flood98', true); p.m -= 2; p.karma += 1 },
  },

  {
    id: 'cnr_shenzhen_shares_1992',
    phase: null,
    weight: 250,
    when: (G) => SHENZHEN(G) && G.currentYear === 1992 && G.age >= 18 && once(G, 'cnr_shares92'),
    text: 'The city says it will sell forms for buying shares, and everyone has heard what shares did last year. For three days the queues go round the blocks outside the banks, a million people, some of them paid by bosses to hold places, with bags of identity cards borrowed from whole villages. You sleep on the pavement with a newspaper under you. On the second morning the forms are gone, and the word goes down the queue that they were sold out of the back door, and by night people are throwing stones at the government building.',
    context: 'In August 1992 Shenzhen offered five million subscription forms for new share issues; over a million people queued, many with batches of borrowed identity cards. When the forms ran out within a day amid reports of officials keeping them for insiders, the protests of 10 August turned into a riot.',
    choices: null,
    effect: (p) => { p.setMem('cnr_shares92', true); p.m -= 2 },
  },

  {
    id: 'cnr_foxconn_nets_2010',
    phase: null,
    weight: 200,
    when: (G) => SHENZHEN(G) && G.currentYear === 2010 && G.age >= 17 && G.age <= 35 && ['informal', 'working_class'].includes(G.neighborhoodTier) && once(G, 'cnr_nets'),
    text: 'In the spring a boy from the line jumps from the roof of a dormitory at Longhua, and then another, and by May there have been more than ten. The company puts up nets, yellow nets all round the buildings at the third floor, and a monk comes to chant, and everyone is made to sign a paper promising not to kill themselves. In June the wage goes up. People send the photograph of the nets to each other and do not write anything with it.',
    context: 'Fourteen young workers died by suicide at Foxconn plants in 2010, most of them at the Longhua campus in Shenzhen, which assembled products for Apple and others. The company installed nets around its dormitories, asked workers to sign no-suicide pledges, and raised basic wages.',
    choices: null,
    effect: (p) => { p.setMem('cnr_nets', true); p.m -= 4 },
  },

  {
    id: 'cnr_guangxi_1979',
    phase: null,
    weight: 250,
    when: (G) => GUANGXI(G) && G.currentYear === 1979 && G.age >= 8 && once(G, 'cnr_gx79'),
    text: 'In February the trucks go south on the road all night with their lights off, and the trains are full of soldiers who wave from the doors. The radio calls it a counterattack in self-defence. Three weeks later it is over and the trains come back with the wounded, and the hospitals in Nanning put beds in the corridors. A boy you were at school with went in the first week. His mother is given a certificate in a frame.',
    context: 'China invaded northern Vietnam on 17 February 1979 from Guangxi and Yunnan, calling it a "self-defensive counterattack". The fighting lasted about a month. Chinese losses are estimated at over twenty thousand dead; border clashes continued through the 1980s.',
    choices: null,
    effect: (p) => { p.setMem('cnr_gx79', true); p.m -= 4 },
  },

  {
    id: 'cnr_zhuang_song_fair',
    phase: null,
    weight: 70,
    when: (G) => GUANGXI(G) && G.character?.ethnicity === 'zhuang' && G.age >= 14 && G.age <= 24 && G.currentYear >= 1982 && once(G, 'cnr_gexu'),
    text: (G) => `On the third day of the third month the young people from the villages go up to the slope by the river and sing at each other, a line from the girls, an answer from the boys, in Zhuang, making it up, everybody laughing when an answer is too slow. Your grandmother says that when she was young this is how people were married. Then for years it was not allowed. Now the township puts up a banner over it. ${G.character?.gender === 'female' ? 'Your aunt has sewn you an embroidered ball, and a boy from across the river is singing in your direction.' : 'A girl from across the river throws an embroidered ball, and it lands at your feet.'}`,
    choices: [
      {
        text: 'Sing back.',
        outcome: 'Your answer is a good one; the whole slope hears it. Somebody is waiting at the bottom of the path afterwards.',
        effect: (p) => { p.setMem('cnr_gexu', true); p.m += 4; p.s += 2 },
      },
      {
        text: 'Laugh, and say nothing.',
        outcome: 'The singing goes on without you. Everybody saw.',
        effect: (p) => { p.setMem('cnr_gexu', true); p.m += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_xihaigu_cellar',
    phase: null,
    weight: 80,
    when: (G) => XIHAIGU(G) && G.age >= 6 && G.age <= 13 && G.currentYear >= 1950 && G.currentYear <= 2005 && once(G, 'cnr_cellar'),
    text: 'There is no river and no well. Under the yard is the water cellar, a bottle-shaped hole in the loess plastered with clay, and when it rains every gutter and footpath is turned to run into it. In a dry summer it is half a metre of green water by August, and your mother measures it out by the ladle: for cooking, for the donkey, a little for washing your face, none for your feet. At school a teacher from the plain says that once a foreigner called this the least fit place on earth for people to live.',
    context: 'Xihaigu, the dry loess hills of southern Ningxia, mostly Hui, depended on rain-fed cellars for drinking water into the 2000s. Chinese accounts repeat that a United Nations food agency judged it unfit for human habitation in the 1970s; from 1983 the government moved hundreds of thousands of its people to irrigated land on the Yellow River plain.',
    choices: null,
    effect: (p) => { p.setMem('cnr_cellar', true); p.h -= 1 },
  },

  {
    id: 'cnr_xihaigu_resettlement',
    phase: null,
    weight: 90,
    when: (G) => XIHAIGU(G) && G.age >= 20 && G.age <= 50 && G.currentYear >= 1985 && G.currentYear <= 2015 && once(G, 'cnr_diaozhuang'),
    text: 'The township says the village is to move down to the plain by the Yellow River, where there is water in canals and a new settlement of brick houses in rows, each the same, two rooms and a yard. The old people do not want to leave the graves. The young ones have already been to see it. The trucks will come after the harvest.',
    choices: [
      {
        text: 'Go down to the plain.',
        outcome: 'The house has a tap. The first night your mother turns it on and off, on and off, and then sits in the yard and cries, and will not say whether it is for the tap or the graves.',
        effect: (p) => { p.setMem('cnr_diaozhuang', true); p.m += 2; p.mo += 300; p.relocate('cn_yinchuan', 'informal') },
      },
      {
        text: 'Stay with the graves.',
        tag: 'defiant',
        outcome: 'Half the village goes. In the evening you can count the lit windows on the hill, and every year there are fewer.',
        effect: (p) => { p.setMem('cnr_diaozhuang', true); p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_ningxia_domes',
    phase: null,
    weight: 120,
    when: (G) => NINGXIA(G) && G.character?.ethnicity === 'hui_chinese' && G.age >= 16 && G.currentYear >= 2018 && G.currentYear <= 2021 && once(G, 'cnr_domes'),
    text: 'The scaffolding goes up round the mosque one spring and when it comes down the green dome is gone and there is a roof of grey tiles in its place, like a temple, with a red flag on it. On the noodle shop the Arabic word for halal is painted out and the Chinese left. In Weizhou, people say, the whole county stood in front of their mosque for three days so that it would not be done, and it was done anyway, later, more quietly. The imam reads the sermon he is sent.',
    context: 'From 2018 authorities in Ningxia and other Hui areas removed domes, minarets and Arabic script from mosques and shops as part of a campaign to "sinicise" religion. In August 2018 thousands of Hui gathered for days outside the new Grand Mosque at Weizhou, Ningxia, to prevent its demolition; it was later altered.',
    choices: null,
    effect: (p) => { p.setMem('cnr_domes', true); p.m -= 5 },
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'cnr_ft_tax_2006',
    phase: null,
    weight: 300,
    when: (G) => RURAL(G) && G.flags.has('cnr_household_plot') && G.currentYear === 2006 && once(G, 'cnr_ft_tax'),
    text: 'From the first of January there is no agricultural tax. Not lower; none. The radio says it is the end of a tax that is two thousand six hundred years old. You think of the lots in the hat in the threshing yard, the strip by the ditch, the quota delivered by handcart every autumn since, and you go out to the field in the cold and stand in it for a while for no reason you could explain.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_tax', true); p.m += 4; p.mo += 60 },
  },

  {
    id: 'cnr_ft_two_child',
    phase: null,
    weight: 300,
    when: (G) => IN_CN(G) && G.flags.has('cnr_tied_1983') && G.currentYear === 2016 && once(G, 'cnr_ft_two'),
    text: 'On the news, from the first of January, every couple may have two children. The young women on the television are asked whether they want a second and most of them laugh and say who could afford it. The slogan from 1983 is still faintly on the wall of the house at the end of the lane, under the whitewash, if you know where to look. You know where to look.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_two', true); p.m -= 4 },
  },

  {
    id: 'cnr_ft_1989_silence',
    phase: null,
    weight: 250,
    when: (G) => IN_CN(G) && G.flags.has('cnr_spring_1989') && G.currentYear === 2019 && once(G, 'cnr_ft_1989'),
    text: 'Thirty years. The date comes and goes. On the internet the young write the thirty-fifth of May when they mean the fourth of June, and then even that is blocked. A friend\'s son, who is twenty-five and works in software, has never heard of it, and when you begin to tell him at dinner you hear yourself stop, and change the subject to his salary, and he does not notice.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_1989', true); p.m -= 3 },
  },

  {
    id: 'cnr_ft_xiahai',
    phase: null,
    weight: 70,
    when: (G) => IN_CN(G) && (G.flags.has('cnr_xiahai') || G.flags.has('cnr_stayed_unit')) && G.currentYear >= 2002 && G.currentYear <= 2012 && once(G, 'cnr_ft_xiahai'),
    text: (G) => G.flags.has('cnr_xiahai')
      ? 'Ten years after the sea. The pagers became mobile phones, the counter became a shop, then two shops, then one again after a business partner went south with the stock. You have more money than anyone in your old unit and none of their pension. At a reunion your old section chief, retired on full pay, asks you how business is with a look you cannot quite read.'
      : 'Ten years after everybody jumped into the sea, half of them have drowned and half of them drive cars. The unit was restructured; you kept your post through two rounds of lay-offs that took colleagues on either side of you. At a reunion the man who left to sell telephones arrives in a black Audi. He asks you about your pension with a look you cannot quite read.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_xiahai', true); p.m -= 1 },
  },

  {
    id: 'cnr_ft_chaiqian',
    phase: null,
    weight: 80,
    when: (G) => CITY(G) && G.flags.has('cnr_bought_danwei_flat') && G.currentYear >= 2008 && G.currentYear <= 2022 && once(G, 'cnr_ft_chai'),
    text: 'One morning there is a character painted on the wall of your block in a red circle: chai, demolish. The whole district is to come down for towers. The compensation is by square metre and the square metres of your two rooms, bought from the unit for a few years\' wages, are now worth more than your whole working life. Some neighbours hold out for more. You sign. You take a photograph of the landing kitchen before you go.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_chai', true); p.mo += 20000; p.m += 2 },
  },

  {
    id: 'cnr_ft_chunyun',
    phase: null,
    weight: 70,
    when: (G) => CITY(G) && G.flags.has('cnr_dagong') && G.currentYear >= 1996 && G.currentYear <= 2015 && once(G, 'cnr_ft_chunyun'),
    text: 'Going home for New Year: two nights in the queue at the station for a ticket, then thirty hours on the train standing, with a bag of presents between your feet and a stranger asleep on your shoulder. People sleep under the seats and in the luggage racks. The toilet is full of people. When you get to the village a chicken has been killed for you and nobody will let you help with anything, and in eleven days you do it again in reverse.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_chunyun', true); p.m += 2; p.mo -= 150 },
  },

  {
    id: 'cnr_ft_left_child',
    phase: null,
    weight: 80,
    when: (G) => CITY(G) && G.flags.has('cnr_dagong') && childAged(G, 3, 14) && G.currentYear >= 1998 && once(G, 'cnr_ft_left'),
    text: 'Your child lives with the grandparents in the village and goes to school there, because there is no school here for children without a city registration. You call on Sunday evenings. The grandmother puts the child on and the child says yes and no and then wants to go and play. At New Year the child hides behind the grandmother\'s legs for a day before coming out, and on the last morning will not let go of your sleeve.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_left', true); p.m -= 6 },
  },

  {
    id: 'cnr_ft_return_village',
    phase: null,
    weight: 70,
    when: (G) => CITY(G) && G.flags.has('cnr_dagong') && G.age >= 45 && G.currentYear >= 2008 && once(G, 'cnr_ft_return'),
    text: 'Your knees, the factory moving inland, your parents getting old: the reasons arrive together. You have saved for twenty years for a house in the village and now you are going home to live in it, three storeys of white tile with a tiled gate, the same as every other returned house on the road.',
    choices: [
      {
        text: 'Go back.',
        outcome: 'The village is old men, old women and small children. You are, for the first time since you were seventeen, the young.',
        effect: (p) => {
          p.setMem('cnr_ft_return', true); p.m += 3
          // Home is the village they left, not Sichuan by default.
          const born = p._state?.character?.birthPlace
          const bornId = born?.id ?? born
          p.relocate(born?.type === 'rural' && bornId ? bornId : 'cn_rural', 'working_class')
        },
      },
      {
        text: 'Stay one more year. The money is still here.',
        outcome: 'One more year becomes three. The house in the village has a lock and nobody inside.',
        effect: (p) => { p.setMem('cnr_ft_return', true); p.mo += 1000; p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'cnr_ft_reservoir',
    phase: null,
    weight: 60,
    when: (G) => IN_CN(G) && G.flags.has('cnr_three_gorges') && G.currentYear >= 2010 && once(G, 'cnr_ft_reservoir'),
    text: 'You take a tourist boat down through the gorges, which are lower than in the paintings now, with the water a hundred metres up their sides. The guide points to a stretch of green water and says the old town of Fengjie was there. Your aunt, beside you, points to a slightly different stretch, and says nothing else for the rest of the trip.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_reservoir', true); p.m -= 2 },
  },

  {
    id: 'cnr_ft_sars_2020',
    phase: null,
    weight: 450,
    when: (G) => IN_CN(G) && G.flags.has('cnr_sars') && G.currentYear === 2020 && once(G, 'cnr_2020'),
    text: (G) => `Two days before Spring Festival they close ${WUHAN(G) ? 'the city around you' : 'Wuhan'}, and you know at once what this is, because you have the vinegar smell of 2003 in your nose before anyone says the word. You buy masks the same afternoon, before the pharmacies run out, and rice, and you tell your family not to come for the New Year and they think you are being dramatic. In February a doctor who was made to confess for warning his colleagues dies of it. You were right. It is no comfort at all.`,
    choices: null,
    effect: (p) => { p.setMem('cnr_2020', true); p.m -= 4; p.h += 1 },
  },

  {
    id: 'cnr_ft_wenchuan_2018',
    phase: null,
    weight: 300,
    when: (G) => SICHUAN_SIDE(G) && G.flags.has('cnr_wenchuan') && G.currentYear === 2018 && once(G, 'cnr_ft_wen'),
    text: 'Ten years. The new towns are finished, with wide streets and a museum, and the old Beichuan is left as it fell, with a fence round it, for visitors. On the anniversary there is a ceremony on television with officials in dark suits. The parents of the schoolchildren are not in it. Some of them had another child afterwards, when the rules were relaxed for them. You know one of them; she does not come to the ceremony either.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_wen', true); p.m -= 3 },
  },

  {
    id: 'cnr_ft_tibet',
    phase: null,
    weight: 70,
    when: (G) => TIBETAN(G) && IN_CN(G) && G.flags.has('cnr_tibet_2008') && G.currentYear >= 2012 && once(G, 'cnr_ft_tibet'),
    text: 'There is a police post inside the monastery gate now, and cameras on the prayer-wheel path. Your cousin who was a monk was sent home in the third year, for being too young according to a new rule, and works on a construction site in the county town and still keeps his head shaved. When he comes to eat he says the prayers before the meal, under his breath, as he always did. The photograph is still in your cupboard.',
    choices: null,
    effect: (p) => { p.setMem('cnr_ft_tibet', true); p.m -= 3 },
  },
]
