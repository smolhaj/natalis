// events_el_salvador.js — El Salvador depth (7 events)
// Covers: Romero assassination 1980, El Mozote truth 1992, gang renta economy,
// Bukele 2019 arrival, Bitcoin legal tender 2021, estado de excepción 2022+
// Complements the 14 events in events_central_america.js

const IS_SALVADORAN = (G) => G.character.country?.name === 'El Salvador'

export const EL_SALVADOR_EVENTS = [

  // ─── ROMERO ASSASSINATED ─────────────────────────────────────────────────────

  {
    id: 'slv_romero_death',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear === 1980 &&
      G.age >= 15 &&
      !G.mem?.slvRomeroDeath,
    text: 'On March 24th, 1980, Archbishop Óscar Romero is shot while saying Mass at the Hospital La Divina Providencia. He had just finished his homily. The bullet arrives in the middle of the consecration. The murder is announced on the radio in the same flat voice that announces everything. You sit with this fact for the rest of the day and understand, perhaps for the first time, that no one in this country is beyond reach of what is happening.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.karma += 5; p.addFlag('slv_romero_death_witness'); p.setMem('slvRomeroDeath', true) },
  },

  // ─── EL MOZOTE TRUTH EMERGES ─────────────────────────────────────────────────

  {
    id: 'slv_el_mozote',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 30 &&
      !G.mem?.slvElMozote,
    text: 'In 1992, forensic teams excavate El Mozote, a village in Morazán. They find the bones of children — hundreds of them — in the sacristy. The massacre happened in December 1981. The Atlacatl Battalion, trained at the US School of the Americas in Fort Benning, Georgia, killed between 700 and 1,000 people over three days. The Salvadoran government denied it. The US State Department denied it. The New York Times reported it and was accused of fabrication. Now there are bones. They have always been bones. The denial simply prevented anyone from counting them.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 9; p.e += 4; p.addFlag('slv_el_mozote_generation'); p.setMem('slvElMozote', true) },
  },

  // ─── GANG RENTA ECONOMY ───────────────────────────────────────────────────────

  {
    id: 'slv_gang_renta',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2021 &&
      G.age >= 25 &&
      !G.mem?.slvGangRenta,
    text: (G) => {
      const hasShop = G.career?.id === 'entrepreneur' || G.stats.wealth >= 45
      return hasShop
        ? 'The renta comes every week. The boy who collects it is sixteen and does not make eye contact. The amount is fixed and is not negotiable — you know this because someone on the next street negotiated once and the store burned down that night. You pay it the way you pay electricity: as an operating cost of existing in this neighborhood. The government is aware of this system. The government does not control these streets.'
        : 'The bus drivers pay renta. The market vendors pay renta. The woman who sells pupusas at the corner pays renta. The rate depends on the income. The boys who collect are known. The people above the boys are known. This is all known and none of it is possible to say aloud to anyone who would do something about it, because the ones who have tried to say it have been made examples of.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.mo -= 500; p.addFlag('slv_gang_renta_generation'); p.setMem('slvGangRenta', true) },
  },

  // ─── BUKELE ARRIVAL 2019 ─────────────────────────────────────────────────────

  {
    id: 'slv_bukele_arrival',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 25 &&
      !G.mem?.slvBukele,
    text: 'Nayib Bukele wins the 2019 election at thirty-seven — the first president in thirty years who is neither ARENA nor FMLN, which means the first who is neither the right wing that ran the death squads nor the guerrilla movement that fought them. He governs via Twitter. He puts soldiers in the Legislative Assembly to pass a security budget. He calls himself "the world\'s coolest dictator" and posts a photo from the Oval Office wearing a backwards cap. The gangs are still on the streets. The renta is still paid. He is by some margin the most popular president in Latin America.',
    choices: [
      {
        text: 'Something new — the old parties failed this country.',
        tag: 'hopeful',
        outcome: 'You have watched ARENA and the FMLN divide the country for thirty years without resolving anything. Whatever this is, it is different.',
        effect: (p) => { p.m += 6; p.addFlag('slv_bukele_believer') },
      },
      {
        text: 'The way he holds power worries you more than what he says he will do.',
        tag: 'skeptical',
        outcome: 'You have seen what happens in this region when power concentrates in one man who does not recognise limits. The style is new. The structure is not.',
        effect: (p) => { p.e += 4; p.r += 3; p.addFlag('slv_bukele_skeptic') },
      },
    ],
    effect: null,
  },

  // ─── ESTADO DE EXCEPCIÓN 2022 ────────────────────────────────────────────────

  {
    id: 'slv_estado_excepcion',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.slvEstadoExcepcion,
    text: 'In March 2022 the gangs kill eighty-seven people in three days. Bukele declares the estado de excepción. Forty-seven thousand people are arrested in the first year with no warrants required. The mega-prison CECOT opens in Tecoluca — forty thousand cells, cameras, no light. The murder rate drops from one of the highest in the world to one of the lowest. People walk streets they have not walked in twenty years. Some of the people arrested are gang members. Some are men who had a tattoo, or lived in the wrong neighborhood, or whose cousin was known. The numbers are the same regardless of which person you were.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 7; p.e += 3; p.addFlag('slv_estado_excepcion_generation'); p.setMem('slvEstadoExcepcion', true) },
  },

  // ─── BITCOIN LEGAL TENDER 2021 ────────────────────────────────────────────────

  {
    id: 'slv_bitcoin',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear === 2021 &&
      G.age >= 20 &&
      !G.mem?.slvBitcoin,
    text: 'On September 7, 2021, Bitcoin becomes legal tender in El Salvador. Every business is required by law to accept it. The government distributes thirty dollars in Bitcoin to every citizen through an app called Chivo. The IMF objects. The World Bank declines to assist. El Salvador\'s bonds are downgraded. The Bitcoin price falls 50% in the months after adoption. The thirty dollars are spent. The government buys more Bitcoin. You watch this from a country where people have been paying for pupusas in dollars since 2001 and now own, in addition, a volatile digital asset whose value you check on your phone.',
    choices: null,
    effect: (p) => { p.mo += 30; p.e += 3; p.r += 3; p.setMem('slvBitcoin', true) },
  },

  // ─── LATE RECKONING ───────────────────────────────────────────────────────────

  {
    id: 'slv_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.age >= 58 &&
      !G.mem?.slvLateReckoning,
    text: 'El Salvador is a country that passed through the civil war into a peace that produced the gangs, and then through the gang era into a security state whose methods the war would have recognised. You have lived through all of it. The bodies from El Mozote are still being identified. The men in CECOT have no trial date. The streets are quieter than they have ever been in your lifetime. You hold all of this simultaneously, because it is all simultaneously true, and because there is no other country you have.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.karma += 3; p.e += 2; p.setMem('slvLateReckoning', true) },
  },

]
