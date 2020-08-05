<template>
  <div id='scatterplot'></div>
</template>

<script>
  import * as d3 from "d3";

  // basic plot variables
  const plotWidth = 400;
  const plotHeight = 400;
  const margin = {top: 10, right: 20, bottom: 20, left: 30};
  const graphWidth = plotWidth - margin.left - margin.right;
  const graphHeight = plotHeight - margin.top - margin.bottom;
  const color = d3.scaleOrdinal(d3.schemeDark2);

  export default {
    props: {
      plotdata: {
        type: Array,
        required: true,
        validator: (prop) => prop.every(e => {  // TODO: mixin
          return typeof e === 'object' &&
            typeof e.id === 'number' &&
            typeof e.x === 'number' &&
            typeof e.y === 'number'
        })
      }
    },
    mounted() {
      // set up plot
      var plot = d3.select('#scatterplot');

      var svg = plot.append('svg')    // main SVG
        .attr('id', 'plot-svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox','0 0 '+ Math.min(plotWidth, plotHeight)+' '+Math.min(plotWidth, plotHeight))
        .attr('preserveAspectRatio', 'xMinYMin');
      
      var graph = svg.append('g')     // graph group
        .attr('id', 'graph')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      graph.append('g')               // x-axis group
        .attr('id', 'xAxis-g')
        .attr('transform', `translate(0, ${graphHeight})`)
      graph.append('g')               // y-axis group
        .attr('id', 'yAxis-g')
      
      plot.append('div')              // tooltip
        .attr('id', 'plot-tooltip')
        .style('opacity', 0);
    },
    watch: {
      // update plot
      plotdata: function(data) {
        
        const svg = d3.select('#scatterplot > #plot-svg');
        const graph = svg.select('#graph');
        const xAxisGroup = graph.select('#xAxis-g');
        const yAxisGroup = graph.select('#yAxis-g');
        const tooltip = d3.select('#scatterplot > #plot-tooltip');

        const x = d3.scaleLinear()
          .domain([0, 100])
          .range([0, graphWidth]);
        const y = d3.scaleLinear()
          .domain([-10, 210])
          .range([graphHeight, 0]);
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
        
        graph.selectAll("circle")
          .data(data)
          .enter().append("circle")
          .attr("cx", d => x(d.x))
          .attr("cy", d => y(d.y))
          .attr("r", 4)
          .attr("fill", (d, i) => color(i))
          .on('mouseover', (d, i, n) => {
            d3.select(n[i])
              .transition()
              .duration(100)  // ms
              .style('opacity', 0.7);
            
            tooltip.transition(200).style('opacity', 0.9);
            tooltip.html('X: ' + d.x + '<br>' +
                        'Y: ' + d.y.toFixed(2))
              .style('left', d3.event.pageX - 110 + 'px')
              .style('top', d3.event.pageY - 100 + 'px');
          })
          .on('mouseout', (d, i, n) => {
            d3.select(n[i])
              .transition()
              .duration(100)  // ms
              .style('opacity', 1)
            
            tooltip.transition(500).style('opacity', 0);
          });
      }
    }
  }
</script>>

<style>
  #plot-tooltip {
    position:absolute;
    text-align: left;
    padding: 5px;
    font: 12px Helvetica, sans-serif;
    background: lightskyblue;
    border: 0px;
    border-radius: 5px;
    pointer-events: none;
  }
</style>
