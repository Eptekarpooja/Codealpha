// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const themeToggle = document.getElementById('theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const skillCategories = document.querySelectorAll('.skill-category');
const skillItems = document.querySelectorAll('.skill-items');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const dynamicTextItems = document.querySelectorAll('.text-item');
const revealElements = document.querySelectorAll('.reveal');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 1000);
});

// Mobile Navigation
navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close navigation when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (document.body.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Save theme preference
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
});

// Load saved theme
if (localStorage.getItem('theme')) {
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
    const icon = themeToggle.querySelector('i');
    if (localStorage.getItem('theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Back to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dynamic Text Animation
let currentTextIndex = 0;
function animateDynamicText() {
    dynamicTextItems.forEach(item => item.classList.remove('active'));
    currentTextIndex = (currentTextIndex + 1) % dynamicTextItems.length;
    dynamicTextItems[currentTextIndex].classList.add('active');
}

setInterval(animateDynamicText, 3000);

// Skills Categories
skillCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories and items
        skillCategories.forEach(cat => cat.classList.remove('active'));
        skillItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Show corresponding skill items
        const categoryData = category.getAttribute('data-category');
        document.querySelector(`.skill-items.${categoryData}`).classList.add('active');
        
        // Animate skill bars
        const skillBars = document.querySelectorAll(`.skill-items.${categoryData} .skill-progress`);
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, 200);
        });
    });
});

// Initialize first category skills
document.addEventListener('DOMContentLoaded', () => {
    const initialSkillBars = document.querySelectorAll('.skill-items.frontend .skill-progress');
    initialSkillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 200);
    });
});

// Projects Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter projects
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.classList.remove('show'));
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    let isValid = true;
    
    if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    if (email === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    if (subject === '') {
        showError('subject', 'Please enter a subject');
        isValid = false;
    }
    
    if (message === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    }
    
    // If form is valid, submit it
    if (isValid) {
        // Show success message
        formStatus.textContent = 'Your message has been sent successfully!';
        formStatus.className = 'form-status success show';
        
        // Reset form
        contactForm.reset();
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = field.nextElementSibling;
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Reveal on Scroll
function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});