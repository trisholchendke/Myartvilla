angular
.module('LayoutDesigner')
.controller('LayoutDesignerWorkHistoryController', ['$scope', '$rootScope', '$location','$window', '$http',LayoutDesignerWorkHistoryController])
;
function LayoutDesignerWorkHistoryController($scope,$rootScope,$location,$window,$http){
	var refresh = function(){
		$.ajax({
			type: 'Post',
			url: '/get_work_history_of_layoutdesigner_user',
			dataType: 'json',
			data:{user_id:$window.sessionStorage.user_id},
			success: function (data) {
				$scope.$apply(function () {
					$scope.my_works = data;
				});
			}
		});
	}
	refresh();
	
	$.ajax({
        type: 'Post',
        url: '/get_my_all_notification',
        dataType: 'json',
        data:{user_id:$window.sessionStorage.user_id},
        success: function (data) {
        	
        }
	});
	
	$scope.accept_work = function(coming_object){
		$.ajax({
			type: 'Post',
			url: '/accept_request_of_work',
			dataType: 'json',
			data:{
					send_work_id:coming_object.send_work_id,
					read_status:0,
					notification_details:"Your Work Has Been Accepted by "+ coming_object.receiver_firstname + ' '+ coming_object.receiver_lastname +  "",
					sender_id:window.sessionStorage.user_id,
					receiver_id:coming_object.my_works[0].sender_id
				},
			success: function (data) {
				$scope.$apply(function () {
//					alert(JSON.stringify(data));
					refresh();
//					$scope.my_works = data[0];
//					var sender_ids = [];
//					$scope.my_works = data[0];
//					for(var i=0;i<data[0].my_works.length;i++){
//						sender_ids.push(data[0].my_works[i].sender_id);
//					}
				});
			}
		});
	}
	$scope.deny_work = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$.ajax({
			type: 'Post',
			url: '/deny_request_of_work',
			dataType: 'json',
			data:{
				send_work_id:coming_object.send_work_id,
				read_status:0,
				notification_details:"Your Work Has Been Rejected by "+ coming_object.receiver_firstname + ' '+ coming_object.receiver_lastname +  "",
				sender_id:window.sessionStorage.user_id,
				receiver_id:coming_object.my_works[0].sender_id
				
			},
			success: function (data) {
				$scope.$apply(function () {
					
					refresh();
//					$scope.my_works = data[0];
//					var sender_ids = [];
//					$scope.my_works = data[0];
//					for(var i=0;i<data[0].my_works.length;i++){
//						sender_ids.push(data[0].my_works[i].sender_id);
//					}
				});
			}
		});
	}
	
}

