/**
 * WORLD_EVENT_FLAGS — flags set by the world-event layer.
 */

// ─── World-event flags ────────────────────────────────────────────────────────
// Set by worldEvents.js. These were absent from the registry entirely, so
// check-flags never audited them.
export const WORLD_EVENT_FLAGS = {
  '1967_generation': { weight: 'major', category: 'historical', description: 'Came of age around 1967 — a year that reorganised several countries at once.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  asian_crisis_generation: { weight: 'major', category: 'economic', description: 'Formed by the 1997 Asian financial crisis: the currency, the queue, the family business that did not reopen.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  cricket_generation: { weight: 'moderate', category: 'cultural', description: 'Grew up with cricket as the organising public passion.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  education_denied_gender: { weight: 'major', category: 'gender', description: 'Kept out of school because of their gender.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  experienced_islamophobia: { weight: 'major', category: 'discrimination', description: 'Met the suspicion that arrived attached to a name, a scarf, a place of birth.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  hunger_childhood: { weight: 'major', category: 'adversity', description: 'Knew real hunger as a child — the physical fact, not the word.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  hyperinflation_generation: { weight: 'major', category: 'economic', description: 'Lived through money losing meaning: prices twice a day, wages that had to be spent the hour they arrived.', intent: 'year_texture', notes: 'Set by src/data/worldEvents.js.' },
  industrial_disaster_era: { weight: 'major', category: 'world_event', description: 'Present for an industrial catastrophe that the state described in a different vocabulary than the people who breathed it.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  jakarta_98_survived: { weight: 'major', category: 'world_event', description: 'Survived the May 1998 Jakarta riots.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  lived_through_pandemic: { weight: 'major', category: 'world_event', description: 'Lived through a pandemic as an adult, with the year that went missing from the middle of things.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  savings_wiped_hyperinflation: { weight: 'major', category: 'economic', description: 'Watched a lifetime of savings become unusable in months.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  sendero_generation: { weight: 'major', category: 'conflict', description: 'Grew up in Peru during the Shining Path years, between two kinds of danger.', intent: 'year_texture', notes: 'Set by src/data/worldEvents.js.' },
  sent_down_generation: { weight: 'major', category: 'historical', description: 'Sent to the countryside as a youth under a state programme.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  south_vietnamese: { weight: 'major', category: 'identity', description: 'From the South — a country that stopped existing while they were in it.', intent: 'event', notes: 'Set by src/data/worldEvents.js.' },
  voted_first_time_free: { weight: 'major', category: 'political', description: 'Cast a vote in the first election that was genuinely theirs to cast.', intent: 'year_texture', notes: 'Set by src/data/worldEvents.js.' },
  partition_generation: { weight: 'major', category: 'historical', description: 'Formed by a partition — the border that arrived through the middle of a life.', intent: 'year_texture', notes: 'Set by src/data/worldEvents.js.' },
}
