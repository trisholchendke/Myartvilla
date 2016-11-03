angular
.module('Fashion')
.controller('GiveawaysSetQuestioncontroller', ['$scope', '$rootScope', '$location','$window', '$http',GiveawaysSetQuestioncontroller])
;
function GiveawaysSetQuestioncontroller($scope,$rootScope,$location,$window,$http){
	var str = $location.$$absUrl;
	var theme_id = str.replace("http://localhost:8080/Fashion.html#/set_question/", "");
//	alert(theme_id);
	
	$scope.answer_sheet = [];
	$scope.create_answer_sheet = function(){
		for(var i=0;i<$scope.no_of_question;i++){
			$scope.answer_sheet.push({question_id:i+1});
		}
	}
	$scope.final_question_sheet = function(coming_object){
		var new_item = 
		{
				theme_id:theme_id,
				user_id:$window.sessionStorage.user_id,
				questions:$scope.answer_sheet
		}
		$.ajax({
 	        type: 'Post',
 	        url: '/post_give_away_questions',
 	        dataType: 'json',
 	        data:new_item,
 	        success: function (data) {
 	        	$scope.$apply(function () {
// 	        		alert(JSON.stringify(data.theme_id));
// 	        		$scope.answer_sheet = [];
// 	        		$scope.no_of_question = '';	
// 	        		alert($location.$$absUrl + "/" + data.theme_id);
// 	        		window.location.href =  "/Writer.html#/theme_details/" + data.theme_id;
 	        		window.location.href =  "/Fashion.html#/share_theme/" + data.theme_id;
// 	        		window.location.href = '/Writer.html#/Writer_live_now/' + timestamp ;
 	            });
 	        }
 		});
	};
	$scope.clear_question = function(coming_object){
//		alert(JSON.stringify(coming_object));
//		alert(JSON.stringify($scope.answer_sheet[coming_object-1]));
		$scope.answer_sheet[coming_object-1] = {question_id:coming_object};
	}
	$scope.back_to_create_question_sheet = function(coming_object){
		$scope.answer_sheet = [];
		$scope.no_of_question = '';	
	}
}

