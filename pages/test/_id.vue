<template>
  <main
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
    class="main"
  >
    <div class="cont">
      <heartMask />
      <div class="txt_box">
        <p>{{ touchStartTest }}{{ touchEndTest }}</p>
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
  },
  mounted() {
    this.setData()
    this.movePage()
  },
  methods: {
    touchStart(event) {
      console.log('touch start', event.touches[0].clientY)
      this.touchStartTest = 'touchStartTest：' + event.touches[0].clientY
    },
    touchEnd(event) {
      console.log('touch end', event.changedTouches[0].clientY)
      this.touchEndTest = 'touchEndTest：' + event.changedTouches[0].clientY
    },
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetData = this.jsonData[this.id]
      this.mainText = this.jsonData[this.id].mainText
      this.subText = this.jsonData[this.id].subText
    },
    movePage() {
      const winH = window.innerHeight
      const bodyH = document.body.clientHeight
      const nextPageScroll = bodyH - winH - 10
      const _this = this
      this.scr = window.pageYOffset
      let prevScr = 0

      window.addEventListener('scroll', function(event) {
        _this.scr = window.pageYOffset
        if (_this.scrollFlag) {
          if (_this.scr >= nextPageScroll && _this.scr > prevScr) {
            _this.$router.push('/test/' + _this.nextId)
          } else if (_this.scr < prevScr) {
            _this.scr = 0
            _this.$store.dispatch('global/writeScrollFlag', false)
            event.preventDefault()
            console.log('test')
          }
          _this.handleScroll()
        }

        prevScr = window.pageYOffset
        console.log(_this.scr)
      })
    },
    handleScroll(evt, el) {
      // スクロールを停止して100ms後に終了とする
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(function() {
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
