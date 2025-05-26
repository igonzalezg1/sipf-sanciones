<template>
  <q-input
    outlined
    v-bind="inputProps"
    v-model="model"
    :type="type"
    :label="label"
    :dense="dense"
    :filled="filled"
    :readonly="readonly"
    :disable="disable"
    :placeholder="placeholder"
    :autofocus="autofocus"
    :rules="rules"
    :label-html="labelHtml"
    :mask="mask"
    :suffix="suffix"
    hide-bottom-space
    :hint="hint"
    :clearable="clearable"
    :debounce="debounce"
    class="tw-shadow-lg tw-rounded-lg tw-bg-white tw-text-gray-800 tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-primary focus:tw-border-primary tw-transition-all tw-duration-150"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>

    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: [String, Number, null],
  type: {
    type: String as () =>
      | 'text'
      | 'number'
      | 'password'
      | 'textarea'
      | 'email'
      | 'search'
      | 'tel'
      | 'file'
      | 'url'
      | 'time'
      | 'date'
      | 'datetime-local',
    default: 'text',
  },
  label: String,
  labelHtml: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  filled: Boolean,
  readonly: Boolean,
  disable: Boolean,
  placeholder: String,
  autofocus: Boolean,
  rules: Array as unknown as () => Array<(val: unknown) => boolean | string>,
  mask: String,
  suffix: String,
  hint: String,
  clearable: Boolean,
  debounce: Number,
  inputProps: Object,
});

const emits = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
</script>
