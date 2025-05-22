import { defineStore } from '#q-app/wrappers';
import { createPinia } from 'pinia';
declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PiniaCustomProperties {}
}

/**
 * Inicializa y retorna la instancia de Pinia.
 * Se usa en `main.ts` para conectar el store global.
 *
 * @returns {ReturnType<typeof createPinia>} Instancia de Pinia lista para usar.
 */
export default defineStore(() => {
  const pinia = createPinia();

  return pinia;
});
