<template>
  <div class="container">
    <div class="inr">
      <p>json data number : {{ id }}(本来は{{ id + 1 }}個目のデータ)</p>
      <p>text : {{ text }}</p>
      <p v-if="nextId <= dataLen">
        <nuxt-link
          :to="{ name: 'test-id', params: { id: nextId } }"
          class="button--green"
          >test{{ nextId }}</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      dataLen: 0,
      targetData: '',
      text: ''
    }
  },
  async asyncData({ params }) {
    const jsonData = await import(`~/assets/data/test.json`)
    return {
      params,
      jsonData,
      id: Number(params.id) - 1,
      nextId: Number(params.id) + 1
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      this.dataLen = this.jsonData.default.length
      this.targetData = this.jsonData[this.id]
      this.text = this.jsonData[this.id].text
      console.log(this.id)
      console.log(this.nextId <= this.dataLen)
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
