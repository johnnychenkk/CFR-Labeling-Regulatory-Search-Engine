import React, { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  FileText,
  AlertCircle,
  Filter,
  X,
} from "lucide-react";

const RegulatorySearchEngine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Complete regulatory data
  const regulatoryData = [
    {
      id: 1,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.19",
      title: "Misbranded toys and other articles intended for use by children",
      keywords:
        "River Rocks, Sand, WARNING, SAFETY WARNING, CHOKING HAZARD, Small part, Small ball, Latex balloon, Marble, Labeling statements, Descriptive material, English language, Conspicuous and legible type, Typography layout or color, Solid background, Square or rectangular area, Toy or game, Children's products, Age of intended user, Not for children under 3 yrs., Not for under 8 yrs.",
      link: "https://www.ecfr.gov/current/title-16/section-1500.19",
    },
    {
      id: 2,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.83",
      title:
        "Exemptions for small packages, minor hazards, and special circumstances",
      keywords:
        "Small packages, Minor hazards, Special circumstances, Exempt from labeling requirements, Self-pressurized container, Flammable, Extremely flammable, Common matches, Paper items, Porous-tip ink-marking devices, Paste waxes, Viscous products, Solder mixture capsule, Single-use spot removers",
      link: "https://www.ecfr.gov/current/title-16/section-1500.83",
    },
    {
      id: 3,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.3",
      title: "Definitions (b)(14)",
      keywords:
        "Sand, Soda Ash, sodium carbonate, Paint, Isopropyl Alcohol, Bleach, Cautionary material, Cautionary labeling, Cautionary labeling required by the Act, Misbranded hazardous substance, Principal display panel, Signal word, Statement of the principal hazard or hazards, Common or usual name, Chemical name, Name and place of business of the manufacturer packer distributor or seller, Precautionary measures, First aid treatment, Handling and storage instructions, Keep out of the reach of children, Reasonably foreseeable handling or use, Substantial personal injury or substantial illness, DANGER, WARNING, CAUTION",
      link: "https://www.ecfr.gov/current/title-16/part-1500/section-1500.3#p-1500.3(b)(14)",
    },
    {
      id: 4,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.121",
      title: "Labeling requirements prominence, placement, and conspicuousness",
      keywords:
        "River Rocks, Sand, Soda Ash, sodium carbonate, Paint, Isopropyl Alcohol, Bleach, Prominent, Placement, Conspicuous, Legible type, Contrast by typography layout or color, Typography, Layout, Color, Principal display panel, Block together, Read carefully other cautions on the panel, Horizontal placement, Type size, Capital letters, Skull and crossbones symbol, POISON, Immediately on the container",
      link: "https://www.ecfr.gov/current/title-16/section-1500.121",
    },
    {
      id: 5,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.14",
      title:
        "Products requiring special labeling under section 3(b) of the act",
      keywords:
        "Paint, Bleach, Diethylene glycol, Ethylene glycol, Methyl alcohol, Benzene, Toluene, Xylene, Petroleum Distillates, Turpentine, Charcoal, Fireworks devices, Fountains, Roman Candles, Rockets with sticks, Sparklers, Art materials, Signal word, DANGER, WARNING, CAUTION, Skull and crossbones symbol, POISON, Statement of hazard, Precautionary measures, Age-related supervision, Physical state, Concentration range",
      link: "https://www.ecfr.gov/current/title-16/section-1500.14",
    },
    {
      id: 6,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.127",
      title: "Substances with multiple hazards",
      keywords:
        "Soda Ash, sodium carbonate, Paint, Isopropyl Alcohol, Bleach, Multiple hazards, Affirmative statement of each such hazard, Precautionary measures, Instructions, Combined statement, Parallel information, Condensed statement, Toxic, Flammable",
      link: "https://www.ecfr.gov/current/title-16/section-1500.127",
    },
    {
      id: 7,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.130",
      title: "Self-pressurized containers: labeling",
      keywords:
        "Isopropyl Alcohol, Self-pressurized container, Warning—Contents under pressure, CAUTION, Do not puncture or incinerate container, Do not expose to heat or store at temperatures above 120 °F, Keep out of the reach of children, Flammable, Extremely flammable, Flashback, Flame projection exceeding 18 inches, Additional hazards, Principal display panel, Other display panel, Read carefully other cautions on the panel",
      link: "https://www.ecfr.gov/current/title-16/section-1500.130",
    },
    {
      id: 8,
      category: "Federal Hazardous Substances Act",
      section: "§ 1500.129",
      title: "Substances named in the Federal Caustic Poison Act",
      keywords:
        "Soda Ash, sodium carbonate, Bleach, POISON, Principal hazard, Highly toxic, Chemical name, Concentration, Hydrochloric acid, Sulfuric acid, Nitric acid, Carbolic acid, Phenol, Oxalic acid, Potassium hydroxide, Caustic potash, Sodium hydroxide, Caustic soda, Lye, Silver nitrate, Ammonia water, Ammonium hydroxide, Acetic acid, First-aid treatment, Misbranded parcel package or container",
      link: "https://www.ecfr.gov/current/title-16/section-1500.129",
    },
    {
      id: 9,
      category: "Consumer Product Safety Act",
      section: "§ 1700.5",
      title: "Noncomplying package requirements",
      keywords:
        "Noncomplying package, Special packaging, This Package for Households Without Young Children, Package Not Child-Resistant, Conspicuously, Principal display panel, Immediate container, Outer container or wrapping, Square or rectangle, Distinct contrast, Capital letters, Type size, Single noncomplying size, Elderly or handicapped persons",
      link: "https://www.ecfr.gov/current/title-16/section-1700.5",
    },
    {
      id: 10,
      category: "Consumer Product Safety Act",
      section: "§ 1107.30",
      title:
        "Labeling consumer products to indicate that the certification requirements of section 14 of the CPSA have been met",
      keywords:
        "Uniform label, Provided with the product, CPSC, Meets CPSC Safety Requirements, Visible and legible, Certification requirements, Consumer product safety rule, Manufacturer, Private labeler, Does not alter or mislead, Not an endorsement",
      link: "https://www.ecfr.gov/current/title-16/section-1107.30",
    },
    {
      id: 11,
      category: "Hazard Communication Standard (HCS)",
      section: "§ 1910.1200 (f)",
      title: "Hazard communication-Labels and other forms of warning",
      keywords:
        "Sand, Soda Ash, sodium carbonate, Baking Soda, sodium bicarbonate, Paint, Isopropyl Alcohol, Bleach, Product Identifier, Signal Word, DANGER, WARNING, Hazard Statement, Pictogram, Skull and crossbones, Flame, Exclamation mark, Health hazard, Corrosion, Precautionary Statement, Prevention, Response, Storage, Disposal, Name, Address, Telephone number, Chemical manufacturer, Importer, Container, Workplace labels, Specific hazards not otherwise classified, HNOC, Mixtures, Alternative labeling, Legible, English, Prominently displayed",
      link: "https://www.ecfr.gov/current/title-29/section-1910.1200",
    },
    {
      id: 12,
      category: "Hazard Communication Standard (HCS)",
      section: "§ 1910.1200 (b)",
      title: "Hazard communication-Scope and application",
      keywords:
        "Sand, Paint, Isopropyl Alcohol, Hazard Communication Standard, HCS, Exemption, Consumer product, Hazardous substance, Consumer Product Safety Act, CPSA, Federal Hazardous Substances Act, FHSA, Workplace, Intended use",
      link: "https://www.ecfr.gov/current/title-29/section-1910.1200",
    },
    {
      id: 13,
      category: "Hazard Communication Standard (HCS)",
      section: "Appendix D to § 1910.1200",
      title: "Safety Data Sheets (Mandatory)",
      keywords:
        "Sand, Soda Ash, sodium carbonate, Baking Soda, sodium bicarbonate, Paint, Isopropyl Alcohol, Bleach, Safety Data Sheet, SDS, Hazard Communication Standard, HCS, Globally Harmonized System, GHS, Chemical manufacturer, Importer, Responsible party, Product identifier, Recommended use, Restrictions on use, Emergency phone number, Classification, Signal word, DANGER, WARNING, Hazard statement, Symbol, Pictogram, Precautionary statement, Chemical name, Common name, Synonyms, CAS No., Concentration, Concentration range, First-Aid Measures, Symptoms, Acute effects, Delayed effects, Immediate medical attention, Fire-Fighting Measures, Extinguishing media, Specific hazards, Protective equipment, Accidental Release Measures, Personal precautions, Protective equipment, Containment methods, Cleaning methods, Handling, Storage, Exposure Controls, Personal Protection, PEL, TLV, Engineering controls, PPE, Physical and Chemical Properties, Physical state, Odor, pH, Flash point, Flammability, Stability and Reactivity, Reactivity, Chemical stability, Incompatible materials, Hazardous decomposition products, Toxicological Information, Routes of exposure, Carcinogenicity, Date of preparation, Last revision",
      link: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1200",
    },
    {
      id: 14,
      category: "Flammable liquids",
      section: "§ 1910.106 (d)(3)",
      title: "Design, construction, and capacity of storage cabinets",
      keywords:
        "Maximum capacity, 60 gallons, 120 gallons, Flammable liquids, Fire resistance, Internal temperature, Double walled, No. 18 gage sheet iron/steel, Joints/seams, Three-point lock, Door sill, Labeling, Flammable - Keep Fire Away, Wooden cabinets, Vents",
      link: "https://www.ecfr.gov/current/title-29/part-1910/section-1910.106#p-1910.106%28d%29%283%29",
    },
    {
      id: 15,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.400",
      title: "General labeling requirements",
      keywords:
        "Paint, Isopropyl Alcohol, Bleach, Hazardous material, Label, Labeling requirements, Hazard class, EXPLOSIVES 1.1, EXPLOSIVES 1.2, EXPLOSIVES 1.3, EXPLOSIVES 1.4, EXPLOSIVES 1.5, EXPLOSIVES 1.6, FLAMMABLE GAS, NON-FLAMMABLE GAS, POISON GAS, FLAMMABLE LIQUID, FLAMMABLE SOLID, SPONTANEOUSLY COMBUSTIBLE, DANGEROUS WHEN WET, OXIDIZER, ORGANIC PEROXIDE, POISON INHALATION HAZARD, POISON, INFECTIOUS SUBSTANCE, RADIOACTIVE WHITE-I, RADIOACTIVE YELLOW-II, RADIOACTIVE YELLOW-III, FISSILE, CORROSIVE, CLASS 9, LITHIUM BATTERY, CARGO AIRCRAFT ONLY, EMPTY, Primary hazard, Subsidiary hazard, Overpack, Bulk packaging, Non-bulk package, Offer for transportation, Transports, Exceptions from labeling, Package, Consolidated packaging, Hazardous Materials Table",
      link: "https://www.ecfr.gov/current/title-49/section-172.400",
    },
    {
      id: 16,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.401",
      title: "Prohibited labeling",
      keywords:
        "Prohibited labeling, Hazardous material, Represents a hazard, Confused with, Conflict with a label, Prohibited label, Misbranding, Offer for transportation, Transport a package, Unused, Cleaned and purged, Not visible during transportation, Labeled in conformance with, UN Recommendations, IMDG Code, ICAO Technical Instructions, TDG Regulations, GHS",
      link: "https://www.ecfr.gov/current/title-49/section-172.401",
    },
    {
      id: 17,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§§ 172.521 - 172.560",
      title: "Specific placard requirements",
      keywords:
        "Placard, General specifications, Strength and durability, Design, Size, Inner border, Color, Symbol, Text, Hazard class, Division number, DANGEROUS placard, EXPLOSIVES 1.1, EXPLOSIVES 1.2, EXPLOSIVES 1.3, EXPLOSIVES 1.4, EXPLOSIVES 1.5, EXPLOSIVES 1.6, POISON GAS placard, FLAMMABLE GAS placard, NON-FLAMMABLE GAS placard, OXYGEN placard, FLAMMABLE placard, COMBUSTIBLE placard, FLAMMABLE SOLID placard, SPONTANEOUSLY COMBUSTIBLE placard, DANGEROUS WHEN WET placard, OXIDIZER placard, ORGANIC PEROXIDE placard, POISON placard, POISON INHALATION HAZARD placard, RADIOACTIVE placard, CORROSIVE placard, CLASS 9 placard, UN/NA Identification number, Bulk packaging, Freight container, Transport vehicle, Principal display panel",
      link: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-172/subpart-F",
    },
    {
      id: 18,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.402",
      title: "Additional labeling requirements",
      keywords:
        "Subsidiary hazard labels, Primary hazard, Hazard class, Division number, Cargo Aircraft Only label, Class 7 (Radioactive) Materials, Fissile label, Explosives (Class 1), Poison, Poison Inhalation Hazard, Flammable Gas, Oxidizer, Corrosive, Package, Overpack, Proper shipping name, § 172.101 Table, Column 6",
      link: "https://www.ecfr.gov/current/title-49/section-172.402",
    },
    {
      id: 19,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.406",
      title: "Placement of labels",
      keywords:
        "Isopropyl Alcohol, Placement, Surface, Side, Top, End, Not bottom, Near proper shipping name, Same surface, Primary hazard label, Subsidiary hazard label, Next to each other, Unobscured, Clearly visible, Contrast with background, Dotted line border, Solid line border, Duplicate labeling, Two sides, Two ends, Cylinder, Irregular surface, Durable, Weather resistant",
      link: "https://www.ecfr.gov/current/title-49/section-172.406",
    },
    {
      id: 20,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 171.1",
      title:
        "Applicability of Hazardous Materials Regulations (HMR) to persons and functions",
      keywords:
        "Person, Individual, Firm, Corporation, Government, Offeror, Carrier, Shipper, Packaging manufacturer, Reconditioner, Pre-transportation functions, Transportation functions, In commerce, Movement, Loading incidental to movement, Unloading incidental to movement, Determining hazard class, Selecting packaging, Filling packaging, Marking, Labeling, Preparing shipping papers, Providing emergency response information",
      link: "https://www.ecfr.gov/current/title-49/section-171.1",
    },
    {
      id: 21,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.407",
      title: "Label specifications",
      keywords:
        "Isopropyl Alcohol, Durability, Weather resistant, Design, Diamond, Square-on-point, Inner border, Symbol, Size, 100 mm, Cargo Aircraft Only, Color, Pantone®, Fadeometer test, Black, White, Text, Numbers, Hazard class number, Division number, Label name, Letter height, Exceptions, UN Recommendations, ICAO, IMDG Code, Radioactive trefoil symbol, Form identification",
      link: "https://www.ecfr.gov/current/title-49/section-172.407",
    },
    {
      id: 22,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§§ 172.411 to 172.450",
      title: "Individual hazard label",
      keywords:
        "Label, Hazard Class, Division, Subsidiary label, Symbol, Hazard Class Number, Compatibility Group Letter, EXPLOSIVE 1.1, EXPLOSIVE 1.2, EXPLOSIVE 1.3, EXPLOSIVE 1.4, EXPLOSIVE 1.5, EXPLOSIVE 1.6, FLAMMABLE GAS, NON-FLAMMABLE GAS, POISON GAS, FLAMMABLE LIQUID, FLAMMABLE SOLID, SPONTANEOUSLY COMBUSTIBLE, DANGEROUS WHEN WET, OXIDIZER, ORGANIC PEROXIDE, POISON, POISON INHALATION HAZARD, INFECTIOUS SUBSTANCE, RADIOACTIVE WHITE-I, RADIOACTIVE YELLOW-II, RADIOACTIVE YELLOW-III, FISSILE, CORROSIVE, CLASS 9, LITHIUM BATTERY, CARGO AIRCRAFT ONLY, EMPTY",
      link: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-172/subpart-E",
    },
    {
      id: 23,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 178.3",
      title: "Marking of packagings",
      keywords:
        "UN standard, DOT specification, Marking, Manufacturer, Specification markings, Durable, Legible, Permanent form, Non-removable component, Unobstructed area, UN symbol, UN packaging code, Packing Group, X, Y, Z, Specific gravity, Test pressure, S, Gross mass, Year of manufacture, State authorizing allocation, Reconditioner, R",
      link: "https://www.ecfr.gov/current/title-49/section-178.3",
    },
    {
      id: 24,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.504",
      title: "General placarding requirements",
      keywords:
        "Paint, Isopropyl Alcohol, Bleach, Placard, Placarding requirements, Hazard class, Division, Table 1, Table 2, Bulk packaging, Non-bulk packaging, Transport vehicle, Rail car, Aggregate gross weight, Less than 454 kg, Any quantity, Each side, Each end, DANGEROUS placard, Permissive placarding, Subsidiary hazards, Poison Inhalation Hazard, PIH, ID number, UN number, NA number, Orange panel, White square-on-point, General specifications for placards, Size, Color, Durability",
      link: "https://www.ecfr.gov/current/title-49/section-172.504",
    },
    {
      id: 25,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 172.519",
      title: "General specifications for placards",
      keywords:
        "Placard, Strength and durability, 30-day exposure to open weather, Tagboard, Mullen test, Reflective materials, Retroreflective materials, Design, Inner border, Symbol, Hazard class, Division number, Size, Minimum dimensions, Letter height, Color, Color tolerances, Fadeometer test, Form identification",
      link: "https://www.ecfr.gov/current/title-49/section-172.519",
    },
    {
      id: 26,
      category: "Hazardous Materials Regulations (DOT)",
      section: "§ 178.503",
      title: "Marking of packagings",
      keywords:
        "UN symbol, Packaging identification code, 1A1, 4G, 6HA1, Packing Group, Packaging Group, X, Y, Z, Specific gravity, Gross mass, Hydrostatic test pressure, S, Year of manufacture, State authorizing the mark, Manufacturer's name, Manufacturer's address, Manufacturer's symbol, Reconditioning marks, R, Durable, Legible, Readily visible, Permanent form",
      link: "https://www.ecfr.gov/current/title-49/section-178.503",
    },
    {
      id: 27,
      category: "Pesticide Programs",
      section: "§ 156.10",
      title: "Labeling requirements",
      keywords:
        "Bleach, Name, Brand, Trademark, Producer, Registrant, Person for whom produced, Net contents, EPA Registration Number (EPA Reg. No.), EPA Establishment Number (EPA Est. No.), Signal word, DANGER, WARNING, CAUTION, POISON, Skull and crossbones symbol, Keep out of the reach of children, Precautionary statements, First aid instructions, Environmental hazards, Personal Protective Equipment (PPE), Labeling, Principal display panel, Conspicuous, Legible, English language, Ingredient statement, Directions for Use, Misbranding, False statements, Misleading statements, Storage statements, Disposal statements",
      link: "https://www.ecfr.gov/current/title-40/section-156.10",
    },
    {
      id: 28,
      category: "Pesticide Programs",
      section: "§ 156.64",
      title: "Signal word",
      keywords:
        "Bleach, Signal word, DANGER, WARNING, CAUTION, POISON, Toxicity Category I, Toxicity Category II, Toxicity Category III, Toxicity Category IV, Front panel, Conspicuous, All capital letters, Acute toxicity, Routes of exposure, Oral, Dermal, Inhalation, Eye irritation, Skin irritation, Child hazard warning, Keep Out of Reach of Children",
      link: "https://www.ecfr.gov/current/title-40/section-156.64",
    },
    {
      id: 29,
      category: "Pesticide Programs",
      section: "§ 156.66",
      title: "Child hazard warning",
      keywords:
        "Bleach, Keep Out of Reach of Children, Front panel, Signal word, Separate line, Alternative statement, Waived, Toxicity Category IV, Industrial use product, Impregnated pet collar",
      link: "https://www.ecfr.gov/current/title-40/section-156.66",
    },
    {
      id: 30,
      category: "Pesticide Programs",
      section: "§ 156.68",
      title: "First aid statements",
      keywords:
        "Bleach, First Aid, Statement of Practical Treatment, Systemic effects, Skin or eye irritation, Toxicity Category I, II, III, Routes of exposure, Note to Physician, Front panel, See first aid statement on back panel, Any panel, Legible, Conspicuous",
      link: "https://www.ecfr.gov/current/title-40/section-156.68",
    },
    {
      id: 31,
      category: "Pesticide Programs",
      section: "§ 156.70",
      title: "Precautionary statements for human hazards",
      keywords:
        "Bleach, Precautionary Statements, Human Hazards, Domestic Animals, Signal Word, DANGER, WARNING, CAUTION, POISON, Skull and Crossbones, First Aid Statement, Hazard Statements, Fatal if swallowed/inhaled/absorbed, Corrosive, Causes eye and skin damage, Causes eye/skin irritation, Route(s) of exposure, Precautionary Measures, Do not breathe vapor/dust/mist, Do not get in eyes/skin/clothing, Wear goggles/face shield/rubber gloves, Personal Protective Equipment (PPE), Toxicity Category I, II, III, IV, Irritation effects, Sensitizer, Acute hazard, Use dilution",
      link: "https://www.ecfr.gov/current/title-40/section-156.70",
    },
    {
      id: 32,
      category: "Pesticide Programs",
      section: "§ 156.140",
      title: "Identification of container types",
      keywords:
        "Nonrefillable container, Nonrefillable container statement, Do not reuse or refill this container, Do not reuse this container to hold materials other than pesticides, Refillable container, Refillable container statement, Refill this container with pesticide only, Do not reuse this container for any other purpose, Batch code, Storage and Disposal, Durable marking, Exemptions, Aerosol cans, One-time use tubes, Foil packets, Recycling statement, Offer for recycling if available, Reconditioning statement, Offer for reconditioning if appropriate",
      link: "https://www.ecfr.gov/current/title-40/section-156.140",
    },
    {
      id: 33,
      category: "Pesticide Programs",
      section: "§ 156.144",
      title: "Residue removal instructions—general",
      keywords:
        "Bleach, Residue removal instructions, Container disposal, Storage and Disposal, Nonrefillable containers, Refillable containers, Dilutable",
      link: "https://www.ecfr.gov/current/title-40/section-156.144",
    },
    {
      id: 34,
      category: "Air Programs",
      section: "§ 59.202",
      title: "Definitions",
      keywords:
        "Administrator, Aerosol cooking spray, Agricultural use, Air freshener, Bathroom and tile cleaner, Charcoal lighter material, Consumer product, Contact adhesive, Distributor, Double-phase aerosol air freshener, Fabric protectant, Flea and tick insecticide, Flying bug insecticide, Fragrance, High-volatility organic compound (HVOC), Volatile organic compound (VOC)",
      link: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-59/subpart-C/section-59.202",
    },
    {
      id: 35,
      category: "Air Programs",
      section: "§ 59.205",
      title: "Labeling",
      keywords:
        "Paint, Container or package, Clearly display, Day, month, and year of manufacture, Code indicating date, Charcoal lighter material, Sampling the product, Volatile organic compounds (VOCs)",
      link: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-59/subpart-C/section-59.205",
    },
    {
      id: 36,
      category: "Air Programs",
      section: "§ 59.405",
      title: "Container labeling requirements",
      keywords:
        "Paint, Date the coating was manufactured, Date code, Thinning recommendations, VOC content, Grams of VOC per liter, Pounds of VOC per gallon, VOC content limit, Industrial maintenance coating, For industrial use only, For professional use only, Not for residential use, Specific use conditions, Immersion in water or chemicals, Exposure to corrosive/caustic/acidic agents, High-temperature exposure (above 120 °C), Heavy abrasion, Exterior exposure of metal structures, Recycled coating, Post-consumer coating content",
      link: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-59/subpart-C/section-59.205",
    },
    {
      id: 37,
      category: "Food for Human Consumption",
      section: "§ 101.100",
      title: "Food exemptions from labeling",
      keywords:
        "Baking Soda, sodium bicarbonate, Exemptions, Bulk containers, Retail establishment, Repackaged in a retail establishment, Assortment of different items, Ingredients common to all packages, Uncommon ingredients, Processed, labeled, or repacked, Shipment or other delivery, Insubstantial quantity, Insignificant levels, Sulfiting agent, Common or usual name, Name and place of business, Small packages",
      link: "https://www.ecfr.gov/current/title-21/section-101.100",
    },
    {
      id: 38,
      category: "Food for Human Consumption",
      section: "§ 117.136",
      title:
        "Circumstances in which the owner, operator, or agent in charge of a manufacturing/processing facility is not required to implement a preventive control",
      keywords:
        "Hazard requiring a preventive control, Preventive control, Could not be consumed, Raw agricultural commodities, Rely on your customer, Written assurance, Subsequent distribution step, Documentation, System that ensures control",
      link: "https://www.ecfr.gov/current/title-21/section-117.136",
    },
    {
      id: 39,
      category: "Food for Human Consumption",
      section: "§ 101.22",
      title:
        "Foods labeling of spices, flavorings, colorings and chemical preservatives",
      keywords:
        "Spices, Spice and coloring, Natural flavor, Natural flavoring, Artificial flavor, Artificial flavoring, Chemical preservative, Preservative, Artificial coloring, Artificial color, Color added, Colored with ____, Common or usual name, Specific artificial color, Natural and artificial, Characterizing flavor, Artificial smoke flavor",
      link: "https://www.ecfr.gov/current/title-21/section-101.22",
    },
    {
      id: 40,
      category: "Food for Human Consumption",
      section: "§ 101.5",
      title:
        "Food name and place of business of manufacturer, packer, or distributor",
      keywords:
        "Baking Soda, sodium bicarbonate  Name and place of business, Manufacturer, Packer, Distributor, Corporate name, Manufactured for, Distributed by, Packed for, Street address, City, State, ZIP code, Conspicuously, Principal display panel, Information panel, Packaged form",
      link: "https://www.ecfr.gov/current/title-21/section-101.5",
    },
    {
      id: 41,
      category: "Food for Human Consumption",
      section: "§ 101.30",
      title:
        "Percentage juice declaration for foods purporting to be beverages that contain fruit or vegetable juice",
      keywords:
        "Purport to be a beverage, Percentage juice declaration, Contains ___ percent juice, Less than 1 percent juice, Zero (0) percent juice, 100 percent juice, From concentrate, Flavor, Flavored, Vignette, Ingredient statement, Principal display panel (PDP), Information panel",
      link: "https://www.ecfr.gov/current/title-21/section-101.30",
    },
    {
      id: 42,
      category: "Food for Human Consumption",
      section: "§ 101.9",
      title: "Nutrition labeling of food",
      keywords:
        "Baking Soda, sodium bicarbonate, Nutrition Facts, Serving Size, Servings Per Container, Calories, Daily Value (DV), Total Fat, Saturated Fat, Trans Fat, Cholesterol, Sodium, Total Carbohydrate, Dietary Fiber, Total Sugars, Added Sugars, Protein, Vitamin D, Calcium, Iron, Potassium, Dual-column labeling, Reference Daily Intake (RDI), Daily Reference Values (DRV), Common household measures, Insignificant amount, Nutrient content claims",
      link: "https://www.ecfr.gov/current/title-21/section-101.9",
    },
    {
      id: 43,
      category: "Food for Human Consumption",
      section: "§ 101.17",
      title: "Food labeling warning, notice, and safe handling statements",
      keywords:
        "WARNING, Self-pressurized containers, Avoid spraying in eyes, Contents under pressure, Do not puncture or incinerate, Keep out of reach of children, Halocarbon or hydrocarbon propellants, Intentional misuse, Very low calorie protein diets, Not for use by infants, children, or pregnant or nursing women, Iron-containing products, Accidental overdose, Call a doctor or poison control center immediately, Dry or incompletely hydrated psyllium husk, Choking, Unpasteurized juice, Harmful bacteria, Serious illness in children, the elderly, and persons with weakened immune systems, Safe handling instructions, Detained in accordance with regulations, Principal display panel, Information panel, Conspicuously, Prominently",
      link: "https://www.ecfr.gov/current/title-21/section-101.17",
    },
    {
      id: 44,
      category: "Food for Human Consumption",
      section: "§ 117.135",
      title: "Preventive controls",
      keywords:
        "Preventive controls, Hazards requiring a preventive control, Adulterated food, Written preventive controls, Process controls, Critical control points (CCPs), Food allergen controls, Sanitation controls, Environmental pathogens, Supply-chain controls, Recall plan, Other controls, Monitoring, Corrective actions, Verification",
      link: "https://www.ecfr.gov/current/title-21/section-117.135",
    },
    {
      id: 45,
      category: "Food for Human Consumption",
      section: "§ 117.130",
      title: "Hazard analysis",
      keywords:
        "Hazard analysis, Known or reasonably foreseeable hazards, Biological hazards, Microbiological hazards, Chemical hazards, Radiological hazards, Pesticide residues, Drug residues, Natural toxins, Decomposition, Unapproved food additives, Unapproved color additives, Food allergens, Physical hazards, Stones, Glass, Metal fragments, Hazard identification, Hazard evaluation, Severity, Probability, Preventive controls, Ready-to-eat (RTE) food, Economic gain, Written analysis, Raw materials, Other ingredients, Manufacturing/processing procedures, Packaging and labeling activities, Intended or reasonably foreseeable use, Sanitation, Employee hygiene",
      link: "https://www.ecfr.gov/current/title-21/section-117.130",
    },
    {
      id: 46,
      category: "Food for Human Consumption",
      section: "§ 117.80",
      title: "Processes and controls",
      keywords:
        "Sanitary operations, Controls, Preventing adulteration, Food, Food-contact surfaces, Packaging, Raw materials, Ingredients, Pest exclusion, Hazard analysis, Preventive controls, Good Manufacturing Practices (GMPs), Personnel, Hygiene, Plant design, Facilities, Equipment, Utensils, Waste disposal, Separation, Water supply",
      link: "https://www.ecfr.gov/current/title-21/section-117.80",
    },
    {
      id: 47,
      category: "Food for Human Consumption",
      section: "§ 101.7",
      title: "Declaration of net quantity of contents",
      keywords:
        "Baking Soda, sodium bicarbonate, Net quantity of contents, Principal display panel (PDP), Weight, Net wt., avoirdupois pound (lb), ounce (oz), Fluid measure, Fluid ounce (fl oz), Gallon (gal), Quart (qt), Pint (pt), Net contents, Numerical count, Combination of numerical count and weight or measure, Conspicuous, Legible, Boldface print or type, In distinct contrast, Bottom 30 percent, Parallel to the base, Type size, Common fraction, Decimal fraction, Random package, Abbreviations",
      link: "https://www.ecfr.gov/current/title-21/section-101.7",
    },
    {
      id: 48,
      category: "Food for Human Consumption",
      section: "§ 101.2",
      title: "Information panel of package form food",
      keywords:
        "Baking Soda, sodium bicarbonate, Information panel, Principal display panel (PDP), Immediately contiguous and to the right, Unusable label space, Alternate principal display panels, Top of the container, Single panel, Mandatory label information, Ingredient list, Nutrition labeling, Nutrition Facts, Name and place of business of the manufacturer, packer, or distributor, Net quantity of contents, Allergen declaration, Prominently and conspicuously, Legible type, One-sixteenth inch in height, Type size",
      link: "https://www.ecfr.gov/current/title-21/section-101.2",
    },
    {
      id: 49,
      category: "Food for Human Consumption",
      section: "§ 101.1",
      title: "Principal display panel of package form food",
      keywords:
        "Baking Soda, sodium bicarbonate, Principal Display Panel (PDP), Alternate Principal Display Panels, Area of the Principal Display Panel, Rectangular Package, Cylindrical or Nearly Cylindrical Container, Otherwise Shaped Container, Exclusions, Mandatory label information, Statement of identity, Net quantity, Clarity and conspicuousness, Without obscuring design, vignettes, or crowding, Duplicated",
      link: "https://www.ecfr.gov/current/title-21/section-101.1",
    },
    {
      id: 50,
      category: "Food for Human Consumption",
      section: "§ 101.3",
      title: "Identity labeling of food in packaged form",
      keywords:
        "Baking Soda, sodium bicarbonate, Statement of the identity, Principal display panel, Common or usual name, Appropriately descriptive term, Fanciful name, Bold type, Reasonably related to the most prominent printed matter, Lines generally parallel to the base, Optional form, Imitation, Dietary supplement",
      link: "https://www.ecfr.gov/current/title-21/section-101.3",
    },
    {
      id: 51,
      category: "Food for Human Consumption",
      section: "§ 101.4",
      title: "Food designation of ingredients",
      keywords:
        "Baking Soda, sodium bicarbonate, Ingredients, Common or usual name, Descending order of predominance by weight, Principal display panel (PDP), Information panel, Sub-ingredients, Collective name, Spices, Flavorings, Colorings, Chemical preservatives, Specific common or usual name, Hydrogenated, Partially hydrogenated, Contains one or more of the following, Major food allergens",
      link: "https://www.ecfr.gov/current/title-21/section-101.4",
    },
    {
      id: 52,
      category: "Drugs: General",
      section: "§ 201.50",
      title: "Statement of identity",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Statement of identity, Established name, Prescription drug, Insulin-containing drug, Mixture, No established name, Quantitative ingredient information, Principal features, Placement, size, and prominence",
      link: "https://www.ecfr.gov/current/title-21/section-201.50",
    },
    {
      id: 53,
      category: "Drugs: General",
      section: "§ 201.51",
      title: "Declaration of net quantity of contents",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Net quantity of contents, Declaration, Weight, Measure, Numerical count, Combination of numerical count and weight or measure, Unit dosage form, Avoirdupois pound, ounce, grain, Kilogram, gram, subdivisions thereof, U.S. gallon, quart, pint, fluid-ounce, fluid-dram, Liter, milliliter, Cubic centimeter, 68 °F (20 °C), Distinct item on the label, Accurate statement, Reasonable variations, Good manufacturing practice, Good distribution practice, Ampules, Vials, Minimum quantity, Excess volume, sample, physician's sample",
      link: "https://www.ecfr.gov/current/title-21/section-201.51",
    },
    {
      id: 54,
      category: "Drugs: General",
      section: "§ 201.15",
      title: "Drugs prominence of required label statements",
      keywords:
        "Isopropyl Alcohol, Prominence, Conspicuousness, Typography, Layout, Contrast, Printing features, Customary conditions of purchase, Label space, Smallness or style of type, Obscuring designs or vignettes, Crowding with other written, printed, or graphic matter, Foreign language",
      link: "https://www.ecfr.gov/current/title-21/section-201.15",
    },
    {
      id: 55,
      category: "Drugs: General",
      section: "§ 201.10",
      title: "Drugs statement of ingredients",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Ingredient information, Established name, Proprietary name, Active ingredients, Inactive ingredients, Quantity, Percentage, Unit dosage form, Fanciful proprietary name, Misleading, Placement, Prominence",
      link: "https://www.ecfr.gov/current/title-21/section-201.10",
    },
    {
      id: 56,
      category: "Drugs: General",
      section: "§ 201.66",
      title:
        "Format and content requirements for over-the-counter (OTC) drug product labeling",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Drug Facts, Active ingredient, Purpose, Use, Warning, Do not use, Ask a doctor before use if you have, Ask a doctor or pharmacist before use if you are, When using this product, Stop use and ask a doctor if, Pregnancy/breast-feeding warning, Keep out of reach of children, Directions, Other information, Inactive ingredients, Questions? or Comments?, Outside container or wrapper, Immediate container, Principal display panel, Reye's syndrome, Allergy alert, Flammability warning, Liver warning, Stomach bleeding warning, Sore throat warning, Dosage warning",
      link: "https://www.ecfr.gov/current/title-21/section-201.66",
    },
    {
      id: 57,
      category: "Drugs: General",
      section: "§ 201.1",
      title:
        "Drugs name and place of business of manufacturer, packer, or distributor",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Manufacturer, Packer, Distributor, Name and place of business, Street address, City, State, ZIP Code, Finished package form, Misbranded, Conspicuously, Qualified phrases, Corporate name, Principal place of business",
      link: "https://www.ecfr.gov/current/title-21/section-201.1",
    },
    {
      id: 58,
      category: "Drugs: General",
      section: "§ 201.5",
      title: "Drugs adequate directions for use",
      keywords:
        "Baking Soda, sodium bicarbonate, Isopropyl Alcohol, Adequate directions for use, Layman, Safely, Intended use, Misbranded, Statements of all conditions, purposes, or uses, Quantity of dose, Quantities for different ages and physical conditions, Frequency of administration or application, Duration of administration or application, Time of administration or application, Route or method of administration or application, Preparation for use",
      link: "https://www.ecfr.gov/current/title-21/section-201.5",
    },
    {
      id: 59,
      category: "Drugs: General",
      section: "§ 201.57",
      title:
        "Specific requirements on content and format of labeling for human prescription drug and biological products described in § 201.56(b)(1)",
      keywords:
        "Prescribing Information, Format, Bolded, Boxed Warning, Black Box Warning, Highlights of Prescribing Information, Table of Contents, Indications and Usage, Dosage and Administration, Dosage Forms and Strengths, Contraindications, Warnings and Precautions, Adverse Reactions, Drug Interactions, Use in Specific Populations, Drug Abuse and Dependence, Overdosage, Description, Clinical Pharmacology, Pharmacokinetics, Pharmacodynamics, Clinical Studies, How Supplied/Storage and Handling, Patient Counseling Information, Patents, Revision Date",
      link: "https://www.ecfr.gov/current/title-21/section-201.57",
    },
    {
      id: 60,
      category: "Drugs: General",
      section: "§ 201.56",
      title:
        "Requirements on content and format of labeling for human prescription drug and biological products",
      keywords:
        "Essential scientific information, Informative and accurate, Based on data derived from human experience, New drug application (NDA), Biologics license application (BLA), Efficacy supplement, Highlights of Prescribing Information (Highlights), Full Prescribing Information (FPI), Table of contents, Boxed warning, Black Box Warning, Minimum specifications for format, Bold type, Bullet points, Type size, Spacing",
      link: "https://www.ecfr.gov/current/title-21/section-201.56",
    },
    {
      id: 61,
      category: "Drugs: General",
      section: "§ 201.55",
      title: "Statement of dosage",
      keywords:
        "Recommended or usual dosage, Prescription drugs, Package insert, See package insert for dosage information, Informative, Useful, Realistic, Readily be set forth on the label, Varies within extremely wide limits",
      link: "https://www.ecfr.gov/current/title-21/section-201.55",
    },
    {
      id: 62,
      category: "Air Programs",
      section: "Table 1 to Subpart D of Part 59",
      title:
        "—Volatile Organic Compound (VOC), Content Limits for Architectural Coatings",
      keywords:
        "Paint, Volatile Organic Compound (VOC), Content Limits, Architectural Coatings, Thinned to the manufacturer's maximum recommendation, Coating Categories, Flat coatings, Nonflat coatings, Primers, Sealers, Undercoaters, Specialty coatings, Antenna coatings, Concrete protective coatings, Industrial maintenance coatings, Lacquers, Roof coatings, Rust preventative coatings, Stains, Varnishes, Wood preservatives, Grams VOC per liter, Pounds VOC per gallon, Compliance, Exempt compounds",
      link: "https://www.ecfr.gov/current/title-40/part-59/appendix-Table%201%20to%20Subpart%20D%20of%20Part%2059",
    },
    {
      id: 63,
      category: "Pesticide Programs",
      section: "§ 156.78",
      title: "Precautionary statements for physical or chemical hazards",
      keywords:
        "Bleach, Precautionary statements, Physical or Chemical Hazards, Flammability, Explosive characteristics, Flash point, Extremely flammable, Flammable, Combustible, Pressurized products, Contents under pressure, Do not puncture or incinerate container, Keep away from fire sparks and heated surfaces, Do not use or store near heat or open flame, Total release fogger, Graphic symbol, Oxidizing potential",
      link: "https://www.ecfr.gov/current/title-40/section-156.78",
    },
    {
      id: 64,
      category: "Pesticide Programs",
      section: "§ 156.85",
      title: "Non-target organisms",
      keywords:
        "Bleach, Non-target organisms, Hazard statements, Precautionary statements, Pesticide is toxic to..., Extremely toxic, Lethal dose (LD50), Lethal concentration (LC50), Aquatic applications, Pollinating insects, Contaminate water, Disposal of wastes",
      link: "https://www.ecfr.gov/current/title-40/section-156.85",
    },
    {
      id: 65,
      category: "Consumer Product Safety Act Regulations",
      section: "PART 1303",
      title:
        "Ban of Lead-Containing Paint and Certain Consumer Products Bearing Lead-Containing Paint",
      keywords:
        "Paint, Lead-containing paint, 0.009 percent, Banned hazardous products, Toys, Articles intended for use by children, Furniture articles, Consumer product, Surface-coating materials, Warning, Contains Lead. Dried Film of This Paint May Be Harmful If Eaten or Chewed",
      link: "https://www.ecfr.gov/current/title-16/part-1303",
    },
    {
      id: 66,
      category: "Federal Hazardous Substances Act Regulations",
      section: "PART 1501",
      title:
        "Method for Identifying Toys and Other Articles Intended for Use by Children Under 3 Years of Age Which Present Choking, Aspiration, or Ingestion Hazards Because of Small Parts",
      keywords:
        "River Rocks, Choking, aspiration, ingestion hazard, Small parts, Children under 3 years of age, Under 36 months, Intended for use, Manufacturer's stated intent, Advertising promotion and marketing, Commonly recognized use, Banned hazardous substance, Use and abuse tests, Impact, Torque, Tension, Compression",
      link: "https://www.ecfr.gov/current/title-16/part-1501",
    },
    {
      id: 67,
      category: "Fair Packaging and Labeling Act",
      section: "Part 500",
      title:
        "Regulations Under Section 4 of the Fair Packaging and Labeling Act",
      keywords:
        "Soda Ash, sodium carbonate, Baking Soda, sodium bicarbonate, sand, rocks, Isopropyl Alcohol, bleach, paint, Identity of the commodity, Net quantity of contents, Weight, Measure, Numerical count, Metric units, Customary units, Principal display panel, Name and place of business, Conspicuous and legible, Type size, Dual-unit, Package, Consumer commodity, Multiunit package, Variety package, Slack fill",
      link: "https://www.ecfr.gov/current/title-16/part-500",
    },
  ];

  // Get unique categories and products for filters
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(regulatoryData.map((item) => item.category)),
    ];
    return uniqueCategories.sort();
  }, []);

  const products = useMemo(() => {
    const allProducts = new Set();
    regulatoryData.forEach((item) => {
      // Extract product names from keywords
      const keywords = item.keywords.toLowerCase();
      if (keywords.includes("bleach")) allProducts.add("Bleach");
      if (keywords.includes("paint")) allProducts.add("Paint");
      if (
        keywords.includes("soda ash") ||
        keywords.includes("sodium carbonate")
      )
        allProducts.add("Sodium Carbonate");
      if (
        keywords.includes("baking soda") ||
        keywords.includes("sodium bicarbonate")
      )
        allProducts.add("Sodium bicarbonate");
      if (keywords.includes("isopropyl alcohol"))
        allProducts.add("Isopropyl Alcohol");
      if (keywords.includes("sand")) allProducts.add("Sand");
      if (keywords.includes("river rocks")) allProducts.add("River Rocks");
    });
    return Array.from(allProducts).sort();
  }, []);

  // Search and filter logic
  const filteredData = useMemo(() => {
    let filtered = regulatoryData;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by product
    if (selectedProduct !== "all") {
      filtered = filtered.filter((item) =>
        item.keywords.toLowerCase().includes(selectedProduct.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.section.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedProduct]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedProduct("all");
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <FileText className="h-10 w-10 text-indigo-600" />
            Regulatory Search Engine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search through comprehensive regulatory requirements across Federal
            Hazardous Substances Act, DOT Regulations, Pesticide Programs, Food
            Labeling, Drug Regulations, and more.
          </p>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search regulations, keywords, sections, or requirements..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category:
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Product:
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Products</option>
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Search Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-indigo-600">
                {filteredData.length}
              </span>{" "}
              of <span className="font-semibold">{regulatoryData.length}</span>{" "}
              regulations
              {searchQuery && (
                <>
                  {" "}
                  for "
                  <span className="font-medium text-gray-900">
                    {searchQuery}
                  </span>
                  "
                </>
              )}
              {(selectedCategory !== "all" || selectedProduct !== "all") && (
                <span className="text-gray-500">
                  {" "}
                  (filtered
                  {selectedCategory !== "all" &&
                    ` by category: ${selectedCategory}`}
                  {selectedCategory !== "all" &&
                    selectedProduct !== "all" &&
                    ","}
                  {selectedProduct !== "all" &&
                    ` by product: ${selectedProduct}`}
                  )
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-4">
                No regulations match your search criteria. Try adjusting your
                search terms or filters.
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-sm font-mono text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-medium">
                          {item.section}
                        </span>
                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-indigo-600 transition-colors"
                      >
                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-indigo-600 flex items-start gap-2">
                          {highlightText(item.title, searchQuery)}
                          <ExternalLink className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                        </h2>
                      </a>
                      <div className="text-sm text-gray-600">
                        <strong className="text-gray-800">Keywords:</strong>{" "}
                        <span className="leading-relaxed">
                          {highlightText(item.keywords, searchQuery)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Search across {regulatoryData.length} regulatory requirements from
            multiple agencies. Click on regulations to access the official
            sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegulatorySearchEngine;
