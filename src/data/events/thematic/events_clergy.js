// BUILD 17 — The religious institution from inside
// The priest in rural Ireland. The Buddhist monk in Cambodia before and after the Khmer Rouge.
// The imam under Suharto. The yeshiva student in Jerusalem.
// Not faith as crisis — the specific experience of holding an institution,
// exercising power, knowing what the institution has done.

const IS_CLERGY = (G) => G.career?.id === 'clergy'
const IS_CATHOLIC_IRELAND = (G) => G.character.country?.name === 'Ireland' && (G.religion === 'christian_catholic' || G.religion?.includes('catholic'))
const IS_IRELAND = (G) => G.character.country?.name === 'Ireland'
const IS_BUDDHIST_CAMBODIA = (G) => G.character.country?.name === 'Cambodia' && (G.religion === 'buddhist' || G.religion?.includes('buddhist'))
const IS_INDONESIA = (G) => G.character.country?.name === 'Indonesia'
const IS_ISRAEL = (G) => G.character.country?.name === 'Israel'

export const CLERGY_EVENTS = [

  // ── IRELAND ───────────────────────────────────────────────────────────────

  {
    id: 'cle_ireland_ordination',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_CLERGY(G) && IS_CATHOLIC_IRELAND(G) && G.currentYear >= 1940 && G.currentYear <= 1975 && G.age >= 22 && G.age <= 30 && !G.mem.cleOrdained,
    text: 'Ordination. Your mother is in the front pew. Half the village came. In this county there is a priest in every family that can manage one — the Church runs the schools, the hospitals, the mental institutions, the moral accounting of every parish from Donegal to Cork. You have been given genuine authority over people\'s lives. The weight of this is not stated in any ceremony. It is assumed.',
    effect: (p) => { p.m += 10; p.addFlag('clergy_ordained'); p.addFlag('institutional_power'); p.setMem('cleOrdained', true) },
  },

  {
    id: 'cle_ireland_parish_power',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_CLERGY(G) && IS_CATHOLIC_IRELAND(G) && G.flags.has('clergy_ordained') && G.currentYear >= 1950 && G.currentYear <= 1980 && G.age >= 35 && !G.mem.cleParish,
    text: 'The county council defers to you on the housing list. The bank manager is in your congregation. The national school principal was your student. The unmarried woman who comes to you in distress has nowhere else to go — the options you offer her are the options available. You are not cruel. You are the institution, and the institution\'s options are what they are.',
    choices: [
      {
        text: 'Exercise the authority with care. Someone has to hold this.',
        tag: 'held_carefully',
        outcome: 'You are known as a reasonable man. The word reasonable, in this context, carries specific weight.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('cleParish', true) },
      },
      {
        text: 'You begin to notice the shape of the power you hold.',
        tag: 'noticed',
        outcome: 'You begin to ask questions of the institution from inside it. This is not comfortable but it is specific.',
        effect: (p) => { p.m -= 8; p.karma += 12; p.addFlag('institutional_doubt'); p.setMem('cleParish', true) },
      },
    ],
  },

  {
    id: 'cle_ireland_knowledge',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_CLERGY(G) && IS_CATHOLIC_IRELAND(G) && G.flags.has('clergy_ordained') && G.currentYear >= 1960 && G.currentYear <= 1990 && G.age >= 40 && !G.mem.cleKnowledge,
    text: 'You know about the laundries. You know because a girl\'s family came to you, and you knew before that because everyone in the institution knows. The laundries are where women who have transgressed the moral code are sent to be corrected through unpaid labour, often for years. You have never sent anyone there. You have also never publicly named what they are.',
    choices: [
      {
        text: 'Say nothing. The Church is the institution that holds this society together.',
        tag: 'silent',
        outcome: 'The laundries continue for decades after this. The institution holds. You hold it.',
        effect: (p) => { p.m -= 20; p.addFlag('moral_weight_carried'); p.addFlag('institutional_complicity'); p.setMem('cleKnowledge', true) },
      },
      {
        text: 'Quietly help the woman who came to you. Not the system — this one person.',
        tag: 'helped_one',
        outcome: 'You help her leave. You do not help anyone after her. The institution remains. You remain in it.',
        effect: (p) => { p.m -= 12; p.karma += 10; p.addFlag('moral_weight_carried'); p.setMem('cleKnowledge', true) },
      },
      {
        text: 'Write to the bishop. Name what you have seen.',
        tag: 'wrote',
        outcome: 'The bishop thanks you for your concern and assures you the matter is handled with appropriate pastoral care. You do not write again.',
        effect: (p) => { p.m -= 15; p.karma += 15; p.addFlag('institutional_dissent'); p.setMem('cleKnowledge', true) },
      },
    ],
  },

  {
    id: 'cle_ireland_collapse',
    phase: 'late_life',
    weight: 4,
    when: (G) => IS_IRELAND(G) && G.flags.has('clergy_ordained') && G.currentYear >= 1994 && G.age >= 60 && !G.mem.cleCollapse,
    text: 'The Ryan Report. The Murphy Report. The names of the priests. The testimony read on the radio in voices that are calm and specific and therefore more devastating than grief. You sit in the house you have lived in for thirty years and the phone rings and rings and you do not answer it. What you built your life inside is being named for what it was, in public, in real time.',
    choices: [
      {
        text: 'The Church failed people. You say so directly.',
        tag: 'acknowledged',
        outcome: 'You are one of very few clergy in the country to say it without qualification. Some people find this meaningful. The institution does not.',
        effect: (p) => { p.m -= 18; p.karma += 20; p.addFlag('institutional_reckoning'); p.setMem('cleCollapse', true) },
      },
      {
        text: 'Defend what the Church has built, while acknowledging the failures.',
        tag: 'defended',
        outcome: 'The defence is not wrong. The failures are not small. These two things do not resolve into a comfortable position.',
        effect: (p) => { p.m -= 22; p.addFlag('institutional_reckoning'); p.setMem('cleCollapse', true) },
      },
    ],
  },

  // ── CAMBODIA ──────────────────────────────────────────────────────────────

  {
    id: 'cle_cambodia_monk',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_CLERGY(G) && IS_BUDDHIST_CAMBODIA(G) && G.currentYear >= 1955 && G.currentYear <= 1974 && G.age >= 18 && G.age <= 30 && !G.mem.cleMonk,
    text: 'You are ordained at the *vat*. In Cambodia the Buddhist sangha is older than the state and more stable than any government. You provide the social services the state does not: education for children whose families cannot pay, care for the dying, mediation for disputes. You are the continuity that outlasts whoever is in Phnom Penh.',
    effect: (p) => { p.m += 12; p.karma += 8; p.addFlag('clergy_ordained'); p.addFlag('sangha_member'); p.setMem('cleMonk', true) },
  },

  {
    id: 'cle_cambodia_khmer_rouge',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_BUDDHIST_CAMBODIA(G) && G.flags.has('sangha_member') && G.currentYear >= 1975 && G.currentYear <= 1978 && !G.mem.cleKhmer,
    text: 'The Khmer Rouge dissolves the monkhood. Religion is abolished. The robes must be removed. The Khmer Rouge killed an estimated sixty thousand monks; of sixty thousand monks, perhaps three thousand survived the four years. You are ordered to laicise — to become a worker, to take a name, to forget what you were. You are given no time to consider whether you comply.',
    choices: [
      {
        text: 'Remove the robes. Survival is what you have.',
        tag: 'survived',
        outcome: 'You survive. What you were is not erased — it goes somewhere inside you that the regime cannot reach, not because you hid it there but because there is nowhere else for it to go.',
        effect: (p) => { p.m -= 30; p.h -= 15; p.addFlag('khmer_rouge_survivor'); p.addFlag('faith_survived_suppression'); p.setMem('cleKhmer', true) },
      },
    ],
  },

  {
    id: 'cle_cambodia_rebuilding',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_BUDDHIST_CAMBODIA(G) && G.flags.has('khmer_rouge_survivor') && G.currentYear >= 1979 && G.currentYear <= 1995 && !G.mem.cleRebuild,
    text: 'After 1979 the monasteries begin to reopen. There are almost no senior monks — most were killed. You are among the few who survived who can re-ordain others. Young men come to you who have grown up with no religious institution at all, in a country that tried to make religion impossible. You teach what you know. There is a specific solemnity to rebuilding from almost nothing.',
    effect: (p) => { p.m += 15; p.karma += 15; p.addFlag('rebuilt_institution'); p.setMem('cleRebuild', true) },
  },

  // ── INDONESIA ─────────────────────────────────────────────────────────────

  {
    id: 'cle_indonesia_imam_suharto',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_CLERGY(G) && IS_INDONESIA(G) && G.religion?.includes('muslim') && G.currentYear >= 1970 && G.currentYear <= 1995 && G.age >= 35 && !G.mem.cleImam,
    text: 'Suharto\'s New Order requires *pesantren* and mosque preachers to register with the Department of Religious Affairs. Sermons are monitored. The phrase to use when referring to the government is *pemerintah yang sah* — the legitimate government. You have learned which topics can be addressed and which must be deferred to another context. The faith you preach is the faith available in this context. The full faith exists elsewhere, in private, with people you trust.',
    choices: [
      {
        text: 'Preach within the permitted frame. The congregation needs you here.',
        tag: 'within_frame',
        outcome: 'You stay. The congregation has you for thirty more years. What you could not say in the sermon you said in the counselling room, the kitchen, the car on the way to the hospital.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.addFlag('clergy_adapted'); p.setMem('cleImam', true) },
      },
      {
        text: 'Find ways to say the unsayable things indirectly.',
        tag: 'encoded',
        outcome: 'The congregation understands the encoding. Surveillance listens for direct statements. The gap between those two things is where you operate.',
        effect: (p) => { p.m -= 5; p.karma += 10; p.addFlag('resistance_through_art'); p.addFlag('clergy_adapted'); p.setMem('cleImam', true) },
      },
    ],
  },

  // ── YESHIVA / ISRAEL ──────────────────────────────────────────────────────

  {
    id: 'cle_yeshiva_compact',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_ISRAEL(G) && (G.religion === 'jewish_orthodox' || G.religion?.includes('jewish')) && G.currentYear >= 1955 && G.currentYear <= 1990 && G.age >= 18 && G.age <= 25 && !G.mem.cleYeshiva,
    text: 'Ben-Gurion made a compact with the Orthodox rabbis in 1947: full-time yeshiva students would be exempt from military service. There are four hundred exemptions originally granted; by the time you are studying there are tens of thousands. You study Torah. Your secular neighbour has gone to the army for three years. The compact that protects your study is not fully comfortable, but you did not design it.',
    choices: [
      {
        text: 'Study. The tradition requires full immersion to preserve it.',
        tag: 'studied',
        outcome: 'You study. The world outside the beit midrash is audible but at a remove. This is the remove the tradition requires.',
        effect: (p) => { p.e += 8; p.addFlag('yeshiva_trained'); p.setMem('cleYeshiva', true) },
      },
      {
        text: 'Study, but the asymmetry is not comfortable.',
        tag: 'uncomfortable',
        outcome: 'You carry the discomfort through years of study. The discomfort does not resolve the study; they coexist.',
        effect: (p) => { p.e += 6; p.m -= 5; p.addFlag('yeshiva_trained'); p.addFlag('institutional_doubt'); p.setMem('cleYeshiva', true) },
      },
    ],
  },

  {
    id: 'cle_yeshiva_1967',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_ISRAEL(G) && G.flags.has('yeshiva_trained') && G.currentYear === 1967 && !G.mem.cle67,
    text: 'The Six Day War. Your exemption holds; your secular neighbour from the next street does not have one. He goes to the Sinai. You continue your studies. On the radio the news comes in dispatches — the air force, the Golan, the Old City, the Wall. The specific moral experience of being shielded by a compact you didn\'t choose, on a day when others are not.',
    effect: (p) => { p.m -= 10; p.addFlag('moral_weight_carried'); p.setMem('cle67', true) },
  },

  // ── CROSS-CULTURAL LATE LIFE ───────────────────────────────────────────────

  {
    id: 'cle_late_congregation',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('clergy_ordained') && G.age >= 65 && !G.mem.cleLate,
    text: 'You have held a congregation for decades. You have buried people you baptised. You have baptised the children of people whose parents you buried. This is the specific continuity that religious institutions hold — the long memory, the presence across a life\'s full arc. What it required of you was not always what you expected. What you gave was not always what the institution asked for.',
    effect: (p) => { p.m += 10; p.karma += 8; p.setMem('cleLate', true) },
  },

]
