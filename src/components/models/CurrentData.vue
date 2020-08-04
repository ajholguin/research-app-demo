<template>
  <!-- Current data -->
  <div class="card">
    <div class="card-header">Python</div>
      <div class="card-body">
      <label for="px-x">X</label>
      <input id="py-x" class="slider" type="range" min="0" max="100"
        v-model.number="model.x"
        @mouseup="fetchData(model.x)">
      <span>{{ model.x }}</span>
      <hr>
      Model Output: {{ model.y | round2 }}
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

</style>
