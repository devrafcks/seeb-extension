/**
 * Este arquivo JavaScript gerencia as configurações da extensão de acessibilidade.
 * Ele lida com o carregamento das configurações salvas e o salvamento de novas configurações
 * usando a API chrome.storage.local (com localStorage como fallback para ambientes sem a API).
 * Um mecanismo de debounce é implementado para otimizar as operações de salvamento,
 * prevenindo erros de quota e garantindo eficiência.
 */

import { defaultConfig } from './constants.js';

let saveConfigTimeout = null;
const DEBOUNCE_DELAY = 300;

export const saveConfig = (config) => {
    if (saveConfigTimeout) {
        clearTimeout(saveConfigTimeout);
    }

    saveConfigTimeout = setTimeout(async () => {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                await chrome.storage.local.set(config);
                console.log('Configurações salvas com sucesso em chrome.storage.local:', config);
            } else {
                localStorage.setItem('a11yConfig', JSON.stringify(config));
                console.log('Configurações salvas com sucesso em localStorage (fallback):', config);
            }
        } catch (error) {
            console.error('Erro ao salvar as configurações:', error);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('a11yConfig', JSON.stringify(config));
                console.warn('Tentativa de salvar em localStorage após falha em chrome.storage.local.');
            }
        } finally {
            saveConfigTimeout = null;
        }
    }, DEBOUNCE_DELAY);
};

export const loadConfig = async () => {
    try {
        let savedConfig = {};
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            savedConfig = await chrome.storage.local.get(Object.keys(defaultConfig));
        } else {
            const saved = localStorage.getItem('a11yConfig');
            savedConfig = saved ? JSON.parse(saved) : {};
        }

        return {
            ...defaultConfig,
            ...savedConfig
        };
    } catch (error) {
        console.error('Erro ao carregar as configurações:', error);
        return defaultConfig;
    }
};