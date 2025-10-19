// Gallery Data
const galleryData = [
    {
        id: 1,
        title: "Mountain Sunrise",
        description: "Beautiful sunrise over mountain peaks",
        category: "nature",
        image: "https://picsum.photos/seed/mountain1/400/300.jpg",
        date: "2024-01-15"
    },
    {
        id: 2,
        title: "Modern Architecture",
        description: "Contemporary building design",
        category: "architecture",
        image: "https://picsum.photos/seed/building1/400/300.jpg",
        date: "2024-01-14"
    },
    {
        id: 3,
        title: "Forest Path",
        description: "Serene pathway through the woods",
        category: "nature",
        image: "https://picsum.photos/seed/forest1/400/300.jpg",
        date: "2024-01-13"
    },
    {
        id: 4,
        title: "City Lights",
        description: "Urban nightscape photography",
        category: "architecture",
        image: "https://picsum.photos/seed/city1/400/300.jpg",
        date: "2024-01-12"
    },
    {
        id: 5,
        title: "Portrait Session",
        description: "Professional portrait photography",
        category: "people",
        image: "https://picsum.photos/seed/portrait1/400/300.jpg",
        date: "2024-01-11"
    },
    {
        id: 6,
        title: "Wildlife Safari",
        description: "Animals in their natural habitat",
        category: "animals",
        image: "https://picsum.photos/seed/animal1/400/300.jpg",
        date: "2024-01-10"
    },
    {
        id: 7,
        title: "Tech Innovation",
        description: "Latest technology showcase",
        category: "technology",
        image: "https://picsum.photos/seed/tech1/400/300.jpg",
        date: "2024-01-09"
    },
    {
        id: 8,
        title: "Ocean Waves",
        description: "Powerful ocean photography",
        category: "nature",
        image: "https://picsum.photos/seed/ocean1/400/300.jpg",
        date: "2024-01-08"
    },
    {
        id: 9,
        title: "Street Photography",
        description: "Urban life captured",
        category: "people",
        image: "https://picsum.photos/seed/street1/400/300.jpg",
        date: "2024-01-07"
    },
    {
        id: 10,
        title: "Bridge Design",
        description: "Engineering marvel",
        category: "architecture",
        image: "https://picsum.photos/seed/bridge1/400/300.jpg",
        date: "2024-01-06"
    },
    {
        id: 11,
        title: "Cute Pets",
        description: "Adorable animal companions",
        category: "animals",
        image: "https://picsum.photos/seed/pet1/400/300.jpg",
        date: "2024-01-05"
    },
    {
        id: 12,
        title: "Coding Session",
        description: "Programming in action",
        category: "technology",
        image: "https://picsum.photos/seed/code1/400/300.jpg",
        date: "2024-01-04"
    }
];

// Global Variables
let currentFilter = 'all';
let currentView = 'grid';
let currentLightboxIndex = 0;
let filteredImages = [];
let imagesLoaded = 0;
const imagesPerLoad = 6;

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxIndex = document.getElementById('lightboxIndex');
const lightboxThumbnails = document.getElementById('lightboxThumbnails');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    loadImages();
});

// Initialize Gallery
function initializeGallery() {
    filteredImages = [...galleryData];
    updateGalleryView();
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterImages();
        });
    });

    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            updateGalleryView();
        });
    });

    // Search input
    searchInput.addEventListener('input', debounce(function() {
        searchImages(this.value);
    }, 300));

    // Lightbox controls
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', showPrevImage);
    document.getElementById('lightboxNext').addEventListener('click', showNextImage);

    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreImages);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Click outside lightbox to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Load Images
function loadImages() {
    showLoadingSpinner();
    const imagesToShow = filteredImages.slice(0, imagesPerLoad);
    
    imagesToShow.forEach((image, index) => {
        setTimeout(() => {
            createGalleryItem(image);
            imagesLoaded++;
            
            if (imagesLoaded === imagesToShow.length) {
                hideLoadingSpinner();
                if (filteredImages.length > imagesPerLoad) {
                    loadMoreBtn.style.display = 'inline-flex';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }
        }, index * 100);
    });
}

// Load More Images
function loadMoreImages() {
    const currentImageCount = galleryGrid.children.length;
    const imagesToShow = filteredImages.slice(currentImageCount, currentImageCount + imagesPerLoad);
    
    if (imagesToShow.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    showLoadingSpinner();
    
    imagesToShow.forEach((image, index) => {
        setTimeout(() => {
            createGalleryItem(image);
            
            if (index === imagesToShow.length - 1) {
                hideLoadingSpinner();
                if (currentImageCount + imagesToShow.length >= filteredImages.length) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        }, index * 100);
    });
}

// Create Gallery Item
function createGalleryItem(imageData) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = imageData.category;
    item.dataset.id = imageData.id;
    
    item.innerHTML = `
        <div class="gallery-image-container">
            <img src="${imageData.image}" alt="${imageData.title}" class="gallery-image" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                </div>
            </div>
            <span class="gallery-category">${imageData.category}</span>
        </div>
        <div class="gallery-details">
            <h3>${imageData.title}</h3>
            <p>${imageData.description}</p>
            <div class="gallery-meta">
                <span class="gallery-date">${formatDate(imageData.date)}</span>
                <div class="gallery-actions">
                    <button class="action-btn like-btn" onclick="likeImage(${imageData.id})">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn share-btn" onclick="shareImage(${imageData.id})">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    item.addEventListener('click', function(e) {
        if (!e.target.closest('.gallery-actions')) {
            openLightbox(imageData.id);
        }
    });
    
    galleryGrid.appendChild(item);
}

// Filter Images
function filterImages() {
    galleryGrid.innerHTML = '';
    imagesLoaded = 0;
    
    if (currentFilter === 'all') {
        filteredImages = [...galleryData];
    } else {
        filteredImages = galleryData.filter(img => img.category === currentFilter);
    }
    
    if (filteredImages.length === 0) {
        showNoResults();
        return;
    }
    
    loadImages();
    showToast(`Showing ${filteredImages.length} ${currentFilter === 'all' ? 'images' : currentFilter + ' images'}`);
}

// Search Images
function searchImages(query) {
    if (!query) {
        filterImages();
        return;
    }
    
    galleryGrid.innerHTML = '';
    imagesLoaded = 0;
    
    const searchQuery = query.toLowerCase();
    filteredImages = galleryData.filter(img => 
        img.title.toLowerCase().includes(searchQuery) ||
        img.description.toLowerCase().includes(searchQuery) ||
        img.category.toLowerCase().includes(searchQuery)
    );
    
    if (filteredImages.length === 0) {
        showNoResults();
        return;
    }
    
    loadImages();
    showToast(`Found ${filteredImages.length} results for "${query}"`);
}

// Update Gallery View
function updateGalleryView() {
    if (currentView === 'list') {
        galleryGrid.classList.add('list-view');
    } else {
        galleryGrid.classList.remove('list-view');
    }
}

// Open Lightbox
function openLightbox(imageId) {
    const index = filteredImages.findIndex(img => img.id === imageId);
    if (index === -1) return;
    
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update Lightbox
function updateLightbox() {
    const image = filteredImages[currentLightboxIndex];
    
    lightboxImage.src = image.image;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxCategory.textContent = image.category;
    lightboxIndex.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
    
    // Update thumbnails
    lightboxThumbnails.innerHTML = '';
    filteredImages.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.image;
        thumb.className = 'lightbox-thumbnail';
        if (index === currentLightboxIndex) {
            thumb.classList.add('active');
        }
        thumb.addEventListener('click', () => {
            currentLightboxIndex = index;
            updateLightbox();
        });
        lightboxThumbnails.appendChild(thumb);
    });
}

// Show Previous Image
function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

// Show Next Image
function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightbox();
}

// Like Image
function likeImage(imageId) {
    event.stopPropagation();
    const btn = event.target.closest('.like-btn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#e53e3e';
        showToast('Image added to favorites!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = '';
        showToast('Image removed from favorites');
    }
}

// Share Image
function shareImage(imageId) {
    event.stopPropagation();
    const image = galleryData.find(img => img.id === imageId);
    
    if (navigator.share) {
        navigator.share({
            title: image.title,
            text: image.description,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showToast('Link copied to clipboard!');
    }
}

// Show No Results Message
function showNoResults() {
    galleryGrid.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No images found</h3>
            <p>Try adjusting your filters or search terms</p>
        </div>
    `;
    loadMoreBtn.style.display = 'none';
}

// Show Loading Spinner
function showLoadingSpinner() {
    loadingSpinner.classList.add('active');
}

// Hide Loading Spinner
function hideLoadingSpinner() {
    loadingSpinner.classList.remove('active');
}

// Show Toast Notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with loading="lazy"
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console Welcome Message
console.log('%c📸 Image Gallery Loaded Successfully!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cFeatures: Filter, Search, Lightbox, Responsive Design', 'font-size: 14px; color: #718096;');