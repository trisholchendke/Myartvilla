angular
.module('Artist',['ngRoute','angular.filter','hSweetAlert','angular-rating','ngAnimate', 'ngSanitize', 'ui.bootstrap'])
.config(routs_artist)
//.run(function($FB){
//	$FB.init('624903007694347');
//})
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
//	alert('hi');
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Art And Photography")
		{
		$routeProvider
//		.when('/user_dashboard',{
//			templateUrl:'views/Artist/artist_dashboard.html',
//			controller:''
//		})
		.when('/work_history',{
			templateUrl:'views/Artist/artist_work_history.html',
			controller:'ArtistDashboardController'
		})
		.when('/user_profile',{
			templateUrl:'views/Artist/artist_profile.html',
			controller:'ArtistUserProfileController'
		})
		.when('/user_post',{
			templateUrl:'views/Artist/artist_post_my_work.html',
			controller:'ArtistPostYourWorkController'
		})
		.when('/giveaways',{
			templateUrl:'views/Giveaways/Artist/giveaways_theme.html',
			controller:'GiveawayThemeController'
		})
		.when('/giveaways_history',{
			templateUrl:'views/Giveaways/Artist/giveaways_theme_history.html',
			controller:'GiveawayThemeHistoryController'
		})
		.when('/set_question/:id',{
			templateUrl:'views/Giveaways/Artist/giveaway_set_question.html',
			controller:'GiveawaysSetQuestioncontroller'
		})
//		.when('/set_question/:id',{
//			templateUrl:'views/Giveaways/Artist/giveaway_set_question.html',
//			controller:'GiveawaysSetQuestioncontroller'
//		})
		.when('/share_theme/:id',{
			templateUrl:'views/Giveaways/Artist/giveaway_share_theme_quiz.html',
			controller:'GiveawayShareThemeController'
		})
//		.when('/theme_details/:id',{
//			templateUrl:'views/Giveaways/Artist/giveaway_theme_details.html',
//			controller:'GiveawayThemeDetailsController'
//		})
		.when('/giveaway_answers.html#/:id',{
			templateUrl:'giveaway_set_question.html',
			controller:'GiveawaysAnswerscontroller'
		})
		.when('/view_theme_details/:id',{
			templateUrl:'views/Giveaways/Artist/giveaway_view_theme_details.html',
			controller:'GiveawayViewThemeDetailsController'
		})
		.when('/audience_quiz_details/:id',{
			templateUrl:'views/Giveaways/Artist/giveaway_audience_quiz_details.html',
			controller:'AudienceQuizDetailsController'
		})
		.when('/artist_live_now/:id',{
				templateUrl:'views/Artist/Artistlive_now.html',
				controller:'Artistlive_nowController',
			})
		.when('/giveaway_details.html#/:id',{
			templateUrl:'audience_details.html',
		})
		.when('/share_post.html',{
			templateUrl:'share_post.html',
			controller:'SharePostController',
		})
		.otherwise({ redirectTo: '/user_profile' });
		}else{
			$routeProvider
			.when('/giveaway_answers.html/:id',{
				templateUrl:'giveaway_set_question.html',
				controller:'GiveawaysAnswerscontroller'
			})
//			.when('/theme_details/:id',{
//				templateUrl:'views/Giveaways/Artist/giveaway_theme_details.html',
//				controller:'GiveawayThemeDetailsController'
//			})
			.when('/set_question/:id',{
				templateUrl:'views/Giveaways/Artist/giveaway_set_question.html',
				controller:'GiveawaysSetQuestioncontroller'
			})
			.when('/artist_live_now/:id',{
				templateUrl:'views/Artist/Artistlive_now.html',
				controller:'Artistlive_nowController',
			})
			.when('/giveaway_details.html#/:id',{
				templateUrl:'audience_details.html',
			})
			.when('/share_post.html',{
				templateUrl:'share_post.html',
				controller:'SharePostController',
			})
			
		}
}





