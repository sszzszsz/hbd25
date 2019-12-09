<template>
  <div ref="load" :class="{ is_end: loading }" class="load">
    <p class="load_box">
      <span class="load_str">L</span>
      <span class="load_str">o</span>
      <span class="load_str">a</span>
      <span class="load_str">d</span>
      <span class="load_str">i</span>
      <span class="load_str">n</span>
      <span class="load_str">g</span>
      <span class="load_str">...</span>
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
// import TweenMax from 'gsap/umd/TweenMax'
import TimelineMax from 'gsap/umd/TimelineMax'
import Ease from 'gsap/umd/EasePack'

export default Vue.extend({
  data() {
    return {
      loading: this.$store.state.global.loadingEnd
    }
  },
  mounted() {
    console.log('load')
    window.setTimeout(this.finish, 3000)
  },
  methods: {
    finish() {
      const _this = this
      const tl = new TimelineMax()
      tl.to('.load', 0.15, {
        opacity: 0,
        ease: Ease.Power1.easeIn
      }).to('.load', 0.1, {
        display: 'none',
        onComplete() {
          _this.$store.dispatch('global/writeLodingEnd', true)
          _this.loading = _this.$store.state.global.loadingEnd
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.load {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $red;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is_end {
    display: none;
  }

  &_box {
    color: $white;
    font-family: 'Libre Baskerville', serif;
  }
}
@for $i from 1 through 8 {
  $DELAY: $i * 0.2s;

  @include keyframes(upDaown#{$i}) {
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    50% {
      opacity: 0;
      transform: translateY(-10%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .load_str:nth-child(#{$i}) {
    @include animation(upDaown#{$i} 1.6s linear $DELAY infinite);
  }
}
</style>
