<template>
  <div ref="p_box" class="pagination_box">
    <span class="pagination_current">{{ currentNum }}</span>
    <span ref="p_hyphen" class="pagination_hyphen" />
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
  },
  mounted() {
    console.log('page nation')
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
    color: var(--main-color);
    @include tablet {
      font-size: 5vmin;
    }
  }

  &_hyphen {
    display: inline-block;
    min-width: 20px;
    width: 5vw;
    height: 1px;
    margin: 0 5px;
    background: var(--main-color);
  }
}
</style>
