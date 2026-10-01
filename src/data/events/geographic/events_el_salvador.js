// events_el_salvador.js — El Salvador depth (7 events)
// Covers: Romero assassination 1980, El Mozote truth 1992, gang renta economy,
// Bukele 2019 arrival, Bitcoin legal tender 2021, estado de excepción 2022+
// Complements the 14 events in events_central_america.js

const IS_SALVADORAN = (G) => G.character.country?.name === 'El Salvador'

export const EL_SALVADOR_EVENTS = [

  // ─── ROMERO ASSASSINATED ─────────────────────────────────────────────────────

  {
    id: 'slv_romero_death',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear === 1980 &&
      G.age >= 15 &&
      !G.mem?.slvRomeroDeath,
    text: 'On March 24th, 1980, Archbishop Óscar Romero is shot while saying Mass at the Hospital La Divina Providencia. He had just finished his homily. The bullet arrives in the middle of the consecration. The murder is announced on the radio in the same flat voice that announces everything. The rest of the day you understand, perhaps for the first time, that no one in this country is beyond reach of what is happening.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.karma += 5; p.addFlag('slv_romero_death_witness'); p.setMem('slvRomeroDeath', true) },
  },

  // ─── EL MOZOTE TRUTH EMERGES ─────────────────────────────────────────────────

  {
    id: 'slv_el_mozote',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 30 &&
      !G.mem?.slvElMozote,
    text: 'In 1992 forensic teams dig at El Mozote, in Morazán, and in the sacristy they find the bones of children. The Atlacatl Battalion, trained by the Americans, did it in December 1981, and both governments denied it, and the newspaper that reported it was accused of making it up. Now there are bones. There were always bones. The denial only stopped anyone counting them.',
    context: 'The El Mozote massacre of 10-12 December 1981 killed between about 800 and 1,000 people, most of them women and children.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 9; p.e += 4; p.addFlag('slv_el_mozote_generation'); p.setMem('slvElMozote', true) },
  },

  // ─── GANG RENTA ECONOMY ───────────────────────────────────────────────────────

  {
    id: 'slv_gang_renta',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2021 &&
      G.age >= 25 &&
      !G.mem?.slvGangRenta,
    text: (G) => {
      const hasShop = G.flags.has('entrepreneur') || G.stats.wealth >= 45
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
    phase: null,
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      IS_SALVADORAN(G) &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.slvEstadoExcepcion,
    text: 'March 2022, and the gangs kill eighty-seven people in three days, and the president suspends the constitution. Tens of thousands are arrested without warrants, and a mega-prison opens in Tecoluca. The murders stop. People walk streets they have not walked in twenty years. Some of the men taken are gang members, and some only had a tattoo, or lived in the wrong neighbourhood, or had a cousin who was known.',
    context: 'More than 70,000 people were detained under El Salvador\'s state of exception by 2023. The Terrorism Confinement Center (CECOT) was built for 40,000 prisoners.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 7; p.e += 3; p.addFlag('slv_estado_excepcion_generation'); p.setMem('slvEstadoExcepcion', true) },
  },

  // ─── BITCOIN LEGAL TENDER 2021 ────────────────────────────────────────────────

  {
    id: 'slv_bitcoin',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_SALVADORAN(G) &&
      G.currentYear === 2021 &&
      G.age >= 20 &&
      !G.mem?.slvBitcoin,
    text: 'September 2021, and Bitcoin is legal tender, and every shop must take it. The government puts thirty dollars of it on every citizen\'s phone, in an app called Chivo. The IMF objects and the price halves within months. You spend the thirty dollars. You have been paying for pupusas in dollars since 2001, and now you also own something whose value you check on your phone.',
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
