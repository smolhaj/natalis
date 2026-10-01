// events_mozambique_depth.js
// Mozambique depth: FRELIMO's communal villages (aldeias comunais) 1977–82, reeducation
// camps, the landmine generation, cashew industry collapse under structural adjustment,
// Maputo's post-peace city boom, the hidden debt scandal (tuna bonds) 2016,
// and the AIDS orphan generation. Companion to events_mozambique.js.

const IS_MOZ = (G) => G.character.country?.name === 'Mozambique'
const IS_MAKUA = (G) => IS_MOZ(G) && G.character.ethnicity === 'makua'
const IS_RURAL_MOZ = (G) => IS_MOZ(G) && G.ruralUrban === 'rural'
const IS_URBAN_MOZ = (G) => IS_MOZ(G) && G.ruralUrban === 'urban'

export const MOZAMBIQUE_DEPTH_EVENTS = [

  // ── ALDEIAS COMUNAIS (COMMUNAL VILLAGES) ────────────────────────────────────

  {
    id: 'moz_dep_aldeias_comunais',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1977 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.mozDepAldeias,
    text: `Starting in 1977 the government decides the scattered homesteads of the countryside are backward, and families are told, and sometimes made, to move into communal villages with collective fields and a school and a clinic. You leave the machamba your grandparents worked, the plot you knew. The new fields are strange ground, different water, different soil, and the harvests fall. By 1982 the policy is quietly dropped. Most families stay where they were moved.`,
    choices: [
      {
        text: 'Your family relocated to the communal village. The new plot was not the old one.',
        tag: null,
        outcome: 'You grew up in the village the state built, not the place your family came from. The knowledge of the original land is in your parents but not in your hands.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.addFlag('moz_dep_aldeias')
          p.setMem('mozDepAldeias', true)
        },
      },
      {
        text: 'Your family was among those who resisted and returned to the original machamba when the policy collapsed.',
        tag: null,
        outcome: 'The return was not simple. Some of the land had been redistributed or occupied. The return was a negotiation as much as a homecoming.',
        effect: (p) => {
          p.r += 6
          p.m -= 3
          p.e += 2
          p.addFlag('moz_dep_aldeias')
          p.setMem('mozDepAldeias', true)
        },
      },
    ],
    effect: null,
  },

  // ── CAMPOS DE REEDUCAÇÃO ─────────────────────────────────────────────────────

  {
    id: 'moz_dep_reeducacao',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.mozDepReeducacao,
    text: `The reeducation camps — campos de reeducação — were opened across Mozambique starting in 1975. FRELIMO sent people deemed enemies of the revolution: former colonial officials, suspected RENAMO sympathisers, prostitutes, homosexuals, criminals, black marketeers, "vagrants," and others whose offence was difficult to specify. The camps were in remote areas. The conditions were brutal. Several thousand people were interned; the numbers are not fully known because the archives were not opened. A person close to you — a relative, a neighbour, a friend of the family — was taken to one of these camps. You know the shape of the absence they left and something of what they returned from, or did not return from.`,
    choices: [
      {
        text: 'The person came back, changed. You know them in their after-form.',
        tag: null,
        outcome: 'What they came back from is not something they describe in full. You know the shape of it from what they never say.',
        effect: (p) => {
          p.m -= 8
          p.r += 7
          p.addFlag('moz_dep_reeducacao')
          p.setMem('mozDepReeducacao', true)
        },
      },
      {
        text: 'The person did not come back. The family was given no official information.',
        tag: null,
        outcome: 'The absence was absolute and unexplained. FRELIMO did not apologise for the camps until 2008. By then, the generation that experienced them was already old.',
        effect: (p) => {
          p.m -= 12
          p.r += 9
          p.karma += 3
          p.addFlag('moz_dep_reeducacao')
          p.setMem('mozDepReeducacao', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE LANDMINE GENERATION ──────────────────────────────────────────────────

  {
    id: 'moz_dep_landmine',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2005 &&
      G.age >= 6 && G.age <= 18 &&
      G.flags.has('mozambican_civil_war_generation') &&
      !G.mem?.mozDepLandmine,
    text: `The peace was signed in 1992. The mines were not. They are in the fields, on the paths, by the water and the bridges, in exactly the places a rural life has to go. After the war the deminers come, slow and methodical, and fields that were unplantable for years open up again. Until they reach yours, people keep losing feet and hands, and the children keep being curious about metal in the ground.`,
    context: 'An estimated one to two million landmines were laid during Mozambique\'s civil war. HALO Trust declared the country free of known minefields in 2015.',
    choices: [
      {
        text: 'You knew someone who was injured by a mine after the war ended. The war was over and the war was not over.',
        tag: null,
        outcome: 'The injury was in peacetime, technically. The distinction is not available to the person who was injured.',
        effect: (p) => {
          p.m -= 9
          p.r += 8
          p.addFlag('moz_dep_landmine_generation')
          p.setMem('mozDepLandmine', true)
        },
      },
      {
        text: 'You grew up knowing which paths were safe and which were not — this knowledge was taught before any other geography.',
        tag: null,
        outcome: 'The map of your childhood has safe routes and dangerous routes. The dangerous routes are in your body as avoidances. Some of them may be clear now. Some are still marked.',
        effect: (p) => {
          p.r += 7
          p.m -= 5
          p.e += 2
          p.addFlag('moz_dep_landmine_generation')
          p.setMem('mozDepLandmine', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: LANDMINE LATE WITNESS ───────────────────────────────────

  {
    id: 'moz_dep_landmine_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.flags.has('moz_dep_landmine_generation') &&
      G.age >= 50 &&
      !G.mem?.mozDepLandmineLate,
    text: `The HALO Trust reports Mozambique cleared of landmines in 2015 — one of the first heavily-mined countries to declare itself clean. The announcement is made and celebrated internationally. You receive this information as you receive anything about a thing you have lived inside and are now seeing described from outside. The word "cleared" has a meaning on a press release and a meaning in a body.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('mozDepLandmineLate', true)
    },
  },

  // ── CASHEW INDUSTRY COLLAPSE ─────────────────────────────────────────────────

  {
    id: 'moz_dep_cashew',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1994 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.mozDepCashew,
    text: 'The trees are still standing and they still bear, and the buyer at the road now pays for the raw nut and takes it away whole. The factory at the district town where your aunt worked for eleven years shut in the second year after the tariff went. Ten thousand women were employed shelling in this country and now the shelling happens somewhere else. You get paid for the nut and not for the work of opening it, and the difference between those two prices is the entire question.',
    context: 'Mozambique had a domestic cashew processing industry employing around 10,000 workers, mostly women. As a condition of structural adjustment lending, the World Bank required removal of the export tariff on raw cashews, which took effect in 1995. Raw nuts were exported to lower-cost Indian processors and most Mozambican factories closed within a few years. The Bank\'s own later review conceded the reform\'s benefits to smallholders had been overstated.',
    choices: [
      {
        text: 'Your family grows cashews. The price for raw nuts is lower than it was for processed product.',
        tag: null,
        outcome: 'The trees are still productive. The relationship between the tree and the income it generates has changed in ways the tree doesn\'t account for. You receive less for the same harvest.',
        effect: (p) => {
          p.mo -= 300
          p.m -= 5
          p.r += 5
          p.addFlag('moz_dep_cashew_generation')
          p.setMem('mozDepCashew', true)
        },
      },
      {
        text: 'You worked in the processing factory before it closed. The efficiency argument did not reach you from the outside.',
        tag: null,
        outcome: 'The job was reliable and it was yours. The economists who made this decision have papers that explain why it was correct. You have a different accounting.',
        effect: (p) => {
          p.mo -= 500
          p.m -= 8
          p.r += 7
          p.addFlag('moz_dep_cashew_generation')
          p.setMem('mozDepCashew', true)
        },
      },
    ],
    effect: null,
  },

  // ── MAPUTO POST-PEACE BOOM ────────────────────────────────────────────────────

  {
    id: 'moz_dep_maputo_boom',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_URBAN_MOZ(G) &&
      G.currentYear >= 1996 && G.currentYear <= 2013 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.mozDepMaputoBoom,
    text: `Maputo in the peace years rebuilds itself with energy: the Polana repainted, the avenue alive again, the churrasqueiras open, prawns up from Inhambane, South Africans discovering a neighbour they could not reach in the war. The aid workers are paid in dollars, and a small Mozambican middle class appears in the new malls. In the provinces the rebuilding is slower, and the gap between the two is part of what you know about your own country.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 2
      p.addFlag('moz_dep_maputo_boom')
      p.setMem('mozDepMaputoBoom', true)
    },
  },

  // ── THE HIDDEN DEBT / TUNA BONDS ─────────────────────────────────────────────

  {
    id: 'moz_dep_hidden_debt',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.mozDepHiddenDebt,
    text: 'The metical goes and keeps going and the price of bread doubles twice in a year. At the ministry the salaries come late, then later, then in halves. On the radio they explain that some loans were taken that nobody had been told about, for a tuna fleet, and the boats are tied up at Maputo with nothing on them. Your cousin at the port says four of them have not moved in three years and that the paint is coming off.',
    context: 'Between 2013 and 2014 the Mozambican government secretly borrowed about $2.2 billion from Credit Suisse and VTB Bank through three state companies — ProIndicus, EMATUM and Mozambique Asset Management — nominally for maritime security and tuna fishing. The IMF and donors learned of the loans in 2016 and suspended support. The metical collapsed, aid was cut and interest consumed the budget. Investigations found kickbacks and offshore payments; most of the fleet was never used.',
    choices: [
      {
        text: 'You feel this in your salary, your savings, the price of imported goods. The corruption is abstract; its effects are not.',
        tag: null,
        outcome: 'The distance between the deal that was done and the price of a litre of fuel is not infinite. The connection runs through the metical and the import costs and the wage freeze.',
        effect: (p) => {
          p.mo -= 600
          p.m -= 7
          p.r += 5
          p.addFlag('moz_dep_hidden_debt')
          p.setMem('mozDepHiddenDebt', true)
        },
      },
      {
        text: 'You watch this from within the state apparatus or the development sector, where the mechanisms are clearer and the helplessness is specific.',
        tag: null,
        outcome: 'You understand exactly what happened and exactly what cannot be undone. The understanding does not produce a remedy. It produces a very specific kind of exhaustion.',
        effect: (p) => {
          p.m -= 9
          p.r += 7
          p.e += 2
          p.addFlag('moz_dep_hidden_debt')
          p.setMem('mozDepHiddenDebt', true)
        },
      },
    ],
    effect: null,
  },

  // ── AIDS ORPHAN GENERATION (MOZAMBIQUE) ──────────────────────────────────────

  {
    id: 'moz_dep_aids_orphan',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_MOZ(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.mozDepAidsOrphan,
    text: `The dying came to the generation between twenty and forty, the parents. Grandmothers of seventy became mothers again; older brothers and sisters took over at fifteen. Households rearranged themselves around the empty places, and the church helped where it could. You grew up inside that rearrangement, raised in the gap the dying left.`,
    context: 'Adult HIV prevalence in Mozambique peaked at around 15 percent in the mid-2000s, leaving some 1.5 million orphans.',
    choices: [
      {
        text: 'Your grandmother raised you after both parents were gone. She is very old and she is the structure of your childhood.',
        tag: null,
        outcome: 'The grandmother\'s strength was the household. When it finally failed — when she became too old — you were already old enough to manage. Just.',
        effect: (p) => {
          p.m -= 7
          p.r += 6
          p.karma += 3
          p.addFlag('moz_dep_aids_orphan_moz')
          p.setMem('mozDepAidsOrphan', true)
        },
      },
      {
        text: 'An older sibling became the parent. Neither of you had a map for this.',
        tag: null,
        outcome: 'The sibling made decisions they were not ready to make. Most of them were correct. The ones that weren\'t you do not hold against them.',
        effect: (p) => {
          p.m -= 9
          p.r += 7
          p.e += 2
          p.addFlag('moz_dep_aids_orphan_moz')
          p.setMem('mozDepAidsOrphan', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: AIDS ORPHAN ADULT (MOZAMBIQUE) ──────────────────────────

  {
    id: 'moz_dep_aids_orphan_adult',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.flags.has('moz_dep_aids_orphan_moz') &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem?.mozDepAidsOrphanAdult,
    text: `You are the adult now. The person who raised you — grandmother, sibling — is old or gone. You have the generation above and the generation below and the generation that was supposed to be between them is absent or too thin. You are building your adult life inside this demographic shape. There are more of you than the outside world acknowledges. The generation that should have been your parents' is not there in its expected numbers. You fill the gap they left.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 3
      p.karma += 3
      p.setMem('mozDepAidsOrphanAdult', true)
    },
  },

]
