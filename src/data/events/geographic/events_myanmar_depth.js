// events_myanmar_depth.js
// Myanmar depth: the ethnic minority civil wars (Karen/KNU — the world's
// longest civil war since 1948), jade miners in Hpakant's Kachin hills,
// the 1990 election the junta annulled, censored media and VCR culture,
// the Spring Revolution civilian resistance (2021), and the CDM doctor
// who chose not to work under the military.
//
// Companion to events_myanmar.js (Ne Win's isolation, 8888, SLORC,
// Saffron Revolution, Cyclone Nargis, civilian opening 2011, coup 2021).

const IS_MYANMAR = (G) => G.character.country?.name === 'Myanmar'
const IS_ETHNIC_MINORITY = (G) =>
  G.character.country?.name === 'Myanmar' &&
  (G.character.ethnicity === 'karen' || G.character.ethnicity === 'kachin' ||
   G.character.ethnicity === 'shan' || G.character.ethnicity === 'chin' ||
   G.character.ethnicity === 'karenni' || G.character.ethnicity === 'mon' ||
   G.character.ethnicity === 'rakhine')

export const MYANMAR_DEPTH_EVENTS = [

  // ── THE ETHNIC CIVIL WAR (KAREN/KNU PERSPECTIVE) ──────────────────────────

  {
    id: 'mya_dep_ethnic_civil_war',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_ETHNIC_MINORITY(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.myaDepEthnicWar,
    text: `The Karen National Union has been fighting the Burmese army since 1949. This is the world's longest civil war by most counts, which is a fact that sounds like a record and is actually a way of describing how unresolved the question of what Burma is has been since the British drew lines that made one country out of many peoples. In the hills along the Thailand border, in the villages that change hands between the army and the KNU, the war is not a historical fact: it is the sound of artillery in the next valley and the calculation of which road to take. Your childhood has this as its background texture. You learned early which sounds mean what and what the column of smoke in the hills means and which authority currently controls the road to the market.`,
    choices: [
      {
        text: 'Your family has been displaced before. You have learned to pack what matters fast.',
        tag: null,
        outcome: 'The knowledge of what to pack and what to leave is a kind of knowledge that marks a childhood. You carry it into adult life where it is rarely needed and never fully set aside.',
        effect: (p) => {
          p.m -= 8
          p.r += 5
          p.e += 2
          p.addFlag('mya_dep_ethnic_minority_war')
          p.addFlag('displaced')
          p.setMem('myaDepEthnicWar', true)
        },
      },
      {
        text: 'Your village has stayed out of it, so far. The balance is maintained through specific arrangements.',
        tag: null,
        outcome: 'The arrangements hold for now. "For now" is the operative term in a civil war that has been ongoing since before you were born.',
        effect: (p) => {
          p.m -= 4
          p.r += 3
          p.e += 2
          p.addFlag('mya_dep_ethnic_minority_war')
          p.setMem('myaDepEthnicWar', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE 1990 ELECTION ─────────────────────────────────────────────────────

  {
    id: 'mya_dep_1990_election',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.myaDep1990Election,
    text: `May 27, 1990: the National League for Democracy wins 80 percent of the seats in the parliamentary election. The SLORC had expected to win. They had designed the election as a controlled demonstration of popularity. The population voted as populations sometimes do: for the party that had spent two years demonstrating that it represented what they wanted rather than what they feared. The SLORC annulled the results, arrested the NLD leaders, and kept Aung San Suu Kyi under house arrest. The world's largest ignored election result became a set of names and a grievance that was still active thirty years later. You voted. You watched what happened to the vote.`,
    choices: [
      {
        text: 'You voted NLD. You watched what was done with the result.',
        tag: null,
        outcome: 'The vote was real. The result was real. The junta\'s response was also real, and the three realities existed simultaneously, producing the specific condition of a country that voted for something and was not permitted to have it.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.addFlag('mya_dep_1990_generation')
          p.setMem('myaDep1990Election', true)
        },
      },
      {
        text: 'You did not vote. In this country, at this time, casting a ballot was its own kind of risk.',
        tag: null,
        outcome: 'The SLORC recorded who voted and in some cases what they voted. The caution was reasonable. The eighty percent who chose differently than you chose also had reasons.',
        effect: (p) => {
          p.m -= 4
          p.r += 4
          p.addFlag('mya_dep_1990_generation')
          p.setMem('myaDep1990Election', true)
        },
      },
    ],
    effect: null,
  },

  // ── JADE MINER IN HPAKANT ─────────────────────────────────────────────────

  {
    id: 'mya_dep_jade_miner',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.myaDepJadeMiner,
    text: `Hpakant in Kachin State produces most of the world's jadeite — the highest-quality jade, worth more than gold, the primary raw material for the Chinese luxury market. The miners who dig for it are overwhelmingly young men from ethnic minority communities who came to Hpakant for wages the countryside could not provide. The digging happens in the debris piles left by the giant excavators — *khabang* miners, working the tailings. Heroin and methamphetamine run through the camp because the camp is in the Golden Triangle and because the work is brutal and the wages are enough to fund a habit but not enough to leave. The military holds concession rights to the best seams. The transparency report by Global Witness estimates $31 billion in jade moved out of Hpakant annually, most of which did not pass through any tax register.`,
    choices: [
      {
        text: 'You work the khabang. The wages are real, even if the conditions are what they are.',
        tag: null,
        outcome: 'The jade you found this season was worth more than your wage. The buyer who set the wage also set the price. Both were set before you arrived.',
        effect: (p) => {
          p.mo += 400
          p.h -= 8
          p.addFlag('mya_dep_jade_generation')
          p.setMem('myaDepJadeMiner', true)
        },
      },
      {
        text: 'You leave before the habit takes hold. Someone you know did not leave in time.',
        tag: null,
        outcome: 'Hpakant has a specific rate of things that happen to the people who stay too long. You left before your name was in that rate. The person who didn\'t is still in it.',
        effect: (p) => {
          p.h -= 2
          p.r += 4
          p.karma += 3
          p.addFlag('mya_dep_jade_generation')
          p.setMem('myaDepJadeMiner', true)
        },
      },
    ],
    effect: null,
  },

  // ── CENSORED MEDIA AND VCR CULTURE ────────────────────────────────────────

  {
    id: 'mya_dep_vcr_culture',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 12 && G.age <= 25 &&
      !G.mem?.myaDepVcr,
    text: `The Press Scrutiny and Registration Division reviewed every publication before it was printed and every film before it was shown. The approved films were approved films. What was not approved was available anyway, through the channels that censorship always generates: the VCR, the copied tape, the video parlour with the curtain over the door. Jackie Chan. Bollywood. The kung fu film where everyone dies. The world outside Burma arrived on magnetic tape in a plastic case, copies of copies, the colour degraded from the third generation of dubbing, the subtitles in Burmese handwritten and photographed onto the tape. You watched the world through this format and formed your picture of it accordingly. The picture was incomplete in specific ways that shaped what you expected when you eventually encountered the original.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.m += 2
      p.addFlag('mya_dep_censorship_generation')
      p.setMem('myaDepVcr', true)
    },
  },

  // ── CHIN MOUNTAIN LIFE ────────────────────────────────────────────────────

  {
    id: 'mya_dep_chin_hills',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.character.ethnicity === 'chin' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.myaDepChin,
    text: `The Chin Hills are among the most isolated terrain in Asia — ridges and valleys that rise to two thousand metres, where the road becomes a track and the track becomes a path and the path is the only route between villages. The Chin people were converted to Christianity in the late colonial period by American Baptist missionaries and are now among the most Christian populations in Myanmar — which the Buddhist Burman centre has never fully accepted as part of its national project. The isolation of the hills meant the Chin were largely left alone by both the colonial administration and the post-independence state, which was not protection exactly but was a kind of friction that slowed the intrusion. The nearest market was a day's walk. The nearest town was two days. The world arrived slowly, partially, and without announcing which parts of it were coming.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.r += 2
      p.addFlag('mya_dep_chin_hills')
      p.setMem('myaDepChin', true)
    },
  },

  // ── SPRING REVOLUTION CIVILIAN RESISTANCE (2021) ──────────────────────────

  {
    id: 'mya_dep_spring_revolution',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.currentYear >= 2021 && G.currentYear <= 2024 &&
      G.age >= 18 && G.age <= 40 &&
      G.flags.has('myanmar_coup_2021') &&
      !G.mem?.myaDepSpring,
    text: `The Spring Revolution: the name given to the civilian resistance to the February 2021 coup. The Civil Disobedience Movement took doctors, teachers, civil servants out of the junta's institutions. People who had never been politically active were making Molotov cocktails in their kitchens in Yangon. The People's Defence Force — the armed wing of the National Unity Government — started operating in the forests and the townships. The junta responded with airstrikes on villages, mass arrests, torture in detention, the specific violence of a military that is killing its own population and using the language of anti-terrorism to describe the killing. The internet is cut. The currency collapses. The military is losing to people with hunting rifles in forests it does not know.`,
    choices: [
      {
        text: 'You are in the CDM. You refuse to work for the junta\'s government.',
        tag: null,
        outcome: 'The CDM costs you your salary and your official status and the specific danger of being on a list. What it gives you is a different kind of standing in the country you are still in, held by the people who are still holding it.',
        effect: (p) => {
          p.mo -= 500
          p.karma += 8
          p.m += 4
          p.addFlag('myanmar_cdm_participant')
          p.addFlag('mya_dep_spring_revolution')
          p.setMem('myaDepSpring', true)
        },
      },
      {
        text: 'You leave. The country is not winnable by the people trying to win it from inside it.',
        tag: null,
        outcome: 'You join the diaspora in Thailand or India or further. The NUG operates from exile. You work from there. The distinction between outside and inside has never been less stable.',
        effect: (p) => {
          p.r += 6
          p.m -= 4
          p.addFlag('mya_dep_spring_revolution')
          p.addFlag('emigrated')
          p.setResidency('refugee_status')
          p.setMem('myaDepSpring', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: 1990 GENERATION IN THE 2021 COUP ─────────────────────

  {
    id: 'mya_dep_1990_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.flags.has('mya_dep_1990_generation') &&
      G.currentYear >= 2021 &&
      G.age >= 45 &&
      !G.mem?.myaDep1990Echo,
    text: `In 2021, thirty-one years after the election that was not honoured, the military took power again. For the generation that voted in 1990, the coup had a specific quality: the recognition of a pattern already known, the specific grief of a thing returning that you thought you had survived. The people in the streets in 2021 were young enough to have no memory of 1988 or 1990. You had memory of both. The memory did not make the third time easier. It made it more precise.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 5
      p.setMem('myaDep1990Echo', true)
    },
  },

  // ── FOLLOW-THROUGH: ETHNIC MINORITY WAR IN LATE LIFE ─────────────────────

  {
    id: 'mya_dep_ethnic_war_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_MYANMAR(G) &&
      G.flags.has('mya_dep_ethnic_minority_war') &&
      G.age >= 58 &&
      !G.mem?.myaDepEthnicWarLate,
    text: `The civil war that was the background texture of your childhood is still ongoing. The specific armed groups have changed names and compositions and alliances. The Tatmadaw that was fighting the KNU in your childhood is the same Tatmadaw that launched the 2021 coup and is now fighting the Chin National Front and the People's Defence Force in addition to the existing ethnic armies. The war that has always been several wars simultaneously is now more wars than it was. The world's longest civil war has not found its ending. You are old enough to have outlived several ceasefires.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.setMem('myaDepEthnicWarLate', true)
    },
  },

]
