const CartPage = {
    name: 'CartPage',
    template: `
        <div class="cart-page">
            <h1 class="page-title">سلة التسوق</h1>

            <div v-if="isGuest" class="guest-restricted">
                <guest-warning feature="إضافة المنتجات للسلة والشراء" @close="showWarning = false" v-if="showWarning"></guest-warning>
                <div class="guest-restricted-view">
                    <div class="guest-restricted-icon">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <div class="guest-restricted-title">سلة التسوق</div>
                    <div class="guest-restricted-desc">يجب تسجيل الدخول لإضافة المنتجات للسلة واتمام الشراء</div>
                    <button class="guest-restricted-btn" @click="goCreate">
                        <span class="material-symbols-outlined">person_add</span>
                        إنشاء حساب مجاني
                    </button>
                </div>
            </div>

            <div v-else-if="cart.length > 0">
                <div class="cart-items">
                    <div class="cart-item" v-for="item in cart" :key="item.id">
                        <div class="cart-item-img">
                            <img :src="item.image" :alt="item.name" @error="imgError($event)">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">{{ item.name }}</div>
                            <div class="cart-item-price">{{ item.price.toLocaleString() }} د.ع</div>
                            <div class="cart-qty-control">
                                <button class="cart-qty-btn" @click="changeQty(item, -1)">
                                    <span class="material-symbols-outlined">remove</span>
                                </button>
                                <span class="cart-qty-num">{{ item.qty }}</span>
                                <button class="cart-qty-btn" @click="changeQty(item, 1)">
                                    <span class="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                        <button class="cart-item-remove" @click="removeItem(item.id)">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>

                <div class="cart-summary">
                    <div class="summary-row">
                        <span class="summary-row-label">المجموع الفرعي</span>
                        <span class="summary-row-value">{{ subtotal.toLocaleString() }} د.ع</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-row-label">الشحن</span>
                        <span class="summary-row-value">{{ shipping.toLocaleString() }} د.ع</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-row-label">ضريبة القيمة المضافة (10%)</span>
                        <span class="summary-row-value">{{ tax.toLocaleString() }} د.ع</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row summary-total">
                        <span class="summary-row-label">الاجمالي</span>
                        <span class="summary-row-value">{{ total.toLocaleString() }} د.ع</span>
                    </div>
                </div>

                <button class="checkout-btn" @click="checkout">اتمام الشراء</button>
            </div>

            <div class="cart-empty" v-else>
                <div class="empty-icon">
                    <span class="material-symbols-outlined">shopping_cart</span>
                </div>
                <div class="cart-empty-title">سلة التسوق فارغة</div>
                <div class="cart-empty-text">ابدأ التسوق وااضف المنتجات الى سلتك</div>
            </div>
        </div>
    `,
    data() {
        return {
            cart: JSON.parse(localStorage.getItem('gac-cart') || '[]'),
            showWarning: false,
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest)
        }
    },
    computed: {
        subtotal() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        },
        shipping() {
            return this.subtotal > 500000 ? 0 : 15000;
        },
        tax() {
            return Math.round(this.subtotal * 0.1);
        },
        total() {
            return this.subtotal + this.shipping + this.tax;
        }
    },
    methods: {
        changeQty(item, delta) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.cart = this.cart.filter(i => i.id !== item.id);
            }
            this.saveCart();
        },
        removeItem(id) {
            this.cart = this.cart.filter(i => i.id !== id);
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('gac-cart', JSON.stringify(this.cart));
            window.dispatchEvent(new Event('cart-updated'));
        },
        checkout() {
            alert('تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.');
            this.cart = [];
            this.saveCart();
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%231a3a5c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        },
        goCreate() {
            localStorage.removeItem('gac-user');
            this.$router.push('/login');
        }
    },
    watch: {
        cart: {
            handler(val) {
                localStorage.setItem('gac-cart', JSON.stringify(val));
            },
            deep: true
        }
    }
};
