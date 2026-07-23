const LoginPage = {
    name: 'LoginPage',
    template: `
        <div class="login-page" :class="{ 'login-done': loginDone }">
            <div class="login-splash" v-if="showSplash">
                <div class="splash-logo-wrap">
                    <div class="splash-logo">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="120" height="120" rx="28" fill="#1a3a5c"/>
                            <text x="60" y="72" text-anchor="middle" font-size="38" font-weight="900" font-family="sans-serif" fill="#c9a243" letter-spacing="-1">GAC</text>
                            <rect x="20" y="85" width="80" height="3" rx="1.5" fill="#c9a243" opacity="0.3"/>
                        </svg>
                    </div>
                    <div class="splash-sub">العصر الذهبي</div>
                    <div class="splash-loader">
                        <div class="splash-loader-bar"></div>
                    </div>
                </div>
            </div>

            <transition name="page-fade">
                <div class="login-main" v-if="!showSplash">
                    <div class="login-header">
                        <div class="login-logo">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="22" fill="#1a3a5c"/>
                                <text x="50" y="62" text-anchor="middle" font-size="32" font-weight="900" font-family="sans-serif" fill="#c9a243" letter-spacing="-1">GAC</text>
                                <rect x="16" y="74" width="68" height="2.5" rx="1.25" fill="#c9a243" opacity="0.3"/>
                            </svg>
                        </div>
                        <div class="login-welcome">مرحباً بك</div>
                        <div class="login-subtitle">سجّل دخولك للمتابعة</div>
                    </div>

                    <div class="login-form" v-if="step === 'form'">
                        <div class="login-field">
                            <span class="material-symbols-outlined login-field-icon">person</span>
                            <input class="login-input" type="text" placeholder="اسم المستخدم" v-model="username" maxlength="30">
                        </div>
                        <div class="login-field">
                            <span class="material-symbols-outlined login-field-icon">call</span>
                            <input class="login-input" type="tel" placeholder="رقم الهاتف (مثلاً 07XX XXX XXXX)" v-model="phone" maxlength="11" inputmode="numeric">
                        </div>
                        <div class="login-error" v-if="formError">{{ formError }}</div>
                        <button class="login-btn" @click="sendOTP">
                            <span class="material-symbols-outlined">send</span>
                            إرسال رمز التحقق
                        </button>
                    </div>

                    <div class="login-otp" v-if="step === 'otp'">
                        <div class="otp-info">
                            <span class="material-symbols-outlined otp-icon">mark_email_read</span>
                            <div class="otp-title">تأكيد رقم الهاتف</div>
                            <div class="otp-desc">أدخل الرمز الذي تم إرساله إلى الرقم<br><strong dir="ltr">{{ maskedPhone }}</strong></div>
                        </div>
                        <div class="otp-inputs">
                            <input v-for="(_, i) in 6" :key="i" :ref="el => { if(el) otpRefs[i] = el }"
                                class="otp-digit" type="tel" maxlength="1" inputmode="numeric"
                                v-model="otpDigits[i]" @input="onOtpInput(i, $event)"
                                @keydown.backspace="onOtpBack(i)" @paste="onOtpPaste"
                            >
                        </div>
                        <div class="otp-error" v-if="otpError">{{ otpError }}</div>
                        <button class="login-btn" @click="verifyOTP" :disabled="otpDigits.join('').length < 6">
                            <span class="material-symbols-outlined">verified</span>
                            تحقق ودخول
                        </button>
                        <button class="otp-resend" @click="resendOTP" :disabled="resendTimer > 0">
                            إعادة الإرسال <span v-if="resendTimer > 0">({{ resendTimer }}s)</span>
                        </button>
                    </div>

                    <div class="login-divider">
                        <span>أو</span>
                    </div>

                    <button class="guest-btn" @click="enterGuest">
                        <span class="material-symbols-outlined">explore</span>
                        الدخول كضيف - تصفح فقط
                    </button>

                    <div class="login-footer">
                        بالدخول أنت توافق على <a href="#">شروط الاستخدام</a> و<a href="#">سياسة الخصوصية</a>
                    </div>
                </div>
            </transition>
        </div>
    `,
    data() {
        return {
            showSplash: true,
            loginDone: false,
            step: 'form',
            username: '',
            phone: '',
            formError: '',
            otpDigits: ['', '', '', '', '', ''],
            otpRefs: [],
            otpError: '',
            resendTimer: 0,
            resendInterval: null
        }
    },
    computed: {
        maskedPhone() {
            if (!this.phone) return '';
            return this.phone.slice(0, 4) + '***' + this.phone.slice(-3);
        }
    },
    methods: {
        sendOTP() {
            this.formError = '';
            const cleanPhone = this.phone.replace(/\D/g, '');
            if (this.username.trim().length < 2) {
                this.formError = 'أدخل اسم المستخدم (حرفين على الأقل)';
                return;
            }
            if (cleanPhone.length < 10) {
                this.formError = 'أدخل رقم هاتف صحيح (10 أرقام على الأقل)';
                return;
            }
            this.phone = cleanPhone;
            this.step = 'otp';
            this.resendTimer = 30;
            this.startResendTimer();
            this.$nextTick(() => {
                if (this.otpRefs[0]) this.otpRefs[0].focus();
            });
        },
        onOtpInput(i, e) {
            const val = e.target.value;
            this.otpDigits[i] = val.replace(/\D/g, '');
            if (val && i < 5) {
                this.$nextTick(() => {
                    if (this.otpRefs[i + 1]) this.otpRefs[i + 1].focus();
                });
            }
            this.otpError = '';
        },
        onOtpBack(i) {
            if (!this.otpDigits[i] && i > 0) {
                this.$nextTick(() => {
                    if (this.otpRefs[i - 1]) this.otpRefs[i - 1].focus();
                });
            }
        },
        onOtpPaste(e) {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
            for (let i = 0; i < 6; i++) {
                this.otpDigits[i] = paste[i] || '';
            }
            const nextEmpty = this.otpDigits.findIndex(d => !d);
            const focusIdx = nextEmpty === -1 ? 5 : nextEmpty;
            this.$nextTick(() => {
                if (this.otpRefs[focusIdx]) this.otpRefs[focusIdx].focus();
            });
        },
        verifyOTP() {
            const code = this.otpDigits.join('');
            if (code === '123456') {
                const user = { name: this.username.trim(), phone: this.phone, isGuest: false };
                localStorage.setItem('gac-user', JSON.stringify(user));
                this.loginDone = true;
                setTimeout(() => {
                    this.$router.push('/');
                    window.dispatchEvent(new Event('auth-changed'));
                }, 100);
            } else {
                this.otpError = 'الرمز غير صحيح، حاول مرة أخرى';
                this.otpDigits = ['', '', '', '', '', ''];
                this.$nextTick(() => {
                    if (this.otpRefs[0]) this.otpRefs[0].focus();
                });
            }
        },
        resendOTP() {
            if (this.resendTimer > 0) return;
            this.resendTimer = 30;
            this.startResendTimer();
        },
        startResendTimer() {
            if (this.resendInterval) clearInterval(this.resendInterval);
            this.resendInterval = setInterval(() => {
                this.resendTimer--;
                if (this.resendTimer <= 0) clearInterval(this.resendInterval);
            }, 1000);
        },
        enterGuest() {
            const user = { name: 'ضيف', phone: '', isGuest: true };
            localStorage.setItem('gac-user', JSON.stringify(user));
            this.loginDone = true;
            setTimeout(() => {
                this.$router.push('/');
                window.dispatchEvent(new Event('auth-changed'));
            }, 100);
        }
    },
    beforeUnmount() {
        if (this.resendInterval) clearInterval(this.resendInterval);
    },
    mounted() {
        setTimeout(() => {
            this.showSplash = false;
        }, 2200);
    }
};
