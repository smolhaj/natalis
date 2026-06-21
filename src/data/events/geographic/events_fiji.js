// events_fiji.js — Fiji arc
// Two communities sharing one island group: iTaukei (Indigenous Fijian, communal land,
// Christian majority) and Indo-Fijian (descended from girmitiya indentured laborers
// brought by the British 1879–1920, Hindu/Muslim majority, no right to own land).
//
// Key events: 1987 Rabuka coups (Indo-Fijian coalition won election, military removed them);
// land lease expiries 1997–2002 (30-year ALTO leases not renewed); 2000 Speight coup
// (PM Chaudhry held hostage 56 days); emigration wave (40% of Indo-Fijians left 1987–2010);
// 2006 Bainimarama coup (anti-communal; new constitution 2013 removed ethnic quotas).

const IS_FIJI = (G) => G.character.country?.name === 'Fiji'
const IS_INDO_FIJIAN = (G) => G.ethnicity === 'indo_fijian'
const IS_ITAUKEI = (G) => G.ethnicity === 'itaukei'

export const FIJI_EVENTS = [

  // ── GIRMITIYA MEMORY ─────────────────────────────────────────────────────────
  // The inherited knowledge of how Indo-Fijians arrived.

  {
    id: 'fj_girmitiya_memory',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_FIJI(G) &&
      IS_INDO_FIJIAN(G) &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.fjGirm,
    text: 'Your grandmother or grandfather has told you, when they thought you were old enough to carry it: your great-great-grandparents came on ships from Calcutta or Madras or Lucknow. They signed a paper called a girmit — the word is a corruption of "agreement," and the corruption is appropriate, because what they agreed to and what they received were not the same thing. Five years of sugar cane at wages set by the planter, in lines of barracks that divided communities by language and caste and religion in ways designed to prevent solidarity. After five years, they could go back if they could afford the passage home. Most could not afford it. Most stayed. You are the reason they stayed.',
    choices: null,
    effect: (p) => { p.e += 5; p.r += 4; p.addFlag('girmitiya_heritage'); p.setMem('fjGirm', true) },
  },

  // ── SUGAR CANE SEASON ─────────────────────────────────────────────────────────
  // The economy that defines Indo-Fijian existence.

  {
    id: 'fj_cane_season',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_FIJI(G) &&
      IS_INDO_FIJIAN(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.fjCane,
    text: 'In cane season the fields are cut by hand — the leaves stripped, the stalks macheted at the root, the bundles loaded onto punts that go to the mill by a private rail line. Your family leases this land. The lease is for thirty years from the government, which holds it in trust for the iTaukei landowners, who cannot sell it but whose permission is needed to renew. The lease has twenty years left, or ten, or five. You have grown up with this number as a background fact: the years remaining on the lease, the question of renewal that no one mentions aloud during the harvest.',
    choices: null,
    effect: (p) => { p.h += 3; p.e += 3; p.r += 3; p.addFlag('cane_farming_generation'); p.setMem('fjCane', true) },
  },

  // ── THE 1987 COUP: INDO-FIJIAN PERSPECTIVE ────────────────────────────────────

  {
    id: 'fj_1987_coup_indo',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_FIJI(G) &&
      IS_INDO_FIJIAN(G) &&
      G.currentYear >= 1987 && G.currentYear <= 1989 &&
      G.age >= 16 && G.age <= 55 &&
      !G.mem?.fj1987,
    text: 'Lieutenant Colonel Sitiveni Rabuka walks into parliament on May 14, 1987, with soldiers, and removes the government that won the election six weeks ago. The coalition that won included your community — for the first time, a Fijian of Indian descent would be deputy prime minister. The election result stands in the record. Rabuka\'s coup stands in the record. What stands in the present is that the government you voted for no longer exists, and the constitution that produced it will be suspended, and the new one being drafted will make explicit what the coup has already made implicit.',
    choices: null,
    effect: (p) => {
      p.m -= 20; p.r += 12; p.e += 4;
      p.addFlag('fiji_1987_generation');
      p.addFlag('fiji_coup_displaced_politically');
      p.setMem('fj1987', true);
    },
  },

  // ── THE 1987 COUP: ITAUKEI PERSPECTIVE ───────────────────────────────────────

  {
    id: 'fj_1987_coup_itaukei',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_FIJI(G) &&
      IS_ITAUKEI(G) &&
      G.currentYear >= 1987 && G.currentYear <= 1989 &&
      G.age >= 16 && G.age <= 55 &&
      !G.mem?.fj1987,
    text: 'Rabuka takes the government out because the election produced a result that the iTaukei military and landowning class could not accept — a Fiji led in part by people whose great-grandparents arrived on indenture ships. Your family\'s position on this is complicated. The coup is not wrong, exactly — the land, the church, the customs that define Fiji as Fiji have always needed protection. But Rabuka in fatigues walking into parliament is not the same as the chiefs in council deciding. The distinction matters to you. You are not sure it matters to anyone with a gun.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.r += 6; p.e += 4;
      p.addFlag('fiji_1987_generation');
      p.setMem('fj1987', true);
    },
  },

  // ── THE LAND LEASE EXPIRES ────────────────────────────────────────────────────
  // The 30-year ALTO leases expiring 1997–2002, not renewed for many farmers.

  {
    id: 'fj_land_lease_expires',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      IS_FIJI(G) &&
      IS_INDO_FIJIAN(G) &&
      G.currentYear >= 1997 && G.currentYear <= 2004 &&
      G.age >= 35 && G.age <= 65 &&
      G.flags.has('cane_farming_generation') &&
      !G.mem?.fjLeaseExp,
    text: 'The lease expires. The letter from the Native Land Trust Board arrives with the formal language of a system working as designed. The iTaukei landowners — most of whom your family has never met — have decided not to renew. Thirty years ago your parents signed this lease, cleared additional land, built a house, planted the ratoon that still produces. The land is not yours: it has never been yours. You knew this. The lease said it. Still, you find yourself standing in the field calculating what it costs to leave.',
    choices: [
      {
        text: 'You sell the equipment and leave. The lease has ended.',
        tag: 'leave_land',
        outcome: 'The equipment goes for less than it cost. You move to Suva or Lautoka. The field is someone else\'s problem now — or no one\'s.',
        effect: (p) => { p.m -= 25; p.r += 10; p.w -= 3; p.mo -= 3000; p.addFlag('fiji_land_lost'); p.setMem('fjLeaseExp', true) },
      },
      {
        text: 'You petition for renewal. Other families have managed it.',
        tag: 'petition',
        outcome: 'Some leases are renewed; yours is among them this cycle. The next cycle is also thirty years. You start the count again.',
        effect: (p) => { p.m -= 10; p.r += 5; p.karma += 3; p.addFlag('fiji_lease_renewed'); p.setMem('fjLeaseExp', true) },
      },
    ],
    effect: null,
  },

  // ── THE EMIGRATION DECISION ───────────────────────────────────────────────────
  // The wave that took 40% of Indo-Fijians to Australia, NZ, Canada, USA.

  {
    id: 'fj_emigration',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_FIJI(G) &&
      IS_INDO_FIJIAN(G) &&
      G.currentYear >= 1987 && G.currentYear <= 2010 &&
      G.age >= 20 && G.age <= 40 &&
      !G.flags.has('emigrated') &&
      !G.mem?.fjEmigration,
    text: 'Your cousin went to Brisbane two years ago. Your colleague is applying for New Zealand. The Indo-Fijian population is leaving in numbers that show up in the census: 40,000 last decade, this decade heading toward the same. There is a particular arithmetic to the conversation: you have a degree, or qualifications, or an employer in Auckland who will sponsor you. You could stay — people are staying — but staying means the land question, the constitution question, the next coup question, and the question after that. The people leaving are not cowards. The people staying are not fools. It is a choice between two things that are both real.',
    choices: [
      {
        text: 'You leave. The future here is too uncertain.',
        tag: 'emigrate',
        outcome: 'Brisbane or Auckland or Toronto. You arrive with your qualifications and your accent and the specific knowledge that you are now a Fijian Indian in a country that does not have a category for that yet.',
        effect: (p) => { p.m -= 5; p.e += 5; p.w += 3; p.addFlag('fiji_emigrated'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('fjEmigration', true) },
      },
      {
        text: 'You stay. This is your country too.',
        tag: 'stay',
        outcome: 'Fiji without a third of its Indo-Fijian population is a different place. You are part of what is left. You watch others leave for years.',
        effect: (p) => { p.m -= 8; p.r += 8; p.s += 3; p.addFlag('fiji_stayed_on'); p.setMem('fjEmigration', true) },
      },
    ],
    effect: null,
  },

  // ── THE 2000 COUP: SPEIGHT'S HOSTAGES ─────────────────────────────────────────
  // George Speight, 56 days, PM Chaudhry held in parliament.

  {
    id: 'fj_2000_coup',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_FIJI(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2001 &&
      G.age >= 20 && G.age <= 65 &&
      !G.mem?.fj2000,
    text: G => IS_INDO_FIJIAN(G)
      ? 'George Speight takes the parliament building on May 19, 2000. Prime Minister Chaudhry — the first Indo-Fijian prime minister, elected three years after the new constitution was supposed to end ethnic politics — is inside, a hostage, for fifty-six days. You watch it on television or hear it on the radio. The army, which removed the last government, now negotiates with the man who removed this one. Speight will eventually be convicted of treason and sentenced to death, commuted to life, paroled after eight years. The mathematics of this outcome is something you carry for a long time.'
      : 'Speight takes the parliament building and holds the prime minister for fifty-six days. Most of the country — your community included — finds this embarrassing and wrong. The man is a failed businessman with a grudge and a following who confused his grievance with nationalism. The army, eventually, arrests him. But in the fifty-six days before that, ordinary life continues outside the building: the markets open, the buses run, the cane is cut. You continue. You are ashamed of what the continuation implies and unable to see any alternative to it.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.e += 3; p.addFlag('fiji_2000_generation'); p.setMem('fj2000', true) },
  },

  // ── LATE LIFE: WHAT REMAINED ─────────────────────────────────────────────────

  {
    id: 'fj_late_life',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_FIJI(G) &&
      G.age >= 60 &&
      G.flags.has('fiji_1987_generation') &&
      !G.mem?.fjLate,
    text: G => G.flags.has('fiji_emigrated')
      ? 'You are in Auckland or Brisbane or Toronto, and your children were not born in Fiji and do not know how to be Fijian. They are something else — Indian-Kiwi or Indian-Australian, categories that did not exist when you left. You go back sometimes: the mangoes are the same, the humidity is the same, the pace that is nothing like this city is the same. The people who stayed have built something different in the space the emigration left. You are not sure which choice was right. You are not sure the question has a right answer.'
      : 'You stayed, and Fiji has changed around you. The new constitution removed the ethnic quotas; Bainimarama\'s decree said one Fiji, all equal. You do not fully trust this. The coups left their mark on how you hold political certainty — loosely now, aware it can be taken. But the mangoes are the same. The cane is the same. The people who went to Brisbane send photographs of their grandchildren who have never seen a cane field. You have not sent them photographs of yours.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 4; p.m += 5; p.setMem('fjLate', true) },
  },

]
