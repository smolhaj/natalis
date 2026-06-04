// Somalia character events
// Historical arcs: Siad Barre fall 1991, clan warfare and state collapse,
// Mogadishu warlord era, UNOSOM / Black Hawk Down 1993,
// Al-Shabaab 2006+, 2011 famine, Somaliland stability (Isaaq/north).
// The clan is the state when there is no state.

export const SOMALIA_EVENTS = [

  {
    id: 'som_state_collapse_1991',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      G.age >= 15 &&
      !G.mem.somCollapse,
    text: 'January 1991. Siad Barre flees Mogadishu in a tank. The state, such as it was — the police, the courts, the electricity grid, the currency — stops in the way that things stop when the centre has gone. What fills the space is not nothing. What fills it is clan militia, warlords with territories, checkpoints that change hands. You are learning what life is like when there is no government, which turns out to be very different from what political philosophy imagines it to be.',
    choices: [
      {
        text: 'You are in Mogadishu when it collapses.',
        tag: null,
        outcome: 'The streets you knew have been redrawn by which faction controls which block. You learn the new map. You keep it in your head because writing it down is a kind of evidence.',
        effect: (p) => { p.m -= 18; p.h -= 6; p.r += 10; p.addFlag('somalia_state_collapse'); p.setMem('somCollapse', true) },
      },
      {
        text: 'You leave when the collapse begins.',
        tag: null,
        outcome: 'The destination — a camp, a relative\'s house in a different region, a boat north — is a risk you can calculate against the risk of staying. You have calculated and left.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('somalia_state_collapse'); p.addFlag('experienced_displacement'); p.setMem('somCollapse', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'som_clan_calculus',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear >= 1991 &&
      G.age >= 12 && G.age <= 22 &&
      !G.mem.somClan,
    text: 'The clan is not an abstraction. It is who picks up the phone when you call at 2am, who vouches for you at the checkpoint, who the compensation goes to if something happens to you. The xeer — customary law — runs on clan obligation. When the state disappeared, the clan did not disappear. It became more visible. Your clan affiliation is one of the first things any stranger tries to establish. The question can be polite or it can be something else. You have learned to read which it is.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.e += 3; p.addFlag('somali_clan_identity'); p.setMem('somClan', true) },
  },

  {
    id: 'som_unosom_black_hawk_down',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear === 1993 &&
      G.age >= 15 &&
      !G.mem.somUNOSOM,
    text: 'October 3–4, 1993. The Battle of Mogadishu: American special forces attempt to capture lieutenants of warlord Mohamed Farrah Aidid. Two Black Hawk helicopters are shot down. Eighteen American soldiers and between 300 and 1,000 Somali fighters and civilians are killed. The event will be known internationally as Black Hawk Down. What it means from inside Mogadishu is different from what it means from the country that made the film about it.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('mogadishu_1993_generation'); p.setMem('somUNOSOM', true) },
  },

  {
    id: 'som_alshabaab_generation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear >= 2008 && G.currentYear <= 2022 &&
      G.age >= 16 &&
      !G.mem.somAlShabaab,
    text: 'Al-Shabaab — "the youth" — emerged from the Islamic Courts Union after the Ethiopian invasion in 2006 broke the ICU\'s brief, if authoritarian, peace. In the areas it controls, al-Shabaab imposes its version of Islamic law: music is banned, mobile phones require approval, women\'s movement is restricted. It also collects taxes, runs courts, and provides a kind of order in places where no other order exists. The relationship between the population and al-Shabaab is not only terror — it is also the fact that al-Shabaab is sometimes the only institution present.',
    choices: [
      {
        text: 'You live in al-Shabaab-controlled territory.',
        tag: null,
        outcome: 'The music is gone from the street. The phone requires managing. You have adapted to the rules the way you adapted to the rules before, which is to say: carefully, with attention to what is watched and what is not.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('alshabaab_generation'); p.setMem('somAlShabaab', true) },
      },
      {
        text: 'You are in Mogadishu, which AMISOM controls.',
        tag: null,
        outcome: 'The African Union peacekeepers have pushed al-Shabaab out of the capital. The city is rebuilding — slowly, block by block. The threat exists at the edges and in the form of bombs in markets.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('alshabaab_generation'); p.setMem('somAlShabaab', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'som_remittance_economy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear >= 2000 &&
      G.age >= 18 &&
      !G.mem.somRemittance,
    text: 'Somalia runs on money sent from outside. The diaspora — Minnesota, Oslo, London, Nairobi — wires money through hawala brokers to families who have no banks, no pensions, no formal economy. The remittance is the social safety net. $1.5 billion a year, more than all foreign aid combined. You have a relative abroad. The phone call and the money transfer are two parts of the same relationship. The relative abroad left — by boat, by plane, by documents or without them — and stayed, and sends.',
    choices: null,
    effect: (p) => { p.m += 4; p.mo += 1200; p.addFlag('somali_diaspora_connection'); p.setMem('somRemittance', true) },
  },

  {
    id: 'som_famine_2011',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.currentYear === 2011 &&
      G.age >= 20 &&
      !G.mem.somFamine2011,
    text: 'The drought of 2011 arrives into a country that al-Shabaab controls and that international NGOs cannot safely reach in many areas. The UN declares famine — the first official famine declaration in thirty years. By the end of the year, 260,000 people have died, half of them children under five. The bodies of the drought and the bodies of the conflict are in the same places. You are in the country that is receiving the aid or is too inaccessible for the aid to arrive.',
    choices: null,
    effect: (p) => { p.m -= 16; p.h -= 6; p.r += 10; p.addFlag('somalia_famine_2011'); p.setMem('somFamine2011', true) },
  },

  {
    id: 'som_somaliland_stability',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Somalia' &&
      G.character.ethnicity === 'somali_isaaq' &&
      G.currentYear >= 1993 &&
      G.age >= 15 &&
      !G.mem.somSomaliland,
    text: 'Somaliland declared independence from the rest of Somalia in 1991 when Siad Barre fell — a largely Isaaq region in the north, with Hargeisa as its capital. It is not recognized by any country, but it has a functioning government, elections, a police force, a currency, a constitution. It has done this without international recognition, without foreign aid at the levels given to Somalia proper, without the violence that consumed the south. You are growing up in the unrecognized state that works.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.e += 3; p.addFlag('somaliland_generation'); p.setMem('somSomaliland', true) },
  },

]
