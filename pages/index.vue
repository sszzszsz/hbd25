<template>
  <main class="main">
    <mousePointer />
    <div class="cont">
      <h1 class="title">
        test100
      </h1>
      <div class="links">
        <nuxt-link to="/test/" class="button--green">test</nuxt-link>
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

<style>
.main {
  padding: 10px;
  background: #fd0127;
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
  background: #fd0127;
  border: 5px solid #fff;
  padding: 10px;
  color: #fff;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #fff;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
