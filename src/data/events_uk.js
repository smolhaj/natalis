// United Kingdom character events
// Miners' strike 1984–85, Poll Tax riots 1990, Good Friday Agreement 1998,
// Iraq War 2003, Brexit 2016, Grenfell Tower 2017, Windrush scandal 2018.

export const UK_EVENTS = [

  {
    id: 'uk_miners_strike_1984',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      G.age >= 14 &&
      !G.mem?.ukMiners,
    text: (G) => {
      if (G.stats?.wealth < 30 || G.ruralUrban === 'rural') {
        return 'The NUM called the strike in March. In the mining communities — in Yorkshire, in County Durham, in South Wales — this is not an industrial dispute. It is a question of whether the pit stays open, which is the question of whether the community continues to exist in the form it exists now. The police buses from other forces arrive. The flying pickets. Orgreave, the footage of baton charges, the charges that are later found to have been fabricated. A year later the miners go back on the same terms they refused before. Some pits close anyway.'
      }
      return 'The miners\' strike runs for a year. Mrs Thatcher calls the NUM leadership the "enemy within." The television shows Orgreave: police lines, horses, mounted charges into the crowd. Arthur Scargill\'s face, the crowd\'s faces. The country has a strong opinion about this. Where you stand depends substantially on where you are from.'
    },
    choices: [
      {
        text: 'Your community is in the strike. You are in it with them.',
        tag: null,
        outcome: 'You stand on the picket line in winter. The solidarity is real. The defeat is also real. The community that exists after the strike is not the same community that existed before.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 6; p.addFlag('miners_strike_generation'); p.addFlag('class_politics_formed'); p.setMem('ukMiners', true); },
      },
      {
        text: 'You think the strike is misguided and support the government\'s position.',
        tag: null,
        outcome: 'The pits the government said it would keep open were closed within ten years anyway. Whether the strike\'s strategy was wrong and the government\'s position was dishonest are not mutually exclusive.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('miners_strike_generation'); p.setMem('ukMiners', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_poll_tax_1990',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.age >= 16 &&
      !G.mem?.ukPollTax,
    text: 'The Community Charge — the poll tax — replaces the rates with a flat per-person levy. A duke and a dustman pay the same. The logic is that everyone who uses local services should contribute equally; the effect is to transfer the burden from property to individuals. In Scotland it is introduced a year early. On March 31, 1990, Trafalgar Square fills with 200,000 people. The riot that follows runs through central London. Margaret Thatcher will be gone by November.',
    choices: [
      {
        text: 'You refuse to pay — non-compliance is the only response.',
        tag: null,
        outcome: 'You are one of millions who do not pay. The law is administratively impossible to enforce at this scale. The tax is repealed in 1991.',
        effect: (p) => { p.m -= 3; p.karma += 5; p.r += 3; p.addFlag('poll_tax_generation'); p.setMem('ukPollTax', true); },
      },
      {
        text: 'You pay and grumble. Compliance is easier than the alternative.',
        tag: null,
        outcome: 'You pay. Enough people don\'t pay that the tax is effectively defeated anyway. Your compliance and their non-compliance produce the same result.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('poll_tax_generation'); p.setMem('ukPollTax', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_iraq_war_2003',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2003 &&
      G.age >= 16 &&
      !G.mem?.ukIraq,
    text: 'February 15, 2003. One million people march through London — the largest protest in British history. The evidence for weapons of mass destruction: the dossier, the "45-minute claim," the intelligence that was later understood to have been selected rather than assessed. Parliament approves the war. Two weeks later the invasion begins. The weapons are not found. David Kelly dies. Andrew Gilligan. The Hutton Report. The Butler Report. Each report produces a different question. The conclusion that was reached before the inquiry is that the war was justified.',
    choices: [
      {
        text: 'You were on the march. You knew the intelligence was wrong.',
        tag: null,
        outcome: 'You were right and it made no difference. This is a specific kind of political education.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.r += 6; p.addFlag('iraq_war_generation'); p.addFlag('political_active'); p.setMem('ukIraq', true); },
      },
      {
        text: 'You supported the war — the Saddam question was real.',
        tag: null,
        outcome: 'The Saddam question was real. The intelligence was fabricated and the legal case was made after the conclusion. The two things coexist in the same position.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('iraq_war_generation'); p.setMem('ukIraq', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_brexit_2016',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2016 &&
      G.age >= 16 &&
      !G.mem?.ukBrexit,
    text: 'June 23, 2016. The result comes in at 4am: 52 percent Leave, 48 percent Remain. Scotland voted 62 percent Remain. Northern Ireland voted Remain. London voted Remain. England and Wales voted Leave. Cameron resigns before breakfast. The pound falls to its lowest level in thirty-one years. The thing that was not supposed to happen has happened. Both campaigns had told stories that were not entirely accurate. The story that said £350 million per week for the NHS was on the bus. It is not going to the NHS.',
    choices: [
      {
        text: 'You voted Remain. What just happened is a catastrophic error.',
        tag: null,
        outcome: 'The years of negotiations, the versions of the withdrawal agreement, the general elections: the catastrophe arrives in instalments rather than all at once, which is its own kind of catastrophe.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('brexit_generation'); p.addFlag('remain_voter'); p.setMem('ukBrexit', true); },
      },
      {
        text: 'You voted Leave. The country has made a decision about its sovereignty.',
        tag: null,
        outcome: 'The decision was made. What comes after it — the negotiating position, the deal, the economy in the years following — is the accounting of whether the decision was what the vote was told it was.',
        effect: (p) => { p.m += 4; p.r += 4; p.addFlag('brexit_generation'); p.addFlag('leave_voter'); p.setMem('ukBrexit', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_grenfell_2017',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2017 &&
      G.age >= 10 &&
      !G.mem?.ukGrenfell,
    text: 'June 14, 2017. The cladding on Grenfell Tower in Kensington burns from the second floor to the twenty-fourth in under an hour. Seventy-two people are killed. The tower is public housing in the wealthiest borough in England. The cladding that spread the fire was cheaper and more flammable than an alternative that cost £2 more per panel. Residents had complained about fire safety for years. The Grenfell Action Group had posted, in November 2016: "Only an incident that results in loss of life will bring about change." Their words are still on the internet.',
    choices: [
      {
        text: 'You knew people in the tower, or you live nearby.',
        tag: null,
        outcome: 'The tower is visible from where you are. It is still there, wrapped in white, for years afterwards.',
        effect: (p) => { p.m -= 12; p.h -= 4; p.r += 6; p.addFlag('grenfell_generation'); p.setMem('ukGrenfell', true); },
      },
      {
        text: 'You follow it from a distance, and the rage doesn\'t go away.',
        tag: null,
        outcome: 'The inquiry lasts years. The cladding companies continue. The residents who predicted it are in the record. The record exists.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('grenfell_generation'); p.setMem('ukGrenfell', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_windrush_scandal_2018',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2018 && G.currentYear <= 2020 &&
      G.age >= 40 &&
      !G.mem?.ukWindrush,
    text: (G) => {
      if (['afro_caribbean', 'black_british', 'west_indian'].includes(G.ethnicity)) {
        return 'You arrived legally, or your parents arrived legally, on the Windrush generation ships and those that followed. You have been in this country for thirty, forty, fifty years. The Home Office is now telling people — people like you, people you know — that they cannot prove their right to be here. Employment terminated. NHS treatment denied. Deportation notices. The Hostile Environment policy was designed to make life difficult for undocumented migrants; it has no mechanism for distinguishing between undocumented and documented once the documentation was lost. Your landing card was destroyed by the government in 2010.'
      }
      return 'The Windrush scandal: Caribbean-born British residents — some of whom have been here for decades, who paid taxes and worked and raised children here — are being told they cannot prove their right to remain. Employers are terminating them. The NHS is denying them treatment. Some are being deported to countries they left as children. The Hostile Environment policy was described as being for illegal migrants. These people are not illegal migrants. They are British.'
    },
    choices: [
      {
        text: 'You are directly affected — your right to be here is suddenly being questioned.',
        tag: null,
        outcome: 'You fight it. The fighting costs time and money and a specific kind of humiliation. Some people do not win the fight. You eventually do, or you get far enough into it to see which way it goes.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('windrush_generation'); p.addFlag('citizenship_threatened'); p.setMem('ukWindrush', true); },
      },
      {
        text: 'You watch it happen to people in your community.',
        tag: null,
        outcome: 'The thing that happens to someone you know in the community that welcomed the Windrush generation is a specific calibration of the welcome.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('windrush_generation'); p.setMem('ukWindrush', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_austerity_2010s',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2010 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      (G.stats?.wealth ?? 50) < 45 &&
      !G.mem?.ukAusterity,
    text: 'The coalition government announces austerity in 2010: the deficit reduction programme, the cuts to public services, the bedroom tax, Universal Credit. The rhetoric is deficit reduction and long-term economic plan. The people who experience it are the people who depend on those public services. The food bank network expands. The NHS waiting lists lengthen. The phrase "there is no alternative" is the phrase that Mrs Thatcher used in a different context. The same phrase in a new context does not produce the same analysis as the previous time.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.w -= 4
      p.addFlag('austerity_generation')
      p.setMem('ukAusterity', true)
    },
  },

]
