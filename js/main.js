(function () {
    "use strict";
    var app = angular.module('webbApp', ['ngRoute', 'ngMap', 'ngAnimate','chart.js']);
}());

(function (app) {

    "use strict";

    /**
    * Configure the Routes
    */
    app.config(['$routeProvider', function ($routeProvider) {

    		var routes = [
    			{ // HOME
    				url: "/",
    				config: {
    					templateUrl: "partials/home.html",
    					controller: "webbBodyController"
    				}
    			},
    			{ // PAGES
    				url: "/projects",
    				config: {
    					templateUrl: "partials/projects.html",
    					controller: "webbBodyController"
    				}
    			},
    			{
    				url: "/experiences",
    				config: {
    					templateUrl: "partials/experiences.html",
    					controller: "webbBodyController"
    				}
    			},
                {
                    url: "/chess",
                    config: {
                        templateUrl: "partials/chess.html",
                        controller: "webbChessController"
                    }
                },
    			{
    				url: "/contact",
    				config: {
    					templateUrl: "partials/contact.html",
    					controller: "webbBodyController"
    				}
    			}
    		];

    		routes.forEach(function(route) {
    			$routeProvider.when(route.url, route.config);
    		});

    		$routeProvider.otherwise("/404", { templateUrl: "partials/404.html", controller: "webbBodyController" });

    }]);


    app.controller('webbBodyController', function ($scope) {


    });

    app.controller('webbChessController', function ($scope, $http, $filter) {

        // https://jsfiddle.net/t3f2ybfr/
        $.get('data/data.json', function(data) {
          console.log("request complete!");
          // array to enable me to create js date object for correct table sorting:
          $scope.tableData = [];

          // parse response into JavaScript:
          $scope.data = angular.fromJson(data);

          // loop the results and bind to object before pushing to table data:
          $.each($scope.data, function(index, object) {
              var dateSplit = object.date.split('-');
              var gameDate = new Date(dateSplit[2], dateSplit[1], dateSplit[0]);
              var today = new Date();

              var player = {
                id: object.id,
                name: object.name,
                title: object.title,
                event: object.event,
                grade: object.grade,
                elo: object.grade,
                result: object.result,
                color: object.color,
                date: gameDate,
                gameAge: Math.round(Math.abs((today.getTime() - gameDate.getTime())/(24*60*60*1000)))
              };
              $scope.tableData.push(player);
          });
          // important for rendering:
          $scope.$apply();
        });

        $scope.labels = ["White", "Black"];
        $scope.pieData = [0, 0];

        $scope.filterTableBy = function() {
          console.log("executing...");
            $filter($scope.filteredResults)('W');
        };

        var resultType = {
          win: "1",
          loss: "0",
          draw: "½",
          color: {
            white: "W",
            black: "B"
          }
        };

        // computes the displayed list of table results for 'wins', 'draws' and 'loses':
        $scope.resultCount = function() {
          var counter = 0;

          var win = 0;
          var loss = 0;
          var draw = 0;

          var countWhite = 0;
          var countBlack = 0;
          if($scope.filteredResults) {
            $.each($scope.filteredResults, function(index, object) {
              win = object.result === resultType.win ? win + 1 : win;
              draw = object.result === resultType.draw ? draw + 1 : draw;
              loss = object.result === resultType.loss ? loss + 1 : loss;

              countWhite = object.color === resultType.color.white ? countWhite + 1 : countWhite;
              countBlack = object.color === resultType.color.black ? countBlack + 1 : countBlack;
            });
          }
          $scope.pieData[0] = countWhite;
          $scope.pieData[1] = countBlack;
          $scope.win = win;
          $scope.loss = loss;
          $scope.draw = draw;
          return counter;
        };

        $scope.selectedNumber = null;

        // default table filters:
        $scope.eloMultipler = 7.5;
        $scope.eloIncriment = 700;
        $scope.sortType = 'date';
        $scope.sortReverse = true;
        $scope.searchPlayer = '';

        $scope.resultCount();

    });


    //'use strict';
    app.directive('autoActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('current');
                            } else {
                                angular.element(li).removeClass('current');
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        };
    }]);

	app.directive('webbHeader', function () {

		return {
			restrict: 'E',
			templateUrl: 'templates/header.html',
			link: function (scope, element, attributes) {
			}
		};

	});


	app.directive('webbFooter', function () {

		return {
			restrict: 'E',
			templateUrl: 'templates/footer.html',
			link: function (scope, element, attributes) {
			}
		};

	});

} (angular.module('webbApp')));
