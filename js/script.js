// script.js
// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4ecdc4'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4ecdc4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Navegación móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cursor personalizado
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
            
            // Efecto en enlaces y botones
            const elements = document.querySelectorAll('a, button, .btn, .project-card');
            let isHovering = false;
            
            elements.forEach(element => {
                if (element.matches(':hover')) {
                    isHovering = true;
                }
            });
            
            if (isHovering) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(255, 107, 107, 0.5)';
            } else {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = '#4ecdc4';
            }
        });
    }

    // Animación de barras de habilidades
    const skillBars = document.querySelectorAll('.level-progress');
    const stats = document.querySelectorAll('.stat-number');
    
    // Función para verificar si un elemento está en viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animar elementos cuando están en viewport
    function animateOnScroll() {
        skillBars.forEach(bar => {
            if (isInViewport(bar)) {
                const level = bar.getAttribute('data-level');
                bar.style.width = `${level}%`;
            }
        });
        
        stats.forEach(stat => {
            if (isInViewport(stat) && !stat.classList.contains('animated')) {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 segundos
                const frameDuration = 1000 / 60; // 60 fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = target / totalFrames;
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    
                    stat.textContent = Math.round(count);
                }, frameDuration);
                
                stat.classList.add('animated');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(this);

        try {
            const response = await fetch('https://formspree.io/f/xovkvgay', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
                this.reset();
            } else {
                alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
            }
        } catch (error) {
            alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
            console.error(error);
        }

        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
    });
}


    // Efecto de escritura en el título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
            word.style.opacity = '0';
            setTimeout(() => {
                word.style.transition = 'opacity 1s ease';
                word.style.opacity = '1';
            }, 500 * (index + 1));
        });
    }
});