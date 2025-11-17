# Vite Vanilla Template

Template moderno para proyectos web con Vite, CSS modular y JavaScript en módulos ES6+.

## Características

- **Vite** - Build tool ultra rápido con HMR (Hot Module Replacement)
- **CSS Modular** - Arquitectura CSS organizada con imports
- **JavaScript ES6+** - Módulos JavaScript modernos
- **Componentes reutilizables** - Estructura de componentes para facilitar el desarrollo
- **Utilidades** - Funciones helper para DOM, API, y más
- **Variables CSS** - Sistema de diseño con CSS custom properties
- **Responsive** - Diseño adaptable a diferentes dispositivos

## Estructura del Proyecto

```
.
├── public/                # Archivos estáticos (se copian tal cual a dist/)
│   └── vite.svg          # Favicon (puedes agregar robots.txt, etc.)
├── src/
│   ├── assets/           # Assets procesados por Vite (hash, tree-shaking)
│   │   ├── images/      # Imágenes (optimiza manualmente antes de agregar)
│   │   └── fonts/       # Fuentes personalizadas
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css      # Reset CSS
│   │   │   ├── variables.css  # Variables CSS (colores, espaciado, etc.)
│   │   │   ├── typography.css # Estilos de tipografía
│   │   │   └── utilities.css  # Clases utilitarias
│   │   ├── components/
│   │   │   ├── button.css     # Estilos de botones
│   │   │   └── card.css       # Estilos de tarjetas
│   │   ├── layout/
│   │   │   ├── header.css     # Estilos del header
│   │   │   ├── main.css       # Estilos del contenido principal
│   │   │   └── footer.css     # Estilos del footer
│   │   └── main.css           # Archivo principal que importa todos los estilos
│   └── js/
│       ├── components/
│       │   └── DemoComponent.js  # Componente de ejemplo
│       ├── utils/
│       │   ├── dom.js         # Utilidades para DOM
│       │   ├── helpers.js     # Funciones auxiliares
│       │   └── api.js         # Cliente HTTP para APIs
│       └── main.js            # Punto de entrada JavaScript
├── index.html             # HTML principal (debe estar en la raíz)
├── vite.config.js        # Configuración de Vite
├── package.json          # Dependencias y scripts
├── .gitignore           # Archivos ignorados por Git
└── .editorconfig        # Configuración del editor

```

### ¿Por qué esta estructura?

**`index.html` en la raíz:**
- Vite usa el HTML como punto de entrada, no como archivo público
- Debe estar en la raíz del proyecto

**`public/` vs `src/assets/`:**
- **`public/`**: Archivos que NO deben procesarse (robots.txt, favicon.ico, _redirects, etc.)
  - Se copian tal cual a `dist/` sin optimización
  - Se referencian con URL absolutas: `/vite.svg`
- **`src/assets/`**: Assets que Vite debe procesar (imágenes, fuentes importadas)
  - Vite genera hash (cache busting) y hace tree-shaking
  - **NO** comprime/optimiza imágenes (hazlo manualmente antes)
  - Se importan en JS/CSS: `import logo from './assets/logo.png'`

## Requisitos

- Node.js 18+
- npm, yarn o pnpm

## Instalación

1. Clona o descarga este template
2. Instala las dependencias:

```bash
npm install
```

## Scripts Disponibles

### Desarrollo

Inicia el servidor de desarrollo con HMR:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Build para Producción

Genera los archivos optimizados para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

### Preview

Previsualiza la build de producción localmente:

```bash
npm run preview
```

El servidor de preview estará disponible en `http://localhost:8080`

## Guía de Uso

### CSS

#### Variables CSS

Las variables están definidas en `src/css/base/variables.css`. Puedes personalizarlas:

```css
:root {
  --color-primary: #3b82f6;
  --space-md: 1.6rem;
  --font-size-base: 1.6rem;
  /* ... más variables */
}
```

#### Agregar Nuevos Componentes CSS

1. Crea un archivo en `src/css/components/`:

```css
/* src/css/components/modal.css */
.modal {
  /* estilos del modal */
}
```

2. Impórtalo en `src/css/main.css`:

```css
@import './components/modal.css';
```

### JavaScript

#### Utilidades de DOM

```javascript
import { $, $$, on, createElement } from './utils/dom.js';

// Seleccionar elemento
const button = $('#my-button');

// Agregar event listener
on(button, 'click', () => {
  console.log('Click!');
});

// Crear elemento
const div = createElement('div', { class: 'my-class' }, 'Contenido');
```

#### Funciones Helper

```javascript
import { debounce, formatCurrency, generateId } from './utils/helpers.js';

// Debounce
const handleSearch = debounce((query) => {
  console.log('Buscando:', query);
}, 300);

// Formatear moneda
const price = formatCurrency(1234.56, 'EUR'); // "1.234,56 €"

// Generar ID único
const uniqueId = generateId('user'); // "user-1234567890-abc123def"
```

#### Cliente API

```javascript
import { api } from './utils/api.js';

// GET request
const users = await api.get('/api/users');

// POST request
const newUser = await api.post('/api/users', {
  name: 'Juan',
  email: 'juan@example.com'
});

// Configurar token de autorización
api.setAuthToken('your-token-here');
```

#### Crear Componentes

```javascript
// src/js/components/MyComponent.js
import { $, on } from '../utils/dom.js';

export class MyComponent {
  constructor(selector) {
    this.element = $(selector);
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    on(this.element, 'click', () => this.handleClick());
  }

  handleClick() {
    console.log('Component clicked!');
  }
}
```

```javascript
// src/js/main.js
import { MyComponent } from './components/MyComponent.js';

new MyComponent('#my-element');
```

### Trabajar con Assets (Imágenes, Fuentes, etc.)

#### Imágenes en JavaScript

```javascript
// Importar imagen (Vite generará la URL optimizada)
import logo from './assets/images/logo.png';

// Usar en el DOM
const img = document.createElement('img');
img.src = logo; // URL optimizada con hash
```

#### Imágenes en CSS

```css
/* Vite procesará y optimizará estas imágenes */
.hero {
  background-image: url('../assets/images/hero.jpg');
}
```

#### Fuentes personalizadas

```css
/* src/css/base/typography.css */
@font-face {
  font-family: 'MiFuente';
  src: url('../assets/fonts/mifuente.woff2') format('woff2'),
       url('../assets/fonts/mifuente.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-primary: 'MiFuente', sans-serif;
}
```

#### Archivos estáticos en `public/`

Los archivos en `public/` se copian sin procesamiento:

```html
<!-- Se referencia con URL absoluta -->
<link rel="icon" href="/vite.svg">
<link rel="manifest" href="/manifest.json">
```

## Personalización

### Colores

Modifica las variables de color en `src/css/base/variables.css`:

```css
:root {
  --color-primary: #tu-color;
  --color-secondary: #tu-color;
}
```

### Tipografía

Cambia las fuentes en `src/css/base/variables.css`:

```css
:root {
  --font-primary: 'Tu Fuente', sans-serif;
}
```

### Favicon

Reemplaza `public/vite.svg` con tu propio favicon.

## Buenas Prácticas

1. **Modularidad**: Mantén los archivos CSS y JS pequeños y enfocados
2. **Nombres semánticos**: Usa nombres descriptivos para clases y funciones
3. **Comentarios**: Documenta código complejo
4. **Reutilización**: Crea componentes reutilizables
5. **Performance**: Usa debounce/throttle para eventos frecuentes
6. **Accesibilidad**: Incluye atributos ARIA y semántica HTML correcta

## Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [CSS Variables (MDN)](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [JavaScript Modules (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)

## Licencia

MIT
