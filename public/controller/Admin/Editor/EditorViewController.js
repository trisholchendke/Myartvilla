angular
.module('Admin')
.controller('EditorViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',EditorViewController])
;
function EditorViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

