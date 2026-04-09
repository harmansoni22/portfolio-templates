/*
 * Portfolio 4 - Vikram's Portfolio (Material Design Inspired)
 * Features: Material design, smooth transitions, interactive elements
 * Created for Navodaya Vidhyalaya students
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize theme based on user preference or stored setting
    initTheme();
    
    // Initialize navigation and UI components
    initNavigation();
    initDrawer();
    initScrollSpy();
    initBackToTop();
    initTabSystem();
    initSkillsAnimation();
    initFilterPortfolio();
    initContactForm();
    
    // Add animation classes to elements
    addAnimations();
});

// Theme Management
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        updateThemeIcon('dark');
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon('light');
    }
    
    // Add event listener to theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update theme icon
    updateThemeIcon(isDark ? 'dark' : 'light');
}

function updateThemeIcon(theme) {
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    if (themeToggleIcon) {
        if (theme === 'dark') {
            themeToggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleIcon.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeToggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleIcon.setAttribute('title', 'Switch to Dark Mode');
        }
    }
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // Handle header scrolling behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Handle mobile toggle click
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            openDrawer();
        });
    }
    
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the link is to an anchor on this page
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close drawer if open
                    closeDrawer();
                    
                    // Scroll to the target
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Side Drawer functionality
function initDrawer() {
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.drawer-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }
    
    // Close drawer when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });
}

function openDrawer() {
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.overlay');
    
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeDrawer() {
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.overlay');
    
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling
    }
}

// Scroll Spy (highlight active navigation link)
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Tab system
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (tabButtons.length > 0 && tabIndicator) {
        // Set initial indicator position
        const activeTab = document.querySelector('.tab-button.active');
        
        if (activeTab) {
            updateTabIndicator(activeTab);
        } else if (tabButtons[0]) {
            tabButtons[0].classList.add('active');
            updateTabIndicator(tabButtons[0]);
            
            if (tabPanes[0]) {
                tabPanes[0].classList.add('active');
            }
        }
        
        // Add click event listeners to tab buttons
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all tab buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button and corresponding pane
                this.classList.add('active');
                
                if (tabPanes[index]) {
                    tabPanes[index].classList.add('active');
                }
                
                // Update indicator position
                updateTabIndicator(this);
            });
        });
    }
}

function updateTabIndicator(activeTab) {
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (tabIndicator && activeTab) {
        tabIndicator.style.width = `${activeTab.offsetWidth}px`;
        tabIndicator.style.left = `${activeTab.offsetLeft}px`;
    }
}

// Skills Animation
function initSkillsAnimation() {
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress-value-bar');
    
    if (skillSection && progressBars.length > 0) {
        let hasAnimated = false;
        
        const animateSkills = () => {
            if (hasAnimated) return;
            
            const sectionTop = skillSection.offsetTop;
            const sectionHeight = skillSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPos = window.scrollY;
            
            if (scrollPos > sectionTop - windowHeight + 200) {
                progressBars.forEach(progressBar => {
                    const value = progressBar.getAttribute('data-value');
                    progressBar.style.width = `${value}%`;
                });
                
                hasAnimated = true;
            }
        };
        
        window.addEventListener('scroll', animateSkills);
        
        // Trigger once on load to check if already in view
        animateSkills();
    }
}

// Portfolio Filtering
function initFilterPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    
                    // Add fade-in animation
                    item.classList.remove('fade-in');
                    void item.offsetWidth; // Trigger reflow
                    item.classList.add('fade-in');
                });
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (validateForm(name, email, subject, message)) {
                // Form is valid, show success message
                showFormMessage('Your message has been sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the form data to a server here
                // For this demo, we're just showing a success message
            }
        });
    }
}

function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Validate name
    if (name === '') {
        showFormError('name', 'Please enter your name');
        isValid = false;
    } else {
        hideFormError('name');
    }
    
    // Validate email
    if (email === '') {
        showFormError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFormError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideFormError('email');
    }
    
    // Validate subject
    if (subject === '') {
        showFormError('subject', 'Please enter a subject');
        isValid = false;
    } else {
        hideFormError('subject');
    }
    
    // Validate message
    if (message === '') {
        showFormError('message', 'Please enter your message');
        isValid = false;
    } else {
        hideFormError('message');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
}

function hideFormError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    if (input && errorElement) {
        input.classList.remove('error');
        errorElement.style.display = 'none';
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Add animations to elements
function addAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    
    if (animatedElements.length > 0) {
        const animateElement = () => {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 50) {
                    const animationClass = element.getAttribute('data-animation') || 'fade-in-up';
                    element.classList.add(animationClass);
                }
            });
        };
        
        window.addEventListener('scroll', animateElement);
        
        // Trigger once on load
        animateElement();
    }
}