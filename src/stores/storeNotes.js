import { defineStore } from 'pinia'
import { ref } from "vue";

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In adipisci odio asperiores neque. Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?',
    },
    {
      id: 2,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit?`,
    },
    {
      id: 3,
      content: `Lorem ipsum dolor sit amet consectetur dipisci odio asperiores neque. Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?`,
    },
    {
      id: 4,
      content: `Lorem ipsum dolor sit amet consectetur Facere ut, neque, blanditiis maxime voluptas dolore nihil inventore expedita itaque delectus molestiae? Laboriosam ullam ipsam ut?`,
    },
  ])


  return {
    notes
  }
})