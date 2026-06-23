// events_journalist_arc.js — Deep journalist career arc
//
// The journalist already exists in careers.js with one event (the threat).
// These events add what the career system cannot: the first story that lands,
// the source you protect, the story you didn't write, the colleague who
// didn't come back, the late accounting of what the work was for.
//
// Gates on regime, archetype, and career ID.

const isJournalist = (G) => G.career?.id === 'journalist' || G.flags.has('journalist_career')

export const JOURNALIST_ARC_EVENTS = [

  {
    id: 'journ_first_story',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isJournalist(G) &&
      !G.mem?.journFirstStoryFired,
    text: `You have filed perhaps thirty stories. You know this because you keep a list, initially for professional reasons and then out of a habit you do not examine. Most of them were competent — the event, the attribution, the word count — and none of them has mattered in the specific way you understood journalism to matter when you decided to do it. Then one of them does. You file it and wait, as you always wait, and this time the response is different — the kind of specific response, from the specific kind of person, that tells you the information reached where it needed to reach. This is what it is supposed to feel like.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.e += 3
      p.addFlag('journalist_first_story')
      p.setMem('journFirstStoryFired', true)
    },
  },

  {
    id: 'journ_source_choice',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isJournalist(G) &&
      G.flags.has('journalist_first_story') &&
      !G.mem?.journSourceFired,
    text: `Someone gave you information. They gave it in confidence, which is a specific kind of trust — the trust that the person receiving information will protect the person who provided it even when protecting them is costly. A third party now knows the source's identity, or suspects it, and has come to you to confirm or deny. The source is at risk if you confirm. The story may not survive if you deny. You make the choice that you will make every subsequent time this happens, because once you make it the first time the position is set.`,
    choices: [
      {
        text: 'Protect the source. Say nothing.',
        tag: null,
        outcome: `You protect them. The story loses some of its corroboration. The source is not harmed. You do not speak of this as a sacrifice; it was the baseline requirement of the job.`,
        effect: (p) => {
          p.m += 5
          p.karma += 10
          p.addFlag('journalist_source_kept')
          p.setMem('journSourceFired', true)
        },
      },
      {
        text: 'Give them enough to deflect suspicion without full confirmation',
        tag: null,
        outcome: `You navigate the middle. The source suspects what you did. You tell yourself the partial disclosure was necessary. This is true and not entirely true.`,
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.setMem('journSourceFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'journ_editorial_pressure',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isJournalist(G) &&
      (G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.regime === 'single_party_communist' || G.regime === 'theocracy') &&
      !G.mem?.journEditorialFired,
    text: `The editor calls you in. There is a list, not written down anywhere, of things the publication cannot say. You have understood the list implicitly for some time, but this is the first time it has been explained to you directly, calmly, as a fact of operation. The editor is not your enemy. They are in the same position you are, one level up. You leave the meeting and file the story without the central finding, which is a skill, you are learning — filing a story that satisfies the form while removing what made it worth filing.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.addFlag('journalist_self_censored')
      p.setMem('journEditorialFired', true)
    },
  },

  {
    id: 'journ_colleague_killed',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isJournalist(G) &&
      ['conflict_zone', 'developing_unstable'].includes(G.character.country?.archetype) &&
      !G.mem?.journColleagueFired,
    text: `A colleague is killed. This is not metaphorical or professional — they were covering something and someone killed them for covering it. You were in the same place a week earlier. You will spend a specific amount of time, over the following years, revisiting the question of whether it could have been you, and what that question is actually asking. The work continues because you continue. You are not sure whether this is a professional virtue or a failure of reckoning.`,
    choices: null,
    effect: (p) => {
      p.m -= 18
      p.h -= 5
      p.addFlag('journalist_colleague_killed')
      p.setMem('journColleagueFired', true)
    },
  },

  {
    id: 'journ_the_subject_after',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isJournalist(G) &&
      G.age >= 38 &&
      !G.mem?.journSubjectFired,
    text: `You encounter someone you wrote about. Not on purpose — in a market, or at an event, or via a message through someone else. The story changed something in their life. The story was accurate; you are confident it was accurate. But accuracy and the full set of consequences are not the same, and the person standing in front of you is evidence of the consequences. You say what there is to say. There is not much. You both know that the transaction — information provided, information published, life changed — happened in a direction you determined. This does not resolve.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.e += 3
      p.addFlag('journalist_subject_encountered')
      p.setMem('journSubjectFired', true)
    },
  },

  {
    id: 'journ_the_story_not_written',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isJournalist(G) &&
      G.flags.has('journalist_self_censored') &&
      !G.mem?.journNotWrittenFired,
    text: `You know exactly which story you should have written. You know the source, the documentation, the through-line, the public significance. You know why it was not written. The reasons were real — the threat to the publication, the threat to yourself or your family, the calculation that survival mattered more than this specific story. The reasons were real. The story also was real. You carry both of these.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 10
      p.setMem('journNotWrittenFired', true)
    },
  },

  {
    id: 'journ_archive',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isJournalist(G) &&
      G.age >= 55 &&
      !G.mem?.journArchiveFired,
    text: `You read a story you wrote twenty-two years ago. The event it covers is now historical. Some of what you wrote was correct. Some of the certainties were wrong, or insufficiently uncertain. The record is permanent — digitised now, findable by anyone — and the record does not include the conversations you had with your editor about what to cut, or the phone call from the source the day after, or the thing you knew and could not prove and did not print. The record shows the article. The article is not the whole story.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 4
      p.addFlag('journalist_archive_read')
      p.setMem('journArchiveFired', true)
    },
  },

  {
    id: 'journ_colleague_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('journalist_colleague_killed') &&
      G.age >= 50 &&
      !G.mem?.journColleagueEchoFired,
    text: `The anniversary arrives without announcing itself — not the actual date but a feeling, a context, a story on the wire that puts you in the same region they were in. You did not know them as well as some. You knew them well enough. What you know with some precision is the work they were doing and why someone didn't want it covered. The story exists somewhere in archive. It didn't run in the form they were writing it. You have thought about writing it yourself. You have not. The decision to not write it is its own record.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 4
      p.setMem('journColleagueEchoFired', true)
    },
  },

  {
    id: 'journ_source_reckoning',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('journalist_source_kept') &&
      G.age >= 55 &&
      !G.mem?.journSourceEchoFired,
    text: `You hear something about them — through the industry, or a mutual contact, or the ordinary channel of a name in the news. They are well. Or they are not well. You do not know the full extent of what the decision to protect them cost the story, because you cannot know what a different decision would have produced. You know what you did and that it was the baseline requirement of the job. You have taught this to younger journalists in the specific terms it requires: not as an ethical abstraction but as a practical commitment with specific consequences that you either make or do not make.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('journSourceEchoFired', true)
    },
  },

  {
    id: 'journ_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isJournalist(G) &&
      G.age >= 62 &&
      !G.mem?.journLateFired,
    text: `What journalism does: it records, at the moment of recording, from a particular position, with particular access, for particular readers, under particular constraints. What it does not do: determine what the record will mean in thirty years, or which part of it survives, or what the subjects of the record make of it, or what the stories you couldn't write would have changed. You did the work. Some of it mattered. The gap between what you wrote and what needed to be written is the gap at the centre of the career, and it doesn't close. You stop expecting it to.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r -= 4
      p.karma += 6
      p.addFlag('journalist_late_reckoning')
      p.setMem('journLateFired', true)
      p.legacy += 8
    },
  },

]
