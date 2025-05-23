<!-- eslint-disable vue/no-mutating-props -->
<!-- IGNORA ERRORES  -->
<template>
  <q-form ref="formRef">
    <div class="row q-col-gutter-md">
      <!-- Columna 1 -->
      <div class="col-2">
        <q-input v-model="form.fecha" label="Fecha de la Incidencia" type="date" dense filled
          :rules="[validarFechaNoFutura]" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Fecha de la Incidencia
          </template>
        </q-input>

        <q-input v-model="form.numero_reporte" label="Número de reporte" dense filled
          :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Número de reporte
          </template>
        </q-input>
      </div>

      <!-- Columna 2 -->
      <div class="col-2">
        <q-input v-model="form.hora" label="Hora de la Incidencia" type="time" dense filled
          :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Hora de la Incidencia
          </template>
        </q-input>

        <q-input v-model="form.cargo" label="Cargo del Personal" dense filled :disable="modo === 'show'"
          :rules="[val => !!val || 'Campo obligatorio']">
          <template v-slot:label>
            <span class="text-red">*</span> Cargo del Personal
          </template>
        </q-input>
      </div>

      <!-- Columna 3 -->
      <div class="col-4">
        <q-input v-model="form.personal" label="Personal de custodia que levantó el reporte" dense filled
          :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Personal de custodia que levantó el reporte
          </template>
        </q-input>

        <q-input v-model="form.lugar" label="Lugar de la Incidencia" dense filled
          :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
          <template v-slot:label>
            <span class="text-red">*</span> Lugar de la Incidencia
          </template>
        </q-input>
      </div>

      <!-- Columna 4 -->
      <div class="col-4">
        <q-select v-model="form.ley_id" :options="leyes" option-label="ley_aplicable" option-value="id"
          label="Ley aplicable" dense filled :disable="modo === 'show'" @update:model-value="onLeySeleccionada"
          :rules="[val => !!val || 'Campo obligatorio']">
          <template v-slot:label>
            <span class="text-red">*</span>Tipo de Incidencia (Ley aplicable)
          </template>
        </q-select>

        <q-select v-model="form.articulo_id" :options="articulos" option-label="descripcion" option-value="id"
          label="Artículo aplicable" dense filled :disable="!form.ley_id || modo === 'show'"
          :rules="[val => !!val || 'Campo obligatorio']">
          <template v-slot:label>
            <span class="text-red">*</span> Tipo de Incidencia (Artículo aplicable)
          </template>
        </q-select>
      </div>
    </div>

    <!-- Columna 5 -->
    <div class="col-12">
      <q-input v-model="form.descripcion" label="Descripción de la Incidencia" type="textarea" dense filled
        :rules="[val => !!val || 'Campo obligatorio']" :disable="modo === 'show'">
        <template v-slot:label>
          <span class="text-red">*</span> Descripción de la Incidencia
        </template>
      </q-input>
    </div>
  </q-form>
</template>


/**
* Formulario base para registrar o editar una incidencia.
*
* Props:
* - `form`: Objeto reactivo vinculado al modelo de datos del formulario.
* - `leyes`: Lista de leyes aplicables para el `q-select`.
* - `articulos`: Lista de artículos relacionados con la ley seleccionada.
* - `modo`: Modo de uso del formulario (`create`, `edit`, `show`) que controla el estado de edición.
*
* Emits:
* - `leySeleccionada`: Se emite cuando se selecciona una ley, con su ID como valor.
*/
<script setup lang="ts">
import { ref } from 'vue'
import type { ArticuloLey, LeyAplicable } from 'entities/catalogos/leyes.model'

interface IncidenciaFormData {
  fecha: string
  hora: string
  personal: string
  numero_reporte: string
  cargo: string
  lugar: string
  descripcion: string
  ley_id: LeyAplicable | null
  articulo_id: ArticuloLey | null
}

defineProps<{
  form: IncidenciaFormData
  leyes: LeyAplicable[]
  articulos: ArticuloLey[]
  modo?: 'create' | 'edit' | 'show'
}>()

const formRef = ref()
const emit = defineEmits<(e: 'leySeleccionada', value: number) => void>()

/**
 * Emite el evento `leySeleccionada` cuando el usuario cambia la ley seleccionada.
 *
 * @param value - Objeto LeyAplicable o ID numérico.
 */
function onLeySeleccionada(value: LeyAplicable | number) {
  const leyId = typeof value === 'object' ? value.id : value
  emit('leySeleccionada', leyId)
}

/**
 * Valida que la fecha ingresada no sea futura.
 *
 * @param val - Fecha en formato YYYY-MM-DD.
 * @returns Mensaje de error si es inválida, o true si es válida.
 */
function validarFechaNoFutura(val: string) {
  if (!val) return 'Campo obligatorio'
  const hoy = new Date()
  const fechaInput = new Date(val)
  hoy.setHours(0, 0, 0, 0)
  fechaInput.setHours(0, 0, 0, 0)
  return fechaInput <= hoy || "El campo 'Fecha de la Incidencia' no debe contener una fecha mayor a la actual"
}

defineExpose({
  validate: () => formRef.value?.validate()
})
</script>
