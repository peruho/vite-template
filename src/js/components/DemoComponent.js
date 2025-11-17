/**
 * Componente de ejemplo
 * Demuestra cómo crear componentes reutilizables
 */

import { $, on } from '../utils/dom.js';

export class DemoComponent {
  constructor(selector) {
    this.element = $(selector);
    this.clickCount = 0;
    this.init();
  }

  init() {
    if (!this.element) {
      console.warn('Elemento no encontrado');
      return;
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    on(this.element, 'click', () => this.handleClick());
  }

  handleClick() {
    this.clickCount++;
    this.updateUI();
    console.log(`Botón clickeado ${this.clickCount} veces`);
  }

  updateUI() {
    const messages = [
      '¡Hola! Este es un componente de ejemplo',
      '¡Genial! El componente está funcionando',
      '¡Excelente! Continúa explorando',
      'Este template incluye CSS modular y JS organizado',
      'Usa Vite para un desarrollo rápido con HMR',
    ];

    const message = messages[this.clickCount % messages.length];
    alert(message);
  }

  destroy() {
    // Limpieza de event listeners si es necesario
    this.element = null;
  }
}
