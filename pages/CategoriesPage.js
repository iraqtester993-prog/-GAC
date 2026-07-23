const CategoriesPage = {
    name: 'CategoriesPage',
    template: `
        <div class="categories-page">
            <div class="cat-top-bar">
                <div class="cat-top-scroll">
                    <div class="cat-top-card" v-for="cat in categories" :key="cat.id"
                        :class="{ active: selectedCat === cat.id }"
                        @click="selectCat(cat.id)">
                        <img class="cat-top-img" :src="cat.image" :alt="cat.name" referrerpolicy="no-referrer" @error="imgError($event)">
                        <div class="cat-top-overlay"></div>
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
                    <div class="product-card" v-for="p in currentProducts" :key="p.id">
                        <div class="product-image-wrap">
                            <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="imgError($event)">
                            <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                            <span class="product-discount" v-if="p.discount && !p.installment">-{{ p.discount }}%</span>
                            <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
                                <span class="material-symbols-outlined">{{ p.liked ? 'favorite' : 'favorite_border' }}</span>
                            </button>
                        </div>
                        <div class="product-info">
                            <div class="product-name">{{ p.name }}</div>
                            <div class="product-price-row">
                                <span class="product-price">{{ p.price.toLocaleString() }} د.ع</span>
                                <span class="product-old-price" v-if="p.oldPrice">{{ p.oldPrice.toLocaleString() }} د.ع</span>
                            </div>
                            <button class="product-details-btn">
                                <span class="material-symbols-outlined">visibility</span>
                                عرض التفاصيل
                            </button>
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
            selectedCat: 'phones',
            showGuestWarn: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            categories: [
                { id: 'phones', name: 'هواتف', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg' },
                { id: 'laptops', name: 'لابتوب', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg' },
                { id: 'tablets', name: 'لوحات', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg' },
                { id: 'headphones', name: 'سماعات', image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg' },
                { id: 'watches', name: 'ساعات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg' },
                { id: 'accessories', name: 'ملحقات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg' }
            ],
            allProducts: {
                phones: [
                    { id: 1, name: 'ايفون 15 برو ماكس 256 جيجا', price: 1850000, oldPrice: 2200000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg', installment: true, liked: false },
                    { id: 2, name: 'سامسونج جالكسي S24 الترا', price: 1450000, oldPrice: 1700000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg', installment: true, liked: false },
                    { id: 3, name: 'ايفون 16 - 128 جيجا', price: 1350000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg', installment: true, liked: false },
                    { id: 4, name: 'سامسونج جالكسي Z فولد 6', price: 2800000, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg', installment: true, liked: false },
                    { id: 5, name: 'سامسونج جالكسي A54 - 128 جيجا', price: 580000, oldPrice: 680000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54-5g.jpg', installment: false, liked: false },
                    { id: 6, name: 'سامسونج جالكسي A14 - 64 جيجا', price: 280000, oldPrice: 400000, discount: 30, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14.jpg', installment: false, liked: false }
                ],
                laptops: [
                    { id: 7, name: 'ماك بوك اير M3 - 13 انش', price: 2100000, oldPrice: 2500000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m3-13-inch.jpg', installment: true, liked: false },
                    { id: 8, name: 'ماك بوك برو M3 Max 16 انش', price: 4500000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg', installment: true, liked: false },
                    { id: 9, name: 'لابتوب HP بيفيتش 15 انش', price: 1350000, oldPrice: 1600000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/hp-pavilion-15.jpg', installment: true, liked: false },
                    { id: 10, name: 'ديل XPS 15 - معالج i7', price: 1800000, oldPrice: 2400000, discount: 25, image: 'https://fdn2.gsmarena.com/vv/bigpic/dell-xps-15-9530.jpg', installment: true, liked: false },
                    { id: 11, name: 'لينوفو ثينك باد X1', price: 1600000, oldPrice: 2100000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/lenovo-thinkpad-x1-carbon-gen11.jpg', installment: true, liked: false }
                ],
                tablets: [
                    { id: 12, name: 'ايباد برو M4 - 13 انش', price: 2800000, oldPrice: 3200000, discount: 13, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-13-inch-m4.jpg', installment: true, liked: false },
                    { id: 13, name: 'تابلت سامسونج جالكسي Tab S9', price: 1100000, oldPrice: 1300000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg', installment: true, liked: false },
                    { id: 14, name: 'ايباد اير M2 - 11 انش', price: 1400000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-11-m2.jpg', installment: true, liked: false },
                    { id: 15, name: 'سامسونج جالكسي Tab S9 FE', price: 750000, oldPrice: 900000, discount: 17, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-fe.jpg', installment: false, liked: false }
                ],
                headphones: [
                    { id: 16, name: 'سماعات سوني WH-1000XM5', price: 320000, oldPrice: 420000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg', installment: false, liked: false },
                    { id: 17, name: 'سماعات ابل ايربودز برو', price: 185000, oldPrice: 230000, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-gen.jpg', installment: false, liked: false },
                    { id: 18, name: 'سماعات سوني WF-1000XM5', price: 280000, oldPrice: 380000, discount: 26, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg', installment: false, liked: false }
                ],
                watches: [
                    { id: 19, name: 'ساعة ابل ووتش Series 9', price: 750000, oldPrice: 900000, discount: 17, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg', installment: true, liked: false },
                    { id: 20, name: 'ساعة ابل ووتش Ultra 2', price: 1200000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra-2.jpg', installment: true, liked: false },
                    { id: 21, name: 'ساعة سامسونج جالكسي ووتش 6', price: 550000, oldPrice: 700000, discount: 21, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch6-classic.jpg', installment: false, liked: false }
                ],
                accessories: [
                    { id: 22, name: 'ايرتاج ابل', price: 120000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg', installment: false, liked: false },
                    { id: 23, name: 'شاحن لاسلكي سامسونج', price: 85000, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-15w-wireless-charger-duo.jpg', installment: false, liked: false },
                    { id: 24, name: 'كيبورد ابل ماجك', price: 250000, oldPrice: 320000, discount: 22, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-magic-keyboard.jpg', installment: false, liked: false }
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
        toggleFav(p) {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            p.liked = !p.liked;
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">صورة</text></svg>');
        }
    }
};
