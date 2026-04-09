/**
 * Portfolio 10 - Scandinavian Minimalist Portfolio
 * This JavaScript file handles all the interactive elements of the portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initNavigation();
    initMobileNav();
    initSkillBars();
    initProjectFilter();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
    initHorizontalScroll();
    
    // Log that initialization is complete
    console.log('Portfolio 10 - Scandinavian Minimalist Portfolio initialized');
  });
  
  /**
   * Theme Management - Dark/Light Mode Toggle
   */
  function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    
    // If a theme preference exists in localStorage, use it
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      // Otherwise, use the device preference
      const deviceTheme = prefersDarkScheme.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', deviceTheme);
      updateThemeIcon(deviceTheme);
    }
    
    // Add event listener to toggle theme
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
    
    // Update the theme icon based on current theme
    function updateThemeIcon(theme) {
      if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
          ? '<i class="fas fa-sun"></i>' 
          : '<i class="fas fa-moon"></i>';
      }
    }
  }
  
  /**
   * Navigation Functionality
   */
  function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Make header sticky on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
      
      // Update active nav link based on scroll position
      updateActiveNavLink();
    });
    
    // Smooth scroll when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        
        // Close mobile nav if open
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
        }
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 150;
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
    
    // Call it once on page load
    updateActiveNavLink();
  }
  
  /**
   * Mobile Navigation
   */
  function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if (mobileNavToggle && mobileNav) {
      // Toggle mobile nav when clicking the toggle button
      mobileNavToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
      });
      
      // Close mobile nav when clicking the close button
      if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
          mobileNav.classList.remove('active');
        });
      }
      
      // Close mobile nav when clicking outside
      document.addEventListener('click', e => {
        if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target) && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
        }
      });
    }
  }
  
  /**
   * Skill Bars Animation
   */
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when scrolled into view
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight * 0.9) {
          bar.style.width = `${percentage}%`;
        }
      });
    }
    
    // Call once on page load and then on scroll
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
  }
  
  /**
   * Project Filtering
   */
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons and add to clicked button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Get category to filter by
          const category = button.getAttribute('data-category');
          
          // Filter projects based on category
          projectCards.forEach(card => {
            if (category === 'all') {
              card.style.display = 'block';
            } else {
              const cardCategory = card.getAttribute('data-category');
              if (cardCategory === category) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            }
          });
        });
      });
    }
  }
  
  /**
   * Scroll Animations
   */
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    function checkAnimations() {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    }
    
    // Check animations on scroll and on page load
    window.addEventListener('scroll', checkAnimations);
    checkAnimations();
  }
  
  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      
      // Smooth scroll to top when button is clicked
      backToTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  /**
   * Horizontal Scrolling Gallery
   */
  function initHorizontalScroll() {
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');
    
    scrollContainers.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;
      
      container.addEventListener('mousedown', e => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });
      
      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });
      
      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });
      
      container.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        container.scrollLeft = scrollLeft - walk;
      });
    });
  }
  
  /**
   * Contact Form Validation
   */
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Get form inputs
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const subjectInput = contactForm.querySelector('#subject');
        const messageInput = contactForm.querySelector('#message');
        
        // Simple validation
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.form-error').forEach(error => {
          error.classList.remove('show');
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
          showFormError(nameInput, 'Name is required');
          isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
          showFormError(emailInput, 'Please enter a valid email address');
          isValid = false;
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
          showFormError(subjectInput, 'Subject is required');
          isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
          showFormError(messageInput, 'Message is required');
          isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
          showFormSuccess('Thank you for your message! I\'ll get back to you soon.');
          contactForm.reset();
        }
      });
      
      // Show error message for a form field
      function showFormError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.form-error');
        
        if (errorMessage) {
          errorMessage.textContent = message;
          errorMessage.classList.add('show');
        }
      }
      
      // Show success message
      function showFormSuccess(message) {
        const formSuccess = contactForm.querySelector('.form-success');
        
        if (formSuccess) {
          formSuccess.textContent = message;
          formSuccess.classList.add('show');
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formSuccess.classList.remove('show');
          }, 5000);
        }
      }
      
      // Validate email format
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }
  }