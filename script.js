/* ==============================
   MENU MOBILE
================================= */

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('open');

        const icon = menuIcon.querySelector('i');

        if (navbar.classList.contains('open')) {
            icon.classList.remove('ri-menu-4-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-4-line');
        }
    });
}

/* ==============================
   HEADER COM EFEITO AO ROLAR
================================= */

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

/* ==============================
   ANIMAÇÕES AO ROLAR
================================= */

const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

revealOnScroll();

/* ==============================
   LINK ATIVO NO MENU
================================= */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

function atualizarLinkAtivo() {
    let currentSection = '';

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 220;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    /*
       Correção especial:
       Se chegou no final da página, força o menu para Contato.
    */
    if (scrollPosition + windowHeight >= documentHeight - 10) {
        currentSection = 'contacto';
    }

    navLinks.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', atualizarLinkAtivo);
window.addEventListener('load', atualizarLinkAtivo);

atualizarLinkAtivo();

/* ==============================
   FECHAR MENU AO CLICAR NUM LINK
================================= */

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navbar) {
            navbar.classList.remove('open');
        }

        if (menuIcon) {
            const icon = menuIcon.querySelector('i');

            if (icon) {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-4-line');
            }
        }
    });
});

/* ==============================
   EFEITO SUAVE DE PARALLAX NA FOTO
================================= */

const photoFrame = document.querySelector('.photo-frame');

if (photoFrame) {
    document.addEventListener('mousemove', (event) => {
        const x = (window.innerWidth / 2 - event.clientX) / 45;
        const y = (window.innerHeight / 2 - event.clientY) / 45;

        photoFrame.style.transform = `translateY(-8px) rotateY(${x}deg) rotateX(${y}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        photoFrame.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
    });
}

/* ==============================
   PEQUENO EFEITO DE DIGITAÇÃO
================================= */

const titleElement = document.querySelector('.home-content h2');

if (titleElement) {
    const originalText = titleElement.textContent.trim();
    titleElement.textContent = '';

    let index = 0;

    function typeText() {
        if (index < originalText.length) {
            titleElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, 45);
        }
    }

    window.addEventListener('load', typeText);
}

/* ==============================
   CARROSSEL FUTURISTA DE PROJETOS
================================= */

/*
   Estrutura nova dos projetos:
   - Cada projeto está em .project-feature-info
   - O projeto visível recebe a classe .active
   - Os botões inferiores usam .project-thumb
   - As setas usam #project-prev e #project-next
*/

const projectInfos = document.querySelectorAll('.project-feature-info');
const projectThumbs = document.querySelectorAll('.project-thumb');
const projectPrev = document.querySelector('#project-prev');
const projectNext = document.querySelector('#project-next');

let currentProject = 0;
const totalProjects = projectInfos.length;

function showProject(index) {
    if (!totalProjects) return;

    if (index < 0) {
        currentProject = totalProjects - 1;
    } else if (index >= totalProjects) {
        currentProject = 0;
    } else {
        currentProject = index;
    }

    projectInfos.forEach((info) => {
        info.classList.remove('active');
    });

    projectThumbs.forEach((thumb) => {
        thumb.classList.remove('active');
    });

    const activeInfo = document.querySelector(`.project-feature-info[data-project="${currentProject}"]`);
    const activeThumb = document.querySelector(`.project-thumb[data-project="${currentProject}"]`);

    if (activeInfo) {
        activeInfo.classList.add('active');
    }

    if (activeThumb) {
        activeThumb.classList.add('active');
    }
}

if (projectPrev && totalProjects) {
    projectPrev.addEventListener('click', () => {
        showProject(currentProject - 1);
    });
}

if (projectNext && totalProjects) {
    projectNext.addEventListener('click', () => {
        showProject(currentProject + 1);
    });
}

projectThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        const projectIndex = Number(thumb.getAttribute('data-project'));

        if (!Number.isNaN(projectIndex)) {
            showProject(projectIndex);
        }
    });
});

showProject(0);

/* ==============================
   BARRAS DE PROGRESSO DAS HABILIDADES
================================= */

const skillProgressItems = document.querySelectorAll('.skill-progress');

function animateSkillProgress(skill) {
    const percent = Number(skill.getAttribute('data-percent'));
    const fill = skill.querySelector('.skill-progress-fill');
    const percentText = skill.querySelector('.skill-percent');

    if (!fill || !percentText || Number.isNaN(percent)) return;

    fill.style.width = `${percent}%`;

    let currentValue = 0;
    const animationSpeed = 18;

    const counter = setInterval(() => {
        if (currentValue >= percent) {
            currentValue = percent;
            percentText.textContent = `${currentValue}%`;
            clearInterval(counter);
        } else {
            currentValue++;
            percentText.textContent = `${currentValue}%`;
        }
    }, animationSpeed);
}

function startSkillsAnimation() {
    const skillsSection = document.querySelector('#habilidades');

    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 150) {
        skillProgressItems.forEach((skill) => {
            if (!skill.classList.contains('animated')) {
                skill.classList.add('animated');
                animateSkillProgress(skill);
            }
        });
    }
}

window.addEventListener('scroll', startSkillsAnimation);
window.addEventListener('load', startSkillsAnimation);

startSkillsAnimation();

/* ==============================
   TOGGLE SQL CONCEITO
================================= */

const toggleSqlConcept = document.querySelector('#toggle-sql-concept');
const sqlViews = document.querySelectorAll('.sql-view');

let showingSqlResult = false;

if (toggleSqlConcept && sqlViews.length) {
    toggleSqlConcept.addEventListener('click', (event) => {
        event.preventDefault();

        showingSqlResult = !showingSqlResult;

        sqlViews.forEach((view) => {
            view.classList.remove('active');
        });

        const targetView = showingSqlResult
            ? document.querySelector('[data-sql-view="result"]')
            : document.querySelector('[data-sql-view="query"]');

        if (targetView) {
            targetView.classList.add('active');
        }

        if (showingSqlResult) {
            toggleSqlConcept.innerHTML = 'Ver consulta <i class="ri-code-s-slash-line"></i>';
        } else {
            toggleSqlConcept.innerHTML = 'Ver resultado <i class="ri-terminal-box-line"></i>';
        }
    });
}

// ==============================
// SLIDES AUTOMÁTICOS - PROJETO 4
// ==============================

const projeto4Slides = document.querySelectorAll('.projeto4-slide');

if (projeto4Slides.length > 0) {
    let projeto4Index = 0;

    setInterval(() => {
        projeto4Slides[projeto4Index].classList.remove('active');

        projeto4Index = (projeto4Index + 1) % projeto4Slides.length;

        projeto4Slides[projeto4Index].classList.add('active');
    }, 3000);
}

// ==============================
// MODAL DE FOTOS - PROJETO 4
// ==============================

const abrirFotosProjeto4 = document.getElementById('abrir-fotos-projeto4');
const modalFotosProjeto4 = document.getElementById('modal-fotos-projeto4');
const fecharModalFotos = document.getElementById('fechar-modal-fotos');
const modalFotoPrincipal = document.getElementById('modal-foto-principal');
const modalFotoPrev = document.getElementById('modal-foto-prev');
const modalFotoNext = document.getElementById('modal-foto-next');
const modalFotoContador = document.getElementById('modal-foto-contador');

const fotosProjeto4 = [
    'projeto4/foto1.png',
    'projeto4/foto2.png',
    'projeto4/foto3.png',
    'projeto4/foto4.png'
];

let fotoProjeto4Atual = 0;

function mostrarFotoProjeto4(index) {
    fotoProjeto4Atual = index;

    if (modalFotoPrincipal) {
        modalFotoPrincipal.src = fotosProjeto4[fotoProjeto4Atual];
    }

    if (modalFotoContador) {
        modalFotoContador.textContent = `${fotoProjeto4Atual + 1} / ${fotosProjeto4.length}`;
    }
}

function abrirModalFotosProjeto4() {
    if (!modalFotosProjeto4) return;

    mostrarFotoProjeto4(0);
    modalFotosProjeto4.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModalFotosProjeto4() {
    if (!modalFotosProjeto4) return;

    modalFotosProjeto4.classList.remove('active');
    document.body.style.overflow = '';
}

if (abrirFotosProjeto4) {
    abrirFotosProjeto4.addEventListener('click', function(event) {
        event.preventDefault();
        abrirModalFotosProjeto4();
    });
}

if (fecharModalFotos) {
    fecharModalFotos.addEventListener('click', fecharModalFotosProjeto4);
}

if (modalFotoNext) {
    modalFotoNext.addEventListener('click', function() {
        const proximaFoto = (fotoProjeto4Atual + 1) % fotosProjeto4.length;
        mostrarFotoProjeto4(proximaFoto);
    });
}

if (modalFotoPrev) {
    modalFotoPrev.addEventListener('click', function() {
        const fotoAnterior = (fotoProjeto4Atual - 1 + fotosProjeto4.length) % fotosProjeto4.length;
        mostrarFotoProjeto4(fotoAnterior);
    });
}

if (modalFotosProjeto4) {
    modalFotosProjeto4.addEventListener('click', function(event) {
        if (event.target === modalFotosProjeto4) {
            fecharModalFotosProjeto4();
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (!modalFotosProjeto4 || !modalFotosProjeto4.classList.contains('active')) {
        return;
    }

    if (event.key === 'Escape') {
        fecharModalFotosProjeto4();
    }

    if (event.key === 'ArrowRight') {
        const proximaFoto = (fotoProjeto4Atual + 1) % fotosProjeto4.length;
        mostrarFotoProjeto4(proximaFoto);
    }

    if (event.key === 'ArrowLeft') {
        const fotoAnterior = (fotoProjeto4Atual - 1 + fotosProjeto4.length) % fotosProjeto4.length;
        mostrarFotoProjeto4(fotoAnterior);
    }
});

if (modalFotosProjeto4) {
    modalFotosProjeto4.addEventListener('click', function(event) {
        if (event.target === modalFotosProjeto4) {
            fecharModalFotosProjeto4();
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (!modalFotosProjeto4 || !modalFotosProjeto4.classList.contains('active')) {
        return;
    }

    if (event.key === 'Escape') {
        fecharModalFotosProjeto4();
    }

    if (event.key === 'ArrowRight') {
        const proximaFoto = (fotoProjeto4Atual + 1) % fotosProjeto4.length;
        mostrarFotoProjeto4(proximaFoto);
    }

});

// ==============================
// SLIDES AUTOMÁTICOS - PROJETO 5
// ==============================

const projeto5Slides = document.querySelectorAll('.projeto5-slide');

if (projeto5Slides.length > 0) {
    let projeto5Index = 0;

    setInterval(() => {
        projeto5Slides[projeto5Index].classList.remove('active');

        projeto5Index = (projeto5Index + 1) % projeto5Slides.length;

        projeto5Slides[projeto5Index].classList.add('active');
    }, 3000);
}

// ==============================
// MODAL DE FOTOS - PROJETO 5
// ==============================

const abrirFotosProjeto5 = document.getElementById('abrir-fotos-projeto5');
const modalFotosProjeto5 = document.getElementById('modal-fotos-projeto5');
const fecharModalFotosProjeto5 = document.getElementById('fechar-modal-fotos-projeto5');
const modalFotoPrincipalProjeto5 = document.getElementById('modal-foto-principal-projeto5');
const modalFotoPrevProjeto5 = document.getElementById('modal-foto-prev-projeto5');
const modalFotoNextProjeto5 = document.getElementById('modal-foto-next-projeto5');
const modalFotoContadorProjeto5 = document.getElementById('modal-foto-contador-projeto5');

const fotosProjeto5 = [
    'projeto5/foto1.png',
    'projeto5/foto2.png',
    'projeto5/foto3.png',
    'projeto5/foto4.png'
];

let fotoProjeto5Atual = 0;

function mostrarFotoProjeto5(index) {
    fotoProjeto5Atual = index;

    if (modalFotoPrincipalProjeto5) {
        modalFotoPrincipalProjeto5.src = fotosProjeto5[fotoProjeto5Atual];
    }

    if (modalFotoContadorProjeto5) {
        modalFotoContadorProjeto5.textContent = `${fotoProjeto5Atual + 1} / ${fotosProjeto5.length}`;
    }
}

function abrirModalFotosProjeto5() {
    if (!modalFotosProjeto5) return;

    mostrarFotoProjeto5(0);
    modalFotosProjeto5.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModalFotosProjeto5Func() {
    if (!modalFotosProjeto5) return;

    modalFotosProjeto5.classList.remove('active');
    document.body.style.overflow = '';
}

if (abrirFotosProjeto5) {
    abrirFotosProjeto5.addEventListener('click', function(event) {
        event.preventDefault();
        abrirModalFotosProjeto5();
    });
}

if (fecharModalFotosProjeto5) {
    fecharModalFotosProjeto5.addEventListener('click', fecharModalFotosProjeto5Func);
}

if (modalFotoNextProjeto5) {
    modalFotoNextProjeto5.addEventListener('click', function() {
        const proximaFoto = (fotoProjeto5Atual + 1) % fotosProjeto5.length;
        mostrarFotoProjeto5(proximaFoto);
    });
}

if (modalFotoPrevProjeto5) {
    modalFotoPrevProjeto5.addEventListener('click', function() {
        const fotoAnterior = (fotoProjeto5Atual - 1 + fotosProjeto5.length) % fotosProjeto5.length;
        mostrarFotoProjeto5(fotoAnterior);
    });
}

if (modalFotosProjeto5) {
    modalFotosProjeto5.addEventListener('click', function(event) {
        if (event.target === modalFotosProjeto5) {
            fecharModalFotosProjeto5Func();
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (!modalFotosProjeto5 || !modalFotosProjeto5.classList.contains('active')) {
        return;
    }

    if (event.key === 'Escape') {
        fecharModalFotosProjeto5Func();
    }

    if (event.key === 'ArrowRight') {
        const proximaFoto = (fotoProjeto5Atual + 1) % fotosProjeto5.length;
        mostrarFotoProjeto5(proximaFoto);
    }

    if (event.key === 'ArrowLeft') {
        const fotoAnterior = (fotoProjeto5Atual - 1 + fotosProjeto5.length) % fotosProjeto5.length;
        mostrarFotoProjeto5(fotoAnterior);
    }
});


