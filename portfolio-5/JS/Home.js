/*
=============================
PORTFOLIO 5 - NEO-BRUTALIST DESIGN
JavaScript Functionality
=============================
*/

// DOM Elements
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.progress-bar');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const cursor = document.querySelector('.cursor');

// Custom Cursor
function updateCursor(e) {
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
}

function enlargeCursor() {
    if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
}

function resetCursor() {
    if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}

// Theme Toggle Functionality
function initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
}

function toggleTheme() {
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Mobile Navigation
function toggleMobileNav() {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

// Close mobile nav when a link is clicked
function closeMobileNav() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    body.classList.remove('no-scroll');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile nav if open
        closeMobileNav();
        
        // Update active link
        updateActiveNavLink(targetId);
    }
}

// Update active navigation link on scroll
function updateActiveNavLink(targetId = null) {
    const scrollPosition = window.scrollY;
    
    // If a targetId is provided, update based on that
    if (targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Otherwise update based on scroll position
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = `#${section.id}`;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Project Filtering
function filterProjects() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    this.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight * 0.8) {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        }
    });
}

// Make header sticky on scroll
function makeHeaderSticky() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Show/hide back to top button
function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form validation
function validateForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showFormMessage('Your message has been sent successfully!', 'success');
        contactForm.reset();
    }, 1000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form status message
function showFormMessage(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 3000);
}

// Animation on scroll
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('active');
        }
    });
}

// Initialize animations
function initAnimations() {
    const headings = document.querySelectorAll('.section-heading h2');
    const aboutContent = document.querySelectorAll('.about-content > div');
    const skillsGroups = document.querySelectorAll('.skills-group');
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contactElements = document.querySelectorAll('.contact-info, .contact-form');
    
    headings.forEach((heading, index) => {
        heading.classList.add('scale-in');
        heading.style.transitionDelay = `${index * 0.1}s`;
    });
    
    aboutContent.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.2}s`;
    });
    
    skillsGroups.forEach((group, index) => {
        group.classList.add('fade-in');
        group.style.transitionDelay = `${index * 0.2}s`;
    });
    
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    contactElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize animations
    initAnimations();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileNav);
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterProjects);
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
    
    // Custom cursor
    if (cursor) {
        window.addEventListener('mousemove', updateCursor);
        
        // Add hover effect to buttons and links
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .soft-skill-item, .tool-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', enlargeCursor);
            element.addEventListener('mouseleave', resetCursor);
        });
    }
    
    // Animate elements on first load
    animateSkillBars();
    addScrollAnimations();
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    makeHeaderSticky();
    updateActiveNavLink();
    animateSkillBars();
    toggleBackToTop();
    addScrollAnimations();
});