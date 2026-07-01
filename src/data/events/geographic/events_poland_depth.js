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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1990 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem?.polDepKatyn,
    text: 'April 13, 1990. Mikhail Gorbachev acknowledges that the Soviet NKVD carried out the Katyń massacre. Spring 1940: 22,000 Polish officers, police, intellectuals, and educated reservists, executed in the forests of Smolensk Oblast, Kalinin, Kharkiv. Shot in the back of the head with a German pistol. The Soviets blamed the Nazis for fifty years. Your family may have known someone who did not come back from the east. The official acknowledgment arrives half a century after the event. It is not a surprise. It is something else: the confirmation of something you have always known and been denied the right to say officially.',
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
        outcome: 'The scale was known incompletely from samizdat and Radio Free Europe. Now the figure is official. You are angry with a specific shape: fifty years of lies, confirmed exactly as you always suspected.',
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1944 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.polDepUprisingChild,
    text: pick([
      'August 1, 1944. The Warsaw Uprising begins. The Home Army — the Armia Krajowa — rises against the German occupation. The Soviets are across the Vistula, close enough to hear the fighting. They stop and wait. For sixty-three days the AK holds parts of Warsaw while the Soviets wait and the Allies argue about supply lines. In October, the city surrenders. The Germans then systematically burn what remains. Two hundred thousand dead. 85 percent of Warsaw destroyed, building by building, street by street. You are small enough that what you know of it is what the adults say in the specific register adults use when the children are listening.',
      'The Powstanie Warszawskie: your parents\' generation\'s wound. Sixty-three days. The losses are in the faces of everyone you know who was old enough to be there — the particular blankness that arrives when August 1 is mentioned, the way conversations stop and then restart. You inherit the wound secondhand, which is its own shape of carrying it.',
    ]),
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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1944 && G.currentYear <= 1947 &&
      G.age >= 16 &&
      !G.mem?.polDepUprisingAdult,
    text: 'August 1944. You are in Warsaw or you are not. If you are in Warsaw: sixty-three days of street fighting, the cellars, the runners with messages, the water from the wells, the Soviets across the river not moving. If you are not in Warsaw: the radio silence, then the news, then the silence that is the sound of what happened to the city. The uprising fails. The Soviets cross the river in January when the city is gone. The Home Army is declared a criminal organization by the new government. The people who fought in it will spend decades unable to say so officially.',
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
        outcome: 'The rubble and the January cold and the reorganization of what was a city. The communists arrive with their lists and their categories. You learn to navigate the new hierarchy, which is different from the old hierarchy and hostile to some of what you survived.',
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.polDepKresy,
    text: 'Your family came from somewhere that is no longer Poland. Lwów — now Lviv, Ukraine. Wilno — now Vilnius, Lithuania. The eastern borderlands, the Kresy, transferred to the Soviet Union by the 1945 Yalta settlement. Four million Poles expelled westward, moved into houses in Wrocław (formerly Breslau), Gdańsk (formerly Danzig), Szczecin (formerly Stettin) — German cities that are now Polish cities because their German residents were expelled into Germany simultaneously. Your parents\' city does not appear on any current map under the name they used for it. They describe it with a specific precision about what was on which street, which is how you know they will never stop needing it.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1960 && G.currentYear <= 1980 &&
      G.age >= 18 &&
      !G.mem?.polDepNowaHuta,
    text: 'Nowa Huta was designed as the model socialist city. Built outside Kraków from 1949: apartment blocks, the Lenin steelworks, a theatre, a department store, public squares. Deliberately built without a church — the first Polish city in a thousand years without a church. The workers who moved to Nowa Huta to work in the steelworks wanted a church. The state refused. The workers built one on a plot where the state had put up a sign saying "future site of school." They built the cross first and then the church around it. The battle over the cross — the state trying to remove it, the workers defending it — ran for years. In 1977, the Ark of the Lord Church is consecrated by Karol Wojtyła, Cardinal of Kraków. The following year he is Pope.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2001 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.polDepJedwabne,
    text: 'In 2001, the historian Jan Gross publishes Neighbors. The subject: the massacre of the Jewish community of Jedwabne on July 10, 1941. The perpetrators were not the German occupiers — they were the Polish neighbors of the Jewish residents. 340 people burned alive in a barn. The Institute of National Remembrance investigation confirms Polish perpetration. The official acknowledgment arrives sixty years after the event. President Kwaśniewski apologizes at the ceremony in Jedwabne. A significant part of Polish public opinion responds with rejection, counter-claims, the insistence that the Germans must have been responsible. You are somewhere in the middle of this argument, which is an argument about what Poland is and what Poles did and what it means to know.',
    choices: [
      {
        text: 'You accept what the evidence shows. This is part of what happened.',
        tag: null,
        outcome: 'The acceptance is not self-flagellation — it is the capacity to hold the truth about what people are capable of, which is the precondition for understanding history at all. The acceptance costs something. It costs more for people who would rather not know.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2015 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      !G.mem?.polDepPis,
    text: 'October 2015. Prawo i Sprawiedliwość wins the parliamentary election with an outright majority. In the following months: the Constitutional Tribunal packed, the state media turned into government media, the independent judiciary systematically dismantled, the public broadcaster reorganized. The European Commission opens Article 7 proceedings. From the outside it looks like democratic backsliding. From the inside it looks like two different things depending on where you live — "Poland A" (the cities, the university towns, the young mobile educated) and "Poland B" (the smaller towns, the rural parishes, the people for whom the EU has been a background condition rather than a personal project). You are in one of these Polands. You know which.',
    choices: [
      {
        text: 'The rule of law matters more than any particular policy. This is wrong.',
        tag: null,
        outcome: 'You march in the 2017 protests. You follow the Committee for the Defence of Democracy, KOD. You watch the judiciary independence removed court by court and feel the specific helplessness of watching an institution disassemble itself under political instruction.',
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
        outcome: 'The Tusk years were cosmopolitan but they did not reach your town. The 500+ child benefit is real. The sense that someone is finally speaking for people like you is real. Whether the Constitutional Tribunal matters to your daily life is a different question from whether it matters in principle.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2004 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.polDepUK,
    text: 'The UK opened its labour market immediately when Poland joined the EU in 2004, when the other major economies waited. In the next three years nearly a million Poles arrive. The Polish deli on the high street. The Polish Saturday school for the children. The Facebook group for Poles in Bristol, in Manchester, in Edinburgh. The wages are three or four times what they are in Kraków or Wrocław. You do the mental arithmetic about what you are saving and what you are building and whether you are going back. The arithmetic changes every few years. Brexit changes the arithmetic in a way that makes the calculation harder than it was before.',
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
          p.addFlag('emigrated')
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
          p.addFlag('poland_returned_emigrant')
          p.setMem('polDepUK', true)
        },
      },
    ],
    effect: null,
  },

  // ── SMOLENSK CONSPIRACY POLARIZATION ──────────────────────────────────────

  {
    id: 'pol_dep_smolensk_conspiracy',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2014 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      G.flags.has('smolensk_generation') &&
      !G.mem?.polDepSmolenskConspiracy,
    text: 'The Smolensk crash of 2010 kills Lech Kaczyński and ninety-five others. The Russian investigation finds pilot error in poor visibility. The Polish commission agrees. Jarosław Kaczyński, the President\'s twin brother, does not accept this. By 2014 he is publicly claiming assassination. By 2016, when PiS is in government, the Polish state commission is reopened with a mandate to find evidence of an explosion. The exhumations begin. The grief, which was shared, has been divided into two political categories: those who accept the accident investigation and those who believe in the assassination, which is also the PiS electorate and the non-PiS electorate. Every conversation about Smolensk is now also a conversation about which Poland you live in.',
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
        outcome: 'The suspicion is not irrational given the history. The specific context — flying to Katyń, crashing in Russia — has a certain shape. Whether it points to assassination the evidence does not confirm. The suspicion stays with you regardless.',
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
