// events_dominican_republic.js — Dominican Republic depth arc (9 events)
// Covers: Trujillo era 1930-61, Mirabal sisters, Parsley Massacre,
// US intervention 1965, Balaguer era, baseball pipeline, remittance economy,
// 2013 statelessness ruling, late reckoning on national identity

const IS_DOMINICAN = (G) => G.character.country?.name === 'Dominican Republic'

export const DOMINICAN_REPUBLIC_EVENTS = [

  // ─── EL JEFE — GROWING UP UNDER TRUJILLO ────────────────────────────────────

  {
    id: 'dr_trujillo_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1933 && G.currentYear <= 1961 &&
      G.age >= 6 &&
      !G.mem?.drTrujilloChildhood,
    text: (G) => {
      const young = G.age <= 10
      return young
        ? 'The photograph of El Jefe hangs in your house. It hangs in every house — it is expected to hang in every house. Trujillo\'s name is on the capital city, on the main avenue, on the mountains he claimed to own. The SIM — the secret police — are not spoken of directly, but the adults around you have learned to speak around the subject of certain people who have gone away. You know that something is wrong in a way you cannot yet name. You name it the way children name things: by watching what the adults do not say.'
        : 'The Dominican Republic has been governed by Rafael Leónidas Trujillo Molina since 1930. The official name of the capital is now Ciudad Trujillo. His photograph is required in every home. His initials — RTM — appear on public buildings, on the school you attend. The SIM, the secret police, operates with complete impunity: people disappear, and families do not ask where they went. You have understood, in the way people understand things under a dictatorship, that there are words you do not say in certain rooms.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('trujillo_generation'); p.setMem('drTrujilloChildhood', true) },
  },

  // ─── THE PARSLEY MASSACRE — 1937 ────────────────────────────────────────────

  {
    id: 'dr_parsley_massacre',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1937 && G.currentYear <= 1939 &&
      G.age >= 14 &&
      !G.mem?.drParsleyMassacre,
    text: 'In October 1937, the army moved along the northwestern border with Haiti. The test, it is said, was to ask a person to say *perejil* — parsley. Haitians who could not roll the Spanish r were identified and killed. Between 17,000 and 35,000 Haitians and dark-skinned Dominicans were killed over several days. Trujillo paid Haiti\'s government an indemnity of $750,000 — about $21 per person — and the matter was handled diplomatically. The massacre is not discussed openly. What you know, you learned in pieces, from the way adults go quiet when the border region comes up, from the family members who do not talk about certain cousins on the other side.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.karma += 3; p.addFlag('dr_massacre_generation'); p.setMem('drParsleyMassacre', true) },
  },

  // ─── LAS MARIPOSAS — THE MIRABAL SISTERS ───────────────────────────────────

  {
    id: 'dr_mirabal_sisters',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1963 &&
      G.age >= 18 &&
      !G.mem?.drMirabalSisters,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'On November 25, 1960, Patria, Minerva, and María Teresa Mirabal were stopped on a mountain road near Puerto Plata and strangled by Trujillo\'s agents. Their bodies were placed in their Jeep and pushed off a cliff. They had been fighting against Trujillo since the mid-1950s — the Mirabal sisters, *las mariposas*, the butterflies. What their deaths do is harden something you already knew: that the resistance of women under this regime has a cost that men\'s resistance does not have in the same way, and that cost has now been named with three names that the country will not forget.'
        : 'On November 25, 1960, three of the four Mirabal sisters — Patria, Minerva, María Teresa — were killed by Trujillo\'s agents on a mountain road near Puerto Plata. Their bodies were made to look like an accident. They had been organizing against Trujillo for years, and their husbands were in La Victoria prison. The murders are known: everyone in the country knows what happened on that road. Six months later, Trujillo is dead. Whether the murders precipitated the conspiracy that killed him is something people in this country will argue about.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.karma += 5; p.addFlag('dr_mirabal_generation'); p.setMem('drMirabalSisters', true) },
  },

  // ─── EL JEFE MUERE — TRUJILLO KILLED 1961 ───────────────────────────────────

  {
    id: 'dr_trujillo_killed',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear === 1961 &&
      G.age >= 14 &&
      !G.mem?.drTrujilloKilled,
    text: 'May 30, 1961. Conspirators — members of the regime itself, with CIA knowledge — intercept Trujillo\'s car on the Malecón outside the capital. He is shot several times and killed. He was sixty-nine. He had governed the country for thirty-one years. His photograph is in your house. In the days that follow, his son Ramfis uses the SIM to hunt and kill the conspirators. But something has changed. The thing that was always there — the photograph, the initials on the building, the words that could not be said — has become, suddenly, a thing that had an end. You do not know yet what the end means.',
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('dr_trujillo_gone'); p.setMem('drTrujilloKilled', true) },
  },

  // ─── 1965: THE YEAR THE AMERICANS CAME ─────────────────────────────────────

  {
    id: 'dr_1965_intervention',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1966 &&
      G.age >= 16 &&
      !G.mem?.dr1965Intervention,
    text: 'In April 1965, the Constitutionalists — those who want to return Juan Bosch and the elected government — rise against the military junta. Within days, 42,000 American troops have landed in Santo Domingo. The Johnson administration says it is protecting American citizens; most people here believe it is protecting the installation of another Balaguer in place of another Bosch. The Americans call it stopping a Communist takeover. The Constitutionalist forces call it stopping a coup. You have seen foreign soldiers on Dominican streets before — in your grandparents\' time, the Marines were here for eight years. The island has a long education in what it means to be situated where it is situated.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.e += 3; p.addFlag('dr_1965_generation'); p.setMem('dr1965Intervention', true) },
  },

  // ─── BASEBALL — THE ACADEMY AND THE DREAM ───────────────────────────────────

  {
    id: 'dr_baseball_dream',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1970 &&
      G.age >= 14 && G.age <= 18 &&
      G.character.gender === 'male' &&
      !G.mem?.drBaseballDream,
    text: 'The academies are here now — the MLB academies, with American coaches and Dominican scouts and contracts in dollars. The dream is specific: not just to play baseball but to be signed, to get the bonus, to wire money home, to leave. You play in the field behind the school and on the road in the late afternoon when the heat breaks. The scouts come through looking for something they can train. You do not know if you have that thing. You know that the colmado owner\'s son was signed last year and his family got a new roof. The dream is not abstract.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.addFlag('dr_baseball_generation'); p.setMem('drBaseballDream', true) },
  },

  // ─── THE REMITTANCE ECONOMY ─────────────────────────────────────────────────

  {
    id: 'dr_remittance_economy',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 1980 &&
      G.age >= 28 &&
      !G.mem?.drRemittanceEconomy,
    text: 'The barrel arrives from New York. Your cousin who left in the 1970s sends it twice a year — shoes, clothes, things that are hard to find or expensive here, and sometimes dollars folded into the pockets of a jacket. Washington Heights, which the Dominicans there call Quisqueya Heights, is the second capital: the neighborhoods where people watch DR news, eat mangú, and send money home every month as a matter of course. The economy of this country runs partly on what the people who left send back to the people who stayed. You are one of the people who stayed. You are not sure whether this was a choice.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 3; p.addFlag('dr_remittance_generation'); p.setMem('drRemittanceEconomy', true) },
  },

  // ─── 2013: STATELESSNESS RULING ─────────────────────────────────────────────

  {
    id: 'dr_2013_statelessness',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2016 &&
      G.age >= 25 &&
      !G.mem?.dr2013Stateless,
    text: (G) => {
      const isAfroDominican = G.character.ethnicity?.id === 'afro_dominican'
      return isAfroDominican
        ? 'The Constitutional Tribunal\'s ruling TC 168-13 retroactively strips citizenship from Dominicans of Haitian descent born since 1929. An estimated 200,000 people are rendered stateless overnight — born here, raised here, speaking Spanish, with Dominican identity documents that are now invalid. You know people this has happened to. The ruling has a particular quality: it is administrative rather than violent, but the administrative is a different kind of permanent. The inter-American human rights system will condemn it. The ruling stands.'
        : 'The Constitutional Tribunal\'s ruling TC 168-13 retroactively strips Dominican citizenship from people of Haitian descent born in the country since 1929. Two hundred thousand people lose their citizenship at once. They were born here, they went to school here, they have Dominican documents. The Inter-American Commission on Human Rights condemns it. There are protests from human rights organizations. Dominican public opinion is, on the whole, unmoved. The racial politics of this island — the long history of the country defining itself as not-Haitian, not-Black — has arrived in a court document with a case number.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 5; p.setMem('dr2013Stateless', true) },
  },

  // ─── LATE RECKONING: THE ISLAND WE LIVE ON ──────────────────────────────────

  {
    id: 'dr_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_DOMINICAN(G) &&
      G.age >= 60 &&
      !G.mem?.drLateReckoning,
    text: 'The Dominican Republic and Haiti share a single island and have spent their histories in a relationship of mutual construction: each country\'s identity shaped partly by what the other represents. Trujillo built the frontier on a massacre and called it a border. The 2013 ruling built it again on paper. The country\'s self-image — Spanish-speaking, Catholic, not-African, modern — is a project that has required continuous maintenance in the face of what the country actually is. You have lived this maintenance from the inside, in the way people live the self-images of their countries: believing some of it, using some of it, watching some of it collapse under its own weight.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 2; p.karma += 3; p.setMem('drLateReckoning', true) },
  },

]
