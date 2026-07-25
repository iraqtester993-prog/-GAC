const MessagesPage = {
    name: 'MessagesPage',
    template: `
        <div class="messages-page">
            <h1 class="page-title">الرسائل</h1>

            <div class="message-item" v-for="msg in messages" :key="msg.id" @click="openMessage(msg)">
                <div class="message-avatar">
                    <span class="material-symbols-outlined">{{ msg.icon }}</span>
                </div>
                <div class="message-info">
                    <div class="message-name">{{ msg.name }}</div>
                    <div class="message-preview">{{ msg.preview }}</div>
                </div>
                <span class="message-time">{{ msg.time }}</span>
            </div>

            <div class="cart-empty" v-if="messages.length === 0">
                <div class="empty-icon">
                    <span class="material-symbols-outlined">chat</span>
                </div>
                <div class="cart-empty-title">لا توجد رسائل</div>
                <div class="cart-empty-text">ستظهر رسائل الدعم والعروض هنا</div>
            </div>
        </div>
    `,
    data() {
        return {
            messages: [
                { id: 1, name: 'دعم GAC', icon: 'support_agent', preview: 'مرحباً! كيف يمكننا مساعدتك اليوم؟', time: 'الآن' },
                { id: 2, name: 'عروض حصرية', icon: 'local_offer', preview: 'خصم 25% على الغسالات الذكية - العرض ينتهي قريباً', time: 'منذ ساعة' },
                { id: 3, name: 'تتبع الطلب', icon: 'local_shipping', preview: 'طلبك #12345 في الطريق إليك', time: 'منذ 3 ساعات' },
                { id: 4, name: 'تذكير بالقسط', icon: 'payments', preview: 'القسط القادم مستحق خلال 5 أيام', time: 'أمس' }
            ]
        }
    },
    methods: {
        openMessage(msg) {
            alert(msg.name + ':\n' + msg.preview);
        }
    }
};
