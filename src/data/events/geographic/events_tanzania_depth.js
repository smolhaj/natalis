// events_tanzania_depth.js
// Tanzania depth: Zanzibar Revolution 1964, Tanzania-Uganda War 1978–79,
// TAZARA Chinese railway, AIDS epidemic, artisanal gold mining,
// Magufuli era 2015–21, Zanzibar identity as distinct from mainland.
//
// Companion to events_tanzania.js (which covers: independence 1961,
// Arusha Declaration 1967, ujamaa + villagisation, Swahili education,
// multiparty 1995, Nyerere death 1999).

const IS_TANZANIA = (G) => G.character.country?.name === 'Tanzania'

export const TANZANIA_DEPTH_EVENTS = [

  // ── ZANZIBAR REVOLUTION 1964 ───────────────────────────────────────────────

  {
    id: 'tan_zanzibar_revolution',
    phase: null,
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
        outcome: 'The sultanate is gone. What the revolution left in its wake — the new Zanzibari government, the disappearances, the authoritarian quality of the new order — is also on the record. Liberation is not simple.',
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
        outcome: 'Some families went to Oman, to the Gulf, to the mainland. Some stayed and navigated. The texture of what was lost — a world that had existed for centuries, gone in weeks — is your inheritance.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1978 && G.currentYear <= 1980 &&
      G.age >= 18 &&
      !G.mem?.tanUgandaWar,
    text: `October 1978, and Idi Amin's army crosses into Kagera and occupies the land north of the river. Nyerere mobilises, and the Tanzanian army and the Ugandan exiles push back into Uganda and take Kampala in April, and Amin flees to Libya. It costs Tanzania money it does not have and soldiers it will remember. By what it stopped, it is one of the most defensible wars on the continent, though the rest of Africa, bound to a rule of non-interference, does not say so.`,
    context: 'Amin\'s regime killed an estimated 100,000 to 500,000 Ugandans. The war cost Tanzania more than 500 million dollars.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 &&
      !G.mem?.tanTazara,
    text: `The TAZARA train comes through at intervals nobody can quite predict, on a line the Western banks said could not be built and would not pay for. The Chinese built it, and towns grew up around its stations where there was nothing before. When it stops it brings Dar es Salaam with it, rice and cloth and news, and takes the other things away. The idea was Nyerere's non-alignment. The rails are Chinese steel.`,
    context: 'The 1,860 km Tanzania-Zambia Railway was built by China between 1970 and 1975 with some 15,000 Chinese workers.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2000 &&
      G.age >= 25 &&
      !G.mem?.tanAids,
    text: `Slim, they call it: ukimwi, the slimming disease, for what it does to a body. It came along the trucking routes and into the villages faster than any treatment could follow. People you know are sick with something that has a name and no cure, and the funerals pile up, and so do the children left behind. The grandmother raising three orphaned grandchildren is common enough to have her own word. For this decade you live in the gap between the disease and the drugs.`,
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
    phase: null,
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.tanGold,
    text: `The shafts go down by hand, shored with timber that comes from the nearby forest. You go down because the money is different from farming money — three months at the mine can produce what three seasons of maize cannot. The government calls it *madini* — minerals — and has a framework for small-scale artisanal miners that in practice means the framework was designed for the large operations and you are operating in the gap between the law and what the law is enforced to do. Mercury for the amalgamation process. The dust that stays in the lungs. The calculation: the risk, the money, the alternative.`,
    choices: [
      {
        text: 'Work the mine for a season.',
        tag: null,
        outcome: 'The money comes. The conditions are also real. You come back with what you went for.',
        effect: (p) => {
          p.mo += 2000
          p.h -= 6
          p.setMem('tanGold', true)
        },
      },
      {
        text: 'The risk is not worth the money. Return to farming.',
        tag: null,
        outcome: 'Farming is a risk. The years of drought ahead are not yet legible from here.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      !G.mem?.tanMagufuli,
    text: (G) => 'He cancels the independence day parade and puts the country to work sweeping the streets instead, and he is there with a broom on the television. He sacks a hospital director on camera. People at the bus stand call him the Bulldozer and mean it warmly, and the newspaper that ran the other story last month is not on the stand.' + (G.currentYear >= 2020 ? ' In 2020 he says the country is free of the virus and that steam and prayer will hold.' : '') + (G.currentYear >= 2021 ? ' In March they announce he is dead of heart failure.' : ''),
    context: 'John Magufuli was president of Tanzania from 2015 until his death in March 2021. He cut government spending, replaced the independence anniversary with a national clean-up day and dismissed officials publicly, while opposition figures were arrested, newspapers suspended and prosecutions for homosexuality increased. He declared Tanzania free of COVID-19 in June 2020, halted testing and reporting, and rejected vaccines. Officials attributed his death to heart failure; opposition figures said he had contracted the virus.',
    choices: [
      {
        text: `There was development. The roads. The clean cities. You saw what the Bulldozer was moving.`,
        tag: null,
        outcome: (G) => G.currentYear >= 2020 ? 'He was also burying the statistics and arresting journalists and dismissing COVID. The accounting of him requires both columns.' : 'He is also arresting journalists and closing newspapers. The accounting of him requires both columns.',
        effect: (p) => {
          p.m -= 5
          p.addFlag('tan_magufuli_generation')
          p.setMem('tanMagufuli', true)
        },
      },
      {
        text: (G) => G.currentYear >= 2021 ? 'His death was what COVID denial looks like at the top. The country has a vaccine gap to close.' : 'The newspaper that is not on the stand is the story. You notice what is missing.',
        tag: null,
        outcome: (G) => G.currentYear >= 2021 ? 'Samia Suluhu Hassan becomes president — the first female president in East African history. She reverses the vaccine policy. The damage to the vaccination programme is real but partly repaired.' : 'You stop saying some things on the phone. You are not the only one who has stopped.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      IS_TANZANIA(G) &&
      G.flags.has('tan_zanzibar_revolution_generation') &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.tanZanzibarId,
    text: `Zanzibar is part of Tanzania and is not part of Tanzania. It has its own president, its own government, its own house of representatives. The 1964 union is held together by its usefulness and by the fact that neither side has been willing to test what separation would cost. The spice economy — cloves, nutmeg, the archipelago's long commercial history as a hub for Indian Ocean trade — is not the mainland's economy. The Swahili of Stone Town is not the Swahili of Dar es Salaam. The density of Arab, Indian, African, and Persian history in the old city is not replicated anywhere on the mainland. You are Zanzibari in a country that includes you but was not made for you.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m -= 3
      p.r += 4
      p.setMem('tanZanzibarId', true)
    },
  },

]
