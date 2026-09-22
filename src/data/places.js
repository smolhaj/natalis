// Geographic place data: 389 places, at least one for every country on the roster.
//
// It was 197 across 83 of 154, and `pickBirthPlace` returns null for a country
// with none — which left `currentPlace`, `character.birthPlace` and
// `currentNeighborhoodName` all null for anyone born in the other 71. The
// location bar in LifeScreen renders behind `{livePlace && ...}`, so a character
// in almost half the roster was never told where they lived, and the 64 guards
// reading `G.place?.type`, `?.scale` or `?.region` could not fire for them.
//
// The absence did not show up in any rate: the event and texture counts came out
// identical either side of it, because REGISTER_SHARES fills the anchored bucket
// from country and era guards when the place guards cannot answer. What was lost
// was not volume, it was the place.
// Each country has at minimum: 1 rural, 1 town/suburban, 1 urban entry.
// Large countries (US, India, China, Brazil, Russia, Nigeria) get 4–8 entries.
// Neighborhoods are real named districts, accurate to wealth tier and era.

export const PLACES = [

  // ── UNITED STATES ──────────────────────────────────────────────────────────

  {
    id: 'us_nyc', name: 'New York City', country: 'United States',
    type: 'urban', scale: 'megacity', region: 'Northeast',
    neighborhoods: {
      informal:      ['East New York', 'Mott Haven', 'Brownsville', 'Far Rockaway'],
      working_class: ['Flatbush', 'Astoria', 'Jackson Heights', 'Bay Ridge'],
      middle_class:  ['Park Slope', 'Astoria Heights', 'Flushing', 'Carroll Gardens'],
      elite:         ['Upper East Side', 'Tribeca', 'West Village', 'Brooklyn Heights'],
    },
  },
  {
    id: 'us_los_angeles', name: 'Los Angeles', country: 'United States',
    type: 'urban', scale: 'megacity', region: 'West Coast',
    neighborhoods: {
      informal:      ['Watts', 'Compton', 'Skid Row', 'South Central'],
      working_class: ['East Los Angeles', 'Boyle Heights', 'Inglewood', 'Van Nuys'],
      middle_class:  ['Silver Lake', 'Culver City', 'Pasadena', 'Koreatown'],
      elite:         ['Bel Air', 'Beverly Hills', 'Pacific Palisades', 'Hancock Park'],
    },
  },
  {
    id: 'us_chicago', name: 'Chicago', country: 'United States',
    type: 'urban', scale: 'major_city', region: 'Midwest',
    neighborhoods: {
      informal:      ['Englewood', 'West Garfield Park', 'Austin', 'Roseland'],
      working_class: ['Pilsen', 'Bridgeport', 'Avondale', 'Marquette Park'],
      middle_class:  ['Wicker Park', 'Lincoln Square', 'Roscoe Village', 'Beverly'],
      elite:         ['Gold Coast', 'Lincoln Park', 'Streeterville', 'Hyde Park'],
    },
  },
  {
    id: 'us_houston', name: 'Houston', country: 'United States',
    type: 'urban', scale: 'major_city', region: 'South',
    neighborhoods: {
      informal:      ['Fifth Ward', 'Sunnyside', 'Settegast', 'Third Ward'],
      working_class: ['East End', 'Magnolia Park', 'Kashmere Gardens', 'Clinton Park'],
      middle_class:  ['Montrose', 'Midtown', 'Garden Oaks', 'Timbergrove'],
      elite:         ['River Oaks', 'Memorial', 'West University Place', 'Tanglewood'],
    },
  },
  {
    id: 'us_atlanta', name: 'Atlanta', country: 'United States',
    type: 'urban', scale: 'major_city', region: 'South',
    neighborhoods: {
      informal:      ['Vine City', 'Mechanicsville', 'Pittsburgh', 'English Avenue'],
      working_class: ['Westview', 'Lakewood Heights', 'Kirkwood', 'East Atlanta'],
      middle_class:  ['Virginia-Highland', 'Inman Park', 'Candler Park', 'East Lake'],
      elite:         ['Buckhead', 'Druid Hills', 'Ansley Park', 'Morningside'],
    },
  },
  {
    id: 'us_detroit', name: 'Detroit', country: 'United States',
    type: 'urban', scale: 'major_city', region: 'Midwest',
    neighborhoods: {
      informal:      ['Brightmoor', 'Eight Mile Wyoming', 'Osborn', 'Dexter-Davison'],
      working_class: ['Southwest Detroit', 'Corktown', 'East English Village', 'Delray'],
      middle_class:  ['Midtown', 'New Center', 'Jefferson-Chalmers', 'Sherwood Forest'],
      elite:         ['Palmer Woods', 'Sherwood Forest', 'Indian Village', 'Grosse Pointe'],
    },
  },
  {
    id: 'us_miami', name: 'Miami', country: 'United States',
    type: 'urban', scale: 'major_city', region: 'South',
    neighborhoods: {
      informal:      ['Overtown', 'Liberty City', 'Little Haiti', 'Opa-locka'],
      working_class: ['Hialeah', 'Little Havana', 'Allapattah', 'Flagami'],
      middle_class:  ['Brickell', 'Wynwood', 'Coconut Grove', 'Coral Gables'],
      elite:         ['Fisher Island', 'Star Island', 'Key Biscayne', 'Pinecrest'],
    },
  },
  {
    id: 'us_rural_south', name: 'Rural Alabama', country: 'United States',
    type: 'rural', scale: 'village', region: 'South',
    neighborhoods: {
      informal:      ['Sharecropper quarters', 'East side of the tracks'],
      working_class: ['Mill district', 'Route 43 corridor'],
      middle_class:  ['Main Street', 'Church Hill'],
      elite:         ['Old plantation road', 'Lake drive'],
    },
  },
  {
    id: 'us_rural_midwest', name: 'Rural Iowa', country: 'United States',
    type: 'rural', scale: 'village', region: 'Midwest',
    neighborhoods: {
      informal:      ['Trailer park south of the highway'],
      working_class: ['Grain elevator district', 'County Road 12'],
      middle_class:  ['Main Street', 'Elm Avenue'],
      elite:         ['The river bluffs', 'Old money farms'],
    },
  },
  {
    id: 'us_small_town', name: 'Youngstown', country: 'United States',
    type: 'urban', scale: 'mid_city', region: 'Northeast',
    neighborhoods: {
      informal:      ['Idora', 'Brownlee Woods decay', 'South Side'],
      working_class: ['Brier Hill', 'East Side', 'Wick Park'],
      middle_class:  ['Boardman', 'Poland Township', 'Canfield'],
      elite:         ['Glenwood', 'Mill Creek Park area', 'Struthers Heights'],
    },
  },

  // ── CANADA ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_toronto', name: 'Toronto', country: 'Canada',
    type: 'urban', scale: 'major_city', region: 'Ontario',
    neighborhoods: {
      informal:      ['Regent Park', 'Jane-Finch', 'Lawrence Heights', 'Thorncliffe Park'],
      working_class: ['Scarborough', 'East York', 'Rexdale', 'Weston'],
      middle_class:  ['East End', 'The Beach', 'Davisville', 'Bloor West Village'],
      elite:         ['Rosedale', 'Forest Hill', 'Bridle Path', 'Lawrence Park'],
    },
  },
  {
    id: 'ca_rural', name: 'Northern Ontario', country: 'Canada',
    type: 'rural', scale: 'town', region: 'Northern Ontario',
    neighborhoods: {
      informal:      ['Reserve adjacent', 'South end'],
      working_class: ['Mine workers road', 'East end'],
      middle_class:  ['Main Street', 'North end'],
      elite:         ['Lakeshore Drive', 'The highlands'],
    },
  },
  {
    id: 'ca_vancouver', name: 'Vancouver', country: 'Canada',
    type: 'urban', scale: 'major_city', region: 'British Columbia',
    neighborhoods: {
      informal:      ['Downtown Eastside', 'Strathcona', 'Grandview-Woodland (SRO end)'],
      working_class: ['East Vancouver', 'Renfrew-Collingwood', 'Hastings-Sunrise'],
      middle_class:  ['Commercial Drive', 'Mount Pleasant', 'South Granville', 'Kitsilano'],
      elite:         ['Shaughnessy', 'West Vancouver', 'Point Grey', 'Dunbar'],
    },
  },

  // ── UNITED KINGDOM ─────────────────────────────────────────────────────────

  {
    id: 'uk_london', name: 'London', country: 'United Kingdom',
    type: 'urban', scale: 'megacity', region: 'Southeast England',
    neighborhoods: {
      informal:      ['Peckham', 'Brixton', 'Tottenham', 'Hackney Wick'],
      working_class: ['Lewisham', 'Barking', 'Dagenham', 'Walthamstow'],
      middle_class:  ['Islington', 'Crouch End', 'Stoke Newington', 'Highbury'],
      elite:         ['Kensington', 'Chelsea', 'Mayfair', 'Notting Hill'],
    },
  },
  {
    id: 'uk_manchester', name: 'Manchester', country: 'United Kingdom',
    type: 'urban', scale: 'major_city', region: 'Northwest England',
    neighborhoods: {
      informal:      ['Moss Side', 'Longsight', 'Beswick', 'Gorton'],
      working_class: ['Rusholme', 'Salford', 'Chorlton-cum-Hardy', 'Hulme'],
      middle_class:  ['Didsbury', 'Chorlton', 'Withington', 'West Didsbury'],
      elite:         ['Altrincham', 'Hale', 'Prestbury', 'Bowdon'],
    },
  },
  {
    id: 'uk_rural', name: 'Rural Yorkshire', country: 'United Kingdom',
    type: 'rural', scale: 'village', region: 'Yorkshire',
    neighborhoods: {
      informal:      ['Former mining terrace', 'Council estate end'],
      working_class: ['Main Street', 'Mill Lane'],
      middle_class:  ['Church Lane', 'The Green'],
      elite:         ['The Old Hall', 'Manor Farm road'],
    },
  },

  // ── GERMANY ────────────────────────────────────────────────────────────────

  {
    id: 'de_berlin', name: 'Berlin', country: 'Germany',
    type: 'urban', scale: 'major_city', region: 'Brandenburg',
    neighborhoods: {
      informal:      ['Gropiusstadt', 'Märkisches Viertel', 'Hellersdorf-Nord'],
      working_class: ['Wedding', 'Neukölln', 'Spandau', 'Lichtenberg'],
      middle_class:  ['Prenzlauer Berg', 'Kreuzberg', 'Friedrichshain', 'Tempelhof'],
      elite:         ['Zehlendorf', 'Dahlem', 'Grunewald', 'Charlottenburg'],
    },
  },
  {
    id: 'de_rural', name: 'Rural Bavaria', country: 'Germany',
    type: 'rural', scale: 'village', region: 'Bavaria',
    neighborhoods: {
      informal:      ['Former farmhand housing'],
      working_class: ['Hauptstraße', 'Bahnhofsviertel'],
      middle_class:  ['Kirchplatz', 'Am Hang'],
      elite:         ['Seestraße', 'Villengebiet'],
    },
  },

  // ── FRANCE ─────────────────────────────────────────────────────────────────

  {
    id: 'fr_paris', name: 'Paris', country: 'France',
    type: 'urban', scale: 'megacity', region: 'Île-de-France',
    neighborhoods: {
      informal:      ['Cité des 4000 (La Courneuve)', 'Les Bosquets (Clichy-Montfermeil)', 'La Grande Borne'],
      working_class: ['Belleville', 'Ménilmontant', 'La Goutte d\'Or', 'Barbès'],
      middle_class:  ['Oberkampf', 'République', 'Nation', 'Montparnasse'],
      elite:         ['7e arrondissement', '16e arrondissement', 'Neuilly-sur-Seine', 'Saint-Germain-des-Prés'],
    },
  },
  {
    id: 'fr_rural', name: 'Rural Normandy', country: 'France',
    type: 'rural', scale: 'village', region: 'Normandy',
    neighborhoods: {
      informal:      ['Les ouvriers agricoles'],
      working_class: ['Rue du Bourg', 'Quartier des artisans'],
      middle_class:  ['Rue de l\'Église', 'Le bourg'],
      elite:         ['Le château', 'Manoir road'],
    },
  },

  // ── SWEDEN ─────────────────────────────────────────────────────────────────

  {
    id: 'se_stockholm', name: 'Stockholm', country: 'Sweden',
    type: 'urban', scale: 'major_city', region: 'Stockholm County',
    neighborhoods: {
      informal:      ['Rinkeby', 'Tensta', 'Husby', 'Fittja'],
      working_class: ['Vällingby', 'Skärholmen', 'Hökarängen', 'Farsta'],
      middle_class:  ['Södermalm', 'Hammarby Sjöstad', 'Lidingö', 'Bromma'],
      elite:         ['Östermalm', 'Djurgården', 'Danderyd', 'Lidingö North'],
    },
  },
  {
    id: 'se_rural', name: 'Rural Dalarna', country: 'Sweden',
    type: 'rural', scale: 'village', region: 'Dalarna',
    neighborhoods: {
      informal:      ['Torpet', 'Backstugan'],
      working_class: ['Bygatan', 'Vid sågverket'],
      middle_class:  ['Kyrkbyn', 'Strandvägen'],
      elite:         ['Herrgårdsvägen', 'Sjöutsikt'],
    },
  },

  // ── NORWAY ─────────────────────────────────────────────────────────────────

  {
    id: 'no_oslo', name: 'Oslo', country: 'Norway',
    type: 'urban', scale: 'major_city', region: 'Akershus',
    neighborhoods: {
      informal:      ['Romsås', 'Stovner', 'Søndre Nordstrand'],
      working_class: ['Groruddalen', 'Bjerke', 'Alna', 'Furuset'],
      middle_class:  ['Grünerløkka', 'Sagene', 'Torshov', 'Carl Berner'],
      elite:         ['Frogner', 'Bygdøy', 'Nordstrand', 'Holmenkollen'],
    },
  },
  {
    id: 'no_rural', name: 'Rural Vestland', country: 'Norway',
    type: 'rural', scale: 'village', region: 'Vestland',
    neighborhoods: {
      informal:      ['Naustet', 'Grendahuset'],
      working_class: ['Bygdaveien', 'Fiskerleien'],
      middle_class:  ['Sentrum', 'Kirkeveien'],
      elite:         ['Fjordveien', 'Eidsgaten'],
    },
  },

  // ── NETHERLANDS ────────────────────────────────────────────────────────────

  {
    id: 'nl_amsterdam', name: 'Amsterdam', country: 'Netherlands',
    type: 'urban', scale: 'major_city', region: 'North Holland',
    neighborhoods: {
      informal:      ['Bijlmer (southeast)', 'Slotervaart South', 'Transvaalbuurt'],
      working_class: ['Noord', 'Nieuw-West', 'Bos en Lommer', 'De Pijp South'],
      middle_class:  ['De Pijp', 'Oud-West', 'Jordaan', 'Oost'],
      elite:         ['Grachtengordel', 'Oud-Zuid', 'Buitenveldert', 'Watergraafsmeer'],
    },
  },
  {
    id: 'nl_rural', name: 'Rural Drenthe', country: 'Netherlands',
    type: 'rural', scale: 'village', region: 'Drenthe',
    neighborhoods: {
      informal:      ['Boerderijkampen'],
      working_class: ['Dorpsstraat', 'Markeweg'],
      middle_class:  ['Centrumplein', 'Kerkstraat'],
      elite:         ['Landgoed', 'Bosrand'],
    },
  },

  // ── AUSTRALIA ──────────────────────────────────────────────────────────────

  {
    id: 'au_sydney', name: 'Sydney', country: 'Australia',
    type: 'urban', scale: 'major_city', region: 'New South Wales',
    neighborhoods: {
      informal:      ['Mount Druitt', 'Claymore', 'Macquarie Fields', 'Bidwill'],
      working_class: ['Parramatta', 'Auburn', 'Liverpool', 'Cabramatta'],
      middle_class:  ['Newtown', 'Marrickville', 'Glebe', 'Leichhardt'],
      elite:         ['Mosman', 'Vaucluse', 'Double Bay', 'Pymble'],
    },
  },
  {
    id: 'au_rural', name: 'Rural Queensland', country: 'Australia',
    type: 'rural', scale: 'village', region: 'Queensland',
    neighborhoods: {
      informal:      ['The camp on the edge of town', 'Government housing end'],
      working_class: ['Main Street', 'Stock route road'],
      middle_class:  ['Church Street', 'Showground road'],
      elite:         ['Station homestead', 'Hill rise'],
    },
  },

  // ── NEW ZEALAND ────────────────────────────────────────────────────────────

  {
    id: 'nz_auckland', name: 'Auckland', country: 'New Zealand',
    type: 'urban', scale: 'major_city', region: 'Auckland',
    neighborhoods: {
      informal:      ['Ōtāhuhu', 'Māngere East', 'Clendon', 'Weymouth'],
      working_class: ['Papatoetoe', 'Henderson', 'Māngere', 'Ōtara'],
      middle_class:  ['Mt Eden', 'Grey Lynn', 'Pt Chevalier', 'Sandringham'],
      elite:         ['Remuera', 'Epsom', 'Herne Bay', 'Saint Marys Bay'],
    },
  },
  {
    id: 'nz_rural', name: 'Rural Waikato', country: 'New Zealand',
    type: 'rural', scale: 'village', region: 'Waikato',
    neighborhoods: {
      informal:      ['State housing block', 'Riverside flats'],
      working_class: ['Main Street', 'Farm road'],
      middle_class:  ['Village green', 'School road'],
      elite:         ['Lakefront', 'Station homestead'],
    },
  },

  // ── SPAIN ──────────────────────────────────────────────────────────────────

  {
    id: 'es_madrid', name: 'Madrid', country: 'Spain',
    type: 'urban', scale: 'major_city', region: 'Community of Madrid',
    neighborhoods: {
      informal:      ['Cañada Real', 'Vallecas (south edge)', 'Parla', 'Fuenlabrada'],
      working_class: ['Vallecas', 'Carabanchel', 'Hortaleza', 'Usera'],
      middle_class:  ['Lavapiés', 'Malasaña', 'Chueca', 'Prosperidad'],
      elite:         ['Salamanca', 'El Viso', 'La Moraleja', 'Pozuelo de Alarcón'],
    },
  },
  {
    id: 'es_rural', name: 'Rural Extremadura', country: 'Spain',
    type: 'rural', scale: 'village', region: 'Extremadura',
    neighborhoods: {
      informal:      ['Barrio gitano', 'Cañada de los braceros'],
      working_class: ['Calle Mayor', 'Barrio de las eras'],
      middle_class:  ['Plaza Mayor', 'Calle de la Iglesia'],
      elite:         ['La finca', 'Casa señorial'],
    },
  },

  // ── ITALY ──────────────────────────────────────────────────────────────────

  {
    id: 'it_rome', name: 'Rome', country: 'Italy',
    type: 'urban', scale: 'major_city', region: 'Lazio',
    neighborhoods: {
      informal:      ['Tor Bella Monaca', 'Ostia', 'Corviale', 'Laurentino 38'],
      working_class: ['Torpignattara', 'Pigneto', 'Casilino', 'Tiburtino'],
      middle_class:  ['Prati', 'Pigneto upper', 'Nomentano', 'Trieste'],
      elite:         ['Parioli', 'Pinciano', 'EUR (executive)', 'Aventino'],
    },
  },
  {
    id: 'it_rural', name: 'Rural Sicily', country: 'Italy',
    type: 'rural', scale: 'village', region: 'Sicily',
    neighborhoods: {
      informal:      ['Quartiere povero', 'I bassi'],
      working_class: ['Via Principale', 'Contrada agricola'],
      middle_class:  ['Piazza Centrale', 'Via della Chiesa'],
      elite:         ['Villa padronale', 'Il palazzo'],
    },
  },

  // ── IRELAND ────────────────────────────────────────────────────────────────

  {
    id: 'ie_dublin', name: 'Dublin', country: 'Ireland',
    type: 'urban', scale: 'major_city', region: 'Leinster',
    neighborhoods: {
      informal:      ['Ballymun', 'Darndale', 'Fatima Mansions', 'Dolphin House'],
      working_class: ['Crumlin', 'Drimnagh', 'Finglas', 'Cabra'],
      middle_class:  ['Ranelagh', 'Rathmines', 'Terenure', 'Portobello'],
      elite:         ['Ballsbridge', 'Donnybrook', 'Foxrock', 'Dalkey'],
    },
  },
  {
    id: 'ie_rural', name: 'Rural County Mayo', country: 'Ireland',
    type: 'rural', scale: 'village', region: 'Connacht',
    neighborhoods: {
      informal:      ['Council cottages', 'The bog road'],
      working_class: ['Main Street', 'Fair Green'],
      middle_class:  ['Church Road', 'The Square'],
      elite:         ['The Big House', 'Lakeside'],
    },
  },

  // ── JAPAN ──────────────────────────────────────────────────────────────────

  {
    id: 'jp_tokyo', name: 'Tokyo', country: 'Japan',
    type: 'urban', scale: 'megacity', region: 'Kantō',
    neighborhoods: {
      informal:      ["San'ya", 'Kotobuki-cho (Yokohama nearby)', 'Kamagasaki worker district'],
      working_class: ['Adachi', 'Katsushika', 'Edogawa', 'Sumida'],
      middle_class:  ['Suginami', 'Nerima', 'Itabashi', 'Meguro'],
      elite:         ['Minato', 'Shibuya', 'Setagaya upper', 'Daikanyama'],
    },
  },
  {
    id: 'jp_osaka', name: 'Osaka', country: 'Japan',
    type: 'urban', scale: 'major_city', region: 'Kansai',
    neighborhoods: {
      informal:      ['Nishinari (Kamagasaki)', 'Taisho (burakumin district)'],
      working_class: ['Juso', 'Tsuruhashi', 'Namba South', 'Izumi'],
      middle_class:  ['Namba', 'Shinsaibashi', 'Tennoji', 'Fukushima'],
      elite:         ['Kitahama', 'Nakanoshima', 'Senrioka', 'Toyonaka'],
    },
  },
  {
    id: 'jp_rural', name: 'Rural Tohoku', country: 'Japan',
    type: 'rural', scale: 'village', region: 'Tōhoku',
    neighborhoods: {
      informal:      ['Kasba', 'Buraku end'],
      working_class: ['Station road', 'Honmachi'],
      middle_class:  ['Shotengai', 'Sakuramachi'],
      elite:         ['Yamate', 'Sanjo end'],
    },
  },

  // ── SOUTH KOREA ────────────────────────────────────────────────────────────

  {
    id: 'kr_seoul', name: 'Seoul', country: 'South Korea',
    type: 'urban', scale: 'megacity', region: 'Capital Region',
    neighborhoods: {
      informal:      ['Guryong Village', 'Nowon rooftop flats', 'Guui-dong old blocks'],
      working_class: ['Dobong', 'Nowon', 'Jungnang', 'Guro'],
      middle_class:  ['Mapo', 'Eunpyeong', 'Seongbuk', 'Yongsan'],
      elite:         ['Gangnam', 'Seocho', 'Songpa', 'Hannam-dong'],
    },
  },
  {
    id: 'kr_rural', name: 'Rural Jeolla', country: 'South Korea',
    type: 'rural', scale: 'village', region: 'Jeolla',
    neighborhoods: {
      informal:      ['Farmhand housing', 'Riverside shacks'],
      working_class: ['Bukchon road', 'Market street'],
      middle_class:  ['Dongno', 'Church district'],
      elite:         ['Yangban hill', 'Old family estate'],
    },
  },

  // ── SINGAPORE ──────────────────────────────────────────────────────────────

  {
    id: 'sg_singapore', name: 'Singapore', country: 'Singapore',
    type: 'urban', scale: 'major_city', region: 'Singapore',
    neighborhoods: {
      informal:      ['Geylang (low-end)', 'Little India migrant worker blocks'],
      working_class: ['Bedok', 'Tampines', 'Jurong West', 'Woodlands'],
      middle_class:  ['Queenstown', 'Bishan', 'Toa Payoh', 'Marine Parade'],
      elite:         ['Tanglin', 'Bukit Timah', 'Orchard', 'Sentosa Cove'],
    },
  },

  // ── RUSSIA ─────────────────────────────────────────────────────────────────

  {
    id: 'ru_moscow', name: 'Moscow', country: 'Russia',
    type: 'urban', scale: 'megacity', region: 'Central Federal District',
    neighborhoods: {
      informal:      ['Kapotnya', 'Lyubertsy outskirts', 'Zelenograd edge blocks'],
      working_class: ['Lyublino', 'Kuzminki', 'Vykhino', 'Pechatniki'],
      middle_class:  ['Sokolniki', 'Tverskoy', 'Sokol', 'Akademichesky'],
      elite:         ['Rublyovka', 'Ostozhenka', 'Patriarshiye Prudy', 'Zamoskvorechye elite'],
    },
  },
  {
    id: 'ru_spb', name: 'Saint Petersburg', country: 'Russia',
    type: 'urban', scale: 'major_city', region: 'Northwest',
    neighborhoods: {
      informal:      ['Parnas edge', 'Avtovo South', 'Dachnoye'],
      working_class: ['Avtovo', 'Kirovsky', 'Nevsky', 'Krasnogvardeysky'],
      middle_class:  ['Vasilievsky Island', 'Petrogradskaya', 'Vladimirskaya', 'Moskovskiy'],
      elite:         ['Krestovsky Island', 'Kamenny Island', 'Central historic', 'Neva embankment'],
    },
  },
  {
    id: 'ru_rural', name: 'Rural Siberia', country: 'Russia',
    type: 'rural', scale: 'village', region: 'Siberia',
    neighborhoods: {
      informal:      ['The far end near the river', 'Old collective farm housing'],
      working_class: ['Ulitsa Lenina', 'Rabochiy kvartal'],
      middle_class:  ['Tsentr', 'Ulitsa Mira'],
      elite:         ['Dom kultury end', 'Rayon HQ area'],
    },
  },

  // ── UKRAINE ────────────────────────────────────────────────────────────────

  {
    id: 'ua_kyiv', name: 'Kyiv', country: 'Ukraine',
    type: 'urban', scale: 'major_city', region: 'Central Ukraine',
    neighborhoods: {
      informal:      ['Obolon edge', 'Troyeshchyna', 'Poznyaky low-end'],
      working_class: ['Darnytsya', 'Desnyansky', 'Svyatoshynsky', 'Obolon'],
      middle_class:  ['Podil', 'Pechersk lower', 'Solomyanka', 'Svyatoshyn'],
      elite:         ['Pechersk', 'Lypky', 'Koncha-Zaspa', 'Obolon riverfront'],
    },
  },
  {
    id: 'ua_rural', name: 'Rural Poltava', country: 'Ukraine',
    type: 'rural', scale: 'village', region: 'Eastern Ukraine',
    neighborhoods: {
      informal:      ['Kolhospne zhytlo', 'The far track'],
      working_class: ['Vylitsya Lenina (old)', 'Rynok area'],
      middle_class:  ['Tsentr', 'Poshta area'],
      elite:         ['Rayonna administratsiya area', 'Church end'],
    },
  },

  // ── POLAND ─────────────────────────────────────────────────────────────────

  {
    id: 'pl_warsaw', name: 'Warsaw', country: 'Poland',
    type: 'urban', scale: 'major_city', region: 'Masovia',
    neighborhoods: {
      informal:      ['Praga-Południe blocks', 'Ursus industrial zone', 'Targówek south'],
      working_class: ['Praga', 'Wola', 'Żoliborz', 'Bielany'],
      middle_class:  ['Mokotów', 'Ursynów', 'Ochota', 'Bemowo'],
      elite:         ['Śródmieście', 'Wilanów', 'Saska Kępa', 'Konstancin-Jeziorna'],
    },
  },
  {
    id: 'pl_rural', name: 'Rural Podkarpacie', country: 'Poland',
    type: 'rural', scale: 'village', region: 'Southeast Poland',
    neighborhoods: {
      informal:      ['Za torami', 'Kolonia biedna'],
      working_class: ['Rynek', 'Ulica Główna'],
      middle_class:  ['Centrum', 'Ulica Kościelna'],
      elite:         ['Przy dworze', 'Wzgórze'],
    },
  },

  // ── ROMANIA ────────────────────────────────────────────────────────────────

  {
    id: 'ro_bucharest', name: 'Bucharest', country: 'Romania',
    type: 'urban', scale: 'major_city', region: 'Muntenia',
    neighborhoods: {
      informal:      ['Ferentari', 'Rahova South', 'Giulești edge'],
      working_class: ['Militari', 'Drumul Taberei', 'Berceni', 'Titan'],
      middle_class:  ['Floreasca', 'Dorobanți', 'Aviatorilor', 'Cotroceni'],
      elite:         ['Primăverii', 'Herăstrău', 'Floreasca Park', 'Pipera'],
    },
  },
  {
    id: 'ro_rural', name: 'Rural Moldova (Romania)', country: 'Romania',
    type: 'rural', scale: 'village', region: 'Moldova',
    neighborhoods: {
      informal:      ['Căsuțele de paiantă', 'Marginea satului'],
      working_class: ['Strada Principală', 'Centrul vechi'],
      middle_class:  ['Centru', 'Str. Victoriei'],
      elite:         ['Casa boierului', 'Dealul viei'],
    },
  },

  // ── SERBIA ─────────────────────────────────────────────────────────────────

  {
    id: 'rs_belgrade', name: 'Belgrade', country: 'Serbia',
    type: 'urban', scale: 'major_city', region: 'Central Serbia',
    neighborhoods: {
      informal:      ['Kaluđerica', 'Leštane', 'Resnik edge'],
      working_class: ['Zvezdara', 'Rakovica', 'Zemun', 'Borča'],
      middle_class:  ['Vračar', 'Palilula', 'Stari grad lower', 'Bežanija'],
      elite:         ['Dedinje', 'Senjak', 'Stari grad high', 'Banovo Brdo top'],
    },
  },
  {
    id: 'rs_rural', name: 'Rural Šumadija', country: 'Serbia',
    type: 'rural', scale: 'village', region: 'Šumadija',
    neighborhoods: {
      informal:      ['Roma mahala', 'Periferija'],
      working_class: ['Ulica Maršala Tita (old)', 'Varoš'],
      middle_class:  ['Centar', 'Crkvenski kraj'],
      elite:         ['Imanje na brdu', 'Čorba road'],
    },
  },

  // ── HUNGARY ────────────────────────────────────────────────────────────────

  {
    id: 'hu_budapest', name: 'Budapest', country: 'Hungary',
    type: 'urban', scale: 'major_city', region: 'Central Hungary',
    neighborhoods: {
      informal:      ['Csepel South', 'Kőbánya edge', 'Kelenföldi lakótelep'],
      working_class: ['Józsefváros', 'Ferencváros', 'Zugló', 'Kőbánya'],
      middle_class:  ['Buda hills (lower)', 'Zugló upper', 'Óbuda', 'Köki area'],
      elite:         ['Rose Hill (Rózsadomb)', 'Pasaréti', 'Buda castle area', 'Lipótváros'],
    },
  },
  {
    id: 'hu_rural', name: 'Rural Great Plain', country: 'Hungary',
    type: 'rural', scale: 'village', region: 'Alföld',
    neighborhoods: {
      informal:      ['Cigánysor', 'Vályogházak'],
      working_class: ['Fő utca', 'Tsz lakótelep'],
      middle_class:  ['Belváros', 'Templomköz'],
      elite:         ['Tanyaközpont', 'Kastélypark'],
    },
  },

  // ── GEORGIA ────────────────────────────────────────────────────────────────

  {
    id: 'ge_tbilisi', name: 'Tbilisi', country: 'Georgia',
    type: 'urban', scale: 'major_city', region: 'Kartli',
    neighborhoods: {
      informal:      ['Gldani North', 'Didi Digomi', 'Samgori edge'],
      working_class: ['Gldani', 'Nadzaladevi', 'Isani', 'Samgori'],
      middle_class:  ['Vake lower', 'Saburtalo', 'Didube', 'Chughureti'],
      elite:         ['Vake upper', 'Vera', 'Mtatsminda', 'Sololaki'],
    },
  },
  {
    id: 'ge_rural', name: 'Rural Kakheti', country: 'Georgia',
    type: 'rural', scale: 'village', region: 'Kakheti',
    neighborhoods: {
      informal:      ['Maranakhevi', 'Ubani bolo'],
      working_class: ['Mtkavris piri', 'Gamarjobis kucha'],
      middle_class:  ['Tskhoveli', 'Bazari'],
      elite:         ['Machebelisa gza', 'Dukani area'],
    },
  },

  // ── KAZAKHSTAN ─────────────────────────────────────────────────────────────

  {
    id: 'kz_almaty', name: 'Almaty', country: 'Kazakhstan',
    type: 'urban', scale: 'major_city', region: 'Southeast Kazakhstan',
    neighborhoods: {
      informal:      ['Shanyrak', 'Baganashyl', 'Kalkaman South'],
      working_class: ['Alatau district', 'Nauryzbay', 'Turksib'],
      middle_class:  ['Bostandyk', 'Medeu', 'Almaly', 'Auezov'],
      elite:         ['Esentai Park area', 'Kok-Tobe foothills', 'Embassy zone'],
    },
  },
  {
    id: 'kz_rural', name: 'Rural Steppe Kazakhstan', country: 'Kazakhstan',
    type: 'rural', scale: 'village', region: 'North Kazakhstan',
    neighborhoods: {
      informal:      ['Kolkhoz-era barracks', 'The far end'],
      working_class: ['Lenina Street (old)', 'Tsentr'],
      middle_class:  ['Dom Kultury block', 'Sovetskaya'],
      elite:         ['Sovkhoz HQ road', 'New brick houses'],
    },
  },

  // ── UZBEKISTAN ─────────────────────────────────────────────────────────────

  {
    id: 'uz_tashkent', name: 'Tashkent', country: 'Uzbekistan',
    type: 'urban', scale: 'major_city', region: 'Tashkent Region',
    neighborhoods: {
      informal:      ['Chilanzar edge', 'Sergeli outskirts'],
      working_class: ['Shayhantohur', 'Mirzo Ulugbek', 'Yunusabad', 'Sergeli'],
      middle_class:  ['Shaykhantakhur', 'Yakkasaray', 'Hamza', 'Chilanzar centre'],
      elite:         ['Mirabad', 'Kadishev area', 'New development zone', 'Embassy compound'],
    },
  },
  {
    id: 'uz_rural', name: 'Rural Fergana Valley', country: 'Uzbekistan',
    type: 'rural', scale: 'village', region: 'Fergana Valley',
    neighborhoods: {
      informal:      ['Qishloq chekka', 'Eski guzar'],
      working_class: ['Bazar yo\'li', 'Markaziy ko\'cha'],
      middle_class:  ['Markaz', 'Madrasa yaqin'],
      elite:         ['Tuman hokimiyati', 'Bog\' uyi'],
    },
  },

  // ── BRAZIL ─────────────────────────────────────────────────────────────────

  {
    id: 'br_sao_paulo', name: 'São Paulo', country: 'Brazil',
    type: 'urban', scale: 'megacity', region: 'Southeast Brazil',
    neighborhoods: {
      informal:      ['Brasilândia favela', 'Jaçanã', 'Heliópolis', 'Paraisópolis'],
      working_class: ['Zona Leste', 'Penha', 'Vila Prudente', 'Itaquera'],
      middle_class:  ['Pinheiros', 'Vila Madalena', 'Moema', 'Santana'],
      elite:         ['Jardins', 'Higienópolis', 'Itaim Bibi', 'Morumbi'],
    },
  },
  {
    id: 'br_rio', name: 'Rio de Janeiro', country: 'Brazil',
    type: 'urban', scale: 'megacity', region: 'Southeast Brazil',
    neighborhoods: {
      informal:      ['Rocinha', 'Complexo do Alemão', 'Vila Cruzeiro', 'Mangueira'],
      working_class: ['Norte Zone', 'Tijuca', 'Madureira', 'Méier'],
      middle_class:  ['Botafogo', 'Flamengo', 'Santa Teresa', 'Largo do Machado'],
      elite:         ['Ipanema', 'Leblon', 'Gávea', 'São Conrado'],
    },
  },
  {
    id: 'br_northeast', name: 'Fortaleza', country: 'Brazil',
    type: 'urban', scale: 'major_city', region: 'Northeast Brazil',
    neighborhoods: {
      informal:      ['Barra do Ceará', 'Bom Jardim', 'Granja Portugal'],
      working_class: ['Messejana', 'Parangaba', 'Mondubim', 'Jangurussu'],
      middle_class:  ['Aldeota', 'Meireles south', 'Dionísio Torres'],
      elite:         ['Meireles', 'Varjota', 'Cocó', 'Guararapes'],
    },
  },
  {
    id: 'br_rural', name: 'Rural Bahia (sertão)', country: 'Brazil',
    type: 'rural', scale: 'village', region: 'Northeast Brazil',
    neighborhoods: {
      informal:      ['Rua do fundo', 'Mocambo'],
      working_class: ['Rua Principal', 'Perto do mercado'],
      middle_class:  ['Praça Central', 'Rua da Igreja'],
      elite:         ['Fazenda velha', 'Palacete do coronel'],
    },
  },

  // ── MEXICO ─────────────────────────────────────────────────────────────────

  {
    id: 'mx_mexico_city', name: 'Mexico City', country: 'Mexico',
    type: 'urban', scale: 'megacity', region: 'Valle de México',
    neighborhoods: {
      informal:      ['Neza (Ciudad Nezahualcóyotl)', 'Ecatepec outskirts', 'Iztapalapa Sur'],
      working_class: ['Iztapalapa', 'Gustavo A. Madero', 'Azcapotzalco', 'Venustiano Carranza'],
      middle_class:  ['Coyoacán', 'Del Valle', 'Narvarte', 'Portales'],
      elite:         ['Polanco', 'Lomas de Chapultepec', 'Santa Fe', 'Pedregal'],
    },
  },
  {
    id: 'mx_rural', name: 'Rural Oaxaca', country: 'Mexico',
    type: 'rural', scale: 'village', region: 'Southern Mexico',
    neighborhoods: {
      informal:      ['Colonia popular', 'El barrio de abajo'],
      working_class: ['Calle Principal', 'Barrio del mercado'],
      middle_class:  ['Centro', 'Calle Real'],
      elite:         ['La hacienda', 'El mirador'],
    },
  },

  // ── TURKEY ─────────────────────────────────────────────────────────────────

  {
    id: 'tr_istanbul', name: 'Istanbul', country: 'Turkey',
    type: 'urban', scale: 'megacity', region: 'Marmara',
    neighborhoods: {
      informal:      ['Bağcılar', 'Sultanbeyli', 'Esenler gecekondu', 'Gaziosmanpaşa'],
      working_class: ['Bayrampaşa', 'Üsküdar', 'Kadıköy lower', 'Fatih'],
      middle_class:  ['Beşiktaş', 'Kadıköy', 'Şişli', 'Bakırköy'],
      elite:         ['Bebek', 'Etiler', 'Nişantaşı', 'Sarıyer'],
    },
  },
  {
    id: 'tr_rural', name: 'Rural Anatolia', country: 'Turkey',
    type: 'rural', scale: 'village', region: 'Central Anatolia',
    neighborhoods: {
      informal:      ['Gecekondu mahallesi', 'Kenar mahalle'],
      working_class: ['Ana cadde', 'Çarşı'],
      middle_class:  ['Merkez', 'Camii çevresi'],
      elite:         ['Konak', 'Bey mahallesi'],
    },
  },

  // ── CHINA ──────────────────────────────────────────────────────────────────

  {
    id: 'cn_beijing', name: 'Beijing', country: 'China',
    type: 'urban', scale: 'megacity', region: 'North China',
    neighborhoods: {
      informal:      ['Chaoyang migrant village', 'Fengtai South', 'Daxing edge'],
      working_class: ['Chaoyang outer', 'Fengtai', 'Tongzhou', 'Shijingshan'],
      middle_class:  ['Haidian', 'Wangjing', 'Sanlitun', 'Chaoyang Park'],
      elite:         ['Chaoyang Embassy zone', 'Shunyi villa area', 'Xicheng historic', 'Yanqing lakes'],
    },
  },
  {
    id: 'cn_shanghai', name: 'Shanghai', country: 'China',
    type: 'urban', scale: 'megacity', region: 'East China',
    neighborhoods: {
      informal:      ['Zhabei old lanes', 'Minhang migrant area', 'Baoshan edge'],
      working_class: ['Yangpu', 'Putuo', 'Baoshan', 'Jiading'],
      middle_class:  ['Jing\'an', 'Xuhui', 'Changning', 'Minhang center'],
      elite:         ['French Concession (Xuhui-Jing\'an overlap)', 'Xintiandi', 'Lujiazui', 'Xujiahui top'],
    },
  },
  {
    id: 'cn_chongqing', name: 'Chongqing', country: 'China',
    type: 'urban', scale: 'megacity', region: 'Southwest China',
    neighborhoods: {
      informal:      ['Jiangbei migrant housing', 'Shapingba outer', 'Jiulongpo edge'],
      working_class: ['Jiulongpo', 'Dadukou', 'Banan', 'Nanan lower'],
      middle_class:  ['Shapingba', 'Jiangbei', 'Yubei', 'Nanan upper'],
      elite:         ['Yuzhong center', 'Jiangbei Guanyinqiao', 'Xiyong new zone'],
    },
  },
  {
    id: 'cn_rural', name: 'Rural Sichuan', country: 'China',
    type: 'rural', scale: 'village', region: 'Southwest China',
    neighborhoods: {
      informal:      ['Liumin zu', 'Cha ditou'],
      working_class: ['Zheng jie', 'Shichang lu'],
      middle_class:  ['Cun zhongxin', 'Miao qian'],
      elite:         ['Da hu zhai', 'Zhen zhengfu'],
    },
  },

  // ── COLOMBIA ───────────────────────────────────────────────────────────────

  {
    id: 'co_bogota', name: 'Bogotá', country: 'Colombia',
    type: 'urban', scale: 'megacity', region: 'Cundinamarca',
    neighborhoods: {
      informal:      ['Ciudad Bolívar', 'Bosa Sur', 'Usme', 'Altos de Cazucá'],
      working_class: ['Kennedy', 'Bosa', 'Engativá', 'Usaquén Sur'],
      middle_class:  ['Chapinero', 'Usaquén', 'Suba Centro', 'Teusaquillo'],
      elite:         ['Rosales', 'El Chicó', 'La Cabrera', 'Cedritos top'],
    },
  },
  // Colombia had a capital and a countryside and nothing in between, which is
  // why `col_dep_choco_displaced` could tell an Afro-Colombian family they had
  // moved to Cali and leave them in the Chocó: the destination the sentence
  // named did not exist. Medellín and Cali are the second and third cities and
  // are where the displacement of the 1990s and 2000s actually went.
  {
    id: 'co_medellin', name: 'Medellín', country: 'Colombia',
    type: 'urban', scale: 'major_city', region: 'Antioquia',
    neighborhoods: {
      informal:      ['Comuna 13', 'Moravia', 'Popular', 'Santo Domingo Savio'],
      working_class: ['Aranjuez', 'Belén', 'Manrique', 'Robledo'],
      middle_class:  ['Laureles', 'Envigado', 'Estadio', 'Conquistadores'],
      elite:         ['El Poblado', 'Alto de las Palmas', 'Provenza', 'Los Balsos'],
    },
  },

  {
    id: 'co_cali', name: 'Cali', country: 'Colombia',
    type: 'urban', scale: 'major_city', region: 'Valle del Cauca',
    neighborhoods: {
      informal:      ['Aguablanca', 'Charco Azul', 'Potrero Grande', 'Siloé'],
      working_class: ['El Rodeo', 'Alfonso López', 'Floralia', 'Junín'],
      middle_class:  ['San Fernando', 'Tequendama', 'El Refugio', 'Versalles'],
      elite:         ['Ciudad Jardín', 'Pance', 'Santa Teresita', 'Normandía'],
    },
  },

  // Fiji had no places at all, so `fj_land_lease_expires` — an event about
  // leaving cane land for the towns, which is what the 1997-2004 expiries
  // actually did to the Indo-Fijian farming population — had nowhere to send
  // anybody.
  {
    id: 'fj_suva', name: 'Suva', country: 'Fiji',
    type: 'urban', scale: 'city', region: 'Viti Levu',
    neighborhoods: {
      informal:      ['Jittu Estate', 'Veidogo', 'Wailea', 'Nanuku'],
      working_class: ['Raiwaqa', 'Nabua', 'Samabula', 'Kinoya'],
      middle_class:  ['Tamavua', 'Laucala Beach', 'Nasese', 'Flagstaff'],
      elite:         ['Domain', 'Muanikau', 'Suva Point', 'Princes Road'],
    },
  },

  {
    id: 'fj_lautoka', name: 'Lautoka', country: 'Fiji',
    type: 'urban', scale: 'town', region: 'Western Viti Levu',
    neighborhoods: {
      informal:      ['Field 40', 'Vunato', 'Namoli settlement', 'Koroipita fringe'],
      working_class: ['Natabua', 'Drasa Avenue', 'Simla', 'Tavakubu'],
      middle_class:  ['Waiyavi', 'Saweni', 'Tomuka', 'Vitogo Parade'],
      elite:         ['Marine Drive', 'Drasa Ridge', 'Saweni Beach', 'Bekana view'],
    },
  },

  {
    id: 'fj_rural', name: 'Rural Viti Levu', country: 'Fiji',
    type: 'rural', scale: 'village', region: 'Sugar Belt',
    neighborhoods: {
      informal:      ['Cane-lease shacks', 'Settlement by the mill road', 'Squatter block'],
      working_class: ['Farm cottages', 'Mill workers\' lines', 'Village houses'],
      middle_class:  ['Lease-holding farmhouse', 'Shopkeeper\'s house by the road'],
      elite:         ['Freehold estate house', 'Mill manager\'s bungalow'],
    },
  },

  {
    id: 'co_rural', name: 'Rural Antioquia', country: 'Colombia',
    type: 'rural', scale: 'village', region: 'Antioquia',
    neighborhoods: {
      informal:      ['Barrio de invasión', 'La cañada'],
      working_class: ['Calle del parque', 'Barrio obrero'],
      middle_class:  ['El centro', 'Cerca a la iglesia'],
      elite:         ['La finca cafetera', 'La Villa'],
    },
  },

  // ── ARGENTINA ──────────────────────────────────────────────────────────────

  {
    id: 'ar_buenos_aires', name: 'Buenos Aires', country: 'Argentina',
    type: 'urban', scale: 'megacity', region: 'Pampas',
    neighborhoods: {
      informal:      ['Villa 31 (Retiro)', 'Villa 1-11-14', 'Ciudad Oculta', 'La Cava'],
      working_class: ['La Boca', 'Barracas', 'Pompeya', 'Mataderos'],
      middle_class:  ['Palermo Soho', 'Villa Crespo', 'Caballito', 'Almagro'],
      elite:         ['Palermo Chico', 'Recoleta', 'San Isidro', 'Nordelta'],
    },
  },
  {
    id: 'ar_rural', name: 'Rural Pampas', country: 'Argentina',
    type: 'rural', scale: 'village', region: 'Buenos Aires Province',
    neighborhoods: {
      informal:      ['El bajo', 'Rancho de peones'],
      working_class: ['Calle principal', 'Barrio ferroviario'],
      middle_class:  ['Plaza central', 'Calle Mitre'],
      elite:         ['La estancia', 'Casco de campo'],
    },
  },

  // ── SOUTH AFRICA ───────────────────────────────────────────────────────────

  {
    id: 'za_johannesburg', name: 'Johannesburg', country: 'South Africa',
    type: 'urban', scale: 'megacity', region: 'Gauteng',
    neighborhoods: {
      informal:      ['Alexandra Township', 'Diepsloot', 'Orange Farm', 'Thokoza'],
      working_class: ['Soweto', 'Tembisa', 'Katlehong', 'Mamelodi'],
      middle_class:  ['Yeoville', 'Melville', 'Northcliff', 'Randburg'],
      elite:         ['Sandton', 'Rosebank', 'Hyde Park', 'Houghton'],
    },
  },
  {
    id: 'za_cape_town', name: 'Cape Town', country: 'South Africa',
    type: 'urban', scale: 'major_city', region: 'Western Cape',
    neighborhoods: {
      informal:      ['Khayelitsha', 'Mitchells Plain', 'Dunoon', 'Delft'],
      working_class: ['Gugulethu', 'Bellville', 'Parow', 'Elsies River'],
      middle_class:  ['Claremont', 'Rondebosch', 'Observatory', 'Woodstock'],
      elite:         ['Constantia', 'Bishopscourt', 'Clifton', 'Camps Bay'],
    },
  },
  {
    id: 'za_rural', name: 'Rural Eastern Cape', country: 'South Africa',
    type: 'rural', scale: 'village', region: 'Eastern Cape',
    neighborhoods: {
      informal:      ['Imijondolo (shacks)', 'Edge of the township'],
      working_class: ['Main road', 'Near the school'],
      middle_class:  ['Town centre', 'Church row'],
      elite:         ['Boer farm', 'The magistrate\'s road'],
    },
  },

  // ── VIETNAM ────────────────────────────────────────────────────────────────

  {
    id: 'vn_hanoi', name: 'Hanoi', country: 'Vietnam',
    type: 'urban', scale: 'major_city', region: 'North Vietnam',
    neighborhoods: {
      informal:      ['Ngõ hẻm Long Biên', 'Gia Lâm edge', 'Thượng Thanh'],
      working_class: ['Hoàng Mai', 'Long Biên', 'Hai Bà Trưng outer', 'Đống Đa'],
      middle_class:  ['Cầu Giấy', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình'],
      elite:         ['Tây Hồ lakefront', 'Hoàn Kiếm', 'Ba Đình diplomatic quarter'],
    },
  },
  {
    id: 'vn_hcmc', name: 'Ho Chi Minh City', country: 'Vietnam',
    type: 'urban', scale: 'megacity', region: 'South Vietnam',
    neighborhoods: {
      informal:      ['Bình Dương outskirts', 'Thủ Thiêm old', 'Xóm Chiếu', 'Bình Chánh'],
      working_class: ['Bình Thạnh', 'Tân Bình', 'Gò Vấp', 'Bình Dương border'],
      middle_class:  ['Quận 3', 'Phú Nhuận', 'Quận 10', 'Thủ Đức'],
      elite:         ['Quận 1', 'Quận 2 Thảo Điền', 'Phú Mỹ Hưng', 'Đa Kao'],
    },
  },
  {
    id: 'vn_danang', name: 'Đà Nẵng', country: 'Vietnam',
    type: 'urban', scale: 'mid_city', region: 'Central Vietnam',
    neighborhoods: {
      informal:      ['Thanh Khê outer', 'Cẩm Lệ far'],
      working_class: ['Thanh Khê', 'Liên Chiểu', 'Cẩm Lệ'],
      middle_class:  ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn'],
      elite:         ['Mỹ Khê beachfront', 'Bạch Đằng riverside', 'Ngũ Hành Sơn upper'],
    },
  },
  {
    id: 'vn_rural_north', name: 'Rural Red River Delta', country: 'Vietnam',
    type: 'rural', scale: 'village', region: 'North Vietnam',
    neighborhoods: {
      informal:      ['Xóm trọ', 'Cuối làng'],
      working_class: ['Xã trung tâm', 'Chợ xã'],
      middle_class:  ['Gần UBND', 'Phố chợ huyện'],
      elite:         ['Nhà cán bộ', 'Mặt đường lớn'],
    },
  },
  {
    id: 'vn_rural', name: 'Rural Mekong Delta', country: 'Vietnam',
    type: 'rural', scale: 'village', region: 'South Vietnam',
    neighborhoods: {
      informal:      ['Nhà ổ chuột ven sông', 'Xóm nghèo cuối kinh'],
      working_class: ['Xã trung tâm', 'Chợ xã'],
      middle_class:  ['Phố huyện', 'Gần UBND'],
      elite:         ['Nhà điền chủ', 'Mặt đường lớn'],
    },
  },

  // ── PHILIPPINES ────────────────────────────────────────────────────────────

  {
    id: 'ph_manila', name: 'Manila', country: 'Philippines',
    type: 'urban', scale: 'megacity', region: 'Luzon',
    neighborhoods: {
      informal:      ['Tondo', 'Baseco Compound', 'Smokey Mountain area', 'North Bay Boulevard slum'],
      working_class: ['Caloocan', 'Malabon', 'Valenzuela', 'Parañaque'],
      middle_class:  ['Quezon City', 'Mandaluyong', 'Pasig', 'Las Piñas'],
      elite:         ['Makati Salcedo/Legaspi', 'BGC (Bonifacio)', 'Forbes Park', 'Dasmarinas Village'],
    },
  },
  {
    id: 'ph_rural', name: 'Rural Visayas', country: 'Philippines',
    type: 'rural', scale: 'village', region: 'Visayas',
    neighborhoods: {
      informal:      ['Estero ng baryo', 'Basurahan katabi'],
      working_class: ['Poblacion', 'Market road'],
      middle_class:  ['Barangay center', 'Beside the plaza'],
      elite:         ['Bahay-na-bato ng principalia', 'Hacienda road'],
    },
  },

  // ── INDONESIA ──────────────────────────────────────────────────────────────

  {
    id: 'id_jakarta', name: 'Jakarta', country: 'Indonesia',
    type: 'urban', scale: 'megacity', region: 'Java',
    neighborhoods: {
      informal:      ['Penjaringan (Pluit slum)', 'Cilincing', 'Penggilingan kampung'],
      working_class: ['Tanah Abang', 'Pulo Gadung', 'Jatinegara', 'Pasar Minggu'],
      middle_class:  ['Kebayoran Baru', 'Tebet', 'Menteng lower', 'Kemang'],
      elite:         ['Menteng', 'Pondok Indah', 'Cilandak', 'Sudirman CBD'],
    },
  },
  {
    id: 'id_rural', name: 'Rural Java (village)', country: 'Indonesia',
    type: 'rural', scale: 'village', region: 'Java',
    neighborhoods: {
      informal:      ['Pinggiran desa', 'Kampung bawah'],
      working_class: ['Jalan desa', 'Dekat pasar'],
      middle_class:  ['Pusat desa', 'Dekat balai desa'],
      elite:         ['Rumah lurah', 'Tanah kiyai'],
    },
  },

  // ── THAILAND ───────────────────────────────────────────────────────────────

  {
    id: 'th_bangkok', name: 'Bangkok', country: 'Thailand',
    type: 'urban', scale: 'megacity', region: 'Central Thailand',
    neighborhoods: {
      informal:      ['Klong Toei slum', 'Saphan Phut', 'Bang Khun Thian shanties'],
      working_class: ['Min Buri', 'Bang Khen', 'Lat Krabang', 'Thung Khru'],
      middle_class:  ['Ladprao', 'Chatuchak', 'Bangna', 'Phra Khanong'],
      elite:         ['Sukhumvit Thong Lo', 'Silom', 'Sathorn', 'Phrom Phong'],
    },
  },
  {
    id: 'th_rural', name: 'Rural Isan', country: 'Thailand',
    type: 'rural', scale: 'village', region: 'Northeast Thailand',
    neighborhoods: {
      informal:      ['Ban khon jon', 'Rim khlong'],
      working_class: ['Thanon luang', 'Talat noi'],
      middle_class:  ['Amphoe', 'Nai mueang'],
      elite:         ['Ban phuyai ban', 'Rai khon mi'],
    },
  },

  // ── VENEZUELA ──────────────────────────────────────────────────────────────

  {
    id: 've_caracas', name: 'Caracas', country: 'Venezuela',
    type: 'urban', scale: 'major_city', region: 'Northern Venezuela',
    neighborhoods: {
      informal:      ['Petare', 'La Vega', 'Catia rancho', '23 de Enero end'],
      working_class: ['23 de Enero', 'El Valle', 'Antimano', 'Caricuao'],
      middle_class:  ['Las Mercedes', 'Chacao', 'El Paraíso', 'La Florida'],
      elite:         ['Altamira', 'Los Palos Grandes', 'La Lagunita', 'Prados del Este'],
    },
  },
  {
    id: 've_rural', name: 'Rural Llanos', country: 'Venezuela',
    type: 'rural', scale: 'village', region: 'Los Llanos',
    neighborhoods: {
      informal:      ['Ranchos del hato', 'Calle sin nombre'],
      working_class: ['Calle principal', 'Mercado'],
      middle_class:  ['Centro', 'Plaza Bolívar'],
      elite:         ['Hato ganadero', 'Casa del hacendado'],
    },
  },

  // ── HAITI ──────────────────────────────────────────────────────────────────

  {
    id: 'ht_port_au_prince', name: 'Port-au-Prince', country: 'Haiti',
    type: 'urban', scale: 'major_city', region: 'Ouest',
    neighborhoods: {
      informal:      ['Cité Soleil', 'Bel Air slum', 'La Saline', 'Martissant'],
      working_class: ['Delmas', 'Croix-des-Bouquets', 'Carrefour', 'Cabaret'],
      middle_class:  ['Pétion-Ville lower', 'Port-au-Prince center', 'Tabarre'],
      elite:         ['Pétion-Ville upper', 'Boutiliers road', 'Kenscoff'],
    },
  },
  {
    id: 'ht_rural', name: 'Rural Artibonite', country: 'Haiti',
    type: 'rural', scale: 'village', region: 'Artibonite',
    neighborhoods: {
      informal:      ['Kay pay (thatched housing)', 'Lakou bò rivyè'],
      working_class: ['Wout prensipal', 'Kote mache a'],
      middle_class:  ['Bò legliz', 'Seksyon kominal'],
      elite:         ['Kay gwo blan', 'Bitasyon'],
    },
  },

  // ── ZIMBABWE ───────────────────────────────────────────────────────────────

  {
    id: 'zw_harare', name: 'Harare', country: 'Zimbabwe',
    type: 'urban', scale: 'major_city', region: 'Mashonaland',
    neighborhoods: {
      informal:      ['Mbare (old hostels)', 'Glen Norah South', 'Epworth'],
      working_class: ['Mbare', 'Highfield', 'Glen Norah', 'Mufakose'],
      middle_class:  ['Waterfalls', 'Rugare', 'Lochinvar', 'Willowvale'],
      elite:         ['Borrowdale', 'Highlands', 'Mount Pleasant', 'Gunhill'],
    },
  },
  {
    id: 'zw_rural', name: 'Rural Mashonaland', country: 'Zimbabwe',
    type: 'rural', scale: 'village', region: 'Mashonaland',
    neighborhoods: {
      informal:      ['Informal plot', 'Compound kuma farm'],
      working_class: ['Growth point', 'Township road'],
      middle_class:  ['Business centre', 'Near the council'],
      elite:         ['Commercial farm', 'Resettlement block A'],
    },
  },

  // ── BANGLADESH ─────────────────────────────────────────────────────────────

  {
    id: 'bd_dhaka', name: 'Dhaka', country: 'Bangladesh',
    type: 'urban', scale: 'megacity', region: 'Central Bangladesh',
    neighborhoods: {
      informal:      ['Korail Bosti', 'Kamrangirchar', 'Agargaon slum', 'Tejgaon bosti'],
      working_class: ['Mirpur', 'Gazipur', 'Demra', 'Narayanganj'],
      middle_class:  ['Dhanmondi', 'Mohammadpur', 'Uttara', 'Bashundhara R/A'],
      elite:         ['Gulshan', 'Banani', 'Baridhara', 'DOHS'],
    },
  },
  {
    id: 'bd_rural', name: 'Rural Sylhet', country: 'Bangladesh',
    type: 'rural', scale: 'village', region: 'Northeast Bangladesh',
    neighborhoods: {
      informal:      ['Char (riverine island)', 'Jhupri para'],
      working_class: ['Bazar road', 'Hat para'],
      middle_class:  ['Union parishad', 'School road'],
      elite:         ['Zamindar bari', 'New brick house road'],
    },
  },

  // ── CAMBODIA ───────────────────────────────────────────────────────────────

  {
    id: 'kh_phnom_penh', name: 'Phnom Penh', country: 'Cambodia',
    type: 'urban', scale: 'major_city', region: 'Central Cambodia',
    neighborhoods: {
      informal:      ['Boeung Kak (former lake community)', 'Stung Meanchey', 'Russey Keo edge'],
      working_class: ['Meanchey', 'Sen Sok', 'Russey Keo', 'Dankor'],
      middle_class:  ['Chamkarmon', 'Tuol Kork', 'Boeng Keng Kang', 'Toul Tom Pong'],
      elite:         ['Tonle Bassac', '7 Makara', 'Riverside Daun Penh', 'BKK1'],
    },
  },
  {
    id: 'kh_rural', name: 'Rural Kampong Cham', country: 'Cambodia',
    type: 'rural', scale: 'village', region: 'Eastern Cambodia',
    neighborhoods: {
      informal:      ['Phoum kroch', 'Dei Leu'],
      working_class: ['Phsar thmey', 'Phloew dey'],
      middle_class:  ['Khum center', 'Sangkat office road'],
      elite:         ['Phteah thmey', 'Near the wat'],
    },
  },

  // ── NIGERIA ────────────────────────────────────────────────────────────────

  {
    id: 'ng_lagos', name: 'Lagos', country: 'Nigeria',
    type: 'urban', scale: 'megacity', region: 'Southwest Nigeria',
    neighborhoods: {
      informal:      ['Makoko (water slum)', 'Ajegunle', 'Mushin slum end', 'Oshodi'],
      working_class: ['Surulere', 'Mushin', 'Isale-Eko', 'Bariga'],
      middle_class:  ['Ikeja', 'Yaba', 'Gbagada', 'Maryland'],
      elite:         ['Victoria Island', 'Ikoyi', 'Lekki Phase 1', 'Banana Island'],
    },
  },
  {
    id: 'ng_abuja', name: 'Abuja', country: 'Nigeria',
    type: 'urban', scale: 'major_city', region: 'North Central Nigeria',
    neighborhoods: {
      informal:      ['Kubwa satellite town', 'Nyanya', 'Karu'],
      working_class: ['Karu', 'Nyanya', 'Lugbe', 'Gwagwalada'],
      middle_class:  ['Wuse', 'Garki', 'Asokoro lower', 'Gwarinpa'],
      elite:         ['Asokoro', 'Maitama', 'Diplomatic zone', 'Jabi'],
    },
  },
  {
    id: 'ng_kano', name: 'Kano', country: 'Nigeria',
    type: 'urban', scale: 'major_city', region: 'North Nigeria',
    neighborhoods: {
      informal:      ['Sabon Gari edge', 'Gwagwarwa', 'Dorayi outskirts'],
      working_class: ['Sabon Gari', 'Fagge', 'Dakata', 'Gwale'],
      middle_class:  ['Bompai', 'Nassarawa', 'Municipal', 'Tarauni'],
      elite:         ['GRA', 'Kabuga', 'Sharada industrial', 'Government House area'],
    },
  },
  {
    id: 'ng_rural', name: 'Rural Benue State', country: 'Nigeria',
    type: 'rural', scale: 'village', region: 'Middle Belt Nigeria',
    neighborhoods: {
      informal:      ['Ajo ama', 'Agatu flats'],
      working_class: ['Market road', 'Near the motor park'],
      middle_class:  ['Council ward', 'Main junction'],
      elite:         ['Chief\'s compound', 'New bungalow road'],
    },
  },

  // ── ETHIOPIA ───────────────────────────────────────────────────────────────

  {
    id: 'et_addis_ababa', name: 'Addis Ababa', country: 'Ethiopia',
    type: 'urban', scale: 'major_city', region: 'Central Ethiopia',
    neighborhoods: {
      informal:      ['Merkato slum edge', 'Kechene', 'Piassa poor blocks', 'Gotera chika'],
      working_class: ['Merkato', 'Arada', 'Akaky Kaliti', 'Nifas Silk-Lafto'],
      middle_class:  ['Bole', 'Kirkos', 'Gulele', 'Yeka'],
      elite:         ['Bole Medhanialem', 'Old Airport area', 'CMC', 'Kazanchis'],
    },
  },
  {
    id: 'et_rural', name: 'Rural Oromia', country: 'Ethiopia',
    type: 'rural', scale: 'village', region: 'Oromia',
    neighborhoods: {
      informal:      ['Bonde (temporary structures)', 'Geshey kebele'],
      working_class: ['Fere-gna', 'Merkato'],
      middle_class:  ['Kebele tsehafit bet', 'Genet'],
      elite:         ['Balabat ketema', 'New tin roof area'],
    },
  },

  // ── KENYA ──────────────────────────────────────────────────────────────────

  {
    id: 'ke_nairobi', name: 'Nairobi', country: 'Kenya',
    type: 'urban', scale: 'major_city', region: 'Central Kenya',
    neighborhoods: {
      informal:      ['Kibera', 'Mathare', 'Korogocho', 'Mukuru kwa Njenga'],
      working_class: ['Eastleigh', 'Shauri Moyo', 'Umoja', 'Kayole'],
      middle_class:  ['South B', 'Westlands', 'Langata', 'Kasarani'],
      elite:         ['Karen', 'Muthaiga', 'Runda', 'Lavington'],
    },
  },
  {
    id: 'ke_rural', name: 'Rural Nyanza', country: 'Kenya',
    type: 'rural', scale: 'village', region: 'Western Kenya',
    neighborhoods: {
      informal:      ['Makuti thatched end', 'Wazi la kando'],
      working_class: ['Mjini', 'Karibu na soko'],
      middle_class:  ['Katikati ya kijiji', 'Karibu na shule'],
      elite:         ['Nyumba ya mzee mkubwa', 'Karibu na ofisi ya DC'],
    },
  },

  // ── DR CONGO ───────────────────────────────────────────────────────────────

  {
    id: 'cd_kinshasa', name: 'Kinshasa', country: 'DR Congo',
    type: 'urban', scale: 'megacity', region: 'Kongo Central',
    neighborhoods: {
      informal:      ['Masina', 'Kimbanseke', 'Ndjili', 'Bumbu'],
      working_class: ['Lemba', 'Matete', 'Ngiri-Ngiri', 'Makala'],
      middle_class:  ['Limete', 'Binza', 'Ngaliema lower', 'Kisenso better area'],
      elite:         ['Gombe', 'Lingwala', 'Ngaliema villa zone', 'La Gombe diplomatique'],
    },
  },
  {
    id: 'cd_rural', name: 'Rural Kasai', country: 'DR Congo',
    type: 'rural', scale: 'village', region: 'Kasai',
    neighborhoods: {
      informal:      ['Bidonville', 'Cases rondes'],
      working_class: ['Tronc principal', 'Marché du village'],
      middle_class:  ['Bureau de chefferie', 'Centre du village'],
      elite:         ['Maison du chef', 'Mission catholique'],
    },
  },

  // ── GHANA ──────────────────────────────────────────────────────────────────

  {
    id: 'gh_accra', name: 'Accra', country: 'Ghana',
    type: 'urban', scale: 'major_city', region: 'Greater Accra',
    neighborhoods: {
      informal:      ['Nima', 'Agbogbloshie', 'Chorkor', 'Bukom'],
      working_class: ['Labadi', 'Ashaiman', 'Tema South', 'Adenta'],
      middle_class:  ['Osu', 'Labone', 'Adabraka', 'East Legon lower'],
      elite:         ['East Legon', 'Airport Hills', 'Cantonments', 'Trasacco Valley'],
    },
  },
  {
    id: 'gh_rural', name: 'Rural Northern Region', country: 'Ghana',
    type: 'rural', scale: 'village', region: 'Northern Ghana',
    neighborhoods: {
      informal:      ['Kpangkpaa', 'Za'],
      working_class: ['Zongo', 'Market day road'],
      middle_class:  ['Nayiri area', 'Near the chief\'s palace'],
      elite:         ['Chief\'s palace', 'Government bungalow'],
    },
  },

  // ── SENEGAL ────────────────────────────────────────────────────────────────

  {
    id: 'sn_dakar', name: 'Dakar', country: 'Senegal',
    type: 'urban', scale: 'major_city', region: 'Cap-Vert',
    neighborhoods: {
      informal:      ['Pikine Irrégulier', 'Guédiawaye', 'Thiaroye'],
      working_class: ['Pikine', 'Parcelles Assainies', 'Grand Dakar', 'Médina'],
      middle_class:  ['Liberté 6', 'Mermoz', 'Point E', 'Ouakam'],
      elite:         ['Les Almadies', 'Fann-Point E', 'Plateau (Dakar centre)', 'Mamelles'],
    },
  },
  {
    id: 'sn_rural', name: 'Rural Casamance', country: 'Senegal',
    type: 'rural', scale: 'village', region: 'Casamance',
    neighborhoods: {
      informal:      ['Quartier périphérique', 'Campements'],
      working_class: ['Marché', 'Route principale'],
      middle_class:  ['Centre du village', 'Mosquée area'],
      elite:         ['Maison du chef', 'Dispensaire road'],
    },
  },

  // ── MOZAMBIQUE ─────────────────────────────────────────────────────────────

  {
    id: 'mz_maputo', name: 'Maputo', country: 'Mozambique',
    type: 'urban', scale: 'major_city', region: 'Southern Mozambique',
    neighborhoods: {
      informal:      ['Polana Caniço', 'Hulene', 'Chamanculo', 'Maxaquene'],
      working_class: ['Machava', 'Matola', 'Inhagoia', 'George Dimitrov bairro'],
      middle_class:  ['Alto Maé', 'Sommerschield', 'Malhangalene', 'Coop'],
      elite:         ['Sommerschield I', 'Polana', 'Central Maputo', 'Marginal'],
    },
  },
  {
    id: 'mz_rural', name: 'Rural Zambézia', country: 'Mozambique',
    type: 'rural', scale: 'village', region: 'Central Mozambique',
    neighborhoods: {
      informal:      ['Machamba (informal)', 'Bairro de palha'],
      working_class: ['Estrada principal', 'Mercado'],
      middle_class:  ['Sede do distrito', 'Perto da escola'],
      elite:         ['Administração', 'Casa dos colonos (old)'],
    },
  },

  // ── RWANDA ─────────────────────────────────────────────────────────────────

  {
    id: 'rw_kigali', name: 'Kigali', country: 'Rwanda',
    type: 'urban', scale: 'major_city', region: 'Central Rwanda',
    neighborhoods: {
      informal:      ['Nyamirambo Giheke', 'Kimisagara', 'Biryogo'],
      working_class: ['Nyamirambo', 'Gitega', 'Rwezamenyo', 'Batsinda'],
      middle_class:  ['Remera', 'Kacyiru lower', 'Kimihurura', 'Gikondo'],
      elite:         ['Kiyovu', 'Kacyiru upper', 'Nyarutarama', 'Kibagabaga'],
    },
  },
  {
    id: 'rw_rural', name: 'Rural Southern Rwanda', country: 'Rwanda',
    type: 'rural', scale: 'village', region: 'Southern Province',
    neighborhoods: {
      informal:      ['Rugo (scattered homestead)', 'Imidugudu old'],
      working_class: ['Imidugudu center', 'Near the colline'],
      middle_class:  ['Sector office road', 'Market center'],
      elite:         ['Umuyange (new house area)', 'Sector official\'s road'],
    },
  },

  // ── AFGHANISTAN ────────────────────────────────────────────────────────────

  {
    id: 'af_kabul', name: 'Kabul', country: 'Afghanistan',
    type: 'urban', scale: 'major_city', region: 'Eastern Afghanistan',
    neighborhoods: {
      informal:      ['Chaman-e-Babrak IDP camp', 'Qala-e-Musa', 'Khair Khana informal'],
      working_class: ['Khair Khana', 'Deh Afghanan', 'Baraki Barak area', 'Qalai Zaman Khan'],
      middle_class:  ['Wazir Akbar Khan lower', 'Shar-e-Naw', 'Macrorayon', 'Kart-e-Seh'],
      elite:         ['Wazir Akbar Khan', 'Sherpur', 'Qala-e-Fatullah elite', 'TV Hill area'],
    },
  },
  {
    id: 'af_rural', name: 'Rural Helmand', country: 'Afghanistan',
    type: 'rural', scale: 'village', region: 'Southern Afghanistan',
    neighborhoods: {
      informal:      ['Kochi camp', 'Kalay khodai'],
      working_class: ['Bazar', 'Afshar road'],
      middle_class:  ['Markaz', 'Haji\'s road'],
      elite:         ['Malik\'s compound', 'Commander\'s qala'],
    },
  },

  // ── SYRIA ──────────────────────────────────────────────────────────────────

  {
    id: 'sy_damascus', name: 'Damascus', country: 'Syria',
    type: 'urban', scale: 'major_city', region: 'Western Syria',
    neighborhoods: {
      informal:      ['Yarmouk Camp', 'Tadamon', 'Qaboun informal'],
      working_class: ['Bab Sharqi', 'Qaboun', 'Harasta', 'Douma'],
      middle_class:  ['Mezzeh lower', 'Kafr Sousa', 'Abu Rummaneh', 'Al-Muhajireen'],
      elite:         ['Mezzeh 86', 'Malki', 'Rawda', 'Abu Rummaneh top'],
    },
  },
  {
    id: 'sy_rural', name: 'Rural Idlib', country: 'Syria',
    type: 'rural', scale: 'village', region: 'Northwest Syria',
    neighborhoods: {
      informal:      ['Khiyam (displaced camp)', 'Bayt talab'],
      working_class: ['Shara\' al-asasi', 'Souq'],
      middle_class:  ['Markaz', 'Hay al-jadid'],
      elite:         ['Manzil al-mukhtar', 'Qa\'id road'],
    },
  },

  // ── SOMALIA ────────────────────────────────────────────────────────────────

  {
    id: 'so_mogadishu', name: 'Mogadishu', country: 'Somalia',
    type: 'urban', scale: 'major_city', region: 'Benadir',
    neighborhoods: {
      informal:      ['Badbaado IDP camp', 'Kaxda', 'Huriwaa'],
      working_class: ['Hodan', 'Wadajir', 'Waberi', 'Heliwa'],
      middle_class:  ['Hamar-Weyne', 'Dharkenley', 'Yaaqshiid', 'Bondhere'],
      elite:         ['Boondheere elite', 'Maka Al-Mukarama road', 'Ex-Villa Somalia zone'],
    },
  },

  // ── YEMEN ──────────────────────────────────────────────────────────────────

  {
    id: 'ye_sanaa', name: 'Sana\'a', country: 'Yemen',
    type: 'urban', scale: 'major_city', region: 'Northwest Yemen',
    neighborhoods: {
      informal:      ['Beit Baws', 'Hasaba outskirts', 'IDP camp south'],
      working_class: ['Al-Wahda', 'Al-Thawra', 'Al-Sabeen', 'Shoub'],
      middle_class:  ['Al-Zubairi Street', 'Hadda', 'Al-Qadisiya', 'Haddah'],
      elite:         ['Hadda upper', 'Diplomatic quarter', 'Al-Rabwah', 'Hayel street'],
    },
  },

  // ── MYANMAR ────────────────────────────────────────────────────────────────

  {
    id: 'mm_yangon', name: 'Yangon', country: 'Myanmar',
    type: 'urban', scale: 'major_city', region: 'Lower Myanmar',
    neighborhoods: {
      informal:      ['Hlaing Tharyar', 'Shwe Pyi Thar', 'Dagon Seikkan'],
      working_class: ['Tamwe', 'Insein', 'Mayangone', 'Mingaladon'],
      middle_class:  ['Kamayut', 'Bahan', 'Thingungyun', 'Yankin'],
      elite:         ['Golden Valley', 'Inya Lake area', 'Dagon (north)', 'Windermere'],
    },
  },
  {
    id: 'mm_rural', name: 'Rural Sagaing', country: 'Myanmar',
    type: 'rural', scale: 'village', region: 'Upper Myanmar',
    neighborhoods: {
      informal:      ['Kyaung-taik', 'Ywa-thit'],
      working_class: ['Ywa-gyi', 'Bazar road'],
      middle_class:  ['Pyay road', 'Myoma'],
      elite:         ['Thakin\'s compound', 'District office road'],
    },
  },

  // ── SAUDI ARABIA ───────────────────────────────────────────────────────────

  // ── THE GULF ───────────────────────────────────────────────────────────────
  // Qatar, Kuwait, Bahrain and Oman had no places at all, and the UAE had only
  // Dubai. The neighbourhood tiers here are not a wealth gradient in the usual
  // sense: they are the two cities the UAE's own country note describes, where
  // "an Emirati and a Bangladeshi construction worker live in the same square
  // kilometre but inhabit entirely different cities". The `informal` tier is
  // labour accommodation — real places, named as they are named.
  {
    id: 'ae_abudhabi', name: 'Abu Dhabi', country: 'UAE',
    type: 'urban', scale: 'major_city', region: 'Abu Dhabi',
    neighborhoods: {
      informal:      ['Mussafah labour accommodation', 'ICAD worker housing', 'Shahama camp', 'Mafraq labour village'],
      working_class: ['Musaffah Shabiya', 'Al Shahama', 'Baniyas', 'Mohammed Bin Zayed City'],
      middle_class:  ['Khalidiya', 'Al Nahyan', 'Mussafah Gardens', 'Al Mushrif'],
      elite:         ['Saadiyat', 'Al Bateen', 'Khalifa City A', 'Al Raha Beach'],
    },
  },

  {
    id: 'ae_sharjah', name: 'Sharjah', country: 'UAE',
    type: 'urban', scale: 'city', region: 'Sharjah',
    neighborhoods: {
      informal:      ['Industrial Area 12 accommodation', 'Sajaa camp', 'Al Sajaa worker housing'],
      working_class: ['Al Nahda', 'Rolla', 'Al Qasimia', 'Abu Shagara'],
      middle_class:  ['Al Majaz', 'Al Khan', 'Al Taawun', 'Muwaileh'],
      elite:         ['Al Ramtha', 'Sharqan', 'Al Noaf', 'Tilal City'],
    },
  },

  {
    id: 'qa_doha', name: 'Doha', country: 'Qatar',
    type: 'urban', scale: 'major_city', region: 'Ad Dawhah',
    neighborhoods: {
      informal:      ['Industrial Area Street 18', 'Sanaiya labour camp', 'Barwa Al Baraha', 'Asian Town'],
      working_class: ['Najma', 'Al Mansoura', 'Umm Ghuwailina', 'Doha Al Jadeed'],
      middle_class:  ['Al Sadd', 'Bin Mahmoud', 'Al Hilal', 'Madinat Khalifa'],
      elite:         ['Al Waab', 'West Bay Lagoon', 'The Pearl', 'Onaiza'],
    },
  },

  {
    id: 'qa_alkhor', name: 'Al Khor', country: 'Qatar',
    type: 'urban', scale: 'town', region: 'Al Khor',
    neighborhoods: {
      informal:      ['Contractor accommodation', 'Ras Laffan worker housing'],
      working_class: ['Al Khor town centre', 'Al Thakhira'],
      middle_class:  ['Al Khor Community', 'Barzan'],
      elite:         ['Al Khor Resort villas'],
    },
  },

  {
    id: 'kw_kuwaitcity', name: 'Kuwait City', country: 'Kuwait',
    type: 'urban', scale: 'major_city', region: 'Al Asimah',
    neighborhoods: {
      informal:      ['Jleeb Al-Shuyoukh', 'Khaitan bachelor blocks', 'Mahboula worker flats', 'Fahaheel labour housing'],
      working_class: ['Farwaniya', 'Hawalli', 'Salmiya inland', 'Jahra'],
      middle_class:  ['Salmiya', 'Rumaithiya', 'Qadsiya', 'Adailiya'],
      elite:         ['Bayan', 'Mishref', 'Shuwaikh Residential', 'Abdullah Al-Salem'],
    },
  },

  {
    id: 'bh_manama', name: 'Manama', country: 'Bahrain',
    type: 'urban', scale: 'city', region: 'Capital Governorate',
    neighborhoods: {
      informal:      ['Gudaibiya bachelor flats', 'Ma\'ameer labour housing', 'Salmabad accommodation'],
      working_class: ['Sanabis', 'Bilad Al Qadeem', 'Naim', 'Sitra'],
      middle_class:  ['Adliya', 'Mahooz', 'Umm Al Hassam', 'Juffair'],
      elite:         ['Seef', 'Bu Ghazal', 'Amwaj', 'Riffa Views'],
    },
  },

  {
    id: 'bh_muharraq', name: 'Muharraq', country: 'Bahrain',
    type: 'urban', scale: 'town', region: 'Muharraq',
    neighborhoods: {
      informal:      ['Old Muharraq bachelor rooms', 'Hidd worker housing'],
      working_class: ['Halat Bu Maher', 'Arad', 'Busaiteen'],
      middle_class:  ['Muharraq souq quarter', 'Dair'],
      elite:         ['Amwaj Islands', 'Diyar Al Muharraq'],
    },
  },

  {
    id: 'om_muscat', name: 'Muscat', country: 'Oman',
    type: 'urban', scale: 'city', region: 'Muscat',
    neighborhoods: {
      informal:      ['Ruwi bachelor rooms', 'Wadi Kabir labour housing', 'Ghala industrial accommodation'],
      working_class: ['Ruwi', 'Wadi Kabir', 'Al Amerat', 'Mabela'],
      middle_class:  ['Al Khuwair', 'Ghubrah', 'Azaiba', 'Bawshar'],
      elite:         ['Shatti Al Qurum', 'Qurum Heights', 'Madinat Al Sultan Qaboos', 'The Wave'],
    },
  },

  {
    id: 'om_interior', name: 'Rural Al Dakhiliyah', country: 'Oman',
    type: 'rural', scale: 'village', region: 'Interior',
    neighborhoods: {
      informal:      ['Date-garden shacks', 'Falaj-edge houses'],
      working_class: ['Village houses by the falaj', 'Mudbrick quarter'],
      middle_class:  ['The new block houses', 'Houses on the graded road'],
      elite:         ['The sheikh\'s house', 'The fort quarter'],
    },
  },

  {
    id: 'sa_riyadh', name: 'Riyadh', country: 'Saudi Arabia',
    type: 'urban', scale: 'megacity', region: 'Najd',
    neighborhoods: {
      informal:      ['Manfuha (expat labor)', 'Jarda', 'Al-Hazm edge'],
      working_class: ['Al-Shifa', 'Al-Naseem', 'Al-Rawabi', 'South Olaya'],
      middle_class:  ['Al-Malaz', 'Al-Murabba', 'Al-Aarid', 'Batha'],
      elite:         ['Al-Olaya', 'Al-Sulimaniyah', 'Hittin', 'Al-Nakheel'],
    },
  },
  {
    id: 'sa_rural', name: 'Rural Asir', country: 'Saudi Arabia',
    type: 'rural', scale: 'village', region: 'Asir',
    neighborhoods: {
      informal:      ['Hara al-umal', 'Al-kharj'],
      working_class: ['Al-suq', 'Harat al-wosta'],
      middle_class:  ['Markaz al-hay', 'Jami\' al-kabir area'],
      elite:         ['Qasr al-amir', 'Manzil al-wali'],
    },
  },

  // ── UAE ────────────────────────────────────────────────────────────────────

  {
    id: 'ae_dubai', name: 'Dubai', country: 'UAE',
    type: 'urban', scale: 'major_city', region: 'Dubai Emirate',
    neighborhoods: {
      informal:      ['Sonapur (labor camp)', 'Al Quoz industrial', 'Muhaisnah'],
      working_class: ['Deira', 'Bur Dubai', 'Al Karama', 'Satwa'],
      middle_class:  ['Jumeirah', 'Al Barsha', 'Mirdif', 'Silicon Oasis'],
      elite:         ['Palm Jumeirah', 'Emirates Hills', 'Downtown Dubai', 'Dubai Marina'],
    },
  },

  // ── INDIA ──────────────────────────────────────────────────────────────────

  {
    id: 'in_mumbai', name: 'Mumbai', country: 'India',
    type: 'urban', scale: 'megacity', region: 'Maharashtra',
    neighborhoods: {
      informal:      ['Dharavi', 'Govandi', 'Mankhurd', 'Shivajinagar-Bainganwadi'],
      working_class: ['Kurla', 'Bhandup', 'Vikhroli', 'Ghatkopar'],
      middle_class:  ['Bandra West', 'Andheri', 'Thane', 'Mulund'],
      elite:         ['Malabar Hill', 'Colaba', 'Altamount Road', 'Cuffe Parade'],
    },
  },
  {
    id: 'in_delhi', name: 'Delhi', country: 'India',
    type: 'urban', scale: 'megacity', region: 'Northern India',
    neighborhoods: {
      informal:      ['Yamuna Pushta (basti)', 'Sangam Vihar', 'Seelampur', 'Mangolpuri'],
      working_class: ['Shahdara', 'Patparganj', 'Dwarka outer', 'Uttam Nagar'],
      middle_class:  ['Lajpat Nagar', 'Saket', 'Pitampura', 'Rohini'],
      elite:         ['Lutyens\' Delhi', 'Golf Links', 'Jor Bagh', 'Vasant Vihar'],
    },
  },
  {
    id: 'in_bangalore', name: 'Bangalore', country: 'India',
    type: 'urban', scale: 'major_city', region: 'Karnataka',
    neighborhoods: {
      informal:      ['HAL Old Airport slums', 'Ejipura poor blocks', 'Byatarayanapura'],
      working_class: ['Shivajinagar', 'Rajajinagar', 'Dasarahalli', 'Hebbal lower'],
      middle_class:  ['Jayanagar', 'JP Nagar', 'Koramangala', 'Indiranagar'],
      elite:         ['Whitefield', 'Sadashivanagar', 'Ulsoor Lake area', 'Race Course Road'],
    },
  },
  {
    id: 'in_rural_up', name: 'Rural Uttar Pradesh', country: 'India',
    type: 'rural', scale: 'village', region: 'Northern India',
    neighborhoods: {
      informal:      ['Basti of chamars', 'Dalit tola'],
      working_class: ['Bazaar gali', 'Muslim mohalla'],
      middle_class:  ['Kachehri road', 'Brahmin tola'],
      elite:         ['Thakur haveli', 'Landlord\'s block'],
    },
  },

  // ── PAKISTAN ───────────────────────────────────────────────────────────────

  {
    id: 'pk_karachi', name: 'Karachi', country: 'Pakistan',
    type: 'urban', scale: 'megacity', region: 'Sindh',
    neighborhoods: {
      informal:      ['Orangi Town (part)', 'Qasba Colony', 'Liaquatabad low-end', 'Bedia'],
      working_class: ['Korangi', 'Landhi', 'Baldia', 'Liaquatabad'],
      middle_class:  ['Gulshan-e-Iqbal', 'North Nazimabad', 'PECHS', 'Nazimabad'],
      elite:         ['DHA', 'Clifton', 'Defence', 'Bath Island'],
    },
  },
  {
    id: 'pk_lahore', name: 'Lahore', country: 'Pakistan',
    type: 'urban', scale: 'major_city', region: 'Punjab',
    neighborhoods: {
      informal:      ['Shad Bagh low-end', 'Sanda Kalan', 'Bhatta Chowk area'],
      working_class: ['Shahdara', 'Ravi Road area', 'Township', 'Johar Town outer'],
      middle_class:  ['Gulberg', 'Johar Town', 'Model Town', 'Garden Town'],
      elite:         ['DHA Lahore', 'Cantt', 'Bahria Town', 'GOR I-II'],
    },
  },
  {
    id: 'pk_rural', name: 'Rural Punjab', country: 'Pakistan',
    type: 'rural', scale: 'village', region: 'Central Pakistan',
    neighborhoods: {
      informal:      ['Kammi goth', 'Musalli quarters'],
      working_class: ['Chowk', 'Bazaar road'],
      middle_class:  ['Thana road', 'Near mosque'],
      elite:         ['Zamindar haveli', 'Numberdar\'s plot'],
    },
  },

  // ── IRAN ───────────────────────────────────────────────────────────────────

  {
    id: 'ir_tehran', name: 'Tehran', country: 'Iran',
    type: 'urban', scale: 'megacity', region: 'Tehran Province',
    neighborhoods: {
      informal:      ['Khak-e-Sefid', 'Islamshahr South', 'Shahr-e-Rey edge'],
      working_class: ['Narmak', 'Shahr-e-Rey', '13 Aban', 'Dolatabad'],
      middle_class:  ['Yusefabad', 'Noor', 'Ekbatan', 'Pasdaran (lower)'],
      elite:         ['Zafaraniyeh', 'Elahiyeh', 'Fereshteh', 'Shahrak-e-Gharb (upper)'],
    },
  },
  {
    id: 'ir_rural', name: 'Rural Isfahan', country: 'Iran',
    type: 'rural', scale: 'village', region: 'Central Iran',
    neighborhoods: {
      informal:      ['Eshkevari', 'Hoshang\'s alley'],
      working_class: ['Chaharshouq', 'Khiaban-e asli'],
      middle_class:  ['Bakhshdarye', 'Near the mosque'],
      elite:         ['Agha\'s land', 'District office road'],
    },
  },

  // ── EGYPT ──────────────────────────────────────────────────────────────────

  {
    id: 'eg_cairo', name: 'Cairo', country: 'Egypt',
    type: 'urban', scale: 'megacity', region: 'Lower Egypt',
    neighborhoods: {
      informal:      ['Manshiyat Naser (Garbage City)', 'Imbaba slum', 'Ain Shams poor', 'Dar el-Salam'],
      working_class: ['Shubra', 'Imbaba', 'Helwan', 'Shoubra El-Kheima'],
      middle_class:  ['Nasr City', 'Maadi lower', 'Heliopolis', 'Ain Shams'],
      elite:         ['Zamalek', 'Garden City', 'New Cairo (Hyde Park area)', 'Maadi upper'],
    },
  },
  {
    id: 'eg_rural', name: 'Rural Upper Egypt', country: 'Egypt',
    type: 'rural', scale: 'village', region: 'Upper Egypt',
    neighborhoods: {
      informal:      ['Ashwa\'iyyat', 'Akwakh al-ummah'],
      working_class: ['Sharia al-umumi', 'Hay al-umal'],
      middle_class:  ['Markaz', 'Sharia al-mahatta'],
      elite:         ['Manzil al-umda', 'Hay al-biyas'],
    },
  },

  // ── MOROCCO ────────────────────────────────────────────────────────────────

  {
    id: 'ma_casablanca', name: 'Casablanca', country: 'Morocco',
    type: 'urban', scale: 'major_city', region: 'Grand Casablanca',
    neighborhoods: {
      informal:      ['Ben M\'Sik', 'Hay Mohammadi', 'Sidi Moumen', 'Derb Sultan edge'],
      working_class: ['Ain Chock', 'Ain Sebaa', 'Hay Hassani', 'Bernoussi'],
      middle_class:  ['Maarif', 'Bourgogne', 'Racine', 'Val Fleuri'],
      elite:         ['Anfa', 'CIL', 'California', 'Corniche Ain Diab'],
    },
  },
  {
    id: 'ma_rural', name: 'Rural Souss-Massa', country: 'Morocco',
    type: 'rural', scale: 'village', region: 'Southern Morocco',
    neighborhoods: {
      informal:      ['Douar des pauvres', 'Khaima'],
      working_class: ['Souk El Had', 'Route principale'],
      middle_class:  ['Centre du village', 'Mosquée area'],
      elite:         ['Dar Caïd', 'Villa du colon (old)'],
    },
  },

  // ── CUBA ───────────────────────────────────────────────────────────────────

  {
    id: 'cu_havana', name: 'Havana', country: 'Cuba',
    type: 'urban', scale: 'major_city', region: 'Western Cuba',
    neighborhoods: {
      informal:      ['La Corea', 'Los Pocitos', 'Cayo Hueso edge', 'Pogolotti'],
      working_class: ['Pogolotti', 'Cerro', 'Regla', 'Guanabacoa'],
      middle_class:  ['El Vedado lower', 'Centro Habana', 'Miramar (lower)', 'Playa'],
      elite:         ['Miramar (5th Avenue)', 'Siboney', 'Kohly', 'Nuevo Vedado top'],
    },
  },
  {
    id: 'cu_rural', name: 'Rural Pinar del Río', country: 'Cuba',
    type: 'rural', scale: 'village', region: 'Western Cuba',
    neighborhoods: {
      informal:      ['Bohíos de tabaco', 'Finca de los pobres'],
      working_class: ['Calle central', 'Junto al central azucarero'],
      middle_class:  ['Parque central', 'Calle Martí'],
      elite:         ['Antigua finca del hacendado', 'Casa del partido (old)'],
    },
  },

  // ── PERU ───────────────────────────────────────────────────────────────────

  {
    id: 'pe_lima', name: 'Lima', country: 'Peru',
    type: 'urban', scale: 'megacity', region: 'Lima Region',
    neighborhoods: {
      informal:      ['Villa El Salvador (early)', 'San Juan de Lurigancho asentamiento', 'Callao chalet'],
      working_class: ['El Agustino', 'San Juan de Miraflores', 'Villa María del Triunfo', 'Comas'],
      middle_class:  ['Los Olivos', 'San Borja lower', 'Surco', 'Ate Vitarte upper'],
      elite:         ['Miraflores', 'San Isidro', 'La Molina', 'Surco top'],
    },
  },
  {
    id: 'pe_rural', name: 'Rural Ayacucho', country: 'Peru',
    type: 'rural', scale: 'village', region: 'Ayacucho Highlands',
    neighborhoods: {
      informal:      ['Asentamiento campesino', 'Rancho bajo'],
      working_class: ['Calle real', 'Mercado'],
      middle_class:  ['Plaza de armas', 'Municipio road'],
      elite:         ['Casa de los hacendados', 'Gamonales'],
    },
  },

  // ── SRI LANKA ──────────────────────────────────────────────────────────────

  {
    id: 'lk_colombo', name: 'Colombo', country: 'Sri Lanka',
    type: 'urban', scale: 'major_city', region: 'Western Province',
    neighborhoods: {
      informal:      ['Slave Island slum (Kompannavidiya)', 'Wellawatte back lanes', 'Mattakkuliya'],
      working_class: ['Maharagama', 'Dehiwala', 'Moratuwa', 'Nugegoda'],
      middle_class:  ['Borella', 'Kirulapone', 'Rajagiriya', 'Kohuwala'],
      elite:         ['Cinnamon Gardens (7)', 'Kolupitiya', 'Ward Place', 'Elvitigala'],
    },
  },
  {
    id: 'lk_rural', name: 'Rural Kandy District', country: 'Sri Lanka',
    type: 'rural', scale: 'village', region: 'Central Province',
    neighborhoods: {
      informal:      ['Estate lines (tea)', 'Watte'],
      working_class: ['Junction road', 'Near the temple'],
      middle_class:  ['Main road', 'Pradeshiya Sabha area'],
      elite:         ['Walauwa (manor)', 'Planter\'s bungalow'],
    },
  },

  // ── NEPAL ──────────────────────────────────────────────────────────────────

  {
    id: 'np_kathmandu', name: 'Kathmandu', country: 'Nepal',
    type: 'urban', scale: 'major_city', region: 'Bagmati Province',
    neighborhoods: {
      informal:      ['Sukumbasi basti', 'Bagmati river bank settlements', 'Naya Bazaar slum'],
      working_class: ['Kirtipur', 'Gongabu', 'Koteshwor', 'Chabahil'],
      middle_class:  ['Baluwatar', 'Lazimpat', 'Baneshwor', 'New Baneshwor'],
      elite:         ['Maharajgunj', 'Sanepa', 'Jhamsikhel', 'Patan Durbar area'],
    },
  },
  {
    id: 'np_rural', name: 'Rural Terai', country: 'Nepal',
    type: 'rural', scale: 'village', region: 'Terai',
    neighborhoods: {
      informal:      ['Harwa tola', 'Musahar basti'],
      working_class: ['Bazaar tol', 'Ward number 3'],
      middle_class:  ['Village development committee', 'Near school'],
      elite:         ['Zamindar\'s compound', 'Mukiya\'s house'],
    },
  },

  // ── CHILE ──────────────────────────────────────────────────────────────────

  {
    id: 'cl_santiago', name: 'Santiago', country: 'Chile',
    type: 'urban', scale: 'major_city', region: 'Región Metropolitana',
    neighborhoods: {
      informal:      ['La Pintana campamento', 'El Castillo', 'José María Caro South', 'Lo Hermida'],
      working_class: ['La Pintana', 'La Granja', 'El Bosque', 'Cerro Navia'],
      middle_class:  ['Ñuñoa', 'Macul', 'La Florida', 'Maipú'],
      elite:         ['Las Condes', 'Vitacura', 'Lo Barnechea', 'Providencia'],
    },
  },
  {
    id: 'cl_rural', name: 'Rural Araucanía', country: 'Chile',
    type: 'rural', scale: 'village', region: 'Araucanía',
    neighborhoods: {
      informal:      ['Ruka (Mapuche housing)', 'Campamento temporal'],
      working_class: ['Calle comercial', 'Cercanías a la feria'],
      middle_class:  ['Plaza de armas', 'Calle de la municipalidad'],
      elite:         ['Fundo', 'Casona patronal'],
    },
  },

  // ── JORDAN ─────────────────────────────────────────────────────────────────

  {
    id: 'jo_amman', name: 'Amman', country: 'Jordan',
    type: 'urban', scale: 'major_city', region: 'Amman Governorate',
    neighborhoods: {
      informal:      ['Zarqa refugee area', 'Wehdat (Palestinian camp)', 'Rusaifa edge'],
      working_class: ['Wehdat', 'Basman', 'Nuzha', 'Jabal Taj'],
      middle_class:  ['Jabal Amman', 'Al-Rabiyeh', 'Shmeisani', 'University area'],
      elite:         ['Abdoun', 'Sweifieh', 'Deir Ghbar', 'Tla\' al Ali upper'],
    },
  },
  {
    id: 'jo_rural', name: 'Rural Mafraq', country: 'Jordan',
    type: 'rural', scale: 'village', region: 'Northern Jordan',
    neighborhoods: {
      informal:      ['Mukhayyam', 'Nuzul al-asatir'],
      working_class: ['Sharia\' al-umumi', 'Maqha street'],
      middle_class:  ['Markaz', 'Al-jami\'a area'],
      elite:         ['Manzil al-mukhtar', 'Binaya jadida'],
    },
  },

  // ── TANZANIA ───────────────────────────────────────────────────────────────

  {
    id: 'tz_dar_es_salaam', name: 'Dar es Salaam', country: 'Tanzania',
    type: 'urban', scale: 'major_city', region: 'Eastern Tanzania',
    neighborhoods: {
      informal:      ['Mwananyamala poor blocks', 'Tandale', 'Buguruni', 'Vingunguti'],
      working_class: ['Kinondoni', 'Temeke', 'Ubungo', 'Mwananyamala'],
      middle_class:  ['Kariakoo', 'Upanga', 'Mikocheni', 'Sinza'],
      elite:         ['Oyster Bay', 'Masaki', 'Msasani', 'Sea Cliff area'],
    },
  },
  {
    id: 'tz_rural', name: 'Rural Kilimanjaro', country: 'Tanzania',
    type: 'rural', scale: 'village', region: 'Northern Tanzania',
    neighborhoods: {
      informal:      ['Nyumba za udongo', 'Mji mdogo'],
      working_class: ['Sokoni', 'Njia kuu'],
      middle_class:  ['Kata', 'Karibu na kanisa'],
      elite:         ['Nyumba ya chifu', 'Mstari wa ofisi'],
    },
  },

  // ── UGANDA ─────────────────────────────────────────────────────────────────

  {
    id: 'ug_kampala', name: 'Kampala', country: 'Uganda',
    type: 'urban', scale: 'major_city', region: 'Central Uganda',
    neighborhoods: {
      informal:      ['Bwaise', 'Kamwokya slum end', 'Kisenyi', 'Natete'],
      working_class: ['Kawempe', 'Rubaga', 'Makindye', 'Nansana'],
      middle_class:  ['Nakawa', 'Kamwokya', 'Ntinda', 'Luzira'],
      elite:         ['Kololo', 'Muyenga', 'Naguru', 'Bugolobi'],
    },
  },
  {
    id: 'ug_rural', name: 'Rural Eastern Uganda', country: 'Uganda',
    type: 'rural', scale: 'village', region: 'Eastern Uganda',
    neighborhoods: {
      informal:      ['Oluwa (IDP area)', 'Mud hut cluster'],
      working_class: ['Trading centre', 'Near the church'],
      middle_class:  ['Sub-county HQ', 'Main trading road'],
      elite:         ['Chief\'s home', 'Brick house zone'],
    },
  },

  // ── NAMIBIA ────────────────────────────────────────────────────────────────

  {
    id: 'na_windhoek', name: 'Windhoek', country: 'Namibia',
    type: 'urban', scale: 'major_city', region: 'Khomas',
    neighborhoods: {
      informal:      ['Havana (Katutura)', 'Babylon', 'Greenwell Matongo'],
      working_class: ['Katutura', 'Khomasdal', 'Northern Industrial', 'Okuryangava'],
      middle_class:  ['Pionier Park', 'Hochland Park', 'Eros', 'Suiderhof'],
      elite:         ['Olympia', 'Ludwigsdorf', 'Auas Valley', 'Kleine Kuppe'],
    },
  },

  // ── CZECH REPUBLIC ─────────────────────────────────────────────────────────

  {
    id: 'cz_prague', name: 'Prague', country: 'Czech Republic',
    type: 'urban', scale: 'major_city', region: 'Bohemia',
    neighborhoods: {
      informal:      ['Chanov (North Bohemia nearby)', 'Průhonická edge', 'Letňany far'],
      working_class: ['Žižkov', 'Holešovice', 'Smíchov', 'Nusle'],
      middle_class:  ['Vinohrady', 'Dejvice', 'Vršovice', 'Letná'],
      elite:         ['Hradčany', 'Bubeneč', 'Střešovice', 'Hanspaulka'],
    },
  },
  {
    id: 'cz_rural', name: 'Rural Moravia', country: 'Czech Republic',
    type: 'rural', scale: 'village', region: 'Moravia',
    neighborhoods: {
      informal:      ['Romská osada', 'Dolní konec'],
      working_class: ['Hlavní ulice', 'U vlakového nádraží'],
      middle_class:  ['Náměstí', 'U kostela'],
      elite:         ['Zámecká zahrada', 'Vinice'],
    },
  },

  // ── ESTONIA ────────────────────────────────────────────────────────────────

  {
    id: 'ee_tallinn', name: 'Tallinn', country: 'Estonia',
    type: 'urban', scale: 'major_city', region: 'Northern Estonia',
    neighborhoods: {
      informal:      ['Lasnamäe outer blocks', 'Kopli peninsula', 'Pelgulinn edge'],
      working_class: ['Lasnamäe', 'Mustamäe', 'Pelgulinn', 'Paljassaare'],
      middle_class:  ['Kristiine', 'Põhja-Tallinn', 'Pirita', 'Nõmme'],
      elite:         ['Kalamaja', 'Kadriorg', 'Vanalinn', 'Rocca al Mare'],
    },
  },
  {
    id: 'ee_tartu', name: 'Tartu', country: 'Estonia',
    type: 'urban', scale: 'mid_city', region: 'Southern Estonia',
    neighborhoods: {
      informal:      ['Annelinn far blocks', 'Jaama area'],
      working_class: ['Annelinn', 'Ränilinn', 'Ihaste'],
      middle_class:  ['Ülejõe', 'Karlova', 'Tähtvere'],
      elite:         ['Toomeküla', 'Supilinn', 'Raadi-Kruusamäe'],
    },
  },
  {
    id: 'ee_narva', name: 'Narva', country: 'Estonia',
    type: 'urban', scale: 'mid_city', region: 'Northeastern Estonia',
    neighborhoods: {
      informal:      ['Pähklimäe', 'Kreenholm old workers\' housing'],
      working_class: ['Kreenholm', 'Soldino', 'Joaoru'],
      middle_class:  ['Kesklinn', 'Linda', 'Ругодив'],
      elite:         ['Vanalinn area', 'Jõeäärne'],
    },
  },
  {
    id: 'ee_rural', name: 'Rural Saaremaa', country: 'Estonia',
    type: 'rural', scale: 'village', region: 'Western Estonia',
    neighborhoods: {
      informal:      ['Talu äär', 'Vana-Soviet kolhoosi hooned'],
      working_class: ['Küla keskus', 'Poe juures'],
      middle_class:  ['Kihelkonnakeskus', 'Kirik'],
      elite:         ['Mõis', 'Rannaäär'],
    },
  },

  // ── LATVIA ─────────────────────────────────────────────────────────────────

  {
    id: 'lv_riga', name: 'Riga', country: 'Latvia',
    type: 'urban', scale: 'major_city', region: 'Riga Region',
    neighborhoods: {
      informal:      ['Pļavnieki far edge', 'Imanta blocks', 'Ziepniekkalns outer'],
      working_class: ['Pļavnieki', 'Purvciems', 'Āgenskalns', 'Ziepniekkalns'],
      middle_class:  ['Mežaparks lower', 'Teika', 'Iļģuciems', 'Ķīpsala'],
      elite:         ['Mežaparks', 'Vecriga', 'Jūrmala dacha zone', 'Čiekurkalns renovated'],
    },
  },
  {
    id: 'lv_daugavpils', name: 'Daugavpils', country: 'Latvia',
    type: 'urban', scale: 'mid_city', region: 'Latgale',
    neighborhoods: {
      informal:      ['Jaunbūve', 'Stropu edge', 'Old factory zone'],
      working_class: ['Grīva', 'Ciemupes', 'Jaunā forštate'],
      middle_class:  ['Centrs', 'Ķīmiķi', 'Ruģeļu'],
      elite:         ['Daugavpils fortress area', 'Mežciems'],
    },
  },
  {
    id: 'lv_rural', name: 'Rural Latgale', country: 'Latvia',
    type: 'rural', scale: 'village', region: 'Eastern Latvia',
    neighborhoods: {
      informal:      ['Kolhoza mājas', 'Ezermala'],
      working_class: ['Pagasta centrs', 'Veikala laukums'],
      middle_class:  ['Skola un baznīca', 'Tirgus'],
      elite:         ['Muižas teritorija', 'Ezera krasts'],
    },
  },

  // ── LITHUANIA ──────────────────────────────────────────────────────────────

  {
    id: 'lt_vilnius', name: 'Vilnius', country: 'Lithuania',
    type: 'urban', scale: 'major_city', region: 'Vilnius County',
    neighborhoods: {
      informal:      ['Šeškinė far towers', 'Viršuliškės edge', 'Naujoji Vilnia'],
      working_class: ['Šeškinė', 'Žirmūnai', 'Justiniškės', 'Fabijoniškės'],
      middle_class:  ['Naujamiestis', 'Žvėrynas', 'Antakalnis', 'Lazdynai'],
      elite:         ['Senamiestis', 'Užupis', 'Verkiai', 'Turniškės'],
    },
  },
  {
    id: 'lt_kaunas', name: 'Kaunas', country: 'Lithuania',
    type: 'urban', scale: 'mid_city', region: 'Kaunas County',
    neighborhoods: {
      informal:      ['Šilainiai outer', 'Eiguliai edge', 'Vilijampolė far end'],
      working_class: ['Šilainiai', 'Eiguliai', 'Vilijampolė', 'Žaliakalnis lower'],
      middle_class:  ['Žaliakalnis', 'Aleksotas', 'Petrašiūnai', 'Centras lower'],
      elite:         ['Centras', 'Žaliakalnis upper', 'Ąžuolynas', 'Romainiai'],
    },
  },
  {
    id: 'lt_klaipeda', name: 'Klaipėda', country: 'Lithuania',
    type: 'urban', scale: 'mid_city', region: 'Klaipėda County',
    neighborhoods: {
      informal:      ['Mažasis Kaimelis', 'Poilsio edge'],
      working_class: ['Labriai', 'Debrecenas', 'Žardė'],
      middle_class:  ['Naujamiestis', 'Senamiestis lower', 'Centrum'],
      elite:         ['Senamiestis', 'Žvejybos uostas', 'Smiltynė'],
    },
  },
  {
    id: 'lt_rural', name: 'Rural Samogitia', country: 'Lithuania',
    type: 'rural', scale: 'village', region: 'Western Lithuania',
    neighborhoods: {
      informal:      ['Kolūkio barakai', 'Miškas ir pelkė'],
      working_class: ['Kaimo centras', 'Parduotuvė'],
      middle_class:  ['Bažnytkaimis', 'Mokykla'],
      elite:         ['Dvaras', 'Ežero pakrantė'],
    },
  },

  // ── BOLIVIA ────────────────────────────────────────────────────────────────

  {
    id: 'bo_la_paz', name: 'La Paz', country: 'Bolivia',
    type: 'urban', scale: 'major_city', region: 'La Paz Department',
    neighborhoods: {
      informal:      ['Villa Dolores', 'Periférica', 'Ciudadela Bolívar', ' Achachicala'],
      working_class: ['El Alto', 'Cotahuma', 'San Pedro', 'Miraflores lower'],
      middle_class:  ['Sopocachi', 'Miraflores', 'San Miguel', 'Achumani'],
      elite:         ['Calacoto', 'Zona Sur', 'Obrajes upper', 'Aranjuez'],
    },
  },
  {
    id: 'bo_rural', name: 'Rural Altiplano', country: 'Bolivia',
    type: 'rural', scale: 'village', region: 'Altiplano',
    neighborhoods: {
      informal:      ['Ranchos de la pampa', 'Ayllu pobre'],
      working_class: ['Calle principal', 'Feria dominical'],
      middle_class:  ['Municipio', 'Plaza principal'],
      elite:         ['Casa del corregidor', 'Hacienda vieja'],
    },
  },

  // ── LAOS ───────────────────────────────────────────────────────────────────

  {
    id: 'la_vientiane', name: 'Vientiane', country: 'Laos',
    type: 'urban', scale: 'mid_city', region: 'Central Laos',
    neighborhoods: {
      informal:      ['Ban Phonekham outskirts', 'Riverside shanties'],
      working_class: ['Sikhottabong', 'Xaysetha outer', 'Hadxaifong'],
      middle_class:  ['Chanthabouly', 'Sikhottabong center', 'Xaysetha'],
      elite:         ['Diplomatic quarter', 'Setthathirath area', 'Nam Phu fountain zone'],
    },
  },

  // ── GUATEMALA ──────────────────────────────────────────────────────────────

  {
    id: 'gt_guatemala_city', name: 'Guatemala City', country: 'Guatemala',
    type: 'urban', scale: 'major_city', region: 'Guatemala Department',
    neighborhoods: {
      informal:      ['Asentamiento La Limonada', 'El Gallito', 'Barrio El Amparo', 'Chinautla'],
      working_class: ['Zona 6', 'Zona 18', 'Villa Lobos', 'Santa Faz'],
      middle_class:  ['Zona 11', 'Vista Hermosa', 'San Cristóbal', 'Miraflores'],
      elite:         ['Zona 10 (Zona Viva)', 'Cayalá', 'Santa Rosalía', 'Muxbal'],
    },
  },
  {
    id: 'gt_rural', name: 'Rural Altiplano (Guatemala)', country: 'Guatemala',
    type: 'rural', scale: 'village', region: 'Western Highlands',
    neighborhoods: {
      informal:      ['Colonia de jornaleros', 'Cantón marginal'],
      working_class: ['Calle principal', 'Parque central'],
      middle_class:  ['Municipalidad', 'La iglesia'],
      elite:         ['Finca cafetalera', 'Ranchería del patrón'],
    },
  },



  // ── PORTUGAL ───────────────────────────────────────────────────────────────

  {
    id: 'pt_lisbon', name: 'Lisbon', country: 'Portugal',
    type: 'urban', scale: 'major_city', region: 'Lisboa',
    neighborhoods: {
      informal:      ['Cova da Moura', 'Quinta do Mocho', 'Bairro da Torre', '6 de Maio'],
      working_class: ['Marvila', 'Chelas', 'Beato', 'Olivais Sul'],
      middle_class:  ['Alvalade', 'Benfica', 'Campo de Ourique', 'Areeiro'],
      elite:         ['Chiado', 'Lapa', 'Príncipe Real', 'Restelo'],
    },
  },
  {
    id: 'pt_porto', name: 'Porto', country: 'Portugal',
    type: 'urban', scale: 'city', region: 'Norte',
    neighborhoods: {
      informal:      ['As ilhas', 'Bairro do Aleixo', 'Bairro do Cerco'],
      working_class: ['Campanhã', 'Bonfim', 'São Roque', 'Ramalde'],
      middle_class:  ['Boavista', 'Paranhos', 'Antas'],
      elite:         ['Foz do Douro', 'Nevogilde', 'Avenida da Boavista'],
    },
  },
  {
    id: 'pt_rural', name: 'Rural Alentejo', country: 'Portugal',
    type: 'rural', scale: 'village', region: 'Alentejo',
    neighborhoods: {
      informal:      ['Os montes', 'Casas dos assalariados'],
      working_class: ['Rua da Igreja', 'Largo do Chafariz'],
      middle_class:  ['Perto da praça', 'Rua Direita'],
      elite:         ['O monte do patrão', 'A herdade'],
    },
  },

  // ── GREECE ─────────────────────────────────────────────────────────────────

  {
    id: 'gr_athens', name: 'Athens', country: 'Greece',
    type: 'urban', scale: 'major_city', region: 'Attica',
    neighborhoods: {
      informal:      ['Omonia', 'Menidi', 'Aspropyrgos', 'Kato Patisia'],
      working_class: ['Peristeri', 'Nikaia', 'Egaleo', 'Kaisariani'],
      middle_class:  ['Pangrati', 'Zografou', 'Nea Smyrni', 'Chalandri'],
      elite:         ['Kolonaki', 'Kifissia', 'Psychiko', 'Ekali'],
    },
  },
  {
    id: 'gr_thessaloniki', name: 'Thessaloniki', country: 'Greece',
    type: 'urban', scale: 'city', region: 'Central Macedonia',
    neighborhoods: {
      informal:      ['Dendropotamos', 'Ano Poli (before the restoration)'],
      working_class: ['Stavroupoli', 'Evosmos', 'Toumba'],
      middle_class:  ['Kalamaria', 'Charilaou', 'Analipsi'],
      elite:         ['Panorama', 'Pylaia', 'Nea Krini'],
    },
  },
  {
    id: 'gr_rural', name: 'A Village in the Peloponnese', country: 'Greece',
    type: 'rural', scale: 'village', region: 'Peloponnese',
    neighborhoods: {
      informal:      ['Sta kalyvia', 'Pano apo to rema'],
      working_class: ['I plateia', 'Kato Chorio'],
      middle_class:  ['Konta stin ekklisia', 'To kentro'],
      elite:         ['To archontiko', 'Ta ktimata'],
    },
  },

  // ── DENMARK ────────────────────────────────────────────────────────────────

  {
    id: 'dk_copenhagen', name: 'Copenhagen', country: 'Denmark',
    type: 'urban', scale: 'city', region: 'Hovedstaden',
    neighborhoods: {
      informal:      ['Mjølnerparken', 'Tingbjerg', 'Urbanplanen', 'Akacieparken'],
      working_class: ['Nørrebro', 'Sydhavnen', 'Valby', 'Amager Vest'],
      middle_class:  ['Frederiksberg', 'Vanløse', 'Østerbro', 'Brønshøj'],
      elite:         ['Hellerup', 'Gentofte', 'Klampenborg', 'Charlottenlund'],
    },
  },
  {
    id: 'dk_aarhus', name: 'Aarhus', country: 'Denmark',
    type: 'urban', scale: 'mid_city', region: 'Midtjylland',
    neighborhoods: {
      informal:      ['Gellerupparken', 'Bispehaven'],
      working_class: ['Viby', 'Åbyhøj', 'Trige'],
      middle_class:  ['Risskov', 'Hasle', 'Frederiksbjerg'],
      elite:         ['Højbjerg', 'Egå', 'Skåde'],
    },
  },
  {
    id: 'dk_rural', name: 'Rural Jutland', country: 'Denmark',
    type: 'rural', scale: 'village', region: 'Jylland',
    neighborhoods: {
      informal:      ['Husmandsstedet', 'Ved mosen'],
      working_class: ['Stationsbyen', 'Bygaden'],
      middle_class:  ['Ved kirken', 'Skolevej'],
      elite:         ['Herregården', 'Proprietærgården'],
    },
  },

  // ── FINLAND ────────────────────────────────────────────────────────────────

  {
    id: 'fi_helsinki', name: 'Helsinki', country: 'Finland',
    type: 'urban', scale: 'city', region: 'Uusimaa',
    neighborhoods: {
      informal:      ['Kontula', 'Jakomäki', 'Meri-Rastila'],
      working_class: ['Kallio', 'Vallila', 'Myllypuro', 'Vuosaari'],
      middle_class:  ['Töölö', 'Munkkiniemi', 'Herttoniemi', 'Pakila'],
      elite:         ['Kaivopuisto', 'Eira', 'Kulosaari', 'Westend'],
    },
  },
  {
    id: 'fi_tampere', name: 'Tampere', country: 'Finland',
    type: 'urban', scale: 'mid_city', region: 'Pirkanmaa',
    neighborhoods: {
      informal:      ['Hervanta (the high blocks)', 'Tesoma'],
      working_class: ['Pispala', 'Nekala', 'Kaukajärvi'],
      middle_class:  ['Kaleva', 'Läntinen', 'Hatanpää'],
      elite:         ['Pyynikki', 'Näsijärvi shore', 'Ruotula'],
    },
  },
  {
    id: 'fi_rural', name: 'Rural Savo', country: 'Finland',
    type: 'rural', scale: 'village', region: 'Savo',
    neighborhoods: {
      informal:      ['Mökki järven takana', 'Torpparin mäki'],
      working_class: ['Kylätie', 'Sahan lähellä'],
      middle_class:  ['Kirkonkylä', 'Koulun vieressä'],
      elite:         ['Kartano', 'Rantatalo'],
    },
  },

  // ── BELGIUM ────────────────────────────────────────────────────────────────

  {
    id: 'be_brussels', name: 'Brussels', country: 'Belgium',
    type: 'urban', scale: 'city', region: 'Brussels-Capital',
    neighborhoods: {
      informal:      ['Molenbeek', 'Cureghem', 'Peterbos', 'Quartier Nord'],
      working_class: ['Schaerbeek', 'Saint-Josse', 'Laeken', 'Anderlecht'],
      middle_class:  ['Etterbeek', 'Jette', 'Woluwe-Saint-Lambert', 'Forest'],
      elite:         ['Uccle', 'Châtelain', 'Woluwe-Saint-Pierre', 'Avenue Louise'],
    },
  },
  {
    id: 'be_charleroi', name: 'Charleroi', country: 'Belgium',
    type: 'urban', scale: 'mid_city', region: 'Hainaut',
    neighborhoods: {
      informal:      ['Dampremy', 'Marchienne-Docherie', 'Cité du Bois'],
      working_class: ['Gilly', 'Jumet', 'Marcinelle'],
      middle_class:  ['Mont-sur-Marchienne', 'Gosselies'],
      elite:         ['Boulevard Audent', 'Loverval'],
    },
  },
  {
    id: 'be_rural', name: 'Rural Flanders', country: 'Belgium',
    type: 'rural', scale: 'village', region: 'West Flanders',
    neighborhoods: {
      informal:      ['De keet achter de hoeve', 'Aan de vaart'],
      working_class: ['Dorpsstraat', 'Bij de steenbakkerij'],
      middle_class:  ['Rond de kerk', 'Markt'],
      elite:         ['Het kasteel', 'De grote hoeve'],
    },
  },

  // ── SWITZERLAND ────────────────────────────────────────────────────────────

  {
    id: 'ch_zurich', name: 'Zurich', country: 'Switzerland',
    type: 'urban', scale: 'city', region: 'Zürich',
    neighborhoods: {
      informal:      ['Schwamendingen', 'Langstrasse', 'Hardbrucke barracks'],
      working_class: ['Altstetten', 'Oerlikon', 'Aussersihl', 'Affoltern'],
      middle_class:  ['Wiedikon', 'Seebach', 'Hottingen'],
      elite:         ['Zürichberg', 'Seefeld', 'Küsnacht', 'Zollikon'],
    },
  },
  {
    id: 'ch_geneva', name: 'Geneva', country: 'Switzerland',
    type: 'urban', scale: 'mid_city', region: 'Genève',
    neighborhoods: {
      informal:      ['Le Lignon', 'Les Avanchets', 'Les Libellules'],
      working_class: ['Meyrin', 'Vernier', 'Onex'],
      middle_class:  ['Plainpalais', 'Servette', 'Carouge'],
      elite:         ['Cologny', 'Champel', 'Eaux-Vives', 'Vandœuvres'],
    },
  },
  {
    id: 'ch_rural', name: 'A Valley in the Valais', country: 'Switzerland',
    type: 'rural', scale: 'village', region: 'Valais',
    neighborhoods: {
      informal:      ['Le mayen', 'Les raccards'],
      working_class: ['La rue du village', 'Près de la scierie'],
      middle_class:  ['Autour de l\'église', 'La place'],
      elite:         ['Le chalet sur la hauteur', 'Les vignes'],
    },
  },

  // ── AUSTRIA ────────────────────────────────────────────────────────────────

  {
    id: 'at_vienna', name: 'Vienna', country: 'Austria',
    type: 'urban', scale: 'major_city', region: 'Wien',
    neighborhoods: {
      informal:      ['Brigittenau', 'Favoriten (the Bassena flats)', 'Ottakring back courtyards'],
      working_class: ['Simmering', 'Floridsdorf', 'Meidling', 'Karl-Marx-Hof'],
      middle_class:  ['Währing', 'Josefstadt', 'Alsergrund', 'Landstrasse'],
      elite:         ['Innere Stadt', 'Döbling', 'Hietzing', 'Grinzing'],
    },
  },
  {
    id: 'at_graz', name: 'Graz', country: 'Austria',
    type: 'urban', scale: 'mid_city', region: 'Styria',
    neighborhoods: {
      informal:      ['Triester Siedlung', 'Jakomini blocks'],
      working_class: ['Gries', 'Lend', 'Eggenberg'],
      middle_class:  ['Geidorf', 'St. Leonhard'],
      elite:         ['Rosenberg', 'Ruckerlberg'],
    },
  },
  {
    id: 'at_rural', name: 'Rural Tyrol', country: 'Austria',
    type: 'rural', scale: 'village', region: 'Tirol',
    neighborhoods: {
      informal:      ['Die Keusche am Hang', 'Beim Waldrand'],
      working_class: ['Dorfstrasse', 'Beim Sägewerk'],
      middle_class:  ['Um die Kirche', 'Der Anger'],
      elite:         ['Der Gasthof', 'Der grosse Hof'],
    },
  },

  // ── ICELAND ────────────────────────────────────────────────────────────────

  {
    id: 'is_reykjavik', name: 'Reykjavík', country: 'Iceland',
    type: 'urban', scale: 'town', region: 'Höfuðborgarsvæðið',
    neighborhoods: {
      informal:      ['Efra-Breiðholt', 'Fellahverfi', 'The braggar (Nissen huts)'],
      working_class: ['Árbær', 'Grafarvogur', 'Vesturbær', 'Breiðholt'],
      middle_class:  ['Hlíðar', 'Laugardalur', 'Háaleiti'],
      elite:         ['Seltjarnarnes', 'Fossvogur', 'Þingholt', 'Arnarnes'],
    },
  },
  {
    id: 'is_village', name: 'A Fishing Village in the Westfjords', country: 'Iceland',
    type: 'rural', scale: 'village', region: 'Vestfirðir',
    neighborhoods: {
      informal:      ['Við bryggjuna', 'Gamli braggi'],
      working_class: ['Aðalgata', 'Við frystihúsið'],
      middle_class:  ['Við kirkjuna', 'Skólavegur'],
      elite:         ['Húsið á hæðinni', 'Útgerðarstjórans hús'],
    },
  },

  // ── BULGARIA ───────────────────────────────────────────────────────────────

  {
    id: 'bg_sofia', name: 'Sofia', country: 'Bulgaria',
    type: 'urban', scale: 'city', region: 'Sofia-grad',
    neighborhoods: {
      informal:      ['Fakulteta', 'Filipovtsi', 'Hristo Botev', 'Orlandovtsi'],
      working_class: ['Lyulin', 'Nadezhda', 'Druzhba', 'Obelya'],
      middle_class:  ['Mladost', 'Studentski grad', 'Krasno selo', 'Ovcha kupel'],
      elite:         ['Boyana', 'Dragalevtsi', 'Lozenets', 'Doktorska gradina'],
    },
  },
  {
    id: 'bg_plovdiv', name: 'Plovdiv', country: 'Bulgaria',
    type: 'urban', scale: 'mid_city', region: 'Plovdiv',
    neighborhoods: {
      informal:      ['Stolipinovo', 'Sheker mahala'],
      working_class: ['Trakiya', 'Izgrev', 'Proslav'],
      middle_class:  ['Kyuchuk Parizh', 'Tsentar'],
      elite:         ['Stariyat grad', 'Marasha'],
    },
  },
  {
    id: 'bg_rural', name: 'A Village in the Rhodopes', country: 'Bulgaria',
    type: 'rural', scale: 'village', region: 'Rodopi',
    neighborhoods: {
      informal:      ['Kraya na seloto', 'Pod chesmata'],
      working_class: ['Glavnata ulitsa', 'Do kooperatsiyata'],
      middle_class:  ['Do tsarkvata', 'Tsentarut'],
      elite:         ['Kashtata na chorbadzhiyata', 'Gornata mahala'],
    },
  },

  // ── SLOVAKIA ───────────────────────────────────────────────────────────────

  {
    id: 'sk_bratislava', name: 'Bratislava', country: 'Slovakia',
    type: 'urban', scale: 'mid_city', region: 'Bratislavský kraj',
    neighborhoods: {
      informal:      ['Pentagon (Vrakuňa)', 'Kopcany', 'Maly Dunaj shacks'],
      working_class: ['Petržalka', 'Dúbravka', 'Rača', 'Vrakuňa'],
      middle_class:  ['Ružinov', 'Karlova Ves', 'Nové Mesto'],
      elite:         ['Staré Mesto', 'Koliba', 'Slavin', 'Horský park'],
    },
  },
  {
    id: 'sk_kosice', name: 'Košice', country: 'Slovakia',
    type: 'urban', scale: 'mid_city', region: 'Košický kraj',
    neighborhoods: {
      informal:      ['Luník IX', 'Mäsiarske'],
      working_class: ['Terasa', 'Nad jazerom', 'Sídlisko KVP'],
      middle_class:  ['Sever', 'Juh'],
      elite:         ['Staré Mesto', 'Podhradová'],
    },
  },
  {
    id: 'sk_rural', name: 'Rural Eastern Slovakia', country: 'Slovakia',
    type: 'rural', scale: 'village', region: 'Spiš',
    neighborhoods: {
      informal:      ['Osada za dedinou', 'Pri potoku'],
      working_class: ['Hlavná ulica', 'Pri družstve'],
      middle_class:  ['Pri kostole', 'Námestie'],
      elite:         ['Kaštieľ', 'Veľký dom'],
    },
  },

  // ── CROATIA ────────────────────────────────────────────────────────────────

  {
    id: 'hr_zagreb', name: 'Zagreb', country: 'Croatia',
    type: 'urban', scale: 'city', region: 'Grad Zagreb',
    neighborhoods: {
      informal:      ['Kozari Bok', 'Kozari Putevi', 'Vrapce barracks'],
      working_class: ['Dubrava', 'Trešnjevka', 'Travno', 'Sopot'],
      middle_class:  ['Maksimir', 'Črnomerec', 'Špansko'],
      elite:         ['Gornji Grad', 'Pantovcak', 'Šalata', 'Tuškanac'],
    },
  },
  {
    id: 'hr_split', name: 'Split', country: 'Croatia',
    type: 'urban', scale: 'mid_city', region: 'Dalmatia',
    neighborhoods: {
      informal:      ['Kman', 'Splitska 3 blocks'],
      working_class: ['Brda', 'Sućidar', 'Škalice'],
      middle_class:  ['Bačvice', 'Lovret'],
      elite:         ['Dioklecijanova palača', 'Meje', 'Marjan'],
    },
  },
  {
    id: 'hr_rural', name: 'Rural Slavonia', country: 'Croatia',
    type: 'rural', scale: 'village', region: 'Slavonija',
    neighborhoods: {
      informal:      ['Na kraju sela', 'Uz kanal'],
      working_class: ['Glavna ulica', 'Kod zadruge'],
      middle_class:  ['Kod crkve', 'Trg'],
      elite:         ['Velika kuća', 'Salaš'],
    },
  },

  // ── SLOVENIA ───────────────────────────────────────────────────────────────

  {
    id: 'si_ljubljana', name: 'Ljubljana', country: 'Slovenia',
    type: 'urban', scale: 'mid_city', region: 'Osrednjeslovenska',
    neighborhoods: {
      informal:      ['Rakova Jelša', 'Tomačevo', 'Samski domovi'],
      working_class: ['Fužine', 'Moste', 'Savsko naselje', 'Šiška'],
      middle_class:  ['Bežigrad', 'Vič', 'Koseze'],
      elite:         ['Rožna Dolina', 'Mirje', 'Trnovo', 'Center'],
    },
  },
  {
    id: 'si_maribor', name: 'Maribor', country: 'Slovenia',
    type: 'urban', scale: 'town', region: 'Podravska',
    neighborhoods: {
      informal:      ['Pobrežje blocks', 'Ob železniški progi'],
      working_class: ['Tezno', 'Studenci', 'Tabor'],
      middle_class:  ['Koroška vrata', 'Nova vas'],
      elite:         ['Mestni park', 'Kalvarija'],
    },
  },
  {
    id: 'si_rural', name: 'Rural Prekmurje', country: 'Slovenia',
    type: 'rural', scale: 'village', region: 'Prekmurje',
    neighborhoods: {
      informal:      ['Na koncu vasi', 'Ob potoku'],
      working_class: ['Glavna cesta', 'Pri zadrugi'],
      middle_class:  ['Pri cerkvi', 'Trg'],
      elite:         ['Velika domačija', 'Graščina'],
    },
  },

  // ── ALBANIA ────────────────────────────────────────────────────────────────

  {
    id: 'al_tirana', name: 'Tirana', country: 'Albania',
    type: 'urban', scale: 'mid_city', region: 'Tiranë',
    neighborhoods: {
      informal:      ['Bathore', 'Kamëz', 'Kombinat edges', 'Kodra e Priftit'],
      working_class: ['Laprakë', 'Kombinat', 'Kinostudio', 'Uzina Dinamo'],
      middle_class:  ['Ali Demi', 'Rruga e Elbasanit', 'Selite'],
      elite:         ['Blloku', 'Rruga e Kavajës upper', 'Lundër', 'Liqeni'],
    },
  },
  {
    id: 'al_shkoder', name: 'Shkodër', country: 'Albania',
    type: 'urban', scale: 'town', region: 'Shkodër',
    neighborhoods: {
      informal:      ['Rrethinat', 'Bahçallëk'],
      working_class: ['Perash', 'Qafë Hardhi'],
      middle_class:  ['Rus', 'Qendra'],
      elite:         ['Rruga Kolë Idromeno', 'Pallati i Kulturës'],
    },
  },
  {
    id: 'al_rural', name: 'The Northern Highlands', country: 'Albania',
    type: 'rural', scale: 'village', region: 'Malësi',
    neighborhoods: {
      informal:      ['Në fund të fshatit', 'Pranë përroit'],
      working_class: ['Rruga kryesore', 'Pranë kooperativës'],
      middle_class:  ['Pranë kishës', 'Qendra e fshatit'],
      elite:         ['Kulla', 'Shtëpia e madhe'],
    },
  },

  // ── BOSNIA AND HERZEGOVINA ─────────────────────────────────────────────────

  {
    id: 'ba_sarajevo', name: 'Sarajevo', country: 'Bosnia and Herzegovina',
    type: 'urban', scale: 'mid_city', region: 'Sarajevo Canton',
    neighborhoods: {
      informal:      ['Gorica', 'Vratnik', 'Bjelave upper slopes'],
      working_class: ['Alipašino Polje', 'Dobrinja', 'Hrasno', 'Otoka'],
      middle_class:  ['Novo Sarajevo', 'Grbavica', 'Čengić Vila'],
      elite:         ['Marijin Dvor', 'Breka', 'Koševo', 'Baščaršija'],
    },
  },
  {
    id: 'ba_mostar', name: 'Mostar', country: 'Bosnia and Herzegovina',
    type: 'urban', scale: 'town', region: 'Herzegovina',
    neighborhoods: {
      informal:      ['Donja Mahala', 'Sjeverni logor'],
      working_class: ['Cernica', 'Bijeli Brijeg', 'Zalik'],
      middle_class:  ['Rondo', 'Avenija'],
      elite:         ['Stari Grad', 'Bulevar (before)'],
    },
  },
  {
    id: 'ba_rural', name: 'Rural Herzegovina', country: 'Bosnia and Herzegovina',
    type: 'rural', scale: 'village', region: 'Hercegovina',
    neighborhoods: {
      informal:      ['Na kraju sela', 'Kod izvora'],
      working_class: ['Glavni put', 'Kod zadruge'],
      middle_class:  ['Kod džamije', 'Kod crkve'],
      elite:         ['Velika kuća', 'Imanje'],
    },
  },

  // ── MOLDOVA ────────────────────────────────────────────────────────────────

  {
    id: 'md_chisinau', name: 'Chișinău', country: 'Moldova',
    type: 'urban', scale: 'mid_city', region: 'Chișinău municipality',
    neighborhoods: {
      informal:      ['Otovasca', 'Sculeni edges', 'Ciocana blocks'],
      working_class: ['Botanica', 'Ciocana', 'Râșcani'],
      middle_class:  ['Buiucani', 'Telecentru', 'Postal'],
      elite:         ['Centru', 'Valea Morilor', 'Durlești'],
    },
  },
  {
    id: 'md_balti', name: 'Bălți', country: 'Moldova',
    type: 'urban', scale: 'town', region: 'Nord',
    neighborhoods: {
      informal:      ['Slobozia', 'Pamant'],
      working_class: ['Dacia', 'Moldova', 'BAM'],
      middle_class:  ['Centru', 'Independenței'],
      elite:         ['Strada Ștefan cel Mare', 'Parcul'],
    },
  },
  {
    id: 'md_rural', name: 'A Village in Moldova', country: 'Moldova',
    type: 'rural', scale: 'village', region: 'Centru',
    neighborhoods: {
      informal:      ['La marginea satului', 'Lângă vale'],
      working_class: ['Strada principală', 'Lângă colhoz'],
      middle_class:  ['Lângă biserică', 'Centrul satului'],
      elite:         ['Casa mare', 'Conacul'],
    },
  },

  // ── BELARUS ────────────────────────────────────────────────────────────────

  {
    id: 'by_minsk', name: 'Minsk', country: 'Belarus',
    type: 'urban', scale: 'major_city', region: 'Minsk Region',
    neighborhoods: {
      informal:      ['Shabany', 'Kamennaya Gorka edges', 'the barracks at Trakt'],
      working_class: ['Serebryanka', 'Chizhovka', 'Zavodskoy', 'Kurasovshchina'],
      middle_class:  ['Uruchcha', 'Malinovka', 'Zelyony Lug'],
      elite:         ['Drozdy', 'Nemiga', 'Victory Park', 'Troitskoye'],
    },
  },
  {
    id: 'by_brest', name: 'Brest', country: 'Belarus',
    type: 'urban', scale: 'town', region: 'Brest Region',
    neighborhoods: {
      informal:      ['Rechitsa', 'Kovalevo'],
      working_class: ['Vostok', 'Kiselevichi', 'Grayevka'],
      middle_class:  ['Tsentr', 'Moskovskiy'],
      elite:         ['Sovetskaya', 'Naberezhnaya'],
    },
  },
  {
    id: 'by_rural', name: 'A Village in Polesia', country: 'Belarus',
    type: 'rural', scale: 'village', region: 'Palesse',
    neighborhoods: {
      informal:      ['Na kraj vyoski', 'Kalya baloty'],
      working_class: ['Halounaya vulitsa', 'Kalya kalhasa'],
      middle_class:  ['Kalya shkoly', 'Tsentr'],
      elite:         ['Vyaliki dom', 'Kalya klubu'],
    },
  },

  // ── CYPRUS ─────────────────────────────────────────────────────────────────

  {
    id: 'cy_nicosia', name: 'Nicosia', country: 'Cyprus',
    type: 'urban', scale: 'town', region: 'Lefkosia',
    neighborhoods: {
      informal:      ['The refugee estates at Strovolos', 'Ayios Memnon huts', 'Along the buffer zone'],
      working_class: ['Kaimakli', 'Pallouriotissa', 'Ayios Dometios'],
      middle_class:  ['Strovolos', 'Engomi', 'Latsia'],
      elite:         ['Aglantzia upper', 'Dasoupoli', 'The old town restored'],
    },
  },
  {
    id: 'cy_limassol', name: 'Limassol', country: 'Cyprus',
    type: 'urban', scale: 'town', region: 'Lemesos',
    neighborhoods: {
      informal:      ['Tsiflikoudia', 'The estates at Ayios Ioannis'],
      working_class: ['Zakaki', 'Omonia', 'Ayia Zoni'],
      middle_class:  ['Mesa Geitonia', 'Ayios Nikolaos'],
      elite:         ['Potamos Germasogeias', 'Amathus', 'Palm Beach'],
    },
  },
  {
    id: 'cy_rural', name: 'A Village in the Troodos', country: 'Cyprus',
    type: 'rural', scale: 'village', region: 'Troodos',
    neighborhoods: {
      informal:      ['Sta kalyvia', 'Pano apo to potami'],
      working_class: ['I plateia', 'Konta sto kafeneio'],
      middle_class:  ['Konta stin ekklisia', 'To kentro'],
      elite:         ['To megalo spiti', 'Ta ampelia'],
    },
  },


  // ── LEBANON ────────────────────────────────────────────────────────────────

  {
    id: 'lb_beirut', name: 'Beirut', country: 'Lebanon',
    type: 'urban', scale: 'city', region: 'Beirut Governorate',
    neighborhoods: {
      informal:      ['Shatila', 'Sabra', 'Burj al-Barajneh', 'Karantina'],
      working_class: ['Basta', 'Bourj Hammoud', 'Tariq al-Jadida', 'Chiyah'],
      middle_class:  ['Hamra', 'Badaro', 'Furn el-Chebbak', 'Mar Mikhael'],
      elite:         ['Achrafieh', 'Verdun', 'Ramlet al-Baida', 'Clemenceau'],
    },
  },
  {
    id: 'lb_tripoli', name: 'Tripoli', country: 'Lebanon',
    type: 'urban', scale: 'town', region: 'North Governorate',
    neighborhoods: {
      informal:      ['Bab al-Tabbaneh', 'Jabal Mohsen', 'Nahr al-Bared'],
      working_class: ['Qobbeh', 'Abu Samra', 'Zahrieh'],
      middle_class:  ['El Mina', 'Azmi Street'],
      elite:         ['Dam wa Farez', 'The Corniche'],
    },
  },
  {
    id: 'lb_rural', name: 'A Village in the Chouf', country: 'Lebanon',
    type: 'rural', scale: 'village', region: 'Mount Lebanon',
    neighborhoods: {
      informal:      ['Taht al-daya\'a', 'Near the spring'],
      working_class: ['The main road', 'Near the press'],
      middle_class:  ['Around the square', 'By the church'],
      elite:         ['The old family house', 'Above the terraces'],
    },
  },

  // ── ISRAEL ─────────────────────────────────────────────────────────────────

  {
    id: 'il_telaviv', name: 'Tel Aviv', country: 'Israel',
    type: 'urban', scale: 'city', region: 'Tel Aviv District',
    neighborhoods: {
      informal:      ['Neve Sha\'anan', 'Hatikva', 'Shapira', 'Kfar Shalem'],
      working_class: ['Florentin', 'Yad Eliyahu', 'Kiryat Shalom', 'Bat Yam'],
      middle_class:  ['Ramat Aviv Gimel', 'Bavli', 'Kiryat Ono', 'Givatayim'],
      elite:         ['The Old North', 'Neve Tzedek', 'Rothschild', 'Herzliya Pituach'],
    },
  },
  {
    id: 'il_jerusalem', name: 'Jerusalem', country: 'Israel',
    type: 'urban', scale: 'city', region: 'Jerusalem District',
    neighborhoods: {
      informal:      ['Silwan', 'Shuafat', 'Mea She\'arim back courts'],
      working_class: ['Katamonim', 'Kiryat Yovel', 'Pisgat Ze\'ev', 'Musrara'],
      middle_class:  ['Baka', 'Nachlaot', 'Kiryat Moshe', 'Gilo'],
      elite:         ['Rehavia', 'Talbiya', 'The German Colony', 'Yemin Moshe'],
    },
  },
  {
    id: 'il_development_town', name: 'A Development Town in the Negev', country: 'Israel',
    type: 'urban', scale: 'town', region: 'Southern District',
    neighborhoods: {
      informal:      ['The ma\'abara huts', 'The caravan site'],
      working_class: ['Shikun Alef', 'Shikun Bet', 'Near the factory'],
      middle_class:  ['The new build', 'By the commercial centre'],
      elite:         ['The villas on the hill', 'The private build'],
    },
  },
  {
    id: 'il_kibbutz', name: 'A Kibbutz in the Jezreel Valley', country: 'Israel',
    type: 'rural', scale: 'village', region: 'Northern District',
    neighborhoods: {
      informal:      ['The volunteers\' quarters', 'The old wooden huts'],
      working_class: ['The veterans\' row', 'By the dining hall'],
      middle_class:  ['The new housing', 'By the lawn'],
      elite:         ['The founders\' houses', 'The expanded lots'],
    },
  },

  // ── PALESTINE ──────────────────────────────────────────────────────────────

  {
    id: 'ps_gaza', name: 'Gaza City', country: 'Palestine',
    type: 'urban', scale: 'city', region: 'Gaza Strip',
    neighborhoods: {
      informal:      ['Shati camp', 'Jabalia camp', 'Sheikh Radwan edges'],
      working_class: ['Shuja\'iyya', 'Zeitoun', 'Tuffah', 'Nasser'],
      middle_class:  ['Rimal south', 'Tal al-Hawa', 'Sabra'],
      elite:         ['Rimal', 'The Corniche'],
    },
  },
  {
    id: 'ps_nablus', name: 'Nablus', country: 'Palestine',
    type: 'urban', scale: 'town', region: 'West Bank',
    neighborhoods: {
      informal:      ['Balata camp', 'Askar camp', 'Ein Beit al-Ma'],
      working_class: ['The Old City', 'Ras al-Ain', 'Khallet al-Amoud'],
      middle_class:  ['Rafidia', 'Al-Makhfiya'],
      elite:         ['Rafidia upper', 'Jabal Jarzim'],
    },
  },
  {
    id: 'ps_village', name: 'A Village in the West Bank', country: 'Palestine',
    type: 'rural', scale: 'village', region: 'West Bank',
    neighborhoods: {
      informal:      ['Below the road', 'The tents past the olive terraces'],
      working_class: ['The main street', 'Near the school'],
      middle_class:  ['Around the mosque', 'The village centre'],
      elite:         ['The house the son abroad built', 'Above the terraces'],
    },
  },

  // ── IRAQ ───────────────────────────────────────────────────────────────────

  {
    id: 'iq_baghdad', name: 'Baghdad', country: 'Iraq',
    type: 'urban', scale: 'megacity', region: 'Baghdad Governorate',
    neighborhoods: {
      informal:      ['Sadr City', 'Shaab', 'Hurriya edges', 'Washash'],
      working_class: ['Kadhimiya', 'Dora', 'Bayaa', 'Shurta'],
      middle_class:  ['Karrada', 'Adhamiyah', 'Yarmouk', 'Zayouna'],
      elite:         ['Mansour', 'Jadriya', 'Harthiya', 'Karrada Dakhil'],
    },
  },
  {
    id: 'iq_basra', name: 'Basra', country: 'Iraq',
    type: 'urban', scale: 'city', region: 'Basra Governorate',
    neighborhoods: {
      informal:      ['Hayyaniyah', 'Jumhuriya', 'Five Mile'],
      working_class: ['Ashar', 'Junaynah', 'Tannuma'],
      middle_class:  ['Baradiyah', 'Jazair'],
      elite:         ['The Corniche', 'Al-Saymar'],
    },
  },
  {
    id: 'iq_marshes', name: 'The Marshes', country: 'Iraq',
    type: 'rural', scale: 'village', region: 'Dhi Qar and Maysan',
    neighborhoods: {
      informal:      ['The reed platform', 'The edge of the channel'],
      working_class: ['The mudhif and around it', 'The buffalo pens'],
      middle_class:  ['The brick house on the bank', 'Near the landing'],
      elite:         ['The sheikh\'s mudhif', 'The house in the town'],
    },
  },

  // ── ARMENIA ────────────────────────────────────────────────────────────────

  {
    id: 'am_yerevan', name: 'Yerevan', country: 'Armenia',
    type: 'urban', scale: 'city', region: 'Yerevan',
    neighborhoods: {
      informal:      ['Nubarashen', 'Bangladesh', 'The domiks at Shengavit'],
      working_class: ['Malatia-Sebastia', 'Shengavit', 'Ajapnyak', 'Nork'],
      middle_class:  ['Arabkir', 'Avan', 'Nor Nork', 'Davtashen'],
      elite:         ['Kentron', 'Northern Avenue', 'Kond restored', 'Nork-Marash'],
    },
  },
  {
    id: 'am_gyumri', name: 'Gyumri', country: 'Armenia',
    type: 'urban', scale: 'town', region: 'Shirak',
    neighborhoods: {
      informal:      ['The domiks', 'Ani district containers', 'Mush-2'],
      working_class: ['Ani', 'Shirak', 'Slobodka'],
      middle_class:  ['Kumayri', 'Central'],
      elite:         ['The restored Kumayri quarter', 'Vardanants Square'],
    },
  },
  {
    id: 'am_rural', name: 'A Village in Lori', country: 'Armenia',
    type: 'rural', scale: 'village', region: 'Lori',
    neighborhoods: {
      informal:      ['At the edge of the village', 'By the gorge'],
      working_class: ['The main street', 'By the collective barn'],
      middle_class:  ['By the church', 'The village centre'],
      elite:         ['The big house', 'Above the orchard'],
    },
  },

  // ── AZERBAIJAN ─────────────────────────────────────────────────────────────

  {
    id: 'az_baku', name: 'Baku', country: 'Azerbaijan',
    type: 'urban', scale: 'city', region: 'Baku',
    neighborhoods: {
      informal:      ['Sovetski', 'The IDP settlements at Bina', 'Balakhani'],
      working_class: ['Ahmadli', 'Nizami', 'Sabunchu', 'Binagadi'],
      middle_class:  ['Yasamal', 'Narimanov', 'Khatai'],
      elite:['Icherisheher', 'The Boulevard', 'Badamdar', 'White City'],
    },
  },
  {
    id: 'az_ganja', name: 'Ganja', country: 'Azerbaijan',
    type: 'urban', scale: 'town', region: 'Ganja-Qazakh',
    neighborhoods: {
      informal:      ['The settlement past the rail line', 'Sadilli'],
      working_class: ['Kapaz', 'Nizami district'],
      middle_class:  ['The centre', 'Javadkhan Street'],
      elite:         ['Heydar Aliyev Avenue', 'Near the Juma mosque'],
    },
  },
  {
    id: 'az_rural', name: 'A Village in the Foothills', country: 'Azerbaijan',
    type: 'rural', scale: 'village', region: 'Shaki-Zaqatala',
    neighborhoods: {
      informal:      ['Past the last houses', 'By the irrigation channel'],
      working_class: ['The main road', 'By the tea collective'],
      middle_class:  ['Near the mosque', 'The centre'],
      elite:         ['The two-storey house', 'The orchard house'],
    },
  },

  // ── KYRGYZSTAN ─────────────────────────────────────────────────────────────

  {
    id: 'kg_bishkek', name: 'Bishkek', country: 'Kyrgyzstan',
    type: 'urban', scale: 'town', region: 'Chuy',
    neighborhoods: {
      informal:      ['Ak-Ordo', 'Kelechek', 'Archa-Beshik', 'The novostroiki'],
      working_class: ['Alamedin-1', 'Vostok-5', 'Rabochii Gorodok', 'Jal'],
      middle_class:  ['Asanbai', 'Yug-2', 'Sixth microdistrict'],
      elite:         ['The centre', 'Erkindik Boulevard', 'Gorky Street'],
    },
  },
  {
    id: 'kg_osh', name: 'Osh', country: 'Kyrgyzstan',
    type: 'urban', scale: 'town', region: 'Osh',
    neighborhoods: {
      informal:      ['Cheremushki', 'The mahallas below Sulaiman-Too'],
      working_class: ['Kyzyl-Kyshtak', 'Zapadny', 'Amir Timur'],
      middle_class:  ['The centre', 'Lenin Street'],
      elite:         ['Near the university', 'Navoi Park'],
    },
  },
  {
    id: 'kg_jailoo', name: 'A Summer Pasture in Naryn', country: 'Kyrgyzstan',
    type: 'rural', scale: 'village', region: 'Naryn',
    neighborhoods: {
      informal:      ['The far boz uy', 'By the upper stream'],
      working_class: ['The winter village street', 'By the animal shed'],
      middle_class:  ['Near the school', 'The village centre'],
      elite:         ['The herd owner\'s house', 'The house in the raion town'],
    },
  },

  // ── TAJIKISTAN ─────────────────────────────────────────────────────────────

  {
    id: 'tj_dushanbe', name: 'Dushanbe', country: 'Tajikistan',
    type: 'urban', scale: 'town', region: 'Dushanbe',
    neighborhoods: {
      informal:      ['Zarafshon edges', 'The settlements past the 46th', 'Shohmansur outer'],
      working_class: ['Sino', 'The 46th microdistrict', 'Karamishev'],
      middle_class:  ['Firdavsi', 'Rudaki Avenue side streets'],
      elite:         ['Ismoili Somoni centre', 'The Varzob road'],
    },
  },
  {
    id: 'tj_khujand', name: 'Khujand', country: 'Tajikistan',
    type: 'urban', scale: 'town', region: 'Sughd',
    neighborhoods: {
      informal:      ['Past the canal', 'The mahalla on the slope'],
      working_class: ['Panjshanbe side streets', 'By the silk mill'],
      middle_class:  ['The centre', 'Ismoil Somoni Street'],
      elite:         ['Near the fortress', 'The Syr Darya bank'],
    },
  },
  {
    id: 'tj_pamir', name: 'Khorog and the Pamirs', country: 'Tajikistan',
    type: 'rural', scale: 'village', region: 'Gorno-Badakhshan',
    neighborhoods: {
      informal:      ['The last house before the pass', 'By the river'],
      working_class: ['The road through the village', 'Near the bridge'],
      middle_class:  ['Near the school', 'The Aga Khan centre'],
      elite:         ['The house with the metal roof', 'The chaikhana end'],
    },
  },

  // ── TURKMENISTAN ───────────────────────────────────────────────────────────

  {
    id: 'tm_ashgabat', name: 'Ashgabat', country: 'Turkmenistan',
    type: 'urban', scale: 'town', region: 'Ahal',
    neighborhoods: {
      informal:      ['Choganly', 'The resettlement blocks', 'Hitrovka'],
      working_class: ['Parahat', 'Gaudan', 'Mir 2'],
      middle_class:  ['Mir 4', 'Berzengi lower', 'Yubileynaya'],
      elite:         ['Berzengi', 'Archabil Avenue', 'The marble quarter'],
    },
  },
  {
    id: 'tm_turkmenabat', name: 'Turkmenabat', country: 'Turkmenistan',
    type: 'urban', scale: 'town', region: 'Lebap',
    neighborhoods: {
      informal:      ['Past the cotton yard', 'The old adobe streets'],
      working_class: ['By the chemical works', 'The rail quarter'],
      middle_class:  ['The centre', 'Near the bazaar'],
      elite:         ['The new avenue', 'Near the administration'],
    },
  },
  {
    id: 'tm_rural', name: 'A Village on the Karakum Edge', country: 'Turkmenistan',
    type: 'rural', scale: 'village', region: 'Mary',
    neighborhoods: {
      informal:      ['The last yard before the sand', 'By the drainage ditch'],
      working_class: ['The road through', 'By the cotton store'],
      middle_class:  ['Near the school', 'The centre'],
      elite:         ['The brigade leader\'s house', 'The walled compound'],
    },
  },

  // ── MONGOLIA ───────────────────────────────────────────────────────────────

  {
    id: 'mn_ulaanbaatar', name: 'Ulaanbaatar', country: 'Mongolia',
    type: 'urban', scale: 'city', region: 'Ulaanbaatar',
    neighborhoods: {
      informal:      ['Bayankhoshuu ger district', 'Chingeltei ger district', 'Songinokhairkhan'],
      working_class: ['Tolgoit', 'Amgalan', 'The 4th khoroolol'],
      middle_class:  ['The 3rd khoroolol', 'Sansar', 'Bayanzurkh'],
      elite:         ['Zaisan', 'The 1st khoroolol', 'Sukhbaatar Square'],
    },
  },
  {
    id: 'mn_erdenet', name: 'Erdenet', country: 'Mongolia',
    type: 'urban', scale: 'town', region: 'Orkhon',
    neighborhoods: {
      informal:      ['The ger fences on the slope', 'Past the 14th'],
      working_class: ['The 3rd district', 'By the concentrator'],
      middle_class:  ['The 5th district', 'Near the culture palace'],
      elite:         ['The specialists\' blocks', 'The mine management houses'],
    },
  },
  {
    id: 'mn_steppe', name: 'The Steppe', country: 'Mongolia',
    type: 'rural', scale: 'village', region: 'Arkhangai',
    neighborhoods: {
      informal:      ['The single ger on the far side', 'By the winter shelter'],
      working_class: ['The summer camp', 'Near the well'],
      middle_class:  ['The sum centre', 'By the school dormitory'],
      elite:         ['The herd owner\'s two gers', 'The house in the aimag town'],
    },
  },

  // ── BHUTAN ─────────────────────────────────────────────────────────────────

  {
    id: 'bt_thimphu', name: 'Thimphu', country: 'Bhutan',
    type: 'urban', scale: 'town', region: 'Thimphu Dzongkhag',
    neighborhoods: {
      informal:      ['Changzamtog rentals', 'Olakha', 'The labour quarters'],
      working_class: ['Changangkha', 'Dechencholing', 'Babesa'],
      middle_class:  ['Chubachu', 'Norzin Lam', 'Lower Motithang'],
      elite:         ['Motithang', 'Langjophakha', 'Upper Chang'],
    },
  },
  {
    id: 'bt_south', name: 'Southern Bhutan', country: 'Bhutan',
    type: 'rural', scale: 'village', region: 'Sarpang and Samtse',
    neighborhoods: {
      informal:      ['The cardamom slope', 'Past the last terrace'],
      working_class: ['The bazaar road', 'Near the orange depot'],
      middle_class:  ['Near the school', 'The village centre'],
      elite:         ['The landholder\'s house', 'Near the dzongkhag office'],
    },
  },
  {
    id: 'bt_bumthang', name: 'Bumthang', country: 'Bhutan',
    type: 'rural', scale: 'village', region: 'Bumthang Dzongkhag',
    neighborhoods: {
      informal:      ['The herders\' hut above the tree line', 'By the stream'],
      working_class: ['The village lane', 'Near the mill'],
      middle_class:  ['Below the lhakhang', 'The valley floor'],
      elite:         ['The old family house', 'Near the dzong'],
    },
  },

  // ── NORTH KOREA ────────────────────────────────────────────────────────────

  {
    id: 'kp_pyongyang', name: 'Pyongyang', country: 'North Korea',
    type: 'urban', scale: 'city', region: 'Pyongyang',
    neighborhoods: {
      informal:      ['Ryokpo outskirts', 'Sadong', 'The huts past the ring road'],
      working_class: ['Songyo', 'Sunan', 'Sosong', 'Mangyongdae'],
      middle_class:  ['Pothonggang', 'Moranbong', 'Taedonggang'],
      elite:         ['Changgwang Street', 'The Central District', 'Ryomyong Street'],
    },
  },
  {
    id: 'kp_chongjin', name: 'Chongjin', country: 'North Korea',
    type: 'urban', scale: 'town', region: 'North Hamgyong',
    neighborhoods: {
      informal:      ['Sunam market edges', 'The huts by the rail yard'],
      working_class: ['Songpyong', 'Pohang', 'Chongam'],
      middle_class:  ['The steelworks housing', 'Near the station'],
      elite:         ['The party compound', 'The riverfront blocks'],
    },
  },
  {
    id: 'kp_farm', name: 'A Cooperative Farm', country: 'North Korea',
    type: 'rural', scale: 'village', region: 'South Hwanghae',
    neighborhoods: {
      informal:      ['The last row of the work team', 'By the drainage'],
      working_class: ['The work-team housing', 'Near the storehouse'],
      middle_class:  ['By the management office', 'The school end'],
      elite:         ['The farm chairman\'s house', 'The party building'],
    },
  },

  // ── TAIWAN ─────────────────────────────────────────────────────────────────

  {
    id: 'tw_taipei', name: 'Taipei', country: 'Taiwan',
    type: 'urban', scale: 'major_city', region: 'Taipei City',
    neighborhoods: {
      informal:      ['Treasure Hill', 'Kangle Li', 'The rooftop additions'],
      working_class: ['Wanhua', 'Datong', 'Nangang', 'Wugu'],
      middle_class:  ['Zhongshan', 'Songshan', 'Wenshan', 'Banqiao'],
      elite:         ['Da\'an', 'Xinyi', 'Tianmu', 'Yangmingshan'],
    },
  },
  {
    id: 'tw_kaohsiung', name: 'Kaohsiung', country: 'Taiwan',
    type: 'urban', scale: 'city', region: 'Kaohsiung City',
    neighborhoods: {
      informal:      ['The harbour shacks at Qijin', 'Hongmaogang'],
      working_class: ['Qianzhen', 'Xiaogang', 'Nanzi'],
      middle_class:  ['Sanmin', 'Zuoying', 'Fengshan'],
      elite:         ['Lingya', 'Gushan', 'Aozihdi'],
    },
  },
  {
    id: 'tw_rural', name: 'Rural Yunlin', country: 'Taiwan',
    type: 'rural', scale: 'village', region: 'Yunlin County',
    neighborhoods: {
      informal:      ['The tin-roofed row past the fields', 'By the irrigation channel'],
      working_class: ['The village road', 'Near the drying yard'],
      middle_class:  ['By the temple', 'The village centre'],
      elite:         ['The three-sided courtyard house', 'Near the township office'],
    },
  },

  // ── MALAYSIA ───────────────────────────────────────────────────────────────

  {
    id: 'my_kualalumpur', name: 'Kuala Lumpur', country: 'Malaysia',
    type: 'urban', scale: 'major_city', region: 'Federal Territory',
    neighborhoods: {
      informal:      ['Kampung Baru', 'Chow Kit', 'The squatter rows at Sentul'],
      working_class: ['Sentul', 'Kepong', 'Cheras', 'Setapak'],
      middle_class:  ['Wangsa Maju', 'Taman Tun Dr Ismail', 'Bandar Utama'],
      elite:         ['Bukit Tunku', 'Damansara Heights', 'Bangsar', 'Mont Kiara'],
    },
  },
  {
    id: 'my_penang', name: 'George Town', country: 'Malaysia',
    type: 'urban', scale: 'city', region: 'Penang',
    neighborhoods: {
      informal:      ['The clan jetties', 'Kampung Melayu'],
      working_class: ['Jelutong', 'Air Itam', 'Sungai Pinang'],
      middle_class:  ['Pulau Tikus', 'Gelugor', 'Bayan Baru'],
      elite:         ['Tanjung Bungah', 'Batu Ferringhi', 'Northam Road'],
    },
  },
  {
    id: 'my_kampung', name: 'A Kampung in Kelantan', country: 'Malaysia',
    type: 'rural', scale: 'village', region: 'Kelantan',
    neighborhoods: {
      informal:      ['The house on stilts past the padi', 'By the river bank'],
      working_class: ['The kampung lane', 'Near the surau'],
      middle_class:  ['By the mosque', 'Near the school'],
      elite:         ['The penghulu\'s house', 'The house with the tiled roof'],
    },
  },
  {
    id: 'my_longhouse', name: 'A Longhouse in Sarawak', country: 'Malaysia',
    type: 'rural', scale: 'village', region: 'Sarawak',
    neighborhoods: {
      informal:      ['The far bilik', 'The temporary farm hut'],
      working_class: ['The middle of the ruai', 'Near the river steps'],
      middle_class:  ['By the tuai rumah\'s bilik', 'Near the generator'],
      elite:         ['The tuai rumah\'s end', 'The house in the bazaar town'],
    },
  },

  // ── EAST TIMOR ─────────────────────────────────────────────────────────────

  {
    id: 'tl_dili', name: 'Dili', country: 'East Timor',
    type: 'urban', scale: 'town', region: 'Dili',
    neighborhoods: {
      informal:      ['Comoro', 'Bidau', 'The IDP camps at Jardim'],
      working_class: ['Bairro Pite', 'Becora', 'Kampung Alor'],
      middle_class:  ['Mandarin', 'Colmera', 'Lower Farol'],
      elite:         ['Farol', 'Motael', 'Lecidere'],
    },
  },
  {
    id: 'tl_rural', name: 'The Mountains of Ermera', country: 'East Timor',
    type: 'rural', scale: 'village', region: 'Ermera',
    neighborhoods: {
      informal:      ['The hut past the coffee', 'By the ravine'],
      working_class: ['The village path', 'Near the drying floor'],
      middle_class:  ['By the church', 'The suco centre'],
      elite:         ['The liurai\'s house', 'The plantation house'],
    },
  },

  // ── MALDIVES ───────────────────────────────────────────────────────────────

  {
    id: 'mv_male', name: 'Male', country: 'Maldives',
    type: 'urban', scale: 'town', region: 'Kaafu',
    neighborhoods: {
      informal:      ['The partitioned rooms in Maafannu', 'The migrant quarters'],
      working_class: ['Maafannu', 'Galolhu', 'Machchangolhi'],
      middle_class:  ['Henveiru', 'Hulhumale phase one'],
      elite:         ['The Henveiru waterfront', 'Villingili'],
    },
  },
  {
    id: 'mv_island', name: 'An Island in the Outer Atolls', country: 'Maldives',
    type: 'rural', scale: 'village', region: 'Outer Atolls',
    neighborhoods: {
      informal:      ['The far end of the island', 'By the boat landing'],
      working_class: ['The main lane', 'Near the harbour'],
      middle_class:  ['By the mosque', 'Near the school'],
      elite:         ['The house with the concrete wall', 'The island chief\'s house'],
    },
  },


  // ── ALGERIA ────────────────────────────────────────────────────────────────

  {
    id: 'dz_algiers', name: 'Algiers', country: 'Algeria',
    type: 'urban', scale: 'major_city', region: 'Alger',
    neighborhoods: {
      informal:      ['The bidonvilles at Oued Ouchayah', 'Diar Echems', 'Climat de France'],
      working_class: ['Bab El Oued', 'Belouizdad', 'Kouba', 'Bachdjarah'],
      middle_class:  ['El Biar', 'Ben Aknoun', 'Birkhadem', 'Bologhine'],
      elite:         ['Hydra', 'El Mouradia', 'Club des Pins', 'Chéraga'],
    },
  },
  {
    id: 'dz_oran', name: 'Oran', country: 'Algeria',
    type: 'urban', scale: 'city', region: 'Oran',
    neighborhoods: {
      informal:      ['Planteurs', 'Ras El Aïn shacks'],
      working_class: ['Médina Jdida', 'Sidi El Houari', 'El Hamri'],
      middle_class:  ['Es Sénia', 'Bir El Djir'],
      elite:         ['Front de Mer', 'Canastel', 'Gambetta'],
    },
  },
  {
    id: 'dz_kabylie', name: 'A Village in Kabylie', country: 'Algeria',
    type: 'rural', scale: 'village', region: 'Kabylie',
    neighborhoods: {
      informal:      ['Below the last houses', 'By the spring'],
      working_class: ['The road through the village', 'Near the olive press'],
      middle_class:  ['Around the djemaa', 'The village centre'],
      elite:         ['The house the emigrant built', 'Above the terraces'],
    },
  },

  // ── TUNISIA ────────────────────────────────────────────────────────────────

  {
    id: 'tn_tunis', name: 'Tunis', country: 'Tunisia',
    type: 'urban', scale: 'city', region: 'Tunis',
    neighborhoods: {
      informal:      ['Ettadhamen', 'Douar Hicher', 'Mellassine', 'Sidi Hassine'],
      working_class: ['Bab Souika', 'Le Kram', 'Hay Khadra', 'Mégrine'],
      middle_class:  ['El Menzah', 'Manar', 'Ariana', 'Bardo'],
      elite:         ['La Marsa', 'Carthage', 'Sidi Bou Saïd', 'Les Berges du Lac'],
    },
  },
  {
    id: 'tn_sfax', name: 'Sfax', country: 'Tunisia',
    type: 'urban', scale: 'town', region: 'Sfax',
    neighborhoods: {
      informal:      ['The shacks past the phosphate yard', 'Sidi Mansour edge'],
      working_class: ['El Bahri', 'Sakiet Ezzit', 'Bab Jebli'],
      middle_class:  ['El Habib', 'Route El Ain'],
      elite:         ['Chihia', 'The corniche'],
    },
  },
  {
    id: 'tn_interior', name: 'Sidi Bouzid and the Interior', country: 'Tunisia',
    type: 'rural', scale: 'village', region: 'Sidi Bouzid',
    neighborhoods: {
      informal:      ['The houses past the wadi', 'By the well'],
      working_class: ['The main road', 'Near the market'],
      middle_class:  ['By the municipality', 'The centre'],
      elite:         ['The landowner\'s house', 'Near the delegation office'],
    },
  },

  // ── LIBYA ──────────────────────────────────────────────────────────────────

  {
    id: 'ly_tripoli', name: 'Tripoli', country: 'Libya',
    type: 'urban', scale: 'city', region: 'Tripolitania',
    neighborhoods: {
      informal:      ['Gurji shacks', 'Abu Salim outer', 'The migrant quarters at Zawiyat'],
      working_class: ['Abu Salim', 'Souq al-Jumaa', 'Tajoura', 'Janzour'],
      middle_class:  ['Ben Ashour', 'Hay al-Andalus', 'Zawiyat al-Dahmani'],
      elite:         ['Gargaresh', 'Hay Demashq', 'The old city restored'],
    },
  },
  {
    id: 'ly_benghazi', name: 'Benghazi', country: 'Libya',
    type: 'urban', scale: 'town', region: 'Cyrenaica',
    neighborhoods: {
      informal:      ['Sabri', 'Laithi', 'The Tawergha camps'],
      working_class: ['Sidi Hussein', 'Al-Hadaeq', 'Bu Atni'],
      middle_class:  ['Al-Berka', 'Al-Fuwayhat'],
      elite:         ['The corniche', 'Al-Kish'],
    },
  },
  {
    id: 'ly_jebel', name: 'The Nafusa Mountains', country: 'Libya',
    type: 'rural', scale: 'village', region: 'Jebel Nafusa',
    neighborhoods: {
      informal:      ['The old cave houses', 'Past the last terrace'],
      working_class: ['The village road', 'Near the granary'],
      middle_class:  ['By the mosque', 'The centre'],
      elite:         ['The big house on the ridge', 'Near the administration'],
    },
  },

  // ── SUDAN ──────────────────────────────────────────────────────────────────

  {
    id: 'sd_khartoum', name: 'Khartoum', country: 'Sudan',
    type: 'urban', scale: 'city', region: 'Khartoum State',
    neighborhoods: {
      informal:      ['Mayo', 'Dar es Salaam', 'Jabal Awliya camps', 'Haj Yousif'],
      working_class: ['Omdurman old quarters', 'Kalakla', 'Bahri industrial'],
      middle_class:  ['Riyadh', 'Arkaweet', 'Al-Amarat'],
      elite:         ['Khartoum 2', 'Burri', 'Al-Manshiya', 'Garden City'],
    },
  },
  {
    id: 'sd_portsudan', name: 'Port Sudan', country: 'Sudan',
    type: 'urban', scale: 'town', region: 'Red Sea State',
    neighborhoods: {
      informal:      ['Deim Arab', 'The Beja quarters past the salt flats'],
      working_class: ['Deim Suakin', 'Transit', 'Near the harbour'],
      middle_class:  ['Al-Thawra', 'The centre'],
      elite:         ['The corniche', 'Near the port administration'],
    },
  },
  {
    id: 'sd_nuba', name: 'The Nuba Mountains', country: 'Sudan',
    type: 'rural', scale: 'village', region: 'South Kordofan',
    neighborhoods: {
      informal:      ['The caves above the village', 'Past the sorghum'],
      working_class: ['The path through', 'Near the grinding mill'],
      middle_class:  ['Near the school', 'The village centre'],
      elite:         ['The mek\'s compound', 'Near the market'],
    },
  },

  // ── ERITREA ────────────────────────────────────────────────────────────────

  {
    id: 'er_asmara', name: 'Asmara', country: 'Eritrea',
    type: 'urban', scale: 'town', region: 'Maekel',
    neighborhoods: {
      informal:      ['Aba Shawl', 'Edaga Hamus edges'],
      working_class: ['Geza Banda', 'Akria', 'Godaif'],
      middle_class:  ['Tiravolo', 'Sembel', 'Paradiso'],
      elite:         ['Harnet Avenue', 'Villagio', 'Gejeret'],
    },
  },
  {
    id: 'er_massawa', name: 'Massawa', country: 'Eritrea',
    type: 'urban', scale: 'town', region: 'Northern Red Sea',
    neighborhoods: {
      informal:      ['The shelters past the causeway', 'Edaga edges'],
      working_class: ['Tualet', 'Near the salt pans'],
      middle_class:  ['Gurgusum road', 'The centre'],
      elite:         ['The old Ottoman quarter', 'The harbour front'],
    },
  },
  {
    id: 'er_highland', name: 'A Village in the Highlands', country: 'Eritrea',
    type: 'rural', scale: 'village', region: 'Debub',
    neighborhoods: {
      informal:      ['Past the last hidmo', 'By the dry riverbed'],
      working_class: ['The village path', 'Near the threshing floor'],
      middle_class:  ['By the church', 'The centre'],
      elite:         ['The house with the tin roof', 'Near the administration'],
    },
  },

  // ── DJIBOUTI ───────────────────────────────────────────────────────────────

  {
    id: 'dj_djibouti', name: 'Djibouti City', country: 'Djibouti',
    type: 'urban', scale: 'town', region: 'Djibouti Region',
    neighborhoods: {
      informal:      ['Balbala', 'Quartier 7', 'Arhiba'],
      working_class: ['Quartier 1', 'Einguela', 'Cité Barwaqo'],
      middle_class:  ['Haramous lower', 'Gabode'],
      elite:         ['Héron', 'Haramous', 'Plateau du Serpent'],
    },
  },
  {
    id: 'dj_rural', name: 'The Afar Interior', country: 'Djibouti',
    type: 'rural', scale: 'village', region: 'Tadjourah',
    neighborhoods: {
      informal:      ['The daboyta past the lava field', 'By the wells'],
      working_class: ['The track through', 'Near the water point'],
      middle_class:  ['Near the school', 'The centre'],
      elite:         ['The concrete house', 'Near the prefecture'],
    },
  },

  // ── GUINEA ─────────────────────────────────────────────────────────────────

  {
    id: 'gn_conakry', name: 'Conakry', country: 'Guinea',
    type: 'urban', scale: 'city', region: 'Conakry',
    neighborhoods: {
      informal:      ['Kaporo Rails', 'Dimesse', 'Sonfonia squats'],
      working_class: ['Matoto', 'Ratoma', 'Hamdallaye', 'Bonfi'],
      middle_class:  ['Dixinn', 'Camayenne', 'Lambanyi'],
      elite:         ['Kaloum', 'Donka', 'Landreah', 'Corniche Nord'],
    },
  },
  {
    id: 'gn_kankan', name: 'Kankan', country: 'Guinea',
    type: 'urban', scale: 'town', region: 'Haute-Guinée',
    neighborhoods: {
      informal:      ['Past the Milo bank', 'Timbo edges'],
      working_class: ['Kabada', 'Salamani', 'Banankoro'],
      middle_class:  ['Sinkéfara', 'The centre'],
      elite:         ['Near the governorate', 'The university quarter'],
    },
  },
  {
    id: 'gn_fouta', name: 'The Fouta Djallon', country: 'Guinea',
    type: 'rural', scale: 'village', region: 'Moyenne-Guinée',
    neighborhoods: {
      informal:      ['The tapade past the last one', 'By the stream'],
      working_class: ['The path through the village', 'Near the mosque wall'],
      middle_class:  ['By the mosque', 'The village centre'],
      elite:         ['The almamy\'s compound', 'The house the Dakar money built'],
    },
  },

  // ── MALI ───────────────────────────────────────────────────────────────────

  {
    id: 'ml_bamako', name: 'Bamako', country: 'Mali',
    type: 'urban', scale: 'city', region: 'Bamako District',
    neighborhoods: {
      informal:      ['Bankoni', 'Sabalibougou', 'Djikoroni Para', 'Doumanzana'],
      working_class: ['Niaréla', 'Bagadadji', 'Lafiabougou', 'Banconi'],
      middle_class:  ['Badalabougou', 'Hamdallaye', 'Magnambougou'],
      elite:         ['ACI 2000', 'Hippodrome', 'Korofina Nord', 'Badalabougou Est'],
    },
  },
  {
    id: 'ml_mopti', name: 'Mopti', country: 'Mali',
    type: 'urban', scale: 'town', region: 'Mopti',
    neighborhoods: {
      informal:      ['Komoguel shacks', 'The displaced quarters at Sévaré'],
      working_class: ['Bougoufié', 'Taikiri', 'The port quarter'],
      middle_class:  ['Sévaré centre', 'Médina Coura'],
      elite:         ['Near the administration', 'The river frontage'],
    },
  },
  {
    id: 'ml_rural', name: 'A Village on the Niger', country: 'Mali',
    type: 'rural', scale: 'village', region: 'Ségou',
    neighborhoods: {
      informal:      ['Past the millet fields', 'By the landing'],
      working_class: ['The path through', 'Near the pump'],
      middle_class:  ['By the mosque', 'The village centre'],
      elite:         ['The chief\'s compound', 'The house with the metal roof'],
    },
  },

  // ── BURKINA FASO ───────────────────────────────────────────────────────────

  {
    id: 'bf_ouagadougou', name: 'Ouagadougou', country: 'Burkina Faso',
    type: 'urban', scale: 'city', region: 'Centre',
    neighborhoods: {
      informal:      ['The non-lotis at Polesgo', 'Tanghin', 'Nioko II'],
      working_class: ['Dapoya', 'Gounghin', 'Pissy', 'Tampouy'],
      middle_class:  ['Zogona', 'Patte d\'Oie', 'Wemtenga'],
      elite:         ['Ouaga 2000', 'Koulouba', 'Zone du Bois'],
    },
  },
  {
    id: 'bf_bobo', name: 'Bobo-Dioulasso', country: 'Burkina Faso',
    type: 'urban', scale: 'town', region: 'Hauts-Bassins',
    neighborhoods: {
      informal:      ['Kuinima non-lotis', 'Bolomakoté edges'],
      working_class: ['Accart-Ville', 'Farakan', 'Sarfalao'],
      middle_class:  ['Dioulassoba', 'Secteur 22'],
      elite:         ['Ouezzin Ville', 'Near the railway station'],
    },
  },
  {
    id: 'bf_rural', name: 'A Village on the Mossi Plateau', country: 'Burkina Faso',
    type: 'rural', scale: 'village', region: 'Centre-Nord',
    neighborhoods: {
      informal:      ['The compound past the last field', 'By the barrage'],
      working_class: ['The track through', 'Near the mill'],
      middle_class:  ['By the school', 'The village centre'],
      elite:         ['The naaba\'s compound', 'The house the Abidjan money built'],
    },
  },

  // ── IVORY COAST ────────────────────────────────────────────────────────────

  {
    id: 'ci_abidjan', name: 'Abidjan', country: 'Ivory Coast',
    type: 'urban', scale: 'megacity', region: 'Lagunes',
    neighborhoods: {
      informal:      ['Gobelé', 'Boribana', 'Adjouffou', 'Washington'],
      working_class: ['Abobo', 'Yopougon', 'Koumassi', 'Adjamé'],
      middle_class:  ['Marcory', 'Treichville', 'Angré', 'Deux Plateaux Vallon'],
      elite:         ['Cocody', 'Riviera Golf', 'Plateau', 'Deux Plateaux'],
    },
  },
  {
    id: 'ci_bouake', name: 'Bouaké', country: 'Ivory Coast',
    type: 'urban', scale: 'town', region: 'Vallée du Bandama',
    neighborhoods: {
      informal:      ['Kennedy extension', 'The displaced quarters'],
      working_class: ['Koko', 'Dar es Salam', 'Belleville'],
      middle_class:  ['Air France', 'Commerce'],
      elite:         ['Near the prefecture', 'Nimbo'],
    },
  },
  {
    id: 'ci_cocoa', name: 'The Cocoa Belt', country: 'Ivory Coast',
    type: 'rural', scale: 'village', region: 'Sud-Comoé',
    neighborhoods: {
      informal:      ['The workers\' camp in the plantation', 'Past the drying racks'],
      working_class: ['The village road', 'Near the buying station'],
      middle_class:  ['By the church', 'The village centre'],
      elite:         ['The planter\'s house', 'The concrete house near the road'],
    },
  },

  // ── CAMEROON ───────────────────────────────────────────────────────────────

  {
    id: 'cm_douala', name: 'Douala', country: 'Cameroon',
    type: 'urban', scale: 'city', region: 'Littoral',
    neighborhoods: {
      informal:      ['Nylon', 'Bépanda', 'Village', 'Mabanda'],
      working_class: ['New Bell', 'Deido', 'Bonabéri', 'Makepe Missoke'],
      middle_class:  ['Makepe', 'Logpom', 'Ndogbong'],
      elite:         ['Bonanjo', 'Bonapriso', 'Denver', 'Bali'],
    },
  },
  {
    id: 'cm_yaounde', name: 'Yaoundé', country: 'Cameroon',
    type: 'urban', scale: 'city', region: 'Centre',
    neighborhoods: {
      informal:      ['Mokolo', 'Nkolbikok', 'Melen ravines'],
      working_class: ['Mvog-Ada', 'Briqueterie', 'Madagascar', 'Nkomo'],
      middle_class:  ['Mvog-Mbi', 'Essos', 'Biyem-Assi'],
      elite:         ['Bastos', 'Golf', 'Quartier du Lac', 'Nlongkak'],
    },
  },
  {
    id: 'cm_bamenda', name: 'Bamenda', country: 'Cameroon',
    type: 'urban', scale: 'town', region: 'North-West',
    neighborhoods: {
      informal:      ['Ntarinkon lower', 'Sisia', 'Mankon back lanes'],
      working_class: ['Nkwen', 'Mulang', 'Ntamulung'],
      middle_class:  ['Up Station road', 'Commercial Avenue'],
      elite:         ['Up Station', 'The Fon\'s palace quarter'],
    },
  },
  {
    id: 'cm_rural', name: 'The Grassfields', country: 'Cameroon',
    type: 'rural', scale: 'village', region: 'West Region',
    neighborhoods: {
      informal:      ['The hut past the last plot', 'By the stream'],
      working_class: ['The village path', 'Near the market square'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The chief\'s compound', 'The house the bushfaller built'],
    },
  },

  // ── ZAMBIA ─────────────────────────────────────────────────────────────────

  {
    id: 'zm_lusaka', name: 'Lusaka', country: 'Zambia',
    type: 'urban', scale: 'city', region: 'Lusaka Province',
    neighborhoods: {
      informal:      ['Kanyama', 'Misisi', 'Chawama', 'Garden Compound'],
      working_class: ['Matero', 'Chilenje', 'Kabwata', 'Mtendere'],
      middle_class:  ['Northmead', 'Woodlands', 'Chelston', 'Olympia'],
      elite:         ['Kabulonga', 'Roma', 'Rhodes Park', 'Sunningdale'],
    },
  },
  {
    id: 'zm_copperbelt', name: 'Kitwe and the Copperbelt', country: 'Zambia',
    type: 'urban', scale: 'town', region: 'Copperbelt',
    neighborhoods: {
      informal:      ['Chimwemwe extension', 'Ipusukilo', 'Kawama'],
      working_class: ['Wusakile mine township', 'Chamboli', 'Buchi'],
      middle_class:  ['Riverside lower', 'Parklands'],
      elite:         ['Nkana East', 'Riverside', 'The mine senior quarters'],
    },
  },
  {
    id: 'zm_rural', name: 'The Gwembe Valley', country: 'Zambia',
    type: 'rural', scale: 'village', region: 'Southern Province',
    neighborhoods: {
      informal:      ['The resettlement huts above the water', 'Past the last field'],
      working_class: ['The path through', 'Near the borehole'],
      middle_class:  ['By the school', 'The village centre'],
      elite:         ['The headman\'s compound', 'The house with the iron roof'],
    },
  },

  // ── ANGOLA ─────────────────────────────────────────────────────────────────

  {
    id: 'ao_luanda', name: 'Luanda', country: 'Angola',
    type: 'urban', scale: 'megacity', region: 'Luanda Province',
    neighborhoods: {
      informal:      ['Sambizanga', 'Rocha Pinto', 'Cazenga', 'Boa Vista'],
      working_class: ['Rangel', 'Marçal', 'Golfe', 'Viana'],
      middle_class:  ['Alvalade', 'Maianga', 'Kinaxixi', 'Talatona lower'],
      elite:         ['Ilha do Cabo', 'Miramar', 'Talatona', 'Luanda Sul'],
    },
  },
  {
    id: 'ao_huambo', name: 'Huambo', country: 'Angola',
    type: 'urban', scale: 'town', region: 'Huambo',
    neighborhoods: {
      informal:      ['The musseques past the rail line', 'Calomanda'],
      working_class: ['Benfica', 'Cidade Alta lower', 'São João'],
      middle_class:  ['The centre', 'Academia'],
      elite:         ['The old Nova Lisboa quarter', 'Near the governorate'],
    },
  },
  {
    id: 'ao_rural', name: 'The Central Highlands', country: 'Angola',
    type: 'rural', scale: 'village', region: 'Bié',
    neighborhoods: {
      informal:      ['The hut past the mined field', 'By the river'],
      working_class: ['The track through', 'Near the mission'],
      middle_class:  ['By the church', 'The village centre'],
      elite:         ['The soba\'s compound', 'The house near the road'],
    },
  },

  // ── LIBERIA ────────────────────────────────────────────────────────────────

  {
    id: 'lr_monrovia', name: 'Monrovia', country: 'Liberia',
    type: 'urban', scale: 'town', region: 'Montserrado',
    neighborhoods: {
      informal:      ['West Point', 'Clara Town', 'New Kru Town', 'Peace Island'],
      working_class: ['Logan Town', 'Paynesville', 'Gardnersville'],
      middle_class:  ['Sinkor', 'Congo Town', 'Old Road'],
      elite:         ['Mamba Point', 'Fish Market', 'Virginia', 'Sinkor Old Road'],
    },
  },
  {
    id: 'lr_rural', name: 'Nimba County', country: 'Liberia',
    type: 'rural', scale: 'village', region: 'Nimba',
    neighborhoods: {
      informal:      ['The huts past the rubber', 'By the creek'],
      working_class: ['The village road', 'Near the palava hut'],
      middle_class:  ['By the church', 'Near the clinic'],
      elite:         ['The town chief\'s compound', 'The zinc-roof house'],
    },
  },

  // ── SIERRA LEONE ───────────────────────────────────────────────────────────

  {
    id: 'sl_freetown', name: 'Freetown', country: 'Sierra Leone',
    type: 'urban', scale: 'town', region: 'Western Area',
    neighborhoods: {
      informal:      ['Kroo Bay', 'Susan\'s Bay', 'Moa Wharf', 'Culvert'],
      working_class: ['Kissy', 'Wellington', 'Calaba Town', 'Waterloo'],
      middle_class:  ['Brookfields', 'Wilberforce', 'Congo Cross'],
      elite:         ['Hill Station', 'Spur Road', 'Aberdeen', 'Signal Hill'],
    },
  },
  {
    id: 'sl_kono', name: 'Kono District', country: 'Sierra Leone',
    type: 'rural', scale: 'village', region: 'Eastern Province',
    neighborhoods: {
      informal:      ['The mining camp by the tailings', 'Past the pits'],
      working_class: ['The village road', 'Near the wash plant'],
      middle_class:  ['By the mosque', 'Near the school'],
      elite:         ['The paramount chief\'s compound', 'The dealer\'s house'],
    },
  },

  // ── NIGER ──────────────────────────────────────────────────────────────────

  {
    id: 'ne_niamey', name: 'Niamey', country: 'Niger',
    type: 'urban', scale: 'town', region: 'Niamey',
    neighborhoods: {
      informal:      ['Talladjé', 'Lazaret', 'Banizoumbou edges'],
      working_class: ['Yantala', 'Gamkallé', 'Zongo', 'Boukoki'],
      middle_class:  ['Plateau lower', 'Terminus', 'Koira Kano'],
      elite:         ['Plateau', 'Kouara Kano villas', 'Near the presidency'],
    },
  },
  {
    id: 'ne_rural', name: 'A Village in the Sahel', country: 'Niger',
    type: 'rural', scale: 'village', region: 'Tahoua',
    neighborhoods: {
      informal:      ['The straw huts past the millet', 'By the dry wadi'],
      working_class: ['The track through', 'Near the well'],
      middle_class:  ['By the mosque', 'The village centre'],
      elite:         ['The chief\'s compound', 'The banco house with the metal door'],
    },
  },

  // ── CHAD ───────────────────────────────────────────────────────────────────

  {
    id: 'td_ndjamena', name: 'N\'Djamena', country: 'Chad',
    type: 'urban', scale: 'town', region: 'N\'Djamena',
    neighborhoods: {
      informal:      ['Walia', 'Diguel', 'Atrone', 'Gassi'],
      working_class: ['Moursal', 'Chagoua', 'Dembé', 'Ridina'],
      middle_class:  ['Sabangali', 'Klemat'],
      elite:         ['Quartier Résidentiel', 'Near the presidency', 'Farcha villas'],
    },
  },
  {
    id: 'td_rural', name: 'The Lake Chad Basin', country: 'Chad',
    type: 'rural', scale: 'village', region: 'Lac',
    neighborhoods: {
      informal:      ['The displaced site past the reeds', 'By the shrinking shore'],
      working_class: ['The village path', 'Near the landing'],
      middle_class:  ['By the mosque', 'Near the school'],
      elite:         ['The chief\'s compound', 'The house near the sous-préfecture'],
    },
  },

  // ── CENTRAL AFRICAN REPUBLIC ───────────────────────────────────────────────

  {
    id: 'cf_bangui', name: 'Bangui', country: 'Central African Republic',
    type: 'urban', scale: 'town', region: 'Bangui',
    neighborhoods: {
      informal:      ['PK5 back lanes', 'Combattant', 'The M\'Poko camp'],
      working_class: ['Boy-Rabe', 'Miskine', 'Kokoro', 'Gobongo'],
      middle_class:  ['Lakouanga', 'Sica 1'],
      elite:         ['Centre-ville', 'Near the presidency', 'Bas-Oubangui'],
    },
  },
  {
    id: 'cf_rural', name: 'A Village on the Ubangi', country: 'Central African Republic',
    type: 'rural', scale: 'village', region: 'Ombella-M\'Poko',
    neighborhoods: {
      informal:      ['The huts past the manioc', 'By the forest edge'],
      working_class: ['The road through', 'Near the landing'],
      middle_class:  ['By the mission', 'The village centre'],
      elite:         ['The chief\'s compound', 'The house with the iron roof'],
    },
  },

  // ── TOGO ───────────────────────────────────────────────────────────────────

  {
    id: 'tg_lome', name: 'Lomé', country: 'Togo',
    type: 'urban', scale: 'town', region: 'Maritime',
    neighborhoods: {
      informal:      ['Akodésséwa', 'Gbényédzi', 'Baguida edges'],
      working_class: ['Bè', 'Adakpamé', 'Agoè', 'Hanoukopé'],
      middle_class:  ['Tokoin', 'Nyékonakpoè', 'Kodjoviakopé'],
      elite:         ['Administratif', 'Lomé II', 'The boulevard du Mono'],
    },
  },
  {
    id: 'tg_rural', name: 'The Kara Region', country: 'Togo',
    type: 'rural', scale: 'village', region: 'Kara',
    neighborhoods: {
      informal:      ['The compound past the last field', 'By the stream'],
      working_class: ['The path through', 'Near the mill'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The chief\'s compound', 'The house with the metal roof'],
    },
  },

  // ── BENIN ──────────────────────────────────────────────────────────────────

  {
    id: 'bj_cotonou', name: 'Cotonou', country: 'Benin',
    type: 'urban', scale: 'town', region: 'Littoral',
    neighborhoods: {
      informal:      ['Ganvié stilt village', 'Vossa', 'Sènadé'],
      working_class: ['Dantokpa', 'Akpakpa', 'Zogbo', 'Gbégamey'],
      middle_class:  ['Cadjèhoun', 'Sainte-Rita', 'Fidjrossè'],
      elite:         ['Haie Vive', 'Les Cocotiers', 'Patte d\'Oie'],
    },
  },
  {
    id: 'bj_rural', name: 'The Abomey Plateau', country: 'Benin',
    type: 'rural', scale: 'village', region: 'Zou',
    neighborhoods: {
      informal:      ['Past the oil palms', 'By the marsh'],
      working_class: ['The road through', 'Near the market'],
      middle_class:  ['By the convent', 'The village centre'],
      elite:         ['The royal quarter', 'The house near the tarmac'],
    },
  },


  // ── DOMINICAN REPUBLIC ─────────────────────────────────────────────────────

  {
    id: 'do_santodomingo', name: 'Santo Domingo', country: 'Dominican Republic',
    type: 'urban', scale: 'city', region: 'Distrito Nacional',
    neighborhoods: {
      informal:      ['La Ciénaga', 'Los Guandules', 'Capotillo', 'Gualey'],
      working_class: ['Villa Consuelo', 'Cristo Rey', 'Los Mina', 'Herrera'],
      middle_class:  ['Gazcue', 'Bella Vista', 'Evaristo Morales', 'Naco'],
      elite:         ['Piantini', 'Arroyo Hondo', 'Los Cacicazgos', 'Zona Colonial'],
    },
  },
  {
    id: 'do_santiago', name: 'Santiago de los Caballeros', country: 'Dominican Republic',
    type: 'urban', scale: 'town', region: 'Cibao',
    neighborhoods: {
      informal:      ['Cienfuegos', 'Hoya del Caimito', 'Los Salados'],
      working_class: ['Pueblo Nuevo', 'Nibaje', 'Bella Vista Sur'],
      middle_class:  ['Jardines Metropolitanos', 'La Trinitaria'],
      elite:         ['Cerros de Gurabo', 'Villa Olga'],
    },
  },
  {
    id: 'do_bateyes', name: 'The Bateyes', country: 'Dominican Republic',
    type: 'rural', scale: 'village', region: 'San Pedro de Macorís',
    neighborhoods: {
      informal:      ['The barracón', 'Past the cane', 'By the irrigation ditch'],
      working_class: ['The batey street', 'Near the weigh station'],
      middle_class:  ['Near the chapel', 'The colmado corner'],
      elite:         ['The administrator\'s house', 'The house in the town'],
    },
  },

  // ── URUGUAY ────────────────────────────────────────────────────────────────

  {
    id: 'uy_montevideo', name: 'Montevideo', country: 'Uruguay',
    type: 'urban', scale: 'city', region: 'Montevideo',
    neighborhoods: {
      informal:      ['Casavalle', 'Barrio Borro', 'Nuevo París asentamientos'],
      working_class: ['Cerro', 'La Teja', 'Peñarol', 'Belvedere'],
      middle_class:  ['Pocitos', 'Parque Rodó', 'La Blanqueada', 'Buceo'],
      elite:         ['Carrasco', 'Punta Gorda', 'Villa Biarritz'],
    },
  },
  {
    id: 'uy_rural', name: 'The Interior', country: 'Uruguay',
    type: 'rural', scale: 'village', region: 'Tacuarembó',
    neighborhoods: {
      informal:      ['El rancherío', 'Detrás de la vía'],
      working_class: ['La calle principal', 'Cerca del boliche'],
      middle_class:  ['Frente a la plaza', 'Cerca de la escuela'],
      elite:         ['El casco de la estancia', 'La casa del patrón'],
    },
  },

  // ── PARAGUAY ───────────────────────────────────────────────────────────────

  {
    id: 'py_asuncion', name: 'Asunción', country: 'Paraguay',
    type: 'urban', scale: 'town', region: 'Asunción',
    neighborhoods: {
      informal:      ['Chacarita', 'Bañado Sur', 'Bañado Norte', 'Ricardo Brugada'],
      working_class: ['San Pablo', 'Tembetary', 'Obrero', 'Mariano Roque Alonso'],
      middle_class:  ['Villa Morra lower', 'Las Mercedes', 'Sajonia'],
      elite:         ['Villa Morra', 'Carmelitas', 'Mburucuyá', 'Recoleta'],
    },
  },
  {
    id: 'py_chaco', name: 'The Chaco', country: 'Paraguay',
    type: 'rural', scale: 'village', region: 'Boquerón',
    neighborhoods: {
      informal:      ['The indigenous settlement past the fence', 'By the tajamar'],
      working_class: ['The colony road', 'Near the dairy'],
      middle_class:  ['The Mennonite colony centre', 'Near the co-operative'],
      elite:         ['The estancia house', 'The co-operative manager\'s house'],
    },
  },

  // ── ECUADOR ────────────────────────────────────────────────────────────────

  {
    id: 'ec_quito', name: 'Quito', country: 'Ecuador',
    type: 'urban', scale: 'city', region: 'Pichincha',
    neighborhoods: {
      informal:      ['Pisulí', 'Atucucho', 'La Roldós', 'Comité del Pueblo'],
      working_class: ['Chillogallo', 'Solanda', 'La Ferroviaria', 'Cotocollao'],
      middle_class:  ['La Floresta', 'El Batán', 'Iñaquito', 'La Carolina'],
      elite:         ['Cumbayá', 'Bellavista', 'González Suárez', 'Tumbaco'],
    },
  },
  {
    id: 'ec_guayaquil', name: 'Guayaquil', country: 'Ecuador',
    type: 'urban', scale: 'city', region: 'Guayas',
    neighborhoods: {
      informal:      ['Isla Trinitaria', 'Monte Sinaí', 'Guasmo Sur', 'Suburbio'],
      working_class: ['Mapasingue', 'Febres Cordero', 'Bastión Popular'],
      middle_class:  ['Urdesa', 'Alborada', 'Kennedy', 'Sauces'],
      elite:         ['Samborondón', 'Los Ceibos', 'Puerto Azul'],
    },
  },
  {
    id: 'ec_sierra', name: 'A Village in the Sierra', country: 'Ecuador',
    type: 'rural', scale: 'village', region: 'Chimborazo',
    neighborhoods: {
      informal:      ['La choza sobre el páramo', 'Detrás del cerro'],
      working_class: ['La calle del pueblo', 'Cerca del molino'],
      middle_class:  ['Frente a la iglesia', 'La plaza'],
      elite:         ['La casa de hacienda', 'Cerca del municipio'],
    },
  },

  // ── EL SALVADOR ────────────────────────────────────────────────────────────

  {
    id: 'sv_sansalvador', name: 'San Salvador', country: 'El Salvador',
    type: 'urban', scale: 'city', region: 'San Salvador',
    neighborhoods: {
      informal:      ['Comunidad Tutunichapa', 'La Chacra', 'Iberia', 'Las Palmas'],
      working_class: ['Soyapango', 'Mejicanos', 'Ciudad Delgado', 'Apopa'],
      middle_class:  ['Escalón lower', 'San Jacinto', 'Miramonte'],
      elite:         ['Colonia Escalón', 'San Benito', 'Santa Elena', 'Zona Rosa'],
    },
  },
  {
    id: 'sv_rural', name: 'Morazán', country: 'El Salvador',
    type: 'rural', scale: 'village', region: 'Morazán',
    neighborhoods: {
      informal:      ['El rancho pasado el río', 'Cerca del cafetal'],
      working_class: ['La calle del cantón', 'Cerca del beneficio'],
      middle_class:  ['Frente a la iglesia', 'El centro'],
      elite:         ['La casa del finquero', 'Cerca de la alcaldía'],
    },
  },

  // ── HONDURAS ───────────────────────────────────────────────────────────────

  {
    id: 'hn_tegucigalpa', name: 'Tegucigalpa', country: 'Honduras',
    type: 'urban', scale: 'town', region: 'Francisco Morazán',
    neighborhoods: {
      informal:      ['Nueva Suyapa', 'El Pedregal', 'Villanueva', 'La Sosa'],
      working_class: ['Comayagüela', 'Kennedy', 'Villa Nueva', 'El Hato'],
      middle_class:  ['Palmira', 'Miraflores', 'Las Colinas lower'],
      elite:         ['Lomas del Guijarro', 'Las Colinas', 'El Hatillo'],
    },
  },
  {
    id: 'hn_sanpedro', name: 'San Pedro Sula', country: 'Honduras',
    type: 'urban', scale: 'town', region: 'Cortés',
    neighborhoods: {
      informal:      ['Chamelecón', 'Rivera Hernández', 'López Arellano'],
      working_class: ['Cofradía', 'El Carmen', 'Satélite'],
      middle_class:  ['Jardines del Valle', 'Trejo'],
      elite:         ['Bella Vista', 'Lomas del Guijarro Sur'],
    },
  },
  {
    id: 'hn_banana', name: 'The Banana Coast', country: 'Honduras',
    type: 'rural', scale: 'village', region: 'Atlántida',
    neighborhoods: {
      informal:      ['El campo detrás de la finca', 'Junto al canal'],
      working_class: ['La línea', 'Cerca del empacadero'],
      middle_class:  ['Frente a la iglesia', 'El centro del campo'],
      elite:         ['La casa del mandador', 'La zona americana'],
    },
  },

  // ── NICARAGUA ──────────────────────────────────────────────────────────────

  {
    id: 'ni_managua', name: 'Managua', country: 'Nicaragua',
    type: 'urban', scale: 'town', region: 'Managua',
    neighborhoods: {
      informal:      ['Acahualinca', 'La Chureca', 'Jorge Dimitrov', 'Ciudad Sandino'],
      working_class: ['Ciudad Jardín', 'Bello Horizonte', 'Barrio Riguero'],
      middle_class:  ['Altamira', 'Los Robles lower', 'Bolonia'],
      elite:         ['Las Colinas', 'Los Robles', 'Villa Fontana'],
    },
  },
  {
    id: 'ni_rural', name: 'Matagalpa', country: 'Nicaragua',
    type: 'rural', scale: 'village', region: 'Matagalpa',
    neighborhoods: {
      informal:      ['El rancho en el cerro', 'Pasando la quebrada'],
      working_class: ['La calle de la comarca', 'Cerca del beneficio'],
      middle_class:  ['Frente a la iglesia', 'El centro'],
      elite:         ['La casa hacienda', 'Cerca de la alcaldía'],
    },
  },

  // ── JAMAICA ────────────────────────────────────────────────────────────────

  {
    id: 'jm_kingston', name: 'Kingston', country: 'Jamaica',
    type: 'urban', scale: 'city', region: 'Kingston and St Andrew',
    neighborhoods: {
      informal:      ['Tivoli Gardens', 'Trench Town', 'Denham Town', 'Riverton'],
      working_class: ['Rema', 'Jones Town', 'Allman Town', 'Waterhouse'],
      middle_class:  ['Half Way Tree', 'Mona', 'Barbican', 'Liguanea'],
      elite:         ['Cherry Gardens', 'Norbrook', 'Jacks Hill', 'Beverly Hills'],
    },
  },
  {
    id: 'jm_montegobay', name: 'Montego Bay', country: 'Jamaica',
    type: 'urban', scale: 'town', region: 'St James',
    neighborhoods: {
      informal:      ['Canterbury', 'Flankers', 'Norwood'],
      working_class: ['Granville', 'Salt Spring', 'Glendevon'],
      middle_class:  ['Bogue Heights', 'Coral Gardens'],
      elite:         ['Ironshore', 'Rose Hall', 'The Hip Strip'],
    },
  },
  {
    id: 'jm_rural', name: 'The Cockpit Country', country: 'Jamaica',
    type: 'rural', scale: 'village', region: 'Trelawny',
    neighborhoods: {
      informal:      ['The board house past the bush', 'Down the gully'],
      working_class: ['The district road', 'Near the shop'],
      middle_class:  ['By the church', 'Near the all-age school'],
      elite:         ['The great house', 'The house the foreign money built'],
    },
  },

  // ── TRINIDAD AND TOBAGO ────────────────────────────────────────────────────

  {
    id: 'tt_portofspain', name: 'Port of Spain', country: 'Trinidad and Tobago',
    type: 'urban', scale: 'town', region: 'Port of Spain',
    neighborhoods: {
      informal:      ['Laventille', 'Beetham Gardens', 'Sea Lots', 'John John'],
      working_class: ['Belmont', 'Morvant', 'Success Village', 'Diego Martin'],
      middle_class:  ['Woodbrook', 'St James', 'Cascade', 'Maraval'],
      elite:         ['St Clair', 'Goodwood Park', 'Federation Park', 'Ellerslie Park'],
    },
  },
  {
    id: 'tt_cane', name: 'The Sugar Belt', country: 'Trinidad and Tobago',
    type: 'rural', scale: 'village', region: 'Caroni',
    neighborhoods: {
      informal:      ['The barrack range', 'Past the punt trench'],
      working_class: ['The estate road', 'Near the factory gate'],
      middle_class:  ['By the mandir', 'The village main road'],
      elite:         ['The house on the public road', 'The overseer\'s quarters'],
    },
  },
  {
    id: 'tt_tobago', name: 'Tobago', country: 'Trinidad and Tobago',
    type: 'rural', scale: 'village', region: 'Tobago',
    neighborhoods: {
      informal:      ['The board house up the hill', 'By the beach track'],
      working_class: ['The village road', 'Near the fish depot'],
      middle_class:  ['By the church', 'Scarborough centre'],
      elite:         ['Above the bay', 'Mount Irvine'],
    },
  },

  // ── BARBADOS ───────────────────────────────────────────────────────────────

  {
    id: 'bb_bridgetown', name: 'Bridgetown', country: 'Barbados',
    type: 'urban', scale: 'town', region: 'St Michael',
    neighborhoods: {
      informal:      ['The Pine tenantry', 'Nelson Street', 'The chattel rows'],
      working_class: ['Bank Hall', 'Deacons', 'Black Rock', 'Eagle Hall'],
      middle_class:  ['Belleville', 'Pine Gardens', 'Rockley'],
      elite:         ['Strathclyde', 'Sandy Lane', 'Holetown', 'Hastings'],
    },
  },
  {
    id: 'bb_rural', name: 'The Scotland District', country: 'Barbados',
    type: 'rural', scale: 'village', region: 'St Andrew',
    neighborhoods: {
      informal:      ['The tenantry past the cane', 'Down the gully'],
      working_class: ['The village road', 'Near the shop'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The plantation house', 'Above the cliff'],
    },
  },

  // ── BELIZE ─────────────────────────────────────────────────────────────────

  {
    id: 'bz_belizecity', name: 'Belize City', country: 'Belize',
    type: 'urban', scale: 'town', region: 'Belize District',
    neighborhoods: {
      informal:      ['Southside', 'Port Loyola', 'Lake Independence'],
      working_class: ['Queen Square', 'Mesopotamia', 'Collet'],
      middle_class:  ['Kings Park', 'Buttonwood Bay'],
      elite:         ['Fort George', 'West Landivar', 'The Marine Parade'],
    },
  },
  {
    id: 'bz_rural', name: 'The Toledo District', country: 'Belize',
    type: 'rural', scale: 'village', region: 'Toledo',
    neighborhoods: {
      informal:      ['The thatch house past the milpa', 'By the creek'],
      working_class: ['The village road', 'Near the rice mill'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The alcalde\'s house', 'The house with the zinc roof'],
    },
  },

  // ── PUERTO RICO ────────────────────────────────────────────────────────────

  {
    id: 'pr_sanjuan', name: 'San Juan', country: 'Puerto Rico',
    type: 'urban', scale: 'city', region: 'San Juan',
    neighborhoods: {
      informal:      ['La Perla', 'Barrio Obrero', 'Caño Martín Peña', 'Las Monjas'],
      working_class: ['Santurce', 'Río Piedras', 'Puerta de Tierra', 'Cantera'],
      middle_class:  ['Hato Rey', 'Villa Palmeras', 'El Vedado'],
      elite:         ['Condado', 'Ocean Park', 'Old San Juan', 'Garden Hills'],
    },
  },
  {
    id: 'pr_rural', name: 'The Central Mountains', country: 'Puerto Rico',
    type: 'rural', scale: 'village', region: 'Cordillera Central',
    neighborhoods: {
      informal:      ['El rancho en la loma', 'Pasando la quebrada'],
      working_class: ['La carretera del barrio', 'Cerca del colmado'],
      middle_class:  ['Frente a la plaza', 'Cerca de la escuela'],
      elite:         ['La casa del hacendado', 'Cerca del pueblo'],
    },
  },

  // ── PAPUA NEW GUINEA ───────────────────────────────────────────────────────

  {
    id: 'pg_portmoresby', name: 'Port Moresby', country: 'Papua New Guinea',
    type: 'urban', scale: 'town', region: 'National Capital District',
    neighborhoods: {
      informal:      ['Nine Mile settlement', 'Erima', 'Morata', 'Kaugere'],
      working_class: ['Gerehu', 'Hohola', 'Sabama', 'Koki'],
      middle_class:  ['Boroko', 'Gordons', 'Waigani'],
      elite:         ['Touaguba Hill', 'Ela Beach', 'Korobosea'],
    },
  },
  {
    id: 'pg_highlands', name: 'The Highlands', country: 'Papua New Guinea',
    type: 'rural', scale: 'village', region: 'Western Highlands',
    neighborhoods: {
      informal:      ['The house past the last garden', 'By the ravine'],
      working_class: ['The road through', 'Near the coffee shed'],
      middle_class:  ['By the mission', 'Near the aid post'],
      elite:         ['The big man\'s compound', 'The permanent-material house'],
    },
  },

  // ── VANUATU ────────────────────────────────────────────────────────────────

  {
    id: 'vu_portvila', name: 'Port Vila', country: 'Vanuatu',
    type: 'urban', scale: 'town', region: 'Shefa',
    neighborhoods: {
      informal:      ['Blacksands', 'Ohlen Freswota edges', 'Seaside Tongoa'],
      working_class: ['Anabrou', 'Tagabe', 'Ohlen'],
      middle_class:  ['Nambatu', 'Nambatri'],
      elite:         ['Iririki', 'The Kumul Highway waterfront', 'Bellevue'],
    },
  },
  {
    id: 'vu_island', name: 'An Island in the Outer Group', country: 'Vanuatu',
    type: 'rural', scale: 'village', region: 'Outer Islands',
    neighborhoods: {
      informal:      ['The house past the gardens', 'By the black sand'],
      working_class: ['The village path', 'Near the copra shed'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The chief\'s nakamal', 'The house with the water tank'],
    },
  },

  // ── SAMOA ──────────────────────────────────────────────────────────────────

  {
    id: 'ws_apia', name: 'Apia', country: 'Samoa',
    type: 'urban', scale: 'town', region: 'Tuamasaga',
    neighborhoods: {
      informal:      ['The fale past the seawall', 'Sogi', 'Vaitele squats'],
      working_class: ['Vaitele', 'Faleata', 'Lepea'],
      middle_class:  ['Vailima lower', 'Moataa'],
      elite:         ['Vailima', 'Mulinuu', 'Beach Road'],
    },
  },
  {
    id: 'ws_village', name: 'A Village on Savaii', country: 'Samoa',
    type: 'rural', scale: 'village', region: 'Savaii',
    neighborhoods: {
      informal:      ['The fale inland past the plantation', 'By the lava field'],
      working_class: ['The road through the village', 'Near the plantation'],
      middle_class:  ['By the church', 'The malae'],
      elite:         ['The matai\'s fale', 'The house the New Zealand money built'],
    },
  },

  // ── KIRIBATI ───────────────────────────────────────────────────────────────

  {
    id: 'ki_tarawa', name: 'South Tarawa', country: 'Kiribati',
    type: 'urban', scale: 'town', region: 'Gilbert Islands',
    neighborhoods: {
      informal:      ['Betio squatter rows', 'Temwaiku', 'The causeway edge'],
      working_class: ['Bairiki', 'Bikenibeu', 'Teaoraereke'],
      middle_class:  ['Ambo', 'Nanikai'],
      elite:         ['The government quarters at Bairiki', 'Near the hospital'],
    },
  },
  {
    id: 'ki_outer', name: 'An Outer Island', country: 'Kiribati',
    type: 'rural', scale: 'village', region: 'Outer Islands',
    neighborhoods: {
      informal:      ['The buia past the pandanus', 'By the lagoon edge'],
      working_class: ['The village path', 'Near the copra shed'],
      middle_class:  ['By the maneaba', 'Near the school'],
      elite:         ['The unimwane houses', 'The house with the water tank'],
    },
  },

  // ── TUVALU ─────────────────────────────────────────────────────────────────

  {
    id: 'tv_funafuti', name: 'Funafuti', country: 'Tuvalu',
    type: 'urban', scale: 'village', region: 'Funafuti',
    neighborhoods: {
      informal:      ['The borrow pits', 'The houses on the lagoon side'],
      working_class: ['Vaiaku outer', 'Fakaifou'],
      middle_class:  ['Near the maneapa', 'Along the runway'],
      elite:         ['Vaiaku', 'The government quarters'],
    },
  },
  {
    id: 'tv_outer', name: 'An Outer Atoll', country: 'Tuvalu',
    type: 'rural', scale: 'village', region: 'Outer Islands',
    neighborhoods: {
      informal:      ['The house past the pulaka pits', 'By the ocean side'],
      working_class: ['The village path', 'Near the boat shed'],
      middle_class:  ['By the church', 'The maneapa'],
      elite:         ['The chief\'s house', 'The house with the cistern'],
    },
  },

  // ── MARSHALL ISLANDS ───────────────────────────────────────────────────────

  {
    id: 'mh_majuro', name: 'Majuro', country: 'Marshall Islands',
    type: 'urban', scale: 'village', region: 'Majuro Atoll',
    neighborhoods: {
      informal:      ['Jenrok', 'Rita back lanes', 'The Ebeye-overflow houses'],
      working_class: ['Rita', 'Uliga', 'Long Island'],
      middle_class:  ['Delap', 'Near the college'],
      elite:         ['The Delap government quarter', 'The lagoon-side houses'],
    },
  },
  {
    id: 'mh_outer', name: 'An Outer Atoll', country: 'Marshall Islands',
    type: 'rural', scale: 'village', region: 'Outer Islands',
    neighborhoods: {
      informal:      ['The house past the breadfruit', 'By the ocean side'],
      working_class: ['The village path', 'Near the copra shed'],
      middle_class:  ['By the church', 'Near the school'],
      elite:         ['The iroij\'s house', 'The house with the generator'],
    },
  },

  // ── GUYANA ─────────────────────────────────────────────────────────────────

  {
    id: 'gy_georgetown', name: 'Georgetown', country: 'Guyana',
    type: 'urban', scale: 'city', region: 'Demerara-Mahaica',
    neighborhoods: {
      informal:      ['Albouystown', 'Tiger Bay', 'Sophia', 'Plastic City'],
      working_class: ['Werk-en-Rust', 'Charlestown', 'Agricola', 'East La Penitence'],
      middle_class:  ['Kitty', 'Campbellville', 'Prashad Nagar', 'Alberttown'],
      elite:         ['Queenstown', 'Bel Air Park', 'Subryanville', 'Lamaha Gardens'],
    },
  },
  {
    id: 'gy_berbice', name: 'New Amsterdam and the Berbice Coast', country: 'Guyana',
    type: 'urban', scale: 'town', region: 'East Berbice-Corentyne',
    neighborhoods: {
      informal:      ['The logies at Port Mourant', 'Angoy\'s Avenue', 'Canje backdam'],
      working_class: ['Rose Hall Estate ranges', 'Albion housing scheme', 'Skeldon line'],
      middle_class:  ['Main Street', 'Stanleytown', 'Corriverton'],
      elite:         ['The estate manager\'s compound', 'Fort Ordnance'],
    },
  },
  {
    id: 'gy_linden', name: 'Linden', country: 'Guyana',
    type: 'urban', scale: 'town', region: 'Upper Demerara-Berbice',
    neighborhoods: {
      informal:      ['Block 22', 'Amelia\'s Ward squatting area', 'Silvertown'],
      working_class: ['Wismar', 'Christianburg', 'One Mile'],
      middle_class:  ['Mackenzie', 'Richmond Hill'],
      elite:         ['The Demba senior staff compound', 'Watooka'],
    },
  },
  {
    id: 'gy_essequibo', name: 'The Essequibo Coast', country: 'Guyana',
    type: 'rural', scale: 'village', region: 'Pomeroon-Supenaam',
    neighborhoods: {
      informal:      ['The backdam shacks', 'Squatting area behind the dam'],
      working_class: ['Anna Regina', 'Charity', 'Suddie'],
      middle_class:  ['The rice-mill house', 'Near the market'],
      elite:         ['The miller\'s house on the public road'],
    },
  },
  {
    id: 'gy_rupununi', name: 'The Rupununi', country: 'Guyana',
    type: 'rural', scale: 'village', region: 'Upper Takutu-Upper Essequibo',
    neighborhoods: {
      informal:      ['The benab at the edge of the village', 'The mining camp'],
      working_class: ['Village centre', 'Near the airstrip'],
      middle_class:  ['The mission', 'The schoolteacher\'s house'],
      elite:         ['The ranch house', 'Lethem'],
    },
  },

]

// ── Helper functions ───────────────────────────────────────────────────────────

export function getPlacesForCountry(countryName) {
  return PLACES.filter(p => p.country === countryName)
}

export function pickBirthPlace(country, ruralUrban, wealthTier) {
  const countryPlaces = getPlacesForCountry(country.name)
  if (!countryPlaces.length) return null

  // Pick a place consistent with ruralUrban assignment
  const typePreference =
    ruralUrban === 'rural' ? ['rural', 'small_town', 'urban'] :
    ruralUrban === 'suburban' ? ['small_town', 'suburban', 'urban', 'rural'] :
    ['urban', 'major_city', 'suburban', 'small_town', 'rural']

  for (const preferred of typePreference) {
    const matches = countryPlaces.filter(p => p.type === preferred || p.scale === preferred)
    if (matches.length) return matches[Math.floor(Math.random() * matches.length)]
  }
  return countryPlaces[Math.floor(Math.random() * countryPlaces.length)]
}

export function pickNeighborhoodTier(wealthTier) {
  // wealthTier 0-4: 0-1 → informal, 2 → working_class, 3 → middle_class, 4 → elite
  if (wealthTier <= 1) return Math.random() < 0.7 ? 'informal' : 'working_class'
  if (wealthTier === 2) return Math.random() < 0.6 ? 'working_class' : 'middle_class'
  if (wealthTier === 3) return Math.random() < 0.65 ? 'middle_class' : (Math.random() < 0.5 ? 'working_class' : 'elite')
  return Math.random() < 0.7 ? 'elite' : 'middle_class'
}

// Some neighbourhood names are not only a wealth tier — they name who lives
// there. A Brahmin household in the Dalit tola and a Hindu household in the
// Muslim mohalla are the two residential arrangements an Indian village does
// not produce, and the game was producing both, because the draw read wealth
// and nothing else. The prose then compounded it: the same life was told at
// fourteen that its caste carries a special obligation to scripture, and at
// twenty that the water in Dalit tola runs until mid-morning.
//
// Keyed on the name rather than on a new data field, so a name added later that
// carries the same freight is caught by the same rule.
const NEIGHBOURHOOD_IDENTITY = [
  [/dalit|chamar|harijan/i, (id) => ['dalit', 'dalit_nepal', 'dalit_bangladesh'].includes(id?.ethnicity)],
  [/brahmin/i,              (id) => id?.ethnicity === 'brahmin'],
  [/muslim|mohalla/i,       (id) => String(id?.religion ?? '').startsWith('muslim')],
  [/christian|colony/i,     (id) => String(id?.religion ?? '').startsWith('christian')],
]

/**
 * `identity` is optional — `{ ethnicity, religion }`. Without it the draw is
 * the old one, which is correct for a place whose names carry no such freight.
 */
export function pickNamedNeighborhood(place, tier, identity = null) {
  if (!place) return null
  let list = place.neighborhoods?.[tier]
  if (list?.length && identity) {
    const allowed = list.filter(n => {
      for (const [re, fits] of NEIGHBOURHOOD_IDENTITY) {
        if (re.test(n)) return fits(identity)
      }
      return true
    })
    // If every name in the tier is somebody else's quarter, the tier is simply
    // not where this household lives; fall through to the adjacent-tier search
    // rather than putting them somewhere impossible.
    list = allowed.length ? allowed : null
  }
  if (!list || !list.length) {
    // Fallback to adjacent tier
    const fallbackOrder = ['middle_class', 'working_class', 'elite', 'informal']
    for (const t of fallbackOrder) {
      let fb = place.neighborhoods?.[t]
      if (fb?.length && identity) {
        fb = fb.filter(n => {
          for (const [re, fits] of NEIGHBOURHOOD_IDENTITY) {
            if (re.test(n)) return fits(identity)
          }
          return true
        })
      }
      if (fb?.length) return fb[Math.floor(Math.random() * fb.length)]
    }
    return null
  }
  return list[Math.floor(Math.random() * list.length)]
}

// Returns display string for a place, used in LifeScreen
export function formatPlaceDisplay(place, neighborhoodName) {
  if (!place) return null
  if (neighborhoodName) return `${neighborhoodName}, ${place.name}`
  return place.name
}

// Cost to relocate: based on place type + rough distance heuristic
export function getRelocationCost(fromPlace, toPlace) {
  if (!fromPlace || !toPlace) return 0
  // Same place: low cost (just moving neighborhoods)
  if (fromPlace.id === toPlace.id) return 500
  // Same country, different place
  if (fromPlace.country === toPlace.country) {
    const baseCosts = {
      village: 200, town: 500, mid_city: 1000, major_city: 2000, megacity: 3000,
    }
    return (baseCosts[toPlace.scale] ?? 1500)
  }
  // International: handled by emigrate()
  return 0
}
