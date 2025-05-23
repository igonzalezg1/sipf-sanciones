<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">403</div>

      <div class="text-h5 q-mt-md">
        Acceso denegado. No tienes un token válido, porfavor inicia Sesión.
      </div>
      <q-btn class="q-mt-xl" color="secondary" text-color="white" unelevated @click="redirectSipf" label="Ir a SIPF"
        no-caps />

    </div>
  </div>
</template>

/**
* Componente de error 403 (Acceso denegado).
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
