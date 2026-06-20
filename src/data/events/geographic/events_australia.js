// Australia character events
// White Australia Policy, Vietnam conscription ballot, The Dismissal 1975,
// Port Arthur 1996, Tampa 2001, mining boom, SSM postal survey 2017,
// housing crisis; added: Mabo 1992, Rudd apology 2008, Black Summer 2019-20

export const AUSTRALIA_EVENTS = [

  {
    id: 'aus_white_australia_policy',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.ethnicity === 'asian_australian' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.ausWhiteAustralia,
    text: 'The White Australia Policy is the law of the land. Your family came under the discretion provisions — technically excluded, practically permitted, contingent on each generation proving it belongs. The dictation test: you can be asked to write fifty words in any European language the officer chooses. The officer chooses a language you do not know. This is the mechanism. You learn early that belonging here is a permission you have to re-earn. The policy will be dismantled in stages between 1966 and 1973. You are living in the years before the dismantling.',
    choices: [
      {
        text: 'You become expert at the performance of belonging. The performance is exhausting.',
        tag: null,
        outcome: 'The performance is thorough and eventually becomes partly real. You are Australian in ways that the policy did not account for. The policy ends. The performance continues in the rooms where the policy\'s logic persists informally.',
        effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('white_australia_generation'); p.addFlag('hyphenated_australian'); p.setMem('ausWhiteAustralia', true); },
      },
      {
        text: 'Your parents build the community around themselves. The community is self-contained.',
        tag: null,
        outcome: 'The community is real and protective and also a site of the negotiation between the place you are and the place your parents came from. You are fluent in both negotiations.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('white_australia_generation'); p.addFlag('hyphenated_australian'); p.setMem('ausWhiteAustralia', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_vietnam_conscription',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1965 && G.currentYear <= 1972 &&
      G.age >= 18 && G.age <= 22 &&
      !G.mem?.ausVietnam,
    text: 'The birthday ballot. They place marbles in a barrel — one for each birthday of the year — and draw them out. If your birthday comes up, you serve two years in the national service. Sixty thousand men are called between 1965 and 1972. About fifteen thousand will go to Vietnam. The ballot is random. The random is the official word for a process where class and education produce very different outcomes: deferment for students, exemptions for essential trades, the mechanisms that make the random less random for certain people.',
    choices: [
      {
        text: 'Your birthday comes up. You go.',
        tag: null,
        outcome: 'Phuoc Tuy Province. The Long Tan paddy fields. You come back different, which is what people say, and also correct. The Welcome Home Parade does not happen until 1987, fifteen years after the last troops return.',
        effect: (p) => { p.m -= 10; p.h -= 6; p.addFlag('aus_vietnam_vet'); p.addFlag('veteran_unthanked'); p.setMem('ausVietnam', true); },
      },
      {
        text: 'Your birthday comes up but you find a way out — student deferment, the medical, the objection.',
        tag: null,
        outcome: 'You find the way out that was available to you. The men who did not have the same way out went instead. You know this, quietly, for the rest of your life.',
        effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('aus_vietnam_evaded'); p.setMem('ausVietnam', true); },
      },
      {
        text: 'Your birthday does not come up. The marble that wasn\'t drawn.',
        tag: null,
        outcome: 'You watch men your age go. Some come back and do not talk about it. The ballot was random. You were the random outcome that stayed home.',
        effect: (p) => { p.r += 4; p.addFlag('aus_vietnam_generation'); p.setMem('ausVietnam', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_dismissal_1975',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear === 1975 &&
      G.age >= 16 &&
      !G.mem?.ausDismissal,
    text: 'November 11, 1975. Remembrance Day. The Governor-General John Kerr summons Gough Whitlam and reads him the letter: his commission as Prime Minister has been terminated. The Senate had blocked supply — refused to pass the budget — and Kerr used reserve powers that had never been used before and have not been used since. Whitlam stands on the steps of Parliament House and reads his statement to the crowd. The last line: "Well may we say God save the Queen, because nothing will save the Governor-General." The 1975 election goes to Fraser in a landslide. The question of whether what Kerr did was constitutional is still being argued.',
    choices: [
      {
        text: 'What happened was a constitutional coup and it was not supposed to be possible.',
        tag: null,
        outcome: 'The argument continues. The Governor-General\'s papers are sealed until 2027. What the Queen knew and when she knew it is still not public. The democratic system absorbed the crisis and the crisis changed the system.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('dismissal_generation'); p.addFlag('political_active'); p.setMem('ausDismissal', true); },
      },
      {
        text: 'Whitlam\'s government had problems. The Senate was doing its constitutional role.',
        tag: null,
        outcome: 'The argument has two sides and you are on one of them. The argument is still going. The use of reserve powers to end a government that had not lost a no-confidence vote remains, by most constitutional readings, extraordinary.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('dismissal_generation'); p.setMem('ausDismissal', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_port_arthur_1996',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear === 1996 &&
      G.age >= 14 &&
      !G.mem?.ausPortArthur,
    text: 'April 28, 1996. Port Arthur, Tasmania. A tourist site. Thirty-five people killed, twenty-three wounded. The deadliest mass shooting in Australian history. John Howard announces gun law reforms within days. By the following year, 650,000 semi-automatic weapons and pump-action shotguns have been bought back and destroyed. Howard wears a bullet-proof vest to address the gun lobby. The laws pass. The gun buyback is the largest civilian disarmament in a democratic country\'s history. Australia does not have another mass shooting of comparable scale.',
    choices: [
      {
        text: 'The response — the laws, the buyback — feels like the country choosing to be something different.',
        tag: null,
        outcome: 'The choice was made and it held. What Australia did in 1996 becomes, in subsequent decades, a reference point for countries that do not make the same choice.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.r += 4; p.addFlag('port_arthur_generation'); p.setMem('ausPortArthur', true); },
      },
      {
        text: 'The grief is overwhelming. The policy is secondary to that for now.',
        tag: null,
        outcome: 'The grief was primary and the policy followed from it. Both things happened. The grief made the policy possible.',
        effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('port_arthur_generation'); p.setMem('ausPortArthur', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_tampa_2001',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear === 2001 &&
      G.age >= 18 &&
      !G.mem?.ausTampa,
    text: (G) => {
      if (G.ethnicity === 'asian_australian') {
        return 'August 2001. The MV Tampa rescues 438 Afghan asylum seekers in the Indian Ocean. The Howard government refuses to allow them to land. The phrase "we will decide who comes to this country and the circumstances in which they come" enters the political language. You were born here or came here legally, which should be different from the situation these people are in. In certain quarters, the distinction is not reliably made. The election is in November. The Tampa and then the September 11 attacks. Howard wins in a landslide.'
      }
      return 'August 2001. The MV Tampa, a Norwegian cargo ship, rescues 438 Afghan asylum seekers from a sinking vessel in the Indian Ocean and heads for Christmas Island. The Howard government denies permission to land and boards the ship with SAS troops. The Pacific Solution: offshore processing in Nauru and Papua New Guinea. "We will decide who comes to this country and the circumstances in which they come." The election is in November. Howard wins in a landslide.'
    },
    choices: [
      {
        text: 'The policy is a cruelty deliberately made visible. You will not be part of the landslide.',
        tag: null,
        outcome: 'The landslide happens without you. The Pacific Solution continues for years. The offshore detention centres become a specific Australian human rights record that follows the country into subsequent decades.',
        effect: (p) => { p.m -= 6; p.karma += 5; p.r += 4; p.addFlag('pacific_solution_era'); p.setMem('ausTampa', true); },
      },
      {
        text: 'Border security is a genuine policy question. The rhetoric goes too far; the underlying issue is real.',
        tag: null,
        outcome: 'The issue is real. The specific treatment of people in offshore detention — the indefinite detention, the reports of self-harm, the children in camps — is also real. Both can be true.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('pacific_solution_era'); p.setMem('ausTampa', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_mining_boom',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2005 && G.currentYear <= 2015 &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.ausMiningBoom,
    text: 'China is building. Australia has iron ore and coal. The mining boom: commodity prices at heights not seen in a generation, the resources states running budget surpluses, unemployment below four percent during the GFC that is hitting everywhere else. The "lucky country" is working again. The luck is geographically concentrated — Western Australia, Queensland, the fly-in fly-out rosters — and the luck is also not distributed the way you might expect, which is the other part of the lucky country that Donald Horne meant when he coined the phrase.',
    choices: [
      {
        text: 'You work the boom. The money is real and so is what it costs you.',
        tag: null,
        outcome: 'The FIFO roster: two weeks on site, one week home. The money accumulates. The relationship accumulates costs at the same rate. The boom ends in 2013 when the commodity prices fall. You have something to show for it.',
        effect: (p) => { p.m -= 4; p.w += 8; p.r += 4; p.addFlag('mining_boom_generation'); p.setMem('ausMiningBoom', true); },
      },
      {
        text: 'You watch the boom from somewhere it didn\'t reach.',
        tag: null,
        outcome: 'The boom happened. The money went somewhere. The places it didn\'t reach watched the national figures and felt the gap between the national narrative and the local experience.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('mining_boom_generation'); p.setMem('ausMiningBoom', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_ssm_postal_survey_2017',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear === 2017 &&
      G.age >= 16 &&
      !G.mem?.ausSSM,
    text: (G) => {
      const isLGBTQ = G.flags.some(f => ['gay_man', 'lesbian_woman', 'bisexual', 'lgbtq_identity', 'queer_identity', 'came_out'].includes(f))
      if (isLGBTQ) {
        return 'The parliament cannot pass marriage equality directly, so instead Australia runs a postal survey asking citizens whether they think you should be allowed to marry. The debate runs for months. The No campaign\'s advertising. The billboards in your suburb. Your colleagues who tell you they are voting Yes but also that it\'s complicated. The result comes in on November 15: 61.6 percent Yes. You watch it at a pub or at home or in the street. The Yes win means you can marry. What the process of asking cost is a different accounting.'
      }
      return 'Instead of a parliamentary vote, the government runs a postal survey on same-sex marriage. The campaign: the Yes campaign in the streets, the No campaign on billboards. On November 15, the result: 61.6 percent of Australians who returned a ballot voted Yes. Marriage equality passes parliament the following month. The postal survey will be debated for years as a mechanism — whether it was necessary, whether the debate it produced was worth the cost of having the debate publicly.'
    },
    choices: [
      {
        text: 'You vote Yes. The result is what you hoped.',
        tag: null,
        outcome: 'The result is Yes. The law changes. The cost of the process — the months of being debated as a policy question — is not made good by the outcome, which is also good.',
        effect: (p) => { p.m += 6; p.karma += 4; p.addFlag('ssm_australia_generation'); p.setMem('ausSSM', true); },
      },
      {
        text: 'You vote No, or you do not vote. Some things should not be changed.',
        tag: null,
        outcome: 'The result is Yes. The law changes. Your position is now the minority position. This is the outcome of a democratic process. You live with it the way one lives with democratic outcomes.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('ssm_australia_generation'); p.setMem('ausSSM', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'aus_housing_crisis',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2012 && G.currentYear <= 2023 &&
      G.age >= 22 && G.age <= 40 &&
      (G.stats?.wealth ?? 50) < 70 &&
      !G.mem?.ausHousing,
    text: 'The open house queue runs around the block. You are applying for a rental with eighty other applicants. The median house price in Sydney is twelve times median income. The deposit you would need is more than two years\' salary, which means you need parental assistance or you are renting indefinitely. The generation before you paid three times income for their houses. The gap between that generation\'s housing advice ("just save harder", "buy something smaller") and the arithmetic of the current market is a conversation that happens at family dinners and goes nowhere.',
    choices: [
      {
        text: 'You rent and make peace with it. The permanent renter.',
        tag: null,
        outcome: 'The renting is not temporary. It is the condition. You build what you build within it — the furniture, the community, the life that does not require a mortgage. The net worth calculation is a different calculation.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('aus_housing_generation'); p.addFlag('permanent_renter'); p.setMem('ausHousing', true); },
      },
      {
        text: 'You find a way in — parents, savings, a cheaper city.',
        tag: null,
        outcome: 'You get in. The entry point is further from the city or smaller than planned or required family money. You are in. The privilege of being in, relative to the eighty other applicants, is not lost on you.',
        effect: (p) => { p.m -= 3; p.w += 4; p.r += 3; p.addFlag('aus_housing_generation'); p.setMem('ausHousing', true); },
      },
    ],
    effect: null,
  },

  // ── MABO DECISION 1992 ────────────────────────────────────────────────────────

  {
    id: 'aus_mabo_1992',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 1992 && G.currentYear <= 1998 &&
      G.age >= 22 &&
      !G.mem?.ausMabo,
    text: 'June 3, 1992. The High Court hands down its decision in Mabo v Queensland. The doctrine of terra nullius — the legal fiction that Australia was legally unoccupied before 1788 — is overturned after two hundred and four years. The decision recognises that Eddie Mabo and the Meriam people of the Murray Islands had continuous connection to their land before and after British sovereignty was asserted. The government responds with the Native Title Act 1993 to codify the decision. John Howard, then in opposition, will later describe the recasting of Australian history as "the black armband view." The phrase becomes a shorthand for a culture war that will run for decades. You are an Australian adult in the years when the country is deciding what it means that the foundation of its land law was a fiction.',
    choices: [
      {
        text: 'Mabo clarified something that was always true. The country needs to reckon with it.',
        tag: null,
        outcome: 'The reckoning, as it turns out, is slower and more contested than the decision. You have watched it since.',
        effect: (p) => { p.e += 5; p.karma += 5; p.r += 4; p.addFlag('aus_mabo_generation'); p.setMem('ausMabo', true); },
      },
      {
        text: 'You find the implications uncomfortable. The country is more complicated than you thought.',
        tag: null,
        outcome: 'The discomfort is information. What you do with it takes years to determine.',
        effect: (p) => { p.e += 4; p.r += 5; p.addFlag('aus_mabo_generation'); p.setMem('ausMabo', true); },
      },
    ],
    effect: null,
  },

  // ── RUDD APOLOGY 2008 ─────────────────────────────────────────────────────────

  {
    id: 'aus_rudd_apology_2008',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2008 && G.currentYear <= 2009 &&
      G.age >= 20 &&
      !G.mem?.ausApology,
    text: 'February 13, 2008. Kevin Rudd stands in Parliament and says the words that eleven years of Howard government would not say: "We apologise." The apology is to the Stolen Generations — the Aboriginal and Torres Strait Islander children removed from their families under government policy, generation after generation, in the name of assimilation. The chamber and the screens outside, where people have gathered in public squares across the country, go quiet at the word. You are Australian and watching a country say something that it has been refusing to say for years. What the word costs and what it produces are not the same question.',
    choices: [
      {
        text: 'You watched or listened. The word mattered. Something shifted.',
        tag: null,
        outcome: 'Something shifting is not the same as something changing. The gap between the apology and what came after is something you have been measuring ever since.',
        effect: (p) => { p.m += 8; p.karma += 6; p.r += 4; p.addFlag('aus_sorry_generation'); p.setMem('ausApology', true); },
      },
      {
        text: 'The word was right. The policy changes that should have followed it came slowly, if at all.',
        tag: null,
        outcome: 'The apology and the accounting are not the same thing. You know the difference and carry both positions simultaneously.',
        effect: (p) => { p.e += 5; p.karma += 4; p.r += 5; p.addFlag('aus_sorry_generation'); p.setMem('ausApology', true); },
      },
    ],
    effect: null,
  },

  // ── THE BLACK SUMMER ──────────────────────────────────────────────────────────

  {
    id: 'aus_black_summer_2020',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 16 &&
      !G.mem?.ausFireSummer,
    text: (G) => {
      const isAffected = G.age >= 20 && G.age <= 55
      return isAffected
        ? 'Summer 2019-20. Eighteen-point-six million hectares burn. Thirty-three people die directly; smoke-related mortality will be counted for years. Three billion animals. The sky over Sydney turns red-orange at noon. Melbourne: worst air quality of any city on Earth on certain days. The fires burn through the fire season, through January, into February. The Prime Minister was in Hawaii when the fires started and will be photographed trying to shake hands with people who do not want to shake his hand. You watch it from a city, from a rural property, from a holiday that has become impossible to leave. The country that you thought would be yours to pass on has been revised.'
        : 'You are younger and the Black Summer of 2019-20 is one of the first large events you are old enough to carry. Eighteen-point-six million hectares. The red sky. The number of animals. You will be asked about climate change at school in a way that is different from how the generation before you was asked. The answer is visible.'
    },
    choices: [
      {
        text: 'The fires made something undeniable. The climate argument is over, for you.',
        tag: null,
        outcome: 'Over for you. Not over in the parliament, not over in the politics. You live with the gap between what is obvious to you and what is still contested.',
        effect: (p) => { p.m -= 12; p.r += 7; p.e += 5; p.addFlag('black_summer_generation'); p.setMem('ausFireSummer', true); },
      },
      {
        text: 'Someone you know lost a property or was evacuated. The abstract became specific.',
        tag: null,
        outcome: 'The specific loss of specific people is a different kind of knowledge from the statistics. Both are true. The specific is harder to set aside.',
        effect: (p) => { p.m -= 10; p.r += 6; p.karma += 4; p.addFlag('black_summer_generation'); p.setMem('ausFireSummer', true); },
      },
    ],
    effect: null,
  },

]
