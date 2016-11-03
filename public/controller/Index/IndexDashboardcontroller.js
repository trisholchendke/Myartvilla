angular
.module('MyartVilla')
.controller('IndexDashboardcontroller', ['$scope', '$rootScope', '$location','$window', '$http',IndexDashboardcontroller])
;
function IndexDashboardcontroller($scope,$rootScope,$location,$window,$http){
	$rootScope.guest_role = false;
	$rootScope.select_role = true;
	 $scope.log_out_guest = function(){
		 	$window.sessionStorage.clear();
		}
		
	 $scope.session = $window.sessionStorage;
		
	 $scope.getModalData = function(id){
		 id=id-1;
		 $scope.works1 = $scope.works[id];
		 $("#portfolioModal1").modal('show');
		return $scope.works1;
	 }
	 
	 $scope.custom = true;
     $scope.toggleCustom = function() {
         $("#comment_value").val('');
    	 $scope.custom = $scope.custom === false ? true: false;
     }
     
     $scope.getRolewiseData = function(str){
    	
    	 window.localStorage.setItem('category',str);
    	 window.location.href = '/posts.html';
     }
	 
     var refresh_art = function(){
    	 $.ajax({
 	        type: 'Post',
 	        url: '/get_artist_data',
 	        dataType: 'json',
 	        data:{name:"pravin"},
 	        success: function (data) {
 	        	$scope.$apply(function () {
 	        		$scope.works = data[0].post_my_work;
 	            });
 	        }
 		});
     }
	 
//     refresh_art();
	
	 $scope.checkAuth = function(works1,wrd){
		 alert($window.sessionStorage);
		 if($window.sessionStorage == {}){
			 alert('session is empty');
//			 $rootScope.guset_info = $window.sessionStorage;
//			 /* like unlike code goes here */
//			 if(wrd == "like"){
//				 like(works1);
//			 }else if(wrd == "unlike"){
//				 unlike(works1);
//			 }else{
//				 submitComment(works1,wrd);
//			 }
		 }
		 else if($window.sessionStorage.authenticate ==! 'Guest'){
			 alert(hi);
		 }else{
			 
		 }
//		 if(!$window.sessionStorage == {}){
//			 alert('hi'); 
//		 }
//		 if($window.sessionStorage.authenticate== ""){
//			 $window.sessionStorage.token= "";
//			 $window.sessionStorage.authenticate= "";
//			 $window.sessionStorage.user_name= "";
//		 }else{
//			 $rootScope.guset_info = $window.sessionStorage;
//			 /* like unlike code goes here */
//			 if(wrd == "like"){
//				 like(works1);
//			 }else if(wrd == "unlike"){
//				 unlike(works1);
//			 }else{
//				 submitComment(works1,wrd);
//			 }
//			 
//		 }
//		 if($window.sessionStorage.token == ''){
//			$rootScope.guest_role = true;
//			$rootScope.select_role = false;
//			 $("#portfolioModal1").modal('hide');
//			 $("#register").modal('show') ;
//		 }
		 
	 }
	 
	 
	 var like = function(works1){
			var like_count = Number(works1.like_count) + 1;
			if(Number(works1.unlike_count) > 0){
				var unlike_count = Number(works1.unlike_count) - 1;
			}else{
				var unlike_count = 0;
			}
			
			var id= works1.id
			$.ajax({
		        type: 'Post',
		        url: '/guest_like_post',
		        dataType: 'json',
		        data:{_id:works1._id,
		        		like_count:like_count,
		        		unlike_count:unlike_count,
		        		guest_like_flag:1,
		        		guest_unlike_flag:0,
		        		id:id},
		        success: function (data) {
		        	refresh_art();
		        	$("#portfolioModal1").modal('hide')
		        }
			});
		}
		
	var unlike = function(works1){
			var unlike_count = Number(works1.unlike_count) + 1;
			if(Number(works1.like_count) > 0){
				var like_count = Number(works1.like_count) - 1;
			}else{
				var like_count = 0;
			}
			var id= works1.id
			$.ajax({
				type: 'Post',
				url: '/guest_unlike_post',
				dataType: 'json',
				data:{_id:works1._id,
					like_count:like_count,
					unlike_count:unlike_count,
					guest_like_flag:0,
					guest_unlike_flag:1,
					id:id},
					success: function (data) {
						refresh_art();
						$("#portfolioModal1").modal('hide')
					}
			});
	}
		
		var submitComment = function(data,works1){
			if(data != undefined){
				$.ajax({
					type:"post",
					url:"/submit_comment",
					dataType:"json",
					data:{
						_id:works1._id,
						comment:
							{'comment_description':data,
							 'date':new Date(),
							 'login_id':$window.sessionStorage.token,
							},
						id:works1.id,
					},
					success:function(resp){
						refresh_art();
						$("#portfolioModal1").modal('hide')
					}
				})
			}
		}
		
		
		
	 
	 
	    	
}

