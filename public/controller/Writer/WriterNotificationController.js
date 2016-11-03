angular
.module('Writer')
.controller('WriterNotificationController', ['$scope', '$rootScope', '$location','$window', '$http',WriterNotificationController])
;
function WriterNotificationController($scope,$rootScope,$location,$window,$http){
	
		$.ajax({
			type: 'Post',
			url: '/get_all_notification',
			dataType: 'json',
			data:{user_id:$window.sessionStorage.user_id},
			success: function (data) {
				$scope.$apply(function () {
					$scope.notifications = data;
				});
				$.ajax({
					type: 'Post',
					url: '/mark_all_as_read',
					dataType: 'json',
					data:{user_id:$window.sessionStorage.user_id},
					success: function (data) {
						$.ajax({
					        type: 'Post',
					        url: '/get_writer_unread_notification_count',
					        dataType: 'json',
					        data:{user_id:$window.sessionStorage.user_id},
					        success: function (data) {
					        	$("#notification_count").html(data.length);
					        }
						});
						
					}
				});
			}
		});
	
}

