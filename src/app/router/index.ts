import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { checkAuthAndPermissions } from 'src/shared/lib/guards/auth.guard';

/**
 * Crea la instancia principal de Vue Router con historial adaptado al entorno
 * (SSR, history o hash). También configura los guards globales y el comportamiento
 * de scroll y título por ruta.
 *
 * @returns Instancia configurada de Vue Router.
 */
export default function () {
  let createHistory:
    | typeof createMemoryHistory
    | typeof createWebHistory
    | typeof createWebHashHistory;

  if (process.env.SERVER) {
    createHistory = createMemoryHistory;
  } else if (process.env.VUE_ROUTER_MODE === 'history') {
    createHistory = createWebHistory;
  } else {
    createHistory = createWebHashHistory;
  }

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  /**
   * Guard global que se ejecuta antes de cada navegación.
   * Valida si el usuario está autenticado y tiene permisos para acceder.
   *
   * @param to - Ruta destino.
   * @param from - Ruta origen.
   * @param next - Función que decide si continuar o redirigir.
   */
  Router.beforeEach((to, from, next) => {
    const redirect = checkAuthAndPermissions(to); // Verifica token y permisos
    if (redirect) return next(redirect); // Redirige si no cumple
    next(); // Permite si está bien
  });

  /**
   * Cambia el título del documento después de cada navegación.
   *
   * @param to - Ruta destino.
   */
  Router.afterEach((to) => {
    const baseTitle = 'Sistema Integral Penitenciario Federal';
    const routeTitle = to.meta?.title as string;
    document.title = routeTitle ? `${baseTitle} - ${routeTitle}` : baseTitle;
  });

  return Router;
}
