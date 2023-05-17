leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
song1=""
song2=""
scoreLeftWrist = 0
scoreRightWrist = 0
music_status1 = ""
music_status2 = ""
function preload()
{
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}

function setup()
{
    canvas=createCanvas(600,600)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    posenet=ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses)
}

function draw()
{
    image(video, 0, 0, 600, 600)

    music_status1=song1.isPlaying()
    music_status2=song2.isPlaying()


    fill(255,0,0)
    stroke(255,0,0)

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20)
        song2.stop()
        song1.play()
        if(music_status1 = false)
        {
            song2.play()
            document.getElementById("sng_numb").innerHTML = "Song:1"
        }
    } 
    
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20)
        {
            song1.stop()
            
            if(music_status2 = false)
            {
                song2.play()
                document.getElementById("sng_numb").innerHTML = "Song:2"
            }
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet model is loaded")
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("Left wrist's x position = " + leftWristX, "Left wrist's y position = "+ leftWristY)
        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("Right wrist's x position = " + rightWristX, "Right wrist's y position = "+ rightWristY)
    }
}