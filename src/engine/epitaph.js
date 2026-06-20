import { FlagSet, getPhase } from './character'
import { buildG } from './tick'
import { getCountryDisplayName } from '../utils/countryUtils'

// ─── Living identity card ─────────────────────────────────────────────────────
// 4 sentences in two pairs: exterior (place/era/situation) + interior (wound/desire).
// Displayed in the Stats tab, regenerated each year.
export function generateIdentityCard(state) {
  const F = new FlagSet(state.flags ?? [])
  const { age, partner, children, career, education, desire } = state
  const G = buildG(state)
  const country = G.currentCountry ?? state.character?.country
  const birthCountry = state.character?.country
  const phase = getPhase(age)

  const exterior = [] // 2 sentences: objective, observable
  const interior = [] // 2 sentences: subjective, formative

  // ── EXTERIOR 1: Age + place + occupation ─────────────────────────────────────
  const place = country?.name ?? 'somewhere'
  const occupationPhrase = (() => {
    if (state.inPrison) return null // handled in exterior 2
    if (career) return `working as a ${career.title}`
    if (state.retired) return 'retired'
    if (education?.enrolled) return 'studying'
    if (phase === 'early_childhood' || phase === 'childhood') return 'still a child'
    if (phase === 'adolescence') return 'a teenager'
    if (state.workStatus === 'informal') return 'working informally'
    return null
  })()
  exterior.push(
    occupationPhrase
      ? `You are ${age}, living in ${place}, ${occupationPhrase}.`
      : `You are ${age} and living in ${place}.`
  )

  // ── EXTERIOR 2: Current situation ────────────────────────────────────────────
  if (state.inPrison) {
    exterior.push('You are in prison.')
  } else if (state.wanted || F.has('escaped_prisoner')) {
    exterior.push('You are wanted. Every introduction carries risk.')
  } else if (G.residencyStatus === 'undocumented' || G.residencyStatus === 'refugee_status') {
    exterior.push('You are living without secure papers — present without permission.')
  } else if (F.has('climate_displaced')) {
    exterior.push('You have been displaced by the changing climate, still looking for where this life lands.')
  } else if (partner?.married) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are married to ${partner.name} and have ${c === 1 ? 'a child' : `${c} children`}.`
      : `You are married to ${partner.name}.`)
  } else if (partner) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are with ${partner.name} and have ${c === 1 ? 'a child' : `${c} children`}.`
      : `You are with ${partner.name}.`)
  } else if (F.has('widowed') || F.has('partner_died')) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are widowed, raising ${c === 1 ? 'a child' : `${c} children`}.`
      : 'You are widowed.')
  } else if (F.has('divorced')) {
    exterior.push('You are divorced.')
  } else if ((children ?? []).length > 0) {
    exterior.push(`You are a single parent with ${children.length === 1 ? 'one child' : `${children.length} children`}.`)
  } else if (F.has('emigrated') && birthCountry && country && birthCountry.name !== country.name) {
    const yrs = Math.max(0, G.currentYear - (G.currentYear - (G.yearsAbroad ?? 1)))
    exterior.push(`You moved here from ${birthCountry.name}.`)
  }

  // ── INTERIOR 1: The dominant formative fact ───────────────────────────────────
  const interiorFact = (() => {
    // Extreme survivals first
    if (F.has('holocaust_survived') || F.has('genocide_survived') || F.has('survived_khmer_rouge')) return 'You have survived things that most people only read about in the past tense.'
    if (F.has('gulag_survived')) return 'You survived the camps. That knowledge lives in your body.'
    if (F.has('lost_child')) return 'You lost a child. That does not become a past thing.'
    if (F.has('child_illness_chronic')) return age >= 55 ? 'Your child has lived with a serious condition their whole life. You have been alongside it — not in front of it, not behind it. Alongside.' : 'Your child is seriously ill. Life reorganizes itself around that. Everything else continues from somewhere else inside you.'
    if (F.has('child_seriously_ill') && !F.has('child_illness_recovery') && !F.has('child_illness_chronic')) return 'Your child is seriously ill. You are managing an impossible equation of care, cost, presence, and fear. You are doing it anyway.'
    if (F.has('partition_survivor') || F.has('partition_refugee')) return 'You crossed the border during the Partition, carrying what you could.'
    // Heavy personal facts
    if (F.has('cancer_survivor')) return 'You are a cancer survivor. The word still sits differently than you expected.'
    if (F.has('escaped_prisoner') && !state.inPrison) return 'You escaped from prison. You still watch doors.'
    if (F.has('lgbtq_identity') || F.has('orientation_gay') || F.has('orientation_bisexual')) {
      return G.lgbtqCriminalized
        ? 'You are queer in a country where that is still not safe to name.'
        : 'Being queer is simply part of who you are. It has shaped what you notice in the world.'
    }
    if (F.has('fled_child_marriage')) return 'You refused the life that was arranged for you, and built another one from nothing.'
    if (F.has('defied_caste') && G.casteSystem) return 'You have spent your life building outside the position you were born into.'
    // Immigration / displacement
    if (F.has('emigrated') && birthCountry && country && birthCountry.name !== country.name) {
      const yrs = G.yearsAbroad ?? 0
      if (yrs >= 15) return `You left ${birthCountry.name} ${yrs} years ago. It appears in your dreams more than you expected.`
      if (yrs >= 5) return `You have been away from ${birthCountry.name} for ${yrs} years. The distance is still not neutral.`
      return `You left ${birthCountry.name} not long ago. You are still finding out what this life is.`
    }
    // Formative history
    if (F.has('communist_childhood') && G.currentYear >= 1991) return 'You grew up certain of things the world is no longer certain of.'
    if (F.has('authoritarian_childhood')) return 'You grew up in a place that taught you to read a room before you spoke in it.'
    if (F.has('experienced_racism') || F.has('double_consciousness')) return 'You have spent years navigating rooms not built with you in mind. You have learned to read the furniture.'
    if (F.has('first_gen_university')) return 'You were the first in your family to go to university. The gap that made has not fully closed.'
    if (F.has('famine_memory') || F.has('food_insecurity')) return 'You grew up knowing hunger. That knowledge changed how you relate to having enough.'
    if (F.has('war_childhood')) return 'You grew up during a conflict. The body still knows certain sounds.'
    if (F.has('abusive_relationship') && !partner) return 'You got out of something that was damaging you. That took longer than it should have.'
    // Child soldier
    if (F.has('child_soldier_late_reckoning')) return 'You were taken as a child and made into something with the name soldier. In late life you understand that the name was false. The things done were real. You carry both.'
    if (F.has('child_soldier_order_refused')) return 'You were a child given an impossible order. You refused. The refusal is yours.'
    if (F.has('child_soldier_taken')) return 'You were taken from your village as a child. What happened next is not something most people understand from the outside.'
    // WWI/Depression
    if (F.has('ww1_veteran')) return F.has('ww1_shell_shock') ? 'You came back from the trenches. The hands still shake sometimes. The army called it shell shock.' : 'You are a veteran of the Great War. Among the ones who came back.'
    if (F.has('depression_survivor') && age >= 50) return 'You lived through the Depression. The decade produced a way of being in the world that never fully left: saving everything, distrusting security.'
    // Dementia
    if (F.has('dementia_personal') && F.has('dementia_advance_plan')) return 'You are living with dementia. You made the plans while you could still make them.'
    // Disability
    if (F.has('cochlear_implant_refused')) return 'You are Deaf and chose to stay that way. The choice is yours. The community is yours.'
    if (F.has('born_deaf') && F.has('deaf_identity_claimed')) return 'You are Deaf — capital D. The identity, the language, the community. That is who you are.'
    if (F.has('born_with_disability')) return age >= 50 ? 'You have been in this body your entire life. You have arrived at something close to peace with it.' : 'You were born with a disability. The world was not built for you. You have built your own ways through it.'
    if (F.has('disability_acquired') && F.has('disability_before_after')) return 'Your life divides into before the accident and after. You live in the after.'
    // Recovery
    if (F.has('recovery_long_term')) return 'You fought an addiction and have been winning for a long time. The compulsion is background now, not foreground.'
    if (F.has('in_recovery')) return 'You are in recovery. One day, and then the next one.'
    // Korea / China specific
    if (F.has('gwangju_witness')) return 'You were alive in May 1980. The paratroopers in Gwangju. What the state is capable of is not an abstraction for you.'
    if (F.has('sent_down_returned')) return 'You are part of the sent-down generation — the decade of rural labour instead of education. The gap is permanent.'
    if (F.has('class_enemy_family') && age >= 40) return 'You grew up carrying a family classification that shaped what every door was willing to offer you.'
    // Gifted arc resolution
    if (F.has('gift_realized')) return 'Your gift found its fullest expression. The work exists and will outlast you. You know this.'
    if (F.has('gift_extraordinary')) return 'You reached the extraordinary ceiling of what you were born to do. The work exists. It outlasts the making of it.'
    if (F.has('gift_fulfilled')) return 'Your gift found a path. You are still deciding what that path cost.'
    if (F.has('gift_wasted') && age >= 40) return 'You know exactly what you were made for. The world had other arrangements.'
    if (F.has('gift_suppressed') && !F.has('gift_rekindled') && !F.has('gift_wasted')) return 'You carry a gift the world never got to see properly. It has shaped what you notice anyway.'
    if (F.has('gift_rekindled') && !F.has('gift_fulfilled')) return 'You came to the thing you were made for late and sideways. That turns out to be a kind of path too.'
    if ((F.has('born_gifted_intellectual') || F.has('born_gifted_musical') || F.has('born_gifted_athletic') || F.has('born_gifted_artistic') || F.has('born_gifted_linguistic')) && !F.has('gift_recognized') && phase === 'childhood') return 'Something in you is arranged differently from most people. The world hasn\'t quite noticed yet.'
    return null
  })()
  if (interiorFact) interior.push(interiorFact)

  // ── INTERIOR 2: Desire / wound / something quietly earned ────────────────────
  const desireMap = {
    prove_worth: 'There is still a part of you that needs to be seen as capable — even now, even after everything.',
    belong: 'You have spent much of your life looking for the room where you finally fit.',
    be_seen: 'You want to matter — to someone, somewhere. This has shaped more decisions than you admit.',
    safety: 'You make decisions the way someone does who knows without doubt that things can fall apart.',
    connection: 'The thing you want most is genuine closeness. It is also what you are most careful around.',
    leave_mark: 'You are aware that you will be forgotten. You have been trying to build something that outlasts that.',
    freedom: 'You have always needed an exit. This has cost you some things and saved you others.',
    redemption: 'You are still trying to make up for something. Whether that is even necessary is a different question.',
  }

  if (desire && desireMap[desire]) {
    interior.push(desireMap[desire])
  } else {
    // Fallback: earned insight from flags
    if (F.has('lost_faith') || F.has('apostasy')) {
      interior.push('You left your faith behind. The shape it occupied is still there.')
    } else if (F.has('faith_deepened') || F.has('religion_returned')) {
      interior.push('Your faith has become more important, not less, as you have gotten older.')
    } else if (F.has('went_to_therapy') || F.has('therapy_veteran')) {
      interior.push('You have done the work of looking at yourself honestly. That is not nothing.')
    } else if (F.has('is_mentor') || F.has('mentor')) {
      interior.push("You have been someone's first real break. You remember what that felt like.")
    } else if (F.has('long_marriage') || (partner?.married && (partner?.years ?? 0) > 20)) {
      interior.push('You have been married for a long time. That is its own kind of work.')
    } else if (F.has('career_fulfilled') && career) {
      interior.push("The work is genuinely good. You don't say that often, but you know it.")
    } else if (F.has('philanthropist')) {
      interior.push('You give money away deliberately. This is not accidental.')
    } else if (F.has('in_recovery') || F.has('addiction_recovered')) {
      interior.push('You got sober. Holding that is still the most important thing you do each day.')
    }
  }

  // ── INTERIOR 3: Relationship quality insight ─────────────────────────────────
  if (interior.length < 3) {
    if (partner) {
      const q = partner.relationshipQuality ?? 60
      const pn = partner.name.split(' ')[0]
      if (q > 85 && (partner.years ?? 0) > 10) {
        interior.push(`What you have built with ${pn} is the kind of thing people mean when they say they got lucky.`)
      } else if (q < 32 && partner.married) {
        interior.push(`You and ${pn} are still married. That fact is more complicated than it sounds.`)
      }
    } else if ((children ?? []).length > 0) {
      const closeChild = (children ?? []).find(c => c.age >= 16 && (c.relationshipQuality ?? 50) > 82)
      if (closeChild) interior.push(`${closeChild.name.split(' ')[0]} is someone you genuinely like. That is not automatic between parents and children.`)
    }
  }

  // ── INTERIOR 4: Weight — regret translated to prose ───────────────────────
  const regret = state.regret ?? 0
  if (interior.length < 4) {
    const weightLine = (() => {
      if (regret > 70) return 'The accumulation of what you carry shapes how you hold yourself.'
      if (regret > 50) return 'The weight of certain decisions has not diminished the way you expected it to.'
      if (regret > 30) return 'You carry more than you planned to. Some of it you can name.'
      if (regret > 15) return 'There are one or two things you would do differently, given another run at them.'
      return null
    })()
    if (weightLine) interior.push(weightLine)
  }

  const all = [...exterior, ...interior].filter(Boolean)
  // Cap at 6 sentences so the card doesn't become a wall
  return all.length >= 2 ? all.slice(0, 6).join(' ') : null
}

// ─── Epitaph generator ───────────────────────────────────────────────────────

export function generateEpitaph(state) {
  const { character, flags, stats, regret, age, children, partner, career, money } = state
  const name = character.firstName
  const He = character.gender === 'male' ? 'He' : 'She'
  const he = He.toLowerCase()
  const His = character.gender === 'male' ? 'His' : 'Her'
  const his = His.toLowerCase()
  const him = character.gender === 'male' ? 'him' : 'her'
  const country = character.country.name
  const birthCountryName = getCountryDisplayName(character.country, character.birthYear)
  const { fame, assets, siblings } = state

  const f = (flag) => flags.includes(flag)
  const any = (...fs) => fs.some(g => flags.includes(g))

  const bornIn = birthCountryName !== country
    ? `${birthCountryName} (now ${country})`
    : country

  // Paragraphs accumulate as string arrays; joined with double newline at end
  const para1 = [] // origin + childhood
  const para2 = [] // historical witness + displacement (the heavy weight)
  const para3 = [] // dark path, work, ethics, identity
  const para4 = [] // relationships, family, grief
  const para5 = [] // close

  // ── PARAGRAPH 1: Origin ──────────────────────────────────────────────────────
  if (age < 20) {
    para1.push(`${name} was born in ${bornIn} and was gone at ${age} — a life that barely had time to begin.`)
  } else if (age < 40) {
    para1.push(`${name} was born in ${bornIn} and died at ${age}, too soon.`)
  } else {
    para1.push(`${name} was born in ${bornIn} and lived to ${age}.`)
  }

  // Childhood texture — weave related facts together
  const hadHardChildhood = any('war_childhood', 'conflict_zone_birth', 'poverty_childhood', 'food_insecurity', 'lost_parent_young', 'orphaned')
  const hadWarmChildhood = f('secure_childhood')
  if (any('war_childhood', 'conflict_zone_birth')) {
    para1.push(`The first years were shaped by conflict before ${he} had language for it.`)
  } else if (any('lost_parent_young', 'orphaned')) {
    if (any('poverty_childhood', 'food_insecurity')) {
      para1.push(`A parent was gone before there was a clear memory of them, and the early years were lean.`)
    } else {
      para1.push(`A parent was gone before there was a clear memory of them — a founding absence.`)
    }
  } else if (any('poverty_childhood', 'food_insecurity')) {
    para1.push(`The early years were lean. Hunger was part of the childhood.`)
  } else if (hadWarmChildhood) {
    para1.push(`${He} had a childhood with warmth in it — something ${he} would spend the rest of ${his} life trying to pass on.`)
  }

  if (f('water_walk_childhood')) {
    para1.push(`For years, ${he} carried water before school. The weight of it became part of ${his} constitution.`)
  }
  if (f('talent_discovered')) {
    para1.push(`${He} found a talent young and spent decades finding out where it led.`)
  }
  if (f('political_awareness_early')) {
    para1.push(`${He} understood early what kind of country ${he} was living in.`)
  }

  // ── PARAGRAPH 2: Historical weight + displacement ─────────────────────────────
  // The heaviest flags; only write this paragraph if something significant applies
  const heavyHistory = any(
    'genocide_survivor', 'tutsi_hidden', 'survived_khmer_rouge',
    'partition_survivor', 'partition_refugee',
    'buenos_aires_junta_era', 'tehran_revolution_witness',
    'cultural_revolution_survived', 'derg_era_survived',
    'harare_hyperinflation_lived', 'solidarity_era_lived',
    'post_apartheid_generation', 'witnessed_wall_fall',
    'ghana_independence_generation', 'nairobi_independence_generation',
    'bolivarian_collapse_lived', 'ven_2017_generation', 'ven_chavez_death_generation', 'left_junta_chile',
    'maidan_generation', 'euromaidan_lived',
    'independence_generation_self', 'beirut_blast_survived',
    'refugee', 'displaced', 'emigrated', 'diaspora',
    'arm_genocide_memory_bearer', 'arm_karabakh_veteran_1', 'arm_war_2020_loss',
    'arm_dark_winter_survivor', 'azr_karabakh_idp', 'azr_black_january_generation',
    'bel_2020_generation', 'bel_crackdown_survived', 'bel_chernobyl_generation', 'bel_exile',
    'uru_coup_1973', 'uru_dictatorship_lived', 'pry_stroessner_era', 'pry_triple_alliance_memory',
    'ecu_dollarization_generation',
    'dprk_arduous_march', 'dprk_defected', 'dprk_hostile_class', 'dprk_chosen_stay',
    'cuba_balsero', 'cub_mariel_gone', 'cub_july11_marcher', 'special_period_generation',
    'nam_herero_memory_bearer', 'nam_san_displaced',
    'laos_hmong_era', 'laos_uxo_generation',
    'sg_founding_generation', 'sg_kampung_generation', 'sg_dialect_lost', 'sg_lky_generation',
    'nl_hunger_winter_generation', 'nl_srebrenica_generation', 'nl_fortuyn_witness',
    'bra_dictatorship_generation', 'bra_resistance_generation', 'bra_favela_survived',
    'bra_carandiru_generation', 'bra_nordestino_migrant', 'bra_lava_jato_generation', 'bra_january_8_witness',
    'nga_june12_generation', 'nga_boko_haram_generation', 'nga_delta_community',
    'id_1965_stained', 'id_1965_silence_generation', 'id_tsunami_2004_survivor',
    'bng_liberation_generation', 'bng_mukti_bahini', 'bng_famine_generation', 'bng_coup_generation',
    'irq_iran_iraq_veteran', 'irq_sanctions_generation', 'irq_displacement_generation', 'irq_isis_generation',
    'rwa_rtlm_generation', 'rwa_genocide_witness', 'rwa_goma_generation',
    'col_violencia_generation', 'col_cartel_era', 'col_desplazado', 'col_paramilitary_era',
    'per_sendero_generation', 'per_sterilization_survivor',
    'japan_postwar_generation', 'lost_decade_generation', 'fukushima_generation', 'burakumin_identity',
    'hibakusha_survivor', 'hibakusha_silent', 'zainichi_identity', 'aum_proximate', 'ainu_identity', 'okinawa_base_opposition',
    'sau_siege_generation', 'sau_khashoggi_generation',
    'irn_sanctions_generation', 'irn_jcpoa_generation',
    'april_9_generation', 'georgian_war_2008', 'geo_1990s_generation', 'geo_testigo_generation',
    'polytechnic_generation', 'gr_civil_war_memory', 'gr_oxi_generation', 'gr_testigo_generation',
    'black_summer_generation',
    'madrid_11m_lived',
    'smolensk_generation', 'strajk_kobiet_generation',
    'russia_1991_generation',
    'falklands_generation', 'london_77_generation',
    'jfk_assassination_generation', 'katrina_generation', 'gulf_coast_displaced',
    'nsu_generation', 'nsu_mourned',
    'mai_68_generation',
  )

  if (any('genocide_survivor', 'tutsi_hidden')) {
    para2.push(`${He} survived something that killed many of the people around ${him}. The rest of ${his} life was lived in the long shadow of that fact, and somehow, beyond it.`)
  } else if (f('id_1965_stained') && f('id_1965_silence_generation')) {
    para2.push(`${He} lost family in Indonesia's 1965 anti-communist purge — between 500,000 and one million killed in six months — and then spent thirty years under a New Order that determined the killings had been necessary. The grief and the silence were both enforced. ${He} carried both.`)
  } else if (f('id_1965_stained')) {
    para2.push(`A family member was taken in Indonesia's 1965 purge. The name of what happened — the organised mass killing, the army lists, the rivers — was not officially nameable for thirty years. ${He} had an undeclared grief for thirty years. It was declared late.`)
  } else if (f('id_1965_silence_generation')) {
    para2.push(`${He} was Indonesian in the New Order years — carrying knowledge of 1965 that the textbook did not contain. Between 500,000 and one million dead; the textbook said the communists had been defeated. ${He} navigated the gap between what ${he} knew and what could be said for thirty years.`)
  } else if (f('id_tsunami_2004_survivor') && f('disaster_survivor')) {
    para2.push(`${He} survived the December 26, 2004 Indian Ocean tsunami — 170,000 dead in Aceh, the coastline changed, the towns erased or reshaped. The randomness of who was on which street at what time is not a question ${he} ever fully stopped carrying.`)
  } else if (f('id_papua_identity')) {
    para2.push(`${He} was Papuan in Indonesia — the Morning Star flag illegal, the customary land contested, the Grasberg mine's gold going elsewhere. A life lived inside the unresolved question of what the territory is and who it belongs to and what that means for who you are.`)
  } else if (f('survived_khmer_rouge')) {
    para2.push(`${He} survived the Khmer Rouge years. That ${he} survived at all placed ${him} in a statistical minority.`)
  } else if (any('partition_survivor', 'partition_refugee')) {
    para2.push(`${He} lived through the Partition — one of the largest forced migrations in human history — and carried it quietly for decades.`)
  } else if (f('tehran_revolution_witness')) {
    para2.push(`${He} was in Tehran for the Revolution. The world it made was not the world it had promised.`)
  } else if (f('cultural_revolution_survived')) {
    para2.push(`The Cultural Revolution demanded a particular calibration of public and private self. ${name} navigated it.`)
  } else if (f('derg_era_survived')) {
    para2.push(`${He} survived the Derg years in Ethiopia — the Red Terror, the famine, and the long years after both.`)
  } else if (f('harare_hyperinflation_lived')) {
    para2.push(`Zimbabwe's hyperinflation turned daily arithmetic into survival. ${He} had that education, and kept it.`)
  } else if (f('ven_testigo_generation') && f('bolivarian_collapse_lived')) {
    para2.push(`${He} lived the whole arc of Bolivarian Venezuela — the 1998 hope, the missions, the oil decade, the collapse, the exodus of seven million. ${He} contains the complete account of a project that delivered something real and then destroyed it.`)
  } else if (f('ven_2017_generation') && f('bolivarian_collapse_lived')) {
    para2.push(`${He} was in the streets of Venezuela in 2017 — four months of daily protest, 120 dead — and then lived through the years when the street didn't produce what the street was demanding. ${He} kept going.`)
  } else if (f('bolivarian_collapse_lived')) {
    para2.push(`${He} watched Venezuela collapse — the pharmacy shelves, the currency, the people crossing the border on foot.`)
  } else if (any('buenos_aires_junta_era', 'witnessed_madres')) {
    if (f('witnessed_madres')) {
      para2.push(`${He} lived under the Argentine military junta and watched the Mothers circle the plaza with photographs of people who had not come back.`)
    } else {
      para2.push(`${He} lived under the Argentine military junta. ${He} knew people who did not come back from it.`)
    }
  } else if (f('left_junta_chile')) {
    para2.push(`${He} left Chile after the coup. The leaving was its own kind of loss alongside everything else the coup took.`)
  } else if (f('solidarity_era_lived')) {
    para2.push(`${He} lived the Solidarity years in Poland — the underground presses, the church halls, the specific risk of visible hope.`)
  } else if (f('solidarity_generation') && f('smolensk_generation')) {
    para2.push(`${He} was in Poland for Solidarity in 1980 and for Smolensk in 2010. The first event produced unity across ten million people. The second event produced a grief that was real and a political use of the grief that divided the country for the decade after. ${He} lived the before and the after.`)
  } else if (f('strajk_kobiet_generation') && f('communist_poland_childhood')) {
    para2.push(`${He} grew up in communist Poland learning the gap between what is said officially and what is true. She carried that skill into October 2020, when the Constitutional Tribunal banned abortion and the lightning bolt went up in the streets. Both events required the same knowledge: what a state is willing to do and what can be done about it.`)
  } else if (f('russia_ukraine_exile') && f('russia_1991_generation')) {
    para2.push(`${He} was at the White House in August 1991 when Yeltsin climbed on the tank, or somewhere in Russia watching the three days when a country ended and another began. And then in February 2022, ${he} left — Tbilisi, Riga, Istanbul. The country ${he} was born into and the country ${he} left are not the same country. ${He} saw both transitions from inside.`)
  } else if (f('russia_2022_generation') && f('bolotnaya_generation')) {
    para2.push(`${He} was in Bolotnaya Square in 2011-12 with the white ribbons, and was in Russia on February 24, 2022, navigating the gap between the word that was banned and what was happening. Both events are the same lesson about what the system will do when it decides something is a threat. ${He} was present for both teachings.`)
  } else if (f('russia_ukraine_exile')) {
    para2.push(`${He} left Russia in 2022 — one of 700,000. Tbilisi or Riga or Istanbul or Tashkent, carrying the name of a country whose name became complicated to say. ${He} is still working out the relationship between the country ${he} left and the person ${he} is without it.`)
  } else if (any('maidan_generation', 'euromaidan_lived')) {
    para2.push(`${He} stood in the Maidan. What followed was harder than the night on the square.`)
  } else if (f('witnessed_wall_fall')) {
    para2.push(`${He} was in Berlin the night the Wall came down. The details never fully translated into words.`)
  } else if (f('berlin_wall_era_lived')) {
    para2.push(`${He} grew up in a city divided by concrete and wire, and knew both sides of what that meant.`)
  } else if (any('post_apartheid_generation', 'witnessed_truth_commission')) {
    if (f('witnessed_truth_commission')) {
      para2.push(`${He} cast a vote in the first free election, and later sat in the room where a country tried, in public, to say what had happened to it.`)
    } else {
      para2.push(`${He} cast a vote in the first free election. ${He} knew what it had cost to get there.`)
    }
  } else if (any('ghana_independence_generation', 'nairobi_independence_generation', 'independence_generation_self')) {
    para2.push(`${He} was alive when independence came — heard it announced and believed, in that moment, that the world had changed.`)
  } else if (f('hungarian_1956_generation') && f('hungarian_diaspora_1956')) {
    para2.push(`${He} left Hungary in 1956, through the Austrian border, after the Soviet tanks came back. Two hundred thousand took the same calculation in the same weeks. ${He} was among them.`)
  } else if (f('hungarian_1956_generation')) {
    para2.push(`${He} was in Hungary for the 1956 uprising — the twelve days, then November 4th and the Soviet tanks. ${He} carried the twelve days as a measurement for the rest of ${his} life.`)
  } else if (f('taiwan_228_generation')) {
    para2.push(`${He} was in Taiwan for the February 28 Massacre of 1947. The event was forbidden in public memory for forty years. ${He} carried it privately in the years when no other carrying was possible.`)
  } else if (f('april_9_generation')) {
    para2.push(`${He} was on Rustaveli Avenue on April 9, 1989, when Soviet troops turned on the crowd. The event became the founding memory of Georgian independence.`)
  } else if (f('normalization_generation') && f('charter_77_generation') && f('political_dissident')) {
    para2.push(`${He} signed Charter 77 in Czechoslovakia and paid for it through the normalization years. What ${he} kept was a sense of what it cost to refuse.`)
  } else if (f('velvet_revolution_generation')) {
    para2.push(`${He} was in Wenceslas Square in November 1989, keys jingling. Twenty-one days from the first march to the end of forty years of communist rule.`)
  } else if (f('baltic_january_1991')) {
    para2.push(`${He} was at the barricades in January 1991, when Soviet troops moved on the television tower. Baltic independence held, partly because people like ${him} were there.`)
  } else if (f('deportation_family_memory')) {
    para2.push(`The family members who did not come back from Siberia — deported in 1941 or 1949 — were part of ${his} life as an absence with a known shape. ${He} carried them.`)
  } else if (f('georgia_rose_revolution') && f('georgian_war_2008')) {
    para2.push(`${He} was in Parliament Square in 2003 when Shevardnadze left without violence, and in Tbilisi in 2008 when the Russian tanks came within forty kilometres. Both things were real.`)
  } else if (f('arm_genocide_memory_bearer') && f('arm_war_2020_loss')) {
    para2.push(`${He} carried family memory of 1915 and lived to see Karabakh fall in 2020. The thread of what Armenia survived and what it could not survive was something ${he} turned over many times.`)
  } else if (f('arm_karabakh_veteran_1') && f('arm_war_2020_loss')) {
    para2.push(`${He} fought in Karabakh in 1991 and watched the war of 2020 take it back in forty-four days. What the first war had cost, and what it turned out to cost in the end.`)
  } else if (f('arm_war_2020_loss')) {
    para2.push(`${He} was alive for November 2020 — Shushi falling, the ceasefire signed at 3am, the map on the phone screen losing its names one by one. The country lived through it, and so did ${he}.`)
  } else if (f('arm_dark_winter_survivor') && f('arm_velvet_revolution')) {
    para2.push(`${He} survived the blockade winters of the 1990s and was in Republic Square in April 2018 when people laughed in a way they had not laughed there before. Between those two things was an entire education.`)
  } else if (f('azr_karabakh_idp') && f('azr_karabakh_return_2023')) {
    para2.push(`${He} spent thirty years as an IDP — the deed in the drawer, the photograph on the wall, the temporary that became permanent. In 2023 ${he} went back on the government bus. The mulberry tree was there. The house was a ruin.`)
  } else if (f('azr_black_january_generation') && f('azr_war_victory_2020')) {
    para2.push(`${He} was in Baku on Black January 1990, when the Soviet army killed 131 people in the streets. Thirty years later ${he} watched the Karabakh map change. Both dates are in the same life.`)
  } else if (f('azr_karabakh_idp')) {
    para2.push(`${He} was displaced from Karabakh in 1993 or 1994 and carried a land deed for thirty years, waiting to use it. The waiting was most of an adult life.`)
  } else if (f('bel_exile') && f('bel_2020_marcher')) {
    para2.push(`${He} marched every Sunday in Minsk in August 2020, when it seemed possible that something would change. Then ${he} left. The crowd ${he} had stood in, and the country ${he} left, and the years of renewing work permits in Warsaw — these are the arc of a specific political life.`)
  } else if (f('bel_crackdown_survived') && f('bel_stayed_2020')) {
    para2.push(`${He} stayed in Belarus after 2020, when others left, and learned what staying required. The version of ${himself} that went to work and the version that came home — ${he} kept them separate for a long time.`)
  } else if (f('bel_chernobyl_generation')) {
    para2.push(`${He} was in Belarus in April 1986, when the cloud from Chernobyl moved north. Seventy percent of the fallout. The May Day parade went ahead on schedule. ${He} was not told about the cloud in time. ${He} was told it was safe.`)
  } else if (f('uru_dictatorship_lived') && f('uru_mujica_era')) {
    para2.push(`${He} lived Uruguay's twelve years under military rule and long enough after to watch a former political prisoner — a man who had spent two years in a hole in the ground — become president of the country. The arc from one thing to the other was most of an adult life.`)
  } else if (f('uru_coup_1973') && f('uru_tupamaro_adjacent')) {
    para2.push(`${He} was on the edges of the Tupamaro movement before the 1973 coup closed parliament. The distinction between involvement and sympathy mattered less to the military than ${he} had assumed it would.`)
  } else if (f('pry_triple_alliance_memory') && f('pry_archive_terror')) {
    para2.push(`${He} grew up knowing what the Triple Alliance War had cost Paraguay in 1864-70, and lived to see the 1992 discovery of what Operation Condor had done in the decades after Stroessner. Paraguay\'s twentieth century had a specific weight that ${he} carried.`)
  } else if (f('pry_stroessner_era')) {
    para2.push(`${He} navigated thirty-five years of Stroessner\'s dictatorship in Paraguay — the Colorado Party membership card, the patronage structure, the calculation of inside or outside the system.`)
  } else if (f('ecu_yasuni_generation') && f('ecu_oil_generation')) {
    para2.push(`${He} watched Ecuador pump its first oil from the Amazon in the 1970s and watched Ecuador propose, in 2013, to leave the remaining oil in the ground if the world would pay half its value. The world declined. Both things happened in ${his} adult life.`)
  } else if (f('dprk_defected') && f('dprk_hanawon_complete')) {
    para2.push(`${He} crossed the Tumen River at 3am and spent months in dangerous transit before arriving in South Korea. The constitution said ${he} was already a citizen. The adjustment took years. The people on the other side of the river were never not in ${his} mind.`)
  } else if (f('dprk_arduous_march') && f('dprk_foreign_media')) {
    para2.push(`${He} survived the Arduous March — the North Korean famine of the 1990s — and later watched South Korean dramas at 2am on a USB drive smuggled from China. The gap between what the state said the world was and what the dramas showed the world was: this was ${his} education.`)
  } else if (f('dprk_chose_stay')) {
    para2.push(`${He} ran the calculation: the Tumen river at night, the family, the risk of being returned. ${He} chose to stay. ${He} stayed. The people who left are in Seoul. ${He} is still in the country that taught ${him} its version of the world before ${he} could evaluate it.`)
  } else if (f('dprk_hostile_class')) {
    para2.push(`${He} was born into the hostile Songbun class — a grandfather who fled south in 1950, or a great-uncle with a Bible, or some other fact recorded in a file. The ceiling was not visible. ${He} learned to read it from what was never offered.`)
  } else if (f('cuba_balsero')) {
    para2.push(`${He} crossed the Florida Strait on a raft during the 1994 balsero crisis — one of the 35,000 who made the crossing that summer. The ninety miles was not ninety miles while ${he} was in the middle of it.`)
  } else if (f('cub_mariel_gone')) {
    para2.push(`${He} left Cuba during the Mariel boatlift of 1980, one of 125,000 who crossed when Castro opened the port. The word "Marielito" followed ${him} to the other side before ${he} had time to be anything else.`)
  } else if (f('cub_july11_marcher')) {
    para2.push(`${He} was in the street on July 11, 2021 — the largest protests in Cuba since 1959. The neighbor who stood beside ${him} is still serving eight years. ${He} carries the day without putting it in sentences.`)
  } else if (f('special_period_generation') && f('cub_revolution_generation')) {
    para2.push(`${He} was born into the revolution and survived the collapse of everything the revolution had promised — the Soviet subsidies, the food rations, the certainty. Both the faith and the famine were part of ${his} formation.`)
  } else if (f('nam_herero_memory_bearer') && f('nam_german_apology_generation')) {
    para2.push(`${He} carried the oral history of what Germany did to the Herero people in 1904–1908, and was alive in 2021 when Germany said the word genocide for the first time. The word arriving one hundred and seventeen years later: ${he} had something to say about what that was worth.`)
  } else if (f('nam_herero_memory_bearer')) {
    para2.push(`${He} carried what no document yet acknowledged — the oral history of the Herero genocide, passed from grandmother to grandchild before any government called it by name.`)
  } else if (f('nam_san_displaced')) {
    para2.push(`${He} was San — the people who had been in the land the longest — growing up in a resettlement area thirty-two speakers away from a language that named every plant that fed a family. ${He} held both the language and the knowledge of what holding it cost.`)
  } else if (f('laos_hmong_era') && f('laos_uxo_generation')) {
    para2.push(`${He} was Hmong in Laos — the people who fought for the CIA in the Secret War and became enemies of the state that won. ${He} grew up knowing which topics not to raise in school, and knew which fields not to enter because the war left metal in the ground that hadn\'t been cleared.`)
  } else if (f('laos_uxo_generation')) {
    para2.push(`${He} grew up in the most-bombed country per capita in history. The US dropped more ordnance on Laos than on all of Europe in the Second World War; thirty percent of it didn\'t explode. The rule every Lao child learns — don\'t touch metal in the field — was the landscape ${he} was born into.`)
  } else if (f('sg_kampung_generation') && f('sg_dialect_lost')) {
    para2.push(`${He} grew up in a kampung that was cleared for HDB blocks and lost ${his} grandmother\'s dialect to the Speak Mandarin Campaign in the same decade. The village and the language went at the same pace, which is to say quickly.`)
  } else if (f('sg_kampung_generation')) {
    para2.push(`${He} was part of the generation that moved from kampung to HDB flat — the entire architecture of childhood, the banyan tree, the wells, the neighbours' chickens, replaced within a few years by the high-rise that now holds the same street address.`)
  } else if (f('sg_dialect_lost') && f('sg_lky_generation')) {
    para2.push(`${He} grew up Singaporean during Lee Kuan Yew's long dominion. ${He} lost ${his} grandmother's dialect to the Speak Mandarin Campaign and watched Lee die in 2015 in a country that ran, efficiently, on his decisions. ${He} had mixed feelings that ${he} rarely expressed. This was also part of the formation.`)
  } else if (f('sg_founding_generation')) {
    para2.push(`${He} was there in August 1965 when Lee Kuan Yew appeared on television with wet eyes and said that Singapore would have to make it alone. It made it.`)
  } else if (f('nl_srebrenica_generation') && f('nl_hunger_winter_generation')) {
    para2.push(`${He} grew up in the generation that inherited the Hunger Winter from ${his} parents and lived to watch Dutch peacekeepers hand 8,000 men and boys to Mladic in Srebrenica. Both things were part of the Dutch self-understanding, from different directions.`)
  } else if (f('nl_srebrenica_generation')) {
    para2.push(`${He} was Dutch and alive in July 1995, which meant ${he} was alive for Srebrenica — for Dutchbat, for the eight thousand men and boys, for the long accounting afterward that never fully reached a single responsible address.`)
  } else if (f('nl_hunger_winter_generation') && f('nl_fortuyn_witness')) {
    para2.push(`${He} grew up in the shadow of the Hunger Winter and was Dutch when Pim Fortuyn was shot in a radio station car park in 2002. Both events required a kind of national reckoning that the Netherlands is still conducting.`)
  } else if (f('nl_hunger_winter_generation')) {
    para2.push(`${He} was the child of people who ate tulip bulbs in the winter of 1944–45. The waste-not was in everything — in how ${his} parents stood at a supermarket, in the plate always cleaned. ${He} received the consequence without the event.`)
  } else if (f('nl_fortuyn_witness')) {
    para2.push(`${He} was Dutch on May 6, 2002, when Pim Fortuyn was shot in Hilversum nine days before an election. The Netherlands had no frame for this. ${He} watched the country try to find one for years afterward.`)
  } else if (f('bra_resistance_generation') && f('bra_abertura_generation')) {
    para2.push(`${He} was on the edges of the resistance during Brazil's years of lead, running pamphlets while the DOI-CODI ran its interrogations. Then the Amnesty Law freed the tortured and the torturers with identical paperwork. ${He} watched both walk out into the same country.`)
  } else if (f('bra_dictatorship_generation') && f('brazil_dictatorship_lived')) {
    para2.push(`${He} came of age in Brazil during the AI-5 years — habeas corpus suspended, Congress closed, the DOPS at work. The economy grew 10% per year. The torture happened in the same years as the miracle. ${He} navigated the silence that this required.`)
  } else if (f('bra_favela_survived') && f('bra_favela_generation')) {
    para2.push(`${He} grew up on the hill and survived its arithmetic — the bala perdida, the faction boundaries, the decision to stay or leave. The city below the hill experienced none of this and had opinions about it. ${He} had the count.`)
  } else if (f('bra_nordestino_migrant') && f('bra_lula_generation')) {
    para2.push(`${He} came south from the sertão on the pau-de-arara when the drought made staying impossible, and was in São Paulo when a man who also came from the working class became president in 2002. Both journeys were about the same thing: the country that the country was capable of being and kept failing to be. ${He} watched the second journey and recognized it.`)
  } else if (f('bra_lava_jato_generation') && f('bra_lula_generation')) {
    para2.push(`${He} voted for Lula in 2002 and watched him imprisoned in 2018 on charges a judge was later found to have pursued with political coordination. The conviction was annulled in 2021. Lula won again in 2022. ${He} lived all four chapters of the same story.`)
  } else if (f('bra_carandiru_generation') && f('bra_favela_generation')) {
    para2.push(`${He} grew up on the hill and was old enough to understand Carandiru in 1992 — 111 inmates killed, the commander acquitted and elected to the assembly. The hill and the prison were the same political fact from different angles: the state's relationship with the people it sorted to the bottom.`)
  } else if (f('nga_june12_generation') && f('endsars_generation')) {
    para2.push(`${He} was there for June 12, 1993, and for October 2020 — the Abiola election annulled and the Lekki toll gate. Two moments separated by twenty-seven years in which Nigerians mobilized and were answered in the same way. ${He} understood the pattern. The pattern did not need explaining by the second time.`)
  } else if (f('nga_june12_generation') && f('nga_military_era')) {
    para2.push(`${He} came of age under military government and was watching on June 12, 1993, when the freest and fairest election in Nigerian history was unmade overnight. The military era ended in 1999. The political education it produced did not end.`)
  } else if (f('nga_boko_haram_generation') && f('nga_delta_community')) {
    para2.push(`${He} was Nigerian at the extremes — the North-East insurgency and the Niger Delta extraction. Two crises, both ongoing, one country that could not address them simultaneously because the country had limited capacity and unlimited crisis. ${He} lived in the region that got the crisis.`)
  } else if (f('nga_june12_generation')) {
    para2.push(`${He} was in Nigeria on June 12, 1993, when MKO Abiola won and then did not win — the result announced and then unmade, the election whose outcome was too threatening to allow to stand. ${He} carried that lesson about Nigerian democracy for the rest of ${his} life.`)
  } else if (f('nga_boko_haram_generation')) {
    para2.push(`${He} was in the North during the Boko Haram years — the 2.6 million displaced, the Chibok girls, the checkpoints. ${He} navigated the insurgency and its counterinsurgency simultaneously. That both the insurgents and the army could be dangerous was the arithmetic of those years.`)
  } else if (f('nga_delta_community')) {
    para2.push(`${He} grew up in the Niger Delta, where the oil that made Nigeria an OPEC member burned off in the gas flares above ${his} community for decades. The UNEP said thirty years to remediate what Shell and the others left behind. The thirty years started after ${his} childhood was already over.`)
  } else if (f('bng_mukti_bahini') && f('bng_liberation_generation')) {
    para2.push(`${He} was in the Mukti Bahini during the 1971 Liberation War — nine months of guerrilla resistance while the Pakistani army conducted systematic atrocities across Bangladesh. December 16, 1971: ninety-three thousand Pakistani soldiers surrendered. ${He} had been there from March.`)
  } else if (f('bng_liberation_generation') && f('bng_famine_generation')) {
    para2.push(`${He} survived the 1971 Liberation War and watched the free country starve in 1974. Both things happened in the same decade. The gap between what independence was supposed to mean and what it produced in practice was the political education of ${his} adult life.`)
  } else if (f('bng_liberation_generation')) {
    para2.push(`${He} was alive in Bangladesh for the Liberation War of 1971 — the nine months of Operation Searchlight and Mukti Bahini resistance and Indian intervention that killed between one and three million people and produced a free country on December 16.`)
  } else if (f('bng_coup_generation') && f('bng_famine_generation')) {
    para2.push(`${He} watched the Bangabandhu's free Bangladesh starve in 1974 and assassinate its founder in 1975. Both events happened inside the first four years of independence. ${He} navigated everything that came after.`)
  } else if (f('irq_iran_iraq_veteran') && f('irq_sanctions_generation')) {
    para2.push(`${He} served in the Iran-Iraq War and came back to a country that then spent twelve years under UN sanctions. Eight years of war for a border that didn't move, then twelve years of sanctions that destroyed what the war hadn't finished. Both were the life.`)
  } else if (f('irq_iran_iraq_veteran') && f('irq_war_generation')) {
    para2.push(`${He} served in the Iran-Iraq War — eight years on the front in the marshes and plains near Basra, poison gas in the mountains near Halabja — and came back to a country that had spent 250,000 to 500,000 people for a border that didn't move. ${He} carried the arithmetic of that for the rest of ${his} life.`)
  } else if (f('irq_sanctions_generation') && f('irq_postwar_generation')) {
    para2.push(`${He} lived through twelve years of UN sanctions and then the 2003 invasion and then the civil war. Each arrived before the last one was finished. The country that existed at the start of that sequence is not the country at the end.`)
  } else if (f('irq_displacement_generation') && f('irq_postwar_generation')) {
    para2.push(`${He} survived the 2006–08 sectarian violence in Baghdad — the walls, the sorted neighbourhoods, two million displaced. The city ${he} returned to did not have the same map as the city ${he} left.`)
  } else if (f('irq_sanctions_generation')) {
    para2.push(`${He} came of age in the sanctions decade — the dinar collapsing, the hospitals running short, the middle-class Iraq of ${his} parents dismantled at the speed of policy. ${He} navigated it and kept going.`)
  } else if (f('irq_isis_generation')) {
    para2.push(`${He} was Iraqi during the ISIS years — Mosul, the caliphate, nine months of block-by-block liberation, the ruined mosque. The country has survived worse. The surviving changes what the word means.`)
  } else if (f('rwa_genocide_witness') && f('rwa_gacaca_generation')) {
    para2.push(`${He} survived the Rwandan genocide's hundred days and sat in the gacaca courts a decade later, in the same fields, facing what had happened. The accounting was public. The community was the same community. ${He} lived in both.`)
  } else if (f('rwa_genocide_witness') && f('rwa_kagame_generation')) {
    para2.push(`${He} was in Rwanda for April 1994 and for the reconstruction that followed — the clean city, the no-ethnicity policy, the GDP growth, the press restrictions. The before and the after are in the same body.`)
  } else if (f('rwa_rtlm_generation') && f('rwa_genocide_witness')) {
    para2.push(`${He} heard Radio Mille Collines fill the room with the word inyenzi until it was ordinary, and then lived through the hundred days that followed. The radio and the hundred days are the same event in ${his} memory. They are the sound of it.`)
  } else if (f('rwa_goma_generation')) {
    para2.push(`${He} crossed into Zaire with two million others after July 1994 — the cholera, the volcanic rock, the génocidaires controlling the aid committees. What ${he} navigated in those camps is its own chapter in a life already full of chapters.`)
  } else if (f('col_violencia_generation') && f('col_testigo_generation')) {
    para2.push(`${He} was Colombian across four chapters of organised violence: La Violencia, the cartel years, the paramilitary era, the peace accord. ${He} contained the whole arc. The archive of it lives in this life.`)
  } else if (f('col_cartel_era') && f('col_paz_generation')) {
    para2.push(`${He} lived through the Medellín cartel at its height and through the peace accord that ended a fifty-two-year war. The distance between those two facts is the measure of a country's capacity for both catastrophe and reinvention.`)
  } else if (f('col_desplazado') && f('col_paz_generation')) {
    para2.push(`${He} was among the seven million Colombians displaced by the conflict. ${He} rebuilt somewhere else and lived to see the war end and the territories where the state still hasn't arrived.`)
  } else if (f('col_violencia_generation')) {
    para2.push(`${He} grew up in the Colombia of La Violencia — the partisan civil war that didn't call itself a war because it happened between neighbors. The country that came after was the same country with a new set of armed actors.`)
  } else if (f('per_sterilization_survivor') && f('per_cvr_witness')) {
    para2.push(`${He} was among the 270,000 Quechua-speaking women sterilized under Fujimori's "voluntary" family planning campaign. ${He} gave testimony to the CVR. The report exists. The convictions are still partial.`)
  } else if (f('per_sterilization_survivor')) {
    para2.push(`${He} was among the 270,000. The CVR counted it and named it. The justice was partial. ${He} carried what the form had decided for ${him} for the rest of ${his} life.`)
  } else if (f('per_sendero_generation') && f('per_cvr_witness')) {
    para2.push(`${He} was in the Peruvian highlands during the Sendero years — the school closures, the rondas, the army, the bodies. ${He} lived to give testimony to the CVR. The report found 69,000 dead, 75% Quechua-speaking. ${He} was in the 75%.`)
  } else if (f('per_sendero_generation')) {
    para2.push(`${He} was a child in the decade when the Shining Path and the Peruvian army were both in the same valleys. The Truth Commission counted 69,000 dead. The count didn't reach Lima as urgently as it reached the highlands.`)
  } else if (f('burakumin_identity') && f('lost_decade_generation')) {
    para2.push(`${He} navigated Japan's feudal outcast legacy — the family register check, the marriage veto, the things said behind and not to ${his} face — and then navigated the Lost Decade. Two systems of exclusion, one life.`)
  } else if (f('burakumin_identity')) {
    para2.push(`${He} was descended from Japan's feudal outcast caste. Legally emancipated 1871. The discrimination that could not be legislated away operated through the marriage register, the address, the things that identified without being said.`)
  } else if (f('hibakusha_survivor') && f('hibakusha_silent')) {
    para2.push(`${He} survived the atomic bomb and chose silence — the family register clean, the city unnamed, the fact carried without surfacing. The silence lasted as long as ${his} life. Whether it protected anyone was a question ${he} did not fully answer.`)
  } else if (f('hibakusha_survivor') && f('japan_postwar_generation')) {
    para2.push(`${He} was a hibakusha in a country that was rebuilding itself in the image of peace. The official narrative of Japan as victim and Japan as economic miracle both ran alongside the specific memory of the flash. ${He} held all three at once for decades.`)
  } else if (f('hibakusha_survivor')) {
    para2.push(`${He} was a hibakusha — bomb-affected. The word and the category and the discrimination and the medical registry and the testimony movements: ${he} navigated all of them over the decades after a morning in 1945.`)
  } else if (f('zainichi_identity') && f('zainichi_resisted')) {
    para2.push(`${He} was Zainichi — a third-generation resident born in Japan who was formally foreign — and refused the fingerprinting requirement that applied only to people like ${him}. The refusal was a legal case. It was also a statement about what a body owes the state that categorizes it.`)
  } else if (f('zainichi_identity') && f('zainichi_naturalized')) {
    para2.push(`${He} was Zainichi Korean — the grandchildren of those brought to Japan before 1945, born in Japan, formally foreign — and eventually naturalized. The naturalization resolved the bureaucratic category. It did not resolve the question of what ${he} was.`)
  } else if (f('zainichi_identity')) {
    para2.push(`${He} was Zainichi Korean in Japan — born there, permanent resident there, formally foreign there. Two names: one for the public world, one for home. The double life was so ordinary that ${he} stopped noticing the doubling.`)
  } else if (f('ainu_identity') && f('ainu_revival')) {
    para2.push(`${He} was Ainu in a Japan that did not officially recognize Ainu as indigenous people until 2019. By then ${he} had already spent decades in the revival movements, learning the language from recordings of speakers who were gone, reconstructing ceremonies from ethnographic notes.`)
  } else if (f('ainu_identity')) {
    para2.push(`${He} was Ainu — indigenous to Hokkaido — in a country that did not recognize that category in law until near the end of ${his} life. The recognition arrived. The language had nearly gone. Both facts arrived in the same generation.`)
  } else if (f('aum_proximate')) {
    para2.push(`${He} was on the Tokyo subway on March 20, 1995. The sarin reached the station ${he} was in. ${He} survived. The city returned to its schedule with unusual speed. ${He} returned more slowly.`)
  } else if (f('okinawa_base_opposition') && f('japan_postwar_generation')) {
    para2.push(`${He} was Okinawan in postwar Japan — reversion 1972, bases staying regardless, seventy percent of the US footprint on 0.6 percent of the land. The postwar settlement that remade mainland Japan arrived in Okinawa in a specific form. ${He} lived in that form.`)
  } else if (f('japan_postwar_generation') && f('fukushima_generation')) {
    para2.push(`${He} was born into occupied Japan — the rubble, the chocolate from soldiers, the new constitution — and lived to March 11, 2011, when the word "anzen" stopped fitting the sentence. The arc of postwar Japan is ${his} arc.`)
  } else if (f('japan_postwar_generation') && f('lost_decade_generation')) {
    para2.push(`${He} grew up in the postwar miracle — ten percent growth, bullet trains, the 1964 Olympics — and then watched it stop. The Japan ${he} was raised to expect and the Japan ${he} lived in became different countries.`)
  } else if (f('sau_khashoggi_generation') && f('sau_vision_generation')) {
    para2.push(`${He} was in Saudi Arabia for Vision 2030 and for October 2018 — the cinemas and the concerts and the women driving, and Khashoggi entering the Istanbul consulate and not coming out. The liberalization and the killing are the same project.`)
  } else if (f('sau_siege_generation') && f('sau_mutaween_era')) {
    para2.push(`${He} was in Saudi Arabia in 1979 when Juhayman seized the Grand Mosque, and lived through the three decades of intensified religious conservatism that followed. The siege and the mutaween are the same answer.`)
  } else if (f('irn_jcpoa_generation') && f('irn_sanctions_generation')) {
    para2.push(`${He} lived both the JCPOA and its collapse — the delegations, the Boeing deal, the rial improving, and then May 2018, and the rial falling sixty percent in three months. The hope and the answer to the hope are the same story.`)
  } else if (f('irn_sanctions_generation') && f('irn_double_life')) {
    para2.push(`${He} navigated the sanctions economy and the Republic's private geography simultaneously — dollar prices and official rates, rooftop parties and street-facing silences. The arithmetic of both became second nature.`)
  } else if (f('geo_testigo_generation') && f('april_9_generation')) {
    para2.push(`${He} was on Rustaveli Avenue on April 9, 1989 and on Rustaveli Avenue again in 2024 with a different kind of crowd carrying the EU flag. The avenue had seen everything in between. So had ${he}.`)
  } else if (f('geo_1990s_generation') && f('georgian_war_2008')) {
    para2.push(`${He} survived the Georgian 1990s — the seventy-percent collapse, the four-hour power, the warlords — and then August 2008, five days, Russian tanks forty kilometres out. What survived the decade and survived the week is the country ${he} still lives in.`)
  } else if (f('geo_1990s_generation')) {
    para2.push(`${He} was Georgian in the 1990s — one million left, most of the economy dissolved, the candles and the wood and the Mkhedrioni in the street. ${He} was among the people who stayed and found out what staying through that decade produces.`)
  } else if (f('geo_testigo_generation')) {
    para2.push(`${He} watched the Georgia arc from the inside: the independence, the collapse, the warlords, the Rose Revolution, the war, and the return to the same avenue with a different flag and the same insistence. Georgia did not stop insisting. Neither did ${he}.`)
  } else if (f('gr_civil_war_memory') && f('polytechnic_generation')) {
    para2.push(`${He} grew up in the silence of the Greek Civil War's aftermath — the family fractures, the lists, the things not discussed — and was at Athens Polytechnic in November 1973 when the tank moved through the gate. The two events are the same story about what Greeks did to each other.`)
  } else if (f('gr_civil_war_memory') && f('gr_oxi_generation')) {
    para2.push(`${He} grew up in the silence the Civil War left behind and was alive in July 2015 for the OXI referendum, and for the week after it. What sixty-one percent voted and what happened next: ${he} understood the gap without requiring explanation.`)
  } else if (f('gr_testigo_generation')) {
    para2.push(`${He} lived the full Greek arc: the Civil War's long aftermath, the junta, the Polytechnic, the Metapolitefsi, the EU, the crisis, the OXI that was not a no. Greece has more catastrophe per generation than most countries. ${He} was present for its share.`)
  } else if (f('polytechnic_generation') && f('greece_crisis_stayed')) {
    para2.push(`${He} heard "this is the Polytechnic" on a homemade transmitter in November 1973 and stayed in Greece through the ATM limits of 2015. The country ${he} was young in and the country ${he} aged in are the same country, which is also to say they are different countries.`)
  } else if (f('black_summer_generation') && f('aus_mabo_generation')) {
    para2.push(`${He} was Australian for the Mabo decision and for the Black Summer — terra nullius overturned and then eighteen-point-six million hectares burning. Both asked what kind of country Australia would choose to be. Both produced partial answers.`)
  } else if (f('black_summer_generation')) {
    para2.push(`${He} watched the Black Summer of 2019-20 from inside Australia. Red sky at noon in Sydney. The smoke visible from space. Three billion animals. The summer that revised what the word "unprecedented" was going to mean for the rest of ${his} life.`)
  } else if (f('madrid_11m_lived') && f('transicion_generation')) {
    para2.push(`${He} was present for the Spanish transition from dictatorship to parliamentary democracy, and in Spain on March 11, 2004, for the three days that tested what kind of democracy it was. The pact that built the transition and the government that managed information before an election: both things in one life.`)
  } else if (f('madrid_11m_lived') && f('indignados_generation')) {
    para2.push(`${He} was in the streets in 2004 with "¿Quién ha sido?" and in Sol in 2011 with "No nos representan." Twelve years apart, same impulse: something about how this is being managed is wrong. The second time produced Podemos. Both times ${he} was there.`)
  } else if (f('madrid_11m_lived')) {
    para2.push(`${He} was in Spain on March 11, 2004 — the four trains, the hundred and ninety-one dead, the government's three days of managed information before the election. ${He} voted on March 14 knowing what ${he} knew.`)
  } else if (f('carnation_generation') && f('portuguese_troika_generation')) {
    para2.push(`${He} was in Portugal for the Carnation Revolution — the flowers in the rifle barrels, the forty-eight years ending without significant bloodshed — and for the troika austerity forty years later. What the revolution built, and what the memorandum asked of it: both things happened in one life and ${he} carried them without cancelling either.`)
  } else if (f('geracao_rasca_generation') && f('portuguese_emigrant_2011')) {
    para2.push(`${He} was in the street on March 12, 2011, with the three hundred thousand, and then left for Angola or Brazil because Portugal was not hiring. The protest and the emigration are not contradictions. They are the same sentence about a country and a generation and what the memorandum required of both.`)
  } else if (f('miners_strike_generation') && f('windrush_generation')) {
    para2.push(`${He} came of age in the years of Orgreave and the pit closures — the class politics that formed in a mining community — and was still in Britain four decades later when the Windrush generation were told they couldn't prove their right to be there. Both events were about the same thing. ${He} understood this without requiring it to be explained.`)
  } else if (f('london_77_generation') && f('iraq_war_generation')) {
    para2.push(`${He} was in Britain on July 7, 2005 — the bombs on the Underground, the bombers who were British — and had been on the February 2003 march or had watched it on television. The million people and the four bombs are the two coordinates of the same decade.`)
  } else if (f('miners_strike_generation') && f('brexit_generation')) {
    para2.push(`${He} was in a mining community in 1984 and voted in 2016. The connection between the two events — the communities that the pit closures left behind and the referendum result from those same communities — ${he} held without needing to explain it to anyone from outside.`)
  } else if (f('windrush_generation') && f('citizenship_threatened')) {
    para2.push(`${He} came to Britain legally and was told, decades later, that ${he} could not prove ${his} right to be there. The landing card that proved it was destroyed by the government in 2010. ${He} fought the case. The fight cost more than it should have.`)
  } else if (f('falklands_generation') && f('miners_strike_generation')) {
    para2.push(`${He} was in Britain for both the Falklands War and the miners' strike — two events that defined what Thatcherism was and what it was for. The Task Force sailing south and the police buses at Orgreave are the two images of the same political settlement.`)
  } else if (f('jfk_assassination_generation') && f('king_assassination_generation')) {
    para2.push(`${He} was American for November 22, 1963 and for April 4, 1968. Both men were shot within five years, and both were forty-six and thirty-nine. The decade took what the decade took, and ${he} carried the taking for the rest of ${his} life.`)
  } else if (f('jfk_assassination_generation') && f('civil_rights_generation')) {
    para2.push(`${He} watched Kennedy take office with the words "ask not what your country can do for you" and watched the promise interrupted on a Dallas street a thousand days later. ${He} was also the generation that marched or watched others march. The 1960s were not what they promised. They were also extraordinary.`)
  } else if (f('gulf_coast_displaced') && f('katrina_generation')) {
    para2.push(`${He} was in New Orleans when the levees failed on August 29, 2005 — or had people there, which is the same as being there in the ways that count. The city ${he} knew and the city that came back were different cities. ${He} knew both.`)
  } else if (f('katrina_generation') && f('war_on_drugs_era')) {
    para2.push(`${He} lived in America for both the War on Drugs — the mandatory minimums, the crack disparity, the specific communities that absorbed the policy — and for Katrina, when sixty-seven percent of those who died were Black and the response took three days. The pattern is the same pattern. ${He} knew it from the inside.`)
  } else if (f('watergate_generation') && f('vietnam_veteran')) {
    para2.push(`${He} came back from Vietnam and then watched Nixon resign. The war the government told him was necessary and the government that lied about the break-in were the same government. The generation that came back from Vietnam and watched Watergate developed a specific political education that has not softened with age.`)
  } else if (f('nsu_mourned') && f('nsu_generation')) {
    para2.push(`${He} buried people from the Turkish-German community in Germany between 2000 and 2011, while the police investigation was focused on the victims' families. Nine of their own killed by a neo-Nazi cell that nobody was looking for. The files that might have explained the failures were shredded the week the story broke. ${He} is still waiting for the full accounting.`)
  } else if (f('nsu_generation') && f('hyphenated_german')) {
    para2.push(`${He} built a life as a Turkish German — the hyphenated identity, neither fully claimed — and watched nine members of that community murdered over eleven years while the state blamed the community. The NSU verdict came. The full story of what the Verfassungsschutz knew, and when, is still being established.`)
  } else if (f('mai_68_generation') && f('algerian_war_veteran')) {
    para2.push(`${He} carried Algeria and Mai 68 in the same French life — the war that was not a war, and then the weeks when ten million workers went on strike and de Gaulle disappeared to consult the army and came back to win a landslide. The France that produced both events is the France ${he} knows from inside.`)
  } else if (f('wirtschaftswunder_generation') && f('ddr_generation')) {
    para2.push(`${He} lived in a divided Germany — the Wirtschaftswunder on one side, the Trabant queue on the other — and lived to see it reunified. Both Germanys were built from the same rubble by the same generation asking different questions about what came before.`)
  }

  // Displacement / migration
  if (any('refugee', 'displaced') && !any('genocide_survivor', 'tutsi_hidden')) {
    if (any('sought_asylum', 'refugee_status')) {
      para2.push(`${He} fled and was eventually granted refuge. The years of waiting between were their own kind of sentence.`)
    } else {
      para2.push(`${He} was carried across borders by forces larger than any single life.`)
    }
  } else if (any('emigrated', 'diaspora') && para2.length === 0) {
    // Only add emigration if no heavy history already took up this paragraph
    if (f('illegal_immigrant') && !f('achieved_citizen')) {
      para2.push(`${He} crossed without papers and built a life in a country that barely acknowledged ${his} existence.`)
    } else if (f('achieved_citizen') || (state.residencyStatus === 'citizen')) {
      para2.push(`${He} left ${bornIn} and eventually earned citizenship in an adopted country — paperwork that meant more than its bureaucratic weight.`)
    } else {
      para2.push(`${He} left ${bornIn} in search of something different, and found it, at a cost.`)
    }
  }

  if (f('famine_memory') || f('drought_survived')) {
    para2.push(`${He} knew what a failed harvest meant at the level of a family's daily choices. The knowledge stayed longer than the hunger did.`)
  }
  if (f('kolkhoz_dissolved')) {
    para2.push(`${He} lived through the dissolution of collective farming — the paper that said you owned land, and the reality that was more complicated.`)
  }

  // ── PARAGRAPH 3: Dark path, work, ethics, identity ────────────────────────────
  // Crime
  if (any('convicted_murder', 'murderer')) {
    para3.push(`${He} killed someone. It defined ${him} in ways ${he} spent the rest of ${his} life either fleeing or accepting.`)
  } else if (f('convicted_manslaughter')) {
    para3.push(`${He} caused a death. Whether by accident or recklessness, the courts had a word for it.`)
  } else if (any('violent_criminal', 'assault_record')) {
    para3.push(`${He} had a capacity for violence that led ${him} into serious trouble.`)
  }
  if (f('escaped_prisoner')) {
    para3.push(`${He} escaped from prison and lived as a fugitive for a time — a chapter most people would find hard to believe.`)
  } else if (any('served_prison_time', 'incarcerated', 'served_time', 'prison_phone')) {
    para3.push(`${He} served time. Prison changes people.`)
  }
  if (any('gang_member', 'organized_crime')) {
    para3.push(`${He} ran with people the law had files on. Some of that life ${he} chose; some of it chose ${him}.`)
  }

  // Addiction
  if (any('drug_addiction', 'alcohol_addiction', 'addiction')) {
    if (any('addiction_recovered', 'sobriety', 'recovery_established', 'in_recovery', 'rehab_graduate')) {
      para3.push(`${He} fought an addiction and won — or came close enough to winning that it amounted to the same thing.`)
    } else {
      para3.push(`${He} struggled with addiction. It cost ${him} things ${he} never got back.`)
    }
  }

  // LGBTQ
  if (any('lgbtq_persecuted', 'arrested_for_orientation')) {
    para3.push(`${He} was persecuted for who ${he} was and endured it.`)
  } else if (any('came_out', 'lgbtq_accepted')) {
    para3.push(`${He} lived openly as ${he} was. In some eras and places, that required more courage than it should have.`)
  } else if (f('lgbtq_identity') && f('lgbtq_criminalized_country')) {
    para3.push(`${He} lived in a country that criminalised what ${he} was, and navigated it with care.`)
  }

  // Caste / discrimination
  if (any('caste_discrimination', 'dalit_discrimination', 'defied_caste')) {
    para3.push(`${He} spent ${his} life fighting a hierarchy ${he} was born into.`)
  } else if (any('experienced_discrimination', 'experienced_racism', 'gender_barrier_faced')) {
    para3.push(`${He} encountered barriers that others did not. ${He} found ways through most of them.`)
  }

  // Ethics and integrity
  if (any('corruption_exposed', 'bribery', 'fraud')) {
    para3.push(`A corruption scandal marked the record and the reputation never fully recovered.`)
  } else if (any('compromised', 'sold_out', 'censored_work')) {
    para3.push(`There were choices ${he} made that ${he} couldn't fully justify later.`)
  }
  if (f('whistleblower')) {
    para3.push(`${He} exposed something that needed exposing, at real personal cost.`)
  }
  if (any('journalism_threat', 'censored', 'censored_journalist')) {
    para3.push(`${He} worked in journalism and learned what it costs to tell the truth somewhere that prefers silence.`)
  } else if (f('story_killed') || f('art_in_drawer')) {
    para3.push(`There was a thing ${he} knew — or made — that never reached the world. ${He} carried it.`)
  } else if (f('resistance_through_art')) {
    para3.push(`${He} made work that said what couldn't be said directly, in a time and place when that mattered.`)
  }
  if (any('dissident_writer', 'dissident_reader') && !f('journalism_threat')) {
    para3.push(`${He} was someone the state kept a file on.`)
  }

  // Gifted arc — the work and the path
  if (f('gift_realized')) {
    para3.push(`${He} made the work ${he} was born to make. It exists and will outlast ${him}.`)
  } else if (f('gift_extraordinary') && !f('gift_realized')) {
    para3.push(`${He} reached the extraordinary ceiling of what ${he} was born to do.`)
  } else if (f('gift_second_generation') && f('gift_suppressed')) {
    para3.push(`The path that wasn't there for ${him} — ${he} made it for ${his} child. The gift continued.`)
  } else if (f('gift_cotton_field_reckoned') || f('gift_gould_understood')) {
    para3.push(`In later life ${he} understood that the gap between the life ${he} had and the life ${his} gift would have made was structural rather than personal. That understanding became a kind of peace.`)
  } else if (f('gift_wasted') && !f('gift_extraordinary')) {
    para3.push(`${He} was made for something the world didn't let ${him} do. The knowledge never left.`)
  } else if (f('gift_fulfilled') && !f('gift_extraordinary')) {
    para3.push(`${He} found a way to do the thing ${he} was made to do.`)
  } else if (f('gift_credit_stolen') && !f('gift_fought_exploitation') && (f('born_gifted_intellectual') || f('born_gifted_linguistic'))) {
    para3.push(`The work that established the field was ${his}. The attribution belonged to someone else. The work is still there.`)
  }
  if (f('gift_passed_on') && !f('gift_realized') && !f('gift_second_generation')) {
    para3.push(`${He} made sure someone younger didn't face the same closed door.`)
  }
  if (f('gift_major_prize') && f('gift_world_stage')) {
    para3.push(`${He} reached the highest level of ${his} field and received the recognition that comes with it.`)
  }

  // Child soldier arc
  if (f('child_soldier_taken')) {
    if (f('child_soldier_late_reckoning')) {
      para3.push(`${He} was taken as a child and made to do things children should not do. In late life ${he} understood that the name soldier was false. The things done were real. Both things were true and ${he} held them.`)
    } else if (f('child_soldier_order_refused')) {
      para3.push(`${He} was taken as a child and given an order ${he} refused. The refusal was ${his}. The consequences were immediate. ${He} survived them.`)
    } else {
      para3.push(`${He} was taken as a child soldier. The commanders produced what they intended. ${He} spent years learning to live inside what they produced.`)
    }
  }

  // WWI / Depression
  if (f('ww1_veteran')) {
    if (f('ww1_shell_shock')) {
      para3.push(`${He} served in the trenches of the First World War and came back carrying something the military called shell shock. ${He} carried it the rest of ${his} life.`)
    } else {
      para3.push(`${He} was a veteran of the Great War. ${He} was among the ones who came back.`)
    }
  }
  if (f('depression_survivor')) {
    para3.push(`${He} lived through the Depression — the decade of queues and shuttered factories. It produced a specific and permanent way of being in the world.`)
  }

  // Dementia
  if (f('dementia_personal')) {
    para3.push(`${He} developed dementia in later years. ${He} made ${his} plans while ${he} could still make them.`)
  }

  // Celebrity
  if (f('celebrity_scaled_back') && !f('celebrity_private_life')) {
    para3.push(`${He} was well-known for a period and chose to step back from public life. The choice was largely invisible to the public, which was the point.`)
  } else if (f('celebrity_private_life')) {
    para3.push(`${He} achieved significant public recognition and ultimately found the private life more sustaining.`)
  }

  // Teacher arc
  if (f('teacher_life_accounted')) {
    para3.push(`${He} spent ${his} working life as a teacher. The accounting of it is not done in salary.`)
  } else if (f('teacher_letter_received')) {
    para3.push(`${He} taught for decades. A letter arrived from a former student fifteen years later, which told ${him} that it had mattered.`)
  }

  // Education and career
  const educationLine = (() => {
    if (f('first_gen_graduate')) return `the first in the family to earn a university degree`
    if (f('university_graduate')) return `someone who pulled hard on the thread of education`
    if (any('school_dropout', 'expelled', 'illiterate')) return null
    return null
  })()
  const careerLine = (() => {
    if (!career) return null
    if (f('sold_business')) return `built a business and sold it`
    if (f('business_failed') && f('business_restart')) return `built a business, watched it fail, and built another — the second time went better`
    if (f('career_defining_work')) return `did the best of ${his} professional work as a ${career.title}`
    return `spent the working years as ${/^[AEIOUaeiou]/.test(career.title) ? 'an' : 'a'} ${career.title}`
  })()

  if (educationLine && careerLine) {
    para3.push(`${He} was ${educationLine}, and ${careerLine}.`)
  } else if (educationLine) {
    para3.push(`${He} was ${educationLine}.`)
  } else if (careerLine) {
    para3.push(`${He} ${careerLine}.`)
  } else if (any('school_dropout', 'expelled')) {
    para3.push(`${He} left school early. Whether that was a choice or a consequence depends who you ask.`)
  }

  // Fame and wealth (only if notable)
  if (fame > 70) {
    para3.push(`${He} was famous — the kind that changes what it means to walk into a room.`)
  } else if (fame > 40) {
    para3.push(`In certain circles, ${name} was well-known.`)
  }
  if (money > 5000000) {
    para3.push(`${He} accumulated serious wealth, though what it cost is harder to measure than what it came to.`)
  } else if (money > 1000000) {
    para3.push(`${He} left behind more than most.`)
  } else if (any('destitute', 'homeless')) {
    para3.push(`${He} died with almost nothing. The circumstances were not entirely of ${his} making.`)
  }

  // Faith
  if (f('completed_hajj')) {
    para3.push(`${He} made the pilgrimage to Mecca. Whatever ${he} went looking for, ${he} found something.`)
  } else if (f('faith_deepened')) {
    para3.push(`${His} faith grew rather than dimmed with age — the kind that asks hard questions and survives them.`)
  } else if (f('left_religion') && f('faith_crisis')) {
    para3.push(`${He} walked away from the faith ${he} was raised in. It was not a small thing.`)
  }

  // Place and movement
  if (f('village_electrified')) {
    para3.push(`${He} was there the night the first light came on in the village and never lost the specific memory of what came before it.`)
  }
  if (f('rural_to_urban') && !any('emigrated', 'refugee')) {
    para3.push(`${He} made the move from village to city — the defining migration of ${his} generation in that part of the world.`)
  } else if (f('left_dying_city')) {
    para3.push(`${He} left a city that was becoming something smaller. Probably the right call.`)
  } else if (f('rust_belt_stayer')) {
    para3.push(`${He} stayed when others left. The place ${he} refused to abandon wasn't the same at the end, but it was still there.`)
  } else if (f('postsoviet_stayer')) {
    para3.push(`${He} chose to stay in a city most people were leaving. The city stabilised, eventually. ${He} was already there.`)
  }

  // ── PARAGRAPH 4: Relationships, family, grief ─────────────────────────────────
  // The heaviest grief comes first
  if (f('lost_child')) {
    para4.push(`${He} outlived a child. There is no adequate sentence for this.`)
  }

  if (f('strong_marriage') && partner) {
    para4.push(`${He} loved ${partner.name} with a steadiness that was its own kind of achievement.`)
  } else if (f('long_marriage') && partner) {
    para4.push(`${He} and ${partner.name} were married for a long time. The length of it was its own statement.`)
  } else if (any('lost_partner', 'widowed')) {
    para4.push(`${He} lost the person ${he} had built a life with, and had to learn what came after.`)
  } else if (partner && !any('divorced', 'divorce')) {
    para4.push(`${He} shared ${his} life with ${partner.name}.`)
  } else if (any('divorced', 'divorce')) {
    para4.push(`${He} married, and the marriage ended — a chapter ${he} rarely spoke of directly.`)
  } else if (any('heartbroken', 'lost_love')) {
    para4.push(`${He} loved someone ${he} couldn't hold onto. It stayed with ${him}.`)
  }

  if (children?.length > 0) {
    const n = children.length
    const verb = f('absent_parent') ? (character.gender === 'male' ? 'fathered' : 'had') : 'raised'
    para4.push(`${He} ${verb} ${n === 1 ? 'a child' : `${n} children`}.`)
  } else if (f('chose_childless')) {
    para4.push(`${He} chose not to have children. It was a complete answer.`)
  } else if (f('ivf_success')) {
    para4.push(`The family ${he} built required real persistence to build.`)
  } else if (any('multiple_miscarriage', 'experienced_miscarriage')) {
    para4.push(`${He} lost pregnancies. The losses were private and not small.`)
  }

  if (f('sibling_bond_strong')) {
    para4.push(`${He} kept close with ${his} siblings — a bond that outlasted many of the other constants.`)
  }
  if (f('mentor') || f('is_mentor')) {
    para4.push(`${He} was someone others came to with questions about what to do next.`)
  }
  if (any('depression_managed', 'anxiety_managed', 'mental_health_journey')) {
    para4.push(`${He} lived with a condition that made ordinary things harder, and managed it more often than not.`)
  }
  if (f('heritage_language_preserved') || f('oral_historian')) {
    para4.push(`${He} kept things alive that might otherwise have been lost.`)
  }

  // ── LEGACY: what outlasted the life ──────────────────────────────────────────
  const legacy = state.legacy ?? 0
  if (legacy >= 80) {
    para4.push(`What ${he} built — the people ${he} mentored, the work ${he} put into the world, the family ${he} kept — outlasted the life in ways ${he} knew and ways ${he} didn't.`)
  } else if (legacy >= 60) {
    para4.push(`There are people in the world who carry something ${name} gave them — a skill, a phrase, a particular way of approaching a problem. That is not nothing.`)
  } else if (legacy >= 40) {
    para4.push(`${He} left traces, if not monuments: a few people who were better for knowing ${him}.`)
  }

  // ── PARAGRAPH 5: Closing ──────────────────────────────────────────────────────
  // Age-bracket guards first — different language for different life lengths
  if (age < 5) {
    para5.push(`${name} was too young for a story. ${He} had a name, and people who held it.`)
  } else if (age < 12) {
    para5.push(`${He} had a childhood — not all of it, but enough that the people who knew ${him} carry something specific.`)
  } else if (age < 18) {
    para5.push(`${He} was still becoming something. What it would have been, no one will know.`)
  } else if (any('found_meaning', 'acceptance', 'peace')) {
    para5.push(`Near the end, ${name} seemed at peace with the shape of the life.`)
  } else if (f('life_reviewed') || f('legacy_thought')) {
    para5.push(`${He} reviewed the life honestly before the end.`)
  } else if (regret > 75) {
    para5.push(`${He} carried something unresolved into the last years — a persistent sense that something essential had been missed.`)
  } else if (regret > 50) {
    para5.push(`There were regrets. Most people have them.`)
  } else if (f('retired_comfortable')) {
    para5.push(`${He} retired with enough, which is more than enough to say.`)
  } else if (stats.happiness > 70) {
    para5.push(`By most measures, it was a life worth having.`)
  } else {
    para5.push(`${name}'s life was shaped by circumstances ${he} did not choose, and decisions ${he} made from within them.`)
  }

  // Fallback — only if overall content is sparse AND para5 not already filled
  if (para1.length + para2.length + para3.length + para4.length + para5.length < 3) {
    para5.push(`${name}'s life was shaped by circumstances ${he} did not choose, and decisions ${he} made from within them.`)
  }

  const parts = [para1, para2, para3, para4, para5]
    .filter(p => p.length > 0)
    .map(p => p.join(' '))
  return parts.join('\n\n')
}

// ─── Life notes generator ─────────────────────────────────────────────────────
// Returns up to 8 short factual fragments for the death screen's "Life in brief"
// section. Prioritises the most significant flags; filters out minor ones.

export function generateLifeNotes(state) {
  const { character, flags, age, children, partner, career, money, siblings, fame } = state
  const f = (flag) => flags.includes(flag)
  const any = (...fs) => fs.some(g => flags.includes(g))
  const He = character.gender === 'male' ? 'He' : 'She'
  const he = He.toLowerCase()
  const his = character.gender === 'male' ? 'his' : 'her'

  const notes = [] // [{ priority, text }]

  const add = (priority, text) => notes.push({ priority, text })

  // Extreme survival (priority 100)
  if (any('genocide_survivor', 'tutsi_hidden')) add(100, 'Survived genocide.')
  if (f('survived_khmer_rouge')) add(100, 'Survived the Khmer Rouge.')
  if (any('partition_survivor', 'partition_refugee')) add(100, 'Survived the Partition.')

  // Major historical witness (priority 90)
  if (f('tehran_revolution_witness')) add(90, 'Witnessed the Iranian Revolution.')
  if (f('cultural_revolution_survived')) add(90, 'Survived the Cultural Revolution.')
  if (f('derg_era_survived')) add(90, 'Survived the Derg years in Ethiopia.')
  if (f('post_apartheid_generation')) add(90, 'Voted in the first free South African election.')
  if (f('witnessed_wall_fall')) add(90, 'Present in Berlin the night the Wall came down.')

  // Personal extremis (priority 80)
  if (f('lost_child')) add(80, 'Outlived a child.')
  if (any('convicted_murder', 'murderer')) add(80, 'Convicted of murder.')
  if (f('escaped_prisoner')) add(80, 'Escaped from prison.')
  if (f('whistleblower')) add(80, 'A whistleblower.')
  if (any('genocide_family_memory', 'holocaust_family_memory')) add(80, "Carried a family's memory of atrocity.")

  // Significant life facts (priority 70)
  if (f('first_gen_graduate')) add(70, 'First in the family to graduate university.')
  if (any('lgbtq_persecuted', 'arrested_for_orientation')) add(70, 'Persecuted for who they were.')
  if (any('served_prison_time', 'incarcerated', 'served_time')) add(70, 'Served time in prison.')
  if (any('refugee', 'displaced') && !any('genocide_survivor', 'tutsi_hidden')) add(70, 'A refugee.')
  if (f('famine_memory') || f('famine_survivor')) add(70, 'Survived famine.')

  // Notable choices (priority 60)
  if (f('sold_business')) add(60, 'Built and sold a business.')
  if (f('completed_hajj')) add(60, 'Made the pilgrimage to Mecca.')
  if (f('chose_childless')) add(60, 'Chose not to have children.')
  if (f('ivf_success')) add(60, 'Fought to have a family.')
  if (any('came_out', 'lgbtq_accepted')) add(60, 'Lived openly.')
  if (f('left_religion') && f('faith_crisis')) add(60, 'Walked away from the faith.')
  if (any('drug_addiction', 'alcohol_addiction') && any('addiction_recovered', 'sobriety')) add(60, 'Fought addiction.')
  if (fame > 70) add(60, 'Was famous.')

  // Carried things (priority 50)
  if (f('story_killed') || f('art_in_drawer')) add(50, 'Made something that never reached the world.')
  if (f('resistance_through_art')) add(50, 'Made work that said what couldn\'t be said directly.')
  if (any('dissident_writer', 'dissident_reader')) add(50, 'A person the state kept a file on.')
  if (f('oral_historian') || f('heritage_language_preserved')) add(50, 'Kept something alive that might have been lost.')
  if (f('mentor') || f('is_mentor')) add(50, 'Mentored others.')
  if (f('water_walk_childhood')) add(50, 'Carried water before school for years.')
  if (f('village_electrified')) add(50, 'Present when the first light came on in the village.')

  // Sort by priority, take top 8
  notes.sort((a, b) => b.priority - a.priority)
  return notes.slice(0, 8).map(n => n.text)
}
