angular
.module('Admin')
.controller('ShortFilmViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',ShortFilmViewController])
;
function ShortFilmViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

