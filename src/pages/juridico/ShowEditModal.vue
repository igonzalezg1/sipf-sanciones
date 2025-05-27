<template>
  <q-dialog :model-value="modelValue" persistent>
    <q-card style="width: 800px; max-width: 95vw">
      <q-card-section class="q-pt-none">
        <div class="text-h6" v-if="props.readonly">Detalles de la sanción</div>
        <div class="text-h6" v-else>Detalles de la sanción</div>
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
                    :readonly="props.readonly"
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
                    :readonly="props.readonly"
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
                    :readonly="props.readonly"
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
                    :readonly="dataForm.fecha_registro == '' || readonly"
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
                    :readonly="props.readonly"
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
                    :readonly="readonly"
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
                      <th v-if="!readonly"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ involucrado.nombre_completo }}</td>
                      <td>{{ involucrado.identificador }}</td>
                      <td>{{ involucrado.fecha_ingreso }}</td>
                      <td v-if="!readonly">
                        <q-checkbox
                          color="secondary"
                          :model-value="selected[involucrado.id] === true"
                          @update:model-value="(val) => handleCheckboxChange(incidencia.id, val)"
                        />
                      </td>
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
                    :readonly="readonly"
                    type="text"
                    :rules="sancionValidator.firmante_1_nombre"
                    class="q-ma-md"
                  >
                  </input-text>
                  <input-text
                    v-model="dataForm.firmante_1_cargo"
                    label="Cargo del firmante 1 *"
                    clearable
                    :readonly="readonly"
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
                    :readonly="readonly"
                    type="text"
                    :rules="sancionValidator.firmante_2_nombre"
                    class="q-ma-md"
                  >
                  </input-text>
                  <input-text
                    v-model="dataForm.firmante_2_cargo"
                    label="Cargo del firmante 2"
                    clearable
                    :readonly="readonly"
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

      <q-card-actions vertical class="justify-end">
        <q-btn v-if="!readonly" label="Actualizar" color="primary" @click="guardarSancion" />
        <q-btn label="Cerrar" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Imports
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
// Servicios
import { CatalogsService } from 'src/app/services/catalogs/CatalogsService';
import { SancionesService } from 'src/app/services/sanciones/sancionesService';
// Modelos
import type { SancionCreate, SancionData, TipoSancion } from 'entities/sancion/sancion.model';
import type { SancionInvolucrado } from 'entities/sancion/sancion-involucrados';
// Componentes
import InputText from 'src/shared/ui/InputText.vue';
import SelectCustom from 'src/shared/ui/SelectCustom.vue';
// Validators
import sancionValidator from 'src/app/validators/sancion/edit.validator';

// Variables
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const sancionesService = new SancionesService();
const tiposSancionService = new CatalogsService();
const incidencia = ref(incidenciaStore.getIncidencia());
const router = useRouter();
const $q = useQuasar();
// Variables
const formulario = ref();
const tiposSancionResponse = ref<TipoSancion[] | null>([]);
const involucradosSelected = ref<SancionInvolucrado[]>([]);
const tiposSancion = ref<object[]>([]);
const sancion = ref<SancionData | null>(null);
const selected = ref<Record<number, boolean>>({});
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
  tipo_sancion_id: sancion.value?.tipo_sancion?.value ?? 0,
  no_sesion_comite: sancion.value?.no_sesion_comite ?? '',
  fecha_registro: sancion.value?.fecha_registro ?? '',
  fecha_hora_inicio_sancion: sancion.value?.fecha_hora_inicio_sancion ?? '',
  fecha_hora_fin_sancion: sancion.value?.fecha_hora_fin_sancion ?? '',
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
          fecha_hora_inicio_sancion: sancion.value?.fecha_hora_inicio_sancion ?? '',
          fecha_hora_fin_sancion: sancion.value?.fecha_hora_fin_sancion ?? '',
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

        console.log('Sanción cargada:', sancion.value);
        console.log('Involucrados:', incidencia.value.involucrados?.data);
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

async function guardarSancion(): Promise<void> {
  await formulario.value.validate().then(async (exito: boolean) => {
    if (exito) {
      const payload = dataForm.value;
      payload.centro_id = incidencia.value.centro_id;

      Object.entries(selected.value).forEach(([id, isSelected]) => {
        if (isSelected) {
          involucradosSelected.value.push({
            incidente_id: incidenciaStore.getIncidencia().id,
            incidente_involucrados_id: id,
            sancion_id: 0,
            id: 0,
            involucrado_incidente: id,
          });
        }
      });

      payload.involucrados = JSON.stringify({ data: involucradosSelected.value });
      const sancionId = sancion.value?.id || 0;
      const response = await sancionesService.editarSancion(sancionId, payload);
      if (response !== null) {
        $q.notify({
          type: 'positive',
          message: 'Sanción guardada correctamente',
        });
        await router.push({
          path: '/juridico',
        });
      }
    } else {
      $q.notify({
        type: 'negative',
        message: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }
  });
}

watch(
  () => Number(dataForm.value.dias_sancion),
  (newValue: number) => {
    if (isNaN(newValue) || !dataForm.value.fecha_registro) return;

    const fechaRegistro = new Date(dataForm.value.fecha_registro);
    const fechaInicio = sumarDiasHabiles(fechaRegistro, 3);
    dataForm.value.fecha_hora_inicio_sancion = fechaInicio.toISOString().substring(0, 10);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + newValue);
    dataForm.value.fecha_hora_fin_sancion = fechaFin.toISOString().substring(0, 10);
  },
);

function sumarDiasHabiles(fecha: Date, cantidad: number): Date {
  const resultado = new Date(fecha);
  let diasSumados = 0;

  while (diasSumados < cantidad) {
    resultado.setDate(resultado.getDate() + 1);
    const dia = resultado.getDay();
    if (dia !== 0 && dia !== 6) {
      diasSumados++;
    }
  }

  return resultado;
}

/**
 * Funcion para obtener el id de la sancion
 * @param id
 * @param checked
 * @returns
 */
function handleCheckboxChange(id: number, checked: boolean): void {
  if (checked) {
    selected.value[id] = true;
  } else {
    delete selected.value[id];
  }
}
</script>
