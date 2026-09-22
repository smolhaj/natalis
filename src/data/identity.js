// identity.js — what a person's ethnicity implies about their religion.
//
// Written because character generation drew the two independently. Every
// country carries a `religionWeights` marginal and an `ethnicGroups` list, and
// the engine sampled from each without reference to the other, so it produced
// people who cannot exist:
//
//   Lhotshampa who are 67% Buddhist. The Lhotshampa ARE Bhutan's Hindu
//   population — that is the whole of why the 1990 expulsions happened and
//   the entire premise of the Bhutanese refugee arc in the corpus.
//   Bosniaks who are Catholic, in a corpus that writes the Bosnian war.
//   Dalits who are Muslim, in a corpus whose caste content assumes otherwise.
//   Sharchop who are 40% Hindu; Sinhalese who are Muslim; Copts who are Sunni.
//
// These are not edge cases. Identity-gated content is a large share of what
// this game is for, and a guard reading "Bosniak AND Muslim" was silently
// failing for a third of the Bosniaks the engine made.
//
// In most of the world ethnicity does not determine religion, and this file
// deliberately says nothing about those groups — the country marginal is the
// right answer for a Pole, a Brazilian, a Roma family (who take the religion
// of wherever they are), a white American. It lists only the groups where the
// two facts are actually entangled, and for those it gives the real conditional
// distribution rather than a certainty: Yoruba are genuinely split between
// Christianity and Islam, Oromo three ways, Lebanese and Albanians likewise,
// and flattening that would trade one wrong answer for another.
//
// Values are weights, normalised at draw time.

export const ETHNIC_RELIGION = {
  // ── South Asia ────────────────────────────────────────────────────────────
  // Caste is a Hindu institution; the Ambedkarite conversion to Buddhism from
  // 1956 and the Dalit Christian and Dalit Muslim minorities are all real and
  // all much smaller than the Hindu share.
  dalit: { hindu: 0.86, buddhist: 0.06, christian_catholic: 0.03, christian_protestant: 0.02, muslim_sunni: 0.02, sikh: 0.01 },
  dalit_nepal: { hindu: 0.92, buddhist: 0.04, christian_protestant: 0.03, muslim_sunni: 0.01 },
  brahmin: { hindu: 0.97, jain: 0.02, secular: 0.01 },
  kshatriya: { hindu: 0.84, muslim_sunni: 0.08, sikh: 0.05, jain: 0.02, christian_catholic: 0.01 },
  vaishya: { hindu: 0.80, jain: 0.08, muslim_sunni: 0.07, sikh: 0.03, christian_catholic: 0.02 },
  shudra: { hindu: 0.78, muslim_sunni: 0.15, christian_protestant: 0.03, sikh: 0.02, christian_catholic: 0.02 },
  adivasi: { hindu: 0.40, animist: 0.32, christian_protestant: 0.13, christian_catholic: 0.09, muslim_sunni: 0.06 },
  brahman_hill: { hindu: 0.99, buddhist: 0.01 },
  chhettri: { hindu: 0.98, buddhist: 0.02 },
  madurese: { muslim_sunni: 0.99, christian_protestant: 0.01 },
  newar: { hindu: 0.79, buddhist: 0.20, christian_protestant: 0.01 },
  tamang: { buddhist: 0.83, hindu: 0.13, christian_protestant: 0.04 },
  magar: { hindu: 0.66, buddhist: 0.27, christian_protestant: 0.07 },
  tharu: { hindu: 0.92, buddhist: 0.05, christian_protestant: 0.03 },
  punjabi: { muslim_sunni: 0.79, muslim_shia: 0.18, muslim_ahmadiyya: 0.01, christian_protestant: 0.02 },
  sindhi: { muslim_sunni: 0.76, muslim_shia: 0.16, hindu: 0.06, christian_protestant: 0.02 },
  muhajir: { muslim_sunni: 0.74, muslim_shia: 0.24, muslim_ahmadiyya: 0.02 },
  baloch: { muslim_sunni: 0.88, muslim_shia: 0.10, folk_religion: 0.02 },
  bihari: { muslim_sunni: 0.60, hindu: 0.40 },
  bengali: { muslim_sunni: 0.88, hindu: 0.11, christian_catholic: 0.01 },
  chakma: { buddhist: 0.94, hindu: 0.04, christian_protestant: 0.02 },
  sinhalese: { buddhist: 0.94, christian_catholic: 0.05, christian_protestant: 0.01 },
  sri_lankan_tamil: { hindu: 0.82, christian_catholic: 0.13, christian_protestant: 0.04, muslim_sunni: 0.01 },
  indian_tamil: { hindu: 0.88, christian_catholic: 0.08, christian_protestant: 0.04 },
  sri_lankan_moor: { muslim_sunni: 0.99, muslim_sufi: 0.01 },
  burgher: { christian_catholic: 0.55, christian_protestant: 0.40, christian_other: 0.05 },
  dhivehi: { muslim_sunni: 1.0 },

  // ── Bhutan ────────────────────────────────────────────────────────────────
  // The Lhotshampa are Bhutan's Nepali-speaking Hindu south. The 1988 census,
  // the dress code, and the expulsion of about a sixth of the population all
  // turn on that, and the engine was making two thirds of them Buddhist.
  lhotshampa: { hindu: 0.94, buddhist: 0.04, christian_protestant: 0.02 },
  ngalop: { buddhist: 0.99, hindu: 0.01 },
  sharchop: { buddhist: 0.96, hindu: 0.03, animist: 0.01 },
  indigenous_bhutan: { buddhist: 0.72, animist: 0.20, hindu: 0.08 },
  tibetan_bhutan: { buddhist: 0.99, hindu: 0.01 },
  tibetan: { buddhist: 0.97, muslim_sunni: 0.02, folk_religion: 0.01 },

  // ── Southeast Asia ────────────────────────────────────────────────────────
  // In Malaysia a Malay is constitutionally a Muslim; there is no other
  // permitted answer, which is itself the subject of several events.
  malay_malaysian: { muslim_sunni: 1.0 },
  malay_singaporean: { muslim_sunni: 0.99, christian_protestant: 0.01 },
  malay_thai: { muslim_sunni: 0.99, buddhist: 0.01 },
  chinese_malaysian: { buddhist: 0.83, christian_protestant: 0.07, christian_catholic: 0.04, folk_religion: 0.05, muslim_sunni: 0.01 },
  chinese_singaporean: { buddhist: 0.44, christian_protestant: 0.16, folk_religion: 0.18, christian_catholic: 0.08, secular: 0.14 },
  chinese_indonesian: { buddhist: 0.45, christian_protestant: 0.28, christian_catholic: 0.16, folk_religion: 0.09, muslim_sunni: 0.02 },
  chinese_thai: { buddhist: 0.93, christian_protestant: 0.04, folk_religion: 0.03 },
  indian_malaysian: { hindu: 0.85, christian_catholic: 0.05, christian_protestant: 0.04, muslim_sunni: 0.05, sikh: 0.01 },
  indian_singaporean: { hindu: 0.58, muslim_sunni: 0.22, christian_protestant: 0.11, sikh: 0.05, christian_catholic: 0.04 },
  javanese: { muslim_sunni: 0.96, christian_protestant: 0.02, christian_catholic: 0.01, folk_religion: 0.01 },
  sundanese: { muslim_sunni: 0.99, christian_protestant: 0.01 },
  betawi: { muslim_sunni: 0.98, christian_protestant: 0.02 },
  minangkabau: { muslim_sunni: 1.0 },
  makassae: { christian_catholic: 0.96, animist: 0.04 },
  batak: { christian_protestant: 0.62, muslim_sunni: 0.29, christian_catholic: 0.08, animist: 0.01 },
  balinese: { hindu: 0.94, muslim_sunni: 0.04, christian_protestant: 0.02 },
  papuan: { christian_protestant: 0.69, christian_catholic: 0.20, muslim_sunni: 0.07, animist: 0.04 },
  papuan_coastal: { christian_protestant: 0.62, christian_catholic: 0.30, animist: 0.08 },
  bamar: { buddhist: 0.94, christian_protestant: 0.02, muslim_sunni: 0.03, animist: 0.01 },
  rakhine: { buddhist: 0.96, muslim_sunni: 0.02, animist: 0.02 },
  rohingya: { muslim_sunni: 1.0 },
  karen: { buddhist: 0.62, christian_protestant: 0.30, animist: 0.08 },
  kachin: { christian_protestant: 0.83, christian_catholic: 0.10, buddhist: 0.04, animist: 0.03 },
  chin: { christian_protestant: 0.85, christian_catholic: 0.06, buddhist: 0.05, animist: 0.04 },
  shan: { buddhist: 0.95, christian_protestant: 0.03, animist: 0.02 },
  khmer: { buddhist: 0.97, muslim_sunni: 0.01, christian_catholic: 0.01, folk_religion: 0.01 },
  cham: { muslim_sunni: 0.95, hindu: 0.04, buddhist: 0.01 },
  chinese_cambodia: { buddhist: 0.84, folk_religion: 0.12, christian_protestant: 0.04 },
  vietnamese_cambodia: { buddhist: 0.72, folk_religion: 0.20, christian_catholic: 0.08 },
  kinh: { folk_religion: 0.34, buddhist: 0.38, secular: 0.19, christian_catholic: 0.08, christian_protestant: 0.01 },
  muong: { folk_religion: 0.72, buddhist: 0.22, christian_catholic: 0.06 },
  tay: { folk_religion: 0.78, buddhist: 0.16, christian_protestant: 0.06 },
  hmong: { animist: 0.58, christian_protestant: 0.28, folk_religion: 0.10, christian_catholic: 0.04 },
  hmong_viet: { animist: 0.62, christian_protestant: 0.28, folk_religion: 0.10 },
  khmu: { animist: 0.72, buddhist: 0.20, christian_protestant: 0.08 },
  lao_loum: { buddhist: 0.95, animist: 0.04, christian_protestant: 0.01 },
  lao_isan: { buddhist: 0.97, animist: 0.03 },
  phutai: { buddhist: 0.92, animist: 0.08 },
  thai: { buddhist: 0.96, muslim_sunni: 0.02, christian_protestant: 0.01, folk_religion: 0.01 },
  thai_viet: { buddhist: 0.85, christian_catholic: 0.13, folk_religion: 0.02 },
  hill_tribes: { animist: 0.52, buddhist: 0.28, christian_protestant: 0.20 },
  tagalog: { christian_catholic: 0.84, christian_protestant: 0.08, muslim_sunni: 0.02, christian_other: 0.06 },
  ilocano: { christian_catholic: 0.86, christian_protestant: 0.08, christian_other: 0.06 },
  bisaya: { christian_catholic: 0.85, christian_protestant: 0.09, christian_other: 0.06 },
  moro: { muslim_sunni: 0.97, christian_catholic: 0.02, animist: 0.01 },
  lumad: { animist: 0.42, christian_protestant: 0.30, christian_catholic: 0.26, muslim_sunni: 0.02 },
  tetum_timorese: { christian_catholic: 0.96, christian_protestant: 0.02, animist: 0.02 },
  mambai: { christian_catholic: 0.95, animist: 0.05 },
  kemak: { christian_catholic: 0.94, animist: 0.06 },
  bunak: { christian_catholic: 0.93, animist: 0.07 },

  // ── East and Central Asia ─────────────────────────────────────────────────
  uyghur: { muslim_sunni: 0.98, muslim_sufi: 0.01, secular: 0.01 },
  uyghur_kazakh: { muslim_sunni: 0.98, secular: 0.02 },
  hui_chinese: { muslim_sunni: 0.96, muslim_sufi: 0.03, secular: 0.01 },
  dungan_kyrgyz: { muslim_sunni: 0.97, secular: 0.03 },
  kazakh: { muslim_sunni: 0.86, secular: 0.11, atheist: 0.02, christian_orthodox: 0.01 },
  kazakh_turkmen: { muslim_sunni: 0.88, secular: 0.12 },
  kazakh_uzbek: { muslim_sunni: 0.88, secular: 0.12 },
  kyrgyz: { muslim_sunni: 0.86, secular: 0.11, atheist: 0.03 },
  uzbek: { muslim_sunni: 0.90, secular: 0.08, atheist: 0.02 },
  uzbek_afghan: { muslim_sunni: 0.98, muslim_shia: 0.02 },
  uzbek_kazakh: { muslim_sunni: 0.92, secular: 0.08 },
  uzbek_kyrgyz: { muslim_sunni: 0.93, secular: 0.07 },
  uzbek_tajik: { muslim_sunni: 0.94, secular: 0.06 },
  uzbek_turkmen: { muslim_sunni: 0.94, secular: 0.06 },
  turkmen: { muslim_sunni: 0.90, secular: 0.09, atheist: 0.01 },
  turkmen_iraqi: { muslim_sunni: 0.60, muslim_shia: 0.40 },
  karakalpak: { muslim_sunni: 0.92, secular: 0.08 },
  tajik: { muslim_sunni: 0.93, muslim_shia: 0.02, secular: 0.05 },
  tajik_afghan: { muslim_sunni: 0.97, muslim_shia: 0.03 },
  tajik_uzbek: { muslim_sunni: 0.94, secular: 0.06 },
  pamiri: { muslim_shia: 0.92, muslim_sunni: 0.06, secular: 0.02 },   // Ismaili
  tatar: { muslim_sunni: 0.80, christian_orthodox: 0.06, secular: 0.11, atheist: 0.03 },
  crimean_tatar: { muslim_sunni: 0.93, secular: 0.06, christian_orthodox: 0.01 },
  chechen: { muslim_sunni: 0.97, muslim_sufi: 0.02, secular: 0.01 },
  lezgian_azerbaijani: { muslim_sunni: 0.94, secular: 0.06 },
  mongol: { buddhist: 0.60, secular: 0.30, animist: 0.08, christian_protestant: 0.02 },
  other_mongol: { muslim_sunni: 0.70, buddhist: 0.20, secular: 0.10 },
  zhuang: { folk_religion: 0.72, buddhist: 0.16, secular: 0.10, christian_protestant: 0.02 },

  // ── Middle East and the Caucasus ──────────────────────────────────────────
  // Where the religious identity IS the ethnic identity, and the content
  // depends on it: the Copt, the Maronite, the Druze, the Yazidi, the Alawi.
  coptic_egyptian: { christian_orthodox: 0.95, christian_catholic: 0.04, christian_protestant: 0.01 },
  christian_syria: { christian_orthodox: 0.72, christian_catholic: 0.22, christian_protestant: 0.06 },
  druze_israel: { muslim_druze: 1.0 },
  druze_syria: { muslim_druze: 1.0 },
  alawi_syria: { muslim_alawi: 1.0 },
  yezidi_armenian: { yezidi: 1.0 },
  armenian: { christian_armenian: 0.93, christian_orthodox: 0.03, christian_catholic: 0.02, secular: 0.02 },
  armenian_azerbaijani: { christian_armenian: 0.96, secular: 0.04 },
  armenian_cypriot: { christian_armenian: 0.96, christian_catholic: 0.04 },
  armenian_georgian: { christian_armenian: 0.95, christian_orthodox: 0.05 },
  armenian_jordanian: { christian_armenian: 0.94, christian_orthodox: 0.06 },
  armenian_lebanese: { christian_armenian: 0.92, christian_catholic: 0.05, christian_protestant: 0.03 },
  other_armenian: { christian_armenian: 0.85, muslim_sunni: 0.06, yezidi: 0.05, secular: 0.04 },
  ashkenazi_jewish: { jewish: 0.97, secular: 0.03 },
  mizrahi_jewish: { jewish: 0.98, secular: 0.02 },
  haredi_jewish: { jewish: 1.0 },
  ethiopian_jewish: { jewish: 0.97, christian_orthodox: 0.03 },
  russian_jewish_israel: { jewish: 0.72, secular: 0.20, christian_orthodox: 0.08 },
  jewish_tunisian: { jewish: 1.0 },
  arab_citizen_israel: { muslim_sunni: 0.84, christian_orthodox: 0.05, christian_catholic: 0.04, muslim_druze: 0.07 },
  palestinian_arab: { muslim_sunni: 0.92, christian_orthodox: 0.05, christian_catholic: 0.03 },
  palestinian_jordanian: { muslim_sunni: 0.95, christian_orthodox: 0.04, christian_catholic: 0.01 },
  palestinian_lebanese: { muslim_sunni: 0.97, christian_orthodox: 0.03 },
  bedouin_palestinian: { muslim_sunni: 1.0 },
  arab_lebanese: { muslim_shia: 0.33, muslim_sunni: 0.31, christian_maronite: 0.23, christian_orthodox: 0.08, muslim_druze: 0.05 },
  other_lebanese: { muslim_sunni: 0.40, christian_orthodox: 0.30, muslim_druze: 0.15, christian_catholic: 0.15 },
  arab_iraqi_shia: { muslim_shia: 1.0 },
  arab_iraqi_sunni: { muslim_sunni: 1.0 },
  bahraini_shia: { muslim_shia: 1.0 },
  bahraini_sunni: { muslim_sunni: 1.0 },
  kurdish: { muslim_sunni: 0.82, muslim_shia: 0.15, yezidi: 0.02, christian_orthodox: 0.01 },   // muslim_other carries Alevi
  kurdish_iraqi: { muslim_sunni: 0.93, yezidi: 0.05, muslim_shia: 0.02 },
  kurdish_syria: { muslim_sunni: 0.96, yezidi: 0.03, christian_orthodox: 0.01 },
  kurd_iranian: { muslim_sunni: 0.88, muslim_shia: 0.09, yezidi: 0.03 },
  persian: { muslim_shia: 0.93, muslim_sunni: 0.02, secular: 0.04, zoroastrian: 0.01 },
  azerbaijani: { muslim_shia: 0.66, muslim_sunni: 0.26, secular: 0.08 },
  azerbaijani_georgian: { muslim_shia: 0.70, muslim_sunni: 0.24, secular: 0.06 },
  azerbaijani_iranian: { muslim_shia: 0.94, muslim_sunni: 0.04, secular: 0.02 },
  arab_iranian: { muslim_shia: 0.72, muslim_sunni: 0.26, secular: 0.02 },
  baloch_iranian: { muslim_sunni: 0.97, muslim_shia: 0.03 },
  hazara: { muslim_shia: 0.94, muslim_sunni: 0.06 },
  hazara_pakistani: { muslim_shia: 0.96, muslim_sunni: 0.04 },
  pashtun: { muslim_sunni: 0.94, muslim_shia: 0.06 },
  circassian: { muslim_sunni: 0.97, christian_orthodox: 0.03 },
  georgian: { christian_orthodox: 0.86, muslim_sunni: 0.06, secular: 0.07, christian_armenian: 0.01 },
  bedouin: { muslim_sunni: 1.0 },
  bedouin_egyptian: { muslim_sunni: 1.0 },
  bedouin_jordanian: { muslim_sunni: 1.0 },
  jibbali_omani: { muslim_sunni: 0.60, muslim_other: 0.40 },   // Ibadi sits under muslim_other
  baluchi_omani: { muslim_sunni: 0.95, muslim_other: 0.05 },
  lawati_omani: { muslim_shia: 0.94, muslim_other: 0.06 },
  zanzibari_omani: { muslim_other: 0.55, muslim_sunni: 0.43, muslim_sufi: 0.02 },
  omani_arab: { muslim_other: 0.60, muslim_sunni: 0.35, muslim_shia: 0.05 },
  muhammashin: { muslim_sunni: 0.60, muslim_shia: 0.40 },
  afro_arab_yemeni: { muslim_sunni: 0.65, muslim_shia: 0.35 },
  arab_yemeni: { muslim_sunni: 0.60, muslim_shia: 0.40 },      // Zaydi
  arab_saudi: { muslim_sunni: 0.90, muslim_shia: 0.10 },
  arab_syrian: { muslim_sunni: 0.80, muslim_shia: 0.09, muslim_alawi: 0.05, christian_orthodox: 0.04, muslim_druze: 0.02 },
  arab_jordanian: { muslim_sunni: 0.95, christian_orthodox: 0.04, christian_catholic: 0.01 },
  arab_turkish: { muslim_sunni: 0.92, muslim_shia: 0.07, christian_orthodox: 0.01 },
  turkish: { muslim_sunni: 0.80, muslim_shia: 0.11, secular: 0.08, atheist: 0.01 },   // muslim_other carries Alevi
  turkish_cypriot: { muslim_sunni: 0.94, secular: 0.06 },
  greek_cypriot: { christian_orthodox: 0.96, secular: 0.03, christian_catholic: 0.01 },
  turkish_bulgarian: { muslim_sunni: 0.96, secular: 0.04 },
  sahrawi: { muslim_sunni: 1.0 },

  // ── The Balkans and Eastern Europe, where the label carries the church ────
  bosniak: { muslim_sunni: 0.96, secular: 0.03, muslim_sufi: 0.01 },
  bosniak_croatia: { muslim_sunni: 0.96, secular: 0.04 },
  bosniak_serbian: { muslim_sunni: 0.97, secular: 0.03 },
  bosniak_slovenia: { muslim_sunni: 0.93, secular: 0.07 },
  serb: { christian_orthodox: 0.91, secular: 0.06, atheist: 0.02, christian_catholic: 0.01 },
  serb_croatia: { christian_orthodox: 0.94, secular: 0.05, christian_catholic: 0.01 },
  serb_slovenia: { christian_orthodox: 0.92, secular: 0.08 },
  bosnian_serb: { christian_orthodox: 0.95, secular: 0.05 },
  croat: { christian_catholic: 0.93, secular: 0.05, atheist: 0.02 },
  croat_slovenia: { christian_catholic: 0.92, secular: 0.08 },
  bosnian_croat: { christian_catholic: 0.96, secular: 0.04 },
  albanian: { muslim_sunni: 0.55, secular: 0.20, christian_orthodox: 0.13, christian_catholic: 0.10, muslim_sufi: 0.02 },   // Bektashi under muslim_other
  albanian_greek: { christian_orthodox: 0.55, muslim_sunni: 0.40, secular: 0.05 },
  albanian_serbian: { muslim_sunni: 0.93, christian_catholic: 0.05, christian_orthodox: 0.02 },
  greek_albanian: { christian_orthodox: 0.96, secular: 0.04 },
  muslim_greek: { muslim_sunni: 1.0 },
  polish_belarusian: { christian_catholic: 0.88, christian_orthodox: 0.08, secular: 0.04 },
  polish_lithuanian: { christian_catholic: 0.93, secular: 0.07 },
  polish_iceland: { christian_catholic: 0.85, secular: 0.15 },
  hungarian_romanian: { christian_catholic: 0.52, christian_protestant: 0.38, secular: 0.10 },
  hungarian_slovenia: { christian_catholic: 0.62, christian_protestant: 0.24, secular: 0.14 },
  hungarian_serbian: { christian_catholic: 0.85, christian_protestant: 0.08, secular: 0.07 },
  hungarian_slovak: { christian_catholic: 0.75, christian_protestant: 0.13, secular: 0.12 },
  russian_ukrainian: { christian_orthodox: 0.72, secular: 0.20, atheist: 0.08 },
  russian_estonian: { christian_orthodox: 0.34, secular: 0.48, atheist: 0.18 },
  russian_latvian: { christian_orthodox: 0.40, secular: 0.44, atheist: 0.16 },
  russian_lithuanian: { christian_orthodox: 0.52, secular: 0.36, atheist: 0.12 },
  russian_moldova: { christian_orthodox: 0.82, secular: 0.14, atheist: 0.04 },
  gagauz: { christian_orthodox: 0.93, secular: 0.07 },
  romanian_moldova: { christian_orthodox: 0.93, secular: 0.06, christian_protestant: 0.01 },
  bulgarian_moldova: { christian_orthodox: 0.94, secular: 0.06 },
  ukrainian_moldova: { christian_orthodox: 0.92, secular: 0.08 },

  // ── Africa ────────────────────────────────────────────────────────────────
  // The Sahel belt is Muslim; the forest and the south are Christian; the line
  // between them runs through Nigeria, Côte d'Ivoire, Chad and Ethiopia and is
  // most of their politics, so it is drawn here rather than left to a national
  // average that describes nobody.
  hausa_fulani: { muslim_sunni: 0.96, muslim_sufi: 0.02, christian_protestant: 0.02 },
  hausa_cameroon: { muslim_sunni: 0.97, animist: 0.03 },
  hausa_niger: { muslim_sunni: 0.98, animist: 0.02 },
  kanuri: { muslim_sunni: 0.99, animist: 0.01 },
  kanuri_niger: { muslim_sunni: 0.99, animist: 0.01 },
  kanembu_chad: { muslim_sunni: 0.99, animist: 0.01 },
  fulani_benin: { muslim_sunni: 0.94, animist: 0.06 },
  fulani_burkina: { muslim_sunni: 0.96, animist: 0.04 },
  fulani_cameroon: { muslim_sunni: 0.96, animist: 0.04 },
  fulani_chad: { muslim_sunni: 0.98, animist: 0.02 },
  fulani_mali: { muslim_sunni: 0.96, animist: 0.04 },
  fulani_niger: { muslim_sunni: 0.97, animist: 0.03 },
  fula_guinean: { muslim_sunni: 0.97, animist: 0.02, christian_protestant: 0.01 },
  fula_senegal: { muslim_sunni: 0.98, christian_catholic: 0.01, animist: 0.01 },
  igbo: { christian_catholic: 0.53, christian_pentecostal: 0.25, christian_protestant: 0.16, animist: 0.05, muslim_sunni: 0.01 },
  yoruba: { christian_protestant: 0.24, christian_pentecostal: 0.18, christian_catholic: 0.12, muslim_sunni: 0.42, animist: 0.04 },
  yoruba_benin: { muslim_sunni: 0.44, christian_catholic: 0.24, animist: 0.22, christian_protestant: 0.10 },
  ijaw: { christian_protestant: 0.45, christian_pentecostal: 0.28, christian_catholic: 0.15, animist: 0.12 },
  tuareg_burkina: { muslim_sunni: 0.99, animist: 0.01 },
  tuareg_mali: { muslim_sunni: 0.99, animist: 0.01 },
  tuareg_niger: { muslim_sunni: 0.99, animist: 0.01 },
  songhai_mali: { muslim_sunni: 0.97, animist: 0.03 },
  zarma_songhai: { muslim_sunni: 0.98, animist: 0.02 },
  sarakole_mali: { muslim_sunni: 0.99, animist: 0.01 },
  bambara: { muslim_sunni: 0.90, animist: 0.08, christian_catholic: 0.02 },
  malinke_mali: { muslim_sunni: 0.95, animist: 0.04, christian_catholic: 0.01 },
  mandinka: { muslim_sunni: 0.96, christian_catholic: 0.02, animist: 0.02 },
  mandinka_guinean: { muslim_sunni: 0.97, animist: 0.03 },
  malinke_ci: { muslim_sunni: 0.93, christian_catholic: 0.04, animist: 0.03 },
  dioula_manding: { muslim_sunni: 0.96, animist: 0.03, christian_catholic: 0.01 },
  susu_guinean: { muslim_sunni: 0.97, animist: 0.02, christian_protestant: 0.01 },
  susu_sl: { muslim_sunni: 0.96, animist: 0.03, christian_protestant: 0.01 },
  wolof: { muslim_sunni: 0.94, muslim_sufi: 0.04, christian_catholic: 0.02 },   // Mouride and Tijani
  serer: { muslim_sunni: 0.82, muslim_sufi: 0.03, christian_catholic: 0.13, animist: 0.02 },
  diola: { muslim_sunni: 0.62, christian_catholic: 0.30, animist: 0.08 },
  mossi: { muslim_sunni: 0.60, christian_catholic: 0.22, animist: 0.15, christian_protestant: 0.03 },
  dogon: { animist: 0.45, muslim_sunni: 0.40, christian_catholic: 0.15 },
  senufo: { animist: 0.42, muslim_sunni: 0.34, christian_catholic: 0.24 },
  senufo_mali: { animist: 0.45, muslim_sunni: 0.40, christian_catholic: 0.15 },
  bobo: { animist: 0.44, muslim_sunni: 0.32, christian_catholic: 0.24 },
  lobi_burkina: { animist: 0.62, christian_catholic: 0.22, muslim_sunni: 0.16 },
  gurma: { animist: 0.45, muslim_sunni: 0.32, christian_catholic: 0.23 },
  somali_darod: { muslim_sunni: 1.0 },
  somali_dir: { muslim_sunni: 1.0 },
  somali_hawiye: { muslim_sunni: 1.0 },
  somali_isaaq: { muslim_sunni: 1.0 },
  somali_issa: { muslim_sunni: 1.0 },
  somali_other: { muslim_sunni: 1.0 },
  somali_eth: { muslim_sunni: 0.99, christian_orthodox: 0.01 },
  afar_djibouti: { muslim_sunni: 1.0 },
  afar_eritrean: { muslim_sunni: 1.0 },
  saho: { muslim_sunni: 0.97, christian_orthodox: 0.03 },
  beja: { muslim_sunni: 1.0 },
  nubian: { muslim_sunni: 0.99, christian_orthodox: 0.01 },
  fur: { muslim_sunni: 1.0 },
  masalit: { muslim_sunni: 1.0 },
  zaghawa: { muslim_sunni: 1.0 },
  zaghawa_chad: { muslim_sunni: 1.0 },
  toubou_chad: { muslim_sunni: 1.0 },
  ouaddai_chad: { muslim_sunni: 1.0 },
  hadjerai_chad: { muslim_sunni: 0.85, animist: 0.10, christian_catholic: 0.05 },
  arab_chadian: { muslim_sunni: 1.0 },
  arab_sudanese: { muslim_sunni: 0.99, christian_orthodox: 0.01 },
  arab_algerian: { muslim_sunni: 0.99, muslim_other: 0.01 },
  arab_moroccan: { muslim_sunni: 0.99, jewish: 0.01 },
  arab_tunisian: { muslim_sunni: 0.99, jewish: 0.01 },
  arab_libyan: { muslim_sunni: 1.0 },
  egyptian_arab: { muslim_sunni: 0.94, christian_orthodox: 0.05, muslim_sufi: 0.01 },
  berber_amazigh: { muslim_sunni: 0.98, christian_protestant: 0.01, jewish: 0.01 },
  berber_kabyle: { muslim_sunni: 0.94, christian_protestant: 0.04, secular: 0.02 },
  berber_libyan: { muslim_sunni: 0.97, muslim_other: 0.03 },   // Ibadi in the Nafusa
  berber_other: { muslim_sunni: 0.99, christian_protestant: 0.01 },
  berber_tunisian: { muslim_sunni: 1.0 },
  arab_berber_mixed: { muslim_sunni: 0.99, jewish: 0.01 },
  arab_berber_mixed_tunisian: { muslim_sunni: 0.99, jewish: 0.01 },
  nuba: { muslim_sunni: 0.52, christian_protestant: 0.24, animist: 0.18, christian_catholic: 0.06 },
  amhara: { christian_orthodox: 0.88, muslim_sunni: 0.10, christian_protestant: 0.02 },
  tigrinya_eth: { christian_orthodox: 0.94, muslim_sunni: 0.05, christian_catholic: 0.01 },
  tigrinya_eritrean: { christian_orthodox: 0.93, christian_catholic: 0.04, christian_protestant: 0.02, muslim_sunni: 0.01 },
  tigre_eritrean: { muslim_sunni: 0.96, christian_orthodox: 0.04 },
  oromo: { muslim_sunni: 0.47, christian_orthodox: 0.30, christian_protestant: 0.20, animist: 0.03 },
  sidama: { christian_protestant: 0.66, muslim_sunni: 0.16, christian_orthodox: 0.13, animist: 0.05 },
  kikuyu: { christian_protestant: 0.40, christian_catholic: 0.26, christian_evangelical: 0.28, animist: 0.06 },
  luo: { christian_protestant: 0.34, christian_catholic: 0.30, christian_evangelical: 0.24, animist: 0.12 },
  luhya: { christian_protestant: 0.36, christian_catholic: 0.28, christian_evangelical: 0.24, muslim_sunni: 0.06, animist: 0.06 },
  kalenjin: { christian_protestant: 0.42, christian_catholic: 0.22, christian_evangelical: 0.28, animist: 0.08 },
  kamba: { christian_protestant: 0.36, christian_catholic: 0.28, christian_evangelical: 0.26, animist: 0.10 },
  maasai: { animist: 0.44, christian_protestant: 0.22, christian_catholic: 0.18, christian_evangelical: 0.14, muslim_sunni: 0.02 },
  baganda: { christian_catholic: 0.42, christian_protestant: 0.36, muslim_sunni: 0.16, christian_pentecostal: 0.06 },
  banyankole: { christian_catholic: 0.46, christian_protestant: 0.40, christian_pentecostal: 0.12, muslim_sunni: 0.02 },
  basoga: { christian_protestant: 0.42, christian_catholic: 0.34, muslim_sunni: 0.18, christian_pentecostal: 0.06 },
  bakiga: { christian_catholic: 0.48, christian_protestant: 0.40, christian_pentecostal: 0.12 },
  acholi: { christian_catholic: 0.64, christian_protestant: 0.26, christian_pentecostal: 0.08, animist: 0.02 },
  langi: { christian_protestant: 0.44, christian_catholic: 0.40, muslim_sunni: 0.10, christian_pentecostal: 0.06 },
  hutu: { christian_catholic: 0.46, christian_protestant: 0.40, animist: 0.08, muslim_sunni: 0.02, secular: 0.04 },
  tutsi: { christian_catholic: 0.46, christian_protestant: 0.40, animist: 0.08, muslim_sunni: 0.02, secular: 0.04 },
  twa: { christian_catholic: 0.42, christian_protestant: 0.34, animist: 0.18, secular: 0.06 },
  akan: { christian_protestant: 0.42, christian_pentecostal: 0.28, christian_catholic: 0.12, animist: 0.14, muslim_sunni: 0.04 },
  akan_agni: { christian_catholic: 0.42, christian_protestant: 0.24, animist: 0.22, muslim_sunni: 0.12 },
  akan_baule: { christian_catholic: 0.40, animist: 0.28, christian_protestant: 0.20, muslim_sunni: 0.12 },
  ga_dangme: { christian_protestant: 0.40, christian_pentecostal: 0.28, christian_catholic: 0.12, animist: 0.16, muslim_sunni: 0.04 },
  ewe: { christian_protestant: 0.38, christian_pentecostal: 0.24, animist: 0.22, christian_catholic: 0.12, muslim_sunni: 0.04 },
  ewe_togo: { christian_catholic: 0.32, animist: 0.30, christian_protestant: 0.24, muslim_sunni: 0.14 },
  mole_dagbani: { muslim_sunni: 0.62, christian_protestant: 0.16, animist: 0.14, christian_catholic: 0.08 },
  kabye_togo: { animist: 0.42, christian_catholic: 0.30, muslim_sunni: 0.16, christian_protestant: 0.12 },
  kotokoli_togo: { muslim_sunni: 0.92, animist: 0.05, christian_catholic: 0.03 },
  fon_benin: { animist: 0.34, christian_catholic: 0.32, christian_protestant: 0.20, muslim_sunni: 0.08, secular: 0.06 },
  adja_benin: { animist: 0.36, christian_catholic: 0.30, christian_protestant: 0.20, muslim_sunni: 0.08, secular: 0.06 },
  bariba_benin: { muslim_sunni: 0.72, animist: 0.18, christian_catholic: 0.10 },
  somba_benin: { animist: 0.44, christian_catholic: 0.28, muslim_sunni: 0.20, christian_protestant: 0.08 },
  bamileke: { christian_catholic: 0.34, christian_protestant: 0.28, animist: 0.26, christian_pentecostal: 0.10, muslim_sunni: 0.02 },
  beti_ewondo: { christian_catholic: 0.48, christian_protestant: 0.22, animist: 0.22, christian_pentecostal: 0.08 },
  anglophone_northwest: { christian_protestant: 0.38, christian_catholic: 0.28, animist: 0.24, christian_pentecostal: 0.08, muslim_sunni: 0.02 },
  anglophone_southwest: { christian_protestant: 0.36, christian_catholic: 0.30, animist: 0.24, christian_pentecostal: 0.10 },
  bakongo: { christian_catholic: 0.44, christian_kimbanguist: 0.18, christian_protestant: 0.22, christian_pentecostal: 0.12, animist: 0.04 },
  kongo: { christian_catholic: 0.46, christian_kimbanguist: 0.16, christian_protestant: 0.24, animist: 0.14 },
  luba: { christian_catholic: 0.50, christian_protestant: 0.30, christian_pentecostal: 0.14, animist: 0.06 },
  mongo: { christian_catholic: 0.52, christian_protestant: 0.30, animist: 0.12, christian_pentecostal: 0.06 },
  azande: { christian_catholic: 0.48, christian_protestant: 0.34, animist: 0.18 },
  ovimbundu: { christian_catholic: 0.42, christian_protestant: 0.42, animist: 0.12, christian_pentecostal: 0.04 },
  ambundu: { christian_catholic: 0.52, christian_protestant: 0.32, animist: 0.12, christian_pentecostal: 0.04 },
  lunda_chokwe: { christian_catholic: 0.50, christian_protestant: 0.32, animist: 0.18 },
  mestico_angola: { christian_catholic: 0.72, christian_protestant: 0.18, secular: 0.10 },
  makua: { muslim_sunni: 0.42, christian_catholic: 0.30, animist: 0.20, christian_protestant: 0.08 },
  makonde: { muslim_sunni: 0.38, christian_catholic: 0.34, animist: 0.22, christian_protestant: 0.06 },
  tsonga_mozambique: { christian_protestant: 0.38, christian_catholic: 0.30, animist: 0.24, christian_pentecostal: 0.08 },
  shona_mozambique: { christian_protestant: 0.40, christian_catholic: 0.28, animist: 0.24, christian_pentecostal: 0.08 },
  shona: { christian_protestant: 0.70, christian_catholic: 0.07, animist: 0.13, secular: 0.06, folk_religion: 0.04 },
  ndebele: { christian_protestant: 0.70, christian_catholic: 0.09, animist: 0.12, secular: 0.06, folk_religion: 0.03 },
  sukuma: { christian_catholic: 0.36, animist: 0.26, christian_protestant: 0.20, muslim_sunni: 0.18 },
  chagga: { christian_catholic: 0.42, christian_protestant: 0.32, muslim_sunni: 0.18, animist: 0.08 },
  hehe: { christian_catholic: 0.40, christian_protestant: 0.26, muslim_sunni: 0.22, animist: 0.12 },
  ha: { christian_catholic: 0.48, christian_protestant: 0.22, muslim_sunni: 0.18, animist: 0.12 },
  bemba: { christian_protestant: 0.50, christian_catholic: 0.22, christian_evangelical: 0.20, animist: 0.08 },
  tonga_zambia: { christian_protestant: 0.48, christian_catholic: 0.20, christian_evangelical: 0.20, animist: 0.12 },
  lozi: { christian_protestant: 0.52, christian_catholic: 0.18, christian_evangelical: 0.20, animist: 0.10 },
  chewa_zambia: { christian_protestant: 0.44, christian_catholic: 0.26, christian_evangelical: 0.18, animist: 0.12 },
  ngoni_zambia: { christian_protestant: 0.46, christian_catholic: 0.24, christian_evangelical: 0.18, animist: 0.12 },
  tumbuka_zambia: { christian_protestant: 0.54, christian_catholic: 0.18, christian_evangelical: 0.18, animist: 0.10 },
  nsenga: { christian_protestant: 0.46, christian_catholic: 0.24, christian_evangelical: 0.18, animist: 0.12 },
  maravi: { christian_catholic: 0.44, christian_protestant: 0.32, muslim_sunni: 0.12, animist: 0.12 },
  ovambo: { christian_lutheran: 0.62, christian_catholic: 0.16, christian_other: 0.14, animist: 0.08 },
  kavango: { christian_catholic: 0.40, christian_lutheran: 0.32, christian_other: 0.16, animist: 0.12 },
  herero: { christian_lutheran: 0.42, christian_catholic: 0.20, christian_other: 0.16, animist: 0.22 },
  damara: { christian_lutheran: 0.48, christian_catholic: 0.20, christian_other: 0.18, animist: 0.14 },
  nama: { christian_lutheran: 0.46, christian_catholic: 0.18, christian_other: 0.18, animist: 0.18 },
  san: { animist: 0.48, christian_lutheran: 0.22, christian_catholic: 0.14, christian_other: 0.16 },
  krio: { christian_protestant: 0.52, christian_methodist: 0.20, muslim_sunni: 0.22, christian_catholic: 0.06 },
  temne: { muslim_sunni: 0.85, christian_protestant: 0.09, animist: 0.04, christian_catholic: 0.02 },
  mende: { muslim_sunni: 0.60, christian_protestant: 0.26, animist: 0.08, christian_catholic: 0.06 },
  limba: { muslim_sunni: 0.62, christian_protestant: 0.26, animist: 0.12 },
  loko: { muslim_sunni: 0.72, christian_protestant: 0.20, animist: 0.08 },
  kono_sl: { muslim_sunni: 0.68, christian_protestant: 0.24, animist: 0.08 },
  kuranko: { muslim_sunni: 0.88, animist: 0.08, christian_protestant: 0.04 },
  yalunka: { muslim_sunni: 0.92, animist: 0.06, christian_protestant: 0.02 },
  kissi_guinean: { christian_protestant: 0.42, animist: 0.32, muslim_sunni: 0.20, christian_catholic: 0.06 },
  kpelle: { christian_protestant: 0.48, animist: 0.26, muslim_sunni: 0.20, christian_catholic: 0.06 },
  bassa: { christian_protestant: 0.62, animist: 0.22, christian_catholic: 0.10, muslim_sunni: 0.06 },
  gio: { christian_protestant: 0.52, animist: 0.28, muslim_sunni: 0.14, christian_catholic: 0.06 },
  mano: { christian_protestant: 0.50, animist: 0.28, muslim_sunni: 0.16, christian_catholic: 0.06 },
  grebo: { christian_protestant: 0.64, animist: 0.20, christian_catholic: 0.12, muslim_sunni: 0.04 },
  kru_bete: { christian_protestant: 0.40, christian_catholic: 0.26, animist: 0.22, muslim_sunni: 0.12 },
  americo_liberian: { christian_protestant: 0.62, christian_methodist: 0.24, christian_catholic: 0.10, christian_pentecostal: 0.04 },
  black_south_african: { christian_protestant: 0.34, christian_zionist: 0.22, christian_catholic: 0.10, animist: 0.08, secular: 0.16, atheist: 0.09, muslim_sunni: 0.01 },
  coloured_south_african: { christian_protestant: 0.50, christian_catholic: 0.12, muslim_sunni: 0.14, secular: 0.16, atheist: 0.08 },
  indian_south_african: { hindu: 0.56, muslim_sunni: 0.24, christian_protestant: 0.14, christian_catholic: 0.06 },
  white_south_african: { christian_protestant: 0.62, christian_catholic: 0.12, secular: 0.20, jewish: 0.06 },
  white_zimbabwe: { christian_protestant: 0.62, christian_catholic: 0.18, secular: 0.20 },
  white_namibian: { christian_lutheran: 0.54, christian_catholic: 0.18, christian_other: 0.12, secular: 0.16 },
  asian_ugandan: { hindu: 0.52, muslim_sunni: 0.24, sikh: 0.10, christian_protestant: 0.14 },

  // ── The Americas and the Pacific ──────────────────────────────────────────
  itaukei: { christian_protestant: 0.56, christian_methodist: 0.16, christian_catholic: 0.16, christian_pentecostal: 0.10, animist: 0.02 },
  indo_fijian: { hindu: 0.76, muslim_sunni: 0.16, christian_protestant: 0.06, sikh: 0.02 },
  indo_trinidadian: { hindu: 0.48, christian_protestant: 0.18, muslim_sunni: 0.14, christian_catholic: 0.12, christian_other: 0.08 },
  indo_guyanese: { hindu: 0.48, christian_protestant: 0.22, muslim_sunni: 0.14, christian_pentecostal: 0.10, christian_catholic: 0.04, christian_other: 0.02 },
  indo_jamaican: { hindu: 0.34, christian_protestant: 0.34, christian_other: 0.14, muslim_sunni: 0.10, secular: 0.08 },
  indo_barbadian: { hindu: 0.40, muslim_sunni: 0.34, christian_protestant: 0.26 },
  east_indian_belizean: { hindu: 0.42, christian_catholic: 0.36, christian_protestant: 0.22 },
  mennonite_belizean: { christian_protestant: 1.0 },
  afro_jamaican: { christian_protestant: 0.45, christian_pentecostal: 0.21, christian_other: 0.19, secular: 0.14, rastafari: 0.01 },
  afro_cuban: { christian_catholic: 0.42, folk_religion: 0.30, secular: 0.22, christian_protestant: 0.06 },   // Santería
  afro_haitian: { christian_catholic: 0.55, christian_protestant: 0.30, animist: 0.10, secular: 0.05 },
  maori: { christian_protestant: 0.34, christian_other: 0.16, secular: 0.44, christian_catholic: 0.06 },   // Rātana and Ringatū
  pacific_islander: { christian_protestant: 0.44, christian_catholic: 0.26, christian_methodist: 0.20, christian_pentecostal: 0.10 },
  samoan: { christian_protestant: 0.50, christian_catholic: 0.19, christian_methodist: 0.13, christian_evangelical: 0.12, christian_other: 0.06 },
  i_kiribati: { christian_catholic: 0.56, christian_protestant: 0.36, christian_other: 0.08 },
  tuvaluan: { christian_protestant: 0.92, christian_catholic: 0.03, christian_other: 0.05 },
  marshallese: { christian_protestant: 0.54, christian_evangelical: 0.20, christian_other: 0.18, christian_catholic: 0.08 },
  ni_vanuatu: { christian_protestant: 0.60, christian_pentecostal: 0.16, christian_catholic: 0.14, folk_religion: 0.10 },
  banaban: { christian_catholic: 0.52, christian_protestant: 0.44, christian_other: 0.04 },
  highlands_png: { christian_protestant: 0.32, christian_catholic: 0.26, christian_evangelical: 0.18, animist: 0.24 },
  momase: { christian_protestant: 0.32, christian_catholic: 0.28, christian_evangelical: 0.18, animist: 0.22 },
  islands_bougainville: { christian_catholic: 0.50, christian_protestant: 0.26, christian_evangelical: 0.14, animist: 0.10 },
  aboriginal: { christian_protestant: 0.32, christian_catholic: 0.24, animist: 0.14, secular: 0.30 },
  first_nations: { christian_catholic: 0.34, christian_protestant: 0.24, animist: 0.14, secular: 0.28 },
  garifuna: { christian_catholic: 0.62, folk_religion: 0.16, christian_protestant: 0.22 },
  garifuna_belizean: { christian_catholic: 0.60, folk_religion: 0.16, christian_protestant: 0.24 },
  garifuna_honduran: { christian_catholic: 0.64, folk_religion: 0.14, christian_protestant: 0.22 },

  // ── Diasporas whose religion travelled with them ──────────────────────────
  turkish_german: { muslim_sunni: 0.80, muslim_other: 0.12, secular: 0.07, christian_protestant: 0.01 },
  turkish_dutch: { muslim_sunni: 0.84, muslim_other: 0.08, secular: 0.08 },
  turkish_belgian: { muslim_sunni: 0.86, muslim_other: 0.07, secular: 0.07 },
  turkish_danish: { muslim_sunni: 0.86, muslim_other: 0.06, secular: 0.08 },
  turkish_austrian: { muslim_sunni: 0.84, muslim_other: 0.08, secular: 0.08 },
  moroccan_dutch: { muslim_sunni: 0.92, secular: 0.08 },
  moroccan_belgian: { muslim_sunni: 0.92, secular: 0.08 },
  moroccan_spanish: { muslim_sunni: 0.94, secular: 0.06 },
  moroccan_italian: { muslim_sunni: 0.93, secular: 0.07 },
  arab_danish: { muslim_sunni: 0.86, christian_orthodox: 0.06, secular: 0.08 },
  north_african: { muslim_sunni: 0.86, secular: 0.10, jewish: 0.02, christian_catholic: 0.02 },
  south_asian_british: { muslim_sunni: 0.52, hindu: 0.24, sikh: 0.18, christian_protestant: 0.04, christian_catholic: 0.02 },
  south_asian_canadian: { sikh: 0.32, hindu: 0.28, muslim_sunni: 0.26, christian_catholic: 0.08, christian_protestant: 0.06 },
  south_asian_bahrain: { hindu: 0.30, muslim_sunni: 0.44, christian_catholic: 0.12, muslim_shia: 0.06, sikh: 0.04, buddhist: 0.04 },
  south_asian_kuwait: { muslim_sunni: 0.48, hindu: 0.26, christian_catholic: 0.14, muslim_shia: 0.08, sikh: 0.04 },
  south_asian_omani: { hindu: 0.30, muslim_sunni: 0.46, christian_catholic: 0.14, muslim_shia: 0.04, sikh: 0.04, buddhist: 0.02 },
  south_asian_qatar: { muslim_sunni: 0.46, hindu: 0.26, christian_catholic: 0.10, buddhist: 0.10, muslim_shia: 0.04, sikh: 0.04 },
  south_asian_uae: { muslim_sunni: 0.50, hindu: 0.26, christian_catholic: 0.12, buddhist: 0.04, muslim_shia: 0.04, sikh: 0.04 },
  south_asian_worker: { hindu: 0.28, muslim_sunni: 0.46, christian_catholic: 0.14, muslim_shia: 0.04, sikh: 0.04, buddhist: 0.04 },
  filipino_qatar: { christian_catholic: 0.84, christian_protestant: 0.10, muslim_sunni: 0.06 },
  surinamese_dutch: { hindu: 0.30, christian_protestant: 0.28, muslim_sunni: 0.18, christian_catholic: 0.18, folk_religion: 0.06 },
  cape_verdean_portuguese: { christian_catholic: 0.86, christian_protestant: 0.10, secular: 0.04 },
  angolan_portuguese: { christian_catholic: 0.72, christian_protestant: 0.22, secular: 0.06 },
  sami: { christian_lutheran: 0.72, christian_protestant: 0.08, secular: 0.16, animist: 0.04 },
  sami_finland: { christian_lutheran: 0.76, secular: 0.18, animist: 0.06 },
  nikkei: { christian_catholic: 0.64, buddhist: 0.20, christian_protestant: 0.10, secular: 0.06 },
  korean_japanese: { christian_protestant: 0.30, buddhist: 0.22, secular: 0.42, christian_catholic: 0.06 },

  // ── Groups that were inheriting somebody else's national average ──────────
  // An unmapped group takes the country marginal, which is the right default
  // only where that marginal describes it. These are the cases where it
  // emphatically does not: the Slavic minorities of Muslim-majority Central
  // Asia, the Christian south of Chad and the CAR, the Afro-Caribbean
  // populations of Hindu-plurality Guyana and Trinidad, and the Gulf citizen
  // and expatriate blocs, whose national figures are an average of two
  // populations that share almost nothing.
  russian_kazakh: { christian_orthodox: 0.62, secular: 0.30, atheist: 0.08 },
  russian_kyrgyz: { christian_orthodox: 0.64, secular: 0.28, atheist: 0.08 },
  russian_uzbek: { christian_orthodox: 0.66, secular: 0.26, atheist: 0.08 },
  russian_turkmen: { christian_orthodox: 0.68, secular: 0.26, atheist: 0.06 },
  russian_azerbaijani: { christian_orthodox: 0.66, secular: 0.26, atheist: 0.08 },
  russian_georgian: { christian_orthodox: 0.82, secular: 0.14, atheist: 0.04 },
  russian_belarusian: { christian_orthodox: 0.76, secular: 0.18, atheist: 0.06 },
  ukrainian_kazakh: { christian_orthodox: 0.66, christian_catholic: 0.08, secular: 0.20, atheist: 0.06 },
  ukrainian_estonian: { christian_orthodox: 0.60, christian_catholic: 0.06, secular: 0.26, atheist: 0.08 },
  ukrainian_belarusian: { christian_orthodox: 0.78, christian_catholic: 0.06, secular: 0.12, atheist: 0.04 },
  belarusian_latvian: { christian_orthodox: 0.56, christian_catholic: 0.20, secular: 0.18, atheist: 0.06 },
  german_russian: { christian_protestant: 0.46, christian_catholic: 0.20, secular: 0.26, atheist: 0.08 },

  sara_chad: { christian_catholic: 0.40, christian_protestant: 0.36, animist: 0.22, muslim_sunni: 0.02 },
  massa_chad: { christian_protestant: 0.38, christian_catholic: 0.30, animist: 0.28, muslim_sunni: 0.04 },
  sara_car: { christian_protestant: 0.42, christian_catholic: 0.32, animist: 0.24, muslim_sunni: 0.02 },
  mandjia_car: { christian_protestant: 0.44, christian_catholic: 0.30, animist: 0.26 },
  gbaya_car: { christian_protestant: 0.42, christian_catholic: 0.26, animist: 0.24, muslim_sunni: 0.08 },
  banda_car: { christian_protestant: 0.40, christian_catholic: 0.28, animist: 0.24, muslim_sunni: 0.08 },
  mboum_car: { christian_protestant: 0.36, christian_catholic: 0.24, animist: 0.20, muslim_sunni: 0.20 },
  mbaka_car: { christian_catholic: 0.40, christian_protestant: 0.30, animist: 0.22, muslim_sunni: 0.08 },
  yakoma_car: { christian_catholic: 0.38, christian_protestant: 0.32, animist: 0.20, muslim_sunni: 0.10 },

  afro_guyanese: { christian_protestant: 0.42, christian_pentecostal: 0.30, christian_catholic: 0.12, secular: 0.12, christian_other: 0.04 },
  mixed_guyanese: { christian_protestant: 0.34, christian_pentecostal: 0.24, hindu: 0.16, christian_catholic: 0.12, secular: 0.10, muslim_sunni: 0.04 },
  amerindian_guyanese: { christian_protestant: 0.40, christian_catholic: 0.26, animist: 0.18, christian_pentecostal: 0.16 },
  afro_trinidadian: { christian_protestant: 0.48, christian_catholic: 0.26, christian_other: 0.16, secular: 0.10 },
  mixed_trinidadian: { christian_protestant: 0.36, christian_catholic: 0.26, hindu: 0.14, christian_other: 0.14, secular: 0.10 },
  chinese_trinidadian: { christian_catholic: 0.38, christian_protestant: 0.24, buddhist: 0.16, secular: 0.22 },
  chinese_jamaican: { christian_protestant: 0.42, christian_catholic: 0.18, christian_other: 0.14, buddhist: 0.12, secular: 0.14 },
  mixed_jamaican: { christian_protestant: 0.44, christian_pentecostal: 0.20, christian_other: 0.18, secular: 0.17, rastafari: 0.01 },
  mixed_haitian: { christian_catholic: 0.62, christian_protestant: 0.26, animist: 0.06, secular: 0.06 },
  afro_barbadian: { christian_protestant: 0.56, christian_pentecostal: 0.16, christian_catholic: 0.06, secular: 0.22 },

  emirati: { muslim_sunni: 0.85, muslim_shia: 0.15 },
  qatari_arab: { muslim_sunni: 0.90, muslim_shia: 0.10 },
  kuwaiti: { muslim_sunni: 0.62, muslim_shia: 0.38 },
  arab_expat_uae: { muslim_sunni: 0.82, muslim_shia: 0.10, christian_orthodox: 0.06, christian_catholic: 0.02 },
  other_arab_qatar: { muslim_sunni: 0.84, muslim_shia: 0.08, christian_orthodox: 0.06, christian_catholic: 0.02 },
  other_arab_kuwait: { muslim_sunni: 0.80, muslim_shia: 0.14, christian_orthodox: 0.04, christian_catholic: 0.02 },
  other_arab_bahrain: { muslim_sunni: 0.62, muslim_shia: 0.32, christian_orthodox: 0.04, christian_catholic: 0.02 },
  east_asian_uae: { buddhist: 0.34, christian_catholic: 0.34, christian_protestant: 0.16, muslim_sunni: 0.06, secular: 0.10 },
  western_expat_uae: { christian_catholic: 0.34, christian_protestant: 0.30, secular: 0.32, muslim_sunni: 0.04 },
  western_qatar: { christian_catholic: 0.34, christian_protestant: 0.30, secular: 0.32, muslim_sunni: 0.04 },
}

/**
 * The religion distribution this table implies for a whole country, computed
 * analytically as sum over groups of share(g) x P(religion | g).
 *
 * This exists so the table can be held to account. Conditioning religion on
 * ethnicity changes each country's overall religious mix, and if a conditional
 * here is wrong the drift shows up as a national marginal that no longer
 * matches the `religionWeights` the country data and the content were written
 * against. The first version of this file moved Senegal from 95% Sunni to 58%
 * (by treating the Mouride and Tijani orders as something other than Sunni
 * Islam, which they are not), deleted India's 200 million Muslims (by mapping
 * every varna to pure Hindu when India's roster has no non-Hindu group at all),
 * made a Slav in Kazakhstan 70% Muslim and an Afro-Guyanese 25% Hindu (by
 * leaving minority groups unmapped, so they inherited a national average that
 * describes a different community), and put a fifth of Fiji and Vanuatu into
 * religion ids those countries do not use.
 *
 * All 154 countries are now within 10 points on every religion; the test in
 * tests/identity.test.js fails if that stops being true.
 */
export function impliedMarginal(country) {
  const groups = country?.ethnicGroups ?? []
  const normalise = (o) => {
    const t = Object.values(o).reduce((a, b) => a + b, 0) || 1
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v / t]))
  }
  const countryWeights = normalise(country?.religionWeights ?? { secular: 1 })
  if (groups.length === 0) return countryWeights
  const totalShare = groups.reduce((a, g) => a + (g.share ?? 0), 0) || 1
  const out = {}
  for (const g of groups) {
    const w = (g.share ?? 0) / totalShare
    const cond = ETHNIC_RELIGION[g.id] ? normalise(ETHNIC_RELIGION[g.id]) : countryWeights
    for (const [r, p] of Object.entries(cond)) out[r] = (out[r] ?? 0) + w * p
  }
  return out
}

/**
 * Draw a religion for a character of this ethnicity, in this country.
 *
 * Falls back to the country's own `religionWeights` for every group this file
 * says nothing about, which is most of them and is the right answer: a Pole's
 * religion is predicted by Poland, not by being Polish, and a Roma family's by
 * wherever they are.
 *
 * @param {string} ethnicity   the ethnic group id drawn from the country
 * @param {object} country     the country record
 * @param {function} draw      weighted picker: (weightsObject) => key
 */
export function religionFor(ethnicity, country, draw) {
  const conditional = ETHNIC_RELIGION[ethnicity]
  if (conditional) return draw(conditional)
  return country?.religionWeights ? draw(country.religionWeights) : 'secular'
}
