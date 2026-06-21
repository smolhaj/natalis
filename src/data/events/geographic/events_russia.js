// Russia-specific arc events
// Soviet-Afghan War service, Beslan 2004, Bolotnaya 2011-12,
// Navalny's death 2024. Complements existing post-Soviet events
// (events_post_soviet.js) and Russia events embedded in events.js
// (ru_chechnya_war, ru_ukraine_invasion_2022, ru_mobilization_2022).

export const RUSSIA_EVENTS = [

  {
    id: 'ru_afghan_war_served',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1979 && G.currentYear <= 1992 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.ruAfghanServed,
    text: 'Afghanistan. The conscription notice does not say Afghanistan but that is where the unit is deployed. The altitude is 2,000 metres and the air does not have enough in it. The mujahideen fight differently from the exercises. The ammunition resupply is unreliable. The casualties are flown back in zinc coffins with sealed lids and the official figures are not published. In 1988, Gorbachev begins the withdrawal. In 1989, the last Soviet soldier crosses back over the Amu Darya. The war that was not officially a war is over. The country you come home to has five more years.',
    choices: [
      {
        text: 'You serve. You survive. You come home to a country that does not want to discuss where you were.',
        tag: null,
        outcome: 'The Afghan veterans — afgantsy — form their own associations because the official recognition does not come and they need someone who understands without being told.',
        effect: (p) => { p.m -= 14; p.h -= 8; p.r += 7; p.karma += 4; p.addFlag('soviet_afghan_veteran'); p.addFlag('veteran_unthanked'); p.setMem('ruAfghanServed', true); },
      },
      {
        text: 'Your unit is deployed but you find a way out — injury, connections, timing.',
        tag: null,
        outcome: 'The men from your conscription year came back changed or did not come back. You carry what you avoided, which is not nothing.',
        effect: (p) => { p.r += 5; p.m -= 4; p.setMem('ruAfghanServed', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_beslan_2004',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2004 && G.currentYear <= 2006 &&
      G.age >= 10 &&
      !G.mem?.ruBeslan,
    text: 'September 1, 2004. School Number One, Beslan, North Ossetia. Chechen separatists take more than 1,100 hostages — children, parents, teachers, coming for the first day of school. Three days. The gymnasium. The heat of the August bodies. The negotiations that do not produce anything. On September 3, explosions inside the building and the security forces rush in and the children run through gunfire across a field toward the houses across the road. Three hundred and thirty-four dead. A hundred and eighty-six of them children. The numbers that were official and the numbers that were not were different. You watch it on the television for three days and then the school year begins somewhere else and you send your children.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.h -= 3
      p.addFlag('beslan_generation')
      p.setMem('ruBeslan', true)
    },
  },

  {
    id: 'ru_bolotnaya_2011',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2011 && G.currentYear <= 2013 &&
      G.age >= 18 && G.age <= 55 &&
      !G.mem?.ruBolotnaya,
    text: 'December 2011. The parliamentary election results are published and people go to Bolotnaya Square with white ribbons and signs that say "Russia without Putin." The largest protests in twenty years. In February 2012, a hundred thousand people on Sakharov Prospekt. The Kremlin watches the protests and the Kremlin prepares. The crackdown begins in 2012: the Bolotnaya prisoners, the foreign agent law, the expanded definition of treason, the systematic use of administrative pressure to make political activity too expensive. The white ribbon fades.',
    choices: [
      {
        text: 'You go to the square. You are holding a white ribbon.',
        tag: null,
        outcome: 'You are there. You are part of the hundred thousand. You feel something you have not felt since 1991. The system has already begun its calculation.',
        effect: (p) => { p.m += 6; p.karma += 6; p.addFlag('bolotnaya_generation'); p.addFlag('political_active'); p.setMem('ruBolotnaya', true); },
      },
      {
        text: 'You watch from the periphery — interested, uncertain of the cost.',
        tag: null,
        outcome: 'The periphery is also a position. You are in Moscow or Petersburg in these years and you know what the square feels like even from outside it.',
        effect: (p) => { p.m += 2; p.addFlag('bolotnaya_generation'); p.setMem('ruBolotnaya', true); },
      },
      {
        text: 'You do not go. The system does not change and the people who go will pay.',
        tag: null,
        outcome: 'The Bolotnaya prisoners are tried in 2014. The people who went pay. Your calculation was not wrong. It is also not the only thing it was.',
        effect: (p) => { p.r += 5; p.e += 2; p.setMem('ruBolotnaya', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_1991_coup_collapse',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 14 &&
      !G.mem?.ru1991Coup,
    text: 'August 19, 1991. The announcement comes on the radio at six in the morning: Gorbachev is ill, the State Committee on the State of Emergency has assumed power. The eight men at the televised press conference look shaken — hands trembling at the podium, eyes not focused. On August 21, Yeltsin climbs on a tank at the White House and reads a decree declaring the coup illegal. The coup collapses. By December 25, the flag over the Kremlin is replaced. The country that existed on August 18 does not exist anymore. You watched this from where you were standing and you know that a country can simply end.',
    choices: [
      {
        text: 'You are at the barricades, or at the White House, or in the crowd that makes the difference.',
        tag: null,
        outcome: 'The tanks stop. The coup fails. People like you standing where you stood — that is part of why they stop. You know this.',
        effect: (p) => { p.m += 8; p.karma += 8; p.r += 5; p.addFlag('russia_1991_generation'); p.addFlag('political_active'); p.setMem('ru1991Coup', true); },
      },
      {
        text: 'You watch the three days unfold on television and from wherever you are.',
        tag: null,
        outcome: 'Three days when it was not clear what kind of country this was going to be. On the fourth day, it became clear that the country was going to be a different kind. You were watching when this happened.',
        effect: (p) => { p.m += 4; p.r += 4; p.addFlag('russia_1991_generation'); p.setMem('ru1991Coup', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_putin_stability_bargain',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2000 && G.currentYear <= 2012 &&
      G.age >= 25 &&
      !G.mem?.ruPutinStability,
    text: (G) => {
      const sawChaos = G.flags.includes('ps_savings_wiped') || G.flags.includes('ps_sudden_poverty') || G.flags.includes('shock_therapy_generation')
      if (sawChaos) {
        return 'After the nineties, Putin. The oil price is rising. The wages are actually arriving. The streets are not what they were in 1993 or 1998. The television is managed and the opposition is managed and the outcomes are managed, but the word for what the 1990s were was also a word with no good translation. The exchange the new arrangement offers — stability for political passivity — is an exchange you are positioned to evaluate from the inside.'
      }
      return 'The early 2000s in Russia: oil revenue, rising wages, the end of the acute crisis of the nineties. Putin\'s approval rating is consistently above seventy percent and the reason is legible — the previous decade was the decade of factory closures and ruble collapses and oligarchs, and this decade is not that decade. The managed democracy: elections happen, outcomes are managed, television is managed. For many people, the management is not the important part.'
    },
    choices: [
      {
        text: 'The stability is real and the price is acceptable.',
        tag: null,
        outcome: 'The oil decade: you build something in it. The building is real. The price of the stability — what is not sayable, what is not possible, what is managed — you notice but it does not dominate what you are building.',
        effect: (p) => { p.m += 6; p.w += 5; p.addFlag('putin_stability_generation'); p.setMem('ruPutinStability', true); },
      },
      {
        text: 'The managed part of "managed democracy" is what matters.',
        tag: null,
        outcome: 'You take note of what is managed and what the management costs and what it is for. The note stays in you for the subsequent years, which provide additional evidence.',
        effect: (p) => { p.m += 2; p.r += 5; p.addFlag('putin_stability_generation'); p.addFlag('inner_dissent'); p.setMem('ruPutinStability', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_navalny_2024',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2024 &&
      G.age >= 30 &&
      (G.flags.includes('bolotnaya_generation') || G.flags.includes('russia_2022_generation') || G.flags.includes('russia_ukraine_exile')) &&
      !G.mem?.ruNavalny,
    text: (G) => {
      const inExile = G.flags.includes('russia_ukraine_exile')
      if (inExile) {
        return 'February 16, 2024. Alexei Navalny dies in IK-6 Polar Wolf, a penal colony above the Arctic Circle. He was forty-seven. He had been serving a nineteen-year sentence. The cause of death is listed as "natural causes." The country where you now live reports this clearly. In the country you came from, it is reported differently. From where you are standing you can see both versions simultaneously, which is one of the things exile gives you that you did not ask for.'
      }
      return 'February 16, 2024. Alexei Navalny dies in IK-6 Polar Wolf. He was forty-seven. He went back to Russia in 2021 knowing what the risk was. His associates had told him what the risk was. He went back anyway because he had said publicly that he would not stay out and he returned and was immediately arrested and the sentence was extended and extended until it was nineteen years and then he died in the Arctic. The word "courage" is insufficient. It is also the word.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.karma += 4
      p.r += 4
      p.setMem('ruNavalny', true)
    },
  },

]
