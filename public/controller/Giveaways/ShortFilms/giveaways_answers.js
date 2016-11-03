angular
.module('ShortFilms')
.controller('GiveawaysAnswerscontroller', ['$scope', '$rootScope', '$location','$window', '$http',GiveawaysAnswerscontroller])
;
function GiveawaysAnswerscontroller($scope,$rootScope,$location,$window,$http){
	$scope.answer_sheet = [];
	$scope.count = '';
	var str = $location.$$absUrl;
	var theme_id = str.replace("http://127.0.0.1:8080/ShortFilms.html#/quiz/", "");
//    alert(JSON.stringify($location));
//	alert(window.localStorage['audience_id']);
    $.ajax({
	        type: 'Post',
	        url: '/get_question_of_giveaway',
	        dataType: 'json',
	        data:{theme_id:theme_id},
	        success: function (data) {
	        	if(data.length>0){
	        		$scope.$apply(function () {
	        			for(var i=0;i<data[0].questions.length;i++){
	        				$scope.answer_sheet.push(data[0].questions[i]);
	        			}
	        		});
	        	}else{
	        		console.log("No Data");
	        	}
	        }
		});
    
	$scope.final_question_sheet = function(){
		for(var i=0;i<$scope.answer_sheet.length;i++){
			delete $scope.answer_sheet[i].$$hashKey;
			
		}
		var new_item = 
		{
				theme_id:theme_id,
				user_id:window.localStorage['audience_id'],
				answers:$scope.answer_sheet
		}
		$.ajax({
 	        type: 'Post',
 	        url: '/post_give_away_answers',
 	        dataType: 'json',
 	        data:new_item,
 	        success: function (data) {
 	        	$scope.$apply(function () {
// 	        		alert(JSON.stringify(data));
 	        		$location.path('/user_profile');
 	            });
 	        }
 		});
	};
	$scope.clear_question = function(coming_object){
//		alert(coming_object);
		delete $scope.answer_sheet[coming_object-1].answer;
//		alert(JSON.stringify($scope.answer_sheet[coming_object-1]));
//		$scope.answer_sheet[coming_object-1] = {};
	}
}

