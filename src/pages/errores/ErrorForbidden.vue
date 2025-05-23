<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h5 q-mt-md">
        No tienes los permisos necesarios para acceder a esta vista.
      </div>
      <q-btn class="q-mt-xl" color="secondary" text-color="white" unelevated @click="redirectSipf"
        label="Regresar a SIPF" no-caps />

    </div>
  </div>
</template>

/**
* Componente de error 404 (Página no encontrada).
*
* Muestra un mensaje de error y un botón para redirigir al usuario a la página principal.
* Utiliza Quasar para el diseño y estilos.
*
* @component
* @example
*
<ErrorForbidden />
*/
<script setup lang="ts">
import { appConfig } from 'src/shared/config/app.config';

/**
 * Redirige al usuario a la página principal de SIPF.
 */
function redirectSipf() {
  const urlSipf = appConfig.frontendUrl;
  if (!urlSipf) {
    console.error('❌ URL de frontend no encontrada para el entorno actual');
    return;
  }
  window.location.href = urlSipf;
}

</script>
