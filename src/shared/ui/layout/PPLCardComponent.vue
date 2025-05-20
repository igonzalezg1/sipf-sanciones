<template>
  <q-card
    class="rounded-2xl overflow-hidden bg-white"
    style="
      max-width: 350px;
      border-radius: 10px;
      box-shadow:
        0 10px 64px rgba(0, 0, 0, 0.2),
        0 6px 10px rgba(0, 0, 0, 0.14),
        0 10px 3px -1px rgba(0, 0, 0, 0.12);
    "
  >
    <!-- Encabezado y avatar decorado -->
    <div class="relative">
      <q-img :src="Avatar" ratio="1" class="w-full h-auto object-cover" />
      <q-chip dense outline class="absolute top-2 left-2 text-white bg-sipf" icon="badge">
        ID PPL: [{{ persona?.id ?? '' }}]
      </q-chip>
    </div>

    <!-- Contenido principal -->
    <q-card-section class="text-center">
      <div class="text-h6 font-bold">{{ persona?.nombre_completo.toUpperCase() ?? '' }}</div>
      <div class="text-subtitle2 text-grey-7">{{ edad }} AÑOS DE EDAD</div>

      <q-separator spaced />

      <!-- Centro -->
      <div class="text-caption text-grey-8 mb-1">
        Centro (<small>{{ centroGenero }} </small> )
      </div>

      <div class="tw-text-lg font-medium text-grey-9 mb-1">
        {{ expediente?.centro?.nombre_centro.toUpperCase() }}
      </div>

      <q-separator spaced />

      <!-- Tipo de ingreso -->
      <div class="text-caption text-grey-7 mb-1">TIPO DE INGRESO</div>

      <q-btn class="q-mt-sm" color="secondary" size="sm" :label="persona?.tipo_ingreso"> </q-btn>

      <!-- Estatus del centro -->
      <div class="q-mt-sm text-caption text-grey-7 mb-1">Estatus</div>
      <q-btn
        class="q-mt-sm"
        color="primary"
        size="sm"
        :label="expediente?.estatus_centro.toUpperCase()"
      >
      </q-btn>

      <q-separator spaced />

      <!-- Expediente -->
      <div class="text-caption text-grey-7 mt-3 mb-1">EXPEDIENTE</div>
      <div class="tw-text-lg font-medium">
        {{ expediente?.num_expediente.toUpperCase() ?? 'Sin expediente' }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import Avatar from 'src/assets/img/avatar.jpg';
import { onMounted, ref } from 'vue';
import { useSessionStore } from 'src/stores/session';

const sessionStore = useSessionStore();
const persona = sessionStore.persona;
const expediente = sessionStore.expediente;
const edad = ref(0);
const centroGenero = ref('');

onMounted(() => {
  const hoy = new Date();
  if (persona?.fecha_nacimiento) {
    const nacimiento = new Date(persona.fecha_nacimiento);
    edad.value = hoy.getFullYear() - nacimiento.getFullYear();
    centroGenero.value = expediente?.centro?.tipo === 'M' ? 'Masculino' : 'Femenino';
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    const diaActual = hoy.getDate();
    const diaNacimiento = nacimiento.getDate();
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad.value--;
    }
  } else {
    edad.value = 0;
  }
});
</script>
