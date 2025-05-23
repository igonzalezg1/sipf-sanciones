/**
 * Configuración dinámica basada en variables de entorno (Vite + .env).
 *
 * Determina automáticamente el entorno actual (`VITE_APP_ENV`) y resuelve:
 * - `frontendUrl`: URL base del frontend según entorno.
 * - `apiUrl`: Endpoint principal de la API.
 * - `storageUrl`: Ruta para acceder a archivos (PDFs, imágenes, etc).
 * - `loginUrl`: Redirección al login del sistema principal.
 * - `logoutEndpoint`: Endpoint de logout para invalidar sesión.
 *
 * Utiliza `import.meta.env` y construye dinámicamente las claves según el entorno.
 *
 * Ejemplo de uso:
 * ```ts
 * const api = axios.create({ baseURL: appConfig.apiUrl });
 * window.location.href = appConfig.loginUrl;
 * ```
 */

const currentEnv = import.meta.env.VITE_APP_ENV ?? 'LOCAL';

/**
 * Devuelve el valor de una variable de entorno definida en Vite.
 *
 * @param key - Nombre de la variable (ej. `VITE_APP_API_URL_QA`)
 * @returns Valor de la variable, o string vacío si no existe.
 */
function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    console.error(`⚠️ No se encontró la variable de entorno: ${key}`);
  }
  return value ?? '';
}

export const appConfig = {
  frontendUrl: getEnvVar(`VITE_APP_FRONTEND_${currentEnv}`),
  apiUrl: getEnvVar(`VITE_APP_API_URL_${currentEnv}`),
  storageUrl: getEnvVar(`VITE_API_STORAGE_URL_${currentEnv}`),
  loginUrl: getEnvVar(`VITE_APP_FRONTEND_LOGIN_URL_${currentEnv}`) + '/account/login',
  logoutEndpoint: getEnvVar(`VITE_APP_API_URL_${currentEnv}`) + '/logout',
};
