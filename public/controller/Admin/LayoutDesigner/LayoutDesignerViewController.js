angular
.module('Admin')
.controller('LayoutDesignerViewController', ['$scope', '$rootScope', '$location',	'$window', '$http',LayoutDesignerViewController])
;
function LayoutDesignerViewController($scope,$rootScope,$location,$window,$http){
	
		if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
}

