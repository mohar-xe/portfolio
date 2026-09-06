import type { ErrorCategory } from "./experiment-errors";

export interface TextHighlight {
  text: string;
  category: ErrorCategory;
}

export interface ReferenceOmission {
  text: string;
  methods: ("zero" | "few" | "cot")[];
}

export interface SampleHighlights {
  sampleId: string;
  methods: {
    zero: TextHighlight[];
    few: TextHighlight[];
    cot: TextHighlight[];
  };
  referenceOmissions: ReferenceOmission[];
}

export const highlights: SampleHighlights[] = [
  // ── Sample 1: COVID-19 Reimbursement ──
  {
    sampleId: "Sample_1",
    methods: {
      zero: [
        { text: "सकेत हॉस्पिटल", category: "hallucinations" },
        { text: "रासा", category: "translation" },
        { text: "अज्ञात", category: "wrongFacts" },
        { text: "डिवीजन बेंच", category: "wrongLegal" },
        { text: "व्रित", category: "translation" },
        { text: "अनुभवी वकील", category: "omissions" },
        { text: "सरकारी आदेश", category: "terminology" },
      ],
      few: [
        { text: "सकेत हॉस्पिटल", category: "hallucinations" },
        { text: "एयरटेकर", category: "hallucinations" },
        { text: "अज्ञात", category: "wrongFacts" },
        { text: "अनुभवी वकील", category: "omissions" },
        { text: "सरकारी आदेश", category: "terminology" },
        { text: "एडिशनल डिस्ट्रिक्ट जज", category: "terminology" },
      ],
      cot: [
        { text: "सकेत कोर्ट", category: "hallucinations" },
        { text: "वाइटर", category: "hallucinations" },
        { text: "सैक्युलर", category: "hallucinations" },
        { text: "रिसाव", category: "hallucinations" },
        { text: "रेस्पॉन्डेंट", category: "terminology" },
        { text: "डिवीजन बेंच", category: "wrongLegal" },
        { text: "रिसाव करने वाले", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस रेखा पल्ली", methods: ["zero", "few", "cot"] },
      { text: "PSRI अस्पताल", methods: ["zero", "few", "cot"] },
      { text: "जे.पी. सेंघ", methods: ["zero", "few", "cot"] },
      { text: "अवनीश अहलावत", methods: ["zero", "few", "cot"] },
      { text: "रणदीप कुमार राणा", methods: ["zero", "few", "cot"] },
      { text: "परिपत्र दिनांक 20.06.2020", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 2: Industrial Power Connection ──
  {
    sampleId: "Sample_2",
    methods: {
      zero: [
        { text: "उत्तर प्रदेश हाईकोर्ट", category: "hallucinations" },
        { text: "सार्वजनिक तारीख", category: "hallucinations" },
        { text: "चार्टर", category: "hallucinations" },
        { text: "व्राइट पेटिशन", category: "translation" },
      ],
      few: [
        { text: "एयर फर्नेस", category: "hallucinations" },
        { text: "20 अक्टूबर 2023", category: "hallucinations" },
        { text: "संपूर्णता से", category: "translation" },
        { text: "बैन", category: "translation" },
        { text: "सैंक्शन", category: "translation" },
      ],
      cot: [
        { text: "उत्तर प्रदेश हाईकोर्ट", category: "hallucinations" },
        { text: "मशरूक अली खान", category: "hallucinations" },
        { text: "संयुक्त सचिव (विद्युत)", category: "hallucinations" },
        { text: "पश्चिमोत्तर", category: "hallucinations" },
        { text: "विषय धारण", category: "translation" },
        { text: "व्याख्यान", category: "translation" },
        { text: "M. Ali Khan", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस वसीम सादिक नर्गल", methods: ["zero", "few", "cot"] },
      { text: "क्रोमाइट अयस्क", methods: ["zero", "few", "cot"] },
      { text: "BSNL बनाम टाटा कम्युनिकेशंस", methods: ["zero", "few", "cot"] },
      { text: "12 साल", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 3: Wife's Desire to Work ──
  {
    sampleId: "Sample_3",
    methods: {
      zero: [
        { text: "महाराष्ट्र हाईकोर्ट", category: "hallucinations" },
        { text: "'M' v. 'R'", category: "hallucinations" },
      ],
      few: [
        { text: "महाराष्ट्र हाई कोर्ट", category: "hallucinations" },
      ],
      cot: [
        { text: "महाराष्ट्र हाईकोर्ट", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस अतुल चंदूरकर", methods: ["zero", "few", "cot"] },
      { text: "जस्टिस उर्मिला जोशी-फाल्के", methods: ["zero", "few", "cot"] },
      { text: "अनुच्छेद 21", methods: ["zero", "few", "cot"] },
      { text: "प्रजनन अधिकार", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 4: Nude Video / Section 67A ──
  {
    sampleId: "Sample_4",
    methods: {
      zero: [
        { text: "महान्यादिलत न्यायालय", category: "hallucinations" },
        { text: "Uzair Kazi", category: "hallucinations" },
        { text: "गिरफ्तार किया गया", category: "hallucinations" },
        { text: "जस्टिस शिंदे", category: "hallucinations" },
      ],
      few: [
        { text: "महाराष्ट्र हाई कोर्ट", category: "hallucinations" },
        { text: "उज्जायर काजी", category: "hallucinations" },
      ],
      cot: [
        { text: "महानगर न्यायालय", category: "hallucinations" },
        { text: "Uzair Kazi", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस भारती डांगरे", methods: ["zero", "few", "cot"] },
      { text: "एसआर नजरुल अहमद", methods: ["zero", "few", "cot"] },
      { text: "2017", methods: ["zero", "few", "cot"] },
      { text: "ऑक्सफोर्ड डिक्शनरी", methods: ["zero", "few"] },
    ],
  },

  // ── Sample 5: RAJNIGANDHA Trademark ──
  {
    sampleId: "Sample_5",
    methods: {
      zero: [
        { text: "निष्पादन समझौते", category: "hallucinations" },
        { text: "दो न्यायाधीश", category: "hallucinations" },
      ],
      few: [
        { text: "निष्पादन समझौते", category: "hallucinations" },
      ],
      cot: [
        { text: "由被告", category: "hallucinations" },
        { text: "निष्पादन समझौते", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस ज्योति सिंह", methods: ["zero", "few", "cot"] },
      { text: "ऑर्डर XIII-A", methods: ["zero", "few", "cot"] },
      { text: "प्रारंभिक हित भ्रम", methods: ["zero", "few", "cot"] },
      { text: "तिहरी पहचान परीक्षा", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 6: Divorce — Cruelty & Desertion ──
  {
    sampleId: "Sample_6",
    methods: {
      zero: [
        { text: "हिमाचल प्रदेश", category: "hallucinations" },
        { text: "एकठान", category: "hallucinations" },
        { text: "पक्षी", category: "terminology" },
        { text: "प्रतिपक्षी", category: "terminology" },
      ],
      few: [
        { text: "हिमाचल प्रदेश", category: "hallucinations" },
        { text: "हर्पिरीत सिंह", category: "hallucinations" },
        { text: "रविंद्र कौर", category: "hallucinations" },
        { text: "आठ लाख", category: "hallucinations" },
        { text: "पक्षी", category: "terminology" },
      ],
      cot: [
        { text: "हिमाचल प्रदेश", category: "hallucinations" },
        { text: "नैतिकता का अभाव", category: "wrongLegal" },
        { text: "आठ लाख", category: "hallucinations" },
        { text: "पक्षी", category: "terminology" },
        { text: "उत्तरावत", category: "terminology" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस रितु बाहरी", methods: ["zero", "few", "cot"] },
      { text: "जस्टिस निधि गुप्ता", methods: ["zero", "few", "cot"] },
      { text: "नौ महीने", methods: ["zero", "few", "cot"] },
      { text: "23 लाख", methods: ["few", "cot"] },
    ],
  },

  // ── Sample 7: Successive Anticipatory Bail ──
  {
    sampleId: "Sample_7",
    methods: {
      zero: [
        { text: "हरीयाणा हाईकोर्ट", category: "hallucinations" },
        { text: "फायर", category: "translation" },
        { text: "अनुच्छेद", category: "translation" },
        { text: "वाक्य", category: "terminology" },
        { text: "श्री अजय गंगास", category: "hallucinations" },
      ],
      few: [
        { text: "हरियाणा हाई कोर्ट", category: "hallucinations" },
        { text: "पूर्व आतंक बails", category: "translation" },
        { text: "भुनेश सिंह", category: "hallucinations" },
        { text: "वाक्य", category: "terminology" },
      ],
      cot: [
        { text: "हरीयाणा हाईकोर्ट", category: "hallucinations" },
        { text: "अंतिम बेल", category: "translation" },
        { text: "Mr. Ajay Ghangas", category: "hallucinations" },
        { text: "पुलिस स्टेशन समालखा", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस विकास बहल", methods: ["zero", "few", "cot"] },
      { text: "बेईमान वादियों", methods: ["zero", "few", "cot"] },
      { text: "रोशन लाल", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 8: NDPS Bail / Faulty Sample ──
  {
    sampleId: "Sample_8",
    methods: {
      zero: [
        { text: "पी.एन.कॉमनवेल्थ", category: "hallucinations" },
        { text: "पीटीएच.एल.अगरवाल", category: "hallucinations" },
        { text: "समूह की बैठक", category: "hallucinations" },
        { text: "26 फरवरी 2023", category: "hallucinations" },
        { text: "मंगलवार", category: "wrongFacts" },
      ],
      few: [
        { text: "जज्जागिरापुर", category: "hallucinations" },
        { text: "दवाइयों", category: "hallucinations" },
        { text: "नियमित बॉल", category: "translation" },
      ],
      cot: [
        { text: "पीटी.एन. एगgarwal", category: "hallucinations" },
        { text: "तालाब", category: "hallucinations" },
        { text: "संयुक्त राज्य अमेरिका", category: "hallucinations" },
        { text: "15लाख", category: "wrongFacts" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस जसमीत सिंह", methods: ["zero", "few", "cot"] },
      { text: "लक्ष्मण ठाकुर", methods: ["zero", "few", "cot"] },
      { text: "स्टैंडिंग ऑर्डर 1/88", methods: ["few"] },
      { text: "26.02.2022", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 9: Family Court Bias / Transfer ──
  {
    sampleId: "Sample_9",
    methods: {
      zero: [
        { text: "संयुक्त न्याय के सिद्धांत", category: "hallucinations" },
        { text: "अभियुत", category: "hallucinations" },
        { text: "गार्डशिप्स पीटिशन", category: "terminology" },
        { text: "विजिटेशन अधिकारों", category: "terminology" },
        { text: "रिस्पॉन्डेंट", category: "terminology" },
        { text: "पक्षी", category: "terminology" },
        { text: "वाक्य", category: "terminology" },
      ],
      few: [
        { text: "संयुक्त न्याय के सिद्धांत", category: "hallucinations" },
        { text: "बेटे", category: "hallucinations" },
        { text: "गार्डशिप्स पीटिशन", category: "terminology" },
        { text: "विजिटेशन", category: "terminology" },
        { text: "overnight stay", category: "terminology" },
      ],
      cot: [
        { text: "रिस्पॉन्डेंट माता-पिता", category: "hallucinations" },
        { text: "बाल न्यायाधीश", category: "hallucinations" },
        { text: "छोटी बेटा", category: "hallucinations" },
        { text: "गार्डशिप", category: "terminology" },
        { text: "रिस्पॉन्डेंट", category: "terminology" },
        { text: "पक्षी", category: "terminology" },
        { text: "वाक्य", category: "terminology" },
        { text: "निष्पादित", category: "terminology" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस दिनेश कुमार शर्मा", methods: ["zero", "few", "cot"] },
      { text: "अरुंधति कात्जू", methods: ["zero", "few", "cot"] },
      { text: "18 महीने", methods: ["zero", "cot"] },
      { text: "किनरी धीर", methods: ["zero", "few", "cot"] },
    ],
  },

  // ── Sample 10: NDPS Bail / Organized Crime ──
  {
    sampleId: "Sample_10",
    methods: {
      zero: [
        { text: "गिरवी रखने", category: "hallucinations" },
        { text: "बाहरी न्यायाधीश", category: "hallucinations" },
        { text: "05 अप्रैल 2022", category: "hallucinations" },
      ],
      few: [
        { text: "असम हाई कोर्ट", category: "hallucinations" },
        { text: "20 अक्टूबर 2023", category: "hallucinations" },
        { text: "अपेक्षा", category: "translation" },
      ],
      cot: [
        { text: "दिल्ली उच्च न्यायालय", category: "hallucinations" },
        { text: "एमएलसी केस", category: "hallucinations" },
        { text: "उत्तराधिकार", category: "hallucinations" },
        { text: "आरपीबी", category: "hallucinations" },
      ],
    },
    referenceOmissions: [
      { text: "जस्टिस संजय कुमार मेहदी", methods: ["zero", "few", "cot"] },
      { text: "गुवाहाटी हाईकोर्ट", methods: ["few", "cot"] },
      { text: "Rule 67(4)", methods: ["zero", "few", "cot"] },
      { text: "A M बोरा", methods: ["zero", "few", "cot"] },
    ],
  },
];
