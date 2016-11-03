angular
.module('Writer')
.controller('GiveawayViewThemeDetailsController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',GiveawayViewThemeDetailsController])
;
function GiveawayViewThemeDetailsController($scope,$rootScope,$location,$window,$http,$timeout){
//	alert('hi');
	 $scope.items = ['settings', 'home', 'options', 'other'];
	  $scope.selection = $scope.items[0];
	var str = $location.$$absUrl;
	var theme_id = str.replace("http://localhost:8080/Writer.html#/view_theme_details/", "");
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
				location.href="/Writer.html#/audience_quiz_details/"+ user_id +"";
	}
	
}

