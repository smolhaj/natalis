// events_followthrough_57.js
// Follow-throughs for geographic depth flags:
// Iraq depth: marsh reflooding, Yazidi post-Sinjar, 1991 mass graves, Christian diaspora late life;
// Libya depth: berber revival post-2011, 1986 generation in late life;
// Sudan depth: Nuba late-life witness, transition disillusionment;
// condition arc 2: deaf community elder, HIV long-term disclosure arc.

export const FOLLOWTHROUGH_57_EVENTS = [

  // ── IRAQ: MARSH REFLOODING AFTER 2003 ─────────────────────────────────────────

  {
    id: 'ft57_marsh_reflooded',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('irq_dep_marsh_displaced') &&
      G.currentYear >= 2004 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem?.ft57MarshReflooded,
    text: `After 2003 the dams are opened. The water comes back into the Mesopotamian wetlands at a rate that surprises the engineers: the marsh has memory, the water knows where to go. Some of the families that were displaced are returning — back to the water, back to the reed island sites, building the floating structures in the way the knowledge preserved says they should be built. You go back. The marsh is not what it was — it is smaller, the biodiversity is taking time to return, some of the old channels are silted. But the water is there. The birds are beginning to come back. This is not restoration; it is the beginning of something.`,
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 3; p.setMem('ft57MarshReflooded', true) },
  },

  {
    id: 'ft57_marsh_late_witness',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('irq_dep_marsh_generation') &&
      G.age >= 60 &&
      !G.mem?.ft57MarshLateWitness,
    text: `You have lived the whole arc of the marsh: the world before the draining, the draining itself, the desert years, the reflooding, the slow imperfect return. No one else living knows the marsh at all of those stages. The knowledge you carry is specific to your age and to having been in that particular place through that particular sequence of events. The ethnographers and the hydrologists who come to study the recovery ask you questions. The answers you give are in the body as much as in the memory.`,
    choices: null,
    effect: (p) => { p.e += 3; p.m += 4; p.setMem('ft57MarshLateWitness', true) },
  },

  // ── IRAQ: 1991 MASS GRAVES ─────────────────────────────────────────────────────

  {
    id: 'ft57_1991_mass_graves',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('irq_dep_1991_generation') &&
      G.currentYear >= 2003 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft571991Graves,
    text: `After 2003 the mass graves begin to be opened. The sites were known in the community in the way that things that are known but unspeakable are known — in the particular silence around certain questions, in the way that certain neighbourhoods were not asked about. The Human Rights Ministry begins the process: forensic teams, DNA analysis, the forms to fill in to register a missing family member. The names that come out of the graves are some of the names you knew were missing. The documentation makes it official. The documentation does not change what it was.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.setMem('ft571991Graves', true) },
  },

  // ── IRAQ: YAZIDI POST-SINJAR ───────────────────────────────────────────────────

  {
    id: 'ft57_yazidi_after_sinjar',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('irq_dep_yazidi_generation') &&
      G.currentYear >= 2014 && G.currentYear <= 2023 &&
      G.age >= 20 &&
      !G.mem?.ft57YazidiSinjar,
    text: `August 2014. The Islamic State reaches Sinjar. The Peshmerga withdraws without warning. The Yazidis on the mountain — forty thousand, fifty thousand, more — are surrounded. The men are killed in the plains below. The women are taken as slaves — sabaya, a word from an ancient practice that the Islamic State has revived precisely. The PKK fighters and Kurdish Syrian forces open a corridor to Syria. You have people on that mountain, or you are on that mountain, or you receive the news from a distance that is no distance at all. This is the thing that happened to your people in your lifetime.`,
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 10; p.h -= 5; p.setMem('ft57YazidiSinjar', true) },
  },

  {
    id: 'ft57_yazidi_survivor_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('irq_dep_yazidi_generation') &&
      G.currentYear >= 2017 &&
      G.age >= 50 &&
      !G.mem?.ft57YazidiReckoning,
    text: `The women who were taken and have returned. The number is not the number that was taken — many have not returned, will not return, are not alive to return. The ones who came back describe a specificity of what was done that you receive and cannot adequately hold. The community is scattered now: Yazidis in Germany, in Canada, in Australia, in Sinjar camp, in Erbil camp. The theology says the faith can only be born into, not converted to. The community survives in the diaspora. Whether it reproduces in the diaspora is a question that has no answer yet.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 2; p.setMem('ft57YazidiReckoning', true) },
  },

  // ── IRAQ: CHRISTIAN DIASPORA IN LATE LIFE ─────────────────────────────────────

  {
    id: 'ft57_christian_diaspora_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('irq_dep_christian_generation') &&
      G.age >= 55 &&
      !G.mem?.ft57ChristianLate,
    text: `The Chaldean church in Detroit has more Iraqi Christians in it than the Chaldean church in Baghdad. This is the fact. The diaspora community maintains the liturgy, the Aramaic, the Easter and Christmas traditions in a suburb of Michigan while the church in the neighbourhood you grew up in is attended by old people and by the determined few who would not leave. You are in one of those two churches, or in neither, and you know which version of your community will outlast the other.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.e += 2; p.setMem('ft57ChristianLate', true) },
  },

  // ── LIBYA: BERBER REVIVAL POST-2011 ───────────────────────────────────────────

  {
    id: 'ft57_berber_revival',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('lby_dep_berber_generation') &&
      G.currentYear >= 2011 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.ft57BerberRevival,
    text: `After Gaddafi falls in 2011, the Amazigh community in the Nafusa Mountains holds cultural gatherings that were not possible in forty years of the Jamahiriya. Tamazight is taught in schools for the first time. Signs in Amazigh script appear in the Nafusa towns — signs in a writing system that the previous government had made illegal. The language was kept in the home; now it is put in public. The transition is incomplete and the political situation in Libya is unstable, but the language is visible in a way it was not. You have lived to see this.`,
    choices: null,
    effect: (p) => { p.m += 8; p.e += 2; p.setMem('ft57BerberRevival', true) },
  },

  // ── LIBYA: 1986 GENERATION IN LATE LIFE ───────────────────────────────────────

  {
    id: 'ft57_1986_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('lby_dep_1986_generation') &&
      G.age >= 55 &&
      !G.mem?.ft571986Late,
    text: `April 15, 1986 is a night you carry with precision. The route the American aircraft took — from England, refuelling over the Atlantic because France closed its airspace. The targets. The infant in the compound. The civilian deaths in Bin Ashour. You have lived long enough to watch the same logic applied to other countries in other decades, the self-defence rationale used by states with enough air power to make unilateral decisions. You know what it feels like from one direction. You are one of the people who knows.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft571986Late', true) },
  },

  // ── SUDAN DEPTH: NUBA LATE-LIFE WITNESS ───────────────────────────────────────

  {
    id: 'ft57_nuba_late_witness',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sdn_dep_nuba_generation') &&
      G.age >= 55 &&
      !G.mem?.ft57NubaLate,
    text: `The bombing campaign in the Nuba Mountains ran from 1992 to 2005, with a ceasefire in between that held imperfectly. The Antonov aircraft and the barrel bombs and the periodic ground offensives — these are what your generation carried in the body. The peace agreement of 2005 did not resolve the Nuba question. The 2011 war in South Kordofan came back. You are Nuba and you are alive and what you have lived through has not found a name in any official document that fully holds it.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft57NubaLate', true) },
  },

  // ── SUDAN: TRANSITION DISILLUSIONMENT ─────────────────────────────────────────

  {
    id: 'ft57_transition_disillusioned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sdn_dep_transition_generation') &&
      G.currentYear >= 2021 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      !G.mem?.ft57TransitionDisillusion,
    text: `October 25, 2021. The military dissolves the transitional government. General Burhan's coup undoes what was reached in 2019 in a single morning. The protesters who return to the street are met with live fire. The civilian prime minister is detained. The Forces of Freedom and Change that carried the revolution are split between those who engaged with the military council and those who refused. The thawra — the revolution — is not over, but the particular hope of 2019 and 2020 has been replaced by something more complicated and less clean. You have been through this before, in this country, and you know what comes after the clean hope.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.setMem('ft57TransitionDisillusion', true) },
  },

  // ── CONDITION ARC 2: DEAF ELDER ───────────────────────────────────────────────

  {
    id: 'ft57_deaf_community_elder',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('deaf_community_identity') &&
      G.age >= 60 &&
      !G.mem?.ft57DeafElder,
    text: `You have been in the Deaf community for most of your adult life — the language, the gatherings, the specific social world built on the visual rather than the auditory. Now you are one of the older members of it. The young people who enter the community know a version of it that you helped shape in some small way: by being present, by signing, by showing what a Deaf life that did not apologise for itself looked like. This is what you passed on without intending to and without being able to measure it.`,
    choices: null,
    effect: (p) => { p.m += 6; p.s += 2; p.setMem('ft57DeafElder', true) },
  },

  // ── CONDITION ARC 2: HIV LONG ARC LATE ────────────────────────────────────────

  {
    id: 'ft57_hiv_long_arc',
    phase: 'late_life',
    weight: 2,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'hiv')
      const yrs = c ? G.currentYear - (c.diagnosedYear ?? G.currentYear) : 0
      return !!c && c.managed && yrs >= 15 && G.age >= 50 && !G.mem?.ft57HivLongArc
    },
    text: `Fifteen years, or twenty, or more — living with the virus managed to the point of undetectable, taking the pills with the reliable automaticity of a long habit. The generation who received the diagnosis when there was no treatment and did not survive it — you know their names, or some of them. The generation who received it after treatment was available and has lived long lives with it — you are in that generation. The difference between those two generations is measured in years and in pharmaceutical development and in a very great deal of luck about timing.`,
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('ft57HivLongArc', true) },
  },

]
