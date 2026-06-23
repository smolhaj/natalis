// events_sonder_23.js
// Contemplative layer: the felt texture of ordinary life.
// Weight 2, mem-gated, no choices, no new flags.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_23 = [

  {
    id: 'sdr23_the_light_at_this_hour',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.mem?.sdr23LightAtHour,
    text: pick([
      `Late afternoon light in a room you know well. The light at this hour has a specific quality — it is almost horizontal, it catches the dust, it makes ordinary things look like evidence. You are not doing anything in particular. The light is happening.`,
      `The hour before dark in summer: the day has changed register without announcement. The heat has broken. People are on their way home. The streets are at full capacity but moving. This is the hour the city is actually itself.`,
      `The light this morning was specific — the angle that only exists in a handful of mornings per year, when the season is turning and the atmosphere has a quality that will not recur for months. You noticed it while doing something else. You kept doing the other thing.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23LightAtHour', true) },
  },

  {
    id: 'sdr23_the_borrowed_word',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr23BorrowedWord,
    text: pick([
      `There is a word in another language that does the job better than any word you have. The word is for something felt, not seen: a specific quality of longing, or the sense of time passing inside time, or the light in a place at the end of a day. Your language has a version. It is not the same word.`,
      `You pick up a phrase from someone you met briefly — the specific way they named something — and you use it. Not their intonation, not quite their meaning, but close enough. The phrase is yours now. The person it came from is someone you will not see again.`,
      `A word your grandmother used that has no translation. You know what it means when you hear it — feel it, more accurately. You cannot explain it to someone who was not there for it. The word is still in you even though it belongs to a language that may not outlast the people who speak it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23BorrowedWord', true) },
  },

  {
    id: 'sdr23_the_recurring_dream',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.sdr23RecurDream,
    text: pick([
      `The recurring dream: you are in a building that is familiar but wrong — rooms where there should be corridors, floors that don't exist in waking life, a geography that is internally consistent and completely your own. You have been visiting this building for twenty years. You know its rules. It is yours in a way no building in waking life is.`,
      `The dream you keep having about the exam, the missed departure, the unfinished something. The anxiety of the dream is specific and accurate even though the scenario is fictional. The feeling is the real thing. The scenario is just the form it found.`,
      `There is a person in your dreams who is an amalgam — a composite of several people in waking life, pressed together into one character who has no waking equivalent. You have known this person in dreams for years. If you try to describe them upon waking, they dissolve into their component faces.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23RecurDream', true) },
  },

  {
    id: 'sdr23_the_unexpected_competence',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 45 && !G.mem?.sdr23UnexpCompetence,
    text: pick([
      `Someone asks you how to do something and you know. Not theoretically — you actually know how to do it, and you walk them through it, and it works. You had not previously thought of yourself as someone who knows how to do this. You recalibrate slightly. The skill has been in you without being named.`,
      `You do something under pressure that you would have said you couldn't do. The emergency or the deadline or the no-one-else produced a version of you that managed it. Afterwards you are not sure whether to update your self-assessment or to file this under exceptional circumstances.`,
      `A child asks you to explain something — something you actually know, something you learned years ago without attaching it to any specific memory of learning — and you explain it and the child understands. You feel the specific satisfaction of knowledge that has found its use.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23UnexpCompetence', true) },
  },

  {
    id: 'sdr23_the_walk',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23TheWalk,
    text: pick([
      `The walk you take when something is unresolved. You have been taking it for years. The route changes but the function doesn't: the movement produces the thinking that sitting doesn't produce. Your best clarity about difficult things has come walking. You don't know why this works. You don't interrogate it.`,
      `Walking home after something hard and noticing the ordinary things along the way — a lit window, a child's bicycle chained to a post, a shop name in a language you half-know. The noticing is what the walk is for. Not solving. Not deciding. Just the succession of ordinary things while the hard thing settles.`,
      `You walk the same route and it has changed again. Something demolished, something opened, something repainted. The route holds all its former versions in you even as the route itself changes. You are walking through your own history as much as through the present street.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23TheWalk', true) },
  },

  {
    id: 'sdr23_the_small_celebration',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr23SmallCelebration,
    text: pick([
      `The small celebration: just the two of you, or just you, at a table with something good to eat and drink and the specific thing you wanted to acknowledge. Not the planned party. The quiet marking of a thing that mattered. These tend to be the ones you remember.`,
      `You are briefly, genuinely happy about something that is objectively small. A task completed. A letter received. A particular meal in a particular place. The happiness is proportionate to the thing, which means the proportions are working. You file this as evidence.`,
      `The birthday no one else knows about — an anniversary of something private, a date that means something only to you. You mark it in the way you mark it: a certain food, or a certain route, or simply sitting with it for a minute before the day continues.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23SmallCelebration', true) },
  },

  {
    id: 'sdr23_the_letter_unsent',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23LetterUnsent,
    text: pick([
      `You composed it entirely in your head: what you would say if you were going to say it. The person it was addressed to, the argument you would make, the thing you most needed them to understand. You did not send it. You send instead the ordinary emails you send. The composed letter exists only in you and is perfectly expressed there.`,
      `The apology you haven't made. Not because you don't think it's owed — you do — but because the timing never felt right and then more time passed and now it would require so much explanation of the delay that the apology itself might get lost. The owing remains. So does the silence.`,
      `There are things you would tell your younger self if you could. You have occasionally tried to write them down. The list gets longer and harder to finish. The problem is that the younger self wouldn't have been ready to hear it, which is why it took this long to know it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23LetterUnsent', true) },
  },

  {
    id: 'sdr23_the_shared_silence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 65 && !G.mem?.sdr23SharedSilence,
    text: pick([
      `You are sitting with someone you know well and neither of you is talking and it is fine. This took years to arrive at — the confidence that the silence is not a failure. With some people you never get there. With the right people it becomes the most honest part of the relationship.`,
      `The car ride home in silence after something that doesn't need to be discussed further — it was discussed, it is over or ongoing, and the silence is not withdrawal but saturation. The silence carries the thing that was said. You both feel it.`,
      `Two people doing separate things in the same room. This specific arrangement — parallel presence, not quite together, not quite apart — is the intimacy that only comes with time. It cannot be performed. It accumulates.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23SharedSilence', true) },
  },

  {
    id: 'sdr23_the_birthday_again',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 65 && !G.mem?.sdr23BirthdayAgain,
    text: pick([
      `The birthday arrives again. You are not sure how to feel about the number, which is bigger than the last number by the usual increment and feels larger somehow. The body has not changed overnight. The number has. The gap between these two facts is where most of the birthday exists.`,
      `People say happy birthday and you accept it and thank them and it is pleasant and also slightly beside the point. The point is not the day but the year that produced it — the specific year you have just finished living. The year doesn't get summarised by the cake.`,
      `You are older than you expected to be at this age — by which you mean: you did not expect, from the inside, to feel so continuous with earlier versions of yourself. You thought something would feel more resolved by now. The resolution is apparently not a feeling. It is, at most, a quieter version of the same questions.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23BirthdayAgain', true) },
  },

  {
    id: 'sdr23_the_object_inherited',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr23ObjectInherited,
    text: pick([
      `The object that came from them: a watch that doesn't run, or a pot with a specific dent, or a photograph in a frame you would never have chosen. The object carries a history that is not legible from looking at it. You know the history. When you are gone, the object will not.`,
      `You use the tool that was theirs. The handle is worn in the shape of their grip, not yours. When you hold it, you hold the evidence of a different hand. You use it anyway. Over time, your grip will meet theirs in the wood.`,
      `The book that has their handwriting in the margin — a word underlined, a question mark, a date. The margin notes are a conversation with a text that preceded you. The conversation is finished. You read both sides of it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23ObjectInherited', true) },
  },

  {
    id: 'sdr23_the_city_at_dawn',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.mem?.sdr23CityDawn,
    text: pick([
      `The city at four-thirty in the morning is a different city. The streets belong to different people: delivery workers, nightshift returners, the early bakeries, the lone figures whose business at this hour is their own. The ordinary city — the daytime city — is not yet here. You are walking through the interval between versions.`,
      `You are awake before the city wakes. The sounds are different: no car noise yet, only the birds (you didn't know there were birds), the occasional distant vehicle, the sound of your own footsteps amplified by the empty street. The city is briefly legible in a way it is not when full.`,
      `Dawn comes while you are still awake from the night before. The transition from artificial light to natural light happens gradually and then is suddenly complete. The night is over. The day is here. You have been present for the seam between them.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23CityDawn', true) },
  },

  {
    id: 'sdr23_the_skill_watched',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.sdr23SkillWatched,
    text: pick([
      `Someone is very good at something and you are watching them do it. The butcher making a specific cut. The welder with the arc perfect. The chef plating in the seconds before service. There is something in watching genuine competence that produces a specific attention. You are not in a hurry to look away.`,
      `The old man repairs the thing — the clock, the shoe, the engine — with movements so practised they are nearly invisible. He is not thinking about the movements. He is thinking about something else entirely, or nothing, while his hands do their decades of accumulated knowledge. You observe the whole thing without him noticing.`,
      `The musician plays the difficult passage not as though it is difficult but as though the difficulty has been dissolved by repetition into fluency. This is what practice actually produces: not perfection but invisibility. The difficulty becomes undetectable from the outside. It still exists inside.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23SkillWatched', true) },
  },

  {
    id: 'sdr23_the_interruption',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr23Interruption,
    text: pick([
      `The phone rang in the middle of the thought and the thought is now gone. You wait for it to come back. It does not come back. The thought was probably not remarkable — you have approximately 70,000 of them per day, most of them unremarkable — but the specific one that was interrupted is gone, and in its absence it feels like it might have been the one that mattered.`,
      `Someone knocks on the door at the exact moment of concentration and the concentration dissolves. You answer the door. By the time you return to the desk, the specific state of mind that had been producing has not returned with you. You attempt to reconstruct it. The reconstruction is not the same thing.`,
      `You are mid-sentence and something requires your attention. You attend to it and return. "You were saying," someone says. You were. You cannot recover what you were saying from the inside — you were in the middle of it, not observing it. The sentence does not return.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23Interruption', true) },
  },

  {
    id: 'sdr23_the_stranger_moment',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23StrangerMoment,
    text: pick([
      `The stranger on the train makes eye contact for a second longer than usual and you both look away and then there is a moment — the briefest fraction — where you could have spoken and you don't and they don't and the train arrives somewhere and one of you leaves and the moment is over as though it never occurred. Except it occurred.`,
      `An old person on the bench is watching the square with the expression of someone who has seen this square in several different configurations over several decades and is aware of this. You do not speak to them. You watch them watching. This is as close as you get to their experience. It is not very close.`,
      `The child on the path stops and looks at you with the frank assessment of someone who has not yet learned to dissemble, and you look back, and something passes between you that is simply recognition. You are both alive, at this moment, in this place. Then they run after whoever they were with and you continue.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23StrangerMoment', true) },
  },

  {
    id: 'sdr23_the_return_trip',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23ReturnTrip,
    text: pick([
      `The return trip is always different from the outward trip. You are travelling toward what you know rather than away from it. The familiar sequence — the sequence of arrivals that means you are nearly home — has a specific comfort and a specific constraint. You are nearly home. Home will require things of you again.`,
      `You return to a place you lived before and it is smaller than you remember. Not the place — the place is the same size. Your orientation to it has expanded. The place that once contained your whole world now fits inside the expanded version. This is not a loss exactly. It is a change in scale.`,
      `Coming back from somewhere feels more complete than leaving. There is more information in the return: what changed while you were gone, what didn't, what you were carrying all along that you could only see from a distance. The trip away was necessary to make the return legible.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23ReturnTrip', true) },
  },

  {
    id: 'sdr23_the_sound_of_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr23SoundHome,
    text: pick([
      `The specific acoustic signature of the place you live: the way sound moves in these streets, what you hear in the mornings, the layering of traffic and birds and neighbours and the particular hum of this neighbourhood. You know all of it without having catalogued it. It is the baseline against which silence or different sounds register as wrong.`,
      `Away from home, you hear a sound that is exactly the sound you hear at home — a specific bell, a particular engine noise, a bird call — and for a fraction of a second you are there. Then you are here. The sound was evidence of similarity between two places you hadn't known were alike.`,
      `The sounds of childhood: specific, irrecoverable. The bell on the corner that was torn down. The vendor's call that changed when the vendor changed. The dog three doors down who died. The acoustic environment of childhood is gone, except in you, where it is perfectly preserved and completely inaccessible to anyone else.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23SoundHome', true) },
  },

  {
    id: 'sdr23_the_appointment_kept',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23AppointmentKept,
    text: pick([
      `You keep the appointment you didn't want to keep. You get there and it is fine, or not fine, but either way the kept appointment is better than the avoidance would have been. The version of the thing you were dreading is almost always less bad than the anticipation. Almost always.`,
      `You are on time. This took more effort than anyone present is aware of. The effort is invisible because punctuality is invisible — the only visible version of effort around time is lateness. The timeliness is its own quiet achievement of organisation and will. No one remarks on it.`,
      `The appointment you have kept for years: the doctor, the old friend, the family call. Some appointments become ritual simply by being repeated. The repetition is the agreement. Neither party has said explicitly that you will keep doing this. Both parties behave as though you will.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23AppointmentKept', true) },
  },

  {
    id: 'sdr23_the_decade_end',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 68 && !G.mem?.sdr23DecadeEnd,
    text: pick([
      `The decade ends. This is not a fact about the calendar; it is a fact about the shape of the past ten years, which you can now see from the outside as a unit, as a thing with a beginning and a middle and an end. The view from the end of the decade is different from any view you had while inside it.`,
      `You are at the end of a decade of your life and you are summarising it, briefly, in your head. The summary is not fair to the decade. No summary is. The decade had a daily texture that the summary cannot hold. The summary is useful anyway for orientation. You know roughly what happened.`,
      `The thing that defined the decade: a single event or condition or relationship that, looking back, was the decade's primary weather. Everything else happened in relation to it. You can only see this now that you are past it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23DecadeEnd', true) },
  },

  {
    id: 'sdr23_the_news_habit',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23NewsHabit,
    text: pick([
      `You have a news habit that is not entirely healthy. You check, and the checking produces an anxious alertness that is not quite information and not quite ignorance. You know more than you want to know about things you cannot affect. You know less than you should about things close at hand.`,
      `The news is bad again. This is not a new condition — the news has been bad for as long as you have been old enough to read it — but the specific badness of today's news requires a recalibration of how you feel about the world. You recalibrate and continue. The world continues regardless.`,
      `You stop reading the news for a week, as an experiment. The world does not deteriorate notably in your absence from its reports. You return to it slightly less convinced that the monitoring is necessary, slightly more convinced that it is habitual. The habit is still the habit.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23NewsHabit', true) },
  },

  {
    id: 'sdr23_the_ordinary_tuesday',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 65 && !G.mem?.sdr23OrdinaryTuesday,
    text: pick([
      `Nothing happened today that will be remembered. The day was not a day of events but a day of the accumulation of unremarkable things: a good breakfast, some competent work, an ordinary exchange at the shop, an evening that passed without note. This is the texture of most days. Most of life is made of these. The days with events are the minority.`,
      `You did the tasks required of Tuesday and Tuesday is over. The Tuesday produced no story, no turning point, no revelation. It produced work done and a meal eaten and a conversation about nothing particular. In thirty years, if you are alive, you will not remember this Tuesday. It will still have happened.`,
      `An ordinary day in which you were briefly, specifically, present — noticed the coffee's taste, or the afternoon light, or the sound of rain — and then the day continued and the presence faded as the day's requirements reasserted themselves. The moments of presence are woven into the ordinary day but do not make the day extraordinary. They make it inhabited.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23OrdinaryTuesday', true) },
  },

  {
    id: 'sdr23_the_childhood_friend',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr23ChildhoodFriend,
    text: pick([
      `You run into a childhood friend — or more likely you see them on the internet, a photograph — and there is the shock of the face: the same face, aged, with the same underlying structure you knew at ten. You do the arithmetic. They are the same age as you. Of course they are. You are surprised anyway.`,
      `The childhood friend you lost contact with: you have occasionally thought about finding them and have not. The finding would require explaining the gap, and the gap has its own history, and the history might not survive the finding. The not-finding preserves a version of the friendship that the finding might not.`,
      `You meet the childhood friend as adults and discover you don't have much to talk about beyond the childhood. The shared past is real and the present selves are strangers. You spend an hour talking about people from then and part without making plans for another meeting, both of you understanding that this was the meeting.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23ChildhoodFriend', true) },
  },

  {
    id: 'sdr23_the_half_memory',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && G.age <= 80 && !G.mem?.sdr23HalfMemory,
    text: pick([
      `A half-memory: the image exists — a table, a face, a specific quality of light in a room — but the occasion is gone. You know it happened. You cannot place the when or the who or the why. The image floats without context. You have learned to accept these partial survivals.`,
      `You remember the feeling of a thing but not the thing. Not what was said but the specific feeling of having been seen, or dismissed, or surprised. The feeling is the remainder of an experience that left no other trace. The feeling is its own evidence.`,
      `The memory that has been there for forty years that you suddenly cannot place — is it a real memory or something you were told so many times it became one? The distinction matters but cannot be resolved. It is in you now as memory regardless of how it arrived.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23HalfMemory', true) },
  },

  {
    id: 'sdr23_the_patience',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr23Patience,
    text: pick([
      `You are more patient now than you were at thirty. This happened without a project. Somewhere the urgency that produced the impatience found less to be urgent about. The world still does not move at the right pace. You have stopped requiring it to.`,
      `You wait without needing the waiting to end. This is new. At twenty it was not available. At forty it was theoretical. At this age it is an actual state you can reliably enter: sitting with the slow thing, the delayed thing, the thing that arrives when it arrives.`,
      `The young person in front of you is impatient and you remember being exactly that impatient and you do not say so because they would not find it useful. You wait. They will learn this specific lesson themselves, the same slow way everyone learns it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23Patience', true) },
  },

  {
    id: 'sdr23_the_body_known',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr23BodyKnown,
    text: pick([
      `You know this body in the way you know old territory: where the difficult ground is, what to avoid, the paths that still work. The knowledge is not comfortable or easy. It is detailed and hard-won. You have been inside this body for sixty years and have learned its specific requirements.`,
      `The body's rhythms are known now. The times of the day when it is reliable and the times when it is not. The foods that work and the ones that have stopped working. The amount of sleep it needs. The specific signal it sends before a bad day. You have become fluent in a language of one.`,
      `Your body has lasted longer than you expected. Not indefinitely — but longer. You take this as evidence that you have done some things right, or that you are lucky, or both. The distinction matters less at this age than the fact of the lasting.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23BodyKnown', true) },
  },

  {
    id: 'sdr23_the_prayer',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr23Prayer,
    text: pick([
      `Whether or not you believe, there are moments where the only available gesture is prayer. Not because you have evidence of its efficacy. Because the thing is too large for any other response. You say the words, or have no words, and remain in the position of asking. This is not the same as believing. It is its own thing.`,
      `You find yourself doing the thing your grandmother did — making the specific gesture, saying the specific phrase — that she did when things were beyond managing. You did not think you had kept this. It arrived without invitation in the moment it was needed.`,
      `The not-quite-prayer of the person who is not sure: you direct something toward something and the directing itself is the act. Whether anything receives it is not something you can know. The act is real regardless.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23Prayer', true) },
  },

  {
    id: 'sdr23_the_afternoon',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && G.age <= 80 && !G.mem?.sdr23Afternoon,
    text: pick([
      `The afternoon that belongs to you: no appointments, no obligations, a span of hours that are yours to organise. You used to not have these. You weren't sure you wanted them. You have found that you do. The afternoon is not empty — it has reading, or walking, or the specific pleasure of doing one thing slowly. It is the luxury of pace.`,
      `At this age you can stop in the afternoon without explaining why. The explanation was required at thirty: why you were not working, why you were sitting, what you were doing with the time. The question has fallen away. The afternoon is its own justification now.`,
      `Late afternoon in the place you live: the specific quality of this hour in this season in this home. You know it so well you can hold it from the inside as a recognisable thing. The recognition is a form of gratitude, though you would not necessarily call it that.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23Afternoon', true) },
  },

  {
    id: 'sdr23_the_long_friendship',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr23LongFriendship,
    text: pick([
      `The friendship that has been there for forty years: it has survived several things that end friendships, has accommodated distance and silence and divergence and change. It does not look like the friendship it started as. It is the same friendship. The long friendships are not the same across time — they are composed of all their previous versions.`,
      `You have known this person through enough of their life to carry versions of them they may have forgotten. The person they were at twenty-five, at thirty-eight, at forty-six. You are the archive of their earlier selves. They carry corresponding versions of you.`,
      `The old friend and you don't need to catch up — you have not lost track. You simply continue from wherever you were. The friendship does not require maintenance. It requires only the understanding that you are still in it, which you are, which you both know.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23LongFriendship', true) },
  },

  {
    id: 'sdr23_the_early_morning',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 70 && !G.mem?.sdr23EarlyMorning,
    text: pick([
      `You are up before anyone else in the household. The hour is yours. The coffee is hot, the house is quiet, the day has not yet made its demands. You have arranged for this hour — consciously or through the body's own alarm — because you know what it produces. The hour produces the best version of the day's beginning.`,
      `Early morning in the market, before the city is fully awake: the vendors arranging their produce with the precision of people who have done this every day for years. The specific aesthetic of plenty before the buying begins. The arrangement is temporary and deliberate.`,
      `The world at six in the morning is running on different people than the world at noon. The early people are different in rhythm, quieter, more purposeful. You are among them at this hour. You feel, briefly, like a member of a different population.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23EarlyMorning', true) },
  },

  {
    id: 'sdr23_the_long_view',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && G.age <= 85 && !G.mem?.sdr23LongView,
    text: pick([
      `The long view, which is now available: looking back at the decade when you were thirty from sixty, you can see things that weren't visible from inside them. The decade that felt like crisis was formation. The choice that felt catastrophic turned out to be generative. The long view does not make the hard things less hard. It makes them legible.`,
      `You can see the whole shape of several relationships now — where they started, how they changed, what they were at their best and worst, how they ended or didn't. The shape requires time to become visible. You now have the time.`,
      `From here you can see the person you were at thirty-five, which seemed like the present at the time but is now clearly the past, as a person with a particular set of concerns and competencies and blind spots. The blind spots are visible now. They were the definition of blind spots then.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr23LongView', true) },
  },

]
