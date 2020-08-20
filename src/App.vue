<template>
  <div class="page l-header--fixed">
    <nav-header></nav-header>
    <keep-alive>
      <component :is='currentPage'></component>
    </keep-alive>
    <nav-footer></nav-footer>
  </div>
</template>

<!-- JS -->
<script>
import * as ucd from './assets/js/scripts.js'   // UCD One Pattern Lab
import { EventBus } from './main.js'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Intro from './components/Intro.vue'
import ModelsOverview from './components/models/ModelsOverview.vue'
import Models from './components/models/Models.vue'
import PyodideModelPage from './components/models/PyodideModelPage.vue'

var PyModel = {
  ...Models,
  modelType: 'Python',
  modelTypeLogo: require('./assets/images/python-logo-generic.svg'),
  modelURL: 'https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_model/'
}
var RModel = {
  ...Models,
  modelType: 'R',
  modelTypeLogo: require('./assets/images/Rlogo.svg'),
  modelURL: 'https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/r_model/'
}

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
    modelsOverview: ModelsOverview,
    pyModel: PyModel,
    rModel: RModel,
    pyodideModelPage: PyodideModelPage
  },
  created() {
    EventBus.$on('pageChanged', page => this.currentPage = page)
  }
}
</script>

<!-- CSS -->
<style>
  @import './assets/css/style.css';
</style>
