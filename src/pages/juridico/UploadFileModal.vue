<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card style="width: 800px; max-width: 95vw">
      <q-card-section class="bg-primary text-white text-center tw-shadow-lg">
        <div class="text-h6">Subir acta de sanción</div>
      </q-card-section>

      <q-card-section>
        <div class="q-mb-md">
          <input-text
            filled
            label="Tipo de Sanción"
            readonly
            v-model="sancion.descripcion"
            class="q-my-md"
          />
          <input-text
            filled
            label="Descripción de sanción"
            readonly
            v-model="sancion.tipo_sancion.label"
            class="q-my-md"
          />
        </div>
        <q-uploader
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
          label="Subir PDF (máx. 10MB)"
          :auto-upload="false"
          field-name="sancion_file"
          :form-fields="formFields"
          class="q-mt-md tw-w-96 text-center"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="Cancelar" color="negative" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import type { QRejectedEntry } from 'quasar';
import { useSessionStore } from 'src/stores/session';
import InputText from 'src/shared/ui/InputText.vue';

const sessionStore = useSessionStore();
const token = sessionStore.token;
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  sancionId: { type: Number, required: true },
});

const sancion = JSON.parse(localStorage.getItem('sanciones') ?? '{}');

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'upload-success'): void;
}>();

const $q = useQuasar();

const uploadUrl = computed(() => {
  return `${urlAmbiente()}/tecnico/seguridad/sanciones/${props.sancionId}/registro-fisico`;
});

const formFields = computed(() => [
  { name: '_method', value: 'PUT' }, // Method spoofing para Laravel
]);

const uploadHeaders = [
  { name: 'Accept', value: 'application/json' },
  { name: 'Authorization', value: `Bearer ${token}` },
  // No incluyas 'Content-Type': 'multipart/form-data' - el navegador lo establecerá automáticamente
];

const closeModal = () => {
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
  localStorage.setItem('sanciones', JSON.stringify(response));
  $q.notify({
    type: 'positive',
    message: 'Archivo subido correctamente',
  });
  emit('upload-success');
  closeModal();
};

const onUploadFailed = (info: { files: readonly File[]; xhr: XMLHttpRequest }) => {
  $q.notify({
    type: 'negative',
    message: 'Error al subir el archivo',
    caption: info.xhr.response ? JSON.parse(info.xhr.response).message : 'Error desconocido',
  });
};

const urlAmbiente = () => {
  const ambiente = import.meta.env.VITE_APP_ENV;
  let baseURL;
  switch (ambiente) {
    case 'LOCAL':
      baseURL = import.meta.env.VITE_APP_API_URL_LOCAL;
      break;
    case 'TEST':
      baseURL = import.meta.env.VITE_APP_API_URL_TEST;
      break;
    case 'QA':
      baseURL = import.meta.env.VITE_APP_API_URL_QA;
      break;
    case 'PROD':
      baseURL = import.meta.env.VITE_APP_API_URL_PROD;
      break;
    default:
      console.warn('Ambiente no reconocido, usando URL base por defecto.');
      baseURL = import.meta.env.VITE_APP_API_URL_TEST;
  }

  return baseURL;
};
</script>
