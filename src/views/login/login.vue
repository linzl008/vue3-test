<template>
  <div class="bg">
    <Loading v-if="!loadingState" @finish="loadOver"></Loading>
    <img @click="toggleMusic()" class="music" :class="music?'rotate':''" src="../../assets/images/music.png" alt="">
    <audio ref="audio" class="audio" controls autoplay loop>
      <source :src="src" type="audio/mpeg">
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
          <Know @meetout="meetOut()" />
        </div>
        <div class="swiper-slide">
          <Together @meetout="meetOut()" />
        </div>
        <div class="swiper-slide">
          <Confession @meetout="meetOut()" @agree="agreeClick" />
        </div>
      </div>
    </div>
    <Sakura v-if="agree" />
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Rain from '../../components/rain.vue'
import Sakura from '../../components/sakura.vue'
import Meet from '../../components/meet.vue'
import Loading from '../../components/loading.vue'
import Appoint from '../../components/appoint.vue'
import Know from '../../components/know.vue'
import Together from '../../components/together.vue'
import Confession from '../../components/confession.vue'
import Swiper from '../../lib/swiper/swiper.js'
import '../../lib/swiper/components/autoplay/autoplay'
import '../../lib/swiper/components/effect-cube/effect-cube.js'
import '../../lib/swiper/components/effect-cube/effect-cube.scss'
let swiper: any = null
export default {
  components: {
    // Rain,
    Appoint,
    Together,
    Loading,
    Know,
    Confession,
    Sakura,
    Meet
  },
  setup: function () {
    const store = useStore()
    const loadingState = ref(false)
    const index = ref(0)
    const music = ref(true)
    const audio = ref<any>(null)
    const agree = ref(false)
    const src = ref("")
    src.value = require("../../assets/audio/bg.mp3")
    function initSwiper () {
      swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        loop: false,
        effect: 'cube',
        autoplay: false,
        on: {
          transitionEnd: (sw) => {
            store.dispatch('setIndex', sw.activeIndex)
          }
        }
      })
    }
    function meetOut () {
      swiper.slideNext()
    }
    function loadOver () {
      loadingState.value = true
      audio.value.play()
      store.dispatch('setIndex', 0)
    }
    function toggleMusic () {
      if (music.value) {
        audio.value.pause()
      } else {
        audio.value.play()
      }
      music.value = !music.value
    }
    function agreeClick () {
      agree.value = true
    }
    onMounted(() => {
      initSwiper()
    })
    return {
      index,
      music,
      audio,
      loadingState,
      agree,
      src,
      meetOut,
      loadOver,
      agreeClick,
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
  .swiper-slide{
    overflow: hidden;
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
