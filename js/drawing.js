function initializeLogo(width, height, strokeWidth) {

   d3.select("svg").attr("width", width).attr("height", height)

   d3.select("svg").append("clipPath")
      .attr("id", "disk-clipper")
      .append("circle")
      .attr("class", "arc")
      .attr("transform", translate(width / 2, height / 2))
      .attr("r", height / 2)

   var canvas = d3.select("svg").append("g")
      .attr("id", "canvas")
      .style("stroke-width", strokeWidth)
      .attr("clip-path", "url(#disk-clipper)")

   canvas.append("rect")
      .attr("id", "left-half")

   canvas.append("rect")
      .attr("id", "right-half")

   /* lines */

   canvas.append("line")
      .attr("id", "horizontal-line")
      .attr("class", "letterA")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", width / 2)
      .attr("y2", height / 2)

   canvas.append("line")
      .attr("id", "vertical-line")
      .attr("class", "letterA letterP")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2)
      .attr("y2", 0)

   canvas.append("line")
      .attr("id", "diagonal")
      .attr("class", "letterA nonStatic")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2)
      .attr("y2", 0)

   /* circles */

   canvas.append("path")
      .attr("id", "circle")
      .attr("class", "arc")
      .attr("transform", translate(width / 2, height / 2))
      .datum({
         endAngle: 0
      })

   canvas.append("path")
      .attr("id", "boucle")
      .attr("class", "letterP nonStatic arc")
      .attr("transform", translate(width / 2, height / 4 + strokeWidth / 4))
      .datum({
         endAngle: 0
      })
}



function firstDrawLogo(width, height, strokeWidth) {

   d3.select("#header").style("height", window.innerHeight)
      .style("padding-top", (window.innerHeight - height) / 2)
      .style("padding-bottom", (window.innerHeight - height) / 2)

   var cwidth = $("#header .container").width();
/*   var container = d3.select("#header .container");
   container.style("padding-left", ( cwidth + 30 - width) / 2)
   container.style("padding-right", ( cwidth + 30 - width) / 2)*/
   d3.select("svg")
   .style("margin-left", ( cwidth - width) / 2)
   .style("margin-right", ( cwidth - width) / 2)

   var t0 = d3.select("svg").transition().ease("linear").delay(500).duration(600)
   var t1 = t0.transition().ease("linear").duration(300)
   var t2 = t1.transition().ease("linear").duration(300)
   var t3 = t2.transition().ease("linear").duration(300)
   var t4 = t3.transition().ease("linear").duration(300)

   d3.select("#left-half")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", height)

   d3.select("#right-half")
      .attr("x", width / 2)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", height)

   /* half circles */

   t0.select("#circle")
      .call(arcTween, width / 2, strokeWidth, 0.5 * tau);

   t0.select("#boucle")
      .call(arcTween, width / 4 + strokeWidth / 4, strokeWidth, 0.5 * tau);

   /* quarter-circle & half-horizontal */

   t1.select("#circle")
      .call(arcTween, width / 2, strokeWidth, 0.75 * tau);

   t1.select("#horizontal-line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width / 2)
      .attr("y2", height / 2)

   /* finish circle */

   t2.select("#circle")
      .call(arcTween, width / 2, strokeWidth, tau);

   /* fall from top to middle */

   t3.select("#vertical-line")
      .attr("y2", height / 2)

   t3.select("#diagonal")
      .attr("x2", width / 2 * Math.sqrt(2) / (1 + Math.sqrt(2)))
      .attr("y2", height / 2)

   /* bouquet final */

   t4.select("#vertical-line")
      .attr("y2", height)

   t4.select("#diagonal")
      .attr("x2", width / 2 * (1 - 1 / Math.sqrt(2)))
      .attr("y2", height / 2 * (1 + 1 / Math.sqrt(2)))

   t4.select("#horizontal-line")
      .attr("x2", width)
}



function drawLogo(width, height, strokeWidth, animate, previousStateNonZero) {

   var t0 = d3.select("#header")
   if(animate)
      t0 = t0.transition("quad-in-out").duration(1000)

   // animate the dark background of the header
   t0.style("height", state > 0 ? width + 2 * 30 : window.innerHeight)
      .style("padding-top", state > 0 ? 30 : (window.innerHeight - height) / 2)
      .style("padding-bottom", state > 0 ? 30 : (window.innerHeight - height) / 2)

   var cwidth = $("#header .container").width();
/*   var container = t0.select(".container");
   container.style("padding-left", state > 0 ? 15 : ( cwidth + 30 - width) / 2)
   container.style("padding-right", state > 0 ? 15 : ( cwidth + 30 - width) / 2)*/

   // back to regular svg manipulations
   t0 = t0.select("svg")
   t0.attr("width", width).attr("height", height)

   t0.style("margin-left", state > 0 ? 0 : ( cwidth - width) / 2)
   .style("margin-right", state > 0 ? 0 : ( cwidth - width) / 2)

   // We need to increase the strokeWidth, to keep the lines visible
   t0.select("#canvas").style("stroke-width", strokeWidth)

   t0.select("#left-half")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", height)

   t0.select("#right-half")
      .attr("x", width / 2)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", height)

   t0.select("#circle")
      .attr("transform", translate(width / 2, height / 2))
      .attr("d", arcGenerator(width / 2, strokeWidth))

   t0.select("#boucle")
      .attr("transform", translate(width / 2, width / 4 + strokeWidth / 4))
      .attr("d", arcGenerator(width / 4 + strokeWidth / 4, strokeWidth).endAngle(0.5 * tau))

   t0.select("#disk-clipper")
      .select("circle")
      .attr("transform", translate(width / 2, height / 2))
      .attr("r", height / 2)

   t0.select("#vertical-line")
      .attr("x1", width / 2)
      .attr("y1", strokeWidth)
      .attr("x2", width / 2)
      .attr("y2", height - strokeWidth)

   t0.select("#horizontal-line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)

   t0.select("#diagonal")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2 * (1 - 1 / Math.sqrt(2)))
      .attr("y2", height / 2 * (1 + 1 / Math.sqrt(2)))

   d3.select("#heading")
      .text(state == 1 ? "bout me" : "rojects")
      .style("display", state === 0 ? "none" : "")
      .style("opacity", 0)

   if(previousStateNonZero)
      d3.select("#heading").style("opacity", 1)
   else
      d3.select("#heading").transition().duration(400).delay(1000)
      .style("opacity", 1)
}




/////////////////////      helper functions        ////////////////////


function arcGenerator(radius, strokeWidth) {
   return d3.svg.arc()
      .innerRadius(radius - strokeWidth)
      .outerRadius(radius)
      .startAngle(0);
}

function translate(x, y) {
   return "translate(" + x + "," + y + ")";
}

// http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function() {
   return this.each(function() {
      this.parentNode.appendChild(this);
   });
};

// http://bl.ocks.org/mbostock/5100636
// Creates a tween on the specified transition's "d" attribute, transitioning
// any selected arcs from their current angle to the specified new angle.
function arcTween(transition, radius, strokeWidth, newAngle) {

   var arc = arcGenerator(radius, strokeWidth);

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
