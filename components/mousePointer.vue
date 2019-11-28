<template>
  <div class="cursor">
    <div ref="cursor" class="cursor_small" />
    <div ref="stalker" class="cursor_stalker">
      <p class="cursor_txt">
        <span class="cursor_action">click</span>
        <span class="cursor_action">next</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import TweenMax from 'gsap/TweenMax'
import { TweenMax } from 'gsap'

export default Vue.extend({
  data() {
    return {
      cursor: '',
      stalker: '',
      mouse: {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0
      }
    }
  },
  mounted() {
    // const cursorR = 20 // カーソルの半径
    this.cursor = this.$refs.cursor
    this.stalker = this.$refs.stalker
    const self = this
    // 上記のdivタグをマウスに追従させる処理
    document.addEventListener('mousemove', function(e) {
      self.mouseMove(e)
    })
    this.moveStalker()
  },
  methods: {
    mouseMove(e) {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
      TweenMax.set(this.cursor, {
        x: e.clientX,
        y: e.clientY
      })

      this.mouse.prevX = e.clientX
      this.mouse.prevY = e.clientY
    },
    moveStalker() {
      const self = this
      const easing = 0.15
      window.requestAnimationFrame(moveTarget)
      function moveTarget() {
        const stalkerY = Number(self.stalker.style.top.replace('px', '')) - 5
        const stalkerPosY = stalkerY + (self.mouse.y - stalkerY) * easing
        const stalkerX = Number(self.stalker.style.left.replace('px', '')) - 5
        const stalkerPosX = stalkerX + (self.mouse.x - stalkerX) * easing

        TweenMax.set(self.stalker, {
          top: stalkerPosY,
          left: stalkerPosX
        })
        self.id = requestAnimationFrame(moveTarget)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.cursor {
  pointer-events: none;
  &_small {
    pointer-events: none;
    position: fixed;
    z-index: 999;
    top: -4px;
    left: -4px;
    text-align: center;
    display: inline-block;
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
  }
  &_stalker {
    display: flex;
    align-items: center;
    pointer-events: none;
    position: fixed;
    // top: -20px;
    // left: -20px;
    width: 40px;
    height: 40px;
    border: 1px solid $red;
    border-radius: 50%;
    transform: translate(0, 0);
    z-index: 999;
  }
  &_txt {
    font-size: 10px;
    text-align: center;
    line-height: 1.2;
    font-family: 'Libre Baskerville', serif;
    letter-spacing: -0.1px;
  }
}

.SP,
.TB {
  .cursor {
    display: none;
  }
}
</style>
