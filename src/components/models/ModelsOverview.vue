<template>
  <div class="page o-box">
    <main class="l-main">
      <div class="l-container">
        <div class="l-quad--full">
          <div class="l-quad__region">
            <div class="panel panel--weighted-underline o-box--large">
              <h1 class="panel__title"><span class="panel__title--weighted">Models</span></h1>
              <p>
              This prototype app uses a simple linear function as an example:
              </p>
              $$
              y = 2x + 1 + \underbrace{\mathcal{N}(0, 1)}_{\text{Random noise}}
              $$
              This same model is implemented both in R and in Python. Each model
              is deployed to an AWS Lambda function, and is callable via the
              API:
              <div class="sub-nav">
                <ul class="menu">
                  <li class='nav-item'><a class='nav-link' @click="pageSelected='pyModel'">Python</a></li>
                  <li class='nav-item'><a class='nav-link' @click="pageSelected='rModel'">R</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

export default {
  data: function() {
    return {
      pageSelected: ''
    }
  },
  watch: {
    pageSelected: function() {
      EventBus.$emit('pageChanged', this.pageSelected)
    }
  },
  mounted() {
    window.MathJax.startup.document.reset()
    window.MathJax.startup.document.render()
  }
}
</script>

<style scoped>
    
</style>