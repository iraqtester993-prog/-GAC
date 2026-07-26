const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/', component: HomePage },
    { path: '/categories', component: CategoriesPage },
    { path: '/category/:id', component: CategoryPage },
    { path: '/cart', component: CartPage },
    { path: '/installments', component: InstallmentsPage },
    { path: '/account', component: AccountPage },
    { path: '/settings', component: SettingsPage }
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
            user: JSON.parse(localStorage.getItem('gac-user') || 'null'),
            pullStartY: 0,
            pullOffset: 0,
            pullActive: false,
            refreshing: false,
            lastScrollY: 0,
            stickyHeader: false
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
    mounted() {
        this.$nextTick(() => {
            const content = this.$refs.mainContent;
            if (content) {
                content.addEventListener('scroll', this.onScroll, { passive: true });
            }
        });
    },
    beforeUnmount() {
        const content = this.$refs.mainContent;
        if (content) {
            content.removeEventListener('scroll', this.onScroll);
        }
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
        },
        onScroll(e) {
            const content = this.$refs.mainContent;
            if (!content) return;
            const currentScroll = content.scrollTop;
            const isHome = this.$route && this.$route.path === '/';
            const threshold = 80;

            if (isHome) {
                if (currentScroll <= 10) {
                    this.stickyHeader = false;
                } else if (currentScroll > this.lastScrollY) {
                    // Scrolling down
                    this.stickyHeader = false;
                } else if (currentScroll < this.lastScrollY) {
                    // Scrolling up
                    this.stickyHeader = true;
                }
            } else {
                this.stickyHeader = false;
            }

            if (this.stickyHeader) {
                document.body.classList.add('header-sticky');
            } else {
                document.body.classList.remove('header-sticky');
            }

            this.lastScrollY = currentScroll;
        },
        onPullStart(e) {
            if (this.refreshing) return;
            const content = this.$refs.mainContent;
            if (content && content.scrollTop <= 0) {
                this.pullStartY = e.touches[0].clientY;
                this.pullActive = true;
            }
        },
        onPullMove(e) {
            if (!this.pullActive || this.refreshing) return;
            const diff = e.touches[0].clientY - this.pullStartY;
            if (diff > 0 && this.$refs.mainContent && this.$refs.mainContent.scrollTop <= 0) {
                this.pullOffset = Math.min(diff * 0.45, 120);
                if (e.cancelable) e.preventDefault();
            }
        },
        onPullEnd() {
            if (!this.pullActive) return;
            if (this.pullOffset > 60 && !this.refreshing) {
                this.refreshing = true;
                this.pullOffset = 70;
                setTimeout(() => {
                    this.refreshing = false;
                    this.pullOffset = 0;
                    this.pullActive = false;
                    window.location.reload();
                }, 2000);
            } else {
                this.pullOffset = 0;
                this.pullActive = false;
            }
        }
    }
});

app.component('app-header', AppHeader);
app.component('app-navbar', AppNavbar);
app.component('guest-warning', GuestWarning);
app.component('category-showcase', CategoryShowcase);

app.use(router);
app.mount('#app');
