const DealPage = {
    name: 'DealPage',
    template: `
        <div class="deal-page">
            <div class="deal-banner">
                <span class="material-symbols-outlined deal-banner-icon">shield</span>
                <div class="deal-banner-title">صفقة اليوم</div>
                <div class="deal-banner-desc">خصم حصري لفترة محدودة</div>
                <div class="deal-timer">
                    <div class="deal-timer-block">
                        <div class="deal-timer-num">{{ hours }}</div>
                        <div class="deal-timer-label">ساعة</div>
                    </div>
                    <div class="deal-timer-block">
                        <div class="deal-timer-num">{{ minutes }}</div>
                        <div class="deal-timer-label">دقيقة</div>
                    </div>
                    <div class="deal-timer-block">
                        <div class="deal-timer-num">{{ seconds }}</div>
                        <div class="deal-timer-label">ثانية</div>
                    </div>
                </div>
            </div>

            <div class="section-header">
                <h2 class="section-title">عروض <span>حصرية</span></h2>
            </div>

            <div class="product-list">
                <div class="product-row-card" v-for="p in deals" :key="p.id" @click="$router.push('/product/' + p.id)">
                    <div class="product-row-image">
                        <img :src="p.image" :alt="p.name" @error="imgError($event)">
                        <span class="product-discount" style="position:absolute;top:4px;right:4px;">-{{ p.discount }}%</span>
                    </div>
                    <div class="product-row-info">
                        <div class="product-row-name">{{ p.name }}</div>
                        <ul class="product-row-specs">
                            <li v-for="(s, i) in p.specs" :key="i">{{ s }}</li>
                        </ul>
                        <div class="product-row-bottom">
                            <div>
                                <span class="product-row-price">{{ p.price.toLocaleString() }} د.ع</span>
                                <span class="product-old-price" style="margin-right:6px;">{{ p.oldPrice.toLocaleString() }} د.ع</span>
                            </div>
                            <button class="btn-gold btn-add-cart-sm" @click.stop="addToCart(p)">
                                <span class="material-symbols-outlined">add_shopping_cart</span>
                                أضف للسلة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            hours: '05',
            minutes: '42',
            seconds: '18',
            timerInterval: null,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            deals: [
                { id: 101, name: 'غسالة الملابس الذكية', price: 999000, oldPrice: 1250000, discount: 20, specs: ['سعة 10 كيلو', 'تقنية AI Wash'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' },
                { id: 103, name: 'ثلاجة 500 لتر', price: 1480000, oldPrice: 1850000, discount: 20, specs: ['No Frost', 'موفر للطاقة'], image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop' },
                { id: 104, name: 'تلفزيون 55 بوصة 4K', price: 760000, oldPrice: 950000, discount: 20, specs: ['Smart TV', 'HDR10+'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' }
            ]
        }
    },
    methods: {
        addToCart(p) {
            if (this.isGuest) return;
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
        },
        startTimer() {
            let total = 5 * 3600 + 42 * 60 + 18;
            this.timerInterval = setInterval(() => {
                if (total <= 0) { clearInterval(this.timerInterval); return; }
                total--;
                this.hours = String(Math.floor(total / 3600)).padStart(2, '0');
                this.minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
                this.seconds = String(total % 60).padStart(2, '0');
            }, 1000);
        }
    },
    mounted() { this.startTimer(); },
    beforeUnmount() { if (this.timerInterval) clearInterval(this.timerInterval); }
};
