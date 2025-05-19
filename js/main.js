// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }
  
  // Back to top button
  const createBackToTopButton = () => {
    const backToTop = document.createElement('div');
    backToTop.classList.add('back-to-top');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    // Show button when scrolling down
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicking the button
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  createBackToTopButton();
  
  // Audio player enhancements
  const audioPlayers = document.querySelectorAll('audio');
  audioPlayers.forEach(player => {
    player.addEventListener('play', function() {
      audioPlayers.forEach(otherPlayer => {
        if (otherPlayer !== player && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
    });
  });
  
  // Image gallery modal (if present)
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        // Create modal
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        // Create image
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.border = '3px solid white';
        modalImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        
        // Create close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        
        // Add elements to DOM
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Fade in modal
        setTimeout(() => {
          modal.style.opacity = '1';
        }, 10);
        
        // Close modal when clicking close button or outside the image
        closeBtn.onclick = function() {
          fadeOutAndRemove(modal);
        };
        
        modal.onclick = function(e) {
          if (e.target === modal) {
            fadeOutAndRemove(modal);
          }
        };
        
        function fadeOutAndRemove(element) {
          element.style.opacity = '0';
          document.body.style.overflow = '';
          setTimeout(() => {
            element.remove();
          }, 300);
        }
      });
    });
  }
  
  // Set active navigation link based on current page
  const setActiveNavLink = () => {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPage.includes(linkPath) && linkPath !== 'index.html') {
        link.classList.add('active');
      } else if (currentPage.endsWith('/') && linkPath === 'index.html') {
        link.classList.add('active');
      } else if (currentPage.endsWith('index.html') && linkPath === 'index.html') {
        link.classList.add('active');
      }
    });
  };
  
  setActiveNavLink();
});