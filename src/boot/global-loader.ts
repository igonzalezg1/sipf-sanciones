/**
 * Plugin `boot` que monta el componente `GlobalLoader` y lo expone globalmente
 * como `$loader` para ser usado en cualquier parte de la app.
 *
 * El loader permite:
 * - `show(...)`: Mostrar el loader.
 * - `hide()`: Ocultarlo.
 * - `setDefaults(...)`: Personalizar comportamiento.
 */

import { Quasar } from 'quasar';
import { boot } from 'quasar/wrappers';
import { createApp, h, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import GlobalLoader from 'src/shared/ui/GlobalLoader.vue';

export default boot(({ app }) => {
  type LoaderComponentInstance = ComponentPublicInstance<{
    show: (...args: unknown[]) => void;
    hide: () => void;
    setDefaults: (...args: unknown[]) => void;
  }>;
  const loaderRef = ref<LoaderComponentInstance | null>(null);

  const loaderApp = createApp({
    setup() {
      return () => h(GlobalLoader, { ref: loaderRef });
    },
  });

  loaderApp.use(Quasar);

  const el = document.createElement('div');
  document.body.appendChild(el);

  loaderApp.mount(el);

  /**
   * Inyección global `$loader` que permite controlar el componente `GlobalLoader`.
   * Los métodos se delegan al componente vía `ref`.
   */
  app.config.globalProperties.$loader = {
    show: (...args: unknown[]) => loaderRef.value?.show(...args),
    hide: () => loaderRef.value?.hide(),
    setDefaults: (...args: unknown[]) => loaderRef.value?.setDefaults(...args),
  };
});
