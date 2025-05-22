<template>
  <q-dialog v-model="visible" persistent full-width full-height>
    <q-card class="bg-transparent flex flex-center q-pa-xl"
      style="box-shadow: none; background-color: rgba(0, 0, 0, 0.4)">
      <div class="column items-center justify-center">
        <q-spinner size="50px" :color="color" />
        <div class="text-h6 text-center q-mt-md text-bold text-white">{{ message }}</div>
      </div>
    </q-card>
  </q-dialog>
</template>

/**
* Componente de carga global (pantalla completa) con spinner y mensaje configurable.
*
* Expuesto globalmente mediante `$loader` para facilitar su uso desde cualquier parte de la app.
*
* Métodos expuestos:
* - `show(text?: string, spinnerColor?: string)`: muestra el loader con texto opcional y color personalizado.
* - `hide()`: oculta el loader.
* - `setDefaults(text: string, color: string)`: configura el mensaje y color por defecto.
*/
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('Cargando...')
const color = ref('secondary')

/**
 * Muestra el loader con mensaje y color personalizados (opcional).
 * @param {string} [text] - Texto que se mostrará debajo del spinner.
 * @param {string} [spinnerColor] - Color del spinner (por defecto: "secondary").
 */
function show(text?: string, spinnerColor?: string) {
  if (text) message.value = text
  if (spinnerColor) color.value = spinnerColor
  visible.value = true
}
/**
 * Oculta el loader.
 */
function hide() {
  visible.value = false
}

/**
 * Configura valores por defecto del mensaje y color para futuras llamadas a `show()`.
 * @param {string} defaultText - Texto por defecto.
 * @param {string} defaultColor - Color por defecto.
 */
function setDefaults(defaultText: string, defaultColor: string) {
  message.value = defaultText
  color.value = defaultColor
}

defineExpose({ show, hide, setDefaults })
</script>
