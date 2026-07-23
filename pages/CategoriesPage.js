const CategoriesPage = {
    name: 'CategoriesPage',
    template: `
        <div class="categories-page">
            <h1 class="page-title">اقسام التسوق</h1>
            <div class="categories-grid">
                <div class="cat-grid-card" v-for="cat in categories" :key="cat.id" @click="$router.push('/category/' + cat.id)">
                    <div class="cat-grid-img-wrap">
                        <img :src="cat.image" :alt="cat.name" @error="imgError($event)">
                    </div>
                    <span class="cat-grid-name">{{ cat.name }}</span>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            categories: [
                { id: 'phones', name: 'هواتف ذكية', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg' },
                { id: 'laptops', name: 'لابتوبات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-m3-max.jpg' },
                { id: 'tablets', name: 'لوحات رقمية', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9.jpg' },
                { id: 'headphones', name: 'سماعات', image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg' },
                { id: 'watches', name: 'ساعات ذكية', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-9.jpg' },
                { id: 'accessories', name: 'ملحقات', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-airtag.jpg' }
            ]
        }
    },
    methods: {
        imgError(e) {
            e.target.style.display = 'none';
        }
    }
};
