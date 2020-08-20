<template>
  <div class="page o-box">
    <main class="l-main">
      <div class="l-container">
        <div class="l-quad--half">
          <div class="l-quad__region">
            <div class="panel o-box--large">
              <h1 id='pagetitle' class="panel__title">{{ this.$options.modelType }} Model</h1>
              <img id='logo' :src='this.$options.modelTypeLogo' alt="Model Language Logo"/>
              <pyodide-model @xChanged='x=$event' @modelDataChanged='all_values.push($event)'></pyodide-model>
              <all-model-data :allValues='all_values'></all-model-data>
            </div>
          </div>
          <div class="l-quad__region">
            <div class="panel o-box--large">
              <h1 class="panel__title">Plot</h1>
              <scatter-plot :x='x' :plotdata='all_values'></scatter-plot>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<!-- JS -->
<script>
  import PyodideModel from './PyodideModel.vue';
  import ScatterPlot from './ScatterPlot.vue';
  import AllData from './AllData.vue';

  // Vue component
  export default {
    modelType: 'Python',
    modelTypeLogo: require('../../assets/images/python-logo-generic.svg'),
    data: function() {
      return {
        x: 0,
        all_values: []
      }
    },
    components: {
      pyodideModel: PyodideModel,
      scatterPlot: ScatterPlot,
      allModelData: AllData
    }
  }
</script>

<!-- CSS -->
<style scoped>
  #pagetitle {
    display: inline-block;
  }
  #logo {
    float: right;
    max-height:45px;
  }
</style>
