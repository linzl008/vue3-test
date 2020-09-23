<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup () {
    function initRain () {
      console.log('rain')
    }
    onMounted(() => {
      initRain()
    })
  }
}
</script>

<style scoped>
#canvas{
  /*position: fixed;*/
  width: 100%;
  height: 100vh;
  top:0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
