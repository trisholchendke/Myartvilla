angular
.module('Admin')
.controller('CoverDesignerViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',CoverDesignerViewController])
;
function CoverDesignerViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

