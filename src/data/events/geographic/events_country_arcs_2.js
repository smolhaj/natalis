// events_country_arcs_2.js
// Deep historical arc events — BUILD 10 continuation
// China (Mao era), USA (civil rights, Vietnam, McCarthy, opioids, Great Migration),
// Japan (hibakusha, Anpo, Minamata, salaryman, bubble collapse)

export const COUNTRY_ARC_2_EVENTS = [

  // ── CHINA — MAO ERA ──────────────────────────────────────────────────────────

  {
    id: 'ca2_china_land_reform',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1949 && G.currentYear <= 1955 &&
      !G.mem?.chinaLandReform,
    text: 'The land reform officials arrive in the village with a ledger. They read out the names of families who will give up their land and the names of families who will receive it. The reversal is total and happens in a morning. By afternoon the family that owned the eastern field is watching someone else cross it.',
    choices: [
      {
        text: 'Your family receives land — for the first time you have something',
        tag: null,
        outcome: 'Your father walks the boundary of the field alone before dark. He does not speak at dinner. The weight of it — the newness of ownership — sits in the room with you.',
        effect: (p) => { p.m += 8; p.w += 10; p.setMem('chinaLandReform', true); p.addFlag('land_reform_era'); },
      },
      {
        text: 'Your family loses the land — everything is redistributed',
        tag: null,
        outcome: 'The ledger does not leave room for argument. Your grandmother does not leave her room for three days. The land is gone by the end of the week. The family that receives it does not look at you.',
        effect: (p) => { p.m -= 12; p.w -= 10; p.r += 8; p.setMem('chinaLandReform', true); p.addFlag('land_reform_era'); },
      },
    ],
  },

  {
    id: 'ca2_china_great_leap_famine',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1959 && G.currentYear <= 1962 &&
      !G.mem?.chinaGreatLeapFamine,
    text: 'The quota for grain goes out of the village on carts while people are eating nettles. The communal pot has been thin for four months. Your mother adds clay to the flour to stretch it. A man three houses down barters his jacket for a small sack of sorghum and there is nothing strange about this. The radio announces a record harvest. Nobody in the village owns a radio but you have heard what it says.',
    choices: null,
    effect: (p) => { p.h -= 18; p.m -= 12; p.r += 8; p.setMem('chinaGreatLeapFamine', true); p.addFlag('great_leap_survived'); },
  },

  {
    id: 'ca2_china_great_leap_cadre',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.career &&
      G.currentYear >= 1959 && G.currentYear <= 1962 &&
      !G.mem?.chinaGreatLeapCadre,
    text: 'The quota arrives from the county office and you must enforce it. You know the village granary. You know what is left. If you fill this quota the village will not have enough to eat through spring. If you do not fill it, the county will send someone who will. You have a family. The man across the table from you has a family. The quota has a deadline.',
    choices: [
      {
        text: 'Report the true figures — refuse to fill a quota that will starve people',
        tag: null,
        outcome: 'You are removed from your position within the month. Someone else fills the quota. You carry the knowledge that your refusal changed nothing except what you are.',
        effect: (p) => { p.m -= 12; p.e += 6; p.karma += 10; p.r += 6; p.setMem('chinaGreatLeapCadre', true); p.addFlag('great_leap_era'); p.addFlag('defied_authority'); },
      },
      {
        text: 'Enforce it — you tell yourself there is no alternative',
        tag: null,
        outcome: 'The quota leaves. Spring comes. You do not look at who survives and who does not. You carry this in a compartment you keep closed for the rest of your life.',
        effect: (p) => { p.m -= 15; p.r += 15; p.setMem('chinaGreatLeapCadre', true); p.addFlag('great_leap_era'); p.addFlag('complicit_silence'); },
      },
    ],
  },

  {
    id: 'ca2_china_cultural_rev_red_guard',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1966 && G.currentYear <= 1969 &&
      !G.mem?.chinaRedGuard,
    text: 'The schools have closed. Mao has called on the youth to make revolution. There is a specific energy in the city — the arm bands, the little red books, the loudspeakers reading passages at a volume that means something is happening. You could be part of this. Part of you wants to be. The enemy is the teacher who humiliated you in class last year, the old customs, everything that held you down.',
    choices: [
      {
        text: 'Join enthusiastically — this is your moment',
        tag: null,
        outcome: 'The movement carries you for two years. What you do in that energy — and what the energy does to you — is something you will spend decades sorting through.',
        effect: (p) => { p.m += 5; p.s += 4; p.r += 10; p.setMem('chinaRedGuard', true); p.addFlag('cultural_revolution_witnessed'); p.addFlag('red_guard_era'); },
      },
      {
        text: 'Participate reluctantly — it is not safe to refuse',
        tag: null,
        outcome: 'You wear the armband and say the words. You do not do the worst things. Whether this is a moral distinction or merely a practical one, you have not decided.',
        effect: (p) => { p.m -= 6; p.r += 8; p.setMem('chinaRedGuard', true); p.addFlag('cultural_revolution_witnessed'); p.addFlag('learned_silence'); },
      },
    ],
  },

  {
    id: 'ca2_china_cultural_rev_denunciation',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1966 && G.currentYear <= 1976 &&
      (G.career || G.education) &&
      !G.mem?.chinaDenunciation,
    text: 'The study session turns into something else. Someone at the front begins reading from a list of names. When they reach the teacher\'s name, they look at you. The teacher taught you mathematics for three years. You know things about her — her son, her doubts, her habit of saying too much. The room is waiting. The pause before you speak is very long.',
    choices: [
      {
        text: 'Denounce her — you say what the room needs to hear',
        tag: null,
        outcome: 'She does not look at you when they take her. You are safe for now. The pause before you spoke is something you cannot unknow about yourself.',
        effect: (p) => { p.m -= 14; p.r += 16; p.s += 2; p.setMem('chinaDenunciation', true); p.addFlag('cultural_revolution_witnessed'); p.addFlag('complicit_silence'); },
      },
      {
        text: 'Refuse — say you have nothing to report',
        tag: null,
        outcome: 'The room turns its attention to you. The cost is immediate and real. The other thing — what it would have cost — you do not have to know.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.karma += 12; p.setMem('chinaDenunciation', true); p.addFlag('cultural_revolution_witnessed'); p.addFlag('defied_authority'); },
      },
    ],
  },

  {
    id: 'ca2_china_send_down',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1968 && G.currentYear <= 1976 &&
      !G.mem?.chinaSendDown,
    text: 'The assignment arrives. You are going to a commune in Yunnan Province. They call it re-education through labour. You have lived in the city your entire life. You pack what fits in one bag. The train platform is full of young people in the same position. Some of them are crying. Some of them believe this is correct. You will be gone for years — how many years you do not know yet.',
    choices: [
      {
        text: 'Accept the assignment — resist the bitterness for as long as you can',
        tag: null,
        outcome: 'You learn to plant rice and to read clouds and to be a different kind of person than you planned to be. The years taken from you are real. So is what grew in their place.',
        effect: (p) => { p.m -= 10; p.h += 4; p.e += 5; p.r += 8; p.setMem('chinaSendDown', true); p.addFlag('sent_down_generation'); p.addFlag('cultural_revolution_witnessed'); },
      },
      {
        text: 'Go, but do not let go of who you are — carry it quietly',
        tag: null,
        outcome: 'You keep a journal in a code only you can read. The village teaches you things. You refuse to let that be enough.',
        effect: (p) => { p.m -= 8; p.e += 8; p.r += 10; p.setMem('chinaSendDown', true); p.addFlag('sent_down_generation'); p.addFlag('cultural_revolution_witnessed'); p.addFlag('dissident_reader'); },
      },
    ],
  },

  {
    id: 'ca2_china_deng_reforms_shop',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1978 && G.currentYear <= 1985 &&
      !G.mem?.chinaDengReforms,
    text: 'Two years ago this was illegal. Now the government is telling you to do it. You have found a stall in the market and you are selling things. You do not know what to call what you are doing — the word "entrepreneur" has not been rehabilitated yet. Your father thinks you are confused. You are confused. The money coming in is real.',
    choices: [
      {
        text: 'Open the stall — see where this goes',
        tag: null,
        outcome: 'The stall becomes a shop. The shop does not make you rich but it makes you something the previous decade did not have a word for: independent.',
        effect: (p) => { p.m += 10; p.w += 8; p.mo += 1200; p.setMem('chinaDengReforms', true); p.addFlag('reform_era_generation'); p.addFlag('self_employed'); },
      },
      {
        text: 'Wait — the rules have changed too many times',
        tag: null,
        outcome: 'You watch others open stalls. Some of them do well. You remain careful. The system tells you this was wisdom; you are not sure.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('chinaDengReforms', true); p.addFlag('reform_era_generation'); },
      },
    ],
  },

  {
    id: 'ca2_china_tiananmen_witness',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear === 1989 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.chinaTiananmen,
    text: 'The morning of June 4th you are not in the square. You are close enough to hear the sounds. Later, on a borrowed television from a colleague with a satellite dish, you see the image: a man with a shopping bag standing in front of a column of tanks. By the next day that image does not exist in any newspaper in the country. You know what you saw. The official history knows something else.',
    choices: [
      {
        text: 'Hold onto what you witnessed — do not let the version replace the memory',
        tag: null,
        outcome: 'You carry a private record. For decades you will calibrate conversations about this by the specific fraction-of-a-second pause before someone responds.',
        effect: (p) => { p.m -= 12; p.e += 8; p.r += 6; p.setMem('chinaTiananmen', true); p.addFlag('tiananmen_witnessed'); p.addFlag('dissident_reader'); p.setPolitical('dissident'); },
      },
      {
        text: 'Process it privately and move forward — living here requires adaptation',
        tag: null,
        outcome: 'You learn the specific skill of holding two histories simultaneously: the one you know and the one it is safe to speak. It is a skill with a cost.',
        effect: (p) => { p.m -= 10; p.r += 10; p.setMem('chinaTiananmen', true); p.addFlag('tiananmen_witnessed'); p.addFlag('learned_silence'); },
      },
    ],
  },

  {
    id: 'ca2_china_one_child_parent',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1980 && G.currentYear <= 2015 &&
      G.children && G.children.length >= 1 &&
      !G.mem?.chinaOneChildParent,
    text: 'The policy is enforced at the work unit. Your supervisor calls you in. You have one child. The policy permits one. If you have another the fine is a year\'s salary — possibly more, depending on who counts. The family planning official comes by once a quarter to verify. Your neighbour had a second child and lost her government position. You know what you want and you know what it costs.',
    choices: [
      {
        text: 'Comply — one child is what the state permits and you cannot afford otherwise',
        tag: null,
        outcome: 'The decision is made for you by what is possible. You tell yourself this until you believe it, mostly.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('chinaOneChildParent', true); p.addFlag('one_child_complied'); },
      },
      {
        text: 'Try for a second child anyway — you will manage the consequences',
        tag: null,
        outcome: 'The second child is born at home, registered through a cousin in another county. The fine arrives three years later. You pay it across five years. You do not regret it.',
        effect: (p) => { p.m += 4; p.mo -= 3000; p.r += 4; p.setMem('chinaOneChildParent', true); p.addFlag('one_child_defied'); },
      },
    ],
  },

  {
    id: 'ca2_china_only_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      !G.mem?.chinaOnlyChild,
    text: 'You are the only child of two only children. There are no cousins. At the dinner table: you, your parents, your four grandparents. Eight eyes following you through the meal. Your report card is read aloud. Your illness is a family emergency. Your ambition is not entirely your own. You have never had a room to yourself — not in the way an only child in a different country would mean it. Your room is full of expectation.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 4; p.r += 5; p.setMem('chinaOnlyChild', true); p.addFlag('little_emperor'); },
  },

  // ── CHINA: ONE-CHILD POLICY (ADDITIONAL EVENTS) ──────────────────────────

  {
    id: 'ocp_missing_sisters',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.flags.includes('little_emperor') &&
      !G.mem?.ocpMissingSisters,
    text: 'You are sorting through your parents\' things and find a photograph of a baby girl who is not you. You are an only child. Your mother has never mentioned a pregnancy before yours. The photograph is dated fourteen months before your birth. You have counted things and arrived at a number and the number is one — one child who did not arrive, who did not grow up in this apartment, who is not sitting at this table. The photograph is small. You put it back where you found it. You do not bring it up at dinner. You understand, without being told, that it is not to be brought up.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 12; p.setMem('ocpMissingSisters', true); p.addFlag('ocp_missing_sibling'); },
  },

  {
    id: 'ocp_missing_sisters_adult',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.flags.includes('ocp_missing_sibling') &&
      G.age >= 22 &&
      !G.mem?.ocpMissingSistersAdult,
    text: 'You ask your mother. She is quiet for a long time. Then she says: we didn\'t have a choice. You understand that she means it literally. The choice that she did not have was made by the work unit and the family planning committee and the government and the weight of what it would have cost to refuse. You do not ask again. What she said is enough and more than enough and not enough.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 8; p.setMem('ocpMissingSistersAdult', true); },
  },

  {
    id: 'ocp_sole_support',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.flags.includes('little_emperor') &&
      G.age >= 38 && G.age <= 55 &&
      Object.values(G.parents ?? {}).some(p => p.status !== 'dead') &&
      !G.mem?.ocpSoleSupport,
    text: 'Both sets of grandparents, both parents. You are one child. There is no sibling to share this with — no one to divide the hospital visits, the phone calls, the money, the guilt. Your parents saved for your education and did not save for their care, because the expectation was that you would be the savings. You are the savings. You do not resent them. You are also very tired.',
    choices: [
      {
        text: 'Carry it — this is what family means here',
        tag: null,
        outcome: 'You carry it. Some years are harder than others. You become very good at managing several things at once, which is not a skill you chose to develop.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.karma += 8; p.setMem('ocpSoleSupport', true); p.addFlag('filial_burden'); },
      },
      {
        text: 'Talk to your parents about what is sustainable',
        tag: null,
        outcome: 'The conversation is difficult and necessary. Some adjustments are made. The situation does not change completely, but it changes enough to be bearable, most years.',
        effect: (p) => { p.m -= 6; p.h -= 2; p.karma += 5; p.s += 3; p.setMem('ocpSoleSupport', true); p.addFlag('filial_burden'); },
      },
    ],
  },

  {
    id: 'ocp_policy_lifted',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      G.currentYear >= 2015 && G.currentYear <= 2018 &&
      G.flags.includes('little_emperor') &&
      G.age >= 30 &&
      !G.mem?.ocpPolicyLifted,
    text: 'The government announces the two-child policy. After thirty-five years of the one-child policy — the fines, the forced procedures, the family planning officials who visited quarterly, the entire apparatus of demographic control — the government is now telling you to have a second child. You sit with this announcement for a while. The decision about whether to try is yours in a way it was not before, and the biology of the situation may have opinions of its own, and the city apartment that was sized for a family of three does not automatically expand.',
    choices: [
      {
        text: 'Consider it — this is different now',
        tag: null,
        outcome: 'The consideration takes a year. There are conversations with your partner about what it would mean practically. The answer you arrive at is not simple.',
        effect: (p) => { p.m += 3; p.setMem('ocpPolicyLifted', true); p.addFlag('post_one_child_generation'); },
      },
      {
        text: 'The moment has passed — this is the family you have',
        tag: null,
        outcome: 'You are thirty-seven. The policy changed too late or at the wrong time or for a life that has already arranged itself around what was permitted. You do not resent the government for the irony. You do notice it.',
        effect: (p) => { p.m -= 4; p.r += 6; p.setMem('ocpPolicyLifted', true); p.addFlag('post_one_child_generation'); },
      },
    ],
  },

  // ── USA ───────────────────────────────────────────────────────────────────────

  {
    id: 'ca2_usa_civil_rights_lunch_counter',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      (G.flags.includes('black_american') || (G.ethnicity && G.ethnicity.toLowerCase().includes('black'))) &&
      G.currentYear >= 1955 && G.currentYear <= 1968 &&
      !G.mem?.usaCivilRightsAction,
    text: 'The sit-in at the lunch counter has been going for three days. Students your age are taking seats at the counter and ordering coffee they know will not come. The manager calls the police. Sometimes people pour things on those sitting. You know the names of students who have been arrested. You know what a night in that jail looks like. You also know what is being demanded and why.',
    choices: [
      {
        text: 'Take a seat at the counter — this is the moment',
        tag: null,
        outcome: 'You sit down and fold your hands on the counter. The time passes very slowly. When it is over you are still there. So is the counter. Something has shifted, by a fraction, which is how it shifts.',
        effect: (p) => { p.m += 5; p.karma += 10; p.s += 5; p.setMem('usaCivilRightsAction', true); p.addFlag('civil_rights_generation'); p.addFlag('political_active'); p.setPolitical('left'); },
      },
      {
        text: 'Stay back — the cost of being visible is real and the family cannot afford it',
        tag: null,
        outcome: 'You watch from across the street. You are not inside history in the way you might have been. This is a fact you carry.',
        effect: (p) => { p.m -= 5; p.r += 10; p.setMem('usaCivilRightsAction', true); p.addFlag('civil_rights_generation'); },
      },
    ],
  },

  {
    id: 'ca2_usa_civil_rights_church_bombing',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      (G.flags.includes('black_american') || (G.ethnicity && G.ethnicity.toLowerCase().includes('black'))) &&
      G.currentYear >= 1963 && G.currentYear <= 1964 &&
      !G.mem?.usaChurchBombing,
    text: 'The news arrives about the Sixteenth Street Baptist Church in Birmingham. Four girls. The oldest was fourteen. A Sunday morning. The same age as you, or close. Your mother sits down in the kitchen chair and does not move for a long time. You understand, with the specific clarity of being a child who has just understood something adult, that being alive in this country is a different thing depending on who you are.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.e += 6; p.setMem('usaChurchBombing', true); p.addFlag('civil_rights_generation'); },
  },

  {
    id: 'ca2_usa_vietnam_draft_lottery',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1969 && G.currentYear <= 1972 &&
      G.age >= 18 && G.age <= 26 &&
      !G.mem?.usaVietnamDraft,
    text: 'The lottery draws a number for each birthday. Yours is low enough. Low enough means you go. The notice comes in an envelope you recognise by its weight before you open it. Men you know are in Canada. One is in a graduate programme that will last exactly as long as it needs to. You are not those men. You have two weeks.',
    choices: [
      {
        text: 'Report for induction — you go',
        tag: null,
        outcome: 'You go. What happens over there happens. You come back changed in ways that take years to name.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.e += 5; p.r += 10; p.setMem('usaVietnamDraft', true); p.addFlag('vietnam_veteran'); },
      },
      {
        text: 'Claim a medical deferment — find a sympathetic doctor',
        tag: null,
        outcome: 'The deferment comes through. You live with the knowledge of what you did and did not do in the same year that others your age were in the jungle.',
        effect: (p) => { p.m -= 6; p.r += 12; p.setMem('usaVietnamDraft', true); p.addFlag('draft_avoided'); },
      },
      {
        text: 'Cross the border to Canada',
        tag: null,
        outcome: 'You leave. You will not be able to come home for years, and when the amnesty comes you are already something else, somewhere else.',
        effect: (p) => { p.m -= 8; p.r += 8; p.e += 4; p.setMem('usaVietnamDraft', true); p.addFlag('emigrated'); p.addFlag('draft_evader'); },
      },
    ],
  },

  {
    id: 'ca2_usa_vietnam_return',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.flags.includes('vietnam_veteran') &&
      !G.mem?.usaVietnamReturn,
    text: 'The airport is ordinary. Nobody cheers. Nobody throws anything either, which you had been warned about. Someone asks what it was like and you begin an answer and then you stop because the answer requires a context that the person asking does not have and you do not know how to build it in a conversation at an airport. You say: "Hard." They nod as if you have told them something.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 12; p.e += 6; p.setMem('usaVietnamReturn', true); p.addFlag('vietnam_homecoming'); },
  },

  {
    id: 'ca2_usa_aids_watch_friends_die',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      (G.flags.includes('lgbtq') || G.flags.includes('out') || G.flags.includes('gay') || G.flags.includes('queer')) &&
      G.currentYear >= 1981 && G.currentYear <= 1995 &&
      !G.mem?.usaAids,
    text: 'The third funeral in eight months. Before this one there were two others. At the first funeral the family used a different word for the cause. The government has a number for deaths and does not have a response. ACT UP is in the streets. You know people in ACT UP. You have been to the vigils where names are read until the candles burn down. The Names Project is piecing together a quilt that is now larger than any room you have been in.',
    choices: [
      {
        text: 'Join the demonstrations — the rage is the only appropriate response',
        tag: null,
        outcome: 'You are arrested once, charged with nothing, released. The movement eventually produces a response. Not soon enough. Never soon enough.',
        effect: (p) => { p.m -= 12; p.karma += 10; p.s += 5; p.setMem('usaAids', true); p.addFlag('aids_crisis_generation'); p.addFlag('political_active'); p.setPolitical('left'); },
      },
      {
        text: 'Grieve privately — the funerals are already public enough',
        tag: null,
        outcome: 'You go to every funeral. You learn to make food for the sick and to hold someone\'s hand without flinching. The grief is also a form of showing up.',
        effect: (p) => { p.m -= 14; p.karma += 8; p.r += 8; p.setMem('usaAids', true); p.addFlag('aids_crisis_generation'); },
      },
    ],
  },

  {
    id: 'ca2_usa_rust_belt_plant_closes',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.stats.wealth < 50 &&
      G.career &&
      !G.mem?.usaRustBelt,
    text: 'The notice goes up on a Thursday. The mill is closing. Not reducing — closing. The last pour will be next month. Your father worked this floor for twenty-three years. You have worked it for four. The town grew up around this building and it has not prepared for what happens when the building empties. Neither have you.',
    choices: [
      {
        text: 'Stay — your family is here, you will find something',
        tag: null,
        outcome: 'What you find is smaller and pays less. The town adjusts downward, year by year. You adjust with it. The building rusts visibly from the highway.',
        effect: (p) => { p.m -= 12; p.w -= 8; p.mo -= 2000; p.setMem('usaRustBelt', true); p.addFlag('rust_belt_generation'); },
      },
      {
        text: 'Leave — follow the work somewhere else',
        tag: null,
        outcome: 'You go. The leaving costs you things the new place cannot replace. You find work. The specific kind of belonging you had in that town you do not find again.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('usaRustBelt', true); p.addFlag('rust_belt_generation'); p.addFlag('emigrated'); },
      },
    ],
  },

  {
    id: 'ca2_usa_mccarthy_hearing',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1950 && G.currentYear <= 1954 &&
      G.career &&
      !G.mem?.usaMcCarthy,
    text: 'The subpoena is in your mailbox on a Monday. The hearing is in three weeks. The question they will ask is: "Are you now, or have you ever been, a member of the Communist Party of the United States?" The answer does not matter as much as you would expect. Being called to answer the question is the event. Your employer already knows. Your colleagues are waiting to learn what kind of person you are, or what kind of person you are willing to be.',
    choices: [
      {
        text: 'Refuse to name names — take the fifth',
        tag: null,
        outcome: 'You are cited for contempt. The career you had ends. What grows in its place is slower and harder and belongs entirely to you.',
        effect: (p) => { p.m -= 14; p.w -= 10; p.karma += 12; p.e += 5; p.setMem('usaMcCarthy', true); p.addFlag('red_scare_generation'); p.addFlag('defied_authority'); },
      },
      {
        text: 'Cooperate — give them names and keep your position',
        tag: null,
        outcome: 'You give them three names. The three people lose their positions. You keep yours. You do not speak to one of the three for the rest of your life. The other two, you avoid.',
        effect: (p) => { p.m -= 16; p.r += 18; p.setMem('usaMcCarthy', true); p.addFlag('red_scare_generation'); p.addFlag('complicit_silence'); },
      },
    ],
  },

  {
    id: 'ca2_usa_post_9_11_airport',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      (G.religion === 'islam' || G.flags.includes('muslim') || (G.ethnicity && (G.ethnicity.toLowerCase().includes('arab') || G.ethnicity.toLowerCase().includes('south_asian') || G.ethnicity.toLowerCase().includes('middle_east')))) &&
      G.currentYear >= 2001 && G.currentYear <= 2005 &&
      !G.mem?.usaPost911Airport,
    text: 'The security line at the airport is routine until it is not. You are pulled aside. Your passport is American. They know this. The questions are specific in a way that makes their logic clear. You calculate, as you have been calculating in many rooms since September, each word before it leaves your mouth. The other passengers watch or look away. Both are a kind of answer.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.e += 5; p.setMem('usaPost911Airport', true); p.addFlag('post_911_american'); p.addFlag('discrimination_experienced'); },
  },

  {
    id: 'ca2_usa_great_migration',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      (G.flags.includes('black_american') || (G.ethnicity && G.ethnicity.toLowerCase().includes('black'))) &&
      G.currentYear >= 1930 && G.currentYear <= 1965 &&
      !G.mem?.usaGreatMigration,
    text: 'The night train north leaves at 11pm. Your family is on it with one suitcase and the address of a cousin in Chicago who has been there four years and works at the stockyards. The South is behind you. The city arrives before dawn — vast, cold, smelling of steel and cold water. Your mother looks out the window and says nothing for a long time. The cousin meets you at the station. He has been here four years and does not look the same as he did.',
    choices: [
      {
        text: 'Arrive with hope — the North means something',
        tag: null,
        outcome: 'The North is not what the letters said, exactly. But the letters were not wrong either. You build a life in the neighbourhood the redlining left for you. It becomes yours.',
        effect: (p) => { p.m += 5; p.s += 5; p.setMem('usaGreatMigration', true); p.addFlag('great_migration_family'); p.addFlag('civil_rights_generation'); },
      },
      {
        text: 'Arrive carefully — you have learned not to believe in easy promises',
        tag: null,
        outcome: 'The city is better than where you came from and worse than what was promised, which is what you expected. You make do. Making do is not nothing.',
        effect: (p) => { p.m += 2; p.e += 5; p.setMem('usaGreatMigration', true); p.addFlag('great_migration_family'); p.addFlag('civil_rights_generation'); },
      },
    ],
  },

  {
    id: 'ca2_usa_opioid_crisis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.stats.health < 65 &&
      !G.mem?.usaOpioid,
    text: 'The doctor writes the prescription without much hesitation — thirty pills, OxyContin, for the back. It helps immediately. The kind of pain that had been managing your life for two years goes quiet. The refill is straightforward. The second refill requires a conversation but ends with another bottle. The third is the month you notice you are counting days differently.',
    choices: [
      {
        text: 'Fill the prescription — the pain was real and the relief is necessary',
        tag: null,
        outcome: 'The pain is managed. Something else begins. The town has this happening in several households you know, though nobody uses that word yet.',
        effect: (p) => { p.h += 8; p.m -= 5; p.r += 6; p.setMem('usaOpioid', true); p.addFlag('opioid_adjacent'); },
      },
      {
        text: 'Ask about alternatives — the prescription feels like more than you need',
        tag: null,
        outcome: 'The doctor is surprised but not unkind. The alternatives are slower and less complete. The pain remains a negotiation.',
        effect: (p) => { p.h += 3; p.m -= 3; p.setMem('usaOpioid', true); },
      },
    ],
  },

  // ── JAPAN ─────────────────────────────────────────────────────────────────────

  {
    id: 'ca2_japan_hibakusha_stigma',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1945 && G.currentYear <= 1970 &&
      (G.flags.includes('hibakusha') || G.flags.includes('hibakusha_family')) &&
      !G.mem?.japanHibakushaStigma,
    text: 'The word does not need to be said for it to operate. People calculate. The skin condition, the story about where you were in August 1945, the aunt who moved the family south just before — these things travel faster than formal records in a small city. Some families will not consider marriage into yours. Some employers hesitate. Nobody says the word. The word is known.',
    choices: null,
    effect: (p) => { p.m -= 12; p.s -= 5; p.r += 8; p.setMem('japanHibakushaStigma', true); p.addFlag('hibakusha_stigma_lived'); },
  },

  {
    id: 'ca2_japan_hibakusha_hidden',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      (G.flags.includes('hibakusha') || G.flags.includes('hibakusha_family')) &&
      !G.mem?.japanHibakushaHidden,
    text: 'The omiai — the formal meeting to consider marriage — requires a family history. Your go-between has advised you on this. You can disclose and know what follows. Or you can say nothing and live with what follows from that. Your mother has already decided. Your father says it is your life. Neither of them says the word that the decision is about.',
    choices: [
      {
        text: 'Disclose — the other family should know',
        tag: null,
        outcome: 'The meeting does not proceed. There will be another meeting, in time, with a family who knows and does not retreat. That family exists. You will find them.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.setMem('japanHibakushaHidden', true); },
      },
      {
        text: 'Say nothing — the risk of the illness is not certainty, and you have the right to a life',
        tag: null,
        outcome: 'The marriage proceeds. You live with the decision you made, as with all decisions — carrying both the right of it and the cost of it simultaneously.',
        effect: (p) => { p.m -= 5; p.r += 10; p.setMem('japanHibakushaHidden', true); p.addFlag('hibakusha_stigma_lived'); },
      },
    ],
  },

  {
    id: 'ca2_japan_anpo_protests',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear === 1960 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.japanAnpo,
    text: 'The Diet building is surrounded. You are outside it with several hundred thousand other people — the largest protest in Japanese postwar history — opposed to the automatic renewal of the US-Japan security treaty, which passed inside the building at midnight while the opposition legislators were physically barred from the chamber. You are inside history being made clumsily. The treaty is now law. You are still outside the building.',
    choices: [
      {
        text: 'Stay in the street — the attempt matters even if the outcome is already decided',
        tag: null,
        outcome: 'A student is killed in the crush near the south gate. Her name is Michiko Kanba. You will remember it. The treaty stands. The movement does not disappear.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.e += 5; p.setMem('japanAnpo', true); p.addFlag('anpo_generation'); p.addFlag('political_active'); p.setPolitical('left'); },
      },
      {
        text: 'Leave before it turns — you came to make an argument, not a sacrifice',
        tag: null,
        outcome: 'You go home on the last train. The treaty is law by morning. You followed the argument carefully. Whether that is enough is not a question that resolves.',
        effect: (p) => { p.m -= 5; p.e += 4; p.r += 6; p.setMem('japanAnpo', true); p.addFlag('anpo_generation'); },
      },
    ],
  },

  {
    id: 'ca2_japan_minamata_village',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.currentYear <= 1970 &&
      !G.mem?.japanMinamata,
    text: 'The cats have been walking in circles before they fall. This has been true for two years. The fish in Minamata Bay sometimes behave strangely before you catch them. People in the village call it the dancing cat disease without knowing what it means. Then children are born with what cannot be named for a long time. Then you learn to name it: mercury, the Chisso plant, the discharge pipe running into the bay where your father has fished his whole life.',
    choices: [
      {
        text: 'Stay — this is your village and your family and your water',
        tag: null,
        outcome: 'You develop symptoms in your thirties. The company denies liability for eleven more years. The settlement, when it comes, covers a fraction of what was taken.',
        effect: (p) => { p.h -= 15; p.m -= 12; p.r += 8; p.setMem('japanMinamata', true); p.addFlag('minamata_disease'); p.addFlag('industrial_harm'); },
      },
      {
        text: 'Press your family to go to Kumamoto city — the bay is poisoned',
        tag: null,
        outcome: 'Leaving costs everything you know how to do in a place where you know how to do it. The city is unfamiliar. You are healthier than the cousins who stayed.',
        effect: (p) => { p.h -= 5; p.m -= 10; p.r += 10; p.setMem('japanMinamata', true); p.addFlag('minamata_disease'); },
      },
    ],
  },

  {
    id: 'ca2_japan_salaryman_transfer',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.career &&
      G.character.gender === 'male' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      !G.mem?.japanSalarymanTransfer,
    text: 'The transfer notice arrives in a manila envelope on a Tuesday. You are being reassigned to the Nagoya branch. Your manager delivers this as a positive development — a sign of trust, of investment. Your wife looks at the envelope for a moment before she says anything. You have been in this apartment for three years. The children\'s school is two minutes away. The company has decided this, and you work for the company.',
    choices: [
      {
        text: 'Accept the transfer — this is how the system works and you are part of it',
        tag: null,
        outcome: 'You go to Nagoya. Your family follows six months later when the school year ends. The apartment the company provides is adequate. The drinking hierarchy in the new office takes a year to learn.',
        effect: (p) => { p.m -= 6; p.w += 6; p.s += 3; p.setMem('japanSalarymanTransfer', true); p.addFlag('salaryman_life'); },
      },
      {
        text: 'Negotiate to stay — your family is settled here',
        tag: null,
        outcome: 'The negotiation goes three levels up. You stay, but you have signalled something. The next promotion does not arrive when you expected.',
        effect: (p) => { p.m += 3; p.w -= 4; p.r += 5; p.setMem('japanSalarymanTransfer', true); p.addFlag('salaryman_life'); },
      },
    ],
  },

  {
    id: 'ca2_japan_karoshi_pressure',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.flags.includes('salaryman_life') &&
      !G.mem?.japanKaroshi,
    text: 'It is 10:45pm. The office has fifteen people still in it. Your manager left at 6pm — he can do this because he is senior enough that his departure is not read as lack of dedication. You are not yet senior enough. The last train is at midnight. You have been doing this for eleven years. There is a word for the death that comes from this: *karoshi*. The country has a word for it because it happens enough to need one.',
    choices: [
      {
        text: 'Push through — this is what the work requires and you have always understood that',
        tag: null,
        outcome: 'You take the last train three nights a week for the next four years. Your health declines in the specific way that extended sleeplessness and chronic stress declines health. The work is done.',
        effect: (p) => { p.h -= 12; p.w += 6; p.r += 8; p.setMem('japanKaroshi', true); p.addFlag('karoshi_adjacent'); },
      },
      {
        text: 'Take medical leave — the doctor has been suggesting it for six months',
        tag: null,
        outcome: 'The leave is twelve weeks. You come back to the same desk. The company treats your return with careful politeness. Nothing is said. Something has changed.',
        effect: (p) => { p.h += 8; p.m += 5; p.w -= 4; p.setMem('japanKaroshi', true); },
      },
    ],
  },

  {
    id: 'ca2_japan_bubble_collapse',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1990 && G.currentYear <= 1993 &&
      G.money > 5000 &&
      !G.mem?.japanBubble,
    text: 'In 1988 your uncle told you to buy equities, and you did. In 1989 the Nikkei hit 38,957 and everyone you knew was talking about the day it would hit 50,000. It is now three years later. The Nikkei is at 16,000. The apartment you were considering buying in Setagaya would have required twenty-five years of salary. The man who sold it instead lost forty percent of his purchase price in eighteen months. You have lost less than that. Thirty years of stagnation have a name now: the Lost Decade. At the time it simply feels like the floor dropping.',
    choices: [
      {
        text: 'Hold what remains — the loss is real, you will rebuild slowly',
        tag: null,
        outcome: 'The rebuilding takes longer than you planned. Japan will not return to where it was, which you will understand fully only later. You are patient in a way the decade requires.',
        effect: (p) => { p.m -= 10; p.w -= 8; p.mo -= 3000; p.setMem('japanBubble', true); p.addFlag('lost_decade_generation'); },
      },
      {
        text: 'Liquidate now — take what remains before it falls further',
        tag: null,
        outcome: 'You sell at the bottom, which you do not know is the bottom until it is not. The money you hold is real money, which is not nothing when the banks are failing.',
        effect: (p) => { p.m -= 8; p.mo -= 1500; p.setMem('japanBubble', true); p.addFlag('lost_decade_generation'); },
      },
    ],
  },

  {
    id: 'ca2_japan_earthquake_preparedness',
    phase: 'childhood',
    weight: 2,
    cooldown: 8,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      !G.mem?.japanEarthquakeDrill,
    text: 'The drill is the same every year. The alarm sounds. You get under the desk. You wait. The teacher says a word and you file into the yard in a line. In the yard there is a chart showing which buildings are safe and which are not. You have memorised the evacuation route from your house. The bag by the door at home has water, a radio, a copy of your family register, and two days of food. Your mother checks it on the first of every month. This is not fear. This is ordinary preparedness in a country that sits on four tectonic plates.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 4; p.setMem('japanEarthquakeDrill', true); p.addFlag('earthquake_country'); },
  },

  {
    id: 'ca2_japan_lost_generation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1993 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.japanLostGen,
    text: 'The year you graduate, the companies announce they are not hiring. Not fewer: not hiring. The generation before yours entered sōgōshoku — management track, permanent employment, company housing, forty years of certainty. What you have is haken, dispatch work. No benefits. No seniority. No guarantee of next month. Calling it a gap between expectation and reality misses the specificity: the expectation was built into the society and then the floor was removed and you were standing on it.',
    choices: [
      {
        text: 'Take the irregular work and keep trying for permanent employment.',
        tag: null,
        outcome: 'The permanent position does not arrive in the years when it would have mattered most. The irregular work becomes the life, not the gap before the life.',
        effect: (p) => { p.m -= 8; p.w -= 6; p.r += 5; p.addFlag('lost_generation_japan'); p.addFlag('freeter_track'); p.setMem('japanLostGen', true); },
      },
      {
        text: 'Redirect. The track you were promised does not exist; build a different one.',
        tag: null,
        outcome: 'The redirection is harder than the original path would have been, and produces something that is yours in a way the original path would not have been. The trade is real.',
        effect: (p) => { p.m -= 5; p.e += 4; p.r += 3; p.addFlag('lost_generation_japan'); p.setMem('japanLostGen', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca2_japan_hikikomori',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 14 && G.age <= 20 &&
      !G.mem?.japanHikikomori,
    text: 'Your classmate stopped coming to school at the end of the second year. His mother says he is tired. The door to his room is closed when you visit — you can hear the television. The word for it is hikikomori: social withdrawal. The Ministry of Health will eventually count over a million people in rooms like his. The explanation is always partial: the pressure, the exam system, the gap between what is required and what a person can produce. The door stays closed.',
    choices: [
      {
        text: 'You knock on his door and talk through it — you keep trying.',
        tag: null,
        outcome: 'He does not answer for a long time. Then, once, he does. You do not know whether this is a beginning or an anomaly.',
        effect: (p) => { p.karma += 5; p.m -= 4; p.addFlag('hikikomori_adjacent'); p.setMem('japanHikikomori', true); },
      },
      {
        text: 'You do not push. The space he has made is the space he needs.',
        tag: null,
        outcome: 'You respect the boundary. You have always wondered whether there was a different word for respect in that situation and whether you chose the right one.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('hikikomori_adjacent'); p.setMem('japanHikikomori', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca2_japan_tohoku_2011',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear === 2011 &&
      G.age >= 10 &&
      !G.mem?.japanTohoku,
    text: 'March 11, 2:46 in the afternoon. The shaking goes on longer than any shaking should go on. Magnitude 9.0 — the strongest recorded in Japan. Forty minutes later the tsunami comes ashore. In Tōhoku the water is fifteen meters high in some places. In Ishinomaki, in Rikuzentakata, in Kesennuma. The wave takes everything to a line and leaves rubble on one side of the line. Twenty thousand dead, most by drowning, in under an hour. Then: Fukushima Daiichi, reactors one through three, the hydrogen explosions you watch on television.',
    choices: [
      {
        text: 'You were in Tōhoku, in the affected area.',
        tag: null,
        outcome: 'The rebuilding takes years. The specific things that were there before and are not there after — you know them by name.',
        effect: (p) => { p.m -= 15; p.h -= 8; p.r += 8; p.addFlag('tohoku_survivor'); p.addFlag('fukushima_generation'); p.setMem('japanTohoku', true); },
      },
      {
        text: 'You were elsewhere — you watched it arrive on every screen.',
        tag: null,
        outcome: 'The footage of the wave reaching the airport at Sendai: the cars moving ahead of it, then not moving. You watched it and understood something about the scale that the number 20,000 does not convey.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('fukushima_generation'); p.setMem('japanTohoku', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ca2_japan_nuclear_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2012 && G.currentYear <= 2016 &&
      G.flags.includes('fukushima_generation') &&
      G.age >= 18 &&
      !G.mem?.japanNuclearReckoning,
    text: 'Japan had fifty-four nuclear reactors before March 11. By May 2012 they have all been taken offline — the first time since 1970 the country has operated without nuclear power. The debate is not about technology. It is about who bears the risk, who was told the risk was acceptable, who made that decision, and what the distance is between those categories. Fukushima Daiichi is in Fukushima. The people who made the TEPCO decisions were not in Fukushima.',
    choices: [
      {
        text: 'Nuclear energy as a category has changed for you after Fukushima.',
        tag: null,
        outcome: 'The change is specific: not to fear but to the understanding that the risk is never distributed the same as the benefit.',
        effect: (p) => { p.e += 5; p.m -= 3; p.addFlag('anti_nuclear_generation'); p.setMem('japanNuclearReckoning', true); },
      },
      {
        text: 'The country needs energy and the alternatives have their own costs.',
        tag: null,
        outcome: 'You hold the engineering argument and the human cost in the same place. The tension between them is real and has no clean resolution.',
        effect: (p) => { p.e += 4; p.r += 3; p.setMem('japanNuclearReckoning', true); },
      },
    ],
    effect: null,
  },

]
