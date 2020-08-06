<template>
  <div class="panel o-box--large" v-if="allValues.length > 0">
    <h2 class="panel__title">Saved Values ({{ allValues.length }})</h2>
    <table class="table--hover">
      <thead>
        <th v-for="key in Object.keys(all_values_sorted[0])" :key="key">
          {{ key }}
        </th>
      </thead>
      <tbody>
        <tr v-for="value in all_values_sorted" :key="value.id">
          <td> {{value.id}} </td>
          <td> {{value.x}} </td>
          <td> {{value.y | round2}} </td>
        </tr>
      </tbody>
    </table>
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
