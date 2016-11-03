angular
.module('Editor',['ngRoute','angular.filter','angularUtils.directives.dirPagination'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Editor")
		{
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/Editor/editor_user_dashboard.html',
			controller:'EditorDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/Editor/editor_user_profile.html',
			controller:'EditorUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/Editor/editor_user_post.html',
			controller:'EditorPostYourWorkController'
		})
		.when('/work_history',{
			templateUrl:'views/Editor/editor_work_history.html',
			controller:'EditorWorkHistoryController'
		})
		.when('/notifications',{
			templateUrl:'views/Editor/editor_notification.html',
			controller:'EditorNotificationController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/Editor/editor_post_work_history.html',
			controller:'EditorPostWorkHistoryController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			window.location.href = '/';
		}
}





