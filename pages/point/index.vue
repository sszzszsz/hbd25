<template>
  <main class="main">
    <div class="cont">
      <div id="scrollArea" class="inr">
        <p>point</p>
        <ul class="pointlist">
          <li
            v-for="point in pointData"
            v-bind:key="point.id"
            :data-parallax="[
              Number(point.id) % 3 == 2
                ? '1.3'
                : Number(point.id) % 3 == 0
                ? '2'
                : '1'
            ]"
            class="point_item js-scroll"
          >
            <div class="point_item_inr">
              <div class="point_item_svg">
                <img src="~/assets/img/heart.svg" alt="" />
              </div>
              <div class="point_box">
                <nuxt-link
                  :to="{ name: 'point-id', params: { id: point.id } }"
                  class="point_btn"
                >
                  <p>すきなところ {{ point.id }}</p>
                  <p v-html="point.mainText" class="point_txt" />
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
        <mousePointer :pointer-txt="linkTxt" />
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import TweenMax from 'gsap/umd/TweenMax'
import pontJson from '~/assets/data/point.json'
import mousePointer from '~/components/mousePointer.vue'

export default Vue.extend({
  components: {
    mousePointer
  },
  head() {
    return {
      title: '好きなところ100 一覧'
    }
  },
  data() {
    return {
      pointData: pontJson,
      pontTxtList: [],
      linkTxt: 'SCROLL'
    }
  },
  created() {},
  mounted() {
    console.log('point')
    this.setJsonData()
    const scrollArea = document.getElementById('scrollArea')
    this.scrollItem = document.querySelectorAll('.js-scroll')
    const _this = this
    console.log(_this.scrollItem)
    scrollArea.addEventListener(
      'scroll',
      function() {
        _this.scr = scrollArea.scrollTop
        console.log(scrollArea.scrollTop)
        _this.scrollAni()
      },
      { passive: true }
    )
  },
  methods: {
    setJsonData() {
      for (let i = 0; i < this.pointData.length; i++) {
        const targetTxt = this.pointData[i].mainText.replace('|', '<br>')
        this.pointData[i].mainText = targetTxt
        this.pointData.splice()
      }
    },
    handleScroll(evt, el) {},
    scrollAni() {
      for (let i = 0; i < this.scrollItem.length; i++) {
        const targetParallax = this.scrollItem[i].getAttribute('data-parallax')
        const transrateY = Number(targetParallax) * -(this.scr * 0.1)
        TweenMax.set(this.scrollItem[i], {
          y: transrateY
        })
        console.log(transrateY)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding: 10px;
  border: 10px solid;
  border-color: hsla(0, 50%, 50%, 1);
}
.cont {
  height: 100%;
  overflow: hidden;
}
.inr {
  width: calc(100% + 17px);
  height: 100%;
  padding-right: 17px;
  overflow-y: scroll;
}
.point {
  &_item {
    position: relative;
    display: flex;
    justify-content: center;
    &:nth-child(3n - 1) {
      justify-content: flex-start;
    }
    &:nth-child(3n) {
      justify-content: flex-end;
    }
    &_inr {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      text-align: center;
      width: 30vw;
      height: 24vw;
    }
    &_svg {
      position: absolute;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  &_btn {
    color: hsla(0, 50%, 50%, 1);
    text-decoration: none;
  }
}
</style>
