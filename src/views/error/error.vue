<template>
  <div class="bg">
    <div class="word" v-if="index < wordList.length - 1" @click="addCount">{{word}}</div>
    <router-link class="word" v-else to='/'>{{word}}</router-link>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { createWebHashHistory } from 'vue-router'
const history = createWebHashHistory()
export default {
  setup: function (props: any, context: any) {
    const index = ref(0)
    const word = ref('迷路了吗?')
    const wordList = reactive([
      '迷路了吗？',
      '为什么点进来？',
      '点击了没用的！',
      '都说没有用的啦',
      '再点击就回到开始的！',
      '迷路了吗？',
      '为什么点进来？',
      '点击了没用的！',
      '都说没有用的啦',
      '再点击就回到开始的！'
    ])
    function addCount() {
      index.value++
      word.value = wordList[index.value]

    }
    return {
      index,
      word,
      wordList,
      addCount
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
  display: flex;
  align-items: center;
  justify-content: center;
  .word{
    color:#fff;
    font-size: .6rem;
  }
}
</style>
