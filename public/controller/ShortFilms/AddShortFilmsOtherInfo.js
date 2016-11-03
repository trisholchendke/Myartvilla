angular
.module('AddShortFilmsOtherInfo',[])
.controller('AddShortFilmsOtherInfocontroller', ['$scope', '$rootScope', '$location',	'$window', '$http',AddShortFilmsOtherInfocontroller])
;
function AddShortFilmsOtherInfocontroller($scope,$rootScope,$location,$window,$http){
//	alert('hi');
	$scope.submit_user = function(coming_object){
		var new_object = {
				id:$window.sessionStorage.token,
				update_info:coming_object,
		}
		$.ajax({
	        type: 'Post',
	        url: '/submit_other_info_of_artist_user',
	        dataType: 'json',
	        data:new_object,
	        success: function (data) {
	        	if(data){
	        		if(data["firstname"]==""||data["lastname"]==""||data["address"]=="")
					{
	        			window.location.href = '/AddShortFilmsOtherInfo.html';
					}else
					{
						window.location.href = '/ShortFilms.html';
					}
	        	}
	        }
		});
	}
}


