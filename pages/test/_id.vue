<template>
  <main class="main">
    <div class="cont">
      <div class="inr">
        <p>json data number : {{ id }}(本来は{{ id + 1 }}個目のデータ)</p>
        <p>text : {{ text }}</p>
        <p v-if="nextId <= dataLen">
          <nuxt-link
            :to="{ name: 'test-id', params: { id: nextId } }"
            class="button--green"
            >test{{ nextId }}</nuxt-link
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
Vue.directive('scroll', {
  inserted(el, binding) {
    const f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

export default Vue.extend({
  data() {
    return {
      dataLen: 0,
      targetData: '',
      text: '',
      timeoutId: ''
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
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetData = this.jsonData[this.id]
      this.text = this.jsonData[this.id].text
    },
    movePage() {
      const winH = window.innerHeight
      const bodyH = document.body.clientHeight
      const nextPageScroll = bodyH - winH
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
            // _this.scrollFlag = false
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
  padding-bottom: 50px;
  box-sizing: content-box;
}

.cont {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
