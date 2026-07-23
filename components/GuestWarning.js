const GuestWarning = {
    name: 'GuestWarning',
    props: {
        feature: { type: String, default: 'هذه الميزة' }
    },
    template: `
        <div class="guest-warning-overlay" @click.self="$emit('close')">
            <div class="guest-warning-card">
                <div class="guest-warning-icon">
                    <span class="material-symbols-outlined">lock</span>
                </div>
                <div class="guest-warning-title">حساب مطلوب</div>
                <div class="guest-warning-desc">{{ feature }} متاحة فقط لمستخدمي الحساب المسجلين. أنشئ حساباً مجانياً للوصول إلى جميع الميزات.</div>
                <div class="guest-warning-btns">
                    <button class="guest-warn-create" @click="goCreate">
                        <span class="material-symbols-outlined">person_add</span>
                        إنشاء حساب
                    </button>
                    <button class="guest-warn-cancel" @click="$emit('close')">لاحقاً</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        goCreate() {
            localStorage.removeItem('gac-user');
            this.$emit('close');
            this.$router.push('/login');
        }
    }
};
