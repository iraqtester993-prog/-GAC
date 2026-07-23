const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
    { path: '/login', component: LoginPage },
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

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('gac-user') || 'null');
    if (to.path !== '/login' && !user) {
        next('/login');
    } else if (to.path === '/login' && user && !user.isGuest) {
        next('/');
    } else {
        next();
    }
});

const app = createApp({
    data() {
        return {
            cartCount: 0,
            isLoggedIn: !!JSON.parse(localStorage.getItem('gac-user') || 'null'),
            user: JSON.parse(localStorage.getItem('gac-user') || 'null')
        }
    },
    computed: {
        isGuest() {
            return this.user && this.user.isGuest;
        },
        showLayout() {
            return this.isLoggedIn && this.$route.path !== '/login';
        }
    },
    created() {
        this.updateCartCount();
        window.addEventListener('cart-updated', () => this.updateCartCount());
        window.addEventListener('auth-changed', () => this.refreshAuth());
    },
    methods: {
        updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('gac-cart') || '[]');
            this.cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
        },
        refreshAuth() {
            this.user = JSON.parse(localStorage.getItem('gac-user') || 'null');
            this.isLoggedIn = !!this.user;
        },
        logout() {
            localStorage.removeItem('gac-user');
            this.user = null;
            this.isLoggedIn = false;
            this.$router.push('/login');
        },
        goToLogin() {
            this.$router.push('/login');
        }
    }
});

app.component('app-header', AppHeader);
app.component('app-navbar', AppNavbar);
app.component('guest-warning', GuestWarning);

app.use(router);
app.mount('#app');
