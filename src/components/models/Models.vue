<template>
  <div class="page o-box">
    <main class="l-main">
      <div class="l-container">
        <div class="l-quad--half">
          <div class="l-quad__region">
            <div class="panel o-box--large">
              <h1 class="panel__title">Python Model</h1>
              <current-model-data @modelDataChanged='all_values.push($event)'></current-model-data>
              <all-model-data :allValues='all_values'></all-model-data>
            </div>
          </div>
          <div class="l-quad__region">
            <div class="panel o-box--large">
              <h1 class="panel__title">Plot</h1>
              <scatter-plot :plotdata="all_values"></scatter-plot>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<!-- JS -->
<script>
  import CurrentData from './CurrentData.vue';
  import ScatterPlot from './ScatterPlot.vue';
  import AllData from './AllData.vue';

  // Vue component
  export default {
    data: function() {
      return {
        all_values: []
      }
    },
    components: {
      currentModelData: CurrentData,
      scatterPlot: ScatterPlot,
      allModelData: AllData
    }
  }
</script>

<!-- CSS -->
<style scoped>

</style>
