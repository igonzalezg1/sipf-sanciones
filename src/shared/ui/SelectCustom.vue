<template>
  <q-select
    outlined
    v-bind="selectProps"
    v-model="model"
    :options="options"
    :label="label"
    :dense="dense"
    :filled="filled"
    :readonly="readonly"
    :disable="disable"
    :placeholder="placeholder"
    :autofocus="autofocus"
    :rules="rules"
    :hint="hint"
    :clearable="clearable"
    use-input
    emit-value
    map-options
    class="tw-shadow-md tw-rounded-lg tw-bg-white tw-text-gray-800 tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-primary focus:tw-border-primary tw-transition-all tw-duration-150"
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
  </q-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: [String, Number, Object, null],
  options: {
    type: Array as () => Array<unknown>,
    default: () => [],
  },
  label: String,
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
  hint: String,
  clearable: Boolean,
  selectProps: Object,
});

const emits = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
</script>
