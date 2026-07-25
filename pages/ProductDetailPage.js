const ProductDetailPage = {
    name: 'ProductDetailPage',
    template: `
        <div class="product-detail-page">
            <div class="pd-top-bar">
                <button class="cat-back-btn" @click="$router.back()">
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <div style="display:flex;gap:8px;">
                    <button class="header-icon-btn" @click="$router.push('/cart')">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </button>
                    <button class="header-icon-btn" @click="toggleFav">
                        <span class="material-symbols-outlined">{{ liked ? 'favorite' : 'favorite_border' }}</span>
                    </button>
                </div>
            </div>

            <div class="pd-image-section">
                <img :src="product.image" :alt="product.name" referrerpolicy="no-referrer" @error="imgError($event)">
            </div>

            <div class="pd-content">
                <h1 class="pd-title">{{ product.name }}</h1>
                <div class="pd-price-row">
                    <span class="pd-price">{{ product.price.toLocaleString() }} د.ع</span>
                    <span class="pd-old-price" v-if="product.oldPrice">{{ product.oldPrice.toLocaleString() }} د.ع</span>
                </div>

                <div class="product-stars" style="margin-bottom:16px;">
                    <span class="material-symbols-outlined" v-for="n in 5" :key="n" :class="{ 'star-empty': n > product.rating }">star</span>
                </div>

                <div class="pd-features-title">المميزات</div>
                <ul class="pd-features">
                    <li v-for="(f, i) in product.features" :key="i">{{ f }}</li>
                </ul>

                <div class="pd-delivery">
                    <div class="pd-delivery-title">
                        <span class="material-symbols-outlined">local_shipping</span>
                        موعد التوصيل المتوقع
                    </div>
                    <div class="pd-delivery-text">{{ product.delivery }}</div>
                </div>
            </div>

            <div class="pd-actions">
                <button class="btn-gold btn-gold-lg" @click="buyNow">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    شراء الآن
                </button>
                <button class="btn-outline-gold btn-outline-gold-lg" @click="addToCart">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                    أضف للسلة
                </button>
            </div>

            <guest-warning feature="إضافة المنتجات للسلة" @close="showGuestWarn = false" v-if="showGuestWarn"></guest-warning>
        </div>
    `,
    data() {
        return {
            liked: false,
            showGuestWarn: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            products: {
                1: { id: 1, name: 'ميكروويف 30 لتر ذكي', price: 285000, oldPrice: 350000, rating: 4, image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=400&h=400&fit=crop', features: ['سعة 30 لتر', '900 واط', '9 برامج طبخ', 'شواية داخلية', 'قفل أمان للأطفال'], delivery: 'التوصيل خلال 2-3 أيام عمل' },
                2: { id: 2, name: 'ماكينة قهوة فاخرة', price: 195000, rating: 5, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', features: ['15 بار ضغط', 'طحن حبوب مدمج', 'رغوة حليب تلقائية', 'تنظيف ذاتي'], delivery: 'التوصيل خلال 1-2 أيام عمل' },
                3: { id: 3, name: 'خلاط 1000 واط', price: 85000, rating: 4, image: 'https://images.unsplash.com/photo-1570222094114-d054022797fb?w=400&h=400&fit=crop', features: ['1000 واط', '6 سرعات', 'وعاء 1.5 لتر', 'شفرات ستانلس'], delivery: 'التوصيل خلال 2-3 أيام عمل' },
                4: { id: 4, name: 'محمصة خبز ذهبية', price: 65000, rating: 4, image: 'https://images.unsplash.com/photo-1587241327317-8c44da7d48f7?w=400&h=400&fit=crop', features: ['6 مستويات تحميص', 'فتحة عريضة', 'تصميم ذهبي فاخر'], delivery: 'التوصيل خلال 1-2 أيام عمل' },
                101: { id: 101, name: 'غسالة الملابس الذكية', price: 1250000, oldPrice: 1500000, rating: 5, image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=400&fit=crop', features: ['سعة 10 كيلو', 'تقنية AI Wash', 'موفر للطاقة A+++', '14 برنامج غسيل', 'تشغيل صامت 48dB'], delivery: 'التوصيل خلال 3-5 أيام عمل' },
                102: { id: 102, name: 'ميكروويف 30 لتر', price: 285000, rating: 4, image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=400&h=400&fit=crop', features: ['900 واط', 'شواية داخلية', '9 برامج طبخ', 'تصميم عصري'], delivery: 'التوصيل خلال 2-3 أيام عمل' },
                103: { id: 103, name: 'ثلاجة 500 لتر', price: 1850000, rating: 5, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop', features: ['No Frost', 'موفر للطاقة A++', 'فلتر مياه مدمج', 'أدراج Fresh Zone'], delivery: 'التوصيل خلال 3-5 أيام عمل' },
                104: { id: 104, name: 'تلفزيون 55 بوصة 4K', price: 950000, rating: 4, image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=400&h=400&fit=crop', features: ['Smart TV', 'HDR10+', '120Hz', 'Dolby Atmos', '4 منافذ HDMI'], delivery: 'التوصيل خلال 2-4 أيام عمل' }
            }
        }
    },
    computed: {
        productId() {
            return parseInt(this.$route.params.id);
        },
        product() {
            return this.products[this.productId] || {
                id: 0,
                name: 'منتج',
                price: 0,
                rating: 4,
                image: '',
                features: ['معلومات غير متوفرة'],
                delivery: 'سيتم التواصل معك'
            };
        }
    },
    methods: {
        toggleFav() {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            this.liked = !this.liked;
        },
        addToCart() {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            const cart = JSON.parse(localStorage.getItem('gac-cart') || '[]');
            const p = this.product;
            const existing = cart.find(i => i.id === p.id);
            if (existing) { existing.qty++; } else {
                cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 });
            }
            localStorage.setItem('gac-cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));
        },
        buyNow() {
            if (this.isGuest) { this.showGuestWarn = true; return; }
            this.addToCart();
            this.$router.push('/cart');
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%23141414"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        }
    }
};
