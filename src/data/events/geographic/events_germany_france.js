// Germany and France character events
// Germany: Gastarbeiter arc, DDR daily life, reunification, refugee crisis 2015
// France: Algerian war, banlieue texture, Charlie Hebdo/Bataclan 2015

export const GERMANY_FRANCE_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // GERMANY
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ger_wirtschaftswunder',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1950 && G.currentYear <= 1967 &&
      G.age >= 18 && G.age <= 45 &&
      !G.flags.includes('ddr_generation') &&
      !G.mem?.gerWirtschaftswunder,
    text: 'The Wirtschaftswunder — the economic miracle. West Germany in the 1950s: from rubble to the fifth largest economy in the world by the end of the decade. The Volkswagen Beetle and the Fresswelle — the feeding wave, people eating well after years of rationing and postwar shortage. Currency reform in 1948: the old Reichsmark exchanged for the Deutsche Mark, 10:1, and the shop windows filling within hours. The Marshall Plan, the Adenauer government, the factory work that continues through the night. The country rebuilds itself at a speed that requires not asking too many questions yet about what it is rebuilding from.',
    choices: [
      {
        text: 'The prosperity is real and the rebuilding feels like a new beginning.',
        tag: null,
        outcome: 'The beginning is real. The full Vergangenheitsbewältigung — the coming to terms with the past — will take another two decades to begin in earnest. For now, the Beetle and the washing machine and the television arrive in the house.',
        effect: (p) => { p.m += 6; p.w += 5; p.addFlag('wirtschaftswunder_generation'); p.setMem('gerWirtschaftswunder', true); },
      },
      {
        text: 'The rebuilding moves very fast and you notice what it is moving past.',
        tag: null,
        outcome: 'The moving-past is not accidental. The economy is built by people who were adults during the previous twelve years and who find it easier to build than to reckon. The reckoning does not disappear — it waits for the next generation.',
        effect: (p) => { p.m += 3; p.r += 5; p.addFlag('wirtschaftswunder_generation'); p.addFlag('inner_dissent'); p.setMem('gerWirtschaftswunder', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_gastarbeiter_arrival',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1960 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 35 &&
      ['turkish', 'yugoslav', 'italian', 'greek'].includes(G.ethnicity) &&
      !G.mem?.gerGastarbeiter,
    text: 'The contract is for two years. The Deutsche Bundesbahn from Munich Hauptbahnhof to the factory town — you learn the route. The Gastarbeiter programme: Germany needs workers, Turkey has workers who need wages. The contract says two years and then home. Anwerbestopp in 1973: the recruitment stops after the oil crisis. But the workers are already here. The families come to join them. The two years become twenty years. The two years become a life.',
    choices: [
      {
        text: 'You send money home and plan to return. The plan keeps extending.',
        tag: null,
        outcome: 'The plan extends. The children grow up in Germany. The home you planned to return to is not quite the home you left. Both places have become partial.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('gastarbeiter_generation'); p.addFlag('remittance_sender'); p.setMem('gerGastarbeiter', true); },
      },
      {
        text: 'You decide early this is your country now. The contract was for two years; your life is not.',
        tag: null,
        outcome: 'The decision is made before anyone is ready for it, including Germany. The paperwork for permanent residency exists but does not welcome you. You navigate it.',
        effect: (p) => { p.m -= 3; p.e += 4; p.r += 4; p.addFlag('gastarbeiter_generation'); p.addFlag('settled_migrant'); p.setMem('gerGastarbeiter', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_turkish_german_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1975 && G.currentYear <= 2005 &&
      G.age >= 13 && G.age <= 20 &&
      G.ethnicity === 'turkish' &&
      !G.mem?.gerTurkishGerman,
    text: 'You were born in Germany or you came young enough that Germany is your first language. At school you are Turkish. In Turkey, when the family visits, you are German. The categories do not have a slot for what you actually are. The German passport application asks about Abstammung — ancestry. The question is not about where you were born. The question is about who you descend from.',
    choices: [
      {
        text: 'You hold both, which means being neither fully — and making peace with that.',
        tag: null,
        outcome: 'The peace is not certainty. It is the specific comfort of having stopped waiting for a category that fits. You built the category.',
        effect: (p) => { p.m -= 3; p.e += 5; p.r += 4; p.addFlag('hyphenated_german'); p.setMem('gerTurkishGerman', true); },
      },
      {
        text: 'You emphasise Turkish identity. Germany has made the alternative difficult.',
        tag: null,
        outcome: 'The emphasis is a response to a rejection. You know this. The identity is nonetheless real and not only reactive.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('hyphenated_german'); p.addFlag('diaspora_identity'); p.setMem('gerTurkishGerman', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_ddr_daily_life',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1960 && G.currentYear <= 1989 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.gerDDR,
    text: 'East Germany: the FDJ blue shirt, the Pioneer meetings, the portraits of Honecker and Brezhnev in the school hall. The Trabant, which you might have a number in the queue for in ten years. The queue for the Trabant is the shape of the economy. At school you learn that the other Germany is the class enemy. Your teacher says this in a tone that does not invite examination. The examination happens at home, quietly, if at all.',
    choices: [
      {
        text: 'You absorb the official version. It is the only version available to you.',
        tag: null,
        outcome: 'The version is thorough and consistent and does not prepare you for 1989. The unprepared encounter with 1989 is its own education.',
        effect: (p) => { p.m -= 3; p.addFlag('ddr_generation'); p.setMem('gerDDR', true); },
      },
      {
        text: 'At home, the official version is spoken around. You learn to read the silences.',
        tag: null,
        outcome: 'The silence-reading is a skill that outlasts the DDR. The skill has varying applicability in the country that follows.',
        effect: (p) => { p.m -= 4; p.e += 5; p.addFlag('ddr_generation'); p.addFlag('learned_silence'); p.setMem('gerDDR', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_reunification_1990',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 1990 && G.currentYear <= 1993 &&
      G.age >= 14 &&
      !G.mem?.gerReunification,
    text: (G) => {
      if (G.flags.includes('ddr_generation')) {
        return 'October 3, 1990. The country you grew up in no longer exists on maps. The street names are changing. The bosses are changing. The currency changed in July — the West German mark at one-to-one for the first 2,000, then two-to-one, which is how the economy was priced. The factories in the east cannot compete at West German prices. Some will close. Treuhandanstalt is the word for the agency that decides which ones.'
      }
      return 'October 3, 1990. Germany is one country. The people from the east arrive and they are German and also not the Germany you knew. The differences are small and large simultaneously: the products they recognise, the prices they expect, the things they expected to find in the west that the west does not actually have. The wall fell a year ago and there is still a wall, which is a different kind of wall.'
    },
    choices: [
      {
        text: 'The reunification is an extraordinary historical moment you embrace.',
        tag: null,
        outcome: 'You embrace it. The costs arrive over the following years — the unemployment in the east, the "Ostalgie" — but the moment itself was real.',
        effect: (p) => { p.m += 8; p.addFlag('reunification_generation'); p.setMem('gerReunification', true); },
      },
      {
        text: 'The reunification produces specific losses you did not expect.',
        tag: null,
        outcome: 'The things that are lost are real. So is the difficulty of saying this in a context where the fall of the wall is a world-historical triumph. You say it carefully.',
        effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('reunification_generation'); p.setMem('gerReunification', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_refugee_crisis_2015',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 2015 && G.currentYear <= 2018 &&
      G.age >= 18 &&
      !G.mem?.gerRefugees,
    text: 'Summer 2015. Angela Merkel says "Wir schaffen das" — we can do this. One million people arrive in Germany over the year. Willkommenskultur: the volunteers at the train stations with food and clothing, the translation apps, the local initiatives. Then: the Cologne New Year attacks, the AfD entering the Bundestag for the first time in 2017, PEGIDA marches in Dresden. The welcome and the backlash coexist. The backlash becomes the governing political fact. "Wir schaffen das" becomes a phrase with contested ownership.',
    choices: [
      {
        text: 'You volunteer, or you support the Willkommenskultur actively.',
        tag: null,
        outcome: 'You help where you can. The political situation in subsequent years makes this a position that requires defending. You defend it.',
        effect: (p) => { p.m += 3; p.karma += 8; p.addFlag('willkommenskultur_generation'); p.setMem('gerRefugees', true); },
      },
      {
        text: 'You are uncertain or resistant. The pace and scale concerns you.',
        tag: null,
        outcome: 'The concern is real and is also shared with people whose concerns are different from yours. The political uses made of your concern are sometimes different from your concern.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('german_migration_debate'); p.setMem('gerRefugees', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ger_nsu_murders_2011',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Germany' &&
      G.currentYear >= 2011 && G.currentYear <= 2016 &&
      G.age >= 18 &&
      (G.ethnicity === 'turkish' || G.ethnicity === 'greek') &&
      !G.mem?.gerNSU,
    text: 'November 2011. Two members of the Nationalsozialistischer Untergrund — the NSU — die in Zwickau and a third turns herself in. The files reveal what they did from 2000 to 2011: nine Turkish-German and one Greek-German small business owners murdered across Germany. Two police officers killed. Fourteen bank robberies. In the decade between the first murder and this discovery, the police investigation was focused on the victims\' families — drug connections, protection rackets, "honour killings." The police nickname for the murders was Dönermorde. "Kebab murders." Your community buried nine of their own while the state investigated the bereaved. The Verfassungsschutz files related to the NSU were ordered shredded the week after the story broke.',
    choices: [
      {
        text: 'You knew one of the families. Or you knew someone who knew one.',
        tag: null,
        outcome: 'The specific grief and the specific rage arrive together: ten years of murders, ten years of being told it was your community\'s fault, the files being shredded the week the truth came out.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('nsu_generation'); p.addFlag('nsu_mourned'); p.setMem('gerNSU', true); },
      },
      {
        text: 'You follow it from inside the Turkish-German community. The pattern was always there.',
        tag: null,
        outcome: 'The pattern — right-wing violence, institutional indifference or worse, the community blamed — was not a surprise. The revelation was the scale of what had been kept from the scale of people who had known.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('nsu_generation'); p.setMem('gerNSU', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FRANCE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'fr_mai_68',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'France' &&
      G.currentYear === 1968 &&
      G.age >= 15 && G.age <= 35 &&
      !G.mem?.frMai68,
    text: 'May 3, 1968. The students at the University of Paris at Nanterre occupy the administration building. The rector calls the police. By the weekend it is the Sorbonne. The police enter the courtyard and the photographs of the beatings travel. The barricades go up in the Latin Quarter: paving stones, overturned cars, the specific vocabulary of street fighting. Then the workers: ten million people on strike — the largest general strike in French history. De Gaulle disappears briefly to Baden-Baden to consult with the French army in Germany. He returns May 30, dissolves the National Assembly, gives a radio address. In June his party wins its largest parliamentary majority ever. Mai 68 reorganises French culture, sexual norms, university structure, the language of public space, and the left. It does not overthrow the government. Both things happen simultaneously.',
    choices: [
      {
        text: 'You are at the barricades, or in the factories, or in both places across the weeks.',
        tag: null,
        outcome: 'The feeling of those weeks is a specific feeling. The combination of grief and possibility and exhaustion and the sense that something could be otherwise. De Gaulle wins in June. You know what you felt in May.',
        effect: (p) => { p.m += 8; p.karma += 8; p.r += 4; p.addFlag('mai_68_generation'); p.addFlag('political_active'); p.setMem('frMai68', true); },
      },
      {
        text: 'You watch it from a distance — sympathetic or alarmed or both.',
        tag: null,
        outcome: 'The country that comes out of 1968 is a different country from the one that went in, even if the government wins. Some of that difference is visible in what you do next.',
        effect: (p) => { p.m += 4; p.r += 4; p.addFlag('mai_68_generation'); p.setMem('frMai68', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'fr_algerian_war_soldier',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'France' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1954 && G.currentYear <= 1962 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.frAlgeriaWar,
    text: 'Algeria is not a colony. It is three French departments. This is the official position. The war in Algeria is not a war. It is "les événements" — the events. You are conscripted into the events. In the mechta — the village sweeps — the orders are clear. The question of what the orders are asking you to do is something you will be asking for the rest of your life. France will not officially call it a war until 1999. You were there in a war that did not have a name.',
    choices: [
      {
        text: 'You follow orders. You survive. You come home.',
        tag: null,
        outcome: 'You come home. You do not talk about what you did there. The not-talking lasts decades. The country does not ask.',
        effect: (p) => { p.m -= 12; p.r += 8; p.h -= 5; p.addFlag('algerian_war_veteran'); p.addFlag('carries_something_unsaid'); p.setMem('frAlgeriaWar', true); },
      },
      {
        text: 'You refuse or resist. The army has a category for this.',
        tag: null,
        outcome: 'The category has consequences. You carry those consequences and the knowledge of what you refused.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 5; p.addFlag('algerian_war_conscientious'); p.setMem('frAlgeriaWar', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'fr_banlieue_second_gen',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'France' &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 13 && G.age <= 22 &&
      ['north_african', 'algerian', 'moroccan', 'tunisian', 'sub_saharan'].includes(G.ethnicity) &&
      !G.mem?.frBanlieue,
    text: 'Your parents came to France for work. You were born here. On the papers you are French. In the city centre, in the job application process, in the police stop on the way to the metro, the papers are a different reality from the reality. The banlieue — the suburb — has its own geography: the HLM tower blocks, the local shop, the school where the teachers are there or they are not there. The France of liberté, égalité, fraternité is the same country. The distance between the two is what you have grown up measuring.',
    choices: [
      {
        text: 'You navigate both Frances. The navigation is a skill.',
        tag: null,
        outcome: 'You are fluent in the France of the banlieue and fluent in the France of the city centre. The double fluency is invisible and exhausting and also a form of resource.',
        effect: (p) => { p.e += 5; p.m -= 4; p.r += 4; p.addFlag('banlieue_generation'); p.setMem('frBanlieue', true); },
      },
      {
        text: 'The gap between the two Frances is the thing you refuse to bridge alone.',
        tag: null,
        outcome: 'The refusal is political and correct and costs you things in the specific rooms where bridge-crossing is the cost of entry.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 4; p.addFlag('banlieue_generation'); p.addFlag('political_active'); p.setMem('frBanlieue', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'fr_charlie_hebdo_bataclan_2015',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'France' &&
      G.currentYear === 2015 &&
      G.age >= 12 &&
      !G.mem?.frAttacks2015,
    text: (G) => {
      if (['north_african', 'algerian', 'moroccan', 'tunisian'].includes(G.ethnicity)) {
        return 'January 7: twelve people killed at Charlie Hebdo. November 13: one hundred and thirty at the Bataclan and the café terraces. The people who did this share your family\'s religion in the form they have taken it. You share the name of their religion with them and nothing else about their project. In the days after January you are asked, implicitly and explicitly, to account for yourself. You account for yourself. You go on accounting for yourself. The accounting is open-ended.'
      }
      return 'January 7, 2015: twelve dead at Charlie Hebdo. "Je suis Charlie." November 13: one hundred and thirty at the Bataclan, Stade de France, the café terraces of the 10th arrondissement. You know the terraces. You may have been to some of them. The randomness of the evening is part of what the attack is attacking: the ordinary evening out, the concert, the match. The target is the ordinary.'
    },
    choices: [
      {
        text: 'You are in Paris, or close to someone who was affected.',
        tag: null,
        outcome: 'The city changes in a way that takes years to fully see. The terraces slowly fill again. The filling-again is a form of answer.',
        effect: (p) => { p.m -= 12; p.h -= 4; p.r += 6; p.addFlag('paris_attacks_generation'); p.setMem('frAttacks2015', true); },
      },
      {
        text: 'You follow it from elsewhere in France.',
        tag: null,
        outcome: 'You are not in Paris but France is Paris in some register, and what happens to Paris happens to what France thinks it is.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('paris_attacks_generation'); p.setMem('frAttacks2015', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'fr_yellow_vests_2018',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'France' &&
      G.currentYear >= 2018 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      !G.mem?.frGiletsJaunes,
    text: 'November 2018. The gilets jaunes — the high-visibility vests that every French driver keeps in the car by law — become the uniform of a movement. The initial trigger is a fuel tax increase. The deeper trigger is the cost of living outside the major cities: the people who cannot afford the end of the month, who live where there is no public transport, who drive because there is no alternative and who now pay more for the petrol. Macron cancels the tax. The movement continues. It is not only about petrol.',
    choices: [
      {
        text: 'You are at a roundabout. This is your movement.',
        tag: null,
        outcome: 'The roundabout becomes the centre. The weeks stretch to months. Some demands are met; others are not. You stay.',
        effect: (p) => { p.m += 3; p.karma += 5; p.r += 4; p.addFlag('gilets_jaunes_generation'); p.addFlag('political_active'); p.setMem('frGiletsJaunes', true); },
      },
      {
        text: 'You observe it — the France that cannot see the France of the roundabout.',
        tag: null,
        outcome: 'The diagnosis the movement offers — the metropolitan/peripheral divide, the two Frances — is the diagnostic you have been applying since 2018.',
        effect: (p) => { p.e += 4; p.addFlag('gilets_jaunes_generation'); p.setMem('frGiletsJaunes', true); },
      },
    ],
    effect: null,
  },

]
