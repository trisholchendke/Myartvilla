angular
.module('MyartVilla')
.controller('Profilecontroller', ['$scope', '$rootScope', '$location','$window', '$http',Profilecontroller])
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
function Profilecontroller($scope,$rootScope,$location,$window,$http){
	$scope.share_google = function(post_id){
		var w=480;var h=380;
		var abc = post_id;
		var x=Number((window.screen.width-w)/2);
		var y=Number((window.screen.height-h)/2);
		 $window.open('https://plus.google.com/share?url='+encodeURIComponent('http://127.0.0.1:8080/share_post.html#/' + abc));
	}
	 $scope.rateFunction1 = function(rating,post_id) {
//		  alert('hi');
		  $scope.rating_star = rating;
		  $scope.post_id = post_id;
 	}
	  
	 $scope.session = $window.sessionStorage;
	  $scope.rateFunction = function(rating,post_id) {
//		  alert('hi');
		  $scope.rating = rating;
		  $.ajax({
		        type: 'Post',
		        url: '/get_rating_of_post',
		        dataType: 'json',
		        data:{user_id:window.sessionStorage.user_id,post_id:$scope.post_id },
		        success: function (data) {
//		        	alert(JSON.stringify(data));
		        	if(data.length>0){
//		        		$scope.post_id = post_id;
//			      	     $scope.rating_star = rating;
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
//					  					alert(JSON.stringify(data[0].avgRating,null,2));
					  					$scope.avgRating = data[0].avgRating;
					  				});
					  			}
					  		});
		        	}else{
//		        		alert("Data  Not Found");
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
						  				});
						  			}
						  		});
		        	}
		        }
			});
	  };
	var refresh = function(str){
		var user_id = window.localStorage.getItem("author_id");
		$.ajax({
	        type: 'Post',
	        url: '/get_data_by_user_id',
	        dataType: 'json',
	        data:{user_id:user_id},
	        success: function (data) {
	        	console.log(data);
	        	$scope.$apply(function(){
	        		$scope.user_data = data;
	        	});
	       }
		});
	}
	refresh();

	$scope.getAllPaintingArt = function(str){
		refresh(str);
		window.localStorage.setItem("category",str);
		window.location.href = '/posts.html';
		
	}
	
	$scope.submitComment = function(data,id){
		if(data != undefined){
			if($window.sessionStorage.user_id != undefined){
			$.ajax({
				type:"post",
				url:"/get_user_info",
				dataType:"json",
				data:{
					user_id:$window.sessionStorage.user_id
				},
				success:function(resp){
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
						}
					})
				}
			})
		}else{
			$("#register").modal('show');
		}
			
		
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

