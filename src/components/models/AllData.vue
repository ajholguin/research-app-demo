<template>
<div>
    <div class="canvas">
      <svg id='barplot' width=500 height=400></svg>
    </div>
    <div class="card" v-if="allValues.length > 0">
      <div class="card-header">
      Saved Values ({{ allValues.length }})
      </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(value, i) in all_values_sorted" :key="value.id">
          {{i}} | id {{value.id}}: ({{ value.x }}, {{ value.y | round2 }})
      </li>
      </ul>
    </div>
</div>
</template>

<!-- JS -->
<script>
  import * as d3 from "d3";
  const color = d3.scaleOrdinal(d3.schemeDark2);

  function compare(a, b) {
    let comparison = 0;
    if (a.x > b.x) {
        comparison = 1;
    } else if (a.x < b.x) {
        comparison = -1;
    }
    return comparison;
  }

  // Vue component
  export default {
    props: {
      allValues: {
        type: Array,
        required: true,
        validator: (prop) => prop.every(e => {
          return typeof e === 'object' &&
            typeof e.id === 'number' &&
            typeof e.x === 'number' &&
            typeof e.y === 'number'
        })
      }
    },
    computed: {
      all_values_sorted: function() {
        return this.allValues.sort(compare)
      }
    },
    watch: {
      allValues: function() {
        d3.select("#barplot")
          .selectAll("rect")
          .data(this.allValues)
          .enter().append("rect")
          .attr("x", d => d.x * 5)
          .attr("y", d => 390 - d.y)
          .attr("height", d => Math.abs(d.y))
          .attr("width", 4)
          .attr("fill", (d, i) => color(i));
      }
    },
    filters: {
      round2: function(x) {
        return x.toFixed(2);
      }
    }
  }
</script>

<!-- CSS -->
<style scoped>

</style>
