<template>
  <q-card
    class="q-pa-md"
    style="
      border-radius: 12px;
      box-shadow:
        0 10px 64px rgba(0, 0, 0, 0.2),
        0 6px 10px rgba(0, 0, 0, 0.14),
        0 10px 3px -1px rgba(0, 0, 0, 0.12);
    "
  >
    <div class="row items-center justify-between q-gutter-md">
      <!-- Botones lado izquierdo -->
      <div class="row items-center q-gutter-sm">
        <q-btn
          unelevated
          dense
          icon="keyboard_backspace"
          label="Regresar a anterior"
          v-if="!ocultarBoton"
          @click="goBack"
          color="secondary"
          text-color="white"
          size="sm"
          class="q-px-sm q-py-xs"
          style="font-size: 12px"
        />

        <q-btn
          v-if="puedeMostrarFicha"
          unelevated
          dense
          :icon="isPPL ? 'visibility_off' : 'visibility'"
          :label="isPPL ? 'Ocultar ficha PPL' : 'Mostrar ficha PPL'"
          @click="toggleFicha"
          color="secondary"
          text-color="white"
          size="sm"
          class="q-px-sm q-py-xs"
          style="font-size: 12px"
        />

        <q-btn
          unelevated
          dense
          icon="home"
          label="Regresar a SIPF"
          @click="redirectSipf"
          color="secondary"
          text-color="white"
          size="sm"
          class="q-px-sm q-py-xs"
          style="font-size: 12px"
        />
      </div>

      <!-- BREADCRUM alineado derecha -->
      <div class="q-ml-auto">
        <q-breadcrumbs separator=">">
          <q-breadcrumbs-el label="Menú" icon="home" />
          <q-breadcrumbs-el :label="titulo" class="text-secondary" />
        </q-breadcrumbs>
      </div>
    </div>
  </q-card>
</template>

/** * Componente de navegación especial que muestra: * - Botón para regresar al sistema principal
(SIPF). * - Botón para mostrar/ocultar ficha PPL si está disponible. * - Breadcrumbs con el título
actual de la página. * * Se apoya en `provide/inject` para acceder al estado global: * - `isPPL`:
bandera para mostrar u ocultar la ficha. * - `toggleFicha`: función para alternar visibilidad. * -
`puedeMostrarFicha`: indica si existen datos válidos para la ficha. */
<script setup lang="ts">
import { inject, computed } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { appConfig } from 'src/shared/config/app.config';

const route = useRoute();
const router = useRouter();
const titulo: string = (route.meta.title as string) ?? 'Sin título';

const isPPL = inject('isPPL') as Ref<boolean>;
const toggleFicha = inject('toggleFicha') as () => void;
const puedeMostrarFicha = inject('puedeMostrarFicha') as Ref<boolean>;

const ocultarBoton = computed(() => {
  const path = route.path;
  return path === '/tecnico' || path === '/juridico';
});

/**
 * Redirige al sistema principal SIPF usando la URL configurada
 * según el entorno actual (`appConfig.frontendUrl`).
 */
function redirectSipf() {
  const urlSipf = appConfig.frontendUrl;
  window.location.href = urlSipf;
}

function goBack() {
  router.back();
}
</script>
