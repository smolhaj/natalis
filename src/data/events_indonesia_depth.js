// Indonesia depth arc events
// Covers the major historical events NOT in events_indonesia.js (which focuses
// on the 1998 Chinese-Indonesian arc): 1965 anti-communist purge, Bali bombing
// 2002, 2004 Indian Ocean tsunami, Javanese transmigration program, Papuan
// indigenous identity, post-Reformasi civic life.

export const INDONESIA_DEPTH_EVENTS = [

  {
    id: 'id_1965_purge',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 1965 && G.currentYear <= 1970 &&
      G.age >= 16 &&
      G.ethnicity !== 'chinese_indonesian' &&
      !G.mem?.id1965Purge,
    text: 'October 1965. The September 30th Movement — a coup attempt by a faction of the military — is blamed on the PKI, the Indonesian Communist Party. What follows is not an investigation: it is a purge. Over the next six months, between 500,000 and one million Indonesians are killed. The army provides the lists; local militias do much of the killing. In East Java and Bali the rivers carry bodies. The PKI had three million members and tens of millions of affiliated workers, farmers, teachers. The category "communist" expands to include anyone someone wants to eliminate. You are not safe because you are not communist. You are safe because you are not on a list.',
    choices: [
      {
        text: 'Someone in your family was taken.',
        tag: 'id_family_taken_1965',
        outcome: 'The absence is permanent and officially non-existent. The New Order has declared the purge necessary. You carry an undeclared grief.',
        effect: (p) => { p.m -= 20; p.r += 12; p.h -= 5; p.addFlag('id_1965_stained'); p.addFlag('learned_silence'); p.setMem('id1965Purge', true); },
      },
      {
        text: 'You navigated through. Nobody in your immediate family was taken.',
        tag: null,
        outcome: 'The survival is not clean. You know what happened. You are going to be required to be silent about what you know for the next thirty years.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('id_1965_survived'); p.addFlag('regime_self_censorship'); p.setMem('id1965Purge', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'id_new_order_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 1975 && G.currentYear <= 1997 &&
      G.age >= 25 &&
      (G.flags.has('id_1965_survived') || G.flags.has('id_1965_stained') || G.flags.has('learned_silence')) &&
      !G.mem?.idNewOrderSilence,
    text: 'The New Order names this the Year of Living Dangerously and never speaks of it again. The textbook says: the PKI attempted a coup; the people rose up against them; order was restored. The textbook does not say: half a million to a million people, six months, the bodies in the Brantas River, the mass graves in the sugar plantations. You know this in the way that everyone who was there knows it — in silences, in the way certain topics are not raised at the table, in the particular expression on the face of a person who decides not to answer your question.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('id_1965_silence_generation'); p.setMem('idNewOrderSilence', true); },
  },

  {
    id: 'id_bali_bombing_2002',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear === 2002 &&
      G.age >= 14 &&
      !G.mem?.idBaliBombing,
    text: 'October 12, 2002. Two bombs detonate in the Kuta district of Bali — one in Paddy\'s Pub, one in the Sari Club. 202 dead: 88 Australians, 38 Indonesians, 26 British, and 24 other nationalities. 209 injured. Jemaah Islamiyah, the regional jihadist network. The island whose Hindu identity had always made it different from Muslim-majority Java now becomes the site of what Bali is internationally known for — not just surfing and temples but the date October 12. In Indonesia the attack provokes a reckoning with religious extremism that the New Order had managed by suppression.',
    choices: [
      {
        text: 'You were there — Bali, that night.',
        tag: 'id_bali_proximate',
        outcome: 'What you saw is in a specific register that does not match the news reports. The news reports are accurate; they are also not what you carry.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.r += 10; p.karma += 5; p.addFlag('id_bali_bombing_generation'); p.setMem('idBaliBombing', true); },
      },
      {
        text: 'You watched it on television, like most Indonesians.',
        tag: null,
        outcome: 'The footage loops. The question it opens — about religion, about Indonesia\'s identity, about who decides what this country is — does not resolve quickly.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('id_bali_bombing_generation'); p.setMem('idBaliBombing', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'id_tsunami_2004',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 2004 && G.currentYear <= 2006 &&
      G.ruralUrban === 'rural' &&
      G.age >= 10 &&
      !G.mem?.idTsunami2004,
    text: 'December 26, 2004. The undersea earthquake off the northern coast of Sumatra is a 9.1 — the third largest ever recorded. The tsunami it generates reaches the coast of Aceh in seventeen minutes. 170,000 Acehnese are killed. Another 36,000 in other Indonesian provinces, 128,000 in Sri Lanka and India and Thailand. The wave is thirty meters high in places. The province of Aceh is physically changed — coastlines altered, towns erased. The aid that arrives in January 2005 comes from everywhere in the world. You are somewhere along that coast, or you know people who were.',
    choices: [
      {
        text: 'You survived. Your community did not.',
        tag: 'id_tsunami_survived',
        outcome: 'The mathematics of who was on which street at what time: you carry this for the rest of your life. The survivorship is specific and random and does not explain itself.',
        effect: (p) => { p.m -= 22; p.h -= 8; p.r += 12; p.karma += 8; p.addFlag('id_tsunami_2004_survivor'); p.addFlag('disaster_survivor'); p.setMem('idTsunami2004', true); },
      },
      {
        text: 'You lost people. The wave didn\'t reach you directly.',
        tag: null,
        outcome: 'The distinction between survived and survived intact is one you have had years to understand.',
        effect: (p) => { p.m -= 14; p.r += 8; p.karma += 4; p.addFlag('id_tsunami_2004_survivor'); p.setMem('idTsunami2004', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'id_transmigration',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.currentYear >= 1965 && G.currentYear <= 1992 &&
      G.age >= 18 && G.age <= 40 &&
      (G.ethnicity === 'javanese' || G.ethnicity === 'sundanese') &&
      !G.mem?.idTransmigration,
    text: 'The transmigration program — *transmigrasi* — moves people from densely populated Java, Bali, and Madura to the outer islands: Kalimantan, Sulawesi, Papua. The pitch is land and a new beginning. The reality: cleared jungle, distant markets, malaria, and the politics of arriving on land where other people already live. By 1990, six million people have been moved. Some are volunteers. Many are effectively recruited with incentives that the alternative makes look good. You are Javanese in a country that has decided Java is too full.',
    choices: [
      {
        text: 'Take the transmigration land offer. A chance.',
        tag: 'id_transmigration_went',
        outcome: 'The land is real. The jungle is real. The other people who were already on the land are also real. You spend years figuring out which of those three things is the most important.',
        effect: (p) => { p.r += 5; p.mo -= 500; p.addFlag('id_transmigration_settler'); p.setMem('idTransmigration', true); },
      },
      {
        text: 'Stay on Java. Find another way.',
        tag: null,
        outcome: 'Java is crowded and you stay in it. You watch the people who left and learn what the land offer produced, ten years in.',
        effect: (p) => { p.r += 2; p.setMem('idTransmigration', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'id_papua_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Indonesia' &&
      G.ethnicity === 'papuan' &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.idPapuaIdentity,
    text: 'You are Papuan in Indonesia. The distinction matters: your face, your hair, your language, your customary land, your relationship to the central government in Jakarta are all different from what the word "Indonesian" was built to contain. The Morning Star flag — blue, white, red stripes and a rising star — is illegal. The Free Papua movement is classified as a separatist organization. Military and police deployments in Papua are permanent. The resource extraction — gold at Grasberg, the largest gold mine in the world — leaves very little in the province that produces it. You are learning what you are in a country that has decided what you are.',
    choices: [
      {
        text: 'Hold your identity. The Star is yours even if you cannot fly it.',
        tag: null,
        outcome: 'The holding is quiet and costly. The cost is the price of being who you are in this particular country.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 5; p.addFlag('id_papua_identity'); p.addFlag('dual_identity'); p.setMem('idPapuaIdentity', true); },
      },
      {
        text: 'Navigate the Indonesian identity as the practical path.',
        tag: null,
        outcome: 'The practical path is what it is. The question of what you gave up to walk it is one you will be revisiting for decades.',
        effect: (p) => { p.r += 4; p.addFlag('id_papua_identity'); p.setMem('idPapuaIdentity', true); },
      },
    ],
    effect: null,
  },

]
