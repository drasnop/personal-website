// 0=logo, 1=about, 2=projects
var state,
	wrapperWidth=600,
	wrapperHeight=600,
	largeInnerWidth=300,
	smallInnerWidth=80,
	largeStroke=4,
	smallStroke=2;

$(document).ready(function(){
	$("#wrapper").css({
		"width":wrapperWidth+"px",
		"height":wrapperHeight+"px"})
	initializeLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
	displayState(0,true);
})

$("#logo").click(function(){
	state=(state+1)%3;
	displayState(state);
})

$(".gotoProjects").click(function(){
	displayState(2);
})

function displayState(s,first){
	switch(s){
		case 0:
			showLogo(first);
			break;
		case 1:
			showAbout();
			break;
		case 2:
			showProjects();
			break;
	}
}

function showLogo(first){
	if(first)
		firstDrawLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
	else{
		drawLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
		$("#about, #projects").slideUp(1000);
	}
	state=0;
}

function showAbout(){
	drawLogo(smallInnerWidth,smallInnerWidth,2,smallStroke);
	if(state===0)
		$("#about").slideDown(1000);
	else
		$("#about").show();
	$("#projects").hide();
	state=1;
}

function showProjects(){
	drawLogo(smallInnerWidth,smallInnerWidth,2,smallStroke);
	if(state===0)
		$("#projects").slideDown(1000);
	else
		$("#projects").show();
	$("#about").hide();
	state=2;
}