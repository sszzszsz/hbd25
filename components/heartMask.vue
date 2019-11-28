<template>
  <div class="mask_box">
    <svg
      ref="mask_svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      xml:space="preserve"
      class="mask_svg"
    >
      <g>
        <path
          ref="mask_path"
          class="mask_path"
          d="M385.2,172.4c0,0,24.9-119.2,128.9-151.6S783.6,38.5,796.8,221C810,403.6,597.6,565.5,543.4,611.1
	S433.5,743.6,424.7,765.7c-8.8,22.1-5.9,11.8-5.9,11.8S268,612.6,164,491.9S23.4,262.2,74.6,171S298.7-8.6,392.4,201.7
	c0,0,8.4-8.6,10.3-13.6c14.5-37.8,39.6-196.7,284.3-154c224.2,39.1,34.1,384.2-17.6,428.4S414.5,703.9,405.7,783.4
	c0,0-143.1-164.3-227.1-247.3S-33.8,312.3,17.5,182.7s271.3-140.1,376.8,24.8c0,0-44.3-122,40.7-175S673.8,23.7,748.5,140
	s-33.7,209-96.7,335.7S435,723,426.2,792.2c0,0-140.6-194.3-210.9-248.8C145,488.9-35.2,299,11.6,153.3
	c17.7-54.9,181-172.1,316.4-57.4c49.7,42.1,61.5,69.2,61.5,69.2"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      path: ''
    }
  },
  mounted() {
    console.log('heart mask')
    this.path = this.$refs.mask_path
    this.path.style.stroke = this.color
  }
})
</script>

<style lang="scss" scoped>
.mask {
  &_box {
    width: 100%;
    max-height: 80%;
  }
  &_svg {
    width: 100%;
    height: 100%;
  }

  &_path {
    fill: none;
    stroke-width: 2.4073;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>
