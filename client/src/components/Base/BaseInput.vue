<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="name" :class="labelClass">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" :class="errorClass">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    name: String,
    label: String,
    placeholder: String,
    error: String,
    wrapperClass: String,
    labelClass: String,
    errorClass: String,
    inputClass: String,
  },
}
</script>
