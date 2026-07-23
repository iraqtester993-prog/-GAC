const CategoryPage = {
    name: 'CategoryPage',
    template: `
        <div class="category-page">
            <div class="cat-page-header">
                <button class="cat-back-btn" @click="$router.back()">
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <h1 class="page-title" style="margin-bottom:0;">{{ categoryName }}</h1>
            </div>

            <div class="cat-products-grid" v-if="products.length">
                <div class="product-card" v-for="p in products" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" @error="imgError($event)">
                        <span class="product-discount" v-if="p.discount">-{{ p.discount }}%</span>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="p.liked = !p.liked">
                            <span class="material-symbols-outlined">{{ p.liked ? 'favorite' : 'favorite_border' }}</span>
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-installment" v-if="p.installment">
                            <span class="material-symbols-outlined">credit_card</span>
                            اقساط بدون فوائد
                        </div>
                        <div class="product-name">{{ p.name }}</div>
                        <div class="product-price-row">
                            <span class="product-price">{{ p.price.toLocaleString() }} د.ع</span>
                            <span class="product-old-price" v-if="p.oldPrice">{{ p.oldPrice.toLocaleString() }} د.ع</span>
                        </div>
                        <button class="product-details-btn" @click.stop="viewDetails(p)">
                            <span class="material-symbols-outlined">visibility</span>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            </div>

            <div class="cart-empty" v-else>
                <div class="empty-icon">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <div class="cart-empty-title">لا توجد منتجات</div>
                <div class="cart-empty-text">لم يتم اضافة منتجات لهذا القسم بعد</div>
            </div>
        </div>
    `,
    computed: {
        categoryId() {
            return this.$route.params.id;
        },
        categoryName() {
            const names = {
                phones: 'هواتف ذكية',
                laptops: 'لابتوبات',
                tablets: 'لوحات رقمية',
                headphones: 'سماعات',
                watches: 'ساعات ذكية',
                accessories: 'ملحقات'
            };
            return names[this.categoryId] || 'قسم';
        },
        products() {
            const data = this.getCategoryProducts();
            return data;
        }
    },
    methods: {
        viewDetails(p) {
            alert('منتج: ' + p.name + '\\nالسعر: ' + p.price.toLocaleString() + ' د.ع');
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        },
        getCategoryProducts() {
            const all = {
                phones: [
                    { id: 101, name: 'ايفون 15 برو ماكس 256 جيجا', price: 1850000, oldPrice: 2200000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg', installment: true, liked: false },
                    { id: 102, name: 'سامسونج جالكسي S24 الترا 256 جيجا', price: 1450000, oldPrice: 1700000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg', installment: true, liked: false },
                    { id: 103, name: 'ايفون 15 - 128 جيجا', price: 950000, oldPrice: 1100000, discount: 14, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg', installment: true, liked: false },
                    { id: 104, name: 'سامسونج جالكسي A54 - 128 جيجا', price: 580000, oldPrice: 680000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54-5g.jpg', installment: false, liked: false },
                    { id: 105, name: 'سامسونج جالكسي Z فولد 6', price: 2800000, oldPrice: 3100000, discount: 10, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg', installment: true, liked: false },
                    { id: 106, name: 'ايفون 14 - 128 جيجا', price: 780000, oldPrice: 900000, discount: 13, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg', installment: false, liked: false },
                    { id: 107, name: 'سامسونج جالكسي A14 - 64 جيجا', price: 280000, oldPrice: 400000, discount: 30, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14.jpg', installment: false, liked: false },
                    { id: 108, name: 'ايفون 16 - 128 جيجا', price: 1350000, oldPrice: 0, discount: 0, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg', installment: true, liked: false }
                ],
                laptops: [
                    { id: 201, name: 'ماك بوك برو M3 Max 16 انش', price: 4500000, oldPrice: 0, discount: 0, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg', installment: true, liked: false },
                    { id: 202, name: 'ماك بوك اير M3 - 13 انش', price: 2100000, oldPrice: 2500000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m3-13-inch.jpg', installment: true, liked: false },
                    { id: 203, name: 'ديل XPS 15 - معالج i7', price: 1800000, oldPrice: 2400000, discount: 25, image: 'https://fdn2.gsmarena.com/vv/bigpic/dell-xps-15-9530.jpg', installment: true, liked: false },
                    { id: 204, name: 'HP بيفيتش 15 انش', price: 1350000, oldPrice: 1600000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/hp-pavilion-15.jpg', installment: false, liked: false },
                    { id: 205, name: 'لينوفو ثينك باد X1 كربون', price: 1600000, oldPrice: 2100000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/lenovo-thinkpad-x1-carbon-gen11.jpg', installment: true, liked: false }
                ],
                tablets: [
                    { id: 301, name: 'سامسونج جالكسي Tab S9 - 128 جيجا', price: 1100000, oldPrice: 1300000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg', installment: true, liked: false },
                    { id: 302, name: 'ايباد برو 12.9 انش M2', price: 2800000, oldPrice: 0, discount: 0, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-12-9-2022.jpg', installment: true, liked: false },
                    { id: 303, name: 'ايباد اير M1 - 10.9 انش', price: 1500000, oldPrice: 1750000, discount: 14, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-2022.jpg', installment: true, liked: false },
                    { id: 304, name: 'سامسونج جالكسي Tab A9', price: 550000, oldPrice: 650000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a9-.jpg', installment: false, liked: false }
                ],
                headphones: [
                    { id: 401, name: 'سماعات سوني WH-1000XM5', price: 320000, oldPrice: 420000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg', installment: false, liked: false },
                    { id: 402, name: 'سماعات ابل ايربودز برو الجيل الثاني', price: 185000, oldPrice: 230000, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-gen.jpg', installment: false, liked: false },
                    { id: 403, name: 'سماعات سوني WF-1000XM5 لاسلكية', price: 280000, oldPrice: 380000, discount: 26, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg', installment: false, liked: false },
                    { id: 404, name: 'سماعات سامسونج جالكسي بودز2 برو', price: 175000, oldPrice: 220000, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-buds2-pro.jpg', installment: false, liked: false },
                    { id: 405, name: 'سماعات سوني WH-1000XM4', price: 240000, oldPrice: 320000, discount: 25, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm4.jpg', installment: false, liked: false }
                ],
                watches: [
                    { id: 501, name: 'ساعة ابل ووتش Series 9', price: 750000, oldPrice: 900000, discount: 17, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg', installment: true, liked: false },
                    { id: 502, name: 'ساعة ابل ووتش Ultra 2', price: 1200000, oldPrice: 0, discount: 0, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra-2.jpg', installment: true, liked: false },
                    { id: 503, name: 'ساعة سامسونج جالكسي ووتش 6 كلاسيك', price: 550000, oldPrice: 700000, discount: 21, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch6-classic.jpg', installment: false, liked: false },
                    { id: 504, name: 'ساعة سامسونج جالكسي ووتش FE', price: 350000, oldPrice: 450000, discount: 22, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch-fe.jpg', installment: false, liked: false }
                ],
                accessories: [
                    { id: 601, name: 'شاحن لاسلكي سامسونج 15 واط', price: 65000, oldPrice: 85000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-15w-wireless-charger-duo.jpg', installment: false, liked: false },
                    { id: 602, name: 'ايبود ابل - مفتاح تعقب', price: 120000, oldPrice: 150000, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg', installment: false, liked: false },
                    { id: 603, name: 'حافظة ايفون 15 برو سيليكون', price: 35000, oldPrice: 50000, discount: 30, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg', installment: false, liked: false },
                    { id: 604, name: 'كيبورد بلوتوث ابل Magic Keyboard', price: 380000, oldPrice: 450000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-magic-keyboard.jpg', installment: false, liked: false }
                ]
            };
            return all[this.categoryId] || [];
        }
    }
};
