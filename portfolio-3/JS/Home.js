// DOM Elements
const themeSelector = document.querySelector('.theme-selector');
const themeToggle = document.querySelector('.theme-selector-toggle');
const themeOptions = document.querySelectorAll('.theme-option');
const modeToggle = document.querySelector('.mode-toggle');
const mainHeader = document.querySelector('.main-header');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section[id]');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const progressBars = document.querySelectorAll('.progress-bar');
const backToTop = document.querySelector('.back-to-top');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

// Theme selector toggle
themeToggle.addEventListener('click', () => {
    themeSelector.classList.toggle('open');
});

// Theme options
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        // Remove all theme classes
        document.body.classList.remove('theme-mint', 'theme-coral', 'theme-lavender', 'theme-sky', 'theme-gold');
        // Add selected theme class
        if (theme !== 'mint') { // 'mint' is default
            document.body.classList.add(`theme-${theme}`);
        }
        // Save theme preference
        localStorage.setItem('theme', theme);
        // Close theme selector
        themeSelector.classList.remove('open');
    });
});

// Dark/Light mode toggle
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('mode', 'dark');
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('mode', 'light');
    }
});

// Apply saved theme and mode preferences
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme if exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'mint') {
        document.body.classList.add(`theme-${savedTheme}`);
    }
    
    // Apply saved mode if exists
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Make all animated elements visible immediately
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
    
    // Make all project cards visible
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Animate skill bars
    animateSkillBars();
    
    // Start counting stats
    startCounting();
});

// Hamburger menu toggle
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Toggle body scroll
    if (mainNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            hamburgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Scroll events
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Header shadow on scroll
    if (scrollY > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Activate nav link based on scroll position
    activateNavOnScroll();
    
    // Check for elements to animate on scroll
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // Check if element is in viewport
        if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
    
    // Animate skill bars when in viewport
    animateSkillBars();
    
    // Start counting stats when in viewport
    startCounting();
});

// Activate navigation link based on scroll position
function activateNavOnScroll() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Tab functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Activate corresponding tab pane
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
        
        // Re-trigger animation for newly visible skill bars
        animateSkillBars();
    });
});

// Project filtering
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
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
    });
});

// Animate skill progress bars
function animateSkillBars() {
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const rect = bar.getBoundingClientRect();
        
        // Check if element is in viewport
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // Apply animation only once
            if (bar.style.width !== percentage + '%') {
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 200);
            }
        }
    });
}

// Stat counter animation
function startCounting() {
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    
    // Check if stats section is in viewport
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const current = parseInt(stat.textContent);
            
            // Only start counting if not already counted
            if (current < target) {
                const increment = Math.ceil(target / 50); // Divide animation into steps
                const newValue = Math.min(current + increment, target);
                stat.textContent = newValue;
                
                if (newValue < target) {
                    // Continue counting
                    setTimeout(() => {
                        startCounting();
                    }, 50);
                }
            }
        });
    }
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // In a real application, you would send the data to a server here
        // For demo purposes, just show a success message
        showFormStatus('Your message has been sent successfully!', 'success');
        contactForm.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form status
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    // Clear status after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll to target element
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // In a real application, you would send the data to a server
        // For demo purposes, just show an alert
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Close theme selector when clicking outside
document.addEventListener('click', e => {
    if (!themeSelector.contains(e.target) && themeSelector.classList.contains('open')) {
        themeSelector.classList.remove('open');
    }
});

// Ensure theme selector stays within viewport on mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        themeSelector.classList.remove('open');
    }
});

// Initialize to prevent potential JavaScript errors
document.addEventListener('load', () => {
    animateSkillBars();
    startCounting();
});

// Trigger a scroll event after the page loads to check for elements in the viewport
window.addEventListener('load', () => {
    // Force all animated elements to be visible
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
    
    // Trigger the scroll event handler to initialize elements in viewport
    window.dispatchEvent(new Event('scroll'));
});