<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ readersNumber }} {{ book.title }}</div>
    <div>double : {{ doubleNumber }}</div>
    <button @click="showAlert">弹框</button>
    <button @click="add">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, onUpdated, onUnmounted, watch, computed } from 'vue'

export default {
  setup () {
    const readersNumber = ref<number>(0)
    const doubleNumber = computed(() => readersNumber.value * 2)
    const book = reactive<{ title: string }>({ title: 'Vue 3 Guide' })
    watch(readersNumber, (newVal, oldVal) => {
      console.log({ newVal }, { oldVal })
    })
    console.log({ readersNumber })
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
    function add () {
      readersNumber.value++
    }
    function minus () {
      readersNumber.value--
    }
    function showAlert () {
      alert('hello word')
    }
    // expose to template
    return {
      readersNumber,
      doubleNumber,
      book,
      showAlert,
      add,
      minus
    }
  }
}
</script>
