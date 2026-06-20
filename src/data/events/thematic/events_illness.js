// events_illness.js
// Diagnosis and management events for 10 chronic conditions.
// Each fires once via G.mem guard when risk conditions are met.
// Conditions: diabetes, heart_disease, cancer_survivable, copd,
// chronic_back_pain, hiv_aids, blindness, deafness,
// chronic_depression, disability_injury

export const ILLNESS_EVENTS = [

  // ── TYPE 2 DIABETES ─────────────────────────────────────────────────────────

  {
    id: 'ill_diabetes_diagnosis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.illDiabetes &&
      G.age >= 35 &&
      !G.conditions.some(c => c.id === 'diabetes') &&
      (G.fitness < 40 || G.stats.health < 55 || G.flags.includes('overweight')),
    text: (G) => {
      const hc = G.character.country.healthcare ?? 'fair'
      if (hc === 'excellent' || hc === 'good') {
        return 'A routine blood test comes back with elevated glucose. The doctor is matter-of-fact: Type 2 diabetes. Manageable with lifestyle changes and, depending on how you respond, medication. It is a diagnosis that many people have and that requires ongoing attention.'
      }
      return 'You have been tired for months. Finally seeing a doctor, the blood sugar reading explains it. The doctor says the word — diabetes — and gives you a list of things to change. Some of them are expensive. All of them take time.'
    },
    choices: [
      {
        text: 'Manage it — medication, diet, regular monitoring',
        tag: null,
        outcome: 'The adjustment takes three months to become routine. Your numbers stabilise. The condition is present but contained.',
        effect: (p) => { p.h -= 3; p.m -= 5; p.mo -= 800; p.addCondition('diabetes', 'moderate'); p.manageCondition('diabetes', true); p.addFlag('manages_chronic_condition'); p.setMem('illDiabetes', true) },
      },
      {
        text: 'Adjust your diet — avoid medication for now',
        tag: null,
        outcome: 'Discipline helps. Your numbers are better but not controlled. The condition progresses slowly without the medication.',
        effect: (p) => { p.h -= 5; p.m -= 3; p.addCondition('diabetes', 'moderate'); p.setMem('illDiabetes', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ill_diabetes_diagnosis_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.illDiabetes &&
      G.age >= 55 &&
      !G.conditions.some(c => c.id === 'diabetes'),
    text: 'The diagnosis arrives at your regular check-up. Your glucose has been creeping for years — the doctor is surprised you haven\'t felt worse. Type 2 diabetes at this age is common. The treatment plan is straightforward: medication, monitoring, and paying attention to what you eat. Nothing you haven\'t heard before.',
    choices: [
      {
        text: 'Start treatment and manage carefully',
        tag: null,
        outcome: 'Within six months the readings are stable. The condition is part of your daily routine now.',
        effect: (p) => { p.h -= 4; p.mo -= 600; p.addCondition('diabetes', 'mild'); p.manageCondition('diabetes', true); p.addFlag('manages_chronic_condition'); p.setMem('illDiabetes', true) },
      },
      {
        text: 'Make some changes but don\'t commit to medication',
        tag: null,
        outcome: 'The condition doesn\'t progress quickly. But it doesn\'t improve either.',
        effect: (p) => { p.h -= 5; p.addCondition('diabetes', 'moderate'); p.setMem('illDiabetes', true) },
      },
    ],
    effect: null,
  },

  // ── HEART DISEASE ────────────────────────────────────────────────────────────

  {
    id: 'ill_heart_disease_diagnosis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.illHeartDisease &&
      G.age >= 45 &&
      !G.conditions.some(c => c.id === 'heart_disease') &&
      (G.flags.includes('smoker') || G.flags.includes('diagnosed_diabetes') || G.conditions.some(c => c.id === 'diabetes') || G.stats.health < 50),
    text: (G) => {
      const isSmoke = G.flags.includes('smoker')
      return isSmoke
        ? 'An ECG after a chest tightness episode confirms what the doctor suspected. The smoking has done what smoking does over decades. Coronary artery disease: the arteries have narrowed. Not a heart attack — yet. But a clear warning.'
        : 'The cardiac workup was ordered because of family history and your numbers. The results confirm arterial narrowing. Heart disease, the doctor says, as if naming something that was already there and just needed a word.'
    },
    choices: [
      {
        text: 'Full treatment — medications, cardiac rehab, lifestyle overhaul',
        tag: null,
        outcome: 'The discipline is hard in the first year. By the second, it is habit. The prognosis is significantly improved.',
        effect: (p) => { p.h -= 6; p.m -= 8; p.mo -= 2000; p.addCondition('heart_disease', 'moderate'); p.manageCondition('heart_disease', true); p.addFlag('manages_chronic_condition'); p.setMem('illHeartDisease', true) },
      },
      {
        text: 'Take the medication but keep most habits',
        tag: null,
        outcome: 'The medication helps. The unchanged habits slow the improvement. A compromise that is neither safe nor negligent.',
        effect: (p) => { p.h -= 8; p.m -= 4; p.mo -= 800; p.addCondition('heart_disease', 'moderate'); p.setMem('illHeartDisease', true) },
      },
    ],
    effect: null,
  },

  // ── CANCER (SURVIVABLE TRACK) ────────────────────────────────────────────────

  {
    id: 'ill_cancer_survivable',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.illCancer &&
      G.age >= 38 &&
      !G.conditions.some(c => c.id === 'cancer_survivable') &&
      !G.flags.includes('cancer'),
    text: (G) => {
      const hc = G.character.country.healthcare ?? 'fair'
      const archetype = G.character.country.archetype
      if (hc === 'excellent' || hc === 'good') {
        return 'The scan was precautionary. The result is not. Early-stage — that word, early, does significant work in the oncologist\'s sentence. Treatable. A course of treatment, monitoring, and the statistical likelihood of a full recovery. The word cancer has landed. You sit with it for a while.'
      }
      return 'The doctor says the word and your body processes it before your mind does. Cancer. The treatment is available and the prognosis is cautiously good — if you can complete the full course. That qualifier, if, carries a lot of weight depending on what the treatment costs and what you can access.'
    },
    choices: [
      {
        text: 'Begin full treatment immediately',
        tag: null,
        outcome: 'The treatment is hard. The outcome, eventually, is good. You carry the after of it with you.',
        effect: (p) => { p.h -= 15; p.m -= 20; p.mo -= 5000; p.addCondition('cancer_survivable', 'severe'); p.addFlag('cancer_treatment'); p.addFlag('cancer_survivor'); p.setMem('illCancer', true) },
      },
      {
        text: 'Begin treatment — stretched thin, but you commit',
        tag: null,
        outcome: 'The financial stress is significant. The treatment works. You are poorer and alive.',
        effect: (p) => { p.h -= 18; p.m -= 22; p.mo -= 8000; p.addCondition('cancer_survivable', 'severe'); p.addFlag('cancer_treatment'); p.addFlag('cancer_survivor'); p.setMem('illCancer', true) },
      },
    ],
    effect: null,
  },

  // ── COPD ─────────────────────────────────────────────────────────────────────

  {
    id: 'ill_copd_diagnosis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.illCopd &&
      G.age >= 45 &&
      !G.conditions.some(c => c.id === 'copd') &&
      (G.flags.includes('smoker') || G.flags.includes('pollution_exposure')),
    text: (G) => {
      const isSmoke = G.flags.includes('smoker')
      return isSmoke
        ? 'You have been short of breath on stairs for two years. The spirometry test confirms chronic obstructive pulmonary disease. The lungs have been accumulating the cost of years of smoking. The damage already done cannot be undone — only slowed.'
        : 'The dust and fumes of decades of work in this environment have done what exposure always does. The diagnosis is COPD: the airways have been compromised by chronic irritation. You will need inhaled medication and, eventually, supplemental oxygen may become part of the picture.'
    },
    choices: [
      {
        text: 'Start pulmonary rehabilitation and medication',
        tag: null,
        outcome: 'The inhalers help considerably. The breathlessness on exertion is managed. Smoking, if you haven\'t already stopped, you stop.',
        effect: (p) => { p.h -= 8; p.m -= 6; p.mo -= 600; p.addCondition('copd', 'moderate'); p.manageCondition('copd', true); p.addFlag('manages_chronic_condition'); p.setMem('illCopd', true) },
      },
      {
        text: 'Accept the diagnosis but make limited changes',
        tag: null,
        outcome: 'The condition progresses at the rate you\'ve allowed it to. Some years are notably worse than others.',
        effect: (p) => { p.h -= 12; p.m -= 5; p.addCondition('copd', 'moderate'); p.setMem('illCopd', true) },
      },
    ],
    effect: null,
  },

  // ── CHRONIC BACK PAIN ────────────────────────────────────────────────────────

  {
    id: 'ill_back_pain_onset',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.illBackPain &&
      G.age >= 25 &&
      !G.conditions.some(c => c.id === 'back_pain') &&
      (G.career?.field === 'labour' || G.career?.field === 'agriculture' || G.career?.field === 'construction' || G.flags.includes('physical_work')),
    text: 'It started as a twinge after a long shift, something that would clear up with rest. It didn\'t clear up. Three weeks later, the lower back ache is a constant companion — not disabling, but present in everything you do. The physiotherapist confirms what you suspected: disc compression, accumulated from years of the work.',
    choices: [
      {
        text: 'Physiotherapy and pain management',
        tag: null,
        outcome: 'The treatment helps. The pain is managed to a functional level. You learn to work with it.',
        effect: (p) => { p.h -= 4; p.m -= 5; p.mo -= 500; p.addCondition('back_pain', 'mild'); p.manageCondition('back_pain', true); p.addFlag('manages_chronic_condition'); p.setMem('illBackPain', true) },
      },
      {
        text: 'Work through it — rest when you can',
        tag: null,
        outcome: 'Some weeks are worse than others. The condition becomes the water you swim in.',
        effect: (p) => { p.h -= 6; p.m -= 4; p.addCondition('back_pain', 'moderate'); p.setMem('illBackPain', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ill_back_pain_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.illBackPain &&
      G.age >= 40 &&
      !G.conditions.some(c => c.id === 'back_pain'),
    text: 'At some point in your forties the back becomes something you negotiate with. The disc has compressed. The sciatic nerve, occasionally, makes itself known. You have watched it come on friends and colleagues and now it is yours.',
    choices: [
      {
        text: 'Physiotherapy, exercise, pain management',
        tag: null,
        outcome: 'The structured approach works. The pain is present but at a level you can manage around.',
        effect: (p) => { p.h -= 3; p.mo -= 400; p.addCondition('back_pain', 'mild'); p.manageCondition('back_pain', true); p.addFlag('manages_chronic_condition'); p.setMem('illBackPain', true) },
      },
      {
        text: 'Live with it',
        tag: null,
        outcome: 'The back is a variable you factor into everything now. The bad days are genuinely bad.',
        effect: (p) => { p.h -= 5; p.m -= 3; p.addCondition('back_pain', 'moderate'); p.setMem('illBackPain', true) },
      },
    ],
    effect: null,
  },

  // ── HIV/AIDS (era and archetype gated) ───────────────────────────────────────

  {
    id: 'ill_hiv_diagnosis',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.illHiv &&
      G.age >= 18 && G.age <= 50 &&
      !G.conditions.some(c => c.id === 'hiv') &&
      G.currentYear >= 1981 &&
      (G.flags.includes('lgbtq_identity') || G.flags.includes('hooksup_frequent') ||
       ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype)) &&
      G.hooksUpCount >= 3,
    text: (G) => {
      const year = G.currentYear
      const hc = G.character.country.healthcare ?? 'fair'
      if (year < 1995) {
        return 'The test result is positive. In ' + year + ', this diagnosis carries a weight that is different from what it will carry in twenty years. There is no reliable treatment. What follows will be a series of decisions about what kind of life is possible inside this.'
      }
      if (year < 2000) {
        return 'The HIV test comes back positive. The new antiretroviral combinations are changing the prognosis — this is no longer what it was in the late eighties. You will need to start treatment and maintain it. With treatment, the trajectory is different.'
      }
      return 'HIV-positive. The antiretroviral therapy has transformed this into a manageable chronic condition in countries with healthcare access. You begin treatment. The main work now is consistent adherence and regular monitoring.'
    },
    choices: [
      {
        text: (G) => G.currentYear >= 1996 ? 'Begin antiretroviral therapy' : 'Seek whatever treatment exists',
        tag: null,
        outcome: (G) => G.currentYear >= 1996
          ? 'The regimen is demanding at first. Adherence makes it work. Within months your viral load is undetectable.'
          : 'Treatment options are limited. You manage what you can. The prognosis is uncertain.',
        effect: (p) => {
          const year = p._state.currentYear
          if (year >= 1996) {
            p.addCondition('hiv', 'mild'); p.manageCondition('hiv', true); p.mo -= 3000; p.m -= 10; p.addFlag('hiv_positive'); p.addFlag('manages_chronic_condition')
          } else {
            p.addCondition('hiv', 'severe'); p.h -= 20; p.m -= 25; p.addFlag('hiv_positive')
          }
          p.setMem('illHiv', true)
        },
      },
      {
        text: 'Process the diagnosis before deciding on treatment',
        tag: null,
        outcome: 'The weeks of processing are necessary. The treatment, when you begin it, is still available.',
        effect: (p) => {
          const year = p._state.currentYear
          if (year >= 1996) {
            p.addCondition('hiv', 'moderate'); p.m -= 15; p.h -= 8; p.addFlag('hiv_positive')
          } else {
            p.addCondition('hiv', 'severe'); p.h -= 25; p.m -= 30; p.addFlag('hiv_positive')
          }
          p.setMem('illHiv', true)
        },
      },
    ],
    effect: null,
  },

  // ── BLINDNESS ────────────────────────────────────────────────────────────────

  {
    id: 'ill_vision_loss',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem.illBlindness &&
      G.age >= 60 &&
      !G.conditions.some(c => c.id === 'blindness') &&
      (G.conditions.some(c => c.id === 'diabetes') || G.age >= 72),
    text: (G) => {
      const isDiabetic = G.conditions.some(c => c.id === 'diabetes')
      return isDiabetic
        ? 'The ophthalmologist\'s concern has been growing for years. Diabetic retinopathy — the vessels at the back of the eye have been affected by the blood sugar. The vision in your right eye has deteriorated significantly this year. Corrective lenses help less than they used to.'
        : 'Macular degeneration: the central vision has been compromising gradually for the last two years and has now reached a threshold where it affects daily function. Reading, faces at distance — these are harder now. The peripheral vision remains. The central clarity does not.'
    },
    choices: [
      {
        text: 'Treatments and adaptive aids — live with it managed',
        tag: null,
        outcome: 'Anti-VEGF injections slow the progression. You learn the technologies and adaptations that make the remaining vision work harder.',
        effect: (p) => { p.h -= 8; p.m -= 12; p.mo -= 2000; p.addCondition('blindness', 'moderate'); p.manageCondition('blindness', true); p.addFlag('vision_impaired'); p.setMem('illBlindness', true) },
      },
      {
        text: 'Accept it and adapt without extensive treatment',
        tag: null,
        outcome: 'You adjust your life around the vision that remains. The adjustment takes longer than you expected.',
        effect: (p) => { p.h -= 12; p.m -= 10; p.addCondition('blindness', 'moderate'); p.addFlag('vision_impaired'); p.setMem('illBlindness', true) },
      },
    ],
    effect: null,
  },

  // ── DEAFNESS / HEARING LOSS ──────────────────────────────────────────────────

  {
    id: 'ill_hearing_loss',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.illDeafness &&
      G.age >= 45 &&
      !G.conditions.some(c => c.id === 'deafness') &&
      (G.career?.field === 'construction' || G.career?.field === 'manufacturing' || G.flags.includes('loud_work_environment') || G.age >= 65),
    text: (G) => {
      const isWork = G.career?.field === 'construction' || G.career?.field === 'manufacturing' || G.flags.includes('loud_work_environment')
      return isWork
        ? 'The audiologist\'s tests confirm what you have been compensating for without acknowledging. Significant high-frequency hearing loss, consistent with chronic noise exposure. The years of machinery have done their work. Hearing aids will help. They will not restore what the noise took.'
        : 'Age-related hearing loss. You have been asking people to repeat themselves more than usual and attributing it to other things. The audiologist\'s chart shows the decline clearly. It will continue gradually. Hearing aids are the practical response.'
    },
    choices: [
      {
        text: 'Get fitted for hearing aids immediately',
        tag: null,
        outcome: 'The hearing aids are a significant adjustment in the first weeks. After that, they become part of life.',
        effect: (p) => { p.mo -= 1500; p.m -= 5; p.addCondition('deafness', 'mild'); p.manageCondition('deafness', true); p.addFlag('hearing_impaired'); p.setMem('illDeafness', true) },
      },
      {
        text: 'Delay — it\'s not that bad yet',
        tag: null,
        outcome: 'The delay costs social interactions and workplace performance that you don\'t fully account for until later.',
        effect: (p) => { p.h -= 3; p.m -= 8; p.s -= 5; p.addCondition('deafness', 'moderate'); p.addFlag('hearing_impaired'); p.setMem('illDeafness', true) },
      },
    ],
    effect: null,
  },

  // ── CHRONIC DEPRESSION (intersects mental health system) ─────────────────────

  {
    id: 'ill_depression_chronic',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.illDepression &&
      G.age >= 20 &&
      !G.conditions.some(c => c.id === 'chronic_depression') &&
      G.stats.happiness < 35 &&
      !G.mentalHealth?.condition,
    text: 'It has been more than a year of this. The low energy that you initially attributed to stress, overwork, the season — it is none of those things or all of them, and it hasn\'t lifted. A doctor describes what you are experiencing as clinical depression. Not a bad period. A diagnosis.',
    choices: [
      {
        text: 'Therapy and medication — address it properly',
        tag: null,
        outcome: 'Treatment takes months to calibrate. Once it does, the floor is higher. The worst is managed, which is not nothing.',
        effect: (p) => { p.m += 8; p.mo -= 1200; p.addCondition('chronic_depression', 'moderate'); p.manageCondition('chronic_depression', true); p.addFlag('manages_chronic_condition'); p.setMentalHealth({ condition: 'depression', medicating: true, therapy: true }); p.setMem('illDepression', true) },
      },
      {
        text: 'Therapy — without medication for now',
        tag: null,
        outcome: 'The therapeutic work helps. Progress is slower than with medication. It is still progress.',
        effect: (p) => { p.m += 4; p.mo -= 600; p.addCondition('chronic_depression', 'moderate'); p.setMentalHealth({ condition: 'depression', therapy: true }); p.setMem('illDepression', true) },
      },
      {
        text: 'Acknowledge it — change what you can',
        tag: null,
        outcome: 'Without treatment the condition cycles. Some periods are better. The underlying pattern remains.',
        effect: (p) => { p.addCondition('chronic_depression', 'moderate'); p.setMentalHealth({ condition: 'depression' }); p.setMem('illDepression', true) },
      },
    ],
    effect: null,
  },

  // ── DISABILITY FROM INJURY ───────────────────────────────────────────────────

  {
    id: 'ill_injury_disability',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.illInjury &&
      G.age >= 18 &&
      !G.conditions.some(c => c.id === 'disability_injury') &&
      (G.flags.includes('accident') || G.flags.includes('conflict_injury') || G.flags.includes('work_injury') ||
       G.career?.field === 'military' || G.career?.field === 'construction' || G.career?.field === 'sports'),
    text: (G) => {
      if (G.flags.includes('conflict_injury')) {
        return 'The injury from the conflict has left permanent effects. The doctors have done what they can. What remains is learning the shape of a body that works differently from the one you had before.'
      }
      if (G.career?.field === 'sports') {
        return 'The injury ended the season and then, as the months passed, the assessment became clearer: the damage is permanent. The career may be over. The body has a new parameter now.'
      }
      return 'The accident at work was severe enough that full recovery was never on the table. The leg, the arm, the spine — a part of you that was functional is now a limitation you will manage for the rest of your life.'
    },
    choices: [
      {
        text: 'Rehabilitation — adapt and rebuild',
        tag: null,
        outcome: 'The rehabilitation is long and the progress is slow. What you rebuild is real. The limitation is permanent but managed.',
        effect: (p) => { p.h -= 10; p.m -= 15; p.mo -= 3000; p.addCondition('disability_injury', 'moderate'); p.manageCondition('disability_injury', true); p.addFlag('disability'); p.addFlag('manages_chronic_condition'); p.setMem('illInjury', true) },
      },
      {
        text: 'Accept the new normal without extensive rehab',
        tag: null,
        outcome: 'Life reorganises around the disability. Some things are permanently closed. Others open in their place.',
        effect: (p) => { p.h -= 15; p.m -= 18; p.addCondition('disability_injury', 'severe'); p.addFlag('disability'); p.setMem('illInjury', true) },
      },
    ],
    effect: null,
  },

  // ── CONDITION FOLLOW-THROUGH: DIABETES COMPLICATION ─────────────────────────

  {
    id: 'ill_diabetes_decade',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.illDiabetesFt &&
      G.conditions.some(c => c.id === 'diabetes') &&
      G.age >= 60,
    text: (G) => {
      const cond = G.conditions.find(c => c.id === 'diabetes')
      if (cond?.managed) {
        return 'You have been managing the diabetes for ' + (G.age - (cond.diagnosedYear ? G.currentYear - cond.diagnosedYear + G.age - (G.currentYear - cond.diagnosedYear) : 10)) + ' years now. The monitoring is routine. Your numbers are stable. The routine itself has become a kind of discipline that extends into other parts of how you live.'
      }
      return 'The unmanaged diabetes has been accumulating consequences. The doctor\'s review this year lists several: neuropathy beginning in the feet, some kidney function reduction. The conversation about more aggressive management is overdue.'
    },
    choices: null,
    effect: (p) => {
      const cond = p._state.conditions?.find(c => c.id === 'diabetes')
      if (cond?.managed) { p.h += 3; p.m += 4 }
      else { p.h -= 6; p.m -= 5; p.manageCondition('diabetes', false) }
      p.setMem('illDiabetesFt', true)
    },
  },

  // ── CONDITION FOLLOW-THROUGH: CANCER SURVIVOR SCAN ──────────────────────────

  {
    id: 'ill_cancer_scan_callback',
    phase: 'midlife',
    weight: 4,
    cooldown: 4,
    when: (G) =>
      G.flags.includes('cancer_survivor') &&
      G.conditions.some(c => c.id === 'cancer_survivable') &&
      G.age >= 42,
    text: 'The annual scan. You have learned what the wait between scan and result feels like. Every time is different and every time is the same. The oncologist opens the results on the screen. The numbers are where they should be. Clear.',
    choices: null,
    effect: (p) => { p.m += 6; p.r -= 3; p.setMem('lastCancerScan', p._state.currentYear) },
  },

]
