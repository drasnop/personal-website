var drawing = (function() {

   var drawing = {
      "largeInnerWidth": 240,
      "smallInnerWidth": 80,
      "largeStroke": 4,
      "smallStroke": 2,
      "longAnimation": 1000,
      "shortAnimation": 500
   }
   var tau= 2 * Math.PI; // http://tauday.com/tau-manifesto

   drawing.initializeLogo = function(width, height, strokeWidth) {

      d3.select("svg").attr("width", width).attr("height", height)

      d3.select("#disk-clipper circle")
         .attr("transform", translate(width / 2, height / 2))
         .attr("r", height / 2)

      d3.select("#canvas")
         .style("stroke-width", strokeWidth)

      /* lines */

      d3.select("#horizontal-line")
         .attr("x1", width / 2 + strokeWidth / 4)
         .attr("y1", height / 2)
         .attr("x2", width / 2 + strokeWidth / 4)
         .attr("y2", height / 2)

      d3.select("#vertical-line")
         .attr("x1", width / 2)
         .attr("y1", -strokeWidth / 2)
         .attr("x2", width / 2)
         .attr("y2", 0)

      d3.select("#diagonal")
         .attr("x1", width / 2)
         .attr("y1", 0)
         .attr("x2", width / 2)
         .attr("y2", 0)

      /* circles */

      d3.select("#circle")
         .attr("transform", translate(width / 2, height / 2))
         .datum({
            endAngle: 0
         })

      d3.select("#boucle")
         .attr("transform", translate(width / 2, height / 4 + strokeWidth / 4))
         .datum({
            endAngle: 0
         })

      /* bind listeners */

      reorderOnHover();
   }



   drawing.firstDrawLogo = function(width, height, strokeWidth) {

      // make #header full height, and prepare its shrinking animation

      d3.select("#header").style("height", window.innerHeight)
         .style("padding-top", (window.innerHeight - height) / 2)
         .style("padding-bottom", (window.innerHeight - height) / 2)

      // center the logo
      d3.select("#logo").style("margin-left", logoLeftMargin(0,width))

      // Now that the page is covered by the header, change the body back to its original color
      $("body").css("background-color", "#E6EBEE");

      // unroll the logo

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
         .attr("x2", width / 2 + strokeWidth / 4)
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
         .attr("y2", height - strokeWidth)

      t4.select("#diagonal")
         .attr("x2", width / 2 * (1 - 1 / Math.sqrt(2)))
         .attr("y2", height / 2 * (1 + 1 / Math.sqrt(2)))

      t4.select("#horizontal-line")
         .attr("x2", width)
   }



   drawing.drawLogo = function(width, height, strokeWidth, state, animate, cubic) {

      // change the body back to its original color if needed (=if skipping splash page)
      $("body").css("background-color", "#E6EBEE");

      var t0 = d3.select("#header")
      if(animate)
         t0 = t0.transition(cubic? "cubic-out" : "quad-in-out").duration(animate)

      // animate the dark background of the header
      t0.style("height", state > 0 ? width + 2 * 30 : window.innerHeight)
         .style("padding-top", state > 0 ? 30 : (window.innerHeight - height) / 2)
         .style("padding-bottom", state > 0 ? 30 : (window.innerHeight - height) / 2)

      // position the logo horizontally
      t0.select("#logo").style("margin-left", logoLeftMargin(state,width))

      // back to regular svg manipulations
      t0 = t0.select("svg")
      t0.attr("width", width).attr("height", height)

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
         .attr("d", arcGenerator(width / 2, strokeWidth).endAngle(tau))

      t0.select("#boucle")
         .attr("transform", translate(width / 2, width / 4 + strokeWidth / 4))
         .attr("d", arcGenerator(width / 4 + strokeWidth / 4, strokeWidth).endAngle(0.5 * tau))

      t0.select("#disk-clipper")
         .select("circle")
         .attr("transform", translate(width / 2, height / 2))
         .attr("r", height / 2)

      t0.select("#vertical-line")
         .attr("x1", width / 2)
         .attr("y1", -strokeWidth / 2)
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

      if(animate && state !== 0) {
         d3.select("#heading").style("opacity", 0)

         d3.select("#heading")
            .transition().duration(400).delay(animate)
            .style("opacity", 1)
      }
   }




   /////////////////////      helper functions        ////////////////////

   function reorderOnHover() {

      $("#left-half").mouseenter(function() {
         d3.select("#horizontal-line").moveToFront();
         d3.select("#diagonal").moveToFront();
         d3.select("#circle").moveToFront();
      })

      $("#right-half").mouseenter(function() {
         d3.select("#boucle").moveToFront();
         d3.select("#vertical-line").moveToFront();
      })
   }

   function logoLeftMargin(state, logoWidth){
      switch(state) {
         case 0:
            return (window.innerWidth-logoWidth)/2;
         case 1:
            return $("#logoAbout").offset().left;
         case 2:
            return $("#logoProjects").offset().left;
      }
   }

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

   // return public methods and fields
   return drawing;
})();
