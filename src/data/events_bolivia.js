// Bolivia arc events
// The country with more coups than years of independence (36 by 1970); the only landlocked
// nation in the Americas without access to the sea it lost in 1884.
// Key arcs: Potosí/Oruro mining economy, 1952 revolution land reform, Banzer dictatorship
// 1971–78, hyperinflation 1984–85 (24,000%), coca/eradication conflict, Gas War 2003,
// Evo Morales 2005 (first indigenous president), 2019 resignation controversy.

const IS_BOL = (G) => G.character.country?.name === 'Bolivia'

export const BOLIVIA_EVENTS = [

  {
    id: 'bol_mining_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.bolMining,
    text: 'You grow up in a mining town — Potosí or Oruro, where the mountain and the smelter define the smell of the air. The Cerro Rico above Potosí has been hollowing out since 1545; eight million people died in those tunnels in the colonial period, and the mountain still stands and still employs half the men you know. The dust comes home in the lungs of the fathers. The children learn early which cough is the normal cough and which one is something else.',
    choices: null,
    effect: (p) => { p.h -= 4; p.e += 3; p.addFlag('bol_mining_generation'); p.setMem('bolMining', true) },
  },

  {
    id: 'bol_1952_revolution_echo',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.bol1952,
    text: 'The 1952 revolution is recent enough that your grandparents remember it as a specific day. The MNR, Paz Estenssoro, the miners marching on La Paz in April: the haciendas broken up, the tin mines nationalized, the indigenous people given the vote for the first time. Your family\'s place in this story depends on which side of the land question they were on.',
    choices: [
      {
        text: 'Your family received land from the reform',
        tag: 'beneficiary',
        outcome: 'Your grandfather still has the document. It is kept in a plastic sleeve in a wooden box. He takes it out sometimes.',
        effect: (p) => { p.m += 6; p.addFlag('bol_1952_beneficiary'); p.setMem('bol1952', true) },
      },
      {
        text: 'Your family lost property in the reform',
        tag: 'dispossessed',
        outcome: 'The story is told with a specific bitterness that never fully resolves. The land was the family and the family is the land and now neither is what it was.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('bol_1952_dispossessed'); p.setMem('bol1952', true) },
      },
    ],
  },

  {
    id: 'bol_banzer_era',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 1971 && G.currentYear <= 1978 &&
      G.age >= 16 &&
      !G.mem?.bolBanzer,
    text: 'General Banzer\'s government has a preferred vocabulary for opposition: comunista, subversivo, agitador. The student federations are shut down. Union leaders are exiled or disappear quietly into detention centres. The economy is growing — foreign loans, cotton and sugar exports, the Bolivian economic miracle that the regime discusses in press conferences — and the question is how much the growth matters if the people who might say otherwise cannot say otherwise.',
    choices: [
      {
        text: 'Keep your head down. The regime has a reach you cannot measure.',
        tag: 'silent',
        outcome: 'You are careful about what you say and to whom. The habit of care takes years to leave after the regime does.',
        effect: (p) => { p.addFlag('bol_banzer_era_youth'); p.addFlag('regime_self_censorship'); p.setMem('bolBanzer', true) },
      },
      {
        text: 'Join the network of people who have decided the regime needs opposition.',
        tag: 'active',
        outcome: 'The network is small and careful and the meetings are in people\'s kitchens. Three people you know are detained. You are not. This is luck, not safety.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('bol_banzer_era_youth'); p.addFlag('political_active'); p.setMem('bolBanzer', true) },
      },
    ],
  },

  {
    id: 'bol_hyperinflation_1985',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      G.age >= 16 &&
      !G.mem?.bolHyper,
    text: 'The annual inflation rate reaches twenty-four thousand percent. The price of bread changes between when you walk into the market and when you reach the front of the queue. Wages are paid in the morning because by the afternoon the money is worth significantly less. The government prints new denominations. The old ones are bundled in newspaper because carrying them in a wallet is impractical. People with dollars or assets survive this differently than people without. The economist Jeffrey Sachs will later call the stabilisation a success story. You will remember it as the year you stopped being able to plan anything more than a week ahead.',
    choices: null,
    effect: (p) => { p.m -= 15; p.mo -= Math.round((p._state?.money ?? 0) * 0.4); p.r += 6; p.addFlag('bol_hyperinflation_survived'); p.setMem('bolHyper', true) },
  },

  {
    id: 'bol_coca_eradication',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2003 &&
      G.age >= 25 &&
      !G.mem?.bolCoca,
    text: 'The United States is funding eradication in the Chapare: the humid lowland farms where most of Bolivia\'s coca comes from. The government calls it a development programme; the cocaleros call it a war. The coca leaf is not cocaine — it is what the miners chew to work at altitude, what goes into the tea that keeps you warm in La Paz, what is offered to Pachamama at the beginning of any serious undertaking. The coca leaf becoming narcotics in Miami is a long chain with many hands in it, and the part of the chain that gets bulldozed is here, at the farm.',
    choices: [
      {
        text: 'Your family grows coca — this eradication is happening to you personally',
        tag: 'cocalero',
        outcome: 'The army arrived with the bulldozers. What took years to cultivate is gone in an afternoon. The restitution offered does not cover what was lost. Evo Morales, the cocalero union leader, will become president in twelve years.',
        effect: (p) => { p.m -= 12; p.w -= 5; p.mo -= 500; p.addFlag('bol_coca_grower'); p.addFlag('bol_eradication_victim'); p.setMem('bolCoca', true) },
      },
      {
        text: 'You are from the city — this is something you watch, not something that happens to you',
        tag: 'observer',
        outcome: 'The news shows the helicopters and the burned fields. The people being pushed out of their farms look familiar. You understand the argument being made about development. You understand the argument on the other side too.',
        effect: (p) => { p.m -= 4; p.e += 3; p.addFlag('bol_coca_generation'); p.setMem('bolCoca', true) },
      },
    ],
  },

  {
    id: 'bol_gas_war_2003',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2004 &&
      G.age >= 20 &&
      !G.mem?.bolGas,
    text: 'The government wants to export Bolivian natural gas — the second-largest reserves in South America — through a pipeline via Chile to a port in Pacific waters that were Bolivian until 1884. El Alto, the Aymara city above La Paz at four thousand metres, blocks the highways. The roadblocks spread. The army fires into crowds in the neighbourhood of Warisata. Sixty-seven people die in what the newspaper will call the Gas War. President Sánchez de Lozada flees to Miami. The gas stays under Bolivian soil.',
    choices: [
      {
        text: 'Join the blockade — the gas belongs to Bolivia, not to foreign companies',
        tag: 'blockade',
        outcome: 'The highland is cold at four thousand metres. You are there for four days. When Goni flies out you walk back down. Something feels, briefly, like it has worked.',
        effect: (p) => { p.m += 8; p.karma += 8; p.h -= 4; p.addFlag('bol_gas_war_generation'); p.addFlag('political_active'); p.setMem('bolGas', true) },
      },
      {
        text: 'Watch from the city — this is a rupture you are not sure you understand yet',
        tag: 'watched',
        outcome: 'The television coverage is continuous. The helicopter shots of El Alto show a city you thought you knew from a distance. What was happening in Warisata while the helicopters flew is reported after.',
        effect: (p) => { p.m -= 4; p.e += 4; p.addFlag('bol_gas_war_generation'); p.setMem('bolGas', true) },
      },
    ],
  },

  {
    id: 'bol_evo_election_2005',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2006 &&
      G.age >= 18 &&
      !G.mem?.bolEvo,
    text: 'Evo Morales wins with fifty-four percent of the vote — the first outright majority in Bolivian electoral history. An Aymara cocalero from the Chapare. He will be the first indigenous president of a country where sixty-two percent of the population identifies as indigenous. The colonial period in Bolivia ended officially in 1825. The government building in Plaza Murillo is still the government building. The question of what changes and what does not will take years to answer.',
    choices: [
      {
        text: 'This is the largest political shift in Bolivian history since 1952 — it matters',
        tag: 'affirmed',
        outcome: 'You voted for Morales, or you watched the results come in and felt what it means when a face in the Palacio de Gobierno finally looks like the face in the market. It has happened.',
        effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('bol_evo_generation'); p.setMem('bolEvo', true) },
      },
      {
        text: 'The election matters but the economy, the institutions, the extraction relationships remain unchanged',
        tag: 'skeptical',
        outcome: 'You watch the celebrations with a specific feeling that is not the opposite of hope. More like: the memory of what hope has previously turned into in this country.',
        effect: (p) => { p.m += 3; p.e += 4; p.addFlag('bol_evo_generation'); p.setMem('bolEvo', true) },
      },
    ],
  },

  {
    id: 'bol_2019_crisis',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.bol2019,
    text: 'The election count stops on the night of October 20. When it resumes, Morales\'s lead has increased past the ten-point threshold for a first-round win. The OAS releases a preliminary report citing irregularities. Protests begin in the cities and the countryside simultaneously. The military requests Morales\'s resignation on November 10. He flies to Mexico. Whether this is a coup against a democratically elected president or the correct response to electoral fraud is a question Bolivians are still not answering the same way.',
    choices: [
      {
        text: 'The institutions acted correctly — the fraud was real',
        tag: 'fraud',
        outcome: 'Later analysis will question the OAS methodology. The question will not resolve cleanly. You have chosen a position and the evidence will never let you hold it without qualification.',
        effect: (p) => { p.r += 4; p.addFlag('bol_2019_fraud_believed'); p.setMem('bol2019', true) },
      },
      {
        text: 'The military ousting an elected president is a coup — the process matters',
        tag: 'coup',
        outcome: 'Jeanine Áñez takes power. The MAS wins the 2020 election. The question of what happened in 2019 will not resolve cleanly. You have chosen a position and the evidence will never let you hold it without qualification.',
        effect: (p) => { p.r += 4; p.addFlag('bol_2019_coup_accepted'); p.setMem('bol2019', true) },
      },
    ],
  },

  {
    id: 'bol_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_BOL(G) &&
      G.age >= 65 &&
      !G.mem?.bolLate,
    text: 'You have lived through more governments than most people live through decades. The coups that happened before you were born and the one disputed in 2019 are part of the same story about who gets to govern Bolivia and what that governance is for. The country has gas and silver and lithium and has been stripped of each in succession. What the future holds for the lithium the electric car market is building around is a question that will outlast you. You are part of the long argument the country is having with itself, which has not ended and probably will not.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 5; p.r -= 5; p.setMem('bolLate', true) },
  },

]
