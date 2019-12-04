<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <h1 class="title">
        point100
      </h1>
      <div class="link">
        <nuxt-link to="/point/1" class="link_item">point</nuxt-link>
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
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $red;
  letter-spacing: 1px;
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
