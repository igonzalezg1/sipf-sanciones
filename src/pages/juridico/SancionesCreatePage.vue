<template>
  <div class="row q-pa-md" v-if="!sancion">
    <div class="col-12">
      <q-form ref="formulario">
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
              label="Tipo de sanción *"
              clearable
              :rules="sancionValidator.tipo_sancion_id"
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
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
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
              v-model="dataForm.observaciones"
              label="Observaciones de la sanción"
              clearable
              type="textarea"
              :rules="sancionValidator.observaciones"
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
              label="No de sesión de comite técnico *"
              clearable
              type="text"
              :rules="sancionValidator.no_sesion_comite"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="groups" />
              </template>
            </input-text>
            <input-text
              v-model="dataForm.dias_sancion"
              label="Días de sanción *"
              clearable
              type="number"
              :readonly="dataForm.fecha_registro == ''"
              :rules="sancionValidator.dias_sancion"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="lock" />
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
              type="textarea"
              :rules="sancionValidator.descripcion"
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
                <th>Fecha ingreso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ involucrado.nombre_completo }}</td>
                <td>{{ involucrado.identificador }}</td>
                <td>{{ involucrado.fecha_ingreso }}</td>
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
              label="Nombre del firmante 1 *"
              clearable
              type="text"
              :rules="sancionValidator.firmante_1_nombre"
              class="q-ma-md"
            >
            </input-text>
          </div>
          <div class="col-3">
            <input-text
              v-model="dataForm.firmante_1_cargo"
              label="Cargo del firmante 1 *"
              clearable
              type="text"
              :rules="sancionValidator.firmante_1_cargo"
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
              :rules="sancionValidator.firmante_2_nombre"
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
              :rules="sancionValidator.firmante_2_cargo"
              class="q-ma-md"
            >
            </input-text>
          </div>
        </div>
      </q-form>
    </div>
    <div class="col-12">
      <q-btn
        v-if="sancionId == 0"
        class="q-ma-md"
        color="positive"
        label="Crear Sanción"
        @click="guardarSancion"
        icon="add"
      />
      <q-btn
        v-if="sancionId == 0"
        class="q-ma-md"
        color="info"
        label="Limpiar formulario"
        @click="cleanForm"
        icon="edit"
      />

      <q-btn
        v-if="sancionId == 0"
        class="q-ma-md"
        color="negative"
        label="Cancelar"
        @click="$router.push({ path: '/juridico' })"
        icon="cancel"
      />
    </div>
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
                color="primary"
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
              <!-- solicitud de apelacion -->
              <q-btn
                v-if="puedeAgregarApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="agregar apelacion"
                icon="playlist_add"
                @click="agregarApelacion"
              />
              <q-btn
                v-if="puedeEditarApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar solicitud de apelacion"
                icon="visibility"
                @click="editarApelacion"
              />

              <q-btn
                v-if="puedeVerApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar solicitud de apelacion"
                icon="visibility"
                @click="verApelacion"
              />

              <q-btn
                v-if="puedeMandarComiteApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a comité técnico"
                icon="visibility"
                @click="enviarComiteTecnicoApelacion"
              />
              <!-- Resolucion de apelacion -->
              <q-btn
                v-if="puedeAgregarResolucionApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Agregar resolución de apelacion"
                icon="playlist_add"
                @click="agregarResolucionApelacion"
              />
              <q-btn
                v-if="puedeEditarResolucionApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar resolución de apelacion"
                icon="visibility"
                @click="editResolucionApelacion"
              />
              <q-btn
                v-if="puedeVerResolucionApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar resolución de apelacion"
                icon="visibility"
                @click="verResolucionApelacion"
              />

              <q-btn
                v-if="puedeMandarSeguridadApelacion(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a seguridad"
                icon="visibility"
                @click="enviarSeguridadApelacion"
              />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn
              @click="step = 5"
              color="primary"
              label="Continuar"
              v-if="puedeVerResolucionApelacion(sancion)"
            />
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
              <!-- solicitud de amparo -->
              <q-btn
                v-if="puedeAgregarAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="agregar amparo"
                icon="playlist_add"
                @click="agregarAmparo"
              />
              <q-btn
                v-if="puedeEditarAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar solicitud de amparo"
                icon="visibility"
                @click="editarAmparo"
              />

              <q-btn
                v-if="puedeVerAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar solicitud de amparo"
                icon="visibility"
                @click="verAmparo"
              />

              <q-btn
                v-if="puedeMandarComiteAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a comité técnico"
                icon="visibility"
                @click="enviarComiteTecnicoAmparo"
              />
              <!-- Resolucion de amparo -->
              <q-btn
                v-if="puedeAgregarResolucionAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Agregar resolución de amparo"
                icon="playlist_add"
                @click="agregarResolucionAmparo"
              />
              <q-btn
                v-if="puedeEditarResolucionAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Editar resolución de amparo"
                icon="visibility"
                @click="editResolucionAmparo"
              />
              <q-btn
                v-if="puedeVerResolucionAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Consultar resolución de amparo"
                icon="visibility"
                @click="verResolucionAmparo"
              />

              <q-btn
                v-if="puedeMandarSeguridadAmparo(sancion)"
                class="q-mx-lg"
                color="primary"
                label="Enviar a seguridad"
                icon="visibility"
                @click="enviarSeguridadAmparo"
              />
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
  <ShowEditModal v-model="showEdiModal" :readonly="isReadonly" />
  <ShowSancionModal v-model="showSancionModal" />

  <AgregarControversiaModal
    v-model="controversiaCreateModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
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
    :isReadonlyShowControversia="isReadonlyResolucionControversia"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />

  <AgregarApelacionModal
    v-model="apelacionCreateModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
  <ShowEditApelacionModal
    v-model="apelacionEditModal"
    :isReadonlyApelacion="isReadonlyApelacion"
    @upload-success="actualizarInfo"
  />

  <AgregarResolucionApelacionModal
    v-model="agregarResolucionApelacionM"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />

  <ShowEditResolucionApelacionModal
    v-model="verditApelacionModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
  <AgregarAmparoModal
    v-model="amparoCreateModal"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />
  <ShowEditAmparoModal
    v-model="amparoEditModal"
    :isReadonlyAmparo="isReadonlyAmparo"
    @upload-success="actualizarInfo"
  />

  <AgregarResolucionAmparoModal
    v-model="agregarResolucionAmparoM"
    @update:model-value="actualizarInfo"
    @upload-success="actualizarInfo"
  />

  <ShowEditResolucionAmparoModal
    v-model="verditAmparoModal"
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

import {
  puedeAgregarApelacion,
  puedeEditarApelacion,
  puedeVerApelacion,
  puedeMandarComiteApelacion,
  puedeAgregarResolucionApelacion,
  puedeEditarResolucionApelacion,
  puedeVerResolucionApelacion,
  puedeMandarSeguridadApelacion,
} from 'src/app/helpers/apelaciones/validaciones';

import {
  puedeAgregarAmparo,
  puedeEditarAmparo,
  puedeVerAmparo,
  puedeMandarComiteAmparo,
  puedeAgregarResolucionAmparo,
  puedeEditarResolucionAmparo,
  puedeVerResolucionAmparo,
  puedeMandarSeguridadAmparo,
} from 'src/app/helpers/amparo/validaciones';
import { base64toBlob } from 'src/app/helpers/file-helper';
// Componentes
import InputText from 'src/shared/ui/InputText.vue';
import SelectCustom from 'src/shared/ui/SelectCustom.vue';
import UploadFileModal from './UploadFileModal.vue';
import ShowEditModal from './ShowEditModal.vue';
import ShowSancionModal from './ShowSancionModal.vue';
import AgregarControversiaModal from './controversia/AgregarControversiaModal.vue';
import showEditcontroversiaModal from './controversia/ShowEditControversiaModal.vue';
import AgregarSolicitudControversiaModal from './controversia/AgregarResolucionControversiaModal.vue';
import ShowEditControversiaResolucionModal from './controversia/ShowEditResolucionControversiaModal.vue';
import AgregarApelacionModal from './apelacion/AgregarApelacionModal.vue';
import ShowEditApelacionModal from './apelacion/ShowEditApelacionModal.vue';
import AgregarResolucionApelacionModal from './apelacion/AgregarResolucionApelacionModal.vue';
import ShowEditResolucionApelacionModal from './apelacion/ShowEditResolucionApelacionModal.vue';
import AgregarAmparoModal from './Amparo/AgregarAmparoModal.vue';
import ShowEditAmparoModal from './Amparo/ShowEditAmparoModal.vue';
import AgregarResolucionAmparoModal from './Amparo/AgregarResolucionAmparoModal.vue';
import ShowEditResolucionAmparoModal from './Amparo/ShowEditResolucionAmparoModal.vue';
// Servicios
import { CatalogsService } from 'src/app/services/catalogs/CatalogsService';
import { SancionesService } from 'src/app/services/sanciones/sancionesService';
import { ControversiaService } from 'src/app/services/sanciones/controversiaService';
import { ApelacionService } from 'src/app/services/sanciones/ApelacionService';
import { AmparoService } from 'src/app/services/sanciones/AmparoService';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
// Validators
import sancionValidator from 'src/app/validators/sancion/create.validator';
// Stores
const incidenciaStore = useIncidenciaStore();
// Services
const sancionesService = new SancionesService();
const tiposSancionService = new CatalogsService();
const controversiaService = new ControversiaService();
const apelacionService = new ApelacionService();
const amparoService = new AmparoService();
const router = useRouter();
const $q = useQuasar();
// Variables de modales
const showModalUpload = ref(false);
const showEdiModal = ref(false);
const showSancionModal = ref(false);
const controversiaCreateModal = ref(false);
const controversiaEditModal = ref(false);
const agregarResolucionControversiaM = ref(false);
const verditcontroversiaModal = ref(false);
const apelacionCreateModal = ref(false);
const apelacionEditModal = ref(false);
const agregarResolucionApelacionM = ref(false);
const verditApelacionModal = ref(false);
const amparoCreateModal = ref(false);
const amparoEditModal = ref(false);
const agregarResolucionAmparoM = ref(false);
const verditAmparoModal = ref(false);
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
const isReadonlyApelacion = ref(false);
const isReadonlyResolucionApelacion = ref(false);
const isReadonlyAmparo = ref(false);
const isReadonlyResolucionAmparo = ref(false);
const formulario = ref();

const dataForm = ref<SancionCreate>({
  tipo_sancion_id: null,
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

  console.log('Incidencia', incidencia.value);
});
// Watchers
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

/**
 * Funcion para guardar la sancion
 * @returns
 */
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

      const response = await sancionesService.agregarSancion(payload);
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
  const fileUrl = `${urlAmbiente()}${sancion.value?.sancion_file}`;
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
      path: '/juridico',
    });
    $q.notify({
      type: 'positive',
      message: 'Sanción enviada a seguridad correctamente',
    });
  }
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
  isReadonlyResolucionControversia.value = false;
}

function verResolucionControversia(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

function agregarApelacion(): void {
  apelacionCreateModal.value = true;
}

function editarApelacion(): void {
  apelacionEditModal.value = true;
  isReadonlyApelacion.value = false;
}

function verApelacion(): void {
  apelacionEditModal.value = true;
  isReadonlyApelacion.value = true;
}

function agregarResolucionApelacion(): void {
  agregarResolucionApelacionM.value = true;
}

function editResolucionApelacion(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

function verResolucionApelacion(): void {
  verditApelacionModal.value = true;
  isReadonlyResolucionApelacion.value = true;
}

// Amparos
function agregarAmparo(): void {
  amparoCreateModal.value = true;
}

function editarAmparo(): void {
  amparoEditModal.value = true;
  isReadonlyAmparo.value = false;
}

function verAmparo(): void {
  amparoEditModal.value = true;
  isReadonlyAmparo.value = true;
}

function agregarResolucionAmparo(): void {
  agregarResolucionAmparoM.value = true;
}

function editResolucionAmparo(): void {
  verditcontroversiaModal.value = true;
  isReadonlyResolucionControversia.value = true;
}

function verResolucionAmparo(): void {
  verditAmparoModal.value = true;
  isReadonlyResolucionAmparo.value = true;
}

async function enviarComiteTecnico(): Promise<void> {
  const response = await controversiaService.enviarComiteTecnico(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

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

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

  $q.notify({
    type: 'positive',
    message: 'Controversia enviada a seguridad correctamente',
  });
}

async function enviarComiteTecnicoApelacion(): Promise<void> {
  const response = await apelacionService.enviarComiteTecnicoApelacion(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

  $q.notify({
    type: 'positive',
    message: 'Sanción enviada a comité técnico correctamente',
  });
}

async function enviarSeguridadApelacion(): Promise<void> {
  const response = await apelacionService.enviarSeguridadApelacion(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

  $q.notify({
    type: 'positive',
    message: 'Apelacion enviada a seguridad correctamente',
  });
}

async function enviarComiteTecnicoAmparo(): Promise<void> {
  const response = await amparoService.enviarComiteTecnicoAmparo(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

  $q.notify({
    type: 'positive',
    message: 'Sanción enviada a comité técnico correctamente',
  });
}

async function enviarSeguridadAmparo(): Promise<void> {
  const response = await amparoService.enviarSeguridadAmparo(
    incidencia.value.id,
    sancion.value?.id ?? null,
  );

  incidencia.value = response;
  sancion.value = incidencia.value.sanciones.data[0];

  localStorage.setItem('sanciones', JSON.stringify(incidencia.value.sanciones.data[0]));
  localStorage.setItem('incidencia', JSON.stringify(incidencia.value));
  window.location.reload();

  $q.notify({
    type: 'positive',
    message: 'Amparo enviado a seguridad correctamente',
  });
}

function cleanForm(): void {
  dataForm.value = {
    tipo_sancion_id: null,
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
  };
  involucradosSelected.value = [];
  selected.value = {};
}
</script>
<style scoped></style>
