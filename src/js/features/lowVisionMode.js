/**
 * Este arquivo gerencia a funcionalidade de ampliação de texto (modo de baixa visão),
 * aplicando zoom dinamicamente aos elementos de texto da página com base no tamanho computado.
 * Ele também é responsável por persistir o estado dessa funcionalidade nas configurações do usuário.
 */
import { saveConfig } from '../utils/storage.js';

const originalFontSizes = new Map();

const applyTextZoom = (enable, multiplier = 1.1) => { 
    const contentWrapper = document.getElementById('a11y-content-wrapper');
    if (!contentWrapper) return;

    const textElements = contentWrapper.querySelectorAll(
        'p, span, li, a, h1, h2, h3, h4, h5, h6, input, textarea, select, button, label, strong, em, b, i, small, big, sub, sup, pre, code, blockquote, figcaption, th, td, caption, dd, dt'
    );

    textElements.forEach(element => {
        if (element.closest('#a11y-panel') || element.closest('#a11y-icon') || element.closest('#a11y-reading-guide')) {
            return;
        }

        if (enable) {
            if (!originalFontSizes.has(element)) {
                const computedFontSize = window.getComputedStyle(element).fontSize;
                originalFontSizes.set(element, computedFontSize);
            }

            const currentPxSize = parseFloat(window.getComputedStyle(element).fontSize);
            const newSizePx = currentPxSize * multiplier;

            element.style.setProperty('font-size', `${newSizePx}px`, 'important');
            
            const currentLineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            if (!isNaN(currentLineHeight)) {
                const newLineHeightPx = currentLineHeight * multiplier;
                element.style.setProperty('line-height', `${newLineHeightPx}px`, 'important');
            } else {
                element.style.setProperty('line-height', `${1.5 * multiplier}em`, 'important');
            }

        } else {
            if (originalFontSizes.has(element)) {
                element.style.setProperty('font-size', originalFontSizes.get(element), 'important');
                element.style.removeProperty('line-height');
                originalFontSizes.delete(element);
            } else {
                element.style.removeProperty('font-size');
                element.style.removeProperty('line-height');
            }
        }
    });

    if (enable) {
        contentWrapper.classList.add('a11y-low-vision-active');
    } else {
        contentWrapper.classList.remove('a11y-low-vision-active');
    }
};

export const toggleLowVisionMode = (enable) => {
    const zoomMultiplier = 1.2;
    applyTextZoom(enable, zoomMultiplier);
};

export const handleLowVisionMode = async (currentConfig) => {
    const newState = !currentConfig.lowVisionModeActive;
    toggleLowVisionMode(newState);
    currentConfig.lowVisionModeActive = newState;
    await saveConfig(currentConfig);
};