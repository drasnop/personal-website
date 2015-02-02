function initializeLogo(width,height,margin,strokeWidth){

	d3.select("svg").attr("width",width+2*margin).attr("height",height+2*margin)

	var canvas=d3.select("svg").append("g")
	.attr("id","canvas")
	.style("stroke-width",strokeWidth)
	.attr("transform","translate("+margin+","+margin+")")

	canvas.append("rect")
	.attr("id","left-half")

	canvas.append("rect")
	.attr("id","right-half")

	/* circles */

	canvas.append("circle")
	.attr("id","circle")
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",height/3)

	canvas.append("clipPath")
	.attr("id","ellipse-clip-path")
	.append("rect")
	.attr("id","ellipse-mask")

	canvas.append("ellipse")
	.attr("id","ellipse")
	.attr("class","letterP nonStatic")
	.attr("clip-path", "url('#ellipse-clip-path')")

	/* lines */

	canvas.append("line")
	.attr("id","horizontal-line")
	.attr("class","letterA")
	.attr("x1",width/2)
	.attr("y1",height/2)
	.attr("x2",width/2)
	.attr("y2",height/2)

	canvas.append("line")
	.attr("id","vertical-line")
	.attr("class","letterA letterP")
	.attr("x1",width/2)
	.attr("y1",height/2)
	.attr("x2",width/2)
	.attr("y2",height/2)

	canvas.append("line")
	.attr("id","diagonal")
	.attr("class","letterA nonStatic")
}



function firstDrawLogo(width,height,margin,strokeWidth){

	var t0=d3.select("svg").transition("quad-in-out").duration(800)
	var t1=t0.transition("quad-in-out").duration(600)
	var t2=t1.transition("quad-in-out").duration(600)

	t0.select("#left-half")
	.attr("x",0)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	t0.select("#right-half")
	.attr("x",width/2)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	/* circles */

	t0.select("#circle")
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",height/2)

	t2.select("#ellipse-mask")
	.attr("x",width/2-strokeWidth/2)
	.attr("y",0)
	.attr("width",width/2+strokeWidth/2)
	.attr("height",height)

	t2.select("#ellipse")
	.attr("cx",width/2)
	.attr("cy",height/4)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)

	/* lines */

	t1.select("#vertical-line")
	.attr("x1",width/2)
	.attr("y1",height)
	.attr("x2",width/2)
	.attr("y2",0)

	t1.select("#horizontal-line")
	.attr("x1",0)
	.attr("y1",height/2)
	.attr("x2",width)
	.attr("y2",height/2)

	t2.select("#diagonal")
	.attr("x1",width/2)
	.attr("y1",0)
	.attr("x2",width/2*(1-1/Math.sqrt(2)))
	.attr("y2",height/2*(1+1/Math.sqrt(2)))
}



function drawLogo(width,height,margin,strokeWidth,previousStateNonZero){
	var t0=d3.select("svg").transition("quad-in-out").duration(1000)

	t0.attr("width",width+2*margin).attr("height",height+2*margin)
	
	t0.select("#canvas").style("stroke-width",strokeWidth)
	.attr("transform","translate("+margin+","+margin+")")

	t0.select("#left-half")
	.attr("x",0)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	t0.select("#right-half")
	.attr("x",width/2)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	/* circles */

	t0.select("#circle")
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",height/2)

	t0.select("#ellipse-mask")
	.attr("x",width/2)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	t0.select("#ellipse")
	.attr("cx",width/2)
	.attr("cy",height/4)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)

	/* lines */

	t0.select("#vertical-line")
	.attr("x1",width/2)
	.attr("y1",height)
	.attr("x2",width/2)
	.attr("y2",0)

	t0.select("#horizontal-line")
	.attr("x1",0)
	.attr("y1",height/2)
	.attr("x2",width)
	.attr("y2",height/2)

	t0.select("#diagonal")
	.attr("x1",width/2)
	.attr("y1",0)
	.attr("x2",width/2*(1-1/Math.sqrt(2)))
	.attr("y2",height/2*(1+1/Math.sqrt(2)))

	/* other */

	d3.select("#heading")
	.style("left",width+2*margin+"px")
	.style("top",margin+"px")
	.style("height",height+"px")
	.style("line-height",height+"px")
	.text(state==1? "bout me" : "rojects")
	.style("display", state===0? "none":"")
	.style("opacity",0)

	if(previousStateNonZero)
		d3.select("#heading").style("opacity",1)
	else
		d3.select("#heading").transition().duration(400).delay(1000)
		.style("opacity", 1)
}



function halfcircle(radius,strokeWidth){
	return d3.svg.arc()
	.innerRadius(radius-strokeWidth/2)
	.outerRadius(radius+strokeWidth/2)
	.startAngle(0)
	.endAngle(Math.PI)
}

function arc(radius){
	return d3.svg.arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0);
}

function marginForCenter(width){
	return (wrapperWidth-width)/2;
}

// http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};