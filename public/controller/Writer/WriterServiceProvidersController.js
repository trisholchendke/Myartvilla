angular
.module('Writer')
.controller('WriterServiceProvidersController', ['$scope', '$rootScope', '$location',	'$window', '$http','$timeout',WriterServiceProvidersController])
;
function WriterServiceProvidersController($scope,$rootScope,$location,$window,$http,$timeout){
	var refresh = function(){
		window.localStorage.getItem("role");
		window.localStorage.getItem("max_price");
		window.localStorage.getItem("min_price");
		$.ajax({
			url:"/get_rolewise_data",
			type:"post",
			data:{
					role:window.localStorage.getItem("role"),
					send_work_id:window.localStorage.getItem("send_work_id"),
					min_price:window.localStorage.getItem("min_price"),
					max_price:window.localStorage.getItem("max_price")
				},
			dataType:"json",
			success:function(data){
				var rec =[];
				$.ajax({
					url:"/get_related_receiver_ids",
					type:"post",
					dataType:"json",
					data:{
						send_work_id:window.localStorage.getItem("send_work_id"),
					},
					success:function(data1){
						for(var j=0;j<data1.length;j++){
							rec[j] = data1[j].receiver_id;
						}
						
						$scope.$apply(function(){
							$scope.service_providers = data;
						});
						
						for(var i=0;i<data.length;i++){
							if($.inArray(data[i].user_id,rec) !== -1){
								$(".select_"+data[i].user_id).prop("disabled",true);
								$(".select_"+data[i].user_id).html('Sent');
								
							}
						}
						
					}
					
				})
				
			}
		});
	}

	refresh();
	
	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sendToHim = function(provider){
		$.ajax({
			url:"/send_to_him",
			type:"post",
			dataType:"json",
			data:{
				receiver_id:provider.user_id,
				send_work_id:window.localStorage.getItem("send_work_id"),
				receiver_firstname:provider.firstname,
				receiver_lastname:provider.lastname,
				receiver_contact_no:provider.contact_no,
				notification_details:"New work has been arrived",
				read_status:"0",
				accept_status:"0",
				disable_button:"1"
			},
			success:function(data){
				
				refresh();
			}
			
		})
	}
	 
}

