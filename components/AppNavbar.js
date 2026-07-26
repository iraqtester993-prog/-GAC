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
                :class="{ active: currentRoute === '/installments' }"
                @click="navigate('/installments')"
            >
                <span class="material-symbols-outlined">description</span>
                <span class="nav-label">الطلبات</span>
            </button>

            <div class="nav-fab-wrap">
                <button
                    class="nav-fab"
                    @click="navigate('/categories')"
                >
                    <span class="material-symbols-outlined nav-fab-icon">shield</span>
                </button>
                <span class="nav-fab-label">طلب استشارة جديدة</span>
            </div>

            <button
                class="nav-item"
                :class="{ active: currentRoute === '/account' }"
                @click="navigate('/account')"
            >
                <span class="material-symbols-outlined">mail</span>
                <span class="nav-label">الرسائل</span>
            </button>

            <button
                class="nav-item"
                :class="{ active: currentRoute === '/account' }"
                @click="navigate('/account')"
            >
                <span class="material-symbols-outlined">person</span>
                <span class="nav-label">حسابي</span>
            </button>
        </nav>
    `,
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    methods: {
        navigate(path) {
            this.$router.push(path);
        }
    }
};
