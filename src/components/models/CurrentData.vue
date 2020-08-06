<template>
  <!-- Current data -->
  <div class="panel">
    <h3>Input Value</h3>
    <div>
      <label for="px-x">X &rarr; {{ model.x }}</label>
      <input id="py-x" class="slider" type="range" min="0" max="100"
        v-model.number="model.x"
        @mouseup="fetchData(model.x)">
    </div>
    <div>
      <h3>Model Output</h3>
      <strong>Y &rarr; {{ model.y | round2 }}</strong>
    </div>
  </div>
</template>

<!-- JS -->
<script>
  import axios from "axios";
  import regeneratorRuntime from "regenerator-runtime";  // allow generator function in older browsers

  function* infinite() {
    let index = 0;
    
    while (true) {
        yield index++;
    }
  }
  const ids = infinite();
  
  // Vue component
  export default {
    data: function() {
      return {
        model: {
          id: 0,
          x: 0,
          y: 0
        }
      }
    },
    created: function () {
      this.fetchData(this.model.x);
    },
    methods: {
      fetchData: function (x) {
        // get model output
        axios
          .get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_model/${x}/`)
          .then(response => {
            this.model.y = response.data.model_output;
            this.model.id = ids.next().value
            // create and trigger event
            const model_copy = {...this.model};         // copy model data to prevent reactive updates
            this.$emit('modelDataChanged', model_copy);
          });
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
