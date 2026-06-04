export const WORLD_EVENTS = [
  {
    id: 'soviet_collapse',
    name: 'Collapse of the Soviet Union',
    years: [1991, 1993],
    archetypes: ['post_soviet'],
    countries: null,
    narrative: 'The Soviet Union dissolves. Prices double, then double again, within weeks. The salary you were paid last month is no longer what it was worth. The economy your parents understood — the one with fixed prices and guaranteed jobs — no longer exists, and neither does the country.',
    effect: (p) => { p.w -= 15; p.m -= 8; },
    addFlags: ['survived_soviet_collapse'],
    minAge: 0,
  },
  {
    id: 'venezuela_caracazo_1989',
    name: 'El Caracazo',
    years: [1989, 1990],
    archetypes: null,
    countries: ['Venezuela'],
    minAge: 8,
    narrative: 'February 27, 1989. Carlos Andrés Pérez\'s IMF austerity package takes effect overnight: fuel prices triple, bus fares double. By morning the barrios are in the streets. The army is deployed with live ammunition. The official death toll is two hundred and seventy-six; human rights organisations count at least five hundred. Mass graves near Caracas will not be found for twenty years. The Caracazo is the beginning of the end of the old Venezuela — and the beginning of Hugo Chávez.',
    context: 'The Caracazo was the first major popular uprising against IMF-mandated structural adjustment in Latin America. The military officer who would lead two coup attempts in 1992 and win the presidency in 1998 — Hugo Chávez Frías — cited El Caracazo as the moment he understood the old political order had to be replaced. The event directly shaped the next thirty years of Venezuelan political history. Venezuela\'s Supreme Court ruled in 2011 that the killings constituted a crime against humanity; convictions followed, though many perpetrators remained unpunished.',
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('caracazo_generation'); },
    addFlags: ['caracazo_generation'],
  },
  {
    id: 'cold_war_end',
    name: 'End of the Cold War',
    years: [1989, 1992],
    archetypes: ['post_soviet', 'wealthy_west'],
    countries: null,
    narrative: 'The wall comes down. The world you were told was fixed — the two sides, the permanent standoff — is not fixed. People are walking through the Brandenburg Gate. History, which felt like a geological fact, is clearly not. Whatever comes next, you are watching the before and after happen in a single night.',
    effect: (p) => { p.m -= 5; },
    addFlags: ['cold_war_generation'],
    minAge: 6,
  },
  {
    id: 'chernobyl',
    name: 'Chernobyl Disaster',
    years: [1986, 1987],
    archetypes: 'all',
    countries: ['Ukraine', 'Russia', 'Belarus'],
    narrative: (G) => {
      const age = G.age
      if (age <= 10) return 'At night, adults start moving. Something is burning but it is not the kind of burning you can see. Your parents pack a bag and tell you it is temporary. Fifty thousand people leave Pripyat. Most never return. The word \'radiation\' enters your vocabulary before you are old enough to know what it means.'
      if (age <= 17) return 'The official statement is that there is no danger to the public. Then the iodine tablets arrive. Then the evacuation orders. Then, much later, the true scale. The reactors at Chernobyl will be too dangerous to approach without equipment for thousands of years. The evacuation was supposed to last three days.'
      return 'Reactor Number Four at Chernobyl explodes at 1:23am on 26 April. The explosion is visible from fifty kilometres. The fire burns for ten days. The Soviet government does not announce the disaster publicly for thirty-six hours. The international community learns of it when Sweden detects radiation on a worker\'s shoe at a nuclear plant 1,100 kilometres away.'
    },
    context: 'The Chernobyl disaster contaminated 150,000 km² across Ukraine, Russia, and Belarus. Approximately 350,000 people were permanently evacuated. The Soviet government\'s delayed disclosure and systematic underreporting of health consequences continued for years; Ukraine did not have independent oversight until 1991. The exclusion zone around Chernobyl remains uninhabitable. The HBO series Chernobyl (2019) brought renewed attention to the liquidators\' experience.',
    effect: (p) => { p.h -= 12; p.addFlag('chernobyl_generation'); },
    addFlags: ['chernobyl_generation'],
    minAge: 0,
  },
  {
    id: 'rwandan_genocide',
    name: 'Rwandan Genocide',
    years: [1994, 1994],
    archetypes: 'all',
    countries: ['Rwanda'],
    narrative: 'In one hundred days, nearly a million people are killed — not by armies at a distance but by neighbours, at checkpoints, with names on lists. The international community watches. The word genocide is debated in foreign capitals while the killing continues. The people who survive will spend the rest of their lives living next to the people who tried to kill them.',
    effect: (p) => { p.h -= 15; p.m -= 20; p.addFlag('genocide_survivor'); },
    addFlags: ['genocide_survivor', 'war_childhood'],
    minAge: 0,
  },
  {
    id: 'balkan_wars',
    name: 'Yugoslav Wars',
    years: [1991, 1999],
    archetypes: 'all',
    countries: ['Serbia'],
    narrative: 'The country you knew dissolves into countries that did not exist last year. The city you grew up in is in a different state from the city your cousins grew up in. People you shared language and school and football matches with are now, officially, on the other side. The logic that got here seemed local at every step.',
    effect: (p) => { p.h -= 8; p.m -= 12; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'displaced'],
    minAge: 0,
  },
  {
    id: 'gulf_war_1991',
    name: '1991 Gulf War',
    years: [1990, 1991],
    archetypes: ['wealthy_gulf', 'conflict_zone'],
    countries: null,
    narrative: 'Coalition forces push into Iraq. The war is forty-three days long — short by war standards — but the images are everywhere and the oil fields burn for months. The region will not be the same. The price of everything connected to oil has already moved.',
    effect: (p) => { p.m -= 8; p.h -= 5; },
    addFlags: [],
    minAge: 0,
  },
  {
    id: 'nine_eleven',
    name: 'September 11 Attacks',
    years: [2001, 2001],
    archetypes: 'all',
    countries: null,
    narrative: 'In the morning, two planes hit the towers. By afternoon, a third hits the Pentagon and a fourth goes down in a Pennsylvania field. The tallest buildings in New York are gone. You watch the footage repeat on television. What follows — the security lines, the databases, the wars — will outlast everyone alive today.',
    context: 'On September 11, 2001, al-Qaeda hijackers flew four commercial aircraft into the World Trade Center, the Pentagon, and a Pennsylvania field, killing 2,977 people. The attacks triggered the US-led "War on Terror," the invasion of Afghanistan in 2001 and Iraq in 2003, and a permanent transformation of global airport security, surveillance law, and the public experience of civil liberties.',
    effect: (p) => { p.m -= 5; },
    addFlags: ['post_9_11_world'],
    minAge: 5,
  },

  {
    id: 'nine_eleven_muslim_backlash',
    name: 'Post-9/11 Backlash',
    years: [2001, 2003],
    archetypes: 'all',
    countries: null,
    narrative: 'In the weeks after the attacks, what you believe and what you look like becomes something strangers feel entitled to weigh in on. A neighbour who never spoke now speaks — to ask where you are really from, to tell you what you must think. The question of whether you belong somewhere you have always lived is suddenly open again.',
    effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('experienced_islamophobia'); },
    addFlags: ['experienced_islamophobia'],
    minAge: 8,
    when: (G) => ['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.religion) &&
      (['wealthy_west', 'wealthy_east'].includes(G.currentCountry?.archetype) || ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)),
  },
  {
    id: 'iraq_war',
    name: 'Iraq War',
    years: [2003, 2011],
    archetypes: ['conflict_zone', 'wealthy_gulf'],
    countries: null,
    narrative: 'The invasion begins with televised air strikes on Baghdad in the night. The regime collapses in weeks. The chaos that follows takes years. You watch the map of a country come apart into something with no clear centre. The word reconstruction appears in press releases that do not match the images.',
    effect: (p) => { p.h -= 10; p.m -= 12; p.w -= 8; },
    addFlags: ['lived_through_occupation'],
    minAge: 0,
  },
  {
    id: 'arab_spring',
    name: 'Arab Spring',
    years: [2010, 2013],
    archetypes: 'all',
    countries: ['Egypt', 'Syria', 'Yemen', 'Jordan', 'Morocco'],
    narrative: 'The protests start in Tunisia — a young man sets himself on fire over a confiscated fruit cart — and they don\'t stop. Egypt. Libya. Syria. Yemen. Bahrain. For a moment it looks like the region is changing. Some governments fall. Others crack down and hold. What comes after the falling is, in most places, worse or simply different.',
    effect: (p) => { p.m -= 6; p.addFlag('lived_through_revolution'); },
    addFlags: ['lived_through_revolution'],
    minAge: 10,
  },
  {
    id: 'asian_financial_crisis',
    name: '1997 Asian Financial Crisis',
    years: [1997, 1999],
    archetypes: ['wealthy_east', 'developing_urban'],
    countries: ['South Korea', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam'],
    narrative: 'The baht goes first, then the rupiah, then the won. The savings your family held in the national currency are worth half what they were last month. Companies that existed for decades are gone over a weekend. The IMF arrives with conditions — cut public services, raise interest rates, open the markets — while people are already struggling.',
    effect: (p) => { p.w -= 12; p.m -= 7; },
    addFlags: [],
    minAge: 5,
  },
  {
    id: 'financial_crisis_2008',
    name: '2008 Global Financial Crisis',
    years: [2008, 2009],
    archetypes: 'all',
    countries: null,
    narrative: 'The banks are not actually solid. This becomes clear in September. Firms that existed for a century are gone over a weekend. Governments that said there was no money for schools find money for banks. The unemployment numbers rise for years afterward. The people who caused the crash keep their bonuses.',
    effect: (p) => { p.w -= 10; p.m -= 4; },
    addFlags: [],
    minAge: 10,
  },
  {
    id: 'covid_19',
    name: 'COVID-19 Pandemic',
    years: [2020, 2022],
    archetypes: 'all',
    countries: null,
    narrative: 'The news in January is about a virus in one city. By March, you are not allowed to leave your home. The streets are empty. The hospitals are not. By the end of the year, more people have died than in any year since the Second World War. Normal resumes slowly and unevenly, and is not the same normal as before.',
    effect: (p) => { p.h -= 8; p.m -= 7; p.w -= 6; },
    addFlags: ['lived_through_pandemic'],
    minAge: 0,
  },
  {
    id: 'ukraine_war_2022',
    name: 'Russian Invasion of Ukraine',
    years: [2022, 2025],
    archetypes: 'all',
    countries: ['Ukraine', 'Russia', 'Poland', 'Romania', 'Georgia'],
    narrative: 'Russian tanks cross into Ukraine in the early morning. The capital is shelled. Refugees — millions of them — move westward. The war that everyone said wouldn\'t happen is happening. Food prices, fuel prices, the order of Europe: all of it shifts. You watch this on a phone, in a world that is no longer arranged the way it was yesterday.',
    effect: (p) => { p.h -= 10; p.m -= 15; p.w -= 8; p.addFlag('war_generation'); },
    addFlags: ['war_generation', 'displaced'],
    minAge: 0,
  },
  {
    id: 'european_refugee_crisis',
    name: 'European Refugee Crisis',
    years: [2015, 2017],
    archetypes: ['conflict_zone', 'developing_unstable'],
    countries: null,
    narrative: 'You are among hundreds of thousands crossing the Mediterranean in an inflatable boat. The crossing takes hours. Some boats sink. Whether you reach land, and which land, and what happens when you do — these are decided by wind and coast guards and the politics of countries that are not yours.',
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('refugee'); },
    addFlags: ['refugee', 'displaced', 'emigrated'],
    minAge: 0,
  },
  {
    id: 'iran_revolution',
    name: 'Iranian Revolution',
    years: [1979, 1980],
    archetypes: 'all',
    countries: ['Iran'],
    narrative: 'The Shah falls. A new order takes his place. The rules of daily life are rewritten overnight.',
    effect: (p) => { p.m -= 10; p.addFlag('revolution_generation'); },
    addFlags: ['revolution_generation'],
    minAge: 0,
  },
  {
    id: 'internet_revolution',
    name: 'Rise of the Internet',
    years: [1995, 2005],
    archetypes: ['wealthy_west', 'wealthy_east', 'developing_urban'],
    countries: null,
    narrative: 'The internet moves from universities to homes, then to pockets. What information means, what distance means, what a shop is, what a friend is — all of it is changing faster than anyone can name accurately. The rules are being made up as it goes.',
    effect: (p) => { p.e += 5; p.w += 3; },
    addFlags: ['internet_generation'],
    minAge: 10,
    maxAge: 40,
  },
  {
    id: 'myanmar_coup',
    name: 'Myanmar Military Coup',
    years: [2021, 2023],
    archetypes: 'all',
    countries: ['Myanmar'],
    narrative: 'The military removes the elected government before dawn. People fill the streets by afternoon. The crackdown comes within days — live fire on protesters. The brief years of democratic experiment, imperfect and always qualified, are over. The generals are back. The internet is cut.',
    effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('lived_through_coup'); },
    addFlags: ['lived_through_coup', 'war_generation'],
    minAge: 0,
  },
  {
    id: 'zimbabwe_hyperinflation',
    name: 'Zimbabwe Hyperinflation Crisis',
    years: [2007, 2009],
    archetypes: 'all',
    countries: ['Zimbabwe'],
    narrative: 'Prices double daily. The currency becomes worthless. Savings accumulated over a lifetime evaporate.',
    effect: (p) => { p.w -= 20; p.m -= 10; },
    addFlags: ['hyperinflation_survivor'],
    minAge: 0,
  },
  {
    id: 'venezuela_collapse',
    name: 'Venezuelan Economic Collapse',
    years: [2015, 2020],
    archetypes: 'all',
    countries: ['Venezuela'],
    narrative: 'The shelves empty first in the middle of the month, then in the middle of the week. The bolivar is worth less every morning than it was the night before. People you know are leaving — for Colombia, for Spain, for anywhere. The ones who stay, stay for reasons they don\'t always explain.',
    effect: (p) => { p.w -= 18; p.h -= 8; p.m -= 10; },
    addFlags: ['economic_collapse_survivor'],
    minAge: 0,
  },

  // ── HISTORICAL EVENTS ──────────────────────────────────────────────────────
  {
    id: 'ethiopian_famine',
    name: '1984–85 Ethiopian Famine',
    years: [1983, 1986],
    archetypes: 'all',
    countries: ['Ethiopia'],
    narrative: 'The rains didn\'t come. Then they didn\'t come again. The government is fighting a war in the north and the grain quotas do not change. Aid organisations arrive with cameras and food. The food arrives after the people the cameras photographed have died. You understand what the word famine means now — not as a description but as a condition you are living inside.',
    effect: (p) => { p.h -= 18; p.m -= 15; p.w -= 10; p.addFlag('hunger_childhood'); },
    addFlags: ['hunger_childhood', 'famine_survivor'],
    minAge: 0,
  },
  {
    id: 'aids_epidemic_subsaharan',
    name: 'HIV/AIDS Epidemic',
    years: [1985, 2005],
    archetypes: ['subsaharan'],
    countries: null,
    narrative: 'The funerals start to overlap. You go to three in a month, then five. The disease doesn\'t have a face yet — no one says the word aloud. People you know are sick, then dying, and the word used is not the right word. The children left behind are everywhere. The classroom has empty seats that are not explained.',
    effect: (p) => { p.h -= 10; p.m -= 12; p.addFlag('aids_generation'); },
    addFlags: ['aids_generation'],
    minAge: 0,
  },
  {
    id: 'khmer_rouge',
    name: 'Khmer Rouge Genocide',
    years: [1975, 1979],
    archetypes: 'all',
    countries: ['Cambodia'],
    narrative: 'The city is evacuated at gunpoint. Intellectuals, professionals, and the educated are targeted. Nearly two million people die.',
    context: 'The Khmer Rouge, led by Pol Pot, seized Cambodia in April 1975 and immediately evacuated all cities. Their ideology of agrarian Communism — "Year Zero" — targeted the educated, ethnic Vietnamese, Chinese, and Cham Muslims. An estimated 1.5–2 million people died of execution, starvation, and forced labour in four years — roughly 25% of the entire Cambodian population. The regime was ended by a Vietnamese invasion in 1979.',
    effect: (p) => { p.h -= 20; p.m -= 25; p.w -= 15; p.addFlag('genocide_survivor'); },
    addFlags: ['genocide_survivor', 'war_childhood', 'hunger_childhood'],
    minAge: 0,
  },
  {
    id: 'great_leap_famine',
    name: 'Great Leap Forward Famine',
    years: [1959, 1962],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'The government\'s revolutionary programs cause the largest famine in history. Tens of millions die. The silence around this is total.',
    context: 'Mao Zedong\'s Great Leap Forward (1958–62) collectivised agriculture and diverted rural labor to steel production, causing catastrophic grain shortfalls. Between 15 and 45 million people died — historians\' estimates vary widely because the Chinese Communist Party suppressed all data. Grain was still being exported during the famine. Local officials who reported deaths were accused of sabotage.',
    effect: (p) => { p.h -= 20; p.m -= 15; p.w -= 12; p.addFlag('hunger_childhood'); },
    addFlags: ['hunger_childhood', 'famine_survivor'],
    minAge: 0,
  },
  {
    id: 'tiananmen_square',
    name: 'Tiananmen Square Crackdown',
    years: [1989, 1989],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'Students fill the square. The tanks come in the night. The protests end. No one speaks of it publicly again.',
    effect: (p) => { p.m -= 15; p.addFlag('learned_silence'); },
    addFlags: ['learned_silence', 'revolution_generation'],
    minAge: 8,
  },
  {
    id: 'apartheid_era',
    name: 'Apartheid',
    years: [1950, 1994],
    archetypes: 'all',
    countries: ['South Africa'],
    narrative: 'Race determines where you live, where you work, what school you attend. The law enforces a hierarchy that crushes some and privileges others.',
    effect: (p) => { p.m -= 12; p.e -= 6; p.addFlag('apartheid_generation'); },
    addFlags: ['apartheid_generation'],
    minAge: 0,
  },
  {
    id: 'north_korea_famine',
    name: 'North Korean Arduous March Famine',
    years: [1994, 1998],
    archetypes: 'all',
    countries: ['North Korea'],
    narrative: 'The government calls it the Arduous March. Hundreds of thousands starve. The cause is never officially acknowledged.',
    effect: (p) => { p.h -= 22; p.m -= 18; p.w -= 15; p.addFlag('hunger_childhood'); },
    addFlags: ['hunger_childhood', 'famine_survivor'],
    minAge: 0,
  },
  {
    id: 'boxing_day_tsunami',
    name: '2004 Indian Ocean Tsunami',
    years: [2004, 2005],
    archetypes: 'all',
    countries: ['Indonesia', 'Thailand', 'Sri Lanka'],
    narrative: 'A wave comes with almost no warning. Entire coastal villages are gone in minutes. 230,000 people die.',
    effect: (p) => { p.h -= 12; p.m -= 18; p.w -= 14; p.addFlag('disaster_survivor'); },
    addFlags: ['disaster_survivor', 'displaced'],
    minAge: 0,
  },
  {
    id: 'colombia_bogotazo_1948',
    name: 'El Bogotazo',
    years: [1948, 1949],
    archetypes: null,
    countries: ['Colombia'],
    minAge: 5,
    narrative: 'April 9, 1948. Jorge Eliécer Gaitán, the Liberal Party leader who was expected to win the next election, is shot three times outside his Bogotá office. The city burns for three days. The riots mark the beginning of La Violencia — a decade-long civil war between Liberals and Conservatives that will kill two hundred thousand people across the countryside. You hear the shots on the radio, or see the smoke, or are told by a neighbour what has happened.',
    context: 'Gaitán was the most popular Colombian politician of his generation, drawing huge working-class support across party lines. His murder has never been definitively attributed. In the immediate aftermath, a young Fidel Castro — in Bogotá for a student conference — witnessed the riots. The Bogotazo destroyed much of central Bogotá and destabilised Colombian democracy; La Violencia that followed was the direct ancestor of the FARC, the ELN, and the paramilitary structures of the late 20th century.',
    effect: (p) => { p.m -= 10; p.r += 5; },
    addFlags: ['la_violencia_generation'],
  },
  {
    id: 'argentina_dirty_war',
    name: 'Argentine Dirty War',
    years: [1976, 1983],
    archetypes: 'all',
    countries: ['Argentina'],
    narrative: 'The military junta "disappears" dissidents. 30,000 people are taken and never returned. Silence becomes a survival strategy.',
    effect: (p) => { p.m -= 18; p.addFlag('learned_silence'); },
    addFlags: ['learned_silence', 'war_childhood'],
    minAge: 0,
  },
  {
    id: 'colombia_drug_wars',
    name: 'Colombian Drug War',
    years: [1984, 2002],
    archetypes: 'all',
    countries: ['Colombia'],
    narrative: 'Cartel violence and guerrilla war overlap in cities and countryside. Car bombs. Kidnappings. A generation learns to assess risk before stepping outside.',
    effect: (p) => { p.h -= 8; p.m -= 12; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood'],
    minAge: 0,
  },
  {
    id: 'oil_shock_1973_west',
    name: '1973 Oil Crisis',
    years: [1973, 1975],
    archetypes: ['wealthy_west'],
    countries: null,
    narrative: 'Arab oil producers embargo the West. Fuel lines stretch around blocks. The postwar prosperity consensus cracks.',
    effect: (p) => { p.w -= 8; p.m -= 5; p.addFlag('oil_shock_generation'); },
    addFlags: ['oil_shock_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('oil_shock_generation'),
  },
  {
    id: 'bangladesh_liberation_war',
    name: 'Bangladesh Liberation War',
    years: [1971, 1971],
    archetypes: 'all',
    countries: ['Bangladesh'],
    narrative: 'Pakistani forces move into East Pakistan. Massacres follow. Three million die. Ten million flee to India. A new country is born in blood.',
    effect: (p) => { p.h -= 15; p.m -= 20; p.w -= 10; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'displaced', 'refugee'],
    minAge: 0,
  },
  {
    id: 'india_pakistan_partition',
    name: 'India-Pakistan Partition',
    years: [1947, 1948],
    archetypes: 'all',
    countries: ['India', 'Pakistan'],
    narrative: 'The British leave. A line is drawn. Fourteen million people cross it in both directions. One million die in the violence that follows.',
    effect: (p) => { p.h -= 12; p.m -= 18; p.w -= 8; p.addFlag('displaced'); },
    addFlags: ['displaced', 'refugee', 'war_childhood'],
    minAge: 0,
  },
  {
    id: 'korean_war',
    name: 'Korean War',
    years: [1950, 1953],
    archetypes: 'all',
    countries: ['South Korea'],
    narrative: 'The peninsula is a battlefield. Cities are bombed flat and rebuilt. The ceasefire never becomes a peace. The scar runs through every family.',
    effect: (p) => { p.h -= 12; p.m -= 15; p.w -= 10; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood'],
    minAge: 0,
  },
  {
    id: 'ebola_west_africa',
    name: 'West African Ebola Epidemic',
    years: [2014, 2016],
    archetypes: 'all',
    countries: ['Nigeria', 'Senegal', 'Ghana'],
    narrative: 'A hemorrhagic fever spreads across borders. Healthcare systems collapse under the strain. 11,000 die before it is contained.',
    effect: (p) => { p.h -= 10; p.m -= 10; p.addFlag('ebola_survivor'); },
    addFlags: [],
    minAge: 5,
  },
  {
    id: 'nigerian_civil_war',
    name: 'Nigerian Civil War (Biafra)',
    years: [1967, 1970],
    archetypes: 'all',
    countries: ['Nigeria'],
    narrative: 'Biafra declares independence. A blockade follows. Up to two million die of starvation. The photographs reach the world too late.',
    effect: (p) => { p.h -= 15; p.m -= 15; p.w -= 8; p.addFlag('hunger_childhood'); },
    addFlags: ['hunger_childhood', 'war_childhood'],
    minAge: 0,
  },
  {
    id: 'lebanese_civil_war',
    name: 'Lebanese Civil War',
    years: [1975, 1990],
    archetypes: 'all',
    countries: ['Jordan', 'Syria', 'Lebanon'],
    narrative: 'Beirut, once the Paris of the Middle East, tears itself apart along sectarian lines. Refugees spill across borders.',
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'displaced'],
    minAge: 0,
  },
  {
    id: 'soviet_afghan_war',
    name: 'Soviet-Afghan War',
    years: [1979, 1989],
    archetypes: 'all',
    countries: ['Afghanistan'],
    narrative: 'Soviet troops flood in. The mujahideen resist for a decade. Two million Afghans die. The country is left to its warlords.',
    effect: (p) => { p.h -= 15; p.m -= 18; p.w -= 10; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'displaced'],
    minAge: 0,
  },

  // ── SYSTEMIC / STRUCTURAL EVENTS ──────────────────────────────────────────
  {
    id: 'conscription_south_korea',
    name: 'Military Conscription',
    years: [1953, 2025],
    archetypes: 'all',
    countries: ['South Korea'],
    narrative: 'At eighteen, you receive your conscription notice. Two years of mandatory military service. This is not optional.',
    effect: (p) => { p.m -= 5; p.h += 3; p.addFlag('veteran'); },
    addFlags: ['veteran'],
    minAge: 18,
    maxAge: 19,
  },
  {
    id: 'conscription_russia',
    name: 'Military Conscription',
    years: [1950, 2025],
    archetypes: 'all',
    countries: ['Russia'],
    narrative: 'The military calls. One year of mandatory service. Some spend it peacefully. Others are sent where wars are not officially being fought.',
    effect: (p) => { p.m -= 6; p.h += 2; p.addFlag('veteran'); },
    addFlags: ['veteran'],
    minAge: 18,
    maxAge: 19,
  },
  {
    id: 'conscription_norway',
    name: 'Military Service',
    years: [1950, 2025],
    archetypes: 'all',
    countries: ['Norway'],
    narrative: 'Military service is a national tradition here. A year of training, camaraderie, and learning to live without comfort.',
    effect: (p) => { p.m -= 2; p.h += 4; },
    addFlags: [],
    minAge: 18,
    maxAge: 19,
    when: (G) => G.character.gender === 'male' || G.currentYear >= 2015,
  },
  {
    id: 'us_medical_debt',
    name: 'Medical Debt Crisis',
    years: [1990, 2025],
    archetypes: 'all',
    countries: ['United States'],
    narrative: 'An illness or accident generates a medical bill larger than your annual income. The debt follows you for years.',
    effect: (p) => { p.w -= 20; p.m -= 10; p.addFlag('medical_debt'); },
    addFlags: ['medical_debt'],
    minAge: 18,
    when: (G) => G.stats.wealth < 55,
  },
  {
    id: 'corruption_developing',
    name: 'Institutional Corruption',
    years: [1950, 2025],
    archetypes: ['developing_unstable', 'post_soviet', 'subsaharan'],
    countries: null,
    narrative: 'The official tells you there is a fee. There is no official fee. You pay, or you wait forever. This is how things work.',
    effect: (p) => { p.w -= 5; p.m -= 6; p.addFlag('compromised'); },
    addFlags: ['compromised'],
    minAge: 18,
    when: (G) => Math.random() < 0.3,
  },
  {
    id: 'sahel_drought_1968',
    name: 'Sahel Drought',
    years: [1968, 1974],
    archetypes: ['subsaharan'],
    countries: ['Ethiopia', 'Nigeria', 'Kenya', 'Tanzania', 'Senegal', 'Uganda'],
    narrative: 'The rains do not come. Then they do not come again. The fields produce little. The market prices rise. Children in the village look smaller than they should.',
    effect: (p) => { p.m -= 12; p.h -= 10; p.addFlag('drought_survivor'); },
    addFlags: ['drought_survivor'],
    minAge: 3,
    when: (G) => G.stats.wealth < 60,
  },
  {
    id: 'sahel_drought_1984',
    name: 'Sahel Famine',
    years: [1984, 1985],
    archetypes: ['subsaharan'],
    countries: ['Ethiopia', 'Nigeria', 'Kenya', 'Tanzania', 'Senegal', 'Uganda'],
    narrative: 'The drought is the worst in living memory. Camps fill. Photographs circulate in foreign newspapers. Strangers on other continents hold concerts and donate money. The food arrives, eventually. Not for everyone.',
    effect: (p) => { p.m -= 12; p.h -= 10; p.addFlag('drought_survivor'); },
    addFlags: ['drought_survivor'],
    minAge: 3,
    when: (G) => G.stats.wealth < 60,
  },
  {
    id: 'sahel_drought_2010',
    name: 'Sahel Drought',
    years: [2010, 2012],
    archetypes: ['subsaharan'],
    countries: ['Ethiopia', 'Nigeria', 'Kenya', 'Tanzania', 'Senegal', 'Uganda'],
    narrative: 'The scientists call it climate-intensified. The word means little when the wells are dry. The rains arrive late again, and shorter than before. The cycle is no longer a cycle — it is a direction.',
    effect: (p) => { p.m -= 12; p.h -= 10; p.addFlag('drought_survivor'); },
    addFlags: ['drought_survivor'],
    minAge: 3,
    when: (G) => G.stats.wealth < 60,
  },
  {
    id: 'india_liberalisation',
    name: 'Indian Economic Liberalisation',
    years: [1991, 1996],
    archetypes: ['developing_urban'],
    countries: ['India'],
    narrative: 'The licence raj is ending. Foreign goods appear in the shops. New companies are being formed. The generation entering the workforce now will live in a different economy from their parents.',
    effect: (p) => { p.w += 5; p.e += 5; },
    addFlags: [],
    minAge: 15,
    when: (G) => G.age >= 15 && G.age <= 35,
  },
  {
    id: 'china_economic_boom',
    name: 'China\'s Economic Rise',
    years: [1990, 2010],
    archetypes: ['developing_urban', 'wealthy_east'],
    countries: ['China'],
    narrative: 'The factory is hiring. Then another factory. The city is growing faster than the maps can track. A generation is moving from the countryside to the skyline.',
    effect: (p) => { p.w += 8; p.h -= 3; p.e += 3; },
    addFlags: [],
    minAge: 16,
    when: (G) => G.age >= 16,
  },
  {
    id: 'tropical_cyclone',
    name: 'Devastating Cyclone',
    years: [1950, 2025],
    archetypes: ['developing_unstable', 'subsaharan'],
    countries: ['Bangladesh', 'Philippines', 'Mozambique', 'Myanmar', 'Haiti'],
    narrative: 'The storm warning came one day before. The shelter held but the neighbourhood did not. Rebuilding takes years and the government aid arrives late and partial.',
    effect: (p) => { p.m -= 15; p.h -= 10; p.addFlag('disaster_survivor'); },
    addFlags: ['disaster_survivor'],
    minAge: 4,
    when: (G) => Math.random() < 0.4,
  },
  {
    id: 'latin_america_coup',
    name: 'Military Coup',
    years: [1960, 1990],
    archetypes: ['developing_unstable'],
    countries: ['Chile', 'Argentina', 'Bolivia', 'Guatemala', 'Venezuela'],
    narrative: 'The radio is playing military music. That is how you know. No normal broadcast, just the march. The streets are quiet in ways that are not calm.',
    effect: (p) => { p.m -= 10; p.h -= 8; p.addFlag('political_aware'); },
    addFlags: ['political_aware'],
    minAge: 8,
    when: (G) => G.age >= 8,
  },
  {
    id: 'south_africa_post_apartheid',
    name: 'Post-Apartheid South Africa',
    years: [1994, 2000],
    archetypes: ['developing_urban'],
    countries: ['South Africa'],
    narrative: 'Mandela is president. The world is watching. Inside the country, the texture of daily life is changing in ways both dramatic and glacially slow. History is happening and so is Tuesday.',
    effect: (p) => { p.h += 10; p.karma += 5; },
    addFlags: [],
    minAge: 5,
    when: (G) => G.age >= 5,
  },

  // ── COLD WAR ERA ──────────────────────────────────────────────────────────
  {
    id: 'vietnam_war_us',
    name: 'Vietnam War',
    years: [1964, 1975],
    archetypes: 'all',
    countries: ['United States'],
    narrative: 'The draft lottery is on television. Men your age are going. Some come back. Some come back changed. The country argues about it at dinner tables and in the streets. No one agrees on what it is for.',
    effect: (p) => { p.m -= 10; p.addFlag('vietnam_generation'); },
    addFlags: ['vietnam_generation'],
    minAge: 16,
    maxAge: 26,
  },
  {
    id: 'vietnam_war_country',
    name: 'Vietnam War',
    years: [1955, 1975],
    archetypes: 'all',
    countries: ['Vietnam'],
    narrative: 'The bombing does not stop. American aircraft at night, then nothing, then more. A generation grows up knowing the sound of jets. The country is divided and then it isn\'t.',
    effect: (p) => { p.h -= 12; p.m -= 15; p.w -= 8; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'war_generation'],
    minAge: 0,
  },
  {
    id: 'cultural_revolution_china_general',
    name: 'Cultural Revolution',
    years: [1966, 1976],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'Red Guards fill the streets. Teachers are paraded in dunce caps. The libraries are burned or locked. Your family hides books under floorboards. Anyone with education, glasses, or soft hands is suspect. The rules rewrite themselves every week.',
    effect: (p) => { p.e -= 10; p.m -= 18; p.addFlag('learned_silence'); p.addFlag('cultural_revolution_generation'); },
    addFlags: ['learned_silence', 'cultural_revolution_generation'],
    minAge: 0,
    when: (G) => !G.flags.includes('cultural_revolution_survived'),
  },
  {
    id: 'berlin_wall_fall',
    name: 'Fall of the Berlin Wall',
    years: [1989, 1990],
    archetypes: 'all',
    countries: ['Germany'],
    narrative: 'The wall comes down. People are chipping at it with hammers and their hands. A city divided since before you were born becomes one city. You walk through the gap and it is just a street. It is also the most impossible thing you have ever seen.',
    context: 'The Berlin Wall, built in 1961, divided East and West Germany for 28 years. On November 9, 1989, the East German government announced citizens could cross freely; crowds immediately overwhelmed the checkpoints. The wall was physically demolished over the following months. Its fall is considered the symbolic end of the Cold War. Germany was formally reunified on October 3, 1990.',
    effect: (p) => { p.m += 15; p.addFlag('wall_generation'); },
    addFlags: ['wall_generation', 'lived_through_revolution'],
    minAge: 5,
  },
  {
    id: 'german_reunification',
    name: 'German Reunification',
    years: [1990, 1993],
    archetypes: 'all',
    countries: ['Germany'],
    narrative: 'Two countries become one. The West arrives in the East with its supermarkets and unemployment. Eastern industry closes. Some people gain enormously. Others lose the only world they knew.',
    effect: (p) => { p.m -= 5; p.w += 5; },
    addFlags: [],
    minAge: 10,
  },
  {
    id: 'hong_kong_handover',
    name: 'Hong Kong Handover',
    years: [1997, 1998],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'Britain returns Hong Kong. One country, two systems, the officials say. Families who left before the handover watch on television from Vancouver and Sydney. Those who stayed watch from rooftops. The uncertainty is the main weather.',
    effect: (p) => { p.m -= 6; p.addFlag('handover_generation'); },
    addFlags: ['handover_generation'],
    minAge: 6,
  },
  {
    id: 'hong_kong_protests_2019',
    name: 'Hong Kong Protests',
    years: [2019, 2020],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'Millions march in the streets. Umbrellas against tear gas. The national security law passes. The protests end. Many of the people who marched leave the city. The ones who stay lower their voices.',
    effect: (p) => { p.m -= 12; p.addFlag('learned_silence'); },
    addFlags: ['learned_silence', 'lived_through_revolution'],
    minAge: 14,
  },
  {
    id: 'angola_civil_war',
    name: 'Angolan Civil War',
    years: [1975, 2002],
    archetypes: 'all',
    countries: ['Angola', 'Mozambique'],
    narrative: 'The war the world forgot is still happening. It began with independence and continued through Cold War proxy funding and continued beyond it. Landmines will outlast the ceasefire by decades.',
    effect: (p) => { p.h -= 12; p.m -= 15; p.w -= 10; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'displaced'],
    minAge: 0,
  },
  {
    id: 'nicaragua_contra_war',
    name: 'Nicaraguan Civil War',
    years: [1979, 1990],
    archetypes: 'all',
    countries: ['Nicaragua', 'Guatemala', 'El Salvador'],
    narrative: 'The Sandinistas, the Contras, and American money. Villages are caught between forces that change meaning depending on who you ask. A generation comes of age in ambiguity and violence.',
    effect: (p) => { p.m -= 12; p.h -= 8; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood', 'political_aware'],
    minAge: 0,
  },
  {
    id: 'cuban_missile_crisis',
    name: 'Cuban Missile Crisis',
    years: [1962, 1962],
    archetypes: ['wealthy_west', 'post_soviet'],
    countries: null,
    narrative: 'For thirteen days, the adults are frightened in a way they cannot hide. The news is terse. The drills at school become something different. Then it passes and no one explains what would have happened.',
    effect: (p) => { p.m -= 8; p.addFlag('cold_war_generation'); },
    addFlags: ['cold_war_generation'],
    minAge: 5,
  },
  {
    id: 'suez_crisis',
    name: 'Suez Crisis',
    years: [1956, 1957],
    archetypes: 'all',
    countries: ['Egypt'],
    narrative: 'Nasser nationalizes the canal. Britain, France, and Israel invade. The Americans tell them to stop. A new order reveals itself: the old empires are over. Egypt keeps the canal.',
    effect: (p) => { p.m += 8; p.addFlag('decolonization_generation'); },
    addFlags: ['decolonization_generation'],
    minAge: 5,
  },
  {
    id: 'algerian_war_independence',
    name: 'Algerian War of Independence',
    years: [1954, 1962],
    archetypes: 'all',
    countries: ['Algeria', 'Morocco'],
    narrative: 'The war for independence lasts eight years. A million people die. The French army uses torture; the FLN does too. When it ends, a million French settlers leave in weeks. The country inherits their infrastructure and their debt.',
    effect: (p) => { p.h -= 10; p.m -= 12; p.addFlag('decolonization_generation'); },
    addFlags: ['decolonization_generation', 'war_childhood'],
    minAge: 0,
  },
  {
    id: 'global_war_on_terror',
    name: 'War on Terror',
    years: [2001, 2015],
    archetypes: 'all',
    countries: ['Afghanistan', 'Pakistan'],
    narrative: 'Foreign armies have been here for years now. The drones are audible before dark. Which side you are on depends on where you are standing and changes with the news. The normal things — school, the market — require a calculation.',
    effect: (p) => { p.h -= 10; p.m -= 14; p.addFlag('war_childhood'); },
    addFlags: ['war_childhood'],
    minAge: 0,
  },
  {
    id: 'apartheid_namibia',
    name: 'End of Apartheid (Namibia)',
    years: [1990, 1990],
    archetypes: 'all',
    countries: ['Namibia'],
    narrative: 'Independence from South Africa. The flag changes. The schoolbooks are rewritten. A generation inherits a country that was never really theirs before.',
    effect: (p) => { p.m += 8; p.addFlag('decolonization_generation'); },
    addFlags: ['decolonization_generation'],
    minAge: 0,
  },
  {
    id: 'falklands_war',
    name: 'Falklands War',
    years: [1982, 1982],
    archetypes: 'all',
    countries: ['Argentina'],
    narrative: 'The junta sends young men to fight for islands no one had thought about in years. Many die of cold before they die of fighting. When it ends badly, the junta falls. The democracy that follows is worth the defeat.',
    effect: (p) => { p.m -= 10; p.addFlag('war_generation'); },
    addFlags: ['war_generation'],
    minAge: 10,
  },

  // ── ECONOMIC TEXTURE ────────────────────────────────────────────────────────
  {
    id: 'brazil_real_plan',
    name: 'Brazilian Real Plan',
    years: [1994, 1997],
    archetypes: 'all',
    countries: ['Brazil'],
    narrative: 'The new currency holds. Inflation — which had been 2,500% a year — collapses almost overnight. Prices stabilize. Workers can save for the first time in a generation. The middle class begins to form itself.',
    effect: (p) => { p.w += 10; p.m += 6; p.addFlag('economic_stabilization'); },
    addFlags: ['economic_stabilization'],
    minAge: 5,
  },
  {
    id: 'brazil_hyperinflation',
    name: 'Brazilian Hyperinflation',
    years: [1985, 1994],
    archetypes: 'all',
    countries: ['Brazil'],
    narrative: 'Prices change mid-shopping. Supermarkets reprice shelves daily. Savings kept in cash lose half their value in a week. The economy teaches everyone a lesson about the unreality of numbers.',
    effect: (p) => { p.w -= 12; p.m -= 8; p.addFlag('hyperinflation_generation'); },
    addFlags: ['hyperinflation_generation'],
    minAge: 5,
  },
  {
    id: 'post_soviet_shock_therapy',
    name: 'Post-Soviet Shock Therapy',
    years: [1992, 1996],
    archetypes: ['post_soviet'],
    countries: null,
    narrative: 'State-owned enterprises are privatised overnight. A small number of people with the right connections acquire enormous assets at negligible prices. Everyone else watches their savings become worthless as prices are freed and inflation erupts. The word "oligarch" enters the language.',
    context: 'Following the Soviet collapse, Western economists advised rapid liberalisation — "shock therapy." Price controls were removed, state enterprises sold at nominal cost to those with political connections, and hyperinflation consumed savings. Russia\'s GDP fell roughly 40% between 1991 and 1998. Life expectancy for Russian men dropped from 65 to 57 in the 1990s. A small group of politically-connected businessmen became billionaires; the phrase "oligarch" was coined to describe them.',
    effect: (p) => { p.w -= 18; p.m -= 12; p.addFlag('post_soviet_shock'); },
    addFlags: ['post_soviet_shock', 'hyperinflation_generation'],
    minAge: 8,
  },
  {
    id: 'china_special_economic_zones',
    name: 'China\'s Reform and Opening Up',
    years: [1980, 1995],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'The Special Economic Zones open. Shenzhen is a fishing village in 1979 and a city of millions by 1990. Factories absorb hundreds of millions of rural workers. The speed of it is unlike anything in economic history.',
    effect: (p) => { p.w += 7; p.e += 4; p.addFlag('reform_era_china'); },
    addFlags: ['reform_era_china'],
    minAge: 10,
    when: (G) => G.age >= 10,
  },
  {
    id: 'ireland_celtic_tiger',
    name: 'The Celtic Tiger',
    years: [1995, 2007],
    archetypes: 'all',
    countries: ['Ireland'],
    narrative: 'Ireland goes from emigration economy to destination economy in under a decade. The building cranes are everywhere. The old certainties — the Church, the emigrant tradition, the quiet poverty — are replaced by something brasher and more prosperous. Whether it is better is a question people argue about at Christmas.',
    effect: (p) => { p.w += 12; p.m += 5; p.addFlag('celtic_tiger_generation'); },
    addFlags: ['celtic_tiger_generation'],
    minAge: 10,
  },
  {
    id: 'ireland_celtic_tiger_crash',
    name: 'Irish Financial Collapse',
    years: [2008, 2012],
    archetypes: 'all',
    countries: ['Ireland'],
    narrative: 'The bank guarantee brings the sovereign down with it. Property bought at the peak is worth half. Emigration restarts. A generation that thought it had escaped austerity learns its name.',
    effect: (p) => { p.w -= 20; p.m -= 12; p.addFlag('austerity_generation'); },
    addFlags: ['austerity_generation'],
    minAge: 15,
  },
  {
    id: 'south_korea_miracle',
    name: 'Korean Economic Miracle',
    years: [1965, 1995],
    archetypes: 'all',
    countries: ['South Korea'],
    narrative: 'In one generation South Korea moves from subsistence agriculture to semiconductor fabrication. The chaebol corporations absorb millions. Education becomes an arms race. The country is unrecognisable from the one the previous generation was born into.',
    effect: (p) => { p.w += 10; p.e += 6; p.addFlag('korean_miracle_generation'); },
    addFlags: ['korean_miracle_generation'],
    minAge: 5,
  },
  {
    id: 'india_it_boom',
    name: 'India\'s IT Boom',
    years: [1999, 2015],
    archetypes: ['developing_urban'],
    countries: ['India'],
    narrative: 'Bangalore and Hyderabad become global software centers. Engineering graduates who would have emigrated now find work at home at salaries their parents couldn\'t have imagined. The call centers employ millions. A new middle class forms on the back of a time zone.',
    effect: (p) => { p.w += 8; p.e += 5; p.addFlag('india_tech_generation'); },
    addFlags: ['india_tech_generation'],
    minAge: 18,
    when: (G) => G.age >= 18 && G.stats.smarts > 55,
  },
  {
    id: 'greek_debt_crisis',
    name: 'Greek Debt Crisis',
    years: [2010, 2018],
    archetypes: 'all',
    countries: ['Greece'],
    narrative: 'The bailout comes with conditions. Pensions are cut. The hospitals run short of supplies. Youth unemployment reaches 50%. A generation emigrates. Those who stay wait, in a country that feels like it has been placed in indefinite receivership.',
    effect: (p) => { p.w -= 18; p.m -= 14; p.addFlag('austerity_generation'); },
    addFlags: ['austerity_generation'],
    minAge: 15,
  },

  // ── ADDITIONAL ECONOMIC TEXTURE ─────────────────────────────────────────────
  {
    id: 'argentina_crisis_2001',
    name: 'Argentine Financial Crisis',
    years: [2001, 2003],
    archetypes: 'all',
    countries: ['Argentina'],
    narrative: 'The banks close on a Friday. When they reopen, the accounts are frozen — the government has converted dollar deposits to pesos at a rate decided overnight. People line up outside banks that will not open. Some bang on the shutters. The sound is the country\'s savings disappearing.',
    effect: (p) => { p.w -= 18; p.mo -= p.mo * 0.30; p.m -= 12; p.addFlag('economic_collapse_survivor'); },
    addFlags: ['economic_collapse_survivor'],
    minAge: 10,
  },
  {
    id: 'japan_bubble_collapse',
    name: 'Japanese Asset Bubble Collapse',
    years: [1991, 1996],
    archetypes: 'all',
    countries: ['Japan'],
    narrative: 'The land prices that made Tokyo real estate worth more than the entire United States begin to deflate. The company your father worked at for thirty years begins laying off permanent staff — something that was not supposed to happen. The generation entering the workforce now is called the Lost Generation. The party ended before they arrived.',
    effect: (p) => { p.w -= 10; p.m -= 10; p.addFlag('lost_generation_japan'); },
    addFlags: ['lost_generation_japan'],
    minAge: 5,
  },
  {
    id: 'gulf_oil_boom',
    name: 'Gulf Oil Boom',
    years: [1970, 1985],
    archetypes: ['wealthy_gulf'],
    countries: null,
    narrative: 'The money arrives faster than the infrastructure to spend it. A country that had no paved roads in 1960 builds a six-lane highway to a city that is still mostly construction sites. Your father remembers fishing. Your children will not know what that word means in this context.',
    effect: (p) => { p.w += 15; p.e += 3; p.addFlag('oil_boom_generation'); },
    addFlags: ['oil_boom_generation'],
    minAge: 0,
    when: (G) => G.stats.wealth < 75,
  },

  // ── COLD WAR TEXTURE ─────────────────────────────────────────────────────────
  {
    id: 'east_germany_stasi',
    name: 'East Germany: Stasi Surveillance',
    years: [1960, 1989],
    archetypes: 'all',
    countries: ['Germany'],
    narrative: 'One in sixty East Germans is an informant for the Stasi. Your neighbor, your colleague, possibly your spouse. You learn not to say certain things in certain rooms. After reunification the files will be opened. People will discover who reported on them. Some will not want to know.',
    effect: (p) => { p.m -= 12; p.s -= 5; p.addFlag('stasi_generation'); },
    addFlags: ['stasi_generation'],
    minAge: 10,
    when: (G) => G.currentYear < 1990 && !G.flags.includes('wall_generation'),
  },
  {
    id: 'east_germany_trabant',
    name: 'East Germany: The Trabant',
    years: [1960, 1989],
    archetypes: 'all',
    countries: ['Germany'],
    narrative: 'The waiting list for a Trabant — the only car available — is ten years. You put your name on the list when your first child is born. By the time the car arrives, the child is in school. The Trabant burns two-stroke fuel and produces a visible plume of smoke. It is the only car you will own for twenty years and you are grateful for it.',
    effect: (p) => { p.m += 5; p.w -= 5; p.addFlag('trabant_owner'); },
    addFlags: ['trabant_owner'],
    minAge: 25,
    maxAge: 65,
    when: (G) => G.stats.wealth < 65 && G.currentYear < 1990,
  },
  {
    id: 'cuba_ration_book',
    name: 'Cuba: The Ration Book',
    years: [1962, 2025],
    archetypes: 'all',
    countries: ['Cuba'],
    narrative: 'The libreta covers rice, beans, sugar, cooking oil, eggs. The amounts are set by the state and collected at the bodega. You know the specific weight of rice that constitutes a month\'s allocation. Shoes are also rationed, once a year. The system keeps people from starving. It does not keep them from being hungry.',
    effect: (p) => { p.m -= 8; p.w -= 8; p.addFlag('ration_book_generation'); },
    addFlags: ['ration_book_generation'],
    minAge: 5,
  },
  {
    id: 'prague_spring_1968',
    name: 'Prague Spring and Soviet Invasion',
    years: [1968, 1969],
    archetypes: 'all',
    countries: ['Czech Republic', 'Slovakia'],
    narrative: 'For eight months the newspapers say things that were not said before. The radio broadcasts what was forbidden. People use the word freedom in public. Then the tanks arrive from the east — two hundred thousand Soviet troops. The reformers are arrested or leave. What follows is called Normalization, which is the name given to removing everything that happened.',
    effect: (p) => { p.m -= 15; p.e += 5; p.addFlag('prague_spring_generation'); },
    addFlags: ['prague_spring_generation'],
    minAge: 5,
  },
  {
    id: 'poland_solidarity',
    name: 'Polish Solidarity Movement',
    years: [1980, 1984],
    archetypes: 'all',
    countries: ['Poland'],
    narrative: 'Ten million Poles join the trade union Solidarity — a quarter of the country, the largest labor movement in history. The government declares martial law in December 1981. The union is banned. Thousands are interned. People paste the Solidarity logo — an angular red script — in places it will not be easily found. It means something to see it.',
    effect: (p) => { p.m -= 10; p.karma += 5; p.addFlag('solidarity_generation'); },
    addFlags: ['solidarity_generation'],
    minAge: 10,
  },

  // ── NATIONAL TRAUMAS ─────────────────────────────────────────────────────────
  {
    id: 'holodomor',
    name: 'Holodomor: Ukrainian Famine',
    years: [1932, 1934],
    archetypes: 'all',
    countries: ['Ukraine'],
    narrative: 'The Soviet state requisitions the grain. Brigades come to houses and take what is in the storage pits. The village rations are set below survival level. Between three and five million Ukrainians die. The Soviet government classifies the death statistics. For decades it will be illegal to discuss.',
    context: 'Stalin\'s collectivisation campaign and deliberate grain quotas caused a famine that killed an estimated 3.5–7.5 million Ukrainians in 1932–33. The Soviets denied the famine internationally, restricted movement to prevent peasants from fleeing to cities, and prosecuted anyone who hoarded food. Ukraine did not officially acknowledge the Holodomor as a genocide until after independence in 1991.',
    effect: (p) => { p.h -= 25; p.m -= 20; p.w -= 18; p.addFlag('famine_survivor'); p.addFlag('holodomor_generation'); },
    addFlags: ['famine_survivor', 'holodomor_generation'],
    minAge: 0,
  },
  {
    id: 'the_troubles',
    name: 'The Troubles: Northern Ireland',
    years: [1969, 1999],
    archetypes: 'all',
    countries: ['Ireland'],
    narrative: 'Bombings, shootings, checkpoints. The army in the streets of cities that are not at war with anyone they can name. Thirty years. Over three thousand dead. You learn which roads to take and which pubs to avoid. The conflict has no clean sides and no clean ending. The Good Friday Agreement is signed. The checkpoints come down. The grievances remain.',
    effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('troubles_generation'); },
    addFlags: ['troubles_generation'],
    minAge: 5,
  },
  {
    id: 'aids_crisis_west',
    name: 'HIV/AIDS Crisis',
    years: [1981, 1996],
    archetypes: ['wealthy_west'],
    countries: null,
    narrative: 'A disease with no name at first, then a name without a treatment. The deaths are concentrated in gay men, intravenous drug users, hemophiliacs. The government is slow to respond. By the time effective treatment arrives, a generation of men has been hollowed out of certain cities. You knew someone. Then you knew several people. Then you stopped counting.',
    effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('aids_crisis_generation'); },
    addFlags: ['aids_crisis_generation'],
    minAge: 15,
    when: (G) => G.age >= 15 && (G.flags.includes('lgbtq_identity') || G.flags.includes('lgbtq_out_family') || Math.random() < 0.4),
  },
  {
    id: 'apartheid_daily',
    name: 'Apartheid: Pass Book',
    years: [1948, 1993],
    archetypes: 'all',
    countries: ['South Africa'],
    narrative: 'The pass book must be carried at all times. Without it you cannot legally be in the city after dark, cannot take certain jobs, cannot live in certain areas. The book is checked at roadblocks, at building entrances, by police who can detain you on its absence. It is a document that defines what you are allowed to be.',
    effect: (p) => { p.m -= 15; p.w -= 10; p.e -= 3; p.addFlag('apartheid_generation'); },
    addFlags: ['apartheid_generation'],
    minAge: 16,
    when: (G) => !G.flags.includes('apartheid_privileged'),
  },
  {
    id: 'apartheid_privilege',
    name: 'Apartheid: White South Africa',
    years: [1948, 1993],
    archetypes: 'all',
    countries: ['South Africa'],
    narrative: 'You live in a country with separate beaches, separate schools, separate everything, and the separation advantages you. You are aware of this, somewhere. Most people do not discuss it in those terms. The word the system uses is development. The word others use for what you have is stolen.',
    effect: (p) => { p.w += 8; p.e += 3; p.m -= 5; p.addFlag('apartheid_privileged'); },
    addFlags: ['apartheid_privileged'],
    minAge: 16,
    when: (G) => {
      const eg = G.character.country && G.character.country.ethnicGroups
        ? G.character.country.ethnicGroups.find(e => e.id === G.character.ethnicity)
        : null;
      return eg ? eg.disadvantaged !== true : false;
    },
  },

  // ── CLIMATE & ENVIRONMENT ────────────────────────────────────────────────────
  {
    id: 'great_barrier_reef_bleaching',
    name: 'Great Barrier Reef Mass Bleaching',
    years: [2016, 2025],
    archetypes: 'all',
    countries: ['Australia'],
    narrative: 'The reef bleaches for the third time in five years. Scientists say fifty percent of the coral is dead. You grew up diving here. The photographs in the tourist brochures no longer match what is in the water.',
    effect: (p) => { p.m -= 6; p.addFlag('witnessed_climate_change'); },
    addFlags: ['witnessed_climate_change'],
    minAge: 12,
  },
  {
    id: 'yangtze_floods',
    name: 'Yangtze River Flooding',
    years: [1998, 1998],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'The worst floods in forty years. Two hundred million affected. Hundreds of thousands of homes are gone. The Three Gorges Dam, still under construction, is part of the reason and part of the proposed solution.',
    effect: (p) => { p.h -= 8; p.m -= 10; p.w -= 8; p.addFlag('disaster_survivor'); },
    addFlags: ['disaster_survivor'],
    minAge: 0,
    when: (G) => G.ruralUrban === 'rural',
  },
  {
    id: 'australian_bushfires',
    name: 'Australian Black Summer Bushfires',
    years: [2019, 2020],
    archetypes: 'all',
    countries: ['Australia'],
    narrative: 'The fires burn for months. Three billion animals die. The smoke turns the sky orange in cities a thousand kilometres away. Scientists call it a preview.',
    effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('witnessed_climate_change'); },
    addFlags: ['witnessed_climate_change', 'disaster_survivor'],
    minAge: 5,
  },
  {
    id: 'pakistan_floods_2022',
    name: 'Pakistan Catastrophic Floods',
    years: [2022, 2022],
    archetypes: 'all',
    countries: ['Pakistan'],
    narrative: 'A third of the country is underwater. Thirty-three million people are affected. Scientists attribute the scale to climate change. Pakistan contributed less than one percent of global emissions. The word injustice is insufficient.',
    effect: (p) => { p.h -= 15; p.m -= 14; p.w -= 12; p.addFlag('disaster_survivor'); },
    addFlags: ['disaster_survivor', 'displaced', 'witnessed_climate_change'],
    minAge: 0,
  },
  {
    id: 'aral_sea_disaster',
    name: 'Aral Sea Ecological Collapse',
    years: [1980, 2010],
    archetypes: ['post_soviet'],
    countries: ['Kazakhstan', 'Uzbekistan'],
    narrative: 'Soviet irrigation projects diverted the rivers that fed it. Within your lifetime, the fourth largest lake in the world becomes a desert. Fishing fleets sit rusting on dry land. The dust from the exposed seabed carries salt and pesticide residue for hundreds of kilometres.',
    effect: (p) => { p.h -= 10; p.m -= 8; p.w -= 6; p.addFlag('witnessed_climate_change'); },
    addFlags: ['witnessed_climate_change'],
    minAge: 0,
  },
  {
    id: 'hurricane_katrina',
    name: 'Hurricane Katrina',
    years: [2005, 2006],
    archetypes: 'all',
    countries: ['United States'],
    narrative: 'The levees break. New Orleans floods. Eighty percent of the city is underwater for weeks. The response reveals something about which lives the state considers expendable. It takes years to rebuild, and some things are not rebuilt.',
    effect: (p) => { p.h -= 12; p.m -= 15; p.w -= 14; p.addFlag('disaster_survivor'); },
    addFlags: ['disaster_survivor', 'displaced'],
    minAge: 0,
    when: (G) => G.stats.wealth < 55,
  },
  {
    id: 'european_heatwave_2003',
    name: 'European Heatwave',
    years: [2003, 2003],
    archetypes: ['wealthy_west'],
    countries: null,
    narrative: 'Seventy thousand people die across Europe in August. Most are elderly, living alone, in cities not built for this temperature. Scientists call it a once-in-five-hundred-years event. They revise that estimate downward within a decade.',
    effect: (p) => { p.h -= 6; p.m -= 5; p.addFlag('witnessed_climate_change'); },
    addFlags: ['witnessed_climate_change'],
    minAge: 0,
    when: (G) => G.stats.health < 50 || G.age > 65,
  },
  {
    id: 'niger_river_drought',
    name: 'Sahel Climate Deterioration',
    years: [2000, 2025],
    archetypes: ['subsaharan'],
    countries: ['Nigeria', 'Niger', 'Mali', 'Senegal', 'Ethiopia', 'Kenya'],
    narrative: 'The rains are less reliable than they were. The lake that fed the fishing village is shrinking. Pastoralists and farmers compete for land that is producing less each year. Climate migration is what the researchers call it. You call it leaving.',
    effect: (p) => { p.m -= 10; p.h -= 6; p.w -= 8; p.addFlag('witnessed_climate_change'); },
    addFlags: ['witnessed_climate_change', 'drought_survivor'],
    minAge: 10,
    when: (G) => G.ruralUrban === 'rural',
  },

  // ── HISTORICAL TRAUMAS ────────────────────────────────────────────────────────

  {
    id: 'partition_of_india',
    name: 'Partition of India',
    years: [1947, 1948],
    archetypes: 'all',
    countries: ['India', 'Pakistan'],
    narrative: 'The line is drawn. Fourteen million people move in both directions. Around a million are killed in the violence that follows. Families are severed. Villages are renamed. A country that existed for centuries becomes two countries overnight, and the grief of it will be carried for generations.',
    effect: (p) => { p.m -= 20; p.h -= 10; p.addFlag('partition_survivor'); p.addFlag('displaced'); },
    addFlags: ['partition_survivor', 'displaced', 'war_childhood'],
    minAge: 0,
    when: (G) => G.age <= 40,
  },

  {
    id: 'partition_india_refugee',
    name: 'Partition Displacement',
    years: [1947, 1949],
    archetypes: 'all',
    countries: ['India', 'Pakistan'],
    narrative: 'The column moves at night to avoid the militias on the road. You carry what you can. The village your grandparents built is now on the wrong side of a line that did not exist last year. The relatives who stayed are no longer reachable. You arrive somewhere that is supposed to be home. It is not home yet.',
    effect: (p) => { p.m -= 25; p.h -= 15; p.w -= 10; p.addFlag('partition_refugee'); p.addFlag('lost_home'); },
    addFlags: ['partition_refugee', 'lost_home'],
    minAge: 0,
    when: (G) => G.age <= 30 && !G.flags.includes('partition_survivor'),
  },

  {
    id: 'rwandan_genocide_aftermath',
    name: 'Rwanda: Aftermath',
    years: [1994, 2000],
    archetypes: 'all',
    countries: ['Rwanda'],
    narrative: 'Eight hundred thousand people were killed in a hundred days. Now the survivors live next to the survivors of those who did the killing. The gacaca courts process the cases. You give your testimony. The person who testified before you lost the same things you lost. The country is being asked to reconstitute itself from something that should not have been possible.',
    effect: (p) => { p.m -= 18; p.r += 15; p.addFlag('genocide_survivor'); },
    addFlags: ['genocide_survivor', 'genocide_witness'],
    minAge: 5,
    when: (G) => !G.flags.includes('rwandan_genocide'),
  },

  {
    id: 'rwandan_genocide_acute',
    name: 'Rwandan Genocide',
    years: [1994, 1994],
    archetypes: 'all',
    countries: ['Rwanda'],
    narrative: 'The radio names the group you belong to as the enemy. The roadblocks go up in the night. Neighbors you have known your whole life are making decisions about you that you did not know they were capable of making. You hide. You run. The hundred days pass and the count that comes after is a number that will not fit inside ordinary language.',
    context: 'Between April and July 1994, an estimated 500,000–800,000 Tutsi and moderate Hutu were killed in Rwanda — roughly 70% of the Tutsi population — in a genocide organized by the Hutu Power government and executed largely by civilian militias called the Interahamwe. The international community, including a UN peacekeeping force already present in the country, did not intervene.',
    effect: (p) => { p.m -= 35; p.h -= 20; p.addFlag('genocide_survivor'); p.addFlag('tutsi_hidden'); },
    addFlags: ['genocide_survivor', 'tutsi_hidden', 'war_childhood'],
    minAge: 0,
  },

  {
    id: 'post_apartheid_transition',
    name: 'End of Apartheid',
    years: [1994, 1998],
    archetypes: 'all',
    countries: ['South Africa'],
    narrative: 'The first free election. The queues go for miles. People who have never voted in their country stand in them for hours without complaint. The vote cast is the weight of everything that came before it. The transition is not the end of what apartheid did — the land, the wealth, the schools remain organized by the old logic — but it is something new and real happening in a place that needed it.',
    effect: (p) => { p.m += 12; p.addFlag('post_apartheid_generation'); },
    addFlags: ['post_apartheid_generation'],
    minAge: 10,
  },

  {
    id: 'apartheid_pass_laws',
    name: 'Apartheid Pass Laws',
    years: [1950, 1990],
    archetypes: 'all',
    countries: ['South Africa'],
    narrative: 'The pass book must be carried at all times. Failure to produce it means arrest. The book determines where you may live, where you may work, which train you may board. It is a document that describes your permitted life in a country you were born in.',
    effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('apartheid_pass_book'); p.addFlag('systemic_discrimination'); },
    addFlags: ['apartheid_pass_book', 'systemic_discrimination'],
    minAge: 16,
    when: (G) => {
      const ethnicId = G.ethnicity
      const country = G.character.country
      const isBlack = country.ethnicGroups?.some(e => e.id === ethnicId && e.disadvantaged)
      return isBlack
    },
  },

  {
    id: 'yugoslav_wars_impact',
    name: 'Yugoslav Wars: Civilian Experience',
    years: [1991, 1999],
    archetypes: 'all',
    countries: ['Bosnia and Herzegovina', 'Croatia', 'Serbia', 'Kosovo', 'Slovenia', 'North Macedonia'],
    narrative: 'The shelling begins before you understand that the country you grew up in no longer exists. The neighbours you had are now across a front line. The city is besieged. You learn which streets are safe and which are not, and the knowledge changes the way you move through the world permanently. The ceasefire comes and goes and comes again. The Dayton Agreement is a document. What it does not contain is everything you lost.',
    effect: (p) => { p.m -= 22; p.h -= 12; p.addFlag('yugoslav_war_survivor'); p.addFlag('war_childhood'); },
    addFlags: ['yugoslav_war_survivor', 'displaced'],
    minAge: 0,
  },

  {
    id: 'iran_revolution_street',
    name: 'Iranian Revolution: Street Level',
    years: [1979, 1982],
    archetypes: 'all',
    countries: ['Iran'],
    narrative: 'The revolution happened and then the revolution changed. What you marched for and what arrived are different things with the same name. The dress codes come first, then the book burnings, then the names of people you know appearing on lists. The Islamic Republic is not what the Shah was. It is also not what you were promised.',
    effect: (p) => { p.m -= 14; p.addFlag('revolution_disillusionment'); p.addFlag('iran_revolution_lived'); },
    addFlags: ['revolution_disillusionment', 'iran_revolution_lived'],
    minAge: 10,
    when: (G) => !G.flags.includes('revolution_generation'),
  },

  {
    id: 'korean_war_aftermath',
    name: 'Korean War Division',
    years: [1953, 1960],
    archetypes: 'all',
    countries: ['South Korea', 'North Korea'],
    narrative: 'The armistice is not a peace treaty. The country is divided along a line that separates families — relatives you cannot write to, a village that is now in another country. The division is understood to be temporary. It does not end in your lifetime.',
    effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('korean_division_generation'); },
    addFlags: ['korean_division_generation', 'divided_family'],
    minAge: 0,
    when: (G) => G.age <= 25,
  },

  {
    id: 'cultural_revolution_china',
    name: 'Cultural Revolution',
    years: [1966, 1976],
    archetypes: 'all',
    countries: ['China'],
    narrative: 'The Red Guards arrive at the school. The teachers are made to stand in front of the students. The books are burned in the courtyard — which ones, exactly, depends on who is in charge of the bonfire. You learn to say the right things in the right order. What you actually think is kept entirely separate and never written down.',
    context: 'Mao Zedong launched the Cultural Revolution in 1966 to reassert his authority by mobilising youth against "capitalist roaders" in the Party. Between 500,000 and 2 million people were killed; millions more were sent to rural labour camps ("re-education through labour"). Universities were closed for years. The movement ended with Mao\'s death in 1976 and the arrest of the Gang of Four.',
    effect: (p) => { p.m -= 18; p.e -= 8; p.addFlag('cultural_revolution_survived'); p.addFlag('sent_down_generation'); },
    addFlags: ['cultural_revolution_survived'],
    minAge: 5,
  },

  // ── BUILD 2: VIETNAM ARC ─────────────────────────────────────────────────────

  {
    id: 'fall_of_saigon',
    name: 'Fall of Saigon',
    years: [1975, 1976],
    archetypes: 'all',
    countries: ['Vietnam'],
    narrative: 'On April 30, the tanks roll through the gates of the presidential palace. The city has been called Saigon your whole life. It will now be called Ho Chi Minh City. The helicopter on the roof of the American embassy is a photograph. The people not on it are not a photograph. They are a problem that the new government is in the process of defining.',
    context: 'North Vietnamese forces captured Saigon on April 30, 1975, ending the Vietnam War. The South Vietnamese government surrendered unconditionally. Approximately 130,000 South Vietnamese were evacuated to the US; many more were left behind. The reunification of Vietnam under Communist Party rule followed in 1976. Between 1975 and 1995, an estimated 800,000–1 million "boat people" fled Vietnam by sea.',
    effect: (p) => { p.m -= 20; p.w -= 12; p.addFlag('saigon_fell'); p.addFlag('south_vietnamese'); },
    addFlags: ['saigon_fell', 'south_vietnamese'],
    minAge: 0,
    when: (G) => G.currentYear === 1975,
  },

  {
    id: 'vietnam_doi_moi',
    name: 'Đổi Mới: Vietnam\'s Reform',
    years: [1986, 1990],
    archetypes: 'all',
    countries: ['Vietnam'],
    narrative: 'The Party announces Đổi Mới — renovation. The command economy is quietly admitted to have failed. Farmers can now sell surplus grain. Private businesses can operate. The word for what this is cannot be said: it sounds too much like capitalism. But you can feel the difference. The market stall has things in it now. The price is what you negotiate, not what the state decided.',
    context: 'Đổi Mới (renovation), announced at the Sixth National Congress in 1986, moved Vietnam from a command economy to a socialist-oriented market economy. Agricultural collectivisation was dismantled; private enterprise was permitted. Vietnam\'s GDP growth subsequently averaged over 7% annually. By 2000, poverty had fallen from roughly 60% to 30% of the population. The Communist Party retained political monopoly while liberalising the economy.',
    effect: (p) => { p.w += 10; p.m += 6; p.e += 4; p.addFlag('doi_moi_generation'); },
    addFlags: ['doi_moi_generation'],
    minAge: 5,
  },

  {
    id: 'vietnam_boat_people',
    name: 'The Boat People Exodus',
    years: [1978, 1992],
    archetypes: 'all',
    countries: ['Vietnam'],
    narrative: 'The boat is smaller than you imagined when you paid the broker. There are more people than the number you agreed to. The sea is not what you were told to expect. The destination — Malaysia, Hong Kong, the Philippines — is a rumour. What you are leaving is certain. What you are going to is not.',
    context: 'Between 1975 and 1995, an estimated 800,000–1 million Vietnamese fled by sea, primarily ethnic Chinese Vietnamese and former South Vietnamese. An estimated 200,000–400,000 died at sea from drowning, piracy, or dehydration. Those who reached land spent years in UNHCR camps in Southeast Asia and Hong Kong before being resettled or — from the late 1980s — repatriated. The crisis produced the largest refugee processing operation in UNHCR history.',
    effect: (p) => { p.h -= 12; p.m -= 18; p.w -= 10; p.addFlag('boat_person'); p.addFlag('refugee'); p.addFlag('emigrated'); p.setResidency('refugee_status'); },
    addFlags: ['boat_person', 'refugee', 'emigrated', 'south_vietnamese'],
    minAge: 0,
    when: (G) => G.flags.includes('south_vietnamese') || G.flags.includes('saigon_fell'),
  },

  // ── BUILD 1: POST-SOVIET ARC ──────────────────────────────────────────────────

  {
    id: 'baltic_singing_revolution',
    name: 'Baltic Singing Revolution',
    years: [1988, 1991],
    archetypes: ['post_soviet'],
    countries: ['Estonia', 'Latvia', 'Lithuania'],
    narrative: 'The national song festivals have always been permitted — they are folk culture, officially harmless. This year, two million people link hands across three countries and sing. The chain stretches 675 kilometres. When the Baltic states declare independence, it is the first time a Soviet republic has done so. Moscow sends troops. The troops stop.',
    context: 'The Baltic Way (August 23, 1989) saw approximately two million people form a human chain across Estonia, Latvia, and Lithuania to mark the 50th anniversary of the Molotov-Ribbentrop Pact. Lithuania declared independence in March 1990 — the first Soviet republic to do so. Soviet troops attacked the Vilnius TV Tower in January 1991, killing 14. All three states gained internationally recognised independence in August 1991 after the failed Moscow coup.',
    effect: (p) => { p.m += 12; p.e += 4; p.addFlag('soviet_collapse_lived'); p.addFlag('independence_generation'); },
    addFlags: ['soviet_collapse_lived', 'independence_generation'],
    minAge: 5,
  },

  {
    id: 'chechen_war_first',
    name: 'First Chechen War',
    years: [1994, 1996],
    archetypes: ['post_soviet'],
    countries: ['Russia'],
    narrative: 'The army goes to Chechnya in December and the generals say it will take two weeks. It takes two years. Grozny is bombed flat. The conscripts who come back say nothing about what happened there. The mothers who do not see their sons come back form committees that the government tries to ignore. The war ends in a ceasefire that feels like defeat.',
    context: 'Russia launched its first military campaign to prevent Chechen independence in December 1994. The Russian army, expecting a quick victory, was repelled from Grozny in January 1995 with heavy losses. The capital was eventually captured after devastating bombardment, but guerrilla fighting continued. The Khasavyurt ceasefire in August 1996 effectively granted Chechnya de facto independence, which Moscow reversed in the Second Chechen War (1999–2009).',
    effect: (p) => { p.m -= 8; p.addFlag('chechen_war_generation'); },
    addFlags: ['chechen_war_generation'],
    minAge: 10,
    when: (G) => !G.character.country || G.character.country.name !== 'Chechnya',
  },

  {
    id: 'chechen_war_first_lived',
    name: 'First Chechen War: Inside Grozny',
    years: [1994, 1996],
    archetypes: 'all',
    countries: ['Russia'],
    narrative: 'The shelling begins in January. The building across the street collapses in the night and in the morning there is rubble where the Mammadovs lived. The basement is where you sleep now. The water stopped three weeks ago. A Russian soldier at the checkpoint is twenty years old and does not understand the street names. The ceasefire comes. The city that existed before the war does not exist anymore.',
    context: 'Grozny, a city of 400,000, was subjected to sustained aerial and artillery bombardment in early 1995. The UN described it as "the most destroyed city on Earth." An estimated 35,000–50,000 civilians died in the first war. The second war (1999–2009) destroyed the city again. Under Ramzan Kadyrov, Grozny was rebuilt into a modern city — financed by Russian federal transfers — and its recent history was substantially erased from public record.',
    effect: (p) => { p.m -= 22; p.h -= 12; p.w -= 10; p.addFlag('war_childhood'); p.addFlag('chechen_civilian'); },
    addFlags: ['war_childhood', 'chechen_civilian'],
    minAge: 0,
    when: (G) => G.character.country?.name === 'Russia' && G.flags.includes('chechen_war_generation'),
  },

  {
    id: 'russia_financial_crash_1998',
    name: '1998 Russian Financial Crisis',
    years: [1998, 1999],
    archetypes: ['post_soviet'],
    countries: ['Russia', 'Ukraine'],
    narrative: 'On August 17, the government devalues the ruble and defaults on its debt. The ruble loses two-thirds of its value in two weeks. The banks you were told were safe close their doors. The savings you had rebuilt after the early nineties are gone again. Some people joke that they have now lost everything twice. The joke does not last long.',
    context: 'Russia\'s 1998 financial crisis was triggered by low oil prices, the cost of the Chechen war, and a debt spiral from high-interest short-term borrowing. On August 17, the government defaulted on domestic debt and devalued the ruble. The ruble fell from 6 to 21 per dollar within weeks. The crisis ended the period of economic stabilisation and led to Vladimir Putin\'s political rise as Prime Minister in August 1999.',
    effect: (p) => { p.w -= 15; p.mo -= 1500; p.m -= 10; p.addFlag('savings_wiped_hyperinflation'); },
    addFlags: ['savings_wiped_hyperinflation'],
    minAge: 12,
    when: (G) => !G.flags.includes('savings_wiped_hyperinflation'),
  },

  {
    id: 'post_soviet_hyperinflation',
    name: 'Post-Soviet Hyperinflation',
    years: [1992, 1994],
    archetypes: ['post_soviet'],
    countries: null,
    narrative: 'The prices are written in chalk on a board at the market. By afternoon they have been changed. The money you received as a pension this morning buys half what it bought yesterday. Your parents\' savings account — the one they opened in 1971 and never touched — contains a number that no longer corresponds to anything you can purchase. The thing that was supposed to be security is paper.',
    context: 'After price liberalisation in 1992, most post-Soviet states experienced extreme inflation. Russia\'s inflation rate in 1992 was 2,500%. Ukraine\'s inflation in 1993 reached 10,000%. Rouble savings accumulated over Soviet lifetimes became effectively worthless. In Russia, the currency was redenominated in 1998, removing three zeros from banknotes. The psychological impact on those who had saved under Soviet certainty was permanent.',
    effect: (p) => { p.w -= 14; p.m -= 10; p.addFlag('savings_wiped_hyperinflation'); p.addFlag('hyperinflation_generation'); },
    addFlags: ['savings_wiped_hyperinflation', 'hyperinflation_generation'],
    minAge: 15,
    when: (G) => !G.flags.includes('savings_wiped_hyperinflation') && !G.flags.includes('post_soviet_shock'),
  },

  {
    id: 'baltic_economic_recovery',
    name: 'Baltic Economic Miracle',
    years: [1995, 2004],
    archetypes: ['post_soviet'],
    countries: ['Estonia', 'Latvia', 'Lithuania'],
    narrative: 'The economy is growing again, which is not something you expected to feel in your lifetime. Estonia has introduced a flat tax and built one of the world\'s first digital states. Latvia and Lithuania are following different paths but arriving at the same destination. The EU is extending membership. For the first time since your grandparents were young, the country faces west by choice rather than by accident of geography.',
    context: 'The Baltic states pursued radical market reforms in the 1990s and recovered faster than other post-Soviet states. Estonia\'s e-government reforms (digital identity, online voting, digital tax filing) from 1996 onward made it a model for e-governance globally. All three states joined NATO and the EU in 2004. GDP per capita growth averaged over 8% annually 2000–2007, funded partly by foreign direct investment and EU structural funds.',
    effect: (p) => { p.w += 12; p.m += 8; p.addFlag('eu_generation'); },
    addFlags: ['eu_generation'],
    minAge: 10,
    when: (G) => G.flags.includes('soviet_collapse_lived') || G.flags.includes('independence_generation'),
  },

  // ── BUILD 29: ELECTIONS & REFERENDA ──────────────────────────────────────

  {
    id: 'we_south_africa_1994_election',
    name: 'South Africa\'s First Free Election',
    years: [1994, 1994],
    archetypes: ['developing_urban'],
    countries: ['South Africa'],
    narrative: 'You queue for six hours. So does the person ahead of you, and the person behind. The line extends further than you can see. People have brought food and umbrellas and folding chairs. When you finally reach the booth it takes less than a minute. On the way out an old man is crying without apparent embarrassment. You understand why.',
    context: 'South Africa held its first fully democratic elections on 27 April 1994, with all races eligible to vote for the first time. Over 19 million people voted, many queuing for hours. Nelson Mandela\'s ANC won with 62.6% of the vote. The day is now a public holiday — Freedom Day. The election was administered without significant violence, which surprised observers who had predicted chaos.',
    effect: (p) => { p.m += 12; p.karma += 5; p.addFlag('voted_end_apartheid'); p.addFlag('post_apartheid_generation'); },
    addFlags: ['voted_end_apartheid'],
    minAge: 18,
    when: (G) => !G.flags.includes('voted_end_apartheid'),
  },

  {
    id: 'we_germany_1933_reichstag',
    name: 'German Federal Election, March 1933',
    years: [1933, 1933],
    archetypes: ['wealthy_west'],
    countries: ['Germany'],
    narrative: 'The results come through on the radio. In the street the next morning nothing is visibly different. But the calculation you have been running privately for months has resolved. The NSDAP have forty-four percent. With their coalition partners it is enough. You think about the people you know who voted for them, and whether they understood what they were voting for, and whether that question matters now.',
    context: 'The March 1933 Reichstag election was held five weeks after Hitler\'s appointment as Chancellor, under conditions of mass political intimidation. The SA patrolled polling stations. The NSDAP won 43.9% of the vote. The Enabling Act passed shortly after, giving Hitler dictatorial powers and formally ending the Weimar Republic. It was the last contested multi-party election in Germany until 1945.',
    effect: (p) => { p.m -= 10; p.addFlag('witnessed_democracy_end'); },
    addFlags: ['witnessed_democracy_end'],
    minAge: 18,
    when: (G) => !G.flags.includes('witnessed_democracy_end'),
  },

  {
    id: 'we_south_africa_1948_election',
    name: 'National Party Victory, South Africa',
    years: [1948, 1948],
    archetypes: ['developing_urban'],
    countries: ['South Africa'],
    narrative: 'The National Party wins on a platform of apartheid — separateness. For white South Africans the result is political. For Black, Coloured, and Indian South Africans — who could not vote — it is not a political result but an announcement: this is what the next forty-six years will look like.',
    context: 'The 1948 South African general election was contested only by white voters under racial franchise laws. The National Party\'s victory under D.F. Malan began formal apartheid as government policy. The Population Registration Act, Group Areas Act, pass laws, and Bantu Education Act followed rapidly. The system remained in place until 1994.',
    effect: (p) => { p.m -= 8; p.addFlag('apartheid_era'); },
    addFlags: ['apartheid_era'],
    minAge: 14,
    when: (G) => !G.flags.includes('apartheid_era') && !G.flags.includes('apartheid_privileged'),
  },

  {
    id: 'we_brexit_2016',
    name: 'Brexit Referendum',
    years: [2016, 2016],
    archetypes: ['wealthy_west'],
    countries: ['United Kingdom'],
    narrative: 'The count runs past midnight. By four in the morning the maps are mostly blue. You look around at the people who voted the same way you did, or didn\'t, and you understand that this result will take years to mean something — and that whatever it means will be contested. The margin is fifty-two to forty-eight. This turns out to be enough.',
    context: 'The UK\'s 2016 EU membership referendum produced a 51.9% Leave vote on a 72% turnout — the highest in a UK-wide vote since 1992. The result divided along lines of age, education, and geography. Formal withdrawal took place on 31 January 2020. The political and economic consequences continued to be debated through the following decade.',
    effect: (p) => { p.m -= 5; p.addFlag('brexit_era'); },
    addFlags: ['brexit_era'],
    minAge: 18,
    when: (G) => !G.flags.includes('brexit_era'),
  },

  {
    id: 'we_quebec_1995',
    name: 'Quebec Sovereignty Referendum',
    years: [1995, 1995],
    archetypes: ['wealthy_west'],
    countries: ['Canada'],
    narrative: '49.4 percent. A hundred thousand votes in a province of seven million. The margin is indistinguishable from accident. You stay up to hear the concession speech and then the prime minister\'s relief, which looks too much like relief to be pride. The country that almost wasn\'t continues.',
    context: 'The 1995 Quebec independence referendum returned a No vote of 50.58% to Yes 49.42% on a 93.5% turnout — the highest turnout of any Quebec election. The near-result reshaped Canadian politics, producing the Clarity Act (2000) which established conditions for any future secession vote. Sovereignty remains a live political question in Quebec.',
    effect: (p) => { p.m -= 4; p.addFlag('quebec_referendum_lived'); },
    addFlags: ['quebec_referendum_lived'],
    minAge: 18,
    when: (G) => !G.flags.includes('quebec_referendum_lived'),
  },

  // ── LATIN AMERICA WORLD EVENTS ────────────────────────────────────────────

  {
    id: 'chile_1973_coup',
    name: 'Chilean Military Coup',
    years: [1973, 1973],
    archetypes: 'all',
    countries: ['Chile'],
    narrative: 'September 11, 1973. The air force bombs La Moneda palace. Salvador Allende dies inside. Within hours the junta announces curfews, dissolves Congress, suspends political parties. Estadio Nacional becomes a detention camp. The coup was expected by some. The scale of what follows is not.',
    context: 'The September 11, 1973 coup ended Chile\'s elected socialist government and installed a military junta led by General Augusto Pinochet. An estimated 3,000 people were killed or disappeared and 80,000 were imprisoned in the following decade. The DINA (secret police) operated with legal impunity. The Rettig Commission (1991) documented 2,279 victims; the Valech Commission (2004) identified 28,000 torture survivors. Pinochet died under house arrest in 2006 without being convicted of any crime.',
    effect: (p) => { p.m -= 15; p.addFlag('learned_silence'); p.addFlag('political_aware'); },
    addFlags: ['learned_silence', 'political_aware'],
    minAge: 8,
  },

  {
    id: 'operation_condor',
    name: 'Operation Condor',
    years: [1974, 1983],
    archetypes: 'all',
    countries: ['Chile', 'Argentina', 'Uruguay', 'Brazil', 'Paraguay', 'Bolivia'],
    narrative: 'The security services of six South American military regimes are sharing information across borders. The exile you believed would protect you has a database entry. Operation Condor: the specific knowledge that leaving your country does not make you safe.',
    context: 'Operation Condor (1974–1983) was a US-backed intelligence network coordinating the security services of Chile, Argentina, Uruguay, Brazil, Paraguay, and Bolivia to locate and eliminate political dissidents abroad. An estimated 60,000–80,000 were killed in total across the member states; hundreds were forcibly transferred between countries without legal process. The operation\'s archive was discovered in Paraguay in 1992, providing documentary evidence of its scope.',
    effect: (p) => { p.m -= 12; p.addFlag('condor_generation'); },
    addFlags: ['condor_generation'],
    minAge: 15,
    when: (G) => G.flags.has('emigrated') || G.flags.has('political_active') || G.flags.has('dissident_reader'),
  },

  {
    id: 'brazil_1964_coup',
    name: 'Brazilian Military Coup',
    years: [1964, 1964],
    archetypes: 'all',
    countries: ['Brazil'],
    narrative: 'April 1, 1964. The military removes President Goulart with US support. The coup is announced as a revolution. Unions are dissolved. Communist and left-wing organisations are banned. Twenty-one years of military government follow. The coup is remembered by those who celebrated it, and differently by those who disappeared.',
    effect: (p) => { p.m -= 10; p.addFlag('political_aware'); p.addFlag('brazil_dictatorship_lived'); },
    addFlags: ['political_aware', 'brazil_dictatorship_lived'],
    minAge: 8,
  },

  {
    id: 'peru_shining_path',
    name: 'Peruvian Civil War (Shining Path)',
    years: [1984, 1993],
    archetypes: 'all',
    countries: ['Peru'],
    narrative: 'Transmission towers bombed in the mountains, Lima\'s lights going out in sections. Car bombs. Blackouts. The Shining Path and the army are fighting a war whose front line shifts daily. 70,000 people die. Seventy-five percent of them are Quechua-speaking. The war ends when Guzmán is captured in a ballet studio in Surquillo.',
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('sendero_generation'); p.addFlag('war_childhood'); },
    addFlags: ['sendero_generation', 'war_childhood'],
    minAge: 0,
  },

  {
    id: 'guatemala_genocide_1982',
    name: 'Guatemalan Genocide',
    years: [1981, 1984],
    archetypes: 'all',
    countries: ['Guatemala'],
    narrative: 'Under General Ríos Montt\'s scorched earth campaign, the army destroys 626 indigenous Maya villages. The logic is counterinsurgency: eliminate the population that supports the guerrillas. 200,000 people die in Guatemala\'s 36-year civil war; 83% of them are Maya.',
    context: 'Guatemala\'s 1981–1983 scorched earth campaign under General Efraín Ríos Montt killed tens of thousands of Maya civilians in the western highlands. The 1999 UN-backed CEH (Commission for Historical Clarification) found that 93% of documented atrocities were committed by state and paramilitary forces and that these acts constituted genocide. In 2013, Ríos Montt was convicted of genocide by a Guatemalan court — the first time a former head of state was convicted of genocide in his own country\'s courts — before the conviction was overturned on procedural grounds.',
    effect: (p) => { p.m -= 15; p.h -= 8; p.addFlag('genocide_survivor'); p.addFlag('war_childhood'); },
    addFlags: ['genocide_survivor', 'war_childhood'],
    minAge: 0,
  },

  {
    id: 'haiti_earthquake_2010',
    name: 'Haiti Earthquake',
    years: [2010, 2010],
    archetypes: 'all',
    countries: ['Haiti'],
    narrative: 'January 12, 2010. Magnitude 7.0. 220,000 people die and 1.5 million are displaced in a country of ten million. The Presidential Palace collapses. The parliament collapses. The main hospital collapses. International aid arrives in quantities that dwarf the country\'s GDP. The country does not recover to what it was.',
    context: 'The 2010 Haiti earthquake was the deadliest natural disaster in the Western Hemisphere in over two centuries. Beyond 220,000 dead and 300,000 injured, a subsequent cholera outbreak — introduced by UN peacekeeping troops, a fact the UN denied for years — killed an additional 10,000 people. Ten years later, $13 billion in international aid had been disbursed; a 2021 survey found that reconstruction was still incomplete and that 1.5 million Haitians remained in poverty-related food insecurity.',
    effect: (p) => { p.h -= 20; p.m -= 18; p.w -= 12; p.addFlag('disaster_survivor'); p.addFlag('earthquake_survivor'); },
    addFlags: ['disaster_survivor', 'earthquake_survivor'],
    minAge: 0,
  },

  // ── ERA GAPS & FORGOTTEN CONFLICTS ────────────────────────────────────────

  {
    id: 'oil_shock_1973',
    name: '1973 Oil Shock',
    years: [1973, 1974],
    archetypes: 'all',
    countries: null,
    narrative: 'OPEC announces an oil embargo. The price of oil quadruples in weeks. Petrol queues stretch around blocks. In some countries the government introduces odd-even rationing. The relationship between the world and the ground beneath it has changed.',
    context: 'The 1973 oil crisis began when OPEC members proclaimed an oil embargo against nations supporting Israel in the Yom Kippur War. Oil prices rose from $3 per barrel to $12. In the United States, the national speed limit was reduced to 55 mph; in the UK, television broadcasts ended at 10:30 pm to save electricity. The shock ended the postwar economic boom in Western countries and triggered stagflation — simultaneous inflation and unemployment — that lasted through the late 1970s. Oil-producing developing countries briefly accumulated unprecedented wealth.',
    effect: (p) => { p.w -= 8; p.m -= 6; p.addFlag('oil_shock_generation'); },
    addFlags: ['oil_shock_generation'],
    minAge: 6,
    when: (G) => !G.flags.includes('oil_shock_generation'),
  },

  {
    id: 'oil_shock_1973_gulf',
    name: '1973 Oil Boom',
    years: [1973, 1975],
    archetypes: ['wealthy_gulf'],
    countries: null,
    narrative: 'The embargo changes your country\'s position in the world overnight. The money arrives faster than the infrastructure to spend it. Cranes appear on horizons that were empty last year. A relative gets a government contract. The word "petrodollar" is new.',
    effect: (p) => { p.w += 15; p.mo += 2000; p.addFlag('oil_boom_generation'); },
    addFlags: ['oil_boom_generation'],
    minAge: 0,
  },

  {
    id: 'asian_financial_crisis_1997',
    name: '1997 Asian Financial Crisis',
    years: [1997, 1999],
    archetypes: ['wealthy_east', 'developing_urban'],
    countries: ['Thailand', 'Indonesia', 'South Korea', 'Malaysia'],
    narrative: 'The baht falls. Then the rupiah. Then the won. Currencies that seemed fixed suddenly are not. Savings denominated in local currency lose a third of their value in weeks. The IMF arrives with conditions: cut spending, raise interest rates, open markets — all at once, while people are already struggling.',
    context: 'The 1997–98 Asian financial crisis began in Thailand in July 1997 when the baht was floated after running out of foreign reserves. Currency collapses spread to Indonesia, South Korea, Malaysia, and the Philippines. Indonesia\'s GDP fell 13.5% in 1998; South Korea\'s fell 5.5%. The IMF provided $40 billion in bailout packages with conditions of austerity and deregulation. In Indonesia, the crisis triggered political crisis: Suharto resigned after 32 years in power. An estimated 24 million people were pushed into poverty.',
    effect: (p) => { p.w -= 12; p.m -= 10; p.wipeMoney(0.35); p.addFlag('asian_crisis_generation'); },
    addFlags: ['asian_crisis_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('asian_crisis_generation'),
  },

  {
    id: 'bangladesh_liberation_war_1971',
    name: 'Bangladesh Liberation War',
    years: [1971, 1971],
    archetypes: 'all',
    countries: ['Bangladesh'],
    narrative: 'March 25th. Operation Searchlight begins at midnight. The army moves on the universities and the Hindu neighbourhoods first. Nine months of war follow before the Indian army crosses the border. Then — suddenly, improbably — it is over. A country has been born. The word for what happened to the people in between does not exist yet.',
    context: 'Bangladesh\'s Liberation War followed the Pakistani military\'s attempt to suppress the Bengali nationalist movement that had won the 1970 elections. Operation Searchlight, launched on March 25, 1971, targeted Bengali intellectuals, students, police, and Hindu minorities. Estimates of those killed range from 300,000 to 3 million, making it one of the 20th century\'s most contested and underreported mass atrocities. The war ended December 16, 1971 after Indian military intervention. Bangladesh declared independence. Ten million refugees had fled to India during the conflict.',
    effect: (p) => { p.h -= 12; p.m -= 15; p.addFlag('liberation_war_generation'); p.addFlag('war_childhood'); },
    addFlags: ['liberation_war_generation'],
    minAge: 0,
  },

  {
    id: 'india_emergency_1975',
    name: 'Indian Emergency',
    years: [1975, 1977],
    archetypes: 'all',
    countries: ['India'],
    narrative: 'Indira Gandhi declares a state of emergency. The constitution is suspended. The press is censored. Arrests begin quietly, then openly. Sanjay Gandhi\'s slum clearances move through Delhi with speed that only happens when no one is watching. The trains run on time. Everyone comments on this. Fewer people comment on why.',
    context: 'The Indian Emergency (June 1975–March 1977) suspended civil liberties, censored the press, and imprisoned political opponents. Roughly 110,000 people were detained without trial under the Maintenance of Internal Security Act. The period is associated with Sanjay Gandhi\'s controversial programmes: forced sterilization (targeting poor men) and slum clearance in Delhi. When Indira Gandhi called elections in 1977, expecting to win, she lost in a landslide. The Emergency remains a reference point in Indian constitutional discourse about the fragility of democratic institutions.',
    effect: (p) => { p.m -= 10; p.addFlag('emergency_generation'); p.addFlag('learned_silence'); },
    addFlags: ['emergency_generation'],
    minAge: 6,
    when: (G) => !G.flags.includes('emergency_generation'),
  },

  {
    id: 'egypt_1967_defeat',
    name: 'Six-Day War Defeat',
    years: [1967, 1967],
    archetypes: 'all',
    countries: ['Egypt'],
    narrative: 'The radio had said they would win. In six days it is over. Israel holds Sinai, the West Bank, Gaza, the Golan Heights. The gap between what the radio said and what happened is everything. Nasser addresses the nation and offers his resignation. The crowds in the street reject it. He dies three years later. The mourning is genuine and complicated.',
    context: 'The June 1967 Six-Day War ended in comprehensive Arab military defeat — Israel captured the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights. Egypt lost 10,000 soldiers. State media in Egypt and other Arab countries had broadcast optimistic reports that turned false within hours. The defeat is called the Naksa (setback) and became a defining rupture in Arab political consciousness — ending Nasserist pan-Arab nationalism as a credible project and accelerating Islamist political movements as alternatives.',
    effect: (p) => { p.m -= 12; p.addFlag('1967_generation'); },
    addFlags: ['1967_generation'],
    minAge: 8,
    when: (G) => !G.flags.includes('1967_generation'),
  },

  {
    id: 'ghana_independence_1957',
    name: 'Ghanaian Independence',
    years: [1957, 1957],
    archetypes: 'all',
    countries: ['Ghana'],
    narrative: 'March 6. Kwame Nkrumah declares independence at midnight and the crowd shouts it back at him. The word travels by radio to villages that have no electricity. You hear it from someone who heard someone else say it. Whatever it means exactly is still being worked out. But something has changed.',
    effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('independence_generation'); p.addFlag('independence_ghana'); },
    addFlags: ['independence_generation', 'independence_ghana'],
    minAge: 0,
  },

  {
    id: 'ghana_1966_coup',
    name: 'Ghana: The First Coup',
    years: [1966, 1966],
    archetypes: 'all',
    countries: ['Ghana'],
    narrative: 'Nkrumah is abroad when the military moves. The radio plays martial music, which you now know means something has happened. By the time the announcement comes your calculations have already begun — who you can speak to and who you cannot, what the old certainties are worth now, what you believed about the project of this country and whether you still believe it.',
    context: 'Ghana\'s first military coup on February 24, 1966 removed Kwame Nkrumah while he was travelling to Hanoi for a peace mission to Vietnam. The coup was welcomed by the United States and UK, who had been funding the opposition and had reason to fear Nkrumah\'s pan-Africanism and Soviet ties. The CIA\'s role was later confirmed in declassified documents. For the generation that had celebrated 1957 independence as the beginning of a new Africa, 1966 was a specific kind of disillusionment.',
    effect: (p) => { p.m -= 10; p.addFlag('coup_generation'); p.addFlag('nkrumah_era'); },
    addFlags: ['coup_generation'],
    minAge: 6,
    when: (G) => G.flags.includes('independence_ghana') || G.character?.country?.name === 'Ghana',
  },

  {
    id: 'ethiopia_red_terror_1977',
    name: 'Ethiopian Red Terror',
    years: [1977, 1978],
    archetypes: 'all',
    countries: ['Ethiopia'],
    narrative: 'The Derg announces a Red Terror campaign. Bodies appear in the streets of Addis Ababa with red tags attached, left there deliberately. The targets are students, teachers, intellectuals — anyone the government considers counterrevolutionary. If you are any of these things, you have already recalibrated your movements. If you are not, you recalibrate them now.',
    context: 'The Red Terror (1977–78) was a campaign of mass killings by the Derg military junta against the Ethiopian People\'s Revolutionary Party (EPRP) and other opposition groups. Mengistu Haile Mariam displayed vials of blood at public rallies to signal the campaign\'s start. Estimates of those killed range from 10,000 to 500,000. Victims\' bodies were displayed publicly as deterrents; families were charged for the bullets used to execute their relatives before being allowed to collect the bodies. The campaign effectively eliminated organized urban opposition to the Derg.',
    effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('red_terror_generation'); p.addFlag('learned_silence'); },
    addFlags: ['red_terror_generation'],
    minAge: 6,
    when: (G) => !G.flags.includes('red_terror_generation'),
  },

  {
    id: 'turkey_coup_1980',
    name: 'Turkish Military Coup',
    years: [1980, 1981],
    archetypes: 'all',
    countries: ['Turkey'],
    narrative: 'The generals move on September 12th. By morning the constitution is suspended and martial law is in force. The political violence that has killed thousands over the past years stops — suddenly, completely. People say this while also not saying what stopped it. 650,000 people will be detained in the following years. The constitution is rewritten. You learn which things to say and which to wait on.',
    context: 'Turkey\'s 1980 military coup was its third since 1960 and its most comprehensive. General Kenan Evren justified the coup as necessary to end political violence between left and right factions that had killed thousands. The junta banned all political parties, arrested their leaders, and governed for three years before a referendum approved a new constitution — widely criticized as authoritarian. 650,000 people were detained; 171 died in custody; 50 were executed. The coup reshaped Turkish political culture, with its effects visible for decades.',
    effect: (p) => { p.m -= 10; p.addFlag('coup_generation'); p.addFlag('learned_silence'); },
    addFlags: ['coup_generation'],
    minAge: 6,
    when: (G) => !G.flags.includes('coup_generation') || G.character?.country?.name === 'Turkey',
  },

  {
    id: 'kenya_mau_mau',
    name: 'Mau Mau Uprising',
    years: [1952, 1960],
    archetypes: 'all',
    countries: ['Kenya'],
    narrative: 'The British declare a state of emergency. The Mau Mau are fighting for land and freedom. The colonial government\'s response is systematic detention. You have to make choices about the oath, about silence, about which direction to face when the two sides are directly in front of you.',
    context: 'The Mau Mau uprising (1952–1960) was a guerrilla war against British colonial rule in Kenya, primarily among the Kikuyu. The British response included mass detention — 1.5 million people were moved into 150 "protected villages." The Hola Camp massacre (1959), in which 11 detainees were beaten to death, caused a parliamentary crisis in Britain. Kenya gained independence in 1963. The British government paid £19.9 million in compensation to survivors in 2013 after losing a legal challenge, and acknowledged "torture and ill-treatment" in Kenyan detention camps.',
    effect: (p) => { p.m -= 12; p.addFlag('mau_mau_generation'); p.addFlag('war_childhood'); },
    addFlags: ['mau_mau_generation'],
    minAge: 0,
    when: (G) => !G.flags.includes('independence_generation'),
  },

  {
    id: 'kenya_independence_1963',
    name: 'Kenyan Independence',
    years: [1963, 1963],
    archetypes: 'all',
    countries: ['Kenya'],
    narrative: 'December 12. The Union Jack comes down and the black, red, and green goes up. Jomo Kenyatta speaks. You are there or you hear about it from someone who was there. A man who was imprisoned for nine years by the same government that is now handing power to him will lead the country. This seems either miraculous or complicated depending on who you ask.',
    effect: (p) => { p.m += 12; p.karma += 4; p.addFlag('independence_generation'); p.addFlag('independence_kenya'); },
    addFlags: ['independence_generation', 'independence_kenya'],
    minAge: 0,
  },

  {
    id: 'romania_revolution_1989',
    name: 'Romanian Revolution',
    years: [1989, 1990],
    archetypes: ['post_soviet'],
    countries: ['Romania'],
    narrative: 'December 21st, Ceaușescu addresses the crowd from the balcony of Central Committee headquarters. Someone boos. In the silence that follows — the silence of a dictator who has not been booed in twenty-four years — the regime ends. The army sides with the protesters. On December 25th, Ceaușescu and his wife are executed after a brief military trial. The execution is broadcast on television.',
    context: 'Romania\'s revolution of December 1989 was the only violent transition among the Eastern Bloc revolutions of that year. The immediate trigger was protests in Timișoara over the forced relocation of a Protestant minister; security forces killed protesters. When Ceaușescu attempted a public rally in Bucharest on December 21, the crowd began booing — an unprecedented rupture in a personality cult sustained over two decades. The Securitate fought for the regime while the army defected. Approximately 1,100 people died in the revolution. The December 25 execution of Ceaușescu was watched on live television across Romania and by international audiences.',
    effect: (p) => { p.m += 8; p.addFlag('revolution_generation'); p.addFlag('independence_generation'); },
    addFlags: ['revolution_generation'],
    minAge: 0,
  },

  {
    id: 'nigeria_oil_boom_1970s',
    name: 'Nigerian Oil Boom',
    years: [1970, 1978],
    archetypes: 'all',
    countries: ['Nigeria'],
    narrative: 'Lagos is building itself faster than it can be planned. Cranes on every skyline. Roads half-finished. Imported cars in gridlock that didn\'t exist two years ago. A relative gets a government contract and buys a new car. The phrase "petrodollar" is new but everyone is using it. Whether the money reaches you or not depends entirely on who you know.',
    context: 'Nigeria\'s oil revenue increased dramatically after the 1973 OPEC oil embargo, rising from ₦1.1 billion in 1970 to ₦8.9 billion by 1974. Petroleum replaced agriculture as the dominant export. The period saw rapid urbanization, federal spending on infrastructure, and the 1976–80 Second National Development Plan. However, oil revenue also fueled corruption, and the agricultural sector — which had employed 70% of the workforce — was largely neglected. When oil prices fell in the early 1980s, the revenue dependency became a crisis.',
    effect: (p) => { p.w += 5; p.m += 5; p.addFlag('oil_boom_generation'); },
    addFlags: ['oil_boom_generation'],
    minAge: 6,
  },

  {
    id: 'nigeria_biafra_aftermath',
    name: 'After Biafra',
    years: [1970, 1973],
    archetypes: 'all',
    countries: ['Nigeria'],
    narrative: 'The war ended with Gowon\'s phrase: "No victor, no vanquished." You are old enough to understand that this is a political sentence, not a description. The Igbo civil servants who left their Lagos posts to return to Biafra discover their positions have been filled. Old colleagues nod in corridors. The war that ended officially has not ended everywhere.',
    effect: (p) => { p.m -= 8; p.addFlag('biafra_generation'); },
    addFlags: ['biafra_generation'],
    minAge: 8,
    when: (G) => !G.flags.includes('biafra_generation'),
  },

  {
    id: 'south_korea_park_era',
    name: 'Park Chung-hee\'s Development State',
    years: [1963, 1978],
    archetypes: ['wealthy_east'],
    countries: ['South Korea'],
    narrative: 'The economy is growing at rates you have never seen and your parents have never seen. A factory job in the city pays more than your family made farming. The government tells you this is the miracle, that sacrifice now is growth later. The conditions in the factories are what they are. The GDP numbers are real.',
    context: 'South Korea\'s GDP grew an average of 9.2% annually between 1962 and 1979 under Park Chung-hee\'s authoritarian government. The Chaebols (family conglomerates — Samsung, Hyundai, LG) were cultivated as national champions. The Saemaul Undong (New Community Movement) modernised rural infrastructure. Real wages rose significantly. The period is called the "Miracle on the Han River." Park Chung-hee was assassinated in 1979 by his own intelligence chief. Whether the economic development justified the suppression of labour rights, political opposition, and civil liberties remains contested in South Korean society.',
    effect: (p) => { p.w += 8; p.e += 4; p.addFlag('korean_miracle_generation'); },
    addFlags: ['korean_miracle_generation'],
    minAge: 10,
  },

  {
    id: 'south_korea_gwangju_1980',
    name: 'Gwangju Uprising',
    years: [1980, 1980],
    archetypes: ['wealthy_east'],
    countries: ['South Korea'],
    narrative: 'The paratroopers arrive in Gwangju on May 18th with clubs and bayonets. Students respond. The city rises. For ten days, citizens control Gwangju and the army surrounds it. On May 27th the army enters. The official death toll is 144. Witnesses say more. You learn about this from people who were there, or from what your government doesn\'t say.',
    context: 'The Gwangju Uprising of May 1980 began as a pro-democracy protest against General Chun Doo-hwan\'s seizure of power. Paratroopers\' indiscriminate violence against students and civilians led the entire city to arm itself from police stations. Gwangju was isolated and communications cut. The army\'s final assault on May 27 ended the uprising; up to 600 people may have died, though the official figure was 144. The uprising became a defining moment in South Korean democracy movements; its suppression with US knowledge (though not complicity) shaped anti-American sentiment. May 18 is now a national memorial day.',
    effect: (p) => { p.m -= 15; p.addFlag('gwangju_generation'); p.addFlag('democracy_movement'); },
    addFlags: ['gwangju_generation'],
    minAge: 6,
    when: (G) => !G.flags.includes('gwangju_generation'),
  },

  {
    id: 'zimbabwe_independence_1980',
    name: 'Zimbabwean Independence',
    years: [1980, 1980],
    archetypes: 'all',
    countries: ['Zimbabwe'],
    narrative: 'April 18. Zimbabwe becomes Zimbabwe. Mugabe speaks of reconciliation with the white minority. Bob Marley plays at the independence celebration. You believe it, or you are cautious, or you believe it and are cautious at the same time.',
    effect: (p) => { p.m += 12; p.karma += 4; p.addFlag('independence_generation'); p.addFlag('independence_zimbabwe'); },
    addFlags: ['independence_generation', 'independence_zimbabwe'],
    minAge: 0,
  },

  {
    id: 'zimbabwe_hyperinflation_2008',
    name: 'Zimbabwe Hyperinflation',
    years: [2007, 2009],
    archetypes: 'all',
    countries: ['Zimbabwe'],
    narrative: 'A loaf of bread costs what a car cost last month. You carry money in bags because a wallet isn\'t large enough. The central bank prints one-hundred-trillion-dollar notes. The word "trillion" loses its meaning. Prices change between when you enter a shop and when you reach the counter. The practical solution is to transact in US dollars or South African rand, which the government has declared illegal.',
    context: 'Zimbabwe\'s hyperinflation peaked at an estimated 89.7 sextillion percent (8.97 × 10²²%) annually in November 2008, according to the Cato Institute. The Reserve Bank printed 100 trillion dollar banknotes. The inflation was caused by government printing to fund deficits after the land reform programme collapsed agricultural production. In 2009, the government suspended the Zimbabwean dollar and adopted a multi-currency system using US dollars and South African rand. The hyperinflation wiped out the savings of Zimbabwe\'s middle class and devastated pensions.',
    effect: (p) => { p.w -= 18; p.m -= 15; p.wipeMoney(0.9); p.addFlag('hyperinflation_generation'); p.addFlag('hyperinflation_survivor'); },
    addFlags: ['hyperinflation_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('hyperinflation_generation'),
  },

  // ── OIL SHOCK 1973 — DEVELOPING WORLD ────────────────────────────────────
  {
    id: 'oil_shock_1973_periphery',
    name: '1973 Oil Shock — Import Burden',
    years: [1973, 1975],
    archetypes: ['subsaharan', 'developing_urban', 'developing_unstable', 'conflict_zone'],
    countries: null,
    narrative: 'The price of everything made with petroleum — fertiliser, transport, plastics — is rising, and there is no cushion. Countries that import oil are paying twice what they paid last year for it. Food prices follow. The government has nothing in reserve to absorb it. The word that keeps appearing in the newspapers is one that was not there before: stagflation. You learn it without knowing what it means because the thing it describes is already in your kitchen.',
    context: 'Oil-importing developing nations were the hardest hit by the 1973 oil shock. Countries like India, Brazil, South Korea, and sub-Saharan African nations faced sharp increases in import bills with no reserves to cushion the blow. Many were forced to borrow on international markets, accumulating the debt burdens that led to the 1980s debt crises and subsequent IMF structural adjustment programmes. The shock accelerated the divergence between oil exporters and oil importers in the developing world.',
    effect: (p) => { p.m -= 12; p.h -= 5; p.w -= 10; p.wipeMoney(0.2); p.addFlag('oil_shock_generation'); },
    addFlags: ['oil_shock_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('oil_shock_generation'),
  },

  // ── TRIANGLE SHIRTWAIST FIRE 1911 ─────────────────────────────────────────
  {
    id: 'triangle_shirtwaist_1911',
    name: 'Triangle Shirtwaist Factory Fire',
    years: [1911, 1911],
    archetypes: ['wealthy_west'],
    countries: ['United States'],
    narrative: 'One hundred and forty-six garment workers die in a factory on Washington Place in lower Manhattan. Most are young immigrant women. The fire exits are locked — a practice common enough in the industry that no one thought to question it until now. The owners are acquitted at trial. The names of the dead are printed in the newspapers and then the newspapers move on.',
    context: 'The Triangle Shirtwaist Factory fire of March 25, 1911 killed 146 workers, mostly immigrant women from Italy and Eastern Europe. The factory\'s owners had locked the stairwell doors to prevent unauthorized breaks and theft. The tragedy galvanized the American labor movement: within weeks, 80,000 people marched through New York in a funeral procession. The International Ladies\' Garment Workers\' Union grew to 250,000 members. The fire directly led to 36 new labor laws in New York State and became the foundational event of the 20th-century American labor movement.',
    effect: (p) => { p.m -= 10; p.karma += 8; p.addFlag('triangle_generation'); p.setPolitical('left'); },
    addFlags: ['triangle_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('triangle_generation'),
  },

  // ── UK MINERS' STRIKE 1984–85 ─────────────────────────────────────────────
  {
    id: 'uk_miners_strike_1984',
    name: 'UK Miners\' Strike',
    years: [1984, 1985],
    archetypes: ['wealthy_west'],
    countries: ['United Kingdom'],
    narrative: 'The National Union of Mineworkers has called a strike against pit closures. It will last a year. The government has prepared — coal stockpiled, police deployed in numbers the coalfields have never seen. The communities built around the pits — County Durham, South Wales, Yorkshire — are choosing sides, and the choice cuts through families. There is no clean position.',
    context: 'The UK miners\' strike of 1984–85 was a major industrial dispute between the NUM under Arthur Scargill and the Conservative government under Margaret Thatcher. The government had spent 18 months secretly stockpiling coal in preparation. 142,000 miners struck for a year; strike-breakers (\'scabs\') drove permanent community splits. The strike ended in defeat: 97 collieries were closed over the following decade, eliminating nearly all deep coal mining in Britain. The communities are still divided by the memory.',
    effect: (p) => { p.m -= 12; p.w -= 8; p.wipeMoney(0.2); p.addFlag('miners_strike_generation'); },
    addFlags: ['miners_strike_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('miners_strike_generation'),
  },

  // ── SPANISH CIVIL WAR LABOR DIMENSION 1936–37 ─────────────────────────────
  {
    id: 'spain_anarchist_factories_1936',
    name: 'Spanish Republic — Collectivised Barcelona',
    years: [1936, 1937],
    archetypes: 'all',
    countries: ['Spain'],
    narrative: 'The anarchist unions — the CNT and the FAI — are running the factories in Barcelona. Not managed, not administered: run. Decisions made collectively, wages equalised, bosses gone. It is also a city at war with itself, with the fascists, and with other factions on the left who consider the anarchists a threat to discipline. The revolution and the war are happening simultaneously, and they are not the same project.',
    context: 'Between July 1936 and May 1937, anarcho-syndicalist unions collectivised around 70% of Barcelona\'s industry, including transport, utilities, and most manufacturing. Workers\' committees replaced management. The experiment ended when the Republican government, backed by Soviet-aligned communists, moved to suppress anarchist militias in the May Days of 1937. George Orwell described this period in Homage to Catalonia. The collectivisations remain one of history\'s most significant experiments in worker self-management.',
    effect: (p) => { p.m += 5; p.karma += 8; p.s += 4; p.addFlag('civil_war_generation'); p.addFlag('anarchist_barcelona'); },
    addFlags: ['civil_war_generation', 'anarchist_barcelona'],
    minAge: 12,
    when: (G) => !G.flags.includes('civil_war_generation'),
  },

  // ── GREAT DEPRESSION 1929–35 ──────────────────────────────────────────────
  {
    id: 'great_depression_1929',
    name: 'The Great Depression',
    years: [1930, 1935],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'wealthy_west') {
        return 'The bank has failed or the harvest has been unsold or the factory has closed — the mechanism varies but the result is the same. Men stand in lines. The word breadline enters the vocabulary. Things that felt certain six months ago are not certain. Your family does not say the word poverty. They say: times are hard.'
      }
      if (arch === 'subsaharan' || arch === 'developing_urban' || arch === 'developing_unstable') {
        return 'The price of the export crop — cocoa, cotton, groundnuts, sisal — has collapsed because the buyers abroad have stopped buying. The cash that was entering the village from the market is gone. The colonial administration still requires its taxes. The gap between what the land produces and what survival costs has closed.'
      }
      return 'The global economy has contracted sharply. Prices for what your country sells abroad have fallen; prices for what your country buys have not. The adjustment is paid for by people who had no part in creating the crisis.'
    },
    context: 'The Great Depression began with the Wall Street Crash of October 1929 and spread to become a worldwide economic catastrophe. US GDP fell 30%, unemployment reached 25%. The Depression was transmitted globally through commodity price collapses: prices for cocoa, cotton, wheat, and rubber fell 40-70%, devastating colonial and developing economies. In Nigeria, cocoa prices fell 50%; in Kenya, settler farms collapsed; in India, the Depression catalysed the independence movement. The Depression transformed political economies everywhere it reached, accelerating both welfare states and fascism.',
    effect: (p) => {
      const arch = p._state?.character?.country?.archetype
      if (arch === 'wealthy_west') {
        p.m -= 18; p.h -= 8; p.w -= 20; p.wipeMoney(0.5); p.addFlag('depression_generation')
      } else {
        p.m -= 15; p.h -= 10; p.w -= 15; p.wipeMoney(0.35); p.addFlag('depression_generation')
      }
    },
    addFlags: ['depression_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('depression_generation'),
  },

  // ── SPANISH FLU 1918 ──────────────────────────────────────────────────────
  {
    id: 'spanish_flu_1918',
    name: 'The 1918 Influenza Pandemic',
    years: [1918, 1919],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'wealthy_west') {
        return 'Healthy in the morning, feverish by afternoon, and the hospitals are full. The second wave, in the autumn, is worse than the first. The dead include young adults at a rate that makes no statistical sense — it is the immune response, turned against the body, that kills the strongest fastest. The disease reaches everywhere the troop ships went. Public gatherings are cancelled. Newspapers report in euphemisms.'
      }
      return 'The illness has arrived from somewhere and is called by several names depending on which newspaper you read. It moves through the population quickly. The people who die are sometimes the people you would have expected least to die — the young, the strong. The ones who survive carry the memory of what a city sounds like when a third of its people are sick at the same time.'
    },
    context: 'The 1918 influenza pandemic killed an estimated 50-100 million people worldwide — more than all combat deaths in World War I. Unusually, mortality was highest in young adults aged 20-40, likely because the 1918 virus triggered a cytokine storm (extreme immune overreaction) in healthy immune systems. The pandemic infected 500 million people, roughly a third of the global population. India lost an estimated 17 million people, more than any other country. The pandemic was misnamed "Spanish flu" because Spain, neutral in the war, had a free press that reported it — belligerent nations censored their death counts.',
    effect: (p) => { p.m -= 15; p.h -= 15; p.addFlag('flu_pandemic_survivor'); },
    addFlags: ['flu_pandemic_survivor'],
    minAge: 1,
    when: (G) => !G.flags.includes('flu_pandemic_survivor'),
  },

  // ── 1997 ASIAN FINANCIAL CRISIS ───────────────────────────────────────────
  {
    id: 'asian_financial_crisis_1997',
    name: '1997 Asian Financial Crisis',
    years: [1997, 1999],
    archetypes: ['wealthy_east', 'developing_urban', 'developing_unstable'],
    countries: ['Thailand', 'Indonesia', 'South Korea', 'Malaysia', 'Philippines'],
    narrative: (G) => {
      const cn = G.character.country.name
      if (cn === 'Thailand') return 'The baht collapses on July 2nd. The news anchors say "managed float" but by the end of the week everyone knows it is a freefall. The currency halves in value inside six months. The middle class that took out dollar-denominated loans to buy apartments — a class that spent a decade believing in its own arrival — watches those loans double in real terms overnight. The IMF arrives with conditions attached. The conditions are: cut everything.'
      if (cn === 'Indonesia') return 'The rupiah loses 80% of its value within months. Suharto\'s New Order, which staked its legitimacy on economic growth, is suddenly presiding over a famine of savings. The social fabric tears in a predictable direction: the ethnic Chinese community, 3% of the population and most visible in trade, becomes the target. The riots of May 1998 are not about economics. They are about what economics makes available to those who want to harm.'
      if (cn === 'South Korea') return 'The won collapses and the government requires an IMF bailout of $58 billion. Companies that were considered industrial pillars — chaebols founded in the postwar miracle — begin to fail. The government asks citizens to donate their gold jewellery to pay the national debt. People bring rings, necklaces, wedding gifts. Several hundred tonnes of gold arrives.'
      return 'The currency has lost half its value since spring. The savings your family kept in the bank have not changed in number, but what they will buy has. The debt, taken in dollars, has doubled. The government is negotiating with the IMF and the IMF\'s terms are familiar to anyone who lived through structural adjustment: cut pensions, cut public employment, raise interest rates, open the market.'
    },
    context: 'The 1997-98 Asian financial crisis began with Thailand\'s decision to float the baht after currency speculators attacked it. Within months, contagion spread to Indonesia, Malaysia, South Korea, and the Philippines. Indonesia\'s GDP fell 13.5% in one year — a peacetime economic collapse comparable to the Great Depression. In Indonesia, the crisis triggered political violence against the ethnic Chinese community (May 1998 Jakarta riots) and the fall of Suharto after 32 years. South Korea\'s gold collection campaign raised $2.2 billion. The IMF\'s structural adjustment conditions — widely blamed for deepening the crisis — reshaped regional politics for a generation.',
    effect: (p) => { p.w -= 12; p.mo -= 3000; p.m -= 10; p.addFlag('asian_crisis_generation'); },
    addFlags: ['asian_crisis_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('asian_crisis_generation'),
  },

  // ── INDONESIA MAY 1998 RIOTS (ethnicity-gated) ────────────────────────────
  {
    id: 'indonesia_may_1998_riots',
    name: 'May 1998 Jakarta Riots',
    years: [1998, 1998],
    archetypes: null,
    countries: ['Indonesia'],
    narrative: 'Your neighbourhood goes quiet in the middle of the afternoon in a way that neighbourhoods do not go quiet. You know the sound of this kind of quiet from stories your parents told. The smoke is visible from three streets away. The mobs are not random — they move to specific addresses, specific shops. Your family has been here for three generations. This country is the only country any of you know.',
    context: 'In May 1998, as Indonesia\'s economic crisis and political transition reached their peak, riots broke out in Jakarta and other cities targeting the ethnic Chinese Indonesian community. Approximately 1,200 people died, thousands of properties were destroyed, and mass sexual violence was documented against Chinese Indonesian women. The riots accelerated the end of Suharto\'s rule but also triggered an emigration wave: an estimated $40 billion in Chinese Indonesian capital left the country in the following years.',
    effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('jakarta_98_survived'); },
    addFlags: ['jakarta_98_survived'],
    minAge: 5,
    when: (G) => G.character.country.name === 'Indonesia' && (G.ethnicity === 'chinese_indonesian' || G.flags.includes('chinese_indonesian')) && !G.flags.includes('jakarta_98_survived'),
  },

  // ── LUMUMBA ASSASSINATION 1961 ────────────────────────────────────────────
  {
    id: 'lumumba_assassination_1961',
    name: 'Assassination of Patrice Lumumba',
    years: [1961, 1961],
    archetypes: null,
    countries: ['DR Congo'],
    narrative: 'The radio announces it on February 13th: Lumumba is dead. Shot, they say, while trying to escape. Nobody believes the escape story. The first prime minister of your independent country, who gave the speech at independence that made you feel the word "dignity" for the first time, has been killed five months into his tenure. The Belgians knew. The CIA knew. Mobutu knew. The word betrayal is too small for what has happened.',
    context: 'Patrice Lumumba, the Democratic Republic of Congo\'s first democratically elected prime minister, was assassinated on January 17, 1961. Belgium and the CIA had both actively worked to remove him, fearing his nationalist and pan-Africanist politics. His death, announced publicly on February 13, became a defining moment for African independence movements. The Belgian parliament formally apologized in 2002. His assassination opened the way for Mobutu Sese Seko\'s 32-year kleptocracy.',
    effect: (p) => { p.m -= 18; p.karma -= 5; p.addFlag('lumumba_generation'); p.setPolitical('dissident'); },
    addFlags: ['lumumba_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('lumumba_generation'),
  },

  // ── CUBA ARCS ─────────────────────────────────────────────────────────────

  {
    id: 'bay_of_pigs_1961',
    name: 'Bay of Pigs Invasion',
    years: [1961, 1961],
    archetypes: null,
    countries: ['Cuba'],
    narrative: 'Fourteen hundred Cuban exiles, trained by the CIA, land on the southern coast. They are defeated in seventy-two hours. Castro broadcasts the victory personally. On the streets of Havana people are cheering — genuinely — because the country they chose is still the country they chose. The United States has tried and failed to take it back.',
    context: 'The Bay of Pigs invasion of April 1961 was a CIA-organised attempt by Cuban exiles to overthrow Fidel Castro. The Kennedy administration cancelled planned air support at the last minute; the invasion force was quickly overwhelmed and captured. The defeat was a significant propaganda victory for Castro, cementing his domestic position and deepening the US-Cuba antagonism that would shape the next six decades.',
    effect: (p) => { p.m += 6; p.addFlag('bay_of_pigs_generation'); },
    addFlags: ['bay_of_pigs_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('bay_of_pigs_generation'),
  },

  {
    id: 'mariel_boatlift_1980',
    name: 'Mariel Boatlift',
    years: [1980, 1980],
    archetypes: null,
    countries: ['Cuba'],
    narrative: 'Castro announces that anyone who wants to leave can go from the port of Mariel. One hundred and twenty-five thousand people leave in five months. He also empties some prison cells and psychiatric facilities into the boats. In the neighbourhood you grew up in, three families are gone by June. The ones who stayed do not discuss the ones who went.',
    context: 'The Mariel boatlift of April–October 1980 was triggered when thousands of Cubans sought asylum in the Peruvian embassy in Havana. Castro\'s government permitted mass emigration from Mariel Harbor, with the condition that Miami\'s Cuban-American community provide the boats. Along with ordinary Cubans, the government released prisoners and psychiatric patients into the exodus, which became a political flashpoint in the United States.',
    effect: (p) => { p.m -= 8; p.addFlag('mariel_generation'); },
    addFlags: ['mariel_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('mariel_generation'),
  },

  {
    id: 'cuba_special_period_1991',
    name: 'Cuba: The Special Period',
    years: [1991, 1998],
    archetypes: null,
    countries: ['Cuba'],
    narrative: 'The Soviet Union dissolves and the subsidies that kept the economy running stop overnight. Caloric intake falls by thirty percent. The buses stop; bicycles appear everywhere. The government calls it a "Special Period in Time of Peace." What it means, practically, is that the price of everything has changed and the peso no longer buys what it did and the shelves are what they are. You learn to cook what is available. Your body learns too.',
    context: 'Cuba\'s "Special Period in Peacetime" began when Soviet subsidies ended following the USSR\'s dissolution in 1991. Cuba lost roughly 80% of its imports and 80% of its export revenues. GDP fell by 35% between 1990 and 1993. The Cuban government responded with rationing, agricultural decentralisation, and opening to foreign tourism while maintaining the single-party system. The period officially ended in the early 2000s, though its economic legacy persisted.',
    effect: (p) => { p.h -= 8; p.m -= 12; p.w -= 8; p.addFlag('special_period_generation'); },
    addFlags: ['special_period_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('special_period_generation'),
  },

  // ── FIRST CONGO WAR 1996-97 ───────────────────────────────────────────────
  {
    id: 'congo_war_1996',
    name: 'First Congo War',
    years: [1996, 1997],
    archetypes: null,
    countries: ['DR Congo'],
    narrative: 'The war that nobody calls a war moves west across the country. Mobutu\'s army dissolves ahead of the advance. In Kinshasa, people wait. Some prepare to leave. Some go to the market anyway because the bread still needs buying. When Kabila\'s Alliance of Democratic Forces for the Liberation of Congo enters the capital in May 1997, Mobutu has already gone. Thirty-two years of *l\'authenticité*, of the presidential leopard-skin hat, of a country renamed Zaïre and then renamed back — ended without a battle for the capital.',
    context: 'The First Congo War (1996-97) began in eastern Congo following the Rwandan genocide, as Rwanda and Uganda backed Laurent-Désiré Kabila\'s rebel forces against Mobutu Sese Seko. It ended Mobutu\'s 32-year rule — one of the longest kleptocracies in African history, during which he amassed an estimated $5 billion while the country\'s infrastructure collapsed. Kabila renamed the country back to the Democratic Republic of Congo. The Second Congo War (1998-2003) would kill an estimated 5.4 million people, mainly from disease and hunger.',
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('mobutu_fall_generation'); },
    addFlags: ['mobutu_fall_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('mobutu_fall_generation'),
  },

  // ── BANGLADESH LIBERATION WAR 1971 ───────────────────────────────────────
  {
    id: 'bangladesh_liberation_1971',
    name: 'Bangladesh Liberation War',
    years: [1971, 1971],
    archetypes: 'all',
    countries: ['Bangladesh'],
    narrative: (G) => {
      if (G.age >= 15) {
        return 'Operation Searchlight begins on the night of March 25th. The Pakistani army moves on Dhaka. The targets are specific: the university, the Hindu quarter, the intellectual class. The word for what is happening does not exist yet in international law in a way that obliges anyone to stop it. Nine months. Indian intervention in December. On the 16th, the Pakistani forces surrender. The country is called Bangladesh — Sonar Bangla, Golden Bengal. The cost of it: a number between 300,000 and 3,000,000, depending on who is counting and why.'
      }
      return 'You are too young to understand what the adults are saying in low voices. What you understand: the fear in your mother\'s face, the sounds at night that are not wind, the neighbours who left and did not come back. Later someone will tell you what year it was and what it meant. You will know before they finish.'
    },
    context: 'The Bangladesh Liberation War lasted from March 25 to December 16, 1971. The Pakistani army\'s Operation Searchlight was a systematic campaign of mass killing, rape, and displacement targeting Bengali intellectuals, Hindus, and political opponents. Estimates of the death toll range from 300,000 to 3 million. India intervened militarily in December; Pakistan\'s forces surrendered on December 16, Bangladesh\'s Victory Day. The war produced 10 million refugees and created one of the world\'s newest nations.',
    effect: (p) => {
      if (p._state?.age >= 15) { p.m -= 18; p.h -= 10; p.addFlag('liberation_war_generation'); }
      else { p.m -= 12; p.h -= 6; p.addFlag('liberation_war_generation'); }
    },
    addFlags: ['liberation_war_generation'],
    minAge: 0,
    when: (G) => !G.flags.includes('liberation_war_generation'),
  },

  // ── MABO DECISION 1992 (AUSTRALIA) ───────────────────────────────────────
  {
    id: 'australia_mabo_1992',
    name: 'Mabo Decision',
    years: [1992, 1993],
    archetypes: 'all',
    countries: ['Australia'],
    narrative: (G) => {
      if (G.character.ethnicity === 'aboriginal_australian') return null // handled by character event
      return 'The High Court has found that Australia was not legally empty when the British arrived. Terra nullius — the legal fiction that underpinned two centuries of dispossession — is overturned. Eddie Mabo, a Torres Strait Islander, fought this case for a decade. He died four months before the decision. The ruling is narrow in law and vast in implication. The country will spend years arguing about what it means. The argument is not resolved.'
    },
    context: 'The Mabo v Queensland (No 2) decision of June 3, 1992 was a landmark ruling by Australia\'s High Court that recognised native title — the legal rights of Aboriginal and Torres Strait Islander peoples to their traditional lands. It overturned the doctrine of terra nullius ("land belonging to nobody") that had provided legal justification for the dispossession of Indigenous Australians since 1788. The Native Title Act 1993 followed. Eddie Koiki Mabo, a Meriam man from the Murray Islands, died of cancer in January 1992, four months before the decision bearing his name was handed down.',
    effect: (p) => { p.m += 3; p.e += 3; p.addFlag('mabo_generation'); },
    addFlags: ['mabo_generation'],
    minAge: 10,
    when: (G) => G.character.ethnicity !== 'aboriginal_australian' && !G.flags.includes('mabo_generation'),
  },

  // ── STOLEN GENERATIONS APOLOGY 2008 (AUSTRALIA) ──────────────────────────
  {
    id: 'australia_apology_2008',
    name: 'National Apology to the Stolen Generations',
    years: [2008, 2008],
    archetypes: 'all',
    countries: ['Australia'],
    narrative: (G) => {
      if (G.character.ethnicity === 'aboriginal_australian') return null // handled by character event
      return 'Prime Minister Rudd stands in Parliament and says: we are sorry. The words are: "for the laws and policies of successive Parliaments and governments that have inflicted profound grief, suffering and loss on these our fellow Australians." People in the public gallery are crying. People watching on television are crying. The apology does not return what was taken. It is also something that was not there yesterday and is there today. The country is processing something it has been not-quite-saying for a long time.'
    },
    context: 'On February 13, 2008, Australian Prime Minister Kevin Rudd delivered a formal apology to Aboriginal Australians, specifically to the Stolen Generations — Indigenous children forcibly removed from their families under government policies that operated from the late 19th century until 1970. An estimated 100,000 Aboriginal children were removed under these policies. The apology had been refused by Prime Minister John Howard for 11 years. It was watched by thousands of Aboriginal people gathered on the lawns outside Parliament House and televised nationally.',
    effect: (p) => { p.m += 4; p.e += 2; p.addFlag('apology_generation'); },
    addFlags: ['apology_generation'],
    minAge: 8,
    when: (G) => G.character.ethnicity !== 'aboriginal_australian' && !G.flags.includes('apology_generation'),
  },

  // ── PARIS AGREEMENT 2015 ─────────────────────────────────────────────────
  {
    id: 'paris_agreement_2015',
    name: 'Paris Climate Agreement',
    years: [2015, 2016],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const arch = G.character.country.archetype
      if (['wealthy_west', 'wealthy_east'].includes(arch)) {
        return 'One hundred and ninety-six countries agree to limit warming to 1.5 degrees. The agreement is binding in intent and voluntary in mechanism. Scientists say it is insufficient. Diplomats say it is historic. Both are true. The planet will warm past 1.5 degrees. The agreement made it somewhat less warm than it would otherwise have been, which is something, and not enough.'
      }
      if (['subsaharan', 'developing_unstable', 'developing_urban'].includes(arch)) {
        return 'Your country signed an agreement it did not cause to be necessary. The wealthy countries that burned coal and oil for two centuries agreed to slow down, somewhat. Your country — which contributed less than one percent of cumulative emissions — will experience the consequences of what the wealthy countries did. The agreement acknowledges this, in language. The reparations promised in that language remain theoretical.'
      }
      return 'The world agrees to limit warming. Whether it will is a different question from whether it agreed to.'
    },
    context: 'The Paris Agreement was adopted on December 12, 2015 by 196 parties at COP21. It committed signatories to limiting global temperature rise to well below 2°C above pre-industrial levels, pursuing 1.5°C. National pledges (NDCs) are voluntary; enforcement mechanisms are weak. Current NDCs, even if fully implemented, place warming on a trajectory of approximately 2.5-3°C. The agreement is widely considered necessary but insufficient.',
    effect: (p) => { p.m -= 2; p.e += 3; p.addFlag('climate_generation'); },
    addFlags: ['climate_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('climate_generation'),
  },

  // ── GREAT BARRIER REEF BLEACHING 2030s ───────────────────────────────────
  {
    id: 'reef_bleaching_2030s',
    name: 'Great Barrier Reef Mass Bleaching',
    years: [2030, 2035],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const country = G.currentCountry?.name || G.character.country.name
      if (country === 'Australia') {
        return 'The fourth consecutive mass bleaching event on the Great Barrier Reef. Sixty percent of the coral is now bleached or dead. The reef is 2,300 kilometres long and is the largest living structure on earth, or was. The tourism operators have a careful vocabulary for what is happening. The marine biologists do not bother with the careful vocabulary. What the bleaching means is that the water is too warm for the coral, and the water will not get cooler, and the reef is dying at a scale that no individual intervention can reverse.'
      }
      return 'The Great Barrier Reef is declared functionally extinct by the scientific bodies that track such things. It took 25 million years to form. It bleached to death in under a century. The thing that killed it — carbon dioxide warming the oceans — is still accumulating in the atmosphere. The reef is a specific loss: one species, one ecosystem, one measure of what was possible before.'
    },
    context: 'The Great Barrier Reef has experienced mass bleaching events in 1998, 2002, 2016, 2017, 2020, 2022, and 2024 — the last five consecutive years. Bleaching occurs when water temperatures rise above a threshold: the coral expels the symbiotic algae that provides 90% of its energy and colour. Prolonged bleaching causes death. The IPCC projects that at 1.5°C warming, 70-90% of coral reefs will decline; at 2°C, more than 99% will be lost.',
    effect: (p) => { p.m -= 5; p.addFlag('climate_generation'); p.addFlag('reef_loss_generation'); },
    addFlags: ['climate_generation', 'reef_loss_generation'],
    minAge: 10,
    when: (G) => !G.flags.includes('reef_loss_generation'),
  },

  // ── FIRST MASS CLIMATE DISPLACEMENT 2040s ────────────────────────────────
  {
    id: 'climate_mass_displacement_2040s',
    name: 'First Mass Climate Displacement',
    years: [2040, 2048],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'developing_urban'].includes(arch)) {
        return 'The UN estimates 200 million climate-displaced people by the end of the decade. The estimate is in a report. What the report cannot capture is what it looks like at ground level: the families who sold what they had and walked north, the camps outside cities that became cities themselves, the children who have never seen the land their parents describe. The word for these people — climate refugee — is still not in international law. They have no legal standing in the countries they arrived in. They are there anyway.'
      }
      return 'The television shows camps at the borders of your country. Climate refugees — though the law does not call them that. The argument about what to do with them has been going for twenty years. It is still going. The camps are permanent. Children are being born in them who have never been anywhere else.'
    },
    context: 'The World Bank\'s Groundswell report (2021) projected 216 million internal climate migrants by 2050, primarily from Sub-Saharan Africa, South Asia, and Latin America. Climate displacement currently has no dedicated legal framework: the 1951 Refugee Convention does not cover people displaced by climate change, only those fleeing persecution. This legal gap leaves climate-displaced people without international protection, even as displacement numbers rise.',
    effect: (p) => {
      const arch = p._state?.character?.country?.archetype
      if (['subsaharan', 'developing_unstable', 'developing_urban', 'conflict_zone'].includes(arch)) {
        p.m -= 10; p.h -= 4;
      } else {
        p.m -= 6;
      }
      p.addFlag('climate_generation');
    },
    addFlags: ['climate_generation'],
    minAge: 12,
    when: (G) => !G.flags.includes('climate_displacement_witnessed'),
  },

  // ── ARCTIC ICE-FREE SUMMER 2040s ──────────────────────────────────────────
  {
    id: 'arctic_ice_free_2040s',
    name: 'First Ice-Free Arctic Summer',
    years: [2042, 2048],
    archetypes: 'all',
    countries: null,
    narrative: 'The Arctic Ocean is ice-free in summer for the first time in recorded human history — and, scientists say, for the first time in at least three million years. The news is treated as a milestone. Scientists resist the framing of milestone: a milestone implies a journey with a destination, and this is not that kind of journey. This is a door. It opens once.',
    context: 'Sea ice in the Arctic has declined approximately 13% per decade since satellite measurements began in 1979. IPCC models project a first ice-free Arctic summer (defined as sea ice below 1 million km²) to occur before 2050 under high-emissions scenarios and possibly before 2040 under higher scenarios. The loss of sea ice accelerates warming through the ice-albedo feedback: dark ocean water absorbs heat that white ice would have reflected.',
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('climate_generation'); },
    addFlags: ['climate_generation'],
    minAge: 12,
    when: (G) => !G.flags.includes('arctic_witnessed'),
  },

  // ── GULF EXTREME HEAT 2055+ ───────────────────────────────────────────────
  {
    id: 'gulf_extreme_heat_2055',
    name: 'Gulf Region Seasonal Uninhabitability',
    years: [2055, 2065],
    archetypes: null,
    countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
    narrative: 'The summer wet-bulb temperature in the Gulf has crossed the threshold beyond which a human body cannot cool itself outdoors, even in shade, even with water. This is not a heat wave — heat waves end. This is the summer now. The cities were built around air conditioning, which is infrastructure that can be maintained; they were also built around outdoor workers, which is a category of person that can no longer safely work here between June and September. The reconfiguration of what is possible in this climate is underway.',
    context: 'Wet-bulb temperature (a combined measure of heat and humidity) above 35°C is fatal to humans after prolonged outdoor exposure regardless of activity level. IPCC reports project that wet-bulb temperatures above 35°C will become an annual occurrence across the Gulf region by mid-century under high-emissions scenarios. The UAE, Qatar, and Saudi Arabia have already recorded wet-bulb events above 30°C. Outdoor workers — primarily migrant laborers from South Asia — are disproportionately exposed.',
    effect: (p) => { p.h -= 8; p.m -= 10; p.addFlag('heat_stress_generation'); p.addFlag('climate_generation'); },
    addFlags: ['heat_stress_generation', 'climate_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('heat_stress_generation'),
  },

  // ── MALDIVES EVACUATION 2065+ ─────────────────────────────────────────────
  {
    id: 'maldives_evacuation_2065',
    name: 'Maldives National Evacuation',
    years: [2065, 2075],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const country = G.currentCountry?.name || G.character.country.name
      if (['Maldives', 'Tuvalu', 'Kiribati', 'Marshall Islands'].includes(country)) {
        return 'The government has completed the evacuation. The last families have left. There are islands — there will be islands for some years still, above water technically, but inhabited by no one. You carry the coordinates of where your house was. You carry the name of the island in the language that was spoken there. You are somewhere else now, which is called refuge, which is a word that means you are alive and does not mean you are home.'
      }
      return 'The Maldives completes its national evacuation — the first country to be rendered uninhabitable by sea level rise. 500,000 people relocated across several decades to higher ground in India, Sri Lanka, and Australia under climate refugee agreements that took fifteen years to negotiate. The last inhabited island goes underwater during a storm surge in the early 2070s. The government-in-exile continues to exist in international law, which is more than can be said for the land.'
    },
    context: 'The Maldives — an archipelago of 1,200 islands with an average elevation of 1.5 metres above sea level — has been purchasing land in India, Sri Lanka, and Australia as a contingency for national relocation since 2008. At 1.5°C warming, sea level rise of 26-77cm is projected by 2100; storm surges would make the islands uninhabitable well before they are permanently submerged. Kiribati and Tuvalu face similar timelines. This would be the first complete elimination of a nation-state by climate change.',
    effect: (p) => {
      const country = p._state?.currentCountry?.name || p._state?.character?.country?.name
      if (['Maldives', 'Tuvalu', 'Kiribati', 'Marshall Islands'].includes(country)) {
        p.m -= 25; p.h -= 8; p.r += 15; p.addFlag('climate_displaced'); p.setResidency('climate_displaced');
      } else {
        p.m -= 8; p.addFlag('climate_generation');
      }
    },
    addFlags: ['climate_generation'],
    minAge: 5,
    when: (G) => !G.flags.includes('maldives_evacuation_witnessed'),
  },

  // ── VEL D'HIV 1942 — FRENCH PERSPECTIVE ──────────────────────────────────
  {
    id: 'vel_dhiv_1942_france',
    name: 'Vel d\'Hiv Roundup',
    years: [1942, 1942],
    archetypes: null,
    countries: ['France'],
    narrative: 'French police, working from lists, arrest 13,000 Jewish residents of Paris over two days in July. They are held in the Vélodrome d\'Hiver — a bicycle stadium — for five days in summer heat before being transferred to Drancy and from there east. The Nazis had requested 22,000. The French police delivered 13,000 without being asked to explain the shortfall. This was done without German officers present. It was done with French officers, French buses, and French records.',
    context: 'The Vel d\'Hiv roundup (Rafle du Vélodrome d\'Hiver) of 16–17 July 1942 was organised and carried out entirely by the French police under the Vichy government. Of the 13,152 arrested, 4,115 were children. Very few survived the deportation to Auschwitz. France did not officially acknowledge state responsibility until 1995, when President Chirac stated: "France, the land of the Enlightenment and of the Declaration of Rights... France, on that day, committed an irreparable act." The Vel d\'Hiv was demolished in 1959.',
    effect: (p) => { p.m -= 8; p.r += 3; },
    addFlags: [],
    minAge: 8,
    when: (G) => G.character.religion !== 'jewish', // Jewish characters get the deeper character event
  },

  // ── BIAFRA 1967–1970 ──────────────────────────────────────────────────────
  {
    id: 'biafra_war_1967',
    name: 'Biafra War',
    years: [1967, 1970],
    archetypes: null,
    countries: ['Nigeria'],
    narrative: (G) => {
      if (G.ethnicity === 'igbo') {
        return 'Biafra has declared independence. The federal blockade is total — nothing goes in, including food. The photographs reaching the world show children with the distended stomachs of kwashiorkor protein deficiency. The word that is not being used is famine. The word that is also not being used is starvation. One to two million Biafran civilians die before the secession collapses in January 1970. The federal government\'s reconciliation policy is announced as "No victor, no vanquished."'
      }
      return 'The civil war in the east has been running for two years. The photographs coming out — children with swollen stomachs, field hospitals in churches — have reached international newspapers and produced a new kind of response: emergency aid flows from strangers in Europe and America. The secession will not succeed. The question being argued is what the blockade has made of Nigeria\'s claim to unity.'
    },
    context: 'The Nigerian Civil War (1967–70) followed the secession of the Eastern Region as the Republic of Biafra. The federal military government imposed a total blockade. Approximately 1–2 million Biafran civilians died from starvation and disease, making it one of the first televised humanitarian catastrophes and a formative event for the modern NGO movement (the founders of Médecins Sans Frontières were French doctors who served in Biafra). The war ended with federal forces entering Biafra\'s capital on 15 January 1970.',
    effect: (p) => { p.m -= 8; p.h -= 3; },
    addFlags: [],
    minAge: 5,
  },

  // ── BHOPAL 1984 ───────────────────────────────────────────────────────────
  {
    id: 'bhopal_1984',
    name: 'Bhopal Disaster',
    years: [1984, 1985],
    archetypes: null,
    countries: ['India'],
    narrative: (G) => {
      const place = G.place?.name || ''
      if (place === 'Bhopal' || (G.character.country?.name === 'India' && Math.random() < 0.15)) {
        return 'The Union Carbide pesticide plant in Bhopal leaks methyl isocyanate gas at 2am, 3 December. The gas is heavier than air and settles into the low-lying neighbourhoods around the plant. You wake to your eyes burning and your neighbours running without knowing which direction. By morning, 3,000 people are dead within the week. 500,000 are injured. The company\'s CEO flies to India, is briefly arrested, and is released. He flies home. He is never extradited.'
      }
      return 'The Union Carbide pesticide plant in Bhopal, Madhya Pradesh, leaks methyl isocyanate gas on the night of 3 December. 3,000 dead in the immediate aftermath; estimates of total deaths range to 15,000. 500,000 people are exposed. The CEO of Union Carbide, Warren Anderson, is arrested in India, released, and never extradited. The company is eventually acquired; the site remains contaminated. The survivors\' compensation, settled in 1989, averages $550 per person.'
    },
    context: 'The Bhopal disaster is the world\'s worst industrial accident. Union Carbide\'s Bhopal plant had been cutting costs; multiple safety systems were non-functional on the night of the leak. The Indian government accepted a $470 million settlement in 1989 — about $550 per affected person. Clean-up of the site has never been completed; groundwater contamination continues. Warren Anderson, Union Carbide\'s CEO, was declared a fugitive in India but the US government refused extradition requests. He died in 2014, never having faced trial.',
    effect: (p) => { p.m -= 6; p.h -= 2; p.addFlag('industrial_disaster_era'); },
    addFlags: ['industrial_disaster_era'],
    minAge: 5,
  },

  // ── ANGOLA CIVIL WAR 1975–2002 ────────────────────────────────────────────
  {
    id: 'angola_civil_war',
    name: 'Angolan Civil War',
    years: [1975, 1990],
    archetypes: ['subsaharan', 'conflict_zone'],
    countries: null,
    narrative: 'The independence from Portugal that arrives in 1975 is immediately swallowed by a war between the three liberation movements: the MPLA backed by Cuba and the Soviet Union, UNITA backed by the United States and apartheid South Africa. The country is one of Africa\'s largest oil and diamond producers. The revenues fund both sides. Child soldiers, landmines that will kill people for the next fifty years, two million displaced. Twenty-seven years of continuous war in a country no one is looking at.',
    context: 'The Angolan Civil War (1975–2002) was one of the Cold War\'s most destructive proxy conflicts, killing an estimated 500,000 people and displacing 4 million. It was funded on both sides by natural resource revenues — oil for the MPLA, diamonds for UNITA — a pattern that later became the model for analysing "resource curse" conflicts. The war formally ended only with Jonas Savimbi\'s death in 2002. Angola today is one of the world\'s most unequal societies, with oil wealth concentrated in Luanda while much of the country remains extremely poor.',
    effect: (p) => { p.m -= 6; p.h -= 3; p.addFlag('civil_war_lived'); },
    addFlags: [],
    minAge: 0,
    when: (G) => ['developing_unstable', 'conflict_zone', 'subsaharan'].includes(G.character.country?.archetype) &&
      ['Angola', 'Namibia', 'Zambia', 'Zimbabwe', 'DRC', 'Congo'].includes(G.character.country?.name),
  },

  // ── MOZAMBIQUE CIVIL WAR 1977–1992 ────────────────────────────────────────
  {
    id: 'mozambique_civil_war',
    name: 'Mozambique Civil War',
    years: [1977, 1992],
    archetypes: null,
    countries: ['Mozambique'],
    narrative: 'RENAMO, funded first by Rhodesia and then by apartheid South Africa as a destabilisation strategy, has been fighting FRELIMO\'s Marxist government since independence. One million dead. Five million displaced. The war has no clear front lines — it is present in villages, in roads, in schools burned and teachers targeted. Mozambique is one of the poorest countries on earth being deliberately made more so by its neighbour\'s government.',
    context: 'The Mozambican Civil War (1977–1992) was primarily a Cold War proxy conflict in which apartheid South Africa funded and directed RENAMO to destabilise its Marxist neighbour. RENAMO\'s tactics specifically targeted civilian infrastructure — schools, health clinics, and transport routes — as a deliberate strategy. By the war\'s end, two-thirds of the country\'s schools and half its health clinics had been destroyed. The Rome General Peace Accords ended the conflict in 1992, and the first multi-party elections in 1994 were the first free elections in Mozambican history.',
    effect: (p) => { p.m -= 8; p.h -= 4; p.addFlag('civil_war_lived'); },
    addFlags: [],
    minAge: 0,
  },

  // ── CLIMATE TIPPING POINT 2045–2050 ──────────────────────────────────────
  {
    id: 'climate_tipping_point_2045',
    name: 'Climate Tipping Point Confirmed',
    years: [2046, 2053],
    archetypes: 'all',
    countries: null,
    narrative: (G) => {
      const arch = G.character.country.archetype
      if (['wealthy_west', 'wealthy_east'].includes(arch)) {
        return 'Scientists confirm that the West Antarctic Ice Sheet has entered an irreversible collapse. The process will take centuries, but it has begun and it cannot now be stopped. Sea level rise of one to three metres is now locked in regardless of what happens to emissions from this point. The news arrives on a Tuesday. People discuss it and go back to what they were doing. This is perhaps the most important thing that has happened in human history and it is received like weather.'
      }
      return 'Scientists say a tipping point has been crossed. The ice sheet that is collapsing will add a metre to the ocean over the next few centuries. The countries that will be underwater are, in the main, not the countries that emitted the carbon. The scientists are careful about language. The implication of what they are saying is not careful at all.'
    },
    context: 'Climate tipping points are thresholds beyond which changes become self-reinforcing and irreversible. Key tipping points include: West Antarctic Ice Sheet collapse (triggered at approximately 1.5°C), Greenland Ice Sheet collapse (triggered at 1.5-2°C), Amazon rainforest dieback, and permafrost carbon release. A 2022 Science study found that four of nine major tipping points may already have been triggered at current temperature levels (~1.2°C above pre-industrial). Each tipping point can trigger others in a cascade.',
    effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('climate_generation'); p.addFlag('tipping_point_generation'); },
    addFlags: ['climate_generation', 'tipping_point_generation'],
    minAge: 12,
    when: (G) => !G.flags.includes('tipping_point_generation'),
  },

  // ── WOMEN'S LIBERATION MARCH 1970 ─────────────────────────────────────────
  {
    id: 'womens_liberation_march_1970',
    name: "Women's Liberation March",
    years: [1970, 1972],
    archetypes: ['wealthy_west'],
    countries: null,
    narrative: (G) => {
      if (G.character.gender === 'female') {
        return 'Fifty thousand women march down Fifth Avenue in New York. Similar marches happen in London and Paris the same week. The demands are concrete: equal pay, childcare, abortion rights. The energy in the streets is different from anything you have seen — not grief or anger exactly but a kind of collective recognition, the specific feeling of a thing finally being named.'
      }
      return 'Fifty thousand women march down Fifth Avenue in New York. You watch the news footage or read the coverage. Something is shifting in how the question is being asked — not whether women deserve equality but when and by what means. The answer to the first question is no longer in dispute in the room you grew up in. The second question is being answered in the streets.'
    },
    context: "The 1970 Women's Strike for Equality, organized by Betty Friedan and NOW, marked the 50th anniversary of women's suffrage. It was the largest women's rights demonstration in US history at that point. The strike called for free abortion on demand, free childcare, and equal opportunity in employment and education. Similar marches occurred in London and Paris. These events marked the peak of second-wave feminism's public visibility and directly preceded landmark legislation: the Equal Rights Amendment passed Congress in 1972, Title IX passed in 1972, and Roe v. Wade was decided in 1973.",
    effect: (p) => {
      if (p._state?.character?.gender === 'female') {
        p.m += 8
        p.addFlag('liberation_generation')
      } else {
        p.m += 3
      }
    },
    addFlags: [],
    minAge: 14,
    when: (G) => !G.flags.includes('liberation_generation'),
  },

  // ── AFGHANISTAN GIRLS' SCHOOL BAN 2022 ────────────────────────────────────
  {
    id: 'afghanistan_girls_school_ban_2022',
    name: "Taliban Bans Girls from Secondary School",
    years: [2022, 2025],
    archetypes: null,
    countries: ['Afghanistan'],
    narrative: (G) => {
      if (G.character.gender === 'female' && G.age >= 12 && G.age <= 21) {
        return 'The decree arrives without warning. Secondary schools for girls are closed. University is closed. The books are still in your bag. There is no explanation that makes sense as an explanation, only as an assertion of a particular kind of power over a particular kind of person. You understand this completely. Understanding it does not make it less total.'
      }
      if (G.character.gender === 'female') {
        return 'The decree closes secondary schools and universities to girls and women. You are past the age of being directly affected. The girls in your family, your neighbourhood, the daughters of everyone you know — they are not.'
      }
      return 'Secondary schools and universities are closed to women and girls, effective immediately. In the city you know, this means half the students in every classroom are no longer permitted to be there. The international community issues statements. The schools remain closed.'
    },
    context: 'In March 2022, the Taliban reversed a brief reopening of secondary schools for girls, closing them again hours after students arrived. In December 2022, they banned women from universities. By 2023, Afghanistan was the only country in the world to formally prohibit women from attending secondary school. An estimated 2.5 million Afghan girls were denied access to education. The ban has been condemned by the United Nations, Islamic scholars internationally, and the Organisation of Islamic Cooperation, but remained in place as of 2025.',
    effect: (p) => {
      if (p._state?.character?.gender === 'female') {
        p.m -= 15
        p.r += 8
        p.addFlag('education_denied_gender')
      } else {
        p.m -= 6
        p.r += 3
      }
    },
    addFlags: [],
    minAge: 10,
    when: null,
  },

  // ── JESSE OWENS: BERLIN 1936 ─────────────────────────────────────────────
  {
    id: 'jesse_owens_berlin_1936',
    name: 'Jesse Owens Wins Four Gold Medals in Berlin',
    years: [1936, 1937],
    archetypes: null,
    countries: ['United States'],
    narrative: (G) => {
      const isBlack = G.ethnicity && G.ethnicity.toLowerCase().includes('black')
      if (isBlack) {
        return 'Four gold medals. Sprint, long jump, relays. In Berlin, in front of the regime that has built an entire political philosophy around racial hierarchy, a Black man from Cleveland is the fastest and longest of them all. The radio brings it back to you in a country where you cannot eat at the same counter as the people celebrating beside you. You hold both things at once. The pride is real. The irony is also real. When Owens returns home, the President does not invite him to the White House.'
      }
      return 'Jesse Owens wins four gold medals at the Berlin Olympics — 100m, 200m, long jump, and 4×100 relay. Hitler, who staged the Games as a showcase for Aryan supremacy, watches from the stands. The result is a specific kind of refutation. Back home, in a country with Jim Crow laws, Owens is not invited to the White House reception held for the Olympic team. Owens later says: "Hitler didn\'t snub me — it was FDR who snubbed me."'
    },
    context: 'Jesse Owens, son of an Alabama sharecropper, won four gold medals at the 1936 Berlin Olympics — the most by any athlete at those Games. When Owens returned to the United States, President Franklin Roosevelt sent no congratulations telegram and excluded Owens from the White House reception for the American Olympic team. Jim Crow laws remained in force across the American South. The narrative of Hitler snubbing Owens (which has some basis in a missing handshake) long obscured the more significant American government snub. Owens himself raised this contrast repeatedly.',
    effect: (p) => {
      const isBlack = p._state?.character?.ethnicity?.toLowerCase().includes('black')
      if (isBlack) {
        p.m += 10
        p.karma += 5
        p.addFlag('civil_rights_generation')
      } else {
        p.m += 4
      }
    },
    addFlags: [],
    minAge: 5,
    when: null,
  },

  // ── BHOLA CYCLONE 1970 ───────────────────────────────────────────────────
  {
    id: 'bhola_cyclone_1970',
    name: 'Bhola Cyclone',
    years: [1970, 1971],
    archetypes: null,
    countries: ['Bangladesh'],
    narrative: (G) => {
      if (G.age <= 12) {
        return 'The storm comes at night. The adults move the family to higher ground — the school building, the raised road — before the water follows. In the morning the water is still moving in directions it should not move. The count of what was lost takes longer than the water takes to recede. You are too young to understand the number. The adults understand it.'
      }
      return 'The cyclone comes in from the Bay of Bengal on the night of November 12. The storm surge reaches six metres in the delta. The Pakistani government\'s response, when it comes, comes slowly — the supplies, the personnel, the acknowledgment. The death toll will be estimated at between 300,000 and 500,000. It is one of the deadliest natural disasters in recorded history. The government\'s inadequacy is noticed, and not forgotten.'
    },
    context: 'The Bhola Cyclone struck East Pakistan (now Bangladesh) on 12 November 1970, killing an estimated 300,000–500,000 people — the deadliest tropical cyclone on record. The Pakistani central government\'s delayed and inadequate disaster response was a major factor in turning East Pakistani political discontent into a movement for independence. The Awami League\'s landslide election victory in December 1970 followed directly, leading to the Pakistani military crackdown and the 1971 Liberation War.',
    effect: (p) => {
      p.m -= 15
      p.h -= 8
      p.r += 6
      p.addFlag('bhola_survivor')
    },
    addFlags: ['bhola_survivor'],
    minAge: 0,
    when: null,
  },

  // ── TANGSHAN EARTHQUAKE 1976 ─────────────────────────────────────────────
  {
    id: 'tangshan_earthquake_1976',
    name: 'Tangshan Earthquake',
    years: [1976, 1977],
    archetypes: null,
    countries: ['China'],
    narrative: (G) => {
      if (G.age <= 10) {
        return 'The ground moves before the sound arrives — or the sound and the movement are the same thing. It lasts for seconds. What took years to build is not there anymore. Adults make decisions quickly, in the dark, without full information. You are held and moved. Later you will learn the number of dead. For now you only know what your street looks like now compared to yesterday.'
      }
      return 'The earthquake strikes at 3:42 in the morning, when the city is asleep. The city of one million is built on alluvial sediment that amplifies the shaking. Most of the buildings are unreinforced brick. They do not survive. 242,000 dead — the official figure. Other estimates are higher. The Chinese government initially refuses all foreign assistance, a political decision made in the middle of a humanitarian catastrophe. Rescue comes from within: soldiers arrive overland because roads are gone, and begin to dig.'
    },
    context: 'The 1976 Tangshan earthquake measured 7.6 magnitude and killed at least 242,000 people — possibly over 650,000 by some estimates, though official figures were not released until 1979. It struck at 3:42am, when residents were asleep. Tangshan, an industrial coal-mining city, was built primarily of unreinforced brick. The Mao-era government initially refused international aid and suppressed reporting on the scale of the disaster. Rescue was conducted almost entirely by the People\'s Liberation Army. The earthquake occurred during the politically chaotic final months of the Cultural Revolution, weeks after the death of Premier Zhou Enlai and months before Mao Zedong\'s own death.',
    effect: (p) => {
      p.m -= 18
      p.h -= 10
      p.r += 5
      p.addFlag('tangshan_witness')
    },
    addFlags: ['tangshan_witness'],
    minAge: 0,
    maxAge: null,
    when: null,
  },

  // ── WEST INDIES CRICKET 1975–1979 ────────────────────────────────────────
  {
    id: 'west_indies_cricket_1975',
    name: 'West Indies Win the Cricket World Cup',
    years: [1975, 1980],
    archetypes: null,
    countries: ['India', 'Pakistan', 'Sri Lanka', 'Bangladesh', 'South Africa', 'Zimbabwe', 'Kenya', 'Australia', 'New Zealand', 'United Kingdom'],
    narrative: (G) => {
      const cn = G.character.country.name
      if (['India', 'Pakistan', 'Sri Lanka', 'Bangladesh'].includes(cn)) {
        return 'The West Indies team wins the first World Cup and then the second. Clive Lloyd\'s team plays with a physical intensity that redefines what the game can be. For cricket countries that grew up under the same colonial arrangement, the victories carry something beyond sport — a post-colonial statement made in the language that was supposed to belong to the people who no longer control the game.'
      }
      if (['South Africa'].includes(cn)) {
        return 'West Indies win the World Cup while South Africa is banned from international cricket because of apartheid. The irony is not lost on everyone — a team of Black West Indian cricketers wins the world championship while the country that enforced racial hierarchy in sport cannot participate. South African cricket does not allow Black South Africans to represent the country at any level.'
      }
      if (['Australia', 'New Zealand'].includes(cn)) {
        return 'West Indies win the World Cup and then defend it. The team Clive Lloyd assembles — Richards, Roberts, Holding, Garner, Marshall — is the most dominant side the game has seen. The speed of the bowling. The certainty of the batting. Australia does not win either tournament, which is noticed.'
      }
      return 'The West Indies win. The team from the Caribbean, drawn from islands where cricket was a gift of the British Empire, has become the best team on earth. The empire\'s game now belongs to someone else.'
    },
    context: 'The West Indies won the first two Cricket World Cups (1975 and 1979), both held in England. The team captained by Clive Lloyd and featuring Vivian Richards, Michael Holding, Andy Roberts, and Gordon Greenidge dominated world cricket through the late 1970s and 1980s. Their success was widely understood as a post-colonial cultural statement. South Africa was banned from international cricket from 1970 to 1991 due to apartheid. The World Cup victories contributed to cricket\'s cultural transformation from a British imperial institution into a genuinely international sport.',
    effect: (p) => {
      p.m += 6
      p.karma += 4
      p.addFlag('cricket_generation')
    },
    addFlags: ['cricket_generation'],
    minAge: 8,
    when: (G) => !G.flags.includes('cricket_generation'),
  },

  // ── OLYMPIC BOYCOTT 1980 ─────────────────────────────────────────────────
  {
    id: 'olympics_boycott_1980',
    name: 'Olympics Boycott',
    years: [1980, 1985],
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    narrative: (G) => {
      const yr = G.currentYear
      if (yr <= 1981) {
        return '65 countries do not go to the Moscow Olympics. The USA boycott, in response to the Soviet invasion of Afghanistan, takes their athletes with it. The athletes who spent four years preparing for this have their preparation rendered irrelevant by a diplomatic decision that neither side believes will change anything. The Soviet Union invades Afghanistan regardless. The athletes train anyway, for the 1984 Games, which the Soviet bloc then boycotts in return. Both boycotts accomplish nothing except the cancellation of four years of human effort.'
      }
      return 'The 1984 Los Angeles Games proceed without the Soviet bloc. 14 countries stay away, mirroring the 1980 Western boycott. The cycle ends. The athletes compete. No political outcome of either boycott is ever identified.'
    },
    context: 'The 1980 Moscow Olympics were boycotted by 65 countries led by the United States, in response to the Soviet invasion of Afghanistan. US President Jimmy Carter initially threatened athletes who defied the boycott with passport revocation. Many athletes who had spent years preparing did not compete. In 1984, the Soviet Union and 13 allies boycotted the Los Angeles Olympics, officially citing security concerns but widely understood as retaliation. Neither boycott had any measurable effect on the political situations that prompted them.',
    effect: (p) => { p.r += 4; p.m -= 3 },
    addFlags: [],
    minAge: 14,
    when: (G) => !G.flags.includes('olympics_boycott_felt'),
  },

  {
    id: 'algeria_black_decade_begins',
    name: 'Algeria: The Cancelled Election',
    years: [1992, 1993],
    archetypes: null,
    countries: ['Algeria'],
    narrative: 'On 11 January 1992, Algeria\'s military cancels the second round of legislative elections. The Front Islamique du Salut had won 188 seats in the first round and was on course for a parliamentary supermajority. President Chadli Bendjedid resigns. A High State Committee takes power. Within months, a state of emergency is declared and the FIS is banned. What follows will be called the *décennie noire* — the Black Decade. 200,000 dead over ten years, in a country of 26 million. The army, the GIA, and eventually splinter groups will all carry out killings. Some massacres are never officially attributed. The deliberate confusion is part of the architecture.',
    context: 'The 1991–92 Algerian electoral crisis began after the Islamic Salvation Front (FIS) won 47% of the vote in the first round of legislative elections, pointing toward a two-thirds parliamentary majority. The military stepped in, cancelling the second round and arresting FIS leadership, triggering an armed insurgency. The décennie noire lasted from 1992 to 2002 and killed an estimated 150,000–200,000 people. Both the GIA (Groupe Islamique Armé) and the DRS (military intelligence) were accused of atrocities; several major massacres — including Rais (August 1997, ~300 dead) and Bentalha (September 1997, ~400 dead) — remain without official attribution. President Bouteflika\'s 1999 Civil Concord offered amnesty to surrendering fighters but no accountability process.',
    effect: (p) => { p.m -= 12; p.addFlag('decennie_noire_generation'); },
    addFlags: ['decennie_noire_generation'],
    minAge: 10,
    maxAge: null,
    when: null,
  },

  {
    id: 'anfal_campaign_1988',
    name: 'The Anfal Campaign: Halabja',
    years: [1988, 1989],
    archetypes: null,
    countries: ['Iraq'],
    narrative: 'On 16 March 1988, Iraqi aircraft drop mustard gas and nerve agents on the town of Halabja. Five thousand people die within hours. Tens of thousands more will die in the months that follow as the Anfal campaign moves through Kurdish villages and valleys — helicopters, chemical weapons, mass executions at ravines in the desert. The Iraqi government calls it a military operation against traitors who collaborated with Iran. The word genocide will be applied later, in retrospect, by people who were not there. The people who were there did not need a word for it.',
    context: 'The Anfal campaign was an Iraqi government military offensive against Kurdish populations in northern Iraq carried out by the Ba\'athist regime from February to September 1988. Named after a Quranic verse concerning war spoils, it involved chemical weapons attacks (including the Halabja massacre on 16 March 1988), mass executions, and the forced displacement of 500,000–1,000,000 people. Estimates of the death toll range from 50,000 to 182,000. The campaign was ordered by Saddam Hussein and personally supervised by his cousin Ali Hassan al-Majid (known as "Chemical Ali"). In 2006, an Iraqi tribunal found the campaign constituted genocide.',
    effect: (p) => { p.m -= 20; p.h -= 5; p.addFlag('anfal_generation'); },
    addFlags: ['anfal_generation'],
    minAge: 5,
    maxAge: null,
    when: (G) => G.character.ethnicity === 'kurdish_iraq' || G.character.ethnicity === 'kurdish',
  },

  {
    id: 'algeria_black_decade_begins',
    name: 'Algeria: The Cancelled Election',
    years: [1992, 1993],
    archetypes: null,
    countries: ['Algeria'],
    narrative: 'On 11 January 1992, Algeria\'s military cancels the second round of legislative elections. The Front Islamique du Salut had won 188 seats in the first round and was on course for a parliamentary supermajority. President Chadli Bendjedid resigns. A High State Committee takes power. Within months, a state of emergency is declared and the FIS is banned. What follows will be called the *décennie noire* — the Black Decade. 200,000 dead over ten years, in a country of 26 million. The army, the GIA, and eventually splinter groups will all carry out killings. Some massacres are never officially attributed. The deliberate confusion is part of the architecture.',
    context: 'The 1991–92 Algerian electoral crisis began after the Islamic Salvation Front (FIS) won 47% of the vote in the first round of legislative elections, pointing toward a two-thirds parliamentary majority. The military stepped in, cancelling the second round and arresting FIS leadership, triggering an armed insurgency. The décennie noire lasted from 1992 to 2002 and killed an estimated 150,000–200,000 people. Both the GIA (Groupe Islamique Armé) and the DRS (military intelligence) were accused of atrocities; several major massacres — including Rais (August 1997, ~300 dead) and Bentalha (September 1997, ~400 dead) — remain without official attribution. President Bouteflika\'s 1999 Civil Concord offered amnesty to surrendering fighters but no accountability process.',
    effect: (p) => { p.m -= 12; p.addFlag('decennie_noire_generation'); },
    addFlags: ['decennie_noire_generation'],
    minAge: 10,
    maxAge: null,
    when: null,
  },

  {
    id: 'beirut_port_explosion_2020',
    name: 'Beirut Port Explosion',
    years: [2020, 2021],
    archetypes: null,
    countries: ['Lebanon'],
    narrative: 'The explosion at the port takes seconds. The shockwave moves through the city at the speed of sound. Windows shatter across West Beirut — not in one building but in every building facing the water, simultaneously. You feel it before you understand it. The warehouse held 2,750 tonnes of ammonium nitrate, confiscated in 2014 and stored without safety measures for six years because every official who knew looked at the paperwork and decided it was someone else\'s problem. 218 dead. 6,500 injured. 300,000 displaced. The grain silos that absorbed some of the blast — grain that the country now cannot replace. The government that stored the material will not resign. Several ministers announce investigations into themselves.',
    context: '4 August 2020. The explosion at Beirut\'s port was one of the largest non-nuclear explosions in history, equivalent to a 3.5-magnitude earthquake and felt in Cyprus 240km away. 2,750 tonnes of ammonium nitrate had been stored in Hangar 12 since 2013 after being confiscated from an abandoned cargo ship. Lebanese customs, judiciary, and security services had all been alerted to the danger over the years; none acted. The explosion destroyed the grain silos that held Lebanon\'s strategic food reserve. The Beirut port blast killed 218 people confirmed, left 300,000 homeless, and caused $15 billion in damage — in an economy that was already collapsing.',
    effect: (p) => { p.m -= 20; p.h -= 10; p.addFlag('beirut_blast_survived'); },
    addFlags: ['beirut_blast_survived'],
    minAge: 0,
    maxAge: null,
    when: null,
  },

]
