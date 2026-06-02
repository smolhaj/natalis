// events_conflict_childhood.js
// Events for children born in or living through active conflict zones.
// Not exploitative, not sanitized. Told from the perspective of someone
// for whom this is normal — which is the thing that is hardest to understand
// from outside and most important to render honestly.

const CONFLICT_COUNTRIES = ['Afghanistan', 'Syria', 'Somalia', 'DR Congo', 'Yemen', 'Iraq', 'Myanmar', 'South Sudan', 'Sudan', 'Mali', 'Libya']

const inConflict = (G) =>
  G.character.country.archetype === 'conflict_zone' ||
  CONFLICT_COUNTRIES.includes(G.character.country.name) ||
  (G.character.country.archetype === 'developing_unstable' && G.flags.includes('lived_through_coup'))

export const CONFLICT_CHILDHOOD_EVENTS = [

  // ── EARLY CHILDHOOD IN CONFLICT ───────────────────────────────────────────────

  {
    id: 'conf_child_sound',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => inConflict(G) && G.age >= 3 && G.age <= 5,
    text: 'There is a sound that everyone knows. When it comes, your mother picks you up without speaking and carries you to the back room or down the stairs or into the ditch at the edge of the garden. You have never been told what the sound means. You do not need to be told. You can read your mother\'s body.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('conflict_childhood'); p.addFlag('knows_the_sound') },
  },
  {
    id: 'conf_child_school_interrupted',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 4 && G.age <= 6,
    text: 'School closes in October. There is a notice sent home that says it will reopen soon. It does not reopen until March. By then the teacher has left and there is a different teacher who does not know your name. The year has a hole in it that the curriculum does not address.',
    choices: null,
    effect: (p) => { p.e -= 5; p.m -= 6; p.addFlag('conflict_childhood'); p.addFlag('interrupted_schooling') },
  },
  {
    id: 'conf_child_parent_goes_to_fight',
    phase: 'childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 5 && G.age <= 8,
    text: 'Your father leaves one morning with a bag. Your mother stands in the doorway without moving until the street is empty. He is gone for six months. Then fourteen months. The letters come irregularly and are read aloud and folded back into their envelopes. He comes back. He is the same person and also not the same person at all.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('conflict_childhood'); p.addFlag('parent_went_to_war') },
  },
  {
    id: 'conf_child_moving',
    phase: 'childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 5 && G.age <= 9,
    text: 'You have lived in three places in two years. Each time, the new place is smaller. The first apartment had a balcony. The second had no hot water. The third is one room for four people, which your mother calls temporary. You have heard this word so many times it has lost its meaning.',
    choices: null,
    effect: (p) => { p.m -= 10; p.e += 3; p.addFlag('conflict_childhood'); p.addFlag('displaced_family') },
  },
  {
    id: 'conf_child_refugee_camp',
    phase: 'childhood',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 4 && G.age <= 10,
    text: 'The camp is all you know. There are rows of structures that are not quite houses. There is a school tent. There is a queue for most things. Other children have said to you that they remember a before, a home, a room of their own. You have been here since you were two. There is no before for you to remember. This is the place.',
    choices: null,
    effect: (p) => { p.m -= 10; p.e += 4; p.addFlag('conflict_childhood'); p.addFlag('grew_up_in_camp'); p.setResidency('refugee_status') },
  },

  // ── ADOLESCENCE IN CONFLICT ───────────────────────────────────────────────────

  {
    id: 'conf_teen_recruitment',
    phase: 'adolescence',
    weight: 3,
    when: (G) => inConflict(G) && G.character.gender === 'male' && G.age >= 13 && G.age <= 17,
    text: 'Boys your age are being recruited. Not all of them are forced — some of them go because there is nothing else. A man comes to speak to your uncle. Your uncle\'s face during the conversation is the face of someone doing arithmetic. That night you are sent to a cousin in another district.',
    choices: [
      { text: 'Go to the cousin. Your family has made a decision.', tag: null, outcome: 'You go. You are safe in a way that feels like the floor dropping out.', effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('narrowly_avoided_recruitment'); p.addFlag('displaced_family') } },
      { text: 'Run away before they can send you anywhere', tag: null, outcome: 'You go in a direction you choose yourself. The freedom of this is real and the fear of this is also real.', effect: (p) => { p.m -= 15; p.e += 4; p.addFlag('fled_alone'); p.addFlag('narrowly_avoided_recruitment') } },
    ],
    effect: null,
  },
  {
    id: 'conf_teen_checkpoint',
    phase: 'adolescence',
    weight: 4,
    when: (G) => inConflict(G) && G.age >= 12 && G.age <= 17,
    text: 'There is a checkpoint. There is always a checkpoint. The soldier who decides is your age or younger. He holds your papers and looks at your face for a length of time that has no official unit of measurement. Then he hands the papers back. You walk through and do not look back and do not speed up.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('passed_checkpoint'); p.addFlag('conflict_childhood') },
  },
  {
    id: 'conf_teen_friend_joined',
    phase: 'adolescence',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 14 && G.age <= 17,
    text: 'You see him again six months later. He is in uniform. He looks older by years. You talk for a few minutes about nothing. You do not ask why he went and he does not explain. On the way home you think about the question of whether you would have done the same if your circumstances had been six degrees different.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.e += 4; p.addFlag('friend_joined_armed_group') },
  },
  {
    id: 'conf_teen_city_from_memory',
    phase: 'adolescence',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 13 && G.age <= 17 && G.flags.includes('displaced_family'),
    text: 'Your aunt describes the street where you were born. The bakery on the corner, the specific noise the trams made, the smell of petrol and jasmine in summer. You have photographs on your mother\'s phone. The photographs and the description do not match what is there now. You look at the satellite images sometimes and try to find the bakery.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 10; p.e += 5; p.addFlag('memory_of_lost_home') },
  },
  {
    id: 'conf_teen_stay_or_flee',
    phase: 'adolescence',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 15 && G.age <= 17,
    text: 'Your parents cannot leave. Your father\'s work, your mother\'s mother, the complexity of being a family in motion. A cousin has a contact who moves people across the border. You could go alone. You are fifteen. The choice is yours to make, which at fifteen feels like its own kind of violence.',
    choices: [
      { text: 'Stay. You are not going without your family.', tag: null, outcome: 'You stay. The seasons continue. You become very good at assessing risk before leaving the house.', effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('chose_to_stay'); p.addFlag('conflict_childhood') } },
      { text: 'Go. Survival is not abandonment.', tag: null, outcome: 'You go. The crossing is harder than you were told. You arrive. You call your mother from a borrowed phone.', effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('fled_alone'); p.setResidency('asylum_seeker') } },
    ],
    effect: null,
  },
  {
    id: 'conf_teen_risk_assessment',
    phase: 'adolescence',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 14 && G.age <= 17,
    text: 'Before leaving the house you check: what time is it, which street, what you are wearing, whether you look like one thing or another thing, whether there have been incidents in that direction. You do this in under thirty seconds. You have been doing it since you were twelve. Other people your age, in other places, do not do this.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 8; p.addFlag('conflict_childhood'); p.addFlag('hypervigilant') },
  },

  // ── ECONOMIC SURVIVAL ─────────────────────────────────────────────────────────

  {
    id: 'conf_econ_black_market',
    phase: 'adolescence',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 13 && G.age <= 17,
    text: 'The formal economy has largely stopped. There is work in the parallel one: running things between checkpoints, translating for people who need it, knowing who has what and where. You are good at it. It requires the same skills as the economy you will enter later, applied to different materials.',
    choices: [
      { text: 'Do the work. The family needs it.', tag: null, outcome: 'You contribute. You learn to calculate risk in specific and practical ways.', effect: (p) => { p.mo += 500; p.e += 6; p.m -= 5; p.addFlag('informal_economy_work'); p.addFlag('conflict_childhood') } },
      { text: 'Stay out of it. The risk is too unpredictable.', tag: null, outcome: 'You find other ways. The family manages.', effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('conflict_childhood') } },
    ],
    effect: null,
  },
  {
    id: 'conf_econ_aid_queue',
    phase: 'childhood',
    weight: 4,
    when: (G) => inConflict(G) && G.age >= 6 && G.age <= 14,
    text: 'The queue starts before dawn. You hold your mother\'s hand and wait. The distribution is organized by an NGO whose acronym you know by sound. When you reach the front, you receive: cooking oil, dried beans, flour, a small bar of soap. Your mother counts the items quickly. You carry the bag home and she makes dinner.',
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('conflict_childhood'); p.addFlag('received_aid') },
  },
  {
    id: 'conf_econ_selling_possessions',
    phase: 'childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 8 && G.age <= 14,
    text: 'First the jewelry — your mother\'s earrings, a gold chain from her own mother. Then the good furniture. Then the television. Each time, your parents do not discuss it in front of you, but you notice the absences. You learn very early what things are actually worth when you need what they can buy.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.e += 4; p.addFlag('conflict_childhood'); p.addFlag('food_insecurity') },
  },
  {
    id: 'conf_econ_uncle_remittance',
    phase: 'childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 6 && G.age <= 14,
    text: 'Your uncle left four years ago. He is in Germany or in Canada or in the Gulf — the geography is approximate to you. The money he sends arrives through routes that are not straightforward and involves fees that reduce it. When it arrives, the family\'s mood shifts. He is not here. His money is more present than he is.',
    choices: null,
    effect: (p) => { p.mo += 400; p.m += 5; p.r += 5; p.addFlag('conflict_childhood'); p.addFlag('remittance_family') },
  },
  {
    id: 'conf_econ_business_in_spite',
    phase: 'adolescence',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 13 && G.age <= 17,
    text: 'The man down the street opens a shop again after it was damaged. He sweeps out the glass, puts up a new sign, stocks what he can find. He opens at 7 AM. People come. You understand something about this you cannot yet put into words — about what it means to not let the damage be the last word.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('witnessed_resilience') },
  },

  // ── PSYCHOLOGICAL AND SOCIAL ───────────────────────────────────────────────────

  {
    id: 'conf_direct_violence',
    phase: 'childhood',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 7 && G.age <= 14 && !G.mem?.confDirectViolence,
    text: 'You see something you are not supposed to see — not an explosion at a distance, not a rumour, but something directly in front of you that the eye cannot edit. Your mother covers your face a moment too late. You have already seen. There is no system in a child for processing this. The image goes into a place that is not yet labelled, and stays there.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 12; p.h -= 5; p.addFlag('conflict_childhood'); p.addFlag('traumatized_by_violence'); p.setMem('confDirectViolence', true) },
  },

  {
    id: 'conf_psych_normalization',
    phase: 'childhood',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 8 && G.age <= 13,
    text: 'A bomb goes off two streets away. You count: the boom, the pause, the secondary sounds. You have learned to count them. By the time you reach three, you know approximately how close it was. You finish eating. Your mother turns the radio up slightly. There is no word in your language for what this adaptation costs.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('conflict_childhood'); p.addFlag('hypervigilant') },
  },
  {
    id: 'conf_psych_beauty_inside',
    phase: 'childhood',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 7 && G.age <= 14,
    text: 'The wedding is in the back garden. There is music on a phone with a small speaker. The women have worn what they kept from before. Your aunt dances. You have not seen anyone dance in eighteen months. The sound of it travels. A neighbor comes to the fence and watches and then climbs over to join.',
    choices: null,
    effect: (p) => { p.m += 14; p.addFlag('beauty_in_conflict'); p.addFlag('witnessed_resilience') },
  },
  {
    id: 'conf_psych_other_side',
    phase: 'adolescence',
    weight: 2,
    when: (G) => inConflict(G) && G.age >= 13 && G.age <= 17,
    text: 'You meet a boy — or a girl, or a family — from the other side of the division. The division is one you have been told about your whole life. The person in front of you has the same quality of worry in their face that you recognize from everyone around you. You do not say this out loud. You think about it for weeks.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 5; p.r += 4; p.addFlag('met_the_other_side'); p.addFlag('independent_thinker') },
  },
  {
    id: 'conf_psych_what_you_tell_outsiders',
    phase: 'adolescence',
    weight: 3,
    when: (G) => inConflict(G) && G.age >= 13 && G.age <= 17,
    text: 'When you talk to people online or meet someone at a border crossing or arrive somewhere new, you make an edit. You leave out the checkpoint story. You do not mention the specific sound. You give a version that is true but does not have the weight that the actual version carries. You are not sure if this is protection or performance.',
    choices: [
      { text: 'Keep the edit. Not everyone deserves the whole story.', tag: null, outcome: 'You learn to carry two versions of yourself. The gap between them is work you do every day.', effect: (p) => { p.m -= 5; p.r += 5; p.s += 5; p.addFlag('performs_normalcy'); p.addFlag('double_consciousness') } },
      { text: 'Tell the truth to someone who asks the right way', tag: null, outcome: 'The person who hears it sits very still. Then they ask one careful question. This is not nothing.', effect: (p) => { p.m += 6; p.r -= 3; p.addFlag('told_the_truth_once') } },
    ],
    effect: null,
  },
]
