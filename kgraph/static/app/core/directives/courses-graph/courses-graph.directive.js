(function ()
{
  'use strict';
  angular
  .module('app.core')
  .directive('coursesGraph', coursesGraph);

  /** @ngInject */
  function coursesGraph() {

    return {
      restrict: 'E',
      replace: false,
      scope: {
        data: '=graphData',
        onClick: '&'
      },
      link: link,
      controller: ctrl,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/app/core/directives/courses-graph/courses-graph.html',
    };

    function ctrl() {

    }

    function link(scope, element, attrs, controller) {
      var margin = {top: 10, right: 10, bottom: 10, left: 10};
      var w = 1000, h = 800;
      var width = w - margin.left - margin.right;
      var height = h - margin.top - margin.bottom;
      var el = d3.select(element[0])
                 .append('svg')
                 .attr({
                   'width': w,
                   'height': h
                 })
                 .append('g')
                 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                 .attr('id', 'mainGroup');

      var g = new dagre.graphlib.Graph().setGraph({
        rankdir: "LR"
      });

      var svg = d3.select(element[0]).select('svg');
      var inner = svg.select("g");

      controller.data.nodes.forEach(function(node) {
        g.setNode(node.id, {label: node.label});
      });

      controller.data.edges.forEach(function(edge) {
        g.setEdge(edge.from, edge.to, {
          label:'', lineInterpolate: 'basis'
        });
      });

      var render = new dagreD3.render();

      /*
        Special plugins
                          */
      var zoom = d3.behavior.zoom().on("zoom", function() {
        inner.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
      });


      /*
        Plugin invocations

                    */
      svg.call(zoom);

      render(inner, g);
      // listeners
      inner
        .selectAll("g.node")
        .on("click", function(nodeID) {
          console.log(scope.vm.onClick);
          scope.vm.onClick({nodeID: nodeID});
        })
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut);

      function mouseOver(d) {
        d3.select(this).classed('hovered', true);
      }
      function mouseOut(d) {
        d3.select(this).classed('hovered', false);
      }
      var initialScale = 0.75;

      zoom
        .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
        .scale(initialScale)
        .event(svg);
      svg.attr('height', g.graph().height * initialScale + 90);

      /*var bbox = svg.node().getBBox();
      var offsetX = (width - bbox.width)/2;

      d3.select('svg').insert('rect', '#mainGroup')
        .attr({
          'x': offsetX,
          'width': bbox.width + margin.left + margin.right,
          'height': bbox.height + margin.top + margin.bottom,
          'fill': '#F8F9FA'
        });

      d3.select('#mainGroup')
        .attr('transform', 'translate(' + (margin.left + offsetX) + "," + margin.top + ')');
        */

    }
  }
})();
