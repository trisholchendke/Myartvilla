angular
.module('MyartVilla')
.controller('registercontroller', ['$scope', '$rootScope', '$location',	'$window', '$http',registercontroller])
;
function registercontroller($scope,$rootScope,$location,$window,$http){
	$scope.email_pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$rootScope.token = $window.sessionStorage.token;
	$scope.register_user = function(coming_object){
		if (coming_object.confirm_password == coming_object.password) {
			coming_object["address"] = '';
			coming_object["file_path"] = '';
			$http.post('/register_user',coming_object)
			.success(function(response){
				if (response.code === 11000) {
					$scope.error1 = 'Sorry,User name already exist!!!';

				} else {
					$scope.sucess1 = "User Registered Sucessfully";
//					alert(JSON.stringify(response));
					$scope.user1 = {};
//					$scope.Registerform.$setPristine();
					
					$window.sessionStorage.token = response._id;	
					$window.sessionStorage.user_id = response.user_id;	
//					alert($window.sessionStorage.token);SS
					$window.sessionStorage.user_name =response.user_name ;
					switch (response["role"]) {
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
					case "Guest":
						$window.sessionStorage.authenticate="Guest";
						$rootScope.guest_role = false;
						$rootScope.select_role = true;
						$("#register").modal('hide');
//						window.location.href = '/';
						break;
					case "Short Films":
						$window.sessionStorage.authenticate="Short Films";
						window.location.href = '/ShortFilms.html';
						break;
					default:
						console.log("users role is not define");
					}
				}
				 
			})
			.error(function() {
				$scope.error1 = 'Sorry,User name already exist!!!';
			});
		} else {
			$scope.error1 = "Password not match with the confirm password.";
		}
	}
}
