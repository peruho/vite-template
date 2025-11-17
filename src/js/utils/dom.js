/**
 * Utilidades para manipulación del DOM
 */

/**
 * Selecciona un elemento del DOM
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} parent - Elemento padre (opcional)
 * @returns {HTMLElement|null}
 */
export const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * Selecciona múltiples elementos del DOM
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} parent - Elemento padre (opcional)
 * @returns {NodeList}
 */
export const $$ = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};

/**
 * Crea un elemento del DOM
 * @param {string} tag - Etiqueta HTML
 * @param {Object} attributes - Atributos del elemento
 * @param {string|HTMLElement} content - Contenido del elemento
 * @returns {HTMLElement}
 */
export const createElement = (tag, attributes = {}, content = '') => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  }

  return element;
};

/**
 * Agrega un event listener a un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} event - Nombre del evento
 * @param {Function} handler - Función manejadora
 * @param {Object} options - Opciones del event listener
 */
export const on = (element, event, handler, options = {}) => {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.addEventListener(event, handler, options);
  }
};

/**
 * Remueve un event listener de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} event - Nombre del evento
 * @param {Function} handler - Función manejadora
 */
export const off = (element, event, handler) => {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.removeEventListener(event, handler);
  }
};

/**
 * Delegation de eventos
 * @param {HTMLElement|string} parent - Elemento padre o selector
 * @param {string} selector - Selector del elemento hijo
 * @param {string} event - Nombre del evento
 * @param {Function} handler - Función manejadora
 */
export const delegate = (parent, selector, event, handler) => {
  const parentEl = typeof parent === 'string' ? $(parent) : parent;

  if (parentEl) {
    parentEl.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target && parentEl.contains(target)) {
        handler.call(target, e);
      }
    });
  }
};

/**
 * Alterna una clase en un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} className - Nombre de la clase
 */
export const toggleClass = (element, className) => {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.toggle(className);
  }
};

/**
 * Agrega una clase a un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} className - Nombre de la clase
 */
export const addClass = (element, className) => {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.add(className);
  }
};

/**
 * Remueve una clase de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} className - Nombre de la clase
 */
export const removeClass = (element, className) => {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    el.classList.remove(className);
  }
};

/**
 * Verifica si un elemento tiene una clase
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} className - Nombre de la clase
 * @returns {boolean}
 */
export const hasClass = (element, className) => {
  const el = typeof element === 'string' ? $(element) : element;
  return el ? el.classList.contains(className) : false;
};
