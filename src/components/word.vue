<template>
  <div class="lucky">
    <canvas class="can" ref="can" ></canvas>
    <canvas ref="heartCan" width=50 height=60 style="display:none;"></canvas>
  </div>
</template>

<script>
import { random } from 'lodash-es'
import createjs from 'createjs-cmd'
import { calPx } from '../utils/tool'
const HEART_COUNT = 20
const HEART_MOVE_TIME_LOW_LIMIT = 1000
const HEART_MOVE_TIME_HIGH_LIMIT = 1500
function drawHeart (ctx, x, y, R, rot, color) {
  function heartPath (ctx) {
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      //因为角度是逆时针计算的，而旋转是顺时针旋转，所以是度数是负值。
      ctx.lineTo(x + Math.cos((18 + 72 * i - rot) / 180 * Math.PI) * R,
        y - Math.sin((18 + 72 * i - rot) / 180* Math.PI)* R);
      ctx.lineTo(x + Math.cos((54 + 72 * i - rot) / 180 * Math.PI)  * r,
        y - Math.sin((54 + 72 * i - rot) / 180 * Math.PI) * r);
    }
    // ctx.arc(-1, 0, 1, Math.PI, 0, false)
    // ctx.arc(1, 0, 1, Math.PI, 0, false) // 貝塞尔曲线画心
    // ctx.bezierCurveTo(1.9, 1.2, 0.6, 1.6, 0, 3.0)
    // ctx.bezierCurveTo(-0.6, 1.6, -1.9, 1.2, -2, 0)
    ctx.closePath()
  }
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot / 180 * Math.PI)
  ctx.scale(R, R)
  heartPath(ctx)
  ctx.fillStyle = color
  ctx.fill()
}
function startDrawTextAndHeart (container, heartCan, y, x, texts) {
  return new Promise(resolve => {
    const textAnimInfos = texts.split('').map((item, index) => {
      const text = new createjs.Text(item, calPx(50) + 'px monospace', '#fff')
      text.x = x + index * calPx(60)
      text.y = y
      text.rotation = random(-30, 30)
      text.scale = random(1.2, 1.5)
      return text
    })
    let i = 0
    function renderText () {
      const text = textAnimInfos[i]
      container.addChild(text)
      createjs.Tween.get(text).to({ rotation: 10, scale: random(0.8, 1) }, 100).call(() => {
        if (i >= texts.length) {
          resolve()
        }
      })
      i++
      if (i < texts.length) {
        setTimeout(renderText, 350)
      }
    }
    let j = 0
    function renderHeart () {
      const text = textAnimInfos[j]
      for (let i = 0; i < HEART_COUNT; i++) {
        const startX = text.x + random(0, 20)
        const startY = text.y + random(0, 20)
        const heart = new createjs.Bitmap(heartCan)
        heart.x = startX
        heart.y = startY
        heart.width = 10
        heart.height = 10
        heart.scale = random(0.5, 1)
        container.addChild(heart)
        createjs.Tween.get(heart).wait(0).to({ y: random(-1200, 1200), x: random(-1200, 1200), rotatation: random(0, 360) }, random(HEART_MOVE_TIME_LOW_LIMIT, HEART_MOVE_TIME_HIGH_LIMIT))
      }
      j++
      if (j < texts.length) {
        setTimeout(renderHeart, 350)
      }
    }
    setTimeout(() => {
      renderText()
      renderHeart()
    }, 200)
  })
}
export default {
  name: 'Lucky',
  mounted () {
    const heartCan = this.$refs.heartCan
    const heartCtx = heartCan.getContext('2d')
    drawHeart(heartCtx, 25, 25, calPx(5), 0, '#92faff')

    const can = this.$refs.can
    can.width = window.innerWidth
    can.height = window.innerHeight
    console.log(can)
    const stage = new createjs.Stage(can)
    const container = new createjs.Container()
    stage.addChild(container);
    (async () => {
      const list = ['长恨歌', '白居易', '汉皇重色思倾国',
        '御宇多年求不得',
        '杨家有女初长成',
        '养在深闺人未识']
      for (let i = 0; i < list.length; i++) {
        const heartCtx1 = list[i]
        await startDrawTextAndHeart(container, heartCan, 100 + calPx(80) * i, 15 + (12 - heartCtx1.length) * calPx(30), heartCtx1)
      }
    })()

    function tick () {
      stage.update()
    }
    createjs.Ticker.addEventListener('tick', tick)
    createjs.Ticker.setFPS(30)
  }
}
</script>

<style>
  body{
    /* background: #000; */
  }
</style>

<style scoped>
  .can {
    display:block;
    margin: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1;
  }
</style>
