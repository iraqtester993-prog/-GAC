const InstallmentsPage = {
    name: 'InstallmentsPage',
    template: `
        <div class="installments-page">
            <h1 class="page-title">أقساطي</h1>

            <div v-if="isGuest" class="guest-restricted-view">
                <div class="guest-restricted-icon">
                    <span class="material-symbols-outlined">receipt_long</span>
                </div>
                <div class="guest-restricted-title">الأقساط</div>
                <div class="guest-restricted-desc">يجب تسجيل الدخول لمتابعة أقساطك وادفعاتها</div>
                <button class="guest-restricted-btn" @click="goCreate">
                    <span class="material-symbols-outlined">person_add</span>
                    إنشاء حساب مجاني
                </button>
            </div>

            <div v-else-if="installments.length">
                <div class="installment-card" v-for="inst in installments" :key="inst.id">
                    <div class="installment-header">
                        <span class="installment-order-id">طلب رقم #{{ inst.orderId }}</span>
                        <span class="installment-status" :class="inst.statusClass">{{ inst.status }}</span>
                    </div>
                    <div class="installment-progress">
                        <div class="installment-progress-fill" :style="{ width: inst.progress + '%' }"></div>
                    </div>
                    <div class="installment-details">
                        <div>المبلغ الكلي: <span>{{ inst.total.toLocaleString() }} د.ع</span></div>
                        <div>المدفوع: <span>{{ inst.paid.toLocaleString() }} د.ع</span></div>
                    </div>
                    <div class="installment-details" style="margin-top:4px;">
                        <div>الاقساط المتبقية: <span>{{ inst.remaining }} من {{ inst.totalInstallments }}</span></div>
                        <div>القسط الشهري: <span>{{ inst.monthlyAmount.toLocaleString() }} د.ع</span></div>
                    </div>
                    <div class="installment-next" v-if="inst.statusClass === 'active'">
                        <div>
                            <div class="installment-next-label">القسط القادم</div>
                            <div class="installment-next-amount">{{ inst.monthlyAmount.toLocaleString() }} د.ع</div>
                        </div>
                        <button class="installment-pay-btn">ادفع الان</button>
                    </div>
                </div>
            </div>

            <div class="cart-empty" v-else>
                <div class="empty-icon">
                    <span class="material-symbols-outlined">receipt_long</span>
                </div>
                <div class="cart-empty-title">لا توجد اقساط</div>
                <div class="cart-empty-text">لم تقم باي عملية شراء بالاقساط بعد</div>
            </div>
        </div>
    `,
    data() {
        return {
            isGuest: !!(JSON.parse(localStorage.getItem('gac-user') || '{}').isGuest),
            installments: [
                {
                    id: 1,
                    orderId: '87542',
                    total: 1850000,
                    paid: 925000,
                    monthlyAmount: 154167,
                    totalInstallments: 12,
                    remaining: 6,
                    progress: 50,
                    status: 'نشط',
                    statusClass: 'active'
                },
                {
                    id: 2,
                    orderId: '86231',
                    total: 750000,
                    paid: 750000,
                    monthlyAmount: 125000,
                    totalInstallments: 6,
                    remaining: 0,
                    progress: 100,
                    status: 'مكتمل',
                    statusClass: 'completed'
                },
                {
                    id: 3,
                    orderId: '85119',
                    total: 1350000,
                    paid: 450000,
                    monthlyAmount: 150000,
                    totalInstallments: 9,
                    remaining: 6,
                    progress: 33,
                    status: 'متأخر',
                    statusClass: 'late'
                }
            ]
        }
    },
    methods: {
        goCreate() {
            localStorage.removeItem('gac-user');
            this.$router.push('/login');
        }
    }
};
