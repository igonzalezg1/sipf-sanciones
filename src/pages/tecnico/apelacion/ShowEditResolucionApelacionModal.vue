<template>
  <q-dialog
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card style="width: 800px; max-width: 95vw">
      <q-card-section class="text-center text-white bg-primary tw-shadow-lg">
        <div class="text-h6">Editar resolucion de apelacion.</div>
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
        <div class="text-center text-h6">involucrados</div>
        <table class="q-table">
          <thead class="text-center text-white bg-primary">
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
          <q-form ref="formulario">
            <input-text
              v-model="formData.fecha_resolucion"
              label="Fecha de resolución de apelacion"
              clearable
              :rules="EditValidator.fecha_resolucion"
              :readonly="isReadonlyResolucionApelacion"
              type="date"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
              </template>
            </input-text>

            <input-text
              v-model="formData.fecha_inicio_sancion"
              label="Fecha de inicio de la sanción"
              clearable
              :rules="EditValidator.fecha_inicio_sancion"
              :readonly="isReadonlyResolucionApelacion || esDisable()"
              type="date"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
              </template>
            </input-text>

            <input-text
              v-model="formData.fecha_fin_sancion"
              label="Fecha fin de la sanción"
              clearable
              :rules="EditValidator.fecha_fin_sancion"
              :readonly="isReadonlyResolucionApelacion || esDisable()"
              type="date"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
              </template>
            </input-text>

            <input-text
              v-model="formData.fecha_suspencion"
              label="Fecha de suspencion de la sanción"
              clearable
              :rules="EditValidator.fecha_suspencion"
              :readonly="isReadonlyResolucionApelacion"
              type="date"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="calendar_month" />
              </template>
            </input-text>

            <input-text
              v-model="formData.observaciones_resolucion"
              label="Observaciones de la apelacion"
              clearable
              :rules="EditValidator.observaciones_resolucion"
              :readonly="isReadonlyResolucionApelacion"
              type="textarea"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="visibility" />
              </template>
            </input-text>

            <input-text
              v-model="formData.resolucion_juez"
              label="Resolución  del Juez"
              clearable
              :rules="EditValidator.resolucion_juez"
              :readonly="isReadonlyResolucionApelacion"
              type="textarea"
              class="q-ma-md"
            >
              <template #prepend>
                <q-icon name="visibility" />
              </template>
            </input-text>
            <q-uploader
              v-if="!props.isReadonlyResolucionApelacion"
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
              label="Agregar resolución de apelacion (máx. 10MB)"
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
          v-if="!isReadonlyResolucionApelacion"
          color="positive"
          @click="saveInfo"
        />
        <q-btn
          label="limpiar"
          v-if="!isReadonlyResolucionApelacion"
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
import { useRouter } from 'vue-router';
// Components
import InputText from 'src/shared/ui/InputText.vue';
// Modelos
import type { ApelacionResolucionCreate } from 'entities/apelacion/apelacion.model';
import type { SancionData } from 'src/entities/sancion/sancion.model';
import type { Incidencia } from 'entities/incidente/incidente.model';
// Stores
import { useIncidenciaStore } from 'stores/incidencias';
import { useSessionStore } from 'src/stores/session';
// Services
import { ApelacionService } from 'src/app/services/sanciones/ApelacionService';
// Validators
import EditValidator from 'src/app/validators/apelacion/edit-resolucion.validator';

// Variables
const router = useRouter();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'upload-success'): void;
}>();
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  isReadonlyResolucionApelacion: { type: Boolean, default: false },
});
const formFields = computed(() => [
  { name: '_method', value: 'PUT' }, // Method spoofing para Laravel
]);
// Stores
const incidenciaStore = useIncidenciaStore();
const sessionStore = useSessionStore();
const $q = useQuasar();
const apelacionService = new ApelacionService();

const incidencia = incidenciaStore.getIncidencia();
const formulario = ref();
const token = sessionStore.token;
const sancion = ref<SancionData | null>(incidencia.sanciones.data[0] ?? null);
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
const uploadHeaders = [
  { name: 'Accept', value: 'application/json' },
  { name: 'Authorization', value: `Bearer ${token}` },
];
const filePreviewUrl = ref<string | null>(null);

function parseToInputDate(fecha: string): string {
  if (!fecha || typeof fecha !== 'string') return '';

  const date = new Date(fecha);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const formData = ref<ApelacionResolucionCreate>({
  fecha_resolucion: parseToInputDate(sancion.value?.apelacion?.fecha_resolucion ?? ''),
  fecha_inicio_sancion: parseToInputDate(sancion.value?.apelacion?.fecha_inicio_sancion ?? ''),
  fecha_fin_sancion: parseToInputDate(sancion.value?.apelacion?.fecha_fin_sancion ?? ''),
  observaciones_resolucion: sancion.value?.apelacion?.observaciones_resolucion ?? '',
  resolucion_juez: sancion.value?.apelacion?.resolucion_juez ?? '',
  apelacion_resolucion_file: '',
  fecha_suspencion: parseToInputDate(sancion.value?.apelacion?.fecha_suspencion ?? ''),
});

// Funciones
const closeModal = () => {
  localStorage.removeItem('archivo');
  emit('update:modelValue', false);
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
        formData.value.apelacion_resolucion_file = filename.path;
        const incidente_id = incidencia.id;
        const sancion_id = sancion.value?.id;
        if (!incidente_id || !sancion_id) {
          $q.notify({
            type: 'negative',
            message: 'Error al obtener el incidente o la sanción',
          });
          return;
        }
        const response = await apelacionService.guardarResolucionApelacion(
          incidente_id,
          sancion_id,
          formData.value,
        );

        incidenciaStore.setIncidencia(response as Incidencia);
        emit('upload-success');
        await router.push({
          path: '/juridico',
        });
        closeModal();
        $q.notify({
          type: 'positive',
          message: 'Resolucion de apelacion agregada correctamente',
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

const convertToDateFormat = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

function esDisable(): boolean {
  const cuandoAplica = sancion.value?.apelacion?.cuando_aplica;
  const fecha_actual = new Date();
  const fecha_fin = new Date(convertToDateFormat(sancion.value?.fecha_hora_fin_sancion ?? ''));
  console.log('Fecha fin:', fecha_fin);
  console.log('Fecha actual:', fecha_actual);
  if (cuandoAplica === 'despues') {
    return true;
  }
  if (fecha_fin < fecha_actual) {
    return true;
  }

  return false;
}

function clearForm() {
  formulario.value?.resetValidation();
  formData.value = {
    fecha_resolucion: '',
    fecha_inicio_sancion: '',
    fecha_fin_sancion: '',
    observaciones_resolucion: '',
    resolucion_juez: '',
    apelacion_resolucion_file: '',
    fecha_suspencion: '',
  };
  localStorage.removeItem('archivo');
  clearPreview();
}

function goToFile() {
  const actualFile = `${storageURL.value}/${sancion.value?.controversia?.file_name_resoluccion ?? ''}`;
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
