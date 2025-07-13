/**
 * Este arquivo gerencia a aplicação de diferentes modos de contraste na página web.
 * Ele contém funções para aplicar/remover as classes CSS de contraste
 * e para persistir a configuração de contraste selecionada pelo usuário.
 */
import { saveConfig } from '../utils/storage.js';

export const applyContrast = (mode) => {
    const contentWrapper = document.getElementById('a11y-content-wrapper');
    if (contentWrapper) {
        contentWrapper.classList.remove('a11y-high-contrast', 'a11y-dark-mode');

        if (mode === 'high') {
            contentWrapper.classList.add('a11y-high-contrast');
        } else if (mode === 'dark') {
            contentWrapper.classList.add('a11y-dark-mode');
        }
    }
};

export const handleContrastMode = async (mode, currentConfig) => {
    applyContrast(mode);
    currentConfig.contrastMode = mode;
    await saveConfig(currentConfig);
};