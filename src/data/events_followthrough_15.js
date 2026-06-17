// Follow-through events (BUILD — Japan arc + Latin America arc follow-throughs)
// Late-life and midlife callbacks for flags set in Japan and Latin America arcs.
// These fire years or decades after the originating event, showing how
// historical experiences persist through a life.

export const FOLLOWTHROUGH_15_EVENTS = [

  // ── JAPAN FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft15_salaryman_retirement',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('salaryman_life') &&
      G.age >= 60 &&
      !G.mem?.ft15SalarymanRetirement,
    text: 'The retirement ceremony is held in a conference room. Your direct reports have prepared remarks. Someone has bought a clock. The clock has your name engraved on it. You receive it with both hands and bow. The managing director says you have given everything. What you gave was the commute, the late train, the evenings that became the company\'s evenings, the decades of being a man whose address changed when the company needed it to change. The clock is accurate. It will continue to be accurate when you are not in the office.',
    choices: [
      {
        text: 'The company was your life. That is a true statement and you do not know how to feel about it.',
        tag: null,
        outcome: 'You carry the clock home on the train. The train is the same train. You are not going to the same place.',
        effect: (p) => { p.r += 5; p.m += 3; p.setMem('ft15SalarymanRetirement', true); },
      },
      {
        text: 'You always knew it was a bargain. You gave the company the years. The company gave you the decades of certainty.',
        tag: null,
        outcome: 'The bargain was real. The certainty was real. The regret is real and does not contradict the other things.',
        effect: (p) => { p.r += 3; p.m += 5; p.e += 2; p.setMem('ft15SalarymanRetirement', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft15_karoshi_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('karoshi_adjacent') &&
      G.age >= 55 &&
      !G.mem?.ft15KaroshiLate,
    text: 'His name was Nakamura. He died at his desk in November. The official cause was cardiac arrest. The real cause was the 3,000 hours of overtime he had logged that year, which came out in the labor inspection, which found the company in violation, which resulted in a fine that was smaller than his annual salary had been. His wife received a karoshi certification from the Labor Standards Inspection Office. The certification acknowledges what the employer denied for eighteen months. You worked the same hours. You are here. He is not. The difference between the two of you is not virtue.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.karma += 3
      p.setMem('ft15KaroshiLate', true)
    },
  },

  {
    id: 'ft15_lost_decade_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_decade_generation') &&
      G.age >= 60 &&
      !G.mem?.ft15LostDecadeLate,
    text: 'The Nikkei closed above 40,000 this year for the first time since 1989. The financial newspapers are using the word "recovery." You watched the index fall from 38,915 in December 1989 to 8,000 in 2003. You watched the real estate that was valued at four times the entire United States in 1989 become something else. The word "recovery" is accurate for the index. The decade in which you were supposed to be building something — career, savings, security — that decade did not recover. The index is not you.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft15LostDecadeLate', true)
    },
  },

  {
    id: 'ft15_lost_generation_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('lost_generation_japan') &&
      G.age >= 55 &&
      !G.mem?.ft15LostGenerationLate,
    text: (G) => {
      const age = G.age
      if (age >= 65) {
        return 'The ushinawareta sedai — the lost generation. The ones who graduated between 1993 and 2005. Your cohort. The pension calculation is based on contributions. Your contributions were interrupted: the dispatch work, the contract gaps, the years before the labor reforms. The government has been studying the problem of the lost generation\'s retirement since 2010. The studies have continued. You are now the age the studies were written about.'
      }
      return 'The economist calls your cohort the "employment ice age generation." He is twenty years younger than you and has a permanent position. He says the policy failures that produced your situation were correctable. You understand what he means. You also understand that the correction, if it comes, will not come for the people who already spent their forties in dispatch work on one-year contracts.'
    },
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.w -= 3
      p.setMem('ft15LostGenerationLate', true)
    },
  },

  {
    id: 'ft15_tohoku_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('tohoku_survivor') &&
      G.age >= 55 &&
      !G.mem?.ft15TohokuLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2021) {
        return 'The seawall is fifteen meters high. It runs along the coast for 400 kilometers. The government built it to protect the towns from the next wave. The towns the wave took are behind the seawall, rebuilt or not rebuilt or half-rebuilt, depending on the town. From inside the town you cannot see the ocean. The ocean has been put out of sight. This is the protection. You lived here before the seawall. The ocean was part of what it meant to live here. The seawall is also part of what it means to live here now.'
      }
      return 'March 11, each year. The siren test. The four-minute warning that did not reach everyone in time. The evacuation routes that were marked and the people who turned back to get something from the house. You know which turning took you up the hill. You know which part of that knowledge is luck and which part is the drill you had done every year since school.'
    },
    choices: [
      {
        text: 'You go back to the coast once a year, on March 11. It asks something of you each time.',
        tag: null,
        outcome: 'The asking is different every year. Some years it asks about the people. Some years it asks about the water. Some years it just asks you to stand there.',
        effect: (p) => { p.r += 4; p.m -= 3; p.m += 5; p.karma += 4; p.setMem('ft15TohokuLate', true); },
      },
      {
        text: 'You do not go back to the coast. The distance is its own kind of keeping.',
        tag: null,
        outcome: 'What you are keeping is yours. The date still comes each year regardless.',
        effect: (p) => { p.r += 6; p.m += 2; p.setMem('ft15TohokuLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft15_hibakusha_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hibakusha_stigma_lived') &&
      G.age >= 60 &&
      !G.mem?.ft15HibakushaLate,
    text: 'Sunao Tsuboi, who was one of the last known hibakusha, died in 2021. He was ninety-six. He had been giving testimony since 1945 and had not stopped. What he was giving testimony to: the fireball, the temperature, the distance from the hypocenter, the color of the smoke, the specific quality of the silence that followed. The Nihon Hidankyo — the hibakusha organization — was awarded the Nobel Peace Prize in 2024. The award recognises that the testimony existed and was given and is now in the historical record. The generation that experienced the thing is almost entirely gone. What remains is the testimony.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 5
      p.r += 4
      p.setMem('ft15HibakushaLate', true)
    },
  },

  {
    id: 'ft15_minamata_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('minamata_disease') &&
      G.age >= 60 &&
      !G.mem?.ft15MinamataLate,
    text: 'The cats that ran into the sea in the 1950s were the first sign, before the symptoms appeared in the people of Minamata. Chisso factory. Methylmercury. The company denied it for twelve years. The disease was named after the bay in 1956 and the company continued to discharge mercury until 1968. The courts found in favor of the plaintiffs in 1973. Chisso continued to operate. The third-generation effects are being documented now — children of children of people who ate the fish. The mercury entered the food chain and stayed. The third generation did not eat the fish. They carry what the fish carried into the people who were their grandparents.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.h -= 3
      p.setMem('ft15MinamataLate', true)
    },
  },

  {
    id: 'ft15_anpo_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anpo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft15AnpoLate,
    text: 'Kishi Nobusuke resigned after the Security Treaty was ratified in 1960. You were in the crowds outside the Diet building the night it passed. The protest had not stopped the ratification. Kishi resigned anyway — the scale of opposition made his position untenable even after he won. The Security Treaty has been renewed automatically every year since. It is now so ordinary that students who were not born yet do not know there was a protest. The protest is in the history books. What the protest felt like — the specific noise of that night, the sense that something was being decided that you had a right to contest — is not in the history books. It is in you, and you are sixty.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.karma += 3
      p.setMem('ft15AnpoLate', true)
    },
  },

  // ── LATIN AMERICA FOLLOW-THROUGHS ───────────────────────────────────────────

  {
    id: 'ft15_corralito_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('corralito_survivor') &&
      G.age >= 55 &&
      !G.mem?.ft15CorralitoLate,
    text: 'You learned something in December 2001 about where not to keep money. The lesson was expensive. The banks froze in December and by January the peso had been devalued to a third of its dollar value and the dollar deposits had been converted to pesos at the old rate and then revalued at the new rate. You understood, at the end of that arithmetic, that the savings you had built over a decade were worth a third of what they had been on December 1. You have kept money differently since then. The people who were too young to have savings in 2001 do not keep money the same way you do. This is not irrational on either side. The experience was the teacher.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft15CorralitoLate', true)
    },
  },

  {
    id: 'ft15_cacerolazos_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('arg_cacerolazos_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15CacerolazoLate,
    text: 'December 19-20, 2001. The helicopters over the Casa Rosada. De la Rúa leaving by helicopter while the square below was still full. Five presidents in twelve days. What came after was Kirchner and the recovery and the argument about what the recovery cost and whether the method was sustainable. The cacerolazos were not the end of the crisis — they were the moment the crisis became visible in a form the television could show. The crisis had been building for years. You were in the square. You were not the cause of the crisis and you were not the solution. You were the square.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.karma += 3
      p.setMem('ft15CacerolazoLate', true)
    },
  },

  {
    id: 'ft15_plano_real_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('plano_real_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15PlanoRealLate,
    text: 'The first week of stable prices. July 1994. The padeiro stopped changing the bread price between morning and afternoon. The supermarket price tag stayed the same on Tuesday as it had been on Monday. You had been shopping with mental calculations for so long — by how much will this be more expensive at the register than on the shelf — that the first week without that calculation felt wrong. Like waiting for a sound that doesn\'t come. Brazil\'s inflation rate was 2,477% in 1993. It was 22% in 1995 and continued to fall. The decade of hyperinflation taught a set of habits that outlasted the inflation. Some of those habits you still have.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.r += 2
      p.setMem('ft15PlanoRealLate', true)
    },
  },

  {
    id: 'ft15_arg_savings_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('arg_savings_destroyed') &&
      G.age >= 55 &&
      !G.mem?.ft15ArgSavingsLate,
    text: 'You rebuilt. Not to the same amount, not in the same way. The dollar account was a lesson that became a different lesson when the lesson cost everything you had. The generation that grew up after 2001 was told not to save in pesos. You were told the same thing by the generation that lived through the 1989 hyperinflation. Each generation in Argentina learns this from the previous generation\'s loss. The learning transfers. The loss also transfers — to the question of what to build, what to trust, what baseline of institutional reliability is reasonable to expect. The answer your generation arrived at is low.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 4
      p.w -= 2
      p.setMem('ft15ArgSavingsLate', true)
    },
  },

  {
    id: 'ft15_kirchner_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('kirchner_recovery_generation') &&
      G.age >= 55 &&
      !G.mem?.ft15KirchnerLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2019) {
        return 'The Kirchner decade: 2003–2015. 8% annual growth for seven years. Poverty fell from 54% to 27%. The CONADEP trials resumed. Human rights as state policy. The flip side: the INDEC statistics falsification, the inflation that was real but not officially counted, the energy subsidies that became unsustainable, the institutional damage. Argentina defaulted again in 2014 and again in 2020. The recovery was real. The recovery did not solve the structural problem. Nothing in Argentina has yet solved the structural problem.'
      }
      return 'Néstor Kirchner died in 2010. He was sixty years old. The recovery he led — GDP doubled in eight years, poverty cut in half — is the economic fact. The method — the confrontation with the IMF, the debt restructuring, the export taxes — is the argument. You lived through both the economic fact and the argument. The argument is still running.'
    },
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 4
      p.m += 3
      p.setMem('ft15KirchnerLate', true)
    },
  },

  {
    id: 'ft15_brazil_lula_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lava_jato_era') &&
      G.currentYear >= 2023 &&
      G.age >= 50 &&
      !G.mem?.ft15BrazilLulaLate,
    text: 'Operation Car Wash began in 2014. The drains of corruption it opened ran through every major party and most of the major construction companies. Dilma was impeached in 2016. Lula was imprisoned in 2018 and released in 2019 on a Supreme Court ruling and then elected president again in 2022. The corruption that Lava Jato found was real. The procedural problems in the prosecution were also real. Judge Moro, who convicted Lula, became Bolsonaro\'s justice minister. This sequence of events has not resolved into a clean lesson about what Brazilian institutions are and what they can do. The lesson is that the question is still open.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft15BrazilLulaLate', true)
    },
  },

]
