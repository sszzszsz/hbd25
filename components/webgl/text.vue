<template>
  <div id="canvasCont">
    <div id="app">
      <span ref="pointNum" v-html="pointNum" class="point_num" />
      <pointNumber />
      <div class="point_img">
        <canvas id="point_canvas" />
      </div>
      <div class="point_text_wrap">
        <p ref="pointText" v-html="pointText" class="point_text" />
        <p ref="pointSubText" v-html="pointSubText" class="point_text_sub" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import pointNumber from '~/components/pointNumber.vue'

export default Vue.extend({
  components: {
    pointNumber
  },
  props: {
    pointNum: {
      type: String,
      default: '01'
    },
    pointText: {
      type: String,
      default: '文字文字文字文字文字文字文字'
    },
    pointSubText: {
      type: String,
      default: '文字文字文字文字文字文字文字'
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log('textCanvas')
  }
})
</script>

<style lang="scss" scoped>
#canvasCont {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: #bf4040;
}
#app {
  margin: auto;
  width: 100%;
  height: 100%;
}

.point_num {
  -webkit-text-stroke: 1px #fff;
  color: transparent;
  font-family: 'Libre Baskerville', serif;
  font-weight: 400;
  @include tablet {
    font-size: spfz(75px);
  }
}
</style>
