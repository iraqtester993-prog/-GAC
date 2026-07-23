const AccountPage = {
    name: 'AccountPage',
    template: `
        <div class="account-page">
            <div class="account-profile">
                <div class="account-avatar">
                    <span class="material-symbols-outlined">person</span>
                </div>
                <div class="account-name">أحمد محمد</div>
                <div class="account-email">ahmed@example.com</div>
            </div>

            <div class="account-menu">
                <div class="account-card" v-for="item in menuItems" :key="item.title">
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
        </div>
    `,
    data() {
        return {
            menuItems: [
                { icon: 'shopping_bag', title: 'طلباتي', desc: 'تتبع طلباتك و_history' },
                { icon: 'location_on', title: 'عناويني', desc: 'إدارة عناوين الشحن' },
                { icon: 'favorite', title: 'المفضلة', desc: 'المنتجات المحفوظة' },
                { icon: 'payment', title: 'طرق الدفع', desc: 'إدارة البطاقات والمحافظ' },
                { icon: 'receipt_long', title: 'أقساطي', desc: 'متابعة الاقساط المستحقة' },
                { icon: 'support_agent', title: 'الدعم الفني', desc: 'تواصل معنا' },
                { icon: 'settings', title: 'الإعدادات', desc: 'تفضيلات الحساب' },
                { icon: 'info', title: 'عن التطبيق', desc: 'العصر الذهبي v1.0.0' },
                { icon: 'logout', title: 'تسجيل الخروج', desc: 'الخروج من الحساب' }
            ]
        }
    }
};
