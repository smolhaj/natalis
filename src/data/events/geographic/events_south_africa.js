// South Africa additional arc events
// Soweto Uprising 1976, Mandela's release 1990,
// state capture/Zuma era, white emigration post-apartheid.
// Complements the events in events_country_arcs_3.js.

export const SOUTH_AFRICA_EVENTS = [

  {
    id: 'sa_soweto_1976',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1976 && G.currentYear <= 1978 &&
      G.age >= 10 && G.age <= 20 &&
      !G.mem?.saSoweto76,
    text: 'June 16, 1976. Soweto. The march begins at Morris Isaacson High School — students, most of them fifteen and sixteen years old, protesting the decree that half their subjects must be taught in Afrikaans, the language of the apartheid government. The police open fire. Hector Pieterson is thirteen years old when he is shot. Sam Nzima\'s photograph of him being carried — the image that goes around the world. By the end of the day two students are dead. By the end of the year, more than six hundred. The uprising spreads to other townships across the country. The government does not grant the demand immediately, but the Afrikaans instruction decree is quietly dropped the following year.',
    choices: [
      {
        text: 'You are in the march. You are the age of the students in the march.',
        tag: null,
        outcome: 'You are there. The photograph exists. You are in the world the photograph was taken in. What you carry from that day is yours.',
        effect: (p) => { p.m -= 10; p.karma += 10; p.r += 6; p.addFlag('soweto_generation'); p.addFlag('political_active'); p.setPolitical('left'); p.setMem('saSoweto76', true); },
      },
      {
        text: 'You are in Soweto but not in the march. You watch it from nearby.',
        tag: null,
        outcome: 'You watch it. The watching is also a position. The photograph is taken nearby.',
        effect: (p) => { p.m -= 8; p.karma += 5; p.r += 5; p.addFlag('soweto_generation'); p.setMem('saSoweto76', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_mandela_release_1990',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear === 1990 &&
      G.age >= 10 &&
      !G.mem?.saMandelaRelease,
    text: (G) => {
      const eth = G.ethnicity
      if (eth === 'black_south_african') {
        return 'February 11, 1990. Victor Verster Prison, Paarl. You are watching the gates on television when they open. He was imprisoned in 1964 — twenty-seven years. He is seventy-one years old and he walks out with Winnie Mandela and he raises his fist and the crowd is enormous and you are watching this in your house or in the street or in someone else\'s house and the thing that you had been told would not happen in your lifetime is happening.'
      }
      if (eth === 'white_south_african') {
        return 'February 11, 1990. Victor Verster Prison. Your parents have different responses to this event. The television shows the gates opening and Mandela walking out after twenty-seven years and raising his fist and the crowd. The ANC has been banned since 1960. Now it is not. The country you have grown up in is changing at a speed that the day before yesterday felt impossible.'
      }
      return 'February 11, 1990. The gates at Victor Verster Prison open. Nelson Mandela, who has been in prison since 1964, walks out. Twenty-seven years. The crowd on the road to Paarl. The raised fist. The country does not resolve into peace immediately: the violence of the transition years is still ahead. But the man who the government said was a terrorist and a criminal has just walked out of their prison and the government could not stop it.'
    },
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 5
      p.addFlag('mandela_release_generation')
      p.setMem('saMandelaRelease', true)
    },
  },

  {
    id: 'sa_state_capture',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 2012 && G.currentYear <= 2018 &&
      G.age >= 20 &&
      !G.mem?.saStateCapture,
    text: 'The Gupta family. The state capture. Eskom, Transnet, SAA, the South African Broadcasting Corporation, the National Prosecuting Authority. The systematic diversion of state resources through politically connected contractors over a decade. Nkandla: R246 million in state funds spent on upgrades to Zuma\'s private residence; the fire pool and the chicken run. The Constitutional Court finds that Zuma violated his oath of office. He is not removed until 2018. The word "state capture" enters the language and stays.',
    choices: [
      {
        text: 'The corruption is destroying what the 1994 transition was for.',
        tag: null,
        outcome: 'You follow the Zondo Commission hearings. The accounting is happening. The accounting is taking years and the damage has already been done.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('zuma_state_capture_era'); p.addFlag('post_apartheid_disillusionment'); p.setMem('saStateCapture', true); },
      },
      {
        text: 'The ANC is still the liberation movement. It can clean itself.',
        tag: null,
        outcome: 'You hold the faith in the ANC through this. The Ramaphosa succession is the first test of the cleaning. The cleaning is partial and the faith costs something to maintain.',
        effect: (p) => { p.r += 4; p.addFlag('zuma_state_capture_era'); p.setMem('saStateCapture', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_white_emigration',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'white_south_african' &&
      G.currentYear >= 1994 && G.currentYear <= 2012 &&
      G.age >= 22 &&
      !G.mem?.saWhiteEmig,
    text: 'The "chicken run." The phrase used for white South Africans leaving after 1994 — to Australia, New Zealand, the UK, Canada. A million left in the decade after the transition. The people who leave say crime, or opportunities, or their children\'s future. The people who stay say the leavers were never really committed to the country. The people who leave carry South Africa with them in the way that people carry the country they grew up in when they no longer live there: the specific quality of the light in November, the food, the sounds, the guilt about the country they were born with structural advantages in and then left.',
    choices: [
      {
        text: 'You leave. The country you were offered advantages in is no longer the country you can stay in.',
        tag: null,
        outcome: 'You leave. You arrive in the new country with a South African accent that softens over years and does not disappear.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('white_emigrant_sa'); p.setMem('saWhiteEmig', true); },
      },
      {
        text: 'You stay. You were born here and it is yours to work with.',
        tag: null,
        outcome: 'You stay. The country you stay in is not the country the people who left were leaving.',
        effect: (p) => { p.m -= 2; p.karma += 6; p.r += 3; p.setMem('saWhiteEmig', true); },
      },
    ],
    effect: null,
  },

]
