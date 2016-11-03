angular
.module('Admin')
.controller('WriterViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',WriterViewController])
;
function WriterViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

