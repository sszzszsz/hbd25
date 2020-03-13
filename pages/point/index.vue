<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <div
        :class="{
          'is-ready': this.$store.state.global.loadingEnd === true
        }"
        class="inr"
      >
        <h1 class="point_ttl">
          <!-- <svg>
            <text x="50" y="0" writing-mode="tb">
              HAPPY BIRTHDAY
            </text>
          </svg> -->
          <span>
            HAPPY BIRTHDAY
          </span>
        </h1>
        <ul class="point_list">
          <li
            v-for="point in pointData"
            v-bind:key="point.id"
            :id="['point-' + point.id]"
            class="point_item"
          >
            <div class="point_item_inr">
              <div class="point_box point_box-txt">
                <p class="point_num">No. {{ point.id }}</p>
                <p v-html="point.mainText" class="point_txt" />
                <p>{{ point.subText }}</p>
              </div>
              <div class="point_box point_box-img">
                <img :src="imgRender(point.bgFile)" alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p class="link_txt">
        back to
        <span class="pc">HOME</span>
        <span class="sp">HOME</span>
      </p>
      <div class="link">
        <nuxt-link to="/" class="link_item">TOP</nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import mousePointer from '~/components/mousePointer.vue'
import pointJson from '~/assets/data/point.json'

export default Vue.extend({
  components: {
    mousePointer
  },

  head() {
    return {
      title: '好きなところ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `好きなところ`
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: '好きなところ' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `好きなところ`
        }
      ]
    }
  },
  data() {
    return {
      pointData: pointJson,
      pontTxtList: [],
      linkTxt: '',
      isVisible: false,
      menuFlag: false
    }
  },
  mounted() {
    console.log('point')
    this.setJsonData()
  },
  methods: {
    setJsonData() {
      let pointItem = {}
      for (let i = 0; i < this.pointData.length; i++) {
        const targetTxt = this.pointData[i].mainText.replace('|', '')
        pointItem.text = targetTxt
        pointItem.id = i + 1
        this.pontTxtList.push(pointItem)
        pointItem = {}
      }
    },
    imgRender(filename) {
      return require(`@/assets/img/${filename}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  --main-color: #bf4040;
}
.cont {
  position: relative;
  // border: 10px solid;
  border-color: var(--main-color);
}
.inr {
  padding-left: pcvw(150px);
}
.point {
  &_ttl {
    @include fontLB;
    font-size: pcfz(110px);
    letter-spacing: 0.03em;
    overflow: hidden;
    text-align: center;
    writing-mode: vertical-rl;
    position: absolute;
    left: 0;
    line-height: 1;
    font-family: 'Quattrocento', cursive;

    svg {
      stroke: var(--main-color);
      stroke-width: 1;
      fill: transparent;
    }
    span {
      display: inline-block;
      -webkit-text-stroke: 0.1px var(--main-color);
      color: transparent;
    }
  }
  &_num {
    @include fontLB;
    font-size: pcfz(100px);
    color: $red;
  }
  &_item {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }
  &_box {
    color: $red;
    &-img {
      position: absolute;
      bottom: 0;
      img {
        max-width: 75vw;
        max-height: 75vh;
        opacity: 0.1;
      }
    }
  }
}
</style>
