// events_denmark.js — Denmark depth arc (7 events)
// Complements events_scandinavia.js (welfare state, Janteloven).
// Covers: WWII occupation (April 9 1940), Jewish rescue October 1943,
// liberation 1945, cartoon crisis 2005-06, immigration strictness,
// late reckoning on Danish self-image.

const IS_DANISH = (G) => G.character.country?.name === 'Denmark'

export const DENMARK_EVENTS = [

  // ─── WWII OCCUPATION: THE ACCOMMODATIONIST PATH ───────────────────────────────

  {
    id: 'den_wwii_occupation',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_DANISH(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 6 &&
      !G.mem?.denWWIIOccupation,
    text: (G) => {
      const young = G.age <= 12
      return young
        ? 'The Germans came on April 9, 1940 and the government stayed — King Christian X stayed on his horse, riding through the streets as he always had, refusing to take a German escort. The government stayed and functioned and the Danish police still operated Danish law. You are too young to understand all of what this means, but you understand that the country has made a choice: to manage the occupation rather than resist it outright. The word for this is complicated, and you will spend decades learning what it means.'
        : 'Denmark signed a non-aggression pact on April 9, 1940 — the government negotiated rather than fought, arguing that resistance was futile given Danish geography. This was different from Norway. The Danish model was collaboration-as-management: the government stayed in place, the king stayed in Denmark, the Rigsdag continued to meet. The Germans called it the "model protectorate." The question of what this bought and at what cost is one Denmark has argued about across generations.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 5; p.addFlag('den_occupation_generation'); p.setMem('denWWIIOccupation', true) },
  },

  // ─── THE JEWISH RESCUE: OCTOBER 1943 ─────────────────────────────────────────

  {
    id: 'den_jewish_rescue',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_DANISH(G) &&
      G.currentYear === 1943 &&
      G.age >= 14 &&
      !G.mem?.denJewishRescue,
    text: (G) => {
      const involved = G.age >= 18
      return involved
        ? 'In late September 1943, a German diplomat leaked to a Danish Jewish leader that deportations were planned for October 1–2. Within days, the informal Danish civil society mobilised: fishermen, doctors, harbour workers, ordinary people who hid Jewish families in churches, hospitals, and attics, and then ferried them across the Øresund to Sweden in fishing boats over several weeks. Of approximately 7,800 Danish Jews, about 7,000 reached Sweden. You were part of this network — not heroically, just as someone who knew someone who needed to be somewhere other than here. You did what needed doing.'
        : 'In late September 1943, the news spread through the country: deportations were planned. Over the following weeks, Danish civilians — your family, your neighbours, the doctor in town — hid Jewish families and put them on boats to Sweden. Nearly all of Danish Jewry reached Sweden. You are old enough to remember the frantic whispered conversations, the people who disappeared from their houses into hiding, the boats at night. You did not fully understand what you were witnessing. You understand it now.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 8; p.addFlag('den_rescue_generation'); p.setMem('denJewishRescue', true) },
  },

  // ─── LIBERATION 1945 AND THE RECKONING ───────────────────────────────────────

  {
    id: 'den_liberation_1945',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_DANISH(G) &&
      G.currentYear === 1945 &&
      G.age >= 14 &&
      !G.mem?.denLiberation45,
    text: 'Denmark was liberated on May 5, 1945 — three days before Germany\'s full surrender. The lights went on in windows across the country that night. Then the reckoning began: who had collaborated with the occupiers beyond what was strictly necessary, who had profited, who had volunteered for the Waffen-SS, who had informed. The legal proceedings were called *retsopgøret* — the legal reckoning. Forty thousand people were tried. Thirteen thousand sentences. Forty executions for wartime treason. The model protectorate had produced collaborators as surely as any occupied country. The trial of the accommodation policy was also, in a quieter way, underway.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 4; p.addFlag('den_liberation_generation'); p.setMem('denLiberation45', true) },
  },

  // ─── CARTOON CRISIS 2005-2006 ─────────────────────────────────────────────────

  {
    id: 'den_cartoon_crisis',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_DANISH(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2007 &&
      G.age >= 25 &&
      !G.mem?.denCartoonCrisis,
    text: (G) => {
      const isMuslim = ['sunni_muslim', 'shia_muslim', 'sufi_muslim', 'muslim_secular'].includes(G.religion)
      return isMuslim
        ? 'Jyllands-Posten published the twelve cartoons on September 30, 2005. The paper said it was a test of free speech. You experienced it as a test of something else: whether Danish Muslims were fully Danish, or were conditional members of Danish society whose religion was available for use as a prop in cultural arguments. The embassies burned in the Middle East and the Danish flags burned and you had not drawn those cartoons and had nothing to do with what they caused, and yet you were navigating the Danish Muslim question from the inside of it.'
        : 'Jyllands-Posten published twelve cartoons of the Prophet Muhammad on September 30, 2005. After months of diplomatic escalation, embassies burned in Beirut, Damascus, Tehran, and elsewhere. The Danish government said it could not and would not apologise for press freedom. The distinction between government endorsement and press freedom was not, in all the countries where the protests occurred, a familiar distinction. Denmark found itself at the centre of a global argument about the limits of speech, secularism, and the integration of Muslim minorities. You have a position on all of this. The position is more complicated than either side of the public argument acknowledged.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 5; p.addFlag('den_cartoon_generation'); p.setMem('denCartoonCrisis', true) },
  },

  // ─── IMMIGRATION: THE STRICTEST IN THE EU ────────────────────────────────────

  {
    id: 'den_immigration_policy',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_DANISH(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      !G.mem?.denImmigrationPolicy,
    text: (G) => {
      const isImmigrant = G.flags.has('emigrated') || G.flags.has('refugee')
      return isImmigrant
        ? 'Denmark has the strictest immigration rules in the EU. The 24-year rule for family reunification. The points system. The "ghetto" designation for specific neighbourhoods that triggers additional requirements. The requirement that children from designated areas attend Danish-language daycare for mandatory hours per week. The policies are administered by governments across the political spectrum — the Social Democrats implemented much of what was originally the far-right Danish People\'s Party programme. You live inside these policies. Some of them have affected you directly. You have formed a view about whether this is integration or something with a different name.'
        : 'Denmark became, by some measures, the country in the EU with the most restrictive immigration regime. The journey was across governments and decades — from the 1983 Aliens Act to the 2002 24-year rule to the "ghetto" designation policies to the Social Democratic immigration turn of the 2010s. The argument in favour is integration and social cohesion. The argument against is about what kind of society produces those arguments about itself. You have a view. The view has probably shifted at least once in the years since you formed it.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.setMem('denImmigrationPolicy', true) },
  },

  // ─── THE DANISH SELF-IMAGE: LATE RECKONING ───────────────────────────────────

  {
    id: 'den_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_DANISH(G) &&
      G.age >= 60 &&
      !G.mem?.denLateReckoning,
    text: 'Denmark has a specific national self-image: small, decent, well-organised, humanitarian. The country that rescued its Jews. The first country to legalise same-sex unions. The welfare state that actually works. This self-image is real in important ways and simplifies in others. The accommodation of the German occupation was also Denmark. The wartime collaboration and profiteering were also Denmark. The immigration restrictiveness — described by its defenders as integration realism and by its critics as institutionalised exclusion — is also Denmark. The cartoon crisis and the pride with which Denmark defended its press freedom, and the costs that the cartoon crisis imposed on Danish Muslims who had no part in the cartoons, was also Denmark. You have lived the whole self-image and you know it is both accurate and a partial picture. You are not sure this is different from any country, but you know it is true of yours.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 2; p.karma += 3; p.setMem('denLateReckoning', true) },
  },

  // ─── DEN RESCUE LATE: WHAT IT MEANT ──────────────────────────────────────────

  {
    id: 'den_rescue_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_DANISH(G) &&
      G.flags.has('den_rescue_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 55 &&
      !G.mem?.denRescueLate,
    text: 'The rescue of Danish Jewry in 1943 has become the central moral fact of Danish wartime history — the thing that Denmark points to when the accommodation of the occupation comes up. The rescue was real and extraordinary. It also took place alongside three years of functioning cooperation with the occupying power. Both of these things are true and the relationship between them is complicated. The Danish historians who have written about the occupation in recent decades have had to negotiate the tension between the rescue as genuine moral achievement and the rescue as the thing that made the accommodation survivable to the national conscience. You have lived this tension from the inside of the country that holds it.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 2; p.karma += 3; p.setMem('denRescueLate', true) },
  },

]
