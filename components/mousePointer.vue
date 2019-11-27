<template>
  <div ref="cursor" class="mouse_pointer">
    <span>click</span>
    <span>next</span>
  </div>
</template>
<script>
import Vue from 'vue'
// import TweenMax from 'gsap/TweenMax'
import { TweenMax } from 'gsap'
export default Vue.extend({
  data() {
    return {
      cursor: ''
    }
  },
  mounted() {
    // const cursorR = 20 // カーソルの半径
    this.cursor = this.$refs.cursor

    // 上記のdivタグをマウスに追従させる処理
    document.addEventListener('mousemove', function(e) {
      TweenMax.set(this.cursor, {
        x: e.clientX,
        y: e.clientY
      })
    })
  },
  methode: {
    pointer() {}
  }
})
</script>
<style lang="scss" scoped>
.mouse_pointer {
  position: fixed;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 50%;
  z-index: 999;
  font-size: 10px;
  text-align: center;
  transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
}
</style>
