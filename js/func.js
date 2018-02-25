
//We set up an array of buffers to store our sounds in, with an extra entry as dummy '0' entry
var QUAL_MUL = 30;
var soundBuffers = [null,null,null,null,null,null,null];

//We load our sounds into the buffer when the page is opened.
window.onload = function(){
  /*These files are based on files sourced from various online open-source resources
  that I have trimmed to better suit looping (i.e. removed pauses/gaps).
  */
  loadSound('sounds/fire_test1.mp3', 1);
  loadSound('sounds/wind_test.mp3', 2);
  loadSound('sounds/rain_test.wav', 3);
  loadSound('sounds/stream.mp3', 4);
  loadSound('sounds/spring_test.mp3', 5);
  loadSound('sounds/thunder.mp3', 6);

  //Sets up the AudioContext depending on if browser is webkit or not.
  context = new (window.AudioContext || window.webkitAudioContext)();
  mySampleRate = context.sampleRate;
  
  //Sets up the master volume, with value equal to the value on the slider.
  masterVolume = context.createGain();
  masterVolume.gain.value=parseFloat(document.getElementById('master_vol').value);
  masterVolume.connect(context.destination);

  //Creating filters, setting their types and setting up booleans for later use.
  //Lowpass Filter Setup
  lowpass = context.createBiquadFilter();
  lp_bool=false;
  lowpass.type="lowpass";
  lowpass.value = 4000;

  //Had intended to implement more than just lowpass filtering, but ran into issues.
  //Highpass Filter Setup
  highpass = context.createBiquadFilter();
  highpass.type="highpass";
  hp_bool=false;

  //Bandpass Filter Setup
  bandpass = context.createBiquadFilter();
  bandpass.type="bandpass";
  bp_bool=false;

  //Lowshelf Filter Setup
  lowshelf = context.createBiquadFilter();
  lowshelf.type="lowshelf";

  //Highshelf Filter Setup
  highshelf = context.createBiquadFilter();
  highshelf.type="highshelf";

  //Peaking Filter Setup
  peaking = context.createBiquadFilter();
  peaking.type="peaking";

  //Notch Filter Setup
  notch = context.createBiquadFilter();
  notch.type="notch";

  //Allpass Filter Setup
  allpass = context.createBiquadFilter();
  allpass.type="allpass";
};

//Function for switching the filter on and off.
function toggle_filter(filter_name) {
  masterVolume.disconnect(0);
  // Check if we want to enable the filter.
  if (document.getElementById('filter_check_none').checked) {
    // Otherwise, connect directly.
    masterVolume.connect(context.destination);
  }
  if (document.getElementById('filter_check').checked) {
    // Connect through the filter.
    masterVolume.connect(filter_name);
    filter_name.connect(context.destination);
    filter_name.Q.value = parseFloat(document.getElementById('qual').value) * QUAL_MUL;
  } else{
    filter_name.disconnect(0);
    // Otherwise, connect directly.
    masterVolume.connect(context.destination);
  }
};

/*Function for changing the frequency, controllable by user via slider*/
function change_frequency(filter_name) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue =  44100 / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (parseFloat(document.getElementById('freq').value) - 1.0));
  // Get back to the frequency value between min and max.
  filter_name.frequency.value = maxValue * multiplier;
};

/*Function for changing sound quality, controllable by user via slider*/
function change_quality(filter_name) {
  filter_name.Q.value = parseFloat(document.getElementById('qual').value) * QUAL_MUL;
};

/*Function to play sound, take in a number to represent each sound icon. Its a bit chunky, but implementing this was was the only way to get rid of the issue I was having with one sound getting lost in the buffer. */
function play_sound(num){
  /*Shows the paused version of button, hides the play version of the button.
  Shows volume slider for selected sound.
  */
  document.getElementById('playBtn'+num+'_play').style.display = 'none';
  document.getElementById('playBtn'+num+'_stop').style.display = 'block';
  document.getElementById('playBtn'+num+'_vol').style.display = 'block';
  if(num==1) {
    //Creates buffer for sound.
    source1 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain1 = context.createGain();
    gain1.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source1.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source1.connect(gain1);
    //Connect our gain node to our destination
    gain1.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source1.loop= true;
    source1.looping=true;
    //Start playing the sound.
    source1[source1.start ? 'start' : 'noteOn'](0);
  }else if(num==2) {
    //Creates buffer for sound.
    source2 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain2 = context.createGain();
    gain2.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source2.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source2.connect(gain2);
    //Connect our gain node to our destination
    gain2.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source2.loop = true;
    source2.looping = true;
    //Start playing the sound.
    source2[source2.start ? 'start' : 'noteOn'](0);
  }else if(num==3) {
    //Creates buffer for sound.
    source3 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain3 = context.createGain();
    gain3.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source3.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source3.connect(gain3);
    //Connect our gain node to our destination
    gain3.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source3.loop=true;
    source3.looping = true;
    //Start playing the sound.
    source3[source3.start ? 'start' : 'noteOn'](0);
  }else if(num==4) {
    //Creates buffer for sound.
    source4 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain4 = context.createGain();
    gain4.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source4.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source4.connect(gain4);
    //Connect our gain node to our destination
    gain4.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source4.loop=true;
    source4.looping = true;
    //Start playing the sound.
    source4[source4.start ? 'start' : 'noteOn'](0);
  }else if(num==5) {
    //Creates buffer for sound.
    source5 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain5 = context.createGain();
    gain5.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source5.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source5.connect(gain5);
    //Connect our gain node to our destination
    gain5.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source5.loop=true;
    source5.looping = true;
    //source5[source5.looping ? 'looping' : 'loop']=true;
    //Start playing the sound.
    source5[source5.start ? 'start' : 'noteOn'](0);
  }else if(num==6) {
    //Creates buffer for sound.
    source6 = context.createBufferSource();
    //Create gain node for volume and set value.
    gain6 = context.createGain();
    gain6.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Sends the sound at spot num in our buffer array to the buffer for our currently playing sound.
    source6.buffer = soundBuffers[num];
    //Connect our source to our gain node.
    source6.connect(gain6);
    //Connect our gain node to our destination
    gain6.connect(masterVolume);
    //Sets the sound to loop continuously so we have seemless play-back.
    source6.loop=true;
    source6.looping = true;
    //Start playing the sound.
    source6[source6.start ? 'start' : 'noteOn'](0);
  }else if(num==7){
    //Creates buffer for sound.
    source7 = context.createWhiteNoise();
    //Create gain node for volume and set value.
    gain7 = context.createGain();
    gain7.gain.value=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Connect our source to our gain node.
    source7.connect(gain7);
    //Connect our gain node to our destination
    gain7.connect(masterVolume);
    source7[source7.start ? 'start' : 'noteOn'](0);
  }else if(num==8){
    //Create our white noise be calling our createPinkNoise method
    source8 = context.createPinkNoise();
    //Create gain node for volume and set value.
    gain8 = context.createGain();
    gain8.gain.value = parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Connect our source to our gain node.
    source8.connect(gain8);
    //Connect our gain node to our destination
    gain8.connect(masterVolume);
    //Start playing the sound.
    source8[source8.start ? 'start' : 'noteOn'](0);
  }else if(num==9){
    //Create our white noise be calling our createBrownNoise method
    source9 = context.createBrownNoise();
    //Create gain node for volume and set value.
    gain9 = context.createGain();
    gain9.gain.value = parseFloat(document.getElementById('playBtn'+num+'_vol').value);
    //Connect our source to our gain node.
    source9.connect(gain9);
    //Connect our gain node to our destination
    gain9.connect(masterVolume);
    //Start playing the sound.
    source9[source9.start ? 'start' : 'noteOn'](0);
  }
};

//Function to stop sound, take in a number to represent each sound icon.
function stop_sound(num){
  /*Shows the play version of button, hides the paused version of the button.
  Hides volume slider for selected sound.
  */
  document.getElementById('playBtn'+num+'_play').style.display = 'block';
  document.getElementById('playBtn'+num+'_stop').style.display = 'none';
  document.getElementById('playBtn'+num+'_vol').style.display = 'none';
  if (num==1) {
    //Stops playing the currently playing sound.
    source1.stop(0);
    source1 = null;
  }else if (num==2) {
    //Stops playing the currently playing sound.
    source2.stop(0);
    source2 = null;
  }else if (num==3) {
    //Stops playing the currently playing sound.
    source3.stop(0);
    source3 = null;
  }else if (num==4) {
    //Stops playing the currently playing sound.
    source4.stop(0);
    source4 = null;
  }else if (num==5) {
    //Stops playing the currently playing sound.
    source5.stop(0);
    source5 = null;
  }else if (num==6) {
    //Stops playing the currently playing sound.
    source6.stop(0);
    source6 = null;
  }else if (num==7) {
    //Sets the volume to zero, similar to having no sounds playing. Bit hacky but it serves purpose.
    gain7.gain.value = 0;
  }else if (num==8) {
    //Sets the volume to zero, similar to having no sounds playing. Bit hacky but it serves purpose.
    gain8.gain.value = 0;
  }else if (num==9) {
    //Sets the volume to zero, similar to having no sounds playing. Bit hacky but it serves purpose.
    gain9.gain.value = 0;
  }
};

//Function for loading out sound files for the first 6 sounds into a buffer. Takes params of file location and slot in buffer.
function loadSound(url, bufferNum) {
  //Sets up and makes request to get file from where its being stored.
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    //Throws the sound file into the buffer array
    var successCallback = function(buffer) {
      soundBuffers[bufferNum] = buffer;
    }
    //If there's an error, handles it.
    var errorCallback = function(e) {
      console.log(e);
    }
    context.decodeAudioData(request.response, successCallback, errorCallback);
  }
  request.send();
};

//Function for changing the volume for each of the sounds. Takes in sound no. and gainNode.
function changeVolume(num,gainNo){
  //Get value from volume slider
  val=parseFloat(document.getElementById('playBtn'+num+'_vol').value);
  // Using an x^2 progression as it gives a better sound than linear.
  val2=val*val+0.05;
  //Updates the gainNode with the new volume value.
  gainNo.gain.value=val;
};
//Function for changing the master volume.
function change_master_volume(){
  //Get value from volume slider
  val=parseFloat(document.getElementById('master_vol').value);
  // Using an x^2 progression as it gives a better sound than linear.
  val2=val*val+0.05;
  //Updates the gainNode with the new volume value.
  masterVolume.gain.value=val;
};
