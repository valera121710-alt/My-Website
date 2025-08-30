console.log("Сайт загружен!");
// Инициализация AOS анимаций
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Инициализация темы
    initTheme();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация кнопки "Наверх"
    initBackToTop();
    
    // Инициализация анимаций чисел
    initNumberAnimation();
    
    // Инициализация анимаций навыков
    initSkillsAnimation();
    
    // Обработчики кнопок
    document.getElementById('projectsBtn').addEventListener('click', function() {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('contactBtn').addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Инициализация темы
function initTheme() {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
    }
    
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }    
    }
}

// Инициализация навигации
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Инициализация плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация кнопки "Наверх"
function initBackToTop() {
    const backToTopButton = document.querySelector("#backToTop");
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализация анимации чисел
function initNumberAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function animateCounter(element) {
        const target = +element.getAttribute('data-target');
        const count = +element.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            element.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounter(element), 1);
        }
    }
}

// Инициализация анимации навыков
function initSkillsAnimation() {
    const skills = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skills.forEach(skill => {
        observer.observe(skill);
    });
}

// Валидация формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Простая валидация
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // Здесь можно добавить отправку формы
            alert('Сообщение отправлено! (В реальном проекте здесь будет отправка на сервер)');
            this.reset();
        }
    });
      }
