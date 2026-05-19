// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Typewriter effect
const roles = [
  'Software Developer',
  'Frontend Developer',
  'Problem Solver',
  'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1500); // pause before deleting
      return;
    }
    setTimeout(typeWriter, 80); // typing speed
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, 400); // pause before next word
      return;
    }
    setTimeout(typeWriter, 40); // deleting speed
  }
}

// Start typewriter when page loads
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
});

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

  // Navbar background on scroll
  const nav = document.getElementById('desktop-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(15, 15, 15, 0.98)';
    } else {
      nav.style.background = 'rgba(15, 15, 15, 0.9)';
    }
  });
});
