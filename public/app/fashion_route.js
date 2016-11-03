angular
.module('Fashion',['ngRoute','angular.filter','angular-rating'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
//	alert('hi');
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Fashion")
		{
//		alert('This Is Fashion');
//		window.location.href = '/dashboard';
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/Fashion/fashion_user_dashboard.html',
			controller:'FashionDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/Fashion/fashion_user_profile.html',
			controller:'FashionUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/Fashion/fashion_user_post.html',
			controller:'FashionPostYourWorkController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/Fashion/fashion_post_work_history.html',
			controller:'FashionPostWorkHistoryController'
		})
		.when('/giveaways',{
			templateUrl:'views/Giveaways/Fashion/giveaways_theme.html',
			controller:'GiveawayThemeController'
		})
		.when('/giveaways_history',{
			templateUrl:'views/Giveaways/Fashion/giveaways_theme_history.html',
			controller:'GiveawayThemeHistoryController'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/Fashion/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
		.when('/share_theme/:id',{
			templateUrl:'views/Giveaways/Fashion/giveaway_share_theme_quiz.html',
			controller:'GiveawayShareThemeController'
		})
		.when('/giveaway_answers.html#/:id',{
			templateUrl:'giveaway_set_question.html',
			controller:'GiveawaysAnswerscontroller'
		})
		.when('/view_theme_details/:id',{
			templateUrl:'views/Giveaways/Fashion/giveaway_view_theme_details.html',
			controller:'GiveawayViewThemeDetailsController'
		})
		.when('/audience_quiz_details/:id',{
			templateUrl:'views/Giveaways/Fashion/giveaway_audience_quiz_details.html',
			controller:'AudienceQuizDetailsController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			$routeProvider
			.when('/giveaway_answers.html/:id',{
				templateUrl:'giveaway_set_question.html',
				controller:'GiveawaysAnswerscontroller'
			})
			.when('/giveaway_details.html#/:id',{
				templateUrl:'audience_details.html',
			})
		}
}





