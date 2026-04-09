/**
 * Portfolio 11 - Geometric Art Deco Portfolio
 * This JavaScript file handles all the interactive elements of the portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initTheme();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initSkillTabs();
    initSkillCircles();
    initProjectFilter();
    initStatCounter();
    initContactForm();
});

/**
 * Theme Toggle Functionality
 * Handles switching between light and dark modes
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    
    // Update button icon based on current theme
    updateThemeIcon(savedTheme);
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        }
    });
    
    // Fixed icon display logic
    function updateThemeIcon(theme) {
        const sunIcon = themeToggleBtn.querySelector('.fa-sun');
        const moonIcon = themeToggleBtn.querySelector('.fa-moon');
        
        if (theme === 'dark-mode') {
            // In dark mode, show the sun icon to switch to light
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            // In light mode, show the moon icon to switch to dark
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}

/**
 * Navigation Functionality
 * Handles scroll spy and navigation link updates
 */
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Make header sticky on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll to section when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.getElementById('nav-links').classList.remove('active');
            document.getElementById('mobile-menu-btn').classList.remove('active');
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial call to set active nav link
    updateActiveNavLink();
}

/**
 * Mobile Menu Functionality
 * Handles the mobile navigation
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/**
 * Back to Top Button Functionality
 * Shows or hides the back to top button based on scroll position
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll Animations
 * Adds animation classes to elements when they enter the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once the animation is triggered, we don't need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add animation classes to elements and start observing them
    document.querySelectorAll('.section-header').forEach((header, index) => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
    
    document.querySelectorAll('.hero-text').forEach(element => {
        element.classList.add('fade-in-left');
        observer.observe(element);
    });
    
    document.querySelectorAll('.hero-image').forEach(element => {
        element.classList.add('fade-in-right');
        observer.observe(element);
    });
    
    document.querySelectorAll('.skill-item, .certificate-item, .timeline-item').forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${index % 5 + 1}`);
        observer.observe(element);
    });
    
    document.querySelectorAll('.project-card').forEach((element, index) => {
        element.classList.add('scale-in');
        element.classList.add(`delay-${index % 5 + 1}`);
        observer.observe(element);
    });
    
    document.querySelectorAll('.contact-item, .form-group').forEach((element, index) => {
        element.classList.add('fade-in-left');
        element.classList.add(`delay-${index + 1}`);
        observer.observe(element);
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Skill Tabs Functionality
 * Handles switching between different skill categories
 */
function initSkillTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(`${tabId}-skills`).classList.add('active');
            
            // Animate skill bars or circles for the active tab
            if (tabId === 'technical' || tabId === 'academic') {
                animateSkillBars();
            } else if (tabId === 'soft') {
                animateSkillCircles();
            }
        });
    });
    
    // Initial animation for the default active tab
    animateSkillBars();
}

/**
 * Skill Bars Animation
 * Animates the skill progress bars
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

/**
 * Skill Circles Animation
 * Animates the circular progress indicators for soft skills
 */
function initSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillCircles();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the first circle
    if (skillCircles.length > 0) {
        observer.observe(skillCircles[0]);
    }
}

function animateSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const radius = circle.querySelector('circle').getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        const progressCircle = circle.querySelector('.progress-ring-circle');
        
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // Add animation class
        circle.classList.add('animate-progress');
    });
}

/**
 * Stats Counter Animation
 * Animates the number counting effect
 */
function initStatCounter() {
    const stats = document.querySelectorAll('.stat-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the first stat
    if (stats.length > 0) {
        observer.observe(stats[0]);
    }
}

function animateStatCounter() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // ms
        const increment = target / (duration / 20);
        
        const counter = setInterval(() => {
            count += increment;
            stat.textContent = Math.floor(count);
            
            if (count >= target) {
                stat.textContent = target;
                clearInterval(counter);
            }
        }, 20);
    });
}

/**
 * Project Filtering Functionality
 * Filters projects based on their category
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Filter projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Contact Form Validation
 * Validates the contact form before submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate form
            if (validateForm(nameInput, emailInput, subjectInput, messageInput)) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                showFormMessage('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }
    
    // Form validation function
    function validateForm(nameInput, emailInput, subjectInput, messageInput) {
        let isValid = true;
        
        // Reset previous error messages
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showFormMessage('Please enter your name.', 'error');
            isValid = false;
            return isValid;
        }
        
        // Validate email
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            showFormMessage('Please enter a valid email address.', 'error');
            isValid = false;
            return isValid;
        }
        
        // Validate subject
        if (subjectInput.value.trim() === '') {
            showFormMessage('Please enter a subject.', 'error');
            isValid = false;
            return isValid;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showFormMessage('Please enter your message.', 'error');
            isValid = false;
            return isValid;
        }
        
        return isValid;
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message function
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
}