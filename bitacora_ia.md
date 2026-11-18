# Bitácora de Inteligencia Artificial

Registro de consultas, decisiones de diseño y verificaciones realizadas durante la construcción del portfolio personal de **Braian Nahuel Basualdo** (**6.º año · Informática — Instituto Privado Mixto San Agustín**).

---

## Consulta 1 — Arquitectura del portfolio e integración del CV real

- **Fecha:** 2026-11-15
- **Herramienta utilizada:** Asistente de IA para desarrollo web
- **Objetivo:** Diseñar la estructura semántica en HTML5 integrando todos los datos del CV de Braian (formación, cuadro de honor, armado y mantenimiento de PC, entrenamiento físico, disponibilidad y contacto) junto con sus proyectos de robótica y competencias, diferenciándolo visual y estructuralmente de otros portfolios del curso.
- **Prompt completo:**
  > Armá un portfolio web estático en HTML5 semántico, CSS3 y JavaScript puro para Braian Nahuel Basualdo (6.º año de Informática, Instituto Privado Mixto San Agustín, Córdoba). Incluí los datos de su CV: armado y mantenimiento de PC, interés y experiencia práctica en entrenamiento físico, cuadro de honor desde 1.º año, idiomas y disponibilidad horaria. Como proyectos destacá autitos seguidores de línea, páginas web con HTML/CSS, robots básicos y el diseño de app en Tech Camp UCC, además de una sección dedicada de competencias con Copa Robótica 2026 (semifinales), Iron Bot Córdoba y Tech Camp UCC. No uses foto de perfil; diseñá una ficha técnica lateral en el Hero.
- **Parte utilizada:**
  - Estructura HTML5 semántica (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<article>`, `<footer>`).
  - Ficha técnica lateral en el Hero con monograma `BB` (sin foto) y layout tipo bento en la sección *Sobre mí*.
  - Sección dedicada *Competencias y Logros* en lugar de una sección de colaboradores.
  - Cuatro proyectos con filtros interactivos y evidencias visuales en `SVG` propio dentro de `assets/img/`.
- **Cambios realizados por mí:**
  - Verifiqué que los datos de contacto (`brabasualdo4@gmail.com` y `3517310050`), disponibilidad horaria y formación académica coincidieran exactamente con el CV original.
  - Aclaré explícitamente en *Entrenamiento físico* que aún no cuento con certificaciones oficiales de entrenador, manteniendo transparencia total.
- **¿Qué comprendí?**
  - Entendí cómo diferenciar la estructura de una página web usando un *Hero* con ficha técnica y una grilla *bento* sin perder semántica ni accesibilidad.
  - Comprendí la ventaja de usar gráficos `SVG` propios para explicar esquemas técnicos de robótica y diseño web sin depender de imágenes externas que puedan romperse.
- **¿Qué descarté y por qué?**
  - Descarté copiar el mismo diseño de tarjeta con foto y línea de tiempo vertical para que el portfolio tenga identidad propia y represente mejor el perfil técnico de robótica y hardware.

---

## Consulta 2 — Paleta azulada con amarillo tenue, interactividad y documentación

- **Fecha:** 2026-11-15
- **Herramienta utilizada:** Asistente de IA para desarrollo web
- **Objetivo:** Implementar una paleta azul profunda/cobalto combinada con amarillo tenue accesible, animaciones optimizadas en GPU, botones de copiado para correo y teléfono, y la carpeta `docs/` completa.
- **Prompt completo:**
  > Creá `css/estilos.css` usando variables en `:root` con tonos azulados (azul marino oscuro y azul cobalto) y amarillo tenue para etiquetas, destacados y detalles, cuidando el contraste WCAG. En `js/script.js` implementá barra de progreso al scrollear, aparición progresiva con `IntersectionObserver`, filtros por categoría, modal accesible con teclado y copiado al portapapeles para correo y teléfono. Generá además la documentación técnica y guía de GitHub Pages en `docs/`.
- **Parte utilizada:**
  - Tokens CSS en `:root` (`--blue-950` a `--blue-50`, `--yellow-300` a `--yellow-50`, `--yellow-text`).
  - Animaciones limitadas a `transform` y `opacity`, con soporte completo para `prefers-reduced-motion: reduce`.
  - Función reutilizable en `js/script.js` con atributos `data-copy-target` para copiar tanto el correo como el teléfono sin duplicar código.
- **Cambios realizados por mí:**
  - Ajusté el contraste del texto sobre amarillo tenue usando `--yellow-text: #713f12` para asegurar lectura cómoda en pantallas y celulares.
  - Revisé todas las rutas relativas en `index.html` y `docs/index.html` para garantizar compatibilidad directa con GitHub Pages.
- **¿Qué comprendí?**
  - Aprendí a centralizar colores y tipografías en variables CSS (`:root`) y a evitar duplicación de lógica en JavaScript usando atributos `data-*`.
  - Comprendí por qué animar solo `transform` y `opacity` mantiene la página fluida a 60 fps sin recalcular el layout al hacer scroll.
- **¿Qué descarté y por qué?**
  - Descarté usar amarillos neón o degradados genéricos violetas porque dificultaban la lectura y no combinaban con una estética técnica limpia.
