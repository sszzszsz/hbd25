<template>
  <div class="container">
    <p>post</p>
    {{ post }}
    <nuxt-link :to="{ name: 'test-id', params: { id: id } }">test</nuxt-link>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {}
  },
  asyncData({ params }) {
    return {
      post: require(`~/data/test.json`),
      param: params
    }
  },
  methods: {}
}
</script>
