<template>
  <div id="pointNum" />
</template>

<script>
import Vue from 'vue'
import PointNumEffect from './webgl/js/pointNumEffect'

export default Vue.extend({
  name: 'PointNumEffect',

  data() {
    return {}
  },
  mounted() {
    console.log('PointNumEffect')
    this.pointNum = new PointNumEffect(document.getElementById('pointNum'))
    this.pointNum.init()
  }
})
</script>

<style lang="scss" scoped>
#pointNum {
  width: 50%;
  height: 25vmin;
}
</style>
