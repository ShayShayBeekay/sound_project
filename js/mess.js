 var context = new webkitAudioContext();

  var soundBuffer1 = null;
  var soundBuffer2 = null;
  var soundBuffer3 = null;
  var soundBuffer4 = null;
  var soundBuffer5 = null;

  var soundBufferSourceNode1 = context.createBufferSource();
  soundBufferSourceNode1.looping = true;
  var soundBufferSourceNode2 = context.createBufferSource();
  soundBufferSourceNode2.looping = true;
  var soundBufferSourceNode3 = context.createBufferSource();
  soundBufferSourceNode3.looping = true;
  var soundBufferSourceNode4 = context.createBufferSource();
  soundBufferSourceNode4.looping = true;
  var soundBufferSourceNode5 = context.createBufferSource();
  soundBufferSourceNode5.looping = true;

  loadSound('sounds/fire_test1.wav', 1);
  loadSound('sounds/wind_test.wav', 2);
  loadSound('sounds/rain_test1.wav', 3);
  loadSound('sounds/stream.mp3', 4);
  loadSound('sounds/spring_test.wav', 5);

oscillator.noteOn(0); // Generate sound instantly

gainNode1 = context.createGainNode(); // Create gain node 
gainNode1.gain.value = 0.5; // Set gain node to 30 percent volume

gainNode2 = context.createGainNode(); // Create gain node 
gainNode2.gain.value = 0.5; // Set gain node to 30 percent volume

gainNode3 = context.createGainNode(); // Create gain node 
gainNode3.gain.value = 0.5; // Set gain node to 30 percent volume

gainNode4 = context.createGainNode(); // Create gain node 
gainNode4.gain.value = 0.5; // Set gain node to 30 percent volume

gainNode5 = context.createGainNode(); // Create gain node 
gainNode5.gain.value = 0.5; // Set gain node to 30 percent volume


playSound(soundBuffer1, soundBufferSourceNode1);
playSound(soundBuffer2, soundBufferSourceNode2);
playSound(soundBuffer3, soundBufferSourceNode3);
playSound(soundBuffer4, soundBufferSourceNode4);
playSound(soundBuffer5, soundBufferSourceNode5);

function playSound(buffer, bufferSourceNode) {
    bufferSourceNode.buffer = buffer;
    bufferSourceNode.connect(context.destination);
    bufferSourceNode.noteOn(0);
}

function loadSound(url, bufferNum) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      var successCallback = function(buffer) {
        switch(bufferNum) {
          case 1:
            soundBuffer1 = buffer;
            playBtn1.disabled = false;
          break;
          case 2:
                soundBuffer2 = buffer;
            playBtn2.disabled = false;
          break;
          case 3:
            soundBuffer3 = buffer;
            playBtn3.disabled = false;
          break;
          case 4:
            soundBuffer4 = buffer;
            playBtn4.disabled = false;
          break;
          case 5:
            soundBuffer5 = buffer;
            playBtn5.disabled = false;
          break;
        }
      }
      var errorCallback = function(e) {
      console.log(e);
      }
      context.decodeAudioData(request.response, successCallback, errorCallback);
    }

    request.send();
  }