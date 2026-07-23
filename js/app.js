const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
    { path: '/', component: HomePage },
    { path: '/categories', component: CategoriesPage },
    { path: '/category/:id', component: CategoryPage },
    { path: '/cart', component: CartPage },
    { path: '/installments', component: InstallmentsPage },
    { path: '/account', component: AccountPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

const app = createApp({
    data() {
        return {
            cartCount: 0
        }
    },
    created() {
        this.updateCartCount();
        window.addEventListener('cart-updated', () => this.updateCartCount());
    },
    methods: {
        updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('gac-cart') || '[]');
            this.cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
        }
    }
});

app.component('app-header', AppHeader);
app.component('app-navbar', AppNavbar);

app.use(router);
app.mount('#app');
