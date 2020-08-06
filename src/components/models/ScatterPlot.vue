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
      x: {
        type: Number,
        required: true
      },
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

      var svg = plot.append('svg')        // main SVG
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox','0 0 '+ Math.min(plotWidth, plotHeight)+' ' + Math.min(plotWidth, plotHeight))
        .attr('preserveAspectRatio', 'xMinYMin');
      
      var graph = svg.append('g')           // graph group
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      var xAxisGroup = graph.append('g')    // x-axis group
        .attr('transform', `translate(0, ${graphHeight})`)
      var yAxisGroup = graph.append('g')    // y-axis group
      
      const xScale = d3.scaleLinear()       // x scale
        .domain([0, 100])
        .range([0, graphWidth]);
      const yScale = d3.scaleLinear()       // y scale
        .domain([-10, 210])
        .range([graphHeight, 0]);
      
      const xAxis = d3.axisBottom(xScale);  // add axes
      const yAxis = d3.axisLeft(yScale);
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);

      var tooltip = plot.append('div')      // tooltip
        .style('opacity', 0);

      // save references for later use
      this.$options.graph = graph;
      this.$options.xScale = xScale;
      this.$options.yScale = yScale;
      this.$options.tooltip = tooltip;
    },
    watch: {
      // update plot
      x: function(x) {
        const graph = this.$options.graph;
        const xScale = this.$options.xScale;
        const yScale = this.$options.yScale;

        graph.selectAll('line').remove()  // TODO: update rather than re-add
        graph.append('line')
          .attr("x1", xScale(x))
          .attr("y1", 0)
          .attr("x2", xScale(x))
          .attr("y2", graphHeight)
          .style("stroke-width", 1)
          .style("stroke", "salmon");
      },
      plotdata: function(data) {
        const graph = this.$options.graph;
        const xScale = this.$options.xScale;
        const yScale = this.$options.yScale;
        const tooltip = this.$options.tooltip;

        graph.selectAll("circle")
          .data(data, d => d.id)
          .enter().append("circle")
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
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

  #scatterplot {
    height: 400px;
  }
</style>
