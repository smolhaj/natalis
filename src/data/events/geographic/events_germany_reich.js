// Germany, 1933–1949: the twelve years and what came after them.
//
// The corpus had 29 events whose guard names Germany, and exactly one touching
// the 1920s or 30s. It covers the Wirtschaftswunder, the Gastarbeiter, the DDR,
// the Stasi, reunification, the 2015 refugees and the NSU murders — the whole
// postwar arc — and a German child born in 1930 lived through the seizure of
// power at three, the Nuremberg Laws at five, Kristallnacht at eight, six years
// of war, the bombing of their own city and the occupation, and the life log
// showed them three newspaper headlines.
//
// That is the largest gap in the project, in the most documented period of its
// range, in a game whose stated mandate is education.
//
// Written from inside an ordinary German life, which is the only position that
// teaches anything. The uniform was fun. The camping was fun. That is the
// whole difficulty and the reason the arc is worth having: a regime does not
// recruit a ten-year-old with an argument. The events do not tell the player
// what to feel about any of it; they say what happened and let the choice sit.
//
// Per the design principle the follow-throughs come first: every flag set here
// is consumed by `GERMANY_REICH_FOLLOWTHROUGH` below or by a buildYearTexture
// path. The arc it is built around is the one German families spent two
// generations not having, and which arrived in 1968 as a question from a child
// to a parent: what did you do.

const IS_DE = (G) => G.currentCountry?.name === 'Germany' || G.character.country?.name === 'Germany'

// The Reich reached Austria in 1938 and the events below are written for
// Germany proper; Austria has its own module and its own reckoning.
const IN_REICH = (G) => IS_DE(G) && G.currentYear >= 1933 && G.currentYear <= 1945

export const GERMANY_REICH_EVENTS = [

  // ── 1933: the year it becomes ordinary ────────────────────────────────────

  {
    id: 'dereich_machtergreifung',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1933 && G.currentYear <= 1934 &&
      G.age >= 6 &&
      !G.mem?.deMacht,
    text: 'January, and then the months after it. There are torches in the street one night and the neighbours are at the windows, and some of them are cheering and some of them have the light off. By the spring the caretaker has a uniform. The man who ran the bookshop on the corner is not running it. At school a teacher is there on the Friday and not on the Monday and the class is told he has taken up another position. Nobody asks which one. The thing everybody notices, and nobody says, is how quickly it stops being remarkable.',
    choices: [
      { text: 'Your family is relieved. Somebody is finally in charge.', tag: 'yielding', outcome: 'The word they use at the table is order. For a few years the word keeps working.', effect: (p) => { p.m += 5; p.addFlag('de_reich_family_approved'); p.addFlag('de_reich_child') } },
      { text: 'Your family goes quiet', tag: null, outcome: 'The radio is turned down when certain things come on. You learn the volume knob before you learn what it is for.', effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('de_reich_family_quiet'); p.addFlag('de_reich_child'); p.addFlag('aut_taught_silence') } },
      { text: 'Somebody in the house says the wrong thing out loud', tag: 'defiant', outcome: 'It is said once, in the kitchen, and the person who says it is told never to say it again by someone who agrees with them.', effect: (p) => { p.m -= 8; p.karma += 5; p.r += 4; p.addFlag('de_reich_family_opposed'); p.addFlag('de_reich_child') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_jungvolk',
    phase: null,
    weight: 9,
    when: (G) =>
      IN_REICH(G) &&
      G.currentYear >= 1936 &&
      G.age >= 10 && G.age <= 14 &&
      !G.mem?.deJungvolk,
    text: (G) => {
      const girl = G.character.gender === 'female'
      return girl
        ? 'You are ten and it is no longer optional. The Jungmädel meet on Wednesdays: the white blouse, the black neckerchief, the songs, the marching in a way that is more like a game than like an army. There is a week under canvas in the summer and it is the best week of the year. Nobody at the campfire says anything about politics. You are being taught to be strong and healthy and to belong to something, and you do belong to it, and the belonging is the point and is not the reason.'
        : 'You are ten and it is no longer optional. The Jungvolk meet on Wednesdays: the brown shirt, the knife with the words on the blade, the terrain games in the woods, the hierarchy that gives an eleven-year-old somebody to give orders to. There is a week under canvas in the summer and it is the best week of the year. You are good at it. Being good at it feels exactly like being good at anything else, which is how it works.'
    },
    choices: [
      { text: 'You love it', tag: null, outcome: 'You are promoted within it, and for three years you are happier and more certain than you will be again for a long time.', effect: (p) => { p.m += 10; p.h += 5; p.s += 5; p.addFlag('de_hj_enthusiast'); p.addFlag('de_reich_child') } },
      { text: 'You go, and something in you stays outside it', tag: null, outcome: 'You sing the songs at the right volume. You are never once in trouble. You could not explain, then or later, what you were doing.', effect: (p) => { p.m += 2; p.e += 5; p.addFlag('de_hj_attended'); p.addFlag('de_reich_child'); p.addFlag('aut_taught_silence') } },
      { text: 'Your parents find a reason for you not to go', tag: 'defiant', outcome: 'It works for about a year. It costs your father something at work that he does not discuss.', effect: (p) => { p.m -= 6; p.karma += 8; p.addFlag('de_hj_avoided'); p.addFlag('de_reich_family_opposed'); p.addFlag('de_reich_child') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_classmate_gone',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1935 && G.currentYear <= 1939 &&
      G.age >= 7 && G.age <= 16 &&
      G.religion !== 'jewish' &&
      !G.mem?.deClassmate,
    text: 'There is a girl two desks over who has been two desks over since the first year. In the autumn she is not there. The teacher does not mark her absent; the register has been rewritten. Somebody says her family has gone to relatives. Somebody else says a word you have heard on the radio, in the voice the radio uses. You walk past the flat on the way home for a while and then you stop walking that way, and you could not say now whether you stopped on purpose.',
    choices: [
      { text: 'Ask where she went', tag: 'defiant', outcome: 'Your mother answers with her hand flat on the table, which is not an answer, and you never ask again. You remember the hand.', effect: (p) => { p.m -= 8; p.e += 5; p.karma += 4; p.addFlag('de_classmate_vanished'); p.addFlag('de_asked_once') } },
      { text: 'Say nothing and think about it at night', tag: null, outcome: 'You are nine. The not-asking is not a decision. It is what there was.', effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('de_classmate_vanished'); p.addFlag('aut_taught_silence') } },
      { text: 'Repeat what the radio says about her', tag: 'yielding', outcome: 'The other children agree with you. It is the first time you have felt the particular warmth of being on the right side of a room.', effect: (p) => { p.m += 3; p.karma -= 10; p.r += 10; p.addFlag('de_classmate_vanished'); p.addFlag('de_said_it_too') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_kristallnacht',
    phase: null,
    weight: 10,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear === 1938 &&
      G.age >= 6 &&
      G.religion !== 'jewish' &&
      !G.mem?.deKristall,
    text: 'November, and in the morning the street is glass. It is on the pavement and in the gutter and it goes a long way, further than you would think one window could go. The synagogue is burning and the fire engine is there and it is wetting the buildings on either side. Men you do not recognise are carrying things out of a shop, and men you do recognise are watching them do it with their hands behind their backs. Somebody sweeps their own frontage before opening, because the glass is in the way.',
    choices: [
      { text: 'Your family shuts the curtains', tag: null, outcome: 'Nobody in the house eats much that evening. The word used at the table is shameful, and it is used once, quietly, and then the subject is closed for seven years.', effect: (p) => { p.m -= 12; p.e += 5; p.addFlag('de_kristallnacht_witness'); p.addFlag('de_reich_family_quiet') } },
      { text: 'Somebody in your family helps a neighbour', tag: 'defiant', outcome: 'It is a door left unlocked and a bag kept in a cupboard. It is not heroism and it is not nothing, and you are told to forget you saw it, and you do not.', effect: (p) => { p.m -= 8; p.karma += 14; p.addFlag('de_kristallnacht_witness'); p.addFlag('de_small_decency'); p.addFlag('de_reich_family_opposed') } },
      { text: 'You are told it was provoked, and you believe it', tag: 'yielding', outcome: 'It holds for six years. It stops holding all at once, in a cinema in 1945, in front of a screen.', effect: (p) => { p.m += 2; p.karma -= 8; p.r += 12; p.addFlag('de_kristallnacht_witness'); p.addFlag('de_believed_it') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_blockwart',
    phase: null,
    weight: 8,
    when: (G) =>
      IN_REICH(G) &&
      G.currentYear >= 1935 &&
      G.age >= 14 &&
      !G.mem?.deBlockwart,
    text: 'The block warden is a man from the second floor who was, before this, a man from the second floor. He knows who subscribes to what, who did not hang the flag out, who came home late and how late. He is not secret police and this is the thing people outside Germany will never quite get: most of what the state knows about you, it knows because a neighbour told it, and the neighbour was not paid and was not threatened. He asks after your mother in the stairwell and it is a pleasant exchange and you both understand exactly what it is.',
    choices: [
      { text: 'Be scrupulously correct with him', tag: 'yielding', outcome: 'The flag goes out on the right days. The greeting is given first, every time. It works, which is its own kind of education.', effect: (p) => { p.m -= 5; p.s += 3; p.addFlag('de_denunciation_climate'); p.addFlag('aut_taught_silence') } },
      { text: 'Give him nothing', tag: 'defiant', outcome: 'There is a summons to an office that comes to nothing, and a second one that is harder to explain away, and your mother does not speak to you for a week.', effect: (p) => { p.m -= 10; p.karma += 8; p.addFlag('de_denunciation_climate'); p.addFlag('de_marked_unreliable') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_volksempfaenger',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1939 && G.currentYear <= 1945 &&
      G.age >= 12 &&
      !G.mem?.deRadio,
    text: 'The set in the corner is cheap on purpose: it was built to reach the capital and not much further. Tuning past the end of the dial is a criminal offence and by 1943 a capital one, and the penalty is printed on a card that came with the radio, which is a detail nobody who was not there tends to believe. What the foreign station says about the eastern front does not match what this one says, and the difference is measured in cities.',
    choices: [
      { text: 'Somebody in the house listens anyway, under a blanket', tag: 'defiant', outcome: 'Twice a week, very low, with a child posted at the door. You learn what is actually happening about four months before your neighbours do.', effect: (p) => { p.e += 10; p.m -= 6; p.karma += 6; p.addFlag('de_listened_abroad'); p.addFlag('de_reich_family_opposed') } },
      { text: 'Nobody in the house is that stupid', tag: 'yielding', outcome: 'You believe the communiqués for longer than you will later admit to having believed them.', effect: (p) => { p.m += 3; p.e -= 3; p.r += 8; p.addFlag('de_believed_it') } },
    ],
    effect: null,
  },

  // ── The war as it arrives at the house ────────────────────────────────────

  {
    id: 'dereich_called_up',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1939 && G.currentYear <= 1944 &&
      G.age >= 5 &&
      !G.mem?.deCalledUp,
    text: 'The paper comes and then he is at the station in a uniform that does not fit him yet, and there is a photograph taken that afternoon that will be on a shelf for sixty years. The letters come from a place the censor will not let him name, and then from a place further east than the last one, and the handwriting gets smaller because paper is short. Then there is a gap in the letters, and then a letter that is not from him.',
    choices: [
      { text: 'He comes back', tag: null, outcome: 'In 1949, from a camp near Stalingrad, weighing what he weighs. He does not talk about it and he does not sleep much, and the man in the photograph on the shelf is somebody else.', effect: (p) => { p.m -= 10; p.addFlag('de_father_returned_late'); p.addFlag('de_war_family') } },
      { text: 'He does not', tag: null, outcome: 'Missing, in the east. There is no grave and no date and for eleven years your mother will not wear black, because wearing black would be agreeing to something.', effect: (p) => { p.m -= 20; p.r += 10; p.addFlag('de_father_lost_east'); p.addFlag('de_war_family'); p.addFlag('lost_parent_young') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_cellar',
    phase: null,
    weight: 10,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1942 && G.currentYear <= 1945 &&
      G.age >= 4 &&
      G.ruralUrban !== 'rural' &&
      !G.mem?.deCellar,
    text: 'The siren has a shape to it that you will be able to reproduce with your mouth for the rest of your life. The cellar has a bench, a bucket, a case by the door packed since 1942, and the particular smell of coal dust and other people. The building takes it or it does not. When you come up, the street is either the street or it is a new geography with the same street name, and you learn to read which from the quality of the light before you get to the top of the stairs.',
    choices: [
      { text: 'Your building stands', tag: null, outcome: 'Yours stands. The one opposite does not, and you knew the family in it by sight, and you find you cannot remember the children\'s names now and that this bothers you more than it should.', effect: (p) => { p.m -= 14; p.h -= 5; p.addFlag('de_bombing_survivor'); p.addFlag('de_war_family') } },
      { text: 'It does not', tag: null, outcome: 'You are dug out. You are on the pavement wrapped in somebody else\'s coat while it is still burning, and everything the family owned is in the handcart by morning.', effect: (p) => { p.m -= 22; p.h -= 14; p.wipeMoney(0.85); p.addFlag('de_bombed_out'); p.addFlag('de_bombing_survivor'); p.addFlag('lost_home'); p.addFlag('de_war_family') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_klv',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1941 && G.currentYear <= 1945 &&
      G.age >= 7 && G.age <= 15 &&
      G.ruralUrban !== 'rural' &&
      !G.mem?.deKlv,
    text: 'The school is evacuated as a school. You go by train to a village in the mountains with a label on your coat, to a guesthouse requisitioned for the purpose, and it is run by the youth organisation rather than by teachers, which changes what the day is for. The air is good. The food is better than at home. You are there for fourteen months and you write letters that are read before they are sent, and the letters you get back have been read too.',
    choices: [
      { text: 'It is the best year of the war for you', tag: null, outcome: 'You are ashamed of that sentence later and it is still true. There was a lake.', effect: (p) => { p.m += 6; p.h += 6; p.r += 6; p.addFlag('de_klv_evacuated') } },
      { text: 'You are homesick the whole fourteen months', tag: null, outcome: 'You go home to a city you cannot navigate, because the landmarks you navigated by are not there.', effect: (p) => { p.m -= 10; p.addFlag('de_klv_evacuated'); p.addFlag('de_bombing_survivor') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_flakhelfer',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1943 && G.currentYear <= 1945 &&
      G.age >= 15 && G.age <= 18 &&
      !G.mem?.deFlak,
    text: (G) => G.character.gender === 'female'
      ? 'By 1944 there is no category of person who is not being used. You are on a searchlight battery, or on the switchboard, or in a factory that was a factory for something else last year, and the men who used to do it are in the east. You are seventeen and you are doing a job that has a rank attached to it, and school has become two mornings a week and then no mornings a week.'
      : 'You are fifteen and the school is moved to the battery. Half the day is lessons on a bench and half the day is on the gun, and a boy in your class is killed in March by something that fell on the position, and there is a small ceremony. By January the training is with a Panzerfaust in a park, taught by a sergeant with one arm, and the bridge you are told to hold is a bridge you used to fish off.',
    choices: [
      { text: 'You do what you are told and you survive it', tag: null, outcome: 'You are seventeen when it stops. You have been at war for two years and you have never had a job.', effect: (p) => { p.m -= 14; p.h -= 8; p.e -= 4; p.addFlag('de_child_soldier_reich'); p.addFlag('de_war_family') } },
      { text: 'You throw the weapon in a ditch and walk home', tag: 'defiant', outcome: 'Men were hanged from lampposts that month for exactly this, with a sign, and you walk the whole way at night through fields and you get there.', effect: (p) => { p.m -= 10; p.karma += 10; p.h -= 6; p.addFlag('de_child_soldier_reich'); p.addFlag('de_walked_away') } },
    ],
    effect: null,
  },

  // ── 1945 and the years with no name ───────────────────────────────────────

  {
    id: 'dereich_arrival_1945',
    phase: null,
    weight: 10,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1945 && G.currentYear <= 1946 &&
      G.age >= 6 &&
      !G.mem?.deArrival,
    text: 'They come up the road and everything that was true on Monday is not true on Wednesday. The flag comes off the building and out of the drawer and out of the armband, and goes into the stove, and the whole street smells of burning cloth for an afternoon. Somebody in the building has a photograph they are burning and somebody else has a photograph they are digging up. A man on the corner who was somebody is nobody by Friday, and a man who was nobody has a white armband and a list.',
    choices: [
      { text: 'Relief, and you are not allowed to say so', tag: null, outcome: 'It is over. You find you cannot say the word over to anyone, because saying it would mean you had wanted it to be.', effect: (p) => { p.m += 4; p.e += 6; p.addFlag('de_zero_hour'); p.addFlag('de_relief_unspeakable') } },
      { text: 'The world ends', tag: null, outcome: 'Everything you were taught was true, was said in the same tone, by the same people, and none of it was, and you are seventeen and have no instrument left for telling.', effect: (p) => { p.m -= 16; p.e += 8; p.r += 10; p.addFlag('de_zero_hour'); p.addFlag('de_belief_collapsed') } },
      { text: 'Fear, and you have reasons', tag: null, outcome: 'What happens in your town in those weeks is not written down anywhere for fifty years, and you are in it.', effect: (p) => { p.m -= 20; p.h -= 10; p.addFlag('de_zero_hour'); p.addFlag('de_1945_violence') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_hunger_winter',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1948 &&
      G.age >= 5 &&
      !G.mem?.deHunger,
    text: 'The ration is on paper and the paper is not food. The winter of forty-six is the coldest anyone can remember and there is no coal, so the furniture goes, and then the banisters, and then people go out to the woods at night with a saw. The verb is hamstern: you take the good tablecloth and the wedding silver out to a farm on a train roof and you come back with potatoes, and the farmer has three sets of good silver already and does not need a fourth, and you find this out at the door.',
    choices: [
      { text: 'Your mother trades everything the family had', tag: null, outcome: 'The rings, the clock, the coat. Everything in the house that meant the family had once been something becomes four weeks of eating.', effect: (p) => { p.m -= 12; p.h -= 10; p.wipeMoney(0.6); p.addFlag('de_hunger_winter'); p.addFlag('food_insecurity') } },
      { text: 'You steal coal off the wagons', tag: 'defiant', outcome: 'Every child in the street does it and the railway police chase you without much conviction, and once a driver slows down on the curve on purpose.', effect: (p) => { p.m -= 6; p.h -= 6; p.e += 4; p.addFlag('de_hunger_winter'); p.addFlag('de_coal_child'); p.addFlag('food_insecurity') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_truemmerfrauen',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1945 && G.currentYear <= 1950 &&
      G.character.gender === 'female' &&
      G.age >= 16 && G.age <= 55 &&
      G.ruralUrban !== 'rural' &&
      !G.mem?.deTrummer,
    text: 'The city has to be moved by hand because there is nothing else to move it with, and the men are dead or in camps or not back yet. You are in a line passing bricks, and the work is to knock the old mortar off each one with a hammer so it can be used again, and a good day is a few hundred bricks. There is a rate per thousand and a ration card that is better than the ordinary one, which is the actual reason most people are there. Later there will be a statue of you.',
    choices: [
      { text: 'You do it for two years', tag: null, outcome: 'Your hands are a different shape afterwards, permanently. When the statue goes up in the seventies you have opinions about it that you keep to yourself.', effect: (p) => { p.m -= 6; p.h -= 8; p.w += 4; p.mo += 300; p.addFlag('de_truemmerfrau'); p.addFlag('de_rebuilt_it') } },
      { text: 'You find something else', tag: null, outcome: 'Office work for the occupation, which pays in cigarettes, which is the only currency that holds its value until 1948.', effect: (p) => { p.mo += 700; p.s += 5; p.addFlag('de_occupation_work') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_fragebogen',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1951 &&
      G.age >= 20 &&
      !G.mem?.deFragebogen,
    text: 'The questionnaire has a hundred and thirty-one questions and you need the cleared copy of it to get a ration card, a job, a licence, a flat. Question by question it asks what you were a member of and when you joined and whether you held rank. Everyone needs two witnesses to say they were harmless. Everyone is somebody else\'s two witnesses. The certificate is nicknamed after a laundry detergent, which is the most honest thing anybody says about the whole process.',
    choices: [
      { text: 'You answer it accurately', tag: 'defiant', outcome: 'It costs you eighteen months and a career, and there is a category on the form you are put in that follows the file around.', effect: (p) => { p.mo -= 600; p.karma += 12; p.m -= 8; p.addFlag('de_denazified_honestly'); p.addFlag('de_reckoning_begun') } },
      { text: 'You answer it the way everyone answers it', tag: 'yielding', outcome: 'Two neighbours sign for you and you sign for two neighbours and by 1950 the whole thing is quietly wound up.', effect: (p) => { p.m += 3; p.karma -= 6; p.r += 10; p.addFlag('de_persilschein'); p.addFlag('de_reckoning_deferred') } },
      { text: 'There is genuinely nothing on your form', tag: null, outcome: 'You were nine in 1938. The form still takes four months, and you still need the two witnesses.', effect: (p) => { p.e += 4; p.addFlag('de_reckoning_begun') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_vertriebene',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_DE(G) &&
      G.currentYear >= 1945 && G.currentYear <= 1950 &&
      G.age >= 4 &&
      !G.mem?.deVertriebene,
    text: 'Twelve million people come west in three years, from Silesia and East Prussia and the Sudetenland, with what they could carry. If your family is among them, home is a farm with a name you will say for the rest of your life that is on no map you can buy. If your family is not, there are four strangers billeted in your flat by order, and they speak German with an accent that makes your neighbours call them foreigners to their faces, in Germany, in 1947.',
    choices: [
      { text: 'You are the ones who arrived', tag: null, outcome: 'You are called Pollack in a schoolyard in Bavaria by children whose parents also lost everything. It takes twenty years to stop being the new family.', effect: (p) => { p.m -= 14; p.mo -= 400; p.addFlag('de_vertriebene'); p.addFlag('displaced'); p.addFlag('lost_home') } },
      { text: 'You are the ones with the spare room', tag: null, outcome: 'Your mother is civil to them for four years and never once warm, and you are old enough to notice the difference and not old enough to say anything.', effect: (p) => { p.m -= 4; p.karma -= 4; p.e += 5; p.addFlag('de_billeted_strangers') } },
    ],
    effect: null,
  },
]

// ─── Follow-through ───────────────────────────────────────────────────────────
//
// The point of the arc. Everything above is a thing that happened to a child;
// everything here is what the child does with it at forty, at sixty, at eighty.
// The German reckoning is not an event, it is a fifty-year argument conducted
// mostly inside families, and it arrives from the generation that was not there.

export const GERMANY_REICH_FOLLOWTHROUGH = [

  {
    id: 'dereich_ft_1968_question',
    phase: null,
    weight: 8,
    when: (G) =>
      G.flags.has('de_reich_child') &&
      G.currentYear >= 1966 && G.currentYear <= 1980 &&
      G.age >= 36 &&
      !G.mem?.deFt68,
    text: 'Your child is nineteen and has been reading, and asks you at the table, in front of everybody, what you did. Not what happened — what you did. It is the first time anybody has asked you directly in thirty years and the question is not being asked kindly, and the unkindness is the point: they have worked out that the whole country has been waiting for everyone who was there to die.',
    choices: [
      { text: 'Tell them', tag: 'defiant', outcome: 'It takes four hours and you are not forgiven at the end of it, and something in the house is different afterwards in a way that is better.', effect: (p) => { p.m -= 8; p.karma += 14; p.e += 6; p.addFlag('de_told_the_children'); p.addFlag('de_reckoning_begun') } },
      { text: 'Tell them you were a child, which is true', tag: null, outcome: 'It is true and it is not an answer and you both know it, and they stop asking, and you find you wanted to be asked again.', effect: (p) => { p.m -= 10; p.r += 12; p.addFlag('de_deflected_the_children') } },
      { text: 'Tell them they have no idea what it was like', tag: 'yielding', outcome: 'You are right about that. They leave the table. The conversation does not resume for eleven years.', effect: (p) => { p.m -= 14; p.karma -= 6; p.r += 16; p.addFlag('de_refused_the_children'); p.addFlag('estranged_child') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_ft_photograph',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      G.flags.has('de_reich_child') &&
      G.age >= 60 &&
      !G.mem?.deFtPhoto,
    text: 'Somebody is clearing the house and there is a box, and in the box there is a photograph of a man in a uniform and the man is your father or your uncle or the neighbour who was always kind to you. The back has a place-name on it in pencil. Everybody in the room looks at it and then looks at you, because you are the only one left who can say anything about it, and what you can say is that he was kind to you, which is the truth and is not the whole of it.',
    choices: [
      { text: 'Say what you know', tag: 'defiant', outcome: 'You say the place-name out loud and what happened there, and the room goes quiet, and the photograph goes back in the box and stays in the house.', effect: (p) => { p.m -= 6; p.karma += 10; p.addFlag('de_named_it'); p.addFlag('memory_keeper') } },
      { text: 'Say he was kind to you', tag: null, outcome: 'Which is true. You are eighty-one and you will not be asked again and you know that while you are saying it.', effect: (p) => { p.m -= 4; p.r += 12; p.addFlag('de_left_it_in_the_box') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_ft_last_one',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      G.flags.has('de_reich_child') &&
      G.age >= 72 &&
      G.currentYear >= 2000 &&
      !G.mem?.deFtLast,
    text: 'A class comes to the community centre with a teacher and a list of questions, and you are the resource. They are polite and well-prepared and about fourteen, which is the age you were, and they want to know what it felt like, and the honest answer — that for several years it felt like belonging to something and that the camping was good — is the one answer you have never once given to a room. You are the last one in the district. There is nobody to check what you say against.',
    choices: [
      { text: 'Give the honest answer', tag: 'defiant', outcome: 'The teacher\'s face changes. One of the children asks a follow-up question that nobody has ever asked you, and you think about it for the rest of the year.', effect: (p) => { p.m += 4; p.karma += 14; p.e += 6; p.addFlag('de_told_it_straight'); p.addFlag('memory_keeper') } },
      { text: 'Give the answer they came for', tag: 'yielding', outcome: 'It is a good answer. You have given it before. Nothing in the room is changed by it, including you.', effect: (p) => { p.m -= 4; p.r += 8; p.addFlag('de_gave_the_speech') } },
    ],
    effect: null,
  },

  {
    id: 'dereich_ft_father_never_found',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('de_father_lost_east') &&
      G.age >= 40 &&
      !G.mem?.deFtFather,
    text: 'The Red Cross tracing service writes back, decades on, with a card. The card says the date is unknown and the place is unknown and the case is closed. Your mother is dead. You realise you have been waiting for this card since you were eleven, and that the waiting had a shape and a schedule, and that now there is a gap where it was.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 8
      p.addFlag('de_no_grave')
      p.setMem('deFtFather', true)
    },
  },

  {
    id: 'dereich_ft_wirtschaftswunder_silence',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('de_reich_child') &&
      G.currentYear >= 1955 && G.currentYear <= 1970 &&
      G.age >= 25 &&
      !G.mem?.deFtWunder,
    text: 'There is a new kitchen and a small car and a fortnight in Italy, and the speed of it is not believable to anybody who was in the cellar. The deal, which is never stated anywhere and which everybody has signed, is that the work is the subject and the other thing is not. You are thirty-one and you have a refrigerator and you have never once said out loud what you saw in November 1938.',
    choices: null,
    effect: (p) => {
      p.m += 6; p.w += 6; p.r += 8
      p.addFlag('de_wunder_bargain')
      p.setMem('deFtWunder', true)
    },
  },
]
