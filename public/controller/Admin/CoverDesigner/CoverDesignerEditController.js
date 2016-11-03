angular
.module('Admin')
.controller('CoverDesignerEditController', ['$scope', '$rootScope', '$location',	'$window', '$http',CoverDesignerEditController])
;
function CoverDesignerEditController($scope,$rootScope,$location,$window,$http){
	
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
			        url: '/update_coverdesigner_user',
			        dataType: 'json',
			        data:{coverdesigner_data:artist},
			        success: function (data) {
			        	if(data){
			        		$scope.$apply(function(){
			        			$scope.sucess_message = "Information updated successfully.";	
			        		})
			        		
			        		$scope.artist = data
			        		setTimeout(function(){
			        			$window.location = '/Admin.html#/cover_designer/user_management'
			        			}, 3000);
			        	}else{
			        		$scope.emsg = "Error";
			        	}
			        }
				});
		 }
		 
		 
}

