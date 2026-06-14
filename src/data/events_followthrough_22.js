// Follow-through events for Armenia and Azerbaijan arcs

const FOLLOWTHROUGH_22_EVENTS = [

  {
    id: 'ft22_arm_karabakh_veteran_late',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arm_karabakh_veteran_1') && G.flags.has('arm_war_2020_loss') && G.age >= 45 && !G.mem.ft22_vet_late_done,
    text: 'You fought in those mountains in 1991. You know the road to Shushi. You know the village names. In November 2020 you watch the map on a phone screen and see them all go back, one name at a time, until the ceasefire map looks like 1988 again. A veteran from your unit calls and says nothing for a long time. Then: did we do it wrong, or did it not matter what we did. You do not answer because you do not know.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setMem('ft22_vet_late_done', true); },
  },

  {
    id: 'ft22_arm_dark_winter_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('arm_dark_winter_survivor') && G.age >= 55 && !G.mem.ft22_dark_echo_done,
    text: (G) => {
      const yr = G.currentYear
      return `The power cuts for ${yr >= 2025 ? 'three hours' : 'a day'} — a grid fault, nothing serious. Something happens in your chest that has no name. You find yourself filling every container with water. You find yourself checking the candles. Your partner asks what you are doing. You do not know how to explain the 1990s to someone who was not here for them.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 4; p.setMem('ft22_dark_echo_done', true); },
  },

  {
    id: 'ft22_arm_velvet_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('arm_velvet_revolution') && G.flags.has('arm_war_2020_loss') && G.age >= 35 && !G.mem.ft22_velvet_reck_done,
    text: 'In 2018 you believed something was changing. You believed a man who walked from Gyumri to Yerevan could change the direction of the country. In November 2020 Pashinyan signed the ceasefire at 3am and you heard it on your phone at 7am and you sat in the kitchen and did not move for a long time. You are not certain what you feel about hope now. You are not certain what use it is.',
    choices: [
      {
        text: 'You hold onto the belief that the revolution still meant something.',
        tag: 'held',
        outcome: 'The war happened because of thirty years of corruption and mismanagement before 2018, not because of 2018. You believe that. Mostly.',
        effect: (p) => { p.m -= 5; p.karma += 3; p.setMem('ft22_velvet_reck_done', true); },
      },
      {
        text: 'You do not know what to believe anymore.',
        tag: 'uncertain',
        outcome: 'You stopped watching the political programs. You are not apathetic — you are something that doesn\'t have a name in Armenian yet.',
        effect: (p) => { p.m -= 10; p.r += 5; p.setMem('ft22_velvet_reck_done', true); },
      },
    ],
  },

  {
    id: 'ft22_azr_idp_return',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('azr_karabakh_idp') && G.flags.has('azr_karabakh_return_2023') && G.age >= 50 && !G.mem.ft22_idp_return_done,
    text: 'You went back. The mulberry tree was there. The house was not what you remembered — the walls had been repainted, then abandoned, then used as something else, then abandoned again. Your children came with you the second time. Your son stood in the yard and said: so this is it. You did not know how to explain thirty years of holding a deed, a photograph, a map in your head. You said: yes. This is it. You planted something in the yard, though you are not sure yet if you will stay.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 6; p.setMem('ft22_idp_return_done', true); },
  },

  {
    id: 'ft22_azr_baku_pogrom_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('azr_baku_pogrom_witness') && G.age >= 55 && !G.mem.ft22_pogrom_late_done,
    text: 'The door on the fourth floor. You walked past it for months before a new family moved in. You never told your children what happened there in January 1990. Not what the neighbors did. Not what you did — which was nothing, which was looking at the floor when they listed the names in the stairwell. You have carried this particular weight long enough that you have stopped noticing it. But it is there.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 7; p.karma -= 3; p.setMem('ft22_pogrom_late_done', true); },
  },

  {
    id: 'ft22_arm_genocide_bearer_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('arm_genocide_memory_bearer') && G.age >= 60 && !G.mem.ft22_genocide_late_done,
    text: 'Your grandmother is gone. Your mother is gone. The family chain by which you knew what happened in 1915 has broken at you. You are now the one who remembers it from the one who survived it. April 24 comes every year. You go to the memorial. The young people there have never met anyone who was alive in 1915. Neither have you, but you met someone who did. You try to explain the difference. You are not sure they can feel it yet.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.e += 2; p.setMem('ft22_genocide_late_done', true); },
  },

]

export default FOLLOWTHROUGH_22_EVENTS
