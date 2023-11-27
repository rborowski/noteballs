<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> Number of notes </td>
          <td>{{ storeNotes.getTotalNotesCount }}</td>
        </tr>
        <tr>
          <td> Number of characters </td>
          <td>{{ storeNotes.getTotalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      class="input"
      placeholder="Do you love Noteballs?"
      maxlength="50"
      v-model="statsInput"
      type="text"
      v-autofocus
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/storeNotes";
import { vAutofocus } from "../directives/vAutofocus"
import { useWatchCharacters } from "../use/useWatchCharacters";

const storeNotes = useNotesStore()

const statsInput = ref('')

useWatchCharacters(statsInput, 50)

</script>