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
  const desire = state.desire ?? null
  const currentCn = state.currentCountry ?? cn

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

  // ── EXPANSION BLOCK 2 ──────────────────────────────────────────────────────

  // ── LIFE-STAGE BODY AWARENESS (MORE GRANULAR) ─────────────────────────────

  addIf(phase === 'childhood' && age >= 6 && age <= 9,
    'Your legs are longer than they were. You measured yourself against the door frame and made a mark.',
    'The loose tooth is the central fact of the week. You cannot stop touching it.',
    'Running is still the default speed. Walking is what adults do.',
    'A bruise appeared on your knee without you remembering how it arrived. This happens frequently.',
    'You are hungry again. You were just hungry an hour ago.',
    'The new shoes are stiff. They will soften. You know this from before.',
  )
  addIf(phase === 'childhood' && age >= 10 && age <= 12,
    'The body is starting to change in ways you have been told about but did not quite believe would apply to you.',
    'You are stronger than you were last year. This is verifiable. You have tested it.',
    'Something about your voice is slightly different from how it was. You are listening for the difference.',
    'The energy at 10am on a Saturday morning is a specific quantity the adult body will spend decades missing.',
  )
  addIf(phase === 'adolescence' && age >= 13 && age <= 15,
    'The body is operating under instructions you were not consulted about.',
    'The face in the mirror is not quite the face from last year. You are still taking this in.',
    'The hunger is a different hunger now — more frequent, more specific, and vast.',
    'The skin requires management that was not required at eleven.',
    'You are aware of your hands in a way you were not before. They feel provisional.',
  )
  addIf(phase === 'adolescence' && age >= 16 && age <= 17,
    'The body is mostly itself now. The uncertainty of the last two years is resolving.',
    'You can stay awake later than you could at thirteen, and the staying awake feels like something was unlocked.',
    'The physical confidence — the sureness of where you are in space — has arrived. You don\'t notice because it has.',
  )
  addIf(phase === 'young_adult' && age >= 18 && age <= 22,
    'The body is at the peak it may never discuss. You are not thinking about the peak. You are using it.',
    'The hangover lasts one day, not two. This seems correct and will not always be true.',
    'You are not tired after a night of little sleep in the way you will be at thirty-five.',
    'Everything heals faster than it will. This is being spent without being counted.',
  )
  addIf(phase === 'young_adult' && age >= 23 && age <= 29,
    'The back hurts after sitting for too long. This is new information.',
    'The recovery time after illness has quietly extended by a day since your early twenties.',
    'You are running or exercising because you want to, or because you have started to think about what happens if you don\'t.',
    'The knees give no trouble yet. You have been warned about the knees.',
  )
  addIf(phase === 'midlife' && age >= 35 && age <= 45,
    'The reading glasses are not yet necessary but the light needs to be better.',
    'The five kilos that arrived in the last two years are being negotiated with.',
    'Something about the morning is slower than it was. You have started to account for this.',
    'The thing that happened to your shoulder. The thing has resolved to a certain level and stayed there.',
    'The body that used to be incidental is becoming something that requires a position.',
  )
  addIf(phase === 'midlife' && age >= 46 && age <= 49,
    'The sleep is lighter. You hear things at 3am that your younger self slept through.',
    'The metabolism has revised its terms without sending a notification.',
    'The eyes, the back, the knee, the wrist: the body is presenting a list.',
  )
  addIf(phase === 'late_life' && age >= 50 && age <= 65,
    'You measure your wellness now by what you can still do easily rather than what you cannot do at all.',
    'The stairs are taken one at a time in the mornings. By midday the stairs are fine.',
    'The annual check: what the numbers say, what you are doing about what the numbers say.',
    'The reading glasses are permanent now. They are the first thing on and the last thing off.',
    'You walk more than you run. The walking is deliberate. The deliberateness is not loss.',
  )
  addIf(phase === 'late_life' && age >= 65,
    'The body is older than you feel. There is a consistent ten-year lag between the body and the person inside it.',
    'Sleep is different — shorter in one stretch, possible in the afternoon. You have reorganised around this.',
    'The cold takes longer to leave the bones in the morning than it did at fifty.',
    'Digestion has opinions. The opinions are new. They are heeded.',
    'Someone offers you their seat. You are deciding whether you are at the age to accept this. The answer is not clear.',
    'The hands show the years. You look at them sometimes in neutral light.',
  )

  // ── SPECIFIC OCCUPATIONS ───────────────────────────────────────────────────

  addIf(careerField === 'education' && phase === 'midlife',
    'A student asks a question you cannot answer immediately. This happens rarely now. When it happens it is welcome.',
    'You have been teaching long enough to see the effect: a former student doing the thing you hoped they would do.',
    'The school year ends with a particular sensation — not quite relief, not quite emptiness. Both at once.',
  )
  addIf(careerField === 'education' && isSubsaharan,
    'The classroom has no chalk. You manage. The learning proceeds anyway.',
    'Forty-three students. The register is called before anything else can happen.',
  )
  addIf(careerField === 'healthcare' && phase === 'young_adult',
    'First week: the hospital is louder than you expected. The loudness becomes background and then normal.',
    'The long shift ends. You are not hungry in the way you expected. You are the other kind of empty.',
    'The patient who recovered: you know their name because you wrote it down and checked every day.',
  )
  addIf(careerField === 'healthcare' && phase === 'midlife',
    'You can tell within two minutes of meeting a patient whether the story they\'re telling is complete.',
    'The burnout is a technical term. You know what the early stages feel like because you have been at the early stages before.',
    'You choose the harder rotation because you are still choosing the harder thing.',
  )
  addIf(careerField === 'healthcare' && isDeveloping,
    'The supplies ran out three weeks ago. You are managing the gap between what is needed and what is available.',
    'The patient came from three hours away on a road that is only navigable in the dry season.',
    'There is one stethoscope for the morning shift. You pass it between you.',
  )
  addIf(F('nurse') || (careerField === 'healthcare' && gender === 'female'),
    'The practical knowledge is not the same as the theoretical knowledge. The practical knowledge arrived over years and cannot be summarised.',
    'The family asks you the question they cannot ask the doctor. You answer it as well as you can.',
  )
  addIf(careerField === 'agriculture' && isRural,
    'The planting follows the rains or the irrigation or the almanac passed down from someone who observed more carefully.',
    'The harvest is in. The next question is the price at the market and the debt that predated the harvest.',
    'You read the soil by touch and smell and the history of what this patch has done in previous seasons.',
    'The animal is sick. The sick animal means the possible loss of something that took two years to reach its value.',
    'The good season is not a guarantee of the next season. You know this and plant anyway.',
    'The field at first light: the particular grey-gold of dawn across the earth before the heat arrives.',
  )
  addIf(careerField === 'agriculture' && cn === 'India' && phase === 'midlife',
    'The moneylender is not an abstraction. He has a name and a house in the village. The debt has a face.',
    'The son is studying in the city. The son does not want to farm. The farm does not know this.',
  )
  addIf(careerField === 'military' || F('veteran') || F('soldier_arc_started'),
    'The discipline is still in the body. You eat fast. You wake fast. The body remembers.',
    'A sound that resembles a specific other sound. You were back somewhere briefly. Then you were not.',
    'The uniform is not worn anymore. The posture it required is.',
  )
  addIf(careerField === 'military' && phase === 'young_adult',
    'The authority structure is so total and legible that its absence, when you are outside it, requires adjustment.',
    'You sleep in a room with eleven other people and this is fine now and was fine from the second week.',
  )
  addIf(F('clergy') || F('ordained') || F('yeshiva_student'),
    'The morning office. The texts known well enough that they come without searching. The texts are not empty for being known.',
    'The question a parishioner asked that you are still thinking about. The question was about ordinary loss.',
    'The community sees you in a function. You are also a person who sees yourself in other ways.',
  )
  addIf(isMuslim && F('clergy'),
    'The sermon needs preparing. The preparation is the same length as the delivery every time.',
    'The iftar you hosted: the table, the timing, the particular hospitality of that month.',
  )
  addIf(F('taxi_driver') || F('moto_taxi') || F('boda_boda'),
    'The route from the airport is the lucrative route. The route from the market is the daily route. The routes are known differently.',
    'The passenger who talked for the entire journey. The passenger who did not speak at all. The day gives both.',
    'The vehicle needs what it needs. The cost of the need is calculated.',
    'You know this city at 5am in a way that people who do not drive for a living do not know it.',
  )
  addIf(F('market_stall') || F('shopkeeper') || F('informal_trader'),
    'The morning arrangement of the goods: the same order, the same positions, the same opening.',
    'A regular who has not come for three weeks. You have noticed this.',
    'The school holidays change the traffic. The change is welcome when it brings more custom. Less welcome when it does not.',
    'Someone haggles for something they clearly can afford. You recognise this and factor it into the negotiation.',
  )
  addIf(careerField === 'construction' && isRural,
    'The labourer\'s day begins before the sun is fully up. By noon the sun is fully up and the work is at full heat.',
    'The hands at the end of the first year: no longer new to this.',
    'The materials shortage means today is the day of waiting for the lorry, not the day of building.',
  )
  addIf(careerField === 'manufacturing' && isPostSoviet,
    'The factory was full when you started. There are fewer people on the line now. You have not asked about this directly.',
    'The quota is the quota. Whether it makes sense is a separate conversation.',
  )
  addIf(F('cook') || careerField === 'service' || F('chef'),
    'The kitchen at 6pm on a Friday: the specific pressure of the full dining room behind you.',
    'The recipe is yours now. You changed it twice. The second change made it.',
    'You taste things differently than non-cooks do. The difference is in what you are tasting for.',
    'The knife is sharp. The sharp knife is not a luxury. It is the foundation of the work.',
  )
  addIf(careerField === 'service' && isDeveloping,
    'The tip, if there is a tip, is the difference between the week being manageable and the week being difficult.',
    'You are in people\'s homes and people\'s hotels and people\'s offices and you are there to be minimally noticed.',
  )
  addIf(F('domestic_worker') && isDeveloping,
    'You speak their children\'s names more often per day than your own children\'s names, because your children are in the village.',
    'The uniform, if there is one. The boundary it marks is understood by both parties and by neither of you.',
  )

  // ── ETHNIC MINORITY / DIASPORA TEXTURE ────────────────────────────────────

  addIf(F('first_generation_immigrant') || F('emigrated'),
    'The thing you say when someone asks where you are from: the sentence is long by necessity.',
    'The accent is still there or nearly there or there on certain words. You hear it on recordings.',
    'You read the language of the country you are in but sometimes you think in the language you left.',
    'A smell — from a restaurant, from a stall, from someone\'s bag — takes you somewhere you are not.',
    'The rules here are slightly different from the rules there. The difference is small and persistent and requires constant attention.',
    'You understand the joke but you understood it a beat late. The timing is still arriving.',
    'The network is other people from the same place. The network is practical and social and emotional all at once.',
    'You dream in both languages. You wake unsure which one you were speaking.',
  )
  addIf(F('first_generation_immigrant') && phase === 'young_adult',
    'You are learning the unspoken codes — which queue to join, when to push, when to wait, how to read the silence.',
    'The loneliness is not permanent. It is specific to the first year and then the second, and then it changes shape.',
    'The person who helped you when you first arrived. Their name is remembered.',
  )
  addIf(F('first_generation_immigrant') && phase === 'midlife',
    'You are no longer from there in the way you once were. You are not entirely from here in the way others are.',
    'The children are more from here than you are. This was the purpose and also, sometimes, the loss.',
    'The trip back — the airport, the smell of the air, the relatives who have aged. You are also a stranger there now.',
    'The accent that used to be yours is the accent of your parents now. Your children call it old-fashioned.',
  )
  addIf(F('diaspora') || F('first_generation_immigrant'),
    'Your name is mispronounced. You decide in the moment whether to correct it. Sometimes you do. Sometimes you don\'t.',
    'You are the only person of your background in the room. This is not always remarkable. It is always known.',
    'The question about your food, your holiday, your family structure: explained again, slightly differently.',
    'Home is the wrong word for either place, but both places are called it.',
  )
  addIf(F('diaspora') && phase === 'late_life',
    'The country you left has changed in ways you know only from the news and from phone calls. Your grief for it is for a place that no longer entirely exists.',
    'The visit, if you make it, is a tourist visit now. The neighbourhood remembers you differently than you remember it.',
  )
  addIf(arch === 'wealthy_west' && F('first_generation_immigrant') && isMuslim,
    'The question in the meeting, or at the party, or in the taxi: where are you really from.',
    'Ramadan at work: the explanation, the accommodation, the occasional curiosity that is kindness and the curiosity that is not.',
  )
  addIf(arch === 'wealthy_west' && F('first_generation_immigrant') && cn !== 'United States' && cn !== 'United Kingdom' && cn !== 'Canada' && cn !== 'Australia',
    'Your papers are current or almost current. The currency of the papers requires maintenance.',
    'The visa renewal: the form, the fee, the waiting, the specific anxiety of a life contingent on a decision you did not make.',
  )

  // ── NEIGHBORHOOD TIER TEXTURE ──────────────────────────────────────────────

  addIf(F('neighborhood_elite'),
    'The street is quiet in a way that is not the absence of people but the presence of distance between them.',
    'The school the children go to: the school is known by name in certain circles.',
    'The security guard at the gate knows your car. The gate opens before you slow down.',
    'The neighbours are seen at the same events. The relationship is cordial and does not extend past the cordial.',
    'The cleaner, the driver, the gardener: the staff. The relationship has an etiquette known to both sides.',
    'The house has more rooms than are occupied most of the time.',
  )
  addIf(F('neighborhood_elite') && isDeveloping,
    'The generator runs all night. Inside this compound the power never cuts. Outside it, it does.',
    'The estate walls are high. What is on the other side of them is the other city, the one that exists concurrently.',
    'The compound is guarded because the fear is real and because the fear is inherited from the parents and because both.',
  )
  addIf(F('neighborhood_working_class') || isWorkingClass,
    'The building knows all its residents\' business. The walls are not indifferent.',
    'The corner shop is the shop of last resort and the shop of daily life simultaneously.',
    'The bus stop is the neighbourhood\'s common room. You know the regulars by face if not by name.',
    'The park, if there is one, is small and the grass does not recover from summer.',
    'The landlord is a presence in the background, not physically but financially.',
  )
  addIf(F('neighborhood_informal') || (isDeveloping && isPoor),
    'The lane to your door is navigable in the dry season and a negotiation in the rainy one.',
    'The standpipe is shared between seven households. The schedule for the water is informal but respected.',
    'Noise is the condition: the neighbour\'s radio, the generator, the children, the vehicles on the unmade road.',
    'The settlement extends in a direction that was empty land three years ago.',
    'Everyone knows what has happened in the settlement by noon if it happened in the morning.',
    'The community is dense in the way that economies are dense when space is scarce.',
  )

  // ── CASTE SYSTEM (INDIA / SOUTH ASIA) ─────────────────────────────────────

  addIf(cn === 'India' && F('caste_discrimination'),
    'The seating in the classroom, the access to the well, the welcome at the temple: the caste does the work of thousands of small exclusions.',
    'You do not say the caste name out loud in certain company. You do not need to. It is already known.',
    'Someone addresses you in a way that assumes the hierarchy. You have been addressed this way your whole life.',
    'The job posting requires qualifications you have. The interview has a different set of requirements, unwritten.',
  )
  addIf(cn === 'India' && F('dalit_identity'),
    'Ambedkar\'s photograph is on the wall. The calendar below it marks what has happened and what has not.',
    'The name alone is sometimes enough. Sometimes the name arrives before you do.',
    'You know which spaces in this city are yours by custom and which are available to you only by right, and the difference between those two things.',
    'The conversion question: some have. You have watched and thought and not resolved.',
    'The reservation: what it meant for your parents, what it means for your children, what it means in the room where that conversation happens without you.',
  )
  addIf(cn === 'India' && F('caste_discrimination') && phase === 'young_adult',
    'The campus is more mixed than the village was. The mixing is not complete. The old maps are legible under the new ones.',
  )
  addIf((cn === 'India' || cn === 'Nepal' || cn === 'Pakistan' || cn === 'Sri Lanka') && isHindu && !F('dalit_identity') && !F('caste_discrimination'),
    'The caste is the background frequency. Most days it runs without your attention. Some days it requires it.',
    'A marriage proposal collapses on a number that was not announced. The number is the sub-caste.',
  )

  // ── LANGUAGE AND MULTILINGUALISM ───────────────────────────────────────────

  addIf(F('multilingual') || F('minority_language_speaker'),
    'You switch between languages within the same sentence in the company of people who follow. The switching is fluency of a different order.',
    'There is a feeling in one language that has no word in the other. You have learned to navigate around the gap.',
    'Your children understand the home language but answer in the school language. The gap opened slowly and you noticed too late.',
    'The dream came in one language but the memory of it came in another.',
  )
  addIf(F('minority_language_speaker'),
    'You speak the official language at work and the real language at home. The word "real" requires defending.',
    'The language your parents spoke is spoken by fewer people this decade than last. This is not a metaphor. This is arithmetic.',
    'Someone asks you to say something in your language. You say it. They smile. You have become a novelty in your own tongue.',
  )
  addIf(F('language_shame') || F('assimilated'),
    'You learned not to use the old language in public. The learning happened quickly, as learned shame does.',
    'The word you wanted was in the language you were told not to use. You found a substitute. The substitute did not cover the same ground.',
  )
  addIf(cn === 'Ireland' && era <= 1980,
    'Irish is spoken in the family or it is not, and if it is not, the not-speaking is also a kind of statement.',
    'The Gaeltacht summer: the language as holiday, the language as heritage, the language as project.',
  )
  addIf(cn === 'India' || cn === 'Pakistan' || cn === 'Sri Lanka' || cn === 'Nigeria' || cn === 'Cameroon',
    'The language of the home is not the language of the school is not the language of the government. You carry three.',
    'Code-switching is not thinking about switching. It is switching without thinking.',
  )
  addIf(isPostSoviet && era >= 1990 && F('minority_language_speaker'),
    'The old language is being used on the street now in a way it was not before. The public use is new. You are not fully accustomed to it.',
    'Russian was the language of the job. The language of the job is changing. The change is not without cost.',
  )
  addIf(cn === 'Morocco' || cn === 'Algeria' || cn === 'Tunisia',
    'The Arabic of the mosque, the French of the office, the Darija of the house: three registers and you navigate all of them.',
    'Amazigh — Tamazight, Kabyle, Tachelhit — is your home language and until recently was not official. The officiality is new. The language is old.',
  )
  addIf(cn === 'Belgium' || cn === 'Switzerland',
    'The question of which language you address a stranger in. The question is briefly political.',
  )

  // ── MORE COUNTRY-SPECIFIC TEXTURE ─────────────────────────────────────────

  addIf(cn === 'Indonesia',
    'Inshallah and Alhamdulillah: the language is punctuated with God, and the punctuation is not formal.',
    'The ojek — the motorcycle taxi — is faster than the car in the Jakarta traffic, and the Jakarta traffic is the kind of traffic that makes you reconsider the car.',
    'Nasi goreng at midnight from the cart that appears as if the street made it. The egg is fried on top.',
    'Gotong royong: the collective work. The wall of the community hall built in a day by everyone who showed up.',
    'The batik — the particular colour of it, the particular occasion — signals something before a word is spoken.',
  )
  addIf(cn === 'Philippines',
    'Bayanihan: the community in motion, the house being lifted and moved, the shared effort that is also the social fabric.',
    'The jeepney is decorated beyond function. The function continues despite the decoration.',
    'OFW: the family in the house is partly funded by the family not in the house. The remittance is the thread.',
    'Ninong, ninang: the godparent network extends the family in a way that requires maintenance but also provides.',
    'The typhoon season is not a metaphor. The preparation is literal: the taping of windows, the buying of rice.',
  )
  addIf(cn === 'Vietnam',
    'Phở in the morning, before anything else. The broth is bones and time.',
    'Xin chào: the greeting is the entryway to all transactions. The entryway matters.',
    'The ancestor altar: the incense, the photo, the offering. The dead are close and require acknowledgement.',
    'The motorbike traffic is not chaos. It is a system with rules that cannot be written down.',
    'The market begins before 6am and is half done by the time the city wakes.',
  )
  addIf(cn === 'Thailand',
    'The wai: the pressed hands, the small bow, the calibrated deference. The calibration is automatic.',
    'The spirit house outside the building: the daily offering, the small jasmine, the incense.',
    'The night market at 9pm: the food stalls, the light, the families eating at plastic tables.',
    'The King\'s image is everywhere and this is not noticed by people who have always been here.',
    'Sawadee kha, sawadee krap: the greeting has a gender particle and its use is the smallest signal of respect.',
  )
  addIf(cn === 'Turkey',
    'Çay: the tea glass, the glass shaped like a tulip, drunk constantly and in quantity.',
    'The hamam — the steam room, the marble slab, the accumulated heat — is a social institution that predates the republic.',
    'The evening call to prayer over Istanbul: the specific overlap of five mosques, the sound slightly out of phase with itself.',
    'The evil eye bead on the wall or the car or the wrist: the belief is cultural even where it is no longer strictly religious.',
    'The argument about politics at the dinner table: conducted at volume, resolved or not, the food consumed throughout.',
  )
  addIf(cn === 'Iran',
    'Ta\'arof: the ritual refusal and the ritual offering and the ritual acceptance. The sequence must complete.',
    'The chelo kabab on a Thursday: the rice, the butter, the saffron crust from the bottom of the pot.',
    'The roof in summer: the mattress, the stars, the sleeping outside that requires no decision once it\'s known.',
    'The private and the public are two countries in this country. You move between them with the change of shoes at the door.',
    'The BBC Persian Service through the shortwave: the signal fades and clears and fades.',
  )
  addIf(cn === 'Saudi Arabia',
    'Qahwa — the cardamom coffee, pale and bitter — poured in the small cup, refilled without asking.',
    'The prayer schedule is the day\'s skeleton. The city quiets and the shops close and then they open.',
    'The hospitality is not optional. The guest must be fed. The feeding is the relationship.',
    'The women\'s section and the men\'s section: the separation organises the space before anything else does.',
    'The heat of Mecca in summer is a heat that becomes part of the memory of Hajj.',
  )
  addIf(cn === 'Morocco',
    'Mint tea, three times: the first is as strong as life, the second as gentle as love, the third as sweet as death.',
    'The medina\'s lanes are too narrow for the car. They are exactly wide enough for what they carry.',
    'The muezzin from the mosque in the old city and the muezzin from the mosque in the new city do not quite synchronise. Both are right.',
    'The call of "Balak! Balak!" — the mule coming through, the crowd parting — is the medina\'s punctuation.',
    'Friday is different. The mechanics of the day change around the midday prayer.',
  )
  addIf(cn === 'Tunisia',
    'The afternoon in summer belongs to shade and to waiting. The heat requires the suspension of ambition.',
    'Harissa on the table beside everything else. The level of heat is personal.',
    'The café for the afternoon: dominoes, the state of things, the tea.',
  )
  addIf(cn === 'Algeria',
    'Café maure: the old men with dominoes, the conversation at the volume of people who have known each other for forty years.',
    'The afternoon nap is not laziness. It is the management of the afternoon sun.',
    'Rai on the radio: the sound of the city in a way that other music is not.',
  )
  addIf(cn === 'Senegal',
    'Teranga: the hospitality is not an obligation. It is an identity.',
    'Thiéboudienne: the rice and fish cooked together in the pot. The pot feeds whoever is present.',
    'The xalam music in the evening from somewhere nearby. It is not coming from inside. It is coming from the next life over.',
    'The marabout\'s gris-gris: the protection is worn at the wrist or the neck. The belief is older than the Islam that surrounds it.',
  )
  addIf(cn === 'Tanzania',
    'Karibu: the welcome. The welcome is expected and also meant.',
    'Ugali with sukuma wiki: the meal that does not vary because it does not need to.',
    'Swahili spoken in the street, in the shop, in the school: the shared language of strangers.',
    'The evening prayers over the town: the sound carries to where you are.',
  )
  addIf(cn === 'Uganda',
    'Matoke — the steamed plantain — is the starch the meal organises itself around.',
    'The boda-boda driver knows which roads the police are on. He adjusts.',
    'Sunday: the church fills to capacity and then beyond. The singing comes out through the open doors.',
  )
  addIf(cn === 'Zambia',
    'Nshima with relish. The relish changes with the season and the economy. The nshima does not.',
    'The copper belt\'s history is the country\'s history, and the copper belt\'s decline is a fact everyone in the country feels eventually.',
  )
  addIf(cn === 'Zimbabwe',
    'The hundred trillion dollar note is a museum piece now. But the memory of what a hundred trillion dollars could not buy is not a museum piece.',
    'Braai on Sunday: the fire, the meat, the longer afternoon.',
    'The mobile money fills the gap the cash used to fill. The gap never fully closed.',
  )
  addIf(cn === 'Argentina',
    'Mate: poured, passed, no sugar if you are serious about it. The passing is the ritual.',
    'The parrilla: the meat, the slow heat, the Sunday afternoon that has no scheduled end.',
    'The therapist is not a luxury here. Almost everyone has one. The therapy is practical.',
    'Buenos Aires walks at night. The city\'s social life begins when other cities\' is ending.',
    'The tango is not for tourists only. It is still danced in the milonga at midnight by people who have been doing it for thirty years.',
  )
  addIf(cn === 'Colombia',
    'Tinto: the small black coffee, drunk frequently. The coffee is from here. Everyone knows this.',
    'The ajiaco: the potato soup with chicken and herbs. The soup of Bogotá, of cold altitude, of being home.',
    'The cumbia from somewhere in the building. The sound does not require an occasion.',
    'A city that was dangerous and is safer now: the before and after are both in the same streets.',
  )
  addIf(cn === 'Chile',
    'The Andes on a clear day from Santiago: white and vast and present. The mountains are not decoration.',
    'Empanadas de pino: the pastry with onion and egg and meat and olive. The making of them requires an afternoon.',
    'Cueca: the national dance, the handkerchief, the courtship in miniature. Performed at the fondo, at the school, at the festival.',
  )
  addIf(cn === 'Peru',
    'Ceviche: the lime has been doing its work since morning. You eat it at noon.',
    'The altitude in Lima is the coast. The altitude in Cusco is the other thing — the thing that takes a day to adjust to.',
    'Chicha morada: the purple corn drink, cold, slightly sweet. Sold everywhere. Distinct to here.',
  )
  addIf(cn === 'Canada',
    'The hockey game on. The hockey game is the shared room everyone enters regardless of the door they came through.',
    'The Tim Hortons line is a social compact.',
    'The apology: reflexive, genuine, slightly over-applied.',
    'The winter is long and requires management. The management is part of the national character.',
    'Multiculturalism is policy here. The policy is not always the practice. The gap between them is where most conversations happen.',
  )
  addIf(cn === 'Australia',
    'Arvo: the abbreviation of the afternoon. Everything here gets abbreviated.',
    'The beach is not a destination. It is the local park for half the population.',
    'The flat white — the café culture — arrived earlier here than in some places and spread faster.',
    'The flies in summer require a hat and a certain equanimity.',
    'The vast interior is a fact you have not personally visited. It is still the country\'s most important fact.',
  )
  addIf(cn === 'New Zealand',
    'Kia ora: the greeting. Said to everyone, including strangers. The inclusion is the point.',
    'The All Blacks: the game is the country\'s common language in the way few things manage to be.',
    'The hāngī: the earth oven, the hours of cooking, the gathering for the eating.',
  )
  addIf(cn === 'Sweden' || cn === 'Norway' || cn === 'Denmark',
    'Lagom: exactly enough. Not too much, not too little. The concept is the social thermostat.',
    'Friluftsliv: outdoor life not as recreation but as requirement. The forest at the weekend is not a choice. It is hygiene.',
    'The long summer light: 10pm and the sun has not set. The body does not know what to do with this and is grateful.',
    'The dark months: the candles on the windowsill are functional before they are decorative.',
    'Fika: the coffee break that is more than the coffee. The pause is the point.',
  )
  addIf(cn === 'Netherlands',
    'The bicycle is not a vehicle of leisure. It is the vehicle. Everything happens on the bicycle or because of the bicycle.',
    'Directness is not aggression here. The thing is said plainly. This is considered courtesy.',
    'The polder: the land below sea level, the history of collective water management, the dikes that require ongoing belief.',
  )
  addIf(cn === 'Spain',
    'The siesta is not everywhere anymore. But where it still is, it is sacred.',
    'Tapas are not a starter. They are the form. The social form.',
    'The noise of a Spanish Sunday: the family lunch that runs until 5pm, the children at volume, the television in the other room.',
    'The vermouth before lunch is not serious drinking. It is appetiser-as-ritual.',
  )
  addIf(cn === 'Italy',
    'The espresso at the bar, standing. The espresso is drunk in forty seconds. This is the correct time.',
    'The passeggiata: the evening walk with no destination, the seeing and being seen, the version of social life that requires only movement.',
    'Sunday lunch: the pasta first, then the meat, then the fruit, then the cheese, then the espresso, then the argument, then the nap.',
    'The family at the table: no plate serves one person. Everything is shared and the sharing is the point.',
  )
  addIf(cn === 'Poland',
    'Bigos: the hunter\'s stew, the sauerkraut and meat slow-cooked. The smell of it fills the apartment in a specific way.',
    'The coffee-house as culture: the conversation over coffee that runs until the café closes.',
    'The hospitality: you are offered food before you can sit down. Refusing is not accepted.',
  )
  addIf(cn === 'Hungary',
    'Lángos at the market: the fried dough with sour cream and cheese. Not every day. But there on the day you want it.',
    'Thermal bath culture: the pool, the steam, the conversation at low volume, the specific relaxation of very hot water.',
    'The csárda on a special evening: the violin coming to the table, the paprika in everything.',
  )
  addIf(cn === 'Romania',
    'Mămăligă with cheese and sour cream: the polenta that has been on every table in this country for three hundred years.',
    'The Orthodox Easter: the midnight service, the candles passed from flame to flame, the street outside the church full.',
    'Sarmale at the family table: the stuffed cabbage rolls, the smell of them cooking from the morning.',
  )
  addIf(cn === 'Serbia',
    'Rakija: poured when you arrive, poured when you leave, poured during the conversation between.',
    'The kafana: the restaurant that is also the social institution. The smoke, the music, the long evening.',
    'Ćevapi at the market: the small grilled sausages, the bread, the kajmak.',
  )
  addIf(cn === 'Georgia',
    'The supra: the feast, the toastmaster, the toast that is a small speech, the wine from the qvevri, the table that does not empty.',
    'Khinkali: the dumplings held by the knot at the top, the broth inside released by the first bite. Eating them requires instruction.',
    'The polyphonic singing from the table or the church: three voices doing what four voices cannot.',
    'The wine: it predates all the wine in the other countries by several millennia and the Georgians know this.',
  )
  addIf(cn === 'Armenia',
    'Lavash: the flatbread baked on the tonir. The baking of it is ancestral. The UNESCO listing was recent.',
    'Dolma: the stuffed grape leaves. The making of them is the afternoon before the evening.',
    'The cognac — Armenian brandy — is what is poured for guests and is better than many things with French names.',
    'The genocide is the long shadow. It is in the family stories and in the silence where some of the family stories should be.',
  )
  addIf(cn === 'Azerbaijan',
    'Plov: the rice with saffron and dried fruit. The dish of celebration and of Tuesday.',
    'The tea with jam: the jam held in the mouth and the tea drunk through it.',
  )
  addIf(cn === 'Kazakhstan',
    'Beshbarmak: the meat and noodles and onion eaten with the hands. The name means five fingers.',
    'The steppe in spring: the grass suddenly everywhere after the brown. The green is a shock every year.',
    'Kumiss: the fermented mare\'s milk. Offered to guests as milk is offered in other countries.',
  )
  addIf(cn === 'Pakistan',
    'Chai at 6am and then again at 11am and then again after the afternoon prayer. The tea is always.',
    'Biryani on Sunday: the rice, the whole spices, the meat, the slow oven. Sunday smells like this.',
    'The host insists. You decline once. You decline twice. On the third offer you accept. The sequence is the protocol.',
    'The load-shedding schedule posted on the door: when the power will be off, which hours, which days.',
  )
  addIf(cn === 'Bangladesh',
    'Ilish: the hilsa fish. The national fish. The rice and ilish in monsoon season is the meal that marks the season.',
    'The rickshaw: the streets of Dhaka at this density, the handlebars, the painted canopy above.',
    'The rice is the foundation. What is on top of the rice is the commentary.',
  )
  addIf(cn === 'Sri Lanka',
    'Pol sambol with the rice and curry: the coconut, the dried chilli, the lime, the combination that recurs daily.',
    'The tuk-tuk driver negotiates the Colombo traffic with a confidence that implies a different relationship to space.',
    'The tea estate in the hills: the green rows, the women in the rows, the specific mist of the elevation.',
  )
  addIf(cn === 'Myanmar',
    'Lahpet: the fermented tea leaf salad. Eaten slowly, with ceremony, with company.',
    'The pagoda in the early morning: the monk with the bowl, the offering, the gold catching the first light.',
    'The longyi: the garment worn by everyone, tied differently by men and women, the textile identity of the street.',
  )
  addIf(cn === 'Cambodia',
    'Amok: the fish in coconut curry steamed in a banana leaf. The smell of the leaf is part of the taste.',
    'The tuk-tuk driver waits at the same corner. He knows the regular destinations without being asked.',
    'The Mekong in the dry season: lower, slower, browner. In the wet season it reverses direction. The country breathes with it.',
    'The wats: the compound with the stupas, the monks, the bougainvillea, the shade that belongs to everyone.',
  )
  addIf(cn === 'Laos',
    'The monks collecting alms at dawn: the orange robes, the barefoot walk, the silent procession along the street.',
    'Sticky rice in the bamboo basket: the utensil and the food at the same time. Formed in the palm, dipped in the sauce.',
    'The Mekong at evening: the light on the water, the boats from Thailand crossing on the far side, the slowness of the crossing.',
  )
  addIf(cn === 'Nepal',
    'The Himalayas on a clear morning: visible above the valley haze, white and enormous. On clear days you look. On hazy days you know they are there.',
    'Dal bhat twice a day — the lentil soup and rice that is not the meal you decide but the meal the day is built around.',
    'The prayer flags: strung from house to roof to tree, the colours fading over months. The prayers have already been sent.',
    'The altitude requires the warm meal at noon, the rest in the afternoon, the particular slowness the body learns.',
  )
  addIf(cn === 'Nepal' && phase !== 'early_childhood',
    'Tongba in winter: the fermented millet in a bamboo container, hot water added when it empties. The drinking is also the warming.',
  )
  addIf(cn === 'Iraq',
    'The generator starts when the power cuts, which is scheduled and also unscheduled. The sound is the gap between the official supply and the actual one.',
    'Masgouf: the fish from the Tigris, split and grilled over date palm wood. A Thursday meal, a Friday meal, a celebration meal.',
    'Istikaan: the hourglass tea glass, very hot, held by the rim. The drinking is slow by necessity.',
    'The date palm: its fruit marks the calendar. Ruthab in August, tamr by September.',
  )
  addIf(cn === 'Syria' && era <= 2010,
    'The Damascus light in late afternoon: a particular gold that the photographs do not entirely capture.',
    'Meze in the courtyard: the shade, the fountain, the dishes arriving without any single large plate.',
    'The jasmine: sold in small bunches by street vendors, worn in the hair, carried in the pocket. The smell is a word for Damascus.',
  )
  addIf(cn === 'Syria' && era >= 2011,
    'The neighbourhood has changed. You can name each street by what it was before it was what it is now.',
    'The generator, the water storage, the flour: the household management that did not exist before and has become the day\'s first work.',
  )
  addIf(cn === 'Afghanistan',
    'Green tea, always: hot in summer because hot tea cools you, or so it is said. The saying is believed and sufficient.',
    'The bread from the tandoor: the dough slapped against the inside wall, the pull of it when it is ready. The smell enters the street.',
    'The mulberry tree in the compound produces what it produces in its season. The season is known. The waiting is not anxious.',
  )
  addIf(cn === 'Afghanistan' && era >= 1996 && gender === 'female',
    'The mahram — the male relative who must accompany you — is the condition of leaving the house. The condition is so established it requires no naming.',
  )
  addIf(cn === 'Haiti',
    'The tap-tap: the converted truck decorated in every colour and phrase and biblical reference. The specific noise of it arriving.',
    'Griot: the fried pork, the pikliz alongside it. The meal of Sunday, the meal of occasion.',
    'Kreyòl: the language of the house, the street, the market. French is for school and government. Kreyòl is for everything real.',
    'The heat of Port-au-Prince in July has mass. It requires management from the morning.',
  )
  addIf(cn === 'Democratic Republic of Congo' || cn === 'DRC',
    'Pondu: the cassava leaves cooked down with palm oil. The smell of it in the kitchen makes a claim on the afternoon.',
    'The humidity of Kinshasa: the air with weight, the clothing that requires changing by noon.',
    'Rumba from the bar next door: the guitar line, the voice above it, the rhythm underneath that never quite resolves.',
    'Libanga: the praise shout-outs built into the songs for people who paid to be named. Everyone waits for their name.',
  )
  addIf(cn === 'Rwanda',
    'Kigali is perhaps the cleanest city in Africa. The umuganda — the last Saturday of every month — is when everyone cleans their street. Everyone.',
    'Isombe: cassava leaves cooked with smoked fish and peanuts. A dish that requires patience. The patience is in the cooking.',
    'The hills: Rwanda is built on them and every walk is also an ascent or a descent. The legs know this.',
  )
  addIf(cn === 'Bolivia',
    'Coca leaves held in the cheek: the altitude remedy, the ancestral practice. At 3,600 metres it is not optional.',
    'The cholitas in the market: the bowler hat, the layered skirt, the manner of women who carry substantial weight on their backs and know it.',
    'Salteña in the morning: the pastry with meat and potato and olive and egg, juice escaping with the first bite if you are not prepared.',
  )
  addIf(cn === 'Ecuador',
    'Locro: the potato soup with cheese and avocado. The altitude requires the warm meal at noon.',
    'Ceviche, coastal style: the shrimp in citrus, the chulpe corn, the hot sauce. Eaten at noon. Distinct to here.',
    'The market in Otavalo: the textiles, the precise patterns, the vendors who have been here since before anyone alive remembers.',
  )
  addIf(cn === 'Uruguay',
    'Mate everywhere: in the hand at the bus stop, on the desk, in a thermos on any walk longer than fifteen minutes.',
    'Chivito: the sandwich with everything in it. The national answer to hunger.',
    'The quietness of Montevideo compared to Buenos Aires: the same language, the same mate, a different temperature of street.',
  )
  addIf(cn === 'Paraguay',
    'Tereré: the cold mate drunk through a metal straw. The distinction from hot mate is not only temperature but identity.',
    'Guaraní alongside Spanish — two languages in the same sentence is not mixing, it is Paraguayan.',
    'Sopa paraguaya: the corn bread that is not bread, made with cheese and onion. The name is technically wrong. The thing is right.',
  )
  addIf(['Guatemala', 'El Salvador', 'Honduras', 'Nicaragua'].includes(cn),
    'The pupusa, the tortilla, the tamale: corn in its forms, the form depending on the occasion and whose grandmother made it.',
    'The afternoon rain in the rainy season arrives at the same hour every day with the punctuality of a church bell.',
    'The painted bus: the religious references, the football team, the name of someone\'s loved one — a moving declaration.',
  )

  // ── SCHOOLS AND EDUCATION (STUDENT PERSPECTIVE) ───────────────────────────

  addIf(phase === 'childhood' && age >= 6 && age <= 8,
    'The first day of school: the classroom smells new and so do the shoes.',
    'The teacher\'s name: learned fast and stored permanently.',
    'The desk is yours for the year. The sense of this being yours is out of proportion to the object.',
    'Learning to read: the moment the marks become words is something you do not remember happening. And then they did.',
  )
  addIf(phase === 'childhood' && age >= 9 && age <= 11,
    'The friend you sit next to every day for two years. The sitting next to them is the friendship.',
    'The teacher who scared you, and the teacher who did not, and the difference between those two classrooms.',
    'The subject that came easily and the subject that did not. You know already which is which.',
    'Exam season: the revision, the specific dread, the aftermath regardless of the score.',
  )
  addIf(phase === 'adolescence',
    'The exam: the question you prepared for and the question you did not. The ratio was what the ratio was.',
    'The teacher who said something you have not forgotten. Not always the thing they intended to be remembered for.',
    'The school corridor between lessons: the economy of the seven minutes — who is speaking to whom, who is not.',
    'The library after school: no adults who know where you are. The books are not the point, or not entirely.',
    'The school uniform, if there is one, has an unofficial version — the collar, the shoes, the length — that communicates without saying.',
  )
  addIf(phase === 'adolescence' && isDeveloping,
    'The long walk to school: in the dark when it is a long walk, in the heat when it is the afternoon.',
    'The shared textbook: the page you need is the page that is torn.',
    'The school fee that arrived at term start. How it was found. That it was found.',
  )
  addIf(phase === 'young_adult' && F('university_attended'),
    'The lecture hall in the first week: two hundred people who do not yet know each other. By the third year, everyone knows everyone.',
    'The exam hall: the invigilator\'s footsteps, the clock, the scratch of pens.',
    'The library at midnight: the specific community of people doing their best work too late.',
    'The professor whose subject reorganised how you think about other subjects.',
  )
  addIf(phase === 'young_adult' && F('university_attended') && isPoor,
    'You are the first in your family at university. This is known to you and carried like an extra bag.',
    'The student who grew up with money does not count the same things you count.',
  )
  addIf(phase === 'midlife' && hasChildren,
    'The parent-teacher meeting: the version of your child described by someone who sees them in a different context.',
    'The homework on the kitchen table: you try to help. The curriculum has changed.',
  )

  // ── DEATH AWARENESS ACROSS PHASES ─────────────────────────────────────────

  addIf(phase === 'childhood' && age >= 7 && age <= 12,
    'A grandparent died this year. The house had more people in it, and then fewer, and then a different quiet.',
    'You saw a dead animal on the road. This introduced something. The something is not named yet.',
    'The adult who died in the neighbourhood: the way the adults talked quietly about it and stopped when you came near.',
  )
  addIf(phase === 'adolescence',
    'Someone your age died. The category of things-that-can-happen has been reorganised.',
    'The grandparent\'s death this year: the first time you understood that the family is not constant.',
    'You have started to understand that the people around you will die. This is abstract and yet very clear.',
  )
  addIf(phase === 'young_adult' && (F('bereaved') || age >= 25),
    'Someone your age — a friend, a classmate — died. The impermanence is no longer theoretical.',
    'You attended a funeral this year for someone too young. The phrase "too young" is doing a lot of work.',
  )
  addIf(phase === 'midlife',
    'The list of people you knew who have died is long enough now that it requires maintenance.',
    'A peer died. The same age, roughly. The same decade. The sameness is the message.',
    'You attended more funerals this year than you did in your thirties. This is not a coincidence.',
    'The parent is old now. The parent\'s oldness puts you on a specific clock.',
    'You have thought, more than once this year, about your own end — not with fear, with arithmetic.',
  )
  addIf(phase === 'late_life',
    'The friends who are still here and the friends who are not. The list adjusts.',
    'You have outlived several people who were sure of outliving you.',
    'The funeral is no longer a shock. It is the year\'s recurring appointment.',
    'You have thought about what you want when the time comes. The thinking was clarifying, not morbid.',
    'Someone who was a contemporary is receiving the care that total dependence requires. You have visited. The visiting was hard and necessary.',
    'The death of someone very old, a person who had been old for as long as you knew them, is a different grief: expected and still real.',
  )

  // ── SLEEP AND NIGHT ────────────────────────────────────────────────────────

  addIf(phase === 'early_childhood',
    'The dark is not dangerous. The dark is where sleep is.',
    'The sound of the adults talking in the next room while you fall asleep.',
  )
  addIf(phase === 'childhood',
    'You are told to sleep and you cannot. The not-sleeping is its own adventure.',
    'The night sounds of the house: sorted and named over years, no longer strange.',
    'You wake before the alarm and lie there knowing the day is coming.',
  )
  addIf(phase === 'adolescence',
    'The night is when you are most awake. The day requires this to be reversed.',
    'You are awake at midnight reading or listening to music and the night has a quality the day does not.',
  )
  addIf(phase === 'young_adult',
    'The sleep is deep when it comes. Getting there takes longer than it used to as a child.',
    'You stayed up too late and the morning is paying for it. The payment is manageable.',
    'The night before something important: the rehearsal of outcomes that does not help.',
  )
  addIf(phase === 'midlife',
    'The 3am wake: full consciousness arriving before you want it. The mind presenting its agenda without being asked.',
    'The sleep is lighter. You hear things at night you did not hear at thirty.',
    'You got to sleep early and the sleep was long and this is reported as news.',
  )
  addIf(phase === 'late_life',
    'The night is earlier now. Ten o\'clock is the middle of the night and has been for years.',
    'You wake at 5am and it is not unpleasant. The early morning is quiet in a way you have come to own.',
    'The sleep in the afternoon: short, complete, not apologised for.',
  )
  addIf(isMuslim && phase !== 'early_childhood',
    'Fajr: the dawn prayer before the light. The body knows this hour now.',
    'The Quran before sleep: the same verses, the familiar cadence, the transition into rest.',
  )
  addIf(isBuddhist,
    'The bell at the monastery, or the bells on the temple in the town, at 4am. The sound moves through the sleep.',
    'The meditation before bed: the body settling, the thoughts not pursued.',
  )
  addIf(isDeveloping && era <= 1980,
    'The night is dark when the power cuts. Dark in the way that has no gradation.',
    'The lamp is lit. The small circle of light is the evening.',
    'The mosquito net arranged before sleep. The arrangement is not decorative.',
  )
  addIf(isPostSoviet && era >= 1991 && era <= 2000,
    'The heating comes on when it comes on. Some winters it does not come on reliably. The extra blanket is not a metaphor.',
  )
  addIf(isWealthyArch && era >= 1990,
    'The light pollution means the stars are not visible. You did not notice when you stopped looking for them.',
    'The phone on the nightstand. The phone checked before sleep. The intention not to check it.',
  )

  // ── POLITICAL TEXTURE ─────────────────────────────────────────────────────

  addIf(F('under_authoritarian_regime') || F('political_prisoner') || F('dissident'),
    'There are things you say in certain rooms and things you say in no room. The discipline is automatic now.',
    'The informer could be anyone. This is not paranoia. It is an acquired skill of calibration.',
    'The newspaper exists and says what it is permitted to say. What it is not permitted to say is known by its absence.',
  )
  addIf(arch === 'single_party_communist' || cn === 'Cuba' || cn === 'China' || cn === 'North Korea' || cn === 'Vietnam',
    'The slogan is on the wall. The slogan has been on the wall for so long it is now the wall.',
    'The meeting where the correct things are said: the attendance is noted, the saying of them is noted.',
    'The family understands what is not to be said outside the family. The understanding requires no discussion.',
  )
  addIf(F('political_active') || F('activist'),
    'The meeting is in someone\'s house and the curtains are drawn from habit, not emergency.',
    'The pamphlet or the text: drafted and redrafted. The language that says the thing without saying the thing directly.',
  )
  addIf(arch === 'military_dictatorship',
    'The curfew is the architecture of the night. After a certain hour the street belongs to the state.',
    'The soldier at the checkpoint: the document produced, the pause, the waving through.',
    'The radio announces what it announces. The gap between what is announced and what happened is a skill you have learned to measure.',
  )
  addIf(F('political_leaning_left') || F('political_active'),
    'Something happened that confirms what you already believed. The confirmation is welcome and you try to notice when it is too welcome.',
    'The argument is not resolved. The argument resumes whenever this person and that one are in the same room.',
  )
  addIf(isPostSoviet && era >= 1991 && era <= 2000,
    'The old certainties were wrong but they were certainties. What has replaced them is uncertain in a way that requires getting used to.',
    'The party membership: not relevant now, but recent. The recent is processed without ceremony.',
  )
  addIf(cn === 'Iran' && era >= 1979,
    'The rules change without announcement. The change is learned when someone is stopped for it.',
    'What is said in the car, between people who are known to each other, is different from what is said in the street.',
  )
  addIf(F('fled_regime') || F('political_exile'),
    'The news from home arrives via relatives or via the diaspora media or via the risk someone takes to share it.',
    'The country of origin is a country you watch from a distance. The watching is its own kind of helplessness.',
  )

  // ── WAR AND CONFLICT TEXTURE ───────────────────────────────────────────────

  addIf(arch === 'conflict_zone' || F('displacement') || F('war_survivor'),
    'The checkpoint: the documents, the wait, the face of the soldier or the militia, the calculation of how much to say.',
    'The sound at night that might be distant thunder and might not be. You have learned not to run until the third.',
    'The building on that street has been gone for two years. You still see it when you pass.',
    'The queue for water or bread or gas: the patience of the queue is not resignation. It is management of the available options.',
    'Electricity for four hours in the evening and then not. The planning around the four hours.',
    'The person who left. The person who stayed. You are one of them and you think about the other.',
  )
  addIf(F('war_survivor') && phase === 'midlife',
    'There are things the children know because you told them and things they do not know because you did not.',
    'A sound, a smell, a quality of light: the body remembers what the mind has arranged.',
  )
  addIf(F('war_survivor') && phase === 'late_life',
    'You have been asked to tell the story. The story is told. What is left out is also the story.',
    'The peace is old now. Older than the war was. You are still accustomed to the peace in the way of someone for whom it was not guaranteed.',
  )
  addIf(arch === 'conflict_zone' && phase === 'childhood',
    'The school is open some days and not on others. The days it is open are full days.',
    'The teacher tells you to stay away from the windows. The lesson continues.',
    'A game interrupted: everyone runs for a different reason, and then you came back to finish.',
  )
  addIf(arch === 'conflict_zone' && phase === 'adolescence',
    'The young men your age are doing different things. Some are in school. Some are not in school.',
    'The roadblock changes every few months. The new personnel learn the new rules.',
  )
  addIf(F('displacement') || F('refugee_status'),
    'The camp is temporary in a way that has lasted years.',
    'Home is a word that now requires a preposition: the home you left, the home you are in, the home that may or may not happen.',
  )

  // ── RURAL DEEP TEXTURE ─────────────────────────────────────────────────────

  addIf(isRural && careerField === 'agriculture',
    'The first planting of the season: the soil turned, the seed in the ground, the waiting that is also the work.',
    'The harvest moon: the night light is bright enough to work by. Some years you do.',
    'The rain arriving exactly when it needed to. This is the best possible outcome. It does not happen every year.',
    'The animal sick at 3am: the decision of how much treatment the animal warrants given what the animal is worth.',
    'The neighbour\'s crop compared to your own: the silent accounting that is not envy exactly but is adjacent.',
    'The village market every Thursday: the social event that is not called social, the trading that is also news.',
    'The dry season: the cracked earth, the dust, the conservation of water, the waiting for what comes after.',
    'The flood that took the lower field: what was lost, what survived, what the insurance — if any — covered.',
  )
  addIf(isRural && !isWealthyArch,
    'The road to the town: the distance is known in time, not in kilometres. The time depends on the season.',
    'The children who went to the city: you know which households have had a child go. The going is the village\'s long-term project.',
    'The returnee: someone who went to the city and came back. The reasons for coming back are not always freely given.',
    'The seasons are the years. The year is measured from planting to harvest to the dry to the rains.',
  )
  addIf(isRural && isDeveloping && gender === 'female',
    'The firewood: collected, carried, stacked. The carrying is not labour that appears in any account.',
    'The morning at the river: the washing, the water, the conversation that happens there and nowhere else.',
  )
  addIf(isRural && era <= 1960 && !isWealthyArch,
    'No electricity means the evening is lit by fire or lamp. The evening has a size that electricity did not give it.',
    'The radio, if there is one, is the village\'s shared newspaper.',
  )

  // ── AGING PARENTS ─────────────────────────────────────────────────────────

  addIf((phase === 'midlife' || phase === 'late_life') && age >= 35,
    'The parent who was always the stronger of the two is now the one who needs the hand on the stairs.',
    'The phone call to check on them has become the daily phone call. The daily call became necessary without announcement.',
    'The decision about whether they should still be living alone is a conversation being circled.',
    'You see the generation in them now — the way their face arrives at your face in the mirror.',
  )
  addIf((phase === 'midlife' || phase === 'late_life') && age >= 40 && (F('parent_decline') || F('caregiver')),
    'The hospital visit: the ward, the forms, the conversation with the doctor that is also a negotiation.',
    'The small adjustments in the house: the grip rails, the higher chair, the removal of the rug that was a fall waiting to happen.',
    'They cannot remember something they knew last month. You note this without saying it.',
    'The reversal is complete in small ways: you are the one who knows the route, who carries the bag, who reminds.',
  )
  addIf(phase === 'late_life' && F('parent_decline'),
    'The parent who does not know what year it is. But they know your face. The face remains when the year has gone.',
    'The conversation after the hospital: what is possible, what is not possible, who will manage what.',
  )
  addIf(phase === 'midlife' && isDeveloping,
    'The parent who came to live with you: the extra room, the arrangement, the daily texture of shared space.',
    'The obligation to the parents is the background of the midlife years. It does not require decision. It simply is.',
  )

  // ── MEMORY AND TIME ────────────────────────────────────────────────────────

  addIf(phase === 'midlife' && age >= 38,
    'Something reminded you of something and the something was thirty years ago and this is arithmetic you had not done before.',
    'The smell of something — paint, a specific soap, a food — returns a year with precision the mind does not have.',
    'You cannot remember whether this happened to you or whether you were told it happened. Both feel the same now.',
    'The photograph from twenty years ago: the face is yours and not yours. The not-yours is the part that requires looking at.',
  )
  addIf(phase === 'midlife' && age >= 44,
    'You are forgetting names you once knew. The names return, eventually, but the returning takes longer.',
    'A face from decades ago arrived in a dream with full clarity. The name came with it.',
    'The first memory: you are not sure it is a memory or the story of a memory you have been told enough times.',
  )
  addIf(phase === 'late_life' && age >= 55,
    'The early years are clearer than last Tuesday. The mechanism for this is not reassuring.',
    'You remember the price of things from thirty years ago with precision. The current price surprises you every time.',
    'The long-term memory is intact. The short-term requires writing down.',
    'A conversation with a very old person who remembers something from 1948 with the specificity of this morning.',
  )
  addIf(phase === 'late_life' && age >= 65,
    'You think about the same things more often. The same themes. The mind has its preferred loops.',
    'The stories you tell are the same stories. You are starting to notice when you have told someone before.',
    'The name is there — you know it is there — and then it arrives twenty minutes after you needed it.',
  )
  addIf(phase === 'late_life' && age >= 75,
    'The memory of the dead is reliable. The memory of what was said yesterday is not.',
    'Seventy years of weather: you know what spring in this place has smelled like across six or seven decades. The smell is the same.',
  )

  // ── NEW COUNTRY ARRIVALS ───────────────────────────────────────────────────

  addIf(F('emigrated') && age <= 30,
    'The first apartment: the smell of someone else\'s cooking in the walls, the window onto the unfamiliar street.',
    'The bus route memorised because there is no one to ask a second time without embarrassment.',
    'You wrote down the translation of three words before the meeting. In the meeting you needed seven.',
    'The grocery store: the same function as the market back home, a completely different transaction.',
    'The accent of the country you are in, heard for hours every day. Your ear is adjusting.',
  )
  addIf(F('emigrated') || F('first_generation_immigrant'),
    'The form: the small box for the country of origin, the question of which address is permanent.',
    'The friend who is also from there: the relief of speaking without choosing words carefully.',
    'The first winter here, or the first summer, or the first season that is not a season from before.',
    'You are learning the bureaucracy. The bureaucracy is specific to this country and has its own logic.',
    'The job you have here is not the job you had there. The here job is the available job.',
    'Sunday is different here. The day has a different shape. The shape requires adjustment.',
  )
  addIf(F('emigrated') && isMuslim && isWealthyArch,
    'The halal butcher is across town. You go once a week. The going is also seeing people from home.',
    'The mosque is the community centre and the news source and the social fabric and the place of prayer. You need all four.',
  )
  addIf(F('emigrated') && phase === 'young_adult',
    'You are becoming a different version of yourself because you are here. Whether this is gain or loss is a question for later.',
    'The language is improving in the specific ways that language improves: suddenly, and then you forget how it was before.',
  )

  // ── CLASS CONSCIOUSNESS ───────────────────────────────────────────────────

  addIf(F('poverty_childhood') && phase === 'young_adult',
    'You are earning money now and the spent money still requires accounting in your head even when there is enough.',
    'The menu is read from right to left, always. You know this is the direction you learned it.',
  )
  addIf(F('poverty_childhood') && (phase === 'midlife' || phase === 'late_life'),
    'You grew up with nothing and are not now with nothing, and this is the story you do not know how to fully tell.',
    'Something about plenty still feels temporary. You buy more than needed because the need taught you to.',
    'The children do not understand the reference point. They cannot. This is both the success and the distance.',
  )
  addIf(isPoor && isUrban,
    'The bus fare and the walk and the decision between them.',
    'The thing you cannot afford and the thing you can and the calculation happens before the question.',
    'The social occasion that requires spending: the wedding, the funeral, the celebration. The spending is not optional.',
  )
  addIf(isWealthy && F('poverty_childhood'),
    'The anxiety that the current condition will reverse is older than the current condition.',
    'The ease with money that other people at this level seem to have: you watch it and understand it and it is not yours.',
  )
  addIf(isWorkingClass && isWealthyArch,
    'The neighbourhood they live in and the neighbourhood you live in are both in the same city and are not the same city.',
    'The children of your colleagues at the private school while yours are at the public school across town.',
    'Overtime was taken. The weekend was shorter. The bill is paid.',
  )
  addIf(isWealthy && isWealthyArch && phase === 'midlife',
    'The school fees are the standing expense that is managed without crisis. You know this is not everyone\'s experience.',
    'The charitable donation: the question of where it goes and whether it goes well.',
    'The inheritance discussion: not yet urgent, but beginning to have a shape.',
  )
  addIf(isSubsaharan && isWorkingClass,
    'The salary is spent before the month is over. The month is longer than the salary.',
    'Something for the village — a contribution to the school, the borehole, the relative\'s school fees — comes out of what is left.',
  )

  // ── ILLNESS WATCHING ───────────────────────────────────────────────────────

  addIf(F('caregiver') || F('has_chronic_condition'),
    'The medication schedule becomes yours even though the medication is not for you.',
    'You have learned to read a new set of signs: the pallor, the hesitation on the stairs, the careful way of sitting.',
    'The appointment is prepared for: the questions written down, the history brought, the answers anticipated.',
    'The person who is ill has moments when they are fully themselves and the relief of those moments is total.',
  )
  addIf(F('caregiver') && phase === 'midlife',
    'The year of caregiving is a year that occupies more than a year.',
    'You are tired in the way of someone who has not had a night of unconcerned sleep in months.',
    'The hospital cafeteria has been memorised. The route to the ward. The nurse whose shift starts at 7.',
  )
  addIf(phase === 'late_life' && (F('bereaved') || age >= 60),
    'The friend who is ill now. The visits. The gradual adjustment of the visits.',
    'The person who recovered after everyone had adjusted to the alternative. The recovery was not expected.',
    'The body of someone you knew well, held in illness at the end: what you understood of it and what you could not.',
  )
  addIf(F('has_chronic_condition') && phase !== 'early_childhood',
    'The body is managed. The management is the background work of the day.',
    'A good week: the condition present but not governing. A bad week is the other thing.',
    'The adjustment: what can no longer be eaten, done, relied upon. The adjustment was complete some years ago.',
    'You know your body\'s schedule now in a way you did not before the diagnosis.',
  )
  addIf(isDeveloping && isPoor && phase === 'midlife',
    'The person who died of something preventable, or treatable, or addressed — had they reached the clinic, had they had the money.',
    'You paid the clinic fee. The fee was what it was and you paid it. What was left after the fee is what was left.',
  )

  // ── DESIRE-SHAPED TEXTURE ─────────────────────────────────────────────────
  // What the character notices in ordinary years depends partly on what they have always needed.

  addIf(desire === 'prove_worth',
    'Something you did this year was done well. No one acknowledged it. The doing of it acknowledged it.',
    'Someone else received credit for the kind of work you also do. You are still deciding what the correct feeling is.',
    'You exceeded what was asked of you. You noted this in the way you always note it — privately, without telling anyone.',
  )
  addIf(desire === 'belong',
    'There was a gathering you were fully inside — not watching from its edge but at its centre. You noticed the difference.',
    'A group you are part of assumed your presence this year without remarking on it. The assumption felt like something.',
    'A meal with people who knew each other well and knew you and the knowing ran in all directions at the table.',
  )
  addIf(desire === 'be_seen',
    'Someone who does not know you well said something accurate about you. The accuracy was the thing — not the praise but the precision.',
    'Your work reached someone you did not expect. The reaching happened without you.',
  )
  addIf(desire === 'safety',
    'Nothing catastrophic happened this year. You noticed this in November, or December — the year closing without emergency.',
    'A day with nothing threatening in it. By evening you noticed: the day passed without anything to manage.',
    'The thing you have been watching for did not arrive this year. The year ends with it still theoretical.',
  )
  addIf(desire === 'connection',
    'A conversation that outlasted its occasion — the coffee long finished, neither person moving to end it.',
    'You and another person understood the same thing at the same moment, without saying so. The simultaneity was the thing.',
    'Someone called to say they had been thinking about you. Nothing more. The call itself was the point.',
  )
  addIf(desire === 'leave_mark',
    'Something you made continues to exist. This year, someone encountered it without knowing it was yours.',
    'You passed something — a planted tree, a repaired thing, a decision someone made because of what you said once — that persists.',
    'You thought about what will remain of this year. The thought was less bleak than expected.',
  )
  addIf(desire === 'freedom',
    'A morning with no obligations until late afternoon. You spent the first hour finding out what you actually wanted, not what you had told yourself you would do with free time.',
    'A choice made this year that was entirely yours — uninfluenced, unconsulted, made and lived with.',
    'A week in which no one needed you urgently. The week felt different. It took a day to understand why.',
  )
  addIf(desire === 'redemption',
    'Someone you wronged, years ago, is doing well. You know this from a distance. It doesn\'t resolve anything. It is still good.',
    'You did the thing you once failed to do. The doing of it was quieter than you expected. The quietness was all right.',
    'A second chance at something arrived. You took it differently from the first time. The difference was the point.',
  )

  // ── ADDITIONAL UNIVERSAL TEXTURE ──────────────────────────────────────────

  addIf(phase === 'midlife' && hasPartner,
    'You have been doing this together long enough that the argument is familiar before it begins.',
    'The trip you took together three years ago: still discussed, still the reference point for the good version.',
    'The Saturday morning with nowhere to be: both of you, the coffee, the quiet. This is, you know, the thing.',
  )
  addIf(phase === 'late_life' && !hasPartner && (F('widowed') || F('divorced')),
    'The quietness of the house is not only the absence of noise. It is the absence of presence.',
    'You have lived alone long enough that the alone is now the normal. The normal is not uncomplicated.',
  )
  addIf(phase === 'young_adult' && !hasChildren && !hasPartner,
    'The freedom is exactly that: the ability to be somewhere else by Thursday if it seems right.',
    'Cooking for one involves the repetition of the same three things. The things are fine.',
  )
  addIf(era >= 2020 && phase !== 'early_childhood',
    'The news is everywhere and unending and does not require you to seek it out. You have adjusted your seeking.',
    'The remote meeting: the face on the screen, the background chosen or unchosen, the unmuting.',
  )
  addIf(era >= 2015 && phase === 'adolescence',
    'The phone in the pocket contains the same social world as the school. The school is the continuation of the phone.',
    'The like or the lack of like: the number means something and also means nothing and you know both things.',
  )
  addIf(isRural && phase === 'young_adult',
    'The city is where the future is supposed to be. The question of whether to go is the question of this decade.',
    'You have watched three people from the village leave. You know what they have now and what they no longer have.',
  )
  addIf(isMuslim && era >= 2000 && arch === 'wealthy_west',
    'The airport queue has a particular quality in this decade. You do what you have learned to do.',
    'The news is about people from places like yours in a way that requires a specific management of response.',
  )
  addIf(isBuddhist && phase !== 'early_childhood',
    'The impermanence is not abstract. It is the flower at the altar, already started to turn.',
    'The monastic calendar turns the year on a different axis than the civic calendar.',
  )
  addIf(isJewish && isDeveloping && era <= 1960,
    'The community is small enough that everyone knows which family everyone belongs to.',
    'The synagogue is the building that holds what the neighbourhood cannot contain.',
  )
  addIf(isJewish && isWealthyArch && era >= 1960,
    'The High Holidays: the seat that was your grandfather\'s, the prayer that has been said every year regardless.',
    'The question of belonging — to the country, to the community, to both in ways that are not always entirely compatible.',
  )
  addIf(cn === 'United States' && F('poverty_childhood') && phase === 'midlife',
    'You have lived in the same city your whole life. The city has changed around you. You have changed differently.',
    'The medical bill: large, itemised, unintelligible. You pay what you can and arrange the rest.',
  )
  addIf(cn === 'United States' && phase === 'young_adult' && era >= 2000,
    'The student loan is the long shadow of the degree. The degree that made the shadow.',
    'Health insurance: the job or the parents or the managing-without. One of the three.',
  )
  addIf(cn === 'China' && era >= 1990 && era <= 2010,
    'The gaokao result was the result it was. The result was the gate and the gate was either open or the long way round.',
    'The speed of the city in this decade: the building completed before the plans are filed.',
  )
  addIf(cn === 'Russia' && era >= 2000,
    'The news is what it is. What it is is known and also not entirely reliable. Both are true.',
    'The stability of the current arrangement: understood as stability, understood also as the condition of stability.',
  )

  // ── ADOLESCENCE DEPTH ──────────────────────────────────────────────────────
  addIf(phase === 'adolescence' && age >= 13 && age <= 15,
    'The hierarchy at school is not written down but is understood by everyone. You know exactly where you stand in it.',
    'There is a piece of music this year that means something specific to this year, and will mean only it.',
    'The person who sits next to you in class is neither friend nor stranger. This category is very crowded at this age.',
  )
  addIf(phase === 'adolescence' && age >= 15 && age <= 17,
    'The end of school is close enough to think about and far enough to keep avoiding.',
    'You have started to see your teachers as people with lives outside this building. This is not entirely comfortable.',
    'The version of yourself that existed two years ago is already embarrassing to remember.',
  )

  // ── LONG PARTNERSHIP TEXTURE ───────────────────────────────────────────────
  addIf(hasPartner && phase === 'midlife' && age >= 42,
    'You reach for something and they hand it to you before you ask.',
    'There are whole conversations now conducted in facial expression. The words have become too slow.',
    'The argument is about something specific but also about something older. Both of you know this and use the specific thing anyway.',
  )
  addIf(hasPartner && phase === 'late_life',
    'They sleep differently now than when you first knew them. You have observed this change so gradually you did not notice you were observing it.',
    'The small consideration: the cup placed within reach, the question not asked at the wrong moment. These are the invisible architecture of what you have built.',
  )

  // ── GRIEF YEAR TEXTURE ────────────────────────────────────────────────────
  addIf(F('bereaved') || F('widowed') || F('lost_parent_mother') || F('lost_parent_father'),
    'You start to tell them something and stop. The habit of telling them things outlasts the person.',
    'The first holiday after: the day is the same day and also not. You understood why people said it would be different.',
    'Someone says their name in conversation — a different person, same name — and for a fraction of a second your body does not know the difference.',
    'Their handwriting is still in things. A note inside a book, a label on something at the back of a cupboard.',
  )

  // ── EARLY RETIREMENT TEXTURE ───────────────────────────────────────────────
  addIf(phase === 'late_life' && !careerField && age >= 62,
    'The calendar has lost its architecture. The days are still seven. The weeks are harder to separate.',
    'You volunteer for the thing you were always too busy for. It turns out to be something to do, which is what it is.',
    'The book you are finally reading. You have been meaning to read it for twenty years and now you are reading it.',
  )

  // ── CAREER TEXTURE: JOURNALISM / WRITING ─────────────────────────────────
  addIf(careerField === 'arts' || careerField === 'media',
    'The interview: the over-sharing that arrives after the third question. You have more than you can use and less than you needed.',
    'The piece that did not run. It was finished. It had something the other pieces didn\'t. The decision was made above you.',
    'The sentence that is not working and will not work until you stop trying to make it work.',
  )

  // ── CAREER TEXTURE: FACTORY / TRADE ──────────────────────────────────────
  addIf(careerField === 'manufacturing' || careerField === 'trades',
    'The machine has a legibility you have earned: the sound that means something is going to go wrong before it goes wrong.',
    'The longtime workers: the body carries the years in how they hold themselves now.',
    'The smell of the place follows you home regardless of how you wash.',
  )

  // ── CAREER TEXTURE: CIVIL SERVICE / ADMINISTRATION ────────────────────────
  addIf(careerField === 'government' || careerField === 'administration',
    'The form has seven sections. Six are relevant. You fill all seven.',
    'The procedure exists for a reason no one currently working here knows.',
    'The thing that could be resolved in twenty minutes takes six weeks due to an ordering issue that predates everyone in the room.',
  )

  // ── CAREER TEXTURE: LAW ──────────────────────────────────────────────────
  addIf(careerField === 'law',
    'The correct outcome and the legal outcome are sometimes the same.',
    'The opposing counsel: you do not dislike them. You simply happen to be on opposite sides of this particular question today.',
    'The client who is guilty of what they are charged with, and also not guilty of the assumptions being made about them.',
  )

  // ── CAREER TEXTURE: HEALTHCARE ────────────────────────────────────────────
  addIf(careerField === 'healthcare' && phase !== 'early_childhood',
    'The shift ends. The shift always ends. What it contains does not always end with it.',
    'There is a patient from several years ago you still think about. You do not know why it is that one and not others.',
    'The thing you say to families at the difficult moment: you have said it many times. It does not become easier or harder. It becomes practised.',
  )

  // ── CAREER TEXTURE: EDUCATION ────────────────────────────────────────────
  addIf(careerField === 'education' && phase !== 'early_childhood',
    'The student who gets it this year was not the one you expected to. You have stopped predicting which one it will be.',
    'The class that was difficult: in retrospect, there was one in particular you might have handled differently.',
    'You will remember the name of the difficult year long after you have stopped being able to say what made it difficult.',
  )

  // ── SINGLE PARENTHOOD ────────────────────────────────────────────────────
  addIf(hasChildren && !hasPartner && (phase === 'young_adult' || phase === 'midlife'),
    'The logistics: the arrangement that has to be remade whenever one part of it fails.',
    'The house is loud until it is quiet. The quiet is a different thing than it used to be.',
    'The thing they needed that you could not give them, not because you wouldn\'t but because there was only one of you.',
  )

  // ── CHRONIC CONDITION DAILY ────────────────────────────────────────────────
  addIf(state.conditions?.some(c => c.severity === 'severe'),
    'The body has its demands this year. You meet them and arrange the rest of the day around the meeting.',
    'The calibration: what you can do today and what it will cost tomorrow.',
    'Good days: you half-forget. Bad days: you remember what good days were for.',
  )
  addIf(state.conditions?.length > 0 && state.conditions?.some(c => !c.managed),
    'Some weeks are the management of the condition and other things arranged inside that management.',
    'The plan that assumes a level of energy that is not always there.',
  )

  // ── ERA-SPECIFIC: 1940S NON-WESTERN ───────────────────────────────────────
  addIf(!isWealthyArch && era >= 1940 && era <= 1949,
    'The war is elsewhere and also here: in the prices, in what is not available, in the letters.',
    'The radio brings a voice from a distance saying what is happening somewhere you cannot see.',
  )

  // ── ERA-SPECIFIC: INDEPENDENCE GENERATION ─────────────────────────────────
  addIf((isSubsaharan || isDeveloping) && era >= 1956 && era <= 1975 && phase !== 'early_childhood',
    'The country is still deciding what it is. This is not a problem — it is the shared situation, and the situation is shared.',
    'The new flag at the same buildings. The flag is new.',
  )

  // ── ERA-SPECIFIC: 1990S POST-COLD WAR ─────────────────────────────────────
  addIf(era === 1990 && (isPostSoviet || isWealthyArch) && phase !== 'early_childhood',
    'There is a sense — briefly — that the arrangement of the world has just been renegotiated and the new arrangement might be more favourable.',
    'The idea that things are going to improve is in the air in a way it wasn\'t. Not everyone holds it. It is in the air anyway.',
  )

  // ── ERA-SPECIFIC: MOBILE PHONE ARRIVAL ───────────────────────────────────
  addIf(era === 2000 && isDeveloping && phase !== 'early_childhood',
    'The phone that arrived without the landline before it. The step that was skipped.',
    'The way the phone changed who you can reach and who can reach you: both at once.',
  )

  // ── BODY AT DIFFERENT AGES ────────────────────────────────────────────────
  addIf(phase === 'young_adult' && age >= 18 && age <= 24,
    'The body is what it is right now, which you will not appreciate until later.',
    'Sleep: you take it when it comes and it always comes.',
  )
  addIf(phase === 'midlife' && age >= 40 && age <= 50,
    'The body has started requiring more negotiation than it used to.',
    'You recover from things more slowly than you did and you have adjusted what you attempt.',
  )
  addIf(phase === 'late_life' && age >= 65 && age <= 74,
    'The body has opinions about the weather. It has had these opinions for some years now.',
    'You have started conserving in ways that are automatic rather than deliberate.',
  )
  addIf(phase === 'late_life' && age >= 75,
    'The day has a structure organised partly by the body\'s requirements. The requirements are not unreasonable.',
    'You are slower and more accurate, which is not the same as slower and worse.',
    'The memory that goes first is not the memory you expected. The memory you expected is still there.',
  )

  // ── EMPTY NEST ────────────────────────────────────────────────────────────
  addIf(hasChildren && (phase === 'midlife' || phase === 'late_life') && age >= 50,
    'The house is the size it was before them and also a different kind of size.',
    'You find yourself cooking too much and have been doing it for a year.',
    'They call. The call is good. The call is not the same as the presence.',
  )

  // ── POST-DIVORCE / UNPARTNERED AFTER PARTNERSHIP ─────────────────────────
  addIf(F('divorced') && !hasPartner && (phase === 'midlife' || phase === 'young_adult'),
    'The possessive grammar has not caught up: "our" still arrives before "my" corrects it.',
    'The social calendar used to be managed jointly. Now you decide everything alone, which is freedom and also work.',
    'You sleep on one side of the bed. You have not moved to the middle.',
  )

  // ── REFUGEE / ASYLUM STATUS ──────────────────────────────────────────────
  addIf(state.residencyStatus === 'refugee_status' || state.residencyStatus === 'asylum_seeker',
    'The waiting is a kind of work. It does not produce anything but it takes time.',
    'You are learning the rules of a system that was not made for you and may not decide in your favour.',
    'The documents, the appointments, the letters with decisions in them: this is now part of the year.',
  )
  addIf(state.residencyStatus === 'undocumented' || state.residencyStatus === 'tourist_overstay',
    'There are things you do not do and places you do not go because of what the year contains.',
    'The calculation is always present: risk and necessity and what you are willing to trade against each other.',
  )

  // ── WEALTH TEXTURE: VERY HIGH ─────────────────────────────────────────────
  addIf(gdp === 'very_high' && isWealthyArch && phase !== 'early_childhood',
    'The money has been invisible for long enough that its presence is harder to see than its absence would be.',
    'The option you did not choose is still an option. Most choices work out for you at no particular cost.',
  )

  // ── WEALTH TEXTURE: VERY LOW ──────────────────────────────────────────────
  addIf(gdp === 'very_low' && phase !== 'early_childhood',
    'The month is divided into the before-the-money-runs-out and the after.',
    'You are efficient with things in ways that people with more than you are not required to be.',
    'The thing that broke: you are deciding whether to repair it or do without. These are the two options.',
  )

  // ── CITY-SPECIFIC TEXTURE ─────────────────────────────────────────────────
  addIf((currentCn === 'United Kingdom' || cn === 'United Kingdom') && isUrban && era >= 1950,
    'The particular British management of the queue: enforced by consensus and without being asked.',
    'The pub on the corner and what it holds of the neighbourhood: the argument, the anniversary, the ordinary Thursday.',
  )
  addIf((currentCn === 'France' || cn === 'France') && isUrban && era >= 1950,
    'The boulangerie: the same bread at the same hour, the same exchange. The constancy is a kind of contract.',
    'The argument about the right way to do something is itself a form of attention paid to quality.',
  )
  addIf((currentCn === 'India' || cn === 'India') && isUrban && era >= 1970,
    'The logic of the city: the way it absorbs everyone and moves at a pace that accommodates all paces simultaneously.',
    'The power cut in the afternoon: the fans stop, the work continues, the generator starts or doesn\'t.',
  )
  addIf((currentCn === 'Brazil' || cn === 'Brazil') && isUrban && era >= 1960,
    'The city exists at three speeds at once. You have found which speed is yours.',
    'The football: in the year of a defeat or a victory, the city is the same city and also a different place.',
  )
  addIf((currentCn === 'Egypt' || cn === 'Egypt') && isUrban && era >= 1960,
    'Cairo at midday versus Cairo at midnight: the city does not rest, it only changes character.',
    'The coffee house is an institution that has no fixed programme. Its function is simply being there.',
  )
  addIf((currentCn === 'Mexico' || cn === 'Mexico') && isUrban && era >= 1960,
    'The traffic: accepted as a condition of city life, complained about without expecting change.',
    'Sunday: the family geography of it, everyone somewhere specific, everyone accounted for.',
  )
  addIf((currentCn === 'Japan' || cn === 'Japan') && isUrban && era >= 1960,
    'The train arrives when it arrives, to the minute. This reliability is both ordinary and remarkable.',
    'The sound the city makes between 6pm and 8pm: the specific texture of people going home.',
  )
  addIf((currentCn === 'Iran' || cn === 'Iran') && isUrban && era >= 1980,
    'The two versions of conversation: the public one and the private one. You navigate both.',
    'The city at night is more itself than in the day — the apartments, the rooftops, the sound of music from somewhere.',
  )

  // ── WORK FROM HOME ERA ────────────────────────────────────────────────────
  addIf(era >= 2020 && phase !== 'early_childhood' && isWealthyArch,
    'The commute that used to be a commute is now the walk from one room to another. The walk takes ten seconds.',
    'The hour at which the working day ends has become uncertain in a way the beginning never was.',
    'You have learned something about your neighbours you would not have known before. Mostly their schedules.',
  )

  // ── FIRST-GENERATION PROSPERITY TEXTURE ──────────────────────────────────
  addIf(F('poverty_childhood') && phase === 'midlife' && (isWealthyArch || gdp === 'medium_high'),
    'The thing you could buy now that you could not buy then: you buy it without quite deciding to.',
    'You know the price of things your children do not know the price of. You do not know how to transfer this knowledge.',
  )

  // ── DIASPORA / IMMIGRANT TEXTURE ─────────────────────────────────────────
  addIf(F('emigrated') && phase === 'young_adult',
    'The accent you had not known you had until someone here pointed it out.',
    'The food you cannot find here that you are slowly substituting for. The substitute is adequate.',
  )
  addIf(F('emigrated') && phase === 'midlife',
    'The country you came from and the country you are in have both changed without waiting for you.',
    'The calculation — to stay or return — that you have been doing for fifteen years and cannot finish.',
  )
  addIf(F('emigrated') && phase === 'late_life',
    'You are fluent now. You dream in both languages. The dreaming-in does not decide the question.',
    'The place you came from: changed. The place you remember: no longer quite exists.',
  )

  // ── RELIGION: SIKH ────────────────────────────────────────────────────────
  addIf(religion === 'sikh',
    'The kara on your wrist: you have worn it so long you forget it until it makes a sound.',
    'Seva at the gurdwara: the principle that service is the practice, not the preparation for a different practice.',
    'The langar: whoever comes eats the same food from the same kitchen in the same room. The equality is not decorative.',
  )

  // ── RELIGION: ANIMIST / TRADITIONAL ───────────────────────────────────────
  addIf(religion === 'animist' || religion === 'folk_religion',
    'The ancestors are addressed before decisions. This is not metaphor. The consultation is genuine.',
    'The seasonal ritual: you do it because your mother did it and her mother before her. The reason and the practice are the same thing.',
    'The offering left at the threshold: not superstition but acknowledgement that things exist beyond what can be measured.',
  )

  // ── RELIGION: SHIA ────────────────────────────────────────────────────────
  addIf(religion === 'muslim_shia',
    'Muharram: the grief is not historical in the way outside observers think. It is present. The mourning is for what is still lost.',
    'The particular authority of a senior cleric in this tradition: political and theological at once, the two not separated.',
  )

  // ── RELIGION: ETHIOPIAN ORTHODOX ─────────────────────────────────────────
  addIf(cn === 'Ethiopia' && isChristian,
    'The fasting calendar: two hundred days of the year, give or take. The city eats differently during these periods and the difference is visible.',
    'The timket celebration in January: the water, the procession, the sound of it. The oldest Christian country and its oldest celebration.',
  )

  // ── RELIGION: EVANGELICAL / PENTECOSTAL ──────────────────────────────────
  addIf(religion === 'christian_evangelical' || religion === 'christian_pentecostal',
    'The service can go on for four hours. Time is not the constraint. What is being reached for is the constraint.',
    'The testimony: someone from the congregation stands and says what happened to them. The congregation responds. This is participatory in a way that other services are not.',
    'The prosperity gospel has its critics inside the church as well as outside. The congregation holds both positions.',
  )

  // ── HINDU DAILY RHYTHM ────────────────────────────────────────────────────
  addIf(isHindu && phase !== 'early_childhood',
    'The morning puja: the small flame, the specific flowers, the precise sequence. The sequence varies by family. Yours is yours.',
    'The temple at a festival: the noise, the colour, the logistics of devotion at scale.',
    'The calendar of auspicious days: certain things happen on certain days. The calendar and the daily calendar coexist.',
  )

  // ── DALIT / CASTE TEXTURE ─────────────────────────────────────────────────
  addIf(state.character?.country?.casteSystem && cn === 'India',
    'The caste operates mostly without being named. It is in the neighbourhood, the school, the job, the marriage list.',
    'The reservation system: the official remedy, the unofficial resentment, the gap between what is guaranteed and what is given.',
  )

  // ── KOREAN EXAM CULTURE ───────────────────────────────────────────────────
  addIf(cn === 'South Korea' && hasChildren && era >= 1990,
    'The hagwon bills: a second household expense, accepted as the cost of not falling behind.',
    'The suneung year: the house operates around the exam. The exam is treated as both solvable and unjust, simultaneously.',
  )
  addIf(cn === 'South Korea' && phase === 'young_adult' && era >= 1985,
    'The hierarchy of university attended follows you into the office, which is known and not discussed.',
    'The standard script: the job, the apartment, the marriage, the children, in the expected sequence. Deviation requires a longer explanation than compliance.',
  )

  // ── JAPANESE WORK CULTURE ────────────────────────────────────────────────
  addIf(cn === 'Japan' && careerField !== null && era >= 1960 && era <= 2000,
    'Leaving before your senior has left: not impossible, but noticed.',
    'The after-work drinks that are not optional in the way optional implies a genuine choice.',
    'The company trip: two days of team-building on someone else\'s schedule. You go.',
  )
  addIf(cn === 'Japan' && phase === 'midlife' && era >= 2000,
    'Karoshi is the word for what is admitted when it goes too far. Before it goes too far, it is called dedication.',
    'The younger generation arriving with different expectations. The gap between what they expect and what exists is the conversation everyone is having.',
  )

  // ── WORKING MOTHER ────────────────────────────────────────────────────────
  addIf(gender === 'female' && hasChildren && careerField !== null && phase === 'midlife',
    'The question that fathers are not asked: how do you manage it? The question contains the assumption.',
    'The leaving at exactly five because the childcare closes at six. The leaving is logged without a word by everyone who stays.',
    'You are good at two things and the combination costs you full sleep and you do not mention this.',
  )

  // ── SINGLE FATHER ─────────────────────────────────────────────────────────
  addIf(gender === 'male' && hasChildren && !hasPartner,
    'The things you learned out of necessity that you did not know you would need to know.',
    'The coordination that used to be distributed between two people and is now only you.',
    'People are more helpful than they might otherwise be. The help is welcome. The reason it is offered is complicated.',
  )

  // ── CAREGIVER OF PARENT WITH DEMENTIA ────────────────────────────────────
  addIf(F('dementia_primary_carer') || F('dementia_shared_care'),
    'The repetition: the same story, the same question, answered each time as though it is the first. It is the first for them.',
    'The moment they were themselves today: you hold it. It happened. It was real.',
    'The strange grief of caring for someone who is still here.',
  )

  // ── AGRICULTURAL LABORER ──────────────────────────────────────────────────
  addIf(isRural && (isDeveloping || isSubsaharan) && careerField === null,
    'The body that knows the season before the calendar does: the knee, the shoulder, what the rain will do.',
    'The harvest: the days when everything else stops because this cannot wait.',
    'The land as employer: the negotiation is with weather and soil, which do not negotiate.',
  )

  // ── COASTAL / FISHING COMMUNITY ──────────────────────────────────────────
  addIf(isRural && (cn === 'Philippines' || cn === 'Vietnam' || cn === 'Bangladesh' || cn === 'Norway' || cn === 'Indonesia' || cn === 'Sri Lanka'),
    'The sea is the job and the weather is the supervisor and the supervisor does not explain decisions.',
    'The boat: maintained because the alternative is not a boat.',
    'What the tide is doing at any given moment: known without checking.',
  )

  // ── MINING / EXTRACTION COMMUNITY ────────────────────────────────────────
  addIf(cn === 'South Africa' || cn === 'Zambia' || cn === 'Bolivia' || cn === 'Chile' || cn === 'Colombia',
    'The shift pattern divides the week differently from everywhere else. The week is underground and above ground, in rotation.',
    'The dust: in the lungs, in the house, in the ten-year health projection everyone in this town shares.',
  )

  // ── 1920S–1930S TEXTURE ───────────────────────────────────────────────────
  addIf(era >= 1920 && era <= 1939 && phase !== 'early_childhood',
    'The newspapers are the source. The radio is new. Both are how the world arrives.',
    'The money that disappeared: not everyone\'s, but enough people\'s that its absence is a fact of the decade.',
    'The sense that something has changed permanently since the last war. Everyone is still working out what.',
  )

  // ── 1950S COLD WAR TEXTURE ────────────────────────────────────────────────
  addIf(era === 1950 && phase !== 'early_childhood',
    'The bomb is the thing no one discusses directly. It is in the architecture of every conversation about the future.',
    'The television is new in the house or almost in the house. Everything it changes will take a generation to see.',
  )
  addIf(era === 1950 && isPostSoviet && phase !== 'early_childhood',
    'The official optimism and the private accounting are not the same document.',
    'The collective is the unit. The unit has benefits and costs that are fixed and not subject to negotiation.',
  )

  // ── 1970S TEXTURE ────────────────────────────────────────────────────────
  addIf(era === 1970 && isWealthyArch && phase !== 'early_childhood',
    'The decade doesn\'t know yet whether the previous decade meant anything. The cities are dirtier. The music is louder.',
    'The oil price is a daily fact. The queue, the rationing, the reorientation of what prosperity costs.',
  )
  addIf(era === 1970 && isDeveloping && phase !== 'early_childhood',
    'The liberation movements and the new governments and the question of what independence has delivered.',
    'The price of things is going up and the reason is far away but the price is here.',
  )

  // ── 1980S TEXTURE ────────────────────────────────────────────────────────
  addIf(era === 1980 && isWealthyArch && phase !== 'early_childhood',
    'The illness with no name yet and then with a name and then with a face on the news. The decade folds around it.',
    'The money decade: someone is making a great deal of money. You know someone who knows someone.',
  )

  // ── NOMADIC / PASTORALIST ─────────────────────────────────────────────────
  addIf(isRural && (cn === 'Mongolia' || cn === 'Kazakhstan' || cn === 'Niger' || cn === 'Ethiopia' || cn === 'Somalia') && era <= 2000,
    'The season determines the direction. The direction determines the next three months.',
    'The ger or the tent: assembled and disassembled enough times that the hands know the sequence without the eyes.',
    'Distance is a different category than it is for people who stay in one place.',
  )

  // ── ARCTIC / EXTREME COLD ────────────────────────────────────────────────
  addIf(cn === 'Norway' || cn === 'Canada' || cn === 'Russia' && isRural,
    'The cold at a certain temperature becomes a kind of architecture: the way you move through it, the things you keep close.',
    'The light that returns after the long dark: this is not a metaphor, it is a physiological event.',
    'Winter preparations: the checklist runs for weeks. Failing the checklist is not an option.',
  )

  // ── TROPICAL DAILY ────────────────────────────────────────────────────────
  addIf((cn === 'Nigeria' || cn === 'Ghana' || cn === 'Kenya' || cn === 'Philippines' || cn === 'Indonesia' || cn === 'Thailand') && era >= 1960,
    'The heat is a fact of the body all day and the management of the heat is part of every plan.',
    'The rainy season: everything planned around it. The dry season: everything planned around when it will end.',
    'The power cut reorganises the evening. The reorganisation has been practised so many times it is fluent.',
  )

  // ── POST-PRISON REINTEGRATION ─────────────────────────────────────────────
  addIf(F('decade_after_prison') || F('family_after_prison'),
    'The decade since: you count it from one date. Most of what you are now happened after that date.',
    'The checkbox on the form. The question about prior convictions. The calculation before answering.',
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
