const CategoryPage = {
    name: 'CategoryPage',
    template: `
        <div class="category-page">
            <div class="cat-page-header">
                <button class="cat-back-btn" @click="$router.back()">
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <h1 class="page-title" style="margin-bottom:0;flex:1;text-align:center;">{{ categoryName }}</h1>
            </div>

            <div class="product-list" style="padding-top:12px;" v-if="products.length">
                <div class="product-row-card" v-for="p in products" :key="p.id" @click="$router.push('/product/' + p.id)">
                    <div class="product-row-image">
                        <img :src="p.image" :alt="p.name" @error="imgError($event)">
                    </div>
                    <div class="product-row-info">
                        <div class="product-row-name">{{ p.name }}</div>
                        <ul class="product-row-specs">
                            <li v-for="(spec, i) in p.specs" :key="i">{{ spec }}</li>
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

            <div class="cart-empty" v-else>
                <div class="empty-icon">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <div class="cart-empty-title">لا توجد منتجات</div>
                <div class="cart-empty-text">لم يتم اضافة منتجات لهذا القسم بعد</div>
            </div>
        </div>
    `,
    data() {
        return {
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest)
        }
    },
    computed: {
        categoryId() {
            return this.$route.params.id;
        },
        categoryName() {
            const names = {
                fridge: 'الثلاجات',
                washer: 'الغسالات',
                microwave: 'أجهزة الميكروويف',
                tv: 'التلفزيونات',
                vacuum: 'المكانس الكهربائية',
                blender: 'الخلاطات'
            };
            return names[this.categoryId] || 'قسم';
        },
        products() {
            return this.getCategoryProducts();
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
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="%23141414"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="14">صورة</text></svg>');
        },
        getCategoryProducts() {
            const all = {
                fridge: [
                    { id: 201, name: 'ثلاجة 500 لتر No Frost', price: 1850000, rating: 5, specs: ['No Frost', 'موفر A++', 'فلتر مياه'], image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop' },
                    { id: 202, name: 'ثلاجة 400 لتر Side by Side', price: 2200000, rating: 4, specs: ['Side by Side', 'Dispenser', 'Smart Control'], image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop' },
                    { id: 203, name: 'ثلاجة 350 لتر', price: 1350000, rating: 4, specs: ['موفر للطاقة', '3 أدراج', 'LED Lighting'], image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop' }
                ],
                washer: [
                    { id: 101, name: 'غسالة الملابس الذكية', price: 1250000, rating: 5, specs: ['سعة 10 كيلو', 'AI Wash', 'A+++'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' },
                    { id: 204, name: 'غسالة 8 كيلو أوتومatik', price: 850000, rating: 4, specs: ['8 كيلو', '14 برنامج', 'Inverter Motor'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' },
                    { id: 205, name: 'غسالة 7 كيلو', price: 650000, rating: 4, specs: ['7 كيلو', 'Eco Bubble', 'موفر للطاقة'], image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=300&h=300&fit=crop' }
                ],
                microwave: [
                    { id: 102, name: 'ميكروويف 30 لتر', price: 285000, rating: 4, specs: ['900 واط', 'شواية', '9 برامج'], image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=300&h=300&fit=crop' },
                    { id: 206, name: 'ميكروويف 20 لتر', price: 175000, rating: 3, specs: ['700 واط', '5 مستويات', 'تصميم مدمج'], image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=300&h=300&fit=crop' },
                    { id: 207, name: 'ميكروويف 25 لتر Convection', price: 350000, rating: 5, specs: ['Convection', '1000 واط', 'Grill + Bake'], image: 'https://images.unsplash.com/photo-1585659722983-3b032a8f6a31?w=300&h=300&fit=crop' }
                ],
                tv: [
                    { id: 104, name: 'تلفزيون 55 بوصة 4K', price: 950000, rating: 4, specs: ['Smart TV', 'HDR10+', '120Hz'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' },
                    { id: 208, name: 'تلفزيون 65 بوصة OLED', price: 1850000, rating: 5, specs: ['OLED', 'Dolby Vision', 'Smart TV'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' },
                    { id: 209, name: 'تلفزيون 43 بوصة Full HD', price: 450000, rating: 4, specs: ['Full HD', 'Smart TV', '2 HDMI'], image: 'https://images.unsplash.com/photo-1593359677873-a4bb92f829d1?w=300&h=300&fit=crop' }
                ],
                vacuum: [
                    { id: 210, name: 'مكنسة رobot ذكية', price: 550000, rating: 5, specs: ['Robot', 'Mapping', 'Auto Charge'], image: 'https://images.unsplash.com/photo-1558317379-0bac8669a826?w=300&h=300&fit=crop' },
                    { id: 211, name: 'مكنسة كهربائية 2000W', price: 185000, rating: 4, specs: ['2000 واط', 'HEPA Filter', '3L Capacity'], image: 'https://images.unsplash.com/photo-1558317379-0bac8669a826?w=300&h=300&fit=crop' }
                ],
                blender: [
                    { id: 3, name: 'خلاط 1000 واط', price: 85000, rating: 4, specs: ['1000 واط', '6 سرعات', '1.5 لتر'], image: 'https://images.unsplash.com/photo-1570222094114-d054022797fb?w=300&h=300&fit=crop' },
                    { id: 212, name: 'خلاط 800 واط', price: 55000, rating: 3, specs: ['800 واط', '4 سرعات', '1 لتر'], image: 'https://images.unsplash.com/photo-1570222094114-d054022797fb?w=300&h=300&fit=crop' }
                ]
            };
            return all[this.categoryId] || [];
        }
    }
};
