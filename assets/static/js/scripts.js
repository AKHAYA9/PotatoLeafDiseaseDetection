document.addEventListener('DOMContentLoaded', function() {
    console.log('Potato Leaf Disease Detection System Initialized');

    // ===== Leaf Particle Animation =====
    createLeafParticles();

    // ===== Navbar Scroll Effect =====
    handleNavbarScroll();

    // ===== Mobile Menu Toggle =====
    setupMobileMenu();

    // ===== Scroll Animations =====
    setupScrollAnimations();

    // ===== Smooth Scrolling for Links =====
    setupSmoothScrolling();
});
// Auto remove Django messages


// ===== Create Floating Leaf Particles =====
function createLeafParticles() {
    const particlesContainer = document.getElementById('leafParticles');
    const leafSymbols = ['🍃', '🌿', '🌱', '🍀'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
        
        // Random positioning
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDelay = Math.random() * 15 + 's';
        leaf.style.animationDuration = (15 + Math.random() * 10) + 's';
        leaf.style.fontSize = (20 + Math.random() * 20) + 'px';
        
        particlesContainer.appendChild(leaf);
    }
}


// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Mobile Menu Toggle =====
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .btn-glitch');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
    }
}

// ===== Scroll Animations =====
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== Smooth Scrolling for Anchor Links =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Dynamic Stats Counter Animation =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlusSign = target.includes('+');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlusSign) {
                displayValue = displayValue >= 1000 ? (displayValue / 1000).toFixed(0) + 'K+' : displayValue + '+';
            }
            
            stat.textContent = displayValue;
        }, 30);
    });
}

// Trigger stats animation when hero section is visible
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}

// ===== Feature Cards Hover Effect =====
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Disease Cards Interactive Effect =====
const diseaseCards = document.querySelectorAll('.disease-card');
diseaseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.disease-image i');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.disease-image i');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== Add Glow Effect on Button Hover =====
const buttons = document.querySelectorAll('.btn-primary-green, .btn-outline-green, .btn-glitch');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(118, 255, 3, 0.6)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

setTimeout(function() {
    const msgBox = document.getElementById('.django-message');
        if (msgBox) {
            msgBox.style.transition = "opacity 0.5s ease";
            msgBox.style.opacity = "0";

            setTimeout(() => msgBox.remove(), 500);
        }
    }, 3000);

// ===== Console Welcome Message =====
console.log('%c🌿 Potato Leaf Disease Detection System 🌿', 'color: #76ff03; font-size: 20px; font-weight: bold;');
console.log('%cPowered by Deep Learning Technology', 'color: #8bc34a; font-size: 14px;');
console.log('%cProtecting crops with AI 🚀', 'color: #4a7c2c; font-size: 12px;');