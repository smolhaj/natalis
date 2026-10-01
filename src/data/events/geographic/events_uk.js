// United Kingdom character events
// Miners' strike 1984–85, Poll Tax riots 1990, Good Friday Agreement 1998,
// Iraq War 2003, Brexit 2016, Grenfell Tower 2017, Windrush scandal 2018.

export const UK_EVENTS = [

  {
    id: 'uk_miners_strike_1984',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      G.age >= 14 &&
      !G.mem?.ukMiners,
    text: (G) => {
      if (G.stats?.wealth < 30 || G.ruralUrban === 'rural') {
        return 'The NUM called the strike in March. In the mining communities — in Yorkshire, in County Durham, in South Wales — the question is whether the pit stays open, and so whether the community continues to exist at all. The police buses from other forces arrive. The flying pickets. Orgreave, the footage of baton charges, the charges that are later found to have been fabricated. A year later the miners go back on the same terms they refused before. Some pits close anyway.'
      }
      return 'The miners\' strike runs for a year. Mrs Thatcher calls the NUM leadership the "enemy within." The television shows Orgreave: police lines, horses, mounted charges into the crowd. Arthur Scargill\'s face, the crowd\'s faces. The country has a strong opinion about this. Where you stand depends substantially on where you are from.'
    },
    choices: [
      {
        text: 'Your community is in the strike. You are in it with them.',
        tag: null,
        outcome: 'You stand on the picket line in winter. The defeat is also real. The community that exists after the strike is not the same community that existed before.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.age >= 16 &&
      !G.mem?.ukPollTax,
    text: (G) => 'The Community Charge — the poll tax — replaces the rates with a flat per-person levy. A duke and a dustman pay the same. The logic is that everyone who uses local services should contribute equally; the effect is to transfer the burden from property to individuals. In Scotland it is introduced a year early. ' + (G.currentYear >= 1990 ? 'On March 31, 1990, Trafalgar Square fills with 200,000 people. The riot that follows runs through central London. By November Margaret Thatcher is gone.' : 'In England the bills arrive in the spring. People are already saying they will not pay.'),
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2003 &&
      G.age >= 16 &&
      !G.mem?.ukIraq,
    text: 'A million people march through London against the war, and Parliament approves it anyway, and two weeks later the invasion begins. The weapons are not found. Then David Kelly is found dead in a wood, and there is the Hutton Report, and the Butler Report, and each report produces a different question. The conclusion reached before any of them was that the war was justified.',
    context: 'The march of 15 February 2003 was the largest protest in British history. The September 2002 dossier\'s claim that Iraq could deploy weapons within 45 minutes was later found to rest on unreliable intelligence.',
    choices: [
      {
        text: 'You were on the march. You knew the intelligence was wrong.',
        tag: null,
        outcome: 'You were right and it made no difference. This is a kind of political education.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.r += 6; p.addFlag('iraq_war_generation'); p.addFlag('political_active'); p.setMem('ukIraq', true); },
      },
      {
        text: 'You supported the war; the Saddam question mattered to you.',
        tag: null,
        outcome: 'The intelligence was fabricated and the legal case was made after the conclusion. The two things coexist in the same position.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('iraq_war_generation'); p.setMem('ukIraq', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_brexit_2016',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2016 &&
      G.age >= 16 &&
      !G.mem?.ukBrexit,
    text: 'The result comes in at four in the morning: Leave. Scotland, Northern Ireland and London voted the other way, and it does not matter. Cameron resigns before breakfast and the pound falls through the floor. The thing that was not supposed to happen has happened. The bus said £350 million a week for the NHS, and it is not going to the NHS.',
    context: 'The 23 June 2016 referendum result was 52% Leave, 48% Remain; Scotland voted 62% Remain. Sterling fell to a 31-year low against the dollar the next morning.',
    choices: [
      {
        text: 'You voted Remain. What just happened is a catastrophic error.',
        tag: null,
        outcome: 'The years of negotiations, the versions of the withdrawal agreement, the general elections: the catastrophe arrives in instalments rather than all at once.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear === 2017 &&
      G.age >= 10 &&
      !G.mem?.ukGrenfell,
    text: 'June 14, 2017, and the cladding on Grenfell Tower burns from the second floor to the twenty-fourth in under an hour, and seventy-two people die. It was council housing in the richest borough in England, and the cladding was chosen because it was a little cheaper than the one that would not have burned. The residents had complained about fire safety for years. In November 2016 their blog said only a fire with loss of life would bring change. The post is still online.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2018 && G.currentYear <= 2020 &&
      G.age >= 40 &&
      !G.mem?.ukWindrush,
    text: (G) => {
      if (G.ethnicity === 'black_british') {
        return 'You came legally, or your parents did, on the Windrush or the ships after it, thirty or forty or fifty years ago. Now the Home Office tells people like you, people you know, that they cannot prove their right to be here: jobs ended, hospital treatment refused, deportation letters. The hostile environment was meant for people without papers and had no way to tell them from people whose papers had been lost. Your landing card was destroyed by the government in 2010.'
      }
      return 'The Windrush scandal: Caribbean-born British residents — some of whom have been here for decades, who paid taxes and worked and raised children here — are being told they cannot prove their right to remain. Employers are terminating them. The NHS is denying them treatment. Some are being deported to countries they left as children. The Hostile Environment policy was described as being for illegal migrants. These people are British.'
    },
    choices: [
      {
        text: 'You are directly affected — your right to be here is suddenly being questioned.',
        tag: null,
        outcome: 'You fight it. The fighting costs time and money and a kind of humiliation. Some people do not win the fight. You eventually do, or you get far enough into it to see which way it goes.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('windrush_generation'); p.addFlag('citizenship_threatened'); p.setMem('ukWindrush', true); },
      },
      {
        text: 'You watch it happen to people in your community.',
        tag: null,
        outcome: 'The thing that happens to someone you know in the community that welcomed the Windrush generation is a calibration of the welcome.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('windrush_generation'); p.setMem('ukWindrush', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_austerity_2010s',
    phase: null,
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

  {
    id: 'uk_falklands_1982',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1982 && G.currentYear <= 1983 &&
      G.age >= 14 &&
      !G.mem?.ukFalklands,
    text: (G) => 'April 1982, and Argentina takes the Falklands, and the Task Force sails eight thousand miles south into the South Atlantic winter. The names come through on the news: Sheffield, Coventry, Ardent, and the Belgrano, sailing away from the exclusion zone when it is sunk. Seventy-four days. Then a parade, and the names of the dead on both sides.' + (G.currentYear >= 1983 ? 'A year later the war returns a 144-seat Conservative majority in June 1983. ' : 'The prime minister who looked finished in the winter looks unbeatable by the summer. ') + 'The seventy-four days reshape the decade.',
    context: 'The Falklands War killed 255 British servicemen, 649 Argentine servicemen and three islanders; 323 died on the General Belgrano.',
    choices: [
      {
        text: 'The islands are British territory. The principle of sovereignty has to mean something.',
        tag: null,
        outcome: 'The victory is complete. The Argentine forces surrender on June 14. The political consequences are also complete, and last considerably longer.',
        effect: (p) => { p.m += 4; p.addFlag('falklands_generation'); p.setMem('ukFalklands', true); },
      },
      {
        text: 'Two hundred and fifty-five lives for islands eight thousand miles away that most people couldn\'t have placed on a map six months before.',
        tag: null,
        outcome: 'The islands mattered, and the men who died mattered. The victory doesn\'t answer the question — it defers it. The politics that follow do the rest.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('falklands_generation'); p.setMem('ukFalklands', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_77_bombings_2005',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2005 && G.currentYear <= 2007 &&
      G.age >= 14 &&
      !G.mem?.uk77,
    text: 'Four bombs in the morning rush, three on the Underground and one on a bus in Tavistock Square, the morning after London won the Olympics. At first the radio says power surges. Then the bus. Then the names of the bombers, and they are from Beeston in Leeds and from Huddersfield, British, grown up here. That is the sentence that takes longest: not outsiders. From here.',
    context: 'The bombings of 7 July 2005 killed 52 people and injured more than 700.',
    choices: [
      {
        text: 'You were in London that morning — on the Underground, nearby, or someone you knew was.',
        tag: null,
        outcome: 'The morning was ordinary until it wasn\'t. The feeling of an ordinary morning becoming that kind of morning does not fully go away.',
        effect: (p) => { p.m -= 14; p.h -= 4; p.r += 6; p.addFlag('london_77_generation'); p.setMem('uk77', true); },
      },
      {
        text: 'You watched from outside London. The bombers being British is the part that takes longest.',
        tag: null,
        outcome: '"Power surges" gave way to the real picture within the hour. The British passports of the bombers gave way to a different set of questions that took longer than an hour to form.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('london_77_generation'); p.setMem('uk77', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'uk_scottish_independence_2014',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 2014 && G.currentYear <= 2016 &&
      G.age >= 16 &&
      !G.mem?.ukScottishIndy,
    text: 'September 18, 2014: "Should Scotland be an independent country?" Two years of campaigning, and three days before the vote the party leaders sign a front-page vow of more powers. Almost everybody votes. The answer is no, by ten points, and Salmond resigns, and Sturgeon takes over. Two years later Brexit asks the question again with different arithmetic.',
    context: 'The 2014 referendum had a turnout of 84.6%, the highest in any UK election; the result was 55.3% No, 44.7% Yes.',
    choices: [
      {
        text: 'You voted Yes, or you wanted Scotland to vote Yes. The question is about what kind of country Scotland could be.',
        tag: null,
        outcome: 'The 44.7 percent is the highest Yes vote recorded in any independence poll to that date. The margin is 10 points. Two years later the UK votes Leave and Scotland votes Remain by 62 percent. The question does not conclude.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('scottish_independence_generation'); p.addFlag('scottish_yes_voter'); p.setMem('ukScottishIndy', true); },
      },
      {
        text: 'You voted No, or watched it from outside Scotland. The Union holds.',
        tag: null,
        outcome: 'The Union holds. The Scotland Act 2016 delivers more devolution. "For now" is doing a lot of work in the result, and everyone knows it.',
        effect: (p) => { p.m += 3; p.addFlag('scottish_independence_generation'); p.setMem('ukScottishIndy', true); },
      },
    ],
    effect: null,
  },

]
