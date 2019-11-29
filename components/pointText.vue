<template>
  <div ref="colorTxt" class="txt_box">
    <!-- <p>json data number : {{ id }}(本来は{{ id + 1 }}個目のデータ)</p> -->
    <p ref="main" class="txt_main">
      <span v-html="mainTxt" />
    </p>
    <p v-if="sub != undefined" class="txt_sub">
      <span v-html="subTxt" />
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
import { TweenMax } from 'gsap'

export default Vue.extend({
  props: {
    main: {
      type: String,
      default: ''
    },
    sub: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mainTxt: '',
      subTxt: ''
    }
  },
  mounted() {
    console.log('point text')
    this.$refs.colorTxt.style.color = this.color
    this.setBr()
    TweenMax.fromTo(
      '.txt_main',
      0.3,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, delay: 0.25 }
    )
    TweenMax.fromTo(
      '.txt_sub',
      0.3,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, delay: 0.5 }
    )
  },
  methods: {
    setBr() {
      const mainFlag = this.main.match(/\|/) != null
      if (mainFlag) {
        this.mainTxt = this.main.replace('|', '<br>')
      } else {
        this.mainTxt = this.main
      }

      if (this.sub !== null) {
        const subFlag = this.sub.match(/\|/) != null
        if (subFlag) {
          this.subTxt = this.sub.replace('|', '<br>')
        } else {
          this.subTxt = this.sub
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.txt_box {
  position: absolute;
  top: 40%;
  width: 100%;
  max-width: 1000px;
  color: $white;
  text-align: center;
  @include tablet {
    top: 45vh;
    width: 72%;
  }
}

.txt_main {
  font-weight: 600;
  font-size: 4.6vmin;
  opacity: 0;
  @include desktop {
    font-size: 30px;
  }
}

.txt_sub {
  font-weight: 400;
  font-size: 3.5vmin;
  margin-top: 8px;
  opacity: 0;
  @include desktop {
    font-size: 20px;
  }
}
</style>
