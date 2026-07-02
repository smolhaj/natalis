// Follow-through events for Bolivia depth arc
// Covers: bol_sea_loss_identity, bol_lithium_generation, bol_tipnis_generation, bol_maritime_icj_generation

const IS_BOL = (G) => G.character.country?.name === 'Bolivia'

export const FOLLOWTHROUGH_89_EVENTS = [

  {
    id: 'ft89_sea_loss_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_BOL(G) &&
      G.flags.has('bol_sea_loss_identity') &&
      G.age >= 60 &&
      !G.mem?.ft89SeaLoss,
    text: 'You have been to the sea, eventually. Most Bolivians get there eventually — Peru, Chile, Brazil, the bus to Arica. What you thought you would feel when you arrived was something large. What you felt was the water, and then the cold, and then the fact of it. Bolivia\'s claim to the sea is still there. The court ruled in 2018 that Chile has no obligation to negotiate. The Día del Mar continues. March 23rd will come again, and somewhere a teacher is placing that map on the board.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft89SeaLoss', true) },
  },

  {
    id: 'ft89_lithium_nationalization_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_BOL(G) &&
      G.flags.has('bol_lithium_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 35 &&
      !G.mem?.ft89Lithium,
    text: 'The lithium nationalization law changed again after 2019 — the political transition opened new negotiation windows. Chinese companies, Russian companies, European companies: the queue did not shorten. The electric car the market was building around lithium became common in cities you will never visit. The Salar de Uyuni is still white and flat and nearly silent. The question of who benefits from what is under it is still the question Bolivia has been asking about its resources since 1545.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('ft89Lithium', true) },
  },

  {
    id: 'ft89_tipnis_road_outcome',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_BOL(G) &&
      G.flags.has('bol_tipnis_generation') &&
      G.currentYear >= 2013 &&
      G.age >= 25 &&
      !G.mem?.ft89Tipnis,
    text: 'The law protecting the TIPNIS was suspended, reinstated, modified. The road is still being argued about. The communities inside the territory have been there longer than the argument. The question of who decides what develops in Bolivia — highland government, lowland communities, international biodiversity monitors, the road-building contracts already signed — has not been resolved by court case or protest march. The march happened. You know that it happened.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('ft89Tipnis', true) },
  },

  {
    id: 'ft89_icj_ruling_2018',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_BOL(G) &&
      G.flags.has('bol_maritime_icj_generation') &&
      G.currentYear >= 2018 &&
      G.age >= 28 &&
      !G.mem?.ft89Icj,
    text: 'The court ruled fourteen to two that Chile has no legal obligation to negotiate. President Morales called it a moral victory — Bolivia argued the case, made the record, established the principle, even if the court found no legal hook. Chile called it a definitive ruling. Diplomatic analysts noted that the decision does not prevent future negotiations; it only says Chile is not required to have them. March 23rd will continue. The map with the Litoral Region will still go on the board.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft89Icj', true) },
  },

]
