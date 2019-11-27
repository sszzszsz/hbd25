<template>
  <main
    class="main"
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
  >
    <mousePointer />
    <div ref="colorCont" class="cont">
      <heartMask />
      <div ref="colorTxt" class="txt_box">
        <!-- <p>json data number : {{ id }}(本来は{{ id + 1 }}個目のデータ)</p> -->
        <p class="txt_main">{{ mainText }}</p>
        <p v-if="subText != undefined" class="txt_sub">{{ subText }}</p>
      </div>
      <pagination :all-num="dataLen" :current-num="targetId + 1" />
      <scrollArrow />
      <div class="link_box">
        <nuxt-link
          :to="{ name: 'test-id', params: { id: prevId } }"
          class="link_item"
        >
          prev
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'test-id', params: { id: nextId } }"
          class="link_item"
        >
          next
        </nuxt-link>
      </div>
      <div class="debug">
        <p>touchStart:{{ tsPoint }}</p>
        <p>touchEnd:{{ tePoint }}</p>
        <p>mouse whell:{{ mwDeltaY }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import heartMask from '~/components/heartMask.vue'
import pagination from '~/components/pagination.vue'
import scrollArrow from '~/components/scrollArrow.vue'
import mousePointer from '~/components/mousePointer.vue'

export default Vue.extend({
  components: {
    heartMask,
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
      touchStartTest: '',
      touchEndTest: ''
    }
  },
  beforeRouteUpdate(to, from, next) {
    // ルート変更に反応する...
    // next() を呼び出すのを忘れないでください
    console.log('beforeRouteUpdate:', to, from)
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
    console.log('created')
    this.setData()
  },
  mounted() {
    console.log('mounted')
    this.$nextTick(() => {
      this.makeColor()
    })
  },
  methods: {
    setData() {
      console.log('setData')
      this.targetId = Number(this.params.id) - 1
      this.nextId = Number(this.params.id) + 1
      this.dataLen = this.jsonData.default.length
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
    makeColor() {
      const MAX = this.dataLen
      // HSLカラーを算出
      const hue = (360 / MAX) * this.targetId
      this.mainColor = 'hsl(' + hue + ', 50%, 25%)'
      // console.log(this.mainColor)
      const bgColor = 'hsla(' + hue + ', 60%, 80%, 0.5)'
      this.$refs.colorCont.style.backgroundColor = bgColor
      this.$refs.colorTxt.style.color = this.mainColor
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: $white;
}

.txt_box {
  position: absolute;
  top: 40%;
  width: 100%;
  color: $white;
  text-align: center;
}

.txt_main {
  font-weight: 600;
  font-size: 5vmin;
}

.txt_sub {
  font-weight: 400;
  font-size: 3.5vmin;
  margin-top: 8px;
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
}
.debug {
  position: absolute;
  bottom: 0;
  font-size: 10px;
}
</style>
