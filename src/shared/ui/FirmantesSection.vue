<!-- eslint-disable vue/no-mutating-props -->

<template>
  <div class="q-mt-md">
    <div class="text-subtitle1 q-mb-sm">Firmantes</div>

    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input v-model="form.firmante_1_nombre" label="Nombre del Firmante 1" dense filled
          :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Nombre del Firmante 1
          </template>
        </q-input>
      </div>

      <div class="col-3">
        <q-input v-model="form.firmante_1_cargo" label="Cargo del Firmante 1" dense filled
          :rules="[val => form.firmante_1_nombre ? !!val || 'Campo obligatorio' : true]" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Cargo del Firmante 1
          </template>
        </q-input>
      </div>

      <div class="col-3">
        <q-input v-model="form.firmante_2_nombre" label="Nombre del Firmante 2" dense filled
          :rules="[val => form.firmante_2_cargo ? !!val || 'Campo obligatorio' : true]" :disable="modo === 'show'">
          <template v-slot:label>
            <span v-if="showFirmante2NombreAsterisk" class="text-red">*</span> Nombre del Firmante 2
          </template>
        </q-input>
      </div>

      <div class="col-3">
        <q-input v-model="form.firmante_2_cargo" label="Cargo del Firmante 2" dense filled
          :rules="[val => form.firmante_2_nombre ? !!val || 'Campo obligatorio' : true]" :disable="modo === 'show'">
          <template v-slot:label>
            <span v-if="showFirmante2CargoAsterisk" class="text-red">*</span> Cargo del Firmante 2
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

/**
* Componente que muestra el formulario de firmantes en una incidencia.
*
* Funcionalidad:
* - Permite capturar nombre y cargo de dos firmantes.
* - Aplica validaciones condicionales: si se ingresa un campo, el otro se vuelve obligatorio.
* - Se adapta al modo de uso (`create`, `edit`, `show`) para habilitar o deshabilitar inputs.
*
* Props:
* - `form`: objeto reactivo con los datos de firmantes.
* - `modo`: define si los campos están editables o solo de lectura.
*/
<script setup lang="ts">
import { computed } from 'vue'

interface IncidenciaFormData {
  firmante_1_nombre: string
  firmante_1_cargo: string
  firmante_2_nombre: string | null
  firmante_2_cargo: string | null
}

const props = defineProps<{
  form: IncidenciaFormData
  modo?: 'create' | 'edit' | 'show'
}>()

/**
 * Muestra asterisco en "Nombre del Firmante 2" solo si se ingresó su cargo.
 */
const showFirmante2NombreAsterisk = computed(() => !!props.form.firmante_2_cargo)

/**
 * Muestra asterisco en "Cargo del Firmante 2" solo si se ingresó su nombre.
 */
const showFirmante2CargoAsterisk = computed(() => !!props.form.firmante_2_nombre)
</script>
