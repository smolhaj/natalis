// events_followthrough_64.js
// Follow-throughs for Philippines depth flags:
// OFW family, Moro identity, BPO generation, seaman family,
// Ondoy survivor.

export const FOLLOWTHROUGH_64_EVENTS = [

  // ── OFW FAMILY ────────────────────────────────────────────────────────────────

  {
    id: 'ft64_ofw_family_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_dep_ofw_family') &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.ft64OfwMidlife,
    text: `You have now been the sender or the receiver for decades. The balikbayan boxes have a rhythm you know in your body. The phone calls on Sundays — or the waiting for Sunday calls — are built into the calendar of your year. The children of OFW parents grow up learning to be grateful for what arrives by ship and to keep the gratitude and the absence separate, because they are related but not the same thing. You have learned to keep them separate. The learning took years.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.setMem('ft64OfwMidlife', true) },
  },

  {
    id: 'ft64_ofw_family_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ph_dep_ofw_family') &&
      G.age >= 55 &&
      !G.mem?.ft64OfwLate,
    text: `The OFW system ran for decades and the country called them heroes because the remittances ran the economy and the word covered the cost of what was not said. What was not said: the missing of school events, the parent known from photographs and phone calls, the reunion at the airport where the child who was seven is now fifteen and the parent looks briefly lost. You built a life inside this arithmetic. The arithmetic was real and the life was real and they coexisted without resolution.`,
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 3; p.setMem('ft64OfwLate', true) },
  },

  // ── MORO IDENTITY ─────────────────────────────────────────────────────────────

  {
    id: 'ft64_moro_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_dep_moro_identity') &&
      G.age >= 30 &&
      !G.mem?.ft64MoroMidlife,
    text: `The Bangsamoro Organic Law passed in 2019. After fifty years of armed conflict — the MNLF, the MILF, the Marawi siege — there is now a regional parliament and a chief minister. The peace agreement does not mean the same thing to everyone who lived through the conflict. You have specific decades inside it. You have specific people you are counting. The BOL is real. What it produces will take more decades to know than you may have left. You watch the younger people in the BARMM with a particular kind of attention.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft64MoroMidlife', true) },
  },

  {
    id: 'ft64_moro_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ph_dep_moro_identity') &&
      G.age >= 55 &&
      !G.mem?.ft64MoroLate,
    text: `The word Moro has been inside your life longer than the Philippine Republic has been a functioning entity from your perspective. The name was a slur from the Spanish and became the name the people claimed and the name the peace agreement used. The checkpoints changed. The soldiers changed. The checkpoint itself remained. You have been through checkpoints with your name on your ID for so many years that you hold the ID differently now — with the tired precision of someone who has done this enough times to know exactly where it goes.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft64MoroLate', true) },
  },

  // ── BPO GENERATION ────────────────────────────────────────────────────────────

  {
    id: 'ft64_bpo_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_dep_bpo_generation') &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.ft64BpoMidlife,
    text: `The BPO industry peaked somewhere and you were inside it. The accent you adopted — neutral, American-adjacent, the edges removed — is available to you still and you notice that you slip into it in certain situations. The call center job was a starting point that extended into a decade or a career. The people you worked with had the same arrangement: the night air, the cafeteria at three in the morning, the salary that was more than what a teacher made. You maintained an ambivalent relationship to the thing you were good at.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft64BpoMidlife', true) },
  },

  // ── SEAMAN FAMILY ─────────────────────────────────────────────────────────────

  {
    id: 'ft64_seaman_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_dep_seaman_family') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft64SeamanMidlife,
    text: `The nine-month contracts made a life measured differently from lives measured in quarters or academic years. You know this measurement. The children grew in nine-month blocks while the parent was away. The homecoming was an event with a specific structure: the arrival, the shopping bags from Dubai or Rotterdam, the adjustment period before the house remembered how to have someone in it who had been at sea. You have been the parent or the child or the spouse inside this structure. All three have a specific weight.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft64SeamanMidlife', true) },
  },

  {
    id: 'ft64_seaman_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ph_dep_seaman_family') &&
      G.age >= 55 &&
      !G.mem?.ft64SeamanLate,
    text: `A quarter of the world's seafarers are Filipino. The system ran through the POEA, the OWWA, the manning agencies, the shipping lines in Greece and Japan and Norway. The Philippine maritime worker was a global export alongside copper wire and electronics. You were inside this system. The sea was the work and the world's cargo moved partly because of you. The pension is modest. The world that moved does not remember the specific hands that moved it.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.setMem('ft64SeamanLate', true) },
  },

  // ── ONDOY SURVIVOR ────────────────────────────────────────────────────────────

  {
    id: 'ft64_ondoy_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_dep_ondoy_survivor') &&
      G.age >= 25 &&
      G.currentYear >= 2010 &&
      !G.mem?.ft64OndoyMidlife,
    text: `Since Ondoy you note the weather differently. The PAGASA bulletins in September have a different register than they did before 2009. You know the elevation of your house. When the rainfall exceeds what feels right, you locate the route to the second floor or to the neighbours with the second floor. Tropical Storm Ondoy dropped a month of rain in six hours and the response went through social media and private bangkas because the official systems were not scaled for what happened. You carry the specific knowledge of what not being scaled for something looks like.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft64OndoyMidlife', true) },
  },

]
