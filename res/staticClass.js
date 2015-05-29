var Cell = (function(){
  var Cell={
    x:1,
    y:2,
    things:[1,2,3]
  };
  
  // private method.
  function initializeSomethingElse() {
    Cell.dir = Math.atan2(Cell.y, Cell.x);
    Cell.total = 0;
    Cell.things.forEach(function(thing) {
      Cell.total += thing;
    });
  }
  
  Cell.publicMethod=function(){
    console.log("before:", Cell);
    initializeSomethingElse();
    console.log("after:", Cell);
  }

  return Cell;
})();