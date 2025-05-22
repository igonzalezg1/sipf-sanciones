/**
 * Plugin `boot` que registra la directiva global `v-permiso`.
 *
 * Esta directiva controla la visibilidad de elementos en función
 * de los permisos del usuario actual.
 */

import { boot } from 'quasar/wrappers';
import permiso from 'src/shared/lib/directives/permisos';

export default boot(({ app }) => {
  app.directive('permiso', permiso);
});
