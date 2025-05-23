<template>
  <div>
    <div class="text-subtitle1 q-mb-sm">
      Involucrados <q-badge color="primary" align="top">{{ involucrados.length }}</q-badge>
    </div>

    <q-select filled use-input dense v-model="selectedPpl" :options="opcionesPpl" option-label="nombre_completo"
      option-value="id" label="" debounce="300" @filter="buscarPpl" @update:model-value="agregarPpl"
      :disable="modo === 'show'" clearable :loading="loading">

      <template v-slot:label>
        <span class="text-red">*</span> Busca por nombre a los involucrados
      </template>
    </q-select>

    <q-table :rows="involucrados" :columns="columns" row-key="persona_id" flat bordered dense class="q-mt-md">
      <!-- Índice -->
      <template v-slot:body-cell-index="props">
        <q-td>{{ props.pageIndex + 1 }}</q-td>
      </template>

      <!-- SIN DATA -->
      <template v-slot:no-data>
        <div class="full-width tw-text-lg text-center text-primary q-pa-xs">
          Sin registros encontrados
        </div>
      </template>

      <!-- Botón eliminar -->
      <template v-slot:body-cell-actions="props" v-if="modo !== 'show'">
        <q-td align="right">
          <q-btn icon="delete" dense flat round color="negative" @click="quitarPpl(props.row.persona_id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

/**
* Componente de selección y visualización de involucrados en una incidencia.
*
* - Permite buscar y agregar personas por nombre desde el endpoint `/persona/por-centro`.
* - Muestra los involucrados actuales en una tabla.
* - Permite eliminarlos (excepto en modo "show").
*
* Props:
* @prop {CurrentInvolucrado[]} involucrados - Lista de involucrados actuales
* @prop {'create' | 'edit' | 'show'} [modo] - Modo del componente (creación, edición o visualización)
*
* Eventos:
* @emits update:involucrados - Devuelve la lista actualizada de involucrados
*/
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import { BaseService } from 'src/app/services/baseService'
import type { CurrentInvolucrado } from 'src/entities/incidencias/incidente.model'

const props = defineProps<{
  involucrados: CurrentInvolucrado[]
  modo?: 'create' | 'edit' | 'show'
}>()

const emit = defineEmits<(e: 'update:involucrados', val: CurrentInvolucrado[]) => void>()

const service = new BaseService()

const selectedPpl = ref(null)
const opcionesPpl = ref<CurrentInvolucrado[]>([])

const loading = ref(false)

/**
 * Realiza la búsqueda de personas por nombre en el backend.
 * Filtra para no incluir ya seleccionados.
 * 
 * @param {string} val - Texto ingresado por el usuario
 * @param {(cb: () => void) => void} update - Callback para actualizar opciones del QSelect
 */
function buscarPpl(val: string, update: (cb: () => void) => void) {
  loading.value = true
  service.get<CurrentInvolucrado[]>('/persona/por-centro', { search: val })
    .then((res) => {
      opcionesPpl.value = res?.filter(
        (p) => !props.involucrados.some((i) => i.persona_id === p.persona_id)
      ) ?? []
      update(() => { })
    })
    .catch(() => {
      opcionesPpl.value = []
      update(() => { })
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * Agrega una persona seleccionada a la lista de involucrados si no está repetida.
 * 
 * @param {CurrentInvolucrado | null} ppl - Persona seleccionada desde el QSelect
 */
function agregarPpl(ppl: CurrentInvolucrado | null) {
  if (!ppl || !ppl.value) return

  const personaId = ppl.value

  const yaExiste = props.involucrados.some(i => i.persona_id === personaId)
  if (yaExiste) {
    Notify.create({
      type: 'warning',
      message: 'El involucrado ya fue agregado.',
      position: 'top'
    })
    return
  }

  const nuevo: CurrentInvolucrado = {
    ...ppl,
    persona_id: personaId
  }

  const actualizados = [...props.involucrados, nuevo]
  emit('update:involucrados', actualizados)

  Notify.create({
    type: 'positive',
    message: 'Involucrado agregado correctamente.',
    position: 'top'
  })

  selectedPpl.value = null
}

/**
 * Elimina un involucrado de la lista actual según su ID.
 * 
 * @param {number} id - ID de la persona a eliminar
 */
function quitarPpl(id: number) {
  const actualizados = props.involucrados.filter(p => p.persona_id !== id)
  emit('update:involucrados', actualizados)

  Notify.create({
    type: 'negative',
    message: 'Involucrado eliminado.',
    position: 'top'
  })
}

/**
 * Columnas dinámicas para la tabla de involucrados.
 * Se agregan acciones si el modo no es 'show'.
 */
const columns = computed(() => {
  const baseColumns = [
    {
      name: 'index',
      label: '#',
      field: '',
      sortable: false,
      align: 'left' as 'left' | 'right',
      style: 'background-color: #f0f0f0',
      headerClasses: 'bg-primary text-white text-weight-bold'
    },
    {
      name: 'identificador',
      label: '# Expediente',
      field: 'num_expediente',
      headerClasses: 'bg-primary text-white text-weight-bold'
    },
    {
      name: 'nombre_completo',
      label: 'Nombre Completo',
      field: 'nombre_completo',
      headerClasses: 'bg-primary text-white text-weight-bold'
    },
    {
      name: 'fecha_ingreso',
      label: 'Fecha de Ingreso',
      field: 'fecha_ingreso_format',
      headerClasses: 'bg-primary text-white text-weight-bold'
    },
    {
      name: 'ubicacion',
      label: 'Ubicación',
      field: 'ubicacion',
      headerClasses: 'bg-primary text-white text-weight-bold'
    },
  ]

  if (props.modo !== 'show') {
    baseColumns.push({
      name: 'actions',
      label: 'Acciones',
      field: 'actions',
      sortable: false,
      align: 'right',
      style: 'background-color: #f0f0f0',
      headerClasses: 'bg-primary text-white text-weight-bold'
    })
  }

  return baseColumns
})


</script>
