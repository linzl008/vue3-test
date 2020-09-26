<template>
    <div class="container">
      <img class="meet" src="../assets/images/word/word5.png" alt="">
      <div class="date">{{date}}</div>
      <Word @show-pointer="showPointer"/>
      <div class="btns">
        <div class="btn" :class="hideDeny ? 'move-agree':''" @click="agreeClick">是</div>
        <div class="btn" :class="hideDeny ? 'deny-hide':''" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchcancel="onTouchEnd">否</div>
      </div>
    </div>
</template>

<script>
import Word from './word5.vue'
import { useStore } from 'vuex'
import { Pointer } from './base'
import { ref, onMounted, computed, watch } from 'vue'
export default {
  components: {
    Word
  },
  emits: ['meetout', 'agree'],
  setup (props, context) {
    const store = useStore()
    const isShow = ref(false)
    const date = ref(0)
    const hideDeny = ref(false)
    const index = computed(() => store.state.index)
    function showPointer () {
      isShow.value = true
    }
    function onTouchEnd (e) {
      e.stopPropagation()
      e.preventDefault()
      hideDeny.value = false
    }
    function onTouchStart (e) {
      console.log(e)
      e.stopPropagation()
      e.preventDefault()
      hideDeny.value = true
    }
    function agreeClick () {
      console.log('click')
      context.emit('agree')
    }
    function startCount () {
      const now = new Date().getTime()
      const startTime = new Date('2020/1/30 00:00:00').getTime()
      const total = Math.floor((now - startTime) / (24 * 60 * 60 * 1000))
      let count = 0
      const timer = setInterval(() => {
        if (count >= total) {
          count = total
          clearInterval(timer)
        } else {
          count += 7
        }
        date.value = count
      }, 20)
    }
    watch(index, () => {
      if (index.value === 4) {
        startCount()
      }
    })
    // onMounted(() => {
    //
    // })
    return {
      showPointer,
      onTouchEnd,
      onTouchStart,
      agreeClick,
      hideDeny,
      isShow,
      date
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/login/last.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  .meet{
    position: absolute;
    top: .20rem;
    height: 1rem;
    right: .3rem
  }
  .date{
    position: absolute;
    top: .15rem;
    height: 1rem;
    font-size: 1rem;
    right: 1.2rem;
    color: #4B1A20;
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
  .btns{
    display: flex;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    left: 20%;
    flex-direction: column;
    .btn{
      margin: .5rem 0;
      width: 1.5rem;
      border: 2px solid #4B1A20;
      color: #4B1A20;
      border-radius: 5px;
      font-family: myfont;
      background: transparent;
      line-height: .8rem;
      font-size: .6rem;
      transform: scale(1);
      transition: .5s all;
      position: relative;
      top: 0;
    }
    .deny-hide{
      transform: scale(0);
    }
    .move-agree{
      top: 1.8rem;
    }
  }
}
</style>
