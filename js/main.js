
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
          console.log("success", data);
          $scope.data = angular.fromJson(data);
          $scope.$apply();
        });

    });

    app.controller("dataImagesWork", function ($scope) {
        $scope.images_work = [
              { num: 1, category: 'marketing', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 2, category: 'branding', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 3, category: 'design', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 4, category: 'photo', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 5, category: 'marketing', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 6, category: 'design', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 7, category: 'photo', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 8, category: 'marketing', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" },
              { num: 9, category: 'design', src: "1100x1057", description: 'Oscar is a decent man. He used to clean porches with pleasure. ', url_details: "details.html" }];

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

}(angular.module('webbApp')));
