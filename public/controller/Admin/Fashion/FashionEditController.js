angular
.module('Admin')
.controller('FashionEditController', ['$scope', '$rootScope', '$location',	'$window', '$http',FashionEditController])
;
function FashionEditController($scope,$rootScope,$location,$window,$http){
	
	if($location.artist){
			$scope.artist = $location.artist
		}else{
			$window.location = window.history.back()
		}
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
		 $scope.updateArtistUser = function(artist){
			 $.ajax({
			        type: 'Post',
			        url: '/update_fashion_user',
			        dataType: 'json',
			        data:{fashion_data:artist},
			        success: function (data) {
			        	if(data){
			        		$scope.$apply(function(){
			        			$scope.sucess_message = "Information updated successfully.";	
			        		})
			        		
			        		$scope.artist = data
			        		setTimeout(function(){
			        			$window.location = '/Admin.html#/fashion/user_management'
			        			}, 3000);
			        	}else{
			        		$scope.emsg = "Error";
			        	}
			        }
				});
		 }
		 
		 
}

