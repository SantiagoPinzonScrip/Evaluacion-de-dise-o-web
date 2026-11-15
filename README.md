# Aroma Andino · Café de especialidad colombiano

Sitio web estático (HTML, CSS y JavaScript con módulos) desarrollado como proyecto final de la Sesión 11: buenas prácticas, accesibilidad y despliegue.

🔗 **Enlace público:** https://TU-USUARIO.github.io/aroma-andino/  <!-- reemplazar con tu enlace real -->

## Qué incluye
- Página de aterrizaje con secciones de orígenes, proceso y formulario.
- **Ficha de catador:** formulario validado cuyo resultado se muestra en una tarjeta y se guarda en `localStorage`.
- Diseño adaptable (probado desde 360 px), sin librerías externas ni fuentes remotas.

## Estructura
```
index.html
css/styles.css
js/datos.js     → datos y constantes
js/storage.js   → lectura/escritura en localStorage (con try/catch)
js/ui.js        → cambios en el DOM (solo textContent)
js/app.js       → conecta todo y valida el formulario
img/favicon.svg
robots.txt
```

## Accesibilidad y buenas prácticas aplicadas
- `lang="es"`, un solo `h1`, encabezados en orden y etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- Enlace «Saltar al contenido», foco visible en todos los elementos y uso completo con teclado.
- Cada campo con `label` conectado, errores explicados con texto, `aria-invalid` y `role="status"`.
- Contraste mínimo 4.5:1, tamaños en `rem`, `prefers-reduced-motion` respetado.
- SEO básico: `title`, `meta description`, Open Graph, `robots.txt`, favicon.
- JavaScript: un módulo por responsabilidad, `textContent` en lugar de `innerHTML`, errores de almacenamiento capturados.

## Cómo ejecutarlo en local
Los módulos de JavaScript necesitan un servidor. Usa la extensión **Live Server** de VS Code o ejecuta `python -m http.server` en la carpeta del proyecto y abre `http://localhost:8000`.

## Cómo publicarlo en GitHub Pages
1. Crea un repositorio público (sin README, ya existe uno).
2. `git init && git add . && git commit -m "Versión inicial" && git branch -M main`
3. `git remote add origin <url-del-repositorio> && git push -u origin main`
4. En **Settings → Pages**: Source «Deploy from a branch», rama `main`, carpeta `/ (root)`.
5. Espera 1–2 minutos y abre el enlace que aparece.
