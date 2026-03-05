export const servicesData = [
    {
        id: "erpnext-implementation",
        slug: "erpnext-implementation",
        title: "ERPNext Implementation",
        short_desc: "The world's most agile ERP. Tailored implementations with ZATCA Phase 2 compliance and localized GCC features.",
        hero_tagline: "Power Your Enterprise with Scalable, Localized ERPNext",
        hero_desc: "From Financial Accounting & ZATCA e-Invoicing to comprehensive HRMS and complex Manufacturing—ERPNext offers an unmatched, customizable suite without exorbitant licensing fees. We provide end-to-end implementation ensuring full compliance and immediate ROI.",
        hero_image: "/assets/img/erpnext-dashboard-mockup.png",
        features: [
            {
                title: "Financial Accounting & ZATCA",
                desc: "Fully compliant with ZATCA E-Invoicing Phase 2 for KSA. Real-time cash flow, complex ledger management, and automated tax reporting built-in.",
                icon: "fas fa-file-invoice-dollar"
            },
            {
                title: "GCC-Localized HRMS & Payroll",
                desc: "Manage Iqama expirations, EOSB (End of Service Benefits), multi-currency payroll, attendance, and employee lifecycles specifically tailored for the Middle East.",
                icon: "fas fa-users"
            },
            {
                title: "Manufacturing",
                desc: "Maintain multi-level Bill of Materials (BOM), track production planning, job cards, and equipment maintenance schedules.",
                icon: "fas fa-industry"
            },
            {
                title: "Procurement & Inventory",
                desc: "Multi-warehouse inventory, serial/batch tracking, barcodes/RFID, automated purchase orders, and supplier portals.",
                icon: "fas fa-boxes"
            },
            {
                title: "Sales & CRM",
                desc: "Track leads, opportunities, manage pipelines, and send auto-generated quotes directly from the system.",
                icon: "fas fa-chart-line"
            },
            {
                title: "Logistics",
                desc: "Manage vehicle fleets, track shipments, optimize delivery routes, and monitor logistics expenses seamlessly.",
                icon: "fas fa-truck"
            }
        ],
        tech_stack: [
            { name: "ERPNext", icon: "fas fa-cube" },
            { name: "Frappe Framework", icon: "fas fa-code" },
            { name: "Python", icon: "fab fa-python" },
            { name: "MariaDB", icon: "fas fa-database" }
        ],
        benefits: [
            "100% Open Source Architecture (Zero Vendor Lock-in)",
            "ZATCA Phase 2 E-Invoicing Integrated",
            "Multi-Company & Multi-Currency Support out-of-the-box",
            "Highly Rapid API Integrations & Mobile Readiness"
        ],
        modules: [
            {
                id: "financial-accounting",
                title: "Financial Accounting",
                desc: "Get a real-time view of your cash flow. Full-fledged accounting module covering basic bookkeeping to complex analytics with ZATCA Phase 2 compliance.",
                icon: "fas fa-file-invoice-dollar",
                image: "/assets/img/erpnext-finance-mockup.png",
                featuresList: [
                    "Multi-Currency Accounting & Billing",
                    "ZATCA Phase 2 E-Invoicing",
                    "Automated Bank Reconciliation",
                    "Cost Centers & Profitability Analysis",
                    "Accounts Receivable / Payable Alerts",
                    "Customizable Tax Templates"
                ]
            },
            {
                id: "hr-payroll",
                title: "HR & Payroll",
                desc: "Manage employee lifecycles, attendance, leave, expense claims, Iqama tracking, EOSB tracking, and automated GCC payroll processing.",
                icon: "fas fa-users",
                image: "/assets/img/erpnext-hr-mockup.png",
                featuresList: [
                    "Automated Payroll & Salary Slips",
                    "Leave & Attendance Tracking",
                    "Expense Claims & Approvals",
                    "EOSB (End of Service) Calculation",
                    "Iqama & Document Expiration Alerts",
                    "Employee Lifecycle & Onboarding"
                ]
            },
            {
                id: "manufacturing",
                title: "Manufacturing",
                desc: "Maintain multi-level Bill of Materials (BOM), track production planning, job cards, and equipment maintenance.",
                icon: "fas fa-industry",
                image: "/assets/img/erpnext-mfg-mockup.png",
                featuresList: [
                    "Multi-level Bill of Materials (BOM)",
                    "Work Orders & Job Cards",
                    "Production Analytics & Tracking",
                    "Capacity Planning & Routing",
                    "Equipment Maintenance Schedules",
                    "Quality Inspection Management"
                ]
            },
            {
                id: "crm-sales",
                title: "CRM & Sales",
                desc: "Track leads, opportunities, manage pipelines, and send auto-generated quotes directly from the system.",
                icon: "fas fa-chart-line",
                image: "/assets/img/erpnext-crm-mockup.png",
                featuresList: [
                    "Lead & Opportunity Pipeline",
                    "Automated Quotation Generation",
                    "Sales Order Management",
                    "Email Marketing & Campaigns",
                    "Salesperson Commission Tracking",
                    "Customer Portal & Support"
                ]
            },
            {
                id: "inventory",
                title: "Inventory",
                desc: "Multi-warehouse inventory, serial/batch tracking, barcodes/RFID integration, and automated stock alerts.",
                icon: "fas fa-boxes",
                image: "/assets/img/erpnext-inventory-mockup.png",
                featuresList: [
                    "Multi-Warehouse Management",
                    "Serial Number & Batch Tracking",
                    "Barcode / RFID Scanning Support",
                    "Automated Reorder Levels",
                    "Stock Reconciliation",
                    "Item Variants & Attributes"
                ]
            },
            {
                id: "procurement",
                title: "Procurement",
                desc: "Streamline purchasing with automated supplier portals, purchase orders, and multi-currency buying.",
                icon: "fas fa-shopping-cart",
                image: "/assets/img/erpnext-procurement-mockup.png",
                featuresList: [
                    "Purchase Order Automation",
                    "Supplier Portals & RFQs",
                    "Automated Purchase Receipts",
                    "Supplier Scorecards & Ratings",
                    "Multi-Currency Procurement",
                    "Material Request Workflows"
                ]
            },
            {
                id: "projects",
                title: "Project Management",
                desc: "Create tasks, allocate resources, track time, and monitor project profitability in real-time.",
                icon: "fas fa-tasks",
                image: "/assets/img/erpnext-projects-mockup.png",
                featuresList: [
                    "Task Management & Timesheets",
                    "Project Profitability Tracking",
                    "Gantt Charts & Resource Allocation",
                    "Milestone Billing",
                    "Kanban Task Boards",
                    "Expense & Budget Tracking"
                ]
            },
            {
                id: "assets",
                title: "Asset Management",
                desc: "Track the complete lifecycle of your assets, from purchasing to depreciation and eventual disposal.",
                icon: "fas fa-laptop-house",
                image: "/assets/img/erpnext-assets-mockup.png",
                featuresList: [
                    "Automated Asset Depreciation",
                    "Asset Movement & Tracking",
                    "Maintenance & Calibration Logs",
                    "Asset Purchasing & Sales",
                    "Equipment Value Scrap Tracking",
                    "Location-Based Asset Tagging"
                ]
            }
        ],
        industries: [
            { title: "Manufacturing", icon: "fas fa-industry" },
            { title: "Retail & Distribution", icon: "fas fa-store" },
            { title: "Services & Consulting", icon: "fas fa-briefcase" },
            { title: "Healthcare", icon: "fas fa-hospital" },
            { title: "Education", icon: "fas fa-graduation-cap" },
            { title: "Logistics", icon: "fas fa-truck" }
        ],
        process: [
            { step: "Discovery & Gap Analysis", desc: "Evaluating your business requirements against standard ERPNext modules." },
            { step: "System Architecture", desc: "Configuring the Chart of Accounts, Item Masters, and Security protocols." },
            { step: "App Customization", desc: "Developing specific Frappe apps for any unique workflows." },
            { step: "Data Migration", desc: "Seamless transition of legacy masters, opening balances, and ongoing transactions." },
            { step: "UAT & Go-Live", desc: "Rigorous user acceptance testing and localized staff training." },
            { step: "SLA Support", desc: "Proactive, continuous technical coverage to ensure system stability." }
        ]
    },
    {
        id: "custom-erp-development",
        slug: "custom-erp-development",
        title: "Custom ERP Development",
        short_desc: "Bespoke enterprise software built from scratch, or seamless migrations from legacy systems.",
        hero_tagline: "Software That Adapts to You, Not the Other Way Around",
        hero_desc: "Off-the-shelf software doesn't always fit. We build scalable custom ERPs and perform complex legacy system migrations using modern technologies like .Net, Django, React, and Flutter.",
        hero_image: "/assets/img/custom-software-dev.png",
        features: [
            {
                title: "Legacy System Migration",
                desc: "Safely upgrade outdated, slow, or unsupported legacy software to modern, secure, cloud-based architectures.",
                icon: "fas fa-server"
            },
            {
                title: "API-First Architecture",
                desc: "Build systems that easily communicate with external services, mobile apps, and third-party tools.",
                icon: "fas fa-network-wired"
            },
            {
                title: "Scalable Databases",
                desc: "Designing robust database schemas capable of handling millions of records without performance degradation.",
                icon: "fas fa-database"
            },
            {
                title: "Custom Portals",
                desc: "Dedicated interfaces for your vendors, clients, and partners connected directly to your core system.",
                icon: "fas fa-laptop-code"
            }
        ],
        tech_stack: [
            { name: ".NET Core", icon: "fab fa-windows" },
            { name: "Django / Python", icon: "fab fa-python" },
            { name: "React JS", icon: "fab fa-react" },
            { name: "Flutter", icon: "fas fa-mobile-alt" }
        ],
        benefits: [
            "100% Ownership of Intellectual Property",
            "Tailored specifically to your niche requirements",
            "High Performance & Modern Security Standards",
            "Future-proof Technology Stack"
        ],
        modules: [
            {
                id: "bespoke-core-engine",
                title: "Bespoke Core Engine",
                desc: "Custom-built business logic strictly following your established manual workflows.",
                icon: "fas fa-cogs",
                image: "/assets/img/custom-core-mockup.png",
                featuresList: [
                    "Workflow-Specific Algorithms",
                    "Custom Role-Based Access Control",
                    "Proprietary Business Rules Engine",
                    "Microservices Architecture",
                    "Real-time Data Processing",
                    "Flexible Module Expansion"
                ]
            },
            {
                id: "legacy-data-bridges",
                title: "Legacy Data Bridges",
                desc: "Proprietary ETL tools to sync data from your old systems during the transition.",
                icon: "fas fa-bridge",
                image: "/assets/img/legacy-sync-mockup.png",
                featuresList: [
                    "Automated ETL Pipelines",
                    "Historical Data Sanitization",
                    "Live Sync During Transition",
                    "Format Conversion Scripts",
                    "Database Integrity Checks",
                    "Zero Downtime Migration"
                ]
            },
            {
                id: "internal-admin-portals",
                title: "Internal Admin Portals",
                desc: "High-security back-office tools for staff management and deep audit logs.",
                icon: "fas fa-user-shield",
                image: "/assets/img/admin-portal-mockup.png",
                featuresList: [
                    "Comprehensive Audit Trails",
                    "Granular Permission Matrices",
                    "Employee Performance Dashboards",
                    "Secure Document Vaults",
                    "Multi-factor Authentication (MFA)",
                    "IP Whitelisting & Geofencing"
                ]
            },
            {
                id: "custom-reporting-engine",
                title: "Custom Reporting Engine",
                desc: "Pixel-perfect automated PDF and Excel reports tailored to your board requirements.",
                icon: "fas fa-file-invoice-dollar",
                image: "/assets/img/custom-reports-mockup.png",
                featuresList: [
                    "Automated Scheduled Reports",
                    "Dynamic Dashboard Builder",
                    "Excel & PDF Export Support",
                    "Complex Formulas & KPI Tracking",
                    "Multi-Currency Consolidation",
                    "White-Labeled Report Outputs"
                ]
            },
            {
                id: "external-api-gateways",
                title: "External API Gateways",
                desc: "Securely expose data or consume third-party services like payment gateways and logistics.",
                icon: "fas fa-network-wired",
                image: "/assets/img/api-gateway-mockup.png",
                featuresList: [
                    "RESTful & GraphQL API Design",
                    "Payment Gateway Integrations",
                    "Rate Limiting & Security",
                    "Webhook Subscriptions",
                    "Third-Party CRM/ERP Sync",
                    "API Analytics & Monitoring"
                ]
            }
        ],
        industries: [
            { title: "Financial Services", icon: "fas fa-university" },
            { title: "Specialized Trade", icon: "fas fa-tools" },
            { title: "Government Agencies", icon: "fas fa-landmark" }
        ],
        process: [
            { step: "Requirements Gathering", desc: "Deep dive into your custom requirements." },
            { step: "UI/UX Prototyping", desc: "Visualizing the system before writing code." },
            { step: "Agile Development", desc: "Iterative sprints with regular client feedback." },
            { step: "QA & Testing", desc: "Rigorous automated and manual testing." },
            { step: "Deployment", desc: "Go-live on cloud infrastructure." },
            { step: "Maintenance", desc: "Ongoing SLA and feature updates." }
        ]
    },
    {
        id: "it-consulting-and-support",
        slug: "it-consulting-and-support",
        title: "IT Consulting & Support",
        short_desc: "Strategic IT roadmaps and reliable technical support to keep your operations running smoothly.",
        hero_tagline: "Strategic IT Partnerships for Scalable Growth",
        hero_desc: "We don't just fix computers; we align IT strategy with your business goals. Our consulting services ensure your technology investments deliver maximum ROI, while our support keeps your systems online 24/7.",
        hero_image: "/assets/img/it-consulting.png",
        features: [
            {
                title: "Digital Transformation",
                desc: "Roadmaps for transitioning analog processes into efficient digital workflows.",
                icon: "fas fa-project-diagram"
            },
            {
                title: "IT Audits & Assessments",
                desc: "Comprehensive review of your current infrastructure to identify bottlenecks and vulnerabilities.",
                icon: "fas fa-search"
            },
            {
                title: "Vendor Management",
                desc: "We act as your technical liaison, managing software vendors and IT procurement.",
                icon: "fas fa-handshake"
            },
            {
                title: "24/7 Managed Support",
                desc: "Proactive monitoring and rapid SLA-driven resolution of technical issues.",
                icon: "fas fa-headset"
            }
        ],
        tech_stack: [
            { name: "ITIL Framework", icon: "fas fa-sitemap" },
            { name: "Helpdesk Systems", icon: "fas fa-ticket-alt" },
            { name: "Network Monitoring", icon: "fas fa-wifi" }
        ],
        benefits: [
            "Reduced IT Downtime",
            "Predictable IT Spending",
            "Access to an entire team of experts",
            "Alignment of IT with Business Goals"
        ],
        modules: [
            {
                title: "Strategic IT Planning",
                desc: "3-5 year technology roadmaps aligned with your corporate growth targets.",
                icon: "fas fa-map-marked-alt"
            },
            {
                title: "Infrastructure Audit",
                desc: "Deep-dive analysis of servers, networks, and hardware lifecycle management.",
                icon: "fas fa-clipboard-check"
            },
            {
                title: "SLA-Driven Support",
                desc: "Tiered support levels with guaranteed response and resolution times.",
                icon: "fas fa-clock"
            },
            {
                title: "IT Policy Development",
                desc: "Creation of professional IT usage, disaster recovery, and internal data policies.",
                icon: "fas fa-file-shield"
            }
        ],
        industries: [
            { title: "Corporate Offices", icon: "fas fa-building" },
            { title: "Educational Inst.", icon: "fas fa-graduation-cap" },
            { title: "Legal Firms", icon: "fas fa-balance-scale" }
        ],
        process: [
            { step: "Initial Assessment", desc: "Evaluating current IT landscape." },
            { step: "Strategic Roadmap", desc: "Defining long-term technology goals." },
            { step: "Implementation", desc: "Executing upgrades and migrations." },
            { step: "Proactive Monitoring", desc: "Setting up 24/7 system alerts." },
            { step: "Helpdesk Support", desc: "Daily user support and issue resolution." },
            { step: "Quarterly Reviews", desc: "Assessing performance and adjusting strategy." }
        ]
    },
    {
        id: "cloud-cyber-security",
        slug: "cloud-cyber-security",
        title: "Cloud & Cyber Security",
        short_desc: "Secure, scalable cloud infrastructure and enterprise-grade cyber defense.",
        hero_tagline: "Fortify Your Digital Assets in the Cloud",
        hero_desc: "Leverage the power of AWS, Azure, and modern cloud architectures while ensuring your sensitive data remains impenetrable to cyber threats and data loss.",
        hero_image: "/assets/img/cloud-security.png",
        features: [
            {
                title: "Cloud Migration",
                desc: "Seamlessly move your on-premise servers to AWS, securing high availability and scalability.",
                icon: "fas fa-cloud-upload-alt"
            },
            {
                title: "Vulnerability Assessments",
                desc: "Regular penetration testing and security audits to identify and patch system weaknesses.",
                icon: "fas fa-shield-alt"
            },
            {
                title: "Disaster Recovery",
                desc: "Automated backups and failover systems ensuring business continuity during crises.",
                icon: "fas fa-server"
            },
            {
                title: "Compliance Management",
                desc: "Ensure your systems meet regulatory standards (GDPR, ISO, etc.) for data protection.",
                icon: "fas fa-file-contract"
            }
        ],
        tech_stack: [
            { name: "AWS", icon: "fab fa-aws" },
            { name: "Linux", icon: "fab fa-linux" },
            { name: "Docker/Kubernetes", icon: "fab fa-docker" },
            { name: "Firewalls/VPNs", icon: "fas fa-lock" }
        ],
        benefits: [
            "99.99% Uptime Guarantee",
            "Protection against Ransomware & Data Breaches",
            "Elastic Scalability for Traffic Spikes",
            "Automated Compliance Adherence"
        ],
        modules: [
            {
                title: "Cloud Migration Suite",
                desc: "Zero-downtime migration protocols for moving on-premise servers to AWS or Azure.",
                icon: "fas fa-cloud-upload-alt"
            },
            {
                title: "Threat Detection (SOC)",
                desc: "24/7 endpoint monitoring and automated incident response using AI-driven alerts.",
                icon: "fas fa-user-shield"
            },
            {
                title: "Compliance Automator",
                desc: "Automated scanning for GDPR, ISO 27001, and SAMA compliance with ready reports.",
                icon: "fas fa-file-contract"
            },
            {
                title: "Disaster Recovery",
                desc: "Geo-redundant backup systems ensuring your data is safe even during regional outages.",
                icon: "fas fa-shield-virus"
            }
        ],
        industries: [
            { title: "E-Commerce", icon: "fas fa-shopping-cart" },
            { title: "Healthcare Providers", icon: "fas fa-hospital" },
            { title: "FinTech Startups", icon: "fas fa-mobile-alt" }
        ],
        process: [
            { step: "Security Audit", desc: "Identifying current vulnerabilities." },
            { step: "Cloud Architecture", desc: "Designing secure, scalable server networks." },
            { step: "Migration & Hardening", desc: "Moving data while establishing security protocols." },
            { step: "Penetration Testing", desc: "Simulated attacks to test defenses." },
            { step: "24/7 SOC Monitoring", desc: "Active threat detection." },
            { step: "Incident Response", desc: "Rapid mitigation of any security events." }
        ]
    },
    {
        id: "mobile-app-development",
        slug: "mobile-app-development",
        title: "Mobile App Development",
        short_desc: "High-performance iOS and Android applications built for engagement.",
        hero_tagline: "Your Business, Right in Your Customer's Pocket",
        hero_desc: "We build intuitive, fast, and feature-rich mobile applications that connect your business to users on the go. From complex enterprise mobility solutions to consumer-facing apps.",
        hero_image: "/assets/img/mobile-app-dev.png",
        features: [
            {
                title: "Cross-Platform Development",
                desc: "Build once, deploy everywhere using Flutter for seamless performance on both iOS and Android.",
                icon: "fas fa-mobile-alt"
            },
            {
                title: "Native App Development",
                desc: "High-performance native Swift and Kotlin applications for specialized hardware integrations.",
                icon: "fab fa-apple"
            },
            {
                title: "UI/UX Design",
                desc: "Creating intuitive interfaces that drive user engagement and reduce churn.",
                icon: "fas fa-paint-brush"
            },
            {
                title: "Backend API Integration",
                desc: "Connecting your mobile app securely to your ERP, CRM, or custom database.",
                icon: "fas fa-plug"
            }
        ],
        tech_stack: [
            { name: "Flutter", icon: "fas fa-layer-group" },
            { name: "React Native", icon: "fab fa-react" },
            { name: "Swift / iOS", icon: "fab fa-apple" },
            { name: "Kotlin / Android", icon: "fab fa-android" }
        ],
        benefits: [
            "Faster Time to Market with Cross-Platform",
            "High User Engagement & Retention",
            "Seamless Offline Capabilities",
            "Direct Marketing Channel via Push Notifications"
        ],
        modules: [
            {
                title: "User Experience (UX)",
                desc: "Focus on micro-interactions and smooth navigation that keeps users coming back.",
                icon: "fas fa-fingerprint"
            },
            {
                title: "Real-time Sync",
                desc: "Offline-first architectures that sync data instantly when a connection is restored.",
                icon: "fas fa-sync"
            },
            {
                title: "Payment Integration",
                desc: "Secure mobile wallets and GCC-localized payment gateways (Mada, StcPay).",
                icon: "fas fa-wallet"
            },
            {
                title: "Analytics Dashboard",
                desc: "Deep-dive metrics into user behavior, heatmaps, and funnel conversion tracking.",
                icon: "fas fa-chart-line"
            }
        ],
        industries: [
            { title: "Retail & Delivery", icon: "fas fa-box" },
            { title: "Real Estate", icon: "fas fa-home" },
            { title: "Entertainment", icon: "fas fa-film" }
        ],
        process: [
            { step: "Product Strategy", desc: "Defining user personas and feature scope." },
            { step: "Wireframing", desc: "Creating low-fidelity layout plans." },
            { step: "UI/UX Design", desc: "High-fidelity mockups and interactive prototypes." },
            { step: "App Development", desc: "Coding frontend screens and backend APIs." },
            { step: "Beta Testing", desc: "Testflight & Internal testing rounds." },
            { step: "App Store Launch", desc: "Publishing to Apple App Store and Google Play." }
        ]
    },
    {
        id: "iot-industry-automation",
        slug: "iot-industry-automation",
        title: "IoT and Industry Automation",
        short_desc: "Smart connected devices to monitor, control, and optimize your physical operations.",
        hero_tagline: "Bring Your Physical Operations Online",
        hero_desc: "Industry 4.0 is here. We integrate IoT sensors, smart machinery, and automated workflows directly into your central software, giving you unprecedented real-time control over manufacturing and logistics.",
        hero_image: "/assets/img/iot-automation.png",
        features: [
            {
                title: "Smart Manufacturing",
                desc: "Monitor machine health, predict maintenance needs, and track production output in real-time.",
                icon: "fas fa-cogs"
            },
            {
                title: "Fleet & Asset Tracking",
                desc: "GPS and RFID integrations to track vehicles, shipments, and valuable assets globally.",
                icon: "fas fa-truck"
            },
            {
                title: "Environmental Monitoring",
                desc: "Sensors for temperature, humidity, and quality control automatically reporting to your ERP.",
                icon: "fas fa-thermometer-half"
            },
            {
                title: "Process Automation",
                desc: "Trigger digital workflows automatically based on physical sensor inputs to eliminate human error.",
                icon: "fas fa-robot"
            }
        ],
        tech_stack: [
            { name: "MQTT Protocols", icon: "fas fa-broadcast-tower" },
            { name: "Raspberry Pi / Arduino", icon: "fas fa-microchip" },
            { name: "AWS IoT Core", icon: "fab fa-aws" },
            { name: "Python", icon: "fab fa-python" }
        ],
        benefits: [
            "Predictive Maintenance stops downtime",
            "Real-time visibility into physical assets",
            "Massive reduction in manual data entry",
            "Data-driven operational efficiencies"
        ],
        modules: [
            {
                title: "Hardware Integration",
                desc: "Custom firmware development for sensors (Temp, Vibration, Proximity, RFID).",
                icon: "fas fa-microchip"
            },
            {
                title: "Edge Computing",
                desc: "Processing data locally at the site level to reduce latency and bandwidth usage.",
                icon: "fas fa-server"
            },
            {
                title: "Machine Learning (ML)",
                desc: "Predictive algorithms that forecast equipment failure before it happens.",
                icon: "fas fa-brain"
            },
            {
                title: "IoT Dashboard",
                desc: "Centrally monitor all your physical assets on a single digital twin interface.",
                icon: "fas fa-project-diagram"
            }
        ],
        industries: [
            { title: "Manufacturing", icon: "fas fa-industry" },
            { title: "Logistics & Fleet", icon: "fas fa-shipping-fast" },
            { title: "Cold Storage", icon: "fas fa-snowflake" }
        ],
        process: [
            { step: "Site Inspection", desc: "Evaluating current machinery and environment." },
            { step: "Hardware Selection", desc: "Choosing the right sensors and microcontrollers." },
            { step: "Firmware Development", desc: "Programming the physical devices." },
            { step: "Cloud Integration", desc: "Connecting devices to AWS IoT and ERP systems." },
            { step: "Pilot Deployment", desc: "Testing on a small subset of operations." },
            { step: "Factory Rollout", desc: "Full-scale implementation and staff training." }
        ]
    }
];
