import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//Module pattern
export const useThresholdStore = defineStore('threshold', () => {
  //Store variable working the same as a global variable (Singleton)
  const threshold = ref(0)
  function increment() {
    threshold.value++
  }

  return { threshold, increment }
})
