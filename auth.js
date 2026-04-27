/**
 * auth.js - Handles simulated authentication and login popup
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (simulated with localStorage)
    const isLoggedIn = localStorage.getItem('etashaa_logged_in');
    
    // Create the login modal HTML if it doesn't exist
    if (!document.getElementById('login-modal')) {
        createLoginModal();
    }

    // Show popup on page load if not logged in AND on home page
    if (!isLoggedIn) {
        const isHomePage = window.location.pathname.endsWith('index.html') || 
                           window.location.pathname.endsWith('/') || 
                           window.location.pathname === '';
                           
        if (isHomePage) {
            // Short delay for better UX
            setTimeout(() => {
                showLoginModal();
            }, 1500);
        }
    }

    // Hook up person icon in nav to open login if not logged in, or show profile
    const personIcons = document.querySelectorAll('.material-symbols-outlined');
    personIcons.forEach(icon => {
        if (icon.textContent === 'person') {
            const target = icon.closest('button, a') || icon;
            target.style.cursor = 'pointer';
            target.addEventListener('click', (e) => {
                e.preventDefault();
                showLoginModal();
            });
        }
    });
});

function createLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-all duration-500 backdrop-blur-md bg-black/40';
    
    modal.innerHTML = `
        <div class="bg-white/70 backdrop-blur-2xl w-full max-w-sm mx-4 overflow-hidden relative shadow-2xl scale-95 transition-transform duration-500 border border-white/40 rounded-xl" id="login-container">
            <!-- Close Button -->
            <button onclick="hideLoginModal()" class="absolute top-4 right-4 text-outline hover:text-primary transition-colors z-10">
                <span class="material-symbols-outlined text-sm">close</span>
            </button>

            <!-- Brand Header -->
            <div class="pt-6 pb-3 text-center bg-white/30 border-b border-white/20">
                <h2 class="text-xl font-noto-serif tracking-[0.2em] uppercase text-on-surface mb-0.5">ETASHAA</h2>
                <p class="font-jakarta-sans text-[8px] tracking-[0.3em] uppercase text-outline">The Digital Atelier</p>
            </div>

            <div class="px-8 py-5">
                <!-- Login Form -->
                <div id="login-form" class="transition-opacity duration-300">
                    <h3 class="font-noto-serif text-base mb-4 text-center italic text-on-surface font-bold">Welcome back to Heritage</h3>
                    
                    <div class="space-y-4">
                        <div class="relative">
                            <input type="email" placeholder="Email Address" class="w-full bg-transparent border-none border-b border-on-surface/50 focus:border-primary focus:ring-0 py-2 text-xs transition-colors outline-none font-jakarta-sans text-on-surface placeholder:text-on-surface/70">
                        </div>
                        <div class="relative">
                            <input type="password" placeholder="Password" class="w-full bg-transparent border-none border-b border-on-surface/50 focus:border-primary focus:ring-0 py-2 text-xs transition-colors outline-none font-jakarta-sans text-on-surface placeholder:text-on-surface/70">
                        </div>
                    </div>

                    <div class="mt-4 flex items-center justify-between">
                        <label class="flex items-center gap-1.5 cursor-pointer group">
                            <input type="checkbox" class="w-3 h-3 rounded-none border-on-surface/50 text-primary focus:ring-0 bg-transparent">
                            <span class="text-[8px] uppercase tracking-widest text-on-surface/80 group-hover:text-on-surface transition-colors font-bold">Remember Me</span>
                        </label>
                        <a href="#" class="text-[8px] uppercase tracking-widest text-primary font-black hover:text-secondary transition-colors">Forgot Password?</a>
                    </div>

                    <button onclick="handleSimulatedLogin()" class="w-full mt-6 bg-primary text-on-primary py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-secondary transition-all duration-300 shadow-md active:scale-[0.98] rounded-sm">
                        Enter The Atelier
                    </button>

                    <div class="mt-5 text-center border-t border-on-surface/10 pt-5">
                        <p class="text-[8px] uppercase tracking-widest text-on-surface/60 font-bold">Or Continue With</p>
                        <div class="flex justify-center gap-4 mt-3">
                            <button class="w-8 h-8 rounded-full border border-on-surface/20 flex items-center justify-center hover:bg-white/40 transition-colors shadow-sm">
                                <img src="https://www.google.com/favicon.ico" class="w-3 h-3 grayscale opacity-100" alt="Google">
                            </button>
                            <button class="w-8 h-8 rounded-full border border-on-surface/20 flex items-center justify-center hover:bg-white/40 transition-colors shadow-sm">
                                <img src="https://www.facebook.com/favicon.ico" class="w-3 h-3 grayscale opacity-100" alt="Facebook">
                            </button>
                        </div>
                    </div>

                    <p class="mt-6 text-center text-[9px] uppercase tracking-widest text-on-surface/80 font-medium">
                        New to Etashaa? <button onclick="toggleAuthMode('signup')" class="text-primary font-black hover:text-secondary transition-colors ml-1">Create Account</button>
                    </p>
                </div>

                <!-- Signup Form (Hidden by default) -->
                <div id="signup-form" class="hidden transition-opacity duration-300">
                    <h3 class="font-noto-serif text-base mb-4 text-center italic text-on-surface font-bold">Join the Heritage</h3>
                    
                    <div class="space-y-4">
                        <div class="relative">
                            <input type="text" placeholder="Full Name" class="w-full bg-transparent border-none border-b border-on-surface/50 focus:border-primary focus:ring-0 py-2 text-xs transition-colors outline-none font-jakarta-sans text-on-surface placeholder:text-on-surface/70">
                        </div>
                        <div class="relative">
                            <input type="email" placeholder="Email Address" class="w-full bg-transparent border-none border-b border-on-surface/50 focus:border-primary focus:ring-0 py-2 text-xs transition-colors outline-none font-jakarta-sans text-on-surface placeholder:text-on-surface/70">
                        </div>
                        <div class="relative">
                            <input type="password" placeholder="Create Password" class="w-full bg-transparent border-none border-b border-on-surface/50 focus:border-primary focus:ring-0 py-2 text-xs transition-colors outline-none font-jakarta-sans text-on-surface placeholder:text-on-surface/70">
                        </div>
                    </div>

                    <button onclick="handleSimulatedLogin()" class="w-full mt-8 bg-primary text-on-primary py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-secondary transition-all duration-300 shadow-md active:scale-[0.98] rounded-sm">
                        Create My Account
                    </button>

                    <p class="mt-8 text-center text-[9px] uppercase tracking-widest text-on-surface/80 font-medium">
                        Already have an account? <button onclick="toggleAuthMode('login')" class="text-primary font-black hover:text-secondary transition-colors ml-1">Login</button>
                    </p>
                </div>
            </div>
            
            <!-- Bottom Accent Bar -->
            <div class="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const container = document.getElementById('login-container');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
}

function hideLoginModal() {
    const modal = document.getElementById('login-modal');
    const container = document.getElementById('login-container');
    modal.classList.add('opacity-0', 'pointer-events-none');
    container.classList.add('scale-95');
    container.classList.remove('scale-100');
    document.body.style.overflow = '';
    // Reset to login view for next time
    setTimeout(() => toggleAuthMode('login'), 500);
}

function toggleAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (mode === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    }
}

function handleSimulatedLogin() {
    localStorage.setItem('etashaa_logged_in', 'true');
    hideLoginModal();
    // Show a small toast or notification
    alert('Welcome to ETASHAA Digital Atelier');
}
