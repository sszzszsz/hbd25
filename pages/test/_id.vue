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
      isScrolling: false,
      timeoutId: ''
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
    console.log('mounted')
    this.isScrolling = false
    this.setData()
    this.movePage()
    // window.addEventListener('scroll', this.movePage)
    // this.handleScroll()
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
      const self = this
      this.scr = window.pageYOffset
      let prevScr = 0

      window.addEventListener('scroll', function() {
        self.scr = window.pageYOffset
        if (self.scr >= nextPageScroll && self.scr > prevScr) {
          self.isScrolling = true
          if (self.isScrolling) {
            self.$router.push('/test/' + self.nextId)
          }
        } else if (self.scr < prevScr) {
          self.isScrolling = false
          self.scr = 0
          console.log('test')
        }
        prevScr = window.pageYOffset
        console.log(self.scr)
      })
    },
    handleScroll(evt, el) {
      this.isScrolling = false
      const self = this

      window.addEventListener('scroll', function() {
        self.isScrolling = true
        self.movePage()

        // スクロールを停止して500ms後に終了とする
        clearTimeout(self.timeoutId)

        self.timeoutId = setTimeout(function() {
          self.isScrolling = false
          console.log(self.isScrolling)
        }, 500)
        console.log(self.isScrolling)
      })
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
