const videoElement = document.getElementById('video')
const startButton = document.getElementById('startButton')
const sourceButton = document.getElementById('sourceButton')

//Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream // HTMLMediaElement
        videoElement.onloadeddata = () => {
            videoElement.play()
        }
    } catch (error) {
        //Catch Error Here
        console.log('Whoops, error here:', error)
    }
}


sourceButton.addEventListener('click', selectMediaStream)

startButton.addEventListener('click', async () => {
    // Display startButton
    startButton.disable = true

    // Start Picture in Picture
    await videoElement.requestPictureInPicture()
    //Reset startButton
    startButton.disable = false 
})




// On Load
// selectMediaStream()