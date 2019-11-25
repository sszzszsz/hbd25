<template>
  <div class="pagination_box">
    <span class="pagination_current">{{ currentNum }}</span>
    <span class="pagination_hyphen" />
    <span class="pagination_all">{{ allNum }}</span>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    allNum: {
      type: Number,
      default: 0
    },
    currentNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  &_box {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    font-size: 3.5vmin;
    font-family: 'Libre Baskerville', serif;
    color: #fff;
  }
  &_hyphen {
    display: inline-block;
    width: 20px;
    height: 1px;
    margin: 0 5px;
    background: #fff;
  }
}
</style>
