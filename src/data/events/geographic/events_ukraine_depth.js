// events_ukraine_depth.js
// Ukraine depth arc — texture not covered in events_ukraine.js.
// events_ukraine.js covers: Holodomor family memory, independence 1991,
// language question, Orange Revolution 2004, Euromaidan 2013,
// Donbas displacement 2014, 2022 invasion.
// This file: Chernobyl 1986, 1990s economic collapse, Soviet Ukrainian
// identity texture, Crimea 2014 from inside, Lviv/Galicia western texture,
// Kharkiv wartime, male mobilization 2022, basement civilian 2022.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const UKRAINE_DEPTH_EVENTS = [

  // ── CHERNOBYL 1986 ────────────────────────────────────────────────────────

  {
    id: 'ukr_dep_chernobyl',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1986 && G.currentYear <= 1990 &&
      G.age >= 8 &&
      !G.mem?.ukrDepChernobyl,
    text: pick([
      'April 26, 1986, reactor four. The explosion is at 1:23 a.m. Pripyat does not evacuate for 36 hours — the Soviet state needs time to determine that the evacuation is necessary. When the buses finally come, residents are told to bring documents for three days. Most leave without photographs, without extra clothing, without anything that acknowledges what three days means. The Ferris wheel in Pripyat is still there. No one ever rides it again.',
      'The liquidators. 600,000 men across the Soviet Union sent to contain the reactor, clean the rooftops, build the sarcophagus. They receive medals. Some receive doses that are not measured accurately, or measured and not disclosed. The bonus pay is good. The paperwork afterward is complicated. Some of them are your age. Some of them are your uncles.',
    ]),
    choices: [
      {
        text: 'Your family is from the exclusion zone. You leave with the buses.',
        tag: null,
        outcome: 'Three days becomes forever. The town you grew up in is inside the 30-kilometre zone. You do not go back for a very long time. When you do, the furniture is still there.',
        effect: (p) => {
          p.m -= 12
          p.r += 8
          p.addFlag('ukr_chernobyl_generation')
          p.setMem('ukrDepChernobyl', true)
        },
      },
      {
        text: 'You are far enough away to be told it is safe, but close enough to know it is not.',
        tag: null,
        outcome: 'The iodine tablets arrive at school. No one explains why. The May Day parade is not cancelled, though the cloud has passed over Kyiv by then. You learn what the word "classified" means when it is applied to weather.',
        effect: (p) => {
          p.m -= 6
          p.e += 4
          p.addFlag('ukr_chernobyl_generation')
          p.setMem('ukrDepChernobyl', true)
        },
      },
    ],
    effect: null,
  },

  // ── 1990S ECONOMIC COLLAPSE ───────────────────────────────────────────────

  {
    id: 'ukr_dep_1990s_collapse',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1993 && G.currentYear <= 1997 &&
      G.age >= 16 &&
      !G.mem?.ukrDep1990s,
    text: 'The karbovanets coupon. The currency issued in 1992 to replace the Soviet ruble — not a real currency, printed on cheap paper, worth less every week. In 1993 inflation runs at 10,000 percent. Your parents\' savings from forty years of work are worth nothing in six months. The factory where your father worked: closed. The pension: paid three months late, then paid in vouchers for goods that don\'t exist. The people who survive 1993-1995 in Ukraine do so through connections, through gardens, through selling personal possessions at the market on Sundays. The mafia is real. The men with tracksuits and mobile phones are real. The president is Kuchma and the country is officially democratic and what is actually happening is something else.',
    choices: [
      {
        text: 'You become one of the shuttle traders — buying in Poland or Turkey, selling at home.',
        tag: null,
        outcome: 'The overnight train to Warsaw with a bag full of goods. The calculation of duty thresholds. The relationship with the customs officer. You build something in this way. It is not the life you planned.',
        effect: (p) => {
          p.w += 3
          p.s += 4
          p.e += 3
          p.addFlag('ukr_1990s_collapse_generation')
          p.setMem('ukrDep1990s', true)
        },
      },
      {
        text: 'Your family survives on the garden and what relatives share.',
        tag: null,
        outcome: 'The dacha plot. The potato rows. The jars of preserves in the cellar. You learn what a family\'s minimum is when the state provides nothing and the market provides only for cash.',
        effect: (p) => {
          p.m -= 8
          p.h -= 3
          p.r += 5
          p.karma += 4
          p.addFlag('ukr_1990s_collapse_generation')
          p.setMem('ukrDep1990s', true)
        },
      },
    ],
    effect: null,
  },

  // ── SOVIET UKRAINIAN IDENTITY ─────────────────────────────────────────────

  {
    id: 'ukr_dep_soviet_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1960 && G.currentYear <= 1991 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ukrDepSovietId,
    text: pick([
      'You are Ukrainian and Soviet and both at once. The school is in Russian. The films are in Russian. The songs you know by heart are in Russian. The village your grandmother came from speaks Ukrainian, but that Ukrainian sounds old and rural — not the Ukrainian in the official newspaper, which is careful and bureaucratic, not the Ukrainian in the village, which is not for official use. You know who you are. The state has opinions about who you are that are different from your own.',
      'The Sixties: the shistdesiatnyky — the generation of writers, artists, intellectuals who pushed for Ukrainian culture in the Khrushchev thaw. Ivan Dziuba. Lina Kostenko. Vasyl Stus. What happened to them: Stus died in a Soviet camp in 1985. Dziuba was made to recant. Kostenko was silenced for twenty years. The state that silenced them is the state your career depends on. You know their names. You do not say them at work.',
    ]),
    choices: null,
    effect: (p) => {
      p.e += 4
      p.r += 4
      p.addFlag('ukr_soviet_identity')
      p.setMem('ukrDepSovietId', true)
    },
  },

  // ── CRIMEA 2014 ───────────────────────────────────────────────────────────

  {
    id: 'ukr_dep_crimea_2014',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2014 && G.currentYear <= 2015 &&
      G.age >= 16 &&
      !G.mem?.ukrDepCrimea,
    text: 'February 27, 2014. Armed men without insignia — "polite people," the term that sticks — occupy the Crimean parliament building. A referendum is announced in ten days. The ballot has two options: join Russia, or restore the 1992 constitution (not: stay in Ukraine). The result is announced as 96.77 percent for Russia. The Crimean Tatars, who were deported by Stalin in 1944 and allowed to return in the 1990s, do not participate. Within weeks, Ukrainian civil servants must choose: stay and work for the new administration, or leave. Soldiers in Ukrainian bases must choose: defect or go. Property registers are transferred. The hryvnia stops working. The ruble arrives.',
    choices: [
      {
        text: 'You stay in Crimea. This is where you are from.',
        tag: null,
        outcome: 'You stay. You get the Russian passport. The administrative category you now belong to — the annexed population — is not one that has a clean legal status in international law, which is not your daily problem. Your daily problem is the checkpoint, the ruble, the changed phone codes, and the relatives in Kyiv who call less often.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.addFlag('ukr_crimea_2014_inside')
          p.setMem('ukrDepCrimea', true)
        },
      },
      {
        text: 'You leave Crimea for mainland Ukraine.',
        tag: null,
        outcome: 'You take what you can. You cross to Kherson before the checkpoints are fully established. Internally displaced again — or for the first time. The peninsula is visible from the coast on a clear day. You do not go back.',
        effect: (p) => {
          p.m -= 10
          p.r += 7
          p.w -= 5
          p.addFlag('ukr_crimea_2014_inside')
          p.setMem('ukrDepCrimea', true)
        },
      },
    ],
    effect: null,
  },

  // ── LVIV / GALICIA WESTERN TEXTURE ───────────────────────────────────────

  {
    id: 'ukr_dep_lviv_galicia',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1950 && G.currentYear <= 2015 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.ukrDepLviv,
    text: 'Lviv. The city that was Lwów under Poland, Lemberg under Austria-Hungary, Lvov under the USSR, Lviv now. The coffee houses on the cobblestones date from a different country. The Greek Catholic church — the Uniate church, Rome-connected and Ukrainian-language, neither Orthodox nor Roman Catholic — survived Soviet suppression and re-emerged in 1990. The history of who lived here and who left or was killed — the Jewish community murdered during the war, the Poles expelled in the post-war border shift, the OUN and UPA partisans who fought both Nazis and Soviets — is the history inside the stones. This city is different from Kyiv. It is more different from Kharkiv. The difference is not always easy to explain to people from the east.',
    choices: null,
    effect: (p) => {
      p.e += 5
      p.m += 3
      p.addFlag('ukr_lviv_galicia_generation')
      p.setMem('ukrDepLviv', true)
    },
  },

  // ── KHARKIV WARTIME 2022 ─────────────────────────────────────────────────

  {
    id: 'ukr_dep_kharkiv_wartime',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.age >= 14 &&
      !G.mem?.ukrDepKharkiv,
    text: 'Kharkiv: 1.4 million people, Ukraine\'s second city, 40 kilometres from the Russian border. In the first days of the invasion the Russian forces expect to take the city quickly; it is historically Russian-speaking, it was the capital of Soviet Ukraine until 1934. It does not fall. The resistance in the streets, the territorial defense units with hunting rifles, the fact that Kharkiv identifies as Ukrainian despite the Russian it speaks. By April the city is being shelled from across the border — not a siege, a shelling. Apartment blocks, universities, markets. People move to the east of the city away from the north. Or they leave for Kyiv, for Poltava, for Poland. Or they go down to the metro and they stay there. The metro stations become the cities under the city.',
    choices: [
      {
        text: 'You go down to the metro and you stay.',
        tag: null,
        outcome: 'The metro station becomes a neighbourhood. Folding beds, children\'s books, a charging station, someone\'s dog. The shelling is audible from the platform. After a few weeks you can tell the difference between incoming and outgoing by the sound.',
        effect: (p) => {
          p.m -= 12
          p.h -= 4
          p.s += 3
          p.karma += 5
          p.addFlag('ukr_kharkiv_wartime')
          p.setMem('ukrDepKharkiv', true)
        },
      },
      {
        text: 'You leave Kharkiv heading west.',
        tag: null,
        outcome: 'The road west. The city is not falling but it is not safe either. You take the direction you can and find a city that is not being shelled, which in February 2022 means going far west or leaving the country.',
        effect: (p) => {
          p.m -= 10
          p.r += 6
          p.w -= 4
          p.addFlag('ukr_kharkiv_wartime')
          p.setMem('ukrDepKharkiv', true)
        },
      },
    ],
    effect: null,
  },

  // ── MOBILIZATION 2022 ─────────────────────────────────────────────────────

  {
    id: 'ukr_dep_mobilization_2022',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.character.gender === 'male' &&
      G.age >= 18 && G.age <= 60 &&
      !G.mem?.ukrDepMobilization,
    text: 'Martial law. Men aged 18-60 are prohibited from leaving the country. At the border crossings in February and March 2022: the lines of cars, mostly women and children going west, and at the checkpoint the men being turned back. Some hide in trunks. Some cross the Tisza river into Romania by swimming in February — the water is four degrees. Some stay and do not try to leave. The territorial defense is accepting volunteers with no military background. The regular military is calling up reservists. You are of the age. The law says you cannot leave. What you do with that is yours.',
    choices: [
      {
        text: 'You report to the territorial defense. You have no military training but they are accepting everyone.',
        tag: null,
        outcome: 'Three weeks of training: how to hold a weapon, how to dig a position, what the radio codes mean. You are assigned to a unit. The people in the unit are an electrician, a teacher, two students, a man who ran a restaurant. The restaurant is closed now. The unit is not.',
        effect: (p) => {
          p.m -= 8
          p.h -= 6
          p.karma += 10
          p.r += 5
          p.addFlag('ukr_mobilization_2022')
          p.setMem('ukrDepMobilization', true)
        },
      },
      {
        text: 'You send your family west and stay behind, waiting to see what is needed.',
        tag: null,
        outcome: 'You are not a soldier and you do not become one, but you drive volunteers, you translate for journalists, you collect medicines, you do what the city needs that is not shooting. The war takes many forms of labour.',
        effect: (p) => {
          p.m -= 6
          p.karma += 7
          p.r += 4
          p.addFlag('ukr_mobilization_2022')
          p.setMem('ukrDepMobilization', true)
        },
      },
    ],
    effect: null,
  },

  // ── BASEMENT / SHELTER CIVILIAN 2022 ─────────────────────────────────────

  {
    id: 'ukr_dep_basement_2022',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.age >= 8 &&
      !G.mem?.ukrDepBasement &&
      !G.mem?.ukrDepMobilization &&
      !G.mem?.ukrDepKharkiv,
    text: 'The air raid alert sounds on the phone. The sound is specific — you know it before you are fully awake. The basement: your building\'s basement, or the car park below the shopping centre, or the metro station, depending on where you are when it sounds. You bring: the go-bag you assembled in the first week (documents, power bank, water, two changes of clothes for the child). You wait. Sometimes twenty minutes. Sometimes two hours. Sometimes the all-clear sounds and you go back up and the electricity is off. The routine of war is mostly this: the alert, the descent, the waiting, the return. The extraordinary part is the other part — the strike that hits somewhere else, the photographs in the morning, the calculation of how far.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.h -= 3
      p.r += 4
      p.e += 2
      p.addFlag('ukr_basement_2022')
      p.setMem('ukrDepBasement', true)
    },
  },

]
