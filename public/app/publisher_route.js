angular
.module('Publisher',['ngRoute','angular.filter','angularUtils.directives.dirPagination'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Publisher")
		{
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/Publisher/publisher_user_dashboard.html',
			controller:'PublisherDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/Publisher/publisher_user_profile.html',
			controller:'PublisherUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/Publisher/publisher_user_post.html',
			controller:'PublisherPostYourWorkController'
		})
		.when('/work_history',{
			templateUrl:'views/Publisher/publisher_work_history.html',
			controller:'PublisherWorkHistoryController'
		})
		.when('/notifications',{
			templateUrl:'views/Publisher/publisher_notification.html',
			controller:'PublisherNotificationController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/Publisher/publisher_post_work_history.html',
			controller:'PublisherPostWorkHistoryController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			window.location.href = '/';
//			alert('Not Writer');
		}
}





