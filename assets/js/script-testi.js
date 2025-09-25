const testimonials = [
  {
    id: 1,
    quote:'“Con una atención rápida y profesional, dejaron mi auto como nuevo.”',
    name: 'ELEONOR CORREA',
    title: 'Directora',
    avatar:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces',
    rating: 5
  },
  {
    id: 2,
    quote:'“Excelente servicio, confiables y siempre cumplen con lo prometido.”',
    name: 'ALEXANDER LAURENT',
    title: 'Herreria',
    avatar:'https://images.unsplash.com/photo-1655547230490-74254d63b2ad?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5
  },
  {
    id: 3,
    quote:'“El motor de arranque no respondía, lo revisaron y lo dejaron como nuevo.”',
    name: 'ROGELIO MARTINEZ',
    title: 'Apicultor',
    avatar:'https://plus.unsplash.com/premium_photo-1681506302515-1c3d9161c29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5
  },
  {
    id: 4,
    quote:'“Mecánicos de confianza, resolvieron el problema en una sola visita.”',
    name: 'PABLO SILVEIRA',
    title: 'Feriante',
    avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    rating: 4
  },
  {
    id: 5,
    quote:'"Realizaron todo la iluninacion desde cero de mi camión, impecable quedó!"',
    name: 'CARLOS LOPEZ',
    title: 'Seguridad',
    avatar:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
    rating: 5
  },
];

// DOM Elements
const testimonialsContainer = document.getElementById('testimonialsContainer');
const navDots = document.getElementById('navDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Configuration
let currentIndex = 0;
let autoScrollInterval;
const scrollSpeed = 400;
const autoScrollDelay = 10000; // 10 seconds

// Initialize
function initTestimonials() {
  renderTestimonials();
  renderNavigationDots();
  setActiveDot();
  startAutoScroll();
  setupEventListeners();
}

// Render Testimonials
function renderTestimonials() {
  testimonialsContainer.innerHTML = '';

  testimonials.forEach((testimonial, index) => {
    const testimonialElement = document.createElement('div');
    testimonialElement.className = `testimonial-card ${
      index === currentIndex ? 'active' : ''
    }`;
    testimonialElement.dataset.index = index;

    // Generate star rating
    const stars = Array(5)
      .fill(0)
      .map(
        (_, i) =>
          `<i class="star ${
            i < testimonial.rating ? 'filled fas fa-star' : 'far fa-star'
          }"></i>`
      )
      .join('');

 testimonialElement.innerHTML = `
  <p class="testimonial-content">${testimonial.quote}</p>
  <div class="client-info">
    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="client-avatar">
    <div class="client-details">
      <h2 class="section-title">${testimonial.name}</h2>
      <p>${testimonial.title}</p>
      <div class="rating">${stars}</div>
    </div>
  </div>
`;

            

    testimonialsContainer.appendChild(testimonialElement);
  });

  // Center the active card
  scrollToCurrentCard();
}

// Render Navigation Dots
function renderNavigationDots() {
  navDots.innerHTML = '';

  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
      navigateToTestimonial(index);
    });
    navDots.appendChild(dot);
  });
}

// Set Active Dot
function setActiveDot() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    if (index === currentIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// Navigation Functions
function navigateToTestimonial(index) {
  currentIndex = index;
  renderTestimonials();
  setActiveDot();
  resetAutoScroll();
}

function navigatePrev() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonials();
  setActiveDot();
  resetAutoScroll();
}

function navigateNext() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  renderTestimonials();
  setActiveDot();
  resetAutoScroll();
}

// Smooth scroll to current card
function scrollToCurrentCard() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards[currentIndex]) {
    const card = cards[currentIndex];
    const container = testimonialsContainer;
    const cardWidth = card.offsetWidth;
    const scrollPosition =
      card.offsetLeft - container.offsetWidth / 2 + cardWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }
}

// Auto-scroll functionality
function startAutoScroll() {
  autoScrollInterval = setInterval(navigateNext, autoScrollDelay);
}

function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

// Event Listeners
function setupEventListeners() {
  prevBtn.addEventListener('click', navigatePrev);
  nextBtn.addEventListener('click', navigateNext);

  // Pause auto-scroll on hover
  testimonialsContainer.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });

  testimonialsContainer.addEventListener('mouseleave', () => {
    resetAutoScroll();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      navigateNext();
    }
  });

  // Swipe for touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  testimonialsContainer.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  testimonialsContainer.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      navigateNext();
    } else if (touchEndX > touchStartX + threshold) {
      navigatePrev();
    }
  }
}

// Initialize the component
document.addEventListener('DOMContentLoaded', initTestimonials);