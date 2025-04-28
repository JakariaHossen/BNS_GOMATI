class AppController {
    constructor() {
    // DOM elements
    this.mainImage = document.getElementById('main-image');
    this.workTitle = document.getElementById('work-title');
    this.workDescription = document.getElementById('work-description');
    this.thumbnailsContainer = document.querySelector('.thumbnails-container');
    this.thumbnailsCount = document.getElementById('thumbnails-count');
    this.menuBtn = document.getElementById('menu-btn');
    this.menuPopup = document.getElementById('menu-popup');
    this.workProgressList = document.getElementById('work-progress-list');
    this.issuesList = document.getElementById('issues-list');
    this.workPlanScroll = document.getElementById('work-plan-scroll');
    this.prevDayBtn = document.getElementById('prev-day-btn');
    this.nextDayBtn = document.getElementById('next-day-btn');
    this.downloadBtn = document.getElementById('download-btn');
    this.notePopup = document.getElementById('note-popup');
    this.notePopupClose = document.getElementById('note-popup-close');
    this.notePopupTitle = document.getElementById('note-popup-title');
    this.notePopupText = document.getElementById('note-popup-text');
    this.notesList = document.getElementById('notes-list');
    this.header = document.querySelector('.header');
    this.eventsList = document.getElementById('events-list'); // Make sure this matches the ID in HTML

    // Configuration
    this.MIN_LOAD_TIME = 1200; // Minimum skeleton display time in ms
    this.currentIndex = 0;
    this.currentDayIndex = 0;

    // Initialize
    this.init();
}

    async init() {
        this.setupEventListeners();
        this.setupHeaderScroll();
        await this.loadData();
    }

    async loadData() {
        const loadStart = Date.now();
        document.body.classList.add('loading');

        try {
            // Load all data concurrently
            const [galleryData, workPlanData, notesData, workProgressData, majorIssuesData, eventsData] = await Promise.all([
    this.fetchWithDelay(apiService.fetchGallery()),
    this.fetchWithDelay(apiService.fetchWorkPlan()),
    this.fetchWithDelay(apiService.fetchNotes()),
    this.fetchWithDelay(apiService.fetchWorkProgress()),
    this.fetchWithDelay(apiService.fetchMajorIssues()),
    this.fetchWithDelay(apiService.fetchUpcomingEvents()) // New
]);

            // Render content
            this.renderGallery(galleryData);
            this.renderWorkPlan(workPlanData);
            this.renderNotes(notesData);
            this.renderWorkProgress(workProgressData);
            this.renderMajorIssues(majorIssuesData);
            this.renderUpcomingEvents(eventsData);

        } catch (error) {
            console.error('Failed to load data:', error);
            this.showErrorToast('Faild to load data, Please reload');
            // Optional: Show error state to user
        } finally {
            // Ensure minimum loading time
            const loadDuration = Date.now() - loadStart;
            if (loadDuration < this.MIN_LOAD_TIME) {
                await new Promise(r => setTimeout(r, this.MIN_LOAD_TIME - loadDuration));
            }
            document.body.classList.remove('loading');
        }
    }

   async fetchWithDelay(promise) {
         const start = Date.now();
         const result = await promise;
         const duration = Date.now() - start;
         if (duration < 300) {
             await new Promise(r => setTimeout(r, 300 - duration));
         }
         return result;
     }

    renderGallery(galleryData) {
        if (!galleryData?.length) return;

        // Set main image
        this.mainImage.src = galleryData[0].image;
        this.mainImage.onload = () => {
            this.mainImage.style.opacity = 1;
        };

        // Set info
        this.workTitle.textContent = galleryData[0].title;
        this.workDescription.textContent = galleryData[0].description;

        // Create thumbnails
        this.thumbnailsContainer.innerHTML = '';
        galleryData.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            
            const img = new Image();
            img.src = item.image;
            img.alt = `Thumbnail ${index + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.style.opacity = 0;
            img.onload = () => {
                img.style.opacity = 1;
            };
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => this.showGalleryItem(index, galleryData));
            this.thumbnailsContainer.appendChild(thumbnail);
        });

        this.updateCounter(0, galleryData.length);
    }

    showGalleryItem(index, galleryData) {
        this.currentIndex = index;
        const item = galleryData[index];
        
        this.mainImage.style.opacity = 0;
        this.mainImage.onload = () => {
            this.mainImage.style.opacity = 1;
        };
        this.mainImage.src = item.image;
        
        this.workTitle.textContent = item.title;
        this.workDescription.textContent = item.description;
        this.updateCounter(index, galleryData.length);
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    updateCounter(current, total) {
        this.thumbnailsCount.textContent = `${current + 1}/${total}`;
    }
// render work progress data 
renderWorkProgress(workProgressData) {
    if (!workProgressData?.length) return;

    this.workProgressList.innerHTML = '';
    workProgressData.forEach(item => {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        
        const orderNumber = document.createElement('div');
        orderNumber.className = 'progress-order-number';
        orderNumber.textContent = item.orderNumber;
        
        const description = document.createElement('div');
        description.className = 'progress-description';
        description.textContent = item.description;
        
        const progress = document.createElement('div');
        progress.className = `progress-status progress-${item.progress.toLowerCase().replace('%','')}`;
        progress.textContent = item.progress;
        
        progressItem.appendChild(orderNumber);
        progressItem.appendChild(description);
        progressItem.appendChild(progress);
        this.workProgressList.appendChild(progressItem);
    });
}

renderMajorIssues(issuesData) {
    if (!issuesData?.length) return;

    this.issuesList.innerHTML = '';
    issuesData.forEach(issue => {
        const issueEl = document.createElement('div');
        issueEl.className = 'issue-item';
        
        // Content container (left-aligned)
        const content = document.createElement('div');
        content.className = 'issue-content';
        content.innerHTML = `
            <div class="issue-title">${issue.title}</div>
            <div class="issue-meta">
                <span class="issue-severity severity-${issue.severity.toLowerCase()}">
                    ${issue.severity}
                </span>
                ${issue.assignedTo}
            </div>
        `;
        
        // Download container (right-aligned)
        const downloadContainer = document.createElement('div');
        downloadContainer.className = 'issue-download-container';
        
        const download = document.createElement('div');
        download.className = 'issue-download';
        download.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        `;
        download.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(issue.downloadUrl, '_blank');
        });
        
        downloadContainer.appendChild(download);
        issueEl.appendChild(content);
        issueEl.appendChild(downloadContainer);
        this.issuesList.appendChild(issueEl);
    });
}
// render work plan data 
    renderWorkPlan(workPlanData) {
        if (!workPlanData?.length) return;

        this.workPlanScroll.innerHTML = '';
        workPlanData.forEach((day, index) => {
            const dayEl = document.createElement('div');
            dayEl.className = 'work-plan-day';
            
            // Date
            const dateEl = document.createElement('div');
            dateEl.className = 'work-plan-date';
            dateEl.textContent = day.date;
            dayEl.appendChild(dateEl);
            
            // Tasks
            const listEl = document.createElement('div');
            listEl.className = 'work-plan-list';
            
            const table = document.createElement('table');
            table.className = 'work-plan-table';
            
            day.tasks.forEach((task, i) => {
                const row = document.createElement('tr');
                const numCell = document.createElement('td');
                numCell.textContent = `${i + 1}.`;
                const taskCell = document.createElement('td');
                taskCell.textContent = task;
                
                row.appendChild(numCell);
                row.appendChild(taskCell);
                table.appendChild(row);
            });
            
            listEl.appendChild(table);
            dayEl.appendChild(listEl);
            this.workPlanScroll.appendChild(dayEl);
        });

        this.updateDayButtons();
    }

    updateDayButtons() {
        const days = this.workPlanScroll.querySelectorAll('.work-plan-day');
        this.prevDayBtn.disabled = this.currentDayIndex === 0;
        this.nextDayBtn.disabled = this.currentDayIndex >= days.length - 1;
    }

    scrollToDay(index) {
        this.currentDayIndex = index;
        this.workPlanScroll.scrollTo({
            left: this.workPlanScroll.offsetWidth * index,
            behavior: 'smooth'
        });
        this.updateDayButtons();
    }

    renderNotes(notesData) {
        if (!notesData?.length) return;

        this.notesList.innerHTML = '';
        notesData.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = 'note-item';
            
            // Priority
            const priority = document.createElement('div');
            priority.className = `note-priority priority-${note.priority}`;
            noteEl.appendChild(priority);
            
            // Content
            const content = document.createElement('div');
            content.className = 'note-content';
            content.textContent = note.content;
            noteEl.appendChild(content);
            
            // Info icon
            const info = document.createElement('div');
            info.className = 'note-info';
            info.dataset.noteId = note.id;
            info.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
            `;
            noteEl.appendChild(info);
            
            this.notesList.appendChild(noteEl);
        });

        this.setupNoteInfo();
    }

    setupNoteInfo() {
    // Handle note info clicks (same as before)
    document.querySelectorAll('.note-info').forEach(info => {
        info.addEventListener('click', () => {
            const noteId = parseInt(info.dataset.noteId);
            const note = dataModels.notes.find(n => n.id === noteId);
            
            if (note) {
                this.notePopupTitle.textContent = note.details.title;
                this.notePopupText.textContent = note.details.text;
                this.notePopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // RE-ADD THE CLOSE FUNCTIONALITY (MISSING IN THE PREVIOUS FIX)
    this.notePopupClose.addEventListener('click', () => {
        this.notePopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    this.notePopup.addEventListener('click', (e) => {
        if (e.target === this.notePopup) { // Clicked on the overlay (outside popup)
            this.notePopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
    
    renderUpcomingEvents(eventsData) {
    if (!eventsData?.length) return;

    this.eventsList.innerHTML = '';
    eventsData.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.className = 'event-item';
        
        // Priority indicator
        const priority = document.createElement('div');
        priority.className = `event-priority priority-${event.priority}`;
        eventEl.appendChild(priority);
        
        // Content
        const content = document.createElement('div');
        content.className = 'event-content';
        content.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-date">${event.date}</div>
        `;
        eventEl.appendChild(content);
        
        // Info icon
        const info = document.createElement('div');
        info.className = 'event-info';
        info.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
        `;
        info.addEventListener('click', () => this.showEventDetails(event));
        eventEl.appendChild(info);
        
        this.eventsList.appendChild(eventEl);
    });
}

showEventDetails(event) {
    this.notePopupTitle.textContent = event.title;
    this.notePopupText.innerHTML = `
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.description}</p>
    `;
    this.notePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

    setupHeaderScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
         // Throttle to 1 call per 100ms
         if (!this.scrollTimeout) {
             this.scrollTimeout = setTimeout(() => {
                 this.scrollTimeout = null;
        // Don't hide header during loading
        if (document.body.classList.contains('loading')) return;
        
        const currentScroll = window.scrollY;
        if (currentScroll <= 0) {
            this.header.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && !this.header.classList.contains('hidden')) {
            this.header.classList.add('hidden');
        } else if (currentScroll < lastScroll && this.header.classList.contains('hidden')) {
            this.header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
                 // Your existing scroll logic...
             }, 100);
         }
    }, { passive: true });
}
    setupEventListeners() {
        // Menu toggle
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.menuPopup.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuBtn.contains(e.target) && !this.menuPopup.contains(e.target)) {
                this.menuPopup.classList.remove('active');
            }
        });

        // Work plan navigation
        this.prevDayBtn.addEventListener('click', () => {
            if (this.currentDayIndex > 0) {
                this.scrollToDay(this.currentDayIndex - 1);
            }
        });

        this.nextDayBtn.addEventListener('click', () => {
            this.scrollToDay(this.currentDayIndex + 1);
        });

        // Download button
        this.downloadBtn.addEventListener('click', () => {
            alert('PDF download functionality would go here');
        });

        // Touch swipe for work plan
        this.setupSwipeNavigation();
    }

    setupSwipeNavigation() {
        let touchStartX = 0;
        
        this.workPlanScroll.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.workPlanScroll.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50 && this.currentDayIndex < this.workPlanScroll.children.length - 1) {
                this.scrollToDay(this.currentDayIndex + 1); // Swipe left
            } else if (diff < -50 && this.currentDayIndex > 0) {
                this.scrollToDay(this.currentDayIndex - 1); // Swipe right
            }
        }, { passive: true });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AppController();
});