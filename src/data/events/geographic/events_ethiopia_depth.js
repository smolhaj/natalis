// events_ethiopia_depth.js
// Ethiopia depth: Adwa legacy, Italian occupation 1935–41, Haile Selassie's fall,
// Eritrean separation 1993, EPRDF ethnic federalism, Oromia protests 2015–16,
// Grand Ethiopian Renaissance Dam, running culture, follow-throughs.
//
// Companion to events_ethiopia.js (which covers: Red Terror 1977–78, famine 1983–85,
// Derg fall 1991, Orthodox fasting, coffee ceremony, Addis growth 2010s,
// Abiy peace 2018, Tigray war 2020–22, Pretoria 2022).

const IS_ETHIOPIAN = (G) => G.currentCountry === 'Ethiopia'

export const ETHIOPIA_DEPTH_EVENTS = [

  // ── ADWA LEGACY ────────────────────────────────────────────────────────────

  {
    id: 'eth_adwa_school',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1940 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.ethAdwa,
    text: `At school they teach Adwa differently from how other countries teach their battles. March 1, 1896: the Ethiopian army under Emperor Menelik II destroyed the Italian column. Fifteen thousand Italian and Askari soldiers went in. Three thousand came back. The rest is the number that ended Italy's first attempt to colonise Ethiopia. You learn this in a classroom that still exists because of that day. Your teacher does not say this explicitly. She does not need to.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m += 5
      p.setMem('ethAdwa', true)
    },
  },

  // ── ITALIAN OCCUPATION 1935–1941 ──────────────────────────────────────────

  {
    id: 'eth_italian_invasion_1935',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1935 && G.currentYear <= 1940 &&
      G.age >= 5 && G.age <= 15 &&
      !G.mem?.ethItalian,
    text: `October 1935. The Italian army crosses from Eritrea and Somalia. Mussolini wants what Adwa denied his predecessor. The planes come first — not bombs, but shells that burst and release something the League of Nations has banned: mustard gas. Haile Selassie pleads his case at Geneva. The assembly listens. The Italian advance continues. Addis Ababa falls in 1936 and the Emperor goes into exile in Bath, England, where it rains. The occupation will last five years, nine months, and twelve days — 1,756 days during which Ethiopia, which has never been colonised, is colonised.`,
    choices: [
      {
        text: 'Your family goes to the mountains. The Arbegnoch resistance is already organising.',
        tag: null,
        outcome: 'You grow up in the countryside during the occupation, in a family that is part of the patriot network. When the British and Ethiopian forces take Addis in 1941, you walk back into a city you left as a child.',
        effect: (p) => {
          p.m -= 14
          p.h -= 4
          p.addFlag('eth_arbegnoch_family')
          p.setMem('ethItalian', true)
        },
      },
      {
        text: 'Your family stays in the city and navigates the occupation.',
        tag: null,
        outcome: 'Navigation has its own moral texture. The occupation ends in 1941. Haile Selassie returns from Bath. What the city required during those years — the accommodations, the silences — stays in the family without being named.',
        effect: (p) => {
          p.m -= 10
          p.setMem('ethItalian', true)
        },
      },
    ],
    effect: null,
  },

  // ── HAILE SELASSIE'S FALL 1974 ─────────────────────────────────────────────

  {
    id: 'eth_haile_selassie_fall',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1974 && G.currentYear <= 1975 &&
      G.age >= 14 &&
      !G.mem?.ethEmperorFall,
    text: `September 12, 1974. The Derg — the Coordinating Committee of the Armed Forces — removes Haile Selassie from the Jubilee Palace in a Volkswagen Beetle. He is eighty-two years old. He has been Emperor for forty-four years, minus the five-year Italian occupation, which he spent in England. For most Ethiopians alive, he has simply always been there — the Lion of Judah, the Elect of God, the man who gave the speech at Geneva in 1936 and who, in 1973, allowed a famine to kill 200,000 people while the palace kept its leopards and lions well fed. The government newspaper the next day describes him as "the former king." The Volkswagen Beetle is the detail that stays.`,
    choices: [
      {
        text: `The famine, the feudal system, the palace animals: change was overdue.`,
        tag: null,
        outcome: 'The relief at the end of the imperial era is real. What replaces it will reshape that relief many times.',
        effect: (p) => {
          p.m -= 5
          p.addFlag('eth_haile_selassie_generation')
          p.setMem('ethEmperorFall', true)
        },
      },
      {
        text: `Whatever he was, he was the country's continuity. The man who survived Adwa, survived the Italians, survived.`,
        tag: null,
        outcome: 'You are watching that continuity end in a Volkswagen on a Tuesday morning. The Derg will make the comparison unfavourable quickly.',
        effect: (p) => {
          p.m -= 12
          p.addFlag('eth_haile_selassie_generation')
          p.setMem('ethEmperorFall', true)
        },
      },
    ],
    effect: null,
  },

  // ── ERITREAN SEPARATION 1993 ───────────────────────────────────────────────

  {
    id: 'eth_eritrea_referendum_1993',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1993 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.ethEritreaRef,
    text: `April 1993. Eritrea votes for independence. 99.8% yes. The thirty-year war of liberation — started when Haile Selassie dissolved the British-brokered federation in 1961 — is over. Eritrea is now a country. Ethiopia is landlocked. The ports of Assab and Massawa, through which most of the country's imports and exports have moved for decades, belong to a foreign state. Some Ethiopians are relieved: the war cost them enormously and Eritrean independence was, after everything, a fact before the vote confirmed it. Some are bitter: sixty million people in a dry, food-insecure country, now without a coastline.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.addFlag('eth_eritrea_loss')
      p.setMem('ethEritreaRef', true)
    },
  },

  // ── TPLF ETHNIC FEDERALISM 1991–2018 ─────────────────────────────────────

  {
    id: 'eth_tplf_ethnic_federal',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem?.ethTplf,
    text: `The EPRDF organises Ethiopia into ethnically defined regional states — Oromia, Amhara, Tigray, Somali Region. The argument is that ethnic identity was suppressed under previous governments and deserves territorial expression. The practice is that power stays with the Tigrayan leadership that fought its way into Addis from the north. The positions that matter — military high command, intelligence, certain ministries — reflect a pattern that does not match population distribution. The Oromo, the largest ethnic group at roughly a third of the country, are represented in the capital at something other than a third.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.setMem('ethTplf', true)
    },
  },

  // ── OROMIA PROTESTS 2015–2016 ─────────────────────────────────────────────

  {
    id: 'eth_oromia_protests_2016',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2017 &&
      G.age >= 16 &&
      !G.mem?.ethOromiaProtest,
    text: `The protests start in 2014 over a plan to expand Addis Ababa's administrative boundary into Oromia — farmers will lose their land, again, to the capital's expansion. The protests spread through 2015 and into 2016, the government responds with a state of emergency. At the Irreechaa festival in October 2016 — the Oromo thanksgiving at Lake Hora, the biggest celebration of the Oromo calendar — security forces fire into a crowd that panics and is crushed in the chaos. The official death count says 55. Other accounts say hundreds. The protests do not stop. They are the pressure that will produce, two years later, a prime minister who is Oromo.`,
    choices: [
      {
        text: 'Join the protests. The Irreechaa deaths require it.',
        tag: null,
        outcome: 'The state of emergency restricts movement. You are careful about what you do visibly. The pressure accumulates anyway, from thousands of people making the same calculation.',
        effect: (p) => {
          p.m -= 8
          p.addFlag('eth_oromia_protest_witness')
          p.setMem('ethOromiaProtest', true)
        },
      },
      {
        text: 'Watch from the margins. The risk of being in the street is not abstract.',
        tag: null,
        outcome: 'The protests happen with or without you. What they produce — Abiy Ahmed in 2018 — happens partly because of the years of accumulated pressure, including the people who watched from the margins and are still watching.',
        effect: (p) => {
          p.m -= 5
          p.addFlag('eth_oromia_protest_witness')
          p.setMem('ethOromiaProtest', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE GRAND ETHIOPIAN RENAISSANCE DAM ───────────────────────────────────

  {
    id: 'eth_gerd_dam',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2025 &&
      G.age >= 18 &&
      !G.mem?.ethGerd,
    text: `The Grand Ethiopian Renaissance Dam goes up on the Blue Nile, 500 kilometres from the Sudanese border. It will be the largest hydroelectric dam in Africa when complete. Egypt, which has treated the Nile as its entitlement since antiquity — anchored in a 1959 colonial-era treaty that gave it 55.5 billion cubic metres per year without consulting anyone upstream — is alarmed. Egypt has no legal claim to what Ethiopia builds in Ethiopia. That is, from the Ethiopian side, exactly the point. A country that has had famine, is landlocked, and is building electricity infrastructure it needs with its own engineers and its own bonds. The government asks citizens to buy bonds. A number of people you know already have.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 2
      p.setMem('ethGerd', true)
    },
  },

  // ── ETHIOPIAN RUNNING CULTURE ─────────────────────────────────────────────

  {
    id: 'eth_runners',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_ETHIOPIAN(G) &&
      G.currentYear >= 1960 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.ethRunners,
    text: `At the 1960 Rome Olympics, Abebe Bikila of the Imperial Guard ran the marathon course at night — through the Arch of Constantine, along the Appian Way, past ruins of the civilization that had tried to colonise Ethiopia and failed — and he ran it barefoot and he won and he set a world record. He was the first sub-Saharan African to win an Olympic gold medal. He ran without shoes because the Italian company supplying the Ethiopian team had run out of the right size. In Addis the news arrives by radio. What arrives with it has a specific national frequency.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 2
      p.setMem('ethRunners', true)
    },
  },

  // ── FOLLOW-THROUGH: PROTEST WITNESS × ABIY ────────────────────────────────

  {
    id: 'eth_oromia_abiy_reckoning',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('eth_oromia_protest_witness') &&
      G.flags.has('eth_abiy_generation') &&
      G.age >= 35 &&
      !G.mem?.ethOromiaAbiy,
    text: `Abiy Ahmed is the outcome of the protests, in the way these things work: sustained pressure creates the conditions, and the specific change that emerges is not the change the pressure intended. The people beaten at Irreechaa did not march for Abiy Ahmed. But the years of accumulated pressure — the state of emergencies, the dead, the international scrutiny — are the political landscape he walked into. That he then launched the Tigray war in 2020 adds a layer to the accounting. The protests, and what they produced, and what that production became: you were inside all of it.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ethOromiaAbiy', true)
    },
  },

  // ── FOLLOW-THROUGH: EMPEROR GENERATION, LATE LIFE ─────────────────────────

  {
    id: 'eth_emperor_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('eth_haile_selassie_generation') &&
      G.age >= 60 &&
      !G.mem?.ethEmperorLate,
    text: `The arc: Haile Selassie, who modernised Ethiopia and pleaded its case at Geneva in 1936, who concealed the 1973 famine while the palace kept its lions. The Derg, which killed 300,000 to 500,000 people to build the revolution. The 1984 famine, which the Derg managed as a geopolitical instrument while the aid concerts played. The EPRDF, which held things together at a cost for twenty-seven years. Abiy Ahmed, who won the Nobel Peace Prize and then fought a war of comparable scale. These are the governments of a single lifetime. You have watched all of them from inside the country.`,
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ethEmperorLate', true)
    },
  },

]
