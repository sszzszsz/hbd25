<template>
  <main class="main">
    <mousePointer />
    <!-- <gridToFullscreenEffect /> -->
    <mousePointer />
    <div ref="scrCont" class="cont js-scrCont">
      <div
        ref="scrContInr"
        :class="{
          'is-ready': this.$store.state.global.loadingEnd === true
        }"
        class="inr js-scrContInr"
      >
        <h1 ref="pageTtl" class="point_ttl">
          <span ref="pageTtlTxt">
            {{ repeatTxt }}
          </span>
        </h1>
        <ul id="itemsWrapper" class="point_list">
          <li
            @click="clickImg($event)"
            v-for="point in pointData"
            v-bind:key="point.id"
            :id="['point-' + point.id]"
            class="point_item"
          >
            <div
              v-lazy-container="{
                selector: 'img',
                error: imgRender('bg_paper.jpg'),
                loading: imgRender('bg_paper.jpg')
              }"
              class="point_item_cont"
            >
              <!-- <nuxt-link :to="'/point/' + point.id" class="point_item_inr"> -->
              <!-- <p v-html="point.mainText" class="point_txt" />
              <p>{{ point.subText }}</p> -->
              <div class="point_item_inr">
                <p class="point_num">
                  <span>{{ point.id }}</span>
                </p>
                <div v-on:click="clickImg($event)" class="point_box point_box-img">
                  <img
                    @click="clickImg($event)"
                    :data-src="imgRender(point.bgFile)"
                    :alt="point.mainText"
                    class="small"
                  />
                  <img :alt="point.mainText" :data-src="imgRender2(point.bgFile)" class="large" />
                </div>
              </div>
              <!-- </nuxt-link> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="link">
        <nuxt-link to="/" class="link_item">TOP</nuxt-link>
      </div>
      <canvasText />
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import TweenMax from 'gsap/umd/TweenMax'
import mousePointer from '~/components/mousePointer.vue'
// import gridToFullscreenEffect from '~/components/gridToFullscreenEffect.vue'
import canvasText from '~/components/webgl/text.vue'
import pointJson from '~/assets/data/point.json'

export default Vue.extend({
  components: {
    mousePointer,
    canvasText
    // gridToFullscreenEffect
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
      menuFlag: false,
      repeatTxt: 'HAPPY BIRTHDAY',
      scrPos: 0,
      winScr: 0
    }
  },
  mounted() {
    console.log('point')
    this.setJsonData()
    this.interSect()
    this.setHbdTtl()
    this.setScrollStyle()
    this.setScrollEventListener()
  },
  beforeDestroy() {
    //
  },

  methods: {
    interSect() {
      const scrollItems = document.querySelectorAll('.point_item_cont')
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
    },
    imgRender2(filename) {
      return require(`@/assets/img/large/${filename}`)
    },
    clickImg(e) {
      console.log('clickImg')
    },
    /* ------------------------------
    * 見出しのリピート
    ------------------------------ */
    setHbdTtl() {
      const pageTtl = this.$refs.pageTtl
      const pageTtlH = pageTtl.offsetHeight
      const pageTtlTxt = pageTtl.textContent
      const scrContH = this.$refs.scrCont.scrollHeight
      const repeat = scrContH / pageTtlH
      console.log(repeat)
      for (let i = 0; i <= repeat + 1; i++) {
        this.repeatTxt = this.repeatTxt + pageTtlTxt
      }

      TweenMax.set(this.$refs.pageTtlTxt, {
        y: 0
      })
      // window.addEventListener('scroll', this.setHbdTtlScr)
    },

    setHbdTtlScr() {
      this.winScr = window.scrollY || window.pageYOffset
      this.scrPos = this.winScr
    },

    /* ------------------------------
    * スクロールでぬるっとさせるためのstyle指定
    ------------------------------ */
    setScrollStyle() {
      this.winScr = window.scrollY || window.pageYOffset
      this.scrPos = this.winScr
      this.currentWidth = window.innerWidths
      this.parentEl = this.$refs.scrContInr.parentNode
      const _this = this
      this.bodyH = Math.max.apply(null, [
        document.body.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight
      ])

      TweenMax.set('.js-scrCont', {
        height: _this.bodyH
      })
      TweenMax.set('.js-scrContInr', {
        position: 'fixed',
        y: 0,
        force3D: true
      })
    },
    /* ------------------------------
      * スクロールでぬるっとの本体
      ------------------------------ */
    setScrollEventListener() {
      this.scrollEvent()
      window.addEventListener('resize', this.resize, false)
    },
    scrollEvent() {
      const _this = this
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
      console.log(window.scrollY || window.pageYOffset)
      let inrYpos = 0

      function scrollAnimation() {
        _this.winScr = window.scrollY || window.pageYOffset
        const scrCont = _this.$refs.scrContInr
        if (scrCont) {
          inrYpos = Number(_this.$refs.scrContInr.style.transform.split(' ')[1].replace('px,', ''))
        }
        const targetYpos = Math.abs(inrYpos) + (_this.winScr - Math.abs(inrYpos)) * 0.05
        // 小数点第二位までにする
        const ypos = Math.round(targetYpos * 100) / 100
        requestAnimationFrame(scrollAnimation)
        TweenMax.set('.js-scrContInr', {
          y: -ypos
        })
        inrYpos = ypos

        if (_this.$refs.pageTtlTxt) {
          _this.ttlYpos = _this.$refs.pageTtlTxt.style.transform.split(' ')[5].replace(')', '')
        }

        // if (_this.scrPos - _this.winScr > 0) {
        //   TweenMax.set(_this.$refs.pageTtlTxt, {
        //     y: Number(_this.ttlYpos) - 5
        //   })
        // } else if (_this.scrPos - _this.winScr < 0) {
        //   TweenMax.set(_this.$refs.pageTtlTxt, {
        //     y: Number(_this.ttlYpos) + 5
        //   })
        // }
        _this.scrPos = _this.winScr
      }
      this.id = requestAnimationFrame(scrollAnimation)
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  --main-color: #bf4040;
  overflow: hidden;
  overflow-y: auto;
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
    z-index: 100;
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
  padding-left: pcvw(200px);
  position: relative;
  z-index: 5;
  overflow: hidden;
  will-change: transform;
  // transition: transform 0.1s ease;
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
    font-size: pcfz(100px);
    letter-spacing: 0.08em;
    overflow: hidden;
    text-align: center;
    writing-mode: vertical-rl;
    position: absolute;
    left: 0;
    line-height: 1;
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    @include tablet {
      font-size: spfz(75px);
    }
    span {
      display: inline-block;
      -webkit-text-stroke: 1px var(--main-color);
      color: transparent;
      white-space: nowrap;
      transition: transform 0.3s ease;
    }
  }
  &_num {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 5;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: inline-flex;
      width: 90%;
      height: 90%;
      align-items: center;
      justify-content: center;
      // background: rgba(251, 250, 246, 0.6);
      // border: 1px solid #fff;
      padding: 10px;
      border-radius: 50%;
      @include fontLB;
      font-size: pcfz(80px);
      color: $red;
      color: #1a243a7d;
      border: 1px solid #1a243a7d;
      mix-blend-mode: screen;
    }
  }
  &_list {
    position: relative;
    padding: 5vh 2vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2.5vh 2vw;

    @include tablet {
      padding: 5vh 5vw 100vw 0vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1vh 2vw;
    }
  }
  &_item {
    position: relative;
    cursor: pointer;
    align-self: flex-start;
    &:nth-child(even) {
      padding: 55% 0 0;
    }

    &_cont {
      display: block;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 1.4s ease, transform 0.8s ease;
      height: 18.07vw;
      @include tablet {
        height: 38vmin;
      }
      &.is-intersected {
        opacity: 1;
        transform: translateY(0px);
      }
    }

    &_inr {
      position: relative;
      background: #fffbfb;
      box-shadow: rgba(110, 93, 93, 0.5) 0 0 2px;
      margin: 0 auto;
      border-radius: 50%;
    }
  }

  &_box {
    color: $red;
    &-img {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        transition: opacity 1s ease, transform 0.8s ease;
        transition-delay: 0.1s;
        object-fit: cover;
        filter: blur(1.5px) contrast(0.8);

        &.small {
          border-radius: 50%;
        }

        &.large {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          filter: contrast(0.8);
        }
      }
      img[lazy='loading'] {
        opacity: 0;
      }
      img[lazy='error'] {
        opacity: 0.05;
      }
      img.small[lazy='loaded'] {
        transform: translateY(0);
        opacity: 0.5;
      }
      img.large[lazy='loaded'] {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}

@for $i from 1 through 100 {
  #point-#{$i} {
    .point_item_inr {
      $rondomNum: minMaxRondom(80, 110, 1%);
      width: $rondomNum;
      height: $rondomNum;
    }
  }
}
.link {
  position: absolute;
  bottom: 0;
}

</style>
