angular
.module('Admin')
.controller('ArtistAddController', ['$scope', '$rootScope', '$location',	'$window', '$http',ArtistAddController])
;
function ArtistAddController($scope,$rootScope,$location,$window,$http){
	
	
	
		 $scope.artists = 
			 [
				  {
				    "id": "1",
				    "user_name": "username1",
				    "email": "some@some.com",
				    "firstname" : "artist",
				    "lastname" : "latname",
				    "address":"clickedtech"
				    	
				  },
				  {
					  "id": "2",
					  "user_name": "username2",
					  "email": "some@some.com",
					  "firstname" : "artist",
					  "lastname" : "latname",
					  "address":"clickedtech"
						  
				  },
				  {
					  "id": "3",
					  "user_name": "username3",
					  "email": "some@some.com",
					  "firstname" : "artist",
					  "lastname" : "latname",
					  "address":"clickedtech"
						  
				  },
				  {
					  "id": "4",
					  "user_name": "username4",
					  "email": "some@some.com",
					  "firstname" : "artist",
					  "lastname" : "latname",
					  "address":"clickedtech"
						  
				  },
				  {
					  "id": "5",
					  "user_name": "username5",
					  "email": "some@some.com",
					  "firstname" : "artist",
					  "lastname" : "latname",
					  "address":"clickedtech"
						  
				  },
				  {
					  "id": "6",
					  "user_name": "username6",
					  "email": "some@some.com",
					  "firstname" : "artist",
					  "lastname" : "latname",
					  "address":"clickedtech"
						  
				  },
				  
			 ];
		 
		
		 
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
		 $scope.addUser = function(){
			 alert()
		 }
}

