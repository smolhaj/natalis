// Armenia and Azerbaijan arc events
// Covers: Armenian Genocide memory, Spitak earthquake, Karabakh wars (both perspectives),
// Black January 1990 (Azerbaijan), dark winter blockade, Velvet Revolution, 2020 war

const ARMENIA_AZ_EVENTS = [

  // ─── ARMENIA ───

  {
    id: 'arm_genocide_memory',
    phase: null,
    weight: 5,
    when: (G) => G.character.country.name === 'Armenia' && G.age >= 7 && G.age <= 16 && G.currentYear <= 1990 && !G.flags.has('arm_genocide_memory_bearer'),
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1965) {
        return 'April 24 comes and your grandmother goes quiet and does not explain. Later you understand: her mother was fourteen when they were marched into the Syrian desert, and survived because a Turkish neighbour hid her for three weeks. You are here because of that neighbour. You have no word yet for what almost erased your family. The word will come, and you will say it your whole life.'
      }
      return 'On April 24 the lesson stops. The teacher folds her hands and says: we remember, and opens the window, because people are already going up the hill with candles. Your grandfather was born in Van in 1908 and never talked about before. At home you look at the photograph of a woman you were told was your great-grandmother. Nobody in the photograph is smiling.'
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('arm_genocide_memory_bearer'); },
  },

  {
    id: 'arm_earthquake_1988',
    phase: 'young_adult',
    weight: 6,
    // Latched on its own marker, not on arm_earthquake_survivor: the Spitak
    // world event sets that flag for everyone in Armenia before 1988's event is
    // drawn, so the negation closed this to every Armenian it was written for.
    // The world event also carries the date and the minute, so this does not.
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear === 1988 && !G.mem?.armEarthquake1988,
    text: 'By the afternoon the size of it is known. Spitak: gone in forty-three seconds. Leninakan: half the city collapsed. The television shows things you cannot look at directly. You spend three days with a shovel in the rubble. There are sounds under the concrete — not many, and getting fewer.',
    choices: [
      {
        text: 'You were in the affected zone.',
        tag: 'survivor',
        outcome: 'You were in a building that held. The family of four in the building next to you was not.',
        effect: (p) => { p.m -= 20; p.h -= 8; p.r += 8; p.addFlag('arm_earthquake_survivor'); p.setMem('armEarthquake1988', true); p.addFlag('arm_earthquake_zone'); },
      },
      {
        text: 'You were in Yerevan, and went north to help.',
        tag: 'volunteer',
        outcome: 'The buses north were full of people carrying shovels and blankets. You dug for three days. You found three people alive. You found more who were not.',
        effect: (p) => { p.m -= 14; p.h -= 5; p.r += 6; p.addFlag('arm_earthquake_survivor'); p.setMem('armEarthquake1988', true); },
      },
    ],
  },

  {
    id: 'arm_baku_refugees',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear >= 1988 && G.currentYear <= 1991 && !G.flags.has('arm_baku_refugee_host') && !G.flags.has('arm_baku_refugee'),
    text: 'A family arrives from Baku, cousins of cousins you have never met, with two suitcases. The wife\'s hands shake when she drinks tea. She says: we had three days, and the neighbours helped us get out. She does not say what the other neighbours did. They sleep in your living room for four months, and by spring they are not going back.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 4; p.karma += 4; p.addFlag('arm_baku_refugee_host'); },
  },

  {
    id: 'arm_dark_winter',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear >= 1992 && G.currentYear <= 1997 && !G.flags.has('arm_dark_winter_survivor'),
    text: (G) => {
      const yr = G.currentYear
      return `The electricity comes on for an hour, ${yr <= 1993 ? 'sometimes two' : 'sometimes less'}, and when it does you boil water and fill every container. The flat is ${yr <= 1994 ? 'eight' : 'six'} degrees in January, and your neighbour cut down his fruit trees for firewood last month. You watch your breath in your own kitchen. People are leaving by the tens of thousands, to Russia, to America, to anywhere, and you are not sure yet whether you can.`
    },
    choices: [
      {
        text: 'You stay. This is your home.',
        tag: 'stayed',
        outcome: 'The electricity comes back. Slowly. By 1998, three hours a day. You survive it.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.r += 6; p.addFlag('arm_dark_winter_survivor'); p.addFlag('arm_stayed_dark_years'); },
      },
      {
        text: 'You leave for Russia for a year.',
        tag: 'left',
        outcome: 'You come back a year later. The apartment smells of cold. Your neighbor\'s orchard is a stump. You stay after that.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('arm_dark_winter_survivor'); p.addFlag('arm_left_briefly'); },
      },
    ],
  },

  {
    id: 'arm_karabakh_veteran',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Armenia' && G.character.gender === 'male' && G.age >= 18 && G.age <= 32 && G.currentYear >= 1991 && G.currentYear <= 1994 && !G.flags.has('arm_karabakh_veteran_1'),
    text: 'The call comes in spring, or you volunteer before it comes. Karabakh, the Armenian villages inside Azerbaijan, and the Lachin road the only way in. The mountains are very cold. When Shushi falls, at the top of its cliffs, the men around you weep. It takes you a long time to understand why.',
    choices: [
      {
        text: 'You fought in the mountains.',
        tag: 'fighter',
        outcome: 'You come back. Some of the men you went with do not. The victory feels like something you cannot celebrate in front of their families.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.r += 7; p.addFlag('arm_karabakh_veteran_1'); p.addFlag('arm_combat_survivor'); },
      },
      {
        text: 'You drove supplies along the corridor.',
        tag: 'logistics',
        outcome: 'The road was shelled twice while you were on it. You brought food, ammunition, medicine. The corridor stayed open.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.r += 5; p.addFlag('arm_karabakh_veteran_1'); },
      },
    ],
  },

  {
    id: 'arm_diaspora_encounter',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear >= 1995 && G.currentYear <= 2015 && !G.flags.has('arm_diaspora_encounter'),
    text: (G) => {
      const yr = G.currentYear
      return `A man from Los Angeles is visiting. He calls himself Armenian, and he is: his grandfather left ${yr > 2000 ? 'Van in 1915' : 'in 1920'}, and his Armenian is older than yours, the western words your grandmother used. He cannot use the marshrutka and he photographs everything. He says Yerevan is not what he imagined, and you cannot tell whether he means better or worse. He gives your cousin two hundred dollars and says: for the family.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r += 4; p.e += 2; p.addFlag('arm_diaspora_encounter'); },
  },

  {
    id: 'arm_velvet_2018',
    phase: null,
    weight: 5,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear === 2018 && G.age >= 18 && !G.flags.has('arm_velvet_revolution'),
    text: 'April 2018. Nikol Pashinyan walks from Gyumri to Yerevan. He is thin and wears the same clothes every day. The crowds that follow him get larger. By the time he reaches Republic Square, something is happening that has not happened before in Armenia: a leader who has no money, no family name, no army behind him, and people are following him anyway. The old prime minister resigns. You stand in the square and you hear people laughing.',
    choices: [
      {
        text: 'You joined the marches.',
        tag: 'marched',
        outcome: 'You took three days off work. Your mother called twice and said be careful. You waved at the police and they waved back. Nothing like this had happened before.',
        effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('arm_velvet_revolution'); p.addFlag('arm_velvet_participant'); },
      },
      {
        text: 'You watched from the window and let yourself hope.',
        tag: 'hoped',
        outcome: 'You watched the livestream at work. When Sargsyan resigned, you shut the door of your office and put your head on the desk for a minute.',
        effect: (p) => { p.m += 10; p.addFlag('arm_velvet_revolution'); },
      },
    ],
  },

  {
    id: 'arm_war_2020',
    phase: 'midlife',
    weight: 6,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear === 2020 && !G.flags.has('arm_war_2020_loss'),
    text: (G) => {
      const isVet = G.flags.has('arm_karabakh_veteran_1')
      return `September 27. The war starts before dawn, and it is not like 1991: there are drones now, and the positions cannot see them coming. ${isVet ? 'You served in these mountains. You call your old unit contacts and nobody picks up.' : 'The boys going to the front are eighteen, nineteen.'} On November 9 Pashinyan signs the ceasefire at three in the morning, and by breakfast everyone knows. Shushi is gone. Hadrut is gone. The Lachin corridor stays open, the last thread.`
    },
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 12; p.addFlag('arm_war_2020_loss'); },
  },

  // ─── AZERBAIJAN ───

  {
    id: 'azr_black_january',
    phase: 'young_adult',
    weight: 6,
    // Latched on its own marker: baku_black_january_1990 sets
    // azr_black_january_generation before 1990's event is drawn, so negating it
    // closed this to every Azerbaijani, and azr_black_january_witness (texture,
    // a ribbon) had no reachable setter. The world event carries the date and
    // the count, so this does not repeat them.
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear === 1990 && !G.mem?.azrBlackJanuary,
    text: 'You hear it before you understand what it is: armored vehicles on Neftchilar Avenue, after midnight, and the television already dark. By morning there are people shot in the streets, crushed by vehicles, found in doorways. The coffins laid out in Azadliq Square fill the square. At the funerals, people tear their Soviet passports in half. The communist party membership cards go into the coffins. You keep yours — not from belief, but because you do not know yet what comes next.',
    choices: [
      {
        text: 'You were on the street that night.',
        tag: 'witness',
        outcome: 'You pressed yourself into a doorway when the armored column passed. The sound of it stayed in your body for months.',
        effect: (p) => { p.m -= 16; p.r += 8; p.karma += 4; p.addFlag('azr_black_january_generation'); p.setMem('azrBlackJanuary', true); p.addFlag('azr_black_january_witness'); },
      },
      {
        text: 'You heard it from your apartment window.',
        tag: 'heard',
        outcome: 'The next morning you walked to Azadliq Square. The flowers were already there. The coffins were already there.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('azr_black_january_generation'); p.setMem('azrBlackJanuary', true); },
      },
    ],
  },

  {
    id: 'azr_baku_pogrom',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 1988 && G.currentYear <= 1990 && !G.flags.has('azr_baku_pogrom_witness'),
    text: 'In January 1990, before the soldiers came, there were three days in Baku when Armenian families were found by lists. You know someone who hid an Armenian neighbour, and someone who did not. By February the Armenian families on every block are gone, to Yerevan, to Moscow, wherever they could get. The Hakobyans\' flat on the fourth floor is empty, the door still unlocked, and nobody touches their things for months.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.karma -= 4; p.addFlag('azr_baku_pogrom_witness'); },
  },

  {
    id: 'azr_karabakh_idp',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 1993 && G.currentYear <= 2000 && !G.flags.has('azr_karabakh_idp') && !G.mem.azr_idp_checked,
    text: (G) => {
      const yr = G.currentYear
      return `You are from ${yr <= 1994 ? 'Agdam, which they call the Hiroshima of the Caucasus' : 'one of the villages in the Lachin corridor'}, or your family is, and the 1994 ceasefire left it on the other side. The government puts you in a railway carriage, or an unfinished block in Baku, or a camp in the lowlands. You brought a photograph of the house and the title deed. Your children say: but we are from here. You say: no. You mean it.`
    },
    choices: null,
    effect: (p) => { p.m -= 16; p.r += 10; p.addFlag('azr_karabakh_idp'); p.setMem('azr_idp_checked', true); },
  },

  {
    id: 'azr_baku_boom',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 2006 && G.currentYear <= 2014 && !G.flags.has('azr_baku_boom'),
    text: 'Baku is being rebuilt. The old city survives inside a ring of glass towers and lit promenades. The Flame Towers are visible from every direction. The Formula 1 circuit goes along the waterfront where the oil workers used to march. Foreigners come for conferences and say: I didn\'t expect this. Thirty minutes from the flame towers there are still railway carriages where families from Karabakh have been living since 1994. The state television shows only the towers.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 6; p.e += 2; p.addFlag('azr_baku_boom'); },
  },

  {
    id: 'azr_press_freedom',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 2005 && G.currentYear <= 2020 && !G.flags.has('azr_press_silence') && !G.mem.azr_press_checked,
    text: 'A journalist you know is arrested for hooliganism, or tax evasion, or some other word that means he wrote about the wrong person. The opposition paper closes; the website is blocked. You have learned what not to search for on the work computer, what not to say in certain taxis, which names to leave out of text messages. You are not afraid, exactly. You are careful.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('azr_press_silence'); p.setMem('azr_press_checked', true); },
  },

  {
    id: 'azr_war_2020',
    phase: 'midlife',
    weight: 6,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear === 2020 && !G.flags.has('azr_war_victory_2020'),
    text: (G) => {
      const isIDP = G.flags.has('azr_karabakh_idp')
      return `September 27, and the drones are precise; the positions fall in hours, then days. ${isIDP ? 'You have not seen your village in twenty-six years. You still have the deed and the photograph, and your children are watching the map with you.' : 'Your cousin volunteers the second week.'} On November 9 the ceasefire, and Shusha is Azerbaijani again, and Aliyev reads the agreement on television with the generals behind him. You feel something you expected to be simple. It is not simple.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.r += 6; p.addFlag('azr_war_victory_2020'); },
  },

  {
    id: 'azr_karabakh_return_2023',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 2023 && G.flags.has('azr_karabakh_idp') && !G.flags.has('azr_karabakh_return_2023'),
    text: 'September 2023. The Armenian forces in Karabakh surrender in a day, and the people leave, nearly all of them, in a column of cars that stretches for miles. You can go back, later, on a bus the government arranges. The house your parents described is a ruin. The mulberry tree in the yard is still standing, and you stand under it for a long time.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 8; p.addFlag('azr_karabakh_return_2023'); },
  },

]

export default ARMENIA_AZ_EVENTS
