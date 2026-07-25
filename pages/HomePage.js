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
                            <div class="hero-subtitle" v-if="slide.subtitle">{{ slide.subtitle }}</div>
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
                <button class="hero-arrow hero-arrow-right" @click="prevSlide" v-if="currentSlide > 0">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
                <button class="hero-arrow hero-arrow-left" @click="nextSlide" v-if="currentSlide < slides.length - 1">
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">الأقسام</h2>
                <button class="view-all-btn" @click="$router.push('/categories')">
                    الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="categories-scroll">
                <div class="category-card" v-for="cat in categories" :key="cat.id" @click="$router.push('/category/' + cat.id)">
                    <div class="category-icon-wrap">
                        <span class="material-symbols-outlined">{{ cat.icon }}</span>
                    </div>
                    <span class="category-name">{{ cat.name }}</span>
                </div>
            </div>

            <div class="section-golden-strip"></div>

            <div class="section-header">
                <h2 class="section-title">المنتجات <span>المميزة</span></h2>
                <button class="view-all-btn" @click="$router.push('/categories')">
                    الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <div class="products-grid">
                <div class="product-card" v-for="p in allProducts" :key="p.id">
                    <div class="product-image-wrap">
                        <img :src="p.image" :alt="p.name" referrerpolicy="no-referrer" @error="productImageError($event)">
                        <div class="installment-ribbon" v-if="p.installment"><span>أقساط</span></div>
                        <span class="product-discount" v-if="p.discount && !p.installment">-{{ p.discount }}%</span>
                        <button class="product-fav" :class="{ liked: p.liked }" @click.stop="toggleFav(p)">
                            <span class="material-symbols-outlined">{{ p.liked ? 'favorite' : 'favorite_border' }}</span>
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-name">{{ p.name }}</div>
                        <div class="product-price-row">
                            <span class="product-price">{{ p.price.toLocaleString() }} ر.س</span>
                            <span class="product-old-price" v-if="p.oldPrice">{{ p.oldPrice.toLocaleString() }} ر.س</span>
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
                    badge: 'عروض اليوم الأولي',
                    title: 'ساعات فاخرة وعطور',
                    subtitle: 'المنتجات القادمة',
                    btn: 'تسوق الآن',
                    category: 'watches',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg'
                },
                {
                    badge: 'جديدنا هذا الأسبوع',
                    title: 'أحدث الأجهزة الإلكترونية',
                    subtitle: 'اكتشف المزيد',
                    btn: 'اكتشف المزيد',
                    category: 'phones',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg'
                },
                {
                    badge: 'عروض حصرية',
                    title: 'أزياء وإكسسوارات',
                    subtitle: 'تشكيلة مميزة',
                    btn: 'تصفح الآن',
                    category: 'laptops',
                    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m3-13-inch.jpg'
                }
            ],
            categories: [
                { id: 'phones', name: 'Elec', icon: 'devices' },
                { id: 'laptops', name: 'Fashion', icon: 'checkroom' },
                { id: 'headphones', name: 'Perfume', icon: 'air' },
                { id: 'watches', name: 'Jewelry', icon: 'diamond' }
            ],
            allProducts: [
                { id: 1, name: 'حذاء رياضي أسود', price: 500, oldPrice: 650, discount: 23, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg', installment: false, liked: false },
                { id: 2, name: 'محفظة جلدية', price: 500, oldPrice: 700, discount: 29, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airpods-pro-2nd-gen.jpg', installment: false, liked: false },
                { id: 3, name: 'حذاء رياضي أسود', price: 500, oldPrice: 600, discount: 17, image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wf-1000xm5.jpg', installment: false, liked: false },
                { id: 4, name: 'ساعة يد فاخرة', price: 1200, oldPrice: 1500, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg', installment: true, liked: false },
                { id: 5, name: 'عطر رجالي مميز', price: 350, oldPrice: 450, discount: 22, image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg', installment: false, liked: false },
                { id: 6, name: 'نظارة شمسية', price: 280, oldPrice: 350, discount: 20, image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg', installment: false, liked: false }
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
        prevSlide() {
            if (this.currentSlide > 0) this.currentSlide--;
        },
        nextSlide() {
            if (this.currentSlide < this.slides.length - 1) this.currentSlide++;
        },
        sliderImgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%23141924"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        toggleFav(p) {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            p.liked = !p.liked;
        },
        productImageError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%23141924"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        startSlider() {
            this.slideTimer = setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            }, 4000);
        }
    },
    mounted() {
        this.startSlider();
    },
    beforeUnmount() {
        if (this.slideTimer) clearInterval(this.slideTimer);
    }
};
