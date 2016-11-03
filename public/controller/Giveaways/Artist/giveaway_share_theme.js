angular
.module('Artist')
.run(['$rootScope',run])
.controller('GiveawayShareThemeController', ['$scope', '$rootScope', '$location','$window','$http','$timeout',GiveawayShareThemeController])
;
function GiveawayShareThemeController($scope,$rootScope,$location,$window,$http,$timeout){
	var str = $location.$$absUrl;
	var theme_id = str.replace("http://localhost:8080/Artist.html#/share_theme/", "");
	$scope.theme_id = theme_id;
	$scope.share_google = function(post_id){
		var w=480;var h=380;
		var abc = $scope.theme_id;
		var x=Number((window.screen.width-w)/2);
		var y=Number((window.screen.height-h)/2);
		 $window.open('https://plus.google.com/share?url='+encodeURIComponent('http://127.0.0.1:8080/audience_details.html#/' + abc,
				  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'));return false;
	}

}

function run($rootScope) {
    $rootScope.facebookAppId = '624903007694347'; // set your facebook app id here
}


