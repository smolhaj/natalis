// events_turkey_depth.js
// Turkey depth: the September 12 1980 coup and the junta's decade, Alevi identity
// and the 1993 Sivas massacre, the Gezi Park protests of 2013, the night of
// July 15 2016, the 1999 İzmit earthquake, the headscarf divide across generations,
// the hemşehrilik network that structures urban life, and mandatory military service.
// Companion to events_turkey.js and events_ireland_turkey.js.

const IS_TURKEY = (G) => G.character.country?.name === 'Turkey'
const IS_ALEVI = (G) => IS_TURKEY(G) && G.religion === 'muslim_shia'

export const TURKEY_DEPTH_EVENTS = [

  // ── THE 1980 COUP ─────────────────────────────────────────────────────────────

  {
    id: 'trk_dep_1980_coup',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1984 &&
      G.age >= 5 && G.age <= 22 &&
      !G.mem?.trk1980Coup,
    text: `September 12, 1980. The generals take power before dawn — tanks in Ankara, airports closed, parliament dissolved, political parties banned. Bülent Ecevit and Süleyman Demirel, the two men whose governments alternated through the 1970s while street violence killed thousands, are placed under house arrest. In the days and weeks that follow: 650,000 people detained, 1.6 million fingerprinted, 500 executed. The constitution the junta writes and the country ratifies in 1982 structures Turkish politics for the next forty years. The coup is presented as the restoration of order. The order it restores is the junta's order.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 6
      p.addFlag('trk_dep_1980_generation')
      p.setMem('trk1980Coup', true)
    },
  },

  // ── ALEVI IDENTITY AND SIVAS ───────────────────────────────────────────────────

  {
    id: 'trk_dep_alevi_identity',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_ALEVI(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.trkAleviIdentity,
    text: `The Alevis are not Sunnis. The theology is different — the reverence for Ali, the twelve imams, the cem ceremony conducted in the cemevi (gathering house) rather than the mosque, the poetry of Yunus Emre and Pir Sultan Abdal. What you do on Friday night is not what the Sunni neighbourhood does on Friday. The distinction is not always safe. Alevis were massacred in Maraş in 1978, in Çorum in 1980. The cemevi is not recognised as a place of worship by the state. The state mosque is funded and administrated; the cemevi is not. You learn early what this means for where you are in the republic.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.addFlag('trk_dep_alevi_generation')
      p.setMem('trkAleviIdentity', true)
    },
  },

  {
    id: 'trk_dep_sivas_massacre',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_ALEVI(G) &&
      G.currentYear === 1993 &&
      G.age >= 10 && G.age <= 35 &&
      !G.mem?.trkSivas,
    text: `July 2, 1993. Sivas. The Pir Sultan Abdal Cultural Festival: Alevi intellectuals, writers, poets — thirty-five of them plus two hotel workers — die when the crowd outside the Madımak Hotel sets it on fire. The crowd was reacting to a provocateur's claim about a blasphemous author at the festival. The fire burns for hours. The police and fire brigade are late to respond. The charges against the perpetrators will be tried for twenty years. The statute of limitations will run out before a verdict. You know what your community is to the state from the speed of the response and the slowness of the justice.`,
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 9
      p.addFlag('trk_dep_sivas_generation')
      p.setMem('trkSivas', true)
    },
  },

  // ── 1999 İZMİT EARTHQUAKE ─────────────────────────────────────────────────────

  {
    id: 'trk_dep_1999_earthquake',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 1999 &&
      G.age >= 5 &&
      !G.mem?.trk1999Quake,
    text: `August 17, 1999. 3:02am. The earthquake is 7.6 magnitude and centred near İzmit in the Marmara industrial region. Seventeen thousand dead. The buildings that collapse are the ones that were built with the wrong grade of concrete, that had floors added without permits, that were constructed with sand from the sea rather than river sand — a practice everyone in the construction industry knew about. What the earthquake reveals is not seismic risk; it was already mapped. What it reveals is the infrastructure of corruption: the official stamps on buildings that should not have passed inspection, the building codes that everyone knew were routinely ignored. The earth moves at 3am and the buildings built on corruption come down.`,
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 7
      p.h -= 3
      p.addFlag('trk_dep_1999_earthquake')
      p.setMem('trk1999Quake', true)
    },
  },

  // ── GEZI PARK 2013 ────────────────────────────────────────────────────────────

  {
    id: 'trk_dep_gezi_2013',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 2013 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.trkGezi,
    text: `May 27, 2013. The sit-in to protect Gezi Park from a shopping-mall project is small — thirty people, tents, trees. The police move in with tear gas at 5am. By evening the protest is in Taksim Square and growing. By the weekend it is in eighty cities. The specific Istanbul image: the woman in the red dress, tear gas at close range from a policeman — the photograph travels everywhere. What begins as an environmental protest becomes something else: a referendum on ten years of the AKP government, on the pace of change, on who gets to decide what a city looks like. The government calls the protesters looters. The protesters call each other by what they are: teachers, doctors, Kemalists, anarchists, Kurds, LGBT activists, football fan groups. The coalition is temporary. So is the moment.`,
    choices: [
      {
        text: 'Go to the square. Be in it.',
        tag: null,
        outcome: 'You are in it for days, or weeks, until the clearance comes. You carry the tear gas smell for a while. You carry the rest of it longer.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('trk_dep_gezi_generation'); p.setMem('trkGezi', true) },
      },
      {
        text: 'Watch it from the outside. This is bigger than you can calculate.',
        tag: null,
        outcome: 'You watch from windows and from screens. The event happens without you, and you carry a version of it nonetheless.',
        effect: (p) => { p.e += 2; p.r += 3; p.setMem('trkGezi', true) },
      },
    ],
  },

  // ── JULY 15 2016: THE NIGHT OF THE COUP ATTEMPT ───────────────────────────────

  {
    id: 'trk_dep_2016_coup_night',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 2016 &&
      G.age >= 14 &&
      !G.mem?.trk2016Coup,
    text: `The night of July 15, 2016. Fighter jets over Ankara. Tanks on the Bosphorus Bridge. The parliament building is bombed. At 11:30pm Erdoğan appears on CNN Türk via FaceTime — FaceTime, from his phone — and calls on citizens to go to the squares, to the airports, to the streets. The mosques broadcast the ezan — the call to prayer — at midnight, in the middle of the night, not for prayer but to call people out. By 3am the coup is failing. The soldiers on the bridge are surrendering. What comes after is the purge: 150,000 detained or dismissed, the state of emergency. The night has been documented, argued over, contested. You were in Turkey when it happened and you know what it felt like in real time.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.addFlag('trk_dep_2016_generation')
      p.setMem('trk2016Coup', true)
    },
  },

  // ── THE HEADSCARF DIVIDE ──────────────────────────────────────────────────────

  {
    id: 'trk_dep_headscarf_divide',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.character.gender === 'female' &&
      G.currentYear >= 1985 && G.currentYear <= 2013 &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem?.trkHeadscarf,
    text: `The headscarf ban in universities and government employment: official Turkey says the institution requires a secular face; your faith says the head is covered. The ban is enforced with varying strictness depending on the rector, the decade, the government. Some women wear wigs over their headscarves to enter the building. Some switch at the door, a quick adjustment in the stairwell. Some choose the faith and forgo the institution. The ban divides families that have always divided on this question: your mother says keep it on, your aunt says the career is more important, your generation is arguing about something that the generation before could not have imagined debating. The ban is lifted in 2013. The argument it was having continues in a different key.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('trkHeadscarf', true)
    },
  },

  // ── THE HEMŞEHRİLİK NETWORK ───────────────────────────────────────────────────

  {
    id: 'trk_dep_hemşehri',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.trkHemshehri,
    text: `You come to Istanbul, or Ankara, or İzmir, from a town in Anatolia. The first question after where are you from is not what did you study but who do you know from there. The hemşehrilik network — the association of people from the same place of origin — is the infrastructure of your arrival. The hemşehri derneği (association) in the district has your people in it. They will know who is hiring and who has a room. The job you get first is through this network, not through an advertisement. The city is layered in this way: Trabzonlular here, Erzurumlu there, Konyalı somewhere else. The urban geography has an invisible sub-geography of origin.`,
    choices: null,
    effect: (p) => {
      p.s += 3
      p.e += 2
      p.setMem('trkHemshehri', true)
    },
  },

  // ── MANDATORY MILITARY SERVICE ────────────────────────────────────────────────

  {
    id: 'trk_dep_military_service',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1970 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 28 &&
      !G.mem?.trkMilitary,
    text: `The conscription letter arrives. Twelve months — or eighteen months, or twenty-four months, depending on the decade and your education level — in the army. The posting is assigned: somewhere in the southeast if your cohort is unlucky, somewhere more comfortable if not. In the southeast in the 1990s the unlucky posting means the PKK conflict, checkpoint rotations, the specific weight of a rifle at night. Everywhere the service means the barracks, the hierarchy, the particular texture of collective male life under strict authority. You emerge from it with a certificate that employers and families understand, with a cohort who went through it with you, with a body that was shaped by it. In Turkey a man who has not done military service is not fully a man in the public imagination. This is understood before it is articulated.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.s += 2
      p.r += 3
      p.addFlag('trk_dep_military_generation')
      p.setMem('trkMilitary', true)
    },
  },

]
