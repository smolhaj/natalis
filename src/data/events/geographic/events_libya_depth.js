// events_libya_depth.js
// Libya depth: Amazigh/Berber identity suppressed under Gaddafi's Arabisation,
// the Green Book as mandatory childhood curriculum, the US bombing of Tripoli
// in April 1986, Libyan students abroad surveilled by revolutionary committees,
// the Tripoli-Benghazi regional divide, post-2011 Libya as migration bottleneck,
// Gaddafi's pan-African phase, and the Fezzan — the deep desert south.
// Companion to events_libya.js.

const IS_LIBYA = (G) => G.character.country?.name === 'Libya'
const IS_BERBER = (G) =>
  IS_LIBYA(G) && (G.character.ethnicity === 'berber_libyan' || G.character.ethnicity === 'arab_berber_mixed')

export const LIBYA_DEPTH_EVENTS = [

  // ── AMAZIGH IDENTITY UNDER ARABISATION ────────────────────────────────────

  {
    id: 'lby_dep_berber_identity',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_BERBER(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.lbyBerber,
    text: `Tamazight is spoken at home and nowhere else. Not at school, not in an office, not written on any document; the state says Libya is Arab. In the Nafusa Mountains the songs and the weaving patterns and the genealogies go on in the house. You grow up with a history the government's history does not include.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.addFlag('lby_dep_berber_generation')
      p.setMem('lbyBerber', true)
    },
  },

  // ── GREEN BOOK AT SCHOOL ──────────────────────────────────────────────────

  {
    id: 'lby_dep_green_book_school',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1976 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.lbyGreenBook,
    text: `The Green Book is on the curriculum, and you study it like mathematics, a system that needs correct answers: neither capitalism nor communism, people's congresses, no private enterprise, a press that belongs to the masses. You learn the vocabulary and produce it in the right places. What you make of it privately has no safe place to be said.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 4
      p.addFlag('lby_dep_green_book_generation')
      p.setMem('lbyGreenBook', true)
    },
  },

  // ── THE 1986 US BOMBING ───────────────────────────────────────────────────

  {
    id: 'lby_dep_1986_bombing',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear === 1986 &&
      G.age >= 4 && G.age <= 22 &&
      !G.mem?.lby1986,
    text: `April 1986. The American planes come from England the long way round, because France would not let them cross, and at two in the morning the bombs fall on Tripoli: the compound, the airport, the houses of Bin Ashour. Gaddafi gets away. The Americans call it self-defence against terrorism, a logic other countries will hear in other decades. You know what it feels like from underneath.`,
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.h -= 3
      p.addFlag('lby_dep_1986_generation')
      p.setMem('lby1986', true)
    },
  },

  // ── LIBYAN STUDENTS ABROAD UNDER SURVEILLANCE ─────────────────────────────

  {
    id: 'lby_dep_student_abroad',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.lbyStudentAbroad,
    text: `The scholarship takes you abroad, to Sofia or Belgrade or later to Manchester. The People's Bureau in that city is not only a consulate: it keeps a note of who goes to which meeting and who sits with whom. The older students tell you to be careful, and you are. The careful person you are abroad is not quite the one who left.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 6
      p.m -= 5
      p.addFlag('lby_dep_student_surveilled')
      p.setMem('lbyStudentAbroad', true)
    },
  },

  // ── TRIPOLI-BENGHAZI DIVIDE ───────────────────────────────────────────────

  {
    id: 'lby_dep_benghazi_identity',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2011 &&
      G.age >= 12 && G.age <= 30 &&
      !G.mem?.lbyBenghazi,
    text: (G) => `The country has two centres that are not centres in equal measure. Tripoli is the capital; the government, the money, the attention are concentrated there. Benghazi is the second city — the eastern city, the oil city, the city that considers itself older and less deferential. The revolution of 1969 was carried out by officers mostly from the west and the interior; the resentments of the east run through the whole Gaddafi period as an undercurrent.${G.currentYear >= 2011 ? ' In 2011 it is Benghazi that rises first.' : ''} The geography of the country — the coastal ribbon, the vast empty interior — is also a map of its politics.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.addFlag('lby_dep_benghazi_identity')
      p.setMem('lbyBenghazi', true)
    },
  },

  // ── POST-2011 MIGRATION HUB ───────────────────────────────────────────────

  {
    id: 'lby_dep_migration_hub',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 2014 && G.currentYear <= 2023 &&
      G.age >= 25 &&
      !G.mem?.lbyMigration,
    text: (G) => `After Gaddafi falls the borders are ungoverned. Libya becomes the primary exit point for people crossing the Mediterranean to Europe from sub-Saharan Africa. The International Organisation for Migration counts hundreds of thousands transiting per year.${G.currentYear >= 2018 ? ' In 2017, CNN airs footage from an auction near Tripoli where African migrants are being sold as labour.' : ' The word that the aid workers use for what happens in the southern towns is one you did not expect to hear in this century.'} The detention centres on the outskirts of Tripoli and Benghazi hold tens of thousands in conditions that international organisations describe in specific terms. You are living in the country that has become this. The country that became this is not the one you grew up in and also is.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.addFlag('lby_dep_migration_witness')
      p.setMem('lbyMigration', true)
    },
  },

  // ── GADDAFI'S PAN-AFRICAN PHASE ───────────────────────────────────────────

  {
    id: 'lby_dep_pan_africa',
    phase: null,
    weight: 2,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1999 && G.currentYear <= 2011 &&
      G.age >= 25 &&
      !G.mem?.lbyPanAfrica,
    text: `Gaddafi has given up on the Arabs and turned south. He calls himself King of Kings of Africa, and Libyan money goes into Chad, Niger and Mali. Men from Mali and Niger come north to work the oil economy. The xenophobia toward them in the street lives alongside the pan-African speeches on the radio, and nobody mentions the contradiction.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 4
      p.setMem('lbyPanAfrica', true)
    },
  },

  // ── THE FEZZAN ────────────────────────────────────────────────────────────

  {
    id: 'lby_dep_fezzan',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.lbyFezzan,
    text: `The Fezzan: Sabha, Murzuk, Ghat, a third of a country that is already mostly desert. The Tuareg here are Libyan and also a people that crosses three borders as if they were not there. The nights are cold, the dates are good, and the light is not the coast's light. The coast is a distant authority that thinks of you as the interior.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.addFlag('lby_dep_fezzan_generation')
      p.setMem('lbyFezzan', true)
    },
  },

]
