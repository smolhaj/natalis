// events_kabylie.js — a quarter of Algeria, and the language it was not allowed
// to be taught in.
//
// The roster draws 27% of Algerians as Kabyle, and `unwritten-group` found that
// no guard in the corpus had ever named them. The Algerian module is about the
// Black Decade, which Kabyles lived through like everyone else — but their
// twentieth century has a second spine that the rest of the country's does not:
// a language spoken at every hearth in the mountains and absent from every
// school, every form and every broadcast in Arabic until the day in 2016 it was
// written into the constitution. What happened between is a sequence of Aprils.
//
// Written for who the engine actually produces. Births run 1935 to 2025 almost
// uniformly; before this module about half were rural and every one of those
// was placed in "A Village in Kabylie" — which was also where every rural ARAB
// Algerian was born, because it was Algeria's only rural place — while one
// Kabyle in five was born in Oran. `places.js` now has Tizi Ouzou, the High
// Plateaux and the Aurès, and `homeOf` puts roughly half of Kabyles in the
// village, a sixth in Tizi Ouzou and the rest in Algiers, which is about right:
// Algiers has held a large Kabyle population since before independence.
//
// The village is the unit here, not the nation. The tajmaât — the assembly and
// the stone benches it sits on — fined families that missed a funeral long
// before 2001 turned it into the structure of a movement, and the emigrants in
// France kept a notebook of what each man owed the village for the water pipe.
//
// Dates used, all checked. Operation Jumelles, the Challe offensive against
// Wilaya III, runs from July 1959; the regroupement camps hold more than two
// million rural Algerians by 1961. The FFS rising under Hocine Aït Ahmed is
// September 1963 to the accord of June 1965. Mammeri's Berber course at the
// University of Algiers ends in 1973. Idir's "A Vava Inouva" is broadcast in
// 1973. The Mammeri lecture at Tizi Ouzou is banned on 10 March 1980; the
// university is stormed in the early hours of 20 April. Matoub Lounès is
// kidnapped by the GIA on 25 September 1994 and freed on 10 October. The
// schoolbag strike runs September 1994 to April 1995 and ends with the Haut
// Commissariat à l'Amazighité in May 1995. Matoub is killed on 25 June 1998;
// the Arabisation law takes effect on 5 July. Massinissa Guermah is shot in the
// Beni Douala gendarmerie on 18 April 2001 and dies on the 20th; 126 are killed
// that spring. The El Kseur platform is June 2001 and the march on Algiers is 14
// June. Tamazight becomes a national language in April 2002 and an official
// one in February 2016. Yennayer is first a public holiday on 12 January 2018.
// The flag arrests follow Gaïd Salah's speech of June 2019. The fires are
// August 2021.

const DZ = 'Algeria'
const IS_DZ = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === DZ
const KAB = (G) => G.character?.ethnicity === 'berber_kabyle'
const HOME = (G) => IS_DZ(G) && KAB(G)
const ABROAD = (G) => KAB(G) && !IS_DZ(G)
const VILLAGE = (G) => G.place?.id === 'dz_kabylie'
const TIZI = (G) => G.place?.id === 'dz_tizi_ouzou'
const KABYLIE = (G) => G.place?.region === 'Kabylie'
const MALE = (G) => G.character?.gender === 'male'
const once = (G, key) => !G.mem?.[key]

export const KABYLIE_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'kab_ft_regroupement',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('kab_regrouped') && G.age >= 45 && G.currentYear >= 1985 && once(G, 'kab_ft_camp'),
    text: 'The camp had a name in French and a fence, and it stood on the flat ground below the village where the army could see it. You lived inside it for three years while the village above was a forbidden zone, and then rubble. When your family walked back up in 1962 the fig trees had gone on fruiting with nobody to pick them. There is a road where the fence was now, and nobody under forty knows what the flat ground was for.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_camp', true); p.r += 4; p.e += 2 },
  },

  {
    id: 'kab_ft_tafsut',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('kab_tafsut_1980') && G.currentYear >= 1990 && G.age >= 28 && once(G, 'kab_ft_tafsut'),
    text: (G) => `Every twentieth of April the students march from Hasnaoua, and every year more of them were born after it happened. ${G.currentYear - 1980} years on, a boy with a Tifinagh letter painted on his cheek asks you, because somebody has told him, what you remember of 1980. You have told it so many times it has a shape now. The shape is not quite what it was.`,
    choices: [
      {
        text: 'Tell him about the night itself',
        tag: null,
        outcome: 'You tell him about the doors, the hour, the sound in the corridor. He listens the way you listen to history, which is what it is now.',
        effect: (p) => { p.setMem('kab_ft_tafsut', true); p.m += 3; p.karma += 3 },
      },
      {
        text: 'Tell him it was mostly waiting',
        tag: null,
        outcome: 'He looks disappointed, and then a minute later as though he has understood something.',
        effect: (p) => { p.setMem('kab_ft_tafsut', true); p.e += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_ft_school_child',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('kab_school_no_tamazight') && G.currentYear >= 2003 &&
      (G.children?.length ?? 0) > 0 && G.age >= 28 && once(G, 'kab_ft_child'),
    text: 'Your child comes home with an exercise book for Tamazight, which is a subject now, three hours a week. Your own language, written in Latin letters with marks above and below them you have never seen, and it is read aloud to you across the table. You have spoken it every day of your life and cannot read a line of it. You are corrected on a word your mother used.',
    context: 'Tamazight was introduced experimentally into some schools from 1995, after the schoolbag strike, mostly in Kabylie, and has been taught unevenly since. Which script to write it in — Latin, Tifinagh or Arabic — is still argued over.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_child', true); p.m += 4; p.r += 3 },
  },

  {
    id: 'kab_ft_boycott',
    phase: null,
    weight: 250,
    when: (G) => KAB(G) && G.flags.includes('kab_boycott_year') && G.age >= 21 && G.currentYear >= 2000 && once(G, 'kab_ft_boycott'),
    text: 'On every form that asks about your schooling there is one year that does not add up. The school year 1994 to 1995 happened everywhere in Algeria except in the mountains, where the schoolbags stayed on their nails from September to April. Everyone from Kabylie your age is a year older than their class. You recognise each other by it at interviews in Algiers: the same small gap, explained in the same few words.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_boycott', true); p.e += 2; p.m -= 1 },
  },

  {
    id: 'kab_ft_matoub',
    phase: null,
    weight: 250,
    when: (G) => KAB(G) && G.flags.includes('kab_matoub_1998') && G.currentYear >= 2012 && G.age >= 22 && once(G, 'kab_ft_matoub'),
    text: 'On the twenty-fifth of June the road up to Taourirt Moussa is full of cars, and his house has become a place people visit. In 2011 two men were tried and sentenced for the killing, and his family refused to recognise the trial. You put on the cassette you have had since the nineties, the sleeve gone soft as cloth. The songs are still angry, and most of what they are angry about is still there.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_matoub', true); p.m -= 2; p.r += 2 },
  },

  {
    id: 'kab_ft_black_spring',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('kab_black_spring') && G.currentYear >= 2014 && once(G, 'kab_ft_spring'),
    text: 'The boy from the lower houses who was shot in the leg in May 2001 walks with the leg swinging out, and he is past thirty now. The state gave the families of the dead a status and a pension, and the wounded a card. The gendarmes who were pulled out of some towns afterwards have been coming back, one post at a time. Every April somebody paints the names on the school wall again, and every year there is less room.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_spring', true); p.r += 4; p.karma += 2 },
  },

  {
    id: 'kab_ft_emigrant_money',
    phase: null,
    weight: 250,
    when: (G) => ABROAD(G) && G.flags.includes('kab_emigrant_france') && G.age >= 26 && G.age <= 60 && once(G, 'kab_ft_notebook'),
    text: 'The men from the village who are in France meet once a month in a café in Barbès whose owner is from the next valley. There is a notebook, and in it are the names and the sums: the water pipe, the road, the roof of the mosque, the tajmaât house. Nobody at home ever has to ask twice, because the notebook asks. Your name is in it in your own handwriting.',
    choices: [
      {
        text: 'Give what the notebook says',
        tag: null,
        outcome: 'Your line in the notebook is the same length as everyone else\'s, which is the point of it.',
        effect: (p) => { p.setMem('kab_ft_notebook', true); p.mo -= 300; p.karma += 4 },
      },
      {
        text: 'Give more this year',
        tag: null,
        outcome: 'In August two old men thank you by name at the assembly, which is worse than being thanked privately.',
        effect: (p) => { p.setMem('kab_ft_notebook', true); p.mo -= 800; p.karma += 6; p.m += 2 },
      },
      {
        text: 'Say you cannot, this time',
        tag: null,
        outcome: 'Nobody says anything. The notebook says it.',
        effect: (p) => { p.setMem('kab_ft_notebook', true); p.r += 4; p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_ft_emigrant_return',
    phase: null,
    weight: 250,
    when: (G) => ABROAD(G) && G.flags.includes('kab_emigrant_france') && G.age >= 58 && once(G, 'kab_ft_house'),
    text: 'The house in the village is finished. It took twenty-two summers, one floor at a time, with the iron rods left sticking out of the roof for the floor after that. It stands empty eleven months of the year. Your children in France say the village the way you once said France: a place in a story somebody tells.',
    choices: [
      {
        text: 'Go back and live in it',
        tag: null,
        outcome: 'The first winter you are cold in a way you had forgotten, and the men on the benches call you by your father\'s name.',
        effect: (p) => { p.setMem('kab_ft_house', true); p.relocate('dz_kabylie', null, { residency: 'citizen' }); p.m += 4 },
      },
      {
        text: 'Stay near the grandchildren',
        tag: null,
        outcome: 'You go every August, and every August it is a little more a house you visit.',
        effect: (p) => { p.setMem('kab_ft_house', true); p.r += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_ft_aarch',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.flags.includes('kab_aarch_delegate') && G.currentYear >= 2004 && once(G, 'kab_ft_aarch'),
    text: 'The movement that had every village in it splits the way movements do, over whether to talk. Some of the delegates sit down with the prime minister in 2005, some call that treason, and some simply go home. The El Kseur platform, fifteen points, was declared not negotiable by everyone, and then negotiated. The tajmaât goes back to what it did before: the water, the paths, the fine for a family that misses a funeral.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_aarch', true); p.r += 3; p.e += 2 },
  },

  {
    id: 'kab_ft_flag',
    phase: null,
    weight: 250,
    when: (G) => KAB(G) && G.flags.includes('kab_flag_2019') && G.currentYear >= 2021 && once(G, 'kab_ft_flag'),
    text: 'The flag is blue, green and yellow with the red letter in the middle, and in 2019 men went to prison for months for carrying it through Algiers on a Friday. Afterwards a court in one city ruled it was no crime and a court in another ruled that it was. You kept yours. It is folded in the drawer with the passports, which is where your family has always kept the things it intends to need.',
    choices: null,
    effect: (p) => { p.setMem('kab_ft_flag', true); p.m -= 2; p.karma += 2 },
  },

  // ── THE VILLAGE ────────────────────────────────────────────────────────────

  {
    id: 'kab_tajmaat',
    phase: null,
    weight: 60,
    when: (G) => HOME(G) && VILLAGE(G) && G.age >= 9 && G.age <= 16 && once(G, 'kab_tajmaat'),
    text: (G) => MALE(G)
      ? 'On Fridays after prayer the men of the village sit on the stone benches of the tajmaât, and what is decided there is law in a way the state\'s law is not. A family that misses a funeral pays a fine. When the path to the spring washes out, every household sends a man for tiwizi, and the man is fed. Your father speaks there twice a year and practises the night before.'
      : 'On Fridays after prayer the men of the village sit on the stone benches of the tajmaât, and what is decided there is law in a way the state\'s law is not. A family that misses a funeral pays a fine; when the path to the spring washes out, every house sends a man. The women are not on the benches. Your mother knows what was decided before your father has finished walking home, and sometimes before it was decided.',
    choices: null,
    effect: (p) => { p.setMem('kab_tajmaat', true); p.e += 2; p.s += 1 },
  },

  {
    id: 'kab_olive',
    phase: null,
    weight: 40,
    when: (G) => HOME(G) && VILLAGE(G) && G.age >= 6 && G.age <= 60 && once(G, 'kab_olive'),
    text: (G) => `In December the whole family is out on the terraces with sticks and sheets, and by noon your hands are black with it. The olives go down to the press in sacks on the donkey, and the oil comes back ${G.currentYear >= 1975 ? 'in plastic drums' : 'in clay jars'} that will last until the next winter if nobody is careless. Somebody always is.`,
    choices: null,
    effect: (p) => { p.setMem('kab_olive', true); p.m += 2; p.h += 1 },
  },

  {
    id: 'kab_august',
    phase: null,
    weight: 40,
    when: (G) => HOME(G) && VILLAGE(G) && G.age >= 8 && G.age <= 20 && G.currentYear >= 1965 && G.currentYear <= 2015 && once(G, 'kab_august'),
    text: 'In August the emigrants come home. Cars with French number plates climb the last bend in low gear, and men you only know from photographs get out in new shoes and hand out envelopes to people who pretend not to expect them. Every wedding of the year is in the same three weeks. By September the village is old men, women and children again, and the new shoes have gone back down the mountain.',
    choices: null,
    effect: (p) => { p.setMem('kab_august', true); p.m += 3 },
  },

  // ── THE WAR AND AFTER ──────────────────────────────────────────────────────

  {
    id: 'kab_regroupement',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && G.ruralUrban === 'rural' && G.currentYear >= 1957 && G.currentYear <= 1961 && G.age >= 3 && G.age <= 30 && once(G, 'kab_regroup'),
    text: 'The army comes up the mountain and tells the village it has until the end of the week. The houses are inside a forbidden zone now, which means anything that moves there after Sunday will be fired on from the air. You go down to a camp of tin and canvas on the flat ground by the road, inside wire, with a roll call every morning. Your grandmother will not stop looking up at the ridge.',
    context: 'From 1957 the French army moved rural Algerians into regroupement camps and declared the emptied land forbidden zones; by 1961 the camps held more than two million people. The Challe offensive of 1959, Operation Jumelles, was aimed at Kabylie, the ALN\'s Wilaya III.',
    choices: null,
    effect: (p) => { p.setMem('kab_regroup', true); p.m -= 8; p.h -= 4; p.addFlag('kab_regrouped') },
  },

  {
    id: 'kab_1963',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && (KABYLIE(G) || G.ruralUrban === 'rural') && G.currentYear >= 1963 && G.currentYear <= 1965 && G.age >= 8 && once(G, 'kab_1963'),
    text: 'A year after independence there are soldiers in the villages again, and this time they are Algerian. Aït Ahmed has gone up into the mountains with the FFS and a few hundred men who spent seven years in the maquis and are back in it. Your uncle, who fought the French in Wilaya III, sits by the fire and says nothing about which side is which, for so long that it becomes his answer.',
    context: 'In September 1963 Hocine Aït Ahmed, one of the FLN\'s founders, formed the Front des Forces Socialistes and led an armed rising in Kabylie against Ben Bella\'s government. It was put down by the army at a cost of some four hundred lives and ended in an accord in June 1965.',
    choices: null,
    effect: (p) => { p.setMem('kab_1963', true); p.e += 2; p.m -= 3 },
  },

  {
    id: 'kab_school_arabic',
    phase: null,
    weight: 300,
    when: (G) => HOME(G) && G.age >= 6 && G.age <= 9 && G.currentYear >= 1964 && G.currentYear <= 1994 && once(G, 'kab_school'),
    text: (G) => `The teacher is from ${G.currentYear < 1980 ? 'Cairo' : 'Médéa'}, and he speaks to the class in an Arabic nobody in your house speaks, not even the Arabic your father uses at the market. At home you speak Kabyle. At school Kabyle is not a subject or a word on the wall; it is the thing you are rapped across the knuckles for when it slips out in the yard. By the end of the first year you have learned the rule without anybody saying it.`,
    context: 'Algerian schooling was Arabised through the 1960s and 70s, relying in part on teachers recruited from Egypt, Syria and Iraq. Tamazight had no place in the curriculum; the Berber course Mouloud Mammeri taught at the University of Algiers was closed in 1973.',
    choices: null,
    effect: (p) => { p.setMem('kab_school', true); p.e += 2; p.m -= 2; p.addFlag('kab_school_no_tamazight') },
  },

  {
    id: 'kab_vava_inouva',
    phase: null,
    weight: 200,
    when: (G) => KAB(G) && G.currentYear >= 1973 && G.currentYear <= 1979 && G.age >= 6 && once(G, 'kab_idir'),
    text: 'On the Kabyle radio a young man called Idir sings a song built on a winter tale: a girl at the door, an old man by the fire, the snow outside. Within a year it is on every radio in the mountains, then in the cafés in Paris, then on a French record that sells in countries where nobody knows what the words mean. Your grandmother, who does not listen to the radio, sings the second verse under her breath while she sifts the semolina.',
    choices: null,
    effect: (p) => { p.setMem('kab_idir', true); p.m += 4 },
  },

  // ── 1980 ───────────────────────────────────────────────────────────────────

  {
    id: 'kab_spring_campus',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && G.currentYear === 1980 && G.age >= 17 && G.age <= 27 && (TIZI(G) || G.literate) && once(G, 'kab_1980'),
    text: 'On the tenth of March the wali cancels Mouloud Mammeri\'s lecture at the university, which was going to be about old Kabyle poetry. By April the students have occupied the campus at Hasnaoua and the shops of Tizi Ouzou have pulled their shutters down for a general strike. On the night of the nineteenth the police come in through the dormitories, and people are pulled out of their beds.',
    context: 'The banning of Mammeri\'s lecture on 10 March 1980 set off student occupations and a general strike across Kabylie. Police stormed the university and the hospital in the early hours of 20 April. It was the first open mass protest against the single-party state since independence, and 20 April — Tafsut Imazighen, the Berber Spring — has been marked every year since.',
    choices: [
      {
        text: 'Stay inside the university',
        tag: 'defiant',
        outcome: 'At four in the morning you are face down in a corridor with your hands on your head. Two dozen people are charged, and you are not one of them, which is luck.',
        effect: (p) => { p.setMem('kab_1980', true); p.h -= 5; p.m -= 3; p.karma += 4; p.addFlag('kab_tafsut_1980') },
      },
      {
        text: 'Go home to the village before it starts',
        tag: 'yielding',
        outcome: 'You hear what happened on a French station, because the Algerian radio does not mention it.',
        effect: (p) => { p.setMem('kab_1980', true); p.r += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_spring_village',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && G.currentYear === 1980 && G.age >= 12 && once(G, 'kab_1980') &&
      !(G.age >= 17 && G.age <= 27 && (TIZI(G) || G.literate)),
    text: 'In April the news comes up from Tizi Ouzou in the back of a van: the lecture was banned, the students are inside the university, the town is on strike. On the twentieth the police go in. Your cousin who studies there does not come home for a week, and when he does he has a cut above his eye he will not explain. The men on the benches talk about it in a voice they do not use for water or paths.',
    choices: null,
    effect: (p) => { p.setMem('kab_1980', true); p.e += 2; p.addFlag('kab_tafsut_1980') },
  },

  // ── THE NINETIES ───────────────────────────────────────────────────────────

  {
    id: 'kab_matoub_kidnap',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && G.currentYear === 1994 && G.age >= 10 && once(G, 'kab_matoub94'),
    text: 'On the twenty-fifth of September the GIA takes Matoub Lounès from a café in the mountains. For two weeks the whole of Kabylie behaves as though somebody from every family is missing, which in a way is true. There are marches, and men in the villages saying out loud what they will do if he is killed. On the tenth of October they let him go, and people dance in the road.',
    choices: null,
    effect: (p) => { p.setMem('kab_matoub94', true); p.m += 3 },
  },

  {
    id: 'kab_boycott_pupil',
    phase: null,
    weight: 800,
    when: (G) => HOME(G) && KABYLIE(G) && G.currentYear >= 1994 && G.currentYear <= 1995 && G.age >= 6 && G.age <= 18 && once(G, 'kab_boycott'),
    text: 'In September the Berber Cultural Movement calls a boycott of the schools until Tamazight is taught in them, and the schools of Kabylie stay empty. Your schoolbag hangs on its nail from September to April. You help with the olives and sleep late, and you are told the year is for your children, whom you are not old enough to imagine.',
    context: 'The "grève du cartable" — the schoolbag strike — emptied the schools of Kabylie from September 1994 to April 1995. It ended when the state created the Haut Commissariat à l\'Amazighité in May 1995 and introduced Tamazight into some schools; the school year was largely lost.',
    choices: null,
    effect: (p) => { p.setMem('kab_boycott', true); p.e -= 2; p.m += 1; p.addFlag('kab_boycott_year') },
  },

  {
    id: 'kab_boycott_parent',
    phase: null,
    weight: 500,
    when: (G) => HOME(G) && KABYLIE(G) && G.currentYear >= 1994 && G.currentYear <= 1995 && G.age >= 25 && (G.children?.length ?? 0) > 0 && once(G, 'kab_boycott'),
    text: 'The schools of Kabylie are empty from September, because the movement has called a boycott until Tamazight is taught in them. Your children\'s schoolbags hang on their nails by the door all winter. Everybody agrees the year is the price, and everybody knows who is paying it. In the evenings you teach them what you can, which turns out to be the alphabet and not much else.',
    choices: null,
    effect: (p) => { p.setMem('kab_boycott', true); p.r += 3; p.karma += 2 },
  },

  {
    id: 'kab_matoub_killed',
    phase: null,
    weight: 999,
    when: (G) => KAB(G) && G.currentYear === 1998 && G.age >= 10 && once(G, 'kab_matoub98'),
    text: (G) => (G.mem?.kab_matoub94 ? 'He was given back once, in 1994. ' : '') +
      (IS_DZ(G)
        ? 'On the twenty-fifth of June Matoub Lounès is shot dead in his car on the road near Thala Bounane, a few kilometres from his village. By evening the towns of Kabylie are burning: the tax office, the post office, anything with the state\'s name over the door. Ten days later the law that makes Arabic the only language of public life comes into force, exactly as scheduled.'
        : 'On the twenty-fifth of June a man in the café comes in with the news before the radio has it: Matoub Lounès has been shot dead in his car on the road near his village. By the evening the cafés of Barbès are full of men not drinking anything. Ten days later, at home, the law that makes Arabic the only language of public life comes into force, exactly as scheduled.'),
    context: 'Matoub Lounès, the most popular and most openly political Kabyle singer, was killed on 25 June 1998. The killing was attributed to the GIA, which his family and many in Kabylie have always disputed. The law generalising the use of Arabic took effect on 5 July, and the riots after his death ran into the protests against it.',
    choices: null,
    effect: (p) => { p.setMem('kab_matoub98', true); p.m -= 8; p.addFlag('kab_matoub_1998') },
  },

  // ── 2001 ───────────────────────────────────────────────────────────────────

  {
    id: 'kab_black_spring_young',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && MALE(G) && G.currentYear === 2001 && G.age >= 15 && G.age <= 30 && once(G, 'kab_2001'),
    text: 'On the eighteenth of April a lycée student called Massinissa Guermah is shot inside the gendarmerie at Beni Douala, and two days later he dies in a hospital in Algiers. The gendarmes say he was a thief, and nobody believes them, then or ever. By the end of the month the young men of every village are out on the roads with stones, and the gendarmes are firing live rounds. Your mother stands in the doorway.',
    context: 'The Black Spring began after Massinissa Guermah, 18, was shot in the Beni Douala gendarmerie on 18 April 2001. In the unrest across Kabylie that followed, security forces killed 126 people, most of them young men, and wounded thousands. The village committees — the aarch — became the movement\'s structure.',
    choices: [
      {
        text: 'Go out with the others',
        tag: 'defiant',
        outcome: 'You are on the road at Larbaâ for three days with a scarf over your face. A round goes past your ear with a sound like cloth tearing.',
        effect: (p) => { p.setMem('kab_2001', true); p.h -= 3; p.karma += 3; p.m -= 4; p.addFlag('kab_black_spring') },
      },
      {
        text: 'Stay in, because she asks you to',
        tag: 'yielding',
        outcome: 'You watch from the roof. The boy from two houses down does not come home.',
        effect: (p) => { p.setMem('kab_2001', true); p.r += 6; p.m -= 5; p.addFlag('kab_black_spring') },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_black_spring_witness',
    phase: null,
    weight: 999,
    when: (G) => HOME(G) && G.currentYear === 2001 && G.age >= 11 && once(G, 'kab_2001') &&
      !(MALE(G) && G.age >= 15 && G.age <= 30),
    text: 'On the eighteenth of April a lycée student called Massinissa Guermah is shot inside the gendarmerie at Beni Douala. For two months after that the young men are out on the roads and the gendarmes fire into them, and every village keeps a count. You learn the names of towns from the lists: Azazga, Larbaâ Nath Irathen, Amizour, Draâ El Mizan. By the summer there are more than a hundred dead, most of them younger than twenty-five.',
    choices: null,
    effect: (p) => { p.setMem('kab_2001', true); p.m -= 6; p.addFlag('kab_black_spring') },
  },

  {
    id: 'kab_aarch',
    phase: null,
    weight: 700,
    when: (G) => HOME(G) && VILLAGE(G) && MALE(G) && G.age >= 30 && G.currentYear >= 2001 && G.currentYear <= 2003 &&
      G.flags.includes('kab_black_spring') && once(G, 'kab_aarch'),
    text: 'The village assemblies, which have spent three hundred years arguing about water, send delegates to a coordination of all the villages, and your tajmaât chooses you. There are meetings in a school hall at El Kseur that go on until the generator gives out. In June you are on a bus to Algiers for the march, which is more people than you have ever seen in one place, and which ends with stones, tear gas, and the shops of the capital shut against you.',
    choices: [
      {
        text: 'Keep going to the meetings',
        tag: 'defiant',
        outcome: 'You learn to sleep sitting up. The platform has fifteen points, and you can recite them in order.',
        effect: (p) => { p.setMem('kab_aarch', true); p.karma += 3; p.h -= 2; p.addFlag('kab_aarch_delegate') },
      },
      {
        text: 'Hand the seat to a younger man',
        tag: 'yielding',
        outcome: 'He is better at it than you were, and you tell him so.',
        effect: (p) => { p.setMem('kab_aarch', true); p.m += 1 },
      },
    ],
    effect: null,
  },

  // ── LEAVING ────────────────────────────────────────────────────────────────

  {
    id: 'kab_leave_old',
    phase: null,
    weight: 150,
    when: (G) => HOME(G) && MALE(G) && G.age >= 18 && G.age <= 30 && G.currentYear >= 1948 && G.currentYear <= 1973 && once(G, 'kab_leave'),
    text: 'A letter comes from your uncle, who has a room in Aubervilliers and a job on the line at Renault, saying there is work. The man in the village who reads French reads it aloud on the benches. Half the young men of the village are in France already; eleven months of the year the village is old men, women and children. The way there is a boat to Marseille and then a train.',
    choices: [
      {
        text: 'Go',
        tag: null,
        outcome: 'The first winter in Paris you sleep four to a room above a café run by a man from the next valley, and send home more than you keep.',
        effect: (p) => { p.setMem('kab_leave', true); p.emigrateTo('France', { residency: 'work_visa' }); p.addFlag('kab_emigrant_france'); p.m -= 3 },
      },
      {
        text: 'Stay',
        tag: null,
        outcome: 'You stay. The village has one more young man in it than it expects, and you notice the way you are looked at.',
        effect: (p) => { p.setMem('kab_leave', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_leave_new',
    phase: null,
    weight: 80,
    when: (G) => HOME(G) && G.age >= 19 && G.age <= 30 && G.currentYear >= 1990 && G.currentYear <= 2019 && once(G, 'kab_leave'),
    text: 'The queue outside the French consulate in Algiers starts the night before, and you are in it with a folder: the certificate of enrolment from a university in Lyon, the bank statement your aunt in Créteil arranged, the photographs taken against a white wall. Everybody in the queue is going to be a student or a spouse or a visitor, and almost nobody is going to come back. It is your third try.',
    choices: [
      {
        text: 'Take the visa when it comes',
        tag: null,
        outcome: 'The flat in Lyon is eleven square metres, and on the landing there is a boy from a village you can see from yours.',
        effect: (p) => { p.setMem('kab_leave', true); p.emigrateTo('France', { residency: 'work_visa' }); p.addFlag('kab_emigrant_france'); p.m -= 2 },
      },
      {
        text: 'Let the folder go back in the drawer',
        tag: null,
        outcome: 'You stay, and every summer you count the ones who did not.',
        effect: (p) => { p.setMem('kab_leave', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  // ── A LANGUAGE ON PAPER ────────────────────────────────────────────────────

  {
    id: 'kab_national_2002',
    phase: null,
    weight: 400,
    when: (G) => KAB(G) && G.currentYear === 2002 && G.age >= 14 && once(G, 'kab_2002'),
    text: (G) => 'In April parliament amends the constitution and Tamazight becomes a national language. Not an official one: a national one, which is a word chosen with great care to mean that it exists. ' +
      (G.flags.includes('kab_black_spring') ? 'Nobody in the village says it was worth a hundred and twenty-six. ' : '') +
      'The newsreader announces it in Arabic.',
    choices: null,
    effect: (p) => { p.setMem('kab_2002', true); p.m += 1; p.e += 1 },
  },

  {
    id: 'kab_official_2016',
    phase: null,
    weight: 400,
    when: (G) => KAB(G) && G.currentYear === 2016 && G.age >= 14 && once(G, 'kab_2016'),
    text: (G) => 'In February the constitution is revised again, and this time Tamazight is an official language of the Republic, beside Arabic. ' +
      (G.flags.includes('kab_school_no_tamazight')
        ? 'You think of the schoolyard, and the rapped knuckles, and how long a thing takes.'
        : G.flags.includes('kab_tafsut_1980')
          ? 'Thirty-six years after the police came into Hasnaoua, it is a line in a document with a seal on it.'
          : 'Your grandmother, told the news, asks what it was before.'),
    choices: null,
    effect: (p) => { p.setMem('kab_2016', true); p.m += 4 },
  },

  {
    id: 'kab_yennayer',
    phase: null,
    weight: 400,
    when: (G) => HOME(G) && G.currentYear === 2018 && G.age >= 5 && once(G, 'kab_yennayer'),
    text: 'On the twelfth of January the whole country has the day off for Yennayer, the Amazigh new year, for the first time. In your mother\'s house it has always been the day of the big couscous and the cockerel killed at the threshold, a day nobody outside the mountains had heard of. Now the Arabic television wishes everyone a happy one, and a presenter in Algiers gets the word slightly wrong.',
    choices: null,
    effect: (p) => { p.setMem('kab_yennayer', true); p.m += 4 },
  },

  {
    id: 'kab_flag_2019',
    phase: null,
    weight: 600,
    when: (G) => HOME(G) && G.currentYear === 2019 && G.age >= 16 && once(G, 'kab_flag'),
    text: 'Every Friday since February the country has been in the street, and the Amazigh flag has been in the street beside the national one, and nobody minded. In June the army chief says on television that only one flag will be tolerated. The following Friday, men are arrested in Algiers for carrying yours.',
    choices: [
      {
        text: 'Carry it the next Friday',
        tag: 'defiant',
        outcome: 'A policeman looks at it, and at you, for a long moment, and then at somebody else.',
        effect: (p) => { p.setMem('kab_flag', true); p.karma += 3; p.addFlag('kab_flag_2019') },
      },
      {
        text: 'Leave it at home',
        tag: 'yielding',
        outcome: 'You march under the national flag, which is also yours, and feel the difference all afternoon.',
        effect: (p) => { p.setMem('kab_flag', true); p.r += 3; p.addFlag('kab_flag_2019') },
      },
    ],
    effect: null,
  },

  {
    id: 'kab_fires_2021',
    phase: null,
    weight: 600,
    when: (G) => HOME(G) && KABYLIE(G) && G.currentYear === 2021 && G.age >= 10 && once(G, 'kab_fires'),
    text: 'In August the mountains burn. The fires come over the ridges faster than anybody can walk, and the men of the village go up with branches and buckets because the country has no water-bombing planes, and ninety people die across the region, some of them soldiers who went up to help. In Larbaâ Nath Irathen a young painter who had driven from Miliana to fight the fires is killed by a crowd that has decided he started them. Nobody in the mountains can speak about that week without a long pause in the same place.',
    choices: null,
    effect: (p) => { p.setMem('kab_fires', true); p.m -= 8; p.h -= 2 },
  },
]
