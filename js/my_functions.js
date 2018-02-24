		// Create the Audio Context
		context = new webkitAudioContext();

		// Load the Sound with XMLHttpRequest
		function loadSound_Fire() {
		    var request = new XMLHttpRequest();
		    request.open("GET", "sounds/fire.mp3", true); // Path to Audio File
		    request.responseType = "arraybuffer"; // Read as Binary Data
		    request.onload = function() {
		        var incomingData = request.response;
		        play(incomingData);
		    };
		    request.send();
		}
		function loadSound_Rain() {
		    var request = new XMLHttpRequest();
		    request.open("GET", "sounds/rain.mp3", true); // Path to Audio File
		    request.responseType = "arraybuffer"; // Read as Binary Data
		    request.onload = function() {
		        var incomingData = request.response;
		        play(incomingData);
		    };
		    request.send();
		}
		function loadSound_Wind() {
		    var request = new XMLHttpRequest();
		    request.open("GET", "sounds/wind.mp3", true); // Path to Audio File
		    request.responseType = "arraybuffer"; // Read as Binary Data
		    request.onload = function() {
		        var incomingData = request.response;
		        play(incomingData);
		    };
		    request.send();
		}
		function loadSound_Stream() {
		    var request = new XMLHttpRequest();
		    request.open("GET", "sounds/stream-3.mp3", true); // Path to Audio File
		    request.responseType = "arraybuffer"; // Read as Binary Data
		    request.onload = function() {
		        var incomingData = request.response;
		        play(incomingData);
		    };
		    request.send();
		}
		// Play Function
		function play(incomingData) {
		    source = context.createBufferSource(); // Create Sound Source
		    buffer = context.createBuffer(incomingData, true); // Create Mono Source Buffer from Raw Binary
		    source.buffer = buffer; // Add Buffered Data to Object
		    source.connect(context.destination); // Connect Sound Source to Output
		    source.noteOn(context.currentTime); // Play the Source when Triggered
		}

		// Trigger Event for the Play Button
		document.querySelector('.play-button-rain').addEventListener('click', loadSound_Rain);
		document.querySelector('.play-button-fire').addEventListener('click', loadSound_Fire);
		document.querySelector('.play-button-wind').addEventListener('click', loadSound_Wind);
		document.querySelector('.play-button-stream').addEventListener('click', loadSound_Stream);