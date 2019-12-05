<template>
  <main ref="nav" class="nav">
    <div class="nav_cont">
      <div id="scrollArea" class="nav_inr">
        <span @click="closeNav($event)">閉じる</span>
        <ul class="pointlist">
          <li class="point_item js-scroll">TOP</li>
          <li
            v-for="point in pointData"
            v-bind:key="point.id"
            :class="{ active: isVisible }"
            class="point_item js-scroll"
          >
            <div class="point_item_inr">
              <div class="point_item_svg">
                <img src="~/assets/img/heart.svg" alt="" />
              </div>
              <div class="point_box">
                <nuxt-link :to="{ name: 'point-id', params: { id: point.id } }" class="point_btn">
                  <p class="point_num">すきなところ {{ point.id }}</p>
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
import pointJson from '~/assets/data/point.json'
import mousePointer from '~/components/mousePointer.vue'
import scroll from '~/mixins/scroll'

export default Vue.extend({
  components: {
    mousePointer
  },
  mixins: [scroll],
  head() {
    return {
      title: '好きなところ100 一覧'
    }
  },
  data() {
    return {
      pointData: pointJson,
      pontTxtList: [],
      linkTxt: 'SCROLL',
      isVisible: false
    }
  },
  created() {},
  mounted() {
    console.log('navi')
    this.setJsonData()
    const scrollArea = document.getElementById('scrollArea')
    this.scrollItem = document.querySelectorAll('.js-scroll')
    const _this = this
    scrollArea.addEventListener(
      'scroll',
      function() {
        _this.scr = scrollArea.scrollTop
        console.log(scrollArea.scrollTop)
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
    scrollAni() {
      for (let i = 0; i < this.scrollItem.length; i++) {
        const targetParallax = this.scrollItem[i].getAttribute('data-parallax')
        const transrateY = Number(targetParallax) * -(this.scr * 0.1)
        TweenMax.set(this.scrollItem[i], {
          y: transrateY
        })
        console.log(transrateY)
      }
    },
    closeNav(event) {
      TweenMax.to('.nav', 0.5, {
        opacity: 0
      })
    },
    test(evt, el) {
      console.log(window.scrollY)
      if (window.scrollY > 50) {
        el.setAttribute('style', 'opacity: 1; transform: translate3d(0, -10px, 0)')
      }
      return window.scrollY > 100
    }
  }
})
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding: 10px;
  border: 10px solid;
  border-color: $red;
  background: #fff;
  opacity: 0;
  transform: translateY(-100%);
}
.nav_cont {
  height: 100%;
  overflow: hidden;
}
.nav_inr {
  width: calc(100% + 17px);
  height: 100%;
  padding-right: 17px;
  overflow-y: scroll;
}
.point {
  &_item {
    position: relative;
    display: flex;
    opacity: 0;
    transition: opacity 0.3s ease-in;
    color: $red;
    & + & {
      margin-top: 30px;
    }
    &.in_view {
      opacity: 1;
    }
    &_inr {
      position: relative;
      width: 100%;
    }
    &_svg {
      display: none;
      position: absolute;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  &_num {
    font-size: 80%;
    margin-bottom: 5px;
  }
  &_btn {
    color: $red;
    text-decoration: none;
  }
}
</style>
