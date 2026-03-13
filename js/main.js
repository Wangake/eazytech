// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('yr').textContent = new Date().getFullYear();

    // Initialize all functions
    initNavbarScroll();
    initSidebar();
    initTypingAnimation();
    initIntersectionObserver();
    initParallax();
    initSmoothScroll();
    initFavicon();
});

// Toast function (global)
window.showToast = function(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

// Set amount helper (global)
window.setAmount = function(amount) {
    document.getElementById('amount').value = amount;
};

// STK Push demo (global)
window.stkPush = function() {
    const phone = document.getElementById('phone').value || '07********';
    const amount = document.getElementById('amount').value;
    showToast(`📱 STK Push sent to ${phone} for KES ${amount}. Check phone to complete payment.`);
};

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const menuIcon = document.getElementById('menuIcon');

    function openSidebar() {
        sidebar.style.transform = 'translateX(0)';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        menuIcon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.style.transform = 'translateX(-100%)';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        menuIcon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        sidebar.style.transform === 'translateX(0)' ? closeSidebar() : openSidebar();
        menuBtn.blur();
    });
    
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
}

// Typing animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Fast Fiber Internet in Eldoret 🇰🇪',
        'Langas • Mwanzo • Kapseret • Teleview',
        '24/7 Support • Free Installation',
        'TV Mounting • Computer Repair',
        'Karibu EAZYTECH VENTURES!',
        'Tumefurahi kukuona 😊'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    setTimeout(typeEffect, 1000);
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (!target || element.dataset.animated) return;
    
    element.dataset.animated = 'true';
    let current = 0;
    const increment = target > 100 ? Math.ceil(target / 50) : 1;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerHTML = target;
            clearInterval(timer);
        } else {
            element.innerHTML = current;
        }
        element.classList.add('counter-value');
        setTimeout(() => element.classList.remove('counter-value'), 300);
    }, 20);
}

// Intersection Observer
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Counter animation
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe elements
    document.querySelectorAll('[data-anim], .counter').forEach(el => observer.observe(el));
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close sidebar if open
                const sidebar = document.getElementById('sidebar');
                if (sidebar.style.transform === 'translateX(0)') {
                    document.getElementById('closeBtn').click();
                }
            }
        });
    });
}

// Parallax effect on blobs
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Set circular favicon
function initFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, 64, 64);
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL();
        document.head.appendChild(link);
    };
    img.src = 'https://files.catbox.moe/c5nleu.png';
}