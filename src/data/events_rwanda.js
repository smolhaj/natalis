// Rwanda arc events
//
// Rwanda's story across the post-colonial and post-genocide period:
//  — Post-independence Rwanda was a Hutu Republic; waves of anti-Tutsi pogroms
//    drove Tutsi into diaspora in Uganda, Burundi, Congo, and Europe 1959-90.
//  — Juvénal Habyarimana ruled 1973-1994: single-party state with ethnic quotas
//    (9% for Tutsi in schools and civil service); the ID card, inherited from
//    the Belgian colonial system, marked your category at birth.
//  — Radio Télévision Libre des Mille Collines (RTLM) began broadcasting July 1993.
//    It called Tutsi "inyenzi" (cockroaches) and broadcast names and addresses.
//    It would coordinate the killing during the 100 days.
//  — April 6, 1994: President Habyarimana's plane shot down over Kigali.
//    April 7: roadblocks appear on every road. The interahamwe — the "those who
//    attack together" — go house by house. 800,000 Tutsi and moderate Hutu
//    killed in 100 days. The churches at Nyamata and Ntarama: not safe.
//  — July 4, 1994: RPF (Rwandan Patriotic Front — Tutsi diaspora soldiers from
//    Uganda) takes Kigali. Two million Hutu flee to Zaire in four days. Cholera
//    kills 50,000 in Goma camps in one month.
//  — Gacaca courts 2001-2012: community justice tribunals. 1.5 million cases
//    heard in open fields. Perpetrators confessed, victims testified.
//  — Post-genocide Rwanda under Kagame: 8-9% GDP growth annually; mandatory
//    umuganda (community service); "no ethnicity" in public life; Kigali
//    one of the cleanest cities in Africa; press restrictions; opposition
//    figures harassed, disappeared, or jailed. Both things simultaneously.

const RWANDA_EVENTS = [

  // ── HABYARIMANA ERA CHILDHOOD ─────────────────────────────────────────────────

  {
    id: 'rwa_habyarimana_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 1973 && G.currentYear <= 1993 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.rwa_habyarimana,
    text: (G) => {
      const isTutsi = G.ethnicity === 'tutsi'
      return isTutsi
        ? 'The quota is nine percent. Nine percent of school places, nine percent of civil service jobs — whatever can be counted and managed at the national level is nine percent for Tutsi. Your family explains this to you around the time you are old enough to understand what school is. They explain it with the tone of people describing weather: this is how it is, this is how you navigate it. The ID card is Belgian — the Belgians made a fluid category permanent and laminated it in 1933 — but your card says what it says, and the quota is nine percent, and you are going to have to be better than ninety-one percent.'
        : 'The party is the MRND. The president is Habyarimana and has been president since 1973 and will remain president because there is only one party and the party is the state. The history of Rwanda taught at school is the history of the Hutu majority restored to its proper place after the feudal Tutsi monarchy. The Tutsi who live in your neighborhood went to school with your parents. You do not ask about the ones in Uganda, in Burundi — the diaspora — because there is not yet a question to ask.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('rwa_habyarimana_generation'); p.setMem('rwa_habyarimana', true); },
  },

  // ── RADIO MILLE COLLINES ──────────────────────────────────────────────────────

  {
    id: 'rwa_radio_mille_collines',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 1993 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem?.rwa_rtlm,
    text: (G) => {
      const isTutsi = G.ethnicity === 'tutsi'
      return isTutsi
        ? 'Radio Télévision Libre des Mille Collines has been on air since July. It plays popular music. It calls Tutsi inyenzi: cockroaches. It runs skits where cockroaches are exterminated. Your neighbors listen to it. Some of them laugh at the skits. The radio is on all day in the shop and in the bar. The language fills the room and then the room becomes the country. You begin to calculate the distance between you and the door.'
        : 'The new station — RTLM — plays good music and it also plays a kind of talk that builds week by week. The Tutsi are called inyenzi. They are described as threats to be dealt with. The station reads out names of people who are described as enemies. Some of the names belong to people in your neighborhood. The language has become ordinary in the room before you notice that it has become ordinary.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('rwa_rtlm_generation'); p.setMem('rwa_rtlm', true); },
  },

  // ── ADOLESCENT EXPERIENCE OF THE 100 DAYS ────────────────────────────────────

  {
    id: 'rwa_hundred_days_adolescent',
    phase: 'adolescence',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 1994 && G.currentYear <= 1994 &&
      G.age >= 12 && G.age <= 17 &&
      !G.mem?.rwa_genocide_experience,
    text: (G) => {
      const isTutsi = G.ethnicity === 'tutsi'
      return isTutsi
        ? 'April 7. The roadblocks are made of whatever was at hand — tree trunks, bicycle frames, stones. The radio is broadcasting names and addresses. Your mother says to go to the church. The church at Nyamata has a blue roof. Eight thousand people went to the church at Nyamata. The churches were not safe. This is what you learn at thirteen in April 1994: the places you were taught to go when afraid are not safe. This is the education that runs underneath everything that comes after.'
        : 'April 7. Your father\'s friends from the cell come to the house early. They have things in their hands. The radio says the inyenzi are attacking from everywhere and everyone must defend the homeland. The Tutsi family down the road — the children went to your school, you know their names — your father is explaining something to you. The explaining takes a long time and says less than what happens afterward.'
    },
    choices: null,
    effect: (p) => { p.m -= 30; p.h -= 8; p.r += 15; p.addFlag('rwa_genocide_witness'); p.setMem('rwa_genocide_experience', true); },
  },

  // ── YOUNG ADULT EXPERIENCE OF THE 100 DAYS ───────────────────────────────────

  {
    id: 'rwa_hundred_days_adult',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 1994 && G.currentYear <= 1994 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.rwa_genocide_experience,
    text: (G) => {
      const isTutsi = G.ethnicity === 'tutsi'
      return isTutsi
        ? 'One hundred days. You calculate it later: April 7 to July 18. The calculation is not something you do in April. In April you are running or hiding or sitting very still in a place that you hope has not been listed. The radio coordinates the roadblocks. The interahamwe work by neighborhood, by sector, by hill. People who knew your name tell others where you are. The hiding has a specific quality: you are counting on people who you cannot contact to not say your name. Some of them do not say your name. Some of them do.'
        : 'One hundred days. The interahamwe checkpoints, the sector meetings, the lists. The men who are not killing are expected to explain why not. The official radio says this is self-defense. The words — inyenzi, inzoka, ibyitso — have been in the air since the previous year. The RTLM says the graves are only half full, that the work is not finished. You are navigating between what is being asked of you and what you can live with having done.'
    },
    choices: [
      {
        text: 'You survive. The accounting of what that cost comes later.',
        tag: null,
        outcome: 'July 18: the RPF takes the last zone. The roadblocks come down. The hundred days is over in that sense. The sense in which it is not over takes longer to understand.',
        effect: (p) => { p.m -= 25; p.h -= 8; p.r += 12; p.addFlag('rwa_genocide_witness'); p.addFlag('rwandan_survivor'); p.setMem('rwa_genocide_experience', true); },
      },
      {
        text: 'You find a way to protect someone, or refuse something, at cost to yourself.',
        tag: null,
        outcome: 'The refusal had consequences. You carry both what you refused to do and what the refusal cost.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.karma += 10; p.r += 8; p.addFlag('rwa_genocide_witness'); p.addFlag('rwandan_survivor'); p.setMem('rwa_genocide_experience', true); },
      },
    ],
    effect: null,
  },

  // ── GOMA CAMPS 1994 ──────────────────────────────────────────────────────────

  {
    id: 'rwa_goma_camps',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.ethnicity === 'hutu' &&
      G.currentYear >= 1994 && G.currentYear <= 1997 &&
      G.age >= 18 &&
      !G.mem?.rwa_goma,
    text: 'The RPF has taken Kigali. Two million Hutu crossed into Zaire in four days — the UN calls it the fastest mass movement of people in recorded history. The camps at Goma are built on volcanic rock so hard that latrines cannot be dug. Cholera kills 50,000 people in one month. The génocidaires are in the camps alongside families who fled fearing reprisal. The international aid arrives. The interahamwe control the camp committees and receive the aid on behalf of the population. The humanitarian organizations know this and continue anyway because there are two million people who need food. You are in this system.',
    choices: [
      {
        text: 'You stay in the camp. Returning is not safe — what happened in 1994 cannot simply be walked back.',
        tag: null,
        outcome: 'The camps persist until 1996, when Kabila\'s forces and the RPF destroy them. Refugees are forced home or deeper into Congo. You navigate this with the tools available.',
        effect: (p) => { p.m -= 15; p.h -= 10; p.addFlag('rwa_goma_generation'); p.addFlag('displaced'); p.setMem('rwa_goma', true); },
      },
      {
        text: 'You find a way to return to Rwanda. This camp is not a future.',
        tag: null,
        outcome: 'Returning required an accounting of what you were and what you did during the hundred days. The gacaca courts would make this accounting more formal and more public.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('rwa_goma_generation'); p.setMem('rwa_goma', true); },
      },
    ],
    effect: null,
  },

  // ── GACACA COURTS 2001-2012 ───────────────────────────────────────────────────

  {
    id: 'rwa_gacaca_courts',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 2001 && G.currentYear <= 2012 &&
      G.age >= 25 &&
      (G.flags.has('rwandan_survivor') || G.flags.has('genocide_survivor') || G.flags.has('rwa_genocide_witness')) &&
      !G.mem?.rwa_gacaca,
    text: (G) => {
      const isTutsi = G.ethnicity === 'tutsi'
      return isTutsi
        ? 'The gacaca court meets in the field outside the sector office. The man who killed your cousin is sitting ten metres from you. The gacaca is about establishing what happened and who did it — not exactly justice in the Western sense, not exactly reconciliation in the therapeutic sense. Something older: the community listing what it knows in public. You are asked to speak. What you have to say has been accumulating since April 1994.'
        : 'The gacaca court meets in the field. One point five million cases in total. The courts work by category: organizers, killers, those who looted. Confession and testimony reduce sentences. The design is that the community knows — that the knowing in public is how the country moves forward. Your position in this process depends on what you did or refused to do during the hundred days. You are in the field. The public accounting begins.'
    },
    choices: [
      {
        text: 'You say what you know. The saying is its own thing, separate from what follows.',
        tag: null,
        outcome: 'The testimony is given. The record exists. The verdict or the community service or the sentence follows. You are still in the same field afterward, among the same people.',
        effect: (p) => { p.karma += 6; p.r += 6; p.addFlag('rwa_gacaca_generation'); p.setMem('rwa_gacaca', true); },
      },
      {
        text: 'You say what you must and hold back what you can. Full testimony would implicate people still living nearby.',
        tag: null,
        outcome: 'The gacaca is built on community knowledge. The things you held back are not invisible to the community that is also holding them.',
        effect: (p) => { p.r += 10; p.karma -= 4; p.addFlag('rwa_gacaca_generation'); p.setMem('rwa_gacaca', true); },
      },
    ],
    effect: null,
  },

  // ── KAGAME'S RWANDA ───────────────────────────────────────────────────────────

  {
    id: 'rwa_kagame_era',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 2000 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.rwa_kagame,
    text: 'Kigali is one of the cleanest cities in Africa. Plastic bags are banned and enforced. Every last Saturday of the month is umuganda — community service, mandatory for all. GDP is growing eight percent a year. Infant mortality is down seventy percent from 1994. The genocide memorial is open; school children go on class trips. In public life you do not say Hutu or Tutsi. The constitution says so. The party says so. The journalists who have been arrested, the opposition leaders who have died in unclear circumstances, the election results that arrive in the nineties — these are also part of the country. You navigate this like any double grammar. Both things are real. They are the same country.',
    choices: [
      {
        text: 'What has been rebuilt from 1994 is real. What it required can be accounted for separately.',
        tag: null,
        outcome: 'Rwanda has rebuilt faster than anyone projected. The accounting of how is still ongoing and still contested.',
        effect: (p) => { p.m += 4; p.addFlag('rwa_kagame_generation'); p.setMem('rwa_kagame', true); },
      },
      {
        text: 'The press restrictions and the opposition arrests are part of the same system as the clean streets. You cannot have one without the other.',
        tag: null,
        outcome: 'The country is both things simultaneously. You live in both simultaneously. The double grammar becomes permanent.',
        effect: (p) => { p.r += 5; p.addFlag('rwa_kagame_generation'); p.setPolitical('dissident'); p.setMem('rwa_kagame', true); },
      },
    ],
    effect: null,
  },

  // ── THIRTY YEARS: LATE RECKONING ─────────────────────────────────────────────

  {
    id: 'rwa_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Rwanda' &&
      G.currentYear >= 2014 &&
      G.age >= 55 &&
      (G.flags.has('rwa_genocide_witness') || G.flags.has('genocide_survivor') || G.flags.has('rwandan_survivor')) &&
      !G.mem?.rwa_late_reckoning,
    text: (G) => {
      const yr = G.currentYear
      return yr >= 2024
        ? 'Thirty years. The country that exists now and the country before April 6, 1994 share a name and a geography. You are in both simultaneously — the one you live in and the one you carry. The children growing up now have no ethnic category on their identity documents. They learned about April 1994 from the school curriculum and from the memorial. The gap between having been told something and having been there is the whole distance of what you carry and what they inherit.'
        : 'Twenty years. The young people in the city have grown up inside the new Rwanda — the clean city, the economic growth, the public silence about ethnicity. They know about 1994 from the memorial and from the official account. The official account is mostly true and is also edited. The things not in the official account are the things that happened in specific fields, on specific hills, that you know because you were there.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.addFlag('rwa_reconciliation_generation'); p.setMem('rwa_late_reckoning', true); },
  },

]

export default RWANDA_EVENTS
