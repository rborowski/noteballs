import { watch } from "vue";

export function useWatchCharacters (textToWatch, maxChars=100) {
  watch(textToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`only ${ maxChars } characters`)
    }
  })
}