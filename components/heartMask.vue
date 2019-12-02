<template>
  <div class="mask_box">
    <svg
      ref="mask_svg_pc"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 700"
      xml:space="preserve"
      class="mask_svg pc"
    >
      <filter id="drop-shadow">
        <!-- 図形の影をSourceAlphaで取得、ぼかす-->
        <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
      </filter>
      <g>
        <path
          ref="mask_path"
          class="mask_path"
          d="M431.168,195.248s24.629-98.77,127.457-125.6S825.135,84.283,838.169,235.484,641.249,520.82,587.6,558.62,478.963,668.354,470.273,686.652s-5.8,9.751-5.8,9.751S315.283,559.833,212.443,459.85,27.851,304.059,79.685,173.376s266.024-128.1,358.574,46.111c0,0,12.513-36.963,14.442-41.137,14.385-31.268,34.964-133.071,276.855-97.716,217.179,80.986,33.75,318.218-17.38,354.834S460.143,635.443,451.453,701.283c0,0-141.468-136.054-224.511-204.855S56.363,266.653,107.063,159.346,335.919,87.768,440.21,224.339c0,0-19.413-107.658,62.7-143.7S745.467,66.3,795.489,166.34s-31.881,188.647-94.163,293.51-220.9,191.437-229.589,248.739c0,0-139.052-160.952-208.572-206.068S-2.852,388.765,67.617,151.6C84.984,94.927,240.771,36.884,374.683,131.843c49.168,34.868,60.83,57.312,60.83,57.312"
          transform="translate(-46.726 -35.536)"
        />
      </g>
    </svg>
    <svg
      ref="mask_svg_sp"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      xml:space="preserve"
      class="mask_svg sp"
    >
      <g>
        <path
          ref="mask_path"
          class="mask_path"
          d="M386.49,201.52c0,0,21.71-103.42,112.35-131.51s234.92,15.32,246.41,173.64
	C756.75,401.97,571.67,542.42,524.38,582S428.62,696.9,420.96,716.06c-7.66,19.15-5.11,10.21-5.11,10.21s-131.51-143-222.16-247.69
	S71.13,279.41,115.82,200.25s195.34-155.76,276.92,26.65c0,0,7.3-7.46,9-11.83c12.68-32.74,34.55-170.58,247.77-133.56
	c195.4,33.93,29.75,333.2-15.32,371.54c-45.07,38.34-222.16,209.39-229.82,278.33c0,0-124.7-142.46-197.9-214.5
	S21.34,322.82,66.03,210.46s236.5-121.48,328.43,21.52c0,0-38.6-105.79,35.45-151.75s208.11-7.66,273.23,93.2
	s-29.37,181.3-84.27,291.1c-54.9,109.8-188.96,214.5-196.62,274.5c0,0-122.57-168.53-183.85-215.77S20.06,311.32,60.92,184.92
	c15.4-47.64,157.74-149.22,275.78-49.79c43.34,36.51,53.62,60.01,53.62,60.01"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  mounted() {
    console.log('heart mask')
  }
})
</script>

<style lang="scss" scoped>
.mask {
  &_box {
    width: 100%;
    max-height: calc(100% - 6vw);
    transform: translateY(3.5vw);
    @include tablet {
      width: 100%;
      margin: 0 auto;
      transform: translateY(7vh);
    }
  }
  &_svg {
    width: 100%;
    height: 100%;
    &.sp {
      display: none;
    }
    &.pc {
      display: block;
    }
    @include tablet {
      &.sp {
        display: block;
      }
      &.pc {
        display: none;
      }
    }
  }

  &_path {
    // fill: none;
    stroke: var(--base-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: rgba(222, 222, 222, 0.5);
  }
}
</style>
