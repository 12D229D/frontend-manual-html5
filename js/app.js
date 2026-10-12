/**
 * Manual y Guía de Desarrollo Frontend - Script Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearch();
    initCodeCopy();
    initProgressTracking();
    initWizard();
    initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const savedTheme = localStorage.getItem('frontend_guide_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('frontend_guide_theme', newTheme);
            updateThemeUI(newTheme);
        });
    }

    function updateThemeUI(theme) {
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Modo Oscuro';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Modo Claro';
            }
        }
    }
}

/* ==========================================================================
   2. Navigation & SPA Routing via Hash
   ========================================================================== */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.doc-section');
    const currentCrumb = document.getElementById('current-crumb');

    function activateSection(targetId, updateHash = true) {
        if (!targetId) targetId = 'inicio';

        // Hide all sections, remove active class
        sections.forEach(sec => sec.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (targetNavItem) {
                targetNavItem.classList.add('active');
                if (currentCrumb) {
                    currentCrumb.textContent = targetNavItem.querySelector('.nav-text')?.textContent || targetId;
                }
            }

            if (updateHash) {
                history.pushState(null, null, `#${targetId}`);
            }

            // Track reading progress
            saveProgress(targetId);
        }
    }

    // Nav click handlers
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            activateSection(target);

            // Close mobile menu if open
            document.querySelector('.sidebar')?.classList.remove('mobile-open');
        });
    });

    // Handle back/forward & direct links
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '');
        activateSection(hash || 'inicio', false);
    });

    // Initial load check
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        activateSection(initialHash, false);
    } else {
        activateSection('inicio', false);
    }
}

/* ==========================================================================
   3. Real-time Search Filter
   ========================================================================== */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const navGroups = document.querySelectorAll('.nav-group');
    const navItems = document.querySelectorAll('.nav-item');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query);
            item.style.display = matches ? 'flex' : 'none';
        });

        // Hide empty nav groups
        navGroups.forEach(group => {
            const visibleChildren = group.querySelectorAll('.nav-item[style*="display: flex"], .nav-item:not([style*="display"])');
            const hasVisible = Array.from(visibleChildren).some(child => child.style.display !== 'none');
            group.style.display = hasVisible ? 'block' : 'none';
        });
    });
}

/* ==========================================================================
   4. Code Copy to Clipboard
   ========================================================================== */
function initCodeCopy() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const wrapper = btn.closest('.code-wrapper');
            const codeBlock = wrapper ? wrapper.querySelector('code') : null;

            if (codeBlock) {
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText);
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '✓ ¡Copiado!';
                    btn.style.backgroundColor = 'var(--accent-emerald)';
                    btn.style.color = '#fff';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    btn.textContent = '❌ Error';
                }
            }
        });
    });
}

/* ==========================================================================
   5. Reading Progress Tracking
   ========================================================================== */
const TOTAL_SECTIONS = 7;

function saveProgress(sectionId) {
    if (sectionId === 'inicio') return;

    let readSections = JSON.parse(localStorage.getItem('frontend_read_sections')) || [];
    if (!readSections.includes(sectionId)) {
        readSections.push(sectionId);
        localStorage.setItem('frontend_read_sections', JSON.stringify(readSections));
    }
    updateProgressUI(readSections);
}

function initProgressTracking() {
    const readSections = JSON.parse(localStorage.getItem('frontend_read_sections')) || [];
    updateProgressUI(readSections);

    // Manual completion buttons inside sections
    const completionBtns = document.querySelectorAll('.completion-btn');
    completionBtns.forEach(btn => {
        const sectionId = btn.getAttribute('data-section');
        if (readSections.includes(sectionId)) {
            setBtnCompleted(btn);
        }

        btn.addEventListener('click', () => {
            let currentRead = JSON.parse(localStorage.getItem('frontend_read_sections')) || [];
            if (!currentRead.includes(sectionId)) {
                currentRead.push(sectionId);
                localStorage.setItem('frontend_read_sections', JSON.stringify(currentRead));
                setBtnCompleted(btn);
                updateProgressUI(currentRead);
            }
        });
    });
}

function setBtnCompleted(btn) {
    btn.classList.add('completed');
    btn.innerHTML = '✓ Sección Leída y Completada';
}

function updateProgressUI(readSections) {
    const valElem = document.getElementById('progress-val');
    const fillElem = document.getElementById('progress-fill');

    if (valElem && fillElem) {
        const percent = Math.min(Math.round((readSections.length / TOTAL_SECTIONS) * 100), 100);
        valElem.textContent = `${percent}%`;
        fillElem.style.width = `${percent}%`;
    }
}

/* ==========================================================================
   6. Interactive Decision Wizard (Stack Frontend)
   ========================================================================== */
function initWizard() {
    const wizardState = {
        projectType: null,   // 'spa', 'ssr', 'static'
        devPriority: null,   // 'speed', 'performance', 'ecosystem'
        styling: null,       // 'tailwind', 'css-modules', 'component-lib'
        stateMgmt: null      // 'simple', 'complex'
    };

    let currentStep = 1;
    const totalSteps = 4;

    const stepDots = document.querySelectorAll('.step-dot');
    const wizardSteps = document.querySelectorAll('.wizard-step');

    // Selection handling
    document.querySelectorAll('.wizard-step .option-card').forEach(card => {
        card.addEventListener('click', () => {
            const step = card.closest('.wizard-step');
            const key = step.getAttribute('data-wizard-key');
            const val = card.getAttribute('data-value');

            // Toggle selection UI within step
            step.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            wizardState[key] = val;

            // Enable Next button
            const nextBtn = step.querySelector('.btn-next');
            if (nextBtn) nextBtn.disabled = false;
        });
    });

    // Navigation buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else if (currentStep === totalSteps) {
                calculateAndShowResult();
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    });

    const resetBtn = document.getElementById('reset-wizard-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            Object.keys(wizardState).forEach(k => wizardState[k] = null);
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            document.querySelectorAll('.btn-next').forEach(b => b.disabled = true);
            
            document.getElementById('wizard-result').style.display = 'none';
            goToStep(1);
        });
    }

    function goToStep(stepNum) {
        currentStep = stepNum;

        wizardSteps.forEach(s => s.classList.remove('active'));
        const activeStep = document.querySelector(`.wizard-step[data-step="${stepNum}"]`);
        if (activeStep) activeStep.classList.add('active');

        stepDots.forEach((dot, idx) => {
            const dStep = idx + 1;
            dot.classList.remove('active', 'completed');
            if (dStep === currentStep) {
                dot.classList.add('active');
            } else if (dStep < currentStep) {
                dot.classList.add('completed');
                dot.textContent = '✓';
            } else {
                dot.textContent = dStep;
            }
        });
    }

    function calculateAndShowResult() {
        const { projectType, devPriority, styling, stateMgmt } = wizardState;

        let stackName = "";
        let framework = "";
        let stylingSolution = "";
        let stateSolution = "";
        let rationale = "";

        // Decision Tree Logic
        if (projectType === 'ssr' || projectType === 'seo') {
            framework = "Next.js 14 / React (o Nuxt 3 para Vue)";
            rationale += "Tu proyecto requiere SSR/SSG para rendimiento óptimo y SEO. ";
        } else if (projectType === 'static') {
            framework = "Astro.js o Vite + Svelte / React SSG";
            rationale += "Para contenido estático súper rápido sin JS innecesario, Astro es imbatible. ";
        } else {
            framework = "Vite + React (o Vue 3)";
            rationale += "Para una Aplicación de Página Única (SPA) interactiva y rápida. ";
        }

        if (styling === 'tailwind') {
            stylingSolution = "Tailwind CSS + Headless UI / Shadcn UI";
            rationale += "Tailwind te dará la máxima velocidad de desarrollo sin salir de tus componentes. ";
        } else if (styling === 'css-modules') {
            stylingSolution = "CSS Modules / Vanilla Extract";
            rationale += "Mantiene el alcance de estilos aislado y libre de conflictos. ";
        } else {
            stylingSolution = "Componentes UI Prediseñados (MUI, Mantine o Ant Design)";
            rationale += "Ideal para dashboards y paneles administrativos rápidos. ";
        }

        if (stateMgmt === 'complex') {
            stateSolution = "Zustand / Redux Toolkit / TanStack Query (Server State)";
            rationale += "Separar el estado del servidor (TanStack Query) del estado global UI (Zustand) simplificará tu arquitectura.";
        } else {
            stateSolution = "Context API + React Hooks (o Pinia/Signals)";
            rationale += "Un manejo de estado liviano para evitar sobreingeniería.";
        }

        stackName = `${framework.split(' ')[0]} + ${stylingSolution.split(' ')[0]} + ${stateSolution.split(' ')[0]}`;

        // Populate Result UI
        document.getElementById('rec-stack-name').textContent = stackName;
        document.getElementById('rec-framework').textContent = framework;
        document.getElementById('rec-styling').textContent = stylingSolution;
        document.getElementById('rec-state').textContent = stateSolution;
        document.getElementById('rec-rationale').textContent = rationale;

        // Hide steps, show result card
        wizardSteps.forEach(s => s.classList.remove('active'));
        const resultCard = document.getElementById('wizard-result');
        if (resultCard) resultCard.style.display = 'block';
    }
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
}
