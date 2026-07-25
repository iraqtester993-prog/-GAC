const AppNavbar = {
    name: 'AppNavbar',
    template: `
        <nav class="app-navbar">
            <button
                class="nav-item"
                :class="{ active: currentRoute === '/' }"
                @click="navigate('/')"
            >
                <span class="material-symbols-outlined">home</span>
                <span class="nav-label">الرئيسية</span>
            </button>

            <button
                class="nav-item"
                :class="{ active: currentRoute === '/categories' }"
                @click="navigate('/categories')"
            >
                <span class="material-symbols-outlined">grid_view</span>
                <span class="nav-label">الأقسام</span>
            </button>

            <div class="nav-fab-wrap">
                <button
                    class="nav-fab"
                    :class="{ active: currentRoute === '/cart' }"
                    @click="navigate('/cart')"
                >
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <span class="nav-fab-badge" v-if="cartCount > 0">{{ cartCount }}</span>
                </button>
            </div>

            <button
                class="nav-item"
                :class="{ active: currentRoute === '/account' }"
                @click="navigate('/account')"
            >
                <span class="material-symbols-outlined">person</span>
                <span class="nav-label">حسابي</span>
            </button>

            <button
                class="nav-item"
                :class="{ active: currentRoute === '/settings' }"
                @click="navigate('/settings')"
            >
                <span class="material-symbols-outlined">settings</span>
                <span class="nav-label">الإعدادات</span>
            </button>
        </nav>
    `,
    computed: {
        currentRoute() {
            return this.$route.path;
        },
        cartCount() {
            const cart = JSON.parse(localStorage.getItem('gac-cart') || '[]');
            return cart.reduce((sum, item) => sum + item.qty, 0);
        }
    },
    methods: {
        navigate(path) {
            this.$router.push(path);
        }
    }
};
