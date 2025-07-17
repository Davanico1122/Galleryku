// Data gambar - Menggunakan gambar lokal di folder img/
const imageData = [
    {
        id: 'img1',
        src: 'img/gambar1.png',
        caption: 'Pemandangan Gunung Bromo di Pagi Hari yang Menakjubkan',
        tag: 'Alam',
        uploadedAt: '2025-01-15T08:30:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img2',
        src: 'img/gambar2.png',
        caption: 'Sunset di Pantai Kuta Bali yang Memukau',
        tag: 'Alam',
        uploadedAt: '2025-01-10T14:20:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img3',
        src: 'img/gambar3.png',
        caption: 'Gedung Pencakar Langit Jakarta di Malam Hari',
        tag: 'Arsitektur',
        uploadedAt: '2025-01-20T18:45:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img4',
        src: 'img/gambar4.png',
        caption: 'Gudeg Yogyakarta Tradisional yang Lezat',
        tag: 'Kuliner',
        uploadedAt: '2025-01-05T16:15:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img5',
        src: 'img/gambar5.png',
        caption: 'Moment Kebahagiaan Bersama Keluarga di Taman',
        tag: 'Keluarga',
        uploadedAt: '2025-01-25T10:00:00Z',
        width: 500,
        height: 500,
        orientation: 'square'
    },
    {
        id: 'img6',
        src: 'img/gambar6.png',
        caption: 'Perjalanan Road Trip Menuju Lembang Bandung',
        tag: 'Travel',
        uploadedAt: '2025-01-12T13:30:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img7',
        src: 'img/gambar7.png',
        caption: 'Keindahan Danau Toba dari Pulau Samosir',
        tag: 'Alam',
        uploadedAt: '2025-01-22T11:15:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img8',
        src: 'img/gambar8.png',
        caption: 'Sunrise di Candi Borobudur yang Menawan',
        tag: 'Arsitektur',
        uploadedAt: '2025-01-18T16:45:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img9',
        src: 'img/gambar9.png',
        caption: 'Rendang Padang Autentik yang Menggugah Selera',
        tag: 'Kuliner',
        uploadedAt: '2025-01-08T09:20:00Z',
        width: 500,
        height: 500,
        orientation: 'square'
    },
    {
        id: 'img10',
        src: 'img/gambar10.png',
        caption: 'Perayaan Ulang Tahun ke-25 Bersama Orang Terkasih',
        tag: 'Keluarga',
        uploadedAt: '2025-01-14T14:30:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    }
];

// Variabel global
let filteredImages = [...imageData];
let currentFilter = 'All';
let currentLightboxIndex = 0;
let scrollObserver;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const filterTags = document.getElementById('filterTags');
const sortSelect = document.getElementById('sortSelect');
const imageCount = document.getElementById('imageCount');
const emptyState = document.getElementById('emptyState');
const emptyStateMessage = document.getElementById('emptyStateMessage');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const imageCounter = document.getElementById('imageCounter');
const scrollToTop = document.getElementById('scrollToTop');
const totalImages = document.getElementById('totalImages');
// const totalLikes = document.getElementById('totalLikes'); // Removed favorites
const activeCategory = document.getElementById('activeCategory');
const currentFilterDisplay = document.getElementById('currentFilter');

// Enhanced Loading Screen Function - 3 seconds duration
function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    mainContent.style.opacity = '0';
    
    // Update loading screen statistics with real data
    const totalCategoriesElement = document.getElementById('totalCategories');
    if (totalCategoriesElement && imageData) {
        const uniqueCategories = [...new Set(imageData.map(img => img.tag))];
        totalCategoriesElement.textContent = uniqueCategories.length;
    }
    
    // Add loading animation class for progress bar
    const progressBar = document.querySelector('.loading-bar');
    if (progressBar) {
        progressBar.style.animation = 'loadingProgress 3s ease-in-out forwards, gradientShift 2s ease-in-out infinite';
    }
    
    // Enhanced fade out after 3 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'scale(1)';
        }, 500);
    }, 3000);
}

// Favorite system removed for cleaner interface

// Scroll Functions
function initScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.remove('translate-y-16', 'opacity-0');
            scrollToTop.classList.add('translate-y-0', 'opacity-100');
        } else {
            scrollToTop.classList.add('translate-y-16', 'opacity-0');
            scrollToTop.classList.remove('translate-y-0', 'opacity-100');
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function clearAllFilters() {
    currentFilter = 'All';
    searchInput.value = '';
    sortSelect.value = 'newest';
    createFilterTags();
    applyFilters();
}

function initScrollAnimations() {
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '50px' 
    });
}

// Filter Functions
function getUniqueTags() {
    const baseTags = [...new Set(imageData.map(img => img.tag))];
    const orientationTags = ['Portrait', 'Landscape', 'Square'];
    return ['All', ...baseTags, ...orientationTags];
}

function createFilterTags() {
    const tags = getUniqueTags();
    filterTags.innerHTML = '';
    
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = `px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform shadow-md hover:scale-105 hover:shadow-lg ${
            tag === currentFilter 
                ? 'bg-gray-800 text-white shadow-xl scale-105 ring-2 ring-gray-300' 
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-50'
        }`;
        button.textContent = tag;
        button.onclick = () => filterByTag(tag);
        filterTags.appendChild(button);
    });
}

function filterByTag(tag) {
    currentFilter = tag;
    createFilterTags();
    applyFilters();
}

function sortImages(images, sortType) {
    return [...images].sort((a, b) => {
        if (sortType === 'most-liked') {
            const likesA = isFavorite(a.id) ? 1 : 0;
            const likesB = isFavorite(b.id) ? 1 : 0;
            if (likesA !== likesB) return likesB - likesA;
        }
        
        const dateA = new Date(a.uploadedAt);
        const dateB = new Date(b.uploadedAt);
        
        if (sortType === 'newest' || sortType === 'most-liked') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
}

function searchImages(images, searchTerm) {
    if (!searchTerm) return images;
    
    const term = searchTerm.toLowerCase();
    return images.filter(img => 
        img.caption.toLowerCase().includes(term) ||
        img.tag.toLowerCase().includes(term) ||
        formatDate(img.uploadedAt).toLowerCase().includes(term)
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function applyFilters() {
    let result = [...imageData];
    
    if (currentFilter === 'Portrait') {
        result = result.filter(img => img.orientation === 'portrait');
    } else if (currentFilter === 'Landscape') {
        result = result.filter(img => img.orientation === 'landscape');
    } else if (currentFilter === 'Square') {
        result = result.filter(img => img.orientation === 'square');
    } else if (currentFilter !== 'All') {
        result = result.filter(img => img.tag === currentFilter);
    }
    
    const searchTerm = searchInput.value.trim();
    result = searchImages(result, searchTerm);
    
    const sortType = sortSelect.value;
    result = sortImages(result, sortType);
    
    filteredImages = result;
    updateStatistics();
    renderGallery();
}

function updateStatistics() {
    totalImages.textContent = `Total: ${imageData.length} foto`;
    activeCategory.textContent = `Kategori: ${currentFilter}`;
    imageCount.textContent = filteredImages.length;
    
    // Update categories count in header
    const uniqueCategories = [...new Set(imageData.map(img => img.tag))];
    const headerCategories = document.getElementById('headerCategories');
    if (headerCategories) {
        headerCategories.textContent = `${uniqueCategories.length} kategori`;
    }
    
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        currentFilterDisplay.classList.remove('hidden');
        currentFilterDisplay.textContent = `Pencarian: "${searchTerm}"`;
    } else {
        currentFilterDisplay.classList.add('hidden');
    }
    
    if (filteredImages.length === 0) {
        if (searchTerm) {
            emptyStateMessage.textContent = `Tidak ada gambar ditemukan untuk "${searchTerm}"`;
        } else {
            emptyStateMessage.textContent = 'Tidak ada gambar ditemukan dengan filter ini.';
        }
    }
}

// Gallery Card Creation - Optimized for Grid Layout
function createImageCard(image, index) {
    const card = document.createElement('div');
    card.className = 'gallery-item opacity-0 translate-y-4 transition-all duration-500 h-fit';
    card.style.transitionDelay = `${index * 50}ms`;
    
    card.innerHTML = `
        <div class="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1 flex flex-col h-full">
            <div class="relative overflow-hidden bg-gray-50 flex-shrink-0">
                <img 
                    src="${image.src}" 
                    alt="${image.caption}"
                    class="w-full h-48 group-hover:scale-105 transition-transform duration-500 object-cover"
                    loading="lazy"
                >
                
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div class="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
                        <div class="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 shadow-md">
                            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="p-4">
                <h3 class="font-medium text-gray-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-gray-700 transition-colors">${image.caption}</h3>
                
                <div class="flex items-center justify-between mb-3">
                    <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        ${image.tag}
                    </span>
                    <span class="text-xs text-gray-500">${image.orientation}</span>
                </div>
                
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${formatDate(image.uploadedAt)}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
                        </svg>
                        ${image.width}×${image.height}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        openLightbox(index);
    });
    
    return card;
}

function renderGallery() {
    galleryGrid.innerHTML = '';
    
    if (filteredImages.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }
    
    filteredImages.forEach((image, index) => {
        const card = createImageCard(image, index);
        galleryGrid.appendChild(card);
        
        if (scrollObserver) {
            scrollObserver.observe(card);
        }
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50 + 100);
    });
}

// LIGHTBOX FUNCTIONS - TEMA TERANG CLEAN
function openLightbox(index) {
    currentLightboxIndex = index;
    const image = filteredImages[index];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.caption;
    
    // Update caption dengan tema terang
    lightboxCaption.innerHTML = `
        <div class="text-center">
            <h3 class="text-lg font-semibold mb-3 text-gray-900">${image.caption}</h3>
            <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    ${image.tag}
                </span>
                <span class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    ${formatDate(image.uploadedAt)}
                </span>
                <span class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
                    </svg>
                    ${image.width} × ${image.height}
                </span>
            </div>
        </div>
    `;
    
    imageCounter.textContent = `${index + 1} / ${filteredImages.length}`;
    
    // Show lightbox dengan fade animation
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.add('opacity-100');
        lightbox.classList.remove('opacity-0');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    // Update navigation visibility
    prevImage.style.display = filteredImages.length > 1 ? 'flex' : 'none';
    nextImage.style.display = filteredImages.length > 1 ? 'flex' : 'none';
}

function closeLightboxModal() {
    lightbox.classList.add('opacity-0');
    lightbox.classList.remove('opacity-100');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

function showPreviousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    openLightbox(currentLightboxIndex);
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    openLightbox(currentLightboxIndex);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
    initScrollToTop();
    initScrollAnimations();
    createFilterTags();
    applyFilters();
    
    // Search dengan debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
    
    sortSelect.addEventListener('change', applyFilters);
    
    // Keyboard navigation untuk lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeLightboxModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    showNextImage();
                    break;
            }
        }
    });
});