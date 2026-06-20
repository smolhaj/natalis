// Egypt character events
// Historical arcs: Nasser/Nasserism, 1967 defeat (Naksa), infitah under Sadat,
// Mubarak emergency law, 2011 Tahrir revolution

export const EGYPT_EVENTS = [

  {
    id: 'egy_nasser_dream',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1956 && G.currentYear <= 1967 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem.egyNasser,
    text: 'Nasser is on the radio. His voice has a quality that makes people stop what they are doing. The Suez Canal is being nationalized — Egypt\'s canal, returned to Egypt after seventy-five years of foreign operation. Britain and France and Israel will invade and then withdraw, which is what happens when America tells them to withdraw, which Nasser does not explain but which everyone understands. The Arab world is watching Egypt. Egypt is watching Nasser. You are watching both.',
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('nasser_generation'); p.setMem('egyNasser', true) },
  },

  {
    id: 'egy_naksa_1967',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear === 1967 &&
      G.age >= 14 &&
      !G.mem.egyNaksa,
    text: 'June 5, 1967. The Egyptian air force is destroyed on the ground in the first three hours. The Sinai is lost in six days. The radio has been reporting victories; the reality arriving from the front is of a different order. Nasser announces his resignation and then rescinds it because the crowds in the streets will not accept it. The defeat is being called the Naksa — the setback. The word is calibrated to minimize what has happened. What has happened is: the dream of Arab unity, of a new Egypt that would stand as an equal among nations, has been tested against the morning, and the morning has answered.',
    choices: [
      {
        text: 'You had believed it. The belief ends here.',
        tag: null,
        outcome: 'You do not stop believing in Egypt. You stop believing in the version of Egypt that was on the radio.',
        effect: (p) => { p.m -= 15; p.r += 9; p.addFlag('naksa_generation'); p.setMem('egyNaksa', true) },
      },
      {
        text: 'You have a brother who was at the front.',
        tag: null,
        outcome: 'He comes back. The crossing from what he saw to what he can say about it is not a crossing he makes easily or often.',
        effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('naksa_generation'); p.addFlag('experienced_loss'); p.setMem('egyNaksa', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'egy_sadat_infitah',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1974 && G.currentYear <= 1985 &&
      G.age >= 18 &&
      !G.mem.egyInflah,
    text: 'Sadat\'s infitah: the open door policy. Foreign investment arrives. Consumer goods appear in the markets of Cairo that were not there before. The economy is opening. What it is opening to is a question the policy does not quite answer. The people who benefit immediately are those who already have capital or connections. The new Cairo of imported cars and satellite dishes and five-star hotels occupies the same geography as the old Cairo of crowded apartment blocks and government salaries that do not keep up with prices. The door is open. Not everyone is on the same side of it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('infitah_generation'); p.setMem('egyInflah', true) },
  },

  {
    id: 'egy_mubarak_emergency',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 20 &&
      !G.mem.egyEmergency,
    text: 'The Emergency Law has been in effect since 1981 — since the day Sadat was shot at the military parade. It allows detention without charge, restricts assembly, and gives the security services a range of authority that normal law would not permit. It has been renewed every three years. The state security apparatus — the Amn al-Dawla — is a presence in the background of public life. The things you do not say in certain contexts, the groups you do not join, the petitions you do not sign: these are the shape of the law expressed in behaviour.',
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 6; p.addFlag('mubarak_emergency_generation'); p.setMem('egyEmergency', true) },
  },

  {
    id: 'egy_bread_riots_1977',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear === 1977 &&
      G.age >= 16 &&
      !G.mem.egyBread,
    text: 'January 18, 1977. The government removes subsidies on bread and basic foods as part of IMF conditions. The price of bread doubles overnight. The streets fill. Seventy-nine people are killed. The army is deployed. Sadat re-imposes the subsidies two days later. The IMF conditions are quietly set aside. The event is called intifadat al-haita, the uprising of the thieves, by the government. The people who were in the streets call it something else: bread, honour, freedom. The government backed down. That fact is also a piece of information.',
    choices: null,
    effect: (p) => { p.m -= 8; p.karma += 6; p.addFlag('egypt_bread_generation'); p.setMem('egyBread', true) },
  },

  {
    id: 'egy_tahrir_2011',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear === 2011 &&
      G.age >= 18 &&
      !G.mem.egyTahrir,
    text: 'January 25, 2011. Tahrir Square. Mubarak has been president for thirty years. The Emergency Law has been in effect for thirty years. For eighteen days the square holds. Mubarak goes on television twice and does not resign. On February 11 the vice president reads a statement: Mubarak has resigned. The crowd sound in Tahrir is a sound that has no peacetime equivalent. You have been alive through three presidents and thirty years of emergency law. The thing that was assumed to be permanent has just been assumed correctly, and then it ended.',
    choices: [
      {
        text: 'You were in Tahrir.',
        tag: null,
        outcome: 'Eighteen days. You will describe the nights in the square to people who were not there for the rest of your life, and the description will never quite capture what the nights in the square were.',
        effect: (p) => { p.m += 14; p.karma += 8; p.addFlag('tahrir_generation'); p.addFlag('political_active'); p.setMem('egyTahrir', true) },
      },
      {
        text: 'You followed it from home, from a rooftop, from the edges.',
        tag: null,
        outcome: 'February 11. The vice president reads the statement. The sound from Tahrir enters every window in Cairo simultaneously.',
        effect: (p) => { p.m += 8; p.addFlag('tahrir_generation'); p.setMem('egyTahrir', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'egy_tahrir_aftermath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.flags.has('tahrir_generation') &&
      G.currentYear >= 2012 && G.currentYear <= 2016 &&
      !G.mem.egyAftmath,
    text: 'What followed Tahrir: the SCAF military council, the parliamentary elections won by the Brotherhood, Morsi, the counter-revolution of June 30 and July 3, 2013 — Sisi. The emergency law comes back. The features of the new Egypt resemble the features of the old Egypt with some of the personnel changed. The people who were in Tahrir in 2011 are now in three different places: prison, exile, or a specific kind of silence. The square that held for eighteen days holds a different meaning now, which is also a meaning.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 12; p.addFlag('arab_spring_disillusionment'); p.setMem('egyAftmath', true) },
  },

  // ── MUBARAK-ERA MIDDLE CLASS TEXTURE ────────────────────────────────────────

  {
    id: 'egy_wasta_career',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1975 && G.currentYear <= 2011 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.egyWasta,
    text: 'The job you want requires knowing the right person. This is not unusual. In Egypt, the network of connections through which opportunities circulate is called *wasta* — weight, influence, the phone call that does in two days what the official channel takes eight months. It is not corruption exactly; it is the social infrastructure that supplements the official system. Everyone uses it who can. Everyone who can\'t uses a longer route.',
    choices: [
      {
        text: 'You have the connection. Your uncle\'s colleague makes the call.',
        tag: 'wasta',
        outcome: 'The position is yours. The work is real. The way you got it is also real, and you are aware of both facts in a proportion that shifts over the years.',
        effect: (p) => { p.m += 6; p.karma -= 4; p.addFlag('egypt_wasta_beneficiary'); p.setMem('egyWasta', true) },
      },
      {
        text: 'You don\'t have that. You go through the official process.',
        tag: 'no_wasta',
        outcome: 'The process takes eight months. The position is in a city you didn\'t ask for. You learn that merit is not the primary operating principle. This information is useful. The learning has a cost.',
        effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.addFlag('egypt_wasta_blocked'); p.setMem('egyWasta', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'egy_gulf_contract_choice',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1978 && G.currentYear <= 2010 &&
      G.age >= 25 && G.age <= 45 &&
      !G.mem?.egyGulf,
    text: 'Saudi Arabia, Kuwait, the UAE: the Gulf countries need workers, engineers, teachers, accountants. The numbers are specific — three times your current salary, tax-free, in a city you have never visited, with three weeks off per year to come back. You have watched colleagues leave. You have seen the remittances that arrive. You have also seen what happens when the contract ends: the return to a city that moved on without you, to a family that learned a new shape in your absence.',
    choices: [
      {
        text: 'Take the Gulf contract.',
        tag: 'gulf',
        outcome: 'Riyadh. Abu Dhabi. Manama. You send money home every month. The separations become the structure of your life. You come back three weeks a year and each time the apartment feels slightly different, in ways no one can name.',
        effect: (p) => { p.mo += 4500; p.m -= 8; p.r += 6; p.addFlag('egypt_gulf_worker'); p.setMem('egyGulf', true) },
      },
      {
        text: 'Stay in Egypt.',
        tag: 'stayed',
        outcome: 'You watch the ones who go. You can see the money they come back with. You cannot see what the going cost them, and you stop trying to calculate it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('egypt_stayed_for_roots'); p.setMem('egyGulf', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'egy_blocked_generation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 28 && G.age <= 50 &&
      !G.flags.has('egypt_gulf_worker') &&
      !G.mem?.egyBlocked,
    text: 'You graduated from Cairo University with an engineering degree. This is an achievement your parents are genuinely proud of. The degree does not connect to employment the way the achievement suggests it should. The engineering faculty graduates fifteen thousand students per year; the private sector cannot absorb most of them; the government desk jobs pay twelve hundred pounds a month. Your cousin drives a taxi. He has a university degree in economics. The taxi makes more than the government job. You have chosen the government job, because the taxi is not what the degree was for. You are not sure the degree was for the government job either.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('egypt_blocked_generation'); p.setMem('egyBlocked', true) },
  },

  {
    id: 'egy_coptic_navigation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Egypt' &&
      G.ethnicity === 'coptic_egyptian' &&
      G.currentYear >= 1985 && G.currentYear <= 2011 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.egyCooptic,
    text: 'The church is where the community is. Sunday mass, the saint\'s day celebrations, the specific social world of a Coptic family in Cairo — the weddings, the funerals, the network of who is related to whom through three generations of the same neighbourhood. In the university, in the workplace, you navigate the gap between your Coptic social world and the national one. You don\'t hide it — your name announces it. You don\'t advertise it — the calculus of when it helps and when it doesn\'t is something you learned without being taught.',
    choices: [
      {
        text: 'The navigation is unremarkable. You\'ve done it your whole life.',
        tag: 'navigate',
        outcome: 'High military rank, intelligence, the interior ministry: not for Copts. Engineering, medicine, private business: those are different. You work within the topography. You have always worked within the topography.',
        effect: (p) => { p.e += 4; p.m -= 3; p.addFlag('coptic_navigation'); p.setMem('egyCooptic', true) },
      },
      {
        text: 'There are years when a church is bombed and the navigation changes.',
        tag: 'targeted',
        outcome: 'Not in your street. Someone related to someone you know. The news, which you follow differently than your Muslim colleagues do. The next morning the appropriate response is to return to normal, and you do, and the normalising is its own small cost.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('coptic_navigation'); p.addFlag('sectarian_threat_survived'); p.setMem('egyCooptic', true) },
      },
    ],
    effect: null,
  },

]
