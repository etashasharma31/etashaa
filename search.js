/**
 * search.js - Handles Elasticsearch-like simulated search
 */

const PRODUCT_DATABASE = [
    {
        id: 'BRIDAL_001',
        name: 'The Noorani Crimson',
        price: 129999,
        image: 'images/prod_royal_maharani_lehenga.png',
        category: 'Bridal Lehengas',
        tags: ['red', 'bridal', 'lehenga', 'zardosi', 'heavy', 'wedding', 'royal']
    },
    {
        id: 'BRIDAL_002',
        name: 'Ivory Moonscape Bridal',
        price: 95000,
        image: 'images/prod_ivory_glow_lehenga.png',
        category: 'Bridal Lehengas',
        tags: ['white', 'ivory', 'bridal', 'lehenga', 'gota patti', 'pearl', 'heritage']
    },
    {
        id: 'NONBRIDAL_001',
        name: 'Ruby Floral Edit',
        price: 14500,
        image: 'images/occ_sangeet.png',
        category: 'Non-Bridal Lehengas',
        tags: ['red', 'festive', 'lehenga', 'floral', 'print', 'sangeet', 'party']
    },
    {
        id: 'NONBRIDAL_002',
        name: 'Pastel Twilight Muse',
        price: 24999,
        image: 'images/prod_pastel_twilight_lehenga.png',
        category: 'Non-Bridal Lehengas',
        tags: ['pastel', 'lehenga', 'twilight', 'sangeet', 'modern', 'reception']
    },
    {
        id: 'SAREE_001',
        name: 'Aurelian Banarasi Silk',
        price: 48500,
        image: 'images/prod_banarasi_heritage_saree.png',
        category: 'Heritage Sarees',
        tags: ['silk', 'saree', 'banarasi', 'gold', 'hand-loomed', 'heritage']
    },
    {
        id: 'SAREE_002',
        name: 'Pastel Petals Organza',
        price: 18200,
        image: 'images/prod_blush_chiffon.png',
        category: 'Heritage Sarees',
        tags: ['organza', 'saree', 'pastel', 'floral', 'lightweight', 'cocktail']
    },
    {
        id: 'ACCESSORY_001',
        name: 'Zardosi Hand-Crafted Potli',
        price: 4500,
        image: 'images/social_embroidery_detail.png',
        category: 'Accessories',
        tags: ['bag', 'potli', 'gold', 'zardosi', 'accessory', 'handmade']
    },
    {
        id: 'BRIDAL_W01',
        name: 'Heritage Wedding Lehenga',
        price: 245000,
        image: 'images/occ_wedding.png',
        category: 'Bridal Collection',
        tags: ['wedding', 'bridal', 'heavy', 'red']
    },
    {
        id: 'BRIDAL_M01',
        name: 'Garden Mehendi Lehenga',
        price: 85000,
        image: 'images/occ_mehendi.png',
        category: 'Bridal Collection',
        tags: ['mehendi', 'green', 'floral']
    },
    {
        id: 'BRIDAL_H01',
        name: 'Marigold Haldi Lehenga',
        price: 65000,
        image: 'images/occ_haldi.png',
        category: 'Bridal Collection',
        tags: ['haldi', 'yellow', 'light']
    },
    {
        id: 'BRIDAL_S01',
        name: 'Shimmer Sangeet Lehenga',
        price: 115000,
        image: 'images/occ_sangeet.png',
        category: 'Bridal Collection',
        tags: ['sangeet', 'glam', 'shimmer', 'blue']
    },
    {
        id: 'BRIDAL_P01',
        name: 'Twilight Pastel Lehenga',
        price: 92000,
        image: 'images/prod_pastel_twilight_lehenga.png',
        category: 'Bridal Collection',
        tags: ['pastel', 'reception', 'pink']
    },
    {
        id: 'BRIDAL_SIGNATURE',
        name: 'Signature Heritage Lehenga',
        price: 320000,
        image: 'images/cat_bridal_lehenga_main.png',
        category: 'Bridal Collection',
        tags: ['signature', 'bridal', 'luxury']
    },
    {
        id: 'BRIDAL_R02',
        name: 'Crimson Empress Lehenga',
        price: 210000,
        image: 'images/hero_bridal_elegance.png',
        category: 'Bridal Collection',
        tags: ['red', 'crimson', 'bridal', 'heavy']
    },
    {
        id: 'BRIDAL_P02',
        name: 'Soft Petal Organza Lehenga',
        price: 78000,
        image: 'images/prod_ivory_glow_lehenga.png',
        category: 'Bridal Collection',
        tags: ['pastel', 'ivory', 'organza', 'light']
    },
    {
        id: 'BRIDAL_R03',
        name: 'Rajputana Silk Lehenga',
        price: 195000,
        image: 'images/prod_royal_maharani_lehenga.png',
        category: 'Bridal Collection',
        tags: ['red', 'silk', 'bridal', 'traditional']
    },
    {
        id: 'BRIDAL_P03',
        name: 'Lilac Meadow Lehenga',
        price: 88000,
        image: 'images/prod_pastel_twilight_lehenga.png',
        category: 'Bridal Collection',
        tags: ['pastel', 'lilac', 'pink', 'modern']
    },
    {
        id: 'BRIDAL_R04',
        name: 'Scarlet Zari Heritage',
        price: 165000,
        image: 'images/occ_wedding.png',
        category: 'Bridal Collection',
        tags: ['red', 'scarlet', 'zari', 'bridal']
    },
    {
        id: 'BRIDAL_P04',
        name: 'Peach Petal Lehenga',
        price: 95000,
        image: 'images/prod_pastel_twilight_lehenga.png',
        category: 'Bridal Collection',
        tags: ['pastel', 'peach', 'reception']
    },
    {
        id: 'SAREE_NEW_01',
        name: 'Zardosi Detail Silk',
        price: 34500,
        image: 'images/social_embroidery.png',
        category: 'Heritage Saree',
        tags: ['saree', 'silk', 'zardosi', 'gold']
    },
    {
        id: 'SAREE_NEW_02',
        name: 'Ivory Moonlight Saree',
        price: 28000,
        image: 'images/prod_ivory_glow_lehenga.png',
        category: 'Heritage Saree',
        tags: ['saree', 'ivory', 'organza', 'white']
    },
    {
        id: 'SAREE_NEW_03',
        name: 'Crimson Heritage Saree',
        price: 52000,
        image: 'images/hero_bridal_elegance.png',
        category: 'Heritage Saree',
        tags: ['saree', 'red', 'banarasi', 'heritage']
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Create Search Overlay if it doesn't exist
    if (!document.getElementById('search-overlay')) {
        createSearchOverlay();
    }

    // Hook up search icon in nav
    const searchIcons = document.querySelectorAll('.material-symbols-outlined');
    searchIcons.forEach(icon => {
        if (icon.textContent === 'search') {
            const target = icon.closest('button, a') || icon;
            target.style.cursor = 'pointer';
            target.addEventListener('click', (e) => {
                e.preventDefault();
                showSearchOverlay();
            });
        }
    });

    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            showSearchOverlay();
        }
        if (e.key === 'Escape') {
            hideSearchOverlay();
        }
    });
});

function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'fixed inset-0 z-[110] bg-[#fcf9f6] opacity-0 pointer-events-none transition-all duration-300 flex flex-col';
    
    overlay.innerHTML = `
        <!-- Top Bar -->
        <div class="px-8 md:px-20 py-6 border-b border-outline/10 flex items-center gap-6">
            <span class="material-symbols-outlined text-primary text-2xl">search</span>
            <input type="text" id="search-input" placeholder="Search the Digital Atelier... (Try 'Bridal', 'Silk', or 'Red')" 
                   class="flex-1 bg-transparent border-none focus:ring-0 text-2xl md:text-3xl font-noto-serif text-on-surface placeholder:text-outline/30 outline-none">
            <button onclick="hideSearchOverlay()" class="p-2 hover:bg-surface-container transition-colors rounded-full">
                <span class="material-symbols-outlined text-outline">close</span>
            </button>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto px-8 md:px-20 py-12">
            <div id="search-results-container" class="max-w-7xl mx-auto">
                <!-- Initial Suggestions -->
                <div id="search-suggestions" class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h4 class="text-[10px] uppercase tracking-[0.3em] text-outline mb-6">Trending Collections</h4>
                        <div class="flex flex-wrap gap-3">
                            <button onclick="performSearch('Bridal Lehenga')" class="px-6 py-2 border border-outline/20 hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest font-bold">Bridal Lehengas</button>
                            <button onclick="performSearch('Non-Bridal')" class="px-6 py-2 border border-outline/20 hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest font-bold">Non-Bridal Edit</button>
                            <button onclick="performSearch('Saree')" class="px-6 py-2 border border-outline/20 hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest font-bold">Heritage Sarees</button>
                            <button onclick="performSearch('Potli')" class="px-6 py-2 border border-outline/20 hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest font-bold">Accessories</button>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-[10px] uppercase tracking-[0.3em] text-outline mb-6">Popular Products</h4>
                        <div id="popular-list" class="space-y-4">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                </div>

                <!-- Live Results -->
                <div id="live-results" class="hidden">
                    <div class="flex justify-between items-center mb-10 pb-4 border-b border-outline/5">
                        <h3 class="text-xl font-noto-serif italic" id="results-count">Showing results for "..."</h3>
                        <span class="text-[10px] uppercase tracking-widest text-outline">ElasticSearch Optimized</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" id="results-grid">
                        <!-- Results populate here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="px-8 md:px-20 py-4 bg-surface-container/20 text-center">
            <p class="text-[10px] uppercase tracking-widest text-outline">Press <kbd class="px-1.5 py-0.5 bg-surface-container border border-outline/20 rounded mx-1 text-on-surface font-sans">ESC</kbd> to close</p>
        </div>
    `;
    
    document.body.appendChild(overlay);

    // Populate popular list
    const popularList = document.getElementById('popular-list');
    const populars = PRODUCT_DATABASE.slice(0, 3);
    populars.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 group cursor-pointer';
        item.onclick = () => window.location.href = 'product_detail_page.html';
        item.innerHTML = `
            <div class="w-16 h-16 bg-surface-container overflow-hidden rounded-sm">
                <img src="${prod.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div>
                <p class="text-sm font-noto-serif text-on-surface group-hover:text-primary transition-colors">${prod.name}</p>
                <p class="text-[10px] text-outline uppercase tracking-widest">${prod.category}</p>
            </div>
        `;
        popularList.appendChild(item);
    });

    // Search logic
    const input = document.getElementById('search-input');
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            document.getElementById('search-suggestions').classList.add('hidden');
            document.getElementById('live-results').classList.remove('hidden');
            renderResults(query);
        } else {
            document.getElementById('search-suggestions').classList.remove('hidden');
            document.getElementById('live-results').classList.add('hidden');
        }
    });
}

function renderResults(query) {
    const resultsGrid = document.getElementById('results-grid');
    const resultsCount = document.getElementById('results-count');
    
    // Simulated Elasticsearch fuzzy/tokenized search
    const filtered = PRODUCT_DATABASE.filter(prod => {
        const searchPool = `${prod.name} ${prod.category} ${prod.tags.join(' ')}`.toLowerCase();
        return query.split(' ').every(word => searchPool.includes(word));
    });

    resultsGrid.innerHTML = '';
    resultsCount.textContent = `${filtered.length} Results for "${query}"`;

    if (filtered.length === 0) {
        resultsGrid.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <p class="text-outline italic">No masterpieces found for this request. Please try another search.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'group cursor-pointer product-card relative';
        card.onclick = () => window.location.href = 'product_detail_page.html';
        card.innerHTML = `
            <div class="aspect-[3/4] bg-surface-container overflow-hidden mb-4 relative">
                <img src="${prod.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
                <p class="text-[10px] uppercase tracking-widest text-outline mb-1">${prod.category}</p>
                <h5 class="font-noto-serif text-lg text-on-surface group-hover:text-primary transition-colors">${prod.name}</h5>
                <p class="font-jakarta-sans font-bold text-primary text-sm mt-1">₹${prod.price.toLocaleString()}</p>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

function performSearch(term) {
    const input = document.getElementById('search-input');
    input.value = term;
    input.dispatchEvent(new Event('input'));
}

function showSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden';
}

function hideSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
}
