<template>
  <div class="bg">
    <img @click="toggleMusic()" class="music" :class="music?'rotate':''" src="../../assets/images/music.png" alt="">
    <audio ref="audio" class="audio" controls autoplay loop>
      <source src="../../assets/audio/uw.mp3" type="audio/mpeg">
    </audio>
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
  setup: function () {
    const index = ref(0)
    const music = ref(true)
    const audio = ref<any>(null)

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

    function toggleMusic () {
      console.log(audio)
      if (music.value) {
        audio.value.pause()
      } else {
        audio.value.play()
      }
      music.value = !music.value
    }

    onMounted(() => {
      console.log(1)
      initSwiper()
    })
    return {
      index,
      music,
      audio,
      meetOut,
      toggleMusic
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
  .music{
    position: fixed;
    top:.5rem;
    right: .5rem;
    width: 1rem;
    z-index: 2;
    opacity: .5;
  }
  .rotate{
    animation: rotate linear 10s infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .audio{
    display: none;
  }
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
