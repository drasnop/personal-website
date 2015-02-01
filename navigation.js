// 0=logo, 1=about, 2=projects
var state,
	largeSize=300,
	smallSize=80,
	largeStroke=4,
	smallStroke=2;

initializeLogo();
displayState(0);

$("#logo").click(function(){
	state=(state+1)%3;
	displayState(state);
})

$(".gotoProjects").click(function(){
	displayState(2);
})

function displayState(s){
	state=s;
	switch(state){
		case 0:
			showLogo();
			break;
		case 1:
			showAbout();
			break;
		case 2:
			showProjects();
			break;
	}
}

function showLogo(){
	drawLogo(largeSize,largeSize,largeSize/10,largeStroke);
	$("#about, #projects").hide();
}

function showAbout(){
	drawLogo(smallSize,smallSize,smallSize/10,smallStroke);
	$("#about").show();
	$("#projects").hide();
}

function showProjects(){
	drawLogo(smallSize,smallSize,smallSize/10,smallStroke);
	$("#projects").show();
	$("#about").hide();
}