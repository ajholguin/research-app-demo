<template>
  <!-- Current data -->
  <div class="panel">
    <h3>Input Value</h3>
    <div>
      <label for="px-x">X &rarr; {{ x }}</label>
      <input id="py-x" class="slider" type="range" min="0" max="100"
        v-model.number="x"
        @mouseup="updateAllData()">
    </div>
    <div>
      <h3>Model Output</h3>
      <strong>Y &rarr; {{ y | round2 }}</strong>
    </div>
  </div>
</template>

<!-- JS -->
<script>
  import {infinite} from '../../util.js';
  
  // ID generator
  const ids = infinite();
  
  // Vue component
  export default {
    data: function() {
      return {
        x: 0,
        y: 0
      }
    },
    watch: {
      x: function(x) {
        this.$emit('xChanged', x);  // notify dependents when X changes
        this.runModel(x)            // update Y
      }
    },
    methods: {
        runModel: function(x) {
          languagePluginLoader.then(() => {
            pyodide.globals.x = this.x
            this.y = pyodide.runPython(`
              from random import gauss
              2*x + 1 + gauss(0, 1)
            `);
          });
        },
        updateAllData: function () {
          var model_data = {
            id: ids.next().value,
            x: this.x,
            y: this.y
          }
          this.$emit('modelDataChanged', model_data);
        }
    },
    filters: {
      round2: function(x) {         // TODO: mixin
        return x.toFixed(2);
      }
    }
  }
</script>

<!-- CSS -->
<style scoped>
  #py-x {
    padding: 0;   /* fix issue coming from style.css (UCD One Pattern Lab) */
    box-shadow: none
  }
</style>
