<template>
    <div class="container">
      <img class="meet" src="../assets/images/word/word3.png" alt="">
      <img class="time1" src="../assets/images/word/time3.png" alt="">
      <Word @show-pointer="showPointer" />
      <Pointer v-if="isShow" class="pointer" @click="$emit('meetout')"/>
      <div class="swiper-container-2">
        <div class="swiper-wrapper">
          <div v-for="(src, index) in pics" :key="index" class="swiper-slide">
            <div class="photo-box">
              <img class="photo" :src="src" alt="" @click="showBigImg(src)">
            </div>
          </div>
        </div>
      </div>
      <div class="big-img-box" :class="bigImg.isShow?'show':''">
        <img :src="bigImg.img" class="big-img" alt="" @click="hideBigImg">
      </div>
    </div>
</template>

<script lang="ts">
import Word from './word3.vue'
import { Pointer } from './base'
import { ref, onMounted, reactive } from 'vue'
import Swiper from '../lib/swiper/swiper.js'
import Pics from '@/data/data'
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
    const bigImg = reactive<{
      isShow: boolean;
      img: string;
    }>({
      isShow: false,
      img: ''
    })
    const pics = Pics[2]
    function showPointer () {
      isShow.value = true
    }
    function initSwiper () {
      swiper = new Swiper('.swiper-container-2', {
        // effect: 'coverflow',
        // slidesPerView: 3,
        // centeredSlides: true,
        // coverflowEffect: {
        //   rotate: 30,
        //   stretch: 10,
        //   depth: 60,
        //   modifier: 2,
        //   slideShadows: true
        // },
        autoplay: {
          delay: 1000 // 1秒切换一次
        },
        loop: true
      })
    }
    function hideBigImg () {
      bigImg.isShow = false
    }
    function showBigImg (src: string) {
      bigImg.img = src
      bigImg.isShow = true
    }
    onMounted(() => {
      initSwiper()
    })
    return {
      showPointer,
      showBigImg,
      hideBigImg,
      bigImg,
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
  background-image: url("../assets/images/login/three.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  overflow: hidden;
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
  .big-img-box{
    position: absolute;
    background: #000000;
    width: 0;
    height: 0;
    z-index: 10;
    transition: all .1s;
    .big-img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .big-img-box.show{
    width: 100%;
    height: 100%;
  }
}
</style>
