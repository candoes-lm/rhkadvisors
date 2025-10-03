const langButtons = document.querySelectorAll('.language-toggle button');
const langBlocks = document.querySelectorAll('.lang-content');

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedLang = button.id.replace('lang-', '');

    // Toggle button styles
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Toggle content blocks
    langBlocks.forEach(block => {
      block.classList.remove('active');
      if (block.classList.contains(`lang-${selectedLang}`)) {
        block.classList.add('active');
      }
    });
  });
});


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    // Optional: Close menu after clicking a link (mobile UX)
    const navMenu = document.getElementById('nav-menu');
    const toggleBtn = document.getElementById('menu-toggle');
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
    }
  });
});

// Toggle responsive menu
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Enable dropdowns on mobile tap
document.querySelectorAll('#nav-menu > ul > li > a').forEach(link => {
  link.addEventListener('click', function (e) {
    const parent = this.parentElement;
    if (window.innerWidth <= 768 && parent.querySelector('.submenu')) {
      e.preventDefault();
      parent.classList.toggle('open');
    }
  });
});

document.querySelector('.subscribe-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for subscribing!');
  //this.reset();
});


/* Location Section */
const locationSelect = document.getElementById('location-select');
const locationAddress = document.getElementById('location-address');
const locationMap = document.getElementById('location-map');

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
  }
  // Add more locations here
};

const locationDetails = document.querySelector('.location-details');

// ✅ Function to update map and address
function updateLocation(locationKey) {
  const location = locations[locationKey];

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
window.addEventListener('DOMContentLoaded', () => {
  const defaultLocation = locationSelect.value || 'address1';
  updateLocation(defaultLocation);
});

locationSelect.addEventListener('change', () => {
  const selected = locationSelect.value;
  updateLocation(locationSelect.value);
});
