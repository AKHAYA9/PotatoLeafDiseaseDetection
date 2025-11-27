// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Potato Leaf Disease Detection - Initialized');

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Enhanced Parallax scrolling effect with more noticeable movement
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                // Hero parallax - ENHANCED with more dramatic movement
                const parallaxBg = document.querySelector('.parallax-bg');
                if (parallaxBg) {
                    // Increased multiplier from 0.5 to 0.7 for more noticeable effect
                    parallaxBg.style.transform = `translateY(${scrolled * 0.7}px) scale(1.1)`;
                }

                // Hero content parallax - moves slower than background for depth
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
                }

                // Pattern parallax - ENHANCED
                const parallaxPattern = document.querySelector('.parallax-bg-pattern');
                if (parallaxPattern) {
                    const patternSection = parallaxPattern.closest('.training-section');
                    if (patternSection) {
                        const patternOffset = patternSection.offsetTop;
                        const patternScroll = scrolled - patternOffset;
                        
                        // Only apply when section is in view
                        if (patternScroll > -window.innerHeight && patternScroll < window.innerHeight) {
                            // Increased multiplier from 0.3 to 0.5 and added rotation
                            parallaxPattern.style.transform = `translateY(${patternScroll * 0.5}px) scale(1.05) rotate(${patternScroll * 0.02}deg)`;
                        }
                    }
                }

                // Feature cards parallax effect
                const featureCards = document.querySelectorAll('.feature-card');
                featureCards.forEach((card, index) => {
                    const cardTop = card.offsetTop;
                    const cardScroll = scrolled - cardTop + window.innerHeight;
                    
                    if (cardScroll > 0 && cardScroll < window.innerHeight * 1.5) {
                        const movement = (cardScroll - window.innerHeight / 2) * 0.1;
                        card.style.transform = `translateY(${movement}px)`;
                    }
                });

                // Stats card parallax
                const statsCard = document.querySelector('.stats-card');
                if (statsCard) {
                    const statsTop = statsCard.offsetTop;
                    const statsScroll = scrolled - statsTop + window.innerHeight;
                    
                    if (statsScroll > 0 && statsScroll < window.innerHeight * 1.5) {
                        const movement = (statsScroll - window.innerHeight / 2) * 0.15;
                        statsCard.style.transform = `translateY(${movement}px) scale(${1 + movement * 0.0005})`;
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // Fade in on scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 200;
    let counterAnimated = false;

    const animateCounters = () => {
        if (counterAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / counterSpeed;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
        
        counterAnimated = true;
    };

    // Observe stats section for counter animation
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsCard);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Upload box interaction
    const uploadBox = document.querySelector('.upload-box');
    if (uploadBox) {
        uploadBox.addEventListener('click', function() {
            alert('File upload functionality would be integrated here with your backend system.');
        });

        // Drag and drop visual feedback
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--secondary-color)';
            this.style.background = 'linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(39, 174, 96, 0.15) 100%)';
        });

        uploadBox.addEventListener('dragleave', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(39, 174, 96, 0.05) 100%)';
        });

        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(39, 174, 96, 0.05) 100%)';
            alert('File dropped! This would be processed by your backend system.');
        });
    }

    // Enhanced hover effect to feature cards with parallax
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Mouse move parallax effect on cards
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Logout confirmation
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmed = confirm('Are you sure you want to logout?');
            if (confirmed) {
                // Redirect to logout URL or handle logout
                window.location.href = this.getAttribute('href');
            }
        });
    }

    // Add staggered animation delay to feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Add mouse parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const parallaxBg = this.querySelector('.parallax-bg');
            if (parallaxBg) {
                parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            }
        });
    }

    console.log('All animations, parallax effects, and interactions initialized successfully!');
    console.log('🎨 Enhanced parallax scrolling is now active - scroll to see the effect!');
});