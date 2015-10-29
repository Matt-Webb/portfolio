(function () {
    "use strict";
    var app = angular.module('webbApp', ['ngRoute', 'ngMap', 'ngAnimate']);
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
    				url: "/work",
    				config: {
    					templateUrl: "partials/work.html",
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

    app.controller('webbChessController', function ($scope) {

        $scope.title = "Welcome to the chess section!";

        // https://jsfiddle.net/t3f2ybfr/

        $scope.tableHeaders = ["Name", "Title", "Grade", "Result", "Color", "Date"];

        $.get('data/data.json', function (data) {

          // array to enable me to create js date object for correct table sorting:
          $scope.tableData = [];

          // parse response into JavaScript:
          $scope.data = angular.fromJson(data);

          // loop the results and bind to object before pushing to table data:
          $.each($scope.data, function(index, object) {
              var dateSplit = object.date.split('-');
              var player = {
                id: object.id,
                name: object.name,
                title: object.title,
                grade: object.grade,
                result: object.result,
                color: object.color,
                date: new Date(dateSplit[2], dateSplit[1], dateSplit[0])
              };
              $scope.tableData.push(player);
          });
          // important for rendering:
          $scope.$apply();
        });

        // default table filters:
        $scope.sortType = 'date';
        $scope.sortReverse = false;
        $scope.searchPlayer = '';
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
