<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <h1 class="title">
        <span class="ttl_s">
          すずより
        </span>
      </h1>
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

export default Vue.extend({
  components: {
    mousePointer
  }
})
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  background: $red;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  --main-color: #bf4040;
}
.cont {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  background: #fff;
  padding: 10px;
  color: #fff;
}

.title {
  font-weight: 300;
  font-size: 12vw;
  color: $red;
  letter-spacing: 1px;
}

.ttl_s {
  font-size: 2vw;
  line-height: 1.2;
  padding-right: 10px;
}

.ttl_l {
  font-family: 'Libre Baskerville', serif;
}

.link_txt {
  position: relative;
  padding-top: 5vh;
  font-family: 'Libre Baskerville', serif;
  color: $red;
  .sp {
    display: none;
  }
  .pc {
    display: inline-block;
  }
  &:after {
    display: inline-block;
    content: '';
    width: 115%;
    height: 1px;
    background: $red;
    transform: translateX(-8%);
  }
  &:before {
    position: absolute;
    bottom: 0;
    left: -8%;
    display: inline-block;
    content: '';
    width: 15px;
    height: 15px;
    border-right: 1px solid $red;
    border-bottom: 1px solid $red;
    transform: rotate(135deg);
  }
  @include tablet {
    .sp {
      display: inline-block;
    }
    .pc {
      display: none;
    }
  }
}
.link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-indent: -9999px;
  z-index: 2;

  &_item {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
