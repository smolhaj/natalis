// events_social_media.js
// Social media arc — country-specific platforms, era-gated.
// Platforms: Facebook/MySpace (USA/West), VKontakte (Russia), WeChat/Weibo (China),
// KakaoTalk (Korea), MXit/WhatsApp (South Africa), Twitter/Instagram (global 2010+).
// Arc: genuine excitement → addictive phase → damage → choosing to leave or not.
// Adolescent girl damage gate: female + wealthy_west + 2012+.

// ── helpers ──────────────────────────────────────────────────────────────────

function getPlatform(G) {
  const country = G.character?.country?.name ?? ''
  const archetype = G.character?.country?.archetype ?? ''
  const yr = G.currentYear ?? 2005
  if (country === 'China') return yr < 2010 ? 'QQ' : yr < 2015 ? 'Weibo' : 'WeChat'
  if (country === 'Russia' || country === 'Ukraine' || country === 'Belarus') return 'VKontakte'
  if (country === 'South Korea') return yr >= 2010 ? 'KakaoTalk' : 'Cyworld'
  if (country === 'South Africa') return yr < 2012 ? 'MXit' : 'WhatsApp'
  if (country === 'Brazil') return yr < 2008 ? 'Orkut' : 'Facebook'
  if (country === 'India') return yr < 2010 ? 'Orkut' : 'Facebook'
  if (archetype === 'subsaharan' || archetype === 'developing_urban') return yr < 2012 ? null : 'Facebook'
  // wealthy_west / wealthy_east / post_soviet defaults
  if (yr < 2005) return 'MySpace'
  if (yr < 2010) return 'Facebook'
  if (yr < 2014) return 'Facebook'
  return yr >= 2016 ? 'Instagram' : 'Facebook'
}

export const SOCIAL_MEDIA_EVENTS = [

  // ── ARRIVAL ──────────────────────────────────────────────────────────────────

  {
    id: 'sm_arrival',
    phase: 'young_adult',
    weight: 6,
    when: (G) => {
      const yr = G.currentYear ?? 9999
      const a = G.character?.country?.archetype
      const country = G.character?.country?.name ?? ''
      const platform = getPlatform(G)
      if (!platform) return false
      if (country === 'China' && yr < 2006) return false
      if ((a === 'subsaharan' || a === 'developing_unstable') && yr < 2012) return false
      return yr >= 2003 && G.age >= 16 && G.age <= 30 && !G.mem?.smArrivalDone
    },
    text: (G) => {
      const platform = getPlatform(G) ?? 'the platform'
      const yr = G.currentYear ?? 2005
      const country = G.character?.country?.name ?? ''
      if (country === 'Russia' || country === 'Ukraine') {
        return `Everyone is on VKontakte. The profile, the photos, the music you can upload without the Western licensing restrictions. The interface is familiar in a specifically local way. It is also, in ways you do not think about yet, monitored.`
      }
      if (country === 'China') {
        return `${platform} is where the social world is now. The censorship runs underneath without announcement — certain topics simply do not appear, certain names produce no search results. You navigate around the edges of it the way you navigate other edges. The connections it enables are real.`
      }
      if (yr < 2008) {
        return `${platform} is something your friends have started using. The profile requires thinking about yourself as a summarisable object. You list things. The novelty is genuine — people you had lost track of are reachable. You do not yet know what this access will cost.`
      }
      return `You are on ${platform}. The feed is customised to show you what keeps you on the platform. You know this intellectually. It does not fully interrupt the experience of using it.`
    },
    choices: [
      {
        text: 'Engage fully — it is where things are happening',
        tag: null,
        outcome: 'The connections are real. The cost accumulates slowly.',
        effect: (p) => { p.s += 5; p.m += 4; p.addFlag('social_media_user'); p.setMem('smArrivalDone', true) },
      },
      {
        text: 'Use it minimally — the value is limited',
        tag: null,
        outcome: 'You miss some of what is shared there. You also keep certain things. You cannot fully know the balance.',
        effect: (p) => { p.m += 2; p.setMem('smArrivalDone', true) },
      },
    ],
    effect: null,
  },

  // ── ADDICTIVE PHASE ──────────────────────────────────────────────────────────

  {
    id: 'sm_addictive_phase',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.has('social_media_user') &&
      G.age >= 18 && G.age <= 35 &&
      (G.currentYear ?? 0) >= 2008 &&
      !G.mem?.smAddictPhaseDone,
    text: (G) => {
      const platform = getPlatform(G) ?? 'the platform'
      const yr = G.currentYear ?? 2010
      if (yr >= 2015) {
        return `You check ${platform} before getting out of bed. The metric — likes, shares, comments — has acquired a weight it did not have before. You are aware that you arrange real experiences partly to document them, and that this is a known problem. The awareness does not interrupt the behaviour. This is what the product is designed to produce.`
      }
      return `The platform has become the first thing in the morning. You notice the comparison dynamic — others' lives as presented versus yours as experienced. The presentation is not the life. You know this. The knowing does not prevent the comparison.`
    },
    effect: (p) => { p.m -= 5; p.addFlag('social_media_heavy_user'); p.setMem('smAddictPhaseDone', true) },
    choices: null,
  },

  // ── ADOLESCENT GIRL DAMAGE ───────────────────────────────────────────────────

  {
    id: 'sm_adolescent_girl_damage',
    phase: 'adolescence',
    weight: 7,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 13 && G.age <= 17 &&
      (G.currentYear ?? 0) >= 2012 &&
      (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east') &&
      !G.mem?.smAdolGirlDone,
    text: (G) => {
      const yr = G.currentYear ?? 2015
      const platform = yr >= 2016 ? 'Instagram' : 'Facebook'
      return `On ${platform} you exist in a particular way: photographed, rated, compared. The feedback is quantified in a way that face-to-face life is not. You know the images are curated — you curate yours — but the knowing does not prevent your body from reading the comparison as real. There is a version of yourself that the platform wants you to have opinions about constantly. You are fourteen. This is a significant amount of exposure to your own inadequacy.`
    },
    choices: [
      {
        text: 'The self-awareness is protection enough',
        tag: null,
        outcome: 'It is partial protection. You navigate it, mostly. It leaves a residue.',
        effect: (p) => { p.m -= 8; p.r += 5; p.setMem('smAdolGirlDone', true) },
      },
      {
        text: 'Delete it — or at least step back for a while',
        tag: null,
        outcome: 'The withdrawal is social as well as individual. The FOMO is real. So is the relief.',
        effect: (p) => { p.m += 5; p.e += 4; p.addFlag('social_media_stepped_back'); p.setMem('smAdolGirlDone', true) },
      },
    ],
    effect: null,
  },

  // ── ARAB SPRING / POLITICAL USE ──────────────────────────────────────────────

  {
    id: 'sm_arab_spring_organising',
    phase: 'young_adult',
    weight: 6,
    when: (G) => {
      const country = G.character?.country?.name ?? ''
      const SPRING_COUNTRIES = ['Egypt', 'Tunisia', 'Libya', 'Syria', 'Bahrain', 'Yemen', 'Jordan', 'Morocco']
      return SPRING_COUNTRIES.includes(country) &&
        (G.currentYear ?? 0) >= 2010 && (G.currentYear ?? 0) <= 2013 &&
        G.age >= 18 && G.age <= 35 &&
        !G.mem?.smArabSpringDone
    },
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const platform = country === 'Egypt' ? 'Facebook' : 'Twitter'
      return `${platform} is where the organising is happening. The government does not yet know how to shut it down. You are connected to people you have never met in person who are in the same street the same night. The platform that was used for photographs and status updates is being used for something else. The state will learn.`
    },
    choices: [
      {
        text: 'Use it to organise and connect — this is what it is for',
        tag: null,
        outcome: 'The revolution, if that is what this is, has a week of possibility. The platform enables the week. What the week becomes is another question.',
        effect: (p) => { p.m += 8; p.karma += 8; p.addFlag('arab_spring_participant'); p.addFlag('political_active'); p.setMem('smArabSpringDone', true) },
      },
      {
        text: 'Watch — the risk of visibility is real',
        tag: null,
        outcome: 'You watch. You do not appear. The state is taking screenshots. You are not in them.',
        effect: (p) => { p.m += 2; p.r += 5; p.setMem('smArabSpringDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sm_arab_spring_aftermath',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.has('arab_spring_participant') &&
      (G.currentYear ?? 0) >= 2012 && (G.currentYear ?? 0) <= 2017 &&
      !G.mem?.smArabSpringAftDone,
    text: 'The platform that enabled the revolution now enables the surveillance. The state has learned to use it. The usernames and the posts you made during the weeks of possibility are in a database you cannot audit. Certain people who were visible in the street have been found. You think about your digital footprint differently now.',
    effect: (p) => { p.m -= 8; p.addFlag('digital_surveillance_aware'); p.setMem('smArabSpringAftDone', true) },
    choices: null,
  },

  // ── CONTENT CREATOR ARC ──────────────────────────────────────────────────────

  {
    id: 'sm_content_creator_rise',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.career?.id === 'content_creator' &&
      (G.currentYear ?? 0) >= 2014 &&
      G.age >= 19 && G.age <= 32 &&
      !G.mem?.smCreatorRiseDone,
    text: (G) => {
      const platform = (G.currentYear ?? 2016) >= 2016 ? 'Instagram' : 'YouTube'
      return `The audience is real now — not just friends but strangers who have chosen to follow you. The income is also real, which is still surprising. You have figured out what performs. The gap between what performs and what you actually want to make is not large yet. It is also not zero.`
    },
    effect: (p) => { p.m += 10; p.fame += 15; p.addFlag('influencer_income'); p.setMem('smCreatorRiseDone', true) },
    choices: null,
  },

  {
    id: 'sm_algorithm_change',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'content_creator' &&
      G.flags.has('influencer_income') &&
      (G.currentYear ?? 0) >= 2018 &&
      !G.mem?.smAlgorithmDone,
    text: 'The platform changes the algorithm. Your reach drops by sixty percent in a quarter. The income follows the reach. This is not a metaphor about dependency — it is a specific event with a specific number attached. You built something on someone else\'s infrastructure and they changed the infrastructure.',
    choices: [
      {
        text: 'Diversify — build off-platform, own the relationship',
        tag: null,
        outcome: 'The transition is expensive in time and momentum. The other side of it is more stable.',
        effect: (p) => { p.e += 8; p.m -= 5; p.addFlag('platform_independent'); p.setMem('smAlgorithmDone', true) },
      },
      {
        text: 'Adapt to the new algorithm — this is the game',
        tag: null,
        outcome: 'You learn what the new version wants. Some of it you are willing to produce. Some you are not.',
        effect: (p) => { p.m += 3; p.setMem('smAlgorithmDone', true) },
      },
      {
        text: 'Step back — the platform-dependent version is too precarious',
        tag: null,
        outcome: 'You have an audience and an unclear income and an identity that is partially platform-defined. The stepping back requires building something else instead.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('smAlgorithmDone', true) },
      },
    ],
    effect: null,
  },

  // ── LEAVING OR NOT ───────────────────────────────────────────────────────────

  {
    id: 'sm_reckoning',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('social_media_heavy_user') &&
      G.age >= 32 && G.age <= 50 &&
      (G.currentYear ?? 0) >= 2016 &&
      !G.mem?.smReckoningDone,
    text: (G) => {
      const yr = G.currentYear ?? 2019
      const platform = getPlatform(G) ?? 'the platform'
      if (yr >= 2020) {
        return `The pandemic-era usage made something visible that was previously deniable: the relationship with ${platform} is not neutral. The hours, the way political content now seems designed to produce a specific kind of agitation, the specific effect on your mood at the end of a session. You are deciding whether to keep paying this price.`
      }
      return `After years on ${platform}, the costs are clearer than they were at the start: the attention captured, the comparison that is structurally engineered, the version of the world the feed is optimised to show you. You are aware of what it is now. The awareness creates a decision.`
    },
    choices: [
      {
        text: 'Delete or severely limit — the cost outweighs the value',
        tag: null,
        outcome: 'The FOMO is real for three months. Then it mostly isn\'t. The reclaimed attention accumulates into something else.',
        effect: (p) => { p.m += 10; p.e += 5; p.addFlag('left_social_media'); p.setMem('smReckoningDone', true) },
      },
      {
        text: 'Continue but with more deliberate use — the connection is worth it',
        tag: null,
        outcome: 'The deliberate use becomes the old use within two weeks. This was predictable. You still have the connections, which are real.',
        effect: (p) => { p.m += 2; p.setMem('smReckoningDone', true) },
      },
      {
        text: 'Continue — the alternative world without it is also a fiction',
        tag: null,
        outcome: 'You stay because the alternative is also uncomfortable. The discomfort distributes.',
        effect: (p) => { p.m -= 3; p.setMem('smReckoningDone', true) },
      },
    ],
    effect: null,
  },

  // ── CHINA CENSORSHIP SPECIFIC ────────────────────────────────────────────────

  {
    id: 'sm_china_censored_post',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character?.country?.name === 'China' &&
      G.age >= 18 && G.age <= 40 &&
      (G.currentYear ?? 0) >= 2010 &&
      !G.mem?.smChinaCensoredDone,
    text: 'You post something about a topic you know is sensitive. Not a political statement — something oblique, a reference, a piece of commentary. Within hours it is gone. Not blocked; simply not there, as if you did not write it. You are not sure whether it was the word itself or the combination of words. There is no notification. This is normal here.',
    choices: [
      {
        text: 'Learn the boundaries — the encoded language is its own literacy',
        tag: null,
        outcome: 'You learn to say what can be said in the way it can be said. This is its own form of expression. It is also a tax on expression.',
        effect: (p) => { p.e += 6; p.m -= 4; p.addFlag('navigates_censorship'); p.setMem('smChinaCensoredDone', true) },
      },
      {
        text: 'Move to a VPN and the foreign platforms',
        tag: null,
        outcome: 'The VPN works until the crackdown. The crackdown is periodic and unpredictable.',
        effect: (p) => { p.m += 3; p.addFlag('uses_vpn'); p.setMem('smChinaCensoredDone', true) },
      },
    ],
    effect: null,
  },

]
