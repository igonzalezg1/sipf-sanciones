/**
 * Verifica si el usuario tiene todos los permisos requeridos.
 *
 * @function
 * @param {string | string[]} requiredPermissions - Permiso o lista de permisos que se requieren para acceder a un recurso.
 * @param {string[]} [userPermissions=[]] - Lista de permisos actuales del usuario.
 * @returns {boolean} `true` si el usuario tiene todos los permisos requeridos, `false` en caso contrario.
 */
export function hasPermission(
  requiredPermissions: string | string[],
  userPermissions: string[] = [],
): boolean {
  const required = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  return required.some((perm) => userPermissions.includes(perm));
}
