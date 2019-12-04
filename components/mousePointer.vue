<template>
  <div class="cursor">
    <div ref="cursor" class="cursor_small" />
    <div ref="stalker" class="cursor_stalker">
      <p class="cursor_txt">
        <span class="cursor_action">CLICK</span>
        <span v-html="pointerTxt" class="cursor_action" />
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as TweenMax from 'gsap/umd/TweenMax'

export default Vue.extend({
  props: {
    pointerTxt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cursor: '',
      stalker: '',
      mouse: {
        x: this.$store.state.global.mX,
        y: this.$store.state.global.mY,
        prevX: this.$store.state.global.mX,
        prevY: this.$store.state.global.mY
      }
    }
  },
  mounted() {
    // const cursorR = 20 // カーソルの半径
    console.log('mouse pointer')
    this.cursor = this.$refs.cursor
    this.stalker = this.$refs.stalker
    const self = this

    TweenMax.set(this.cursor, {
      x: this.mouse.x,
      y: this.mouse.y
    })
    TweenMax.set(this.stalker, {
      left: this.mouse.x,
      top: this.mouse.y
    })

    document.addEventListener('mousemove', function(e) {
      self.mouseMove(e)
    })
    this.moveStalker()
  },
  methods: {
    mouseMove(event) {
      const e = event
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
      TweenMax.set(this.cursor, {
        x: e.clientX,
        y: e.clientY
      })

      this.mouse.prevX = e.clientX
      this.mouse.prevY = e.clientY
      this.$store.dispatch('global/writemX', this.mouse.prevX)
      this.$store.dispatch('global/writemY', this.mouse.prevY)
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
    width: 60px;
    height: 60px;
    border: 1px solid var(--main-color);
    border-radius: 50%;
    transform: translate(0, 0);
    z-index: 999;
  }
  &_txt {
    width: 100%;
    font-size: 10px;
    text-align: center;
    line-height: 1.2;
    font-family: 'Libre Baskerville', serif;
    letter-spacing: -0.1px;
    color: var(--main-color);
  }
}

.SP,
.TB {
  .cursor {
    display: none;
  }
}
</style>
