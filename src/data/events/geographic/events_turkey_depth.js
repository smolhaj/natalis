// events_turkey_depth.js
// Turkey depth: the September 12 1980 coup and the junta's decade, Alevi identity
// and the 1993 Sivas massacre, the Gezi Park protests of 2013, the night of
// July 15 2016, the 1999 İzmit earthquake, the headscarf divide across generations,
// the hemşehrilik network that structures urban life, and mandatory military service.
// Companion to events_turkey.js and events_ireland_turkey.js.

const IS_TURKEY = (G) => G.character.country?.name === 'Turkey'
const IS_ALEVI = (G) => IS_TURKEY(G) && G.religion === 'muslim_shia'

export const TURKEY_DEPTH_EVENTS = [

  // ── THE 1980 COUP ─────────────────────────────────────────────────────────────

  {
    id: 'trk_dep_1980_coup',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1984 &&
      G.age >= 5 && G.age <= 22 &&
      !G.mem?.trk1980Coup,
    text: `September 12, 1980. The generals take power before dawn — tanks in Ankara, airports closed, parliament dissolved, political parties banned. Bülent Ecevit and Süleyman Demirel, the two men whose governments alternated through the 1970s while street violence killed thousands, are placed under house arrest. In the days and weeks that follow: 650,000 people detained, 1.6 million fingerprinted, 500 executed. The constitution the junta writes and the country ratifies in 1982 structures Turkish politics for the next forty years. The coup is presented as the restoration of order. The order it restores is the junta's order.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 6
      p.addFlag('trk_dep_1980_generation')
      p.setMem('trk1980Coup', true)
    },
  },

  // ── ALEVI IDENTITY AND SIVAS ───────────────────────────────────────────────────

  {
    id: 'trk_dep_alevi_identity',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_ALEVI(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.trkAleviIdentity,
    text: `The Alevis are not Sunnis: the reverence for Ali, the cem held in the cemevi rather than the mosque, the poems of Yunus Emre and Pir Sultan Abdal. What you do on a Thursday night is not what the Sunni neighbourhood does. The difference is not always safe; there were massacres at Maraş in 1978 and Çorum in 1980. The state pays for the mosque and does not recognise the cemevi. You learn early what that means about where you stand in the republic.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.addFlag('trk_dep_alevi_generation')
      p.setMem('trkAleviIdentity', true)
    },
  },

  {
    id: 'trk_dep_sivas_massacre',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_ALEVI(G) &&
      G.currentYear === 1993 &&
      G.age >= 10 && G.age <= 35 &&
      !G.mem?.trkSivas,
    text: `July 2, 1993, Sivas, the Alevi festival, and a crowd outside the Madımak Hotel, stirred up over a writer it calls a blasphemer, sets the hotel on fire with the poets and singers inside it. It burns for hours, and the police and the fire brigade are slow to come. The trials run for twenty years, and the statute of limitations runs out before the last of them. You know what your community is to the state from how fast the help came and how slowly the justice did.`,
    context: 'Thirty-five people, most of them Alevi intellectuals and musicians, and two hotel staff died in the Madımak Hotel fire.',
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 9
      p.addFlag('trk_dep_sivas_generation')
      p.setMem('trkSivas', true)
    },
  },

  // ── 1999 İZMİT EARTHQUAKE ─────────────────────────────────────────────────────

  {
    id: 'trk_dep_1999_earthquake',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 1999 &&
      G.age >= 5 &&
      !G.mem?.trk1999Quake,
    text: `August 17, 1999, two minutes past three in the morning, the earthquake near İzmit. The buildings that come down are the ones made with the wrong concrete, or with sea sand instead of river sand, which the whole trade knew about, or with floors added without permits. The fault was already on the maps. What the earthquake shows is the stamps on buildings that should never have passed, and the codes everyone ignored. The ground moves at three in the morning and what was built on corruption comes down.`,
    context: 'The 1999 İzmit earthquake killed about 17,000 people.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 7
      p.h -= 3
      p.addFlag('trk_dep_1999_earthquake')
      p.setMem('trk1999Quake', true)
    },
  },

  // ── GEZI PARK 2013 ────────────────────────────────────────────────────────────

  {
    id: 'trk_dep_gezi_2013',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 2013 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.trkGezi,
    text: 'It begins with thirty people and some tents around trees. The gas comes at five in the morning and by the evening it is Taksim and by the weekend it is eighty cities. In the square there are football supporters handing out lemon juice to lawyers, and a table where three women are marking a map of the pharmacies still open. Somebody has written on the hoarding that this is not about the trees, and then underneath, in another hand, that it is also about the trees.',
    context: 'The Gezi Park sit-in against a shopping development on Taksim Square began on 27 May 2013 and was cleared by police with tear gas on 31 May, after which protests spread to some eighty Turkish cities and drew an estimated 3.5 million participants. Eleven people died. The photograph of a woman in a red dress being gassed at close range became its defining image.',
    choices: [
      {
        text: 'Go to the square. Be in it.',
        tag: null,
        outcome: 'You are in it for days, or weeks, until the clearance comes. You carry the tear gas smell for a while. You carry the rest of it longer.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('trk_dep_gezi_generation'); p.setMem('trkGezi', true) },
      },
      {
        text: 'Watch it from the outside. This is bigger than you can calculate.',
        tag: null,
        outcome: 'You watch from windows and from screens. The event happens without you, and you carry a version of it nonetheless.',
        effect: (p) => { p.e += 2; p.r += 3; p.setMem('trkGezi', true) },
      },
    ],
  },

  // ── JULY 15 2016: THE NIGHT OF THE COUP ATTEMPT ───────────────────────────────

  {
    id: 'trk_dep_2016_coup_night',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_TURKEY(G) &&
      G.currentYear === 2016 &&
      G.age >= 14 &&
      !G.mem?.trk2016Coup,
    text: 'There are jets low over the city at an hour when there are no jets. Just before midnight the president is on a journalist\'s telephone held up to a studio camera, telling everyone to go out into the streets. Then the mosques give the ezan at midnight, all of them at once, and it is not for prayer. Your neighbour goes down to the avenue in his slippers. By three in the morning it is over, and by the following week the dismissals have begun.',
    context: 'On the night of 15 July 2016 a faction of the Turkish armed forces attempted a coup: jets bombed the parliament in Ankara and tanks closed the Bosphorus bridge. President Erdogan appeared via FaceTime on CNN Turk and called people into the streets, and mosques broadcast the ezan through the night. About 250 people died. Roughly 150,000 public employees were dismissed or detained under the two-year state of emergency that followed.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.addFlag('trk_dep_2016_generation')
      p.setMem('trk2016Coup', true)
    },
  },

  // ── THE HEADSCARF DIVIDE ──────────────────────────────────────────────────────

  {
    id: 'trk_dep_headscarf_divide',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.character.gender === 'female' &&
      G.currentYear >= 1985 && G.currentYear <= 2013 &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem?.trkHeadscarf,
    text: `The headscarf ban in universities and government offices: the Republic says the institution needs a secular face; your faith says the head is covered. Some women wear wigs over their scarves; some change in the stairwell; some choose the faith and give up the institution. Your mother says keep it on and your aunt says the career matters more. The ban is lifted in 2013. The argument it was part of goes on in another key.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('trkHeadscarf', true)
    },
  },

  // ── THE HEMŞEHRİLİK NETWORK ───────────────────────────────────────────────────

  {
    id: 'trk_dep_hemşehri',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.trkHemshehri,
    text: `You come to Istanbul or Ankara or İzmir from a town in Anatolia, and the first question is not what you studied but who you know from home. The hemşehri association in the district has your people in it; they know who is hiring and who has a room, and your first job comes through them, not an advertisement. The city is layered this way, Trabzon people here, Erzurum people there. Under the map of the city is a map of where everyone came from.`,
    choices: null,
    effect: (p) => {
      p.s += 3
      p.e += 2
      p.setMem('trkHemshehri', true)
    },
  },

  // ── MANDATORY MILITARY SERVICE ────────────────────────────────────────────────

  {
    id: 'trk_dep_military_service',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TURKEY(G) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1970 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 28 &&
      !G.mem?.trkMilitary,
    text: 'The letter comes and the posting is drawn like a lottery: the coast if you are lucky, the southeast if you are not. In the southeast at night the rifle has a weight that it does not have in the daytime. You come back with a certificate that every employer and every prospective mother-in-law understands on sight. Nobody in your family ever says out loud that a man who has not done it is not quite a man, and everybody proceeds as though they had.',
    context: 'Turkish military service has been compulsory for men since 1927, running between six and twenty-four months depending on period and education level. Postings during the 1984-1999 phase of the PKK conflict frequently sent conscripts to the southeast. The discharge certificate is routinely requested by employers, and paid exemption schemes have been offered periodically since 1999.',
    choices: null,
    effect: (p) => {
      p.e += 2
      p.s += 2
      p.r += 3
      p.addFlag('trk_dep_military_generation')
      p.setMem('trkMilitary', true)
    },
  },

]
