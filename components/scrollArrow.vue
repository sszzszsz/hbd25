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
  }
  &_item {
    display: block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(45deg);
  }
}
</style>
