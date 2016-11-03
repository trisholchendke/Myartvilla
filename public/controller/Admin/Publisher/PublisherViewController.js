angular
.module('Admin')
.controller('PublisherViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',PublisherViewController])
;
function PublisherViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

