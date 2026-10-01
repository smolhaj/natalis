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
    text: 'The notice does not say Afghanistan, but that is where the unit goes. At two thousand metres the air does not have enough in it, the mujahideen do not fight like the exercises, and the resupply is unreliable. The dead go home in zinc coffins with the lids sealed, and the figures are not published. In 1989 the last Soviet soldier crosses back over the Amu Darya. The country you come home to has a few years left.',
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
        outcome: 'The men from your conscription year came back changed or did not come back. You carry what you avoided.',
        effect: (p) => { p.r += 5; p.m -= 4; p.setMem('ruAfghanServed', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_beslan_2004',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 2004 && G.currentYear <= 2006 &&
      G.age >= 10 &&
      !G.mem?.ruBeslan,
    text: 'It is the first of September, so the children carry flowers in to the school. For three days the television shows the same low building and the same field in front of it. On the third day the roof goes and the children come out across the field in their underwear because of the heat inside, some running, some being carried. Two weeks later you take your own child to the gate and stand there longer than you need to.',
    context: 'On 1 September 2004 armed Chechen separatists seized School Number One in Beslan, North Ossetia, taking over 1,100 hostages on the first day of the school year. The siege ended on 3 September with explosions and a chaotic assault. 334 people died, 186 of them children. Official and independent accounts of the ending diverged, and the parents\' committee spent years contesting the state\'s version.',
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
    phase: null,
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
        outcome: 'The Bolotnaya prisoners are tried in 2014. The people who went pay. Your calculation was right, and it was also something else.',
        effect: (p) => { p.r += 5; p.e += 2; p.setMem('ruBolotnaya', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ru_1991_coup_collapse',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Russia' &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 14 &&
      !G.mem?.ru1991Coup,
    text: 'August 19, 1991. At six in the morning the radio says Gorbachev is ill and a committee has taken power, and on television the men of the committee look shaken, hands trembling on the table. On the 21st Yeltsin climbs onto a tank outside the White House and reads a decree, and the coup collapses. By December 25 there is a different flag over the Kremlin. You watched this from where you were standing, and you know now that a country can simply end.',
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
    phase: null,
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
        outcome: 'The oil decade: you build something in it. You build. The price of the stability — what is not sayable, what is not possible, what is managed — you notice but it does not dominate what you are building.',
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
      // An event that opens "February 16, 2024" is news, and news has an upper
      // bound. Unbounded it narrated the death as it happened in 2035, eleven
      // years late.
      G.currentYear >= 2024 && G.currentYear <= 2026 &&
      G.age >= 30 &&
      (G.flags.includes('bolotnaya_generation') || G.flags.includes('russia_2022_generation') || G.flags.includes('russia_ukraine_exile')) &&
      !G.mem?.ruNavalny,
    text: (G) => {
      const inExile = G.flags.includes('russia_ukraine_exile')
      if (inExile) {
        return 'February 16, 2024. Alexei Navalny dies in a penal colony above the Arctic Circle, at forty-seven, serving nineteen years. The cause is given as natural. The country where you live now reports it plainly; the country you came from reports it otherwise. From where you stand you can see both versions at once, one of the things exile gives you that you did not ask for.'
      }
      return 'February 16, 2024. Alexei Navalny dies in a penal colony in the Arctic, at forty-seven. He went back in 2021 knowing what would happen, because he had said publicly that he would not stay away, and he was arrested at the airport, and the sentence grew until it was nineteen years. The word courage is not enough. It is also the word.'
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
