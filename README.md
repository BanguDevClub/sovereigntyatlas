# 🌐 Sovereignty Atlas (2025)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-7.4-BC52EE.svg?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com)
[![Countries](https://img.shields.io/badge/Evaluated%20Nations-195%2F195-emerald.svg)](https://github.com/BanguDevClub/sovereigntyatlas)
[![Themes](https://img.shields.io/badge/Themes-6%20Presets-purple.svg)](#-6-themes-system)

> **Sovereignty Atlas** is an open-source MIT geopolitical intelligence metric, dashboard, ranking, and comparison tool created by **[BanguDevClub](https://github.com/BanguDevClub)**. It evaluates the structural autonomy and national independence of all 195 universally recognized sovereign states (193 UN Member States + Holy See + State of Palestine) for the year 2025.

🔗 **GitHub Repository:** [https://github.com/BanguDevClub/sovereigntyatlas](https://github.com/BanguDevClub/sovereigntyatlas)  
🌐 **Base URL:** `/sovereigntyatlas`

---

## 🏛️ The 5 Methodology Pillars

The Sovereignty Atlas methodology establishes a rigorous hierarchical priority. Physical survival and economic retention strictly precede technological scale and military power:

|  Rank  | Pillar                        | Weight  | Focus & Sub-Indicators                                                                                                                                                                                                                                                                  |
| :----: | :---------------------------- | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#1** | **Consumption Sovereignty**   | **28%** | **Basic sustenance & physical survival:** Caloric staple food self-sufficiency, electrical energy independence, domestic crude & biofuel refining capacity, building materials (cement/steel/timber), and potable freshwater aquifer security.                                          |
| **#2** | **Employment Sovereignty**    | **25%** | **Domestic value retention & labor autonomy:** Formal protected contracts, domestic employer ownership (non-offshore dependency), high-skilled talent & brain drain retention, domestic labor standard enforcement, and unemployment resilience under trade shocks.                     |
| **#3** | **Technological Sovereignty** | **20%** | **Frontier digital & physical production:** Commercial microchip wafer fabrication (CPU/GPU/transistors), sovereign AI foundation models & compute clusters, triadic patents, telecom sovereignty (5G/6G & undersea cables), and industrial robotics density.                           |
| **#4** | **Scientific Sovereignty**    | **15%** | **Fundamental research & academic autonomy:** High-impact journal citations (Nature Index), domestic PhD training depth without foreign universities, R&D expenditure as % of GDP, scientific mega-infrastructure (superlabs/synchrotrons), and STEM graduate pipeline.                 |
| **#5** | **Military Sovereignty**      | **12%** | **Self-defense & deterrence capability:** Active & reserve combat forces relative to borders, indigenous defense manufacturing (tanks, ships, fighter aircraft), integrated air/missile defense umbrellas, strategic nuclear/hypersonic deterrence, and wartime ammunition sustainment. |

---

## 📐 Mathematical Formulation

The national sovereignty index $\mathcal{S}_i \in [0, 100]$ for country $i$ is calculated as:

$$\mathcal{S}_i = \sum_{p \in \mathcal{P}} w_p \cdot S_{i,p}$$

$$\mathcal{S}_i = 0.28 \, S_{\text{consumption}} + 0.25 \, S_{\text{employment}} + 0.20 \, S_{\text{technology}} + 0.15 \, S_{\text{science}} + 0.12 \, S_{\text{military}}$$

Subject to the normalization unity constraint:

$$\sum_{p \in \mathcal{P}} w_p = 0.28 + 0.25 + 0.20 + 0.15 + 0.12 = 1.00$$

Each individual pillar score $S_{i,p}$ is the arithmetic mean of its five calibrated sub-indicators $k \in K_p$:

$$S_{i,p} = \frac{1}{|K_p|} \sum_{k \in K_p} \phi_k(x_{i,k})$$

where $\phi_k(x)$ is the min-max standardizer mapping indicators to a uniform $[0, 100]$ interval:

$$\phi_k(x) = \min\left(100, \max\left(0, \frac{x - x_{\min, k}}{x_{\max, k} - x_{\min, k}} \times 100\right)\right)$$

- **A score of 100** represents a hypothetical nation with total resource autarky, complete formal employment, indigenous sub-nanometer foundries, frontier superlabs, and unbreachable sovereign self-defense.
- **A score of 0** represents a completely dependent, unarmed nation relying entirely on foreign food, fuel, employers, technology, and security guarantees.

---

## 🧭 Pages & Capabilities

1. **Overview (`/sovereigntyatlas/`)**: Global hero highlights, top 5 sovereign powers, pillar champions, interactive multi-pillar radar preview, and core KPI counters.
2. **Dashboard (`/sovereigntyatlas/dashboard`)**: Country deep-dive explorer with instant autocomplete, 5-pillar radar charts, detailed horizontal bar charts for all 25 submetrics, strategic strengths vs vulnerabilities, and proxy estimative alerts.
3. **Continents (`/sovereigntyatlas/continents`)**: Regional aggregation across Africa (54 nations), Asia (48), Europe (44), North America (23), South America (12), and Oceania (14) with regional rankings and comparative benchmarks.
4. **Ranking (`/sovereigntyatlas/ranking`)**: Complete 1 to 195 leaderboard table with multi-column sorting (Rank, Overall, Consumption, Employment, Tech, Science, Military, Population, GDP), filters by continent, tier, data quality, and instant CSV export.
5. **Compare (`/sovereigntyatlas/compare`)**: Side-by-side head-to-head benchmarking for 2 to 4 countries simultaneously with overlapping radar polygons, category winner badges, and direct delta matrices.
6. **Sandbox (`/sovereigntyatlas/sandbox`)**: Interactive weights laboratory with real-time sliders (auto-normalizing to 100%), live re-ranking of all 195 nations, and pre-configured stress scenarios (_Global Energy Shock_, _Chip Embargo_, _Kinetic War_, _Labor Flight_).
7. **Methodology (`/sovereigntyatlas/methodology`)**: Transparent documentation of formulas, sub-indicators, data sources (IMF, World Bank, FAO, SIPRI, WIPO), and proxy estimation frameworks.

---

## 🎨 6 Themes System

Sovereignty Atlas includes six themes with zero-flash restoration from `localStorage`:

1. **Dark Modern** (Default high-contrast cybersecurity palette)
2. **Light Clean** (Minimal daylight readability)
3. **Catppuccin Latte** (Warm, soothing light theme)
4. **Catppuccin Frappé** (Muted low-contrast dark theme)
5. **Catppuccin Macchiato** (Medium-tone dark theme)
6. **Catppuccin Mocha** (Deep darkest night theme)

Switch themes seamlessly from the palette selector in the navigation header.

---

## 🔍 Data Quality & Proxy Estimation Notice

For jurisdictions where primary national statistics are restricted, censored, or unavailable (e.g. North Korea, Syria, Somalia, Yemen, South Sudan, Cuba, Vatican City), Sovereignty Atlas uses a calibrated third-party estimation model:

- **Mirror Trade Data:** UN Comtrade and IMF Direction of Trade declarations from verified trade partners.
- **Remote Sensing:** Satellite nighttime luminosity, crop vegetative health (NDVI), and marine oil tanker tracking.
- **Security Baselines:** SIPRI Military Expenditure Database and IISS The Military Balance.

Any country relying on secondary modeled estimates prominently displays the **Statistical Estimative Notice** banner on its dashboard.

All data is structured in a single unique JSON file:
[`src/data/sovereignty_atlas_2025.json`](file:///home/cassio/Documents/Code/Orgs/BanguDevClub/sovereigntyatlas/src/data/sovereignty_atlas_2025.json).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Astro 7](https://astro.build/) (Static Site Generation)
- **UI Engine:** [React 19](https://react.dev/) + [shadcn UI design system](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Formulas:** [KaTeX](https://katex.org/) (Fast LaTeX rendering)
- **Visualizations:** [Recharts](https://recharts.org/) (Interactive Radars and Horizontal Bar Charts)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** `npm`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BanguDevClub/sovereigntyatlas.git
cd sovereigntyatlas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:4321/sovereigntyatlas/](http://localhost:4321/sovereigntyatlas/) in your browser.

### 4. Build for production

```bash
npm run build
```

The static build will be generated in `./dist/`.

### 5. Preview production build

```bash
npm run preview
```

---

## 🧰 Developer QoL Commands

| Command                 | Purpose                                                                                            |
| :---------------------- | :------------------------------------------------------------------------------------------------- |
| `npm run help`          | Interactive CLI guide of all developer scripts with descriptions                                   |
| `npm run validate`      | **Full CI pipeline:** runs dataset validation + typecheck + lint + format check + production build |
| `npm run typecheck`     | Strict dual type check combining `astro check` and `tsc --noEmit`                                  |
| `npm run lint`          | ESLint static analysis on all Astro, TypeScript, and React code                                    |
| `npm run lint:fix`      | Automatically fixes ESLint formatting and rule warnings                                            |
| `npm run format`        | Auto-formats all source code and documentation using Prettier                                      |
| `npm run format:check`  | Verifies whether all files conform to Prettier guidelines                                          |
| `npm run fix`           | One-command DX fix: executes `npm run format` + `npm run lint:fix`                                 |
| `npm run data:validate` | Validates dataset integrity (195 nations, sequential ranks, 5 pillars, formula math)               |
| `npm run data:generate` | Recalculates and regenerates `src/data/sovereignty_atlas_2025.json`                                |
| `npm run clean`         | Removes `./dist` and `./.astro` build caches                                                       |
| `npm run clean:all`     | Deep clean: removes `./dist`, `./.astro`, and `node_modules/`                                      |
| `npm run reinstall`     | Nuclear reset: cleans all artifacts and runs a fresh `npm install`                                 |

---

## 🧰 Developer QoL Commands

| Command                 | Purpose                                                                                            |
| :---------------------- | :------------------------------------------------------------------------------------------------- |
| `npm run help`          | Interactive CLI guide of all developer scripts with descriptions                                   |
| `npm run validate`      | **Full CI pipeline:** runs dataset validation + typecheck + lint + format check + production build |
| `npm run typecheck`     | Strict dual type check combining `astro check` and `tsc --noEmit`                                  |
| `npm run lint`          | ESLint static analysis on all Astro, TypeScript, and React code                                    |
| `npm run lint:fix`      | Automatically fixes ESLint formatting and rule warnings                                            |
| `npm run format`        | Auto-formats all source code and documentation using Prettier                                      |
| `npm run format:check`  | Verifies whether all files conform to Prettier guidelines                                          |
| `npm run fix`           | One-command DX fix: executes `npm run format` + `npm run lint:fix`                                 |
| `npm run data:validate` | Validates dataset integrity (195 nations, sequential ranks, 5 pillars, formula math)               |
| `npm run data:generate` | Recalculates and regenerates `src/data/sovereignty_atlas_2025.json`                                |
| `npm run clean`         | Removes `./dist` and `./.astro` build caches                                                       |
| `npm run clean:all`     | Deep clean: removes `./dist`, `./.astro`, and `node_modules/`                                      |
| `npm run reinstall`     | Nuclear reset: cleans all artifacts and runs a fresh `npm install`                                 |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Developed with 🌐 by **[BanguDevClub](https://github.com/BanguDevClub)**.
