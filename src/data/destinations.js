// Costs here are already localised by GDP tier where the trip is booked
// (gdpCostMult in takeTrip, playerActions.js), so they need no scaling field.
// What they needed was time: mass leisure travel is a postwar invention, and a
// character in 1948 was being offered a backpacking trip through Southeast Asia.
// minYear below is when that kind of trip became a thing an ordinary person did.
export const DESTINATIONS = [
  // Domestic (cheap, always available age 16+)
  { id: 'national_park',   name: 'National Park Camping', region: 'domestic', cost: 200,   type: 'adventure', minAge: 16 },
  { id: 'beach_domestic',  name: 'Beach Holiday',         region: 'domestic', cost: 400,   type: 'beach',     minAge: 16 },
  { id: 'city_break',      name: 'City Break',            region: 'domestic', cost: 350,   type: 'city',      minAge: 16 },
  { id: 'road_trip',       name: 'Road Trip',             region: 'domestic', cost: 300,   type: 'adventure', minAge: 18, requiresLicence: true },

  // Regional (moderate, age 18+)
  { id: 'neighbouring_country', name: 'Neighbouring Country', region: 'regional', cost: 900,  type: 'culture',   minAge: 18 },
  { id: 'festival_abroad',      name: 'Festival Abroad',      region: 'regional', cost: 1100, type: 'city',      minAge: 18, minYear: 1970 },
  { id: 'backpacking',          name: 'Backpacking Trip',     region: 'regional', cost: 800,  type: 'adventure', minAge: 18, minYear: 1965 },

  // International (expensive, age 18+)
  { id: 'europe_trip',    name: 'European Tour',         region: 'international', cost: 3000,  type: 'culture',   minAge: 18 },
  { id: 'asia_trip',      name: 'Southeast Asia',        region: 'international', cost: 2500,  type: 'adventure', minAge: 18, minYear: 1972 },
  { id: 'americas_trip',  name: 'Americas Road Trip',    region: 'international', cost: 3500,  type: 'adventure', minAge: 18 },
  { id: 'safari',         name: 'African Safari',        region: 'international', cost: 6000,  type: 'adventure', minAge: 18 },
  { id: 'japan_trip',     name: 'Japan',                 region: 'international', cost: 3200,  type: 'culture',   minAge: 18, minYear: 1964 },

  // Luxury (very expensive, age 21+)
  { id: 'yacht_charter',  name: 'Yacht Charter',         region: 'luxury', cost: 15000, type: 'beach',     minAge: 21, minYear: 1955 },
  { id: 'private_island', name: 'Private Island Resort', region: 'luxury', cost: 25000, type: 'beach',     minAge: 21, minYear: 1960 },
  { id: 'space_tourism',  name: 'Space Tourism',         region: 'luxury', cost: 250000, type: 'adventure', minAge: 21, minYear: 2021 },
]
