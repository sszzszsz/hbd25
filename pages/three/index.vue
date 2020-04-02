<template>
  <main class="main">
    <mousePointer />
    <canvas id="canvas" ref="canvas" class="artwork__canvas" />
  </main>
</template>

<script>
import Vue from 'vue'
import ArtworkGL from '../../components/webgl/js/artworkGL'
import mousePointer from '~/components/mousePointer.vue'

export default Vue.extend({
  name: 'Artwork',
  components: {
    mousePointer
  },
  props: [],

  head() {
    return {
      title: 'three',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `好きなところ`
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: '好きなところ' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `好きなところ`
        }
      ]
    }
  },
  data() {
    // 基本的にはここにthree.jsのオブジェクトを追加しない。
    return {
      pontTxtList: [],
      linkTxt: '',
      isVisible: false,
      menuFlag: false
    }
  },
  mounted() {
    // canvas要素を渡す。
    this.artworkGL = new ArtworkGL({
      $canvas: this.$refs.canvas
    })
  },
  destroyed() {
    // canvasを作ったり壊したりする前提の場合はここに処理停止する処理を書く（今回省略）。
  },
  methods: {
    // この中にthree.jsの処理をばりばり書かない。
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  --main-color: #bf4040;
  overflow: hidden;
}
.artwork__canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
