<template>
  <div id="canvasCont" @click="clickToGrid">
    <div id="app" />
  </div>
</template>

<script>
import Vue from 'vue'
import GridToFullscreenEffect from './webgl/js/GridToFullscreenEffect'

export default Vue.extend({
  name: 'GridToFullscreenEffect',

  data() {
    return {}
  },
  mounted() {
    console.log('GridToFullscreenEffect')
    // canvas要素を渡す。
    this.artworkGL = new GridToFullscreenEffect(
      document.getElementById('app'),
      document.getElementById('itemsWrapper'),
      // {
      //   duration: 1,
      //   timing: { type: 'sections', props: { latestStart: 0.5 } },
      //   activation: { type: 'radial', props: { onMouse: false } },
      //   transformation: {
      //     type: 'fluid',
      //     props: { amplitude: 2, frequency: 1.6, progressLimit: 0.1 }
      //   },
      //   randomizeSeed: 'tweenUnique',
      //   easings: { toFullscreen: 'Power2.easeOut', toGrid: 'Power3.easeIn' }
      // }
      {
        duration: 1,
        activation: { type: 'radial' },
        transformation: {
          type: 'wavy',
          props: { amplitude: 0.6, frequency: 1 }
        },
        seed: 800,
        easings: { toFullscreen: 'Power2.easeOut', toGrid: 'Power3.easeOut' }
      }
    )
    // {
    //   "timing":{"type":"sections"},
    // "activation":{"type":"side","props":{"top":true,"left":true,"bottom":true,"right":true}},
    // "transformation":{"type":"circle"},
    // "duration":1.25,
    // "randomizeSeed":"itemUnique",
    // "seed":10,
    // "easings":{"toFullscreen":"Cubic.easeOut","toGrid":"Cubic.easeOut"}
    // }
    // {
    //   "activation":{"type":"radial"},
    //   "transformation":{"type":"wavy","props":{"amplitude":0.6,"frequency":1}},
    //   "duration":2,
    //   "seed":800,
    //   "easings":{"toFullscreen":"Quart.easeOut","toGrid":"Quart.easeOut"}
    //   }

    // 写真を配列にしてテクスチャ生成
    const images = []
    for (let i = 0, imageSet = {}; i < document.querySelectorAll('img').length; i++) {
      const image = {
        element: document.querySelectorAll('img')[i],
        image: document.querySelectorAll('img')[i]
      }
      if (i % 2 === 0) {
        imageSet = {}
        imageSet.small = image
      }
      if (i % 2 === 1) {
        imageSet.large = image
        images.push(imageSet)
      }
    }

    // this.artworkGL.createTextures(images)
    this.artworkGL.init()

    // クリックしたらフルサイズにするか判定し実行
    // const targetImg = document.querySelectorAll('.point_item img.sumb')
    // for (let i = 0; i < targetImg.length; i++) {
    //   const target = targetImg[i]
    //   target.addEventListener('click', function() {
    //     console.log('click')
    //     if (artworkGL.isFullscreen) {
    //       artworkGL.toGrid()
    //     }
    //   })
    // }
  },
  methods: {
    clickToGrid() {
      console.log(this.artworkGL.isFullscreen)
      if (this.artworkGL.isFullscreen) {
        this.artworkGL.toGrid()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#canvasCont {
  position: fixed;
  // opacity: 0;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  overflow: hidden;
}
#app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  // width: 80vmax;
  // height: 80vmax;
  // width: 80vw;
  // height: 80vh;
  // border-radius: 50%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // pointer-events: none;
  opacity: 0;
}
</style>
