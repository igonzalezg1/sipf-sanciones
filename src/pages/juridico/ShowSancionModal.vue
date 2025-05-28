<template>
  <q-dialog :model-value="modelValue" persistent>
    <q-card style="width: 800px; max-width: 95vw">
      <q-card-section class="q-pt-none">
        <div class="text-h6">Detalles de la sanción</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-pa-md">
          <div class="col-12">
            <q-form ref="formulario">
              <div class="row q-mx-md">
                <div class="col-12">
                  <p class="tw-text-2xl">INCIDENCIA</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="tw-text-lg q-mx-md tw-uppercase">
                    <span class="tw-font-semibold">Tipo de incidencia: </span
                    >{{ incidencia?.tipo_incidente?.label }}
                  </p>
                  <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
                    <span class="tw-font-semibold">Folio de incidencia:</span>
                    {{ incidencia?.folio }}
                  </p>
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
                <div class="col-12">
                  <input-text
                    v-model="dataForm.no_sesion_comite"
                    label="No de sesión de comite técnico *"
                    clearable
                    type="text"
                    :rules="sancionValidator.no_sesion_comite"
                    readonly
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="groups" />
                    </template>
                  </input-text>
                  <select-custom
                    v-model="dataForm.tipo_sancion_id"
                    :options="tiposSancion"
                    label="Tipo de sanción *"
                    clearable
                    :rules="sancionValidator.tipo_sancion_id"
                    readonly
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="gavel" />
                    </template>
                  </select-custom>
                  <input-text
                    v-model="dataForm.fecha_registro"
                    clearable
                    type="date"
                    label="Fecha sesión de comité técnico *"
                    :rules="sancionValidator.fecha_registro"
                    readonly
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.dias_sancion"
                    label="Días de sanción *"
                    clearable
                    type="number"
                    readonly
                    :rules="sancionValidator.dias_sancion"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="lock" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.fecha_hora_inicio_sancion"
                    label="Fecha inicio de sanción *"
                    clearable
                    type="date"
                    :rules="sancionValidator.fecha_hora_inicio_sancion"
                    class="q-ma-md"
                    readonly
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.fecha_hora_fin_sancion"
                    label="Fecha fin de sanción *"
                    readonly
                    type="date"
                    :rules="sancionValidator.fecha_hora_fin_sancion"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="calendar_month" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.descripcion"
                    label="Descripción de la sanción *"
                    clearable
                    readonly
                    type="textarea"
                    :rules="sancionValidator.descripcion"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="chat" />
                    </template>
                  </input-text>
                  <input-text
                    v-model="dataForm.observaciones"
                    label="Observaciones de la sanción"
                    clearable
                    readonly
                    type="textarea"
                    :rules="sancionValidator.observaciones"
                    class="q-ma-md"
                  >
                    <template #prepend>
                      <q-icon name="visibility" />
                    </template>
                  </input-text>
                </div>
              </div>
              <div class="row tw-uppercase">
                <div class="col-12">Involucrados</div>
                <table class="q-table">
                  <thead class="text-center text-white bg-primary">
                    <tr>
                      <th>#</th>
                      <th>PPL</th>
                      <th>Expediente</th>
                      <th>Fecha ingreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ involucrado.nombre_completo }}</td>
                      <td>{{ involucrado.identificador }}</td>
                      <td>{{ involucrado.fecha_ingreso }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row tw-uppercase">
                <div class="col-6">
                  <input-text
                    v-model="dataForm.firmante_1_nombre"
                    label="Nombre del firmante 1 *"
                    clearable
                    readonly
                    type="text"
                    :rules="sancionValidator.firmante_1_nombre"
                    class="q-ma-md"
                  >
                  </input-text>
                  <input-text
                    v-model="dataForm.firmante_1_cargo"
                    label="Cargo del firmante 1 *"
                    clearable
                    readonly
                    type="text"
                    :rules="sancionValidator.firmante_1_cargo"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
                <div class="col-6">
                  <input-text
                    v-model="dataForm.firmante_2_nombre"
                    label="Nombre del firmante 2"
                    clearable
                    readonly
                    type="text"
                    :rules="sancionValidator.firmante_2_nombre"
                    class="q-ma-md"
                  >
                  </input-text>
                  <input-text
                    v-model="dataForm.firmante_2_cargo"
                    label="Cargo del firmante 2"
                    clearable
                    readonly
                    type="text"
                    :rules="sancionValidator.firmante_2_cargo"
                    class="q-ma-md"
                  >
                  </input-text>
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="justify-center q-mt-xl">
        <q-btn label="Cerrar" color="negative" @click="closeModal" />
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
// Validators
import sancionValidator from 'src/app/validators/sancion/edit.validator';

// Variables
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const tiposSancionService = new CatalogsService();
const incidencia = ref(incidenciaStore.getIncidencia());
// Variables
const formulario = ref();
const tiposSancionResponse = ref<TipoSancion[] | null>([]);
const tiposSancion = ref<object[]>([]);
const sancion = ref<SancionData | null>(null);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const convertToDateFormat = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

const dataForm = ref<SancionCreate>({
  tipo_sancion_id: sancion.value?.tipo_sancion?.value ?? null,
  no_sesion_comite: sancion.value?.no_sesion_comite ?? '',
  fecha_registro: sancion.value?.fecha_registro ?? '',
  fecha_hora_inicio_sancion: convertToDateFormat(sancion.value?.fecha_hora_inicio_sancion ?? ''),
  fecha_hora_fin_sancion: convertToDateFormat(sancion.value?.fecha_hora_fin_sancion ?? ''),
  dias_sancion: sancion.value?.dias_sancion ?? '',
  observaciones: sancion.value?.observaciones ?? '',
  descripcion: sancion.value?.descripcion ?? '',
  firmante_1_nombre: sancion.value?.firmante_1_nombre ?? '',
  firmante_1_cargo: sancion.value?.firmante_1_cargo ?? '',
  firmante_2_nombre: sancion.value?.firmante_2_nombre ?? '',
  firmante_2_cargo: sancion.value?.firmante_2_cargo ?? '',
  involucrados: sancion.value?.involucrados ?? '',
  centro_id: sancion.value?.centro_id ?? null,
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
          no_sesion_comite: sancion.value?.no_sesion_comite ?? '',
          fecha_registro: sancion.value?.fecha_registro ?? '',
          fecha_hora_inicio_sancion: convertToDateFormat(
            sancion.value?.fecha_hora_inicio_sancion ?? '',
          ),
          fecha_hora_fin_sancion: convertToDateFormat(sancion.value?.fecha_hora_fin_sancion ?? ''),
          dias_sancion: sancion.value?.dias_sancion ?? '',
          observaciones: sancion.value?.observaciones ?? '',
          descripcion: sancion.value?.descripcion ?? '',
          firmante_1_nombre: sancion.value?.firmante_1_nombre ?? '',
          firmante_1_cargo: sancion.value?.firmante_1_cargo ?? '',
          firmante_2_nombre: sancion.value?.firmante_2_nombre ?? '',
          firmante_2_cargo: sancion.value?.firmante_2_cargo ?? '',
          centro_id: sancion.value?.centro_id ?? null,
          involucrados: sancion.value?.involucrados ?? null,
        };
      }

      tiposSancionResponse.value = await tiposSancionService.getTiposSancion(
        incidencia.value.articulo?.id || 0,
      );
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
