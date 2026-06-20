// West Africa character events: Ghana, Ivory Coast, Nigeria deepening
// Nigeria: supplements events_country_arcs_3.js (Biafra arc already exists)
// Ghana: no dedicated events existed
// Ivory Coast: no dedicated events existed

export const WEST_AFRICA_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // GHANA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gha_nkrumah_dream',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.currentYear >= 1957 && G.currentYear <= 1966 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem.ghaNkrumah,
    text: 'Kwame Nkrumah\'s voice on the radio: "Ghana, your beloved country, is free forever." March 6, 1957, the first sub-Saharan country to gain independence from colonial rule. The idea was not just Ghana\'s freedom but Africa\'s freedom — pan-Africanism as a project for the continent. You are growing up in the country that is supposed to show what African self-governance can be. The idea is large enough that people from other African countries are sending their children to school in Accra to be part of it.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.addFlag('nkrumah_generation'); p.setMem('ghaNkrumah', true) },
  },

  {
    id: 'gha_rawlings_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.currentYear >= 1979 && G.currentYear <= 1992 &&
      G.age >= 18 &&
      !G.mem.ghaRawlings,
    text: 'Jerry Rawlings: the flight lieutenant who executed three former heads of state by firing squad in 1979 and came back with another coup in 1981. The PNDC — the Provisional National Defence Council — runs the country. The corruption tribunals are real and the violence is real. The structural adjustment programme the IMF requires cuts wages and public employment. The economy is being restructured in ways that produce growth in the statistics and pain in the street-level reality of the people you know.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('rawlings_generation'); p.setMem('ghaRawlings', true) },
  },

  {
    id: 'gha_democracy_1992',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.currentYear === 1992 &&
      G.age >= 18 &&
      !G.mem.ghaDemocracy,
    text: 'Rawlings allows elections in 1992. He wins, standing now as a civilian candidate. The opposition disputes the results but accepts the transition. Ghana becomes a constitutional democracy. For the first time in your adult life, the transfer of power is something other than a gun or a death. The 2000 election — Kufuor wins, Rawlings steps down — will be the first peaceful transfer of power to an opposition candidate in Ghana\'s history. You will be there for that too.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 5; p.addFlag('ghana_democracy_generation'); p.setMem('ghaDemocracy', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // IVORY COAST / CÔTE D'IVOIRE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'cdi_houphouet_era',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === "Ivory Coast" &&
      G.currentYear >= 1960 && G.currentYear <= 1985 &&
      G.age >= 8 && G.age <= 20 &&
      !G.mem.cdiHouphouet,
    text: 'Félix Houphouët-Boigny ruled Ivory Coast from independence in 1960 until his death in 1993 — thirty-three years. The economy grew at 7 percent per year in the 1960s and 1970s. The country was called the Ivorian Miracle. The miracle required cheap labour: four million West African migrants from Burkina Faso and Mali working the cocoa and coffee plantations. The question of who is truly Ivorian — ivoirité — was not asked openly during the miracle years. It will be asked later, at cost.',
    choices: null,
    effect: (p) => { p.m += 4; p.addFlag('ivorian_miracle_generation'); p.setMem('cdiHouphouet', true) },
  },

  {
    id: 'cdi_ivoirite_crisis',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === "Ivory Coast" &&
      G.currentYear >= 1995 && G.currentYear <= 2005 &&
      G.age >= 18 &&
      !G.mem.cdiIvoirite,
    text: 'Ivoirité: the question of authentic Ivorian identity, introduced as a political concept to exclude Alassane Ouattara from the 1995 presidential election because his parents were from Burkina Faso. The concept expands. Four million migrants who built the cocoa economy are suddenly in an ambiguous legal position. The north of the country, predominantly Muslim, is implicitly positioned as less Ivorian than the south. The concept does not remain a concept.',
    choices: [
      {
        text: 'You are affected by the ivoirité question.',
        tag: null,
        outcome: 'The category of belonging that was assumed has been withdrawn and replaced by a question mark. The question mark has legal and practical consequences.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('ivoirite_generation'); p.setMem('cdiIvoirite', true) },
      },
      {
        text: 'You hold ivoirité. Your family has been here for generations.',
        tag: null,
        outcome: 'The concept protects you or is used by people like you. The cost of the concept is borne by others. You know this to varying degrees of clarity.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('ivoirite_generation'); p.setMem('cdiIvoirite', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cdi_civil_war',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === "Ivory Coast" &&
      G.currentYear >= 2002 && G.currentYear <= 2011 &&
      G.age >= 20 &&
      !G.mem.cdiCivilWar,
    text: 'September 2002. A coup attempt by rebel soldiers becomes a civil war. The country splits: the government controls the south, the Forces Nouvelles control the north. The line — the "zone of confidence," patrolled by French forces and UN peacekeepers — runs across the middle of the country. Abidjan is in the government south. Bouaké, the second city, is in the rebel north. You are navigating a country that has become two countries with a ceasefire line between them.',
    choices: null,
    effect: (p) => { p.m -= 14; p.h -= 4; p.r += 8; p.addFlag('ivorian_civil_war_generation'); p.setMem('cdiCivilWar', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NIGERIA — deepening (Biafra already in events_country_arcs_3.js)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'nga_oil_boom',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1973 && G.currentYear <= 1981 &&
      G.age >= 18 &&
      !G.mem.ngaOilBoom,
    text: 'Oil at $35 a barrel. Nigeria joins OPEC in 1971 and the 1973 oil shock makes the country suddenly, visibly wealthy — the federal government, at least. The phrase is "oil boom." Lagos is building. The roads are being constructed. Salaries in government are high. The naira is strong. The structural problem — that the oil money is flowing through a military government and a patronage system rather than into productive capacity — is legible but not dominant in the feeling of the moment. The feeling of the moment is abundance.',
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 1000; p.addFlag('nigerian_oil_boom_generation'); p.setMem('ngaOilBoom', true) },
  },

  {
    id: 'nga_sap_1980s',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1986 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem.ngaSAP,
    text: 'The structural adjustment programme: naira devaluation, import restrictions removed, public sector salaries cut, subsidies reduced. The price of everything rises. What the oil boom produced — the expectation of abundance, the civil service jobs, the university that was affordable — is being restructured away. This is called economic reform. What it feels like is the systematic removal of the floor. The SAP generation will use this word — SAP — for decades to describe what was done to them.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 7; p.addFlag('sap_generation'); p.setMem('ngaSAP', true) },
  },

  {
    id: 'nga_saro_wiwa_1995',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear === 1995 &&
      G.age >= 25 &&
      !G.mem.ngaSaroWiwa,
    text: 'November 10, 1995. Ken Saro-Wiwa and eight other Ogoni activists are hanged by the Abacha military government. Saro-Wiwa had been documenting what Shell\'s oil extraction had done to the Niger Delta: the oil spills, the gas flaring, the contamination of the land and water the Ogoni people depended on. His trial was internationally recognized as unjust. The Commonwealth suspends Nigeria. The execution happens anyway. The oil continues to be extracted. The delta continues to burn.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.karma += 5; p.addFlag('saro_wiwa_generation'); p.setMem('ngaSaroWiwa', true) },
  },

  {
    id: 'nga_419_scam_culture',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem.nga419,
    text: 'Section 419 of the Nigerian Criminal Code: advance-fee fraud. The letters — later the emails — went out by the millions. The phenomenon had a name: 419. You know people who were involved, or you know what it meant to be Nigerian abroad and have people assume you were involved, which is a different problem. The specific damage of a national stereotype attached to a country of 120 million people for the activities of a small number within it. You have had to manage the assumption in contexts where the assumption was already made.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('nigerian_diaspora_stigma'); p.setMem('nga419', true) },
  },

  {
    id: 'nga_endsars_2020',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear === 2020 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.ngaEndSARS,
    text: 'October 2020. SARS — the Special Anti-Robbery Squad — has been extrajudicially killing, extorting, and brutalising young Nigerians for thirty years. The evidence circulates online. The hashtag becomes the movement: #EndSARS. Young Nigerians shut down major highways. Lagos, Abuja, Port Harcourt, Enugu. The protests are organised entirely through Twitter and WhatsApp. On October 20, at the Lekki toll gate in Lagos, soldiers open fire on protesters waving Nigerian flags. The army disputes the numbers. The Twitter videos do not dispute.',
    choices: [
      {
        text: 'You are at the toll gate or at another protest that week.',
        tag: null,
        outcome: 'You were there before the soldiers came or you were there when they came. What happened at Lekki is a fact that occurred while you were in the country being a citizen of it.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 5; p.addFlag('endsars_generation'); p.addFlag('political_active'); p.setMem('ngaEndSARS', true); },
      },
      {
        text: 'You watch it on Twitter from inside, or from the diaspora.',
        tag: null,
        outcome: 'The footage from Lekki circulates on every platform before the platforms are pressured to remove it. You have seen it. It cannot be unseen.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('endsars_generation'); p.setMem('ngaEndSARS', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_tech_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ngaTech,
    text: 'Lagos is becoming a tech hub: Andela, Flutterwave, Paystack, the co-working spaces in Victoria Island and Yaba. The "Silicon Lagoon" is real and it isn\'t: a cohort of young Nigerians building companies against infrastructure failure, power cuts, and a government that is neither enabler nor antagonist but simply absent. The Paystack acquisition by Stripe in 2020 for $200 million is the moment the outside world notices. The people inside it have been working within the infrastructure for years before that.',
    choices: [
      {
        text: 'You are building here — this is where the opportunity is.',
        tag: null,
        outcome: 'The infrastructure costs are real and you build around them. The market is 200 million people and growing. The calculus favours staying.',
        effect: (p) => { p.m += 5; p.e += 5; p.w += 4; p.addFlag('lagos_tech_generation'); p.setMem('ngaTech', true); },
      },
      {
        text: 'The infrastructure is a ceiling. You build where the foundation is more solid.',
        tag: null,
        outcome: 'You leave or you have already left. You build faster, with fewer stops. The question of what you owe the place you left is specific and does not resolve.',
        effect: (p) => { p.m += 3; p.r += 5; p.addFlag('lagos_tech_generation'); p.addFlag('brain_drain_gone'); p.setMem('ngaTech', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_nepa_generator_culture',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1985 && G.currentYear <= 2015 &&
      G.age >= 18 &&
      !G.mem?.ngaNEPA,
    text: '"NEPA has taken light." The phrase is embedded in daily life so completely that you know the power is going before you can confirm it has gone — from the specific stutter of the ceiling fan. The National Electric Power Authority is so reliably unreliable that Nigerians call it Never Expect Power Always. Your day organises around the generator: the diesel cost, the starting cord, the decibel level that determines whether you can sleep or work. The generator is not a backup. It is the primary system. The national grid is the backup, for the hours it works. Owning a generator, or sharing access to one, is the dividing line between two kinds of life.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('nepa_generation'); p.setMem('ngaNEPA', true) },
  },

  {
    id: 'nga_lagos_go_slow',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1990 &&
      G.age >= 18 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.ngaLagosGoSlow,
    text: 'The Lagos go-slow. You know it the way you know weather: variable but reliably present. The Third Mainland Bridge at 7am. The Apongbon junction at 5pm. A trip that should take twenty minutes takes two hours without any particular reason — a stalled danfo, a junction where the traffic lights have not worked in three years, a truck blocking two lanes while its driver argues with another driver. The hawkers work the stalled traffic: water sachets, newspapers, phone chargers, cooked corn, fan ice. They are more efficient than anything else moving on the road. You buy from them. The car is not moving. There is time.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('lagos_go_slow_generation'); p.setMem('ngaLagosGoSlow', true) },
  },

  {
    id: 'nga_june12_1993',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1993 && G.currentYear <= 1996 &&
      G.age >= 18 &&
      !G.mem?.ngaJune12,
    text: 'June 12, 1993. Moshood Abiola wins the presidential election. International observers call it the freest and fairest in Nigerian history. Eleven days later, Ibrahim Babangida annuls the result. No official reason is given. The protests that follow — street blockades, a general strike in Lagos, soldiers at every junction — are answered the way the military has always answered. Abiola declares himself president in June 1994 and is arrested. He dies in custody in 1998, on the day he is supposed to meet the American ambassador. That is how the June 12 story ends: not with justice but with the removal of the question.',
    choices: [
      {
        text: 'You join the protests. The annulment is not something you can accept quietly.',
        tag: null,
        outcome: 'The protests do not restore the election. The military does not give back what it takes. What you did in those weeks stays with you without resolution.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 5; p.addFlag('nga_june12_generation'); p.addFlag('political_active'); p.setMem('ngaJune12', true); },
      },
      {
        text: 'You watch. The military has guns and the outcome is not in doubt.',
        tag: null,
        outcome: 'The outcome was not in doubt. Neither was what it meant. The decision not to act is also a fact about the country and about yourself that you carry.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('nga_june12_generation'); p.setMem('ngaJune12', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GHANA — depth events
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gha_nkrumah_school',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.currentYear >= 1957 && G.currentYear <= 1968 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.ghaNkrumahSchool,
    text: 'The school was built while you were young enough to not remember a time without it. Nkrumah\'s government built secondary schools in regions that had none; it built the University of Ghana at Legon and told a generation that education was not for the colonial elite but for anyone Ghana produced. Your father went as far as class six; you will go further. This is not abstract progress — it has a specific building with specific teachers and specific examination results that determine what you become. The building exists because someone decided that you should exist as a person who goes to school.',
    choices: null,
    effect: (p) => {
      p.e += 8; p.m += 5; p.karma += 3;
      p.addFlag('nkrumah_education_beneficiary');
      p.setMem('ghaNkrumahSchool', true);
    },
  },

  {
    id: 'gha_1966_coup',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.flags.has('nkrumah_generation') &&
      G.currentYear >= 1966 && G.currentYear <= 1972 &&
      G.age >= 16 &&
      !G.mem?.gha1966Coup,
    text: 'February 24, 1966. Nkrumah is in Hanoi, on a peace mission to Vietnam, when the National Liberation Council announces it has taken power. The police and army. The coup is bloodless. The idea it ended was not bloodless. You grew up with the pan-African project — the speeches, the schools, the sense that Ghana was the place that would show what independence could mean. The NLC dismantles the state farms, privatises what had been built, accepts IMF conditions that reverse the development programme. Nkrumah lives in Guinea until 1972 as a guest of Sékou Touré. You follow his statements from exile. They sound different now — the same ideas in a smaller room.',
    choices: null,
    effect: (p) => {
      p.m -= 14; p.e += 5; p.r += 8; p.karma -= 3;
      p.addFlag('ghana_1966_disillusionment');
      p.setMem('gha1966Coup', true);
    },
  },

  {
    id: 'gha_brain_drain_witness',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ghana' &&
      G.currentYear >= 1982 && G.currentYear <= 2005 &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.ghaBrainDrain,
    text: 'The doctor you have known since university writes to say she is in London now. The engineer who built the Akosombo dam extension went to Canada three years ago. The secondary school where you teach or studied has had three headmasters in four years — each one left before the next was found. Structural adjustment cut public sector wages to the point where a nurse earns less than a market trader. The people Ghana spent a generation educating are in other countries spending those educations. You watch the going, and the going continues, and you count the chairs left empty by people you know.',
    choices: [
      {
        text: 'You stay. Someone has to hold the place together.',
        tag: 'stayed',
        outcome: 'The word for this in Ghana is "holding the fort." The fort is less staffed every year. You hold it anyway.',
        effect: (p) => { p.m -= 10; p.r += 8; p.karma += 5; p.addFlag('ghana_stayed_generation'); p.setMem('ghaBrainDrain', true); },
      },
      {
        text: 'You leave, or you are already planning to.',
        tag: 'left',
        outcome: 'The logic is rational at the individual level. The effect at scale is the thing you carry.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('brain_drain_gone'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('ghaBrainDrain', true); },
      },
    ],
    effect: null,
  },

]
