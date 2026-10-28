# Taiwan Crime Rate & Robbery Analysis (2015–2025)

An empirical data analytics and interactive visualization platform examining the decade-long trajectory of robbery, violent crime, and structural shifts in Taiwan's criminal justice landscape.

---

## 📌 Project Overview

This project provides an end-to-end analytical suite based on data published by the **Taiwan National Police Agency (NPA)**, **Ministry of the Interior (MOI)**, **Directorate-General of Budget, Accounting and Statistics (DGBAS)**, and indexed on **[Statista (Statistic #937687)](https://www.statista.com/statistics/937687/taiwan-number-of-robbery-cases/)**.

### 🌟 Key Findings
- **-66.5% Net Reduction:** Reported robbery and snatch-and-grab cases decreased from **740** cases in 2015 down to **248** in 2025 (**-10.4% CAGR**).
- **Historic Record Low in 2024:** Taiwan recorded its lowest number of robbery cases in modern history (**151 cases** across 23.4 million citizens, or **0.65 per 100k**).
- **Exceptional Clearance Rate:** Averaging **98.45%** over the decade (peaking at 99.5% in 2023), driven by municipal cloud surveillance and license-plate tracking grids.
- **The Great Crime Shift:** Traditional street crimes (Robbery + Theft) plummeted by **-50.4%**, while cyber, investment, and telecommunications fraud (詐欺) expanded by **+127.4%**, driving landmark reforms such as the 2024 Anti-Fraud Special Act (*打詐專法*).

---

## 🚀 Quick Start

### Option 1: One-Click Windows Launcher
Double-click `run.bat` in this folder, or execute:
```cmd
run.bat
```
This automatically launches the server and opens `http://localhost:8000` in your default web browser.

### Option 2: Python Local Server & API
Run the zero-dependency Python server:
```bash
python server.py
```
Then visit **`http://localhost:8000`** in any browser.

### Option 3: Direct Offline Browser Open
Simply double-click [`index.html`](file:///C:/Users/User/.gemini/antigravity/scratch/taiwan-crime-rate-analysis/index.html) to open the interactive dashboard locally without running any server.

---

## 📊 Dataset: 2015–2025 Longitudinal Overview

| Year | Reported Robberies | YoY Change (%) | Solved Cases | Clearance Rate (%) | Population | Rate per 100k | Key Context |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **2015** | 740 | Baseline | 712 | 96.2% | 23,492,000 | 3.15 | Baseline year; pre-existing multi-year decline |
| **2016** | 643 | -13.11% | 624 | 97.0% | 23,540,000 | 2.73 | Expansion of cloud CCTV and ALPR networks |
| **2017** | 523 | -18.66% | 512 | 97.9% | 23,571,000 | 2.22 | Motorbike bag snatching drops across metro areas |
| **2018** | 399 | -23.71% | 393 | 98.5% | 23,589,000 | 1.69 | Cases drop below 400 nationwide for the first time |
| **2019** | 329 | -17.54% | 324 | 98.5% | 23,603,000 | 1.39 | Mobile payments reduce physical cash handling |
| **2020** | 281 | -14.59% | 279 | 99.3% | 23,561,000 | 1.19 | COVID onset; street mobility drops, clearance >99% |
| **2021** | 267 | -4.98% | 265 | 99.3% | 23,375,000 | 1.14 | Level 3 pandemic alert; overall crime trough |
| **2022** | 233 | -12.73% | 231 | 99.1% | 23,264,000 | 1.00 | Robbery rate hits parity of 1 case per 100,000 |
| **2023** | 209 | -10.30% | 208 | 99.5% | 23,420,000 | 0.89 | Sub-1.0 rate per 100k; historic peak clearance |
| **2024** | 151 | -27.75% | 150 | 99.3% | 23,405,000 | 0.65 | All-time historical record low (151 cases) |
| **2025** | 248 | +64.24% | 244 | 98.4% | 23,380,000 | 1.06 | Post-pandemic normalization, yet -66.5% vs 2015 |

---

## 🗂️ Project Structure

```
taiwan-crime-rate-analysis/
├── README.md                      # Comprehensive project documentation
├── ANALYSIS_REPORT.md             # In-depth executive research paper
├── index.html                     # Interactive dashboard user interface
├── styles.css                     # Modern dark theme & responsive layout
├── app.js                         # Dynamic visualization logic & Chart.js integration
├── server.py                      # Zero-dependency HTTP server & REST API
├── run.bat                        # Windows one-click desktop launcher
├── data/
│   ├── taiwan_robbery_2015_2025.csv       # Longitudinal CSV dataset
│   ├── taiwan_robbery_2015_2025.json      # Structured JSON with metadata
│   ├── taiwan_crime_macro_2015_2025.json  # Macro crime trends (Theft, Violent, Fraud)
│   └── analysis_summary.json              # Statistical metrics & CAGR output
└── scripts/
    ├── analyze.py                 # Calculates mathematical & statistical metrics
    └── export_summary.py          # Auto-generates markdown research report
```

---

## 🔌 Built-in REST API Endpoints

When `server.py` is running, the following endpoints are available:

- **`GET /api/robbery-stats`**: Complete longitudinal robbery records (2015–2025) with YoY deltas and notes.
- **`GET /api/macro-stats`**: Macro comparative statistics (Violent Crimes, Total Offenses, Theft, and Fraud) and regional municipality distribution.
- **`GET /api/summary`**: Computed summary metrics (mean, median, standard deviation, CAGR, net reduction).

---

## 📚 Official Sources & References

1. **Statista (Statistic #937687):** [Number of robbery cases in Taiwan from 2015 to 2025](https://www.statista.com/statistics/937687/taiwan-number-of-robbery-cases/)
2. **National Police Agency (NPA), Ministry of the Interior, ROC:** [警政統計年報與刑事案件統計](https://www.npa.gov.tw)
3. **Directorate-General of Budget, Accounting and Statistics (DGBAS):** *Statistical Yearbook of the Republic of China 2025* (p. 63)
4. **Ministry of Justice (MOJ), ROC:** *Crime Situation and Analysis Annual Reports* (法務部犯罪狀況及其分析)
