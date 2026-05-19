// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// ===== Scroll Reveal Animation =====
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// ===== Notification System =====
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '15px 25px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });

    notification.querySelector('button').style.cssText = 
        'background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;';

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// ===== Typing Effect for Hero =====
const heroTitle = document.querySelector('.hero-title');
const titles = ['Web Developer & Designer', 'Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after page loads
setTimeout(typeEffect, 1500);

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
