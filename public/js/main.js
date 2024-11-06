document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page load
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.classList.add('loaded');
    }, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Active section highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scroll = window.scrollY;
            
            if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Show/hide scroll to top button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 300) {
            scrollToTopBtn?.classList.add('show');
        } else {
            scrollToTopBtn?.classList.remove('show');
        }
    });

    // Modal functionality
    window.showModal = function(modalType) {
        const modal = document.getElementById(`${modalType}Modal`);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    };

    // Close modal functionality
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.classList.remove('no-scroll');
        });
    });

    // Auth functionality
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Login successful!', 'success');
            document.getElementById('loginModal').classList.remove('active');
            document.body.classList.remove('no-scroll');
            // Update UI for logged-in state
            updateAuthUI(true);
        } catch (error) {
            showNotification('Login failed!', 'error');
        }
    });

    registerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Registration successful! Please login.', 'success');
            document.getElementById('registerModal').classList.remove('active');
            document.body.classList.remove('no-scroll');
            // Show login modal after successful registration
            setTimeout(() => showModal('login'), 1000);
        } catch (error) {
            showNotification('Registration failed!', 'error');
        }
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Successfully subscribed to newsletter!', 'success');
        newsletterForm.reset();
    });

    // Notification system
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        const container = document.getElementById('notificationContainer');
        container?.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Update UI based on auth state
    function updateAuthUI(isLoggedIn) {
        const authButtons = document.querySelector('.auth-buttons');
        if (isLoggedIn) {
            authButtons.innerHTML = `
                <button class="btn profile-btn" onclick="showProfile()">
                    <i class="fas fa-user"></i>
                    Profile
                </button>
                <button class="btn logout-btn" onclick="handleLogout()">
                    Logout
                </button>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn login-btn" onclick="showModal('login')">Login</button>
                <button class="btn register-btn" onclick="showModal('register')">Register</button>
            `;
        }
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// Global functions
window.handleLogout = function() {
    showNotification('Logged out successfully', 'success');
    updateAuthUI(false);
};

window.showProfile = function() {
    showNotification('Profile feature coming soon!', 'info');
};

// Scroll to top functionality
document.getElementById('scrollToTop')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
