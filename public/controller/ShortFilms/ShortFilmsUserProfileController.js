angular
.module('ShortFilms')
.controller('ShortFilmsUserProfileController', ['$scope', '$rootScope', '$location',	'$window', '$http',ShortFilmsUserProfileController])
;
function ShortFilmsUserProfileController($scope,$rootScope,$location,$window,$http){
	$scope.user_name = $window.sessionStorage.user_name;
	$scope.logout_now = function(coming_object){
		$window.sessionStorage.clear();
		window.location.href = '/' ;
	}
	$scope.live_now = function(coming_object){
		var timestamp = $.now();
		window.location.href = '/ShortFilms.html#/live_now/' + timestamp ;
//		$scope.href="https://plus.google.com/share?url=http://127.0.0.1:8080/ShortFilms.html#/live_now/" + timestamp;
		
	}
	$scope.disabled_true = true;
	$scope.email_pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.show_profile_pic = function(){
		window.location.href = '/ShortFilms.html#/show_profile_pics';
	}
	
	$scope.upload_profile_image = function() {
		if($scope.user_profile.file_path != undefined){
			$http.post('/upload_profile_image',$scope.user_profile)
			.success(function(response){
				if(response){
					refresh();
				}
			})
		}
	};

	var SelectedFile;
	var documentFile;
	$scope.onVideoFileChosen = function(element) {
		 $scope.$apply(function($scope) {
               $scope.SelectedFile = element.files[0];
               SelectedFile= event.target.files[0];
               if(SelectedFile.type != 'image/png' && SelectedFile.type != 'image/jpeg'){
   				alert("Select only image file.");
   				}else{
   					$scope.user_profile['file_type'] = SelectedFile.type;
   					$scope.StartUpload();
   					$scope.upload_profile_image();
   				}
          });	
//		 $scope.StartUpload();
	};
	var socket = io.connect('http://localhost:8989');
	var FReader;
	var Name;
	
	$scope.StartUpload = function() {
			FReader = new FileReader();
			Name = $scope.SelectedFile.name;
			FReader.onload = function(evnt) {
				socket.emit('Upload', {
					'Name' : Name,
					Data : evnt.target.result
				});
			}
			
			socket.emit('Start', {
				'Name' : Name,
				'Size' : $scope.SelectedFile.size
			} ,function(data) {
//				UpdateBar(data['Percent']);
//				$scope.upload_profile_image();
			});
	}

	socket.on('MoreData', function(data) {
//		UpdateBar(data['Percent']);
		var Place = data['Place'] * 524288; //The Next Blocks Starting Position
		var NewFile; //The Variable that will hold the new Block of Data
		if ($scope.SelectedFile.webkitSlice)
			NewFile = $scope.SelectedFile.webkitSlice(Place, Place
					+ Math.min(524288, ($scope.SelectedFile.size - Place)));
		else
			NewFile = $scope.SelectedFile.slice(Place, Place
					+ Math.min(524288, ($scope.SelectedFile.size - Place)));
		FReader.readAsBinaryString(NewFile);
	});
//	function UpdateBar(percent) {
//		if(percent > 0){
//			$scope.$apply(function () {
//                $scope.disabled_true = false;
//            });
//		}
//		var result=Math.round((Math.round(percent*100)/100))+"%";
//	    document.getElementById("bar_video").innerHTML=result; 
//	    document.getElementById("bar_video").style.width = result;
//	}

	socket.on('Done', function(data) {
		$scope.user_profile.file_path = data['Image']
				.replace("public", "..");
		
		$scope.onDocUpload();
//		UpdateBar(100);
	});
	var refresh = function(){
		$.ajax({
			type: 'Post',
			url: '/get_user_profile',
			dataType: 'json',
			data:{id:$window.sessionStorage.token},
			success: function (data) {
				$scope.$apply(function () {
					$scope.user_profile = data[0];
				});
			}
		});
	}
	refresh();
	
	$scope.modify_profile_details = function(coming_object){
		$.ajax({
	        type: 'Post',
	        url: '/modify_user_profile',
	        dataType: 'json',
	        data:coming_object,
	        success: function (data) {
	        	if(data){
	        		$scope.$apply(function () {
	        			$scope.user_profile = data;
	        			$scope.sucess_message = "Profile Information Updated Sucessfully";
	        			$scope.sucess = "Success!";
	        			 setTimeout(function () {
	        			        window.location.href = '/ShortFilms.html#/dashboard';
	        			 }, 2000);
	        		});
	        	}
	        }
		});
	}
}

