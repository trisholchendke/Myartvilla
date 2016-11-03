angular
.module('AddCoverDesignerOtherInfo',[])
.controller('AddCoverDesignerOtherInfocontroller', ['$scope', '$rootScope', '$location',	'$window', '$http',AddCoverDesignerOtherInfocontroller])
;
function AddCoverDesignerOtherInfocontroller($scope,$rootScope,$location,$window,$http){
	$scope.submit_user = function(coming_object){
		alert(JSON.stringify(coming_object));
		var new_object = {
				id:$window.sessionStorage.token,
				update_info:coming_object,
		}
		
		$.ajax({
	        type: 'Post',
	        url: '/submit_other_info_of_writer_user',
	        dataType: 'json',
	        data:new_object,
	        success: function (data) {
	        	if(data){
	        		if(data["firstname"]==""||data["lastname"]==""||data["address"]=="")
					{
	        			window.location.href = '/AddCoverDesignerOtherInfo.html';
					}else
					{
						window.location.href = '/CoverDesigner.html';
					}
	        	}
	        }
		});
	}
}


