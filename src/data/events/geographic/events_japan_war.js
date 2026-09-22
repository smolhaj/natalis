// Japan 1937–1952, from inside an ordinary Japanese life.
//
// The corpus had twenty-nine Japanese-guarded events and the earliest of them
// began in 1945. It carried the occupation, the miracle, the salaryman, the
// Anpo protests, the bubble, the lost decade, Fukushima — the whole postwar
// arc — and nothing at all for the fourteen years that made the postwar arc
// necessary. A character born in Tokyo in 1935 lived 1941 to 1945 there and
// received two newspaper headlines.
//
// These are the home front, which is where almost everybody was: the school
// that was renamed, the neighbourhood association that handed out the rice and
// watched who came and went, the temple bell that was taken for its bronze,
// the classroom evacuated to a country temple, the night of 9 March, the
// broadcast on 15 August that half the country could not immediately parse
// because nobody had heard that voice before and it was speaking a Japanese
// almost nobody used.
//
// Written from inside, without the ending in hand. A child in 1941 was
// delighted by the war, because children were given every reason to be, and
// the arc is not worth having if it pretends otherwise. What it owes the
// player is the rest of the sentence — 1945, and then the questions that
// arrive in 1955 and 1982 and 2005 from people who were not there.

const IS_JP = (G) => G.currentCountry?.name === 'Japan' || G.character.country?.name === 'Japan'
const IN_OCC = (G) => IS_JP(G) && G.currentYear >= 1945 && G.currentYear <= 1952
const CITY = (G) => G.place?.type === 'urban' || G.ruralUrban !== 'rural'

export const JAPAN_WAR_EVENTS = [

  // ── 1937–41 · the war that was called an incident ──────────────────────────

  {
    id: 'jpw_china_incident',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1937 && G.currentYear <= 1941 && G.age >= 5 && G.age <= 30 && !G.mem.jpwIncident,
    text: 'The word for it is incident. Not war — incident. The son of the house at the corner goes, and the street turns out with a flag and a thousand-stitch belt his mother has been carrying around the market for a week, asking strangers to put in one stitch each. Everyone cheers. It is a good day out. He is nineteen and embarrassed by the fuss.',
    choices: null,
    effect: (p) => { p.setMem('jpwIncident', true); p.addFlag('jp_war_home_front'); p.m -= 1 },
  },

  {
    id: 'jpw_kokumin_gakko',
    phase: null,
    weight: 30,
    when: (G) => IS_JP(G) && G.currentYear >= 1941 && G.currentYear <= 1945 && G.age >= 6 && G.age <= 13 && !G.mem.jpwSchool,
    text: 'The school has a new name this year. It is a national school now, and you are a little citizen of the empire, which is a phrase the teacher uses without smiling. Every morning: the bow towards the palace, the rescript read out in language nobody your age understands, the standing still. You are good at standing still. It is the thing you are most often praised for.',
    choices: [
      { text: 'You believe every word of it', tag: 'yielding', outcome: 'You do. There is nothing else on offer and it is put beautifully. You will remember the exact cadence of it for sixty years, which is longer than you will remember most things you chose to learn.', effect: (p) => { p.addFlag('jp_believed_it'); p.m += 3; p.e += 1 } },
      { text: 'You are mostly thinking about lunch', tag: null, outcome: 'You are eight. The rescript is long and the room is cold and somewhere behind your ribs is the question of what is in the lunchbox. This is also a way of being present at a historical moment.', effect: (p) => { p.m += 1 } },
    ],
    effect: (p) => { p.setMem('jpwSchool', true); p.addFlag('jp_kokumin_gakko') },
  },

  {
    id: 'jpw_tonarigumi',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1940 && G.currentYear <= 1945 && G.age >= 7 && !G.mem.jpwTonarigumi,
    text: 'Ten households, one neighbourhood association. It distributes the rice and the charcoal and the matches, which means nobody can afford to fall out with it. It also runs the fire drill: a bucket chain, and a line of women in monpe trousers practising with bamboo spears against a straw figure, in case of what is coming. Your mother is good at the bucket chain and silent about the spear.',
    choices: null,
    effect: (p) => { p.setMem('jpwTonarigumi', true); p.addFlag('jp_tonarigumi'); p.m -= 2 },
  },

  {
    id: 'jpw_luxury_is_the_enemy',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.currentYear >= 1940 && G.currentYear <= 1944 && G.age >= 10 && CITY(G) && !G.mem.jpwLuxury,
    text: 'The signboards on the Ginza say luxury is the enemy. Somebody has gone along in the night adding one character to a few of them so that they read: luxury is wonderful. It is repainted within a day. Your aunt stops having her hair permed and starts wearing the trousers, and the thing she says about it — that it is a relief not to have to decide — is either true or the only thing that can be said.',
    choices: null,
    effect: (p) => { p.setMem('jpwLuxury', true); p.addFlag('jp_austerity_years'); p.m -= 2 },
  },

  {
    id: 'jpw_pearl_harbour_morning',
    phase: null,
    weight: 40,
    when: (G) => IS_JP(G) && G.currentYear >= 1941 && G.currentYear <= 1942 && G.age >= 6 && !G.mem.jpwDec8,
    text: 'The eighth of December. The radio plays the march first and then says it, and the street is bright and cold and everybody is outside talking to everybody. The relief is the strange part. Four years of an incident nobody could explain, and now there is a war with a name and an enemy you have heard of, and for one day the whole country feels like it has stopped holding its breath.',
    choices: null,
    effect: (p) => { p.setMem('jpwDec8', true); p.addFlag('jp_dec8'); p.m += 4 },
  },

  // ── 1942–44 · scarcity, metal, and children sent away ──────────────────────

  {
    id: 'jpw_rations',
    phase: null,
    weight: 7,
    when: (G) => IS_JP(G) && G.currentYear >= 1941 && G.currentYear <= 1946 && G.age >= 5 && !G.mem.jpwRations,
    text: 'The rice ration goes down, and then the rice in the rice ration goes down. Barley first, which is fine. Then sweet potato, and then the vine of the sweet potato, and then things that are being called food by people who are doing their best. The queue forms before the shop opens because the queue is the only part of it anyone can control.',
    choices: null,
    effect: (p) => { p.setMem('jpwRations', true); p.addFlag('jp_hunger_years'); p.h -= 4; p.m -= 4 },
  },

  {
    id: 'jpw_metal_collection',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1942 && G.currentYear <= 1945 && G.age >= 7 && !G.mem.jpwMetal,
    text: 'They take the temple bell. Four men and a cart and a rope, and the priest standing to one side with his hands folded, and then the empty beam where it hung, which is somehow louder than the bell was. After that the railings go, and the door handles, and one of the two good pots. Your grandmother gives the pot up without being asked and does not speak for the rest of the afternoon.',
    choices: null,
    effect: (p) => { p.setMem('jpwMetal', true); p.addFlag('jp_metal_collection'); p.m -= 4 },
  },

  {
    id: 'jpw_kinrou_doin',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1943 && G.currentYear <= 1945 && G.age >= 12 && G.age <= 19 && !G.mem.jpwDoin,
    text: 'School stops and the factory starts. You are thirteen and you are making a part whose purpose nobody explains, eight hundred of them a day, and after a fortnight your hands know it better than your head does. The girl beside you can do a thousand. She is not stronger than you. She has simply stopped thinking about it, which is a skill, and you are learning it from her.',
    choices: [
      { text: 'You are proud of the count', tag: 'yielding', outcome: 'You are. It is the first thing you have ever been measurably good at, and the fact that nobody will tell you what it is for does not touch that at all.', effect: (p) => { p.addFlag('jp_factory_child'); p.e += 2; p.m += 2 } },
      { text: 'You work out what it is for', tag: 'defiant', outcome: 'You do, roughly, from the shape of it. You do not say so. You go on making eight hundred a day and now there is a second thing happening inside you while you do it.', effect: (p) => { p.addFlag('jp_factory_child'); p.addFlag('jp_saw_through_it'); p.e += 3; p.m -= 4 } },
    ],
    effect: (p) => { p.setMem('jpwDoin', true); p.h -= 3 },
  },

  {
    id: 'jpw_sokai',
    phase: null,
    weight: 40,
    when: (G) => IS_JP(G) && G.currentYear >= 1944 && G.currentYear <= 1945 && G.age >= 6 && G.age <= 13 && CITY(G) && !G.mem.jpwSokai,
    text: 'The third-years and above are being evacuated, by school, to the country. You go with your class and your teacher and one cloth bundle to a temple three prefectures away, and your mother is on the platform and does not cry, because there is an agreed way to do this and she does it. The temple is cold. The local children have a word for you. You are hungry in a way you had not previously known was a separate thing from wanting food.',
    choices: [
      { text: 'Write home that everything is fine', tag: 'yielding', outcome: 'You write it. The teacher reads the letters before they go, so it is the only thing you could write, but you would have written it anyway, which is the part you think about later.', effect: (p) => { p.addFlag('jp_sokai_child'); p.m -= 6; p.karma += 3 } },
      { text: 'Steal food from the temple kitchen', tag: 'defiant', outcome: 'You do it twice and are caught the second time and beaten in front of the class, and the boy who told on you is caught himself a week later. Nobody in that room ever mentions any of it again.', effect: (p) => { p.addFlag('jp_sokai_child'); p.addFlag('jp_sokai_hunger'); p.m -= 9; p.h -= 3 } },
    ],
    effect: (p) => { p.setMem('jpwSokai', true) },
  },

  // ── 1945 · the year ────────────────────────────────────────────────────────

  {
    id: 'jpw_march_ten',
    phase: null,
    weight: 60,
    when: (G) => IS_JP(G) && G.currentYear === 1945 && CITY(G) && !G.mem.jpwMarch10,
    text: 'It starts a little after midnight and the wind is already high. The bucket chains are for a different kind of fire. What comes is not that: it is the whole of the low city going up at once, and the wind the fire makes itself, and people running towards the river because the river is water and that is the last piece of reasoning anybody does that night. In the morning the sky over the east is brown and the trams are running on the other side of the city as though it were a Tuesday.',
    choices: [
      { text: 'Go and look', tag: 'defiant', outcome: 'You go. You are told afterwards that you should not have, and everyone who says so has also been. There is nothing to describe: that is the thing you will find yourself explaining, badly, for the rest of your life.', effect: (p) => { p.addFlag('jp_saw_the_burned_city'); p.m -= 16; p.r += 6 } },
      { text: 'Do not go and look', tag: 'yielding', outcome: 'You stay where you are. It reaches you anyway, in the smell that is in the clothes of everyone arriving from the east, which does not wash out for weeks.', effect: (p) => { p.m -= 11 } },
    ],
    effect: (p) => { p.setMem('jpwMarch10', true); p.addFlag('jp_firebombing'); p.h -= 5 },
  },

  {
    id: 'jpw_lost_the_house',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1945 && G.currentYear <= 1946 && G.flags.includes('jp_firebombing') && !G.mem.jpwBurnedOut,
    text: 'Where the house was, there is the shape of where the house was: the stones of the step, the well, and the safe, which is scorched and shut and full of documents that are now about nothing. Your mother walks the outline of the rooms in the right order, kitchen then back room then the room with the alcove, and then stops, because there is nowhere further to walk.',
    choices: null,
    effect: (p) => { p.setMem('jpwBurnedOut', true); p.addFlag('jp_burned_out'); p.wipeMoney(0.85); p.m -= 14 },
  },

  {
    id: 'jpw_gyokuon_hoso',
    phase: null,
    // Effectively everyone in the country was at a radio at noon on the
    // fifteenth of August, so this uses the corpus convention for a beat that
    // must land rather than competing on weight against eight thousand events.
    weight: 999,
    when: (G) => IS_JP(G) && G.currentYear >= 1945 && G.currentYear <= 1946 && G.age >= 5 && !G.mem.jpwAug15,
    text: 'Noon on the fifteenth of August, and everybody who can get to a radio is at one. Nobody has heard the voice before. It is high and formal and it is speaking a court Japanese that the adults are only half following, and the sentence everybody eventually works out is that the situation has developed not necessarily to our advantage. The cicadas are extremely loud. Somebody in the back of the room begins to cry and it is not clear, for a moment, in which direction.',
    choices: [
      { text: 'Feel relief before anything else', tag: null, outcome: 'You do, and you are ashamed of it within the hour, and forty years later you will meet someone who admits the same thing and you will both be enormously relieved again.', effect: (p) => { p.addFlag('jp_surrender_relief'); p.m -= 4 } },
      { text: 'Feel that everything you were told was a lie', tag: 'defiant', outcome: 'Not all at once. It arrives over about a week, item by item, and what you are left with at the end of that week is not anger so much as a very large empty room.', effect: (p) => { p.addFlag('jp_saw_through_it'); p.m -= 10; p.e += 3 } },
      { text: 'Feel nothing you can name', tag: null, outcome: 'You go out into the afternoon. The light is the same light. It is the strangest thing about it and the thing you will mention first, every time you are asked, which is not often.', effect: (p) => { p.m -= 6 } },
    ],
    effect: (p) => { p.setMem('jpwAug15', true); p.addFlag('jp_heard_the_broadcast') },
  },

  // ── 1945–52 · occupation ───────────────────────────────────────────────────

  {
    id: 'jpw_first_americans',
    phase: null,
    weight: 7,
    when: (G) => IN_OCC(G) && G.currentYear <= 1947 && G.age >= 5 && !G.mem.jpwGIs,
    text: 'You had been told, specifically and often, what they would do when they came. What they do is drive past very slowly in a jeep, enormous and bored, and throw chewing gum. The gum is the problem. It is impossible to hold both the thing you were told and the gum in your hand at the same time, and you are eleven, and you eat the gum.',
    choices: [
      { text: 'Take the gum', tag: 'yielding', outcome: 'You take it. Your grandmother sees you take it and says nothing, then or ever, which is its own kind of comment.', effect: (p) => { p.m += 3; p.addFlag('jp_occupation_child') } },
      { text: 'Refuse it in front of everyone', tag: 'defiant', outcome: 'You walk past with your chin up and it costs you more than you expected and you think about it, on and off, for decades. You were right about something and you have never been able to say exactly what.', effect: (p) => { p.m -= 3; p.karma += 4; p.addFlag('jp_occupation_child'); p.addFlag('jp_refused_the_gum') } },
    ],
    effect: (p) => { p.setMem('jpwGIs', true) },
  },

  {
    id: 'jpw_sumi_nuri',
    phase: null,
    weight: 30,
    when: (G) => IS_JP(G) && G.currentYear >= 1945 && G.currentYear <= 1948 && G.age >= 7 && G.age <= 16 && !G.mem.jpwSumiNuri,
    text: 'The teacher hands out the ink and tells the class which pages, which paragraphs, which lines. You black out your own textbook, at your own desk, with the same brush you use for calligraphy. Some of the passages you know by heart because you were made to learn them by heart, in that room, by that teacher, who is standing at the front now saying nothing about that at all.',
    choices: [
      { text: 'Do it neatly', tag: 'yielding', outcome: 'You do it neatly, edge to edge, because that is what you are good at. It is the neatest work you do all year.', effect: (p) => { p.m -= 6; p.addFlag('jp_sumi_nuri') } },
      { text: 'Read every line before you black it', tag: 'defiant', outcome: 'You read them all first. It takes you twice as long and the teacher lets you, which you notice, and which is the only thing he manages to say to you about any of it.', effect: (p) => { p.m -= 4; p.e += 4; p.addFlag('jp_sumi_nuri'); p.addFlag('jp_saw_through_it') } },
    ],
    effect: (p) => { p.setMem('jpwSumiNuri', true) },
  },

  {
    id: 'jpw_takenoko_seikatsu',
    phase: null,
    weight: 7,
    when: (G) => IN_OCC(G) && G.currentYear <= 1949 && G.age >= 10 && !G.mem.jpwTakenoko,
    text: 'They call it the bamboo-shoot existence, because a bamboo shoot is peeled one layer at a time until there is nothing left. The kimono goes to a farmhouse in exchange for rice. Then the other kimono. Then the scrolls. The farmers are not cruel about it and that is somehow worse: they are simply on the other side of an arithmetic that has reversed, for the first time in living memory, and everyone in the room knows it.',
    choices: null,
    effect: (p) => { p.setMem('jpwTakenoko', true); p.addFlag('jp_takenoko'); p.wipeMoney(0.4); p.m -= 7; p.h -= 3 },
  },

  {
    id: 'jpw_repatriation',
    phase: null,
    weight: 6,
    when: (G) => IN_OCC(G) && G.currentYear <= 1950 && G.age >= 6 && !G.mem.jpwHikiage,
    text: 'The lists go up at the ward office and people read them the way people read lists. Someone from your street comes back from Manchuria with a child who does not speak, and someone else does not come back from Siberia for another four years and is a different shape when he does. Nobody asks either of them anything. There is an agreement about this that was never negotiated.',
    choices: null,
    effect: (p) => { p.setMem('jpwHikiage', true); p.addFlag('jp_repatriation_years'); p.m -= 5 },
  },

  {
    id: 'jpw_new_constitution',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.currentYear >= 1947 && G.currentYear <= 1951 && G.age >= 10 && !G.mem.jpwKenpo,
    text: 'The new constitution is taught as a subject. Sovereignty rests with the people, it says, and there is an article that renounces war forever, and a girl in the second row asks whether we wrote it or they wrote it. The teacher takes slightly too long to answer. What he eventually says is that it does not matter as much as what is done with it, which is either a dodge or the only honest thing anybody says to you about politics for twenty years.',
    choices: null,
    effect: (p) => { p.setMem('jpwKenpo', true); p.addFlag('jp_article_nine_generation'); p.e += 3 },
  },

  // ── follow-through ─────────────────────────────────────────────────────────

  {
    id: 'jpw_ft_rice_in_the_bowl',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.flags.includes('jp_hunger_years') && G.age >= 35 && !G.mem.jpwFtRice,
    text: (G) => `You cannot leave rice in the bowl. Not will not — cannot. Your own children leave rice in the bowl and it goes through you like a wire, and you have learned not to say anything, and ${G.currentYear - 1945} years after the queues you still put your chopsticks down over an empty bowl and feel, faintly, that something has been done correctly.`,
    choices: null,
    effect: (p) => { p.setMem('jpwFtRice', true); p.m += 2 },
  },

  {
    id: 'jpw_ft_august_fifteenth',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.flags.includes('jp_heard_the_broadcast') && G.age >= 40 && !G.mem.jpwFtAug,
    text: 'Noon on the fifteenth of August, every year, the minute of silence. You stand for it in an office, or a station concourse, or your own kitchen, and what you are actually doing for that minute is listening for cicadas, because that is what was in the room. Everybody around you is standing for something. You have never asked anybody what.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtAug', true); p.m -= 2 },
  },

  {
    id: 'jpw_ft_the_child_asks',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_war_home_front') || G.flags.includes('jp_kokumin_gakko')) && G.children.length > 0 && G.age >= 45 && G.currentYear >= 1975 && !G.mem.jpwFtAsked,
    text: 'Your child asks what you did in the war, having got the question from a television programme, and is expecting a short answer. You were nine. You blacked out your own textbook and you made eight hundred of something a day and you were, for about a year, completely happy, and none of that is sayable in the order it happened.',
    choices: [
      { text: 'Tell it properly, in the order it happened', tag: 'defiant', outcome: 'It takes two hours and you get the happy part in, which is the part you had been most afraid of. Your child is quiet for a long time and then asks a second question, which is better than the first.', effect: (p) => { p.addFlag('jp_told_the_child'); p.m += 5; p.karma += 6 } },
      { text: 'Give the short answer', tag: 'yielding', outcome: 'You say it was hard and there was not much food. It is true. It is also the version that will be all your grandchildren ever have, and you know that while you are saying it.', effect: (p) => { p.addFlag('jp_war_never_told'); p.r += 8; p.m -= 4 } },
    ],
    effect: (p) => { p.setMem('jpwFtAsked', true) },
  },

  {
    id: 'jpw_ft_the_believer',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.flags.includes('jp_believed_it') && G.age >= 50 && !G.mem.jpwFtBeliever,
    text: 'You can still recite it. Sixty years on, the whole rescript, in the cadence it was read in, and the thing nobody warns you about is that it is beautiful — the rhythm of it is genuinely beautiful — and you learned it at eight from a man who was doing his job. You have never decided what to do with that, so you have done nothing, which is also a decision.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtBeliever', true); p.r += 5; p.m -= 3 },
  },

  {
    id: 'jpw_ft_last_one_left',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_sokai_child') || G.flags.includes('jp_firebombing')) && G.age >= 72 && G.currentYear >= 2010 && !G.mem.jpwFtLast,
    text: 'A student with a recorder comes to the community centre to collect testimony, because there is a project, because there is a deadline that nobody says out loud. Of the class that went to the temple three prefectures away, you can account for four. You talk for an hour. At the end she asks whether you would mind repeating the bit about the sky, and you would not mind, and you do it again, and it comes out slightly differently, and she keeps both.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtLast', true); p.addFlag('jp_gave_testimony'); p.karma += 8; p.m += 3 },
  },

  {
    id: 'jpw_ft_the_objects',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_metal_collection') || G.flags.includes('jp_takenoko') || G.flags.includes('jp_burned_out')) && G.age >= 40 && !G.mem.jpwFtObjects,
    text: 'You buy good pots. It is the one thing you are unreasonable about and your family finds it funny and you let them. There is a scroll at an antiques stall that is close enough to the one that went to the farmhouse in 1947 that you stand in front of it for a while and then do not buy it, because it is not the one, and the one is in somebody\'s house in Saitama being nothing in particular to them.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtObjects', true); p.m -= 2 },
  },

  {
    id: 'jpw_ft_the_hands_remember',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_factory_child') || G.flags.includes('jp_sokai_hunger')) && G.age >= 45 && !G.mem.jpwFtHands,
    text: 'Fifty years later your hands can still do it. Somebody puts a repetitive task in front of you and the rhythm comes back whole, eight hundred a day, the exact angle of the wrist, and you complete it faster than anyone half your age and cannot explain why without explaining everything.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtHands', true); p.e += 2 },
  },

  {
    id: 'jpw_ft_two_days',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.flags.includes('jp_dec8') && (G.flags.includes('jp_surrender_relief') || G.flags.includes('jp_heard_the_broadcast')) && G.age >= 50 && !G.mem.jpwFtTwoDays,
    text: 'Two mornings, three years and eight months apart, and on both of them the entire country was outside talking to everybody. You have never heard anyone put those two days beside each other, and you have never done it out loud either, and you are not sure whether that is tact or something else.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtTwoDays', true); p.r += 4; p.m -= 3 },
  },

  {
    id: 'jpw_ft_under_the_ink',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.flags.includes('jp_sumi_nuri') && G.age >= 45 && G.currentYear >= 1982 && !G.mem.jpwFtInk,
    text: 'The textbook argument is in the papers again — what a ministry will and will not let a sentence say about 1937 — and you are the only person at the table who has personally put ink on a page because a teacher told you which lines. You could say so. The conversation moves on at a speed that makes it clear how it would land.',
    choices: [
      { text: 'Say it anyway', tag: 'defiant', outcome: 'You say it. It changes the temperature of the room and not the opinion of anyone in it, and a nephew finds you afterwards in the kitchen and asks you to say the whole thing again slowly.', effect: (p) => { p.karma += 6; p.m += 3; p.addFlag('jp_told_the_child') } },
      { text: 'Let it move on', tag: 'yielding', outcome: 'You let it. You wash up. It is not the first time and you have a fairly exact idea, by now, of how many of these there are left.', effect: (p) => { p.r += 6; p.m -= 4 } },
    ],
    effect: (p) => { p.setMem('jpwFtInk', true) },
  },

  {
    id: 'jpw_ft_article_nine',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_article_nine_generation') || G.flags.includes('jp_occupation_child') || G.flags.includes('jp_refused_the_gum')) && G.age >= 55 && !G.mem.jpwFtNine,
    text: 'The argument about the article comes round every decade or so, and both sides ask people your age to settle it, as though having been eleven in the room where it was taught made you an authority. What you actually remember is the girl in the second row asking whether we wrote it or they did, and the length of the pause, and that you have been inside that pause ever since.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtNine', true); p.e += 2 },
  },

  {
    id: 'jpw_ft_the_ones_who_came_back',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_repatriation_years') || G.flags.includes('jp_saw_the_burned_city')) && G.age >= 50 && !G.mem.jpwFtBack,
    text: 'The man from the end of the street who came back from Siberia in 1949 died this week and the notice gives his age and his surviving family and nothing else, which is correct, and which is also the entire problem. Four years of him are simply not in the world any more. You went to the funeral. You were one of about nine people who knew there was a gap.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtBack', true); p.m -= 5; p.karma += 3 },
  },

  {
    id: 'jpw_ft_neighbourhood_after',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_tonarigumi') || G.flags.includes('jp_austerity_years')) && G.age >= 45 && !G.mem.jpwFtNeighbours,
    text: 'The residents\' association wants volunteers for the disaster drill. Ten households, a list, a bucket chain. You go, because you always go, and you stand in the line passing an empty bucket to a man in his thirties who thinks this is a formality, and for about four seconds you are eight years old and it is not.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtNeighbours', true); p.m += 2; p.karma += 2 },
  },

  {
    id: 'jpw_ft_what_was_told',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && (G.flags.includes('jp_gave_testimony') || G.flags.includes('jp_told_the_child') || G.flags.includes('jp_war_never_told')) && G.age >= 65 && !G.mem.jpwFtTold,
    text: (G) => G.flags.includes('jp_war_never_told')
      ? 'Your grandchild has a school project about the war and has gone to the library for it, because that is where the information is. You could have been the information. You had a specific reason at the time and you can no longer reconstruct it.'
      : 'Your grandchild has a school project about the war and comes to you, because somebody in the family told them you would talk about it. You do. It takes an afternoon. Afterwards they read their notes back to you and two of the details are wrong, and you correct them, and that small exchange is the whole thing working.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtTold', true); p.m += 3 },
  },

  {
    id: 'jpw_ft_knew_and_said_nothing',
    phase: null,
    weight: 6,
    when: (G) => IS_JP(G) && G.flags.includes('jp_saw_through_it') && G.age >= 40 && !G.mem.jpwFtKnew,
    text: 'You worked it out at the time. Not all of it, and not in words you could have defended, but enough — the shape of the part in your hand, the length of the pause, the arithmetic of what was being said against what was being eaten. And you said nothing, because you were a child and there was nothing to say and nobody to say it to. That is a complete and sufficient answer, and it has never once felt like one.',
    choices: [
      { text: 'Decide it was nothing to be proud or ashamed of', tag: null, outcome: 'You put it down. It does not stay down, but you find that putting it down repeatedly is close enough to having put it down.', effect: (p) => { p.m += 4; p.r -= 4 } },
      { text: 'Make it mean something now', tag: 'defiant', outcome: 'You start saying things. At the residents\' meeting, at the school, in a letter to a paper that prints it. None of it is about 1944 and all of it is.', effect: (p) => { p.karma += 8; p.m += 2; p.addFlag('jp_speaks_up_now') } },
    ],
    effect: (p) => { p.setMem('jpwFtKnew', true) },
  },

  {
    id: 'jpw_ft_speaking_now',
    phase: null,
    weight: 5,
    when: (G) => IS_JP(G) && G.flags.includes('jp_speaks_up_now') && G.age >= 68 && !G.mem.jpwFtSpeaking,
    text: 'You have become, without planning it, the person who stands up at the back. The ward office knows you. A local reporter has your number. Your children find it faintly embarrassing and entirely characteristic, and neither of them has worked out that it started in a factory in 1944 with a part you could not name, because you have never told them and it would take an afternoon.',
    choices: null,
    effect: (p) => { p.setMem('jpwFtSpeaking', true); p.karma += 5; p.m += 4 },
  },
]
