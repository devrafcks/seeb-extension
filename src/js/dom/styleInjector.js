
/**
 * Este arquivo contém funções para injetar e aplicar estilos e filtros
 * relacionados à acessibilidade no documento, como fontes, filtros SVG
 * para daltonismo e cores de destaque.
*/
import { colorFilters } from '../utils/constants.js';

export const injectGoogleFont = () => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
};

export const injectFilters = () => {
    const svgId = 'a11y-svg-filters';
    if (document.getElementById(svgId)) return;

    const svg = `
        <svg id="${svgId}" xmlns="http://www.w3.org/2000/svg" style="display:none">
            <defs>
                <filter id="protanopia-filter" color-interpolation-filters="sRGB">
                    <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/>
                </filter>
                <filter id="deuteranopia-filter" color-interpolation-filters="sRGB">
                    <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/>
                </filter>
                <filter id="tritanopia-filter" color-interpolation-filters="sRGB">
                    <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/>
                </filter>
            </defs>
        </svg>
    `;
    document.body.appendChild(document.createRange().createContextualFragment(svg));
};

export const applyDynamicColorFilter = (filter) => {
    const contentWrapper = document.getElementById('a11y-content-wrapper');
    if (contentWrapper) {
        const styleId = 'a11y-color-filter-dynamic-style';
        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        style.textContent = `
            #a11y-content-wrapper {
                filter: ${colorFilters[filter]} !important;
            }
        `;
    }
};

export const setHighlightColor = (color) => {
    document.documentElement.style.setProperty('--a11y-highlight-color', color);
};

