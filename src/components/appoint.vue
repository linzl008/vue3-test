<template>
    <div class="container">
      <img class="meet" src="../assets/images/word/word1.png" alt="">
      <img class="time1" src="../assets/images/word/time1.png" alt="">
      <Word @show-pointer="showPointer"/> 
      <Pointer v-if="isShow" class="pointer" @click="$emit('meetout')"/>
    </div>
</template>

<script>
import Word from './word2.vue'
import { Pointer } from './base/index'
import { ref } from 'vue'
export default {
  components: {
    Word,
    Pointer
  },
  emits: ['meetout'],
  setup () {
    const isShow = ref(false)
    function showPointer () {
      isShow.value = true
    }
    return {
      showPointer,
      isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/login/one.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  .meet{
    position: absolute;
    bottom: 20px;
    width: 2rem;
    right: .4rem
  }
  .time1{
    position: absolute;
    width: .5rem;
    bottom: 10px;
    right: .1rem
  }
  .pointer{
    position: absolute;
    bottom: 10%;
    left: 50%;
  }
}
</style>
