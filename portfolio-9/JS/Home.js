/**
 * Portfolio 9 - Magazine-Style Editorial Portfolio
 * This JavaScript file handles all the interactive elements of the portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initNavigation();
    initSkillTabs();
    initProjectFilters();
    initScrollAnimation();
    initContactForm();
    initBackToTop();
});
  
  /**
   * Theme Management - Dark/Light Mode Toggle
   */
  function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme) {
      document.body.classList.toggle('dark-mode', storedTheme === 'dark');
      updateThemeIcon(storedTheme);
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark-mode', prefersDarkMode);
      updateThemeIcon(prefersDarkMode ? 'dark' : 'light');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
      const iconElement = themeToggle.querySelector('i');
      if (!iconElement) return;
      
      // Remove existing icon classes
      iconElement.className = '';
      
      // Add new icon class based on theme
      if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
      } else {
        iconElement.className = 'fas fa-moon';
      }
    }
  }
  
  /**
   * Navigation Functionality
   */
  function initNavigation() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', 
          nav.classList.contains('open') ? 'true' : 'false'
        );
        
        // Toggle icon
        const iconElement = navToggle.querySelector('i');
        if (iconElement) {
          if (nav.classList.contains('open')) {
            iconElement.className = 'fas fa-times';
          } else {
            iconElement.className = 'fas fa-bars';
          }
        }
      });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          const iconElement = navToggle.querySelector('i');
          if (iconElement) {
            iconElement.className = 'fas fa-bars';
          }
        }
      });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Update active navigation link based on scroll position
      updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && targetId !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: targetPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
      const scrollPosition = window.scrollY + header.offsetHeight + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
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
    
    // Initial call to set active link
    updateActiveNavLink();
  }
  
  /**
   * Skills Tabs Functionality
   */
  function initSkillTabs() {
    const tabs = document.querySelectorAll('.skills-tab');
    const contents = document.querySelectorAll('.skills-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.querySelector(`.skills-content[data-content="${target}"]`).classList.add('active');
        
        // Animate skill bars for the active tab
        animateSkillBars();
      });
    });
    
    // Animate skill bars on page load for the active tab
    animateSkillBars();
  }
  
  /**
   * Animate skill bars
   */
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = '0%';
      
      // Use requestAnimationFrame for smoother animation
      setTimeout(() => {
        bar.style.width = percentage + '%';
      }, 200);
    });
  }
  
  /**
   * Project filtering functionality
   */
  function initProjectFilters() {
    const filters = document.querySelectorAll('.project-filter');
    const projects = document.querySelectorAll('.project-item');
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-filter');
        
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        filter.classList.add('active');
        
        // Filter projects
        projects.forEach(project => {
          const projectCategory = project.getAttribute('data-category');
          
          // Hide project with fade-out
          project.classList.add('fade-out');
          
          setTimeout(() => {
            if (category === 'all' || projectCategory === category) {
              project.style.display = 'block';
              setTimeout(() => {
                project.classList.remove('fade-out');
              }, 50);
            } else {
              project.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }
  
  /**
   * Scroll animations for elements
   */
  function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.fade-in, .zoom-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Contact form validation and submission
   */
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formMessage = document.querySelector('.form-message');
        
        // Validate form
        if (!validateForm(nameInput, emailInput, subjectInput, messageInput)) {
          return;
        }
        
        // Simulated form submission (in a real scenario, you would submit to a backend)
        // Show success message
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }
    
    // Form validation
    function validateForm(nameInput, emailInput, subjectInput, messageInput) {
      let isValid = true;
      const formMessage = document.querySelector('.form-message');
      
      // Reset previous error states
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.classList.remove('error');
      });
      
      formMessage.style.display = 'none';
      
      // Check for empty fields
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      }
      
      if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
      }
      
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('error');
        isValid = false;
      }
      
      if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        isValid = false;
      }
      
      // Show error message if form is invalid
      if (!isValid) {
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.textContent = 'Please fill in all required fields correctly.';
        formMessage.style.display = 'block';
      }
      
      return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  
  /**
   * Back to top button functionality
   */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      
      // Smooth scroll to top when button is clicked
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }