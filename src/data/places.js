// Geographic place data for all 77 countries.
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
      informal:      ['Ngõ hẻm (back alleys) of Long Biên', 'Gia Lâm edge'],
      working_class: ['Hoàng Mai', 'Long Biên', 'Hai Bà Trưng outer', 'Đống Đa'],
      middle_class:  ['Cầu Giấy', 'Nam Từ Liêm', 'Hai Bà Trưng', 'Ba Đình'],
      elite:         ['Tây Hồ lakefront', 'Hoàn Kiếm', 'Ba Đình diplomatic quarter'],
    },
  },
  {
    id: 'vn_rural', name: 'Rural Mekong Delta', country: 'Vietnam',
    type: 'rural', scale: 'village', region: 'South Vietnam',
    neighborhoods: {
      informal:      ['Nhà ổ chuột ven sông', 'Xóm nghèo'],
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

export function pickNamedNeighborhood(place, tier) {
  if (!place) return null
  const list = place.neighborhoods?.[tier]
  if (!list || !list.length) {
    // Fallback to adjacent tier
    const fallbackOrder = ['middle_class', 'working_class', 'elite', 'informal']
    for (const t of fallbackOrder) {
      const fb = place.neighborhoods?.[t]
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
