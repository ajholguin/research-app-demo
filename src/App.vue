<template>
  <div class="page l-header--fixed">
    <nav-header @pageWasChanged='currentPage = $event'></nav-header>
    <keep-alive>
      <component :is='currentPage'></component>
    </keep-alive>
    <nav-footer @pageWasChanged='currentPage = $event'></nav-footer>
  </div>
</template>

<!-- JS -->
<script>
import * as ucd from './assets/js/scripts.js'   // UCD One Pattern Lab
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
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
    navFooter: Footer,
    intro: Intro,
    models: Models
  }
}
</script>

<!-- CSS -->
<style>
  @import './assets/css/style.css';
</style>
