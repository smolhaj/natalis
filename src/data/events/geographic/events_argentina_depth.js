// events_argentina_depth.js
// Argentina depth arc — texture not covered in events_latin_america.js.
// events_latin_america.js covers: Dirty War (disappeared colleague, proceso
// complicity), Falklands family angle, Nunca Más, CONADEP testimony,
// nietos identity, 1978 World Cup contradiction, 2001 corralito,
// cacerolazos, pesificación, piqueteros.
// This file: early Peronism 1945-55 (Evita, descamisados), Plaza de Mayo
// civilian bombing 1955, Buenos Aires cultural texture (psychoanalysis,
// tango), AMIA bombing 1994, Malvinas as conscript, 1989 hyperinflation,
// Kirchner human rights trials, exile return arc.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const ARGENTINA_DEPTH_EVENTS = [

  // ── EARLY PERONISM / EVA PERÓN ───────────────────────────────────────────

  {
    id: 'arg_dep_peronism_early',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1945 && G.currentYear <= 1955 &&
      G.age >= 16 &&
      !G.mem?.argDepPeronEarly,
    text: () => pick([
      'October 17, 1945: the descamisados — the shirtless ones — march on Plaza de Mayo to demand Perón\'s release from prison. The working class of Buenos Aires has a face and a voice for the first time that official Argentina can see it. The oligarchy does not call it a face. The oligarchy calls it a horde. You are in the square, or your parents are in the square, and the word descamisado goes from insult to identity in a single afternoon.',
      'Eva Perón, the actress from the provinces who became the president\'s wife and then something the republic had no category for. She ran the welfare ministry, built hospitals, won women the vote in 1947. The descamisados called her Santa Evita and the oligarchy called her other things. When she dies in 1952, at thirty-three, the queue to see her body is a kilometre long for days.',
    ]),
    choices: [
      {
        text: 'Your family is Peronist — the movement is for people like you',
        tag: null,
        outcome: 'The benefits reach you: the wage increases, the social welfare, the sense that the state knows you exist. The oligarchy considers this dangerous. You consider the oligarchy\'s opinion irrelevant.',
        effect: (p) => {
          p.m += 8
          p.s += 3
          p.karma += 4
          p.addFlag('arg_peronist_generation')
          p.setMem('argDepPeronEarly', true)
        },
      },
      {
        text: 'Your family is anti-Peronist — the republic is being replaced by a cult',
        tag: null,
        outcome: 'The republic, the institutions, the separation of powers: these things matter to your family and they are being hollowed out. You watch the descamisados in the square and feel something more complicated than contempt.',
        effect: (p) => {
          p.m -= 4
          p.e += 3
          p.r += 4
          p.addFlag('arg_peronist_generation')
          p.setMem('argDepPeronEarly', true)
        },
      },
    ],
    effect: null,
  },

  // ── PLAZA DE MAYO BOMBING 1955 ────────────────────────────────────────────

  {
    id: 'arg_dep_bombing_1955',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1955 && G.currentYear <= 1957 &&
      G.age >= 18 &&
      !G.mem?.argDepBombing1955,
    text: 'June 16, 1955, the middle of the day, and the navy\'s planes bomb the Plaza de Mayo to kill Perón. They miss him and kill hundreds of office workers and passers-by who happened to be in the square. In September the army joins and the coup succeeds, and Perón goes into exile. What is left is the square, and the dead in it, and a country trying to understand what its own military did to its capital in the afternoon.',
    context: 'The bombing killed 308 people and wounded more than 700.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 6
      p.addFlag('arg_plaza_mayo_bombing')
      p.setMem('argDepBombing1955', true)
    },
  },

  // ── BUENOS AIRES CULTURAL TEXTURE ────────────────────────────────────────

  {
    id: 'arg_dep_ba_texture',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.argDepBATexture,
    text: () => pick([
      'Argentina has more psychoanalysts per capita than any country on earth. The Buenos Aires phone book, at its peak, lists forty thousand. The couch is not luxury here — it is infrastructure. The city has a relationship with interiority, with the examined life, with the speaking of what cannot be spoken in other ways, that is different from the rest of the continent. You begin analysis in your twenties. The analyst\'s consulting room is a room in a Buenos Aires building, and the quality of the silence inside it will follow you.',
      'The tango. Not the tango of the tourist shows and the tango lessons — the social tango, the milonga on a Thursday night in a rented hall in Boedo or San Telmo, the music that begins slowly and everyone knows what it means. The embrace is a conversation. The conversation has a grammar that you learn over years: the walk, the pause, the weight transfer, the chest leading. The milonga is where the city meets itself in the dark and says things it cannot say in the light.',
    ]),
    choices: null,
    effect: (p) => {
      p.e += 4
      p.m += 4
      p.s += 3
      p.addFlag('arg_buenos_aires_culture')
      p.setMem('argDepBATexture', true)
    },
  },

  // ── AMIA BOMBING 1994 ────────────────────────────────────────────────────

  {
    id: 'arg_dep_amia_1994',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1994 && G.currentYear <= 1997 &&
      G.age >= 16 &&
      !G.mem?.argDepAMIA,
    text: 'July 18, 1994, and a bomb destroys the AMIA, the Jewish community centre in Buenos Aires, and eighty-five people die. Argentina\'s Jewish community is the largest in Latin America, the grandchildren of the great migrations. You know someone who was in the building, or someone who knows someone. The investigation becomes thirty years of obstruction, cover-up and political interference. The case is still open.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 6
      p.karma += 3
      p.addFlag('arg_amia_generation')
      p.setMem('argDepAMIA', true)
    },
  },

  // ── MALVINAS CONSCRIPT ────────────────────────────────────────────────────

  {
    id: 'arg_dep_malvinas_conscript',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1982 && G.currentYear <= 1983 &&
      G.character.gender === 'male' &&
      G.age >= 18 && G.age <= 22 &&
      !G.mem?.argDepMalvinasConscript,
    text: 'The Argentine military invades the Malvinas on April 2, 1982. The junta expects Britain to negotiate rather than fight. Britain sends a task force 12,000 kilometres. You are eighteen, nineteen, twenty, doing your compulsory military service, and you are sent south. The equipment is inadequate. The clothing is inadequate — the boots let in water, the cold is not the cold you were dressed for. The officers who plan the battle are the officers of a dictatorship: competent at repression, less competent at conventional warfare against a professional army with naval air cover.',
    choices: [
      {
        text: 'You fight. The islands are Argentine — you grew up believing this.',
        tag: null,
        outcome: 'You fight under officers who receive better rations than you do. The British land at San Carlos on May 21. The Argentine Air Force is brave; the navy stays in port after the Belgrano is sunk. The surrender is June 14. You come home without a welcome.',
        effect: (p) => {
          p.h -= 12
          p.m -= 10
          p.r += 8
          p.karma += 6
          p.addFlag('arg_malvinas_conscript')
          p.setMem('argDepMalvinasConscript', true)
        },
      },
      {
        text: 'You are sent to the mainland reserves — you do not go to the islands',
        tag: null,
        outcome: 'You are not among the 649 Argentines who die. You carry this fact alongside the fact of the men who did go. The two facts are not the same. You are glad you did not go and you do not say this publicly.',
        effect: (p) => {
          p.m -= 5
          p.r += 6
          p.addFlag('arg_malvinas_conscript')
          p.setMem('argDepMalvinasConscript', true)
        },
      },
    ],
    effect: null,
  },

  // ── 1989 HYPERINFLATION ───────────────────────────────────────────────────

  {
    id: 'arg_dep_hyperinflation_1989',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.age >= 18 &&
      !G.mem?.argDepHyper89,
    text: '1989, and inflation passes three thousand percent, and the price of bread changes between choosing it and paying for it. The Argentine middle class, which thinks of itself as European and of poverty as someone else\'s condition, discovers that savings can be undone. Alfonsín leaves office six months early and Menem arrives. In 1991 the peso is tied to the dollar, which ends the inflation and builds 2001.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.w -= 6
      p.r += 5
      p.addFlag('arg_hyperinflation_1989')
      p.setMem('argDepHyper89', true)
    },
  },

  // ── KIRCHNER HUMAN RIGHTS TRIALS ─────────────────────────────────────────

  {
    id: 'arg_dep_kirchner_trials',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      G.age >= 25 &&
      !G.mem?.argDepKirchnerTrials,
    text: 'Kirchner annuls the amnesty laws in 2003. The Ley de Obediencia Debida and the Punto Final, which had protected the junta officers since the late 1980s, are voided. The trials begin. Former navy officers who ran the ESMA — the Navy Mechanics School where 5,000 people were detained and disappeared — go to prison. The Mothers of Plaza de Mayo, who have been walking in circles every Thursday since 1977, watch the officers they have been naming for thirty years finally convicted. The sentence of 25 years in prison cannot undo what was done. It is the closest thing the law has to acknowledgement.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 8
      p.r += 4
      p.addFlag('arg_kirchner_trials_generation')
      p.setMem('argDepKirchnerTrials', true)
    },
  },

  // ── EXILE RETURN ──────────────────────────────────────────────────────────

  {
    id: 'arg_dep_exile_return',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 2004 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      G.flags.has('emigrated') &&
      !G.mem?.argDepExileReturn,
    text: 'The country you left in 2001 — or 1976, or 1989 — is not the country you return to. The neighbourhood has the same street signs. The café on the corner is still the café on the corner. The people you come back to are older. The city has a layer over it now: the layer of all the years it continued without you. You walk the streets and recognise them and the recognising feels like loss. You expected the recognising to feel like return.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 7
      p.addFlag('arg_returned_exile')
      p.setMem('argDepExileReturn', true)
    },
  },

]
