<template>
  <div class="mask_box">
    <svg
      ref="mask_svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 700"
      xml:space="preserve"
      class="mask_svg"
    >
      <g>
        <path
          ref="mask_path"
          class="mask_path"
          d="M431.168,195.248s24.629-98.77,127.457-125.6S825.135,84.283,838.169,235.484,641.249,520.82,587.6,558.62,478.963,668.354,470.273,686.652s-5.8,9.751-5.8,9.751S315.283,559.833,212.443,459.85,27.851,304.059,79.685,173.376s266.024-128.1,358.574,46.111c0,0,12.513-36.963,14.442-41.137,14.385-31.268,34.964-133.071,276.855-97.716,217.179,80.986,33.75,318.218-17.38,354.834S460.143,635.443,451.453,701.283c0,0-141.468-136.054-224.511-204.855S56.363,266.653,107.063,159.346,335.919,87.768,440.21,224.339c0,0-19.413-107.658,62.7-143.7S745.467,66.3,795.489,166.34s-31.881,188.647-94.163,293.51-220.9,191.437-229.589,248.739c0,0-139.052-160.952-208.572-206.068S-2.852,388.765,67.617,151.6C84.984,94.927,240.771,36.884,374.683,131.843c49.168,34.868,60.83,57.312,60.83,57.312"
          transform="translate(-46.726 -35.536)"
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
    max-height: 90%;
    @include tablet {
      width: 100%;
      margin: 0 auto;
    }
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
