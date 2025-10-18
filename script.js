// ===============================================
// 🌐 Global function to apply language sitewide
// ===============================================
// ✅ Unified language handler
window.setLanguage = function (lang) {
  lang = lang || localStorage.getItem("lang") || "en";
  localStorage.setItem("lang", lang);

  console.log("🌍 Applying language:", lang);

  // Hide all language blocks
  document.querySelectorAll(".lang-content").forEach((block) => {
    block.classList.remove("active");
    block.style.display = "none";
  });

  // Show only the selected one
  document.querySelectorAll(`.lang-content.lang-${lang}`).forEach((block) => {
    block.classList.add("active");
    block.style.display = "";
  });

  // Update language button state
  document.querySelectorAll(".language-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Notify other pages (like services.html)
  document.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
};

// ✅ Initialize toggle buttons
window.initLanguageToggle = function () {
  const buttons = document.querySelectorAll(".language-toggle button");
  if (!buttons.length) {
    console.warn("⚠️ No language buttons found yet.");
    return;
  }

  const savedLang = localStorage.getItem("lang") || "en";
  window.setLanguage(savedLang);

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = button.dataset.lang;
      console.log("🌐 Language button clicked:", lang);
      window.setLanguage(lang);
    });
  });

  console.log("✅ Language toggle ready");
};




// Generic function to load and inject HTML components with optional script loading
function loadComponent(url, placeholderId, options = {}) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) {
        placeholder.innerHTML = html;

        // Force style recalculation
        const elements = placeholder.querySelectorAll('*');
        elements.forEach(el => el.style.display = ''); // Reset display to trigger reflow
        
        // Call onLoad directly
        if (options.onLoad) options.onLoad();
      }
    })
    .catch(error => console.error(`Error loading ${placeholderId}:`, error));
}

// Load components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set default language to 'en' if not set
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
  }

  loadComponent('header.html', 'header-placeholder', {
    onLoad: () => {  // Changed from onScriptLoad
      console.log(' Header loaded');
      if (window.initHeaderScripts) {
        window.initHeaderScripts();
      }
      if (window.initLanguageToggle) window.initLanguageToggle();

      // Reapply saved language after header is loaded
      setTimeout(() => {
        const savedLang = localStorage.getItem('lang') || 'en';
        if (typeof window.setLanguage === 'function') {
          window.setLanguage(savedLang);
        }
      }, 50);
    

        console.log('✅ Header loaded & language toggle initialized');
    }
});


  loadComponent('footer.html', 'footer-placeholder', {
    onLoad: () => {
      // Update the year in the footer after it's loaded
      const yearSpan = document.getElementById('year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }

      // Ensure footer reflects the current language
      const savedLang = localStorage.getItem('lang') || 'en';
      if (typeof window.setLanguage === 'function') {
        window.setLanguage(savedLang); // Reapply to include footer
      }
    }
});
});



function initHeaderScripts() {
  initLanguageToggle();
  initSmoothScroll();
  initLocationSection();
  // initDropdownsForMobile();

  // Responsive menu toggle (target the active nav)
  const toggleBtn = document.getElementById('menu-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('open');
      const activeNav = document.querySelector('.lang-content.active');  // Target visible nav
      if (activeNav) {
        activeNav.classList.toggle('open');
      }
    });
  }

// Dropdowns on mobile (attach to active nav only)
  const activeNav = document.querySelector('.lang-content.active');
  if (activeNav) {
    activeNav.querySelectorAll('.nav-menu > ul > li > a').forEach(link => {
      link.addEventListener('click', function (e) {
        const parent = this.parentElement;
        if (window.innerWidth <= 768 && parent.querySelector('.submenu')) {
          e.preventDefault();
          parent.classList.toggle('open');
        }
      });
    });
  }
}


// ✅ Expose globally so it can be called after script loads
window.initHeaderScripts = initHeaderScripts;


// Smooth scroll for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Optional: Close menu after clicking a link (mobile UX)
      const navMenu = document.getElementById('nav.lang-content.active');
      const toggleBtn = document.getElementById('menu-toggle');
      if (navMenu && toggleBtn && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('open');
      }
    }); // ✅ closes anchor.addEventListener
  }); // ✅ closes anchorLinks.forEach
}

// Enable dropdowns on mobile tap
function initDropdownsForMobile() {
    const navMenu = document.getElementById('nav.lang-content');
    if (!navMenu) return;
    
  navMenus.forEach(nav => {
    const mobileAnchorLinks = nav.querySelectorAll('.nav-menu > ul > li > a');
    mobileAnchorLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const parent = this.parentElement;
        if (window.innerWidth <= 768 && parent.querySelector('.submenu')) {
          e.preventDefault();
          parent.classList.toggle('open');
        }
      });
    });
  });
}

window.initDropdownsForMobile = initDropdownsForMobile;


function initLocationSection() {
/* Location Section */
const locationSelect = document.getElementById('location-select');
const locationAddress = document.getElementById('location-address');
const locationMap = document.getElementById('location-map');
const locationDetails = document.querySelector('.location-details');

 if (!locationSelect || !locationAddress || !locationMap || !locationDetails) return;

const locations = {
  address1: {
    address: 'Seoul Office Address',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202405.65365835113!2d126.8093272023812!3d37.564761548169734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1758237746423!5m2!1sen!2sus'
  },
  address2: {
    address: 'Los Angeles Office Address',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.88319550565!2d-118.74139451896193!3d34.0200391581706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1758237787187!5m2!1sen!2sus'
  },
  address3: {
    address: 'Atlanta Office Address',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212271.62992500217!2d-84.58502002907517!3d33.76727497207328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1758237808269!5m2!1sen!2sus'
  },
  // Add more locations here
};


// ✅ Function to update map and address
function updateLocation(locationKey) {
  const location = locations[locationKey];
  if (!location) return;

  // Start fade-out
  locationDetails.classList.remove('fade-in');
  locationDetails.classList.add('fade-out');

  // Wait for fade-out to finish, then update content and fade-in
  setTimeout(() => {
    locationAddress.textContent = location.address;
    locationMap.src = location.map;

    locationDetails.classList.remove('fade-out');
    locationDetails.classList.add('fade-in');
  }, 300); // match transition duration
}

// ✅ Initialize default location on page load
  const defaultLocation = locationSelect.value || 'address1';
  updateLocation(defaultLocation);


locationSelect.addEventListener('change', () => {
  
  updateLocation(locationSelect.value);
});
}


// ===============================================
// 🧠 Ensure correct language loads on services.html navigation
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  
  // Re-apply active language button (visual sync)
  const activeLangBtn = document.querySelector(`.language-toggle .submenu button[data-lang="${savedLang}"]`);
  if (activeLangBtn) {
    document
      .querySelectorAll('.language-toggle .submenu button')
      .forEach(btn => btn.classList.remove('active'));
    activeLangBtn.classList.add('active');
  }

  // If this page is services.html, trigger language-specific loading
  if (window.location.pathname.includes('services.html')) {
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: savedLang }));
  }
});


// ✅ Sync dynamically loaded header with stored language
window.addEventListener('languageChanged', e => {
  const lang = e.detail || localStorage.getItem('lang') || 'en';
  setTimeout(() => {
    if (typeof window.setLanguage === 'function') {
      window.setLanguage(lang);
    }
  }, 50);
});

document.addEventListener("DOMContentLoaded", () => {
  const members = document.querySelectorAll(".member-card");
  const revealOnScroll = () => {
    members.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger on load
});


