document.addEventListener('DOMContentLoaded', () => {
            // Elements
            const galleryGrid = document.getElementById('galleryGrid');
            const dateFilters = document.getElementById('dateFilters');
            const searchInput = document.getElementById('searchInput');
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDate = document.getElementById('modalDate');
            const modalDescription = document.getElementById('modalDescription');
            const closeModal = document.getElementById('closeModal');
            const downloadBtn = document.getElementById('downloadBtn');

            // Data
            let allItems = [];
            let currentDateFilter = null;
            let uniqueDates = [];
            let currentItem = null;

            // Check for pre-loaded data
            const preloadedData = sessionStorage.getItem('galleryData');
            if (preloadedData) {
                allItems = JSON.parse(preloadedData);
                sessionStorage.removeItem('galleryData');
                
                // Extract unique dates from pre-loaded data
                const dates = new Set();
                allItems.forEach(item => {
                    let imgDate = item.imgDate || 1;
                    // If date is just a number, format it as YYYY-MM-DD
                    if (/^\d+$/.test(imgDate)) {
                        const day = String(imgDate).padStart(2, '0');
                        imgDate = `2025-04-${day}`;
                    }
                    dates.add(imgDate);
                    item.imgDate = imgDate; // Update the item with formatted date
                });
                
                uniqueDates = Array.from(dates).sort();
                
                renderItems(allItems);
                createDateFilters();
            } else {
                // If no pre-loaded data, fetch from Firestore
                showLoadingSkeleton();
                loadItems();
            }

            // Show loading skeleton
            function showLoadingSkeleton() {
                galleryGrid.innerHTML = '';
                for (let i = 0; i < 8; i++) {
                    const skeletonCard = document.createElement('div');
                    skeletonCard.className = 'gallery-card bg-white rounded-lg overflow-hidden shadow-md skeleton';
                    skeletonCard.innerHTML = `
                        <div class="skeleton-img"></div>
                        <div class="p-4">
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text short"></div>
                        </div>
                    `;
                    galleryGrid.appendChild(skeletonCard);
                }
            }

            // Create date filter buttons based on unique dates
            function createDateFilters() {
                dateFilters.innerHTML = '';
                
                // Add "All" button
                const allBtn = document.createElement('button');
                allBtn.textContent = 'All';
                allBtn.className = 'date-filter-btn px-4 py-2 bg-blue-500 text-white rounded-lg active';
                allBtn.onclick = () => {
                    document.querySelectorAll('.date-filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    allBtn.classList.add('active');
                    filterByDate(null);
                };
                dateFilters.appendChild(allBtn);

                // Add date buttons for each unique date
                uniqueDates.forEach(date => {
                    const btn = document.createElement('button');
                    // Extract just the day number from the date (e.g., "04" from "2025-04-04")
                    const dayNumber = date.split('-')[2];
                    btn.textContent = dayNumber;
                    btn.className = 'date-filter-btn px-4 py-2 bg-gray-200 rounded-lg mx-1';
                    btn.dataset.date = date;
                    btn.onclick = () => {
                        document.querySelectorAll('.date-filter-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        btn.classList.add('active');
                        filterByDate(date);
                    };
                    dateFilters.appendChild(btn);
                });
            }

            // Load items from Firestore
            function loadItems() {
                db.collection("items").get()
                    .then((querySnapshot) => {
                        allItems = [];
                        const dates = new Set();
                        
                        querySnapshot.forEach((doc) => {
                            const data = doc.data();
                            if (data.title && data.imageUrl) {
                                let imgDate = data.imgDate || '2025-04-01';
                                
                                // If imgDate is just a number, convert to full date
                                if (/^\d+$/.test(imgDate)) {
                                    const day = String(imgDate).padStart(2, '0');
                                    imgDate = `2025-04-${day}`;
                                }
                                
                                allItems.push({
                                    id: doc.id,
                                    title: data.title,
                                    description: data.description || '',
                                    imageUrl: data.imageUrl,
                                    imgDate: imgDate
                                });
                                
                                dates.add(imgDate);
                            }
                        });
                        
                        // Convert Set to array and sort dates
                        uniqueDates = Array.from(dates).sort();
                        
                        createDateFilters();
                        renderItems(allItems);
                    })
                    .catch((error) => {
                        console.error("Error getting documents: ", error);
                        galleryGrid.innerHTML = '<div class="col-span-full text-center py-10 text-red-500">Error loading items. Please check console.</div>';
                    });
            }

            // Render items to gallery
            function renderItems(items) {
                if (items.length === 0) {
                    galleryGrid.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500">No items found</div>';
                    return;
                }
                
                galleryGrid.innerHTML = '';
                
                items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'gallery-card bg-white rounded-lg overflow-hidden shadow-md';
                    card.innerHTML = `
                        <div class="relative h-48 overflow-hidden">
                            <img src="${item.imageUrl}" alt="${item.title}" 
                                 class="w-full h-full object-cover cursor-pointer transition duration-300 hover:scale-105">
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-lg mb-1 truncate">${item.title}</h3>
                            <p class="text-gray-500 text-sm">Date: ${item.imgDate}</p>
                        </div>
                    `;
                    card.querySelector('img').addEventListener('click', () => openModal(item));
                    galleryGrid.appendChild(card);
                });
            }

            // Filter by date
            function filterByDate(date) {
                currentDateFilter = date;
                applyFilters();
            }

            // Apply both date and search filters
            function applyFilters() {
                let filtered = [...allItems];
                
                // Date filter
                if (currentDateFilter !== null) {
                    filtered = filtered.filter(item => item.imgDate === currentDateFilter);
                }
                
                // Search filter
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm) {
                    filtered = filtered.filter(item => 
                        item.title.toLowerCase().includes(searchTerm)
                    );
                }
                
                renderItems(filtered);
            }

            // Open modal with item details
            function openModal(item) {
                currentItem = item; // Store the current item
                modalImage.src = item.imageUrl;
                modalTitle.textContent = item.title;
                modalDate.textContent = `Date: ${item.imgDate}`;
                modalDescription.textContent = item.description || 'No description available';
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }

            // Close modal
            function closeModalFunc() {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            
            closeModal.onclick = closeModalFunc;
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });
            
            // Close with ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModalFunc();
                }
            });

            // Search functionality
            searchInput.addEventListener('input', () => {
                applyFilters();
            });

            // Download functionality
            downloadBtn.addEventListener('click', async () => {
                if (!currentItem) return;
                
                try {
                    const response = await fetch(currentItem.imageUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    
                    // Create temporary anchor
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${currentItem.title.replace(/\s+/g, '_')}_${currentItem.imgDate}.${getFileExtension(currentItem.imageUrl)}`;
                    document.body.appendChild(a);
                    a.click();
                    
                    // Cleanup
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                } catch (error) {
                    console.error('Download failed:', error);
                    alert('Failed to download image. Please try again.');
                }
            });

            // Helper function to get file extension
            function getFileExtension(url) {
                return url.split('.').pop().split(/[?#]/)[0] || 'jpg';
            }
        });