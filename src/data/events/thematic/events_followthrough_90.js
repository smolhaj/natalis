// Follow-through events for Mongolia depth arc
// Covers: mn_buddhism_revival_generation, mn_mongolian_script_generation,
// mn_oyu_tolgoi_generation, mn_cashmere_steppe_awareness

const IS_MONGOLIA = (G) => G.character.country?.name === 'Mongolia'

export const FOLLOWTHROUGH_90_EVENTS = [

  {
    id: 'ft90_buddhism_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_buddhism_revival_generation') &&
      G.age >= 60 &&
      !G.mem?.ft90Buddhism,
    text: 'The monastery is full now. Young monks train in lineages that were almost severed; the ritual knowledge that survived in Inner Mongolia and in the diasporic lamas has been transferred. The thangkas that lived in the felt blanket for fifty years are in a proper frame somewhere accessible. The gap in your family\'s religious life — two generations who were not allowed to practice, who practiced in secret, who did not practice at all — is not filled. It is present differently. The monastery and the gap exist at the same time.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 4; p.karma += 4; p.setMem('ft90Buddhism', true) },
  },

  {
    id: 'ft90_mongolian_script_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_mongolian_script_generation') &&
      G.age >= 55 &&
      !G.mem?.ft90Script,
    text: 'The script classes continue in schools, but most Mongolians still write in Cyrillic for everyday life. Your generation is the first to have both. You can read the street signs in traditional script that the city has started putting up alongside the Cyrillic ones. The cousins across the border in Inner Mongolia write to you in the traditional script and you write back in it — slowly, getting the proportions wrong sometimes. You are connected to them across a border drawn by other people, through an alphabet that neither of your governments tried to kill, through letters that run the wrong direction and say the right things.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.setMem('ft90Script', true) },
  },

  {
    id: 'ft90_oyu_tolgoi_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_oyu_tolgoi_generation') &&
      G.currentYear >= 2020 &&
      G.age >= 40 &&
      !G.mem?.ft90Oyu,
    text: 'The mine is producing. The GDP figures are large. The ger districts are still there. The distribution question — how much of the copper and gold revenue reaches a family in the ger district, versus an apartment downtown, versus an account in a foreign jurisdiction — has been answered in one direction more consistently than the other. Mongolia is not poor by the metrics it was using before the mine. It is not what the mine was supposed to make it, either. Both things are precisely true.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft90Oyu', true) },
  },

  {
    id: 'ft90_cashmere_desertification',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_cashmere_steppe_awareness') &&
      G.currentYear >= 2015 &&
      G.age >= 35 &&
      !G.mem?.ft90Cashmere,
    text: 'The satellite images confirm what herders already know: the steppe is retreating. Dust storms from the Gobi reach Ulaanbaatar more often than they used to. The zone of degraded land that surrounds the city is visible from the air. The cashmere market did not cause all of this. Climate change and overgrazing combined produced it. The calculation that shifted herds toward goats in the 1990s is part of a larger calculation that was made without all the variables, which is how most consequential decisions are made.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('ft90Cashmere', true) },
  },

]
