/**
 * Este arquivo gerencia as funcionalidades de guia de leitura e linha de foco
 * da extensão. Inclui funções para ativar/desativar essas ferramentas,
 * ajustar seus comportamentos (como altura da régua e cor de destaque),
 * e persistir as configurações no armazenamento.
 */
import { saveConfig } from '../utils/storage.js';
import { setHighlightColor } from '../dom/styleInjector.js';

let updateReadingGuidePositionBound = null;

const updateReadingGuidePosition = (e) => {
    const readingGuide = document.getElementById('a11y-reading-guide');
    if (readingGuide) {
        readingGuide.style.top = `${e.clientY - (readingGuide.offsetHeight / 2)}px`;
    }
};

export const toggleReadingGuide = (enable, height) => {
    const readingGuide = document.getElementById('a11y-reading-guide');
    if (readingGuide) {
        if (enable || readingGuide.classList.contains('active')) {
            readingGuide.style.height = `${height}px`;
        }

        readingGuide.classList.toggle('active', enable);

        if (enable) {
            if (!updateReadingGuidePositionBound) {
                updateReadingGuidePositionBound = updateReadingGuidePosition;
                document.body.addEventListener('mousemove', updateReadingGuidePositionBound);
            }
        } else {
            if (updateReadingGuidePositionBound) {
                document.body.removeEventListener('mousemove', updateReadingGuidePositionBound);
                updateReadingGuidePositionBound = null;
            }
        }
    }
};

export const handleReadingGuide = async (currentConfig) => {
    const newState = !currentConfig.readingGuideActive;
    toggleReadingGuide(newState, currentConfig.readingGuideHeight);
    currentConfig.readingGuideActive = newState;
    await saveConfig(currentConfig);
};

export const handleReadingGuideHeightChange = async (height, currentConfig) => {
    currentConfig.readingGuideHeight = height;
    toggleReadingGuide(currentConfig.readingGuideActive, height);
    await saveConfig(currentConfig);
};

export const toggleHighlightLine = (enable) => {
    const contentWrapper = document.getElementById('a11y-content-wrapper');
    if (contentWrapper) {
        contentWrapper.classList.toggle('a11y-highlight-line-active', enable);
    }
};

export const handleHighlightLine = async (currentConfig) => {
    const newState = !currentConfig.highlightLineActive;
    toggleHighlightLine(newState);
    currentConfig.highlightLineActive = newState;
    await saveConfig(currentConfig);
};

export const handleHighlightColorChange = async (color, currentConfig) => {
    setHighlightColor(color);
    currentConfig.highlightColor = color;
    await saveConfig(currentConfig);
};