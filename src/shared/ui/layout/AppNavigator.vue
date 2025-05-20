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
          label="Regresar al menú"
          @click="redirectSipf"
          color="secondary"
          text-color="white"
          size="sm"
          class="q-px-sm q-py-xs"
          style="font-size: 12px"
        />

        <q-btn
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
        >
        </q-btn>

        <q-tabs align="center" shrink class="q-ml-xl">
          <q-route-tab to="/sanciones-tecnico" label="Sanciones - técnico" />
          <q-route-tab to="/sanciones-juridico" label="Sanciones - jurídico" />
        </q-tabs>
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

<script setup lang="ts">
import { inject } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const titulo: string = (route.meta.title as string) ?? 'Sin título';

const isPPL = inject('isPPL') as Ref<boolean>;
const toggleFicha = inject('toggleFicha') as () => void;

function redirectSipf() {
  const urlSipf = import.meta.env.VITE_APP_FRONTEND;
  window.location.href = urlSipf;
}
</script>
