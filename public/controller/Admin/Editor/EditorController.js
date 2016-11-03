angular
.module('Admin')
.controller('EditorController', ['$scope', '$rootScope', '$location','$window','$http','DTOptionsBuilder','DTColumnBuilder','sweet',EditorController])
;
function EditorController($scope,$rootScope,$location,$window,$http,DTOptionsBuilder,DTColumnBuilder,sweet){
	
	
	var vm = this;     
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(5)
        .withOption('responsive', true)
        .withDOM('pitrfl');
    vm.dtColumns = [
        DTColumnBuilder.newColumn('user_name').withTitle('Username').withOption('defaultContent', ' '),
        DTColumnBuilder.newColumn('firstname').withTitle('First Name').withOption('defaultContent', ' '),
        DTColumnBuilder.newColumn('lastname').withTitle('First Name').withOption('defaultContent', ' ')
//        DTColumnBuilder.newColumn('action').withTitle('Action').withOption('defaultContent', ' ')
        .notVisible()
    ];
//    chapter.getChapters().then(function(chapters) {
////        alert(JSON.stringify(chapters));
//        vm.myChapters = chapters;
//      });
	

//		 $(document).ready(function(){
//			 $("#dashboard_option").removeClass('active')
//			 $("#artist_option").addClass('active')
//			 
//		 })
		 
		 $scope.back = function(){
			 $window.location = window.history.back()
		 }
		 
		 $scope.editArtistUser = function(artist) {
				var url;
					url = '/editor/edit';
					$location['artist'] = artist;
				$location.path(url);

			};
			$scope.viewArtistUser = function(artist) {
				var url;
				url = '/editor/details';
				$location['artist'] = artist;
				$location.path(url);
			};
			
			

			$scope.onRemoveUser = function(id) {
				sweet.show({
					title : 'Confirm',
					text : 'Are you sure to delete this user?',
					type : 'warning',
					showCancelButton : true,
					confirmButtonColor : "#DD6B55",
					confirmButtonText : "Yes",
					cancelButtonText : "No",
					closeOnConfirm : false,
					closeOnCancel : true
				}, function(isConfirm) {if (isConfirm) {
					$.ajax({
				        type: 'Post',
				        url: '/delete_user',
				        dataType: 'json',
				        data:{id:id},
				        success: function (resp) {
				        	if(resp){
				        		location.reload();
				        	}
				        }
					});
					}
				});

			};
			
			$.ajax({
		        type: 'Post',
		        url: '/get_all_editor_user',
		        dataType: 'json',
		        data:{name:"pravin"},
		        success: function (data) {
		        	if(data){
		        		$scope.artists = data
		        		
		        	}
		        }
			});
		 
}

