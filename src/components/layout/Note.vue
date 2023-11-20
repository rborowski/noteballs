<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ noteLength }} characters</small>
        </div>
      </div>
    </div>
    <footer class="card-footer ">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ note: { type: Object, required: true } })

const noteLength = computed(() => props.note.content.length)

</script>

<style scoped>
.content {
  white-space: pre-wrap;
}
</style>