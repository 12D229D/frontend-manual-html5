# Plan: Manual y Guía de Desarrollo Frontend HTML5

## 📌 Resumen
Aplicación web SPA interactiva desarrollada en HTML5 semántico, CSS3 moderno y JavaScript Vanilla ES6+. Servirá como manual técnico completo sobre desarrollo frontend moderno, abarcando HTML5, CSS Grid/Flexbox, JavaScript asíncrono, Frameworks (React, Vue, Svelte), Tooling (Vite, TypeScript), Performance (Web Vitals) y Testing (Vitest, Playwright).

## 🎯 Objetivos
- [x] Proveer un manual navegable por hash routing (#fundamentos, #frameworks, #tooling, etc.) sin recargas de página.
- [x] Ofrecer un **Asistente de Selección de Stack (Wizard)** interactivo de 4 pasos para determinar la mejor arquitectura frontend.
- [x] Incluir calculador dinámico de progreso de lectura guardado en localStorage.
- [x] Garantizar diseño responsivo adaptable con sidebar desplegable en móvil y modo claro/oscuro.

---

## 🏗️ Arquitectura

- **Patrón**: SPA modular sin dependencias con Stack Wizard interactivo.

`	ext
manual-frontend-html5/
├── index.html         # SPA con contenido completo y wizard interactivo
├── css/
│   └── styles.css     # Design tokens HSL, layout grid/flexbox, animación y temas
├── js/
│   └── app.js         # Router SPA, buscador, wizard, copiado de snippets y progreso
├── README.md          # Documentación general del proyecto
└── plan.md            # Bitácora y plan de desarrollo
`

---

## 🧠 Paradigma de Programación

- **Híbrido: Declarativo + Event-Driven**
- Basado en componentes declarativos (UI) y manejo reactivo de eventos para la interacción, el wizard y la navegación SPA.

---

## 🌐 Propósito de Visibilidad y Destino Remoto

- **Visibilidad**: Público (Open Source / Portafolio).
- **Plataforma Remota Asignada**: GitHub.
- **Plataforma de Despliegue CI/CD**: GitHub Pages / Cloudflare Pages.
- **Justificación**: Guía interactiva completa sobre desarrollo frontend moderno con selector de arquitectura en cliente sin backend; ideal para GitHub Pages.

---

## 📊 Estado Actual

🟢 **Completado** — Entregable funcional y verificado.
