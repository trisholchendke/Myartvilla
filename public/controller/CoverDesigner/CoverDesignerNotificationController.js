angular
.module('CoverDesigner')
.controller('CoverDesignerNotificationController', ['$scope', '$rootScope', '$location','$window', '$http',CoverDesignerNotificationController])
;
function CoverDesignerNotificationController($scope,$rootScope,$location,$window,$http){
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
			        url: '/get_coverdesigner_unread_notification_count',
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

