<template>
  <div class='container'>
    <div class='row'>
      <nav-header @pageWasChanged='currentPage = $event'></nav-header>
    </div>
    <div class="row">
      <component :is='currentPage'></component>
    </div>
  </div>
</template>

<!-- JS -->
<script>
import Header from './components/Header.vue'
import Intro from './components/Intro.vue'
import Models from './components/models/Models.vue'

export default {
  data: function() {
    return {
      currentPage: 'intro'
    }
  },
  components: {
    navHeader: Header,
    intro: Intro,
    models: Models
  }
}
</script>

<!-- CSS -->
<style>
  html, body {
    margin: 5px;
    padding: 0;
  }
</style>
