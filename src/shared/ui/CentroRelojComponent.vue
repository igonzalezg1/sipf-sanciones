<template>
  <div class="flex items-center space-x-2 text-sm">
    <span class="font-semibold">
      {{ centro.nombre_completo }} {{ centro.tipo ? '(' + centro.tipo + ')' : '' }}
    </span>
    <span>&nbsp;&nbsp;</span>
    <span style="font-size: smaller; color: #51d28c">
      {{ currentTime }}
    </span>
  </div>
</template>

/**
* Componente de encabezado que muestra:
* - El nombre completo del centro penitenciario con su tipo (M/F).
* - La hora actual en tiempo real (actualizada cada segundo).
*
* Props:
* - `centro`: objeto con la información del centro actual (nombre, tipo).
*
* Al montarse, inicializa un `setInterval` para actualizar el reloj.
* Al desmontarse, limpia el intervalo para evitar fugas de memoria.
*/
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Centro } from 'src/entities/centro/centro.model';

defineProps<{ centro: Centro }>();

const currentTime = ref(new Date().toLocaleString());

/**
 * ID del intervalo usado para actualizar el reloj en pantalla cada segundo.
 */
let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  intervalId = setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
