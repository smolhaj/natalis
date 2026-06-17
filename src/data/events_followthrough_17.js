// Follow-through events (BUILD — South Africa + Ukraine arc follow-throughs)
// Late-life callbacks for soweto_generation, euromaidan_generation,
// and other SA/Ukraine arc flags.

export const FOLLOWTHROUGH_17_EVENTS = [

  {
    id: 'ft17_soweto_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('soweto_generation') &&
      G.age >= 55 &&
      !G.mem?.ft17SowetoLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2016) {
        return 'June 16 is Youth Day. There is a ceremony and a speech and the schoolchildren who attend do not know anyone who was in the march. The photograph of Hector Pieterson is in the history textbooks. The children who learn from the textbooks are your grandchildren\'s age. The distance between you and the textbook is the distance between being in the thing and inheriting the image of the thing. Both exist. They are not the same.'
      }
      return 'The students who marched on June 16, 1976 are in their fifties and sixties now. You are one of them, or you watched from near enough to be one of them. The demand was specific: no Afrikaans-medium instruction. The demand was met, eventually, after six hundred deaths, in the quiet way that demands are met when a government decides not to make an announcement about meeting them. The world the marchers made possible does not know it owes them anything specifically. That is how inheritance works.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.m += 3
      p.setMem('ft17SowetoLate', true)
    },
  },

  {
    id: 'ft17_euromaidan_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('euromaidan_generation') &&
      G.age >= 40 &&
      G.currentYear >= 2022 &&
      !G.mem?.ft17EuromaidanLate,
    text: 'The Heavenly Hundred Memorial is on Instytutska Street where some of them died. The names are on it. You were in the Maidan in those weeks in 2013 and 2014 when the things that led to everything that came after were being decided in the cold and the smoke. What came after: Crimea in March 2014. Donbas in April. Eight years of a frozen conflict. February 24, 2022. The memorial was shelled in March 2022 and repaired. The chain that began in the tent city on Maidan is still the chain. You are still in it.',
    choices: [
      {
        text: 'What we did on Maidan was necessary. What came after was the price of necessary things.',
        tag: null,
        outcome: 'The price was enormous and you knew something like it was possible. The knowledge does not make the payment smaller.',
        effect: (p) => { p.karma += 5; p.r += 4; p.m += 3; p.setMem('ft17EuromaidanLate', true); },
      },
      {
        text: 'The chain from Maidan to 2022 is not a chain you would have chosen if you could have seen it.',
        tag: null,
        outcome: 'You could not have seen it. The choice you made on Maidan was made with the information of 2013. The information of 2022 was not available.',
        effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft17EuromaidanLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft17_ukraine_refugee_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ukraine_refugee_2022') &&
      G.age >= 30 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft17UkrRefugeeLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'the country you are in'
      return `You have been in ${country} since 2022. The ceasefire, if it comes, will come in conditions you cannot yet see. The reconstruction, if it comes, will take decades. The country you left is still fighting. The question of returning is not abstract: it is the specific address, the specific apartment, the specific city, and what the city looks like now versus what it looked like on February 23, 2022. You follow the news every morning. This is not a temporary arrangement anymore. This is your life.`
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.karma += 4
      p.setMem('ft17UkrRefugeeLate', true)
    },
  },

]
