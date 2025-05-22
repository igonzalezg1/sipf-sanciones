<template>
  <q-dialog :model-value="modelValue">
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h6">Detalles de la sanción</div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <form>
              <div class="row q-mx-md">
                <div class="col-12">
                  <p class="tw-text-2xl">INCIDENCIA</p>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <p class="tw-text-lg q-mx-md tw-uppercase">
                    <span class="tw-font-semibold">Tipo de incidencia: </span
                    >{{ incidencia?.tipo_incidente?.label }}
                  </p>
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Folio de incidencia:</span>
                    {{ incidencia?.folio }}
                  </p>
                </div>
                <div class="col-6">
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Fecha y Hora de incidente: </span
                    >{{ incidencia?.fecha_hora_registro }}
                  </p>
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Personal que custodia: </span
                    >{{ incidencia?.persona_registra }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Descripción de la incidencia: </span
                    >{{ incidencia?.descripcion_incidente }}
                  </p>
                </div>
                <div class="col-12">
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Lugar de la incidencia: </span
                    >{{ incidencia?.lugar_incidente }}
                  </p>
                </div>
              </div>

              <div class="row q-mx-md">
                <div class="col-12">
                  <p class="tw-text-2xl">SANCION</p>
                </div>
              </div>
              <div class="row tw-uppercase">
                <div class="col-6">
                  <select-custom
                    v-model="dataForm.tipo_sancion_id"
                    :options="tiposSancion"
                    label="Tipo de sanción"
                    clearable
                    :readonly="readonly"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="gavel" />
                    </template>
                  </select-custom>
                  <input-text
                    v-model="dataForm.fecha_registro"
                    label="Fecha sesión de comite técnico"
                    clearable
                    :readonly="readonly"
                    type="date"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.fecha_hora_inicio_sancion"
                    label="Fecha inicio de sanción"
                    clearable
                    type="date"
                    class="q-ma-md"
                    readonly
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.observaciones"
                    label="Observaciones de la sanción"
                    clearable
                    :readonly="readonly"
                    type="textarea"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="visibility" />
                    </template>
                  </input-text>
                </div>
                <div class="col-6">
                  <input-text
                    v-model="dataForm.no_sesion_comite"
                    label="No de sesión de comite técnico"
                    clearable
                    :readonly="readonly"
                    type="text"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="groups" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.dias_sancion"
                    label="Días de sanción"
                    clearable
                    :readonly="readonly"
                    type="number"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="lock" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.fecha_hora_fin_sancion"
                    label="Fecha fin de sanción"
                    readonly
                    type="date"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.descripcion"
                    label="Descripción de la sanción"
                    clearable
                    :readonly="readonly"
                    type="textarea"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="chat" />
                    </template>
                  </input-text>
                </div>
              </div>
              <div class="row tw-uppercase">
                <div class="col-12">Involucrados</div>
                <table class="q-table">
                  <thead class="text-center bg-primary text-white">
                    <tr>
                      <th>#</th>
                      <th>PPL</th>
                      <th>Expediente</th>
                      <th>Tipo de participación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ involucrado.nombre_completo }}</td>
                      <td>{{ involucrado.identificador }}</td>
                      <td>{{ involucrado.tipo_participacion?.label }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row tw-uppercase">
                <div class="col-3">
                  <input-text
                    v-model="dataForm.firmante_1_nombre"
                    label="Nombre del firmante 1"
                    clearable
                    type="text"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
                <div class="col-3">
                  <input-text
                    v-model="dataForm.firmante_1_cargo"
                    label="Cargo del firmante 1"
                    clearable
                    type="text"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
                <div class="col-3">
                  <input-text
                    v-model="dataForm.firmante_2_nombre"
                    label="Nombre del firmante 2"
                    clearable
                    type="text"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
                <div class="col-3">
                  <input-text
                    v-model="dataForm.firmante_2_cargo"
                    label="Cargo del firmante 2"
                    clearable
                    type="text"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
              </div>
            </form>
          </div>
        </div>
      </q-card-section>

      <q-card-actions vertical class="justify-end">
        <q-btn v-if="!readonly" label="Actualizar" color="primary" @click="closeModal" />
        <q-btn label="Cerrar" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Imports
import { ref, watch } from 'vue';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
// Servicios
import { CatalogsService } from 'src/app/services/catalogs/CatalogsService';
// Modelos
import type { SancionCreate, SancionData, TipoSancion } from 'entities/sancion/sancion.model';
// Componentes
import InputText from 'src/shared/ui/InputText.vue';
import SelectCustom from 'src/shared/ui/SelectCustom.vue';

// Variables
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const tiposSancionService = new CatalogsService();
const incidencia = ref(incidenciaStore.getIncidencia());
const tiposSancionResponse = ref<TipoSancion[] | null>([]);
const tiposSancion = ref<object[]>([]);
const sancion = ref<SancionData | null>(null);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const dataForm = ref<SancionCreate>({
  tipo_sancion_id: 0,
  no_sesion_comite: '',
  fecha_registro: '',
  fecha_hora_inicio_sancion: '',
  fecha_hora_fin_sancion: '',
  dias_sancion: '',
  observaciones: '',
  descripcion: '',
  firmante_1_nombre: '',
  firmante_1_cargo: '',
  firmante_2_nombre: '',
  firmante_2_cargo: '',
  involucrados: '',
  centro_id: null,
});

// Watch
watch(
  () => props.modelValue,
  async (newValue) => {
    if (newValue) {
      if (incidencia.value.sanciones) {
        sancion.value = incidencia.value.sanciones.data[0];
        dataForm.value = {
          tipo_sancion_id: sancion.value?.tipo_sancion_id ?? 0,
          no_sesion_comite: sancion.value?.fecha_registro ?? '',
          fecha_registro: sancion.value?.fecha_registro ?? '',
          fecha_hora_inicio_sancion: sancion.value?.fecha_registro ?? '',
          fecha_hora_fin_sancion: sancion.value?.fecha_registro ?? '',
          dias_sancion: sancion.value?.fecha_registro ?? '',
          observaciones: sancion.value?.fecha_registro ?? '',
          descripcion: sancion.value?.descripcion ?? '',
          firmante_1_nombre: sancion.value?.fecha_registro ?? '',
          firmante_1_cargo: sancion.value?.fecha_registro ?? '',
          firmante_2_nombre: sancion.value?.fecha_registro ?? '',
          firmante_2_cargo: sancion.value?.fecha_registro ?? '',
          centro_id: sancion.value?.tipo_sancion_id ?? null,
          involucrados: sancion.value?.fecha_registro ?? null,
        };
      }

      tiposSancionResponse.value = await tiposSancionService.getTiposSancion();
      if (tiposSancionResponse.value) {
        tiposSancion.value = tiposSancionResponse.value.map((tipo) => ({
          label: tipo.descripcion,
          value: tipo.id,
        }));
      }
    }
  },
);

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>
