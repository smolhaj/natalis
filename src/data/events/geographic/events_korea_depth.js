// events_korea_depth.js
// South Korea depth: 1997 IMF crisis (외환위기), gold collection campaign,
// jeonse housing system, hell Joseon (헬조선), ppalli ppalli work culture,
// cheongyak apartment lottery, PC bang refuge, the IMF-childhood generation.

const isSouthKorea = (G) => G.currentCountry?.name === 'South Korea'

export const KOREA_DEPTH_EVENTS = [

  // ── 1997 IMF CRISIS ──────────────────────────────────────────────────────────

  {
    id: 'kr_dep_imf_crisis',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1997 && G.currentYear <= 1999 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.krImfCrisis,
    text: `November 1997. The government applies to the International Monetary Fund. The word that enters the language is simply 'IMF' — not 'the IMF crisis' or 'the foreign exchange crisis' but IMF alone, a noun that now means what happened. The won falls from 900 to 1,900 to the dollar in weeks. Companies that existed for thirty years close in a month. The chaebol lay off workers by the tens of thousands. The hiring that was assumed to continue — the companies that your father's generation joined and stayed at — stops. The social contract of the compressed development generation breaks in a single quarter and does not reassemble in the same form.`,
    choices: [
      {
        text: 'Your father or someone close loses their job.',
        tag: null,
        outcome: 'The house gets quieter in a specific way. The things that were certain stop being certain. You understand, at twenty-three or thirty-two, that the floor you thought was there was made of something different from what you thought.',
        effect: (p) => { p.m -= 12; p.r += 8; p.mo -= 2000; p.addFlag('kr_dep_imf_generation'); p.setMem('krImfCrisis', true) },
      },
      {
        text: 'Your household survives intact, but the country around you does not.',
        tag: null,
        outcome: 'The neighbour is selling furniture on the street. The friend from school\'s family has moved out of their apartment. You are inside the crisis through other people\'s faces. The stability you have is provisional in a way it was not before.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('kr_dep_imf_generation'); p.setMem('krImfCrisis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_dep_imf_childhood',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1997 && G.currentYear <= 2001 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.krImfChildhood,
    text: `You are too young to understand the word 'IMF' except as a word the adults use when they go quiet. What you understand is: the Saturday market trip doesn't happen this week, and the week after, and then it's not mentioned anymore. Your mother counts the rice more carefully. Your father comes home at a different hour and sits in a different way. The television runs the same images of queues and numbers falling. You learn to read the temperature of a household without being told what the temperature means. This is also a kind of education.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.r += 4; p.addFlag('kr_dep_imf_generation'); p.setMem('krImfChildhood', true) },
  },

  {
    id: 'kr_dep_gold_collection',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1998 && G.currentYear <= 1999 &&
      G.age >= 16 &&
      G.flags.has('kr_dep_imf_generation') &&
      !G.mem?.krGoldCollection,
    text: `The KBS broadcast begins the campaign in January 1998: donate your gold to pay off the national debt. The queues form at the banks. Housewives bring wedding rings. Veterans bring medals. Students bring the gold rings their grandparents gave them at their first birthday — the doljabi rings, the ritual objects of a first year of life. In three months, 3.5 million Koreans donate 227 tonnes of gold. It covers a fraction of the $58 billion owed. The economists will later say it made little material difference. The economists are not wrong about the numbers. They are describing a different thing from what the queues were.`,
    choices: [
      {
        text: 'Your family donates something.',
        tag: null,
        outcome: 'What goes into the envelope is specific — a ring, a necklace, something from a drawer. You bring it to the bank. The teller weighs it and thanks you. You do not see it again.',
        effect: (p) => { p.m += 4; p.karma += 6; p.mo -= 300; p.setMem('krGoldCollection', true) },
      },
      {
        text: 'You watch the campaign on television.',
        tag: null,
        outcome: 'The images of people in queues with gold in envelopes will stay with you longer than most images from that year. Something about it — the scale, the voluntariness, the smallness of what it could actually do — is the thing you keep turning over.',
        effect: (p) => { p.m += 2; p.r += 3; p.setMem('krGoldCollection', true) },
      },
    ],
    effect: null,
  },

  // ── JEONSE HOUSING ───────────────────────────────────────────────────────────

  {
    id: 'kr_dep_jeonse',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1985 &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.krJeonse,
    text: `Jeonse: instead of paying monthly rent, you pay a lump sum — sixty, seventy, eighty percent of the apartment's value — which the landlord uses and returns to you when you leave. In a country with few investment options and rising property prices, the landlord earns the investment return; you earn the right to live there. The system assumes property prices rise. It assumes the landlord can return the sum. When property prices fall and landlords cannot return deposits — jeonse fraud — entire neighbourhoods of young tenants lose their savings at once. You have navigated this calculation: how to raise the lump sum, whether to trust this landlord, what happens if the building changes hands.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.addFlag('kr_dep_jeonse_generation'); p.setMem('krJeonse', true) },
  },

  {
    id: 'kr_dep_jeonse_fraud',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2020 &&
      G.age >= 22 && G.age <= 40 &&
      G.flags.has('kr_dep_jeonse_generation') &&
      !G.mem?.krJeonseFraud,
    text: `The landlord cannot return the deposit. The building has been mortgaged above its value and the bank has first claim. The deposit you spent four years saving and three more years living carefully to preserve is now in a legal dispute that may take longer than you have. The government announces a jeonse fraud hotline. The jeonse fraud database. The compensation fund with conditions attached. You know someone — or you are the person — sitting in an apartment you cannot legally leave because leaving means losing your position in the queue for a deposit return that may or may not arrive.`,
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.mo -= 5000; p.setMem('krJeonseFraud', true) },
  },

  // ── PPALLI PPALLI AND OFFICE CULTURE ─────────────────────────────────────────

  {
    id: 'kr_dep_ppalli_ppalli',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1970 &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.krPpalliPpalli,
    text: `Ppalli ppalli: hurry hurry. The tempo of everything in this country runs faster than the tempo anywhere you have compared it to. The construction that in other countries takes a year takes three months. The internet speeds are the fastest in the world because the speed was decided on and built before most countries had the conversation. The food arrives before you have finished sitting down. The culture of urgency is not anxiety — it is the tempo of competence. You operate at this speed, have always operated at it, and notice it only when you are somewhere that moves differently, and then you are the impatient one in the room.`,
    choices: null,
    effect: (p) => { p.e += 2; p.h -= 2; p.setMem('krPpalliPpalli', true) },
  },

  {
    id: 'kr_dep_office_hierarchy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1975 &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.krOfficeHierarchy,
    text: `The hoesik: the mandatory after-work drinking with the team. The gwajang who must be out-drunk or carefully matched. The seonbae-hoobae relationship that organises the office as precisely as the org chart. You leave at eight because the gwajang is still here and leaving before the gwajang is an implicit statement about your commitment. You have learned the specific art of looking busy at seven-forty-five when you finished your work at five. This is not deception — it is the language the organisation speaks and you have learned it as you learn any language: by watching what works.`,
    choices: null,
    effect: (p) => { p.h -= 3; p.r += 3; p.e += 2; p.setMem('krOfficeHierarchy', true) },
  },

  // ── HELL JOSEON ──────────────────────────────────────────────────────────────

  {
    id: 'kr_dep_hell_joseon',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2013 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.krHellJoseon,
    text: `Hell Joseon. The word appears online around 2013 and spreads. Joseon is the old dynasty name — the Korea of rigid hierarchy and no social mobility. Hell is what the country feels like to a generation that studied harder than any generation in history and arrived in a labour market with a 3% chaebol hiring rate, a housing market calibrated to the savings of the previous generation, and a political class that uses 'youth' as a word in election manifestos but speaks a different language when governing. The word is not nihilism. It is a very specific naming of a very specific grievance, with historical precision.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('kr_dep_hell_joseon'); p.setMem('krHellJoseon', true) },
  },

  // ── APARTMENT LOTTERY ─────────────────────────────────────────────────────────

  {
    id: 'kr_dep_cheongyak',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1990 &&
      G.age >= 25 && G.age <= 45 &&
      !G.mem?.krCheongyak,
    text: `The cheongyak: the national housing subscription lottery for new apartments. You open the account as early as possible because the seniority points accumulate over time. You make the monthly deposits. You track the subscription scores required in the neighbourhoods where you might realistically live. The lottery is for new government-designated housing built below market price; winning is the difference between buying and renting forever. Families plan around the cheongyak as they plan around children's school districts. Your parents have been monitoring your score. When the results are announced, the website crashes.`,
    choices: [
      {
        text: 'You win the lottery.',
        tag: null,
        outcome: 'The apartment is smaller than you imagined and exactly where it is. The first night, you lie on the floor before the furniture arrives and the fact of it — this fixed point in a city of flux — is larger than the space.',
        effect: (p) => { p.m += 12; p.mo -= 8000; p.setMem('krCheongyak', true) },
      },
      {
        text: 'You do not win. You add to the subscription and try again.',
        tag: null,
        outcome: 'The year you apply and do not get it is the year the waiting becomes longer. You update the spreadsheet. You continue the deposits.',
        effect: (p) => { p.m -= 4; p.r += 3; p.setMem('krCheongyak', true) },
      },
    ],
    effect: null,
  },

  // ── PC BANG CULTURE ──────────────────────────────────────────────────────────

  {
    id: 'kr_dep_pc_bang',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1998 && G.currentYear <= 2012 &&
      G.age >= 13 && G.age <= 22 &&
      !G.mem?.krPcBang,
    text: `The PC bang: the internet café, open twenty-four hours, one thousand won per hour, red-lit, full of Starcraft. The game is played professionally with stadium audiences. The teenagers playing tonight are playing the same game the champions play on television. You are here because the hagwon is finished and home is not where you want to be, or because the friend group convened here at nine and it is now two in the morning and the last bus has gone and you are going to stay until five. The PC bang is what every closed society requires: a space outside the logic of the household and the school, ambient, unmonitored, operating on a different time.`,
    choices: null,
    effect: (p) => { p.m += 6; p.s += 2; p.setMem('krPcBang', true) },
  },

]
