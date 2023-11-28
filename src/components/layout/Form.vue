<template>
  <div class="card mb-5 p-4 " :class="`has-background-${bgColor}-dark`">
    <div class="field">
      <div class="control">
        <label for="textarea" class="label has-text-white">{{ label }}</label>
        <textarea
          :placeholder="placeholder"
          :value="modelValue"
          @keydown.enter.exact.prevent="$emit('enter-submit')"
          @input="$emit('update:modelValue', $event.target.value)"
          id="textarea"
          class="textarea"
          ref="textarea"
          v-autofocus
          maxlength="300"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "../../directives/vAutofocus"

const props = defineProps({
  modelValue: { type: String, required: true },
  bgColor: { type: String },
  placeholder: { type: String },
  label: { type: String },
  isEdit: { type: Boolean, default: false }
})

const textarea = ref(null)

function focusTextarea() {
  textarea.value.focus()
}

defineExpose({ focusTextarea })

</script>