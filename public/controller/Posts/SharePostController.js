angular
.module('Artist')
.controller('SharePostController', ['$scope', '$rootScope', '$location','$window', '$http',SharePostController])
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})
.directive('starRating',starRating)
;
function SharePostController($scope,$rootScope,$location,$window,$http){
	
	var str = $location.$$absUrl;
	var post_id = str.replace("http://127.0.0.1:8080/share_post.html#/", "");
	var get_login_user = function(){
		if($window.sessionStorage.user_id == undefined){
			$scope.user_log_in = true;
			
		}else{
			$scope.user_log_in = false;
		}
	}
	get_login_user();
	
	$('#rating1').hover().css({'pointer-events': 'none'});
	$scope.custom = true;
    $scope.toggleCustom = function() {
        $("#comment_value").val('');
   	 	$scope.custom = $scope.custom === false ? true: false;
    }
    
    $scope.logout_now = function(){
//    	alert(post_id);
		$window.sessionStorage.clear();
		window.location.href = 'share_post.html#/' + post_id;
		get_login_user();
		
	}
    
	$scope.submitComment = function(data,id){
 		if(data != undefined){
 			if($window.sessionStorage.user_id == undefined){
 				$('#register').modal('show'); 
 				$scope.user_log_in = true;
 				alert("User Must Be Login");
 				
 			}else{
 				$.ajax({
 	 				type:"post",
 	 				url:"/get_user_info",
 	 				dataType:"json",
 	 				data:{
 	 					user_id:$window.sessionStorage.user_id
 	 				},
 	 				success:function(resp){
// 	 					alert(JSON.stringify(resp));
 	 					var firstname = resp[0].firstname;
 	 					var lastname = resp[0].lastname;
 	 					var profile_pic = resp[0].profile_pic;
 	 					$.ajax({
 	 						type:"post",
 	 						url:"/submit_comment",
 	 						dataType:"json",
 	 						data:{
 	 							user_id:$window.sessionStorage.user_id,
 	 							post_id:id,
 	 							comment:data,
 	 							firstname:firstname,
 	 							lastname:lastname,
 	 							profile_pic:profile_pic
 	 						},
 	 						success:function(resp){
 	 							refresh();
 	 							$window.location.reload();
 	 						}
 	 					})
 	 				}
 	 			})
 			}
 		}
 	}
	
	$scope.rateFunction1 = function(rating,post_id) {
		  $scope.rating_star = rating;
		  $scope.post_id = post_id;
	}
	 
	 $scope.rateFunction = function(rating,post_id) {
		 if($window.sessionStorage.user_id == undefined){
				$scope.user_log_in = true;
				$('#register').modal('show'); 
				
			}else{
				$scope.user_log_in = false;
				$scope.rating = rating;
				  $.ajax({
				        type: 'Post',
				        url: '/get_rating_of_post',
				        dataType: 'json',
				        data:{user_id:$window.sessionStorage.user_id,post_id:$scope.post_id },
				        success: function (data) {
//				        	alert(JSON.stringify(data));
				        	if(data.length>0){
//				        		$scope.post_id = post_id;
//					      	     $scope.rating_star = rating;
					      	    var new_item =
					      		  {
					      	    	user_id:window.sessionStorage.user_id,  
					      			rating_star: $scope.rating_star,
					      			post_id:$scope.post_id,
					      		  }
					      		  $.ajax({
					      		        type: 'Post',
					      		        url: '/update_rating_of_post',
					      		        dataType: 'json',
					      		        data:new_item,
					      		        success: function (data) {
					      		        	refresh();
					      		        	$window.location.reload();
					      		          $scope.class = "red";
					      	    	    if ($scope.class === "red")
					      	    	      $scope.class = "blue";
					      		        }
					      			});
						      	  $.ajax({
							  			type: 'Post',
							  			url: '/get_average_rating_of_post',
							  			dataType: 'json',
							  			data:new_item,
							  			success: function (data) {
							  				$scope.$apply(function(){
//							  					alert(JSON.stringify(data[0].avgRating,null,2));
							  					$scope.avgRating = data[0].avgRating;
							  					$window.location.reload();
							  				});
							  			}
							  		});
				        	}else{
//				        		alert("Data  Not Found");
						        	$scope.post_id = post_id;
						      	     $scope.rating_star = rating;
						      	    var new_item =
						      		  {
						      	    	user_id:window.sessionStorage.user_id,  
						      			rating_star: $scope.rating_star,
						      			post_id:$scope.post_id,
						      		  }
						      		  $.ajax({
						      		        type: 'Post',
						      		        url: '/save_rating_of_post',
						      		        dataType: 'json',
						      		        data:new_item,
						      		        success: function (data) {
						      		        	refresh();
						      		        	$window.location.reload();
						      		        	  $scope.class = "red";
						      		    	    if ($scope.class === "red")
						      		    	      $scope.class = "blue";
						      		        }
						      			});
								      	  $.ajax({
								  			type: 'Post',
								  			url: '/get_average_rating_of_post',
								  			dataType: 'json',
								  			data:new_item,
								  			success: function (data) {
								  				$scope.$apply(function(){
								  					$scope.avgRating = data[0].avgRating;
								  					$window.location.reload();
								  				});
								  			}
								  		});
				        	}
				        }
					});
			}
		  
	  };
	
 	
 	$scope.css = '#myImg,.close{transition:.3s}#myImg{border-radius:5px;cursor:pointer}#myImg:hover{opacity:.7}.modal{display:none;position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.9)}#caption,.modal-content{margin:auto;display:block;width:80%;max-width:700px}#caption{text-align:center;color:#ccc;padding:10px 0;height:150px}#caption,.modal-content{-webkit-animation-name:zoom;-webkit-animation-duration:.6s;animation-name:zoom;animation-duration:.6s}@-webkit-keyframes zoom{from{-webkit-transform:scale(0)}to{-webkit-transform:scale(1)}}@keyframes zoom{from{transform:scale(0)}to{transform:scale(1)}}.close{position:absolute;top:15px;right:35px;color:#f1f1f1;font-size:40px;font-weight:700}.close:focus,.close:hover{color:#bbb;text-decoration:none;cursor:pointer}@media only screen and (max-width:700px){.modal-content{width:100%}}';
 	 $(document).ready(function(){
 	    	$("#main_div").css("margin-top","0px")
 	    	$("#main_div").css("padding","0px")
 	 })
 	 
	
	var refresh = function(){
		$.ajax({
	        type: 'Post',
	        url: '/get_share_post_data',
	        dataType: 'json',
	        data:{post_id:post_id},
	        success: function (data) {
//	        	console.log(data);
	        	$scope.$apply(function () {
	                $scope.works = data;
//	                alert(JSON.stringify(data,null,2));
	                $scope.profile_pic = data[0].post_owner[0].profile_pic;
	            });
	        }
		});
	}

	refresh();
	
	$scope.login_user = function(coming_object){
//		alert('hi');
		$.ajax({
	        type: 'Post',
	        url: '/login_user',
	        dataType: 'json',
	        data:coming_object,
	        success: function (data) {
	        	if(data == 0){
	        		 $scope.$apply(function () {
	        	            $scope.error = 'Sorry,You Have Enter Invalid User Name And Password';
	        	     });
				}else{
					alert(data[0]["role"]);
					if(data[0]["role"] == 'Guest' ){
						$window.sessionStorage.authenticate="Guest";
						$scope.Loginform.$setPristine();
						$window.sessionStorage.token = data[0]._id;	
						$window.sessionStorage.user_id = data[0].user_id;	
						$window.sessionStorage.user_name = data[0].user_name;
						get_login_user();
						window.location.href = '/share_post.html#/' + post_id;
						$scope.$apply(function () {
	        	            $scope.sucess = "User Looged Sucessfully";
						});
						$('#login').modal('hide'); 
					}else{
						$scope.$apply(function () {
							$scope.error = 'Sorry,You Have Enter Invalid User Name And Password';
						});
					}
				}
	        }
		});
		
	} 
	
	$scope.register_user = function(coming_object){
		if (coming_object.confirm_password == coming_object.password) {
			coming_object["address"] = '';
			coming_object["role"] = 'Guest';
			$http.post('/register_user',coming_object)
			.success(function(response){
				if (response.code === 11000) {
					$scope.error1 = 'Sorry,User name already exist!!!';

				} else {
					$window.sessionStorage.authenticate="Guest";
					window.location.href = '/share_post.html.html#/' + post_id;
					$scope.sucess1 = "User Registered Sucessfully";
					$scope.user1 = {};
					$window.sessionStorage.token = response._id;	
					$window.sessionStorage.user_id = response.user_id;	
					$window.sessionStorage.user_name =response.user_name ;
					$('#register').modal('hide'); 
				}
				 
			})
			.error(function() {
				$scope.error1 = 'Sorry,User name already exist!!!';
			});
		} else {
			$scope.error1 = "Password not match with the confirm password.";
		}
	}
}
function starRating() {
	return {
		restrict : 'A',
		template : '<ul class="rating">'
				 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
				 + '\u2605'
				 + '</li>'
				 + '</ul>',
		scope : {
			ratingValue : '=',
			max : '=',
			onRatingSelected : '&'
		},
		link : function(scope, elem, attrs) {
			var updateStars = function() {
				scope.stars = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
			};
			
			scope.toggle = function(index) {
				scope.ratingValue = index + 1;
				scope.onRatingSelected({
					rating : index + 1
				});
			};
			
			scope.$watch('ratingValue',
				function(oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};
}


