// events_sonder_3.js — MODE C contemplative layer, third pass.
// 34 single-fire auto-resolve events in four registers:
//   AUTHORITARIAN LIFE TEXTURE — the careful life under surveillance states
//   THE LANGUAGE OF SMALL DECISIONS — the aggregate of unremarkable choices
//   MIGRATION AND DISTANCE — diaspora texture, the body in a new place
//   LATE-LIFE TEXTURE — what the day looks like when the structure is gone
// All mem-gated to fire once. Weight 2. No new flags. Minimal effects.

export const EVENTS_SONDER_3 = [

  // ──────────────────────────────────────────────────────────────────────────
  // AUTHORITARIAN LIFE TEXTURE
  // The specific quality of a life conducted under surveillance or restriction.
  // Not the dramatic event but the background radiation of it.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder3_self_censor_habit',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_selfCensor &&
      (G.regime === 'single_party_authoritarian' ||
       G.regime === 'military_dictatorship' ||
       G.regime === 'single_party_communist' ||
       G.regime === 'theocracy'),
    text: 'You notice you have paused before saying it. Not because you decided to pause — the pause just happened. The habit is deep enough now that it runs ahead of the thought. You would call this self-censorship if someone asked you. But when you are inside it, it does not feel like censorship. It feels like thinking before you speak.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s3_selfCensor', true) },
  },

  {
    id: 'sonder3_the_room_you_dont_fill',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_roomDontFill &&
      (G.regime === 'single_party_authoritarian' ||
       G.regime === 'military_dictatorship' ||
       G.regime === 'single_party_communist'),
    text: 'There are rooms you do not fill. The conversation that goes up to a point and then stops. The acquaintance you have not told about the thing you actually think. Not out of fear exactly — or not only fear — but because the habit of the partial self has been with you long enough that the partial self is more or less who you are now. The rest is private. You are not sure the rest even has language anymore.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s3_roomDontFill', true) },
  },

  {
    id: 'sonder3_queue_government_office',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_govQueue &&
      (G.character.country.archetype === 'post_soviet' ||
       G.character.country.archetype === 'developing_urban' ||
       G.character.country.archetype === 'subsaharan'),
    text: 'The government office opens at nine. The queue forms at seven. The woman in front of you has been here before — she knows which window and which form and that you need a specific stamp from a different department before this window will process you. She tells you without being asked. The system is illegible to outsiders; to people who live inside it, the knowledge of how to navigate it is a form of community.',
    choices: null,
    effect: (p) => { p.s += 1; p.setMem('s3_govQueue', true) },
  },

  {
    id: 'sonder3_the_form',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_theForm &&
      (G.residencyStatus === 'work_visa' ||
       G.residencyStatus === 'permanent_resident' ||
       G.residencyStatus === 'asylum_seeker' ||
       G.residencyStatus === 'refugee_status' ||
       G.flags.has('emigrated')),
    text: 'The form asks for things that don\'t exist in your original documentation. Date of birth is in a format your birth certificate does not use. Father\'s name in a field that your culture does not use names the way the field expects. Place of birth as a town that is in a country that no longer exists, or that has a different name now, or both. You write something that is approximately true in a format that is not yours and hope it is sufficient.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s3_theForm', true) },
  },

  {
    id: 'sonder3_news_versus_experience',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_newsVsExp &&
      (G.character.country.archetype === 'developing_unstable' ||
       G.character.country.archetype === 'conflict_zone' ||
       G.regime === 'single_party_authoritarian' ||
       G.regime === 'military_dictatorship'),
    text: 'Someone abroad has asked you what it is really like. You have tried to explain. The account you gave was true. It was also completely different from the account you carry inside — the texture of it, the smell of the particular season, the way certain conversations happen in the kitchen and different conversations happen in public. The true account is not transferable. What you gave them was the outline of it.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s3_newsVsExp', true) },
  },

  {
    id: 'sonder3_electricity_schedule',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_loadShed &&
      (G.character.country.name === 'Zimbabwe' ||
       G.character.country.name === 'Nigeria' ||
       G.character.country.name === 'Lebanon' ||
       G.character.country.name === 'Iraq' ||
       G.character.country.name === 'Pakistan' ||
       G.character.country.name === 'Nepal' ||
       G.character.country.name === 'Sri Lanka'),
    text: 'You know the load-shedding schedule. You have arranged your day around it — the cooking done before six, the charging done by nine, the work that requires a screen done in the window that is reliable. When the power is off you move to the things that don\'t require it. This adaptation is invisible to you now. You notice it only when the schedule changes without notice.',
    choices: null,
    effect: (p) => { p.setMem('s3_loadShed', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // THE LANGUAGE OF SMALL DECISIONS
  // The life built not through grand choices but through the aggregate of
  // unremarkable ones. Universal register — any archetype, any era.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder3_the_route_you_always_take',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_routeAlways && G.age >= 30,
    text: 'There is a route you always take. Not the most direct — there is some reason from years ago that made you go this way once, and then again, and now it is simply the way you go. You stopped thinking about it. You stop thinking about most of the choices that have set into habit. The habits are most of what you do in a day.',
    choices: null,
    effect: (p) => { p.setMem('s3_routeAlways', true) },
  },

  {
    id: 'sonder3_the_thing_you_no_longer_question',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_noLongerQues && G.age >= 35,
    text: 'At some point you stopped asking yourself why you do it this way. The questioning period ended and the doing period began and at some point after that you couldn\'t remember what you had originally decided and why. You are mostly fine with this. The not-questioning is how you get through the days. You save the questioning for things that still require it.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s3_noLongerQues', true) },
  },

  {
    id: 'sonder3_the_apology_you_never_made',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_apologyNever && G.age >= 38,
    text: 'There is someone you have not apologised to. The specific person, the specific thing. It was years ago — long enough that reopening it would require explaining the context, which is almost as bad as the original thing. You have thought about it in idle moments, driving or lying awake. The moment when it might have been natural to say it has passed. You carry it as a small weight, not debilitating, just present.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s3_apologyNever', true) },
  },

  {
    id: 'sonder3_the_friend_you_outgrew',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_outgrew && G.age >= 25 && G.friends?.length > 0,
    text: 'There is someone from before who would not understand the person you are now. Not because you became better — that is not quite the word — but because you became different, and the friendship was built around the particular people you both were then. You did not stop the friendship. It just has not happened for a while. Long enough that it would require explanation. You find you don\'t want to explain.',
    choices: null,
    effect: (p) => { p.setMem('s3_outgrew', true) },
  },

  {
    id: 'sonder3_the_version_you_present',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_versionPresent && G.age >= 22,
    text: 'There is the version of yourself you present and the version that is true. The gap is not dishonesty — almost everyone has this gap. The version you present is selected from the true version: accurate, incomplete, curated for the context. You are aware of the curation. You are not sure the other people are aware of theirs.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s3_versionPresent', true) },
  },

  {
    id: 'sonder3_the_career_not_taken',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_careerNotTaken && G.age >= 38 && G.career !== null,
    text: 'There was something else you might have done. You can still recall it as a possibility — the period before the choice resolved. The possibility was real. You chose this, which means you did not choose that, and for a while you lived in both timelines simultaneously. You do not live in both now. You cannot tell if what you feel is loss or just recognition.',
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('s3_careerNotTaken', true) },
  },

  {
    id: 'sonder3_the_year_you_cant_place',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_yearCantPlace && G.age >= 55,
    text: 'There is a year you cannot place. Events from the years around it are clear; the year itself has a blurred quality, as if it was the year you spent on other things. Nothing major happened, or nothing major happened to you specifically — the year that the life was happening in the background while you were attending to something else. You know it was a whole year. You cannot show your work.',
    choices: null,
    effect: (p) => { p.setMem('s3_yearCantPlace', true) },
  },

  {
    id: 'sonder3_the_object_you_still_have',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_objStillHave && G.age >= 35,
    text: 'You still have something from a long time ago that you have never needed and have never gotten rid of. Not sentimental — or not only sentimental. It has survived every move, every clearout. You lift it occasionally and put it back. There is something specific about it — the weight, the colour, the period of your life it belongs to — that makes you unable to place it in a box for charity. You suspect you will still have it in ten years.',
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('s3_objStillHave', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MIGRATION AND DISTANCE
  // The body in a new place. Language loss and language gain. The specific
  // loneliness of being from somewhere else.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder3_the_accent_you_developed',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_accentDev &&
      G.flags.has('emigrated') &&
      G.age >= 30,
    text: 'Someone from home has noticed it. They did not say it critically — or did not mean to — but there is something in your vowels that is not quite home anymore. You hear it too, now that they\'ve said it. The accent of where you are has been accumulating in your voice for years. You did not decide to do this. It happened because you were listening and speaking, which is all speaking is.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s3_accentDev', true) },
  },

  {
    id: 'sonder3_the_language_losing_ground',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_langLosing &&
      G.flags.has('emigrated') &&
      G.age >= 35,
    text: 'You have started to find the word in the wrong language. Not a full failure — it is still there, the word you want, in the language you grew up in — but the new language reaches it first and the original language has to follow. This is what language shift feels like from the inside: not catastrophic, not even unpleasant, just the quiet rearrangement of which word arrives first. You notice it with mild alarm and then life continues.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 1; p.setMem('s3_langLosing', true) },
  },

  {
    id: 'sonder3_the_food_you_cant_find',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_foodCantFind &&
      G.flags.has('emigrated'),
    text: 'There is something you cannot find here. You have found a substitute — it is adequate, occasionally good — but it is not the thing. The thing was specific: the particular sourness, the exact texture, the way it tasted on a specific occasion that no substitute recalls. You do not talk about this because it seems small. It is not small. It is one of the specific places where the distance between here and home has no bridge.',
    choices: null,
    effect: (p) => { p.r += 2; p.m -= 1; p.setMem('s3_foodCantFind', true) },
  },

  {
    id: 'sonder3_explaining_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_explHome &&
      G.flags.has('emigrated') &&
      G.age >= 20,
    text: 'You have explained where you are from so many times that you have developed a standard account. Two minutes. Maybe three. What it is called, where it is geographically, one or two things about it that the person will have heard of. The account is accurate and it is nothing like what you actually know about the place. You give the account and move on. You have stopped feeling the gap between them.',
    choices: null,
    effect: (p) => { p.setMem('s3_explHome', true) },
  },

  {
    id: 'sonder3_belonging_neither',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_belongNei &&
      G.flags.has('emigrated') &&
      G.age >= 38,
    text: 'You have been here long enough that home feels like somewhere you used to live. But you have not been here so long that here is simply home. There are moments — at a gathering, at a bureaucratic counter, at a family event where the references go past you — when you understand that you are from somewhere that is no longer fully accessible and living in somewhere you are not fully from. This is not tragedy. It is the specific geography of a life lived in more than one place.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s3_belongNei', true) },
  },

  {
    id: 'sonder3_the_phone_call_after',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_callAfter &&
      G.flags.has('emigrated') &&
      G.parents?.some(p => p.alive),
    text: 'After you hang up, the silence is specific. Not empty — it has the shape of the conversation that just ended, the voice that was just there, the time zone you were talking across. You sit with it for a moment. The person is still alive; the call went well; nothing is wrong. The silence is just the distance, asserting itself after having been briefly annulled.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s3_callAfter', true) },
  },

  {
    id: 'sonder3_diaspora_arithmetic',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_diasporaMath &&
      G.flags.has('emigrated') &&
      G.age >= 35,
    text: 'You have started doing the arithmetic. The years here versus the years there. The tipping point — when you will have lived more years in the new place than in the original one — is somewhere ahead of you, or already past. You do the calculation and then you put it down. It does not change anything. It is just a number you check occasionally, the way you check something you cannot stop checking.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s3_diasporaMath', true) },
  },

  {
    id: 'sonder3_the_stranger_who_speaks_it',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_strangerSpeaks &&
      G.flags.has('emigrated'),
    text: 'You hear it in a public space: your language, coming from a stranger. The reflex is involuntary — you turn toward it before you know why you\'re turning. The language in a stranger\'s mouth is a small piece of home in a space that is not home. You do not always speak to the person. Sometimes you just let the sound be what it is and continue walking.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s3_strangerSpeaks', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LATE-LIFE TEXTURE
  // What the day looks like when the structure is gone. The specific quality
  // of time that has opened up. Body that knows things the mind hasn't caught.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder3_the_morning_ritual_retired',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_mornRetired &&
      G.age >= 63 &&
      (G.career === null || G.flags.has('retired')),
    text: 'The alarm is not set. You wake at the same time anyway, which is its own joke. The morning has a different texture without the specific urgency of somewhere to be by a certain hour. You notice the light differently. You have time for the kind of noticing that used to happen only on holidays. This is not the retirement you imagined — it is slower and more domestic — but the light in the morning is something you had been meaning to see for years.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s3_mornRetired', true) },
  },

  {
    id: 'sonder3_the_body_informing_you',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_bodyInform && G.age >= 67,
    text: 'The body is informing you of things. Not dramatically — not in the way that requires a doctor — but in the register of small daily notices. This requires more recovery. That is not worth it tomorrow. This angle is not advisable. The body has developed opinions about the day that it did not express so clearly at forty. You are learning to hear them. Most of them are right.',
    choices: null,
    effect: (p) => { p.h -= 1; p.e += 2; p.setMem('s3_bodyInform', true) },
  },

  {
    id: 'sonder3_other_peoples_grandchildren',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_othersGrand &&
      G.age >= 65 &&
      G.children?.length === 0,
    text: 'You know several children who are not yours. The children of people you know, or the children of neighbours, or the children who are always in the square on a Saturday morning. You watch them with the particular attention of someone who has time to watch and no immediate stake. There is something pleasant about it and something adjacent to loss. You have learned not to distinguish too finely between the two.',
    choices: null,
    effect: (p) => { p.m += 1; p.r += 2; p.setMem('s3_othersGrand', true) },
  },

  {
    id: 'sonder3_the_people_who_remember',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_peoplRemem && G.age >= 70,
    text: 'The number of people who remember you as young is decreasing. Your parents, most of them. Some friends. A sibling perhaps. The people who knew you before you were finished — before the face settled into what it would be, before the personality stopped revising — are fewer than they used to be. The self-consciousness about being old is fading because the people who would have known the difference are going.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 1; p.setMem('s3_peoplRemem', true) },
  },

  {
    id: 'sonder3_the_interest_that_returned',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_interestReturn && G.age >= 62,
    text: 'You have returned to something you set down a long time ago. In your twenties, or before that. It has been there the whole time and you have not had time or energy for it — the career, the children, the other things that required the same hours. Now you have picked it up again and it is the same interest, exactly, with thirty years of deferral behind it. This is one of the things about this stage of life that nobody told you to expect.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('s3_interestReturn', true) },
  },

  {
    id: 'sonder3_at_the_funeral',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_atFuneral && G.age >= 65,
    text: 'You know more people at funerals than you used to. The proportion is different. There was a period when funerals were primarily for grandparents and elderly relatives — people who had lived long enough that the funeral, however sad, had the shape of a natural conclusion. Now the funerals include people your age. The mathematics of it have shifted. You notice this without saying anything about it.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s3_atFuneral', true) },
  },

  {
    id: 'sonder3_the_thing_you_have_more_of',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_haveMoreOf && G.age >= 65,
    text: 'You have more patience than you used to. Not unlimited — that was never true — but more. The things that used to be intolerable are merely inconvenient. The traffic, the slow person at the counter, the meeting that runs long. You do not know if this is wisdom or if you have simply been worn down to a smoother shape. Either way, you are easier to be around than you were at forty.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 1; p.setMem('s3_haveMoreOf', true) },
  },

  {
    id: 'sonder3_the_parent_in_you',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s3_parentInYou && G.age >= 45,
    text: 'You said something today in the exact cadence of your father or mother. Not consciously — it arrived in the conversation fully formed. The phrase, the intonation, the particular way the point was made. You heard it as it was leaving your mouth and there was a half-second of something: recognition, surprise, a sense of a channel open that you did not know was open. You are becoming someone\'s version of the parent.',
    choices: null,
    effect: (p) => { p.m += 1; p.r += 2; p.setMem('s3_parentInYou', true) },
  },

  {
    id: 'sonder3_the_sonder_moment',
    phase: 'midlife',
    weight: 1,
    when: (G) =>
      !G.mem?.s3_sonderMom && G.age >= 30,
    text: 'You are in a public place and you are watching someone. Not intrusively — you are just there, and they are there, and you are both doing ordinary things. For a moment you are aware that their life is as full as yours: the same density of unresolved questions, the same specific regrets, the same ordinary morning they woke into. The moment passes. You go back to your own density.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s3_sonderMom', true) },
  },

  {
    id: 'sonder3_light_from_upstairs',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      !G.mem?.s3_lightUpstair,
    text: 'A light on in the apartment above you, or across the street, late at night. Someone is awake. You do not know why — working, unable to sleep, reading, sitting with something — but the light is on and someone is in it. You notice it from where you are. You have a brief, complete sense of the person in the light without knowing anything about them. Then you go back to whatever you were doing.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s3_lightUpstair', true) },
  },

]
