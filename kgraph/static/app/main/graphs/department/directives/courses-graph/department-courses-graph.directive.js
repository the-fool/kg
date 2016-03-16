(function ()
{
  'use strict';
  angular
    .module('app.graphs.department')
    .directive('departmentCoursesGraph', departmentCoursesGraph);

  /** @ngInject */
  function departmentCoursesGraph() {

    return {
      restrict: 'E',
      replace: false,
      scope: {data: '=chartData'},
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
