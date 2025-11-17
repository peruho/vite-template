/**
 * Archivo principal de JavaScript
 * Punto de entrada de la aplicación
 */

// Importar estilos (Vite los procesará)
import '../css/main.css';

// Importar utilidades
import { $, on } from './utils/dom.js';
import { debounce } from './utils/helpers.js';

// Importar componentes
import { DemoComponent } from './components/DemoComponent.js';

/**
 * Clase principal de la aplicación
 */
class App {
  constructor() {
    this.init();
  }

  init() {
    console.log('App inicializada');
    this.setupComponents();
    this.setupEventListeners();
  }

  setupComponents() {
    // Inicializar el componente de demostración
    const demoBtn = $('#demo-btn');
    if (demoBtn) {
      new DemoComponent('#demo-btn');
    }
  }

  setupEventListeners() {
    // Ejemplo: Listener para el resize de ventana con debounce
    const handleResize = debounce(() => {
      console.log('Ventana redimensionada:', {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 300);

    window.addEventListener('resize', handleResize);

    // Ejemplo: Scroll listener
    window.addEventListener('scroll', () => {
      const header = $('.header');
      if (header) {
        if (window.scrollY > 100) {
          header.style.boxShadow = 'var(--shadow-md)';
        } else {
          header.style.boxShadow = 'var(--shadow-sm)';
        }
      }
    });

    // Log cuando el DOM está completamente cargado
    console.log('Event listeners configurados');
  }
}

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}

// Hot Module Replacement (HMR) para desarrollo
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR: Módulo actualizado');
  });
}
