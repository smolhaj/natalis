// events_south_africa_depth.js
// South Africa depth arc: Sharpeville 1960, passbook system, Steve Biko 1977,
// ANC exile, forced removals, Mbeki AIDS denialism, born-free generation,
// service delivery, land question, Afrikaner transformation.
// Complements events_south_africa.js and events_country_arcs_3.js.

export const SOUTH_AFRICA_DEPTH_EVENTS = [

  {
    id: 'sa_sharpeville_1960',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1960 && G.currentYear <= 1962 &&
      G.age >= 15 &&
      !G.mem?.saSharpeville,
    text: 'The plan is that everybody leaves the dompas at home and presents themselves at the police station to be arrested, because there are not enough cells in the country for all of them. There are five thousand people outside the station at Sharpeville and nobody is armed. Then the firing starts and lasts about forty seconds. Sixty-nine people die and most of them are shot in the back. The following week both organisations are banned, and the argument about whether to stay non-violent is settled by other people, elsewhere.',
    context: 'The Pan Africanist Congress called an anti-pass campaign for 21 March 1960 in which participants would present themselves for arrest without their reference books. Police at Sharpeville fired on an unarmed crowd, killing 69 and wounding about 180, most shot from behind. The ANC and PAC were banned on 8 April, a state of emergency was declared, and both organisations turned to armed struggle within eighteen months.',
    choices: [
      {
        text: 'The non-violent path is over. You understand this now.',
        tag: 'sa_sharpeville_generation',
        outcome: 'The understanding settles into you slowly, over weeks. The question is not whether to resist but how. The government has answered the non-violent question.',
        effect: (p) => { p.m -= 12; p.karma += 8; p.r += 7; p.addFlag('sa_sharpeville_generation'); p.addFlag('political_active'); p.setPolitical('left'); p.setMem('saSharpeville', true); },
      },
      {
        text: 'Your family says to keep your head down. The government is everything.',
        tag: null,
        outcome: 'You keep your head down. Sixty-nine people were shot in the back and you keep your head down. This knowledge of yourself accompanies you.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('sa_sharpeville_generation'); p.setMem('saSharpeville', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_pass_book_daily',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1952 && G.currentYear <= 1985 &&
      G.age >= 16 &&
      !G.mem?.saPassBook,
    text: 'The book is a hundred pages and it lives against your chest, in the inside pocket, because a hip pocket can be picked. On Monday the queue at the pass office starts forming at four in the morning and you are in it before the sun. The clerk does not look up while he speaks to you, and the stamp he brings down decides whether Johannesburg is a place you live in or a place you have been found in. Every three months you lose a day of factory wages to this. You have never mentioned it to your supervisor because there is nothing about it to say.',
    context: 'The Natives (Abolition of Passes and Co-ordination of Documents) Act of 1952 required every Black South African over sixteen to carry a reference book recording employment, tax, and permission to be in an urban area. Being found without it was an arrestable offence; roughly 250,000 people a year were prosecuted under the pass laws at their peak. The books were abolished in 1986.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.karma += 5
      p.addFlag('sa_pass_humiliation')
      p.setMem('saPassBook', true)
    },
  },

  {
    id: 'sa_biko_death_1977',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1977 && G.currentYear <= 1979 &&
      G.age >= 14 &&
      !G.mem?.saBiko,
    text: 'September 12, 1977. Steve Biko dies in police detention in Pretoria. He is thirty years old. He has been in detention since August 18 — held at Port Elizabeth Security Police headquarters, interrogated, beaten, kept naked in a cell for nineteen days. He is transported 1,100 kilometres to Pretoria in the back of a Land Rover, naked, in chains, brain-damaged, and dies on arrival. The Minister of Justice, Jimmy Kruger, tells a National Party congress that Biko\'s death "leaves me cold." He gets a standing ovation. Biko had said: "The most potent weapon in the hands of the oppressor is the mind of the oppressed." He had been working on developing that idea in practice.',
    choices: [
      {
        text: 'Black Consciousness was already in you. Now it has a martyr.',
        tag: 'sa_biko_generation',
        outcome: 'The ideas survive the person. They reach you in fragments — in pamphlets, in the way certain teachers spoke, in what your peers said when the adults were not listening.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 5; p.addFlag('sa_biko_generation'); p.addFlag('political_active'); p.setPolitical('left'); p.setMem('saBiko', true); },
      },
      {
        text: 'You hear about it through rumour, not news. The news says he died of a hunger strike.',
        tag: null,
        outcome: 'The government version and the real version circulate differently. You already know how to sort them.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('sa_biko_generation'); p.setMem('saBiko', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_anc_exile',
    phase: null,
    weight: 2,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1961 && G.currentYear <= 1988 &&
      G.age >= 18 &&
      G.flags.has('political_active') &&
      !G.mem?.saExile,
    text: 'Lusaka. The Tanzanian border. The route through Botswana, then north. People who are in the ANC underground go this way — some to Lusaka for ANC headquarters, some to Angola for MK training camps. The ANC in exile is the alternative government, the parallel structure, the place where South African politics continues outside South Africa. You know people who took this route. The question is whether you are going to.',
    choices: [
      {
        text: 'You go. You cross the border and don\'t look back.',
        tag: 'sa_anc_exile',
        outcome: 'Lusaka. The ANC office on Cairo Road. The community of exiles — people from your township who you thought you would never see again. The years abroad become their own kind of life.',
        effect: (p) => { p.m -= 5; p.karma += 10; p.e += 5; p.r += 8; p.addFlag('sa_anc_exile'); p.setMem('saExile', true); },
      },
      {
        text: 'You stay. Your family is here. The movement needs people inside too.',
        tag: null,
        outcome: 'You stay. The people who go know you stayed. The people who stayed know you stayed. What that means depends on what happens next.',
        effect: (p) => { p.r += 5; p.setMem('saExile', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_forced_removal',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1950 && G.currentYear <= 1980 &&
      G.age >= 5 &&
      !G.mem?.saForcedRemoval,
    text: 'The notice goes up on the wall of the shop and then a man comes and paints a number on the door. On the morning the trucks arrive most people do not resist, and the ones who do are put in a van first. Your grandmother was born in this house and she carries out the cooking pots herself so that nobody else will handle them. The new place has a name and a number and a standpipe at the end of the row, and the bus to work takes ninety minutes each way.',
    context: 'The Group Areas Act of 1950 assigned urban land by race and authorised the removal of communities declared to be in the wrong area. Sophiatown, District Six, Cato Manor and Fietas were among those cleared; an estimated 3.5 million people were forcibly relocated between 1960 and 1983 to townships and homelands such as Soweto, Mdantsane and KwaMashu.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.karma += 3
      p.addFlag('sa_forced_removal')
      p.setMem('saForcedRemoval', true)
    },
  },

  {
    id: 'sa_mbeki_aids',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1999 && G.currentYear <= 2008 &&
      G.age >= 18 &&
      !G.mem?.saMbekiAids,
    text: (G) => {
      if (G.ethnicity === 'black_south_african') {
        return 'South Africa has the highest HIV-positive population in the world. The antiretroviral drugs that suppress the virus exist; the global pharmaceutical pressure has brought the price down; the generic drugs are cheaper still. Thabo Mbeki does not believe the science. He has read dissidents who say HIV does not cause AIDS. He appoints a Health Minister who recommends beetroot, garlic, and African potato. In the years between 1999 and 2008, a Harvard study later calculates, 330,000 people die who would not have died if the antiretrovirals had been made available. You know some of them. You know the word "available" — you understand what it implies about what was not done.'
      }
      return 'South Africa has the highest HIV-positive population in the world and a president who does not believe the scientific consensus on HIV and AIDS. While AZT and nevirapine are available in other countries, President Mbeki restricts their distribution in public hospitals. A Harvard study later estimates 330,000 preventable deaths. Treatment Action Campaign activists and doctors campaign against the policy and eventually win. The time it takes to win is measured in people who did not survive the delay.'
    },
    choices: [
      {
        text: 'Someone you know dies in these years, not from HIV but from the gap between what existed and what was provided.',
        tag: 'sa_mbeki_aids_era',
        outcome: 'You know what they died of. You know the drug that would have delayed the dying. You know where the drug was and why it was not here.',
        effect: (p) => { p.m -= 15; p.r += 10; p.karma += 6; p.addFlag('sa_mbeki_aids_era'); p.addFlag('grief_carried'); p.setMem('saMbekiAids', true); },
      },
      {
        text: 'You carry the number — 330,000 — and the policy that produced it.',
        tag: 'sa_mbeki_aids_era',
        outcome: 'The number sits in you. You heard it years later, after the study came out. You held it against the president who had been the liberation movement\'s intellectual, the man the ANC trusted to govern what they had fought for.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('sa_mbeki_aids_era'); p.addFlag('post_apartheid_disillusionment'); p.setMem('saMbekiAids', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_born_free_reality',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 2010 && G.currentYear <= 2024 &&
      G.character.birthYear >= 1994 &&
      G.age >= 14 && G.age <= 24 &&
      !G.mem?.saBornFree,
    text: 'They call your generation "born frees" — born after 1994, born into the democracy your parents and grandparents voted into existence. You did not grow up under apartheid. You grew up in a country where your parents voted and where the textbooks say it is your country. You grow up in a township or a township-adjacent area with patchy electricity and a school whose bathroom tiles have been missing for three years and a matric pass rate that is not what the country promised. The "born free" generation is discovering that freedom was not a promise about material conditions. The structural inheritance of apartheid — where the money went, where the jobs are, whose children go to which schools — is not abolished by the vote.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 6
      p.e += 3
      p.addFlag('sa_born_free')
      p.setPolitical('left')
      p.setMem('saBornFree', true)
    },
  },

  {
    id: 'sa_service_delivery_protest',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 2004 && G.currentYear <= 2020 &&
      G.age >= 16 &&
      !G.mem?.saServiceDelivery,
    text: 'The RDP houses. The waiting list. The promise — one million houses in five years, running water and electricity for everyone. The ANC made this promise in 1994 and it was a real promise, not a cynical one. The reality: a shack in an informal settlement outside a township, a water standpipe 300 metres away, electrical connections that arrive ten years late or not at all, a RDP house that arrives but has walls that crack within two years of construction. The protests: burning tyres, blocked roads, community councillors\' offices stoned. The language of the protest is the language of the ANC\'s own election promises. The protesters are not opposition voters.',
    choices: [
      {
        text: 'You join the protest. The promises were made and they were not kept.',
        tag: 'sa_service_delivery_era',
        outcome: 'The protest is specific: a particular pothole, a particular substation, a particular sewage pipe that has leaked since 2009. The national promise and the local failure are the same sentence.',
        effect: (p) => { p.karma += 5; p.m -= 4; p.r += 4; p.addFlag('sa_service_delivery_era'); p.setPolitical('left'); p.setMem('saServiceDelivery', true); },
      },
      {
        text: 'You do not protest. The system is slow but things are improving.',
        tag: null,
        outcome: 'Some things improve. The wait is longer than the promise but shorter than apartheid. You hold both of these facts simultaneously.',
        effect: (p) => { p.r += 2; p.setMem('saServiceDelivery', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_land_question',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 2018 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      !G.mem?.saLandQuestion,
    text: (G) => {
      if (G.ethnicity === 'black_south_african') {
        return 'The land debate. Seventy-two percent of commercial farmland in South Africa is still owned by white South Africans, who are eight percent of the population. This is the arithmetic of apartheid\'s land dispossession — the Group Areas Act, the 1913 Natives Land Act, the bantustans — still expressed in who owns what in the twenty-first century. The Constitutional Review Committee recommends allowing expropriation without compensation in certain circumstances. The debate becomes the debate about everything: what 1994 meant, what it failed to do, what is owed, whether ownership follows legislation or history.'
      }
      if (G.ethnicity === 'white_south_african') {
        return 'The land debate. The ANC and EFF are pushing for constitutional amendment to allow expropriation without compensation. Your farm, or your family\'s farm, or the farm you have no connection to but that represents the conversation: who owns South Africa\'s land, and what the correct response to that accounting is. The Afrikaner newspapers and the farming community say: food security, capital flight, Zimbabwe. The other side says: 1913, 1950, 2024. Both sides are using arithmetic.'
      }
      return 'The land debate: who owns South Africa\'s commercial farmland, what the historical accounting says, and what the correct legislative response is. The debate is louder and less resolved with each political cycle. Both the figures of dispossession and the figures of agricultural production are real.'
    },
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.addFlag('sa_land_debate_era')
      p.setMem('saLandQuestion', true)
    },
  },

  {
    id: 'sa_afrikaner_identity',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.ethnicity === 'white_south_african' &&
      G.currentYear >= 1994 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      !G.mem?.saAfrikanerIdentity,
    text: 'The language question, for Afrikaners, is the identity question. Afrikaans was used as the language of apartheid\'s administration — and it was also the language your grandmother used for prayer, the language of your jokes and your music and your particular way of insulting someone you love. The post-1994 country is reducing Afrikaans from administrative use. Some universities are switching to English. The community that fought to keep Afrikaans alive in the 19th century by asserting it against British imperialism is now navigating its language\'s association with the other thing. The people who say Afrikaans is just a language are not wrong. The people who say language is never just a language are also not wrong.',
    choices: [
      {
        text: 'The language belongs to everyone who speaks it. Including coloured Afrikaans speakers who also built it.',
        tag: 'sa_afrikaner_transformed',
        outcome: 'You find the coloured Afrikaans community — Cape Malay, Griqua, Namaqualand — and understand the language\'s other history. The transformation is real and incomplete.',
        effect: (p) => { p.e += 5; p.karma += 5; p.r += 3; p.addFlag('sa_afrikaner_transformed'); p.setMem('saAfrikanerIdentity', true); },
      },
      {
        text: 'You hold the language and try to hold it separately from what was done in its name.',
        tag: null,
        outcome: 'This is possible and it costs something. The thing you\'re holding is real and the weight is real.',
        effect: (p) => { p.r += 5; p.e += 2; p.setMem('saAfrikanerIdentity', true); },
      },
    ],
    effect: null,
  },

]
