<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md full-width" style="max-width: 2100px">

      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Detalles de la Incidencia</div>
        <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <IncidenciaForm :form="form" :leyes="leyes" :articulos="articulos" modo="show" />

        <IncidenciaInvolucradosSection :involucrados="involucrados" @update:involucrados="val => involucrados = val"
          modo="show" />

        <FirmantesSection :form="form" modo="show" />

        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn label="Cerrar" color="negative" @click="close" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

/**
* Componente modal para visualizar los detalles de una incidencia.
*
* Muestra el formulario, firmantes e involucrados en modo `solo lectura` (`modo = 'show'`).
* No permite edición ni guardado.
*
* Métodos:
* - `open(incidencia)`: Abre el modal con los datos cargados.
*/
<script setup lang="ts">
import { ref, reactive } from 'vue'
import IncidenciaForm from '../shared/IncidenciaForm.vue'
import FirmantesSection from 'src/shared/ui/FirmantesSection.vue'
import type { Incidencia } from 'src/entities/incidencias/incidencia.model'
import type { CurrentInvolucrado } from 'entities/incidencias/incidente.model'
import type { LeyAplicable, ArticuloLey } from 'entities/catalogos/leyes.model'
import IncidenciaInvolucradosSection from 'src/shared/ui/TablaInvolucrados.vue'

const visible = ref(false)
const leyes = ref<LeyAplicable[]>([])
const articulos = ref<ArticuloLey[]>([])
const involucrados = ref<CurrentInvolucrado[]>([])

const form = reactive({
  fecha: '',
  hora: '',
  personal: '',
  numero_reporte: '',
  cargo: '',
  lugar: '',
  descripcion: '',
  ley_id: null,
  articulo_id: null,
  firmante_1_nombre: '',
  firmante_1_cargo: '',
  firmante_2_nombre: '',
  firmante_2_cargo: '',
})

/**
 * Abre el modal y carga los datos de la incidencia en modo solo lectura.
 *
 * @param incidencia - Objeto de tipo `Incidencia` con toda la información a mostrar.
 */
function open(incidencia: Incidencia) {
  visible.value = true
  Object.assign(form, {
    fecha: incidencia.fecha_registro,
    hora: incidencia.hora_registro,
    personal: incidencia.persona_registra,
    numero_reporte: incidencia.numero_reporte,
    cargo: incidencia.persona_registra_cargo,
    lugar: incidencia.lugar_incidente,
    descripcion: incidencia.descripcion_incidente,
    ley_id: incidencia.ley.ley_aplicable,
    articulo_id: incidencia.articulo.descripcion,
    firmante_1_nombre: incidencia.firmante_1_nombre,
    firmante_1_cargo: incidencia.firmante_1_cargo,
    firmante_2_nombre: incidencia.firmante_2_nombre,
    firmante_2_cargo: incidencia.firmante_2_cargo,
  })

  involucrados.value = (incidencia.involucrados?.data ?? []).map(i => ({
    persona_id: i.persona_id ?? null,
    curp: i.persona?.expedientes?.cib ?? null,
    fecha_ingreso: i.fecha_ingreso,
    num_expediente: i.persona?.expedientes?.num_expediente ?? '',
    identificador: i.identificador,
    fecha_ingreso_ultimo_movimiento: '',
    value: i.persona_id ?? 0,
    text: i.nombre_completo,
    nombre: i.nombre,
    primer_apellido: i.primer_apellido,
    segundo_apellido: i.segundo_apellido,
    fecha_ingreso_format: i.fecha_ingreso,
    ubicacion: i.ubicacion,
    photo: 'assets/images/users/avatar-1.jpg',
    nombre_completo: i.nombre_completo,
  }))
}

/**
 * Cierra el modal sin alterar los datos.
 */
function close() {
  visible.value = false
}
defineExpose({ open })
</script>
