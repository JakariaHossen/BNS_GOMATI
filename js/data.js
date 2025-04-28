// Define mock API endpoints (replace with real URLs in production)
const API_ENDPOINTS = {
    GALLERY: '/api/gallery',      // Endpoint for gallery images
    WORK_PLAN: '/api/work-plan',  // Endpoint for work plans
    NOTES: '/api/notes',          // Endpoint for priority notes
    WORK_PROGRESS: '/api/progress',// Endpoint for work progress (hypothetical)
    UPCOMING_EVENTS: '/api/events'
};

// Mock data models (simulates database responses)
const dataModels = {
    // Gallery images with titles/descriptions
    gallery: [
        {
            image: "image/img1.webp",
            title: "Dock Bed View BNS GOMAT",
            description: "Picture After water jet"
        },
        {
            image: "image/img2.webp",
            title: "*Image Title....",
            description: "*Image Description...."
        },
        {
            image: "image/img3.webp",
            title: "*Image title...",
            description: "*Image Description...."
        },
        {
            image: "image/img4.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img6.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img7.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img8.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
       
        {
            image: "image/img10.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img11.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img12.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img13.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img14.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        },
        {
            image: "image/img15.webp",
            title: "*Image Title...",
            description: "*Image Description...."
        }
        // ... (other gallery items)
    ],

    // Work progress tracking
    workProgress: [
        {
            orderNumber: "CR -1232500082",
            description: "DG foundation (DG no-3) need to be modified. Cutting/ welding facilities work to be carried out as required.",
            progress: "50%"
        },
        {
            orderNumber: "CR -1232500073",
            description: "03 in no discharge junction box valve of GS pump (E/Room, DG/Room, T/Space) are defective.",
            progress: "25%"
        },
        {
            orderNumber: "CR -1232500009",
            description: "02 in no ships name plate base wooden planks are deteriorated.",
            progress: "Done"
        },
        {
            orderNumber: "CR -1232500010",
            description: "01 in no radar display nedd to be changed.",
            progress: "75%"
        },
        {
            orderNumber: "CR-1234567879",
            description: "Template Work progeress..",
            progress: "25%"
        },
        {
            orderNumber: "CR-1234567879",
            description: "Template Work progeress..",
            progress: "50%"
        },
        {
            orderNumber: "CR-1234567879",
            description: "Template Work progeress..",
            progress: "50%"
        },
        {
            orderNumber: "CR-1234567879",
            description: "Template Work progeress..",
            progress: "50%"
        },
        {
            orderNumber: "CR-1234567879",
            description: "Template Work progeress..",
            progress: "50%"
        },
        // ... (other progress items)
    ],
// Inside dataModels object:
majorIssues: [
    {
        id: 1,
        title: "DG-3 power failure & parallel issue.",
        severity: "Critical",
        assignedTo: "Civil Team",
        downloadUrl: "/reports/berth4-crack.pdf"
    },
    {
        id: 2,
        title: "MCR Engine controll system failure.",
        severity: "High",
        assignedTo: "Mechanical Team",
        downloadUrl: "/reports/crane-hydraulic.pdf"
    },
    {
        id: 1,
        title: "SHIPS main refrigerator",
        severity: "Critical",
        assignedTo: "Civil Team",
        downloadUrl: "/reports/berth4-crack.pdf"
    },
    {
        id: 2,
        title: "FWD and AFT ac cooling system",
        severity: "High",
        assignedTo: "Mechanical Team",
        downloadUrl: "/reports/crane-hydraulic.pdf"
    },
    {
        id: 1,
        title: "Emergency Generator",
        severity: "Critical",
        assignedTo: "Civil Team",
        downloadUrl: "/reports/berth4-crack.pdf"
    },
    {
        id: 2,
        title: "Crane Hydraulic Failure",
        severity: "High",
        assignedTo: "Mechanical Team",
        downloadUrl: "/reports/crane-hydraulic.pdf"
    },
    {
        id: 1,
        title: "Example Major issue title",
        severity: "Critical",
        assignedTo: "Civil Team",
        downloadUrl: "/reports/berth4-crack.pdf"
    }
],

    // Work plans by date
    workPlan: [
        {
            date: "Today, June 23",
            tasks: ["New DG (Moteurs Baudouin) Silencer Modificatio work is in progress", "AFT AC plandt re-installation work is in progress", "Main Switch board modification work is in progress", "New DG (Moteurs Baudouin) battery cable wiring work completed", "DG room stbd sideshell plate fitting work completed"]
        },
        {
            date: "Tomorrow, June 24",
            tasks: ["Pipe line fittin works fitting in DG room", "AFT AC Compressor motor power cable and various Connecton", "Valve gallery of GS pump- 03 fitting work", "Silencer modification", "**Template Work plan"]
        }
        // ... (other work plans)
    ],

    // Priority notes
    notes: [
        {
            id: 1,
            priority: "low",
            content: "Power Cable for alternator",
            details: { title: "Power Cable for alternator", text: " Power cable for old Alternator to be removed and Power cable of new Alternator (440 Volt AC, 60 Hz, 3 Ph, 168 KW, 1800 RPM) to be installed and connected with Alternator and MCB" }
        },
        {
            id: 1,
            priority: "high",
            content: "CSD inspecton 24-04-2025",
            details: { title: "CSD inspecton", text: "**Notes Desctipion will goes here**" }
        },
        {
            id: 1,
            priority: "medium",
            content: "New DG remote controll unit",
            details: { title: "New DG remote controll unit", text: "Temote control unit for new dg to be installed on MCR" }
        },
        {
            id: 1,
            priority: "low",
            content: "**Template Notes1**",
            details: { title: "Example title", text: "Dummy data...." }
        },
        {
            id: 1,
            priority: "high",
            content: "Example content",
            details: { title: "Example Title", text: "dummy data....." }
        },
        {
            id: 1,
            priority: "medium",
            content: "Example content",
            details: { title: "Example Title", text: "dummy data...." }
        }
        
        // ... (other notes)
    ],
    upcomingEvents: [
    {
        id: 1,
        title: "CSD Inspection",
        date: "April 25, 2025",
        priority: "high",
        description: "Events Description will be written here."
    },
    {
        id: 2,
        title: "Undocking & Fueling",
        date: "April 26, 2025",
        priority: "medium",
        description: "Events Description will be written here.."
    },
    {
        id: 3,
        title: "Galley Shifting and Ammunitaion",
        date: "April 27, 2025",
        priority: "normal",
        description: "Events Description will be written here.."
    },
    {
        id: 4,
        title: "Example Events title",
        date: "April 28, 2025",
        priority: "normal",
        description: "Events Description will be written here..."
    },
    {
        id: 4,
        title: "Example Events title",
        date: "April 29, 2025",
        priority: "normal",
        description: "Events Description will be written here..."
    }
]
};

// API service to fetch data (mocked for development)
const apiService = {
    /**
     * Fetch gallery data from API (mocked)
     * @returns {Promise<Array>} Gallery items
     */
    async fetchGallery() {
        // In production: Uncomment to fetch real API
        // const response = await fetch(API_ENDPOINTS.GALLERY);
        // return await response.json();

        // Mock: Simulate network delay (300ms) and return local data
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(dataModels.gallery);
            }, 300);
        });
    },

    /**
     * Fetch work progress data (mocked)
     * @returns {Promise<Array>} Progress items
     */
    async fetchWorkProgress() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(dataModels.workProgress);
            }, 300);
        });
    },

    /**
     * Fetch work plan data (mocked)
     * @returns {Promise<Array>} Work plans by date
     */
     // Add to apiService:
async fetchMajorIssues() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(dataModels.majorIssues);
        }, 300);
    });
},

    async fetchWorkPlan() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(dataModels.workPlan);
            }, 300);
        });
    },

    /**
     * Fetch priority notes (mocked)
     * @returns {Promise<Array>} Notes with priorities
     */
    async fetchNotes() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(dataModels.notes);
            }, 300);
        });
    },

    /**
     * Get detailed note by ID (mocked)
     * @param {number} noteId - Note ID to fetch
     * @returns {Promise<Object|null>} Note details or null if not found
     */
    async getNoteDetails(noteId) {
        return new Promise(resolve => {
            setTimeout(() => {
                const note = dataModels.notes.find(n => n.id == noteId);
                resolve(note ? note.details : null);
            }, 200);
        });
    },
    async fetchUpcomingEvents() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(dataModels.upcomingEvents);
        }, 300);
    });
},

    // --- OPTIONAL: Caching Layer (Improves Performance) ---
    _cache: new Map(), // Stores cached responses

    /**
     * Fetch data with caching (example for gallery)
     * @returns {Promise<Array>} Cached or fresh gallery data
     */
    async fetchGalleryCached() {
        const cacheKey = 'gallery';
        if (this._cache.has(cacheKey)) {
            return this._cache.get(cacheKey); // Return cached data
        }
        const data = await this.fetchGallery(); // Fetch fresh data
        this._cache.set(cacheKey, data);       // Cache it
        return data;
    }
};