function initializeLogo(width,height,margin,strokeWidth){

	var canvas=d3.select("svg").append("g")

	canvas.append("circle")
	.attr("id","circle")
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",0)

	canvas.append("line")
	.attr("id","horizontal-line")

	canvas.append("line")
	.attr("id","vertical-line")

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
	d3.select("svg").attr("width",width+2*margin).attr("height",height+2*margin)

	d3.select("svg>g")
	.attr("transform","translate("+margin+","+margin+")")
	.style("stroke-width",strokeWidth)

	var t0=d3.select("#circle").transition("quad-in-out").duration(400)
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",height/2)

	var t1=t0.transition("quad-in-out").duration(600)
	t1.select("#horizontal-line")
	.attr("x1",width/2)
	.attr("y1",height)
	.attr("x2",width/2)
	.attr("y2",0)

	t1.select("#vertical-line")
	.attr("x1",0)
	.attr("y1",height/2)
	.attr("x2",width)
	.attr("y2",height/2)

	t1.select("#diagonal")
	.attr("x1",width/2)
	.attr("y1",0)
	.attr("x2",width/2*(1-1/Math.sqrt(2)))
	.attr("y2",height/2*(1+1/Math.sqrt(2)))

	t1.select("#rectangle")
	.attr("x",width/2)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	t1.select("#ellipse")
	.attr("cx",width/2)
	.attr("cy",height/4)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)
	.attr("clip-path", "url(#half-left)")
}

function drawLogo(width,height,margin,strokeWidth){
	var t0=d3.select("svg").transition("quad-in-out").duration(1000)
	t0.attr("width",width+2*margin).attr("height",height+2*margin)

	d3.select("svg>g")
	.attr("transform","translate("+margin+","+margin+")")
	.style("stroke-width",strokeWidth)

	t0.select("#circle")
	.attr("cx",width/2)
	.attr("cy",height/2)
	.attr("r",height/2)

	t0.select("#horizontal-line")
	.attr("x1",width/2)
	.attr("y1",height)
	.attr("x2",width/2)
	.attr("y2",0)

	t0.select("#vertical-line")
	.attr("x1",0)
	.attr("y1",height/2)
	.attr("x2",width)
	.attr("y2",height/2)

	t0.select("#diagonal")
	.attr("x1",width/2)
	.attr("y1",0)
	.attr("x2",width/2*(1-1/Math.sqrt(2)))
	.attr("y2",height/2*(1+1/Math.sqrt(2)))

	t0.select("#rectangle")
	.attr("x",width/2)
	.attr("y",0)
	.attr("width",width/2)
	.attr("height",height)

	t0.select("#ellipse")
	.attr("cx",width/2)
	.attr("cy",height/4)
	.attr("rx",width/4*1.2)
	.attr("ry",height/4)
	.attr("clip-path", "url(#half-left)")
}

function halfcircle(radius,strokeWidth){
	return d3.svg.arc()
	.innerRadius(radius-strokeWidth/2)
	.outerRadius(radius+strokeWidth/2)
	.startAngle(0)
	.endAngle(Math.PI)
}