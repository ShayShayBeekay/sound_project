//Sets up a new context of the WebAudio API
    var context = new webkitAudioContext();
    var soundBuffer1=null;
    var soundBuffer2=null;
    var soundBuffer3=null;
    var soundBuffer4=null;
    var soundBuffer5=null;

    var soundBufferSourceNode1=context.createBufferSource();
    soundBufferSourceNode1.looping=true;
    var soundBufferSourceNode2=context.createBufferSource();
    soundBufferSourceNode2.looping=true;
    var soundBufferSourceNode3=context.createBufferSource();
    soundBufferSourceNode3.looping=true;
    var soundBufferSourceNode4=context.createBufferSource();
    soundBufferSourceNode4.looping=true;
    var soundBufferSourceNode5=context.createBufferSource();
    soundBufferSourceNode5.looping=true;

    window.onload=function(){
      refreshData();
      //Loads each of our sound files.
      loadSound('sounds/fire_test1.mp3',1);
      loadSound('sounds/wind_test.mp3',2);
      loadSound('sounds/rain_test1.mp3',3);
      loadSound('sounds/stream.mp3',4);
      loadSound('sounds/spring_test.mp3',5);
      recreate_buffers();
    }
    //Function to get our sound files.
    function loadSound(url, bufferNum){
      var request= new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType='arraybuffer';
      
      //Decode asynchronously. Checks if our sound files have loaded properly.    
      request.onload=function(){
        var successCallback=function(buffer){
          switch(bufferNum){
          case 1:
            soundbuffer1=buffer;
          break;
          case 2:
            soundbuffer2=buffer;
          break;
          case 3:
            soundbuffer3=buffer;
          break;
          case 4:
            soundbuffer4=buffer;
          break;
          case 5:
            soundbuffer5=buffer;
          break;
          }
        }
        var errorCallback=function(e){
          console.log(e);
        }
        context.decodeAudioData(request.response, successCallback, errorCallback);
      }
      request.send();
    }

    /*Function to create the buffers for each of out sounds.
      Each of the sound buffers are defaulted to Null.
      We then create a buffer source for each sound.
      We set looping to true so that our sound files will continue to loop indefinitely unless we click pause.
    */
    function recreate_buffers(){
      var soundBuffer1=null;
      var soundBuffer2=null;
      var soundBuffer3=null;
      var soundBuffer4=null;
      var soundBuffer5=null;
      soundBufferSourceNode1=context.createBufferSource();
      soundBufferSourceNode1.looping=true;
      soundBufferSourceNode2=context.createBufferSource();
      soundBufferSourceNode2.looping=true;
      soundBufferSourceNode3=context.createBufferSource();
      soundBufferSourceNode3.looping=true;
      soundBufferSourceNode4=context.createBufferSource();
      soundBufferSourceNode4.looping=true;
      soundBufferSourceNode5=context.createBufferSource();
      soundBufferSourceNode5.looping=true;
    }
    //This function plays sound 1
    function p_sound1(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the opaic and show the fuller image.
      */
      document.getElementById('btn1_p').style.display='none';
      document.getElementById('btn1_s').style.display='block';
      playSound(soundBuffer1, soundBufferSourceNode1);
    }
    //This function stops sound 1
    function s_sound1(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the fuller and show the more-opaic image.
      */
      document.getElementById('btn1_p').style.display='block';
      document.getElementById('btn1_s').style.display='none';
      stopSound(soundBufferSourceNode1);
      //When we stop any sound, we need to recreate the buffers, or it won't play if the user tries to replay it.
      recreate_buffers();
    }
    //This function plays sound 2
    function p_sound2(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the opaic and show the fuller image.
      */
      document.getElementById('btn2_p').style.display='none';
      document.getElementById('btn2_s').style.display='block';
      playSound(soundBuffer2, soundBufferSourceNode2);
    }
    //This function stops sound 2
    function s_sound2(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the fuller and show the more-opaic image.
      */
      document.getElementById('btn2_p').style.display='block';
      document.getElementById('btn2_s').style.display='none';
      stopSound(soundBufferSourceNode2);
      //When we stop any sound, we need to recreate the buffers, or it won't play if the user tries to replay it.
      recreate_buffers();
    }
    //This function plays sound 3
    function p_sound3(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the opaic and show the fuller image.
      */
      document.getElementById('btn3_p').style.display='none';
      document.getElementById('btn3_s').style.display='block';
      playSound(soundBuffer3, soundBufferSourceNode3);
    }
    //This function stops sound 3
    function s_sound3(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the fuller and show the more-opaic image.
      */
      document.getElementById('btn3_p').style.display='block';
      document.getElementById('btn3_s').style.display='none';
      stopSound(soundBufferSourceNode3);
      //When we stop any sound, we need to recreate the buffers, or it won't play if the user tries to replay it.
      recreate_buffers();
    }
    //This function plays sound 4
    function p_sound4(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the opaic and show the fuller image.
      */
      document.getElementById('btn4_p').style.display='none';
      document.getElementById('btn4_s').style.display='block';
      playSound(soundBuffer4, soundBufferSourceNode4);
    }
    //This function stops sound 4
    function s_sound4(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the fuller and show the more-opaic image.
      */
      document.getElementById('btn4_p').style.display='block';
      document.getElementById('btn4_s').style.display='none';
      stopSound(soundBufferSourceNode4);
      //When we stop any sound, we need to recreate the buffers, or it won't play if the user tries to replay it.
      recreate_buffers();
    }
    //This function plays sound 5
    function p_sound5(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the opaic and show the fuller image.
      */
      document.getElementById('btn5_p').style.display='none';
      document.getElementById('btn5_s').style.display='block';
      playSound(soundBuffer5, soundBufferSourceNode5);
    }
    //This function stops sound 5
    function s_sound5(){
      /*We change the image used when we click, less opaic image is playing, more see-through is paused.
      Here we hide the fuller and show the more-opaic image.
      */
      document.getElementById('btn5_p').style.display='block';
      document.getElementById('btn5_s').style.display='none';
      stopSound(soundBufferSourceNode5);
      //When we stop any sound, we need to recreate the buffers, or it won't play if the user tries to replay it.
      recreate_buffers();
    }
    //This function plays the sound by calling .noteOn
    function playSound(buffer, bufferSourceNode){
      bufferSourceNode.buffer=buffer;
      bufferSourceNode.connect(context.destination);
      bufferSourceNode.noteOn(0);
    }
    //This function stops the sound by calling .noteOff
    function stopSound(bufferSourceNode){
      bufferSourceNode.noteOff(0);
    }