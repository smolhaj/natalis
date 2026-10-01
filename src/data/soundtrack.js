// Cultural marker layer — injected alongside headlines as atmospheric texture.
// Not news: felt culture. The song on the radio, the year everyone was wearing the same thing,
// the gadget that changed how a room felt. One or two sentences. Present tense, second person
// where possible. No exclamation points. No gamey framing.
//
// Format: { year, text, archetypes, countries, minAge, maxAge }
// archetypes: array or 'all'
// countries: specific country names or null
// minAge / maxAge: optional age gates
//
// `tech` names a technology the line needs in the house (see technology.js),
// `urban: true` keeps a line in the city, and `when(state)` is an extra guard.
//
// What a person heard was the music of where they lived. This list was the
// Anglo-American pop chronology with three nods outward, and its `'all'`
// entries were the most repeated lines in the game: "Gangnam Style" in 16 of
// 22 read lives, Exodus in 12, Thriller in 10, the Millennium in 17 — and a
// rural Bavarian of ninety was told about Spotify and House of Cards. A
// Nigerian in 1984 heard King Sunny Adé and Fela; a Soviet teenager in 1988
// heard Tsoi; Cairo stopped on the first Thursday of the month for Umm
// Kulthum; Delhi emptied on Sunday mornings for the Ramayan. Every region now
// has its own, so the pick-one-per-year draw lands on the place.

import { hasTech } from './technology.js'
import { REGIONS as R, COUNTRY_NAMES } from './headlines.js'

const join = (...lists) => [...new Set(lists.flat())]
const but = (...names) => COUNTRY_NAMES.filter(n => !names.includes(n))
const COLD_WAR_EUROPE = join(R.westEurope, R.eastBloc, R.yugoslavia, R.soviet, ['United States', 'Canada'])

/**
 * Is this cultural marker something this character could have heard, this
 * year, where they live? The matcher in tick.js reads the BIRTH country and
 * ignores `tech`/`urban`/`when`; this is its replacement.
 */
export function soundtrackFits(s, state) {
  if (s.year !== state.currentYear) return false
  const age = state.age ?? 0
  if (s.minAge && age < s.minAge) return false
  if (s.maxAge && age > s.maxAge) return false
  const live = state.currentCountry ?? state.character?.country
  if (s.archetypes && s.archetypes !== 'all' && !s.archetypes.includes(live?.archetype)) return false
  if (s.countries && !s.countries.includes(live?.name)) return false
  const placeType = state.currentPlace?.type
  const rural = (placeType === 'rural' || placeType === 'urban' ? placeType : state.character?.ruralUrban) === 'rural'
  if (s.urban && rural) return false
  if (s.tech && !hasTech(live, s.tech, state.currentYear, { rural })) return false
  if (s.when && !s.when(state)) return false
  return true
}


// One place's music, heard by the people who lived there.
const at = (year, countries, text, extra = {}) =>
  ({ year, text, archetypes: 'all', countries, minAge: 8, maxAge: null, ...extra })

const REGIONAL = [
  // ── West Africa ─────────────────────────────────────────────────────────────
  at(1957, ['Ghana'], 'Highlife at every dance and on every radio. E.T. Mensah\'s band is the sound the new country has agreed it sounds like.'),
  at(1960, ['DR Congo', 'Nigeria', 'Ghana', 'Cameroon', 'Kenya', 'Tanzania', 'Uganda', 'Senegal', 'Ivory Coast', 'Guinea', 'Mali', 'Central African Republic', 'Rwanda'],
    '"Indépendance Cha Cha." Grand Kallé\'s band recorded it in Brussels while the talks were going on, and by the end of the year it is playing in bars from Léopoldville to Lagos.', { tech: 'radio' }),
  at(1966, ['Guinea'], 'Bembeya Jazz on the national radio. The state pays the orchestras, and the orchestras sing the old epics of Mali, and the country is meant to hear itself in them.'),
  at(1973, ['Cameroon'], 'Manu Dibango\'s "Soul Makossa" was the B-side of a football anthem, and now a disc jockey in New York is playing it every night. Douala is very pleased with itself.'),
  at(1974, ['DR Congo'], 'Ali and Foreman in Kinshasa. The fight starts at four in the morning so that America can watch it in the evening, and the stadium is full anyway. "Ali, boma ye."'),
  at(1977, ['Nigeria'], '"Zombie" is everywhere, and the army hates it. In February soldiers burn the Kalakuta Republic and throw Fela\'s mother from a window. The record goes on selling.', { minAge: 12 }),
  at(1982, ['Nigeria', 'Benin'], 'King Sunny Adé on a Saturday night: the talking drum, the steel guitar, the names of the people paying for the party sung out between verses, and the notes pressed to his forehead.'),
  at(1985, ['Senegal', 'Gambia', 'Mali', 'Guinea'].filter(n => COUNTRY_NAMES.includes(n)), 'Youssou N\'Dour and the Super Étoile. Mbalax: the sabar drums carried into the dance hall and played fast enough that the floor shakes.'),
  at(1985, ['DR Congo', 'Central African Republic', 'Rwanda', 'Kenya', 'Tanzania', 'Uganda', 'Zambia', 'Cameroon'], 'Franco\'s "Mario", a song about a kept man, a quarter of an hour long. The bars play all of it.'),
  at(1987, ['Mali', 'Guinea', 'Senegal', 'Burkina Faso', 'Ivory Coast'], 'Salif Keita on the radio, from Paris now. A descendant of the kings, from the line that was not supposed to sing, and Bamako knows every word.'),
  at(1990, ['Nigeria'], 'Sir Shina Peters, "Ace". The whole country is doing the same dance at the same parties, and the newspapers have a word for it: Shinamania.'),
  at(2003, ['Ivory Coast', 'Burkina Faso', 'Mali', 'Togo', 'Benin', 'Senegal', 'Cameroon'], 'Coupé-décalé. Ivorians invented it in Paris nightclubs, throwing money in the air, and it comes home in the middle of the war as the sound of a party that will not stop for one.', { maxAge: 45, urban: true }),
  at(2004, ['Nigeria', 'Ghana'], '2Face Idibia\'s "African Queen" at every wedding. A Nigerian love song on Nigerian radio more often than the imported ones is new enough that people remark on it.', { maxAge: 55 }),
  at(2012, ['Ghana'], 'Azonto. The dance arrives before the songs about it do, and then every song is about it.', { maxAge: 40 }),
  at(2012, ['Nigeria'], 'D\'banj\'s "Oliver Twist" climbs the charts in London. At home it is simply the song at every party, and nobody thinks of it as an export.', { maxAge: 50 }),
  at(2018, ['Nigeria', 'Ghana'], 'Burna Boy\'s "Ye" in the danfo, at the owambe, in the barbershop. Somebody\'s uncle is sure it is about Kanye West.', { maxAge: 55, urban: true }),

  // ── East Africa ─────────────────────────────────────────────────────────────
  at(1962, ['Kenya', 'Tanzania', 'Uganda'], '"Malaika" on the radio: a love song in Swahili, about a man too poor to marry the girl. Everyone knows the words. Everyone disagrees about who wrote it.', { tech: 'radio' }),
  at(1972, ['Ethiopia', 'Eritrea'], 'Mahmoud Ahmed and the brass bands. The nights in Addis run late, and the songs are in Amharic and sound like nothing else.', { urban: true }),
  at(1976, ['Ethiopia', 'Eritrea'], 'The curfew has closed the clubs. The bands play at weddings, in the afternoon, and the songs have become careful.', { urban: true, minAge: 12 }),
  at(2005, ['Kenya'], 'Genge in the matatu, at a volume the new traffic rules have opinions about. The conductor chooses the music, and the music decides which matatu the schoolchildren wait for.', { maxAge: 40, urban: true }),
  at(2005, ['Ethiopia'], 'Teddy Afro\'s "Yasteseryal", released in an election year. Every side hears itself in it. The cassette sellers on the pavement cannot keep it in stock.', { maxAge: 50 }),
  at(2007, ['Ethiopia'], 'The millennium, seven years after everyone else\'s. On the eve of the year 2000 by the Ethiopian calendar the country stays up, and Addis is lit.', { minAge: 5 }),
  at(2014, ['Tanzania', 'Kenya', 'Uganda'], 'Diamond Platnumz. Bongo flava has stopped sounding like an imitation of anything.', { maxAge: 45 }),

  // ── Southern and Central Africa ─────────────────────────────────────────────
  at(1972, ['Angola'], 'Bonga\'s voice from exile in Rotterdam, singing in Kimbundu. The record comes in quietly and is played quietly.', { minAge: 12 }),
  at(1973, ['Zambia'], 'WITCH and the other Lusaka bands: rock with fuzz pedals, in English, for halls full of copper miners\' children. The copper price is still good.', { urban: true, maxAge: 35 }),
  at(1979, ['Zimbabwe'], 'Thomas Mapfumo sings in Shona over guitars played the way an mbira is played. The Rhodesian radio stops playing him, and he is detained for a time. Everyone knows the songs anyway.'),
  at(1983, ['South Africa', 'Namibia', 'Zimbabwe', 'Zambia'], 'Brenda Fassie\'s "Weekend Special". The townships sing along with a woman who is only somebody\'s weekend.'),
  at(1993, ['Zimbabwe'], 'Oliver Mtukudzi\'s "Neria", about a widow whose husband\'s family takes the house. Every woman at a funeral knows someone it is about.'),
  at(1995, ['South Africa'], 'Kwaito: house music slowed down, the words in township slang. It is the first sound that belongs to afterwards.', { maxAge: 40 }),
  at(2020, ['South Africa', 'Zimbabwe', 'Namibia', 'Mozambique', 'Zambia'], '"Jerusalema". Master KG\'s song becomes a dance that nurses film in hospital corridors on the other side of the world. Here it was already last year\'s song.', { maxAge: 70 }),

  // ── The Soviet Union and after ──────────────────────────────────────────────
  at(1955, R.soviet, 'Raj Kapoor in Awaara. The tramp in the bowler hat sings "Awara hoon", and half the country can sing it back in a language it does not speak.'),
  at(1957, R.soviet, '"Moscow Nights" is everywhere after the Youth Festival. For two weeks the capital was full of foreigners, and some of the girls who danced with them are still being talked about.'),
  at(1968, R.soviet, 'A Vysotsky tape, copied from a copy of a copy, his voice hoarse through the hiss. He is not on the radio. Everybody has heard him.', { minAge: 12, tech: 'radio' }),
  at(1976, R.soviet, 'The Irony of Fate on New Year\'s Day: a man too drunk to know he has flown to Leningrad lets himself into an identical flat on an identical street. It will be on every New Year after this.', { tech: 'television' }),
  at(1976, join(R.soviet, R.eastBloc), 'Alla Pugacheva sings "Arlekino" and laughs in the middle of it. After this she is simply Alla.'),
  at(1980, R.soviet, 'Vysotsky is dead. There is one small notice in the evening paper, and still the crowd outside the Taganka theatre stretches down the street, in the middle of the Olympics.', { minAge: 12 }),
  at(1982, join(R.centralAsia, ['Russia', 'Ukraine', 'Belarus']), 'Yalla\'s "Uchkuduk", a song about three wells in the desert, on every radio in the Union. Tashkent is proud of it.'),
  at(1988, R.soviet, 'Viktor Tsoi at the end of Assa, singing "Peremen" — we want changes. A song that would not have been allowed three years ago is playing in a state cinema.', { minAge: 12, maxAge: 40 }),
  at(1988, R.baltic, 'The song festival grounds in Tallinn: night after night, a hundred thousand people singing the songs that were not allowed. Nobody plans what happens next. They keep singing.'),
  at(1990, R.soviet, 'Tsoi is dead, a car crash in Latvia. On the Arbat a wall fills up with his name. "Tsoi is alive", in paint and in chalk.', { minAge: 10, maxAge: 40 }),
  at(1999, ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan'], 'Zemfira\'s first album: a girl from Ufa with a guitar, and every girl of fifteen knows it by the autumn.', { maxAge: 35 }),
  at(2004, ['Ukraine'], 'Ruslana wins the Eurovision in furs and leather, drumming. The country watches itself be seen.'),
  at(2004, ['Moldova', 'Romania'], '"Dragostea din tei" — three young men from Chișinău, and the whole of Europe is singing words it cannot pronounce.', { maxAge: 45 }),

  // ── Central and Eastern Europe ──────────────────────────────────────────────
  at(1969, ['Czech Republic', 'Slovakia'], 'Marta Kubišová\'s "Prayer for Marta". After August it became the song of the occupation, and soon she will not be allowed to sing at all.'),
  at(1967, ['Poland'], 'Czesław Niemen sings that the world is strange, and that there is too much hatred in it. The censor lets it through. Everyone under thirty knows it by heart.'),
  at(1969, ['Hungary'], 'Omega\'s "Pearls in Her Hair". The beat bands have been given a little room, and they are filling it.', { maxAge: 35 }),
  at(1977, R.yugoslavia, 'Bijelo Dugme fill a field in Belgrade: long hair, a folk melody under the rock, and the whole federation singing the same chorus.', { maxAge: 40 }),
  at(1983, ['Poland'], 'Perfect, Lady Pank, Republika: Polish rock on the radio under martial law, with lyrics the censor has read twice.', { maxAge: 40 }),
  at(1985, ['Romania'], 'The television is two hours a night and most of it is the Conducător. The music people actually listen to comes through on Radio Free Europe, or on a cassette from Yugoslavia.'),
  at(1985, ['Albania'], 'The aerial on the roof is turned toward Italy, carefully. Sanremo arrives through the snow on the screen, and nobody in the building says they watched it.', { tech: 'television' }),

  // ── Western Europe ──────────────────────────────────────────────────────────
  at(1954, ['Germany'], 'Herbert Zimmermann on the radio from Berne: aus, aus, das Spiel ist aus. People cheer in the street for the first time in a long time and are not quite sure they are allowed to.', { minAge: 5 }),
  at(1958, ['Italy'], 'Domenico Modugno at Sanremo flings his arms wide: "Volare". By the summer it is the whole country\'s song, and then America\'s.'),
  at(1960, ['Portugal'], 'Amália Rodrigues on the wireless. Fado: the regime is fond of it, and the people who cannot stand the regime love it anyway.'),
  at(1962, ['France', 'Belgium', 'Switzerland'], 'Salut les copains on the transistor. Françoise Hardy sings that all the boys and girls her age go two by two, and she does not.', { maxAge: 30 }),
  at(1963, ['France'], 'Piaf is dead. The crowd at Père Lachaise is so large that it stops the traffic.'),
  at(1967, ['Greece'], 'Theodorakis is banned. Owning his records is an offence, and so everyone knows exactly which records they are.', { minAge: 12 }),
  at(1974, ['Portugal'], '"Grândola, Vila Morena" on Rádio Renascença at twenty past midnight. It is the signal. By morning the soldiers have carnations in their rifles.'),
  at(1977, ['United Kingdom'], 'The Sex Pistols\' "God Save the Queen" in Jubilee week, banned by the BBC. It reaches number two, and everyone has a theory about why not one.', { maxAge: 35 }),
  at(1981, ['Spain'], 'Madrid stays up. A new band every week at the Rock-Ola, and a city finding out what it sounds like now that nobody is listening for it.', { maxAge: 35, urban: true }),
  at(1982, ['Italy'], 'Nando Martellini on the television, three times: campioni del mondo. Pertini on his feet in the stand in Madrid.', { tech: 'television' }),
  at(1983, ['Germany', 'Austria', 'Switzerland'], 'Nena, "99 Luftballons": a pop song about a war begun by mistake, in a country with the missiles parked in it.', { maxAge: 35 }),
  at(1985, ['Norway'], 'a-ha\'s "Take On Me", a pencil-drawn video, and three boys from Oslo are on American television. The country does not quite know how to take this.', { maxAge: 40 }),
  at(1994, ['Ireland'], 'Riverdance, in the interval at the Eurovision in Dublin. Seven minutes of it, and by the morning the country has decided something about itself.', { tech: 'television' }),
  at(1995, ['United Kingdom'], 'Blur against Oasis, the same Monday, as if it were an election. The news covers it as one.', { maxAge: 40 }),
  at(1998, ['France'], 'A million people on the Champs-Élysées and Zidane\'s face projected on the Arc de Triomphe. Black, blanc, beur, they sing.'),
  at(2006, ['Finland'], 'Lordi, in monster masks, win the Eurovision. A country that has never won anything at it decides it is delighted.'),
  at(2010, ['Spain'], 'Iniesta in the hundred and sixteenth minute. In Barcelona and in Madrid, for one night, the same flag on the balconies.'),

  // ── Latin America and the Caribbean ─────────────────────────────────────────
  at(1952, ['Argentina'], 'Evita is dead. Every night the radio interrupts itself at twenty-five past eight, the hour at which she passed into immortality.', { minAge: 5 }),
  at(1956, ['Trinidad and Tobago'], 'The Mighty Sparrow\'s "Jean and Dinah", the Road March: the Yankees are going home, and the women who did business with them are on their own.'),
  at(1957, ['Mexico'], 'Pedro Infante is dead, his plane down at Mérida. The procession through the capital is the largest anyone remembers, and the cinemas run his films for weeks.'),
  at(1959, ['Brazil'], 'João Gilberto\'s "Chega de Saudade": a voice barely above speaking, a guitar that keeps the samba underneath. The young say it is the new thing. Their parents say he is out of tune.', { urban: true }),
  at(1962, ['Jamaica'], 'Ska on the sound systems in Kingston, and Derrick Morgan\'s "Forward March" for Independence. The dances go on until the police arrive.'),
  at(1968, ['Brazil'], 'Tropicália: Caetano and Gil with electric guitars at the festival, booed and then copied. By December the decree is in force, and by next year both of them are in London.', { minAge: 12 }),
  at(1970, ['Brazil'], '"Pra Frente Brasil": ninety million in action. The generals have adopted the team, and the march plays between the news bulletins.'),
  at(1973, ['Chile'], 'Víctor Jara is dead, in the stadium that will one day carry his name. His records are taken out of the shops. People keep the ones they have where they keep the other things they are not supposed to have.', { minAge: 12 }),
  at(1975, but('Cuba').filter(n => R.latinAmerica.includes(n)), 'El Chavo del Ocho in the early evening: the boy in the barrel, the courtyard, the slap. Every child from Tijuana to Santiago does the voice.', { tech: 'television', maxAge: 50 }),
  at(1975, ['Cuba'], 'Silvio Rodríguez and Pablo Milanés on the radio. The nueva trova is officially the revolution\'s music, and the boys with guitars on the Malecón play it at night as if it were their own.'),
  at(1975, ['Argentina'], 'Sui Generis say goodbye at the Luna Park. Rock in Spanish, by boys from Buenos Aires, and the police do not like the hair.', { maxAge: 35 }),
  at(1977, ['Venezuela', 'Colombia', 'Puerto Rico', 'Dominican Republic'], 'Oscar D\'León spins his double bass while he sings. Salsa from Caracas, and the dance halls are full on a Friday.'),
  at(1982, ['Argentina'], 'The radio has stopped playing songs in English. For the weeks of the war Argentine rock is the only rock on the air, and it never quite goes back.'),
  at(1983, ['Peru'], 'Los Shapis: chicha, cumbia played on electric guitars by people from the sierra, filling the coliseos at the edges of Lima on a Sunday afternoon.'),
  at(1988, ['Brazil'], 'Xuxa on the television every morning, a generation of children who know every word, and parents who have heard every word.', { minAge: 3, maxAge: 45, tech: 'television' }),
  at(1990, ['Dominican Republic', 'Puerto Rico', 'Venezuela', 'Colombia', 'Cuba'], 'Juan Luis Guerra\'s "Ojalá que llueva café": a merengue that wishes coffee would rain on the countryside, played in the cities by people whose parents left it.'),
  at(1994, ['Colombia'], 'Carlos Vives sings the old vallenatos with an electric band, and the city children who were embarrassed by accordion music are not any more.'),
  at(1994, ['Cuba'], 'Los Van Van at a dance on a Saturday: timba, music the rest of the world has not heard yet, for people who came on bicycles because there is no petrol.'),
  at(2004, join(R.latinAmerica, ['Spain']), 'Daddy Yankee\'s "Gasolina" from every car with its windows down. The parents call it noise. It is the noise of the decade.', { maxAge: 40, urban: true }),
  at(2011, ['Brazil', 'Portugal'], 'Michel Teló\'s "Ai se eu te pego", and the footballers celebrating goals with the dance. It is inescapable, which is the point of it.', { maxAge: 50 }),
  at(2017, join(R.latinAmerica, ['Spain', 'United States']), '"Despacito" on every speaker on the continent and then off it. A song in Spanish is the most played thing in the world.', { maxAge: 60 }),

  // ── South Asia ──────────────────────────────────────────────────────────────
  at(1955, ['India'], '"Mera Joota Hai Japani": the shoes are Japanese, the trousers English, the hat Russian, and the heart, Raj Kapoor sings, is still Hindustani.'),
  at(1960, ['India'], 'Mughal-e-Azam fills the cinemas for months. Madhubala in the hall of mirrors, singing that she has loved and will not be afraid.'),
  at(1963, ['India'], 'Lata Mangeshkar sings "Ae Mere Watan Ke Logon" for the soldiers killed in the war with China, and the Prime Minister, it is said, weeps.'),
  at(1965, ['Pakistan', 'Bangladesh'], 'Noor Jehan sings the war songs on Radio Pakistan, recorded overnight and broadcast in the morning.', { tech: 'radio' }),
  at(1971, ['Bangladesh'], 'Swadhin Bangla Betar Kendra, the free Bengali radio, from across the border. "Joy Bangla" and the songs, with the volume kept low in case a neighbour is listening.', { tech: 'radio' }),
  at(1975, ['India'], 'Sholay. Gabbar Singh\'s lines are being repeated in every schoolyard, and people go back to see it five and six times.'),
  at(1975, ['Afghanistan'], 'Ahmad Zahir on Radio Kabul. Every wedding in the city wants his songs.', { urban: true }),
  at(1983, ['India'], 'Mithun Chakraborty in Disco Dancer. "Jimmy Jimmy Aaja" from the radio at every paan shop.'),
  at(1987, ['India'], 'Sunday morning, the Ramayan on Doordarshan. The streets empty. In houses with a television the neighbours sit on the floor, and some of them garland the set.', { minAge: 5 }),
  at(1990, ['Pakistan', 'India'], 'Nusrat Fateh Ali Khan on a cassette in every bus. The driver turns it up at the place where the voice climbs.'),
  at(1995, ['India'], 'Dilwale Dulhania Le Jayenge: Shah Rukh Khan\'s arms flung wide in a mustard field. It opens at the Maratha Mandir in Bombay and does not leave.'),
  at(1997, ['Pakistan'], 'Junoon\'s "Sayonee": Sufi poetry and an electric guitar, and the censors are not sure what to do about the hair.', { maxAge: 40 }),
  at(1997, ['Afghanistan'], 'Music is forbidden. At the checkpoint the cassette is pulled from the car\'s player and its tape hung on the post, where it lifts in the wind.', { minAge: 5 }),
  at(2009, ['Pakistan'], 'Coke Studio on the television: the old folk songs sung with the new bands. Grandparents and grandchildren watching the same programme, for once.', { tech: 'television' }),

  // ── The Arab world, Iran, Turkey, Israel ────────────────────────────────────
  at(1964, R.arab, 'The first Thursday of the month, and Umm Kulthum on the radio: "Enta Omri", an hour long. The streets of Cairo go quiet. So do some in Baghdad and Rabat.', { tech: 'radio' }),
  at(1968, ['Lebanon', 'Syria', 'Jordan', 'Palestine'], 'Fairuz in the morning. The radio plays her before the news, and the day does not properly start until it has.', { tech: 'radio' }),
  at(1972, ['Morocco'], 'Nass El Ghiwane, out of Hay Mohammadi in Casablanca: the old Gnawa rhythms under street poetry. The students know every word.'),
  at(1973, ['Iran'], 'Googoosh on the television, and her haircut in every salon in Tehran.', { tech: 'television', urban: true }),
  at(1977, R.arab, 'Abdel Halim Hafez is dead at forty-seven. The radio plays nothing else for days.', { tech: 'radio' }),
  at(1978, ['Turkey'], 'Arabesk from the dolmuş radio: Orhan Gencebay, Müslüm Gürses, songs of provincial men grieving in the big city. The state radio will not play them, and they do not need it to.'),
  at(1978, ['Israel', 'Jordan'], 'Izhar Cohen wins the Eurovision with "A-Ba-Ni-Bi". Jordanian television, which was showing it, cuts away to a picture of a bunch of daffodils.', { tech: 'television' }),
  at(1985, R.gulf, 'Mohammed Abdu on a cassette in the car. The songs are long and nobody is in a hurry.', { tech: 'cassette' }),
  at(1988, ['Iran'], 'Googoosh has not sung since the revolution. The cassettes of the singers in Los Angeles come in under coats and are copied in back rooms.', { tech: 'cassette' }),
  at(1992, ['Algeria', 'Morocco', 'Tunisia', 'France'], 'Cheb Khaled\'s "Didi". Raï, which the imams and the government both disapprove of, from every car in Oran — and this year in Paris and Cairo as well.', { maxAge: 45 }),
  at(1996, R.arab, 'Amr Diab\'s "Nour El Ain" in the taxis of Cairo, the malls of Dubai, at every wedding from Casablanca to Kuwait.', { maxAge: 45 }),
  at(1997, ['Turkey'], 'Tarkan\'s "Şımarık", the song with the kissing sound, on every radio — and, for once, on radios abroad as well.', { maxAge: 45 }),
  at(2011, ['Syria'], 'In Hama the square sings "Yalla irhal ya Bashar" — come on, leave. Within a week everyone knows the words, and nobody sings them indoors.', { minAge: 12 }),

  // ── East Asia ───────────────────────────────────────────────────────────────
  at(1952, ['Japan'], 'Misora Hibari on the radio: a girl who sang for the black markets after the war, and now sings for the whole country.', { tech: 'radio' }),
  at(1961, ['Japan'], 'Kyu Sakamoto sings that he looks up as he walks so that the tears will not fall. It was written after the treaty protests failed, people say, though it sounds like a love song.'),
  at(1964, ['China'], 'The East Is Red, three thousand performers in the Great Hall of the People. The songs from it are on every loudspeaker by the end of the year.'),
  at(1965, ['South Korea'], 'Lee Mi-ja\'s "Camellia Girl" sells more than any record before it. It will later be banned for sounding too Japanese.'),
  at(1966, ['Japan'], 'The Beatles at the Budokan, and outside it the nationalists object to rock music in a hall built for the martial arts. More police than audience, people say.', { maxAge: 35 }),
  at(1968, ['China'], 'The eight model operas: on the loudspeakers, in the cinema, at the school performance. You know Li Yuhe\'s lines from The Red Lantern before you can read.', { minAge: 5 }),
  at(1975, ['South Korea'], '"Morning Dew" is banned. It was a song about the sunrise. Now it is the song the students sing outside the police line.', { minAge: 12 }),
  at(1980, ['China'], 'Teresa Teng on a cassette from Hong Kong, played low. By day old Deng rules, people say; by night, little Deng.', { tech: 'cassette' }),
  at(1983, ['China'], 'The Spring Festival Gala on CCTV, the first one. Everyone near a television watches it on New Year\'s Eve, and the next morning the whole courtyard talks about the same sketch.', { tech: 'television' }),
  at(1986, ['China'], 'Cui Jian in an old army jacket at the Workers\' Stadium, singing "Nothing to My Name". The students hear something in it that the song does not quite say.', { minAge: 12, maxAge: 40 }),
  at(1991, ['North Korea'], 'The Pochonbo Electronic Ensemble on the television: synthesisers, a guitar, and "Whistle" — a girl at a window, a boy whistling outside. It is a love song, which is rare enough to be remembered.', { tech: 'television' }),
  at(1992, ['South Korea'], 'Seo Taiji and Boys on a television talent show: rap, in Korean, and the judges give it the lowest score of the night. By the summer that does not matter.', { maxAge: 35 }),
  at(1999, ['Japan'], 'Utada Hikaru\'s First Love. She is sixteen, and it becomes the best-selling album this country has ever had.', { maxAge: 45 }),
  at(2012, ['North Korea'], 'The Moranbong Band on the television, in short skirts, with Mickey Mouse dancing across the stage behind them.', { tech: 'television' }),

  // ── Southeast Asia ──────────────────────────────────────────────────────────
  at(1957, ['Malaysia', 'Singapore'], 'P. Ramlee at the open-air cinema: he sings, he directs, he plays the fool, and the whole kampung goes.'),
  at(1968, ['Cambodia'], 'Sinn Sisamouth and Ros Sereysothea on the radio. Phnom Penh has its own rock and roll, Khmer words over surf guitars.', { tech: 'radio' }),
  at(1976, ['Indonesia', 'Malaysia'], 'Rhoma Irama, the king of dangdut: tabla, electric guitar, and a song about the evils of gambling that everyone dances to.'),
  at(1978, ['Philippines'], 'Freddie Aguilar\'s "Anak", about a son who breaks his parents\' hearts, on every jeepney radio — and then, people hear, in thirty countries.'),
  at(1981, ['Cambodia'], 'A cassette of Sinn Sisamouth survived somewhere, and somebody has copied it. The singers did not survive. Everyone knows this and plays it anyway.', { tech: 'cassette' }),
  at(1985, ['Thailand', 'Laos'], 'Pumpuang Duangjan on the radio on the bus to Bangkok: luk thung, the songs of rice-field girls in the city.'),
  at(1986, ['Philippines'], '"Bayan Ko" on EDSA, sung by a crowd too large for most of it to hear the person leading.'),
  at(1975, ['Vietnam'], 'On the radio on the thirtieth of April, a song written two days before: "As if Uncle Ho were here on the day of the great victory." In some houses it is turned up and in some it is turned down.'),
  at(1993, ['Vietnam'], 'Paris by Night videotapes from the Vietnamese abroad, copied and passed hand to hand. The singers left in 1975, and the songs are the ones from before.', { tech: 'vcr' }),
  at(2003, ['Indonesia'], 'Inul Daratista\'s drilling dance. The clerics want it banned, and so does Rhoma Irama. Every VCD stall sells it.'),
]

export const SOUNDTRACK = [

  // ── 1940s ────────────────────────────────────────────────────────────────────
  {
    year: 1942,
    text: 'Bing Crosby\'s "White Christmas" is on every radio that can reach a signal. It is the song of the war — not because it is about war, but because it is about somewhere else.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 5,
    maxAge: null,
  },
  {
    year: 1945,
    text: 'The big bands are playing again. Somewhere in the city, a ballroom is open that was closed last year. The music is the same but the people dancing are not.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 5,
    maxAge: null,
  },

  // ── 1950s ────────────────────────────────────────────────────────────────────
  {
    year: 1954,
    text: 'Bill Haley. Elvis. Something is changing in the music and the people who play it on the radio do not fully know what to do with it.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 10,
    maxAge: 35,
  },
  {
    year: 1956,
    text: 'A television set arrives in the street. Neighbours come to watch. The furniture in the sitting room is slowly reorganised around the screen.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 5,
    maxAge: null,
  },
  {
    year: 1958,
    text: 'Pelé. He is seventeen years old and the World Cup is over and the Brazilian newspapers run out of words for him. You hear his name everywhere for weeks.',
    archetypes: 'all',
    countries: join(R.latinAmerica, ['Sweden', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'United Kingdom']),
    minAge: 5,
    maxAge: null,
  },

  // ── 1960s ────────────────────────────────────────────────────────────────────
  {
    year: 1963,
    text: 'The Beatles are on every radio. Not a month passes without a new song, and each one is a different kind of thing from the last.',
    archetypes: 'all',
    countries: join(R.westEurope, R.anglo, ['Japan']),
    minAge: 10,
    maxAge: 35,
  },
  {
    year: 1967,
    text: 'The Summer of Love. Across a dozen cities, a generation is deciding something together — not loudly, but in the register it always happens: clothes, hair, music through an open window.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 14,
    maxAge: 30,
  },
  {
    year: 1969,
    text: 'Woodstock. Half a million people in a field in New York. Three days of music and rain. The scale of it becomes a myth before the mud has dried.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 35,
  },
  {
    year: 1966,
    text: 'James Brown live. There is no other way to describe what he does with a microphone. The concert hall smells of sweat and something electric.',
    archetypes: ['wealthy_west'],
    countries: ['United States'],
    minAge: 12,
    maxAge: null,
  },

  // ── 1970s ────────────────────────────────────────────────────────────────────
  {
    year: 1971,
    text: 'Fela Kuti is playing in Lagos. The Shrine is not a concert hall — it is an argument. The music says something about what this country is that no newspaper is allowed to say.',
    archetypes: ['subsaharan'],
    countries: ['Nigeria'],
    minAge: 12,
    maxAge: null,
  },
  {
    year: 1973,
    text: 'Pink Floyd\'s Dark Side of the Moon. It sits on the turntable in someone\'s flat for the better part of a year.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 14,
    maxAge: 35,
  },
  {
    year: 1974,
    text: 'ABBA win Eurovision with "Waterloo." A Swedish group, a song about Napoleon, a sequinned costume. It lands across the continent like a question no one had thought to ask.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 8,
    maxAge: null,
  },
  {
    year: 1977,
    text: 'Disco. It is everywhere — in the lift, leaking from the car parked outside, in the changing rooms at the pool. You either love it or you are starting to hate it.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 14,
    maxAge: 40,
  },
  {
    year: 1977,
    text: 'Bob Marley\'s Exodus. It crosses every border. There are places where "No Woman No Cry" is the only English song people know, which turns out to be enough.',
    archetypes: 'all',
    countries: join(R.caribbean, R.westAfrica, R.eastAfrica, R.southernAfrica, R.anglo, R.westEurope, R.pacific),
    minAge: 12,
    maxAge: null,
  },
  {
    year: 1979,
    text: 'The Walkman. A cassette player you hold in your hand and wire into your ears. The commute is never the same after this.',
    archetypes: 'all',
    countries: join(R.westEurope, R.anglo, ['Japan']),
    tech: 'cassette',
    minAge: 12,
    maxAge: null,
  },

  // ── 1980s ────────────────────────────────────────────────────────────────────
  {
    year: 1981,
    text: 'MTV launches. Music you can watch. The way a song looks starts to matter as much as how it sounds.',
    archetypes: ['wealthy_west'],
    countries: ['United States'],
    minAge: 10,
    maxAge: 35,
  },
  {
    year: 1982,
    text: 'Michael Jackson\'s Thriller. The album, then the video. Something about the scale of it — global, simultaneous — is different from anything before.',
    archetypes: 'all',
    countries: join(R.westEurope, R.anglo, ['Japan', 'Philippines', 'Mexico', 'Brazil', 'South Africa', 'Puerto Rico']),
    tech: 'television',
    minAge: 10,
    maxAge: null,
  },
  {
    year: 1984,
    text: 'The Macintosh computer. A screen with a mouse. The way you interact with a machine has changed in a way you cannot yet describe.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: null,
  },
  {
    year: 1984,
    text: '"We Are the World" and Band Aid\'s "Do They Know It\'s Christmas." The famine in Ethiopia heard through a chorus of pop stars. The gap between the music and the hunger is very large and everyone feels it.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 8,
    maxAge: null,
  },
  {
    year: 1985,
    text: 'Live Aid. Wembley and JFK Stadium on the same day. A billion and a half people watching the same television feed. Rock music discovering it has a purpose beyond itself.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 10,
    maxAge: null,
  },
  {
    year: 1987,
    text: 'The VHS. A film you can watch at home, on your own schedule, paused when you want. The cinema does not disappear, but something shifts in what it means to watch a film.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 10,
    maxAge: null,
  },
  {
    year: 1989,
    text: 'The Berlin Wall comes down. The images play on repeat. People hammering at concrete with their bare hands. Something felt impossible three months ago.',
    archetypes: 'all',
    countries: COLD_WAR_EUROPE,
    tech: 'television',
    minAge: 5,
    maxAge: null,
  },

  // ── 1990s ────────────────────────────────────────────────────────────────────
  {
    year: 1991,
    text: 'Nirvana\'s Nevermind. The album arrives and something changes about what rock music is supposed to want.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 35,
  },
  {
    year: 1993,
    text: 'The World Wide Web. You look at a page of text on a computer screen that someone in another country put there. It is slow, and mostly text, and you cannot explain why it feels significant.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 70,
  },
  {
    year: 1995,
    text: 'Windows 95. The Start button. The dial-up handshake sound becomes the sound of the decade — the screech and click of the world connecting.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 10,
    maxAge: 70,
  },
  {
    year: 1994,
    text: 'Boca–River. The World Cup final had different players but the same feeling: the country stops. Nothing else exists while the match is live.',
    archetypes: ['developing_urban'],
    countries: ['Argentina', 'Brazil'],
    minAge: 8,
    maxAge: null,
  },
  {
    year: 1997,
    text: 'Princess Diana dies in a Paris tunnel on a Sunday morning. By Monday, the grief is a collective event that no one fully accounts for.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 8,
    maxAge: null,
  },
  {
    year: 1998,
    text: 'Google. A search engine that finds things. It seems simple. You cannot see yet that it is where the question goes to die.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 70,
  },
  {
    year: 1999,
    text: 'The Millennium. Countries around the world count down at midnight in their own timezone, and the planet stays lit for twenty-four hours.',
    archetypes: ['wealthy_west', 'wealthy_east', 'wealthy_gulf', 'post_soviet', 'developing_urban'],
    countries: but('Saudi Arabia', 'Iran', 'Afghanistan', 'North Korea', 'Turkmenistan'),
    tech: 'television',
    urban: true,
    minAge: 5,
    maxAge: null,
  },

  // ── 2000s ────────────────────────────────────────────────────────────────────
  {
    year: 2001,
    text: 'The World Trade Centre. You watch it happen on television. The second plane, and then the towers. For a long time there is nothing to say.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 8,
    maxAge: null,
  },
  {
    year: 2003,
    text: 'iTunes. A song for ninety-nine cents. The record shop starts to look like a nostalgic choice rather than a necessity.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 70,
  },
  {
    year: 2004,
    text: 'Facebook starts. A website for university students to see each other\'s faces. It does not look like the beginning of anything.',
    archetypes: 'all',
    countries: ['United States'],
    minAge: 14,
    maxAge: 28,
  },
  {
    year: 2006,
    text: 'Nollywood. Nigeria produces more films than Hollywood now, measured by volume. The stories are cheap, loud, and shot fast — and people everywhere are watching.',
    archetypes: 'all',
    countries: join(R.westAfrica, R.eastAfrica, R.southernAfrica, ['Jamaica', 'Trinidad and Tobago', 'Guyana']),
    tech: 'vcr',
    minAge: 10,
    maxAge: null,
  },
  {
    year: 2007,
    text: 'The iPhone. A glass rectangle with no buttons. Steve Jobs on a stage in San Francisco says it will change everything. He is right, but not in the ways he says.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 12,
    maxAge: 70,
  },
  {
    year: 2008,
    text: 'Obama elected. The television cuts to Oprah weeping in Grant Park. The size of what this means is impossible to measure from inside it.',
    archetypes: ['wealthy_west'],
    countries: ['United States'],
    minAge: 10,
    maxAge: null,
  },
  {
    year: 2014,
    text: 'WhatsApp. A messaging app that uses your phone\'s internet instead of the carrier\'s network. Suddenly, calling family abroad costs nothing.',
    archetypes: ['developing_urban', 'subsaharan', 'developing_unstable'],
    countries: but('North Korea', 'Cuba', 'Eritrea', 'Turkmenistan', 'China'),
    tech: 'smartphone',
    minAge: 14,
    maxAge: null,
  },

  // ── 2010s ────────────────────────────────────────────────────────────────────
  {
    year: 2010,
    text: 'The iPad. A flat screen you hold with both hands. No keyboard. The gesture of it — pinch, swipe, tap — as if the machine has finally started speaking body language.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 12,
    maxAge: 70,
  },
  {
    year: 2011,
    text: 'Adele\'s 21. It is on in the car, in the supermarket, in the lift. Something about a voice that sad playing that loudly in public spaces — you notice it without being able to say why.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 14,
    maxAge: null,
  },
  {
    year: 2012,
    text: 'Psy\'s "Gangnam Style." One billion YouTube views — the first to reach it. A Korean pop song as the world\'s shared joke, its shared beat for six months.',
    archetypes: 'all',
    countries: join(['South Korea', 'Japan', 'Taiwan'], R.southeastAsia, R.anglo, R.westEurope, R.latinAmerica),
    minAge: 8,
    maxAge: 45,
    tech: 'home_internet',
    urban: true,
  },
  {
    year: 2013,
    text: 'Netflix starts making its own shows. House of Cards, then Orange Is the New Black. The television schedule — the fixed grid you arranged the week around — quietly becomes optional.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 14,
    maxAge: 70,
  },
  {
    year: 2015,
    text: 'Spotify. Every song ever recorded, available immediately. The record collection feels different now — still loved, but no longer necessary.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 14,
    maxAge: 70,
  },
  {
    year: 2016,
    text: 'David Bowie dies in January. Prince dies in April. Leonard Cohen in November. The obituaries of the year feel like the closing of something.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 16,
    maxAge: null,
  },
  {
    year: 2016,
    text: 'The Brexit vote. The Remain campaign lost by 52 to 48. For weeks, the conversations at tables are about what happened and who caused it and whether it can be undone.',
    archetypes: ['wealthy_west'],
    countries: ['United Kingdom'],
    minAge: 18,
    maxAge: null,
  },
  {
    year: 2017,
    text: 'M-Pesa. Mobile money. The ability to pay for anything — a taxi, a bag of grain, a school fee — from a phone in your pocket. The bank queue is becoming a memory.',
    archetypes: ['subsaharan'],
    countries: ['Kenya', 'Tanzania', 'Uganda'],
    minAge: 16,
    maxAge: null,
  },
  {
    year: 2018,
    text: 'Childish Gambino\'s "This Is America." The video: the dancing, then the gun. Everyone watches it and argues about what it means, which is the point.',
    archetypes: ['wealthy_west'],
    countries: ['United States'],
    minAge: 14,
    maxAge: null,
  },
  {
    year: 2019,
    text: 'Greta Thunberg addresses the UN. "How dare you." She is sixteen. The adults in the room look at their hands. Something about the specific heat of her anger is hard to dismiss.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 10,
    maxAge: null,
  },
  {
    year: 2019,
    text: 'Billie Eilish, Bad Guy. She is seventeen. The song sounds like it was produced inside a bedroom, which it was. The production is the intimacy.',
    archetypes: ['wealthy_west'],
    countries: null,
    minAge: 12,
    maxAge: 30,
  },

  // ── 2020s ────────────────────────────────────────────────────────────────────
  {
    year: 2020,
    text: 'The whole world is indoors at the same time. The birdsong in the streets is louder than it has been in years. Someone films it and posts it and everyone shares it.',
    archetypes: ['wealthy_west', 'wealthy_east', 'wealthy_gulf', 'post_soviet', 'developing_urban'],
    countries: but('North Korea', 'Turkmenistan'),
    tech: 'smartphone',
    minAge: 8,
    maxAge: null,
  },
  {
    year: 2021,
    text: 'TikTok. Short videos, vertical, algorithmically fed. The song you hear — whatever the algorithm has decided this week — is the one everyone is hearing at the same time.',
    archetypes: ['wealthy_west', 'wealthy_east', 'developing_urban'],
    countries: but('China', 'India'),
    tech: 'smartphone',
    minAge: 12,
    maxAge: 35,
  },
  {
    year: 2022,
    text: 'Ukraine. The images: the apartment blocks with one wall missing, the people in the metro station. Europe watching a ground war in real time on social media.',
    archetypes: 'all',
    countries: join(R.westEurope, R.eastBloc, R.baltic, ['Ukraine', 'Moldova', 'Georgia']),
    minAge: 10,
    maxAge: null,
  },
  {
    year: 2023,
    text: 'The AI writes the email, writes the essay, writes the song. It doesn\'t sound different. You are not sure whether that is the problem or the solution.',
    archetypes: ['wealthy_west', 'wealthy_east'],
    countries: null,
    minAge: 14,
    maxAge: 70,
  },

  ...REGIONAL,
]
