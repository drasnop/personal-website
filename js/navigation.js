function bindListeners() {

   /* visual effects */

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