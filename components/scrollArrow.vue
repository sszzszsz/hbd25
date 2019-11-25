<template>
  <div class="scrollArrow_box">
    <span class="scrollArrow_item" />
    <span class="scrollArrow_item" />
    <span class="scrollArrow_item" />
  </div>
</template>

<style lang="scss" scoped>
.scrollArrow {

  &_box {
    position: absolute;
    bottom: 15px;
    left: 15px;
    z-index: 10;
  }

  &_item {
    display: block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }
}

@for $i from 1 through 3 {
  $DELAY: $i * 0.4s;

  @include keyframes(upDaown#{$i}) {

    0% {
      transform: translateY(0) rotate(45deg);
    }

    50% {
      transform: translateY(-50%) rotate(45deg);
    }

    100% {
      transform: translateY(0) rotate(45deg);
    }
  }

  .scrollArrow_item:nth-child(#{$i}) {
    @include animation(upDaown#{$i} 1.6s linear $DELAY infinite);
  }
}
</style>
