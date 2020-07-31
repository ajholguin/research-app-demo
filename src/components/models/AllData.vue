<template>
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
</template>

<!-- JS -->
<script>
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
    props: ['allValues'],
    computed: {
      all_values_sorted: function() {
        return this.allValues.sort(compare)
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
