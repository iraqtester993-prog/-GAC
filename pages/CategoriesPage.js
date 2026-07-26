const CategoriesPage = {
    name: 'CategoriesPage',
    template: `
        <div class="categories-page">
            <div class="store-title-section" style="padding-top:0;">
                <h1 class="store-title">الأقسام</h1>
            </div>

            <category-showcase
                :categories="showcaseCategories"
                v-model="selectedCat"
                @select="selectCat"
            ></category-showcase>

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
            selectedCat: 'smartphones',
            showGuestWarn: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            showcaseCategories: [
                { id: 'smartphones', name: 'هواتف', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' },
                { id: 'laptop', name: 'لابتوب', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
                { id: 'camera', name: 'كاميرا', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop' },
                { id: 'gaming', name: 'ألعاب', image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=200&h=200&fit=crop' },
                { id: 'perfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop' },
                { id: 'watches', name: 'ساعات', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&h=200&fit=crop' },
                { id: 'accessories', name: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }
            ],
            allProducts: {
                smartphones: [
                    { id: 301, name: 'هاتف ذكي فاخر', price: 4500000, rating: 5, specs: ['256GB', 'شحن سريع'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop' },
                    { id: 302, name: 'هاتف بكاميرا احترافية', price: 3800000, rating: 4, specs: ['128GB', 'كاميرا 108MP'], image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=300&h=300&fit=crop' }
                ],
                laptop: [
                    { id: 303, name: 'لابتوب ألعاب فاخر', price: 8500000, rating: 5, specs: ['RTX 4060', '16GB RAM'], image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop' },
                    { id: 304, name: 'لابتوب أعمال رفيع', price: 6200000, rating: 4, specs: ['i7', '512GB SSD'], image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop' }
                ],
                camera: [
                    { id: 305, name: 'كاميرا احترافية', price: 7200000, rating: 5, specs: ['4K', 'عدسات متبدلة'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop' },
                    { id: 306, name: 'كاميرا رقمية متقدمة', price: 4800000, rating: 4, specs: ['24MP', 'تثبيت بصري'], image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop' }
                ],
                gaming: [
                    { id: 307, name: 'جهاز ألعاب منزلي', price: 5500000, rating: 5, specs: ['1TB', '4K 120Hz'], image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=300&h=300&fit=crop' },
                    { id: 308, name: 'يد تحكم احترافية', price: 950000, rating: 4, specs: ['لاسلكية', 'برمجة أزرار'], image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=300&h=300&fit=crop' }
                ],
                perfumes: [
                    { id: 309, name: 'عطر فاخر 100 مل', price: 850000, rating: 5, specs: ['عطر شرقي', 'ثبات 24 ساعة'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop' },
                    { id: 310, name: 'عطر نسائي أنيق', price: 650000, rating: 4, specs: ['زهري فاكهي', 'حجم 75 مل'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop' }
                ],
                watches: [
                    { id: 311, name: 'ساعة يد فاخرة', price: 2500000, rating: 5, specs: ['أوتوماتيك', 'سوار جلد'], image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop' },
                    { id: 312, name: 'ساعة ذكية رياضية', price: 750000, rating: 4, specs: ['مقاومة للماء', 'تتبع لياقة'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' }
                ],
                accessories: [
                    { id: 313, name: 'سماعة لاسلكية فاخرة', price: 1200000, rating: 5, specs: ['إلغاء ضوضاء', 'بطارية 30 ساعة'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
                    { id: 314, name: 'محفظة جلدية', price: 350000, rating: 4, specs: ['جلد طبيعي', 'تصميم أنيق'], image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop' }
                ]
            }
        }
    },
    computed: {
        currentCatName() {
            const cat = this.showcaseCategories.find(c => c.id === this.selectedCat);
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
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%23121b2c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        }
    }
};
