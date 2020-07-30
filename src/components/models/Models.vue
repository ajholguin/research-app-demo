<template>
  <div class="col-sm-6">
    <!-- Current data -->
    <div class="card">
      <div class="card-header">Python</div>
      <div class="card-body">
      <label for="px-x">X</label>
      <input id="py-x" type="range" min="0" max="100" v-model="model.x" @mouseup="fetchData(model.x)" class="slider">
      <span>{{ model.x }}</span>
      <hr>
      Model Output: {{ model.y | round2 }}
      </div>
    </div><br>
    <!-- Values list -->
    <div class="card" v-if="all_values.length > 0">
      <div class="card-header">
      Saved Values ({{ all_values.length }})
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(value, i) in all_values_sorted" :key="value.id">
            {{i}} | id {{value.id}}: ({{ value.x }}, {{ value.y | round2 }})
        </li>
      </ul>
    </div>
  </div>
</template>

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

  function compare(a, b) {
    let comparison = 0;
    if (a.x > b.x) {
        comparison = 1;
    } else if (a.x < b.x) {
        comparison = -1;
    }
    return comparison;
  }
  
  // --- //
  export default {
    data: function() {
      return {
        model: {
          id: ids.next().value,
          x: 0,
          y: 0
        },
        all_values: []
      }
    },
    created: function () {
      this.fetchData('0');
    },
    methods: {
      fetchData: function (x) {
        axios
          .get(`https://7tw2vvqr25.execute-api.us-west-1.amazonaws.com/Prod/py_model/${x}/`)
          .then(response => {
            this.model.y = response.data.model_output;
            this.all_values.push({
              'id': ids.next().value,
              'x': parseFloat(x),
              'y': this.model.y})
          })
      }
    },
    computed: {
      all_values_sorted: function() {
        return this.all_values.sort(compare)
      }
    },
    filters: {
      round2: function(x) {
        return x.toFixed(2);
      }
    }
  }
</script>

<style scoped>

</style>
