// events_new_zealand_depth.js — New Zealand depth arc

export const NEW_ZEALAND_DEPTH_EVENTS = [

  // ── Waitangi Tribunal / Māori land grievances ─────────────────────────────

  {
    id: 'nz_dep_maori_land_waitangi',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.ethnicity === 'maori' &&
      G.currentYear >= 1975 && G.currentYear <= 1998 &&
      G.age >= 28 &&
      !G.mem?.nzWaitangi,
    text: 'The Waitangi Tribunal is established in 1975 — the first body to hear Māori grievances against the Crown under the Treaty. You have heard the word "Treaty" your whole life in the particular tone that Pākehā use when they want the conversation to end. Now there is a mechanism, slow and adversarial, but a mechanism. Your grandfather\'s land is not coming back. But the word "claim" is in the language now in a way that it was not before, and that is not nothing.',
    choices: [
      {
        text: 'File a claim with the Tribunal',
        tag: 'claim',
        outcome: 'The process takes twelve years. The settlement is partial. You say yes anyway.',
        effect: (p) => { p.r += 4; p.e += 2; p.addFlag('nz_waitangi_generation') },
      },
      {
        text: 'Watch from a distance — you have heard too many promises',
        tag: 'guarded',
        outcome: 'The distance is also a kind of protection, and also a kind of loss.',
        effect: (p) => { p.r += 6; p.addFlag('nz_waitangi_generation') },
      },
    ],
    effect: null,
  },

  // ── Dawn Raids on Pacific Islanders 1974–1976 ─────────────────────────────

  {
    id: 'nz_dep_dawn_raids_pacific',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.ethnicity === 'pacific_islander' &&
      G.currentYear >= 1974 && G.currentYear <= 1977 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.nzDawnRaids,
    text: 'The dawn raids begin in 1974. Police arrive before five in the morning. The logic offered publicly is overstaying — Pacific Islanders are a quarter of New Zealand\'s overstaying population but receive three-quarters of the deportations. You know the other number: British and South African overstayers are not woken before dawn. The raids go on for years. You do not open the door at night now without first checking who is outside.',
    choices: [
      {
        text: 'Join the Polynesian Panthers — leaflet, protest, know the rights',
        tag: 'resist',
        outcome: 'The Panthers know the law as a weapon and a shield. You learn both uses alongside them.',
        effect: (p) => { p.e += 3; p.s += 2; p.m -= 3; p.addFlag('nz_dawn_raids_generation') },
      },
      {
        text: 'Keep your head down — your family cannot afford deportation',
        tag: 'survive',
        outcome: 'You stay. You watch others go. You do not forget.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('nz_dawn_raids_generation') },
      },
    ],
    effect: null,
  },

  // ── Homosexual Law Reform 1986 ────────────────────────────────────────────

  {
    id: 'nz_dep_homosexual_law_reform',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 1985 && G.currentYear <= 1993 &&
      G.age >= 16 &&
      !G.mem?.nzHLR,
    text: 'The Homosexual Law Reform Bill is introduced in 1985. Two years of parliamentary debate. The petition against it has 800,000 signatures — more than a quarter of the country. The petition for it has 150,000. You read the opposition speeches in the newspaper: "unnatural," "threat to the family," "no place in a healthy society." You are in your twenties and you have existed in this country your entire life. The bill passes on 9 July 1986. The age of consent is set at sixteen, same as heterosexual, which was fought for and won. You remember where you were.',
    choices: [
      {
        text: 'Celebrate with the community — this night is an exhale after years',
        tag: 'celebrate',
        outcome: 'The night feels like a breath held since before you understood what you were holding.',
        effect: (p) => { p.m += 5; p.r += 2; p.addFlag('nz_homosexual_reform_generation') },
      },
      {
        text: 'Mark it quietly — the law changing does not change everything',
        tag: 'cautious',
        outcome: 'The law is one thing. The school corridor is still the school corridor.',
        effect: (p) => { p.m += 2; p.r += 4; p.addFlag('nz_homosexual_reform_generation') },
      },
    ],
    effect: null,
  },

  // ── Air New Zealand Flight TE901 / Mt Erebus 1979 ─────────────────────────

  {
    id: 'nz_dep_erebus_1979',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.currentYear >= 1979 && G.currentYear <= 1984 &&
      G.age >= 20 &&
      !G.mem?.nzErebus,
    text: 'Air New Zealand Flight TE901 flies into Mt Erebus in Antarctica on 28 November 1979. All 257 aboard die. Justice Mahon\'s Royal Commission report uses the phrase "an orchestrated litany of lies" to describe Air New Zealand\'s conduct after the crash — the coordinates in the navigation computers had been changed without telling the crew. The airline sues Mahon for defamation. The Privy Council will eventually vindicate him. You knew someone on the flight, or you did not, but the country is small enough that those two possibilities feel like the same thing.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('nz_erebus_generation'); p.setMem('nzErebus', true) },
  },

  // ── Pike River mine explosion 2010 ────────────────────────────────────────

  {
    id: 'nz_dep_pike_river_2010',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.currentYear >= 2010 && G.currentYear <= 2016 &&
      G.age >= 28 &&
      !G.mem?.nzPikeRiver,
    text: 'The Pike River coalmine explodes on 19 November 2010. Twenty-nine men are underground. A second explosion three days later ends any rescue attempt. The mine is not re-entered for nine years. The families of the dead stand at the drift entrance holding photographs at anniversaries. The Royal Commission finds systematic failures of regulation, management, and oversight. One person is convicted. The mine is re-entered in 2019 and evidence is recovered. Some families say it was what they needed. Some say it is not enough. Both are true.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('nz_pike_river_generation'); p.setMem('nzPikeRiver', true) },
  },

  // ── Urban Māori identity ──────────────────────────────────────────────────

  {
    id: 'nz_dep_urban_maori_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.ethnicity === 'maori' &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 1990 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.nzUrbanMaori,
    text: 'The city is what your parents came to for work. The land your people are from is three hours north, or five hours south, or across the strait. You were born in Auckland or Wellington and the marae is a place you go for tangi and for Christmas, not the centre of daily life. Some older relatives say you are not Māori enough. Some Pākehā say you are Māori as if that explains something about you they have already decided. You carry the identity in a city that was not built to hold it, and you build what you need to carry it.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.addFlag('nz_urban_maori'); p.setMem('nzUrbanMaori', true) },
  },

  // ── Bastion Point occupation 1977–78 ─────────────────────────────────────

  {
    id: 'nz_dep_bastion_point_1978',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.ethnicity === 'maori' &&
      G.currentYear >= 1977 && G.currentYear <= 1983 &&
      G.age >= 16 &&
      !G.mem?.nzBastionPoint,
    text: 'Ōrākei, January 1977. The last Ngāti Whātua community occupy Bastion Point for 506 days. They build houses. They hold meetings. They farm the land. On 25 May 1978 the government sends in police and army — six hundred personnel — to remove them. The occupiers are arrested. The houses are bulldozed. The land was confiscated by the Crown in stages between 1840 and 1951; the occupation was the latest chapter in the same story. The photographs of the bulldozers circulate for years.',
    choices: [
      {
        text: 'Join the occupation — this is the land',
        tag: 'occupy',
        outcome: 'You are among those arrested. The charge is minor. The memory is permanent.',
        effect: (p) => { p.m -= 3; p.r += 5; p.karma += 4; p.addFlag('nz_bastion_point_generation') },
      },
      {
        text: 'Watch the removal from the road — witness it, at least',
        tag: 'witness',
        outcome: 'The bulldozers run for most of the day. You do not leave until they stop.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('nz_bastion_point_generation') },
      },
    ],
    effect: null,
  },

  // ── Overseas Experience ───────────────────────────────────────────────────

  {
    id: 'nz_dep_oe_london',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'New Zealand' &&
      G.currentYear >= 1960 && G.currentYear <= 2005 &&
      G.age >= 20 && G.age <= 28 &&
      !G.mem?.nzOE,
    text: 'The Overseas Experience: every New Zealander goes, or knows someone who went, or explains to someone from outside why they went. London is the destination because of the passport, the distance, the flat in Earls Court that has been inhabited by New Zealanders since before your parents were born. You go for a year and stay for three, or you go for three months and come back changed in ways you cannot fully account for. What you understand on the plane home is how far away New Zealand is, and also how specifically you belong to it.',
    choices: [
      {
        text: 'Stay abroad — there is too much here to leave',
        tag: 'stay_abroad',
        outcome: 'The years accumulate. You become the kind of New Zealander who lives overseas.',
        effect: (p) => { p.e += 3; p.r += 3; p.addFlag('nz_oe_generation') },
      },
      {
        text: 'Come home — New Zealand is the right size for you',
        tag: 'return',
        outcome: 'The airport at Auckland at six in the morning. The light different. You recognise it as your own.',
        effect: (p) => { p.m += 3; p.r += 2; p.addFlag('nz_oe_generation') },
      },
    ],
    effect: null,
  },

]
