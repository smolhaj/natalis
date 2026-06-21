// events_followthrough_47.js — world-event follow-throughs (17 events)
// Callbacks for: flu_pandemic_survivor, triangle_generation, civil_war_generation,
// anarchist_barcelona, economic_stabilization, systemic_discrimination, divided_family,
// quebec_referendum_lived, climate_generation, reef_loss_generation, heat_stress_generation,
// tipping_point_generation, metoo_era, iran_woman_life_freedom_generation,
// turkey_syria_earthquake_2023, sudan_civil_war_2023, taj_gbao_distant_witness

export const FOLLOWTHROUGH_47_EVENTS = [

  // ─── 1918 FLU — THE ILLNESS THAT IS NOT TALKED ABOUT ────────────────────────

  {
    id: 'ft47_flu_pandemic_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('flu_pandemic_survivor') &&
      G.age >= 55 &&
      G.currentYear >= 1940 &&
      !G.mem?.ft47FluPandemic,
    text: 'The 1918 illness is not much talked about in the years that follow. The war overshadows it, and then the Depression overshadows the war\'s shadow, and then another war. The fifty million dead — or a hundred million, the estimates vary — entered the historical record quietly, as background. You know what it felt like from inside a city where a third of the people were sick at once: the specific silence in the streets, the mass graves moved through without ceremony, the healthy people who died and the sick people who did not. The calculus of it never made sense then and it does not make more sense in retrospect.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft47FluPandemic', true) },
  },

  // ─── TRIANGLE FIRE — THE NAMES IN THE NEWSPAPERS ────────────────────────────

  {
    id: 'ft47_triangle_fire_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('triangle_generation') &&
      G.age >= 55 &&
      G.currentYear >= 1940 &&
      G.character.country?.name === 'United States' &&
      !G.mem?.ft47TriangleFire,
    text: 'One hundred and forty-six names in the newspapers. Then the labour laws changed and the union membership grew and the owners were acquitted and went back to running factories. The Triangle Shirtwaist fire is in the history books now as the founding event of the American labour movement. What the history books do not fully capture is the specific weight of knowing that the stairwell doors were locked because the owners were afraid workers might steal scraps of fabric, and that this was common practice, and that this required a building full of dead women to become impermissible.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft47TriangleFire', true) },
  },

  // ─── SPANISH CIVIL WAR — THE LONG FRANCO AFTERMATH ──────────────────────────

  {
    id: 'ft47_spanish_civil_war_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('civil_war_generation') &&
      G.age >= 55 &&
      G.currentYear >= 1955 &&
      !G.mem?.ft47SpanCivilWar,
    text: 'The civil war ended in 1939 and Franco governed for thirty-six years after it. The question of what happened — who did what, who killed whom, who informed, who collaborated, who resisted — is managed for those decades by a silence that is not voluntary but enforced. The bodies are in the roadsides and the ditches and the cemeteries, and their locations are known in certain families and not in others, and the official account excludes most of what actually happened. You have a knowledge of the war that is not the official account. You have kept it the way people in this country keep things.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft47SpanCivilWar', true) },
  },

  // ─── ANARCHIST BARCELONA — WHAT THE EXPERIMENT MEANT ────────────────────────

  {
    id: 'ft47_anarchist_barcelona_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('anarchist_barcelona') &&
      G.age >= 55 &&
      G.currentYear >= 1960 &&
      !G.mem?.ft47AnarBarcelona,
    text: 'The CNT ran the factories for eleven months. Not administered from above, not managed — run, by the workers who worked in them, decisions made collectively, wages equalised. George Orwell described it and was not believed by people who had not been there. The experiment ended when the Republican government, backed by Soviet-aligned communists, moved to suppress the anarchist militias in the May Days of 1937. The factories returned to private hands after the war. What the eleven months demonstrated is still argued about by people who were nowhere near Barcelona in 1936.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 2; p.setMem('ft47AnarBarcelona', true) },
  },

  // ─── BRAZIL REAL PLAN — WHAT STABILITY BOUGHT ──────────────────────────────

  {
    id: 'ft47_economic_stabilization_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('economic_stabilization') &&
      G.age >= 35 &&
      G.currentYear >= 2005 &&
      !G.mem?.ft47EconStabilize,
    text: 'The inflation stopped almost overnight in 1994. Prices that had been repriced mid-shopping by workers called marcadores — whose only job was changing labels throughout the day — became stable. You could save money and find the same amount in the account a week later. The middle class forming itself from the stability was real and observable. What the stability was built on — austerity, fiscal targets, the IMF conditions — and who paid for it, is the question you have been living inside since.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.m += 2; p.setMem('ft47EconStabilize', true) },
  },

  // ─── SYSTEMIC DISCRIMINATION — APARTHEID'S LONG SHADOW ──────────────────────

  {
    id: 'ft47_systemic_discrimination_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('systemic_discrimination') &&
      G.age >= 55 &&
      G.currentYear >= 1990 &&
      !G.mem?.ft47SysDiscrim,
    text: 'The system classified you and built a world around the classification. The pass book that had to be produced on demand. The neighbourhood you were assigned to. The school that was Bantu Education, designed explicitly to prepare you for subordinate labour. The TRC described this as a crime; the legal language of gross human rights violations carries it now. You have lived in the post-apartheid country long enough to know what the word transformation means and what it describes, and the distance between those two things.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft47SysDiscrim', true) },
  },

  // ─── DIVIDED FAMILY — THE ARMISTICE THAT WAS NOT PEACE ──────────────────────

  {
    id: 'ft47_divided_family_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('divided_family') &&
      G.age >= 55 &&
      G.currentYear >= 1975 &&
      !G.mem?.ft47DividedFamily,
    text: 'The armistice was signed in 1953 and the war did not end. The line divides a village, a family, a language and a set of names that exist on both sides of a border that cannot be crossed. The family reunion meetings, when they happen, reveal what sixty years of separation does to the ability to recognize each other: the vocabulary has diverged, the references are not shared, the person you expected is not exactly the person who arrived. You have relatives who are a four-hour drive from you and who you cannot reach. You have never found an adequate way to say what this is.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.setMem('ft47DividedFamily', true) },
  },

  // ─── QUEBEC REFERENDUM — THE COUNTRY THAT ALMOST WASN'T ────────────────────

  {
    id: 'ft47_quebec_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('quebec_referendum_lived') &&
      G.age >= 55 &&
      G.currentYear >= 2010 &&
      !G.mem?.ft47QuebecRef,
    text: '49.4 percent. A hundred thousand votes in a province of seven million. The concession speech came after midnight and the margin was indistinguishable from accident, and the country that almost wasn\'t continued. The Clarity Act followed; the Bloc remained; the question remained. What you notice, in the years since, is how rarely the closeness of it is acknowledged in the English Canadian telling — the near-miss processed as if it had been a comfortable No, as if 1995 had not demonstrated that the country\'s existence depended, on a Tuesday in October, on a thin margin of accidental Yes.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft47QuebecRef', true) },
  },

  // ─── CLIMATE GENERATION — THE AGREEMENT AND ITS NON-KEEPING ────────────────

  {
    id: 'ft47_climate_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('climate_generation') &&
      G.age >= 55 &&
      G.currentYear >= 2030 &&
      !G.mem?.ft47ClimateGen,
    text: 'The Paris Agreement was adopted in 2015 and the NDCs were filed and the pledges were made and the warming trajectory, had all of it been implemented, would have been approximately 2.5 to 3 degrees. Not all of it was implemented. You are old enough to remember the signing ceremony and the specific feeling in the room — a version of hope, shaped like an agreement, which is not the same thing as hope — and to measure the distance between that ceremony and what the thermometers have been showing since.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 4; p.setMem('ft47ClimateGen', true) },
  },

  // ─── REEF LOSS — THE LARGEST LIVING STRUCTURE ───────────────────────────────

  {
    id: 'ft47_reef_loss_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('reef_loss_generation') &&
      G.age >= 50 &&
      G.currentYear >= 2045 &&
      !G.mem?.ft47ReefLoss,
    text: 'The reef took twenty-five million years to form. It bleached over a span of decades — the 1998 event, then 2002, then 2016, 2017, 2020, 2022, 2024, the consecutive years that the scientists said they had warned about. What the warnings could not describe in advance is what the loss looks like from inside the generation that watched it happen and did not prevent it. The coral is still referred to in some documents as an ecosystem that will be restored. The marine biologists who work the reef do not use that language.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 5; p.setMem('ft47ReefLoss', true) },
  },

  // ─── HEAT STRESS GENERATION — THE SEASON THAT DOESN'T END ──────────────────

  {
    id: 'ft47_heat_stress_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('heat_stress_generation') &&
      G.age >= 55 &&
      G.currentYear >= 2065 &&
      !G.mem?.ft47HeatStress,
    text: 'The summer is now the season you cannot go outside. Not a heat wave — heat waves end. This is the new summer, and the new summer requires air conditioning to survive, which requires electricity, which requires infrastructure that does not fail. The outdoor workers who kept the Gulf functioning in the heat — the construction crews, the agricultural labour — have been reconfigured into the hours before dawn and after nine at night. The cities were built for a climate that no longer exists here. The cities continue anyway. You live in them.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 4; p.setMem('ft47HeatStress', true) },
  },

  // ─── TIPPING POINT GENERATION — THE DOOR THAT OPENED ONCE ──────────────────

  {
    id: 'ft47_tipping_point_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tipping_point_generation') &&
      G.age >= 55 &&
      G.currentYear >= 2085 &&
      !G.mem?.ft47TippingPoint,
    text: 'The scientists called it a tipping point to avoid saying irreversible, though irreversible was what they meant. The West Antarctic Ice Sheet is collapsing and has been since the 2070s; the sea level will rise by a metre over the coming centuries regardless of what happens to emissions from this point. You have lived long enough to remember when this was a projection, then a probability, then a confirmed process. The countries that are going underwater are not the countries that burned the most carbon. This fact has been acknowledged in agreements and conferences. The sea continues to rise.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 5; p.setMem('ft47TippingPoint', true) },
  },

  // ─── METOO ERA — THREE YEARS ON ─────────────────────────────────────────────

  {
    id: 'ft47_metoo_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('metoo_era') &&
      G.age >= 30 &&
      G.currentYear >= 2020 &&
      !G.mem?.ft47Metoo,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'The accounting happened publicly in October 2017 and then continued for years with uneven consequences — men with many accusers facing little; men with one facing more. What changed is harder to describe than what didn\'t: some things became sayable that were previously unsayable, in specific rooms, among specific people. Some things that were understood privately remained unsayable in public, in exactly the rooms where it mattered most. You have your own version of the accounting. You know what it confirmed and what it left exactly where it was.'
        : 'The stories began with Weinstein and did not stop. The naming of something that had been understood but not spoken produced discomfort in some rooms and relief in others. Three years on, you can identify which rooms produced which response — you were in most of them. What you did with what you knew in those years, and whether it was enough, is the question you have not found a satisfying answer to.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft47Metoo', true) },
  },

  // ─── WOMAN LIFE FREEDOM — THE MOVEMENT AND ITS COST ────────────────────────

  {
    id: 'ft47_iran_wlf_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('iran_woman_life_freedom_generation') &&
      G.age >= 30 &&
      G.currentYear >= 2025 &&
      !G.mem?.ft47IranWLF,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'Mahsa Amini died in custody in September 2022 and what followed was the most sustained uprising against the Islamic Republic since the revolution. Women burned headscarves in the streets. The slogan *jin jiyan azadî* — woman, life, freedom — appeared on walls across the country. More than five hundred people were killed in the first months; eighteen thousand were arrested. The government did not fall. Some of the women who had burned their headscarves publicly were sentenced to death. The movement did not resolve. It continued into you.'
        : 'The protests were the most visible challenge to the Islamic Republic in decades. What made them different was who led them publicly — young Iranian women, burning headscarves, at personal risk that they knew and accepted. The government responded with a severity that confirmed exactly what the women were protesting. The movement did not topple the system. Whether it changed what is possible in the long run is the question that is still being answered.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.karma += 3; p.m -= 3; p.setMem('ft47IranWLF', true) },
  },

  // ─── TURKEY-SYRIA EARTHQUAKE — THE SLOW RESPONSE ────────────────────────────

  {
    id: 'ft47_turkey_quake_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('turkey_syria_earthquake_2023') &&
      G.age >= 30 &&
      G.currentYear >= 2028 &&
      !G.mem?.ft47TurkeyQuake,
    text: 'The earthquake struck at 4 a.m. on February 6, 2023 along the East Anatolian Fault. More than fifty thousand died — the deadliest earthquake in the region in a century. Hatay, Antakya, Kahramanmaraş: cities reduced to rubble while survivors waited in the cold for search-and-rescue teams. The government\'s delayed response became a political controversy. In Syria, already unmade by civil war, the international aid was blocked by sanctions and bureaucratic distance that operated independent of the rubble. The reconstruction is measured in decades. You are living through it.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft47TurkeyQuake', true) },
  },

  // ─── SUDAN CIVIL WAR 2023 — THE INVISIBLE CRISIS ────────────────────────────

  {
    id: 'ft47_sudan_war_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sudan_civil_war_2023') &&
      G.age >= 30 &&
      G.currentYear >= 2027 &&
      !G.mem?.ft47SudanWar,
    text: 'The war between the SAF and the RSF has produced more displaced people than any crisis in the world — more than Ukraine, more than Syria, more than Afghanistan — and received a fraction of the international attention. By the end of 2024, 7 million people have been displaced; Darfur, where the RSF has committed what the US State Department called genocide, has barely registered in the news cycles of countries that could intervene. The civilian transition that followed the 2019 revolution lasted until the generals who arranged it decided it was finished. You survived this. The word survived is the most accurate word available.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 5; p.setMem('ft47SudanWar', true) },
  },

  // ─── TAJIKISTAN GBAO — THE CRACKDOWN THAT FEW NOTICED ───────────────────────

  {
    id: 'ft47_tajik_gbao_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('taj_gbao_distant_witness') &&
      G.age >= 30 &&
      G.currentYear >= 2025 &&
      !G.mem?.ft47TajikGbao,
    text: 'The crackdown on Gorno-Badakhshan in May 2022 — armoured vehicles through mountain roads, the internet cut, the exact death toll disputed and undocumented — received almost no international coverage. The Pamiris who live there, mostly Ismaili Muslim and linguistically distinct from the Tajik majority, have lived in tension with Dushanbe since the civil war. The specific quality of the government\'s response to the protests — the internet blackout, the documented torture of detainees, the refusal to enumerate the dead — is the response of a government that understood it would face no consequences. It was correct.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft47TajikGbao', true) },
  },

]
