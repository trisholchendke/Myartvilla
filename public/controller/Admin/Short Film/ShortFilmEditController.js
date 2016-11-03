angular
.module('Admin')
.controller('ShortFilmEditController', ['$scope', '$rootScope', '$location',	'$window', '$http',ShortFilmEditController])
;
function ShortFilmEditController($scope,$rootScope,$location,$window,$http){
	
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
			        url: '/update_short_film_user',
			        dataType: 'json',
			        data:{short_film_data:artist},
			        success: function (data) {
			        	if(data){
			        		$scope.$apply(function(){
			        			$scope.sucess_message = "Information updated successfully.";	
			        		})
			        		
			        		$scope.artist = data
			        		setTimeout(function(){
			        			$window.location = '/Admin.html#/short_film/user_management'
			        			}, 3000);
			        	}else{
			        		$scope.emsg = "Error";
			        	}
			        }
				});
		 }
		 
		 
}

