
var d = document,
	videoInput = d.getElementById('video'),
	canvasInput = d.getElementById('compare');
    
var htracker = new headtrackr.Tracker({altVideo : {ogv: "./media/capture5.ogv", mp4: "./media/capture5.mp4"}, calcAngles: true, ui: false, headPosition: false, debug: false });
    htracker.init(videoInput, canvasInput);
    htracker.start();

function updateFontSize(ev) {
    var faceWidth   = ev.width,
        videoWidth  = videoInput.width,
        face2canvasRatio = videoWidth/faceWidth;

    rootSize = Math.round(face2canvasRatio*10)/10 - 1.5 + 1;  
    console.log(rootSize);
    $('.glass').css('-webkit-transform','scale('+rootSize+')');
}


function breakPointClass(ev) {
    var b = d.getElementsByTagName('body')[0],
		faceWidth   = ev.width,
        videoWidth  = videoInput.width,
        face2canvasRatio = videoWidth/faceWidth;
    
	if (face2canvasRatio > 3.2) {
        b.className = 'far';
    }
                    
    if (face2canvasRatio < 2.2) {
        b.className = 'close';
    }
    
    if (face2canvasRatio >= 2.2 && face2canvasRatio <= 3.2) {
        b.className = '';
    } 
}
	

d.addEventListener('facetrackingEvent', function(event) {
	updateFontSize(event);
});
	