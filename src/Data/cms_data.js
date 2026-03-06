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
            category: 'GOVT. & WORLD BANK',
            country: 'KERALA',
            flag: '',
            title: 'KERA Grant Portal',
            subtitle: 'Climate resilient grant portal for Govt of Kerala and World Bank. Includes the KERA Product Alliance portal and NAWODHA portal for the agriculture department.',
            outcome: 'Multi-portal architecture',
            metric: 'Multi-portal architecture',
            bullets: [],
            modules: ['MIS', 'Grants', 'Govt'],
            image: '', logo: '', url: '',
            icon: 'fas fa-leaf'
        },
        {
            id: 2,
            category: 'AGRO BUSINESS',
            country: 'KERALA',
            flag: '',
            title: 'KABCO ERP & Website',
            subtitle: 'Kerala Agro Business Company — comprehensive ERP implementation and corporate website development to streamline agro businesses.',
            outcome: 'Unified digital operations',
            metric: 'Unified digital operations',
            bullets: [],
            modules: ['ERP', 'Website', 'Agro'],
            image: '', logo: '', url: 'https://kabco.co.in/',
            icon: 'fas fa-tractor'
        },
        {
            id: 122, // Using a high ID to avoid conflict or just updating existing
            category: 'STEEL & MANUFACTURING',
            country: 'KSA',
            flag: '',
            title: 'Steel Force — 25 Branches Unified',
            subtitle: 'Deployed ERP across 25 branches and 500+ employees to manage steel production and retail trading operations seamlessly.',
            outcome: '25 branches connected',
            metric: '25 branches connected',
            bullets: [],
            modules: ['ERP', 'Manufacturing', 'Logistics'],
            image: '', logo: '', url: '',
            icon: 'fas fa-industry'
        },
        {
            id: 3,
            category: 'Govt',
            country: 'India',
            flag: '🇮🇳',
            title: 'KERA Website',
            subtitle: 'Kerala Government & World Bank Initiative',
            outcome: 'Developed and launched the official web presence for the KERA project — a flagship initiative by the Government of Kerala and World Bank focused on climate-resilient agriculture.',
            metric: 'State flagship initiative',
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
            metric: 'Multi-portal architecture',
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
            metric: 'Grant management platform',
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
            metric: '4,700 acres registered',
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
            metric: '25 branches connected',
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
            metric: 'Operations maximized',
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
            metric: 'Polymer workflows automated',
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
            metric: 'ZATCA compliant operations',
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
            metric: 'Fleet operations unified',
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
            metric: 'Job tracking centralized',
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
            metric: 'Global freight tracked',
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
            metric: 'Payments fully automated',
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
            metric: 'Bilingual logistics ERP',
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
            metric: 'Multi-regional logistics',
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
            metric: 'Land, sea & air tracked',
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
            metric: 'Trading workflows digitized',
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
            metric: 'Multi-branch finance synced',
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
            metric: 'Retail sales unified',
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
            metric: 'Group-level controls set',
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
            metric: 'Retail POS fully integrated',
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
            metric: 'B2B trading modernized',
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
            metric: 'Wholesale ops streamlined',
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
            metric: 'Retail finance simplified',
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
            metric: '30 branches connected',
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
            metric: 'Production processes synced',
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
            metric: 'Expiry tracking automated',
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
            metric: 'Multi-branch fulfillment',
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
            metric: 'Multi-currency managed',
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
            metric: 'Multi-shift HR managed',
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
            metric: 'Policy ledger modernized',
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
            metric: 'Real estate ops synced',
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
            metric: 'Education platform scaled',
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
            metric: 'Consulting workflows digitized',
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
            metric: 'Startup ops streamlined',
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
    ],
    blogs: [
        {
            id: 1,
            slug: 'how-ai-is-transforming-erp-gcc',
            title: 'How AI is Transforming ERP in the GCC',
            category: 'AI & ERP',
            tags: ['Artificial Intelligence', 'ERPNext', 'GCC', 'Digital Transformation'],
            read_time: '6 min read',
            date: 'March 4, 2026',
            featured: true,
            excerpt: 'Across the Gulf Cooperation Council, a quiet revolution is unfolding in boardrooms and warehouses alike. AI is no longer a futuristic concept — it is actively reshaping how businesses run their ERPs.',
            cover_image: '/assets/img/ai in saudi.png',
            content: `<h2>The AI Shift in Enterprise Operations</h2>
<p>For decades, ERP systems have served as the operational backbone of enterprises across manufacturing, logistics, trading, and services. But the traditional ERP — rule-based, static, reactive — is giving way to something fundamentally smarter. Across the Gulf Cooperation Council, a quiet revolution is unfolding in boardrooms and warehouses alike.</p>

<p>AI is no longer a futuristic concept reserved for Silicon Valley startups. It is actively reshaping how businesses in Saudi Arabia, UAE, Kuwait, and Oman run their ERPs, predict demand, and manage their workforce.</p>

<h2>What Does "AI in ERP" Actually Mean?</h2>
<p>When we say AI-integrated ERP, we mean three core capabilities:</p>
<ul>
<li><strong>Predictive Analytics:</strong> Instead of reporting what happened, the system forecasts what will happen — inventory stockouts, cash flow crunches, customer churn.</li>
<li><strong>Intelligent Automation:</strong> Routine processes like purchase order generation, invoice matching, and payroll calculations run autonomously, without human triggers.</li>
<li><strong>Natural Language Interfaces:</strong> Business users can query their ERP data conversationally. "Show me top-selling SKUs in Q1" becomes a real-time dashboard answer.</li>
</ul>

<h2>Why GCC Businesses are Accelerating</h2>
<p>The GCC's Vision 2030 agendas — particularly Saudi Arabia's — have created a policy environment actively pushing digital transformation. ZATCA mandates, e-invoicing phases, and smart government initiatives mean businesses must digitize or risk compliance penalties.</p>

<p>ERP platforms like ERPNext, when augmented with AI layers, provide an ideal foundation. They are open-source, highly customizable, and can ingest data from multiple operational silos — HR, finance, procurement, logistics — into a unified intelligence layer.</p>

<h2>Real-World Impact</h2>
<p>A logistics company we work with in Riyadh reduced their inventory reconciliation time from 4 hours daily to under 20 minutes after deploying an AI-assisted matching module on ERPNext. A manufacturing firm cut material waste by 18% in a single quarter using demand-driven production scheduling.</p>

<p>These are not edge cases. They are the new baseline for what modern ERP should deliver.</p>

<h2>The Road Ahead</h2>
<p>The next phase of AI in GCC ERPs will involve large language model interfaces, autonomous financial close processes, and proactive compliance engines that flag ZATCA discrepancies before they become violations. Enfono is building at this frontier — integrating AI layers directly into ERPNext workflows for our GCC clients.</p>

<p>If you are evaluating your ERP strategy for 2026 and beyond, the question is no longer whether to adopt AI. It is how quickly you can make it work for your business.</p>`
        },
        {
            id: 2,
            slug: 'erpnext-vs-odoo-gcc-business-guide',
            title: 'ERPNext vs Odoo: The GCC Business Decision Guide',
            category: 'ERP',
            tags: ['ERPNext', 'Odoo', 'ERP Comparison', 'GCC'],
            read_time: '7 min read',
            date: 'March 6, 2026',
            featured: false,
            excerpt: 'Choosing between ERPNext and Odoo is a critical decision for GCC businesses. This comparison breaks down their strengths, costs, and regional compliance factors to help you choose the right fit.',
            cover_image: '/assets/img/odoovserpnext.png',
            content: `<h2>Navigating the ERP Choice: ERPNext vs. Odoo</h2>
<p>For mid-market businesses in the GCC, the ERP selection process often boils down to two heavyweights: <strong>ERPNext</strong> and <strong>Odoo</strong>. Both offer powerful, modern, and flexible frameworks, but their philosophies on cost, customization, and modularity differ significantly.</p>

<p>This guide provides a head-to-head comparison based on real-world implementations in Saudi Arabia, UAE, and the wider region.</p>

<h2>Odoo: The Modular Powerhouse</h2>
<p>Odoo is renowned for its "app-store" model. It offers thousands of narrow, highly-polished modules that can be added as your business grows. Its strength lies in its user interface and the sheer breadth of its ecosystem.</p>

<h3>The Pros of Odoo:</h3>
<ul>
<li><strong>Extensive Feature Set:</strong> From e-commerce and POS to advanced manufacturing and CRM, Odoo has an app for almost everything.</li>
<li><strong>Superior UI:</strong> Often considered more intuitive and "modern-looking" out of the box.</li>
<li><strong>Highly Modular:</strong> Start small with just CRM or Accounting and add more as you scale.</li>
</ul>

<h3>The Challenges:</h3>
<ul>
<li><strong>Escalating Costs:</strong> While the Community edition is free, most businesses require the Enterprise edition. Costs can escalate quickly with per-user, per-app, and hosting fees.</li>
<li><strong>Implementation Complexity:</strong> Because it is so modular, ensuring all apps work together for a complex workflow often requires significant investment in expert consultants.</li>
</ul>

<h2>ERPNext: The Unified Open Source Alternative</h2>
<p>ERPNext takes a "batteries-included" approach. Unlike Odoo, it doesn't charge you for individual apps; all core modules (Manufacturing, HR, Finance, Projects) are integrated from the start.</p>

<h3>The Pros of ERPNext:</h3>
<ul>
<li><strong>Unbeatable Cost-Efficiency:</strong> Being true open source with no "per-user" licensing means massive savings on total cost of ownership (TCO).</li>
<li><strong>ZATCA & GCC Ready:</strong> Built-in support for ZATCA Phase 1 & 2 e-invoicing is often more robust in ERPNext due to its strong Indian and Middle Eastern developer base.</li>
<li><strong>Deep Vertical Integration:</strong> Because it is a unified platform, the data flow between HR, Production, and Finance is seamless without needing to "connect" separate apps.</li>
</ul>

<h3>The Challenges:</h3>
<ul>
<li><strong>Functional UI:</strong> The interface is clean and functional but lacks some of the "sizzle" and dragging micro-interactions found in Odoo.</li>
<li><strong>Lean Documentation:</strong> While the community is strong, some specific technical documentations can be less polished than Odoo's commercial portal.</li>
</ul>

<h2>Comparison at a Glance</h2>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
<tr style="background: #f8fafc; text-align: left;">
<th style="padding: 12px; border: 1px solid #e2e8f0;">Feature</th>
<th style="padding: 12px; border: 1px solid #e2e8f0;">Odoo</th>
<th style="padding: 12px; border: 1px solid #e2e8f0;">ERPNext</th>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Customization</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">High (App-based)</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Moderate to High (Unified Framework)</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Integration</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Extensive (API/Store)</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Strong but focused</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #e2e8f0;">User Interface</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Highly Polished</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Clean & Functional</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Licensing</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Per User/App (Enterprise)</td>
<td style="padding: 12px; border: 1px solid #e2e8f0;">Open Source (Free)</td>
</tr>
</table>

<h2>Why GCC Businesses Prefer ERPNext with Enfono</h2>
<p>In our experience implementing ERPs across Riyadh, Dubai, and Muscat, ERPNext usually wins for businesses that prioritize <strong>data ownership and long-term cost control</strong>. The ability to customize the core without being gated by licensing fees allows us to build extremely specific workflows — like job-wise profit tracking for logistics — that would be prohibitively expensive to "app-ify" in Odoo.</p>

<p>However, if your primary need is a simple, highly-visual CRM or a basic retail POS with immediate "off-the-shelf" apps, Odoo remains a very strong contender.</p>

<h2>Conclusion</h2>
<p>Choosing between Odoo and ERPNext isn't about which is "better"—it's about which aligns with your team's technical capacity and budget. Large teams with specific GCC compliance needs often find ERPNext to be the superior choice for scaling without the tax of recurring licenses.</p>`
        },
        {
            id: 3,
            slug: 'zatca-e-invoicing-compliance-guide',
            title: 'ZATCA e-Invoicing: A Complete Compliance Guide for Saudi Businesses',
            category: 'Compliance',
            tags: ['ZATCA', 'e-Invoicing', 'Saudi Arabia', 'Tax Compliance', 'Phase 2'],
            read_time: '7 min read',
            date: 'February 10, 2026',
            featured: false,
            excerpt: 'ZATCA\'s e-invoicing mandate is reshaping how Saudi businesses issue and store invoices. This guide covers everything from Phase 1 basics to Phase 2 integration requirements and penalties.',
            cover_image: '/assets/img/zakat.png',
            content: `<h2>Understanding ZATCA e-Invoicing</h2>
<p>In December 2021, ZATCA (Zakat, Tax and Customs Authority) launched Saudi Arabia's e-invoicing mandate — a sweeping requirement that all VAT-registered businesses must generate and store invoices in a structured electronic format. Two years later, the system's second phase has fundamentally changed how ERP systems must operate in the Kingdom.</p>

<h2>Phase 1: Generation (Fatoorah)</h2>
<p>Phase 1, effective December 4, 2021, required businesses to generate invoices electronically. Key requirements included:</p>
<ul>
<li>XML-structured invoice format compliant with UBL 2.1</li>
<li>QR code embedding in simplified invoices (B2C)</li>
<li>Anti-tampering mechanism to prevent retroactive invoice modification</li>
<li>Archiving for a minimum of 6 years</li>
</ul>

<h2>Phase 2: Integration (E-Integration)</h2>
<p>Phase 2 introduces real-time integration between business ERP systems and ZATCA's Fatoorah platform (PEPPOL-based). This means:</p>
<ul>
<li>Every B2B tax invoice is reported to ZATCA at the moment of generation</li>
<li>ZATCA returns a clearance number before the invoice can be legally shared with the buyer</li>
<li>All credit notes and debit notes require corresponding clearance</li>
<li>API connectivity between your ERP and ZATCA's portal is mandatory</li>
</ul>

<h2>What Your ERP Must Do</h2>
<p>A ZATCA Phase 2-compliant ERP must:</p>
<ul>
<li>Generate UBL 2.1 XML for every invoice</li>
<li>Cryptographically sign each invoice using a CSID (Cryptographic Stamp Identifier)</li>
<li>Submit to ZATCA's clearance API in real-time (under 5 seconds for B2B)</li>
<li>Handle ZATCA API rejection responses and retry logic</li>
<li>Store cleared invoices with ZATCA-assigned UUID and clearance timestamp</li>
</ul>

<h2>Common Compliance Pitfalls</h2>
<p>We have helped numerous Saudi businesses remediate compliance failures. The most common issues are:</p>
<ul>
<li>Using old ERP versions that only support Phase 1</li>
<li>Missing the CSID renewal schedule (CSIDs expire and must be renewed)</li>
<li>Incorrect VAT calculation on mixed-rated invoices</li>
<li>Failure to report credit notes linked to original cleared invoices</li>
</ul>

<h2>Getting Compliant</h2>
<p>Enfono has implemented ZATCA Phase 2 compliance for over 20 Saudi businesses across trading, logistics, and manufacturing sectors. Our ERPNext implementation includes a purpose-built ZATCA module with real-time clearance, CSID management, and automated XML generation. Contact us for a compliance audit of your current ERP.</p>`
        },
        {
            id: 4,
            slug: 'ai-inventory-forecasting-reduce-stock-waste',
            title: 'How AI-Driven Inventory Forecasting Cuts Stock Waste by 40%',
            category: 'AI & Analytics',
            tags: ['Inventory', 'AI', 'Forecasting', 'Supply Chain', 'Analytics'],
            read_time: '5 min read',
            date: 'January 28, 2026',
            featured: false,
            excerpt: 'Overstocking and stockouts are the twin enemies of working capital efficiency. AI-driven demand forecasting, integrated directly into ERPNext, is helping GCC businesses break this pattern permanently.',
            cover_image: '/assets/img/inventory.webp',
            content: `<h2>The Inventory Problem No ERP Alone Can Solve</h2>
<p>Every operations manager knows the feeling. You are sitting on three months of stock for a product nobody wants, while customers are calling for a line item that you ran out of two weeks ago. Inventory management is not a software problem alone — it is a prediction problem.</p>

<p>Traditional ERP reorder rules — "order when stock falls below X units" — are static. They do not account for seasonal demand, supplier lead time variability, promotional events, or macroeconomic signals. AI forecasting does.</p>

<h2>How Machine Learning Changes the Equation</h2>
<p>Modern AI forecasting models analyze multiple data streams simultaneously:</p>
<ul>
<li><strong>Historical sales velocity</strong> per SKU, per location, per customer segment</li>
<li><strong>Seasonal and cyclical patterns</strong> specific to your industry and geography</li>
<li><strong>Supplier lead time history</strong> to calculate safety stock dynamically</li>
<li><strong>External signals</strong> including regional economic indicators and commodity prices</li>
</ul>

<p>The model outputs a probabilistic demand forecast — not just "you will sell 200 units" but "there is a 90% chance you will sell between 180 and 240 units in the next 30 days." This allows procurement teams to optimize reorder quantities with confidence intervals rather than gut instinct.</p>

<h2>Integration with ERPNext</h2>
<p>Enfono integrates AI forecasting modules directly into the ERPNext procurement workflow. The system automatically:</p>
<ul>
<li>Generates draft purchase orders based on AI-recommended quantities</li>
<li>Flags SKUs with deteriorating forecast accuracy for human review</li>
<li>Adjusts safety stock levels monthly based on demand volatility</li>
<li>Routes slow-moving stock alerts to the sales team for discount campaigns</li>
</ul>

<h2>Measured Results</h2>
<p>Across our GCC client base deploying AI inventory modules, we have measured consistent outcomes:</p>
<ul>
<li>Average reduction in excess stock: 38–45%</li>
<li>Reduction in emergency procurement events: 60%</li>
<li>Improvement in order fill rate: 12–18 percentage points</li>
<li>Working capital freed from inventory: 20–30%</li>
</ul>

<p>These gains compound over time as the model learns your specific business patterns.</p>`
        },
        {
            id: 5,
            slug: 'automating-finance-accounts-erpnext',
            title: 'Automating Finance: The Future of Accounts in ERPNext',
            category: 'Automation',
            tags: ['Finance', 'Automation', 'ERPNext', 'Accounts Payable', 'Month-End Close'],
            read_time: '6 min read',
            date: 'January 15, 2026',
            featured: false,
            excerpt: 'Month-end close used to take 10 days. Automated finance workflows in ERPNext are helping GCC companies compress this to 2 days — with fewer errors and complete audit trails.',
            cover_image: '/assets/img/erpnext_accounting.png',
            content: `<h2>The Finance Team's Biggest Time Sinks</h2>
<p>Ask any CFO or Finance Manager in a GCC business about their biggest operational pain points, and the answer is remarkably consistent: month-end close, bank reconciliation, and accounts payable processing. These three processes — critical, repetitive, error-prone — consume hundreds of finance hours every month.</p>

<p>ERPNext, properly configured with automation rules, can eliminate the manual labor from all three.</p>

<h2>Automated Accounts Payable</h2>
<p>The traditional AP process involves receiving a vendor invoice, manually matching it to a purchase order, checking delivery confirmation, coding to the right cost center, getting approval, and finally processing payment. Each step involves human touch points and potential errors.</p>

<p>In an automated ERPNext setup:</p>
<ul>
<li>Vendor invoices received via email are parsed by OCR and auto-matched to open POs</li>
<li>Three-way matching (PO, receipt, invoice) is validated automatically</li>
<li>Discrepancy exceptions are routed to the right approver via workflow</li>
<li>Payment runs are scheduled based on payment terms, auto-generating bank transfer files</li>
</ul>

<h2>Bank Reconciliation Without the Spreadsheet</h2>
<p>Manual bank reconciliation — comparing your ERP's ledger entries against your bank statement line by line — is a notorious time sink. ERPNext's bank statement import and auto-reconciliation module handles this automatically:</p>
<ul>
<li>Bank statements are imported daily via API or file upload</li>
<li>ERPNext matches transactions by amount, date, and reference using fuzzy matching</li>
<li>Unmatched transactions are flagged for human review — usually less than 5% of volume</li>
</ul>

<h2>Closing the Books Faster</h2>
<p>A properly automated financial close in ERPNext involves scheduled journal entries, automatic depreciation calculations, inter-company eliminations, and automated financial statement generation. Month-end close that used to take 8–10 working days can be compressed to 2–3 days — giving leadership faster insight into business performance.</p>

<h2>Compliance and Audit Readiness</h2>
<p>Every automated transaction in ERPNext carries a complete audit trail — who triggered it, when, what the system-verified data was. For GCC businesses facing ZATCA audits or shareholder reporting, this immutable record is not just convenient; it is increasingly a regulatory expectation.</p>`
        },
        {
            id: 6,
            slug: 'nmce-logistics-job-profit-tracking-erp',
            title: 'Customer Story: How NMCE Logistics Achieved Real-Time Job-Wise Profit Tracking with ERPNext',
            category: 'Case Study',
            tags: ['Customer Story', 'Logistics', 'ERPNext', 'Profit Tracking', 'NMCE'],
            read_time: '7 min read',
            date: 'February 25, 2026',
            featured: false,
            excerpt: 'NMCE Logistics was growing fast — but had no visibility into which jobs were profitable and which were silently draining margins. Enfono implemented a custom job-costing module in ERPNext that changed everything.',
            cover_image: '/assets/img/nmce-blog.jpg',
            content: `<h2>The Challenge: Growth Without Visibility</h2>
<p>NMCE Logistics is a fast-growing freight and clearing company operating across GCC ports and land corridors. With a growing fleet, an expanding customs clearance team, and increasing shipment volumes, the business was scaling — but profitability was becoming opaque.</p>

<p>The core problem: each job (a shipment, clearance operation, or trucking assignment) involved multiple cost elements — driver wages, fuel, port fees, documentation costs, customs duties, third-party subcontracting. These costs were scattered across spreadsheets, WhatsApp messages, and paper receipts. By the time finance processed everything at month-end, it was impossible to determine which jobs had actually made money.</p>

<h2>The Business Impact of the Blind Spot</h2>
<p>Without job-level profitability data, NMCE's management faced several compounding problems:</p>
<ul>
<li>Quoting new jobs required gut-feel pricing, leading to under-priced contracts</li>
<li>Unprofitable routes and job types were subsidized by profitable ones invisibly</li>
<li>Driver performance and subcontractor cost efficiency could not be benchmarked</li>
<li>Finance could not identify which customers were genuinely high-margin relationships</li>
</ul>

<h2>The Enfono Solution</h2>
<p>Enfono implemented a custom ERPNext module tailored specifically for logistics job costing. The build included:</p>

<h3>Job Card Master</h3>
<p>Each shipment or clearance job is created as a "Job Card" in ERPNext — a parent document linking every associated cost and revenue element. The job card carries a unique reference number, customer details, job type, origin/destination, and responsible agent.</p>

<h3>Real-Time Cost Capture</h3>
<p>All costs are booked directly against the job card as they occur:</p>
<ul>
<li>Driver wages are linked via the HR timesheet module to specific job cards</li>
<li>Fuel consumption is logged via the fleet management module per trip</li>
<li>Port and customs fees are entered by the clearance team in the field via mobile</li>
<li>Subcontractor invoices are matched to the receiving job card on the AP side</li>
</ul>

<h3>Revenue Recognition</h3>
<p>Customer invoices are generated from the job card, ensuring exact linkage between revenue and cost. Partial payments and advances are also tracked against the job.</p>

<h3>Live Profitability Dashboard</h3>
<p>Management now has a real-time dashboard showing:</p>
<ul>
<li>Gross profit per job, per route, per customer, per job type</li>
<li>Month-to-date profitability versus budget</li>
<li>Top 10 and bottom 10 jobs by margin percentage</li>
<li>Aging unbilled jobs and outstanding cost approvals</li>
</ul>

<h2>The Results</h2>
<p>Within 90 days of go-live, NMCE's management team reported significant operational changes:</p>
<ul>
<li>Identified 3 chronic low-margin route types and renegotiated pricing with customers</li>
<li>Eliminated one underperforming subcontractor relationship that was quietly costing 8% margin</li>
<li>Reduced month-end close time from 14 days to 4 days due to real-time cost capture</li>
<li>Improved customer quotation accuracy by 35%, reducing post-contract surprises</li>
</ul>

<p>"Before this system, we thought we were profitable on every job until we weren't. Now I can see exactly what each shipment made or lost before the truck even returns." — <em>Operations Director, NMCE Logistics</em></p>`
        },
        {
            id: 7,
            slug: 'power-creations-manufacturing-erp-transformers',
            title: 'Customer Story: Power Creations — Manufacturing Intelligence for Heavy Electrical Equipment',
            category: 'Case Study',
            tags: ['Customer Story', 'Manufacturing', 'ERPNext', 'Transformers', 'Heavy Electrical'],
            read_time: '8 min read',
            date: 'February 18, 2026',
            featured: false,
            excerpt: 'Power Creations manufactures transformers and heavy electrical equipment — complex, high-value products with intricate BOMs and quality gates. Enfono built an ERPNext manufacturing suite that brought full traceability and scheduling intelligence to their shop floor.',
            cover_image: '/assets/img/pcc-blog.webp',
            content: `<h2>About Power Creations</h2>
<p>Power Creations is a manufacturer of transformers, switchgear, and heavy electrical equipment — products that sit at the heart of industrial power infrastructure across the GCC and South Asia. Their product range includes distribution transformers, metering transformers, voltage regulators, and custom-engineered electrical panels for industrial clients.</p>

<p>Manufacturing heavy electrical equipment is fundamentally different from discrete or process manufacturing. Each product is highly engineered, involving complex multi-level Bills of Materials (BOMs), long production cycles, stringent quality testing requirements, and precise traceability from raw copper and silicon steel through to finished transformer dispatch.</p>

<h2>The Challenge</h2>
<p>When Enfono engaged Power Creations, their manufacturing operations were running on a combination of Excel worksheets, WhatsApp coordination between departments, and a legacy accounting system that had no awareness of the shop floor.</p>

<p>The pain points were significant:</p>
<ul>
<li><strong>BOM Complexity:</strong> A single distribution transformer can have 200+ component line items across sub-assemblies. Managing version control and engineering changes manually was error-prone and slow.</li>
<li><strong>Production Scheduling:</strong> No visibility into which work orders were competing for the same winding machine or core-cutting equipment. Bottlenecks were discovered only when production stalled.</li>
<li><strong>Quality Traceability:</strong> Customer requirements (particularly government and utility buyers) demanded full material traceability — certificate of origin for copper, silicon steel test reports, insulation manufacturer datasheets. These were stored in physical folders.</li>
<li><strong>Cost Visibility:</strong> Material costs varied significantly with copper price fluctuations. There was no mechanism to calculate actual production cost versus standard cost per unit.</li>
</ul>

<h2>The Enfono ERPNext Implementation</h2>

<h3>Multi-Level BOM Management</h3>
<p>Enfono implemented ERPNext's manufacturing module with multi-level BOM support, allowing Power Creations to define complete product structures from raw materials through sub-assemblies to finished goods. Engineering change management workflows allow design updates to propagate correctly across active production orders.</p>

<h3>Work Order and Capacity Scheduling</h3>
<p>Production orders are created directly from customer sales orders, automatically generating material requisitions and work orders for each production stage. A capacity planning view allows the production manager to see machine and workstation loading across the next 30 days, identifying bottlenecks before they impact delivery dates.</p>

<h3>Quality Control Integration</h3>
<p>Each production stage includes mandatory quality gates. For transformer manufacturing, these include:</p>
<ul>
<li>Core lamination inspection and resistance measurement</li>
<li>Winding resistance and turns ratio testing</li>
<li>Insulation resistance (IR) and High Voltage (HV) testing</li>
<li>Final factory acceptance test (FAT) documentation</li>
</ul>
<p>Quality test results are captured directly in ERPNext, linked to the specific production batch and serial number. Customer test certificates are generated automatically from the captured data.</p>

<h3>Material Traceability</h3>
<p>Every material receipt is tagged with supplier batch number and certificate references at the point of goods receipt. When a transformer is dispatched, ERPNext generates a full material traceability report — showing exactly which copper batch from which supplier went into which coil of which transformer.</p>

<h3>Landed Cost and Variance Analysis</h3>
<p>Given the volatility of copper and transformer core material prices, Enfono implemented a landed cost tracking module. Actual material costs (including freight and customs duties on imported materials) are captured and compared against the standard BOM cost at each production completion. Variances trigger exception reports for the finance team.</p>

<h2>The Outcomes</h2>
<p>Six months post-implementation, Power Creations reported measurable operational improvements:</p>
<ul>
<li>Production scheduling conflicts reduced by 70% through capacity visibility</li>
<li>Quality rejection rate reduced by 40% due to earlier defect detection at mandatory inspection gates</li>
<li>Customer delivery performance improved from 68% on-time to 89% on-time</li>
<li>Material traceability documentation — previously taking 3 days to compile manually — is now generated in under 2 minutes</li>
<li>Cost variance analysis revealed one raw material category consistently running 12% over standard cost, enabling a supplier renegotiation</li>
</ul>

<p>"What impressed us most was that the system was configured specifically for how transformer manufacturing works — not a generic factory module. Enfono understood our shop floor before they wrote a single line of configuration." — <em>Managing Director, Power Creations</em></p>`
        }
    ],
    ai_cta: {
        heading: "Ready to Supercharge Your ERP with AI?",
        subtext: "Enfono bridges the gap between traditional operations and the future of intelligence. Let's build your AI roadmap together.",
        btn_primary_txt: "Get Started",
        btn_primary_url: "/contact",
        btn_secondary_txt: "Learn More",
        btn_secondary_url: "/ai-solutions"
    },

    // ─── BRANDS ───────────────────────────────────────
    brands: [
        {
            id: 1,
            name: 'Fateh ERP',
            icon: 'fas fa-file-invoice-dollar',
            tag: 'ZATCA Compliance',
            headline: 'ZATCA-Compliant e-Invoicing Made Simple',
            desc: 'Generate, validate, and submit ZATCA Phase 2-compliant e-invoices instantly. Built for Saudi businesses of all sizes with seamless ERPNext integration.',
            features: ['Phase 1 & 2 compliant', 'Sales & POS', 'Inventory Management', 'Financial Accounting', 'Procurement & Purchasing', 'CRM & Customer Management'],
            color: '#10B981',
            status: 'Available',
            link: '#'
        },
        {
            id: 2,
            name: 'FieldOps',
            icon: 'fas fa-mobile-alt',
            tag: 'Mobile ERP',
            headline: 'Mobile-First Field Operations Platform',
            desc: 'Empower your field teams with a mobile app that syncs with ERPNext in real-time — sales orders, delivery tracking, service requests, and more.',
            features: ['Offline-first mobile app', 'GPS tracking', 'Real-time ERPNext sync', 'Digital signatures', 'Route optimization', 'Service ticketing'],
            color: '#059669',
            status: 'Beta',
            link: '#'
        },
        {
            id: 3,
            name: 'StockIQ',
            icon: 'fas fa-warehouse',
            tag: 'Inventory AI',
            headline: 'Intelligent Inventory Management',
            desc: 'AI-driven inventory optimization that predicts demand, suggests reorder points, and eliminates stockouts — fully integrated with ERPNext.',
            features: ['Demand forecasting', 'Auto reorder rules', 'Multi-warehouse', 'Barcode & RFID', 'Expiry management', 'Supplier scoring'],
            color: '#34D399',
            status: 'Coming Soon',
            link: '#'
        },
        {
            id: 4,
            name: 'ERPInsights',
            icon: 'fas fa-chart-pie',
            tag: 'AI Analytics',
            headline: 'AI-Powered Business Intelligence for ERPNext',
            desc: 'Turn your ERPNext data into actionable insights with predictive dashboards, natural language queries, and automated anomaly detection.',
            features: ['Predictive analytics', 'Natural language reports', 'Custom KPI dashboards'],
            color: '#10B981',
            status: 'Available',
            link: '#'
        }
    ],

    // ─── CAREERS ──────────────────────────────────────
    careers: [
        { id: 1, title: 'Senior ERPNext Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time', desc: 'Build and customize ERPNext modules for GCC enterprise clients. Deep Python/Frappe framework experience required.', apply_url: '/contact' },
        { id: 2, title: 'ERP Consultant — GCC', dept: 'Consulting', location: 'Riyadh, KSA', type: 'On-site', desc: 'Lead end-to-end ERPNext implementations for clients in Saudi Arabia. Arabic language skills preferred.', apply_url: '/contact' },
        { id: 3, title: 'AI/ML Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', desc: 'Build AI features for our ERPInsights platform — predictive models, NLP queries, anomaly detection.', apply_url: '/contact' },
        { id: 4, title: 'ERP Project Manager', dept: 'Consulting', location: 'Dubai, UAE', type: 'Hybrid', desc: 'Manage ERP implementation projects across UAE clients — coordinate teams, track milestones, ensure on-time delivery.', apply_url: '/contact' },
        { id: 5, title: 'Business Development Manager', dept: 'Sales', location: 'Riyadh, KSA', type: 'On-site', desc: 'Drive new client acquisition across Saudi Arabia. ERPNext or ERP industry experience highly valued.', apply_url: '/contact' },
        { id: 6, title: 'DevOps Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', desc: 'Manage cloud infrastructure for Enfono\'s SaaS products and client deployments. AWS/GCP experience required.', apply_url: '/contact' }
    ],

    // ─── ABOUT PAGE ───────────────────────────────────
    about: {
        who_we_are: {
            heading: "5 Years of ERP Excellence Across the GCC",
            subtext: "Enfono was founded with a singular mission: to make world-class ERP technology accessible and effective for businesses in the GCC. Journeying from a hardware vision to an enterprise software leader.",
            stats: [
                { end: 120, suffix: '+', label: 'Projects Delivered' },
                { end: 5, suffix: '+', label: 'Years Experience' },
                { end: 6, suffix: '', label: 'Countries Served' }
            ]
        },
        journey: [
            { year: '2018', title: 'The Vision', desc: 'Started as a hardware startup with a vision to change the electronics landscape.' },
            { year: '2019', title: 'Market Launch & Resilience', desc: 'First product launched. Faced business-wide disruption due to floods, choosing to pivot entire inventory to support victims.' },
            { year: '2020', title: 'The Pivot', desc: 'Relaunched with a focus on software, developing RentPe — a rental property management system.' },
            { year: '2021', title: 'Adoption', desc: 'Gained early tracking and secured critical early adopters.' },
            { year: '2022', title: 'The Legal Battle', desc: 'Navigated the PhonePe vs RentPe trademark case, a defining moment for our brand identity.' },
            { year: '2023', title: 'Evolution to ERP', desc: 'Closed RentPe and rebuilt a comprehensive rental property ERP, expanding our vision.' },
            { year: '2024', title: 'Global Scale', desc: 'Secured government and international projects, scaling operations to Saudi Arabia, UAE, and Oman.' },
            { year: '2025', title: 'Saudi Expansion', desc: 'Officially established our regional headquarters in Riyadh, Saudi Arabia.' }
        ],
        team: [
            { id: 1, name: 'Sayanth NS', role: 'Co-Founder and CEO', order: 1, initials: 'SN' },
            { id: 2, name: 'Muhsin MT', role: 'Co-Founder and CMO', order: 2, initials: 'MM' },
            { id: 3, name: 'Salman V', role: 'Operations Manager India', order: 3, initials: 'SV' },
            { id: 4, name: 'Siva Jyothish', role: 'Project Manager', order: 4, initials: 'SJ' },
            { id: 5, name: 'Nidheesh P', role: 'Project Manager', order: 5, initials: 'NP' },
            { id: 6, name: 'Hashir T', role: 'Finance Manager India', order: 6, initials: 'HT' }
        ],
        offices: [
            {
                country: 'Saudi Arabia',
                flag: '🇸🇦',
                type: 'Regional Headquarters',
                city: 'Riyadh',
                address: 'Riyadh, KSA',
                phone: '+966 57 352 8619',
                email: 'contact@enfono.com',
                color: '#10B981'
            },
            {
                country: 'India',
                flag: '🇮🇳',
                type: 'Development Hub',
                city: 'Kochi, Kerala',
                address: '2nd Floor, Suite 598, Valamkottil Towers, Kakkanad, Kochi - 682021',
                phone: '+91 75939 22039',
                email: 'contact@enfono.com',
                color: '#0D9488'
            },
            {
                country: 'India',
                flag: '🇮🇳',
                type: 'Support Center',
                city: 'Calicut, Kerala',
                address: 'Safar Arcade, Near Calicut International Airport, Kerala - 673638',
                phone: '+91 75939 22039',
                email: 'contact@enfono.com',
                color: '#0f766e'
            }
        ]
    }
};
