/**
 * Este arquivo gerencia a aplicação de filtros de daltonismo na página web.
 * Ele contém a lógica para aplicar os filtros de cor dinamicamente
 * e para persistir a seleção do filtro nas configurações do usuário.
 */

import { applyDynamicColorFilter } from '../dom/styleInjector.js';
import { saveConfig } from '../utils/storage.js';

export const handleColorFilter = async (filter, currentConfig) => {
    applyDynamicColorFilter(filter);
    currentConfig.colorFilter = filter;
    await saveConfig(currentConfig);
};