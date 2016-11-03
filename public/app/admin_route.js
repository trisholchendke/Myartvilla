angular
.module('Admin',['ngRoute','datatables','hSweetAlert'])
.config(routs_artist)
;
routs_artist.$inject = ['$routeProvider', '$locationProvider','$windowProvider'];
function routs_artist($routeProvider, $locationProvider,$windowProvider) {
//	alert('hi');
	var $window = $windowProvider.$get();
	if($window.sessionStorage.authenticate=="Admin")
		{
//		alert('This Is Artist');
//		window.location.href = '/dashboard';
		$routeProvider
		.when('/admin_dashboard',{
			templateUrl:'views/Admin/admin_dashboard.html',
			controller:'AdminDashboardController'
		})
		.when('/artist/add_user',{
			templateUrl:'views/Admin/Artist/add-artist.html',
			controller:'ArtistAddController'
		})
		.when('/artist/user_management',{
			templateUrl:'views/Admin/Artist/artists.html',
			controller:'ArtistController'
		})
		.when('/artist/edit',{
			templateUrl:'views/Admin/Artist/artist-edit.html',
			controller:'ArtistEditController'
		})
		.when('/artist/details',{
			templateUrl:'views/Admin/Artist/artist-details.html',
			controller:'ArtistViewController'
		})
		.when('/writer/add_user',{
			templateUrl:'views/Admin/Writer/add-writer.html',
			controller:'WriterAddController'
		})
		.when('/writer/user_management',{
			templateUrl:'views/Admin/Writer/writers.html',
			controller:'WriterController'
		})
		.when('/writer/edit',{
			templateUrl:'views/Admin/Writer/writer-edit.html',
			controller:'WriterEditController'
		})
		.when('/writer/details',{
			templateUrl:'views/Admin/Writer/writer-details.html',
			controller:'WriterViewController'
		})
		.when('/fashion/user_management',{
			templateUrl:'views/Admin/Fashion/fashions.html',
			controller:'FashionController'
		})
		.when('/fashion/edit',{
			templateUrl:'views/Admin/Fashion/fashion-edit.html',
			controller:'FashionEditController'
		})
		.when('/fashion/details',{
			templateUrl:'views/Admin/Fashion/fashion-details.html',
			controller:'FashionViewController'
		})
		.when('/short_film/user_management',{
			templateUrl:'views/Admin/Short Film/shortfilm.html',
			controller:'ShortFilmController'
		})
		.when('/short_film/edit',{
			templateUrl:'views/Admin/Short Film/shortfilm-edit.html',
			controller:'ShortFilmEditController'
		})
		.when('/short_film/details',{
			templateUrl:'views/Admin/Short Film/shortfilm-details.html',
			controller:'ShortFilmViewController'
		})
		.when('/publisher/add_user',{
			templateUrl:'views/Admin/Publisher/add-publisher.html',
			controller:'PublisherAddController'
		})
		.when('/publisher/user_management',{
			templateUrl:'views/Admin/Publisher/publishers.html',
			controller:'PublisherController'
		})
		.when('/publisher/edit',{
			templateUrl:'views/Admin/Publisher/publisher-edit.html',
			controller:'PublisherEditController'
		})
		.when('/publisher/details',{
			templateUrl:'views/Admin/Publisher/publisher-details.html',
			controller:'PublisherViewController'
		})
		.when('/editor/add_user',{
			templateUrl:'views/Admin/Editor/add-editor.html',
			controller:'EditorAddController'
		})
		.when('/editor/user_management',{
			templateUrl:'views/Admin/Editor/editors.html',
			controller:'EditorController'
		})
		.when('/editor/edit',{
			templateUrl:'views/Admin/Editor/editor-edit.html',
			controller:'EditorEditController'
		})
		.when('/editor/details',{
			templateUrl:'views/Admin/Editor/editor-details.html',
			controller:'EditorViewController'
		})
		.when('/cover_designer/add_user',{
			templateUrl:'views/Admin/CoverDesigner/add-cover-designer.html',
			controller:'CoverDesignerAddController'
		})
		.when('/cover_designer/user_management',{
			templateUrl:'views/Admin/CoverDesigner/cover-designers.html',
			controller:'CoverDesignerController'
		})
		.when('/cover_designer/edit',{
			templateUrl:'views/Admin/CoverDesigner/cover-designer-edit.html',
			controller:'CoverDesignerEditController'
		})
		.when('/cover_designer/details',{
			templateUrl:'views/Admin/CoverDesigner/cover-designer-details.html',
			controller:'CoverDesignerViewController'
		})
		.when('/layout_designer/add_user',{
			templateUrl:'views/Admin/LayoutDesigner/add-layout-designer.html',
			controller:'LayoutDesignerAddController'
		})
		.when('/layout_designer/user_management',{
			templateUrl:'views/Admin/LayoutDesigner/layout-designers.html',
			controller:'LayoutDesignerController'
		})
		.when('/layout_designer/edit',{
			templateUrl:'views/Admin/LayoutDesigner/layout-designer-edit.html',
			controller:'LayoutDesignerEditController'
		})
		.when('/layout_designer/details',{
			templateUrl:'views/Admin/LayoutDesigner/layout-designer-details.html',
			controller:'LayoutDesignerViewController'
		})
		.when('/change_password',{
			templateUrl:'views/Admin/change-password.html',
			controller:'AdminDashboardController'
		})
		.when('/user_post',{
			templateUrl:'views/Artist/user_post.html',
			controller:'ArtistPostYourWorkController'
		})
		.when('/show_profile_pics',{
			templateUrl:'views/Artist/artist_profile_pics.html',
			controller:'ArtistProfilePicsController'
		})
		.otherwise({ redirectTo: '/user_dashboard' });
		}else{
			window.location.href = '/index.html';
//			alert('Not Artist');
		}
}





