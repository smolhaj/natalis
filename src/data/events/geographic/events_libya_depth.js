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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_BERBER(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.lbyBerber,
    text: `Gaddafi's Libya is Arab Libya. The Amazigh language — Tamazight — is not permitted in schools, not in public life, not in official space. The Berber villages of the Nafusa Mountains and the Jabal Nafusa know this. The language continues at home, in whispers and in the household, but it cannot be written in any official document. It has no alphabet in public. The cultural memory is sustained privately: the songs, the weaving patterns, the genealogies in a language that the state insists does not belong here. Growing up Amazigh under the Jamahiriya is growing up with a history that the government's version of history does not include.`,
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1976 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.lbyGreenBook,
    text: `The Green Book is in the curriculum. You study it the way you study mathematics — as a given, as a system, as a thing that requires correct answers. The Third Universal Theory: neither capitalism nor communism, but something Gaddafi calls the Third Way. Direct democracy through basic popular congresses. Private enterprise abolished. The press replaced with mass media that belongs to the masses. You learn the vocabulary and produce the vocabulary in the right contexts. What you make of it privately is a different question, one that has no safe venue.`,
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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear === 1986 &&
      G.age >= 4 && G.age <= 22 &&
      !G.mem?.lby1986,
    text: `April 15, 1986. Reagan's retaliation for the West Berlin disco bombing: eighteen American F-111s fly from England, refuelling in the air over the Atlantic because France refused overflight permission. Tripoli at 2am: the bombs fall on the Bab al-Azizia compound, on the Tripoli Military Airport, on the civilian district of Bin Ashour. Gaddafi escapes to a tent. His adopted infant daughter Hana is killed. Sixty-three Libyans die in Tripoli and Benghazi. You are in the country being bombed. The American justification — self-defence against terrorism — is the same logic that will be used in other countries in other decades. You know what it feels like from the receiving end.`,
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
    text: `The scholarship takes you abroad — to Bulgaria, Romania, the Soviet Union, Yugoslavia, or later to Britain or Germany if the period is right and the family has connections. The Libyan People's Bureau in the capital you live in is not only a consulate. It also monitors Libyan students: who attends what events, who associates with dissidents, who says the wrong thing in the wrong company. The revolutionary committees have chapters abroad. You have been told, by older students, to be careful. You are careful. The careful version of yourself abroad is not entirely the same person who left Libya.`,
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
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2011 &&
      G.age >= 12 && G.age <= 30 &&
      !G.mem?.lbyBenghazi,
    text: `The country has two centres that are not centres in equal measure. Tripoli is the capital; the government, the money, the attention are concentrated there. Benghazi is the second city — the eastern city, the oil city, the city that considers itself older and less deferential. The revolution of 1969 was carried out by officers mostly from the west and the interior; the resentments of the east run through the whole Gaddafi period as an undercurrent. In 2011 it is Benghazi that starts the revolution and holds it longest. The geography of the country — the coastal ribbon, the vast empty interior — is also a map of its politics.`,
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 2014 && G.currentYear <= 2023 &&
      G.age >= 25 &&
      !G.mem?.lbyMigration,
    text: `After Gaddafi falls the borders are ungoverned. Libya becomes the primary exit point for people crossing the Mediterranean to Europe from sub-Saharan Africa. The International Organisation for Migration counts hundreds of thousands transiting per year. In 2017, CNN airs footage from a market near Sabha where African migrants are being sold as labour. The detention centres on the outskirts of Tripoli and Benghazi hold tens of thousands in conditions that international organisations describe in specific terms. You are living in the country that has become this. The country that became this is not the one you grew up in and also is.`,
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
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_LIBYA(G) &&
      G.currentYear >= 1999 && G.currentYear <= 2011 &&
      G.age >= 25 &&
      !G.mem?.lbyPanAfrica,
    text: `After the Arab League failed him — Arab unity never arrived, the Arab summits became theatre — Gaddafi turned south. He funded the African Union's founding. He called himself King of Kings of Africa, adopting the title after a gathering of traditional chiefs he convened. He financed movements and militias across the Sahel. Libyan money went into Chad, Niger, Mali. Sub-Saharan African workers, mostly from Mali and Niger, came to Libya in significant numbers for oil-economy jobs. The anti-African xenophobia that existed in Libyan society co-existed with Gaddafi's pan-African rhetoric in the way that contradictions existed under the Jamahiriya: present and not spoken of directly.`,
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_LIBYA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.lbyFezzan,
    text: `The Fezzan is the southern third of Libya — a third of a country that is already ninety percent desert. The oasis towns of Sabha, Murzuk, Ghat. The Tuareg who are Libyan but also part of a people that crosses the Algerian, Malian, and Nigerien borders without the borders meaning much. The ancient Saharan trade routes that predate the country by centuries. Growing up in the Fezzan is growing up in a place the Mediterranean coast considers the interior — remote, underfunded, different. The Sahara has its own texture: the date palms, the cold nights, the way the light is different from the coast. The country of the coast is a distant authority.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 3
      p.addFlag('lby_dep_fezzan_generation')
      p.setMem('lbyFezzan', true)
    },
  },

]
