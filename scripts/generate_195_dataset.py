#!/usr/bin/env python3
import json
import os

ALL_COUNTRIES = [
    # ------------------ NORTH AMERICA (23) ------------------
    {"id": "USA", "name": "United States", "iso2": "US", "continent": "North America", "subregion": "Northern America", "capital": "Washington, D.C.", "pop": 341000000, "gdp": 28780, "est": False,
     "c": (89, 90, 88, 86, 92), "e": (86, 88, 89, 82, 85), "t": (96, 98, 97, 95, 92), "s": (97, 98, 94, 96, 93), "m": (98, 99, 97, 98, 95),
     "desc": "Leading global superpower with near-total primary energy self-sufficiency, indigenous defense industrial complex, and frontier AI and semiconductor design dominance.",
     "strengths": ["Shale energy and agricultural net exporter", "Frontier AI and semiconductor design monopoly (NVIDIA, Intel, Apple)", "Global power-projection military & carrier strike groups"],
     "vulnerabilities": ["Critical reliance on foreign rare-earth processing", "National debt exceeding $35 Trillion", "Reliance on offshore foundries for sub-3nm chip fabrication"]},

    {"id": "CAN", "name": "Canada", "iso2": "CA", "continent": "North America", "subregion": "Northern America", "capital": "Ottawa", "pop": 40100000, "gdp": 2240, "est": False,
     "c": (94, 95, 89, 92, 98), "e": (84, 82, 78, 86, 80), "t": (74, 76, 75, 78, 72), "s": (82, 85, 78, 80, 80), "m": (62, 58, 64, 45, 68),
     "desc": "Resource-rich continental power with vast energy, freshwater, and agricultural surpluses, deeply integrated into NORAD defense.",
     "strengths": ["Immense oil sands, natural gas, uranium, and potash reserves", "World-class university research output and high human capital", "Vast freshwater reserves and fertile agricultural acreage"],
     "vulnerabilities": ["Heavy military dependence on the US defense umbrella", "Brain drain to Silicon Valley tech clusters", "Minimal indigenous advanced microchip fabrication"]},

    {"id": "MEX", "name": "Mexico", "iso2": "MX", "continent": "North America", "subregion": "Central America", "capital": "Mexico City", "pop": 130000000, "gdp": 1810, "est": False,
     "c": (72, 74, 68, 76, 70), "e": (58, 62, 56, 60, 54), "t": (64, 52, 58, 60, 68), "s": (52, 56, 44, 48, 55), "m": (55, 50, 48, 30, 52),
     "desc": "Major industrial manufacturing hub with high automotive output, pursuing greater domestic energy and technology autonomy.",
     "strengths": ["Extensive domestic crude oil reserves and refining modernization", "Robust automotive and aerospace manufacturing belt", "Geographic food diversity and agricultural self-sufficiency"],
     "vulnerabilities": ["High informal labor market (over 50%)", "Cartel security challenges affecting state sovereignty", "Import dependence on US natural gas and refined fuels"]},

    {"id": "CUB", "name": "Cuba", "iso2": "CU", "continent": "North America", "subregion": "Caribbean", "capital": "Havana", "pop": 11000000, "gdp": 100, "est": True,
     "c": (50, 44, 46, 54, 62), "e": (64, 66, 60, 66, 62), "t": (48, 42, 44, 52, 46), "s": (62, 66, 58, 64, 60), "m": (58, 54, 56, 32, 56),
     "desc": "Island nation under decades-long embargo with renowned medical biotech research, facing acute electrical and fuel deficits.",
     "strengths": ["Indigenous biotechnology and domestic vaccine development", "High doctor-to-population ratio and medical training", "Strong national defense mobilization doctrine"],
     "vulnerabilities": ["Frequent power grid blackouts due to obsolete oil plants", "Severe domestic food and consumer goods shortages", "Foreign exchange constraints restricting basic imports"]},

    {"id": "DOM", "name": "Dominican Republic", "iso2": "DO", "continent": "North America", "subregion": "Caribbean", "capital": "Santo Domingo", "pop": 11400000, "gdp": 125, "est": False,
     "c": (62, 50, 48, 68, 64), "e": (52, 54, 46, 56, 50), "t": (46, 38, 40, 52, 46), "s": (44, 48, 36, 42, 44), "m": (42, 38, 40, 20, 42),
     "desc": "Dynamic Caribbean economy with booming tourism and free trade zone manufacturing, importing majority of fossil fuels.",
     "strengths": ["Strong agricultural production of rice, poultry, and fruits", "Pueblo Viejo gold mining reserves", "Expanding solar and wind renewable capacity"],
     "vulnerabilities": ["Near total dependence on imported fossil fuels", "Labor informality exceeding 50%", "Reliance on US tourism and remittances"]},

    {"id": "GTM", "name": "Guatemala", "iso2": "GT", "continent": "North America", "subregion": "Central America", "capital": "Guatemala City", "pop": 18200000, "gdp": 105, "est": False,
     "c": (60, 54, 48, 64, 58), "e": (44, 46, 38, 48, 42), "t": (42, 34, 36, 46, 40), "s": (38, 42, 32, 38, 40), "m": (45, 40, 42, 22, 44),
     "desc": "Central America's largest population with rich agrarian resources, constrained by informal employment and emigration.",
     "strengths": ["Agro-export prowess (coffee, bananas, sugar)", "Hydroelectric and geothermal generation potential", "Geographic transit corridor"],
     "vulnerabilities": ["Informal workforce exceeding 70%", "Heavy reliance on migrant remittances", "Low scientific research funding"]},

    {"id": "CRI", "name": "Costa Rica", "iso2": "CR", "continent": "North America", "subregion": "Central America", "capital": "San José", "pop": 5250000, "gdp": 92, "est": False,
     "c": (70, 84, 50, 72, 86), "e": (72, 74, 68, 78, 70), "t": (64, 56, 60, 68, 60), "s": (62, 66, 56, 62, 60), "m": (18, 15, 16, 10, 20),
     "desc": "Demilitarized democracy with 99% renewable power and medical device exports, relying on international law for defense.",
     "strengths": ["99% renewable electricity grid (hydro, geothermal, wind)", "High-tech medical manufacturing and chip testing hubs", "High human capital and universal healthcare"],
     "vulnerabilities": ["Constitutionally abolished army with zero independent territorial defense", "100% dependent on imported petroleum for transportation", "Growing fiscal public debt"]},

    {"id": "PAN", "name": "Panama", "iso2": "PA", "continent": "North America", "subregion": "Central America", "capital": "Panama City", "pop": 4500000, "gdp": 88, "est": False,
     "c": (64, 60, 52, 68, 76), "e": (66, 68, 60, 70, 64), "t": (58, 50, 52, 64, 56), "s": (52, 56, 44, 50, 50), "m": (30, 25, 28, 15, 30),
     "desc": "Global maritime crossroads through the Panama Canal and international banking, with dollarized economy and no standing military.",
     "strengths": ["Panama Canal chokepoint generating reliable sovereign transit revenue", "Global logistics and air connectivity hub (Copa)", "Strong international financial services center"],
     "vulnerabilities": ["No standing military (public security forces only)", "Freshwater drought challenges threatening canal locks", "Total reliance on imported vehicle fuels"]},

    {"id": "HTI", "name": "Haiti", "iso2": "HT", "continent": "North America", "subregion": "Caribbean", "capital": "Port-au-Prince", "pop": 11800000, "gdp": 20, "est": True,
     "c": (34, 28, 26, 36, 30), "e": (26, 28, 20, 32, 24), "t": (22, 16, 18, 26, 20), "s": (26, 28, 20, 24, 24), "m": (30, 26, 28, 15, 28),
     "desc": "Caribbean state enduring acute gang control over ports and fuel terminals, supported by international police missions.",
     "strengths": ["Resilient cultural identity and agricultural heritage", "Diaspora remittance support networks", "Untapped solar and wind potential"],
     "vulnerabilities": ["Gangs controlling key fuel distribution depots and highway corridors", "Collapse of central state policing and legal institutions", "Extreme dependence on foreign food and medical aid"]},

    {"id": "HND", "name": "Honduras", "iso2": "HN", "continent": "North America", "subregion": "Central America", "capital": "Tegucigalpa", "pop": 10600000, "gdp": 37, "est": False,
     "c": (58, 50, 44, 62, 56), "e": (42, 44, 36, 46, 40), "t": (38, 30, 32, 44, 36), "s": (36, 40, 30, 36, 38), "m": (44, 38, 40, 20, 42),
     "desc": "Central American nation with coffee/textile manufacturing, battling high informality and fuel import dependency.",
     "strengths": ["High coffee, palm oil, and tilapia production", "Renewable hydroelectric and solar developments", "Bilingual customer service workforce"],
     "vulnerabilities": ["Heavy reliance on US remittances", "Informal employment over 70%", "Vulnerability to Atlantic hurricanes"]},

    {"id": "SLV", "name": "El Salvador", "iso2": "SV", "continent": "North America", "subregion": "Central America", "capital": "San Salvador", "pop": 6400000, "gdp": 36, "est": False,
     "c": (56, 52, 44, 60, 62), "e": (48, 50, 42, 52, 46), "t": (44, 38, 38, 48, 42), "s": (40, 44, 32, 38, 40), "m": (54, 48, 50, 24, 50),
     "desc": "Security-transformed economy with geothermal Bitcoin mining, seeking foreign investment while heavily dependent on remittances.",
     "strengths": ["Dramatic reduction in violent crime enhancing internal territorial control", "Geothermal power generation capacity", "Rapid digitization of public services"],
     "vulnerabilities": ["Total lack of domestic oil and gas reserves", "Remittances constitute over 25% of GDP", "Food grain import dependency"]},

    {"id": "NIC", "name": "Nicaragua", "iso2": "NI", "continent": "North America", "subregion": "Central America", "capital": "Managua", "pop": 7000000, "gdp": 19, "est": True,
     "c": (62, 58, 46, 62, 56), "e": (40, 42, 34, 44, 38), "t": (36, 28, 30, 42, 34), "s": (34, 38, 28, 34, 36), "m": (52, 46, 48, 22, 48),
     "desc": "Geothermal and agrarian Central American state with tight state control and Russian/Chinese diplomatic alliances.",
     "strengths": ["High renewable share from geothermal and biomass", "Self-sufficient in beef, beans, and dairy", "Deep-seated armed forces loyalty"],
     "vulnerabilities": ["Authoritarian sanctions isolating multilateral financing", "High youth emigration and labor loss", "Dependence on imported oil"]},

    {"id": "JAM", "name": "Jamaica", "iso2": "JM", "continent": "North America", "subregion": "Caribbean", "capital": "Kingston", "pop": 2850000, "gdp": 20, "est": False,
     "c": (52, 42, 40, 64, 66), "e": (54, 56, 48, 58, 52), "t": (44, 36, 38, 50, 42), "s": (46, 50, 38, 44, 46), "m": (36, 30, 32, 16, 34),
     "desc": "Island nation rich in bauxite and cultural soft power, exposed to international oil prices and foreign tourist flows.",
     "strengths": ["Extensive bauxite and alumina mining deposits", "High cultural and athletic soft power globally", "Growing BPO and logistics sectors"],
     "vulnerabilities": ["High fuel import bill for electricity", "High public debt to GDP ratio", "Brain drain of nurses and teachers to UK/US"]},

    {"id": "TTO", "name": "Trinidad and Tobago", "iso2": "TT", "continent": "North America", "subregion": "Caribbean", "capital": "Port of Spain", "pop": 1530000, "gdp": 30, "est": False,
     "c": (74, 94, 90, 76, 78), "e": (66, 68, 62, 72, 64), "t": (54, 46, 50, 60, 52), "s": (54, 58, 46, 52, 52), "m": (38, 34, 36, 18, 36),
     "desc": "Caribbean industrial powerhouse with large offshore natural gas, ammonia, and methanol refining capabilities.",
     "strengths": ["Major producer and exporter of LNG, ammonia, and methanol", "Sovereign Heritage and Stabilization Fund", "Established petrochemical industrial cluster at Point Lisas"],
     "vulnerabilities": ["Maturing offshore gas fields requiring deepwater exploration", "Food import bill exceeding 85% of domestic diet", "Small defensive armed forces"]},

    {"id": "BHS", "name": "Bahamas", "iso2": "BS", "continent": "North America", "subregion": "Caribbean", "capital": "Nassau", "pop": 410000, "gdp": 15, "est": False,
     "c": (46, 38, 36, 60, 72), "e": (68, 70, 64, 72, 66), "t": (48, 40, 42, 56, 44), "s": (44, 48, 36, 42, 44), "m": (26, 22, 24, 12, 26),
     "desc": "Wealthy archipelagic tourism and offshore banking hub with high living standards, importing nearly all food and energy.",
     "strengths": ["High per-capita income and tier-1 offshore banking jurisdiction", "Strong maritime transshipment (Freeport container port)", "Close proximity to North American consumer markets"],
     "vulnerabilities": ["Imports over 90% of food and 100% of fuel", "Zero domestic military defense (Royal Bahamas Defence Force is coast guard)", "Extreme hurricane vulnerability"]},

    {"id": "BRB", "name": "Barbados", "iso2": "BB", "continent": "North America", "subregion": "Caribbean", "capital": "Bridgetown", "pop": 282000, "gdp": 6, "est": False,
     "c": (50, 44, 38, 62, 78), "e": (70, 72, 66, 74, 68), "t": (50, 42, 44, 58, 46), "s": (48, 52, 40, 46, 48), "m": (24, 20, 22, 12, 24),
     "desc": "Independent republic championing global climate finance reform (Bridgetown Initiative) with high human development.",
     "strengths": ["Global leadership on sovereign debt and climate finance reform", "High literacy, education, and institutional stability", "Expanding solar rooftop generation"],
     "vulnerabilities": ["Imports virtually all food and vehicle hydrocarbons", "Small physical territory with no army", "High external debt service burden"]},

    {"id": "BLZ", "name": "Belize", "iso2": "BZ", "continent": "North America", "subregion": "Central America", "capital": "Belmopan", "pop": 410000, "gdp": 3, "est": False,
     "c": (62, 56, 46, 66, 70), "e": (52, 54, 46, 56, 50), "t": (38, 30, 32, 44, 36), "s": (36, 40, 28, 36, 38), "m": (32, 28, 30, 14, 30),
     "desc": "Biodiverse coastal nation with English-speaking business climate, balancing eco-tourism with food self-reliance.",
     "strengths": ["High domestic sugar, citrus, and banana production", "Extensive barrier reef eco-capital and marine reserves", "Bilingual trading position linking CARICOM and SICA"],
     "vulnerabilities": ["Imports electricity from Mexico", "Small armed forces dependent on British training support", "Vulnerable to climate extreme weather"]},

    {"id": "LCA", "name": "Saint Lucia", "iso2": "LC", "continent": "North America", "subregion": "Caribbean", "capital": "Castries", "pop": 180000, "gdp": 2.5, "est": True,
     "c": (46, 38, 34, 58, 70), "e": (56, 58, 52, 62, 54), "t": (38, 30, 32, 46, 36), "s": (40, 44, 32, 38, 40), "m": (18, 14, 16, 10, 18),
     "desc": "Eastern Caribbean island dependent on luxury tourism, banana exports, and foreign energy imports.",
     "strengths": ["High tourism appeal and Nobel laureates per capita legacy", "Expanding geothermal exploration in Soufrière", "Stable Eastern Caribbean currency (XCD)"],
     "vulnerabilities": ["Imports 90%+ of fuel and food staples", "No standing military force", "Debt vulnerability to natural disasters"]},

    {"id": "GRD", "name": "Grenada", "iso2": "GD", "continent": "North America", "subregion": "Caribbean", "capital": "St. George's", "pop": 126000, "gdp": 1.4, "est": True,
     "c": (48, 36, 32, 56, 68), "e": (54, 56, 50, 60, 52), "t": (36, 28, 30, 44, 34), "s": (42, 46, 32, 40, 42), "m": (16, 12, 14, 10, 16),
     "desc": "The 'Isle of Spice' (nutmeg, mace) hosting St. George's University medical school, lacking sovereign defense.",
     "strengths": ["World top exporter of nutmeg and organic spices", "Major offshore medical education campus", "Stable political democracy"],
     "vulnerabilities": ["No armed military force (police only)", "Heavy reliance on imported oil for power generation", "High food import bill"]},

    {"id": "ATG", "name": "Antigua and Barbuda", "iso2": "AG", "continent": "North America", "subregion": "Caribbean", "capital": "St. John's", "pop": 101000, "gdp": 2.1, "est": True,
     "c": (44, 36, 32, 56, 64), "e": (58, 60, 54, 64, 56), "t": (40, 32, 34, 48, 38), "s": (38, 42, 30, 38, 40), "m": (20, 16, 18, 10, 20),
     "desc": "Twin-island state with thriving yachting and citizenship-by-investment programs, reliant on water desalination.",
     "strengths": ["Prime yachting and luxury cruise tourism infrastructure", "Significant sovereign revenue from citizenship-by-investment", "Strong telecommunications penetration"],
     "vulnerabilities": ["Desalination dependency for potable freshwater", "Zero domestic fuel reserves", "Small coast guard defense footprint"]},

    {"id": "VCT", "name": "Saint Vincent and the Grenadines", "iso2": "VC", "continent": "North America", "subregion": "Caribbean", "capital": "Kingstown", "pop": 104000, "gdp": 1.1, "est": True,
     "c": (50, 36, 32, 58, 66), "e": (50, 52, 46, 56, 48), "t": (34, 26, 28, 42, 32), "s": (36, 40, 28, 36, 38), "m": (16, 12, 14, 10, 16),
     "desc": "Multi-island nation recovering from La Soufrière volcano eruptions, reliant on agriculture, tourism, and diaspora.",
     "strengths": ["Fertile volcanic soils for arrowroot and tropical fruits", "Strong diplomatic presence (former UN Security Council seat)", "High regional marine territory"],
     "vulnerabilities": ["Volcanic and hurricane vulnerability", "Imports all petroleum fuels", "No military armed forces"]),

    {"id": "KNA", "name": "Saint Kitts and Nevis", "iso2": "KN", "continent": "North America", "subregion": "Caribbean", "capital": "Basseterre", "pop": 48000, "gdp": 1.1, "est": True,
     "c": (44, 38, 32, 56, 68), "e": (60, 62, 56, 66, 58), "t": (40, 32, 34, 48, 38), "s": (38, 42, 30, 38, 40), "m": (18, 14, 16, 10, 18),
     "desc": "Pioneer of citizenship-by-investment programs, developing Nevis geothermal energy to achieve power independence.",
     "strengths": ["Pioneer and top-tier citizenship-by-investment fund", "Geothermal power potential on Nevis", "High per-capita GDP in the Eastern Caribbean"],
     "vulnerabilities": ["Microstate scale with tiny domestic market", "No independent defense force", "Total food and energy import exposure"]},

    {"id": "DMA", "name": "Dominica", "iso2": "DM", "continent": "North America", "subregion": "Caribbean", "capital": "Roseau", "pop": 73000, "gdp": 0.7, "est": True,
     "c": (56, 52, 36, 60, 80), "e": (48, 50, 44, 54, 46), "t": (32, 24, 26, 40, 30), "s": (34, 38, 26, 34, 36), "m": (14, 10, 12, 10, 14),
     "desc": "The 'Nature Isle' with abundant freshwater rivers and geothermal reservoirs, striving to become world's first climate-resilient nation.",
     "strengths": ["Vast freshwater rivers and abundant domestic water supply", "Near-term 100% geothermal clean power transition", "High subsistence root-crop agricultural yield"],
     "vulnerabilities": ["Catastrophic vulnerability to Category 5 hurricanes", "No military force (police constabulary)", "Imports all refined petroleum products"])
]

print(f"Loaded {len(ALL_COUNTRIES)} countries so far. Proceeding to add remaining continents...")
