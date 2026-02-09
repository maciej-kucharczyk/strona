// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Keep CSS variable --nav-safe in sync with actual navbar height
function updateNavSafe() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const navHeight = Math.ceil(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--nav-safe', navHeight + 'px');
}

window.addEventListener('resize', updateNavSafe);
document.addEventListener('DOMContentLoaded', () => {
    updateNavSafe();
});
if (navToggle) navToggle.addEventListener('click', () => setTimeout(updateNavSafe, 250));

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const nav = document.querySelector('.navbar');
            const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
            const extra = 8; // small gap under navbar
            const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight - extra;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        console.log('Contact form submitted:', formData);
        
        // Show success message
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        
        // Reset form
        contactForm.reset();
    });
}

// Reservation Form Handling
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('res-name').value,
            phone: document.getElementById('res-phone').value,
            email: document.getElementById('res-email').value,
            branch: document.getElementById('res-branch').value,
            date: document.getElementById('res-date').value,
            package: document.getElementById('res-package').value,
            message: document.getElementById('res-message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Reservation form submitted:', formData);
        
        // Show success message
        alert('Dziękujemy za rezerwację! Skontaktujemy się z Tobą w celu potwierdzenia.');
        
        // Reset form
        reservationForm.reset();
    });
}

// Branch Select Handler
const branchSelect = document.getElementById('branchSelect');

if (branchSelect) {
    branchSelect.addEventListener('change', function(e) {
        const selectedBranch = e.target.value;
        if (selectedBranch) {
            // Scroll to reservation section
            const reservationSection = document.getElementById('reservation');
            if (reservationSection) {
                const offsetTop = reservationSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Better scroll using actual navbar height
                const nav = document.querySelector('.navbar');
                const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
                const extra = 8;
                const targetY = reservationSection.getBoundingClientRect().top + window.pageYOffset - navHeight - extra;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
                
                // Pre-fill branch in reservation form
                const resBranchSelect = document.getElementById('res-branch');
                if (resBranchSelect) {
                    resBranchSelect.value = selectedBranch;
                }
            }
        }
    });
}

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.pricing-column, .condition-item, .service-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 9) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9) + ' ' + value.slice(9, 12);
            }
            e.target.value = value;
        }
    });
});

// Set minimum date for reservation date input
const resDateInput = document.getElementById('res-date');
if (resDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    resDateInput.setAttribute('min', minDate);
}

// Click to call functionality
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Analytics or tracking could go here
        console.log('Phone number clicked:', this.getAttribute('href'));
    });
});

// Click to email functionality
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Analytics or tracking could go here
        console.log('Email clicked:', this.getAttribute('href'));
    });
});
