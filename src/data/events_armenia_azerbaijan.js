// Armenia and Azerbaijan arc events
// Covers: Armenian Genocide memory, Spitak earthquake, Karabakh wars (both perspectives),
// Black January 1990 (Azerbaijan), dark winter blockade, Velvet Revolution, 2020 war

const ARMENIA_AZ_EVENTS = [

  // ─── ARMENIA ───

  {
    id: 'arm_genocide_memory',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.character.country.name === 'Armenia' && G.age >= 7 && G.age <= 16 && G.currentYear <= 1990 && !G.flags.has('arm_genocide_memory_bearer'),
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1965) {
        return 'April 24 comes and your grandmother goes quiet. She does not explain it. Later you understand: her mother was fourteen when they were marched into the Syrian desert. Her mother survived because a Turkish neighbor hid her for three weeks. You are here because of that neighbor. You have no word yet for what almost erased your family. The word will come. You will say it your whole life.'
      }
      return 'At school on April 24, the lesson stops. The teacher folds her hands and says: we remember. Then she opens the window, because people are already gathering on the hill with candles. Your grandfather was born in Van in 1908. He never talked about before. You go home and look at the photograph of a woman you were told was your great-grandmother. She is not smiling. Nobody in the photograph is smiling.'
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('arm_genocide_memory_bearer'); },
  },

  {
    id: 'arm_earthquake_1988',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear === 1988 && !G.flags.has('arm_earthquake_survivor'),
    text: 'December 7, 1988. At 11:41 in the morning, the north of Armenia disappears. Spitak: gone in forty-three seconds. Leninakan: half the city collapsed. The television shows things you cannot look at directly. You spend three days with a shovel in the rubble. There are sounds under the concrete — not many, and getting fewer.',
    choices: [
      {
        text: 'You were in the affected zone.',
        tag: 'survivor',
        outcome: 'You were in a building that held. The family of four in the building next to you was not.',
        effect: (p) => { p.m -= 20; p.h -= 8; p.r += 8; p.addFlag('arm_earthquake_survivor'); p.addFlag('arm_earthquake_zone'); },
      },
      {
        text: 'You were in Yerevan, and went north to help.',
        tag: 'volunteer',
        outcome: 'The buses north were full of people carrying shovels and blankets. You dug for three days. You found three people alive. You found more who were not.',
        effect: (p) => { p.m -= 14; p.h -= 5; p.r += 6; p.addFlag('arm_earthquake_survivor'); },
      },
    ],
  },

  {
    id: 'arm_baku_refugees',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Armenia' && G.currentYear >= 1988 && G.currentYear <= 1991 && !G.flags.has('arm_baku_refugee_host') && !G.flags.has('arm_baku_refugee'),
    text: 'A family arrives from Baku. Cousins of cousins — you have never met them. They carry two suitcases. The wife\'s hands shake when she drinks tea. She says: we had three days. She says: the neighbors helped us get out. She does not say what the other neighbors did. They sleep in your living room for four months. By spring, they are not going back.',
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
      return `The electricity comes on for one hour, ${yr <= 1993 ? 'sometimes two' : 'sometimes less'}. You boil water when it comes on. You fill every container. The apartment is ${yr <= 1994 ? 'eight' : 'six'} degrees in January. Your neighbor cut down his fruit trees for firewood last month. You watch your breath in your own kitchen. People are leaving — by the tens of thousands, to Russia, to America, to anywhere. You stay, or you are not sure yet if you can leave.`
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
    text: 'The call comes in spring. Or you volunteer before it comes. Karabakh — Artsakh — the enclave of Armenian villages inside Azerbaijan. The road through the Lachin corridor is the only lifeline. You go. The mountains are very cold. The town of Shushi, at the top of the cliffs, is the key to everything. When it falls — to the Armenian side — the men around you weep. It takes you a long time to understand why.',
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
      return `A man from Los Angeles is visiting. He calls himself Armenian. He is Armenian. His grandfather left ${yr > 2000 ? 'in 1915, from Van' : 'in 1920'}. His Armenian is older than yours — the Western dialect, the words your grandmother used. He is generous. He does not know how to use the marshrutka. He photographs everything with a large camera. He says Yerevan is not what he imagined. You are not sure if he means better or worse. He gives your cousin two hundred dollars and says: for the family.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r += 4; p.e += 2; p.addFlag('arm_diaspora_encounter'); },
  },

  {
    id: 'arm_velvet_2018',
    phase: 'midlife',
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
      return `September 27. The war starts before dawn. It is not like 1991. There are drones now — Turkish drones, Azerbaijani drones — and the Armenian positions cannot see them coming. By October the towns are falling. ${isVet ? 'You served in these mountains. You know the roads, the villages. You call your old unit contacts and nobody picks up.' : 'The boys going to the front are eighteen, nineteen.'} November 9: Pashinyan signs the ceasefire at three in the morning. By morning everyone knows. Shushi is gone. Hadrut is gone. The Lachin corridor stays open, the last thread. He will say later he had no choice. Perhaps he did not.`
    },
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 12; p.addFlag('arm_war_2020_loss'); },
  },

  // ─── AZERBAIJAN ───

  {
    id: 'azr_black_january',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear === 1990 && !G.flags.has('azr_black_january_generation'),
    text: 'January 19, 1990. Soviet troops enter Baku after midnight. You hear it before you understand what it is: armored vehicles on the Neftchilar Avenue. The government had already cut the television. By morning the count is 131 dead — shot in the streets, crushed by vehicles, found in doorways. The coffins laid out in Azadliq Square fill the square. At the funerals, people tear their Soviet passports in half. The communist party membership cards go into the coffins. You keep yours — not from belief, but because you do not know yet what comes next.',
    choices: [
      {
        text: 'You were on the street that night.',
        tag: 'witness',
        outcome: 'You pressed yourself into a doorway when the armored column passed. The sound of it stayed in your body for months.',
        effect: (p) => { p.m -= 16; p.r += 8; p.karma += 4; p.addFlag('azr_black_january_generation'); p.addFlag('azr_black_january_witness'); },
      },
      {
        text: 'You heard it from your apartment window.',
        tag: 'heard',
        outcome: 'The next morning you walked to Azadliq Square. The flowers were already there. The coffins were already there.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('azr_black_january_generation'); },
      },
    ],
  },

  {
    id: 'azr_baku_pogrom',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 1988 && G.currentYear <= 1990 && !G.flags.has('azr_baku_pogrom_witness'),
    text: 'In January 1990, before the soldiers came, there were three days in Baku when Armenian families were found by lists. You know someone who hid an Armenian neighbor. You know someone who did not. The neighborhood you grew up in had Armenian families on every block. By February they are gone — to Yerevan, to Moscow, wherever they could get to. The apartment on the fourth floor where the Hakobyan family lived: empty. The door is still unlocked. Nobody touches their things for months.',
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
      return `You are from ${yr <= 1994 ? 'Agdam — the town they call the Hiroshima of the Caucasus' : 'one of the villages in the Lachin corridor'}, or your family is. The ceasefire came in 1994 and you are on the wrong side of it. The government puts you in a railway carriage converted to housing, or an unfinished Soviet apartment block in Baku, or a camp in the western lowlands. You brought a photograph of the house. You brought the title deed. You told your children: this is where we are from. They say: but we are from here. You say: no. You mean it.`
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
    text: 'A journalist you know is arrested. The charge is "hooliganism" or "tax evasion" or something else that means: you wrote about the wrong person. The opposition newspaper closes. The website is blocked. You have learned what you do not search for on your work computer, what you do not say in certain taxis, which names you avoid in text messages. You are not afraid, exactly. You are careful. There is a difference and also no difference.',
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
      return `September 27. The war begins. The drones are precise. Armenian positions fall in hours, then days. ${isIDP ? 'You have not seen your village in twenty-six years. You still have the deed. You still have the photograph. Your children are watching the map with you.' : 'Your cousin volunteers the second week.'} November 9: the ceasefire. Shushi — Shusha, as you call it, the cultural capital — is Azerbaijani again. Aliyev reads the agreement on television with the generals behind him. On the Azerbaijani side of the ceasefire line, a town that was rubble for thirty years. On your side: the flag. You feel something you expected to be simple. It is not simple.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.r += 6; p.addFlag('azr_war_victory_2020'); },
  },

  {
    id: 'azr_karabakh_return_2023',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Azerbaijan' && G.currentYear >= 2023 && G.flags.has('azr_karabakh_idp') && !G.flags.has('azr_karabakh_return_2023'),
    text: 'September 2023: the remaining Armenian forces in Karabakh surrender in twenty-four hours. The Armenians of Karabakh leave — nearly all of them, in a column of cars that stretches for miles. By October, the region is empty of the population it has had for centuries. You can go back. The government arranges buses. You go on the bus. The house your parents described is a ruin. The mulberry tree in the yard is still standing. You stand under it for a long time. You do not know what you thought you would feel.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 8; p.addFlag('azr_karabakh_return_2023'); },
  },

]

export default ARMENIA_AZ_EVENTS
