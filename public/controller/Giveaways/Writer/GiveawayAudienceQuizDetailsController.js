angular
.module('Writer')
.controller('AudienceQuizDetailsController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',AudienceQuizDetailsController])
;
function AudienceQuizDetailsController($scope,$rootScope,$location,$window,$http,$timeout){
			var str = $location.$$absUrl;
//			alert(str)
			var audience_id = str.replace("http://localhost:8080/Writer.html#/audience_quiz_details/", "");
//			alert(audience_id);
//	alert(JSON.stringify($window.localStorage.audience_id));
//			alert('hi');
		$.ajax({
			url:"/get_audience_quiz_details",
			type:"post",
			dataType:"json",
			data:{user_id:audience_id},
			success:function(data){
//				alert(JSON.stringify(data));
				$scope.$apply(function(){
					$scope.answers = data;
//					alert(JSON.stringify(data));
				});
			}
		});
		
		$scope.makeWinner = function(audience_id,theme_id){
//			alert(theme_id);
			$.ajax({
				url:"/make_audience_winner",
				type:"post",
				dataType:"json",
				data:{user_id:audience_id,theme_id:theme_id},
				success:function(data){
					location.href="Writer.html#/giveaways_history";
				}
			});
		}
		
		 $scope.back = function(){
			 $window.location = window.history.back()
			 
		 }
}

