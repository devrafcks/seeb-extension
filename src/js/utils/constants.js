/**
 * Este arquivo define as configurações padrão e os valores de referência
 * para as funcionalidades de acessibilidade da extensão. Inclui:
 * - `defaultConfig`: Estado inicial das preferências do usuário.
 * - `colorFilters`: Mapeamento de modos de daltonismo para filtros CSS.
 * - `singleZoomValue`: Valores para o modo de baixa visão/ampliação de texto.
 * - `spacingValues`: Níveis de espaçamento entre letras e palavras.
 */

export const defaultConfig = {
    colorFilter: 'normal',
    contrastMode: 'normal',
    lowVisionModeActive: false,
    readingGuideActive: false,
    readingGuideHeight: 30,
    highlightLineActive: false,
    highlightColor: '#ADD8E6',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    panelOpen: false
};

export const colorFilters = {
    normal: 'none',
    protanopia: 'url(#protanopia-filter)',
    deuteranopia: 'url(#deuteranopia-filter)',
    tritanopia: 'url(#tritanopia-filter)',
    achromatopsia: 'grayscale(100%)'
};

export const singleZoomValue = { fontSize: '1.15em', lineHeight: '1.8' };

export const spacingValues = {
    letter: {
        normal: '0',
        medium: '0.08em', 
        wide: '0.15em'    
    },
    word: {
        normal: '0',
        medium: '0.2em',  
        wide: '0.4em'     
    }
};