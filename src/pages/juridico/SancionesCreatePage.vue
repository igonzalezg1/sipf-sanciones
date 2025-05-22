<template>
  <div class="row" v-if="!sancion">
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
            <thead class="text-center text-white bg-primary">
              <tr>
                <th>#</th>
                <th>PPL</th>
                <th>Expediente</th>
                <th>Tipo de participación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ involucrado.nombre_completo }}</td>
                <td>{{ involucrado.identificador }}</td>
                <td>{{ involucrado.tipo_participacion?.label }}</td>
                <td>
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
    <div class="col-12">
      <q-btn
        v-if="sancionId == 0"
        class="q-mt-md"
        color="primary"
        label="Crear Sanción"
        @click="guardarSancion"
        icon="add"
      />
    </div>
  </div>
  <div class="row" v-if="sancion">
    <div class="col-12">
      <p class="tw-text-2xl">SANCION</p>
      <p class="tw-text-md">Fecha sesión de comite técnico: {{ sancion.fecha_registro }}</p>
      <p class="tw-text-md">Folio de sanción: {{ sancion.folio }}</p>
      <p class="tw-text-md">Tipo de sanción: {{ sancion.tipo_sancion.label }}</p>
      <p class="tw-text-md">Etapa de la sanción: {{ sancion.etapa_sancion }}</p>
      <p class="tw-text-md">Estatus de la sanción: {{ sancion.estatus_sancion }}</p>
    </div>
    <div class="col-12">
      <q-stepper v-model="step" vertical color="primary" animated>
        <q-step :name="1" title="OPCIONES DE SANCION" icon="settings" :done="step > 1">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-center text-white text-h6 bg-primary"
                >Sanción</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="text-center q-pa-md">
              <q-btn
                class="q-ma-sm"
                color="primary"
                label="Ver sanción"
                v-if="!eneableEditSancion(sancion)"
                @click="
                  () => {
                    isReadonly = true;
                    showEdiModal = true;
                  }
                "
                icon="visibility"
              />
              <q-btn
                class="q-ma-sm"
                color="primary"
                label="Editar sanción"
                v-if="eneableEditSancion(sancion)"
                @click="
                  () => {
                    isReadonly = false;
                    showEdiModal = true;
                  }
                "
                icon="edit_document"
              />
              <q-btn
                class="q-ma-sm"
                color="primary"
                v-if="!eneableEditSancion(sancion)"
                label="Suspender sanción"
                icon="stop_circle"
              />
              <q-btn
                v-if="eneableDownloadDocument(sancion)"
                class="q-ma-sm"
                color="primary"
                label="Imprimir acta de sanción"
                @click="getPdf"
                icon="description"
              />
              <q-btn
                v-if="eneableDownloadDocument(sancion)"
                class="q-ma-sm"
                color="primary"
                label="Adjuntar acta de sanción"
                @click="showModalUpload = true"
                icon="attach_file"
              />
              <q-btn
                v-if="eneableShowDocument(sancion)"
                class="q-ma-sm"
                color="primary"
                label="Ver acta de sanción"
                @click="getPdfUploaded"
                icon="file_present"
              />
              <q-btn
                v-if="eneableSendSecurity(sancion)"
                class="q-ma-sm"
                color="primary"
                label="Enviar a seguridad"
                @click="mandarSeguridad"
                icon="send"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 2"
              color="primary"
              label="Continuar"
              v-if="eneableControversia(sancion)"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="OPCIONES CONTROVERSIA"
          icon="create_new_folder"
          v-if="eneableControversia(sancion)"
          :done="step > 2"
        >
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-center text-white text-h6 bg-primary"
                >CONTROVERSIA</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <!-- Solicitud de controversia -->
              <q-btn
                v-if="puedeAgregarControversia(sancion)"
                class="q-mx-lg"
                color="primary"
                label="agregar controversia"
                icon="playlist_add"
                @click="agregarControversia"
              />
              <q-btn
                v-if="puedeEditarControversia(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar solicitud de controversia"
                icon="visibility"
                @click="editarControversia"
              />

              <q-btn
                v-if="puedeVerControversia(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar solicitud de controversia"
                icon="visibility"
                @click="verControversia"
              />

              <q-btn
                v-if="puedeMandarComite(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a comité técnico"
                icon="visibility"
                @click="enviarComiteTecnico"
              />
              <!-- Resolucion de controversia -->
              <q-btn
                v-if="puedeAgregarResolucion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Agregar resolución de controversia"
                icon="playlist_add"
                @click="agregarResolucionControversia"
              />
              <q-btn
                v-if="puedeEditarResolucion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar resolución de controversia"
                icon="visibility"
                @click="editResolucionControversia"
              />
              <q-btn
                v-if="puedeVerResolucion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar resolución de controversia"
                icon="visibility"
                @click="verResolucionControversia"
              />

              <q-btn
                v-if="puedeMandarSeguridad(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a seguridad"
                icon="visibility"
                @click="enviarSeguridadControversia"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 4"
              color="primary"
              label="Continuar"
              v-if="puedeVerResolucion(sancion)"
            />
            <q-btn flat @click="step = 1" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="OPCIONES APELACION DE LA CONTROVERSIA" icon="add_comment">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-center text-white text-h6 bg-primary"
                >APELACION DE LA CONTROVERSIA</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn @click="step = 5" color="primary" label="Continuar" />
            <q-btn flat @click="step = 2" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
        <q-step :name="5" title="OPCIONES AMPARO" icon="add_comment">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-center text-white text-h6 bg-primary"
                >AMPARO</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn flat @click="step = 4" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div>

  <UploadFileModal
    v-model="showModalUpload"
    @upload-success="actualizarInfo"
    :sancionId="sancion.id"
    v-if="sancion"
  />
  <AgregarControversiaModal
    v-model="controversiaCreateModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />

  <ShowEditModal v-model="showEdiModal" :readonly="isReadonly" />
  <showEditcontroversiaModal
    :controversiaEditModal="controversiaEditModal"
    :isReadonlyControversia="isReadonlyControversia"
    @update:controversiaEditModal="controversiaEditModal = $event"
    @upload-success="actualizarInfo"
  />
  <AgregarSolicitudControversiaModal
    v-model="agregarResolucionControversiaM"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />

  <ShowEditControversiaResolucionModal
    v-model="verditcontroversiaModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
// Modelos
import type { SancionInvolucrado } from 'entities/sancion/sancion-involucrados';
import type { SancionData, SancionCreate, TipoSancion } from 'src/entities/sancion/sancion.model';
// Helpers
import {
  eneableControversia,
  eneableDownloadDocument,
  eneableShowDocument,
  eneableSendSecurity,
  eneableEditSancion,
} from 'src/app/helpers/sanciones/validaciones';
import {
  puedeAgregarControversia,
  puedeEditarControversia,
  puedeVerControversia,
  puedeMandarComite,
  puedeAgregarResolucion,
  puedeEditarResolucion,
  puedeVerResolucion,
  puedeMandarSeguridad,
} from 'src/app/helpers/controversia/validaciones';
import { base64toBlob } from 'src/app/helpers/file-helper';
// Componentes
import UploadFileModal from './UploadFileModal.vue';
import AgregarControversiaModal from './controversia/AgregarControversiaModal.vue';
import InputText from 'src/shared/ui/InputText.vue';
import SelectCustom from 'src/shared/ui/SelectCustom.vue';
import ShowEditModal from './ShowEditModal.vue';
import showEditcontroversiaModal from './controversia/ShowEditControversiaModal.vue';
import AgregarSolicitudControversiaModal from './controversia/AgregarResolucionControversiaModal.vue';
import ShowEditControversiaResolucionModal from './controversia/ShowEditResolucionControversiaModal.vue';
// Servicios
import { CatalogsService } from 'src/app/services/catalogs/CatalogsService';
import { SancionesService } from 'src/app/services/sanciones/sancionesService';
import { ControversiaService } from 'src/app/services/sanciones/controversiaService';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const sancionesService = new SancionesService();
const tiposSancionService = new CatalogsService();
const controversiaService = new ControversiaService();
const router = useRouter();
const $q = useQuasar();
// Variables de modales
const showModalUpload = ref(false);
const controversiaCreateModal = ref(false);
const showEdiModal = ref(false);
const controversiaEditModal = ref(false);
const agregarResolucionControversiaM = ref(false);
const verditcontroversiaModal = ref(false);
// Variables
const incidencia = ref(incidenciaStore.getIncidencia());
const step = ref(1);
const sancionId = ref(0);
const tiposSancionResponse = ref<TipoSancion[] | null>([]);
const involucradosSelected = ref<SancionInvolucrado[]>([]);
const sancion = ref<SancionData | null>(null);
const tiposSancion = ref<object[]>([]);
const isReadonly = ref(false);
const isReadonlyControversia = ref(false);
const isReadonlyResolucionControversia = ref(false);

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

const selected = ref<Record<number, boolean>>({});

// Funciones
// Funcion de inicio
onMounted(async (): Promise<void> => {
  if (incidencia.value.sanciones) {
    sancion.value = incidencia.value.sanciones.data[0];
  }

  tiposSancionResponse.value = await tiposSancionService.getTiposSancion();
  if (tiposSancionResponse.value) {
    tiposSancion.value = tiposSancionResponse.value.map((tipo) => ({
      label: tipo.descripcion,
      value: tipo.id,
    }));
  }

  console.log('Incidencia', incidencia.value);
});
// Watchers
watch(
  () => Number(dataForm.value.dias_sancion),
  (newValue: number) => {
    if (isNaN(newValue) || !dataForm.value.fecha_registro) return;
    const fechaInicio = new Date(dataForm.value.fecha_registro);
    fechaInicio.setDate(fechaInicio.getDate() + 3);
    dataForm.value.fecha_hora_inicio_sancion = fechaInicio.toISOString().substring(0, 10);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + newValue);
    dataForm.value.fecha_hora_fin_sancion = fechaFin.toISOString().substring(0, 10);
  },
);

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

/**
 * Funcion para guardar la sancion
 * @returns
 */
async function guardarSancion(): Promise<void> {
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

  const response = await sancionesService.agregarSancion(payload);
  if (response !== null) {
    $q.notify({
      type: 'positive',
      message: 'Sanción guardada correctamente',
    });
    await router.push({
      path: '/sanciones-juridico',
    });
  }
}

/**
 * Funcion para obtener el pdf de la sancion
 * @returns
 */
async function getPdf(): Promise<void> {
  const response = await sancionesService.generarPdf(sancion.value?.id);
  if (response) {
    const base_ = response.base64Pdf;
    const base64Data = base_.replace(/^data:application\/pdf;base64,/, '');
    const blob = base64toBlob(base64Data, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  }
}

/**
 * Funcion para obtener el pdf de la sancion
 * @returns
 */
function actualizarInfo(): void {
  sancion.value = JSON.parse(localStorage.getItem('sanciones') || '{}');
  incidencia.value = incidenciaStore.getIncidencia();
}

/**
 * Funcion para obtener el pdf de la sancion
 * @returns
 */
function getPdfUploaded(): void {
  const fileUrl = `${import.meta.env.VITE_API_STORAGE_URL}${sancion.value?.sancion_file}`;
  window.open(fileUrl, '_blank');
}

/**
 * Funcion para enviar la sancion a seguridad
 * @returns
 */
async function mandarSeguridad(): Promise<void> {
  const response = await sancionesService.mandarSeguridad(sancion.value?.id);
  if (response) {
    await router.push({
      path: '/sanciones-juridico',
    });
    $q.notify({
      type: 'positive',
      message: 'Sanción enviada a seguridad correctamente',
    });
  }
}

function agregarControversia(): void {
  controversiaCreateModal.value = true;
}

function editarControversia(): void {
  controversiaEditModal.value = true;
  isReadonlyControversia.value = false;
}

function verControversia(): void {
  controversiaEditModal.value = true;
  isReadonlyControversia.value = true;
}

function agregarResolucionControversia(): void {
  agregarResolucionControversiaM.value = true;
}

function editResolucionControversia(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

function verResolucionControversia(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

async function enviarComiteTecnico(): Promise<void> {
  const response = await controversiaService.enviarComiteTecnico(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  $q.notify({
    type: 'positive',
    message: 'Sanción enviada a comité técnico correctamente',
  });
}

async function enviarSeguridadControversia(): Promise<void> {
  const response = await controversiaService.enviarSeguridad(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  $q.notify({
    type: 'positive',
    message: 'Controversia enviada a seguridad correctamente',
  });
}
</script>
<style scoped></style>
