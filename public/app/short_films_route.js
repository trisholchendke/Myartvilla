angular
.module('ShortFilms',['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap','countrySelect','angular.filter'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
//	alert('hi');
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Short Films")
		{
		$routeProvider
		.when('/user_dashboard',{
			templateUrl:'views/ShortFilms/shortfilms_dashboard.html',
			controller:''
		})
		.when('/user_profile',{
			templateUrl:'views/ShortFilms/shortfilms_profile.html',
			controller:'ShortFilmsUserProfileController'
		})
		.when('/work_history',{
			templateUrl:'views/ShortFilms/shortfilms_work_history.html',
			controller:'ShortFilmsWorkHistoryController'
		})
		.when('/user_post',{
			templateUrl:'views/ShortFilms/shortfilms_post_my_work.html',
			controller:'ShortFilmsPostYourWorkController'
		})
		.when('/giveaways',{
			templateUrl:'views/Giveaways/ShortFilms/giveaways_theme.html',
			controller:'GiveawayThemeController'
		})
		.when('/giveaways_history',{
			templateUrl:'views/Giveaways/ShortFilms/giveaways_theme_history.html',
			controller:'GiveawayThemeHistoryController'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
		.when('/share_theme/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_share_theme_quiz.html',
			controller:'GiveawayShareThemeController'
		})
		.when('/theme_details/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_theme_details.html',
			controller:'GiveawayThemeDetailsController'
		})
		.when('/quiz/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_answer.html',
			controller:'GiveawaysAnswerscontroller'
		})
		.when('/view_theme_details/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_view_theme_details.html',
			controller:'GiveawayViewThemeDetailsController'
		})
		.when('/audience_quiz_details/:id',{
			templateUrl:'views/Giveaways/ShortFilms/giveaway_audience_quiz_details.html',
			controller:'AudienceQuizDetailsController'
		})
		.when('/live_now/:id',{
				templateUrl:'views/ShortFilms/ShortFilmslive_now.html',
				controller:'ShortFilmslive_nowController',
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
			.when('/live_now/:id',{
				templateUrl:'views/ShortFilms/ShortFilmslive_now.html',
				controller:'ShortFilmslive_nowController',
			})
			
		}
}





