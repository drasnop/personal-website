function initializeLogo(width,height,margin,strokeWidth){

	d3.select("svg").attr("width",width+2*margin).attr("height",height+2*margin)

	var canvas=d3.select("svg").append("g")
	.attr("id","canvas")
	.style("stroke-width",strokeWidth)
	.attr("transform",translate(margin,margin))

	canvas.append("rect")
	.attr("id","left-half")

	canvas.append("rect")
	.attr("id","right-half")

	/* circles */

	canvas.append("path")
	.attr("id","circle")
	.attr("transform",translate(width/2,height/2))
	.datum({endAngle: 0})
	.attr("d", arcGenerator(width/2))

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
	.call(arcTween, width/2, tau);

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
	.attr("transform",translate(margin,margin))

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
	.attr("transform",translate(width/2,height/2))
	.attr("d", arcGenerator(width/2))

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

function arcGenerator(radius){
	return d3.svg.arc()
	.innerRadius(radius)
	.outerRadius(radius)
	.startAngle(0);
}

function translate(x,y){
	return "translate(" + x + "," + y +")";
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

// http://bl.ocks.org/mbostock/5100636
// Creates a tween on the specified transition's "d" attribute, transitioning
// any selected arcs from their current angle to the specified new angle.
function arcTween(transition, radius, newAngle) {

var arc = d3.svg.arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0);

  // The function passed to attrTween is invoked for each selected element when
  // the transition starts, and for each element returns the interpolator to use
  // over the course of transition. This function is thus responsible for
  // determining the starting angle of the transition (which is pulled from the
  // element's bound datum, d.endAngle), and the ending angle (simply the
  // newAngle argument to the enclosing function).
  transition.attrTween("d", function(d) {

    // To interpolate between the two angles, we use the default d3.interpolate.
    // (Internally, this maps to d3.interpolateNumber, since both of the
    // arguments to d3.interpolate are numbers.) The returned function takes a
    // single argument t and returns a number between the starting angle and the
    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
    // newAngle; and for 0 < t < 1 it returns an angle in-between.
    var interpolate = d3.interpolate(d.endAngle, newAngle);

    // The return value of the attrTween is also a function: the function that
    // we want to run for each tick of the transition. Because we used
    // attrTween("d"), the return value of this last function will be set to the
    // "d" attribute at every tick. (It's also possible to use transition.tween
    // to run arbitrary code for every tick, say if you want to set multiple
    // attributes from a single function.) The argument t ranges from 0, at the
    // start of the transition, to 1, at the end.
    return function(t) {

      // Calculate the current arc angle based on the transition time, t. Since
      // the t for the transition and the t for the interpolate both range from
      // 0 to 1, we can pass t directly to the interpolator.
      //
      // Note that the interpolated angle is written into the element's bound
      // data object! This is important: it means that if the transition were
      // interrupted, the data bound to the element would still be consistent
      // with its appearance. Whenever we start a new arc transition, the
      // correct starting angle can be inferred from the data.
      d.endAngle = interpolate(t);

      // Lastly, compute the arc path given the updated data! In effect, this
      // transition uses data-space interpolation: the data is interpolated
      // (that is, the end angle) rather than the path string itself.
      // Interpolating the angles in polar coordinates, rather than the raw path
      // string, produces valid intermediate arcs during the transition.
      return arc(d);
    };
  });
}