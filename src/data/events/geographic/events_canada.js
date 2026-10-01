// Canada character events
// October Crisis 1970, Charter 1982, Meech Lake, Quebec Referendum 1995,
// healthcare as identity, TRC 2015, Chinese head tax, housing affordability

export const CANADA_EVENTS = [

  {
    id: 'can_october_crisis_1970',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1970 &&
      G.age >= 14 &&
      !G.mem?.canOctoberCrisis,
    text: (G) => {
      return 'October 1970. The FLQ kidnaps the British trade commissioner and then the Quebec labour minister, and Trudeau suspends civil liberties: soldiers on the streets, hundreds detained without charge. "Just watch me," he says. Laporte is found dead in the trunk of a car. The FLQ is broken. The question of Quebec is not.'
    },
    context: 'The War Measures Act was invoked on 16 October 1970; 497 people were detained. It is the only peacetime use of the act in Canadian history.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1982 && G.currentYear <= 1985 &&
      G.age >= 16 &&
      !G.mem?.canCharter,
    text: 'April 17, 1982. The Queen signs the Constitution Act in the rain on Parliament Hill. The Charter of Rights and Freedoms is now part of the Canadian Constitution. It takes rights that existed in statutes and makes them constitutional. Section 15 — equality rights — is held back three years, to give governments time to bring their laws into line. The notwithstanding clause allows provinces to opt out of certain provisions. Quebec refuses to sign the constitution, which means Quebec exists under a constitution it never ratified, which is a sentence nobody can say how long will go on describing Canada.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1990 &&
      G.age >= 18 &&
      !G.mem?.canMeech,
    text: 'The Meech Lake Accord would have recognised Quebec as a distinct society, and it needs all ten provinces. On June 22, 1990, Elijah Harper, a Cree member of the Manitoba legislature, holds up an eagle feather and votes no, because nobody asked Indigenous peoples. The accord dies. The Bloc Québécois is founded. The next referendum is five years away.',
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
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear === 1995 &&
      G.age >= 16 &&
      !G.mem?.canReferendum,
    text: (G) => {
      const hasFrenchSurname = G.character.surname && /Tremblay|Martin|Roy|Côté|Gagnon|Bouchard|Leblanc|Fortin|Hébert/.test(G.character.surname)
      if (hasFrenchSurname) {
        return 'October 30, 1995, and the referendum on sovereignty, and the polls have the two sides level. You watch with your family as the numbers go Yes ahead, No ahead, Yes ahead. No wins by a hair. Parizeau goes on television and blames money and the ethnic vote. You carry what he said for the rest of your life, and what it implied about who gets to belong to the decision about who belongs.'
      }
      return 'October 30, 1995. The question is sovereignty with an offer of partnership to Canada, and it is too close to call all night. In the end it is No, by a little over fifty-four thousand votes out of nearly five million. Had it gone the other way, the country would have walked into constitutional ground with no map. People carry the margin more than the result.'
    },
    context: 'No won 50.58 percent to 49.42 percent, a margin of about 54,000 votes.',
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
    text: 'You show the health card at the clinic or the emergency room, and the treatment happens, and no bill follows. That is what you explain to Americans. The system is also imperfect: the waits, the shortage of family doctors in some provinces, the teeth and eyes and prescriptions it does not cover. The argument about what public means goes on. The card still works.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity !== 'first_nations' &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem?.canTRC,
    text: 'The Truth and Reconciliation Commission reports in 2015, with ninety-four Calls to Action, on the schools that took children from their families for a hundred and fifty years. Then the radar surveys at Kamloops and elsewhere, and the unmarked graves, each survey adding to a number that keeps growing. The apology Harper made in 2008 sits differently after the graves. You are trying to understand what your own relation to this history is.',
    context: 'About 150,000 First Nations, Inuit and Métis children attended residential schools between the 1880s and 1996.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity === 'chinese_canadian' &&
      G.currentYear >= 1885 && G.currentYear <= 1950 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.canHeadTax,
    text: (G) => 'The head tax: $50 in 1885' + (G.currentYear >= 1903 ? ', then $100, then $500 in 1903 — equivalent to two years of wages for a Chinese laborer.' : G.currentYear >= 1900 ? ', then $100.' : '.') + (G.currentYear >= 1923 ? ' The Chinese Exclusion Act of 1923 stops immigration almost entirely.' : '') + ' Your family paid the tax, or your grandfather paid it, or someone in the family paid it to build the railroad that built the country and was then told by the country what the cost of staying was.' + (G.currentYear >= 1947 ? ' The Exclusion Act is repealed in 1947.' : '') + ' Nobody in government has said the word sorry. The government\'s actions are the country\'s actions.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 2015 && G.currentYear <= 2023 &&
      G.age >= 22 && G.age <= 40 &&
      (G.stats?.wealth ?? 50) < 70 &&
      !G.mem?.canHousing,
    text: 'Toronto or Vancouver, or by now any city that matters. The average house crosses a million dollars, a one-bedroom eats a third of a wage, and the list for social housing is twelve years long. The government\'s plans fit some other problem. Your parents bought their house for $180,000 and it is worth more than a million now. That number is available to them. It is not available to you.',
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
        outcome: 'The life is built. The wealth that the house would have been — the equity, the inheritance — is absent from the accounting. The accounting is different, and the life goes on.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('canadian_housing_generation'); p.addFlag('permanent_renter'); p.setMem('canHousing', true); },
      },
    ],
    effect: null,
  },

]
