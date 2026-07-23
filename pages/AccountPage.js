const AccountPage = {
    name: 'AccountPage',
    template: `
        <div class="account-page">
            <div class="account-profile">
                <div class="account-avatar">
                    <span class="material-symbols-outlined">{{ isGuest ? 'explore' : 'person' }}</span>
                </div>
                <div class="account-name">{{ userName }}</div>
                <div class="account-email" v-if="!isGuest">{{ userPhone }}</div>
                <div class="account-email" v-else>حساب تجريبي - تصفح فقط</div>
            </div>

            <div class="account-menu">
                <div class="account-card" v-for="item in visibleMenuItems" :key="item.title" @click="handleMenu(item)">
                    <div class="account-card-icon">
                        <span class="material-symbols-outlined">{{ item.icon }}</span>
                    </div>
                    <div class="account-card-info">
                        <div class="account-card-title">{{ item.title }}</div>
                        <div class="account-card-desc">{{ item.desc }}</div>
                    </div>
                    <div class="account-card-arrow">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </div>
                </div>
            </div>

            <guest-warning :feature="guestFeature" @close="showWarning = false" v-if="showWarning"></guest-warning>
        </div>
    `,
    data() {
        const user = JSON.parse(localStorage.getItem('gac-user') || '{}');
        return {
            isGuest: !!user.isGuest,
            userName: user.name || 'مستخدم',
            userPhone: user.phone || '',
            showWarning: false,
            guestFeature: '',
            allMenuItems: [
                { icon: 'shopping_bag', title: 'طلباتي', desc: 'تتبع طلباتك وسجلها', guest: false },
                { icon: 'location_on', title: 'عناويني', desc: 'إدارة عناوين الشحن', guest: false },
                { icon: 'favorite', title: 'المفضلة', desc: 'المنتجات المحفوظة', guest: false },
                { icon: 'payment', title: 'طرق الدفع', desc: 'إدارة البطاقات والمحافظ', guest: false },
                { icon: 'receipt_long', title: 'أقساطي', desc: 'متابعة الاقساط المستحقة', guest: false },
                { icon: 'support_agent', title: 'الدعم الفني', desc: 'تواصل معنا', guest: true },
                { icon: 'settings', title: 'الإعدادات', desc: 'تفضيلات الحساب', guest: true },
                { icon: 'info', title: 'عن التطبيق', desc: 'العصر الذهبي v1.0.0', guest: true },
                { icon: 'logout', title: 'تسجيل الخروج', desc: 'الخروج من الحساب', guest: true }
            ]
        }
    },
    computed: {
        visibleMenuItems() {
            if (this.isGuest) {
                return this.allMenuItems.filter(i => i.guest);
            }
            return this.allMenuItems;
        }
    },
    methods: {
        handleMenu(item) {
            if (item.title === 'تسجيل الخروج') {
                localStorage.removeItem('gac-user');
                this.$router.push('/login');
                return;
            }
            if (this.isGuest && !item.guest) {
                this.guestFeature = item.title;
                this.showWarning = true;
                return;
            }
        }
    }
};
