angular
.module('CoverDesigner',['ngRoute','angular.filter','angularUtils.directives.dirPagination'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Cover Designer")
		{
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/CoverDesigner/coverdesigner_user_dashboard.html',
			controller:'CoverDesignerDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/CoverDesigner/coverdesigner_user_profile.html',
			controller:'CoverDesignerUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/CoverDesigner/coverdesigner_user_post.html',
			controller:'CoverDesignerPostYourWorkController'
		})
		.when('/work_history',{
			templateUrl:'views/CoverDesigner/coverdesigner_work_history.html',
			controller:'CoverDesignerWorkHistoryController'
		})
		.when('/notifications',{
			templateUrl:'views/CoverDesigner/coverdesigner_notification.html',
			controller:'CoverDesignerNotificationController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/CoverDesigner/coverdesigner_post_work_history.html',
			controller:'CoverDesignerPostWorkHistoryController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			window.location.href = '/';
		}
}





