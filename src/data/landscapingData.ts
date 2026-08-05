import { ServiceItem, BeforeAfterProject, FloridaCity, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'landscape_design',
    title: '3D Landscape Design',
    subtitle: 'Master Planning & Photorealistic 3D Renders',
    iconName: 'Compass',
    description: 'Transform your vision into photorealistic 3D virtual walkthroughs before breaking ground. Our landscape architects curate plant palettes engineered for Florida microclimates.',
    features: [
      'Full 3D Virtual Estate Walkthroughs',
      'Florida-Friendly Native Plant Selection',
      'Sun & Shade Exposure Micro-Zone Mapping',
      'Architectural Layout & Elevation Drawings'
    ],
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular',
    startingPrice: 'From $1,499'
  },
  {
    id: 'lawn_maintenance',
    title: 'Luxury Lawn Maintenance',
    subtitle: 'Precision Turf Care & Bio-Nutrition',
    iconName: 'Scissors',
    description: 'White-glove groundskeeping tailored for high-end residential estates, golf properties, and HOA developments across Florida.',
    features: [
      'Precision Razor Mowing & Edging',
      'Custom Bio-Nutrient Fertilization',
      'Fungi & Pest Defense Shielding',
      'Core Aeration & Soil pH Optimization'
    ],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=1200&q=80',
    badge: 'Weekly Care',
    startingPrice: 'From $299/mo'
  },
  {
    id: 'irrigation',
    title: 'Smart Irrigation Systems',
    subtitle: 'Wi-Fi Weather Hydration & Micro-Drip',
    iconName: 'Droplets',
    description: 'Automated hydration systems with satellite weather sensing, reducing water usage by up to 40% while preserving tropical flora vitality.',
    features: [
      'Wi-Fi Smart Weather-Based Controllers',
      'Root-Zone Micro Drip Irrigation',
      'Backflow Prevention & Monthly Audits',
      'Rain & Solar Radiation Sensors'
    ],
    image: 'https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Eco Smart',
    startingPrice: 'From $1,250'
  },
  {
    id: 'tree_care',
    title: 'Tree & Palm Care',
    subtitle: 'Exotic Specimen Care & Hurricane Prep',
    iconName: 'Trees',
    description: 'Specialized arboriculture for Florida specimen palms (Royal, Bismarck, Foxtail, Date Palms). Includes certified hurricane trimming and root deep-feeding.',
    features: [
      'Certified Arborist Palm Sculpting',
      'Pre-Hurricane Canopy Wind-Relief',
      'Micro-Nutrient Trunk Injection',
      'Exotic Specimen Tree Relocation'
    ],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Arborist Lead',
    startingPrice: 'From $450'
  },
  {
    id: 'hardscaping',
    title: 'Hardscaping & Living',
    subtitle: 'Travertine Pavers, Fire Pits & Pergolas',
    iconName: 'Layers',
    description: 'Architectural outdoor living spaces featuring imported travertine, custom fire features, stone outdoor kitchens, and modern louvred pergolas.',
    features: [
      'Natural Florida Travertine & Marble',
      'Custom Fire Tables & Seating Walls',
      'Chef-Grade Outdoor Kitchen Islands',
      'Retaining Walls & Pool Deck Masonry'
    ],
    image: '/src/assets/images/before_after_patio_1785970436500.jpg',
    badge: 'High Value',
    startingPrice: 'From $4,900'
  },
  {
    id: 'lighting',
    title: 'Architectural Night Lighting',
    subtitle: '2700K Low Voltage LED Landscape Glow',
    iconName: 'Lightbulb',
    description: 'Illuminate your estate after dark with warm low-voltage LED fixtures. Highlight palm canopies, stone columns, pathways, and water elements.',
    features: [
      'Solid Brass Weatherproof Fixtures',
      'Smart App Zone Dimming & Color Sync',
      'Tree Canopy & Wall Wash Uplighting',
      'Submerged Aquatic Pool & Waterfall LEDs'
    ],
    image: '/src/assets/images/florida_luxury_estate_1785970426738.jpg',
    badge: 'Night Magic',
    startingPrice: 'From $1,800'
  },
  {
    id: 'sod',
    title: 'Premium Sod Installation',
    subtitle: 'Zoysia & St. Augustine Turf Replacement',
    iconName: 'Sparkles',
    description: 'Instant lush green lawn transformation. Soil excavation, grading, organic compost enrichment, and fresh farm-direct sod installation.',
    features: [
      'Empire Zoysia & Floratam St. Augustine',
      'Laser Soil Leveling & Drainage Prep',
      'Organic Soil Conditioning Treatment',
      '30-Day Root Establishment Warranty'
    ],
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    badge: 'Instant Lawn',
    startingPrice: 'From $1.85/sqft'
  },
  {
    id: 'commercial',
    title: 'Commercial & HOA Landscaping',
    subtitle: 'Resort Grounds & Master Community Care',
    iconName: 'Building2',
    description: 'Comprehensive property management for luxury resorts, shopping centers, corporate campuses, and master-planned HOA communities across Florida.',
    features: [
      'Dedicated On-Site Grounds Directors',
      'Seasonal Botanical Color Rotations',
      'Irrigation Compliance & Water Reports',
      'Rapid Post-Storm Cleanup Response'
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Commercial',
    startingPrice: 'Custom Bids'
  }
];

export const BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: 'palm_beach_resort',
    title: 'Palm Beach Waterfront Oasis',
    location: 'Palm Beach, FL',
    category: 'estates',
    beforeImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/src/assets/images/florida_luxury_estate_1785970426738.jpg',
    description: 'Transformed an overgrown waterfront plot into a resort-style estate with mature Royal Palms, travertine pool deck, custom low-voltage lighting, and Empire Zoysia turf.',
    stats: [
      { label: 'Property Size', value: '1.4 Acres' },
      { label: 'Project Scope', value: '3D Design, Hardscape, Palms, Lighting' },
      { label: 'Timeline', value: '3 Weeks' }
    ]
  },
  {
    id: 'naples_patio_firepit',
    title: 'Naples Coastal Living Courtyard',
    location: 'Naples, FL',
    category: 'hardscaping',
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/src/assets/images/before_after_patio_1785970436500.jpg',
    description: 'Replaced cracked concrete slab with French pattern ivory travertine pavers, custom gas fire pit, outdoor summer kitchen, and surrounding privacy Clusia hedges.',
    stats: [
      { label: 'Hardscape Area', value: '2,800 SqFt' },
      { label: 'Materials Used', value: 'Select Ivory Travertine' },
      { label: 'Value Added', value: '+18% Property Value' }
    ]
  },
  {
    id: 'coral_gables_estate',
    title: 'Coral Gables Mediterranean Estate',
    location: 'Coral Gables, FL',
    category: 'lighting',
    beforeImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Full architectural lighting installation highlighting historic archways, specimen Bismarck palms, water fountains, and smart Wi-Fi zone dimming.',
    stats: [
      { label: 'Fixtures Installed', value: '48 Brass LEDs' },
      { label: 'Energy Save', value: '82% Lower Draw' },
      { label: 'Control', value: 'Smart App Sync' }
    ]
  },
  {
    id: 'sarasota_commercial',
    title: 'Sarasota Luxury Marina Resort',
    location: 'Sarasota, FL',
    category: 'commercial',
    beforeImage: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Complete commercial grounds renovation for a 120-unit luxury condo marina. Includes automated smart irrigation, seasonal tropical color, and palm canopy maintenance.',
    stats: [
      { label: 'Resort Footprint', value: '4.5 Acres' },
      { label: 'Irrigation Efficiency', value: '38% Water Savings' },
      { label: 'Resident Rating', value: '100% Approval' }
    ]
  }
];

export const FLORIDA_CITIES: FloridaCity[] = [
  {
    id: 'palm-beach',
    name: 'Palm Beach & Jupiter',
    region: 'Gold Coast',
    tagline: 'Ultra-Luxury Coastal Estates & Golf Communities',
    xPercent: 78,
    yPercent: 68,
    completedProjects: 420,
    soilType: 'Sandy Coastal Loam with High Organic Content',
    recommendedPalms: ['Royal Palm', 'Bismarck Palm', 'Coconut Palm']
  },
  {
    id: 'miami',
    name: 'Miami & Coral Gables',
    region: 'South Florida',
    tagline: 'Modern Tropical Architecture & High-End Hardscaping',
    xPercent: 76,
    yPercent: 88,
    completedProjects: 650,
    soilType: 'Oolitic Limestone Base & Coastal Sand',
    recommendedPalms: ['Foxtail Palm', 'Adonidia Palm', 'Areca Palm']
  },
  {
    id: 'fort-lauderdale',
    name: 'Fort Lauderdale & Boca Raton',
    region: 'South East',
    tagline: 'Waterfront Mansions & Smart Drip Irrigation',
    xPercent: 77,
    yPercent: 78,
    completedProjects: 380,
    soilType: 'Moist Sandy Loam & Canal Bed Enrichments',
    recommendedPalms: ['Royal Palm', 'Montgomery Palm', 'Triangle Palm']
  },
  {
    id: 'naples',
    name: 'Naples & Marco Island',
    region: 'Paradise Coast',
    tagline: 'Resort Living, Travertine Patios & Architectural Glow',
    xPercent: 48,
    yPercent: 86,
    completedProjects: 410,
    soilType: 'Well-Drained Calcareous Sand',
    recommendedPalms: ['Sylvester Date Palm', 'Royal Palm', 'Foxtail Palm']
  },
  {
    id: 'sarasota',
    name: 'Sarasota & Bradenton',
    region: 'Cultural Coast',
    tagline: 'Botanical Sanctuary Gardens & Modern Outdoor Kitchens',
    xPercent: 42,
    yPercent: 68,
    completedProjects: 290,
    soilType: 'Fine Sandy Loam & Shell Marls',
    recommendedPalms: ['Bismarck Palm', 'Sabal Palm', 'Robellini']
  },
  {
    id: 'tampa',
    name: 'Tampa Bay & St. Petersburg',
    region: 'Tampa Bay Region',
    tagline: 'Lush Turf Solutions, Zoysia Sod & HOA Excellence',
    xPercent: 45,
    yPercent: 55,
    completedProjects: 340,
    soilType: 'Acidic Flatwood Sand & Clay Blends',
    recommendedPalms: ['Windmill Palm', 'Sabal Palm', 'Pindo Palm']
  },
  {
    id: 'orlando',
    name: 'Orlando & Winter Park',
    region: 'Central Florida',
    tagline: 'Lakeside Estates, Custom Pergolas & Hardscapes',
    xPercent: 62,
    yPercent: 45,
    completedProjects: 210,
    soilType: 'Deep Sand Ridge & Lake Sediment Clay',
    recommendedPalms: ['Washingtonia Palm', 'Sabal Palm', 'Sylvester Date']
  },
  {
    id: 'jacksonville',
    name: 'Jacksonville & St. Augustine',
    region: 'First Coast',
    tagline: 'Coastal Cold-Hardy Palms & Classic Stonework',
    xPercent: 70,
    yPercent: 18,
    completedProjects: 180,
    soilType: 'Heavy Sandy Clay & Marsh Edge Loam',
    recommendedPalms: ['Sabal Palm', 'European Fan Palm', 'Windmill Palm']
  },
  {
    id: 'key-west',
    name: 'Key West & Florida Keys',
    region: 'The Keys',
    tagline: 'Exotic Tropical Flora & Hurricane-Resistant Grounds',
    xPercent: 62,
    yPercent: 96,
    completedProjects: 95,
    soilType: 'Coral Rock & Calcareous Shell Marl',
    recommendedPalms: ['Key Thatch Palm', 'Royal Palm', 'Coconut Palm']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Harrison Sterling',
    role: 'Estate Owner',
    location: 'Palm Beach, FL',
    rating: 5,
    comment: 'Verdant Coast transformed our 2-acre oceanfront property into an absolute paradise. The 3D virtual design preview was spot-on, and their night lighting system makes the estate look like a 5-star St. Regis resort at night!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectType: 'Full Estate 3D Renovation'
  },
  {
    id: 't2',
    name: 'Victoria Vance',
    role: 'Luxury Property Developer',
    location: 'Naples, FL',
    rating: 5,
    comment: 'As a luxury builder in Naples, timing and precision are everything. Verdant Coast handles all our travertine pool decks, specimen palm installations, and smart drip irrigation on budget every single time.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectType: 'Hardscape & Pool Deck'
  },
  {
    id: 't3',
    name: 'Dr. Arthur Mitchell',
    role: 'Homeowner',
    location: 'Coral Gables, FL',
    rating: 5,
    comment: 'Their arborists replaced our diseased turf with lush Empire Zoysia and installed an array of Bismarck Palms. Their team was professional, clean, and extremely knowledgeable about Florida soil conditions.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectType: 'Zoysia Sod & Specimen Palms'
  },
  {
    id: 't4',
    name: 'Evelyn Montgomery',
    role: 'HOA President',
    location: 'Sarasota, FL',
    rating: 5,
    comment: 'We hired Verdant Coast for our 140-home gated community. Our water bill dropped by 34% after they upgraded our irrigation system, and the community entry landscaping receives daily compliments from residents.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    projectType: 'HOA Master Landscaping'
  }
];

export const STATS_DATA = [
  { value: '18+', label: 'Years of Florida Excellence', description: 'Mastering tropical soil & coastal climate' },
  { value: '2,400+', label: 'Luxury Estates Transformed', description: 'Across Gold Coast & Paradise Coast' },
  { value: '99.4%', label: 'Client Satisfaction Rate', description: '5-Star reviews & repeat estate care' },
  { value: '12', label: 'Florida Regions Served', description: 'From Jacksonville down to Key West' }
];

export const WHY_CHOOSE_US_DATA = [
  {
    icon: 'ShieldCheck',
    title: 'Licensed & Fully Insured',
    description: 'State Certified Florida Residential & Commercial Landscaping Contractor ($5M Comprehensive Liability).'
  },
  {
    icon: 'Palmtree',
    title: 'Florida Landscaping Experts',
    description: 'Deep mastery of salt-tolerant specimen flora, hurricane wind-relief pruning, and native soil conditioning.'
  },
  {
    icon: 'Clock',
    title: 'Rapid 2-Hour Response',
    description: 'Same-day on-site consultation scheduling and fast 24-hour itemized 3D design proposals.'
  },
  {
    icon: 'DollarSign',
    title: 'Transparent & Itemized Pricing',
    description: 'Detailed scope-of-work breakdowns with zero hidden fees. 100% price certainty guarantees.'
  },
  {
    icon: 'Award',
    title: 'Premium Nursery Materials',
    description: 'Direct sourcing from top Florida certified nurseries and natural Italian & Florida stone quarries.'
  },
  {
    icon: 'Smile',
    title: '100% Satisfaction Warranty',
    description: 'Backing every palm, plant, and travertine hardscape with a full 1-Year Workmanship & Plant Health Guarantee.'
  }
];
