// Canada character events
// October Crisis 1970, Charter 1982, Meech Lake, Quebec Referendum 1995,
// healthcare as identity, TRC 2015, Chinese head tax, housing affordability

export const CANADA_EVENTS = [

  {
    id: 'can_october_crisis_1970',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1970 &&
      G.age >= 14 &&
      !G.mem?.canOctoberCrisis,
    text: (G) => {
      const isQuebec = G.place?.region === 'Quebec' || G.character.country.name === 'Canada'
      return 'October 1970. The Front de libération du Québec kidnaps James Cross, the British trade commissioner, and then Pierre Laporte, the Quebec Labour Minister. Trudeau invokes the War Measures Act — suspended civil liberties, mass arrests. Nearly five hundred people detained without charge. "Just watch me," Trudeau said when asked how far he would go. Laporte is found dead in the trunk of a car on October 17. Cross is released in December. The War Measures Act is the only time Canada has suspended civil liberties in peacetime. The FLQ is broken. The question of Quebec is not.'
    },
    choices: [
      {
        text: 'The government response was necessary. The state had to act.',
        tag: null,
        outcome: 'The FLQ is dismantled. The civil liberties suspended are restored. Whether the suspension was proportionate is the argument that continues.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('october_crisis_generation'); p.setMem('canOctoberCrisis', true); },
      },
      {
        text: 'Five hundred people arrested without charge. The state went too far.',
        tag: null,
        outcome: 'The people arrested without charge are released. The act is repealed. The question of proportionality follows Trudeau\'s government and the War Measures Act into every subsequent discussion of civil liberties.',
        effect: (p) => { p.m -= 8; p.r += 5; p.karma += 4; p.addFlag('october_crisis_generation'); p.setMem('canOctoberCrisis', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'can_charter_1982',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1982 && G.currentYear <= 1985 &&
      G.age >= 16 &&
      !G.mem?.canCharter,
    text: 'April 17, 1982. The Queen signs the Constitution Act in the rain on Parliament Hill. The Charter of Rights and Freedoms is now part of the Canadian Constitution. It takes rights that existed in statutes and makes them constitutional. Section 15 — equality rights — comes into force in 1985. The notwithstanding clause allows provinces to opt out of certain provisions. Quebec refuses to sign the constitution, which means Quebec exists under a constitution it never ratified, which is a sentence that describes Canada\'s situation for the next several decades.',
    choices: [
      {
        text: 'The Charter changes what kind of country Canada is. The rights feel real now.',
        tag: null,
        outcome: 'The Charter creates a legal culture. The rights are tested in courts. The section 15 equality cases reshape the law in ways that take twenty years to fully see.',
        effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('charter_generation'); p.setMem('canCharter', true); },
      },
      {
        text: 'Quebec\'s absence from the constitutional negotiations is a wound that doesn\'t close.',
        tag: null,
        outcome: 'The Meech Lake Accord will try to close it in 1987. Meech will fail in 1990. The Charlottetown Accord will try again in 1992. Charlottetown will be defeated in a referendum. The wound is still there.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('charter_generation'); p.addFlag('quebec_question_generation'); p.setMem('canCharter', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'can_meech_lake_1990',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1990 &&
      G.age >= 18 &&
      !G.mem?.canMeech,
    text: 'The Meech Lake Accord would have recognized Quebec as a "distinct society" within Canada — a constitutional acknowledgement of what Quebec had been asking for since 1982. The accord needed ratification by all ten provinces. On June 22, 1990, Elijah Harper, a Cree politician in the Manitoba legislature, holds up a single eagle feather and votes no — not in support of Quebec, but because Indigenous peoples were not consulted. The accord fails. Three days later, Newfoundland\'s premier says he would have voted against it too. Meech dies. The separatist Bloc Québécois forms. The next referendum will come in five years.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.addFlag('meech_lake_generation')
      p.setMem('canMeech', true)
    },
  },

  {
    id: 'can_quebec_referendum_1995',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1995 &&
      G.age >= 16 &&
      !G.mem?.canReferendum,
    text: (G) => {
      const hasFrenchSurname = G.character.surname && /Tremblay|Martin|Roy|Côté|Gagnon|Bouchard|Leblanc|Fortin|Hébert/.test(G.character.surname)
      if (hasFrenchSurname) {
        return 'October 30, 1995. The question: "Do you agree that Quebec should become sovereign, after having made a formal offer to Canada for a new economic and political partnership?" The polls show the Yes side and the No side essentially tied. You are watching with family. On television the numbers go: Yes ahead, No ahead, Yes ahead. The No side wins by 50.58 percent. Parizeau goes on television and blames "money and the ethnic vote." You carry what he said for the rest of your life — the implication of who belongs to the decision about who belongs.'
      }
      return 'October 30, 1995. The Quebec sovereignty referendum. The question is about sovereignty-association — political independence with an economic partnership offer to Canada. The polls showed it too close to call. On the night: 50.58 percent No, 49.42 percent Yes. The margin was 54,000 votes out of five million. If the result had been Yes, Canada would have entered constitutional territory with no map. The result was No, but the margin is the fact that people carry.'
    },
    choices: [
      {
        text: 'Canada held. The result was close and that is the lesson.',
        tag: null,
        outcome: 'The lesson is taken by different people as different things: that the country is more fragile than it appears; that it held; that fifty thousand votes is not a mandate either way.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('referendum_night_generation'); p.addFlag('quebec_question_generation'); p.setMem('canReferendum', true); },
      },
      {
        text: 'The margin is too close to be reassuring. The question is deferred, not settled.',
        tag: null,
        outcome: 'The Clarity Act comes in 2000, setting the terms under which Canada would negotiate separation. The Act is contested in Quebec. The question is not settled. The question is deferred.',
        effect: (p) => { p.m -= 7; p.r += 7; p.addFlag('referendum_night_generation'); p.addFlag('quebec_question_generation'); p.setMem('canReferendum', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'can_healthcare_experience',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1970 &&
      G.age >= 25 &&
      (G.conditions?.length > 0 || (G.stats?.health ?? 50) < 60) &&
      !G.mem?.canHealthcare,
    text: 'The health card. You show it at the hospital or the clinic or the emergency room. The treatment happens. The billing does not follow. The absence of the billing is the thing you explain to people from the United States, or from countries where the choice between treatment and other things is a real choice. The absence of the billing is also imperfect: the wait times, the shortage of family doctors in certain provinces, the dental and vision that are not covered, the pharmaceuticals that are not covered. The system is the argument about what public means. The argument continues but the card still works.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.h += 3
      p.addFlag('canadian_healthcare_generation')
      p.setMem('canHealthcare', true)
    },
  },

  {
    id: 'can_trc_calls_to_action_2015',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity !== 'first_nations' &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem?.canTRC,
    text: 'The Truth and Reconciliation Commission releases its final report in 2015: 94 Calls to Action. The residential schools: 150,000 children separated from their families over 150 years. The National Day for Truth and Reconciliation is established. The unmarked graves at former school sites are found — the Ground Penetrating Radar surveys at Kamloops and elsewhere. Each survey produces a number that is added to the known number. The known number grows. The "sorry" that was said in 2008 by Stephen Harper sits differently after the graves are found. You are trying to understand what your relationship to this history is.',
    choices: [
      {
        text: 'You engage with the Calls to Action — specifically, with the ones that apply to you.',
        tag: null,
        outcome: 'The engagement is specific and imperfect and necessary. Call 62: education. Call 65: the National Centre for Truth and Reconciliation. The calls are numbered because they need to be tracked. You track some of them.',
        effect: (p) => { p.m -= 4; p.karma += 8; p.addFlag('trc_witness_generation'); p.setMem('canTRC', true); },
      },
      {
        text: 'You try to understand what you inherited. The understanding is ongoing.',
        tag: null,
        outcome: 'The history of the residential schools is the history of the country you were born in. The understanding is not complete and does not become complete. It becomes more complete.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('trc_witness_generation'); p.setMem('canTRC', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'can_chinese_head_tax',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity === 'chinese_canadian' &&
      G.currentYear >= 1885 && G.currentYear <= 1950 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.canHeadTax,
    text: 'The head tax: $50 in 1885, then $100, then $500 in 1903 — equivalent to two years of wages for a Chinese laborer. The Chinese Exclusion Act of 1923 stops immigration almost entirely. Your family paid the tax, or your grandfather paid it, or someone in the family paid it to build the railroad that built the country and was then told by the country that the cost of staying was $500. The tax is repealed in 1947. The apology comes in 2006. The apology is for the government\'s actions. The government\'s actions are the country\'s actions.',
    choices: [
      {
        text: 'The family paid what was demanded and built what was possible within those constraints.',
        tag: null,
        outcome: 'What was built: the Chinatowns, the family associations, the tongs, the paper sons and daughters who came anyway. The community is the response to the exclusion.',
        effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('head_tax_generation'); p.addFlag('hyphenated_canadian'); p.setMem('canHeadTax', true); },
      },
      {
        text: 'The anger is a family inheritance alongside the determination.',
        tag: null,
        outcome: 'The anger is accurate and specific and correctly targeted. It coexists with the love of the country that was built despite it.',
        effect: (p) => { p.m -= 5; p.r += 5; p.karma += 3; p.addFlag('head_tax_generation'); p.addFlag('hyphenated_canadian'); p.setMem('canHeadTax', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'can_housing_affordability',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 2015 && G.currentYear <= 2023 &&
      G.age >= 22 && G.age <= 40 &&
      (G.stats?.wealth ?? 50) < 70 &&
      !G.mem?.canHousing,
    text: 'Toronto or Vancouver or increasingly any Canadian city of consequence. The average home price in Toronto crosses one million dollars. A one-bedroom rental in Vancouver requires thirty percent of a median income. The waiting list for social housing in Toronto is twelve years. The government\'s advice — stress tests, first-time buyer incentives, affordability plans — produces the specific frustration of policy that does not fit the problem it is addressing. Your parents bought their house for $180,000. The house is worth $1.3 million. The number is not available to you. The number is available to them.',
    choices: [
      {
        text: 'You look elsewhere — a smaller city, a different province.',
        tag: null,
        outcome: 'The smaller city is still expensive, or it becomes expensive as you and everyone who made the same calculation arrive. The spread of the problem is the proof that the problem is structural.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('canadian_housing_generation'); p.addFlag('permanent_renter'); p.setMem('canHousing', true); },
      },
      {
        text: 'You rent and build your life without the house as the foundation of it.',
        tag: null,
        outcome: 'The life is built. The wealth that the house would have been — the equity, the inheritance — is absent from the accounting. The accounting is different but the life is real.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('canadian_housing_generation'); p.addFlag('permanent_renter'); p.setMem('canHousing', true); },
      },
    ],
    effect: null,
  },

]
