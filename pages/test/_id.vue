<template>
  <main
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
    class="main"
  >
    <div class="cont">
      <heartMask :color="mainColor" />
      <pointText :color="mainColor" :main="mainText" :sub="subText" />
      <pagination
        :color="mainColor"
        :all-num="dataLen"
        :current-num="targetId + 1"
      />
      <scrollArrow :color="mainColor" />
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
import pointText from '~/components/pointText.vue'

export default Vue.extend({
  components: {
    heartMask,
    pointText,
    pagination,
    scrollArrow
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
    this.setData()
    this.makeColor()
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    setData() {
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
    moveNextPage(flag) {
      // 増えるとき
      if (flag === true) {
        const nextId = String(this.nextId)
        this.nextId > this.dataLen
          ? this.$router.push({ path: `/test/1` })
          : this.$router.push({ path: `/test/${nextId}` })
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
