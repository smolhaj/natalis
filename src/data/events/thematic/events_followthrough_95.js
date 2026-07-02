// Follow-through events for Namibia depth arc
// Covers: nam_swanla_generation, nam_swapo_exile_generation,
// nam_border_war_generation, nam_land_wait_generation

const IS_NAMIBIAN = (G) => G.character.country?.name === 'Namibia'

export const FOLLOWTHROUGH_95_EVENTS = [

  {
    id: 'ft95_swanla_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.flags.has('nam_swanla_generation') &&
      G.age >= 55 &&
      !G.mem?.ft95Swanla,
    text: 'The mines are still operating. Some of them are owned by Chinese companies now; some by South African consortiums; some by the state, partly. The SWANLA system was abolished at independence. The labour relations are different now — there are contracts with terms, unions with negotiating power, wages that are not structurally suppressed by law. The structural suppression has been replaced by the market, which produces similar outcomes for different reasons. The men who worked eighteen-month contracts in the 1960s and came home changed — less in their bodies than in some harder-to-name way — are old now or dead. Their contribution to the economy of the country that replaced the one they worked in is not in any official accounting. This is also not unusual.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft95Swanla', true) },
  },

  {
    id: 'ft95_exile_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.flags.has('nam_swapo_exile_generation') &&
      G.age >= 55 &&
      !G.mem?.ft95Exile,
    text: 'The years in exile are part of the national narrative now — the liberation struggle, the PLAN fighters, the camps in Zambia and Angola, the hard conditions, the return. What is less in the narrative: the Lubango dungeons, where SWAPO held and tortured members accused of being SADF spies, hundreds of them, including people who were not spies. The accusations came during the paranoia of the late 1980s. The truth commission — the one that was supposed to address this — was proposed and not established. The people who were in Lubango who came back are in the same country as the people who sent them there. The liberation movement that freed Namibia also imprisoned and in some cases killed Namibians. Both of these are true. The national narrative contains one and submerges the other.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft95Exile', true) },
  },

  {
    id: 'ft95_border_war_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.flags.has('nam_border_war_generation') &&
      G.age >= 55 &&
      !G.mem?.ft95BorderWar,
    text: 'The people you were fighting against in the bush are citizens of the country you live in now. Some of them are in government. Some of them are your neighbors. The war ended in 1989; Namibia became independent in 1990; SWAPO — the movement — won the election and formed the government. The specific question of what you were doing and what they were doing has no official resolution. There was no South African Truth and Reconciliation process for the Namibian border war. The reconciliation happened by not having the conversation. You have lived inside the not-having-the-conversation for thirty years. It is its own kind of peace, of the kind that requires not too many questions.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft95BorderWar', true) },
  },

  {
    id: 'ft95_land_wait_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.flags.has('nam_land_wait_generation') &&
      G.age >= 60 &&
      !G.mem?.ft95LandWait,
    text: 'The land did not come. The resettlement list is longer now than it was when you registered. The willing-seller-willing-buyer mechanism bought some farms and resettled some families — the numbers are in the reports — but the proportion of commercial farm land that transferred is small and the pace is slower than the demand and the demand is generational. You are old enough now to understand that the land question in Namibia will not be resolved in your lifetime. This is also the land question in Zimbabwe, in South Africa, in Kenya. The common feature is that independence transferred political power and did not transfer the means of production, and the means of production are still land in these economies, and the land is still where it was.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft95LandWait', true) },
  },

]
