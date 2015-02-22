// 0=logo, 1=about, 2=projects
var state,
   largeInnerWidth = 240,
   smallInnerWidth = 80,
   largeStroke = 4,
   smallStroke = 2,
   tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

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


function resizeAll() {
   var width = $(".logo-col").width();
   $(".round-image").width(width);

   var height = $(".highlighted.master").height();
   $(".highlighted.master").siblings(".highlighted.slave").height(height);
}