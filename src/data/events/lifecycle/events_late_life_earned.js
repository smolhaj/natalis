// events_late_life_earned.js — old age, where the past arrives.
//
// Late life is the thinnest stretch of a played life: the years after sixty
// were mostly generic observations, climate bulletins and grandchild
// templates, while the deep country modules had already written a famine, a
// deportation, a cell, a war, a departure into the flags of the same
// character. The good late-life content in the corpus is the follow-through
// that calls one of those back — a school class visiting a man who was a
// child under the Reich — and there was very little of it.
//
// Every event here reads a flag that an existing event or world event sets
// (checked by grep, and against the follow-through files so no flag gets a
// second version of a scene it already has), an age, a year bound so nothing
// is said in the present tense outside its time, and where the character
// actually lives now. A few read the state instead: the work held longest,
// grandchildren, a marriage of fifty years, a life abroad.
//
// Year bounds go through `yearIn` rather than a bare `G.currentYear` where the
// window is open-ended, so these stay in the `earned` register — they fire
// because of what happened to this person, which is what that register is
// for. Where the scene is one particular year (a parade, an anniversary, a
// protest), the guard reads `G.currentYear` directly so the dated claim in
// getNextEvent can give it its year.

import { hasTech } from '../../technology.js'

const yearIn = (G, from, to = 9999) => G.currentYear >= from && G.currentYear <= to
const liveName = (G) => (G.currentCountry ?? G.character?.country)?.name
const bornName = (G) => G.character?.country?.name
const liveIn = (G, ...names) => names.includes(liveName(G))
const abroad = (G) => liveName(G) !== bornName(G)
const tech = (G, key) =>
  hasTech(G.currentCountry ?? G.character?.country, key, G.currentYear, { rural: G.ruralUrban === 'rural' })
const FREE_REGIMES = ['democracy', 'federal_republic', 'parliamentary_republic', 'constitutional_monarchy']
const freeNow = (G) => FREE_REGIMES.includes(G.regime)
const POST_SOVIET = ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Georgia', 'Armenia', 'Azerbaijan', 'Moldova', 'Latvia', 'Lithuania', 'Estonia']
const CARIBBEAN = ['Jamaica', 'Trinidad and Tobago', 'Barbados', 'Guyana', 'Belize']

const longestWork = (G) => {
  let best = null
  for (const rec of Object.values(G.mem?.careerYears ?? {})) {
    if (rec?.years && (!best || rec.years > best.years)) best = rec
  }
  return best
}

const ft = (id, weight, when, text, m = 0, extra = null) => ({
  id: `lle_ft_${id}`,
  phase: 'late_life',
  weight,
  when,
  text,
  choices: null,
  effect: (p) => { p.m += m; if (extra) extra(p) },
})

export const LATE_LIFE_EARNED_EVENTS = [

  // ── Hunger ─────────────────────────────────────────────────────────────────

  ft('famine_leftovers', 10,
    (G) => G.age >= 60 && G.flags.includes('famine_survivor') && !G.flags.includes('holodomor_generation') && G.hasGrandchildren,
    (G) => {
      const food = {
        China: 'rice', 'North Korea': 'rice', Ethiopia: 'injera', Somalia: 'rice',
        Kenya: 'ugali', Nigeria: 'garri', Kazakhstan: 'bread', Russia: 'bread',
      }[bornName(G)] ?? 'bread'
      return `Your grandson leaves half his ${food} and runs out to play. You finish it standing up, quickly, with your back to the door, the way you have finished every plate since the hungry year.`
    }, 1),

  ft('holodomor_candle', 14,
    (G) => G.age >= 70 && G.flags.includes('holodomor_generation') && G.hasGrandchildren && liveIn(G, 'Ukraine') && yearIn(G, 2007) && (G.character?.birthYear ?? 9999) <= 1929,
    'On the fourth Saturday of November the whole street puts a candle in the window. Your grandson asks who yours is for. You give him four names, and two of them you have not said aloud since 1933.', -1),

  ft('clean_plate', 10,
    (G) => G.age >= 58 && G.flags.includes('great_leap_hunger') && liveIn(G, 'China') && yearIn(G, 2013) && tech(G, 'television'),
    'The Clean Plate campaign is on the television: young people photographing their empty bowls for the internet. You have scraped every bowl clean with the side of your chopsticks since 1960. Your granddaughter photographs yours.', 1),

  ft('hunger_winter_bulbs', 10,
    (G) => G.age >= 60 && G.flags.includes('nl_hunger_winter_generation') && liveIn(G, 'Netherlands'),
    'Every April the tulips come up along your front path. Your mother would never have them in the house. She ate the bulbs in the winter of 1944, fried in a pan with no fat, and said they tasted of nothing at all.', 1),

  // ── Partition and the borders drawn through a life ─────────────────────────

  ft('partition_from_above', 12,
    (G) => G.age >= 60 && G.flags.includes('partition_refugee') && G.hasGrandchildren && yearIn(G, 2006) && (tech(G, 'home_internet') || tech(G, 'smartphone')),
    'Your grandson finds the town you left in 1947 on a map on his screen and zooms down until it is grey roofs among grey roofs. He asks which one was yours. You have never seen it from above, and you cannot tell.', -1),

  ft('kartarpur', 16,
    (G) => G.age >= 72 && G.religion === 'sikh' && liveIn(G, 'India') && G.currentYear === 2019 && (G.flags.includes('partition_refugee') || G.flags.includes('partition_survivor')),
    'In November the corridor opens and you can cross to Kartarpur for the day without a visa. Your son pushes the wheelchair. The gurdwara is white and very clean, and the fields on the other side of the wire are the same fields.', 4),

  ft('muktijoddha_quota', 18,
    (G) => G.age >= 60 && G.flags.includes('bng_mukti_bahini') && liveIn(G, 'Bangladesh') && G.currentYear === 2024 && tech(G, 'television'),
    'In July the students fill the streets against the freedom fighters\' quota, and when the prime minister calls them the grandchildren of razakars they take the word and chant it back. You fought in 1971. You turn the sound down and keep watching.', -2),

  // ── Nigeria ────────────────────────────────────────────────────────────────

  ft('biafra_half_sun', 12,
    (G) => G.age >= 55 && G.flags.includes('biafra_child') && liveIn(G, 'Nigeria') && yearIn(G, 2015),
    'Boys in the market wear the rising half-sun on their caps now, boys born twenty years after it ended. Your nephew asks why you will not wear one. You tell him about the lizards you caught and ate in 1969, and he does not ask again.', -1),

  ft('nigeria_1966_kano', 10,
    (G) => G.age >= 58 && G.flags.includes('nigeria_1966') && liveIn(G, 'Nigeria') && G.hasGrandchildren && yearIn(G, 1990),
    (G) => G.ethnicity === 'igbo'
      ? 'Your grandson tells you he has taken a job in Kano. You tell him about your uncle\'s shop there, and the bag he came back with in 1966. Then you tell him to go, and write down the name of a man in Sabon Gari who will look after him.'
      : 'The shops at the end of the street have been Igbo shops again for years. The trader\'s son greets you in better Hausa than your grandchildren speak. You buy batteries from him and do not mention the radio repairman, who had that stall before.', 0),

  ft('ghana_must_go_bag', 9,
    (G) => G.age >= 55 && G.flags.includes('ghana_must_go') && G.hasGrandchildren,
    'Your grandson packs for university in a Ghana-Must-Go bag, the red and blue check. You tell him where the name came from, and the lorry park in 1983, and he looks at the bag again before he zips it.', 1),

  ft('pension_verification', 12,
    (G) => G.age >= 60 && G.retired && liveIn(G, 'Nigeria') && yearIn(G, 2004) && (G.flags.includes('sap_generation') || G.flags.includes('wages_evaporated')),
    'The pension board calls everyone for verification again. You stand in the queue from six in the morning with your papers in a plastic folder, to prove that you are alive. In the afternoon the man in front of you sits down on the ground and does not get up.', -4),

  // ── China, Korea, Japan, the Philippines ───────────────────────────────────

  ft('struggle_apology', 18,
    (G) => G.age >= 58 && G.flags.includes('struggle_session_survived') && liveIn(G, 'China') && G.currentYear >= 2013 && G.currentYear <= 2014,
    'In the newspaper a retired man apologises, by name, to the teachers he beat in 1966. Your daughter reads it out at the table. You ask her to read it again, and then you ask her for the date at the top of the page.', -2),

  ft('zhiqing_bus', 10,
    (G) => G.age >= 58 && G.flags.includes('sent_down_youth') && liveIn(G, 'China') && yearIn(G, 2005),
    'Forty of the old sent-down youth hire a bus back to the village. The man who taught you to plough is dead. His son has opened a restaurant with a sign that says Zhiqing Memories, and serves you the same thin gruel, and charges for it.', 2),

  ft('cn_parade_2015', 18,
    (G) => G.age >= 75 && G.flags.includes('ww2_cn_war_generation') && liveIn(G, 'China') && G.currentYear === 2015 && tech(G, 'television'),
    'On the third of September the parade for the seventieth anniversary goes past on television, and a row of very old men ride in open cars with their medals. You were a child when the bombers came. You look for a face you know and do not find one.', 0),

  ft('dmz_lottery', 12,
    (G) => G.age >= 65 && G.flags.includes('dmz_separated_family') && liveIn(G, 'South Korea') && yearIn(G, 2000, 2018),
    'You put your name in for the family reunions again. More than a hundred thousand names, a few hundred chosen. The letter says not this time, the same as the last time, and you put it in the drawer with the others.', -3),

  ft('kr_counting', 9,
    (G) => G.age >= 60 && G.flags.includes('ww2_kr_japanese_name') && G.hasGrandchildren && liveIn(G, 'South Korea') && yearIn(G, 1990),
    'When you are tired you still count under your breath in Japanese, the way the classroom taught you. Your granddaughter hears it once in the kitchen and asks what language that was.', -1),

  ft('hibakusha_storyteller', 14,
    (G) => G.age >= 65 && G.flags.includes('hibakusha_survivor') && liveIn(G, 'Japan') && yearIn(G, 1980),
    'The school groups come to the Peace Park in May with paper cranes on strings. You are one of the storytellers now, and you tell it the way you have learned to tell it, in forty minutes, leaving out the one part you still cannot say in front of children.', 1),

  ft('sumi_textbook', 12,
    (G) => G.age >= 60 && G.flags.includes('jp_sumi_nuri') && G.hasGrandchildren && liveIn(G, 'Japan') && yearIn(G, 2001, 2007) && tech(G, 'television'),
    'There is an argument on the news about a new history textbook. You think of the brush and the inkstone and the lines you blacked out in 1945 while the teacher read them out. You find your grandson\'s textbook and read the war chapter standing up.', 0),

  ft('ph_japan_caregiver', 12,
    (G) => G.age >= 70 && G.flags.includes('ww2_ph_occupation') && G.hasGrandchildren && yearIn(G, 2009),
    'Your granddaughter takes a contract as a caregiver in Osaka, looking after old people your age. She sends a photograph of herself in a pink uniform, bowing. You were a child when the soldiers came to the town. You put the photograph on the shelf anyway.', 1),

  // ── Southeast Asia and Afghanistan ─────────────────────────────────────────

  ft('black_april', 12,
    (G) => G.age >= 60 && G.flags.includes('saigon_fell') && G.hasGrandchildren && tech(G, 'television') && (
      (abroad(G) && G.flags.includes('emigrated')) ||
      (!abroad(G) && ['vn_hcmc', 'vn_rural'].includes(G.birthPlace?.id))),
    (G) => abroad(G)
      ? 'On the thirtieth of April the old men in the community hall wear their uniforms and stand for the yellow flag with the three red stripes. Your grandchildren come because you ask them to.' + (tech(G, 'mobile_phone') ? ' They stand at the back and look at their phones, and stand up straight for the anthem.' : ' They stand at the back, and stand up straight for the anthem.')
      : 'On the thirtieth of April the television shows the tank breaking through the palace gate again, the same film, every year. Your grandchildren call it a holiday. You remember the morning the radio said it, and what your father burned in the yard that afternoon.', -1),

  ft('wat_rebuilt', 12,
    (G) => G.age >= 60 && G.flags.includes('sangha_member') && liveIn(G, 'Cambodia') && yearIn(G, 1990),
    'The wat where you were ordained is rebuilt with money sent from Long Beach and Lowell. The new paint is very bright. Behind the kitchen you find the old boundary stone, cracked in two, and stand beside it a while.', 2),

  ft('kabul_2021', 18,
    (G) => G.age >= 55 && G.flags.includes('afghan_refugee') && G.hasGrandchildren && liveIn(G, 'Afghanistan') && G.currentYear === 2021,
    'In August the white flag goes up over the ministries again. Your grandsons burn their diplomas in the courtyard, one after another. You have seen governments end before, so you tell them to keep one copy of each, and bury it.', -6),

  // ── The Soviet Union ───────────────────────────────────────────────────────

  ft('frontovik_may_ninth', 14,
    (G) => G.age >= 60 && G.flags.includes('sov_frontovik') && liveIn(G, ...POST_SOVIET) && yearIn(G, 1965),
    'On the ninth of May you put on the jacket with the medals, which is heavier every year. Schoolchildren come to the door with carnations and a question written on a card, and they stand very straight while you answer it.', 3),

  ft('blockade_bread', 14,
    (G) => G.age >= 55 && G.flags.includes('sov_blockade_survivor') && liveIn(G, 'Russia') && yearIn(G, 1990),
    'On the twenty-seventh of January the city remembers the day the blockade was lifted. You are given a certificate and a box of chocolates. At home you cut a slice of bread two fingers wide and eat it slowly at the window.', -1),

  ft('deported_people', 14,
    (G) => G.age >= 55 && G.flags.includes('sov_deported_people') && yearIn(G, 1990, 2010) &&
      G.hasGrandchildren &&
      ((G.ethnicity === 'chechen' && liveIn(G, 'Russia')) ||
       (G.ethnicity === 'crimean_tatar' && liveIn(G, 'Ukraine')) ||
       (G.ethnicity === 'german_russian' && !liveIn(G, 'Germany'))),
    (G) => G.ethnicity === 'chechen'
      ? 'On the twenty-third of February the old people gather and say the names of the villages the trains left from. You were small in the wagon. You remember the cold coming up through the floorboards, and a woman singing, and nothing else.'
      : G.ethnicity === 'crimean_tatar'
        ? 'On the eighteenth of May the village lights candles for the deportation. You came back in 1990 to find another family in your father\'s house, and you live on the hill above it now, in the house you built yourself.'
        : 'Your granddaughter applies to resettle in Germany and needs proof that the family is German. You give her your mother\'s name in the old spelling, and the special-settlement certificate you have kept in a biscuit tin since 1955.', -1),

  ft('last_address', 16,
    (G) => G.age >= 75 && G.flags.includes('sov_terror_household') && liveIn(G, 'Russia') && yearIn(G, 2015, 2021),
    'A small steel plaque goes up on the wall of the building you lived in then, the size of a postcard: your father\'s name, his trade, the year he was taken, the year he was shot. A volunteer screws it in while you hold the ladder.', 2),

  ft('liquidator_april', 12,
    (G) => G.age >= 55 && G.flags.includes('chernobyl_liquidator') && liveIn(G, 'Ukraine', 'Russia', 'Belarus') && yearIn(G, 2006),
    'On the twenty-sixth of April the liquidators gather at the monument with their badges, fewer every year. The man who shovelled beside you on the roof is not there. You lay two carnations.', -2),

  // ── Europe ─────────────────────────────────────────────────────────────────

  ft('secret_lessons', 14,
    (G) => G.age >= 70 && G.flags.includes('ww2_pl_secret_school') && liveIn(G, 'Poland') && yearIn(G, 1990),
    'A history class asks you to come and talk about the secret lessons. You tell them about the kitchen table, the Latin grammar inside a cookery book, the girl at the window watching the street. A boy asks whether you were afraid, and you have to think about it.', 3),

  ft('letter_from_haifa', 14,
    (G) => G.age >= 60 && G.flags.includes('ww2_pl_hid_someone') && yearIn(G, 1990),
    'A letter comes from Haifa, in English first and then in a Polish that is very careful, from the granddaughter of the little girl who lived two years in your hayloft. She would like to visit. She asks what you would like her to bring.', 6),

  ft('martial_law_candle', 10,
    (G) => G.age >= 60 && G.flags.includes('martial_law_generation') && liveIn(G, 'Poland') && yearIn(G, 1990),
    'On the thirteenth of December the radio plays the general\'s speech again, and you know where every pause falls. You put a candle in the window, as you did that first Christmas.', -1),

  ft('ampelmann', 9,
    (G) => G.age >= 55 && G.flags.includes('ddr_generation') && ['de_leipzig', 'de_rural_east'].includes(G.birthPlace?.id) && liveIn(G, 'Germany') && G.hasGrandchildren && yearIn(G, 2000),
    'Your grandson comes back from Berlin with a T-shirt printed with the little East German traffic-light man, bought in a shop that sells nothing else. He wears it to Sunday lunch, and you are not sure whether to laugh, and then you do.', 2),

  ft('spomenik', 12,
    (G) => G.age >= 70 && G.flags.includes('ww2_yu_partisan') && yearIn(G, 1992),
    'The partisan monument on the hill has been sprayed over and its bronze plaque taken for scrap. You climb up with a bucket and a brush and scrub at the paint until your arms give out, and then you sit on the steps.', -2),

  ft('windrush_day', 14,
    (G) => G.age >= 70 && G.flags.includes('windrush_generation') && G.flags.includes('emigrated') && CARIBBEAN.includes(bornName(G)) && liveIn(G, 'United Kingdom') && yearIn(G, 2018),
    'The church does a lunch for Windrush Day and asks the old ones to stand. You stand. A girl from the council takes a photograph and asks what island, and writes it down wrong.', 1),

  // ── The Americas ───────────────────────────────────────────────────────────

  ft('tlatelolco_march', 10,
    (G) => G.age >= 55 && G.flags.includes('tlatelolco_generation') && liveIn(G, 'Mexico') && yearIn(G, 1998),
    'On the second of October the students march out of Tlatelolco shouting that it is not forgotten. They are the age you were. You watch from a bench in the plaza, because your knees will not do the walk now.', 0),

  ft('desaparecido_swab', 14,
    (G) => G.age >= 55 && G.flags.includes('pe_desaparecido_family') && liveIn(G, 'Peru') && yearIn(G, 2003),
    'People from Lima come to the village with a list and a folding table. You give them a name, a year and the colour of the shirt. A woman takes a swab from inside your cheek with a small stick and seals it in an envelope with your name.', -3),

  // ── South Africa ───────────────────────────────────────────────────────────

  ft('dompas_tin', 12,
    (G) => G.age >= 60 && G.flags.includes('apartheid_pass_book') && liveIn(G, 'South Africa') && G.hasGrandchildren && yearIn(G, 1994),
    'You find the dompas in the biscuit tin with the birth certificates. Your grandson, who was born after, turns its pages and reads the stamps out loud like a story: the dates, the districts, the initials of the men who signed.', 0),

  // ── Prison and what it leaves ──────────────────────────────────────────────

  ft('prisoner_recorder', 12,
    (G) => G.age >= 60 && G.flags.includes('political_prisoner') && !G.inPrison && freeNow(G),
    'A student comes with a recorder and a list of questions for a project about the prisons. She asks how many days, and you know the number exactly. She asks what you ate, and you find you remember the tin bowl better than any face.', 1),

  ft('signed_confession', 10,
    (G) => G.age >= 60 && G.flags.includes('signed_the_confession') && !G.inPrison && tech(G, 'television'),
    'You have never told your children that you signed. On the evening news a man your age is asked about his own confession, and he says he signed on the third night. You turn the television off before your daughter comes back into the room.', -2),

  ft('union_photograph', 10,
    (G) => G.age >= 60 && G.flags.includes('jailed_for_organising') && !G.inPrison && freeNow(G),
    'The union puts up photographs in the hall for its anniversary, and there you are, younger, between two men holding a banner, the week before they took you. A young organiser asks you to sign it.', 4),

  ft('custody_wrist', 8,
    (G) => G.age >= 60 && G.flags.includes('beaten_in_custody'),
    'The hand they broke aches the day before rain, and you know the weather a day early. The family think it is a trick, and you let them.', -1),

  // ── Work, war and the body ─────────────────────────────────────────────────

  ft('combat_ear', 8,
    (G) => G.age >= 60 && G.flags.includes('combat_veteran'),
    'The ringing in your left ear started in one particular week and has not stopped since. At night, in the quiet, it is the loudest thing in the house.', -1),

  ft('child_soldier_market', 10,
    (G) => G.age >= 55 && G.flags.includes('child_soldier_free'),
    'At the market a man your age looks at you one second too long, and you both know from where. Neither of you says anything. He pays for his onions and goes.', -2),

  ft('gulf_house', 12,
    (G) => G.age >= 55 && G.flags.includes('gulf_migrant_worker') && !liveIn(G, 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Saudi Arabia'),
    'You live in the house now, the one you paid for from the camp a room at a time and knew only from photographs. Steel rods still stand up out of the roof, waiting for the floor your son will add.', 3),

  ft('plant_now', 8,
    (G) => G.age >= 60 && G.flags.includes('factory_plant_closed'),
    (G) => ['wealthy_west', 'wealthy_east'].includes(G.archetype)
      ? 'You are driven past the plant one Sunday. It is self-storage now, orange doors in rows, and the gate you walked through every morning is a keypad.'
      : 'The bus goes past the plant. The roof is gone and goats graze in the yard where the lorries turned. Somebody has taken the gate.', -1),

  ft('business_sign', 8,
    (G) => G.age >= 60 && G.flags.includes('business_failed'),
    (G) => `The place that was yours is ${tech(G, 'mobile_phone') ? 'a phone repair stall' : 'a tailor\'s'} now. They painted over your name, but in a hard afternoon light the letters still come up through the new paint.`, -1),

  ft('hyperinflation_notes', 8,
    (G) => G.age >= 60 && G.flags.includes('survived_hyperinflation') && G.hasGrandchildren,
    'You keep the old notes in a shoebox, the ones with all the zeros. Your grandson finds them and plays shop with them on the floor, and you take them off him, more sharply than you meant to.', -1),

  // ── Family across distance ─────────────────────────────────────────────────

  ft('child_abroad_call', 10,
    (G) => G.age >= 58 && G.flags.includes('child_lives_abroad'),
    (G) => tech(G, 'video_call')
      ? 'On Sunday the call comes at the hour that is morning there. The phone is turned round to show you a kitchen, a window, a tree you do not know the name of. You ask about the weather twice.'
      : 'On Sunday the call comes through at the hour that is morning there, with a delay on the line, so you keep talking over each other and stopping. You ask about the weather twice.', 1),

  ft('returned_queue', 8,
    (G) => G.age >= 58 && G.flags.includes('returned_home') && !abroad(G),
    'You have been back for years and you still stand in a queue where nobody else does. People go round you to the counter. Your sister calls you the foreigner, fondly, most of the time.', 0),

  ft('where_buried', 10,
    (G) => G.age >= 70 && G.flags.includes('emigrated') && abroad(G) && (G.yearsAbroad ?? 0) >= 30 && G.children?.some(c => c.alive !== false),
    'Your children ask, carefully, where you want to be buried. You say you will think about it, which is what you have been doing for thirty years.', -1),


  ft('laid_off_car_park', 7,
    (G) => G.age >= 60 && G.flags.includes('laid_off') && !G.career,
    'You pass the old building on the bus. The car park where you sat for an hour that morning, after they told you, has a different name on the sign, and the barrier is up.', -1),

  ft('hunger_childhood_bread', 8,
    (G) => G.age >= 60 && G.flags.includes('hunger_childhood') && !G.flags.includes('famine_survivor'),
    'You cannot throw food away. The stale ends go out on the wall for the birds, and you stand at the window and watch until every piece is gone.', 0),

  ft('billeted_room', 12,
    (G) => G.age >= 55 && G.flags.includes('de_billeted_strangers') && liveIn(G, 'Germany') && yearIn(G, 1990),
    'A letter comes from the daughter of the family from Silesia who lived in your front room for four years after the war. She is writing it all down and wants to know what the room looked like. You draw it for her: the bed, the stove, the curtain they hung across the middle.', 1),

  // ── What a life held ───────────────────────────────────────────────────────

  {
    id: 'lle_long_work_call',
    phase: 'late_life',
    weight: 8,
    when: (G) => G.age >= 60 && G.retired && (longestWork(G)?.years ?? 0) >= 25 && !G.mem?.lleWorkCall,
    text: (G) => (tech(G, 'landline') || tech(G, 'mobile_phone'))
      ? 'Somebody from the old place rings about a thing nobody there can find, because you were the one who knew where it was kept. You tell them. Afterwards you sit by the telephone for a while with your hand still on it.'
      : 'A boy from the old place comes to the house about a thing nobody there can find, because you were the one who knew where it was kept. You tell him. Afterwards you sit in the doorway for a while, looking down the road he went.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('lleWorkCall', true) },
  },

  {
    id: 'lle_many_grandchildren',
    phase: 'late_life',
    weight: 8,
    when: (G) => G.age >= 60 && (G.grandchildCount ?? 0) >= 12 && !G.mem?.lleManyGrand,
    text: 'When the newest baby is put into your arms you call her by the name of one of her cousins. Her mother corrects you. You say it again, wrong, and the whole room laughs, and you laugh with them.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('lleManyGrand', true) },
  },

  {
    id: 'lle_grandchild_reads',
    phase: 'late_life',
    weight: 9,
    when: (G) => G.age >= 60 && G.literate === false && G.hasGrandchildren && !G.mem?.lleGrandReads,
    text: 'Your granddaughter reads you the letter that came, slowly, following the words with her finger the way nobody ever showed you. Then she reads it again, because you ask her to.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('lleGrandReads', true) },
  },

  {
    id: 'lle_fifty_years',
    phase: 'late_life',
    weight: 9,
    when: (G) => G.age >= 68 && G.partner && (G.partner.years ?? 0) >= 50 && G.children?.length > 0 && !G.mem?.lleFiftyYears,
    text: (G) => `Fifty years. The children want a party. ${G.partner?.name?.split(' ')[0] ?? 'The one you married'} asks only whether there will be enough chairs.`,
    choices: null,
    effect: (p) => { p.m += 4; p.updatePartnerRel(3); p.setMem('lleFiftyYears', true) },
  },

  {
    id: 'lle_ft_arranged_asked',
    phase: 'late_life',
    weight: 9,
    when: (G) => G.age >= 55 && G.flags.includes('arranged_marriage') && G.partner && (G.partner.years ?? 0) >= 35 && G.hasGrandchildren && !G.mem?.lleArrangedAsked,
    text: (G) => G.character?.gender === 'female'
      ? 'Your granddaughter asks whether you loved your husband when you married him. You say you had seen him twice. She waits for more, and you look across the room at him asleep in his chair, mouth open, and do not give her any.'
      : 'Your granddaughter asks whether you loved your wife when you married her. You say you had seen her twice. She waits for more, and you look across the room at her asleep in her chair, mouth open, and do not give her any.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('lleArrangedAsked', true) },
  },
]
