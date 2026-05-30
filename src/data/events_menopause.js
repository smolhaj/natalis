// events_menopause.js
// Menopause arc — female character, ages 45–58.
// Cultural variation: Japan (low-symptom, different vocabulary), USA (medicalized),
// subsaharan/developing (status change, post-reproductive social role), post-Soviet (stoicism).
// The arc fires in sequence via mem guards.

export const MENOPAUSE_EVENTS = [

  // ── PERIMENOPAUSE / FIRST SIGNS ──────────────────────────────────────────────

  {
    id: 'meno_first_signs',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 45 && G.age <= 52 &&
      !G.mem?.menoFirstSignsDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const country = G.character?.country?.name ?? ''
      const yr = G.currentYear ?? 2000

      if (country === 'Japan') {
        return 'You have heard the word *konenki* — the period of renewal. Certain things are different now. The disrupted sleep, the occasional heat that moves through you without warning. By the standards of what the older women describe, yours are mild. You are not sure if this is constitution or diet or the way this culture has always discussed it — with less catastrophe than other places.'
      }
      if (a === 'subsaharan' || a === 'developing_urban' || a === 'developing_unstable') {
        return 'Your body is changing in ways the older women in your family described in practical terms, not medical ones. The irregular cycles, the heat that arrives without cause. You are entering the years the elders called the time of becoming. There is a different standing coming. You are not there yet.'
      }
      if (a === 'post_soviet') {
        return 'You do not make a fuss about it. Neither did your mother. The disrupted sleep, the flushes that move through you at meetings — you manage them as you manage other things. You have not discussed it with a doctor. You will not.'
      }
      if (yr >= 1990 && (a === 'wealthy_west' || a === 'wealthy_east')) {
        return 'The perimenopause starts with small things: a cycle that is three weeks rather than four, a heat that rises in your face at a work meeting. You recognize these for what they are. The information available now is better than it was for your mother\'s generation, and also contradictory in ways that require some patience.'
      }
      if (yr < 1990) {
        return 'The changes arrive without a name you can find easily. The night sweats that wake you. The temperature that your husband does not understand and you do not have language to explain without embarrassment. Your mother had the same years but did not discuss them.'
      }
      return 'The body is changing. You know what this is. You have been half-expecting it for some years.'
    },
    choices: [
      {
        text: 'See a doctor — understand what is happening',
        tag: null,
        outcome: 'The information helps, even where the options are limited. You have a name and a framework now.',
        effect: (p) => { p.h += 3; p.m += 5; p.addFlag('menopause_medical_help'); p.setMem('menoFirstSignsDone', true) },
      },
      {
        text: 'Manage it as you have managed other things',
        tag: null,
        outcome: 'You adapt. You always have.',
        effect: (p) => { p.m += 2; p.setMem('menoFirstSignsDone', true) },
      },
    ],
    effect: null,
  },

  // ── MAIN MENOPAUSE ARC ───────────────────────────────────────────────────────

  {
    id: 'meno_main_experience',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 49 && G.age <= 55 &&
      G.mem?.menoFirstSignsDone === true &&
      !G.mem?.menoMainDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const country = G.character?.country?.name ?? ''
      const yr = G.currentYear ?? 2000
      const hasMedHelp = G.flags.has('menopause_medical_help')

      if (country === 'Japan') {
        return 'The transition has been unremarkable, by the standards of what you have read about it elsewhere. You mention this to a friend. She says the same. You wonder sometimes if it is the food, the culture, or simply the absence of catastrophe as a framing — the expectation that this period is not an ending but a different arrangement.'
      }
      if (a === 'subsaharan') {
        const isElder = G.age >= 52
        if (isElder) return 'You have crossed into the years the older women occupy — the ones who are consulted, whose word has weight in the family decisions, who sit at the centre of things rather than the edge. The body has changed. The standing has changed too. Not always easier. Sometimes easier.'
        return 'The change is physical. The older women in the community have a particular way of receiving you now — a nod, a quiet acknowledgement that you are in the years of becoming. You are not sure yet what that means in practice.'
      }
      if (a === 'post_soviet') {
        return hasMedHelp
          ? 'You have more information than your mother did. The treatment options are limited in what is available to you but you manage. You do not make it a large subject. It is a physical transition that is happening and will finish.'
          : 'The hot flushes are the most disruptive thing. You wake at 3am soaked and throw off the blanket. Your husband sleeps through it. You do not tell him. You adapt, as you have always adapted, without making it a subject.'
      }
      if (yr >= 2000 && (a === 'wealthy_west' || a === 'wealthy_east')) {
        return hasMedHelp
          ? 'The HRT decision was not straightforward — the studies say different things and the doctor offered information without a definitive answer. You made a choice based on what you could weigh. Whether it was the right one is not fully knowable. You are managing.'
          : 'The transition is not invisible and not catastrophic. The heat at inconvenient moments, the sleep that is lighter than before, the body recalibrating on its own schedule. You navigate it.'
      }
      if (yr < 1980) {
        return 'The change of life is what your mother called it, and her mother before her. No one spoke of it directly. You have pieced together what is happening from observation and the reluctant information of older women who prefer not to discuss it. You manage mostly by managing.'
      }
      return 'The body is in transition. It takes the time it takes.'
    },
    effect: (p) => { p.h -= 3; p.setMem('menoMainDone', true) },
    choices: null,
  },

  // ── SOCIAL DIMENSION ────────────────────────────────────────────────────────

  {
    id: 'meno_workplace_invisibility',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 50 && G.age <= 57 &&
      G.career &&
      G.mem?.menoFirstSignsDone === true &&
      (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east') &&
      (G.currentYear ?? 0) >= 1980 &&
      !G.mem?.menoWorkplaceDone,
    text: (G) => {
      const yr = G.currentYear ?? 2000
      if (yr < 1990) {
        return 'You are fifty-something and female in a workplace that has mostly stopped noticing you are there. This is not new — it has been building for some years. The meetings where the younger men speak over what you have just said and are thanked for the point. You have watched this happen to older women before you. You are now the older woman.'
      }
      return 'There is a particular social experience of being a woman in her fifties in a workplace that prizes visible vitality: you become, in certain rooms, easier to overlook. This is not dramatic. It is cumulative and quiet. You have noticed it. You have not decided yet what to do with the noticing.'
    },
    choices: [
      {
        text: 'Name it — at least to yourself',
        tag: null,
        outcome: 'Naming it does not fix it but changes your relationship to it. You stop being surprised.',
        effect: (p) => { p.m += 5; p.e += 3; p.addFlag('named_workplace_ageism'); p.setMem('menoWorkplaceDone', true) },
      },
      {
        text: 'Channel the frustration into something that cannot be overlooked',
        tag: null,
        outcome: 'You produce work that is too good to dismiss. This is more exhausting than it should be.',
        effect: (p) => { p.e += 8; p.m -= 3; p.setMem('menoWorkplaceDone', true) },
      },
      {
        text: 'Plan the exit — on your own terms, in your own time',
        tag: null,
        outcome: 'The work still has years in it. But you start counting them differently.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('menoWorkplaceDone', true) },
      },
    ],
    effect: null,
  },

  // ── SUBSAHARAN ELDER STATUS ──────────────────────────────────────────────────

  {
    id: 'meno_elder_status_gained',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 52 && G.age <= 58 &&
      (G.character.country.archetype === 'subsaharan' || G.character.country.archetype === 'developing_urban') &&
      G.mem?.menoMainDone === true &&
      !G.mem?.menoElderStatusDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const isWestAfrica = ['Nigeria', 'Ghana', 'Senegal', 'Côte d\'Ivoire', 'Mali'].includes(country)
      if (isWestAfrica) {
        return 'You are now among the women who are consulted. Not the oldest — not yet — but no longer the ones being instructed. Younger women in the family and community ask your opinion on things they would not have asked three years ago. You give it carefully. You have watched what happens to women whose advice is too freely given and to those who hoard what they know.'
      }
      return 'The post-reproductive years are not invisible here — they carry a different weight. You have moved into the category of the women who are listened to. This came with the body\'s change, as the elders said it would. You begin to understand what they meant.'
    },
    effect: (p) => { p.m += 10; p.s += 5; p.karma += 5; p.addFlag('female_elder_status'); p.setMem('menoElderStatusDone', true) },
    choices: null,
  },

  // ── POST-MENOPAUSE ───────────────────────────────────────────────────────────

  {
    id: 'meno_post_reflection',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 55 && G.age <= 60 &&
      G.mem?.menoMainDone === true &&
      !G.mem?.menoPostReflDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const country = G.character?.country?.name ?? ''

      if (country === 'Japan') {
        return 'You are through it. *Konenki* is over. The older women said this is when women begin. They were not wrong. The concerns of the first half of your adult life recede. What remains is clearer for the receding.'
      }
      if (a === 'subsaharan') {
        return 'The transition is complete. You are in the years the elder women describe as the ones where you finally see clearly — the competing demands of reproduction and care no longer shape the calendar of your body. Something has clarified. You do not have another word for it.'
      }
      if (a === 'post_soviet') {
        return 'It is done. You managed it as you manage other things. There was no fuss. You sleep better than you did at the worst of it. You do not dwell on it. You have other things.'
      }
      return 'The transition is behind you. What you were told to fear about it was partly wrong — the fear was louder than the experience, for you. What you were not told was that certain things simplify on the other side. Your relationship with your own body, for one.'
    },
    effect: (p) => { p.m += 8; p.h += 3; p.setMem('menoPostReflDone', true) },
    choices: null,
  },

]
