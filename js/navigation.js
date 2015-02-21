// 0=logo, 1=about, 2=projects
var state,
   largeInnerWidth = 240,
   smallInnerWidth = 80,
   largeStroke = 4,
   smallStroke = 2,
   tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

$(document).ready(function() {
   resizeAll();

   window.addEventListener('resize', function(event) {
      displayState(state, false, false)
      resizeAll();
   });

   /* navigation */

   $("#left-half").click(function() {
      if(state == 1)
         displayState(0, true);
      else {
         displayState(1, true);
         window.location.href="#!about"
         $(".nonStatic.letterP").hide();
      }
   })

   $("#right-half").click(function() {
      if(state == 2)
         displayState(0, true);
      else {
         displayState(2,true);
         window.location.href="#!projects"         
         $(".nonStatic.letterA").hide();
      }
   })

   $(".gotoProjects").click(function() {
      $(".nonStatic.letterP").show();
      $(".nonStatic.letterA").hide();
   })

   /* visual effects */

   $("#logo").mouseenter(function() {
      if(state == 1)
         $(".nonStatic.letterP").show();
      if(state == 2)
         $(".nonStatic.letterA").show();
   })

   $("#logo").mouseleave(function() {
      if(state == 1)
         $(".nonStatic.letterP").hide();
      if(state == 2)
         $(".nonStatic.letterA").hide();
   })

   $("#left-half").mouseenter(function() {
      $(".nonStatic.letterA").show();
      d3.select("#horizontal-line").moveToFront();
      d3.select("#diagonal").moveToFront();
      d3.select("#circle").moveToFront();
   })

   $("#right-half").mouseenter(function() {
      $(".nonStatic.letterP").show();
      d3.select("#boucle").moveToFront();
      d3.select("#vertical-line").moveToFront();
   })
})


function resizeAll() {
   var width = $(".logo-col").width();
   $(".round-image").width(width);

   var height = $(".highlighted.master").height();
   $(".highlighted.master").siblings(".highlighted.slave").height(height);
}


function displayState(s, animate, first) {
   switch(s) {
      case 0:
         showLogo(animate, first);
         break;
      case 1:
         showAbout(animate);
         break;
      case 2:
         showProjects(animate);
         break;
   }
}

function showLogo(animate, first) {
   state = 0;
   if(first) {
      firstDrawLogo(largeInnerWidth, largeInnerWidth, largeStroke, animate);
   }
   else {
      drawLogo(largeInnerWidth, largeInnerWidth, largeStroke, animate);
      $("#footer").hide();
   }
}

function showAbout(animate) {
   var prevState = state;
   state = 1;

   var width = $(".logo-col").width();
   drawLogo(width, width, smallStroke, animate, prevState > 0);
}

function showProjects(animate) {
   var prevState = state;
   state = 2;

   var width = $(".logo-col").width();
   drawLogo(width, width, smallStroke, animate, prevState > 0);
}
