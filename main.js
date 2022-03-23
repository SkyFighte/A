song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreRightWrist=0;
scoreLefttWrist=0;

function preload(){
    song= loadSound("Ed-Sheeran-Bad-Habits-(TrendyBeatz.com).mp3")
}




function setup(){
    canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();


poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is intialised");

}

function draw(){
    image(video,0,0,600,500);
    fill("ff0000");
    stroke("ff0000");
    if( scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="speed= 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed= 1x";
            song.rate(1);

        }
        else if(rightWristY>200 && rightWristY<=300){
       document.getElementById("speed").innerHTML="speed= 1.5x";
       song.rate(1.5);

        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed= 2x";
            song.rate(2);
        }
        else if(rightWristY>400){
            document.getElementById("speed").innerHTML="speed= 2.5x";
            song.rate(2.5);
        }

    }


}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLefttWrist=results[0].pose.keypoints[9].score;
        console.log("score right wrist=   "+scoreRightWrist+"score left wrist=   "+scoreLefttWrist);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("right wrist x=    "+rightWristX+"right wrist y=   "+rightWristY);
        console.log("left wrist x=   "+leftWristX+"left wrist y=  "+ leftWristY);


    }
}
