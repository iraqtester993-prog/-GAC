const AppHeader = {
    name: 'AppHeader',
    template: `
        <header class="app-header">
            <div class="header-right">
                <button class="header-icon-btn" @click="toggleSearch" title="بحث">
                    <span class="material-symbols-outlined">search</span>
                </button>
            </div>

            <div class="header-title" @click="goHome">
                <span class="title-gold">G</span><span class="title-white">A</span><span class="title-gold">C</span>
            </div>

            <div class="header-left">
                <button class="header-icon-btn" @click="toggleTheme" title="تبديل المود">
                    <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
                </button>
                <button class="header-icon-btn" @click="toggleNotif" title="الاشعارات">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="header-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
                </button>
            </div>

            <transition name="page-fade">
                <div class="search-overlay" v-if="showSearch">
                    <div class="search-top">
                        <input
                            class="search-input"
                            type="text"
                            placeholder="ابحث عن منتج..."
                            v-model="searchQuery"
                            ref="searchInput"
                            autofocus
                        >
                        <button class="search-close" @click="toggleSearch">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="search-results">
                        <div v-if="!searchQuery">
                            <div class="search-suggestions-title">عمليات بحث شائعة</div>
                            <div class="search-suggestion-item" v-for="s in suggestions" :key="s" @click="searchQuery = s">
                                <span class="material-symbols-outlined">trending_up</span>
                                <span class="search-suggestion-text">{{ s }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="search-suggestions-title">نتائج البحث عن "{{ searchQuery }}"</div>
                            <div class="search-suggestion-item" v-for="r in filteredResults" :key="r">
                                <span class="material-symbols-outlined">search</span>
                                <span class="search-suggestion-text">{{ r }}</span>
                            </div>
                            <div v-if="filteredResults.length === 0" style="text-align:center;padding:40px 0;">
                                <span class="material-symbols-outlined" style="font-size:48px;color:rgba(255,255,255,0.1);">search_off</span>
                                <p style="color:#6b8299;margin-top:8px;font-size:13px;">لا توجد نتائج</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <transition name="page-fade">
                <div class="notif-overlay" v-if="showNotif">
                    <div class="notif-header">
                        <span class="notif-title">الاشعارات</span>
                        <button class="notif-close" @click="toggleNotif">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="notif-list" v-if="notifications.length">
                        <div
                            class="notif-item"
                            :class="{ unread: n.unread }"
                            v-for="(n, i) in notifications"
                            :key="i"
                        >
                            <div class="notif-icon-wrap">
                                <span class="material-symbols-outlined">{{ n.icon }}</span>
                            </div>
                            <div class="notif-content">
                                <div class="notif-item-title">{{ n.title }}</div>
                                <div class="notif-item-desc">{{ n.desc }}</div>
                                <div class="notif-item-time">{{ n.time }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="notif-empty" v-else>
                        <span class="material-symbols-outlined">notifications_none</span>
                        <div class="notif-empty-title">لا توجد اشعارات</div>
                        <div class="notif-empty-text">ستظهر الاشعارات الجديدة هنا</div>
                    </div>
                </div>
            </transition>
        </header>
    `,
    data() {
        return {
            isDark: true,
            showSearch: false,
            showNotif: false,
            searchQuery: '',
            suggestions: [
                'ايفون 15 برو ماكس',
                'سامسونج جالكسي S24',
                'ماك بوك برو',
                'سماعات ابل',
                'ساعة ابل ووتش',
                'لابتوب لينوفو'
            ],
            allProducts: [
                'ايفون 15 برو ماكس', 'ايفون 15', 'ايفون 14', 'ايفون 13',
                'سامسونج جالكسي S24 الترا', 'سامسونج جالكسي A54', 'سامسونج جالكسي Z فولد',
                'ماك بوك برو M3', 'ماك بوك اير M2', 'ايباد برو',
                'سماعات ابل ايربودز برو', 'سماعات سوني', 'سماعات سامسونج',
                'ساعة ابل ووتش Ultra', 'ساعة سامسونج جالكسي ووتش',
                'لابتوب ديل XPS', 'لابتوب HP بيفيتش', 'لابتوب لينوفو ثينك باد',
                ' Galaxy Tab S9', 'ايباد اير', 'تابلت سامسونج',
                'شاحن لاسلكي', 'كيبورد بلوتوث', 'ماوس لاسلكي', 'حافظة هاتف'
            ],
            notifications: [
                { icon: 'local_offer', title: 'عرض خاص!', desc: 'خصم 30% على جميع الهواتف الذكية لمدة محدودة', time: 'منذ 5 دقائق', unread: true },
                { icon: 'local_shipping', title: 'تم شحن طلبك', desc: 'طلب رقم #12345 قيد الشحن وسيصل خلال 3 أيام', time: 'منذ ساعة', unread: true },
                { icon: 'payments', title: 'تذكير بالقسط', desc: 'القسط القادم المستحق خلال 5 أيام - 150,000 د.ع', time: 'منذ 3 ساعات', unread: false },
                { icon: 'new_releases', title: 'منتجات جديدة!', desc: 'تم اضافة سلسلة جديدة من اجهزة سامسونج', time: 'منذ يوم', unread: false }
            ]
        }
    },
    computed: {
        unreadCount() {
            return this.notifications.filter(n => n.unread).length;
        },
        filteredResults() {
            if (!this.searchQuery) return [];
            return this.allProducts.filter(p =>
                p.includes(this.searchQuery)
            );
        }
    },
    methods: {
        toggleTheme() {
            this.isDark = !this.isDark;
            document.documentElement.classList.toggle('light-mode');
            localStorage.setItem('gac-theme', this.isDark ? 'dark' : 'light');
        },
        toggleSearch() {
            this.showSearch = !this.showSearch;
            if (this.showSearch) {
                this.showNotif = false;
                this.$nextTick(() => {
                    if (this.$refs.searchInput) this.$refs.searchInput.focus();
                });
            }
        },
        toggleNotif() {
            this.showNotif = !this.showNotif;
            if (this.showNotif) {
                this.showSearch = false;
                this.notifications.forEach(n => n.unread = false);
            }
        },
        goHome() {
            this.$router.push('/');
            this.showSearch = false;
            this.showNotif = false;
        }
    },
    mounted() {
        this.isDark = !document.documentElement.classList.contains('light-mode');
    }
};
