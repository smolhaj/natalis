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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1977 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.mozDepAldeias,
    text: `FRELIMO's Operation Production and the aldeias comunais: the government decided that the scattered homestead pattern of rural Mozambique was inefficient, feudal, incompatible with socialist development. Starting in 1977, rural families were instructed — and sometimes compelled — to relocate to communal villages where collective agriculture, schools, and clinics would be provided. About 1.5 million people moved. The land they left was their machamba — the family plot that fed them, that they knew, that their grandparents had worked. The collective plots in the new villages were unfamiliar ground with different drainage, different soil. The experiment failed. The production numbers fell. By 1982 the policy was quietly abandoned. The families had moved. Most stayed.`,
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
    phase: 'young_adult',
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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2005 &&
      G.age >= 6 && G.age <= 18 &&
      G.flags.has('mozambican_civil_war_generation') &&
      !G.mem?.mozDepLandmine,
    text: `The peace accords were signed in 1992. The landmines were not. RENAMO and FRELIMO together laid between one and two million landmines in the rural areas during the war — in fields, on paths, near water sources, around bridges, in the exact places that rural life requires you to go. After 1992 the demining organisations came: HALO Trust, Norwegian People's Aid, the UN. The work is slow. A village reports a minefield. Deminers mark it, clear it methodically. Fields that have been unplantable for years become available. In the years before the clearing, people continue to lose feet, hands, eyes. Children who are curious about metal objects in the ground.`,
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
    text: `The HALO Trust reports Mozambique cleared of landmines in 2015 — one of the first heavily-mined countries to declare itself clean. The announcement is made and celebrated internationally. You receive this information in a specific way, which is the way you receive information about a thing you have lived inside and are now seeing described from outside. The word "cleared" has a meaning on a press release and a meaning in a body.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_RURAL_MOZ(G) &&
      G.currentYear >= 1994 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.mozDepCashew,
    text: `The cashew. Mozambique has millions of cashew trees, planted across the northern and central provinces, the basis of the rural economy for tens of thousands of families. Under FRELIMO's socialism, processing was done domestically — a state monopoly, but local employment, local value. The World Bank, as a condition of structural adjustment, required that export tariffs on raw cashews be removed. The argument was efficiency: raw nuts could be sold to India for processing and everyone would benefit from comparative advantage. The tariff was removed in 1995. Indian processing facilities, with much lower labour costs, took the raw nuts. The Mozambican processing factories — employing 10,000 workers, mostly women — closed within years. The cashew trees are still there. The value of the nut leaves.`,
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
        outcome: 'The job was not high-paying. It was reliable and it was yours. The economists who made this decision have papers that explain why it was correct. You have a different accounting.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_URBAN_MOZ(G) &&
      G.currentYear >= 1996 && G.currentYear <= 2013 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.mozDepMaputoBoom,
    text: `Maputo in the peace years: the city rebuilt itself with a specific energy. The Polana Hotel was refurbished. The Avenida Julius Nyerere came back to life. The churrasqueiras — barbecue restaurants — reopened or opened new. Prawns from the Inhambane coast. South African tourists discovering a neighbour that had been inaccessible during the war. Expat development workers with salaries denominated in dollars. A Mozambican middle class, small, growing, visible in the new malls. The contrast between Maputo's post-peace energy and the provinces, where the reconstruction was slower, was stark and is part of what you know about your own country.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.mozDepHiddenDebt,
    text: `Between 2013 and 2014, the Mozambican government secretly contracted $2.2 billion in loans from international banks — Credit Suisse, VTB Bank — through three state-owned companies: ProIndicus, EMATUM, and Mozambique Asset Management. The stated purpose was maritime security and tuna fishing. The IMF and donor governments were not informed. When the loans were disclosed in 2016, the IMF suspended its program. Aid flows were cut. The metical collapsed. Interest payments consumed the budget. The loans could not be repaid. What happened to the money is disputed. Investigations pointed to kickbacks, arms deals, offshore accounts. The tuna fleet was mostly unused. This is the crisis that defines the economy during your working years.`,
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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_MOZ(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.mozDepAidsOrphan,
    text: `Mozambique's HIV prevalence peaked at around 15% among adults in 2004. The dying happened in the generation between twenty and forty — the parents. By 2005, Mozambique had 1.5 million orphans, with the proportion of AIDS orphans among the highest in the world. Grandmothers became primary caregivers at seventy. Older siblings took over at fifteen. The household reorganised around the absence. The church helped when it could and sometimes extracted when it shouldn't. You grew up inside this reorganisation — raised in the gap that the dying left.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_MOZ(G) &&
      G.flags.has('moz_dep_aids_orphan_moz') &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem?.mozDepAidsOrphanAdult,
    text: `You are the adult now. The person who raised you — grandmother, sibling — is old or gone. You have the generation above and the generation below and the generation that was supposed to be between them is absent or too thin. You are building your adult life inside this specific demographic shape. There are more of you than the outside world acknowledges. The generation that should have been your parents' is not there in its expected numbers. You fill the gap they left.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 3
      p.karma += 3
      p.setMem('mozDepAidsOrphanAdult', true)
    },
  },

]
