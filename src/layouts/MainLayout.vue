<template>
  <q-layout view="lHh Lpr lFf" class="full-height bg-grey-2">
    <!-- Header -->
    <HeaderComponent
      :titulo="titulo"
      v-if="user && centroActual"
      :centro="centroActual"
      :user="user"
    />

    <!-- Contenedor principal -->
    <q-page-container class="flex column full-height">
      <div class="row">
        <!-- Tarjeta PPL -->
        <div class="col-2 q-gutter-y-md q-mt-md q-pa-md" v-show="isPPL">
          <PPLCardComponent />
        </div>

        <!-- Contenedor para NavegationSpecial y BodyComponent -->
        <div :class="isPPL ? 'col-10' : 'col-12'">
          <div class="column">
            <div class="column q-gutter-y-md q-mt-md q-pa-md">
              <NavegationSpecial />
            </div>
            <div class="column q-gutter-y-sm q-mt-sm q-pa-md">
              <BodyComponent />
            </div>
          </div>
        </div>
      </div>
    </q-page-container>

    <!-- Footer -->
    <FooterComponent />
  </q-layout>
</template>

/** * Layout principal de la aplicación. * * Estructura general: * - Header dinámico con datos del
usuario y centro. * - Tarjeta lateral de PPL (si hay persona y expediente). * - Navegación
secundaria (`NavegationSpecial`) y contenido (`BodyComponent`). * - Footer global. * * También
provee el estado de visualización de la ficha PPL mediante `provide()`: * - `isPPL`: Booleano que
indica si se muestra la tarjeta. * - `toggleFicha`: Función para alternar visibilidad. * -
`puedeMostrarFicha`: Indica si hay datos suficientes para mostrar la ficha. */
<script setup lang="ts">
import { ref, computed, provide, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from 'stores/session';
import type { User } from 'src/entities/user/user.model';
import type { Centro } from 'src/entities/centro/centro.model';

import BodyComponent from 'src/shared/ui/layout/BodyComponent.vue';
import HeaderComponent from 'src/shared/ui/layout/HeaderComponent.vue';
import FooterComponent from 'src/shared/ui/layout/FooterComponent.vue';
import PPLCardComponent from 'src/shared/ui/layout/PPLCardComponent.vue';
import NavegationSpecial from 'src/shared/ui/layout/NavegationSpecial.vue';

const session = useSessionStore();
const route = useRoute();

const titulo = computed(() => {
  const title = route.meta.title;
  return typeof title === 'string' ? title : 'SIPF - ';
});

const centroActual = computed(() => {
  if (!session.centro) throw new Error('❌ No se ha cargado session.centro');
  return session.centro as Centro;
});

const user = computed(() => {
  if (!session.usuario) throw new Error('❌ No se ha cargado session.usuario');
  return session.usuario as User;
});

const puedeMostrarFicha = computed(() => {
  return !!session.persona && !!session.expediente;
});

const isPPL = ref(false);

/**
 * Observa cambios en `puedeMostrarFicha` y actualiza `isPPL` en consecuencia.
 * Si hay datos válidos, se muestra la tarjeta PPL.
 */
watchEffect(() => {
  isPPL.value = puedeMostrarFicha.value;
});

/**
 * Alterna la visibilidad de la tarjeta PPL, si hay datos válidos.
 */
const toggleFicha = () => {
  if (puedeMostrarFicha.value) {
    isPPL.value = !isPPL.value;
  }
};

provide('isPPL', isPPL);
provide('toggleFicha', toggleFicha);
provide('puedeMostrarFicha', puedeMostrarFicha);
</script>
