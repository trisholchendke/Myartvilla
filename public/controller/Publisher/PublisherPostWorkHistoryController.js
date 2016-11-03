angular
.module('Publisher')
.run(['$rootScope',run])
.controller('PublisherPostWorkHistoryController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',PublisherPostWorkHistoryController])
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
});
//.run(function($FB){
//	$FB.init('624903007694347');
//})

;
function PublisherPostWorkHistoryController($scope,$rootScope,$location,$window,$http,$timeout){
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
	        	console.log(data);
	        	$scope.$apply(function () {
	                $scope.works = data;
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

