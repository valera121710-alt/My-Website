// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initPreloader();
    initTheme();
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initParticles();
    initTypedJS();
    initPWA();
    initVoiceAssistant();
    init3DSkills();
    initAnimations();
    initNotificationSystem();
    
    // Запуск анимаций после загрузки
    setTimeout(() => {
        animateElements();
    }, 1000);
});

// Preloader
function initPreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });
}

// Particles.js background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6366f1" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6366f1",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Typed.js animation
function initTypedJS() {
    const typed = new Typed('#typed', {
        strings: ['Валера', 'Фронтенд-разработчик', 'Креативный технолог'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// PWA functionality
function initPWA() {
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');
    const installContainer = document.getElementById('installContainer');
    
    // Скрываем кнопку по умолчанию
    installContainer.style.display = 'none';
    
    // Событие beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installContainer.style.display = 'block';
    });
    
    // Обработчик клика по кнопке установки
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            installContainer.style.display = 'none';
        }
        
        deferredPrompt = null;
    });
    
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Voice Assistant
function initVoiceAssistant() {
    const voiceBtn = document.getElementById('voiceAssistant');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    
    voiceBtn.addEventListener('click', () => {
        if (voiceBtn.classList.contains('listening')) {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            return;
        }
        
        try {
            recognition.start();
            voiceBtn.classList.add('listening');
        } catch (error) {
            showNotification('Ошибка голосового помощника', 'error');
        }
    });
    
    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        voiceBtn.classList.remove('listening');
        
        // Обработка голосовых команд
        if (command.includes('главная') || command.includes('домой')) {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            speakText('Перехожу на главную');
        } else if (command.includes('проекты')) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            speakText('Перехожу к проектам');
        } else if (command.includes('контакты') || command.includes('связаться')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            speakText('Перехожу к контактам');
        } else if (command.includes('темная тема') || command.includes('ночной режим')) {
            toggleTheme();
            speakText('Переключаю тему');
        } else {
            speakText('Не распознал команду. Попробуйте сказать: главная, проекты или контакты');
        }
    };
    
    recognition.onerror = function(event) {
        voiceBtn.classList.remove('listening');
        console.error('Speech recognition error', event.error);
    };
    
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ru-RU';
            window.speechSynthesis.speak(utterance);
        }
    }
}

// 3D Skills animation
function init3DSkills() {
    const skillItems = document.querySelectorAll('.skill-3d-item');
    
    skillItems.forEach(item => {
        const skill = item.getAttribute('data-skill');
        let progress = 0;
        
        switch(skill) {
            case 'html': progress = 95; break;
            case 'css': progress = 90; break;
            case 'js': progress = 85; break;
            default: progress = 80;
        }
        
        item.querySelector('.skill-3d-progress').style.setProperty('--progress', `${progress}%`);
        
        // Анимация прогресса
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.transform = 'rotateY(0) rotateX(0)';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Notification system
function initNotificationSystem() {
    window.showNotification = function(message, type = 'info') {
        const modal = document.getElementById('notificationModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        
        modalTitle.textContent = type === 'error' ? 'Ошибка' : 'Уведомление';
        modalMessage.textContent = message;
        
        modal.style.display = 'block';
        
        // Закрытие по клику на крестик
        document.querySelector('.close-modal').onclick = function() {
            modal.style.display = 'none';
        };
        
        // Закрытие по клику вне модального окна
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Автозакрытие для info уведомлений
        if (type === 'info') {
            setTimeout(() => {
                modal.style.display = 'none';
            }, 3000);
        }
    };
}

// Дополнительные анимации
function initAnimations() {
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Анимация элементов с задержкой
function animateElements() {
    const elements = document.querySelectorAll('.hero-content > *, .hero-image > *');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Остальные функции (initTheme, initNavigation, etc.) остаются с предыдущей версии
// но могут быть улучшены дополнительной функциональностью

// Добавляем обработчик для кнопки резюме
document.getElementById('resumeBtn').addEventListener('click', function() {
    // Здесь может быть скачивание PDF или переход на страницу с резюме
    showNotification('Резюме скоро будет доступно для скачивания!');
});

// Добавляем обработчик для формы подписки
document.querySelector('.newsletter button').addEventListener('click', function() {
    const email = document.querySelector('.newsletter input').value;
    if (validateEmail(email)) {
        showNotification('Спасибо за подписку! Обещаем присылать только интересные updates.');
        document.querySelector('.newsletter input').value = '';
    } else {
        showNotification('Пожалуйста, введите корректный email', 'error');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
