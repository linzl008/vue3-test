<template>
  <div class="loading-bg" :class="!loadingPage?'left-out':''">
    <div v-if="!loadingFinish" class="box">
      <div class="word">
        <span>加</span>
        <span>载</span>
        <span>中</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div class="bar">
        <div class="inner-bar" :style="{width: progress + '%' }"><span>{{progress}}%</span></div>
      </div>
    </div>
    <div v-else class="start" @click="clickFinish">
      敬<br/>启
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue'
import Pics from '@/data/data'
export default {
  emits: ['finish'],
  setup (props: any, context: any) {
    const progress = ref(0)
    const loadingFinish = ref(false)
    const loadingPage = ref(true)
    function changePro (step: number) {
      const timer = setInterval(() => {
        if (progress.value >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            loadingFinish.value = true
          }, 1000)
        } else {
          if (progress.value + step > 100) {
            progress.value = 100
          } else {
            progress.value += step
          }
        }
      }, 500)
    }
    function clickFinish () {
      loadingPage.value = false
      setTimeout(() => {
        context.emit('finish')
      }, 1000)
    }
    function preload () {
      let imgs: string[] = []
      for (let i = 0; i < Pics.length; i++) {
        console.log(Pics[i])
        imgs = imgs.concat(Pics[i])
      }
      console.log(imgs)
      const step = Math.ceil(100 / imgs.length)
      for (const img of imgs) {
        const image = new Image()
        image.src = img
        image.onload = () => {
          changePro(step)
        }
      }
    }
    onMounted(() => {
      preload()
    })
    return {
      progress,
      clickFinish,
      loadingPage,
      loadingFinish
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-bg{
  background-color: rgb(32,10,15);
  background-image: url("../assets/images/login/loading.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  display: flex;
  left: 0;
  transform: rotateY(0);
  align-items: center;
  transition: 1s ease-in-out transform;
  .box{
    width: 100%;
  }
  .word{
    font-size: .6rem;
    margin-bottom: .2rem;
    color: rgb(186,161,116);
    span{
      position: relative;
    }
    span:nth-child(2n+1){
      top: -.1rem;
      animation: down-up linear .5s infinite alternate;
    }
    span:nth-child(2n){
      top: .1rem;
      animation: up-down linear .5s infinite alternate;
    }
    @keyframes up-down {
      0% {
        top: .1rem;
      }
      100% {
        top: -.1rem;
      }
    }
    @keyframes down-up {
      0% {
        top: -.1rem;
      }
      100% {
        top: .1rem;
      }
    }
  }
  .bar{
    width: 90%;
    height: .20rem;
    background: #c6c5c5;
    margin: auto;
    border-radius: .1rem;
    .inner-bar{
      text-align: right;
      line-height: .2rem;
      border-radius: .1rem;
      background: rgb(186, 161, 116);
      height: 100%;
      color: #fff;
      transition: .5s width linear;
      span{
        position: relative;
        top: -.5rem;
        line-height: .2rem;
        font-size: .2rem;
      }
    }
  }
  .start{
    box-sizing:content-box ;
    position: relative;
    border-radius: 50%;
    background: transparent;
    color: #fff;
    width: 2rem;
    line-height: .8rem;
    height: 2rem;
    display: flex;
    font-size: .8rem;
    align-items: center;
    justify-content: center;
    margin: auto;
    border: .1rem solid #BAA174 ;
  }
  .circle{
    box-sizing:content-box ;
    position: absolute;
    top: -.12rem;
    left: -.12rem;
    height: 2.2rem;
    width: 2.2rem;
    border: .02rem solid #BAA174;
    box-shadow: 0 0 .12rem #BAA174, 0 0 .20rem #BAA174 inset;
    animation: warn 2s ease-out both;
    animation-iteration-count: infinite;
    border-radius: 50%;
  }
  .circle1{
    animation-delay: 1s;
  }
  .circle2{
    animation-delay: .6s;
  }
  .circle3{
    animation-delay: .2s;
  }
  @keyframes warn {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
}
.left-out{
  // left: -100%;
  transform: rotateY(90deg);
  transform-origin: left;
}
</style>
