import type { DirectiveBinding } from 'vue';
import { useSessionStore } from 'stores/session';
import { hasPermission } from 'src/shared/lib/helpers/permisos.helper';

/**
 * Directiva personalizada `v-permiso` para mostrar u ocultar elementos del DOM
 * según los permisos asignados al usuario actual.
 *
 * @example
 * <q-btn v-permiso="'sanciones.editar'" />
 * <div v-permiso="['usuarios.ver', 'usuarios.editar']">...</div>
 *
 * @param {HTMLElement} el - Elemento DOM donde se aplica la directiva.
 * @param {DirectiveBinding<string | string[]>} binding - Permisos requeridos como string o array.
 */
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const session = useSessionStore();
    const permisos = session.permisos ?? [];

    const permitido = hasPermission(binding.value, permisos);

    if (!permitido) {
      el.remove(); // Podrías usar el.style.display = 'none' si querés ocultar sin eliminar
    }
  },
};
