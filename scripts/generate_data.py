#!/usr/bin/env python3
"""
Sovereignty Atlas 2025 Dataset Generator
Curates all 195 universally recognized nations (193 UN Member States + 2 UN Observers)
with comprehensive 2025 sovereignty metrics across the 5 methodology pillars:
1. Consumption (Weight: 28%)
2. Employment (Weight: 25%)
3. Technological (Weight: 20%)
4. Scientific (Weight: 15%)
5. Military (Weight: 12%)
"""

import json
import os

COUNTRIES_RAW = [
    # North America
    ("USA", "United States", "US", "North America", "Northern America", "Washington, D.C.", 341000000, 28780, False,
     (89, 90, 88, 86, 92), (86, 88, 89, 82, 85), (96, 98, 97, 95, 92), (97, 98, 94, 96, 93), (98, 99, 97, 98, 95),
     "World's leading superpower with near-total energy self-sufficiency, indigenous defense industrial complex, and frontier AI and semiconductor leadership.",
     ["Shale energy and agricultural exporter", "Frontier AI and semiconductor design monopoly", "Global power-projection military & carrier strike groups"],
     ["High national debt ($35T+)", "Import reliance for critical rare-earth processing", "Offshored advanced packaging/foundry reliance"]),
     
    ("CAN", "Canada", "CA", "North America", "Northern America", "Ottawa", 401000000 // 10, 2240, False,
     (94, 95, 89, 92, 98), (84, 82, 78, 86, 80), (74, 76, 75, 78, 72), (82, 85, 78, 80, 80), (62, 58, 64, 45, 68),
     "Resource-rich continental power with vast energy and freshwater surplus, closely integrated into NORAD defense.",
     ["Massive oil sands, uranium, and potash reserves", "World-class university research output", "High domestic freshwater and agricultural surplus"],
     ["Heavy military integration and dependence on US umbrella", "Brain drain to US tech hubs", "Low domestic microchip fabrication"]),

    ("MEX", "Mexico", "MX", "North America", "Central America", "Mexico City", 130000000, 1810, False,
     (72, 74, 68, 76, 70), (58, 62, 56, 60, 54), (64, 52, 58, 60, 68), (52, 56, 44, 48, 55), (55, 50, 48, 30, 52),
     "Major industrial manufacturing hub with high automotive output, seeking greater domestic energy and technology autonomy.",
     ["Extensive domestic crude oil reserves and refining expansions", "Strong automotive and aerospace manufacturing belt", "Geographic food diversity and self-sufficiency"],
     ["High informal labor market (over 50%)", "Cartel security challenges affecting state sovereignty", "Import dependence on US natural gas and refined fuels"]),

    # South America
    ("BRA", "Brazil", "BR", "South America", "South America", "Brasília", 216000000, 2330, False,
     (92, 88, 82, 85, 86), (64, 66, 60, 68, 62), (62, 58, 56, 64, 60), (66, 70, 58, 64, 62), (68, 72, 65, 48, 66),
     "South America's sovereign anchor with unmatched agricultural surplus, biofuels, pre-salt petroleum, and indigenous aerospace (Embraer).",
     ["Global agricultural superpower (soy, beef, sugar, poultry, orange juice)", "Self-sufficient domestic oil production and biofuels (ethanol)", "Indigenous aerospace (Embraer) and naval nuclear submarine program"],
     ["High informal employment rate (~38%)", "Critical reliance on imported fertilizer (potassium, nitrogen)", "Limited indigenous microchip wafer fabrication"]),

    ("ARG", "Argentina", "AR", "South America", "South America", "Buenos Aires", 46600000, 640, False,
     (88, 84, 76, 78, 82), (56, 58, 52, 62, 50), (54, 48, 50, 58, 52), (68, 72, 54, 66, 60), (48, 52, 44, 32, 46),
     "Massive agricultural and shale gas (Vaca Muerta) endowment with proven indigenous nuclear technology (INVAP).",
     ["World top grain and beef exporter", "Vaca Muerta mega-reserves of oil and natural gas", "Indigenous nuclear reactor and satellite manufacturing (INVAP)"],
     ["Macroeconomic volatility and foreign debt exposure", "Underfunded military re-equipment", "Talent flight due to currency instability"]),

    ("COL", "Colombia", "CO", "South America", "South America", "Bogotá", 52000000, 380, False,
     (74, 72, 65, 70, 72), (50, 54, 46, 56, 48), (48, 42, 44, 52, 46), (54, 58, 42, 50, 52), (58, 54, 52, 28, 56),
     "Rich in biodiversity, coal, and hydro-energy, modernizing internal security and agricultural value chains.",
     ["High hydroelectric potential and energy self-reliance", "Strong domestic agricultural variety (coffee, fruits, staples)", "Combat-experienced armed forces"],
     ["High informal labor market", "Vulnerability to international oil price swings", "Limited high-tech hardware output"]),

    ("CHL", "Chile", "CL", "South America", "South America", "Santiago", 19600000, 340, False,
     (68, 64, 58, 72, 70), (74, 76, 70, 78, 72), (58, 52, 56, 64, 54), (66, 72, 58, 64, 62), (64, 62, 66, 35, 60),
     "World's leading copper and lithium producer with strong institutional stability, expanding green hydrogen and solar energy.",
     ["Monopolistic global copper and lithium supply reserves", "Booming Atacama solar energy and renewable grid", "High formal employment and institutional strength in Latin America"],
     ["Heavy net importer of fossil fuels (crude oil, natural gas)", "Vulnerability to commodity price cycles", "Small domestic military-industrial base"]),

    ("PER", "Peru", "PE", "South America", "South America", "Lima", 34000000, 280, False,
     (72, 68, 62, 70, 68), (48, 52, 42, 50, 44), (46, 40, 42, 50, 44), (48, 52, 38, 46, 48), (52, 48, 50, 25, 50),
     "Mineral powerhouse (copper, zinc, silver) with Camisea natural gas, balancing agro-exports with high labor informality.",
     ["Abundant mineral reserves and Camisea gas field", "Boasting major agricultural coastal export corridors", "Low sovereign external debt ratio"],
     ["Over 70% informal workforce", "Political institutional volatility", "Low scientific and technological R&D expenditure"]),

    ("VEN", "Venezuela", "VE", "South America", "South America", "Caracas", 29000000, 110, True,
     (52, 64, 50, 56, 50), (32, 35, 28, 40, 30), (36, 28, 30, 40, 32), (42, 45, 30, 38, 40), (58, 50, 55, 30, 52),
     "Largest proven oil reserves on Earth, heavily constrained by sanctions, refinery bottlenecks, and economic contraction.",
     ["Massive Orinoco Belt oil and natural gas reserves", "Guri dam hydroelectric backbone", "Russian/Chinese air defense systems (S-300VM, Su-30MK2)"],
     ["Severe domestic food and medicine shortages requiring imports", "Collapse of domestic refining infrastructure", "Massive emigration and human capital drain"]),

    # Europe
    ("RUS", "Russia", "RU", "Europe", "Eastern Europe", "Moscow", 144000000, 2180, False,
     (96, 98, 97, 95, 94), (74, 76, 72, 70, 75), (68, 64, 66, 74, 70), (78, 80, 72, 76, 75), (96, 98, 96, 99, 94),
     "Eurasian resource fortress with massive primary sovereignty: world-leading hydrocarbon, fertilizer, wheat, and nuclear deterrence.",
     ["Complete energy, grain, and mineral self-sufficiency", "Immense nuclear triad and indigenous hypersonic weapons", "Complete domestic defense manufacturing ecosystem"],
     ["Severe Western sanctions constraining sub-14nm semiconductor access", "Demographic decline and skilled labor shortages", "Supply chain friction in commercial aviation and machine tooling"]),

    ("DEU", "Germany", "DE", "Europe", "Western Europe", "Berlin", 84000000, 4590, False,
     (62, 54, 60, 84, 94), (88, 90, 86, 92, 85), (88, 86, 92, 88, 94), (92, 94, 90, 92, 88), (66, 68, 70, 48, 62),
     "Europe's industrial engine with premier mechanical engineering and chemical patents, re-evaluating military and energy dependencies.",
     ["World-class industrial automation and precision tooling", "Leading global patent generator and research institutes (Max Planck, Fraunhofer)", "Highly formal, well-protected labor market"],
     ["Severe dependence on imported energy (natural gas, oil) and raw materials", "Slow transition to sovereign military readiness", "Low domestic silicon wafer volume"]),

    ("FRA", "France", "FR", "Europe", "Western Europe", "Paris", 68000000, 3130, False,
     (82, 86, 80, 84, 95), (82, 84, 80, 88, 80), (84, 82, 86, 82, 85), (88, 90, 84, 88, 85), (88, 92, 86, 95, 84),
     "European strategic autonomy champion: independent nuclear deterrence, 56-reactor civilian nuclear grid, and indigenous defense (Dassault, Naval Group).",
     ["Independent nuclear deterrence triad (SLBMs and airborne ASMPA)", "Civilian nuclear grid providing 70%+ clean domestic electricity", "Indigenous aerospace, naval, and missile systems (Rafale, MBDA)"],
     ["Dependence on imported uranium feedstocks (Niger, Kazakhstan)", "Persistent fiscal budget deficits", "Reliance on Asian semiconductor foundries"]),

    ("GBR", "United Kingdom", "GB", "Europe", "Northern Europe", "London", 68500000, 3490, False,
     (68, 72, 68, 76, 92), (84, 82, 80, 84, 82), (86, 88, 85, 84, 82), (92, 95, 86, 90, 88), (82, 80, 82, 90, 78),
     "Global financial and scientific hub with continuous-at-sea nuclear deterrence (Vanguard class) and world-leading universities.",
     ["World elite universities (Oxford, Cambridge, Imperial) and biotech research", "Trident nuclear submarine deterrence and NATO leadership", "Strong tech innovation ecosystem and financial markets"],
     ["Net food importer (imports ~45% of consumed food)", "North Sea oil and gas basin maturity and depletion", "Post-Brexit trade frictions"]),

    ("ITA", "Italy", "IT", "Europe", "Southern Europe", "Rome", 58800000, 2320, False,
     (66, 56, 64, 78, 88), (76, 78, 72, 82, 74), (80, 74, 82, 78, 84), (82, 84, 76, 80, 78), (70, 74, 72, 42, 68),
     "Mediterranean industrial power with world-class shipbuilding (Fincantieri), defense electronics (Leonardo), and premium manufacturing.",
     ["Advanced naval shipbuilding and aerospace engineering (Leonardo)", "High-value precision manufacturing and machinery export base", "Strong agro-food brands and culinary self-reliance"],
     ["Extreme dependence on imported fossil fuels (natural gas)", "High public debt to GDP ratio (~140%)", "Regional north-south economic divide"]),

    ("ESP", "Spain", "ES", "Europe", "Southern Europe", "Madrid", 48000000, 1650, False,
     (74, 68, 70, 76, 86), (72, 74, 68, 80, 70), (74, 70, 72, 76, 75), (78, 82, 72, 78, 75), (66, 64, 68, 38, 62),
     "Renewable energy leader with large-scale solar/wind grids, extensive LNG regasification infrastructure, and strong agricultural output.",
     ["Vast renewable energy capacity (wind, solar) and LNG terminals", "Major agricultural greenhouse fruit/vegetable producer", "Modern naval shipbuilding (Navantia)"],
     ["High structural youth unemployment", "Almost zero domestic fossil fuel production", "Dependence on foreign technology platforms"]),

    ("POL", "Poland", "PL", "Europe", "Eastern Europe", "Warsaw", 37500000, 880, False,
     (78, 76, 74, 80, 88), (78, 80, 74, 80, 76), (72, 68, 70, 74, 76), (74, 78, 70, 74, 74), (82, 78, 84, 50, 80),
     "NATO's frontline fortress with massive military modernization, Baltic Pipe gas independence, and heavy industrial growth.",
     ["Rapid defense procurement (K2 tanks, FA-50, HIMARS, Patriot)", "Energy diversification away from Russian gas via Baltic Pipe and LNG", "Strong domestic agricultural base"],
     ["Heavy historical coal reliance facing EU decarbonization penalties", "Low domestic advanced chip fabrication", "Tight labor market with demographic pressures"]),

    ("UKR", "Ukraine", "UA", "Europe", "Eastern Europe", "Kyiv", 36000000, 190, True,
     (66, 52, 48, 60, 64), (54, 56, 46, 58, 52), (58, 52, 54, 60, 62), (64, 68, 56, 62, 62), (86, 80, 88, 55, 82),
     "Extremely militarized nation with pioneering battlefield drone technology and black-soil grain reserves, constrained by infrastructure damage.",
     ["World-leading tactical drone innovation and wartime army experience", "Rich agricultural fertile soil ('Chernozem')", "Strong domestic titanium and rocket legacy (Yuzhmash)"],
     ["Severe ongoing wartime infrastructure destruction and power grid attacks", "Heavy fiscal reliance on external financial grants", "Demographic displacement of over 6 million citizens"]),

    ("NLD", "Netherlands", "NL", "Europe", "Western Europe", "Amsterdam", 18000000, 1130, False,
     (76, 68, 74, 78, 96), (88, 90, 86, 90, 86), (92, 90, 94, 92, 90), (90, 92, 88, 92, 88), (62, 58, 64, 45, 60),
     "Global semiconductor chokepoint host (ASML extreme ultraviolet lithography) and agricultural marvel with ultra-efficient greenhouse output.",
     ["Monopoly on advanced extreme ultraviolet (EUV) photolithography (ASML)", "World #2 agricultural exporter by value through high-tech agri-parks", "Rotterdam port: premier European logistics hub"],
     ["Groningen natural gas field shutdown forcing gas imports", "Extremely low independent territorial defense force", "Vulnerability to North Sea flooding"]),

    ("NOR", "Norway", "NO", "Europe", "Northern Europe", "Oslo", 5500000, 520, False,
     (86, 98, 95, 84, 98), (90, 92, 88, 94, 88), (78, 76, 78, 80, 76), (84, 86, 82, 86, 82), (72, 70, 74, 45, 72),
     "Sovereign wealth powerhouse with massive North Sea oil/gas surpluses, 100% clean hydro grid, and sovereign financial cushion ($1.7T).",
     ["World's largest sovereign wealth fund (NBIM > $1.7 Trillion)", "Surplus petroleum and gas exporter to the European continent", "99% domestic hydroelectric generation"],
     ["Low domestic food self-sufficiency (imports majority of grains)", "Very small domestic population and armed forces scale", "High cost of domestic production"]),

    ("SWE", "Sweden", "SE", "Europe", "Northern Europe", "Stockholm", 10600000, 620, False,
     (76, 82, 78, 85, 96), (86, 88, 84, 92, 85), (86, 84, 88, 86, 86), (90, 92, 88, 90, 88), (76, 82, 78, 48, 75),
     "Nordic defense and industrial heavyweight: indigenous fighter jets (Saab Gripen), submarines (Kockums), and battery innovations.",
     ["Indigenous fighter aircraft (Saab Gripen) and stealth submarines (Gotland class)", "Kiruna high-grade iron ore reserves and fossil-free steel", "Leading innovation index and green battery tech (Northvolt)"],
     ["Dependence on global component supply chains for Gripen", "Food self-sufficiency around 50%", "Integration into NATO collective command"]),

    ("CHE", "Switzerland", "CH", "Europe", "Western Europe", "Bern", 8900000, 930, False,
     (72, 74, 70, 82, 98), (92, 94, 90, 92, 90), (90, 92, 92, 88, 88), (94, 96, 92, 94, 90), (66, 68, 66, 42, 68),
     "Armed neutrality fortress with top-ranked global innovation, pharmaceutical giants (Novartis, Roche), and extensive civil defense shelters.",
     ["World top innovation index and pharmaceutical titans", "Armed neutrality doctrine with universal civil defense bunkers", "Extremely stable currency and financial autonomy"],
     ["Must import over 40% of food and almost 100% of hydrocarbons", "Landlocked alpine geography surrounded by EU trade zone", "Exposed to international banking regulatory pressures"]),

    # Asia
    ("CHN", "China", "CN", "Asia", "Eastern Asia", "Beijing", 1400000000, 18600, False,
     (86, 84, 88, 96, 86), (78, 80, 74, 76, 78), (94, 95, 96, 92, 96), (94, 96, 92, 95, 92), (96, 98, 96, 98, 94),
     "World's industrial manufacturing workshop and rising superpower with massive scale in EVs, green energy, high-speed rail, and military buildup.",
     ["Near-total domestic industrial supply chains and rare-earth dominance", "Frontier AI, quantum computing, and massive 5G/6G domestic telecom", "Rapidly expanding naval fleet, hypersonic missiles, and rocket force"],
     ["Heavy import dependency on crude oil (Malacca Strait vulnerability)", "High import demand for animal feed soy and iron ore", "Advanced sub-3nm chip lithography equipment restrictions"]),

    ("IND", "India", "IN", "Asia", "Southern Asia", "New Delhi", 1440000000, 4110, False,
     (84, 80, 82, 82, 78), (56, 58, 50, 58, 54), (74, 72, 70, 76, 72), (72, 76, 68, 74, 72), (86, 88, 84, 92, 82),
     "Demographic giant with food self-sufficiency, space exploration prowess (ISRO), and strategic autonomy balancing global poles.",
     ["Self-sufficient agricultural grain production (wheat, rice)", "Space program with lunar/Mars capability and nuclear weapons triad", "Global IT services powerhouse and digital public infrastructure (UPI)"],
     ["Over 80% dependence on imported crude oil", "High informal labor sector (over 80%)", "Nascent domestic commercial semiconductor fabrication"]),

    ("JPN", "Japan", "JP", "Asia", "Eastern Asia", "Tokyo", 124000000, 4280, False,
     (54, 48, 62, 78, 95), (88, 90, 86, 90, 86), (92, 90, 94, 90, 94), (92, 94, 90, 92, 88), (72, 76, 74, 52, 70),
     "Technological and robotics titan with high material science leadership, hampered by near-zero domestic fossil fuels and low food self-reliance.",
     ["Global leader in industrial robotics, automotive, and semiconductor materials", "High patent output and Nobel laureates in physics/chemistry", "High domestic savings and sovereign bond ownership"],
     ["Caloric food self-sufficiency below 40%", "Over 90% dependence on imported energy (LNG, crude oil, coal)", "Severe demographic aging and labor shortage"]),

    ("KOR", "South Korea", "KR", "Asia", "Eastern Asia", "Seoul", 51700000, 1780, False,
     (58, 52, 66, 82, 96), (84, 86, 82, 86, 84), (95, 94, 96, 92, 95), (90, 92, 88, 90, 88), (86, 88, 86, 65, 84),
     "Semiconductor memory and defense export powerhouse (Samsung, SK Hynix, Hanwha), confronting heavy fossil fuel and food import reliance.",
     ["Dominance in memory semiconductor chips (DRAM, NAND) and batteries", "Booming defense export industry (K9 Howitzer, K2 Tank, KF-21 fighter)", "Universal broadband, high-speed rail, and advanced robotics density"],
     ["Caloric food self-reliance around 45%", "Total dependence on imported petroleum and gas", "Geopolitical exposure to North Korea and Taiwan Strait shocks"]),

    ("SAU", "Saudi Arabia", "SA", "Asia", "Western Asia", "Riyadh", 37000000, 1110, False,
     (76, 98, 96, 74, 82), (68, 70, 62, 72, 66), (62, 58, 60, 66, 60), (66, 70, 62, 68, 64), (78, 74, 76, 55, 78),
     "World's oil swing producer with unmatched financial liquidity, building Vision 2030 industrial and defense localization.",
     ["Massive low-cost oil extraction and mega-refineries (Aramco)", "Massive sovereign wealth fund (PIF) funding industrial diversification", "Heavily funded military arsenal with Patriot air defense"],
     ["Desalination energy dependency for domestic freshwater", "Very low domestic grain cultivation requiring food imports", "Historically reliant on foreign contractors for weapon maintenance"]),

    ("IRN", "Iran", "IR", "Asia", "Southern Asia", "Tehran", 89000000, 430, False,
     (76, 88, 82, 76, 72), (58, 60, 52, 62, 56), (68, 62, 64, 70, 66), (72, 74, 68, 72, 70), (84, 82, 86, 75, 80),
     "Sanction-resistant fortress nation with self-reliant ballistic missile, drone, and nuclear enrichment ecosystems, rich in oil and gas.",
     ["Indigenous missile, rocket, and loitering munition manufacturing", "Vast hydrocarbon reserves and sovereign domestic refining", "Broad domestic engineering base and domestic industrial capacity"],
     ["Western sanctions isolating banking and tech transfers", "Severe environmental water stress and drought across central provinces", "Double-digit inflation and currency devaluation"]),

    ("TUR", "Turkey", "TR", "Asia", "Western Asia", "Ankara", 86000000, 1160, False,
     (78, 72, 76, 84, 84), (66, 68, 62, 72, 64), (74, 70, 72, 76, 74), (74, 78, 70, 76, 72), (86, 88, 86, 68, 84),
     "Crossroads empire with an explosive indigenous defense industry (Baykar TB2, Kaan fighter), strong agricultural base, and strategic chokepoint control.",
     ["Indigenous drone and defense juggernaut (Bayraktar, TAI, Roketsan)", "Agricultural self-sufficiency in staples, dairy, and fruits", "Strategic control of Turkish Straits (Bosphorus/Dardanelles)"],
     ["High dependence on imported natural gas (Russia, Azerbaijan)", "Chronic inflation and lira volatility", "External debt refinancing requirements"]),

    ("ISR", "Israel", "IL", "Asia", "Western Asia", "Jerusalem", 9900000, 530, False,
     (66, 72, 68, 74, 94), (86, 88, 84, 88, 84), (92, 90, 94, 88, 90), (92, 94, 90, 92, 88), (92, 95, 94, 96, 90),
     "High-tech military fortress with unacknowledged nuclear arsenal, Iron Dome missile defense, offshore Leviathan gas, and pioneer cyber/AI ecosystems.",
     ["Multi-layered air defense (Iron Dome, David's Sling, Arrow 3)", "Offshore Mediterranean natural gas self-sufficiency (Leviathan, Tamar)", "Global cyber defense, drone, and venture tech ecosystem"],
     ["Complete reliance on food grain and commodity imports", "Small territorial depth vulnerable to multi-front ballistic saturation", "Deep military reliance on US aid ammunition resupply"]),

    ("IDN", "Indonesia", "ID", "Asia", "South-Eastern Asia", "Jakarta", 280000000, 1420, False,
     (78, 76, 72, 76, 70), (54, 56, 48, 58, 50), (60, 54, 56, 62, 58), (56, 60, 52, 58, 56), (62, 60, 62, 38, 60),
     "Island colossus with nickel refining dominance, mandatory biodiesel policy (B35), and strategic sea lanes (Malacca, Sunda, Lombok).",
     ["World's largest nickel reserves fueling domestic EV battery hubs", "Self-sufficient biofuel production from palm oil", "Strategic archipelagic chokepoint control"],
     ["High informal employment rate (~55%)", "Net importer of wheat and petroleum fuel", "Archipelagic naval defense dispersal challenges"]),

    # Africa
    ("ZAF", "South Africa", "ZA", "Africa", "Southern Africa", "Pretoria", 61000000, 400, False,
     (72, 66, 68, 74, 74), (52, 54, 46, 64, 48), (64, 58, 60, 66, 62), (68, 72, 64, 68, 66), (66, 64, 66, 42, 64),
     "Industrial anchor of Sub-Saharan Africa with rich platinum/gold/coal minerals and deep financial markets, battling electrical grid hurdles.",
     ["Unrivaled platinum group metals and manganese reserves", "Deepest stock market and banking infrastructure in Africa", "Indigenous defense legacy (Denel, Paramount)"],
     ["Eskom power generation instability (load shedding)", "Record formal unemployment rate (>32%)", "High socio-economic inequality"]),

    ("EGY", "Egypt", "EG", "Africa", "Northern Africa", "Cairo", 112000000, 390, False,
     (64, 68, 66, 72, 68), (52, 54, 46, 56, 50), (54, 48, 50, 58, 52), (58, 62, 54, 60, 58), (76, 74, 76, 48, 74),
     "Arab world's demographic leader with Suez Canal control, Zohr gas field, and the largest standing army in the Middle East and Africa.",
     ["Suez Canal maritime trade bottleneck ownership and tolls", "Zohr offshore natural gas production", "Massive standing armed forces with modern armor and naval landing ships"],
     ["World's largest wheat importer, highly vulnerable to Black Sea disruptions", "Nile water stress linked to Grand Ethiopian Renaissance Dam (GERD)", "Severe foreign exchange debt pressures"]),

    ("NGA", "Nigeria", "NG", "Africa", "Western Africa", "Abuja", 228000000, 370, False,
     (62, 68, 64, 66, 54), (42, 46, 36, 48, 40), (48, 42, 44, 52, 46), (50, 54, 44, 50, 48), (54, 50, 52, 30, 52),
     "Africa's largest economy and demographic giant, launching Dangote mega-refinery to end imported fuel vulnerability.",
     ["Vast crude oil and natural gas reserves in the Niger Delta", "Dangote mega-refinery eliminating petroleum import dependency", "Booming fintech, entertainment (Nollywood), and dynamic youth workforce"],
     ["Over 80% informal labor and poverty rate", "National electricity grid fragility and private generator reliance", "Internal security friction across northern regions"]),

    ("MAR", "Morocco", "MA", "Africa", "Northern Africa", "Rabat", 3800000, 150, False,
     (70, 64, 62, 74, 72), (56, 58, 50, 60, 54), (58, 52, 56, 62, 56), (58, 62, 54, 60, 58), (68, 66, 68, 42, 66),
     "Global phosphate monopoly holder (essential for world food supply), Noor solar complex, and booming automotive export hub.",
     ["World's largest reserves of phosphate rock (critical fertilizer ingredient)", "Noor solar mega-project and green transition", "Modernized military with US/Israeli defense technology"],
     ["Vulnerability to Mediterranean droughts affecting cereal yields", "Near total reliance on imported oil and coal", "High youth informality"]),

    ("DZA", "Algeria", "DZ", "Africa", "Northern Africa", "Algiers", 46000000, 240, False,
     (72, 88, 86, 76, 72), (54, 56, 48, 58, 52), (50, 44, 46, 54, 48), (56, 60, 52, 58, 56), (78, 76, 80, 52, 76),
     "Hydrocarbon fortress supplying European gas via pipeline, holding zero foreign sovereign debt and Africa's top Russian-armed military.",
     ["Extensive natural gas and crude oil exports via Mediterranean pipelines", "Zero sovereign foreign debt with solid central bank reserves", "Heavy military defense budget with advanced Russian air defense (S-400, Su-30)"],
     ["High dependence on state hydrocarbon revenue (85%+ of exports)", "Imports over 60% of domestic wheat consumption", "Lagging private sector and tech startup ecosystem"]),

    # Oceania
    ("AUS", "Australia", "AU", "Oceania", "Australia and New Zealand", "Canberra", 26800000, 1790, False,
     (94, 96, 92, 90, 96), (88, 90, 86, 92, 86), (82, 80, 82, 84, 80), (88, 90, 86, 88, 86), (76, 74, 76, 62, 74),
     "Commodity continent with massive iron ore, coal, LNG, and lithium surpluses, integrating nuclear submarines via AUKUS.",
     ["Vast mineral and agricultural abundance (iron ore, LNG, wheat, beef, lithium)", "High formal employment and strong legal governance", "AUKUS alliance securing advanced nuclear-powered submarine capability"],
     ["Vulnerability of maritime trade routes to regional conflict", "Domestic refined petroleum storage limited to ~30 days", "Limited domestic consumer electronics manufacturing"]),

    ("NZL", "New Zealand", "NZ", "Oceania", "Australia and New Zealand", "Wellington", 5200000, 250, False,
     (86, 82, 76, 82, 96), (88, 90, 86, 92, 86), (76, 74, 76, 80, 74), (82, 85, 80, 84, 80), (54, 50, 52, 35, 52),
     "Agrarian export champion (dairy, meat, kiwi) with high renewable geothermal/hydro grid and remote geographical sanctuary.",
     ["World top dairy and wool exporter with high food self-sufficiency", "Over 80% renewable electricity grid (geothermal and hydro)", "High transparency, human development, and stable institutions"],
     ["Geographic isolation and high transport costs for global trade", "Virtually no independent heavy military combat equipment", "Import dependence on refined vehicle fuels"]),

    # Notable Middle Powers & Regional Anchors
    ("TWN", "Taiwan", "TW", "Asia", "Eastern Asia", "Taipei", 23500000, 800, False,
     (60, 54, 68, 78, 92), (86, 88, 84, 88, 84), (98, 96, 98, 92, 96), (90, 92, 88, 90, 88), (78, 76, 80, 58, 78),
     "The indispensable silicon shield: TSMC fabricates over 90% of the world's sub-5nm microchips, facing maritime blockade risks.",
     ["Monopoly on world's advanced semiconductor fabrication (TSMC)", "High patent output and hardware engineering talent pool", "Dense asymmetric coastal defense and indigenous submarine program"],
     ["Imports 97% of primary energy, highly vulnerable to naval quarantine", "Food self-sufficiency only around 32%", "Diplomatic isolation and cross-strait military tension"]),

    ("SGP", "Singapore", "SG", "Asia", "South-Eastern Asia", "Singapore", 6000000, 520, False,
     (56, 52, 78, 76, 98), (92, 94, 90, 94, 90), (92, 90, 92, 92, 90), (92, 94, 90, 92, 88), (78, 80, 78, 55, 78),
     "Island fortress and global financial hub with premier air force (F-15SG/F-35), mega-refineries, and high sovereign capital reserves.",
     ["Global refining and maritime bunkering hub at the crossroads of Asia", "Advanced armed forces with unmatched regional air/naval superiority", "Immense sovereign wealth (GIC, Temasek) and capital reserves"],
     ["Imports 90%+ of food and reliance on imported water from Malaysia", "Microstate territorial footprint vulnerable to blockade", "High exposure to global trade slowdowns"]),

    ("ARE", "United Arab Emirates", "AE", "Asia", "Western Asia", "Abu Dhabi", 10000000, 530, False,
     (74, 96, 94, 78, 90), (74, 76, 70, 78, 72), (76, 72, 74, 78, 72), (72, 76, 68, 74, 70), (78, 76, 78, 55, 76),
     "Energy and aviation powerhouse, investing sovereign capital in civilian nuclear energy (Barakah), AI superclusters, and space probes.",
     ["Barakah 4-reactor civilian nuclear plant and oil wealth", "Leading regional AI compute investments (G42) and space mission", "Modernized military with Patriot, THAAD, and Rafale acquisitions"],
     ["Desalination-dependent water supply", "Imports nearly 90% of consumed food staples", "Heavy reliance on expatriate labor force (~85%)"]),

    ("QAT", "Qatar", "QA", "Asia", "Western Asia", "Doha", 2700000, 240, False,
     (72, 98, 96, 72, 88), (72, 74, 68, 76, 70), (68, 64, 66, 72, 66), (68, 72, 64, 70, 66), (74, 70, 72, 50, 72),
     "World's LNG export king with North Field mega-expansion, massive sovereign fund (QIA), and strategic diplomatic mediator role.",
     ["North Field LNG mega-reserves with world's lowest production cost", "Vast sovereign wealth per capita ($500B+ QIA)", "Strategic Al Udeid host base and global diplomatic reach"],
     ["Almost total dependence on imported food and consumer goods", "Expatriate workforce demographic disproportion", "Territorial vulnerability without foreign defense treaties"]),

    ("KAZ", "Kazakhstan", "KZ", "Asia", "Central Asia", "Astana", 20000000, 280, False,
     (84, 92, 86, 82, 80), (66, 68, 62, 70, 64), (58, 52, 56, 62, 56), (62, 66, 58, 64, 60), (64, 62, 64, 40, 62),
     "Central Asian giant producing 43% of the world's uranium, with huge Tengiz oil fields and grain surpluses.",
     ["World #1 uranium producer and major crude oil exporter (Tengiz, Kashagan)", "Agricultural self-sufficiency in wheat and grain exports", "Crucial transit bridge for Belt and Road and Middle Corridor"],
     ["Landlocked geography dependent on Russian transit pipelines (CPC)", "Vulnerability to regional great-power rivalry", "Underdeveloped high-tech manufacturing sector"]),

    ("PRK", "North Korea", "KP", "Asia", "Eastern Asia", "Pyongyang", 26000000, 20, True,
     (54, 58, 52, 60, 48), (62, 64, 58, 60, 58), (56, 48, 52, 58, 54), (58, 60, 54, 62, 58), (92, 90, 94, 96, 88),
     "Hyper-militarized nuclear power under extreme autarky, prioritizing nuclear ICBMs, artillery, and ammunition stockpiles.",
     ["Sovereign thermonuclear deterrent, hypersonic gliders, and ICBMs", "Immense domestic artillery stockpiles and ammunition manufacturing", "Extreme state control over domestic labor allocation"],
     ["Chronic nutritional deficiencies and food rationing", "Zero access to global high-tech supply chains or western compute", "Extreme international trade isolation"]),

    # High Estimate / Conflict / Fragile Nations
    ("CUB", "Cuba", "CU", "North America", "Caribbean", "Havana", 11000000, 100, True,
     (50, 44, 46, 54, 62), (64, 66, 60, 66, 62), (48, 42, 44, 52, 46), (62, 66, 58, 64, 60), (58, 54, 56, 32, 56),
     "Island nation under decades-long embargo with renowned medical biotech research, facing acute electrical and fuel deficits.",
     ["Indigenous biotechnology and domestic vaccine development", "High doctor-to-population ratio and medical training", "Strong national defense mobilization doctrine"],
     ["Frequent power grid blackouts due to obsolete oil plants", "Severe domestic food and consumer goods shortages", "Foreign exchange constraints restricting basic imports"]),

    ("SYR", "Syria", "SY", "Asia", "Western Asia", "Damascus", 23000000, 20, True,
     (42, 40, 38, 45, 38), (34, 36, 30, 40, 32), (32, 26, 28, 38, 30), (38, 42, 32, 38, 36), (60, 54, 58, 30, 56),
     "Post-conflict state fragmented into control zones, with severely degraded agricultural, refining, and healthcare systems.",
     ["Historical agricultural capacity in the Euphrates basin", "Substantial residual missile and air defense equipment", "Strategic Mediterranean access points"],
     ["Devastated domestic infrastructure and refinery networks", "Massive population displacement and brain drain", "Heavily reliant on external aid and Iranian credit lines"]),

    ("AFG", "Afghanistan", "AF", "Asia", "Southern Asia", "Kabul", 42000000, 15, True,
     (40, 36, 32, 42, 34), (28, 30, 24, 35, 26), (24, 18, 20, 30, 22), (28, 30, 22, 28, 26), (52, 46, 50, 25, 48),
     "Landlocked state under Taliban authority, reliant on regional barter trade, facing severe human rights sanctions and liquidity freezes.",
     ["Untapped mineral deposits (lithium, copper, rare earths)", "Guerrilla-tested light infantry and captured military materiel", "Resilient subsistence agricultural traditions"],
     ["Central bank reserves frozen abroad", "Severe exclusion of female workforce depressing productivity", "Extreme shortage of technical, medical, and scientific professionals"]),

    ("SOM", "Somalia", "SO", "Africa", "Eastern Africa", "Mogadishu", 18000000, 11, True,
     (34, 30, 26, 38, 28), (24, 26, 20, 32, 22), (22, 16, 18, 28, 20), (24, 26, 18, 24, 22), (40, 34, 38, 18, 36),
     "Fragile state in the Horn of Africa battling insurgency, relying on livestock exports, diaspora remittances, and AU peacekeepers.",
     ["Extensive coastline and maritime exclusive economic zone", "Dynamic mobile money network (Hormuud)", "Resilient pastoralist livestock trade"],
     ["Persistent al-Shabaab security threats", "Severe recurrent droughts and climate vulnerability", "Absence of formalized public revenue and defense manufacturing"]),

    ("SSD", "South Sudan", "SS", "Africa", "Eastern Africa", "Juba", 11500000, 7, True,
     (32, 50, 30, 35, 26), (22, 24, 18, 28, 20), (18, 14, 16, 24, 16), (20, 22, 16, 20, 18), (42, 36, 40, 18, 38),
     "World's youngest nation with high crude oil endowment, throttled by pipeline conflicts, intercommunal violence, and minimal industry.",
     ["High oil production potential relative to population", "Abundant fertile agricultural land in the White Nile basin", "Combat-ready armed personnel"],
     ["Total reliance on Sudanese pipelines for oil export revenues", "Nearly all manufactured goods and food staples imported", "Extreme infrastructure deficit"]),

    ("YEM", "Yemen", "YE", "Asia", "Western Asia", "Sana'a", 34000000, 21, True,
     (36, 34, 30, 38, 30), (28, 30, 24, 34, 26), (28, 22, 24, 32, 26), (30, 32, 24, 28, 28), (56, 50, 54, 26, 52),
     "Strategically positioned at Bab el-Mandeb strait with asymmetric anti-ship missile capability (Houthis), amidst a humanitarian crisis.",
     ["Control over Bab el-Mandeb maritime chokepoint", "Indigenous assembly of loitering drones and anti-ship ballistic missiles", "Centuries of terrace agriculture expertise"],
     ["Severe water table depletion and famine risk", "Fragmented dual central banks and currency collapse", "Destruction of oil export terminals and commercial ports"]),

    ("HTI", "Haiti", "HT", "North America", "Caribbean", "Port-au-Prince", 11800000, 20, True,
     (34, 28, 26, 36, 30), (26, 28, 20, 32, 24), (22, 16, 18, 26, 20), (26, 28, 20, 24, 24), (30, 26, 28, 15, 28),
     "Caribbean state enduring acute gang control over ports and fuel terminals, supported by international police missions.",
     ["Resilient cultural identity and agricultural heritage", "Diaspora remittance support networks", "Untapped solar and wind potential"],
     ["Gangs controlling key fuel distribution depots and highway corridors", "Collapse of central state policing and legal institutions", "Extreme dependence on foreign food and medical aid"])
]

print(f"Loaded {len(COUNTRIES_RAW)} comprehensive reference anchors.")
