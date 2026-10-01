// events_childhood_place.js — the first five years, from the height of the child.
//
// Early childhood had 67 events against 1,291 for late life, and almost all of
// them could happen anywhere: the photograph, the first steps, the imaginary
// friend, the grandparent who keeps you. A life born in rural Oyo in 1965 and
// one born in a Leningrad kommunalka in 1955 began with the same five
// paragraphs, and most of those paragraphs explained to the reader what a
// small child cannot know.
//
// These are the other half: what a child in one place and time is carried
// through, hears through a wall, smells before it has a word for the thing.
// One or two sentences of image and no commentary, because the child has none.
//
// Every guard names a place (or the live country and its countryside), a
// window of years, and the technology the sentence leans on, read through
// `hasTech` for the country the child is actually in. A shared tally caps the
// module at four per life so the layer textures a childhood rather than
// becoming it.

import { hasTech } from '../../technology.js'

const CAP = 4

// Age window plus the module cap.
const kid = (G, lo = 1, hi = 5) =>
  G.age >= lo && G.age <= hi && (G.mem?.ecpSeen ?? 0) < CAP

const at = (place, ...ids) => !!place && ids.includes(place.id)
const liveName = (G) => (G.currentCountry ?? G.character?.country)?.name
const tech = (G, key) =>
  hasTech(G.currentCountry ?? G.character?.country, key, G.currentYear, { rural: G.ruralUrban === 'rural' })

const tally = (p) => { p.setMem('ecpSeen', (p.mem?.ecpSeen ?? 0) + 1) }

const GULF_TOWNS = ['kw_kuwaitcity', 'bh_manama', 'bh_muharraq', 'qa_doha', 'ae_dubai', 'ae_abudhabi', 'ae_sharjah']
const SAHEL_VILLAGES = ['ne_rural', 'ml_rural', 'bf_rural', 'td_rural', 'ng_rural_north', 'ng_rural_borno', 'sn_fouta']
const ANDEAN_VILLAGES = ['pe_rural', 'pe_cusco_rural', 'pe_puno_rural', 'pe_mantaro_rural', 'pe_ancash_rural', 'bo_rural', 'ec_sierra']
const SOVIET_CITIES = ['ru_moscow', 'ru_spb', 'ua_kyiv', 'by_minsk', 'ge_tbilisi', 'am_yerevan', 'az_baku', 'kz_almaty', 'uz_tashkent', 'lv_riga', 'lt_vilnius', 'ee_tallinn', 'md_chisinau', 'kg_bishkek', 'tj_dushanbe', 'tm_ashgabat']
const SOVIET_VILLAGES = ['ru_rural', 'ua_rural', 'by_rural', 'md_rural']

const ev = (id, weight, when, text, m = 2) => ({
  id: `ecp_${id}`,
  phase: 'early_childhood',
  weight,
  when,
  text,
  choices: null,
  effect: (p) => { p.m += m; tally(p) },
})

export const CHILDHOOD_PLACE_EVENTS = [

  // ── Nigeria ────────────────────────────────────────────────────────────────

  ev('oyo_oja', 20, (G) => kid(G, 0, 2) && at(G.place, 'ng_rural_oyo', 'ng_ibadan') && G.currentYear >= 1930 && G.currentYear <= 1995,
    'You go to market tied onto your mother\'s back with the oja. From there the world is the nape of her neck, the sway of her walking, and a moving row of headties at the height of your face.'),

  ev('harmattan', 18, (G) => kid(G, 2, 5) && liveName(G) === 'Nigeria' && G.season === 'dry' && G.currentYear >= 1930,
    'In the harmattan the mornings are white and your lips split. Your grandmother rubs shea butter into them with her thumb, and you lick it off as soon as she turns away.'),

  ev('lagos_generator', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_lagos', 'ng_port_harcourt', 'ng_enugu', 'ng_ibadan') && G.currentYear >= 1985 && G.currentYear <= 2005,
    'NEPA takes the light most evenings and the generator next door starts with a cough. You learn to sleep inside its noise, and when the light comes back and it stops, the quiet wakes you.'),

  ev('lagos_danfo', 18, (G) => kid(G, 2, 5) && at(G.place, 'ng_lagos') && G.currentYear >= 1972,
    'On the danfo you ride on your mother\'s lap because a child is not a fare. The conductor hangs out of the door shouting "Oshodi, Oshodi" and slaps the roof twice when it is time to go.'),

  ev('kano_buta', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_kano', 'ng_rural_north', 'ng_maiduguri', 'ng_rural_borno') && G.religion?.startsWith('muslim') && G.currentYear >= 1975,
    'Before it is light your father fills the plastic kettle and washes for prayer in the yard. The water runs over his feet into the dust, and you are allowed to hold the kettle when it is empty.'),

  ev('igbo_masquerade', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural_east', 'ng_enugu') && G.currentYear >= 1930,
    'The masquerade comes down the path in a storm of raffia and the bigger children scatter shrieking. Somebody lifts you up to see it. You scream, and all the adults laugh.'),

  ev('delta_creek', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_delta') && G.currentYear >= 1930,
    'The creek runs behind the house and you are forbidden to go near it, so it is the first thing you look for every morning. A woman goes past in a canoe, paddling standing up, with a basin of fish balanced in front of her.'),

  // ── West Africa and the Sahel ──────────────────────────────────────────────

  ev('sahel_pestle', 20, (G) => kid(G, 1, 5) && at(G.place, ...SAHEL_VILLAGES) && G.currentYear <= 2010,
    'The pestles start before light: two women at one mortar, striking in turn, and a clap of the hands thrown in between the strokes. You fall back asleep to it most mornings.'),

  ev('sahel_well', 16, (G) => kid(G, 3, 5) && at(G.place, ...SAHEL_VILLAGES, 'ne_air', 'sn_ferlo') && G.currentYear <= 2010,
    'At the well the rope is longer than anything you have seen. A donkey walks it out across the sand and back, and the bucket comes up a long time after you have stopped expecting it.'),

  ev('accra_kenkey', 18, (G) => kid(G, 2, 5) && at(G.place, 'gh_accra') && G.currentYear >= 1930,
    'Your aunt unwraps the kenkey from its dry husk and gives you the end, sour and warm, with a flake of fried fish and a smear of pepper that makes you cry and ask for more.'),

  ev('ghana_north_room', 18, (G) => kid(G, 1, 5) && at(G.place, 'gh_rural', 'tg_rural', 'bf_rural') && G.currentYear >= 1930,
    'Your grandmother\'s room is round and dark and cool at midday. The floor is beaten smooth and the guinea fowl come in through the low door until somebody shoos them.'),

  ev('dakar_car_rapide', 16, (G) => kid(G, 2, 5) && at(G.place, 'sn_dakar') && G.currentYear >= 1975 && G.currentYear <= 2015,
    'The car rapide is blue and yellow and covered in painted eyes and the names of saints, and the apprentice rides on the back step with one hand on the roof. You wave at him every time and he always waves back.'),

  // ── East and Southern Africa ───────────────────────────────────────────────

  ev('nyanza_lamps', 18, (G) => kid(G, 2, 5) && at(G.place, 'ke_rural') && G.currentYear >= 1955,
    'At night the fishing boats go out onto the lake with their lamps, and from the doorway they look like a town that has floated away from the shore.'),

  ev('ethiopia_coffee', 20, (G) => kid(G, 2, 5) && liveName(G) === 'Ethiopia' && G.currentYear >= 1930,
    'Your mother roasts the beans in a flat pan and carries it round the room so everyone can breathe the smoke, and she holds it under your face too. The incense burns in its little clay dish by the door.'),

  ev('somali_milk', 18, (G) => kid(G, 1, 5) && at(G.place, 'so_galgaduud', 'so_haud', 'so_nugaal', 'so_awdal', 'dj_rural') && G.currentYear >= 1930,
    'The camel milk comes in a woven vessel that has been cleaned with smoke, so the milk tastes of the fire. You drink until your belly is round and somebody laughs at it.'),

  ev('soweto_smoke', 20, (G) => kid(G, 2, 5) && at(G.place, 'za_johannesburg') && G.ethnicity === 'black_south_african' && G.currentYear >= 1955 && G.currentYear <= 2000,
    'In winter every house lights its coal stove at dusk, and the smoke lies over the township so thick that the streetlights are yellow smudges. You cough in your sleep until the spring.'),

  ev('eastern_cape_father', 20, (G) => kid(G, 2, 5) && at(G.place, 'za_rural') && G.ethnicity === 'black_south_african' && G.currentYear >= 1940 && G.currentYear <= 1990 && G.parents?.father?.alive !== false,
    'Your father comes home from the mines at Christmas with a suitcase and a smell of somewhere else. You hide behind your grandmother\'s skirt from him for two whole days.'),

  ev('copperbelt_siren', 18, (G) => kid(G, 2, 5) && at(G.place, 'zm_copperbelt') && G.currentYear >= 1945 && G.currentYear <= 2000,
    'The siren at the mine sounds for the change of shift and every dog on the street howls with it. You howl too, until your mother tells you to stop.'),

  ev('kinshasa_rumba', 18, (G) => kid(G, 2, 5) && at(G.place, 'cd_kinshasa') && G.currentYear >= 1957 && G.currentYear <= 1995 && tech(G, 'radio'),
    'Franco is on the radio in the bar across the street, every evening, and the guitar comes through the wall in long bright runs. You dance in your sleeping cloth until your sister catches you.'),

  // ── North Africa and the Middle East ───────────────────────────────────────

  ev('cairo_roof', 20, (G) => kid(G, 2, 5) && at(G.place, 'eg_cairo') && G.currentYear >= 1930,
    (G) => G.currentYear >= 1995
      ? 'Your grandmother keeps pigeons and rabbits on the roof in wooden coops among the washing. From up there the city is roofs and satellite dishes as far as you can see, and the pigeons go round it twice before they come home.'
      : 'Your grandmother keeps pigeons and rabbits on the roof in wooden coops among the washing. From up there the city is roofs and minarets as far as you can see, and the pigeons go round it twice before they come home.'),

  ev('upper_egypt_saqiya', 18, (G) => kid(G, 1, 5) && at(G.place, 'eg_rural') && G.currentYear >= 1930 && G.currentYear <= 1985,
    'The buffalo walks round and round with a cloth over its eyes, and the waterwheel groans the whole day. You sit on the beam behind it and ride in circles until you are sick.'),

  ev('casablanca_hammam', 18, (G) => kid(G, 2, 5) && at(G.place, 'ma_casablanca', 'ma_rural') && G.currentYear >= 1930,
    'In the hammam your mother scrubs you with black soap and the rough glove until you are pink and shouting. The steam makes every woman\'s voice sound like your mother\'s.'),

  ev('anatolia_tandir', 18, (G) => kid(G, 2, 5) && at(G.place, 'tr_rural') && G.currentYear >= 1930,
    'Your grandmother slaps the dough flat against the inside wall of the tandır and peels it off a minute later, blistered. She gives you the first one, and you burn your fingers on it every time.'),

  ev('istanbul_simit', 16, (G) => kid(G, 2, 5) && at(G.place, 'tr_istanbul') && G.currentYear >= 1930,
    'The simit seller carries a tray of rings on his head and does not hold it. You watch him all the way down the hill, waiting for it to fall.'),

  ev('iran_goldfish', 18, (G) => kid(G, 2, 5) && liveName(G) === 'Iran' && G.currentYear >= 1950,
    'At Nowruz there is a goldfish in a bowl on the cloth, between the wheatgrass and the painted eggs, and you are allowed to feed it. You feed it until the water is cloudy and somebody takes the bowl away.'),

  ev('kabul_kites', 20, (G) => kid(G, 2, 5) && at(G.place, 'af_kabul', 'af_herat') && G.currentYear >= 1955 && G.currentYear <= 1978,
    'On Fridays the roofs are full of men and boys flying kites, and the sky over the house is crossed with string. When one is cut loose, the whole street runs after it, and your brother carries you on his back so you can run too.'),

  ev('yemen_qamariya', 16, (G) => kid(G, 1, 5) && at(G.place, 'ye_sanaa') && G.currentYear >= 1930,
    'The window above yours is a half-moon of coloured glass, and in the afternoon it throws red and green onto the floor. You try to pick the colours up.'),

  ev('marsh_reeds', 20, (G) => kid(G, 1, 5) && at(G.place, 'iq_marshes') && G.currentYear >= 1930 && G.currentYear <= 1991,
    'The house is reeds, the floor is reeds, the island it stands on is reeds and mud. Your father poles the boat between walls of them taller than any man, and you trail your hand in the water until he tells you about the snakes.'),

  ev('bedouin_tent', 18, (G) => kid(G, 1, 5) && (at(G.place, 'jo_rural') || ['bedouin', 'bedouin_jordanian'].includes(G.ethnicity)) && G.ruralUrban === 'rural' && G.currentYear >= 1930 && G.currentYear <= 1975,
    'The tent is woven from goat hair and lets the light through in pinpricks. When it rains the weave swells and closes, and the drumming on the roof is the loudest thing you know.'),

  ev('olive_tarp', 18, (G) => kid(G, 1, 5) && at(G.place, 'ps_village', 'lb_rural', 'sy_rural') && G.currentYear >= 1930,
    'At the olive harvest you are put on the tarp under the tree while the grown-ups beat the branches with sticks. The olives rain down on you, and you shriek, and nobody stops.'),

  ev('kibbutz_house', 20, (G) => kid(G, 1, 5) && at(G.place, 'il_kibbutz') && G.currentYear >= 1950 && G.currentYear <= 1990,
    'You sleep in the children\'s house with the others. Your mother tucks you in and then walks back across the lawn, and you listen to the sprinklers ticking until the night watchwoman comes round with her torch.'),

  ev('gulf_pearl', 20, (G) => kid(G, 1, 5) && at(G.place, ...GULF_TOWNS) && G.currentYear >= 1925 && G.currentYear <= 1955 && !G.ethnicity?.includes('south_asian'),
    'Your father is out on the pearl banks all summer. When the boats come in, the women go down to the shore singing, and you are carried on a hip into the crowd, looking for a face you have half forgotten.'),

  ev('gulf_air_conditioner', 18, (G) => kid(G, 1, 5) && at(G.place, ...GULF_TOWNS, 'sa_riyadh', 'om_muscat') && G.currentYear >= 1965 && G.currentYear <= 1995 && tech(G, 'electricity'),
    'The first sound you know is the air conditioner rattling in the window. When the door opens the heat comes in like a hand on your face.'),

  // ── South Asia ─────────────────────────────────────────────────────────────

  ev('punjab_persian_wheel', 20, (G) => kid(G, 1, 5) && at(G.place, 'pk_rural') && G.currentYear >= 1925 && G.currentYear <= 1975,
    'The bullocks walk the Persian wheel with cloths over their eyes, and the clay pots come up full and tip into the channel one after another. You sit on the beam behind the animals and go round until you are asleep.'),

  ev('lahore_basant', 18, (G) => kid(G, 2, 5) && at(G.place, 'pk_lahore') && G.currentYear >= 1930 && G.currentYear <= 2006,
    'At Basant the whole city is on its roofs and the sky is full of yellow kites. Your uncle lets you hold the spool while he flies, and you hold on with both hands.'),

  ev('up_dung_cakes', 18, (G) => kid(G, 2, 5) && at(G.place, 'in_rural_up') && G.currentYear >= 1925,
    'The dung cakes are drying on the wall of the house, each one with the print of your mother\'s hand pressed into it. You put your hand against one and it is warm and much bigger than yours.'),

  ev('mumbai_chawl', 20, (G) => kid(G, 1, 5) && at(G.place, 'in_mumbai') && G.currentYear >= 1930 && G.currentYear <= 1995,
    'In the chawl the corridor is everybody\'s front room. You are passed from doorway to doorway all morning and fed something at each one, and your mother has to go looking for you at lunch.'),

  ev('delhi_cooler', 18, (G) => kid(G, 1, 5) && at(G.place, 'in_delhi') && G.currentYear >= 1970 && tech(G, 'electricity'),
    'In May the cooler in the window drips through its straw pads and the room smells of wet khus. You sleep on the floor in front of it, with the whole family, through the afternoon.'),

  ev('sylhet_boat', 20, (G) => kid(G, 1, 5) && at(G.place, 'bd_rural') && G.season === 'wet' && G.currentYear >= 1930,
    'In the rains the water comes up to the step of the house, and your uncle brings the boat to the door. You are lifted into it the way you are lifted into bed.'),

  ev('dhaka_rickshaw', 18, (G) => kid(G, 2, 5) && at(G.place, 'bd_dhaka') && G.currentYear >= 1950,
    'The rickshaw has a film star painted on the back and tin flowers on the hood, and its bell is the sound the whole city makes. You ride squeezed between your mother and the shopping.'),

  ev('kandy_perahera', 18, (G) => kid(G, 2, 5) && at(G.place, 'lk_rural', 'lk_colombo') && G.currentYear >= 1930,
    'At the Perahera you are on your father\'s shoulders, and the elephants come past in cloths covered with little lights. The drummers are so loud you feel them in your stomach.'),

  ev('dashain_swing', 18, (G) => kid(G, 2, 5) && liveName(G) === 'Nepal' && G.religion === 'hindu' && G.currentYear >= 1930,
    'For Dashain the men lash four bamboo poles together at the edge of the field and hang a rope swing from them. Your cousin pushes you until your feet are higher than the roof.'),

  // ── Southeast and East Asia ────────────────────────────────────────────────

  ev('mekong_sampan', 20, (G) => kid(G, 1, 5) && at(G.place, 'vn_rural') && G.currentYear >= 1930,
    'Your mother rows the sampan to the floating market standing up, one oar crossed over the other. You sit in the bottom among the bananas and look at the sky.'),

  ev('hanoi_shelter', 20, (G) => kid(G, 2, 5) && at(G.place, 'vn_hanoi') && G.currentYear >= 1965 && G.currentYear <= 1972,
    'When the siren goes your grandmother lifts you down into the round concrete hole in the pavement and crouches over you. The lid is pulled half across. You can see one slice of sky and her knees.'),

  ev('saigon_honda', 18, (G) => kid(G, 2, 5) && at(G.place, 'vn_hcmc') && G.currentYear >= 1993,
    'You ride standing up between your father\'s knees on the motorbike, holding the handlebars as if you were steering. The whole family is on it, and the city flows round you like water.'),

  ev('kampong_palm', 18, (G) => kid(G, 2, 5) && at(G.place, 'kh_rural') && (G.currentYear <= 1970 || G.currentYear >= 1985),
    'Your uncle climbs the sugar palm barefoot with bamboo tubes on his hip and comes down with them full. He lets you drink from one, and it is the sweetest thing that has ever happened.'),

  ev('isan_sticky_rice', 18, (G) => kid(G, 1, 5) && at(G.place, 'th_rural', 'la_lowland') && G.currentYear >= 1930,
    'The sticky rice comes in a woven basket with a lid. You learn to pull off a piece and roll it into a ball with your fingers before you learn to say rice.'),

  ev('java_wayang', 20, (G) => kid(G, 2, 5) && at(G.place, 'id_rural', 'id_jakarta') && G.currentYear >= 1930,
    'The wayang goes on all night. You fall asleep on a mat with your head in your aunt\'s lap and wake at dawn to find the shadow puppets still fighting on the screen.'),

  ev('visayas_carabao', 18, (G) => kid(G, 2, 5) && at(G.place, 'ph_rural') && G.currentYear >= 1930,
    'Your grandfather puts you on the carabao\'s back while it stands in the mud. It is wide and warm and smells of the river, and it does not mind you at all.'),

  ev('manila_jeepney', 18, (G) => kid(G, 2, 5) && at(G.place, 'ph_manila', 'ph_cebu') && G.currentYear >= 1950,
    'The jeepney has horses on the bonnet and a saint on the dashboard. The fare goes hand to hand down the bench to the driver, and the change comes back the same way, and you are given it to hold.'),

  ev('kampung_stilts', 18, (G) => kid(G, 1, 5) && at(G.place, 'my_kampung', 'my_longhouse') && G.currentYear >= 1930,
    'The house stands on stilts and the chickens live underneath it. Through the gaps in the floorboards you can watch them, and they can watch you.'),

  ev('beijing_briquettes', 18, (G) => kid(G, 2, 5) && at(G.place, 'cn_beijing') && G.currentYear >= 1955 && G.currentYear <= 1995,
    'In winter the coal briquettes are stacked against the courtyard wall, round, with holes through them like a honeycomb. You put your finger in the holes and your hands come away black.'),

  ev('shanghai_nightpots', 18, (G) => kid(G, 1, 5) && at(G.place, 'cn_shanghai') && G.currentYear >= 1930 && G.currentYear <= 1990,
    'At dawn the women wash the night pots at the tap at the end of the lane, with bamboo brushes that scrape and rattle. It is the sound that wakes you every morning of your life so far.'),

  ev('sichuan_loudspeaker', 20, (G) => kid(G, 2, 5) && at(G.place, 'cn_rural', 'cn_chongqing') && G.currentYear >= 1966 && G.currentYear <= 1976,
    'The loudspeaker on the pole by the threshing ground plays "The East Is Red" every morning before the work begins. You sing it to the chickens.'),

  ev('tohoku_irori', 20, (G) => kid(G, 1, 5) && at(G.place, 'jp_rural') && G.currentYear >= 1925 && G.currentYear <= 1965,
    'In winter the snow comes up to the eaves and the house is dark at noon. Your grandmother keeps the fire going in the sunken hearth, and the kettle hangs over it on its hook, ticking.'),

  ev('tokyo_sento', 18, (G) => kid(G, 2, 5) && at(G.place, 'jp_tokyo', 'jp_osaka') && G.currentYear >= 1946 && G.currentYear <= 1975,
    'Every evening you go to the bathhouse with your mother and a basin. There is a mountain painted on the wall above the water, and old women who let you float in their arms.'),

  ev('seoul_yeontan', 20, (G) => kid(G, 1, 5) && at(G.place, 'kr_seoul', 'kr_gwangju') && G.currentYear >= 1955 && G.currentYear <= 1990,
    'The floor is warm from the coal briquette under it, and your mother gets up in the dark to change it. You hear her lift the lid and set the new one in with tongs, and you go back to sleep on the warm floor.'),

  ev('jeolla_gimjang', 18, (G) => kid(G, 2, 5) && at(G.place, 'kr_rural') && G.season === 'autumn' && G.currentYear >= 1930,
    'For gimjang the women of three houses salt cabbages in the yard all day, and their hands go red to the elbow. They put a strip of it in your mouth and watch your face.'),

  ev('mongol_ger', 20, (G) => kid(G, 1, 5) && at(G.place, 'mn_steppe', 'kg_jailoo') && G.currentYear >= 1930,
    'The ger is round and the smoke goes up through the hole in the roof. You lie on the felt and look up through the crown at the stars, and the dog sleeps against the wall outside.'),

  ev('ub_ger_smoke', 16, (G) => kid(G, 2, 5) && at(G.place, 'mn_ulaanbaatar') && G.currentYear >= 1990 && G.season === 'winter',
    'In winter the whole valley burns coal in its stoves at once, and the smoke sits on the ger district until you cannot see the hill. Your grandmother ties a scarf over your mouth to go out.'),

  // ── The Soviet Union ───────────────────────────────────────────────────────

  ev('kommunalka_bells', 20, (G) => kid(G, 2, 5) && at(G.place, ...SOVIET_CITIES) && G.currentYear >= 1930 && G.currentYear <= 1990,
    'There are six bells by the front door of the flat, one for each family, and you know which ring is yours before you know your own surname. In the kitchen there are six tables and a neighbour who is always at the stove.'),

  ev('soviet_tangerines', 18, (G) => kid(G, 2, 5) && at(G.place, ...SOVIET_CITIES) && G.season === 'winter' && G.currentYear >= 1950 && G.currentYear <= 1991,
    'At New Year there is a tree with glass ornaments and a cotton-wool Ded Moroz under it, and tangerines. The whole flat smells of tangerine peel for a week.'),

  ev('village_stove', 20, (G) => kid(G, 1, 5) && at(G.place, ...SOVIET_VILLAGES) && G.currentYear >= 1930 && G.currentYear <= 1985,
    'You sleep on top of the big stove with your grandmother, under a sheepskin, where it is warmest. In the morning she climbs down first and lights it again.'),

  ev('tbilisi_singing', 16, (G) => kid(G, 2, 5) && at(G.place, 'ge_tbilisi', 'ge_rural') && G.currentYear >= 1930,
    'At the long table the men sing in three voices that do not agree and then suddenly do. You fall asleep on a pile of coats in the next room to the sound of it.'),

  // ── Europe ─────────────────────────────────────────────────────────────────

  ev('rubble', 20, (G) => kid(G, 2, 5) && at(G.place, 'de_berlin', 'de_leipzig', 'pl_warsaw', 'by_minsk', 'ua_kyiv', 'hu_budapest') && G.currentYear >= 1945 && G.currentYear <= 1952,
    'Women stand in a line on the rubble passing bricks from hand to hand and knocking the old mortar off with hammers. You sit on the pile and are given one brick to hold.'),

  ev('ddr_sandman', 18, (G) => kid(G, 2, 5) && at(G.place, 'de_leipzig', 'de_rural_east') && G.currentYear >= 1960 && G.currentYear <= 1989 && tech(G, 'television'),
    'At ten to seven the Sandmännchen comes on the television, and when he has thrown his sand it is bedtime. You argue with this every single night.'),

  ev('manchester_coalman', 18, (G) => kid(G, 2, 5) && at(G.place, 'uk_manchester') && G.currentYear >= 1930 && G.currentYear <= 1968,
    'The coal man comes up the entry with a sack on his back and a leather cape over his shoulders, black from his hair to his boots. He tips it into the coal hole with a roar, and you are made to stay inside.'),

  ev('mayo_angelus', 18, (G) => kid(G, 2, 5) && at(G.place, 'ie_rural') && G.currentYear >= 1950 && G.currentYear <= 1975 && tech(G, 'radio'),
    'At six the Angelus bell rings on the wireless and your grandfather stops with the cup halfway to his mouth. The turf fire settles in the grate. Then he drinks, and the evening goes on.'),

  ev('extremadura_era', 16, (G) => kid(G, 2, 5) && at(G.place, 'es_rural', 'pt_rural') && G.currentYear >= 1930 && G.currentYear <= 1965,
    'At the threshing floor the mule drags the sledge round and round over the wheat, and you are allowed to ride on it with your uncle. The chaff gets inside your clothes and itches until night.'),

  ev('sicily_saint', 18, (G) => kid(G, 2, 5) && at(G.place, 'it_rural') && G.religion === 'christian_catholic' && G.currentYear >= 1930,
    'The saint comes down the street on the shoulders of twenty men, swaying, covered in banknotes pinned to his robes. Your mother lifts you to pin one on, and his painted face is very close.'),

  ev('greek_easter', 18, (G) => kid(G, 2, 5) && liveName(G) === 'Greece' && G.religion === 'christian_orthodox' && G.season === 'spring' && G.currentYear >= 1930,
    'At midnight the church goes dark and then a flame comes out of the altar and passes from candle to candle to the door. Your father cups his hand round yours so it does not go out on the walk home.'),

  ev('lucia_crown', 16, (G) => kid(G, 2, 5) && liveName(G) === 'Sweden' && G.season === 'winter' && G.currentYear >= 1930,
    'Before it is light a girl in a white gown comes into the room with candles in her hair, singing, and the others behind her carry candles too. You are not sure whether you are awake.'),

  ev('finnish_sauna', 16, (G) => kid(G, 2, 5) && liveName(G) === 'Finland' && G.currentYear >= 1930,
    'In the sauna you sit on the lowest bench, where it is coolest, and watch your grandfather throw water on the stones. The hiss climbs the walls, and then the heat comes down onto your shoulders.'),

  // ── The Americas ───────────────────────────────────────────────────────────

  ev('detroit_whistle', 18, (G) => kid(G, 2, 5) && at(G.place, 'us_detroit') && G.currentYear >= 1945 && G.currentYear <= 1980,
    'The plant whistle blows at the end of the shift, and ten minutes later your father\'s car turns into the street. You know the sound of his engine from all the others.'),

  ev('alabama_fans', 20, (G) => kid(G, 2, 5) && at(G.place, 'us_rural_south', 'us_atlanta') && G.ethnicity === 'black_american' && G.currentYear >= 1930 && G.currentYear <= 1980,
    'In church the women fan themselves with cardboard fans on wooden sticks, a picture of Jesus on one side and the funeral home on the other. Your grandmother fans you too, slow, all through the sermon.'),

  ev('iowa_cellar', 16, (G) => kid(G, 2, 5) && at(G.place, 'us_rural_midwest') && G.season === 'summer' && G.currentYear >= 1930,
    'When the sky goes green your mother carries you down to the cellar and you sit among the jars of tomatoes with a flashlight. Upstairs something bangs over and over, and then it stops.'),

  ev('nyc_hydrant', 18, (G) => kid(G, 2, 5) && at(G.place, 'us_nyc') && G.season === 'summer' && G.currentYear >= 1930,
    'Somebody opens the hydrant with a wrench and the whole street runs through it. You are held in the spray by your older cousin until you cannot breathe from laughing.'),

  ev('cdmx_camote', 20, (G) => kid(G, 2, 5) && at(G.place, 'mx_mexico_city') && G.currentYear >= 1940,
    'At night the camote cart comes down the street with its steam whistle screaming. Your father goes out in his slippers and comes back with sweet potato and condensed milk, and you are allowed to stay up for it.'),

  ev('oaxaca_comal', 18, (G) => kid(G, 1, 5) && at(G.place, 'mx_rural') && G.currentYear >= 1930,
    'Your grandmother pats the tortillas out between her palms and lays them on the comal, and the clapping is the sound of every morning. She gives you a small one, made just for your hand.'),

  ev('maya_loom', 20, (G) => kid(G, 1, 5) && at(G.place, 'gt_rural') && G.currentYear >= 1930,
    'Your mother weaves on the backstrap loom tied to the post of the house, leaning back into it, and you sit in the curve of her lap while the colours grow out from under her hands.'),

  ev('andes_lliclla', 20, (G) => kid(G, 0, 2) && at(G.place, ...ANDEAN_VILLAGES) && G.currentYear >= 1930,
    'You travel on your mother\'s back in the striped cloth, up the slope to the field and back down again. From there the world is the brim of her hat and the mountain behind it.'),

  ev('rio_kites', 18, (G) => kid(G, 2, 5) && at(G.place, 'br_rio', 'br_sao_paulo') && G.neighborhoodTier === 'informal' && G.currentYear >= 1960,
    'In the afternoon the boys fly kites from the top of the hill, and the sky over the roofs is full of them. When one comes down on your roof your brother climbs up after it and you hold the ladder, or think you do.'),

  ev('salvador_iemanja', 18, (G) => kid(G, 2, 5) && at(G.place, 'br_salvador') && G.currentYear >= 1930,
    'On the second of February the beach is white with people and flowers. Your grandmother puts a comb and a little bottle of perfume in the boat for Iemanjá, and lets you push it into the water.'),

  ev('sertao_mandacaru', 16, (G) => kid(G, 2, 5) && at(G.place, 'br_rural') && G.season === 'dry' && G.currentYear >= 1930,
    'In the dry months everything is grey except the cactus. Your father burns the spines off with a torch and feeds the pads to the goat, and you are allowed to watch from the step.'),

  ev('pampa_mate', 16, (G) => kid(G, 2, 5) && liveName(G) === 'Argentina' && G.currentYear >= 1930,
    'The grown-ups pass the mate round the circle and skip you every time. You watch the silver straw go from mouth to mouth until somebody gives you a sip, and it is so bitter you spit it out.'),

  ev('havana_multiki', 20, (G) => kid(G, 2, 5) && at(G.place, 'cu_havana', 'cu_santiago') && G.currentYear >= 1975 && G.currentYear <= 1991 && tech(G, 'television'),
    'The cartoons on television are Russian, a wolf who never catches the hare, and you watch them sitting on the floor in front of the fan. The ration book lives in the kitchen drawer and you are not allowed to touch it.'),

  ev('kingston_sound', 18, (G) => kid(G, 2, 5) && at(G.place, 'jm_kingston') && G.currentYear >= 1955,
    'On Saturday nights the sound system sets up in the yard down the road and the bass comes through the zinc fence and into your bed. You fall asleep with it in your chest.'),

  ev('haiti_tap_tap', 16, (G) => kid(G, 2, 5) && at(G.place, 'ht_port_au_prince') && G.currentYear >= 1960,
    'The tap-tap is painted all over with birds and saints and a verse from the Bible, and somebody bangs on the side twice to make it stop. You ride on your grandmother\'s knees in the back.'),

  // ── Oceania ────────────────────────────────────────────────────────────────

  ev('queensland_rain', 16, (G) => kid(G, 2, 5) && at(G.place, 'au_rural') && G.currentYear >= 1930,
    'When the rain comes it comes all at once on the tin roof, and nobody in the house can hear anybody else. Your mother stops talking and smiles, and you both wait.'),

  // ── The places most lives begin in, a second and third scene ───────────────
  // The birth draw puts most characters in a handful of places — the Kano
  // villages, Benue, rural Uttar Pradesh, Nyanza, the Mekong, rural Sichuan,
  // Leipzig — and one scene per place meant one per life at most.

  ev('kano_groundnuts', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural_north', 'ng_kano') && G.currentYear >= 1948 && G.currentYear <= 1974,
    'Your father lifts you onto his shoulders to see the groundnut pyramids at the edge of the city, sacks stacked higher than the mosque, with men walking up the sides of them like ants.'),

  ev('north_henna', 18, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural_north', 'ng_kano', 'ng_rural_borno', 'ng_maiduguri', 'ne_rural', 'ne_niamey') && G.religion?.startsWith('muslim') && G.currentYear >= 1930,
    'Before the wedding the women sit in the yard with their hands and feet wrapped in henna paste and cloth, and they let you have one finger done. It comes out orange, and you hold it up to everyone.'),

  ev('north_recitation', 18, (G) => kid(G, 1, 4) && at(G.place, 'ng_rural_north', 'ng_kano', 'ng_rural_borno', 'sn_fouta', 'ml_rural', 'ne_rural') && G.religion?.startsWith('muslim') && G.currentYear >= 1930,
    'From the next compound comes the sound of boys reciting, the same line over and over in high voices, and you know the line long before you know what any of it means.'),

  ev('benue_yams', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural') && G.currentYear >= 1930,
    'The yams are tied upright on poles in the barn, rows and rows of them, each with its own twist of grass. You are told to count them and lose count, and start again.'),

  ev('benue_kwagh_hir', 20, (G) => kid(G, 3, 5) && at(G.place, 'ng_rural') && G.currentYear >= 1962,
    'The kwagh-hir comes to the village at night: puppets of animals and spirits taller than men, moving on a stage of cloth while the drummers sing. A python comes out with a man inside it, and you do not sleep.'),

  ev('oyo_cocoa', 18, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural_oyo', 'ng_ibadan', 'gh_accra', 'ci_cocoa') && G.currentYear >= 1930 && G.currentYear <= 1995,
    'The cocoa beans are spread on mats across the whole yard to dry, and you are told not to walk on them. You walk on them. They are warm and they crunch.'),

  ev('delta_flare', 20, (G) => kid(G, 2, 5) && at(G.place, 'ng_delta', 'ng_port_harcourt') && G.currentYear >= 1962,
    'At night the sky above the trees is orange from the gas flare and it never goes out. You think it is where the sun goes to sleep, and nobody corrects you.'),

  ev('delta_smoke_fish', 16, (G) => kid(G, 1, 5) && at(G.place, 'ng_delta') && G.currentYear >= 1930,
    'Your mother smokes fish on a rack over the fire behind the house, and the smoke gets into your hair and your sleeping mat and the inside of your nose.'),

  ev('east_palm_wine', 18, (G) => kid(G, 2, 5) && at(G.place, 'ng_rural_east', 'ng_enugu') && G.currentYear >= 1930,
    'The tapper comes down the palm with the gourd on his hip, and the wine in it is white and fizzing and full of tiny insects. Your grandfather lets you dip one finger in.'),

  ev('south_june_bug', 18, (G) => kid(G, 3, 5) && at(G.place, 'us_rural_south') && G.season === 'summer' && G.currentYear >= 1930,
    'Your cousin ties a thread to a june bug\'s leg and gives you the other end, and it flies round your head in circles, buzzing, green as a bottle.'),

  ev('south_washtub', 18, (G) => kid(G, 1, 4) && at(G.place, 'us_rural_south', 'us_rural_midwest') && G.currentYear >= 1930 && G.currentYear <= 1958,
    'On Saturday night the tin tub is filled in the kitchen with water from the stove, and you go in last, after the others, when it is grey and only just warm.'),

  ev('midwest_party_line', 18, (G) => kid(G, 2, 5) && at(G.place, 'us_rural_midwest', 'us_rural_south', 'ca_rural') && G.currentYear >= 1935 && G.currentYear <= 1965 && tech(G, 'landline'),
    'The telephone on the kitchen wall rings two longs and a short for your house, and other rings for the neighbours. Your mother picks up the neighbours\' anyway, and holds a finger to her lips.'),

  ev('midwest_county_fair', 18, (G) => kid(G, 2, 5) && at(G.place, 'us_rural_midwest') && G.currentYear >= 1930,
    'At the county fair your father lifts you over the rail to see the biggest hog in the barn. It is asleep, with a blue ribbon on its pen and flies on its ears.'),

  ev('chicago_el', 16, (G) => kid(G, 2, 5) && at(G.place, 'us_chicago') && G.currentYear >= 1930,
    'The train goes over the street on iron legs, and when it passes the whole kitchen shakes and the cups talk in the cupboard. You stop whatever you are doing and wait for it.'),

  ev('miami_shutters', 16, (G) => kid(G, 2, 5) && at(G.place, 'us_miami', 'us_houston', 'cu_havana') && G.currentYear >= 1930,
    'When the hurricane comes your father nails boards over the windows and the house goes dark in the middle of the day. You eat cold beans by candlelight and listen to the wind trying the door.'),

  ev('up_handpump', 20, (G) => kid(G, 3, 5) && at(G.place, 'in_rural_up') && G.currentYear >= 1978,
    'You hang off the handle of the handpump with both hands and your whole weight, and a thin cough of water comes out. Your sister does it with one hand and fills the pot.'),

  ev('up_ramlila', 20, (G) => kid(G, 3, 5) && at(G.place, 'in_rural_up', 'in_delhi') && G.religion === 'hindu' && G.currentYear >= 1930,
    'At the Ramlila the boy playing Hanuman has a tail of rope and a red face, and when he leaps off the stage at the crowd you hide yours in your father\'s shirt.'),

  ev('up_eid_sevaiyan', 18, (G) => kid(G, 2, 5) && at(G.place, 'in_rural_up', 'in_delhi', 'in_mumbai') && G.religion?.startsWith('muslim') && G.currentYear >= 1930,
    'On Eid morning your grandmother makes sevaiyan in milk with cardamom, and everyone who comes to the door is given a bowl. You are given four, one from each house you are carried into.'),

  ev('up_cricket_radio', 18, (G) => kid(G, 3, 5) && at(G.place, 'in_rural_up', 'pk_rural', 'bd_rural') && G.currentYear >= 1962 && tech(G, 'radio'),
    'The men sit round the transistor radio on the charpai for the cricket, and when a wicket falls they all shout at once. You shout too, a moment late.'),

  ev('first_rain', 18, (G) => kid(G, 2, 5) && at(G.place, 'in_rural_up', 'in_delhi', 'pk_rural', 'pk_lahore', 'bd_dhaka') && G.season === 'wet' && G.currentYear >= 1930,
    'The first rain comes after weeks of white heat, and the dust gives off a smell you will know all your life. The children run out into the lane and you are not stopped.'),

  ev('ddr_creche', 20, (G) => kid(G, 1, 3) && at(G.place, 'de_leipzig', 'de_rural_east') && G.currentYear >= 1962 && G.currentYear <= 1989,
    'Your mother hands you over at the crèche at six in the morning on her way to the shift. All the children sit on potties in a row at the same time, and you are one of them.'),

  ev('ddr_two_stroke', 16, (G) => kid(G, 2, 5) && at(G.place, 'de_leipzig', 'de_rural_east') && G.currentYear >= 1962 && G.currentYear <= 1991,
    'The street smells of two-stroke exhaust, a blue sweet smoke. When your uncle\'s Trabant starts in the yard it sounds like a sewing machine, and you run to the window.'),

  ev('st_martin', 18, (G) => kid(G, 3, 5) && liveName(G) === 'Germany' && (at(G.place, 'de_rural', 'de_berlin') || G.currentYear >= 1991) && G.season === 'autumn' && G.currentYear >= 1950,
    'For St Martin you carry a paper lantern on a stick through the dark with the other children, singing. Yours catches fire at the bottom, and you watch it burn down to the stick.'),

  ev('bavaria_cows', 16, (G) => kid(G, 2, 5) && at(G.place, 'de_rural', 'at_rural', 'ch_rural') && G.season === 'autumn' && G.currentYear >= 1930,
    'In September the cows come down from the high pasture wearing flowers and great bells, and the whole village stands at the roadside. The noise of the bells goes right through you.'),

  ev('japan_goldfish', 18, (G) => kid(G, 3, 5) && liveName(G) === 'Japan' && G.season === 'summer' && G.currentYear >= 1950,
    'At the summer festival you try to scoop a goldfish with a paper paddle, and the paper tears every time. The man gives you one anyway, in a plastic bag of water tied with string.'),

  ev('tohoku_paddy', 18, (G) => kid(G, 1, 4) && at(G.place, 'jp_rural', 'kr_rural') && G.season === 'summer' && G.currentYear >= 1930,
    'At night the frogs in the paddies are so loud that you cannot hear your own breathing. When the window is shut they are still there, quieter, all round the house.'),

  ev('hiroshima_streetcar', 16, (G) => kid(G, 2, 5) && at(G.place, 'jp_hiroshima', 'jp_nagasaki') && G.currentYear >= 1950,
    'The streetcar comes down the middle of the road with its bell going, and you are lifted up the high step onto it. You kneel on the seat to look out of the back.'),

  ev('sertao_donkey', 18, (G) => kid(G, 2, 5) && at(G.place, 'br_rural') && G.currentYear >= 1930,
    'The donkey goes down to the reservoir with four tin cans hanging off it and comes back slower, with water slopping out of the tops. You are allowed to walk at its head and hold the rope.'),

  ev('sertao_forro', 16, (G) => kid(G, 2, 5) && at(G.place, 'br_rural', 'br_northeast') && G.currentYear >= 1950 && tech(G, 'radio'),
    'On Saturday the accordion comes over the radio and the grown-ups dance in the yard on the swept dirt. Somebody swings you up onto a hip and dances you too.'),

  ev('fortaleza_jangada', 18, (G) => kid(G, 2, 5) && at(G.place, 'br_northeast') && G.currentYear >= 1930,
    'In the afternoon the jangadas come in through the surf with their white triangle sails, and the men drag them up the sand on logs. You are allowed to sit in one while it is still wet.'),

  ev('sp_feira', 16, (G) => kid(G, 2, 5) && at(G.place, 'br_sao_paulo', 'br_rio') && G.currentYear >= 1950,
    'On market day the street is closed and covered in stalls, and your grandmother buys you a pastel so hot you have to hold it by the paper and blow on it while the stall men shout.'),

  ev('timkat', 20, (G) => kid(G, 2, 5) && liveName(G) === 'Ethiopia' && G.religion === 'christian_orthodox' && G.season === 'dry' && G.currentYear >= 1930,
    'At Timkat the priests carry the tablets down to the water under fringed velvet umbrellas, and the drums and the women\'s ululation come in waves. Somebody throws water over the crowd, and over you.'),

  ev('ethiopia_whip', 16, (G) => kid(G, 2, 5) && at(G.place, 'et_rural', 'et_gojjam', 'et_wollo') && G.currentYear >= 1930,
    'Your brother takes the goats out at first light and cracks a long braided whip over them. The sound comes back off the hill, and the dog barks at the hill.'),

  ev('ethiopia_rains', 16, (G) => kid(G, 1, 4) && at(G.place, 'et_rural', 'et_gojjam', 'et_wollo') && G.season === 'wet' && G.currentYear >= 1930,
    'In the big rains the house is full of smoke and people and nobody goes far. You sit by the fire wrapped in a gabi with only your face out, and listen to the water coming off the thatch.'),

  ev('nyanza_omena', 16, (G) => kid(G, 2, 5) && at(G.place, 'ke_rural') && G.currentYear >= 1950,
    'The little silver fish are spread out on the rocks by the shore to dry, thousands of them, and the smell of them is the smell of the whole beach. You are given a handful to eat like sweets.'),

  ev('nyanza_cane', 16, (G) => kid(G, 2, 5) && at(G.place, 'ke_rural', 'ug_rural') && G.currentYear >= 1930,
    'Your uncle cuts you a length of sugar cane with his panga and strips it with his teeth to show you how. Your jaw aches, and the juice runs to your elbows.'),

  ev('russia_banya', 18, (G) => kid(G, 2, 5) && at(G.place, ...SOVIET_VILLAGES, 'kz_rural') && G.currentYear >= 1930,
    'On Saturday the banya is lit, and your grandfather beats himself with a birch broom until he is red, and then beats you, gently, and pours cold water on your head.'),

  ev('soviet_dacha', 16, (G) => kid(G, 2, 5) && at(G.place, 'ru_moscow', 'ru_spb', 'ua_kyiv', 'by_minsk', 'lv_riga') && G.season === 'summer' && G.currentYear >= 1958 && G.currentYear <= 2000,
    'In summer you are taken out to the dacha on the electric train with the seedlings on everybody\'s knees. Your grandmother lets you eat the strawberries straight off the plants, warm, with the dirt on.'),

  ev('moscow_metro', 16, (G) => kid(G, 2, 5) && at(G.place, 'ru_moscow', 'ru_spb', 'ua_kyiv') && G.currentYear >= 1955,
    'In the metro there are chandeliers and marble walls, and the escalator goes down for so long that you stop being afraid of it halfway. Your mother holds your hood.'),

  ev('egypt_fanous', 20, (G) => kid(G, 2, 5) && liveName(G) === 'Egypt' && G.religion?.startsWith('muslim') && G.currentYear >= 1930,
    'In Ramadan you are given a tin lantern with coloured glass and a candle in it, and you go out after dark with the other children swinging them and singing the song for the lantern.'),

  ev('egypt_canal', 16, (G) => kid(G, 2, 5) && at(G.place, 'eg_rural') && G.currentYear >= 1930,
    'The boys take the buffalo down into the canal in the afternoon and climb on its back, and it stands in the brown water with only its nose and its eyes out. You watch from the bank, from your sister\'s hip.'),

  ev('china_firecrackers', 18, (G) => kid(G, 2, 5) && at(G.place, 'cn_rural', 'cn_chongqing', 'cn_beijing', 'cn_shanghai') && G.season === 'winter' && G.currentYear >= 1930,
    'At New Year the firecrackers go on all night, and in the morning the lane is ankle-deep in red paper. You are given a coin wrapped in red and told not to lose it, and lose it.'),

  ev('sichuan_back_basket', 18, (G) => kid(G, 0, 2) && at(G.place, 'cn_rural', 'vn_rural_north') && G.currentYear >= 1930,
    'You ride in a bamboo basket on your mother\'s back while she works the field. Through the gaps in the weave you watch the ground go by, and the water, and her feet.'),

  ev('mexico_marigolds', 18, (G) => kid(G, 2, 5) && liveName(G) === 'Mexico' && G.season === 'autumn' && G.currentYear >= 1930,
    'For the Day of the Dead your grandmother lays a path of orange marigold petals from the door to the altar, so the dead can find the house. You walk on it and are told off, gently.'),

  ev('mexico_burro', 16, (G) => kid(G, 2, 5) && at(G.place, 'mx_rural', 'gt_rural') && G.currentYear >= 1930,
    'The burro carries the firewood down from the hill, and you ride on top of the firewood. It sways and you hold on to the rope, and nobody walking beside you is worried.'),

  ev('poland_stork', 20, (G) => kid(G, 2, 5) && at(G.place, 'pl_rural', 'lt_rural', 'lv_rural', 'by_rural', 'ua_rural') && G.season === 'spring' && G.currentYear >= 1930,
    'The storks come back to the nest on the barn roof, and your grandmother says it is the same pair as last year. They clatter their beaks at each other, and you clatter your teeth back at them.'),

  ev('poland_wigilia', 18, (G) => kid(G, 3, 5) && liveName(G) === 'Poland' && G.religion === 'christian_catholic' && G.season === 'winter' && G.currentYear >= 1930,
    'On Christmas Eve there is hay under the white tablecloth and an empty place laid for whoever comes. You are sent to the window to watch for the first star, and you see it first.'),

  ev('warsaw_palace', 16, (G) => kid(G, 2, 5) && at(G.place, 'pl_warsaw') && G.currentYear >= 1955,
    'From anywhere in the city you can see the Palace of Culture, a great stone wedding cake with a spike on top. You think it belongs to your family because your father points at it from the window.'),

  ev('london_rag_and_bone', 18, (G) => kid(G, 2, 5) && at(G.place, 'uk_london', 'uk_manchester') && G.currentYear >= 1930 && G.currentYear <= 1970,
    'The rag-and-bone man comes down the street with a horse and cart, calling something nobody can understand. Your mother gives him an old coat, and he gives you a goldfish in a jar.'),

  ev('uk_milk_float', 16, (G) => kid(G, 1, 5) && at(G.place, 'uk_london', 'uk_manchester', 'uk_rural') && G.currentYear >= 1950 && G.currentYear <= 1995,
    'Before it is light the milk float hums down the street and the bottles chink on the step. On cold mornings the birds have pecked through the foil tops to the cream.'),

  ev('yorkshire_lamb', 18, (G) => kid(G, 2, 5) && at(G.place, 'uk_rural', 'ie_rural', 'nz_rural') && G.season === 'spring' && G.currentYear >= 1930,
    'There is a lamb in a box by the range that its mother would not take. You are allowed to hold the bottle while it drinks, and it pulls so hard the bottle nearly goes.'),

  ev('vietnam_banh_chung', 20, (G) => kid(G, 2, 5) && liveName(G) === 'Vietnam' && G.season === 'dry' && G.currentYear >= 1930,
    'Before Tết the rice cakes boil all night in the big pot in the yard, wrapped in green leaves, and the grown-ups take turns to sit up with the fire. You are allowed to stay up until you fall asleep against your uncle.'),

  ev('red_river_buffalo', 18, (G) => kid(G, 2, 5) && at(G.place, 'vn_rural_north', 'vn_rural', 'kh_rural', 'la_lowland') && G.currentYear >= 1930,
    'The buffalo boys lie along the animals\' backs in the shallow water, and one of them lets you sit in front of him. The buffalo is slow and hot and smells of mud.'),

  ev('punjab_tandoor', 18, (G) => kid(G, 2, 5) && at(G.place, 'pk_rural', 'pk_lahore') && G.currentYear >= 1930,
    'In the evening the women of the lane bake at the clay oven in the corner of the courtyard, and you sit by it for the heat and are given the first one, too hot, folded.'),

  ev('pakistan_eid_bangles', 18, (G) => kid(G, 3, 5) && liveName(G) === 'Pakistan' && G.character?.gender === 'female' && G.religion?.startsWith('muslim') && G.currentYear >= 1950,
    'On the night before Eid your aunt draws henna on your palms and buys you glass bangles from the man in the bazaar, too many, and you sleep with your hands held out so the henna will not smudge.'),

  ev('punjab_tube_well', 16, (G) => kid(G, 2, 5) && at(G.place, 'pk_rural', 'in_rural_up') && G.currentYear >= 1968 && tech(G, 'electricity'),
    'The tube well thumps all night at the edge of the fields, and in the heat of the afternoon the bigger children sit in the tank under the spout. You are put in at the edge and shriek at the cold.'),

  ev('java_sawah', 18, (G) => kid(G, 1, 4) && at(G.place, 'id_rural') && G.currentYear >= 1930,
    'Your grandmother carries you along the narrow banks between the rice fields, and the water on either side is full of sky. You lean down to touch it and she leans the other way.'),

  ev('jakarta_becak', 16, (G) => kid(G, 2, 5) && at(G.place, 'id_jakarta') && G.currentYear >= 1945 && G.currentYear <= 1990,
    'You ride to market in a becak with your mother, in the seat at the front, with the driver pedalling behind you. It feels like going very fast with nobody steering.'),

  ev('saemaul_roofs', 20, (G) => kid(G, 2, 5) && at(G.place, 'kr_rural') && G.currentYear >= 1971 && G.currentYear <= 1979,
    'All the men of the village are up on the roofs, pulling off the old rice straw and putting on slate in orange and blue. A song comes from the loudspeaker about the new village, and you know it by the end of the week.'),

  ev('korea_cicadas', 16, (G) => kid(G, 2, 5) && at(G.place, 'kr_rural', 'kr_seoul', 'kr_gwangju') && G.season === 'summer' && G.currentYear >= 1930,
    'In August the cicadas in the zelkova by the house are so loud they sound like the heat itself. Your brother catches one and puts it in your hand, and it buzzes against your palm.'),
]
