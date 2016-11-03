angular
.module('Admin')
.controller('FashionViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',FashionViewController])
;
function FashionViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

