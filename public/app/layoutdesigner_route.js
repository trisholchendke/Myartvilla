angular
.module('LayoutDesigner',['ngRoute','angular.filter','angularUtils.directives.dirPagination'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Layout Designer")
		{
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_user_dashboard.html',
			controller:'LayoutDesignerDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_user_profile.html',
			controller:'LayoutDesignerUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_user_post.html',
			controller:'LayoutDesignerPostYourWorkController'
		})
		.when('/work_history',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_work_history.html',
			controller:'LayoutDesignerWorkHistoryController'
		})
		.when('/notifications',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_notification.html',
			controller:'LayoutDesignerNotificationController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/LayoutDesigner/layoutdesigner_post_work_history.html',
			controller:'LayoutDesignerPostWorkHistoryController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			window.location.href = '/';
//			alert('Not Writer');
		}
}





