// events_indigenous.js
// Indigenous peoples events — BUILD 19
// Covers: Aboriginal Australian, Native American (USA), First Nations (Canada), Māori (NZ).
// These supersede the two generic events in events_historical.js:
//   hist_residential_school and hist_indigenous_language_revival.
// Specific, country-gated, ethnicity-gated, and era-accurate.

export const INDIGENOUS_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════════════
  // ABORIGINAL AUSTRALIAN
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ind_aboriginal_stolen_gen',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      G.character.ethnicity === 'aboriginal_australian' &&
      G.currentYear >= 1910 && G.currentYear <= 1970 &&
      G.age >= 4 && G.age <= 12 &&
      !G.mem?.stolenGen,
    text: 'Government welfare officers arrive at the settlement. It is official. You are taken from your family. At the dormitory, speaking your language is punished. Your name is replaced with a number and a Christian first name. The people who run the place are not uniformly cruel — some believe they are helping you. This does not change what is happening. You will not see your mother for eleven years. When you do, you will have lost the fluency for it.',
    choices: [
      {
        text: 'There is no choice.',
        tag: null,
        outcome: 'You survive. Some children do not. What you carry back is not what was taken — it is a different thing, built in the gap where something else was meant to be.',
        effect: (p) => { p.m -= 30; p.h -= 10; p.addFlag('stolen_generation_survivor'); p.setMem('stolenGen', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_aboriginal_stolen_gen_return',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.includes('stolen_generation_survivor') &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.stolenGenReturn,
    text: 'You find her. She is older than you expected — you had frozen her at a particular age in your mind. There is a conversation that does not go the way you had practised it for years. The language is only partly there. You sit together in silence for a while and this is not nothing. It is a small warm thing in a very large cold space.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 15; p.setMem('stolenGenReturn', true); },
  },

  {
    id: 'ind_aboriginal_country_connection',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'aboriginal_australian' &&
      G.currentYear >= 1950 &&
      G.age >= 8 &&
      !G.mem?.countryConnection,
    text: 'An elder takes you out onto country. Not the land — country is a different word, with a different weight. She teaches you the names of places in the old language. The stories that are also maps. This is not school. There is no right answer to test for. You are not meant to remember with your head.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 5; p.s += 5; p.addFlag('cultural_knowledge'); p.setMem('countryConnection', true); },
  },

  {
    id: 'ind_aboriginal_mabo_personal',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'aboriginal_australian' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      !G.mem?.maboPersonal,
    text: 'The High Court has found that terra nullius — the legal fiction that this land was empty when the British arrived — was always false. Your family has been here for sixty thousand years. The law has just acknowledged that you were here. The acknowledgment sits in your mouth strangely. You were here before the law, and you will be here after it, and what the law decides about that feels like something that is about you but does not quite reach you.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 8; p.addFlag('mabo_generation'); p.setMem('maboPersonal', true); },
  },

  {
    id: 'ind_aboriginal_apology_personal',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'aboriginal_australian' &&
      G.currentYear >= 2008 && G.currentYear <= 2010 &&
      !G.mem?.apologyPersonal,
    text: 'The Prime Minister stands in Parliament and says: we are sorry. The word sorry. It is said. People around you are weeping. You are not sure what you feel — something more complicated than joy and less complete than relief. He says: for the laws and policies of successive Parliaments and governments that have inflicted profound grief, suffering and loss. He names the Stolen Generations. Your grandmother was one of them. She has been dead for four years and did not hear this. You are hearing it for her, and it is too late, and it is also something.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 8; p.addFlag('apology_generation'); p.setMem('apologyPersonal', true); },
  },

  {
    id: 'ind_aboriginal_cultural_reclaim',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'aboriginal_australian' &&
      G.currentYear >= 1970 &&
      !G.mem?.culturalReclaim,
    text: 'There is a movement to reclaim language, ceremony, land rights. You have been cautious about it — the white institutions that co-opt it, the debates inside the community about authenticity. But there is a moment at a gathering when a song is sung that your grandmother used to hum without knowing the words to, and you understand that reclamation is not about purity, it is about continuation.',
    choices: [
      {
        text: 'Engage deeply — become part of the revival',
        tag: null,
        outcome: 'It costs time and some relationships. What grows in the space it opens does not have a price.',
        effect: (p) => { p.karma += 10; p.s += 5; p.addFlag('cultural_leader'); p.setMem('culturalReclaim', true); },
      },
      {
        text: 'Engage quietly, in your own way',
        tag: null,
        outcome: 'You do not become a public face of it. What you carry privately is yours.',
        effect: (p) => { p.karma += 5; p.m += 5; p.setMem('culturalReclaim', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // NATIVE AMERICAN — USA
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ind_american_boarding_school',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      G.character.ethnicity === 'indigenous_american' &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1870 && G.currentYear <= 1975 &&
      G.age >= 5 && G.age <= 12 &&
      !G.mem?.boardingSchool,
    text: 'The government school is a day\'s ride from the reservation. Kill the Indian, save the man — this is the official policy. They cut your hair on the first day. Your braids fall on the floor and you watch them as if they belong to someone else, which they now do. You are given a new name. English only. Punished for the language of your grandmother. This is federal policy. It is also happening to children you will not see again for years. You learn what they want to teach you. You do not forget what they want you to forget.',
    choices: [
      {
        text: 'There is no choice.',
        tag: null,
        outcome: 'You carry both. They did not manage to kill the Indian. What they left instead is something harder to name.',
        effect: (p) => { p.m -= 28; p.h -= 8; p.addFlag('boarding_school_survivor'); p.setMem('boardingSchool', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_american_boarding_aftermath',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.includes('boarding_school_survivor') &&
      G.character.country.name === 'United States' &&
      G.age >= 18 &&
      !G.mem?.boardingAftermath,
    text: 'You go back to the reservation and find that you are between two worlds in a way that has no comfortable name. Your grandparents speak the language and you understand parts of it — the parts that were still in you when you arrived at the school and could not be fully beaten out. You went to school for a life that does not exist here, and you do not fully belong to the life that does.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 12; p.setMem('boardingAftermath', true); },
  },

  {
    id: 'ind_american_reservation_life',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'indigenous_american' &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1950 &&
      !G.mem?.reservationLife,
    text: 'The IHS clinic has a six-week wait. The nearest town is forty miles. The school on the reservation receives less funding per student than a suburban school two hours away. Unemployment is above fifty per cent. Your uncle is in jail — mandatory minimums on a drug charge the courts in the city would have processed differently. These are not individual failures. You learn early to understand what a system looks like from the inside of it.',
    choices: [
      {
        text: 'Focus on education and leave — build a life outside',
        tag: null,
        outcome: 'You leave. You carry the reservation with you in ways you will spend years understanding.',
        effect: (p) => { p.e += 8; p.addFlag('scholarship_path'); p.setMem('reservationLife', true); },
      },
      {
        text: 'Stay and build what you can here',
        tag: null,
        outcome: 'You stay. Some people who stayed built things. You are going to be one of them.',
        effect: (p) => { p.karma += 8; p.s += 5; p.addFlag('community_builder'); p.setMem('reservationLife', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_american_aim_70s',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'indigenous_american' &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1968 && G.currentYear <= 1980 &&
      !G.mem?.aimMovement,
    text: 'The American Indian Movement is occupying Alcatraz, then Wounded Knee. Young men and women with rifles and treaty rights, in a country that has been ignoring the treaties since they were signed. The government calls them terrorists. They call themselves what they have always been. You feel something that has not had a name until now: the specific anger of a people who have been patient past any reasonable measure. You are that anger also.',
    choices: [
      {
        text: 'Get involved — this is the moment',
        tag: null,
        outcome: 'You are inside a movement that will not win everything and will change things permanently.',
        effect: (p) => { p.karma += 10; p.s += 5; p.addFlag('political_active'); p.addFlag('aim_generation'); p.setPolitical('dissident'); p.setMem('aimMovement', true); },
      },
      {
        text: 'Watch from a distance — the risk is real',
        tag: null,
        outcome: 'You watch. It moves you. The watching is its own form of carrying.',
        effect: (p) => { p.m += 3; p.addFlag('aim_generation'); p.setMem('aimMovement', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // FIRST NATIONS — CANADA
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ind_canada_residential_school',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      G.character.ethnicity === 'first_nations' &&
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1920 && G.currentYear <= 1996 &&
      G.age >= 5 && G.age <= 12 &&
      !G.mem?.canadaResidentialSchool,
    text: 'The Indian residential school is church-run and government-funded. The priests and nuns are not all the same — some are kind and some are not kind in ways you will spend years trying to describe to people who ask. You do not go home for summers. In the dormitory at night, children cry in languages the staff do not speak. You learn to sleep through it, which is the first thing the place teaches you. The second is that what you are is something to be removed.',
    choices: [
      {
        text: 'There is no choice.',
        tag: null,
        outcome: 'It is not removed. But the attempt is made, and the attempt leaves marks that do not fade completely.',
        effect: (p) => { p.m -= 28; p.h -= 10; p.addFlag('residential_school_survivor'); p.setMem('canadaResidentialSchool', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_canada_sixties_scoop',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.ethnicity === 'first_nations' &&
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1960 && G.currentYear <= 1985 &&
      G.age >= 1 && G.age <= 8 &&
      !G.mem?.sixtiesScoop,
    text: 'A social worker from the province comes to the house. Your parents are young and poor and Indigenous and the social worker has a checklist. You are removed for your own protection. You are placed with a white family in a city you have never been to. They are not unkind. You grow up not knowing your language, your clan, your family. You grow up not knowing what you do not know, which is the specific architecture of this kind of loss.',
    choices: [
      {
        text: 'There is no choice.',
        tag: null,
        outcome: 'You grow up. At thirty, you begin to understand what was taken and to name the shape of the space where it was.',
        effect: (p) => { p.m -= 25; p.h -= 8; p.addFlag('sixties_scoop_survivor'); p.addFlag('adopted'); p.setMem('sixtiesScoop', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_canada_school_return',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.flags.includes('residential_school_survivor') || G.flags.includes('sixties_scoop_survivor')) &&
      G.character.country.name === 'Canada' &&
      G.age >= 20 &&
      !G.mem?.canadaSchoolReturn,
    text: 'A National Inquiry has been called. They want testimonies. Survivors, their children, their communities. You have one. Giving it feels important and it also costs something you do not get back — the telling takes the thing out of where you had it stored and puts it somewhere more exposed.',
    choices: [
      {
        text: 'Testify — your account is part of the record now',
        tag: null,
        outcome: 'It is on record. It cannot be undone. Whether this changes anything you will see in years, not immediately.',
        effect: (p) => { p.karma += 12; p.r += 10; p.addFlag('testified_at_inquiry'); p.setMem('canadaSchoolReturn', true); },
      },
      {
        text: 'Not yet — you are not ready to give this to a room',
        tag: null,
        outcome: 'You do not go. The inquiry proceeds without your testimony. You carry both the reason you stayed away and the knowledge of what you withheld.',
        effect: (p) => { p.r += 8; p.m -= 3; p.setMem('canadaSchoolReturn', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_canada_trc_2015',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'first_nations' &&
      G.currentYear >= 2015 && G.currentYear <= 2018 &&
      !G.mem?.trc2015,
    text: 'The Truth and Reconciliation Commission publishes its report. Ninety-four Calls to Action. The word reconciliation is in the air everywhere now. You are not certain what you think of the word — it can be used to close a conversation as easily as to open one. But some of the findings are specific: the churches will no longer run schools, the records will be made available. Whether these things happen in practice is a different question from whether they are in the report.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 5; p.setMem('trc2015', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // MĀORI — NEW ZEALAND
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ind_maori_language_suppressed',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.ethnicity === 'maori' &&
      G.character.country.name === 'New Zealand' &&
      G.currentYear >= 1900 && G.currentYear <= 1970 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.maoriLangSuppressed,
    text: 'At school they tell you not to speak Māori. Some teachers punish it. Your parents tell you the same thing — it will hold you back, they say. They were told the same by their parents. The language of your grandparents is becoming the language of no one, and the process runs through houses as well as schools. You are nine years old and already complicit in this, because what else can you do.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('language_lost'); p.setMem('maoriLangSuppressed', true); },
  },

  {
    id: 'ind_maori_kohanga_reo',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'maori' &&
      G.currentYear >= 1982 &&
      !G.mem?.kohangaReo,
    text: 'The kōhanga reo movement. Language nests — the idea that grandparents who still speak the language can teach it to children whose parents lost it. You bring your child. The teacher is your neighbour\'s grandmother. She teaches your child a word you had not heard since you were very small. When the child uses it at dinner you hold very still.',
    choices: [
      {
        text: 'Commit to the revival — become a carrier of the language',
        tag: null,
        outcome: 'You are not fluent. You are also not the endpoint of this particular loss, which is what matters.',
        effect: (p) => { p.karma += 10; p.s += 5; p.addFlag('maori_language_carrier'); p.addFlag('cultural_leader'); p.setMem('kohangaReo', true); },
      },
      {
        text: 'Do what you can — this is already more than the generation before managed',
        tag: null,
        outcome: 'Some words survive the generation. Not all. More than nothing.',
        effect: (p) => { p.karma += 5; p.m += 5; p.setMem('kohangaReo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_maori_treaty_settlement',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'maori' &&
      G.currentYear >= 1995 &&
      !G.mem?.treatySettlement,
    text: 'A Treaty settlement comes through for your iwi. Decades of negotiation. A sum of money, a formal apology, some land returned. Your grandfather thought he would see this. He did not. The settlement does not return everything that was taken — it is not designed to, because the mathematics of what was taken cannot be solved in money. It is something. People argue about whether something is enough. You know the answer is no and that no is not the same as nothing.',
    choices: [
      {
        text: 'Get involved in iwi governance — help steward what was returned',
        tag: null,
        outcome: 'The work is slow and contested and worth doing.',
        effect: (p) => { p.karma += 10; p.s += 5; p.addFlag('tribal_leader'); p.setMem('treatySettlement', true); },
      },
      {
        text: 'Take the acknowledgment and continue — the governance is for others',
        tag: null,
        outcome: 'You carry what happened and what was returned and get on with the life you have.',
        effect: (p) => { p.karma += 5; p.m += 3; p.setMem('treatySettlement', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_maori_renaissance',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'maori' &&
      G.currentYear >= 1990 &&
      G.age <= 30 &&
      !G.mem?.maoriRenaissance,
    text: 'There is something in the air in the nineties that was not there in the seventies. Māori language on television. Haka at school events, not apologetically. MPs who are Māori and are not decorative. The Treaty taught in schools, imperfectly but taught. You are growing up Māori in a country that is, slowly and with many contradictions, beginning to understand what that means.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 5; p.addFlag('bicultural_generation'); p.setMem('maoriRenaissance', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CROSS-CULTURAL FOLLOW-THROUGHS
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ind_cultural_loss_grief',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.includes('language_lost') &&
      G.age >= 45 &&
      !G.mem?.culturalLossGrief,
    text: 'You are the age now that your grandparents were when you were small. You try to remember the words they used. Some come back — a few, attached to specific objects or specific moments that still live in you. Most are not there. The language did not survive the generation that held it, and the generation that held it included you.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 10; p.setMem('culturalLossGrief', true); },
  },

  {
    id: 'ind_generational_healing',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.includes('stolen_generation_survivor') ||
       G.flags.includes('residential_school_survivor') ||
       G.flags.includes('boarding_school_survivor')) &&
      G.age >= 60 &&
      !G.mem?.genHeal,
    text: 'Your grandchildren do not carry what you carry — not in the same way. They know about it. They ask questions and you answer carefully, giving them what you think they can carry and keeping back what you think they cannot. There is something in watching them that is not quite repair but is adjacent to it: the sense that what was done to you did not end with you.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 8; p.setMem('genHeal', true); },
  },

  {
    id: 'ind_land_acknowledgment_complexity',
    phase: null,
    weight: 2,
    when: (G) =>
      ['aboriginal_australian', 'indigenous_american', 'first_nations', 'maori',
       'amazonian_indigenous_pe', 'indigenous_mexican'].includes(G.character.ethnicity) &&
      G.currentYear >= 2000 &&
      !G.mem?.landAckComplexity,
    text: 'There are land acknowledgments now at the start of meetings, the start of concerts, the start of school days. You have complicated feelings about this. They are said and then the meeting continues, the concert continues, the school day continues. The land remains in the same hands it was in before the acknowledgment. You are not against the acknowledgments. You are aware that acknowledging something and doing something about it are not the same act.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 3; p.setMem('landAckComplexity', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SAMI (NORWAY / SWEDEN)
  // ═══════════════════════════════════════════════════════════════════════════════
  // The indigenous Sámi people of Scandinavia. Approximately 40,000–60,000 in Norway,
  // 20,000–40,000 in Sweden. The Norwegian state policy of Fornorskingspolitikken
  // (Norwegianisation) — roughly 1850s to 1960s — forced Sami children through
  // boarding schools where their language was punished and their identity systematically
  // suppressed. The Alta dam controversy (1979–82) galvanised the modern Sami rights
  // movement. The Sami Parliament (Sámediggi) opened in 1989 in Norway.

  {
    id: 'ind_sami_boarding',
    phase: 'childhood',
    weight: 6,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      ['Norway', 'Sweden'].includes(G.character.country?.name) &&
      G.currentYear >= 1920 && G.currentYear <= 1970 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.samiBoarding,
    text: 'The internatskole is a long way from the siida — a day and a half by whatever transport the terrain allows. The rule is stated on the first day and enforced: Norwegian only. The word for the animal you have grown up alongside, the one with hundreds of names for its sex and age and condition, has one word here. You say that word and the word is empty. You learn to be silent about the things that require the right language. By the time you come home for summer, speaking to your grandmother requires an effort it did not require before.',
    choices: null,
    effect: (p) => { p.m -= 20; p.h -= 8; p.e += 3; p.addFlag('sami_boarding_survivor'); p.addFlag('language_lost'); p.setMem('samiBoarding', true); },
  },

  {
    id: 'ind_sami_reindeer_migration',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      ['Norway', 'Sweden'].includes(G.character.country?.name) &&
      G.currentYear >= 1930 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.samiMigration,
    text: 'The spring migration is not a journey between places. It is a reading of everything — the ice thickness under the hooves, the way a particular peak holds weather, the sound a herd makes when it is calm versus the sound it makes when something is wrong. Your grandfather does not teach this as instruction. He does it and you are there. What you are learning cannot be put in the school curriculum because the school curriculum has no category for it.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 10; p.addFlag('sami_reindeer_knowledge'); p.setMem('samiMigration', true); },
  },

  {
    id: 'ind_sami_alta',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      G.character.country?.name === 'Norway' &&
      G.currentYear >= 1979 && G.currentYear <= 1982 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.samiAlta,
    text: 'The government plans to dam the Alta-Kautokeino river. The valley that would be flooded is Sami land, and the state\'s response to the protests — that the development is for the national good — is not a new answer. The protestors set up camp outside the Storting. Some go on hunger strike. You go to Oslo, or you follow it from the north, or you argue about it in the siida for months. What is new is not the injury — it is the organized refusal.',
    choices: [
      {
        text: 'You go to the protest. This is the thing that was worth going to Oslo for.',
        tag: 'protest',
        outcome: 'The dam is built — they build it anyway. But something that was not there before is now there: a Sami political voice that has been heard nationally and will not go quiet.',
        effect: (p) => { p.m += 5; p.s += 5; p.karma += 6; p.addFlag('sami_alta_witness'); p.addFlag('activist'); p.setMem('samiAlta', true); },
      },
      {
        text: 'You do not go. The outcome is already decided and you know it.',
        tag: 'home',
        outcome: 'The dam is built. The valley is flooded. What you feel watching it on the news is not quite surprise — it is something older than surprise.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('sami_alta_witness'); p.setMem('samiAlta', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_sami_parliament_1989',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      G.character.country?.name === 'Norway' &&
      G.currentYear === 1989 &&
      G.age >= 16 &&
      !G.mem?.samiParliament,
    text: 'The Sami Parliament opens on the twelfth of October. King Olav V speaks. He says: the Norwegian state was founded on the territory of two peoples — Norwegians and Sami — and that the state had treated the Sami unjustly. A sitting Norwegian king says this aloud in a ceremony. It is not the same as undoing what was done. The language is still diminished, the land is still managed by others, the boarding school generation is still alive and carrying what they carry. But the acknowledgment is real, and official acknowledgment is not nothing.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.addFlag('sami_parliament_moment'); p.setMem('samiParliament', true); },
  },

  {
    id: 'ind_sami_hidden_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      ['Norway', 'Sweden'].includes(G.character.country?.name) &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.samiHidden,
    text: (G) => G.flags.has('sami_boarding_survivor')
      ? 'Your parents did not tell you to hide it — they simply did not mention it in the contexts where it could cause difficulty. You understood without being told. The neighbours who know your family know; the city does not need to know. The specific object you were taught to put away when visitors came was not a shameful object — it was the object that required explanation, and explanation was expensive in ways that varied by the year and who was doing the explaining.'
      : 'Your grandmother stopped speaking Northern Sami in public somewhere in the 1950s. She did not stop speaking it at home entirely, but home was a specific category that the door closed on. What she carried was not hidden from you — it was held carefully. You have grown up knowing what you are and not always knowing what to do with that knowledge in rooms that have no category for it.',
    choices: [
      {
        text: 'You begin to say it openly. This is who you are and the explanation is the other person\'s work now.',
        tag: 'reclaim',
        outcome: 'The explanation varies by audience. Some are curious. Some are dismissive. A few have questions that surprise you with their precision. The saying-it is its own thing, separate from the responses.',
        effect: (p) => { p.m += 6; p.s += 4; p.addFlag('sami_identity_reclaimed'); p.setMem('samiHidden', true); },
      },
      {
        text: 'The calculation remains complicated. Some rooms are not the place for it.',
        tag: 'navigate',
        outcome: 'You continue to navigate this. The navigation is not shame — it is an accurate reading of which rooms have room for you.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('samiHidden', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_sami_language_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      ['Norway', 'Sweden'].includes(G.character.country?.name) &&
      G.flags.has('language_lost') &&
      G.currentYear >= 1992 &&
      G.age >= 30 &&
      !G.mem?.samiLangReturn,
    text: 'The Sami Languages Act gave Northern Sami co-official status in certain municipalities. There are classes now — adult learners, most of them in the same position, which is: it was spoken in the house when they were small, and then it was not. The teacher is younger than you are. Some of what she teaches arrives in the room already — words attached to specific sensory memories that you did not know you had retained.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.r += 4; p.addFlag('sami_language_returned'); p.setMem('samiLangReturn', true); },
  },

  {
    id: 'ind_sami_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.ethnicity === 'sami' &&
      ['Norway', 'Sweden'].includes(G.character.country?.name) &&
      G.age >= 60 &&
      !G.mem?.samiLate,
    text: (G) => {
      if (G.flags.has('sami_language_returned')) {
        return 'The language came back, partially. Enough to speak to your grandchildren in — a sentence here, the names of things, the specific word for the weather that Northern Sami has and Norwegian does not. It did not come back the way it was. It came back the way things come back: changed by the years it was gone, arriving as a living thing that has been through something rather than the preserved thing you thought you were recovering.'
      }
      if (G.flags.has('sami_boarding_survivor')) {
        return 'What the boarding school took from you can be calculated and the calculation is not short. The language is the most visible item on the list — the direct line to the grandmother, the naming systems for animals and weather and terrain that have no equivalent. But there are things on the list that are harder to name: the specific way of knowing a landscape that requires the right words, and the relationship to time that the Sami calendar encodes. You carry what you retained. You know what you did not retain.'
      }
      return 'You are what you are, in the way the twentieth century made it possible and impossible to be. The Parliament exists now. The language has legal status. Your grandchildren are learning it in school, imperfectly but in school. What the century did cannot be undone by these things. What the century did also did not end here — it ended differently than it began.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 3; p.setMem('samiLate', true); },
  },

]
