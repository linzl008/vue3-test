<template>
  <div class="bg">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <Meet @meetout="meetOut()" />
        </div>
        <div class="swiper-slide">
          <Appoint @meetout="meetOut()" />
        </div>
        <div class="swiper-slide">
          <rain />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue'
import Rain from '../../components/rain.vue'
import Meet from '../../components/meet.vue'
import Appoint from '../../components/appoint.vue'
import Swiper from '../../lib/swiper/swiper.js'
import '../../lib/swiper/components/autoplay/autoplay'
import '../../lib/swiper/components/effect-cube/effect-cube.js'
import '../../lib/swiper/components/effect-cube/effect-cube.scss'
let swiper: any = null
export default {
  components: {
    Rain,
    Appoint,
    Meet
  },
  setup () {
    const index = ref(0)
    function initSwiper () {
      swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        effect: 'cube',
        autoplay: false
      })
      console.log(swiper)
    }
    function meetOut () {
      console.log(swiper.activeIndex)
      swiper.slideNext()
    }
    onMounted(() => {
      console.log(1)
      initSwiper()
    })
    return {
      index,
      meetOut
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
