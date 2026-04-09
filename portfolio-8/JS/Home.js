/**
 * Portfolio 8 - Retro Cyberpunk Portfolio
 * This JavaScript file handles all the interactive elements of the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize skill tabs
    initSkillTabs();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize animated elements
    initAnimations();
  });
  
  /**
   * Initialize loading screen
   */
  function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          
          // Start animations after loading is complete
          animateSkillBars();
        }, 500);
      }
      
      loadingProgress.style.width = `${progress}%`;
    }, 200);
  }
  
  /**
   * Initialize theme toggle functionality
   */
  function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      updateThemeIcon('light');
    } else if (savedTheme === 'dark') {
      document.body.classList.remove('light-theme');
      updateThemeIcon('dark');
    } else if (prefersDarkScheme.matches) {
      document.body.classList.remove('light-theme');
      updateThemeIcon('dark');
    } else {
      document.body.classList.add('light-theme');
      updateThemeIcon('light');
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Function to toggle theme
    function toggleTheme() {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      }
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
      if (!themeToggle) return;
      
      if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
  }
  
  /**
   * Initialize navigation functionality
   */
  function initNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBtn.innerHTML = navMenu.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
    
    // Update active link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set the active link
    updateActiveNavLink();
  }
  
  /**
   * Update active navigation link based on scroll position
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  /**
   * Initialize back to top button
   */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  /**
   * Initialize skill tabs
   */
  function initSkillTabs() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skill-content');
    
    if (skillTabs.length === 0 || skillContents.length === 0) return;
    
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        skillTabs.forEach(t => t.classList.remove('active'));
        skillContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Animate skill bars in the active tab
        animateSkillBars();
      });
    });
  }
  
  /**
   * Animate skill bars
   */
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      bar.style.width = '0%';
      
      // Reset animation
      bar.style.animation = 'none';
      bar.offsetHeight; // Trigger reflow
      bar.style.animation = null;
      
      // Set the width based on the percentage
      setTimeout(() => {
        bar.style.width = `${percent}%`;
      }, 100);
    });
  }
  
  /**
   * Initialize project filtering
   */
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Show/hide projects based on filter
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else if (card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  /**
   * Initialize contact form validation
   */
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Validate name
      if (!nameInput.value.trim()) {
        showFormError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        hideFormError(nameInput);
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        showFormError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showFormError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        hideFormError(emailInput);
      }
      
      // Validate subject
      if (!subjectInput.value.trim()) {
        showFormError(subjectInput, 'Please enter a subject');
        isValid = false;
      } else {
        hideFormError(subjectInput);
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showFormError(messageInput, 'Please enter your message');
        isValid = false;
      } else {
        hideFormError(messageInput);
      }
      
      // If all validations pass, show success message
      if (isValid) {
        showFormMessage('Your message has been sent successfully!', 'success');
        contactForm.reset();
      }
    });
    
    // Function to show form error
    function showFormError(input, message) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
      
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      errorElement.style.color = 'var(--secondary)';
      errorElement.style.fontSize = '0.9rem';
      errorElement.style.marginTop = '0.5rem';
      
      if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
      }
      
      input.style.borderColor = 'var(--secondary)';
    }
    
    // Function to hide form error
    function hideFormError(input) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');
      
      if (errorElement) {
        formGroup.removeChild(errorElement);
      }
      
      input.style.borderColor = 'var(--border)';
    }
    
    // Function to show form message
    function showFormMessage(message, type) {
      const messageElement = document.querySelector('.form-message') || document.createElement('div');
      
      messageElement.className = `form-message ${type}`;
      messageElement.textContent = message;
      
      if (type === 'success') {
        messageElement.style.color = 'var(--primary)';
      } else {
        messageElement.style.color = 'var(--secondary)';
      }
      
      messageElement.style.fontSize = '1rem';
      messageElement.style.marginTop = '1rem';
      messageElement.style.padding = '0.5rem';
      messageElement.style.border = '1px solid';
      messageElement.style.borderColor = type === 'success' ? 'var(--primary)' : 'var(--secondary)';
      
      if (!document.querySelector('.form-message')) {
        contactForm.appendChild(messageElement);
      }
      
      // Remove message after 5 seconds
      setTimeout(() => {
        if (contactForm.contains(messageElement)) {
          contactForm.removeChild(messageElement);
        }
      }, 5000);
    }
    
    // Function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  
  /**
   * Initialize animations for scroll events
   */
  function initAnimations() {
    // Add glitch effect to headings
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
      heading.addEventListener('mouseenter', () => {
        heading.classList.add('glitch');
      });
      
      heading.addEventListener('mouseleave', () => {
        heading.classList.remove('glitch');
      });
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe each element
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }