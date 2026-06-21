// events_followthrough_45.js — Denmark depth follow-throughs (3 events)
// Callbacks for: den_occupation_generation, den_liberation_generation, den_cartoon_generation
// Note: den_rescue_generation has its own late-life callback in events_denmark.js itself.

export const FOLLOWTHROUGH_45_EVENTS = [

  // ─── OCCUPATION: THE LONG QUESTION ───────────────────────────────────────────

  {
    id: 'ft45_den_occupation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('den_occupation_generation') &&
      G.currentYear >= 1970 &&
      G.age >= 60 &&
      !G.mem?.ft45DenOccLate,
    text: 'The historians have been at it for decades. The question of whether Denmark\'s policy of cooperation-as-management was a sensible response to the reality of Danish geography and military capacity, or a moral failure that enabled the occupation, has not been resolved — it has been elaborated. The rescue of the Jews in 1943 is the thing that Denmark holds up in its defence. The three years of cooperation before the rescue, and the benefits that accrue from maintaining a functioning economy under occupation, are also part of the record. You have lived long enough to see the question become historiographical rather than personal and you do not find that it has been resolved by becoming historiographical.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 2; p.setMem('ft45DenOccLate', true) },
  },

  // ─── LIBERATION: THE RETSOPGØRET IN RETROSPECT ───────────────────────────────

  {
    id: 'ft45_den_liberation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('den_liberation_generation') &&
      G.currentYear >= 1975 &&
      G.age >= 55 &&
      !G.mem?.ft45DenLibLate,
    text: 'The *retsopgøret* — the legal reckoning of 1945–48 — was the fastest and most comprehensive war crimes trial process of any occupied western country. Forty thousand cases, thirteen thousand sentences. The efficiency is sometimes cited as a sign of Danish commitment to accountability. The forty executions of Danish informers and collaborators are sometimes cited as a sign of a society settling scores as much as dispensing justice. The people who were most severely punished were not the government officials who designed the cooperation policy, but the foot soldiers who implemented it most visibly. This hierarchy of accountability is the same hierarchy you find in most post-occupation reckonings.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 2; p.setMem('ft45DenLibLate', true) },
  },

  // ─── CARTOON CRISIS: THE DECADE AFTER ────────────────────────────────────────

  {
    id: 'ft45_den_cartoon_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('den_cartoon_generation') &&
      G.currentYear >= 2016 &&
      G.age >= 50 &&
      !G.mem?.ft45DenCartoonLate,
    text: 'The cartoonist Kurt Westergaard — who drew the bomb-in-turban cartoon, the most reproduced of the twelve — had to live under permanent police protection. A Somali man with an axe was stopped in his home. A Pakistani-American was convicted in Chicago for planning an attack on the cartoonists. The papers republished the cartoons in solidarity after the Charlie Hebdo attack in 2015. The question of what the cartoons were — a legitimate exercise in press freedom, a provocation that exposed the limits of liberal multiculturalism, an insult that achieved nothing except harm — is still answered differently depending on who you ask in Denmark. The cartoons are now fifteen years old and the argument about them has not ended. It has just moved into other registers.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 2; p.setMem('ft45DenCartoonLate', true) },
  },

]
