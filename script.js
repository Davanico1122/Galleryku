// Data gambar - Ganti dengan gambar Anda sendiri
const imageData = [
    {
        id: 'img1',
        src: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Gunung+Bromo',
        caption: 'Pemandangan Gunung Bromo di Pagi Hari yang Menakjubkan',
        tag: 'Alam',
        uploadedAt: '2025-01-15T08:30:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img2',
        src: 'https://via.placeholder.com/400x600/06B6D4/FFFFFF?text=Pantai+Kuta',
        caption: 'Sunset di Pantai Kuta Bali yang Memukau',
        tag: 'Alam',
        uploadedAt: '2025-01-10T14:20:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img3',
        src: 'https://via.placeholder.com/600x400/059669/FFFFFF?text=Jakarta+Skyline',
        caption: 'Gedung Pencakar Langit Jakarta di Malam Hari',
        tag: 'Arsitektur',
        uploadedAt: '2025-01-20T18:45:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img4',
        src: 'https://via.placeholder.com/400x600/DC2626/FFFFFF?text=Nasi+Gudeg',
        caption: 'Gudeg Yogyakarta Tradisional yang Lezat',
        tag: 'Kuliner',
        uploadedAt: '2025-01-05T16:15:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img5',
        src: 'https://via.placeholder.com/500x500/7C3AED/FFFFFF?text=Keluarga+Bahagia',
        caption: 'Moment Kebahagiaan Bersama Keluarga di Taman',
        tag: 'Keluarga',
        uploadedAt: '2025-01-25T10:00:00Z',
        width: 500,
        height: 500,
        orientation: 'square'
    },
    {
        id: 'img6',
        src: 'https://via.placeholder.com/600x400/EA580C/FFFFFF?text=Road+Trip+Bandung',
        caption: 'Perjalanan Road Trip Menuju Lembang Bandung',
        tag: 'Travel',
        uploadedAt: '2025-01-12T13:30:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img7',
        src: 'https://via.placeholder.com/400x600/0EA5E9/FFFFFF?text=Danau+Toba',
        caption: 'Keindahan Danau Toba dari Pulau Samosir',
        tag: 'Alam',
        uploadedAt: '2025-01-22T11:15:00Z',
        width: 400,
        height: 600,
        orientation: 'portrait'
    },
    {
        id: 'img8',
        src: 'https://via.placeholder.com/600x400/15803D/FFFFFF?text=Candi+Borobudur',
        caption: 'Sunrise di Candi Borobudur yang Menawan',
        tag: 'Arsitektur',
        uploadedAt: '2025-01-18T16:45:00Z',
        width: 600,
        height: 400,
        orientation: 'landscape'
    },
    {
        id: 'img9',
        src: 'https://via.placeholder.com/500x500/BE123C/FFFFFF?text=Rendang+Padang',
        caption: 'Rendang Padang Autentik yang Menggugah Selera',
        tag: 'Kuliner',
        uploadedAt: '2025-01-08T09:20:00Z',
        width: 500,
        height: 500,
        orientation: 'square'
    },
    {
        id: 'img10',
        src: 'https://via.placeholder.com/400x600/7C2D12/FFFFFF?text=Ulang+Tahun',
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
let favorites = JSON.parse(localStorage.getItem('galleryFavorites')) || [];

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
const activeCategory = document.getElementById('activeCategory');
const currentFilterDisplay = document.getElementById('currentFilter');

// Fungsi untuk menampilkan loading screen
function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
    mainContent.style.opacity = '0';
    
    // Sembunyikan loading screen setelah 1 detik saja
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 300);
    }, 1000);
}

// Favorite Functions
function toggleFavorite(imageId) {
    const index = favorites.indexOf(imageId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(imageId);
    }
    localStorage.setItem('galleryFavorites', JSON.stringify(favorites));
    
    // Update hanya tombol favorit yang diklik tanpa refresh
    updateFavoriteButton(imageId);
    updateStatistics();
}

function isFavorite(imageId) {
    return favorites.includes(imageId);
}

// Fungsi untuk update tombol favorit tanpa refresh
function updateFavoriteButton(imageId) {
    const favoriteButtons = document.querySelectorAll(`[onclick*="${imageId}"]`);
    favoriteButtons.forEach(button => {
        const svg = button.querySelector('svg');
        const isFav = isFavorite(imageId);
        
        if (svg) {
            svg.className = `w-5 h-5 ${isFav ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`;
            svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
        }
    });
}

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

// Clear all filters function
function clearAllFilters() {
    currentFilter = 'All';
    searchInput.value = '';
    sortSelect.value = 'newest';
    createFilterTags();
    applyFilters();
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Observe gallery items when they're rendered
    return observer;
}

// Fungsi untuk mendapatkan semua tag unik
function getUniqueTags() {
    const baseTags = imageData.map(img => img.tag);
    const orientationTags = ['Portrait', 'Landscape', 'Square'];
    return ['All', 'Favorit', ...new Set(baseTags), ...orientationTags];
}

// Fungsi untuk membuat tombol filter tag
function createFilterTags() {
    const tags = getUniqueTags();
    filterTags.innerHTML = '';
    
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = `px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform shadow-md hover:scale-105 ${
            tag === currentFilter 
                ? 'bg-gray-800 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg'
        }`;
        button.textContent = tag;
        button.onclick = () => filterByTag(tag);
        filterTags.appendChild(button);
    });
}

// Fungsi untuk memfilter berdasarkan tag
function filterByTag(tag) {
    currentFilter = tag;
    createFilterTags(); // Update tombol aktif
    applyFilters();
}

// Fungsi untuk mengurutkan gambar
function sortImages(images, sortType) {
    return [...images].sort((a, b) => {
        const dateA = new Date(a.uploadedAt);
        const dateB = new Date(b.uploadedAt);
        
        if (sortType === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
}

// Fungsi untuk mencari gambar
function searchImages(images, searchTerm) {
    if (!searchTerm) return images;
    
    const term = searchTerm.toLowerCase();
    return images.filter(img => 
        img.caption.toLowerCase().includes(term) ||
        img.tag.toLowerCase().includes(term) ||
        formatDate(img.uploadedAt).toLowerCase().includes(term)
    );
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fungsi untuk menerapkan semua filter
function applyFilters() {
    let result = [...imageData];
    
    // Filter berdasarkan tag khusus
    if (currentFilter === 'Favorit') {
        result = result.filter(img => isFavorite(img.id));
    } else if (currentFilter === 'Portrait') {
        result = result.filter(img => img.orientation === 'portrait');
    } else if (currentFilter === 'Landscape') {
        result = result.filter(img => img.orientation === 'landscape');
    } else if (currentFilter === 'Square') {
        result = result.filter(img => img.orientation === 'square');
    } else if (currentFilter !== 'All') {
        result = result.filter(img => img.tag === currentFilter);
    }
    
    // Filter berdasarkan pencarian
    const searchTerm = searchInput.value.trim();
    result = searchImages(result, searchTerm);
    
    // Urutkan
    const sortType = sortSelect.value;
    result = sortImages(result, sortType);
    
    filteredImages = result;
    updateStatistics();
    renderGallery();
}

// Update statistics display
function updateStatistics() {
    totalImages.textContent = `Total Gambar: ${imageData.length}`;
    activeCategory.textContent = `Kategori Aktif: ${currentFilter}`;
    imageCount.textContent = filteredImages.length;
    
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        currentFilterDisplay.classList.remove('hidden');
        currentFilterDisplay.textContent = `Filter: "${searchTerm}"`;
    } else {
        currentFilterDisplay.classList.add('hidden');
    }
    
    // Update empty state message
    if (filteredImages.length === 0) {
        if (searchTerm) {
            emptyStateMessage.textContent = `Tidak ada gambar ditemukan untuk "${searchTerm}"`;
        } else if (currentFilter === 'Favorit') {
            emptyStateMessage.textContent = 'Belum ada gambar favorit. Klik ❤️ pada gambar untuk menambahkan.';
        } else {
            emptyStateMessage.textContent = 'Tidak ada gambar ditemukan dengan filter ini.';
        }
    }
}

// Fungsi untuk membuat card gambar
function createImageCard(image, index) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 break-inside-avoid mb-6 opacity-0 translate-y-4';
    
    const isFav = isFavorite(image.id);
    
    card.innerHTML = `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-gray-100">
            <!-- Favorite Button -->
            <button 
                class="favorite-btn absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all transform hover:scale-110 shadow-md"
                onclick="event.stopPropagation(); toggleFavorite('${image.id}')"
            >
                <svg class="w-5 h-5 ${isFav ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            
            <div class="overflow-hidden">
                <img 
                    src="${image.src}" 
                    alt="${image.caption}"
                    class="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onerror="this.style.backgroundColor='#f3f4f6'; this.style.minHeight='200px'; this.alt='Gambar tidak dapat dimuat';"
                >
            </div>
            <div class="p-5">
                <h3 class="font-semibold text-gray-900 text-base line-clamp-2 mb-3 leading-snug">${image.caption}</h3>
                <div class="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">${image.tag}</span>
                    <span class="font-medium">${formatDate(image.uploadedAt)}</span>
                </div>
                <div class="text-xs text-gray-400 font-medium">
                    ${image.width} × ${image.height} • ${image.orientation}
                </div>
            </div>
        </div>
    `;
    
    // Event listener untuk membuka lightbox
    card.onclick = () => openLightbox(index);
    
    return card;
}

// Fungsi untuk render galeri
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    if (filteredImages.length === 0) {
        galleryGrid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        galleryGrid.style.display = 'block';
        galleryGrid.style.columnCount = '';
        emptyState.style.display = 'none';
        
        // Set masonry columns based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            galleryGrid.className = 'columns-1 gap-4 space-y-4';
        } else if (screenWidth < 768) {
            galleryGrid.className = 'columns-2 gap-4 space-y-4';
        } else if (screenWidth < 1280) {
            galleryGrid.className = 'columns-3 gap-4 space-y-4';
        } else {
            galleryGrid.className = 'columns-4 gap-4 space-y-4';
        }
        
        filteredImages.forEach((image, index) => {
            const card = createImageCard(image, index);
            galleryGrid.appendChild(card);
            
            // Scroll reveal animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 50);
        });
    }
}

// Fungsi untuk menyesuaikan layout grid berdasarkan ukuran layar
function adjustGridLayout() {
    const screenWidth = window.innerWidth;
    
    // Reset grid style
    galleryGrid.style.columnCount = '';
    galleryGrid.style.display = 'grid';
    
    // Tentukan jumlah kolom berdasarkan lebar layar
    if (screenWidth < 640) {
        galleryGrid.style.gridTemplateColumns = '1fr';
    } else if (screenWidth < 768) {
        galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (screenWidth < 1280) {
        galleryGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        galleryGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
}

// Lightbox Functions
function openLightbox(index) {
    currentLightboxIndex = index;
    const image = filteredImages[index];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.caption;
    
    lightboxCaption.innerHTML = `
        <h3 class="font-medium mb-2 text-lg">${image.caption}</h3>
        <div class="flex justify-center gap-6 text-sm opacity-90">
            <span>#${image.tag}</span>
            <span>${formatDate(image.uploadedAt)}</span>
            <span>${image.width} × ${image.height}</span>
        </div>
    `;
    
    imageCounter.textContent = `${index + 1} / ${filteredImages.length}`;
    
    // Show/hide navigation buttons
    prevImage.style.display = index > 0 ? 'flex' : 'none';
    nextImage.style.display = index < filteredImages.length - 1 ? 'flex' : 'none';
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
        openLightbox(newIndex);
    }
}

function handleKeyboardNavigation(e) {
    if (!lightbox.classList.contains('hidden')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox(1);
                break;
            case 'Escape':
                e.preventDefault();
                closeLightboxFunction();
                break;
        }
    }
}

// Fungsi untuk menutup lightbox
function closeLightboxFunction() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);
closeLightbox.addEventListener('click', closeLightboxFunction);
prevImage.addEventListener('click', () => navigateLightbox(-1));
nextImage.addEventListener('click', () => navigateLightbox(1));

// Tutup lightbox dengan klik background
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunction();
    }
});

// Keyboard navigation
document.addEventListener('keydown', handleKeyboardNavigation);

// Event listener untuk resize window agar layout tetap responsif
window.addEventListener('resize', () => {
    setTimeout(() => {
        renderGallery();
    }, 100);
});

// Inisialisasi aplikasi
function initApp() {
    try {
        initScrollToTop();
        showLoadingScreen();
        createFilterTags();
        applyFilters();
    } catch (error) {
        console.log('Error in initApp:', error);
        // Jika ada error, langsung tampilkan konten tanpa loading
        loadingScreen.style.display = 'none';
        mainContent.style.opacity = '1';
    }
}

// Jalankan aplikasi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', initApp);
