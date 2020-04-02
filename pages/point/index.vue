<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <div id="canvasCont">
        <div id="app" />
      </div>
      <div
        :class="{
          'is-ready': this.$store.state.global.loadingEnd === true
        }"
        class="inr"
      >
        <h1 class="point_ttl">
          <!-- <svg>
            <text x="50" y="0" writing-mode="tb">
              HAPPY BIRTHDAY
            </text>
          </svg> -->
          <span>
            HAPPY BIRTHDAY
          </span>
        </h1>
        <ul id="itemsWrapper" class="point_list">
          <li
            v-for="point in pointData"
            v-bind:key="point.id"
            :id="['point-' + point.id]"
            class="point_item"
          >
            <div class="point_item_inr">
              <!-- <nuxt-link :to="'/point/' + point.id" class="point_item_inr"> -->
              <!-- <p class="point_num">No. {{ point.id }}</p>
              <p v-html="point.mainText" class="point_txt" />
              <p>{{ point.subText }}</p> -->
              <div
                v-lazy-container="{
                  selector: 'img',
                  error: imgRender('bg_paper.jpg'),
                  loading: imgRender('bg_paper.jpg')
                }"
                class="point_box point_box-img"
              >
                <img :data-src="imgRender(point.bgFile)" :alt="point.mainText" class="sumb" />
                <img :data-src="imgRender(point.bgFile)" :alt="point.mainText" />
              </div>
              <!-- </nuxt-link> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="link">
        <nuxt-link to="/" class="link_item">TOP</nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
// import ArtworkGL from '../../components/webgl/js/artworkGL'
import GridToFullscreenEffect from '../../components/webgl/js/GridToFullscreenEffect'
import mousePointer from '~/components/mousePointer.vue'
import pointJson from '~/assets/data/point.json'

export default Vue.extend({
  // name: ['Artwork', 'GridToFullscreenEffect'],
  name: 'GridToFullscreenEffect',
  components: {
    mousePointer
  },

  head() {
    return {
      title: '好きなところ',
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
    return {
      pointData: pointJson,
      pontTxtList: [],
      linkTxt: '',
      isVisible: false,
      menuFlag: false
    }
  },
  mounted() {
    console.log('point')
    this.setJsonData()
    this.interSect()

    // canvas要素を渡す。
    const artworkGL = new GridToFullscreenEffect(
      document.getElementById('app'),
      document.getElementById('itemsWrapper'),
      {
        duration: 1,
        timing: { type: 'sections', props: { latestStart: 0 } },
        activation: { type: 'radial', props: { onMouse: true } },
        transformation: {
          type: 'fluid',
          props: { amplitude: 2, frequency: 1.6, progressLimit: 0.1 }
        },
        randomizeSeed: 'tweenUnique',
        easings: { toFullscreen: 'Power2.easeOut', toGrid: 'Power2.easeIn' }
      }
    )

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

    artworkGL.createTextures(images)
    artworkGL.init()

    // クリックしたらフルサイズにするか判定し実行
    const targetImg = document.querySelectorAll('.point_item img.sumb')
    for (let i = 0; i < targetImg.length; i++) {
      const target = targetImg[i]
      target.addEventListener('click', function() {
        console.log('click')
        if (artworkGL.isFullscreen) {
          artworkGL.toGrid()
        }
      })
    }

    const canvasWrap = document.getElementById('canvasCont')
    canvasWrap.addEventListener('click', function() {
      console.log(artworkGL.isFullscreen)
      if (artworkGL.isFullscreen) {
        artworkGL.toGrid()
      }
    })
  },
  methods: {
    interSect() {
      const scrollItems = document.querySelectorAll('.point_item')
      const options = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
      if (scrollItems.length <= 0) return
      // インスタンス生成
      const observer = new IntersectionObserver(doWhenIntersect, options)
      // それぞれの対象要素を監視する
      for (let i = 0; i < scrollItems.length; i++) {
        const scrollItem = scrollItems[i]
        observer.observe(scrollItem)
      }

      // ----------------------------------------------------------------
      // 交差検知
      // 交差検知をしたもののなかで、isIntersectingがtrueのDOMをクラスを変える関数に渡す
      // ----------------------------------------------------------------
      function doWhenIntersect(entries, observer) {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          if (entry.isIntersecting) {
            addIntersectClass(entry.target)
            // 1度監視下に入った場合監視の解除
            observer.unobserve(entry.target)
          }
        }
      }

      // -----------------------------------------------------------------
      // クラスを付ける処理
      // -----------------------------------------------------------------
      function addIntersectClass(el) {
        const activeClass = 'is-intersected'
        el.classList.add(activeClass)
      }
    },
    setJsonData() {
      let pointItem = {}
      for (let i = 0; i < this.pointData.length; i++) {
        const targetTxt = this.pointData[i].mainText.replace('|', '')
        pointItem.text = targetTxt
        pointItem.id = i + 1
        this.pontTxtList.push(pointItem)
        pointItem = {}
      }
    },
    imgRender(filename) {
      return require(`@/assets/img/${filename}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  --main-color: #bf4040;
  overflow: hidden;
  // height: 100vh;
  &:before,
  &:after {
    content: '';
    display: block;
    position: fixed;
    z-index: 5;
    width: 100%;
    border-top: 10px solid;
    left: 0;
    border-color: var(--main-color);
  }
  &:before {
    top: 0;
  }
  &:after {
    top: calc(100vh - 10px);
  }
}
.artwork__canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.cont {
  position: relative;
  background: var(--main-color);
  background: url('~assets/img/bg_paper.jpg');
  overflow-y: auto;
  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */
  height: 100%;
  min-height: 100vh;
  z-index: 2;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: fixed;
    z-index: 5;
    width: 10px;
    height: 100vh;
    border-left: 10px solid;
    top: 0;
    border-color: var(--main-color);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}
.bg_cont {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;

  svg {
    display: none;
    position: fixed;
    top: 0;
    right: -10px;
    z-index: 4;
    width: 100%;
    height: auto;

    &.svg_dark {
      width: 50%;
    }
  }
}
.inr {
  padding-left: pcvw(150px);
  position: relative;
  z-index: 5;
  &:after {
    // content: '';
    display: block;
    background: var(--main-color);
    opacity: 1;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.point {
  &_ttl {
    @include fontLB;
    font-size: pcfz(150px);
    letter-spacing: 0.03em;
    overflow: hidden;
    text-align: center;
    writing-mode: vertical-rl;
    position: absolute;
    left: 0;
    line-height: 1;
    font-family: 'Libre Baskerville', serif;

    svg {
      stroke: var(--main-color);
      stroke-width: 1;
      fill: transparent;
    }
    span {
      display: inline-block;
      -webkit-text-stroke: 0.1px var(--main-color);
      color: transparent;
    }
  }
  &_num {
    @include fontLB;
    font-size: pcfz(50px);
    color: $red;
  }
  &_list {
    position: relative;
    z-index: 2;
    padding: 5vh 2vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5vh 1.5vw;
  }
  &_item {
    opacity: 0;
    position: relative;
    transform: translateY(5px);
    transition: opacity 1.4s ease, transform 0.8s ease;
    &.is-intersected {
      opacity: 1;
      transform: translateY(0px);
    }
    &_inr {
      display: block;
      background: #fff;
      box-shadow: rgba(110, 93, 93, 0.5) 0 0 10px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  &_box {
    color: $red;
    &-img {
      position: relative;
      width: 100%;
      height: 18.07vw;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.05;
        transform: translateY(5px);
        transition: opacity 1s ease, transform 0.8s ease;
        transition-delay: 0.1s;
        object-fit: cover;
        &:last-child {
          // display: none;
        }
      }
      img[lazy='loading'] {
        opacity: 0;
      }
      img[lazy='error'] {
        opacity: 0.05;
      }
      img[lazy='loaded'] {
        transform: translateY(0);
        opacity: 0.1;
      }
    }
  }
}
#canvasCont {
  width: 100%;
  height: 100vh;
  position: fixed;
  opacity: 0;
  // background: #000;
}
#app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80vw;
  height: 80vh;
  // width: 100vw;
  // height: 100vh;
  overflow: hidden;
  // pointer-events: none;
}
.link {
  position: absolute;
  bottom: 0;
}
</style>
