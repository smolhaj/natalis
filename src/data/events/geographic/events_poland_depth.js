// events_poland_depth.js
// Poland depth arc — texture not in events_poland.js.
// events_poland.js covers: communist childhood, Pope 1978, Solidarity 1980,
// martial law 1981, Round Table 1989, shock therapy, EU 2004, Smolensk 2010,
// Women's Strike 2020.
// This file: Katyń massacre acknowledgment, Warsaw Uprising 1944, border shift
// families from Kresy, Nowa Huta church battle, Jedwabne reckoning 2001,
// PiS democratic backsliding, Polish emigrant in UK arc, Smolensk
// conspiracy polarization.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const POLAND_DEPTH_EVENTS = [

  // ── KATYŃ ACKNOWLEDGMENT 1990 ─────────────────────────────────────────────

  {
    id: 'pol_dep_katyn',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1990 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem?.polDepKatyn,
    text: 'April 1990, and Gorbachev admits that the NKVD did Katyń: in the spring of 1940, thousands of Polish officers, policemen and teachers were shot in the back of the head in the forests of Russia, and for fifty years Moscow blamed the Germans. Your family may have known someone who did not come back from the east. The admission comes half a century late. It confirms what you always knew and were not allowed to say.',
    context: 'About 22,000 Polish prisoners were murdered by the NKVD at Katyń and other sites in April-May 1940.',
    choices: [
      {
        text: 'Someone in your family was at Katyń',
        tag: null,
        outcome: 'The name that was spoken carefully, the absence that was explained differently in different years. Now there is an official acknowledgment. The acknowledgment changes the category — from disappeared to murdered — but it does not return the person.',
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.karma += 4
          p.addFlag('katyn_family_loss')
          p.setMem('polDepKatyn', true)
        },
      },
      {
        text: 'You learn the full scale now — 22,000 in the forests',
        tag: null,
        outcome: 'The scale was known incompletely from samizdat and Radio Free Europe. Now the figure is official. You are angry with a shape: fifty years of lies, confirmed exactly as you always suspected.',
        effect: (p) => {
          p.m -= 5
          p.r += 6
          p.e += 3
          p.addFlag('katyn_generation')
          p.setMem('polDepKatyn', true)
        },
      },
    ],
    effect: null,
  },

  // ── WARSAW UPRISING 1944 ──────────────────────────────────────────────────

  {
    id: 'pol_dep_warsaw_uprising',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1944 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.polDepUprisingChild,
    text: () => pick([
      'August 1, 1944. The Home Army rises against the Germans, and the Soviets on the far bank of the Vistula, close enough to hear the fighting, stop and wait. For sixty-three days the city holds and burns. In October it surrenders, and then the Germans burn the rest of it, street by street. You are small enough that what you know of it is what the adults say in the voice they use when the children are listening.',
      'The Powstanie Warszawskie: your parents\' generation\'s wound. Sixty-three days. The losses are in the faces of everyone you know who was old enough to be there — the blankness that arrives when August 1 is mentioned, the way conversations stop and then restart. You inherit the wound secondhand, and carry it that way.',
    ]),
    context: 'The Warsaw Uprising lasted from 1 August to 2 October 1944. About 200,000 people died, most of them civilians, and some 85 percent of the city was destroyed.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 7
      p.e += 3
      p.addFlag('warsaw_uprising_generation')
      p.setMem('polDepUprisingChild', true)
    },
  },

  {
    id: 'pol_dep_warsaw_uprising_adult',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1944 && G.currentYear <= 1947 &&
      G.age >= 16 &&
      !G.mem?.polDepUprisingAdult,
    text: 'August 1944. In Warsaw, sixty-three days of street fighting: cellars, runners with messages, water from the wells, the Soviets on the other bank not moving. Outside Warsaw, the silence on the radio, then the news, then the other silence. The uprising fails, and the Soviets cross in January when the city is gone, and the new government calls the Home Army criminal. The people who fought in it spend decades unable to say so.',
    choices: [
      {
        text: 'You fought in the uprising',
        tag: null,
        outcome: 'You fought for sixty-three days and survived. The new government calls you a fascist collaborator for the next forty years. You live with the gap between what you did and what you are permitted to say you did.',
        effect: (p) => {
          p.m -= 12
          p.h -= 5
          p.karma += 10
          p.r += 10
          p.addFlag('warsaw_uprising_veteran')
          p.addFlag('warsaw_uprising_generation')
          p.setMem('polDepUprisingAdult', true)
        },
      },
      {
        text: 'You survived Warsaw — barely',
        tag: null,
        outcome: 'The rubble and the January cold and the reorganization of what was a city. The communists arrive with their lists and their categories. You learn to navigate the new hierarchy, different from the old one and hostile to some of what you survived.',
        effect: (p) => {
          p.m -= 10
          p.h -= 4
          p.r += 8
          p.addFlag('warsaw_uprising_generation')
          p.setMem('polDepUprisingAdult', true)
        },
      },
    ],
    effect: null,
  },

  // ── KRESY FAMILIES ────────────────────────────────────────────────────────

  {
    id: 'pol_dep_kresy_family',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.polDepKresy,
    text: 'Your family came from somewhere that is no longer Poland. Lwów — now Lviv, Ukraine. Wilno — now Vilnius, Lithuania. The eastern borderlands, the Kresy, transferred to the Soviet Union by the 1945 Yalta settlement. Four million Poles expelled westward, moved into houses in Wrocław (formerly Breslau), Gdańsk (formerly Danzig), Szczecin (formerly Stettin) — German cities that are now Polish cities because their German residents were expelled into Germany simultaneously. Your parents\' city does not appear on any current map under the name they used for it. They describe it precisely, what was on which street, and so you know they will never stop needing it.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.e += 4
      p.addFlag('kresy_family')
      p.setMem('polDepKresy', true)
    },
  },

  // ── NOWA HUTA CHURCH BATTLE ───────────────────────────────────────────────

  {
    id: 'pol_dep_nowa_huta',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1960 && G.currentYear <= 1980 &&
      G.age >= 18 &&
      !G.mem?.polDepNowaHuta,
    text: (G) => 'The city was laid out with a steelworks, a theatre, a department store and no church, which had not happened in this country in a thousand years. The men who came for the steel jobs put up a cross on the plot where the sign said a school would go. The state took the cross down and the cross went back up, and this went on for years, in the evenings, after shifts. ' + (G.currentYear >= 1979 ? 'In 1977 the cardinal from Krakow consecrates the church that grew around it, and the year after that he is the pope.' : G.currentYear >= 1977 ? 'In 1977 the cardinal from Krakow consecrates the church that grew around it.' : 'The church is still not built. The cross is still there.'),
    context: 'Nowa Huta was built from 1949 outside Krakow around the Lenin Steelworks as a model socialist city, deliberately without a church. Residents erected a cross on a designated plot in 1957 and defended it through repeated attempts at removal, including riots in April 1960. The Ark of the Lord church was consecrated by Cardinal Karol Wojtyla in 1977; he was elected Pope John Paul II the following year.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 5
      p.e += 3
      p.addFlag('nowa_huta_generation')
      p.addFlag('church_formed_identity')
      p.setMem('polDepNowaHuta', true)
    },
  },

  // ── JEDWABNE RECKONING 2001 ────────────────────────────────────────────────

  {
    id: 'pol_dep_jedwabne',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2001 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.polDepJedwabne,
    text: 'In 2001 a historian publishes a book about Jedwabne, July 1941, where the Jews of the town were burned alive in a barn, not by the Germans but by their Polish neighbours. The state\'s own investigation confirms it, and sixty years after, the president goes to Jedwabne and apologises. A large part of the country answers with denial, with counter-claims, with the insistence that it must have been the Germans. You are somewhere in the middle of this argument, about what Poland is and what Poles did and what it means to know.',
    choices: [
      {
        text: 'You accept what the evidence shows. This is part of what happened.',
        tag: null,
        outcome: 'The acceptance is not self-flagellation — it is the capacity to hold the truth about what people are capable of, without which history cannot be understood at all. The acceptance costs something. It costs more for people who would rather not know.',
        effect: (p) => {
          p.e += 5
          p.karma += 4
          p.r += 4
          p.addFlag('jedwabne_reckoning')
          p.setMem('polDepJedwabne', true)
        },
      },
      {
        text: 'The German role is minimized. This is not the full picture.',
        tag: null,
        outcome: 'The argument about German complicity is real — the context of occupation, the presence of German forces. But the investigation\'s conclusion about Polish perpetrators is documented. The counter-argument is also about what you need the past to be.',
        effect: (p) => {
          p.r += 6
          p.addFlag('jedwabne_reckoning')
          p.setMem('polDepJedwabne', true)
        },
      },
    ],
    effect: null,
  },

  // ── PIS DEMOCRATIC BACKSLIDING ────────────────────────────────────────────

  {
    id: 'pol_dep_pis_era',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2015 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      !G.mem?.polDepPis,
    text: 'October 2015, and PiS wins an outright majority, and in the months after the Constitutional Tribunal is packed, the public broadcaster becomes the government\'s, and the courts are taken apart piece by piece, and Brussels opens proceedings. From outside it looks like backsliding. From inside it looks like two things, depending on whether you live in Poland A, the cities and university towns, or Poland B, the small towns and the parishes. You know which one you live in.',
    choices: [
      {
        text: 'The rule of law matters more than any particular policy. This is wrong.',
        tag: null,
        outcome: 'You march in the 2017 protests. You follow the Committee for the Defence of Democracy, KOD. You watch the judiciary independence removed court by court and feel the helplessness of watching an institution disassemble itself under political instruction.',
        effect: (p) => {
          p.m -= 7
          p.karma += 5
          p.r += 5
          p.addFlag('pis_opposition')
          p.setMem('polDepPis', true)
        },
      },
      {
        text: 'The elites had it for long enough. This is correction, not backsliding.',
        tag: null,
        outcome: 'The Tusk years were cosmopolitan but they did not reach your town. The 500+ child benefit arrives every month. For once someone seems to be speaking for people like you. Whether the Constitutional Tribunal matters to your daily life is a different question from whether it matters in principle.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.addFlag('pis_support')
          p.setMem('polDepPis', true)
        },
      },
    ],
    effect: null,
  },

  // ── POLISH EMIGRANT IN UK ─────────────────────────────────────────────────

  {
    id: 'pol_dep_uk_emigrant',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2004 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.polDepUK,
    text: 'Britain opened its doors at once when Poland joined, and in three years you and a great many others are there: the Polish shop on the high street, the Saturday school, the Facebook group for Poles in Bristol. The wages are three or four times Kraków\'s. You do the arithmetic about what you are saving and building and whether you are going back, and the arithmetic changes every few years. Brexit makes it harder.',
    choices: [
      {
        text: 'You settle. Britain is where your life is now.',
        tag: null,
        outcome: 'The settled life: the flat, the British boyfriend or girlfriend, the children who speak English at school and Polish at home, who will speak Polish with an English accent. You are making something permanent that started as temporary.',
        effect: (p) => {
          p.m += 2
          p.r += 5
          p.w += 4
          p.addFlag('poland_uk_emigrant')
          p.addFlag('emigrated'); p.emigrateTo('United Kingdom')
          p.setMem('polDepUK', true)
        },
      },
      {
        text: 'Brexit is the signal. You go back.',
        tag: null,
        outcome: 'The return: the savings, the English you have, the comparative perspective on how other countries do certain things. The Poland you return to is not the Poland you left. You are not the person who left. The encounter between these two changed things is your life now.',
        effect: (p) => {
          p.m -= 3
          p.r += 6
          p.w += 3
          p.addFlag('poland_returned_emigrant'); p.returnHome()
          p.setMem('polDepUK', true)
        },
      },
    ],
    effect: null,
  },

  // ── SMOLENSK CONSPIRACY POLARIZATION ──────────────────────────────────────

  {
    id: 'pol_dep_smolensk_conspiracy',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2014 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      G.flags.has('smolensk_generation') &&
      !G.mem?.polDepSmolenskConspiracy,
    text: 'April 2010, and the president\'s plane goes down at Smolensk in fog. The Russian and Polish investigations both find pilot error, and his twin brother does not accept it, and by the time his party is in power the commission is reopened to find an explosion, and the graves are opened. The grief, which was shared, has been divided in two, and the two halves are the two electorates. Every conversation about Smolensk is now a conversation about which Poland you live in.',
    choices: [
      {
        text: 'The evidence points to accident. The politicization is wrong.',
        tag: null,
        outcome: 'You hold the position. The position becomes difficult at family gatherings where others hold the other position. Smolensk is no longer only a tragedy. It is a test of political identity.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.addFlag('smolensk_accident_view')
          p.setMem('polDepSmolenskConspiracy', true)
        },
      },
      {
        text: 'Russia had motive. The official account is too convenient.',
        tag: null,
        outcome: 'The suspicion is not irrational given the history. The context — flying to Katyń, crashing in Russia — has a certain shape. Whether it points to assassination the evidence does not confirm. The suspicion stays with you regardless.',
        effect: (p) => {
          p.m -= 6
          p.r += 6
          p.addFlag('smolensk_conspiracy_view')
          p.setMem('polDepSmolenskConspiracy', true)
        },
      },
    ],
    effect: null,
  },

]
