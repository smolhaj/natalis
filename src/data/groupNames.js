// Whose names a family carries, below the level of a country.
//
// Every country has one name pool, and most countries are not one people. The
// Eritrean pool is Tigrinya and Christian, so every Muslim Eritrean — half the
// country — was a Tesfaye or a Ghirmay Woldai; an Afar in Djibouti drew from
// the Somali pool, a Belizean Creole could be born a Pech, which is a Maya
// family name. `GROUP_NAMES` is keyed by ethnic id and wins; `RELIGION_NAMES`
// is keyed `Country:faith` (the part of the religion id before the first
// underscore) for countries whose pool belongs to one faith and whose people
// do not. Anything absent falls through to the country pool, which is right
// for most of the roster.
//
// A pool may omit `surnames` where the group names a child after the father
// and has no family name: the second given name reads correctly there, and the
// country pool is the wrong fallback for it, so such pools carry a `surnames`
// list of fathers' given names instead.
//
// Where a group's names are simply another roster country's names — a Russian
// in Riga, a Bosnian Serb, an Ethiopian Somali — the pool is borrowed from that
// country rather than copied, so the two cannot drift apart.
//
// Known limit: Slavic feminine surname forms (Ivanova) are applied by
// `surnameFor` according to the COUNTRY the character is born in, so a Russian
// woman born in Kazakhstan, Latvia or Estonia keeps the masculine form. That is
// an engine rule, not something a pool here can express.

import { COUNTRIES } from './countries.js'

function borrow(countryName, fields = ['male', 'female', 'surnames']) {
  const c = COUNTRIES.find(x => x.name === countryName)
  if (!c) return {}
  const out = {}
  if (fields.includes('male')) out.male = c.namePool?.male
  if (fields.includes('female')) out.female = c.namePool?.female
  if (fields.includes('surnames')) { out.surnames = c.surnames; out.surnameGrammar = countryName }
  return out
}

// ─── Shared pools (used by more than one key) ────────────────────────────────

// Hausa (northern Nigeria). The Nigeria pool is Yoruba and Igbo throughout and
// held one Hausa name in each list, for the country's largest group.
const HAUSA_NIGERIA = {
  male: ['Muhammadu', 'Abubakar', 'Usman', 'Aliyu', 'Ibrahim', 'Sani', 'Musa', 'Yusuf', 'Bello', 'Umaru', 'Lawal', 'Garba', 'Haruna', 'Shehu', 'Nasiru', 'Kabiru', 'Bashir', 'Aminu', 'Suleiman', 'Isa', 'Yakubu', 'Tijjani', 'Auwalu', 'Salisu', 'Hamisu'],
  female: ['Aisha', 'Fatima', 'Hadiza', 'Hauwa', 'Zainab', 'Amina', 'Halima', 'Maryam', 'Hafsat', 'Rabi', 'Binta', 'Asma\'u', 'Khadija', 'Bilkisu', 'Hajara', 'Ladi', 'Jummai', 'Talatu', 'Zulaihat', 'Sa\'adatu', 'Rukayya'],
  surnames: ['Bello', 'Abubakar', 'Musa', 'Yusuf', 'Aliyu', 'Ibrahim', 'Sani', 'Umar', 'Lawal', 'Garba', 'Dantata', 'Danjuma', 'Shagari', 'Balewa', 'Yar\'Adua', 'Abdullahi', 'Mohammed', 'Adamu', 'Suleiman', 'Idris', 'Usman', 'Haruna', 'Bashir', 'Shehu'],
}

// Afar (Djibouti and Eritrea). Afar name a child after the father, as Somalis
// do, but the fathers' names are Afar ones: Houmed, Hamadou, Dini, Dileita.
const AFAR = {
  male: ['Ali', 'Mohamed', 'Ahmed', 'Hassan', 'Houmed', 'Hamadou', 'Ibrahim', 'Ismaël', 'Abdallah', 'Aboubaker', 'Kamil', 'Dini', 'Daoud', 'Osman', 'Youssouf', 'Mahamoud', 'Dileita', 'Barkat', 'Aref', 'Kassim'],
  female: ['Fatouma', 'Aïcha', 'Hawa', 'Mariam', 'Khadija', 'Amina', 'Zeinab', 'Asia', 'Halima', 'Hasna', 'Safia', 'Zahra', 'Mouna', 'Asma', 'Saïda', 'Rahma'],
  surnames: ['Houmed', 'Hamadou', 'Dini', 'Dileita', 'Kamil', 'Bourhan', 'Aref', 'Gourad', 'Hanfare', 'Mirah', 'Awol', 'Kassim', 'Abdallah', 'Aboubaker', 'Daoud', 'Mahamoud', 'Ali', 'Mohamed', 'Ahmed', 'Ibrahim'],
}

// Tuareg (Niger, Mali, Burkina Faso). The Malian pool is Bambara (Coulibaly,
// Diarra, Keïta) and the Nigerien one Hausa and Zarma. Fathers' names without
// the `ag` particle, so the list reads for a daughter too.
const TUAREG = {
  male: ['Mohamed', 'Rhissa', 'Aghali', 'Mano', 'Alghabass', 'Intalla', 'Attaher', 'Iyad', 'Ibrahim', 'Alhassane', 'Moussa', 'Bilal', 'Ahmed', 'Almoustapha', 'Alhousseini', 'Issouf', 'Elhadj', 'Ousmane'],
  female: ['Fadimata', 'Lalla', 'Aminatou', 'Mariama', 'Khadijatou', 'Zeinabou', 'Aïchatou', 'Safiatou', 'Hawa', 'Fatimata', 'Hadjara', 'Leila', 'Salamatou', 'Mariam', 'Aminata'],
  surnames: ['Boula', 'Dayak', 'Alambo', 'Attaher', 'Intalla', 'Ghali', 'Rhissa', 'Anacko', 'Alghabass', 'Mohamed', 'Ibrahim', 'Alhassane', 'Almoustapha', 'Alhousseini', 'Moussa', 'Bilal'],
}

// Kurdish, Kurmanji (Syria and the Kurdish given names of Turkey). The Syrian
// pool's surnames are Arab (Al-Khatib, Al-Souri); in Turkey the surname law
// gave Kurds Turkish surnames, so there only the given names differ.
const KURMANJI_GIVEN = {
  male: ['Azad', 'Baran', 'Berzan', 'Dilovan', 'Diyar', 'Welat', 'Rojhat', 'Mazlum', 'Kawa', 'Rizgar', 'Zana', 'Serhat', 'Salih', 'Mahmud', 'Ahmed', 'Mehmet', 'Abdullah', 'Hasan', 'Mustafa', 'Ramazan'],
  female: ['Rojin', 'Berfin', 'Zilan', 'Viyan', 'Berivan', 'Ronahi', 'Jiyan', 'Hevî', 'Gulistan', 'Nesrin', 'Dilan', 'Avin', 'Rojda', 'Zozan', 'Delal', 'Leyla', 'Fatma', 'Hatice', 'Emine'],
}

// Tamil, for the diasporas of Malaysia and Singapore (the Indian share of both
// is overwhelmingly Tamil, and the India pool is Hindi-speaking). The surname
// is the father's name, as "a/l" records it.
const TAMIL_STRAITS = {
  male: ['Rajan', 'Kumar', 'Suresh', 'Muthu', 'Selvam', 'Ganesan', 'Murugan', 'Ravi', 'Saravanan', 'Karthik', 'Arumugam', 'Sivakumar', 'Rajendran', 'Prakash', 'Vijay', 'Kannan', 'Balakrishnan', 'Siva', 'Mani', 'Thiagarajan'],
  female: ['Priya', 'Kavitha', 'Anitha', 'Shanthi', 'Radha', 'Lakshmi', 'Meena', 'Devi', 'Malathi', 'Revathi', 'Vasanthi', 'Saraswathy', 'Parvathy', 'Kalaivani', 'Selvi', 'Uma', 'Geetha', 'Kamala', 'Thilagavathy'],
  surnames: ['Krishnan', 'Subramaniam', 'Ramasamy', 'Muniandy', 'Arumugam', 'Pillai', 'Rajah', 'Gopal', 'Ramakrishnan', 'Murugesan', 'Velu', 'Suppiah', 'Sinnathamby', 'Maniam', 'Ganapathy', 'Govindasamy', 'Kandasamy', 'Letchumanan', 'Nadarajah', 'Perumal'],
}

// Malay (Malaysia, Singapore). The surname is the father's name, as bin/binti
// records it.
const MALAY = {
  male: ['Ahmad', 'Muhammad', 'Abdullah', 'Aziz', 'Hassan', 'Ismail', 'Ibrahim', 'Faizal', 'Haziq', 'Hakim', 'Amir', 'Farhan', 'Hafiz', 'Firdaus', 'Syafiq', 'Razak', 'Anwar', 'Kamal', 'Zulkifli', 'Rosli', 'Hamzah', 'Shahrul', 'Azman', 'Rizal', 'Osman'],
  female: ['Siti', 'Nur', 'Rohani', 'Zainab', 'Fatimah', 'Aisyah', 'Noraini', 'Nurul', 'Syahira', 'Farhana', 'Hasnah', 'Marlina', 'Suriati', 'Norashikin', 'Aminah', 'Salmah', 'Rosnah', 'Zaleha', 'Normah', 'Faridah', 'Azizah'],
  surnames: ['Ahmad', 'Hassan', 'Ibrahim', 'Abdullah', 'Zulkifli', 'Harun', 'Othman', 'Yusof', 'Bakar', 'Ismail', 'Razak', 'Hamid', 'Ali', 'Mohamed', 'Salleh', 'Hussein', 'Jaafar', 'Mustafa', 'Kassim', 'Idris', 'Sulaiman', 'Yaakob'],
}

// Uyghur (China, Kazakhstan). No family name; the second name is the father's.
const UYGHUR = {
  male: ['Abdurehim', 'Memet', 'Tursun', 'Ablimit', 'Ilham', 'Nurmemet', 'Abliz', 'Rozi', 'Ahmetjan', 'Alim', 'Erkin', 'Perhat', 'Ekber', 'Qurban', 'Tahir', 'Yasin', 'Abdukerim', 'Mutellip', 'Obulqasim', 'Adil'],
  female: ['Gulnar', 'Gulbahar', 'Aynur', 'Mihray', 'Rabiye', 'Patigul', 'Mahire', 'Nurgul', 'Zulpiye', 'Rahile', 'Gulshen', 'Gulnisa', 'Aygul', 'Arzigul', 'Meryem', 'Sanubar', 'Zohre', 'Ayshem'],
  surnames: ['Tohti', 'Memet', 'Tursun', 'Qadir', 'Dawut', 'Ablimit', 'Rozi', 'Niyaz', 'Hoshur', 'Yasin', 'Tahir', 'Kerim', 'Ismail', 'Osman', 'Hasan', 'Ekber', 'Qurban', 'Abdurehim'],
}

// Tibetan (China, and the refugee community in Bhutan). No family name.
const TIBETAN = {
  male: ['Tenzin', 'Tashi', 'Lobsang', 'Dorje', 'Sonam', 'Pema', 'Karma', 'Ngawang', 'Jampa', 'Thubten', 'Gyaltsen', 'Namgyal', 'Phuntsok', 'Tsering', 'Nyima', 'Dawa', 'Norbu', 'Kalsang', 'Choephel', 'Rinchen'],
  female: ['Dolma', 'Dechen', 'Pema', 'Tsering', 'Yangchen', 'Lhamo', 'Kalsang', 'Sonam', 'Choekyi', 'Wangmo', 'Dickyi', 'Yeshe', 'Lhakpa', 'Kunsang', 'Palmo', 'Namdol', 'Tsomo'],
  surnames: ['Dorje', 'Tashi', 'Tsering', 'Gyatso', 'Namgyal', 'Wangdu', 'Dhondup', 'Phuntsok', 'Gyaltsen', 'Norbu', 'Lhundup', 'Rinchen', 'Tenzin', 'Thinley', 'Samdup', 'Topgyal', 'Choephel'],
}

// Hindu Indo-Caribbean (Guyana, Trinidad): indenture-era names from Bihar and
// eastern Uttar Pradesh, as the colonial registers spelled them.
const INDO_CARIBBEAN_HINDU_FEMALE = ['Indrani', 'Savitri', 'Radhika', 'Devika', 'Kamla', 'Latchmin', 'Nalini', 'Sunita', 'Dhanmattie', 'Parbatie', 'Rookmin', 'Sumintra', 'Kowsilla', 'Premwattie', 'Chandrawattie', 'Leelawattie', 'Drupatie', 'Sabitri', 'Asha', 'Gayatri']

// ─── By ethnic group ──────────────────────────────────────────────────────────

export const GROUP_NAMES = {
  // ── Africa ──

  // Belize: the country pool mixes Mestizo, Maya (Pech, Tzul, Choc),
  // Garifuna and Mennonite (Friesen, Dyck) names for everyone. Creole
  // families carry English names.
  creole_belizean: {
    male: ['Wilfred', 'Osmond', 'Elroy', 'Anthony', 'Delroy', 'Kelvin', 'Melvin', 'Selwyn', 'Wilbert', 'Marcus', 'Dean', 'Philip', 'Herman', 'Rupert', 'Cecil', 'Leroy', 'Glenford', 'Errol', 'Keith', 'Winston', 'Ashley'],
    female: ['Yvette', 'Gwendolyn', 'Judith', 'Nellie', 'Vernie', 'Wilma', 'Doris', 'Cecilia', 'Merlene', 'Beverly', 'Carolyn', 'Sheila', 'Marilyn', 'Elaine', 'Hyacinth', 'Pearl', 'Kimberly', 'Lois', 'Dorla'],
    surnames: ['Flowers', 'Usher', 'Young', 'Gentle', 'Vernon', 'Tillett', 'Longsworth', 'Neal', 'Coleman', 'Barrow', 'Goldson', 'Lindo', 'Courtenay', 'Hyde', 'Staine', 'Gillett', 'Bennett', 'Garbutt', 'Belisle', 'Fuller', 'Faber', 'Gabourel', 'Hulse', 'Grant'],
  },

  // Djibouti / Eritrea: see AFAR above.
  afar_djibouti: AFAR,
  afar_eritrean: AFAR,

  // Niger / Mali / Burkina Faso: see TUAREG above.
  tuareg_niger: TUAREG,
  tuareg_mali: TUAREG,
  tuareg_burkina: TUAREG,

  // Niger: the pool mixes Zarma (Diori, Kountché) and Hausa (Issoufou,
  // Laouali, Chaibou) surnames across both peoples.
  zarma_songhai: {
    male: ['Boubacar', 'Hamani', 'Seyni', 'Djibo', 'Moumouni', 'Soumana', 'Hama', 'Amadou', 'Issaka', 'Abdou', 'Hassane', 'Oumarou', 'Harouna', 'Idrissa', 'Mahamadou', 'Mounkaila', 'Saidou', 'Yacouba', 'Alfari'],
    female: ['Mariama', 'Aissata', 'Fati', 'Zeinabou', 'Ramatou', 'Salamatou', 'Hawa', 'Adama', 'Mariatou', 'Kadidiatou', 'Aminatou', 'Hamsatou', 'Safiatou', 'Aïchatou', 'Fatouma', 'Nana'],
    surnames: ['Diori', 'Kountché', 'Maïga', 'Djibo', 'Hama', 'Boubacar', 'Hamani', 'Mounkaila', 'Soumana', 'Moumouni', 'Seyni', 'Saidou', 'Hassane', 'Issaka', 'Harouna', 'Alfari', 'Touré', 'Cissé'],
  },
  hausa_niger: {
    male: ['Mahamadou', 'Issoufou', 'Laouali', 'Chaibou', 'Rabiou', 'Maman', 'Sani', 'Garba', 'Zakari', 'Abdou', 'Idi', 'Moussa', 'Souley', 'Ibrahim', 'Salifou', 'Tahirou', 'Harouna', 'Illiassou', 'Mahamane', 'Adamou'],
    female: ['Hadiza', 'Rabi', 'Rakia', 'Rabiatou', 'Balkissa', 'Habsou', 'Rahamou', 'Halima', 'Aichatou', 'Amina', 'Fati', 'Salamatou', 'Mariama', 'Safia', 'Ramatou', 'Chamsiya', 'Fatchima', 'Roukaya', 'Nana'],
    surnames: ['Issoufou', 'Laouali', 'Chaibou', 'Rabiou', 'Maman', 'Sani', 'Garba', 'Zakari', 'Idi', 'Souley', 'Salifou', 'Tahirou', 'Illiassou', 'Mahamane', 'Adamou', 'Ibrahim', 'Moussa', 'Abdou', 'Kalla', 'Oumarou'],
  },

  // Nigeria: one pool of Yoruba and Igbo names, freely mixed (a Chukwuemeka
  // Adeyemi), and almost nothing for the Hausa-Fulani, Kanuri or Ijaw.
  hausa_fulani: HAUSA_NIGERIA,
  yoruba: {
    male: ['Adebayo', 'Oluwaseun', 'Kunle', 'Tunde', 'Babatunde', 'Adewale', 'Akintunde', 'Biodun', 'Dare', 'Jide', 'Kehinde', 'Taiwo', 'Niyi', 'Rotimi', 'Femi', 'Segun', 'Wale', 'Gbenga', 'Olumide', 'Ayodele', 'Kazeem', 'Rasheed', 'Lateef', 'Ganiyu', 'Tajudeen', 'Azeez', 'Fatai'],
    female: ['Olawunmi', 'Abimbola', 'Kemi', 'Yetunde', 'Adunola', 'Bimpe', 'Damilola', 'Folake', 'Funmilayo', 'Gbemi', 'Omolara', 'Peju', 'Ronke', 'Sola', 'Toyin', 'Titilayo', 'Bukola', 'Modupe', 'Morenike', 'Kafayat', 'Sekinat', 'Rukayat', 'Kudirat', 'Aminat'],
    surnames: ['Adeyemi', 'Adewale', 'Balogun', 'Abiodun', 'Adeleke', 'Afolabi', 'Agboola', 'Ajala', 'Akande', 'Akintola', 'Alabi', 'Alade', 'Alao', 'Badmus', 'Bamidele', 'Dada', 'Ekundayo', 'Fashola', 'Ogunleye', 'Ojo', 'Oladipo', 'Ogundipe', 'Adeniyi', 'Lawal', 'Salami', 'Oseni', 'Bakare', 'Oyewole', 'Awolowo', 'Soyinka'],
  },
  igbo: {
    male: ['Chukwuemeka', 'Emeka', 'Nnamdi', 'Chidi', 'Ifeanyi', 'Chukwudi', 'Ekene', 'Ikenna', 'Obinna', 'Uchenna', 'Chinedu', 'Okechukwu', 'Nnaemeka', 'Kelechi', 'Chibuzo', 'Onyekachi', 'Ebuka', 'Chijioke', 'Tochukwu', 'Emmanuel', 'Godwin', 'Sunday'],
    female: ['Adaeze', 'Ngozi', 'Chisom', 'Amara', 'Ifeoma', 'Chidinma', 'Ebele', 'Nneka', 'Chioma', 'Nkechi', 'Chiamaka', 'Ogechi', 'Obiageli', 'Adaora', 'Uju', 'Nkiru', 'Chinyere', 'Ifeyinwa', 'Adanna', 'Isioma'],
    surnames: ['Okafor', 'Okonkwo', 'Nwosu', 'Eze', 'Nwachukwu', 'Ihejirika', 'Nwankwo', 'Obiora', 'Okeke', 'Obi', 'Nwoye', 'Onyekwere', 'Chukwu', 'Okoro', 'Nnadi', 'Ugwu', 'Okoye', 'Anyanwu', 'Azikiwe', 'Ojukwu', 'Achebe', 'Nwafor', 'Agu', 'Okpara', 'Ekwueme', 'Umeh'],
  },
  // Ijaw: Niger Delta, overwhelmingly Christian; English virtue names beside
  // Ijaw and Kalabari ones.
  ijaw: {
    male: ['Goodluck', 'Timipre', 'Diepreye', 'Seriake', 'Douye', 'Tonye', 'Boma', 'Ebikabowei', 'Preye', 'Tamunotonye', 'Dumo', 'Soye', 'Godspower', 'Isaac', 'Ebiye', 'Joshua', 'Emmanuel', 'Sunday'],
    female: ['Patience', 'Ibinabo', 'Ebiere', 'Tamara', 'Ibiba', 'Blessing', 'Comfort', 'Gift', 'Mercy', 'Faith', 'Grace', 'Joy', 'Favour', 'Peace', 'Esther', 'Victoria', 'Deborah'],
    surnames: ['Alagoa', 'Alamieyeseigha', 'Amachree', 'Boro', 'Briggs', 'Clark', 'Dagogo', 'Dickson', 'Diri', 'Dokubo', 'Ekiye', 'Horsfall', 'Jonathan', 'Okah', 'Sylva', 'Princewill', 'Pondei'],
  },
  kanuri: {
    male: ['Muhammadu', 'Kashim', 'Babagana', 'Modu', 'Kyari', 'Ali', 'Bukar', 'Goni', 'Mustapha', 'Umara', 'Lawan', 'Abba', 'Kolo', 'Mala', 'Maina', 'Ibrahim', 'Umar', 'Mohammed'],
    female: ['Falmata', 'Yagana', 'Kaltum', 'Hadiza', 'Aisha', 'Amina', 'Fatima', 'Hauwa', 'Zainab', 'Hafsat', 'Maryam', 'Halima', 'Zara', 'Bintu', 'Khadija'],
    surnames: ['Shettima', 'Zulum', 'Kyari', 'Bukar', 'Modu', 'Goni', 'Lawan', 'Maina', 'Mustapha', 'Kolo', 'Mala', 'Monguno', 'Ndume', 'Sheriff', 'Abba', 'Fannami', 'Umara'],
  },

  // Algeria: the pool is Arabic throughout. Kabyle given names and family
  // names are their own (Mohand, Tassadit, Aït Ahmed, Matoub).
  berber_kabyle: {
    male: ['Mohand', 'Arezki', 'Amar', 'Saïd', 'Lounès', 'Idir', 'Akli', 'Mouloud', 'Hocine', 'Belaïd', 'Slimane', 'Ferhat', 'Rabah', 'Smaïl', 'Ahcène', 'Madjid', 'Kamel', 'Massinissa', 'Aksel', 'Yuba', 'Mazigh'],
    female: ['Tassadit', 'Ouardia', 'Taos', 'Dihya', 'Tinhinane', 'Nouara', 'Djedjiga', 'Tiziri', 'Tanina', 'Kahina', 'Ourida', 'Zahia', 'Malika', 'Fatma', 'Dahbia', 'Lila'],
    surnames: ['Aït Ahmed', 'Aït Menguellet', 'Aït Hamouda', 'Matoub', 'Mammeri', 'Feraoun', 'Amrouche', 'Abane', 'Krim', 'Ouamrane', 'Sadi', 'Ouyahia', 'Zidane', 'Iguerbouchene', 'Kaci', 'Meziane', 'Chabane', 'Haddadi'],
  },

  // Ethiopia: one pool across Amhara, Oromo and Tigrinya names. The Oromo are
  // the largest people and about half Muslim.
  oromo: {
    male: ['Gemechu', 'Tolosa', 'Gutu', 'Obsa', 'Boru', 'Megersa', 'Lelisa', 'Lencho', 'Chala', 'Feyisa', 'Kenenisa', 'Merga', 'Bekele', 'Lemma', 'Kedir', 'Jemal', 'Abdi', 'Aliyi', 'Mohammed', 'Guta'],
    female: ['Chaltu', 'Lensa', 'Ayantu', 'Bontu', 'Hawi', 'Derartu', 'Gete', 'Tirunesh', 'Worknesh', 'Workitu', 'Fatuma', 'Zeyneba', 'Kedija', 'Amina', 'Obse'],
    surnames: ['Gemechu', 'Tolosa', 'Gutu', 'Megersa', 'Lemma', 'Bekele', 'Dibaba', 'Tulu', 'Lilesa', 'Merga', 'Dinka', 'Wakjira', 'Gudina', 'Kedir', 'Jemal', 'Abdi', 'Negasa', 'Boru', 'Dadi', 'Fufa'],
  },
  amhara: {
    male: ['Tesfaye', 'Tadesse', 'Girma', 'Haile', 'Mulugeta', 'Solomon', 'Abebe', 'Alemu', 'Ayele', 'Getachew', 'Kassahun', 'Mesfin', 'Tewodros', 'Yohannes', 'Mengistu', 'Belay', 'Assefa', 'Dawit', 'Yonas', 'Henok', 'Biruk', 'Fasil', 'Tilahun', 'Tamrat', 'Birhanu'],
    female: ['Almaz', 'Tigist', 'Hirut', 'Aster', 'Etenesh', 'Tsehay', 'Azeb', 'Selamawit', 'Meseret', 'Hiwot', 'Bethlehem', 'Mekdes', 'Tsion', 'Rahel', 'Kidist', 'Yeshi', 'Tsige', 'Mahlet', 'Saba', 'Genet'],
    surnames: ['Tesfaye', 'Tadesse', 'Haile', 'Girma', 'Alemu', 'Mengistu', 'Assefa', 'Getachew', 'Mesfin', 'Ayalew', 'Demeke', 'Desta', 'Kassa', 'Belay', 'Wolde', 'Tilahun', 'Mulatu', 'Mamo', 'Abebe', 'Birhanu', 'Tefera', 'Kebede', 'Mekonnen'],
  },
  // Tigrinya in Ethiopia are named as Tigrinya in Eritrea are.
  tigrinya_eth: borrow('Eritrea'),
  // Ethiopian Somalis carry Somali names.
  somali_eth: borrow('Somalia'),

  // Sierra Leone: the pool mixes Temne, Mende, Krio and Mandingo surnames.
  // Mende given names are largely shared; the family names are not.
  mende: {
    surnames: ['Kallon', 'Kai-Kai', 'Margai', 'Bio', 'Lahai', 'Vandi', 'Jusu', 'Bockarie', 'Kanneh', 'Kpaka', 'Mattia', 'Gbondo', 'Norman', 'Sama', 'Lansana', 'Momoh', 'Swaray'],
  },

  // Guinea: one surname pool across Fula (Diallo, Bah), Malinké (Condé,
  // Kourouma) and Susu (Soumah, Bangoura); the three are not interchangeable.
  // Given names are largely shared across the country's Muslim majority.
  // The Fula of the Fouta Djallon carry a handful of lineage names; this list
  // is short because the reality is.
  fula_guinean: {
    surnames: ['Diallo', 'Bah', 'Barry', 'Sow', 'Baldé', 'Sy', 'Ly', 'Kane', 'Tall', 'Sall', 'Dia', 'Wann'],
  },
  mandinka_guinean: {
    surnames: ['Condé', 'Kourouma', 'Camara', 'Keïta', 'Kouyaté', 'Traoré', 'Konaté', 'Doumbouya', 'Kaba', 'Cissé', 'Diakité', 'Touré', 'Fofana', 'Kanté', 'Diabaté', 'Magassouba', 'Dansoko', 'Nabé', 'Oularé'],
  },
  susu_guinean: {
    surnames: ['Soumah', 'Bangoura', 'Sylla', 'Camara', 'Youla', 'Conté', 'Fofana', 'Yansané', 'Sankhon', 'Touré', 'Kaba', 'Cissé', 'Keïta', 'Bah', 'Sampil', 'Diané'],
  },

  // Côte d'Ivoire: the pool is Baoulé and Dioula. Burkinabè and Malian
  // migrants carry Mossi (Ouédraogo, Sawadogo) and Bambara (Diarra, Sanogo)
  // names, almost all Muslim.
  migrant_west_africa: {
    male: ['Boureima', 'Lassané', 'Rasmané', 'Salif', 'Issouf', 'Moumouni', 'Seydou', 'Adama', 'Ousmane', 'Souleymane', 'Hamidou', 'Boukary', 'Inoussa', 'Moussa', 'Bakary', 'Drissa', 'Mamadou', 'Siaka', 'Lassina', 'Yacouba', 'Daouda', 'Fousseyni', 'Brahima'],
    female: ['Alizeta', 'Mamounata', 'Salimata', 'Awa', 'Assétou', 'Rasmata', 'Zénabo', 'Bintou', 'Djeneba', 'Kadidiatou', 'Mariam', 'Aminata', 'Fatoumata', 'Korotimi', 'Rokia', 'Assitan', 'Oumou'],
    surnames: ['Ouédraogo', 'Sawadogo', 'Kaboré', 'Compaoré', 'Zongo', 'Tapsoba', 'Nikiéma', 'Traoré', 'Coulibaly', 'Diarra', 'Konaté', 'Sanogo', 'Keïta', 'Dembélé', 'Sidibé', 'Doumbia', 'Kouyaté', 'Belem'],
  },

  // Angola: the pool mixes Kikongo surnames (Mbala, Luvualu, Kiala, Muanda)
  // in for everyone. Mbundu families around Luanda carry Luso-creole names.
  ambundu: {
    surnames: ['Van-Dúnem', 'Neto', 'Dos Santos', 'Vieira Dias', 'Mingas', 'Kassoma', 'Pitra', 'Lopes', 'Dias', 'Miranda', 'Ribeiro', 'Domingos', 'Francisco', 'Manuel', 'Sebastião', 'Gaspar', 'Bento'],
  },

  // Kenya: English given names are right across the country, but the surname
  // pool mixes Kikuyu, Luo, Kalenjin and Kamba names (a Luo named Kamau).
  kikuyu: {
    surnames: ['Kamau', 'Njoroge', 'Waweru', 'Mwangi', 'Ndung\'u', 'Gitau', 'Karanja', 'Kimani', 'Macharia', 'Mbugua', 'Mugo', 'Njogu', 'Kenyatta', 'Kibaki', 'Muriuki', 'Githinji', 'Kariuki', 'Kinyanjui', 'Maina', 'Njenga', 'Wambugu', 'Kiarie', 'Ngugi', 'Waithaka', 'Mathenge'],
  },
  luo: {
    surnames: ['Otieno', 'Odhiambo', 'Ochieng', 'Ogolla', 'Onyango', 'Owino', 'Omondi', 'Okoth', 'Ouma', 'Oduor', 'Odinga', 'Oloo', 'Ogutu', 'Obonyo', 'Opiyo', 'Oketch', 'Ojwang', 'Odero'],
  },
  kalenjin: {
    surnames: ['Kipchoge', 'Cheruiyot', 'Kibet', 'Koech', 'Kiprono', 'Rotich', 'Kirui', 'Langat', 'Ruto', 'Moi', 'Kosgei', 'Kiptoo', 'Chepkwony', 'Kiprotich', 'Kemboi', 'Keter', 'Tanui', 'Biwott', 'Sang', 'Bett'],
  },
  kamba: {
    surnames: ['Mutua', 'Makau', 'Mutiso', 'Nzomo', 'Musyoka', 'Kilonzo', 'Mwendwa', 'Muthama', 'Kioko', 'Mulwa', 'Musyimi', 'Nzioka', 'Kyalo', 'Mbithi', 'Mutinda', 'Wambua', 'Munyao', 'Ndambuki'],
  },
  luhya: {
    surnames: ['Wafula', 'Wanjala', 'Barasa', 'Wekesa', 'Simiyu', 'Wamalwa', 'Wetangula', 'Mudavadi', 'Shikuku', 'Khaemba', 'Namwamba', 'Masinde', 'Makokha', 'Nyongesa', 'Were', 'Wasike', 'Mukhwana', 'Shitanda'],
  },

  // ── Middle East, Caucasus, Central Asia ──

  // Lebanon: Armenian Lebanese are Western Armenian (Hagop, -ian), which the
  // Arabic country pool does not contain at all.
  armenian_lebanese: {
    male: ['Hagop', 'Garo', 'Raffi', 'Sarkis', 'Krikor', 'Kevork', 'Hovig', 'Vahe', 'Harout', 'Boghos', 'Bedros', 'Vartan', 'Hrant', 'Shant', 'Sevag', 'Aram', 'Avedis', 'Mihran', 'Zareh'],
    female: ['Anahid', 'Arpi', 'Maral', 'Nairi', 'Houry', 'Sossi', 'Taline', 'Lara', 'Nora', 'Seta', 'Zabel', 'Arshalouys', 'Takouhi', 'Rita', 'Ani', 'Knar', 'Aline'],
    surnames: ['Kouyoumdjian', 'Bedrossian', 'Tashjian', 'Boghossian', 'Hagopian', 'Sarkissian', 'Krikorian', 'Kevorkian', 'Manoukian', 'Garabedian', 'Avedissian', 'Tavitian', 'Vartanian', 'Minassian', 'Arslanian', 'Pakradouni', 'Demirdjian', 'Keshishian', 'Tchobanian'],
  },

  // Israel: the pool is secular Hebrew. An Arab citizen was named Liron Cohen.
  arab_citizen_israel: {
    male: ['Mohammad', 'Ahmad', 'Ali', 'Mahmoud', 'Khaled', 'Omar', 'Hassan', 'Ibrahim', 'Yousef', 'Jamal', 'Ayman', 'Mansour', 'Samer', 'Wael', 'Fadi', 'Nidal', 'Bilal', 'Amir', 'Majd', 'Tawfiq'],
    female: ['Fatima', 'Aisha', 'Maryam', 'Hanan', 'Amal', 'Rana', 'Nour', 'Lina', 'Rasha', 'Samah', 'Manar', 'Aya', 'Haneen', 'Duaa', 'Suha', 'Abir', 'Rawan', 'Nisreen', 'Wafaa'],
    surnames: ['Masarwa', 'Jabareen', 'Mahajna', 'Aghbaria', 'Zoabi', 'Tibi', 'Odeh', 'Abbas', 'Salah', 'Khatib', 'Taha', 'Younis', 'Kanaaneh', 'Darawshe', 'Abu Rabia', 'Asadi', 'Mansour', 'Nassar'],
  },
  // Israel: a Haredi family does not name its children Ziv, Inbal or Rotem.
  haredi_jewish: {
    male: ['Yosef', 'Moshe', 'Yaakov', 'Avraham', 'Yitzchak', 'Shlomo', 'Menachem', 'Chaim', 'Aharon', 'Mordechai', 'Shmuel', 'Eliyahu', 'Dovid', 'Yehuda', 'Naftali', 'Tzvi', 'Meir', 'Yisroel', 'Nachman', 'Pinchas'],
    female: ['Sarah', 'Rivka', 'Rachel', 'Leah', 'Chana', 'Miriam', 'Esther', 'Devorah', 'Chaya', 'Malka', 'Bracha', 'Fraidy', 'Tova', 'Yehudis', 'Gitty', 'Rochel', 'Blima', 'Faigy', 'Shaindy', 'Perel'],
    surnames: ['Friedman', 'Weiss', 'Schwartz', 'Klein', 'Rosenberg', 'Goldstein', 'Katz', 'Lerner', 'Teitelbaum', 'Twersky', 'Halberstam', 'Grossman', 'Deutsch', 'Stern', 'Rubin', 'Horowitz', 'Rabinowitz', 'Levin', 'Porush', 'Deri'],
  },

  // Iraq: the pool's family names are Arab tribal nisbas (Al-Tikriti,
  // Al-Dulaimi) and its given names Arabic; Kurds in the Kurdistan Region name
  // themselves in Sorani and Badini.
  kurdish_iraqi: {
    male: ['Azad', 'Rebwar', 'Dilshad', 'Hiwa', 'Karwan', 'Shwan', 'Soran', 'Zana', 'Rizgar', 'Hemin', 'Sherko', 'Bakhtiyar', 'Kawa', 'Aram', 'Goran', 'Hoshyar', 'Masoud', 'Nechirvan', 'Jalal', 'Fuad', 'Barham', 'Omar'],
    female: ['Shilan', 'Nazdar', 'Avin', 'Hero', 'Nasrin', 'Shirin', 'Tara', 'Chnar', 'Kurdistan', 'Bayan', 'Vian', 'Lana', 'Hana', 'Parwin', 'Nishtiman', 'Dilan', 'Ronak'],
    surnames: ['Barzani', 'Talabani', 'Zebari', 'Salih', 'Rasul', 'Qadir', 'Karim', 'Aziz', 'Amin', 'Mustafa', 'Rashid', 'Hawrami', 'Jaff', 'Doski', 'Surchi', 'Ahmed', 'Mahmoud', 'Abdullah'],
  },
  // Syria: the pool's surnames carry the Arab Al- form.
  kurdish_syria: {
    ...KURMANJI_GIVEN,
    surnames: ['Muslim', 'Abdi', 'Tammo', 'Sheikho', 'Hajji', 'Hassan', 'Ali', 'Osman', 'Mohammed', 'Ibrahim', 'Khalil', 'Hussein', 'Hamo', 'Mahmoud', 'Omar', 'Abdullah', 'Yusuf'],
  },
  // Turkey: Kurds hold Turkish legal surnames since 1934, so only the given
  // names differ.
  kurdish: KURMANJI_GIVEN,
  // Iran: Persian-form surnames, Kurdish given names.
  kurd_iranian: {
    male: ['Azad', 'Aram', 'Kawa', 'Rebwar', 'Hiwa', 'Karwan', 'Soran', 'Zana', 'Sherko', 'Hemin', 'Diyako', 'Farhad', 'Kamran', 'Jamal', 'Omar', 'Ahmad', 'Hossein', 'Kaveh'],
    female: ['Jina', 'Shilan', 'Avin', 'Nazdar', 'Shirin', 'Chnar', 'Nasrin', 'Parwin', 'Ronak', 'Tara', 'Hana', 'Zhila', 'Leyla', 'Golaleh', 'Sakineh'],
    surnames: ['Ghassemlou', 'Sharafkandi', 'Mohtadi', 'Amini', 'Ardalan', 'Sanandaji', 'Mahabadi', 'Kurdistani', 'Karimi', 'Rahimi', 'Moradi', 'Mohammadi', 'Salehi', 'Ahmadi', 'Hosseini', 'Rostami', 'Azizi'],
  },

  // Afghanistan: the pool's surnames are Pashtun tribal names (Barakzai,
  // Popalzai, Ghilzai) and a third of its women's names Pashto.
  tajik_afghan: {
    male: ['Ahmad', 'Mohammad', 'Abdul', 'Fahim', 'Yunus', 'Amrullah', 'Atta', 'Bismillah', 'Ismail', 'Qasim', 'Nasir', 'Hamid', 'Farid', 'Jawed', 'Omid', 'Sohrab', 'Bashir', 'Khalil', 'Najib', 'Wahid', 'Hafiz', 'Rahim'],
    female: ['Fereshta', 'Mahbooba', 'Nilofar', 'Parwin', 'Shukria', 'Tahmina', 'Nargis', 'Farzana', 'Roya', 'Sima', 'Shabnam', 'Mina', 'Mariam', 'Zahra', 'Masooma', 'Fatima', 'Laila', 'Soraya', 'Homa', 'Fawzia'],
    surnames: ['Massoud', 'Rabbani', 'Qanuni', 'Fahim', 'Noor', 'Saleh', 'Panjshiri', 'Badakhshi', 'Andarabi', 'Kohistani', 'Parwani', 'Herawi', 'Shamali', 'Kabuli', 'Takhari', 'Mohammadi', 'Hosseini', 'Karimi', 'Rahimi', 'Sultani'],
  },
  hazara: {
    male: ['Ali', 'Hussain', 'Hassan', 'Abbas', 'Mohammad', 'Reza', 'Mahdi', 'Qurban', 'Sakhi', 'Ghulam', 'Karim', 'Sarwar', 'Nabi', 'Jawad', 'Qasim', 'Rahim', 'Ismail', 'Musa'],
    female: ['Fatima', 'Zahra', 'Masooma', 'Sakina', 'Zainab', 'Sima', 'Zakia', 'Roqia', 'Nargis', 'Shakila', 'Marzia', 'Fereshta', 'Hakima', 'Sediqa', 'Roya', 'Tahira'],
    surnames: ['Mazari', 'Mohseni', 'Khalili', 'Mohaqiq', 'Samar', 'Danish', 'Akbari', 'Changezi', 'Jafari', 'Hussaini', 'Rahimi', 'Karimi', 'Bamyani', 'Sultani', 'Naderi', 'Ghaznavi'],
  },

  // Russians and other Soviet-era settlers outside Russia: each of these
  // countries' pools is the titular nation's (Kazakh, Latvian, Estonian,
  // Ukrainian, Uzbek, Azerbaijani).
  russian_kazakh: borrow('Russia'),
  russian_latvian: borrow('Russia'),
  russian_estonian: borrow('Russia'),
  russian_ukrainian: borrow('Russia'),
  russian_uzbek: borrow('Russia'),
  russian_azerbaijani: borrow('Russia'),
  russian_kyrgyz: borrow('Russia'),
  russian_turkmen: borrow('Russia'),
  russian_lithuanian: borrow('Russia'),
  russian_moldova: borrow('Russia'),
  russian_georgian: borrow('Russia'),
  russian_belarusian: borrow('Russia'),
  // Ukrainians in Kazakhstan: Russian-form given names, Ukrainian surnames.
  ukrainian_kazakh: { ...borrow('Russia', ['male', 'female']), ...borrow('Ukraine', ['surnames']) },
  // Russian Germans (Russia, Kazakhstan): Russian given names beside the old
  // German ones of the deported generation, and German surnames.
  german_russian: {
    male: ['Viktor', 'Aleksandr', 'Andrei', 'Vladimir', 'Sergei', 'Yuri', 'Eduard', 'Valery', 'Johann', 'Heinrich', 'Friedrich', 'Jakob', 'David', 'Peter', 'Waldemar', 'Alexander', 'Roman', 'Artur'],
    female: ['Maria', 'Elisabeth', 'Katharina', 'Anna', 'Amalia', 'Emma', 'Olga', 'Irina', 'Lidia', 'Frieda', 'Lilli', 'Natalia', 'Elena', 'Svetlana', 'Tatiana', 'Helena'],
    surnames: ['Miller', 'Schmidt', 'Wagner', 'Becker', 'Fischer', 'Weber', 'Meier', 'Hoffmann', 'Klein', 'Braun', 'Koch', 'Richter', 'Wolf', 'Schäfer', 'Neumann', 'Kraus', 'Frank', 'Reimer', 'Dyck', 'Schneider'],
  },
  uzbek_kazakh: borrow('Uzbekistan'),
  uzbek_kyrgyz: borrow('Uzbekistan'),
  uzbek_tajik: borrow('Uzbekistan'),
  uzbek_turkmen: borrow('Uzbekistan'),
  uyghur: UYGHUR,
  uyghur_kazakh: UYGHUR,
  // Crimean Tatars: the Ukraine pool is Slavic and Orthodox.
  crimean_tatar: {
    male: ['Mustafa', 'Refat', 'Ayder', 'Server', 'Nariman', 'Enver', 'Lenur', 'Rustem', 'Remzi', 'Edem', 'Dilyaver', 'Eskender', 'Seyran', 'Fevzi', 'Ismail', 'Asan', 'Akhtem'],
    female: ['Ayshe', 'Zarema', 'Lilya', 'Elvira', 'Gulnara', 'Emine', 'Zera', 'Dilyara', 'Safie', 'Mavile', 'Alie', 'Leniye', 'Esma', 'Fatma', 'Sevil', 'Elmaz', 'Zore'],
    surnameGrammar: 'Russia',
    surnames: ['Kurtumerov', 'Mamutov', 'Umerov', 'Ametov', 'Asanov', 'Osmanov', 'Ibraimov', 'Bekirov', 'Memetov', 'Seitablaev', 'Mustafayev', 'Kurtseitov', 'Islyamov', 'Suleimanov', 'Abdullayev', 'Seidametov'],
  },
  // Russia: Volga Tatars and Chechens were named from the Russian pool.
  tatar: {
    male: ['Rustam', 'Rinat', 'Ildar', 'Marat', 'Ravil', 'Airat', 'Timur', 'Ramil', 'Damir', 'Rafael', 'Azat', 'Ilnur', 'Radik', 'Farid', 'Renat', 'Rashid', 'Almaz', 'Ilgiz', 'Mintimer'],
    female: ['Gulnara', 'Alsu', 'Dilyara', 'Guzel', 'Aigul', 'Elmira', 'Liliya', 'Rezeda', 'Leysan', 'Zulfiya', 'Alfiya', 'Gulshat', 'Roza', 'Nailya', 'Farida', 'Ilsiyar'],
    surnameGrammar: 'Russia',
    surnames: ['Khabibullin', 'Galiullin', 'Sharipov', 'Gainutdinov', 'Nurmukhametov', 'Khairullin', 'Zakirov', 'Valiev', 'Sadykov', 'Gilyazov', 'Safin', 'Yusupov', 'Nizamov', 'Mukhametshin', 'Akhmetov', 'Ibragimov', 'Fatkullin', 'Garipov'],
  },
  chechen: {
    male: ['Ramzan', 'Akhmad', 'Dzhokhar', 'Aslan', 'Shamil', 'Magomed', 'Adam', 'Islam', 'Ruslan', 'Umar', 'Isa', 'Khamzat', 'Salman', 'Aslanbek', 'Movladi', 'Zelimkhan'],
    female: ['Zarema', 'Madina', 'Kheda', 'Aminat', 'Zalina', 'Malika', 'Luiza', 'Petimat', 'Khava', 'Seda', 'Milana', 'Tamara', 'Zura', 'Markha', 'Raisa'],
    surnameGrammar: 'Russia',
    surnames: ['Musayev', 'Idrisov', 'Saidov', 'Bataev', 'Elmurzayev', 'Umarov', 'Vakhayev', 'Magomadov', 'Khasanov', 'Gakayev', 'Israpilov', 'Mezhidov', 'Dadayev', 'Tsatsayev', 'Abdurakhmanov', 'Gairbekov'],
  },

  // ── Europe ──

  // Bosnia: the country pool is Bosniak. Serbs and Croats carry the names of
  // Serbia and Croatia.
  bosnian_serb: borrow('Serbia'),
  bosnian_croat: borrow('Croatia'),
  // The same three peoples on the other sides of the borders.
  serb_croatia: borrow('Serbia'),
  serb_slovenia: borrow('Serbia'),
  bosniak_serbian: borrow('Bosnia and Herzegovina'),
  bosniak_croatia: borrow('Bosnia and Herzegovina'),
  bosniak_slovenia: borrow('Bosnia and Herzegovina'),

  // ── South Asia ──

  // Bhutan: the Lhotshampa are Nepali-speaking Hindus with Nepali family
  // names; the Bhutan pool is Drukpa Buddhist given names.
  lhotshampa: {
    male: ['Ram', 'Krishna', 'Hari', 'Tek Nath', 'Dil Bahadur', 'Bhim', 'Gopal', 'Narayan', 'Dilli', 'Kamal', 'Prakash', 'Santosh', 'Bishnu', 'Chandra', 'Ganesh', 'Deepak', 'Suresh', 'Bikash'],
    female: ['Sita', 'Gita', 'Kamala', 'Radha', 'Laxmi', 'Durga', 'Parbati', 'Bishnu Maya', 'Sarita', 'Sabitri', 'Mina', 'Sunita', 'Kalpana', 'Tara', 'Nirmala', 'Devi', 'Januka'],
    surnames: ['Rai', 'Gurung', 'Tamang', 'Subba', 'Limbu', 'Bhattarai', 'Rizal', 'Adhikari', 'Sharma', 'Chhetri', 'Ghalley', 'Pradhan', 'Dahal', 'Pokhrel', 'Mishra', 'Nepal', 'Timsina', 'Dhungel', 'Giri', 'Thapa'],
  },
  tibetan_bhutan: TIBETAN,

  // Sri Lanka: the pool is Sinhala. Tamils and Moors were named Perera and
  // Dissanayake.
  sri_lankan_tamil: {
    male: ['Kumar', 'Rajan', 'Suresh', 'Sivakumar', 'Nimalan', 'Tharshan', 'Thileepan', 'Kajan', 'Prashanth', 'Mathan', 'Sutharsan', 'Janarthanan', 'Ganeshan', 'Sivanesan', 'Vasanthan', 'Kanagaratnam', 'Selvarajah', 'Ravi'],
    female: ['Thamilini', 'Kalaiselvi', 'Nirmala', 'Sumathi', 'Vasanthi', 'Kalpana', 'Kavitha', 'Mathivathani', 'Rajani', 'Sivaranjini', 'Shanthi', 'Selvi', 'Malar', 'Puvaneswari', 'Jeyanthi', 'Tharshini', 'Sharmila'],
    surnames: ['Velupillai', 'Sampanthan', 'Ponnambalam', 'Chelvanayakam', 'Amirthalingam', 'Kadirgamar', 'Sivaram', 'Thiruchelvam', 'Sivanesan', 'Thurairajah', 'Selvanayagam', 'Nadarajah', 'Arumugam', 'Kanagaratnam', 'Balasingham', 'Sivapalan', 'Rajaratnam', 'Kandiah', 'Sinnathamby', 'Thambirajah'],
  },
  indian_tamil: {
    ...TAMIL_STRAITS,
    surnames: ['Thondaman', 'Muttiah', 'Suppiah', 'Ramasamy', 'Muniandy', 'Arumugam', 'Krishnan', 'Velu', 'Perumal', 'Letchumanan', 'Kandasamy', 'Govindasamy', 'Sinnathamby', 'Maniam', 'Murugesan', 'Chandrasekaran', 'Radhakrishnan'],
  },
  sri_lankan_moor: {
    male: ['Mohamed', 'Ahamed', 'Rauff', 'Ashraff', 'Rishad', 'Faiz', 'Imtiaz', 'Nizam', 'Rizwan', 'Fazil', 'Hakeem', 'Rafeek', 'Nawaz', 'Muzammil', 'Ameer', 'Ismail', 'Farook', 'Riyaz'],
    female: ['Fathima', 'Ayesha', 'Rizana', 'Shiyama', 'Farzana', 'Sithy', 'Hafsa', 'Zeenath', 'Fazeela', 'Safiya', 'Nuzrath', 'Rinoza', 'Jiffriya', 'Sameera', 'Rifka'],
    surnames: ['Marikar', 'Hakeem', 'Ashraff', 'Bathiudeen', 'Razik', 'Cassim', 'Macan Markar', 'Lebbe', 'Ismail', 'Kariapper', 'Jaffer', 'Hussain', 'Mohideen', 'Rahuman', 'Sheriff', 'Azeez', 'Nafeek'],
  },

  // ── Southeast and East Asia ──

  // Malaysia / Singapore: one pool across Malay, Chinese and Indian names,
  // so a Malay girl could be Mei Ling Subramaniam.
  malay_malaysian: MALAY,
  malay_singaporean: MALAY,
  chinese_malaysian: {
    male: ['Wei Hao', 'Jun Kiat', 'Chee Weng', 'Kok Leong', 'Beng Huat', 'Chee Keong', 'Wai Kit', 'Kah Wai', 'Soon Seng', 'Yong Sheng', 'Jia Hao', 'Wei Jie', 'Chun Hong', 'Boon Kiat', 'Kok Wai', 'Teck Seng', 'Kian Ming', 'Ah Kow'],
    female: ['Mei Ling', 'Li Wen', 'Hui Ching', 'Xiu Hua', 'Pei Shan', 'Siew Lan', 'Mei Fong', 'Poh Lin', 'Lay Hoon', 'Siew Mei', 'Ai Ling', 'Wai Yee', 'Yee Ling', 'Jia Yi', 'Xin Yi', 'Hui Min', 'Shu Fen', 'Bee Lian'],
    surnames: ['Lim', 'Tan', 'Lee', 'Ng', 'Wong', 'Chong', 'Teh', 'Ong', 'Yap', 'Chan', 'Chua', 'Goh', 'Ooi', 'Khoo', 'Low', 'Loh', 'Cheah', 'Chin', 'Lau', 'Yeoh', 'Koh', 'Tay', 'Leong', 'Foo'],
  },
  chinese_singaporean: {
    male: ['Wei Ming', 'Jun Hao', 'Jun Wei', 'Kian Hao', 'Wei Liang', 'Jun Xian', 'Wen Jie', 'Yong Qiang', 'Kok Wah', 'Boon Keng', 'Chee Hong', 'Teck Huat', 'Kah Seng', 'Ethan', 'Ryan', 'Joshua', 'Marcus', 'Darren', 'Benjamin', 'Aaron'],
    female: ['Mei Ling', 'Xin Yi', 'Xin Hui', 'Jia Min', 'Hui Wen', 'Siew Lan', 'Bee Hoon', 'Lay Hoon', 'Mei Fong', 'Pei Ling', 'Shu Hui', 'Serene', 'Wendy', 'Cheryl', 'Joanna', 'Melissa', 'Rachel', 'Chloe'],
    surnames: ['Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Goh', 'Teo', 'Koh', 'Chan', 'Chua', 'Ho', 'Yeo', 'Sim', 'Chong', 'Yap', 'Phua', 'Soh', 'Low', 'Tay', 'Toh', 'Ang', 'Lau', 'Seah'],
  },
  indian_malaysian: TAMIL_STRAITS,
  indian_singaporean: TAMIL_STRAITS,

  // Indonesia: the pool's given names are Javanese and Muslim (Siti, Umar,
  // Fauzi). Chinese Indonesians took Indonesian-sounding surnames after 1966
  // and mostly Christian or Western given names.
  chinese_indonesian: {
    male: ['Hendra', 'Budi', 'Rudy', 'Andreas', 'Stefanus', 'Yohanes', 'Michael', 'Kevin', 'Felix', 'Hendrik', 'Alan', 'Sofyan', 'Eka', 'Mochtar', 'Anthony', 'Jonathan', 'Wilson', 'Tommy', 'Liem'],
    female: ['Lily', 'Linda', 'Susi', 'Mei', 'Jessica', 'Cynthia', 'Veronica', 'Grace', 'Melinda', 'Yuliana', 'Lanny', 'Fenny', 'Lenny', 'Meiliana', 'Angela', 'Christine', 'Natalia', 'Theresia'],
    surnames: ['Wijaya', 'Hartono', 'Santoso', 'Salim', 'Halim', 'Tanoto', 'Tanuwidjaja', 'Gunawan', 'Kurniawan', 'Sutanto', 'Widjaja', 'Susanto', 'Setiadi', 'Gozali', 'Riady', 'Budikusuma', 'Lim', 'Tan'],
  },
  // Indonesia: a Batak surname is the marga, the clan, and is the first thing
  // anyone asks. The pool gave Batak Javanese surnames.
  batak: {
    surnames: ['Nasution', 'Lubis', 'Siregar', 'Simatupang', 'Pardede', 'Sitompul', 'Hutapea', 'Panjaitan', 'Sianipar', 'Simanjuntak', 'Situmorang', 'Silalahi', 'Tambunan', 'Sinaga', 'Harahap', 'Hutagalung', 'Manurung', 'Napitupulu', 'Pasaribu', 'Sihombing', 'Siahaan'],
  },

  // Philippines: the Moro are Muslim; the pool is Catholic and Hispanic.
  moro: {
    male: ['Nur', 'Hashim', 'Murad', 'Ebrahim', 'Abdul', 'Jamal', 'Omar', 'Farouk', 'Tahir', 'Hamid', 'Ali', 'Amir', 'Bashir', 'Yusop', 'Usman', 'Mohammad', 'Esmael', 'Nasser'],
    female: ['Sittie', 'Noraida', 'Norhaya', 'Johaira', 'Samira', 'Fatima', 'Aisha', 'Amina', 'Normina', 'Salma', 'Jamila', 'Farida', 'Sitti', 'Nurhana', 'Soraya'],
    surnames: ['Misuari', 'Salamat', 'Ebrahim', 'Ampatuan', 'Mangudadatu', 'Dimaporo', 'Alonto', 'Adiong', 'Lucman', 'Pangandaman', 'Sinsuat', 'Candao', 'Mastura', 'Paglas', 'Matalam', 'Kiram', 'Tulawie', 'Jikiri', 'Balindong'],
  },

  // Thailand: the Malay Muslims of the deep south hold Thai-registered
  // surnames; their given names are Malay and Muslim, not Thai.
  malay_thai: {
    male: ['Abdullah', 'Ismail', 'Ibrahim', 'Muhammad', 'Hasan', 'Yusof', 'Sulaiman', 'Ahmad', 'Ali', 'Abdulrahman', 'Harun', 'Idris', 'Yakob', 'Zakaria', 'Muhammadnur', 'Abdulloh'],
    female: ['Fatimah', 'Aishah', 'Siti', 'Nur', 'Zainab', 'Mariam', 'Rohani', 'Kalimah', 'Aminah', 'Asiah', 'Hasanah', 'Salmah', 'Rokiah', 'Hafsah', 'Maimunah'],
  },

  // Myanmar: the pool is Bamar Buddhist. Rohingya have no family name; the
  // second name is the father's or a Muslim honorific name.
  rohingya: {
    male: ['Mohammed', 'Nur', 'Abdul', 'Rahim', 'Hamid', 'Shafi', 'Hasan', 'Ismail', 'Kabir', 'Rashid', 'Salim', 'Anwar', 'Nurul', 'Jamal', 'Hussein', 'Ayub', 'Zakir', 'Yunus', 'Dil Mohammed'],
    female: ['Rahima', 'Fatema', 'Hasina', 'Minara', 'Rashida', 'Jamila', 'Sabera', 'Tayaba', 'Hamida', 'Shamima', 'Rokeya', 'Amina', 'Sufia', 'Setara', 'Laila', 'Nasima', 'Rabeya', 'Anwara'],
    surnames: ['Islam', 'Ullah', 'Hussein', 'Rahman', 'Alam', 'Hamid', 'Karim', 'Ahmed', 'Ali', 'Hassan', 'Rashid', 'Ismail', 'Yunus', 'Kabir', 'Uddin', 'Amin'],
  },

  // China: the pool is Han.
  tibetan: TIBETAN,

  // ── Oceania and the Americas ──

  // Papua New Guinea: the country pool is Highlands and generic. Regional
  // family names, mostly a grandfather's or father's personal name.
  papuan_coastal: {
    surnames: ['Morea', 'Vagi', 'Kila', 'Tau', 'Mea', 'Igo', 'Lohia', 'Rarua', 'Oala', 'Toua', 'Dika', 'Hitolo', 'Gau', 'Guise', 'Lokoloko', 'Kiki', 'Waiko'],
  },
  momase: {
    surnames: ['Namah', 'Kapris', 'Yopyyopy', 'Kas', 'Yama', 'Genia', 'Wenge', 'Basil', 'Saonu', 'Zurenuoc', 'Dadae', 'Paita', 'Zeming', 'Maru', 'Kramer'],
  },
  islands_bougainville: {
    surnames: ['Momis', 'Kabui', 'Ona', 'Toroama', 'Miriori', 'Hannett', 'Kauona', 'Tanis', 'Nisira', 'Masono', 'Semoso', 'Masatt', 'Banam', 'Sirivi', 'Kaputin', 'Tammur', 'ToLiman', 'Dion', 'Pokawin', 'Tiensten'],
  },

  // Fiji: one pool across iTaukei and Indo-Fijian names. Indo-Fijians are
  // named by faith below (Fiji:hindu, Fiji:muslim).
  itaukei: {
    male: ['Josaia', 'Timoci', 'Epeli', 'Apisai', 'Sitiveni', 'Peni', 'Eroni', 'Isireli', 'Jone', 'Viliame', 'Semi', 'Josefa', 'Mosese', 'Iliesa', 'Tevita', 'Ropate', 'Samisoni', 'Aisake', 'Joeli', 'Waisale', 'Seru', 'Inoke', 'Laisenia'],
    female: ['Litia', 'Makereta', 'Salote', 'Torika', 'Koila', 'Anaseini', 'Mereani', 'Lusiana', 'Losana', 'Mere', 'Seini', 'Unaisi', 'Vasiti', 'Sereana', 'Akanisi', 'Kelera', 'Asenaca', 'Titilia', 'Miliana', 'Salanieta', 'Mereoni'],
    surnames: ['Tuivaga', 'Tuisolia', 'Bavadra', 'Rabuka', 'Bainimarama', 'Nailatikau', 'Qarase', 'Mara', 'Ganilau', 'Tora', 'Waqa', 'Ravuvu', 'Nawalowalo', 'Koroi', 'Naupoto', 'Baledrokadroka', 'Tikoduadua', 'Seniloli', 'Kubuabola', 'Kamikamica'],
  },

  // Guyana / Trinidad: the pools mix Indo- and Afro-Caribbean names. Afro-
  // Caribbean families by group; Indo-Caribbean by faith, below.
  afro_guyanese: {
    male: ['Winston', 'Orin', 'Carl', 'Gary', 'Joseph', 'Kester', 'Oswald', 'Terrence', 'Ulric', 'Andre', 'Cecil', 'Dexter', 'Desmond', 'Linden', 'Hamilton', 'Eusi', 'Walter', 'Clive', 'Colin', 'Everton', 'Lennox', 'Hubert', 'Aubrey', 'Leroy'],
    female: ['Yvonne', 'Cheryl', 'Esther', 'Merle', 'Hyacinth', 'Jennifer', 'Karen', 'Lorna', 'Michelle', 'Norma', 'Pauline', 'Sharon', 'Vanessa', 'Wendy', 'Andrea', 'Beverly', 'Claudette', 'Viola', 'Desiree', 'Gloria', 'Marcia', 'Sonia'],
    surnames: ['Williams', 'Fraser', 'Benjamin', 'Grant', 'Hopkinson', 'Cummings', 'Roberts', 'Adams', 'Fields', 'Hoyte', 'Nedd', 'Trotman', 'Burnham', 'Rodney', 'Granger', 'Carter', 'Lloyd', 'Harris', 'Hinds', 'Corbin', 'Jordan', 'Bourne', 'Blackman', 'Harper', 'Sealey'],
  },
  afro_trinidadian: {
    male: ['Kevin', 'Roger', 'Jerome', 'Denzil', 'Winston', 'Carlton', 'Fitzroy', 'Garvin', 'Kenrick', 'Nigel', 'Anthony', 'Curtis', 'Errol', 'Godfrey', 'Lloyd', 'Keith', 'Selwyn', 'Hasely', 'Ato', 'Dwight', 'Earl', 'Clive', 'Wendell', 'Kerwin', 'Marlon'],
    female: ['Karen', 'Natasha', 'Cheryl', 'Shelly', 'Andrea', 'Desiree', 'Claudette', 'Elaine', 'Juliet', 'Monica', 'Tricia', 'Wendy', 'Jillian', 'Marcia', 'Gillian', 'Beverley', 'Donna', 'Sandra', 'Yvonne', 'Keisha', 'Janelle', 'Candice'],
    surnames: ['Williams', 'Phillip', 'Joseph', 'James', 'Baptiste', 'Thomas', 'Fortune', 'Charles', 'Pierre', 'John', 'Wilson', 'Rowley', 'Manning', 'Robinson', 'Chambers', 'Noel', 'Mitchell', 'Alexander', 'Francis', 'Roberts', 'Walcott', 'Lewis'],
  },
}

// ─── By country and faith ─────────────────────────────────────────────────────

export const RELIGION_NAMES = {
  // Eritrea: the pool is Tigrinya and Orthodox; half the country is Muslim
  // (the Tigre, Saho, and Muslim Tigrinya). No family name: fathers' names.
  'Eritrea:muslim': {
    male: ['Mohammed', 'Idris', 'Osman', 'Saleh', 'Ibrahim', 'Omar', 'Abdalla', 'Mahmoud', 'Hamid', 'Ali', 'Nur', 'Adem', 'Suleiman', 'Abubakar', 'Jaber', 'Musa', 'Hussein', 'Ahmed'],
    female: ['Amna', 'Halima', 'Khadija', 'Zahra', 'Saida', 'Aisha', 'Asha', 'Mariam', 'Zeineb', 'Hawa', 'Fatima', 'Amina', 'Nafisa', 'Salma', 'Rukia', 'Sadia'],
    surnames: ['Idris', 'Awate', 'Nur', 'Saleh', 'Osman', 'Adem', 'Sabbe', 'Hassan', 'Ibrahim', 'Mahmoud', 'Omar', 'Suleiman', 'Jaber', 'Musa', 'Abdalla', 'Hamid', 'Ali', 'Mohammed'],
  },

  // Ethiopia: the pool is Amhara and Orthodox; a third of the country is
  // Muslim. (Oromo and Somali Muslims are named by group, above.)
  'Ethiopia:muslim': {
    male: ['Mohammed', 'Ahmed', 'Kedir', 'Jemal', 'Nuru', 'Hussein', 'Abdulkadir', 'Seid', 'Mustefa', 'Awol', 'Kemal', 'Shemsu', 'Siraj', 'Temam', 'Yassin', 'Redwan', 'Ibrahim', 'Ali', 'Abdella'],
    female: ['Fatuma', 'Zeyneba', 'Kedija', 'Amina', 'Hawa', 'Rukia', 'Nuria', 'Semira', 'Zehara', 'Momina', 'Hayat', 'Rehima', 'Ferdusa', 'Munira', 'Sofia'],
    surnames: ['Mohammed', 'Ahmed', 'Kedir', 'Jemal', 'Nuru', 'Hussein', 'Abdulkadir', 'Seid', 'Mustefa', 'Awol', 'Kemal', 'Shemsu', 'Siraj', 'Temam', 'Yassin', 'Redwan', 'Abdella'],
  },

  // Nigeria: Muslims outside the Hausa-Fulani, Yoruba and Kanuri (Nupe,
  // Middle Belt and others) name in the northern Islamic tradition.
  'Nigeria:muslim': HAUSA_NIGERIA,

  // Lebanon: the pool mixes Maronite and Muslim names freely (a Hussein
  // Gemayel). Druze, Shia, Sunni and Alawi ids all share the `muslim` prefix.
  'Lebanon:christian': {
    male: ['Georges', 'Elias', 'Pierre', 'Michel', 'Joseph', 'Antoine', 'Charbel', 'Tony', 'Fadi', 'Johnny', 'Camille', 'Samir', 'Nabil', 'Gebran', 'Rafic', 'Emile', 'Fouad', 'Ramzi', 'Maroun', 'Bechara'],
    female: ['Joelle', 'Rita', 'Nadine', 'Carla', 'Mireille', 'Nicole', 'Marie', 'Myriam', 'Georgette', 'Joumana', 'Micheline', 'Pascale', 'Liliane', 'Claudine', 'Nayla', 'Maya', 'Tania', 'Rosine'],
    surnames: ['Khoury', 'Haddad', 'Gemayel', 'Aoun', 'Geagea', 'Frangieh', 'Chamoun', 'Helou', 'Murr', 'Tohme', 'Rizk', 'Nassar', 'Nehme', 'Abi Nasr', 'Abi Saab', 'Abou Khalil', 'Chahine', 'Ghanem', 'Fares', 'Daher', 'Bassil', 'Sfeir', 'Karam', 'Maalouf'],
  },
  'Lebanon:muslim': {
    male: ['Ahmad', 'Ali', 'Hassan', 'Hussein', 'Mohammad', 'Mahmoud', 'Khaled', 'Omar', 'Bilal', 'Rami', 'Walid', 'Ziad', 'Samer', 'Tarek', 'Nader', 'Abbas', 'Mustafa', 'Hadi', 'Ibrahim', 'Kamal'],
    female: ['Fatima', 'Zeinab', 'Maryam', 'Hiba', 'Nour', 'Rana', 'Rima', 'Amal', 'Ghada', 'Hana', 'Zahraa', 'Sara', 'Layal', 'Dima', 'Rasha', 'Aya', 'Manal', 'Hanan'],
    surnames: ['Hariri', 'Nasrallah', 'Berri', 'Salam', 'Jumblatt', 'Karami', 'Siniora', 'Mikati', 'Hoss', 'Fadlallah', 'Solh', 'Itani', 'Beydoun', 'Hamadeh', 'Moussawi', 'Khalil', 'Mansour', 'Arslan', 'Zein', 'Saad'],
  },

  // Syria: the pool is Sunni Arab; Christians carry Levantine Christian names.
  'Syria:christian': {
    male: ['Georges', 'Elias', 'Michel', 'Boutros', 'Hanna', 'Youssef', 'Nicolas', 'Salim', 'Fouad', 'Antoun', 'Jirjis', 'Fadi', 'Rami', 'Tony', 'Sami', 'Issa', 'Gabriel', 'Nabil'],
    female: ['Mary', 'Rita', 'Georgette', 'Hala', 'Rima', 'Lina', 'Sawsan', 'Maryam', 'Nada', 'Hanan', 'Rania', 'Mireille', 'Samar', 'Najwa', 'Carmen', 'Ghada'],
    surnames: ['Haddad', 'Khoury', 'Saadeh', 'Kassab', 'Hanna', 'Boutros', 'Nahas', 'Jabbour', 'Sayegh', 'Qassis', 'Shammas', 'Tarazi', 'Atallah', 'Mikhael', 'Sabbagh', 'Aflaq', 'Yaziji', 'Najjar'],
  },

  // Egypt: the pool is Muslim; Copts name their children after saints and
  // carry names (Girgis, Tadros, Sawiris) no Muslim family does.
  'Egypt:christian': {
    male: ['Mina', 'Girgis', 'Boutros', 'Hany', 'Magdy', 'Samir', 'Nabil', 'Ramy', 'Maged', 'Emad', 'Fady', 'Bishoy', 'Kyrillos', 'Tawadros', 'Shenouda', 'Youssef', 'Makram', 'Wagdy', 'Romany', 'Abanoub', 'Rafik', 'Adel'],
    female: ['Mary', 'Marianne', 'Mariam', 'Nevine', 'Mona', 'Nadia', 'Samia', 'Irene', 'Christine', 'Marina', 'Demiana', 'Martina', 'Verena', 'Nermine', 'Sally', 'Ereny', 'Hoda'],
    surnames: ['Girgis', 'Boutros', 'Hanna', 'Mikhail', 'Tadros', 'Wassef', 'Ghali', 'Sawiris', 'Makram', 'Ebeid', 'Morcos', 'Bishay', 'Shenouda', 'Iskander', 'Abdel Malek', 'Abdel Messih', 'Rizk', 'Habib', 'Awad', 'Sidhom', 'Fahmy'],
  },

  // Kenya: the pool is Christian. Coastal Swahili and north-eastern Somali
  // Muslims name differently.
  'Kenya:muslim': {
    male: ['Mohamed', 'Ali', 'Hassan', 'Abdullahi', 'Omar', 'Ahmed', 'Hussein', 'Abdi', 'Rashid', 'Salim', 'Juma', 'Bakari', 'Hamisi', 'Swaleh', 'Athman', 'Yusuf', 'Aden', 'Ibrahim', 'Said', 'Farah'],
    female: ['Fatuma', 'Mwanaisha', 'Amina', 'Halima', 'Zainabu', 'Asha', 'Mwanajuma', 'Saida', 'Khadija', 'Rukia', 'Hawa', 'Salma', 'Mariam', 'Zuhura', 'Riziki', 'Habiba', 'Hadija'],
    surnames: ['Joho', 'Balala', 'Duale', 'Mohamed', 'Hassan', 'Omar', 'Farah', 'Abdi', 'Yusuf', 'Ali', 'Juma', 'Bakari', 'Swaleh', 'Athman', 'Said', 'Salim', 'Shariff', 'Mazrui', 'Kassim', 'Hamisi'],
  },

  // Tanzania: the pool is Christian throughout; a third of the country, and
  // nearly all of Zanzibar and the coast, is Muslim.
  'Tanzania:muslim': {
    male: ['Juma', 'Hamisi', 'Bakari', 'Rashidi', 'Ally', 'Hassani', 'Athumani', 'Ramadhani', 'Shabani', 'Salum', 'Omari', 'Selemani', 'Abdallah', 'Issa', 'Mussa', 'Jakaya', 'Seif', 'Ali', 'Mohamedi'],
    female: ['Mwanaisha', 'Mwajuma', 'Rehema', 'Asha', 'Fatuma', 'Zainabu', 'Halima', 'Mwanahawa', 'Amina', 'Saida', 'Salma', 'Mariamu', 'Hadija', 'Zuhura', 'Mwanaidi', 'Tatu', 'Riziki', 'Samia', 'Husna'],
    surnames: ['Kikwete', 'Mwinyi', 'Karume', 'Salim', 'Hamad', 'Shein', 'Abdallah', 'Juma', 'Bakari', 'Hamisi', 'Mohamed', 'Omari', 'Rashidi', 'Ally', 'Said', 'Mussa', 'Athumani', 'Hassani', 'Ramadhani', 'Selemani', 'Shabani', 'Makame'],
  },

  // India: the pool is Hindu and North Indian (Sharma, Mishra, Jyoti).
  'India:muslim': {
    male: ['Mohammed', 'Abdul', 'Imran', 'Salman', 'Aamir', 'Irfan', 'Faisal', 'Arif', 'Javed', 'Shahid', 'Rashid', 'Anwar', 'Iqbal', 'Zaheer', 'Naseer', 'Rizwan', 'Farhan', 'Sajid', 'Tariq', 'Wasim', 'Asif', 'Shakeel', 'Nadeem', 'Aslam', 'Yusuf'],
    female: ['Fatima', 'Ayesha', 'Zainab', 'Nazia', 'Shabana', 'Farzana', 'Rukhsana', 'Nasreen', 'Salma', 'Shaheen', 'Rehana', 'Parveen', 'Sultana', 'Heena', 'Tabassum', 'Nargis', 'Afreen', 'Sana', 'Zeenat', 'Shabnam', 'Mumtaz', 'Najma'],
    surnames: ['Khan', 'Ansari', 'Qureshi', 'Siddiqui', 'Shaikh', 'Syed', 'Ahmed', 'Hussain', 'Mirza', 'Pathan', 'Rizvi', 'Naqvi', 'Abbasi', 'Farooqui', 'Qazi', 'Alam', 'Akhtar', 'Malik', 'Beg', 'Saifi', 'Mansuri', 'Rahman'],
  },
  // Sikh given names are largely unisex; Singh and Kaur mark the sex, and a
  // gender-blind surname list cannot use them, so these are the clan names
  // families also carry.
  'India:sikh': {
    male: ['Harpreet', 'Gurpreet', 'Manpreet', 'Jaspreet', 'Harjit', 'Gurdeep', 'Kuldeep', 'Balwinder', 'Sukhwinder', 'Jaswant', 'Harbhajan', 'Gurmeet', 'Paramjit', 'Amarjit', 'Ranjit', 'Navjot', 'Mandeep', 'Hardeep', 'Satnam', 'Jagjit', 'Baljit', 'Tejinder'],
    female: ['Harpreet', 'Gurpreet', 'Manpreet', 'Jaspreet', 'Simran', 'Navneet', 'Rajwinder', 'Paramjit', 'Amarjit', 'Harjit', 'Balwinder', 'Jasleen', 'Gurleen', 'Harleen', 'Mandeep', 'Rupinder', 'Kamaljit', 'Jasbir', 'Surinder'],
    surnames: ['Sandhu', 'Sidhu', 'Gill', 'Dhillon', 'Grewal', 'Brar', 'Bajwa', 'Randhawa', 'Cheema', 'Virk', 'Mann', 'Sekhon', 'Chahal', 'Aulakh', 'Bains', 'Johal', 'Toor', 'Kang', 'Ahluwalia', 'Bedi', 'Sethi'],
  },

  // Fiji: Indo-Fijians, the girmitiya's descendants.
  'Fiji:hindu': {
    male: ['Raman', 'Rajesh', 'Anand', 'Sunil', 'Vinod', 'Naresh', 'Pradeep', 'Vijay', 'Ashwin', 'Sanjay', 'Arvind', 'Mahendra', 'Satendra', 'Ravindra', 'Rakesh', 'Rajendra', 'Krishna', 'Dharmendra', 'Shiu', 'Jai'],
    female: ['Shivani', 'Priya', 'Kavita', 'Sunita', 'Neelam', 'Nisha', 'Reema', 'Anita', 'Divya', 'Renu', 'Puja', 'Leela', 'Kamla', 'Savita', 'Shalini', 'Lata', 'Usha', 'Asha', 'Radhika'],
    surnames: ['Chaudhry', 'Prasad', 'Sharma', 'Singh', 'Kumar', 'Reddy', 'Lal', 'Naicker', 'Nair', 'Ram', 'Chand', 'Nand', 'Goundar', 'Naidu', 'Maharaj', 'Narayan', 'Deo', 'Raj', 'Pillay'],
  },
  'Fiji:muslim': {
    male: ['Mohammed', 'Abdul', 'Aiyaz', 'Faiyaz', 'Ahmed', 'Riaz', 'Irfan', 'Farouk', 'Yusuf', 'Hasan', 'Ali', 'Rafiq', 'Anwar', 'Javed', 'Kamal', 'Nazim', 'Salim', 'Imraz'],
    female: ['Fatima', 'Rubina', 'Shabana', 'Farzana', 'Shamima', 'Nasreen', 'Zarina', 'Salma', 'Rehana', 'Sabina', 'Amina', 'Aisha', 'Yasmin', 'Jamila', 'Parveen', 'Mumtaz', 'Zainab'],
    surnames: ['Khan', 'Ali', 'Mohammed', 'Hussain', 'Sahu Khan', 'Koya', 'Sayed-Khaiyum', 'Sharif', 'Ahmed', 'Hanif', 'Rahman', 'Shah', 'Buksh', 'Hakim', 'Yusuf', 'Ismail', 'Dean'],
  },

  // Guyana / Trinidad: Hindu Indo-Caribbean families.
  'Guyana:hindu': {
    male: ['Rajendra', 'Devindra', 'Ramnarine', 'Anil', 'Basdeo', 'Deodat', 'Hemraj', 'Lakeram', 'Pooran', 'Shivnarine', 'Vishnu', 'Bharrat', 'Dhanraj', 'Rohan', 'Ramesh', 'Ravi', 'Sase', 'Kamal', 'Chandra', 'Seepaul', 'Ramdat'],
    female: [...INDO_CARIBBEAN_HINDU_FEMALE, 'Gomti', 'Jasmattie'],
    surnames: ['Persaud', 'Singh', 'Ramdass', 'Sukhu', 'Boodhoo', 'Rampersaud', 'Jagdeo', 'Ramotar', 'Jagan', 'Narine', 'Lall', 'Ramnarine', 'Seepersaud', 'Chanderpaul', 'Kanhai', 'Sarwan', 'Deonarine', 'Budhram', 'Ramsammy', 'Doobay', 'Mangal', 'Latchman', 'Harripersaud'],
  },
  'Trinidad and Tobago:hindu': {
    male: ['Ravi', 'Anil', 'Ramesh', 'Surendra', 'Vijay', 'Devesh', 'Pradeep', 'Bharat', 'Deepak', 'Krishna', 'Basdeo', 'Sat', 'Rudranath', 'Dev', 'Sunil', 'Rajendra', 'Ramdath', 'Indar', 'Suruj'],
    female: [...INDO_CARIBBEAN_HINDU_FEMALE, 'Priya', 'Bhavna', 'Indu', 'Padma', 'Roshni', 'Uma', 'Vasantha', 'Indira', 'Kalawatie'],
    surnames: ['Ramkissoon', 'Ramsaran', 'Maharaj', 'Singh', 'Persad', 'Ramdhanie', 'Narine', 'Ramoutar', 'Seunarine', 'Bachan', 'Ramesar', 'Sookdeo', 'Harripersad', 'Ramkhalawan', 'Panday', 'Capildeo', 'Naipaul', 'Rampersad', 'Jagessar', 'Boodram', 'Mahabir', 'Sooklal', 'Dookeran', 'Ramlogan', 'Moonilal'],
  },
}

/** The key a character's family names are drawn under, or null. */
export function nameGroupFor(countryName, ethnicity, religion) {
  if (ethnicity && GROUP_NAMES[ethnicity]) return ethnicity
  const faith = String(religion ?? '').split('_')[0]
  const key = `${countryName}:${faith}`
  return faith && RELIGION_NAMES[key] ? key : null
}

export function namePoolFor(key) {
  return (key && (GROUP_NAMES[key] ?? RELIGION_NAMES[key])) || null
}
