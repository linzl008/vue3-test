<template>
    <div class="container">
      <img class="meet" src="../assets/images/word/word1.png" alt="">
      <img class="time1" src="../assets/images/word/time1.png" alt="">
      <Word @show-pointer="showPointer" />
      <Pointer v-if="isShow" class="pointer" @click="$emit('meetout')"/>
      <div class="swiper-container-2">
        <div class="swiper-wrapper">
          <div v-for="(src, index) in pics" :key="index" class="swiper-slide">
            <div class="photo-box">
              <img class="photo" :src="src" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Word from './word2.vue'
import { Pointer } from './base/index.js'
import { ref, onMounted } from 'vue'
import Swiper from '../lib/swiper/swiper.js'
import '../lib/swiper/components/autoplay/autoplay'
// import '../lib/swiper/components/effect-cube/effect-cube.js'
// import '../lib/swiper/components/effect-cube/effect-cube.scss'
let swiper: any = null
export default {
  components: {
    Word,
    Pointer
  },
  emits: ['meetout'],
  setup () {
    const isShow = ref(false)
    const pics = [
      require('../assets/images/appoint/one.jpg'),
      require('../assets/images/appoint/one.jpg'),
      require('../assets/images/appoint/one.jpg'),
      require('../assets/images/appoint/one.jpg'),
      require('../assets/images/appoint/one.jpg'),
      require('../assets/images/appoint/one.jpg')
    ]
    function showPointer () {
      isShow.value = true
    }
    function initSwiper () {
      swiper = new Swiper('.swiper-container-2', {
        spaceBetween: 30,
        effect: 'coverflow',
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: {
          delay: 500 // 1秒切换一次
        },
        loop: true
      })
      console.log(swiper)
    }

    onMounted(() => {
      initSwiper()
    })
    return {
      showPointer,
      pics,
      isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/login/five.jpg");
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
  .swiper-container-2{
    position: absolute;
    width: 100%;
    bottom: 20%;
    height: 5rem;
  }
  .photo-box{
    width: 100%;
    height: 5rem;
    .photo{
      width: 100%;
      height: 5rem;
      object-fit: contain;
    }
  }
}
</style>
