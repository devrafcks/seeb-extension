/**
 * Este arquivo gerencia a aplicação de espaçamento entre letras e palavras
 * na página web. Ele contém funções para aplicar as classes CSS correspondentes
 * e para lidar com a atualização e o salvamento das configurações do usuário.
 */
import { spacingValues } from '../utils/constants.js';
import { saveConfig } from '../utils/storage.js';

const updateSpacingClasses = (element, type, value) => {
    const allSpacingClasses = Object.keys(spacingValues[type])
        .map(key => `a11y-${type}-spacing-${key}`);

    element.classList.remove(...allSpacingClasses);

    if (value !== 'normal') {
        element.classList.add(`a11y-${type}-spacing-${value}`);
    }
};

export const applySpacing = (type, value) => {
    const contentWrapper = document.getElementById('a11y-content-wrapper');
    if (!contentWrapper) {
        console.warn('Elemento #a11y-content-wrapper não encontrado para aplicar espaçamento.');
        return;
    }

    updateSpacingClasses(contentWrapper, type, value);
};

export const handleSpacing = async (type, value, currentConfig) => {
    applySpacing(type, value);

    if (type === 'letter') {
        currentConfig.letterSpacing = value;
    } else if (type === 'word') {
        currentConfig.wordSpacing = value;
    }

    await saveConfig(currentConfig);
};