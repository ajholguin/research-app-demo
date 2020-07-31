<template>
  <div class='container'>
    <div class='row'>
      <div class="col-sm-12">
        <nav-header @pageWasChanged='currentPage = $event'></nav-header>
      </div>
    </div>
    <div class="row">
      <keep-alive>
        <component :is='currentPage'></component>
      </keep-alive>
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
