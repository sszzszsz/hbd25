<template>
  <div
    :class="[
      this.$route.name,
      this.$route.params.id,
      [$ua.browser() == 'Internet Explorer' ? 'IE' : $ua.browser()],
      [$ua.isFromPc() == true ? 'PC' : null],
      [$ua.isFromTablet() == true ? 'TB' : null],
      [$ua.isFromSmartphone() == true ? 'SP' : null],
      [this.$store.state.global.gNaviOpen == true ? 'navOpen' : null]
    ]"
    class="wrap"
  >
    <nuxt />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      ipadFlag: false,
      browser: '',
      classList: ''
    }
  },
  created() {
    this.browser = this.$ua.browser()
    if (this.browser === 'Internet Explorer') {
      this.browser = 'IE'
    }
    this.$store.dispatch('global/writePageName', this.$route.name)
    this.$store.dispatch('global/writeBrowser', this.browser)
  },
  mounted() {
    this.getVh()
    window.addEventListener('resize', () => {
      this.getVh()
    })
  },
  methods: {
    getVh() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
})
</script>

<style>
.wrap {
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}
</style>
