angular
.module('Artist')
.controller('Artistlive_nowController', ['$scope', '$rootScope', '$location','$window', '$http','socket','$routeParams',Artistlive_nowController])
.factory('socket',['$rootScope',socket])
;
function Artistlive_nowController($scope,$rootScope,$location,$window,$http,socket,$routeParams){
     $scope.$on("$locationChangeStart", function(event,next,current) {
    	 if(!confirm("Are you want to leave this page ?")){
    		 event.preventDefault();
    		 $location.path('/user_profile');
    	 }
     });
     
//     if(current){
//    	 alert('sss');
//     }
//		
	if($routeParams.id){
	}else{
//		$location.path('/user_profile')
		location.reload();
	}
	var socket = io.connect('http://localhost:8989');
	 $scope.users = [];
	  $scope.curtrentUser = '';
	  socket.on('connect', function () { });

	  socket.on('updatechat', function (username, data) {
	    var user = {};
	    user.username = username;
	    user.message = data;
	    user.date = new Date().getTime();
	    user.image = 'http://dummyimage.com/250x250/000/fff&text=' + username.charAt(0).toUpperCase();
	        $scope.$apply(function () {
	        	$scope.users.push(user);
	        });
	  });

	  socket.on('roomcreated', function (data) {
	    socket.emit('adduser', data);
	  });

	  $scope.createRoom = function (data) {
	    $scope.curtrentUser = data.username;
	    socket.emit('createroom', data);
	  }

	  $scope.joinRoom = function (data) {
	    $scope.curtrentUser = data.username;
	    socket.emit('adduser', data);
	  }

	  $scope.doPost = function (message) {
	    socket.emit('sendchat', message);
	  }
	  
	var broadcast = function(config) {
	    var self = {
	        userToken: uniqueToken()
	    },
	        channels = '--',
	        isbroadcaster,
	        isGetNewRoom = true,
	        defaultSocket = { };

	    function openDefaultSocket() {
	        defaultSocket = config.openSocket({
	            onmessage: onDefaultSocketResponse,
	            callback: function(socket) {
	                defaultSocket = socket;
	            }
	        });
	    }

	    function onDefaultSocketResponse(response) {
	        if (response.userToken == self.userToken) return;

	        if (isGetNewRoom && response.roomToken && response.broadcaster) config.onRoomFound(response);

	        if (response.userToken && response.joinUser == self.userToken && response.participant && channels.indexOf(response.userToken) == -1) {
	            channels += response.userToken + '--';
	            openSubSocket({
	                isofferer: true,
	                channel: response.channel || response.userToken,
	                closeSocket: true
	            });
	        }
	    }

	    function openSubSocket(_config) {
	        if (!_config.channel) return;
	        var socketConfig = {
	            channel: _config.channel,
	            onmessage: socketResponse,
	            onopen: function() {
	                if (isofferer && !peer) initPeer();
	            }
	        };

	        socketConfig.callback = function(_socket) {
	            socket = _socket;
	            this.onopen();
	        };

	        var socket = config.openSocket(socketConfig),
	            isofferer = _config.isofferer,
	            gotstream,
	            video = document.createElement('video'),
	            inner = { },
	            peer;

	        var peerConfig = {
	            attachStream: config.attachStream,
	            onICE: function(candidate) {
	                socket.send({
	                    userToken: self.userToken,
	                    candidate: {
	                        sdpMLineIndex: candidate.sdpMLineIndex,
	                        candidate: JSON.stringify(candidate.candidate)
	                    }
	                });
	            },
	            onRemoteStream: function(stream) {
	                if (!stream) return;

	                video[moz ? 'mozSrcObject' : 'src'] = moz ? stream : webkitURL.createObjectURL(stream);
	                video.play();

	                _config.stream = stream;
	                onRemoteStreamStartsFlowing();
	            }
	        };

	        function initPeer(offerSDP) {
	            if (!offerSDP) {
	                peerConfig.onOfferSDP = sendsdp;
	            } else {
	                peerConfig.offerSDP = offerSDP;
	                peerConfig.onAnswerSDP = sendsdp;
	            }

	            peer = RTCPeerConnection(peerConfig);
	        }
	        
	        function afterRemoteStreamStartedFlowing() {
	            gotstream = true;

	            config.onRemoteStream({
	                video: video,
	                stream: _config.stream
	            });

	            /* closing subsocket here on the offerer side */
	            if (_config.closeSocket) socket = null;
	        }

	        function onRemoteStreamStartsFlowing() {
	            if(navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i)) {
	                // if mobile device
	                return afterRemoteStreamStartedFlowing();
	            }
	            
	            if (!(video.readyState <= HTMLMediaElement.HAVE_CURRENT_DATA || video.paused || video.currentTime <= 0)) {
	                afterRemoteStreamStartedFlowing();
	            } else setTimeout(onRemoteStreamStartsFlowing, 50);
	        }

	        function sendsdp(sdp) {
	            sdp = JSON.stringify(sdp);
	            var part = parseInt(sdp.length / 3);

	            var firstPart = sdp.slice(0, part),
	                secondPart = sdp.slice(part, sdp.length - 1),
	                thirdPart = '';

	            if (sdp.length > part + part) {
	                secondPart = sdp.slice(part, part + part);
	                thirdPart = sdp.slice(part + part, sdp.length);
	            }

	            socket.send({
	                userToken: self.userToken,
	                firstPart: firstPart
	            });

	            socket.send({
	                userToken: self.userToken,
	                secondPart: secondPart
	            });

	            socket.send({
	                userToken: self.userToken,
	                thirdPart: thirdPart
	            });
	        }

	        function socketResponse(response) {
	            if (response.userToken == self.userToken) return;
	            if (response.firstPart || response.secondPart || response.thirdPart) {
	                if (response.firstPart) {
	                    inner.firstPart = response.firstPart;
	                    if (inner.secondPart && inner.thirdPart) selfInvoker();
	                }
	                if (response.secondPart) {
	                    inner.secondPart = response.secondPart;
	                    if (inner.firstPart && inner.thirdPart) selfInvoker();
	                }

	                if (response.thirdPart) {
	                    inner.thirdPart = response.thirdPart;
	                    if (inner.firstPart && inner.secondPart) selfInvoker();
	                }
	            }

	            if (response.candidate && !gotstream) {
	                peer && peer.addICE({
	                    sdpMLineIndex: response.candidate.sdpMLineIndex,
	                    candidate: JSON.parse(response.candidate.candidate)
	                });
	            }
	        }

	        var invokedOnce = false;

	        function selfInvoker() {
	            if (invokedOnce) return;

	            invokedOnce = true;

	            inner.sdp = JSON.parse(inner.firstPart + inner.secondPart + inner.thirdPart);
	            if (isofferer) peer.addAnswerSDP(inner.sdp);
	            else initPeer(inner.sdp);
	        }
	    }

	    function startBroadcasting() {
	        defaultSocket && defaultSocket.send({
	            roomToken: self.roomToken,
	            roomName: self.roomName,
	            broadcaster: self.userToken
	        });
	        setTimeout(startBroadcasting, 3000);
	    }

	    function uniqueToken() {
	        var s4 = function() {
	            return Math.floor(Math.random() * 0x10000).toString(16);
	        };
	        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
	    }

	    openDefaultSocket();
	    return {
	        createRoom: function(_config) {
	            self.roomName = _config.roomName || 'Anonymous';
	            self.roomToken = uniqueToken();

	            isbroadcaster = true;
	            isGetNewRoom = false;
	            startBroadcasting();
	        },
	        joinRoom: function(_config) {
	            self.roomToken = _config.roomToken;
	            isGetNewRoom = false;

	            openSubSocket({
	                channel: self.userToken
	            });

	            defaultSocket.send({
	                participant: true,
	                userToken: self.userToken,
	                joinUser: _config.joinUser
	            });
	        }
	    };
	};
	var config = {
		    openSocket: function(config) {
		        var channel = config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
		        var socket = new Firebase('https://webrtc.firebaseIO.com/' + channel);
		        socket.channel = channel;
		        socket.on('child_added', function(data) {
		            config.onmessage(data.val());
		        });
		        socket.send = function(data) {
		            this.push(data);
		        };
		        config.onopen && setTimeout(config.onopen, 1);
		        socket.onDisconnect().remove();
		        return socket;
		    },
		    onRemoteStream: function(media) {
		        var video = media.video;
		        video.setAttribute('controls', true);

		        participants.insertBefore(video, participants.firstChild);

		        video.play();
		        rotateVideo(video);
		    },
		    onRoomFound: function(room) {
		    	  var visibleElements = document.getElementsByClassName('visible'),
			        length = visibleElements.length;
			    for (var i = 0; i < length; i++) {
			        visibleElements[0].style.display = 'none';
			    }
		        var alreadyExist = document.getElementById(room.broadcaster);
//		        alert(JSON.stringify(room));
		        if (alreadyExist) return;

		        if (typeof roomsList === 'undefined') 
//		        	alert(roomsList);
		        	roomsList = document.body
//		        	var visibleElements = document.getElementsById('video-broadcaster');
//		        	visibleElements.style.display = 'none';
		        	;

		        var tr = document.createElement('tr');
		        tr.setAttribute('id', room.broadcaster);
		        tr.innerHTML = '<td>' + room.roomName + '</td>' +
		            '<td><button class="join" id="' + room.roomToken + '">Join Room</button></td>';
		        roomsList.insertBefore(tr, roomsList.firstChild);

		        tr.onclick = function() {
		            tr = this;
		            captureUserMedia(function() {
		                broadcastUI.joinRoom({
		                    roomToken: tr.querySelector('.join').id,
		                    joinUser: tr.id
		                });
		            });
		            hideUnnecessaryStuff();
		        };
		    }
		};

		$scope.createButtonClickHandler = function(coming_object) {
		    captureUserMedia(function() {
		        broadcastUI.createRoom({
		            roomName: (coming_object.conference_name ) || 'Anonymous'
		        });
		    });
		    hideUnnecessaryStuff();
		}

		function captureUserMedia(callback) {
		    var video = document.createElement('video');
		    video.setAttribute('autoplay', true);
		    video.setAttribute('controls', true);
		    participants.insertBefore(video, participants.firstChild);

		    getUserMedia({
		        video: video,
		        onsuccess: function(stream) {
		            config.attachStream = stream;
		            callback && callback();

		            video.setAttribute('muted', true);
		            rotateVideo(video);
		        },
		        onerror: function() {
		            alert('unable to get access to your webcam.');
		            callback && callback();
		        }
		    });
		}

		var broadcastUI = broadcast(config);

		var participants = document.getElementById("participants") || document.body;
		var roomsList = document.getElementById('rooms-list');
		
		function hideUnnecessaryStuff() {
		    var visibleElements = document.getElementsByClassName('visible'),
		        length = visibleElements.length;
//		    alert(length);
		    for (var i = 0; i < length; i++) {
		        visibleElements[i].style.display = 'none';
		    }
		}

		function rotateVideo(video) {
		    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
		    setTimeout(function() {
		        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
		    }, 1000);
		}

		(function() {
		    var uniqueToken = document.getElementById('unique-token');
		    if (uniqueToken)
		        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
		        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
		})();
}
function socket($rootScope) {
	  var socket = io.connect();
	  return {
	    on: function (eventName, callback) {
	      socket.on(eventName, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
	  };
}

