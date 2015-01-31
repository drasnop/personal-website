var svg=d3.select("svg"),
	width=300,
	height=300,
	margin=20;

svg.attr("width",width+2*margin).attr("height",height+2*margin)

var canvas=svg.append("g")

canvas.append("circle")
.attr("cx",width/2)
.attr("cy",height/2)
.attr("r",height/2)

canvas.append("line")
.attr("x1",width/2)
.attr("y1",height)
.attr("x2",width/2)
.attr("y2",0)

canvas.append("line")
.attr("x1",0)
.attr("y1",height/2)
.attr("x2",width)
.attr("y2",height/2)

canvas.append("line")
.attr("x1",width/2)
.attr("y1",0)
.attr("x2",width/2*(1-1/Math.sqrt(2)))
.attr("y2",height/2*(1+1/Math.sqrt(2)))

canvas.append("clipPath")
.attr("id","half-left")
.append("rect")
.attr("x",width/2)
.attr("y",0)
.attr("width",width/2)
.attr("height",height)

canvas.append("ellipse")
.attr("cx",width/2)
.attr("cy",height/4)
.attr("rx",width/4+20)
.attr("ry",height/4)
.attr("clip-path", "url(#half-left)")

canvas.attr("transform","translate("+margin+","+margin+")")

function halfcircle(radius,strokeWidth){
    return d3.svg.arc()
    .innerRadius(radius-strokeWidth/2)
    .outerRadius(radius+strokeWidth/2)
    .startAngle(0)
    .endAngle(Math.PI)
}