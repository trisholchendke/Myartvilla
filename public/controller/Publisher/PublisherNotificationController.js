angular
.module('Publisher')
.controller('PublisherNotificationController', ['$scope', '$rootScope', '$location','$window', '$http',PublisherNotificationController])
;
function PublisherNotificationController($scope,$rootScope,$location,$window,$http){
	var refresh = function(){
		$.ajax({
			type: 'Post',
			url: '/get_my_all_notification',
			dataType: 'json',
			data:{user_id:$window.sessionStorage.user_id},
			success: function (data) {
				$scope.$apply(function () {
					$scope.notifications = data;
				});
			}
		});
		
		
		
		$.ajax({
			type: 'Post',
			url: '/mark_all_read',
			dataType: 'json',
			data:{user_id:$window.sessionStorage.user_id},
			success: function (data) {
				$.ajax({
			        type: 'Post',
			        url: '/get_publisher_unread_notification_count',
			        dataType: 'json',
			        data:{user_id:$window.sessionStorage.user_id},
			        success: function (data) {
			        	$("#notification_count").html(data.length);
			        }
				}); 
			}
		}); 
	}
	
	
	refresh();
	
}

