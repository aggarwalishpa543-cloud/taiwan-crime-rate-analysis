/**
 * Taiwan Crime Rate Analytics Dashboard (2015-2025)
 * Official Data: Statista #937687, MOI Taiwan & National Police Agency
 */

const CRIME_DATA = [
  { year: 2015, robbery_cases: 740, yoy_change_pct: null, solved_cases: 712, clearance_rate_pct: 96.2, population: 23492000, rate_per_100k: 3.15, notes: "Baseline year; traditional violent offenses in steady multi-year decline." },
  { year: 2016, robbery_cases: 643, yoy_change_pct: -13.11, solved_cases: 624, clearance_rate_pct: 97.0, population: 23540000, rate_per_100k: 2.73, notes: "Rapid expansion of cloud CCTV and municipal digital video grids." },
  { year: 2017, robbery_cases: 523, yoy_change_pct: -18.66, solved_cases: 512, clearance_rate_pct: 97.9, population: 23571000, rate_per_100k: 2.22, notes: "Motorcycle street snatching drops sharply across all metro areas." },
  { year: 2018, robbery_cases: 399, yoy_change_pct: -23.71, solved_cases: 393, clearance_rate_pct: 98.5, population: 23589000, rate_per_100k: 1.69, notes: "Cases dip below 400 for the first time in recorded modern police records." },
  { year: 2019, robbery_cases: 329, yoy_change_pct: -17.54, solved_cases: 324, clearance_rate_pct: 98.5, population: 23603000, rate_per_100k: 1.39, notes: "Proliferation of mobile wallets (Line Pay, JKO) reduces consumer physical cash." },
  { year: 2020, robbery_cases: 281, yoy_change_pct: -14.59, solved_cases: 279, clearance_rate_pct: 99.3, population: 23561000, rate_per_100k: 1.19, notes: "COVID epidemic onset; pedestrian street footfall drops, clearance reaches 99.3%." },
  { year: 2021, robbery_cases: 267, yoy_change_pct: -4.98, solved_cases: 265, clearance_rate_pct: 99.3, population: 23375000, rate_per_100k: 1.14, notes: "Level 3 pandemic alert in Taiwan; overall crime reaches historical low." },
  { year: 2022, robbery_cases: 233, yoy_change_pct: -12.73, solved_cases: 231, clearance_rate_pct: 99.1, population: 23264000, rate_per_100k: 1.00, notes: "National robbery incidence hits milestone parity of 1 case per 100,000 citizens." },
  { year: 2023, robbery_cases: 209, yoy_change_pct: -10.30, solved_cases: 208, clearance_rate_pct: 99.5, population: 23420000, rate_per_100k: 0.89, notes: "Incidence rate drops sub-1.0 per 100,000; total violent crime nears historic floor." },
  { year: 2024, robbery_cases: 151, yoy_change_pct: -27.75, solved_cases: 150, clearance_rate_pct: 99.3, population: 23405000, rate_per_100k: 0.65, notes: "Historic record low (only 151 cases recorded nationwide in 23.4M population)." },
  { year: 2025, robbery_cases: 248, yoy_change_pct: 64.24, solved_cases: 244, clearance_rate_pct: 98.4, population: 23380000, rate_per_100k: 1.06, notes: "Rebound (+97 cases YoY) following post-pandemic normalization, yet -66.5% vs 2015." }
];

const MACRO_DATA = [
  { year: 2015, total_crime: 297800, violent: 1980, robbery: 740, theft: 64520, fraud: 21172 },
  { year: 2016, total_crime: 294831, violent: 1620, robbery: 643, theft: 58214, fraud: 23175 },
  { year: 2017, total_crime: 293453, violent: 1265, robbery: 523, theft: 51902, fraud: 22689 },
  { year: 2018, total_crime: 284334, violent: 993, robbery: 399, theft: 45780, fraud: 23470 },
  { year: 2019, total_crime: 269219, violent: 832, robbery: 329, theft: 41200, fraud: 23648 },
  { year: 2020, total_crime: 260378, violent: 598, robbery: 281, theft: 36450, fraud: 23054 },
  { year: 2021, total_crime: 243010, violent: 598, robbery: 267, theft: 32800, fraud: 24724 },
  { year: 2022, total_crime: 259657, violent: 498, robbery: 233, theft: 34120, fraud: 29702 },
  { year: 2023, total_crime: 275268, violent: 504, robbery: 209, theft: 33560, fraud: 37984 },
  { year: 2024, total_crime: 286400, violent: 462, robbery: 151, theft: 31800, fraud: 46200 },
  { year: 2025, total_crime: 284900, violent: 535, robbery: 248, theft: 32100, fraud: 48150 }
];

const REGIONAL_SHARES = [
  { region: "New Taipei City (新北市)", robbery_share: 21.4, pop_share: 17.2, color: "#3b82f6" },
  { region: "Taichung City (臺中市)", robbery_share: 18.2, pop_share: 12.1, color: "#06b6d4" },
  { region: "Kaohsiung City (高雄市)", robbery_share: 16.5, pop_share: 11.7, color: "#10b981" },
  { region: "Taipei City (臺北市)", robbery_share: 13.8, pop_share: 10.7, color: "#8b5cf6" },
  { region: "Taoyuan City (桃園市)", robbery_share: 12.1, pop_share: 9.9, color: "#f59e0b" },
  { region: "Tainan City (臺南市)", robbery_share: 8.5, pop_share: 8.0, color: "#ec4899" },
  { region: "Other Counties & Islands", robbery_share: 9.5, pop_share: 30.4, color: "#6b7280" }
];

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderKPICards();
  renderRobberyTrendChart();
  renderClearanceChart();
  renderCrimeShiftChart();
  renderRegionalChart();
  renderTable(CRIME_DATA);
  setupSearchAndExport();
});

// 1. KPI Cards Calculation
function renderKPICards() {
  const latest = CRIME_DATA[CRIME_DATA.length - 1];
  const baseline = CRIME_DATA[0];
  const minCase = CRIME_DATA.reduce((prev, curr) => curr.robbery_cases < prev.robbery_cases ? curr : prev, CRIME_DATA[0]);
  
  const totalClearanceAvg = (CRIME_DATA.reduce((sum, d) => sum + d.clearance_rate_pct, 0) / CRIME_DATA.length).toFixed(1);
  const totalChangePct = (((latest.robbery_cases - baseline.robbery_cases) / baseline.robbery_cases) * 100).toFixed(1);
  
  document.getElementById("kpi-cases").innerText = latest.robbery_cases.toLocaleString();
  document.getElementById("kpi-cases-sub").innerHTML = `<span class="text-positive">-66.5%</span> vs 2015 baseline`;
  
  document.getElementById("kpi-change").innerText = `${totalChangePct}%`;
  document.getElementById("kpi-change-sub").innerText = `CAGR -10.4% / year`;
  
  document.getElementById("kpi-clearance").innerText = `${totalClearanceAvg}%`;
  document.getElementById("kpi-clearance-sub").innerHTML = `Peak: <strong>99.5%</strong> in 2023`;

  document.getElementById("kpi-rate").innerText = `${latest.rate_per_100k}`;
  document.getElementById("kpi-rate-sub").innerText = `Cases per 100,000 citizens`;

  document.getElementById("kpi-record-low").innerText = `${minCase.robbery_cases}`;
  document.getElementById("kpi-record-low-sub").innerText = `Historic floor set in ${minCase.year}`;
}

// 2. Chart 1: Robbery Cases Trend (Bar + Moving Average)
let robberyChart;
function renderRobberyTrendChart() {
  const ctx = document.getElementById("robberyTrendChart").getContext("2d");
  const labels = CRIME_DATA.map(d => d.year);
  const cases = CRIME_DATA.map(d => d.robbery_cases);
  
  // 3-year rolling average
  const rollingAvg = cases.map((val, idx, arr) => {
    if (idx < 2) return null;
    return Math.round((arr[idx] + arr[idx-1] + arr[idx-2]) / 3);
  });

  robberyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "Reported Robbery & Snatch Cases",
          data: cases,
          backgroundColor: cases.map(c => c === 151 ? "rgba(16, 185, 129, 0.75)" : "rgba(59, 130, 246, 0.65)"),
          borderColor: cases.map(c => c === 151 ? "#10b981" : "#3b82f6"),
          borderWidth: 1.5,
          borderRadius: 6,
          barPercentage: 0.65,
          order: 2
        },
        {
          type: "line",
          label: "3-Year Moving Average",
          data: rollingAvg,
          borderColor: "#f59e0b",
          backgroundColor: "transparent",
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: "#f59e0b",
          tension: 0.35,
          borderDash: [5, 4],
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#9ca3af", font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          titleColor: "#ffffff",
          bodyColor: "#d1d5db",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          padding: 10,
          callbacks: {
            afterBody: function(context) {
              const item = CRIME_DATA[context[0].dataIndex];
              const changeStr = item.yoy_change_pct !== null ? `${item.yoy_change_pct > 0 ? '+' : ''}${item.yoy_change_pct}% YoY` : "Baseline";
              return `Rate: ${item.rate_per_100k} per 100k\nChange: ${changeStr}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af" }
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af" },
          title: { display: true, text: "Number of Cases Known to Police", color: "#6b7280" }
        }
      }
    }
  });
}

// 3. Chart 2: Clearance & Solved Rate
function renderClearanceChart() {
  const ctx = document.getElementById("clearanceChart").getContext("2d");
  const labels = CRIME_DATA.map(d => d.year);
  const clearance = CRIME_DATA.map(d => d.clearance_rate_pct);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Robbery Clearance Rate (%)",
          data: clearance,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.12)",
          fill: true,
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#10b981",
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Clearance Rate: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af" }
        },
        y: {
          min: 94,
          max: 100,
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af", callback: (val) => `${val}%` }
        }
      }
    }
  });
}

// 4. Chart 3: Structural Shift (Street vs Fraud)
function renderCrimeShiftChart() {
  const ctx = document.getElementById("crimeShiftChart").getContext("2d");
  const labels = MACRO_DATA.map(d => d.year);
  const streetTheftRobbery = MACRO_DATA.map(d => d.theft + d.robbery);
  const fraudCases = MACRO_DATA.map(d => d.fraud);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Traditional Physical Crime (Theft + Robbery)",
          data: streetTheftRobbery,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2.5,
          tension: 0.3,
          fill: true
        },
        {
          label: "Digital & Telecommunication Fraud (詐欺)",
          data: fraudCases,
          borderColor: "#f43f5e",
          backgroundColor: "rgba(244, 63, 94, 0.1)",
          borderWidth: 2.5,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#9ca3af" }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af" }
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af", callback: (v) => `${v / 1000}k` },
          title: { display: true, text: "Annual Cases", color: "#6b7280" }
        }
      }
    }
  });
}

// 5. Chart 4: Regional Distribution (6 Municipalities)
function renderRegionalChart() {
  const ctx = document.getElementById("regionalChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: REGIONAL_SHARES.map(r => r.region.split(" ")[0]),
      datasets: [
        {
          data: REGIONAL_SHARES.map(r => r.robbery_share),
          backgroundColor: REGIONAL_SHARES.map(r => r.color),
          borderColor: "#111827",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "right",
          labels: { color: "#9ca3af", font: { size: 11 }, boxWidth: 12 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${REGIONAL_SHARES[ctx.dataIndex].region}: ${ctx.parsed}% of cases`
          }
        }
      }
    }
  });
}

// 6. Data Table Render
function renderTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    let changePill = '<span class="pill pill-blue">Baseline</span>';
    if (row.yoy_change_pct !== null) {
      if (row.yoy_change_pct < 0) {
        changePill = `<span class="pill pill-green">${row.yoy_change_pct}%</span>`;
      } else {
        changePill = `<span class="pill pill-red">+${row.yoy_change_pct}%</span>`;
      }
    }

    tr.innerHTML = `
      <td><strong>${row.year}</strong></td>
      <td><span style="font-weight:700; color:#ffffff;">${row.robbery_cases.toLocaleString()}</span></td>
      <td>${changePill}</td>
      <td>${row.solved_cases.toLocaleString()}</td>
      <td><span class="pill pill-green">${row.clearance_rate_pct}%</span></td>
      <td>${(row.population / 1000000).toFixed(2)}M</td>
      <td><strong>${row.rate_per_100k}</strong></td>
      <td style="color:var(--text-muted); font-size:0.8rem; max-width:280px; white-space:normal;">${row.notes}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 7. Search & Export Handling
function setupSearchAndExport() {
  const searchInput = document.getElementById("tableSearch");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = CRIME_DATA.filter(d => 
      d.year.toString().includes(query) || 
      d.notes.toLowerCase().includes(query)
    );
    renderTable(filtered);
  });

  document.getElementById("btnExportCSV").addEventListener("click", exportCSV);
  document.getElementById("btnExportJSON").addEventListener("click", exportJSON);
  document.getElementById("btnPrint").addEventListener("click", () => window.print());
}

function exportCSV() {
  const headers = ["Year", "Robbery_Cases", "YoY_Change_Pct", "Solved_Cases", "Clearance_Rate_Pct", "Population", "Rate_Per_100k", "Notes"];
  const rows = CRIME_DATA.map(d => [
    d.year,
    d.robbery_cases,
    d.yoy_change_pct !== null ? d.yoy_change_pct : "",
    d.solved_cases,
    d.clearance_rate_pct,
    d.population,
    d.rate_per_100k,
    `"${d.notes.replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "taiwan_robbery_crime_2015_2025.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(CRIME_DATA, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "taiwan_robbery_crime_2015_2025.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
