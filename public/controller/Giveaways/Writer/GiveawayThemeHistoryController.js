angular
.module('Writer')
.controller('GiveawayThemeHistoryController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',GiveawayThemeHistoryController])
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
;
function GiveawayThemeHistoryController($scope,$rootScope,$location,$window,$http,$timeout){
		var refresh = function(){
		$.ajax({
	        type: 'Post',
	        url: '/get_artist_themehistory_data',
	        dataType: 'json',
	        data:{user_id:$window.sessionStorage.user_id},
	        success: function (data) {
	        	$scope.$apply(function () {
	                $scope.works = data;
	            });
	        }
		});
	}
	refresh();
	
	$scope.Start_GiveAways = function(theme_id,user_id){
		var theme_details = {};
		theme_details['theme_id'] = theme_id;
		theme_details['user_id'] = user_id;
		$location['theme_details'] = theme_details;
//		$location.path('set_question/:id');
	}
	$scope.getThemeDetails = function(theme_id){
//		alert(theme_id);
//		window.localStorage.setItem('theme_id',theme_id);
		location.href="/Writer.html#/view_theme_details/" + theme_id;
	}
	
}

