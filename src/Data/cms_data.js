export const initialCmsData = {
    hero: {
        heading: "Empowering Businesses with AI-Driven ERP Solutions",
        subtext: "From ZATCA-compliant ERPNext implementation to custom AI analytics, we build the digital infrastructure your business needs to scale in the GCC.",
        cta_primary: "Get Free Consultation",
        cta_secondary: "View Our Work",
        booking_url: "/contact"
    },
    services_hero: {
        heading: "AI-Powered ERP & Software Solutions for Scalable Businesses",
        subtext: "We automate operations, integrate fragmented systems, and deliver custom-built technical infrastructure that drives real-time intelligence and hyper-growth.",
        cta_primary: "Book Free Consultation",
        cta_url: "https://calendly.com/"
    },
    stats: [
        { label: "Projects Delivered", value: "120", suffix: "+" },
        { label: "Customers Worldwide", value: "60", suffix: "+" },
        { label: "Countries Served", value: "6", suffix: "+" },
        { label: "Active Users", value: "15000", suffix: "+" }
    ],
    contact: {
        whatsapp: "+966 57 352 8619",
        phone: "+966 57 352 8619",
        email: "contact@enfono.com",
    },
    client_logos: [
        { name: 'Steel Force' }, { name: 'NMCE Logistics' }, { name: 'HSM Shipping' },
        { name: 'Power Creation' }, { name: 'Badriya Sweets' }, { name: 'Logistica.sa' },
        { name: 'SRT Trading' }, { name: 'Sahara Oil & Gas' }, { name: 'Zayat Logistics' },
        { name: 'SIA Electricals' }, { name: 'Plascom Arabco' }, { name: 'NG Group' },
        { name: 'Satcon Logistics' }, { name: 'Avicen Pharma' }
    ],
    testimonials: [
        { quote: 'Before partnering with Enfono, our ERP implementation was stuck in endless delays. Their team turned it around completely — we went live ahead of schedule with full ZATCA compliance.', name: 'CFO', role: 'Saudi Logistics Company · Riyadh', initials: 'CF' },
        { quote: 'We previously operated on Odoo but struggled with customization limitations. Enfono migrated us to ERPNext with zero data loss and full Arabic support. Outstanding expertise.', name: 'Operations Head', role: 'Manufacturing Company · Dubai', initials: 'OH' },
        { quote: 'The AI analytics module gives us insights we never had before. We can now predict inventory needs 4 weeks out with over 90% accuracy. Exceptional team and project management.', name: 'IT Director', role: 'Retail Chain · Oman', initials: 'IT' },
    ],
    our_work_categories: ['Govt', 'Manufacturing', 'Logistics', 'Trading', 'Food & Beverage', 'Retail', 'Healthcare', 'Oil & Gas', 'Insurance', 'Real Estate', 'Education', 'Consulting', 'AgriTech'],
    our_work: [
        // ─── GOVT / INDIA ───────────────────────────────
        {
            id: 1,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KABCO ERP',
            subtitle: 'ERP for Kerala Agro Business Company',
            outcome: "Comprehensive ERP implementation for Kerala's state-run agri-logistics company, managing 6 government-connected agri markets with streamlined project planning, payroll, and attendance tracking.",
            bullets: ['Project Planning & HR', 'Payroll & Attendance', 'Agri-Market Coordination'],
            modules: ['ERP', 'HR', 'Agro'],
            image: '', logo: '', url: ''
        },
        {
            id: 2,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KABCO Website',
            subtitle: 'Corporate Website for Kerala Agro Business Company',
            outcome: "Developed the official corporate website for KABCO, Kerala's state-run agri-logistics firm, providing a digital presence for their government-connected market operations.",
            bullets: ['Corporate Website Development', 'Government-connected Agri Market Portal', 'Digital Presence for State Enterprise'],
            modules: ['Website'],
            image: '', logo: '', url: 'https://kabco.co.in/'
        },
        {
            id: 3,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KERA Website',
            subtitle: 'Kerala Government & World Bank Initiative',
            outcome: 'Developed and launched the official web presence for the KERA project — a flagship initiative by the Government of Kerala and World Bank focused on climate-resilient agriculture.',
            bullets: ['Government Portal Development', 'World Bank Initiative Showcase', 'Climate Resilient Agriculture Focus'],
            modules: ['Website', 'Govt'],
            image: '', logo: '', url: 'https://kera.kerala.gov.in/'
        },
        {
            id: 4,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KERA Productive Alliance Platform',
            subtitle: 'Digital Alliance for Agri-Business Ecosystem',
            outcome: 'Built the KERA Product Alliance platform to connect agri-businesses, farmers, and stakeholders under the Kerala Government & World Bank-backed KERA initiative.',
            bullets: ['Role-Based Access with MIS', 'Grant Workflows with Approvals', 'Field Verification & Audit Tracking'],
            modules: ['Custom Platform', 'Grants', 'MIS'],
            image: '', logo: '', url: ''
        },
        {
            id: 5,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KERA Climate Resilient Grant Platform',
            subtitle: 'Grant Management System under KERA Initiative',
            outcome: 'Developed the Climate Resilient Agriculture grant management platform for the Kerala Government and World Bank, enabling efficient grant disbursement, HR management, and monitoring.',
            bullets: ['Climate Resilient Grant Management', 'HR Management & Access Control', 'Multi-Portal Architecture'],
            duration: '12 months', users: '500+',
            modules: ['Grants', 'Finance', 'MIS'],
            image: '', logo: '', url: ''
        },
        {
            id: 6,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'NAWODHAN',
            subtitle: 'New Agriculture Wealth Opportunities — Driving Horticulture Agribusiness Networking',
            outcome: 'NAWODHAN is a Kerala government initiative to revitalize idle land for high-tech, commercial horticulture. A digital platform connecting landowners with farmers and investors — with over 4,700 acres registered to date.',
            bullets: ['RFP-Based Matchmaking', 'Land Inventory Structuring', 'Public-Private Allocation System'],
            modules: ['Custom Platform', 'Agri', 'Govt'],
            image: '', logo: '', url: ''
        },
        // ─── MANUFACTURING ──────────────────────────────
        {
            id: 7,
            category: 'Manufacturing',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Steel Force',
            subtitle: 'A leading steel production and retail trading company with 25 branches and over 500 employees across 7 countries.',
            outcome: 'Implemented an ERP to streamline steel production, retail trading, HR, payroll, and multi-warehouse inventory, providing operational insights and boosting efficiency.',
            bullets: ['Steel Production Management', 'Retail Trading & B2B Wholesale', 'HR, Payroll & Multi-Warehouse Management'],
            image: '', logo: '', url: ''
        },
        {
            id: 8,
            category: 'Manufacturing',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Power Creation Co',
            subtitle: "One of Saudi Arabia's top manufacturers of custom-engineered electrical panels.",
            outcome: 'Implemented a complete ERP for managing manufacturing operations from BOM and production planning to inventory, HR, and payroll. Vehicle tracking and finance modules enabled full operational visibility.',
            bullets: ['Manufacturing Management', 'Stock & Production Planning', 'HR, Finance & Vehicle Management'],
            image: '', logo: '', url: ''
        },
        {
            id: 9,
            category: 'Manufacturing',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Plascom Arabco',
            subtitle: 'A leading Saudi producer of high-performance cable compounds and polymer solutions.',
            outcome: "Delivered a dedicated finance system aligned with the company's specialized polymer manufacturing workflows — ensuring accurate cost tracking, vendor management, and streamlined financial operations.",
            bullets: ['Finance Management', 'Cost Control & Vendor Tracking', 'Manufacturing/Finance Alignment'],
            image: '', logo: '', url: ''
        },
        {
            id: 10,
            category: 'Manufacturing',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Ikon Group',
            subtitle: 'Camp & Catering management with ZATCA compliance for Saudi Arabia.',
            outcome: "Built a scalable ERP solution to manage worker camps, catering operations, logistics, trading, and payroll. Integrated with Saudi Arabia's ZATCA e-Invoicing System and enabled modular access for multiple departments.",
            bullets: ['Camp & Catering Management', 'HR, Payroll & ZATCA Compliance', 'Trading ERP'],
            image: '', logo: '', url: ''
        },
        // ─── LOGISTICS ──────────────────────────────────
        {
            id: 11,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'NMCE Logistics',
            subtitle: "One of Saudi Arabia's foremost logistics firms, trusted for fleet and driver operations at scale.",
            outcome: 'Implemented a unified system for managing fleet operations, trip logs, and payroll — integrating HR and finance for real-time logistics visibility.',
            bullets: ['Vehicle & Driver Management', 'Trip & Fuel Logs', 'Payroll Integration'],
            image: '', logo: '', url: ''
        },
        {
            id: 12,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Zayat Logistics',
            subtitle: 'A regional logistics leader known for precision fleet control and real-time job tracking.',
            outcome: 'Deployed a logistics platform for job tracking, fleet oversight, and driver performance — improving transparency and operational control.',
            bullets: ['Logistics & Job Tracking System', 'Driver Management', 'Fleet Oversight & Operations Visibility'],
            image: '', logo: '', url: ''
        },
        {
            id: 13,
            category: 'Logistics',
            country: 'Qatar',
            flag: '🇶🇦',
            title: 'Harbour Shipping & Marine',
            subtitle: "Qatar's most trusted name in marine freight and consignment logistics across multinational operations.",
            outcome: 'Delivered a complete freight and consignment tracking system with job-wise tracking and finance integration for multi-national operations.',
            bullets: ['Freight & Job Management System', 'Consignment Tracking & Cargo Finance', 'Multi-Company ERP', 'Finance & HR Integration'],
            image: '', logo: '', url: ''
        },
        {
            id: 14,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Fasty Logistics',
            subtitle: 'Land Transportation and Driver Management.',
            outcome: 'Implemented an ERP to streamline HR, driver association with vehicles, and automate all related payments for improved operational efficiency.',
            bullets: ['Land Transportation Management', 'Detailed HR & Driver Management', 'Payment Automation'],
            image: '', logo: '', url: ''
        },
        {
            id: 15,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Projecta Logistics',
            subtitle: 'End-to-end logistics ERP with bilingual interface.',
            outcome: 'Deployed a comprehensive logistics ERP covering job tracking, service workflow, equipment movement, and invoicing — with a bilingual (Arabic-English) interface.',
            bullets: ['Job Tracking & Logistics ERP', 'Service Workflow & Invoicing', 'Equipment Movement Tracking', 'Bilingual Interface'],
            image: '', logo: '', url: ''
        },
        {
            id: 16,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Elco Group',
            subtitle: 'Multi-regional transportation operations across KSA and UAE.',
            outcome: 'Delivered a complete multi-regional transportation ERP covering land, sea, and air logistics, driver management, and full finance integration across KSA and UAE operations.',
            bullets: ['Land, Sea & Air Transportation', 'Driver Management System', 'Multi-Regional Operations (KSA & UAE)', 'Complete Transportation & Logistics Solutions'],
            image: '', logo: '', url: ''
        },
        {
            id: 17,
            category: 'Logistics',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Amaala Global',
            subtitle: 'Transportation company covering land, sea, and air operations.',
            outcome: 'Implemented an ERP covering logistics operations across land, sea, and air transport — with vehicle maintenance and complete finance management.',
            bullets: ['Land, Sea & Air Transportation', 'Vehicle Maintenance', 'Complete Finance Management'],
            image: '', logo: '', url: ''
        },
        // ─── TRADING ────────────────────────────────────
        {
            id: 18,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'SRT Trading & Co',
            subtitle: 'ZATCA & VAT Compliant Trading Operations',
            outcome: 'Delivered a comprehensive ERP system including ZATCA e-invoicing, financial dashboards, and role-based access.',
            bullets: ['Sales, Procurement & Inventory', 'Trading Operations ERP', 'ZATCA & VAT Compliance Integration'],
            image: '', logo: '', url: ''
        },
        {
            id: 19,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Aqrar Corner Trading',
            subtitle: 'A retail business with 5 branches offering comprehensive trading and finance solutions.',
            outcome: 'Implemented an ERP to manage trading workflows, inventory, and financial operations across all branches.',
            bullets: ['Complete Trading Modules', 'Finance & Inventory Management'],
            image: '', logo: '', url: ''
        },
        {
            id: 20,
            category: 'Trading',
            country: 'Qatar',
            flag: '🇶🇦',
            title: 'Katch Trading Company',
            subtitle: 'Parent company of premium consumer brands: Flevar, Di Vie, Chelsea, Camila and more.',
            outcome: 'Implemented an ERP to manage sales, inventory, and financial operations across multiple retail brands and branches, with centralized multi-branch finance control.',
            bullets: ['Sales & Inventory', 'Multi-Branch Finance Control', 'Retail Operations'],
            image: '', logo: '', url: ''
        },
        {
            id: 21,
            category: 'Trading',
            country: 'Oman',
            flag: '🇴🇲',
            title: 'SIA Industries',
            subtitle: 'A diversified Omani group spanning logistics, trading, and food operations.',
            outcome: 'Deployed a modular ERP solution enabling SIA to independently manage trading and logistics verticals while maintaining group-level control and reporting.',
            bullets: ['Transport & Warehouse', 'HR & Finance', 'Multi-Vertical ERP'],
            image: '', logo: '', url: ''
        },
        {
            id: 22,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Nisnas Group',
            subtitle: 'Retail and distribution ERP across multiple branches.',
            outcome: 'Implemented a Retail & Distribution ERP with POS, registration management, and centralized multi-branch sales and finance reporting.',
            bullets: ['Retail & Distribution ERP', 'POS & Registration', 'Multi-Branch Sales & Finance'],
            image: '', logo: '', url: ''
        },
        {
            id: 23,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Hatco Trading',
            subtitle: 'Building materials trading with B2B operations.',
            outcome: 'Implemented a trading ERP for building materials with customized POS, B2B trading workflows, and daily collection reporting.',
            bullets: ['B2B Trading — Building Materials', 'Daily Collection Report', 'Customised Point of Sale Interface'],
            image: '', logo: '', url: ''
        },
        {
            id: 24,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Ruqn Al Mashreq',
            subtitle: 'Wholesale B2B trading company managing multiple companies and entities.',
            outcome: 'Implemented a multi-company ERP to manage wholesale B2B trading operations, multiple entities, HR, and payroll under a unified platform.',
            bullets: ['Wholesale B2B Trading', 'Multi-Company Management', 'HR & Payroll'],
            image: '', logo: '', url: ''
        },
        {
            id: 25,
            category: 'Trading',
            country: 'India',
            flag: '🇮🇳',
            title: 'Universal Electric House',
            subtitle: 'Retail trading with centralized POS and finance management.',
            outcome: 'Implemented a retail trading ERP with multi-user POS interface and integrated finance management module for seamless operations.',
            bullets: ['Retail Trading', 'POS Interface with Multi-User', 'Finance Management Module'],
            image: '', logo: '', url: ''
        },
        {
            id: 26,
            category: 'Trading',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Rmax Group',
            subtitle: 'Retail trading operations across 30 branches spanning 6 companies.',
            outcome: 'Implemented a multi-company ERP to streamline retail trading, inventory, and financial control across 30 branches and 6 companies.',
            bullets: ['Retail Trading', 'Multi-Company & Branch Management', '30 Branches across 6 Companies'],
            image: '', logo: '', url: ''
        },
        // ─── FOOD & BEVERAGE ────────────────────────────
        {
            id: 27,
            category: 'Food & Beverage',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Badriya Sweets',
            subtitle: 'A leading sweets manufacturer specializing in retail and wholesale operations.',
            outcome: 'Implemented an ERP system to streamline operations across sales, HR, payroll, and production processes.',
            bullets: ['Retail Billing & POS', 'VAN Sales', 'HR & Payroll Management', 'Production Management'],
            image: '', logo: '', url: ''
        },
        {
            id: 28,
            category: 'Food & Beverage',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Al Tabia Bakery',
            subtitle: 'A retail-focused bakery managing in-house production and B2B trade operations.',
            outcome: 'Implemented an ERP to manage POS sales, manufacturing, expiry tracking, HR, payroll, and B2B trading operations efficiently.',
            bullets: ['Retail POS', 'Manufacturing & Expiry Management', 'HR & Payroll', 'B2B Trading'],
            image: '', logo: '', url: ''
        },
        // ─── RETAIL ─────────────────────────────────────
        {
            id: 29,
            category: 'Retail',
            country: 'Oman',
            flag: '🇴🇲',
            title: 'MEF — Middle East Furniture',
            subtitle: "One of Oman's top furniture retailers with 6+ connected branches.",
            outcome: 'Delivered a centralized order and inventory system to manage multi-branch operations with unified tracking and fulfillment across all locations.',
            bullets: ['Internal Order Management', 'Inventory & Finance', 'Branch-Wise Operations'],
            image: '', logo: '', url: ''
        },
        // ─── OIL & GAS ──────────────────────────────────
        {
            id: 30,
            category: 'Oil & Gas',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Sahara Oil and Gas',
            subtitle: 'Multi-currency compliance and trading operations for the energy sector.',
            outcome: 'Implemented a scalable ERP for managing trading workflows, multi-currency transactions, credit control, and sector-specific reporting.',
            bullets: ['Oil & Gas Trading ERP', 'Inventory, Finance & Vendor Management', 'Multi-Currency & Compliance Reporting'],
            image: '', logo: '', url: ''
        },
        // ─── HEALTHCARE ─────────────────────────────────
        {
            id: 31,
            category: 'Healthcare',
            country: 'Oman',
            flag: '🇴🇲',
            title: 'Avicen Pharma',
            subtitle: "Oman's second-largest pharma network operating 50+ branches.",
            outcome: "Implemented a dedicated HR system for Avicen Pharma's extensive branch network — with employee role structuring, shift & roster management, multi-shift support, role-based permissions, and centralized payroll control.",
            bullets: ['Shift & Roster Management', 'Employee Role Structuring', 'Payroll Automation'],
            image: '', logo: '', url: ''
        },
        // ─── INSURANCE ──────────────────────────────────
        {
            id: 32,
            category: 'Insurance',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Marina Insurance',
            subtitle: "One of Saudi Arabia's leading insurance brokers specializing in custody, policy, and financial management.",
            outcome: 'Implemented a comprehensive insurance management ERP covering core finance, policy ledger, brokerage operations, and regulatory reporting.',
            bullets: ['Core Finance', 'Policy Ledger & Brokerage', 'Regulatory Reporting'],
            image: '', logo: '', url: ''
        },
        // ─── REAL ESTATE ────────────────────────────────
        {
            id: 33,
            category: 'Real Estate',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Al Adrak',
            subtitle: 'Real estate and contracting company with headquarters in KSA and operations in multiple regions.',
            outcome: 'Implemented an ERP with ZATCA compliance, invoicing, and financial management to handle real estate and contracting operations across multiple regions.',
            bullets: ['Invoicing & ZATCA Compliance', 'Finance Management'],
            image: '', logo: '', url: ''
        },
        // ─── EDUCATION ──────────────────────────────────
        {
            id: 34,
            category: 'Education',
            country: 'Saudi Arabia',
            flag: '🇸🇦',
            title: 'Ocom',
            subtitle: 'Frappe-based learning management platform for commerce coaching and education.',
            outcome: 'Built a Frappe-based platform to manage learning content, student enrollments, courses, admissions, catering, exams, payments, and performance tracking — with a mobile-friendly dashboard and customizable learning modules.',
            bullets: ['Learning Content & Student Management', 'Admissions & Payment', 'Role-Based Access & Scheduling'],
            image: '', logo: '', url: ''
        },
        // ─── CONSULTING ─────────────────────────────────
        {
            id: 35,
            category: 'Consulting',
            country: 'Qatar',
            flag: '🇶🇦',
            title: 'Chalaroste',
            subtitle: 'A leading Qatar-based consulting company.',
            outcome: 'Implemented a comprehensive ERP for project and task management, CRM, sales, and finance workflows — tailored for a professional consulting environment.',
            bullets: ['Project & Task Management', 'Sales, CRM & Finance Workflow', 'Accounting'],
            image: '', logo: '', url: ''
        },
        // ─── AGRITECH ───────────────────────────────────
        {
            id: 36,
            category: 'AgriTech',
            country: 'India',
            flag: '🇮🇳',
            title: 'Deepflow',
            subtitle: 'An emerging climate-tech startup innovating in agricultural sustainability.',
            outcome: 'Implemented HR, payroll, project tracking, sales, and accounting modules for this climate-tech startup, enabling streamlined operations as they scale.',
            bullets: ['HR & Payroll', 'Project Tracking', 'Sales & Accounting'],
            image: '', logo: '', url: ''
        }
    ],
    media_events: [
        {
            title: 'We Presented at Frappeverse 2025',
            date: '12 SEP',
            desc: 'Our team showcased the power of AI-driven ERPNext implementations and business process optimization to a global audience.',
            image: '/assets/img/Frappeverse-1.jpg',
            tags: [
                { text: 'Global Tech Expo', icon: 'fas fa-map-marker-alt' },
                { text: 'Frappeverse', icon: 'fas fa-tag' }
            ],
            buttons: [
                { label: 'Watch Stream', url: 'https://youtu.be/eMNhqHINfsI', type: 'youtube' },
                { label: 'View Gallery', url: 'https://instagram.com/...', type: 'instagram' }
            ]
        },
        {
            title: 'Media One Future Summit — Jeddah',
            date: '24 FEB',
            desc: 'Discussing the future of enterprise technology, AI-driven digital transformation, and scalable ERP strategies for Saudi Arabia.',
            image: '/assets/img/futuresummit-1.jpeg',
            tags: [
                { text: 'Jeddah, KSA', icon: 'fas fa-map-marker-alt' },
                { text: 'Summit', icon: 'fas fa-tag' }
            ],
            buttons: [
                { label: 'View Stories', url: 'https://instagram.com/...', type: 'instagram' }
            ]
        },
        {
            title: 'Launching of KERA',
            date: '02 MAR',
            desc: 'A Government of Kerala & World Bank initiative. Official launch ceremony highlighting climate-resilient agriculture programs.',
            image: '/assets/img/kera-1.png',
            tags: [
                { text: 'Kerala, India', icon: 'fas fa-map-marker-alt' },
                { text: 'Govt. Launch', icon: 'fas fa-tag' }
            ],
            buttons: [
                { label: 'Gallery Available Soon', url: '#', type: 'disabled' }
            ]
        }
    ]
};
