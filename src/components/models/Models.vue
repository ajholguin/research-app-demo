<template>
  <div class="col-sm-6">
    <current-model-data @modelDataChanged='all_values.push($event)'></current-model-data>
    <br>
    <all-model-data :allValues='all_values'></all-model-data>
  </div>
</template>

<!-- JS -->
<script>
  import CurrentData from './CurrentData.vue'
  import AllData from './AllData.vue'

  // Vue component
  export default {
    data: function() {
      return {
        all_values: []
      }
    },
    components: {
      currentModelData: CurrentData,
      allModelData: AllData
    }
  }
</script>

<!-- CSS -->
<style scoped>

</style>
