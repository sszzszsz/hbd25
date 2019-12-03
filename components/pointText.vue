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
import * as TweenMax from 'gsap/umd/TweenMax'

export default Vue.extend({
  props: {
    main: {
      type: String,
      default: ''
    },
    sub: {
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
      0.5,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, delay: 0.5 }
    )
    TweenMax.fromTo(
      '.txt_sub',
      0.5,
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
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 800px;
  color: var(--main-color);
  text-align: center;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @include tablet {
    width: 72%;
  }
}

.txt_main {
  font-weight: 500;
  font-size: 3vw;
  opacity: 0;
  @include desktop {
    font-size: 26px;
  }
  @include tablet {
    font-size: 5vw;
  }
}

.txt_sub {
  font-weight: 400;
  font-size: 2vw;
  margin-top: 1em;
  opacity: 0;
  @include desktop {
    font-size: 20px;
  }
  @include tablet {
    font-size: 3vw;
  }
}
</style>
