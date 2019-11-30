<template>
  <main
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
    class="main"
  >
    <div class="cont">
      <div ref="border_deco" class="border_deco_box">
        <span class="border_top" />
        <span class="border_right" />
      </div>
      <div class="border_deco_box">
        <span class="border_left" />
        <span class="border_bottom" />
      </div>
      <div ref="inr" class="inr">
        <heartMask :color="mainColor" />
        <pointText :color="mainColor" :main="mainText" :sub="subText" />
        <pagination
          :color="mainColor"
          :all-num="dataLen"
          :current-num="targetId + 1"
        />
        <scrollArrow :color="mainColor" />
        <div @mousemove="changeText($event)" class="link_box">
          <nuxt-link
            :to="{ name: 'test-id', params: { id: prevId } }"
            class="link_item link_item-prev"
          >
            PREV
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'test-id', params: { id: nextId } }"
            class="link_item link_item-next"
          >
            NEXT
          </nuxt-link>
        </div>
        <!-- <div class="debug">
          <p>touchStart:{{ tsPoint }}</p>
          <p>touchEnd:{{ tePoint }}</p>
          <p>mouse whell:{{ mwDeltaY }}</p>
        </div> -->
      </div>
    </div>
    <mousePointer :pointer-txt="linkTxt" />
  </main>
</template>

<script>
import Vue from 'vue'
// import { TweenMax } from 'gsap'

import heartMask from '~/components/heartMask.vue'
import pagination from '~/components/pagination.vue'
import scrollArrow from '~/components/scrollArrow.vue'
import pointText from '~/components/pointText.vue'
import mousePointer from '~/components/mousePointer.vue'

export default Vue.extend({
  components: {
    heartMask,
    pointText,
    pagination,
    scrollArrow,
    mousePointer
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
  beforeRouteUpdate(to, from, next) {
    // ルート変更に反応する
    this.targetId = Number(to.params.id) - 1
    this.nextId = Number(to.params.id) + 1
    next()
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
  },
  methods: {
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetId = Number(this.params.id) - 1
      this.nextId =
        Number(this.params.id) + 1 > this.dataLen
          ? 1
          : Number(this.params.id) + 1
      this.prevId =
        Number(this.params.id) - 1 < 1 ? 100 : Number(this.params.id) - 1
      this.targetData = this.jsonData[this.targetId]
      this.mainText = this.jsonData[this.targetId].mainText
      this.subText = this.jsonData[this.targetId].subText
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
          ? this.$router.push({ path: `/test/1` })
          : this.$router.push({ path: `/test/${this.nextId}` })
      } else {
        this.targetId === 0
          ? this.$router.push('/test/' + this.dataLen)
          : this.$router.push('/test/' + this.targetId)
      }
    },
    makeColor() {
      const MAX = this.dataLen
      // HSLカラーを算出
      const hue = (360 / MAX) * this.targetId
      this.mainColor = 'hsl(' + hue + ', 50%, 25%)'
    },
    setColor() {
      const borderItem = document.querySelectorAll('.border_deco_box span')
      borderItem.forEach((element) => {
        element.style.background = this.mainColor
      })
    },
    changeText(event) {
      this.linkTxt = event.toElement.textContent
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
}

.cont {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.border_deco_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  span {
    display: block;
    position: absolute;
    background: #000;
  }
}
.border_top {
  width: 100%;
  height: 5px;
  top: 10px;
  left: 0;
  @include animation(lineAniT 0.4s linear 0.2s both);
}
.border_right {
  width: 5px;
  height: 100%;
  top: 0;
  right: 10px;
  @include animation(lineAniR 0.4s linear 0.2s both);
}

.border_bottom {
  width: 100%;
  height: 5px;
  bottom: 10px;
  left: 0;
  transform: rotate(180deg);
  @include animation(lineAniB 0.4s linear 0.2s both);
}
.border_left {
  width: 5px;
  height: 100%;
  top: 0;
  left: 10px;
  @include animation(lineAniL 0.4s linear 0.2s both);
}
@include keyframes(lineAniT) {
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
}
@include keyframes(lineAniB) {
  0% {
    left: 100%;
  }
  100% {
    left: 0%;
  }
}
@include keyframes(lineAniL) {
  0% {
    top: -100%;
  }
  100% {
    top: 0%;
  }
}
@include keyframes(lineAniR) {
  0% {
    top: 100%;
  }
  100% {
    top: 0%;
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
  padding: 10px;
  z-index: 2;
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
