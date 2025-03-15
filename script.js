document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dots = document.querySelectorAll('.dot');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
  }

  // Event listeners for navigation buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Event listeners for dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          updateSlider();
      });
  });

  // Optional: Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);
});

// Character counter for textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('question');
    const charCount = document.querySelector('.character-count');
    
    if (textarea && charCount) {
      textarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = `${currentLength}/350`;
        
        // Optional: Change color when approaching limit
        if (currentLength > 300) {
          charCount.style.color = '#c75e46';
        } else {
          charCount.style.color = '#1A472A';
          charCount.style.opacity = '0.7';
        }
      });
    }
    
    // Add animation class when form inputs are valid
    const formFields = document.querySelectorAll('.form-field input, .form-field select, .form-field textarea');
    formFields.forEach(field => {
      field.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          this.classList.add('has-content');
        } else {
          this.classList.remove('has-content');
        }
      });
    });
});

// Function to check if an element is in the viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Function to add animation class when element is visible
function handleScrollAnimation() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('animated')) {
      element.classList.add('animated');
    }
  });
}

// Add animation classes to elements we want to animate
function setupAnimations() {
  // Sections to animate
  const sectionsToAnimate = [
    '#zen-tea-section .zen-content',
    '.panel', 
    '#about-content',
    '#special-blend-section .blend-content',
    '#mission-section .mission-content',
    '#product-consultation .consultation-form-container'
  ];
  
  // Add animation class to each section
  sectionsToAnimate.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add('animate-on-scroll');
      // Add different animation delays for elements like panels
      if (selector === '.panel') {
        element.style.transitionDelay = `${index * 0.2}s`;
      }
    });
  });
  
  // Special animations for specific elements
  const specialAnimations = [
    { selector: '.zen-title', animation: 'fade-down' },
    { selector: '.hero-content', animation: 'fade-right' },
    { selector: '.about-header', animation: 'fade-down' },
    { selector: '.mission-title-wrapper', animation: 'fade-down' },
    { selector: '.blend-title', animation: 'fade-down' },
    { selector: '.section-title', animation: 'fade-down' }
  ];
  
  specialAnimations.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      element.classList.add('animate-on-scroll', item.animation);
    });
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupAnimations();
  
  // Trigger animations for elements already in viewport
  handleScrollAnimation();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimation);
});

// start up animations

// Add this to your existing script.js file or create a new one

document.addEventListener('DOMContentLoaded', function() {
  // Create Intersection Observer
  const observerOptions = {
    root: null, // use viewport as root
    rootMargin: '0px',
    threshold: 0.2 // trigger when 20% of the element is visible
  };

  // Animation classes to add when elements become visible
  const animationClasses = {
    'fade-in': 'section.hero-container, .zen-container, #about-content, #special-blend-section, #mission-section, #product-consultation, .product-card, .composition',
    'slide-in-left': '.zen-image-container, .about-image, .blend-image-wrapper, .mission-image-container',
    'slide-in-right': '.zen-description, .about-text, .blend-info, .mission-statement',
    'scale-in': '.panel, .product-title, .tea-facts .fact-item, .blend-benefits .benefit, .mission-values .value-item',
    'pop-in': '.nav-item, .hero-cta .btn, .dots-container .dot',
    'float-up': '' // Removed decorative elements from this class
  };

  // Separate animation class for decorative elements that should keep their transparency
  const floatingElements = '.tea-leaf, .leaf, .zen-decor, .blend-decor, .mission-bg-element, .decorative-line';

  // Add CSS for animations to the head
  const style = document.createElement('style');
  style.textContent = `
    /* Base styles for elements before animation */
    .fade-in, .slide-in-left, .slide-in-right, .scale-in, .pop-in {
      opacity: 0;
      transition: all 0.8s ease-out;
      will-change: opacity, transform;
    }

    /* Special class for floating decorative elements */
    .float-only {
      transform: translateY(20px);
      transition: transform 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      will-change: transform;
      /* No opacity change */
    }

    /* Animation effects */
    .fade-in.animated {
      opacity: 1;
    }
    
    .slide-in-left {
      transform: translateX(-50px);
    }
    
    .slide-in-left.animated {
      opacity: 1;
      transform: translateX(0);
    }
    
    .slide-in-right {
      transform: translateX(50px);
    }
    
    .slide-in-right.animated {
      opacity: 1;
      transform: translateX(0);
    }
    
    .scale-in {
      transform: scale(0.85);
    }
    
    .scale-in.animated {
      opacity: 1;
      transform: scale(1);
    }
    
    .pop-in {
      transform: scale(0.5);
    }
    
    .pop-in.animated {
      opacity: 1;
      transform: scale(1);
      transition: all 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    }
    
    .float-only.animated {
      transform: translateY(0);
    }
    
    /* Sequential animation for list items */
    .nav-item.animated, .tea-facts .fact-item.animated, .blend-benefits .benefit.animated, .mission-values .value-item.animated {
      transition-delay: calc(var(--item-index, 0) * 0.15s);
    }
  `;
  document.head.appendChild(style);

  // Initialize animations
  function initAnimations() {
    // Add animation classes to elements
    for (const [className, selector] of Object.entries(animationClasses)) {
      if (selector) { // Only process non-empty selectors
        document.querySelectorAll(selector).forEach(element => {
          element.classList.add(className);
        });
      }
    }
    
    // Add the special float-only class to decorative elements
    document.querySelectorAll(floatingElements).forEach(element => {
      element.classList.add('float-only');
    });

    // Add sequential animation indices
    const sequentialElements = [
      '.nav-item', 
      '.tea-facts .fact-item', 
      '.blend-benefits .benefit', 
      '.mission-values .value-item',
      '.panel'
    ];
    
    sequentialElements.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.style.setProperty('--item-index', index);
      });
    });
    
    // Create and use the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Target all elements with animation classes
    const allAnimationSelectors = [...Object.values(animationClasses).filter(selector => selector !== ''), floatingElements].join(', ');
    document.querySelectorAll(allAnimationSelectors).forEach(element => {
      observer.observe(element);
    });
  }

  // Add special animations for hero section
  function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-cta, .slider-container');
    
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.8s ease-out';
      element.style.transitionDelay = `${index * 0.2}s`;
      
      // Animate immediately since hero is visible on load
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // Special animation for header elements
  function initHeaderAnimations() {
    const headerElements = document.querySelectorAll('.logo-container, .main-navigation');
    
    headerElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = index === 0 ? 'translateX(-20px)' : 'translateY(-20px)';
      element.style.transition = 'all 0.6s ease-out';
      element.style.transitionDelay = `${index * 0.15}s`;
      
      // Animate immediately
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
      }, 100);
    });
    
    // Header decoration elements - only animate position, not opacity
    const headerDecorations = document.querySelectorAll('.header-decoration');
    headerDecorations.forEach(element => {
      element.style.transform = 'translateY(-20px)';
      element.style.transition = 'transform 0.6s ease-out';
      element.style.transitionDelay = '0.3s';
      
      setTimeout(() => {
        element.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // Product page specific animations
  function initProductPageAnimations() {
    if (document.querySelector('.product-card')) {
      const productElements = document.querySelectorAll('.product-image, .product-title, .product-description, .product-cta');
      
      productElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = index % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
        element.style.transition = 'all 0.7s ease-out';
        element.style.transitionDelay = `${index * 0.2}s`;
        
        // Animate with small delay
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        }, 300);
      });
      
      // Tea leaf elements animation - only animate position, not opacity
      document.querySelectorAll('.tea-leaf').forEach((leaf, index) => {
        // Do not change opacity
        leaf.style.transform = 'rotate(-30deg) translateY(20px)';
        leaf.style.transition = 'transform 1.2s ease-out';
        leaf.style.transitionDelay = `${0.5 + (index * 0.2)}s`;
        
        setTimeout(() => {
          leaf.style.transform = 'rotate(0) translateY(0)';
        }, 300);
      });
    }
  }

  // Initialize all animations
  initHeaderAnimations();
  initHeroAnimations();
  initAnimations();
  initProductPageAnimations();
});

document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const menuIcon = document.querySelector('.main-navigation .fa-bars');
  const closeIcon = document.querySelector('.nav-menu .fa-circle-xmark');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Function to check screen size
  function isDesktopView() {
    return window.innerWidth >= 1026; // Desktop is 1026px and above
  }
  
  function isTabletView() {
    return window.innerWidth > 435 && window.innerWidth <= 1025; // Tablet is between 435px and 1025px
  }
  
  function isMobileView() {
    return window.innerWidth <= 435; // Mobile is 435px and below
  }
  
  // Function to update menu icon visibility based on screen size
  function updateMenuIconVisibility() {
    if (isDesktopView()) {
      // Desktop view - always hide the hamburger
      menuIcon.style.cssText = 'display: none !important; visibility: hidden !important;';
    } else if (isTabletView() || isMobileView()) {
      // Tablet or Mobile view - show hamburger unless menu is open
      if (navMenu.classList.contains('show')) {
        menuIcon.style.cssText = 'display: none !important;';
      } else {
        menuIcon.style.cssText = 'display: block !important; visibility: visible !important;';
      }
    }
  }
  
  // Function to open menu
  function openMenu() {
    console.log('Opening menu');
    navMenu.classList.add('show');
    menuIcon.style.cssText = 'display: none !important;';
  }
  
  // Function to close menu
  function closeMenu() {
    console.log('Closing menu');
    navMenu.classList.remove('show');
    updateMenuIconVisibility();
  }
  
  // Add event listeners
  if (menuIcon) {
    menuIcon.addEventListener('click', openMenu);
  }
  
  // Close menu when X icon is clicked
  if (closeIcon) {
    closeIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
  }
  
  // Close menu when clicking on any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Initial setup on page load
  updateMenuIconVisibility();
  
  // Handle resize events with debounce for performance
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      updateMenuIconVisibility();
    }, 100);
  });
});