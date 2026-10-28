"""
Taiwan Crime Statistics & Robbery Trend Analysis (2015-2025)
Calculates summary statistics, CAGR, YoY changes, moving averages,
and structural crime shift metrics using only Python standard library.
"""

import csv
import json
import math
import os
import statistics

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE_DIR, "data", "taiwan_robbery_2015_2025.csv")
MACRO_JSON_PATH = os.path.join(BASE_DIR, "data", "taiwan_crime_macro_2015_2025.json")
OUTPUT_STATS_PATH = os.path.join(BASE_DIR, "data", "analysis_summary.json")

def load_data():
    records = []
    with open(CSV_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append({
                "year": int(row["year"]),
                "robbery_cases": int(row["robbery_cases"]),
                "yoy_change_pct": float(row["yoy_change_pct"]) if row["yoy_change_pct"] else None,
                "solved_cases": int(row["solved_cases"]),
                "clearance_rate_pct": float(row["clearance_rate_pct"]),
                "population": int(row["population"]),
                "rate_per_100k": float(row["rate_per_100k"]),
            })
    return records

def calculate_analytics(records):
    years = [r["year"] for r in records]
    cases = [r["robbery_cases"] for r in records]
    rates = [r["rate_per_100k"] for r in records]
    clearance = [r["clearance_rate_pct"] for r in records]

    n_years = len(records)
    val_start = records[0]["robbery_cases"]  # 2015
    val_end = records[-1]["robbery_cases"]    # 2025
    cagr = ((val_end / val_start) ** (1 / (n_years - 1)) - 1) * 100

    peak_rec = max(records, key=lambda x: x["robbery_cases"])
    trough_rec = min(records, key=lambda x: x["robbery_cases"])

    # 3-year moving averages
    rolling_3yr = []
    for i in range(len(cases)):
        if i < 2:
            rolling_3yr.append(None)
        else:
            avg = sum(cases[i-2:i+1]) / 3.0
            rolling_3yr.append(round(avg, 1))

    # Total 10-year percentage reduction
    total_reduction_pct = ((val_end - val_start) / val_start) * 100

    stats = {
        "timeframe": f"{years[0]}-{years[-1]}",
        "total_years": n_years,
        "baseline_2015": val_start,
        "latest_2025": val_end,
        "net_change_cases": val_end - val_start,
        "net_change_pct": round(total_reduction_pct, 2),
        "cagr_pct": round(cagr, 2),
        "mean_annual_cases": round(statistics.mean(cases), 1),
        "median_annual_cases": statistics.median(cases),
        "stdev_cases": round(statistics.stdev(cases), 2),
        "min_cases": {"year": trough_rec["year"], "cases": trough_rec["robbery_cases"]},
        "max_cases": {"year": peak_rec["year"], "cases": peak_rec["robbery_cases"]},
        "mean_clearance_rate_pct": round(statistics.mean(clearance), 2),
        "min_clearance_rate_pct": min(clearance),
        "max_clearance_rate_pct": max(clearance),
        "mean_rate_per_100k": round(statistics.mean(rates), 2),
        "latest_rate_per_100k": rates[-1],
        "rolling_3yr_moving_avg": dict(zip(years, rolling_3yr))
    }

    # Macro analysis comparison: Street Crime vs Fraud
    with open(MACRO_JSON_PATH, "r", encoding="utf-8") as f:
        macro_data = json.load(f)["macro_trends"]

    street_2015 = macro_data[0]["robbery_and_snatch"] + macro_data[0]["theft"]
    street_2025 = macro_data[-1]["robbery_and_snatch"] + macro_data[-1]["theft"]
    street_change_pct = ((street_2025 - street_2015) / street_2015) * 100

    fraud_2015 = macro_data[0]["fraud"]
    fraud_2025 = macro_data[-1]["fraud"]
    fraud_change_pct = ((fraud_2025 - fraud_2015) / fraud_2015) * 100

    stats["macro_shift"] = {
        "street_crime_2015": street_2015,
        "street_crime_2025": street_2025,
        "street_crime_change_pct": round(street_change_pct, 2),
        "fraud_crime_2015": fraud_2015,
        "fraud_crime_2025": fraud_2025,
        "fraud_crime_change_pct": round(fraud_change_pct, 2)
    }

    return stats

def main():
    records = load_data()
    analytics = calculate_analytics(records)

    with open(OUTPUT_STATS_PATH, "w", encoding="utf-8") as f:
        json.dump(analytics, f, indent=2, ensure_ascii=False)

    print("=" * 60)
    print("TAIWAN ROBBERY CRIME ANALYSIS (2015 - 2025)")
    print("=" * 60)
    print(f"Baseline (2015):            {analytics['baseline_2015']} cases")
    print(f"Latest (2025):              {analytics['latest_2025']} cases")
    print(f"10-Year Overall Change:     {analytics['net_change_pct']}% ({analytics['net_change_cases']} cases)")
    print(f"Compound Annual Growth:     {analytics['cagr_pct']}% / year")
    print(f"Peak Year:                  {analytics['max_cases']['year']} ({analytics['max_cases']['cases']} cases)")
    print(f"Record Low Year:            {analytics['min_cases']['year']} ({analytics['min_cases']['cases']} cases)")
    print(f"Average Clearance Rate:     {analytics['mean_clearance_rate_pct']}%")
    print(f"Crime Rate per 100k (2025): {analytics['latest_rate_per_100k']} (down from 3.15 in 2015)")
    print("-" * 60)
    print("MACRO STRUCTURAL CRIME SHIFT:")
    print(f"Street Crime (Robbery+Theft): {analytics['macro_shift']['street_crime_change_pct']}%")
    print(f"Digital / Fraud Offenses:     +{analytics['macro_shift']['fraud_crime_change_pct']}%")
    print("=" * 60)
    print(f"Analysis saved to: {OUTPUT_STATS_PATH}")

if __name__ == "__main__":
    main()
