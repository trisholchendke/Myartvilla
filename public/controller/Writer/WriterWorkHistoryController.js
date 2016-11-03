angular
.module('Writer')
.controller('WriterWorkHistoryController', ['$scope', '$rootScope', '$location','$window', '$http',WriterWorkHistoryController])
;
function WriterWorkHistoryController($scope,$rootScope,$location,$window,$http){
	var refresh = function(){
		$.ajax({
			type: 'Post',
			url: '/get_work_history_of_writer_user',
			dataType: 'json',
			data:{user_id:$window.sessionStorage.user_id},
			success: function (data) {
				console.log(data);
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
	
	$scope.getDetails = function(send_work_id){
		window.localStorage.setItem('send_work_id',send_work_id);
		location.href="/Writer.html#/work_details";
	}
	
	$scope.accept_work = function(coming_object){
		alert(JSON.stringify(coming_object));
		$.ajax({
			type: 'Post',
			url: '/accept_request_of_work',
			dataType: 'json',
			data:{
					send_work_id:coming_object.send_work_id,
					read_status:0,
					notification_details:"Your Work Has Been Accepted",
					sender_id:window.sessionStorage.user_id,
					receiver_id:coming_object.sender_id
				
				},
			success: function (data) {
				$scope.$apply(function () {
					refresh();
				});
			}
		});
	}
	$scope.deny_work = function(coming_object){
		$.ajax({
			type: 'Post',
			url: '/deny_request_of_work',
			dataType: 'json',
			data:{
				send_work_id:coming_object.send_work_id,
				read_status:0,
				notification_details:"Your Work Has Been Rejected",
				sender_id:window.sessionStorage.user_id,
				receiver_id:coming_object.sender_id
			},
			success: function (data) {
				$scope.$apply(function () {
					alert(JSON.stringify(data));
					refresh();
				});
			}
		});
	}
	
}

