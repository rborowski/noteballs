<template>
  <div class="modal is-active p-3">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button class="button is-danger" @click.prevent="storeNotes.deleteNote(id)">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNotesStore } from "../../stores/storeNotes"
import { onClickOutside } from '@vueuse/core'

function closeModal() {
  emit('update:modelValue', false)
}

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue"])

const storeNotes = useNotesStore()
const modalRef = ref(null)

onClickOutside(modalRef, closeModal)

function handleEscape(event) {
  if (event.key === "Escape") closeModal()
}

onMounted(() => document.addEventListener("keydown", handleEscape))
onUnmounted(() => document.removeEventListener("keydown", handleEscape))

</script>