const CategoryShowcase = {
    name: 'CategoryShowcase',
    template: `
        <div class="category-showcase">
            <div class="showcase-track" ref="track">
                <div class="showcase-item"
                     v-for="cat in displayCategories"
                     :key="cat.id"
                     :class="{ active: selected === cat.id }"
                     @click="onSelect(cat.id)">
                    <div class="showcase-icon">
                        <img class="showcase-icon-img" :src="cat.image" :alt="cat.name" referrerpolicy="no-referrer" @error="imgError($event)">
                    </div>
                    <div class="showcase-title">{{ cat.name }}</div>
                </div>
            </div>
        </div>
    `,
    props: {
        categories: { type: Array, default: null },
        modelValue: { type: String, default: '' }
    },
    emits: ['select', 'update:modelValue'],
    data() {
        return {
            selected: this.modelValue || '',
            defaultCategories: [
                { id: 'smartphones', name: 'هواتف', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' },
                { id: 'laptop', name: 'لابتوب', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
                { id: 'camera', name: 'كاميرا', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop' },
                { id: 'gaming', name: 'ألعاب', image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=200&h=200&fit=crop' },
                { id: 'perfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop' },
                { id: 'watches', name: 'ساعات', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&h=200&fit=crop' },
                { id: 'accessories', name: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }
            ]
        };
    },
    computed: {
        displayCategories() {
            return this.categories || this.defaultCategories;
        }
    },
    watch: {
        modelValue(newVal) {
            if (newVal !== this.selected) this.selected = newVal;
        }
    },
    mounted() {
        if (!this.selected && this.displayCategories.length) {
            this.selected = this.displayCategories[0].id;
        }
    },
    methods: {
        onSelect(id) {
            this.selected = id;
            this.$emit('select', id);
            this.$emit('update:modelValue', id);
        },
        imgError(e) {
            e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="%23121b2c"/><text x="50" y="55" text-anchor="middle" fill="%23c9a243" font-size="12">صورة</text></svg>');
        }
    }
};
