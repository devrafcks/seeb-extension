/**
 * Este arquivo gerencia a criação e atualização dos elementos da interface do usuário (UI)
 * para o painel de acessibilidade, incluindo o wrapper de conteúdo, ícone, painel
 * e guia de leitura. Ele garante que esses elementos sejam criados apenas uma vez
 * e que o estado visual dos botões no painel seja atualizado conforme a configuração.
 */

import { defaultConfig } from '../utils/constants.js';

export const createUI = () => {
    let contentWrapper = document.getElementById('a11y-content-wrapper');

    if (!contentWrapper) {
        contentWrapper = document.createElement('div');
        contentWrapper.id = 'a11y-content-wrapper';

        const bodyChildren = Array.from(document.body.childNodes);
        bodyChildren.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE &&
                child.id !== 'a11y-container' &&
                child.id !== 'a11y-panel' &&
                child.id !== 'a11y-injected-styles' &&
                child.id !== 'a11y-svg-filters' &&
                child.id !== 'a11y-reading-guide' &&
                child.tagName !== 'SCRIPT' &&
                child.tagName !== 'STYLE' &&
                child.tagName !== 'LINK') {
                contentWrapper.appendChild(child);
            } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                contentWrapper.appendChild(child);
            }
        });
        document.body.appendChild(contentWrapper);
    }

    // O container do ícone é mantido, mas não terá a lógica de arrasto
    let container = document.getElementById('a11y-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'a11y-container';
        document.body.appendChild(container);
    }

    let icon = document.getElementById('a11y-icon');
    if (!icon) {
        icon = document.createElement('div');
        icon.id = 'a11y-icon';
        const imageUrl = chrome.runtime.getURL('icons/logo.png');
        icon.innerHTML = `<img src="${imageUrl}" alt="logo" class="a11y-logo-img">`;
        icon.title = 'Acessibilidade';
        // A aria-label pode ser mantida para indicar o propósito, mesmo que não seja clicável no momento
        icon.setAttribute('aria-label', 'Painel de acessibilidade');
        container.appendChild(icon);
    }

    let panel = document.getElementById('a11y-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.innerHTML = `
                <div class="panel-header">
                    <h3 class="panel-title">SeeB</h3>
                    <button class="close-btn" title="Fechar" aria-label="Fechar painel">×</button>
                </div>
                <div class="panel-content">
                    <div class="section">
                        <h4 class="section-title">Daltonismo</h4>
                        <div class="btn-group">
                            <button class="btn" data-filter="normal">Normal</button>
                            <button class="btn" data-filter="protanopia">Protanopia</button>
                            <button class="btn" data-filter="deuteranopia">Deuteranopia</button>
                        </div>
                        <div class="btn-group">
                            <button class="btn" data-filter="tritanopia">Tritanopia</button>
                            <button class="btn" data-filter="achromatopsia">Monocromático</button>
                        </div>
                    </div>

                    <hr class="section-divider">

                    <div class="section">
                        <h4 class="section-title">Contraste</h4>
                        <div class="btn-group">
                            <button class="btn" data-contrast="normal">Normal</button>
                            <button class="btn" data-contrast="high">Alto</button>
                            <button class="btn" data-contrast="dark">Inverter</button>
                        </div>
                    </div>

                    <hr class="section-divider">

                    <div class="section">
                        <h4 class="section-title">Ampliação e Leitura</h4>
                        <div class="btn-group">
                            <button class="btn" id="zoom-text-btn">Ampliar Texto</button>
                        </div>
                        <div class="btn-group">
                            <button class="btn" id="reading-guide-btn">Guia de Leitura</button>
                        </div>
                        <div class="slider-container">
                            <label for="reading-guide-height-slider">Altura da Régua:</label>
                            <input type="range" min="10" max="60" value="${defaultConfig.readingGuideHeight}" class="slider" id="reading-guide-height-slider">
                        </div>
                        <div class="btn-group">
                            <button class="btn" id="highlight-line-btn">Linha de Foco</button>
                        </div>
                        <div class="color-picker-container">
                            <label for="highlight-color-picker">Cor da Linha de Foco:</label>
                            <input type="color" id="highlight-color-picker" class="color-picker" value="${defaultConfig.highlightColor}">
                        </div>
                    </div>

                    <hr class="section-divider">

                    <div class="section">
                        <h4 class="section-title">Espaçamento</h4>
                        <div class="btn-group">
                            <button class="btn" data-spacing-type="letter" data-spacing-value="normal">Letra Normal</button>
                            <button class="btn" data-spacing-type="letter" data-spacing-value="medium">Letra Médio</button>
                            <button class="btn" data-spacing-type="letter" data-spacing-value="wide">Letra Largo</button>
                        </div>
                        <div class="btn-group">
                            <button class="btn" data-spacing-type="word" data-spacing-value="normal">Palavra Normal</button>
                            <button class="btn" data-spacing-type="word" data-spacing-value="medium">Palavra Médio</button>
                            <button class="btn" data-spacing-type="word" data-spacing-value="wide">Palavra Largo</button>
                        </div>
                    </div>
                </div>
            `;
        document.body.appendChild(panel);
    }

    let readingGuide = document.getElementById('a11y-reading-guide');
    if (!readingGuide) {
        readingGuide = document.createElement('div');
        readingGuide.id = 'a11y-reading-guide';
        document.body.appendChild(readingGuide);
    }

    return { icon, panel, contentWrapper, readingGuide, container };
};

export const updatePanelButtons = (panel, config) => {
    panel.querySelectorAll('.btn[data-filter]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === config.colorFilter);
    });

    panel.querySelectorAll('.btn[data-contrast]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.contrast === config.contrastMode);
    });

    const zoomTextBtn = panel.querySelector('#zoom-text-btn');
    zoomTextBtn?.classList.toggle('active', config.lowVisionModeActive);

    const readingGuideBtn = panel.querySelector('#reading-guide-btn');
    readingGuideBtn?.classList.toggle('active', config.readingGuideActive);

    const readingGuideHeightSlider = panel.querySelector('#reading-guide-height-slider');
    if (readingGuideHeightSlider) {
        readingGuideHeightSlider.value = config.readingGuideHeight;
    }

    const highlightLineBtn = panel.querySelector('#highlight-line-btn');
    highlightLineBtn?.classList.toggle('active', config.highlightLineActive);

    const highlightColorPicker = panel.querySelector('#highlight-color-picker');
    if (highlightColorPicker) {
        highlightColorPicker.value = config.highlightColor;
    }

    panel.querySelectorAll('.btn[data-spacing-type="letter"]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.spacingValue === config.letterSpacing);
    });

    panel.querySelectorAll('.btn[data-spacing-type="word"]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.spacingValue === config.wordSpacing);
    });

    panel.classList.toggle('open', config.panelOpen);
};

export const initializeAccessibilityUI = async () => {
    const { icon: a11yIcon, panel: a11yPanel, container: a11yContainer } = createUI();
    const closeBtn = a11yPanel.querySelector('.close-btn');



    const togglePanel = () => {
        a11yPanel.classList.toggle('open');
    };


    closeBtn.addEventListener('click', togglePanel);

    await loadSavedPosition();
};

document.addEventListener('DOMContentLoaded', initializeAccessibilityUI);