<template>
  <div class="container">
    <p>id : {{ id }}</p>
    <p>text : {{ text }}</p>
    <p>
      <nuxt-link
        :to="{ name: 'test-id', params: { id: nextId } }"
        class="button--green"
        >test{{ nextId }}</nuxt-link
      >
    </p>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      head: {
        title: ''
      },
      targetData: '',
      text: ''
    }
  },
  asyncData({ params }) {
    return {
      params,
      jsonData: require(`~/data/test.json`),
      id: Number(params.id) - 1,
      nextId: Number(params.id) + 1
    }
  },
  mounted() {
    console.log(this.id)
    this.dataLen = this.jsonData.length
    this.targetData = this.jsonData[this.id]
    this.text = this.jsonData[this.id].text
    console.log(this.params)
  },
  methods: {}
}
</script>
