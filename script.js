// Neural network background animation
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    const nodes = 15;
    const nodeElements = [];

    // Create nodes
    for (let i = 0; i < nodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(node);
        nodeElements.push(node);
    }

    // Create connections
    for (let i = 0; i < nodes * 0.3; i++) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        const width = Math.random() * 200 + 100;
        connection.style.width = width + 'px';
        connection.style.left = Math.random() * (100 - width/window.innerWidth*100) + '%';
        connection.style.top = Math.random() * 100 + '%';
        connection.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        connection.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(connection);
    }
}

// Initialize neural network
createNeuralNetwork();

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Portfolio filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                item.classList.remove('hidden');
                item.classList.add('visible');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Initialize portfolio items as visible
portfolioItems.forEach(item => {
    item.classList.add('visible');
});

// Portfolio item hover effects
portfolioItems.forEach(item => {
    const image = item.querySelector('.portfolio-image');
    const content = item.querySelector('.portfolio-content');
    
    item.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
        content.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        content.style.transform = 'translateY(0)';
    });
});

// Observe elements for animation
document.querySelectorAll('.service-card, .skill-item, .process-step, .testimonial-card, .stat-item, .portfolio-item, .portfolio-cta').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const isPercentage = stat.textContent.includes('%');
        const isPlusSign = stat.textContent.includes('+');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (isPercentage ? '%' : '') + (isPlusSign ? '+' : '');
        }, 40);
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Active navigation highlighting
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add active navigation styles
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active,
    .mobile-menu a.active {
        color: #00d4ff !important;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for AI elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.ai-circle');
    
    parallax.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * speed * 0.1}deg)`;
    });
});

// Enhanced hover effects
document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.1)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #00d4ff';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    type();
}

// Initialize typing effect
setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText);
    }
}, 2000);

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('.services, .skills, .portfolio, .about, .process, .testimonials, .contact');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNav();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Alloo AI-Powered Website Loaded Successfully!');
    console.log('✨ All systems operational - Ready for digital transformation!');
    
    // Add entrance animations with delays
    const animatedElements = document.querySelectorAll('.service-card, .skill-item, .process-step');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('Minor error handled gracefully:', e.message);
});

// Smooth scrolling fallback for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = (target) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const ease = easeInOutCubic(progress / duration);
            window.scrollTo(0, startPosition + distance * ease);
            if (progress < duration) window.requestAnimationFrame(step);
        };

        window.requestAnimationFrame(step);
    };

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // Override smooth scroll for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollPolyfill(target);
            }
        });
    });
}
