<template>
  <nav class="nav">
    <div id="menu" @click="toglleMenu($event)" :class="{ open: menuFlag }" class="menu-c">
      <span />
    </div>
    <div :class="{ is_active: menuFlag }" class="nav_cont">
      <div id="scrollArea" class="nav_inr">
        <ul class="point_list">
          <li v-for="point in pontTxtList" v-bind:key="point.id" :id="point.id" class="point_item">
            <div class="point_item_inr">
              <div class="point_box">
                <nuxt-link :to="{ name: 'point-id', params: { id: point.id } }" class="point_btn">
                  <p class="point_num">すきなところ {{ point.id }}</p>
                  <p v-html="point.text" class="point_txt" />
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <nuxt-link to="/" class="link_top">TOP</nuxt-link>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
import TweenMax from 'gsap/umd/TweenMax'
import pontJson from '~/assets/data/point.json'
import scroll from '~/mixins/scroll'

export default Vue.extend({
  mixins: [scroll],
  data() {
    return {
      pointData: pontJson,
      pontTxtList: [],
      linkTxt: '',
      isVisible: false,
      menuFlag: false
    }
  },
  created() {},
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
    toglleMenu(event) {
      if (this.menuFlag) {
        this.menuFlag = false
        this.$store.dispatch('global/writeGNaviOpen', false)
      } else {
        this.menuFlag = true
        this.$store.dispatch('global/writeGNaviOpen', true)
      }
    },
    scrollAni() {
      for (let i = 0; i < this.scrollItem.length; i++) {
        const targetParallax = this.scrollItem[i].getAttribute('data-parallax')
        const transrateY = Number(targetParallax) * -(this.scr * 0.1)
        TweenMax.set(this.scrollItem[i], {
          y: transrateY
        })
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.nav {
  position: absolute;
  height: 0;
  &_cont {
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    border: 10px solid;
    border-color: var(--main-color);
    overflow: hidden;
    background: #fff;
    transform: translateX(-125%);
<<<<<<< HEAD
    transition: transform 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955);
=======
    transition: transform 0.5s ease-in-out;
>>>>>>> remotes/origin/feature-brushup
    // border-bottom-right-radius: 50%;
    &.is_active {
      transform: translateX(0);
    }
  }
  &_inr {
    width: calc(100% + 17px);
    height: 100%;
    padding-right: 17px;
    overflow-y: scroll;
  }
}

.point {
  &_list {
    width: 90%;
    padding: 5vmin;

    br {
      display: none;
    }
  }
  &_item {
    position: relative;
    display: flex;
    justify-content: center;
    transition: opacity 0.3s ease-in;
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
      position: absolute;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  &_num {
    font-size: 80%;
  }
  &_txt {
    font-size: 3vmin;
  }
  &_btn {
    color: var(--main-color);
    text-decoration: none;
  }
}
.link_top {
  display: block;
  position: absolute;
  top: 80px;
  right: 25px;
  writing-mode: vertical-rl;
  text-align: center;
  text-decoration: none;
  text-orientation: inherit;
  transform: rotate(180deg);
  font-size: 3vh;
  font-family: 'Libre Baskerville', serif;
  color: var(--main-color);
}

/* margins */
$line-w: 25px;
$line-h: 2px;
$line-p: -6px;
$line-p2: 6px;

#menu {
<<<<<<< HEAD
  position: fixed;
=======
  position: absolute;
>>>>>>> remotes/origin/feature-brushup
  cursor: pointer;
  margin: 20px;
  width: 50px;
  height: 50px;
  right: 0;
  top: 0;
  background: var(--main-color);
<<<<<<< HEAD
  transition: all 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
=======
  @include transition(all 0.2s);
>>>>>>> remotes/origin/feature-brushup
  z-index: 100;
  border-radius: 50%;
}
.line {
  margin: 20px auto;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #000;
}
#menu > span {
  margin: 26%;
  position: absolute;
  top: 65%;
  display: block;
  width: $line-w;
  height: $line-h;
  margin-top: -0.5em;
  border-radius: 3px;
  background-color: $white;
}

.menu-c > span:before,
.menu-c > span:after {
  content: '';
  position: absolute;
  width: $line-w;
  height: $line-h;
  background-color: $white;
  border-radius: 3px;
  @include transition(all 0.1s);
}
.menu-c > span:before {
  @include transform-translateY($line-p);
}

.menu-c > span:after {
  @include transform-translateY($line-p2);
}
.menu-c.open {
  @include transform-rotate(45);
}

.menu-c.open > span:before {
  @include transform-rotate(90);
}

.menu-c.open > span:after {
  opacity: 0;
  @include transform-rotate(90);
}
</style>
