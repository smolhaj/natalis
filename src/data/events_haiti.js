// BUILD 55 — Haiti arc
// Papa Doc Duvalier 1957–71: Tonton Macoutes, voodoo as state terror, the intellectual class
// exiled or killed. Baby Doc 1971–86: the facade. 2010 earthquake: 220,000+ dead, first Black
// republic's infrastructure destroyed in 35 seconds. The debt of independence: France extorted
// the equivalent of $21B over 122 years for the "property" (enslaved people) Haiti freed.
// Diaspora: Brooklyn, Miami, Montreal — the obligation to send money home is total.

const IS_HAITI = (G) => G.character.country?.name === 'Haiti'
const IS_HAITIAN = (G) => G.character.country?.name === 'Haiti' || G.character.ethnicity === 'afro_haitian'

export const HAITI_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'hai_diaspora_earthquake_call',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.has('haitian_diaspora') && G.currentYear >= 2010 && G.currentYear <= 2013 && !G.mem.haiDiasEarthquake,
    text: 'January 12, 2010. The news reaches you before you can verify it. You call every number you have. The circuits are jammed. For three days you know only: 7.0 magnitude, Port-au-Prince, the National Palace in rubble. You learn what you have in the fourth day: who answered, who didn\'t.',
    choices: [
      {
        text: 'Someone you needed didn\'t answer.',
        tag: 'lost_family',
        outcome: 'The call that never connects. You know before you know. You take a flight into Santo Domingo and cross the border by car.',
        effect: (p) => { p.m -= 25; p.h -= 5; p.addFlag('earthquake_family_loss'); p.setMem('haiDiasEarthquake', true) },
      },
      {
        text: 'Everyone you called answered.',
        tag: 'all_safe',
        outcome: 'You are in the lucky fraction and you know it. You spend three weeks sending money and trying to reach cousins who didn\'t answer anyone\'s calls.',
        effect: (p) => { p.m -= 12; p.karma += 6; p.setMem('haiDiasEarthquake', true) },
      },
    ],
  },

  {
    id: 'hai_diaspora_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('haitian_diaspora') && G.age >= 60 && !G.mem.haiDiasLate,
    text: 'You have been sending money home for thirty years. You have sent enough to build a house, twice. The house was destroyed in the earthquake and rebuilt again. Your children were born here; they speak Creole like a second language, which is what it is. When you go back, you are called diaspora, which means someone who left. When you stay here, you are called Haitian, which means you haven\'t quite arrived.',
    effect: (p) => { p.m -= 4; p.setMem('haiDiasLate', true) },
  },

  {
    id: 'hai_duvalier_midlife_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('tonton_macoute_era') && G.age >= 38 && !G.mem.haiDuvaliereEcho,
    text: 'A politician in the news has the same look. You cannot explain the look to people who didn\'t grow up with it — it is not the face but what the face doesn\'t do. The capacity for violence worn like a neutral expression. You know it when you see it because you grew up knowing it. Your children, born here, do not understand why you changed the channel.',
    effect: (p) => { p.m -= 5; p.setMem('haiDuvaliereEcho', true) },
  },

  // ── DUVALIER ERA ──────────────────────────────────────────────────────────

  {
    id: 'hai_macoute_texture',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_HAITI(G) && G.currentYear >= 1957 && G.currentYear <= 1986 && G.age >= 6 && G.age <= 14 && !G.mem.haiMacoute,
    text: 'The men with the dark glasses and the machetes are not police. They are not army. They are VSN — Volunteers for National Security — though everyone calls them Tonton Macoutes. Uncle Gunnysack, from the old story. They answer to no one but Papa Doc, or later Baby Doc. They are paid in impunity. You learn very early which things are not said in certain company, which streets are better avoided in the afternoon.',
    effect: (p) => { p.m -= 10; p.addFlag('tonton_macoute_era'); p.addFlag('learned_silence'); p.setMem('haiMacoute', true) },
  },

  {
    id: 'hai_intellectual_disappearance',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_HAITI(G) && G.currentYear >= 1960 && G.currentYear <= 1980 && G.career?.field === 'education' || (IS_HAITI(G) && G.currentYear >= 1960 && G.currentYear <= 1980 && G.stats.smarts >= 60 && !G.mem.haiIntellect),
    text: 'A professor at the lycée has not come in. This is how it happens — not an arrest you witness, not an announcement. A person is present and then is not. The chair at the front of the room is empty. The students who ask about it are told the professor is ill. The students who ask a second time are noted.',
    choices: [
      {
        text: 'Ask no more questions.',
        tag: 'went_silent',
        outcome: 'You learn the shape of the silence that keeps you safe. You will teach it, later, without meaning to.',
        effect: (p) => { p.m -= 8; p.addFlag('learned_silence'); p.setMem('haiIntellect', true) },
      },
      {
        text: 'Ask a trusted person quietly.',
        tag: 'asked_quietly',
        outcome: 'They tell you enough. Not everything — enough. You carry the answer and its implications for the rest of your time in this country.',
        effect: (p) => { p.m -= 10; p.karma += 4; p.addFlag('knows_the_cost'); p.setMem('haiIntellect', true) },
      },
    ],
  },

  {
    id: 'hai_baby_doc_falls',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_HAITI(G) && G.currentYear >= 1986 && G.currentYear <= 1987 && !G.mem.haiBabyDoc,
    text: 'February 7, 1986. Radio reports that Jean-Claude Duvalier has left by plane. You hear it at first and don\'t believe it. Then people are in the street. Then the Macoutes are running and the crowds are pulling down statues and you understand that twenty-nine years have ended in a morning. The euphoria is total. It will not survive the year.',
    effect: (p) => { p.m += 15; p.addFlag('hai_transition_generation'); p.setMem('haiBabyDoc', true) },
  },

  // ── DEBT OF INDEPENDENCE ──────────────────────────────────────────────────

  {
    id: 'hai_debt_of_independence',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_HAITIAN(G) && G.age >= 18 && G.age <= 32 && !G.mem.haiDebtLesson,
    text: 'In 1825, France agreed to recognise Haitian independence in exchange for 150 million francs — compensation for the "property" France lost when the enslaved population freed themselves. Haiti paid. The last payment was made in 1947. One hundred and twenty-two years of payments to the country that had enslaved you, for the crime of having freed yourself. The modern equivalent is approximately $21 billion. This is not taught in school here. You read it in a library, or hear it from someone who did.',
    choices: [
      {
        text: 'Sit with the numbers for a long time.',
        tag: 'sat_with_it',
        outcome: 'You carry it now. Not as anger — or not only as anger. As a specific knowledge of how the modern world was made and who paid for it.',
        effect: (p) => { p.e += 3; p.addFlag('knows_the_debt'); p.setMem('haiDebtLesson', true) },
      },
      {
        text: 'Look for what was built with it anyway.',
        tag: 'looked_forward',
        outcome: 'Haiti built a country anyway. On broken ground, under embargo, paying a ransom for its own freedom. That story is also true.',
        effect: (p) => { p.m += 3; p.karma += 4; p.addFlag('knows_the_debt'); p.setMem('haiDebtLesson', true) },
      },
    ],
  },

  // ── EARTHQUAKE 2010 ───────────────────────────────────────────────────────

  {
    id: 'hai_earthquake_2010',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_HAITI(G) && G.currentYear === 2010 && !G.flags.has('earthquake_2010_survived') && !G.mem.haiEarthquake,
    text: '4:53 in the afternoon. The ground moves wrong — not like the small ones you have felt before. This is the ground itself failing. Thirty-five seconds. When it stops, the city is not the city. A neighbour\'s wall has become the street. Where the church was: rubble. Where the market was: rubble. You cannot see the National Palace from here but you hear it has fallen. You hear everything has fallen.',
    choices: [
      {
        text: 'Search for your family in the rubble.',
        tag: 'searched',
        outcome: 'You find them. Not everyone finds theirs. You will think about that for years — the specific mathematics of who survived.',
        effect: (p) => { p.m -= 22; p.h -= 8; p.addFlag('earthquake_2010_survived'); p.setMem('haiEarthquake', true) },
      },
      {
        text: 'Help neighbours dig before searching for your own.',
        tag: 'helped_neighbours',
        outcome: 'A child is pulled out of a collapsed school three hours in. Your family is found later, intact. The child\'s family asks your name.',
        effect: (p) => { p.m -= 18; p.karma += 12; p.addFlag('earthquake_2010_survived'); p.setMem('haiEarthquake', true) },
      },
    ],
  },

  {
    id: 'hai_earthquake_camp',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.has('earthquake_2010_survived') && G.currentYear >= 2010 && G.currentYear <= 2012 && !G.mem.haiEarthCamp,
    text: 'The camp has a number, not a name. Blue tarpaulins from a UN agency. The water truck comes twice a week. Cholera has arrived in the Artibonite valley — UN peacekeepers brought it, though it takes years for anyone to officially acknowledge this. In the camp, the disease moves through families in hours. You know now, from living in a camp, that distance between the powerful and the consequence of their decisions is the central fact of the world.',
    effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('earthquake_camp_survivor'); p.setMem('haiEarthCamp', true) },
  },

  // ── DIASPORA DECISION ─────────────────────────────────────────────────────

  {
    id: 'hai_diaspora_decision',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_HAITI(G) && G.age >= 18 && G.age <= 32 && !G.flags.has('haitian_diaspora') && !G.mem.haiDiasDecision,
    text: 'Brooklyn, Miami, Montreal — every family has someone there. The remittances that come back keep households running. There is a word for the people who leave: *dyaspora*. They are respected and resented in roughly equal measure. The question is not whether you want to go but whether you can find the papers, the money, the connection that makes it possible.',
    choices: [
      {
        text: 'Go. Build a life that can send money back.',
        tag: 'left',
        outcome: 'The crossing is hard. The arrival is harder. The first years are smaller than you imagined. The money you send home is real.',
        effect: (p) => { p.addFlag('haitian_diaspora'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('haiDiasDecision', true) },
      },
      {
        text: 'Stay. Someone has to.',
        tag: 'stayed',
        outcome: 'You watch the departures. The neighbourhood empties in a direction that doesn\'t reverse. You build something here.',
        effect: (p) => { p.m -= 5; p.addFlag('stayed_behind'); p.setMem('haiDiasDecision', true) },
      },
    ],
  },
]
