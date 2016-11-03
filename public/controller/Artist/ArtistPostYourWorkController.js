angular
.module('Artist')
.controller('ArtistPostYourWorkController', ['$scope', '$rootScope', '$location',	'$window', '$http',ArtistPostYourWorkController])
.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
          //change event is fired when file is selected
            el.bind('change',function(){
                    scope.$apply(function(){
                        ngModel.$setViewValue(el.val());
                        ngModel.$render();
                    });
            });
        }
    };
});
;
function ArtistPostYourWorkController($scope,$rootScope,$location,$window,$http){
	$scope.countries = [
		                  "Afghanistan",
		                  "�land Islands",
		                  "Albania",
		                  "Algeria",
		                  "American Samoa",
		                  "Andorra",
		                  "Angola",
		                  "Anguilla",
		                  "Antarctica",
		                  "Antigua and Barbuda",
		                  "Argentina",
		                  "Armenia",
		                  "Aruba",
		                  "Australia",
		                  "Austria",
		                  "Azerbaijan",
		                  "Bahamas",
		                  "Bahrain",
		                  "Bangladesh",
		                  "Barbados",
		                  "Belarus",
		                  "Belgium",
		                  "Belize",
		                  "Benin",
		                  "Bermuda",
		                  "Bhutan",
		                  "Bolivia",
		                  "Bonaire, Sint Eustatius and Saba",
		                  "Bosnia and Herzegovina",
		                  "Botswana",
		                  "Bouvet Island",
		                  "Brazil",
		                  "British Indian Ocean Territory",
		                  "Brunei Darussalam",
		                  "Bulgaria",
		                  "Burkina Faso",
		                  "Burundi",
		                  "Cambodia",
		                  "Cameroon",
		                  "Canada",
		                  "Cape Verde",
		                  "Cayman Islands",
		                  "Central African Republic",
		                  "Chad",
		                  "Chile",
		                  "China",
		                  "Christmas Island",
		                  "Cocos (Keeling) Islands",
		                  "Colombia",
		                  "Comoros",
		                  "Congo",
		                  "Congo, The Democratic Republic of the",
		                  "Cook Islands",
		                  "Costa Rica",
		                  "C�te d'Ivoire",
		                  "Croatia",
		                  "Cuba",
		                  "Cura�ao",
		                  "Cyprus",
		                  "Czech Republic",
		                  "Denmark",
		                  "Djibouti",
		                  "Dominica",
		                  "Dominican Republic",
		                  "Ecuador",
		                  "Egypt",
		                  "El Salvador",
		                  "Equatorial Guinea",
		                  "Eritrea",
		                  "Estonia",
		                  "Ethiopia",
		                  "Falkland Islands (Malvinas)",
		                  "Faroe Islands",
		                  "Fiji",
		                  "Finland",
		                  "France",
		                  "French Guiana",
		                  "French Polynesia",
		                  "French Southern Territories",
		                  "Gabon",
		                  "Gambia",
		                  "Georgia",
		                  "Germany",
		                  "Ghana",
		                  "Gibraltar",
		                  "Greece",
		                  "Greenland",
		                  "Grenada",
		                  "Guadeloupe",
		                  "Guam",
		                  "Guatemala",
		                  "Guernsey",
		                  "Guinea",
		                  "Guinea-Bissau",
		                  "Guyana",
		                  "Haiti",
		                  "Heard Island and McDonald Islands",
		                  "Holy See (Vatican City State)",
		                  "Honduras",
		                  "Hong Kong",
		                  "Hungary",
		                  "Iceland",
		                  "India",
		                  "Indonesia",
		                  "Iran, Islamic Republic of",
		                  "Iraq",
		                  "Ireland",
		                  "Isle of Man",
		                  "Israel",
		                  "Italy",
		                  "Jamaica",
		                  "Japan",
		                  "Jersey",
		                  "Jordan",
		                  "Kazakhstan",
		                  "Kenya",
		                  "Kiribati",
		                  "Korea, Democratic People's Republic of",
		                  "Korea, Republic of",
		                  "Kuwait",
		                  "Kyrgyzstan",
		                  "Lao People's Democratic Republic",
		                  "Latvia",
		                  "Lebanon",
		                  "Lesotho",
		                  "Liberia",
		                  "Libya",
		                  "Liechtenstein",
		                  "Lithuania",
		                  "Luxembourg",
		                  "Macao",
		                  "Macedonia, Republic Of",
		                  "Madagascar",
		                  "Malawi",
		                  "Malaysia",
		                  "Maldives",
		                  "Mali",
		                  "Malta",
		                  "Marshall Islands",
		                  "Martinique",
		                  "Mauritania",
		                  "Mauritius",
		                  "Mayotte",
		                  "Mexico",
		                  "Micronesia, Federated States of",
		                  "Moldova, Republic of",
		                  "Monaco",
		                  "Mongolia",
		                  "Montenegro",
		                  "Montserrat",
		                  "Morocco",
		                  "Mozambique",
		                  "Myanmar",
		                  "Namibia",
		                  "Nauru",
		                  "Nepal",
		                  "Netherlands",
		                  "New Caledonia",
		                  "New Zealand",
		                  "Nicaragua",
		                  "Niger",
		                  "Nigeria",
		                  "Niue",
		                  "Norfolk Island",
		                  "Northern Mariana Islands",
		                  "Norway",
		                  "Oman",
		                  "Pakistan",
		                  "Palau",
		                  "Palestinian Territory, Occupied",
		                  "Panama",
		                  "Papua New Guinea",
		                  "Paraguay",
		                  "Peru",
		                  "Philippines",
		                  "Pitcairn",
		                  "Poland",
		                  "Portugal",
		                  "Puerto Rico",
		                  "Qatar",
		                  "Reunion",
		                  "Romania",
		                  "Russian Federation",
		                  "Rwanda",
		                  "Saint Barth�lemy",
		                  "Saint Helena, Ascension and Tristan da Cunha",
		                  "Saint Kitts and Nevis",
		                  "Saint Lucia",
		                  "Saint Martin (French Part)",
		                  "Saint Pierre and Miquelon",
		                  "Saint Vincent and the Grenadines",
		                  "Samoa",
		                  "San Marino",
		                  "Sao Tome and Principe",
		                  "Saudi Arabia",
		                  "Senegal",
		                  "Serbia",
		                  "Seychelles",
		                  "Sierra Leone",
		                  "Singapore",
		                  "Sint Maarten (Dutch Part)",
		                  "Slovakia",
		                  "Slovenia",
		                  "Solomon Islands",
		                  "Somalia",
		                  "South Africa",
		                  "South Georgia and the South Sandwich Islands",
		                  "South Sudan",
		                  "Spain",
		                  "Sri Lanka",
		                  "Sudan",
		                  "Suriname",
		                  "Svalbard and Jan Mayen",
		                  "Swaziland",
		                  "Sweden",
		                  "Switzerland",
		                  "Syrian Arab Republic",
		                  "Taiwan",
		                  "Tajikistan",
		                  "Tanzania, United Republic of",
		                  "Thailand",
		                  "Timor-Leste",
		                  "Togo",
		                  "Tokelau",
		                  "Tonga",
		                  "Trinidad and Tobago",
		                  "Tunisia",
		                  "Turkey",
		                  "Turkmenistan",
		                  "Turks and Caicos Islands",
		                  "Tuvalu",
		                  "Uganda",
		                  "Ukraine",
		                  "United Arab Emirates",
		                  "United Kingdom",
		                  "United States",
		                  "United States Minor Outlying Islands",
		                  "Uruguay",
		                  "Uzbekistan",
		                  "Vanuatu",
		                  "Venezuela",
		                  "Viet Nam",
		                  "Virgin Islands, British",
		                  "Virgin Islands, U.S.",
		                  "Wallis and Futuna",
		                  "Western Sahara",
		                  "Yemen",
		                  "Zambia",
		                  "Zimbabwe"
		                ];
	$('#file-fr').fileinput({
        language: 'fr',
        uploadUrl: '#',
        allowedFileExtensions : ['jpg', 'png','gif','mp4','wmv'],
    });
    $('#file-es').fileinput({
        language: 'es',
        uploadUrl: '#',
        allowedFileExtensions : ['jpg', 'png','gif','mp4','wmv'],
    });
    $("#file-0").fileinput({
        allowedFileExtensions : ['jpg', 'png','gif','mp4','wmv'],
    });
    $("#file-1").fileinput({
        uploadUrl: '', // you must set a valid URL here else you will get an error
        allowedFileExtensions : ['jpg', 'png','gif','mp4','wmv'],
        overwriteInitial: false,
        maxFileSize: 1000,
        maxFilesNum: 10,
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
	});
    
	$("#file-3").fileinput({
		showUpload: false,
		showCaption: false,
		browseClass: "btn btn-primary btn-lg",
		fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
	});
	$("input[name*='uploadvideo']").fileinput({
		uploadExtraData: {kvId: '10'}
	});
    $(".btn-warning").on('click', function() {
        if ($('#file-4').attr('disabled')) {
            $('#file-4').fileinput('enable');
        } else {
            $('#file-4').fileinput('disable');
        }
    });  
    
    $(".btn-info").on('click', function() {
        $('#file-4').fileinput('refresh', {previewClass:'bg-info'});
    });
    
    $(document).ready(function() {
        $("#test-upload").fileinput({
            'showPreview' : false,
            allowedFileExtensions : ['jpg', 'png','gif','mp4','wmv'],
            'elErrorContainer': '#errorBlock'
        });
    });
	
	
	
	$scope.style='.file-loading{top:0;right:0;width:25px;height:25px;font-size:999px;text-align:right;color:#fff;background:url(../img/loading.gif) top left no-repeat;border:none}.file-object{margin:0 0 -5px;padding:0}.btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;text-align:right;opacity:0;background:none;cursor:inherit;display:block}.file-caption-name{display:inline-block;overflow:hidden;height:20px;word-break:break-all}.input-group-lg .file-caption-name{height:25px}.file-zoom-dialog{text-align:left}.file-error-message{color:#a94442;background-color:#f2dede;margin:5px;border:1px solid #ebccd1;border-radius:4px;padding:15px}.file-error-message pre,.file-error-message ul{margin:0;text-align:left}.file-preview-frame,.file-preview-other{text-align:center;vertical-align:middle}.file-error-message pre{margin:5px 0}.file-caption-disabled{background-color:#EEE;cursor:not-allowed;opacity:1}.file-preview{border-radius:5px;border:1px solid #ddd;padding:5px;width:100%;margin-bottom:5px}.file-preview-frame{position:relative;display:table;margin:8px;height:160px;border:1px solid #ddd;box-shadow:1px 1px 5px 0 #a2958a;padding:6px;float:left}.file-preview-frame:not(.file-preview-error):hover{box-shadow:3px 3px 5px 0 #333}.file-preview-image{vertical-align:middle}.file-preview-text{display:block;color:#428bca;border:1px solid #ddd;font-family:Menlo,Monaco,Consolas,"Courier New",monospace;outline:0;padding:8px;resize:none}.file-input-ajax-new .fileinput-remove-button,.file-input-ajax-new .fileinput-upload-button,.file-input-ajax-new .no-browse .input-group-btn,.file-input-new .close,.file-input-new .file-preview,.file-input-new .fileinput-remove-button,.file-input-new .fileinput-upload-button,.file-input-new .glyphicon-file,.file-input-new .no-browse .input-group-btn{display:none}.file-preview-html{border:1px solid #ddd;padding:8px;overflow:auto}.file-zoom-dialog .file-preview-text{font-size:1.2em}.file-preview-other{left:0;top:0;right:0;bottom:0;margin:auto;padding:10px}.file-preview-other:hover{opacity:.8}.file-actions,.file-other-error{text-align:left}.file-other-icon{font-size:4.8em}.file-zoom-dialog .file-other-icon{font-size:8em;font-size:55vmin}.file-caption-main{width:100%}.file-input-ajax-new .no-browse .form-control,.file-input-new .no-browse .form-control{border-top-right-radius:4px;border-bottom-right-radius:4px}.file-thumb-loading{background:url(../img/loading.gif) center center no-repeat content-box!important}.file-actions{margin-top:15px}.file-footer-buttons{float:right}.file-upload-indicator{display:inline;cursor:default;opacity:.8;width:60%}.file-upload-indicator:hover{font-weight:700;opacity:1}.file-footer-caption{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:160px;text-align:center;padding-top:4px;font-size:11px;color:#777;margin:5px auto}.file-preview-error{opacity:.65;box-shadow:none}.file-preview-frame:not(.file-preview-error) .file-footer-caption:hover{color:#000}.file-drop-zone{border:1px dashed #aaa;border-radius:4px;height:100%;text-align:center;vertical-align:middle;margin:12px 15px 12px 12px;padding:5px}.file-drop-zone-title{color:#aaa;font-size:1.6em;padding:85px 10px;cursor:default}.clickable .file-drop-zone-title,.file-preview .clickable{cursor:pointer}.file-drop-zone.clickable:hover{border:2px dashed #999}.file-drop-zone.clickable:focus{border:2px solid #5acde2}.file-drop-zone .file-preview-thumbnails{cursor:default}.file-highlighted{border:2px dashed #999!important;background-color:#f0f0f0}.file-uploading{background:url(../img/loading-sm.gif) center bottom 10px no-repeat;opacity:.65}.file-thumb-progress .progress,.file-thumb-progress .progress-bar{height:10px;font-size:9px;line-height:10px}.file-thumbnail-footer{position:relative}.file-thumb-progress{height:10px;position:absolute;top:35px;left:0;right:0}.file-zoom-fullscreen.modal{position:fixed;top:0;right:0;bottom:0;left:0}.file-zoom-fullscreen .modal-dialog{position:fixed;margin:0;width:100%;height:100%;padding:0}.file-zoom-fullscreen .modal-content{border-radius:0;box-shadow:none}.file-zoom-fullscreen .modal-body{overflow-y:auto}.file-zoom-dialog .modal-body{position:relative!important}.file-zoom-dialog .btn-navigate{position:absolute;padding:0;margin:0;background:0 0;text-decoration:none;outline:0;opacity:.7;top:45%;font-size:4em;color:#1c94c4}.file-zoom-dialog .floating-buttons{position:absolute;top:5px;right:10px}.floating-buttons,.floating-buttons .btn{z-index:3000}.file-zoom-dialog .kv-zoom-actions .btn,.floating-buttons .btn{margin-left:3px}.file-zoom-dialog .btn-navigate:not([disabled]):focus,.file-zoom-dialog .btn-navigate:not([disabled]):hover{outline:0;box-shadow:none;opacity:.5}.file-zoom-dialog .btn-navigate[disabled]{opacity:.3}.file-zoom-dialog .btn-prev{left:1px}.file-zoom-dialog .btn-next{right:1px}.file-drag-handle{display:inline;margin-right:2px;font-size:16px;cursor:move;cursor:-webkit-grabbing}.file-drag-handle:hover{opacity:.7}.file-zoom-content{height:480px;text-align:center}.file-preview-initial.sortable-chosen{background-color:#d9edf7}.file-preview-frame.sortable-ghost{background-color:#eee}.btn-file ::-ms-browse{width:100%;height:100%}';
	$(document).ready(function(){
		 $("#input-20").fileinput({
		        browseClass: "btn btn-primary btn-block",
		        showCaption: false,
		        showRemove: false,
		        showUpload: false
		    });
	})

	var SelectedFile;
	var documentFile;
	$scope.onVideoFileChosen = function(element) {
		 $scope.$apply(function($scope) {
               $scope.SelectedFile = element.files[0];
               SelectedFile= event.target.files[0];
          });			
	};
	var socket = io.connect('http://localhost:8989');
	var FReader;
	var Name;
	
	$scope.post_your_work = function() {
			FReader = new FileReader();
			Name = $scope.SelectedFile.name;
			if($scope.SelectedFile.type == 'image/jpeg' || $scope.SelectedFile.type == 'image/png'){
				FReader.onload = function(evnt) {
					socket.emit('Upload', {
						'Name' : Name,
						Data : evnt.target.result
					});
				}
				socket.emit('Start', {
					'Name' : Name,
					'Size' : $scope.SelectedFile.size
				});
				}else{
					alert("Select only image file.");
				}
			 var day;
			 var day1 = $scope.post['post_maincategory'];
			 switch (day = Number(day1) ) {
			    case 1:
			        day = "painting";
			        break;
			    case 2:
			        day = "drawing";
			        break;
			    case 3:
			        day = "photography";
			        break;
			    case 4:
			        day = "crafts";
			        break;
			    case 5:
			        day = "design";
			}
			 $scope.post['post_maincategory'] = day;
	};
	
	$scope.onvideoUpload = function(){
		var timestamp = Math.floor(new Date().getTime()/1000);
		$scope.post['post_id'] = timestamp;
		$scope.post['user_id'] =$window.sessionStorage.user_id;
		$scope.post['post_role'] = "Art And Photography";
		$.ajax({
			type: 'Post',
			url: '/post_my_works',
			dataType: 'json',
			data:$scope.post,
			success: function (data) {
				if(data){
					window.location.href = '/Artist.html#/work_history';
				}
			}
		});
	};
	socket.on('MoreData', function(data) {
		UpdateBar(data['Percent']);
		var Place = data['Place'] * 524288; //The Next Blocks Starting Position
		var NewFile; //The Variable that will hold the new Block of Data
		if ($scope.SelectedFile.webkitSlice)
			NewFile = $scope.SelectedFile.webkitSlice(Place, Place
					+ Math.min(524288, ($scope.SelectedFile.size - Place)));
		else
			NewFile = $scope.SelectedFile.slice(Place, Place
					+ Math.min(524288, ($scope.SelectedFile.size - Place)));
		FReader.readAsBinaryString(NewFile);
	});
	function UpdateBar(percent) {
		var result=Math.round((Math.round(percent*100)/100))+"%";
	    document.getElementById("bar_video").innerHTML=result; 
	    document.getElementById("bar_video").style.width = result;
	}

	socket.on('Done', function(data) {
		$scope.post['file_path'] = data['Image']
				.replace("public", "..");
//		alert(JSON.stringify($scope.post));
		
		$scope.onvideoUpload();
		UpdateBar(100);
	});
	 
	 $scope.categories = 
		 [
			  {
			    "id": "1",
			    "maincategory": "painting",
			    "subCategory": ["realism","photo-realism","painterly","impressionism","expressionism","abstract","surrealism","conceptual","pop","hyper-realism","minimalism","futurism","fauvism"]
			  },
			  {
				  "id": "2",
				  "maincategory": "drawing",
				  "subCategory": []
			  },
			  {
				  "id": "3",
				  "maincategory": "photography",
				  "subCategory": ["General","journalism","street","still life","nature","wildlife","bird","scape","land","sea","macro","floral","insect","portrait","personal","wedding","family","nude","sport","architecture","astro"]
			  },
			  {
				  "id": "4",
				  "maincategory": "crafts",
				  "subCategory": ["ceramics","fiber","textile craft","flower craft","leatherwork","weaving","paper craft","wood","furniture crafts","stone craft","metal craft","handicraft"]
			  },
			  {
				  "id": "5",
				  "maincategory": "design",
				  "subCategory": []
			  },
			  {
				  "id": "6",
				  "maincategory": "design",
				  "subCategory": []
			  },
		 ];

	 
	 $scope.getSubCategories = function (coming_object) {
		 $scope.categoryId1 = $scope.post.post_maincategory -1;
	}
}

