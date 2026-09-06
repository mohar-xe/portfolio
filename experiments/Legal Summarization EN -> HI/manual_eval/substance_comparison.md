# Substance Comparison: Source vs Generated Summaries

**Legend:**
- ✅ **Reflected** — Fact/principle accurately present in the generated summary
- ⚠️ **Distorted** — Present but stated incorrectly or misleadingly
- ❌ **Missing** — Not present in the generated summary
- 🔴 **Hallucinated** — Fabricated; not in the source at all

---

## Round 1 — *Dinesh Kumar v. GNCTD* (COVID-19 Treatment Reimbursement)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Delhi High Court | "The Delhi High Court on Tuesday directed..." |
| S2 | Judge: Justice Rekha Palli | "Justice Rekha Palli said..." |
| S3 | Petitioner: ADJ Dinesh Kumar, Additional District Judge, Saket Courts | "ADJ Dinesh Kumar was admitted..." |
| S4 | Hospital: PSRI Hospital (respondent no.5) | "the petitioner had no other option but to take treatment at respondent no.5" |
| S5 | Treatment: COVID-19, April 22 – June 7, 2021, second wave | "between April 22 to June 7, 2021 after contracting COVID-19 during the second wave" |
| S6 | Ventilator: 3 weeks | "He remained there on a ventilator for three weeks" |
| S7 | Total bill: Rs. 24,02,380 | "he had to pay Rs. 24,02,380" |
| S8 | Reimbursed: Rs. 7,08,500 | "the government reimbursed only Rs.7,08,500" |
| S9 | Balance: Rs. 16,93,880 | "differential amount of Rs.16,93,880/-" |
| S10 | Circular dated 20.06.2020 (GNCTD) | "circular dated 20.06.2020 issued by the GNCTD" |
| S11 | Court directed respondents 1–3 to pay within 4 weeks | "directing the respondent nos.1 to 3 to pay within four weeks" |
| S12 | May recover from hospital if permissible | "if permissible, recover the same from the respondent no.5" |
| S13 | Court declined to examine circular's validity | "does not deem it appropriate or necessary to delve into the validity of the circular" |
| S14 | Court rejected Delhi Govt's submission to direct hospital to refund | "rejected Delhi Government's submission that the hospital should be directed to explain" |
| S15 | Precedent: *Sqn. Commander Randeep Kumar Rana v. UOI* (Division Bench) | "Referring to the high court's ruling in Sqn. Commander Randeep Kumar Rana" |
| S16 | Employer must pay, can recover from hospital per Rana precedent | "the employer was under an obligation to pay... and could make appropriate recoveries... from the hospital" |
| S17 | Penal action/recovery left to authorities | "including taking penal action" and "recovery of any amount charged in excess" |
| S18 | Counsel: Sr. Adv. J.P. Sengh (petitioner); Avnish Ahlawat (respondent) | "Senior Advocate J.P. Sengh, representing Kumar"; "advocate Avnish Ahlawat submitted" |
| S19 | No beds in empanelled hospitals | "there were no hospital beds available... in any of the empanelled hospitals" |
| S20 | Petitioner's hard-earned savings | "the judge, who had to spend his hard-earned savings" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Delhi High Court | ✅ | ✅ | ✅ |
| S2 | Justice Rekha Palli | ❌ | ❌ | ❌ |
| S3 | ADJ Dinesh Kumar | ⚠️ Gets officer but conflates with counsel | ⚠️ | ⚠️ |
| S4 | PSRI Hospital | 🔴 "Saket Hospital" | 🔴 "Saket Hospital" | ⚠️ "respondent no.5" only |
| S5 | COVID-19, Apr 22–Jun 7, 2021 | ✅ | ✅ | ✅ |
| S6 | Ventilator 3 weeks | 🔴 "एयरटेकर" | ✅ | 🔴 "वाइटर" |
| S7 | Rs. 24,02,380 | ✅ | ✅ | ✅ |
| S8 | Rs. 7,08,500 | ✅ | ✅ | ✅ |
| S9 | Rs. 16,93,880 | ✅ | ✅ | ✅ |
| S10 | Circular 20.06.2020 | ⚠️ "सरकारी आदेश" | ⚠️ | 🔴 "सैक्युलर" (secular) |
| S11 | Pay within 4 weeks | ✅ | ✅ | ✅ |
| S12 | May recover from hospital | ⚠️ | ✅ | ✅ |
| S13 | Court declined circular validity | ❌ | ❌ | ❌ |
| S14 | Court rejected hospital refund submission | ❌ | ❌ | ❌ |
| S15 | *Randeep Kumar Rana* precedent | ❌ | ❌ | ❌ |
| S16 | Employer must pay, recover from hospital | 🔴 Inverted (officer must pay) | ✅ | 🔴 Inverted |
| S17 | Penal action/recovery left to authorities | ❌ | ❌ | ❌ |
| S18 | Counsel names | ❌ | ❌ | ❌ |
| S19 | No beds in empanelled hospitals | ⚠️ | ❌ | ❌ |
| S20 | Hard-earned savings | ❌ | ❌ | ❌ |

**Summary:** Zero-shot 7✅ 4⚠️ 5❌ 4🔴 | Few-shot 9✅ 3⚠️ 6❌ 2🔴 | CoT 8✅ 2⚠️ 6❌ 4🔴

---

## Round 2 — *M/s Shree Guru Kripa Alloys v. State of J&K* (Industrial Power Connection)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: J&K and Ladakh High Court | "The Jammu and Kashmir and Ladakh High Court" |
| S2 | Judge: Justice Waseem Sadiq Nargal (Single Judge) | "Justice Waseem Sadiq Nargal observed" |
| S3 | Petitioner: M/s Shree Guru Kripa Alloys Pvt. Ltd. | "Case Title : M/s Shree Guru Kripa Alloys Pvt. Ltd." |
| S4 | Casting unit at Bari Brahmana, Jammu | "running a Casting Unit at Jammu" |
| S5 | Power load: 2250 KVA (GO 18.10.1995) | "sanctioned power load of 2250 KVA... vide Government Order dated 18.10.1995" |
| S6 | Ban: GO 72-PDD of 2010 (03.03.2010) | "order dated 03.03.2010... no power connection be provided" |
| S7 | Reason: chromite ore unavailability from Orissa | "non availability of chromite ore from the State of Orissa" |
| S8 | Permission: Designate Committee 16.02.2012; Chief Engineer 22.03.2012 | "granting permission... came to be granted by the Chief Engineer on 22.03.2012" |
| S9 | Investment: ~Rs. 4.5 crores | Not explicitly in EN_Summary but in judgment |
| S10 | Withdrawal: 28.12.2015 | "recommendations... dated 28.12.2015" |
| S11 | Ban lifted: GO 57-PDD of 2022 (20.05.2022) | "Government dated 20.05.2022... lifted the ban" |
| S12 | Counsel: Sr. Adv. Pranav Kohli; AAG Amit Gupta | "counsel for the petitioner Sr Adv Pranav Kohli"; "Mr Amit Gupta AAG" |
| S13 | Retrospective operation of GO not permitted | "retrospective operation of a Government Order cannot be permitted" |
| S14 | Executive order, not legislation | "merely an executive order, and not a legislation" |
| S15 | Estoppel: 12 years without challenge | "has not called in question the order... for more than 12 twelve years" |
| S16 | Shifting arc→induction = new connection within ban | "Shifting also falls within the ambit of granting new connections" |
| S17 | Petition dismissed | "dismissed the same" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | J&K and Ladakh HC | 🔴 "उत्तर प्रदेश हाईकोर्ट" | 🔴 "उत्तर प्रदेश हाईकोर्ट" | 🔴 "उत्तर प्रदेश हाईकोर्ट" |
| S2 | Justice Nargal | ❌ | ❌ | ❌ |
| S3 | M/s Shree Guru Kripa Alloys | ⚠️ | ✅ | 🔴 "मशरूक अली खान" |
| S4 | Bari Brahmana, Jammu | ⚠️ | ✅ | ⚠️ |
| S5 | 2250 KVA (GO 18.10.1995) | ✅ | ✅ | ✅ |
| S6 | Ban GO 72-PDD of 2010 | ✅ | ✅ | ✅ |
| S7 | Chromite ore from Orissa | ❌ | ❌ | ❌ |
| S8 | Permission 2012 | ✅ | ✅ | ✅ |
| S9 | ~Rs. 4.5 crores | ✅ | ✅ | ✅ |
| S10 | Withdrawal 28.12.2015 | ⚠️ Presented as judgment date | ✅ | ✅ |
| S11 | Ban lifted GO 57-PDD 2022 | ❌ | ❌ | ❌ |
| S12 | Counsel names | ❌ | ❌ | ❌ |
| S13 | Retrospective operation not permitted | ❌ | ❌ | 🔴 "पश्चिमोत्तर प्रभाव" |
| S14 | Executive order, not legislation | ❌ | ❌ | ❌ |
| S15 | Estoppel (12 years) | ❌ | ❌ | ❌ |
| S16 | Arc→induction = new connection | ✅ | 🔴 Inverted (induction→arc) | ✅ |
| S17 | Petition dismissed | ✅ | ✅ | ✅ |

**Summary:** Zero-shot 5✅ 3⚠️ 5❌ 4🔴 | Few-shot 6✅ 1⚠️ 6❌ 4🔴 | CoT 5✅ 1⚠️ 5❌ 6🔴

---

## Round 3 — *Pundlik Yevatkar v. Sau. Ujwala* (Wife's Desire to Work ≠ Cruelty)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Bombay High Court | "The Bombay High Court has recently held" |
| S2 | Bench: Justices Atul Chandurkar & Urmila Joshi-Phalke | "Division bench of Justices Atul Chandurkar and Urmila Joshi-Phalke" |
| S3 | Case title: *Pundlik Yevatkar v. Sau. Ujwala @ Shubhangi* | "Case title – Pundlik Yevatkar v. Sau. Ujwala" |
| S4 | Wife's desire to work ≠ cruelty | "a wife expressing a desire to work does not amount to cruelty" |
| S5 | Cruelty must be distinguished from wear-and-tear | "cruelty has to be distinguished from the ordinary wear and tear" |
| S6 | Article 21: reproductive choice = personal liberty | "right of a woman to have reproductive choice is an insegregable part of her personal liberty as envisaged under Article 21" |
| S7 | She cannot be forced to give birth | "she cannot be forced to give birth to a child" |
| S8 | Wife's defense: character suspicion by husband/sisters | "her husband and his sisters suspected her character" |
| S9 | Wife left because of character suspicion — more probable | "the reason mentioned by the wife... appears more probable" |
| S10 | Desertion not proved | "there is no evidence to show that wife desire to end the relationship permanently" |
| S11 | No evidence of rude/arrogant behavior | "no evidence that wife's behaviour was rude and arrogant" |
| S12 | Both appeals dismissed | "dismissed the husband's appeal" |
| S13 | Section 13 HMA 1955 | "petition for divorce filed by the husband under Sections 13(ia) and (ib)" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Bombay HC | 🔴 "महाराष्ट्र हाईकोर्ट" | 🔴 "महाराष्ट्र हाई कोर्ट" | 🔴 "महाराष्ट्र हाईकोर्ट" |
| S2 | Justices Chandurkar & Joshi-Phalke | ❌ | ❌ | 🔴 Fabricated 3-judge bench |
| S3 | Case title | 🔴 "'M' v. 'R'" (cited precedent) | ❌ | ❌ |
| S4 | Desire to work ≠ cruelty | ⚠️ | ❌ | ⚠️ |
| S5 | Wear-and-tear principle | ❌ | ❌ | ⚠️ Partially |
| S6 | Article 21 reproductive choice | ❌ | ❌ | ❌ |
| S7 | Cannot be forced to give birth | ❌ | ❌ | ❌ |
| S8 | Wife's character suspicion defense | ❌ | ❌ | ✅ |
| S9 | Wife's reason more probable | ❌ | ❌ | ✅ |
| S10 | Desertion not proved | ⚠️ | ❌ | ⚠️ |
| S11 | No rude/arrogant behavior evidence | ❌ | ❌ | ❌ |
| S12 | Appeals dismissed | ✅ | ✅ | ✅ |
| S13 | Section 13 HMA | ✅ | ❌ | ⚠️ |

**Summary:** Zero-shot 2✅ 3⚠️ 7❌ 1🔴 | Few-shot 1✅ 0⚠️ 9❌ 3🔴 | CoT 3✅ 4⚠️ 5❌ 1🔴

---

## Round 4 — *Esrar Nazrul Ahemad v. State of Maharashtra* (Nude Video / Section 67A IT Act)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Bombay High Court | "the Bombay High Court observed" |
| S2 | Judge: Justice Bharati Dangre | "Justice Bharati Dangre observed" |
| S3 | Applicant: Esrar Nazrul Ahemad | "Case Title: Esrar Nazrul Ahemad Versus State of Maharashtra" |
| S4 | Anticipatory bail rejected | "Refusing anticipatory bail" |
| S5 | FIR: C.R. No. 242 of 2022, Kashimira PS, Thane; 13/04/2022 | "booked him in April 2022" |
| S6 | Charges: Section 67A IT Act; Section 354 IPC | "Section 67A of the Information Technology Act, 2000 and under Section 354 of the Indian Penal Code" |
| S7 | Complainant: 44-year-old married woman, two children | "The 44-year-old woman... married with two children" |
| S8 | Accused: husband's friend, also married | "The accused, her husband's friend, was also a married man" |
| S9 | Consensual relationship → nude video requested | "the two became intimate... accused asked for her nude video" |
| S10 | Shared on assurance of deletion | "shared the video on the assurance that it would be deleted" |
| S11 | 2017: accused's wife/daughter confronted her | "accused's wife and daughter confronted her with the video in 2017" |
| S12 | She severed ties | "she severed ties with the man" |
| S13 | ~3 years later: re-contacted, threatened with video | "after three years, the accused established contact... threatening her" |
| S14 | Video circulated to husband and others | "her husband and several other people received the video" |
| S15 | "Sexually explicit" includes nude video, not just intercourse | "the term 'sexually explicit'... wouldn't only mean the act of intercourse and may also include a nude video" |
| S16 | Section 67A is species of Section 67 (genus) | "Section 67A is a species of Section 67" |
| S17 | Oxford Dictionary definition cited | "cited the Oxford dictionary meaning of 'explicit'" |
| S18 | Legislative intent: prevent exploitation via electronic publication | "intention of the legislature was to do away exploitation of women or children" |
| S19 | Custodial interrogation necessary | "the accusations definitely require custodial interrogation" |
| S20 | Counsel: Mr. Uzair Kazi (applicant); Mr. A.A. Palkar, APP (State) | Not named in EN_Summary |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Bombay HC | 🔴 "महान्यादिलत न्यायालय" | 🔴 "महाराष्ट्र हाई कोर्ट" | 🔴 "महानगर न्यायालय" |
| S2 | Justice Dangre | 🔴 Justice Shinde (cited precedent) | ❌ | ❌ |
| S3 | Esrar Nazrul Ahemad | 🔴 "Mr. Uzair Kazi" (counsel) | 🔴 "उज्जायर काजी" (counsel) | 🔴 "Mr. Uzair Kazi" (counsel) |
| S4 | Anticipatory bail rejected | 🔴 "गिरफ्तार किया गया" (arrested) | ⚠️ | ⚠️ |
| S5 | FIR details | ⚠️ | ✅ | ✅ |
| S6 | Section 67A + 354 IPC | ✅ | ✅ | ✅ |
| S7 | 44-year-old, married, two children | ✅ | ✅ | ✅ |
| S8 | Husband's friend, married | ✅ | ⚠️ Inverted relationship | ✅ |
| S9 | Consensual relationship → nude video | ✅ | ✅ | ✅ |
| S10 | Shared on assurance of deletion | ✅ | ✅ | ✅ |
| S11 | 2017 confrontation | ❌ | ❌ | ❌ |
| S12 | Severed ties | ❌ | ❌ | ❌ |
| S13 | ~3 years later re-contact | ❌ | ❌ | ❌ |
| S14 | Video circulated | ⚠️ | ✅ | ✅ |
| S15 | "Sexually explicit" includes nude video | ✅ | ✅ | ✅ |
| S16 | Section 67A species of Section 67 | ❌ | ❌ | ❌ |
| S17 | Oxford Dictionary cited | ❌ | ❌ | ✅ |
| S18 | Legislative intent: prevent exploitation | ⚠️ | ✅ | ✅ |
| S19 | Custodial interrogation necessary | ❌ | ❌ | ❌ |
| S20 | Counsel names | ❌ | ❌ | ❌ |

**Summary:** Zero-shot 6✅ 4⚠️ 5❌ 5🔴 | Few-shot 7✅ 2⚠️ 5❌ 6🔴 | CoT 8✅ 2⚠️ 5❌ 5🔴

---

## Round 5 — *Dharampal Satyapal Ltd. v. Mehio* (Trademark: RAJNIGANDHA vs. RAJNIPAAN)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Delhi High Court | "The Delhi High Court recently passed a decree" |
| S2 | Judge: Justice Jyoti Singh (Single Judge) | "A Single Judge Bench of Justice Jyoti Singh" |
| S3 | Plaintiff: Dharampal Satyapal Limited (DS Group) | "Dharampal Satyapal Limited - the manufacturers" |
| S4 | Defendants: Youssef Anis Mehio (Def 1), Mya International (Def 2) | "Case Title: Dharampal Satyapal Limited & Anr. v. Mr. Youssef Anis Mehio & Ors." |
| S5 | Trademarks: RAJNI (1980), RAJNIGANDHA (1983) | Implied in "RAJNIGANDHA marks" |
| S6 | Impugned mark: RAJNIPAAN | "halted the production... of any product under the trademark 'RAJNI PAAN'" |
| S7 | RAJNIGANDHA = well-known mark | "Rajnigandha has been previously declared as a well-known trademark" |
| S8 | Deceptive similarity; dishonest adoption | "dishonestly chosen to adopt a deceptively similar trademark" |
| S9 | 'GANDHA' replaced with 'PAAN' | "replaced 'GANDHA' with 'PAAN'" |
| S10 | Order XIII-A CPC summary judgment | "ex-parte summary judgement under Order XIII-A" |
| S11 | Defendants ex parte, no real prospect of defense | "Defendants No. 1 to 4 have no real prospect of defending" |
| S12 | Infringement and passing off made out | "case of infringement of trademark and passing off has been made out" |
| S13 | *Kaviraj Pandit Durga Dutt Sharma* precedent (SC) | "relied on the decision of the Supreme Court in Kaviraj Pandit Durga Dutt Sharma" |
| S14 | Initial interest confusion principle | "principle of 'initial interest confusion' is also attracted" |
| S15 | Triple identity test satisfied | "triple identity test is satisfied" |
| S16 | Allied/cognate goods (Class 34) | "goods are allied and cognate" |
| S17 | Damages: Rs. 3,00,000 notional | "Decree of damages is passed for a sum of Rs. 3,00,000/-" |
| S18 | Actual costs including court fee | "entitled to actual costs, which would include Court fee" |
| S19 | Suit decreed against Defendants 1-4 | "suit is decreed in favour of the Plaintiffs and against Defendants No. 1 to 4" |
| S20 | Permanent injunction | "permanently halted the production, sale or promotion" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Delhi HC | ✅ | ✅ | ✅ |
| S2 | Justice Jyoti Singh | 🔴 Two fabricated judges | ❌ | ❌ |
| S3 | DS Group | ✅ | ✅ | ✅ |
| S4 | Defendants (Mehio, Mya International) | ⚠️ Omits Mehio | ⚠️ | ⚠️ |
| S5 | RAJNI (1980), RAJNIGANDHA (1983) | ✅ | ✅ | ✅ |
| S6 | RAJNIPAAN | ⚠️ "माया" | ⚠️ | ⚠️ |
| S7 | Well-known mark | ✅ | ✅ | ✅ |
| S8 | Deceptive similarity; dishonest adoption | ✅ | ✅ | ✅ |
| S9 | 'GANDHA' → 'PAAN' | ❌ | ❌ | ✅ |
| S10 | Order XIII-A CPC | ❌ | ❌ | ❌ |
| S11 | Defendants ex parte | ❌ | ❌ | ❌ |
| S12 | Infringement + passing off | ✅ | ✅ | ✅ |
| S13 | *Kaviraj Pandit Durga Dutt Sharma* | ❌ | ❌ | ❌ |
| S14 | Initial interest confusion | ❌ | ❌ | ❌ |
| S15 | Triple identity test | ❌ | ❌ | ❌ |
| S16 | Allied/cognate goods | ❌ | ❌ | ✅ |
| S17 | Rs. 3 lakhs damages | ✅ | ✅ | ✅ |
| S18 | Actual costs | ✅ | ✅ | ✅ |
| S19 | Decree against Defendants 1-4 | 🔴 Inverted (against plaintiff) | ⚠️ | ⚠️ |
| S20 | Permanent injunction | 🔴 "निष्पादन समझौते" | 🔴 "निष्पादन समझौते" | ⚠️ |

**Summary:** Zero-shot 7✅ 3⚠️ 5❌ 5🔴 | Few-shot 7✅ 3⚠️ 5❌ 5🔴 | CoT 8✅ 4⚠️ 5❌ 3🔴

---

## Round 6 — *Ratandeep Singh Ahuja v. Harpreet Kaur* (Divorce: Cruelty & Desertion)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Punjab and Haryana High Court | "The Punjab and Haryana High Court recently decreed" |
| S2 | Bench: Justice Ritu Bahri & Justice Nidhi Gupta | "The bench of Justice Ritu Bahri and Justice Nidhi Gupta" |
| S3 | Case: *Ratandeep Singh Ahuja v. Harpreet Kaur*, FAO-M-182 of 2017 | "Case title - Ratandeep Singh Ahuja v. Harpreet Kaur [FAO-M-182 of 2017]" |
| S4 | Marriage: Nov 2012, Sikh rites, Ludhiana | "got married to the respondent/wife in Novemebr 2012" |
| S5 | Cohabited only 9 months; no child | "lived together... only for nine months... no child was born" |
| S6 | Grounds: cruelty and desertion under Section 13 HMA | "under Section 13 of the Hindu Marriage Act,1955... cruelty and desertion" |
| S7 | Trial court: ADJ Patiala dismissed (May 2017) | "dismissed by the Additional District Judge, Patiala in May 2017" |
| S8 | Wife's false allegations against father-in-law | "imputations made against her father-in-law... inappropriate behaviour" |
| S9 | False complaints found by police, not challaned | "complaint... was found to be false by the police, and therefore he was not challaned" |
| S10 | Numerous false complaints: SSP, DSP, Army Wives, NCW, DGMS | "filed innumerable false complaints" |
| S11 | Appeal allowed; divorce under Sections 13(ia) and (ib) | "petition for divorce... under Sections 13(ia) and (ib) was decreed" |
| S12 | Permanent alimony: Rs. 18,00,000 | "permanent alimony of a sum of Rs. 18,00,000/-" |
| S13 | Husband already paid Rs. 23 lacs maintenance | "Husband had already paid Rs. 23 lacs" |
| S14 | Counsel: Mr. Shiv Kumar (appellant); Mr. Rahul Bhargava (respondent) | Not named in EN_Summary |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Punjab and Haryana HC | 🔴 "पंजाब और हिमाचल प्रदेश" | 🔴 "पंजाब और हिमाचल प्रदेश" | 🔴 "पंजाब और हिमाचल प्रदेश" |
| S2 | Justices Bahri & Gupta | ❌ | ❌ | ❌ |
| S3 | Case title / FAO-M-182/2017 | 🔴 Fabricated case number | 🔴 Fabricated | 🔴 Fabricated |
| S4 | Nov 2012 marriage | ✅ | ✅ | ✅ |
| S5 | 9 months cohabitation; no child | ❌ | ❌ | ❌ |
| S6 | Section 13 HMA; cruelty & desertion | ⚠️ | ❌ | ⚠️ |
| S7 | ADJ Patiala dismissed May 2017 | ✅ | ✅ | ✅ |
| S8 | False allegations against father-in-law | ✅ | ✅ | ✅ |
| S9 | False, not challaned | ⚠️ | ❌ | ❌ |
| S10 | Numerous false complaints | ✅ | ✅ | ✅ |
| S11 | Appeal allowed; divorce 13(ia)+(ib) | ✅ | ✅ | ✅ |
| S12 | Rs. 18,00,000 alimony | ✅ | 🔴 "आठ लाख" (8 lakhs) | 🔴 "आठ लाख" (8 lakhs) |
| S13 | Rs. 23 lacs already paid | ✅ | ❌ | ✅ |
| S14 | Counsel names | ❌ | ❌ | ❌ |

**Summary:** Zero-shot 6✅ 2⚠️ 3❌ 3🔴 | Few-shot 4✅ 0⚠️ 6❌ 4🔴 | CoT 5✅ 1⚠️ 4❌ 4🔴

---

## Round 7 — *Bhunesh v. State of Haryana* (Successive Anticipatory Bail / Abuse of Process)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Punjab and Haryana High Court | "The Punjab and Haryana High Court recently deprecated" |
| S2 | Judge: Justice Vikas Bahl | "Justice Vikas Bahl said" |
| S3 | Case: *Bhunesh v State of Haryana* | "Case Title : Bhunesh v State of Haryana" |
| S4 | FIR: No.134, 08.03.2021, Sections 420/467/468/471/120-B IPC | Implied in "forging document to falsely implicate" |
| S5 | First petition: CRM-M-2416-2022, withdrawn 21.01.2022 | "first anticipatory bail petition... counsel sought permission to withdraw" |
| S6 | Counsel promised surrender within 10 days | "assuring that the petitioner will surrender within 10 days" |
| S7 | Prior rejection: ASJ Panipat, 06.01.2022 | Implied in sequence |
| S8 | Second petition: filed after 10-day period lapsed | "filed the present second anticipatory petition after the lapse of the said period" |
| S9 | Co-accused Roshan Lal: bail granted 01.02.2022 | Not in EN_Summary |
| S10 | Forged affidavit on stamp paper submitted to police | "after preparing a forged affidavit, had submitted the same to the police" |
| S11 | Legal principle: successive anticipatory bail ≠ successive regular bail | "stark difference between filing of subsequent/successive regular bail applications... and successive anticipatory bail applications" |
| S12 | "Unscrupulous litigants" withdraw to avoid adverse order | "unfortunate trend being adopted by 'unscrupulous litigants'... withdraw... to avoid a detailed adverse order" |
| S13 | Abuse of process | "is also an abuse of the process of the Court" |
| S14 | Second petition dismissed with Rs. 50,000 costs | "dismissed with costs of Rs. 50,000" |
| S15 | Custodial interrogation necessary | "his custodial interrogation is necessary" |
| S16 | HALSA: costs to be deposited | Implied in Rs. 50,000 costs |
| S17 | Petitioner: main accused who pressurized complainant | "the petitioner being the main accused, who pressurized and harassed the complainant" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Punjab and Haryana HC | 🔴 "हरियाणा हाईकोर्ट" only | 🔴 "हरियाणा हाईकोर्ट" only | 🔴 "हरियाणा हाईकोर्ट" only |
| S2 | Justice Vikas Bahl | ❌ | ❌ | ❌ |
| S3 | *Bhunesh v State* | ⚠️ Case number as title | ⚠️ | ⚠️ |
| S4 | FIR details | ✅ | ✅ | ✅ |
| S5 | First petition withdrawn | ✅ | ✅ | ✅ |
| S6 | 10-day surrender promise | ✅ | ✅ | ✅ |
| S7 | ASJ Panipat rejection | ❌ | ✅ | ❌ |
| S8 | Second petition after 10 days | ✅ | ✅ | ✅ |
| S9 | Co-accused Roshan Lal | ❌ | ❌ | ✅ |
| S10 | Forged affidavit | ✅ | ⚠️ | ✅ |
| S11 | Anticipatory ≠ regular bail principle | ✅ | ✅ | ⚠️ |
| S12 | "Unscrupulous litigants" | ❌ | ❌ | ❌ |
| S13 | Abuse of process | ⚠️ | ⚠️ | ⚠️ |
| S14 | Dismissed + Rs. 50,000 costs | ✅ | ✅ | ✅ |
| S15 | Custodial interrogation necessary | ❌ | ❌ | ❌ |
| S16 | HALSA | ✅ | ⚠️ Listed as respondent | ✅ |
| S17 | Petitioner = main accused | ✅ | ✅ | ✅ |

**Summary:** Zero-shot 7✅ 3⚠️ 5❌ 2🔴 | Few-shot 7✅ 3⚠️ 4❌ 3🔴 | CoT 8✅ 3⚠️ 4❌ 2🔴

---

## Round 8 — *Laxman Thakur v. State (NCT of Delhi)* (NDPS Bail / Faulty Sample Collection)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Delhi High Court | "the Delhi High Court has said" |
| S2 | Judge: Justice Jasmeet Singh | "Justice Jasmeet Singh granted bail" |
| S3 | Applicant: Laxman Thakur | "Title: LAXMAN THAKUR v. STATE" |
| S4 | FIR: No. 0021/2022, 26.02.2022, Sections 20/29 NDPS Act | "FIR registered under sections 20 and 29 of NDPS Act" |
| S5 | Ganja: 12 kg (6 packets, Ajit Kumar) + 10 kg (5 packets, Thakur) | "12 Kgs of Ganja recovered from 6 packets... 5 packets of 2 Kgs each" |
| S6 | Contents mixed before sampling | "were mixed at the time of recovery" |
| S7 | Standing Order 1/88 violated | "standing order 1/88 has been opined to be a 'requirement of law'" |
| S8 | SC precedent: *Union of India v. Bal Mukund* | "Supreme Court in the case titled Union of India v. Bal Mukund & Ors." |
| S9 | Section 37 twin conditions not satisfied | "the rigours of Section 37... will not be applicable" |
| S10 | Bail granted | "Granting bail" |
| S11 | Custody since 26.02.2022 | "Thakur has been in custody since February 26, 2022" |
| S12 | No criminal antecedents | "has no criminal antecedents" |
| S13 | Bail conditions: personal bond + surety Rs. 25,000 | Implied |
| S14 | Report to local PS first Monday monthly | Implied |
| S15 | Surrender passport | Implied |
| S16 | Counsel: Mr. Aggarwal (applicant); Mr. Chauhan APP (State) | Not named in EN_Summary |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Delhi HC | ✅ | ✅ | ✅ |
| S2 | Justice Jasmeet Singh | 🔴 "समूह की बैठक" (group meeting) | ❌ | ❌ |
| S3 | Laxman Thakur | 🔴 "P.N. Commonwealth" | ❌ | 🔴 "P.T.N. Aggarwal" (counsel) |
| S4 | FIR 0021/2022, NDPS | ✅ | ✅ | ✅ |
| S5 | Ganja quantities | ⚠️ Not specified | ⚠️ | ⚠️ |
| S6 | Contents mixed | ✅ | ✅ | ✅ |
| S7 | Standing Order 1/88 | ✅ | ✅ | 🔴 "तालाब" (pond) |
| S8 | *Bal Mukund* precedent | ⚠️ Mentioned | ❌ | 🔴 "संयुक्त राज्य अमेरिका" |
| S9 | Section 37 not applicable | ✅ | ✅ | ⚠️ |
| S10 | Bail granted | ✅ | ✅ | ✅ |
| S11 | Custody since 26.02.2022 | ❌ | ❌ | ❌ |
| S12 | No criminal antecedents | ❌ | ❌ | ❌ |
| S13 | Bail conditions | ⚠️ | ✅ All 9 listed | ⚠️ |
| S14 | Report to PS first Monday | 🔴 "मंगलवार" (Tuesday) | ✅ | ❌ |
| S15 | Surrender passport | ❌ | ✅ | ❌ |
| S16 | Counsel names | ❌ | ❌ | ❌ |

**Summary:** Zero-shot 5✅ 3⚠️ 3❌ 5🔴 | Few-shot 6✅ 2⚠️ 5❌ 3🔴 | CoT 3✅ 2⚠️ 5❌ 6🔴

---

## Round 9 — *Aditi Bakht v. Abhishek Ahuja* (Family Court Bias / Transfer)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Delhi High Court | "The Delhi High Court has said" |
| S2 | Judge: Justice Dinesh Kumar Sharma | "Justice Dinesh Kumar Sharma made the said observation" |
| S3 | Case: *Aditi Bakht v. Abhishek Ahuja* | "CaseTitle: ADITI BAKHT v. ABHISHEK AHUJA" |
| S4 | Petitioner: Aditi Bakht (mother) | "the petitioner mother" |
| S5 | Respondent: Abhishek Ahuja (father) | "the respondent father" |
| S6 | Minor child: Anaaya Ahuja (daughter, under 3) | "minor child" |
| S7 | Family Court Judge: Sh. Sanjeev Kumar Singh, Saket | "Judge, Family Court" |
| S8 | Guardianship Petition No. 8/2021 | "Guardianship Petition" |
| S9 | Impugned orders: 21.08.2021, 22.12.2021, 04.03.2022 | "impugned order" |
| S10 | Bias: judge shared personal mobile number | "judge who had shared his personal mobile number with both the parties" |
| S11 | Bias: judge met respondent unilaterally in chamber | "met one of the parties in chamber" |
| S12 | "Justice must not only be done but appear to have been done" | "justice must not only be done but must also appear to have been done" |
| S13 | Mere apprehension of bias may suffice for transfer | "mere apprehension of bias and not actual bias may be sufficient" |
| S14 | Mere adverse orders not sufficient for transfer | "mere adverse orders are not sufficient to invoke the power of transfer" |
| S15 | Child lived with mother since 18 months | "minor child had lived alone with the mother since she was 18 months old" |
| S16 | Overnight separation harmful to child | "separating the minor child from the mother for overnight visitation... was sudden, drastic" |
| S17 | All three orders set aside | "set aside the two impugned orders" |
| S18 | Transferred to Principal Judge, Family Court | "directing the Principal judge, Family Court to keep the matter" |
| S19 | Decide within 4 weeks | "decide the same... preferably within four weeks" |
| S20 | Child Counselor assistance suggested | "take assistance of the Child Counselor" |
| S21 | Mother allowed to travel June 2022 | Implied in interim arrangements |
| S22 | Passport issue deferred | Implied |
| S23 | Counsel: Arundhati Katju, Bhabna Das, Shristi Bor Thakur (petitioner); Geeta Luthra, Asmita Narula, Apoorva Maheshwari (respondent) | "Advocates Arundhati Katju, Bhabna Das and Shristi Bor Thakur appeared for the petitioner" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Delhi HC | ✅ | ✅ | ✅ |
| S2 | Justice Dinesh Kumar Sharma | ❌ | ❌ | ❌ |
| S3 | *Aditi Bakht v. Abhishek Ahuja* | ⚠️ Reversed direction | ⚠️ Reversed | ✅ |
| S4 | Petitioner = mother | ✅ | 🔴 Father as petitioner | ✅ |
| S5 | Respondent = father | ✅ | 🔴 Mother as respondent | ✅ |
| S6 | Minor child (daughter) | ✅ | 🔴 "बेटे" (son) | 🔴 "छोटी बेटा" (son) |
| S7 | Family Court Judge Sanjeev Kumar Singh | ✅ | ✅ | ✅ |
| S8 | Guardianship Petition No. 8/2021 | ❌ | ✅ | ⚠️ |
| S9 | Three impugned order dates | ✅ | ✅ | ✅ |
| S10 | Judge shared personal mobile | ✅ | ✅ | ✅ |
| S11 | Judge met respondent in chamber | ✅ | ✅ | ✅ |
| S12 | "Justice must appear to have been done" | ✅ | ✅ | ✅ |
| S13 | Mere apprehension of bias suffices | ✅ | ✅ | ✅ |
| S14 | Mere adverse orders not sufficient | ❌ | ❌ | ❌ |
| S15 | Child with mother 18 months | ❌ | ✅ | ✅ |
| S16 | Overnight separation harmful | ⚠️ | ✅ | ✅ |
| S17 | All orders set aside | ✅ | ✅ | ✅ |
| S18 | Transferred to Principal Judge | ✅ | ✅ | ✅ |
| S19 | Decide within 4 weeks | ❌ | ❌ | ❌ |
| S20 | Child Counselor | ✅ | ❌ | 🔴 "बाल न्यायाधीश" (child judge) |
| S21 | Mother travel June 2022 | ✅ | ✅ | ✅ |
| S22 | Passport deferred | ✅ | ✅ | ✅ |
| S23 | Counsel names | ⚠️ Only respondent's | ⚠️ Only respondent's | ⚠️ Only respondent's |

**Summary:** Zero-shot 12✅ 4⚠️ 4❌ 3🔴 | Few-shot 13✅ 2⚠️ 3❌ 5🔴 | CoT 13✅ 3⚠️ 3❌ 4🔴

---

## Round 10 — *Amal Das v. State of Assam* (NDPS Bail / Organized Crime)

### Source Substance

| # | Substance Point | Source Text |
|---|---|---|
| S1 | Court: Gauhati High Court | "The Gauhati High Court recently denied" |
| S2 | Judge: Justice Sanjay Kumar Medhi | "Justice Sanjay Kumar Medhi observed" |
| S3 | Case: *Amal Das v. State of Assam* | "Case Title: AMAL DAS v THE STATE OF ASSAM" |
| S4 | Petitioner: Amal Das (ANM Pharmaceuticals; PoA for Hematech) | "one Anirudh Kumar Singh was running M/s. Hematech... Power of Attorney... in favour of the petitioner" |
| S5 | PS Case: Basistha PS Case No. 1023/2020, Section 21(c)/29 NDPS | "case registered under Section 21(c) / 29 of the NDPS Act" |
| S6 | Contraband: Eskuf cough syrup, 44,160 bottles, 276 cartons | "Eskuf cough syrup in 44,160 bottles in 276 cartons" |
| S7 | Truck: NL-01-AB-9942, intercepted 09.06.2021 | "truck was intercepted" |
| S8 | E-way bill generated 10.06.2021 (day after interception) | Implied in "anomalies/illegalities at different stages" |
| S9 | Document anomalies: different names/addresses, blank filled by hand | "anomalies/illegalities at different stages including GST invoices" |
| S10 | Nalini Drugs Distributor denied ordering | "proprietor has specifically stated that no consignment... was ever made" |
| S11 | NDPS offences = organized crime | "offences under the NDPS Act are part of an organized crime" |
| S12 | Recovery/seizure not sine qua non for arrest/conviction | "recovery or seizure cannot be held to be a sine qua non" |
| S13 | Commercial quantity; chemically manufactured drug | "commercial quantity and the substance is a chemically manufactured drug" |
| S14 | Section 37 twin conditions not satisfied | "The aforesaid two factors did not seem to be fulfilled" |
| S15 | Anticipatory bail rejected | "denied anticipatory bail" |
| S16 | Interim protection of 07.07.2021 cancelled | Implied in "interim order was granted" then revoked |
| S17 | IO directed to investigate further including Karimganj | "directed the Investigating Officer to make all efforts to investigate" |
| S18 | Section 8(c) exception argued | "come under the exception of Section 8(c)" |
| S19 | Rule 67(4) NDPS Rules | "proviso to Rule 67(4) of the NDPS Rules" |
| S20 | GST violation ≠ NDPS violation argument | "subsequent generation of bills can at best be a violation of the GST Act" |
| S21 | Counsel: A M Bora (petitioner) | "Petitioner was represented by advocate A M Bora" |

### Generated Summary Comparison

| # | Source Point | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| S1 | Gauhati HC | ⚠️ Omits "High Court" | 🔴 "असम हाई कोर्ट" | 🔴 "दिल्ली उच्च न्यायालय" |
| S2 | Justice Sanjay Kumar Medhi | ❌ | ❌ | ❌ |
| S3 | *Amal Das v. State of Assam* | ⚠️ | ⚠️ | 🔴 "आरपीबी" |
| S4 | Amal Das / ANM / Hematech PoA | ⚠️ | ✅ | 🔴 "उत्तराधिकार" for PoA |
| S5 | NDPS Sections 21(c)/29 | ✅ | ✅ | ✅ |
| S6 | 44,160 bottles, 276 cartons | ✅ | ✅ | ✅ |
| S7 | Truck intercepted | 🔴 "गिरवी रखने" (mortgaged) | ✅ | ⚠️ |
| S8 | E-way bill discrepancy | ❌ | ✅ | ✅ |
| S9 | Document anomalies | ✅ | ✅ | ✅ |
| S10 | Nalini Drugs denied ordering | ⚠️ | ✅ | ✅ |
| S11 | Organized crime principle | ✅ | ✅ | ✅ |
| S12 | Recovery not sine qua non | ❌ | ✅ | ❌ |
| S13 | Commercial quantity | ⚠️ | ✅ | ⚠️ |
| S14 | Section 37 not satisfied | ❌ | ✅ | ⚠️ |
| S15 | Bail rejected | ✅ | ✅ | ✅ |
| S16 | Interim protection cancelled | ❌ | ✅ | ❌ |
| S17 | IO directed to investigate | ✅ | ✅ | ✅ |
| S18 | Section 8(c) exception | ❌ | ⚠️ "अपेक्षा" | ❌ |
| S19 | Rule 67(4) | ❌ | ❌ | ❌ |
| S20 | GST ≠ NDPS argument | ⚠️ | ✅ | ❌ |
| S21 | Counsel A M Bora | ❌ | ❌ | ❌ |

**Summary:** Zero-shot 6✅ 5⚠️ 6❌ 4🔴 | Few-shot 11✅ 3⚠️ 3❌ 4🔴 | CoT 7✅ 3⚠️ 6❌ 5🔴

---

## Cross-Round Aggregate Summary

| Round | Case | Zero-shot | Few-shot | CoT |
|---|---|---|---|---|
| 1 | COVID-19 Reimbursement | 7✅ 4⚠️ 5❌ 4🔴 | 9✅ 3⚠️ 6❌ 2🔴 | 8✅ 2⚠️ 6❌ 4🔴 |
| 2 | Industrial Power Connection | 5✅ 3⚠️ 5❌ 4🔴 | 6✅ 1⚠️ 6❌ 4🔴 | 5✅ 1⚠️ 5❌ 6🔴 |
| 3 | Wife's Desire to Work | 2✅ 3⚠️ 7❌ 1🔴 | 1✅ 0⚠️ 9❌ 3🔴 | 3✅ 4⚠️ 5❌ 1🔴 |
| 4 | Nude Video / Section 67A | 6✅ 4⚠️ 5❌ 5🔴 | 7✅ 2⚠️ 5❌ 6🔴 | 8✅ 2⚠️ 5❌ 5🔴 |
| 5 | RAJNIGANDHA Trademark | 7✅ 3⚠️ 5❌ 5🔴 | 7✅ 3⚠️ 5❌ 5🔴 | 8✅ 4⚠️ 5❌ 3🔴 |
| 6 | Divorce: Cruelty & Desertion | 6✅ 2⚠️ 3❌ 3🔴 | 4✅ 0⚠️ 6❌ 4🔴 | 5✅ 1⚠️ 4❌ 4🔴 |
| 7 | Successive Anticipatory Bail | 7✅ 3⚠️ 5❌ 2🔴 | 7✅ 3⚠️ 4❌ 3🔴 | 8✅ 3⚠️ 4❌ 2🔴 |
| 8 | NDPS Bail / Faulty Sample | 5✅ 3⚠️ 3❌ 5🔴 | 6✅ 2⚠️ 5❌ 3🔴 | 3✅ 2⚠️ 5❌ 6🔴 |
| 9 | Family Court Bias / Transfer | 12✅ 4⚠️ 4❌ 3🔴 | 13✅ 2⚠️ 3❌ 5🔴 | 13✅ 3⚠️ 3❌ 4🔴 |
| 10 | NDPS Bail / Organized Crime | 6✅ 5⚠️ 6❌ 4🔴 | 11✅ 3⚠️ 3❌ 4🔴 | 7✅ 3⚠️ 6❌ 5🔴 |
| **Avg** | | **6.3✅ 3.4⚠️ 4.8❌ 3.6🔴** | **7.1✅ 1.9⚠️ 5.2❌ 4.0🔴** | **6.8✅ 2.5⚠️ 5.0❌ 4.0🔴** |

### Key Findings

1. **No method reflects more than ~55% of source substance accurately** — even the best (Few-shot at 7.1 avg ✅) misses nearly half of the source material.

2. **Hallucination rate is consistently high** — all three methods average 3.6–4.0 hallucinated points per round, meaning they fabricate content that doesn't exist in the source.

3. **Few-shot has the highest ✅ rate** (7.1) but also the highest 🔴 rate (4.0) — it captures more facts but also invents more.

4. **CoT is worst on hallucination density** — despite its "reasoning" approach, it produces the most distorted content (highest ⚠️ + 🔴 combined in several rounds).

5. **Systematic missing categories across all methods:**
   - Judge names (missing in 9/10 rounds)
   - Counsel names (missing in 7/10 rounds)
   - Precedent case names (missing in 6/10 rounds)
   - Subsidiary legal principles (estoppel, Article 21, initial interest confusion, etc.)

6. **Systematic hallucination categories:**
   - Court names (wrong court in 7/10 rounds)
   - Party names (fabricated or swapped in 5/10 rounds)
   - Legal terminology (wrong Hindi terms for bail, injunction, respondent, etc.)
