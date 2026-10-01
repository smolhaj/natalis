// events_greece_depth.js — Greece depth arc (9 events)
// Covers: 1922 Asia Minor prosfyges family memory, Axis Occupation 1941-44,
// Katochi famine, EAM/ELAS resistance choice, Greek Civil War 1946-49,
// economic miracle 1960s, gastarbeiter emigration to Germany,
// civil war late reckoning.
// Complements events_greece_portugal.js (junta 1967-74, Polytechnic, debt crisis).

const IS_GREEK = (G) => G.character.country?.name === 'Greece'

export const GREECE_DEPTH_EVENTS = [

  // ─── THE PROSFYGES FAMILY — 1922 REFUGEE MEMORY ─────────────────────────

  {
    id: 'gr_prosfyges_family',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1930 && G.currentYear <= 1968 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.grProsfyges,
    text: (G) => {
      const year = G.currentYear
      const isClose = year <= 1940
      return isClose
        ? 'Your family came from somewhere else, Smyrna or Pontus or Thrace or the City, depending on which grandparent is talking: the Greeks of Asia Minor, driven out in 1922. Your grandmother still knows the name of her street there, the market, the smell of the harbour, and speaks of it precisely, the way people speak of places they have been told they cannot go back to. Prosfygas, refugee, is what your family is, and also what it carries.'
        : 'Your grandparents were prosfyges — the Greek refugees expelled from Asia Minor in 1922 after the Great Catastrophe. A million and a half people driven from cities their families had lived in for generations. The neighbourhood you live in was built for families like yours: the houses identical, the plots measured, the names of the streets often reproducing the names of the streets left behind. Your family still says *ekei* — over there — for a place they have never seen, meaning the place before the catastrophe, the place that was taken. Grief at this distance becomes something else: an orientation, a loyalty to a place that exists only in speech.'
    },
    context: 'About 1.2 million Orthodox Christians came to Greece in the 1923 population exchange after the Asia Minor catastrophe.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.e += 3; p.addFlag('greek_prosfyges_family'); p.setMem('grProsfyges', true) },
  },

  // ─── OXI — OCTOBER 28, 1940 ─────────────────────────────────────────────

  {
    id: 'gr_oxi_1940',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1941 &&
      G.age >= 16 &&
      !G.mem?.grOxi,
    text: 'October 28, 1940. Mussolini\'s ultimatum to Greece demands the right to occupy strategic positions inside the country. Metaxas — himself a dictator, himself not a democrat — says no. *Oxi.* The Italian army crosses from Albania into the mountains of Epirus and the Greek army, vastly smaller and far less equipped, pushes them back. Through November and December, Greek forces advance into Albania in temperatures that freeze the rifles. You know what the no means, and you know that the no was said, and you know that it holds — for now. The occupation comes later. The *Oxi* stands.',
    choices: [
      {
        text: 'You will serve. The mobilisation notices are posted.',
        tag: null,
        outcome: 'The Greek army pushes the Italians back through the Pindus mountains. The cold is extraordinary. The outcome is extraordinary. You are part of it.',
        effect: (p) => { p.m += 10; p.h -= 5; p.karma += 6; p.addFlag('greek_oxi_1940_gen'); p.setMem('grOxi', true) },
      },
      {
        text: 'You are too young, or not fit, or a woman — you watch the mobilisation from behind.',
        tag: null,
        outcome: 'The men leave and the country holds its breath. The mountains hold. For a winter, the answer is still *oxi*.',
        effect: (p) => { p.m += 6; p.karma += 3; p.addFlag('greek_oxi_1940_gen'); p.setMem('grOxi', true) },
      },
    ],
    effect: null,
  },

  // ─── THE KATOCHI — AXIS OCCUPATION, FAMINE WINTER 1941-42 ───────────────

  {
    id: 'gr_katochi',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1941 && G.currentYear <= 1944 &&
      G.age >= 10 &&
      !G.mem?.grKatochi,
    text: (G) => {
      const isChild = G.age <= 14
      const isYoungAdult = G.age >= 18
      if (isChild) {
        return 'The Germans came in April and by winter the food was gone. People collapse in the streets, and the carts come in the mornings for the ones who did not get up. Your mother keeps a little flour and does not tell you where. You learn hunger not as an idea but as something that takes up the place where thinking used to be. You are still alive, and you understand that this is not guaranteed.'
      }
      if (isYoungAdult) {
        return 'The occupation divides the country three ways, and Athens is German. The food, the transport, the buildings are requisitioned, and by the winter of 1941 the city is starving: queues round the block at the few soup kitchens, carts collecting the dead from the streets each morning. You are in the city, or in a village whose supply lines are cut, and ordinary life has been replaced by the system of survival, which works on other principles.'
      }
      return 'The winter of 1941, and the bread ration is a hundred grams a day and then nothing. Bodies in the streets at dawn. The soup kitchens, run by the Red Cross, the Church, and people who organise anyway, cannot meet the need. You survive the winter. What you learn here about food, and about what a government controls, does not leave you.'
    },
    context: 'The occupation famine of 1941-42 killed an estimated 100,000 or more people in the Athens area alone; the bread ration fell to around 100 grams a day.',
    choices: null,
    effect: (p) => { p.m -= 16; p.h -= 6; p.r += 6; p.addFlag('greek_katochi_generation'); p.setMem('grKatochi', true) },
  },

  // ─── EAM/ELAS — THE RESISTANCE CHOICE ───────────────────────────────────

  {
    id: 'gr_elas_resistance',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1942 && G.currentYear <= 1944 &&
      G.age >= 18 && G.age <= 38 &&
      G.flags.has('greek_katochi_generation') &&
      !G.mem?.grElasChoice,
    text: 'EAM — the National Liberation Front — is organising. The armed wing, ELAS, controls large parts of the countryside and has driven the Axis forces out of some regions. The communists dominate EAM but the coalition is broader: socialists, liberals, people who have no politics and simply want the Germans out. Joining means weapons training, sabotage, hiding from reprisals. Not joining means watching from the occupied city while the mountain villages are burned in retaliation for attacks. The divisions inside the resistance are also real.',
    choices: [
      {
        text: 'You join. The occupation has made the choice clear.',
        tag: null,
        outcome: 'The training happens at night. The operations happen at night. The reprisals come in the day — the Germans take hostages from the nearest village. The accounting of what the resistance costs is part of the resistance.',
        effect: (p) => { p.m -= 6; p.h -= 4; p.karma += 10; p.addFlag('greek_elas_member'); p.addFlag('political_active'); p.setMem('grElasChoice', true) },
      },
      {
        text: 'You help in other ways — hiding people, passing information, feeding fighters.',
        tag: null,
        outcome: 'Not holding a weapon does not mean not participating. The informal support network is what the armed resistance survives on. You are part of it, at the cost of what is always at stake.',
        effect: (p) => { p.m -= 4; p.karma += 7; p.addFlag('greek_elas_member'); p.setMem('grElasChoice', true) },
      },
      {
        text: 'You do not join. The reprisals fall on civilians and the arithmetic does not add up.',
        tag: null,
        outcome: 'You watch the resistance from outside it. The occupation continues. The reprisals continue anyway. Your calculation is not wrong and is also not a source of peace.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('grElasChoice', true) },
      },
    ],
    effect: null,
  },

  // ─── THE CIVIL WAR — 1946-49 ─────────────────────────────────────────────

  {
    id: 'gr_civil_war',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1950 &&
      G.age >= 16 &&
      !G.mem?.grCivilWar,
    text: (G) => {
      const wasElas = G.flags.has('greek_elas_member')
      if (wasElas) {
        return 'The liberation that came in 1944 became something else. The Dekemvriana — the December battles in Athens between ELAS and the British-backed government forces — ended with the Varkiza Agreement, and then the White Terror, and then the democratic elections that the left boycotted, and then the Democratic Army of Greece forming in the mountains. The civil war the occupation had been postponing has arrived. You came from the resistance. The resistance has now split along a line that runs through the village, through the family, through the street. There are people on the other side whom you know. That is the condition of a civil war: the people on the other side are not strangers.'
      }
      return 'The civil war: the Democratic Army to one side, bandits to the other, the British behind the government and the Soviets not behind the communists enough to matter. Three years in the mountains and the villages and on the roads, and afterwards the beaten fighters and their families go north across the border, many for good. Your village has people on both sides. After 1949 the side that won decides what the war was about, and who gets to belong to the country.'
    },
    context: 'The Greek Civil War (1946-1949) killed some 80,000 people; about 100,000 went into exile in the Eastern Bloc.',
    choices: [
      {
        text: 'Your family is on the government side — you understand the war as a fight against communist subversion.',
        tag: null,
        outcome: 'The government side wins. Your relatives are not imprisoned, not exiled. The history as the country teaches it for the next thirty years is your history. The names your neighbours were called — *symmorites*, bandits — are the names the official account uses.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('greek_civil_war_generation'); p.setMem('grCivilWar', true) },
      },
      {
        text: 'Your family is on the left — or near enough that the line drawn after 1949 runs through you.',
        tag: null,
        outcome: 'Defeat means exile or a return under surveillance. The *frouriko pistopiitiko* — the certificate of civic reliability — is required for a job, for a passport, for a university place. Your family\'s political category is stamped into the paperwork for the next thirty years.',
        effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('greek_civil_war_generation'); p.addFlag('dissident_family'); p.setMem('grCivilWar', true) },
      },
    ],
    effect: null,
  },

  // ─── CERTIFICATE OF CIVIC RELIABILITY — THE LONG AFTERMATH ─────────────

  {
    id: 'gr_frouriko',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_GREEK(G) &&
      G.flags.has('dissident_family') &&
      G.currentYear >= 1950 && G.currentYear <= 1974 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.grFrouriko,
    text: 'The *frouriko pistopiitiko* — the certificate of civic reliability — is required for a civil service job, a university place, a passport, emigration papers, teacher training. It is issued by the police on the basis of a file that describes your family\'s political activities during the occupation and the civil war. Your father was in the mountains. Your uncle went into exile in Tashkent. The file knows this. The certificate is denied. The practical effect is that the range of things that are available to you in your own country is determined by what your relatives did before you were born.',
    choices: [
      {
        text: 'You find work around the system — private sector, informal economy.',
        tag: null,
        outcome: 'The system is comprehensive but not complete. There are ways of living that do not require the certificate. They are narrower and less secure.',
        effect: (p) => { p.m -= 10; p.e += 3; p.addFlag('civic_record_denied'); p.setMem('grFrouriko', true) },
      },
      {
        text: 'You apply anyway and are denied. You appeal. You are denied again.',
        tag: null,
        outcome: 'The paperwork accumulates. The denials are polite. The system is patient. It will still be here in ten years and so will your father\'s file.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('civic_record_denied'); p.setMem('grFrouriko', true) },
      },
    ],
    effect: null,
  },

  // ─── THE ECONOMIC MIRACLE — 1950s-60s ───────────────────────────────────

  {
    id: 'gr_economic_miracle',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1958 && G.currentYear <= 1972 &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.grMiracle,
    text: 'The fifties and sixties: concrete going up everywhere, the villages emptying into Athens, the first refrigerator, the first television, the first motorbike, the northern Europeans arriving for the light and the sea. You can feel the growth in the shops and the construction noise. It does not disturb what is underneath: the civil war\'s winners still running the country, the left still on file.',
    choices: null,
    effect: (p) => { p.m += 8; p.w += 6; p.addFlag('greek_economic_miracle_gen'); p.setMem('grMiracle', true) },
  },

  // ─── GASTARBEITER — GOING TO GERMANY ────────────────────────────────────

  {
    id: 'gr_gastarbeiter',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_GREEK(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1980 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.grGastarbeiter,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'The labour contract is two years, renewable. The factory is in Stuttgart, or Düsseldorf, or Munich. Greek women clean hospitals, work assembly lines, pack chocolates in factories where the supervisor speaks slowly and loudly as if volume will bridge the language gap. You send money home — a significant amount, converted to drachmas, which means more there than here. The neighbourhood in Germany is Greek: the kafeneion, the Sunday church service conducted in Greek, the newspapers shipped a week late from Athens. You are a *xenitemenē* — one who lives in the foreign land — which in Greek carries a weight: the exile who is not an exile, the migrant who left by choice, the person who is not quite anywhere.'
        : 'The agreement with West Germany takes hundreds of thousands of Greeks north. The train from Thessaloniki to Munich takes two days, and the factory pays three times what the same day\'s work pays at home. You share a dormitory with men from Crete and Macedonia, places in your own country you had never been. The German word for you, Gastarbeiter, assumes you will go back. Whether Germany is where you live or where you work is something you will answer over many years.'
    },
    choices: [
      {
        text: 'You go and stay. Germany becomes the country you live in.',
        tag: null,
        outcome: 'Your children will grow up speaking German better than Greek. You will speak Greek at home and German everywhere else for the rest of your life. This arrangement will remain slightly uncomfortable in both directions, for as long as the choice stands.',
        effect: (p) => { p.m -= 6; p.w += 8; p.mo += 4000; p.addFlag('greek_gastarbeiter'); p.addFlag('emigrant'); p.setResidency('work_visa'); p.setMem('grGastarbeiter', true) },
      },
      {
        text: 'You go for several years and come back with savings.',
        tag: null,
        outcome: 'The money changes what you can build at home. The years in Germany change how you see what you came back to. Both things stay with you.',
        effect: (p) => { p.w += 5; p.mo += 6000; p.addFlag('greek_gastarbeiter'); p.setMem('grGastarbeiter', true) },
      },
    ],
    effect: null,
  },

  // ─── CIVIL WAR LATE RECKONING ────────────────────────────────────────────

  {
    id: 'gr_civil_war_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_GREEK(G) &&
      G.flags.has('greek_civil_war_generation') &&
      G.age >= 60 &&
      !G.mem?.grCivilWarLate,
    text: (G) => {
      const wasLeft = G.flags.has('dissident_family')
      if (wasLeft) {
        return '1981, and PASOK, and for the first time the left is in government. The resistance in the mountains is recognised by law as part of the war against the occupation, thirty years late, and the pensions come, and the word bandit is retired. What the law cannot give back is the thirty years in between: the certificates refused, the paths closed, the cousins who went to Tashkent and whose children grew up speaking Russian. You are glad the word was retired. You are also doing arithmetic.'
      }
      return 'The civil war is the war Greeks do not argue about openly. The lines it drew are still there — in families, in villages, in the silence that descends when certain names come up. The official history changed in 1981, when PASOK acknowledged the wartime resistance and rehabilitated the defeated side. It did not change everything. There are people in your village whose relationship to what happened is still determined by which side their grandfather was on. You are old enough to see both sides of the line and to know that the line is still there, faded but present, like the outline of a wall that was taken down.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.karma += 3; p.setMem('grCivilWarLate', true) },
  },

]
