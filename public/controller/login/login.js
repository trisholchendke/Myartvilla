angular
.module('MyartVilla')
.controller('logincontroller', ['$scope', '$rootScope', '$location',	'$window', '$http',logincontroller])
;
function logincontroller($scope,$rootScope,$location,$window,$http){
	$scope.login_user = function(coming_object){
		$.ajax({
	        type: 'Post',
	        url: '/login_user',
	        dataType: 'json',
	        data:coming_object,
	        success: function (data) {
	        	if(data == 0){
//	        		alert('User name Is Not amtched');
	        		 $scope.$apply(function () {
	        	            $scope.error = 'Sorry,You Have Enter Invalid User Name And Password';
	        	     });
				}else{
					$scope.$apply(function () {
        	            $scope.sucess = "User Looged Sucessfully";
					});
					 setTimeout(function () {
					        $scope.$apply(function () {
					        	coming_object = {};
								$scope.user = {};
								
								$scope.Loginform.$setPristine();
								$window.sessionStorage.token = data[0]._id;	
								$window.sessionStorage.user_id = data[0].user_id;	
								$window.sessionStorage.user_name = data[0].user_name;	
								
								switch (data[0]["role"]) {
								case "Art And Photography":
									$window.sessionStorage.authenticate="Art And Photography";
									window.location.href = '/Artist.html';
									break;
								case "Writer":
									$window.sessionStorage.authenticate="Writer";
									window.location.href = '/Writer.html';
									break;
								case "Fashion":
									$window.sessionStorage.authenticate="Fashion";
									window.location.href = '/Fashion.html';
									break;
								case "Publisher":
									$window.sessionStorage.authenticate="Publisher";
									window.location.href = '/Publisher.html';
									break;
								case "Editor":
									$window.sessionStorage.authenticate="Editor";
									window.location.href = '/Editor.html';
									break;
								case "Cover Designer":
									$window.sessionStorage.authenticate="Cover Designer";
									window.location.href = '/CoverDesigner.html';
									break;
								case "Layout Designer":
									$window.sessionStorage.authenticate="Layout Designer";
									window.location.href = '/LayoutDesigner.html';
									break;
								case "Short Films":
									$window.sessionStorage.authenticate="Short Films";
									window.location.href = '/ShortFilms.html';
									break;
								case "Admin":
									$window.sessionStorage.authenticate="Admin";
									window.location.href = '/Admin.html#/admin_dashboard';
									break;
								case "Guest":
									$window.sessionStorage.authenticate="Guest";
									window.location.href = '/';
									break;
								default:
									console.log("users role is not define");
								}
					        });
					    }, 1000);
					
				}
	        }
	});
		
	} 
}