/**
 * Scroll Animations
 * Agrega efectos fade-in, slide-in y otros al hacer scroll
 */

document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar observer a elementos que deben animarse
    const animateElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-item, .analysis-preview'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Parallax effect en el header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxStrength = scrollPosition * 0.5;
            header.style.backgroundPosition = `0 ${parallaxStrength}px`;
        });
    }

    // Efecto de fade-in para secciones al entrar en viewport
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease-in-out';
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });

    // Contador de números en stats (si existen)
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

/**
 * Animar un contador de números
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 1000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Smooth scroll enhancement para navegación
 */
function smoothScrollNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

smoothScrollNavigation();

/**
 * Scroll progress indicator (opcional)
 */
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'scroll-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #3b82f6, #60a5fa);
        width: 0%;
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

createScrollIndicator();
