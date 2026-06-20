// Colombia arc events
//
// Colombia's long arc of political violence and survival:
//  — El Bogotazo, April 9 1948: Liberal leader Jorge Eliécer Gaitán shot in downtown
//    Bogotá. The city burns for three days. La Violencia begins: 200,000 killed
//    1948–1958, mostly rural peasants, mostly along Liberal/Conservative party lines.
//    Family memory of which side your village was on persists for generations.
//  — The guerrillas: FARC founded 1964 (rural communist), ELN 1964 (urban left/
//    liberation theology), M-19 1970 (urban, theatrical). The mountains fill with
//    armed organizations. Kidnapping for ransom becomes an industry.
//  — Medellín cartel: Pablo Escobar at peak controls 80% of the world's cocaine
//    supply. Car bombs in Bogotá. Narco-terrorism: judges, politicians, police
//    assassinated. "Plata o plomo" — silver or lead — the offer to institutions.
//    Escobar killed on a rooftop December 2, 1993.
//  — Paramilitaries: AUC (United Self-Defense Forces) 1997–2003. Massacres of
//    villages suspected of guerrilla sympathy. Paramilitary and FARC territories
//    divide the map. The state is present in cities; the countryside is divided.
//  — Internal displacement: 7 million Colombians displaced — second only to Syria.
//    They arrive in city peripheries, build informal settlements, become the
//    population that absorbs every urban shock.
//  — Estratificación: official 1–6 class classification printed on every utility
//    bill. Estrato 1–3 pays subsidised rates; estrato 5–6 pays a surcharge.
//    Everyone knows what your estrato says about where you live.
//  — Santos peace accord 2016: 52-year war ends. Santos wins Nobel Peace Prize.
//    The referendum fails ("No" wins by 0.4%). Congress ratifies it anyway.
//    Demobilization of 13,000 FARC fighters. The FARC becomes a political party.
//  — 2021 Paro Nacional: tax reform, COVID unemployment, police violence.
//    46 days of blockades, tear gas, over 80 people killed. The protest ends without
//    the reform passing but with the government walking it back.

const COLOMBIA_EVENTS = [

  // ── EL BOGOTAZO AND LA VIOLENCIA ──────────────────────────────────────────────

  {
    id: 'col_bogotazo',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1948 && G.currentYear <= 1955 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.col_bogotazo,
    text: 'April 9, 1948. Jorge Eliécer Gaitán was shot outside his law office in the capital at noon. By afternoon the city was burning — buses overturned, the Palace of Justice stormed, the radio broadcasting the news that the poor had believed in shot on a sidewalk. Your family explains what it means in the language of which side your village is on. You understand that the word Liberal or Conservative is now the word for whether people who were neighbors will become enemies.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('col_bogotazo_generation'); p.setMem('col_bogotazo', true); },
  },

  {
    id: 'col_la_violencia_rural',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1950 && G.currentYear <= 1960 &&
      G.ruralUrban === 'rural' &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.col_violencia,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1954
        ? 'The men came from the next valley. The family of the wrong party colors — your family, or theirs — left before dawn or did not leave in time. Your parents do not say how many dead because the number is too large for children and also because some of the dead are people whose killers live nearby. La Violencia is the name for it, as though naming it something general makes the specific thing more manageable. It does not.'
        : 'The formal war ended in 1953 when Rojas Pinilla took power and declared an amnesty. In the hills the amnesty is a word from the city. The violence in your valley has not read the proclamation. What is being called the end of La Violencia is still going on where you live.'
    },
    choices: [
      {
        text: 'Your family moves to the city. The displacement is called survival.',
        tag: null,
        outcome: 'You arrive in Bogotá or Medellín or Cali to a periphery that is filling with families from every valley. The city is not what it was last decade. You are part of why.',
        effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('col_violencia_generation'); p.addFlag('col_desplazado'); p.addFlag('displaced'); p.setMem('col_violencia', true); },
      },
      {
        text: 'You stay. The land belongs to your family. Leaving would mean giving it to them.',
        tag: null,
        outcome: 'The land is held. What holding it costs in the subsequent decade is the full cost of having stayed.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('col_violencia_generation'); p.setMem('col_violencia', true); },
      },
    ],
    effect: null,
  },

  // ── THE GUERRILLA ERA ─────────────────────────────────────────────────────────

  {
    id: 'col_farc_question',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 && G.age <= 28 &&
      !G.mem?.col_farc,
    text: 'The guerrillas control the road after dark. The FARC tax the cattle farmers and the coca growers and call it a war contribution. They have a hospital in the mountains where the state has none. They also disappear people who inform. In your region the choice is not between guerrilla and government — the government is not here. The choice is between being seen to cooperate and being seen not to. Both have consequences. You navigate the road at night with specific knowledge of which headlights mean what.',
    choices: [
      {
        text: 'You keep your head down and give nothing to either side.',
        tag: null,
        outcome: 'Neutrality in a contested territory is its own position, and positions attract attention. You manage the attention with care.',
        effect: (p) => { p.r += 8; p.addFlag('col_farc_era'); p.setMem('col_farc', true); },
      },
      {
        text: 'You move to the city. The territory is not safe for someone who will not choose.',
        tag: null,
        outcome: 'The city receives you as it has received everyone from the contested territories: with limited interest in the story of how you got here.',
        effect: (p) => { p.m -= 8; p.addFlag('col_farc_era'); p.addFlag('col_desplazado'); p.addFlag('displaced'); p.setMem('col_farc', true); },
      },
    ],
    effect: null,
  },

  // ── MEDELLÍN CARTEL ───────────────────────────────────────────────────────────

  {
    id: 'col_cartel_medellin',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1984 && G.currentYear <= 1993 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.col_cartel,
    text: (G) => {
      const yr = G.currentYear
      const isMed = G.place?.name?.includes('Medellín') || G.character?.country?.name === 'Colombia'
      return yr <= 1989
        ? 'The offer to the city is plata o plomo: silver or lead. The judges who refuse the bribes are killed. The journalists who report on the cartel are killed. The presidential candidate who promised to extradite Escobar is killed. The car bomb outside the DAS building in September is eighty kilograms of dynamite in a truck. You learn to notice trucks parked at odd angles.'
        : 'December 2, 1993: the radio says Escobar was shot on a rooftop in Los Olivos. The hunt lasted sixteen months. The city celebrates in a way that feels like relief and disbelief simultaneously. The men who built the laboratories and ran the routes are still in Cali, in the Cauca Valley. The organization ends; the industry does not.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('col_cartel_era'); p.setMem('col_cartel', true); },
  },

  // ── THE PARAMILITARIES ────────────────────────────────────────────────────────

  {
    id: 'col_paramilitares',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1997 && G.currentYear <= 2005 &&
      G.ruralUrban === 'rural' &&
      G.age >= 20 &&
      !G.mem?.col_para,
    text: 'The AUC — the Autodefensas Unidas de Colombia — operate in the territory between the guerrilla zones and the cities. They call themselves a counterinsurgency. They massacre entire villages for suspected collaboration with the FARC. The Mapiripán massacre, the El Aro massacre, the El Salado massacre. Each name is a village, each village a list of the dead. The army sometimes arrives after. The investigations sometimes produce reports. The men who gave the orders are sometimes in parliament. You live in the territory where these things are not theoretical.',
    choices: [
      {
        text: 'You leave. There is no neutrality in a territory where both sides want information.',
        tag: null,
        outcome: 'Another family leaving another rural route and arriving in the periphery of a city that has been receiving displaced people for fifty years.',
        effect: (p) => { p.m -= 18; p.h -= 6; p.r += 10; p.addFlag('col_desplazado'); p.addFlag('displaced'); p.addFlag('col_paramilitary_era'); p.setMem('col_para', true); },
      },
      {
        text: 'You stay because the land and the family graves are here.',
        tag: null,
        outcome: 'Staying in a paramilitary zone is a series of daily decisions about what to say, to whom, and in what order.',
        effect: (p) => { p.m -= 12; p.r += 8; p.h -= 4; p.addFlag('col_paramilitary_era'); p.setMem('col_para', true); },
      },
    ],
    effect: null,
  },

  // ── ESTRATIFICACIÓN ───────────────────────────────────────────────────────────

  {
    id: 'col_estratificacion',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1985 &&
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.col_estrato,
    text: (G) => {
      const isWealthy = G.stats.wealth > 60
      return isWealthy
        ? 'Your utility bill says estrato cinco. This number appears on the bill, on your address in certain databases, in the subtext of social introductions. Estrato cinco means the price you pay for gas and electricity subsidizes estrato uno and dos. It also means you live on the right side of a line that is official and numerically precise and never directly discussed but always present.'
        : 'Your utility bill says estrato uno or estrato dos. The number is the city\'s official designation of your neighborhood. Estrato uno means the cheapest utilities, which is to say the utilities structured for people for whom cost is the first question. When you give your address, the estrato is audible in the name of the barrio. Some doors open differently afterward. Some do not open.'
    },
    choices: null,
    effect: (p) => { p.addFlag('col_estrato_known'); p.e += 3; p.setMem('col_estrato', true); },
  },

  // ── THE PEACE ACCORD 2016 ─────────────────────────────────────────────────────

  {
    id: 'col_paz_santos',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 2016 && G.currentYear <= 2017 &&
      G.age >= 20 &&
      !G.mem?.col_paz,
    text: (G) => {
      const hasConflict = G.flags.has('col_violencia_generation') || G.flags.has('col_farc_era') || G.flags.has('col_desplazado') || G.flags.has('col_paramilitary_era')
      return hasConflict
        ? 'The peace accord is signed in Cartagena September 26, 2016. Fifty-two years. The referendum fails on October 2 — the "No" wins by forty thousand votes, 0.43 percent. Santos wins the Nobel Peace Prize anyway. Congress ratifies the accord in November without a new vote. You have been inside this conflict for decades. The end of it is real and contested and ongoing simultaneously. The FARC becomes a political party. The weapons are turned in. The men who ran the mountains are now candidates for parliament. You do not know what to do with that sentence.'
        : 'The peace accord after fifty-two years. The FARC turned in weapons and became a political party. Santos won the Nobel. The referendum to approve it failed — barely, by forty thousand votes in a country of fifty million. Congress approved it anyway. The war is over in the sense that the organization that signed the accord is no longer fighting. The violence in the territories is ongoing. Both sentences are true.'
    },
    choices: [
      {
        text: 'The accord is real. Whatever it cost to negotiate, the shooting stopping is worth it.',
        tag: null,
        outcome: 'The implementation is slower than the agreement. What peace looks like in the territories depends on whether the state arrives to fill the space the FARC left. In many places it has not.',
        effect: (p) => { p.m += 6; p.r -= 3; p.addFlag('col_paz_generation'); p.setMem('col_paz', true); },
      },
      {
        text: 'The accord didn\'t account for what was done. Impunity is the price of the signature.',
        tag: null,
        outcome: 'The Special Jurisdiction for Peace was designed to try war crimes without prison sentences in exchange for truth. Whether this is justice or its replacement is the question the country is still arguing.',
        effect: (p) => { p.r += 6; p.addFlag('col_paz_generation'); p.setPolitical('dissident'); p.setMem('col_paz', true); },
      },
    ],
    effect: null,
  },

  // ── 2021 PARO NACIONAL ────────────────────────────────────────────────────────

  {
    id: 'col_paro_2021',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 2021 && G.currentYear <= 2022 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.col_paro,
    text: 'April 28, 2021. The Duque government proposes a tax reform that would expand income tax to workers who earn more than three hundred dollars a month — in a country where COVID has already destroyed a third of informal jobs. The streets fill. Forty-six days of blockades. The ESMAD — the anti-riot police — fires live ammunition. Cali has eleven days where the internet goes down and the army is on the streets. Eighty-three people die. The reform is withdrawn. The protests end. Nothing structural has changed.',
    choices: null,
    effect: (p) => { p.r += 6; p.addFlag('col_paro_generation'); p.setMem('col_paro', true); },
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'col_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      (G.flags.has('col_violencia_generation') || G.flags.has('col_farc_era') || G.flags.has('col_cartel_era') || G.flags.has('col_paramilitary_era')) &&
      !G.mem?.col_reckoning,
    text: (G) => {
      const yr = G.currentYear
      const decades = Math.floor((yr - 1948) / 10)
      return yr >= 2020
        ? 'You have outlived La Violencia, the cartel years, the paramilitary zone, the guerrilla tax. You have watched the country sign a peace accord and then watch the territories fill with smaller armed groups that have different names for the same work. The peace is real in Bogotá. In some valleys it is not yet real. You contain the map of all of it.'
        : 'Colombia has been at war, in one form or another, for most of your life. Not constantly, not everywhere — the country is also salsa and coffee and the Caribbean coast and families Sunday lunches — but the violence has always been available as a context. You have learned to hold the other things alongside it.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('col_testigo_generation'); p.setMem('col_reckoning', true); },
  },

]

export default COLOMBIA_EVENTS
