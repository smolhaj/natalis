// events_cambodia.js — Cambodia depth arc
//
// Supplements the existing Cambodia events in events_asia_arcs.js, which cover:
// the city evacuation (1975), Year Zero forced-farm labour, a denunciation
// moment, Vietnamese liberation (1979), survivor silence, UNTAC 1993 election,
// ECCC tribunal testimony, and the missing-generation observation.
//
// This module adds perspectives and eras that aren't covered:
//   § 1  Rural Cambodia during Khmer Rouge — you were already in the field
//   § 2  Family taken — the vocabulary of disappearance
//   § 3  Post-liberation return to Phnom Penh
//   § 4  Living alongside perpetrators, 1982–1998
//   § 5  The second generation — asking parents what happened
//   § 6  The landmine landscape — daily navigation of a country still mined
//   § 7  Tuol Sleng — visiting the museum as an adult

export const CAMBODIA_EVENTS = [

  // ─── § 1 — RURAL CHILD DURING YEAR ZERO ──────────────────────────────────────

  {
    id: 'cam_rural_year_zero',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1975 && G.currentYear <= 1979 &&
      !G.flags.has('khmer_rouge_displaced') &&
      !G.mem?.camRuralYearZero,
    text: (G) => {
      const isYoung = G.age <= 10
      if (isYoung) return 'You are already in the countryside when they arrive, so for you there is no evacuation — only a change in who gives the orders. The cadres are teenagers, some of them younger than your older siblings. They carry rifles and use the new words: comrade, angkar, the Organization. You learn to say nothing that draws attention. You learn to look at the ground. You work the rice field from before light until after dark. The adults around you have learned the same silence faster than you have, and you watch them to understand what is safe.'
      return 'The city people arrive on the roads — doctors, teachers, civil servants — their faces confused and frightened, carrying what they could grab. You watch from the rice paddy. The cadres assign them to fields and they do not know how to farm and the cadres are not patient teachers. The village is now something called a cooperative. The food you produce goes to angkar. You eat what angkar decides to give you back. This is Year Zero, which means nothing that existed before it exists anymore.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 16; p.h -= 8; p.e -= 5
      p.addFlag('khmer_rouge_rural_witness')
      p.addFlag('learned_silence')
      p.setMem('camRuralYearZero', true)
    },
  },

  // ─── § 2 — FAMILY MEMBER TAKEN ────────────────────────────────────────────────

  {
    id: 'cam_family_taken',
    phase: 'childhood',
    weight: 6,
    when: (G) => {
      if (G.character.country.name !== 'Cambodia') return false
      if (G.currentYear < 1975 || G.currentYear > 1979) return false
      if (G.mem?.camFamilyTaken) return false
      const hasLivingParent = G.parents?.some(p => p.alive)
      return hasLivingParent
    },
    text: (G) => {
      const takenParent = G.parents?.find(p => p.alive) ?? null
      const relation = takenParent?.relation === 'father' ? 'father' : 'mother'
      return `Your ${relation} is summoned to a meeting. The cadre says it is for "re-education," which is a word that has a specific weight in the way it is said. People who go to re-education meetings do not always come back. Educated people, people who worked for the old government, people who speak French — these are the ones summoned.\n\nYour ${relation} packs a small bag, because the cadre says it may be several days. They do not take anything important, which you understand only later was also a choice — a way of not believing what was happening. You watch them walk up the road with two cadres, one on each side. You do not know yet that this is the last time.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 24; p.r += 18; p.h -= 6
      p.addFlag('family_taken_khmer_rouge')
      p.addFlag('learned_silence')
      p.killParent(Math.random() < 0.6 ? 'father' : 'mother')
      p.setMem('camFamilyTaken', true)
    },
  },

  // ─── § 3 — POST-LIBERATION RETURN ─────────────────────────────────────────────

  {
    id: 'cam_phnom_penh_return',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      (G.flags.has('khmer_rouge_displaced') || G.flags.has('khmer_rouge_rural_witness')) &&
      G.currentYear >= 1979 && G.currentYear <= 1985 &&
      !G.mem?.camReturn,
    text: (G) => {
      const wasUrban = G.flags.has('khmer_rouge_displaced')
      if (wasUrban) return 'Phnom Penh is almost empty when you arrive. Four years ago the city had two million people; now it has maybe 50,000, and they are all arriving the same way you are — on foot, carrying what survived. The houses stand open. Their owners fled, or died, or are still in the countryside not yet knowing it is safe to return.\n\nYou walk through streets you remember and find them unchanged in the physical sense — the buildings are still there — and entirely changed in every other sense. You choose a house. It is not yours but there is no owner to object. You sweep the floor. You begin.'
      return 'You heard Phnom Penh described before but never saw it. Now it is half-empty and people are moving in from everywhere, each claiming a space. The city is being repopulated by people who do not know each other, who survived in different ways, who carry things they are not yet ready to name. The Vietnamese soldiers are still here. You understand they liberated the country and that the situation is complicated.'
    },
    choices: null,
    effect: (p) => {
      p.m += 6; p.h += 4
      p.addFlag('phnom_penh_return')
      p.setMem('camReturn', true)
    },
  },

  // ─── § 4 — LIVING ALONGSIDE PERPETRATORS ──────────────────────────────────────

  {
    id: 'cam_living_alongside',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      (G.flags.has('khmer_rouge_survivor') ||
       G.flags.has('khmer_rouge_rural_witness') ||
       G.flags.has('family_taken_khmer_rouge')) &&
      G.currentYear >= 1985 && G.currentYear <= 2003 &&
      !G.mem?.camAlongside,
    text: () =>
      'The man who runs the local authority now served under the Khmer Rouge. Not as a leader — as an ordinary soldier, an ordinary cadre, one of the thousands who operated the apparatus. The amnesty was the price of ending the civil war. There were too many perpetrators to prosecute. Cambodia would have had to empty its institutions to try them all.\n\nYou know what he did, or something close to what he did. He knows you know. You greet each other in the market. Your children go to the same school. The country has made a decision and the decision made the country functional and the cost of that decision is carried in silences like this one, daily, everywhere.',
    choices: [
      {
        text: 'You maintain the necessary civility. Survival required it before; stability requires it now.',
        tag: null,
        outcome: 'The civility costs something each time. You pay it. You do not know what the alternative would have built.',
        effect: (p) => {
          p.m -= 8; p.r += 10; p.karma -= 5
          p.addFlag('perpetrator_neighbor_silence')
          p.setMem('camAlongside', true)
        },
      },
      {
        text: 'You find you cannot pretend. You do not greet him. Your silence is its own statement.',
        tag: null,
        outcome: 'The choice costs you in practical ways — the man has authority in the local administration. But you cannot do otherwise.',
        effect: (p) => {
          p.m -= 6; p.r += 7; p.karma += 10; p.w -= 5
          p.addFlag('refused_complicit_silence')
          p.setMem('camAlongside', true)
        },
      },
    ],
    effect: null,
  },

  // ─── § 5 — SECOND GENERATION ASKS ─────────────────────────────────────────────

  {
    id: 'cam_second_generation_silence',
    phase: 'adolescence',
    weight: 6,
    when: (G) => {
      if (G.character.country.name !== 'Cambodia') return false
      if (G.mem?.camSecondGenFired) return false
      const parentHasSurvivedKR = G.flags.has('genocide_family_memory')
      return parentHasSurvivedKR && G.currentYear >= 1990 && G.age >= 14 && G.age <= 22
    },
    text: () =>
      'You ask your mother what happened. You have known, in the way you always knew, that the years before you were born were something she will not look at directly. You are old enough now to ask with the full weight of the question.\n\nShe says a few things. She says she was in the countryside. She says some family members did not come back. She says it was a long time ago. Then she gets up and goes to the kitchen and you understand that this is as much as you will get for now. Possibly for a long time. Possibly ever.\n\nYou sit with the specific loneliness of inheriting something that cannot be named by the person who carries it.',
    choices: [
      {
        text: 'You research it yourself — libraries, archives, anything you can find.',
        tag: null,
        outcome: 'The historical record is documented in detail. The personal record — what specifically happened to your family — remains partially blank.',
        effect: (p) => {
          p.e += 4; p.r += 6
          p.addFlag('khmer_rouge_second_gen_researched')
          p.setMem('camSecondGenFired', true)
        },
      },
      {
        text: 'You respect the silence. There are reasons it exists.',
        tag: null,
        outcome: 'The questions do not go away. They change shape. You carry them as a specific kind of not-knowing.',
        effect: (p) => {
          p.r += 8; p.m -= 5
          p.addFlag('khmer_rouge_second_gen_silence')
          p.setMem('camSecondGenFired', true)
        },
      },
    ],
    effect: null,
  },

  // ─── § 6 — LANDMINE LANDSCAPE ─────────────────────────────────────────────────

  {
    id: 'cam_landmine_awareness',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      G.currentYear >= 1980 && G.currentYear <= 2015 &&
      !G.mem?.camLandmineFired,
    text: (G) => {
      const yr = G.currentYear ?? 1990
      if (yr <= 1990) return 'The red markers mean do not walk there. You learn this before you learn to read. Certain fields, certain paths through the forest, certain areas near the roads that were roads during the war. An uncle has one leg below the knee. He doesn\'t talk about how. You are told not to play in the fields beyond the marked path, which you understand is one of those instructions that has a specific reason behind it that adults don\'t explain because they don\'t want to frighten you, which means it is worth being frightened of.'
      if (yr <= 2005) return 'The demining organizations are here. There are programs now — people trained specifically to find and remove what was planted in the war and what was planted in the civil war that followed the war. The country has the highest rate of landmine injuries per capita in the world. There are still millions of mines in the ground. The demining will take decades. The red markers are still there in the fields outside town.'
      return 'Cambodia has been demining for forty years and will demonize for forty more. You have grown up knowing certain fields by the markers at their edge. The prosthetics clinic in the provincial town is one of the busiest in the region. This is what postwar means in a place where war left its explosive weight in the ground.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 6; p.e += 3
      p.addFlag('landmine_country')
      p.setMem('camLandmineFired', true)
    },
  },

  // ─── § 7 — TUOL SLENG ─────────────────────────────────────────────────────────

  {
    id: 'cam_tuol_sleng',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      (G.flags.has('khmer_rouge_second_gen_researched') ||
       G.flags.has('khmer_rouge_survivor') ||
       G.flags.has('family_taken_khmer_rouge')) &&
      G.currentYear >= 1983 &&
      !G.mem?.camTuolSleng,
    text: (G) => {
      const isSurvivor = G.flags.has('khmer_rouge_survivor') || G.flags.has('family_taken_khmer_rouge')
      if (isSurvivor) return 'The school was converted to a prison in 1975. An estimated 17,000 people entered S-21 and seven survived. Now it is a museum. The photographs of the prisoners are on the walls — the intake photographs the Khmer Rouge took of everyone who arrived. You look for a face you might recognize. You don\'t know if finding one would be better or worse than not finding one. You leave with no answer to that question.'
      return 'You go to Tuol Sleng because you are old enough now to want to understand the full shape of what happened before you were born. The photographs on the walls are the intake photographs taken by the Khmer Rouge of every prisoner who entered. Most of the faces in the photographs are young. You stay for two hours and then you need to be outside in the light and the noise of the city, which continues.'
    },
    choices: null,
    effect: (p) => {
      p.r += 8; p.m -= 8; p.e += 5
      p.addFlag('tuol_sleng_witnessed')
      p.setMem('camTuolSleng', true)
    },
  },

  // ─── § 8 — LATE-LIFE RECKONING: WHAT WAS PASSED ON ───────────────────────────

  {
    id: 'cam_survivor_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Cambodia' &&
      (G.flags.has('khmer_rouge_survivor') || G.flags.has('family_taken_khmer_rouge') || G.flags.has('khmer_rouge_rural_witness')) &&
      G.age >= 55 &&
      !G.mem?.camLateReckoning,
    text: (G) => {
      const isSurvivor = G.flags.has('khmer_rouge_survivor') || G.flags.has('family_taken_khmer_rouge')
      const hasChildren = G.children?.length > 0
      if (isSurvivor && hasChildren) return 'Your children grew up in a country that is not the country you grew up in. They know the history — it is taught in schools now, eventually, incompletely — but they did not carry it in their bodies the way you carry it. You are not sure whether you succeeded or failed in protecting them from that. You are not sure which one would have been better for them. You have not resolved this and you may not.'
      if (isSurvivor) return 'Cambodia has a phrase for this generation — the ones who survived and built and did not speak. You built. What you could not do was speak in the way the younger generation assumes you should — processing, narrative, therapeutic disclosure. The silence was not suppression. The silence was what allowed the building. You understand this now and you are not sure it needs defending.'
      return 'You were a child during it and became an adult in its aftermath and are now approaching the end of a life shaped by something that happened before you could understand it. The country survived. You survived. The specific cost of the survival is something you have been recounting to yourself for decades and have not finished recounting.'
    },
    choices: null,
    effect: (p) => {
      p.r += 6; p.m += 5; p.karma += 8
      p.addFlag('khmer_rouge_late_reckoned')
      p.setMem('camLateReckoning', true)
    },
  },

]
