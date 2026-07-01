// events_sonder_51.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_51 = [

  {
    id: 'sonder_51_a',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51a,
    text: 'The photograph that was always on the wall is gone. You do not remember who took it down or when. The wall has a slightly different colour in that rectangle. You notice this on a random Tuesday and stand in front of it for a moment. The photograph is not lost — it is somewhere in a box. The wall has the record of how long it was there.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s51a', true) },
  },

  {
    id: 'sonder_51_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51b,
    text: 'The alarm that did not go off. You wake at the right time anyway, five minutes before it would have sounded, as if the body has its own contract with the hour. The alarm would have been unnecessary. The body did not know this when it made the arrangement.',
    choices: null,
    effect: (p) => { p.setMem('s51b', true) },
  },

  {
    id: 'sonder_51_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51c,
    text: 'The flat is the first flat that is only yours. Not a room in someone else\'s house, not shared. The key in the door. The specific silence of a space that is only yours. For a week everything in it feels provisional. Then you buy a plant and it begins to feel like a place.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s51c', true) },
  },

  {
    id: 'sonder_51_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s51d,
    text: 'The hiding place you had that no adult knew about. Not hiding from anyone in particular — a place for being alone with your thoughts before you had words for what being alone with your thoughts was for. A specific corner, a space under stairs, a particular branch in a particular tree. You were not hiding. You were simply somewhere that was yours alone.',
    choices: null,
    effect: (p) => { p.setMem('s51d', true) },
  },

  {
    id: 'sonder_51_e',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51e,
    text: 'The city has changed enough that you give directions using landmarks that no longer exist. You catch yourself doing it — the building that used to be there, the shop that was on that corner. The person you are giving directions to has no map of what used to be. You translate into the current geography, which requires holding both versions simultaneously.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51e', true) },
  },

  {
    id: 'sonder_51_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51f,
    text: 'You have become the person who knows where things are in the family. Not the eldest child necessarily — the person who retained the information. Where the documents are, the date of the insurance, the code for the storage unit. You did not apply for this role. It arrived.',
    choices: null,
    effect: (p) => { p.setMem('s51f', true) },
  },

  {
    id: 'sonder_51_g',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s51g,
    text: 'The song that was everywhere for three months when you were sixteen. You have not thought about it in years. It comes on in a shop somewhere and before you can account for it you are sixteen again in the specific way that music retrieves time — not the full memory but the texture of that period, the air of it, the particular emotional weather.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51g', true) },
  },

  {
    id: 'sonder_51_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51h,
    text: 'The project that is going well but does not feel like it is going well because you are inside it and cannot see the whole. Later you will see the whole and understand that this was the good period. For now it feels like effort and uncertainty and the sense that you are not doing enough, which is how the good periods often feel from inside them.',
    choices: null,
    effect: (p) => { p.setMem('s51h', true) },
  },

  {
    id: 'sonder_51_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51i,
    text: 'The conversation with your child that goes differently than you expected — they have an opinion you did not know they had, a knowledge you did not know they had acquired. You update your model of who they are. The updating is constant. The surprise of it never entirely goes away.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s51i', true) },
  },

  {
    id: 'sonder_51_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51j,
    text: 'The question you should have asked your parents when they were alive and did not ask. Not a factual question — something about what they understood, what they thought, what they wanted. The answer is unavailable now. The question has become a permanent open file.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.setMem('s51j', true) },
  },

  {
    id: 'sonder_51_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51k,
    text: 'You see your own handwriting and for a moment it looks like someone else\'s handwriting. The visual doubling: familiar and strange simultaneously. The script that your hand makes automatically that can also be looked at from outside the automaticity. You are looking at a record of what your hand does when you are not watching it.',
    choices: null,
    effect: (p) => { p.setMem('s51k', true) },
  },

  {
    id: 'sonder_51_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51l,
    text: 'The meal you know how to make without consulting anything. The sequence is in your hands before you think about it: the timing, the order, the specific moment when you add the thing you add. You learned it by watching rather than by being taught. You would have difficulty writing the recipe down, because the recipe is in your body, not in your head.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s51l', true) },
  },

  {
    id: 'sonder_51_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51m,
    text: 'The diagnosis that explains things. Not a good diagnosis, but an explanatory one — the reason for the thing that has been happening, named and categorized and given a treatment pathway. The naming is something. Before the name it was only the fact. The name does not change the fact but it changes your relationship to the fact.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51m', true) },
  },

  {
    id: 'sonder_51_n',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s51n,
    text: 'The teacher who says something to you in passing that reframes a question you have been carrying. They probably say it to many students. You receive it as if it was said specifically to you. Maybe it was. Maybe that is the skill of the good teacher — saying to the many in a way that each of the many hears as the one.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s51n', true) },
  },

  {
    id: 'sonder_51_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51o,
    text: 'You do not recognize the song that everyone knows. The moment of pretending to recognize it while looking for context clues. The specific social performance of being familiar with something you are not familiar with, which is less about dishonesty and more about not wanting to be the person who has not heard this.',
    choices: null,
    effect: (p) => { p.setMem('s51o', true) },
  },

  {
    id: 'sonder_51_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51p,
    text: 'The city in rain at night: the reflections on the wet pavement, the particular way the lights scatter, the reduced population on the street that makes it feel like a different city from the daytime city. You have come to prefer cities in rain at night for reasons you cannot fully articulate. Something about the way the rain makes the surfaces luminous and the streets less occupied.',
    choices: null,
    effect: (p) => { p.setMem('s51p', true) },
  },

  {
    id: 'sonder_51_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51q,
    text: 'The colleague who retires and is never mentioned again. They were a presence in the office for fifteen years. Their retirement party was attended. Their leaving created a small reorganization. Six months later their name comes up and people have to think for a moment before they remember. You note this. You note that you will also eventually be the person people have to think for a moment about.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51q', true) },
  },

  {
    id: 'sonder_51_r',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51r,
    text: 'The specific pleasure of being in a place you know so well that you navigate it without sight — the stairs in the dark, the path to the bathroom at 3am, the kitchen in the early morning before the light is on. The body has mapped this space. The map is accurate. The navigation happens before the awareness of navigating.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s51r', true) },
  },

  {
    id: 'sonder_51_s',
    weight: 2,
    phase: 'childhood',
    when: (G) => !G.mem?.s51s,
    text: 'The season that feels like your season. You have never thought about why. The specific light, the specific air temperature, the quality of the afternoons. You are not sure whether this is the season you were born in or the season of a particular happiness or simply the season whose sensory conditions your nervous system responds to most easily.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s51s', true) },
  },

  {
    id: 'sonder_51_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51t,
    text: 'The first time you travel alone to a city where you know no one and have no plans. The specific freedom of the first morning: the coffee in the street, no one knowing where you are, the city arranged entirely for your observation with no claims on your attention. The person you are in a city where no one knows you is a specific version of yourself.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.setMem('s51t', true) },
  },

  {
    id: 'sonder_51_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51u,
    text: 'You fix something that has been broken for months. The thing was not important. The fixing takes eight minutes. You have been moving around the broken thing for months as if it were larger than it was. You put the tool down and feel something that is disproportionate to the thing fixed.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s51u', true) },
  },

  {
    id: 'sonder_51_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51v,
    text: 'The younger person who does not know what you know because they were not there for what you were there for. You decide whether to tell them. Sometimes the telling is useful. Sometimes it is only the story of your time, which is not necessarily useful to their time. You learn to distinguish between the two, which is a skill that takes most of a life to develop.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51v', true) },
  },

  {
    id: 'sonder_51_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51w,
    text: 'The meeting cancelled at the last minute that you were not looking forward to. The surprise of relief: the afternoon suddenly free, the obligation dissolved, the work you were not doing now available to be done in a space with no one in it. You spend the afternoon doing exactly what you would have done had the meeting not been scheduled.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s51w', true) },
  },

  {
    id: 'sonder_51_x',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s51x,
    text: 'The object that is yours alone — not a particularly valuable object, simply yours. You carry it or keep it somewhere specific. If it were lost you would feel the loss before you could name what was lost. The attachment to it is not rational and is not nothing.',
    choices: null,
    effect: (p) => { p.setMem('s51x', true) },
  },

  {
    id: 'sonder_51_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51y,
    text: 'The news event that everyone around you seems to feel more strongly about than you do. You observe the strength of their feeling with some puzzlement. The event seems significant. Your feeling about it is present but calibrated differently. You wonder whether this is distance or wisdom or simply the fact that you have been watching events for long enough that fewer of them produce the magnitude of response they produced when you were younger.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s51y', true) },
  },

  {
    id: 'sonder_51_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51z,
    text: 'The voice on the phone that you would recognize anywhere. Not because you hear it often — because you heard it at the right age and it fixed. Certain voices from childhood or early life are permanent fixtures of the internal auditory landscape. The voice on the phone: you know who it is before they say.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s51z', true) },
  },

  {
    id: 'sonder_51_aa',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s51aa,
    text: 'You are assigned to do something at work that you discover you are good at without having known you were good at it. The discovery is pleasant and also slightly unnerving: what else are you good at that has not yet been presented to you as a task? The competence was waiting for the occasion.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s51aa', true) },
  },

  {
    id: 'sonder_51_ab',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s51ab,
    text: 'The specific sound of adults laughing in another room. Not seeing the joke, just hearing the laughter. The sound has a specific quality when you are not in the room — warm and separate, the adults doing something adults do that is not available to you yet. You listen from outside it. You will have access eventually. Right now you are listening to the category of things you do not yet have access to.',
    choices: null,
    effect: (p) => { p.setMem('s51ab', true) },
  },

  {
    id: 'sonder_51_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s51ac,
    text: 'The compliment that arrives out of context from someone you have not seen in years. A message, a chance encounter, a reference to something you did that you have forgotten. The person has held this for long enough to offer it. You receive it with some difficulty, which is information about your relationship to receiving.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s51ac', true) },
  },

  {
    id: 'sonder_51_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s51ad,
    text: 'The thing you carry that you have never put down: not a grief exactly, not a regret, but something that has been in the background of every year for as long as you can remember. You have become so accustomed to it that you sometimes forget it is there. Then something small reminds you and it is there, exactly as it was. It has not gotten heavier. It has also not gotten lighter. You have simply gotten used to its weight.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s51ad', true) },
  },

]
