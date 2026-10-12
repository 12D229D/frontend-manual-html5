# Manual y Guía de Desarrollo Frontend HTML5

Un manual técnico e interactivo de Desarrollo Frontend construido con **HTML5 semántico, CSS3 moderno y JavaScript vanilla (ES6+)**.

## 🌟 Características Principales

- **Navegación SPA de Alta Fidelidad**: Carga dinámica de secciones sin recargar la página, sincronizada con el hash de la URL (`#fundamentos`, `#frameworks`, etc.).
- **Modo Oscuro / Claro Persistente**: Toggle de tema con persistencia automática en `localStorage`.
- **Búsqueda en Tiempo Real**: Filtrado de navegación y secciones al escribir palabras clave.
- **Copia de Código**: Botón interactivo para copiar fragmentos de código con retroalimentación visual (`¡Copiado!`).
- **Seguimiento de Progreso**: Indicador porcentual dinámico que calcula las secciones leídas/completadas guardando el progreso en `localStorage`.
- **Asistente de Selección de Stack (Wizard)**: Un wizard de 4 pasos que calcula y recomienda el stack de tecnologías ideal para cualquier proyecto frontend según sus requerimientos (SPA vs SSR, Tailwind vs CSS Modules, Estado simple vs complejo).
- **Diseño Responsive**: Interfaz adaptativa con barra lateral fija en escritorio y menú tipo "drawer" con botón hamburguesa para dispositivos móviles.

## 📁 Estructura del Proyecto

```text
manual-frontend-html5/
├── index.html         # Estructura semántica HTML5 y contenido del manual
├── css/
│   └── styles.css     # Variables CSS (Temas), Layout Grid/Flexbox y Componentes
├── js/
│   └── app.js         # Lógica SPA, Búsqueda, Copiado, Wizard y Persistencia
└── README.md          # Documentación del proyecto
```

## 🚀 Cómo Visualizar o Ejecutar

No requiere servidores de compilación ni dependencias de `node_modules`.

1. Abre directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
2. O bien sírvelo localmente con cualquier servidor estático:
   ```bash
   # Opción con Python:
   python -m http.server 8080

   # Opción con npx:
   npx serve .
   ```

## 📚 Contenido Incluido

1. **Introducción y Resumen**: Objetivos y mapa de ruta del desarrollo frontend.
2. **Núcleo Web**: HTML5 semántico, accesibilidad (a11y), CSS Grid, Flexbox y JS asíncrono.
3. **Frameworks & SSR**: Comparativa React vs Vue vs Svelte, Server Components y Next.js.
4. **Estilos & Tailwind**: Utility-first CSS, CSS Modules y Variables nativas.
5. **Build Tools & Tooling**: Configuración con Vite, TypeScript, ESLint y Prettier.
6. **Rendimiento & Web Vitals**: Métricas LCP, INP, CLS y estrategias de Lazy Loading.
7. **Testing & E2E**: Pruebas unitarias con Vitest y E2E con Playwright.
8. **Asistente de Stack (Wizard)**: Herramienta interactiva para recomendación de arquitectura.
