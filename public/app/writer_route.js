angular
.module('Writer',['ngRoute','angular.filter','angular-rating','angularUtils.directives.dirPagination','ngAnimate', 'ngSanitize', 'ui.bootstrap'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
//	alert('hi');
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Writer")
		{
//		alert('This Is Artist');
//		window.location.href = '/dashboard';
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/Writer/writer_user_dashboard.html',
			controller:'WriterDashboardController'
		})
		.when('/service_providers',{
			templateUrl:'views/Writer/writer_service_providers.html',
			controller:'WriterServiceProvidersController'
		})
		.when('/user_profile',{
			templateUrl:'views/Writer/writer_user_profile.html',
			controller:'WriterUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/Writer/writer_user_post.html',
			controller:'WriterPostYourWorkController'
		})
		.when('/work_history',{
			templateUrl:'views/Writer/writer_work_history.html',
			controller:'WriterWorkHistoryController'
		})
		.when('/work_details',{
			templateUrl:'views/Writer/writer_work_details.html',
			controller:'WriterWorkDetailsController'
		})
		.when('/notifications',{
			templateUrl:'views/Writer/writer_notification.html',
			controller:'WriterNotificationController'
		})
		.when('/post_my_work_history',{
			templateUrl:'views/Writer/writer_post_work_history.html',
			controller:'WriterPostWorkHistoryController'
		})
		.when('/giveaways',{
			templateUrl:'views/Giveaways/Writer/giveaways_theme.html',
			controller:'GiveawayThemeController'
		})
		.when('/giveaways_history',{
			templateUrl:'views/Giveaways/Writer/giveaways_theme_history.html',
			controller:'GiveawayThemeHistoryController'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
		.when('/share_theme/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_share_theme_quiz.html',
			controller:'GiveawayShareThemeController'
		})
		.when('/theme_details/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_theme_details.html',
			controller:'GiveawayThemeDetailsController'
		})
		.when('/quiz/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_answer.html',
			controller:'GiveawaysAnswerscontroller'
		})
		.when('/view_theme_details/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_view_theme_details.html',
			controller:'GiveawayViewThemeDetailsController'
		})
		.when('/audience_quiz_details/:id',{
			templateUrl:'views/Giveaways/Writer/giveaway_audience_quiz_details.html',
			controller:'AudienceQuizDetailsController'
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			$routeProvider
			.when('/quiz/:id',{
				templateUrl:'views/Giveaways/ShortFilms/giveaway_answer.html',
				controller:'GiveawaysAnswerscontroller'
			})
			.when('/theme_details/:id',{
				templateUrl:'views/Giveaways/ShortFilms/giveaway_theme_details.html',
				controller:'GiveawayThemeDetailsController'
			})
		}
}





