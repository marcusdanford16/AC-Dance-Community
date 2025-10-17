// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Smooth Scroll Navigation
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offset = element.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        
        // Update active link
        navLinks.forEach(function(l) {
            l.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('show');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
        
        // Scroll to section
        if (target === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === '#about') {
            smoothScroll('#coaches');
        } else if (target === '#contact') {
            smoothScroll('#social');
        } else {
            smoothScroll(target);
        }
    });
});

// CTA Button Scroll
ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('#class-info');
});

// Scroll Animation Observer
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.loading').forEach(function(el) {
    observer.observe(el);
});

// Active Nav on Scroll
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY + 100;
    const classInfo = document.querySelector('#class-info');
    const social = document.querySelector('#social');
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    
    if (scrollPos < classInfo.offsetTop) {
        document.querySelector('a[href="#home"]').classList.add('active');
    } else if (scrollPos < social.offsetTop) {
        document.querySelector('a[href="#about"]').classList.add('active');
    } else {
        document.querySelector('a[href="#contact"]').classList.add('active');
    }
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    dots.forEach(function(dot) {
        dot.classList.remove('active');
    });
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', function() {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', function() {
    showSlide(currentSlide + 1);
});

dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
        showSlide(index);
    });
});

// Auto-advance slides
setInterval(function() {
    showSlide(currentSlide + 1);
}, 5000);

// Form Submission
const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        style: document.getElementById('danceStyle').value,
        experience: document.getElementById('experience').value,
        date: document.getElementById('classDate').value,
        preReg: document.getElementById('preRegistration').checked,
        notes: document.getElementById('additionalNotes').value
    };
    
    alert('Thank you for registering! We will contact you within 24 hours.\n\nName: ' + formData.name + '\nEmail: ' + formData.email);
    form.reset();
});