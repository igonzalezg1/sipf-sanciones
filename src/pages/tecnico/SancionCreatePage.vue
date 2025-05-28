<template>
  <div class="row q-pa-md" v-if="!sancion">
    <h2 class="text-center">Aun no han capturado la sancion</h2>
  </div>
  <div class="row q-pa-md" v-if="sancion">
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
                color="positive"
                label="Ver sanción"
                v-if="!eneableEditSancion(sancion)"
                @click="
                  () => {
                    showSancionModal = true;
                  }
                "
                icon="visibility"
              />
              <q-btn
                v-if="eneableShowDocument(sancion)"
                class="q-ma-sm"
                color="positive"
                label="Ver acta de sanción"
                @click="getPdfUploaded"
                icon="file_present"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 2"
              color="positive"
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
              <q-btn
                v-if="puedeVerControversia(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar solicitud de controversia"
                icon="visibility"
                @click="verControversia"
              />
              <q-btn
                v-if="puedeVerResolucion(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar resolución de controversia"
                icon="visibility"
                @click="verResolucionControversia"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 4"
              color="positive"
              label="Continuar"
              v-if="puedeVerResolucion(sancion)"
            />
            <q-btn @click="step = 1" color="negative" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="OPCIONES APELACION DE LA CONTROVERSIA"
          icon="add_comment"
          :done="step > 2"
        >
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-center text-white text-h6 bg-primary"
                >APELACION DE LA CONTROVERSIA</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn
                v-if="puedeVerApelacion(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar solicitud de apelacion"
                icon="visibility"
                @click="verApelacion"
              />
              <q-btn
                v-if="puedeVerResolucionApelacion(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar resolución de apelacion"
                icon="visibility"
                @click="verResolucionApelacion"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 5"
              color="positive"
              label="Continuar"
              v-if="puedeVerResolucionApelacion(sancion)"
            />
            <q-btn @click="step = 2" color="negative" label="Ver anterior" class="q-ml-sm" />
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
              <q-btn
                v-if="puedeVerAmparo(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar solicitud de amparo"
                icon="visibility"
                @click="verAmparo"
              />
              <q-btn
                v-if="puedeVerResolucionAmparo(sancion)"
                class="q-mx-lg"
                color="positive"
                label="Consultar resolución de amparo"
                icon="visibility"
                @click="verResolucionAmparo"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn @click="step = 4" color="negative" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div>

  <ShowEditModal v-model="showEdiModal" :readonly="isReadonly" />
  <ShowSancionModal v-model="showSancionModal" />

  <showEditcontroversiaModal
    :controversiaEditModal="controversiaEditModal"
    :isReadonlyControversia="isReadonlyControversia"
    @update:controversiaEditModal="controversiaEditModal = $event"
    @upload-success="actualizarInfo"
  />

  <ShowEditControversiaResolucionModal
    v-model="verditcontroversiaModal"
    :isReadonlyShowControversia="isReadonlyResolucionControversia"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
  <ShowEditApelacionModal
    v-model="apelacionEditModal"
    :isReadonlyApelacion="isReadonlyApelacion"
    @upload-success="actualizarInfo"
  />

  <ShowEditResolucionApelacionModal
    v-model="verditApelacionModal"
    :isReadonlyResolucionApelacion="isReadonlyResolucionApelacion"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
  <ShowEditAmparoModal
    v-model="amparoEditModal"
    :isReadonlyAmparo="isReadonlyAmparo"
    @upload-success="actualizarInfo"
  />

  <ShowEditResolucionAmparoModal
    v-model="verditAmparoModal"
    :isReadOnly="isReadonlyResolucionAmparo"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// Modelos
import type { SancionData, TipoSancion } from 'src/entities/sancion/sancion.model';
// Helpers
import {
  eneableControversia,
  eneableShowDocument,
  eneableEditSancion,
} from 'src/app/helpers/sanciones/validaciones';
import {
  puedeVerControversia,
  puedeVerResolucion,
} from 'src/app/helpers/controversia/validaciones';

import {
  puedeVerApelacion,
  puedeVerResolucionApelacion,
} from 'src/app/helpers/apelaciones/validaciones';

import { puedeVerAmparo, puedeVerResolucionAmparo } from 'src/app/helpers/amparo/validaciones';
// Componentes
import ShowEditModal from './ShowEditModal.vue';
import ShowSancionModal from './ShowSancionModal.vue';
import showEditcontroversiaModal from './controversia/ShowEditControversiaModal.vue';
import ShowEditControversiaResolucionModal from './controversia/ShowEditResolucionControversiaModal.vue';
import ShowEditApelacionModal from './apelacion/ShowEditApelacionModal.vue';
import ShowEditResolucionApelacionModal from './apelacion/ShowEditResolucionApelacionModal.vue';
import ShowEditAmparoModal from './Amparo/ShowEditAmparoModal.vue';
import ShowEditResolucionAmparoModal from './Amparo/ShowEditResolucionAmparoModal.vue';
// Servicios
import { CatalogsService } from 'src/app/services/catalogs/CatalogsService';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const tiposSancionService = new CatalogsService();
// Variables de modales
const showEdiModal = ref(false);
const showSancionModal = ref(false);
const controversiaEditModal = ref(false);
const verditcontroversiaModal = ref(false);
const apelacionEditModal = ref(false);
const verditApelacionModal = ref(false);
const amparoEditModal = ref(false);
const verditAmparoModal = ref(false);
// Variables
const incidencia = ref(incidenciaStore.getIncidencia());
const step = ref(1);
const tiposSancionResponse = ref<TipoSancion[] | null>([]);
const sancion = ref<SancionData | null>(null);
const tiposSancion = ref<object[]>([]);
const isReadonly = ref(false);
const isReadonlyControversia = ref(false);
const isReadonlyResolucionControversia = ref(false);
const isReadonlyApelacion = ref(false);
const isReadonlyResolucionApelacion = ref(false);
const isReadonlyAmparo = ref(false);
const isReadonlyResolucionAmparo = ref(false);

// Funciones
// Funcion de inicio
onMounted(async (): Promise<void> => {
  if (incidencia.value.sanciones) {
    sancion.value = incidencia.value.sanciones.data[0];
  }

  tiposSancionResponse.value = await tiposSancionService.getTiposSancion(
    incidencia.value.articulo?.id || 0,
  );
  console.log('Tipos de sanción', tiposSancionResponse.value);
  if (tiposSancionResponse.value) {
    tiposSancion.value = tiposSancionResponse.value.map((tipo) => ({
      label: tipo.descripcion,
      value: tipo.id,
    }));
  }
});

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
  const fileUrl = `${urlAmbiente()}${sancion.value?.sancion_file}`;
  window.open(fileUrl, '_blank');
}

const urlAmbiente = () => {
  const ambiente = import.meta.env.VITE_APP_ENV;
  let baseURL;
  switch (ambiente) {
    case 'LOCAL':
      baseURL = import.meta.env.VITE_API_STORAGE_URL_LOCAL;
      break;
    case 'TEST':
      baseURL = import.meta.env.VITE_API_STORAGE_URL_TEST;
      break;
    case 'QA':
      baseURL = import.meta.env.VITE_API_STORAGE_URL_QA;
      break;
    case 'PROD':
      baseURL = import.meta.env.VITE_API_STORAGE_URL_PROD;
      break;
    default:
      console.warn('Ambiente no reconocido, usando URL base por defecto.');
      baseURL = import.meta.env.VITE_APP_API_URL_TEST;
  }

  return baseURL;
};

function verControversia(): void {
  controversiaEditModal.value = true;
  isReadonlyControversia.value = true;
}

function verResolucionControversia(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

function verApelacion(): void {
  apelacionEditModal.value = true;
  isReadonlyApelacion.value = true;
}

function verResolucionApelacion(): void {
  verditApelacionModal.value = true;
  isReadonlyResolucionApelacion.value = true;
}

// Amparos
function verAmparo(): void {
  amparoEditModal.value = true;
  isReadonlyAmparo.value = true;
}

function verResolucionAmparo(): void {
  verditAmparoModal.value = true;
  isReadonlyResolucionAmparo.value = true;
}
</script>
<style scoped></style>
