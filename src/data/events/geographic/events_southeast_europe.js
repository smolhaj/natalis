// Southeast Europe character events: Romania, Serbia/Yugoslavia
// Romania: supplements 3 existing events in events_country_arcs.js
//   (romaniaSecuritateNeighbour, romaniaSyst, romaniaCeausescuFall already exist)
// Serbia: no character events existed; Yugoslav wars covered by world event only

export const SOUTHEAST_EUROPE_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // ROMANIA — additional events
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'eur_rom_decree_770',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1966 && G.currentYear <= 1989 &&
      G.age >= 18 && G.age <= 44 &&
      !G.mem?.romDecree770,
    text: 'Decree 770: abortion is illegal. Contraception has effectively ceased to exist. The state\'s position is that every conception is a resource. The gynaecologist who performs illegal procedures is known to certain women by word of mouth, and the knowledge passes between women in a register just below speech. What you decide in this year will be decided without the assistance of any official institution.',
    choices: [
      {
        text: 'You manage. You find a way.',
        tag: null,
        outcome: 'The way involves risk and money and a specific kind of knowledge that women share with each other at cost. You know now what the state will and will not allow you.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.r += 6; p.addFlag('romania_decree_generation'); p.setMem('romDecree770', true) },
      },
      {
        text: 'The pregnancy continues.',
        tag: null,
        outcome: 'You did not choose this. The country has chosen for you, which is also a choice, made by people in buildings with your best interests not among their considerations.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('romania_decree_generation'); p.setMem('romDecree770', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'eur_rom_rationing_1980s',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1981 && G.currentYear <= 1989 &&
      G.age >= 14 &&
      !G.mem?.romRationing,
    text: 'The electricity goes off on a schedule now, which is better and worse than random cuts. Bread is rationed. Meat is something that appears occasionally. Ceaușescu is repaying the foreign debt at a rate that requires the country to export everything it produces and import nothing. The number of calories officially available per person per day is below what the World Health Organization defines as subsistence. You are managing.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('romanian_austerity_generation'); p.setMem('romRationing', true) },
  },

  {
    id: 'eur_rom_post89_transition',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1990 && G.currentYear <= 1997 &&
      G.age >= 18 &&
      !G.mem?.romPost89,
    text: 'Communism is over. Ion Iliescu is president, which is not the same as communism being over in a deeper sense. In June 1990 he calls the miners from the Jiu Valley into Bucharest to beat the students in University Square. This is the country\'s democracy now. The factories are closing. The shelves are still mostly empty because there is no money to import what had always been unavailable. The specific disorientation of revolution that produced something that is neither the thing you had nor the thing you wanted.',
    choices: [
      {
        text: 'Stay and build something in what remains.',
        tag: null,
        outcome: 'You stay. What comes is harder than what the foreign correspondents described when they filmed the jubilation in December. You are here for the parts they didn\'t film.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('romanian_transition_generation'); p.addFlag('stayed_when_others_left'); p.setMem('romPost89', true) },
      },
      {
        text: 'Leave. Germany, Italy, Spain — anywhere.',
        tag: null,
        outcome: 'You join the first emigration wave. The country you leave is still finding its shape. The country you arrive in has a shape that does not include you yet.',
        effect: (p) => { p.m -= 4; p.addFlag('romanian_transition_generation'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('romPost89', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'eur_rom_orphanage_generation',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1966 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 14 &&
      (G.parents?.mother?.alive === false || !G.parents?.mother) &&
      !G.mem?.romOrphan,
    text: 'The orphanage is a state institution. There are 170,000 children in state care in Romania. The staff ratio is one adult for thirty children. The adults have their own problems. You learn what you learn in an environment that does not have space for the individual child. What you learn is mostly about how to manage in large groups with limited resources, which is a kind of education.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('romania_orphan_generation'); p.setMem('romOrphan', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SERBIA / YUGOSLAVIA — events (Yugoslavia historical name until 1992)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'eur_ser_tito_death',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Serbia' &&
      G.currentYear === 1980 &&
      G.age >= 12 &&
      !G.mem?.serTitoDeath,
    text: 'May 4, 1980. Josip Broz Tito dies at eighty-seven. He has been alive for longer than Yugoslavia. The mourning is genuine and enormous. Heads of state come from 123 countries, which is a measure of the non-aligned prestige that will now begin to dissolve. What is not asked yet, because it is too soon to ask: who holds this together now? The answer, which nobody in the state apparatus wants to provide, is: nobody.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('tito_generation'); p.setMem('serTitoDeath', true) },
  },

  {
    id: 'eur_ser_yugoslav_identity',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Serbia' &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      G.age >= 18 &&
      !G.mem?.serYugoslavIdentity,
    text: 'The country you grew up in — Yugoslavia — has begun to dissolve into countries that did not exist last year and are fighting over the borders between them. The word Yugoslav on your documents will become a wrong answer. The new documents ask you to be Serbian, or Croatian, or Slovenian, or Bosnian — one of the subcategories that the category was supposed to have superseded. You had thought the category superseded them. It didn\'t. It organized them.',
    choices: [
      {
        text: 'You identify with your republic. This is Serbia now.',
        tag: null,
        outcome: 'The identity is available and functional and narrow in ways the broader one wasn\'t. You take what\'s offered.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('yugoslav_dissolution_lived'); p.setMem('serYugoslavIdentity', true) },
      },
      {
        text: 'You still think of yourself as Yugoslav. The category still makes sense to you.',
        tag: null,
        outcome: 'The category stops making sense to official forms and border crossings and the people around you who have chosen. You carry it anyway.',
        effect: (p) => { p.m -= 10; p.r += 8; p.karma += 4; p.addFlag('yugoslav_dissolution_lived'); p.addFlag('independent_thinker'); p.setMem('serYugoslavIdentity', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'eur_ser_hyperinflation_1993',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Serbia' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem?.serHyperinflation,
    text: 'The Yugoslav dinar in 1993 achieves an inflation rate of 116 trillion per cent — the second worst hyperinflation in recorded history after the Weimar Republic. Salaries are paid and spent in the same hour. You learn to keep savings in Deutschmarks, or in cigarettes, which are a more stable currency than the dinar. The parallel economy is the real economy. You learn the conversion rates the way you used to learn multiplication tables.',
    choices: null,
    effect: (p) => { p.m -= 14; p.mo -= Math.floor((p.mo ?? 0) * 0.5); p.addFlag('yugoslav_hyperinflation_lived'); p.setMem('serHyperinflation', true) },
  },

  {
    id: 'eur_ser_nato_bombing_1999',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Serbia' &&
      G.currentYear === 1999 &&
      G.age >= 16 &&
      !G.mem?.serNatoBombing,
    text: 'Seventy-eight days. NATO aircraft bomb Belgrade and other Serbian cities beginning March 24, 1999. The bridges over the Danube come down. The electricity goes out in rotation. The state television building is struck on April 23; sixteen people who were at work inside die. The international justification is Kosovo. From the inside of Belgrade during the bombing, justification and experience are separate things that do not reduce to each other.',
    choices: [
      {
        text: 'Stay in Belgrade. You have nowhere else to go.',
        tag: null,
        outcome: 'Seventy-eight nights. You learn the sound of the air-raid warning so well that you hear it in your sleep for years after it stops.',
        effect: (p) => { p.m -= 16; p.h -= 6; p.r += 8; p.addFlag('nato_bombing_survived'); p.setMem('serNatoBombing', true) },
      },
      {
        text: 'Leave for relatives outside the city.',
        tag: null,
        outcome: 'You watch the strikes on television from somewhere safer. The distance makes it different but not absent.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('nato_bombing_survived'); p.setMem('serNatoBombing', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'eur_ser_milosevic_falls',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Serbia' &&
      G.currentYear === 2000 &&
      G.age >= 18 &&
      !G.mem?.serMilosevicFalls,
    text: 'October 5, 2000. The protesters come from every direction into Belgrade. The government buildings are taken. Milošević concedes. The specific feeling is not the one you expected — not triumph exactly, but the sudden removal of something you had been pressing against so long that you had forgotten you were pressing against it. The ICTY extradition will come later. Tonight the thing that was true for eleven years is no longer true.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 4; p.addFlag('serbian_democratic_transition'); p.setMem('serMilosevicFalls', true) },
  },

]
