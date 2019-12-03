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
              Number(point.id) % 2 == 0
                ? 'js-2'
                : Number(point.id) % 3 == 0
                ? 'js-3'
                : ''
            ]"
            class="point_item js-scroll"
          >
            <div class="point_item_inr">
              <p v-html="point.mainText" class="point_txt" />
              <span>
                <nuxt-link
                  :to="{ name: 'point-id', params: { id: point.id } }"
                  class="point_btn"
                  >point{{ point.id }}</nuxt-link
                >
              </span>
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
    scrollArea.addEventListener(
      'scroll',
      function() {
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
    handleScroll(evt, el) {},
    scrollAni() {
      const scrollItem = document.querySelectorAll('.js-scroll')
      console.log(scrollItem)
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
    height: 20vh;
    // opacity: 0;
    &:nth-child(3n - 1) {
      justify-content: center;
    }
    &:nth-child(3n) {
      justify-content: flex-end;
    }
    &_inr {
      display: inline-block;
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
