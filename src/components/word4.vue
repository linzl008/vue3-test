<template>
  <div class="lucky">
    <canvas class="can" ref="can" ></canvas>
    <canvas ref="heartCan" width=50 height=60 style="display:none;"></canvas>
  </div>
</template>

<script>
import { random } from 'lodash-es'
import createjs from 'createjs-cmd'
import { calPx, getRatio } from '../utils/tool'
const HEART_COUNT = 20
const HEART_MOVE_TIME_LOW_LIMIT = 1000
const HEART_MOVE_TIME_HIGH_LIMIT = 1500
function drawHeart (ctx, x, y, R, rot, color) {
  function heartPath (ctx) {
    ctx.beginPath()
    ctx.arc(-1, 0, 1, Math.PI, 0, false)
    ctx.arc(1, 0, 1, Math.PI, 0, false) // 貝塞尔曲线画心
    ctx.bezierCurveTo(1.9, 1.2, 0.6, 1.6, 0, 3.0)
    ctx.bezierCurveTo(-0.6, 1.6, -1.9, 1.2, -2, 0)
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
function drawStar (context, R, r, x, y, rot) {
  context.beginPath()
  for (let i = 0; i < 5; i++) {
    context.lineTo(x + Math.cos((18 + 72 * i - rot) / 180 * Math.PI) * R,
      y - Math.sin((18 + 72 * i - rot) / 180 * Math.PI) * R)
    context.lineTo(x + Math.cos((54 + 72 * i - rot) / 180 * Math.PI) * r,
      y - Math.sin((54 + 72 * i - rot) / 180 * Math.PI) * r)
  }
  context.closePath()
  context.fillStyle = '#fb3'
  context.strokeStyle = '#fd5'
  context.lineWidth = 3
  context.lineJoin = 'round'
  context.fill()
  context.stroke()
}
function drawFStar (ctx, w, h, x, y) {
  const radW = 1 / 5
  const radH = 1 / 10
  ctx.strokeStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + -radW * w, y + (1 - radH) * h)
  ctx.lineTo(x + -w, y + h)
  ctx.lineTo(x + -radW * w, y + (1 + radH) * h)
  ctx.lineTo(x, y + 2 * h)
  ctx.lineTo(x + radW * w, y + (1 + radH) * h)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x + radW * w, y + (1 - radH) * h)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.fillStyle = '#dcdcdc'
  ctx.fill()
  ctx.stroke()
}
function startDrawTextAndHeart (container, heartCan, y, x, texts) {
  return new Promise(resolve => {
    const textAnimInfos = texts.split('').map((item, index) => {
      const text = new createjs.Text(item, calPx(50) * getRatio() + 'px myfont', '#545D4B')
      text.x = x
      text.y = y + index * calPx(60) * getRatio()
      text.rotation = 0
      text.scale = random(1.2, 1.5)
      return text
    })
    let i = 0
    function renderText () {
      const text = textAnimInfos[i]
      container.addChild(text)
      createjs.Tween.get(text).to({ rotation: 0, scale: random(0.8, 1) }, 100).call(() => {
        if (i >= texts.length) {
          resolve()
        }
      })
      i++
      if (i < texts.length) {
        setTimeout(renderText, 100)
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
        heart.scale = random(0.2, 1)
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
      // renderHeart()
    }, 100)
  })
}
export default {
  name: 'Lucky',
  mounted () {
    const heartCan = this.$refs.heartCan
    const heartCtx = heartCan.getContext('2d')
    // drawHeart(heartCtx, 25, 25, calPx(5), 0, '#92faff')
    // const r = Math.random() * 5 + 5
    // const rot = Math.random() * 360
    // drawStar(heartCtx, r, r / 2, 10, 10, rot)
    const w = calPx(5)
    const h = calPx(10)
    drawFStar(heartCtx, w, h, w, h)
    const can = this.$refs.can
    can.width = window.innerWidth * getRatio()
    can.height = window.innerHeight * getRatio()
    can.style.width = window.innerWidth + 'px'
    can.style.height = window.innerHeight + 'px'
    const context = can.getContext('2d')
    context.scale(getRatio(), getRatio())
    const stage = new createjs.Stage(can)
    const container = new createjs.Container()
    stage.addChild(container);
    (async () => {
      // 误佳期·完美结局
      // 千金难求珍宝
      // 家和易得欢笑
      // 人生自是有情痴
      // 原做双飞鸟
      // 情两难分付
      // 是一丝烦恼
      // 蓦然回首神仙地
      // 还道人间好
      const list = ['千金难求珍宝', '家和易得欢笑', '人生自是有情痴',
        '原做双飞鸟',
        '情两难分付',
        '是一丝烦恼',
        '蓦然回首神仙地',
        '还道人间好']
      for (let i = 0; i < list.length; i++) {
        const heartCtx1 = list[i]
        await startDrawTextAndHeart(container, heartCan, 80 * getRatio(), calPx(650 - 60 * i) * getRatio(), heartCtx1)
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
    z-index: 0;
  }
</style>
