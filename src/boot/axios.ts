/**
 * Plugin de Quasar (`boot`) que configura Axios y lo expone globalmente.
 *
 * Define la instancia `api` con la baseURL determinada por el entorno (`VITE_APP_ENV`),
 * y la inyecta como `$axios` y `$api` en todos los componentes Vue.
 */
import { boot } from 'quasar/wrappers';
import axios, { type AxiosInstance } from 'axios';
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const ambiente = import.meta.env.VITE_APP_ENV;

let baseURL: string = '';

switch (ambiente) {
  case 'LOCAL':
    baseURL = import.meta.env.VITE_APP_API_URL_LOCAL;
    break;
  case 'TEST':
    baseURL = import.meta.env.VITE_APP_API_URL_TEST;
    break;
  case 'QA':
    baseURL = import.meta.env.VITE_APP_API_URL_QA;
    break;
  case 'PROD':
    baseURL = import.meta.env.VITE_APP_API_URL_PROD;
    break;
  default:
    console.warn('Ambiente no reconocido, usando URL base por defecto.');
    baseURL = import.meta.env.VITE_APP_API_URL_TEST;
}

/**
 * Instancia personalizada de Axios con baseURL dinámica según el entorno.
 */
const api = axios.create({ baseURL });

/**
 * Función boot que registra `$axios` y `$api` en `app.config.globalProperties`,
 * para su uso global en componentes Vue.
 */
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
