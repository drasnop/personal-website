function initializeLogo(width,height,margin,strokeWidth){

	d3.select("svg").attr("width",width+2*margin).attr("height",height+2*margin)

	var canvas=d3.select("svg").append("g")
	.style("stroke-width",0)

	canvas.append("circle")
	.attr("id","circle")
	.attr("cx",width/2+margin)
	.attr("cy",height/2+margin)
	.attr("r",height/3)

	canvas.append("line")
	.attr("id","horizontal-line")
	.attr("x1",width/2+margin)
	.attr("y1",height/2+margin)
	.attr("x2",width/2+margin)
	.attr("y2",height/2+margin)

	canvas.append("line")
	.attr("id","vertical-line")
	.attr("x1",width/2+margin)
	.attr("y1",height/2+margin)
	.attr("x2",width/2+margin)
	.attr("y2",height/2+margin)

	canvas.append("line")
	.attr("id","diagonal")

	canvas.append("clipPath")
	.attr("id","half-left")
	.append("rect")
	.attr("id","rectangle")

	canvas.append("ellipse")
	.attr("id","ellipse")
}

function firstDrawLogo(width,height,margin,strokeWidth){

	var t0=d3.select("svg").transition("quad-in-out").duration(800)

	t0.select("svg>g")
	.style("stroke-width",strokeWidth)

	t0.select("#circle")
	.attr("cx",width/2+margin)
	.attr("cy",height/2+margin)
	.attr("r",height/2)

	var t1=t0.transition("quad-in-out").duration(600)

	t1.select("#horizontal-line")
	.attr("x1",width/2+margin)
	.attr("y1",height+margin)
	.attr("x2",width/2+margin)
	.attr("y2",0+margin)

	t1.select("#vertical-line")
	.attr("x1",0+margin)
	.attr("y1",height/2+margin)
	.attr("x2",width+margin)
	.attr("y2",height/2+margin)

	var t2=t1.transition("quad-in-out").duration(600)

	t2.select("#diagonal")
	.attr("x1",width/2+margin)
	.attr("y1",0+margin)
	.attr("x2",width/2*(1-1/Math.sqrt(2))+margin)
	.attr("y2",height/2*(1+1/Math.sqrt(2))+margin)

	t2.select("#rectangle")
	.attr("x",width/2+margin)
	.attr("y",0+margin)
	.attr("width",width/2+margin)
	.attr("height",height+margin)

	t2.select("#ellipse")
	.attr("cx",width/2+margin)
	.attr("cy",height/4+margin)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)
	.attr("clip-path", "url(#half-left)")
}

function drawLogo(width,height,margin,strokeWidth,previousStateNonZero){
	var t0=d3.select("svg").transition("quad-in-out").duration(1000)

	t0.attr("width",width+2*margin).attr("height",height+2*margin)
	
	t0.select("svg>g").style("stroke-width",strokeWidth)

	t0.select("#circle")
	.attr("cx",width/2+margin)
	.attr("cy",height/2+margin)
	.attr("r",height/2)

	t0.select("#horizontal-line")
	.attr("x1",width/2+margin)
	.attr("y1",height+margin)
	.attr("x2",width/2+margin)
	.attr("y2",0+margin)

	t0.select("#vertical-line")
	.attr("x1",0+margin)
	.attr("y1",height/2+margin)
	.attr("x2",width+margin)
	.attr("y2",height/2+margin)

	d3.select("#diagonal")
	.style("display", state==2? "none":"")

	t0.select("#diagonal")
	.attr("x1",width/2+margin)
	.attr("y1",0+margin)
	.attr("x2",width/2*(1-1/Math.sqrt(2))+margin)
	.attr("y2",height/2*(1+1/Math.sqrt(2))+margin)

	d3.select("#rectangle, #ellipse")
	.style("display", state==1? "none":"")

	t0.select("#rectangle")
	.attr("x",width/2+margin)
	.attr("y",0+margin)
	.attr("width",width/2+margin)
	.attr("height",height+margin)

	t0.select("#ellipse")
	.attr("cx",width/2+margin)
	.attr("cy",height/4+margin)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)
	.attr("clip-path", "url(#half-left)")

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
		d3.select("#heading").transition().duration(500).delay(1000)
		.style("opacity", 1)
}

function halfcircle(radius,strokeWidth){
	return d3.svg.arc()
	.innerRadius(radius-strokeWidth/2)
	.outerRadius(radius+strokeWidth/2)
	.startAngle(0)
	.endAngle(Math.PI)
}

function marginForCenter(width){
	return (wrapperWidth-width)/2;
}