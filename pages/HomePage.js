const HomePage = {
    name: 'HomePage',
    template: `
        <div class="home-page">
            <guest-warning feature="إضافة المنتجات للمفضلة" @close="showGuestWarn = false" v-if="showGuestWarn"></guest-warning>

            <div class="hero-slider" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
                <div class="hero-track" :style="{ transform: 'translateX(' + (currentSlide * -100) + '%)' }">
                    <div class="hero-slide" v-for="(slide, i) in slides" :key="i">
                        <img class="hero-bg-img" :src="slide.image" :alt="slide.title" referrerpolicy="no-referrer" @error="sliderImgError($event)">
                        <div class="hero-overlay"></div>
                        <div class="hero-content">
                            <div class="hero-badge-tag">{{ slide.badge }}</div>
                            <div class="hero-title">{{ slide.title }}</div>
                            <div class="hero-price-line" v-if="slide.price">
                                <span class="hero-price-now">{{ slide.price }}</span>
                                <span class="hero-price-old" v-if="slide.oldPrice">{{ slide.oldPrice }}</span>
                            </div>
                            <button class="hero-btn" @click="$router.push('/category/' + slide.category)">
                                {{ slide.btn }}
                                <span class="material-symbols-outlined">arrow_back</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="hero-dots">
                    <button class="hero-dot" v-for="(s, i) in slides" :key="i" :class="{ active: currentSlide === i }" @click="currentSlide = i"></button>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">تصفح <span>الاقسام</span></h2>
                <button class="view-all-btn" @click="$router.push('/categories')">
                    عرض الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="categories-scroll">
                <div class="category-card" v-for="cat in categories" :key="cat.id" @click="$router.push('/category/' + cat.id)">
                    <img class="category-bg-img" :src="cat.image" :alt="cat.name" referrerpolicy="no-referrer" @error="catImgError($event)">
                    <div class="category-overlay"></div>
                    <span class="category-name">{{ cat.name }}</span>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">عروض <span>اليوم</span></h2>
                <button class="view-all-btn">
                    عرض الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="products-scroll">
                <div class="product-card" v-for="p in dailyDeals" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="productImageError($event)">
                        <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                        <span class="product-discount" v-if="p.discount && !p.installment">-{{ p.discount }}%</span>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
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
                        <button class="product-details-btn">
                            <span class="material-symbols-outlined">visibility</span>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">الأكثر <span>مبيعاً</span></h2>
                <button class="view-all-btn">
                    عرض الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="products-scroll">
                <div class="product-card" v-for="p in bestSellers" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="productImageError($event)">
                        <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                        <span class="product-discount" v-if="p.discount && !p.installment">-{{ p.discount }}%</span>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
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
                        <button class="product-details-btn">
                            <span class="material-symbols-outlined">visibility</span>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">وصل <span>حديثاً</span></h2>
                <button class="view-all-btn">
                    عرض الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="products-scroll">
                <div class="product-card" v-for="p in newArrivals" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="productImageError($event)">
                        <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
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
                        </div>
                        <button class="product-details-btn">
                            <span class="material-symbols-outlined">visibility</span>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">تخفيضات <span>حارّة</span></h2>
                <button class="view-all-btn">
                    عرض الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="products-scroll">
                <div class="product-card" v-for="p in hotDeals" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="productImageError($event)">
                        <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                        <span class="product-discount" v-if="p.discount && !p.installment">-{{ p.discount }}%</span>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
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
                        <button class="product-details-btn">
                            <span class="material-symbols-outlined">visibility</span>
                            عرض التفاصيل
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentSlide: 0,
            slideTimer: null,
            touchStartX: 0,
            touchEndX: 0,
            showGuestWarn: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            slides: [
                {
                    badge: 'عرض لفترة محدودة',
                    title: 'ايفون 15 برو ماكس',
                    price: '1,850,000 د.ع',
                    oldPrice: '2,200,000 د.ع',
                    btn: 'تسوق الآن',
                    category: 'phones',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg'
                },
                {
                    badge: 'جديدنا هذا الاسبوع',
                    title: 'سامسونج جالكسي S24 الترا',
                    price: '1,450,000 د.ع',
                    oldPrice: '1,700,000 د.ع',
                    btn: 'اكتشف المزيد',
                    category: 'phones',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg'
                },
                {
                    badge: 'عروض الطلاب',
                    title: 'ماك بوك اير M3',
                    price: '2,100,000 د.ع',
                    oldPrice: '2,500,000 د.ع',
                    btn: 'استفد من العرض',
                    category: 'laptops',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m3-13-inch.jpg'
                },
                {
                    badge: 'موضة وتكنولوجيا',
                    title: 'ايباد برو M4 - 13 انش',
                    price: '2,800,000 د.ع',
                    oldPrice: '3,200,000 د.ع',
                    btn: 'تصفح الآن',
                    category: 'tablets',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-13-inch-m4.jpg'
                },
                {
                    badge: 'الاكثر مبيعاً',
                    title: 'سماعات سوني WH-1000XM5',
                    price: '320,000 د.ع',
                    oldPrice: '420,000 د.ع',
                    btn: 'اطلب الآن',
                    category: 'headphones',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg'
                }
            ],
            categories: [
                { id: 'phones', name: 'هواتف', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg' },
                { id: 'laptops', name: 'لابتوب', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg' },
                { id: 'tablets', name: 'لوحات', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg' },
                { id: 'headphones', name: 'سماعات', image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg' },
                { id: 'watches', name: 'ساعات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg' },
                { id: 'accessories', name: 'ملحقات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg' }
            ],
            dailyDeals: [
                { id: 1, name: 'ايفون 15 برو ماكس 256 جيجا', price: 1850000, oldPrice: 2200000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg', installment: true, liked: false },
                { id: 2, name: 'سامسونج جالكسي S24 الترا', price: 1450000, oldPrice: 1700000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg', installment: true, liked: false },
                { id: 3, name: 'ماك بوك اير M3 - 13 انش', price: 2100000, oldPrice: 2500000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m3-13-inch.jpg', installment: true, liked: false },
                { id: 4, name: 'سماعات ابل ايربودز برو', price: 185000, oldPrice: 230000, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-gen.jpg', installment: false, liked: false }
            ],
            bestSellers: [
                { id: 5, name: 'سامسونج جالكسي A54 - 128 جيجا', price: 580000, oldPrice: 680000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54-5g.jpg', installment: false, liked: false },
                { id: 6, name: 'لابتوب HP بيفيتش 15 انش', price: 1350000, oldPrice: 1600000, discount: 16, image: 'https://fdn2.gsmarena.com/vv/bigpic/hp-pavilion-15.jpg', installment: true, liked: false },
                { id: 7, name: 'ساعة ابل ووتش Series 9', price: 750000, oldPrice: 900000, discount: 17, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg', installment: true, liked: false },
                { id: 8, name: 'تابلت سامسونج جالكسي Tab S9', price: 1100000, oldPrice: 1300000, discount: 15, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg', installment: true, liked: false }
            ],
            newArrivals: [
                { id: 9, name: 'ايفون 16 - 128 جيجا', price: 1350000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg', installment: true, liked: false },
                { id: 10, name: 'سامسونج جالكسي Z فولد 6', price: 2800000, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg', installment: true, liked: false },
                { id: 11, name: 'ماك بوك برو M3 Max 16 انش', price: 4500000, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg', installment: true, liked: false },
                { id: 12, name: 'سماعات سوني WH-1000XM5', price: 320000, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg', installment: false, liked: false }
            ],
            hotDeals: [
                { id: 13, name: 'ديل XPS 15 - معالج i7', price: 1800000, oldPrice: 2400000, discount: 25, image: 'https://fdn2.gsmarena.com/vv/bigpic/dell-xps-15-9530.jpg', installment: true, liked: false },
                { id: 14, name: 'سامسونج جالكسي A14 - 64 جيجا', price: 280000, oldPrice: 400000, discount: 30, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14.jpg', installment: false, liked: false },
                { id: 15, name: 'سماعات سوني WF-1000XM5', price: 280000, oldPrice: 380000, discount: 26, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg', installment: false, liked: false },
                { id: 16, name: 'لينوفو ثينك باد X1', price: 1600000, oldPrice: 2100000, discount: 24, image: 'https://fdn2.gsmarena.com/vv/bigpic/lenovo-thinkpad-x1-carbon-gen11.jpg', installment: true, liked: false }
            ]
        }
    },
    methods: {
        onTouchStart(e) {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchEndX = this.touchStartX;
            if (this.slideTimer) clearInterval(this.slideTimer);
        },
        onTouchMove(e) {
            this.touchEndX = e.changedTouches[0].screenX;
        },
        onTouchEnd() {
            const diff = this.touchStartX - this.touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && this.currentSlide < this.slides.length - 1) {
                    this.currentSlide++;
                } else if (diff < 0 && this.currentSlide > 0) {
                    this.currentSlide--;
                }
            }
            this.startSlider();
        },
        sliderImgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        toggleFav(p) {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            p.liked = !p.liked;
        },
        catImgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">قسم</text></svg>');
        },
        productImageError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        startSlider() {
            this.slideTimer = setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            }, 2000);
        }
    },
    mounted() {
        this.startSlider();
    },
    beforeUnmount() {
        if (this.slideTimer) clearInterval(this.slideTimer);
    }
};
