export type ErrorCategory =
  | "hallucinations"
  | "omissions"
  | "wrongFacts"
  | "wrongLegal"
  | "translation"
  | "terminology";

export type SubstanceStatus =
  | "reflected"
  | "distorted"
  | "missing"
  | "hallucinated";

export interface ErrorDetail {
  count: number;
  details: string[];
}

export interface MethodErrors {
  hallucinations: ErrorDetail;
  omissions: ErrorDetail;
  wrongFacts: ErrorDetail;
  wrongLegal: ErrorDetail;
  translation: ErrorDetail;
  terminology: ErrorDetail;
}

export interface SubstancePoint {
  id: string;
  label: string;
  zero: SubstanceStatus;
  few: SubstanceStatus;
  cot: SubstanceStatus;
}

export interface SampleErrors {
  sampleId: string;
  methods: { zero: MethodErrors; few: MethodErrors; cot: MethodErrors };
  substance: SubstancePoint[];
}

export const errorLabels: Record<ErrorCategory, string> = {
  hallucinations: "Hallucinations",
  omissions: "Omissions",
  wrongFacts: "Wrong Facts",
  wrongLegal: "Wrong Legal",
  translation: "Translation",
  terminology: "Terminology",
};

export const errorColors: Record<ErrorCategory, string> = {
  hallucinations: "#EF4444",
  omissions: "#F59E0B",
  wrongFacts: "#EAB308",
  wrongLegal: "#A855F7",
  translation: "#3B82F6",
  terminology: "#14B8A6",
};

export const statusColors: Record<SubstanceStatus, string> = {
  reflected: "#22C55E",
  distorted: "#F59E0B",
  missing: "#EF4444",
  hallucinated: "#991B1B",
};

export const statusLabels: Record<SubstanceStatus, string> = {
  reflected: "Reflected",
  distorted: "Distorted",
  missing: "Missing",
  hallucinated: "Hallucinated",
};

export const errors: SampleErrors[] = [
  // ── Sample 1: COVID-19 Treatment Reimbursement ──
  {
    sampleId: "Sample_1",
    methods: {
      zero: {
        hallucinations: {
          count: 3,
          details: [
            '"Saket Hospital" (actual: PSRI Hospital)',
            '"एयरटेकर" for ventilator (nonsensical)',
            'Inverted ratio — officer must bear excess charges (actual: employer must pay)',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Randeep Kumar Rana precedent",
            "Judge name (Justice Rekha Palli)",
            "Counsel names (J.P. Sengh, Ahlawat)",
            "Court's refusal to examine circular validity",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Hospital name wrong (Saket instead of PSRI)",
            "Ventilator term wrong (एयरटेकर)",
            "Inverted legal reasoning",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Officer should bear excess charges — inverts the actual ratio",
          ],
        },
        translation: {
          count: 3,
          details: [
            '"एयरटेकर" for ventilator',
            '"बहाल" for reimburse',
            '"एडिशनल डिस्ट्रिक्ट जज" untranslated',
          ],
        },
        terminology: {
          count: 2,
          details: [
            '"सरकारी आदेश" for circular',
            '"अनुमति" framing',
          ],
        },
      },
      few: {
        hallucinations: {
          count: 3,
          details: [
            '"Saket Hospital" (actual: PSRI Hospital)',
            '"कार्यकारी अधिकारी" for serving officer (means executive)',
            '"Division Bench" for single-judge case',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Judge name (Justice Rekha Palli)",
            "Randeep Kumar Rana precedent",
            "Counsel names (J.P. Sengh, Ahlawat)",
            "Court's refusal to examine circular validity",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Hospital name wrong (Saket instead of PSRI)",
            '"कार्यकारी अधिकारी" wrong sense',
            "Division Bench instead of Single Judge",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Division Bench instead of Single Judge",
          ],
        },
        translation: {
          count: 3,
          details: [
            '"व्रित" typo for रिट',
            '"कार्यकारी" for serving',
            '"रासा" for राशि',
          ],
        },
        terminology: {
          count: 2,
          details: [
            '"व्रित याचिका" (typo for रिट)',
            '"Division Bench" mislabel',
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 5,
          details: [
            '"वाइटर" for ventilator',
            '"सैक्युलर" (secular) for circular',
            '"रिसाव" (leakage) for reimbursement',
            'Cyrillic "респॉн्डेंट" mixed in',
            'Inverted ratio — officer responsible for excess',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Judge name (Justice Rekha Palli)",
            "Randeep Kumar Rana precedent",
            "Counsel names",
            "Court's refusal to examine circular validity",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Ventilator term wrong (वाइटर)",
            "Circular mistranslated as सैक्युलर",
            "Reimbursement mistranslated as रिसाव",
            "Judgment date stated without confirmation",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Officer should be responsible for excess — inverts ratio",
            "Generalized principle not in judgment",
          ],
        },
        translation: {
          count: 4,
          details: [
            '"वाइटर" for ventilator',
            '"सैक्युलर" for circular',
            '"रिसाव" for reimbursement',
            "Cyrillic script bleed",
          ],
        },
        terminology: {
          count: 3,
          details: [
            '"सैक्युलर" for circular',
            '"रिसाव" for reimbursement/respondents',
            '"डिवीजन बेंच" for single judge',
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Delhi High Court", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S2", label: "Justice Rekha Palli", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "ADJ Dinesh Kumar", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S4", label: "PSRI Hospital", zero: "hallucinated", few: "hallucinated", cot: "distorted" },
      { id: "S5", label: "COVID-19, Apr 22 – Jun 7, 2021", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S6", label: "Ventilator 3 weeks", zero: "hallucinated", few: "reflected", cot: "hallucinated" },
      { id: "S7", label: "Rs. 24,02,380 total bill", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S8", label: "Rs. 7,08,500 reimbursed", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S9", label: "Rs. 16,93,880 balance", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S10", label: "Circular dated 20.06.2020", zero: "distorted", few: "distorted", cot: "hallucinated" },
      { id: "S11", label: "Pay within 4 weeks", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S12", label: "May recover from hospital", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S13", label: "Court declined circular validity", zero: "missing", few: "missing", cot: "missing" },
      { id: "S14", label: "Court rejected hospital refund submission", zero: "missing", few: "missing", cot: "missing" },
      { id: "S15", label: "Randeep Kumar Rana precedent", zero: "missing", few: "missing", cot: "missing" },
      { id: "S16", label: "Employer must pay, recover from hospital", zero: "hallucinated", few: "reflected", cot: "hallucinated" },
      { id: "S17", label: "Penal action/recovery left to authorities", zero: "missing", few: "missing", cot: "missing" },
      { id: "S18", label: "Counsel names", zero: "missing", few: "missing", cot: "missing" },
      { id: "S19", label: "No beds in empanelled hospitals", zero: "distorted", few: "missing", cot: "missing" },
      { id: "S20", label: "Hard-earned savings", zero: "missing", few: "missing", cot: "missing" },
    ],
  },

  // ── Sample 2: Industrial Power Connection ──
  {
    sampleId: "Sample_2",
    methods: {
      zero: {
        hallucinations: {
          count: 3,
          details: [
            '"उत्तर प्रदेश हाईकोर्ट" (actual: J&K and Ladakh HC)',
            '"सार्वजनिक तारीख" for Government Order',
            '"चार्टर" for circular',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Judge name (Justice Nargal)",
            "Both SC precedents (Kanta Goel, BSNL v. Tata)",
            "Estoppel argument (12 years)",
            "Retrospective operation principle",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong court — UP instead of J&K",
            '"सार्वजनिक तारीख" for GO',
            "Judgment date absent/misplaced",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Missing retrospective-operation principle — central legal holding",
          ],
        },
        translation: {
          count: 3,
          details: [
            '"सार्वजनिक तारीख" for GO',
            '"चार्टर" for circular',
            '"व्राइट पेटिशन" for writ petition',
          ],
        },
        terminology: {
          count: 2,
          details: [
            '"सार्वजनिक तारीख" for GO',
            '"चार्टर" for circular',
          ],
        },
      },
      few: {
        hallucinations: {
          count: 4,
          details: [
            '"उत्तर प्रदेश हाईकोर्ट" (actual: J&K and Ladakh HC)',
            'Fabricated date "20 अक्टूबर 2023"',
            '"एयर फर्नेस" for arc furnace',
            "Inverted direction of furnace change (induction→arc instead of arc→induction)",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Judge name (Justice Nargal)",
            "Both SC precedents",
            "Estoppel argument",
            "Retrospective operation principle",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Wrong court — UP instead of J&K",
            "Fabricated judgment date",
            '"एयर फर्नेस" for arc furnace',
            "Inverted direction of change",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Inverted furnace change direction",
            'Contradictory "accepted then dismissed" framing',
          ],
        },
        translation: {
          count: 3,
          details: [
            '"एयर फर्नेस" for arc furnace',
            '"संपूर्णता से" for supersession',
            '"बैन" left untranslated',
          ],
        },
        terminology: {
          count: 2,
          details: [
            '"एयर फर्नेस" for arc furnace',
            '"संपूर्णता से" for supersession',
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 5,
          details: [
            '"मशरूक अली खान" fabricated petitioner (actual: M/s Shree Guru Kripa Alloys)',
            '"उत्तर प्रदेश हाईकोर्ट" (actual: J&K and Ladakh HC)',
            '"संयुक्त सचिव (विद्युत)" invented title',
            '"पश्चिमोत्तर" (northwestern) for retrospective',
            'Fabricated case title "M. Ali Khan vs. UT of J&K"',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Judge name (Justice Nargal)",
            "BSNL v. Tata Communications precedent",
            "Estoppel argument",
            "Chromite ore reason",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Fabricated petitioner name",
            "Wrong court — UP instead of J&K",
            '"पश्चिमोत्तर" for retrospective',
            '"संयुक्त सचिव" invented',
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Broadly correct outcome; retrospective principle garbled",
          ],
        },
        translation: {
          count: 4,
          details: [
            '"पश्चिमोत्तर" for retrospective',
            '"विषय धारण" for entertained',
            '"व्याख्यान" for construed',
            '"बंदी" ambiguous for ban/banned',
          ],
        },
        terminology: {
          count: 3,
          details: [
            '"पश्चिमोत्तर प्रभाव" for retrospective effect',
            '"संयुक्त सचिव" for Designate Committee',
            '"विषय धारण" for entertained',
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "J&K and Ladakh HC", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justice Nargal", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "M/s Shree Guru Kripa Alloys", zero: "distorted", few: "reflected", cot: "hallucinated" },
      { id: "S4", label: "Bari Brahmana, Jammu", zero: "distorted", few: "reflected", cot: "distorted" },
      { id: "S5", label: "2250 KVA (GO 18.10.1995)", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S6", label: "Ban GO 72-PDD of 2010", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S7", label: "Chromite ore from Orissa", zero: "missing", few: "missing", cot: "missing" },
      { id: "S8", label: "Permission 2012", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S9", label: "~Rs. 4.5 crores investment", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S10", label: "Withdrawal 28.12.2015", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S11", label: "Ban lifted GO 57-PDD 2022", zero: "missing", few: "missing", cot: "missing" },
      { id: "S12", label: "Counsel names", zero: "missing", few: "missing", cot: "missing" },
      { id: "S13", label: "Retrospective operation not permitted", zero: "missing", few: "missing", cot: "hallucinated" },
      { id: "S14", label: "Executive order, not legislation", zero: "missing", few: "missing", cot: "missing" },
      { id: "S15", label: "Estoppel (12 years)", zero: "missing", few: "missing", cot: "missing" },
      { id: "S16", label: "Arc→induction = new connection", zero: "reflected", few: "hallucinated", cot: "reflected" },
      { id: "S17", label: "Petition dismissed", zero: "reflected", few: "reflected", cot: "reflected" },
    ],
  },

  // ── Sample 3: Wife's Desire to Work ≠ Cruelty ──
  {
    sampleId: "Sample_3",
    methods: {
      zero: {
        hallucinations: {
          count: 2,
          details: [
            '"महाराष्ट्र हाईकोर्ट" (actual: Bombay HC)',
            "Fabricated case citation as 'M v. R'",
          ],
        },
        omissions: {
          count: 5,
          details: [
            "Justices Chandurkar & Joshi-Phalke",
            "Article 21 reproductive choice",
            "Cannot be forced to give birth",
            "Wear-and-tear distinction",
            "No evidence of rude/arrogant behavior",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong court (Maharashtra instead of Bombay)",
            "Case title cited as 'M v. R'",
            "Desire to work principle distorted",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Article 21 reproductive choice holding missing",
            "Wear-and-tear principle missing",
          ],
        },
        translation: {
          count: 2,
          details: [
            '"महाराष्ट्र हाईकोर्ट" for Bombay HC',
            "Legal terminology not rendered in Hindi",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Wrong court name used throughout",
            "Case citation format incorrect",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 4,
          details: [
            '"महाराष्ट्र हाई कोर्ट" (actual: Bombay HC)',
            "No substance points reflected correctly",
            "Entire summary built on wrong court",
            "Missing all key legal principles",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justices Chandurkar & Joshi-Phalke",
            "Case title",
            "Desire to work ≠ cruelty",
            "Article 21 reproductive choice",
            "Wear-and-tear distinction",
            "Section 13 HMA",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong court",
            "No facts from source reflected",
            "Summary essentially unrelated to judgment",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "All legal principles missing",
            "Case outcome not accurately stated",
          ],
        },
        translation: {
          count: 2,
          details: [
            "Court name wrong",
            "Legal terms untranslated",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Wrong court name",
            "No legal terminology from source",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 2,
          details: [
            '"महाराष्ट्र हाईकोर्ट" (actual: Bombay HC)',
            "Fabricated 3-judge bench",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justices Chandurkar & Joshi-Phalke",
            "Article 21 reproductive choice",
            "Cannot be forced to give birth",
            "No rude/arrogant behavior evidence",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong court",
            "Fabricated bench composition",
            "Desire to work principle partially wrong",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Article 21 holding missing",
          ],
        },
        translation: {
          count: 3,
          details: [
            "Court name wrong",
            "Legal terms partially rendered",
            "Wear-and-tear partially translated",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Wrong court name",
            "Partial legal terminology",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Bombay HC", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justices Chandurkar & Joshi-Phalke", zero: "missing", few: "missing", cot: "hallucinated" },
      { id: "S3", label: "Case title", zero: "hallucinated", few: "missing", cot: "missing" },
      { id: "S4", label: "Desire to work ≠ cruelty", zero: "distorted", few: "missing", cot: "distorted" },
      { id: "S5", label: "Wear-and-tear principle", zero: "missing", few: "missing", cot: "distorted" },
      { id: "S6", label: "Article 21 reproductive choice", zero: "missing", few: "missing", cot: "missing" },
      { id: "S7", label: "Cannot be forced to give birth", zero: "missing", few: "missing", cot: "missing" },
      { id: "S8", label: "Wife's character suspicion defense", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S9", label: "Wife's reason more probable", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S10", label: "Desertion not proved", zero: "distorted", few: "missing", cot: "distorted" },
      { id: "S11", label: "No rude/arrogant behavior", zero: "missing", few: "missing", cot: "missing" },
      { id: "S12", label: "Appeals dismissed", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S13", label: "Section 13 HMA", zero: "reflected", few: "missing", cot: "distorted" },
    ],
  },

  // ── Sample 4: Nude Video / Section 67A IT Act ──
  {
    sampleId: "Sample_4",
    methods: {
      zero: {
        hallucinations: {
          count: 4,
          details: [
            '"महान्यादिलत न्यायालय" (garbled court name)',
            "Justice Shinde named (from cited precedent, not this case)",
            '"Mr. Uzair Kazi" as applicant (actual: counsel)',
            '"गिरफ्तार किया गया" (arrested) — bail was rejected, not arrest ordered',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Bharati Dangre",
            "2017 confrontation by accused's wife/daughter",
            "Severed ties",
            "~3 years later re-contact and threats",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Wrong court name",
            "Wrong judge (from precedent)",
            "Wrong applicant (counsel confused with applicant)",
            "Nature of proceeding wrong (arrest vs bail rejection)",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Section 67A species of Section 67 principle missing",
            "Custodial interrogation rationale missing",
          ],
        },
        translation: {
          count: 3,
          details: [
            "Court name garbled",
            "Legal terms untranslated",
            "Proceeding type mistranslated",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Court name incorrect",
            "Applicant vs counsel confusion",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 4,
          details: [
            '"महाराष्ट्र हाई कोर्ट" (actual: Bombay HC)',
            '"उज्जायर काजी" as applicant (actual: counsel)',
            "Inverted relationship (husband's friend described wrong)",
            "Nature of proceeding mischaracterized",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Bharati Dangre",
            "2017 confrontation",
            "Severed ties",
            "~3 years later re-contact",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Wrong court",
            "Wrong applicant",
            "Relationship inverted",
            "Proceeding type wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Section 67A species principle missing",
            "Legislative intent partially missing",
          ],
        },
        translation: {
          count: 3,
          details: [
            "Court name wrong",
            "Applicant name wrong",
            "Legal terms untranslated",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Court name wrong",
            "Applicant vs counsel error",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 3,
          details: [
            '"महानगर न्यायालय" (Metropolitan Court — actual: Bombay HC)',
            '"Mr. Uzair Kazi" as applicant (actual: counsel)',
            "Nature of proceeding mischaracterized",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Bharati Dangre",
            "2017 confrontation",
            "Severed ties",
            "~3 years later re-contact",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong court (Metropolitan instead of Bombay HC)",
            "Wrong applicant",
            "Proceeding type wrong",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Custodial interrogation rationale partially missing",
          ],
        },
        translation: {
          count: 3,
          details: [
            "Court name wrong",
            "Applicant name wrong",
            "Some terms untranslated",
          ],
        },
        terminology: {
          count: 2,
          details: [
            "Wrong court level",
            "Applicant vs counsel error",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Bombay HC", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justice Dangre", zero: "hallucinated", few: "missing", cot: "missing" },
      { id: "S3", label: "Esrar Nazrul Ahemad", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S4", label: "Anticipatory bail rejected", zero: "hallucinated", few: "distorted", cot: "distorted" },
      { id: "S5", label: "FIR details", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S6", label: "Section 67A + 354 IPC", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S7", label: "44-year-old, married, two children", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S8", label: "Husband's friend, married", zero: "reflected", few: "distorted", cot: "reflected" },
      { id: "S9", label: "Consensual relationship → nude video", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S10", label: "Shared on assurance of deletion", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S11", label: "2017 confrontation", zero: "missing", few: "missing", cot: "missing" },
      { id: "S12", label: "Severed ties", zero: "missing", few: "missing", cot: "missing" },
      { id: "S13", label: "~3 years later re-contact", zero: "missing", few: "missing", cot: "missing" },
      { id: "S14", label: "Video circulated", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S15", label: "'Sexually explicit' includes nude video", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S16", label: "Section 67A species of Section 67", zero: "missing", few: "missing", cot: "missing" },
      { id: "S17", label: "Oxford Dictionary cited", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S18", label: "Legislative intent: prevent exploitation", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S19", label: "Custodial interrogation necessary", zero: "missing", few: "missing", cot: "missing" },
      { id: "S20", label: "Counsel names", zero: "missing", few: "missing", cot: "missing" },
    ],
  },

  // ── Sample 5: RAJNIGANDHA Trademark ──
  {
    sampleId: "Sample_5",
    methods: {
      zero: {
        hallucinations: {
          count: 3,
          details: [
            "Two fabricated judges (actual: Justice Jyoti Singh)",
            '"निष्पादन समझौते" for permanent injunction',
            "Decree stated against plaintiff (actual: against defendants)",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Jyoti Singh",
            "Order XIII-A CPC",
            "Initial interest confusion principle",
            "Triple identity test",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Wrong judges fabricated",
            "RAJNIPAAN mark wrong ('माया')",
            "Decree direction inverted",
            "Injunction term wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Order XIII-A summary judgment missing",
            "Decree direction inverted (against plaintiff)",
          ],
        },
        translation: {
          count: 3,
          details: [
            "Judge names fabricated",
            "Injunction term wrong",
            "Legal terms untranslated",
          ],
        },
        terminology: {
          count: 3,
          details: [
            "Wrong judge names",
            '"निष्पादन समझौते" for permanent injunction',
            "Case direction inverted",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 3,
          details: [
            '"निष्पादन समझौते" for permanent injunction',
            "Wrong date (18 Jan 2023 — cancelled hearing, not judgment)",
            "Missing Justice Jyoti Singh",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Jyoti Singh",
            "Order XIII-A CPC",
            "Initial interest confusion",
            "Triple identity test",
          ],
        },
        wrongFacts: {
          count: 3,
          details: [
            "Wrong date",
            "Injunction term wrong",
            "Some defendant details wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Order XIII-A missing",
            "Injunction term wrong",
          ],
        },
        translation: {
          count: 3,
          details: [
            '"निष्पादन समझौते" for permanent injunction',
            "Date wrong",
            "Legal terms untranslated",
          ],
        },
        terminology: {
          count: 3,
          details: [
            '"निष्पादन समझौते" for permanent injunction',
            "Wrong date",
            "Missing key legal principles",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 4,
          details: [
            "Chinese characters '由被告' in Hindi text (encoding failure)",
            "Wrong date (18 Jan 2023)",
            "Fabricated legal terminology",
            "Missing Justice Jyoti Singh",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Jyoti Singh",
            "Order XIII-A CPC",
            "Initial interest confusion",
            "Triple identity test",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Chinese characters in output",
            "Wrong date",
            "Some defendant details distorted",
            "Injunction term partially wrong",
          ],
        },
        wrongLegal: {
          count: 1,
          details: [
            "Order XIII-A missing",
          ],
        },
        translation: {
          count: 4,
          details: [
            "Chinese characters (encoding failure)",
            "Wrong date",
            "Injunction term wrong",
            "Legal terms partially untranslated",
          ],
        },
        terminology: {
          count: 3,
          details: [
            "Chinese characters in legal text",
            "Wrong date format",
            "Partial legal terminology",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Delhi HC", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S2", label: "Justice Jyoti Singh", zero: "hallucinated", few: "missing", cot: "missing" },
      { id: "S3", label: "DS Group", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S4", label: "Defendants (Mehio, Mya International)", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S5", label: "RAJNI (1980), RAJNIGANDHA (1983)", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S6", label: "RAJNIPAAN impugned mark", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S7", label: "Well-known mark", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S8", label: "Deceptive similarity; dishonest adoption", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S9", label: "'GANDHA' → 'PAAN'", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S10", label: "Order XIII-A CPC", zero: "missing", few: "missing", cot: "missing" },
      { id: "S11", label: "Defendants ex parte", zero: "missing", few: "missing", cot: "missing" },
      { id: "S12", label: "Infringement + passing off", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S13", label: "Kaviraj Pandit Durga Dutt Sharma", zero: "missing", few: "missing", cot: "missing" },
      { id: "S14", label: "Initial interest confusion", zero: "missing", few: "missing", cot: "missing" },
      { id: "S15", label: "Triple identity test", zero: "missing", few: "missing", cot: "missing" },
      { id: "S16", label: "Allied/cognate goods", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S17", label: "Rs. 3 lakhs damages", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S18", label: "Actual costs", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S19", label: "Decree against Defendants 1-4", zero: "hallucinated", few: "distorted", cot: "distorted" },
      { id: "S20", label: "Permanent injunction", zero: "hallucinated", few: "hallucinated", cot: "distorted" },
    ],
  },

  // ── Sample 6: Divorce — Cruelty & Desertion ──
  {
    sampleId: "Sample_6",
    methods: {
      zero: {
        hallucinations: {
          count: 3,
          details: [
            'Fabricated year (2021)',
            'Fabricated case number (FAO-M-145 of 2021)',
            'Fabricated term "एकठान"',
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justices Bahri & Gupta",
            "9 months cohabitation",
            "No child born",
            "Section 13 HMA (cruelty & desertion)",
            "Rs. 23 lacs already paid",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Court name (Himachal instead of Haryana)",
            "Husband name wrong",
            "Wife name wrong",
            "Year wrong",
            "Case number wrong",
            "Grounds wrong",
            "Alimony amount correct but context wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Section 13 HMA grounds partially wrong",
            "Case number fabricated",
          ],
        },
        translation: {
          count: 5,
          details: [
            "Court name wrong (Himachal)",
            "Party names wrong",
            "Legal terms untranslated",
            "Case number format wrong",
            "Year wrong",
          ],
        },
        terminology: {
          count: 5,
          details: [
            "Wrong court name",
            "Wrong party names",
            "Wrong case number",
            "Wrong grounds",
            "Wrong year",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 6,
          details: [
            'Fabricated year (2023)',
            'Fabricated party names (Harpreet Singh, Ravinder Kaur)',
            'Fabricated food refusal fact',
            'Fabricated bench (Chief Justice)',
            'Fabricated case number',
            'Entire party identity wrong',
          ],
        },
        omissions: {
          count: 5,
          details: [
            "Justices Bahri & Gupta",
            "9 months cohabitation",
            "No child born",
            "Counsel names",
            "Rs. 23 lacs already paid",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Court name (Himachal instead of Haryana)",
            "Year wrong",
            "Husband name wrong",
            "Wife name wrong",
            "Alimony amount wrong (8 lakhs vs 18 lakhs)",
            "Bench wrong",
            "Case title wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Alimony amount wrong (8 vs 18 lakhs)",
            "Bench composition wrong",
          ],
        },
        translation: {
          count: 4,
          details: [
            "Court name wrong",
            "Party names fabricated",
            "Alimony amount wrong",
            "Legal terms untranslated",
          ],
        },
        terminology: {
          count: 4,
          details: [
            "Wrong court",
            "Wrong parties",
            "Wrong amount",
            "Wrong bench",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated year (2021)',
            'Fabricated case title',
            'Fabricated bench (Chief Justice)',
            'Fabricated case number',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justices Bahri & Gupta",
            "9 months cohabitation",
            "Counsel names",
            "Section 13 HMA partially wrong",
          ],
        },
        wrongFacts: {
          count: 8,
          details: [
            "Court name (Himachal instead of Haryana)",
            "Year wrong",
            "Legal grounds wrong ('नैतिकता का अभाव')",
            "Alimony amount wrong (8 lakhs vs 18 lakhs)",
            "Party names wrong",
            "Case title wrong",
            "Bench wrong",
            "Case number wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Alimony amount wrong",
            "Legal grounds mischaracterized",
          ],
        },
        translation: {
          count: 5,
          details: [
            "Court name wrong",
            "Party names wrong",
            "Alimony amount wrong",
            "Legal grounds wrong",
            "Case number wrong",
          ],
        },
        terminology: {
          count: 6,
          details: [
            "Wrong court",
            "Wrong parties",
            "Wrong amount",
            "Wrong grounds",
            "Wrong bench",
            "Wrong case number",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Punjab and Haryana HC", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justices Bahri & Gupta", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "Case title / FAO-M-182/2017", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S4", label: "Nov 2012 marriage", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S5", label: "9 months cohabitation; no child", zero: "missing", few: "missing", cot: "missing" },
      { id: "S6", label: "Section 13 HMA; cruelty & desertion", zero: "distorted", few: "missing", cot: "distorted" },
      { id: "S7", label: "ADJ Patiala dismissed May 2017", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S8", label: "False allegations against father-in-law", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S9", label: "False, not challaned", zero: "distorted", few: "missing", cot: "missing" },
      { id: "S10", label: "Numerous false complaints", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S11", label: "Appeal allowed; divorce 13(ia)+(ib)", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S12", label: "Rs. 18,00,000 alimony", zero: "reflected", few: "hallucinated", cot: "hallucinated" },
      { id: "S13", label: "Rs. 23 lacs already paid", zero: "reflected", few: "missing", cot: "reflected" },
      { id: "S14", label: "Counsel names", zero: "missing", few: "missing", cot: "missing" },
    ],
  },

  // ── Sample 7: Successive Anticipatory Bail ──
  {
    sampleId: "Sample_7",
    methods: {
      zero: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated order date (28 Feb 2022)',
            "Advocate identified as bench",
            'Nonsensical "वाक्य" field',
            "Petitioner name partially wrong",
          ],
        },
        omissions: {
          count: 7,
          details: [
            "Justice Vikas Bahl",
            "Prior rejection by ASJ Panipat",
            "Co-accused Roshan Lal",
            '"Unscrupulous litigants" principle',
            "Abuse of process",
            "Custodial interrogation necessary",
            "HALSA costs deposit",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Court name (only Haryana, omitting Punjab)",
            '"फायर" for FIR',
            '"अनुच्छेद" for section',
            "Order date wrong",
            "Advocate as bench",
            "Petitioner name partial",
            "Nonsensical fields",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Anticipatory vs regular bail principle garbled",
            "Abuse of process missing",
          ],
        },
        translation: {
          count: 6,
          details: [
            '"फायर" for FIR',
            '"अनुच्छेद" for section',
            "Court name wrong",
            "Date wrong",
            "Legal terms untranslated",
            "Party names wrong",
          ],
        },
        terminology: {
          count: 6,
          details: [
            "Wrong court",
            "Wrong FIR term",
            "Wrong section term",
            "Wrong date",
            "Wrong bench",
            "Wrong party role",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated name "भुनेश सिंह"',
            "Fabricated bench",
            "Respondent listed as HALSA",
            "Petitioner name wrong",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justice Vikas Bahl",
            "Co-accused Roshan Lal",
            '"Unscrupulous litigants" principle',
            "Abuse of process",
            "Custodial interrogation",
            "HALSA costs deposit details",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Court name (only Haryana)",
            "Petitioner name added 'Singh'",
            '"पूर्व आतंक बails" for anticipatory bail',
            "Wrong party for signatures",
            "Bench fabricated",
            "Respondent wrong",
            "Name fabricated",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Anticipatory vs regular bail garbled",
            "Abuse of process missing",
          ],
        },
        translation: {
          count: 6,
          details: [
            "Court name wrong",
            "Petitioner name wrong",
            '"पूर्व आतंक बails" (pre-terror bails)',
            "Legal terms untranslated",
            "Party roles wrong",
            "Bench wrong",
          ],
        },
        terminology: {
          count: 5,
          details: [
            "Wrong court",
            "Wrong bail term",
            "Wrong party name",
            "Wrong bench",
            "Wrong respondent",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated order date',
            "Advocate listed as bench",
            'Respondent as "पुलिस स्टेशन समालखा"',
            "First petition directions presented as final order",
          ],
        },
        omissions: {
          count: 5,
          details: [
            "Justice Vikas Bahl",
            '"Unscrupulous litigants" principle',
            "Custodial interrogation necessary",
            "Abuse of process",
            "HALSA costs details",
          ],
        },
        wrongFacts: {
          count: 8,
          details: [
            "Court name (only Haryana)",
            "Wrong case title",
            "Wrong bench",
            "Wrong respondent",
            '"अंतिम बेल" for anticipatory bail',
            "First petition presented as final",
            "Date wrong",
            "Party roles wrong",
          ],
        },
        wrongLegal: {
          count: 3,
          details: [
            "First petition directions as final order",
            "Anticipatory vs regular bail garbled",
            "Abuse of process missing",
          ],
        },
        translation: {
          count: 6,
          details: [
            "Court name wrong",
            "Case title wrong",
            "Bail term wrong",
            "Respondent wrong",
            "Legal terms untranslated",
            "Date wrong",
          ],
        },
        terminology: {
          count: 7,
          details: [
            "Wrong court",
            "Wrong case title",
            "Wrong bench",
            "Wrong bail term",
            "Wrong respondent",
            "Wrong date",
            "Wrong party roles",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Punjab and Haryana HC", zero: "hallucinated", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justice Vikas Bahl", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "Bhunesh v State", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S4", label: "FIR details", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S5", label: "First petition withdrawn", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S6", label: "10-day surrender promise", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S7", label: "ASJ Panipat rejection", zero: "missing", few: "reflected", cot: "missing" },
      { id: "S8", label: "Second petition after 10 days", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S9", label: "Co-accused Roshan Lal", zero: "missing", few: "missing", cot: "reflected" },
      { id: "S10", label: "Forged affidavit", zero: "reflected", few: "distorted", cot: "reflected" },
      { id: "S11", label: "Anticipatory ≠ regular bail", zero: "reflected", few: "reflected", cot: "distorted" },
      { id: "S12", label: '"Unscrupulous litigants"', zero: "missing", few: "missing", cot: "missing" },
      { id: "S13", label: "Abuse of process", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S14", label: "Dismissed + Rs. 50,000 costs", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S15", label: "Custodial interrogation necessary", zero: "missing", few: "missing", cot: "missing" },
      { id: "S16", label: "HALSA", zero: "reflected", few: "distorted", cot: "reflected" },
      { id: "S17", label: "Petitioner = main accused", zero: "reflected", few: "reflected", cot: "reflected" },
    ],
  },

  // ── Sample 8: NDPS Bail / Faulty Sample ──
  {
    sampleId: "Sample_8",
    methods: {
      zero: {
        hallucinations: {
          count: 5,
          details: [
            'Fabricated applicant "P.N. Commonwealth"',
            'Fabricated date (26 Feb 2023)',
            'Fabricated bench "समूह की बैठक" (group meeting)',
            '"मंगलवार" (Tuesday) for reporting day (actual: Monday)',
            "Fabricated police station",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justice Jasmeet Singh",
            "Laxman Thakur (actual applicant)",
            "Custody since 26.02.2022",
            "No criminal antecedents",
            "Surrender passport condition",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 8,
          details: [
            "Applicant name wrong",
            "Date wrong",
            "Bench wrong",
            "Reporting day wrong (Tuesday vs Monday)",
            "Ganja quantities not specified",
            "Police station wrong",
            "Legal terms wrong",
            "Bail conditions partially wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Standing Order 1/88 importance garbled",
            "Section 37 partially missing",
          ],
        },
        translation: {
          count: 6,
          details: [
            "Applicant name wrong",
            "Bench wrong",
            "Date wrong",
            "Reporting day wrong",
            "Legal terms untranslated",
            "Police station wrong",
          ],
        },
        terminology: {
          count: 6,
          details: [
            "Wrong applicant",
            "Wrong bench",
            "Wrong date",
            "Wrong day",
            "Wrong police station",
            "Wrong legal terms",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated police station "जज्जागिरापुर"',
            '"दवाइयों" (medicines) for ganja',
            "Misattribution of Sumit Tomar citation",
            "Missing actual applicant",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justice Jasmeet Singh",
            "Laxman Thakur",
            "Custody since 26.02.2022",
            "No criminal antecedents",
            "Bal Mukund precedent",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Police station wrong",
            '"दवाइयों" for ganja',
            '"नियमित बॉल" for regular bail',
            "Applicant missing",
            "Bench missing",
            "Standing Order term wrong",
            "Bail conditions partially wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Bal Mukund precedent missing",
            "Section 37 partially missing",
          ],
        },
        translation: {
          count: 6,
          details: [
            "Police station wrong",
            '"दवाइयों" for ganja',
            "Legal terms untranslated",
            "Applicant missing",
            "Bench missing",
            "Standing Order wrong",
          ],
        },
        terminology: {
          count: 5,
          details: [
            "Wrong police station",
            "Wrong substance term",
            "Wrong bail term",
            "Wrong applicant",
            "Wrong precedent",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 7,
          details: [
            'Fabricated applicant "P.T.N. Aggarwal" (confusing counsel)',
            "Bail amount wrong (15 lakh vs 25,000 — 60x error)",
            'Fabricated 3-judge bench',
            '"तालाब" (pond) for Standing Order',
            '"संयुक्त राज्य अमेरिका" (USA) for Union of India',
            "DK Baidya named as judge",
            "Multiple fabricated details",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justice Jasmeet Singh",
            "Laxman Thakur",
            "Custody since 26.02.2022",
            "No criminal antecedents",
            "Surrender passport",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 9,
          details: [
            "Applicant name wrong",
            "Bail amount wrong (60x)",
            "Bench wrong (3-judge vs single)",
            '"तालाब" for Standing Order',
            '"संयुक्त राज्य अमेरिका" for Union of India',
            "Judge wrong (DK Baidya)",
            "Standing Order wrong",
            "Bail conditions wrong",
            "Legal terms wrong",
          ],
        },
        wrongLegal: {
          count: 4,
          details: [
            "Bail amount grossly wrong",
            "Standing Order principle garbled",
            "Union of India mistranslated",
            "Section 37 partially wrong",
          ],
        },
        translation: {
          count: 6,
          details: [
            '"तालाब" for Standing Order',
            '"संयुक्त राज्य अमेरिका" for Union of India',
            "Applicant wrong",
            "Bail amount wrong",
            "Bench wrong",
            "Legal terms wrong",
          ],
        },
        terminology: {
          count: 7,
          details: [
            "Wrong applicant",
            "Wrong bail amount",
            "Wrong bench",
            "Wrong Standing Order term",
            "Wrong Union of India term",
            "Wrong judge",
            "Wrong legal terms",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Delhi HC", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S2", label: "Justice Jasmeet Singh", zero: "hallucinated", few: "missing", cot: "missing" },
      { id: "S3", label: "Laxman Thakur", zero: "hallucinated", few: "missing", cot: "hallucinated" },
      { id: "S4", label: "FIR 0021/2022, NDPS", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S5", label: "Ganja quantities", zero: "distorted", few: "distorted", cot: "distorted" },
      { id: "S6", label: "Contents mixed", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S7", label: "Standing Order 1/88", zero: "reflected", few: "reflected", cot: "hallucinated" },
      { id: "S8", label: "Bal Mukund precedent", zero: "distorted", few: "missing", cot: "hallucinated" },
      { id: "S9", label: "Section 37 not applicable", zero: "reflected", few: "reflected", cot: "distorted" },
      { id: "S10", label: "Bail granted", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S11", label: "Custody since 26.02.2022", zero: "missing", few: "missing", cot: "missing" },
      { id: "S12", label: "No criminal antecedents", zero: "missing", few: "missing", cot: "missing" },
      { id: "S13", label: "Bail conditions", zero: "distorted", few: "reflected", cot: "distorted" },
      { id: "S14", label: "Report to PS first Monday", zero: "hallucinated", few: "reflected", cot: "missing" },
      { id: "S15", label: "Surrender passport", zero: "missing", few: "reflected", cot: "missing" },
      { id: "S16", label: "Counsel names", zero: "missing", few: "missing", cot: "missing" },
    ],
  },

  // ── Sample 9: Family Court Bias / Transfer ──
  {
    sampleId: "Sample_9",
    methods: {
      zero: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated year (2023)',
            '"अभियुत" as honorific',
            '"संयुक्त न्याय के सिद्धांत" (joint justice) fabricated',
            'Fabricated "वाक्य" field',
          ],
        },
        omissions: {
          count: 5,
          details: [
            "Justice Dinesh Kumar Sharma",
            "Petitioner's counsel (Arundhati Katju etc.)",
            '"18 months" detail',
            "Overnight visitation objection",
            "Kinri Dhir citation",
          ],
        },
        wrongFacts: {
          count: 5,
          details: [
            "Year wrong",
            '"अभियुत" honorific',
            "Case title direction reversed",
            '"संयुक्त न्याय" fabricated',
            '"वाक्य" field',
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            '"संयुक्त न्याय के सिद्धांत" fabricated legal concept',
            "Case title reversed",
          ],
        },
        translation: {
          count: 5,
          details: [
            '"गार्डशिप्स पीटिशन"',
            '"विजिटेशन अधिकारों"',
            '"overnight stay" untranslated',
            '"रिस्पॉन्डेंट"',
            '"वाक्य" for counsel',
          ],
        },
        terminology: {
          count: 5,
          details: [
            '"गार्डशिप्स पीटिशन" (should be अभिभावकता याचिका)',
            '"विजिटेशन" (should be मुलाकात अधिकार)',
            '"रिस्पॉन्डेंट" (should be प्रतिवादी)',
            '"पक्षी" (should be पक्षकार)',
            '"वाक्य" (should be अधिवक्ता)',
          ],
        },
      },
      few: {
        hallucinations: {
          count: 3,
          details: [
            'Fabricated date (20 Feb 2023)',
            '"संयुक्त न्याय के सिद्धांत" fabricated',
            'Child called "बेटे" (son) — actual: daughter',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Dinesh Kumar Sharma",
            "Petitioner's counsel",
            "4-week timeline",
            "Child Counselor",
          ],
        },
        wrongFacts: {
          count: 4,
          details: [
            "Fabricated date",
            "Child as 'बेटे' (son)",
            "Petitioner/respondent reversed (father as petitioner)",
            '"संयुक्त न्याय"',
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            '"संयुक्त न्याय के सिद्धांत" fabricated',
            "Petitioner/respondent reversed",
          ],
        },
        translation: {
          count: 5,
          details: [
            '"गार्डशिप्स पीटिशन"',
            '"विजिटेशन"',
            '"overnight stay" untranslated',
            '"Principal Judge" untranslated',
            '"बेटे" for daughter',
          ],
        },
        terminology: {
          count: 5,
          details: [
            '"गार्डशिप्स पीटिशन"',
            '"विजिटेशन"',
            '"overnight stay"',
            '"Principal Judge"',
            '"निष्पादित" for decided',
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 4,
          details: [
            'Fabricated year (2022)',
            '"रिस्पॉन्डेंट माता-पिता" (respondent parents — actual: father)',
            '"बाल न्यायाधीश" (child judge) for Child Counselor',
            '"अभिषेक अहुजा (पक्षी के लिए)" in counsel line',
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Dinesh Kumar Sharma",
            "Petitioner's counsel",
            "4-week timeline",
            "Kinri Dhir citation",
          ],
        },
        wrongFacts: {
          count: 6,
          details: [
            "Year wrong",
            'Child as "छोटी बेटा" (son)',
            '"रिस्पॉन्डेंट माता-पिता" (parents)',
            '"बाल न्यायाधीश" for Child Counselor',
            "Counsel line misidentification",
            '"निष्पादित" for decided',
          ],
        },
        wrongLegal: {
          count: 3,
          details: [
            '"रिस्पॉन्डेंट माता-पिता" wrong',
            '"बाल न्यायाधीश" wrong',
            "Counsel line error (Abhishek Ahuja as own counsel)",
          ],
        },
        translation: {
          count: 6,
          details: [
            '"गार्डशिप"',
            '"रिस्पॉन्डेंट"',
            '"पक्षी"',
            '"वाक्य"',
            '"छोटी बेटा" (son for daughter)',
            '"निष्पादित" for decided',
          ],
        },
        terminology: {
          count: 6,
          details: [
            '"गार्डशिप" (should be अभिभावकता)',
            '"रिस्पॉन्डेंट" (should be प्रतिवादी)',
            '"पक्षी" (should be याचिकाकर्ता)',
            '"वाक्य" (should be अधिवक्ता)',
            '"निष्पादित" (should be निर्णय)',
            '"बाल न्यायाधीश" (should be बाल परामर्शदाता)',
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Delhi HC", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S2", label: "Justice Dinesh Kumar Sharma", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "Aditi Bakht v. Abhishek Ahuja", zero: "distorted", few: "distorted", cot: "reflected" },
      { id: "S4", label: "Petitioner = mother", zero: "reflected", few: "hallucinated", cot: "reflected" },
      { id: "S5", label: "Respondent = father", zero: "reflected", few: "hallucinated", cot: "reflected" },
      { id: "S6", label: "Minor child (daughter)", zero: "reflected", few: "hallucinated", cot: "hallucinated" },
      { id: "S7", label: "Family Court Judge Sanjeev Kumar Singh", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S8", label: "Guardianship Petition No. 8/2021", zero: "missing", few: "reflected", cot: "distorted" },
      { id: "S9", label: "Three impugned order dates", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S10", label: "Judge shared personal mobile", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S11", label: "Judge met respondent in chamber", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S12", label: '"Justice must appear to have been done"', zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S13", label: "Mere apprehension of bias suffices", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S14", label: "Mere adverse orders not sufficient", zero: "missing", few: "missing", cot: "missing" },
      { id: "S15", label: "Child with mother 18 months", zero: "missing", few: "reflected", cot: "reflected" },
      { id: "S16", label: "Overnight separation harmful", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S17", label: "All orders set aside", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S18", label: "Transferred to Principal Judge", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S19", label: "Decide within 4 weeks", zero: "missing", few: "missing", cot: "missing" },
      { id: "S20", label: "Child Counselor", zero: "reflected", few: "missing", cot: "hallucinated" },
      { id: "S21", label: "Mother travel June 2022", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S22", label: "Passport deferred", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S23", label: "Counsel names", zero: "distorted", few: "distorted", cot: "distorted" },
    ],
  },

  // ── Sample 10: NDPS Bail / Organized Crime ──
  {
    sampleId: "Sample_10",
    methods: {
      zero: {
        hallucinations: {
          count: 6,
          details: [
            'Fabricated date (05 April 2022)',
            '"ट्रक गिरवी रखने" (truck mortgaged) for intercepted',
            "Nonsensical police/shop phrase",
            '"बाहरी न्यायाधीश" for counsel',
            "Counsel roles reversed",
            "Court name partially wrong",
          ],
        },
        omissions: {
          count: 6,
          details: [
            "Justice Sanjay Kumar Medhi",
            "E-way bill discrepancy",
            "Recovery not sine qua non",
            "Commercial quantity principle",
            "Section 8(c) exception",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 8,
          details: [
            "Date wrong",
            "Court name wrong",
            '"गिरवी रखने" for intercepted',
            "Counsel roles reversed",
            "Legal terms wrong",
            "E-way bill missing",
            "Section 37 partially wrong",
            "Interim protection missing",
          ],
        },
        wrongLegal: {
          count: 3,
          details: [
            "Recovery not sine qua non missing",
            "Section 8(c) exception missing",
            "Section 37 partially wrong",
          ],
        },
        translation: {
          count: 7,
          details: [
            "Court name wrong",
            "Date wrong",
            '"गिरवी रखने" for intercepted',
            "Counsel wrong",
            "Legal terms untranslated",
            "Section terms wrong",
            "Bail term wrong",
          ],
        },
        terminology: {
          count: 6,
          details: [
            "Wrong court",
            "Wrong date",
            "Wrong intercept term",
            "Wrong counsel roles",
            "Wrong legal terms",
            "Wrong bail term",
          ],
        },
      },
      few: {
        hallucinations: {
          count: 5,
          details: [
            'Fabricated date (20 Oct 2023)',
            '"असम हाई कोर्ट" instead of गुवाहाटी',
            "Mixed script words",
            "Missing actual applicant",
            "Partial court name",
          ],
        },
        omissions: {
          count: 4,
          details: [
            "Justice Sanjay Kumar Medhi",
            "Section 8(c) exception",
            "Rule 67(4) NDPS Rules",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 7,
          details: [
            "Court name wrong (Assam instead of Gauhati)",
            "Date wrong",
            '"कर्गोंजी" wrong location',
            '"अपेक्षा" for exception',
            "Partial details",
            "Interim protection missing",
            "Legal terms wrong",
          ],
        },
        wrongLegal: {
          count: 2,
          details: [
            "Section 8(c) partially wrong",
            "Rule 67(4) missing",
          ],
        },
        translation: {
          count: 7,
          details: [
            "Court name wrong",
            "Date wrong",
            "Location wrong",
            '"अपेक्षा" for exception',
            "Legal terms untranslated",
            "Mixed scripts",
            "Bail term wrong",
          ],
        },
        terminology: {
          count: 6,
          details: [
            "Wrong court",
            "Wrong date",
            "Wrong location",
            "Wrong exception term",
            "Wrong legal terms",
            "Wrong bail term",
          ],
        },
      },
      cot: {
        hallucinations: {
          count: 7,
          details: [
            '"दिल्ली उच्च न्यायालय" (Delhi HC — actual: Gauhati HC)',
            '"एमएलसी केस"',
            '"आरपीबी" abbreviation',
            '"उत्तराधिकार" for Power of Attorney',
            "DK Baidya named as न्यायमूर्ति",
            "Wrong applicant",
            "Multiple fabricated details",
          ],
        },
        omissions: {
          count: 5,
          details: [
            "Justice Sanjay Kumar Medhi",
            "Rule 67(4) NDPS Rules",
            "Section 8(c) exception",
            "GST ≠ NDPS argument",
            "Counsel names",
          ],
        },
        wrongFacts: {
          count: 9,
          details: [
            "Court wrong (Delhi HC)",
            '"एमएलसी केस"',
            '"उत्तराधिकार" for PoA',
            "DK Baidya as judge",
            "Wrong applicant",
            "Legal terms wrong",
            "Section 37 partially wrong",
            "Interim protection missing",
            "Multiple other errors",
          ],
        },
        wrongLegal: {
          count: 3,
          details: [
            "Court wrong",
            "PoA principle wrong",
            "Section 8(c) missing",
          ],
        },
        translation: {
          count: 7,
          details: [
            "Court wrong (Delhi HC)",
            '"एमएलसी केस"',
            '"उत्तराधिकार" for PoA',
            "Judge wrong",
            "Legal terms wrong",
            "Section terms wrong",
            "Bail term wrong",
          ],
        },
        terminology: {
          count: 7,
          details: [
            "Wrong court",
            "Wrong abbreviation",
            "Wrong PoA term",
            "Wrong judge",
            "Wrong legal terms",
            "Wrong section terms",
            "Wrong bail term",
          ],
        },
      },
    },
    substance: [
      { id: "S1", label: "Gauhati HC", zero: "distorted", few: "hallucinated", cot: "hallucinated" },
      { id: "S2", label: "Justice Sanjay Kumar Medhi", zero: "missing", few: "missing", cot: "missing" },
      { id: "S3", label: "Amal Das v. State of Assam", zero: "distorted", few: "distorted", cot: "hallucinated" },
      { id: "S4", label: "Amal Das / ANM / Hematech PoA", zero: "distorted", few: "reflected", cot: "hallucinated" },
      { id: "S5", label: "NDPS Sections 21(c)/29", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S6", label: "44,160 bottles, 276 cartons", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S7", label: "Truck intercepted", zero: "hallucinated", few: "reflected", cot: "distorted" },
      { id: "S8", label: "E-way bill discrepancy", zero: "missing", few: "reflected", cot: "reflected" },
      { id: "S9", label: "Document anomalies", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S10", label: "Nalini Drugs denied ordering", zero: "distorted", few: "reflected", cot: "reflected" },
      { id: "S11", label: "Organized crime principle", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S12", label: "Recovery not sine qua non", zero: "missing", few: "reflected", cot: "missing" },
      { id: "S13", label: "Commercial quantity", zero: "distorted", few: "reflected", cot: "distorted" },
      { id: "S14", label: "Section 37 not satisfied", zero: "missing", few: "reflected", cot: "distorted" },
      { id: "S15", label: "Bail rejected", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S16", label: "Interim protection cancelled", zero: "missing", few: "reflected", cot: "missing" },
      { id: "S17", label: "IO directed to investigate", zero: "reflected", few: "reflected", cot: "reflected" },
      { id: "S18", label: "Section 8(c) exception", zero: "missing", few: "distorted", cot: "missing" },
      { id: "S19", label: "Rule 67(4)", zero: "missing", few: "missing", cot: "missing" },
      { id: "S20", label: "GST ≠ NDPS argument", zero: "distorted", few: "reflected", cot: "missing" },
      { id: "S21", label: "Counsel A M Bora", zero: "missing", few: "missing", cot: "missing" },
    ],
  },
];
