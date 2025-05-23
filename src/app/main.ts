/**
 * Punto de entrada principal de la aplicación.
 *
 * - Crea la instancia de Vue.
 * - Configura Quasar con idioma en español.
 * - Registra Pinia como store global.
 * - Carga el enrutador y la directiva personalizada `permiso`.
 * - Monta la app en el DOM.
 */

import App from '../App.vue';
import router from './router';
import { Quasar } from 'quasar';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import langEs from 'quasar/lang/es';
import permisoDirective from 'src/shared/lib/directives/permisos';

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  lang: langEs,
});

app.use(pinia);
app.use(router);

app.directive('permiso', permisoDirective);

app.mount('#app');
