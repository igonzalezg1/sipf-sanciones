import { useSessionStore } from 'stores/session';
import { hasPermission } from 'src/shared/lib/helpers/permisos.helper';

interface RouteMeta {
  requiresAuth?: boolean;
  permisos?: string[];
}

interface Route {
  meta: RouteMeta;
}

/**
 * @function
 * @name checkAuthAndPermissions
 * @description Verifica si el usuario tiene token y los permisos necesarios definidos en la meta de la ruta.
 *
 * @param {RouteLocationNormalized} to - Ruta destino
 * @returns {string|null} Ruta a redireccionar si no cumple, o null si tiene acceso permitido
 */
export function checkAuthAndPermissions(to: Route): string | null {
  const session = useSessionStore();

  // Validar token
  if (to.meta.requiresAuth && !session.token) {
    return '/not-logged';
  }

  // Validar permisos si están definidos
  const requiredPerms = to.meta.permisos;

  if (requiredPerms && requiredPerms.length > 0) {
    const userPerms = session.permisos ?? [];
    if (!hasPermission(requiredPerms, userPerms)) {
      return '/not-logged';
    }
  }

  return null;
}
