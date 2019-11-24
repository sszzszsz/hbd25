<template>
  <div :class="[this.$route.name]" class="wrap">
    <nuxt />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      ipadFlag: false,
      ua: '',
      classList: ''
    }
  },
  created() {
    this.$store.dispatch('global/writePageName', this.$route.name)
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
}
</style>
