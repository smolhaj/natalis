// United States character events
// Great Migration, Jim Crow, Civil Rights, Vietnam draft, Rust Belt,
// War on Drugs, 9/11 (American experience), opioid crisis,
// school shooting era, foreclosure 2008

export const USA_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // GREAT MIGRATION & JIM CROW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_jim_crow_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'black_american' &&
      G.currentYear >= 1930 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.usaJimCrow,
    text: (G) => {
      const state = G.ruralUrban === 'rural' || G.ruralUrban === 'small_town'
        ? 'rural South'
        : 'the South'
      return `There is the water fountain for white people and the one for colored people. There is the school for white children, which has new textbooks, and the school you go to, which has the textbooks that came from the white school after they were old. There are the signs. You learn to read the signs before you learn to read words. You learn where to walk, how to look, what to say when a white man speaks to you. The learning is thorough and your parents are thorough teachers because the consequences of not knowing are permanent. This is ${state} in the middle of the century.`
    },
    choices: [
      {
        text: 'You absorb the rules of survival. The absorption takes something.',
        tag: null,
        outcome: 'The rules are absorbed. They create a second set of reflexes that you carry into the rest of your life — the automatic calculus of every room you enter.',
        effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('jim_crow_childhood'); p.addFlag('civil_rights_generation'); p.setMem('usaJimCrow', true); },
      },
      {
        text: 'Your parents are very deliberate about teaching you your worth alongside the rules.',
        tag: null,
        outcome: 'The worth is taught. The rules are still the rules. The two coexist — the dignity your family built and the system that denies it — and the coexistence is not comfortable but it is real.',
        effect: (p) => { p.m -= 5; p.e += 5; p.karma += 3; p.addFlag('jim_crow_childhood'); p.addFlag('civil_rights_generation'); p.setMem('usaJimCrow', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'usa_great_migration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'black_american' &&
      G.currentYear >= 1940 && G.currentYear <= 1970 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.usaGreatMigration,
    text: 'The train goes north. Chicago, Detroit, Cleveland, New York — your family has people in one of these cities, or you have a letter, or you have heard enough to know that whatever is at the end of the line is not what is behind you. The South was the known country. The North is the promised country. The North has its own arrangements about where you live and where you work. The arrangements are not legal the way Jim Crow was legal. They are informal, which makes them harder to name and no easier to escape.',
    choices: [
      {
        text: 'You make the move. The North is different from what you expected, in both directions.',
        tag: null,
        outcome: 'The factories are hiring. The segregation is de facto rather than de jure — redlining, restrictive covenants, the parts of the city you are steered to. You built something here anyway.',
        effect: (p) => { p.m -= 3; p.w += 5; p.r += 4; p.addFlag('great_migration_generation'); p.setMem('usaGreatMigration', true); },
      },
      {
        text: 'You stay. The North doesn\'t feel like a solution so much as a different version of the problem.',
        tag: null,
        outcome: 'You stay. The civil rights movement, when it comes, will come to the South first — where the laws are explicit and therefore more clearly a target.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('stayed_in_the_south'); p.addFlag('civil_rights_generation'); p.setMem('usaGreatMigration', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'usa_civil_rights_movement',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.ethnicity === 'black_american' &&
      G.currentYear >= 1955 && G.currentYear <= 1968 &&
      G.age >= 15 && G.age <= 35 &&
      !G.mem?.usaCivilRights,
    text: (G) => {
      const year = G.currentYear
      if (year <= 1960) {
        return 'Montgomery. Rosa Parks refuses to give up her seat on December 1, 1955. The boycott runs for 381 days. The Black community of Montgomery walks or carpools for over a year rather than ride the buses. The Supreme Court rules the bus segregation unconstitutional. You are watching the shape of what is possible change in real time. The change is not free.'
      }
      if (year <= 1963) {
        return 'The sit-ins. Greensboro, Nashville, Atlanta — young people sitting at lunch counters that refuse to serve them, sitting until they are arrested or attacked or the store closes, and then coming back. The Freedom Riders: CORE members boarding interstate buses to test the Supreme Court ruling. The beatings at the Anniston bus station, at Birmingham. The photographs that travel the world. The country is watching what you already know.'
      }
      return 'August 28, 1963. Two hundred and fifty thousand people at the Lincoln Memorial. "I have a dream." The March on Washington is the largest political demonstration in American history to this point. You are there, or you watch it on television, or someone tells you about it — the size, the sound, the feeling that the country was briefly capable of being what it said it was.'
    },
    choices: [
      {
        text: 'You are part of it — in the marches, the sit-ins, the boycotts.',
        tag: null,
        outcome: 'The participation cost something and changed something. The laws change: Civil Rights Act 1964, Voting Rights Act 1965. The enforcement of the laws is the next struggle.',
        effect: (p) => { p.m += 5; p.karma += 10; p.r += 3; p.addFlag('civil_rights_movement_participant'); p.addFlag('civil_rights_generation'); p.setMem('usaCivilRights', true); },
      },
      {
        text: 'You witness it, from near or far — the footage, the news, the changes arriving.',
        tag: null,
        outcome: 'You watch the country argue about whether the people demanding to be treated as citizens are going too far, too fast. The question makes you very tired. The laws pass.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('civil_rights_generation'); p.setMem('usaCivilRights', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'usa_king_assassination_1968',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear === 1968 &&
      G.age >= 12 &&
      !G.mem?.usaKingAssassination,
    text: (G) => {
      if (G.ethnicity === 'black_american') {
        return 'April 4, 1968. Memphis. The bullet hits Martin Luther King at 6:01pm on the balcony of the Lorraine Motel. He was thirty-nine years old. He had been in Memphis to support the sanitation workers\' strike. In cities across the country — Washington, Baltimore, Chicago, Louisville — the fires start that night. The grief and the rage are the same thing. You do not know yet that this is the end of one phase and the beginning of another, but you feel that it is.'
      }
      return 'April 4, 1968. Martin Luther King is shot on the balcony of the Lorraine Motel in Memphis. He was there for the sanitation workers\' strike. He was thirty-nine. In more than a hundred cities there are riots that night and in the days that follow. Two months later, Robert Kennedy will also be shot. The year keeps taking things. The country is trying to tell itself something and cannot agree on what.'
    },
    choices: [
      {
        text: 'The grief is total. Something ends here.',
        tag: null,
        outcome: 'Something does end. The movement continues in new forms and with new faces. The absence of this particular voice is permanent and specific.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('king_assassination_generation'); p.addFlag('civil_rights_generation'); p.setMem('usaKingAssassination', true); },
      },
      {
        text: 'The grief becomes something harder — a reckoning with what has always been true.',
        tag: null,
        outcome: 'The reckoning is ongoing. The harder thing is not certainty but the specific clarity that comes after illusions have been removed.',
        effect: (p) => { p.m -= 12; p.karma += 6; p.r += 6; p.addFlag('king_assassination_generation'); p.addFlag('civil_rights_generation'); p.setMem('usaKingAssassination', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // VIETNAM DRAFT
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_vietnam_draft_decision',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1965 && G.currentYear <= 1972 &&
      G.age >= 18 && G.age <= 25 &&
      !G.mem?.usaVietnamDraft,
    text: (G) => {
      const year = G.currentYear
      if (year >= 1969) {
        return 'December 1, 1969. The first Vietnam draft lottery. Birthdates on blue plastic capsules in a drum. September 14: capsule one. If your number is below 195 you will almost certainly go. If your number is above 195, probably not. You watch the television and wait to find out what your birthday means in this year. The number comes up. Now you know where you stand.'
      }
      return 'The notice comes in the mail — the Selective Service. You have been classified 1-A: available for military service. The war in Vietnam is expanding. You know men who have already gone. Some have come back and do not talk about it in the way you would expect. The question of what you do next is not abstract.'
    },
    choices: [
      {
        text: 'You go when called. The country asked and you answered.',
        tag: null,
        outcome: 'You go to Fort Benning or Fort Lewis or another place with a number painted on the barracks. Thirteen months in-country. The country you come back to will ask you about it once and then not ask again.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.addFlag('vietnam_went'); p.addFlag('vietnam_generation'); p.setMem('usaVietnamDraft', true); },
      },
      {
        text: 'You find a deferment — college, medical, family hardship.',
        tag: null,
        outcome: 'The deferment works. The knowledge that your number was drawn and you arranged not to go is something you carry forward in the way that unresolved things are carried.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('vietnam_deferred'); p.addFlag('vietnam_generation'); p.setMem('usaVietnamDraft', true); },
      },
      {
        text: 'You refuse. Canada, or conscientious objection, or going underground.',
        tag: null,
        outcome: 'The decision is made. It costs you certain things in certain rooms for a long time. President Carter pardons draft evaders in 1977. The pardon is administrative. The weight of the decision is not.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.r += 5; p.addFlag('vietnam_refused'); p.addFlag('vietnam_generation'); p.setMem('usaVietnamDraft', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'usa_vietnam_return',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.flags.includes('vietnam_went') &&
      G.currentYear >= 1966 && G.currentYear <= 1975 &&
      G.age >= 19 && G.age <= 28 &&
      !G.mem?.usaVietnamReturn,
    text: 'You are back. The airport. American concrete, American light. You are wearing civilian clothes because the recruiter said not to wear the uniform — some airports have people who shout things. You find out about this from the recruiter the day before you fly out, which is the first time the country has acknowledged that the people who sent you there have thoughts about your return. You are twenty or twenty-two or twenty-four and you have seen what you have seen and the country needs you to be fine.',
    choices: [
      {
        text: 'You are fine, or you pretend to be fine, because the alternative has no support structure.',
        tag: null,
        outcome: 'You are not fine. The pretending is a skill that becomes a habit that becomes a way of living. Veterans Administration waitlists are years long.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.r += 8; p.addFlag('vietnam_veteran'); p.addFlag('veteran_unthanked'); p.setMem('usaVietnamReturn', true); },
      },
      {
        text: 'You find the other veterans. The conversation happens between people who were there.',
        tag: null,
        outcome: 'The conversation happens. It does not fix what needs fixing, but it confirms that what you carry is real and not invented and shared by people you trust.',
        effect: (p) => { p.m -= 8; p.r += 5; p.karma += 4; p.addFlag('vietnam_veteran'); p.addFlag('veteran_solidarity'); p.setMem('usaVietnamReturn', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RUST BELT DEINDUSTRIALISATION
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_rustbelt_factory',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.age >= 25 && G.age <= 55 &&
      (G.stats?.wealth ?? 50) < 55 &&
      !G.mem?.usaRustbelt,
    text: 'The notice goes up on Friday. The plant is closing. Thirty years of the same shift, the same parking lot, the same men in the same places in the locker room — and now there is a date six months out. NAFTA. Automation. Cheaper production somewhere the company is not obligated to. The union fights and loses or the union is already gone. The severance package is described in a document that takes a lawyer to read. You do not have a lawyer.',
    choices: [
      {
        text: 'You retrain. The retraining programs exist in theory.',
        tag: null,
        outcome: 'The retraining programs are underfunded and the jobs they train for pay half of what the plant paid. You take what there is. The difference between what you earned and what you earn is the shape of the next decade.',
        effect: (p) => { p.m -= 12; p.w -= 10; p.r += 7; p.addFlag('rustbelt_generation'); p.addFlag('deindustrialisation_hit'); p.setMem('usaRustbelt', true); },
      },
      {
        text: 'You stay in the town and find work where you can. The town is different now.',
        tag: null,
        outcome: 'The town is different. The downtown is different. The tax base that funded the schools was tied to the plant. The schools are different. The children who grew up here are leaving for somewhere else.',
        effect: (p) => { p.m -= 10; p.w -= 8; p.r += 6; p.addFlag('rustbelt_generation'); p.addFlag('stayed_in_the_town'); p.setMem('usaRustbelt', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WAR ON DRUGS / MASS INCARCERATION
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_war_on_drugs',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      ['black_american', 'hispanic_american'].includes(G.ethnicity) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.usaWarOnDrugs,
    text: 'Stop and frisk. The police car pulls to the curb while you are walking. The question is where you are going and why. The legal answer is that you are going somewhere and you have not done anything, but the legal answer is not the context you are in. The War on Drugs: mandatory minimums, three-strikes laws, the crack/powder cocaine sentencing disparity where crack — the inner-city drug — carries a hundred-to-one sentence premium over powder. A gram of crack and a hundred grams of powder cocaine produce the same sentence. The statistics are racially legible.',
    choices: [
      {
        text: 'You learn to navigate these encounters and survive them.',
        tag: null,
        outcome: 'Navigating them takes a kind of expenditure that does not appear in any account book but is real and depleting. You develop the specific posture of a man who has been stopped many times and survived each time.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('war_on_drugs_era'); p.addFlag('overpoliced_community'); p.setMem('usaWarOnDrugs', true); },
      },
      {
        text: 'Someone you know gets caught in the system. The case goes to trial.',
        tag: null,
        outcome: 'The trial goes the way these trials go for people who cannot pay for the lawyer who gets cases dismissed. Five years mandatory. The mandatory minimum is a number with no context for the life it interrupts.',
        effect: (p) => { p.m -= 10; p.r += 7; p.karma += 4; p.addFlag('war_on_drugs_era'); p.addFlag('witnessed_incarceration'); p.setMem('usaWarOnDrugs', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 9/11 (AMERICAN EXPERIENCE)
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_9_11_experience',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear === 2001 &&
      G.age >= 14 &&
      !G.mem?.usa911Experience,
    text: (G) => {
      const place = G.place
      const isNYC = place && (place.name === 'New York' || place.name === 'Manhattan' || place.name === 'Brooklyn' || place.name === 'Queens')
      if (isNYC) {
        return 'You see the second plane hit from wherever you are in the city. Or you are underground on the subway and come up to a sky that is wrong. The towers are ten minutes\' walk from somewhere you have been recently. The smoke changes direction with the wind. By 9:59 the South Tower is gone and by 10:28 the North Tower is gone and you are standing in the street with everyone else in a city that is very quiet. The phones are not working. You need to reach someone. The streets are full of paper.'
      }
      return 'You hear about it on the radio, or someone tells you, or the television in the break room is on when you walk past. You find a screen and watch the footage repeat. The second plane, the collapse. You know people in New York or you don\'t. The country changes in the afternoon — the flights grounded, the buildings evacuated, the borders closed — and you spend the rest of the day at a television or a phone trying to understand what has happened and what comes next.'
    },
    choices: [
      {
        text: 'The city, the country, something essential feels permanently altered.',
        tag: null,
        outcome: 'The security lines that arrive after are permanent. The country that existed on September 10 does not return. You adapt to the new country while also knowing, somewhere, what was there before.',
        effect: (p) => { p.m -= 12; p.r += 5; p.addFlag('sept11_generation_us'); p.addFlag('post_9_11_world'); p.setMem('usa911Experience', true); },
      },
      {
        text: 'The grief is immediate; the political questions come later and don\'t resolve.',
        tag: null,
        outcome: 'The grief was real and clear. The political questions that follow — the surveillance, the wars, the torture memos, the color-coded threat levels — are murkier and stay murky for twenty years.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('sept11_generation_us'); p.addFlag('post_9_11_world'); p.setMem('usa911Experience', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FORECLOSURE CRISIS 2008
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_foreclosure_2008',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 2008 && G.currentYear <= 2011 &&
      G.age >= 25 &&
      (G.stats?.wealth ?? 50) < 55 &&
      !G.mem?.usaForeclosure,
    text: 'The letter from the bank arrives. It uses language designed to be incomprehensible: "notice of default," "notice of trustee\'s sale." What it means is that in ninety days the house will be taken. The mortgage was sold twice before it reached the bank that now holds it. The adjustable rate adjusted. The payment doubled. You were sold something based on a model that assumed house prices only went up. The house prices went down. Eight million American families will receive this letter between 2008 and 2012. You are one of them.',
    choices: [
      {
        text: 'You fight it — modification, refinancing, every option the bank presents.',
        tag: null,
        outcome: 'The process goes for a year and a half. The bank offers a modification that changes the terms slightly. You accept because the alternative is the street. The neighborhood is full of empty houses.',
        effect: (p) => { p.m -= 15; p.w -= 12; p.r += 8; p.addFlag('foreclosure_generation'); p.setMem('usaForeclosure', true); },
      },
      {
        text: 'You lose the house. You find somewhere to go and you rebuild from there.',
        tag: null,
        outcome: 'The house is gone. The equity you had built over twelve years is gone. The street you lived on has four other empty houses. You rent now. The credit score will take seven years to recover.',
        effect: (p) => { p.m -= 18; p.w -= 15; p.r += 6; p.addFlag('foreclosure_generation'); p.addFlag('housing_lost'); p.setMem('usaForeclosure', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // OPIOID CRISIS
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_opioid_crisis',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.usaOpioids,
    text: (G) => {
      const isRural = G.ruralUrban === 'rural' || G.ruralUrban === 'small_town'
      if (isRural) {
        return 'OxyContin in 1996. The pharmaceutical company\'s sales representatives tell the doctors that the addiction risk is less than one percent. The doctors prescribe it for back pain, for shoulder injuries, for the ordinary pain of physical work. The one-percent figure was taken out of context from a letter in the New England Journal of Medicine. By 2010, enough OxyContin is being prescribed in the US to medicate every adult American continuously for a month. In your town, you know who is on it. You know who the on-it became something else. You know the house where the parents died within a year of each other and no one was surprised.'
      }
      return 'Someone you know — a cousin, a coworker, someone from your neighborhood — has been on OxyContin for their back, or their shoulder, or the nerve damage from an accident. The pain was real. The prescription was for the pain. The dependency arrived quietly. The OxyContin got expensive or got cut off; the heroin was cheaper. The obituary says "passed away unexpectedly." You understand the language.'
    },
    choices: [
      {
        text: 'You lose someone to it. The loss arrives in the form of an ordinary phone call.',
        tag: null,
        outcome: 'The phone call is from someone in the family or a mutual friend. The word "overdose" is used or it is not used but the meaning is the same. The grief has a specific texture because the death could have been prevented at multiple points where prevention was not available.',
        effect: (p) => { p.m -= 14; p.r += 8; p.h -= 3; p.addFlag('opioid_crisis_touched'); p.addFlag('lost_someone_opioids'); p.setMem('usaOpioids', true); },
      },
      {
        text: 'The crisis is all around you. You watch the town or the family absorb it.',
        tag: null,
        outcome: 'You absorb the losses at one remove. The accumulation of one-remove losses across a town or a family is a form of collective damage that does not have a single date.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('opioid_crisis_touched'); p.setMem('usaOpioids', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SCHOOL SHOOTING ERA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'usa_school_shooting_era',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.currentYear >= 1999 &&
      G.age >= 10 && G.age <= 18 &&
      !G.mem?.usaSchoolShooting,
    text: (G) => {
      const year = G.currentYear
      if (year <= 2005) {
        return 'April 20, 1999. Columbine. Two students kill twelve classmates and a teacher. Before Columbine there were no active shooter drills. After Columbine there are active shooter drills. The drill is: when the alarm sounds, lock the classroom door, close the blinds, push the desks to the corner, sit against the wall below the window, and be quiet. You practice this. You practice this with your backpack on, so you have practised both the drill and the question of whether the backpack stops anything.'
      }
      return 'The drill is a standard part of school now. ALICE: Alert, Lockdown, Inform, Counter, Evacuate. The school has a plan. The plan is for an event that is statistically unlikely but has happened in enough specific schools that it is no longer theoretical. You know the exits. You know where the classrooms lock from. You have thought, without meaning to, about what you would do. You went to school in a country where this is what going to school involves.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.addFlag('school_shooting_era')
      p.setMem('usaSchoolShooting', true)
    },
  },

]
