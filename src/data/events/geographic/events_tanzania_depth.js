// events_tanzania_depth.js
// Tanzania depth: Zanzibar Revolution 1964, Tanzania-Uganda War 1978–79,
// TAZARA Chinese railway, AIDS epidemic, artisanal gold mining,
// Magufuli era 2015–21, Zanzibar identity as distinct from mainland.
//
// Companion to events_tanzania.js (which covers: independence 1961,
// Arusha Declaration 1967, ujamaa + villagisation, Swahili education,
// multiparty 1995, Nyerere death 1999).

const IS_TANZANIA = (G) => G.character.country?.name === 'Tanzania'
const IS_ZANZIBAR = (G) => G.character.country?.name === 'Tanzania' && G.currentPlace?.includes('Zanzibar')

export const TANZANIA_DEPTH_EVENTS = [

  // ── ZANZIBAR REVOLUTION 1964 ───────────────────────────────────────────────

  {
    id: 'tan_zanzibar_revolution',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1964 && G.currentYear <= 1966 &&
      G.age >= 6 &&
      !G.mem?.tanZanzibar,
    text: `January 12, 1964. The revolution. On Zanzibar, the African majority — who had lived under the rule of Arab sultans backed by the British through the colonial period and then through independence in December 1963 — rose and overthrew the sultanate. The Arab and South Asian population was killed, expelled, or dispossessed over the weeks that followed. Between three and twelve thousand people died. Six months later, Zanzibar merged with Tanganyika to form Tanzania — the only African independence-era union to hold. What is kept in memory depends on which side of the revolution's events your family was on.`,
    choices: [
      {
        text: 'Your family is Zanzibari African. The revolution ended a system that excluded you.',
        tag: null,
        outcome: 'The sultanate is gone. What the revolution left in its wake — the new Zanzibari government, the disappearances, the particular authoritarian quality of the new order — is also on the record. Liberation is not simple.',
        effect: (p) => {
          p.m += 6
          p.r += 4
          p.addFlag('tan_zanzibar_revolution_generation')
          p.setMem('tanZanzibar', true)
        },
      },
      {
        text: 'Your family is Arab Zanzibari. The revolution meant displacement.',
        tag: null,
        outcome: 'Some families went to Oman, to the Gulf, to the mainland. Some stayed and navigated. The specific texture of what was lost — a world that had existed for centuries, gone in weeks — is your inheritance.',
        effect: (p) => {
          p.m -= 14
          p.r += 10
          p.addFlag('tan_zanzibar_revolution_generation')
          p.setMem('tanZanzibar', true)
        },
      },
    ],
    effect: null,
  },

  // ── TANZANIA-UGANDA WAR 1978–79 ────────────────────────────────────────────

  {
    id: 'tan_uganda_war_1978',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1978 && G.currentYear <= 1980 &&
      G.age >= 18 &&
      !G.mem?.tanUgandaWar,
    text: `October 1978. Idi Amin's forces invade the Kagera region of Tanzania, occupying a strip of territory north of the river. Nyerere mobilises. What follows is the Tanzania-Uganda War — the Tanzanian army, with Ugandan exiles, pushing back into Uganda, taking Kampala in April 1979. Idi Amin flees to Libya and then Saudi Arabia. The war costs Tanzania more than $500 million and a significant toll in soldiers, and ends a regime that killed between 100,000 and 500,000 of its own people. It is, by the measure of what it stopped, one of the most defensible military actions in African history. The continent does not universally say so — the OAU principle of non-interference in member states is not designed for cases where the member state is actively committing mass murder.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.karma += 4
      p.setMem('tanUgandaWar', true)
    },
  },

  // ── TAZARA RAILWAY ────────────────────────────────────────────────────────

  {
    id: 'tan_tazara_railway',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 &&
      !G.mem?.tanTazara,
    text: `The TAZARA railway — Tanzania-Zambia — runs for 1,860 kilometres through the interior. The Chinese built it: 15,000 Chinese workers, three years, finished 1975. The railway was what the Western countries said could not be done, declined to finance, and would not believe when it was done. The line runs through territory that had no railway before, past stations that become the reason towns exist. The train arrives at intervals that are not always predictable. When it arrives it brings things from Dar es Salaam — rice, cloth, the city — and takes things the other way. The line is also the longest railway China ever built outside China. The ideology is Nyerere's non-alignment. The material is Chinese steel.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 2
      p.setMem('tanTazara', true)
    },
  },

  // ── AIDS IN TANZANIA ──────────────────────────────────────────────────────

  {
    id: 'tan_aids_epidemic',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2000 &&
      G.age >= 25 &&
      !G.mem?.tanAids,
    text: `Slim — that is what they call it in Tanzania: *ukimwi*, or the slimming disease, because of what it does to the body over time. The epidemic arrived along the trucking routes — Dar es Salaam to Nairobi, the commercial corridors — and spread into the rural interior faster than treatment could follow. By 1990 Tanzania has one of the highest infection rates in the world. People you know are sick with something that has a name now but no cure. The funerals accumulate. The children left behind accumulate. The grandmother raising three orphaned grandchildren has become a common enough category that it has its own term. The treatment — antiretrovirals — will eventually arrive, but for this decade you live in the gap between the disease and its management.`,
    choices: [
      {
        text: 'Someone in your immediate world is dying of this.',
        tag: null,
        outcome: 'You do what you can do. You watch the process and you remember it specifically. The death is not abstract.',
        effect: (p) => {
          p.m -= 15
          p.h -= 4
          p.r += 8
          p.addFlag('aids_generation')
          p.setMem('tanAids', true)
        },
      },
      {
        text: 'The epidemic is present at the edges of your life, reshaping it.',
        tag: null,
        outcome: 'The funerals. The children left behind. The grandmother who has three more children now. The epidemic is in the background of your decade without ever being absent from it.',
        effect: (p) => {
          p.m -= 8
          p.r += 5
          p.addFlag('aids_generation')
          p.setMem('tanAids', true)
        },
      },
    ],
    effect: null,
  },

  // ── ARTISANAL GOLD MINING ─────────────────────────────────────────────────

  {
    id: 'tan_gold_mining',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.tanGold,
    text: `The shafts go down by hand, shored with timber that comes from the nearby forest. You go down because the money is different from farming money — three months at the mine can produce what three seasons of maize cannot. The government calls it *madini* — minerals — and has a framework for small-scale artisanal miners that in practice means the framework was designed for the large operations and you are operating in the gap between the law and what the law is enforced to do. Mercury for the amalgamation process. The dust that stays in the lungs. The specific calculation: the risk, the money, the alternative.`,
    choices: [
      {
        text: 'Work the mine for a season.',
        tag: null,
        outcome: 'The money is real. The conditions are also real. You come back with what you went for.',
        effect: (p) => {
          p.mo += 2000
          p.h -= 6
          p.setMem('tanGold', true)
        },
      },
      {
        text: 'The risk is not worth the money. Return to farming.',
        tag: null,
        outcome: 'Farming has its own risk. The years of drought ahead are not yet legible from here.',
        effect: (p) => {
          p.m -= 3
          p.r += 3
          p.setMem('tanGold', true)
        },
      },
    ],
    effect: null,
  },

  // ── MAGUFULI ERA 2015–2021 ─────────────────────────────────────────────────

  {
    id: 'tan_magufuli_era',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      !G.mem?.tanMagufuli,
    text: `John Pombe Magufuli wins the 2015 election. He is called *Tingatinga* — the Bulldozer — for his infrastructure push and for his willingness to fire officials publicly and immediately. He cancels the independence anniversary celebration and organises a national clean-up day instead. He cuts official travel budgets. He is popular. He is also increasingly authoritarian — opposition politicians arrested, journalists prosecuted, homosexuality enforced as criminal. When COVID-19 arrives in 2020, he declares Tanzania COVID-free, cancels testing, and says the virus can be cured with prayer, ginger, and steam. He refuses vaccines. In March 2021, the government announces he has died, at sixty-one, of heart failure. The announcement is careful not to specify when he became ill.`,
    choices: [
      {
        text: `The development was real. The roads. The clean cities. You saw what the Bulldozer was moving.`,
        tag: null,
        outcome: 'He was also burying the statistics and arresting journalists and dismissing COVID. The accounting of him requires both columns.',
        effect: (p) => {
          p.m -= 5
          p.addFlag('tan_magufuli_generation')
          p.setMem('tanMagufuli', true)
        },
      },
      {
        text: `His death was what COVID denial looks like at the top. The country has a vaccine gap to close.`,
        tag: null,
        outcome: 'Samia Suluhu Hassan becomes president — the first female president in East African history. She reverses the vaccine policy. The damage to the vaccination programme is real but partly repaired.',
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.addFlag('tan_magufuli_generation')
          p.setMem('tanMagufuli', true)
        },
      },
    ],
    effect: null,
  },

  // ── ZANZIBAR AS DISTINCT PLACE ────────────────────────────────────────────

  {
    id: 'tan_zanzibar_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.flags.has('tan_zanzibar_revolution_generation') &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.tanZanzibarId,
    text: `Zanzibar is part of Tanzania and is not part of Tanzania. It has its own president, its own government, its own house of representatives. The 1964 union is held together by its usefulness and by the fact that neither side has been willing to test what separation would cost. The spice economy — cloves, nutmeg, the archipelago's long commercial history as a hub for Indian Ocean trade — is not the mainland's economy. The Swahili of Stone Town is not the Swahili of Dar es Salaam. The specific density of Arab, Indian, African, and Persian history in the old city is not replicated anywhere on the mainland. You are Zanzibari in a country that includes you but was not made for you.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m -= 3
      p.r += 4
      p.setMem('tanZanzibarId', true)
    },
  },

]
