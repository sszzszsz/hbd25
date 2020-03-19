<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <div class="bg_cont">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="1370.718"
          height="1225.018"
          viewBox="0 0 1370.718 1225.018"
          class="svg_pale"
        >
          <defs>
            <filter
              id="a"
              x="0"
              y="0"
              width="1370.718"
              height="1225.018"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="3" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="b" />
              <feFlood flood-color="#2c2c2c" flood-opacity="0.161" />
              <feComposite operator="in" in2="b" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
            <path
              d="M1081.773,4838.157c115.7-37.7,206.7,63.7,239.1-194.187s214.871-133.158,235.188-310.518,40.635-276.216,196.4-302.384S1912.51,3869.878,1933,3808.153s138.694-111.45,138.694-111.45h0V5049.42H864.673S966.073,4875.857,1081.773,4838.157Z"
              transform="translate(-3687.7 2077.69) rotate(-90)"
              fill="#e5cece"
            >
              <animate
                attributeName="d"
                values="
M1081.773,4838.157c115.7-37.7,206.7,63.7,239.1-194.187s214.871-133.158,235.188-310.518,40.635-276.216,196.4-302.384S1912.51,3869.878,1933,3808.153s138.694-111.45,138.694-111.45h0V5049.42H864.673S966.073,4875.857,1081.773,4838.157Z;
            M844.666,4938.96c20-61,138.646-15.322,327.952-120.24s54.144-396.4,191.932-451.835,311.886-3.713,323.028-200.5,33.417-237.628,204.211-271.044,179.9-198.638,179.9-198.638h0V5049.42H864.673S824.666,4999.96,844.666,4938.96Z;
            M1081.773,4838.157c115.7-37.7,206.7,63.7,239.1-194.187s214.871-133.158,235.188-310.518,40.635-276.216,196.4-302.384S1912.51,3869.878,1933,3808.153s138.694-111.45,138.694-111.45h0V5049.42H864.673S966.073,4875.857,1081.773,4838.157Z"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>

        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="1370.718"
          height="1250.625"
          viewBox="0 0 1370.718 1250.625"
        >
          <defs>
            <filter
              id="a"
              x="0"
              y="0"
              width="1370.718"
              height="1250.625"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="3" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="b" />
              <feFlood flood-color="#2c2c2c" flood-opacity="0.161" />
              <feComposite operator="in" in2="b" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
            <path
              d="M844.666,4938.96c20-61,138.646-15.322,327.952-120.24s54.144-396.4,191.932-451.835,311.886-3.713,323.028-200.5,33.417-237.628,204.211-271.044,179.9-198.638,179.9-198.638h0V5049.42H864.673S824.666,4999.96,844.666,4938.96Z"
              transform="translate(-3687.7 2077.69) rotate(-90)"
              fill="#e5cece"
            />
          </g>
        </svg> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="693.776"
          height="552.406"
          viewBox="0 0 693.776 552.406"
          class="svg_dark"
        >
          <defs>
            <filter
              id="a"
              x="0"
              y="0"
              width="693.776"
              height="552.406"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="3" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="b" />
              <feFlood flood-color="#570000" flood-opacity="0.349" />
              <feComposite operator="in" in2="b" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#a)">
            <path
              d="M1237.865,4708.665s-13.476-145.563,89.583-175.922,233.281-51.929,222.1-223.694,222.148-276.16,222.148-276.16-1.36,675.385,0,675.776Z"
              transform="translate(-4023.89 1777.69) rotate(-90)"
              fill="#d5a9a9"
            />
          </g>
        </svg>
      </div>
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
            <nuxt-link :to="'/point/' + point.id" class="point_item_inr">
              <!-- <p class="point_num">No. {{ point.id }}</p>
              <p v-html="point.mainText" class="point_txt" />
              <p>{{ point.subText }}</p> -->
              <div
                v-lazy-container="{
                  selector: 'img',
                  error: imgRender('bg_paper.jpg'),
                  loading: imgRender('bg_paper.jpg')
                }"
                class="point_box point_box-img"
              >
                <img :data-src="imgRender(point.bgFile)" :alt="point.mainText" />
              </div>
            </nuxt-link>
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
    this.interSect()
  },
  methods: {
    interSect() {
      const scrollItems = document.querySelectorAll('.point_item')
      const options = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
      if (scrollItems.length <= 0) return
      // インスタンス生成
      const observer = new IntersectionObserver(doWhenIntersect, options)
      // それぞれの対象要素を監視する
      for (let i = 0; i < scrollItems.length; i++) {
        const scrollItem = scrollItems[i]
        observer.observe(scrollItem)
      }

      // ----------------------------------------------------------------
      // 交差検知
      // 交差検知をしたもののなかで、isIntersectingがtrueのDOMをクラスを変える関数に渡す
      // ----------------------------------------------------------------
      function doWhenIntersect(entries, observer) {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          if (entry.isIntersecting) {
            addIntersectClass(entry.target)
            // 1度監視下に入った場合監視の解除
            observer.unobserve(entry.target)
          }
        }
      }

      // -----------------------------------------------------------------
      // クラスを付ける処理
      // -----------------------------------------------------------------
      function addIntersectClass(el) {
        const activeClass = 'is-intersected'
        el.classList.add(activeClass)
      }
    },
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
  overflow: hidden;
  // height: 100vh;
  &:before,
  &:after {
    content: '';
    display: block;
    position: fixed;
    z-index: 5;
    width: 100%;
    border-top: 10px solid;
    left: 0;
    border-color: var(--main-color);
  }
  &:before {
    top: 0;
  }
  &:after {
    top: calc(100vh - 10px);
  }
}

.cont {
  position: relative;
  background: url('~assets/img/bg_paper.jpg');
  overflow-y: auto;
  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */
  height: 100%;
  min-height: 100vh;
  z-index: 2;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: fixed;
    z-index: 5;
    width: 10px;
    height: 100vh;
    border-left: 10px solid;
    top: 0;
    border-color: var(--main-color);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}
.bg_cont {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;

  svg {
    position: fixed;
    top: 0;
    right: -10px;
    z-index: 4;
    width: 100%;
    height: auto;

    &.svg_dark {
      width: 50%;
    }
  }
}
.inr {
  padding-left: pcvw(150px);
  position: relative;
  z-index: 5;
  &:after {
    content: '';
    display: block;
    background: #8c3a27;
    opacity: 0.1;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.point {
  &_ttl {
    @include fontLB;
    font-size: pcfz(150px);
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
    font-size: pcfz(50px);
    color: $red;
  }
  &_list {
    position: relative;
    z-index: 2;
    padding: 5vh 2vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5vh 1.5vw;
  }
  &_item {
    opacity: 0;
    position: relative;
    box-shadow: rgba(110, 93, 93, 0.5) 0 0 10px;
    transform: translateY(10px);
    transition: opacity 1.4s ease, transform 0.8s ease;
    &.is-intersected {
      opacity: 1;
      transform: translateY(0px);
    }
    &_inr {
      display: block;
      background: #fff;
      height: 100%;
      padding: 1vw 1vw 4vw;
    }
  }
  &_box {
    color: $red;
    &-img {
      position: relative;
      width: 100%;
      height: 18.07vw;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.05;
        transform: translateY(10px);
        transition: opacity 1s ease, transform 0.8s ease;
        transition-delay: 0.1s;
        object-fit: cover;
      }
      img[lazy='loading'] {
        opacity: 0;
      }
      img[lazy='error'] {
        opacity: 0.05;
      }
      img[lazy='loaded'] {
        transform: translateY(0);
        opacity: 0.1;
      }
    }
  }
}
</style>
