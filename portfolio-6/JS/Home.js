/**
 * Portfolio 6 - Futuristic 3D-Inspired Portfolio
 * This JavaScript file handles all the interactive elements of the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Create particles
    createParticles();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize form validation
    initContactForm();
});

/**
 * Theme management
 */
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.body.setAttribute('data-theme', storedTheme);
    
    // Toggle theme on click
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Particle background
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        particle.style.opacity = opacity;
        
        // Random animation delay
        const delay = Math.random() * 8;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Navigation setup
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section');
    
    // Set initial position of nav indicator
    if (navLinks.length > 0 && navIndicator) {
        const activeLink = document.querySelector('.main-nav .nav-link.active');
        updateNavIndicator(activeLink);
    }
    
    // Click event for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavIndicator(link);
        });
    });
    
    // Scroll event for section highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                updateNavIndicator(link);
            }
        });
        
        // Make header sticky
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

function updateNavIndicator(activeLink) {
    const navIndicator = document.querySelector('.nav-indicator');
    if (!navIndicator || !activeLink) return;
    
    const linkLeft = activeLink.offsetLeft;
    const linkWidth = activeLink.offsetWidth;
    
    navIndicator.style.width = `${linkWidth}px`;
    navIndicator.style.left = `${linkLeft}px`;
}

/**
 * Mobile navigation
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        toggleMenuIcon();
        
        // Create overlay if not exists
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('nav-overlay');
            document.body.appendChild(overlay);
            
            // Close menu when clicking overlay
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMenuIcon() {
    const menuToggle = document.querySelector('.menu-toggle');
    const spans = menuToggle.querySelectorAll('span');
    
    if (document.querySelector('.mobile-nav').classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.nav-overlay');
    
    mobileNav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    toggleMenuIcon();
    document.body.style.overflow = '';
}

/**
 * Skill bars animation and tabs
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Initialize all skills to 0% width
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Set up skill tabs
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all skill categories
            skillCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the selected category
            const targetId = tab.getAttribute('data-target');
            const targetCategory = document.getElementById(targetId);
            if (targetCategory) {
                targetCategory.classList.add('active');
                // Animate skill bars in the active category
                setTimeout(() => {
                    const activeBars = targetCategory.querySelectorAll('.skill-progress');
                    activeBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = `${level}%`;
                    });
                }, 100);
            }
        });
    });
    
    // Animate skills when they come into view
    const animateSkills = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                const level = bar.getAttribute('data-level');
                bar.style.width = `${level}%`;
            }
        });
    };
    
    // Run on initial page load
    setTimeout(animateSkills, 500);
    
    // Run on scroll
    window.addEventListener('scroll', animateSkills);
}

/**
 * Project filtering
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Smooth scrolling
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact form validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormStatus('Sending message...', 'pending');
            
            setTimeout(() => {
                showFormStatus('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    
    formStatus.textContent = message;
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            formStatus.classList.remove(type);
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 300);
        }, 5000);
    }
}