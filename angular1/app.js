// <script src="angular.js"></script>
// <script src="d3.js"></script>

angular.module('app', [])
.directive('barGraph', function() {
  return {
    scope: {
      data: '=bindData'
    },
    controller: BarGraph
  };
  function BarGraph($scope, $element, $attrs) {

    var el    = $element[0];
    var graph = d3.select(el);

    var $divs = graph.
      append('div').
      attr({
        'class': 'chart'
      }).
      style({
        'width':  $attrs.width  + 'px',
        'height': $attrs.height + 'px',
      }).
      selectAll('div');

    function render(newValue){
      if (!newValue) return;

      $divs.data(newValue).enter().append('div')
        .transition().ease('elastic')
        .style('width', function(d) { return d + '%'; })
        .text(function(d) { return d + '%'; });
    }

    $scope.$watch('data', render);
  }
});

// angular.module('app')
// .controller('AppController', function($scope){
//   $scope.graphData = [10,20,30,40,60];
// });
/**/
angular.module('app')
.directive('app', function() {
  return {
    template: ['',
    '  <h1 class="title">Angular 1 + d3</h1>',
    '',
    '  <bar-graph',
    '    bind-data="graphData"',
    '    width="500"',
    '    height="130"',
    '  >',
    '  </bar-graph>',
    '',
    ''].join('\n'),
    controller: App
  }
  function App($scope) {
    $scope.graphData = [10,20,30,40,60];
  }
});

angular.bootstrap(document, ['app']);
