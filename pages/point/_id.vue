<template>
  <main ref="main" :class="[this.$route.params.id]" class="main">
    <div ref="cont" @touchstart="touchStart($event)" @touchend="touchEnd($event)" class="cont">
      <div
        ref="bgBox"
        :class="[bgRotate == 90 ? 'rotate90' : bgRotate == 180 ? 'rotate180' : '']"
        class="bgBox"
      />
      <div ref="inr" class="inr">
        <p ref="ttl" class="ttl">
          <span>HAPPY</span>
          <span>25th</span>
          <span>BIRTHDAY</span>
        </p>
        <div class="main_content">
          <pointText :main="mainText" :sub="subText" />
          <heartMask />
        </div>
        <pagination :all-num="dataLen" :current-num="targetId + 1" />
        <scrollArrow />
        <div @mousemove="changeText($event)" class="link_box">
          <nuxt-link :to="'/point/' + prevId" class="link_item link_item-prev">PREV</nuxt-link>
          <nuxt-link :to="'/point/' + nextId" class="link_item link_item-next">NEXT</nuxt-link>
        </div>
      </div>
    </div>
    <mousePointer :pointer-txt="linkTxt" />
    <navi />
  </main>
</template>

<script>
import Vue from 'vue'
import * as TweenMax from 'gsap/umd/TweenMax'

import heartMask from '~/components/heartMask.vue'
import pagination from '~/components/pagination.vue'
import scrollArrow from '~/components/scrollArrow.vue'
import pointText from '~/components/pointText.vue'
import mousePointer from '~/components/mousePointer.vue'
import navi from '~/components/navi.vue'

export default Vue.extend({
  components: {
    heartMask,
    pointText,
    pagination,
    scrollArrow,
    mousePointer,
    navi
  },
  head() {
    return {
      title: '好きなところ' + this.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `好きなところ${this.id} ～ ${this.mainText} ～`
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: '好きなところ' + this.id },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `好きなところ${this.id} ～ ${this.mainText} ～`
        }
      ]
      // titleTemplate: '', hide titleTemplate
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      targetId: 0,
      nextId: Number(this.$route.params.id) + 1,
      prevId: Number(this.$route.params.id) - 1,
      dataLen: 0,
      targetData: '',
      mainText: '',
      subText: '',
      bgFile: '',
      bgRotate: 0,
      timeoutId: '',
      tsPoint: 0,
      tePoint: 0,
      mwDeltaY: 0,
      mainColor: '',
      linkTxt: 'NEXT',
      touchStartTest: '',
      touchEndTest: ''
    }
  },
  async asyncData({ params }) {
    const jsonData = await import(`~/assets/data/point.json`)
    return {
      params,
      jsonData
    }
  },
  created() {
    this.setData()
    this.makeColor()
  },

  mounted() {
    console.log('mounted')
    this.setColor()
    TweenMax.to('.test', 0.5, {
      scale: 1
    })
  },
  methods: {
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetId = Number(this.params.id) - 1
      this.nextId = Number(this.params.id) + 1 > this.dataLen ? 'end/' : Number(this.params.id) + 1
      this.prevId = Number(this.params.id) - 1 < 1 ? 100 : Number(this.params.id) - 1
      this.targetData = this.jsonData[this.targetId]
      this.mainText = this.jsonData[this.targetId].mainText
      this.subText = this.jsonData[this.targetId].subText
      this.bgFile = this.jsonData[this.targetId].bgFile
      this.bgRotate = this.jsonData[this.targetId].bgRotate
    },
    touchStart(event) {
      this.touchStartTest = 'touchStartTest：' + event.touches[0].clientY
      this.tsPoint = event.touches[0].clientY
    },
    touchEnd(event) {
      this.touchEndTest = 'touchEndTest：' + event.changedTouches[0].clientY
      this.tePoint = event.changedTouches[0].clientY
      if (this.tsPoint - this.tePoint > 50) {
        const pageAddFlag = true
        this.moveNextPage(pageAddFlag)
      } else if (this.tePoint - this.tsPoint > 50) {
        const pageAddFlag = false
        this.moveNextPage(pageAddFlag)
      }
    },
    moveNextPage(flag) {
      // 増えるとき
      if (flag === true) {
        this.nextId > this.dataLen
          ? this.$router.push({ path: `/end/` })
          : this.$router.push({ path: `/point/${this.nextId}` })
      } else {
        this.targetId === 0
          ? this.$router.push('/point/' + this.dataLen)
          : this.$router.push('/point/' + this.targetId)
      }
    },
    makeColor() {
      const MAX = this.dataLen
      // HSLカラーを算出
      const hue = (360 / MAX) * this.targetId
      this.mainColor = 'hsl(' + hue + ', 50%, 50%)'
      this.mainOpacityColor = 'hsla(' + hue + ', 50%, 50%, 0.1)'
    },
    setColor() {
      this.$refs.main.style.setProperty('--main-color', this.mainColor)
      this.$refs.main.style.setProperty('--main-color-a', this.mainOpacityColor)
      if (this.bgFile !== '') {
        this.$refs.bgBox.style.backgroundImage = 'url(' + this.imgRender(this.bgFile) + ')'
      }
    },
    changeText(event) {
      this.linkTxt = event.toElement.textContent
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
  display: block;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  --main-color: $white;
}

.cont {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 10px solid var(--main-color);
  overflow: hidden;
}
.bgBox {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-color: #fff;

  img {
    max-width: 100%;
    height: auto;
  }
}
.inr {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 20;
  background: rgba(255, 255, 255, 0.5);
}

.ttl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  font-family: 'Libre Baskerville', serif;
  font-size: 13vmax;
  -webkit-text-stroke: 1px var(--main-color);
  color: transparent;
  letter-spacing: 3px;
  position: absolute;
  top: 0;
  left: 10px;
  overflow: hidden;
  text-align: center;
  opacity: 0.7;
  @include tablet {
    position: static;
    opacity: 1;
    color: var(--main-color);
    font-size: 5vmax;
    line-height: 1.5;
    height: auto;
    text-align: center;
  }
}
.main_content {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  @include tablet {
    max-height: 70vh;
  }
}
.link_box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: table;
  z-index: 100;
}
.link_item {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-indent: -9999px;
}

.SP,
.TB {
  .link_box {
    display: none;
  }
}

.debug {
  position: absolute;
  bottom: 0;
  font-size: 10px;
}
</style>
