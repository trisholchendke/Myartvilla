angular
.module('Publisher')
.controller('PublisherDashboardController', ['$scope', '$rootScope', '$location',	'$window', '$http','$timeout',PublisherDashboardController])
//.run(function($FB){
//	$FB.init('624903007694347');
//})
;
function PublisherDashboardController($scope,$rootScope,$location,$window,$http,$timeout){
	$timeout(function(){
	    $scope.url = 'http://google.com';
	    $scope.text = 'testing share';
	    $scope.title = 'title1';
	    $scope.ImageUrl = 'https://myapp-8004.herokuapp.com/img/download.png';
	  },1000)

	  $scope.callback = function(response){
	    console.log(response);
	    alert('share callback');
	  }
		
	 $.ajax({
	        type: 'Post',
	        url: '/get_publisher_unread_notification_count',
	        dataType: 'json',
	        data:{user_id:$window.sessionStorage.user_id},
	        success: function (data) {
	        	$("#notification_count").html(data.length);
	        }
		});
	
	 $scope.custom = true;
     $scope.toggleCustom = function() {
         $("#comment_value").val('');
    	 $scope.custom = $scope.custom === false ? true: false;
     }

	 
	var refresh = function(){
		$.ajax({
	        type: 'Post',
	        url: '/get_publisher_dashboard_data',
	        dataType: 'json',
	        data:{_id:$window.sessionStorage.token},
	        success: function (data) {
	        	$scope.$apply(function () {
	                $scope.message = "Timeout called!";
	                $scope.works = data;
	            });
	        }
		});
	}

	refresh();
	
	$scope.like = function(works1){
		var like_count = Number(works1.like_count) + 1;
		if(Number(works1.unlike_count) > 0){
			var unlike_count = Number(works1.unlike_count) - 1;
		}else{
			var unlike_count = 0;
		}
		
		var id= works1.id
		$.ajax({
	        type: 'Post',
	        url: '/like_post',
	        dataType: 'json',
	        data:{_id:$window.sessionStorage.token,
	        		like_count:like_count,
	        		unlike_count:unlike_count,
	        		like_flag:1,
	        		unlike_flag:0,
	        		id:id},
	        success: function (data) {
	        	refresh();
	        	$("#portfolioModal1").modal('hide')
	        }
		});
	}
	
	$scope.unlike = function(works1){
		var unlike_count = Number(works1.unlike_count) + 1;
		if(Number(works1.like_count) > 0){
			var like_count = Number(works1.like_count) - 1;
		}else{
			var like_count = 0;
		}
		var id= works1.id
		$.ajax({
			type: 'Post',
			url: '/unlike_post',
			dataType: 'json',
			data:{_id:$window.sessionStorage.token,
				like_count:like_count,
				unlike_count:unlike_count,
				like_flag:0,
				unlike_flag:1,
				id:id},
				success: function (data) {
					refresh();
					$("#portfolioModal1").modal('hide')
				}
		});
	}
	
	$scope.submitComment = function(data,id){
		if(data != undefined){
			$.ajax({
				type:"post",
				url:"/submit_comment",
				dataType:"json",
				data:{
					user_id:$window.sessionStorage.user_id,
					post_id:id,
					comment:data,
				},
				success:function(resp){
					refresh();
					$("#portfolioModal1").modal('hide')
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

