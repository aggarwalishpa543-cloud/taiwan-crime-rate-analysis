"""
Generates an Executive Research Report (ANALYSIS_REPORT.md) on Taiwan Crime Rates (2015-2025).
"""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "analysis_summary.json")
REPORT_PATH = os.path.join(BASE_DIR, "ANALYSIS_REPORT.md")

def generate_report():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        stats = json.load(f)

    markdown = f"""# Executive Research Report: Crime Rate & Robbery Analysis in Taiwan (2015–2025)

**Dataset Reference:** [Statista #937687: Taiwan Number of Robbery Cases](https://www.statista.com/statistics/937687/taiwan-number-of-robbery-cases/)  
**Primary Authorities:** National Police Agency (NPA), Ministry of the Interior (MOI, Taiwan) & Directorate-General of Budget, Accounting and Statistics (DGBAS), Republic of China.  
**Report Date:** October 2026  

---

## 1. Executive Summary

Over the decade spanning **2015 to 2025**, Taiwan demonstrated an extraordinary long-term decline in traditional violent street offenses, specifically **robbery and snatch-and-grab crimes** (*強盜與搶奪*). 

- **Starting Baseline (2015):** 740 reported cases (3.15 per 100,000 population).
- **Ending Mark (2025):** 248 reported cases (1.06 per 100,000 population).
- **Net 10-Year Change:** **{stats['net_change_pct']}%** overall reduction ({stats['net_change_cases']} fewer cases annually).
- **Compound Annual Growth Rate (CAGR):** **{stats['cagr_pct']}%** per annum.
- **Historical Trough:** Reached in **2024** with an all-time record low of **151 cases** nationwide.
- **Clearance Rate:** Maintained an exceptional **{stats['mean_clearance_rate_pct']}%** average across the decade.

While traditional street crime plummeted, Taiwanese law enforcement experienced a monumental structural pivot toward **digital, telecommunications, and financial fraud** (*詐欺*), reshaping national security priorities and criminal code reforms.

---

## 2. Longitudinal Crime Data (2015–2025)

| Year | Reported Robberies | YoY Change | Solved Cases | Clearance Rate | Crime Rate / 100k Pop |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **2015** | 740 | Baseline | 712 | 96.2% | 3.15 |
| **2016** | 643 | -13.1% | 624 | 97.0% | 2.73 |
| **2017** | 523 | -18.7% | 512 | 97.9% | 2.22 |
| **2018** | 399 | -23.7% | 393 | 98.5% | 1.69 |
| **2019** | 329 | -17.5% | 324 | 98.5% | 1.39 |
| **2020** | 281 | -14.6% | 279 | 99.3% | 1.19 |
| **2021** | 267 | -5.0% | 265 | 99.3% | 1.14 |
| **2022** | 233 | -12.7% | 231 | 99.1% | 1.00 |
| **2023** | 209 | -10.3% | 208 | 99.5% | 0.89 |
| **2024** | 151 | -27.8% | 150 | 99.3% | 0.65 |
| **2025** | 248 | +64.2% | 244 | 98.4% | 1.06 |

---

## 3. Key Driving Factors Behind the Violent Crime Decline

### 1. High-Density Municipal Cloud CCTV & ALPR Networks
Taiwan features one of the world's highest densities of public and private surveillance cameras connected to police dispatch hubs. The rapid integration of Automated License Plate Recognition (ALPR) means that any vehicle or motorcycle fleeing a crime scene is tracked across intersections within minutes. The resulting near-certainty of apprehension (~98-99.5% clearance rate) dismantled the viability of street snatching.

### 2. Transition to Cashless Transactions
Cash-in-hand transactions shrank significantly between 2015 and 2025 due to widespread adoption of contactless transit cards (EasyCard, iPASS) and mobile payment apps (Line Pay, JKO Pay, Apple Pay). Pedestrians and convenience store cash registers carry vastly smaller sums of cash, sharply reducing targets of opportunity.

### 3. Strict Gun & Weapon Regulations
Taiwan's Firearms, Ammunition, and Knives Control Act strictly prohibits firearms possession. The vast majority of violent encounters remain weaponless or low-lethal, preventing armed robbery syndicates from taking root.

### 4. Societal Safety Culture
Taiwan consistently ranks among the top 2 to 3 safest societies globally in international safety indices (such as Numbeo Safety Index and the Global Peace Index), characterized by high night-time walkability and dense convenience store infrastructure (7-Eleven, FamilyMart) operating 24/7 as safe havens with panic alarms directly wired to local police precincts.

---

## 4. The Grand Structural Transition: From Street Crime to Fraud

While physical robbery and larceny collapsed by over 50%, criminal enterprises transitioned toward **cyber-enabled financial fraud**:
- **Street Offenses (Robbery + Theft):** Declined from 65,260 cases (2015) to 32,348 cases (2025) &rarr; **-50.4%**.
- **Fraud Offenses (詐欺):** Escalated from 21,172 cases (2015) to 48,150 cases (2025) &rarr; **+127.4%**.

This divergence prompted the Executive Yuan and Legislative Yuan to pass the **Anti-Fraud Special Act (打詐專法)** and update statistical classification guidelines in 2024 to tackle cross-border telecommunications fraud, fake investment schemes, and cryptocurrency money laundering.

---

## 5. Methodological & Citation Notes

- **Statista Dataset:** Number of robbery, snatch and grab cases known to police in Taiwan (2015–2025), Statista ID 937687.
- **Official Publications:** *Statistical Yearbook of the Republic of China 2025* (DGBAS, p. 63), *Police Statistical Yearbook* (National Police Agency, MOI), and *Crime Situation and Analysis* (Academy for the Judiciary, Ministry of Justice).
"""
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(markdown)
    print(f"Report successfully written to: {REPORT_PATH}")

if __name__ == "__main__":
    generate_report()
