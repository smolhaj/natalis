// events_unwritten_east_south_africa.js — five peoples the roster draws and the
// corpus had never named.
//
// `unwritten-group` reported them together: the Afar of Djibouti (35%, and
// flagged disadvantaged), the Tigre of Eritrea (30%), the Banda of the Central
// African Republic (28%), the Ambundu of Angola (25%) and the Tsonga/Shangaan of
// southern Mozambique (23%). Each country had content; none of it was written
// from inside these groups, whose twentieth centuries have spines the
// country-generic events do not carry — a herd and a salt lake and a state run
// from the other community; a class of herders who owed butter to lords; a
// school uniform; a cotton quota and a purge; a mine contract signed at the
// border.
//
// Dates used, all checked.
// Djibouti: the independence referendum is 8 May 1977 and independence 27 June
// 1977, with Hassan Gouled Aptidon (Issa) as president and Ahmed Dini Ahmed
// (Afar) as prime minister; Dini resigns in December 1977. FRUD forms in August
// 1991 and fights from November; French troops deploy as a buffer in February
// 1992; the army retakes the north from July 1993; the Aba'a accord with the
// Ougoureh Kifleh faction is 26 December 1994; Dini's faction signs in February
// 2000 and the final accord is May 2001. The drought of 2008–2011 killed much of
// the interior's livestock. Every prime minister since 1977 has been Afar.
// Eritrea: under the British Military Administration (1941–52) the tigre
// serf-class of the Sahel and Barka stopped paying dues to the shumagulle
// nobility, and the dues were ended by the end of the 1940s. The ELF's first
// shots are 1 September 1961. Ethiopian reprisals burned lowland villages from
// 1967; Ona and Besikdira are 30 November–1 December 1970; She'eb is May 1988.
// The ELF is driven into Sudan by the EPLF and TPLF in 1981. Asmara is taken on
// 24 May 1991; the referendum is April 1993. UNHCR runs voluntary repatriation
// from the Sudanese camps from 2001.
// Central African Republic: Bokassa takes power 1 January 1966 and is crowned
// 4 December 1977; the uniform protests are January 1979 and the Ngaragba
// prison killings of schoolchildren April 1979; he is removed 20 September 1979.
// He returns in October 1986, is sentenced to death in June 1987, commuted, and
// dies in 1996; Bozizé rehabilitates him in December 2010. Séléka takes Bangui
// on 24 March 2013; the anti-balaka attack on Bangui is 5 December 2013; the
// camp at M'Poko airport holds around 100,000 at its peak and is closed at the
// turn of 2016–17. Bambari, in the Banda heartland of the Ouaka, is divided
// between armed groups from 2014.
// Angola: the Baixa de Cassanje revolt against Cotonang's cotton regime is
// January–February 1961, answered with aerial bombing; 4 January is kept as the
// day of the martyrs of colonial repression. 4 February 1961 is the attack on
// the Luanda prisons. The indigenato is abolished in September 1961.
// Independence is 11 November 1975. Nito Alves's rising is 27 May 1977 and the
// purge that follows kills thousands; President Lourenço apologises on 26 May
// 2021. The war ends with Savimbi's death on 22 February 2002 and the Luena
// memorandum of 4 April.
// Mozambique: WNLA ("Wenela") recruits in the south from the start of the
// century; after 1975 South Africa cuts Mozambican mine labour sharply and the
// recruiter becomes TEBA in 1977. Renamo's war in Gaza is at its worst
// 1984–1992; the Rome accord is 4 October 1992. Mozambicans crossing Kruger on
// foot is documented through the 1980s. South Africa's 1996 SADC amnesty and
// the 2000 exemption for former Mozambican refugees gave papers to some. The
// Limpopo floods are February–March 2000; Rosita Pedro is born in a tree on
// 1 March. The Limpopo floods Chókwè again in January 2013. The silicosis
// settlement is approved in July 2019 and the Tshiamiso Trust opens in 2020.

const once = (G, key) => !G.mem?.[key]
const liveCountry = (G) => G.currentCountry?.name ?? G.character?.country?.name
const MALE = (G) => G.character?.gender === 'male'
const RURAL = (G) => G.ruralUrban === 'rural'

const AFAR = (G) => G.character?.ethnicity === 'afar_djibouti'
const AFAR_HOME = (G) => AFAR(G) && liveCountry(G) === 'Djibouti'

const TIGRE = (G) => G.character?.ethnicity === 'tigre_eritrean'
const TIGRE_HOME = (G) => TIGRE(G) && liveCountry(G) === 'Eritrea'

const BANDA = (G) => G.character?.ethnicity === 'banda_car'
const BANDA_HOME = (G) => BANDA(G) && liveCountry(G) === 'Central African Republic'
const BANGUI = (G) => G.place?.id === 'cf_bangui'

const AMB = (G) => G.character?.ethnicity === 'ambundu'
const AMB_HOME = (G) => AMB(G) && liveCountry(G) === 'Angola'
const LUANDA = (G) => G.place?.id === 'ao_luanda'

const TSO = (G) => G.character?.ethnicity === 'tsonga_mozambique'
const TSO_HOME = (G) => TSO(G) && liveCountry(G) === 'Mozambique'

export const UNWRITTEN_ESA_EVENTS = [

  // ═══ FOLLOW-THROUGH ════════════════════════════════════════════════════════
  // Written first. Each is what a flag set further down becomes years later.

  // ── Afar ──
  {
    id: 'esa_afar_ft_herd',
    phase: null,
    weight: 280,
    when: (G) => AFAR_HOME(G) && G.flags.includes('esa_afar_herding') && G.age >= 40 && G.currentYear >= 1990 && once(G, 'esa_afar_ft_herd'),
    text: (G) => G.currentYear >= 2012
      ? 'After the dry years there were eleven goats where there had been sixty, and the camels were sold in Dikhil for what the trucks would pay. The ari your mother built stands folded against the wall of a concrete house at the edge of town. Your grandchildren know the names of the wells the way children know the names of saints. You still wake before light, as if something needs moving.'
      : 'The herd is smaller every year and the town is larger. Your cousins have jobs at the port or no jobs at all, and the ones who still walk the animals between the wells are spoken of as if they were stubborn. The mats of the ari are rolled in the corner of a room with a tin roof. You still wake before light, as if something needs moving.',
    choices: null,
    effect: (p) => { p.setMem('esa_afar_ft_herd', true); p.r += 3; p.m -= 1 },
  },

  {
    id: 'esa_afar_ft_frud',
    phase: null,
    weight: 300,
    when: (G) => AFAR(G) && (G.flags.includes('esa_afar_frud_fighter') || G.flags.includes('esa_afar_frud_war')) && G.currentYear >= 2001 && G.age >= 26 && once(G, 'esa_afar_ft_frud'),
    text: (G) => G.flags.includes('esa_afar_frud_fighter')
      ? 'The last of the men from the mountains signed in 2001, and some of them have jobs in the ministries now, in pressed shirts. You are not one of them. In the north there are still fields nobody walks across, and a goat went into one near Mabla last year. When the television shows the prime minister, who is always Afar, a man you fought beside says it is the same as before with a better chair.'
      : 'The war in the north ended twice, once in 1994 and once in 2001, and neither time did anything in your street change. Tadjourah was rebuilt with the same walls. The boys who went up into the mountains came down older and were given work or not. Some fields north of the gulf still have a painted stone at their edge, and every child is taught what the stone means.',
    choices: null,
    effect: (p) => { p.setMem('esa_afar_ft_frud', true); p.r += 4; p.e += 1 },
  },

  // ── Tigre ──
  {
    id: 'esa_tig_ft_camp',
    phase: null,
    weight: 300,
    when: (G) => TIGRE(G) && !TIGRE_HOME(G) && G.flags.includes('esa_tig_sudan_camp') && G.currentYear >= 2001 && G.age >= 20 && once(G, 'esa_tig_ft_camp'),
    text: 'The man from the refugee agency comes with a list and a lorry: whoever wants to go home can go home now, with a sack of grain and a plastic sheet. Your children were born in Sudan and speak the Arabic of Khartoum with your language underneath it, for proverbs and for scolding. The village you left has a new name on the map, or the same name and other people. Everyone you ask has a different answer about what is there.',
    context: 'Tens of thousands of Eritreans, most of them lowland Muslims and many of them Tigre, lived in Sudanese camps around Kassala and Gedaref for decades after fleeing Ethiopian reprisals. UNHCR ran a voluntary repatriation from 2001, and many chose not to use it.',
    choices: [
      {
        text: 'Get on the lorry',
        tag: null,
        outcome: 'At the border the soldiers are Eritrean, and it takes you a moment to understand what that means.',
        effect: (p) => { p.setMem('esa_tig_ft_camp', true); p.returnHome(); p.m += 3; p.r -= 2 },
      },
      {
        text: 'Stay where the children know the streets',
        tag: null,
        outcome: 'Your name stays on a list somewhere. The children do not ask about it.',
        effect: (p) => { p.setMem('esa_tig_ft_camp', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_tig_ft_elf',
    phase: null,
    weight: 300,
    when: (G) => TIGRE(G) && G.flags.includes('esa_tig_elf_fighter') && G.currentYear >= 1993 && G.age >= 40 && once(G, 'esa_tig_ft_elf'),
    text: 'In April 1993 you vote yes, like everyone, and the paper says ninety-nine per cent. The flag that goes up is the other front\'s flag, and on Martyrs\' Day the names read out are mostly the other front\'s dead. The men you fought beside in Barka are in Kassala, or in Jeddah, or under a tree whose place only you could find. You fought for this. It is very strange to be a guest at it.',
    context: 'The Eritrean Liberation Front began the armed struggle in 1961, with much of its base among lowland Muslims. It was driven out of Eritrea into Sudan by the EPLF, with TPLF help, in 1981. Independence in 1991 came under the EPLF, which became the ruling party.',
    choices: null,
    effect: (p) => { p.setMem('esa_tig_ft_elf', true); p.r += 5; p.m -= 2 },
  },

  // ── Banda ──
  {
    id: 'esa_ban_ft_1979',
    phase: null,
    weight: 280,
    when: (G) => BANDA(G) && G.flags.includes('esa_ban_uniform_1979') && G.currentYear >= 2011 && once(G, 'esa_ban_ft_1979'),
    text: 'On the radio they say the Emperor has been rehabilitated: a decree, a restored name, a word like "builder of the nation". He came back from exile in 1986 and was sentenced to death and then not, and died in 1996 in a house in Bangui. You were in the yard of the Lycée in January 1979 in the wrong shirt. Some of the children who were taken to Ngaragba that April are names only you and their mothers remember.',
    choices: null,
    effect: (p) => { p.setMem('esa_ban_ft_1979', true); p.r += 4; p.m -= 3 },
  },

  {
    id: 'esa_ban_ft_mpoko',
    phase: null,
    weight: 280,
    when: (G) => BANDA(G) && (G.flags.includes('esa_ban_mpoko') || G.flags.includes('esa_ban_2013')) && G.currentYear >= 2017 && G.age >= 12 && once(G, 'esa_ban_ft_mpoko'),
    text: (G) => G.flags.includes('esa_ban_mpoko') && !BANGUI(G)
      ? 'The priests\' compound in Bambari emptied slowly, a family at a time, as the river stopped being a border and then started again. You slept on its floor for most of a year. The church still has the marks on the wall where the mattresses were stacked in the day. When the bell goes you count the people coming through the gate, which is a habit and not a prayer.'
      : G.flags.includes('esa_ban_mpoko')
      ? 'The camp at the airport is gone. They paid each family a little to leave and then took the tarpaulins down, and the ground beside the runway is ground again. When a plane comes in low over the quarter you still look up and count, the way you did for a year under the hangar wing. Your youngest was born there, and will write "Bangui" on every form.'
      : 'You stayed in the house through the worst of it, with the door braced and the radio low. The neighbours who went to the airport came back in 2017 to roofs that were not there. Nobody on the street says what they did or did not do in December 2013. Everyone knows which houses were empty the longest.',
    choices: null,
    effect: (p) => { p.setMem('esa_ban_ft_mpoko', true); p.r += 3; p.karma += 1 },
  },

  // ── Ambundu ──
  {
    id: 'esa_amb_ft_cassanje',
    phase: null,
    weight: 280,
    when: (G) => AMB_HOME(G) && G.flags.includes('esa_amb_cassanje_1961') && G.currentYear >= 1980 && G.age >= 30 && once(G, 'esa_amb_ft_cassanje'),
    text: 'The fourth of January is on the calendar now as the day of the martyrs of colonial repression, and the schools teach it with a date and a number. The number is not the one your village uses. What you remember is not the planes but the silence after them, and your mother burying the cotton seed in the dark because the company would count the sacks. Nobody ever told you who counted the people.',
    choices: null,
    effect: (p) => { p.setMem('esa_amb_ft_cassanje', true); p.r += 4; p.e += 2 },
  },

  {
    id: 'esa_amb_ft_27maio',
    phase: null,
    weight: 300,
    when: (G) => AMB(G) && G.flags.includes('esa_amb_27maio') && G.currentYear >= 1997 && G.age >= 36 && once(G, 'esa_amb_ft_27maio'),
    text: (G) => G.currentYear >= 2021
      ? 'In May 2021 the President goes on television and asks forgiveness for the twenty-seventh of May, forty-four years late, in the same party\'s name. There will be bones returned, he says, and certificates. You watch it with your hands flat on the table. The certificate would say a date, and you have spent your life not knowing the date.'
      : 'Twenty years, and it is still not a thing people say aloud. The twenty-seventh of May is a gap in families all over Sambizanga and Rangel: a brother who went to a meeting, a cousin whose name was on a list. The party that did it is the party that runs everything. You say fraccionista only in your head.',
    context: 'On 27 May 1977 supporters of Nito Alves, a popular MPLA minister, attempted a rising in Luanda. It failed within hours, and the purge that followed over the next two years killed thousands, many of them MPLA members themselves. It was not officially acknowledged until 2021.',
    choices: null,
    effect: (p) => { p.setMem('esa_amb_ft_27maio', true); p.r += 5; p.m -= 2 },
  },

  // ── Tsonga ──
  {
    id: 'esa_tso_ft_miner',
    phase: null,
    weight: 300,
    when: (G) => TSO(G) && G.flags.includes('esa_tso_miner') && G.age >= 45 && G.currentYear >= 1990 && once(G, 'esa_tso_ft_miner'),
    text: (G) => G.currentYear >= 2020
      ? 'A young man from the Trust sets up a table under the mango tree with forms in Portuguese and English, and every old man in the district is there. Silicosis, he says, and tuberculosis caught in the hostels; there is money now for those who can prove the years. You have your Wenela book in a plastic bag, the pages brown, and the cough that has lived in your chest since before your daughter married.'
      : 'The cough came in the rains and did not leave. At the clinic they listen to your back and ask how many years underground, and write the number down without looking up. Half the men who signed with you at Ressano Garcia cough the same way. The iron roof you paid for with the deferred pay is still the best roof in the row.',
    choices: null,
    effect: (p) => { p.setMem('esa_tso_ft_miner', true); p.h -= 3; p.r += 3 },
  },

  {
    id: 'esa_tso_ft_kruger',
    phase: null,
    weight: 280,
    when: (G) => TSO(G) && !TSO_HOME(G) && G.flags.includes('esa_tso_kruger') && G.currentYear >= 1997 && G.age >= 20 && once(G, 'esa_tso_ft_kruger'),
    text: 'In the townships of Limpopo and on the edge of Johannesburg the old women speak your language, because the border cut through it before anyone asked. Now there is a paper: those who came through the park in the war years may apply to stay. You have lived here without one for long enough that the idea of being written down feels like a trap.',
    context: 'Between the mid-1980s and 1992 several hundred thousand Mozambicans, many of them Shangaan from Gaza, crossed into South Africa, often on foot through the Kruger National Park at night. South Africa offered exemptions to former Mozambican refugees in 1996 and again in 2000.',
    choices: [
      {
        text: 'Queue at the office with your papers',
        tag: 'yielding',
        outcome: 'It takes two days and a photograph. The card is green and you keep it in your shoe.',
        effect: (p) => { p.setMem('esa_tso_ft_kruger', true); p.setResidency('permanent_resident'); p.m += 4 },
      },
      {
        text: 'Stay unwritten',
        tag: 'defiant',
        outcome: 'Nothing changes, which was the point, until the day it does.',
        effect: (p) => { p.setMem('esa_tso_ft_kruger', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_tso_ft_flood',
    phase: null,
    weight: 250,
    when: (G) => TSO_HOME(G) && G.flags.includes('esa_tso_flood_2000') && G.currentYear >= 2013 && G.age >= 14 && once(G, 'esa_tso_ft_flood'),
    text: 'In January 2013 the Limpopo comes up again, and Chókwè goes under again, and the helicopters are on the radio again. This time you are on the higher ground where they put the new houses after 2000, with the plot too small for a proper field. You watch the water fill the old place from a distance. The mark on the wall of the church is still there from last time, and it is higher than this one.',
    choices: null,
    effect: (p) => { p.setMem('esa_tso_ft_flood', true); p.r += 2; p.m -= 2 },
  },

  // ═══ AFAR — DJIBOUTI ═══════════════════════════════════════════════════════

  {
    id: 'esa_afar_ari',
    phase: null,
    weight: 35,
    when: (G) => AFAR_HOME(G) && (RURAL(G) || G.place?.id === 'dj_rural') && G.age >= 6 && G.age <= 13 && once(G, 'esa_afar_ari'),
    text: (G) => `Your mother takes the ari down in an hour: the mats rolled, the bent poles tied in a bundle, the whole house on the back of one camel. You walk the goats ahead toward the next well while the ground shimmers in the heat. Past the black edge of Lake Assal ${G.currentYear >= 1990 ? 'a truck grinds by loaded with salt' : 'a line of camels goes the other way loaded with bars of salt'}, bound for the highlands. By evening the ari is standing again, as if it had always been there.`,
    choices: null,
    effect: (p) => { p.setMem('esa_afar_ari', true); p.h += 2; p.m += 2; p.addFlag('esa_afar_herding') },
  },

  {
    id: 'esa_afar_1977',
    phase: null,
    weight: 300,
    when: (G) => AFAR_HOME(G) && G.currentYear >= 1977 && G.currentYear <= 1978 && G.age >= 10 && once(G, 'esa_afar_1977'),
    text: 'On the twenty-seventh of June the French flag comes down in Djibouti and the new one goes up, and the president is an Issa and the prime minister is one of yours. Your uncle says that is the arrangement: the chair and the smaller chair. Before the year ends the prime minister has resigned, saying the Afar are being pushed out of the state they were promised a share of. The men chewing khat in the afternoon talk about nothing else, very quietly.',
    context: 'Djibouti became independent on 27 June 1977 with Hassan Gouled Aptidon, an Issa Somali, as president and Ahmed Dini Ahmed, an Afar, as prime minister. Dini resigned that December, accusing the government of excluding Afars.',
    choices: null,
    effect: (p) => { p.setMem('esa_afar_1977', true); p.e += 2; p.m -= 1 },
  },

  {
    id: 'esa_afar_frud',
    phase: null,
    weight: 300,
    when: (G) => AFAR_HOME(G) && G.currentYear >= 1991 && G.currentYear <= 1994 && G.age >= 15 && G.age <= 45 && once(G, 'esa_afar_frud'),
    text: 'In November the men of the Front come down from the Mabla mountains, and within weeks they hold most of the north. The army answers with roadblocks and burned wells, and the road to Tadjourah and Obock is closed to anything but soldiers. French troops arrive and stand between the two sides, which settles nothing. A cousin comes at night to ask whether you are coming.',
    context: 'The Front for the Restoration of Unity and Democracy, formed by Afar opposition groups in August 1991, took up arms against the Issa-dominated government that November. The army retook the north from 1993; a peace accord with part of FRUD was signed in December 1994, and the rest in 2000–2001.',
    choices: [
      {
        text: 'Go with him',
        tag: 'defiant',
        outcome: 'You sleep on rock for two years. The rifle is older than you are.',
        effect: (p) => { p.setMem('esa_afar_frud', true); p.h -= 4; p.karma += 2; p.addFlag('esa_afar_frud_fighter') },
      },
      {
        text: 'Stay with the family',
        tag: 'yielding',
        outcome: 'He goes without you. At the roadblocks your name is enough to have your bag emptied onto the road.',
        effect: (p) => { p.setMem('esa_afar_frud', true); p.m -= 3; p.addFlag('esa_afar_frud_war') },
      },
    ],
    effect: null,
  },

  // ═══ TIGRE — ERITREA ═══════════════════════════════════════════════════════

  {
    id: 'esa_tig_dues',
    phase: null,
    weight: 35,
    when: (G) => TIGRE_HOME(G) && G.currentYear >= 1942 && G.currentYear <= 1950 && G.age >= 7 && G.age <= 20 && once(G, 'esa_tig_dues'),
    text: 'At every feast your family carries butter to the house of the shumagulle, and when a cow of yours calves the lord\'s people come to see it. That is what the word tigre means in their mouths: the ones who owe. This year the men sit late and talk about the British, who have said the dues are not law. Your father does not carry the butter, and waits all week for what that will cost.',
    context: 'In the Sahel and Barka, Tigre-speaking herders of the serf class owed tribute to an aristocracy, the shumagulle. Under the British Military Administration in the 1940s they refused it in large numbers, and the dues were ended by the close of the decade.',
    choices: null,
    effect: (p) => { p.setMem('esa_tig_dues', true); p.m += 3; p.e += 2 },
  },

  {
    id: 'esa_tig_elf',
    phase: null,
    weight: 35,
    when: (G) => TIGRE_HOME(G) && MALE(G) && G.currentYear >= 1965 && G.currentYear <= 1980 && G.age >= 16 && G.age <= 32 && once(G, 'esa_tig_elf'),
    text: 'The fighters come to the wells in the evening, thin men in shorts with old Italian rifles, and your mother gives them milk without being asked. They speak Tigre and Arabic and talk about a country that does not exist. One of them is from the next valley and knows your father. He says there is room.',
    choices: [
      {
        text: 'Go into the field with them',
        tag: 'defiant',
        outcome: 'The Front gives you a name to use and a rifle to share. Your mother does not say goodbye, so that it will not be one.',
        effect: (p) => { p.setMem('esa_tig_elf', true); p.h -= 3; p.karma += 3; p.addFlag('esa_tig_elf_fighter') },
      },
      {
        text: 'Stay with the herd',
        tag: 'yielding',
        outcome: 'You bring them milk when they pass, which in the army\'s eyes is the same thing.',
        effect: (p) => { p.setMem('esa_tig_elf', true); p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_tig_burning',
    phase: null,
    weight: 40,
    when: (G) => TIGRE_HOME(G) && RURAL(G) && G.currentYear >= 1967 && G.currentYear <= 1988 && G.age >= 8 && G.age <= 50 && once(G, 'esa_tig_burning'),
    text: 'The soldiers come to the village the morning after the fighters were seen at the well. They count the men, then take them to the dry riverbed, and set the huts alight one after another. By night the people who are left are walking west with what the camels can carry, toward the Sudanese border. Your grandmother will not leave the graves.',
    context: 'From 1967 Ethiopian forces answered the insurgency in the western and northern lowlands by burning villages; at Ona and Besikdira in 1970 and at She\'eb in 1988 hundreds of civilians were killed. Hundreds of thousands of lowlanders fled to camps around Kassala.',
    choices: [
      {
        text: 'Cross into Sudan with the others',
        tag: null,
        outcome: 'The camp near Kassala is rows of straw and tarpaulin. Years later it is a room in Khartoum, and still the camp.',
        effect: (p) => { p.setMem('esa_tig_burning', true); p.m -= 6; p.h -= 3; p.addFlag('esa_tig_sudan_camp'); p.emigrateTo('Sudan', { placeId: 'sd_khartoum', residency: 'refugee_status', tier: 'informal' }) },
      },
      {
        text: 'Stay by the graves with her',
        tag: null,
        outcome: 'You rebuild one hut from what did not burn. The soldiers come back twice more that year.',
        effect: (p) => { p.setMem('esa_tig_burning', true); p.m -= 6; p.r += 3 },
      },
    ],
    effect: null,
  },

  // ═══ BANDA — CENTRAL AFRICAN REPUBLIC ══════════════════════════════════════

  {
    id: 'esa_ban_horns',
    phase: null,
    weight: 35,
    when: (G) => BANDA_HOME(G) && RURAL(G) && G.age >= 8 && G.age <= 14 && once(G, 'esa_ban_horns'),
    text: 'When the boys come out of the forest after the ganza, the horn players line up at the edge of the village, each holding one horn carved from a root or a tusk. Each horn has one note. Alone it is a man blowing into a stick; together, each one coming in at its exact place, it is a tune that rises and falls like water over stones. Your uncle plays the fourth horn and has played it for thirty years.',
    choices: null,
    effect: (p) => { p.setMem('esa_ban_horns', true); p.m += 4 },
  },

  {
    id: 'esa_ban_1979',
    phase: null,
    weight: 300,
    when: (G) => BANDA_HOME(G) && BANGUI(G) && G.currentYear === 1979 && G.age >= 9 && G.age <= 19 && once(G, 'esa_ban_1979'),
    text: 'The Emperor has decreed that every pupil will wear the uniform, and the uniform is sold at a shop owned by his family, at a price your father cannot pay. In January the students of the lycées walk out and stones hit the Emperor\'s car. In April the soldiers go through the quarters of Bangui at night and take children away to Ngaragba. Your mother keeps you inside for a week and talks to no one.',
    context: 'In January 1979 schoolchildren in Bangui protested a decree requiring costly uniforms made by a firm linked to Emperor Bokassa. In April around a hundred children were killed at Ngaragba prison; an African judicial commission found Bokassa had taken part. French troops removed him that September.',
    choices: [
      {
        text: 'Go out to the march',
        tag: 'defiant',
        outcome: 'You run when the shooting starts and do not stop until the river. You never say which friends you ran past.',
        effect: (p) => { p.setMem('esa_ban_1979', true); p.h -= 3; p.m -= 5; p.karma += 3; p.addFlag('esa_ban_uniform_1979') },
      },
      {
        text: 'Stay home as your mother says',
        tag: 'yielding',
        outcome: 'A boy from your class does not come back to school. His desk stays empty until the end of the year.',
        effect: (p) => { p.setMem('esa_ban_1979', true); p.m -= 4; p.addFlag('esa_ban_uniform_1979') },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_ban_2013',
    phase: null,
    weight: 300,
    when: (G) => BANDA_HOME(G) && G.currentYear >= 2013 && G.currentYear <= 2014 && G.age >= 8 && once(G, 'esa_ban_2013'),
    text: (G) => BANGUI(G)
      ? 'In March the Séléka come down the road from the north in pickups, and Bangui is theirs by evening. On the fifth of December the anti-balaka come in from the other side of the city, and after that there is no street that belongs to anyone. At the airport, under the wings of the parked planes and along the runway fence, a hundred thousand people are sleeping on the ground. Your neighbour is going there tonight.'
      : 'In Bambari the river is a border now: one side for the men with the pickups, the other for the men with the charms and machetes. Your family is Banda and so is half the town, and that decides nothing about which side of the river you sleep on. The market has closed. Your neighbour is walking to the priests\' compound tonight, with a mattress on her head.',
    choices: [
      {
        text: 'Go with her',
        tag: null,
        outcome: 'You sleep on cardboard among ten thousand strangers, and it is safer than your own bed.',
        effect: (p) => { p.setMem('esa_ban_2013', true); p.h -= 4; p.m -= 6; p.addFlag('esa_ban_mpoko') },
      },
      {
        text: 'Stay in the house',
        tag: null,
        outcome: 'You brace the door with the table and keep the radio low. Some nights there are footsteps and then there are not.',
        effect: (p) => { p.setMem('esa_ban_2013', true); p.m -= 7; p.r += 2; p.addFlag('esa_ban_2013') },
      },
    ],
    effect: null,
  },

  // ═══ AMBUNDU — ANGOLA ══════════════════════════════════════════════════════

  {
    id: 'esa_amb_cassanje',
    phase: null,
    weight: 300,
    when: (G) => AMB_HOME(G) && RURAL(G) && G.currentYear === 1961 && G.age >= 6 && G.age <= 45 && once(G, 'esa_amb_cassanje'),
    text: 'The company decides how much cotton each family must grow and what it will pay, and the price has not been enough to eat on for years. In January the villages of the Baixa refuse: the seed is burned, the company\'s men are chased off, and people sing that the Portuguese are finished. In February the planes come low over the valley. Afterwards there are villages on the road to Malanje with nobody in them.',
    context: 'In January 1961 cotton growers in the Baixa de Cassanje, in the Mbundu heartland of Malanje, rose against the forced-cultivation regime of the Cotonang company. The Portuguese air force bombed the area in February; estimates of the dead run from hundreds into the thousands.',
    choices: null,
    effect: (p) => { p.setMem('esa_amb_cassanje', true); p.m -= 7; p.h -= 3; p.addFlag('esa_amb_cassanje_1961') },
  },

  {
    id: 'esa_amb_kimbundu',
    phase: null,
    weight: 30,
    when: (G) => AMB_HOME(G) && LUANDA(G) && G.age >= 6 && G.age <= 11 && G.currentYear >= 1945 && G.currentYear <= 2000 && once(G, 'esa_amb_kimbundu'),
    text: (G) => `Your grandmother speaks Kimbundu, and your parents answer her in Kimbundu and each other in Portuguese. At school ${G.currentYear < 1961 ? 'the teacher says a child who means to be assimilado must forget the language of the musseque' : 'Kimbundu is not a subject, and nobody says why'}. The songs on the radio from Sambizanga are half one and half the other, and those are the songs everyone knows. You understand every word your grandmother says and reply to her in Portuguese.`,
    choices: null,
    effect: (p) => { p.setMem('esa_amb_kimbundu', true); p.e += 2; p.r += 1 },
  },

  {
    id: 'esa_amb_27maio',
    phase: null,
    weight: 300,
    when: (G) => AMB_HOME(G) && G.currentYear === 1977 && G.age >= 15 && G.age <= 45 && once(G, 'esa_amb_27maio'),
    text: 'Early on the twenty-seventh of May the radio station is taken by men who shout Nito\'s name, and for a few hours Sambizanga believes something has changed. By afternoon the Cubans have retaken the station and the radio is the government again. In the weeks after, people are called to meetings and do not come back from them. A list is said to exist, and nobody knows who is on it.',
    context: 'On 27 May 1977 supporters of Nito Alves, popular in the Luanda musseques and the MPLA\'s own base, attempted a rising against Agostinho Neto. It was put down within the day with Cuban help, and the purge that followed killed thousands over two years.',
    choices: [
      {
        text: 'Keep your head down and your mouth shut',
        tag: 'yielding',
        outcome: 'You learn which words not to use and which friends not to be seen with, and you learn it fast.',
        effect: (p) => { p.setMem('esa_amb_27maio', true); p.m -= 5; p.r += 3; p.addFlag('esa_amb_27maio') },
      },
      {
        text: 'Go and ask after your cousin',
        tag: 'defiant',
        outcome: 'At the office they write your name down instead of his. Nothing comes of it, except that you know it is written.',
        effect: (p) => { p.setMem('esa_amb_27maio', true); p.m -= 6; p.karma += 3; p.addFlag('esa_amb_27maio') },
      },
    ],
    effect: null,
  },

  // ═══ TSONGA — MOZAMBIQUE ═══════════════════════════════════════════════════

  {
    id: 'esa_tso_mines',
    phase: null,
    weight: 35,
    when: (G) => TSO_HOME(G) && MALE(G) && RURAL(G) && G.currentYear >= 1945 && G.currentYear <= 1995 && G.age >= 18 && G.age <= 28 && once(G, 'esa_tso_mines'),
    text: (G) => `At the recruiting office at Ressano Garcia they look in your mouth, weigh you and X-ray your chest, and a clerk writes your name in a book with a number beside it. Every man in the district who has ever had a good roof went this way, to the gold mines of the Rand for ${G.currentYear < 1977 ? 'Wenela' : 'TEBA'}. Half the pay is held back until you come home. Lobolo for the girl you want is more cattle than your father has.`,
    context: 'For most of the twentieth century men from southern Mozambique worked contracts on the South African gold mines through the Witwatersrand Native Labour Association, known as Wenela, and after 1977 its successor TEBA. Part of each wage was deferred and paid out at home, and a returned miner, a magaíça, was a man of standing.',
    choices: [
      {
        text: 'Sign the contract',
        tag: null,
        outcome: 'You go down in the cage at dawn with men from six countries, and learn Fanakalo before you learn the shafts.',
        effect: (p) => { p.setMem('esa_tso_mines', true); p.mo += 1500; p.h -= 3; p.addFlag('esa_tso_miner') },
      },
      {
        text: 'Stay with the fields',
        tag: null,
        outcome: 'Your roof stays grass. Your mother says that is not the worst thing a roof can be.',
        effect: (p) => { p.setMem('esa_tso_mines', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_tso_kruger',
    phase: null,
    weight: 40,
    when: (G) => TSO_HOME(G) && RURAL(G) && G.currentYear >= 1984 && G.currentYear <= 1992 && G.age >= 12 && G.age <= 45 && once(G, 'esa_tso_kruger'),
    text: 'Renamo comes at night and takes whatever can be carried, and the ones who can carry it. After the third time the families near the border begin to walk west in small groups, through the game reserve on the far side, where there are lions and no roads and South African patrols. They walk in the dark and sleep in the trees by day. A man from the next village knows the way and asks for what you have.',
    context: 'During Mozambique\'s civil war, Renamo attacks in Gaza drove several hundred thousand people into South Africa. Many crossed on foot through the Kruger National Park at night; an unknown number were killed by animals, or electrocuted on the border fence.',
    choices: [
      {
        text: 'Pay him and go',
        tag: null,
        outcome: 'Four nights. On the fifth morning a Shangaan woman on the other side gives you water in your own language.',
        effect: (p) => { p.setMem('esa_tso_kruger', true); p.mo -= 100; p.h -= 4; p.m -= 3; p.addFlag('esa_tso_kruger'); p.emigrateTo('South Africa', { placeId: 'za_johannesburg', residency: 'undocumented', tier: 'informal' }) },
      },
      {
        text: 'Stay and sleep in the bush near the fields',
        tag: null,
        outcome: 'You stop sleeping in the house. The machamba is still yours, in daylight.',
        effect: (p) => { p.setMem('esa_tso_kruger', true); p.m -= 6; p.h -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'esa_tso_flood_2000',
    phase: null,
    weight: 300,
    when: (G) => TSO_HOME(G) && G.currentYear === 2000 && G.age >= 5 && once(G, 'esa_tso_flood_2000'),
    text: 'The rain in February is only the beginning; the water comes from upriver, from rain that fell in other countries. The Limpopo spreads until Chókwè is a lake with roofs in it and people on the roofs. On the radio they say a woman gave birth in a tree and the helicopter took her and the baby out together. Your family spends three days on a roof counting who is on the others.',
    context: 'In February and March 2000 the Limpopo and other rivers flooded southern Mozambique, killing around 800 and displacing hundreds of thousands, most in Gaza. Rosita Pedro was born in a tree near Chókwè on 1 March.',
    choices: null,
    effect: (p) => { p.setMem('esa_tso_flood_2000', true); p.h -= 3; p.m -= 6; p.addFlag('esa_tso_flood_2000') },
  },
]
