// 0=logo, 1=about, 2=projects
var state,
	wrapperWidth=600,
	wrapperHeight=600,
	largeInnerWidth=300,
	smallInnerWidth=80,
	largeStroke=4,
	smallStroke=2,
	tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

$(document).ready(function(){
	$("#wrapper").css({
		"width":wrapperWidth+"px",
		"height":wrapperHeight+"px"})
	initializeLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
	displayState(0,true);

	/* navigation */

	$("#left-half").click(function(){
		if(state==1)
			displayState(0);
		else{
			displayState(1)
			$(".nonStatic.letterP").hide();
		}
	})

	$("#right-half").click(function(){
		if(state==2)
			displayState(0);
		else{
			displayState(2);
			$(".nonStatic.letterA").hide();
		}
	})

	$(".gotoProjects").click(function(){
		displayState(2);
		$(".nonStatic.letterP").show();
		$(".nonStatic.letterA").hide();
	})

	/* visual effects */

	$("#logo").mouseenter(function(){
		if(state==1)
			$(".nonStatic.letterP").show();
		if(state==2)
			$(".nonStatic.letterA").show();
	})

	$("#logo").mouseleave(function(){
		if(state==1)
			$(".nonStatic.letterP").hide();
		if(state==2)
			$(".nonStatic.letterA").hide();
	})

	$("#left-half").mouseenter(function(){
		$(".nonStatic.letterA").show();
		d3.select("#horizontal-line").moveToFront();
		d3.select("#diagonal").moveToFront();
	})

	$("#right-half").mouseenter(function(){
		$(".nonStatic.letterP").show();
		d3.select("#boucle").moveToFront();
		d3.select("#vertical-line").moveToFront();
	})
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
	state=0;
	if(first)
		firstDrawLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
	else{
		drawLogo(largeInnerWidth,largeInnerWidth,marginForCenter(largeInnerWidth),largeStroke);
		$("#about, #projects").slideUp(1000);
	}
	$("#pic").addClass("hidden")
}

function showAbout(){
	var prevState=state;
	state=1;
	drawLogo(smallInnerWidth,smallInnerWidth,2,smallStroke,prevState>0);
	if(prevState===0){
		$("#about").slideDown(1000);
		$("#pic").css("transition-delay","1s");
	}
	else{
		$("#about").show();
		$("#pic").css("transition-delay","0s");
	}
	$("#projects").hide();
	$("#pic").removeClass("hidden")
}

function showProjects(){
	var prevState=state;
	state=2;
	drawLogo(smallInnerWidth,smallInnerWidth,2,smallStroke,prevState>0);
	if(prevState===0)
		$("#projects").slideDown(1000);
	else
		$("#projects").show();
	$("#about").hide();
	$("#pic").addClass("hidden")
}