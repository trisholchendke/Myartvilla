angular
.module('Admin')
.controller('ArtistViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',ArtistViewController])
;
function ArtistViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

