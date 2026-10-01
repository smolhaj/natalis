// events_followthrough_65.js
// Follow-throughs for Vietnam depth flags:
// vn_dep_reeducation_survivor, vn_dep_con_lai, vn_dep_doi_moi_generation.

export const FOLLOWTHROUGH_65_EVENTS = [

  // ── RE-EDUCATION SURVIVOR ─────────────────────────────────────────────────────

  {
    id: 'ft65_reeducation_midlife',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('vn_dep_reeducation_survivor') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.ft65ReedMidlife,
    text: `The camp was years of your life. The camp did not correct you in the sense they intended — it corrected how you navigate rooms, how you manage what is said and what is held. You are in the Doi Moi economy now, which has space for people with skills, but not unlimited space for people with your history. Your children know the broad outlines. You have decided which parts they should know in detail and which parts are yours to carry alone. The carrying is not weight, exactly. It is just a part of how you stand.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.setMem('ft65ReedMidlife', true) },
  },

  {
    id: 'ft65_reeducation_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vn_dep_reeducation_survivor') &&
      G.age >= 60 &&
      !G.mem?.ft65ReedLate,
    text: `You have been asked, over the years, to describe the camp. You have described it accurately and in varying levels of detail depending on who was asking. The versions you gave your children, your grandchildren, a journalist, a researcher — each version was true and each was partial. The full version does not have a form that works in a room with other people in it. You hold the full version inside and you have learned that holding is not the same as not having.`,
    choices: null,
    effect: (p) => { p.r += 7; p.setMem('ft65ReedLate', true) },
  },

  // ── CON LAI ───────────────────────────────────────────────────────────────────

  {
    id: 'ft65_con_lai_young_adult',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('vn_dep_con_lai') &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ft65ConLaiYoung,
    text: (G) => {
      const kid = G.character.gender === 'female' ? 'girl' : 'boy'
      if (G.currentCountry?.name !== 'Vietnam') return `In Vietnam you were the American. Here you are Vietnamese, and the other Vietnamese know exactly what you are, and the people at work ask where you are from and then where you are really from. You have stopped explaining. You keep one photograph of your mother in your wallet.`
      return G.currentYear >= 1990
        ? `Most of the con lai you grew up with have gone on the flights. You stayed. The woman at the market who has sold you rice for ten years still calls you the American's ${kid}, not unkindly.`
        : `You are grown, and the face has not stopped being the first thing anybody reads. The woman at the market still calls you the American's ${kid}, not unkindly.`
    },
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 3; p.e += 4; p.setMem('ft65ConLaiYoung', true) },
  },

  {
    id: 'ft65_con_lai_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vn_dep_con_lai') &&
      G.age >= 50 &&
      !G.mem?.ft65ConLaiLate,
    text: `The war that made you ended before you could remember it. The armies went home and the countries moved on, and you moved on inside them. Somebody's grandchild asks, at a wedding, why you look the way you do. You tell the short version, which you have polished over fifty years until it no longer cuts the hand.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft65ConLaiLate', true) },
  },

  // ── DOI MOI GENERATION ────────────────────────────────────────────────────────

  {
    id: 'ft65_doi_moi_midlife',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('vn_dep_doi_moi_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft65DoiMoiMidlife,
    text: `The Doi Moi economy produced something remarkable: a country that went from widespread food shortages in the 1980s to one of the world's largest rice exporters by the 1990s, from near-universal poverty to a growing middle class in thirty years — all under a one-party state that was simultaneously restructuring itself. You built your career inside this. The restructuring and the career are related. The ideology became the background and the growth became the foreground and you worked in the foreground.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.m += 2; p.setMem('ft65DoiMoiMidlife', true) },
  },

  {
    id: 'ft65_doi_moi_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vn_dep_doi_moi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft65DoiMoiLate,
    text: `You remember what the economy was before the reform and what it was during and what it became. The memory is specific — the prices, the queues, the cousin's Honda, the cafe that opened, the foreign factory that arrived — and the trajectory inside the memory is the whole arc of modern Vietnam. The party that presided over the worst of the post-war years is the same party that presided over the growth. You hold both in the same mind because you lived inside both in the same life.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft65DoiMoiLate', true) },
  },

]
