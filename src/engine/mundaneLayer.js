// mundaneLayer.js — Daily-life texture that fires alongside main events every year.
//
// buildMundaneLayer(state) is called from advanceYear() regardless of whether
// a character event fires. Returns a prose string or null (~18% skip for natural
// variation). No choices. No outcomes. Just the felt texture of a lived year.
//
// Gating dimensions:
//   phase, era, archetype, country, gender, religion, gdp, ruralUrban,
//   career.field, partner, children, specific flags
//
// Writing register: second person, present tense, specific and concrete.
// Matches the literary tone of the main event system.

export function buildMundaneLayer(state) {
  if (Math.random() < 0.18) return null

  const flags = new Set(state.flags ?? [])
  const F = (f) => flags.has(f)
  const { age, currentYear, partner, children, career, mem } = state
  const phase = age <= 5 ? 'early_childhood'
    : age <= 11 ? 'childhood'
    : age <= 17 ? 'adolescence'
    : age <= 29 ? 'young_adult'
    : age <= 49 ? 'midlife'
    : 'late_life'
  const arch = state.character?.country?.archetype ?? 'developing_urban'
  const cn = state.character?.country?.name ?? ''
  const era = Math.floor(currentYear / 10) * 10
  const gender = state.character?.gender ?? 'male'
  const religion = state.character?.religion ?? ''
  const gdp = state.character?.country?.gdp ?? 'medium'
  const ruralUrban = state.character?.ruralUrban ?? 'urban'
  const careerField = career?.field ?? null
  const isMuslim = religion?.startsWith('muslim')
  const isChristian = religion?.startsWith('christian')
  const isHindu = religion === 'hindu'
  const isBuddhist = religion === 'buddhist'
  const isJewish = religion === 'jewish'
  const isFolk = religion === 'folk' || religion === 'traditional'
  const isWealthy = ['very_high', 'high', 'medium_high'].includes(gdp)
  const isPoor = ['very_low', 'low'].includes(gdp)
  const isWorkingClass = ['low_medium', 'medium'].includes(gdp)
  const hasChildren = children && children.length > 0
  const hasPartner = !!partner
  const isRural = ruralUrban === 'rural'
  const isUrban = ruralUrban === 'urban'
  const isWealthyArch = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
  const isSubsaharan = arch === 'subsaharan'
  const isDeveloping = ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(arch)
  const isPostSoviet = arch === 'post_soviet'

  const pool = []
  const add = (...items) => pool.push(...items)
  const addIf = (cond, ...items) => { if (cond) pool.push(...items) }

  // ── UNIVERSAL HUMAN TEXTURE — PHASE BASED ──────────────────────────────────
  // Items true of any person alive in any era. The common thread of existence.

  if (phase === 'early_childhood') add(
    'There is a word you have been practising. You say it when you can.',
    'The thing you wanted is not the thing you were given. This is being explained to you.',
    'You have a favourite spot. You have not told anyone it is your favourite.',
    'Sleep comes easily. The night is not complicated yet.',
    'You are mostly interested in things close to the ground — insects, water, the texture of things.',
    'You do not understand everything the adults say. You understand more than they assume.',
  )

  if (phase === 'childhood') add(
    'You have memorised the route between school and home the way the body memorises routes — without effort, just presence.',
    'There is a game with rules that only the children in your specific group know. The rules matter enormously.',
    'School smells the same regardless of what day it is. You have filed this smell without meaning to.',
    'Someone taller than you is right about something you were wrong about. This is uncomfortable and educational.',
    'You have discovered that adults do not always know what they are doing. This is unsettling and also useful.',
    'Saturday morning is a different quality of morning. The quality is something close to freedom.',
    'You have started to have opinions about things. You are partly right and partly wrong, which is what opinions are.',
    'The world is large and you are starting to understand just how large.',
    'You are memorising things without meaning to: routes, faces, sequences, the way the light falls.',
  )

  if (phase === 'adolescence') add(
    'The mirror is consulted more often than it was last year.',
    'There is music that explains how you feel better than words do. You listen to it repeatedly.',
    'You have formed an opinion about something important. The opinion is partly right.',
    'You are learning that your parents are people, which is different from being your parents. This takes adjustment.',
    'Sleep has reorganised — later to bed, harder to wake — and no one understands this is not entirely a choice.',
    'You have a secret you are keeping. The keeping of it feels significant.',
    'Something embarrassing happened this year. You think about it more than necessary.',
    'You feel things at a frequency the years ahead will not sustain. You do not know this yet.',
    'You are watching older people for clues about how to be in the world. The clues are incomplete.',
  )

  if (phase === 'young_adult') add(
    'You made a decision this year you will not fully understand the consequences of for five years.',
    'The city — or wherever you have arrived — is still being mapped. You are learning which streets lead where.',
    'The first time you paid rent, the amount felt enormous. You have adjusted.',
    'You have a friend from this period who knows a version of you that no one else knows.',
    'Something you believed at twenty-two is no longer something you believe. The belief was replaced gradually.',
    'You are tired in a way that is not about sleep. It is about the effort of starting.',
    'Someone older told you something useful this year. You did not recognise it as useful until later.',
    'The body is learning what it can do. The learning is mostly good news.',
    'You are eating for one, or for two, or eating whatever is available. The meals of this decade are improvised.',
  )

  if (phase === 'midlife') add(
    'A person who used to be young is now the age you were when you thought of them as young. This happens continuously.',
    'You have started saying things your parents said. The things are not wrong. They are just finally true.',
    'You have a routine you have maintained for longer than you remember starting it.',
    'The week has a texture to it that the years in your twenties did not have. Monday feels like Monday.',
    'You know people who have died. The list is longer than it was at thirty.',
    'Some of the things you worried about did not happen. Others happened and were survived. The accounting is ongoing.',
    'There is something you are putting off. You know this. You are still putting it off.',
    'You understand now what your parents were going through. The understanding arrived late. It is still useful.',
    'The choices that still feel possible are fewer. The ones that remain are the ones that matter.',
    'You are at the age where people around you start having health scares. The frequency increases.',
  )

  if (phase === 'late_life') add(
    'You have been in this city, or this room, or this life, long enough to have watched it change.',
    'You are going through things — objects, papers, photographs. Some of it is necessary. Some is just looking.',
    'The body requires more consultation than it did. You consult it.',
    'You have started to say goodbye to things earlier than strictly necessary — to prepare. You are not sure this is useful.',
    'You are old enough to tell a certain kind of story. You tell it to people who were not there.',
    'The hours have a different relationship to urgency now. Some things that seemed important were not.',
    'You know the neighbourhood in a specific, accumulated way — the shop that closed, the family that moved.',
    'You have been doing this thing for decades. You do it still.',
    'The grandchildren — or the children of people you know — are growing in a way that suddenly seems fast.',
  )

  // ── ERA TECHNOLOGY ─────────────────────────────────────────────────────────
  // Gated by decade + archetype. The texture of which tools the world provides.

  addIf(era <= 1919 && !isWealthyArch,
    'The lamp needs trimming. This is the work of the evening.',
    'News of what has happened elsewhere takes days to arrive.',
    'Water is fetched, not delivered. The fetching organises the morning.',
  )
  addIf(era <= 1919 && isWealthyArch,
    'The telegram arrived. Its brevity is the result of the cost, not the emotion.',
    'The horse-drawn cart is still the dominant technology of the street. The automobile is a novelty for the wealthy.',
  )
  addIf(era === 1920 || era === 1930,
    'The radio in the front room gathers the family in the evenings as though it were a fire.',
    'The gramophone plays the same records again. You know them by heart now.',
  )
  addIf((era === 1920 || era === 1930) && isWealthyArch,
    'The cinema is a weekly ritual. The darkness and the screen.',
    'The telephone is in the hallway. Calls are brief and considered before making them.',
    'The newspaper is folded and read in a specific order. The order has not changed.',
  )
  addIf(era === 1940 && isWealthyArch,
    'Rationing means the meal is considered before it is prepared.',
    'The letter from abroad is opened carefully. The news could be anything.',
    'The radio announces things that were not announced yesterday. You listen with particular attention.',
  )
  addIf(era === 1950 && isWealthyArch,
    'The television has arrived in the living room. The evenings have reorganised themselves around it.',
    'The washing machine is still the subject of comment — at how much easier it has made the day.',
    'The car is the new fact of the neighbourhood. The street sounds different on weekend mornings.',
  )
  addIf(era === 1960,
    'The record player is the household\'s second intelligence. It knows what the afternoon needs.',
    'The telephone rings. It is for one specific person. Everyone else finds out later.',
  )
  addIf(era === 1960 && isWealthyArch,
    'The colour television is in some houses, not yet all. The question of whether to get one is a category of conversation.',
  )
  addIf(era === 1970,
    'The cassette tape has the advantage of being skippable. You have recorded a side that is entirely what you want.',
  )
  addIf(era === 1970 && isWealthyArch,
    'The microwave is in some kitchens — a machine that does what a pot does, faster, and no one is entirely sure what this means for cooking.',
  )
  addIf(era === 1980,
    'The VCR means the film can be watched again, which changes what watching a film means.',
    'The personal computer is at the desk. Most of what it does is still being discovered.',
  )
  addIf(era === 1980 && isWealthyArch,
    'The Walkman has made the commute private. The city continues outside the headphones.',
    'The fax machine has arrived at the office. A document that took days now arrives instantly.',
  )
  addIf(era === 1990,
    'The CD player has replaced the cassette. The skip protection is still imperfect.',
  )
  addIf(era === 1990 && isWealthyArch,
    'The mobile phone is the size of a small brick and calls cost significantly. You use it for genuine emergencies.',
    'Email has arrived at the office. The volume of communication has increased without prior consultation.',
  )
  addIf(era === 1990 && isDeveloping,
    'The internet café has opened. The internet is accessed as a destination, not a permanent condition.',
  )
  addIf(era === 2000,
    'The phone in your pocket sends a text in the time it once took to compose a letter.',
    'Broadband has made the internet a permanent fact of the home. It is not turned on and off. It is simply there.',
  )
  addIf(era === 2000 && isWealthyArch,
    'The DVD means you own the film, not just the memory of having watched it.',
    'The search engine means most questions have answers available in seconds. The questions have not changed. The seconds have.',
  )
  addIf(era === 2010,
    'The smartphone is the last thing checked at night and the first thing checked in the morning. You have noticed this.',
    'WhatsApp has replaced the phone call as default communication. The voice note is somewhere between a call and a text.',
    'Streaming means there is no schedule for the film or the series. You watch when you want. You watch more.',
    'The photograph is no longer a significant commitment. You take dozens. The dozens accumulate.',
  )
  addIf(era === 2010 && isDeveloping,
    'The smartphone arrived before the electricity is reliable. Solar charging is a business now.',
    'Mobile money means the transaction happens on the phone. No bank required.',
  )
  addIf(era >= 2020,
    'The video call is now indistinguishable from ordinary communication. The face on the screen is as real as the face in the room.',
    'Most things can be delivered. The option is taken more often than expected.',
    'The algorithm knows what you will want to read before you know you want to read it. You are still deciding how to feel about this.',
  )

  // ── GENDER-SPECIFIC DAILY LIFE ─────────────────────────────────────────────

  addIf(gender === 'female' && era <= 1959 && isWealthyArch,
    'The meal is expected at a certain time. The expectation has not been stated. It is understood.',
    'You do the laundry, the shopping, the correspondence. This is called being at home.',
    'There are rooms not intended for you — the meeting, the club, the conversation about money. You manage around them.',
  )
  addIf(gender === 'female' && era >= 1960 && era <= 1979 && isWealthyArch,
    'The job you have was not available to women at this level ten years ago. You are the first, or among the first.',
    'The equal pay conversation is happening in the office. The happening is not the same as the resolution.',
  )
  addIf(gender === 'female' && isDeveloping,
    'The day begins before sunrise. By the time the rest of the household wakes, several things are already done.',
    'The market is your domain — the price-checking, the weight, the recognition of freshness. The vendor knows you.',
    'The water is fetched. The fetching is not counted as work because it happens before work begins.',
    'The children\'s illness falls to you. The school appointment falls to you. The in-law visit falls to you.',
    'You are responsible for more of the visible daily life than the accounting would suggest.',
  )
  addIf(gender === 'female' && phase !== 'early_childhood' && phase !== 'childhood',
    'The list in your head does not empty. It reconfigures. By the time one thing is done, three others have moved up.',
    'You are dressed before the decision has been fully made. The mirror is consulted once. You leave.',
  )
  addIf(gender === 'female' && era >= 1990 && phase === 'midlife',
    'In the meeting, you said what you were going to say, and then someone else said it, and it was received differently. This has happened before.',
    'A man you don\'t know commented on your appearance in a public place today. You recalibrated the route home.',
    'The question of whether to have children, or more children, or to stop, lives in the background of certain years.',
  )
  addIf(gender === 'male' && isDeveloping && phase !== 'early_childhood',
    'The obligation to provide is the background frequency on which everything else runs.',
    'The work is physical and the body carries the record of the years. By evening the back has opinions.',
  )
  addIf(gender === 'male' && isWealthyArch && phase === 'midlife',
    'There are things you would talk about and things you would not. The distinction is longstanding and has not been examined recently.',
    'The emotional work of the household is distributed in a way that has not been explicitly negotiated.',
  )
  addIf(gender === 'male' && isWorkingClass,
    'The wage is what it is. You know what day it arrives and what needs to come out of it first.',
    'The weekend is real — two days in which the body does something other than what it is told.',
  )

  // ── RELIGION-SPECIFIC DAILY RHYTHMS ────────────────────────────────────────

  addIf(isMuslim && phase !== 'early_childhood',
    'The adhan sounds from the minaret or the phone or the radio, and the day organises itself around it.',
    'The five prayers are the architecture of the day. The architecture is invisible to people who do not share it.',
    'The wudu before prayer — the washing — is a ritual boundary between the world and the prayer.',
  )
  addIf(isMuslim && currentYear >= 1970,
    'Ramadan has arrived. The fast from dawn to dusk is thirty days and also a single practice refined over decades.',
    'The iftar table — the dates first, the water, then the meal — is the same table every evening. The company changes.',
    'The Ramadan nights are longer in some ways than the days — the prayers, the Quran, the particular company of that month.',
  )
  addIf(isMuslim && gender === 'male' && phase !== 'early_childhood',
    'The Friday prayers. The walk or the drive. The congregation. The returning.',
  )
  addIf(isMuslim,
    'Eid — the prayer, the clothes, the greeting, the food, the visiting. The year has anchors and Eid is one of them.',
  )
  addIf(isMuslim && phase === 'late_life',
    'The Hajj aspiration: for those who have done it, the memory of standing at Arafat is not a memory that fades.',
  )

  addIf(isChristian && phase !== 'early_childhood',
    'Sunday is the day with a different shape. The getting-ready, the walk or drive, the greeting of people seen only in this context.',
    'The hymn arrives without prompting. You are doing something else entirely when it appears.',
  )
  addIf(isChristian && arch === 'subsaharan' || (isChristian && isDeveloping),
    'The church service runs long because the Spirit arrives when it arrives. You know to leave nothing urgent waiting.',
    'The testimony time — the standing up, the naming of what was given back — is its own form of witnessing.',
    'The pastor\'s name is known in the neighbourhood. His word carries weight that secular institutions have lost.',
    'The tithe is the tithe. The first tenth before anything else.',
  )
  addIf(religion === 'christian_catholic',
    'The rosary at the end of the day. The beads are known by touch. The words arrive without thought.',
    'The confession booth is a specific appointment. The priest has a specific manner. You know his approach.',
    'The feast day of the patron saint of the town is the year\'s social calendar compressed into one day.',
  )
  addIf(religion === 'christian_orthodox',
    'The liturgy is long and is meant to be long. You stand. The standing is part of it.',
    'The icon in the corner of the room is the same icon that was there when you were a child.',
    'The fast periods are numerous and the foods change in predictable ways. You know this calendar by feeling.',
  )
  addIf(isHindu,
    'The daily puja — the lamp, the incense, the brief prayer — is the morning\'s first appointment.',
    'Diwali: the lights in every window, the smell of sweets being prepared, the firecrackers at night.',
    'The temple visit is not only religious. It is social, informational, and an accounting of who has been seen.',
    'The wedding season is long and expensive and expected. The invitation creates an obligation.',
  )
  addIf(isHindu && gender === 'female',
    'The Navratri fast: nine days of particular food, particular prayer, the garba dancing in the evenings.',
    'Karva Chauth, or the equivalent: the fast for the partner, the moon, the breaking of it.',
  )
  addIf(isBuddhist,
    'The monks collect alms at dawn. The giving is merit. The merit accumulates.',
    'The temple is the centre of the village or neighbourhood in a way that does not require explaining.',
    'The full moon day is observed. The work is lighter. The mind is different.',
    'Water is poured. The name of a deceased relative is spoken. The water finds its level.',
  )
  addIf(isJewish,
    'Shabbat begins on Friday evening with candles and blessing and the interruption of the week. The interruption is the point.',
    'The High Holiday season: the Days of Awe, the shofar, the year being weighed.',
    'Passover: the cleaning, the seder, the questions the youngest child asks that are the same every year and different every year.',
    'Yom Kippur: the fast, the synagogue, the accounting that has no column for excuses.',
  )
  addIf(isFolk,
    'The ancestors are not gone. They are elsewhere and they can be consulted. The consultation follows protocol.',
    'The healer in the village is not the same as the doctor. Their domains do not entirely overlap.',
    'The taboo is observed not because you believe in the mechanism but because the cost of not observing it is higher.',
  )

  // ── SOCIOECONOMIC ──────────────────────────────────────────────────────────

  addIf(isPoor,
    'The calculation of the week\'s food happens before the buying. The margin between enough and not enough is small.',
    'The phone is shared — with the household, or with a neighbour. Calls are arranged, not spontaneous.',
    'The thing that broke will be repaired. Replacement is not the first option.',
    'The school fees are a number that arrives every term. How to meet the number is worked out.',
    'You eat what is available. What is available is adequate, mostly.',
    'Rain on the roof is the loudest thing. Tonight it is the loudest thing.',
    'You send what you can. Home needs what you send.',
  )
  addIf(isPoor && isRural,
    'The queue for water or kerosene or the clinic is the first appointment of the day.',
    'The shoes need resoling. This is done. The shoes continue.',
  )
  addIf(isWorkingClass,
    'The packed lunch is the economics of the day: made at home, eaten at work, nothing spent on a meal.',
    'Overtime was offered. The calculation took a moment. You said yes.',
    'The bill arrived. The bill is paid. The paying of it leaves something specific in the account.',
    'The week ends and the week was, in the main, fine. This is not a small thing.',
    'The bus fare is counted before the bus is caught.',
  )
  addIf(isWealthy,
    'The account was checked without anxiety. This continues to be unusual on a global scale. You know this intermittently.',
    'The choice is between two things of similar quality. The price is not the deciding factor.',
    'The donation was made. The amount was decided in a moment without significant calculation.',
    'The restaurant was chosen before the price was considered. This continues to be a privilege.',
  )
  addIf(isWealthyArch && isWealthy,
    'The cleaner comes on a scheduled day. Their name is known. The arrangement is professional and also human.',
    'The annual leave is taken. The destination was agreed months ago. The planning was part of the pleasure.',
  )
  addIf(arch === 'wealthy_west' && (gdp === 'medium' || gdp === 'medium_high'),
    'The mortgage is the number that lives in the back of the mind. Not urgently. Persistently.',
    'There are two options and both are reasonable. This is a new situation relative to earlier decades.',
    'The car needs a service. This is handled.',
    'You are saving for something that is not an emergency. This is the definition of surplus.',
  )

  // ── TRANSPORT AND MOVEMENT ─────────────────────────────────────────────────

  addIf(isRural && phase !== 'early_childhood',
    'Everything necessary is within walking distance or requires the acceptance of a long walk.',
    'The walk to the market, the school, the well. The route is known. The feet know it.',
  )
  addIf(isDeveloping && isUrban,
    'The boda-boda, okada, tuk-tuk — the driver knows which streets are faster today. You trust this.',
    'The negotiation of the fare is the first conversation of the journey.',
    'The minibus is full. This is the usual condition of the minibus.',
    'The conductor is calling the route from the window. The route is the route you take.',
    'Standing on a bus for an hour is its own form of being in the city.',
  )
  addIf(isWealthyArch && era >= 1950 && career,
    'The commute is the only part of the day that belongs entirely to you.',
    'The radio in the car is the hour between the job and the home.',
    'The traffic is the constant. Your relationship with it has evolved from irritation to acceptance.',
    'The parking is found. This registers as a small win reported to no one.',
  )
  addIf(isWealthyArch && era >= 1950 && isUrban,
    'The specific rush of hot air before the underground train arrives. You know the timing of this now.',
    'The platform at rush hour is a managed compression of people. The management is mostly polite.',
    'The seat you prefer is at the end of the car. When it is available, the day begins differently.',
  )
  addIf(phase === 'young_adult' || phase === 'midlife',
    'The bicycle is the fastest route through the morning streets.',
    'You walk somewhere today that most people take a vehicle to. The walking is the point.',
  )
  addIf(era >= 1960 && phase !== 'early_childhood',
    'The airport is a country that belongs to everywhere and nowhere. You have spent days of your life in it cumulatively.',
  )

  // ── FOOD AND EATING ────────────────────────────────────────────────────────

  add(
    'The meal was ordinary and the company was good, or the company was ordinary and the meal was good. One or the other.',
    'The smell of something cooking is the first announcement that someone is home.',
    'Food prepared by someone else always tastes differently than food you prepared yourself.',
    'The recipe came from someone who is not here to explain what they meant by "a handful."',
  )
  addIf(isSubsaharan || cn === 'Nigeria' || cn === 'Ghana' || cn === 'Cameroon',
    'The jollof rice debate — whose version, which country, which occasion — is perennial and unresolvable and also enjoyable.',
    'Fufu, ugali, sadza, eba — the starch that holds the soup and the evening together.',
    'The groundnut soup takes time. The time is part of what it is.',
    'The plantain cooks in the oil and the sound of it is correct.',
    'The market tomatoes are riper than the shop\'s. You know this. You go to the market.',
    'Palm wine is tapped early and drunk before the afternoon changes it.',
  )
  addIf(cn === 'Ethiopia' || cn === 'Eritrea',
    'Injera is spread on the communal plate. The eating is communal. The plate does not belong to any one person.',
    'The coffee ceremony takes time it is not in a hurry about. The time is given.',
    'Tej is the honey wine of occasion. The occasion need not be large to warrant it.',
  )
  addIf(['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'].includes(cn),
    'The dal is the daily constant. What is added to it changes with season and occasion.',
    'The chapati is made by hand as it has always been made. This is not noted as remarkable.',
    'Biryani is the meal of ceremony. When biryani is made, something is being marked.',
    'Tea is the answer to most situations that require a pause.',
    'The spice box is consulted in a particular order. The order has not changed.',
  )
  addIf(isMuslim && ['Morocco', 'Algeria', 'Tunisia', 'Egypt', 'Jordan', 'Syria', 'Iraq', 'Saudi Arabia', 'Yemen', 'Burkina Faso', 'Mali', 'Senegal', 'Guinea'].includes(cn),
    'Coffee is ground and prepared in a way that takes longer than the drinking of it. This is the point.',
    'Bread is baked or bought fresh. The bread that is not fresh is a different bread.',
    'The meze or the mezze or the spread — not one thing but many, from which you take what you want.',
    'The mint tea is poured from height, for the foam. The pouring is part of the hospitality.',
  )
  addIf(['China', 'Japan', 'South Korea', 'Vietnam', 'Thailand', 'Malaysia', 'Taiwan', 'Singapore'].includes(cn),
    'Rice is the base of the meal in the way that mathematics is the base of the equation.',
    'Tea is poured before conversation begins. The conversation can wait for the pouring.',
    'The night market is lit and noisy and sells everything. The eating happens standing.',
    'The communal pot — hot pot, jjigae, shabu-shabu — is also the communal meeting.',
  )
  addIf(isWealthyArch && era >= 1960,
    'The supermarket is the weekly ritual. The trolley follows the same route. The choices are stable.',
    'The ingredients are available regardless of season now. Winter strawberries exist. You are still deciding how to feel about this.',
    'The cookbook was opened. Something new was made. This happens occasionally.',
    'The coffee is ordered with a specificity that would have seemed unusual twenty years ago.',
  )
  addIf(['Mexico', 'Colombia', 'Peru', 'Brazil', 'Argentina', 'Chile', 'Venezuela', 'Ecuador'].includes(cn),
    'The taquero, the empanada vendor, the arepero — they know your order.',
    'The meal is cooked to be shared. The sharing is the point of the cooking.',
    'The siesta is observed where it can be observed. The afternoon has its own relationship with urgency.',
  )
  addIf(['France', 'Italy', 'Spain', 'Portugal', 'Greece'].includes(cn) && era >= 1950,
    'The boulangerie, the panetteria, the panadería — the bread is bought fresh and this is not optional.',
    'The long lunch is not every day. But it is not a fantasy either.',
    'The wine with the meal is not celebration. It is calibration.',
    'The olive oil is poured without measuring.',
  )
  addIf(['Russia', 'Ukraine', 'Poland', 'Belarus', 'Romania', 'Hungary', 'Czech Republic'].includes(cn),
    'The black bread and the tea. These are not optional. These are the foundation.',
    'The pickled vegetables in the cellar or the cupboard — the preservation is the philosophy.',
    'Vodka or the equivalent is the parallel conversation to the official one.',
  )

  // ── WEATHER, SEASONS, CLIMATE ──────────────────────────────────────────────

  addIf(isSubsaharan && (cn === 'Nigeria' || cn === 'Ghana' || cn === 'Cameroon' || cn === 'Senegal' || cn === 'Guinea' || cn === 'Mali' || cn === 'Burkina Faso'),
    'The harmattan has arrived. The dust coats everything. The lips crack. The mornings are cold and the afternoons are hazy.',
    'The sky is white with harmattan dust. The sun is there, somewhere above it.',
  )
  addIf(['India', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Nepal', 'Vietnam', 'Thailand', 'Myanmar', 'Laos', 'Cambodia'].includes(cn),
    'The rains arrive on schedule or nearly — the sky changes in the afternoon, the smell before the first drop, then all at once.',
    'The monsoon means the road is also a river for the next few months. The navigation adjusts.',
  )
  addIf(isDeveloping && era <= 1980 && isRural,
    'The dry season is hot in a way the body eventually accepts as ordinary.',
    'The water is lower in the river now. Everyone has noticed.',
    'The rains came later this year than last. The planting adjusted.',
  )
  addIf(['Russia', 'Ukraine', 'Belarus', 'Poland', 'Germany', 'Norway', 'Sweden', 'Finland', 'Estonia', 'Latvia', 'Lithuania', 'Canada'].includes(cn),
    'The dark arrives earlier every day until the solstice. Then it retreats. You are at the part where it is still arriving.',
    'The cold requires specific preparation before leaving the house. The preparation is automatic.',
    'The heating is on. The sound of the radiator is the sound of the season.',
    'There is ice on the path. This is managed.',
  )
  addIf(['United Kingdom', 'Netherlands', 'Belgium', 'Ireland'].includes(cn),
    'The rain is neither unusual nor over. It is the condition.',
    'The grey sky is the default sky. The sun, when it arrives, causes comment.',
  )
  addIf(isWealthyArch && (arch === 'wealthy_west' || arch === 'post_soviet'),
    'The spring light returns at a different angle. People who were inside are now outside.',
    'The single tree that marks the year — the same tree in the same position, season after season.',
  )
  add(
    'A day when the rain makes the decision for you. You stay inside. There is a particular freedom in having the choice removed.',
  )

  // ── HOUSING ────────────────────────────────────────────────────────────────

  addIf(isDeveloping && era <= 1970 && isRural,
    'The compound is swept in the morning. The sweeping is the first act of the day.',
    'The walls are thick enough to keep the heat out. This is the building\'s oldest function.',
    'The cooking fire is outside. The smoke goes up. The food takes the time it takes.',
  )
  addIf(isDeveloping && isUrban,
    'The landlord lives in the same compound. The landlord-tenant relationship requires management.',
    'The alley between houses is the social space. The social space is always occupied.',
    'The power is out again. The candle or the lamp or the phone screen is lit.',
  )
  addIf(isWealthyArch && era >= 1960,
    'The neighbour above walks with a specific weight at a specific hour. You know this without having met them.',
    'The window faces a particular direction. What you see from it is your portion of the city.',
    'The building has its own sounds at night — the pipes, the lift, the street below.',
    'The apartment is the size it is. You have learned to fit your life into its dimensions.',
  )
  addIf(arch === 'wealthy_west' && era >= 1950,
    'The garden is the ongoing project that will not be finished. This is not a failure of the garden.',
    'The garage contains things that are not cars. This is the function of the garage.',
    'The neighbours can be seen from the kitchen window. The seeing is passive. The relationship is neighbourly.',
  )
  addIf(isDeveloping && (arch === 'subsaharan' || cn === 'India' || cn === 'Pakistan'),
    'The extended family is in the compound or near it. The privacy is negotiated.',
    'The aunties know what is happening because the compound is the unit, not the individual household.',
  )
  add(
    'The specific sound of your home at night. The pipes. The floorboard. The thing the street does at a certain hour.',
    'The view from the window at the same angle for years. The view has changed slightly. The angle has not.',
  )

  // ── BODY AND HEALTH (PHASE GATED) ─────────────────────────────────────────

  addIf(phase === 'young_adult',
    'The body does what you ask of it without much consultation. This will not always be true.',
    'You are ill for three days. The illness passes. The body reasserts itself.',
    'The energy at the end of the day is different from what it will be in ten years. You do not know this yet.',
  )
  addIf(phase === 'midlife',
    'The knee that was fine last year now has opinions about stairs.',
    'You are sleeping less deeply than you once did. The depth has been changing slowly for years.',
    'Something that took two days to recover from now takes four. The body is recalibrating.',
    'The reading glasses appeared this year, or last year, or are imminent. The print that was fine is now borderline.',
    'The grey in the hair has reached a percentage people comment on. You have decided how to respond.',
    'The blood pressure was checked. The number is what it is. You are doing what the number requires.',
  )
  addIf(phase === 'late_life',
    'The body has a morning now. It requires time before it is fully operational. This time is respected.',
    'The medication is organised in a way not necessary ten years ago. The organisation makes the taking reliable.',
    'Pain in a specific place that has been there long enough to have become familiar. You work around it.',
    'You are tired in the afternoon in a way that is different from being tired after not sleeping.',
    'The doctor said what the doctor said. You are doing what needs doing.',
    'The body is the primary project now in a way it was not before.',
  )
  add(
    'The specific pleasure of being well after being briefly unwell.',
    'You slept well last night. The not-noting-it is itself a kind of note.',
  )

  // ── COMMUNICATION AND MEDIA ────────────────────────────────────────────────

  addIf(era <= 1939,
    'The letter took two weeks to arrive and another two weeks to receive a response. The slow conversation has its own rhythm.',
    'The newspaper is read in a specific order. The order has not changed.',
  )
  addIf(era >= 1930 && era <= 1959,
    'The radio in the evening is not just information. It is company.',
    'The telephone call is short because it costs money. The shortness is efficient and slightly brutal.',
  )
  addIf(era >= 1940 && era <= 1979 && isWealthyArch,
    'The letter is written by hand. The handwriting reveals the mood of the writing.',
    'The television schedule is fixed. You are there for the programme or you miss it.',
  )
  addIf(era >= 1970 && era <= 1989 && isWealthyArch,
    'The answering machine message was left. You have been playing it back to check the tone.',
  )
  addIf(era >= 1990 && era <= 2009,
    'The text message arrives. Its abbreviations are now fluent to you.',
    'The email inbox has tripled in a year. The management of it is its own task.',
  )
  addIf(era >= 2010,
    'The WhatsApp message was sent at 11pm and read at 11pm. Both people know this.',
    'The group chat has many unread messages. You scroll up to find the one relevant to you.',
    'The phone was on the table during the meal. This is noted. The meal continues.',
    'A conversation that once required a letter now takes four minutes. The efficiency is not only a gain.',
    'You posted something and the response came immediately from somewhere you did not expect.',
  )
  addIf(era >= 2010 && isDeveloping,
    'The voice note is sent. The voice note is the preferred form — faster than typing, more precise than text.',
    'The diaspora family is in the group chat. The group chat is the compound, extended.',
  )

  // ── CHILDREN AT HOME ───────────────────────────────────────────────────────

  addIf(hasChildren && phase !== 'late_life',
    'The school run is the first deadline of the day. It is met, most days.',
    'The packed lunch is prepared. What goes in is a negotiation that has been conducted so many times it is no longer called a negotiation.',
    'The homework is supervised. The supervision requires a kind of patience that varies by subject.',
    'You are explaining something to a child and in the explaining you are thinking about the explanation for the first time.',
    'Something was broken. The breaking was not intentional. The consequence was negotiated.',
  )
  addIf(hasChildren && children.some(c => (c.age ?? 0) < 10),
    'A temperature at 2am. The forehead is felt. The medicine is found. The night continues.',
    'The bedtime story is the same story for the third time this week. The child does not yet know that knowing it is part of its function.',
    'The school play: their face in the crowd, then their face at the front, and the difference between those two.',
  )
  addIf(hasChildren && children.some(c => (c.age ?? 0) >= 12 && (c.age ?? 0) <= 18),
    'The teenager is home and not speaking. This is information.',
    'The curfew is a number being tested. You are holding the number.',
    'Their friends are at the house. The house is louder in a way that is, on balance, preferable to silence.',
  )
  addIf(hasChildren && (phase === 'midlife' || phase === 'late_life'),
    'They are the age you were when you made a specific decision. You watch them making their decisions.',
    'The phone call from the child who lives elsewhere. The briefness of it and also its sufficiency.',
  )

  // ── PARTNER TEXTURE ────────────────────────────────────────────────────────

  addIf(hasPartner,
    'The shorthand has evolved over years. A look replaces a paragraph.',
    'The morning begins with the same small gestures: the tea, the greeting, the resumption of the life.',
    'They are asleep before you. You listen to their breathing, as you have listened for years.',
  )
  addIf(hasPartner && phase === 'midlife',
    'The argument was about the specific thing and also about something else. You both know this.',
    'Something they said three days ago is still with you. You are deciding whether to say so.',
    'You have been doing this for long enough that the other person\'s moods are partially legible before they become visible.',
  )
  addIf(!hasPartner && (phase === 'young_adult' || phase === 'midlife'),
    'The table is set for one. This is a fact and not always just a fact.',
    'You cooked a meal for yourself. The silence after is the kitchen at night.',
    'The solo life has its textures — some of them preferred, some of them not preferred, most of them both.',
  )

  // ── COUNTRY AND ARCHETYPE SPECIFIC ────────────────────────────────────────

  addIf(cn === 'Nigeria',
    'NEPA has taken the light again. The generator starts, or does not start.',
    'The go-slow on the bridge: the danfo at a standstill, the hawkers moving between vehicles.',
    'The pepper soup is the conversation and the meal simultaneously.',
  )
  addIf(cn === 'Ghana',
    'The trotro moves when it is full, not before. This is the agreement.',
    'The dumsor schedule is consulted before planning. When the light goes affects what can be done.',
    'Kelewele from the roadside vendor: the fried plantain at that temperature, in that paper.',
  )
  addIf(cn === 'Kenya',
    'M-Pesa means the transaction happens on the phone. No bank required.',
    'Harambee — the collection for the funeral, the school fees, the hospital bill. You give what you can.',
    'The matatu has a conductor and a volume level that is non-negotiable.',
  )
  addIf(cn === 'Ethiopia',
    'The coffee ceremony takes time it is not in a hurry about. The time is given.',
    'The injera is spread on the communal plate. The eating is communal. The plate belongs to everyone.',
    'The fasting calendar means there are more vegetarian days than not. This is the cuisine\'s logic.',
  )
  addIf(cn === 'India',
    'The auto-rickshaw driver has a route opinion that differs from your route opinion. The negotiation is brief.',
    'The chai is available at every stop. The chai is the calibration of every transition.',
    'The cricket match is on. This is not an interruption. This is the afternoon.',
    'The head wobble contains meanings that require years to fully decode.',
    'The government office queue is managed with a patience developed over a generation.',
  )
  addIf(cn === 'Japan',
    'The station is on time. This is how it always is. The on-time-ness is not remarkable. Its absence would be.',
    'The bow of the greeting is calibrated to the relationship. The calibration is automatic.',
    'Silence in the Japanese context is not empty. It contains what is not being said.',
    'The vending machine has hot and cold options. This is routine and also still slightly miraculous.',
    'Hanami: the cherry blossoms last a week. The week is attended to.',
  )
  addIf(cn === 'South Korea',
    'Pali-pali: quickly, quickly. The speed at which things are expected to happen is the speed at which they happen.',
    'The collective meal — the banchan, the shared hotpot — is also the collective meeting.',
    'The sauna or jjimjilbang: the communal space, the egg, the flat television on the wall.',
  )
  addIf(cn === 'China',
    'The WeChat group has instructions in it before the meeting happens. The meeting confirms the group.',
    'The red envelope at Lunar New Year. The amount inside is a calculation based on relationship and circumstance.',
    'The high-speed rail between cities: the speed of it is not yet normal. The normal is arriving.',
  )
  addIf(cn === 'Brazil',
    'Saudade is the word for the feeling. The word is useful because it covers a range of loss other languages treat separately.',
    'The music is in the street. The street is musical by default.',
    'Jogo bonito: even when there is no match, the language of football is the ambient language.',
  )
  addIf(cn === 'Mexico',
    'The taquero who knows your order. The order has not changed.',
    'The combi stops wherever you need it to stop, approximately.',
    'The mercado: the noise, the colour, the vendor who will argue about the price affably.',
  )
  addIf(cn === 'Egypt',
    'The ahwa — the coffee shop — is where the afternoon goes. The backgammon, the tea, the conversation with no scheduled end.',
    'The traffic in Cairo is the background noise everything else is set against.',
    'Koshary from the koshary shop: the layers assembled in a specific order.',
  )
  addIf(['France', 'Belgium'].includes(cn),
    'The boulangerie line on Sunday morning is its own sociology. The baguette under the arm on the way back.',
    'The apéritif is not optional. It is the transition between the work and the evening.',
  )
  addIf(cn === 'United Kingdom' || cn === 'Ireland',
    'The queue is the queue. The queue is not questioned.',
    'The weather is discussed. This is not a failure of imagination. It is a social technology.',
    'The apology when someone steps on your foot. Both people apologise.',
    'The pub is the third space — not home, not work, but the other one.',
  )
  addIf(cn === 'Germany' || cn === 'Austria' || cn === 'Switzerland',
    'The recycling is separated. The separation is precise. The bins are labelled.',
    'Sunday is quiet in a way enforced rather than accidental.',
    'The directness: the thing is said. It is not cushioned. This is considered respect.',
  )
  addIf(cn === 'United States',
    'The small talk is in the elevator. The elevator stops. The small talk ends.',
    'The portion size is larger than necessary. This has become the expectation.',
    'The drive-through is an option. The option is taken.',
    'The cup of coffee is enormous and refillable and this is presented as a service.',
  )
  addIf(cn === 'Russia' || cn === 'Ukraine' || cn === 'Belarus',
    'The blat — the informal exchange, the favour, the who-you-know — is the parallel currency.',
    'Dacha in summer: the garden, the preserved vegetables, the specific freedom of the plot.',
    'The banya is the social event that is also a health practice that is also a negotiation space.',
  )
  addIf(cn === 'Cuba',
    'The resolver mentality — nothing is obtained without ingenuity. Ingenuity is a primary skill.',
    'The ration book: rice, oil, sugar, soap. The quantities are written down. The quantities matter.',
    'The solar on the roof and the bicycle on the street: the adaptation is local and brilliant.',
  )
  addIf(isPostSoviet,
    'The kiosk at the corner sells everything. The kiosk is the informal economy in miniature.',
    'The apartment building\'s staircase is lit or it is not. You know which it is.',
    'The courtyard between the bloki: the bench, the old women, the children, the version of community that survived.',
  )

  // ── CAREER FIELD SPECIFIC ──────────────────────────────────────────────────

  addIf(careerField === 'agriculture' || F('subsistence_farmer') || F('rice_farmer'),
    'The crop is what the rain made it this season. The rain was what it was.',
    'The market price for the harvest is the number that determines the year.',
    'Dawn is when the work begins. This has not changed in any of the years of your working life.',
    'The soil needs what the soil needs. You know this from years of consulting it.',
  )
  addIf(careerField === 'education',
    'The classroom at 8am before the students arrive: your version of silence.',
    'A student is struggling. You have noticed. You are deciding whether to intervene and how.',
    'The marking is done at the kitchen table at night. The pile does not diminish as fast as it should.',
    'Someone you taught years ago appears — in a news article, in a chance meeting. You remember their face.',
  )
  addIf(careerField === 'healthcare',
    'The end of a shift that was difficult in a specific way. The transition home is managed.',
    'You have seen things you do not take home. The not-taking-home requires practice.',
    'The patient you remember from last week. The update on what happened to them.',
  )
  addIf(careerField === 'business' || careerField === 'finance',
    'The meeting could have been an email. It was a meeting.',
    'The desk has a particular arrangement. When someone moves something, you notice.',
    'Lunch is a demarcation. The thirty minutes are the owned part of the workday.',
  )
  addIf(careerField === 'manufacturing' || careerField === 'construction',
    'The whistle or the bell marks the shift. The shift has a rhythm the body knows.',
    'The repetitive motion enters the body\'s memory after months. The body does it without the mind.',
    'You know the machine\'s moods. The machine is not well today. You work around it.',
  )
  addIf(F('market_stall') || F('market_vendor') || F('hawker') || F('informal_trader'),
    'The position in the market is yours by precedent and time. The precedent is its own ownership.',
    'The inventory is checked. The reorder is calculated.',
    'The credit extended to the regular customer is an investment in a relationship.',
    'Rain on a market day: the covering of goods, the decision to stay or to go.',
  )
  addIf(careerField === 'arts' || careerField === 'media' || careerField === 'entertainment',
    'The project you are working on is the best thing you have done so far, or you believe it is, which may or may not be the same.',
    'The rejection arrived. The recovery from rejection takes less time than it used to. This is called experience.',
  )
  addIf(F('domestic_worker') || F('house_girl') || F('housekeeper'),
    'The keys to a house that is not yours. The intimacy of other people\'s private lives, seen from the position of the person who cleans them.',
    'You know where everything is in their house. You know which cupboard sticks.',
    'The end-of-year bonus is given with a certain accompanying gesture. This is noted.',
  )

  // ── FINAL CATCH-ALL (always available) ─────────────────────────────────────
  add(
    'The year passed in the way that years pass — faster than the days suggested it would.',
    'You did the ordinary thing on the ordinary day and it added up to the year.',
    'Nothing about the day required naming. The day did not mind.',
    'The week had a middle and an end and the end arrived.',
    'You went somewhere and came back and the somewhere and the coming back were both ordinary.',
    'A small thing happened that you will not remember in ten years. At the time it occupied you for an afternoon.',
    'You looked out the window at a particular moment. What you saw was unremarkable. You looked at it anyway.',
  )

  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}
