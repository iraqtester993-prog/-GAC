const CategoriesPage = {
    name: 'CategoriesPage',
    template: `
        <div class="categories-page">
            <div class="store-title-section" style="padding-top:0;">
                <h1 class="store-title">الأقسام</h1>
            </div>

            <div class="cat-top-bar">
                <div class="cat-top-scroll">
                    <div class="cat-top-card" v-for="cat in categories" :key="cat.id"
                        :class="{ active: selectedCat === cat.id }"
                        @click="selectCat(cat.id)">
                        <div class="cat-top-icon-wrap">
                            <span class="material-symbols-outlined">{{ cat.icon }}</span>
                        </div>
                        <span class="cat-top-name">{{ cat.name }}</span>
                    </div>
                </div>
            </div>

            <div class="cat-products-area" v-if="selectedCat">
                <div class="cat-area-header">
                    <h2 class="cat-area-title">{{ currentCatName }}</h2>
                    <span class="cat-area-count">{{ currentProducts.length }} منتج</span>
                </div>
                <div class="cat-products-scroll">
                    <div class="product-row-card" v-for="p in currentProducts" :key="p.id" @click="$router.push('/product/' + p.id)">
                        <div class="product-row-image">
                            <img :src="p.image" :alt="p.name" @error="imgError($event)">
                        </div>
                        <div class="product-row-info">
                            <div class="product-row-name">{{ p.name }}</div>
                            <ul class="product-row-specs">
                                <li v-for="(s, i) in p.specs" :key="i">{{ s }}</li>
                            </ul>
                            <div class="product-stars">
                                <span class="material-symbols-outlined" v-for="n in 5" :key="n" :class="{ 'star-empty': n > p.rating }">star</span>
                            </div>
                            <div class="product-row-bottom">
                                <span class="product-row-price">{{ p.price.toLocaleString() }} د.ع</span>
                                <button class="btn-gold btn-add-cart-sm" @click.stop="addToCart(p)">
                                    <span class="material-symbols-outlined">add_shopping_cart</span>
                                    أضف للسلة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cat-empty" v-else>
                <span class="material-symbols-outlined">touch_app</span>
                <div>اختر قسم لعرض المنتجات</div>
            </div>

            <guest-warning feature="إضافة المنتجات للمفضلة" @close="showGuestWarn = false" v-if="showGuestWarn"></guest-warning>
        </div>
    `,
    data() {
        return {
            selectedCat: 'washer',
            showGuestWarn: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            categories: [
                { id: 'fridge', name: 'ثلاجة', icon: 'kitchen' },
                { id: 'washer', name: 'غسالة', icon: 'local_laundry_service' },
                { id: 'microwave', name: 'ميكروويف', icon: 'microwave' },
                { id: 'tv', name: 'تلفزيون', icon: 'tv' },
                { id: 'vacuum', name: 'مكنسة', icon: 'cleaning_services' },
                { id: 'blender', name: 'خلاط', icon: 'blender' }
            ],
            allProducts: {
                fridge: [
                    { id: 201, name: 'ثلاجة 500 لتر No Frost', price: 1850000, rating: 5, specs: ['No Frost', 'موفر A++'], image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop' },
                    { id: 202, name: 'ثلاجة 400 لتر Side by Side', price: 2200000, rating: 4, specs: ['Side by Side', 'Dispenser'], image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop' }
                ],
                washer: [
                    { id: 101, name: 'غسالة الملابس الذكية', price: 1250000, rating: 5, specs: ['10 كيلو', 'AI Wash'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' },
                    { id: 204, name: 'غسالة 8 كيلو', price: 850000, rating: 4, specs: ['8 كيلو', 'Inverter'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' }
                ],
                microwave: [
                    { id: 102, name: 'ميكروويف 30 لتر', price: 285000, rating: 4, specs: ['900 واط', 'شواية'], image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=300&h=300&fit=crop' },
                    { id: 206, name: 'ميكروويف 20 لتر', price: 175000, rating: 3, specs: ['700 واط', '5 مستويات'], image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=300&h=300&fit=crop' }
                ],
                tv: [
                    { id: 104, name: 'تلفزيون 55 بوصة 4K', price: 950000, rating: 4, specs: ['Smart TV', 'HDR10+'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' },
                    { id: 208, name: 'تلفزيون 65 بوصة OLED', price: 1850000, rating: 5, specs: ['OLED', 'Dolby Vision'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' }
                ],
                vacuum: [
                    { id: 210, name: 'مكنسة رobot ذكية', price: 550000, rating: 5, specs: ['Robot', 'Mapping'], image: 'https://images.unsplash.com/photo-1558317379-0bac8669a826?w=300&h=300&fit=crop' },
                    { id: 211, name: 'مكنسة 2000W', price: 185000, rating: 4, specs: ['2000 واط', 'HEPA'], image: 'https://images.unsplash.com/photo-1558317379-0bac8669a826?w=300&h=300&fit=crop' }
                ],
                blender: [
                    { id: 3, name: 'خلاط 1000 واط', price: 85000, rating: 4, specs: ['1000 واط', '6 سرعات'], image: 'https://images.unsplash.com/photo-1570222094114-d054022797fb?w=300&h=300&fit=crop' },
                    { id: 212, name: 'خلاط 800 واط', price: 55000, rating: 3, specs: ['800 واط', '4 سرعات'], image: 'https://images.unsplash.com/photo-1570222094114-d054022797fb?w=300&h=300&fit=crop' }
                ]
            }
        }
    },
    computed: {
        currentCatName() {
            const cat = this.categories.find(c => c.id === this.selectedCat);
            return cat ? cat.name : '';
        },
        currentProducts() {
            return this.allProducts[this.selectedCat] || [];
        }
    },
    methods: {
        selectCat(id) {
            this.selectedCat = id;
        },
        addToCart(p) {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            const cart = JSON.parse(localStorage.getItem('gac-cart') || '[]');
            const existing = cart.find(i => i.id === p.id);
            if (existing) { existing.qty++; } else {
                cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 });
            }
            localStorage.setItem('gac-cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%23141414"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        }
    }
};
