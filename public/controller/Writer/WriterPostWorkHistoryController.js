angular
.module('Writer')
.run(['$rootScope',run])
.controller('WriterPostWorkHistoryController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',WriterPostWorkHistoryController])
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
//.run(function($FB){
//	$FB.init('624903007694347');
//})

;
function WriterPostWorkHistoryController($scope,$rootScope,$location,$window,$http,$timeout){
	$scope.share_google = function(post_id){
		var w=480;var h=380;
		var abc = post_id;
		var x=Number((window.screen.width-w)/2);
		var y=Number((window.screen.height-h)/2);
		 $window.open('https://plus.google.com/share?url='+encodeURIComponent('http://127.0.0.1:8080/share_post.html#/' + abc));
	}
	
	$('#rating1').hover().css({'pointer-events': 'none'});
	$scope.rateFunction1 = function(rating,post_id) {
//		  alert('hi');
		  $scope.rating_star = rating;
		  $scope.post_id = post_id;
	}
	  
		  $scope.rateFunction = function(rating,post_id) {
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
	 $timeout(function(){
		    $scope.url = 'http://google.com';
		    $scope.text = 'testing share';
		    $scope.title = 'title1';
		    $scope.ImageUrl = 'https://myapp-8004.herokuapp.com/img/download.png';
		  },1000)

		  $scope.callback = function(response){
		    console.log(response);
		  }
	 
	 $scope.custom = true;
     $scope.toggleCustom = function() {
         $("#comment_value").val('');
    	 $scope.custom = $scope.custom === false ? true: false;
     }

      $scope.myFunction = function(comment){
    	 
     }
	 ;
	var refresh = function(){
		
		$.ajax({
	        type: 'Post',
	        url: '/get_post_work_history_data',
	        dataType: 'json',
	        data:{user_id:$window.sessionStorage.user_id},
	        success: function (data) {
//	        	console.log(data);
	        	$scope.$apply(function () {
	                $scope.works = data;
	                $scope.profile_pic = data[0].post_owner[0].profile_pic;
	            });
	        }
		});
	}

	refresh();
	
	
	$scope.submitComment = function(data,id){
		
		if(data != undefined){
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
			
		
		}
	}
	
	$scope.css = '#myImg,.close{transition:.3s}#myImg{border-radius:5px;cursor:pointer}#myImg:hover{opacity:.7}.modal{display:none;position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.9)}#caption,.modal-content{margin:auto;display:block;width:80%;max-width:700px}#caption{text-align:center;color:#ccc;padding:10px 0;height:150px}#caption,.modal-content{-webkit-animation-name:zoom;-webkit-animation-duration:.6s;animation-name:zoom;animation-duration:.6s}@-webkit-keyframes zoom{from{-webkit-transform:scale(0)}to{-webkit-transform:scale(1)}}@keyframes zoom{from{transform:scale(0)}to{transform:scale(1)}}.close{position:absolute;top:15px;right:35px;color:#f1f1f1;font-size:40px;font-weight:700}.close:focus,.close:hover{color:#bbb;text-decoration:none;cursor:pointer}@media only screen and (max-width:700px){.modal-content{width:100%}}';
	 $(document).ready(function(){
	    	$("#main_div").css("margin-top","0px")
	    	$("#main_div").css("padding","0px")
	 })
	 
	 $scope.getModalData = function(id){
		 id=id-1
		 $scope.custom = true;
		 $scope.works1 = $scope.works[id]
		 
		 $("#portfolioModal1").modal('show')
		return $scope.works1;
	 }
}

function run($rootScope) {
    $rootScope.facebookAppId = '624903007694347'; // set your facebook app id here
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
