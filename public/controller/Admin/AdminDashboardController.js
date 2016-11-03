angular
.module('Admin')
.controller('AdminDashboardController', ['$scope', '$rootScope', '$location',	'$window', '$http',AdminDashboardController])
;
function AdminDashboardController($scope,$rootScope,$location,$window,$http){
		$.ajax({
			type:"post",
			url:"/get_all_users",
			dataType:'json',
			success:function(data){
				var artist1 = 0;
				var artist = new Array;
				var writer1 = 0;
				var writer = new Array;
				var editor1 = 0;
				var editor = new Array;
				var publisher1 = 0;
				var publisher = new Array;
				var cd1 = 0;
				var cd = new Array;
				var ld1 = 0;
				var ld = new Array;
				var f1 = 0;
				var f = new Array;
				var sf1 = 0;
				var sf = new Array;
				$.each(data,function(index,v){
					 if(v.role == "Artist"){
						 artist[artist1] = v;
						 artist1++;
					 }
					 if(v.role == "Writer"){
						 writer[writer1] = v;
						 writer1++;
					 }
					 if(v.role == "Editor"){
						 editor[editor1] = v;
						 editor1++;
					 }
					 if(v.role == "Publisher"){
						 publisher[publisher1] = v;
						 publisher1++;
					 }
					 if(v.role == "Cover Designer"){
						 cd[cd1] = v;
						 cd1++;
					 }
					 if(v.role == "Layout Designer"){
						 ld[ld1] = v;
						 ld1++;
					 }
					 if(v.role == "Short Films"){
						 sf[sf1] = v;
						 sf1++;
					 }
					 if(v.role == "Fashion"){
						 f[f1] = v;
						 f1++;
					 }
				})
				$scope.$apply(function(){
					$scope.artist = artist.length
					$scope.writer = writer.length
					$scope.editor = editor.length
					$scope.publisher = publisher.length
					$scope.cd = cd.length
					$scope.ld = ld.length
					$scope.sf = sf.length
					$scope.f = f.length
				})
				
			}
		})
		
		$scope.logout_now = function(){
			$window.sessionStorage.clear();
			window.location.href = '/' ;
		}
		
		 $scope.updateAdminUser = function(admin){
			 if (admin.new_psw == admin.cnfm_psw) {
				 $.ajax({
				        type: 'Post',
				        url: '/update_admin_user_psw',
				        dataType: 'json',
				        data:{admin_data:admin,
				        	user_id:$window.sessionStorage.token
				        },
				        success: function (data) {
				        	if(data){
				        		$scope.$apply(function(){
				        			$scope.sucess_message = "Information updated successfully.";	
				        		})
				        		setTimeout(function(){
				        			$window.location = '/Admin.html#/admin_dashboard'
				        			}, 2000);
				        	}else{
				        		$scope.emsg = "Error";
				        	}
				        }
					});
			 }else{
				 $scope.error1 = "Password not match with the confirm password.";
			 }
		
		 }
		
		$scope.active= function(){
			 alert('ds')
		 }
		 
}

