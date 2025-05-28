<template>
  <q-dialog
    :model-value="props.controversiaEditModal"
    @update:model-value="$emit('update:controversiaEditModal', $event)"
    persistent
  >
    <q-card style="width: 800px; max-width: 95vw">
      <q-card-section class="bg-primary text-white text-center tw-shadow-lg">
        <div class="text-h6">Editar controversia.</div>
      </q-card-section>
      <q-card-section class="q-py-md">
        <div class="text-h6">Incidencia: {{ incidencia?.folio }}</div>
        <div class="tw-text-md">Tipo incidencia: {{ incidencia?.tipo_incidente?.label }}</div>
        <div class="tw-text-md">Fecha incidencia: {{ incidencia?.fecha_hora_registro }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-md" v-if="sancion">
        <div class="text-h6">Sancion: {{ sancion.folio }}</div>
        <div class="tw-text-md">Tipo sancion: {{ sancion?.tipo_sancion?.label }}</div>
        <div class="tw-text-md">Fecha sancion: {{ sancion?.fecha_hora_registro }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-md" v-if="sancion">
        <div class="text-h6 text-center">involucrados</div>
        <table class="q-table">
          <thead class="text-center bg-primary text-white">
            <tr>
              <th>#</th>
              <th>PPL</th>
              <th>Expediente</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(involucrado, index) in incidencia?.involucrados?.data" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ involucrado.nombre_completo }}</td>
              <td>{{ involucrado.identificador }}</td>
              <td>{{ involucrado.ubicacion }}</td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="q-mb-md">
          <q-banner
            v-if="mostrarBanner && !props.isReadonlyControversia"
            dense
            class="tw-bg-amber-400 text-white relative-position q-pa-md"
            style="padding-right: 3rem"
          >
            <q-btn
              flat
              dense
              icon="close"
              @click="mostrarBanner = false"
              class="absolute-top-right q-ma-sm"
              color="white"
            />

            <template v-slot:avatar>
              <q-icon name="warning" color="white" />
            </template>

            recuerda que si la controversia es antes o durante la sanción solo tienes 3 días para
            que se pueda pausar la misma a partir de que se creó y asignó comité técnico.
          </q-banner>

          <q-form ref="formulario">
            <select-custom
              v-model="formData.cuando_aplica"
              :options="optionsCuandoAplica"
              label="cuando aplica la controversia *"
              clearable
              :rules="EditValidator.cuando_aplica"
              :readonly="props.isReadonlyControversia"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="gavel" />
              </template>
            </select-custom>
            <input-text
              v-model="formData.fecha_solicitud"
              label="Fecha de admisión de controversia *"
              clearable
              :rules="EditValidator.fecha_solicitud"
              :readonly="props.isReadonlyControversia"
              type="date"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
              </template>
            </input-text>
            <input-text
              v-model="formData.numero_sesion"
              label="Número de sesión"
              placeholder="Escribe el número de sesión *"
              clearable
              :rules="EditValidator.numero_sesion"
              :readonly="props.isReadonlyControversia"
              class="q-ma-md"
              type="text"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </input-text>
            <input-text
              v-model="formData.organo_jurisdiccional"
              label="Órgano jurisdiccional que determino la controversia *"
              placeholder="Escribe el Órgano jurisdiccional que determino la controversia"
              clearable
              :rules="EditValidator.organo_jurisdiccional"
              :readonly="props.isReadonlyControversia"
              class="q-ma-md"
              type="text"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </input-text>
            <input-text
              v-model="formData.observaciones"
              label="Observaciones de la controversia"
              clearable
              :rules="EditValidator.observaciones"
              :readonly="props.isReadonlyControversia"
              type="textarea"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="visibility" />
              </template>
            </input-text>
            <q-uploader
              v-if="!props.isReadonlyControversia"
              :url="uploadUrl"
              method="POST"
              :headers="uploadHeaders"
              accept=".pdf"
              :max-file-size="10 * 1024 * 1024"
              :max-files="1"
              :filter="checkFileType"
              @rejected="onRejected"
              @uploaded="onUploaded"
              @failed="onUploadFailed"
              @added="onFileAdded"
              label="Agregar controversia (máx. 10MB) *"
              :auto-upload="false"
              field-name="file"
              :form-fields="formFields"
              class="q-mx-md tw-w-96 text-center"
            />
            <q-btn
              v-if="!filePreviewUrl"
              label="Ver archivo actual"
              color="positive"
              class="q-mx-md tw-w-96"
              @click="goToFile"
            />
            <q-card v-if="filePreviewUrl" class="q-ma-md" flat bordered>
              <q-card-section>
                <div class="text-subtitle2 q-mb-sm">Vista previa del PDF</div>
                <iframe :src="filePreviewUrl" width="100%" height="400px"></iframe>
                <q-btn
                  color="negative"
                  label="Cerrar vista previa"
                  @click="clearPreview"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          label="Guardar"
          v-if="!props.isReadonlyControversia"
          color="positive"
          @click="saveInfo"
        />
        <q-btn
          label="Limpiar"
          v-if="!props.isReadonlyControversia"
          color="info"
          @click="clearForm"
        />
        <q-btn label="Cancelar" color="negative" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Imports
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import type { QRejectedEntry } from 'quasar';
// Components
import InputText from 'src/shared/ui/InputText.vue';
import SelectCustom from 'src/shared/ui/SelectCustom.vue';
// Modelos
import type { ControversiaCreate } from 'src/entities/controversia/controversia.model.ts';
import type { SancionData } from 'src/entities/sancion/sancion.model';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
import { useSessionStore } from 'src/stores/session';
// Services
import { ControversiaService } from 'src/app/services/sanciones/controversiaService';
// Validators
import EditValidator from 'src/app/validators/controversia/edit.validator';
// Variables
const emit = defineEmits<{
  (e: 'update:controversiaEditModal', value: boolean): void;
  (e: 'upload-success'): void;
}>();
const props = defineProps({
  controversiaEditModal: { type: Boolean, required: true },
  isReadonlyControversia: { type: Boolean, required: true },
});
const formFields = computed(() => [
  { name: '_method', value: 'PUT' }, // Method spoofing para Laravel
]);
// Stores
const incidenciaStore = useIncidenciaStore();
const sessionStore = useSessionStore();
const $q = useQuasar();
const controversiaService = new ControversiaService();
const incidencia = incidenciaStore.getIncidencia();
const formulario = ref();
const token = sessionStore.token;
const sancion = ref<SancionData | null>(incidencia.sanciones.data[0] ?? null);
const uploadHeaders = [
  { name: 'Accept', value: 'application/json' },
  { name: 'Authorization', value: `Bearer ${token}` },
];
const mostrarBanner = ref(true);
const filePreviewUrl = ref<string | null>(null);

const formData = ref<ControversiaCreate>({
  cuando_aplica: sancion.value?.controversia?.cuando_aplica ?? '',
  fecha_solicitud: sancion.value?.controversia?.fecha_solicitud ?? '',
  numero_sesion: sancion.value?.controversia?.no_sesion_comite ?? '',
  organo_jurisdiccional: sancion.value?.controversia?.organo_jurisdiccional ?? '',
  observaciones: sancion.value?.controversia?.observaciones ?? '',
  controversia_file: sancion.value?.controversia?.controversia_file ?? '',
});

const validateCuandoAplica = () => {
  if (!sancion.value || !sancion.value.fecha_registro) {
    return [];
  }

  const fechaRegistro = new Date(sancion.value.fecha_registro);
  const fechaActual = new Date();
  const diffTime = fechaActual.getTime() - fechaRegistro.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays > 3) {
    return [{ label: 'Después de la sanción', value: 'despues' }];
  }

  return [
    { label: 'Antes de la sanción', value: 'antes' },
    { label: 'Durante la sanción', value: 'durante' },
    { label: 'Después de la sanción', value: 'despues' },
  ];
};

const storageURL = ref<string>('');
const urlAmbiente = () => {
  const ambiente = import.meta.env.VITE_APP_ENV;
  let baseURL;
  switch (ambiente) {
    case 'LOCAL':
      baseURL = import.meta.env.VITE_APP_API_URL_LOCAL;
      storageURL.value = import.meta.env.VITE_API_STORAGE_URL_LOCAL;
      break;
    case 'TEST':
      baseURL = import.meta.env.VITE_APP_API_URL_TEST;
      storageURL.value = import.meta.env.VITE_API_STORAGE_URL_TEST;
      break;
    case 'QA':
      baseURL = import.meta.env.VITE_APP_API_URL_QA;
      storageURL.value = import.meta.env.VITE_API_STORAGE_URL_QA;
      break;
    case 'PROD':
      baseURL = import.meta.env.VITE_APP_API_URL_PROD;
      storageURL.value = import.meta.env.VITE_API_STORAGE_URL_PROD;
      break;
    default:
      baseURL = import.meta.env.VITE_APP_API_URL_TEST;
      storageURL.value = import.meta.env.VITE_API_STORAGE_URL_TEST;
  }
  return baseURL;
};
const uploadUrl = `${urlAmbiente()}/tecnico/seguridad/sancion/uploadFile`;
const optionsCuandoAplica = validateCuandoAplica();

// Funciones
const closeModal = () => {
  localStorage.removeItem('archivo');
  emit('update:controversiaEditModal', false);
};

const checkFileType = (files: readonly File[]) => {
  return files.filter((file: File) => file.type === 'application/pdf');
};

const onRejected = (rejectedEntries: QRejectedEntry[]) => {
  rejectedEntries.forEach((entry: QRejectedEntry) => {
    if (entry.failedPropValidation === 'accept') {
      $q.notify({
        type: 'negative',
        message: 'Solo se permiten archivos PDF',
      });
    }
    if (entry.failedPropValidation === 'max-file-size') {
      $q.notify({
        type: 'negative',
        message: 'El archivo excede el límite de 10MB',
      });
    }
  });
};

const onUploaded = (info: { files: readonly File[]; xhr: XMLHttpRequest }) => {
  const response = JSON.parse(info.xhr.response);
  localStorage.setItem('archivo', JSON.stringify(response));
  $q.notify({
    type: 'positive',
    message: 'Archivo subido correctamente',
  });
};

const onUploadFailed = (info: { files: readonly File[]; xhr: XMLHttpRequest }) => {
  $q.notify({
    type: 'negative',
    message: 'Error al subir el archivo',
    caption: info.xhr.response ? JSON.parse(info.xhr.response).message : 'Error desconocido',
  });
};

const saveInfo = async () => {
  await formulario.value.validate().then(async (exito: boolean) => {
    if (!exito) {
      $q.notify({
        type: 'negative',
        message: 'Por favor, completa todos los campos requeridos',
      });
      return;
    }
    const filename = JSON.parse(localStorage.getItem('archivo') ?? '{}');
    if (filename.path) {
      try {
        formData.value.controversia_file = filename.path;
        const incidente_id = incidencia.id;
        const sancion_id = sancion.value?.id;
        if (!incidente_id || !sancion_id) {
          $q.notify({
            type: 'negative',
            message: 'Error al obtener el incidente o la sanción',
          });
          return;
        }
        const response = await controversiaService.agregarSancion(
          incidente_id,
          sancion_id,
          formData.value,
        );

        incidenciaStore.setIncidencia(response);
        localStorage.removeItem('archivo');
        localStorage.setItem('sanciones', JSON.stringify(response));
        emit('upload-success');
        closeModal();
        $q.notify({
          type: 'positive',
          message: 'Controversia editada correctamente',
        });
      } catch (error: unknown) {
        let message = 'Error inesperado';
        if (error instanceof Error) {
          message = error.message;
        }

        $q.notify({
          type: 'negative',
          message,
        });
        return;
      }
    } else {
      $q.notify({
        type: 'negative',
        message: 'No se ha subido ningún archivo',
      });
      return;
    }
  });
};

function onFileAdded(files: readonly File[]) {
  if (files.length && files[0]?.type === 'application/pdf') {
    filePreviewUrl.value = URL.createObjectURL(files[0]);
  }
}

function clearPreview() {
  if (filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value);
    filePreviewUrl.value = null;
  }
}

function clearForm() {
  formData.value = {
    cuando_aplica: '',
    fecha_solicitud: '',
    numero_sesion: '',
    organo_jurisdiccional: '',
    observaciones: '',
    controversia_file: '',
  };
  localStorage.removeItem('archivo');
  clearPreview();
}

function goToFile() {
  const actualFile = `${storageURL.value}/${sancion.value?.controversia?.file_name ?? ''}`;
  console.log(actualFile);
  if (actualFile) {
    window.open(actualFile, '_blank');
  } else {
    $q.notify({
      type: 'negative',
      message: 'No hay archivo disponible para mostrar',
    });
  }
}
</script>
