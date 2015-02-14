// start slingin' some d3 here.
var Piece = function(xAxis, yAxis, size){
  this.xAxis = xAxis;
  this.yAxis = yAxis;
  this.size = size;
};

var createEnemies = function(numEnemies, size, xBoardSize, yBoardSize){
  var xAxis;
  var yAxis;

  var enemies = [];
  for(var i = 0; i < numEnemies; i++){
    xAxis = Math.floor(Math.random()*(xBoardSize-size*2))+size;
    yAxis = Math.floor(Math.random()*(yBoardSize-size*2))+size;
    enemies.push(new Piece(xAxis,yAxis,size));
  }
  return enemies;
};

var enemies = createEnemies(50,10,700,700);

// Board layout
// Enemy layout
d3.select("svg").selectAll("circle").data(enemies).enter()
  .append("circle").attr("cx",function(d){return d.xAxis;})
  .attr("cy",function(d){return d.yAxis;})
  .attr("r",function(d){return d.size;})
  .attr("fill","#4D997C");


var dragmove = function() {
  d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

// Player layout
var player = d3.select("svg").append("circle");
  player.attr("cx","350").attr("cy","350").attr("r","10").attr("fill","orange");
  player.on("click", function() {
  if (d3.event.defaultPrevented) return; // click suppressed
  console.log("clicked!");
});
  player.call(drag);
// Enemy update
var update = function(data) {
  d3.selectAll("circle").data(data).transition().duration(2000).attr("cx",function(d){return d.xAxis;})
    .attr("cy",function(d){return d.yAxis;})
    .attr("r",function(d){return d.size;});
};

// Trigger enemy update
setInterval(function() {
  enemies = createEnemies(50,10,700,700);
  return update(enemies);
}, 2000);

