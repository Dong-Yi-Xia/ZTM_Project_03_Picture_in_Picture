const videoElement = document.getElementById('video')
const startButton = document.getElementById('startButton')
const sourceButton = document.getElementById('sourceButton')

//Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia() //web API, permission of screenshare
        videoElement.srcObject = mediaStream // store the connected video element into srcObject 
        // display the screenshare video in the video element 
        videoElement.onloadeddata = () => {
            videoElement.play()
        }
    } catch (error) {
        //Catch Error Here
        console.log('Whoops, error here:', error)
    }
}


sourceButton.addEventListener('click',  () => {
    stopCapture() //If there is a screenshare is use, stop it first
    if (document.pictureInPictureElement) { //If there is pic-in-pic in use. Exit and reset start button text
        document.exitPictureInPicture()
        startButton.innerText = 'START';
    }
    selectMediaStream()
})


startButton.addEventListener('click', async () => {
    if (document.pictureInPictureElement) { //if doc has pic-in-pic ON, exit pic-in-pic 
        await document
          .exitPictureInPicture()
          .catch(error => {
            // Error handling
          })
      } else {              //if doc pic-in-pic is OFF, enter pic-in-pic mode
        await videoElement
        .requestPictureInPicture()
        .catch(error => {
          // Error handling
        });
      }
})

//Stop the screenshare and set the video srcObject = null
async function stopCapture(evt) {
    let tracks = await videoElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
}


//video event listener enterpictureinpicture event and leavepictureinpicture event
videoElement.addEventListener('enterpictureinpicture', () => { //on enter picture-in-picture mode
    startButton.innerText = 'STOP';
});


videoElement.addEventListener('leavepictureinpicture', () => { //on exit picture-in-picture mode
    startButton.innerText = 'START';
    stopCapture() //Stop the screenshare
});




// startButton.addEventListener('click', async () => {
//     // Display startButton
//     startButton.disable = true

//     // Start Picture in Picture
//     await videoElement.requestPictureInPicture()
//     //Reset startButton
//     startButton.disable = false 
// })


// On Load
// selectMediaStream()