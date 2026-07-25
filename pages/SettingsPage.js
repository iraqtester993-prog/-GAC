const SettingsPage = {
    name: 'SettingsPage',
    template: `
        <div class="settings-page">
            <h1 class="page-title">الإعدادات</h1>

            <div class="settings-group">
                <div class="settings-group-title">عام</div>
                <div class="settings-card" @click="toggleTheme">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">المظهر</div>
                        <div class="settings-card-desc">{{ isDark ? 'الوضع الداكن' : 'الوضع الفاتح' }}</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
                <div class="settings-card">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">language</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">اللغة</div>
                        <div class="settings-card-desc">العربية</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
                <div class="settings-card">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">notifications</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">اشعارات</div>
                        <div class="settings-card-desc">إدارة الاشعارات</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
            </div>

            <div class="settings-group">
                <div class="settings-group-title">الحساب</div>
                <div class="settings-card" @click="$router.push('/account')">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">الملف الشخصي</div>
                        <div class="settings-card-desc">{{ userName }}</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
                <div class="settings-card">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">lock</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">الخصوصية والأمان</div>
                        <div class="settings-card-desc">إدارة بياناتك</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
            </div>

            <div class="settings-group">
                <div class="settings-group-title">الدعم</div>
                <div class="settings-card">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">help</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">المساعدة</div>
                        <div class="settings-card-desc">الاسئلة الشائعة</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
                <div class="settings-card">
                    <div class="settings-card-icon">
                        <span class="material-symbols-outlined">info</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title">عن التطبيق</div>
                        <div class="settings-card-desc">العصر الذهبي v1.0.0</div>
                    </div>
                    <span class="material-symbols-outlined settings-card-arrow">chevron_left</span>
                </div>
            </div>

            <div class="settings-group">
                <div class="settings-card settings-logout" @click="logout">
                    <div class="settings-card-icon settings-logout-icon">
                        <span class="material-symbols-outlined">logout</span>
                    </div>
                    <div class="settings-card-info">
                        <div class="settings-card-title settings-logout-text">تسجيل الخروج</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        const user = JSON.parse(localStorage.getItem('gac-user') || '{}');
        return {
            isDark: !document.documentElement.classList.contains('light-mode'),
            userName: user.name || 'مستخدم'
        }
    },
    methods: {
        toggleTheme() {
            this.isDark = !this.isDark;
            document.documentElement.classList.toggle('light-mode');
            localStorage.setItem('gac-theme', this.isDark ? 'dark' : 'light');
        },
        logout() {
            localStorage.removeItem('gac-user');
            this.$router.push('/login');
        }
    }
};
