/**
 * Portfolio 7 - Nature-Inspired Portfolio with Dark/Light Mode
 * This JavaScript file handles all the interactive elements of the portfolio,
 * with a special focus on the dark/light mode toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme based on user preference or saved setting
    initTheme();

    // Initialize navigation
    initNavigation();

    // Initialize mobile navigation
    initMobileNav();

    // Initialize skill bars animation
    initSkillBars();

    // Initialize skills tabs
    initSkillsTabs();

    // Initialize project filtering
    initProjectFilter();

    // Initialize contact form
    initContactForm();

    // Initialize back to top button
    initBackToTop();
});

/**
 * Theme Management - Dark/Light Mode Toggle
 * This is the core functionality for the dark mode toggle feature
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the OS preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        // If no saved preference, use the OS preference
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        
        // Add animation class for transition effect
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    });
    
    // Listen for OS theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

/**
 * Navigation Functionality
 */
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    // Add scroll event for sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                closeMobileMenu();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial update of active nav link
    updateActiveNavLink();
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    // Get the current scroll position
    const scrollPosition = window.scrollY + 200; // Offset to highlight a bit earlier
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding links
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }
    });
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle menu icon
        if (menuToggle.classList.contains('active')) {
            menuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
            menuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
        }
        
        // Add overlay
        if (!document.querySelector('.nav-overlay')) {
            const overlay = document.createElement('div');
            overlay.classList.add('nav-overlay');
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        const overlay = document.querySelector('.nav-overlay');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

/**
 * Close the mobile menu
 */
function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.nav-overlay');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
        
        menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
        menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
        menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
}

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Set initial width of skill bars to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Animate skill bars when they come into view
    const animateSkillBars = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const progress = bar.getAttribute('data-progress');
            
            if (barTop < triggerBottom) {
                bar.style.width = `${progress}%`;
            }
        });
    };
    
    // Run on initial load
    setTimeout(animateSkillBars, 500);
    
    // Run on scroll
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Skills tabs functionality
 */
function initSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Re-animate skill bars in the active tab
            setTimeout(() => {
                const activeSkillBars = document.querySelectorAll('.tab.active .skill-progress');
                activeSkillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = `${progress}%`;
                });
            }, 100);
        });
    });
}

/**
 * Project filtering functionality
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                card.style.display = 'block';
                
                if (filter !== 'all' && card.getAttribute('data-category') !== filter) {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Sending your message...', 'sending');
            
            setTimeout(() => {
                showFormMessage('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

/**
 * Show message in the contact form
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            formMessage.classList.remove(type);
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 300);
        }, 5000);
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Back to top button functionality
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