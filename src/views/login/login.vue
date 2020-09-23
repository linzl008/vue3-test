<template>
  <div class="bg">
    <rain />
    <Word />
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue'
import Rain from '../../components/rain.vue'
import Word from '../../components/word.vue'
export default {
  components: {
    Rain,
    Word
  },
  setup () {
    const codeTime = reactive({ code: 0 })
    onMounted(() => {
      console.log(1)
    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.bg{
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/images/bg1.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  &-img{
    display: block;
    width: 100vw;
    height: 100vh;
    border: 0;
    outline-width: 0;
    padding: 0;
  }
  .rowup{
    font-size: 0;
    position: fixed;
    background: linear-gradient(to bottom, rgb(251,194,176), rgb( 213,92,97));
    //z-index: -1;
    display: flex;
    /*flex-direction: column;*/
    width: 100%;
    height: 100%;
    animation: 20s rowup ease-in-out infinite normal;
    /*position: relative;*/
    .bg-img:nth-child(2){
      left: 100%;
      transform: rotateY(180deg);
    }
    .bg-img:nth-child(3){
      left: 200%;
    }
    @keyframes rowup {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d( -200%, 0, 0);
      }
    }
  }
}
</style>
