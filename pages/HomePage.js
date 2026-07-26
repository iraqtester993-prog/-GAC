const HomePage = {
    name: 'HomePage',
    template: `
        <div class="home-page">
            <div class="home-logo-wrap" @click="$router.push('/')">
                <img class="home-logo" src="icons/logo.png?v=2" alt="GAC" @error="homeLogoError($event)">
            </div>

            <div class="home-search-bar" @click="$router.push('/categories')">
                <div class="home-search-icon">
                    <span class="material-symbols-outlined">search</span>
                </div>
                <span class="home-search-placeholder">البحث</span>
            </div>

            <div class="hero-slider" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
                <div class="hero-track" :style="{ transform: 'translateX(' + (currentSlide * -100) + '%)' }">
                    <div class="hero-slide" v-for="(slide, i) in slides" :key="i">
                        <img class="hero-bg-img" :src="slide.image" :alt="slide.title" @error="sliderImgError($event)">
                        <div class="hero-overlay"></div>
                        <div class="hero-content">
                            <div class="hero-badge-tag">{{ slide.badge }}</div>
                            <div class="hero-title">{{ slide.title }}</div>
                            <div class="hero-subtitle" v-if="slide.subtitle">{{ slide.subtitle }}</div>
                            <button class="hero-btn" @click.stop="$router.push('/category/' + slide.category)">
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
                <h2 class="section-title">تصفح الأقسام</h2>
                <button class="view-all-btn" @click="$router.push('/categories')">
                    الكل
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
            <category-showcase @select="$router.push('/categories')"></category-showcase>

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
                    </div>
                    <div class="product-info">
                        <div class="product-name">{{ p.name }}</div>
                        <div class="product-price-row">
                            <span class="product-price">{{ p.price.toLocaleString() }} ر.س</span>
                            <span class="product-old-price" v-if="p.oldPrice">{{ p.oldPrice.toLocaleString() }} ر.س</span>
                        </div>
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
            slides: [
                {
                    badge: 'عروض اليوم الأولي',
                    title: 'ساعات فاخرة',
                    subtitle: 'تشكيلة من الساعات والمجوهرات',
                    btn: 'تسوق الآن',
                    category: 'watches',
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'
                },
                {
                    badge: 'جديدنا هذا الأسبوع',
                    title: 'أزياء وإكسسوارات',
                    subtitle: 'أحدث الموديلات والتصاميم',
                    btn: 'اكتشف المزيد',
                    category: 'laptops',
                    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'
                },
                {
                    badge: 'عروض حصرية',
                    title: 'عطور فاخرة',
                    subtitle: 'تشكيلة عطور ماركات عالمية',
                    btn: 'تصفح الآن',
                    category: 'headphones',
                    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80'
                },
                {
                    badge: 'تصوير احترافي',
                    title: 'مجوهرات وألماس',
                    subtitle: 'إطلالة ساحرة لكل مناسبة',
                    btn: 'استكشف',
                    category: 'watches',
                    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80'
                },
                {
                    badge: 'اختيار المميزين',
                    title: 'أجهزة إلكترونية',
                    subtitle: 'أحدث التقنيات بأفضل الأسعار',
                    btn: 'تسوق الآن',
                    category: 'phones',
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'
                }
            ],
            allProducts: [
                { id: 1, name: 'ساعة ذكية رياضية', price: 500, oldPrice: 650, discount: 23, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', installment: false },
                { id: 2, name: 'هاتف ذكي فاخر', price: 500, oldPrice: 700, discount: 29, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80', installment: false },
                { id: 3, name: 'سماعة لاسلكية', price: 500, oldPrice: 600, discount: 17, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', installment: false },
                { id: 4, name: 'ساعة يد فاخرة', price: 1200, oldPrice: 1500, discount: 20, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80', installment: true },
                { id: 5, name: 'حذاء رياضي أنيق', price: 350, oldPrice: 450, discount: 22, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', installment: false },
                { id: 6, name: 'عطر رجالي مميز', price: 280, oldPrice: 350, discount: 20, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80', installment: false }
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
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%23454440"/><text x="50" y="55" text-anchor="middle" fill="%23b99655" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        homeLogoError(e) {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="home-logo-fallback"><div class="home-logo-en">GAC</div><div class="home-logo-ar">العصر الذهبي</div></div>';
        },
        productImageError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="%23454440"/><text x="50" y="55" text-anchor="middle" fill="%23b99655" font-size="14" font-family="sans-serif">صورة</text></svg>');
        },
        startSlider() {
            if (this.slideTimer) clearInterval(this.slideTimer);
            this.slideTimer = setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            }, 2000);
        },
        preloadImages() {
            this.slides.forEach(slide => {
                const img = new Image();
                img.src = slide.image;
            });
        }
    },
    mounted() {
        this.preloadImages();
        this.startSlider();
    },
    beforeUnmount() {
        if (this.slideTimer) clearInterval(this.slideTimer);
    }
};
