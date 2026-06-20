/**
 * HEALTH_FLAGS — health flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const HEALTH_FLAGS = {

  widowed: {
    weight: 'major',
    category: 'loss',
    description: 'Partner has died. The character is now alone after a shared life.',
    intent: 'both',
    timestamped: true,
    notes: 'buildYearTexture accesses coverage via mem.widowedYear timestamp (not F.has), so script shows it as partial. Coverage IS present — mem.widowedYear gates year-0, year 1-3, year 4-5 prose paths. F.has in generateIdentityCard. Partner_died flag gates additional grief prose. Reasonably covered.',
  },

  divorced: {
    weight: 'major',
    category: 'loss',
    description: 'Character\'s marriage ended in divorce.',
    intent: 'both',
    timestamped: true,
    notes: 'Has year texture path (post-crisis). Could use more long-term texture at 5yr/10yr.',
  },

  lost_friend: {
    weight: 'major',
    category: 'loss',
    description: 'A significant friend has died.',
    intent: 'both',
    timestamped: true,
    notes: 'Has memory layer entry and old-photo followthrough event.',
  },

  bereaved: {
    weight: 'major',
    category: 'loss',
    description: 'General bereavement flag — set alongside specific loss flags for any significant death.',
    intent: 'year_texture',
    notes: 'Set very frequently. buildYearTexture uses more specific flags (lost_parent, partner_died, lost_child) for prose rather than this generic flag. Ribbon present. Real year texture coverage is indirect — this flag deserves its own buildYearTexture path for cases where only bereaved is set.',
  },

  lost_parent: {
    weight: 'major',
    category: 'loss',
    description: 'A parent has died — set by parent care arc and grief events.',
    intent: 'both',
    notes: 'Set by events_parent_care.js (killParent + addFlag) and events_grief.js. Has year texture, memory layer via parentDeathYear in mem. killParent() also marks parent.alive=false directly. Well covered.',
  },

  lost_parent_young: {
    weight: 'major',
    category: 'loss',
    description: 'A parent died while the character was a child — the specific orphaned-early experience.',
    intent: 'both',
    notes: 'Set in events.js early parent death event. Distinct from adult parent loss; needs its own year texture path.',
  },

  lost_child: {
    weight: 'major',
    category: 'loss',
    description: 'A child of the character has died.',
    intent: 'both',
    notes: 'Has year texture (3 lines in buildYearTexture). No dedicated follow-through event covering the years after. Partnership impact missing.',
  },

  lost_sibling: {
    weight: 'major',
    category: 'loss',
    description: 'A sibling has died.',
    intent: 'both',
    notes: 'Sibling events cover the death itself. No year texture path for the years after.',
  },

  experienced_miscarriage: {
    weight: 'major',
    category: 'loss',
    description: 'Character (or partner) experienced a miscarriage.',
    intent: 'both',
    notes: 'Set in events_fertility.js (first and second trimester variants). No year texture path or midlife echo. High priority gap.',
  },

  multiple_miscarriage: {
    weight: 'major',
    category: 'loss',
    description: 'Character (or partner) has experienced repeated miscarriages — the compounding grief.',
    intent: 'both',
    notes: 'Set in events_fertility.js late miscarriage events. No year texture or midlife echo. High priority gap.',
  },

  cancer_survivor: {
    weight: 'major',
    category: 'loss',
    description: 'Character survived cancer — the body and relationship to mortality have changed.',
    intent: 'both',
    timestamped: true,
    notes: 'Has scan callback event and memory layer. Reasonably covered.',
  },

  lost_mentor: {
    weight: 'moderate',
    category: 'loss',
    description: 'The character\'s significant mentor has died.',
    intent: 'year_texture',
    notes: 'Mentor arc has an echo event (men_mentor_echo). Year texture path exists.',
  },

  grief_drinking: {
    weight: 'moderate',
    category: 'loss',
    description: 'Character turned to alcohol following a bereavement.',
    intent: 'year_texture',
    notes: 'Set in grief events. Checked nowhere — clear orphan.',
  },

  earthquake_family_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Character lost family members in the 2010 Haiti earthquake — learned by the phone calls that never connected.',
    intent: 'both',
    notes: 'Set by hai_diaspora_earthquake_call (lost_family path).',
  },

  ebola_survivor: {
    weight: 'moderate',
    category: 'health',
    description: 'Lived through the 2014–2016 Ebola epidemic in West Africa — the quarantine lines, the fear of touching the sick, the neighbors who did not recover.',
    intent: 'both',
    notes: 'Set by worldEvents.js Ebola world event for West Africa. Year texture prose for aftermath; health anxiety; survivor guilt.',
  },

  lost_someone_opioids: {
    weight: 'major',
    category: 'grief',
    description: 'Lost someone to an opioid overdose — the phone call, the grief with the texture of prevention that was not available.',
    intent: 'year_texture',
    notes: 'Set by usa_opioid_crisis (lost-someone choice).',
  },

  nsu_mourned: {
    weight: 'moderate',
    category: 'grief',
    description: 'Personally connected to one of the NSU murder victims — knew the family, or knew someone who did.',
    intent: 'none',
    notes: 'Set by ger_nsu_murders_2011 (direct connection choice). No downstream event.',
  },

  born_with_disability: {
    weight: 'major',
    category: 'health',
    description: 'Born with a physical disability — the body has always been this way. All planning, opportunity, and texture is shaped by this from the start.',
    intent: 'year_texture',
    notes: 'Trigger flag. Set at birth roll or via conflict_childhood events. Gates full disability arc.',
  },

  born_deaf: {
    weight: 'major',
    category: 'health',
    description: 'Born Deaf — hearing is not available; Deaf identity and community may or may not be.',
    intent: 'year_texture',
    notes: 'Trigger flag. Gates full Deaf arc including cochlear implant debate.',
  },

  cochlear_implant: {
    weight: 'major',
    category: 'health',
    description: 'Received a cochlear implant — a contested technology within Deaf culture: access vs. cure framing.',
    intent: 'year_texture',
    notes: 'Set by dis_cochlear_implant (accept choice). Produces specific Deaf community tension.',
  },

  disability_acquired: {
    weight: 'major',
    category: 'health',
    description: 'Disability acquired mid-life through accident, illness, or injury — the body changed and the self must reorganise around the change.',
    intent: 'year_texture',
    notes: 'Trigger flag. Set by accident events or specific illness events. Gates acquired disability arc.',
  },

  drug_addiction: {
    weight: 'major',
    category: 'health',
    description: 'Developed drug addiction — the compulsion has crossed from use into dependency.',
    intent: 'year_texture',
    notes: 'Set by add_first_use (problem choice) or add_recreational_slide. Gates full addiction arc.',
  },

  alcohol_addiction: {
    weight: 'major',
    category: 'health',
    description: 'Developed alcohol addiction — the most socially invisible of the substance dependencies.',
    intent: 'year_texture',
    notes: 'Set by add_first_use or add_recreational_slide (alcohol branch). Gates addiction arc.',
  },

  addiction_recreational: {
    weight: 'minor',
    category: 'health',
    description: 'Using recreationally — not yet dependency, but the pattern is forming.',
    intent: 'none',
    notes: 'Set by add_first_use (keep it light choice). Gates add_recreational_slide.',
  },

  died_of_overdose: {
    weight: 'major',
    category: 'death',
    description: 'Died of overdose — the second one.',
    intent: 'none',
    notes: 'Set by add_overdose_death. Requires addiction_spiral + addiction_overdose_survived + !in_recovery.',
  },

  recovery_relapse: {
    weight: 'moderate',
    category: 'health',
    description: 'Relapsed after a period of recovery — the relapse part of the disease, not the end of recovery.',
    intent: 'year_texture',
    notes: 'Set by add_relapse.',
  },

  trauma_responses: {
    weight: 'moderate',
    category: 'health',
    description: 'Body carries trauma responses — a loud noise, a uniform, the wrong eye contact. Not PTSD as diagnosis, but as lived texture.',
    intent: 'year_texture',
    notes: 'Set by cs_civilian_difficulty and other trauma arc events.',
  },

  ww1_shell_shock: {
    weight: 'major',
    category: 'health',
    description: 'Diagnosed with shell shock — the hands that shake, the sounds that return in sleep, returned to the line anyway.',
    intent: 'year_texture',
    notes: 'Set by ww1_shell_shock event. Adds shell_shock condition moderate.',
  },

  flu_1918_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Lost someone in the household to the 1918 influenza — grief without ceremony because ceremony would require gathering.',
    intent: 'year_texture',
    notes: 'Set by flu_1918_household (household dies choice).',
  },

  dementia_personal: {
    weight: 'major',
    category: 'health',
    description: 'Developing dementia — the words behind the usual place, the street driven past for eleven years.',
    intent: 'year_texture',
    notes: 'Set by dem_first_signs_personal. Age 68+. Adds dementia condition.',
  },

  dementia_diagnosed_early: {
    weight: 'moderate',
    category: 'health',
    description: 'Dementia diagnosed early — time to make decisions while still able to make them.',
    intent: 'year_texture',
    notes: 'Set by dem_first_signs_personal (go to doctor choice).',
  },

  dementia_parent_forgot_me: {
    weight: 'major',
    category: 'grief',
    description: 'The parent looked at you and didn\'t know you — the polite look, the nod that wasn\'t recognition.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_doesnt_know_you.',
  },

  dementia_parent_late_stage: {
    weight: 'major',
    category: 'grief',
    description: 'Parent in late-stage dementia — the face still familiar, most of what made it specific gone.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_late_stage event.',
  },

  dementia_grief_resolved: {
    weight: 'moderate',
    category: 'grief',
    description: 'Grief after dementia resolved — the staged mourning already done, the final death at the end of a long goodbye.',
    intent: 'none',
    notes: 'Set by dem_after_loss.',
  },

  lost_child_infant: {
    weight: 'major',
    category: 'loss',
    description: 'A child died in infancy (under 2 years old) — the specific grief of a person measured in weeks, and all that was going to happen and did not.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by child_death_infant. Branches the year texture and late-life reckoning from lost_child.',
  },

  child_death_told_others: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who has told new people in their life about the loss — learned to carry it in conversation.',
    intent: 'year_texture',
    notes: 'Set by child_death_telling_people.',
  },

  child_death_room_kept: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who kept the child\'s room as it was — a held space.',
    intent: 'year_texture',
    notes: 'Set by child_death_room_decision (kept choice).',
  },

  child_death_room_repurposed: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who slowly changed the child\'s room — the room becomes something else without erasing what it was.',
    intent: 'year_texture',
    notes: 'Set by child_death_room_decision (changed choice).',
  },

  child_death_tried_again: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who chose to try for another child after the loss.',
    intent: 'year_texture',
    notes: 'Set by child_death_try_again (try choice).',
  },

  child_death_decided_not_again: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who decided not to try again after losing a child.',
    intent: 'year_texture',
    notes: 'Set by child_death_try_again (not choice).',
  },

  bereaved_parent_marriage_survived: {
    weight: 'major',
    category: 'loss',
    description: 'A bereaved parent\'s marriage survived the death of a child — statistically improbable, personally hard-won.',
    intent: 'year_texture',
    notes: 'Set by child_death_marriage_reflection. Branches the late year texture.',
  },

  child_death_late_reckoned: {
    weight: 'major',
    category: 'loss',
    description: 'Bereaved parent who has done the late-life reckoning about who their child would have been — the person they constructed from what they knew.',
    intent: 'year_texture',
    notes: 'Set by child_death_late_reckoning. Branches buildYearTexture for late_life.',
  },

  pandemic_death_without_goodbye: {
    weight: 'major',
    category: 'loss',
    description: 'Lost a parent during COVID-19 without being allowed in the room — the specific rule the specific shape of the loss.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pan_death_without_goodbye / pan_death_without_goodbye_late.',
  },

  camp_boiro_family_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Someone close disappeared into Camp Boiro and did not return — officially died of "illness," no body, no date.',
    intent: 'year_texture',
    notes: 'Set by gn_camp_boiro (lost branch). Deep grief flag; year-texture prose.',
  },

  manages_chronic_condition: {
    weight: 'moderate',
    category: 'health',
    description: 'Living with a managed chronic condition — not crisis, but permanent infrastructure: the medication, the avoidances, the calendar of check-ups.',
    intent: 'event',
    notes: 'Set by events_illness.js and events_condition_arc.js. Checked by ft24_manages_chronic_texture.',
  },

  vision_impaired: {
    weight: 'moderate',
    category: 'health',
    description: 'Experiencing significant vision loss — living in a smaller perceptual radius, adapting through memory and other senses.',
    intent: 'event',
    notes: 'Set by events_late_life.js. Checked by ft24_vision_impaired_adapts.',
  },

  aw_burnout_break: {
    weight: 'moderate',
    category: 'health',
    description: 'Took leave from humanitarian work due to compassion fatigue — the switch that does not turn fully on.',
    intent: 'none',
    notes: 'Set by aw_burnout first choice.',
  },

  aids_generation_witness: {
    weight: 'moderate',
    category: 'grief',
    description: 'Part of the generation that witnessed the AIDS epidemic as a community catastrophe — the funerals, the silence, the improvised care infrastructure.',
    intent: 'year_texture',
    notes: 'Set by sl_us_aids_gen. Distinct from AIDS personal diagnosis.',
  },

  childhood_disability: {
    weight: 'moderate',
    category: 'health',
    description: 'Acquired or lived with a significant disability from childhood — the architecture of education and public life built around what they could not do.',
    intent: 'year_texture',
    notes: 'Set by sl_polio_survivor_1950s. Distinct from born_with_disability (acquired) and born_deaf.',
  },

  hiv_positive_managed: {
    weight: 'moderate',
    category: 'health',
    description: 'Living with HIV on antiretroviral treatment — the virus suppressed, the management ongoing, the window of the pharmaceutical negotiation still visible in retrospect.',
    intent: 'year_texture',
    notes: 'Set by sl_hiv_africa_treatment. Pairs with hiv_managed condition.',
  },

  witnessed_extreme_witness: {
    weight: 'moderate',
    category: 'grief',
    description: 'Received news of self-immolation or comparable extreme political witness — the information carried through a diaspora network with no adequate frame for it.',
    intent: 'none',
    notes: 'Set by sl_tibetan_self_immolation_witness.',
  },

  gacaca_witness: {
    weight: 'major',
    category: 'grief',
    description: 'Sat in a gacaca community court listening to a perpetrator confess the detail of what they did to someone you knew — the state\'s version of justice in open air, and not yet knowing if it is better or worse than not knowing.',
    intent: 'year_texture',
    notes: 'Set by sl_rwanda_gacaca_witness.',
  },

  tsunami_survivor: {
    weight: 'major',
    category: 'grief',
    description: 'Survived the 2004 Indian Ocean tsunami — the specific morning, the specific house, the specific absence of the specific people who were in it; the number that is so large it becomes a number before you finish counting.',
    intent: 'event',
    notes: 'Set by sl_aceh_tsunami_2004. Follow-through: sl_aceh_tsunami_reconstruction.',
  },

  witnessed_ethnic_cleansing: {
    weight: 'major',
    category: 'grief',
    description: 'Witnessed an ethnic cleansing through the diaspora network — the forty-kilometre convoy, the cars abandoned, an entire population crossing a border in three days.',
    intent: 'year_texture',
    notes: 'Set by sl_karabakh_exodus_2023.',
  },

}
