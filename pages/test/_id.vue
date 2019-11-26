<template>
  <main
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
    class="main"
  >
    <div class="cont">
      <heartMask />
      <div class="txt_box">
        <p>touchStart:{{ tsPoint }}</p>
        <p>touchEnd:{{ tePoint }}</p>
        <p>mouse whell:{{ mwDeltaY }}</p>
        <!-- <p>json data number : {{ id }}(本来は{{ id + 1 }}個目のデータ)</p> -->
        <!-- <p class="txt_main">{{ mainText }}</p>
        <p v-if="subText != undefined" class="txt_sub">{{ subText }}</p> -->
      </div>
      <pagination :allNum="dataLen" :currentNum="id + 1" />
      <scrollArrow />
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import heartMask from '~/components/heartMask.vue'
import pagination from '~/components/pagination.vue'
import scrollArrow from '~/components/scrollArrow.vue'

export default Vue.extend({
  components: {
    heartMask,
    pagination,
    scrollArrow
  },
  data() {
    return {
      dataLen: 0,
      targetData: '',
      mainText: '',
      subText: '',
      timeoutId: '',
      tsPoint: 0,
      tePoint: 0,
      mwDeltaY: 0,
      touchStartTest: '',
      touchEndTest: ''
    }
  },
  computed: {
    scrollFlag() {
      return this.$store.state.global.scrollFlag
    }
  },
  async asyncData({ params }) {
    const jsonData = await import(`~/assets/data/test.json`)
    return {
      params,
      jsonData,
      id: Number(params.id) - 1,
      nextId: Number(params.id) + 1
    }
  },
  created() {
    console.log('created')
    this.setData()
  },
  mounted() {
    window.setTimeout(this.mouseWheel, 1000)
    // this.mouseWheel()
  },
  methods: {
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetData = this.jsonData[this.id]
      this.mainText = this.jsonData[this.id].mainText
      this.subText = this.jsonData[this.id].subText
    },
    touchStart(event) {
      this.touchStartTest = 'touchStartTest：' + event.touches[0].clientY
      this.tsPoint = event.touches[0].clientY
    },
    touchEnd(event) {
      this.touchEndTest = 'touchEndTest：' + event.changedTouches[0].clientY
      this.tePoint = event.changedTouches[0].clientY
      if (this.tsPoint - this.tePoint > 50) {
        this.$router.push('/test/' + this.nextId)
      } else if (this.tePoint - this.tsPoint > 50) {
        this.$router.push('/test/' + String(this.id))
      }
    },
    mouseWheel() {
      const _this = this
      document.addEventListener('wheel', function(e) {
        _this.mwDeltaY = e.deltaY
        console.log(e.deltaY)
        if (_this.mwDeltaY > 0) {
          _this.$router.push('/test/' + _this.nextId)
        } else if (_this.mwDeltaY < 0) {
          _this.$router.push('/test/' + String(_this.id))
        }
      })
    },
    handleScroll(evt, el) {
      // スクロールを停止して100ms後に終了とする
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(function() {
        this.$router.push('/test/' + this.nextId)
        this.$nuxt.$store.dispatch('global/writeScrollFlag', true)
      }, 100)
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
  background: $red;
}

.txt_box {
  position: absolute;
  top: 50%;
  width: 100%;
  color: $red;
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
</style>
