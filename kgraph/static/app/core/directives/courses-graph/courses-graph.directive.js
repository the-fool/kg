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
      scope: {data: '=graphData'},
      link: link
    };

    function link(scope, element, attrs) {

        var chart = d3.select(element[0]);
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
    }
  }
})();
