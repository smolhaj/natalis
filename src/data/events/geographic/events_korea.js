// events_korea.js — South Korea arc events
//
// Complements existing world events (korean_war, conscription_south_korea,
// south_korea_miracle, korean_war_aftermath, south_korea_park_era) and
// events_country_arcs.js (Korean War, suneung references).
//
// Adds the personal-level texture missing from those:
//   Education pressure: hagwon childhood, suneung year, the result, night study
//   Military service: the texture of conscription, return to civilian life
//   Political: Gwangju 1980 as lived event
//   Economy: chaebol entry, work culture
//   Identity: Hallyu pride, marriage pressure, the compressed generation

const isSouthKorea = (G) => G.currentCountry?.name === 'South Korea'

export const KOREA_EVENTS = [

  {
    id: 'kr_hagwon_childhood',
    phase: 'childhood',
    weight: 9,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1975 &&
      G.age >= 8 && G.age <= 13 &&
      !G.mem?.krHagwonFired,
    text: 'School ends at three. Then the English hagwon. Then the math hagwon. Then the private tutor on Wednesday evenings. You are ten years old. This is normal — your entire class has the same schedule. The definition of a good parent in this country is a parent who is doing exactly this. Your mother packs the lunch boxes before you wake, tracks the schedule across her phone, drives you between sessions, and you eat in the car. The years of your childhood are years of preparation for something that is still ahead of you.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 5; p.addFlag('hagwon_childhood'); p.setMem('krHagwonFired', true) },
  },

  {
    id: 'kr_night_study',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1975 &&
      G.age >= 14 && G.age <= 18 &&
      !G.mem?.krNightStudyFired,
    text: 'The school library stays open until eleven. Most of your class is here. The pressure at eleven pm is different from the pressure at eight am — it is quieter and more specific. You have been studying for seven hours. You have three more hours before the last bus. You will get up at five-thirty and do it again. The competition is everyone around you. It is also not really the people around you — it is the fixed number of seats at good universities. The seats do not expand. The number of you competing does.',
    choices: null,
    effect: (p) => { p.e += 5; p.h -= 3; p.m -= 5; p.addFlag('night_study_generation'); p.setMem('krNightStudyFired', true) },
  },

  {
    id: 'kr_suneung_year',
    phase: null,
    weight: 9,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1981 &&
      G.age >= 17 && G.age <= 19 &&
      !G.mem?.krSuneungYearFired,
    text: 'In the year you sit the suneung the country organises itself around the exam. On exam day the planes are grounded during the listening component. Police escort taxis carrying students who are running late. Your mother has been waking at four in the morning to pray for months. The exam is nine hours across two days. Your life at seventeen divides cleanly into before and after.',
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 8; p.h -= 3; p.addFlag('suneung_year'); p.setMem('krSuneungYearFired', true) },
  },

  {
    id: 'kr_suneung_result',
    phase: 'adolescence',
    weight: 9,
    when: (G) =>
      isSouthKorea(G) &&
      G.flags.has('suneung_year') &&
      !G.mem?.krSuneungResultFired,
    text: 'The scores arrive in the morning. The household has been awake for hours. One number, and the number determines — with a precision that this country has decided is appropriate — the university, and therefore the job tier, and therefore significant portions of the social life, and therefore, arguably, the partner, and therefore, arguably, the life.',
    choices: [
      {
        text: 'SKY university — the score qualifies you',
        tag: null,
        outcome: 'Seoul National, Korea, or Yonsei. The number your family has been saying at every dinner table. The relief in the house is not celebration. It is something more fundamental — three years of collective weight, lifted.',
        effect: (p) => { p.e += 10; p.m += 8; p.addFlag('sky_university'); p.addFlag('suneung_succeeded'); p.setMem('krSuneungResultFired', true) },
      },
      {
        text: 'A good university — not SKY, but a path',
        tag: null,
        outcome: 'Not the name on the door your family said every dinner. A real university, a real future. The weight of the difference is specific and will carry further than you expect.',
        effect: (p) => { p.e += 4; p.m -= 8; p.r += 5; p.addFlag('suneung_survived'); p.setMem('krSuneungResultFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_gwangju_1980',
    phase: null,
    weight: 9,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear === 1980 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.krGwangjuFired,
    text: 'In Gwangju the paratroopers have been deployed against civilians. The news coming out is confused and then consistent. Citizens have taken up arms to defend the city hall. This lasts ten days. The military crushes it. The death toll is contested for decades and will not be officially acknowledged for years. In Seoul and the rest of the country you are watching this happen and understanding, with absolute clarity, what kind of government you live under. Chun Doo-hwan has been in power for seven months.',
    choices: [
      {
        text: 'The anger becomes political — this country is capable of better',
        tag: null,
        outcome: 'The Gwangju uprising becomes the foundation of a politics. You carry May 18th. What you do with it is still being decided.',
        effect: (p) => { p.m -= 10; p.addFlag('gwangju_witness'); p.addFlag('political_active'); p.setMem('krGwangjuFired', true); p.setMem('koreaGwangju', true) },
      },
      {
        text: 'You witness it — the fear is now specific',
        tag: null,
        outcome: 'The fear is concrete after Gwangju. What the state is capable of is no longer abstract. The calculus of what to say around certain people has been permanently recalibrated.',
        effect: (p) => { p.m -= 12; p.addFlag('gwangju_witness'); p.setMem('krGwangjuFired', true); p.setMem('koreaGwangju', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_military_service_texture',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isSouthKorea(G) &&
      G.character?.gender === 'male' &&
      G.currentYear >= 1953 &&
      G.age >= 18 && G.age <= 22 &&
      !G.mem?.krMilitaryFired,
    text: 'Twenty-one months. The service is structured by a hierarchy that is absolute and that you will never fully explain to someone who wasn\'t inside it. The seniors have one set of rules; the juniors have another set. The work is administrative, guard duty, physical training, and a specific quality of institutional boredom. The benefit: when it\'s done, it\'s done. Every Korean man of your generation will have this in common. It is one of the few things you will have completely in common.',
    choices: null,
    effect: (p) => { p.h += 5; p.m -= 8; p.s += 3; p.addFlag('korea_military_served'); p.setMem('krMilitaryFired', true) },
  },

  {
    id: 'kr_military_return',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isSouthKorea(G) &&
      G.character?.gender === 'male' &&
      G.flags.has('korea_military_served') &&
      G.age >= 20 && G.age <= 26 &&
      !G.mem?.krMilitaryReturnFired,
    text: 'Twenty-one months. Out. The civilian world has been moving. Your university friends are a semester ahead of where you would have been. The job market has been receiving other applications while you were on a base. None of this is surprising — every man in the country goes through this same transition. The system has accounted for the disruption. The disruption is still real.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('korea_military_returned'); p.setMem('krMilitaryReturnFired', true) },
  },

  {
    id: 'kr_chaebol_entry',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.stats.smarts >= 55 &&
      G.age >= 22 && G.age <= 30 &&
      !G.career &&
      !G.mem?.krChaeholFired,
    text: 'The Samsung or Hyundai or LG recruitment process is the gate into a particular Korean life — the company housing, the health insurance, the hierarchy that the company considers structurally identical to a family. You pass the aptitude tests. The orientation week begins with a company song. You will be expected to stay late. You will be expected to socialise with the team. The company and your working life are not, in this system, fully separate things.',
    choices: [
      {
        text: 'Commit fully — the security and scale are what you came for',
        tag: null,
        outcome: 'The promotion track is real and the loyalty required to be on it is also real. You give both.',
        effect: (p) => { p.mo += 2000; p.m -= 5; p.h -= 5; p.addFlag('chaebol_worker'); p.setMem('krChaeholFired', true) },
      },
      {
        text: 'Work, but hold something back — the company is not the whole life',
        tag: null,
        outcome: 'The work is professional and contained. The company eventually registers the difference. You receive the salary without the full trajectory.',
        effect: (p) => { p.mo += 1000; p.m += 3; p.addFlag('chaebol_worker'); p.setMem('krChaeholFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_marriage_pressure',
    phase: null,
    weight: 7,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1965 &&
      !G.partner &&
      G.age >= 27 && G.age <= 38 &&
      !G.mem?.krMarriageFired,
    text: (G) => {
      const isFemale = G.character?.gender === 'female'
      if (isFemale) return 'At thirty the pressure has been consistent for two years. The matchmaking app, the blind dates your aunt arranges, the conversations at Chuseok that circle the subject and land on it directly. You are an adult woman who is not married, which in this social environment requires explanation. The explanation you would give is not the explanation they are looking for.'
      return 'The pressure is gentler for men but present. Thirty-three and unmarried is a sentence with a question mark at every family gathering. The government has opinions about the birth rate. Your grandmother has opinions about the birth rate. These opinions arrive regularly and from different directions.'
    },
    choices: [
      {
        text: 'Let the family arrange introductions — sogaeting',
        tag: null,
        outcome: 'The arranged meetings are awkward and occasionally interesting. The process is one of them.',
        effect: (p) => { p.m -= 3; p.addFlag('korea_marriage_pressure'); p.setMem('krMarriageFired', true) },
      },
      {
        text: 'The life you have is complete as it is',
        tag: null,
        outcome: 'You hold the line. The pressure continues. You continue. It costs something ongoing and you pay it.',
        effect: (p) => { p.m -= 6; p.s -= 3; p.addFlag('korea_marriage_pressure'); p.addFlag('solo_life_chosen'); p.setMem('krMarriageFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_hallyu_pride',
    phase: null,
    weight: 6,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2010 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.krHallyuFired,
    text: (G) => {
      const yr = G.currentYear ?? 2015
      const ref = yr < 2013 ? 'Gangnam Style reached a billion views' : yr < 2020 ? 'BTS addressed the UN General Assembly' : 'Parasite won Best Picture at the Oscars'
      return `${ref}. You grew up in a country that exported semiconductors and container ships. You did not grow up expecting to watch the world memorise the choreography of a Korean pop group or see a Korean film take the Palme d\'Or. The cultural exports carry a pride that is different from economic achievement — it is recognition of a different order. You feel it in a way that is embarrassing to describe and nonetheless real.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('hallyu_generation'); p.setMem('krHallyuFired', true); p.setMem('koreaHallyu', true) },
  },

  {
    id: 'kr_compressed_generation',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1980 && G.currentYear <= 2005 &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.krCompressedFired,
    text: 'Your parents were farmers or factory workers. You went to university. Your children will perhaps go abroad. Three generations of compressed mobility — the speed of the transformation is the defining fact about your country and you are somewhere in the middle of it. This produces a specific kind of person: proud, exhausted, oriented toward the future at the cost of the present, uncertain what the present actually is.',
    choices: null,
    effect: (p) => { p.m -= 3; p.addFlag('compressed_generation_korea'); p.setMem('krCompressedFired', true) },
  },

  {
    id: 'kr_postwar_poverty_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.krPostwarPoverty,
    text: 'In 1953 South Korea\'s GDP per capita was lower than Sudan\'s. The war ended with an armistice, not a peace treaty, and left behind rubble and three million dead. American aid keeps the country from collapsing outright. Your family eats what is available. The concept of what will be available in the future has not yet stabilised. You have grown up knowing scarcity not as an abstract condition but as the specific weight of the bowl at breakfast. The miracle — the thing people will later call the Miracle on the Han River — is not visible from here. You are living inside the before.',
    choices: null,
    effect: (p) => {
      p.m -= 5; p.h -= 3; p.e += 3;
      p.addFlag('korean_war_generation');
      p.setMem('krPostwarPoverty', true);
    },
  },

  {
    id: 'kr_park_development_bargain',
    phase: null,
    weight: 5,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 1963 && G.currentYear <= 1979 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.krParkBargain,
    text: 'Park Chung-hee\'s government does not ask for your political approval. It asks for your labour. The Saemaul Undong campaign rebuilds rural villages: cement, tile roofs, community roads, a sense of directed national purpose. The Han River bridge is built. The steel mill at Pohang is built. POSCO in 1968 is the largest single investment project in Korean history. The economy is growing at 9 percent a year. The price is: no independent unions, no free press, the KCIA in the buildings, the emergency decrees. The bargain is implicit and it is being honoured, at cost, by everyone around you.',
    choices: [
      {
        text: 'You take the bargain. The growth is real.',
        tag: 'accepted',
        outcome: 'The factory work or the government job or the export-sector job is real and the wages are rising. You separate the politics from the work. Millions do the same.',
        effect: (p) => { p.m += 4; p.mo += 600; p.addFlag('park_era_generation'); p.setMem('krParkBargain', true); },
      },
      {
        text: 'You are not at peace with the bargain.',
        tag: 'resisted',
        outcome: 'The campus movement, the labour movement, the minjung — the people. The opposition is real and the government\'s response to it is also real. You understand what the growth costs because you are inside the cost.',
        effect: (p) => { p.m -= 8; p.e += 6; p.s += 4; p.addFlag('park_era_generation'); p.addFlag('political_active'); p.setPolitical('left'); p.setMem('krParkBargain', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'kr_dmz_family_separated',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.character.birthYear <= 1955 &&
      G.age >= 35 &&
      !G.mem?.krDMZFamily,
    text: 'You have relatives in the North. This is not unusual — the armistice drew the line through families. A grandparent, an uncle, cousins you have never met. The Red Cross family tracing programme began in 1985; the first reunion meetings in 2000 were held in a hotel in Mount Geumgang, two hours allocated per family, orchestrated by cameras and officials. Some families got one meeting. Some got none. The DMZ is ninety kilometres from Seoul and has been there your entire life. The people on the other side of it are there too, and the distance between ninety kilometres and unreachable is the specific geography of this country.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 10; p.e += 4;
      p.addFlag('dmz_separated_family');
      p.setMem('krDMZFamily', true);
    },
  },

  {
    id: 'kr_sampo_generation',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2010 &&
      G.age >= 22 && G.age <= 35 &&
      !G.partner &&
      !G.mem?.krSampo,
    text: 'The word is sampo — giving up three things: romance, marriage, and children. It began as a demographic description. It became, by the time you are twenty-eight, a word people use about themselves. The apartment costs twelve years of a starting salary. The hiring freeze at the chaebol that your father\'s generation walked into at graduation now has a 3% acceptance rate. The suneung you sat and the degree you got have produced a position in a precariat you were not told was where you were headed. The government\'s solution is tax incentives for marriage. You are not sure the government has correctly identified the problem.',
    choices: [
      {
        text: 'The sampo framing resonates — you are making these calculations too.',
        tag: null,
        outcome: 'The calculations are practical and they add up consistently: there is no configuration of current wages and current housing costs that produces what the previous generation produced. The grief in the mathematics is real.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('sampo_generation'); p.setMem('krSampo', true) },
      },
      {
        text: 'You are making a different calculation — finding the path through.',
        tag: null,
        outcome: 'The path is narrower and more specific than the one the previous generation walked. You are walking it. The extra precision required is itself a form of labour that is not on the CV.',
        effect: (p) => { p.m -= 4; p.addFlag('sampo_generation'); p.setMem('krSampo', true) },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // THE THINNING — SOUTH KOREA 2030s–2060s
  // The lowest fertility rate ever recorded in a peacetime state arrives as
  // ordinary furniture: a closed school, an empty county, a machine that asks
  // how you slept.
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'kr_school_closes_thinning',
    phase: null,
    weight: 5,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2030 && G.currentYear <= 2065 &&
      G.age >= 25 &&
      !G.mem?.krSchoolCloses,
    text: 'The elementary school you went to closes in February with eleven children in its final intake. They hold a ceremony in the yard and the principal reads the names of every graduating year back to 1961. The building is to become a care facility, which the district calls repurposing. You stand at the fence where the shoe lockers used to be visible through the window and you can see them still.',
    context: 'South Korea’s total fertility rate fell to 0.72 in 2023, the lowest ever recorded for a country not at war. Over 3,800 schools closed between 1982 and 2023, most of them rural; from the 2030s the closures move into provincial cities and the outer districts of Seoul.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.setMem('krSchoolCloses', true) },
  },

  {
    id: 'kr_county_disappearing',
    phase: null,
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2032 && G.currentYear <= 2070 &&
      G.age >= 30 &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.krCountyGone,
    text: 'The county is on the list the ministry publishes each year — the places calculated to be at risk of vanishing. The bus that came four times a day comes twice. The pharmacy keeps two afternoons a week and the pharmacist drives in from the city for them. At the market the same six women set out the same trays and the youngest of them is sixty-one.',
    context: 'South Korea’s Ministry of the Interior began publishing an annual list of 지방소멸 위험 지역 — regions at risk of local extinction — in 2016. By the mid-2020s roughly half of all local governments were on it, defined by the ratio of women aged 20–39 to residents over 65.',
    choices: [
      {
        text: 'Stay. Somebody has to be the last one who knows the road names.',
        tag: null,
        outcome: 'You stay. The winters get quieter and the summers stay the same. You become, without applying for it, the person people telephone when they need to know what used to be where.',
        effect: (p) => { p.m += 3; p.r += 5; p.karma += 3; p.setMem('krCountyGone', true) },
      },
      {
        text: 'Go to the city while there is still something to sell.',
        tag: null,
        outcome: 'The house sells for less than the deposit on the flat you move into. You visit twice a year and then once and then at holidays only.',
        effect: (p) => { p.mo += 9000; p.m -= 5; p.r += 6; p.setMem('krCountyGone', true) },
      },
    ],
  },

  {
    id: 'kr_thin_conscription',
    phase: null,
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2035 && G.currentYear <= 2060 &&
      G.character.gender === 'male' &&
      G.age >= 18 && G.age <= 26 &&
      !G.mem?.krThinConscription,
    text: 'The physical standards have been revised again and the grade that would have exempted your father passes you without discussion. There are not enough of you. The barracks holds a company in a building built for a battalion and the corridors carry sound the way an empty school does. The sergeant is forty-four and stays on because the army has stopped being able to replace him.',
    context: 'South Korea’s annual cohort of conscription-age men falls from about 330,000 in the mid-2020s to under 200,000 by the 2040s. The military has repeatedly loosened physical grading criteria and extended non-commissioned officer careers to hold troop numbers near the 500,000 floor set by defence planning.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 3; p.addFlag('korea_military_served'); p.setMem('krThinConscription', true) },
  },

  {
    id: 'kr_care_machine',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2035 &&
      G.age >= 70 &&
      !G.mem?.krCareMachine,
    text: 'The district provides the unit free to households over seventy living alone. It reminds you about the blue tablet at eight and the white one at two, and every morning it asks whether you slept well. You have started answering it out loud. Once, in November, you told it something you have not told your daughter, and it said that it was glad you were feeling better.',
    choices: [
      {
        text: 'Answer it every day. It is a voice in the room.',
        tag: null,
        outcome: 'You keep answering. It is not company and it is what is in the room, and you have arrived at an age where the difference is smaller than you once believed.',
        effect: (p) => { p.m += 2; p.h += 2; p.r += 4; p.setMem('krCareMachine', true) },
      },
      {
        text: 'Unplug it and go down to the community hall instead.',
        tag: null,
        outcome: 'There are nine of you at the hall and the youngest is sixty-eight. It is three afternoons a week and it is other people, and you sleep better on the days you go.',
        effect: (p) => { p.m += 6; p.s += 3; p.setMem('krCareMachine', true) },
      },
    ],
  },

  {
    id: 'kr_elderly_work_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2030 &&
      G.age >= 66 &&
      G.money < 60000 &&
      !G.mem?.krElderlyWork,
    text: 'You are sixty-eight and you work. The security shift at the building runs twelve hours and the pension covers the management fee and the utilities and not the rest of it. On the stairwell landing you fold the flattened boxes the way the woman on the fourth floor taught you, and she is seventy-three. Your son sends money and you have told him twice that you do not need it.',
    context: 'South Korea has the highest elderly poverty rate in the OECD, around 40 percent of over-65s. The national pension scheme began only in 1988, so the cohorts who built the country’s industrial economy retired with partial or no contribution histories.',
    choices: null,
    effect: (p) => { p.h -= 5; p.mo += 7000; p.r += 5; p.setMem('krElderlyWork', true) },
  },

  {
    id: 'kr_unification_word_fades',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      isSouthKorea(G) &&
      G.currentYear >= 2040 &&
      G.age >= 55 &&
      !G.mem?.krUnificationFades,
    text: 'The ministry still exists and the word has stopped appearing. In your school year there was a poster in the corridor with two hands and a peninsula; your grandchild has never been given the drawing exercise. On the news the north is covered the way a neighbouring country is covered. You notice that you no longer say the word either, and you cannot place the year you stopped.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('korean_division_generation'); p.setMem('krUnificationFades', true) },
  },

]
