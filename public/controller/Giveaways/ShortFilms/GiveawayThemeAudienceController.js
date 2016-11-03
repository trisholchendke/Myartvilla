angular
.module('ShortFilms')
.controller('GiveawayThemeAudienceController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',GiveawayThemeAudienceController])
;
function GiveawayThemeAudienceController($scope,$rootScope,$location,$window,$http,$timeout){
	$scope.audienceRegister = function(theme_id){
//		alert('hi');
		$scope.user_profile['audience_id'] = Math.floor(new Date().getTime()/1000);
		$scope.user_profile['theme_id'] = theme_id;
		$scope.user_profile['winner'] = 0;
		$.ajax({
			url:"/register_audience",
			type:"Post",
			dataType:"json",
			data:{audience_data:$scope.user_profile},
			success:function(data){
				if(data){
					window.localStorage['audience_id'] = data.audience_id;
//					window.localStorage['theme_id'] = data.theme_id;
//					alert(window.localStorage['audience_id']);
					
					location.href="/ShortFilms.html#/quiz/"+ theme_id +"";
				}else{
					console.log("data Not Found");
				}
//				alert(data.audience_id);
			}
			
		});
	}
}

