// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    nav.style.padding = '0.3rem 0.5rem';
  } else {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    nav.style.padding = '0.5rem';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll animations for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.popular__card, .client__card, .feature__card, .cabin__card, .info__card');
  cards.forEach(card => {
    observer.observe(card);
  });

  // Add fade-in class to elements
  const fadeElements = document.querySelectorAll('.section__header, .book__header, .explore__hero, .experience__hero, .contact__hero');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Login/Register tab switching
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab__btn');
  const authForms = document.querySelectorAll('.auth__form');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and forms
      tabButtons.forEach(btn => btn.classList.remove('active'));
      authForms.forEach(form => form.classList.remove('active'));

      // Add active class to clicked button and corresponding form
      button.classList.add('active');
      const targetForm = document.getElementById(`${targetTab}Form`);
      if (targetForm) {
        targetForm.classList.add('active');
      }
    });
  });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Form validation and animations
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Add focus animation
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });

      // Real-time validation feedback
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.style.borderColor = '#4CAF50';
        } else {
          input.style.borderColor = '#f44336';
        }
      });
    });

    // Form submission animation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
          submitButton.style.transform = 'scale(1)';
        }, 150);

        // Show success message (you can customize this)
        showNotification('Form submitted successfully!', 'success');
      }
    });
  });
});

// Home page booking form redirect
document.addEventListener('DOMContentLoaded', () => {
  const homeBookingForm = document.getElementById('homeBookingForm');
  
  if (homeBookingForm) {
    homeBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Redirect to Book page
      window.location.href = 'Book.html';
    });
  }
});

// Booking form flight search simulation
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const flightResults = document.getElementById('flightResults');
  const flightsGrid = document.getElementById('flightsGrid');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate flight search
      if (flightResults && flightsGrid) {
        flightResults.style.display = 'block';
        flightResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Generate sample flight results
        const sampleFlights = [
          { airline: 'SayadiAirways', time: '08:00 - 12:30', price: '850 DT', stops: 'Direct' },
          { airline: 'SayadiAirways', time: '14:30 - 19:00', price: '920 DT', stops: 'Direct' },
          { airline: 'SayadiAirways', time: '10:15 - 16:45', price: '780 DT', stops: '1 Stop' }
        ];

        flightsGrid.innerHTML = '';
        sampleFlights.forEach((flight, index) => {
          const flightCard = document.createElement('div');
          flightCard.className = 'popular__card';
          flightCard.style.animationDelay = `${index * 0.1}s`;
          flightCard.innerHTML = `
            <div class="popular__content" style="padding: 2rem;">
              <div class="popular__card__header">
                <h4>${flight.airline}</h4>
                <h4>${flight.price}</h4>
              </div>
              <p><i class="ri-time-line"></i> ${flight.time}</p>
              <p><i class="ri-flight-takeoff-line"></i> ${flight.stops}</p>
              <button class="btn" style="margin-top: 1rem; width: 100%;">Select Flight</button>
            </div>
          `;
          flightsGrid.appendChild(flightCard);
          observer.observe(flightCard);
        });
      }
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSections = document.querySelectorAll('.header__image__container, .explore__header, .experience__header, .contact__header');
  
  heroSections.forEach(hero => {
    if (hero) {
      const rate = scrolled * 0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
});

// Button ripple effect
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .reward__btn, .explore__btn, .contact__btn, .auth__btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Navbar active link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'Home.html';
  const navLinks = document.querySelectorAll('.nav__links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'Home.html')) {
      link.style.color = '#fff';
      link.style.fontWeight = '700';
      link.style.textDecoration = 'underline';
    }
  });
});

// Image lazy loading animation
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        img.style.opacity = '1';
      }, 100);
    });
  });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = element.getAttribute('data-suffix') || (element.textContent.includes('Million') ? 'M' : '');
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// Animate statistics on scroll
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat__number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
}

// Navbar dropdowns, mobile toggle and modal interactions
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Dropdown toggles
  document.querySelectorAll('.dropdown .dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.dropdown');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      parent.classList.toggle('open');
    });
  });

  // Modal helpers
  const siteModal = document.getElementById('siteModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.querySelector('.modal__close');

  function openModal(html) {
    if (!siteModal) return;
    modalContent.innerHTML = html;
    siteModal.classList.add('show');
    siteModal.setAttribute('aria-hidden', 'false');
  }
  // expose modal helpers for other modules (map, quick links)
  window.openModal = openModal;

  function closeModal() {
    if (!siteModal) return;
    siteModal.classList.remove('show');
    siteModal.setAttribute('aria-hidden', 'true');
  }
  window.closeModal = closeModal;

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (siteModal) siteModal.addEventListener('click', (e) => {
    if (e.target === siteModal) closeModal();
  });

  // Wire up nav feature buttons
  const extraBaggage = document.getElementById('extraBaggage');
  const carRental = document.getElementById('carRental');
  const hotelBooking = document.getElementById('hotelBooking');
  const modifyBooking = document.getElementById('modifyBooking');
  const cancelBooking = document.getElementById('cancelBooking');

  if (extraBaggage) {
    extraBaggage.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`<h3>Add Extra Baggage</h3><p>Select additional baggage options for your booking.</p><div style="margin-top:1rem"><label><input type=\"radio\" name=\"baggage\" value=\"10kg\" checked> +10kg - 30 DT</label><br><label><input type=\"radio\" name=\"baggage\" value=\"20kg\"> +20kg - 55 DT</label></div><div style="margin-top:1rem"><button class=\"btn btn--primary\" id=\"addBaggageBtn\">Add to Booking</button></div>`);
    });
  }

  if (carRental) {
    carRental.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`<h3>Car Rental</h3><p>Find trusted rental partners at your destination.</p><a href=\"#\" class=\"btn btn--primary\">Search Cars</a>`);
    });
  }

  if (hotelBooking) {
    hotelBooking.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`<h3>Hotel Booking</h3><p>Compare hotels and book with ease.</p><a href=\"Book.html\" class=\"btn btn--primary\">Search Hotels</a>`);
    });
  }

  if (modifyBooking) {
    modifyBooking.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`<h3>Modify Booking</h3><p>Enter your booking reference and email to retrieve and modify your reservation.</p><form><input type=\"text\" placeholder=\"Booking reference\" style=\"width:100%;padding:0.6rem;margin-top:0.6rem;border-radius:6px;border:1px solid #ddd;\"><button class=\"btn btn--primary\" style=\"margin-top:1rem;\">Retrieve</button></form>`);
    });
  }

  if (cancelBooking) {
    cancelBooking.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`<h3>Cancel Booking</h3><p>Provide your booking reference to start the cancellation process.</p><form><input type=\"text\" placeholder=\"Booking reference\" style=\"width:100%;padding:0.6rem;margin-top:0.6rem;border-radius:6px;border:1px solid #ddd;\"><button class=\"btn btn--primary\" style=\"margin-top:1rem;\">Lookup Booking</button></form>`);
    });
  }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});

// Initialize all animations on page load
window.addEventListener('load', () => {
  // Add loaded class to body for any CSS transitions
  document.body.classList.add('loaded');
  
  // Animate cards with stagger effect
  const cards = document.querySelectorAll('.popular__card, .client__card, .why__card, .offer__card, .testimonial__card, .travel__info__card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    }, index * 50);
  });
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section__container');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    revealObserver.observe(section);
  });

  // Initialize Leaflet map on Explore page
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    console.log('Initializing Leaflet map...', mapEl);
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // --- Country selection layer (GeoJSON) ---
    // We'll fetch a public GeoJSON of country boundaries and add it as an interactive layer.
    // Clicking a country selects it and shows a small booking control.
    const countryGeojsonUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

    const infoControl = L.control({ position: 'topright' });
    infoControl.onAdd = function () {
      this._div = L.DomUtil.create('div', 'map-info');
      this.update();
      return this._div;
    };
    infoControl.update = function (props) {
      if (!props) {
        this._div.innerHTML = '<div><strong>Click a country</strong><div style="font-size:12px;color:var(--text-muted);">or use the map to choose</div></div>';
      } else {
        const name = props.ADMIN || props.NAME || props.name || 'Selected Country';
        this._div.innerHTML = `<div><strong>${name}</strong><div style="margin-top:6px;"><a class="btn btn-sm btn-primary" href="Book.html?country=${encodeURIComponent(name)}">Book to ${name}</a></div></div>`;
      }
    };
    infoControl.addTo(map);

    let geojsonLayer = null;

    function highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({ weight: 2, color: '#2b7bd3', fillOpacity: 0.2 });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      geojsonLayer.resetStyle(e.target);
      infoControl.update();
    }

    function onCountryClick(e) {
      const layer = e.target;
      const props = layer.feature.properties || {};
      const name = props.ADMIN || props.NAME || props.name || 'Selected Country';
      infoControl.update(props);
      try {
        map.fitBounds(layer.getBounds(), { maxZoom: 6 });
      } catch (err) { /* ignore */ }
      // Add a marker at centroid for visual feedback
      const centroid = layer.getBounds().getCenter();
      if (marker) map.removeLayer(marker);
      marker = L.marker([centroid.lat, centroid.lng]).addTo(map).bindPopup(`${name}`).openPopup();
    }

    fetch(countryGeojsonUrl)
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Could not load country GeoJSON')))
      .then(geojson => {
        geojsonLayer = L.geoJSON(geojson, {
          style: { color: '#666', weight: 1, fillOpacity: 0 },
          onEachFeature: function (feature, layer) {
            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: onCountryClick
            });
          }
        }).addTo(map);

        console.log('Country layer added', geojsonLayer);
      })
      .catch(err => {
        console.warn('Could not load country boundaries:', err);
        showNotification('Country boundaries not available; click any point on the map to select a country.', 'info');
      });

    // Add small markers for popular destinations (visual cues + quick Book link)
    const popular = {
      'Kuala Lumpur': [3.1390, 101.6869],
      'Bangkok': [13.7563, 100.5018],
      'Seychelles': [-4.6796, 55.491974],
      'Barcelona': [41.3851, 2.1734],
      'Australia': [-25.2744, 133.7751],
      'Mumbai': [19.0760, 72.8777],
      'Doha': [25.2854, 51.5310],
      'London': [51.5074, -0.1278],
      'Mauritius': [-20.348404, 57.552152]
    };

    Object.keys(popular).forEach((name) => {
      const [lat, lng] = popular[name];
      const circle = L.circleMarker([lat, lng], { radius: 6, color: '#7a113a', fillColor: '#7a113a', fillOpacity: 0.9 }).addTo(map);
      circle.bindPopup(`<strong>${name}</strong><br><a href="Book.html?country=${encodeURIComponent(name)}" class="btn btn-sm btn-primary">Book Now</a>`);
    });

    let marker = null;

    function onMapClick(e) {
      const { lat, lng } = e.latlng;
      // Reverse geocode with Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
        .then(r => r.json())
        .then(data => {
          const country = (data && data.address && (data.address.country || data.address.county)) ? (data.address.country || data.address.county) : 'Selected location';
          const countryCode = (data && data.address && data.address.country_code) ? data.address.country_code.toUpperCase() : '';
          const html = `<h3>Book to ${country}</h3><p>Ready to fly to ${country}? Click below to start booking.</p><div style="margin-top:1rem;"><a href="Book.html?country=${encodeURIComponent(country)}&country_code=${countryCode}" class="btn btn--primary">Book to ${country}</a></div>`;
          // show modal with booking action
          if (typeof openModal === 'function') {
            openModal(html);
          } else {
            alert(`Book to ${country}`);
          }

          if (marker) map.removeLayer(marker);
          marker = L.marker([lat, lng]).addTo(map).bindPopup(`${country}`).openPopup();
        })
        .catch(err => {
          console.error(err);
          showNotification('Could not determine the selected country. Try clicking a different location.', 'info');
        });
    }

    map.on('click', onMapClick);

    const mapClear = document.getElementById('mapClear');
    if (mapClear) mapClear.addEventListener('click', () => { if (marker) { map.removeLayer(marker); marker = null; } });

    // Some browsers/animations may cause Leaflet to need a resize/refresh after render
    setTimeout(() => {
      try { map.invalidateSize(); console.log('Leaflet invalidateSize called'); } catch (e) { console.warn(e); }
    }, 300);

    window.addEventListener('load', () => {
      try { map.invalidateSize(); console.log('Leaflet invalidateSize on load'); } catch (e) { console.warn(e); }
    });
  }
});

// Manage page: simulate retrieving booking
document.addEventListener('DOMContentLoaded', () => {
  const manageForm = document.getElementById('manageForm');
  const manageResult = document.getElementById('manageResult');

  if (manageForm && manageResult) {
    manageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ref = document.getElementById('bookingRef').value;
      const email = document.getElementById('bookingEmail').value;
      manageResult.innerHTML = `<div class="alert alert-info">Searching for booking <strong>${ref}</strong> for <strong>${email}</strong>...</div>`;
      setTimeout(() => {
        manageResult.innerHTML = `<div class="alert alert-success">Booking <strong>${ref}</strong> found. <a href="#">Modify</a> or <a href="#">Cancel</a> the booking.</div>`;
      }, 900);
    });
  }

  // Extras page quick links
  const goBaggage = document.getElementById('goBaggage');
  const goCar = document.getElementById('goCar');
  if (goBaggage) {
    goBaggage.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof openModal === 'function') {
        openModal(`<h3>Add Extra Baggage</h3><p>Select additional baggage options (10kg / 20kg).</p><div style="margin-top:1rem"><label><input type=\"radio\" name=\"baggage\" value=\"10kg\"> +10kg - 30 DT</label><br><label><input type=\"radio\" name=\"baggage\" value=\"20kg\"> +20kg - 55 DT</label></div><div style=\"margin-top:1rem;\"><button class=\"btn btn--primary\" id=\"addBaggageBtn\">Add to Booking</button></div>`);
      }
    });
  }

  if (goCar) {
    goCar.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof openModal === 'function') {
        openModal(`<h3>Car Rental</h3><p>Find trusted car rental partners at your destination.</p><a href=\"#\" class=\"btn btn--primary\">Search Cars</a>`);
      }
    });
  }
});

