// events_italy_depth.js — Italy depth arc
// WWII resistance, DC-PCI anomaly, Vatican II, Second Republic,
// immigration reception (badanti), spread crisis 2011, Meloni 2022,
// organized crime as childhood background

export const ITALY_DEPTH_EVENTS = [

  {
    id: 'it_dep_resistenza',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1943 && G.currentYear <= 1946 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.itResistenza,
    text: 'The Armistice of September 8, 1943. The Italian army dissolves overnight. German forces occupy the north and center; Mussolini\'s puppet Republic of Salò governs what the Germans allow. In the mountains — the Apennines, the Langhe, the Ossola valley — the partigiani form: communist brigades and Catholic brigades and Action Party brigades and independent bands, fighting the Germans and the fascists and occasionally each other. By April 25, 1945 — the Liberation — there are 150,000 of them armed. The Resistance becomes the story Italy tells itself for the next seventy years: the story of how Italy chose the right side at the end.',
    choices: [
      {
        text: 'You go to the mountains. The choice is made before you have thought it fully through.',
        tag: null,
        outcome: 'You are cold and hungry and occasionally in combat and you survive, or you do not. If you survive you return to a country that is still deciding what it wants to be, and you have something in your hands that most people do not have.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.karma += 12; p.r += 6; p.addFlag('italy_partisan_veteran'); p.addFlag('italy_resistenza_generation'); p.setMem('itResistenza', true); },
      },
      {
        text: 'You do not go. You survive where you are — not as a collaborator, but not as a partisan.',
        tag: null,
        outcome: 'The grey zone: most people are in it. Not denouncing, not resisting. Getting through. The Republic will divide itself between chi ha fatto and chi non ha fatto. The distinction will matter, and the distinction will be selectively applied.',
        effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('italy_resistenza_generation'); p.setMem('itResistenza', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_dc_pci_anomalia',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1948 && G.currentYear <= 1990 &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.itDcPci,
    text: 'The Italian anomaly. The PCI — the Partito Comunista Italiano — is the largest Communist Party in Western Europe. Under the Cold War convention known as the conventio ad excludendum, it cannot govern Italy regardless of votes received. In 1976 the PCI wins 34.4 percent and still does not govern. Berlinguer proposes the Compromesso Storico — a historic compromise with the DC. Aldo Moro is murdered by the Brigate Rosse before it can happen. The PCI under Berlinguer becomes something different from Moscow: Eurocommunist, the moral opposition. You vote for a party that cannot win in the way winning works, or you vote for a party that governs through corruption and anticommunism.',
    choices: [
      {
        text: 'You are PCI — the tessera in the pocket, the Feste dell\'Unità, the permanent opposition.',
        tag: null,
        outcome: 'You are PCI for the years it remains PCI. In 1991 it becomes the PDS at a congress in Rimini. The name change happens. You were not asked.',
        effect: (p) => { p.m += 3; p.karma += 5; p.r += 6; p.addFlag('pci_generation'); p.setMem('itDcPci', true); },
      },
      {
        text: 'You are DC — or centrist — and the exclusion of the Communists is the architecture of the system.',
        tag: null,
        outcome: 'The architecture holds until 1992. What was underneath it — the tangenti, the systematic corruption that financed the parties — is revealed by Mani Pulite. The DC governed for forty-five years on money from bribes. This was always true. The revelation changes the weight of the truth.',
        effect: (p) => { p.m += 2; p.r += 5; p.addFlag('dc_generation'); p.setMem('itDcPci', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_vaticano_due',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1962 && G.currentYear <= 1978 &&
      G.age >= 10 && G.age <= 30 &&
      G.religion?.startsWith('christian') &&
      !G.mem?.itVaticano,
    text: 'Vatican II opens in October 1962 and closes in 1965. The Mass is now in Italian: the Latin that was uniform across the world becomes the language you actually speak. The priest faces the congregation. The altar turns. The window that John XXIII described throwing open: the air of the world comes in. In Italy, where the Church and daily life are inseparable in ways they are not elsewhere, the changes land differently. The divorce referendum of 1974 — Catholics vote 60 percent to keep divorce, against the position of the bishops. The population that prays is not the population that obeys.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 3; p.addFlag('postconciliar_generation'); p.setMem('itVaticano', true); },
  },

  {
    id: 'it_dep_seconda_repubblica',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1994 && G.currentYear <= 2006 &&
      G.age >= 28 && G.age <= 60 &&
      G.flags.has('mani_pulite_generation') &&
      !G.mem?.itSecondaRep,
    text: 'After Mani Pulite, the Second Republic was supposed to happen. The old parties were gone. The new parties would be different. But Berlusconi in 1994 is not a clean break — he arrives with his television channels and his Milan AC and his Fininvest apparatus already assembled. The center-left coalitions reorganize: Ulivo, then Prodi, then Rutelli. The institutional reforms never arrive. The electoral law is modified repeatedly. Italy has nine governments in fifteen years after Mani Pulite and the First Republic is gone and the Second Republic has not arrived and the space between them becomes permanent.',
    choices: [
      {
        text: 'Something different could have been built here. The moment was real and it passed.',
        tag: null,
        outcome: 'The moment passed. What happened instead: Berlusconi three times, Lega Nord, the D\'Alema interlude, the reform that was voted down. The space between the First and Second Republic is the republic Italy actually lives in.',
        effect: (p) => { p.m -= 5; p.r += 7; p.addFlag('seconda_repubblica_disillusion'); p.setMem('itSecondaRep', true); },
      },
      {
        text: 'The First Republic was corrupt and stable. What replaced it is unstable and also corrupt.',
        tag: null,
        outcome: 'The comparative analysis — First versus Second Republic — runs through Italian political conversation for thirty years. The comparison is not in the Second Republic\'s favor. The corruption continues; the stability was lost.',
        effect: (p) => { p.m -= 4; p.r += 8; p.addFlag('seconda_repubblica_disillusion'); p.setMem('itSecondaRep', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_badanti',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 30 && G.age <= 65 &&
      !G.mem?.itBadanti,
    text: 'Italy becomes an immigration country in the same decade its emigration generation retires. The badante — the live-in carer, typically Romanian or Ukrainian or Filipino — becomes the Italian elderly care system. Without them the system does not function: the state provides almost nothing, the family is expected to provide everything, and the family is smaller and more dispersed than it was. In the same generation whose parents went to Germany as Gastarbeiter, a Romanian woman is living in the spare room caring for the grandmother. Italy\'s relationship to its immigrants is mediated by this dependency. The hostility and the acceptance are both real simultaneously.',
    choices: [
      {
        text: 'The person caring for your parent is from somewhere else. You find a way to acknowledge this.',
        tag: null,
        outcome: 'The acknowledgment is small and genuine. The relationship has no established category: not employer and employee exactly, not family, something invented by the circumstances. The woman who is with your mother every day for four years is in the room at the end.',
        effect: (p) => { p.m -= 3; p.karma += 6; p.r += 4; p.addFlag('italy_immigration_witness'); p.setMem('itBadanti', true); },
      },
      {
        text: 'The arrangement is what it is — functional, necessary, at arm\'s length.',
        tag: null,
        outcome: 'Functional, necessary, at arm\'s length. The person doing the work notices the arm\'s length. You notice it later, when it is over, and the noticing is information about the arrangement and about you.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('italy_immigration_witness'); p.setMem('itBadanti', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_spread',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 2011 && G.currentYear <= 2013 &&
      G.age >= 25 &&
      !G.mem?.itSpread,
    text: 'November 2011. The spread — the differential between Italian and German government bond yields — reaches 575 basis points. The spread is not a number anyone knew before this year; it becomes the number on every news programme. Berlusconi resigns. Mario Monti, a technocrat, is appointed Prime Minister without election. He governs with a cabinet of professors and bankers and passes the Salva Italia decree: pension reform, IMU property tax on primary residences, austerity. The retirement age rises. Esodati appear as a category — workers who left their jobs expecting a pension that has now changed. Italy is governed by people who were not elected to save something that may not be saveable.',
    choices: [
      {
        text: 'The austerity is necessary. The alternative is Greece.',
        tag: null,
        outcome: 'The austerity is implemented. GDP falls 2.4 percent in 2012 and 1.7 in 2013. The deficit falls. The spread falls. Whether the medicine was worth the illness is the question that runs through the following decade.',
        effect: (p) => { p.m -= 6; p.w -= 4; p.r += 5; p.addFlag('italy_austerity_generation'); p.setMem('itSpread', true); },
      },
      {
        text: 'An unelected government implementing structural reforms is not democracy, whatever the emergency.',
        tag: null,
        outcome: 'Grillo and the Five Star Movement win 25 percent in 2013 on exactly this argument. The technocratic interlude created the political vacuum. Something was waiting for it.',
        effect: (p) => { p.m -= 7; p.r += 7; p.addFlag('italy_austerity_generation'); p.setMem('itSpread', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_meloni_2022',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      !G.mem?.itMeloni,
    text: 'October 2022. Giorgia Meloni becomes Prime Minister — the first woman to hold the office. Her party, Fratelli d\'Italia, traces its lineage through the post-fascist MSI and Alleanza Nazionale. The flame in the party logo is the MSI flame. In her acceptance speech she is Giorgia — mother, Christian, Italian — and each noun is deliberate. European leaders respond with alarm and pragmatism. In Italy the vote is read differently: protest vote, patriot vote, anti-immigration vote, and vote by people who have not voted in a generation. The first woman prime minister arrives from the right, and the left does not know what to do with the fact.',
    choices: [
      {
        text: 'The vote for Meloni is a vote against the system that failed Italy. You understand it, even if you didn\'t cast it.',
        tag: null,
        outcome: 'The government that follows is more moderate than its genealogy — Meloni in office is not Meloni on the opposition benches. Whether this is reassuring or disappointing depends on what was voted for.',
        effect: (p) => { p.r += 5; p.addFlag('italy_meloni_2022'); p.setMem('itMeloni', true); },
      },
      {
        text: 'The lineage matters. A party descended from the MSI governing Italy is a specific fact that doesn\'t dissolve.',
        tag: null,
        outcome: 'The lineage matters and the government does what it does. Both things are true simultaneously, and the truth of both is the argument that runs through the full legislature.',
        effect: (p) => { p.m -= 4; p.r += 6; p.karma += 3; p.addFlag('italy_meloni_2022'); p.setMem('itMeloni', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_dep_ndrangheta',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.flags.has('mezzogiorno_born') &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.itNdrangheta,
    text: 'The organized part of life in Calabria or Campania is not hidden — it is simply not spoken of in certain ways. The cousin who has a car when no one has a car. The business on the corner that stays open when others close. The man whose name your father does not say without something that is not quite respect and not quite fear. At school they teach nothing about this. At home no one teaches about it either. You absorb the geometry of what is avoided: who you do not look at directly, what streets you do not walk at night, the question of whether something belongs to someone that you do not ask aloud.',
    choices: null,
    effect: (p) => { p.r += 4; p.addFlag('mezzogiorno_organized_crime_texture'); p.setMem('itNdrangheta', true); },
  },

]
