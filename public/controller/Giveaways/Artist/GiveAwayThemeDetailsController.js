angular
.module('Artist')
.controller('GiveawayThemeDetailsController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',GiveawayThemeDetailsController])
;
function GiveawayThemeDetailsController($scope,$rootScope,$location,$window,$http,$timeout){
//	alert('hi');
//	$scope.theme = "abc";
	var str = $location.$$absUrl;
	var theme_id = str.replace("http://127.0.0.1:8080/audience_details.html#/", "");
//	alert(theme_id);
		var refresh = function(){
//			var theme_id = window.localStorage.getItem('theme_id');
			$.ajax({
				url:"/get_theme_detailss",
				type:"post",
				dataType:"json",
				data:{theme_id:theme_id},
				success:function(data){
//					console.log(data);
//					alert(JSON.stringify(data));
					$scope.$apply(function(){
						$scope.works1 = data;
					})
				}
			});
	}
	refresh();
	
	$scope.getAudienceQuizDetails = function(user_id){
//		alert(user_id);
				location.href="/Artist#/audience_quiz_details/"+ user_id +"";
	}
		
}

