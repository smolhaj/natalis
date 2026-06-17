// Iraq arc events (Arab Iraqi perspective; Kurdish perspective in events_kurdish.js)
//
// Iraq's story across the 20th and 21st centuries:
//  — The Ba'ath Party consolidated power 1968; Saddam Hussein became president 1979.
//    The Ba'ath state was a surveillance state built around loyalty: party cards,
//    the mukhabarat, portraits everywhere, mandatory rallies.
//  — Iran-Iraq War 1980–88: eight years; 250,000–500,000 Iraqi dead; poison gas
//    used at Halabja (5,000 Kurdish civilians). The longest conventional war of
//    the 20th century. It ended in stalemate.
//  — Gulf War 1990–91: invasion of Kuwait, 100-hour ground war, Highway of Death.
//    Then twelve years of comprehensive UN sanctions that destroyed Iraq's middle class.
//    Infant mortality doubled. Professionals emigrated or stayed and became poor.
//  — US invasion March 20, 2003: Saddam's statue falls April 9; Coalition Provisional
//    Authority disbands the army, creating 400,000 armed and unemployed soldiers.
//    De-Baathification removes experienced administrators. Looting empties museums.
//  — Sectarian civil war 2006–08: Sunni-Shia violence reshapes Baghdad by
//    neighbourhood. Mixed areas empty; walls go up. 2 million displaced internally.
//  — Islamic State / ISIS 2014–17: captures Mosul in 48 hours; Yazidi genocide on
//    Sinjar Mountain; caliphate at its height covers 8M people. Mosul liberated 2017
//    after nine months, largely destroyed.
//  — Iraqi diaspora: one of the highest rates of professional emigration in history.
//    Two million left in 2006–08 alone.

const IRAQ_EVENTS = [

  // ── BA'ATH STATE CHILDHOOD ────────────────────────────────────────────────────

  {
    id: 'irq_baath_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 1970 && G.currentYear <= 2003 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.irq_baath_childhood,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1979
        ? 'The Ba\'ath Party is in everything. Your father\'s Ba\'ath Party card is the card that gets him the promotion, the government apartment, the hospital priority. School starts with a portrait of the President on the wall, then a picture of the President again in the hallway, then a rally on Revolution Day where you wave a flag and chant. You know the words. Everyone knows the words. The knowing is not optional.'
        : 'The portrait of Saddam is in every room — the classroom, the post office, the barbershop, the hospital waiting room. Your family has one at home; not having one would be noticed. The mukhabarat — the intelligence services — are in the neighborhood in a way that everyone knows but nobody discusses directly. You learn to hear the difference between what people say and what they mean.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('irq_baath_generation'); p.setMem('irq_baath_childhood', true); },
  },

  // ── IRAN-IRAQ WAR ─────────────────────────────────────────────────────────────

  {
    id: 'irq_iran_iraq_war',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 1980 && G.currentYear <= 1989 &&
      G.age >= 18 &&
      !G.mem?.irq_iran_iraq,
    text: (G) => {
      const isMale = G.character.gender === 'male'
      return isMale
        ? 'The call-up comes. September 1980, or 1981, or 1982 — the war is eight years long and the army needs men for all of them. The front is in the marshes and on the plains near Basra and in the mountains near Halabja. The poison gas is used against the Kurds in 1988. The gas is also sometimes used on Iranian positions. The war that Saddam promised would be over in weeks is still running in its eighth year. You are in it.'
        : 'The men are away, or they are dead, or they are in the category of not-talked-about. The war economy changes what is available in the market and what your family can afford. Eight years of this. The official broadcasts describe victories. The funerals are private.'
    },
    choices: [
      {
        text: 'You serve and come back changed, carrying what eight years of war produces',
        tag: null,
        outcome: 'The war ends in stalemate in August 1988. Half a million Iraqi dead. The border is where it was in 1980. You are alive on the wrong side of that arithmetic.',
        effect: (p) => { p.h -= 8; p.m -= 8; p.r += 8; p.addFlag('irq_iran_iraq_veteran'); p.addFlag('irq_war_generation'); p.setMem('irq_iran_iraq', true); },
      },
      {
        text: 'You are not on the front line, but the war is in everything — the economy, the fear, the missing people',
        tag: null,
        outcome: 'There is no outside the war. There is only a distance from the front that determines which consequences arrive first.',
        effect: (p) => { p.r += 5; p.m -= 5; p.addFlag('irq_war_generation'); p.setMem('irq_iran_iraq', true); },
      },
    ],
    effect: null,
  },

  // ── SANCTIONS DECADE ─────────────────────────────────────────────────────────

  {
    id: 'irq_sanctions_1990s',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 1991 && G.currentYear <= 2003 &&
      G.age >= 20 &&
      !G.mem?.irq_sanctions,
    text: 'The UN sanctions after Kuwait: comprehensive, the most extensive in history. The dinar collapses — what was worth a dollar in 1990 is worth fractions of a cent by 1995. The engineers and doctors who earned salaries take second and third jobs or leave the country. The hospitals run out of medicine. Infant mortality doubles. The oil-for-food program allows some import of food and medicine — at prices the government sets, distributed through a government ration system. The middle-class Iraq your parents grew up in is being eaten from the inside while the president builds palaces.',
    choices: [
      {
        text: 'You stay and navigate the collapse — your family is here, your life is here',
        tag: null,
        outcome: 'Staying is a form of expertise. You learn what can be had and from where, who the right people are, how to maintain a professional life when the profession earns almost nothing.',
        effect: (p) => { p.w -= 12; p.m -= 8; p.e += 2; p.addFlag('irq_sanctions_generation'); p.setMem('irq_sanctions', true); },
      },
      {
        text: 'You find a way out — to Jordan, to the Gulf states, to wherever a visa can be got',
        tag: null,
        outcome: 'The Iraqi diaspora of the 1990s is doctors and engineers who could not afford medicine or engineering in Iraq. You are in it now.',
        effect: (p) => { p.w -= 6; p.addFlag('irq_sanctions_generation'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('irq_sanctions', true); },
      },
    ],
    effect: null,
  },

  // ── US INVASION AND AFTERMATH ─────────────────────────────────────────────────

  {
    id: 'irq_2003_invasion',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 2003 && G.currentYear <= 2005 &&
      G.age >= 18 &&
      !G.mem?.irq_invasion,
    text: 'March 20, 2003. The bombs hit Baghdad in the night. By April 9 the statue is being pulled down in Firdos Square — the image the cameras want. The Coalition Provisional Authority dissolves the Iraqi army (400,000 armed men, suddenly without pay) and orders de-Baathification (removing everyone who was senior enough in the party to have competence). The result: no security, no administration, looting of the national museum, the electricity grid, the hospitals. The country that existed is being dismantled faster than anything can replace it.',
    choices: [
      {
        text: 'The fall of Saddam is real — whatever comes next, that much is real',
        tag: null,
        outcome: 'Saddam is real. What comes next is also real and is happening faster than anyone planned for. The planning, it turns out, did not extend to what came after the statue.',
        effect: (p) => { p.m += 3; p.r += 5; p.addFlag('irq_postwar_generation'); p.setMem('irq_invasion', true); },
      },
      {
        text: 'The occupation is already the next thing you will have to survive',
        tag: null,
        outcome: 'The calculation shifts immediately: the army is gone, the Ba\'ath administrators are gone, the police are gone. The question of who has the gun is the first question of the new Iraq.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('irq_postwar_generation'); p.setMem('irq_invasion', true); },
      },
    ],
    effect: null,
  },

  // ── SECTARIAN CIVIL WAR ───────────────────────────────────────────────────────

  {
    id: 'irq_sectarian_war',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 2006 && G.currentYear <= 2009 &&
      G.age >= 18 &&
      !G.mem?.irq_sectarian,
    text: (G) => {
      const eth = G.ethnicity
      const sunni = eth === 'arab_sunni_iraqi'
      const shia = eth === 'arab_shia_iraqi'
      if (sunni) {
        return 'The Samarra shrine bombing in February 2006 opens something. You are Sunni in a city where the identity has become a mortal category. The Mahdi Army checkpoints are in the neighbourhoods that were mixed last year. The families you knew from the mixed street have gone somewhere. You are deciding where to go.'
      } else if (shia) {
        return 'The bombs in Sadr City. The mosques. The February 2006 Samarra shrine bombing that was designed to start a war and did start a war. Baghdad is being sorted by neighbourhood — the Sunni side, the Shia side, the walls that are going up. You are Shia in a city where that identity is both protection and target.'
      }
      return 'The year 2006. Baghdad is being sorted. The neighbourhoods that were mixed — Sunni and Shia families on the same street — are separating. The mechanism is a car bomb here, a death squad there, a letter saying you have 24 hours to leave. The walls going up between the areas are sometimes called peace walls. You are deciding which side of which wall you belong on.'
    },
    choices: [
      {
        text: 'You leave Baghdad — for Erbil, for Jordan, for anywhere outside the city',
        tag: null,
        outcome: 'Two million Iraqis are displaced inside the country in 2006-08. You are one of them. The displacement is efficient and complete.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('irq_displacement_generation'); p.setMem('irq_sectarian', true); },
      },
      {
        text: 'You stay — your house, your neighbourhood, your connections are here',
        tag: null,
        outcome: 'Staying requires knowledge of who controls which streets on which days. You acquire this knowledge by necessity. The neighbourhood changes around you.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.r += 6; p.addFlag('irq_displacement_generation'); p.setMem('irq_sectarian', true); },
      },
    ],
    effect: null,
  },

  // ── ISIS AND MOSUL ────────────────────────────────────────────────────────────

  {
    id: 'irq_isis_mosul',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 2014 && G.currentYear <= 2018 &&
      G.age >= 20 &&
      !G.mem?.irq_isis,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 2015
        ? 'June 10, 2014. Mosul falls in 48 hours. The Iraqi army divisions melt away before the Islamic State convoy. Two thousand fighters against 30,000 soldiers, and the soldiers leave. The caliphate is declared from the Grand Mosque of al-Nuri on June 29. Eight million people living under Islamic State rule. On Sinjar Mountain: the Yazidis, a non-Muslim minority, surrounded. Thousands killed, thousands of women enslaved. The United States had just left Iraq. The army that the United States trained did not fight.'
        : 'The liberation of Mosul: nine months of fighting, July 2016 to July 2017. The old city destroyed block by block. The Mosul you knew — the university, the souk, the al-Nuri mosque itself, demolished by ISIS before they left — is a ruin. The caliphate is gone. The city is a question of what can be rebuilt and by whom and with what money, in a country that does not have much of any of those things.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.h -= 5; p.addFlag('irq_isis_generation'); p.setMem('irq_isis', true); },
  },

  // ── THE IRAQI PROFESSIONAL IN DIASPORA ───────────────────────────────────────

  {
    id: 'irq_diaspora_professional',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.flags.has('emigrated') &&
      G.currentYear >= 2003 &&
      G.age >= 30 &&
      !G.mem?.irq_diaspora,
    text: 'The Iraqi diaspora is a specific phenomenon: a country that had one of the highest literacy rates and most educated professional classes in the Arab world in 1980, dismantled by two wars and twelve years of sanctions and then an invasion and then a civil war. You are in the diaspora of a place that used to be something and is trying to become something again. The country calls to you in a particular way when it is doing well and when it is doing badly, which is often at the same time.',
    choices: [
      {
        text: 'You stay in the diaspora — the Iraq that existed is the Iraq you miss, and that Iraq is not there anymore',
        tag: null,
        outcome: 'The Iraq of your memory is a specific version of a country at a specific moment. The version that exists now has continuity with it but is not it. The distinction is the space the diaspora lives in.',
        effect: (p) => { p.r += 6; p.addFlag('irq_diaspora_generation'); p.setMem('irq_diaspora', true); },
      },
      {
        text: 'You go back — something is there that is yours and cannot be taken care of from here',
        tag: null,
        outcome: 'Return is also a form of reckoning. The Iraq you return to will know you did not stay. The Iraq you return to also needs what you bring back.',
        effect: (p) => { p.s += 3; p.m += 4; p.addFlag('irq_diaspora_generation'); p.setResidency('citizen'); p.setMem('irq_diaspora', true); },
      },
    ],
    effect: null,
  },

  // ── TISHREEN UPRISING 2019 ────────────────────────────────────────────────────

  {
    id: 'irq_tishreen_2019',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iraq' &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      !G.mem?.irq_tishreen,
    text: 'October 1, 2019. The Tishreen uprising — named for October in Arabic. Young Iraqis in Baghdad and the Shia south march against corruption, unemployment, and the political class that divided the country between them after 2003. The security forces fire live ammunition into the crowd. More than 600 protesters are killed in six months. The movement has no clear leader and refuses to be captured by any party or militia. The protesters call it a thawra — a revolution. The demands: a new electoral law, an end to the sectarian quota system, accountability for the killing. The government changes. The demands are partially met and then the government changes back.',
    choices: [
      {
        text: 'You are in Tahrir Square — this generation has a different claim on Iraq than the parties that carved it up',
        tag: null,
        outcome: '600 dead. The electoral law passes. The government changes. The system remains. The protesters say: we will be back. Some of them are not able to come back.',
        effect: (p) => { p.s += 4; p.addFlag('irq_tishreen_generation'); p.setPolitical('left'); p.setMem('irq_tishreen', true); },
      },
      {
        text: 'You watch from outside or from home — the risk is too high and the outcome too uncertain',
        tag: null,
        outcome: 'The outcome is indeed uncertain. 600 protesters are killed. The system absorbs the pressure partially. The country changes more slowly than the square demanded.',
        effect: (p) => { p.r += 4; p.addFlag('irq_tishreen_generation'); p.setMem('irq_tishreen', true); },
      },
    ],
    effect: null,
  },

]

export default IRAQ_EVENTS
