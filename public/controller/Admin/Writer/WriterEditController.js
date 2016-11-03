angular
.module('Admin')
.controller('WriterEditController', ['$scope', '$rootScope', '$location',	'$window', '$http',WriterEditController])
;
function WriterEditController($scope,$rootScope,$location,$window,$http){
	
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
			        url: '/update_writer_user',
			        dataType: 'json',
			        data:{writer_data:artist},
			        success: function (data) {
			        	if(data){
			        		$scope.$apply(function(){
			        			$scope.sucess_message = "Information updated successfully.";	
			        		})
			        		
			        		$scope.artist = data
			        		setTimeout(function(){
			        			$window.location = '/Admin.html#/writer/user_management'
			        			}, 3000);
			        	}else{
			        		$scope.emsg = "Error";
			        	}
			        }
				});
		 }
		 
		 
}

