<script>
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    this.scrollInAni()
  },

  methods: {
    // loadingとページ遷移が終わったか
    findMoveAnimationEnd() {
      const wrap = document.querySelector('.wrap')
      const wrapClass = wrap.className
      const wrapResult = wrapClass.match('is-ready')

      const cont = document.querySelector('.l_contents')
      const contClass = cont.className
      const contResult = contClass.match('is_moved')
      if (wrapResult && contResult) {
        clearInterval(this.setIntervalId)
        this.scrollInAni()
      }
    },
    scrollInAni() {
      const target = document.querySelectorAll('.js-scroll:not(.in_view)')
      if (target.length === null) {
        return
      }
      for (let i = 0; i < target.length; i++) {
        const scene = this.$scrollmagic.scene({
          triggerElement: target[i],
          triggerHook: 0.8,
          offset: 0,
          duration: window.innerHeight,
          reverse: true
        })
        this.$scrollmagic.addScene(scene)
        scene.on('enter', () => {
          target[i].classList.add('in_view')
        })
      }
    },
    transitionPage() {
      this.$store.dispatch('global/writePageTransition', false)
    }
  }
})
</script>
