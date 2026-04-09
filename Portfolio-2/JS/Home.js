// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sidePanel = document.querySelector('.side-panel');
const navLinks = document.querySelectorAll('.side-nav a');
const sections = document.querySelectorAll('.section');
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const backToTopBtn = document.querySelector('.back-to-top');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Mobile Navigation Toggle
mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    sidePanel.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            mobileNavToggle.classList.remove('active');
            sidePanel.classList.remove('active');
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to current link
        this.classList.add('active');
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Scroll to the section
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Theme Toggle
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeLabel.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeLabel.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
        themeLabel.textContent = 'Light Mode';
    }
    
    // Animate Skill Bars on load
    animateSkillBars();
    
    // Active section on load
    updateActiveSection();
});

// Scroll Events
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Animate skill bars when they come into view
    animateSkillBars();
    
    // Update active section in navigation
    updateActiveSection();
});

// Animate skill progress bars
function animateSkillBars() {
    skillProgressBars.forEach(progressBar => {
        const progressValue = progressBar.getAttribute('data-progress');
        const rect = progressBar.getBoundingClientRect();
        
        // Check if element is in viewport
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !progressBar.style.width) {
            setTimeout(() => {
                progressBar.style.width = `${progressValue}%`;
            }, 200);
        }
    });
}

// Update active section in navigation
function updateActiveSection() {
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

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all filter buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Form submission with validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // In a real application, this would send the form data to a server
        // For now, just show a success message
        showFormMessage('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Helper function to show form messages
function showFormMessage(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    // Clear the message after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

// Back to top functionality
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Prevent default form submission on Enter key (accessibility feature)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
        e.preventDefault();
    }
});

// Gallery image hover animation
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.style.zIndex = '1';
        }, 300);
    });
});

// Initial call to animate skill bars on page load
document.addEventListener('load', animateSkillBars);