/**
 * Este é o script principal da extensão de acessibilidade.
 * Ele inicializa a interface do usuário, carrega as configurações salvas,
 * aplica os estilos e funcionalidades de acessibilidade na página,
 * e configura todos os event listeners para interações do usuário com o painel.
 */

import { loadConfig, saveConfig } from './utils/storage.js';
import { injectGoogleFont, injectFilters, applyDynamicColorFilter, setHighlightColor } from './dom/styleInjector.js';
import { createUI, updatePanelButtons } from './dom/uiBuilder.js';
import { handleColorFilter } from './features/colorFilter.js';
import { handleContrastMode, applyContrast } from './features/contrastMode.js';
import { handleLowVisionMode, toggleLowVisionMode } from './features/lowVisionMode.js';
import {
    handleReadingGuide,
    toggleReadingGuide,
    handleReadingGuideHeightChange,
    handleHighlightLine,
    toggleHighlightLine,
    handleHighlightColorChange
} from './features/readingGuide.js';
import { handleSpacing, applySpacing } from './features/spacing.js';

let currentConfig = {};
let uiElements = {};

const setupEventListeners = () => {
    const { icon, panel, contentWrapper, readingGuide } = uiElements;

    icon.addEventListener('click', async () => {
        const newState = !currentConfig.panelOpen;
        panel.classList.toggle('open', newState);
        currentConfig.panelOpen = newState;
        saveConfig(currentConfig);
    });

    panel.querySelector('.close-btn').addEventListener('click', async () => {
        panel.classList.remove('open');
        currentConfig.panelOpen = false;
        saveConfig(currentConfig);
    });

    panel.querySelectorAll('.btn[data-filter]').forEach(button => {
        button.addEventListener('click', async () => {
            const filter = button.dataset.filter;
            await handleColorFilter(filter, currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    });

    panel.querySelectorAll('.btn[data-contrast]').forEach(button => {
        button.addEventListener('click', async () => {
            const contrast = button.dataset.contrast;
            await handleContrastMode(contrast, currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    });

    const zoomTextBtn = panel.querySelector('#zoom-text-btn');
    if (zoomTextBtn) {
        zoomTextBtn.addEventListener('click', async () => {
            await handleLowVisionMode(currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    }

    const readingGuideBtn = panel.querySelector('#reading-guide-btn');
    if (readingGuideBtn) {
        readingGuideBtn.addEventListener('click', async () => {
            await handleReadingGuide(currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    }

    const readingGuideHeightSlider = panel.querySelector('#reading-guide-height-slider');
    if (readingGuideHeightSlider) {
        readingGuideHeightSlider.addEventListener('input', async (e) => {
            const height = parseInt(e.target.value, 10);
            await handleReadingGuideHeightChange(height, currentConfig);
        });
    }

    const highlightLineBtn = panel.querySelector('#highlight-line-btn');
    if (highlightLineBtn) {
        highlightLineBtn.addEventListener('click', async () => {
            await handleHighlightLine(currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    }

    const highlightColorPicker = panel.querySelector('#highlight-color-picker');
    if (highlightColorPicker) {
        highlightColorPicker.addEventListener('input', async (e) => {
            const color = e.target.value;
            await handleHighlightColorChange(color, currentConfig);
        });
    }

    panel.querySelectorAll('.btn[data-spacing-type]').forEach(button => {
        button.addEventListener('click', async () => {
            const type = button.dataset.spacingType;
            const value = button.dataset.spacingValue;
            await handleSpacing(type, value, currentConfig);
            updatePanelButtons(panel, currentConfig);
        });
    });
};

const init = async () => {
    if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    injectGoogleFont();
    injectFilters();
    uiElements = createUI();

    currentConfig = await loadConfig();

    applyDynamicColorFilter(currentConfig.colorFilter);
    applyContrast(currentConfig.contrastMode);
    toggleLowVisionMode(currentConfig.lowVisionModeActive);
    toggleReadingGuide(currentConfig.readingGuideActive, currentConfig.readingGuideHeight);
    toggleHighlightLine(currentConfig.highlightLineActive);
    setHighlightColor(currentConfig.highlightColor);
    applySpacing('letter', currentConfig.letterSpacing);
    applySpacing('word', currentConfig.wordSpacing);

    updatePanelButtons(uiElements.panel, currentConfig);

    setupEventListeners();
};

init();